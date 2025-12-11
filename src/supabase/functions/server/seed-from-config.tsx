/**
 * 🌱 SEED DEPUIS LA CONFIG COMPLETE
 * 
 * Ce script lit survey-questions-COMPLETE.ts et crée TOUTES les traductions manquantes
 * dans Supabase pour les 3 profils (agency, client, worker)
 * 
 * Version: 1.0.0
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
 * Structure d'une question depuis survey-questions-COMPLETE.ts
 */
interface QuestionConfig {
  id: string;
  section: number;
  order: number;
  category: string;
  visibleFor: string[];
  type: string;
  required: boolean;
  fieldName: string;
  labelKey: string;
  labelFallback: string;
  placeholderKey?: string;
  placeholderFallback?: string;
  descriptionKey?: string;
  descriptionFallback?: string;
  options?: Array<{
    value: string;
    labelKey: string;
    labelFallback: string;
    icon?: string;
  }>;
}

/**
 * POST /seed-from-config
 * 
 * Lit les questions depuis le client et crée les traductions manquantes
 * Le client doit envoyer les questions dans le body
 */
export async function seedFromConfig(c: Context) {
  try {
    console.log('🌱 Starting seed from config...');
    
    // Récupérer les questions depuis le body
    const body = await c.req.json();
    const questions: QuestionConfig[] = body.questions || [];
    
    if (questions.length === 0) {
      return c.json({
        success: false,
        error: 'No questions provided in request body',
      }, 400);
    }

    console.log(`📦 Received ${questions.length} questions`);

    const supabase = getSupabaseClient();
    const newTranslations: any[] = [];
    const seenKeys = new Set<string>();

    // Pour chaque question
    questions.forEach((question: QuestionConfig) => {
      const profiles = question.visibleFor; // ['agency', 'client', 'worker']
      
      // 🔑 STRATÉGIE DOUBLE : Créer les traductions AVEC et SANS profil
      // - SANS profil : questions.q5_pays.label (compatibilité générale)
      // - AVEC profil : questions.agency.q5_pays.label (pour useQuestionVisibility)
      
      // 1. Label
      if (question.labelKey && question.labelFallback) {
        // Version SANS profil (clé de base)
        const baseKey = question.labelKey;
        const baseUniqueKey = `${baseKey}:fr`;
        
        if (!seenKeys.has(baseUniqueKey)) {
          seenKeys.add(baseUniqueKey);
          newTranslations.push({
            key: baseKey,
            value: question.labelFallback,
            language: 'fr',
            context: `Question: ${question.id}, Base translation`,
            section: 'questions',
          });
        }
        
        // Versions AVEC profil (pour chaque profil de la question)
        profiles.forEach((profile: string) => {
          const profileKey = `questions.${profile}.${question.id}.label`;
          const profileUniqueKey = `${profileKey}:fr`;
          
          if (!seenKeys.has(profileUniqueKey)) {
            seenKeys.add(profileUniqueKey);
            newTranslations.push({
              key: profileKey,
              value: question.labelFallback,
              language: 'fr',
              context: `Profile: ${profile}, Question: ${question.id}`,
              section: 'questions',
            });
          }
        });
      }

      // 2. Placeholder
      if (question.placeholderKey && question.placeholderFallback) {
        // Version SANS profil
        const baseKey = question.placeholderKey;
        const baseUniqueKey = `${baseKey}:fr`;
        
        if (!seenKeys.has(baseUniqueKey)) {
          seenKeys.add(baseUniqueKey);
          newTranslations.push({
            key: baseKey,
            value: question.placeholderFallback,
            language: 'fr',
            context: `Question: ${question.id}, Base translation`,
            section: 'questions',
          });
        }
        
        // Versions AVEC profil
        profiles.forEach((profile: string) => {
          const profileKey = `questions.${profile}.${question.id}.placeholder`;
          const profileUniqueKey = `${profileKey}:fr`;
          
          if (!seenKeys.has(profileUniqueKey)) {
            seenKeys.add(profileUniqueKey);
            newTranslations.push({
              key: profileKey,
              value: question.placeholderFallback,
              language: 'fr',
              context: `Profile: ${profile}, Question: ${question.id}`,
              section: 'questions',
            });
          }
        });
      }

      // 3. Description (si elle existe)
      if (question.descriptionKey && question.descriptionFallback) {
        // Version SANS profil
        const baseKey = question.descriptionKey;
        const baseUniqueKey = `${baseKey}:fr`;
        
        if (!seenKeys.has(baseUniqueKey)) {
          seenKeys.add(baseUniqueKey);
          newTranslations.push({
            key: baseKey,
            value: question.descriptionFallback,
            language: 'fr',
            context: `Question: ${question.id}, Base translation`,
            section: 'questions',
          });
        }
        
        // Versions AVEC profil
        profiles.forEach((profile: string) => {
          const profileKey = `questions.${profile}.${question.id}.description`;
          const profileUniqueKey = `${profileKey}:fr`;
          
          if (!seenKeys.has(profileUniqueKey)) {
            seenKeys.add(profileUniqueKey);
            newTranslations.push({
              key: profileKey,
              value: question.descriptionFallback,
              language: 'fr',
              context: `Profile: ${profile}, Question: ${question.id}`,
              section: 'questions',
            });
          }
        });
      }

      // 4. Options
      if (question.options && question.options.length > 0) {
        question.options.forEach((option: any) => {
          if (option.labelKey && option.labelFallback) {
            // Version SANS profil
            const baseKey = option.labelKey;
            const baseUniqueKey = `${baseKey}:fr`;
            
            if (!seenKeys.has(baseUniqueKey)) {
              seenKeys.add(baseUniqueKey);
              newTranslations.push({
                key: baseKey,
                value: option.labelFallback,
                language: 'fr',
                context: `Question: ${question.id}, Option: ${option.value}, Base translation`,
                section: 'questions',
              });
            }
            
            // Versions AVEC profil
            profiles.forEach((profile: string) => {
              const profileKey = `questions.${profile}.${question.id}.options.${option.value}`;
              const profileUniqueKey = `${profileKey}:fr`;
              
              if (!seenKeys.has(profileUniqueKey)) {
                seenKeys.add(profileUniqueKey);
                newTranslations.push({
                  key: profileKey,
                  value: option.labelFallback,
                  language: 'fr',
                  context: `Profile: ${profile}, Question: ${question.id}, Option: ${option.value}`,
                  section: 'questions',
                });
              }
            });
          }
        });
      }
    });

    console.log(`✅ Generated ${newTranslations.length} translations from config`);

    // Insérer les nouvelles traductions par batch
    const batchSize = 100;
    let inserted = 0;

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

    console.log('✅ Seed from config completed!');

    return c.json({
      success: true,
      message: 'Successfully seeded translations from config',
      stats: {
        questionsProcessed: questions.length,
        translationsGenerated: newTranslations.length,
        translationsInserted: inserted,
      },
    });

  } catch (error: any) {
    console.error('❌ Error in seedFromConfig:', error);
    return c.json({
      success: false,
      error: 'Failed to seed from config',
      details: error.message,
    }, 500);
  }
}