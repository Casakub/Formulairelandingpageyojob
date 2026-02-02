import { Hono } from 'npm:hono';
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from './kv_store.tsx';
import { emailService } from './email-service.tsx';
import { SIGNATURE_EMAIL_TEMPLATES } from './signature-email-templates.ts';
import { generateModernDevisPdf } from './devis-pdf-generator-v4.tsx';
import { buildDevisPayload, computeDevisPricing } from './devis-payload.ts';

const devis = new Hono();

const INTERNAL_CONTACT_EMAIL = 'contact@yojob.fr';
const DEVIS_PDF_BUCKET = 'yojob-devis-pdfs';
let devisPdfBucketReady: boolean | null = null;

async function ensureDevisPdfBucket(supabase: any) {
  if (devisPdfBucketReady !== null) return devisPdfBucketReady;

  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('❌ Impossible de lister les buckets:', error);
      devisPdfBucketReady = false;
      return devisPdfBucketReady;
    }

    const exists = buckets?.some((bucket: any) => bucket.name === DEVIS_PDF_BUCKET);
    if (!exists) {
      const { error: createError } = await supabase.storage.createBucket(DEVIS_PDF_BUCKET, {
        public: false,
        fileSizeLimit: 20 * 1024 * 1024,
        allowedMimeTypes: ['application/pdf'],
      });
      if (createError) {
        console.error('❌ Erreur création bucket PDF devis:', createError);
        devisPdfBucketReady = false;
        return devisPdfBucketReady;
      }
      console.log(`✅ Bucket PDF devis créé: ${DEVIS_PDF_BUCKET}`);
    }

    devisPdfBucketReady = true;
    return devisPdfBucketReady;
  } catch (error) {
    console.error('❌ Erreur initialization bucket PDF devis:', error);
    devisPdfBucketReady = false;
    return devisPdfBucketReady;
  }
}

const hasPricingPayload = (prospect: any) => {
  const postesCount = Array.isArray(prospect?.postes) ? prospect.postes.length : 0;
  const pricingPostesCount = Array.isArray(prospect?.pricing?.postes) ? prospect.pricing.postes.length : 0;
  const hasMatchingPostes = postesCount === 0 || pricingPostesCount === postesCount;
  return Boolean(prospect?.pricing?.totals && Array.isArray(prospect?.pricing?.postes) && hasMatchingPostes);
};

const ensurePricingPayload = (prospect: any, options: { force?: boolean } = {}) => {
  try {
    if (!options.force && hasPricingPayload(prospect)) {
      return prospect;
    }
    return buildDevisPayload(prospect);
  } catch (error) {
    console.error('⚠️ Impossible de recalculer le pricing devis:', error);
    return prospect;
  }
};

const stripIpPort = (value: string) => {
  const bracketMatch = value.match(/^\[(.+)](?::\d+)?$/);
  if (bracketMatch?.[1]) return bracketMatch[1];
  if (value.includes('.') && /:\d+$/.test(value)) {
    return value.replace(/:\d+$/, '');
  }
  return value;
};

const maskSingleIp = (ip: string): string => {
  const cleaned = stripIpPort(ip.trim());
  if (!cleaned) return '';
  if (cleaned.includes('.')) {
    const parts = cleaned.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
  }
  if (cleaned.includes(':')) {
    const parts = cleaned.split(':').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}:xxxx:xxxx`;
    }
  }
  return cleaned;
};

const maskIpAddress = (ip?: string): string => {
  if (!ip) return 'unknown';
  const parts = ip
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value && value.toLowerCase() !== 'unknown');
  if (!parts.length) return 'unknown';
  const masked = parts.map(maskSingleIp).filter(Boolean);
  const unique = Array.from(new Set(masked));
  return unique.join(', ');
};

const sanitizeSignatureMetadata = (metadata: Record<string, any> | undefined) => {
  if (!metadata) return metadata;
  const { userAgent: _userAgent, ipAddress, ...rest } = metadata;
  return {
    ...rest,
    ipAddress: maskIpAddress(ipAddress),
  };
};

const applySignaturePrivacy = (prospect: any) => {
  if (!prospect?.signature?.metadata) return prospect;
  return {
    ...prospect,
    signature: {
      ...prospect.signature,
      metadata: sanitizeSignatureMetadata(prospect.signature.metadata),
    },
  };
};

async function logSignatureAudit(
  devisId: string,
  entry: Record<string, unknown>
) {
  try {
    const key = `signature-audit:${devisId}`;
    const existing = (await kv.get(key)) || [];
    if (Array.isArray(existing)) {
      existing.push(entry);
      await kv.set(key, existing);
    } else {
      await kv.set(key, [entry]);
    }
  } catch (error) {
    console.error('⚠️ Erreur log audit signature (non-bloquant):', error);
  }
}

async function generateAndStorePdf(
  prospect: any,
  inclureCGV: boolean
): Promise<{ pdfUrl: string; pdfPath: string; pdfBytes: Uint8Array; prospectUpdated: any } | null> {
  try {
    const prospectWithPricing = ensurePricingPayload(prospect);
    const prospectWithPrivacy = applySignaturePrivacy(prospectWithPricing);
    // Utiliser le générateur PDF moderne v4
    const pdfBytes = await generateModernDevisPdf(prospectWithPrivacy, inclureCGV);
    const supabase = getSupabaseClient();
    const bucketReady = await ensureDevisPdfBucket(supabase);
    if (!bucketReady) {
      throw new Error('Bucket PDF devis indisponible');
    }

    const safeNumero = String(prospect.numero || prospect.id || 'devis')
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const pdfPath = `devis/${safeNumero}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from(DEVIS_PDF_BUCKET)
      .upload(pdfPath, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: signedUrlData, error: signedError } = await supabase.storage
      .from(DEVIS_PDF_BUCKET)
      .createSignedUrl(pdfPath, 315360000);

    if (signedError || !signedUrlData?.signedUrl) {
      throw signedError || new Error('Impossible de générer l’URL signée');
    }

    const pdfUrl = signedUrlData.signedUrl;
    const generatedAt = new Date().toISOString();

    const prospectUpdated = {
      ...prospectWithPrivacy,
      pdfUrl,
      pdf_url: pdfUrl,
      pdf_storage_path: pdfPath,
      pdfGeneratedAt: generatedAt,
      pdf_generated_at: generatedAt,
    };

    await kv.set(`prospects:${prospect.id}`, prospectUpdated);

    await updateProspectCustomFields(prospectUpdated, {
      pdf_url: pdfUrl,
      pdf_storage_path: pdfPath,
      pdf_generated_at: generatedAt,
    });

    return { pdfUrl, pdfPath, pdfBytes, prospectUpdated };
  } catch (error) {
    console.error('❌ Erreur génération PDF devis:', error);
    return null;
  }
}

// Helper pour obtenir le client Supabase (CRM prospects)
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

function mapDevisSector(secteurKey?: string): string | null {
  if (!secteurKey) return null;

  const normalized = secteurKey.toLowerCase();
  if (normalized === 'batiment' || normalized === 'tp' || normalized === 'travaux_publics') {
    return 'BTP';
  }

  return secteurKey;
}

function applyTemplateVariables(
  template: { subject: string; body_html: string; body_text: string },
  variables: Record<string, string>
) {
  let subject = template.subject;
  let bodyHtml = template.body_html;
  let bodyText = template.body_text;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    subject = subject.split(placeholder).join(value);
    bodyHtml = bodyHtml.split(placeholder).join(value);
    bodyText = bodyText.split(placeholder).join(value);
  }

  return { subject, bodyHtml, bodyText };
}

async function sendEmailSafe(options: { to: string; subject: string; body: string; html?: string; replyTo?: string; attachments?: { filename: string; content?: string | Uint8Array; contentType?: string }[] }) {
  try {
    const result = await emailService.sendEmail(options);
    if (!result.success) {
      console.error('⚠️ Envoi email échoué:', result.message);
    }
  } catch (error) {
    console.error('⚠️ Erreur envoi email (non-bloquant):', error);
  }
}

async function updateProspectCustomFields(
  devisData: any,
  updates: Record<string, any>
): Promise<string | null> {
  try {
    const supabase = getSupabaseClient();
    const contactEmail = devisData?.contact?.email;
    let prospectId = devisData?.prospectId || null;

    let existing: any = null;
    if (prospectId) {
      const { data } = await supabase
        .from('prospects')
        .select('id, custom_fields')
        .eq('id', prospectId)
        .single();
      existing = data;
    } else if (contactEmail) {
      const { data } = await supabase
        .from('prospects')
        .select('id, custom_fields')
        .eq('email', contactEmail)
        .maybeSingle();
      existing = data;
    }

    if (!existing) return null;

    const merged = {
      ...(existing.custom_fields || {}),
      ...updates,
    };

    const { error } = await supabase
      .from('prospects')
      .update({ custom_fields: merged })
      .eq('id', existing.id);

    if (error) {
      console.error('⚠️ Erreur update custom_fields prospect:', error);
      return existing.id;
    }

    return existing.id;
  } catch (error) {
    console.error('⚠️ Erreur update custom_fields prospect (non-bloquant):', error);
    return null;
  }
}

async function sendSignatureConfirmationEmails(
  prospect: any,
  signatureTimestamp: string,
  pdfAttachment?: { filename: string; content?: string | Uint8Array; contentType?: string }
) {
  try {
    const template = SIGNATURE_EMAIL_TEMPLATES.find(t => t.id === 'tpl-signature-confirmed');
    const signatureDate = new Date(signatureTimestamp).toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/Paris'
    });

    const contactName = [prospect.contact.prenom, prospect.contact.nom].filter(Boolean).join(' ').trim();
    const variables = {
      contact_firstname: prospect.contact.prenom || '',
      contact_lastname: prospect.contact.nom || '',
      quote_number: prospect.numero || '',
      signature_date: signatureDate,
    };

    if (template) {
      const { subject, bodyHtml, bodyText } = applyTemplateVariables(template, variables);
      const pdfUrl = (prospect.pdfUrl && prospect.pdfUrl !== '#') ? prospect.pdfUrl : (prospect.pdf_url && prospect.pdf_url !== '#') ? prospect.pdf_url : '';
      const extraHtml = pdfUrl
        ? `<p style="margin-top: 20px;"><a href="${pdfUrl}" style="color:#06B6D4;text-decoration:none;">📄 Télécharger votre devis signé</a></p>`
        : '';
      const extraText = pdfUrl ? `\n\nTélécharger votre devis signé : ${pdfUrl}` : '';

      await sendEmailSafe({
        to: prospect.contact.email,
        subject,
        body: bodyText + extraText,
        html: bodyHtml + extraHtml,
        ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
      });
    } else {
      await sendEmailSafe({
        to: prospect.contact.email,
        subject: '✅ Votre devis est signé',
        body: `Bonjour ${contactName || ''},\n\nVotre devis ${prospect.numero} a été signé le ${signatureDate}.\n\nL'équipe YOJOB`,
        ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
      });
    }

    await sendEmailSafe({
      to: INTERNAL_CONTACT_EMAIL,
      subject: `✅ Devis signé - ${prospect.numero}`,
      body: `Le devis ${prospect.numero} a été signé.\n\nContact: ${contactName}\nEmail: ${prospect.contact.email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2>✅ Devis signé</h2>
          <p><strong>Numéro :</strong> ${prospect.numero}</p>
          <p><strong>Contact :</strong> ${contactName}</p>
          <p><strong>Email :</strong> ${prospect.contact.email}</p>
        </div>
      `,
      replyTo: prospect.contact.email,
    });
  } catch (error) {
    console.error('⚠️ Erreur envoi email signature (non-bloquant):', error);
  }
}

async function syncDevisToProspect(devisData: any) {
  try {
    const contact = devisData?.contact || {};
    const entreprise = devisData?.entreprise || {};
    const postes = Array.isArray(devisData?.postes) ? devisData.postes : [];
    const conditions = devisData?.conditions || {};

    if (!contact.email) {
      console.warn('⚠️ Devis sans email, sync CRM ignorée.');
      return null;
    }

    const supabase = getSupabaseClient();

    const fullName = [contact.prenom, contact.nom].filter(Boolean).join(' ').trim();
    const phone = contact.telephonePortable || contact.telephoneFixe || null;
    const sectorKey = postes[0]?.secteur || null;
    const sectorLabel = mapDevisSector(sectorKey || undefined);
    const totalCandidates = postes.reduce((sum: number, poste: any) => sum + (Number(poste?.quantite) || 0), 0);
    const projectDescription = [conditions.motifRecours, conditions.lieuxMission].filter(Boolean).join(' - ');

    const customFields = {
      devis_id: devisData.id,
      devis_numero: devisData.numero,
      devis_status: devisData.statut,
      devis_created_at: devisData.createdAt,
      devis_updated_at: devisData.updatedAt,
      workers_count: totalCandidates,
      industry_sector: sectorLabel || sectorKey || null,
      sector_key: sectorKey,
      project_description: projectDescription || null,
      entreprise,
      contact,
      postes,
      conditions,
      source_event: 'devis_submitted',
    };

    const { data: existingProspect, error: searchError } = await supabase
      .from('prospects')
      .select('id, status, type, source, name, phone, company, country_code, sector, need_type, message, custom_fields')
      .eq('email', contact.email)
      .maybeSingle();

    if (searchError) {
      const message = (searchError as any)?.message || '';
      const code = (searchError as any)?.code || '';
      if (code === 'PGRST205' || message.includes('schema cache') || message.includes('does not exist')) {
        console.warn('⚠️ Tables CRM non initialisées, sync devis ignorée.');
        return null;
      }
      console.error('❌ Erreur recherche prospect existant:', searchError);
    }

    let prospectId: string;
    let isNew = false;
    let previousStatus: string | null = null;
    let currentStatus: string | null = null;

    if (existingProspect) {
      previousStatus = existingProspect.status || null;

      const updatedCustomFields = {
        ...(existingProspect.custom_fields || {}),
        ...customFields,
      };

      const { data: updatedProspect, error: updateError } = await supabase
        .from('prospects')
        .update({
          type: existingProspect.type || 'client',
          source: existingProspect.source || 'devis_form',
          status: existingProspect.status || 'new',
          name: existingProspect.name || fullName || null,
          phone: existingProspect.phone || phone,
          company: existingProspect.company || entreprise.raisonSociale || null,
          country_code: existingProspect.country_code || entreprise.pays || null,
          sector: existingProspect.sector || sectorLabel || sectorKey || null,
          need_type: existingProspect.need_type || conditions.motifRecours || null,
          message: existingProspect.message || 'Demande de devis',
          custom_fields: updatedCustomFields,
        })
        .eq('id', existingProspect.id)
        .select('id, status')
        .single();

      if (updateError) {
        console.error('❌ Erreur mise à jour prospect (devis):', updateError);
        return null;
      }

      prospectId = updatedProspect.id;
      currentStatus = updatedProspect.status || null;
    } else {
      const { data: newProspect, error: insertError } = await supabase
        .from('prospects')
        .insert([{
          type: 'client',
          source: 'devis_form',
          status: 'new',
          name: fullName || null,
          email: contact.email,
          phone,
          company: entreprise.raisonSociale || null,
          country_code: entreprise.pays || null,
          language_code: 'fr',
          sector: sectorLabel || sectorKey || null,
          need_type: conditions.motifRecours || null,
          message: 'Demande de devis',
          custom_fields: customFields,
        }])
        .select('id, status')
        .single();

      if (insertError) {
        console.error('❌ Erreur création prospect (devis):', insertError);
        return null;
      }

      prospectId = newProspect.id;
      currentStatus = newProspect.status || null;
      isNew = true;
    }

    try {
      await supabase.from('prospect_actions').insert({
        prospect_id: prospectId,
        action_type: 'quote_request',
        action_label: 'Demande de devis',
        action_description: `Demande de devis ${devisData.numero}`,
        user_name: 'Système',
        metadata: {
          devis_id: devisData.id,
          devis_numero: devisData.numero,
          source: 'devis_form',
        },
      });
    } catch (actionError) {
      console.warn('⚠️ Impossible d\'enregistrer action prospect (devis):', actionError);
    }

    return {
      prospectId,
      isNew,
      previousStatus,
      currentStatus,
    };
  } catch (error) {
    console.error('❌ Erreur sync devis → prospect:', error);
    return null;
  }
}

async function triggerWorkflow(triggerType: 'prospect_created' | 'status_changed', payload: Record<string, any>) {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !anonKey) return;

    fetch(`${supabaseUrl}/functions/v1/make-server-10092a63/workflow-engine/trigger/${triggerType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    }).catch(err => {
      console.error(`⚠️ Erreur trigger ${triggerType} (non-bloquant):`, err);
    });
  } catch (error) {
    console.error(`⚠️ Erreur déclenchement workflow ${triggerType}:`, error);
  }
}

/**
 * Génère un numéro de devis unique
 */
function genererNumeroDevis(): string {
  const date = new Date();
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  
  return `DEV-${annee}${mois}${jour}-${random}`;
}

/**
 * POST /make-server-10092a63/devis
 * Créer une nouvelle demande de devis
 */
devis.post('/', async (c) => {
  try {
    const data = await c.req.json();
    
    // Générer un ID et numéro unique
    const id = crypto.randomUUID();
    const numero = genererNumeroDevis();
    const timestamp = new Date().toISOString();
    
    const prospectRaw = {
      id,
      numero,
      type: 'devis',
      statut: 'nouveau',
      createdAt: timestamp,
      updatedAt: timestamp,
      language: data.language || data.lang,

      // Informations entreprise
      entreprise: {
        pays: data.entreprise.pays || 'France', // Valeur par défaut pour rétrocompatibilité
        raisonSociale: data.entreprise.raisonSociale,
        siret: data.entreprise.siret,
        codeAPE: data.entreprise.codeAPE,
        tvaIntracommunautaire: data.entreprise.tvaIntracommunautaire,
        adresse: data.entreprise.adresse,
        codePostal: data.entreprise.codePostal,
        ville: data.entreprise.ville,
        region: data.entreprise.region,
        siteInternet: data.entreprise.siteInternet
      },

      // Contact
      contact: {
        civilite: data.contact.civilite,
        nom: data.contact.nom,
        prenom: data.contact.prenom,
        fonction: data.contact.fonction,
        email: data.contact.email,
        telephoneFixe: data.contact.telephoneFixe,
        telephonePortable: data.contact.telephonePortable
      },

      // Besoins (postes)
      postes: data.postes,

      // Conditions
      conditions: data.conditions,

      // Profil candidats
      candidats: data.candidats,

      // Majorations (si fournies par le frontend)
      majorations: data.majorations,

      // Métadonnées
      metadata: {
        source: 'formulaire-web',
        userAgent: c.req.header('user-agent'),
        ip: c.req.header('x-forwarded-for') || c.req.header('x-real-ip')
      }
    };

    const prospect = ensurePricingPayload(prospectRaw, { force: true });
    
    // Sauvegarder dans le KV store
    await kv.set(`prospects:${id}`, prospect);
    
    // Ajouter à la liste des prospects
    const listeProspects = await kv.get('prospects:list') || [];
    listeProspects.unshift(id); // Ajouter au début
    await kv.set('prospects:list', listeProspects);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {
      total: 0,
      nouveau: 0,
      enCours: 0,
      devisEnvoye: 0,
      signe: 0,
      converti: 0,
      perdu: 0
    };
    stats.total += 1;
    stats.nouveau += 1;
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis créé: ${numero} (ID: ${id})`);

    // ✉️ Emails transactionnels (confirmation client + notification interne)
    try {
      const contactName = [prospect.contact.prenom, prospect.contact.nom].filter(Boolean).join(' ').trim() || 'Bonjour';
      const subjectClient = '✅ Votre demande de devis a bien été reçue';
      const textClient = `Bonjour ${contactName},

Merci pour votre demande de devis. Notre équipe vous recontacte rapidement.

Numéro de devis : ${prospect.numero}
Entreprise : ${prospect.entreprise.raisonSociale || 'Non précisé'}

L'équipe YOJOB`;

      const htmlClient = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Demande de devis reçue ✅</h2>
          <p>Bonjour <strong>${contactName}</strong>,</p>
          <p>Merci pour votre demande de devis. Notre équipe vous recontacte rapidement.</p>
          <p><strong>Numéro de devis :</strong> ${prospect.numero}</p>
          <p><strong>Entreprise :</strong> ${prospect.entreprise.raisonSociale || 'Non précisé'}</p>
          <p>À très vite,<br><strong>L'équipe YOJOB</strong></p>
        </div>
      `;

      await sendEmailSafe({
        to: prospect.contact.email,
        subject: subjectClient,
        body: textClient,
        html: htmlClient,
      });

      const subjectAdmin = '📥 Nouvelle demande de devis';
      const textAdmin = `Nouvelle demande de devis

Numéro : ${prospect.numero}
Entreprise : ${prospect.entreprise.raisonSociale || 'Non précisé'}
Contact : ${contactName}
Email : ${prospect.contact.email}
Téléphone : ${prospect.contact.telephonePortable || prospect.contact.telephoneFixe || 'Non précisé'}
Pays : ${prospect.entreprise.pays || 'Non précisé'}
Postes : ${prospect.postes?.length || 0}
`;

      const htmlAdmin = `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2>📥 Nouvelle demande de devis</h2>
          <ul>
            <li><strong>Numéro :</strong> ${prospect.numero}</li>
            <li><strong>Entreprise :</strong> ${prospect.entreprise.raisonSociale || 'Non précisé'}</li>
            <li><strong>Contact :</strong> ${contactName}</li>
            <li><strong>Email :</strong> ${prospect.contact.email}</li>
            <li><strong>Téléphone :</strong> ${prospect.contact.telephonePortable || prospect.contact.telephoneFixe || 'Non précisé'}</li>
            <li><strong>Pays :</strong> ${prospect.entreprise.pays || 'Non précisé'}</li>
            <li><strong>Postes :</strong> ${prospect.postes?.length || 0}</li>
          </ul>
        </div>
      `;

      await sendEmailSafe({
        to: INTERNAL_CONTACT_EMAIL,
        subject: subjectAdmin,
        body: textAdmin,
        html: htmlAdmin,
        replyTo: prospect.contact.email,
      });
    } catch (notifyError) {
      console.error('⚠️ Emails devis (non-bloquant):', notifyError);
    }

    // 🔗 Sync CRM + Trigger automations (non bloquant)
    try {
      const syncResult = await syncDevisToProspect(prospect);
      if (syncResult?.prospectId) {
        await kv.set(`prospects:${id}`, {
          ...prospect,
          prospectId: syncResult.prospectId,
        });

        // Déclencher les workflows automatiquement (SMTP)
        await triggerWorkflow('prospect_created', { prospect_id: syncResult.prospectId });

        if (
          syncResult.previousStatus &&
          syncResult.currentStatus &&
          syncResult.previousStatus !== syncResult.currentStatus
        ) {
          await triggerWorkflow('status_changed', {
            prospect_id: syncResult.prospectId,
            status_from: syncResult.previousStatus,
            status_to: syncResult.currentStatus,
          });
        }
      }
    } catch (syncError) {
      console.error('⚠️ Sync CRM devis (non-bloquant):', syncError);
    }
    
    return c.json({
      success: true,
      id,
      numero,
      message: 'Demande de devis enregistrée avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur création devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la création du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * POST /make-server-10092a63/devis/preview-pricing
 * Calcule le pricing sans persistance (preview UI)
 */
devis.post('/preview-pricing', async (c) => {
  try {
    const data = await c.req.json();
    const pricing = computeDevisPricing(data);
    return c.json({ success: true, pricing });
  } catch (error) {
    console.error('❌ Erreur preview pricing:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors du calcul du pricing',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis
 * Lister tous les devis/prospects
 */
devis.get('/', async (c) => {
  try {
    const listeIds = await kv.get('prospects:list') || [];
    
    if (listeIds.length === 0) {
      return c.json({
        success: true,
        data: [],
        total: 0
      });
    }
    
    // Récupérer tous les prospects
    const prospects = await kv.mget(listeIds.map(id => `prospects:${id}`));
    
    // Filtrer les null (prospects supprimés)
    const prospectsFiltres = prospects.filter(p => p !== null);
    const prospectsSanitises = prospectsFiltres.map((prospect) => applySignaturePrivacy(prospect));
    
    return c.json({
      success: true,
      data: prospectsSanitises,
      total: prospectsSanitises.length
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis/:id
 * Récupérer un devis spécifique
 *
 * ⚠️ PRICING CANONIQUE: Cette route garantit que le devis retourné
 * contient toujours pricing.totals (via ensurePricingPayload).
 * Self-heal: si pricing manquant, on l'enrichit et on persiste.
 */
devis.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const prospect = await kv.get(`prospects:${id}`);

    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }

    // Garantir payload canonique avec pricing
    const prospectWithPricing = ensurePricingPayload(prospect);
    const prospectWithPrivacy = applySignaturePrivacy(prospectWithPricing);

    // Self-heal: si l'objet a été enrichi, persister pour éviter recalcul futur
    if (prospectWithPricing !== prospect || prospectWithPrivacy !== prospectWithPricing) {
      await kv.set(`prospects:${id}`, prospectWithPrivacy);
    }

    return c.json({
      success: true,
      data: prospectWithPrivacy
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * PATCH /make-server-10092a63/devis/:id
 * Mettre à jour un devis (statut, notes, etc.)
 */
devis.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Mettre à jour le statut si fourni
    if (updates.statut && prospect.statut !== updates.statut) {
      // Mettre à jour les stats
      const stats = await kv.get('prospects:stats') || {};
      if (stats[prospect.statut]) stats[prospect.statut] -= 1;
      if (stats[updates.statut]) stats[updates.statut] += 1;
      await kv.set('prospects:stats', stats);
    }
    
    const shouldReprice = Boolean(
      updates.postes ||
      updates.conditions ||
      updates.candidats ||
      updates.entreprise ||
      updates.majorations
    );

    // Fusionner les mises à jour
    const prospectMisAJour = ensurePricingPayload({
      ...prospect,
      ...updates,
      updatedAt: new Date().toISOString()
    }, { force: shouldReprice });

    const prospectAvecPrivacy = applySignaturePrivacy(prospectMisAJour);
    
    await kv.set(`prospects:${id}`, prospectAvecPrivacy);
    
    console.log(`✅ Devis mis à jour: ${id}`);
    
    return c.json({
      success: true,
      data: prospectAvecPrivacy
    });
    
  } catch (error) {
    console.error('❌ Erreur mise à jour devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la mise à jour du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * DELETE /make-server-10092a63/devis/:id
 * Supprimer un devis
 */
devis.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const prospect = await kv.get(`prospects:${id}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Supprimer de la liste
    const listeIds = await kv.get('prospects:list') || [];
    const nouvelleListe = listeIds.filter(i => i !== id);
    await kv.set('prospects:list', nouvelleListe);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats.total) stats.total -= 1;
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    await kv.set('prospects:stats', stats);
    
    // Supprimer le prospect
    await kv.del(`prospects:${id}`);
    
    console.log(`✅ Devis supprimé: ${id}`);
    
    return c.json({
      success: true,
      message: 'Devis supprimé avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur suppression devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la suppression du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * GET /make-server-10092a63/devis/stats
 * Récupérer les statistiques
 */
devis.get('/api/stats', async (c) => {
  try {
    const stats = await kv.get('prospects:stats') || {
      total: 0,
      nouveau: 0,
      enCours: 0,
      devisEnvoye: 0,
      signe: 0,
      converti: 0,
      perdu: 0
    };
    
    return c.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération stats:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la récupération des statistiques',
        details: error.message
      },
      500
    );
  }
});

/**
 * POST /make-server-10092a63/generer-pdf
 * Générer un PDF pour un devis
 *
 * Body: { devisId, inclureCGV?, force? }
 * - force: si true, régénère même si pdfUrl existe déjà (utile debug/prod)
 */
devis.post('/generer-pdf', async (c) => {
  try {
    const { devisId, inclureCGV, force } = await c.req.json();

    console.log(`📄 Génération PDF pour devis: ${devisId}${force ? ' (force=true)' : ''}`);

    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);

    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }

    // Si PDF existe déjà et force=false, retourner l'URL existante
    const existingPdfUrl = prospect.pdfUrl || prospect.pdf_url;
    if (existingPdfUrl && !force) {
      console.log(`📄 PDF existant retourné (force=false): ${existingPdfUrl}`);
      return c.json({
        success: true,
        pdfUrl: existingPdfUrl,
        pdfId: prospect.pdf_storage_path || 'existing',
        message: 'PDF existant retourné',
        cached: true,
      });
    }

    // Génération PDF avec payload canonique (ensurePricingPayload appelé dans generateAndStorePdf)
    const pdfResult = await generateAndStorePdf(prospect, Boolean(inclureCGV));

    if (!pdfResult) {
      return c.json(
        {
          success: false,
          error: 'Impossible de générer le PDF'
        },
        500
      );
    }

    console.log(`✅ PDF généré: ${pdfResult.pdfPath}`);

    return c.json({
      success: true,
      pdfUrl: pdfResult.pdfUrl,
      pdfId: pdfResult.pdfPath,
      message: 'PDF généré avec succès',
      regenerated: Boolean(force),
    });

  } catch (error) {
    console.error('❌ Erreur génération PDF:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la génération du PDF',
        details: error.message
      },
      500
    );
  }
});

/**
 * POST /make-server-10092a63/devis/signer-devis
 * Signer un devis électroniquement avec certification complète
 */
devis.post('/signer-devis', async (c) => {
  try {
    const { 
      devisId, 
      signatureBase64, 
      accepteCGV,
      identiteSignataire // Nouvelles données d'identité
    } = await c.req.json();
    
    if (!accepteCGV) {
      return c.json(
        {
          success: false,
          error: 'Vous devez accepter les CGV'
        },
        400
      );
    }
    
    console.log(`✍️ Signature devis: ${devisId}`);
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Vérifier qu'il n'est pas déjà signé
    if (prospect.statut === 'signe') {
      return c.json(
        {
          success: false,
          error: 'Ce devis a déjà été signé'
        },
        400
      );
    }
    
    // Générer un hash SHA-256 du contenu du devis pour garantir l'intégrité
    const devisContent = JSON.stringify({
      numero: prospect.numero,
      entreprise: prospect.entreprise,
      contact: prospect.contact,
      postes: prospect.postes,
      conditions: prospect.conditions
    });
    
    const encoder = new TextEncoder();
    const data = encoder.encode(devisContent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Récupérer les métadonnées de la requête
    const ipAddress = c.req.header('x-forwarded-for') || 
                      c.req.header('x-real-ip') || 
                      c.req.header('cf-connecting-ip') || 
                      'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';
    const timestamp = new Date().toISOString();
    const transactionId = crypto.randomUUID();
    
    const signatureMetadata = sanitizeSignatureMetadata({
      ipAddress,
      userAgent,
      timestamp,
      transactionId,
      signatureMethod: 'direct_form',
      timestampReadable: new Date(timestamp).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Europe/Paris'
      })
    });

    // Créer le certificat de signature électronique
    const certificatSignature = {
      // Signature graphique
      image: signatureBase64,
      
      // Identité du signataire (certifiée par les données du formulaire)
      signataire: {
        nom: prospect.contact.nom,
        prenom: prospect.contact.prenom,
        email: prospect.contact.email,
        fonction: prospect.contact.fonction,
        entreprise: prospect.entreprise.raisonSociale,
        siret: prospect.entreprise.siret
      },
      
      // Traçabilité technique
      metadata: signatureMetadata,
      
      // Preuve d'intégrité
      integrite: {
        hashAlgorithm: 'SHA-256',
        documentHash: hashHex,
        devisNumero: prospect.numero,
        devisId: devisId
      },
      
      // Consentement
      consentement: {
        accepteCGV: true,
        dateAcceptation: timestamp,
        mentions: 'Le signataire certifie avoir lu et accepté les Conditions Générales de Vente et que les informations fournies sont exactes. Cette signature électronique a la même valeur légale qu\'une signature manuscrite conformément au règlement eIDAS (UE) n°910/2014.'
      },
      
      // Informations supplémentaires pour la traçabilité
      contexte: identiteSignataire || {}
    };
    
    await logSignatureAudit(devisId, {
      devisId,
      transactionId,
      signatureMethod: 'direct_form',
      ipAddress,
      userAgent,
      timestamp,
      hashAlgorithm: certificatSignature.integrite.hashAlgorithm,
      documentHash: certificatSignature.integrite.documentHash,
    });

    // Mettre à jour le statut du devis
    // ⚠️ IMPORTANT: on merge signature sur le prospect existant (qui contient déjà pricing)
    // ensurePricingPayload garantit que pricing existe toujours dans l'objet final
    const prospectMisAJour = ensurePricingPayload({
      ...prospect, // conserve pricing, majorations, postes existants
      statut: 'signe',
      signature: certificatSignature,
      updatedAt: timestamp
    });
    const prospectAvecPrivacy = applySignaturePrivacy(prospectMisAJour);
    
    await kv.set(`prospects:${devisId}`, prospectAvecPrivacy);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    if (stats['signe']) {
      stats['signe'] += 1;
    } else {
      stats['signe'] = 1;
    }
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis signé avec certification complète: ${devisId}`);
    console.log(`📍 IP: ${ipAddress}`);
    console.log(`🔐 Hash: ${hashHex.substring(0, 16)}...`);
    
    const pdfResult = await generateAndStorePdf(prospectAvecPrivacy, true);
    const prospectWithPdf = pdfResult?.prospectUpdated || prospectAvecPrivacy;
    const pdfAttachment = pdfResult
      ? {
          filename: `Devis-${prospectWithPdf.numero || prospectWithPdf.id}.pdf`,
          content: pdfResult.pdfBytes,
          contentType: 'application/pdf',
        }
      : undefined;

    // 🔄 Sync CRM + email confirmation
    await updateProspectCustomFields(prospectWithPdf, {
      devis_status: 'signe',
      signature_date: timestamp,
      signed_via_token: false,
      ...(pdfResult
        ? {
            pdf_url: pdfResult.pdfUrl,
            pdf_storage_path: pdfResult.pdfPath,
            pdf_generated_at: prospectWithPdf.pdf_generated_at || new Date().toISOString(),
          }
        : {}),
    });
    await sendSignatureConfirmationEmails(prospectWithPdf, timestamp, pdfAttachment);
    
    return c.json({
      success: true,
      message: 'Devis signé avec succès',
      data: prospectWithPdf,
      certificat: certificatSignature
    });
    
  } catch (error) {
    console.error('❌ Erreur signature devis:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la signature du devis',
        details: error.message
      },
      500
    );
  }
});

/**
 * 🆕 POST /make-server-10092a63/devis/generer-lien-signature
 * Génère un lien de signature unique pour un devis
 */
devis.post('/generer-lien-signature', async (c) => {
  try {
    const { devisId } = await c.req.json();
    
    console.log(`🔗 Génération lien signature pour devis: ${devisId}`);
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Vérifier qu'il n'est pas déjà signé
    if (prospect.statut === 'signe') {
      return c.json(
        {
          success: false,
          error: 'Ce devis a déjà été signé'
        },
        400
      );
    }
    
    // Générer un token unique et sécurisé
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const token = Array.from(tokenBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const timestamp = new Date().toISOString();
    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 jours
    
    // Sauvegarder le token
    const tokenData = {
      token,
      devisId,
      prospectEmail: prospect.contact.email,
      createdAt: timestamp,
      expiresAt: expirationDate.toISOString(),
      used: false
    };
    
    await kv.set(`signature-token:${token}`, tokenData);
    
    // Générer l'URL complète (à adapter selon votre domaine)
    const signatureUrl = `${c.req.url.split('/functions')[0]}/signer/${token}`;

    // Mettre à jour le devis avec le token
    const prospectMisAJour = {
      ...prospect,
      signatureToken: token,
      signatureUrl: signatureUrl,
      signatureLinkGeneratedAt: timestamp,
      signatureLinkExpiresAt: expirationDate.toISOString(),
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
    console.log(`✅ Lien signature généré: ${token.substring(0, 16)}...`);
    console.log(`🔗 URL: ${signatureUrl}`);
    
    // 🆕 ENVOI AUTOMATIQUE D'EMAIL AVEC LE LIEN
    try {
      const template = SIGNATURE_EMAIL_TEMPLATES.find(t => t.id === 'tpl-signature-link');
      
      if (template && prospectMisAJour) {
        const totalCandidats = prospectMisAJour.postes.reduce((sum, p) => sum + p.quantite, 0);
        const variables = {
          contact_firstname: prospectMisAJour.contact.prenom || '',
          contact_lastname: prospectMisAJour.contact.nom || '',
          company: prospectMisAJour.entreprise.raisonSociale || '',
          quote_number: prospectMisAJour.numero || '',
          signature_url: signatureUrl,
          positions_count: String(prospectMisAJour.postes.length),
          candidates_count: String(totalCandidats),
          sector: prospectMisAJour.postes[0]?.secteur || 'Non spécifié',
          country: prospectMisAJour.entreprise.pays || '',
        };
        
        const { subject, bodyHtml, bodyText } = applyTemplateVariables(template, variables);
        
        await sendEmailSafe({
          to: prospectMisAJour.contact.email,
          subject,
          body: bodyText,
          html: bodyHtml,
        });
      }
    } catch (emailError) {
      // Ne pas bloquer si l'email échoue (non-bloquant)
      console.error('⚠️ Erreur envoi email (non-bloquant):', emailError);
    }

    // 🔄 Synchroniser infos signature dans le CRM prospects
    await updateProspectCustomFields(prospectMisAJour, {
      signature_token: token,
      signature_url: signatureUrl,
      signature_link_generated_at: timestamp,
      signature_link_expires_at: expirationDate.toISOString(),
    });
    
    return c.json({
      success: true,
      token,
      signatureUrl,
      expiresAt: expirationDate.toISOString(),
      message: 'Lien de signature généré avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur génération lien signature:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la génération du lien',
        details: error.message
      },
      500
    );
  }
});

/**
 * 🆕 POST /make-server-10092a63/devis/verifier-token-signature
 * Vérifie la validité d'un token de signature et retourne le devis
 */
devis.post('/verifier-token-signature', async (c) => {
  try {
    const { token } = await c.req.json();
    
    console.log(`🔍 Vérification token: ${token.substring(0, 16)}...`);
    
    // Récupérer les données du token
    const tokenData = await kv.get(`signature-token:${token}`);
    
    if (!tokenData) {
      return c.json(
        {
          success: false,
          error: 'Lien invalide ou expiré'
        },
        404
      );
    }
    
    // Vérifier l'expiration
    const now = new Date();
    const expirationDate = new Date(tokenData.expiresAt);
    
    if (now > expirationDate) {
      return c.json(
        {
          success: false,
          error: 'Ce lien a expiré'
        },
        400
      );
    }
    
    // Récupérer le devis
    const prospect = await kv.get(`prospects:${tokenData.devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Garantir payload canonique avec pricing (self-heal)
    const prospectWithPricing = ensurePricingPayload(prospect);
    const prospectWithPrivacy = applySignaturePrivacy(prospectWithPricing);

    if (prospectWithPricing !== prospect || prospectWithPrivacy !== prospectWithPricing) {
      await kv.set(`prospects:${tokenData.devisId}`, prospectWithPrivacy);
    }

    console.log(`✅ Token valide pour devis: ${prospectWithPrivacy.numero}`);
    
    return c.json({
      success: true,
      devis: prospectWithPrivacy,
      tokenData: {
        createdAt: tokenData.createdAt,
        expiresAt: tokenData.expiresAt
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur vérification token:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la vérification du lien',
        details: error.message
      },
      500
    );
  }
});

/**
 * 🆕 POST /make-server-10092a63/devis/signer-avec-token
 * Signer un devis avec un token de signature
 */
devis.post('/signer-avec-token', async (c) => {
  try {
    const { token, signatureBase64, accepteCGV } = await c.req.json();
    
    if (!accepteCGV) {
      return c.json(
        {
          success: false,
          error: 'Vous devez accepter les CGV'
        },
        400
      );
    }
    
    console.log(`✍️ Signature avec token: ${token.substring(0, 16)}...`);
    
    // Vérifier le token
    const tokenData = await kv.get(`signature-token:${token}`);
    
    if (!tokenData) {
      return c.json(
        {
          success: false,
          error: 'Lien invalide ou expiré'
        },
        404
      );
    }
    
    // Vérifier l'expiration
    const now = new Date();
    const expirationDate = new Date(tokenData.expiresAt);
    
    if (now > expirationDate) {
      return c.json(
        {
          success: false,
          error: 'Ce lien a expiré'
        },
        400
      );
    }
    
    // Vérifier si déjà utilisé
    if (tokenData.used) {
      return c.json(
        {
          success: false,
          error: 'Ce lien a déjà été utilisé'
        },
        400
      );
    }
    
    // Récupérer le devis
    const devisId = tokenData.devisId;
    const prospect = await kv.get(`prospects:${devisId}`);
    
    if (!prospect) {
      return c.json(
        {
          success: false,
          error: 'Devis non trouvé'
        },
        404
      );
    }
    
    // Vérifier qu'il n'est pas déjà signé
    if (prospect.statut === 'signe') {
      return c.json(
        {
          success: false,
          error: 'Ce devis a déjà été signé'
        },
        400
      );
    }
    
    // Générer le hash d'intégrité
    const devisContent = JSON.stringify({
      numero: prospect.numero,
      entreprise: prospect.entreprise,
      contact: prospect.contact,
      postes: prospect.postes,
      conditions: prospect.conditions
    });
    
    const encoder = new TextEncoder();
    const data = encoder.encode(devisContent);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Métadonnées
    const ipAddress = c.req.header('x-forwarded-for') || 
                      c.req.header('x-real-ip') || 
                      c.req.header('cf-connecting-ip') || 
                      'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';
    const timestamp = new Date().toISOString();
    const transactionId = crypto.randomUUID();
    
    const signatureMetadata = sanitizeSignatureMetadata({
      ipAddress,
      userAgent,
      timestamp,
      transactionId,
      timestampReadable: new Date(timestamp).toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Europe/Paris'
      }),
      signatureMethod: 'online_link'
    });

    // Créer le certificat de signature
    const certificatSignature = {
      image: signatureBase64,
      signataire: {
        nom: prospect.contact.nom,
        prenom: prospect.contact.prenom,
        email: prospect.contact.email,
        fonction: prospect.contact.fonction,
        entreprise: prospect.entreprise.raisonSociale,
        siret: prospect.entreprise.siret
      },
      metadata: signatureMetadata,
      integrite: {
        hashAlgorithm: 'SHA-256',
        documentHash: hashHex,
        devisNumero: prospect.numero,
        devisId: devisId
      },
      consentement: {
        accepteCGV: true,
        dateAcceptation: timestamp,
        mentions: 'Le signataire certifie avoir lu et accepté les Conditions Générales de Vente et que les informations fournies sont exactes. Cette signature électronique a la même valeur légale qu\'une signature manuscrite conformément au règlement eIDAS (UE) n°910/2014.'
      }
    };
    
    await logSignatureAudit(devisId, {
      devisId,
      transactionId,
      signatureMethod: 'online_link',
      ipAddress,
      userAgent,
      timestamp,
      token,
      hashAlgorithm: certificatSignature.integrite.hashAlgorithm,
      documentHash: certificatSignature.integrite.documentHash,
    });

    // Mettre à jour le devis (signature via token)
    // ⚠️ IMPORTANT: on merge signature sur le prospect existant (qui contient déjà pricing)
    // ensurePricingPayload garantit que pricing existe toujours dans l'objet final
    const prospectMisAJour = ensurePricingPayload({
      ...prospect, // conserve pricing, majorations, postes existants
      statut: 'signe',
      signature: certificatSignature,
      signedViaToken: true,
      signatureTokenUsed: token,
      updatedAt: timestamp
    });
    const prospectAvecPrivacy = applySignaturePrivacy(prospectMisAJour);
    
    await kv.set(`prospects:${devisId}`, prospectAvecPrivacy);
    
    // Marquer le token comme utilisé
    const tokenDataUpdated = {
      ...tokenData,
      used: true,
      usedAt: timestamp
    };
    await kv.set(`signature-token:${token}`, tokenDataUpdated);
    
    // Mettre à jour les stats
    const stats = await kv.get('prospects:stats') || {};
    if (stats[prospect.statut]) stats[prospect.statut] -= 1;
    if (stats['signe']) {
      stats['signe'] += 1;
    } else {
      stats['signe'] = 1;
    }
    await kv.set('prospects:stats', stats);
    
    console.log(`✅ Devis signé via lien: ${prospect.numero}`);
    console.log(`📍 IP: ${ipAddress}`);
    console.log(`🔐 Hash: ${hashHex.substring(0, 16)}...`);
    
    const pdfResult = await generateAndStorePdf(prospectAvecPrivacy, true);
    const prospectWithPdf = pdfResult?.prospectUpdated || prospectAvecPrivacy;
    const pdfAttachment = pdfResult
      ? {
          filename: `Devis-${prospectWithPdf.numero || prospectWithPdf.id}.pdf`,
          content: pdfResult.pdfBytes,
          contentType: 'application/pdf',
        }
      : undefined;

    // 🔄 Sync CRM + email confirmation
    await updateProspectCustomFields(prospectWithPdf, {
      devis_status: 'signe',
      signature_date: timestamp,
      signed_via_token: true,
      signature_token_used: token,
      ...(pdfResult
        ? {
            pdf_url: pdfResult.pdfUrl,
            pdf_storage_path: pdfResult.pdfPath,
            pdf_generated_at: prospectWithPdf.pdf_generated_at || new Date().toISOString(),
          }
        : {}),
    });
    await sendSignatureConfirmationEmails(prospectWithPdf, timestamp, pdfAttachment);
    
    return c.json({
      success: true,
      message: 'Devis signé avec succès',
      data: prospectWithPdf,
      certificat: certificatSignature
    });
    
  } catch (error) {
    console.error('❌ Erreur signature avec token:', error);
    return c.json(
      {
        success: false,
        error: 'Erreur lors de la signature du devis',
        details: error.message
      },
      500
    );
  }
});

export default devis;
