/**
 * 🗺️ INDEX DES TRADUCTIONS - COMPOSANT EUROPE MAP
 * 
 * Centralise toutes les traductions du composant EuropeMap
 * 
 * @version 1.0.0
 */

export { frEuropeMap } from './fr';
export { enEuropeMap } from './en';
export { deEuropeMap } from './de';
export { esEuropeMap } from './es';
export { itEuropeMap } from './it';
export { nlEuropeMap } from './nl';
export { ptEuropeMap } from './pt';
export { plEuropeMap } from './pl';
export { csEuropeMap } from './cs';
export { skEuropeMap } from './sk';
export { huEuropeMap } from './hu';
export { roEuropeMap } from './ro';
export { bgEuropeMap } from './bg';
export { hrEuropeMap } from './hr';
export { slEuropeMap } from './sl';
export { etEuropeMap } from './et';
export { lvEuropeMap } from './lv';
export { ltEuropeMap } from './lt';
export { elEuropeMap } from './el';
export { svEuropeMap } from './sv';
export { daEuropeMap } from './da';
export { fiEuropeMap } from './fi';
export { noEuropeMap } from './no';

/**
 * Liste des langues disponibles pour le composant EuropeMap
 */
export const AVAILABLE_LANGUAGES_EUROPE_MAP = [
  'fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl', 
  'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 
  'lv', 'lt', 'el', 'sv', 'da', 'fi', 'no'
] as const;

/**
 * Type pour les langues supportées du composant EuropeMap
 */
export type EuropeMapLanguage = typeof AVAILABLE_LANGUAGES_EUROPE_MAP[number];