/**
 * 🌍 Script d'import des traductions de la landing page
 * Charge les 22 fichiers de langue et les envoie au backend Supabase
 */

import { landingContent } from '../content/landing/index';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63`;

async function importAllTranslations() {
  console.log('🚀 Starting import of 22 landing page translations...\n');

  const languages = Object.keys(landingContent);
  let successCount = 0;
  let errorCount = 0;

  for (const lang of languages) {
    try {
      console.log(`📝 Importing ${lang.toUpperCase()}...`);
      
      const content = landingContent[lang as keyof typeof landingContent];
      
      const response = await fetch(`${API_BASE}/landing/${lang}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          translation_status: 'validated',
          translated_by: 'professional',
          translation_progress: 100,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        console.log(`   ✅ ${lang.toUpperCase()} imported successfully`);
        successCount++;
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error: any) {
      console.error(`   ❌ ${lang.toUpperCase()} failed:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n🎉 Import complete!`);
  console.log(`   ✅ Success: ${successCount}/${languages.length}`);
  console.log(`   ❌ Errors: ${errorCount}/${languages.length}`);
  
  if (errorCount === 0) {
    console.log(`\n🌍 All 22 European languages are now available in your YOJOB platform!`);
  }
}

// Run the import
importAllTranslations().catch(console.error);
