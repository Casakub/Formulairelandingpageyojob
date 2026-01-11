export { frNosSecteurs } from './fr';
export { enNosSecteurs } from './en';

export const AVAILABLE_LANGUAGES_NOS_SECTEURS = ['fr', 'en'] as const;
export type NosSecteursSupportedLanguage = typeof AVAILABLE_LANGUAGES_NOS_SECTEURS[number];
