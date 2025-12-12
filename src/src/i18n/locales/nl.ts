/**
 * 🇳🇱 TRADUCTIONS NÉERLANDAISES (NL)
 * 
 * Traductions complètes pour le néerlandais
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const nl: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profiel',
    section2: 'Ervaring',
    section3: 'Behoeften',
    section4: 'Interesse',
    section5: 'Visie',
    section6: 'Contact',
    dashboard: 'Dashboard',
    back_to_site: 'Terug naar website',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Overzicht',
      results: 'Resultaten',
      questions: 'Vragen',
      translations: 'Vertalingen',
      export: 'Exporteren',
      integrations: 'Integraties',
      cms: 'Formulier CMS',
      settings: 'Instellingen',
      prospects: 'Prospects',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nieuw',
      beta: '🧪 Bèta',
    },
    actions: {
      logout: 'Uitloggen',
      back_to_survey: 'Terug naar enquête',
      toggle_sidebar: 'Inklappen/Uitklappen',
    },
    user: {
      welcome: 'Welkom',
      logged_in_as: 'Ingelogd als',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profiel',
      description: '4 vragen • 2 min',
    },
    2: {
      title: 'Ervaring',
      description: '7 vragen • 3 min',
    },
    3: {
      title: 'Behoeften',
      description: '6 vragen • 2 min',
    },
    4: {
      title: 'Interesse YoJob',
      description: '6 vragen • 3 min',
    },
    5: {
      title: 'Toekomstvisie',
      description: '2 vragen • 1 min',
    },
    6: {
      title: 'Contact',
      description: '1 vraag • 1 min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Uw Bedrijfsprofiel',
        description: 'Vertel ons over uw uitzendbureau en expertise',
      },
      client: {
        title: '📋 Uw Bedrijfsprofiel',
        description: 'Vertel ons over uw bedrijf en wervingsbehoeften',
      },
      worker: {
        title: '📋 Uw Profiel',
        description: 'Vertel ons over uw professionele achtergrond',
      },
    },
    2: {
      agency: {
        title: '💼 Detacheringsactiviteit',
        description: 'Uw ervaring met het detacheren van werknemers',
      },
      client: {
        title: '💼 Uw Wervingservaring',
        description: 'Uw huidige werving en uitzendpraktijken',
      },
      worker: {
        title: '💼 Uw Uitzendervaring',
        description: 'Uw reis als uitzendkracht',
      },
    },
    3: {
      agency: {
        title: '🎯 Behoeften en Hulpmiddelen',
        description: 'Uw uitdagingen en huidige oplossingen',
      },
      client: {
        title: '🎯 Uw Huidige Behoeften',
        description: 'Uitdagingen en verwachtingen bij werving',
      },
      worker: {
        title: '🎯 Uw Verwachtingen',
        description: 'Wat voor u belangrijk is bij een opdracht',
      },
    },
    4: {
      agency: {
        title: '⭐ Interesse in een Europees Platform',
        description: 'Ontdek onze visie voor een innovatieve marktplaats',
      },
      client: {
        title: '⭐ Interesse in een Europees Platform',
        description: 'Een innovatieve oplossing voor uw behoeften',
      },
      worker: {
        title: '⭐ Uw Interesse in een Platform',
        description: 'Een platform om gemakkelijk opdrachten te vinden',
      },
    },
    5: {
      agency: {
        title: '🔮 Toekomstvisie',
        description: 'Budget en ontwikkelingsvooruitzichten',
      },
      client: {
        title: '🔮 Uw Toekomstprioriteiten',
        description: 'Budget en wervingsstrategie',
      },
      worker: {
        title: '🔮 Uw Doelen',
        description: 'Uw aankomende professionele projecten',
      },
    },
    6: {
      agency: {
        title: '📧 Blijf op de Hoogte',
        description: 'Ontvang studieresultaten en blijf geïnformeerd',
      },
      client: {
        title: '📧 Blijf op de Hoogte',
        description: 'Ontvang resultaten en onze aanbevelingen',
      },
      worker: {
        title: '📧 Blijf op de Hoogte',
        description: 'Ontvang resultaten en kansen',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Marktonderzoek',
  },
  
  // Hero
  hero: {
    title: 'Marktenquête',
    subtitle: 'Help ons uw behoeften beter te begrijpen',
    description: 'Deze enquête duurt ongeveer 10-15 minuten. Uw antwoorden helpen ons een oplossing te creëren die is afgestemd op uw sector.',
    cta_start: 'Enquête Starten',
    cta_dashboard: 'Dashboard Openen',
    badge: 'Europese marktstudie',
    stat: {
      countries: '27 Europese landen',
      questions: 'vragen',
      benchmark: 'Krijg de benchmark 2025',
      insights: 'Exclusieve marktinzichten',
      opportunities: 'Prioritaire toegang tot banen',
    },
    footer: {
      info: 'vragen • Anoniem • AVG-conform',
      anonymous: 'Anoniem',
      gdpr: 'AVG-conform',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Wie bent u?',
    subtitle: 'Selecteer uw profiel om de vragen te personaliseren',
    agency: 'Uitzendbureau',
    agency_description: 'U bent een uitzendbureau of detacheringsbureau',
    client: 'Opdrachtgever',
    client_description: 'U bent een bedrijf dat uitzendkrachten inzet',
    worker: 'Uitzendkracht',
    worker_description: 'U bent een uitzendkracht of gedetacheerde werknemer',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Europese Marktstudie - Werving & Uitzendwerk',
    title: 'Deel uw Europese marktervaring',
    subtitle: 'Selecteer uw profiel om de enquête te starten',
    cta: 'Klik om te starten →',
    trust: {
      secure: 'Beveiligde gegevens',
      languages: '{count} talen beschikbaar',
      languages_suffix: 'talen beschikbaar',
      anonymous: 'Anoniem & vertrouwelijk',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Uitzendbureau',
      description: 'U bent een Europees uitzendbureau. Deel uw detacheringservaring.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Opdrachtgever',
      description: 'U huurt uitzendkrachten in. Deel uw behoeften en verwachtingen.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Uitzendkracht',
      description: 'U werkt als uitzendkracht. Deel uw veldervaring.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Vorige',
    next: 'Volgende',
    submit: 'Mijn antwoorden versturen',
    submitting: 'Versturen...',
    back: 'Terug',
    start: 'Starten',
  },
  
  // Confirmation
  confirmation: {
    title: 'Dank u voor uw deelname!',
    subtitle: 'Uw antwoorden zijn succesvol opgeslagen',
    message: 'We analyseren momenteel alle antwoorden om een oplossing te creëren die perfect is afgestemd op uw behoeften.',
    cta_back: 'Terug naar homepage',
    cta_dashboard: 'Dashboard Bekijken',
  },
  
  // Progress
  progress: {
    section: 'Sectie',
    question: 'Vraag',
    section_completed: 'Sectie voltooid',
    questions_remaining: '{count} vragen resterend',
    time_remaining: 'Ongeveer {time} resterend',
  },
  
  // Common translations
  common: {
    oui: 'Ja',
    non: 'Nee',
    autre: 'Anders',
    loading: 'Laden...',
    submit: 'Verzenden',
    next: 'Volgende',
    previous: 'Vorige',
    skip: 'Overslaan',
    save: 'Opslaan',
    cancel: 'Annuleren',
    close: 'Sluiten',
    required: 'Verplicht',
    optional: 'Optioneel',
    error: 'Fout',
    success: 'Succes',
    completed: 'Voltooid',
    inProgress: 'Bezig',
    notStarted: 'Niet begonnen',
    profileAgency: 'Uitzendbureau',
    profileClient: 'Klant',
    profileWorker: 'Uitzendkracht',
    score_not_interested: 'Niet geïnteresseerd',
    score_very_interested: 'Zeer geïnteresseerd',
  },
  
  // Sectors
  sectors: {
    btp: 'Bouw',
    industrie: 'Industrie',
    logistique: 'Logistiek',
    hotellerie: 'Horeca',
    sante: 'Gezondheidszorg',
    agriculture: 'Landbouw',
    tech: 'Tech/IT',
    autres: 'Overige',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions NL
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Naam',
      placeholder: 'Organisatienaam of uw volledige naam',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Oprichtingsjaar',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Oprichtingsjaar van uw bedrijf',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Uw nationaliteit',
      placeholder: 'bijv.: Pools, Roemeens...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organisatieomvang',
      options: {
        '1-9': '1-9 medewerkers',
        '10-49': '10-49 medewerkers',
        '50-249': '50-249 medewerkers',
        '250+': '250+ medewerkers',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Jaren uitzendervaring',
      options: {
        '<1': 'Minder dan 1 jaar',
        '1-3': '1-3 jaar',
        '3-5': '3-5 jaar',
        '5-10': '5-10 jaar',
        '10+': 'Meer dan 10 jaar',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Belangrijkste sectoren',
      description: 'Selecteer alle relevante sectoren',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Uw beroepen',
      description: 'Selecteer al uw beroepen',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Land van uw bureau',
      placeholder: 'bijv.: Polen',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Land waar uw bedrijf actief is',
      placeholder: 'bijv.: Frankrijk',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Landen waar u hebt gewerkt als uitzendkracht',
      placeholder: 'bijv.: Frankrijk, Duitsland, België...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Jaarlijks volume gedetacheerde werknemers',
      options: {
        '0': 'Nog geen',
        '1-50': '1-50 werknemers',
        '51-200': '51-200 werknemers',
        '201-500': '201-500 werknemers',
        '500+': 'Meer dan 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Hoeveel uitzendkrachten zet u per jaar in?',
      options: {
        '0': 'Momenteel geen',
        '1-10': '1-10 personen',
        '11-50': '11-50 personen',
        '51-200': '51-200 personen',
        '200+': '200+ personen',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Hoe vaak werkt u als uitzendkracht?',
      options: {
        permanent: 'Regelmatig (het hele jaar)',
        saisonnier: 'Seizoensgebonden (bepaalde maanden)',
        occasionnel: 'Af en toe',
        jamais: 'Nog nooit (op zoek)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Waar komen uw gedetacheerde werknemers vandaan?',
      placeholder: 'bijv.: Polen, Roemenië, Bulgarije...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Bestemmingslanden',
      description: 'Landen waar u werknemers detacheert',
      placeholder: 'bijv.: Frankrijk, Duitsland, België, Nederland...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nationaliteiten van uitzendkrachten die u inzet',
      placeholder: 'bijv.: Pools, Roemeens, Bulgaars...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Uw belangrijkste uitdaging bij internationale detachering',
      options: {
        admin: 'Administratieve complexiteit (A1, SIPSI...)',
        conformite: 'Naleving in meerdere landen',
        cout: 'Beheerkosten en tijd',
        langues: 'Taalbarrières',
        autre: 'Andere',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Uw belangrijkste uitdaging met Europese uitzendkrachten',
      options: {
        trouver: 'Betrouwbare bureaus vinden',
        conformite: 'Wettelijke naleving',
        qualite: 'Kwaliteit/vaardigheden',
        cout: 'Te hoge kosten',
        langues: 'Communicatie / Talen',
        autre: 'Andere',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Uw belangrijkste uitdaging bij uitzendwerk in het buitenland',
      options: {
        admin: 'Administratief papierwerk',
        langue: 'Taalbarrière',
        logement: 'Huisvesting vinden',
        transport: 'Vervoer',
        salaire: 'Betaling/salarisproblemen',
        autre: 'Andere',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Specificeer uw belangrijkste uitdaging',
      placeholder: 'Beschrijf uw belangrijkste uitdaging...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Hoe beheert u detacheringsaangiften vandaag?',
      options: {
        interne: 'Intern team',
        externe: 'Externe dienstverlener',
        mixte: 'Gemengde aanpak',
        manuel: 'Handmatige beheer',
        logiciel: 'Gespecialiseerde software',
        manuel: 'Handmatig (Excel, Word...)',
        logiciel_interne: 'Interne software',
        prestataire: 'Externe dienstverlener',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Hoeveel uitzendbureaus gebruikt u?',
      options: {
        '0': 'Geen',
        '1': '1 bureau',
        '2-3': '2-3 bureaus',
        '4-10': '4-10 bureaus',
        '10+': 'Meer dan 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Hoe werft u uitzendkrachten?',
      options: {
        agence_fr: 'Franse uitzendbureaus',
        agence_euro: 'Europese uitzendbureaus',
        direct: 'Directe werving',
        mixte: 'Gemengd',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Hoe vindt u uitzendwerk?',
      options: {
        agence: 'Via uitzendbureaus',
        bouche: 'Mond-tot-mondreclame',
        internet: 'Online vacaturebanken',
        direct: 'Directe sollicitatie',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Met hoeveel bureaus werkt u?',
      options: {
        '1': 'Slechts 1 bureau',
        '2-3': '2-3 bureaus',
        '4-10': '4-10 bureaus',
        '10+': 'Meer dan 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Hebt u boetes of incidenten gehad met betrekking tot detacheringsnaleving?',
      description: 'Uw antwoord blijft anoniem',
      options: {
        jamais: 'Nee, nooit',
        rarement: 'Zelden (1-2 keer)',
        parfois: 'Soms (3-5 keer)',
        souvent: 'Vaak (6+ keer)',
        oui_souvent: 'Ja, frequent',
        oui_rare: 'Ja, af en toe',
        non: 'Nee',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Controleert u de wettelijke naleving van uitzendbureaus?',
      options: {
        oui_systematique: 'Ja, systematisch',
        oui_parfois: 'Ja, soms',
        non: 'Nee',
        ne_sait_pas: 'Weet niet',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Hebt u problemen ondervonden met uitzendwerk in het buitenland?',
      options: {
        oui_graves: 'Ja, ernstige problemen',
        oui_mineurs: 'Ja, kleine problemen',
        non: 'Nee',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Heeft u budget voor externe diensten voor detacheringsbeheer?',
      options: {
        oui_important: 'Ja, significant',
        oui_modere: 'Ja, matig',
        non: 'Nee',
        ne_sait_pas: 'Weet niet',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Jaarlijks budget voor uitzendwerk',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'Weet ik niet',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Wat zijn uw belangrijkste criteria bij het kiezen van een uitzendbureau?',
      description: 'Selecteer meerdere keuzes',
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Hoe tevreden bent u met uw huidige werkomstandigheden?',
      options: {
        tres_satisfait: 'Zeer tevreden',
        satisfait: 'Tevreden',
        neutre: 'Neutraal',
        insatisfait: 'Ontevreden',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Gemiddelde duur van uw detacheringsmissies',
      options: {
        '<1mois': 'Minder dan 1 maand',
        '1-3mois': '1-3 maanden',
        '3-6mois': '3-6 maanden',
        '6-12mois': '6-12 maanden',
        '12+mois': 'Meer dan 12 maanden',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Wat is uw jaarlijkse budget voor uitzendwerk?',
      options: {
        '<50k': 'Minder dan €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Meer dan €1M',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Tevredenheid met uw huidige uitzendbureaus',
      options: {
        'tres_satisfait': 'Zeer tevreden',
        'satisfait': 'Tevreden',
        'neutre': 'Neutraal',
        'insatisfait': 'Ontevreden',
        'tres_insatisfait': 'Zeer ontevreden',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Tevredenheid met uw huidige uitzendbureaus',
      options: {
        'tres_satisfait': 'Zeer tevreden',
        'satisfait': 'Tevreden',
        'neutre': 'Neutraal',
        'insatisfait': 'Ontevreden',
        'tres_insatisfait': 'Zeer ontevreden',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Uw favoriete opdrachtduur',
      options: {
        court: 'Kort (< 3 maanden)',
        moyen: 'Middellang (3-6 maanden)',
        long: 'Lang (> 6 maanden)',
        indifferent: 'Maakt niet uit',
      },
    },
    
    // Section 3 - Besoins/Behoeften
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      label: 'Uw belangrijkste zorgen',
      description: 'Selecteer alles wat van toepassing is',
      options: {
        amendes: 'Boetes en sancties',
        reputation: 'Reputatie / Imago',
        penal: 'Strafrechtelijke aansprakelijkheid',
        delais: 'Missievertragingen',
        clients: 'Verlies van klanten',
        aucun: 'Geen groot risico',
        sanctions: 'Boetes/sancties',
        conformite: 'Naleving in meerdere landen',
        cout: 'Administratieve kosten',
        documentation: 'Documentbeheer',
        responsabilite: 'Strafrechtelijke aansprakelijkheid',
        perte_clients: 'Verlies van klanten',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Uw belangrijkste behoeften',
      description: 'Selecteer alles wat van toepassing is',
      options: {
        fiabilite: 'Betrouwbare bureaus vinden',
        conformite: 'Wettelijke naleving',
        qualite: 'Kwaliteit/vaardigheden',
        cout: 'Kosten',
        disponibilite: 'Beschikbaarheid kandidaten',
        aucun: 'Geen grote behoefte',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Uw belangrijkste zorgen',
      description: 'Selecteer alles wat van toepassing is',
      options: {
        conformite: 'Wettelijke naleving',
        qualite: 'Kwaliteit/vaardigheden',
        communication: 'Communicatie/Talen',
        cout: 'Onverwachte kosten',
        disponibilite: 'Beschikbaarheid kandidaten',
        aucun: 'Geen grote zorgen',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Welke problemen heeft u het vaakst?',
      description: 'Selecteer alles wat van toepassing is',
      options: {
        paiement: 'Betalingsvertragingen',
        conditions: 'Slechte omstandigheden',
        contrat: 'Contracten niet nageleefd',
        logement: 'Ontoereikende huisvesting',
        communication: 'Communicatieproblemen',
        aucun: 'Geen grote problemen',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Uw verwachtingen voor uitzendwerk in het buitenland',
      description: 'Selecteer alles wat van toepassing is',
      options: {
        salaire: 'Beter salaris',
        conditions: 'Betere arbeidsomstandigheden',
        stabilite: 'Stabiliteit',
        experience: 'Internationale ervaring',
        logement: 'Huisvestingshulp',
        aucun: 'Geen specifieke verwachtingen',
      },
    },
    
    // Q15 : Problème (AGENCY)
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Welk probleem zou u het eerst willen oplossen?',
      placeholder: 'Beschrijf uw prioritaire probleem...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Wat zijn uw prioritaire behoeften?',
      placeholder: 'Bijv.: Snel vinden, betere kwaliteit, prijzen...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Welke verbeteringen zou u wensen?',
      placeholder: 'Bijv.: Betere ondersteuning, hogere salarissen...',
    },
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Zou u geïnteresseerd zijn in een Europees platform om uw diensten aan te bieden?',
      description: 'Een marketplace om uw zichtbaarheid te vergroten',
      options: {
        tres_interesse: 'Zeer geïnteresseerd',
        interesse: 'Geïnteresseerd',
        neutre: 'Neutraal',
        pas_interesse: 'Niet geïnteresseerd',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Zou u geïnteresseerd zijn in een platform om gemakkelijk Europese bureaus te vinden?',
      options: {
        tres_interesse: 'Zeer geïnteresseerd',
        interesse: 'Geïnteresseerd',
        neutre: 'Neutraal',
        pas_interesse: 'Niet geïnteresseerd',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Zou u geïnteresseerd zijn in een platform om opdrachten te vinden?',
      options: {
        tres_interesse: 'Zeer geïnteresseerd',
        interesse: 'Geïnteresseerd',
        neutre: 'Neutraal',
        pas_interesse: 'Niet geïnteresseerd',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Welke functionaliteiten zouden het nuttigst zijn?',
      description: 'Selecteer meerdere keuzes',
      options: {
        marketplace: 'Marketplace voor diensten',
        admin: 'Geautomatiseerd administratief beheer',
        conformite: 'Nalevingscontroles',
        payment: 'Geïntegreerde betalingen',
        support: 'Meertalige ondersteuning',
        autre: 'Andere',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Welke functionaliteiten zouden het nuttigst zijn?',
      description: 'Selecteer meerdere keuzes',
      options: {
        comparaison: 'Vergelijking van bureaus',
        avis: 'Geverifieerde beoordelingen',
        suivi: 'Missie tracking',
        documentation: 'Gecentraliseerde documentatie',
        facturation: 'Factuurbeheer',
        autre: 'Andere',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Welke functionaliteiten zouden het nuttigst zijn?',
      description: 'Selecteer meerdere keuzes',
      options: {
        recherche: 'Geavanceerd zoeken naar opdrachten',
        alertes: 'Meldingen voor nieuwe opdrachten',
        documents: 'Beheer van documenten',
        avis: 'Beoordelingen van bureaus',
        support: 'Meertalige ondersteuning',
        autre: 'Andere',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Wat zou uw grootste bezwaar zijn om zo\'n platform te gebruiken?',
      options: {
        cout: 'Kosten',
        complexite: 'Te complex',
        confiance: 'Gebrek aan vertrouwen',
        changement: 'Niet willen veranderen',
        aucun: 'Geen bezwaar',
        autre: 'Andere',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Wat zou uw grootste bezwaar zijn?',
      options: {
        cout: 'Kosten',
        confiance: 'Vertrouwen in bureaus',
        complexite: 'Te ingewikkeld',
        aucun: 'Geen bezwaar',
        autre: 'Andere',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Wat zou uw grootste bezwaar zijn?',
      options: {
        complexite: 'Te ingewikkeld',
        confiance: 'Vertrouwen in het platform',
        acces: 'Toegang tot technologie',
        aucun: 'Geen bezwaar',
        autre: 'Andere',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Welk prijsmodel lijkt u het meest geschikt?',
      options: {
        commission: 'Commissie per missie',
        abonnement: 'Maandelijks abonnement',
        freemium: 'Gratis + premium opties',
        autre: 'Andere',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Welke diensten zou u het meest waarderen?',
      description: 'Selecteer meerdere keuzes',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Welke diensten zou u het meest waarderen?',
      description: 'Selecteer meerdere keuzes',
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Hoe geïnteresseerd bent u in een Europese detacheringsmarktplaats?',
      description: 'Beoordeel van 1 (niet geïnteresseerd) tot 10 (zeer geïnteresseerd)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Meest interessante functionaliteiten',
      description: 'Selecteer uw top 3 prioriteiten',
      options: {
        sipsi: 'Automatische SIPSI-aangifte',
        a1: 'A1-certificaatbeheer',
        conformite: 'Nalevingsdashboard',
        alertes: 'Meldingen & verlengingen',
        documents: 'Documentcentralisatie',
        marketplace: 'Bureaumarktplaats',
        support: 'Meertalige expertenondersteuning',
        api: 'API-integratie (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Meest interessante functionaliteiten',
      description: 'Selecteer alles wat u interesseert',
      options: {
        recherche: 'Zoeken naar betrouwbare bureaus',
        comparaison: 'Prijs/kwaliteitsvergelijking',
        avis: 'Geverifieerde beoordelingen',
        conformite: 'Nalevingsgarantie',
        support: 'Toegewijde ondersteuning',
        facturation: 'Gecentraliseerde facturering',
        suivi: 'Real-time tracking',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Meest interessante functionaliteiten',
      description: 'Selecteer alles wat u interesseert',
      options: {
        recherche: 'Zoeken naar werk',
        avis: 'Bureaubeoordelingen',
        logement: 'Huisvestingshulp',
        paiement: 'Beveiligde betaling',
        support: 'Ondersteuning in mijn taal',
        documents: 'Hulp bij administratieve documenten',
        formation: 'Opleidingsprogramma\'s',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Voorkeur prijsmodel',
      options: {
        mensuel: 'Vast maandabonnement',
        usage: 'Pay-as-you-go (gebruiksgebaseerd)',
        annuel: 'Jaarplan (korting)',
        gratuit: 'Gratis voor werknemers',
      },
    },
    
    // Q20 : Prix client (CLIENT)
    q20_prix_client: {
      ...fr.questions.q20_prix_client,
      label: 'Voorkeur prijsmodel',
      options: {
        commission: 'Commissie per indienstneming',
        abonnement: 'Maandabonnement',
        gratuit: 'Gratis met premium opties',
        autre: 'Andere',
      },
    },
    
    // Q20 : Prix worker (WORKER)
    q20_prix_worker: {
      ...fr.questions.q20_prix_worker,
      label: 'Zou u bereid zijn te betalen voor premium functies?',
      options: {
        oui: 'Ja',
        non: 'Nee, moet gratis zijn',
        depende: 'Hangt van de prijs af',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Maandelijks budget voor een complete SaaS-oplossing',
      options: {
        '0-100': '€0 - €100/maand',
        '100-300': '€100 - €300/maand',
        '300-500': '€300 - €500/maand',
        '500-1000': '€500 - €1.000/maand',
        '1000+': 'Meer dan €1.000/maand',
      },
    },
    
    // Q21 : Waitlist (AGENCY)
    q21_waitlist: {
      ...fr.questions.q21_waitlist,
      label: 'Wilt u op de hoogte gehouden worden van de lancering?',
      options: {
        oui_priorite: 'Ja, met prioritaire toegang',
        oui: 'Ja',
        peut_etre: 'Misschien',
        non: 'Nee',
      },
    },
    
    // Q21 : Waitlist client (CLIENT)
    q21_waitlist_client: {
      ...fr.questions.q21_waitlist_client,
      label: 'Wilt u op de hoogte gehouden worden?',
      options: {
        oui_demo: 'Ja, met een demo',
        oui: 'Ja',
        peut_etre: 'Misschien',
        non: 'Nee',
      },
    },
    
    // Q21 : Waitlist worker (WORKER)
    q21_waitlist_worker: {
      ...fr.questions.q21_waitlist_worker,
      label: 'Wilt u op de hoogte gehouden worden?',
      options: {
        oui: 'Ja',
        peut_etre: 'Misschien',
        non: 'Nee',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Wilt u een vroege versie (MVP) testen?',
      options: {
        oui_gratuit: 'Ja, gratis',
        oui_reduc: 'Ja, met korting',
        peut_etre: 'Misschien, hangt af van functies',
        non: 'Nee, niet geïnteresseerd',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle dans la décision d'achat (AGENCY & CLIENT)
    q23_role: {
      ...fr.questions.q23_role,
      label: 'Rol in de aankoopbeslissing',
      options: {
        decideur: 'Eindverantwoordelijke beslisser',
        influenceur: 'Beïnvloeder / Adviseur',
        utilisateur: 'Eindgebruiker',
        autre: 'Andere',
      },
    },
    
    // Q20 : Croissance (AGENCY) - Section 5 Vision
    q20_croissance: {
      label: 'Hoe ziet u uw detacheringsactiviteit de komende 3 jaar?',
      options: {
        forte_croissance: 'Sterke groei',
        croissance_moderee: 'Gematigde groei',
        stable: 'Stabiel',
        decroissance: 'Afname',
      },
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Zou u zo\'n platform aanbevelen aan collega\'s?',
      options: {
        certainement: 'Zeker',
        probablement: 'Waarschijnlijk',
        peut_etre: 'Misschien',
        probablement_pas: 'Waarschijnlijk niet',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Zou u zo\'n oplossing aanbevelen?',
      options: {
        certainement: 'Zeker',
        probablement: 'Waarschijnlijk',
        peut_etre: 'Misschien',
        probablement_pas: 'Waarschijnlijk niet',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Zou u zo\'n platform aanbevelen?',
      options: {
        certainement: 'Zeker',
        probablement: 'Waarschijnlijk',
        peut_etre: 'Misschien',
        probablement_pas: 'Waarschijnlijk niet',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Zou u willen deelnemen aan een bètafase?',
      options: {
        oui_immediat: 'Ja, onmiddellijk',
        oui_plus_tard: 'Ja, maar later',
        non: 'Nee',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Zou u willen deelnemen aan een test?',
      options: {
        oui_immediat: 'Ja, onmiddellijk',
        oui_plus_tard: 'Ja, maar later',
        non: 'Nee',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Zou u willen deelnemen aan een test?',
      options: {
        oui_immediat: 'Ja, onmiddellijk',
        oui_plus_tard: 'Ja, maar later',
        non: 'Nee',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'E-mail (optioneel)',
      placeholder: 'uw@email.com',
      description: 'Om resultaten te ontvangen en op de hoogte te blijven van het project',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Professioneel e-mailadres (optioneel)',
      placeholder: 'contact@uwbureau.com',
      description: 'Om resultaten te ontvangen en exclusieve toegang tot het platform',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Professioneel e-mailadres (optioneel)',
      placeholder: 'contact@uwbedrijf.com',
      description: 'Om aanbevelingen te ontvangen op maat van uw behoeften',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'E-mail (optioneel)',
      placeholder: 'uw@email.com',
      description: 'Om opdrachtkansen te ontvangen die bij uw profiel passen',
    },
    
    // Q23 : Téléphone (optioneel)
    q23_telephone: {
      label: 'Telefoon (optioneel)',
      placeholder: '+31 6 12 34 56 78',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Aanvullende opmerkingen of suggesties',
      placeholder: 'Deel uw ideeën, verwachtingen of specifieke behoeften...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Marktvisie in de komende 3 jaar',
      placeholder: 'Deel uw visie...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Andere behoeften of suggesties',
      placeholder: 'Uw suggesties interesseren ons...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Zakelijk telefoon',
      placeholder: '+31 20 123 4567',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Voornaam',
      placeholder: 'Uw voornaam',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Achternaam',
      placeholder: 'Uw achternaam',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'KVK-nummer (optioneel)',
      placeholder: '12345678',
      description: 'Voor verrijking via Kamer van Koophandel',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-mail',
      placeholder: 'uw.email@voorbeeld.nl',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Ik ga akkoord om opnieuw gecontacteerd te worden',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Ik zou graag het onderzoeksrapport ontvangen',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Prijs',
    },
    critere_qualite: {
      label: 'Kwaliteit van profielen',
    },
    critere_rapidite: {
      label: 'Reactiesnelheid',
    },
    critere_conformite: {
      label: 'Wettelijke naleving',
    },
    critere_flexibilite: {
      label: 'Flexibiliteit',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Persoonlijke begeleiding',
    },
    service_garantie: {
      label: 'Vervangingsgarantie',
    },
    service_formation: {
      label: 'Voorafgaande training',
    },
    service_gestion: {
      label: 'Administratief beheer',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Opleiding en certificeringen',
    },
    service_logement: {
      label: 'Hulp bij huisvesting',
    },
    service_transport: {
      label: 'Vervoersondersteuning',
    },
    service_administratif: {
      label: 'Administratieve ondersteuning',
    },
  },
};