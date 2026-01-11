/**
 * 📦 INDEX PRINCIPAL DES TRADUCTIONS - PAGES INSTITUTIONNELLES
 * 
 * Point d'entrée centralisé pour toutes les traductions des pages
 */

// === EXPORTS DES TRADUCTIONS ===
export * from './aPropos';
export * from './notreReseau';
export * from './nosSecteurs';
export * from './temoignages';

// === EXPORTS DES HOOKS ===
export { usePageTranslation, getAvailableLanguagesForPage } from './usePageTranslation';
export type { PageKey, SupportedLanguage } from './usePageTranslation';