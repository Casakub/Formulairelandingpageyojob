/**
 * 🇸🇪 SVENSKA ÖVERSÄTTNINGAR (SV)
 *
 * Komplett svensk översättning
 * Bas: en.ts (samma struktur)
 *
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const sv: TranslationBundle = {
  // Ärver saknade nycklar från FR
  ...fr,

  // Navigering
  nav: {
    section1: 'Profil',
    section2: 'Erfarenhet',
    section3: 'Behov',
    section4: 'Intresse',
    section5: 'Vision',
    section6: 'Kontakt',
    dashboard: 'Dashboard',
    back_to_site: 'Tillbaka till webbplatsen',
  },

  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Översikt',
      results: 'Resultat',
      questions: 'Frågor',
      translations: 'Översättningar',
      export: 'Export',
      integrations: 'Integrationer',
      cms: 'Formulär-CMS',
      settings: 'Inställningar',
      prospects: 'Prospekt',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Ny',
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

  // Sektioner
  section: {
    1: { title: 'Byråprofil', description: '4 frågor • 2 min' },
    2: { title: 'Utsändning', description: '7 frågor • 3 min' },
    3: { title: 'Behov', description: '6 frågor • 2 min' },
    4: { title: 'YoJob-intresse', description: '6 frågor • 3 min' },
    5: { title: 'Framtidsvision', description: '2 frågor • 1 min' },
    6: { title: 'Kontakt', description: '1 fråga • 1 min' },
  },

  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Marknadsundersökning',
  },

  // Hero
  hero: {
    title: 'Marknadsenkät',
    subtitle: 'Hjälp oss att förstå dina behov bättre',
    description:
      'Enkäten tar cirka 10–15 minuter. Dina svar hjälper oss skapa en lösning anpassad till din bransch.',
    cta_start: 'Starta enkäten',
    cta_dashboard: 'Öppna dashboard',
    badge: 'Europeisk marknadsstudie',
    stat: {
      countries: '27 europeiska länder',
      questions: 'frågor',
      benchmark: 'Få benchmark 2025',
      insights: 'Exklusiva marknadsinsikter',
      opportunities: 'Prioriterad tillgång till jobb',
    },
    footer: {
      info: 'frågor • Anonymt • GDPR-kompatibelt',
      anonymous: 'Anonymt',
      gdpr: 'GDPR-kompatibelt',
    },
  },

  // Respondenttyp
  respondent_type: {
    title: 'Vem är du?',
    subtitle: 'Välj din profil för att anpassa frågorna',
    agency: 'Bemanningsbyrå',
    agency_description: 'Du är en bemannings- eller utsändningsbyrå',
    client: 'Kundföretag',
    client_description: 'Du är ett företag som anlitar bemanningspersonal',
    worker: 'Bemanningsanställd',
    worker_description: 'Du är en bemannings- eller utsänd arbetstagare',
  },

  // Profilväljare
  selector: {
    badge: '🌍 Europeisk marknadsstudie – Rekrytering & Bemanning',
    title: 'Dela dina erfarenheter från den europeiska marknaden',
    subtitle: 'Välj profil för att starta enkäten',
    cta: 'Klicka för att börja →',
    trust: {
      secure: 'Säkra data',
      languages: '{count} tillgängliga språk',
      languages_suffix: 'tillgängliga språk',
      anonymous: 'Anonymt & konfidentiellt',
    },
  },

  // Respondentkort
  respondent: {
    agency: {
      label: 'Bemanningsbyrå',
      description: 'Du är en europeisk bemanningsbyrå. Dela din utsändningserfarenhet.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Kundföretag',
      description: 'Du anlitar bemanningsanställda. Dela dina behov och förväntningar.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Bemanningsanställd',
      description: 'Du arbetar som bemanningsanställd. Dela dina erfarenheter från fältet.',
      estimatedTime: '10 min',
    },
  },

  // Knappar
  button: {
    previous: 'Föregående',
    next: 'Nästa',
    submit: 'Skicka mina svar',
    submitting: 'Skickar...',
    back: 'Tillbaka',
    start: 'Starta',
  },

  // Bekräftelse
  confirmation: {
    title: 'Tack för ditt deltagande!',
    subtitle: 'Dina svar har sparats',
    message: 'Vi analyserar alla svar för att skapa en lösning som passar dina behov perfekt.',
    cta_back: 'Tillbaka till startsidan',
    cta_dashboard: 'Visa dashboard',
  },

  // Framsteg
  progress: {
    section: 'Sektion',
    question: 'Fråga',
    section_completed: 'Sektion klar',
    questions_remaining: '{count} frågor kvar',
    time_remaining: 'Ungefär {time} kvar',
  },

  // Vanliga översättningar
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
    success: 'Klart',
    completed: 'Avslutat',
    inProgress: 'Pågår',
    notStarted: 'Inte påbörjat',
    profileAgency: 'Bemanningsbyrå',
    profileClient: 'Kundföretag',
    profileWorker: 'Bemanningsanställd',
    score_not_interested: 'Inte intresserad',
    score_very_interested: 'Mycket intresserad',
  },

  // Sektorer
  sectors: {
    btp: 'Bygg',
    industrie: 'Tillverkning',
    logistique: 'Logistik',
    hotellerie: 'Hotell & Restaurang',
    sante: 'Hälsovård',
    agriculture: 'Jordbruk',
    tech: 'Tech/IT',
    autres: 'Övrigt',
  },

  // Frågor – struktur en.ts
  questions: {
    ...fr.questions,

    // Q1 : Namn
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Namn',
      placeholder: 'Organisationsnamn eller ditt fullständiga namn',
    },

    // Q2 : Grundande (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'År då ni grundades',
      placeholder: '2015',
    },

    // Q2 : Grundande (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'År då företaget grundades',
      placeholder: '2010',
    },

    // Q2 : Nationalitet (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Din nationalitet',
      placeholder: 'T.ex.: polsk, rumänsk...',
    },

    // Q3 : Storlek (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organisationens storlek',
      options: {
        '1-9': '1-9 anställda',
        '10-49': '10-49 anställda',
        '50-249': '50-249 anställda',
        '250+': '250+ anställda',
      },
    },

    // Q3 : Erfarenhet (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'År av bemanningserfarenhet',
      options: {
        '<1': 'Mindre än 1 år',
        '1-3': '1-3 år',
        '3-5': '3-5 år',
        '5-10': '5-10 år',
        '10+': 'Mer än 10 år',
      },
    },

    // Q4 : Sektorer
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Huvudsakliga sektorer',
      description: 'Välj alla relevanta sektorer',
    },

    // Q4 : Yrken (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Dina yrken',
      description: 'Välj alla dina yrken',
    },

    // Q5 : Land (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Land för din byrå',
      placeholder: 'T.ex.: Polen',
    },

    // Q5 : Lokalisering (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Land där företaget verkar',
      placeholder: 'T.ex.: Frankrike',
    },

    // Q5 : Arbetsländer (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Länder där du arbetat som bemanningsanställd',
      placeholder: 'T.ex.: Frankrike, Tyskland, Belgien...',
    },

    // Q6 : Volym (AGENCY)
    q6_volume: {
      label: 'Årlig volym utsända arbetare',
      options: {
        '0': 'Inga ännu',
        '1-50': '1-50 arbetare',
        '51-200': '51-200 arbetare',
        '201-500': '201-500 arbetare',
        '500+': 'Mer än 500',
      },
    },

    // Q6 : Volym klient (CLIENT)
    q6_volume_client: {
      label: 'Hur många bemanningsanställda anlitar ni per år?',
      options: {
        '0': 'Inga just nu',
        '1-10': '1-10 personer',
        '11-50': '11-50 personer',
        '51-200': '51-200 personer',
        '200+': '200+ personer',
      },
    },

    // Q6 : Frekvens (WORKER)
    q6_frequence: {
      label: 'Hur ofta arbetar du som bemanningsanställd?',
      options: {
        permanent: 'Regelbundet (hela året)',
        saisonnier: 'Säsongsvis (vissa månader)',
        occasionnel: 'Tillfälligt',
        jamais: 'Aldrig ännu (söker)',
      },
    },

    // Sektion 2 – Utsändning / Erfarenhet

    // Q7 : Ursprung (AGENCY)
    q7_origine: {
      label: 'Varifrån kommer de utsända arbetarna?',
      placeholder: 'T.ex.: Polen, Rumänien, Bulgarien...',
    },

    // Q8 : Destinationer (AGENCY)
    q8_destinations: {
      label: 'Destinationsländer',
      description: 'Länder där ni placerar arbetare',
      placeholder: 'T.ex.: Frankrike, Tyskland, Belgien, Nederländerna...',
    },

    // Q8 : Nationaliteter (CLIENT)
    q8_nationalites: {
      label: 'Nationaliteter för de bemanningsanställda ni anlitar',
      placeholder: 'T.ex.: polsk, rumänsk, bulgarisk...',
    },

    // Q9 : Utmaning (AGENCY)
    q9_defi: {
      label: 'Största utmaningen med internationell utsändning',
      options: {
        admin: 'Administrativ komplexitet (A1, SIPSI...)',
        conformite: 'Juridisk efterlevnad i flera länder',
        cout: 'Kostnader och tid för hantering',
        langues: 'Språkbarriärer',
        autre: 'Annat',
      },
    },

    // Q9 : Utmaning klient (CLIENT)
    q9_defi_client: {
      label: 'Största utmaningen med europeiska bemanningsanställda',
      options: {
        trouver: 'Hitta pålitliga byråer',
        conformite: 'Juridisk efterlevnad',
        qualite: 'Kvalitet/kompetens',
        cout: 'För höga kostnader',
        langues: 'Kommunikation / Språk',
        autre: 'Annat',
      },
    },

    // Q9 : Utmaning arbetare (WORKER)
    q9_defi_worker: {
      label: 'Största utmaningen i dina uppdrag',
      options: {
        trouver: 'Hitta uppdrag',
        admin: 'Administrativt pappersarbete',
        logement: 'Boende',
        langue: 'Lokalt språk',
        paiement: 'Betalningar / Lön',
        autre: 'Annat',
      },
    },

    // Q9 : Annat
    q9_autre: {
      label: 'Ange din huvudsakliga utmaning',
      placeholder: 'Beskriv huvudsakliga utmaningen...',
    },

    // Q10 : Hantering (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Hur hanterar ni utsändningsanmälningar idag?',
      options: {
        interne: 'Internt team',
        externe: 'Extern leverantör',
        mixte: 'Kombinerat',
        manuel: 'Manuell hantering',
        logiciel: 'Specialiserad programvara',
      },
    },

    // Q10 : Byråer (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Hur många bemanningsbyråer använder ni?',
      options: {
        '0': 'Inga',
        '1': '1 byrå',
        '2-3': '2-3 byråer',
        '4-10': '4-10 byråer',
        '10+': 'Mer än 10',
      },
    },

    // Q10 : Process (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Hur rekryterar ni bemanningsanställda?',
      options: {
        agence_fr: 'Franska bemanningsbyråer',
        agence_euro: 'Europeiska bemanningsbyråer',
        direct: 'Direktrekrytering',
        mixte: 'Kombinerat',
      },
    },

    // Q10 : Byrå (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Hur hittar du bemanningsuppdrag?',
      options: {
        agence: 'Via bemanningsbyråer',
        bouche: 'Muntliga rekommendationer',
        internet: 'Jobbportaler online',
        direct: 'Direktansökan',
      },
    },

    // Q10ter : Använda byråer (WORKER)
    q10_agences_worker: {
      label: 'Hur många byråer samarbetar du med?',
      options: {
        '1': 'Endast 1 byrå',
        '2-3': '2-3 byråer',
        '4-10': '4-10 byråer',
        '10+': 'Mer än 10',
      },
    },

    // Q11 : Incidenter (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Har ni fått böter eller incidenter kopplade till utsändning?',
      description: 'Ditt svar är anonymt',
      options: {
        jamais: 'Nej, aldrig',
        rarement: 'Sällan (1-2 ggr)',
        parfois: 'Ibland (3-5 ggr)',
        souvent: 'Ofta (6+ ggr)',
      },
    },

    // Q11 : Efterlevnad (CLIENT)
    q11_conformite: {
      label: 'Kontrollerar ni juridisk efterlevnad hos bemanningsbyråer?',
      options: {
        oui_systematique: 'Ja, systematiskt',
        oui_parfois: 'Ja, ibland',
        non: 'Nej',
        ne_sait_pas: 'Vet inte',
      },
    },

    // Q11 : Problem (WORKER)
    q11_problemes: {
      label: 'Har du haft problem med bemanningsarbete utomlands?',
      options: {
        oui_graves: 'Ja, allvarliga problem',
        oui_mineurs: 'Ja, mindre problem',
        non: 'Nej',
      },
    },

    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Årlig budget för administrativ hantering av utsändning',
      options: {
        '0-5k': '€0-5.000 / år',
        '5-15k': '€5.000-15.000 / år',
        '15-30k': '€15.000-30.000 / år',
        '30k+': '€30.000+ / år',
        inconnu: 'Vet inte',
      },
    },

    // Q12 : Budget kund (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Årlig budget för bemanningsarbete',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'Vet inte',
      },
    },

    // Q12 : Nöjdhet (CLIENT)
    q12_satisfaction: {
      label: 'Nöjdhet med nuvarande byråer',
      options: {
        tres_satisfait: 'Mycket nöjd',
        satisfait: 'Nöjd',
        neutre: 'Neutral',
        insatisfait: 'Missnöjd',
      },
    },

    // Q12 : Lön (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Är du nöjd med lönen som bemanningsanställd?',
      options: {
        '<1500': 'Mindre än €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },

    // Q13 : Intäktsbortfall (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Hur stor andel av intäkterna går förlorad p.g.a. administrativa komplexitet?',
      options: {
        'non': 'Nej, inte direkt',
        'faible': 'Ja, låg (< 5% intäkter)',
        'moyen': 'Ja, medel (5-15% intäkter)',
        'important': 'Ja, betydande (> 15% intäkter)',
      },
    },

    // Q13 : Nöjdhet (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Nöjdhet med era nuvarande bemanningsbyråer',
      options: {
        'tres_satisfait': 'Mycket nöjd',
        'satisfait': 'Nöjd',
        'neutre': 'Neutral',
        'insatisfait': 'Missnöjd',
        'tres_insatisfait': 'Mycket missnöjd',
      },
    },

    // Q13 : Nöjdhet arbetare (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Nöjdhet med dina nuvarande byråer',
      options: {
        'tres_satisfait': 'Mycket nöjd',
        'satisfait': 'Nöjd',
        'neutre': 'Neutral',
        'insatisfait': 'Missnöjd',
        'tres_insatisfait': 'Mycket missnöjd',
      },
    },

    // Sektion 3 – Behov

    // Q14 : Risker (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Viktigaste bekymren',
      description: 'Välj alla som gäller',
      options: {
        amendes: 'Böter och sanktioner',
        reputation: 'Rykte / Image',
        penal: 'Straffrättsligt ansvar',
        delais: 'Förseningar i uppdrag',
        clients: 'Förlust av kunder',
        aucun: 'Inget större risk',
      },
    },

    // Q14 : Behov (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Viktigaste behoven',
      description: 'Välj alla som gäller',
      options: {
        fiabilite: 'Hitta pålitliga byråer',
        conformite: 'Juridisk efterlevnad',
        qualite: 'Kvalitet/kompetens',
        cout: 'Kostnader',
        disponibilite: 'Tillgänglighet av kandidater',
        aucun: 'Inget större behov',
      },
    },

    // Q14 : Förväntningar (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Förväntningar på arbete utomlands',
      description: 'Välj alla som gäller',
      options: {
        salaire: 'Bättre lön',
        conditions: 'Bättre arbetsvillkor',
        stabilite: 'Stabilitet',
        experience: 'Internationell erfarenhet',
        logement: 'Hjälp med boende',
        aucun: 'Inga särskilda förväntningar',
      },
    },

    // Q14_risques_client
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Viktigaste bekymren',
      description: 'Välj alla som gäller',
      options: {
        conformite: 'Juridisk efterlevnad',
        qualite: 'Kvalitet/kompetens',
        communication: 'Kommunikation/Språk',
        cout: 'Oväntade kostnader',
        disponibilite: 'Tillgänglighet av kandidater',
        aucun: 'Inga större bekymmer',
      },
    },

    // Q14_risques_worker
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Vilka problem stöter du oftast på?',
      description: 'Välj alla som gäller',
      options: {
        paiement: 'Försenade betalningar',
        conditions: 'Dåliga villkor',
        contrat: 'Avtal följs inte',
        logement: 'Bristfälligt boende',
        communication: 'Kommunikationsproblem',
        aucun: 'Inga större problem',
      },
    },

    // Q15 : Problem
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Vilket problem vill du lösa först?',
      placeholder: 'Beskriv ditt prioriterade problem...',
    },

    // Q15 : Behov kund (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Vilka är era prioriterade behov?',
      placeholder: 'T.ex.: hitta snabbt, bättre kvalitet, priser...',
    },

    // Q15 : Förbättringar (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Vad vill du förbättra i dina uppdrag?',
      placeholder: 'T.ex.: lön, boende, stöd, stabilitet...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Använder ni ERP/styrningsprogram?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Annat',
        aucun: 'Inget ERP',
      },
    },

    // Q16 : Vilket ERP
    q16_nom_erp: {
      label: 'Vilken programvara/ERP?',
      placeholder: 'T.ex.: SAP, Odoo, egenutvecklad...',
    },

    // Q16 : Urvalskriterier (CLIENT)
    q16_criteres: {
      label: 'Viktigaste urvalskriterier för byråer',
      description: 'Välj dina topp 3',
    },

    // Q16 : Förbättring (WORKER)
    q16_amelioration: {
      label: 'Vad skulle förbättra din bemanningserfarenhet?',
      description: 'Välj alla som gäller',
    },

    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Är ni redo att byta arbetsverktyg?',
      options: {
        oui: 'Ja, inga problem',
        conditions: 'Ja, under vissa villkor',
        difficile: 'Svårt, men öppet',
        non: 'Nej, inte aktuellt',
      },
    },

    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Månadsbudget för en bemanningsplattform',
      options: {
        '0': 'Inte villig att betala',
        '1-100': '€1 - €100/månad',
        '100-500': '€100 - €500/månad',
        '500-1000': '€500 - €1.000/månad',
        '1000+': 'Mer än €1.000/månad',
      },
    },

    // Q17 : Plattform (WORKER)
    q17_plateforme: {
      label: 'Skulle du använda en plattform för att hitta jobb utomlands?',
      options: {
        oui_certainement: 'Ja, definitivt',
        oui_probablement: 'Ja, troligen',
        peut_etre: 'Kanske',
        non: 'Nej',
      },
    },

    // Sektion 4 – YoJob-intresse

    // Q18 : Poäng
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Hur intresserad är du av en europeisk marknadsplats?',
      description: 'Betygsätt från 1 (inte intresserad) till 10 (mycket intresserad)',
    },

    // Q19 : Funktioner (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Mest intressanta funktioner',
      description: 'Välj dina topp 3 prioriteringar',
      options: {
        sipsi: 'Automatisk SIPSI-anmälan',
        a1: 'Hantera A1-intyg',
        conformite: 'Efterlevnadsdashboard',
        alertes: 'Aviseringar & förnyelser',
        documents: 'Centralisering av dokument',
        marketplace: 'Marknadsplats för byråer',
        support: 'Flerspråkigt expertsupport',
        api: 'API-integration (ERP)',
      },
    },

    // Q19 : Funktioner (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Mest intressanta funktioner',
      description: 'Välj allt som intresserar dig',
      options: {
        recherche: 'Söka efter pålitliga byråer',
        comparaison: 'Pris/kvalitet-jämförelse',
        avis: 'Verifierade omdömen',
        conformite: 'Garanti för efterlevnad',
        support: 'Dedikerat stöd',
        facturation: 'Centraliserad fakturering',
        suivi: 'Spårning i realtid',
      },
    },

    // Q19 : Funktioner (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Mest intressanta funktioner',
      description: 'Välj allt som intresserar dig',
      options: {
        recherche: 'Jobbsökning',
        avis: 'Byråbetyg',
        logement: 'Hjälp med boende',
        paiement: 'Säker betalning',
        support: 'Support på mitt språk',
        documents: 'Hjälp med administrativa dokument',
        formation: 'Utbildningsprogram',
      },
    },

    // Q20 : Pris
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Föredragen prismodell',
      options: {
        mensuel: 'Fast månadsabonnemang',
        usage: 'Betala per användning',
        annuel: 'Årsplan (rabatt)',
        gratuit: 'Gratis för arbetare',
      },
    },

    // Q21 : Månadsbudget
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Månadsbudget för en komplett SaaS-lösning',
      options: {
        '0-100': '€0 - €100/månad',
        '100-300': '€100 - €300/månad',
        '300-500': '€300 - €500/månad',
        '500-1000': '€500 - €1.000/månad',
        '1000+': 'Mer än €1.000/månad',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Vill du testa en tidig version (MVP)?',
      options: {
        oui_gratuit: 'Ja, gratis',
        oui_reduc: 'Ja, med rabatt',
        peut_etre: 'Kanske, beror på funktioner',
        non: 'Nej, inte intresserad',
      },
    },

    // Sektion 5 – Framtidsvision

    // Q23 : Roll
    q23_role: {
      label: 'Hur ser du din roll på den europeiska marknaden?',
      options: {
        decideur: 'Slutgiltig beslutsfattare',
        influenceur: 'Påverkare / Rekommendation',
        utilisateur: 'Slutanvändare',
        autre: 'Annat',
      },
    },

    // Q24 : Expansion
    q24_evolution: {
      label: 'Planer för internationell expansion',
      options: {
        oui_rapide: 'Ja, inom 6 månader',
        oui_lent: 'Ja, inom 1-2 år',
        maintien: 'Behålla nuvarande länder',
        reduction: 'Minska internationell närvaro',
      },
    },

    // Q24bis : Ambitioner (WORKER)
    q24_aspirations: {
      label: 'Dina framtida yrkesambitioner',
      placeholder: 'T.ex.: fast anställning, återvända hem, utbildning...',
    },

    // Q25 : Behov
    q25_besoins: {
      label: 'Andra behov eller kommentarer',
      placeholder: 'Dela annan feedback eller behov...',
    },

    // Sektion 6 – Kontakt

    // Q26 : Telefon
    q26_phone: {
      label: 'Professionellt telefonnummer',
      placeholder: '+46 70 123 45 67',
    },

    // Q27 : Förnamn
    q27_firstname: {
      label: 'Förnamn',
      placeholder: 'Ditt förnamn',
    },

    // Q28 : Efternamn
    q28_lastname: {
      label: 'Efternamn',
      placeholder: 'Ditt efternamn',
    },

    // Q29 : Organisationsnummer
    q29_siret: {
      label: 'Organisationsnummer (valfritt)',
      placeholder: '123456-7890',
      description: 'För berikning via Bolagsverket',
    },

    // Q30 : E-post
    email: {
      label: 'Din e-post',
      placeholder: 'din.email@exempel.se',
    },

    // Q31 : Kontaktgodkännande
    autorise_contact: {
      label: 'Jag accepterar att bli kontaktad igen',
    },

    // Q32 : Studienrapport
    souhaite_rapport: {
      label: 'Jag vill få studiens rapport',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Swedish (SV) Complete Translation',
    _locale: 'sv-SE',
    _completeness: 100,
  },
};
