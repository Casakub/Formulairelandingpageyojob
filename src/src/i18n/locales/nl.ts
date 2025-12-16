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
    1: { title: 'Profiel', description: '4 vragen • 2 min' },
    2: { title: 'Ervaring', description: '7 vragen • 3 min' },
    3: { title: 'Behoeften', description: '6 vragen • 2 min' },
    4: { title: 'Interesse YoJob', description: '6 vragen • 3 min' },
    5: { title: 'Toekomstvisie', description: '2 vragen • 1 min' },
    6: { title: 'Contact', description: '1 vraag • 1 min' },
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
    agency_description: 'U bent een uitzend- of detacheringsbureau',
    client: 'Opdrachtgever',
    client_description: 'U bent een bedrijf dat uitzendkrachten inzet',
    worker: 'Uitzendkracht',
    worker_description: 'U bent een uitzend- of gedetacheerde werknemer',
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
      description: 'Deel uw detacheringservaring als Europees bureau.',
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
        paiement: 'Betaling/salaris',
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
      ...fr.questions.q10_gestion,
      label: 'Hoe beheert u detacheringsaangiften vandaag?',
      options: {
        interne: 'Intern team',
        externe: 'Externe dienstverlener',
        mixte: 'Gemengde aanpak',
        manuel: 'Handmatige beheer',
        logiciel: 'Gespecialiseerde software',
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
      ...fr.questions.q11_incidents,
      label: 'Hebt u boetes of incidenten gehad met betrekking tot detacheringsnaleving?',
      description: 'Uw antwoord blijft anoniem',
      options: {
        jamais: 'Nee, nooit',
        rarement: 'Zelden (1-2 keer)',
        parfois: 'Soms (3-5 keer)',
        souvent: 'Vaak (6+ keer)',
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
      ...fr.questions.q12_budget,
      label: 'Jaarlijks budget toegewezen aan administratief beheer van detacheringsdossiers',
      options: {
        '0-5k': '€0-5.000 / jaar',
        '5-15k': '€5.000-15.000 / jaar',
        '15-30k': '€15.000-30.000 / jaar',
        '30k+': '€30.000+ / jaar',
        inconnu: 'Weet ik niet',
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
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Bent u tevreden met uw salaris als uitzendkracht?',
      options: {
        '<1500': 'Minder dan €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Welk percentage omzet gaat verloren door administratieve complexiteit?',
      options: {
        'non': 'Nee, niet echt',
        'faible': 'Ja, laag (< 5% omzet)',
        'moyen': 'Ja, gemiddeld (5-15% omzet)',
        'important': 'Ja, aanzienlijk (> 15% omzet)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Tevredenheid over uw huidige uitzendbureaus',
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
      label: 'Tevredenheid over uw huidige uitzendbureaus',
      options: {
        'tres_satisfait': 'Zeer tevreden',
        'satisfait': 'Tevreden',
        'neutre': 'Neutraal',
        'insatisfait': 'Ontevreden',
        'tres_insatisfait': 'Zeer ontevreden',
      },
    },
    
    // Section 3 - Besoins/Behoeften
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Uw belangrijkste zorgen',
      description: 'Selecteer alles wat van toepassing is',
      options: {
        amendes: 'Boetes en sancties',
        reputation: 'Reputatie / Imago',
        penal: 'Strafrechtelijke aansprakelijkheid',
        delais: 'Missievertragingen',
        clients: 'Verlies van klanten',
        aucun: 'Geen groot risico',
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
      placeholder: 'Bijv.: Salaris, huisvesting, ondersteuning, stabiliteit...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Gebruikt u ERP/beheersoftware?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Andere',
        aucun: 'Geen ERP',
      },
    },

    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Welke software/ERP?',
      placeholder: 'Bijv.: SAP, Odoo, eigen...',
    },

    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Uw belangrijkste selectiecriteria voor uitzendbureaus',
      description: 'Kies uw top 3',
    },

    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Wat zou uw ervaring met uitzendwerk verbeteren?',
      description: 'Selecteer alle toepasselijke opties',
    },

    // Section 4 - Intérêt YoJob

    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Bent u bereid uw werktools te veranderen?',
      options: {
        oui: 'Ja, geen probleem',
        conditions: 'Ja, onder voorwaarden',
        difficile: 'Moeilijk, maar wel open',
        non: 'Nee, niet mogelijk',
      },
    },

    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Maandelijks budget voor een platform voor tijdelijke werving',
      options: {
        '0': 'Niet bereid te betalen',
        '1-100': '€1 - €100/maand',
        '100-500': '€100 - €500/maand',
        '500-1000': '€500 - €1.000/maand',
        '1000+': 'Meer dan €1.000/maand',
      },
    },

    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Zou u een platform gebruiken om uitzendwerk in het buitenland te vinden?',
      options: {
        oui_certainement: 'Ja, zeker',
        oui_probablement: 'Ja, waarschijnlijk',
        peut_etre: 'Misschien',
        non: 'Nee',
      },
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
    
    // Q23 : Rôle
    q23_role: {
      label: 'Hoe ziet u uw rol op de Europese marktplaats?',
      options: {
        decideur: 'Eindverantwoordelijke beslisser',
        influenceur: 'Beïnvloeder / Adviseur',
        utilisateur: 'Eindgebruiker',
        autre: 'Andere',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Uw internationale uitbreidingsplannen',
      options: {
        oui_rapide: 'Ja, binnen 6 maanden',
        oui_lent: 'Ja, binnen 1-2 jaar',
        maintien: 'Huidige landen behouden',
        reduction: 'Internationale dekking verminderen',
      },
    },
    
    // Q24bis : Aspirations (WORKER)
    q24_aspirations: {
      label: 'Uw toekomstige professionele ambities',
      placeholder: 'Bijv.: vast contract, terugkeer naar het land, opleiding...',
    },
    
    // Q25 : Besoins
    q25_besoins: {
      label: 'Andere behoeften of opmerkingen',
      placeholder: 'Deel andere feedback of behoeften...',
    },
    
    // Section 6 - Contact
    
    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Zakelijk telefoonnummer',
      placeholder: '+31 6 12 34 56 78',
    },
    
    // Q27 : Prénom
    q27_firstname: {
      label: 'Voornaam',
      placeholder: 'Uw voornaam',
    },
    
    // Q28 : Nom
    q28_lastname: {
      label: 'Achternaam',
      placeholder: 'Uw achternaam',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'KVK-nummer (optioneel)',
      placeholder: '12345678',
      description: 'Voor verrijking via Kamer van Koophandel',
    },
    
    // Q30 : Email
    email: {
      label: 'E-mail',
      placeholder: 'uw.email@voorbeeld.nl',
    },
    
    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'Ik ga akkoord om opnieuw gecontacteerd te worden',
    },
    
    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'Ik wil graag het onderzoeksrapport ontvangen',
    },
  },
};