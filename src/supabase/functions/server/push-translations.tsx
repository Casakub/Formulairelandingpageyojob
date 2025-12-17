/**
 * 🚀 PUSH TRANSLATIONS TO SUPABASE
 * 
 * Script pour pousser les traductions depuis /config/ vers la table translations_10092a63
 * Transforme la structure nested en format flat key-value
 * 
 * Version: 1.0.0
 * Date: 11 Décembre 2024
 */

import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

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

/**
 * Flatten nested translation object to key-value pairs
 * 
 * Input: { questions: { q1_nom: { label: "Test" } } }
 * Output: [{ key: "questions.q1_nom.label", value: "Test" }]
 */
function flattenTranslations(
  obj: any,
  prefix = '',
  section = 'general'
): Array<{ key: string; value: string; section: string; context?: string }> {
  const result: Array<{ key: string; value: string; section: string; context?: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    // Déterminer la section
    let currentSection = section;
    if (prefix === '') {
      currentSection = key; // 'questions', 'common', 'nav'
    }

    if (typeof value === 'string') {
      result.push({
        key: newKey,
        value: value as string,
        section: currentSection,
      });
    } else if (typeof value === 'object' && value !== null) {
      // Check if it's a profile-specific object (agency/client/worker)
      if ('agency' in value || 'client' in value || 'worker' in value) {
        // Profile-specific translations
        for (const [profile, text] of Object.entries(value)) {
          if (typeof text === 'string') {
            result.push({
              key: `${newKey}.${profile}`,
              value: text,
              section: currentSection,
              context: `Profile: ${profile}`,
            });
          }
        }
      } else {
        // Nested object, recurse
        result.push(...flattenTranslations(value, newKey, currentSection));
      }
    }
  }

  return result;
}

/**
 * POST /push
 * Push all translations from /config/ to Supabase
 */
app.post("/push", async (c) => {
  try {
    console.log('🚀 Starting translations push to Supabase...');

    // Dynamically import translations from /config/
    // Note: En Edge Functions, on ne peut pas faire d'import dynamique depuis le filesystem
    // Il faut donc que les traductions soient passées dans le body de la requête
    const body = await c.req.json();
    const { translations, dryRun = false } = body;

    if (!translations) {
      return c.json({
        success: false,
        error: 'Missing translations object in request body',
        hint: 'Send { translations: { fr: {...}, en: {...}, ... } }',
      }, 400);
    }

    const supabase = getSupabaseClient();
    const allRecords: Array<{
      language: string;
      key: string;
      value: string;
      section: string;
      context?: string;
    }> = [];

    // Process each language
    for (const [lang, translationSet] of Object.entries(translations)) {
      console.log(`📝 Processing language: ${lang}`);
      
      const flatTranslations = flattenTranslations(translationSet as any);
      
      for (const { key, value, section, context } of flatTranslations) {
        allRecords.push({
          language: lang,
          key,
          value,
          section,
          context,
        });
      }
      
      console.log(`✅ ${lang}: ${flatTranslations.length} translations flattened`);
    }

    console.log(`📊 Total records to insert: ${allRecords.length}`);

    if (dryRun) {
      return c.json({
        success: true,
        dryRun: true,
        stats: {
          totalRecords: allRecords.length,
          languages: Object.keys(translations).length,
          sampleRecords: allRecords.slice(0, 10),
        },
        message: 'Dry run completed. No data inserted.',
      });
    }

    // Insert translations in batches (Supabase max 1000 per batch)
    const BATCH_SIZE = 500;
    const batches = [];
    for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
      batches.push(allRecords.slice(i, i + BATCH_SIZE));
    }

    console.log(`📦 Inserting ${batches.length} batches...`);

    let insertedCount = 0;
    let updatedCount = 0;
    const errors: Array<any> = [];

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`⏳ Inserting batch ${i + 1}/${batches.length} (${batch.length} records)...`);

      const { data, error } = await supabase
        .from('translations_10092a63')
        .upsert(batch, {
          onConflict: 'language,key',
          ignoreDuplicates: false, // Update existing records
        });

      if (error) {
        console.error(`❌ Error inserting batch ${i + 1}:`, error);
        errors.push({
          batch: i + 1,
          error: error.message,
          details: error.details,
        });
      } else {
        insertedCount += batch.length;
        console.log(`✅ Batch ${i + 1} inserted successfully`);
      }
    }

    console.log('🎉 Push completed!');

    return c.json({
      success: true,
      stats: {
        totalRecords: allRecords.length,
        insertedCount,
        languages: Object.keys(translations).length,
        batches: batches.length,
        errors: errors.length,
      },
      errors: errors.length > 0 ? errors : undefined,
      message: `Successfully pushed ${insertedCount} translations for ${Object.keys(translations).length} languages`,
    });

  } catch (error: any) {
    console.error('❌ Push translations error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
      stack: error.stack,
    }, 500);
  }
});

/**
 * GET /push/status -> /status
 * Get current translation status in database
 */
app.get("/status", async (c) => {
  try {
    const supabase = getSupabaseClient();

    // Count translations by language
    const { data, error } = await supabase
      .from('translations_10092a63')
      .select('language, section');

    if (error) {
      throw error;
    }

    // Aggregate stats
    const stats: Record<string, { total: number; sections: Record<string, number> }> = {};

    for (const row of data || []) {
      if (!stats[row.language]) {
        stats[row.language] = { total: 0, sections: {} };
      }
      stats[row.language].total++;
      stats[row.language].sections[row.section] = (stats[row.language].sections[row.section] || 0) + 1;
    }

    return c.json({
      success: true,
      stats,
      totalTranslations: data?.length || 0,
      languages: Object.keys(stats),
    });

  } catch (error: any) {
    console.error('❌ Status error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

/**
 * DELETE /push/clear
 * Clear all translations (use with caution!)
 */
app.delete("/push/clear", async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const { confirm } = body;

    if (confirm !== 'YES_DELETE_ALL_TRANSLATIONS') {
      return c.json({
        success: false,
        error: 'Confirmation required',
        hint: 'Send { "confirm": "YES_DELETE_ALL_TRANSLATIONS" }',
      }, 400);
    }

    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from('translations_10092a63')
      .delete()
      .neq('id', 0); // Delete all

    if (error) {
      throw error;
    }

    return c.json({
      success: true,
      message: 'All translations cleared',
    });

  } catch (error: any) {
    console.error('❌ Clear error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

export default app;