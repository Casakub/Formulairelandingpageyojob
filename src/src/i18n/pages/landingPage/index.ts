/**
 * 🏠 TRADUCTIONS LANDING PAGE - CENTRALISÉES
 * 
 * Structure modulaire identique aux pages de services :
 * - /landingPage/fr.ts, /landingPage/en.ts, etc.
 * 
 * Avantages :
 * - ✅ Fichiers légers et organisés
 * - ✅ Pas de dépendance à Supabase
 * - ✅ Performance optimale (pas de requête réseau)
 * - ✅ Synchronisation parfaite avec useLanguageManager
 * - ✅ Facile à maintenir
 * 
 * @version 2.0.0 - Migration depuis Supabase vers fichiers statiques
 */

import type { SupportedLanguage } from '../../types';
import type { LandingPageContent } from '../../../types/landingContent';

// Import des traductions par langue
import { frLandingPage } from './fr';
import { enLandingPage } from './en';
import { deLandingPage } from './de';

// Liste des langues disponibles pour la landing page
export const AVAILABLE_LANGUAGES_LANDING: SupportedLanguage[] = ['fr', 'en', 'de'];

/**
 * Récupère les traductions pour une langue donnée
 * 
 * @param language - Code langue (fr, en, de, etc.)
 * @returns Traductions de la landing page
 * 
 * @example
 * const t = getLandingPageTranslation('fr');
 * console.log(t.hero.title); // "Leader du recrutement européen"
 */
export function getLandingPageTranslation(language: SupportedLanguage = 'fr'): LandingPageContent {
  const translations: Record<string, LandingPageContent> = {
    fr: frLandingPage,
    en: enLandingPage,
    de: deLandingPage,
  };

  // Fallback sur le français si la langue n'est pas disponible
  return translations[language] || translations['fr'];
}

// Export du type pour faciliter l'utilisation
export type { LandingPageContent };

// Export du hook
export { useLandingPageTranslation } from './useLandingPageTranslation';