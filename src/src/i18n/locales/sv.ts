/**
 * 🇸🇪 TRADUCTIONS SUÉDOISES (SV)
 * 
 * Traductions complètes pour le suédois
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const sv: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profil',
    section2: 'Erfarenhet',
    section3: 'Behov',
    section4: 'Intresse',
    section5: 'Vision',
    section6: 'Kontakt',
    dashboard: 'Instrumentpanel',
    back_to_site: 'Tillbaka till webbplatsen',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Instrumentpanel',
    tabs: {
      overview: 'Översikt',
      results: 'Resultat',
      questions: 'Frågor',
      translations: 'Översättningar',
      export: 'Export',
      integrations: 'Integrationer',
      cms: 'CMS-formulär',
      settings: 'Inställningar',
      prospects: 'Potentiella kunder',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nytt',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Logga ut',
      back_to_survey: 'Tillbaka till undersökningen',
      toggle_sidebar: 'Fäll ihop/Expandera',
    },
    user: {
      welcome: 'Välkommen',
      logged_in_as: 'Inloggad som',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profil',
      description: '4 frågor • 2 min',
    },
    2: {
      title: 'Erfarenhet',
      description: '7 frågor • 3 min',
    },
    3: {
      title: 'Behov',
      description: '6 frågor • 2 min',
    },
    4: {
      title: 'Intresse för YoJob',
      description: '6 frågor • 3 min',
    },
    5: {
      title: 'Framtidsvision',
      description: '2 frågor • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 fråga • 1 min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Din företagsprofil',
        description: 'Berätta för oss om din byrå och dess kompetens',
      },
      client: {
        title: '📋 Din företagsprofil',
        description: 'Berätta för oss om ditt företag och rekryteringsbehov',
      },
      worker: {
        title: '📋 Din profil',
        description: 'Berätta för oss om din yrkesbakgrund',
      },
    },
    2: {
      agency: {
        title: '💼 Utstationeringsverksamhet',
        description: 'Din erfarenhet av att utstationera arbetare',
      },
      client: {
        title: '💼 Din rekryteringserfarenhet',
        description: 'Din nuvarande rekrytering och bemanningsarbete',
      },
      worker: {
        title: '💼 Din bemanningserfarenhet',
        description: 'Din resa som byråanställd',
      },
    },
    3: {
      agency: {
        title: '🎯 Behov och verktyg',
        description: 'Dina utmaningar och nuvarande lösningar',
      },
      client: {
        title: '🎯 Dina nuvarande behov',
        description: 'Utmaningar och förväntningar vid rekrytering',
      },
      worker: {
        title: '🎯 Dina förväntningar',
        description: 'Vad som är viktigt för dig i ett uppdrag',
      },
    },
    4: {
      agency: {
        title: '⭐ Intresse för europeisk plattform',
        description: 'Upptäck vår innovativa marknadsidé',
      },
      client: {
        title: '⭐ Intresse för europeisk plattform',
        description: 'En innovativ lösning för dina behov',
      },
      worker: {
        title: '⭐ Ditt intresse för plattformen',
        description: 'Plattform för enklare uppdragssökning',
      },
    },
    5: {
      agency: {
        title: '🔮 Framtidsvision',
        description: 'Budget och utvecklingsmöjligheter',
      },
      client: {
        title: '🔮 Dina framtida prioriteringar',
        description: 'Budget och rekryteringsstrategi',
      },
      worker: {
        title: '🔮 Dina mål',
        description: 'Dina kommande yrkesprojekt',
      },
    },
    6: {
      agency: {
        title: '📧 Håll kontakten',
        description: 'Ta emot undersökningsresultaten och håll dig informerad',
      },
      client: {
        title: '📧 Håll kontakten',
        description: 'Ta emot resultaten och våra rekommendationer',
      },
      worker: {
        title: '📧 Håll kontakten',
        description: 'Ta emot resultaten och möjligheter',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Marknadsundersökning',
  },
  
  // Hero
  hero: {
    title: 'Marknadsundersökning',
    subtitle: 'Hjälp oss att bättre förstå dina behov',
    description: 'Denna undersökning tar cirka 10-15 minuter. Dina svar hjälper oss att skapa en lösning anpassad för din bransch.',
    cta_start: 'Starta undersökningen',
    cta_dashboard: 'Öppna instrumentpanelen',
    badge: 'Europeisk marknadsundersökning',
    stat: {
      countries: '27 europeiska länder',
      questions: 'frågor',
      benchmark: 'Få 2025-års benchmark',
      insights: 'Exklusiva marknadsinsikter',
      opportunities: 'Prioriterad tillgång till jobb',
    },
    footer: {
      info: 'frågor • Anonymt • GDPR-kompatibelt',
      anonymous: 'Anonymt',
      gdpr: 'GDPR-kompatibelt',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Vem är du?',
    subtitle: 'Välj din profil för att anpassa frågorna',
    agency: 'Bemanningsföretag',
    agency_description: 'Du är en bemannings- eller utstationeringsbyrå',
    client: 'Klient',
    client_description: 'Du är ett företag som anställer byråanställda',
    worker: 'Byråanställd',
    worker_description: 'Du är en byråanställd eller utstationerad arbetare',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Europeisk marknadsundersökning - Sysselsättning och Bemanningsarbete',
    title: 'Dela din erfarenhet på den europeiska marknaden',
    subtitle: 'Välj din profil för att starta undersökningen',
    cta: 'Klicka för att börja →',
    trust: {
      secure: 'Säkra data',
      languages: '{count} tillgängliga språk',
      languages_suffix: 'tillgängliga språk',
      anonymous: 'Anonymt och konfidentiellt',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Bemanningsföretag',
      description: 'Du är en europeisk bemanningsbyrå. Dela din utstationeringserfarenhet.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klient',
      description: 'Du anställer byråanställda. Dela dina behov och förväntningar.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Byråanställd',
      description: 'Du arbetar som byråanställd. Dela din erfarenhet från fältet.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Föregående',
    next: 'Nästa',
    submit: 'Skicka svar',
    submitting: 'Skickar...',
    back: 'Tillbaka',
    start: 'Börja',
  },
  
  // Confirmation
  confirmation: {
    title: 'Tack för ditt deltagande!',
    subtitle: 'Dina svar har sparats framgångsrikt',
    message: 'Vi analyserar just nu alla svar för att skapa en lösning helt anpassad efter dina behov.',
    cta_back: 'Tillbaka till startsidan',
    cta_dashboard: 'Visa instrumentpanelen',
  },
  
  // Progress
  progress: {
    section: 'Avsnitt',
    question: 'Fråga',
    section_completed: 'Avsnitt slutfört',
    questions_remaining: '{count} frågor kvar',
    time_remaining: 'Cirka {time} kvar',
  },
  
  // Common translations
  common: {
    oui: 'Ja',
    non: 'Nej',
    autre: 'Annat',
    loading: 'Laddar...',
    submit: 'Skicka',
    next: 'Nästa',
    previous: 'Föregående',
    skip: 'Hoppa över',
    save: 'Spara',
    cancel: 'Avbryt',
    close: 'Stäng',
    required: 'Obligatoriskt',
    optional: 'Valfritt',
    error: 'Fel',
    success: 'Framgång',
    completed: 'Slutfört',
    inProgress: 'Pågående',
    notStarted: 'Ej påbörjat',
    profileAgency: 'Bemanningsföretag',
    profileClient: 'Klient',
    profileWorker: 'Byråanställd',
  },
  
  // Sectors
  sectors: {
    btp: 'Byggnad',
    industrie: 'Industri',
    logistique: 'Logistik',
    hotellerie: 'Gästfrihet',
    sante: 'Hälso- och sjukvård',
    agriculture: 'Jordbruk',
    tech: 'Tech/IT',
    autres: 'Annat',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions SV
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Namn',
      placeholder: 'Organisationsnamn eller ditt fullständiga namn',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Grundningsår',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Ditt företags grundningsår',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Din nationalitet',
      placeholder: 't.ex.: polsk, rumänsk...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organisationsstorlek',
      options: {
        '1-9': '1-9 anställda',
        '10-49': '10-49 anställda',
        '50-249': '50-249 anställda',
        '250+': '250+ anställda',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'År av bemanningserfarenhet',
      options: {
        '<1': 'Mindre än 1 år',
        '1-3': '1-3 år',
        '3-5': '3-5 år',
        '5-10': '5-10 år',
        '10+': 'Över 10 år',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Huvudsektorer',
      description: 'Välj alla relevanta sektorer',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Dina yrken',
      description: 'Välj alla dina yrken',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Din byråns land',
      placeholder: 't.ex.: Polen',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Land där ditt företag är verksamt',
      placeholder: 't.ex.: Frankrike',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Länder där du har arbetat som byråanställd',
      placeholder: 't.ex.: Frankrike, Tyskland, Belgien...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Årlig volym av utstationerade arbetare',
      options: {
        '0': 'Ingen ännu',
        '1-50': '1-50 anställda',
        '51-200': '51-200 anställda',
        '201-500': '201-500 anställda',
        '500+': 'Över 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Hur många byråanställda anställer ni per år?',
      options: {
        '0': 'Ingen för närvarande',
        '1-10': '1-10 personer',
        '11-50': '11-50 personer',
        '51-200': '51-200 personer',
        '200+': '200+ personer',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Hur ofta arbetar du som byråanställd?',
      options: {
        permanent: 'Regelbundet (hela året)',
        saisonnier: 'Säsongsvis (vissa månader)',
        occasionnel: 'Ibland',
        jamais: 'Aldrig ännu (söker)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Var kommer dina utstationerade arbetare ifrån?',
      placeholder: 't.ex.: Polen, Rumänien, Bulgarien...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Destinationsländer',
      description: 'Länder där du utstationerar arbetare',
      placeholder: 't.ex.: Frankrike, Tyskland, Belgien, Nederländerna...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nationaliteter för byråanställda ni anställer',
      placeholder: 't.ex.: polsk, rumänsk, bulgarisk...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Din huvudsakliga utmaning med internationell utstationering',
      options: {
        admin: 'Administrativ komplexitet (A1, SIPSI...)',
        conformite: 'Regelefterlevnad i flera länder',
        cout: 'Hanteringskostnader och tid',
        langues: 'Språkbarriärer',
        autre: 'Annat',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Din huvudsakliga utmaning med europeiska byråanställda',
      options: {
        trouver: 'Att hitta pålitliga byråer',
        conformite: 'Juridisk efterlevnad',
        qualite: 'Kvalitet/kompetens',
        cout: 'För höga kostnader',
        langues: 'Kommunikation / Språk',
        autre: 'Annat',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Din huvudsakliga utmaning med bemanningsarbete utomlands',
      options: {
        admin: 'Administrativt pappersarbete',
        langue: 'Språkbarriär',
        logement: 'Att hitta boende',
        transport: 'Transport',
        salaire: 'Betalnings-/löneproblem',
        autre: 'Annat',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Specificera din huvudsakliga utmaning',
      placeholder: 'Beskriv din huvudsakliga utmaning...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Hur hanterar ni utstationeringsansökningar idag?',
      options: {
        interne: 'Internt team',
        externe: 'Extern tjänsteleverantör',
        mixte: 'Blandat tillvägagångssätt',
        manuel: 'Manuell hantering',
        logiciel: 'Specialiserad programvara',
        manuel: 'Manuellt (Excel, Word...)',
        logiciel_interne: 'Intern programvara',
        prestataire: 'Extern tjänsteleverantör',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Hur många bemanningsföretag använder ni?',
      options: {
        '0': 'Inget',
        '1': '1 byrå',
        '2-3': '2-3 byråer',
        '4-10': '4-10 byråer',
        '10+': 'Över 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Hur anställer ni byråanställda?',
      options: {
        agence_fr: 'Franska bemanningsföretag',
        agence_euro: 'Europeiska bemanningsföretag',
        direct: 'Direkt anställning',
        mixte: 'Blandat',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Hur söker du bemanningsarbete?',
      options: {
        agence: 'Genom bemanningsföretag',
        bouche: 'Rekommendation',
        internet: 'Online jobbportaler',
        direct: 'Direktansökan',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Hur många byråer samarbetar du med?',
      options: {
        '1': 'Endast 1 byrå',
        '2-3': '2-3 byråer',
        '4-10': '4-10 byråer',
        '10+': 'Över 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Har du fått böter eller incidenter relaterade till utstationeringsefterlevnad?',
      description: 'Ditt svar förblir anonymt',
      options: {
        jamais: 'Nej, aldrig',
        rarement: 'Sällan (1-2 gånger)',
        parfois: 'Ibland (3-5 gånger)',
        souvent: 'Ofta (6+ gånger)',
        oui_souvent: 'Ja, ofta',
        oui_rare: 'Ja, ibland',
        non: 'Nej',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Kontrollerar ni bemanningsföretags juridiska efterlevnad?',
      options: {
        oui_systematique: 'Ja, systematiskt',
        oui_parfois: 'Ja, ibland',
        non: 'Nej',
        ne_sait_pas: 'Vet inte',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Har du upplevt problem med bemanningsarbete utomlands?',
      options: {
        oui_graves: 'Ja, allvarliga problem',
        oui_mineurs: 'Ja, mindre problem',
        non: 'Nej',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Har ni budget för externa tjänster för utstationeringshantering?',
      options: {
        oui_important: 'Ja, betydande',
        oui_modere: 'Ja, måttlig',
        non: 'Nej',
        ne_sait_pas: 'Vet inte',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Vilka är era huvudkriterier för att välja ett bemanningsföretag?',
      description: 'Välj flera alternativ',
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Hur nöjd är du med dina nuvarande arbetsvillkor?',
      options: {
        tres_satisfait: 'Mycket nöjd',
        satisfait: 'Nöjd',
        neutre: 'Neutral',
        insatisfait: 'Missnöjd',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Genomsnittlig varaktighet för dina utstationeringsuppdrag',
      options: {
        '<1mois': 'Mindre än 1 månad',
        '1-3mois': '1-3 månader',
        '3-6mois': '3-6 månader',
        '6-12mois': '6-12 månader',
        '12+mois': 'Över 12 månader',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Vad är er årsbudget för bemanningsarbete?',
      options: {
        '<50k': 'Mindre än €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Över €1M',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Din föredragna uppdragsvaraktighet',
      options: {
        court: 'Kort (< 3 månader)',
        moyen: 'Medellång (3-6 månader)',
        long: 'Lång (> 6 månader)',
        indifferent: 'Spelar ingen roll',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Skulle du vara intresserad av en europeisk plattform för att erbjuda dina tjänster?',
      description: 'En marknadsplats för att öka din synlighet',
      options: {
        tres_interesse: 'Mycket intresserad',
        interesse: 'Intresserad',
        neutre: 'Neutral',
        pas_interesse: 'Inte intresserad',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Skulle du vara intresserad av en plattform för att enkelt hitta europeiska byråer?',
      options: {
        tres_interesse: 'Mycket intresserad',
        interesse: 'Intresserad',
        neutre: 'Neutral',
        pas_interesse: 'Inte intresserad',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Skulle du vara intresserad av en plattform för att söka uppdrag?',
      options: {
        tres_interesse: 'Mycket intresserad',
        interesse: 'Intresserad',
        neutre: 'Neutral',
        pas_interesse: 'Inte intresserad',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Vilka funktioner skulle vara mest användbara?',
      description: 'Välj flera alternativ',
      options: {
        marketplace: 'Tjänstemarknadsplats',
        admin: 'Automatiserad administration',
        conformite: 'Efterlevnadskontroller',
        payment: 'Integrerade betalningar',
        support: 'Flerspråkig support',
        autre: 'Annat',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Vilka funktioner skulle vara mest användbara?',
      description: 'Välj flera alternativ',
      options: {
        comparaison: 'Jämförelse av byråer',
        avis: 'Verifierade recensioner',
        suivi: 'Uppföljning av uppdrag',
        documentation: 'Centraliserad dokumentation',
        facturation: 'Fakturahantering',
        autre: 'Annat',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Vilka funktioner skulle vara mest användbara?',
      description: 'Välj flera alternativ',
      options: {
        recherche: 'Avancerad uppdragssökning',
        alertes: 'Meddelanden om nya uppdrag',
        documents: 'Dokumenthantering',
        avis: 'Byrååterkopplingar',
        support: 'Flerspråkig support',
        autre: 'Annat',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Vad skulle vara ditt största hinder för att använda en sådan plattform?',
      options: {
        cout: 'Kostnad',
        complexite: 'För komplext',
        confiance: 'Brist på förtroende',
        changement: 'Vill inte förändra',
        aucun: 'Inga hinder',
        autre: 'Annat',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Vad skulle vara ditt största hinder?',
      options: {
        cout: 'Kostnad',
        confiance: 'Förtroende för byråer',
        complexite: 'För komplext',
        aucun: 'Inga hinder',
        autre: 'Annat',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Vad skulle vara ditt största hinder?',
      options: {
        complexite: 'För komplext',
        confiance: 'Förtroende för plattformen',
        acces: 'Tillgång till teknik',
        aucun: 'Inga hinder',
        autre: 'Annat',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Vilken prismodell verkar mest lämplig för dig?',
      options: {
        commission: 'Provisionsavgift per uppdrag',
        abonnement: 'Månadsprenumeration',
        freemium: 'Gratis + premiumfunktioner',
        autre: 'Annat',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Vilka tjänster skulle du värdera mest?',
      description: 'Välj flera alternativ',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Vilka tjänster skulle du värdera mest?',
      description: 'Välj flera alternativ',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Skulle du rekommendera en sådan plattform till kollegor?',
      options: {
        certainement: 'Definitivt',
        probablement: 'Troligen',
        peut_etre: 'Kanske',
        probablement_pas: 'Troligen inte',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Skulle du rekommendera en sådan lösning?',
      options: {
        certainement: 'Definitivt',
        probablement: 'Troligen',
        peut_etre: 'Kanske',
        probablement_pas: 'Troligen inte',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Skulle du rekommendera en sådan plattform?',
      options: {
        certainement: 'Definitivt',
        probablement: 'Troligen',
        peut_etre: 'Kanske',
        probablement_pas: 'Troligen inte',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Skulle du vilja delta i betafasen?',
      options: {
        oui_immediat: 'Ja, omedelbart',
        oui_plus_tard: 'Ja, men senare',
        non: 'Nej',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Skulle du vilja delta i testningen?',
      options: {
        oui_immediat: 'Ja, omedelbart',
        oui_plus_tard: 'Ja, men senare',
        non: 'Nej',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Skulle du vilja delta i testningen?',
      options: {
        oui_immediat: 'Ja, omedelbart',
        oui_plus_tard: 'Ja, men senare',
        non: 'Nej',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Hur ser du din utstationeringsverksamhet under de kommande 3 åren?',
      options: {
        forte_croissance: 'Stark tillväxt',
        croissance: 'Måttlig tillväxt',
        stable: 'Stabil',
        decroissance: 'Minskning',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Hur ser du utvecklingen av ditt behov av bemanningsarbete?',
      options: {
        hausse: 'Ökning',
        stable: 'Stabil',
        baisse: 'Minskning',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Vilka är dina projekt de kommande månaderna?',
      options: {
        meme_secteur: 'Fortsätta i samma sektor',
        changer_secteur: 'Byta sektor',
        se_former: 'Utbilda mig',
        entrepreneur: 'Bli företagare',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Planerar ni att öka er budget för externa tjänster?',
      options: {
        oui_beaucoup: 'Ja, avsevärt',
        oui_peu: 'Ja, lite',
        non: 'Nej',
        ne_sait_pas: 'Vet inte',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Planerar ni att öka er rekryteringsbudget?',
      options: {
        oui_beaucoup: 'Ja, avsevärt',
        oui_peu: 'Ja, lite',
        non: 'Nej',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Är du villig att flytta för arbete?',
      options: {
        oui_europe: 'Ja, var som helst i Europa',
        oui_proche: 'Ja, i grannländer',
        non: 'Nej, bara i mitt land',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'E-post (valfritt)',
      placeholder: 'din@email.se',
      description: 'För att ta emot resultaten och information om projektet',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Företags-e-post (valfritt)',
      placeholder: 'kontakt@dinbyra.se',
      description: 'För att ta emot resultaten och exklusiv tillgång till plattformen',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Företags-e-post (valfritt)',
      placeholder: 'kontakt@ditt-foretag.se',
      description: 'För att ta emot rekommendationer anpassade efter dina behov',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'E-post (valfritt)',
      placeholder: 'din@email.se',
      description: 'För att ta emot möjligheter som matchar din profil',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Telefon (valfritt)',
      placeholder: '+46 70 123 4567',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Ytterligare kommentarer eller förslag',
      placeholder: 'Dela dina idéer, förväntningar eller specifika behov...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Marknadsvision de kommande 3 åren',
      placeholder: 'Dela din vision...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Andra behov eller förslag',
      placeholder: 'Dina förslag intresserar oss...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Företagstelefon',
      placeholder: '+46 8 123 456 78',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Förnamn',
      placeholder: 'Ditt förnamn',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Efternamn',
      placeholder: 'Ditt efternamn',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'Organisationsnummer (valfritt)',
      placeholder: '123456-7890',
      description: 'För berikning via Bolagsverket',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-post',
      placeholder: 'din.epost@exempel.se',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Jag samtycker till att kontaktas igen',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Jag skulle vilja få studierapporten',
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
      label: 'Svarshastighet',
    },
    critere_conformite: {
      label: 'Juridisk efterlevnad',
    },
    critere_flexibilite: {
      label: 'Flexibilitet',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Personlig support',
    },
    service_garantie: {
      label: 'Ersättningsgaranti',
    },
    service_formation: {
      label: 'Förutbildning',
    },
    service_gestion: {
      label: 'Administrativ hantering',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Utbildningar och certifikat',
    },
    service_logement: {
      label: 'Hjälp med boende',
    },
    service_transport: {
      label: 'Transportstöd',
    },
    service_administratif: {
      label: 'Administrativt stöd',
    },
  },
};