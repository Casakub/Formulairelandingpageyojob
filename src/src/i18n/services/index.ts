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
import { deInterimEuropeen } from './interimEuropeen/de';
import { esInterimEuropeen } from './interimEuropeen/es';
import { itInterimEuropeen } from './interimEuropeen/it';
import { nlInterimEuropeen } from './interimEuropeen/nl';
import { ptInterimEuropeen } from './interimEuropeen/pt';
import { plInterimEuropeen } from './interimEuropeen/pl';
import { csInterimEuropeen } from './interimEuropeen/cs';
import { skInterimEuropeen } from './interimEuropeen/sk';
import { huInterimEuropeen } from './interimEuropeen/hu';
import { roInterimEuropeen } from './interimEuropeen/ro';
import { bgInterimEuropeen } from './interimEuropeen/bg';
import { hrInterimEuropeen } from './interimEuropeen/hr';
import { slInterimEuropeen } from './interimEuropeen/sl';
import { elInterimEuropeen } from './interimEuropeen/el';
import { etInterimEuropeen } from './interimEuropeen/et';
import { lvInterimEuropeen } from './interimEuropeen/lv';
import { ltInterimEuropeen } from './interimEuropeen/lt';
import { svInterimEuropeen } from './interimEuropeen/sv';
import { daInterimEuropeen } from './interimEuropeen/da';
import { fiInterimEuropeen } from './interimEuropeen/fi';
import { noInterimEuropeen } from './interimEuropeen/no';

import { frRecrutementSpecialise } from './recrutementSpecialise/fr';
import { enRecrutementSpecialise } from './recrutementSpecialise/en';
import { deRecrutementSpecialise } from './recrutementSpecialise/de';
import { esRecrutementSpecialise } from './recrutementSpecialise/es';
import { itRecrutementSpecialise } from './recrutementSpecialise/it';
import { nlRecrutementSpecialise } from './recrutementSpecialise/nl';
import { ptRecrutementSpecialise } from './recrutementSpecialise/pt';
import { plRecrutementSpecialise } from './recrutementSpecialise/pl';

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
      de: deInterimEuropeen,
      es: esInterimEuropeen,
      it: itInterimEuropeen,
      nl: nlInterimEuropeen,
      pt: ptInterimEuropeen,
      pl: plInterimEuropeen,
      cs: csInterimEuropeen,
      sk: skInterimEuropeen,
      hu: huInterimEuropeen,
      ro: roInterimEuropeen,
      bg: bgInterimEuropeen,
      hr: hrInterimEuropeen,
      sl: slInterimEuropeen,
      el: elInterimEuropeen,
      et: etInterimEuropeen,
      lv: lvInterimEuropeen,
      lt: ltInterimEuropeen,
      sv: svInterimEuropeen,
      da: daInterimEuropeen,
      fi: fiInterimEuropeen,
      no: noInterimEuropeen,
    },
    recrutementSpecialise: {
      fr: frRecrutementSpecialise,
      en: enRecrutementSpecialise,
      de: deRecrutementSpecialise,
      es: esRecrutementSpecialise,
      it: itRecrutementSpecialise,
      nl: nlRecrutementSpecialise,
      pt: ptRecrutementSpecialise,
      pl: plRecrutementSpecialise,
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