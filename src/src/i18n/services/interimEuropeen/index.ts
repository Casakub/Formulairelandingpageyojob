/**
 * 🌍 INTÉRIM EUROPÉEN - Traductions
 * 
 * @version 2.0.0 - Migration complète depuis /locales/
 * @date 2025-01-09
 */

// === LANGUES PRINCIPALES ===
export { frInterimEuropeen } from './fr';
export { enInterimEuropeen } from './en';

// === EUROPE DE L'OUEST ===
export { deInterimEuropeen } from './de';
export { esInterimEuropeen } from './es';
export { itInterimEuropeen } from './it';
export { nlInterimEuropeen } from './nl';
export { ptInterimEuropeen } from './pt';

// === EUROPE CENTRALE ===
export { plInterimEuropeen } from './pl';
export { csInterimEuropeen } from './cs';
export { skInterimEuropeen } from './sk';
export { huInterimEuropeen } from './hu';

// === EUROPE DU SUD-EST ===
export { roInterimEuropeen } from './ro';
export { bgInterimEuropeen } from './bg';
export { hrInterimEuropeen } from './hr';
export { slInterimEuropeen } from './sl';
export { elInterimEuropeen } from './el';

// === EUROPE BALTE ===
export { etInterimEuropeen } from './et';
export { lvInterimEuropeen } from './lv';
export { ltInterimEuropeen } from './lt';

// === EUROPE NORDIQUE ===
export { svInterimEuropeen } from './sv';
export { daInterimEuropeen } from './da';
export { fiInterimEuropeen } from './fi';
export { noInterimEuropeen } from './no';

/**
 * Type pour les traductions Intérim Européen
 */
export interface InterimEuropeenTranslation {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: {
      primary: string;
      secondary: string;
    };
  };
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
  benefits: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  sectors: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{ name: string }>;
  };
  testimonial: {
    badge: string;
    quote: string;
    author: {
      name: string;
      role: string;
      sector: string;
    };
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  ctaFinal: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    features: string;
  };
}
