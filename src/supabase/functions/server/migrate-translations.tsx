/**
 * 🔄 SCRIPT DE MIGRATION DES TRADUCTIONS
 * 
 * Convertit les anciennes traductions du format par langue vers le format multi-langue
 * 
 * ANCIEN FORMAT :
 *   i18n:fr:question:q4_secteurs = { text: "...", placeholder: "...", status: "..." }
 *   i18n:en:question:q4_secteurs = { text: "...", placeholder: "...", status: "..." }
 * 
 * NOUVEAU FORMAT :
 *   i18n:question:q4_secteurs = {
 *     translations: {
 *       fr: { label: "...", placeholder: "...", status: "..." },
 *       en: { label: "...", placeholder: "...", status: "..." }
 *     }
 *   }
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const app = new Hono();

/**
 * POST /migrate-translations
 * Lance la migration des traductions
 */
app.post('/', async (c) => {
  try {
    console.log('🔄 [MIGRATION] Démarrage de la migration des traductions...');

    // 1. Charger toutes les anciennes traductions (format par langue)
    const allKeys = await kv.getByPrefix('i18n:');
    console.log(`📊 [MIGRATION] Trouvé ${allKeys.length} clés i18n:*`);

    // 2. Grouper par question et langue
    const questionTranslations: Record<string, Record<string, any>> = {};
    const uiTranslations: Record<string, Record<string, any>> = {};
    let oldFormatCount = 0;
    let newFormatCount = 0;

    allKeys.forEach((item: any) => {
      const key = item.key;

      // Format ancien : i18n:fr:question:q4_secteurs
      const oldQuestionMatch = key.match(/^i18n:([a-z]{2}):question:(.+)$/);
      if (oldQuestionMatch) {
        const [, langCode, questionId] = oldQuestionMatch;
        
        if (!questionTranslations[questionId]) {
          questionTranslations[questionId] = {};
        }

        questionTranslations[questionId][langCode] = {
          label: item.value.text || item.value.label || '',
          placeholder: item.value.placeholder || '',
          description: item.value.description || '',
          options: item.value.options || [],
          status: item.value.status || 'validated'
        };

        oldFormatCount++;
        console.log(`  ✓ Ancien format question: ${langCode}/${questionId}`);
        return;
      }

      // Format ancien : i18n:fr:ui:section_1_title
      const oldUIMatch = key.match(/^i18n:([a-z]{2}):ui:(.+)$/);
      if (oldUIMatch) {
        const [, langCode, uiKey] = oldUIMatch;
        
        if (!uiTranslations[uiKey]) {
          uiTranslations[uiKey] = {};
        }

        uiTranslations[uiKey][langCode] = {
          text: item.value.text || item.value || '',
          status: item.value.status || 'validated'
        };

        oldFormatCount++;
        console.log(`  ✓ Ancien format UI: ${langCode}/${uiKey}`);
        return;
      }

      // Format nouveau : i18n:question:q4_secteurs (avec translations.fr/en/de)
      const newQuestionMatch = key.match(/^i18n:question:(.+)$/);
      if (newQuestionMatch) {
        newFormatCount++;
        console.log(`  → Nouveau format déjà présent: ${key}`);
        return;
      }

      // Format nouveau : i18n:ui:section_1_title (avec translations.fr/en/de)
      const newUIMatch = key.match(/^i18n:ui:(.+)$/);
      if (newUIMatch) {
        newFormatCount++;
        console.log(`  → Nouveau format déjà présent: ${key}`);
        return;
      }
    });

    console.log(`\n📊 [MIGRATION] Analyse terminée:`);
    console.log(`  - ${oldFormatCount} traductions ancien format`);
    console.log(`  - ${newFormatCount} traductions nouveau format`);
    console.log(`  - ${Object.keys(questionTranslations).length} questions à migrer`);
    console.log(`  - ${Object.keys(uiTranslations).length} textes UI à migrer`);

    // 3. Migrer les questions vers le nouveau format
    let questionsMigrated = 0;
    for (const [questionId, translations] of Object.entries(questionTranslations)) {
      const newKey = `i18n:question:${questionId}`;
      
      // Vérifier si la clé existe déjà
      const existing: any = await kv.get(newKey) || { translations: {} };
      
      // Fusionner les traductions (les anciennes ne doivent pas écraser les nouvelles)
      for (const [langCode, translation] of Object.entries(translations)) {
        if (!existing.translations[langCode]) {
          existing.translations[langCode] = translation;
          console.log(`  ✅ Migration question ${questionId} [${langCode}]`);
        } else {
          console.log(`  ⏭️  Question ${questionId} [${langCode}] déjà migrée`);
        }
      }

      await kv.set(newKey, existing);
      questionsMigrated++;
    }

    // 4. Migrer les UI texts vers le nouveau format
    let uiMigrated = 0;
    for (const [uiKey, translations] of Object.entries(uiTranslations)) {
      const newKey = `i18n:ui:${uiKey}`;
      
      // Vérifier si la clé existe déjà
      const existing: any = await kv.get(newKey) || { 
        key: uiKey,
        category: 'general',
        translations: {} 
      };
      
      // Fusionner les traductions
      for (const [langCode, translation] of Object.entries(translations)) {
        if (!existing.translations[langCode]) {
          existing.translations[langCode] = translation;
          console.log(`  ✅ Migration UI ${uiKey} [${langCode}]`);
        } else {
          console.log(`  ⏭️  UI ${uiKey} [${langCode}] déjà migrée`);
        }
      }

      await kv.set(newKey, existing);
      uiMigrated++;
    }

    // 5. Résumé
    const summary = {
      oldFormatFound: oldFormatCount,
      newFormatFound: newFormatCount,
      questionsMigrated,
      uiTextsMigrated: uiMigrated,
      totalMigrated: questionsMigrated + uiMigrated,
      questionIds: Object.keys(questionTranslations),
      uiKeys: Object.keys(uiTranslations)
    };

    console.log(`\n✅ [MIGRATION] Migration terminée avec succès !`);
    console.log(`  - ${questionsMigrated} questions migrées`);
    console.log(`  - ${uiMigrated} textes UI migrés`);

    return c.json({
      success: true,
      message: 'Migration des traductions terminée avec succès',
      summary
    });

  } catch (error: any) {
    console.error('❌ [MIGRATION] Erreur:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * GET /migrate-translations/preview
 * Prévisualise ce qui sera migré sans effectuer la migration
 */
app.get('/preview', async (c) => {
  try {
    console.log('🔍 [MIGRATION] Prévisualisation de la migration...');

    const allKeys = await kv.getByPrefix('i18n:');
    
    const preview = {
      oldFormat: {
        questions: [] as string[],
        uiTexts: [] as string[]
      },
      newFormat: {
        questions: [] as string[],
        uiTexts: [] as string[]
      }
    };

    allKeys.forEach((item: any) => {
      const key = item.key;

      if (key.match(/^i18n:[a-z]{2}:question:/)) {
        preview.oldFormat.questions.push(key);
      } else if (key.match(/^i18n:[a-z]{2}:ui:/)) {
        preview.oldFormat.uiTexts.push(key);
      } else if (key.match(/^i18n:question:/)) {
        preview.newFormat.questions.push(key);
      } else if (key.match(/^i18n:ui:/)) {
        preview.newFormat.uiTexts.push(key);
      }
    });

    return c.json({
      success: true,
      preview,
      summary: {
        oldQuestions: preview.oldFormat.questions.length,
        oldUITexts: preview.oldFormat.uiTexts.length,
        newQuestions: preview.newFormat.questions.length,
        newUITexts: preview.newFormat.uiTexts.length
      }
    });

  } catch (error: any) {
    console.error('❌ [MIGRATION] Erreur:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

/**
 * DELETE /migrate-translations/cleanup
 * Supprime les anciennes clés après migration (à utiliser avec précaution)
 */
app.delete('/cleanup', async (c) => {
  try {
    console.log('🗑️  [MIGRATION] Nettoyage des anciennes clés...');

    const allKeys = await kv.getByPrefix('i18n:');
    const keysToDelete: string[] = [];

    allKeys.forEach((item: any) => {
      const key = item.key;

      // Supprimer seulement les anciennes clés avec langue dans la clé
      if (key.match(/^i18n:[a-z]{2}:(question|ui):/)) {
        keysToDelete.push(key);
      }
    });

    console.log(`🗑️  [MIGRATION] ${keysToDelete.length} clés à supprimer`);

    // Supprimer par batch
    if (keysToDelete.length > 0) {
      await kv.mdel(keysToDelete);
      console.log(`✅ [MIGRATION] ${keysToDelete.length} anciennes clés supprimées`);
    }

    return c.json({
      success: true,
      message: 'Nettoyage terminé',
      deletedKeys: keysToDelete.length,
      keys: keysToDelete
    });

  } catch (error: any) {
    console.error('❌ [MIGRATION] Erreur:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
});

export default app;
