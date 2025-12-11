/**
 * 🌍 SYSTÈME I18N v2.0 - POINT D'ENTRÉE
 * 
 * Système de traduction centralisé, typé et évolutif
 * - 22 langues européennes supportées
 * - Génération automatique depuis survey-questions-COMPLETE.ts
 * - Fallback intelligent FR
 * - Audit et vérification automatiques
 * 
 * @version 2.0.0
 * @date 11 Décembre 2024
 */

import type { 
  SupportedLanguage, 
  TranslationBundle,
  TranslationsByLanguage,
  LanguageMetadata,
  GetTranslationOptions,
} from './types';

// Import statique des locales
import { fr } from './locales/fr.generated';
import { en } from './locales/en';

/**
 * Toutes les traductions chargées
 */
const TRANSLATIONS: Partial<TranslationsByLanguage> = {
  fr,
  en,
  // Les autres langues seront ajoutées progressivement
};

/**
 * Langues supportées avec métadonnées
 */
export const SUPPORTED_LANGUAGES: LanguageMetadata[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴', nativeName: 'Română' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬', nativeName: 'Български' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺', nativeName: 'Magyar' },
  { code: 'cz', name: 'Czech', flag: '🇨🇿', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰', nativeName: 'Slovenčina' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷', nativeName: 'Hrvatski' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮', nativeName: 'Slovenščina' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹', nativeName: 'Lietuvių' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻', nativeName: 'Latviešu' },
  { code: 'ee', name: 'Estonian', flag: '🇪🇪', nativeName: 'Eesti' },
  { code: 'el', name: 'Greek', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', flag: '🇩🇰', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮', nativeName: 'Suomi' },
];

/**
 * Naviguer dans un objet par chemin (ex: "questions.q1_nom.label")
 */
function getByPath(obj: any, path: string): any {
  const keys = path.split('.');
  let value = obj;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  
  return value;
}

/**
 * Interpoler des variables dans une chaîne
 * Ex: "Bonjour {name}" + { name: "Alice" } → "Bonjour Alice"
 */
function interpolate(text: string, variables?: Record<string, string | number>): string {
  if (!variables) return text;
  
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

/**
 * Obtenir une traduction par clé
 * 
 * @param lang - Code langue (fr, en, de, ...)
 * @param key - Clé de traduction (ex: "questions.q1_nom.label")
 * @param options - Options supplémentaires (profile, variables, fallback)
 * @returns Texte traduit ou clé si introuvable
 * 
 * @example
 * getTranslation('fr', 'common.submit') // → "Envoyer"
 * getTranslation('en', 'questions.q1_nom.label', { profile: 'agency' })
 * getTranslation('de', 'common.welcome', { variables: { name: 'Hans' } })
 */
export function getTranslation(
  lang: SupportedLanguage,
  key: string,
  options?: GetTranslationOptions
): string {
  const { profile, variables, fallback, noFallback } = options || {};
  
  // 1️⃣ Essayer dans la langue demandée
  const langBundle = TRANSLATIONS[lang];
  if (langBundle) {
    const value = getByPath(langBundle, key);
    
    // Si c'est une string, on l'a trouvée
    if (typeof value === 'string') {
      return interpolate(value, variables);
    }
    
    // Si c'est un objet avec des profils (agency/client/worker)
    if (value && typeof value === 'object' && profile) {
      const profileValue = value[profile];
      if (typeof profileValue === 'string') {
        return interpolate(profileValue, variables);
      }
    }
  }
  
  // 2️⃣ Fallback sur FR
  if (!noFallback && lang !== 'fr') {
    const frBundle = TRANSLATIONS.fr;
    if (frBundle) {
      const value = getByPath(frBundle, key);
      
      if (typeof value === 'string') {
        return interpolate(value, variables);
      }
      
      if (value && typeof value === 'object' && profile) {
        const profileValue = value[profile];
        if (typeof profileValue === 'string') {
          return interpolate(profileValue, variables);
        }
      }
    }
  }
  
  // 3️⃣ Fallback custom
  if (fallback) {
    return interpolate(fallback, variables);
  }
  
  // 4️⃣ Retourner la clé (debug)
  return key;
}

/**
 * Obtenir toutes les traductions pour une langue
 */
export function getLanguageTranslations(lang: SupportedLanguage): TranslationBundle | null {
  return TRANSLATIONS[lang] || TRANSLATIONS.fr || null;
}

/**
 * Vérifier si une langue est supportée et disponible
 */
export function isLanguageAvailable(lang: string): lang is SupportedLanguage {
  return lang in TRANSLATIONS;
}

/**
 * Obtenir la langue du navigateur
 */
export function getBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') return 'fr';
  
  const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
  return isLanguageAvailable(browserLang) ? browserLang : 'fr';
}

/**
 * Calculer le taux de complétion d'une langue
 */
export function getLanguageCompleteness(lang: SupportedLanguage): number {
  const bundle = TRANSLATIONS[lang];
  const frBundle = TRANSLATIONS.fr;
  
  if (!bundle || !frBundle) return 0;
  
  // Compter les clés traduites vs FR
  let translatedCount = 0;
  let totalCount = 0;
  
  // Questions
  for (const questionId in frBundle.questions) {
    totalCount++;
    if (bundle.questions[questionId]?.label) {
      translatedCount++;
    }
  }
  
  return totalCount > 0 ? Math.round((translatedCount / totalCount) * 100) : 0;
}

/**
 * Re-exports
 */
export { TRANSLATIONS };
export type { 
  SupportedLanguage, 
  TranslationBundle,
  LanguageMetadata,
  GetTranslationOptions,
};

// Export hooks React
export { useI18n, I18nProvider } from './hooks';