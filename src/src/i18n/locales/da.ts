/**
 * 🇩🇰 TRADUCTIONS DANOISES (DA)
 * 
 * Traductions complètes pour le danois
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
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
      title: 'Profil',
      description: '4 spørgsmål • 2 min',
    },
    2: {
      title: 'Erfaring',
      description: '7 spørgsmål • 3 min',
    },
    3: {
      title: 'Behov',
      description: '6 spørgsmål • 2 min',
    },
    4: {
      title: 'Interesse for YoJob',
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
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Din virksomhedsprofil',
        description: 'Fortæl os om dit bureau og dets kompetencer',
      },
      client: {
        title: '📋 Din virksomhedsprofil',
        description: 'Fortæl os om din virksomhed og rekrutteringsbehov',
      },
      worker: {
        title: '📋 Din profil',
        description: 'Fortæl os om din faglige baggrund',
      },
    },
    2: {
      agency: {
        title: '💼 Udstationeringsaktivitet',
        description: 'Din erfaring med udstationering af arbejdere',
      },
      client: {
        title: '💼 Din rekrutteringserfaring',
        description: 'Din nuværende rekruttering og vikararbejde',
      },
      worker: {
        title: '💼 Din vikarerfaring',
        description: 'Din rejse som bureauansat',
      },
    },
    3: {
      agency: {
        title: '🎯 Behov og værktøjer',
        description: 'Dine udfordringer og nuværende løsninger',
      },
      client: {
        title: '🎯 Dine nuværende behov',
        description: 'Udfordringer og forventninger til rekruttering',
      },
      worker: {
        title: '🎯 Dine forventninger',
        description: 'Hvad der er vigtigt for dig i et opgave',
      },
    },
    4: {
      agency: {
        title: '⭐ Interesse for europæisk platform',
        description: 'Opdag vores innovative markedsvision',
      },
      client: {
        title: '⭐ Interesse for europæisk platform',
        description: 'En innovativ løsning til dine behov',
      },
      worker: {
        title: '⭐ Din interesse for platformen',
        description: 'Platform for lettere opgavesøgning',
      },
    },
    5: {
      agency: {
        title: '🔮 Fremtidsvision',
        description: 'Budget og udviklingsmuligheder',
      },
      client: {
        title: '🔮 Dine fremtidige prioriteter',
        description: 'Budget og rekrutteringsstrategi',
      },
      worker: {
        title: '🔮 Dine mål',
        description: 'Dine kommende faglige projekter',
      },
    },
    6: {
      agency: {
        title: '📧 Hold kontakten',
        description: 'Modtag undersøgelsesresultaterne og bliv informeret',
      },
      client: {
        title: '📧 Hold kontakten',
        description: 'Modtag resultaterne og vores anbefalinger',
      },
      worker: {
        title: '📧 Hold kontakten',
        description: 'Modtag resultaterne og muligheder',
      },
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
    client: 'Klient',
    client_description: 'Du er en virksomhed, der ansætter bureauansatte',
    worker: 'Bureauansat',
    worker_description: 'Du er en bureauansat eller udstationeret medarbejder',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Europæisk markedsundersøgelse - Beskæftigelse og Vikararbejde',
    title: 'Del din erfaring på det europæiske marked',
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
      label: 'Klient',
      description: 'Du ansætter bureauansatte. Del dine behov og forventninger.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Bureauansat',
      description: 'Du arbejder som bureauansat. Del din erfaring fra marken.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Forrige',
    next: 'Næste',
    submit: 'Send svar',
    submitting: 'Sender...',
    back: 'Tilbage',
    start: 'Begynd',
  },
  
  // Confirmation
  confirmation: {
    title: 'Tak for din deltagelse!',
    subtitle: 'Dine svar er blevet gemt',
    message: 'Vi analyserer lige nu alle svar for at skabe en løsning, der er helt tilpasset dine behov.',
    cta_back: 'Tilbage til forsiden',
    cta_dashboard: 'Vis dashboard',
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
    submit: 'Send',
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
    profileClient: 'Klient',
    profileWorker: 'Bureauansat',
  },
  
  // Sectors
  sectors: {
    btp: 'Byggeri',
    industrie: 'Industri',
    logistique: 'Logistik',
    hotellerie: 'Gæstfrihed',
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
      placeholder: 'f.eks.: polsk, rumænsk...',
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
        '10+': 'Over 10 år',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Hovedsektorer',
      description: 'Vælg alle relevante sektorer',
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
      placeholder: 'f.eks.: Polen',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Land hvor din virksomhed opererer',
      placeholder: 'f.eks.: Frankrig',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Lande hvor du har arbejdet som bureauansat',
      placeholder: 'f.eks.: Frankrig, Tyskland, Belgien...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Årligt volumen af udstationerede medarbejdere',
      options: {
        '0': 'Ingen endnu',
        '1-50': '1-50 ansatte',
        '51-200': '51-200 ansatte',
        '201-500': '201-500 ansatte',
        '500+': 'Over 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Hvor mange bureauansatte ansætter I årligt?',
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
      label: 'Hvor ofte arbejder du som bureauansat?',
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
      placeholder: 'f.eks.: Polen, Rumænien, Bulgarien...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Destinationslande',
      description: 'Lande hvor du udstationerer medarbejdere',
      placeholder: 'f.eks.: Frankrig, Tyskland, Belgien, Holland...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nationaliteter for bureauansatte I ansætter',
      placeholder: 'f.eks.: polsk, rumænsk, bulgarsk...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Din primære udfordring med international udstationering',
      options: {
        admin: 'Administrativ kompleksitet (A1, SIPSI...)',
        conformite: 'Overholdelse af regler i flere lande',
        cout: 'Håndteringsomkostninger og tid',
        langues: 'Sprogbarrierer',
        autre: 'Andet',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Din primære udfordring med europæiske bureauansatte',
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
      label: 'Din primære udfordring med vikararbejde i udlandet',
      options: {
        admin: 'Administrativt papirarbejde',
        langue: 'Sprogbarriere',
        logement: 'At finde bolig',
        transport: 'Transport',
        salaire: 'Betalings-/lønproblemer',
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
      label: 'Hvordan håndterer I udstationeringsansøgninger i dag?',
      options: {
        interne: 'Internt team',
        externe: 'Ekstern tjenesteudbyder',
        mixte: 'Blandet tilgang',
        manuel: 'Manuel håndtering',
        logiciel: 'Specialiseret software',
        manuel: 'Manuelt (Excel, Word...)',
        logiciel_interne: 'Intern software',
        prestataire: 'Ekstern tjenesteudbyder',
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
        '10+': 'Over 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Hvordan ansætter I bureauansatte?',
      options: {
        agence_fr: 'Franske vikarbureauer',
        agence_euro: 'Europæiske vikarbureauer',
        direct: 'Direkte ansættelse',
        mixte: 'Blandet',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Hvordan søger du vikararbejde?',
      options: {
        agence: 'Gennem vikarbureauer',
        bouche: 'Anbefaling',
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
        '10+': 'Over 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Har du modtaget bøder eller hændelser relateret til udstationeringsoverholdelse?',
      description: 'Dit svar forbliver anonymt',
      options: {
        jamais: 'Nej, aldrig',
        rarement: 'Sjældent (1-2 gange)',
        parfois: 'Nogle gange (3-5 gange)',
        souvent: 'Ofte (6+ gange)',
        oui_souvent: 'Ja, ofte',
        oui_rare: 'Ja, lejlighedsvis',
        non: 'Nej',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Kontrollerer I vikarbureauers juridiske overholdelse?',
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
      label: 'Har I budget til eksterne tjenester til udstationeringshåndtering?',
      options: {
        oui_important: 'Ja, betydelig',
        oui_modere: 'Ja, moderat',
        non: 'Nej',
        ne_sait_pas: 'Ved ikke',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Hvad er jeres hovedkriterier for at vælge et vikarbureau?',
      description: 'Vælg flere muligheder',
    },
    
    // Q12 : Budget client (CLIENT) - Version intérim
    q12_budget_client: {
      label: 'Årligt budget til vikararbejde',
      options: {
        '0-50k': '0-50 000 €',
        '50-200k': '50 000-200 000 €',
        '200-500k': '200 000-500 000 €',
        '500k+': '500 000+ €',
        inconnu: 'Ved ikke',
      },
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Hvor tilfreds er du med dine nuværende arbejdsforhold?',
      options: {
        tres_satisfait: 'Meget tilfreds',
        satisfait: 'Tilfreds',
        neutre: 'Neutral',
        insatisfait: 'Utilfreds',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Gennemsnitlig varighed af dine udstationeringsopgaver',
      options: {
        '<1mois': 'Mindre end 1 måned',
        '1-3mois': '1-3 måneder',
        '3-6mois': '3-6 måneder',
        '6-12mois': '6-12 måneder',
        '12+mois': 'Over 12 måneder',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Hvad er jeres årlige budget til vikararbejde?',
      options: {
        '<50k': 'Mindre end €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Over €1M',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Din foretrukne opgavevarighed',
      options: {
        court: 'Kort (< 3 måneder)',
        moyen: 'Mellem (3-6 måneder)',
        long: 'Lang (> 6 måneder)',
        indifferent: 'Ligegyldig',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Ville du være interesseret i en europæisk platform til at tilbyde dine tjenester?',
      description: 'En markedsplads for at øge din synlighed',
      options: {
        tres_interesse: 'Meget interesseret',
        interesse: 'Interesseret',
        neutre: 'Neutral',
        pas_interesse: 'Ikke interesseret',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Ville du være interesseret i en platform til nemt at finde europæiske bureauer?',
      options: {
        tres_interesse: 'Meget interesseret',
        interesse: 'Interesseret',
        neutre: 'Neutral',
        pas_interesse: 'Ikke interesseret',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Ville du være interesseret i en platform til at søge opgaver?',
      options: {
        tres_interesse: 'Meget interesseret',
        interesse: 'Interesseret',
        neutre: 'Neutral',
        pas_interesse: 'Ikke interesseret',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Hvilke funktioner ville være mest nyttige?',
      description: 'Vælg flere muligheder',
      options: {
        marketplace: 'Tjenestemarkedsplads',
        admin: 'Automatiseret administration',
        conformite: 'Overholdelsesk kontroller',
        payment: 'Integrerede betalinger',
        support: 'Flersproget support',
        autre: 'Andet',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Hvilke funktioner ville være mest nyttige?',
      description: 'Vælg flere muligheder',
      options: {
        comparaison: 'Sammenligning af bureauer',
        avis: 'Verificerede anmeldelser',
        suivi: 'Opgaveopfølgning',
        documentation: 'Centraliseret dokumentation',
        facturation: 'Fakturahåndtering',
        autre: 'Andet',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Hvilke funktioner ville være mest nyttige?',
      description: 'Vælg flere muligheder',
      options: {
        recherche: 'Avanceret opgavesøgning',
        alertes: 'Notifikationer om nye opgaver',
        documents: 'Dokumenthåndtering',
        avis: 'Bureaubedømmelser',
        support: 'Flersproget support',
        autre: 'Andet',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Hvad ville være din største hindring for at bruge en sådan platform?',
      options: {
        cout: 'Omkostninger',
        complexite: 'For komplekst',
        confiance: 'Mangel på tillid',
        changement: 'Vil ikke ændre',
        aucun: 'Ingen hindringer',
        autre: 'Andet',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Hvad ville være din største hindring?',
      options: {
        cout: 'Omkostninger',
        confiance: 'Tillid til bureauer',
        complexite: 'For komplekst',
        aucun: 'Ingen hindringer',
        autre: 'Andet',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Hvad ville være din største hindring?',
      options: {
        complexite: 'For komplekst',
        confiance: 'Tillid til platformen',
        acces: 'Adgang til teknologi',
        aucun: 'Ingen hindringer',
        autre: 'Andet',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Hvilken prismodel virker mest passende for dig?',
      options: {
        commission: 'Provisionsgebyr pr. opgave',
        abonnement: 'Månedligt abonnement',
        freemium: 'Gratis + premium funktioner',
        autre: 'Andet',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Hvilke tjenester ville du værdsætte mest?',
      description: 'Vælg flere muligheder',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Hvilke tjenester ville du værdsætte mest?',
      description: 'Vælg flere muligheder',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Ville du anbefale en sådan platform til kolleger?',
      options: {
        certainement: 'Bestemt',
        probablement: 'Sandsynligvis',
        peut_etre: 'Måske',
        probablement_pas: 'Sandsynligvis ikke',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Ville du anbefale en sådan løsning?',
      options: {
        certainement: 'Bestemt',
        probablement: 'Sandsynligvis',
        peut_etre: 'Måske',
        probablement_pas: 'Sandsynligvis ikke',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Ville du anbefale en sådan platform?',
      options: {
        certainement: 'Bestemt',
        probablement: 'Sandsynligvis',
        peut_etre: 'Måske',
        probablement_pas: 'Sandsynligvis ikke',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Ville du gerne deltage i betafasen?',
      options: {
        oui_immediat: 'Ja, med det samme',
        oui_plus_tard: 'Ja, men senere',
        non: 'Nej',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Ville du gerne deltage i testningen?',
      options: {
        oui_immediat: 'Ja, med det samme',
        oui_plus_tard: 'Ja, men senere',
        non: 'Nej',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Ville du gerne deltage i testningen?',
      options: {
        oui_immediat: 'Ja, med det samme',
        oui_plus_tard: 'Ja, men senere',
        non: 'Nej',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Hvordan ser du din udstationeringsaktivitet i de næste 3 år?',
      options: {
        forte_croissance: 'Stærk vækst',
        croissance: 'Moderat vækst',
        stable: 'Stabil',
        decroissance: 'Fald',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Hvordan ser du udviklingen af dit behov for vikararbejde?',
      options: {
        hausse: 'Stigning',
        stable: 'Stabil',
        baisse: 'Fald',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Hvad er dine projekter i de kommende måneder?',
      options: {
        meme_secteur: 'Fortsætte i samme sektor',
        changer_secteur: 'Skifte sektor',
        se_former: 'Uddanne mig',
        entrepreneur: 'Blive iværksætter',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Planlægger I at øge jeres budget til eksterne tjenester?',
      options: {
        oui_beaucoup: 'Ja, betydeligt',
        oui_peu: 'Ja, lidt',
        non: 'Nej',
        ne_sait_pas: 'Ved ikke',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Planlægger I at øge jeres rekrutteringsbudget?',
      options: {
        oui_beaucoup: 'Ja, betydeligt',
        oui_peu: 'Ja, lidt',
        non: 'Nej',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Er du villig til at flytte for arbejde?',
      options: {
        oui_europe: 'Ja, hvor som helst i Europa',
        oui_proche: 'Ja, i nabolande',
        non: 'Nej, kun i mit land',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'E-mail (valgfrit)',
      placeholder: 'din@email.dk',
      description: 'For at modtage resultaterne og information om projektet',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Virksomheds-e-mail (valgfrit)',
      placeholder: 'kontakt@ditbureau.dk',
      description: 'For at modtage resultaterne og eksklusiv adgang til platformen',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Virksomheds-e-mail (valgfrit)',
      placeholder: 'kontakt@din-virksomhed.dk',
      description: 'For at modtage anbefalinger tilpasset dine behov',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'E-mail (valgfrit)',
      placeholder: 'din@email.dk',
      description: 'For at modtage muligheder, der matcher din profil',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Telefon (valgfrit)',
      placeholder: '+45 12 34 56 78',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Yderligere kommentarer eller forslag',
      placeholder: 'Del dine idéer, forventninger eller specifikke behov...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Markedsvision i de næste 3 år',
      placeholder: 'Del din vision...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Andre behov eller forslag',
      placeholder: 'Dine forslag interesserer os...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Virksomheds telefonnummer',
      placeholder: '+45 12 34 56 78',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Fornavn',
      placeholder: 'Dit fornavn',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Efternavn',
      placeholder: 'Dit efternavn',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'CVR-nummer (valgfrit)',
      placeholder: '12345678',
      description: 'Til berigelse via Virk/CVR',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-mail',
      placeholder: 'din.email@eksempel.dk',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Jeg accepterer at blive kontaktet igen',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Jeg vil gerne modtage undersøgelsesrapporten',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Pris',
    },
    critere_qualite: {
      label: 'Profilkvalitet',
    },
    critere_rapidite: {
      label: 'Svarhastighed',
    },
    critere_conformite: {
      label: 'Juridisk overholdelse',
    },
    critere_flexibilite: {
      label: 'Fleksibilitet',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Personlig support',
    },
    service_garantie: {
      label: 'Udskiftningsgaranti',
    },
    service_formation: {
      label: 'Forudgående træning',
    },
    service_gestion: {
      label: 'Administrativ håndtering',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Træning og certifikater',
    },
    service_logement: {
      label: 'Hjælp til bolig',
    },
    service_transport: {
      label: 'Transportstøtte',
    },
    service_administratif: {
      label: 'Administrativ support',
    },
  },
};