/**
 * 📦 INDEX DES TRADUCTIONS - PAGE À PROPOS
 * 
 * Centralise toutes les traductions de la page À Propos
 */

// === LANGUES DISPONIBLES ===
export { frAPropos } from './fr';
export { enAPropos } from './en';
export { deAPropos } from './de';
export { esAPropos } from './es';
export { itAPropos } from './it';
export { nlAPropos } from './nl';
export { ptAPropos } from './pt';
export { plAPropos } from './pl';
export { csAPropos } from './cs';
export { skAPropos } from './sk';
export { huAPropos } from './hu';
export { roAPropos } from './ro';
export { bgAPropos } from './bg';
export { hrAPropos } from './hr';
export { slAPropos } from './sl';
export { etAPropos } from './et';
export { lvAPropos } from './lv';
export { ltAPropos } from './lt';
export { elAPropos } from './el';
export { svAPropos } from './sv';
export { daAPropos } from './da';
export { fiAPropos } from './fi';
export { noAPropos } from './no';

// TODO: Ajouter les autres langues européennes si besoin
// Langues actuellement disponibles : FR, EN, DE, ES, IT, NL, PT, PL, CS, SK, HU, RO, BG, HR, SL, ET, LV, LT, EL, SV, DA, FI, NO

/**
 * 📋 LISTE DES LANGUES DISPONIBLES
 * 
 * Cette constante est utilisée par le LanguageSelector pour n'afficher
 * que les langues qui ont été traduites.
 * 
 * ⚠️ IMPORTANT : Ajouter ici chaque nouvelle langue après avoir créé
 * son fichier de traduction (ex: de.ts, es.ts, etc.)
 */
export const AVAILABLE_LANGUAGES_A_PROPOS = ['fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'el', 'sv', 'da', 'fi', 'no'] as const;

/**
 * Type pour les langues disponibles
 */
export type AvailableLanguageAPropos = typeof AVAILABLE_LANGUAGES_A_PROPOS[number];