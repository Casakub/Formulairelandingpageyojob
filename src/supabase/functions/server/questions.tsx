/**
 * 🎯 API QUESTIONS MANAGEMENT
 * 
 * Gère les questions du formulaire avec système d'override :
 * - Base : /config/survey-questions.ts
 * - Overrides : KV store (question_config:*)
 * - Traductions : KV store (i18n:*)
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

/**
 * GET /questions
 * Récupère toutes les questions fusionnées (base + overrides)
 */
app.get('/', async (c) => {
  try {
    console.log('📥 [QUESTIONS] GET all questions with overrides');

    // Récupérer tous les overrides depuis le KV store
    const overrides = await kv.getByPrefix('question_config:');
    console.log(`✅ [QUESTIONS] Found ${overrides.length} overrides`);

    // Créer un map des overrides par ID
    const overrideMap: Record<string, any> = {};
    overrides.forEach((item: any) => {
      const questionId = item.key.replace('question_config:', '');
      overrideMap[questionId] = item.value;
    });

    return c.json({
      success: true,
      overrides: overrideMap,
      count: Object.keys(overrideMap).length
    });

  } catch (error: any) {
    console.error('❌ [QUESTIONS] Error fetching questions:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * DELETE /questions/overrides
 * ⚠️ SUPPRIME TOUS LES OVERRIDES (nettoyage complet)
 */
app.delete('/overrides', async (c) => {
  try {
    console.log('🗑️ [QUESTIONS] DELETE all overrides');

    // Récupérer tous les overrides
    const overrides = await kv.getByPrefix('question_config:');
    console.log(`📦 [QUESTIONS] Found ${overrides.length} overrides to delete`);

    // Supprimer tous les overrides
    const keys = overrides.map((item: any) => item.key);
    if (keys.length > 0) {
      await kv.mdel(keys);
      console.log(`✅ [QUESTIONS] Deleted ${keys.length} overrides`);
    }

    return c.json({
      success: true,
      message: `Deleted ${keys.length} overrides`,
      count: keys.length
    });

  } catch (error: any) {
    console.error('❌ [QUESTIONS] Error deleting overrides:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export default app;