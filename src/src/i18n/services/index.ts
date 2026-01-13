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
import { csRecrutementSpecialise } from './recrutementSpecialise/cs';
import { skRecrutementSpecialise } from './recrutementSpecialise/sk';
import { huRecrutementSpecialise } from './recrutementSpecialise/hu';
import { roRecrutementSpecialise } from './recrutementSpecialise/ro';
import { bgRecrutementSpecialise } from './recrutementSpecialise/bg';
import { hrRecrutementSpecialise } from './recrutementSpecialise/hr';
import { slRecrutementSpecialise } from './recrutementSpecialise/sl';
import { etRecrutementSpecialise } from './recrutementSpecialise/et';
import { lvRecrutementSpecialise } from './recrutementSpecialise/lv';
import { ltRecrutementSpecialise } from './recrutementSpecialise/lt';
import { elRecrutementSpecialise } from './recrutementSpecialise/el';
import { svRecrutementSpecialise } from './recrutementSpecialise/sv';
import { daRecrutementSpecialise } from './recrutementSpecialise/da';
import { fiRecrutementSpecialise } from './recrutementSpecialise/fi';
import { noRecrutementSpecialise } from './recrutementSpecialise/no';

// === IMPORTS CONSEIL & CONFORMITÉ ===
import { frConseilConformite } from './conseilConformite/fr';
import { enConseilConformite } from './conseilConformite/en';
import { deConseilConformite } from './conseilConformite/de';
import { esConseilConformite } from './conseilConformite/es';
import { itConseilConformite } from './conseilConformite/it';
import { nlConseilConformite } from './conseilConformite/nl';
import { ptConseilConformite } from './conseilConformite/pt';
import { plConseilConformite } from './conseilConformite/pl';
import { csConseilConformite } from './conseilConformite/cs';
import { skConseilConformite } from './conseilConformite/sk';
import { huConseilConformite } from './conseilConformite/hu';
import { roConseilConformite } from './conseilConformite/ro';
import { bgConseilConformite } from './conseilConformite/bg';
import { hrConseilConformite } from './conseilConformite/hr';
import { slConseilConformite } from './conseilConformite/sl';
import { etConseilConformite } from './conseilConformite/et';
import { lvConseilConformite } from './conseilConformite/lv';
import { ltConseilConformite } from './conseilConformite/lt';
import { elConseilConformite } from './conseilConformite/el';
import { svConseilConformite } from './conseilConformite/sv';
import { daConseilConformite } from './conseilConformite/da';
import { fiConseilConformite } from './conseilConformite/fi';
import { noConseilConformite } from './conseilConformite/no';

// === IMPORTS DÉTACHEMENT DE PERSONNEL ===
import { frDetachementPersonnel } from './detachementPersonnel/fr';
import { enDetachementPersonnel } from './detachementPersonnel/en';
import { deDetachementPersonnel } from './detachementPersonnel/de';
import { esDetachementPersonnel } from './detachementPersonnel/es';
import { itDetachementPersonnel } from './detachementPersonnel/it';
import { nlDetachementPersonnel } from './detachementPersonnel/nl';
import { ptDetachementPersonnel } from './detachementPersonnel/pt';
import { plDetachementPersonnel } from './detachementPersonnel/pl';
import { csDetachementPersonnel } from './detachementPersonnel/cs';
import { skDetachementPersonnel } from './detachementPersonnel/sk';
import { huDetachementPersonnel } from './detachementPersonnel/hu';
import { roDetachementPersonnel } from './detachementPersonnel/ro';
import { bgDetachementPersonnel } from './detachementPersonnel/bg';
import { hrDetachementPersonnel } from './detachementPersonnel/hr';
import { slDetachementPersonnel } from './detachementPersonnel/sl';
import { etDetachementPersonnel } from './detachementPersonnel/et';
import { lvDetachementPersonnel } from './detachementPersonnel/lv';
import { ltDetachementPersonnel } from './detachementPersonnel/lt';
import { elDetachementPersonnel } from './detachementPersonnel/el';
import { svDetachementPersonnel } from './detachementPersonnel/sv';
import { daDetachementPersonnel } from './detachementPersonnel/da';
import { fiDetachementPersonnel } from './detachementPersonnel/fi';
import { noDetachementPersonnel } from './detachementPersonnel/no';

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
      cs: csRecrutementSpecialise,
      sk: skRecrutementSpecialise,
      hu: huRecrutementSpecialise,
      ro: roRecrutementSpecialise,
      bg: bgRecrutementSpecialise,
      hr: hrRecrutementSpecialise,
      sl: slRecrutementSpecialise,
      et: etRecrutementSpecialise,
      lv: lvRecrutementSpecialise,
      lt: ltRecrutementSpecialise,
      el: elRecrutementSpecialise,
      sv: svRecrutementSpecialise,
      da: daRecrutementSpecialise,
      fi: fiRecrutementSpecialise,
      no: noRecrutementSpecialise,
    },
    conseilConformite: {
      fr: frConseilConformite,
      en: enConseilConformite,
      de: deConseilConformite,
      es: esConseilConformite,
      it: itConseilConformite,
      nl: nlConseilConformite,
      pt: ptConseilConformite,
      pl: plConseilConformite,
      cs: csConseilConformite,
      sk: skConseilConformite,
      hu: huConseilConformite,
      ro: roConseilConformite,
      bg: bgConseilConformite,
      hr: hrConseilConformite,
      sl: slConseilConformite,
      et: etConseilConformite,
      lv: lvConseilConformite,
      lt: ltConseilConformite,
      el: elConseilConformite,
      sv: svConseilConformite,
      da: daConseilConformite,
      fi: fiConseilConformite,
      no: noConseilConformite,
    },
    detachementPersonnel: {
      fr: frDetachementPersonnel,
      en: enDetachementPersonnel,
      de: deDetachementPersonnel,
      es: esDetachementPersonnel,
      it: itDetachementPersonnel,
      nl: nlDetachementPersonnel,
      pt: ptDetachementPersonnel,
      pl: plDetachementPersonnel,
      cs: csDetachementPersonnel,
      sk: skDetachementPersonnel,
      hu: huDetachementPersonnel,
      ro: roDetachementPersonnel,
      bg: bgDetachementPersonnel,
      hr: hrDetachementPersonnel,
      sl: slDetachementPersonnel,
      et: etDetachementPersonnel,
      lv: lvDetachementPersonnel,
      lt: ltDetachementPersonnel,
      el: elDetachementPersonnel,
      sv: svDetachementPersonnel,
      da: daDetachementPersonnel,
      fi: fiDetachementPersonnel,
      no: noDetachementPersonnel,
    },
  };

  // Récupérer la traduction demandée
  const serviceTranslations = translations[servicePage];
  const translation = serviceTranslations?.[language];

  if (translation) {
    return translation;
  }

  // Fallback sur FR si la langue n'existe pas
  const frTranslation = serviceTranslations?.fr;
  if (frTranslation) {
    // Ne logger qu'en développement
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[i18n] Translation for "${language}" not available in ${servicePage}, using French fallback`
      );
    }
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