/**
 * 🌍 TEMPLATE - TRADUCTIONS LANDING PAGE
 * 
 * Copiez ce fichier et remplacez [LANGUAGE_CODE] par le code langue (de, es, it, etc.)
 * Traduisez ensuite chaque texte dans votre langue cible.
 * 
 * @example
 * cp _template.ts de.ts
 * # Puis remplacer 'XX' par 'de' et traduire tous les textes
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const [LANGUAGE_CODE]LandingPage: LandingPageContent = {
  language: '[LANGUAGE_CODE]', // Ex: 'de', 'es', 'it'
  
  // SEO & Meta
  seo: {
    metaTitle: "[Traduire] YOJOB | Leader du recrutement européen - Intérim & CDI dans 27 pays",
    metaDescription: "[Traduire] Accédez à 500+ agences de recrutement dans 27 pays européens. Intérim, CDI, détachement de personnel : YOJOB simplifie vos recrutements internationaux.",
    slug: "/",
    h1: "[Traduire] Leader du recrutement européen",
    ogTitle: "[Traduire] YOJOB - Votre partenaire recrutement en Europe",
    ogDescription: "[Traduire] Recrutement européen simplifié : 500+ agences, 27 pays, toutes formalités gérées.",
    altTexts: {
      heroVisual: "[Traduire] Carte interactive de l'Europe montrant le réseau YOJOB",
      europeMap: "[Traduire] Carte des 27 pays européens couverts par YOJOB",
      logoFooter: "[Traduire] Logo YOJOB - Recrutement européen",
    },
    aiSummary: "[Traduire] YOJOB est le leader français du courtage en recrutement européen, avec un réseau de 500+ agences partenaires dans 27 pays.",
    faq: [
      {
        question: "[Traduire] Qu'est-ce que YOJOB ?",
        answer: "[Traduire] YOJOB est un courtier en recrutement européen qui connecte les entreprises françaises à un réseau de 500+ agences dans 27 pays européens."
      },
      {
        question: "[Traduire] Dans quels pays opérez-vous ?",
        answer: "[Traduire] Nous couvrons les 27 pays de l'Union Européenne plus la Norvège."
      },
      {
        question: "[Traduire] Quels types de recrutement proposez-vous ?",
        answer: "[Traduire] Nous proposons l'intérim européen, le recrutement en CDI/CDD, le détachement de personnel et du conseil en conformité."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "[Traduire] Accueil",
      services: "[Traduire] Services",
      network: "[Traduire] Réseau",
      contact: "[Traduire] Contact"
    },
    cta: "[Traduire] Demander un devis"
  },

  // Hero Section
  hero: {
    badge: "[Traduire] ⭐ Leader du recrutement européen",
    title: "[Traduire] Recrutez partout en Europe grâce à notre réseau de 500+ agences partenaires",
    subtitle: "[Traduire] Intérim, CDI, détachement : accédez au meilleur vivier de talents européens. Nous gérons toutes les formalités pour vous.",
    benefits: [
      "[Traduire] 27 pays européens couverts",
      "[Traduire] 500+ agences certifiées",
      "[Traduire] Gestion administrative complète",
      "[Traduire] Conformité garantie"
    ],
    ctaPrimaryLabel: "[Traduire] Obtenir un devis gratuit",
    ctaSecondaryLabel: "[Traduire] Découvrir nos services",
    stats: {
      agencies: { value: "500+", label: "[Traduire] agences partenaires" },
      countries: { value: "27", label: "[Traduire] pays européens" },
      missions: { value: "2000+", label: "[Traduire] missions réussies" }
    },
    floatingCards: {
      since: { label: "[Traduire] Depuis", value: "2014" },
      expertise: { value: "[Traduire] 10 ans", label: "[Traduire] D'expertise leader" },
      partners: { label: "[Traduire] Partenaires", value: "[Traduire] 500+ agences certifiées" },
      countries: { value: "27", label: "[Traduire] Pays européens" },
      certified: { value: "500+", label: "[Traduire] Agences certifiées" },
      activeNetwork: "[Traduire] Réseau actif"
    }
  },

  // Stats Section
  stats: {
    badge: "[Traduire] 📊 Nos Chiffres Clés",
    title: "[Traduire] Une expertise reconnue en Europe",
    items: [
      { value: "10", label: "[Traduire] années d'expertise", icon: "Target" },
      { value: "27", label: "[Traduire] pays couverts", icon: "Globe" },
      { value: "500", label: "[Traduire] agences partenaires", icon: "Network" },
      { value: "2000", label: "[Traduire] missions réalisées", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "[Traduire] 🎯 Nos Services",
    title: "[Traduire] Des solutions de recrutement adaptées à vos besoins",
    subtitle: "[Traduire] Que vous cherchiez du personnel temporaire, permanent ou détaché, nous avons la solution",
    services: [
      {
        icon: "Users",
        title: "[Traduire] Intérim Européen",
        description: "[Traduire] Recrutez du personnel temporaire qualifié partout en Europe. Nous gérons toutes les formalités administratives.",
        linkLabel: "[Traduire] En savoir plus",
        href: "/service/interim-europeen"
      },
      {
        icon: "Target",
        title: "[Traduire] Recrutement Spécialisé",
        description: "[Traduire] Trouvez les meilleurs talents pour vos postes en CDI/CDD grâce à notre réseau européen d'experts.",
        linkLabel: "[Traduire] En savoir plus",
        href: "/service/recrutement-specialise"
      },
      {
        icon: "ShieldCheck",
        title: "[Traduire] Conseil & Conformité",
        description: "[Traduire] Assurez-vous de respecter toutes les réglementations européennes en matière de détachement et mobilité.",
        linkLabel: "[Traduire] En savoir plus",
        href: "/service/conseil-conformite"
      }
    ]
  },

  // Network Section
  network: {
    badge: "[Traduire] 🌍 Réseau Européen",
    title: "[Traduire] 27 pays, 500+ agences partenaires certifiées",
    subtitle: "[Traduire] Notre force : un réseau dense et qualifié à travers toute l'Europe",
    mapLabel: "[Traduire] agences partenaires",
    waitlist: {
      badge: "[Traduire] 🚀 Nouveauté 2025",
      title: "[Traduire] Marketplace d'agences européennes",
      subtitle: "[Traduire] Bientôt : comparez et contactez directement les agences de notre réseau",
      features: [
        "[Traduire] ✓ Recherche multicritères (pays, secteur, métier)",
        "[Traduire] ✓ Comparaison instantanée des agences",
        "[Traduire] ✓ Avis clients vérifiés",
        "[Traduire] ✓ Mise en relation directe et sécurisée"
      ],
      formTitle: "[Traduire] Soyez parmi les premiers !",
      formSubtitle: "[Traduire] Inscrivez-vous à la liste d'attente pour accéder en avant-première",
      emailPlaceholder: "[Traduire] votre@email.com",
      ctaLabel: "[Traduire] Rejoindre la liste d'attente",
      securityNote: "[Traduire] 🔒 Vos données sont sécurisées et ne seront jamais partagées",
      successMessage: "[Traduire] Merci ! Vous êtes inscrit à la liste d'attente."
    }
  },

  // Steps Section
  steps: {
    badge: "[Traduire] 🚀 Comment ça marche",
    title: "[Traduire] Le recrutement européen simplifié en 4 étapes",
    subtitle: "[Traduire] Un processus clair et efficace pour vos recrutements",
    steps: [
      {
        number: "01",
        title: "[Traduire] Décrivez votre besoin",
        description: "[Traduire] Partagez-nous vos besoins en recrutement : métier, nombre de postes, durée, qualifications requises.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "[Traduire] Nous activons notre réseau",
        description: "[Traduire] Nos agences partenaires dans toute l'Europe identifient et sélectionnent les meilleurs profils disponibles.",
        icon: "Network"
      },
      {
        number: "03",
        title: "[Traduire] Validez les candidats",
        description: "[Traduire] Vous recevez les CV présélectionnés et menez les entretiens avec les candidats qui vous intéressent.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "[Traduire] Accueillez votre équipe",
        description: "[Traduire] Les candidats retenus rejoignent vos équipes. Nous gérons toutes les formalités administratives et légales.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "[Traduire] ⭐ Témoignages",
    title: "[Traduire] Ils nous font confiance",
    subtitle: "[Traduire] Découvrez les retours d'expérience de nos clients",
    testimonials: [
      {
        name: "[Traduire nom]",
        position: "[Traduire] Directeur RH",
        company: "[Traduire] TechBuild France",
        quote: "[Traduire] Grâce à YOJOB, nous avons pu recruter 15 maçons polonais qualifiés en 3 semaines. Un service professionnel et efficace !",
        rating: 5,
        sector: "[Traduire] BTP"
      },
      {
        name: "[Traduire nom]",
        position: "[Traduire] DRH",
        company: "[Traduire] AgroFrance",
        quote: "[Traduire] La gestion administrative est un vrai casse-tête quand on recrute à l'international. YOJOB s'occupe de tout, c'est un gain de temps énorme.",
        rating: 5,
        sector: "[Traduire] Agroalimentaire"
      },
      {
        name: "[Traduire nom]",
        position: "[Traduire] Responsable Production",
        company: "[Traduire] AutoParts Europe",
        quote: "[Traduire] Excellent accompagnement ! Nous avons trouvé des techniciens spécialisés en Allemagne que nous n'aurions jamais pu recruter seuls.",
        rating: 5,
        sector: "[Traduire] Industrie"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "[Traduire] 🏭 Secteurs d'activité",
    title: "[Traduire] Nous recrutons dans tous les secteurs",
    subtitle: "[Traduire] Notre réseau couvre l'ensemble des métiers et industries",
    sectors: [
      { icon: "Building2", name: "[Traduire] BTP & Construction", color: "orange" },
      { icon: "Factory", name: "[Traduire] Industrie", color: "blue" },
      { icon: "Tractor", name: "[Traduire] Agriculture", color: "green" },
      { icon: "UtensilsCrossed", name: "[Traduire] Hôtellerie-Restauration", color: "red" },
      { icon: "Heart", name: "[Traduire] Santé & Social", color: "pink" },
      { icon: "Laptop", name: "[Traduire] Tech & IT", color: "violet" },
      { icon: "Truck", name: "[Traduire] Logistique & Transport", color: "blue" },
      { icon: "ShoppingBag", name: "[Traduire] Commerce & Distribution", color: "green" },
      { icon: "Briefcase", name: "[Traduire] Services aux entreprises", color: "cyan" },
      { icon: "Wrench", name: "[Traduire] Maintenance & SAV", color: "orange" },
      { icon: "Plane", name: "[Traduire] Tourisme & Loisirs", color: "blue" },
      { icon: "Ship", name: "[Traduire] Maritime & Portuaire", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "[Traduire] 📞 Contactez-nous",
    title: "[Traduire] Prêt à recruter en Europe ?",
    subtitle: "[Traduire] Obtenez un devis gratuit et personnalisé en 24h",
    benefits: [
      {
        icon: "CheckCircle",
        title: "[Traduire] Réponse rapide",
        description: "[Traduire] Devis sous 24h ouvrées"
      },
      {
        icon: "ShieldCheck",
        title: "[Traduire] Sans engagement",
        description: "[Traduire] Gratuit et sans obligation"
      },
      {
        icon: "Users",
        title: "[Traduire] Accompagnement dédié",
        description: "[Traduire] Un expert à votre écoute"
      },
      {
        icon: "Globe",
        title: "[Traduire] Couverture européenne",
        description: "[Traduire] 27 pays accessibles"
      }
    ],
    form: {
      fields: {
        name: { label: "[Traduire] Nom complet", placeholder: "[Traduire] Jean Dupont" },
        email: { label: "[Traduire] Email professionnel", placeholder: "[Traduire] jean.dupont@entreprise.fr" },
        phone: { label: "[Traduire] Téléphone", placeholder: "[Traduire] +33 6 12 34 56 78" },
        company: { label: "[Traduire] Entreprise", placeholder: "[Traduire] Nom de votre entreprise" },
        needType: { label: "[Traduire] Type de besoin", placeholder: "[Traduire] Sélectionnez votre besoin" },
        message: { label: "[Traduire] Décrivez votre besoin", placeholder: "[Traduire] Ex: Recherche de 10 maçons pour un chantier de 6 mois..." }
      },
      ctaLabel: "[Traduire] Envoyer ma demande",
      securityNote: "[Traduire] 🔒 Vos données sont protégées et ne seront jamais partagées avec des tiers",
      successMessage: "[Traduire] Merci ! Nous avons bien reçu votre demande et vous recontacterons sous 24h."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "[Traduire] Votre partenaire recrutement en Europe"
    },
    columns: {
      services: {
        title: "[Traduire] Services",
        links: [
          { label: "[Traduire] Intérim Européen", href: "/service/interim-europeen" },
          { label: "[Traduire] Recrutement Spécialisé", href: "/service/recrutement-specialise" },
          { label: "[Traduire] Détachement de Personnel", href: "/service/detachement-personnel" },
          { label: "[Traduire] Conseil & Conformité", href: "/service/conseil-conformite" }
        ]
      },
      company: {
        title: "[Traduire] Entreprise",
        links: [
          { label: "[Traduire] À propos", href: "/a-propos" },
          { label: "[Traduire] Notre réseau", href: "/notre-reseau" },
          { label: "[Traduire] Nos secteurs", href: "/nos-secteurs" },
          { label: "[Traduire] Témoignages", href: "/temoignages" }
        ]
      },
      contact: {
        title: "[Traduire] Contact",
        address: "[Traduire] 123 Avenue des Champs-Élysées, 75008 Paris, France",
        phone: "+33 1 23 45 67 89",
        email: "contact@yojob.fr"
      }
    },
    social: {
      linkedin: "https://linkedin.com/company/yojob",
      twitter: "https://twitter.com/yojob",
      facebook: "https://facebook.com/yojob"
    },
    bottom: {
      copyright: "© 2025 YOJOB. [Traduire] Tous droits réservés.",
      madeWith: "[Traduire] Fait avec ❤️ pour faciliter le recrutement européen",
      legalLinks: [
        { label: "[Traduire] Mentions légales", href: "/mentions-legales" },
        { label: "[Traduire] CGV", href: "/cgv" },
        { label: "[Traduire] Politique de confidentialité", href: "/confidentialite" }
      ]
    }
  }
};
