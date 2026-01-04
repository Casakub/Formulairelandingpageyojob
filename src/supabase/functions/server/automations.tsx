import { Hono } from "npm:hono@4";
import { 
  MOCK_WORKFLOWS, 
  MOCK_AUTOMATION_RUNS, 
  MOCK_EMAIL_TEMPLATES,
  MOCK_AUTOMATION_LOGS,
  WORKFLOW_TEMPLATES,
  MOCK_SMTP_SETTINGS 
} from "./automations-data.ts";
import { emailService, sendTemplateEmail, addUnsubscribeLink } from "./email-service.tsx";

const app = new Hono();

/**
 * GET /workflows
 * Liste tous les workflows
 */
app.get("/workflows", (c) => {
  try {
    const { searchParams } = new URL(c.req.url);
    const status = searchParams.get("status"); // 'active', 'draft', 'paused'

    let workflows = MOCK_WORKFLOWS;

    if (status) {
      workflows = workflows.filter(w => w.status === status);
    }

    return c.json({
      success: true,
      workflows,
      total: workflows.length,
    });
  } catch (error: any) {
    console.error("Error fetching workflows:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /workflows/:id
 * Détail d'un workflow
 */
app.get("/workflows/:id", (c) => {
  try {
    const { id } = c.req.param();
    const workflow = MOCK_WORKFLOWS.find(w => w.id === id);

    if (!workflow) {
      return c.json({ success: false, error: "Workflow not found" }, 404);
    }

    return c.json({
      success: true,
      workflow,
    });
  } catch (error: any) {
    console.error("Error fetching workflow:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /workflows
 * Créer un nouveau workflow
 */
app.post("/workflows", async (c) => {
  try {
    const body = await c.req.json();
    const { name, description, trigger, conditions, steps, status } = body;

    const newWorkflow = {
      id: `wf-${Date.now()}`,
      name,
      description,
      status: status || 'draft',
      trigger,
      conditions: conditions || [],
      steps,
      stats: {
        total_runs: 0,
        success_runs: 0,
        failed_runs: 0,
        conversion_rate: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'admin',
      version: 1,
      version_history: [],
    };

    MOCK_WORKFLOWS.push(newWorkflow);

    return c.json({
      success: true,
      message: "Workflow créé avec succès",
      workflow: newWorkflow,
    });
  } catch (error: any) {
    console.error("Error creating workflow:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * PATCH /workflows/:id/status
 * Changer le statut d'un workflow (active/pause/archive)
 */
app.patch("/workflows/:id/status", async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const { status } = body;

    const workflow = MOCK_WORKFLOWS.find(w => w.id === id);
    if (!workflow) {
      return c.json({ success: false, error: "Workflow not found" }, 404);
    }

    workflow.status = status;
    workflow.updated_at = new Date().toISOString();

    return c.json({
      success: true,
      message: `Workflow ${status === 'active' ? 'activé' : status === 'paused' ? 'mis en pause' : 'archivé'}`,
      workflow,
    });
  } catch (error: any) {
    console.error("Error updating workflow status:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * DELETE /workflows/:id
 * Supprimer un workflow
 */
app.delete("/workflows/:id", (c) => {
  try {
    const { id } = c.req.param();
    const index = MOCK_WORKFLOWS.findIndex(w => w.id === id);

    if (index === -1) {
      return c.json({ success: false, error: "Workflow not found" }, 404);
    }

    MOCK_WORKFLOWS.splice(index, 1);

    return c.json({
      success: true,
      message: "Workflow supprimé",
    });
  } catch (error: any) {
    console.error("Error deleting workflow:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * PATCH /workflows/:id
 * Mettre à jour un workflow complet
 */
app.patch("/workflows/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const { name, description, trigger, conditions, steps, status, change_note } = body;

    const workflow = MOCK_WORKFLOWS.find(w => w.id === id);
    if (!workflow) {
      return c.json({ success: false, error: "Workflow not found" }, 404);
    }

    // Créer une nouvelle version dans l'historique
    const currentVersion = workflow.version || 1;
    const newVersion = currentVersion + 1;
    
    const previousVersion = {
      version: currentVersion,
      name: workflow.name,
      description: workflow.description,
      trigger: workflow.trigger,
      conditions: workflow.conditions,
      steps: workflow.steps,
      created_at: new Date().toISOString(),
      created_by: 'admin',
      change_note: change_note || 'Mise à jour du workflow',
    };

    // Initialiser version_history si nécessaire
    if (!workflow.version_history) {
      workflow.version_history = [];
    }

    // Ajouter la version précédente à l'historique
    workflow.version_history.push(previousVersion);

    // Update workflow fields
    if (name !== undefined) workflow.name = name;
    if (description !== undefined) workflow.description = description;
    if (trigger !== undefined) workflow.trigger = trigger;
    if (conditions !== undefined) workflow.conditions = conditions;
    if (steps !== undefined) workflow.steps = steps;
    if (status !== undefined) workflow.status = status;
    workflow.version = newVersion;
    workflow.updated_at = new Date().toISOString();

    return c.json({
      success: true,
      message: `Workflow mis à jour avec succès (v${newVersion})`,
      workflow,
    });
  } catch (error: any) {
    console.error("Error updating workflow:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /runs
 * Liste des exécutions
 */
app.get("/runs", (c) => {
  try {
    const { searchParams } = new URL(c.req.url);
    const workflow_id = searchParams.get("workflow_id");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");

    let runs = MOCK_AUTOMATION_RUNS;

    if (workflow_id) {
      runs = runs.filter(r => r.workflow_id === workflow_id);
    }

    if (status) {
      runs = runs.filter(r => r.status === status);
    }

    return c.json({
      success: true,
      runs: runs.slice(0, limit),
      total: runs.length,
    });
  } catch (error: any) {
    console.error("Error fetching runs:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /runs/:id/cancel
 * Annuler une exécution en cours
 */
app.post("/runs/:id/cancel", (c) => {
  try {
    const { id } = c.req.param();
    const run = MOCK_AUTOMATION_RUNS.find(r => r.id === id);

    if (!run) {
      return c.json({ success: false, error: "Run not found" }, 404);
    }

    if (run.status !== 'running' && run.status !== 'pending') {
      return c.json({ success: false, error: "Run cannot be cancelled" }, 400);
    }

    run.status = 'cancelled';
    run.completed_at = new Date().toISOString();

    return c.json({
      success: true,
      message: "Exécution annulée",
      run,
    });
  } catch (error: any) {
    console.error("Error cancelling run:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /templates
 * Liste des templates d'emails
 */
app.get("/templates", (c) => {
  try {
    const { searchParams } = new URL(c.req.url);
    const category = searchParams.get("category");

    let templates = MOCK_EMAIL_TEMPLATES;

    if (category) {
      templates = templates.filter(t => t.category === category);
    }

    return c.json({
      success: true,
      templates,
      total: templates.length,
    });
  } catch (error: any) {
    console.error("Error fetching templates:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /templates
 * Créer un template d'email
 */
app.post("/templates", async (c) => {
  try {
    const body = await c.req.json();
    const { name, description, subject, body_html, body_text, category, language } = body;

    const newTemplate = {
      id: `tpl-${Date.now()}`,
      name,
      description,
      subject,
      body_html,
      body_text: body_text || body_html.replace(/<[^>]*>/g, ''), // Strip HTML
      variables: extractVariables(body_html),
      category,
      language: language || 'fr',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      usage_count: 0,
    };

    MOCK_EMAIL_TEMPLATES.push(newTemplate);

    return c.json({
      success: true,
      message: "Template créé avec succès",
      template: newTemplate,
    });
  } catch (error: any) {
    console.error("Error creating template:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * PATCH /templates/:id
 * Modifier un template
 */
app.patch("/templates/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();

    const template = MOCK_EMAIL_TEMPLATES.find(t => t.id === id);
    if (!template) {
      return c.json({ success: false, error: "Template not found" }, 404);
    }

    Object.assign(template, body);
    template.updated_at = new Date().toISOString();

    if (body.body_html) {
      template.variables = extractVariables(body.body_html);
    }

    return c.json({
      success: true,
      message: "Template mis à jour",
      template,
    });
  } catch (error: any) {
    console.error("Error updating template:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * DELETE /templates/:id
 * Supprimer un template
 */
app.delete("/templates/:id", (c) => {
  try {
    const { id } = c.req.param();
    const index = MOCK_EMAIL_TEMPLATES.findIndex(t => t.id === id);

    if (index === -1) {
      return c.json({ success: false, error: "Template not found" }, 404);
    }

    MOCK_EMAIL_TEMPLATES.splice(index, 1);

    return c.json({
      success: true,
      message: "Template supprimé",
    });
  } catch (error: any) {
    console.error("Error deleting template:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /logs
 * Logs d'exécution
 */
app.get("/logs", (c) => {
  try {
    const { searchParams } = new URL(c.req.url);
    const workflow_id = searchParams.get("workflow_id");
    const run_id = searchParams.get("run_id");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "100");

    let logs = MOCK_AUTOMATION_LOGS;

    if (workflow_id) {
      logs = logs.filter(l => l.workflow_id === workflow_id);
    }

    if (run_id) {
      logs = logs.filter(l => l.run_id === run_id);
    }

    if (status) {
      logs = logs.filter(l => l.status === status);
    }

    return c.json({
      success: true,
      logs: logs.slice(0, limit),
      total: logs.length,
    });
  } catch (error: any) {
    console.error("Error fetching logs:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /workflow-templates
 * Templates de workflows pré-configurés
 */
app.get("/workflow-templates", (c) => {
  try {
    return c.json({
      success: true,
      templates: WORKFLOW_TEMPLATES,
    });
  } catch (error: any) {
    console.error("Error fetching workflow templates:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /workflow-templates/:id/instantiate
 * Créer un workflow à partir d'un template
 */
app.post("/workflow-templates/:id/instantiate", async (c) => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const { name } = body;

    const template = WORKFLOW_TEMPLATES.find(t => t.id === id);
    if (!template) {
      return c.json({ success: false, error: "Template not found" }, 404);
    }

    const newWorkflow = {
      id: `wf-${Date.now()}`,
      name: name || template.name,
      description: template.description,
      status: 'draft' as const,
      trigger: template.trigger,
      conditions: template.conditions,
      steps: template.steps.map((step, idx) => ({
        ...step,
        id: `step-${idx + 1}`,
      })),
      stats: {
        total_runs: 0,
        success_runs: 0,
        failed_runs: 0,
        conversion_rate: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'admin',
    };

    MOCK_WORKFLOWS.push(newWorkflow);

    return c.json({
      success: true,
      message: "Workflow créé à partir du template",
      workflow: newWorkflow,
    });
  } catch (error: any) {
    console.error("Error instantiating workflow:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /smtp-settings
 * Récupérer la config SMTP
 */
app.get("/smtp-settings", (c) => {
  try {
    return c.json({
      success: true,
      settings: MOCK_SMTP_SETTINGS,
    });
  } catch (error: any) {
    console.error("Error fetching SMTP settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * PATCH /smtp-settings
 * Mettre à jour la config SMTP
 */
app.patch("/smtp-settings", async (c) => {
  try {
    const body = await c.req.json();

    Object.assign(MOCK_SMTP_SETTINGS, body);

    return c.json({
      success: true,
      message: "Configuration SMTP mise à jour",
      settings: MOCK_SMTP_SETTINGS,
    });
  } catch (error: any) {
    console.error("Error updating SMTP settings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * POST /smtp-settings/test
 * Tester la connexion SMTP
 */
app.post("/smtp-settings/test", async (c) => {
  try {
    const body = await c.req.json();
    const { test_email } = body;

    // Simulation d'envoi de test
    MOCK_SMTP_SETTINGS.last_test_at = new Date().toISOString();
    MOCK_SMTP_SETTINGS.last_test_status = 'success';

    return c.json({
      success: true,
      message: `Email de test envoyé avec succès à ${test_email}`,
    });
  } catch (error: any) {
    console.error("Error testing SMTP:", error);
    MOCK_SMTP_SETTINGS.last_test_status = 'failed';
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /stats
 * Statistiques globales
 */
app.get("/stats", (c) => {
  try {
    const total_workflows = MOCK_WORKFLOWS.length;
    const active_workflows = MOCK_WORKFLOWS.filter(w => w.status === 'active').length;
    const total_runs = MOCK_AUTOMATION_RUNS.length;
    const running_now = MOCK_AUTOMATION_RUNS.filter(r => r.status === 'running').length;
    const success_rate = total_runs > 0 
      ? Math.round((MOCK_AUTOMATION_RUNS.filter(r => r.status === 'completed').length / total_runs) * 100)
      : 0;

    const total_emails_sent = MOCK_AUTOMATION_RUNS.reduce((sum, run) => sum + run.metadata.emails_sent, 0);
    const total_tasks_created = MOCK_AUTOMATION_RUNS.reduce((sum, run) => sum + run.metadata.tasks_created, 0);

    const recent_errors = MOCK_AUTOMATION_LOGS.filter(l => l.status === 'error').slice(0, 5);

    return c.json({
      success: true,
      stats: {
        total_workflows,
        active_workflows,
        total_runs,
        running_now,
        success_rate,
        total_emails_sent,
        total_tasks_created,
        recent_errors: recent_errors.length,
      },
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Helper function to extract variables from template
function extractVariables(html: string): string[] {
  const regex = /\{\{([^}]+)\}\}/g;
  const variables: string[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const variable = `{{${match[1]}}}`;
    if (!variables.includes(variable)) {
      variables.push(variable);
    }
  }

  return variables;
}

export default app;