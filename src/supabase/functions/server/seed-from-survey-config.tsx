/**
 * 🌱 SEED AUTOMATIQUE DEPUIS CONFIGURATION
 * 
 * Crée automatiquement toutes les traductions FR/EN/DE
 * à partir des questions définies dans survey-questions-COMPLETE.ts
 */

import type { Context } from "npm:hono";
import * as kv from "./kv_store.tsx";

interface SeedItem {
  key: string;
  value: {
    translations: {
      [langCode: string]: {
        label?: string;
        placeholder?: string;
        description?: string;
        status: string;
      };
    };
  };
}

interface SeedData {
  seedData: SeedItem[];
}

export async function seedFromSurveyConfig(c: Context) {
  try {
    console.log('🌱 [SeedFromConfig] Starting automatic seed...');
    
    const body = await c.req.json() as SeedData;
    const { seedData } = body;

    if (!seedData || !Array.isArray(seedData)) {
      return c.json({ 
        success: false, 
        error: 'Invalid seed data format' 
      }, 400);
    }

    console.log(`📦 [SeedFromConfig] Processing ${seedData.length} items...`);

    let created = 0;
    let updated = 0;
    let errors = 0;

    const detailsByProfile = {
      agency: 0,
      client: 0,
      worker: 0
    };

    for (const item of seedData) {
      try {
        const { key, value } = item;

        // Vérifier si la clé existe déjà
        const existing = await kv.get(key);

        if (existing) {
          // Fusionner les traductions existantes avec les nouvelles
          const merged = {
            ...existing,
            translations: {
              ...existing.translations,
              ...value.translations
            }
          };
          await kv.set(key, merged);
          updated++;
        } else {
          // Créer nouvelle entrée
          await kv.set(key, value);
          created++;
        }

        // Compter par profil (approximatif basé sur le nom de la clé)
        if (key.includes('agency')) detailsByProfile.agency++;
        else if (key.includes('client')) detailsByProfile.client++;
        else if (key.includes('worker')) detailsByProfile.worker++;

      } catch (error: any) {
        console.error(`❌ [SeedFromConfig] Error processing ${item.key}:`, error);
        errors++;
      }
    }

    const totalTranslations = created + updated;

    console.log(`✅ [SeedFromConfig] Seed complete:`, {
      created,
      updated,
      errors,
      totalTranslations
    });

    return c.json({
      success: true,
      totalQuestions: seedData.filter(item => !item.key.includes('.options.')).length,
      totalTranslations,
      created,
      updated,
      errors,
      details: detailsByProfile
    });

  } catch (error: any) {
    console.error('❌ [SeedFromConfig] Fatal error:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
}
