/**
 * Helper pour traduire les données de Step5Candidats
 * Maps les valeurs brutes (français) vers les clés de traduction
 */

import type { DevisLanguage } from '../src/i18n/devis/types';
import { fr } from '../src/i18n/devis/locales/fr';
import { ro } from '../src/i18n/devis/locales/ro';
import { en } from '../src/i18n/devis/locales/en';
import { de } from '../src/i18n/devis/locales/de';
import { es } from '../src/i18n/devis/locales/es';
import { pl } from '../src/i18n/devis/locales/pl';

// Map des traductions
const TRANSLATIONS_MAP = {
  fr,
  ro,
  en,
  de,
  es,
  pl,
};

// Mapping des noms de langues vers les clés de traduction
export const LANGUE_KEYS: Record<string, string> = {
  'Français': 'francais',
  'Anglais': 'anglais',
  'Portugais': 'portugais',
  'Espagnol': 'espagnol',
  'Italien': 'italien',
  'Autre': 'autre',
};

// Mapping des EPIs vers les clés de traduction
export const EPI_KEYS: Record<string, string> = {
  'Casque de sécurité': 'casque',
  'Lunettes de sécurité': 'lunettes',
  'Protections auditives': 'protections_auditives',
  'Gants de protection': 'gants',
  'Chaussures de sécurité': 'chaussures',
  'Harnais de sécurité': 'harnais',
  'Vêtements de travail': 'vetements',
  'Masque respiratoire': 'masque',
  'Protection faciale': 'protection_faciale',
  'Vêtements haute visibilité': 'vetements_visibilite',
};

/**
 * Traduit un nom de langue
 */
export function translateLanguageName(langueName: string, lang: DevisLanguage): string {
  const key = LANGUE_KEYS[langueName];
  const translations = TRANSLATIONS_MAP[lang];
  
  if (key && translations?.step5?.sections?.langues?.languageNames?.[key as keyof typeof translations.step5.sections.langues.languageNames]) {
    return translations.step5.sections.langues.languageNames[key as keyof typeof translations.step5.sections.langues.languageNames];
  }
  return langueName; // Fallback
}

/**
 * Traduit un niveau de langue
 */
export function translateLanguageLevel(levelValue: string, lang: DevisLanguage): string {
  const translations = TRANSLATIONS_MAP[lang];
  
  if (translations?.step5?.sections?.langues?.levels?.[levelValue as keyof typeof translations.step5.sections.langues.levels]) {
    return translations.step5.sections.langues.levels[levelValue as keyof typeof translations.step5.sections.langues.levels];
  }
  return levelValue; // Fallback
}

/**
 * Traduit un nom d'EPI
 */
export function translateEPI(epiName: string, lang: DevisLanguage): string {
  const key = EPI_KEYS[epiName];
  const translations = TRANSLATIONS_MAP[lang];
  
  if (key && translations?.step5?.sections?.epi?.items?.[key as keyof typeof translations.step5.sections.epi.items]) {
    return translations.step5.sections.epi.items[key as keyof typeof translations.step5.sections.epi.items];
  }
  return epiName; // Fallback
}