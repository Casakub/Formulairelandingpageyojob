/**
 * ISO 639-1 Language Codes
 * Liste complète des langues européennes supportées par YOJOB
 */

export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export const EUROPEAN_LANGUAGES: Language[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰', nativeName: 'Slovenčina' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺', nativeName: 'Magyar' },
  { code: 'ro', name: 'Română', flag: '🇷🇴', nativeName: 'Română' },
  { code: 'bg', name: 'Български', flag: '🇧🇬', nativeName: 'Български' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷', nativeName: 'Hrvatski' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮', nativeName: 'Slovenščina' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪', nativeName: 'Eesti' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻', nativeName: 'Latviešu' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹', nativeName: 'Lietuvių' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', nativeName: 'Svenska' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', nativeName: 'Dansk' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', nativeName: 'Suomi' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', nativeName: 'Norsk' },
];

/**
 * Obtenir une langue par son code
 */
export function getLanguageByCode(code: string): Language | undefined {
  return EUROPEAN_LANGUAGES.find((lang) => lang.code === code);
}

/**
 * Obtenir le nom d'une langue par son code
 */
export function getLanguageName(code: string): string {
  const lang = getLanguageByCode(code);
  return lang ? lang.name : code.toUpperCase();
}

/**
 * Obtenir le drapeau d'une langue par son code
 */
export function getLanguageFlag(code: string): string {
  const lang = getLanguageByCode(code);
  return lang ? lang.flag : '🏳️';
}

/**
 * Vérifier si un code langue est valide
 */
export function isValidLanguageCode(code: string): boolean {
  return EUROPEAN_LANGUAGES.some((lang) => lang.code === code);
}

/**
 * Obtenir tous les codes de langues
 */
export function getAllLanguageCodes(): string[] {
  return EUROPEAN_LANGUAGES.map((lang) => lang.code);
}
