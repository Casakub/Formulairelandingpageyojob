/**
 * 📦 INDEX DES TRADUCTIONS - DÉTACHEMENT DE PERSONNEL
 * 
 * Centralise toutes les traductions de la page Détachement de Personnel
 */

// === LANGUES DISPONIBLES ===
export { frDetachementPersonnel } from './fr';
export { enDetachementPersonnel } from './en';
export { deDetachementPersonnel } from './de';
export { esDetachementPersonnel } from './es';
export { itDetachementPersonnel } from './it';
export { nlDetachementPersonnel } from './nl';
export { ptDetachementPersonnel } from './pt';
export { plDetachementPersonnel } from './pl';
export { csDetachementPersonnel } from './cs';
export { skDetachementPersonnel } from './sk';
export { huDetachementPersonnel } from './hu';
export { roDetachementPersonnel } from './ro';
export { bgDetachementPersonnel } from './bg';
export { hrDetachementPersonnel } from './hr';
export { slDetachementPersonnel } from './sl';
export { etDetachementPersonnel } from './et';
export { lvDetachementPersonnel } from './lv';
export { ltDetachementPersonnel } from './lt';
export { elDetachementPersonnel } from './el';
export { svDetachementPersonnel } from './sv';
export { daDetachementPersonnel } from './da';
export { fiDetachementPersonnel } from './fi';
export { noDetachementPersonnel } from './no';

// TODO: Ajouter les autres langues européennes si besoin
// Langues déjà complètes : FR, EN, DE, ES, IT, NL, PT, PL, CS, SK, HU, RO, BG, HR, SL, ET, LV, LT, EL, SV, DA, FI, NO

/**
 * 📋 LISTE DES LANGUES DISPONIBLES
 * 
 * Cette constante est utilisée par le LanguageSelector pour n'afficher
 * que les langues qui ont été traduites.
 * 
 * ⚠️ IMPORTANT : Ajouter ici chaque nouvelle langue après avoir créé
 * son fichier de traduction (ex: de.ts, es.ts, etc.)
 */
export const AVAILABLE_LANGUAGES_DETACHMENT_PERSONNEL = ['fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'el', 'sv', 'da', 'fi', 'no'] as const;

/**
 * Type pour les langues disponibles
 */
export type AvailableLanguageDetachmentPersonnel = typeof AVAILABLE_LANGUAGES_DETACHMENT_PERSONNEL[number];