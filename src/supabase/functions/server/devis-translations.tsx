/**
 * 🌍 API TRADUCTIONS FORMULAIRE DE DEVIS
 * 
 * Gestion des traductions multi-langues pour le formulaire de demande de devis
 * Stockage dans KV Store Supabase
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const devisTranslations = new Hono();

// ==================== ROUTES ====================

/**
 * GET /devis/translations/:lang
 * Récupérer les traductions pour une langue donnée
 * 
 * @param lang - Code langue (fr, en, de, es, pl, ro, etc.)
 * @returns Traductions complètes du formulaire
 */
devisTranslations.get('/:lang', async (c) => {
  try {
    const lang = c.req.param('lang');
    
    console.log(`📥 [devis-translations] Récupération traductions: ${lang}`);
    
    // Charger depuis KV Store
    const translations = await kv.get(`devis:translations:${lang}`);
    
    if (!translations) {
      console.warn(`⚠️ [devis-translations] Traductions non trouvées pour: ${lang}`);
      return c.json({
        success: false,
        error: `Traductions non disponibles pour la langue: ${lang}`,
        availableLanguages: ['fr', 'en', 'de', 'es', 'pl', 'ro'], // MVP
      }, 404);
    }
    
    console.log(`✅ [devis-translations] Traductions ${lang} envoyées`);
    
    return c.json({
      success: true,
      translations,
      language: lang,
      _meta: {
        lastUpdated: translations._meta?.lastUpdated || new Date().toISOString(),
        version: translations._meta?.version || '1.0.0',
      },
    });
    
  } catch (error) {
    console.error('❌ [devis-translations] Erreur récupération:', error);
    return c.json({
      success: false,
      error: 'Erreur serveur lors de la récupération des traductions',
    }, 500);
  }
});

/**
 * POST /devis/translations/seed
 * Initialiser/mettre à jour les traductions pour une langue
 * 
 * Body: { lang: string, translations: DevisTranslations }
 */
devisTranslations.post('/seed', async (c) => {
  try {
    const body = await c.req.json();
    const { lang, translations } = body;
    
    if (!lang || !translations) {
      return c.json({
        success: false,
        error: 'Paramètres manquants: lang et translations requis',
      }, 400);
    }
    
    console.log(`📝 [devis-translations] Seed traductions: ${lang}`);
    
    // Ajouter métadonnées
    const translationsWithMeta = {
      ...translations,
      _meta: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
        language: lang,
      },
    };
    
    // Sauvegarder dans KV Store
    await kv.set(`devis:translations:${lang}`, translationsWithMeta);
    
    console.log(`✅ [devis-translations] Traductions ${lang} sauvegardées`);
    
    return c.json({
      success: true,
      message: `Traductions ${lang} initialisées avec succès`,
      language: lang,
    });
    
  } catch (error) {
    console.error('❌ [devis-translations] Erreur seed:', error);
    return c.json({
      success: false,
      error: 'Erreur serveur lors de l\'initialisation des traductions',
    }, 500);
  }
});

/**
 * POST /devis/translations/seed-batch
 * Initialiser plusieurs langues en une fois
 * 
 * Body: { translations: Record<string, DevisTranslations> }
 */
devisTranslations.post('/seed-batch', async (c) => {
  try {
    const body = await c.req.json();
    const { translations } = body;
    
    if (!translations || typeof translations !== 'object') {
      return c.json({
        success: false,
        error: 'Format invalide: translations doit être un objet { lang: data }',
      }, 400);
    }
    
    console.log(`📝 [devis-translations] Seed batch: ${Object.keys(translations).length} langues`);
    
    const results = [];
    
    for (const [lang, data] of Object.entries(translations)) {
      try {
        const translationsWithMeta = {
          ...data,
          _meta: {
            lastUpdated: new Date().toISOString(),
            version: '1.0.0',
            language: lang,
          },
        };
        
        await kv.set(`devis:translations:${lang}`, translationsWithMeta);
        results.push({ lang, success: true });
        console.log(`  ✅ ${lang}: OK`);
      } catch (err) {
        results.push({ lang, success: false, error: String(err) });
        console.error(`  ❌ ${lang}: ERREUR`, err);
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    console.log(`✅ [devis-translations] Batch terminé: ${successCount}/${results.length} langues`);
    
    return c.json({
      success: true,
      message: `${successCount}/${results.length} langues initialisées`,
      results,
    });
    
  } catch (error) {
    console.error('❌ [devis-translations] Erreur seed-batch:', error);
    return c.json({
      success: false,
      error: 'Erreur serveur lors de l\'initialisation batch',
    }, 500);
  }
});

/**
 * GET /devis/translations
 * Lister toutes les langues disponibles
 */
devisTranslations.get('/', async (c) => {
  try {
    console.log(`📋 [devis-translations] Liste des langues disponibles`);
    
    // Liste des langues à vérifier (MVP + Phase 2)
    const languagesToCheck = [
      'fr', 'en', 'de', 'es', 'pl', 'ro', // MVP
      'it', 'pt', 'nl', // Phase 2
      'bg', 'hu', 'cs', 'sk', 'hr', 'sl', // Phase 3
      'el', 'fi', 'sv', 'da', // Phase 4
      'et', 'lv', 'lt', // Phase 5
    ];
    
    const availableLanguages = [];
    
    for (const lang of languagesToCheck) {
      const translations = await kv.get(`devis:translations:${lang}`);
      if (translations) {
        availableLanguages.push({
          code: lang,
          available: true,
          lastUpdated: translations._meta?.lastUpdated || null,
          version: translations._meta?.version || null,
        });
      }
    }
    
    console.log(`✅ [devis-translations] ${availableLanguages.length} langues disponibles`);
    
    return c.json({
      success: true,
      availableLanguages,
      total: availableLanguages.length,
      mvpLanguages: ['fr', 'en', 'de', 'es', 'pl', 'ro'],
    });
    
  } catch (error) {
    console.error('❌ [devis-translations] Erreur listing:', error);
    return c.json({
      success: false,
      error: 'Erreur serveur lors du listing des langues',
    }, 500);
  }
});

/**
 * DELETE /devis/translations/:lang
 * Supprimer les traductions d'une langue (admin uniquement)
 */
devisTranslations.delete('/:lang', async (c) => {
  try {
    const lang = c.req.param('lang');
    
    console.log(`🗑️ [devis-translations] Suppression traductions: ${lang}`);
    
    await kv.del(`devis:translations:${lang}`);
    
    console.log(`✅ [devis-translations] Traductions ${lang} supprimées`);
    
    return c.json({
      success: true,
      message: `Traductions ${lang} supprimées avec succès`,
    });
    
  } catch (error) {
    console.error('❌ [devis-translations] Erreur suppression:', error);
    return c.json({
      success: false,
      error: 'Erreur serveur lors de la suppression',
    }, 500);
  }
});

/**
 * GET /devis/translations/:lang/status
 * Vérifier le statut des traductions pour une langue
 */
devisTranslations.get('/:lang/status', async (c) => {
  try {
    const lang = c.req.param('lang');
    
    const translations = await kv.get(`devis:translations:${lang}`);
    
    if (!translations) {
      return c.json({
        success: true,
        available: false,
        language: lang,
      });
    }
    
    // Compter les clés traduites
    const countKeys = (obj: any): number => {
      let count = 0;
      for (const value of Object.values(obj)) {
        if (typeof value === 'object' && value !== null) {
          count += countKeys(value);
        } else if (typeof value === 'string') {
          count += 1;
        }
      }
      return count;
    };
    
    const totalKeys = countKeys(translations);
    
    return c.json({
      success: true,
      available: true,
      language: lang,
      totalKeys,
      lastUpdated: translations._meta?.lastUpdated || null,
      version: translations._meta?.version || null,
    });
    
  } catch (error) {
    console.error('❌ [devis-translations] Erreur status:', error);
    return c.json({
      success: false,
      error: 'Erreur serveur lors de la vérification du statut',
    }, 500);
  }
});

export default devisTranslations;
