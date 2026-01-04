import { Hono } from "npm:hono@4";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { MOCK_WORKFLOWS, MOCK_EMAIL_TEMPLATES, MOCK_AUTOMATION_RUNS, MOCK_AUTOMATION_LOGS } from "./automations-data.ts";
import type { AutomationWorkflow } from "../../types/automations.ts";

const app = new Hono();

/**
 * 🎯 WORKFLOW ENGINE - MOTEUR D'EXÉCUTION
 * 
 * Ce moteur permet d'exécuter réellement les workflows avec les vraies données
 * - Récupère les données des prospects depuis la table Supabase
 * - Évalue les conditions
 * - Exécute les actions (envoyer email, créer tâche, etc.)
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

/**
 * Remplace les variables dans un texte avec les données du prospect
 */
function replaceVariables(text: string, prospectData: any): string {
  let result = text;
  
  // Variables disponibles
  const variables: Record<string, string> = {
    '{{prospect.name}}': prospectData.name || prospectData.contact_name || '',
    '{{prospect.email}}': prospectData.email || '',
    '{{prospect.company}}': prospectData.company_name || '',
    '{{prospect.phone}}': prospectData.phone || '',
    '{{prospect.country}}': prospectData.country || '',
    '{{prospect.status}}': prospectData.status || '',
    '{{prospect.industry}}': prospectData.industry_sector || '',
    '{{prospect.workers_count}}': String(prospectData.workers_count || ''),
    '{{prospect.project_description}}': prospectData.project_description || '',
    '{{today}}': new Date().toLocaleDateString('fr-FR'),
    '{{company_name}}': 'YOJOB',
    '{{company_email}}': 'contact@yojob.com',
    '{{company_phone}}': '+33 1 23 45 67 89',
  };

  // Remplacer toutes les variables
  for (const [variable, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  }

  return result;
}

/**
 * Évalue si un prospect correspond aux conditions d'un workflow
 */
function evaluateConditions(prospect: any, conditions: any[]): boolean {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(condition => {
    const { field, operator, value } = condition;
    const prospectValue = prospect[field];

    switch (operator) {
      case 'equals':
        return prospectValue === value;
      case 'not_equals':
        return prospectValue !== value;
      case 'contains':
        return String(prospectValue || '').toLowerCase().includes(String(value).toLowerCase());
      case 'greater_than':
        return Number(prospectValue) > Number(value);
      case 'less_than':
        return Number(prospectValue) < Number(value);
      case 'is_empty':
        return !prospectValue || prospectValue === '';
      case 'is_not_empty':
        return !!prospectValue && prospectValue !== '';
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
        // Récupérer le template
        const template = MOCK_EMAIL_TEMPLATES.find(t => t.id === step.config.template_id);
        if (!template) {
          throw new Error(`Template email non trouvé: ${step.config.template_id}`);
        }

        // Remplacer les variables
        const subject = replaceVariables(template.subject, prospect);
        const body_html = replaceVariables(template.body_html, prospect);
        const body_text = replaceVariables(template.body_text || '', prospect);

        // Log de l'email (simulation d'envoi)
        console.log('📧 Email simulé envoyé:');
        console.log('To:', prospect.email);
        console.log('Subject:', subject);
        console.log('Body HTML:', body_html.substring(0, 100) + '...');

        // Log de succès
        MOCK_AUTOMATION_LOGS.push({
          id: `log-${Date.now()}-${Math.random()}`,
          workflow_id: workflow.id,
          run_id: runId,
          step_id: step.id,
          prospect_id: prospect.id,
          status: 'success',
          action_type: 'send_email',
          message: `Email envoyé: "${subject}" à ${prospect.email}`,
          metadata: {
            subject,
            template_id: template.id,
            template_name: template.name,
          },
          timestamp: new Date().toISOString(),
        });

        return { success: true, message: 'Email envoyé' };
      }

      case 'create_task': {
        const taskTitle = replaceVariables(step.config.title || 'Nouvelle tâche', prospect);
        const taskDescription = replaceVariables(step.config.description || '', prospect);

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
        const tagToAdd = step.config.tag;
        const currentTags = prospect.tags || [];
        
        if (!currentTags.includes(tagToAdd)) {
          const { error } = await supabase
            .from('prospects')
            .update({
              tags: [...currentTags, tagToAdd],
            })
            .eq('id', prospect.id);

          if (error) throw error;
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
        const newStatus = step.config.status;

        const { error } = await supabase
          .from('prospects')
          .update({
            status: newStatus,
          })
          .eq('id', prospect.id);

        if (error) throw error;

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

    // 1. Récupérer le workflow
    const workflow = MOCK_WORKFLOWS.find(w => w.id === workflow_id);
    if (!workflow) {
      return c.json({ success: false, error: "Workflow non trouvé" }, 404);
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
      prospect_id: prospect.id,
      status: 'running' as const,
      started_at: new Date().toISOString(),
      completed_at: null,
      steps_completed: 0,
      steps_total: workflow.steps.length,
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
        run.metadata.error = error.message;
        
        // Update stats
        workflow.stats.failed_runs++;
        
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
    run.metadata.emails_sent = emailsSent;
    run.metadata.tasks_created = tasksCreated;
    run.metadata.tags_added = tagsAdded;

    // 7. Update workflow stats
    workflow.stats.total_runs++;
    workflow.stats.success_runs++;
    workflow.stats.conversion_rate = Math.round((workflow.stats.success_runs / workflow.stats.total_runs) * 100);

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
    const { prospect_id } = body;

    if (!prospect_id) {
      return c.json({ success: false, error: "prospect_id requis" }, 400);
    }

    // Trouver tous les workflows actifs avec ce trigger
    const matchingWorkflows = MOCK_WORKFLOWS.filter(
      w => w.status === 'active' && w.trigger.type === trigger_type
    );

    if (matchingWorkflows.length === 0) {
      return c.json({ 
        success: true, 
        message: "Aucun workflow actif pour ce trigger",
        triggered: 0,
      });
    }

    const supabase = getSupabaseClient();
    
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
 * POST /test/:workflow_id
 * Tester un workflow avec des données fictives
 */
app.post("/test/:workflow_id", async (c) => {
  try {
    const { workflow_id } = c.req.param();
    
    const workflow = MOCK_WORKFLOWS.find(w => w.id === workflow_id);
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
        const result = await executeStep(testProspect, testProspect, workflow, runId);
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
