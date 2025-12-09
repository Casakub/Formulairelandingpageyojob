/**
 * 📄 Types pour le contenu de la Landing Page YoJob
 */

export interface LandingPageContent {
  // Hero Section
  hero?: {
    badge?: {
      text: string;
      icon?: string;
    };
    title: string;
    subtitle: string;
    cta?: {
      primary: string;
      secondary: string;
    };
    stats?: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
  };

  // Stats Section
  stats?: Array<{
    value: number;
    suffix?: string;
    label: string;
    icon: string;
    color: string;
  }>;

  // Services Section
  services?: Array<{
    title: string;
    description: string;
    icon: string;
    color: string;
    link?: string;
  }>;

  // Network Section
  network?: {
    badge?: string;
    title: string;
    subtitle: string;
    waitlist?: {
      badge: string;
      title: string;
      description: string;
      features: string[];
      cta: string;
      placeholder: string;
    };
  };

  // Process Section
  process?: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
      icon: string;
      color: string;
    }>;
  };

  // Testimonials Section
  testimonials?: Array<{
    id: string;
    name: string;
    role: string;
    company: string;
    sector: string;
    quote: string;
    rating: number;
    avatar?: string;
  }>;

  // Sectors Section
  sectors?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    sectors?: Array<{
      name: string;
      icon: string;
      color: string;
    }>;
  };

  // CTA / Contact Section
  cta?: {
    title: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    form: {
      title: string;
      fields: {
        name: string;
        email: string;
        phone: string;
        company: string;
        needType: string;
        message: string;
      };
      needTypes: string[];
      submitButton: string;
      securityMessage: string;
      successMessage: string;
    };
  };

  // CTA / Contact Form Section (New Structure)
  ctaForm?: {
    badge: string;
    title: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      title: string;
      description?: string;
    }>;
    form: {
      fields: {
        name: {
          label: string;
          placeholder: string;
        };
        email: {
          label: string;
          placeholder: string;
        };
        phone: {
          label: string;
          placeholder: string;
        };
        company: {
          label: string;
          placeholder: string;
        };
        needType: {
          label: string;
          placeholder: string;
        };
        message: {
          label: string;
          placeholder: string;
        };
      };
      ctaLabel: string;
      securityNote: string;
      successMessage: string;
    };
  };

  // Footer Section
  footer?: {
    logo?: string;
    slogan: string;
    social?: {
      linkedin?: string;
      twitter?: string;
      facebook?: string;
    };
    services: Array<{
      label: string;
      link: string;
    }>;
    company: Array<{
      label: string;
      link: string;
    }>;
    contact: {
      address: string;
      phone: string;
      email: string;
    };
    legal: {
      copyright: string;
      links: Array<{
        label: string;
        link: string;
      }>;
    };
  };

  // SEO
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    // Open Graph
    ogType?: string; // website, article, etc.
    ogUrl?: string;
    // Twitter Cards
    twitterCard?: string; // summary, summary_large_image
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    // Référencement IA (ChatGPT, Perplexity, etc.)
    aiSummary?: string; // Résumé clair pour les IA (500 car)
    // Balises structurées
    canonicalUrl?: string;
    alternateLanguages?: Array<{ lang: string; url: string }>; // hreflang
    // FAQ Schema.org
    faq?: Array<{
      question: string;
      answer: string;
    }>;
    // Google Analytics & Tag Manager
    googleAnalyticsId?: string; // G-XXXXXXXXXX
    googleTagManagerId?: string; // GTM-XXXXXXX
  };

  // Navigation
  nav?: {
    links: Array<{
      label: string;
      href: string;
    }>;
    cta: string;
    languages: {
      fr: string;
      en: string;
    };
  };
}

export interface LandingContentState {
  [languageCode: string]: LandingPageContent;
}