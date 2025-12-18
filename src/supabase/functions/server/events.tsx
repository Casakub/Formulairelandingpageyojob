import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const app = new Hono();

/**
 * 🗓️ EVENTS API
 * Gestion des événements/rendez-vous liés aux prospects
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
 * Récupérer tous les événements avec filtres optionnels
 */
app.get("/", async (c) => {
  try {
    const supabase = getSupabaseClient();
    
    // Paramètres de requête
    const prospectId = c.req.query("prospect_id");
    const eventType = c.req.query("event_type");
    const status = c.req.query("status");
    const startDate = c.req.query("start_date"); // ISO string
    const endDate = c.req.query("end_date"); // ISO string
    const upcoming = c.req.query("upcoming"); // Événements à venir seulement

    let query = supabase
      .from("prospect_events")
      .select("*")
      .order("start_datetime", { ascending: true });

    // Filtres
    if (prospectId) {
      query = query.eq("prospect_id", prospectId);
    }
    if (eventType) {
      query = query.eq("event_type", eventType);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (startDate) {
      query = query.gte("start_datetime", startDate);
    }
    if (endDate) {
      query = query.lte("start_datetime", endDate);
    }

    // Événements à venir uniquement
    if (upcoming === "true") {
      const now = new Date().toISOString();
      query = query
        .gte("start_datetime", now)
        .in("status", ["scheduled"]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching events:", error);
      return c.json({ success: false, error: error.message }, 500);
    }

    return c.json({
      success: true,
      events: data,
      count: data.length,
    });
  } catch (error: any) {
    console.error("Error in GET /events:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /upcoming
 * Récupérer les événements à venir dans les prochaines 24h
 */
app.get("/upcoming", async (c) => {
  try {
    const supabase = getSupabaseClient();
    const hours = parseInt(c.req.query("hours") || "24");

    const now = new Date();
    const future = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from("prospect_events")
      .select("*")
      .gte("start_datetime", now.toISOString())
      .lte("start_datetime", future.toISOString())
      .eq("status", "scheduled")
      .order("start_datetime", { ascending: true });

    if (error) {
      console.error("Error fetching upcoming events:", error);
      return c.json({ success: false, error: error.message }, 500);
    }

    return c.json({
      success: true,
      events: data,
      count: data.length,
    });
  } catch (error: any) {
    console.error("Error in GET /events/upcoming:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /:id
 * Récupérer un événement spécifique
 */
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("prospect_events")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }

    return c.json({
      success: true,
      event: data,
    });
  } catch (error: any) {
    console.error("Error in GET /events/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /
 * Créer un nouvel événement
 */
app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const {
      prospect_id,
      event_type,
      title,
      description,
      start_datetime,
      end_datetime,
      location,
      attendees,
      reminder_time,
      created_by,
    } = body;

    // Validation
    if (!prospect_id || !event_type || !title || !start_datetime || !end_datetime) {
      return c.json(
        {
          success: false,
          error: "prospect_id, event_type, title, start_datetime, and end_datetime are required",
        },
        400
      );
    }

    const supabase = getSupabaseClient();

    // Créer l'événement
    const { data: event, error } = await supabase
      .from("prospect_events")
      .insert([
        {
          prospect_id,
          event_type,
          title,
          description,
          start_datetime,
          end_datetime,
          location,
          attendees,
          reminder_time,
          created_by,
          status: "scheduled",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating event:", error);
      return c.json({ success: false, error: error.message }, 500);
    }

    // Créer une action dans l'historique du prospect
    await supabase.from("prospect_actions").insert([
      {
        prospect_id,
        action_type: "event_created",
        action_label: `Événement créé : ${title}`,
        action_description: `Type: ${event_type} | Date: ${new Date(start_datetime).toLocaleString('fr-FR')}${location ? ` | Lieu: ${location}` : ''}`,
        user_name: created_by || "Admin",
      },
    ]);

    return c.json({
      success: true,
      event,
      message: "Event created successfully",
    });
  } catch (error: any) {
    console.error("Error in POST /events:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * PATCH /:id
 * Mettre à jour un événement
 */
app.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const supabase = getSupabaseClient();

    // Vérifier que l'événement existe
    const { data: existingEvent, error: fetchError } = await supabase
      .from("prospect_events")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingEvent) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }

    // Construire l'objet de mise à jour
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.event_type !== undefined) updateData.event_type = body.event_type;
    if (body.start_datetime !== undefined) updateData.start_datetime = body.start_datetime;
    if (body.end_datetime !== undefined) updateData.end_datetime = body.end_datetime;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.attendees !== undefined) updateData.attendees = body.attendees;
    if (body.reminder_time !== undefined) updateData.reminder_time = body.reminder_time;
    if (body.status !== undefined) {
      updateData.status = body.status;
      if (body.status === "completed") {
        updateData.completed_at = new Date().toISOString();
      }
    }

    // Mettre à jour l'événement
    const { data: updatedEvent, error: updateError } = await supabase
      .from("prospect_events")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating event:", updateError);
      return c.json({ success: false, error: updateError.message }, 500);
    }

    // Créer une action dans l'historique
    if (body.status !== undefined && body.status !== existingEvent.status) {
      const statusLabels: Record<string, string> = {
        completed: "terminé",
        cancelled: "annulé",
        "no-show": "non présenté",
        scheduled: "reprogrammé",
      };

      await supabase.from("prospect_actions").insert([
        {
          prospect_id: existingEvent.prospect_id,
          action_type: `event_${body.status}`,
          action_label: `Événement ${statusLabels[body.status] || body.status} : ${existingEvent.title}`,
          action_description: `Date: ${new Date(existingEvent.start_datetime).toLocaleString('fr-FR')}`,
          user_name: existingEvent.created_by || "Admin",
        },
      ]);
    }

    return c.json({
      success: true,
      event: updatedEvent,
      message: "Event updated successfully",
    });
  } catch (error: any) {
    console.error("Error in PATCH /events/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * DELETE /:id
 * Supprimer un événement
 */
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    // Récupérer l'événement avant suppression pour l'historique
    const { data: event, error: fetchError } = await supabase
      .from("prospect_events")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !event) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }

    // Supprimer l'événement
    const { error: deleteError } = await supabase
      .from("prospect_events")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting event:", deleteError);
      return c.json({ success: false, error: deleteError.message }, 500);
    }

    // Créer une action dans l'historique
    await supabase.from("prospect_actions").insert([
      {
        prospect_id: event.prospect_id,
        action_type: "event_deleted",
        action_label: `Événement supprimé : ${event.title}`,
        action_description: `Type: ${event.event_type} | Date: ${new Date(event.start_datetime).toLocaleString('fr-FR')}`,
        user_name: event.created_by || "Admin",
      },
    ]);

    return c.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in DELETE /events/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /stats/summary
 * Statistiques des événements
 */
app.get("/stats/summary", async (c) => {
  try {
    const supabase = getSupabaseClient();
    const createdBy = c.req.query("created_by");

    let baseQuery = supabase.from("prospect_events").select("*");
    
    if (createdBy) {
      baseQuery = baseQuery.eq("created_by", createdBy);
    }

    const { data: allEvents } = await baseQuery;

    if (!allEvents) {
      return c.json({
        success: true,
        stats: {
          total: 0,
          scheduled: 0,
          completed: 0,
          cancelled: 0,
          noShow: 0,
          today: 0,
          thisWeek: 0,
          byType: {},
        },
      });
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const stats = {
      total: allEvents.length,
      scheduled: allEvents.filter((e) => e.status === "scheduled").length,
      completed: allEvents.filter((e) => e.status === "completed").length,
      cancelled: allEvents.filter((e) => e.status === "cancelled").length,
      noShow: allEvents.filter((e) => e.status === "no-show").length,
      today: allEvents.filter(
        (e) =>
          e.status === "scheduled" &&
          new Date(e.start_datetime) >= today &&
          new Date(e.start_datetime) < new Date(today.getTime() + 24 * 60 * 60 * 1000)
      ).length,
      thisWeek: allEvents.filter(
        (e) =>
          e.status === "scheduled" &&
          new Date(e.start_datetime) >= today &&
          new Date(e.start_datetime) < nextWeek
      ).length,
      byType: allEvents.reduce((acc: any, e) => {
        acc[e.event_type] = (acc[e.event_type] || 0) + 1;
        return acc;
      }, {}),
    };

    return c.json({
      success: true,
      stats,
    });
  } catch (error: any) {
    console.error("Error in GET /events/stats/summary:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;
