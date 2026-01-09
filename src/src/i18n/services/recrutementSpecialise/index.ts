/**
 * 🌍 RECRUTEMENT SPÉCIALISÉ - Traductions
 * 
 * @version 1.0.0
 * @updated 2025-01-09
 */

// === LANGUES DISPONIBLES ===
export { frRecrutementSpecialise } from './fr';
export { enRecrutementSpecialise } from './en';
export { deRecrutementSpecialise } from './de';
export { esRecrutementSpecialise } from './es';
export { itRecrutementSpecialise } from './it';
export { nlRecrutementSpecialise } from './nl';
export { ptRecrutementSpecialise } from './pt';
export { plRecrutementSpecialise } from './pl';

// TODO: Ajouter les autres langues européennes
// export { csRecrutementSpecialise } from './cs';
// export { skRecrutementSpecialise } from './sk';
// export { huRecrutementSpecialise } from './hu';
// export { roRecrutementSpecialise } from './ro';
// export { bgRecrutementSpecialise } from './bg';
// export { hrRecrutementSpecialise } from './hr';
// export { slRecrutementSpecialise } from './sl';
// export { elRecrutementSpecialise } from './el';
// export { etRecrutementSpecialise } from './et';
// export { lvRecrutementSpecialise } from './lv';
// export { ltRecrutementSpecialise } from './lt';
// export { svRecrutementSpecialise } from './sv';
// export { daRecrutementSpecialise } from './da';
// export { fiRecrutementSpecialise } from './fi';
// export { noRecrutementSpecialise } from './no';

/**
 * 📋 LISTE DES LANGUES DISPONIBLES
 * 
 * Cette constante est utilisée par le LanguageSelector pour n'afficher
 * que les langues qui ont été traduites.
 * 
 * ⚠️ IMPORTANT : Ajouter ici chaque nouvelle langue après avoir créé
 * son fichier de traduction (ex: de.ts, es.ts, etc.)
 */
export const AVAILABLE_LANGUAGES_RECRUTEMENT_SPECIALISE = ['fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl'] as const;

/**
 * Type des langues disponibles
 */
export type RecrutementSpecialiseLanguage = typeof AVAILABLE_LANGUAGES_RECRUTEMENT_SPECIALISE[number];