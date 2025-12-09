/**
 * 🌍 Script de déploiement automatique des traductions YOJOB
 * 
 * Ce script :
 * 1. Génère les traductions pour les 22 langues européennes
 * 2. Les envoie directement dans Supabase via l'API
 * 3. Affiche la progression en temps réel
 * 
 * Usage: Ouvre /scripts/claude-deploy-translations.html dans le navigateur
 */

import { landingContentFR } from '../content/landing/fr';

const PROJECT_ID = 'vhpbmckgxtdyxdwhmdxy';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNjY4ODQsImV4cCI6MjA0ODc0Mjg4NH0.E5R6L9tXjhHLGmz13FGC5hS3OGbXaJpZqA0w5AQY1Hg';

interface Language {
  code: string;
  flag: string;
  nativeName: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', flag: '🇬🇧', nativeName: 'English' },
  { code: 'de', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'es', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'it', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'nl', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'pl', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'ro', flag: '🇷🇴', nativeName: 'Română' },
  { code: 'bg', flag: '🇧🇬', nativeName: 'Български' },
  { code: 'hu', flag: '🇭🇺', nativeName: 'Magyar' },
  { code: 'cs', flag: '🇨🇿', nativeName: 'Čeština' },
  { code: 'sk', flag: '🇸🇰', nativeName: 'Slovenčina' },
  { code: 'hr', flag: '🇭🇷', nativeName: 'Hrvatski' },
  { code: 'sl', flag: '🇸🇮', nativeName: 'Slovenščina' },
  { code: 'lt', flag: '🇱🇹', nativeName: 'Lietuvių' },
  { code: 'lv', flag: '🇱🇻', nativeName: 'Latviešu' },
  { code: 'et', flag: '🇪🇪', nativeName: 'Eesti' },
  { code: 'el', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  { code: 'sv', flag: '🇸🇪', nativeName: 'Svenska' },
  { code: 'da', flag: '🇩🇰', nativeName: 'Dansk' },
  { code: 'fi', flag: '🇫🇮', nativeName: 'Suomi' },
  { code: 'no', flag: '🇳🇴', nativeName: 'Norsk' },
];

async function deployAllTranslations() {
  console.log('🚀 Démarrage du déploiement des traductions YOJOB');
  console.log(`📦 ${LANGUAGES.length} langues à déployer\n`);

  const results = {
    success: [] as string[],
    errors: [] as { lang: string; error: string }[],
  };

  for (let i = 0; i < LANGUAGES.length; i++) {
    const lang = LANGUAGES[i];
    console.log(`[${i + 1}/${LANGUAGES.length}] 🌍 ${lang.flag} ${lang.nativeName} (${lang.code})...`);

    try {
      // Utiliser l'API de traduction existante
      const translateResponse = await fetch(
        `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-10092a63/landing/translate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceContent: landingContentFR,
            sourceLang: 'fr',
            targetLang: lang.code,
            targetLangName: lang.nativeName,
          }),
        }
      );

      if (!translateResponse.ok) {
        const errorData = await translateResponse.json();
        throw new Error(errorData.error || `HTTP ${translateResponse.status}`);
      }

      const { content: translatedContent } = await translateResponse.json();

      // Sauvegarder dans Supabase
      const saveResponse = await fetch(
        `https://${PROJECT_ID}.supabase.co/functions/v1/make-server-10092a63/landing/${lang.code}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: translatedContent,
            translation_status: 'published',
            translation_progress: 100,
            translated_by: 'ai',
          }),
        }
      );

      if (!saveResponse.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      results.success.push(lang.code);
      console.log(`   ✅ Traduit et sauvegardé avec succès\n`);

    } catch (error: any) {
      results.errors.push({ lang: lang.code, error: error.message });
      console.error(`   ❌ Erreur: ${error.message}\n`);
    }
  }

  // Résumé final
  console.log('\n' + '='.repeat(60));
  console.log('🎉 DÉPLOIEMENT TERMINÉ !\n');
  console.log(`✅ Réussis: ${results.success.length}/${LANGUAGES.length}`);
  if (results.errors.length > 0) {
    console.log(`❌ Échoués: ${results.errors.length}`);
    console.log('\nErreurs:');
    results.errors.forEach(({ lang, error }) => {
      console.log(`  - ${lang}: ${error}`);
    });
  }
  console.log('='.repeat(60));

  return results;
}

// Export pour utilisation dans d'autres scripts
export { deployAllTranslations, LANGUAGES };
