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
import { frAPropos, enAPropos, deAPropos, esAPropos, itAPropos, nlAPropos, ptAPropos, plAPropos, csAPropos, skAPropos, huAPropos, roAPropos, bgAPropos, hrAPropos, slAPropos, etAPropos, lvAPropos, ltAPropos, elAPropos, svAPropos, daAPropos, fiAPropos, noAPropos } from './aPropos';
import { frNotreReseau, enNotreReseau, deNotreReseau, esNotreReseau, itNotreReseau, nlNotreReseau, ptNotreReseau, plNotreReseau, csNotreReseau, skNotreReseau, huNotreReseau, roNotreReseau, bgNotreReseau, hrNotreReseau, slNotreReseau, etNotreReseau, lvNotreReseau, ltNotreReseau, elNotreReseau, svNotreReseau, daNotreReseau, fiNotreReseau, noNotreReseau } from './notreReseau';
import { frNosSecteurs, enNosSecteurs, deNosSecteurs, esNosSecteurs, itNosSecteurs, nlNosSecteurs, ptNosSecteurs, plNosSecteurs, csNosSecteurs, skNosSecteurs, huNosSecteurs, roNosSecteurs, bgNosSecteurs, hrNosSecteurs, slNosSecteurs, etNosSecteurs, lvNosSecteurs, ltNosSecteurs, elNosSecteurs, svNosSecteurs, daNosSecteurs, fiNosSecteurs, noNosSecteurs } from './nosSecteurs';
import { frTemoignages, enTemoignages } from './temoignages';

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
    en: enAPropos,
    de: deAPropos,
    es: esAPropos,
    it: itAPropos,
    nl: nlAPropos,
    pt: ptAPropos,
    pl: plAPropos,
    cs: csAPropos,
    sk: skAPropos,
    hu: huAPropos,
    ro: roAPropos,
    bg: bgAPropos,
    hr: hrAPropos,
    sl: slAPropos,
    et: etAPropos,
    lv: lvAPropos,
    lt: ltAPropos,
    el: elAPropos,
    sv: svAPropos,
    da: daAPropos,
    fi: fiAPropos,
    no: noAPropos
  },
  'notre-reseau': {
    fr: frNotreReseau,
    en: enNotreReseau,
    de: deNotreReseau,
    es: esNotreReseau,
    it: itNotreReseau,
    nl: nlNotreReseau,
    pt: ptNotreReseau,
    pl: plNotreReseau,
    cs: csNotreReseau,
    sk: skNotreReseau,
    hu: huNotreReseau,
    ro: roNotreReseau,
    bg: bgNotreReseau,
    hr: hrNotreReseau,
    sl: slNotreReseau,
    et: etNotreReseau,
    lv: lvNotreReseau,
    lt: ltNotreReseau,
    el: elNotreReseau,
    sv: svNotreReseau,
    da: daNotreReseau,
    fi: fiNotreReseau,
    no: noNotreReseau
  },
  'nos-secteurs': {
    fr: frNosSecteurs,
    en: enNosSecteurs,
    de: deNosSecteurs,
    es: esNosSecteurs,
    it: itNosSecteurs,
    nl: nlNosSecteurs,
    pt: ptNosSecteurs,
    pl: plNosSecteurs,
    cs: csNosSecteurs,
    sk: skNosSecteurs,
    hu: huNosSecteurs,
    ro: roNosSecteurs,
    bg: bgNosSecteurs,
    hr: hrNosSecteurs,
    sl: slNosSecteurs,
    et: etNosSecteurs,
    lv: lvNosSecteurs,
    lt: ltNosSecteurs,
    el: elNosSecteurs,
    sv: svNosSecteurs,
    da: daNosSecteurs,
    fi: fiNosSecteurs,
    no: noNosSecteurs
  },
  'temoignages': {
    fr: frTemoignages,
    en: enTemoignages
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