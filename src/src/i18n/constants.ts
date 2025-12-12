/**
 * 🌍 CONSTANTES I18N
 * 
 * Définitions centralisées pour l'internationalisation
 */

/**
 * Liste des codes de langue qui ont des traductions complètes disponibles
 * 
 * IMPORTANT: Mettre à jour cette liste quand vous ajoutez une nouvelle traduction
 * dans /src/i18n/locales/
 */
export const TRANSLATED_LANGUAGE_CODES = [
  'fr', // 🇫🇷 Français
  'en', // 🇬🇧 English
  'de', // 🇩🇪 Deutsch
  'nl', // 🇳🇱 Nederlands
  'cz', // 🇨🇿 Čeština
  'sk', // 🇸🇰 Slovenčina
  'hr', // 🇭🇷 Hrvatski
  'sl', // 🇸🇮 Slovenščina
  'lt', // 🇱🇹 Lietuvių
  'lv', // 🇱🇻 Latviešu
  'ee', // 🇪🇪 Eesti
  'el', // 🇬🇷 Ελληνικά
  'sv', // 🇸🇪 Svenska
  'da', // 🇩🇰 Dansk
  'fi', // 🇫🇮 Suomi
  'ro', // 🇷🇴 Română
  'pt', // 🇵🇹 Português
  'es', // 🇪🇸 Español
  'it', // 🇮🇹 Italiano
  'pl', // 🇵🇱 Polski
  'bg', // 🇧🇬 Български
  'hu', // 🇭🇺 Magyar
] as const;

/**
 * Type pour les codes de langue traduits
 */
export type TranslatedLanguageCode = typeof TRANSLATED_LANGUAGE_CODES[number];

/**
 * Vérifie si un code de langue est traduit
 */
export function isLanguageTranslated(code: string): code is TranslatedLanguageCode {
  return TRANSLATED_LANGUAGE_CODES.includes(code as TranslatedLanguageCode);
}