/**
 * 🌍 INDEX CENTRALISÉ DES TRADUCTIONS
 * 
 * Point d'entrée unique pour accéder à toutes les traductions
 * 22 langues européennes complètes
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

import { COMPLETE_TRANSLATIONS, type SupportedLanguage, type TranslationSet } from './translations-complete';
import { de, es, it, pt, nl, pl, ro, bg, hu, cz, sk, hr, sl, lt, lv, ee, el, sv, da, fi } from './translations-european';

/**
 * Toutes les traductions (22 langues)
 */
export const ALL_TRANSLATIONS: Record<SupportedLanguage, TranslationSet> = {
  // Français & Anglais (complets)
  fr: COMPLETE_TRANSLATIONS.fr,
  en: COMPLETE_TRANSLATIONS.en,
  
  // Langues européennes
  de, // Allemand
  es, // Espagnol
  it, // Italien
  pt, // Portugais
  nl, // Néerlandais
  pl, // Polonais
  ro, // Roumain
  bg, // Bulgare
  hu, // Hongrois
  cz, // Tchèque
  sk, // Slovaque
  hr, // Croate
  sl, // Slovène
  lt, // Lituanien
  lv, // Letton
  ee, // Estonien
  el, // Grec
  sv, // Suédois
  da, // Danois
  fi, // Finnois
};

/**
 * Langues supportées avec métadonnées
 */
export const SUPPORTED_LANGUAGES = [
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
] as const;

/**
 * Obtenir une traduction par clé
 * Fallback automatique sur FR si la clé n'existe pas
 */
export function getTranslation(
  lang: SupportedLanguage,
  key: string,
  profile?: 'agency' | 'client' | 'worker'
): string {
  const keys = key.split('.');
  let value: any = ALL_TRANSLATIONS[lang] || ALL_TRANSLATIONS.fr;
  
  // Naviguer dans l'arbre de traductions
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  
  // Si c'est un objet avec des profils
  if (value && typeof value === 'object' && profile) {
    const profileValue = value[profile];
    if (profileValue) return profileValue;
  }
  
  // Si c'est une string, retourner directement
  if (typeof value === 'string') {
    return value;
  }
  
  // Fallback sur FR si pas trouvé
  if (!value && lang !== 'fr') {
    return getTranslation('fr', key, profile);
  }
  
  // Dernière option : retourner la clé
  return key;
}

/**
 * Obtenir toutes les traductions pour une langue
 */
export function getLanguageTranslations(lang: SupportedLanguage): TranslationSet {
  return ALL_TRANSLATIONS[lang] || ALL_TRANSLATIONS.fr;
}

/**
 * Vérifier si une langue est supportée
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return lang in ALL_TRANSLATIONS;
}

/**
 * Obtenir la langue par défaut du navigateur
 */
export function getBrowserLanguage(): SupportedLanguage {
  const browserLang = navigator.language.split('-')[0];
  return isSupportedLanguage(browserLang) ? browserLang : 'fr';
}

/**
 * Export des types
 */
export type { SupportedLanguage, TranslationSet };
export { ALL_TRANSLATIONS as TRANSLATIONS };
