/**
 * 🔄 SCRIPT: Push Translations to Database
 * 
 * Pousse toutes les traductions depuis /config/ vers Supabase
 * 
 * Usage: ts-node scripts/push-translations-to-db.ts
 */

import { TRANSLATIONS } from '../src/i18n';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/push-translations`;

/**
 * Push all translations to Supabase
 */
export async function pushTranslationsToSupabase(dryRun = false) {
  console.log('🚀 Starting translations push...');
  console.log(`📊 Languages to push: ${Object.keys(TRANSLATIONS).length}`);
  
  if (dryRun) {
    console.log('⚠️ DRY RUN MODE - No data will be inserted');
  }

  try {
    const response = await fetch(`${API_URL}/push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        translations: TRANSLATIONS,
        dryRun,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Push failed:', result);
      return result;
    }

    console.log('✅ Push successful!', result);
    
    if (result.stats) {
      console.log('\n📊 STATISTICS:');
      console.log(`   Languages: ${result.stats.languages}`);
      console.log(`   Total records: ${result.stats.totalRecords}`);
      console.log(`   Inserted: ${result.stats.insertedCount}`);
      console.log(`   Batches: ${result.stats.batches}`);
      
      if (result.stats.errors > 0) {
        console.warn(`   ⚠️ Errors: ${result.stats.errors}`);
        console.log(result.errors);
      }
    }

    return result;

  } catch (error) {
    console.error('❌ Network error:', error);
    throw error;
  }
}

/**
 * Get current database status
 */
export async function getTranslationsStatus() {
  console.log('🔍 Fetching translations status...');

  try {
    const response = await fetch(`${API_URL}/status`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Status fetch failed:', result);
      return result;
    }

    console.log('✅ Status:', result);
    
    if (result.stats) {
      console.log('\n📊 DATABASE STATUS:');
      console.log(`   Total translations: ${result.totalTranslations}`);
      console.log(`   Languages: ${result.languages.join(', ')}`);
      console.log('\n   Per language:');
      
      for (const [lang, stats] of Object.entries(result.stats)) {
        console.log(`   ${lang}: ${(stats as any).total} translations`);
      }
    }

    return result;

  } catch (error) {
    console.error('❌ Network error:', error);
    throw error;
  }
}

/**
 * Clear all translations (DANGEROUS!)
 */
export async function clearAllTranslations() {
  const confirmed = confirm(
    '⚠️ WARNING: This will DELETE ALL translations from the database!\n\n' +
    'Are you absolutely sure you want to continue?'
  );

  if (!confirmed) {
    console.log('❌ Operation cancelled');
    return;
  }

  console.log('🗑️ Clearing all translations...');

  try {
    const response = await fetch(`${API_URL}/clear`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        confirm: 'YES_DELETE_ALL_TRANSLATIONS',
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Clear failed:', result);
      return result;
    }

    console.log('✅ All translations cleared!', result);
    return result;

  } catch (error) {
    console.error('❌ Network error:', error);
    throw error;
  }
}

// Auto-expose to window for console usage
if (typeof window !== 'undefined') {
  (window as any).pushTranslationsToSupabase = pushTranslationsToSupabase;
  (window as any).getTranslationsStatus = getTranslationsStatus;
  (window as any).clearAllTranslations = clearAllTranslations;
  
  console.log(`
🌍 Translation Push Tools Loaded!

Available commands:
  pushTranslationsToSupabase()        - Push all 22 languages to Supabase
  pushTranslationsToSupabase(true)    - Dry run (preview without inserting)
  getTranslationsStatus()             - Check current database status
  clearAllTranslations()              - Delete all translations (DANGEROUS!)

Example:
  await pushTranslationsToSupabase()
  `);
}