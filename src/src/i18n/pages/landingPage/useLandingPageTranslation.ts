/**
 * 🎣 HOOK - Traductions de la Landing Page
 * 
 * Hook unifié pour récupérer les traductions de la landing page.
 * Remplace l'ancien système basé sur Supabase par des fichiers statiques.
 * 
 * @version 2.0.0
 */

import { useMemo } from 'react';
import { getLandingPageTranslation } from './index';
import type { SupportedLanguage } from '../../types';
import type { LandingPageContent } from '../../../types/landingContent';

/**
 * Hook pour obtenir les traductions de la landing page
 * 
 * @param language - Code langue actuelle (fr, en, de, etc.)
 * @returns Traductions complètes de la landing page
 * 
 * @example
 * const t = useLandingPageTranslation(language);
 * console.log(t.hero.title); // "Recrutez partout en Europe..."
 * console.log(t.services.badge); // "🎯 Nos Services"
 */
export function useLandingPageTranslation(
  language: SupportedLanguage = 'fr'
): LandingPageContent {
  return useMemo(() => {
    return getLandingPageTranslation(language);
  }, [language]);
}
