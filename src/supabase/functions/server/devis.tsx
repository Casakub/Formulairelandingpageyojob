import { Hono } from 'npm:hono';
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from './kv_store.tsx';

const devis = new Hono();

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
    
    // Créer l'objet prospect/devis
    const prospect = {
      id,
      numero,
      type: 'devis',
      statut: 'nouveau',
      createdAt: timestamp,
      updatedAt: timestamp,
      
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
      
      // Métadonnées
      metadata: {
        source: 'formulaire-web',
        userAgent: c.req.header('user-agent'),
        ip: c.req.header('x-forwarded-for') || c.req.header('x-real-ip')
      }
    };
    
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
    
    return c.json({
      success: true,
      data: prospectsFiltres,
      total: prospectsFiltres.length
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
    
    return c.json({
      success: true,
      data: prospect
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
    
    // Fusionner les mises à jour
    const prospectMisAJour = {
      ...prospect,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`prospects:${id}`, prospectMisAJour);
    
    console.log(`✅ Devis mis à jour: ${id}`);
    
    return c.json({
      success: true,
      data: prospectMisAJour
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
 */
devis.post('/generer-pdf', async (c) => {
  try {
    const { devisId, inclureCGV } = await c.req.json();
    
    console.log(`📄 Génération PDF pour devis: ${devisId}`);
    
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
    
    // TODO: Implémenter la génération PDF réelle avec react-pdf
    // Pour l'instant, on retourne un placeholder
    
    const pdfData = {
      id: crypto.randomUUID(),
      devisId,
      numero: prospect.numero,
      pdfUrl: '#', // URL temporaire
      statut: 'genere',
      dateGeneration: new Date().toISOString(),
      inclureCGV
    };
    
    // Sauvegarder les métadonnées du PDF
    await kv.set(`pdf:${pdfData.id}`, pdfData);
    
    console.log(`✅ PDF généré: ${pdfData.id}`);
    
    return c.json({
      success: true,
      pdfUrl: pdfData.pdfUrl,
      pdfId: pdfData.id,
      message: 'PDF généré avec succès'
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
      metadata: {
        ipAddress: ipAddress,
        userAgent: userAgent,
        timestamp: timestamp,
        timestampReadable: new Date(timestamp).toLocaleString('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Europe/Paris'
        })
      },
      
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
    
    // Mettre à jour le statut du devis
    const prospectMisAJour = {
      ...prospect,
      statut: 'signe',
      signature: certificatSignature,
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
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
    
    // TODO: Envoyer email de confirmation avec certificat
    // TODO: Régénérer le PDF avec la signature et le certificat
    
    return c.json({
      success: true,
      message: 'Devis signé avec succès',
      data: prospectMisAJour,
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
    
    // Mettre à jour le devis avec le token
    const prospectMisAJour = {
      ...prospect,
      signatureToken: token,
      signatureLinkGeneratedAt: timestamp,
      signatureLinkExpiresAt: expirationDate.toISOString(),
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
    // Générer l'URL complète (à adapter selon votre domaine)
    const signatureUrl = `${c.req.url.split('/functions')[0]}/signer/${token}`;
    
    console.log(`✅ Lien signature généré: ${token.substring(0, 16)}...`);
    console.log(`🔗 URL: ${signatureUrl}`);
    
    // 🆕 ENVOI AUTOMATIQUE D'EMAIL AVEC LE LIEN
    try {
      const { SIGNATURE_EMAIL_TEMPLATES } = await import('./signature-email-templates.ts');
      const template = SIGNATURE_EMAIL_TEMPLATES.find(t => t.id === 'tpl-signature-link');
      
      if (template && prospectMisAJour) {
        // Calculer candidats totaux
        const totalCandidats = prospectMisAJour.postes.reduce((sum, p) => sum + p.quantite, 0);
        
        // Remplacer les variables dans le template
        let emailBody = template.body_html;
        let emailSubject = template.subject;
        
        const variables = {
          contact_firstname: prospectMisAJour.contact.prenom || '',
          contact_lastname: prospectMisAJour.contact.nom || '',
          company: prospectMisAJour.entreprise.raisonSociale || '',
          quote_number: prospectMisAJour.numero || '',
          signature_url: signatureUrl,
          positions_count: String(prospectMisAJour.postes.length),
          candidates_count: String(totalCandidats),
          sector: prospectMisAJour.postes[0]?.secteur || 'Non spécifié'
        };
        
        // Remplacer les variables
        Object.entries(variables).forEach(([key, value]) => {
          const placeholder = `{{${key}}}`;
          emailBody = emailBody.replaceAll(placeholder, value);
          emailSubject = emailSubject.replaceAll(placeholder, value);
        });
        
        // TODO: Configurer votre service SMTP et envoyer l'email
        // Exemple avec Deno.env pour les credentials SMTP
        console.log('📧 Email automatique prêt à envoyer :');
        console.log('To:', prospectMisAJour.contact.email);
        console.log('Subject:', emailSubject);
        console.log('📄 Template HTML chargé et personnalisé');
        
        // OPTION 1: Utiliser un service externe (SendGrid, Mailgun, etc.)
        // await fetch('https://api.sendgrid.com/v3/mail/send', { ... });
        
        // OPTION 2: Utiliser SMTP direct avec Deno
        // const smtpConfig = {
        //   host: Deno.env.get('SMTP_HOST'),
        //   port: Number(Deno.env.get('SMTP_PORT')),
        //   username: Deno.env.get('SMTP_USER'),
        //   password: Deno.env.get('SMTP_PASS')
        // };
        // await sendEmailViaSMTP(smtpConfig, prospectMisAJour.contact.email, emailSubject, emailBody);
        
        console.log('✅ Email de signature configuré (à activer avec SMTP)');
      }
    } catch (emailError) {
      // Ne pas bloquer si l'email échoue (non-bloquant)
      console.error('⚠️ Erreur envoi email (non-bloquant):', emailError);
    }
    
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
    
    console.log(`✅ Token valide pour devis: ${prospect.numero}`);
    
    return c.json({
      success: true,
      devis: prospect,
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
      metadata: {
        ipAddress,
        userAgent,
        timestamp,
        timestampReadable: new Date(timestamp).toLocaleString('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Europe/Paris'
        }),
        signatureMethod: 'online_link'
      },
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
    
    // Mettre à jour le devis
    const prospectMisAJour = {
      ...prospect,
      statut: 'signe',
      signature: certificatSignature,
      signedViaToken: true,
      signatureTokenUsed: token,
      updatedAt: timestamp
    };
    
    await kv.set(`prospects:${devisId}`, prospectMisAJour);
    
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
    
    // TODO: Envoyer email de confirmation
    // TODO: Déclencher workflow "Devis signé"
    
    return c.json({
      success: true,
      message: 'Devis signé avec succès',
      data: prospectMisAJour,
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
