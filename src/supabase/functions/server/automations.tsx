import { Hono } from "npm:hono@4";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { 
  MOCK_WORKFLOWS, 
  MOCK_AUTOMATION_RUNS, 
  MOCK_EMAIL_TEMPLATES,
  MOCK_AUTOMATION_LOGS,
  WORKFLOW_TEMPLATES 
} from "./automations-data.ts";
import * as kv from "./kv_store.tsx";
import { sendEmailWithConfig } from "./email-service.tsx";
import { getApiKey, getSelectedModel } from "./settings.tsx";

const app = new Hono();

// Helper pour obtenir le client Supabase
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
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

/**
 * GET /workflows
 * Liste tous les workflows
 */
app.get("/workflows", (c) => {
  try {
    const { searchParams } = new URL(c.req.url);
    const status = searchParams.get("status"); // 'active', 'draft', 'paused'

    return (async () => {
      let workflows = MOCK_WORKFLOWS;

      try {
        const supabase = getSupabaseClient();
        const dbReady = await isAutomationsDbReady(supabase);

        if (dbReady) {
          let query = supabase
            .from("automations_workflows")
            .select("*", { count: "exact" })
            .order("updated_at", { ascending: false });

          if (status) {
            query = query.eq("status", status);
          }

          const { data, error, count } = await query;

          if (error) {
            console.error("Error fetching workflows from DB:", error);
            return c.json({ success: false, error: error.message }, 500);
          }

          return c.json({
            success: true,
            workflows: data || [],
            total: count || 0,
          });
        }
      } catch (err) {
        console.error("Error in GET /workflows (DB):", err);
      }

      if (status) {
        workflows = workflows.filter(w => w.status === status);
      }

      return c.json({
        success: true,
        workflows,
        total: workflows.length,
      });
    })();
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
    return (async () => {
      try {
        const supabase = getSupabaseClient();
        const dbReady = await isAutomationsDbReady(supabase);

        if (dbReady) {
          const { data, error } = await supabase
            .from("automations_workflows")
            .select("*")
            .eq("id", id)
            .single();

          if (error || !data) {
            return c.json({ success: false, error: "Workflow not found" }, 404);
          }

          return c.json({
            success: true,
            workflow: data,
          });
        }
      } catch (err) {
        console.error("Error fetching workflow from DB:", err);
      }

      const workflow = MOCK_WORKFLOWS.find(w => w.id === id);

      if (!workflow) {
        return c.json({ success: false, error: "Workflow not found" }, 404);
      }

      return c.json({
        success: true,
        workflow,
      });
    })();
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
      metadata: body.metadata || {},
    };

    try {
      const supabase = getSupabaseClient();
      const dbReady = await isAutomationsDbReady(supabase);

      if (dbReady) {
        const { data, error } = await supabase
          .from("automations_workflows")
          .insert([newWorkflow])
          .select()
          .single();

        if (error) {
          console.error("Error creating workflow in DB:", error);
          return c.json({ success: false, error: error.message }, 500);
        }

        return c.json({
          success: true,
          message: "Workflow créé avec succès",
          workflow: data,
        });
      }
    } catch (err) {
      console.error("Error creating workflow (DB):", err);
    }

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

    try {
      const supabase = getSupabaseClient();
      const dbReady = await isAutomationsDbReady(supabase);

      if (dbReady) {
        const { data, error } = await supabase
          .from("automations_workflows")
          .update({ status, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();

        if (error || !data) {
          return c.json({ success: false, error: "Workflow not found" }, 404);
        }

        return c.json({
          success: true,
          message: `Workflow ${status === 'active' ? 'activé' : status === 'paused' ? 'mis en pause' : 'archivé'}`,
          workflow: data,
        });
      }
    } catch (err) {
      console.error("Error updating workflow status (DB):", err);
    }

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
    return (async () => {
      try {
        const supabase = getSupabaseClient();
        const dbReady = await isAutomationsDbReady(supabase);

        if (dbReady) {
          const { error } = await supabase
            .from("automations_workflows")
            .delete()
            .eq("id", id);

          if (error) {
            console.error("Error deleting workflow from DB:", error);
            return c.json({ success: false, error: error.message }, 500);
          }

          return c.json({
            success: true,
            message: "Workflow supprimé",
          });
        }
      } catch (err) {
        console.error("Error deleting workflow (DB):", err);
      }

      const index = MOCK_WORKFLOWS.findIndex(w => w.id === id);

      if (index === -1) {
        return c.json({ success: false, error: "Workflow not found" }, 404);
      }

      MOCK_WORKFLOWS.splice(index, 1);

      return c.json({
        success: true,
        message: "Workflow supprimé",
      });
    })();
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

    try {
      const supabase = getSupabaseClient();
      const dbReady = await isAutomationsDbReady(supabase);

      if (dbReady) {
        const { data: workflow, error: fetchError } = await supabase
          .from("automations_workflows")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError || !workflow) {
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

        const versionHistory = Array.isArray(workflow.version_history)
          ? [...workflow.version_history, previousVersion]
          : [previousVersion];

        const updatedWorkflow = {
          name: name !== undefined ? name : workflow.name,
          description: description !== undefined ? description : workflow.description,
          trigger: trigger !== undefined ? trigger : workflow.trigger,
          conditions: conditions !== undefined ? conditions : workflow.conditions,
          steps: steps !== undefined ? steps : workflow.steps,
          status: status !== undefined ? status : workflow.status,
          version: newVersion,
          version_history: versionHistory,
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from("automations_workflows")
          .update(updatedWorkflow)
          .eq("id", id)
          .select()
          .single();

        if (error) {
          console.error("Error updating workflow in DB:", error);
          return c.json({ success: false, error: error.message }, 500);
        }

        return c.json({
          success: true,
          message: `Workflow mis à jour avec succès (v${newVersion})`,
          workflow: data,
        });
      }
    } catch (err) {
      console.error("Error updating workflow (DB):", err);
    }

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

    try {
      const supabase = getSupabaseClient();
      const dbReady = await isAutomationsDbReady(supabase);

      if (dbReady) {
        const { data, error } = await supabase
          .from("automations_workflows")
          .insert([newWorkflow])
          .select()
          .single();

        if (error) {
          console.error("Error instantiating template in DB:", error);
          return c.json({ success: false, error: error.message }, 500);
        }

        return c.json({
          success: true,
          message: "Workflow créé à partir du template",
          workflow: data,
        });
      }
    } catch (err) {
      console.error("Error instantiating template (DB):", err);
    }

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
    return (async () => {
      const config = await kv.get('settings:smtp');
      return c.json({
        success: true,
        settings: config || {
          host: '',
          port: 587,
          secure: false,
          username: '',
          password: '',
          from_email: '',
          from_name: 'YOJOB',
          provider: 'smtp',
          provider_api_key: '',
          provider_domain: '',
          reply_to: '',
          test_email: '',
        },
      });
    })();
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

    const provider = (body.provider || 'smtp').toString().toLowerCase();
    if (!body.from_email) {
      return c.json({ success: false, error: 'Email expéditeur requis (from_email)' }, 400);
    }

    if (provider === 'smtp') {
      if (!body.host || !body.username) {
        return c.json({
          success: false,
          error: 'Champs obligatoires manquants (host, username)',
        }, 400);
      }
    } else if (provider === 'sendgrid') {
      if (!body.provider_api_key) {
        return c.json({ success: false, error: 'Clé API SendGrid requise' }, 400);
      }
    } else if (provider === 'mailgun') {
      if (!body.provider_api_key || !body.provider_domain) {
        return c.json({ success: false, error: 'Clé API + domaine Mailgun requis' }, 400);
      }
    } else {
      return c.json({ success: false, error: 'Provider SMTP invalide' }, 400);
    }

    await kv.set('settings:smtp', body);

    return c.json({
      success: true,
      message: "Configuration SMTP mise à jour",
      settings: body,
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

    const storedConfig = await kv.get('settings:smtp');
    const config = storedConfig || body;

    if (!config || !(config as any).from_email) {
      return c.json({ success: false, error: 'Aucune configuration SMTP trouvée' }, 400);
    }

    const to = test_email || (config as any).username || (config as any).from_email;
    const result = await sendEmailWithConfig(config as any, {
      to,
      subject: '✅ Test SMTP YOJOB',
      body: 'Ceci est un email de test SMTP envoyé depuis YOJOB.',
      html: '<p>Ceci est un email de test SMTP envoyé depuis <strong>YOJOB</strong>.</p>',
    });

    if (!result.success) {
      return c.json({ success: false, error: result.message }, 400);
    }

    return c.json({
      success: true,
      message: `Email de test envoyé avec succès à ${to}`,
      messageId: result.messageId,
    });
  } catch (error: any) {
    console.error("Error testing SMTP:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

/**
 * GET /stats
 * Statistiques globales
 */
app.get("/stats", (c) => {
  try {
    return (async () => {
      let total_workflows = MOCK_WORKFLOWS.length;
      let active_workflows = MOCK_WORKFLOWS.filter(w => w.status === 'active').length;

      try {
        const supabase = getSupabaseClient();
        const dbReady = await isAutomationsDbReady(supabase);

        if (dbReady) {
          const { count: totalCount, error: totalError } = await supabase
            .from("automations_workflows")
            .select("id", { count: "exact", head: true });
          const { count: activeCount, error: activeError } = await supabase
            .from("automations_workflows")
            .select("id", { count: "exact", head: true })
            .eq("status", "active");

          if (!totalError && totalCount !== null) total_workflows = totalCount;
          if (!activeError && activeCount !== null) active_workflows = activeCount;
        }
      } catch (err) {
        console.error("Error fetching stats from DB:", err);
      }

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
    })();
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Helper function to extract variables from template
function extractVariables(html: string): string[] {
  const regex = /\\{\\{([^}]+)\\}\\}/g;
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

/**
 * 🌍 WORKFLOW TRANSLATION ROUTES
 * Routes pour la traduction automatique des workflows via Claude AI
 */

// Les 21 langues supportées (hors français qui est la langue source)
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'ro', name: 'Romanian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'cz', name: 'Czech' },
  { code: 'sk', name: 'Slovak' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'ee', name: 'Estonian' },
  { code: 'el', name: 'Greek' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
];

/**
 * POST /auto-translate-workflow
 * Traduire un workflow vers une langue spécifique avec Claude AI
 */
app.post("/auto-translate-workflow", async (c) => {
  try {
    const body = await c.req.json();
    const { sourceLang, targetLang, workflow, steps } = body;

    // Vérifier la clé API
    const apiKey = await getApiKey();
    if (!apiKey) {
      return c.json({
        success: false,
        error: "Clé API Anthropic non configurée. Veuillez l'ajouter dans les Paramètres.",
      }, 400);
    }

    const targetLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
    if (!targetLangInfo) {
      return c.json({
        success: false,
        error: `Langue cible non supportée: ${targetLang}`,
      }, 400);
    }

    console.log(`🌍 Traduction workflow vers ${targetLangInfo.name}...`);

    // Créer le prompt pour Claude
    const prompt = `Tu es un traducteur professionnel spécialisé dans les workflows d'automatisation marketing.

**CONTEXTE:**
- Application: YOJOB (courtage en recrutement européen)
- Langue source: Français
- Langue cible: ${targetLangInfo.name}

**WORKFLOW À TRADUIRE:**

Nom: ${workflow.name}
Description: ${workflow.description}

**ÉTAPES DU WORKFLOW:**
${steps.map((step: any, idx: number) => `
Étape ${idx + 1}:
- Nom: ${step.name}
- Description: ${step.description}
`).join('\n')}

**INSTRUCTIONS:**
1. Traduis de manière professionnelle et contextualisée
2. Préserve le ton professionnel adapté au recrutement européen
3. Garde la même structure et longueur approximative
4. Respecte la terminologie métier du recrutement
5. Retourne UNIQUEMENT un JSON valide sans markdown

**FORMAT DE RÉPONSE (JSON strict):**
{
  "workflow": {
    "name": "...",
    "description": "..."
  },
  "steps": [
    {
      "name": "...",
      "description": "..."
    }
  ]
}`;

    // Appeler Claude
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: await getSelectedModel(),
        max_tokens: 4000,
        temperature: 0.3, // Plus déterministe pour les traductions
        messages: [{
          role: "user",
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API Anthropic:', errorText);
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const rawContent = data.content[0].text;
    
    console.log('📝 Réponse brute Claude:', rawContent);

    // Parser la réponse JSON
    let translation;
    try {
      // Nettoyer le markdown si présent
      const cleanedContent = rawContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      translation = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('❌ Erreur parsing JSON:', parseError);
      throw new Error(`Impossible de parser la réponse de Claude: ${parseError.message}`);
    }

    console.log(`✅ Traduction ${targetLangInfo.name} réussie !`);

    return c.json({
      success: true,
      translation,
      targetLang,
      targetLangName: targetLangInfo.name,
    });

  } catch (error: any) {
    console.error("❌ Erreur lors de la traduction automatique:", error);
    return c.json({ 
      success: false, 
      error: error.message || 'Erreur lors de la traduction automatique'
    }, 500);
  }
});

/**
 * POST /auto-translate-workflow-all
 * Traduire un workflow vers TOUTES les 21 langues en parallèle
 */
app.post("/auto-translate-workflow-all", async (c) => {
  try {
    const body = await c.req.json();
    const { workflow, steps } = body;

    // Vérifier la clé API
    const apiKey = await getApiKey();
    if (!apiKey) {
      return c.json({
        success: false,
        error: "Clé API Anthropic non configurée. Veuillez l'ajouter dans les Paramètres.",
      }, 400);
    }

    console.log('🌍 Traduction automatique vers 21 langues en parallèle...');

    // Fonction pour traduire vers une langue
    const translateToLanguage = async (targetLang: string, langName: string) => {
      const prompt = `Tu es un traducteur professionnel spécialisé dans les workflows d'automatisation marketing.

**CONTEXTE:**
- Application: YOJOB (courtage en recrutement européen)
- Langue source: Français
- Langue cible: ${langName}

**WORKFLOW À TRADUIRE:**

Nom: ${workflow.name}
Description: ${workflow.description}

**ÉTAPES DU WORKFLOW:**
${steps.map((step: any, idx: number) => `
Étape ${idx + 1}:
- Nom: ${step.name}
- Description: ${step.description}
`).join('\n')}

**INSTRUCTIONS:**
1. Traduis de manière professionnelle et contextualisée
2. Préserve le ton professionnel adapté au recrutement européen
3. Garde la même structure et longueur approximative
4. Respecte la terminologie métier du recrutement
5. Retourne UNIQUEMENT un JSON valide sans markdown

**FORMAT DE RÉPONSE (JSON strict):**
{
  "workflow": {
    "name": "...",
    "description": "..."
  },
  "steps": [
    {
      "name": "...",
      "description": "..."
    }
  ]
}`;

      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: await getSelectedModel(),
            max_tokens: 4000,
            temperature: 0.3,
            messages: [{
              role: "user",
              content: prompt
            }]
          })
        });

        if (!response.ok) {
          throw new Error(`API error for ${langName}: ${response.status}`);
        }

        const data = await response.json();
        const rawContent = data.content[0].text;
        
        // Parser la réponse
        const cleanedContent = rawContent
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        
        const translation = JSON.parse(cleanedContent);
        
        console.log(`✅ ${langName} traduit avec succès`);
        
        return {
          lang: targetLang,
          success: true,
          translation,
        };

      } catch (error: any) {
        console.error(`❌ Erreur traduction ${langName}:`, error.message);
        return {
          lang: targetLang,
          success: false,
          error: error.message,
        };
      }
    };

    // Lancer toutes les traductions en parallèle
    const translationPromises = SUPPORTED_LANGUAGES.map(lang => 
      translateToLanguage(lang.code, lang.name)
    );

    const results = await Promise.all(translationPromises);

    // Agréger les résultats
    const translations: any = {};
    let successCount = 0;
    let failureCount = 0;

    results.forEach(result => {
      if (result.success) {
        translations[result.lang] = result.translation;
        successCount++;
      } else {
        failureCount++;
        // Créer une traduction par défaut en cas d'échec
        translations[result.lang] = {
          workflow: {
            name: workflow.name,
            description: workflow.description,
          },
          steps: steps.map((s: any) => ({
            name: s.name,
            description: s.description,
          })),
        };
      }
    });

    console.log(`✅ Traduction terminée: ${successCount} succès, ${failureCount} échecs`);

    return c.json({
      success: true,
      translations,
      stats: {
        total: SUPPORTED_LANGUAGES.length,
        success: successCount,
        failed: failureCount,
      },
    });

  } catch (error: any) {
    console.error("❌ Erreur lors de la traduction automatique globale:", error);
    return c.json({ 
      success: false, 
      error: error.message || 'Erreur lors de la traduction automatique globale'
    }, 500);
  }
});

export default app;
