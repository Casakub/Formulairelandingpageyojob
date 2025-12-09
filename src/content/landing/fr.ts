import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇫🇷 Contenu de la landing page YOJOB - Version Française
 * Langue de référence pour les traductions
 */

export const landingContentFR: LandingPageContent = {
  language: 'fr',
  
  seo: {
    metaTitle: 'YOJOB - Plateforme européenne de détachement de personnel | 27 pays',
    metaDescription: 'Centralisez vos démarches de détachement européen. Coffre-fort numérique sécurisé, démarches administratives en ligne et gestion des offres d\'emploi. 500+ agences partenaires dans 27 pays.',
    slug: '/',
    h1: 'Votre plateforme tout-en-un du détachement européen',
    ogTitle: 'YOJOB - Détachement de personnel simplifié en Europe',
    ogDescription: 'Gérez vos démarches de détachement avec YOJOB : conformité garantie, 500+ agences partenaires, 27 pays européens.',
    altTexts: {
      heroVisual: 'Carte interactive de l\'Europe montrant le réseau YOJOB de 500+ agences dans 27 pays',
      europeMap: 'Carte d\'Europe avec les 27 pays couverts par YOJOB',
      logoFooter: 'Logo YOJOB - Plateforme européenne de détachement',
    },
    aiSummary: 'YOJOB est une plateforme européenne spécialisée dans le détachement de personnel. Elle centralise tous les documents et démarches administratives dans un coffre-fort numérique sécurisé. Les entreprises peuvent gérer leurs offres d\'emploi, préparer les dossiers de détachement et assurer la conformité légale dans 27 pays européens via un réseau de 500+ agences partenaires. La plateforme simplifie le recrutement européen et garantit la conformité sociale.',
    faq: [
      {
        question: 'Qu\'est-ce que YOJOB ?',
        answer: 'YOJOB est une plateforme européenne de courtage en recrutement et de gestion du détachement de personnel. Nous connectons les entreprises avec plus de 500 agences partenaires dans 27 pays européens.',
      },
      {
        question: 'Dans quels pays YOJOB opère-t-il ?',
        answer: 'YOJOB couvre 27 pays européens : France, Allemagne, Espagne, Italie, Pologne, Roumanie, Pays-Bas, Belgique, Portugal, République tchèque, Hongrie, Suède, Autriche, Bulgarie, Danemark, Finlande, Slovaquie, Irlande, Croatie, Lituanie, Slovénie, Lettonie, Estonie, Chypre, Luxembourg, Malte et Grèce.',
      },
      {
        question: 'Comment fonctionne le coffre-fort numérique ?',
        answer: 'Notre coffre-fort numérique centralise tous vos documents de détachement (A1, contrats, justificatifs) dans un espace sécurisé accessible 24/7. Vous pouvez préparer vos dossiers, suivre les démarches en cours et archiver l\'ensemble de vos opérations de détachement.',
      },
      {
        question: 'YOJOB garantit-il la conformité légale ?',
        answer: 'Oui, YOJOB intègre les réglementations européennes sur le détachement de travailleurs. Notre plateforme vous guide dans les démarches obligatoires et s\'assure que vos dossiers respectent les exigences légales de chaque pays.',
      },
      {
        question: 'Comment déposer une offre d\'emploi sur YOJOB ?',
        answer: 'À partir de 2026, vous pourrez déposer vos offres d\'emploi directement sur notre marketplace. Nos 500+ agences partenaires pourront y répondre et vous proposer des candidats qualifiés adaptés à vos besoins.',
      },
      {
        question: 'Quel est le coût de la plateforme YOJOB ?',
        answer: 'YOJOB propose différentes formules adaptées à vos besoins. Contactez-nous via le formulaire pour obtenir un devis personnalisé en fonction de votre volume d\'activité et des services souhaités.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      network: 'Notre réseau',
      contact: 'Contact',
    },
    cta: 'Demander un devis',
  },

  hero: {
    badge: '⭐ Leader du recrutement européen',
    title: 'Votre partenaire pour le recrutement en Europe',
    subtitle: 'Accédez à un réseau de 500+ agences d\'emploi dans 27 pays. Simplifiez votre recrutement européen avec un intermédiaire expérimenté et de confiance.',
    benefits: [
      'Dossiers centralisés et sécurisés',
      'Démarches administratives en ligne',
      "Gestion des offres d'emploi",
      'Conformité multi-pays',
    ],
    ctaPrimaryLabel: 'Demander un devis',
    ctaSecondaryLabel: 'Découvrir notre réseau',
    stats: {
      agencies: { value: '500+', label: 'agences partenaires' },
      countries: { value: '27', label: 'pays européens' },
      missions: { value: '2000+', label: 'missions réussies' },
    },
    floatingCards: {
      since: { label: 'Depuis', value: '2014' },
      expertise: { value: '10 ans', label: "D'expertise leader" },
      partners: { label: 'Partenaires', value: '500+ agences certifiées' },
      countries: { value: '27', label: 'Pays européens' },
      certified: { value: '500+', label: 'Agences certifiées' },
      activeNetwork: 'Réseau actif',
    },
  },

  stats: {
    badge: '📊 Nos chiffres clés',
    title: 'Une expertise reconnue en Europe',
    items: [
      { value: '10+', label: 'ans d\'expertise', icon: 'Target' },
      { value: '27', label: 'pays couverts', icon: 'Globe' },
      { value: '500+', label: 'agences partenaires', icon: 'Network' },
      { value: '2000+', label: 'missions réalisées', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Nos services',
    title: 'Des solutions adaptées à vos besoins',
    subtitle: 'Nous vous accompagnons dans toutes vos démarches de recrutement européen.',
    services: [
      {
        icon: 'Users',
        title: 'Intérim européen',
        description: 'Recrutement de personnel temporaire partout en Europe avec gestion complète des formalités.',
        linkLabel: 'En savoir plus',
      },
      {
        icon: 'Target',
        title: 'Recrutement spécialisé',
        description: 'Trouvez les talents dont vous avez besoin grâce à notre réseau d\'experts sectoriels.',
        linkLabel: 'En savoir plus',
      },
      {
        icon: 'ShieldCheck',
        title: 'Conseil & Conformité',
        description: 'Assurez-vous de respecter toutes les réglementations européennes en matière de détachement.',
        linkLabel: 'En savoir plus',
      },
    ],
  },

  network: {
    badge: '🌍 Réseau Européen',
    title: 'Un réseau qui couvre toute l\'Europe',
    subtitle: 'Plus de 500 agences partenaires dans 27 pays pour répondre à tous vos besoins en recrutement.',
    mapLabel: 'agences partenaires',
    waitlist: {
      badge: '✨ Nouveauté 2026',
      title: 'Votre plateforme tout-en-un du détachement européen',
      subtitle: 'Centralisez tous vos documents et données de détachement dans un espace sécurisé. Réalisez vos démarches administratives directement en ligne et gérez vos offres d\'emploi depuis une interface unique. Simplifiez votre conformité et gagnez un temps précieux.',
      features: [
        'Dossiers centralisés et sécurisés',
        'Démarches administratives en ligne',
        "Gestion des offres d'emploi",
        'Conformité multi-pays',
      ],
      formTitle: 'Soyez parmi les premiers !',
      formSubtitle: 'Inscrivez-vous à la liste d\'attente et recevez un accès prioritaire',
      emailPlaceholder: 'Votre adresse email professionnelle',
      ctaLabel: 'Rejoindre la liste d\'attente',
      securityNote: '🔒 Vos données sont sécurisées et ne seront jamais partagées.',
      successMessage: 'Merci ! Vous êtes inscrit à la liste d\'attente.',
    },
  },

  steps: {
    badge: '🎯 Comment ça marche',
    title: 'Un processus simple et efficace',
    subtitle: 'En 4 étapes, trouvez les talents dont vous avez besoin partout en Europe.',
    steps: [
      {
        number: '01',
        title: 'Décrivez votre besoin',
        description: 'Partagez-nous vos besoins en recrutement : profils, compétences, localisation et durée.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Nous activons notre réseau',
        description: 'Nos agences partenaires dans toute l\'Europe recherchent les meilleurs candidats pour vous.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Validez les candidats',
        description: 'Nous vous présentons une sélection de profils qualifiés que vous pouvez évaluer.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Accueillez votre équipe',
        description: 'Nous gérons toutes les formalités administratives pour que vous puissiez vous concentrer sur l\'essentiel.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Témoignages',
    title: 'Ils nous font confiance',
    subtitle: 'Découvrez les retours d\'expérience de nos clients partout en Europe.',
    testimonials: [
      {
        name: 'Marc Durand',
        position: 'Directeur RH',
        company: 'BTP Solutions France',
        quote: 'YOJOB nous a permis de recruter 50 ouvriers qualifiés en Pologne en seulement 3 semaines. Un gain de temps considérable et une gestion administrative sans faille.',
        rating: 5,
        sector: 'BTP',
      },
      {
        name: 'Sophie Martin',
        position: 'Responsable Mobilité',
        company: 'IndusTech Germany',
        quote: 'Le réseau européen de YOJOB est impressionnant. Nous avons pu étendre nos opérations dans 5 pays avec un accompagnement expert à chaque étape.',
        rating: 5,
        sector: 'Industrie',
      },
      {
        name: 'Antonio Silva',
        position: 'CEO',
        company: 'AgriPro Portugal',
        quote: 'Enfin une solution qui simplifie vraiment le recrutement transfrontalier. La conformité est garantie et les délais respectés.',
        rating: 5,
        sector: 'Agriculture',
      },
    ],
  },

  sectors: {
    badge: '🏭 Secteurs d\'activité',
    title: 'Nous intervenons dans tous les secteurs',
    subtitle: 'Notre expertise couvre l\'ensemble des domaines d\'activité européens.',
    sectors: [
      { icon: 'Building2', name: 'BTP & Construction', color: 'orange' },
      { icon: 'Factory', name: 'Industrie & Logistique', color: 'blue' },
      { icon: 'Tractor', name: 'Agriculture & Viticulture', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Hôtellerie & Restauration', color: 'red' },
      { icon: 'Heart', name: 'Santé & Médical', color: 'pink' },
      { icon: 'Laptop', name: 'Tertiaire & IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Contactez-nous',
    title: 'Prêt à recruter en Europe ?',
    subtitle: 'Parlez-nous de votre projet et recevez un devis personnalisé sous 24h.',
    benefits: [
      {
        icon: 'Users',
        title: 'Accompagnement personnalisé',
        description: 'Un expert dédié pour votre projet',
      },
      {
        icon: 'ShieldCheck',
        title: 'Conformité garantie',
        description: 'Respect de toutes les réglementations',
      },
      {
        icon: 'Globe',
        title: 'Couverture européenne',
        description: '27 pays accessibles immédiatement',
      },
      {
        icon: 'CheckCircle',
        title: 'Réactivité maximale',
        description: 'Réponse sous 24h ouvrées',
      },
    ],
    form: {
      fields: {
        name: { label: 'Nom complet', placeholder: 'Jean Dupont' },
        email: { label: 'Email professionnel', placeholder: 'jean.dupont@entreprise.fr' },
        phone: { label: 'Téléphone', placeholder: '+33 6 12 34 56 78' },
        company: { label: 'Entreprise', placeholder: 'Nom de votre entreprise' },
        needType: { label: 'Type de besoin', placeholder: 'Sélectionnez un type de besoin' },
        message: { label: 'Décrivez votre besoin', placeholder: 'Décrivez-nous votre projet de recrutement européen...' },
      },
      ctaLabel: 'Envoyer ma demande',
      securityNote: '🔒 Vos données sont sécurisées et ne seront jamais partagées.',
      successMessage: 'Merci ! Nous vous recontacterons sous 24h.',
    },
  },

  footer: {
    logo: {
      tagline: 'Votre partenaire de confiance pour le recrutement européen',
    },
    columns: {
      services: {
        title: 'Services',
        links: [
          { label: 'Intérim européen', href: '#interim' },
          { label: 'Recrutement spécialisé', href: '#recrutement' },
          { label: 'Conseil & Conformité', href: '#conseil' },
          { label: 'Détachement de personnel', href: '#detachement' },
        ],
      },
      company: {
        title: 'Entreprise',
        links: [
          { label: 'À propos', href: '#about' },
          { label: 'Notre réseau', href: '#reseau' },
          { label: 'Nos secteurs', href: '#secteurs' },
          { label: 'Témoignages', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Contact',
        address: '123 Avenue de l\'Europe, 75001 Paris, France',
        phone: '+33 1 23 45 67 89',
        email: 'contact@yojob.fr',
      },
    },
    social: {
      linkedin: 'https://linkedin.com/company/yojob',
      twitter: 'https://twitter.com/yojob',
      facebook: 'https://facebook.com/yojob',
    },
    bottom: {
      copyright: '© 2026 YOJOB. Tous droits réservés. Fait avec ❤️ en Europe.',
      madeWith: 'Fait avec ❤️ pour faciliter le recrutement européen',
      legalLinks: [
        { label: 'Mentions légales', href: '#mentions' },
        { label: 'Politique de confidentialité', href: '#privacy' },
        { label: 'CGV', href: '#cgv' },
      ],
    },
  },
};