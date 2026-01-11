/**
 * 🗺️ HOOK DE TRADUCTION POUR LE COMPOSANT EUROPE MAP
 * 
 * Hook personnalisé pour gérer les traductions du composant EuropeMap
 * 
 * @version 1.0.0
 */

import { useMemo } from 'react';
import { 
  frEuropeMap, enEuropeMap, deEuropeMap, esEuropeMap, itEuropeMap, 
  nlEuropeMap, ptEuropeMap, plEuropeMap, csEuropeMap, skEuropeMap,
  huEuropeMap, roEuropeMap, bgEuropeMap, hrEuropeMap, slEuropeMap,
  etEuropeMap, lvEuropeMap, ltEuropeMap, elEuropeMap, svEuropeMap,
  daEuropeMap, fiEuropeMap, noEuropeMap
} from '../src/i18n/components/europeMap';

/**
 * Type pour les langues supportées dans EuropeMap
 */
export type EuropeMapLanguage = 'fr' | 'en' | 'de' | 'es' | 'it' | 'nl' | 'pt' | 'pl' | 'cs' | 'sk' | 'hu' | 'ro' | 'bg' | 'hr' | 'sl' | 'et' | 'lv' | 'lt' | 'el' | 'sv' | 'da' | 'fi' | 'no';

/**
 * Map des traductions du composant EuropeMap par langue
 */
const europeMapTranslations = {
  fr: frEuropeMap,
  en: enEuropeMap,
  de: deEuropeMap,
  es: esEuropeMap,
  it: itEuropeMap,
  nl: nlEuropeMap,
  pt: ptEuropeMap,
  pl: plEuropeMap,
  cs: csEuropeMap,
  sk: skEuropeMap,
  hu: huEuropeMap,
  ro: roEuropeMap,
  bg: bgEuropeMap,
  hr: hrEuropeMap,
  sl: slEuropeMap,
  et: etEuropeMap,
  lv: lvEuropeMap,
  lt: ltEuropeMap,
  el: elEuropeMap,
  sv: svEuropeMap,
  da: daEuropeMap,
  fi: fiEuropeMap,
  no: noEuropeMap
} as const;

/**
 * Hook pour récupérer les traductions du composant EuropeMap
 * 
 * @param language - Code de langue à 2 lettres (ex: 'fr', 'en', 'de')
 * @returns Objet de traduction contenant les labels et noms de pays
 * 
 * @example
 * ```tsx
 * const t = useEuropeMapTranslation('fr');
 * console.log(t.agenciesLabel); // "agences partenaires"
 * console.log(t.countries.FR); // "France"
 * ```
 */
export function useEuropeMapTranslation(language: EuropeMapLanguage) {
  return useMemo(() => {
    // Si la langue existe, la retourner
    if (language in europeMapTranslations) {
      return europeMapTranslations[language];
    }
    
    // Sinon, fallback sur français avec un warning
    console.warn(`⚠️ Language "${language}" not available for EuropeMap component. Falling back to French.`);
    return frEuropeMap;
  }, [language]);
}

/**
 * Fonction utilitaire pour récupérer le nom d'un pays dans une langue donnée
 * 
 * @param countryCode - Code ISO du pays (ex: 'FR', 'DE', 'ES')
 * @param language - Code de langue
 * @returns Nom du pays traduit
 * 
 * @example
 * ```tsx
 * const countryName = getCountryName('FR', 'de'); // "Frankreich"
 * ```
 */
export function getCountryName(countryCode: string, language: EuropeMapLanguage): string {
  const translations = europeMapTranslations[language] || frEuropeMap;
  return translations.countries[countryCode as keyof typeof translations.countries] || countryCode;
}

/**
 * Fonction utilitaire pour récupérer toutes les langues disponibles
 * 
 * @returns Liste des codes de langue disponibles
 */
export function getAvailableLanguagesForEuropeMap(): EuropeMapLanguage[] {
  return Object.keys(europeMapTranslations) as EuropeMapLanguage[];
}