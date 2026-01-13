/**
 * 🌍 EXPORTS CENTRALISÉS - SYSTÈME DE TRADUCTION DEVIS
 * 
 * Point d'entrée principal pour le système i18n du formulaire de devis
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

// Types
export type { 
  DevisTranslations, 
  DevisLanguage, 
  DevisLanguageOption 
} from './types';

// Configuration des langues
export { 
  DEVIS_LANGUAGES, 
  MVP_LANGUAGES,
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  COUNTRY_TO_LANGUAGE_MAP,
  getSuggestedLanguage,
  isLanguageAvailable,
  getLanguageInfo,
} from './languages';

// Traductions française (base locale)
export { fr } from './locales/fr';

// Traductions MVP (5 langues prioritaires)
export { en } from './locales/en';
export { de } from './locales/de';
export { es } from './locales/es';
export { pl } from './locales/pl';
export { ro } from './locales/ro';

// Traductions Phase 2 (Europe de l'Ouest) - ✅ 100% Complété
export { it } from './locales/it';
export { pt } from './locales/pt';
export { nl } from './locales/nl';

// Traductions Phase 3 (Europe de l'Est) - 🎉 100% COMPLÉTÉ !
export { bg } from './locales/bg';
export { hu } from './locales/hu';
export { cs } from './locales/cs';
export { sk } from './locales/sk';
export { hr } from './locales/hr';
export { sl } from './locales/sl';

// Traductions Phase 5 (Pays Baltes & Finno-ougriens) - 🎊 100% COMPLÉTÉ !
export { et } from './locales/et';
export { lt } from './locales/lt';
export { lv } from './locales/lv';

// Traductions Phase 4 (Sud & Nord Europe) - 🎉🎊 100% COMPLÉTÉ ! 🏆
export { el } from './locales/el';
export { fi } from './locales/fi';
export { sv } from './locales/sv';
export { da } from './locales/da';

// Ré-exports pour faciliter l'usage
export { useDevisTranslation, useDevisTranslationStatic } from '../../../hooks/useDevisTranslation';
// ✨ LanguageSelector est maintenant partagé dans /components/shared/LanguageSelector.tsx