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

// Ré-exports pour faciliter l'usage
export { useDevisTranslation, useDevisTranslationStatic } from '../../../hooks/useDevisTranslation';
export { LanguageSelector, LanguageSelectorCompact, LanguageBadge } from '../../../components/devis/LanguageSelector';