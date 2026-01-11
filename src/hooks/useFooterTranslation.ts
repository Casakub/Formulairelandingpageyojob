/**
 * 🎯 HOOK DE TRADUCTION POUR LE FOOTER
 * 
 * Hook personnalisé pour gérer les traductions du footer
 * 
 * @version 1.0.0
 */

import { useMemo } from 'react';
import { frFooter, enFooter, deFooter, esFooter, itFooter, nlFooter, ptFooter, plFooter, csFooter, skFooter, huFooter, roFooter, bgFooter, hrFooter, slFooter, etFooter, lvFooter, ltFooter, elFooter, svFooter, daFooter, fiFooter, noFooter } from '../src/i18n/footer';

/**
 * Type pour les langues supportées dans le footer
 */
export type FooterLanguage = 'fr' | 'en' | 'de' | 'es' | 'it' | 'nl' | 'pt' | 'pl' | 'cs' | 'sk' | 'hu' | 'ro' | 'bg' | 'hr' | 'sl' | 'et' | 'lv' | 'lt' | 'el' | 'sv' | 'da' | 'fi' | 'no';

/**
 * Map des traductions du footer par langue
 */
const footerTranslations = {
  fr: frFooter,
  en: enFooter,
  de: deFooter,
  es: esFooter,
  it: itFooter,
  nl: nlFooter,
  pt: ptFooter,
  pl: plFooter,
  cs: csFooter,
  sk: skFooter,
  hu: huFooter,
  ro: roFooter,
  bg: bgFooter,
  hr: hrFooter,
  sl: slFooter,
  et: etFooter,
  lv: lvFooter,
  lt: ltFooter,
  el: elFooter,
  sv: svFooter,
  da: daFooter,
  fi: fiFooter,
  no: noFooter
} as const;

/**
 * Hook pour récupérer les traductions du footer
 * 
 * @param language - Langue actuelle
 * @returns Objet de traduction pour le footer
 * 
 * @example
 * ```tsx
 * const t = useFooterTranslation('fr');
 * console.log(t.logo.tagline); // "Leader du recrutement européen..."
 * ```
 */
export function useFooterTranslation(language: string) {
  return useMemo(() => {
    // Si la langue demandée existe, la retourner
    if (language in footerTranslations) {
      return footerTranslations[language as FooterLanguage];
    }
    
    // Sinon, fallback sur français
    console.warn(`⚠️ Language "${language}" not available for footer, falling back to French.`);
    return footerTranslations.fr;
  }, [language]);
}