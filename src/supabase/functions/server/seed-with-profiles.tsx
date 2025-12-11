/**
 * 🔧 SEED TRADUCTIONS AVEC PROFILS
 * 
 * Ce script convertit les traductions existantes en format avec profils
 * questions.q1_nom.label → questions.agency.q1_nom.label, questions.client.q1_nom.label, questions.worker.q1_nom.label
 * sectors.btp → questions.agency.q4_secteurs.options.btp, questions.client.q4_secteurs.options.btp
 * 
 * Version: 1.1.0
 * Date: 11 Décembre 2024
 */

import type { Context } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

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
 * Mapping des questions vers les profils qui les utilisent
 * Basé sur survey-questions.ts
 */
const QUESTION_TO_PROFILES: Record<string, string[]> = {
  // Section 1: Profil
  'q1_nom': ['agency', 'client', 'worker'],
  'q2_annee': ['agency'],
  'q2_annee_client': ['client'],
  'q2_nationalite': ['worker'],
  'q3_taille': ['agency', 'client'],
  'q3_experience': ['worker'],
  'q4_secteurs': ['agency', 'client'],
  'q4_metier': ['worker'],
  
  // Section 2: Détachement / Expérience
  'q5_pays': ['agency'],
  'q5_localisation': ['client'],
  'q5_pays_origine': ['worker'],
  'q6_volume': ['agency'],
  'q6_frequence': ['client'],
  'q6_missions_pays': ['worker'],
  'q7_origine': ['agency'],
  'q7_besoins': ['client'],
  'q7_duree_mission': ['worker'],
  'q8_destinations': ['agency'],
  'q8_profils': ['client'],
  'q8_langue': ['worker'],
  'q9_defi': ['agency', 'client'],
  'q9_defi_worker': ['worker'],
  'q9_autre': ['agency', 'client', 'worker'],
  'q10_gestion': ['agency'],
  'q10_satisfaction': ['client'],
  'q10_problemes': ['worker'],
  'q11_incidents': ['agency', 'client'],
  'q11_amelioration': ['worker'],
  
  // Section 3: Besoins
  'q12_budget': ['agency', 'client'],
  'q12_salaire': ['worker'],
  'q13_manque_gagner': ['agency'],
  'q13_cout': ['client'],
  'q13_satisfaction_remuneration': ['worker'],
  'q14_risques': ['agency', 'client'],
  'q14_droits': ['worker'],
  'q15_probleme': ['agency', 'client'],
  'q15_attentes': ['worker'],
  'q16_erp': ['agency', 'client'],
  'q16_autre': ['agency', 'client'],
  'q17_migration': ['agency', 'client'],
  'q17_formation': ['worker'],
  
  // Section 4: Intérêt
  'q18_score': ['agency', 'client', 'worker'],
  'q19_features': ['agency', 'client', 'worker'],
  'q20_prix': ['agency', 'client'],
  'q20_criteres': ['worker'],
  'q21_budget_mensuel': ['agency', 'client'],
  'q21_disponibilite': ['worker'],
  'q22_mvp': ['agency', 'client', 'worker'],
  'q23_role': ['agency', 'client'],
  'q23_recommandation': ['worker'],
  
  // Section 5: Vision
  'q24_evolution': ['agency', 'client', 'worker'],
  'q25_besoins': ['agency', 'client', 'worker'],
  
  // Section 6: Contact
  'q26_phone': ['agency', 'client', 'worker'],
  'q27_firstname': ['agency', 'client', 'worker'],
  'q28_lastname': ['agency', 'client', 'worker'],
  'q29_siret': ['agency', 'client'],
  'email': ['agency', 'client', 'worker'],
};

/**
 * POST /seed-with-profiles
 * Convertit les traductions existantes en format avec profils
 */
export async function seedWithProfiles(c: Context) {
  try {
    console.log('🔧 Starting conversion to profile-specific keys...');
    const supabase = getSupabaseClient();

    // Récupérer toutes les traductions existantes qui commencent par "questions." OU "sectors."
    const { data: translations, error: fetchError } = await supabase
      .from('translations_10092a63')
      .select('*')
      .or('key.like.questions.%,key.like.sectors.%');

    if (fetchError) {
      throw new Error(`Error fetching translations: ${fetchError.message}`);
    }

    console.log(`📦 Found ${translations?.length || 0} question/sector translations`);

    const newTranslations: any[] = [];
    const seenKeys = new Set<string>();

    // Pour chaque traduction existante
    translations?.forEach((translation: any) => {
      const key = translation.key;
      
      // CAS 1: Clés "sectors.*" (ex: sectors.btp, sectors.industrie)
      // Convertir en questions.{profile}.q4_secteurs.options.{sector}
      if (key.startsWith('sectors.')) {
        const sectorValue = key.replace('sectors.', ''); // "btp"
        
        // Les secteurs sont utilisés par q4_secteurs (agency + client)
        const profiles = ['agency', 'client'];
        
        profiles.forEach((profile: string) => {
          const newKey = `questions.${profile}.q4_secteurs.options.${sectorValue}`;
          
          const uniqueKey = `${newKey}:${translation.language}`;
          if (seenKeys.has(uniqueKey)) {
            return;
          }
          seenKeys.add(uniqueKey);
          
          newTranslations.push({
            key: newKey,
            value: translation.value,
            language: translation.language,
            context: `Profile: ${profile}, Sector: ${sectorValue}`,
            section: 'questions',
          });
        });
        
        return;
      }
      
      // CAS 2: Clés "questions.*"
      // Format: questions.{questionId}.{field}
      // ou questions.{questionId}.options.{value}
      const parts = key.split('.');
      
      // Ignorer si déjà au format avec profil
      if (['agency', 'client', 'worker'].includes(parts[1])) {
        console.log(`⏭️ Skipping (already has profile): ${key}`);
        return;
      }
      
      if (parts.length < 3 || parts[0] !== 'questions') {
        console.log(`⏭️ Skipping (invalid format): ${key}`);
        return;
      }
      
      const questionId = parts[1];
      const profiles = QUESTION_TO_PROFILES[questionId];
      
      if (!profiles || profiles.length === 0) {
        console.log(`⚠️ No profiles found for question: ${questionId}`);
        return;
      }
      
      // Créer une clé pour chaque profil
      profiles.forEach((profile: string) => {
        // Construire la nouvelle clé: questions.agency.q1_nom.label
        const newKey = `questions.${profile}.${parts.slice(1).join('.')}`;
        
        // Éviter les doublons
        const uniqueKey = `${newKey}:${translation.language}`;
        if (seenKeys.has(uniqueKey)) {
          return;
        }
        seenKeys.add(uniqueKey);
        
        newTranslations.push({
          key: newKey,
          value: translation.value,
          language: translation.language,
          context: `Profile: ${profile}`,
          section: translation.section || 'questions',
        });
      });
    });

    console.log(`✅ Generated ${newTranslations.length} profile-specific translations`);

    // Insérer les nouvelles traductions par batch
    const batchSize = 100;
    let inserted = 0;
    let updated = 0;

    for (let i = 0; i < newTranslations.length; i += batchSize) {
      const batch = newTranslations.slice(i, i + batchSize);
      
      // Utiliser upsert pour éviter les doublons
      const { data, error } = await supabase
        .from('translations_10092a63')
        .upsert(batch, {
          onConflict: 'key,language',
          ignoreDuplicates: false
        });

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error);
        continue;
      }

      inserted += batch.length;
      console.log(`📦 Inserted batch ${i / batchSize + 1}/${Math.ceil(newTranslations.length / batchSize)}`);
    }

    console.log('✅ Conversion completed!');

    return c.json({
      success: true,
      message: 'Successfully converted translations to profile-specific format',
      stats: {
        originalCount: translations?.length || 0,
        generatedCount: newTranslations.length,
        insertedCount: inserted,
      },
    });

  } catch (error: any) {
    console.error('❌ Error in seedWithProfiles:', error);
    return c.json({
      success: false,
      error: 'Failed to convert translations',
      details: error.message,
    }, 500);
  }
}
