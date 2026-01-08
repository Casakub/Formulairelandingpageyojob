/**
 * 🎣 HOOK - Traductions des pages services
 * 
 * @version 1.0.0
 */

import { useMemo } from 'react';
import { getServiceTranslation } from './index';
import type { SupportedLanguage } from '../types';
import type { ServicePageTranslation } from './index';

/**
 * Hook pour obtenir les traductions d'une page service
 * 
 * @param page - Nom de la page service ('interimEuropeen', 'recrutementSpecialise', etc.)
 * @param language - Code langue actuelle
 * @returns Traductions de la page
 * 
 * @example
 * const t = useServiceTranslation('interimEuropeen', language);
 * console.log(t.hero.title); // "Recruit temporary staff anywhere in Europe"
 */
export function useServiceTranslation(
  page: 'interimEuropeen' | 'recrutementSpecialise' | 'conseilConformite' | 'detachementPersonnel',
  language: SupportedLanguage = 'fr'
): ServicePageTranslation {
  return useMemo(() => {
    return getServiceTranslation(language, page);
  }, [language, page]);
}
