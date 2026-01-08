import { useState, useEffect } from 'react';
import type { LandingPageContent, LandingContentState } from '../types/landing';

/**
 * Hook personnalisé pour gérer le contenu de la landing page
 * Stocke le contenu multilingue dans localStorage
 */

const STORAGE_KEY = 'yojob_landing_content';

// Contenu français par défaut
const defaultFRContent: LandingPageContent = {
  hero: {
    badge: {
      text: '⭐ Leader du recrutement européen',
    },
    title: 'Recrutez vos talents partout en Europe avec YoJob',
    subtitle: 'Premier courtier en recrutement européen. Accédez à 500+ agences partenaires dans 27 pays pour trouver vos candidats internationaux en toute conformité.',
    cta: {
      primary: 'Demander un devis',
      secondary: 'En savoir plus',
    },
  },
  stats: [
    {
      value: 10,
      suffix: '+',
      label: "ans d'expertise",
      icon: 'Target',
      color: 'blue',
    },
    {
      value: 27,
      suffix: '',
      label: 'pays couverts',
      icon: 'Globe',
      color: 'cyan',
    },
    {
      value: 500,
      suffix: '+',
      label: 'agences partenaires',
      icon: 'Network',
      color: 'violet',
    },
    {
      value: 2000,
      suffix: '+',
      label: 'missions réalisées',
      icon: 'CheckCircle',
      color: 'green',
    },
  ],
  seo: {
    title: 'YoJob - Courtage en Recrutement Européen | 500+ Agences Partenaires',
    description: 'YoJob connecte votre entreprise à 500+ agences de recrutement dans 27 pays européens. Intérim, CDI, expertise locale, conformité garantie.',
    keywords: [
      'recrutement européen',
      'courtier recrutement',
      'agences intérim europe',
      'recrutement international',
      'talents européens',
      'yojob',
    ],
    // Open Graph
    ogTitle: 'YoJob - Votre Courtier en Recrutement Européen',
    ogDescription: 'Accédez à 500+ agences certifiées dans 27 pays. Recrutement simplifié, conformité garantie.',
    ogImage: 'https://yojob.fr/images/og-yojob.jpg',
    ogType: 'website',
    ogUrl: 'https://yojob.fr',
    // Twitter Cards
    twitterCard: 'summary_large_image',
    twitterTitle: 'YoJob - Recrutement Européen Simplifié',
    twitterDescription: '500+ agences • 27 pays • Conformité garantie',
    twitterImage: 'https://yojob.fr/images/twitter-yojob.jpg',
    // Référencement IA
    aiSummary: 'YoJob est un courtier en recrutement européen qui connecte les entreprises à plus de 500 agences certifiées dans 27 pays. Services : intérim européen, recrutement spécialisé, conseil RH et conformité légale. Expertise depuis 2014 avec plus de 2000 missions réussies.',
    // Canonique
    canonicalUrl: 'https://yojob.fr',
    // FAQ Schema.org
    faq: [
      {
        question: 'Qu\'est-ce que YoJob ?',
        answer: 'YoJob est le premier courtier en recrutement européen. Nous connectons votre entreprise à plus de 500 agences certifiées dans 27 pays européens pour simplifier vos recrutements internationaux.',
      },
      {
        question: 'Dans quels pays opérez-vous ?',
        answer: 'YoJob couvre 27 pays européens grâce à notre réseau de 500+ agences partenaires certifiées. Nous intervenons dans toute l\'Europe pour vos besoins en intérim, CDI et détachement.',
      },
      {
        question: 'Comment fonctionne le service YoJob ?',
        answer: 'C\'est simple : 1) Vous décrivez votre besoin en recrutement, 2) Nous activons notre réseau d\'agences européennes, 3) Vous validez les candidats proposés, 4) Nous gérons toute la conformité administrative et légale.',
      },
      {
        question: 'Quels sont vos tarifs ?',
        answer: 'Nos tarifs dépendent de vos besoins spécifiques (volume, profils, pays). Contactez-nous pour recevoir un devis personnalisé sous 24h. Pas de frais cachés, transparence totale.',
      },
      {
        question: 'Garantissez-vous la conformité légale ?',
        answer: 'Oui, absolument. YoJob assure la conformité avec le droit du travail européen et gère toute la partie administrative transfrontalière. C\'est notre expertise depuis 2014.',
      },
    ],
    // Google Analytics & Tag Manager (à configurer par l'utilisateur)
    googleAnalyticsId: '', // Exemple : 'G-XXXXXXXXXX'
    googleTagManagerId: '', // Exemple : 'GTM-XXXXXXX'
  },
  services: [
    {
      title: 'Intérim Européen',
      description: 'Mobilisez rapidement des équipes qualifiées partout en Europe grâce à notre réseau de 500+ agences partenaires.',
      icon: 'Users',
      color: 'blue',
    },
    {
      title: 'Recrutement Spécialisé',
      description: 'Trouvez les profils experts dont vous avez besoin avec nos agences spécialisées par secteur et métier.',
      icon: 'Target',
      color: 'cyan',
    },
    {
      title: 'Conseil & Conformité',
      description: 'Bénéficiez de notre expertise en droit du travail européen et gestion administrative transfrontalière.',
      icon: 'ShieldCheck',
      color: 'violet',
    },
  ],
  network: {
    badge: '🌍 Réseau Européen',
    title: 'Un réseau de 500+ agences dans 27 pays',
    subtitle: 'Accédez au plus grand réseau d\'agences de recrutement en Europe',
    waitlist: {
      badge: '🚀 Nouveauté 2025',
      title: 'Bientôt : La première marketplace d\'agences européennes',
      description: 'Recherchez, comparez et contactez directement les meilleures agences de recrutement européennes.',
      features: [
        'Recherche multicritères (pays, secteur, spécialité)',
        'Comparaison instantanée des agences',
        'Avis clients vérifiés',
        'Mise en relation directe',
      ],
      cta: 'Rejoindre la liste d\'attente',
      placeholder: 'Votre email professionnel',
    },
  },
  process: {
    title: 'Comment ça marche ?',
    subtitle: 'De votre besoin à l\'intégration de vos talents',
    steps: [
      {
        number: 1,
        title: 'Décrivez votre besoin',
        description: 'Profils recherchés, volume, localisation, timing',
        icon: 'FileText',
        color: 'blue',
      },
      {
        number: 2,
        title: 'Nous activons notre réseau',
        description: 'Nos agences partenaires mobilisent leurs candidats',
        icon: 'Network',
        color: 'cyan',
      },
      {
        number: 3,
        title: 'Validez les candidats',
        description: 'Recevez les profils qualifiés et sélectionnez',
        icon: 'UserCheck',
        color: 'violet',
      },
      {
        number: 4,
        title: 'Accueillez votre équipe',
        description: 'Gestion administrative et conformité assurées',
        icon: 'CheckCircle',
        color: 'green',
      },
    ],
  },
  testimonials: [
    {
      id: '1',
      name: 'M. D.',
      role: 'Directeur RH',
      company: 'Entreprise du BTP',
      sector: 'BTP',
      quote: 'YoJob nous a permis de recruter 50 ouvriers qualifiés en Pologne en moins de 3 semaines. Service impeccable et conformité garantie.',
      rating: 5,
    },
    {
      id: '2',
      name: 'M. S.',
      role: 'Directeur Opérationnel',
      company: 'Groupe agroalimentaire',
      sector: 'Agroalimentaire',
      quote: 'Grâce au réseau YoJob, nous avons accès aux meilleurs profils techniques dans toute l\'Europe. Un vrai gain de temps.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Mme M.',
      role: 'Directrice',
      company: 'Entreprise de santé',
      sector: 'Santé',
      quote: 'La réactivité et l\'expertise de YoJob nous ont permis de constituer rapidement une équipe internationale de qualité.',
      rating: 5,
    },
  ],
  sectors: {
    badge: '🎯 Tous secteurs',
    title: 'Tous secteurs, tous profils',
    subtitle: 'Nous recrutons pour l\'ensemble des secteurs d\'activité à travers toute l\'Europe',
    sectors: [
      { name: 'BTP', icon: 'Building2', color: 'orange' },
      { name: 'Industrie', icon: 'Factory', color: 'blue' },
      { name: 'Agriculture', icon: 'Tractor', color: 'green' },
      { name: 'Hôtellerie', icon: 'UtensilsCrossed', color: 'red' },
      { name: 'Santé', icon: 'Heart', color: 'pink' },
      { name: 'Tech', icon: 'Laptop', color: 'violet' },
    ],
  },
  cta: {
    title: 'Prêt à recruter en Europe ?',
    subtitle: 'Contactez-nous pour un devis personnalisé',
    benefits: [
      {
        icon: 'Clock',
        title: 'Réponse rapide',
        description: 'Devis sous 24h',
      },
      {
        icon: 'Shield',
        title: 'Conformité garantie',
        description: 'Expertise juridique européenne',
      },
      {
        icon: 'Users',
        title: 'Réseau premium',
        description: '500+ agences certifiées',
      },
      {
        icon: 'HeadphonesIcon',
        title: 'Support dédié',
        description: 'Accompagnement personnalisé',
      },
    ],
    form: {
      title: 'Demander un devis',
      fields: {
        name: 'Nom complet',
        email: 'Email professionnel',
        phone: 'Téléphone',
        company: 'Entreprise',
        needType: 'Type de besoin',
        message: 'Décrivez votre besoin',
      },
      needTypes: [
        'Intérim',
        'CDI',
        'Consultant',
        'Détachement',
        'Autre',
      ],
      submitButton: 'Envoyer ma demande',
      securityMessage: '🔒 Vos données sont sécurisées et confidentielles',
      successMessage: 'Merci ! Nous vous recontacterons sous 24h.',
    },
  },
  ctaForm: {
    badge: '💼 Demande de devis',
    title: 'Prêt à recruter en Europe ?',
    subtitle: 'Décrivez votre projet, nous vous recontactons sous 24h',
    benefits: [
      {
        icon: 'CheckCircle',
        title: 'Devis gratuit et personnalisé',
      },
      {
        icon: 'CheckCircle',
        title: 'Sans engagement',
      },
      {
        icon: 'CheckCircle',
        title: 'Réponse sous 24h',
      },
    ],
    form: {
      fields: {
        name: {
          label: 'Nom complet',
          placeholder: 'Jean Dupont',
        },
        email: {
          label: 'Email professionnel',
          placeholder: 'j.dupont@entreprise.fr',
        },
        phone: {
          label: 'Téléphone',
          placeholder: '06 12 34 56 78',
        },
        company: {
          label: 'Entreprise',
          placeholder: 'Nom de votre entreprise',
        },
        contactType: {
          label: 'Vous êtes',
          placeholder: 'Sélectionnez votre profil',
          options: {
            client: 'Client / Entreprise',
            agency: 'Agence de travail temporaire',
            interim: 'Intérimaire',
            other: 'Autre',
          },
        },
        needType: {
          label: 'Type de besoin',
          placeholder: 'Sélectionnez votre besoin',
        },
        message: {
          label: 'Message',
          placeholder: 'Décrivez votre besoin (profils recherchés, nombre, durée...)',
        },
      },
      ctaLabel: 'Envoyer ma demande',
      securityNote: 'En soumettant ce formulaire, vous acceptez que vos données soient utilisées dans le cadre de votre demande. Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression.',
      successMessage: 'Merci ! Nous vous recontacterons sous 24h.',
    },
  },
  footer: {
    slogan: 'Votre partenaire recrutement en Europe',
    services: [
      { label: 'Intérim européen', link: '#services' },
      { label: 'Recrutement CDI', link: '#services' },
      { label: 'Conseil RH', link: '#services' },
      { label: 'Conformité', link: '#services' },
    ],
    company: [
      { label: 'À propos', link: '#about' },
      { label: 'Notre réseau', link: '#network' },
      { label: 'Témoignages', link: '#testimonials' },
      { label: 'Contact', link: '#contact' },
    ],
    contact: {
      address: 'Paris, France',
      phone: '+33 1 23 45 67 89',
      email: 'contact@yojob.fr',
    },
    legal: {
      copyright: '© 2024 YoJob. Tous droits réservés.',
      links: [
        { label: 'Mentions légales', link: '/legal' },
        { label: 'CGV', link: '/cgv' },
        { label: 'Confidentialité', link: '/privacy' },
      ],
    },
  },
  nav: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Réseau', href: '#network' },
      { label: 'Secteurs', href: '#sectors' },
      { label: 'Témoignages', href: '#testimonials' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Demander un devis',
    languages: {
      fr: 'Français',
      en: 'English',
    },
  },
};

export function useLandingContent() {
  const [landingContent, setLandingContent] = useState<LandingContentState>(() => {
    // Charger depuis localStorage au premier rendu
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // 🔄 MIGRATION : Ancien format sectors (array direct) → Nouveau format (objet avec sous-propriétés)
        if (parsed.fr?.sectors && Array.isArray(parsed.fr.sectors)) {
          console.log('🔄 Migration détectée : Ancien format de sectors détecté, conversion en cours...');
          parsed.fr.sectors = {
            badge: '🎯 Tous secteurs',
            title: 'Tous secteurs, tous profils',
            subtitle: 'Nous recrutons pour l\'ensemble des secteurs d\'activité à travers toute l\'Europe',
            sectors: parsed.fr.sectors, // L'ancien array devient sectors.sectors
          };
          // Sauvegarder immédiatement le format migré
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          console.log('✅ Migration terminée et sauvegardée');
        }
        
        // 🔄 MIGRATION : Ajout de la section ctaForm si elle n'existe pas
        if (parsed.fr && !parsed.fr.ctaForm) {
          console.log('🔄 Migration détectée : Section ctaForm manquante, ajout en cours...');
          parsed.fr.ctaForm = defaultFRContent.ctaForm;
          // Sauvegarder immédiatement
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          console.log('✅ Migration ctaForm terminée et sauvegardée');
        }
        
        // 🔄 MIGRATION : Ajout du champ contactType dans ctaForm.form.fields
        if (parsed.fr?.ctaForm?.form?.fields && !parsed.fr.ctaForm.form.fields.contactType) {
          console.log('🔄 Migration détectée : Champ contactType manquant, ajout en cours...');
          parsed.fr.ctaForm.form.fields.contactType = defaultFRContent.ctaForm.form.fields.contactType;
          // Sauvegarder immédiatement
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          console.log('✅ Migration contactType terminée et sauvegardée');
        }
        
        return parsed;
      }
    } catch (error) {
      console.error('Error loading landing content from localStorage:', error);
    }
    // Retourner le contenu français par défaut
    return { fr: defaultFRContent };
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(landingContent));
    } catch (error) {
      console.error('Error saving landing content to localStorage:', error);
    }
  }, [landingContent]);

  // Mettre à jour le contenu pour une langue
  const updateLandingContent = (languageCode: string, content: LandingPageContent) => {
    setLandingContent((prev) => ({
      ...prev,
      [languageCode]: content,
    }));
  };

  // Réinitialiser le contenu français par défaut
  const resetToDefault = () => {
    setLandingContent({ fr: defaultFRContent });
  };

  return {
    landingContent,
    updateLandingContent,
    resetToDefault,
    isLoading,
  };
}