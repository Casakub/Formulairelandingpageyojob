/**
 * 🌍 TRADUCTIONS DES PAGES SERVICES - REFACTORISÉ
 * 
 * Structure modulaire par page :
 * - /interimEuropeen/fr.ts, /interimEuropeen/en.ts, etc.
 * - /recrutementSpecialise/fr.ts, /recrutementSpecialise/en.ts, etc.
 * - /conseilConformite/fr.ts, /conseilConformite/en.ts, etc.
 * - /detachementPersonnel/fr.ts, /detachementPersonnel/en.ts, etc.
 * 
 * Avantages :
 * - ✅ Fichiers légers (~150 lignes max)
 * - ✅ Lazy loading possible
 * - ✅ Isolation parfaite entre les services
 * - ✅ Facile à maintenir et à retrouver
 * 
 * @version 2.0.0
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

// Import des traductions par service et par langue
import { frInterimEuropeen } from './interimEuropeen/fr';
import { enInterimEuropeen } from './interimEuropeen/en';

import { frRecrutementSpecialise } from './recrutementSpecialise/fr';
import { enRecrutementSpecialise } from './recrutementSpecialise/en';

// TODO: Import des autres services quand ils seront créés
// import { frConseilConformite } from './conseilConformite/fr';
// import { enConseilConformite } from './conseilConformite/en';
// import { frDetachementPersonnel } from './detachementPersonnel/fr';
// import { enDetachementPersonnel } from './detachementPersonnel/en';

/**
 * Loader de traductions par service
 * 
 * Cette fonction charge dynamiquement les traductions d'une page service
 * en fonction de la langue demandée.
 */
function loadServiceTranslation(
  servicePage: keyof ServiceTranslations,
  language: SupportedLanguage
): ServicePageTranslation {
  // Map des traductions disponibles
  const translations: Record<
    keyof ServiceTranslations,
    Partial<Record<SupportedLanguage, ServicePageTranslation>>
  > = {
    interimEuropeen: {
      fr: frInterimEuropeen,
      en: enInterimEuropeen,
      // TODO: Ajouter les autres langues
    },
    recrutementSpecialise: {
      fr: frRecrutementSpecialise,
      en: enRecrutementSpecialise,
      // TODO: Ajouter les autres langues
    },
    conseilConformite: {
      // TODO: Ajouter les traductions
    },
    detachementPersonnel: {
      // TODO: Ajouter les traductions
    },
  };

  // Récupérer la traduction demandée
  const serviceTranslations = translations[servicePage];
  const translation = serviceTranslations?.[language];

  if (translation) {
    return translation;
  }

  // Fallback sur FR
  const frTranslation = serviceTranslations?.fr;
  if (frTranslation) {
    console.warn(
      `Translation not found for ${servicePage}/${language}, falling back to FR`
    );
    return frTranslation;
  }

  // Fallback ultime (ne devrait jamais arriver)
  throw new Error(
    `No translation found for service page: ${servicePage} in language: ${language}`
  );
}

/**
 * Obtenir les traductions d'une page service
 * 
 * @param lang - Code langue (fr, en, de, etc.)
 * @param page - Nom de la page service
 * @returns Traductions de la page
 * 
 * @example
 * const t = getServiceTranslation('en', 'interimEuropeen');
 * console.log(t.hero.title); // "Recruit temporary staff anywhere in Europe"
 */
export function getServiceTranslation(
  lang: SupportedLanguage,
  page: keyof ServiceTranslations
): ServicePageTranslation {
  return loadServiceTranslation(page, lang);
}
