/**
 * Helper pour traduire les données du récapitulatif
 * Accepte directement les clés techniques (ex: "metallurgie", "soudeur", "niveau_3")
 */

import type { DevisLanguage } from '../src/i18n/devis/types';
import { fr } from '../src/i18n/devis/locales/fr';
import { ro } from '../src/i18n/devis/locales/ro';
import { en } from '../src/i18n/devis/locales/en';
import { de } from '../src/i18n/devis/locales/de';
import { es } from '../src/i18n/devis/locales/es';
import { pl } from '../src/i18n/devis/locales/pl';

// Map des traductions
const TRANSLATIONS_MAP = {
  fr,
  ro,
  en,
  de,
  es,
  pl,
};

// Mapping des pays français vers les clés de traduction
const PAYS_KEYS: Record<string, string> = {
  'France': 'france',
  'Allemagne': 'allemagne',
  'Autriche': 'autriche',
  'Belgique': 'belgique',
  'Bulgarie': 'bulgarie',
  'Croatie': 'croatie',
  'Chypre': 'chypre',
  'Danemark': 'danemark',
  'Espagne': 'espagne',
  'Estonie': 'estonie',
  'Finlande': 'finlande',
  'Grèce': 'grece',
  'Hongrie': 'hongrie',
  'Irlande': 'irlande',
  'Italie': 'italie',
  'Lettonie': 'lettonie',
  'Lituanie': 'lituanie',
  'Luxembourg': 'luxembourg',
  'Malte': 'malte',
  'Pays-Bas': 'pays_bas',
  'Pologne': 'pologne',
  'Portugal': 'portugal',
  'République tchèque': 'republique_tcheque',
  'Roumanie': 'roumanie',
  'Slovaquie': 'slovaquie',
  'Slovénie': 'slovenie',
  'Suède': 'suede',
};

/**
 * Traduit un nom de secteur (accepte clé technique ou label français)
 * @param secteur - Clé technique (ex: "metallurgie") ou label français (ex: "Métallurgie")
 */
export function translateSecteur(secteur: string, lang: DevisLanguage): string {
  const translations = TRANSLATIONS_MAP[lang];
  
  // Essayer d'abord comme clé technique directe
  if (translations?.secteurs?.[secteur as keyof typeof translations.secteurs]) {
    return (translations.secteurs[secteur as keyof typeof translations.secteurs] as any).label;
  }
  
  return secteur; // Fallback
}

/**
 * Traduit un nom de poste (accepte clé technique)
 * @param secteur - Clé technique du secteur (ex: "metallurgie")
 * @param poste - Clé technique du poste (ex: "soudeur")
 */
export function translatePoste(secteur: string, poste: string, lang: DevisLanguage): string {
  const translations = TRANSLATIONS_MAP[lang];
  
  if (translations?.secteurs?.[secteur as keyof typeof translations.secteurs]) {
    const secteurData = translations.secteurs[secteur as keyof typeof translations.secteurs] as any;
    if (secteurData?.postes?.[poste]) {
      return secteurData.postes[poste];
    }
  }
  
  return poste; // Fallback
}

/**
 * Traduit une classification (accepte clé technique)
 * @param secteur - Clé technique du secteur (ex: "metallurgie")
 * @param classification - Clé technique de la classification (ex: "niveau_3")
 */
export function translateClassification(secteur: string, classification: string, lang: DevisLanguage): string {
  const translations = TRANSLATIONS_MAP[lang];
  
  if (translations?.secteurs?.[secteur as keyof typeof translations.secteurs]) {
    const secteurData = translations.secteurs[secteur as keyof typeof translations.secteurs] as any;
    if (secteurData?.classifications?.[classification]) {
      return secteurData.classifications[classification];
    }
  }
  
  return classification; // Fallback
}

/**
 * Traduit un nom de pays (accepte label français)
 * @param pays - Label français (ex: "Roumanie")
 */
export function translatePays(pays: string, lang: DevisLanguage): string {
  const key = PAYS_KEYS[pays];
  const translations = TRANSLATIONS_MAP[lang];
  
  if (key && translations?.pays?.[key as keyof typeof translations.pays]) {
    return translations.pays[key as keyof typeof translations.pays] as string;
  }
  
  return pays; // Fallback
}
