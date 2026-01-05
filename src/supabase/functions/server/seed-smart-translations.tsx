/**
 * 🤖 API SMART SEED - GÉNÉRATION INTELLIGENTE DES TRADUCTIONS
 * 
 * Utilise Claude AI pour générer automatiquement toutes les traductions
 * manquantes dans 22 langues européennes à partir de la configuration.
 */

import { Hono } from 'npm:hono';
import Anthropic from 'npm:@anthropic-ai/sdk@0.32.1';
import * as kv from './kv_store.tsx';

const app = new Hono();

const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
});

interface Question {
  id: string;
  labelFallback: string;
  placeholderFallback?: string;
  descriptionFallback?: string;
  options?: Array<{
    value: string;
    labelFallback: string;
  }>;
}

interface SeedRequest {
  questions: Question[];
  languages: string[];
  mode: 'create-missing' | 'overwrite-all';
}

const LANGUAGE_NAMES: Record<string, string> = {
  fr: 'French',
  en: 'English',
  de: 'German',
  es: 'Spanish',
  it: 'Italian',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  bg: 'Bulgarian',
  cs: 'Czech',
  sk: 'Slovak',
  sl: 'Slovenian',
  hr: 'Croatian',
  hu: 'Hungarian',
  el: 'Greek',
  lt: 'Lithuanian',
  lv: 'Latvian',
  et: 'Estonian',
  fi: 'Finnish',
  sv: 'Swedish',
  da: 'Danish',
};

/**
 * POST /seed/smart-translations
 * Génère intelligemment toutes les traductions manquantes
 */
app.post('/', async (c) => {
  try {
    const body: SeedRequest = await c.req.json();
    const { questions, languages, mode = 'create-missing' } = body;

    console.log(`🤖 [SmartSeed] Starting translation generation for ${questions.length} questions in ${languages.length} languages`);

    let created = 0;
    let updated = 0;
    let skipped = 0;
    const errors: string[] = [];

    // Traiter par batch de 5 questions pour optimiser les appels API
    const BATCH_SIZE = 5;
    
    for (let i = 0; i < questions.length; i += BATCH_SIZE) {
      const batch = questions.slice(i, Math.min(i + BATCH_SIZE, questions.length));
      
      console.log(`📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(questions.length / BATCH_SIZE)}`);

      for (const question of batch) {
        try {
          // Vérifier les traductions existantes
          const existingKey = `i18n:question:${question.id}`;
          const existing: any = await kv.get(existingKey);

          const existingTranslations = existing?.translations || {};

          // Déterminer les langues à traduire
          const languagesToTranslate: string[] = [];

          if (mode === 'overwrite-all') {
            languagesToTranslate.push(...languages.filter(lang => lang !== 'fr'));
          } else {
            // create-missing : ne traduire que les langues manquantes
            for (const lang of languages) {
              if (lang === 'fr') continue; // FR est déjà dans labelFallback
              
              const hasTranslation = existingTranslations[lang]?.label;
              if (!hasTranslation) {
                languagesToTranslate.push(lang);
              }
            }
          }

          if (languagesToTranslate.length === 0) {
            console.log(`⏭️ Skipping ${question.id} - all translations exist`);
            skipped++;
            continue;
          }

          console.log(`🔄 Translating ${question.id} to ${languagesToTranslate.length} languages:`, languagesToTranslate);

          // Préparer le prompt pour Claude
          const translationPrompt = buildTranslationPrompt(question, languagesToTranslate);

          // Appeler Claude pour traduire
          const translations = await translateWithClaude(translationPrompt, question, languagesToTranslate);

          // Construire l'objet de traductions complet
          const updatedTranslations: any = { ...existingTranslations };

          // Ajouter FR si pas déjà présent
          if (!updatedTranslations.fr) {
            updatedTranslations.fr = {
              label: question.labelFallback,
              placeholder: question.placeholderFallback || '',
              description: question.descriptionFallback || '',
              status: 'validated'
            };
          }

          // Ajouter les nouvelles traductions
          for (const [lang, translation] of Object.entries(translations)) {
            updatedTranslations[lang] = {
              ...translation,
              status: 'auto-generated',
              generatedAt: new Date().toISOString()
            };
          }

          // Sauvegarder dans le KV store
          await kv.set(existingKey, {
            questionId: question.id,
            translations: updatedTranslations,
            lastUpdated: new Date().toISOString()
          });

          if (existing) {
            updated++;
            console.log(`✅ Updated ${question.id} with ${languagesToTranslate.length} new translations`);
          } else {
            created++;
            console.log(`✨ Created ${question.id} with ${Object.keys(updatedTranslations).length} translations`);
          }

          // Traiter les options si présentes
          if (question.options && question.options.length > 0) {
            for (const option of question.options) {
              const optionKey = `i18n:question:${question.id}.options.${option.value}`;
              const existingOption: any = await kv.get(optionKey);
              const existingOptionTranslations = existingOption?.translations || {};

              const optionLanguagesToTranslate = languagesToTranslate.filter(lang => {
                return mode === 'overwrite-all' || !existingOptionTranslations[lang]?.label;
              });

              if (optionLanguagesToTranslate.length === 0) {
                continue;
              }

              const optionTranslations = await translateOptionWithClaude(
                option.labelFallback,
                optionLanguagesToTranslate,
                question.labelFallback // Context
              );

              const updatedOptionTranslations: any = { ...existingOptionTranslations };

              if (!updatedOptionTranslations.fr) {
                updatedOptionTranslations.fr = {
                  label: option.labelFallback,
                  status: 'validated'
                };
              }

              for (const [lang, label] of Object.entries(optionTranslations)) {
                updatedOptionTranslations[lang] = {
                  label,
                  status: 'auto-generated',
                  generatedAt: new Date().toISOString()
                };
              }

              await kv.set(optionKey, {
                questionId: question.id,
                optionValue: option.value,
                translations: updatedOptionTranslations,
                lastUpdated: new Date().toISOString()
              });

              console.log(`  ✅ Translated option "${option.value}" to ${optionLanguagesToTranslate.length} languages`);
            }
          }

        } catch (error: any) {
          console.error(`❌ Error processing question ${question.id}:`, error);
          errors.push(`${question.id}: ${error.message}`);
        }
      }

      // Petit délai entre les batches pour éviter de surcharger l'API
      if (i + BATCH_SIZE < questions.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    const result = {
      success: true,
      totalQuestions: questions.length,
      totalTranslations: created + updated,
      created,
      updated,
      skipped,
      errors,
      timestamp: new Date().toISOString()
    };

    console.log('✅ [SmartSeed] Translation generation complete:', result);

    return c.json(result);

  } catch (error: any) {
    console.error('❌ [SmartSeed] Fatal error:', error);
    return c.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, 500);
  }
});

/**
 * Construit le prompt pour Claude
 */
function buildTranslationPrompt(question: Question, languages: string[]): string {
  const languageList = languages.map(lang => LANGUAGE_NAMES[lang]).join(', ');
  
  return `You are a professional translator specializing in recruitment and temporary work industry terminology.

Context: This is a market research survey for YOJOB, a European recruitment brokerage company with 500+ partner agencies across 27 countries.

Original text (French):
- Label: "${question.labelFallback}"
${question.placeholderFallback ? `- Placeholder: "${question.placeholderFallback}"` : ''}
${question.descriptionFallback ? `- Description: "${question.descriptionFallback}"` : ''}

Please translate this into: ${languageList}

Requirements:
- Professional tone, suitable for business surveys
- Use recruitment/temporary work industry terminology
- Keep the meaning precise and clear
- Maintain formality level of the original

Return ONLY a valid JSON object with this structure (no markdown, no explanation):
{
  "en": { "label": "...", "placeholder": "...", "description": "..." },
  "de": { "label": "...", "placeholder": "...", "description": "..." }
}

Only include the languages requested: ${languages.join(', ')}`;
}

/**
 * Traduit une question avec Claude
 */
async function translateWithClaude(
  prompt: string,
  question: Question,
  languages: string[]
): Promise<Record<string, any>> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    // Parser la réponse JSON
    const translations = JSON.parse(responseText);

    return translations;

  } catch (error: any) {
    console.error('❌ Claude translation error:', error);
    
    // Fallback : créer des traductions avec préfixe
    const fallbackTranslations: Record<string, any> = {};
    for (const lang of languages) {
      fallbackTranslations[lang] = {
        label: `[${lang.toUpperCase()}] ${question.labelFallback}`,
        placeholder: question.placeholderFallback ? `[${lang.toUpperCase()}] ${question.placeholderFallback}` : '',
        description: question.descriptionFallback ? `[${lang.toUpperCase()}] ${question.descriptionFallback}` : ''
      };
    }
    return fallbackTranslations;
  }
}

/**
 * Traduit une option avec Claude
 */
async function translateOptionWithClaude(
  label: string,
  languages: string[],
  context: string
): Promise<Record<string, string>> {
  try {
    const languageList = languages.map(lang => LANGUAGE_NAMES[lang]).join(', ');
    
    const prompt = `Translate this survey option in the context of recruitment/temporary work industry:

Context question: "${context}"
Option to translate (French): "${label}"

Translate to: ${languageList}

Return ONLY a valid JSON object (no markdown):
{
  "en": "...",
  "de": "..."
}

Only include: ${languages.join(', ')}`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    return JSON.parse(responseText);

  } catch (error: any) {
    console.error('❌ Claude option translation error:', error);
    
    // Fallback
    const fallback: Record<string, string> = {};
    for (const lang of languages) {
      fallback[lang] = `[${lang.toUpperCase()}] ${label}`;
    }
    return fallback;
  }
}

export default app;