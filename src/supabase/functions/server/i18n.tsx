/**
 * 🌍 ROUTES I18N - Langues et Traductions
 * 
 * Endpoints pour gérer les langues disponibles et les traductions
 * 
 * Version: 1.0.0
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
 * GET /available-languages
 * Get all available languages with translation stats
 */
app.get("/available-languages", async (c) => {
  try {
    const supabase = getSupabaseClient();

    // Get all translations grouped by language
    const { data: translations, error } = await supabase
      .from('translations_10092a63')
      .select('language, key');

    if (error) {
      console.error('❌ Error fetching translations:', error);
      return c.json({
        success: false,
        error: 'Failed to fetch translations',
      }, 500);
    }

    // Group by language and count
    const languageStats = new Map();

    translations?.forEach((translation: any) => {
      const lang = translation.language;
      if (!languageStats.has(lang)) {
        languageStats.set(lang, {
          code: lang,
          totalTranslations: 0,
          questions: 0,
          ui: 0,
        });
      }

      const stats = languageStats.get(lang);
      stats.totalTranslations++;

      // Count questions vs UI translations
      if (translation.key.startsWith('questions.')) {
        stats.questions++;
      } else {
        stats.ui++;
      }
    });

    // Calculate completion percentage (assuming ~300 total keys)
    const TOTAL_KEYS = 300;
    const languages = Array.from(languageStats.values()).map((lang: any) => ({
      ...lang,
      completion: Math.round((lang.totalTranslations / TOTAL_KEYS) * 100),
    }));

    // Sort by completion (highest first)
    languages.sort((a, b) => b.completion - a.completion);

    return c.json({
      success: true,
      languages,
      stats: {
        totalQuestions: Math.max(...languages.map(l => l.questions)),
        totalUITexts: Math.max(...languages.map(l => l.ui)),
        totalItems: TOTAL_KEYS,
      },
    });

  } catch (error: any) {
    console.error('❌ Available languages error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

/**
 * GET /translations/:language
 * Get all translations for a specific language
 */
app.get("/translations/:language", async (c) => {
  try {
    const language = c.req.param('language');

    if (!language) {
      return c.json({
        success: false,
        error: 'Language parameter is required',
      }, 400);
    }

    const supabase = getSupabaseClient();

    // Get all translations for this language
    const { data: translations, error } = await supabase
      .from('translations_10092a63')
      .select('key, value, context, section')
      .eq('language', language);

    if (error) {
      console.error(`❌ Error fetching translations for ${language}:`, error);
      return c.json({
        success: false,
        error: 'Failed to fetch translations',
      }, 500);
    }

    // Convert to key-value object
    const translationsMap: Record<string, string> = {};
    translations?.forEach((t: any) => {
      translationsMap[t.key] = t.value;
    });

    return c.json({
      success: true,
      language,
      translations: translationsMap,
      count: translations?.length || 0,
    });

  } catch (error: any) {
    console.error('❌ Translations error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

/**
 * GET /translate/:language
 * Get formatted translations for the survey form
 * Returns questions and UI translations in separate objects
 */
app.get("/translate/:language", async (c) => {
  try {
    const language = c.req.param('language');

    if (!language) {
      return c.json({
        success: false,
        error: 'Language parameter is required',
      }, 400);
    }

    const supabase = getSupabaseClient();

    // Get all translations for this language
    const { data: translations, error } = await supabase
      .from('translations_10092a63')
      .select('key, value, context, section')
      .eq('language', language);

    if (error) {
      console.error(`❌ Error fetching translations for ${language}:`, error);
      return c.json({
        success: false,
        error: 'Failed to fetch translations',
      }, 500);
    }

    // Separate questions and UI translations
    const questions: Record<string, any> = {};
    const ui: Record<string, string> = {};

    translations?.forEach((t: any) => {
      const key = t.key;
      const value = t.value;

      // Questions format: questions.{profile}.{questionId}.{field}
      // Ex: questions.agency.q1_nom.label
      if (key.startsWith('questions.')) {
        const parts = key.split('.');
        // parts[0] = 'questions'
        // parts[1] = profile ('agency', 'client', 'worker') OR questionId ('q1_nom')
        // parts[2] = questionId OR field ('label', 'placeholder')
        // parts[3] = field OR option index

        // Check if it's profile-specific or generic
        const isProfileSpecific = ['agency', 'client', 'worker'].includes(parts[1]);
        
        let questionId: string;
        let field: string;
        let isOption = false;
        let optionValue: string | null = null;

        if (isProfileSpecific) {
          // Format: questions.agency.q1_nom.label
          // OU: questions.agency.q3_taille.options.1-9
          questionId = parts[2];
          field = parts[3];
          if (parts.length > 4 && parts[3] === 'options') {
            isOption = true;
            optionValue = parts[4]; // ex: "1-9", "btp", etc.
          }
        } else {
          // Format: questions.q1_nom.label
          // OU: questions.q3_taille.options.1-9
          questionId = parts[1];
          field = parts[2];
          if (parts.length > 3 && parts[2] === 'options') {
            isOption = true;
            optionValue = parts[3]; // ex: "1-9", "btp", etc.
          }
        }

        if (!questions[questionId]) {
          questions[questionId] = {
            label: '',
            placeholder: '',
            options: {},  // ← Changé de [] à {}
            status: 'validated'
          };
        }

        if (isOption && optionValue) {
          if (typeof questions[questionId].options !== 'object') {
            questions[questionId].options = {};
          }

          // Stocker par valeur, pas par index
          questions[questionId].options[optionValue] = value;
        } else if (field === 'label') {
          questions[questionId].label = value;
        } else if (field === 'placeholder') {
          questions[questionId].placeholder = value;
        } else if (field === 'description') {
          questions[questionId].description = value;
        }
      } else {
        // Everything else goes to UI translations
        ui[key] = value;
      }
    });

    console.log(`✅ Formatted ${Object.keys(questions).length} questions and ${Object.keys(ui).length} UI texts for language: ${language}`);

    return c.json({
      success: true,
      language,
      translations: {
        questions,
        ui
      },
      count: translations?.length || 0,
    });

  } catch (error: any) {
    console.error('❌ Translate error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

/**
 * GET /stats
 * Get translation statistics (total questions, UI texts, etc.)
 */
app.get("/stats", async (c) => {
  try {
    const supabase = getSupabaseClient();

    // Get all translations count
    const { data: translations, error } = await supabase
      .from('translations_10092a63')
      .select('key, language');

    if (error) {
      console.error('❌ Error fetching translation stats:', error);
      return c.json({
        success: false,
        error: 'Failed to fetch translation stats',
      }, 500);
    }

    // Count unique questions and UI texts
    const uniqueQuestionKeys = new Set<string>();
    const uniqueUIKeys = new Set<string>();
    const languages = new Set<string>();

    translations?.forEach((t: any) => {
      languages.add(t.language);
      
      if (t.key.startsWith('questions.')) {
        // Extract base question ID (without profile)
        const parts = t.key.split('.');
        const isProfileSpecific = ['agency', 'client', 'worker'].includes(parts[1]);
        const questionId = isProfileSpecific ? parts[2] : parts[1];
        uniqueQuestionKeys.add(questionId);
      } else {
        uniqueUIKeys.add(t.key);
      }
    });

    const stats = {
      questions: {
        total: uniqueQuestionKeys.size,
        validated: uniqueQuestionKeys.size, // Assuming all are validated
        progress: 100,
      },
      ui: {
        total: uniqueUIKeys.size,
        validated: uniqueUIKeys.size,
        progress: 100,
      },
      countries: languages.size,
    };

    console.log('✅ Translation stats:', stats);

    return c.json({
      success: true,
      stats,
    });

  } catch (error: any) {
    console.error('❌ Stats error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

export default app;