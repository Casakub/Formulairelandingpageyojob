import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { scoreAndUpdateProspect, scoreBatchProspects } from "./prospect-scoring.tsx";
import { triggerProspectIntegrations } from "./prospect-integrations.tsx";

const app = new Hono();

/**
 * 🎯 PROSPECTS CRM API
 * Gestion des prospects collectés depuis la landing page et autres sources
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
 * POST /submit
 * Soumettre un nouveau prospect (depuis landing page ou autre)
 */
app.post("/submit", async (c) => {
  try {
    const body = await c.req.json();
    const {
      // Données obligatoires
      email,
      source, // 'landing_contact', 'landing_waitlist', 'manual', 'import'
      
      // Données optionnelles
      name,
      phone,
      company,
      countryCode,
      languageCode,
      sector,
      needType,
      message,
      
      // Métadonnées
      customFields,
    } = body;

    if (!email) {
      return c.json({ success: false, error: "Email is required" }, 400);
    }

    const supabase = getSupabaseClient();
    
    // Déterminer le type en fonction de la source
    let type = 'contact';
    if (source === 'landing_waitlist') {
      type = 'waitlist';
    } else if (source?.includes('agency')) {
      type = 'agency';
    } else if (source?.includes('interim')) {
      type = 'interim';
    }

    const prospectData = {
      email,
      type,
      source: source || 'manual',
      status: 'new',
      name,
      phone,
      company,
      country_code: countryCode,
      language_code: languageCode,
      sector,
      need_type: needType,
      message,
      custom_fields: customFields || {},
    };

    const { data, error } = await supabase
      .from("prospects")
      .insert([prospectData])
      .select()
      .single();

    if (error) {
      console.error("[Supabase] Error creating prospect:", error);
      
      // Message spécifique si les tables n'existent pas
      if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
        return c.json({ 
          success: false, 
          error: "Database tables not initialized. Please run SETUP_PROSPECTS_CRM.sql in Supabase SQL Editor. See README_SETUP_CRM.md for instructions.",
          errorCode: 'TABLES_NOT_INITIALIZED'
        }, 503);
      }
      
      return c.json({ success: false, error: error.message }, 500);
    }

    const prospectId = data.id;

    // Enregistrer l'action initiale
    await supabase.from("prospect_actions").insert({
      prospect_id: prospectId,
      action_type: "form_submit",
      action_label: `Soumission formulaire depuis ${source}`,
      action_description: message || "Premier contact",
      user_name: "Système",
    });

    return c.json({
      success: true,
      message: "Prospect created successfully",
      prospectId,
      isNew: true,
    });
  } catch (error: any) {
    console.error("Error in POST /submit:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /list
 * Lister tous les prospects avec filtres
 */
app.get("/list", async (c) => {
  try {
    const { searchParams } = new URL(c.req.url);
    
    const type = searchParams.get("type"); // 'all', 'client', 'agency', 'interim', 'waitlist'
    const status = searchParams.get("status");
    const country = searchParams.get("country");
    const sector = searchParams.get("sector");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = (page - 1) * limit;

    const supabase = getSupabaseClient();

    // Construction de la requête
    let query = supabase
      .from("prospects")
      .select("*", { count: "exact" })
      .eq("is_archived", false)
      .order("created_at", { ascending: false });

    // Filtres
    if (type && type !== "all") {
      query = query.eq("type", type);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (country) {
      query = query.eq("country_code", country);
    }
    if (sector) {
      query = query.eq("sector", sector);
    }
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`
      );
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching prospects:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      prospects: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error("Error in GET /list:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /stats
 * Obtenir les statistiques des prospects
 */
app.get("/stats", async (c) => {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("prospect_stats")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching stats:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      stats: data,
    });
  } catch (error: any) {
    console.error("Error in GET /stats:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /:id
 * Obtenir les détails d'un prospect
 */
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    // Prospect
    const { data: prospect, error: prospectError } = await supabase
      .from("prospects")
      .select("*")
      .eq("id", id)
      .single();

    if (prospectError) {
      console.error("Error fetching prospect:", prospectError);
      return c.json({ error: prospectError.message }, 500);
    }

    if (!prospect) {
      return c.json({ error: "Prospect not found" }, 404);
    }

    // Actions
    const { data: actions } = await supabase
      .from("prospect_actions")
      .select("*")
      .eq("prospect_id", id)
      .order("created_at", { ascending: false });

    // Notes
    const { data: notes } = await supabase
      .from("prospect_notes")
      .select("*")
      .eq("prospect_id", id)
      .order("created_at", { ascending: false });

    return c.json({
      success: true,
      prospect,
      actions: actions || [],
      notes: notes || [],
    });
  } catch (error: any) {
    console.error("Error in GET /:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * PATCH /:id
 * Mettre à jour un prospect
 */
app.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("prospects")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating prospect:", error);
      return c.json({ error: error.message }, 500);
    }

    // Enregistrer l'action
    await supabase.from("prospect_actions").insert({
      prospect_id: id,
      action_type: "update",
      action_label: "Mise à jour des informations",
      user_name: "Admin",
    });

    return c.json({
      success: true,
      prospect: data,
    });
  } catch (error: any) {
    console.error("Error in PATCH /:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /:id/action
 * Ajouter une action sur un prospect
 */
app.post("/:id/action", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { actionType, actionLabel, actionDescription, userName } = body;

    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("prospect_actions")
      .insert({
        prospect_id: id,
        action_type: actionType,
        action_label: actionLabel,
        action_description: actionDescription,
        user_name: userName || "Admin",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating action:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      action: data,
    });
  } catch (error: any) {
    console.error("Error in POST /:id/action:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /:id/note
 * Ajouter une note sur un prospect
 */
app.post("/:id/note", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { content, authorName } = body;

    if (!content || !authorName) {
      return c.json({ error: "Content and authorName are required" }, 400);
    }

    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("prospect_notes")
      .insert({
        prospect_id: id,
        content,
        author_name: authorName,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating note:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      note: data,
    });
  } catch (error: any) {
    console.error("Error in POST /:id/note:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * DELETE /:id
 * Archiver un prospect (soft delete)
 */
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from("prospects")
      .update({ is_archived: true })
      .eq("id", id);

    if (error) {
      console.error("Error archiving prospect:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      message: "Prospect archived successfully",
    });
  } catch (error: any) {
    console.error("Error in DELETE /:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /:id/score
 * Scorer un prospect avec l'IA
 */
app.post("/:id/score", async (c) => {
  try {
    const id = c.req.param("id");
    const scoring = await scoreAndUpdateProspect(id);

    return c.json({
      success: true,
      scoring,
    });
  } catch (error: any) {
    console.error("Error in POST /:id/score:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /score-batch
 * Scorer plusieurs prospects en batch
 */
app.post("/score-batch", async (c) => {
  try {
    const body = await c.req.json();
    const limit = body.limit || 50;

    const result = await scoreBatchProspects(limit);

    return c.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error("Error in POST /score-batch:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /:id/integrations
 * Déclencher les intégrations pour un prospect
 */
app.post("/:id/integrations", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await triggerProspectIntegrations(id);

    return c.json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    console.error("Error in POST /:id/integrations:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;