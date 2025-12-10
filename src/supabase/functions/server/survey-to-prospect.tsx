/**
 * 🔗 SYNCHRONISATION ENQUÊTES → PROSPECTS CRM
 * 
 * Fonction pour créer automatiquement un prospect CRM
 * à partir d'une réponse d'enquête
 */

import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import type { RespondentType } from "../../types/survey.ts";

/**
 * Mapping des types de répondants vers les types de prospects
 */
const RESPONDENT_TO_PROSPECT_TYPE: Record<string, string> = {
  agency: 'agency',
  client: 'client',
  worker: 'interim',
};

/**
 * Mapping des types de répondants vers les sources
 */
const RESPONDENT_TO_SOURCE: Record<string, string> = {
  agency: 'survey_agency',
  client: 'survey_client',
  worker: 'survey_worker',
};

/**
 * Helper pour obtenir le client Supabase
 */
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * Extraire les données pertinentes de la réponse d'enquête
 */
function extractProspectData(surveyResponse: any) {
  const respondentType = surveyResponse.respondent_type || 'agency';
  
  // Email (commun à tous)
  const email = surveyResponse.email || '';
  
  // Nom (spécifique au type)
  let name = '';
  if (respondentType === 'agency') {
    name = surveyResponse.q1_nom || surveyResponse.q_agency_1_nom || '';
  } else if (respondentType === 'client') {
    name = surveyResponse.q_client_1_nom || '';
  } else if (respondentType === 'worker') {
    name = surveyResponse.q_worker_1_nom || '';
  }
  
  // Pays (commun ou spécifique agence)
  const country = surveyResponse.q_common_1_pays || surveyResponse.q5_pays || surveyResponse.country || '';
  
  // Secteurs d'activité (commun)
  const sectors = surveyResponse.q_common_2_secteurs || surveyResponse.q4_secteurs || [];
  const sector = Array.isArray(sectors) ? sectors.join(', ') : sectors;
  
  // Taille organisation (commun)
  const organizationSize = surveyResponse.q_common_3_taille || surveyResponse.q3_taille || '';
  
  // Score d'intérêt (commun)
  const interestScore = surveyResponse.q_common_8_score || surveyResponse.q18_score || 0;
  
  return {
    email,
    name,
    country,
    sector,
    organizationSize,
    interestScore,
  };
}

/**
 * Calculer un score de qualification du prospect
 */
function calculateProspectScore(surveyResponse: any): number {
  let score = 0;
  
  // Score d'intérêt (0-10) → poids 40%
  const interestScore = surveyResponse.q_common_8_score || surveyResponse.q18_score || 0;
  score += (interestScore / 10) * 40;
  
  // Budget → poids 30%
  const budget = surveyResponse.q_common_7_budget || surveyResponse.q21_budget_mensuel || '';
  if (budget.includes('2000+') || budget.includes('200k+') || budget.includes('1M+')) {
    score += 30;
  } else if (budget.includes('500') || budget.includes('50k')) {
    score += 20;
  } else if (budget.includes('100')) {
    score += 10;
  }
  
  // Rôle décision (pour agences) → poids 20%
  const role = surveyResponse.q_agency_13_role || surveyResponse.q23_role || '';
  if (role === 'decideur') {
    score += 20;
  } else if (role === 'influenceur') {
    score += 15;
  } else if (role === 'utilisateur') {
    score += 10;
  }
  
  // Volume d'activité → poids 10%
  const volume = surveyResponse.q_common_4_volume || surveyResponse.q6_volume || '';
  if (volume.includes('200+') || volume.includes('500+')) {
    score += 10;
  } else if (volume.includes('50') || volume.includes('100')) {
    score += 5;
  }
  
  return Math.min(100, Math.round(score));
}

/**
 * Déterminer le statut initial du prospect
 */
function determineProspectStatus(score: number): string {
  if (score >= 80) return 'qualified';
  if (score >= 60) return 'follow-up';
  return 'new';
}

/**
 * 🎯 FONCTION PRINCIPALE : Synchroniser une enquête vers le CRM
 */
export async function syncSurveyToProspect(surveyResponse: any) {
  try {
    console.log('🔗 [SYNC] Démarrage synchronisation enquête → prospect CRM');
    console.log('   → Survey Response ID:', surveyResponse.response_id || surveyResponse.id);
    console.log('   → Respondent Type:', surveyResponse.respondent_type);

    const supabase = getSupabaseClient();
    
    // Extraire les données
    const prospectData = extractProspectData(surveyResponse);
    
    if (!prospectData.email) {
      console.warn('⚠️ [SYNC] Pas d\'email trouvé, abandon de la synchronisation');
      return {
        success: false,
        error: 'No email found in survey response',
      };
    }
    
    // Déterminer le type et la source
    const respondentType = surveyResponse.respondent_type || 'agency';
    const prospectType = RESPONDENT_TO_PROSPECT_TYPE[respondentType] || 'agency';
    const source = RESPONDENT_TO_SOURCE[respondentType] || 'survey_agency';
    
    // Calculer le score de qualification
    const qualificationScore = calculateProspectScore(surveyResponse);
    const status = determineProspectStatus(qualificationScore);
    
    console.log('   → Email:', prospectData.email);
    console.log('   → Type prospect:', prospectType);
    console.log('   → Source:', source);
    console.log('   → Score qualification:', qualificationScore);
    console.log('   → Statut:', status);
    
    // Vérifier si un prospect existe déjà avec cet email
    const { data: existingProspect, error: searchError } = await supabase
      .from('prospects')
      .select('id, email')
      .eq('email', prospectData.email)
      .maybeSingle();
    
    if (searchError) {
      console.error('❌ [SYNC] Erreur recherche prospect existant:', searchError);
    }
    
    let prospectId: string;
    let isNew = false;
    
    if (existingProspect) {
      // Mettre à jour le prospect existant
      console.log('   → Prospect existant trouvé, mise à jour...');
      
      const { error: updateError } = await supabase
        .from('prospects')
        .update({
          survey_response_id: surveyResponse.id || surveyResponse.response_id,
          type: prospectType,
          source,
          status,
          name: prospectData.name || existingProspect.name,
          country_code: prospectData.country || existingProspect.country_code,
          sector: prospectData.sector || existingProspect.sector,
          custom_fields: {
            ...existingProspect.custom_fields,
            survey_completed: true,
            survey_score: qualificationScore,
            survey_interest: surveyResponse.interest_level,
            organization_size: prospectData.organizationSize,
            survey_date: surveyResponse.created_at || surveyResponse.submitted_at,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingProspect.id);
      
      if (updateError) {
        console.error('❌ [SYNC] Erreur mise à jour prospect:', updateError);
        throw updateError;
      }
      
      prospectId = existingProspect.id;
      console.log('✅ [SYNC] Prospect mis à jour:', prospectId);
      
    } else {
      // Créer un nouveau prospect
      console.log('   → Création nouveau prospect...');
      
      const { data: newProspect, error: insertError } = await supabase
        .from('prospects')
        .insert([{
          email: prospectData.email,
          type: prospectType,
          source,
          status,
          name: prospectData.name,
          country_code: prospectData.country,
          language_code: surveyResponse.language_code || 'fr',
          sector: prospectData.sector,
          survey_response_id: surveyResponse.id || surveyResponse.response_id,
          custom_fields: {
            survey_completed: true,
            survey_score: qualificationScore,
            survey_interest: surveyResponse.interest_level,
            organization_size: prospectData.organizationSize,
            survey_date: surveyResponse.created_at || surveyResponse.submitted_at,
          },
        }])
        .select('id')
        .single();
      
      if (insertError) {
        console.error('❌ [SYNC] Erreur création prospect:', insertError);
        
        // Si les tables n'existent pas
        if (insertError.code === 'PGRST205' || insertError.message?.includes('schema cache')) {
          return {
            success: false,
            error: 'Prospects CRM tables not initialized. Please run SETUP_PROSPECTS_CRM.sql',
            errorCode: 'TABLES_NOT_INITIALIZED',
          };
        }
        
        throw insertError;
      }
      
      prospectId = newProspect.id;
      isNew = true;
      console.log('✅ [SYNC] Nouveau prospect créé:', prospectId);
    }
    
    // Enregistrer l'action
    await supabase.from('prospect_actions').insert({
      prospect_id: prospectId,
      action_type: 'survey_completed',
      action_label: `Enquête complétée (${respondentType})`,
      action_description: `Score: ${qualificationScore}/100 - Intérêt: ${surveyResponse.interest_level || 'N/A'}`,
      user_name: 'Système',
    });
    
    console.log('✅ [SYNC] Synchronisation terminée avec succès');
    
    return {
      success: true,
      prospectId,
      isNew,
      qualificationScore,
      status,
    };
    
  } catch (error: any) {
    console.error('❌ [SYNC] Erreur lors de la synchronisation:', error);
    return {
      success: false,
      error: error.message || 'Unknown error during sync',
    };
  }
}

/**
 * 🔄 FONCTION : Synchronisation batch (pour migrations)
 */
export async function batchSyncSurveysToProspects(limit = 100) {
  try {
    console.log('🔄 [BATCH SYNC] Démarrage synchronisation batch...');
    
    const supabase = getSupabaseClient();
    
    // Récupérer les réponses d'enquête qui n'ont pas encore de prospect associé
    const { data: surveys, error: fetchError } = await supabase
      .from('market_research_responses')
      .select('*')
      .is('synced_to_prospect', null)
      .limit(limit);
    
    if (fetchError) {
      throw fetchError;
    }
    
    if (!surveys || surveys.length === 0) {
      console.log('ℹ️ [BATCH SYNC] Aucune enquête à synchroniser');
      return {
        success: true,
        total: 0,
        synced: 0,
        failed: 0,
      };
    }
    
    console.log(`   → ${surveys.length} enquêtes à synchroniser`);
    
    const results = {
      total: surveys.length,
      synced: 0,
      failed: 0,
      errors: [] as string[],
    };
    
    for (const survey of surveys) {
      const result = await syncSurveyToProspect(survey);
      
      if (result.success) {
        results.synced++;
        
        // Marquer comme synchronisée
        await supabase
          .from('market_research_responses')
          .update({ synced_to_prospect: true })
          .eq('id', survey.id);
      } else {
        results.failed++;
        results.errors.push(`${survey.id}: ${result.error}`);
      }
    }
    
    console.log('✅ [BATCH SYNC] Synchronisation terminée');
    console.log(`   → Succès: ${results.synced}/${results.total}`);
    console.log(`   → Échecs: ${results.failed}/${results.total}`);
    
    return {
      success: true,
      ...results,
    };
    
  } catch (error: any) {
    console.error('❌ [BATCH SYNC] Erreur:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}