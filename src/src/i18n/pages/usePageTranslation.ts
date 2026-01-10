/**
 * 🎯 HOOK DE TRADUCTION POUR LES PAGES INSTITUTIONNELLES
 * 
 * Hook personnalisé pour gérer les traductions des pages :
 * - À Propos
 * - Notre Réseau
 * - Nos Secteurs
 * - Témoignages
 * 
 * @version 1.0.0
 */

import { useMemo } from 'react';
import { frAPropos, enAPropos } from './aPropos';

/**
 * Type pour les pages disponibles
 */
export type PageKey = 'a-propos' | 'notre-reseau' | 'nos-secteurs' | 'temoignages';

/**
 * Type pour les langues supportées
 */
export type SupportedLanguage = 'fr' | 'en' | 'de' | 'es' | 'it' | 'nl' | 'pt' | 'pl' | 'cs' | 'sk' | 'hu' | 'ro' | 'bg' | 'hr' | 'sl' | 'et' | 'lv' | 'lt' | 'el' | 'sv' | 'da' | 'fi' | 'no';

/**
 * Map des traductions par page
 */
const pageTranslations = {
  'a-propos': {
    fr: frAPropos,
    en: enAPropos
  },
  'notre-reseau': {
    fr: frAPropos, // TODO: Créer les vraies traductions
    en: enAPropos  // TODO: Créer les vraies traductions
  },
  'nos-secteurs': {
    fr: frAPropos, // TODO: Créer les vraies traductions
    en: enAPropos  // TODO: Créer les vraies traductions
  },
  'temoignages': {
    fr: frAPropos, // TODO: Créer les vraies traductions
    en: enAPropos  // TODO: Créer les vraies traductions
  }
} as const;

/**
 * Hook pour récupérer les traductions d'une page
 * 
 * @param pageKey - Identifiant de la page
 * @param language - Langue actuelle
 * @returns Objet de traduction pour la page et la langue spécifiées
 * 
 * @example
 * ```tsx
 * const t = usePageTranslation('a-propos', 'fr');
 * console.log(t.hero.title); // "Le courtage en recrutement européen, réinventé"
 * ```
 */
export function usePageTranslation(pageKey: PageKey, language: SupportedLanguage) {
  return useMemo(() => {
    const pageData = pageTranslations[pageKey];
    
    if (!pageData) {
      console.warn(`⚠️ Page "${pageKey}" not found, falling back to French`);
      return frAPropos;
    }
    
    // Vérifier si la langue existe pour cette page
    const availableLanguages = Object.keys(pageData);
    
    // Si la langue demandée existe, la retourner
    if (language in pageData) {
      return pageData[language as keyof typeof pageData];
    }
    
    // Sinon, fallback sur français avec un warning informatif
    console.warn(`⚠️ Language "${language}" not available for page "${pageKey}", available languages: ${availableLanguages.join(', ')}. Falling back to French.`);
    return pageData.fr || frAPropos;
  }, [pageKey, language]);
}

/**
 * Fonction utilitaire pour récupérer les langues disponibles pour une page
 * 
 * @param pageKey - Identifiant de la page
 * @returns Liste des codes de langue disponibles
 * 
 * @example
 * ```tsx
 * const availableLanguages = getAvailableLanguagesForPage('a-propos');
 * console.log(availableLanguages); // ['fr', 'en']
 * ```
 */
export function getAvailableLanguagesForPage(pageKey: PageKey): SupportedLanguage[] {
  const pageData = pageTranslations[pageKey];
  if (!pageData) return ['fr'];
  
  return Object.keys(pageData) as SupportedLanguage[];
}
