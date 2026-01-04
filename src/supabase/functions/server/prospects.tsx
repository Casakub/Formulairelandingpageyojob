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
      type, // Type de contact depuis le formulaire: 'client', 'agency', 'interim', 'other'
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
    
    // Déterminer le type en fonction du formulaire ou de la source
    let prospectType = type || 'contact'; // Utiliser le type du formulaire en priorité
    if (!type && source === 'landing_waitlist') {
      prospectType = 'waitlist';
    } else if (!type && source?.includes('agency')) {
      prospectType = 'agency';
    } else if (!type && source?.includes('interim')) {
      prospectType = 'interim';
    }

    const prospectData = {
      email,
      type: prospectType,
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
      
      // Erreur de duplication (email déjà inscrit)
      if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('already exists')) {
        return c.json({ 
          success: false, 
          error: `duplicate key value violates unique constraint "uq_prospects_email"`,
          errorCode: '23505',
          isDuplicate: true,
          email
        }, 409); // 409 Conflict
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

    // 🔥 NOUVEAU : Déclencher automatiquement les workflows
    try {
      console.log('🚀 Déclenchement automatique des workflows pour prospect:', prospectId);
      
      // Appeler l'endpoint de trigger (sans attendre la réponse pour ne pas ralentir)
      fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/make-server-10092a63/workflow-engine/trigger/prospect_created`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        },
        body: JSON.stringify({ prospect_id: prospectId }),
      }).catch(err => {
        console.error('⚠️ Erreur trigger workflows (non-bloquant):', err);
      });
    } catch (error: any) {
      console.error('⚠️ Erreur déclenchement workflows:', error);
      // Ne pas bloquer la création du prospect si les workflows échouent
    }

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
    const showArchived = searchParams.get("archived") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = (page - 1) * limit;

    const supabase = getSupabaseClient();

    // Construction de la requête
    let query = supabase
      .from("prospects")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Filtre archivé : si showArchived est false, on exclut les archivés
    if (!showArchived) {
      query = query.eq("is_archived", false);
    }

    // Filtres
    if (type && type !== "all") {
      query = query.eq("type", type);
    }
    if (status && status !== "all") {
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
 * GET /details/:id
 * Obtenir les détails COMPLETS d'un prospect (incluant les données de l'enquête)
 */
app.get("/details/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    // Récupérer le prospect
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

    // Si le prospect vient d'une enquête (source = survey_*), récupérer les données complètes
    let surveyData = null;
    if (prospect.source?.startsWith('survey_') && prospect.email) {
      const { data: response } = await supabase
        .from("market_research_responses")
        .select("*")
        .eq("email", prospect.email)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      surveyData = response;
    }

    return c.json({
      success: true,
      prospect: surveyData || prospect,
    });
  } catch (error: any) {
    console.error("Error in GET /details/:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * PATCH /:id/status
 * Mettre à jour le statut d'un prospect (archiver, désarchiver, etc.)
 */
app.patch("/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;

    if (!status) {
      return c.json({ success: false, error: "Status is required" }, 400);
    }

    const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost', 'archived'];
    if (!validStatuses.includes(status)) {
      return c.json({ 
        success: false, 
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
      }, 400);
    }

    const supabase = getSupabaseClient();

    // Vérifier que le prospect existe
    const { data: prospect, error: prospectError } = await supabase
      .from("prospects")
      .select("*")
      .eq("id", id)
      .single();

    if (prospectError || !prospect) {
      return c.json({ success: false, error: "Prospect not found" }, 404);
    }

    // Mettre à jour le statut
    const { data: updatedProspect, error: updateError } = await supabase
      .from("prospects")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating prospect status:", updateError);
      return c.json({ success: false, error: updateError.message }, 500);
    }

    // Créer une action dans l'historique
    let actionLabel = "Statut modifié";
    if (status === "archived") {
      actionLabel = "Prospect archivé";
    } else if (prospect.status === "archived") {
      actionLabel = "Prospect désarchivé";
    }

    await supabase
      .from("prospect_actions")
      .insert([{
        prospect_id: id,
        action_type: 'status_change',
        action_label: actionLabel,
        action_description: `Statut changé de "${prospect.status}" vers "${status}"`,
        user_name: 'Admin',
      }]);

    return c.json({
      success: true,
      prospect: updatedProspect,
      message: "Prospect status updated successfully",
    });
  } catch (error: any) {
    console.error("Error in PATCH /:id/status:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * PATCH /:id
 * Mettre à jour les informations d'un prospect
 */
app.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const {
      name,
      email,
      phone,
      company,
      country_code,
      language_code,
      sector,
      need_type,
      message,
      responsible_name,
      next_action_date,
      next_action_type,
      next_action_label,
    } = body;

    const supabase = getSupabaseClient();

    // Vérifier que le prospect existe
    const { data: prospect, error: prospectError } = await supabase
      .from("prospects")
      .select("*")
      .eq("id", id)
      .single();

    if (prospectError || !prospect) {
      return c.json({ success: false, error: "Prospect not found" }, 404);
    }

    // Construire l'objet de mise à jour (uniquement les champs fournis)
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined) updateData.company = company;
    if (country_code !== undefined) updateData.country_code = country_code;
    if (language_code !== undefined) updateData.language_code = language_code;
    if (sector !== undefined) updateData.sector = sector;
    if (need_type !== undefined) updateData.need_type = need_type;
    if (message !== undefined) updateData.message = message;
    if (responsible_name !== undefined) updateData.responsible_name = responsible_name;
    if (next_action_date !== undefined) updateData.next_action_date = next_action_date;
    if (next_action_type !== undefined) updateData.next_action_type = next_action_type;
    if (next_action_label !== undefined) updateData.next_action_label = next_action_label;

    // Mettre à jour le prospect
    const { data: updatedProspect, error: updateError } = await supabase
      .from("prospects")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating prospect:", updateError);
      return c.json({ success: false, error: updateError.message }, 500);
    }

    // Créer une action dans l'historique
    const changedFields = Object.keys(updateData).join(', ');
    await supabase
      .from("prospect_actions")
      .insert([{
        prospect_id: id,
        action_type: 'info_update',
        action_label: 'Informations mises à jour',
        action_description: `Champs modifiés : ${changedFields}`,
        user_name: 'Admin',
      }]);

    return c.json({
      success: true,
      prospect: updatedProspect,
      message: "Prospect updated successfully",
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
 * Supprimer définitivement un prospect
 */
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    // Vérifier que le prospect existe
    const { data: prospect, error: prospectError } = await supabase
      .from("prospects")
      .select("email, name")
      .eq("id", id)
      .single();

    if (prospectError || !prospect) {
      return c.json({ success: false, error: "Prospect not found" }, 404);
    }

    // Supprimer les données liées (cascade devrait fonctionner mais on force pour être sûr)
    await supabase.from("prospect_notes").delete().eq("prospect_id", id);
    await supabase.from("prospect_actions").delete().eq("prospect_id", id);
    await supabase.from("prospect_tasks").delete().eq("prospect_id", id);
    await supabase.from("prospect_events").delete().eq("prospect_id", id);

    // Supprimer le prospect
    const { error: deleteError } = await supabase
      .from("prospects")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting prospect:", deleteError);
      return c.json({ success: false, error: deleteError.message }, 500);
    }

    console.log(`✅ Prospect supprimé : ${prospect.name || prospect.email} (${id})`);

    return c.json({
      success: true,
      message: "Prospect deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in DELETE /:id:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /bulk-delete
 * Supprimer plusieurs prospects en batch
 */
app.post("/bulk-delete", async (c) => {
  try {
    const body = await c.req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return c.json({ success: false, error: "Array of prospect IDs is required" }, 400);
    }

    const supabase = getSupabaseClient();

    // Supprimer les données liées pour tous les prospects
    await supabase.from("prospect_notes").delete().in("prospect_id", ids);
    await supabase.from("prospect_actions").delete().in("prospect_id", ids);
    await supabase.from("prospect_tasks").delete().in("prospect_id", ids);
    await supabase.from("prospect_events").delete().in("prospect_id", ids);

    // Supprimer les prospects
    const { error: deleteError } = await supabase
      .from("prospects")
      .delete()
      .in("id", ids);

    if (deleteError) {
      console.error("Error bulk deleting prospects:", deleteError);
      return c.json({ success: false, error: deleteError.message }, 500);
    }

    console.log(`✅ ${ids.length} prospects supprimés`);

    return c.json({
      success: true,
      count: ids.length,
      message: `${ids.length} prospect(s) deleted successfully`,
    });
  } catch (error: any) {
    console.error("Error in POST /bulk-delete:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /bulk-archive
 * Archiver plusieurs prospects en batch
 */
app.post("/bulk-archive", async (c) => {
  try {
    const body = await c.req.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return c.json({ success: false, error: "Array of prospect IDs is required" }, 400);
    }

    const supabase = getSupabaseClient();

    // Mettre à jour le statut en "archived"
    const { error: updateError } = await supabase
      .from("prospects")
      .update({ status: "archived" })
      .in("id", ids);

    if (updateError) {
      console.error("Error bulk archiving prospects:", updateError);
      return c.json({ success: false, error: updateError.message }, 500);
    }

    // Créer des actions dans l'historique pour chaque prospect
    const actions = ids.map(id => ({
      prospect_id: id,
      action_type: 'status_change',
      action_label: 'Prospect archivé',
      action_description: 'Archivé en batch',
      user_name: 'Admin',
    }));

    await supabase.from("prospect_actions").insert(actions);

    console.log(`✅ ${ids.length} prospects archivés`);

    return c.json({
      success: true,
      count: ids.length,
      message: `${ids.length} prospect(s) archived successfully`,
    });
  } catch (error: any) {
    console.error("Error in POST /bulk-archive:", error);
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

/**
 * POST /:id/notes
 * Ajouter une note interne à un prospect
 */
app.post("/:id/notes", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { content, authorName } = body;

    if (!content || !content.trim()) {
      return c.json({ success: false, error: "Note content is required" }, 400);
    }

    const supabase = getSupabaseClient();

    // Vérifier que le prospect existe
    const { data: prospect, error: prospectError } = await supabase
      .from("prospects")
      .select("id")
      .eq("id", id)
      .single();

    if (prospectError || !prospect) {
      return c.json({ success: false, error: "Prospect not found" }, 404);
    }

    // Créer la note
    const { data: note, error: noteError } = await supabase
      .from("prospect_notes")
      .insert([{
        prospect_id: id,
        content: content.trim(),
        author_name: authorName || "Admin",
      }])
      .select()
      .single();

    if (noteError) {
      console.error("Error creating note:", noteError);
      return c.json({ success: false, error: noteError.message }, 500);
    }

    return c.json({
      success: true,
      note,
    });
  } catch (error: any) {
    console.error("Error in POST /:id/notes:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /:id/notes
 * Récupérer toutes les notes d'un prospect
 */
app.get("/:id/notes", async (c) => {
  try {
    const id = c.req.param("id");
    const supabase = getSupabaseClient();

    const { data: notes, error } = await supabase
      .from("prospect_notes")
      .select("*")
      .eq("prospect_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notes:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      notes: notes || [],
    });
  } catch (error: any) {
    console.error("Error in GET /:id/notes:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * DELETE /:id/notes/:noteId
 * Supprimer une note
 */
app.delete("/:id/notes/:noteId", async (c) => {
  try {
    const id = c.req.param("id");
    const noteId = c.req.param("noteId");
    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from("prospect_notes")
      .delete()
      .eq("id", noteId)
      .eq("prospect_id", id);

    if (error) {
      console.error("Error deleting note:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in DELETE /:id/notes/:noteId:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;