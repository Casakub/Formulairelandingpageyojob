/**
 * 🌍 ROUTES I18N - Version KV Store
 * 
 * Endpoints pour gérer les langues disponibles et les traductions
 * Utilise le KV store existant au lieu d'une table dédiée
 * 
 * Version: 1.0.0-kv
 * Date: 11 Décembre 2024
 */

import { Hono } from "npm:hono";
import * as kv from "./kv_store.tsx";

const app = new Hono();

/**
 * GET /available-languages
 * Get all available languages with translation stats
 */
app.get("/available-languages", async (c) => {
  try {
    // Get all translations from KV store (prefixed with "i18n:")
    const allTranslations = await kv.getByPrefix('i18n:');

    if (!allTranslations || allTranslations.length === 0) {
      console.warn('⚠️ No translations found in KV store');
      return c.json({
        success: true,
        languages: [],
        stats: {
          totalQuestions: 0,
          totalUITexts: 0,
          totalItems: 0,
        },
      });
    }

    // Parse translation keys: "i18n:fr:questions.q1_nom.label"
    const languageStats = new Map();

    allTranslations.forEach((item: any) => {
      // Key format: "i18n:LANG:path.to.key"
      const parts = item.key.split(':');
      if (parts.length < 3) return;

      const lang = parts[1];
      const translationKey = parts.slice(2).join(':');

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
      if (translationKey.startsWith('questions.')) {
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

    console.log(`✅ Found ${languages.length} languages in KV store`);

    return c.json({
      success: true,
      languages,
      stats: {
        totalQuestions: Math.max(...languages.map(l => l.questions), 0),
        totalUITexts: Math.max(...languages.map(l => l.ui), 0),
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

    // Get all translations for this language from KV store
    const prefix = `i18n:${language}:`;
    const translations = await kv.getByPrefix(prefix);

    if (!translations || translations.length === 0) {
      console.warn(`⚠️ No translations found for language: ${language}`);
      return c.json({
        success: true,
        language,
        translations: {},
        count: 0,
      });
    }

    // Convert to key-value object
    const translationsMap: Record<string, string> = {};
    translations.forEach((item: any) => {
      // Remove prefix "i18n:LANG:" to get the actual key
      const key = item.key.replace(prefix, '');
      translationsMap[key] = item.value;
    });

    console.log(`✅ Found ${translations.length} translations for ${language}`);

    return c.json({
      success: true,
      language,
      translations: translationsMap,
      count: translations.length,
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
 * GET /translations
 * Get all translations for all languages (bulk)
 */
app.get("/translations", async (c) => {
  try {
    // Get all translations from KV store
    const allTranslations = await kv.getByPrefix('i18n:');

    if (!allTranslations || allTranslations.length === 0) {
      console.warn('⚠️ No translations found in KV store');
      return c.json({
        success: true,
        translations: {},
        languages: [],
        totalTranslations: 0,
      });
    }

    // Group by language
    const translationsByLanguage: Record<string, Record<string, string>> = {};

    allTranslations.forEach((item: any) => {
      // Key format: "i18n:LANG:path.to.key"
      const parts = item.key.split(':');
      if (parts.length < 3) return;

      const lang = parts[1];
      const translationKey = parts.slice(2).join(':');

      if (!translationsByLanguage[lang]) {
        translationsByLanguage[lang] = {};
      }
      translationsByLanguage[lang][translationKey] = item.value;
    });

    console.log(`✅ Found translations for ${Object.keys(translationsByLanguage).length} languages`);

    return c.json({
      success: true,
      translations: translationsByLanguage,
      languages: Object.keys(translationsByLanguage),
      totalTranslations: allTranslations.length,
    });

  } catch (error: any) {
    console.error('❌ Bulk translations error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      details: error.message,
    }, 500);
  }
});

export default app;
