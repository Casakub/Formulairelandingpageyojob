/**
 * 🌍 TRADUCTIONS DES PAGES SERVICES
 * 
 * Structure pour les 4 pages de services :
 * - Intérim Européen
 * - Recrutement Spécialisé  
 * - Conseil & Conformité
 * - Détachement de Personnel
 * 
 * @version 1.0.0
 */

import type { SupportedLanguage } from '../types';

export interface ServicePageTranslation {
  // Meta SEO
  meta: {
    title: string;
    description: string;
  };
  
  // Hero Section
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
  
  // Pour qui Section
  forWho: {
    badge: string;
    title: string;
    userCompanies: {
      title: string;
      description: string;
    };
    concerns: {
      title: string;
      items: string[];
    };
  };
  
  // Avantages
  benefits: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  
  // Process
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  
  // Secteurs
  sectors: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
    }>;
  };
  
  // Testimonial
  testimonial: {
    badge: string;
    quote: string;
    author: {
      name: string;
      role: string;
      sector: string;
    };
  };
  
  // FAQ
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  
  // CTA Final
  ctaFinal: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    features: string;
  };
}

export interface ServiceTranslations {
  interimEuropeen: ServicePageTranslation;
  recrutementSpecialise: ServicePageTranslation;
  conseilConformite: ServicePageTranslation;
  detachementPersonnel: ServicePageTranslation;
}

// Import des traductions par langue
import { frServices } from './locales/fr';
import { enServices } from './locales/en';
import { deServices } from './locales/de';
import { esServices } from './locales/es';
import { itServices } from './locales/it';
import { nlServices } from './locales/nl';
import { ptServices } from './locales/pt';
import { plServices } from './locales/pl';
import { csServices } from './locales/cs';
import { skServices } from './locales/sk';
import { huServices } from './locales/hu';
import { roServices } from './locales/ro';
import { bgServices } from './locales/bg';
import { hrServices } from './locales/hr';
import { slServices } from './locales/sl';
import { etServices } from './locales/et';
import { lvServices } from './locales/lv';
import { ltServices } from './locales/lt';
import { elServices } from './locales/el';
import { svServices } from './locales/sv';
import { daServices } from './locales/da';
import { fiServices } from './locales/fi';
import { noServices } from './locales/no';

const SERVICE_TRANSLATIONS: Partial<Record<SupportedLanguage, ServiceTranslations>> = {
  fr: frServices,
  en: enServices,
  de: deServices,
  es: esServices,
  it: itServices,
  nl: nlServices,
  pt: ptServices,
  pl: plServices,
  cs: csServices,
  sk: skServices,
  hu: huServices,
  ro: roServices,
  bg: bgServices,
  hr: hrServices,
  sl: slServices,
  et: etServices,
  lv: lvServices,
  lt: ltServices,
  el: elServices,
  sv: svServices,
  da: daServices,
  fi: fiServices,
  no: noServices,
};

/**
 * Obtenir les traductions d'une page service
 */
export function getServiceTranslation(
  lang: SupportedLanguage,
  page: keyof ServiceTranslations
): ServicePageTranslation {
  const translations = SERVICE_TRANSLATIONS[lang];
  
  if (translations && translations[page]) {
    return translations[page];
  }
  
  // Fallback sur FR
  const frTranslations = SERVICE_TRANSLATIONS.fr;
  if (frTranslations && frTranslations[page]) {
    return frTranslations[page];
  }
  
  // Fallback vide (ne devrait jamais arriver)
  throw new Error(`Translation not found for ${lang}/${page}`);
}

export { SERVICE_TRANSLATIONS };