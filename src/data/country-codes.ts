// Codes pays européens avec drapeaux et formats de téléphone
// 27 pays de l'Union Européenne

export interface CountryCode {
  code: string;        // Code ISO (FR, DE, etc.)
  dialCode: string;    // Code téléphonique (+33, +49, etc.)
  flag: string;        // Emoji drapeau
  name: {
    fr: string;
    en: string;
    de: string;
    es: string;
    pl: string;
    ro: string;
  };
  phoneLength: number; // Longueur du numéro national (sans code pays)
  placeholder: string; // Exemple de format
}

export const EU_COUNTRY_CODES: CountryCode[] = [
  // Pays MVP (Phase 1)
  {
    code: 'FR',
    dialCode: '+33',
    flag: '🇫🇷',
    name: { fr: 'France', en: 'France', de: 'Frankreich', es: 'Francia', pl: 'Francja', ro: 'Franța' },
    phoneLength: 9,
    placeholder: '6 12 34 56 78'
  },
  {
    code: 'DE',
    dialCode: '+49',
    flag: '🇩🇪',
    name: { fr: 'Allemagne', en: 'Germany', de: 'Deutschland', es: 'Alemania', pl: 'Niemcy', ro: 'Germania' },
    phoneLength: 11,
    placeholder: '151 23456789'
  },
  {
    code: 'ES',
    dialCode: '+34',
    flag: '🇪🇸',
    name: { fr: 'Espagne', en: 'Spain', de: 'Spanien', es: 'España', pl: 'Hiszpania', ro: 'Spania' },
    phoneLength: 9,
    placeholder: '612 34 56 78'
  },
  {
    code: 'PL',
    dialCode: '+48',
    flag: '🇵🇱',
    name: { fr: 'Pologne', en: 'Poland', de: 'Polen', es: 'Polonia', pl: 'Polska', ro: 'Polonia' },
    phoneLength: 9,
    placeholder: '501 234 567'
  },
  {
    code: 'RO',
    dialCode: '+40',
    flag: '🇷🇴',
    name: { fr: 'Roumanie', en: 'Romania', de: 'Rumänien', es: 'Rumania', pl: 'Rumunia', ro: 'România' },
    phoneLength: 9,
    placeholder: '712 345 678'
  },
  
  // Autres pays EU (Phase 2)
  {
    code: 'IT',
    dialCode: '+39',
    flag: '🇮🇹',
    name: { fr: 'Italie', en: 'Italy', de: 'Italien', es: 'Italia', pl: 'Włochy', ro: 'Italia' },
    phoneLength: 10,
    placeholder: '312 345 6789'
  },
  {
    code: 'PT',
    dialCode: '+351',
    flag: '🇵🇹',
    name: { fr: 'Portugal', en: 'Portugal', de: 'Portugal', es: 'Portugal', pl: 'Portugalia', ro: 'Portugalia' },
    phoneLength: 9,
    placeholder: '912 345 678'
  },
  {
    code: 'NL',
    dialCode: '+31',
    flag: '🇳🇱',
    name: { fr: 'Pays-Bas', en: 'Netherlands', de: 'Niederlande', es: 'Países Bajos', pl: 'Holandia', ro: 'Țările de Jos' },
    phoneLength: 9,
    placeholder: '6 12345678'
  },
  {
    code: 'BE',
    dialCode: '+32',
    flag: '🇧🇪',
    name: { fr: 'Belgique', en: 'Belgium', de: 'Belgien', es: 'Bélgica', pl: 'Belgia', ro: 'Belgia' },
    phoneLength: 9,
    placeholder: '470 12 34 56'
  },
  {
    code: 'AT',
    dialCode: '+43',
    flag: '🇦🇹',
    name: { fr: 'Autriche', en: 'Austria', de: 'Österreich', es: 'Austria', pl: 'Austria', ro: 'Austria' },
    phoneLength: 11,
    placeholder: '664 1234567'
  },
  {
    code: 'GR',
    dialCode: '+30',
    flag: '🇬🇷',
    name: { fr: 'Grèce', en: 'Greece', de: 'Griechenland', es: 'Grecia', pl: 'Grecja', ro: 'Grecia' },
    phoneLength: 10,
    placeholder: '691 234 5678'
  },
  {
    code: 'CZ',
    dialCode: '+420',
    flag: '🇨🇿',
    name: { fr: 'Tchéquie', en: 'Czech Republic', de: 'Tschechien', es: 'República Checa', pl: 'Czechy', ro: 'Cehia' },
    phoneLength: 9,
    placeholder: '601 123 456'
  },
  {
    code: 'HU',
    dialCode: '+36',
    flag: '🇭🇺',
    name: { fr: 'Hongrie', en: 'Hungary', de: 'Ungarn', es: 'Hungría', pl: 'Węgry', ro: 'Ungaria' },
    phoneLength: 9,
    placeholder: '20 123 4567'
  },
  {
    code: 'SE',
    dialCode: '+46',
    flag: '🇸🇪',
    name: { fr: 'Suède', en: 'Sweden', de: 'Schweden', es: 'Suecia', pl: 'Szwecja', ro: 'Suedia' },
    phoneLength: 9,
    placeholder: '70 123 45 67'
  },
  {
    code: 'DK',
    dialCode: '+45',
    flag: '🇩🇰',
    name: { fr: 'Danemark', en: 'Denmark', de: 'Dänemark', es: 'Dinamarca', pl: 'Dania', ro: 'Danemarca' },
    phoneLength: 8,
    placeholder: '20 12 34 56'
  },
  {
    code: 'FI',
    dialCode: '+358',
    flag: '🇫🇮',
    name: { fr: 'Finlande', en: 'Finland', de: 'Finnland', es: 'Finlandia', pl: 'Finlandia', ro: 'Finlanda' },
    phoneLength: 10,
    placeholder: '40 1234567'
  },
  {
    code: 'IE',
    dialCode: '+353',
    flag: '🇮🇪',
    name: { fr: 'Irlande', en: 'Ireland', de: 'Irland', es: 'Irlanda', pl: 'Irlandia', ro: 'Irlanda' },
    phoneLength: 9,
    placeholder: '85 123 4567'
  },
  {
    code: 'SK',
    dialCode: '+421',
    flag: '🇸🇰',
    name: { fr: 'Slovaquie', en: 'Slovakia', de: 'Slowakei', es: 'Eslovaquia', pl: 'Słowacja', ro: 'Slovacia' },
    phoneLength: 9,
    placeholder: '901 123 456'
  },
  {
    code: 'BG',
    dialCode: '+359',
    flag: '🇧🇬',
    name: { fr: 'Bulgarie', en: 'Bulgaria', de: 'Bulgarien', es: 'Bulgaria', pl: 'Bułgaria', ro: 'Bulgaria' },
    phoneLength: 9,
    placeholder: '87 123 4567'
  },
  {
    code: 'HR',
    dialCode: '+385',
    flag: '🇭🇷',
    name: { fr: 'Croatie', en: 'Croatia', de: 'Kroatien', es: 'Croacia', pl: 'Chorwacja', ro: 'Croația' },
    phoneLength: 9,
    placeholder: '91 234 5678'
  },
  {
    code: 'SI',
    dialCode: '+386',
    flag: '🇸🇮',
    name: { fr: 'Slovénie', en: 'Slovenia', de: 'Slowenien', es: 'Eslovenia', pl: 'Słowenia', ro: 'Slovenia' },
    phoneLength: 8,
    placeholder: '31 234 567'
  },
  {
    code: 'LT',
    dialCode: '+370',
    flag: '🇱🇹',
    name: { fr: 'Lituanie', en: 'Lithuania', de: 'Litauen', es: 'Lituania', pl: 'Litwa', ro: 'Lituania' },
    phoneLength: 8,
    placeholder: '612 34567'
  },
  {
    code: 'LV',
    dialCode: '+371',
    flag: '🇱🇻',
    name: { fr: 'Lettonie', en: 'Latvia', de: 'Lettland', es: 'Letonia', pl: 'Łotwa', ro: 'Letonia' },
    phoneLength: 8,
    placeholder: '21 234 567'
  },
  {
    code: 'EE',
    dialCode: '+372',
    flag: '🇪🇪',
    name: { fr: 'Estonie', en: 'Estonia', de: 'Estland', es: 'Estonia', pl: 'Estonia', ro: 'Estonia' },
    phoneLength: 8,
    placeholder: '5123 4567'
  },
  {
    code: 'LU',
    dialCode: '+352',
    flag: '🇱🇺',
    name: { fr: 'Luxembourg', en: 'Luxembourg', de: 'Luxemburg', es: 'Luxemburgo', pl: 'Luksemburg', ro: 'Luxemburg' },
    phoneLength: 9,
    placeholder: '621 123 456'
  },
  {
    code: 'CY',
    dialCode: '+357',
    flag: '🇨🇾',
    name: { fr: 'Chypre', en: 'Cyprus', de: 'Zypern', es: 'Chipre', pl: 'Cypr', ro: 'Cipru' },
    phoneLength: 8,
    placeholder: '96 123456'
  },
  {
    code: 'MT',
    dialCode: '+356',
    flag: '🇲🇹',
    name: { fr: 'Malte', en: 'Malta', de: 'Malta', es: 'Malta', pl: 'Malta', ro: 'Malta' },
    phoneLength: 8,
    placeholder: '9696 1234'
  }
];

// Helper: Obtenir un pays par code ISO
export function getCountryByCode(code: string): CountryCode | undefined {
  return EU_COUNTRY_CODES.find(c => c.code === code);
}

// Helper: Obtenir un pays par dialCode
export function getCountryByDialCode(dialCode: string): CountryCode | undefined {
  return EU_COUNTRY_CODES.find(c => c.dialCode === dialCode);
}

// Helper: Suggérer le code pays depuis le nom du pays
export function suggestCountryCode(countryName: string): string {
  const normalized = countryName.toLowerCase().trim();
  
  const mapping: Record<string, string> = {
    'france': 'FR',
    'allemagne': 'DE',
    'germany': 'DE',
    'deutschland': 'DE',
    'espagne': 'ES',
    'spain': 'ES',
    'españa': 'ES',
    'pologne': 'PL',
    'poland': 'PL',
    'polska': 'PL',
    'roumanie': 'RO',
    'romania': 'RO',
    'românia': 'RO',
    'italie': 'IT',
    'italy': 'IT',
    'italia': 'IT',
    'portugal': 'PT',
    'pays-bas': 'NL',
    'netherlands': 'NL',
    'nederland': 'NL',
    'belgique': 'BE',
    'belgium': 'BE',
    'belgië': 'BE',
    'autriche': 'AT',
    'austria': 'AT',
    'österreich': 'AT',
    'grèce': 'GR',
    'greece': 'GR',
    'tchéquie': 'CZ',
    'czech republic': 'CZ',
    'hongrie': 'HU',
    'hungary': 'HU',
    'suède': 'SE',
    'sweden': 'SE',
    'sverige': 'SE',
    'danemark': 'DK',
    'denmark': 'DK',
    'danmark': 'DK',
    'finlande': 'FI',
    'finland': 'FI',
    'suomi': 'FI',
    'irlande': 'IE',
    'ireland': 'IE',
    'slovaquie': 'SK',
    'slovakia': 'SK',
    'bulgarie': 'BG',
    'bulgaria': 'BG',
    'croatie': 'HR',
    'croatia': 'HR',
    'hrvatska': 'HR',
    'slovénie': 'SI',
    'slovenia': 'SI',
    'slovenija': 'SI',
    'lituanie': 'LT',
    'lithuania': 'LT',
    'lietuva': 'LT',
    'lettonie': 'LV',
    'latvia': 'LV',
    'latvija': 'LV',
    'estonie': 'EE',
    'estonia': 'EE',
    'eesti': 'EE',
    'luxembourg': 'LU',
    'luxemburg': 'LU',
    'chypre': 'CY',
    'cyprus': 'CY',
    'malte': 'MT',
    'malta': 'MT'
  };
  
  return mapping[normalized] || 'FR'; // Par défaut France
}
