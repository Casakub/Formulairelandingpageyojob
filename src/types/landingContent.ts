/**
 * 🌍 Landing Page Content Model - Multilingue
 * Structure de données pour gérer tous les contenus de la landing YOJOB
 */

export type LanguageCode = 
  | 'fr' | 'en' | 'de' | 'es' | 'it' | 'pt' | 'nl' | 'pl' | 'ro' | 'bg'
  | 'hu' | 'cs' | 'sk' | 'hr' | 'sl' | 'lt' | 'lv' | 'et' | 'el' | 'sv'
  | 'da' | 'fi' | 'no';

export type TranslationStatus = 'to_translate' | 'in_progress' | 'validated';

export interface LanguageMetadata {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  status: TranslationStatus;
  lastUpdated?: string;
  translator?: string;
  notes?: string;
}

// Section Hero
export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  benefits: string[];
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  stats: {
    agencies: { value: string; label: string }; // "500+" / "agences partenaires"
    countries: { value: string; label: string }; // "27" / "pays européens"
    missions: { value: string; label: string }; // "2000+" / "missions réussies"
  };
  floatingCards?: {
    since?: { label: string; value: string }; // "Depuis" / "2014"
    expertise?: { value: string; label: string }; // "10 ans" / "D'expertise leader"
    partners?: { label: string; value: string }; // "Partenaires" / "500+ agences certifiées"
    countries?: { value: string; label: string }; // "27" / "Pays européens"
    certified?: { value: string; label: string }; // "500+" / "Agences certifiées"
    activeNetwork?: string; // "Réseau actif" / "Active network"
  };
}

// Section Services
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  linkLabel: string;
}

export interface ServicesContent {
  badge: string;
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

// Section Réseau Européen
export interface NetworkContent {
  badge: string;
  title: string;
  subtitle: string;
  mapLabel?: string; // "agences partenaires" / "partner agencies"
  waitlist: {
    badge: string;
    title: string;
    subtitle: string;
    features: string[];
    formTitle?: string; // "Soyez parmi les premiers !"
    formSubtitle?: string; // "Inscrivez-vous..."
    emailPlaceholder: string;
    ctaLabel: string;
    securityNote?: string; // "Vos données sont sécurisées..."
    successMessage?: string; // "Merci ! Vous êtes inscrit..."
  };
}

// Section Comment ça marche
export interface StepItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface StepsContent {
  badge: string;
  title: string;
  subtitle: string;
  steps: StepItem[];
}

// Section Témoignages
export interface TestimonialItem {
  name: string;
  position: string;
  company: string;
  avatar?: string;
  quote: string;
  rating: number;
  sector: string;
}

export interface TestimonialsContent {
  badge: string;
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

// Section Secteurs
export interface SectorItem {
  icon: string;
  name: string;
  color: string;
}

export interface SectorsContent {
  badge: string;
  title: string;
  subtitle: string;
  sectors: SectorItem[];
}

// Section CTA / Formulaire final
export interface CTAFormContent {
  badge: string;
  title: string;
  subtitle: string;
  benefits: {
    icon: string;
    title: string;
    description: string;
  }[];
  form: {
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      company: { label: string; placeholder: string };
      needType: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    ctaLabel: string;
    securityNote: string;
    successMessage: string;
  };
}

// Section Footer
export interface FooterContent {
  logo: {
    tagline: string;
  };
  columns: {
    services: {
      title: string;
      links: { label: string; href: string }[];
    };
    company: {
      title: string;
      links: { label: string; href: string }[];
    };
    contact: {
      title: string;
      address: string;
      phone: string;
      email: string;
    };
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  bottom: {
    copyright: string;
    madeWith?: string; // "Fait avec ❤️ pour faciliter le recrutement européen"
    legalLinks: { label: string; href: string }[];
  };
}

// SEO & Meta
export interface SEOContent {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  h1: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  altTexts: {
    heroVisual?: string;
    europeMap?: string;
    logoFooter?: string;
  };
  aiSummary: string; // Résumé pour les IA (500 car max)
  faq: {
    question: string;
    answer: string;
  }[];
}

// Structure complète du contenu de la landing
export interface LandingPageContent {
  language: LanguageCode;
  seo: SEOContent;
  header?: {
    nav: {
      home: string;
      services: string;
      network: string;
      contact: string;
    };
    cta: string;
  };
  hero: HeroContent;
  stats: {
    badge: string;
    title: string;
    items: {
      value: string;
      label: string;
      icon: string;
    }[];
  };
  services: ServicesContent;
  network: NetworkContent;
  steps: StepsContent;
  testimonials: TestimonialsContent;
  sectors: SectorsContent;
  ctaForm: CTAFormContent;
  footer: FooterContent;
}

// Collection complète multilingue
export type LandingContentCollection = {
  [K in LanguageCode]?: LandingPageContent;
};

// Métadonnées des langues supportées
export const SUPPORTED_LANGUAGES: LanguageMetadata[] = [
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', status: 'validated' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', status: 'validated' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', status: 'to_translate' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', status: 'to_translate' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', status: 'to_translate' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', status: 'to_translate' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', status: 'to_translate' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', status: 'to_translate' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', status: 'to_translate' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', status: 'to_translate' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', status: 'to_translate' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', status: 'to_translate' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', status: 'to_translate' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', status: 'to_translate' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', status: 'to_translate' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', status: 'to_translate' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', status: 'to_translate' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', status: 'to_translate' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', status: 'to_translate' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', status: 'to_translate' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', status: 'to_translate' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', status: 'to_translate' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', status: 'to_translate' },
];