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
    profileWorker: 'Temporary Worker',
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
      label: 'Name',
      placeholder: 'Organization name or your full name',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      label: 'Year of establishment',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      label: 'Year your company was established',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      label: 'Your nationality',
      placeholder: 'E.g.: Polish, Romanian...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
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
      label: 'Main industry sectors',
      description: 'Select all relevant sectors',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      label: 'Your occupations',
      description: 'Select all your occupations',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      label: 'Country of your agency',
      placeholder: 'E.g.: Poland',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      label: 'Country where your company operates',
      placeholder: 'E.g.: France',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
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
        admin: 'Administrative complexity',
        conformite: 'Legal compliance',
        cout: 'Costs',
        langue: 'Language barriers',
        qualite: 'Quality/skills',
        autre: 'Other',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Your main challenge with temp work abroad',
      options: {
        admin: 'Administrative paperwork',
        langue: 'Language barrier',
        logement: 'Finding accommodation',
        transport: 'Transportation',
        salaire: 'Payment/salary issues',
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
      label: 'How do you manage posting declarations today?',
      options: {
        manuel: 'Manually (Excel, Word...)',
        logiciel_interne: 'Internal software',
        prestataire: 'External service provider',
        mixte: 'Mixed approach',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
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
      label: 'How do you find temp work?',
      options: {
        agence: 'Through temp agencies',
        bouche: 'Word of mouth',
        internet: 'Online job boards',
        direct: 'Direct application',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Have you faced penalties or incidents related to posting compliance?',
      description: 'Your answer remains anonymous',
      options: {
        oui_souvent: 'Yes, frequently',
        oui_rare: 'Yes, occasionally',
        non: 'No',
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
      label: 'Annual budget allocated to posting administrative management',
      options: {
        '0': 'Not specifically allocated',
        '1-5k': '€1,000 - €5,000',
        '5-20k': '€5,000 - €20,000',
        '20-50k': '€20,000 - €50,000',
        '50k+': 'More than €50,000',
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
      label: 'Are you satisfied with your temp work salary?',
      options: {
        tres_satisfait: 'Very satisfied',
        satisfait: 'Satisfied',
        neutre: 'Neutral',
        insatisfait: 'Dissatisfied',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      label: 'What percentage of revenue is lost due to administrative complexity?',
      options: {
        '0': 'No impact',
        '1-5': '1-5%',
        '5-10': '5-10%',
        '10-20': '10-20%',
        '20+': 'More than 20%',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      label: 'Your main concerns',
      description: 'Select all that apply',
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      label: 'Your main needs',
      description: 'Select all that apply',
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      label: 'Your expectations for temp work abroad',
      description: 'Select all that apply',
    },
    
    // Q15 : Problème
    q15_probleme: {
      label: 'What problem would you like to solve first?',
      placeholder: 'Describe your priority issue...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      label: 'Do you use ERP/management software?',
      options: {
        oui: 'Yes',
        non: 'No',
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
      label: 'Are you ready to change your work tools?',
      options: {
        oui_rapidement: 'Yes, immediately',
        oui_progressivement: 'Yes, gradually',
        non_satisfait: 'No, satisfied with current tools',
        non_peur: 'No, afraid of change',
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
      label: 'How interested are you in a European posting marketplace?',
      description: 'Rate from 1 (not interested) to 10 (very interested)',
    },
    
    // Q19 : Features
    q19_features: {
      label: 'Which features are most important to you?',
      description: 'Select your top 3 priorities',
    },
    
    // Q20 : Prix
    q20_prix: {
      label: 'Preferred pricing model',
      options: {
        pourcentage: 'Commission per worker (%)',
        fixe: 'Fixed monthly subscription',
        volume: 'Tiered pricing by volume',
        freemium: 'Free basic + paid premium',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      label: 'Monthly budget for a complete SaaS solution',
      options: {
        '0': 'Not willing to pay',
        '1-100': '€1 - €100/month',
        '100-300': '€100 - €300/month',
        '300-1000': '€300 - €1,000/month',
        '1000+': 'More than €1,000/month',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      label: 'Would you like to test an early version (MVP)?',
      options: {
        oui_beta: 'Yes, as beta tester',
        oui_payant: 'Yes, even if paid',
        peut_etre: 'Maybe',
        non: 'No',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'How do you see your role in the European marketplace?',
      options: {
        fournisseur: 'Worker provider',
        client: 'Client/Buyer',
        les_deux: 'Both',
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
    email: {
      label: 'Your email (optional)',
      placeholder: 'your.email@example.com',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-11T10:00:00.000Z',
    _origin: 'migrated',
    _translatedBy: 'Migration from translations-complete.ts',
  },
};