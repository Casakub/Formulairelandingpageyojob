import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const app = new Hono();

/**
 * 📋 TASKS API
 * Gestion des tâches liées aux prospects
 */

// Helper pour obtenir le client Supabase
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * GET /
 * Récupérer toutes les tâches avec filtres optionnels
 */
app.get("/", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Paramètres de requête
    const prospectId = c.req.query("prospect_id");
    const assignedTo = c.req.query("assigned_to");
    const completed = c.req.query("completed");
    const priority = c.req.query("priority");
    const dueToday = c.req.query("due_today"); // Tâches à faire aujourd'hui
    const overdue = c.req.query("overdue"); // Tâches en retard

    let query = supabase
      .from("tasks")
      .select("*")
      .order("due_date", { ascending: true });

    // Filtres
    if (prospectId) {
      query = query.eq("prospect_id", prospectId);
    }
    if (assignedTo) {
      query = query.eq("assigned_to", assignedTo);
    }
    if (completed !== undefined) {
      query = query.eq("completed", completed === "true");
    }
    if (priority) {
      query = query.eq("priority", priority);
    }

    // Tâches du jour
    if (dueToday === "true") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      query = query
        .gte("due_date", today.toISOString())
        .lt("due_date", tomorrow.toISOString())
        .eq("completed", false);
    }

    // Tâches en retard
    if (overdue === "true") {
      const now = new Date();
      query = query
        .lt("due_date", now.toISOString())
        .eq("completed", false);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching tasks:", error);
      return c.json({ success: false, error: error.message }, 500);
    }

    return c.json({
      success: true,
      tasks: data,
      count: data.length,
    });
  } catch (error: any) {
    console.error("Error in GET /tasks:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /:id
 * Récupérer une tâche spécifique
 */
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return c.json({ success: false, error: "Task not found" }, 404);
    }

    return c.json({
      success: true,
      task: data,
    });
  } catch (error: any) {
    console.error("Error in GET /tasks/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /
 * Créer une nouvelle tâche
 */
app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const {
      prospect_id,
      assigned_to,
      title,
      description,
      priority = "medium",
      due_date,
    } = body;

    // Validation
    if (!prospect_id || !title) {
      return c.json(
        { success: false, error: "prospect_id and title are required" },
        400
      );
    }

    const supabase = getSupabaseClient();

    // Créer la tâche
    const { data: task, error } = await supabase
      .from("tasks")
      .insert([
        {
          prospect_id,
          assigned_to,
          title,
          description,
          priority,
          due_date,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating task:", error);
      return c.json({ success: false, error: error.message }, 500);
    }

    // Créer une action dans l'historique du prospect
    await supabase.from("prospect_actions").insert([
      {
        prospect_id,
        action_type: "task_created",
        action_label: `Tâche créée : ${title}`,
        action_description: `Priorité: ${priority}${due_date ? ` | Échéance: ${new Date(due_date).toLocaleDateString('fr-FR')}` : ''}`,
        user_name: assigned_to || "Admin",
      },
    ]);

    return c.json({
      success: true,
      task,
      message: "Task created successfully",
    });
  } catch (error: any) {
    console.error("Error in POST /tasks:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * PATCH /:id
 * Mettre à jour une tâche
 */
app.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const supabase = getSupabaseClient();

    // Vérifier que la tâche existe
    const { data: existingTask, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingTask) {
      return c.json({ success: false, error: "Task not found" }, 404);
    }

    // Construire l'objet de mise à jour
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.due_date !== undefined) updateData.due_date = body.due_date;
    if (body.assigned_to !== undefined) updateData.assigned_to = body.assigned_to;
    if (body.completed !== undefined) {
      updateData.completed = body.completed;
      if (body.completed) {
        updateData.completed_at = new Date().toISOString();
      } else {
        updateData.completed_at = null;
      }
    }

    // Mettre à jour la tâche
    const { data: updatedTask, error: updateError } = await supabase
      .from("tasks")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating task:", updateError);
      return c.json({ success: false, error: updateError.message }, 500);
    }

    // Créer une action dans l'historique
    if (body.completed !== undefined) {
      await supabase.from("prospect_actions").insert([
        {
          prospect_id: existingTask.prospect_id,
          action_type: body.completed ? "task_completed" : "task_reopened",
          action_label: body.completed
            ? `Tâche terminée : ${existingTask.title}`
            : `Tâche réouverte : ${existingTask.title}`,
          action_description: existingTask.description || "",
          user_name: body.assigned_to || existingTask.assigned_to || "Admin",
        },
      ]);
    }

    return c.json({
      success: true,
      task: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error: any) {
    console.error("Error in PATCH /tasks/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * DELETE /:id
 * Supprimer une tâche
 */
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    // Récupérer la tâche avant suppression pour l'historique
    const { data: task, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !task) {
      return c.json({ success: false, error: "Task not found" }, 404);
    }

    // Supprimer la tâche
    const { error: deleteError } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting task:", deleteError);
      return c.json({ success: false, error: deleteError.message }, 500);
    }

    // Créer une action dans l'historique
    await supabase.from("prospect_actions").insert([
      {
        prospect_id: task.prospect_id,
        action_type: "task_deleted",
        action_label: `Tâche supprimée : ${task.title}`,
        action_description: task.description || "",
        user_name: task.assigned_to || "Admin",
      },
    ]);

    return c.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in DELETE /tasks/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /stats/summary
 * Statistiques des tâches
 */
app.get("/stats/summary", async (c) => {
  try {
    const supabase = getSupabaseClient();
    const assignedTo = c.req.query("assigned_to");

    let baseQuery = supabase.from("tasks").select("*");
    
    if (assignedTo) {
      baseQuery = baseQuery.eq("assigned_to", assignedTo);
    }

    const { data: allTasks } = await baseQuery;

    if (!allTasks) {
      return c.json({
        success: true,
        stats: {
          total: 0,
          completed: 0,
          pending: 0,
          overdue: 0,
          dueToday: 0,
          byPriority: { urgent: 0, high: 0, medium: 0, low: 0 },
        },
      });
    }

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const stats = {
      total: allTasks.length,
      completed: allTasks.filter((t) => t.completed).length,
      pending: allTasks.filter((t) => !t.completed).length,
      overdue: allTasks.filter(
        (t) => !t.completed && t.due_date && new Date(t.due_date) < now
      ).length,
      dueToday: allTasks.filter(
        (t) =>
          !t.completed &&
          t.due_date &&
          new Date(t.due_date) >= today &&
          new Date(t.due_date) < tomorrow
      ).length,
      byPriority: {
        urgent: allTasks.filter((t) => !t.completed && t.priority === "urgent")
          .length,
        high: allTasks.filter((t) => !t.completed && t.priority === "high")
          .length,
        medium: allTasks.filter((t) => !t.completed && t.priority === "medium")
          .length,
        low: allTasks.filter((t) => !t.completed && t.priority === "low")
          .length,
      },
    };

    return c.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error("Error in GET /tasks/stats/summary:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;
