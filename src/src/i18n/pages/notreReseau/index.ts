// === LANGUES DISPONIBLES ===
export { frNotreReseau } from './fr';
export { enNotreReseau } from './en';
export { deNotreReseau } from './de';
export { esNotreReseau } from './es';
export { itNotreReseau } from './it';
export { nlNotreReseau } from './nl';
export { ptNotreReseau } from './pt';
export { plNotreReseau } from './pl';
export { csNotreReseau } from './cs';
export { skNotreReseau } from './sk';
export { huNotreReseau } from './hu';
export { roNotreReseau } from './ro';
export { bgNotreReseau } from './bg';
export { hrNotreReseau } from './hr';
export { slNotreReseau } from './sl';
export { etNotreReseau } from './et';
export { lvNotreReseau } from './lv';
export { ltNotreReseau } from './lt';
export { elNotreReseau } from './el';
export { svNotreReseau } from './sv';
export { daNotreReseau } from './da';
export { fiNotreReseau } from './fi';

// TODO: Ajouter les autres langues européennes si besoin
// Langues actuellement disponibles : FR, EN, DE, ES, IT, NL, PT, PL, CS, SK, HU, RO, BG, HR, SL, ET, LV, LT, EL, SV, DA, FI

/**
 * 📋 LISTE DES LANGUES DISPONIBLES
 * 
 * Cette constante est utilisée par le LanguageSelector pour n'afficher
 * que les langues qui ont été traduites.
 * 
 * ⚠️ IMPORTANT : Ajouter ici chaque nouvelle langue après avoir créé
 * son fichier de traduction (ex: de.ts, es.ts, etc.)
 */
export const AVAILABLE_LANGUAGES_NOTRE_RESEAU = ['fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'el', 'sv', 'da', 'fi'] as const;