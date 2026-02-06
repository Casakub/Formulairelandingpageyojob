import { Hono } from "npm:hono@4";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { MOCK_WORKFLOWS, MOCK_EMAIL_TEMPLATES, MOCK_AUTOMATION_RUNS, MOCK_AUTOMATION_LOGS, detectProspectLanguage } from "./automations-data.ts";
import { emailService } from "./email-service.tsx";
import type { AutomationWorkflow } from "./types.ts";

const app = new Hono();

/**
 * 🎯 WORKFLOW ENGINE - MOTEUR D'EXÉCUTION
 * 
 * Ce moteur permet d'exécuter réellement les workflows avec les vraies données
 * - Récupère les données des prospects depuis la table Supabase
 * - Évalue les conditions
 * - Exécute les actions (envoyer email, créer tâche, etc.)
 * - 🌍 Support multilingue automatique (27 pays, 22 langues)
 */

// Helper pour obtenir le client Supabase avec permissions admin
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

// Détecte si la table automations_workflows existe (sinon on fallback sur les mocks)
async function isAutomationsDbReady(supabase: any): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("automations_workflows")
      .select("id")
      .limit(1);

    if (error) {
      const message = (error as any)?.message || "";
      const code = (error as any)?.code || "";
      if (
        code === "PGRST205" ||
        message.includes("schema cache") ||
        message.includes("does not exist") ||
        message.includes("relation")
      ) {
        return false;
      }
      console.error("Automations DB check failed:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Automations DB check error:", err);
    return false;
  }
}

async function loadWorkflows(supabase: any, dbReady: boolean): Promise<any[]> {
  if (dbReady) {
    const { data, error } = await supabase
      .from("automations_workflows")
      .select("*");

    if (error) {
      console.error("Error loading workflows from DB:", error);
      return MOCK_WORKFLOWS;
    }

    return data || [];
  }

  return MOCK_WORKFLOWS;
}

async function loadWorkflowById(supabase: any, dbReady: boolean, workflowId: string): Promise<any | null> {
  if (dbReady) {
    const { data, error } = await supabase
      .from("automations_workflows")
      .select("*")
      .eq("id", workflowId)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  return MOCK_WORKFLOWS.find(w => w.id === workflowId) || null;
}

async function persistWorkflowStats(supabase: any, dbReady: boolean, workflow: any) {
  if (!dbReady) return;

  try {
    await supabase
      .from("automations_workflows")
      .update({
        stats: workflow.stats,
        updated_at: new Date().toISOString(),
      })
      .eq("id", workflow.id);
  } catch (error) {
    console.error("Error persisting workflow stats:", error);
  }
}

function getWorkflowRunMarkerKey(workflowId: string): string {
  return `workflow_last_run:${workflowId}`;
}

function hasWorkflowRun(prospect: any, workflowId: string): boolean {
  const customFields = prospect?.custom_fields || {};
  const automationFlags = customFields?.automation_flags || {};
  return Boolean(automationFlags[getWorkflowRunMarkerKey(workflowId)]);
}

async function markWorkflowRun(supabase: any, prospect: any, workflowId: string) {
  try {
    const customFields = prospect?.custom_fields || {};
    const automationFlags = customFields?.automation_flags || {};
    const updatedFlags = {
      ...automationFlags,
      [getWorkflowRunMarkerKey(workflowId)]: new Date().toISOString(),
    };

    const updatedCustomFields = {
      ...customFields,
      automation_flags: updatedFlags,
    };

    const { error } = await supabase
      .from('prospects')
      .update({ custom_fields: updatedCustomFields })
      .eq('id', prospect.id);

    if (error) {
      console.error('⚠️ Erreur update workflow marker:', error);
      return;
    }

    prospect.custom_fields = updatedCustomFields;
  } catch (error) {
    console.error('⚠️ Erreur update workflow marker (non-bloquant):', error);
  }
}

/**
 * 🌍 Trouve le template d'email dans la langue du prospect
 * @param templateId - ID du template de base (ex: 'tpl-waitlist-welcome')
 * @param prospect - Données du prospect
 * @returns Template dans la bonne langue ou fallback FR/EN
 */
function getLocalizedTemplate(templateId: string, prospect: any): any {
  // 1. Détecter la langue du prospect
  const prospectLang = detectProspectLanguage(prospect);
  console.log(`🌍 Langue détectée pour ${prospect.email || 'prospect'}: ${prospectLang} (pays: ${prospect.country || 'N/A'})`);
  
  // 2. Retirer le suffixe de langue si présent (tpl-xxx-fr → tpl-xxx)
  const baseTemplateId = templateId.replace(/-[a-z]{2}$/, '');
  
  // 3. Construire l'ID du template localisé
  const localizedTemplateId = `${baseTemplateId}-${prospectLang}`;
  
  // 4. Chercher le template localisé
  let template = MOCK_EMAIL_TEMPLATES.find(t => t.id === localizedTemplateId);
  
  if (template) {
    console.log(`✅ Template localisé trouvé: ${localizedTemplateId}`);
    return template;
  }
  
  // 5. Fallback 1: Template français (langue par défaut)
  const frenchTemplateId = `${baseTemplateId}-fr`;
  template = MOCK_EMAIL_TEMPLATES.find(t => t.id === frenchTemplateId);
  
  if (template) {
    console.log(`⚠️ Template ${localizedTemplateId} non trouvé, fallback sur ${frenchTemplateId}`);
    return template;
  }
  
  // 6. Fallback 2: Template de base sans suffixe
  template = MOCK_EMAIL_TEMPLATES.find(t => t.id === baseTemplateId);
  
  if (template) {
    console.log(`⚠️ Template FR non trouvé, fallback sur template de base ${baseTemplateId}`);
    return template;
  }
  
  // 7. Fallback 3: Template avec l'ID original (peut avoir un suffixe)
  template = MOCK_EMAIL_TEMPLATES.find(t => t.id === templateId);
  
  if (template) {
    console.log(`⚠️ Utilisation du template original ${templateId}`);
    return template;
  }
  
  // 8. Aucun template trouvé
  console.error(`❌ Aucun template trouvé pour ${templateId} (langue: ${prospectLang})`);
  return null;
}

/**
 * Remplace les variables dans un texte avec les données du prospect
 */
function replaceVariables(text: string, prospectData: any): string {
  let result = text;

  const customFields = prospectData?.custom_fields || {};
  const customContact = customFields?.contact || {};
  const customEntreprise = customFields?.entreprise || {};
  const customConditions = customFields?.conditions || {};
  const customPostes = Array.isArray(customFields?.postes) ? customFields.postes : [];
  
  // Calculer deadline_time (maintenant + 4h)
  const deadline4h = new Date();
  deadline4h.setHours(deadline4h.getHours() + 4);
  const deadlineTime = deadline4h.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const deadline4hStr = deadline4h.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  
  // Variables disponibles
  const fallbackFirstName = customContact.prenom || customFields.contact_firstname || '';
  const fallbackLastName = customContact.nom || customFields.contact_lastname || '';
  const fallbackName = [customContact.prenom, customContact.nom].filter(Boolean).join(' ').trim();
  const fallbackCompany = customEntreprise.raisonSociale || customFields.company || customFields.company_name || '';
  const fallbackEmail = customContact.email || customFields.email || '';
  const fallbackPhone = customContact.telephonePortable || customContact.telephoneFixe || customFields.phone || '';
  const fallbackCountry = customEntreprise.pays || customFields.country || customFields.country_code || '';
  const fallbackIndustry = customFields.industry_sector || customFields.industry || customFields.sector || '';
  const fallbackWorkers = customFields.workers_count ?? customFields.workers ?? '';
  const fallbackProjectDescription =
    customFields.project_description ||
    customConditions.motifRecours ||
    customConditions.lieuxMission ||
    '';
  const fallbackQuoteNumber = customFields.devis_numero || customFields.quote_number || customFields.devis_id || '';
  const fallbackSignatureUrl = customFields.signature_url || customFields.signatureUrl || '';
  const fallbackSignatureDate = customFields.signature_date || customFields.signed_at || '';
  const fallbackPositionsCount = customFields.positions_count ?? customPostes.length ?? '';
  const fallbackCandidatesCount = customFields.candidates_count ?? fallbackWorkers ?? '';

  const variables: Record<string, string> = {
    // Variables prospect de base
    '{{name}}': prospectData.name || prospectData.contact_name || fallbackName || 'Client',
    '{{email}}': prospectData.email || fallbackEmail || '',
    '{{company}}': prospectData.company_name || prospectData.company || fallbackCompany || '',
    '{{phone}}': prospectData.phone || fallbackPhone || '',
    '{{country}}': prospectData.country || fallbackCountry || '',
    '{{status}}': prospectData.status || '',
    
    // Variables projet
    '{{industry}}': prospectData.industry_sector || prospectData.industry || fallbackIndustry || '',
    '{{workers_count}}': String(prospectData.workers_count ?? fallbackWorkers ?? ''),
    '{{project_description}}': prospectData.project_description || fallbackProjectDescription || '',
    '{{need_type}}': prospectData.need_type || customFields.need_type || '',
    '{{classification}}': prospectData.classification || 'Standard',
    '{{duration}}': prospectData.duration || '6 mois',
    '{{quote_amount}}': prospectData.quote_amount ? `${prospectData.quote_amount}` : 'Sur devis',
    '{{quote_date}}': customFields.devis_created_at || prospectData.created_at || '',
    
    // Variables technique
    '{{prospect_id}}': prospectData.id || '',
    '{{quote_id}}': prospectData.quote_id || customFields.devis_numero || customFields.devis_id || `q-${prospectData.id || Math.random().toString(36).substr(2, 9)}`,
    '{{quote_number}}': fallbackQuoteNumber || (prospectData.quote_id || ''),
    '{{signature_url}}': fallbackSignatureUrl,
    '{{signature_date}}': fallbackSignatureDate,
    '{{positions_count}}': String(fallbackPositionsCount ?? ''),
    '{{candidates_count}}': String(fallbackCandidatesCount ?? ''),
    '{{sector}}': fallbackIndustry || '',
    
    // Variables temporelles
    '{{deadline_time}}': deadlineTime,
    '{{deadline_4h}}': deadline4hStr,
    '{{today}}': new Date().toLocaleDateString('fr-FR'),
    
    // Variables sender/company
    '{{sender_name}}': 'L\'équipe YOJOB',
    '{{sender_phone}}': '+33 1 23 45 67 89',
    '{{sender_email}}': 'contact@yojob.com',
    '{{company_name}}': 'YOJOB',
    '{{company_email}}': 'contact@yojob.com',
    '{{company_phone}}': '+33 1 23 45 67 89',

    // Variables devis / signature (format explicite)
    '{{contact_firstname}}': fallbackFirstName,
    '{{contact_lastname}}': fallbackLastName,
    '{{contact_email}}': fallbackEmail,
    '{{signature_url}}': fallbackSignatureUrl,
    '{{signature_date}}': fallbackSignatureDate,
    '{{quote_number}}': fallbackQuoteNumber,
    '{{positions_count}}': String(fallbackPositionsCount ?? ''),
    '{{candidates_count}}': String(fallbackCandidatesCount ?? ''),
    '{{sector}}': fallbackIndustry || '',
    '{{country}}': fallbackCountry || '',

    // Variables devis (format objet)
    '{{contact.prenom}}': fallbackFirstName,
    '{{contact.nom}}': fallbackLastName,
    '{{contact.email}}': fallbackEmail,
    '{{contact.telephonePortable}}': customContact.telephonePortable || '',
    '{{contact.telephoneFixe}}': customContact.telephoneFixe || '',
    '{{entreprise.raisonSociale}}': customEntreprise.raisonSociale || '',
    '{{entreprise.pays}}': customEntreprise.pays || '',
    '{{numero}}': fallbackQuoteNumber,
    '{{signatureUrl}}': fallbackSignatureUrl,
    '{{signatureLinkGeneratedAt}}': customFields.signature_link_generated_at || '',
    '{{signatureLinkExpiresAt}}': customFields.signature_link_expires_at || '',
    '{{postes.length}}': String(customPostes.length),
    '{{totalCandidats}}': String(fallbackCandidatesCount ?? ''),
    '{{postes[0].secteur}}': customPostes[0]?.secteur || '',

    // Rétrocompatibilité avec prospect. prefix
    '{{prospect.name}}': prospectData.name || prospectData.contact_name || fallbackName || '',
    '{{prospect.email}}': prospectData.email || fallbackEmail || '',
    '{{prospect.company}}': prospectData.company_name || prospectData.company || fallbackCompany || '',
    '{{prospect.phone}}': prospectData.phone || fallbackPhone || '',
    '{{prospect.country}}': prospectData.country || fallbackCountry || '',
    '{{prospect.status}}': prospectData.status || '',
    '{{prospect.industry}}': prospectData.industry_sector || fallbackIndustry || '',
    '{{prospect.workers_count}}': String(prospectData.workers_count ?? fallbackWorkers ?? ''),
    '{{prospect.project_description}}': prospectData.project_description || fallbackProjectDescription || '',
  };

  // Remplacer toutes les variables
  for (const [variable, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  }

  return result;
}

/**
 * Résout la valeur du prospect pour une condition (compatibilité field/type)
 */
function getProspectValueForCondition(condition: any, prospect: any) {
  const rawField = condition?.field || condition?.type || '';
  const customFields = prospect?.custom_fields || {};
  const customEntreprise = customFields?.entreprise || {};

  switch (rawField) {
    case 'prospect_type':
      return prospect.type ?? prospect.prospect_type;
    case 'country':
      return prospect.country ?? prospect.country_code ?? customFields.country ?? customFields.country_code ?? customEntreprise.pays;
    case 'status':
      return prospect.status;
    case 'statut':
      return customFields.devis_status ?? customFields.statut ?? prospect.statut;
    case 'source':
      return prospect.source;
    case 'industry_sector':
      return prospect.industry_sector ?? prospect.sector ?? customFields.industry_sector ?? customFields.sector;
    case 'sector':
      return prospect.sector ?? prospect.industry_sector ?? customFields.sector ?? customFields.industry_sector;
    case 'signatureToken':
    case 'signature_token':
      return customFields.signature_token ?? customFields.signatureToken ?? customFields.signature_token;
    case 'signatureLinkGeneratedAt':
      return customFields.signature_link_generated_at ?? customFields.signatureLinkGeneratedAt;
    case 'signatureLinkExpiresAt':
      return customFields.signature_link_expires_at ?? customFields.signatureLinkExpiresAt;
    case 'signatureUrl':
      return customFields.signature_url ?? customFields.signatureUrl;
    case 'tag_has':
    case 'tags':
      return prospect.tags ?? customFields.tags ?? [];
    default:
      return prospect[rawField];
  }
}

/**
 * Évalue si un prospect correspond aux conditions d'un workflow
 */
function evaluateConditions(prospect: any, conditions: any[]): boolean {
  if (!conditions || conditions.length === 0) return true;

  const parseDuration = (input: string): number | null => {
    if (!input || typeof input !== 'string') return null;
    const match = input.trim().match(/^(\d+)\s*(minutes?|mins?|m|hours?|h|days?|d)$/i);
    if (!match) return null;
    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    if (Number.isNaN(amount)) return null;
    if (unit.startsWith('m')) return amount * 60 * 1000;
    if (unit.startsWith('h')) return amount * 60 * 60 * 1000;
    if (unit.startsWith('d')) return amount * 24 * 60 * 60 * 1000;
    return null;
  };

  return conditions.every(condition => {
    const { operator, value } = condition;
    const prospectValue = getProspectValueForCondition(condition, prospect);
    const valueArray = Array.isArray(value) ? value : null;
    const prospectArray = Array.isArray(prospectValue) ? prospectValue : null;

    switch (operator) {
      case 'equals':
        if (prospectArray) {
          return valueArray ? valueArray.some(v => prospectArray.includes(v)) : prospectArray.includes(value);
        }
        return valueArray ? valueArray.includes(prospectValue) : prospectValue === value;
      case 'not_equals':
        if (prospectArray) {
          return valueArray ? valueArray.every(v => !prospectArray.includes(v)) : !prospectArray.includes(value);
        }
        return valueArray ? !valueArray.includes(prospectValue) : prospectValue !== value;
      case 'contains':
        if (prospectArray) {
          return valueArray ? valueArray.some(v => prospectArray.includes(v)) : prospectArray.includes(value);
        }
        return String(prospectValue || '').toLowerCase().includes(String(value).toLowerCase());
      case 'greater_than':
        return Number(prospectValue) > Number(value);
      case 'less_than':
        return Number(prospectValue) < Number(value);
      case 'in':
        if (valueArray) {
          return prospectArray ? prospectArray.some(v => valueArray.includes(v)) : valueArray.includes(prospectValue);
        }
        return false;
      case 'exists':
        return prospectArray ? prospectArray.length > 0 : prospectValue !== null && prospectValue !== undefined && String(prospectValue) !== '';
      case 'older_than': {
        const durationMs = parseDuration(String(value || ''));
        if (!durationMs) return false;
        const dateValue = prospectValue ? new Date(prospectValue) : null;
        if (!dateValue || Number.isNaN(dateValue.getTime())) return false;
        const threshold = Date.now() - durationMs;
        return dateValue.getTime() < threshold;
      }
      case 'is_empty':
        return prospectArray ? prospectArray.length === 0 : !prospectValue || prospectValue === '';
      case 'is_not_empty':
        return prospectArray ? prospectArray.length > 0 : !!prospectValue && prospectValue !== '';
      default:
        return true;
    }
  });
}

/**
 * Exécute une étape du workflow
 */
async function executeStep(step: any, prospect: any, workflow: AutomationWorkflow, runId: string) {
  const supabase = getSupabaseClient();
  
  try {
    // Log de début d'étape
    MOCK_AUTOMATION_LOGS.push({
      id: `log-${Date.now()}-${Math.random()}`,
      workflow_id: workflow.id,
      run_id: runId,
      step_id: step.id,
      prospect_id: prospect.id,
      status: 'running',
      action_type: step.type,
      message: `Exécution de l'action: ${step.type}`,
      timestamp: new Date().toISOString(),
    });

    switch (step.type) {
      case 'send_email': {
        const templateId = step.config.template_id;
        const inlineSubject = step.config.subject;
        const inlineBodyHtml = step.config.body_html || step.config.body;
        const inlineBodyText = step.config.body_text;

        let template = null;
        if (templateId) {
          template = getLocalizedTemplate(templateId, prospect);
          if (!template && !inlineSubject && !inlineBodyHtml) {
            throw new Error(`Template email non trouvé: ${templateId}`);
          }
        }

        const subjectSource = inlineSubject || template?.subject || '';
        const bodyHtmlSource = inlineBodyHtml || template?.body_html || '';
        const bodyTextSource = inlineBodyText || template?.body_text || (bodyHtmlSource ? bodyHtmlSource.replace(/<[^>]*>/g, '') : '');

        if (!subjectSource && !bodyHtmlSource) {
          throw new Error('Email sans contenu (template_id ou subject/body requis)');
        }

        // Remplacer les variables
        const subject = replaceVariables(subjectSource, prospect);
        const body_html = replaceVariables(bodyHtmlSource, prospect);
        const body_text = replaceVariables(bodyTextSource || '', prospect);

        const to = replaceVariables(step.config.to || prospect.email || '', prospect);
        const cc = step.config.cc ? replaceVariables(step.config.cc, prospect) : undefined;
        const bcc = step.config.bcc ? replaceVariables(step.config.bcc, prospect) : undefined;
        const replyTo = step.config.reply_to ? replaceVariables(step.config.reply_to, prospect) : undefined;

        if (!to) {
          throw new Error('Email destinataire manquant');
        }

        // Envoi réel via SMTP/provider configuré
        const sendResult = await emailService.sendEmail({
          to,
          ...(cc ? { cc } : {}),
          ...(bcc ? { bcc } : {}),
          ...(replyTo ? { replyTo } : {}),
          subject,
          body: body_text || body_html.replace(/<[^>]*>/g, ''),
          html: body_html,
        });

        if (!sendResult.success) {
          throw new Error(sendResult.message || 'Erreur envoi email');
        }

        // Log de succès
        MOCK_AUTOMATION_LOGS.push({
          id: `log-${Date.now()}-${Math.random()}`,
          workflow_id: workflow.id,
          run_id: runId,
          step_id: step.id,
          prospect_id: prospect.id,
          status: 'success',
          action_type: 'send_email',
          message: `Email envoyé: "${subject}" à ${to}`,
          metadata: {
            subject,
            template_id: template?.id || null,
            template_name: template?.name || null,
            inline: !template,
            message_id: sendResult.messageId || null,
          },
          timestamp: new Date().toISOString(),
        });

        return { success: true, message: 'Email envoyé' };
      }

      case 'create_task': {
        const taskTitle = replaceVariables(step.config.title || step.config.task_title || 'Nouvelle tâche', prospect);
        const taskDescription = replaceVariables(step.config.description || step.config.task_description || '', prospect);

        // Créer une vraie tâche dans Supabase
        const { data: task, error } = await supabase
          .from('tasks')
          .insert([{
            title: taskTitle,
            description: taskDescription,
            prospect_id: prospect.id,
            status: 'todo',
            priority: step.config.priority || 'medium',
            assigned_to: step.config.assigned_to || null,
            due_date: step.config.due_date || null,
            created_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (error) {
          throw error;
        }

        MOCK_AUTOMATION_LOGS.push({
          id: `log-${Date.now()}-${Math.random()}`,
          workflow_id: workflow.id,
          run_id: runId,
          step_id: step.id,
          prospect_id: prospect.id,
          status: 'success',
          action_type: 'create_task',
          message: `Tâche créée: "${taskTitle}"`,
          metadata: {
            task_id: task.id,
            task_title: taskTitle,
          },
          timestamp: new Date().toISOString(),
        });

        return { success: true, message: 'Tâche créée', task_id: task.id };
      }

      case 'add_tag': {
        const tagToAdd = step.config.tag || step.config.tag_name;
        if (!tagToAdd) {
          throw new Error('Tag manquant dans la configuration');
        }
        const currentTags = prospect.tags || [];
        
        if (!currentTags.includes(tagToAdd)) {
          const { error } = await supabase
            .from('prospects')
            .update({
              tags: [...currentTags, tagToAdd],
            })
            .eq('id', prospect.id);

          if (error) throw error;

          // Déclencher les workflows tag_added (non bloquant)
          const supabaseUrl = Deno.env.get("SUPABASE_URL");
          const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
          if (supabaseUrl && anonKey) {
            fetch(`${supabaseUrl}/functions/v1/make-server-10092a63/workflow-engine/trigger/tag_added`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${anonKey}`,
              },
              body: JSON.stringify({ prospect_id: prospect.id, tag_name: tagToAdd }),
            }).catch(err => {
              console.error('⚠️ Erreur trigger tag_added (non-bloquant):', err);
            });
          }
        }

        MOCK_AUTOMATION_LOGS.push({
          id: `log-${Date.now()}-${Math.random()}`,
          workflow_id: workflow.id,
          run_id: runId,
          step_id: step.id,
          prospect_id: prospect.id,
          status: 'success',
          action_type: 'add_tag',
          message: `Tag ajouté: "${tagToAdd}"`,
          metadata: { tag: tagToAdd },
          timestamp: new Date().toISOString(),
        });

        return { success: true, message: 'Tag ajouté' };
      }

      case 'change_status': {
        const newStatus = step.config.status || step.config.new_status;
        if (!newStatus) {
          throw new Error('Nouveau statut manquant dans la configuration');
        }

        const { error } = await supabase
          .from('prospects')
          .update({
            status: newStatus,
          })
          .eq('id', prospect.id);

        if (error) throw error;

        // Déclencher les workflows status_changed (non bloquant)
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
        if (supabaseUrl && anonKey) {
          fetch(`${supabaseUrl}/functions/v1/make-server-10092a63/workflow-engine/trigger/status_changed`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${anonKey}`,
            },
            body: JSON.stringify({ prospect_id: prospect.id, status_from: prospect.status, status_to: newStatus }),
          }).catch(err => {
            console.error('⚠️ Erreur trigger status_changed (non-bloquant):', err);
          });
        }

        MOCK_AUTOMATION_LOGS.push({
          id: `log-${Date.now()}-${Math.random()}`,
          workflow_id: workflow.id,
          run_id: runId,
          step_id: step.id,
          prospect_id: prospect.id,
          status: 'success',
          action_type: 'change_status',
          message: `Statut changé: ${prospect.status} → ${newStatus}`,
          metadata: { old_status: prospect.status, new_status: newStatus },
          timestamp: new Date().toISOString(),
        });

        return { success: true, message: 'Statut changé' };
      }

      case 'notify_team': {
        const message = replaceVariables(step.config.message || 'Notification', prospect);

        // Log de notification (simulation)
        console.log('🔔 Notification équipe:', message);

        MOCK_AUTOMATION_LOGS.push({
          id: `log-${Date.now()}-${Math.random()}`,
          workflow_id: workflow.id,
          run_id: runId,
          step_id: step.id,
          prospect_id: prospect.id,
          status: 'success',
          action_type: 'notify_team',
          message: `Notification envoyée: "${message}"`,
          timestamp: new Date().toISOString(),
        });

        return { success: true, message: 'Notification envoyée' };
      }

      case 'send_webhook': {
        const webhookUrl = step.config.webhook_url;
        const payload = {
          prospect: prospect,
          workflow_id: workflow.id,
          workflow_name: workflow.name,
          timestamp: new Date().toISOString(),
        };

        // Appel webhook (simulation)
        console.log('🌐 Webhook appelé:', webhookUrl, payload);

        MOCK_AUTOMATION_LOGS.push({
          id: `log-${Date.now()}-${Math.random()}`,
          workflow_id: workflow.id,
          run_id: runId,
          step_id: step.id,
          prospect_id: prospect.id,
          status: 'success',
          action_type: 'send_webhook',
          message: `Webhook appelé: ${webhookUrl}`,
          timestamp: new Date().toISOString(),
        });

        return { success: true, message: 'Webhook appelé' };
      }

      default:
        throw new Error(`Type d'action inconnu: ${step.type}`);
    }
  } catch (error: any) {
    // Log d'erreur
    MOCK_AUTOMATION_LOGS.push({
      id: `log-${Date.now()}-${Math.random()}`,
      workflow_id: workflow.id,
      run_id: runId,
      step_id: step.id,
      prospect_id: prospect.id,
      status: 'error',
      action_type: step.type,
      message: `Erreur: ${error.message}`,
      error_details: error.stack,
      timestamp: new Date().toISOString(),
    });

    throw error;
  }
}

/**
 * POST /execute/:workflow_id/:prospect_id
 * Exécuter un workflow sur un prospect spécifique
 */
app.post("/execute/:workflow_id/:prospect_id", async (c) => {
  try {
    const { workflow_id, prospect_id } = c.req.param();
    const supabase = getSupabaseClient();
    const dbReady = await isAutomationsDbReady(supabase);

    // 1. Récupérer le workflow
    const workflow = await loadWorkflowById(supabase, dbReady, workflow_id);
    if (!workflow) {
      return c.json({ success: false, error: "Workflow non trouvé" }, 404);
    }

    if (!workflow.stats) {
      workflow.stats = { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 };
    }

    if (workflow.status !== 'active') {
      return c.json({ success: false, error: "Le workflow n'est pas actif" }, 400);
    }

    // 2. Récupérer le prospect
    const { data: prospect, error: prospectError } = await supabase
      .from('prospects')
      .select('*')
      .eq('id', prospect_id)
      .single();

    if (prospectError || !prospect) {
      return c.json({ success: false, error: "Prospect non trouvé" }, 404);
    }

    // 3. Évaluer les conditions
    const conditionsMet = evaluateConditions(prospect, workflow.conditions || []);
    if (!conditionsMet) {
      return c.json({ 
        success: false, 
        error: "Le prospect ne correspond pas aux conditions du workflow",
        conditions_met: false
      }, 400);
    }

    // 4. Créer un run
    const runId = `run-${Date.now()}`;
    const run = {
      id: runId,
      workflow_id: workflow.id,
      workflow_name: workflow.name,
      prospect_id: prospect.id,
      prospect_name: prospect.name || prospect.contact_name,
      prospect_email: prospect.email,
      status: 'running' as const,
      started_at: new Date().toISOString(),
      completed_at: null,
      steps_completed: 0,
      steps_total: workflow.steps.length,
      current_step: 0,
      total_steps: workflow.steps.length,
      error_message: null,
      metadata: {
        emails_sent: 0,
        tasks_created: 0,
        tags_added: 0,
        webhooks_called: 0,
        prospect_name: prospect.name || prospect.contact_name,
        prospect_email: prospect.email,
        prospect_company: prospect.company_name,
      },
    };

    MOCK_AUTOMATION_RUNS.push(run);

    // 5. Exécuter les étapes
    let stepsCompleted = 0;
    let emailsSent = 0;
    let tasksCreated = 0;
    let tagsAdded = 0;

    for (const step of workflow.steps) {
      try {
        // Appliquer le délai si nécessaire
        if (step.delay_minutes && step.delay_minutes > 0) {
          console.log(`⏳ Délai de ${step.delay_minutes} minutes (simulé)`);
        }

        const result = await executeStep(step, prospect, workflow, runId);
        stepsCompleted++;
        run.current_step = stepsCompleted;
        run.steps_completed = stepsCompleted;

        // Compter les actions
        if (step.type === 'send_email') emailsSent++;
        if (step.type === 'create_task') tasksCreated++;
        if (step.type === 'add_tag') tagsAdded++;

        console.log(`✅ Étape ${stepsCompleted}/${workflow.steps.length} complétée:`, result.message);
      } catch (error: any) {
        console.error(`❌ Erreur étape ${stepsCompleted + 1}:`, error);
        run.status = 'failed';
        run.completed_at = new Date().toISOString();
        run.steps_completed = stepsCompleted;
        run.current_step = stepsCompleted;
        run.error_message = error.message;
        run.metadata.error = error.message;
        
        // Update stats
        workflow.stats.total_runs++;
        workflow.stats.failed_runs++;
        workflow.stats.conversion_rate = Math.round((workflow.stats.success_runs / workflow.stats.total_runs) * 100);
        await persistWorkflowStats(supabase, dbReady, workflow);
        
        return c.json({ 
          success: false, 
          error: `Erreur à l'étape ${stepsCompleted + 1}: ${error.message}`,
          run,
        }, 500);
      }
    }

    // 6. Marquer le run comme complété
    run.status = 'completed';
    run.completed_at = new Date().toISOString();
    run.steps_completed = stepsCompleted;
    run.current_step = stepsCompleted;
    run.metadata.emails_sent = emailsSent;
    run.metadata.tasks_created = tasksCreated;
    run.metadata.tags_added = tagsAdded;

    // 7. Update workflow stats
    workflow.stats.total_runs++;
    workflow.stats.success_runs++;
    workflow.stats.conversion_rate = Math.round((workflow.stats.success_runs / workflow.stats.total_runs) * 100);
    await persistWorkflowStats(supabase, dbReady, workflow);

    return c.json({
      success: true,
      message: `Workflow "${workflow.name}" exécuté avec succès`,
      run,
      results: {
        steps_completed: stepsCompleted,
        emails_sent: emailsSent,
        tasks_created: tasksCreated,
        tags_added: tagsAdded,
      },
    });
  } catch (error: any) {
    console.error("❌ Erreur d'exécution workflow:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /trigger/:trigger_type
 * Déclencher tous les workflows correspondant à un trigger
 * Utilisé lors d'événements (nouveau prospect, changement statut, etc.)
 */
app.post("/trigger/:trigger_type", async (c) => {
  try {
    const { trigger_type } = c.req.param();
    const body = await c.req.json();
    const { prospect_id, tag_name, status_from, status_to } = body;

    if (!prospect_id) {
      return c.json({ success: false, error: "prospect_id requis" }, 400);
    }

    // Trouver tous les workflows actifs avec ce trigger
    const supabase = getSupabaseClient();
    const dbReady = await isAutomationsDbReady(supabase);
    const allWorkflows = await loadWorkflows(supabase, dbReady);

    const matchingWorkflows = allWorkflows.filter(w => {
      if (w.status !== 'active' || w.trigger.type !== trigger_type) return false;

      if (trigger_type === 'tag_added') {
        const requiredTag = w.trigger?.config?.tag_name;
        if (requiredTag) {
          return tag_name ? requiredTag === tag_name : false;
        }
      }

      if (trigger_type === 'status_changed') {
        const requiredTo = w.trigger?.config?.status_to;
        const requiredFrom = w.trigger?.config?.status_from;
        if (requiredTo && requiredTo !== status_to) return false;
        if (requiredFrom && requiredFrom !== status_from) return false;
      }

      return true;
    });

    if (matchingWorkflows.length === 0) {
      return c.json({ 
        success: true, 
        message: "Aucun workflow actif pour ce trigger",
        triggered: 0,
      });
    }

    // Récupérer le prospect
    const { data: prospect, error: prospectError } = await supabase
      .from('prospects')
      .select('*')
      .eq('id', prospect_id)
      .single();

    if (prospectError || !prospect) {
      return c.json({ success: false, error: "Prospect non trouvé" }, 404);
    }

    // Exécuter chaque workflow
    const results = [];
    for (const workflow of matchingWorkflows) {
      try {
        // Évaluer les conditions
        const conditionsMet = evaluateConditions(prospect, workflow.conditions || []);
        
        if (conditionsMet) {
          // Créer une exécution
          const response = await fetch(
            `${c.req.url.split('/trigger')[0]}/execute/${workflow.id}/${prospect_id}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            }
          );
          
          const result = await response.json();
          results.push({
            workflow_id: workflow.id,
            workflow_name: workflow.name,
            success: result.success,
            run_id: result.run?.id,
          });
        } else {
          results.push({
            workflow_id: workflow.id,
            workflow_name: workflow.name,
            success: false,
            reason: 'Conditions non remplies',
          });
        }
      } catch (error: any) {
        results.push({
          workflow_id: workflow.id,
          workflow_name: workflow.name,
          success: false,
          error: error.message,
        });
      }
    }

    const triggeredCount = results.filter(r => r.success).length;

    return c.json({
      success: true,
      message: `${triggeredCount} workflow(s) déclenché(s)`,
      triggered: triggeredCount,
      total_workflows: matchingWorkflows.length,
      results,
    });
  } catch (error: any) {
    console.error("❌ Erreur trigger workflows:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /run-scheduled
 * Exécuter les workflows "scheduled" (à appeler via Cron externe)
 */
app.post("/run-scheduled", async (c) => {
  try {
    const cronSecret = Deno.env.get("CRON_SECRET");
    if (cronSecret) {
      const authHeader = c.req.header("Authorization") || "";
      const bearer = authHeader.replace("Bearer ", "").trim();
      const headerSecret = c.req.header("x-cron-secret") || bearer;
      if (!headerSecret || headerSecret !== cronSecret) {
        return c.json({ success: false, error: "Unauthorized" }, 401);
      }
    }

    const body = await c.req.json().catch(() => ({}));
    const limit = Math.min(parseInt(body?.limit || "500"), 2000);
    const workflowIdFilter = body?.workflow_id as string | undefined;

    const supabase = getSupabaseClient();
    const dbReady = await isAutomationsDbReady(supabase);
    const allWorkflows = await loadWorkflows(supabase, dbReady);

    const scheduledWorkflows = allWorkflows.filter(w =>
      w.status === 'active' &&
      w.trigger?.type === 'scheduled' &&
      (!workflowIdFilter || w.id === workflowIdFilter)
    );

    if (scheduledWorkflows.length === 0) {
      return c.json({
        success: true,
        message: 'Aucun workflow scheduled actif',
        workflows: 0,
      });
    }

    const { data: prospects, error: prospectsError } = await supabase
      .from('prospects')
      .select('*')
      .eq('is_archived', false)
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (prospectsError) {
      return c.json({ success: false, error: prospectsError.message }, 500);
    }

    const results: any[] = [];
    let totalTriggered = 0;

    for (const workflow of scheduledWorkflows) {
      let workflowTriggered = 0;

      for (const prospect of prospects || []) {
        try {
          if (hasWorkflowRun(prospect, workflow.id)) {
            continue;
          }

          const conditionsMet = evaluateConditions(prospect, workflow.conditions || []);
          if (!conditionsMet) {
            continue;
          }

          const response = await fetch(
            `${c.req.url.split('/run-scheduled')[0]}/execute/${workflow.id}/${prospect.id}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' } }
          );

          const result = await response.json();
          if (result?.success) {
            workflowTriggered += 1;
            totalTriggered += 1;
            await markWorkflowRun(supabase, prospect, workflow.id);
          }
        } catch (error: any) {
          results.push({
            workflow_id: workflow.id,
            prospect_id: prospect.id,
            success: false,
            error: error.message,
          });
        }
      }

      results.push({
        workflow_id: workflow.id,
        triggered: workflowTriggered,
      });
    }

    return c.json({
      success: true,
      workflows: scheduledWorkflows.length,
      total_triggered: totalTriggered,
      results,
    });
  } catch (error: any) {
    console.error("❌ Erreur run-scheduled:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /test/:workflow_id
 * Tester un workflow avec des données fictives
 */
app.post("/test/:workflow_id", async (c) => {
  try {
    const { workflow_id } = c.req.param();

    const supabase = getSupabaseClient();
    const dbReady = await isAutomationsDbReady(supabase);
    const workflow = await loadWorkflowById(supabase, dbReady, workflow_id);
    if (!workflow) {
      return c.json({ success: false, error: "Workflow non trouvé" }, 404);
    }

    // Créer un prospect de test
    const testProspect = {
      id: 'test-prospect',
      name: 'Jean Dupont',
      contact_name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      company_name: 'Test Company SARL',
      phone: '+33 6 12 34 56 78',
      country: 'France',
      status: 'new',
      industry_sector: 'BTP',
      workers_count: 15,
      project_description: 'Projet de recrutement de 15 ouvriers pour chantier',
      tags: ['test'],
      created_at: new Date().toISOString(),
    };

    // Exécuter le workflow en mode test
    const runId = `test-run-${Date.now()}`;
    const results = [];

    for (const step of workflow.steps) {
      try {
        const result = await executeStep(step, testProspect, workflow, runId);
        results.push({
          step_id: step.id,
          step_type: step.type,
          success: true,
          message: result.message,
        });
      } catch (error: any) {
        results.push({
          step_id: step.id,
          step_type: step.type,
          success: false,
          error: error.message,
        });
      }
    }

    return c.json({
      success: true,
      message: `Test du workflow "${workflow.name}" terminé`,
      test_prospect: testProspect,
      results,
    });
  } catch (error: any) {
    console.error("❌ Erreur test workflow:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default app;
