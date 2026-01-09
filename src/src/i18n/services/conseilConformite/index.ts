/**
 * 🌍 TRADUCTIONS CONSEIL & CONFORMITÉ - INDEX
 * 
 * @version 1.0.0
 */

// === LANGUES DISPONIBLES ===
export { frConseilConformite } from './fr';
export { enConseilConformite } from './en';
export { deConseilConformite } from './de';
export { esConseilConformite } from './es';
export { itConseilConformite } from './it';
export { nlConseilConformite } from './nl';
export { ptConseilConformite } from './pt';
export { plConseilConformite } from './pl';
export { csConseilConformite } from './cs';
export { skConseilConformite } from './sk';
export { huConseilConformite } from './hu';
export { roConseilConformite } from './ro';
export { bgConseilConformite } from './bg';
export { hrConseilConformite } from './hr';
export { slConseilConformite } from './sl';
export { etConseilConformite } from './et';
export { lvConseilConformite } from './lv';
export { ltConseilConformite } from './lt';
export { elConseilConformite } from './el';
export { svConseilConformite } from './sv';
export { daConseilConformite } from './da';
export { fiConseilConformite } from './fi';
export { noConseilConformite } from './no';

// TODO: Ajouter les autres langues européennes
// export { gaConseilConformite } from './ga';
// etc.

/**
 * 📋 LISTE DES LANGUES DISPONIBLES
 * 
 * Cette constante est utilisée par le LanguageSelector pour n'afficher
 * que les langues qui ont été traduites.
 * 
 * ⚠️ IMPORTANT : Ajouter ici chaque nouvelle langue après avoir créé
 * son fichier de traduction (ex: de.ts, es.ts, etc.)
 * 
 * 🇪🇺 23 langues officielles UE + 🇳🇴 Norvégien (EEE)
 */
export const AVAILABLE_LANGUAGES_CONSEIL_CONFORMITE = ['fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'el', 'sv', 'da', 'fi', 'no'] as const;