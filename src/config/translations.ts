/**
 * 🌍 TRADUCTIONS CENTRALISÉES FR/EN
 * 
 * Fichier temporaire pour les fallbacks de traduction
 * En production, les traductions seront stockées dans Supabase
 */

export const TRANSLATIONS = {
  fr: {
    // Navigation sections
    nav: {
      section1: 'Profil',
      section2: 'Détachement',
      section3: 'Besoins & Budget',
      section4: 'Intérêt YoJob',
      section5: 'Vision Future',
      section6: 'Contact',
    },

    // Common labels
    common: {
      oui: 'Oui',
      non: 'Non',
      autre: 'Autre',
      loading: 'Chargement...',
      submit: 'Envoyer',
      next: 'Suivant',
      previous: 'Précédent',
      skip: 'Passer',
    },

    // Sectors
    sectors: {
      btp: 'BTP',
      industrie: 'Industrie',
      logistique: 'Logistique',
      hotellerie: 'Hôtellerie',
      sante: 'Santé',
      agriculture: 'Agriculture',
      tech: 'Tech/IT',
      autres: 'Autres',
    },

    // Countries
    countries: {
      france: 'France',
      pologne: 'Pologne',
      roumanie: 'Roumanie',
      portugal: 'Portugal',
      espagne: 'Espagne',
      allemagne: 'Allemagne',
      belgique: 'Belgique',
      bulgarie: 'Bulgarie',
      paysbas: 'Pays-Bas',
      suisse: 'Suisse',
    },

    // Questions
    questions: {
      // Q1 - Nom
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

      // Q2 - Année création
      q2_annee: {
        label: 'Année de création',
        placeholder: '2015',
      },

      // Q3 - Taille
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

      // Q3 - Expérience (worker)
      q3_experience: {
        label: 'Années d\'expérience en intérim',
        options: {
          '<1': 'Moins d\'1 an',
          '1-3': '1-3 ans',
          '3-5': '3-5 ans',
          '5-10': '5-10 ans',
          '10+': 'Plus de 10 ans',
        },
      },

      // Q4 - Secteurs/Métiers
      q4_secteurs: {
        label: {
          agency: 'Secteurs d\'activité',
          client: 'Secteurs d\'activité',
        },
        description: 'Sélectionnez tous les secteurs concernés',
      },

      q4_metiers: {
        label: 'Métiers exercés',
        description: 'Sélectionnez tous vos métiers',
      },

      // Q6 - Volume
      q6_volume: {
        label: {
          agency: 'Volume annuel de travailleurs détachés',
          client: 'Volume de recrutements annuels',
          worker: 'Nombre total de missions réalisées',
        },
        options: {
          '0-50': '0-50',
          '51-200': '51-200',
          '201-500': '201-500',
          '500+': '500+',
        },
      },

      // Q7 - Origine/Expérience/Travail étranger
      q7_origine: {
        label: 'Pays d\'origine des travailleurs détachés',
      },

      q7_exp_detachement: {
        label: 'Avez-vous déjà utilisé le détachement européen ?',
        options: {
          envisage: 'Envisagé',
        },
      },

      q7_travail_etranger: {
        label: 'Avez-vous déjà travaillé à l\'étranger ?',
      },

      // Q8 - Destinations/Pays
      q8_destinations: {
        label: 'Pays de destination principaux',
      },

      q8_pays_origine_client: {
        label: 'Pays d\'origine des travailleurs',
      },

      q8_pays_travailles: {
        label: 'Dans quels pays avez-vous travaillé ?',
      },

      // Q9 - Défis/Freins/Satisfaction
      q9_defi: {
        label: 'Principal défi du détachement européen',
        options: {
          conformite: 'Conformité réglementaire',
          coordination: 'Coordination internationale',
          suivi: 'Suivi temps réel',
        },
      },

      q9_freins: {
        label: 'Principaux freins au recrutement européen',
        options: {
          couts: 'Coûts élevés',
          conformite: 'Complexité administrative',
          langue: 'Barrière de la langue',
          meconnaissance: 'Méconnaissance du marché',
          delais: 'Délais trop longs',
        },
      },

      q9_satisfaction: {
        label: 'Satisfaction globale de votre expérience',
        description: 'De 1 (très insatisfait) à 10 (très satisfait)',
      },

      // Q10 - Gestion/Délai
      q10_gestion: {
        label: 'Comment gérez-vous le détachement ?',
        options: {
          manuel: 'Manuellement (Excel, emails)',
          erp: 'Logiciel ERP',
          partenaire: 'Via un partenaire/courtier',
        },
      },

      q10_delai: {
        label: 'Délai moyen pour recruter un profil',
        options: {
          '<1mois': 'Moins d\'1 mois',
          '1-3mois': '1-3 mois',
          '3-6mois': '3-6 mois',
          '>6mois': 'Plus de 6 mois',
        },
      },

      // Q11 - Incidents
      q11_incidents: {
        label: 'Fréquence des incidents de non-conformité',
        options: {
          jamais: 'Jamais',
          rare: 'Rarement (<5%)',
          parfois: 'Parfois (5-15%)',
          souvent: 'Souvent (>15%)',
        },
      },

      // Q12 - Budget
      q12_budget: {
        label: 'Budget temps/personne pour gestion détachement',
        options: {
          '<5h': 'Moins de 5h/mois',
          '5-15h': '5-15h/mois',
          '15-40h': '15-40h/mois',
          '>40h': 'Plus de 40h/mois',
        },
      },

      q12_budget_annuel: {
        label: 'Budget annuel recrutement',
        options: {
          '<50k': 'Moins de 50k€',
          '50-200k': '50-200k€',
          '200-500k': '200-500k€',
          '>500k': 'Plus de 500k€',
        },
      },

      q12_problemes_worker: {
        label: 'Problèmes rencontrés lors de vos missions',
        options: {
          paiement: 'Retards de paiement',
          logement: 'Difficulté logement',
          langue: 'Barrière de la langue',
          admin: 'Complexité administrative',
          conditions: 'Conditions de travail',
          isolement: 'Isolement social',
        },
      },

      // Q13 - Manque à gagner/Difficultés/Freins
      q13_manque_gagner: {
        label: 'Manque à gagner estimé par inefficacités',
        options: {
          '<10k': 'Moins de 10k€/an',
          '10-50k': '10-50k€/an',
          '50-200k': '50-200k€/an',
          '>200k': 'Plus de 200k€/an',
        },
      },

      q13_difficulte: {
        label: 'Principales difficultés de recrutement',
        options: {
          penurie: 'Pénurie de candidats',
          couts: 'Coûts élevés',
          conformite: 'Conformité légale',
          turnover: 'Turnover élevé',
        },
      },

      q13_freins_mobilite: {
        label: 'Qu\'est-ce qui vous freine pour chercher à l\'étranger ?',
        options: {
          langue: 'Barrière de la langue',
          famille: 'Situation familiale',
          logement: 'Difficulté logement',
          admin: 'Paperasse administrative',
          droits: 'Méconnaissance des droits',
        },
      },

      // Q14 - Risques/Logiciel RH
      q14_risques: {
        label: 'Préoccupation sur risques juridiques',
        options: {
          tres_eleve: 'Très élevée',
          eleve: 'Élevée',
          moderee: 'Modérée',
          faible: 'Faible',
        },
      },

      q14_logiciel_rh: {
        label: 'Utilisez-vous un logiciel RH/ATS ?',
        options: {
          projet: 'En projet',
        },
      },

      // Q15 - Problème/Postes non pourvus
      q15_probleme: {
        label: 'Problème majeur actuel dans votre activité',
        placeholder: 'Décrivez votre principal défi...',
      },

      q15_postes_non_pourvus: {
        label: 'Nombre de postes non pourvus par mois en moyenne',
        placeholder: '5',
      },

      // Q16 - ERP
      q16_erp: {
        label: 'Utilisez-vous un ERP pour la gestion ?',
        options: {
          projet: 'En projet',
        },
      },

      // Q17 - Migration
      q17_migration: {
        label: 'Préoccupation migration de données',
        options: {
          modere: 'Modérément',
        },
      },

      // Q18 - Score NPS
      q18_score: {
        label: {
          agency: 'Quelle est votre intention d\'utiliser YoJob ?',
          client: 'Quelle est votre intention d\'utiliser YoJob ?',
          worker: 'Recommanderiez-vous l\'intérim international ?',
        },
        description: 'De 1 (pas intéressé) à 10 (très intéressé)',
      },

      // Q19 - Features
      q19_features: {
        label: 'Fonctionnalités prioritaires',
        description: 'Sélectionnez jusqu\'à 3 fonctionnalités',
        options: {
          dashboard: 'Dashboard en temps réel',
          conformite: 'Gestion conformité auto',
          tracking: 'Tracking multi-pays',
          alertes: 'Alertes réglementaires',
          reporting: 'Reporting automatisé',
        },
      },

      q19_features_client: {
        label: 'Fonctionnalités prioritaires',
        description: 'Sélectionnez jusqu\'à 3 fonctionnalités',
        options: {
          recherche: 'Recherche rapide de profils',
          conformite: 'Gestion conformité',
          comparaison: 'Comparaison prix/agences',
          support: 'Support dédié',
        },
      },

      q19_features_worker: {
        label: 'Fonctionnalités souhaitées',
        description: 'Sélectionnez jusqu\'à 3 fonctionnalités',
        options: {
          offres: 'Offres claires et détaillées',
          support_langue: 'Support dans ma langue',
          logement: 'Aide au logement',
          transparence: 'Transparence salaire',
          avis: 'Avis d\'autres travailleurs',
        },
      },

      // Q20 - Prix/Mobilité
      q20_prix: {
        label: 'Prix acceptable pour YoJob',
        options: {
          gratuit: 'Gratuit uniquement',
          freemium: 'Freemium (base gratuite)',
          abonnement: 'Abonnement mensuel',
          commission: 'Commission par mission',
        },
      },

      q20_prix_client: {
        label: 'Modèle de prix préféré',
      },

      q20_mobilite: {
        label: 'Seriez-vous mobile pour une mission ?',
        options: {
          region: 'Oui dans ma région',
          pays: 'Oui dans mon pays',
          europe: 'Oui partout en Europe',
        },
      },

      // Q21 - Budget mensuel/Attentes
      q21_budget_mensuel: {
        label: 'Budget mensuel acceptable',
        options: {
          '0': '0€ (gratuit uniquement)',
          '<100': 'Moins de 100€',
          '100-500': '100-500€',
          '>500': 'Plus de 500€',
        },
      },

      q21_budget_mensuel_client: {
        label: 'Budget mensuel acceptable',
        options: {
          '<500': 'Moins de 500€',
          '500-2000': '500-2000€',
          '2000-5000': '2000-5000€',
          '>5000': 'Plus de 5000€',
        },
      },

      q21_attentes_plateforme: {
        label: 'Qu\'attendez-vous d\'une plateforme de recrutement ?',
        placeholder: 'Décrivez vos attentes...',
      },

      // Q22 - MVP
      q22_mvp: {
        label: 'Fonctionnalités indispensables pour version 1',
        placeholder: 'Décrivez les fonctionnalités essentielles...',
      },

      // Q23 - Rôle
      q23_role: {
        label: 'Votre rôle dans la décision',
        options: {
          decideur: 'Décideur final',
          influenceur: 'Influenceur',
          utilisateur: 'Utilisateur final',
        },
      },

      // Q24 - Évolution
      q24_evolution: {
        label: 'Vision évolution du détachement européen',
        placeholder: 'Partagez votre vision pour les 5 prochaines années...',
      },

      // Q25 - Besoins
      q25_besoins: {
        label: {
          agency: 'Besoins futurs pour votre agence',
          client: 'Besoins futurs en recrutement',
          worker: 'Comment voyez-vous votre carrière ?',
        },
        placeholder: {
          agency: 'Décrivez vos besoins futurs...',
          client: 'Décrivez vos besoins futurs...',
          worker: 'Partagez votre vision de carrière...',
        },
      },

      // Email & Consentements
      email: {
        label: 'Adresse email professionnelle',
        placeholder: 'votre.email@entreprise.com',
      },

      consent_newsletter: {
        label: 'J\'accepte de recevoir la newsletter YoJob',
        description: 'Actualités, conseils et opportunités (désabonnement possible à tout moment)',
      },

      consent_contact: {
        label: 'J\'accepte d\'être contacté par YoJob',
        description: 'Pour une démo personnalisée ou un accompagnement',
      },
    },
  },

  en: {
    // Navigation sections
    nav: {
      section1: 'Profile',
      section2: 'Posting',
      section3: 'Needs & Budget',
      section4: 'YoJob Interest',
      section5: 'Future Vision',
      section6: 'Contact',
    },

    // Common labels
    common: {
      oui: 'Yes',
      non: 'No',
      autre: 'Other',
      loading: 'Loading...',
      submit: 'Submit',
      next: 'Next',
      previous: 'Previous',
      skip: 'Skip',
    },

    // Sectors
    sectors: {
      btp: 'Construction',
      industrie: 'Industry',
      logistique: 'Logistics',
      hotellerie: 'Hospitality',
      sante: 'Healthcare',
      agriculture: 'Agriculture',
      tech: 'Tech/IT',
      autres: 'Others',
    },

    // Countries
    countries: {
      france: 'France',
      pologne: 'Poland',
      roumanie: 'Romania',
      portugal: 'Portugal',
      espagne: 'Spain',
      allemagne: 'Germany',
      belgique: 'Belgium',
      bulgarie: 'Bulgaria',
      paysbas: 'Netherlands',
      suisse: 'Switzerland',
    },

    // Questions (English translations)
    questions: {
      q1_nom: {
        label: {
          agency: 'Your agency name',
          client: 'Your company name',
          worker: 'Your first and last name',
        },
        placeholder: {
          agency: 'e.g.: Staffing Europe Solutions',
          client: 'e.g.: My Company Ltd',
          worker: 'e.g.: John Doe',
        },
      },

      q2_annee: {
        label: 'Year of creation',
        placeholder: '2015',
      },

      q3_taille: {
        label: {
          agency: 'Agency size',
          client: 'Company size',
        },
        options: {
          '1-9': '1-9 employees',
          '10-49': '10-49 employees',
          '50-249': '50-249 employees',
          '250+': '250+ employees',
        },
      },

      q3_experience: {
        label: 'Years of experience in temporary work',
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
          agency: 'Business sectors',
          client: 'Business sectors',
        },
        description: 'Select all relevant sectors',
      },

      q4_metiers: {
        label: 'Jobs performed',
        description: 'Select all your jobs',
      },

      q6_volume: {
        label: {
          agency: 'Annual volume of posted workers',
          client: 'Annual recruitment volume',
          worker: 'Total number of missions completed',
        },
        options: {
          '0-50': '0-50',
          '51-200': '51-200',
          '201-500': '201-500',
          '500+': '500+',
        },
      },

      q7_origine: {
        label: 'Country of origin of posted workers',
      },

      q7_exp_detachement: {
        label: 'Have you ever used European posting?',
        options: {
          envisage: 'Considered',
        },
      },

      q7_travail_etranger: {
        label: 'Have you ever worked abroad?',
      },

      q8_destinations: {
        label: 'Main destination countries',
      },

      q8_pays_origine_client: {
        label: 'Workers\' country of origin',
      },

      q8_pays_travailles: {
        label: 'In which countries have you worked?',
      },

      q9_defi: {
        label: 'Main challenge of European posting',
        options: {
          conformite: 'Regulatory compliance',
          coordination: 'International coordination',
          suivi: 'Real-time tracking',
        },
      },

      q9_freins: {
        label: 'Main barriers to European recruitment',
        options: {
          couts: 'High costs',
          conformite: 'Administrative complexity',
          langue: 'Language barrier',
          meconnaissance: 'Market ignorance',
          delais: 'Too long delays',
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
          erp: 'ERP software',
          partenaire: 'Through a partner/broker',
        },
      },

      q10_delai: {
        label: 'Average time to recruit a profile',
        options: {
          '<1mois': 'Less than 1 month',
          '1-3mois': '1-3 months',
          '3-6mois': '3-6 months',
          '>6mois': 'More than 6 months',
        },
      },

      q11_incidents: {
        label: 'Frequency of non-compliance incidents',
        options: {
          jamais: 'Never',
          rare: 'Rarely (<5%)',
          parfois: 'Sometimes (5-15%)',
          souvent: 'Often (>15%)',
        },
      },

      q12_budget: {
        label: 'Time/person budget for posting management',
        options: {
          '<5h': 'Less than 5h/month',
          '5-15h': '5-15h/month',
          '15-40h': '15-40h/month',
          '>40h': 'More than 40h/month',
        },
      },

      q12_budget_annuel: {
        label: 'Annual recruitment budget',
        options: {
          '<50k': 'Less than €50k',
          '50-200k': '€50-200k',
          '200-500k': '€200-500k',
          '>500k': 'More than €500k',
        },
      },

      q12_problemes_worker: {
        label: 'Problems encountered during your missions',
        options: {
          paiement: 'Payment delays',
          logement: 'Housing difficulties',
          langue: 'Language barrier',
          admin: 'Administrative complexity',
          conditions: 'Working conditions',
          isolement: 'Social isolation',
        },
      },

      q13_manque_gagner: {
        label: 'Estimated lost revenue due to inefficiencies',
        options: {
          '<10k': 'Less than €10k/year',
          '10-50k': '€10-50k/year',
          '50-200k': '€50-200k/year',
          '>200k': 'More than €200k/year',
        },
      },

      q13_difficulte: {
        label: 'Main recruitment difficulties',
        options: {
          penurie: 'Shortage of candidates',
          couts: 'High costs',
          conformite: 'Legal compliance',
          turnover: 'High turnover',
        },
      },

      q13_freins_mobilite: {
        label: 'What prevents you from looking abroad?',
        options: {
          langue: 'Language barrier',
          famille: 'Family situation',
          logement: 'Housing difficulties',
          admin: 'Administrative paperwork',
          droits: 'Ignorance of rights',
        },
      },

      q14_risques: {
        label: 'Concern about legal risks',
        options: {
          tres_eleve: 'Very high',
          eleve: 'High',
          moderee: 'Moderate',
          faible: 'Low',
        },
      },

      q14_logiciel_rh: {
        label: 'Do you use HR/ATS software?',
        options: {
          projet: 'In project',
        },
      },

      q15_probleme: {
        label: 'Current major problem in your activity',
        placeholder: 'Describe your main challenge...',
      },

      q15_postes_non_pourvus: {
        label: 'Average number of unfilled positions per month',
        placeholder: '5',
      },

      q16_erp: {
        label: 'Do you use an ERP for management?',
        options: {
          projet: 'In project',
        },
      },

      q17_migration: {
        label: 'Concern about data migration',
        options: {
          modere: 'Moderately',
        },
      },

      q18_score: {
        label: {
          agency: 'What is your intention to use YoJob?',
          client: 'What is your intention to use YoJob?',
          worker: 'Would you recommend international temporary work?',
        },
        description: 'From 1 (not interested) to 10 (very interested)',
      },

      q19_features: {
        label: 'Priority features',
        description: 'Select up to 3 features',
        options: {
          dashboard: 'Real-time dashboard',
          conformite: 'Auto compliance management',
          tracking: 'Multi-country tracking',
          alertes: 'Regulatory alerts',
          reporting: 'Automated reporting',
        },
      },

      q19_features_client: {
        label: 'Priority features',
        description: 'Select up to 3 features',
        options: {
          recherche: 'Fast profile search',
          conformite: 'Compliance management',
          comparaison: 'Price/agency comparison',
          support: 'Dedicated support',
        },
      },

      q19_features_worker: {
        label: 'Desired features',
        description: 'Select up to 3 features',
        options: {
          offres: 'Clear and detailed offers',
          support_langue: 'Support in my language',
          logement: 'Housing assistance',
          transparence: 'Salary transparency',
          avis: 'Other workers\' reviews',
        },
      },

      q20_prix: {
        label: 'Acceptable price for YoJob',
        options: {
          gratuit: 'Free only',
          freemium: 'Freemium (free base)',
          abonnement: 'Monthly subscription',
          commission: 'Commission per mission',
        },
      },

      q20_prix_client: {
        label: 'Preferred pricing model',
      },

      q20_mobilite: {
        label: 'Would you be mobile for a mission?',
        options: {
          region: 'Yes in my region',
          pays: 'Yes in my country',
          europe: 'Yes anywhere in Europe',
        },
      },

      q21_budget_mensuel: {
        label: 'Acceptable monthly budget',
        options: {
          '0': '€0 (free only)',
          '<100': 'Less than €100',
          '100-500': '€100-500',
          '>500': 'More than €500',
        },
      },

      q21_budget_mensuel_client: {
        label: 'Acceptable monthly budget',
        options: {
          '<500': 'Less than €500',
          '500-2000': '€500-2000',
          '2000-5000': '€2000-5000',
          '>5000': 'More than €5000',
        },
      },

      q21_attentes_plateforme: {
        label: 'What do you expect from a recruitment platform?',
        placeholder: 'Describe your expectations...',
      },

      q22_mvp: {
        label: 'Essential features for version 1',
        placeholder: 'Describe essential features...',
      },

      q23_role: {
        label: 'Your role in decision-making',
        options: {
          decideur: 'Final decision-maker',
          influenceur: 'Influencer',
          utilisateur: 'End user',
        },
      },

      q24_evolution: {
        label: 'Vision of European posting evolution',
        placeholder: 'Share your vision for the next 5 years...',
      },

      q25_besoins: {
        label: {
          agency: 'Future needs for your agency',
          client: 'Future recruitment needs',
          worker: 'How do you see your career?',
        },
        placeholder: {
          agency: 'Describe your future needs...',
          client: 'Describe your future needs...',
          worker: 'Share your career vision...',
        },
      },

      email: {
        label: 'Professional email address',
        placeholder: 'your.email@company.com',
      },

      consent_newsletter: {
        label: 'I agree to receive the YoJob newsletter',
        description: 'News, tips and opportunities (unsubscribe anytime)',
      },

      consent_contact: {
        label: 'I agree to be contacted by YoJob',
        description: 'For a personalized demo or support',
      },
    },
  },
};
