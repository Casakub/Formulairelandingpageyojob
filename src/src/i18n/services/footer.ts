/**
 * 🦶 FOOTER TRANSLATIONS - SERVICES PAGES
 * 
 * Traductions du footer pour les pages de services
 * 
 * @version 1.0.0
 */

export interface FooterTranslations {
  logo: {
    tagline: string;
  };
  columns: {
    services: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    company: {
      title: string;
      links: Array<{ label: string; href: string }>;
    };
    contact: {
      title: string;
    };
  };
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  bottom: {
    copyright: string;
    links: {
      privacy: string;
      legal: string;
      terms: string;
    };
  };
}

export const footerTranslations: Record<'fr' | 'en', FooterTranslations> = {
  fr: {
    logo: {
      tagline: 'Leader du recrutement européen. 500+ agences partenaires dans 27 pays pour connecter les talents aux opportunités.'
    },
    columns: {
      services: {
        title: 'Services',
        links: [
          { label: 'Intérim Européen', href: '/services/interim-europeen' },
          { label: 'Recrutement Spécialisé', href: '/services/recrutement-specialise' },
          { label: 'Conseil & Conformité', href: '/services/conseil-conformite' },
          { label: 'Détachement de Personnel', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Entreprise',
        links: [
          { label: 'À propos', href: '/a-propos' },
          { label: 'Notre réseau', href: '/notre-reseau' },
          { label: 'Nos secteurs', href: '/nos-secteurs' },
          { label: 'Témoignages', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contact'
      }
    },
    contact: {
      address: 'Bordeaux, France',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. Tous droits réservés.',
      links: {
        privacy: 'Politique de confidentialité',
        legal: 'Mentions légales',
        terms: 'CGV'
      }
    }
  },
  en: {
    logo: {
      tagline: 'European recruitment leader. 500+ partner agencies in 27 countries connecting talents with opportunities.'
    },
    columns: {
      services: {
        title: 'Services',
        links: [
          { label: 'European Temporary Work', href: '/services/interim-europeen' },
          { label: 'Specialized Recruitment', href: '/services/recrutement-specialise' },
          { label: 'Consulting & Compliance', href: '/services/conseil-conformite' },
          { label: 'Staff Posting', href: '/services/detachement-personnel' }
        ]
      },
      company: {
        title: 'Company',
        links: [
          { label: 'About', href: '/a-propos' },
          { label: 'Our Network', href: '/notre-reseau' },
          { label: 'Our Sectors', href: '/nos-secteurs' },
          { label: 'Testimonials', href: '/temoignages' }
        ]
      },
      contact: {
        title: 'Contact'
      }
    },
    contact: {
      address: 'Bordeaux, France',
      phone: '+33 6 50 62 25 24',
      email: 'contact@yojob.fr'
    },
    bottom: {
      copyright: '© 2026 YOJOB. All rights reserved.',
      links: {
        privacy: 'Privacy Policy',
        legal: 'Legal Notice',
        terms: 'Terms & Conditions'
      }
    }
  }
};