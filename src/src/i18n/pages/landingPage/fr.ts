/**
 * 🇫🇷 TRADUCTIONS FRANÇAISES - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const frLandingPage: LandingPageContent = {
  language: 'fr',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Leader du recrutement européen - Intérim & CDI dans 27 pays",
    metaDescription: "Accédez à 500+ agences de recrutement dans 27 pays européens. Intérim, CDI, détachement de personnel : YOJOB simplifie vos recrutements internationaux.",
    slug: "/",
    h1: "Leader du recrutement européen",
    ogTitle: "YOJOB - Votre partenaire recrutement en Europe",
    ogDescription: "Recrutement européen simplifié : 500+ agences, 27 pays, toutes formalités gérées.",
    altTexts: {
      heroVisual: "Carte interactive de l'Europe montrant le réseau YOJOB",
      europeMap: "Carte des 27 pays européens couverts par YOJOB",
      logoFooter: "Logo YOJOB - Recrutement européen",
    },
    aiSummary: "YOJOB est le leader français du courtage en recrutement européen, avec un réseau de 500+ agences partenaires dans 27 pays. Nous facilitons l'intérim européen, le recrutement spécialisé, le détachement de personnel et offrons du conseil en conformité. Notre expertise permet aux entreprises de recruter rapidement et légalement partout en Europe, avec une gestion complète des formalités administratives.",
    faq: [
      {
        question: "Qu'est-ce que YOJOB ?",
        answer: "YOJOB est un courtier en recrutement européen qui connecte les entreprises françaises à un réseau de 500+ agences dans 27 pays européens pour faciliter l'intérim, le recrutement et le détachement de personnel."
      },
      {
        question: "Dans quels pays opérez-vous ?",
        answer: "Nous couvrons les 27 pays de l'Union Européenne plus la Norvège, soit une couverture complète de l'Europe de l'Ouest, du Nord, du Sud et de l'Est."
      },
      {
        question: "Quels types de recrutement proposez-vous ?",
        answer: "Nous proposons l'intérim européen, le recrutement en CDI/CDD, le détachement de personnel et du conseil en conformité pour garantir le respect des réglementations."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Accueil",
      services: "Services",
      network: "Réseau",
      blog: "Blog",
      contact: "Contact"
    },
    cta: "Demander un devis",
    survey: "Enquête Européenne"
  },

  // Hero Section
  hero: {
    badge: "⭐ Leader du recrutement européen",
    title: "Recrutez partout en Europe grâce à notre réseau de 500+ agences partenaires",
    subtitle: "Intérim, CDI, détachement : accédez au meilleur vivier de talents européens. Nous gérons toutes les formalités pour vous.",
    benefits: [
      "27 pays européens couverts",
      "500+ agences certifiées",
      "Gestion administrative complète",
      "Conformité garantie"
    ],
    ctaPrimaryLabel: "Obtenir un devis gratuit",
    ctaSecondaryLabel: "Découvrir nos services",
    stats: {
      agencies: { value: "500+", label: "agences partenaires" },
      countries: { value: "27", label: "pays européens" },
      missions: { value: "2000+", label: "missions réussies" }
    },
    floatingCards: {
      since: { label: "Depuis", value: "2014" },
      expertise: { value: "10 ans", label: "D'expertise leader" },
      partners: { label: "Partenaires", value: "500+ agences certifiées" },
      countries: { value: "27", label: "Pays européens" },
      certified: { value: "500+", label: "Agences certifiées" },
      activeNetwork: "Réseau actif"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Nos Chiffres Clés",
    title: "Une expertise reconnue en Europe",
    items: [
      { value: "10", label: "années d'expertise", icon: "Target" },
      { value: "27", label: "pays couverts", icon: "Globe" },
      { value: "500", label: "agences partenaires", icon: "Network" },
      { value: "2000", label: "missions réalisées", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Nos Services",
    title: "Des solutions de recrutement adaptées à vos besoins",
    subtitle: "Que vous cherchiez du personnel temporaire, permanent ou détaché, nous avons la solution",
    services: [
      {
        icon: "Users",
        title: "Intérim Européen",
        description: "Recrutez du personnel temporaire qualifié partout en Europe. Nous gérons toutes les formalités administratives.",
        linkLabel: "En savoir plus",
        href: "/service/interim-europeen"
      },
      {
        icon: "Target",
        title: "Recrutement Spécialisé",
        description: "Trouvez les meilleurs talents pour vos postes en CDI/CDD grâce à notre réseau européen d'experts.",
        linkLabel: "En savoir plus",
        href: "/service/recrutement-specialise"
      },
      {
        icon: "ShieldCheck",
        title: "Conseil & Conformité",
        description: "Assurez-vous de respecter toutes les réglementations européennes en matière de détachement et mobilité.",
        linkLabel: "En savoir plus",
        href: "/service/conseil-conformite"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Réseau Européen",
    title: "27 pays, 500+ agences partenaires certifiées",
    subtitle: "Notre force : un réseau dense et qualifié à travers toute l'Europe",
    mapLabel: "agences partenaires",
    waitlist: {
      badge: "🚀 Nouveauté 2025",
      title: "Marketplace d'agences européennes",
      subtitle: "Bientôt : comparez et contactez directement les agences de notre réseau",
      features: [
        "✓ Recherche multicritères (pays, secteur, métier)",
        "✓ Comparaison instantanée des agences",
        "✓ Avis clients vérifiés",
        "✓ Mise en relation directe et sécurisée"
      ],
      formTitle: "Soyez parmi les premiers !",
      formSubtitle: "Inscrivez-vous à la liste d'attente pour accéder en avant-première",
      emailPlaceholder: "votre@email.com",
      ctaLabel: "Rejoindre la liste d'attente",
      securityNote: "🔒 Vos données sont sécurisées et ne seront jamais partagées",
      successMessage: "Merci ! Vous êtes inscrit à la liste d'attente. Nous vous contacterons dès l'ouverture."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Comment ça marche",
    title: "Le recrutement européen simplifié en 4 étapes",
    subtitle: "Un processus clair et efficace pour vos recrutements",
    steps: [
      {
        number: "01",
        title: "Décrivez votre besoin",
        description: "Partagez-nous vos besoins en recrutement : métier, nombre de postes, durée, qualifications requises.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Nous activons notre réseau",
        description: "Nos agences partenaires dans toute l'Europe identifient et sélectionnent les meilleurs profils disponibles.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Validez les candidats",
        description: "Vous recevez les CV présélectionnés et menez les entretiens avec les candidats qui vous intéressent.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Accueillez votre équipe",
        description: "Les candidats retenus rejoignent vos équipes. Nous gérons toutes les formalités administratives et légales.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Témoignages",
    title: "Ils nous font confiance",
    subtitle: "Découvrez les retours d'expérience de nos clients",
    testimonials: [
      {
        name: "Pierre Durand",
        position: "Directeur RH",
        company: "TechBuild France",
        quote: "Grâce à YOJOB, nous avons pu recruter 15 maçons polonais qualifiés en 3 semaines. Un service professionnel et efficace !",
        rating: 5,
        sector: "BTP"
      },
      {
        name: "Sophie Martin",
        position: "DRH",
        company: "AgroFrance",
        quote: "La gestion administrative est un vrai casse-tête quand on recrute à l'international. YOJOB s'occupe de tout, c'est un gain de temps énorme.",
        rating: 5,
        sector: "Agroalimentaire"
      },
      {
        name: "Marc Lefebvre",
        position: "Responsable Production",
        company: "AutoParts Europe",
        quote: "Excellent accompagnement ! Nous avons trouvé des techniciens spécialisés en Allemagne que nous n'aurions jamais pu recruter seuls.",
        rating: 5,
        sector: "Industrie"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Secteurs d'activité",
    title: "Nous recrutons dans tous les secteurs",
    subtitle: "Notre réseau couvre l'ensemble des métiers et industries",
    sectors: [
      { icon: "Building2", name: "BTP & Construction", color: "orange" },
      { icon: "Factory", name: "Industrie", color: "blue" },
      { icon: "Tractor", name: "Agriculture", color: "green" },
      { icon: "UtensilsCrossed", name: "Hôtellerie-Restauration", color: "red" },
      { icon: "Heart", name: "Santé & Social", color: "pink" },
      { icon: "Laptop", name: "Tech & IT", color: "violet" },
      { icon: "Truck", name: "Logistique & Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Commerce & Distribution", color: "green" },
      { icon: "Briefcase", name: "Services aux entreprises", color: "cyan" },
      { icon: "Wrench", name: "Maintenance & SAV", color: "orange" },
      { icon: "Plane", name: "Tourisme & Loisirs", color: "blue" },
      { icon: "Ship", name: "Maritime & Portuaire", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Contactez-nous",
    title: "Prêt à recruter en Europe ?",
    subtitle: "Obtenez un devis gratuit et personnalisé en 24h",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Réponse rapide",
        description: "Devis sous 24h ouvrées"
      },
      {
        icon: "ShieldCheck",
        title: "Sans engagement",
        description: "Gratuit et sans obligation"
      },
      {
        icon: "Users",
        title: "Accompagnement dédié",
        description: "Un expert à votre écoute"
      },
      {
        icon: "Globe",
        title: "Couverture européenne",
        description: "27 pays accessibles"
      }
    ],
    form: {
      fields: {
        name: { label: "Nom complet", placeholder: "Jean Dupont" },
        email: { label: "Email professionnel", placeholder: "jean.dupont@entreprise.fr" },
        phone: { label: "Téléphone", placeholder: "+33 6 12 34 56 78" },
        company: { label: "Entreprise", placeholder: "Nom de votre entreprise" },
        needType: { 
          label: "Type de besoin", 
          placeholder: "Sélectionnez votre besoin",
          options: [
            "Intérim européen",
            "Recrutement spécialisé",
            "Conseil & Conformité",
            "Autre besoin"
          ]
        },
        message: { label: "Décrivez votre besoin", placeholder: "Ex: Recherche de 10 maçons pour un chantier de 6 mois en région parisienne..." }
      },
      ctaLabel: "Envoyer ma demande",
      securityNote: "🔒 Vos données sont protégées et ne seront jamais partagées avec des tiers",
      successMessage: "Merci ! Nous avons bien reçu votre demande et vous recontacterons sous 24h."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Votre partenaire recrutement en Europe"
    },
    columns: {
      services: {
        title: "Services",
        links: [
          { label: "Intérim Européen", href: "/service/interim-europeen" },
          { label: "Recrutement Spécialisé", href: "/service/recrutement-specialise" },
          { label: "Détachement de Personnel", href: "/service/detachement-personnel" },
          { label: "Conseil & Conformité", href: "/service/conseil-conformite" }
        ]
      },
      company: {
        title: "Entreprise",
        links: [
          { label: "À propos", href: "/a-propos" },
          { label: "Notre réseau", href: "/notre-reseau" },
          { label: "Nos secteurs", href: "/nos-secteurs" },
          { label: "Témoignages", href: "/temoignages" }
        ]
      },
      contact: {
        title: "Contact",
        address: "Bordeaux, France",
        phone: "+33 6 50 62 25 24",
        email: "contact@yojob.fr"
      }
    },
    social: {
      linkedin: "https://linkedin.com/company/yojob",
      twitter: "https://twitter.com/yojob",
      facebook: "https://facebook.com/yojob"
    },
    bottom: {
      copyright: "© 2026 YOJOB. Tous droits réservés.",
      madeWith: "Fait avec ❤️ pour faciliter le recrutement européen",
      legalLinks: [
        { label: "Mentions légales", href: "/legal" },
        { label: "CGV", href: "/cgv" },
        { label: "Politique de confidentialité", href: "/privacy" }
      ]
    }
  }
};