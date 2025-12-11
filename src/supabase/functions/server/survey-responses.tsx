/**
 * 🎯 ROUTES POUR LES RÉPONSES D'ENQUÊTE
 * 
 * Gestion des soumissions de formulaire avec validation Zod
 * Support multi-profils (agency/client/worker)
 * 
 * Version: 3.0.1
 * Date: 11 Décembre 2024
 */

import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js";

const app = new Hono();

// Create Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

/**
 * POST /submit
 * Submit a survey response
 */
app.post("/submit", async (c) => {
  try {
    const body = await c.req.json();
    const { profileType, ...responseData } = body;

    // Basic validation
    if (!profileType || !['agency', 'client', 'worker'].includes(profileType)) {
      return c.json({
        success: false,
        error: 'Invalid or missing profileType (must be agency, client, or worker)',
      }, 400);
    }

    // Required fields validation
    const requiredFields = ['q1_nom', 'q24_email'];
    const missingFields = requiredFields.filter(field => !responseData[field]);

    if (missingFields.length > 0) {
      return c.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields,
      }, 400);
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(responseData.q24_email)) {
      return c.json({
        success: false,
        error: 'Invalid email format',
      }, 400);
    }

    const supabase = getSupabaseClient();

    // Prepare data for insertion
    const surveyData = {
      respondent_type: profileType,
      language: responseData.language || 'fr',
      
      // Section 1: Profile
      q1_nom: responseData.q1_nom,
      q2_annee: responseData.q2_annee || null,
      q3_taille: responseData.q3_taille || null,
      q4_secteurs: responseData.q4_secteurs || null,
      q4_metiers: responseData.q4_metiers || null,
      q5_pays: responseData.q5_pays || null,
      
      // Section 2: Experience
      q6_volume: responseData.q6_volume || null,
      q7_origine: responseData.q7_origine || null,
      q7_exp_detachement: responseData.q7_exp_detachement || null,
      q7_travail_etranger: responseData.q7_travail_etranger || null,
      q8_destinations: responseData.q8_destinations || null,
      q8_pays_origine_client: responseData.q8_pays_origine_client || null,
      q8_pays_travailles: responseData.q8_pays_travailles || null,
      q9_defi: responseData.q9_defi || null,
      q9_autre: responseData.q9_autre || null,
      q9_freins: responseData.q9_freins || null,
      q9_satisfaction: responseData.q9_satisfaction || null,
      q10_gestion: responseData.q10_gestion || null,
      q10_delai: responseData.q10_delai || null,
      q10_difficultes: responseData.q10_difficultes || null,
      
      // Section 3: Needs
      q11_certifications: responseData.q11_certifications || null,
      q11_budget_client: responseData.q11_budget_client || null,
      q11_ameliorations: responseData.q11_ameliorations || null,
      q12_budget: responseData.q12_budget || null,
      q12_documents: responseData.q12_documents || null,
      q12_criteres: responseData.q12_criteres || null,
      q12_langues: responseData.q12_langues || null,
      q13_manque_gagner: responseData.q13_manque_gagner || null,
      q13_conformite_agency: responseData.q13_conformite_agency || null,
      q13_conformite_client: responseData.q13_conformite_client || null,
      q13_competences: responseData.q13_competences || null,
      q14_risques: responseData.q14_risques || null,
      q15_probleme: responseData.q15_probleme || null,
      q15_budget_conformite: responseData.q15_budget_conformite || null,
      q15_partenaire: responseData.q15_partenaire || null,
      q15_support_souhaite: responseData.q15_support_souhaite || null,
      q16_erp: responseData.q16_erp || null,
      q16_autre: responseData.q16_autre || null,
      q16_cout_recrutement: responseData.q16_cout_recrutement || null,
      q16_agence_actuelle: responseData.q16_agence_actuelle || null,
      q17_migration: responseData.q17_migration || null,
      q17_features: responseData.q17_features || null,
      
      // Section 4: Interest
      q18_score: responseData.q18_score || null,
      q19_features: responseData.q19_features || null,
      q19_prix: responseData.q19_prix || null,
      q20_prix: responseData.q20_prix || null,
      q20_concurrents: responseData.q20_concurrents || null,
      q21_budget_mensuel: responseData.q21_budget_mensuel || null,
      q21_recommandation: responseData.q21_recommandation || null,
      q22_mvp: responseData.q22_mvp || null,
      q22_vision: responseData.q22_vision || null,
      q23_role: responseData.q23_role || null,
      q23_besoins: responseData.q23_besoins || null,
      
      // Section 5: Vision
      q24_evolution: responseData.q24_evolution || null,
      q25_besoins: responseData.q25_besoins || null,
      
      // Section 6: Contact
      email: responseData.q24_email,
      q25_telephone: responseData.q25_telephone || null,
      q26_phone: responseData.q26_phone || null,
      q26_siret: responseData.q26_siret || null,
      q27_linkedin: responseData.q27_linkedin || null,
      q28_demo: responseData.q28_demo || null,
      q29_early_access: responseData.q29_early_access || null,
      q30_commentaires: responseData.q30_commentaires || null,
      
      autorise_contact: responseData.autorise_contact || false,
      souhaite_rapport: responseData.souhaite_rapport || false,
      
      // Metadata
      completion_time: responseData.completion_time_seconds || null,
      created_at: new Date().toISOString(),
    };

    // Insert into database
    const { data, error } = await supabase
      .from('market_research_responses')
      .insert([surveyData])
      .select()
      .single();

    if (error) {
      console.error('❌ Database insertion error:', error);
      return c.json({
        success: false,
        error: 'Failed to save response',
        details: error.message,
      }, 500);
    }

    console.log('✅ Survey response saved:', {
      id: data.id,
      profileType,
      email: responseData.q24_email,
    });

    // Try to sync to prospects (non-blocking)
    try {
      const { syncSurveyToProspect } = await import("./survey-to-prospect.tsx");
      await syncSurveyToProspect(data.id);
      console.log('✅ Synced to prospects');
    } catch (prospectError) {
      console.warn('⚠️ Failed to sync to prospects:', prospectError);
      // Don't fail the request if prospect sync fails
    }

    return c.json({
      success: true,
      data: {
        id: data.id,
        created_at: data.created_at,
      },
    });

  } catch (error: any) {
    console.error('❌ Survey submission error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

/**
 * GET /responses
 * Get all survey responses (admin only)
 */
app.get("/responses", async (c) => {
  try {
    // Get auth token
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const supabase = getSupabaseClient();

    // Verify user is authenticated
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get query params
    const profileType = c.req.query('profileType');
    const limit = parseInt(c.req.query('limit') || '100');
    const offset = parseInt(c.req.query('offset') || '0');

    // Build query
    let query = supabase
      .from('market_research_responses')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (profileType && ['agency', 'client', 'worker'].includes(profileType)) {
      query = query.eq('respondent_type', profileType);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('❌ Failed to fetch responses:', error);
      return c.json({
        success: false,
        error: 'Failed to fetch responses',
      }, 500);
    }

    return c.json({
      success: true,
      data,
      total: count,
      limit,
      offset,
    });

  } catch (error: any) {
    console.error('❌ Fetch responses error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
    }, 500);
  }
});

/**
 * GET /stats
 * Get survey statistics
 */
app.get("/stats", async (c) => {
  try {
    const supabase = getSupabaseClient();

    // Get counts by profile type
    const { count: agencyCount } = await supabase
      .from('market_research_responses')
      .select('id', { count: 'exact', head: true })
      .eq('respondent_type', 'agency');

    const { count: clientCount } = await supabase
      .from('market_research_responses')
      .select('id', { count: 'exact', head: true })
      .eq('respondent_type', 'client');

    const { count: workerCount } = await supabase
      .from('market_research_responses')
      .select('id', { count: 'exact', head: true })
      .eq('respondent_type', 'worker');

    // Get average NPS score (q18_score)
    const { data: npsData } = await supabase
      .from('market_research_responses')
      .select('q18_score, respondent_type')
      .not('q18_score', 'is', null);

    const calculateNPS = (scores: number[]) => {
      if (scores.length === 0) return 0;
      const promoters = scores.filter(s => s >= 9).length;
      const detractors = scores.filter(s => s <= 6).length;
      return Math.round(((promoters - detractors) / scores.length) * 100);
    };

    const allScores = npsData?.map(r => r.q18_score) || [];
    const agencyScores = npsData?.filter(r => r.respondent_type === 'agency').map(r => r.q18_score) || [];
    const clientScores = npsData?.filter(r => r.respondent_type === 'client').map(r => r.q18_score) || [];
    const workerScores = npsData?.filter(r => r.respondent_type === 'worker').map(r => r.q18_score) || [];

    return c.json({
      success: true,
      stats: {
        total: (agencyCount || 0) + (clientCount || 0) + (workerCount || 0),
        byProfile: {
          agency: agencyCount || 0,
          client: clientCount || 0,
          worker: workerCount || 0,
        },
        nps: {
          global: calculateNPS(allScores),
          agency: calculateNPS(agencyScores),
          client: calculateNPS(clientScores),
          worker: calculateNPS(workerScores),
        },
      },
    });

  } catch (error: any) {
    console.error('❌ Stats error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
    }, 500);
  }
});

export default app;
