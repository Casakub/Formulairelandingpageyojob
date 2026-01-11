export { frTemoignages } from './fr';
export { enTemoignages } from './en';

export const AVAILABLE_LANGUAGES_TEMOIGNAGES = ['fr', 'en'] as const;
export type TemoignagesSupportedLanguage = typeof AVAILABLE_LANGUAGES_TEMOIGNAGES[number];
