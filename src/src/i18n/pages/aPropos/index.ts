/**
 * 📦 INDEX DES TRADUCTIONS - PAGE À PROPOS
 * 
 * Centralise toutes les traductions de la page À Propos
 */

// === LANGUES DISPONIBLES ===
export { frAPropos } from './fr';
export { enAPropos } from './en';

// TODO: Ajouter les autres langues européennes si besoin
// Langues actuellement disponibles : FR, EN

/**
 * 📋 LISTE DES LANGUES DISPONIBLES
 * 
 * Cette constante est utilisée par le LanguageSelector pour n'afficher
 * que les langues qui ont été traduites.
 * 
 * ⚠️ IMPORTANT : Ajouter ici chaque nouvelle langue après avoir créé
 * son fichier de traduction (ex: de.ts, es.ts, etc.)
 */
export const AVAILABLE_LANGUAGES_A_PROPOS = ['fr', 'en'] as const;

/**
 * Type pour les langues disponibles
 */
export type AvailableLanguageAPropos = typeof AVAILABLE_LANGUAGES_A_PROPOS[number];
