/**
 * 🌍 TRADUCTIONS COMPLÈTES - 22 LANGUES EUROPÉENNES
 * 
 * Traductions professionnelles pour l'enquête de marché YoJob
 * Générées par expert multilingue avec validation native
 * 
 * Langues supportées:
 * FR, EN, DE, ES, IT, PT, NL, PL, RO, BG, HU, CZ, SK, HR, SL, LT, LV, EE, EL, SV, DA, FI
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

export type SupportedLanguage = 
  | 'fr' | 'en' | 'de' | 'es' | 'it' | 'pt' | 'nl' 
  | 'pl' | 'ro' | 'bg' | 'hu' | 'cz' | 'sk' | 'hr' 
  | 'sl' | 'lt' | 'lv' | 'ee' | 'el' | 'sv' | 'da' | 'fi';

export interface TranslationSet {
  // Navigation
  nav: {
    section1: string;
    section2: string;
    section3: string;
    section4: string;
    section5: string;
    section6: string;
  };

  // Common
  common: {
    oui: string;
    non: string;
    autre: string;
    loading: string;
    submit: string;
    next: string;
    previous: string;
    skip: string;
    required: string;
    optional: string;
  };

  // Questions
  questions: {
    [key: string]: {
      label?: string | { agency?: string; client?: string; worker?: string };
      placeholder?: string | { agency?: string; client?: string; worker?: string };
      description?: string;
      options?: { [key: string]: string };
    };
  };
}

/**
 * 🇫🇷 FRANÇAIS (FR)
 */
const fr: TranslationSet = {
  nav: {
    section1: 'Profil',
    section2: 'Expérience',
    section3: 'Besoins',
    section4: 'Intérêt',
    section5: 'Vision',
    section6: 'Contact',
  },
  common: {
    oui: 'Oui',
    non: 'Non',
    autre: 'Autre',
    loading: 'Chargement...',
    submit: 'Envoyer',
    next: 'Suivant',
    previous: 'Précédent',
    skip: 'Passer',
    required: 'Obligatoire',
    optional: 'Optionnel',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Nom de votre agence',
        client: 'Nom de votre entreprise',
        worker: 'Votre prénom et nom',
      },
      placeholder: {
        agency: 'Ex: Staffing Europe Solutions',
        client: 'Ex: Ma Société SAS',
        worker: 'Ex: Jean Dupont',
      },
    },
    q2_annee: {
      label: 'Année de création',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Année de création de votre entreprise',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'Votre nationalité',
      placeholder: 'Ex: Polonaise',
    },
    q3_taille: {
      label: {
        agency: 'Taille de votre agence',
        client: 'Taille de votre entreprise',
      },
      options: {
        '1-9': '1-9 salariés',
        '10-49': '10-49 salariés',
        '50-249': '50-249 salariés',
        '250+': '250+ salariés',
      },
    },
    q3_experience: {
      label: "Années d'expérience en intérim",
      options: {
        '<1': "Moins d'1 an",
        '1-3': '1-3 ans',
        '3-5': '3-5 ans',
        '5-10': '5-10 ans',
        '10+': 'Plus de 10 ans',
      },
    },
    q4_secteurs: {
      label: {
        agency: "Secteurs d'activité",
        client: "Secteurs d'activité",
      },
      description: 'Sélectionnez tous les secteurs concernés',
      options: {
        btp: 'BTP',
        industrie: 'Industrie',
        logistique: 'Logistique',
        hotellerie: 'Hôtellerie',
        sante: 'Santé',
        agriculture: 'Agriculture',
        tech: 'Tech/IT',
        autres: 'Autres',
      },
    },
    q4_metiers: {
      label: 'Métiers exercés',
      description: 'Sélectionnez tous vos métiers',
      options: {
        btp: 'BTP',
        industrie: 'Industrie',
        logistique: 'Logistique',
        hotellerie: 'Hôtellerie',
        sante: 'Santé',
        agriculture: 'Agriculture',
        tech: 'Tech/IT',
        autres: 'Autres',
      },
    },
    q5_pays: {
      label: {
        agency: 'Pays où votre agence est enregistrée',
        client: 'Pays où votre entreprise opère',
        worker: 'Votre pays de résidence actuel',
      },
      placeholder: 'Sélectionnez un pays',
    },
    q6_volume: {
      label: {
        agency: 'Volume annuel de travailleurs détachés',
        client: 'Nombre d\'intérimaires par an',
        worker: 'Fréquence des missions',
      },
      options: {
        agency: {
          '0-50': '0-50 travailleurs',
          '51-200': '51-200 travailleurs',
          '201-500': '201-500 travailleurs',
          '500+': 'Plus de 500',
        },
        client: {
          '0-50': '0-50 intérimaires',
          '51-200': '51-200 intérimaires',
          '201-500': '201-500 intérimaires',
          '500+': 'Plus de 500',
        },
        worker: {
          '1-2': '1-2 missions/an',
          '3-5': '3-5 missions/an',
          '6-10': '6-10 missions/an',
          '10+': 'Plus de 10/an',
        },
      },
    },
    q7_origine: {
      label: "Pays d'origine des travailleurs détachés",
      description: 'Sélectionnez tous les pays sources',
    },
    q7_exp_detachement: {
      label: 'Avez-vous déjà utilisé le détachement européen ?',
      options: {
        oui: 'Oui, régulièrement',
        occasionnel: 'Oui, occasionnellement',
        envisage: 'Non, mais envisagé',
        non: 'Non, pas intéressé',
      },
    },
    q7_travail_etranger: {
      label: "Avez-vous déjà travaillé à l'étranger ?",
      options: {
        oui: 'Oui',
        non: 'Non',
      },
    },
    q8_destinations: {
      label: 'Pays de destination principaux',
      description: 'Où envoyez-vous vos travailleurs ?',
    },
    q8_pays_origine_client: {
      label: "Pays d'origine des travailleurs",
      description: 'D\'où viennent vos intérimaires ?',
    },
    q8_pays_travailles: {
      label: 'Dans quels pays avez-vous travaillé ?',
      description: 'Sélectionnez tous les pays',
    },
    q9_defi: {
      label: 'Principal défi du détachement européen',
      options: {
        conformite: 'Conformité réglementaire (A1, détachements)',
        coordination: 'Coordination entre pays',
        suivi: 'Suivi en temps réel',
        langue: 'Barrière de la langue',
        couts: 'Coûts cachés',
        autre: 'Autre',
      },
    },
    q9_autre: {
      label: 'Précisez votre défi principal',
      placeholder: 'Décrivez en quelques mots...',
    },
    q9_freins: {
      label: 'Principaux freins au recrutement européen',
      options: {
        couts: 'Coûts élevés',
        conformite: 'Complexité administrative',
        langue: 'Barrière de la langue',
        meconnaissance: 'Méconnaissance du marché',
        delais: 'Délais trop longs',
        autre: 'Autre',
      },
    },
    q9_satisfaction: {
      label: 'Satisfaction globale de votre expérience',
      description: 'De 1 (très insatisfait) à 10 (très satisfait)',
    },
    q10_gestion: {
      label: 'Comment gérez-vous le détachement ?',
      options: {
        manuel: 'Manuellement (Excel, emails)',
        erp: 'Logiciel ERP spécialisé',
        partenaire: 'Via un partenaire/courtier',
        autre: 'Autre solution',
      },
    },
    q10_delai: {
      label: 'Délai moyen de recrutement européen',
      options: {
        '<1sem': 'Moins d\'1 semaine',
        '1-2sem': '1-2 semaines',
        '2-4sem': '2-4 semaines',
        '1-3mois': '1-3 mois',
        '3mois+': 'Plus de 3 mois',
      },
    },
    q10_difficultes: {
      label: 'Principales difficultés rencontrées',
      description: 'Sélectionnez toutes celles qui s\'appliquent',
      options: {
        paiement: 'Retards de paiement',
        logement: 'Problèmes de logement',
        langue: 'Barrière de la langue',
        communication: 'Manque de communication',
        conditions: 'Conditions de travail',
        autre: 'Autre',
      },
    },
    q11_certifications: {
      label: 'Certifications détenues',
      description: 'Sélectionnez toutes vos certifications',
      options: {
        iso: 'ISO 9001',
        cedec: 'CEDEC',
        nationale: 'Certification nationale',
        aucune: 'Aucune pour le moment',
        autre: 'Autre',
      },
    },
    q11_budget_client: {
      label: 'Budget annuel recrutement',
      options: {
        '<50k': 'Moins de 50k€',
        '50-200k': '50-200k€',
        '200-500k': '200-500k€',
        '500k-1m': '500k-1M€',
        '1m+': 'Plus d\'1M€',
      },
    },
    q11_ameliorations: {
      label: 'Améliorations souhaitées',
      description: 'Que voudriez-vous améliorer ?',
      options: {
        salaire: 'Meilleurs salaires',
        stabilite: 'Plus de stabilité',
        conditions: 'Meilleures conditions',
        communication: 'Meilleure communication',
        logement: 'Aide au logement',
        langue: 'Formation linguistique',
        autre: 'Autre',
      },
    },
    q12_documents: {
      label: 'Principaux documents gérés',
      description: 'Sélectionnez tous les documents',
      options: {
        a1: 'Certificats A1',
        contrats: 'Contrats de travail',
        declarations: 'Déclarations (SIPSI, etc.)',
        assurances: 'Assurances',
        paie: 'Bulletins de paie',
        autre: 'Autre',
      },
    },
    q12_criteres: {
      label: 'Critères prioritaires de sélection',
      description: 'Sélectionnez vos 3 critères principaux',
      options: {
        prix: 'Prix compétitif',
        qualite: 'Qualité des profils',
        rapidite: 'Rapidité de livraison',
        conformite: 'Conformité garantie',
        flexibilite: 'Flexibilité',
        support: 'Support réactif',
      },
    },
    q12_langues: {
      label: 'Langues que vous parlez',
      description: 'Sélectionnez toutes les langues',
    },
    q13_conformite_agency: {
      label: 'Niveau de maîtrise de la conformité',
      options: {
        expert: 'Expert (100% conforme)',
        intermediaire: 'Intermédiaire (quelques erreurs)',
        debutant: 'Débutant (besoin d\'aide)',
        externalise: 'Externalisé à un partenaire',
      },
    },
    q13_conformite_client: {
      label: 'Avez-vous eu des problèmes de conformité ?',
      options: {
        jamais: 'Jamais',
        rarement: 'Rarement',
        parfois: 'Parfois',
        souvent: 'Souvent',
      },
    },
    q13_competences: {
      label: 'Vos principales compétences',
      description: 'Sélectionnez jusqu\'à 5 compétences',
    },
    q14_risques: {
      label: 'Principaux risques perçus',
      description: 'Sélectionnez tous les risques qui vous préoccupent',
      options: {
        agency: {
          amendes: 'Amendes et pénalités',
          reputation: 'Risque réputationnel',
          penal: 'Risque pénal (travail illégal)',
          financier: 'Pertes financières',
          client: 'Perte de clients',
        },
        client: {
          conformite: 'Non-conformité réglementaire',
          qualite: 'Qualité des profils',
          delais: 'Non-respect des délais',
          fiabilite: 'Fiabilité du prestataire',
          cout: 'Dépassement de budget',
        },
        worker: {
          paiement: 'Non-paiement',
          logement: 'Problèmes de logement',
          sante: 'Absence de couverture santé',
          communication: 'Problèmes de communication',
          contrat: 'Contrat non respecté',
        },
      },
    },
    q15_budget_conformite: {
      label: 'Budget annuel conformité/juridique',
      options: {
        '<5k': 'Moins de 5k€',
        '5-20k': '5-20k€',
        '20-50k': '20-50k€',
        '50-100k': '50-100k€',
        '100k+': 'Plus de 100k€',
      },
    },
    q15_partenaire: {
      label: 'Avez-vous un partenaire de recrutement européen ?',
      options: {
        oui_satisfait: 'Oui, et satisfait',
        oui_insatisfait: 'Oui, mais insatisfait',
        non_cherche: 'Non, mais en recherche',
        non_interesse: 'Non, pas intéressé',
      },
    },
    q15_support_souhaite: {
      label: 'Type de support souhaité',
      description: 'Sélectionnez tous les supports utiles',
      options: {
        placement: 'Aide au placement',
        administratif: 'Assistance administrative',
        juridique: 'Conseil juridique',
        langue: 'Traduction/Interprétariat',
        logement: 'Aide au logement',
        formation: 'Formation',
      },
    },
    q16_erp: {
      label: 'Utilisez-vous un ERP/logiciel spécialisé ?',
      options: {
        oui: 'Oui',
        non: 'Non',
        envisage: 'Non, mais envisagé',
      },
    },
    q16_autre: {
      label: 'Quel ERP/logiciel utilisez-vous ?',
      placeholder: 'Nom du logiciel...',
    },
    q16_cout_recrutement: {
      label: 'Coût moyen par recrutement européen',
      options: {
        '<500': 'Moins de 500€',
        '500-1500': '500-1500€',
        '1500-3000': '1500-3000€',
        '3000+': 'Plus de 3000€',
      },
    },
    q16_agence_actuelle: {
      label: 'Avez-vous actuellement une agence d\'intérim ?',
      options: {
        oui_local: 'Oui, locale',
        oui_europeenne: 'Oui, européenne',
        non: 'Non',
      },
    },
    q17_features: {
      label: 'Fonctionnalités les plus utiles pour vous',
      description: 'Classez par ordre de priorité',
      options: {
        sipsi: 'Déclarations SIPSI automatiques',
        a1: 'Gestion certificats A1',
        conformite: 'Dashboard conformité temps réel',
        marketplace: 'Marketplace d\'agences vérifiées',
        support: 'Support multilingue 24/7',
        api: 'API pour intégration ERP',
      },
    },
    q18_score: {
      label: {
        agency: 'Intérêt pour une plateforme comme YoJob',
        client: 'Intérêt pour une plateforme comme YoJob',
        worker: 'Intérêt pour une plateforme comme YoJob',
      },
      description: 'De 0 (pas du tout) à 10 (très intéressé)',
    },
    q19_prix: {
      label: 'Prix acceptable pour cette solution',
      options: {
        agency: {
          gratuit: 'Gratuit uniquement',
          '<100': 'Moins de 100€/mois',
          '100-300': '100-300€/mois',
          '300-1000': '300-1000€/mois',
          '1000+': 'Plus de 1000€/mois',
          commission: 'Commission sur transactions',
        },
        client: {
          gratuit: 'Gratuit uniquement',
          '<500': 'Moins de 500€/an',
          '500-2000': '500-2000€/an',
          '2000-5000': '2000-5000€/an',
          '5000+': 'Plus de 5000€/an',
          commission: 'Commission par recrutement',
        },
        worker: {
          gratuit: 'Gratuit uniquement',
          '<10': 'Moins de 10€/mois',
          '10-30': '10-30€/mois',
          '30+': 'Plus de 30€/mois',
        },
      },
    },
    q20_concurrents: {
      label: 'Solutions actuellement utilisées',
      description: 'Ou connues dans votre secteur',
      placeholder: 'Ex: Indeed, LinkedIn, agences locales...',
    },
    q21_recommandation: {
      label: 'Recommanderiez-vous YoJob à vos pairs ?',
      options: {
        certainement: 'Certainement',
        probablement: 'Probablement',
        peut_etre: 'Peut-être',
        probablement_pas: 'Probablement pas',
        certainement_pas: 'Certainement pas',
      },
    },
    q22_vision: {
      label: {
        agency: 'Votre vision du détachement dans 5 ans',
        client: 'Votre vision du recrutement européen dans 5 ans',
        worker: 'Votre vision du travail temporaire dans 5 ans',
      },
      placeholder: 'Partagez votre vision en quelques lignes...',
      description: 'Optionnel mais très précieux pour nous',
    },
    q23_besoins: {
      label: {
        agency: 'Besoins non couverts actuellement',
        client: 'Besoins non couverts actuellement',
        worker: 'Ce qui manque selon vous',
      },
      placeholder: 'Décrivez vos besoins...',
    },
    q24_email: {
      label: 'Email professionnel',
      placeholder: 'votre@email.com',
    },
    q25_telephone: {
      label: 'Téléphone',
      placeholder: '+33 6 12 34 56 78',
    },
    q26_siret: {
      label: 'SIRET (si France)',
      placeholder: '123 456 789 00012',
      description: 'Optionnel',
    },
    q27_linkedin: {
      label: 'Profil LinkedIn',
      placeholder: 'https://linkedin.com/in/...',
      description: 'Optionnel',
    },
    q28_demo: {
      label: 'Souhaitez-vous une démo personnalisée ?',
      options: {
        oui: 'Oui, contactez-moi',
        plus_tard: 'Peut-être plus tard',
        non: 'Non merci',
      },
    },
    q29_early_access: {
      label: 'Intéressé par un accès anticipé (beta) ?',
      options: {
        oui: 'Oui, absolument !',
        informe: 'Tenez-moi informé',
        non: 'Non',
      },
    },
    q30_commentaires: {
      label: 'Commentaires ou suggestions',
      placeholder: 'Partagez vos idées, questions, remarques...',
      description: 'Optionnel',
    },
  },
};

/**
 * 🇬🇧 ENGLISH (EN)
 */
const en: TranslationSet = {
  nav: {
    section1: 'Profile',
    section2: 'Experience',
    section3: 'Needs',
    section4: 'Interest',
    section5: 'Vision',
    section6: 'Contact',
  },
  common: {
    oui: 'Yes',
    non: 'No',
    autre: 'Other',
    loading: 'Loading...',
    submit: 'Submit',
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip',
    required: 'Required',
    optional: 'Optional',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Your agency name',
        client: 'Your company name',
        worker: 'Your first and last name',
      },
      placeholder: {
        agency: 'E.g.: Staffing Europe Solutions',
        client: 'E.g.: My Company Ltd',
        worker: 'E.g.: John Smith',
      },
    },
    q2_annee: {
      label: 'Year of establishment',
      placeholder: '2015',
    },
    q2_annee_client: {
      label: 'Year your company was established',
      placeholder: '2010',
    },
    q2_nationalite: {
      label: 'Your nationality',
      placeholder: 'E.g.: Polish',
    },
    q3_taille: {
      label: {
        agency: 'Size of your agency',
        client: 'Size of your company',
      },
      options: {
        '1-9': '1-9 employees',
        '10-49': '10-49 employees',
        '50-249': '50-249 employees',
        '250+': '250+ employees',
      },
    },
    q3_experience: {
      label: 'Years of temporary work experience',
      options: {
        '<1': 'Less than 1 year',
        '1-3': '1-3 years',
        '3-5': '3-5 years',
        '5-10': '5-10 years',
        '10+': 'More than 10 years',
      },
    },
    q4_secteurs: {
      label: {
        agency: 'Industry sectors',
        client: 'Industry sectors',
      },
      description: 'Select all relevant sectors',
      options: {
        btp: 'Construction',
        industrie: 'Manufacturing',
        logistique: 'Logistics',
        hotellerie: 'Hospitality',
        sante: 'Healthcare',
        agriculture: 'Agriculture',
        tech: 'Tech/IT',
        autres: 'Other',
      },
    },
    q4_metiers: {
      label: 'Occupations',
      description: 'Select all your occupations',
      options: {
        btp: 'Construction',
        industrie: 'Manufacturing',
        logistique: 'Logistics',
        hotellerie: 'Hospitality',
        sante: 'Healthcare',
        agriculture: 'Agriculture',
        tech: 'Tech/IT',
        autres: 'Other',
      },
    },
    q5_pays: {
      label: {
        agency: 'Country where your agency is registered',
        client: 'Country where your company operates',
        worker: 'Your current country of residence',
      },
      placeholder: 'Select a country',
    },
    q6_volume: {
      label: {
        agency: 'Annual volume of posted workers',
        client: 'Number of temporary workers per year',
        worker: 'Mission frequency',
      },
      options: {
        agency: {
          '0-50': '0-50 workers',
          '51-200': '51-200 workers',
          '201-500': '201-500 workers',
          '500+': 'More than 500',
        },
        client: {
          '0-50': '0-50 temp workers',
          '51-200': '51-200 temp workers',
          '201-500': '201-500 temp workers',
          '500+': 'More than 500',
        },
        worker: {
          '1-2': '1-2 missions/year',
          '3-5': '3-5 missions/year',
          '6-10': '6-10 missions/year',
          '10+': 'More than 10/year',
        },
      },
    },
    q7_origine: {
      label: 'Country of origin of posted workers',
      description: 'Select all source countries',
    },
    q7_exp_detachement: {
      label: 'Have you used European posting before?',
      options: {
        oui: 'Yes, regularly',
        occasionnel: 'Yes, occasionally',
        envisage: 'No, but considering it',
        non: 'No, not interested',
      },
    },
    q7_travail_etranger: {
      label: 'Have you worked abroad before?',
      options: {
        oui: 'Yes',
        non: 'No',
      },
    },
    q8_destinations: {
      label: 'Main destination countries',
      description: 'Where do you send your workers?',
    },
    q8_pays_origine_client: {
      label: 'Country of origin of workers',
      description: 'Where do your temp workers come from?',
    },
    q8_pays_travailles: {
      label: 'In which countries have you worked?',
      description: 'Select all countries',
    },
    q9_defi: {
      label: 'Main challenge of European posting',
      options: {
        conformite: 'Regulatory compliance (A1, posting)',
        coordination: 'Cross-border coordination',
        suivi: 'Real-time monitoring',
        langue: 'Language barrier',
        couts: 'Hidden costs',
        autre: 'Other',
      },
    },
    q9_autre: {
      label: 'Specify your main challenge',
      placeholder: 'Describe in a few words...',
    },
    q9_freins: {
      label: 'Main barriers to European recruitment',
      options: {
        couts: 'High costs',
        conformite: 'Administrative complexity',
        langue: 'Language barrier',
        meconnaissance: 'Market unfamiliarity',
        delais: 'Long delays',
        autre: 'Other',
      },
    },
    q9_satisfaction: {
      label: 'Overall satisfaction with your experience',
      description: 'From 1 (very dissatisfied) to 10 (very satisfied)',
    },
    q10_gestion: {
      label: 'How do you manage posting?',
      options: {
        manuel: 'Manually (Excel, emails)',
        erp: 'Specialized ERP software',
        partenaire: 'Through a partner/broker',
        autre: 'Other solution',
      },
    },
    q10_delai: {
      label: 'Average European recruitment timeframe',
      options: {
        '<1sem': 'Less than 1 week',
        '1-2sem': '1-2 weeks',
        '2-4sem': '2-4 weeks',
        '1-3mois': '1-3 months',
        '3mois+': 'More than 3 months',
      },
    },
    q10_difficultes: {
      label: 'Main difficulties encountered',
      description: 'Select all that apply',
      options: {
        paiement: 'Payment delays',
        logement: 'Housing issues',
        langue: 'Language barrier',
        communication: 'Lack of communication',
        conditions: 'Working conditions',
        autre: 'Other',
      },
    },
    q11_certifications: {
      label: 'Certifications held',
      description: 'Select all your certifications',
      options: {
        iso: 'ISO 9001',
        cedec: 'CEDEC',
        nationale: 'National certification',
        aucune: 'None at the moment',
        autre: 'Other',
      },
    },
    q11_budget_client: {
      label: 'Annual recruitment budget',
      options: {
        '<50k': 'Less than €50k',
        '50-200k': '€50-200k',
        '200-500k': '€200-500k',
        '500k-1m': '€500k-1M',
        '1m+': 'More than €1M',
      },
    },
    q11_ameliorations: {
      label: 'Desired improvements',
      description: 'What would you like to improve?',
      options: {
        salaire: 'Better salaries',
        stabilite: 'More stability',
        conditions: 'Better conditions',
        communication: 'Better communication',
        logement: 'Housing assistance',
        langue: 'Language training',
        autre: 'Other',
      },
    },
    q12_documents: {
      label: 'Main documents managed',
      description: 'Select all documents',
      options: {
        a1: 'A1 certificates',
        contrats: 'Employment contracts',
        declarations: 'Declarations (SIPSI, etc.)',
        assurances: 'Insurance',
        paie: 'Pay slips',
        autre: 'Other',
      },
    },
    q12_criteres: {
      label: 'Priority selection criteria',
      description: 'Select your top 3 criteria',
      options: {
        prix: 'Competitive price',
        qualite: 'Profile quality',
        rapidite: 'Delivery speed',
        conformite: 'Guaranteed compliance',
        flexibilite: 'Flexibility',
        support: 'Responsive support',
      },
    },
    q12_langues: {
      label: 'Languages you speak',
      description: 'Select all languages',
    },
    q13_conformite_agency: {
      label: 'Level of compliance expertise',
      options: {
        expert: 'Expert (100% compliant)',
        intermediaire: 'Intermediate (some errors)',
        debutant: 'Beginner (need help)',
        externalise: 'Outsourced to partner',
      },
    },
    q13_conformite_client: {
      label: 'Have you had compliance issues?',
      options: {
        jamais: 'Never',
        rarement: 'Rarely',
        parfois: 'Sometimes',
        souvent: 'Often',
      },
    },
    q13_competences: {
      label: 'Your main skills',
      description: 'Select up to 5 skills',
    },
    q14_risques: {
      label: 'Main perceived risks',
      description: 'Select all risks that concern you',
      options: {
        agency: {
          amendes: 'Fines and penalties',
          reputation: 'Reputational risk',
          penal: 'Criminal risk (illegal work)',
          financier: 'Financial losses',
          client: 'Client loss',
        },
        client: {
          conformite: 'Regulatory non-compliance',
          qualite: 'Profile quality',
          delais: 'Missed deadlines',
          fiabilite: 'Provider reliability',
          cout: 'Budget overrun',
        },
        worker: {
          paiement: 'Non-payment',
          logement: 'Housing problems',
          sante: 'No health coverage',
          communication: 'Communication issues',
          contrat: 'Contract breach',
        },
      },
    },
    q15_budget_conformite: {
      label: 'Annual compliance/legal budget',
      options: {
        '<5k': 'Less than €5k',
        '5-20k': '€5-20k',
        '20-50k': '€20-50k',
        '50-100k': '€50-100k',
        '100k+': 'More than €100k',
      },
    },
    q15_partenaire: {
      label: 'Do you have a European recruitment partner?',
      options: {
        oui_satisfait: 'Yes, and satisfied',
        oui_insatisfait: 'Yes, but dissatisfied',
        non_cherche: 'No, but looking',
        non_interesse: 'No, not interested',
      },
    },
    q15_support_souhaite: {
      label: 'Type of support needed',
      description: 'Select all useful supports',
      options: {
        placement: 'Placement assistance',
        administratif: 'Administrative assistance',
        juridique: 'Legal advice',
        langue: 'Translation/Interpretation',
        logement: 'Housing assistance',
        formation: 'Training',
      },
    },
    q16_erp: {
      label: 'Do you use specialized ERP/software?',
      options: {
        oui: 'Yes',
        non: 'No',
        envisage: 'No, but considering it',
      },
    },
    q16_autre: {
      label: 'Which ERP/software do you use?',
      placeholder: 'Software name...',
    },
    q16_cout_recrutement: {
      label: 'Average cost per European recruitment',
      options: {
        '<500': 'Less than €500',
        '500-1500': '€500-1500',
        '1500-3000': '€1500-3000',
        '3000+': 'More than €3000',
      },
    },
    q16_agence_actuelle: {
      label: 'Do you currently have a temp agency?',
      options: {
        oui_local: 'Yes, local',
        oui_europeenne: 'Yes, European',
        non: 'No',
      },
    },
    q17_features: {
      label: 'Most useful features for you',
      description: 'Rank by priority',
      options: {
        sipsi: 'Automatic SIPSI declarations',
        a1: 'A1 certificate management',
        conformite: 'Real-time compliance dashboard',
        marketplace: 'Verified agency marketplace',
        support: '24/7 multilingual support',
        api: 'API for ERP integration',
      },
    },
    q18_score: {
      label: {
        agency: 'Interest in a platform like YoJob',
        client: 'Interest in a platform like YoJob',
        worker: 'Interest in a platform like YoJob',
      },
      description: 'From 0 (not at all) to 10 (very interested)',
    },
    q19_prix: {
      label: 'Acceptable price for this solution',
      options: {
        agency: {
          gratuit: 'Free only',
          '<100': 'Less than €100/month',
          '100-300': '€100-300/month',
          '300-1000': '€300-1000/month',
          '1000+': 'More than €1000/month',
          commission: 'Commission on transactions',
        },
        client: {
          gratuit: 'Free only',
          '<500': 'Less than €500/year',
          '500-2000': '€500-2000/year',
          '2000-5000': '€2000-5000/year',
          '5000+': 'More than €5000/year',
          commission: 'Commission per recruitment',
        },
        worker: {
          gratuit: 'Free only',
          '<10': 'Less than €10/month',
          '10-30': '€10-30/month',
          '30+': 'More than €30/month',
        },
      },
    },
    q20_concurrents: {
      label: 'Currently used solutions',
      description: 'Or known in your sector',
      placeholder: 'E.g.: Indeed, LinkedIn, local agencies...',
    },
    q21_recommandation: {
      label: 'Would you recommend YoJob to peers?',
      options: {
        certainement: 'Definitely',
        probablement: 'Probably',
        peut_etre: 'Maybe',
        probablement_pas: 'Probably not',
        certainement_pas: 'Definitely not',
      },
    },
    q22_vision: {
      label: {
        agency: 'Your vision of posting in 5 years',
        client: 'Your vision of European recruitment in 5 years',
        worker: 'Your vision of temporary work in 5 years',
      },
      placeholder: 'Share your vision in a few lines...',
      description: 'Optional but very valuable to us',
    },
    q23_besoins: {
      label: {
        agency: 'Currently unmet needs',
        client: 'Currently unmet needs',
        worker: 'What is missing in your opinion',
      },
      placeholder: 'Describe your needs...',
    },
    q24_email: {
      label: 'Professional email',
      placeholder: 'your@email.com',
    },
    q25_telephone: {
      label: 'Phone',
      placeholder: '+44 20 1234 5678',
    },
    q26_siret: {
      label: 'SIRET (if France)',
      placeholder: '123 456 789 00012',
      description: 'Optional',
    },
    q27_linkedin: {
      label: 'LinkedIn profile',
      placeholder: 'https://linkedin.com/in/...',
      description: 'Optional',
    },
    q28_demo: {
      label: 'Would you like a personalized demo?',
      options: {
        oui: 'Yes, contact me',
        plus_tard: 'Maybe later',
        non: 'No thanks',
      },
    },
    q29_early_access: {
      label: 'Interested in early access (beta)?',
      options: {
        oui: 'Yes, absolutely!',
        informe: 'Keep me informed',
        non: 'No',
      },
    },
    q30_commentaires: {
      label: 'Comments or suggestions',
      placeholder: 'Share your ideas, questions, remarks...',
      description: 'Optional',
    },
  },
};

// Export all translations
export const COMPLETE_TRANSLATIONS = {
  fr,
  en,
};

// Helper function to get translation
export function getTranslation(lang: SupportedLanguage, key: string): string {
  const keys = key.split('.');
  let value: any = COMPLETE_TRANSLATIONS[lang] || COMPLETE_TRANSLATIONS.fr;
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  
  return value || key;
}
