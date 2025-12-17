/**
 * 🇱🇻 LATVIEŠU TULKOJUMI (LV)
 *
 * Pilns latviešu tulkojums
 * Bāze: en.ts (tāda pati struktūra)
 *
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const lv: TranslationBundle = {
  // Mantot trūkstošās atslēgas no FR
  ...fr,

  // Navigācija
  nav: {
    section1: 'Profils',
    section2: 'Pieredze',
    section3: 'Vajadzības',
    section4: 'Interese',
    section5: 'Vīzija',
    section6: 'Kontakti',
    dashboard: 'Vadības panelis',
    back_to_site: 'Atpakaļ uz vietni',
  },

  dashboard: {
    title: 'YoJob',
    subtitle: 'Vadības panelis',
    tabs: {
      overview: 'Pārskats',
      results: 'Rezultāti',
      questions: 'Jautājumi',
      translations: 'Tulkojumi',
      export: 'Eksports',
      integrations: 'Integrācijas',
      cms: 'Formas CMS',
      settings: 'Iestatījumi',
      prospects: 'Potenciālie klienti',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Jauns',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Iziet',
      back_to_survey: 'Atpakaļ uz aptauju',
      toggle_sidebar: 'Sakļaut/Izvērst',
    },
    user: {
      welcome: 'Laipni lūdzam',
      logged_in_as: 'Pieteicies kā',
    },
  },

  // Sadaļas
  section: {
    1: { title: 'Aģentūras profils', description: '4 jautājumi • 2 min' },
    2: { title: 'Norīkošana', description: '7 jautājumi • 3 min' },
    3: { title: 'Vajadzības', description: '6 jautājumi • 2 min' },
    4: { title: 'YoJob interese', description: '6 jautājumi • 3 min' },
    5: { title: 'Nākotnes vīzija', description: '2 jautājumi • 1 min' },
    6: { title: 'Kontakti', description: '1 jautājums • 1 min' },
  },

  // Galvene
  header: {
    title: 'YoJob',
    subtitle: 'Tirgus pētījums',
  },

  // Hero
  hero: {
    title: 'Tirgus aptauja',
    subtitle: 'Palīdziet mums labāk izprast jūsu vajadzības',
    description:
      'Aptauja aizņem apmēram 10–15 minūtes. Jūsu atbildes palīdzēs izveidot risinājumu, kas pielāgots jūsu nozarei.',
    cta_start: 'Sākt aptauju',
    cta_dashboard: 'Atvērt vadības paneli',
    badge: 'Eiropas tirgus pētījums',
    stat: {
      countries: '27 Eiropas valstis',
      questions: 'jautājumi',
      benchmark: 'Saņemiet 2025. gada etalonu',
      insights: 'Ekskluzīvi tirgus ieskati',
      opportunities: 'Prioritāra piekļuve darbavietām',
    },
    footer: {
      info: 'jautājumi • Anonīmi • VDAR atbilstība',
      anonymous: 'Anonīmi',
      gdpr: 'VDAR atbilstība',
    },
  },

  // Respondenta veids
  respondent_type: {
    title: 'Kas jūs esat?',
    subtitle: 'Izvēlieties savu profilu, lai personalizētu jautājumus',
    agency: 'Paglaba aģentūra',
    agency_description: 'Jūs esat pagaidu vai norīkošanas aģentūra',
    client: 'Klienta uzņēmums',
    client_description: 'Jūs esat uzņēmums, kas nodarbina pagaidu darbiniekus',
    worker: 'Pagaidu darbinieks',
    worker_description: 'Jūs esat pagaidu vai norīkotais darbinieks',
  },

  // Profila izvēle
  selector: {
    badge: '🌍 Eiropas tirgus pētījums – Personāla atlase un pagaidu darbs',
    title: 'Dalieties savā pieredzē Eiropas tirgū',
    subtitle: 'Izvēlieties profilu un sāciet aptauju',
    cta: 'Klikšķiniet, lai sāktu →',
    trust: {
      secure: 'Droši dati',
      languages: '{count} pieejamās valodas',
      languages_suffix: 'pieejamās valodas',
      anonymous: 'Anonīmi un konfidenciāli',
    },
  },

  // Kartīšu profili
  respondent: {
    agency: {
      label: 'Paglaba aģentūra',
      description:
        'Jūs esat Eiropas pagaidu nodarbinātības aģentūra. Dalieties norīkošanas pieredzē.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klienta uzņēmums',
      description: 'Jūs nodarbināt pagaidu darbiniekus. Dalieties vajadzībās un gaidās.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Pagaidu darbinieks',
      description: 'Jūs strādājat kā pagaidu darbinieks. Dalieties praktiskajā pieredzē.',
      estimatedTime: '10 min',
    },
  },

  // Pogas
  button: {
    previous: 'Iepriekšējais',
    next: 'Nākamais',
    submit: 'Iesniegt atbildes',
    submitting: 'Notiek iesniegšana...',
    back: 'Atpakaļ',
    start: 'Sākt',
  },

  // Apstiprinājums
  confirmation: {
    title: 'Paldies par dalību! 🙏',
    subtitle: 'Jūsu atbildes ir saglabātas',
    message:
      'Mēs analizējam visus atbildes, lai izveidotu risinājumu, kas perfekti atbilst jūsu vajadzībām.',
    cta_back: 'Atpakaļ uz sākumlapu',
    cta_dashboard: 'Skatīt vadības paneli',
    description: 'Jūsu viedoklis ir vērtīgs un palīdz veidot YoJob nākotni.',
    cta: 'Atpakaļ uz YoJob tīmekļa vietni',
    
    reward: {
      report: {
        title: 'Ziņojums "Tendences 2025"',
        description: 'Nosūtīts 3 nedēļu laikā'
      },
      earlyaccess: {
        title: 'Agrīna piekļuve YoJob',
        description: 'Top 100 dalībnieki'
      }
    },
    
    thanks: {
      title: '🎁 Kā pateicība par dalību:',
      item1: '• Ekskluzīvs ziņojums "Norīkošanas tendences 2025"',
      item2: '• Top 100 dalībnieki = 3 mēneši bezmaksas piekļuves YoJob (vērtība 500€)'
    }
  },

  // Progress
  progress: {
    section: 'Sadaļa',
    question: 'Jautājums',
    section_completed: 'Sadaļa pabeigta',
    questions_remaining: '{count} jautājumi atlikuši',
    time_remaining: 'Apmēram {time} atlicis',
  },

  // Kopīgie tulkojumi
  common: {
    oui: 'Jā',
    non: 'Nē',
    autre: 'Cits',
    loading: 'Ielādē...',
    submit: 'Iesniegt',
    next: 'Nākamais',
    previous: 'Iepriekšējais',
    skip: 'Izlaist',
    save: 'Saglabāt',
    cancel: 'Atcelt',
    close: 'Aizvērt',
    required: 'Obligāti',
    optional: 'Nav obligāti',
    error: 'Kļūda',
    success: 'Veiksmīgi',
    completed: 'Pabeigts',
    inProgress: 'Procesā',
    notStarted: 'Nav sākts',
    profileAgency: 'Paglaba aģentūra',
    profileClient: 'Klienta uzņēmums',
    profileWorker: 'Pagaidu darbinieks',
    score_not_interested: 'Nav ieinteresēts',
    score_very_interested: 'Ļoti ieinteresēts',
  },

  // Nozares
  sectors: {
    btp: 'Būvniecība',
    industrie: 'Ražošana',
    logistique: 'Loģistika',
    hotellerie: 'Viesmīlība',
    sante: 'Veselība',
    agriculture: 'Lauksaimniecība',
    tech: 'Tehnoloģijas/IT',
    autres: 'Citi',
  },

  // Jautājumi – pārņem no FR, pēc tam pārraksta uz LV
  questions: {
    ...fr.questions,

    // Q1 : Nosaukums
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nosaukums',
      placeholder: 'Organizācijas nosaukums vai jūsu pilnais vārds',
    },

    // Q2 : Dibināšanas gads (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Dibināšanas gads',
      placeholder: '2015',
    },

    // Q2 : Dibināšanas gads (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Jūsu uzņēmuma dibināšanas gads',
      placeholder: '2010',
    },

    // Q2 : Pilsonība (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Jūsu pilsonība',
      placeholder: 'Piem.: poļu, rumāņu...',
    },

    // Q3 : Organizācijas lielums (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organizācijas lielums',
      options: {
        '1-9': '1-9 darbinieki',
        '10-49': '10-49 darbinieki',
        '50-249': '50-249 darbinieki',
        '250+': '250+ darbinieki',
      },
    },

    // Q3 : Pieredze (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Pagaidu darba pieredze (gadi)',
      options: {
        '<1': 'Mazāk nekā 1 gads',
        '1-3': '1-3 gadi',
        '3-5': '3-5 gadi',
        '5-10': '5-10 gadi',
        '10+': 'Vairāk nekā 10 gadi',
      },
    },

    // Q4 : Nozares
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Galvenās nozares',
      description: 'Izvēlieties visas atbilstošās nozares',
    },

    // Q4 : Profesijas (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Jūsu profesijas',
      description: 'Izvēlieties visas savas profesijas',
    },

    // Q5 : Valsts (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Jūsu aģentūras valsts',
      placeholder: 'Piem.: Polija',
    },

    // Q5 : Lokācija (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Valsts, kur darbojas jūsu uzņēmums',
      placeholder: 'Piem.: Francija',
    },

    // Q5 : Darba valstis (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Valstis, kur strādājāt kā pagaidu darbinieks',
      placeholder: 'Piem.: Francija, Vācija, Beļģija...',
    },

    // Q6 : Apjoms (AGENCY)
    q6_volume: {
      label: 'Gada norīkoto darbinieku skaits',
      options: {
        '0': 'Pagaidām nav',
        '1-50': '1-50 darbinieki',
        '51-200': '51-200 darbinieki',
        '201-500': '201-500 darbinieki',
        '500+': 'Vairāk nekā 500',
      },
    },

    // Q6 : Apjoms klientam (CLIENT)
    q6_volume_client: {
      label: 'Cik pagaidu darbiniekus nodarbina gadā?',
      options: {
        '0': 'Pašlaik nevienu',
        '1-10': '1-10 cilvēki',
        '11-50': '11-50 cilvēki',
        '51-200': '51-200 cilvēki',
        '200+': '200+ cilvēki',
      },
    },

    // Q6 : Biežums (WORKER)
    q6_frequence: {
      label: 'Cik bieži strādājat kā pagaidu darbinieks?',
      options: {
        permanent: 'Regulāri (visu gadu)',
        saisonnier: 'Sezonāli (noteiktos mēnešos)',
        occasionnel: 'Gadījuma rakstura',
        jamais: 'Vēl nekad (meklēju)',
      },
    },

    // Q7 : Izcelsme (AGENCY)
    q7_origine: {
      label: 'No kurienes nāk jūsu norīkotie darbinieki?',
      placeholder: 'Piem.: Polija, Rumānija, Bulgārija...',
    },

    // Q8 : Galamērķi (AGENCY)
    q8_destinations: {
      label: 'Galamērķa valstis',
      description: 'Valstis, uz kurām norīkojat darbiniekus',
      placeholder: 'Piem.: Francija, Vācija, Beļģija, Nīderlande...',
    },

    // Q8 : Pilsonības (CLIENT)
    q8_nationalites: {
      label: 'Pagaidu darbinieku pilsonības, kurus nodarbināt',
      placeholder: 'Piem.: poļu, rumāņu, bulgāru...',
    },

    // Q9 : Izaicinājums (AGENCY)
    q9_defi: {
      label: 'Galvenais izaicinājums starptautiskā norīkošanā',
      options: {
        admin: 'Administratīvs sarežģītums (A1, SIPSI...)',
        conformite: 'Prasību ievērošana vairākās valstīs',
        cout: 'Vadības izmaksas un laiks',
        langues: 'Valodu barjeras',
        autre: 'Cits',
      },
    },

    // Q9 : Izaicinājums klientam (CLIENT)
    q9_defi_client: {
      label: 'Galvenais izaicinājums ar Eiropas pagaidu darbiniekiem',
      options: {
        trouver: 'Uzticamu aģentūru atrašana',
        conformite: 'Juridiskā atbilstība',
        qualite: 'Kvalitāte/prasmes',
        cout: 'Pārāk augstas izmaksas',
        langues: 'Komunikācija / Valodas',
        autre: 'Cits',
      },
    },

    // Q9 : Izaicinājums darbiniekam (WORKER)
    q9_defi_worker: {
      label: 'Galvenais izaicinājums jūsu uzdevumos',
      options: {
        trouver: 'Atrast uzdevumus',
        admin: 'Administratīvie dokumenti',
        logement: 'Mājokļa nodrošinājums',
        langue: 'Vietējā valoda',
        paiement: 'Maksājumi / Alga',
        autre: 'Cits',
      },
    },

    // Q9 : Cits
    q9_autre: {
      label: 'Lūdzu, norādiet savu galveno izaicinājumu',
      placeholder: 'Aprakstiet savu galveno izaicinājumu...',
    },

    // Q10 : Pārvaldība (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Kā šobrīd pārvaldāt norīkojuma deklarācijas?',
      options: {
        interne: 'Iekšējā komanda',
        externe: 'Ārējais pakalpojumu sniedzējs',
        mixte: 'Kombinēta pieeja',
        manuel: 'Manuāla pārvaldība',
        logiciel: 'Specializēta programmatūra',
      },
    },

    // Q10 : Aģentūras (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Cik pagaidu nodarbinātības aģentūras izmantojat?',
      options: {
        '0': 'Neviena',
        '1': '1 aģentūru',
        '2-3': '2-3 aģentūras',
        '4-10': '4-10 aģentūras',
        '10+': 'Vairāk nekā 10',
      },
    },

    // Q10 : Process (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kā pieņemat pagaidu darbiniekus?',
      options: {
        agence_fr: 'Francijas pagaidu aģentūras',
        agence_euro: 'Eiropas pagaidu aģentūras',
        direct: 'Tiešā pieņemšana',
        mixte: 'Kombinēti',
      },
    },

    // Q10 : Aģentūra (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Kā atrodat pagaidu darbu?',
      options: {
        agence: 'Caur pagaidu aģentūrām',
        bouche: 'Mutiska rekomendācija',
        internet: 'Tiešsaistes darba portāli',
        direct: 'Tieša pieteikšanās',
      },
    },

    // Q10ter : Izmantotās aģentūras (WORKER)
    q10_agences_worker: {
      label: 'Ar cik aģentūrām sadarbojaties?',
      options: {
        '1': 'Tikai 1 aģentūra',
        '2-3': '2-3 aģentūras',
        '4-10': '4-10 aģentūras',
        '10+': 'Vairāk nekā 10',
      },
    },

    // Q11 : Incidenti (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Vai esat saskārušies ar sodiem vai incidentiem saistībā ar norīkojuma atbilstību?',
      description: 'Jūsu atbilde paliks anonīma',
      options: {
        jamais: 'Nē, nekad',
        rarement: 'Reti (1-2 reizes)',
        parfois: 'Dažreiz (3-5 reizes)',
        souvent: 'Bieži (6+ reizes)',
      },
    },

    // Q11 : Atbilstība (CLIENT)
    q11_conformite: {
      label: 'Vai pārbaudāt pagaidu aģentūru juridisko atbilstību?',
      options: {
        oui_systematique: 'Jā, sistemātiski',
        oui_parfois: 'Jā, dažreiz',
        non: 'Nē',
        ne_sait_pas: 'Nezinu',
      },
    },

    // Q11 : Problēmas (WORKER)
    q11_problemes: {
      label: 'Vai esat piedzīvojuši problēmas ar pagaidu darbu ārzemēs?',
      options: {
        oui_graves: 'Jā, nopietnas problēmas',
        oui_mineurs: 'Jā, nelielas problēmas',
        non: 'Nē',
      },
    },

    // Q12 : Budžets (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Gada budžets norīkojuma administratīvai pārvaldībai',
      options: {
        '0-5k': '€0-5 000 / gadā',
        '5-15k': '€5 000-15 000 / gadā',
        '15-30k': '€15 000-30 000 / gadā',
        '30k+': '€30 000+ / gadā',
        inconnu: 'Nezinu',
      },
    },

    // Q12 : Budžets klientam (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Gada budžets pagaidu darbam',
      options: {
        '0-50k': '€0 - €50 000',
        '50-200k': '€50 000 - €200 000',
        '200-500k': '€200 000 - €500 000',
        '500k+': '€500 000+',
        'inconnu': 'Nezinu',
      },
    },

    // Q12 : Apmierinātība (CLIENT)
    q12_satisfaction: {
      label: 'Apmierinātība ar pašreizējām pagaidu aģentūrām',
      options: {
        tres_satisfait: 'Ļoti apmierināts',
        satisfait: 'Apmierināts',
        neutre: 'Neitrāls',
        insatisfait: 'Neapmierināts',
      },
    },

    // Q12 : Alga (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Vai esat apmierināts ar pagaidu darba algu?',
      options: {
        '<1500': 'Mazāk nekā €1 500',
        '1500-2500': '€1 500 - €2 500',
        '2500-3500': '€2 500 - €3 500',
        '3500+': '€3 500+',
      },
    },

    // Q13 : Zaudētie ieņēmumi (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Kāda ieņēmumu daļa zaudēta administratīva sarežģītuma dēļ?',
      options: {
        'non': 'Nē, ne īsti',
        'faible': 'Jā, neliela (< 5% ieņēmumu)',
        'moyen': 'Jā, vidēja (5-15% ieņēmumu)',
        'important': 'Jā, ievērojama (> 15% ieņēmumu)',
      },
    },

    // Q13 : Apmierinātība (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Apmierinātība ar jūsu pašreizējām pagaidu aģentūrām',
      options: {
        'tres_satisfait': 'Ļoti apmierināts',
        'satisfait': 'Apmierināts',
        'neutre': 'Neitrāls',
        'insatisfait': 'Neapmierināts',
        'tres_insatisfait': 'Ļoti neapmierināts',
      },
    },

    // Q13 : Apmierinātība darbiniekam (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Apmierinātība ar jūsu pašreizējām pagaidu aģentūrām',
      options: {
        'tres_satisfait': 'Ļoti apmierināts',
        'satisfait': 'Apmierināts',
        'neutre': 'Neitrāls',
        'insatisfait': 'Neapmierināts',
        'tres_insatisfait': 'Ļoti neapmierināts',
      },
    },

    // Q14 : Riska faktori (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Galvenās bažas',
      description: 'Izvēlieties visas piemērojamās opcijas',
      options: {
        amendes: 'Sodi un sankcijas',
        reputation: 'Reputācija / Imidžs',
        penal: 'Kriminālatbildība',
        delais: 'Uzdevumu kavējumi',
        clients: 'Klientu zudums',
        aucun: 'Nav būtiska riska',
      },
    },

    // Q14 : Vajadzības (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Galvenās vajadzības',
      description: 'Izvēlieties visas piemērojamās opcijas',
      options: {
        fiabilite: 'Atrast uzticamas aģentūras',
        conformite: 'Juridiskā atbilstība',
        qualite: 'Kvalitāte/prasmes',
        cout: 'Izmaksas',
        disponibilite: 'Kandidātu pieejamība',
        aucun: 'Nav būtiskas vajadzības',
      },
    },

    // Q14 : Cerības (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Cerības par pagaidu darbu ārzemēs',
      description: 'Izvēlieties visas piemērojamās opcijas',
      options: {
        salaire: 'Labāka alga',
        conditions: 'Labāki darba apstākļi',
        stabilite: 'Stabilitāte',
        experience: 'Starptautiskā pieredze',
        logement: 'Palīdzība ar mājokli',
        aucun: 'Nav īpašu cerību',
      },
    },

    // Q14_risques_client
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Galvenās bažas',
      description: 'Izvēlieties visas piemērojamās opcijas',
      options: {
        conformite: 'Juridiskā atbilstība',
        qualite: 'Kvalitāte/prasmes',
        communication: 'Komunikācija/Valodas',
        cout: 'Neparedzētas izmaksas',
        disponibilite: 'Kandidātu pieejamība',
        aucun: 'Nav būtisku bažu',
      },
    },

    // Q14_risques_worker
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Ar kādām problēmām visbiežāk saskaraties?',
      description: 'Izvēlieties visas piemērojamās opcijas',
      options: {
        paiement: 'Maksājumu kavējumi',
        conditions: 'Slikti apstākļi',
        contrat: 'Netiek ievēroti līgumi',
        logement: 'Nepiemērots mājoklis',
        communication: 'Komunikācijas problēmas',
        aucun: 'Nav būtisku problēmu',
      },
    },

    // Q15 : Problēma
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Kuru problēmu vēlētos atrisināt vispirms?',
      placeholder: 'Aprakstiet savu prioritāro problēmu...',
    },

    // Q15 : Vajadzības klientam (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Kādas ir jūsu prioritārās vajadzības?',
      placeholder: 'Piem.: Atrast ātri, labāka kvalitāte, cenas...',
    },

    // Q15 : Uzlabojumi (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Ko vēlētos uzlabot savos uzdevumos?',
      placeholder: 'Piem.: Alga, mājoklis, atbalsts, stabilitāte...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Vai izmantojat ERP/pārvaldības programmatūru?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Cita',
        aucun: 'Nav ERP',
      },
    },

    // Q16 : ERP nosaukums
    q16_nom_erp: {
      label: 'Kuru programmatūru/ERP izmantojat?',
      placeholder: 'Piem.: SAP, Odoo, individuāla...',
    },

    // Q16 : Kritēriji (CLIENT)
    q16_criteres: {
      label: 'Galvenie atlases kritēriji pagaidu aģentūrām',
      description: 'Izvēlieties savus top 3',
    },

    // Q16 : Uzlabojumi (WORKER)
    q16_amelioration: {
      label: 'Kas uzlabotu jūsu pagaidu darba pieredzi?',
      description: 'Izvēlieties visas piemērojamās opcijas',
    },

    // Q17 : Migrācija (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Vai esat gatavi mainīt savus darba rīkus?',
      options: {
        oui: 'Jā, bez problēmām',
        conditions: 'Jā, ar nosacījumiem',
        difficile: 'Grūti, bet atvērti',
        non: 'Nē, nav iespējams',
      },
    },

    // Q17 : Budžets (CLIENT)
    q17_budget: {
      label: 'Mēneša budžets pagaidu darbinieku atlases platformai',
      options: {
        '0': 'Neplānoju maksāt',
        '1-100': '€1 - €100/mēn',
        '100-500': '€100 - €500/mēn',
        '500-1000': '€500 - €1 000/mēn',
        '1000+': 'Vairāk nekā €1 000/mēn',
      },
    },

    // Q17 : Platforma (WORKER)
    q17_plateforme: {
      label: 'Vai izmantotu platformu pagaidu darba atrašanai ārzemēs?',
      options: {
        oui_certainement: 'Jā, noteikti',
        oui_probablement: 'Jā, iespējams',
        peut_etre: 'Varbūt',
        non: 'Nē',
      },
    },

    // Q18 : Vērtējums
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Cik ļoti interesē Eiropas norīkojumu tirgus?',
      description: 'Novērtējiet no 1 (neinteresē) līdz 10 (ļoti interesē)',
    },

    // Q19 : Funkcijas (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Interesantākās funkcijas',
      description: 'Izvēlieties savas top 3 prioritātes',
      options: {
        sipsi: 'Automātiska SIPSI deklarācija',
        a1: 'A1 sertifikātu pārvaldība',
        conformite: 'Atbilstības panelis',
        alertes: 'Paziņojumi un atjaunošana',
        documents: 'Dokumentu centralizācija',
        marketplace: 'Aģentūru tirgus',
        support: 'Daugiem valodām atbalsts',
        api: 'API integrācija (ERP)',
      },
    },

    // Q19 : Funkcijas (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Interesantākās funkcijas',
      description: 'Izvēlieties visas, kas interesē',
      options: {
        recherche: 'Uzticamu aģentūru meklēšana',
        comparaison: 'Cena/kvalitāte salīdzinājums',
        avis: 'Pārbaudītas atsauksmes',
        conformite: 'Atbilstības garantija',
        support: 'Dedikēts atbalsts',
        facturation: 'Centralizēta norēķinu sistēma',
        suivi: 'Izsekošana reāllaikā',
      },
    },

    // Q19 : Funkcijas (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Interesantākās funkcijas',
      description: 'Izvēlieties visas, kas interesē',
      options: {
        recherche: 'Darba meklēšana',
        avis: 'Aģentūru atsauksmes',
        logement: 'Palīdzība ar mājokli',
        paiement: 'Droši maksājumi',
        support: 'Atbalsts manā valodā',
        documents: 'Palīdzība ar dokumentiem',
        formation: 'Apmācību programmas',
      },
    },

    // Q20 : Cena
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Vēlamais cenu modelis',
      options: {
        mensuel: 'Fiksēts mēneša abonements',
        usage: 'Maksāt pēc patēriņa',
        annuel: 'Gada plāns (atlaide)',
        gratuit: 'Bezmaksas darbiniekiem',
      },
    },

    // Q21 : Mēneša budžets
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Mēneša budžets pilnam SaaS risinājumam',
      options: {
        '0-100': '€0 - €100/mēn',
        '100-300': '€100 - €300/mēn',
        '300-500': '€300 - €500/mēn',
        '500-1000': '€500 - €1 000/mēn',
        '1000+': 'Vairāk nekā €1 000/mēn',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Vai vēlaties testēt agrīnu versiju (MVP)?',
      options: {
        oui_gratuit: 'Jā, bez maksas',
        oui_reduc: 'Jā, ar atlaidi',
        peut_etre: 'Varbūt, atkarīgs no funkcijām',
        non: 'Nē, neinteresē',
      },
    },

    // Q23 : Loma
    q23_role: {
      label: 'Kā redzat savu lomu Eiropas tirgū?',
      options: {
        decideur: 'Gala lēmuma pieņēmējs',
        influenceur: 'Ietekmētājs / Ieteicējs',
        utilisateur: 'Gala lietotājs',
        autre: 'Cits',
      },
    },

    // Q24 : Attīstība
    q24_evolution: {
      label: 'Jūsu starptautiskās paplašināšanās plāni',
      options: {
        oui_rapide: 'Jā, 6 mēnešu laikā',
        oui_lent: 'Jā, 1-2 gadu laikā',
        maintien: 'Saglabāt pašreizējās valstis',
        reduction: 'Samazināt starptautisko apjomu',
      },
    },

    // Q24bis : Profesionālās ambīcijas (WORKER)
    q24_aspirations: {
      label: 'Jūsu nākotnes profesionālās ambīcijas',
      placeholder: 'Piem.: pastāvīgs darbs, atgriešanās valstī, apmācība...',
    },

    // Q25 : Citi vajadzības vai komentāri
    q25_besoins: {
      label: 'Citas vajadzības vai komentāri',
      placeholder: 'Dalieties ar citu atgriezenisko saiti vai vajadzībām...',
    },

    // Kontakti
    q26_phone: {
      label: 'Profesionālais tālrunis',
      placeholder: '+371 20 123 456',
    },

    q27_firstname: {
      label: 'Vārds',
      placeholder: 'Jūsu vārds',
    },

    q28_lastname: {
      label: 'Uzvārds',
      placeholder: 'Jūsu uzvārds',
    },

    q29_siret: {
      label: 'Uzņēmuma reģistrācijas nr. (neobligāti)',
      placeholder: '12345678',
      description: 'Datu bagātināšanai caur reģistru',
    },

    email: {
      label: 'Jūsu e-pasts',
      placeholder: 'jusu.epasts@piemers.lv',
    },

    autorise_contact: {
      label: 'Piekrītu, ka ar mani sazinās vēlreiz',
    },

    souhaite_rapport: {
      label: 'Vēlos saņemt pētījuma ziņojumu',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Latvian (LV) Complete Translation',
    _locale: 'lv-LV',
    _completeness: 100,
  },
};