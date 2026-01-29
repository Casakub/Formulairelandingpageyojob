/**
 * 🌍 CONFIGURATION DES LANGUES DISPONIBLES POUR LE FORMULAIRE DE DEVIS
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import type { DevisLanguageOption, DevisLanguage } from './types';

/**
 * Liste complète des langues supportées (27 pays EU)
 * Ordonnées par priorité/volume estimé
 */
export const DEVIS_LANGUAGES: DevisLanguageOption[] = [
  // === MVP Phase 1 (6 langues prioritaires) ===
  { code: 'fr', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'es', label: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'ro', label: 'Română', flag: '🇷🇴', nativeName: 'Română' },
  
  // === Phase 2 (Europe de l'Ouest) ===
  { code: 'it', label: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', label: 'Português', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', nativeName: 'Nederlands' },
  
  // === Phase 3 (Europe de l'Est) ===
  { code: 'bg', label: 'Български', flag: '🇧🇬', nativeName: 'Български' },
  { code: 'hu', label: 'Magyar', flag: '🇭🇺', nativeName: 'Magyar' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿', nativeName: 'Čeština' },
  { code: 'sk', label: 'Slovenčina', flag: '🇸🇰', nativeName: 'Slovenčina' },
  { code: 'hr', label: 'Hrvatski', flag: '🇭🇷', nativeName: 'Hrvatski' },
  { code: 'sl', label: 'Slovenščina', flag: '🇸🇮', nativeName: 'Slovenščina' },
  
  // === Phase 4 (Europe du Sud et Nordique) ===
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮', nativeName: 'Suomi' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪', nativeName: 'Svenska' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰', nativeName: 'Dansk' },
  
  // === Phase 5 (Pays Baltes) ===
  { code: 'et', label: 'Eesti', flag: '🇪🇪', nativeName: 'Eesti' },
  { code: 'lv', label: 'Latviešu', flag: '🇱🇻', nativeName: 'Latviešu' },
  { code: 'lt', label: 'Lietuvių', flag: '🇱🇹', nativeName: 'Lietuvių' },
];

/**
 * Langues MVP (Phase 1)
 */
export const MVP_LANGUAGES: DevisLanguage[] = ['fr', 'en', 'de', 'es', 'pl', 'ro'];

/**
 * Langues disponibles (TOUTES LES 22 LANGUES - 100% COMPLÉTÉ !)
 */
export const AVAILABLE_LANGUAGES: DevisLanguage[] = ['fr', 'en', 'de', 'es', 'pl', 'ro', 'it', 'pt', 'nl', 'bg', 'hu', 'cs', 'sk', 'hr', 'sl', 'et', 'lt', 'lv', 'el', 'fi', 'sv', 'da'];

/**
 * Langues avec traductions complètes pour la page RecapDevis (pageRecap)
 * Ces langues incluent toutes les sections : header, statut, dates, entreprise, 
 * contact, postes, conditions, candidats, signature, tooltips, modales, print, etc.
 * 
 * ✅ TOUTES LES 22 LANGUES EUROPÉENNES SONT COMPLÈTES !
 */
export const RECAP_COMPLETE_LANGUAGES: DevisLanguage[] = [
  'fr', 'en', 'de', 'es', 'it', 'pl', 'ro',  // Phase 1-2
  'pt', 'nl', 'bg', 'hu',                     // Phase 2-3
  'cs', 'sk', 'hr', 'sl',                     // Phase 3
  'et', 'lt', 'lv',                           // Phase 5 (Baltes)
  'el', 'fi', 'sv', 'da'                      // Phase 4 (Sud + Nordiques)
];

/**
 * Langue par défaut
 */
export const DEFAULT_LANGUAGE: DevisLanguage = 'fr';

/**
 * Détection automatique de la langue selon le pays sélectionné
 */
export const COUNTRY_TO_LANGUAGE_MAP: Record<string, DevisLanguage> = {
  // Pays francophones
  'France': 'fr',
  'Belgique': 'fr',
  'Luxembourg': 'fr',
  
  // Pays germanophones
  'Allemagne': 'de',
  'Autriche': 'de',
  
  // Pays anglophones
  'Irlande': 'en',
  'Malte': 'en',
  'Chypre': 'en',
  
  // Europe du Sud
  'Espagne': 'es',
  'Italie': 'it',
  'Portugal': 'pt',
  'Grèce': 'el',
  
  // Europe de l'Est
  'Pologne': 'pl',
  'Roumanie': 'ro',
  'Bulgarie': 'bg',
  'Hongrie': 'hu',
  'Tchéquie': 'cs',
  'Slovaquie': 'sk',
  'Croatie': 'hr',
  'Slovénie': 'sl',
  
  // Europe du Nord
  'Pays-Bas': 'nl',
  'Finlande': 'fi',
  'Suède': 'sv',
  'Danemark': 'da',
  
  // Pays Baltes
  'Estonie': 'et',
  'Lettonie': 'lv',
  'Lituanie': 'lt',
};

/**
 * Obtenir la langue suggérée selon le pays
 */
export function getSuggestedLanguage(countryName: string): DevisLanguage {
  return COUNTRY_TO_LANGUAGE_MAP[countryName] || DEFAULT_LANGUAGE;
}

/**
 * Vérifier si une langue est disponible
 */
export function isLanguageAvailable(lang: string): lang is DevisLanguage {
  return DEVIS_LANGUAGES.some(l => l.code === lang);
}

/**
 * Obtenir les informations d'une langue
 */
export function getLanguageInfo(lang: DevisLanguage): DevisLanguageOption | undefined {
  return DEVIS_LANGUAGES.find(l => l.code === lang);
}