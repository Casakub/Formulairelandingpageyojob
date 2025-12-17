/**
 * 🇩🇰 TRADUCTIONS DANOISES (DA)
 *
 * Traductions complètes pour le danois
 * Base: en.ts (structure identique)
 *
 * @version 2.0.0
 * @created 2024-12-15T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const da: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,

  // Navigation
  nav: {
    section1: 'Profil',
    section2: 'Erfaring',
    section3: 'Behov',
    section4: 'Interesse',
    section5: 'Vision',
    section6: 'Kontakt',
    dashboard: 'Dashboard',
    back_to_site: 'Tilbage til websitet',
  },

  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Oversigt',
      results: 'Resultater',
      questions: 'Spørgsmål',
      translations: 'Oversættelser',
      export: 'Eksport',
      integrations: 'Integrationer',
      cms: 'CMS-formular',
      settings: 'Indstillinger',
      prospects: 'Potentielle kunder',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Ny',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Log ud',
      back_to_survey: 'Tilbage til undersøgelsen',
      toggle_sidebar: 'Fold sammen/Udvid',
    },
    user: {
      welcome: 'Velkommen',
      logged_in_as: 'Logget ind som',
    },
  },

  // Sections
  section: {
    1: {
      title: 'Bureuprofil',
      description: '4 spørgsmål • 2 min',
    },
    2: {
      title: 'Udstationering',
      description: '7 spørgsmål • 3 min',
    },
    3: {
      title: 'Behov',
      description: '6 spørgsmål • 2 min',
    },
    4: {
      title: 'YoJob interesse',
      description: '6 spørgsmål • 3 min',
    },
    5: {
      title: 'Fremtidsvision',
      description: '2 spørgsmål • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 spørgsmål • 1 min',
    },
  },

  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Markedsundersøgelse',
  },

  // Hero
  hero: {
    title: 'Markedsundersøgelse',
    subtitle: 'Hjælp os med at forstå dine behov bedre',
    description: 'Denne undersøgelse tager cirka 10-15 minutter. Dine svar hjælper os med at skabe en løsning tilpasset din branche.',
    cta_start: 'Start undersøgelsen',
    cta_dashboard: 'Åbn dashboard',
    badge: 'Europæisk markedsundersøgelse',
    stat: {
      countries: '27 europæiske lande',
      questions: 'spørgsmål',
      benchmark: 'Få 2025-benchmark',
      insights: 'Eksklusive markedsindsigter',
      opportunities: 'Prioriteret adgang til jobs',
    },
    footer: {
      info: 'spørgsmål • Anonymt • GDPR-kompatibel',
      anonymous: 'Anonymt',
      gdpr: 'GDPR-kompatibel',
    },
  },

  // Respondent Type
  respondent_type: {
    title: 'Hvem er du?',
    subtitle: 'Vælg din profil for at tilpasse spørgsmålene',
    agency: 'Vikarbureau',
    agency_description: 'Du er et vikar- eller udstationeringsbureau',
    client: 'Klientvirksomhed',
    client_description: 'Du er en virksomhed, der ansætter vikaransatte',
    worker: 'Vikaransat',
    worker_description: 'Du er en vikar- eller udstationeret medarbejder',
  },

  // Respondent Selector
  selector: {
    badge: '🌍 Europæisk markedsundersøgelse - Rekruttering & Vikararbejde',
    title: 'Del din europæiske markedserfaring',
    subtitle: 'Vælg din profil for at starte undersøgelsen',
    cta: 'Klik for at begynde →',
    trust: {
      secure: 'Sikre data',
      languages: '{count} tilgængelige sprog',
      languages_suffix: 'tilgængelige sprog',
      anonymous: 'Anonymt og fortroligt',
    },
  },

  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Vikarbureau',
      description: 'Du er et europæisk vikarbureau. Del din udstationeringserfaring.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klientvirksomhed',
      description: 'Du ansætter vikaransatte. Del dine behov og forventninger.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Vikaransat',
      description: 'Du arbejder som vikar. Del din erfaring fra marken.',
      estimatedTime: '10 min',
    },
  },

  // Buttons
  button: {
    previous: 'Forrige',
    next: 'Næste',
    submit: 'Indsend mine svar',
    submitting: 'Indsender...',
    back: 'Tilbage',
    start: 'Start',
  },

  // Confirmation
  confirmation: {
    title: 'Tak for din deltagelse! 🙏',
    subtitle: 'Dine svar er blevet gemt',
    message: 'Vi analyserer i øjeblikket alle svar for at skabe en løsning perfekt tilpasset dine behov.',
    cta_back: 'Tilbage til forsiden',
    cta_dashboard: 'Se dashboard',
    description: 'Din mening er værdifuld og hjælper med at forme YoJobs fremtid.',
    cta: 'Tilbage til YoJobs websted',
    
    reward: {
      report: {
        title: 'Rapport "Tendenser 2025"',
        description: 'Sendt inden for 3 uger'
      },
      earlyaccess: {
        title: 'Tidlig adgang til YoJob',
        description: 'Top 100 deltagere'
      }
    },
    
    thanks: {
      title: '🎁 Som tak for din deltagelse:',
      item1: '• Eksklusiv rapport "Udstationeringstendenser 2025"',
      item2: '• Top 100 deltagere = 3 måneders gratis adgang til YoJob (værdi 500€)'
    }
  },

  // Progress
  progress: {
    section: 'Afsnit',
    question: 'Spørgsmål',
    section_completed: 'Afsnit gennemført',
    questions_remaining: '{count} spørgsmål tilbage',
    time_remaining: 'Cirka {time} tilbage',
  },

  // Common translations
  common: {
    oui: 'Ja',
    non: 'Nej',
    autre: 'Andet',
    loading: 'Indlæser...',
    submit: 'Indsend',
    next: 'Næste',
    previous: 'Forrige',
    skip: 'Spring over',
    save: 'Gem',
    cancel: 'Annuller',
    close: 'Luk',
    required: 'Påkrævet',
    optional: 'Valgfrit',
    error: 'Fejl',
    success: 'Succes',
    completed: 'Gennemført',
    inProgress: 'I gang',
    notStarted: 'Ikke startet',
    profileAgency: 'Vikarbureau',
    profileClient: 'Klientvirksomhed',
    profileWorker: 'Vikaransat',
    score_not_interested: 'Ikke interesseret',
    score_very_interested: 'Meget interesseret',
  },

  // Sectors
  sectors: {
    btp: 'Byggeri',
    industrie: 'Produktion',
    logistique: 'Logistik',
    hotellerie: 'Hotel & Restaurant',
    sante: 'Sundhed',
    agriculture: 'Landbrug',
    tech: 'Tech/IT',
    autres: 'Andet',
  },

  // Questions - hérite de FR puis surcharge avec traductions DA
  questions: {
    ...fr.questions,

    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Navn',
      placeholder: 'Organisationsnavn eller dit fulde navn',
    },

    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Oprettelsesår',
      placeholder: '2015',
    },

    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Din virksomheds oprettelsesår',
      placeholder: '2010',
    },

    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Din nationalitet',
      placeholder: 'F.eks.: polsk, rumænsk...',
    },

    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organisationsstørrelse',
      options: {
        '1-9': '1-9 ansatte',
        '10-49': '10-49 ansatte',
        '50-249': '50-249 ansatte',
        '250+': '250+ ansatte',
      },
    },

    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'År med vikarerfaring',
      options: {
        '<1': 'Mindre end 1 år',
        '1-3': '1-3 år',
        '3-5': '3-5 år',
        '5-10': '5-10 år',
        '10+': 'Mere end 10 år',
      },
    },

    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Hovedbrancher',
      description: 'Vælg alle relevante brancher',
    },

    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Dine erhverv',
      description: 'Vælg alle dine erhverv',
    },

    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Dit bureaus land',
      placeholder: 'F.eks.: Polen',
    },

    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Land hvor din virksomhed opererer',
      placeholder: 'F.eks.: Frankrig',
    },

    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Lande hvor du har arbejdet som vikar',
      placeholder: 'F.eks.: Frankrig, Tyskland, Belgien...',
    },

    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Årligt antal udstationerede medarbejdere',
      options: {
        '0': 'Ingen endnu',
        '1-50': '1-50 medarbejdere',
        '51-200': '51-200 medarbejdere',
        '201-500': '201-500 medarbejdere',
        '500+': 'Mere end 500',
      },
    },

    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Hvor mange vikaransatte ansætter I årligt?',
      options: {
        '0': 'Ingen i øjeblikket',
        '1-10': '1-10 personer',
        '11-50': '11-50 personer',
        '51-200': '51-200 personer',
        '200+': '200+ personer',
      },
    },

    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Hvor ofte arbejder du som vikar?',
      options: {
        permanent: 'Regelmæssigt (hele året)',
        saisonnier: 'Sæsonmæssigt (bestemte måneder)',
        occasionnel: 'Lejlighedsvis',
        jamais: 'Aldrig endnu (søger)',
      },
    },

    // Section 2 - Détachement/Experience

    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Hvor kommer dine udstationerede medarbejdere fra?',
      placeholder: 'F.eks.: Polen, Rumænien, Bulgarien...',
    },

    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Destinationslande',
      description: 'Lande hvor du udstationerer medarbejdere',
      placeholder: 'F.eks.: Frankrig, Tyskland, Belgien, Holland...',
    },

    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nationaliteter for vikaransatte I ansætter',
      placeholder: 'F.eks.: polsk, rumænsk, bulgarsk...',
    },

    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Din primære udfordring med international udstationering',
      options: {
        admin: 'Administrativ kompleksitet (A1, SIPSI...)',
        conformite: 'Overholdelse af regler i flere lande',
        cout: 'Administrationsomkostninger og tid',
        langues: 'Sprogbarrierer',
        autre: 'Andet',
      },
    },

    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Din primære udfordring med europæiske vikaransatte',
      options: {
        trouver: 'At finde pålidelige bureauer',
        conformite: 'Juridisk overholdelse',
        qualite: 'Kvalitet/kompetencer',
        cout: 'For høje omkostninger',
        langues: 'Kommunikation / Sprog',
        autre: 'Andet',
      },
    },

    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Din primære udfordring i dine opgaver',
      options: {
        trouver: 'At finde opgaver',
        admin: 'Administrativt papirarbejde',
        logement: 'Bolig / Indkvartering',
        langue: 'Lokalt sprog',
        paiement: 'Betalinger / Løn',
        autre: 'Andet',
      },
    },

    // Q9 : Autre
    q9_autre: {
      label: 'Angiv din primære udfordring',
      placeholder: 'Beskriv din primære udfordring...',
    },

    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Hvordan håndterer I udstationeringsanmeldelser i dag?',
      options: {
        interne: 'Internt team',
        externe: 'Ekstern tjenesteudbyder',
        mixte: 'Blandet tilgang',
        manuel: 'Manuel håndtering',
        logiciel: 'Specialiseret software',
      },
    },

    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Hvor mange vikarbureauer bruger I?',
      options: {
        '0': 'Ingen',
        '1': '1 bureau',
        '2-3': '2-3 bureauer',
        '4-10': '4-10 bureauer',
        '10+': 'Mere end 10',
      },
    },

    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Hvordan rekrutterer I vikaransatte?',
      options: {
        agence_fr: 'Franske vikarbureauer',
        agence_euro: 'Europæiske vikarbureauer',
        direct: 'Direkte rekruttering',
        mixte: 'Blandet',
      },
    },

    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Hvordan finder du vikararbejde?',
      options: {
        agence: 'Gennem vikarbureauer',
        bouche: 'Mund til mund',
        internet: 'Online jobportaler',
        direct: 'Direkte ansøgning',
      },
    },

    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Hvor mange bureauer samarbejder du med?',
      options: {
        '1': 'Kun 1 bureau',
        '2-3': '2-3 bureauer',
        '4-10': '4-10 bureauer',
        '10+': 'Mere end 10',
      },
    },

    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Har I oplevet bøder eller hændelser relateret til udstationeringsoverholdelse?',
      description: 'Dit svar forbliver anonymt',
      options: {
        jamais: 'Nej, aldrig',
        rarement: 'Sjældent (1-2 gange)',
        parfois: 'Nogle gange (3-5 gange)',
        souvent: 'Ofte (6+ gange)',
      },
    },

    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Verificerer I vikarbureauers juridiske overholdelse?',
      options: {
        oui_systematique: 'Ja, systematisk',
        oui_parfois: 'Ja, nogle gange',
        non: 'Nej',
        ne_sait_pas: 'Ved ikke',
      },
    },

    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Har du oplevet problemer med vikararbejde i udlandet?',
      options: {
        oui_graves: 'Ja, alvorlige problemer',
        oui_mineurs: 'Ja, mindre problemer',
        non: 'Nej',
      },
    },

    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Årligt budget til administrativ håndtering af udstationering',
      options: {
        '0-5k': '€0-5.000 / år',
        '5-15k': '€5.000-15.000 / år',
        '15-30k': '€15.000-30.000 / år',
        '30k+': '€30.000+ / år',
        inconnu: 'Ved ikke',
      },
    },

    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Årligt budget til vikararbejde',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'Ved ikke',
      },
    },

    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Tilfredshed med nuværende vikarbureauer',
      options: {
        tres_satisfait: 'Meget tilfreds',
        satisfait: 'Tilfreds',
        neutre: 'Neutral',
        insatisfait: 'Utilfreds',
      },
    },

    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Er du tilfreds med din løn fra vikararbejde?',
      options: {
        '<1500': 'Mindre end €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },

    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Hvilken procentdel af omsætningen tabes pga. administrativ kompleksitet?',
      options: {
        'non': 'Nej, ikke rigtig',
        'faible': 'Ja, lav (< 5% omsætning)',
        'moyen': 'Ja, moderat (5-15% omsætning)',
        'important': 'Ja, betydelig (> 15% omsætning)',
      },
    },

    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Tilfredshed med dine nuværende vikarbureauer',
      options: {
        'tres_satisfait': 'Meget tilfreds',
        'satisfait': 'Tilfreds',
        'neutre': 'Neutral',
        'insatisfait': 'Utilfreds',
        'tres_insatisfait': 'Meget utilfreds',
      },
    },

    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Tilfredshed med dine nuværende vikarbureauer',
      options: {
        'tres_satisfait': 'Meget tilfreds',
        'satisfait': 'Tilfreds',
        'neutre': 'Neutral',
        'insatisfait': 'Utilfreds',
        'tres_insatisfait': 'Meget utilfreds',
      },
    },

    // Section 3 - Besoins

    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Dine primære bekymringer',
      description: 'Vælg alle der gælder',
      options: {
        amendes: 'Bøder og sanktioner',
        reputation: 'Omdømme / Image',
        penal: 'Strafferetligt ansvar',
        delais: 'Opgaveforsinkelser',
        clients: 'Tab af kunder',
        aucun: 'Ingen væsentlig risiko',
      },
    },

    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Dine primære behov',
      description: 'Vælg alle der gælder',
      options: {
        fiabilite: 'Finde pålidelige bureauer',
        conformite: 'Juridisk overholdelse',
        qualite: 'Kvalitet/kompetencer',
        cout: 'Omkostninger',
        disponibilite: 'Kandidattilgængelighed',
        aucun: 'Ingen væsentlige behov',
      },
    },

    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Dine forventninger til vikararbejde i udlandet',
      description: 'Vælg alle der gælder',
      options: {
        salaire: 'Bedre løn',
        conditions: 'Bedre arbejdsforhold',
        stabilite: 'Stabilitet',
        experience: 'International erfaring',
        logement: 'Hjælp til bolig',
        aucun: 'Ingen særlige forventninger',
      },
    },

    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Dine primære bekymringer',
      description: 'Vælg alle der gælder',
      options: {
        conformite: 'Juridisk overholdelse',
        qualite: 'Kvalitet/kompetencer',
        communication: 'Kommunikation/Sprog',
        cout: 'Uventede omkostninger',
        disponibilite: 'Kandidattilgængelighed',
        aucun: 'Ingen væsentlige bekymringer',
      },
    },

    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Hvilke problemer oplever du oftest?',
      description: 'Vælg alle der gælder',
      options: {
        paiement: 'Betalingsforsinkelser',
        conditions: 'Dårlige forhold',
        contrat: 'Kontrakter ikke overholdt',
        logement: 'Utilstrækkelig bolig',
        communication: 'Kommunikationsproblemer',
        aucun: 'Ingen store problemer',
      },
    },

    // Q15 : Problème
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Hvilket problem vil du løse først?',
      placeholder: 'Beskriv dit prioritetsproblem...',
    },

    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Hvad er dine prioriterede behov?',
      placeholder: 'F.eks.: Finde hurtigt, bedre kvalitet, priser...',
    },

    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Hvad vil du gerne forbedre i dine opgaver?',
      placeholder: 'F.eks.: Løn, bolig, support, stabilitet...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Bruger I ERP/styringssoftware?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Andet',
        aucun: 'Ingen ERP',
      },
    },

    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Hvilken software/ERP?',
      placeholder: 'F.eks.: SAP, Odoo, specialudviklet...',
    },

    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Dine vigtigste udvælgelseskriterier for vikarbureauer',
      description: 'Vælg dine top 3',
    },

    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Hvad ville forbedre din vikaroplevelse?',
      description: 'Vælg alle der gælder',
    },

    // Q16 : Autre ERP (précision)
    q16_autre: {
      label: 'Angiv dit ERP',
      placeholder: 'Softwarenavn...',
    },

    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Er du klar til at skifte dine arbejdsværktøjer?',
      options: {
        oui: 'Ja, intet problem',
        conditions: 'Ja, under visse betingelser',
        difficile: 'Svært, men åben',
        non: 'Nej, ikke tænkeligt',
      },
    },

    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Månedligt budget for en vikarrekrutteringsplatform',
      options: {
        '0': 'Ikke villig til at betale',
        '1-100': '€1 - €100/måned',
        '100-500': '€100 - €500/måned',
        '500-1000': '€500 - €1.000/måned',
        '1000+': 'Mere end €1.000/måned',
      },
    },

    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Ville du bruge en platform til at finde vikararbejde i udlandet?',
      options: {
        oui_certainement: 'Ja, helt sikkert',
        oui_probablement: 'Ja, sandsynligvis',
        peut_etre: 'Måske',
        non: 'Nej',
      },
    },

    // Section 4 - Intérêt YoJob

    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Hvor interesseret er du i en europæisk udstationeringsmarkedsplads?',
      description: 'Vurder fra 1 (ikke interesseret) til 10 (meget interesseret)',
    },

    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Mest interessante funktioner',
      description: 'Vælg dine top 3 prioriteter',
      options: {
        sipsi: 'Automatisk SIPSI-erklæring',
        a1: 'A1-certifikathåndtering',
        conformite: 'Overholdelses-dashboard',
        alertes: 'Advarsler & fornyelser',
        documents: 'Dokumentcentralisering',
        marketplace: 'Bureau-markedsplads',
        support: 'Flersproget ekspertsupport',
        api: 'API-integration (ERP)',
      },
    },

    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Mest interessante funktioner',
      description: 'Vælg alle der interesserer dig',
      options: {
        recherche: 'Søg efter pålidelige bureauer',
        comparaison: 'Pris/kvalitetssammenligning',
        avis: 'Verificerede anmeldelser',
        conformite: 'Overholdelsesgaranti',
        support: 'Dedikeret support',
        facturation: 'Centraliseret fakturering',
        suivi: 'Realtidssporing',
      },
    },

    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Mest interessante funktioner',
      description: 'Vælg alle der interesserer dig',
      options: {
        recherche: 'Jobsøgning',
        avis: 'Bureau-anmeldelser',
        logement: 'Hjælp til bolig',
        paiement: 'Sikker betaling',
        support: 'Support på mit sprog',
        documents: 'Hjælp med admin-dokumenter',
        formation: 'Træningsprogrammer',
      },
    },

    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Foretrukken prismodel',
      options: {
        mensuel: 'Fast månedligt abonnement',
        usage: 'Betal efter forbrug',
        annuel: 'Årlig plan (rabat)',
        gratuit: 'Gratis for arbejdere',
      },
    },

    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Månedligt budget for en komplet SaaS-løsning',
      options: {
        '0-100': '€0 - €100/måned',
        '100-300': '€100 - €300/måned',
        '300-500': '€300 - €500/måned',
        '500-1000': '€500 - €1.000/måned',
        '1000+': 'Mere end €1.000/måned',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Vil du gerne teste en tidlig version (MVP)?',
      options: {
        oui_gratuit: 'Ja, gratis',
        oui_reduc: 'Ja, med rabat',
        peut_etre: 'Måske, afhængigt af funktioner',
        non: 'Nej, ikke interesseret',
      },
    },

    // Section 5 - Vision Future

    // Q23 : Rôle
    q23_role: {
      label: 'Hvordan ser du din rolle på den europæiske markedsplads?',
      options: {
        decideur: 'Endelig beslutningstager',
        influenceur: 'Influencer / Anbefaling',
        utilisateur: 'Slutbruger',
        autre: 'Andet',
      },
    },

    // Q24 : Évolution
    q24_evolution: {
      label: 'Dine internationale ekspansionsplaner',
      options: {
        oui_rapide: 'Ja, inden for 6 måneder',
        oui_lent: 'Ja, inden for 1-2 år',
        maintien: 'Beholde nuværende lande',
        reduction: 'Reducere internationalt omfang',
      },
    },
    
    // Q24bis : Ambitioner (WORKER)
    q24_aspirations: {
      label: 'Dine fremtidige karriereambitioner',
      placeholder: 'Fx: fast kontrakt, tilbage til hjemlandet, uddannelse...',
    },

    // Q25 : Besoins
    q25_besoins: {
      label: 'Andre behov eller kommentarer',
      placeholder: 'Del eventuel anden feedback eller behov...',
    },

    // Section 6 - Contact

    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Professionelt telefonnummer',
      placeholder: '+45 12 34 56 78',
    },

    // Q27 : Prénom
    q27_firstname: {
      label: 'Fornavn',
      placeholder: 'Dit fornavn',
    },

    // Q28 : Nom
    q28_lastname: {
      label: 'Efternavn',
      placeholder: 'Dit efternavn',
    },

    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'CVR-nummer (valgfrit)',
      placeholder: '12345678',
      description: 'Til berigelse via CVR-registret',
    },

    // Q30 : Email
    email: {
      label: 'Din e-mail',
      placeholder: 'din.email@eksempel.dk',
    },

    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'Jeg accepterer at blive kontaktet igen',
    },

    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'Jeg vil gerne modtage undersøgelsesrapporten',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-15T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Danish (DA) Complete Translation',
    _locale: 'da-DK',
    _completeness: 100,
  },
};