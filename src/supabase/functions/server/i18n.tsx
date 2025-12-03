import { Hono } from 'npm:hono';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

const SERVER_VERSION = '2.0.0-debug'; // Version for debugging

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Version check endpoint
app.get('/version', (c) => {
  return c.json({ 
    version: SERVER_VERSION,
    timestamp: new Date().toISOString(),
    message: 'I18N Server with detailed error messages'
  });
});

// ========== TYPES ==========
interface Translation {
  text: string;
  status: 'missing' | 'auto-mcp' | 'auto-api' | 'validated';
}

// Nouvelle structure pour les questions complètes
interface QuestionFieldTranslation {
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string; icon?: string }>;
  status: 'missing' | 'auto-mcp' | 'auto-api' | 'validated';
}

interface QuestionTranslation {
  questionId: string;
  translations: {
    [langCode: string]: QuestionFieldTranslation;
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

// POST bulk update question translations (MUST BE BEFORE /questions/:questionId)
app.post('/questions/bulk', async (c) => {
  try {
    const body = await c.req.json();
    const { translations } = body;
    
    console.log('📥 Received bulk question translations request:', { 
      count: translations?.length,
      sample: translations?.[0] ? JSON.stringify(translations[0]).substring(0, 200) : 'none'
    });
    
    if (!Array.isArray(translations)) {
      console.error('❌ Translations is not an array:', typeof translations);
      return c.json({ success: false, error: 'Invalid translations format' }, 400);
    }
    
    console.log(`✅ Validation passed. Processing ${translations.length} question translations...`);
    
    // Validate each translation object
    for (const t of translations) {
      if (!t.questionId) {
        console.error('❌ Missing questionId in:', t);
        return c.json({ success: false, error: 'Missing required field: questionId' }, 400);
      }
      if (!t.translations || typeof t.translations !== 'object') {
        console.error('❌ Invalid translations object in:', t);
        return c.json({ success: false, error: 'Missing required field: translations' }, 400);
      }
      
      // Validate each language translation has required fields
      for (const [langCode, translation] of Object.entries(t.translations)) {
        const trans = translation as any;
        if (!trans.label) {
          console.error('❌ Missing label for', t.questionId, langCode, ':', trans);
          return c.json({ 
            success: false, 
            error: `Missing label for question ${t.questionId} in language ${langCode}` 
          }, 400);
        }
        
        // Add default status if not provided
        if (!trans.status) {
          trans.status = 'validated';
        }
      }
    }
    
    console.log('✅ All validations passed, saving to KV store...');
    
    // Prepare KV store operations
    const keys: string[] = [];
    const values: any[] = [];
    
    translations.forEach((t: QuestionTranslation) => {
      keys.push(`i18n:question:${t.questionId}`);
      values.push({ translations: t.translations });
    });
    
    // Batch save to KV store
    await kv.mset(keys, values);
    
    return c.json({
      success: true,
      count: translations.length
    });
  } catch (error: any) {
    console.error('Error bulk saving question translations:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST/PUT question translation (MUST BE AFTER /questions/bulk)
app.post('/questions/:questionId', async (c) => {
  try {
    const questionId = c.req.param('questionId');
    const body = await c.req.json();
    const { langCode, text, label, placeholder, options, status } = body;
    
    // Support both 'text' (from UI) and 'label' (from import) for backwards compatibility
    const finalLabel = label || text;
    
    if (!langCode || !finalLabel) {
      return c.json({ success: false, error: 'Missing required fields (langCode and text/label)' }, 400);
    }
    
    // Get existing translations or initialize
    const existing = await kv.get(`i18n:question:${questionId}`) || { translations: {} };
    
    // Update the specific language translation - always use 'label' internally for consistency
    existing.translations[langCode] = {
      label: finalLabel,
      placeholder,
      options,
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

// POST bulk update UI text translations
// ⚠️ IMPORTANT: This route MUST be declared BEFORE /ui-texts/:textId
// Otherwise Hono will match "bulk" as a textId parameter!
app.post('/ui-texts/bulk', async (c) => {
  try {
    console.log('🎯 [UI-TEXTS-BULK] Route handler started');
    const body = await c.req.json();
    console.log('📥 Received bulk UI texts request, body keys:', Object.keys(body));
    console.log('📦 Full body:', JSON.stringify(body, null, 2));
    
    const { translations } = body;
    
    if (!translations) {
      console.error('❌ [UI-TEXTS-BULK] Missing translations field in body');
      return c.json({ success: false, error: '[UI-TEXTS-BULK] Missing translations field in request body' }, 400);
    }
    
    if (!Array.isArray(translations)) {
      console.error('❌ translations is not an array:', typeof translations);
      return c.json({ success: false, error: 'Invalid translations format' }, 400);
    }
    
    console.log(`📊 Received ${translations.length} UI text translations`);
    console.log('📝 First translation sample:', JSON.stringify(translations[0], null, 2));
    
    // Validate each translation
    for (let i = 0; i < translations.length; i++) {
      const t = translations[i];
      if (!t.textId || !t.key || !t.category || !t.translations) {
        console.error(`❌ Invalid translation at index ${i}:`, t);
        const missingFields = [];
        if (!t.textId) missingFields.push('textId');
        if (!t.key) missingFields.push('key');
        if (!t.category) missingFields.push('category');
        if (!t.translations) missingFields.push('translations');
        
        console.error(`  - textId: ${t.textId}`);
        console.error(`  - key: ${t.key}`);
        console.error(`  - category: ${t.category}`);
        console.error(`  - translations: ${t.translations ? 'present' : 'MISSING'}`);
        return c.json({ 
          success: false, 
          error: `[UI-TEXTS-BULK] UIText at index ${i} is missing fields: ${missingFields.join(', ')}`
        }, 400);
      }
    }
    
    // Prepare KV store operations
    const keys: string[] = [];
    const values: any[] = [];
    
    translations.forEach((t: UITextTranslation) => {
      keys.push(`i18n:ui:${t.textId}`);
      values.push({
        key: t.key,
        category: t.category,
        translations: t.translations
      });
    });
    
    // Batch save to KV store
    await kv.mset(keys, values);
    
    return c.json({
      success: true,
      count: translations.length
    });
  } catch (error: any) {
    console.error('Error bulk saving UI text translations:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST/PUT UI text translation (single)
// ⚠️ IMPORTANT: This route MUST be declared AFTER /ui-texts/bulk
app.post('/ui-texts/:textId', async (c) => {
  try {
    const textId = c.req.param('textId');
    const body = await c.req.json();
    const { langCode, text, status, key, category } = body;
    
    if (!langCode || !text) {
      return c.json({ success: false, error: '[UI-TEXT-SINGLE] Missing required fields (langCode or text)' }, 400);
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

// POST bulk update country-language mappings (MUST BE BEFORE /:countryCode)
app.post('/country-languages/bulk', async (c) => {
  try {
    const rawBody = await c.req.text();
    console.log('📥 RAW BODY:', rawBody.substring(0, 500));
    
    const body = JSON.parse(rawBody);
    const { mappings } = body;
    
    console.log('📥 Received bulk country-language mappings request:', {
      count: mappings?.length,
      sample: mappings?.[0],
      sampleType: typeof mappings?.[0],
      sampleLanguagesType: Array.isArray(mappings?.[0]?.languages) ? 'array' : typeof mappings?.[0]?.languages
    });
    
    if (!Array.isArray(mappings)) {
      return c.json({ success: false, error: 'Invalid mappings format' }, 400);
    }
    
    // Validate each mapping object
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];
      console.log(`🔍 Validating mapping ${i}:`, JSON.stringify(m));
      console.log(`  - countryCode: "${m.countryCode}" (type: ${typeof m.countryCode})`);
      console.log(`  - languages:`, m.languages);
      console.log(`  - languages type: ${typeof m.languages}`);
      console.log(`  - languages isArray: ${Array.isArray(m.languages)}`);
      
      if (!m.countryCode) {
        console.error('❌ Missing countryCode in:', m);
        return c.json({ success: false, error: 'Missing required field: countryCode' }, 400);
      }
      if (!Array.isArray(m.languages)) {
        console.error('❌ Languages is not an array in:', m);
        console.error('❌ Full mapping object:', JSON.stringify(m, null, 2));
        return c.json({ success: false, error: `Languages must be an array (mapping ${i}, country: ${m.countryCode})` }, 400);
      }
      
      // Early exit for testing - stop after first mapping
      if (i === 0) {
        console.log('✅ First mapping validated successfully!');
      }
    }
    
    // Prepare KV store operations
    const keys: string[] = [];
    const values: any[] = [];
    
    mappings.forEach((m: CountryLanguageMapping) => {
      keys.push(`i18n:country:${m.countryCode}`);
      values.push({ languages: m.languages });
    });
    
    // Batch save to KV store
    await kv.mset(keys, values);
    
    return c.json({
      success: true,
      count: mappings.length
    });
  } catch (error: any) {
    console.error('Error bulk saving country-language mappings:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST/PUT country-language mapping (MUST BE AFTER /bulk)
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

// ========== TRANSLATION UTILITIES ==========

// GET available languages with completion stats
app.get('/available-languages', async (c) => {
  try {
    // Get all question translations
    const questionTranslations = await kv.getByPrefix('i18n:question:');
    const totalQuestions = questionTranslations.length;
    
    // Get all UI text translations
    const uiTranslations = await kv.getByPrefix('i18n:ui:');
    const totalUITexts = uiTranslations.length;
    
    const totalItems = totalQuestions + totalUITexts;
    
    // Count translations per language
    const languageStats: Record<string, { count: number; questions: number; ui: number }> = {};
    
    // Count question translations
    questionTranslations.forEach((item: any) => {
      if (item.value.translations) {
        Object.keys(item.value.translations).forEach((lang) => {
          if (!languageStats[lang]) {
            languageStats[lang] = { count: 0, questions: 0, ui: 0 };
          }
          if (item.value.translations[lang]?.label) {
            languageStats[lang].count++;
            languageStats[lang].questions++;
          }
        });
      }
    });
    
    // Count UI text translations
    uiTranslations.forEach((item: any) => {
      if (item.value.translations) {
        Object.keys(item.value.translations).forEach((lang) => {
          if (!languageStats[lang]) {
            languageStats[lang] = { count: 0, questions: 0, ui: 0 };
          }
          if (item.value.translations[lang]?.text) {
            languageStats[lang].count++;
            languageStats[lang].ui++;
          }
        });
      }
    });
    
    // Build response with completion percentage
    const languages = Object.entries(languageStats).map(([code, stats]) => ({
      code,
      totalTranslations: stats.count,
      questions: stats.questions,
      ui: stats.ui,
      completion: totalItems > 0 ? Math.round((stats.count / totalItems) * 100) : 0
    }))
    .filter(lang => lang.totalTranslations > 0) // Only languages with at least 1 translation
    .sort((a, b) => b.completion - a.completion); // Sort by completion DESC
    
    return c.json({
      success: true,
      languages,
      stats: {
        totalQuestions,
        totalUITexts,
        totalItems
      }
    });
  } catch (error: any) {
    console.error('Error fetching available languages:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET translation by language for frontend
app.get('/translate/:lang', async (c) => {
  try {
    const lang = c.req.param('lang');
    
    // Get all question translations - return FULL translation object (label, placeholder, options)
    const questionTranslations = await kv.getByPrefix('i18n:question:');
    const questions: Record<string, any> = {};
    
    questionTranslations.forEach((item: any) => {
      const questionId = item.key.replace('i18n:question:', '');
      const translation = item.value.translations?.[lang];
      if (translation?.label) {
        // Return full translation object with label, placeholder, options, status
        questions[questionId] = {
          label: translation.label,
          placeholder: translation.placeholder || '',
          options: translation.options || [],
          status: translation.status || 'missing'
        };
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
    const { 
      sourceText, 
      sourceLang, 
      targetLang, 
      method,
      mcpSettings = {} // Optional MCP settings from frontend
    } = body;
    
    if (!sourceText || !targetLang || !method) {
      return c.json({ success: false, error: '[AUTO-TRANSLATE] Missing required fields (sourceText, targetLang, or method)' }, 400);
    }
    
    let translatedText = '';
    
    if (method === 'mcp') {
      // Get API Key from environment
      const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
      
      if (!apiKey) {
        return c.json({
          success: false,
          error: 'ANTHROPIC_API_KEY not configured. Please add your API key in Supabase environment variables.',
          needsApiKey: true
        }, 500);
      }
      
      // Extract MCP settings with defaults
      const {
        model = 'claude-3-5-sonnet-20241022',
        temperature = 0.3,
        maxTokens = 1000,
        preserveFormatting = true,
        customPrompt = '',
        contextWindow = []
      } = mcpSettings;
      
      // Build prompt for translation
      let prompt = `Tu es un traducteur professionnel spécialisé dans les contenus RH et recrutement.

**TÂCHE :** Traduis le texte suivant du ${getLanguageName(sourceLang)} vers le ${getLanguageName(targetLang)}.

**TEXTE À TRADUIRE :**
"${sourceText}"`;

      // Add context if provided
      if (contextWindow && contextWindow.length > 0) {
        prompt += `\n\n**CONTEXTE (traductions précédentes pour cohérence terminologique) :**\n`;
        contextWindow.forEach((ctx: any, idx: number) => {
          prompt += `${idx + 1}. "${ctx.source}" → "${ctx.target}"\n`;
        });
      }

      // Add formatting instruction
      if (preserveFormatting) {
        prompt += `\n**IMPORTANT :** Préserve exactement la structure, ponctuation et formatage du texte original.`;
      }

      // Add custom instructions if provided
      if (customPrompt) {
        prompt += `\n\n**INSTRUCTIONS ADDITIONNELLES :**\n${customPrompt}`;
      }

      prompt += `\n\n**RÈGLES :**
1. Traduis UNIQUEMENT le texte, sans ajouter d'explications
2. Utilise un vocabulaire professionnel adapté au recrutement européen
3. Adapte les expressions idiomatiques au contexte local
4. Maintiens le même niveau de formalité que l'original
5. Réponds UNIQUEMENT avec la traduction, rien d'autre

**TRADUCTION (${getLanguageName(targetLang)}) :**`;

      console.log('🤖 Calling Claude API for translation:', {
        model,
        temperature,
        maxTokens,
        sourceLang,
        targetLang,
        textLength: sourceText.length
      });

      // Call Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          temperature,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Claude API Error:', errorText);
        
        // Parse error for user-friendly message
        let userMessage = `Claude API error: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.message?.includes('credit balance')) {
            userMessage = '💳 Solde de crédits Anthropic insuffisant. Rechargez votre compte sur console.anthropic.com';
          } else if (errorData.error?.message?.includes('Invalid API Key')) {
            userMessage = '🔑 Clé API invalide. Vérifiez ANTHROPIC_API_KEY dans les variables d\'environnement Supabase.';
          } else if (errorData.error?.type === 'rate_limit_error') {
            userMessage = '⏱️ Limite de requêtes atteinte. Réessayez dans quelques instants.';
          } else {
            userMessage = errorData.error?.message || errorText;
          }
        } catch {
          // Keep generic message
        }
        
        return c.json({
          success: false,
          error: userMessage,
          details: errorText
        }, response.status);
      }

      const result = await response.json();
      translatedText = result.content[0].text.trim();
      
      // Remove quotes if Claude added them
      if (translatedText.startsWith('"') && translatedText.endsWith('"')) {
        translatedText = translatedText.slice(1, -1);
      }
      
      console.log('✅ Translation successful:', {
        inputLength: sourceText.length,
        outputLength: translatedText.length,
        usage: result.usage
      });
      
    } else if (method === 'api') {
      // Placeholder for external API (DeepL, Google Translate, etc.)
      // This will be implemented in Sprint 2 when API provider is chosen
      translatedText = `[API-TODO] ${sourceText}`;
      console.log('⚠️ External API translation not yet implemented');
    } else {
      return c.json({ 
        success: false, 
        error: 'Invalid method. Use "mcp" or "api"' 
      }, 400);
    }
    
    return c.json({
      success: true,
      translation: {
        sourceText,
        sourceLang,
        targetLang,
        translatedText,
        method,
        status: method === 'mcp' ? 'auto-mcp' : 'auto-api'
      }
    });
  } catch (error: any) {
    console.error('❌ Error auto-translating:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, 500);
  }
});

// POST auto-translate BATCH - Translate to multiple languages AND store automatically
app.post('/auto-translate-batch', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      textId,
      sourceText, 
      sourceLanguage = 'fr',
      targetLanguages = [], // Array of language codes ['en', 'de', 'es', ...]
      category = 'ui', // 'ui' or 'question'
      autoStore = true // Automatically store translations
    } = body;
    
    if (!textId || !sourceText || !targetLanguages || targetLanguages.length === 0) {
      return c.json({ 
        success: false, 
        error: '[AUTO-TRANSLATE-BATCH] Missing required fields: textId, sourceText, or targetLanguages' 
      }, 400);
    }
    
    // Get API Key
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) {
      return c.json({
        success: false,
        error: 'ANTHROPIC_API_KEY not configured in environment variables',
        needsApiKey: true
      }, 500);
    }
    
    console.log(`🚀 [AUTO-TRANSLATE-BATCH] Starting batch translation for ${textId}:`, {
      sourceLanguage,
      targetLanguages,
      targetCount: targetLanguages.length
    });
    
    const results = {
      textId,
      sourceText,
      sourceLanguage,
      successful: [] as any[],
      failed: [] as any[],
      stored: autoStore
    };
    
    // Translate to each target language
    for (const targetLang of targetLanguages) {
      try {
        console.log(`  🔄 Translating ${textId} to ${targetLang}...`);
        
        // Build prompt
        const prompt = `Tu es un traducteur professionnel spécialisé dans les contenus RH et recrutement européen.

**TÂCHE :** Traduis le texte suivant du ${getLanguageName(sourceLanguage)} vers le ${getLanguageName(targetLang)}.

**TEXTE À TRADUIRE :**
"${sourceText}"

**CONTEXTE :** Ce texte fait partie d'un formulaire d'étude de marché destiné aux agences de travail temporaire européennes.

**RÈGLES :**
1. Traduis UNIQUEMENT le texte, sans ajouter d'explications
2. Utilise un vocabulaire professionnel adapté au recrutement européen
3. Adapte les expressions au contexte culturel local
4. Maintiens le même niveau de formalité que l'original
5. Préserve exactement la structure et la ponctuation
6. Réponds UNIQUEMENT avec la traduction, rien d'autre

**TRADUCTION (${getLanguageName(targetLang)}) :**`;

        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            temperature: 0.3,
            messages: [{
              role: 'user',
              content: prompt
            }]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`  ❌ Failed to translate to ${targetLang}:`, errorText);
          
          results.failed.push({
            language: targetLang,
            error: `API error: ${response.status}`
          });
          continue;
        }

        const result = await response.json();
        let translatedText = result.content[0].text.trim();
        
        // Remove quotes if Claude added them
        if (translatedText.startsWith('"') && translatedText.endsWith('"')) {
          translatedText = translatedText.slice(1, -1);
        }
        
        console.log(`  ✅ Translated to ${targetLang}: "${translatedText.substring(0, 50)}..."`);
        
        results.successful.push({
          language: targetLang,
          translatedText,
          usage: result.usage
        });
        
        // Store translation if autoStore is enabled
        if (autoStore) {
          try {
            const key = category === 'question' 
              ? `i18n:question:${textId}`
              : `i18n:ui:${textId}`;
            
            // Fetch existing data
            const existing = await kv.get(key) || {};
            
            // Update with new translation
            const updatedData = {
              ...existing,
              textId,
              key: textId,
              category,
              translations: {
                ...(existing.translations || {}),
                [targetLang]: {
                  text: translatedText,
                  status: 'auto-mcp'
                }
              }
            };
            
            // Store back
            await kv.set(key, updatedData);
            console.log(`  💾 Stored translation for ${targetLang}`);
            
          } catch (storeError: any) {
            console.error(`  ⚠️ Failed to store ${targetLang}:`, storeError.message);
            // Don't fail the whole operation if storage fails
          }
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error: any) {
        console.error(`  ❌ Error translating to ${targetLang}:`, error);
        results.failed.push({
          language: targetLang,
          error: error.message
        });
      }
    }
    
    const successRate = (results.successful.length / targetLanguages.length) * 100;
    
    console.log(`✅ [AUTO-TRANSLATE-BATCH] Completed for ${textId}:`, {
      successful: results.successful.length,
      failed: results.failed.length,
      successRate: `${successRate.toFixed(0)}%`
    });
    
    return c.json({
      success: results.failed.length === 0,
      message: `Translated to ${results.successful.length}/${targetLanguages.length} languages`,
      results,
      stats: {
        total: targetLanguages.length,
        successful: results.successful.length,
        failed: results.failed.length,
        successRate: successRate.toFixed(1)
      }
    });
    
  } catch (error: any) {
    console.error('❌ [AUTO-TRANSLATE-BATCH] Fatal error:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, 500);
  }
});

// Helper function to get language names
function getLanguageName(code: string): string {
  const names: Record<string, string> = {
    'fr': 'français',
    'en': 'anglais',
    'de': 'allemand',
    'es': 'espagnol',
    'it': 'italien',
    'pt': 'portugais',
    'nl': 'néerlandais',
    'pl': 'polonais',
    'ro': 'roumain',
    'cs': 'tchèque',
    'hu': 'hongrois',
    'bg': 'bulgare',
    'sv': 'suédois',
    'da': 'danois',
    'fi': 'finnois',
    'no': 'norvégien',
    'sk': 'slovaque',
    'sl': 'slovène',
    'hr': 'croate',
    'lt': 'lituanien',
    'lv': 'letton',
    'et': 'estonien',
    'el': 'grec',
    'mt': 'maltais',
    'ga': 'irlandais'
  };
  return names[code] || code;
}

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

// ========== CMS ROUTES ==========

// GET translations by category (for CMS editor)
app.get('/translations', async (c) => {
  try {
    const category = c.req.query('category');
    
    // If no category, return ALL translations (questions + UI) in the new format
    if (!category) {
      const questionTranslations = await kv.getByPrefix('i18n:question:');
      const uiTextTranslations = await kv.getByPrefix('i18n:ui:');
      
      return c.json({
        success: true,
        questionTranslations: questionTranslations.map((item: any) => ({
          textId: item.key.replace('i18n:question:', ''),
          category: 'question',
          translations: item.value.translations || {}
        })),
        uiTextTranslations: uiTextTranslations.map((item: any) => ({
          textId: item.key.replace('i18n:ui:', ''),
          category: item.value.category || 'ui',
          translations: item.value.translations || {}
        }))
      });
    }
    
    // If category is provided, return filtered UI translations in flat format (for CMS editor)
    const uiTranslations = await kv.getByPrefix('i18n:ui:');
    const translations: any[] = [];
    
    uiTranslations.forEach((item: any) => {
      if (item.value.category === category) {
        const textId = item.key.replace('i18n:ui:', '');
        
        // Transform from KV format to flat structure
        Object.entries(item.value.translations || {}).forEach(([langCode, trans]: [string, any]) => {
          translations.push({
            text_id: textId,
            language_code: langCode,
            text_content: trans.text || '',
            category: item.value.category,
            validation_status: trans.status || 'validated'
          });
        });
      }
    });
    
    return c.json({
      success: true,
      translations
    });
  } catch (error: any) {
    console.error('Error fetching translations by category:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST update single translation (for CMS editor)
app.post('/translations/update', async (c) => {
  try {
    const body = await c.req.json();
    const { textId, languageCode, textContent } = body;
    
    console.log('🔄 Updating translation:', { textId, languageCode, textContentLength: textContent?.length });
    
    if (!textId || !languageCode || textContent === undefined) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: textId, languageCode, textContent' 
      }, 400);
    }
    
    // Get existing UI text data
    const existing = await kv.get(`i18n:ui:${textId}`);
    
    if (!existing) {
      return c.json({ 
        success: false, 
        error: `Text ID "${textId}" not found` 
      }, 404);
    }
    
    // Update the specific language translation
    if (!existing.translations) {
      existing.translations = {};
    }
    
    existing.translations[languageCode] = {
      text: textContent,
      status: 'validated'
    };
    
    // Save back to KV store
    await kv.set(`i18n:ui:${textId}`, existing);
    
    console.log('✅ Translation updated successfully');
    
    return c.json({
      success: true,
      translation: {
        text_id: textId,
        language_code: languageCode,
        text_content: textContent,
        category: existing.category,
        validation_status: 'validated'
      }
    });
  } catch (error: any) {
    console.error('Error updating translation:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default app;