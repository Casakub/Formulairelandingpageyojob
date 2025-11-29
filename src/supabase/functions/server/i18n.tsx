import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// ========== TYPES ==========
interface Translation {
  text: string;
  status: 'missing' | 'auto-mcp' | 'auto-api' | 'validated';
}

interface QuestionTranslation {
  questionId: string;
  translations: {
    [langCode: string]: Translation;
  };
}

interface UITextTranslation {
  textId: string;
  key: string;
  category: string;
  translations: {
    [langCode: string]: Translation;
  };
}

interface CountryLanguageMapping {
  countryCode: string;
  languages: string[];
}

// ========== QUESTION TRANSLATIONS ==========

// GET all question translations
app.get('/questions', async (c) => {
  try {
    const translations = await kv.getByPrefix('i18n:question:');
    
    return c.json({
      success: true,
      translations: translations.map((item: any) => ({
        questionId: item.key.replace('i18n:question:', ''),
        ...item.value
      }))
    });
  } catch (error: any) {
    console.error('Error fetching question translations:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET single question translation
app.get('/questions/:questionId', async (c) => {
  try {
    const questionId = c.req.param('questionId');
    const translation = await kv.get(`i18n:question:${questionId}`);
    
    if (!translation) {
      return c.json({ success: false, error: 'Translation not found' }, 404);
    }
    
    return c.json({
      success: true,
      translation: {
        questionId,
        ...translation
      }
    });
  } catch (error: any) {
    console.error('Error fetching question translation:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST/PUT question translation
app.post('/questions/:questionId', async (c) => {
  try {
    const questionId = c.req.param('questionId');
    const body = await c.req.json();
    const { langCode, text, status } = body;
    
    if (!langCode || !text) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }
    
    // Get existing translations or initialize
    const existing = await kv.get(`i18n:question:${questionId}`) || { translations: {} };
    
    // Update the specific language translation
    existing.translations[langCode] = {
      text,
      status: status || 'validated'
    };
    
    // Save back to KV store
    await kv.set(`i18n:question:${questionId}`, existing);
    
    return c.json({
      success: true,
      translation: {
        questionId,
        ...existing
      }
    });
  } catch (error: any) {
    console.error('Error saving question translation:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST bulk update question translations
app.post('/questions/bulk', async (c) => {
  try {
    const body = await c.req.json();
    const { translations } = body;
    
    if (!Array.isArray(translations)) {
      return c.json({ success: false, error: 'Invalid translations format' }, 400);
    }
    
    // Prepare KV store operations
    const kvOperations: Record<string, any> = {};
    
    translations.forEach((t: QuestionTranslation) => {
      kvOperations[`i18n:question:${t.questionId}`] = {
        translations: t.translations
      };
    });
    
    // Batch save to KV store
    await kv.mset(kvOperations);
    
    return c.json({
      success: true,
      count: translations.length
    });
  } catch (error: any) {
    console.error('Error bulk saving question translations:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========== UI TEXT TRANSLATIONS ==========

// GET all UI text translations
app.get('/ui-texts', async (c) => {
  try {
    const translations = await kv.getByPrefix('i18n:ui:');
    
    return c.json({
      success: true,
      translations: translations.map((item: any) => ({
        textId: item.key.replace('i18n:ui:', ''),
        ...item.value
      }))
    });
  } catch (error: any) {
    console.error('Error fetching UI text translations:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST/PUT UI text translation
app.post('/ui-texts/:textId', async (c) => {
  try {
    const textId = c.req.param('textId');
    const body = await c.req.json();
    const { langCode, text, status, key, category } = body;
    
    if (!langCode || !text) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }
    
    // Get existing translations or initialize
    const existing = await kv.get(`i18n:ui:${textId}`) || { 
      key: key || textId,
      category: category || 'general',
      translations: {} 
    };
    
    // Update the specific language translation
    existing.translations[langCode] = {
      text,
      status: status || 'validated'
    };
    
    // Save back to KV store
    await kv.set(`i18n:ui:${textId}`, existing);
    
    return c.json({
      success: true,
      translation: {
        textId,
        ...existing
      }
    });
  } catch (error: any) {
    console.error('Error saving UI text translation:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST bulk update UI text translations
app.post('/ui-texts/bulk', async (c) => {
  try {
    const body = await c.req.json();
    const { translations } = body;
    
    if (!Array.isArray(translations)) {
      return c.json({ success: false, error: 'Invalid translations format' }, 400);
    }
    
    // Prepare KV store operations
    const kvOperations: Record<string, any> = {};
    
    translations.forEach((t: UITextTranslation) => {
      kvOperations[`i18n:ui:${t.textId}`] = {
        key: t.key,
        category: t.category,
        translations: t.translations
      };
    });
    
    // Batch save to KV store
    await kv.mset(kvOperations);
    
    return c.json({
      success: true,
      count: translations.length
    });
  } catch (error: any) {
    console.error('Error bulk saving UI text translations:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========== COUNTRY LANGUAGE MAPPINGS ==========

// GET all country-language mappings
app.get('/country-languages', async (c) => {
  try {
    const mappings = await kv.getByPrefix('i18n:country:');
    
    return c.json({
      success: true,
      mappings: mappings.map((item: any) => ({
        countryCode: item.key.replace('i18n:country:', ''),
        languages: item.value.languages
      }))
    });
  } catch (error: any) {
    console.error('Error fetching country-language mappings:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST/PUT country-language mapping
app.post('/country-languages/:countryCode', async (c) => {
  try {
    const countryCode = c.req.param('countryCode');
    const body = await c.req.json();
    const { languages } = body;
    
    if (!Array.isArray(languages)) {
      return c.json({ success: false, error: 'Languages must be an array' }, 400);
    }
    
    // Save to KV store
    await kv.set(`i18n:country:${countryCode}`, { languages });
    
    return c.json({
      success: true,
      mapping: {
        countryCode,
        languages
      }
    });
  } catch (error: any) {
    console.error('Error saving country-language mapping:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST bulk update country-language mappings
app.post('/country-languages/bulk', async (c) => {
  try {
    const body = await c.req.json();
    const { mappings } = body;
    
    if (!Array.isArray(mappings)) {
      return c.json({ success: false, error: 'Invalid mappings format' }, 400);
    }
    
    // Prepare KV store operations
    const kvOperations: Record<string, any> = {};
    
    mappings.forEach((m: CountryLanguageMapping) => {
      kvOperations[`i18n:country:${m.countryCode}`] = {
        languages: m.languages
      };
    });
    
    // Batch save to KV store
    await kv.mset(kvOperations);
    
    return c.json({
      success: true,
      count: mappings.length
    });
  } catch (error: any) {
    console.error('Error bulk saving country-language mappings:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ========== TRANSLATION UTILITIES ==========

// GET translation by language for frontend
app.get('/translate/:lang', async (c) => {
  try {
    const lang = c.req.param('lang');
    
    // Get all question translations
    const questionTranslations = await kv.getByPrefix('i18n:question:');
    const questions: Record<string, string> = {};
    
    questionTranslations.forEach((item: any) => {
      const questionId = item.key.replace('i18n:question:', '');
      const translation = item.value.translations?.[lang];
      if (translation?.text) {
        questions[questionId] = translation.text;
      }
    });
    
    // Get all UI text translations
    const uiTranslations = await kv.getByPrefix('i18n:ui:');
    const ui: Record<string, string> = {};
    
    uiTranslations.forEach((item: any) => {
      const uiKey = item.value.key;
      const translation = item.value.translations?.[lang];
      if (translation?.text) {
        ui[uiKey] = translation.text;
      }
    });
    
    return c.json({
      success: true,
      lang,
      translations: {
        questions,
        ui
      }
    });
  } catch (error: any) {
    console.error('Error fetching translations for language:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST auto-translate via MCP/API
app.post('/auto-translate', async (c) => {
  try {
    const body = await c.req.json();
    const { sourceText, sourceLang, targetLang, method } = body;
    
    if (!sourceText || !targetLang || !method) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }
    
    // Here you would call MCP or external API
    // For now, we'll return a mock translation
    const translatedText = `[${method.toUpperCase()}] ${sourceText}`;
    
    return c.json({
      success: true,
      translation: {
        sourceText,
        targetLang,
        translatedText,
        method,
        status: method === 'mcp' ? 'auto-mcp' : 'auto-api'
      }
    });
  } catch (error: any) {
    console.error('Error auto-translating:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Export stats
app.get('/stats', async (c) => {
  try {
    const questionTranslations = await kv.getByPrefix('i18n:question:');
    const uiTranslations = await kv.getByPrefix('i18n:ui:');
    const countryMappings = await kv.getByPrefix('i18n:country:');
    
    // Calculate stats
    let totalQuestionTranslations = 0;
    let validatedQuestionTranslations = 0;
    
    questionTranslations.forEach((item: any) => {
      Object.values(item.value.translations || {}).forEach((t: any) => {
        totalQuestionTranslations++;
        if (t.status === 'validated') {
          validatedQuestionTranslations++;
        }
      });
    });
    
    let totalUITranslations = 0;
    let validatedUITranslations = 0;
    
    uiTranslations.forEach((item: any) => {
      Object.values(item.value.translations || {}).forEach((t: any) => {
        totalUITranslations++;
        if (t.status === 'validated') {
          validatedUITranslations++;
        }
      });
    });
    
    return c.json({
      success: true,
      stats: {
        questions: {
          total: totalQuestionTranslations,
          validated: validatedQuestionTranslations,
          progress: totalQuestionTranslations > 0 
            ? Math.round((validatedQuestionTranslations / totalQuestionTranslations) * 100) 
            : 0
        },
        ui: {
          total: totalUITranslations,
          validated: validatedUITranslations,
          progress: totalUITranslations > 0 
            ? Math.round((validatedUITranslations / totalUITranslations) * 100) 
            : 0
        },
        countries: countryMappings.length
      }
    });
  } catch (error: any) {
    console.error('Error fetching i18n stats:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default app;
