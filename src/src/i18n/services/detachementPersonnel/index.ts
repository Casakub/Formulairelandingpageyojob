/**
 * 📦 INDEX DES TRADUCTIONS - DÉTACHEMENT DE PERSONNEL
 * 
 * Centralise toutes les traductions de la page Détachement de Personnel
 */

// === LANGUES DISPONIBLES ===
export { frDetachementPersonnel } from './fr';
export { enDetachementPersonnel } from './en';
export { deDetachementPersonnel } from './de';

// TODO: Ajouter les autres langues européennes
// export { esDetachementPersonnel } from './es';
// etc.

/**
 * 📋 LISTE DES LANGUES DISPONIBLES
 * 
 * Cette constante est utilisée par le LanguageSelector pour n'afficher
 * que les langues qui ont été traduites.
 * 
 * ⚠️ IMPORTANT : Ajouter ici chaque nouvelle langue après avoir créé
 * son fichier de traduction (ex: de.ts, es.ts, etc.)
 */
export const AVAILABLE_LANGUAGES_DETACHMENT_PERSONNEL = ['fr', 'en', 'de'] as const;

/**
 * Type pour les langues disponibles
 */
export type AvailableLanguageDetachmentPersonnel = typeof AVAILABLE_LANGUAGES_DETACHMENT_PERSONNEL[number];