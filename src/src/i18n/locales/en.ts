/**
 * 🇬🇧 TRADUCTIONS ANGLAISES (EN)
 * 
 * Migré depuis l'ancien système de traductions
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @migrated 2024-12-11T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const en: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profile',
    section2: 'Experience',
    section3: 'Needs',
    section4: 'Interest',
    section5: 'Vision',
    section6: 'Contact',
    dashboard: 'Dashboard',
    back_to_site: 'Back to website',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Overview',
      results: 'Results',
      questions: 'Questions',
      translations: 'Translations',
      export: 'Export',
      integrations: 'Integrations',
      cms: 'Form CMS',
      settings: 'Settings',
      prospects: 'Prospects',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 New',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Logout',
      back_to_survey: 'Back to survey',
      toggle_sidebar: 'Collapse/Expand',
    },
    user: {
      welcome: 'Welcome',
      logged_in_as: 'Logged in as',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Agency Profile',
      description: '4 questions • 2 min',
    },
    2: {
      title: 'Secondment',
      description: '7 questions • 3 min',
    },
    3: {
      title: 'Needs',
      description: '6 questions • 2 min',
    },
    4: {
      title: 'YoJob Interest',
      description: '6 questions • 3 min',
    },
    5: {
      title: 'Future Vision',
      description: '2 questions • 1 min',
    },
    6: {
      title: 'Contact',
      description: '1 question • 1 min',
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Market Research',
  },
  
  // Hero
  hero: {
    title: 'Market Survey',
    subtitle: 'Help us better understand your needs',
    description: 'This survey takes about 10-15 minutes. Your answers will help us create a solution tailored to your sector.',
    cta_start: 'Start Survey',
    cta_dashboard: 'Access Dashboard',
    badge: 'European market study',
    stat: {
      countries: '27 European countries',
      questions: 'questions',
      benchmark: 'Get the 2026 benchmark',
      insights: 'Exclusive market insights',
      opportunities: 'Priority access to jobs',
    },
    footer: {
      info: 'questions • Anonymous • GDPR compliant',
      anonymous: 'Anonymous',
      gdpr: 'GDPR compliant',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Who are you?',
    subtitle: 'Select your profile to personalize the questions',
    agency: 'Temp Agency',
    agency_description: 'You are a temporary work or temp agency',
    client: 'Client Company',
    client_description: 'You are a company that employs temp workers',
    worker: 'Temp Worker',
    worker_description: 'You are a temp or posted worker',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 European Market Study - Recruitment & Temporary Work',
    title: 'Share your European market experience',
    subtitle: 'Select your profile to start the survey',
    cta: 'Click to start →',
    trust: {
      secure: 'Secure data',
      languages: '{count} languages available',
      languages_suffix: 'languages available',
      anonymous: 'Anonymous & confidential',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Temporary Work Agency',
      description: 'You are a European temp agency. Share your posting experience.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Client Company',
      description: 'You hire temp workers. Share your needs and expectations.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Temporary Worker',
      description: 'You work as a temp. Share your field experience.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Previous',
    next: 'Next',
    submit: 'Submit my answers',
    submitting: 'Submitting...',
    back: 'Back',
    start: 'Start',
  },
  
  // Confirmation
  confirmation: {
    title: 'Thank you for your participation!',
    subtitle: 'Your answers have been successfully saved',
    message: 'We are currently analyzing all responses to create a solution perfectly tailored to your needs.',
    cta_back: 'Back to homepage',
    cta_dashboard: 'View Dashboard',
  },
  
  // Progress
  progress: {
    section: 'Section',
    question: 'Question',
    section_completed: 'Section completed',
    questions_remaining: '{count} questions remaining',
    time_remaining: 'About {time} remaining',
  },
  
  // Common translations
  common: {
    oui: 'Yes',
    non: 'No',
    autre: 'Other',
    loading: 'Loading...',
    submit: 'Submit',
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    required: 'Required',
    optional: 'Optional',
    error: 'Error',
    success: 'Success',
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    profileAgency: 'Temp Agency',
    profileClient: 'Client Company',
    profileWorker: 'Temp Worker',
    score_not_interested: 'Not interested',
    score_very_interested: 'Very interested',
  },
  
  // Sectors
  sectors: {
    btp: 'Construction',
    industrie: 'Manufacturing',
    logistique: 'Logistics',
    hotellerie: 'Hospitality',
    sante: 'Healthcare',
    agriculture: 'Agriculture',
    tech: 'Tech/IT',
    autres: 'Other',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions EN
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Name',
      placeholder: 'Organization name or your full name',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Year of establishment',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Year your company was established',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Your nationality',
      placeholder: 'E.g.: Polish, Romanian...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organization size',
      options: {
        '1-9': '1-9 employees',
        '10-49': '10-49 employees',
        '50-249': '50-249 employees',
        '250+': '250+ employees',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Years of temporary work experience',
      options: {
        '<1': 'Less than 1 year',
        '1-3': '1-3 years',
        '3-5': '3-5 years',
        '5-10': '5-10 years',
        '10+': 'More than 10 years',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Main industry sectors',
      description: 'Select all relevant sectors',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Your occupations',
      description: 'Select all your occupations',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Country of your agency',
      placeholder: 'E.g.: Poland',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Country where your company operates',
      placeholder: 'E.g.: France',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Countries where you worked as temp worker',
      placeholder: 'E.g.: France, Germany, Belgium...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Annual volume of posted workers',
      options: {
        '0': 'None yet',
        '1-50': '1-50 workers',
        '51-200': '51-200 workers',
        '201-500': '201-500 workers',
        '500+': 'More than 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'How many temp workers do you employ per year?',
      options: {
        '0': 'None currently',
        '1-10': '1-10 people',
        '11-50': '11-50 people',
        '51-200': '51-200 people',
        '200+': '200+ people',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'How frequently do you work as a temp?',
      options: {
        permanent: 'Regularly (all year)',
        saisonnier: 'Seasonal (certain months)',
        occasionnel: 'Occasionally',
        jamais: 'Never yet (looking)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Where are your posted workers from?',
      placeholder: 'E.g.: Poland, Romania, Bulgaria...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Destination countries',
      description: 'Countries where you post workers',
      placeholder: 'E.g.: France, Germany, Belgium, Netherlands...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nationalities of temp workers you employ',
      placeholder: 'E.g.: Polish, Romanian, Bulgarian...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Your main challenge with international posting',
      options: {
        admin: 'Administrative complexity (A1, SIPSI...)',
        conformite: 'Multi-country legal compliance',
        cout: 'Management costs and time',
        langues: 'Language barriers',
        autre: 'Other',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Your main challenge with European temp workers',
      options: {
        trouver: 'Finding reliable agencies',
        conformite: 'Legal compliance',
        qualite: 'Quality/skills',
        cout: 'Costs too high',
        langues: 'Communication / Languages',
        autre: 'Other',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Your main challenge in your assignments',
      options: {
        trouver: 'Finding assignments',
        admin: 'Administrative paperwork',
        logement: 'Housing / Accommodation',
        langue: 'Local language',
        paiement: 'Payments / Salary',
        autre: 'Other',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Please specify your main challenge',
      placeholder: 'Describe your main challenge...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'How do you manage posting declarations today?',
      options: {
        interne: 'Internal team',
        externe: 'External service provider',
        mixte: 'Mixed approach',
        manuel: 'Manual management',
        logiciel: 'Specialized software',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'How many temporary work agencies do you use?',
      options: {
        '0': 'None',
        '1': '1 agency',
        '2-3': '2-3 agencies',
        '4-10': '4-10 agencies',
        '10+': 'More than 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'How do you recruit temp workers?',
      options: {
        agence_fr: 'French temp agencies',
        agence_euro: 'European temp agencies',
        direct: 'Direct recruitment',
        mixte: 'Mixed',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'How do you find temp work?',
      options: {
        agence: 'Through temp agencies',
        bouche: 'Word of mouth',
        internet: 'Online job boards',
        direct: 'Direct application',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'How many agencies do you work with?',
      options: {
        '1': 'Only 1 agency',
        '2-3': '2-3 agencies',
        '4-10': '4-10 agencies',
        '10+': 'More than 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Have you faced penalties or incidents related to posting compliance?',
      description: 'Your answer remains anonymous',
      options: {
        jamais: 'No, never',
        rarement: 'Rarely (1-2 times)',
        parfois: 'Sometimes (3-5 times)',
        souvent: 'Often (6+ times)',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Do you verify the legal compliance of temp agencies?',
      options: {
        oui_systematique: 'Yes, systematically',
        oui_parfois: 'Yes, sometimes',
        non: 'No',
        ne_sait_pas: "Don't know",
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Have you experienced problems with temp work abroad?',
      options: {
        oui_graves: 'Yes, serious issues',
        oui_mineurs: 'Yes, minor issues',
        non: 'No',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Annual budget allocated to posting administrative management',
      options: {
        '0-5k': '€0-5,000 / year',
        '5-15k': '€5,000-15,000 / year',
        '15-30k': '€15,000-30,000 / year',
        '30k+': '€30,000+ / year',
        inconnu: "I don't know",
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Annual budget dedicated to temporary work',
      options: {
        '0-50k': '€0 - €50,000',
        '50-200k': '€50,000 - €200,000',
        '200-500k': '€200,000 - €500,000',
        '500k+': '€500,000+',
        'inconnu': "Don't know",
      },
    },
    
    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Satisfaction with current temp agencies',
      options: {
        tres_satisfait: 'Very satisfied',
        satisfait: 'Satisfied',
        neutre: 'Neutral',
        insatisfait: 'Dissatisfied',
      },
    },
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Are you satisfied with your temp work salary?',
      options: {
        '<1500': 'Less than €1,500',
        '1500-2500': '€1,500 - €2,500',
        '2500-3500': '€2,500 - €3,500',
        '3500+': '€3,500+',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'What percentage of revenue is lost due to administrative complexity?',
      options: {
        'non': 'No, not really',
        'faible': 'Yes, low (< 5% revenue)',
        'moyen': 'Yes, medium (5-15% revenue)',
        'important': 'Yes, significant (> 15% revenue)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Satisfaction with your current temp agencies',
      options: {
        'tres_satisfait': 'Very satisfied',
        'satisfait': 'Satisfied',
        'neutre': 'Neutral',
        'insatisfait': 'Dissatisfied',
        'tres_insatisfait': 'Very dissatisfied',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Satisfaction with your current temp agencies',
      options: {
        'tres_satisfait': 'Very satisfied',
        'satisfait': 'Satisfied',
        'neutre': 'Neutral',
        'insatisfait': 'Dissatisfied',
        'tres_insatisfait': 'Very dissatisfied',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Your main concerns',
      description: 'Select all that apply',
      options: {
        amendes: 'Fines and penalties',
        reputation: 'Reputation / Image',
        penal: 'Criminal liability',
        delais: 'Mission delays',
        clients: 'Loss of clients',
        aucun: 'No major risk',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Your main needs',
      description: 'Select all that apply',
      options: {
        fiabilite: 'Finding reliable agencies',
        conformite: 'Legal compliance',
        qualite: 'Quality/skills',
        cout: 'Costs',
        disponibilite: 'Candidate availability',
        aucun: 'No major need',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Your expectations for temp work abroad',
      description: 'Select all that apply',
      options: {
        salaire: 'Better salary',
        conditions: 'Better working conditions',
        stabilite: 'Stability',
        experience: 'International experience',
        logement: 'Housing assistance',
        aucun: 'No particular expectations',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Your main concerns',
      description: 'Select all that apply',
      options: {
        conformite: 'Legal compliance',
        qualite: 'Quality/skills',
        communication: 'Communication/Languages',
        cout: 'Unexpected costs',
        disponibilite: 'Candidate availability',
        aucun: 'No major concerns',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'What problems do you encounter most often?',
      description: 'Select all that apply',
      options: {
        paiement: 'Payment delays',
        conditions: 'Poor conditions',
        contrat: 'Contracts not respected',
        logement: 'Inadequate housing',
        communication: 'Communication issues',
        aucun: 'No major problems',
      },
    },
    
    // Q15 : Problème
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'What problem would you like to solve first?',
      placeholder: 'Describe your priority issue...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'What are your priority needs?',
      placeholder: 'E.g.: Find quickly, better quality, prices...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'What would you like to improve in your assignments?',
      placeholder: 'E.g.: Salary, housing, support, stability...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Do you use ERP/management software?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Other',
        aucun: 'No ERP',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Which software/ERP?',
      placeholder: 'E.g.: SAP, Odoo, custom...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Your main selection criteria for temp agencies',
      description: 'Select your top 3',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'What would improve your temp work experience?',
      description: 'Select all that apply',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Are you ready to change your work tools?',
      options: {
        oui: 'Yes, no problem',
        conditions: 'Yes, under conditions',
        difficile: 'Difficult, but open',
        non: 'No, not conceivable',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Monthly budget for a temp recruitment platform',
      options: {
        '0': 'Not willing to pay',
        '1-100': '€1 - €100/month',
        '100-500': '€100 - €500/month',
        '500-1000': '€500 - €1,000/month',
        '1000+': 'More than €1,000/month',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Would you use a platform to find temp work abroad?',
      options: {
        oui_certainement: 'Yes, definitely',
        oui_probablement: 'Yes, probably',
        peut_etre: 'Maybe',
        non: 'No',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'How interested are you in a European posting marketplace?',
      description: 'Rate from 1 (not interested) to 10 (very interested)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Most interesting features',
      description: 'Select your top 3 priorities',
      options: {
        sipsi: 'Automatic SIPSI declaration',
        a1: 'A1 certificate management',
        conformite: 'Compliance dashboard',
        alertes: 'Alerts & renewals',
        documents: 'Document centralization',
        marketplace: 'Agency marketplace',
        support: 'Multilingual expert support',
        api: 'API integration (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Most interesting features',
      description: 'Select all that interest you',
      options: {
        recherche: 'Search for reliable agencies',
        comparaison: 'Price/quality comparison',
        avis: 'Verified reviews',
        conformite: 'Compliance guarantee',
        support: 'Dedicated support',
        facturation: 'Centralized billing',
        suivi: 'Real-time tracking',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Most interesting features',
      description: 'Select all that interest you',
      options: {
        recherche: 'Job search',
        avis: 'Agency reviews',
        logement: 'Housing assistance',
        paiement: 'Secure payment',
        support: 'Support in my language',
        documents: 'Admin documents help',
        formation: 'Training programs',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Preferred pricing model',
      options: {
        mensuel: 'Fixed monthly subscription',
        usage: 'Pay-as-you-go (usage-based)',
        annuel: 'Annual plan (discount)',
        gratuit: 'Free for workers',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Monthly budget for a complete SaaS solution',
      options: {
        '0-100': '€0 - €100/month',
        '100-300': '€100 - €300/month',
        '300-500': '€300 - €500/month',
        '500-1000': '€500 - €1,000/month',
        '1000+': 'More than €1,000/month',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Would you like to test an early version (MVP)?',
      options: {
        oui_gratuit: 'Yes, for free',
        oui_reduc: 'Yes, with a discount',
        peut_etre: 'Maybe, depends on features',
        non: 'No, not interested',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'How do you see your role in the European marketplace?',
      options: {
        decideur: 'Final decision maker',
        influenceur: 'Influencer / Recommendation',
        utilisateur: 'End user',
        autre: 'Other',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Your international expansion plans',
      options: {
        oui_rapide: 'Yes, within 6 months',
        oui_lent: 'Yes, within 1-2 years',
        maintien: 'Maintain current countries',
        reduction: 'Reduce international scope',
      },
    },
    
    // Q25 : Besoins
    q25_besoins: {
      label: 'Other needs or comments',
      placeholder: 'Share any other feedback or needs...',
    },
    
    // Section 6 - Contact
    
    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Professional phone number',
      placeholder: '+33 6 12 34 56 78',
    },
    
    // Q27 : Prénom
    q27_firstname: {
      label: 'First name',
      placeholder: 'Your first name',
    },
    
    // Q28 : Nom
    q28_lastname: {
      label: 'Last name',
      placeholder: 'Your last name',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'SIRET or SIREN (optional)',
      placeholder: '123 456 789 00012',
      description: 'For enrichment via Pappers/Société.com',
    },
    
    // Q30 : Email
    email: {
      label: 'Your email',
      placeholder: 'your.email@example.com',
    },
    
    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'I agree to be contacted again',
    },
    
    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'I would like to receive the study report',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-11T10:00:00.000Z',
    _origin: 'migrated',
    _translatedBy: 'Migration from translations-complete.ts',
  },
};
