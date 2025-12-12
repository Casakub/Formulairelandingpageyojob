/**
 * 🇱🇻 TRADUCTIONS LETTONES (LV)
 * 
 * Traductions complètes pour le letton
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const lv: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
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
      cms: 'CMS veidlapa',
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
  
  // Sections
  section: {
    1: {
      title: 'Profils',
      description: '4 jautājumi • 2 min',
    },
    2: {
      title: 'Pieredze',
      description: '7 jautājumi • 3 min',
    },
    3: {
      title: 'Vajadzības',
      description: '6 jautājumi • 2 min',
    },
    4: {
      title: 'Interese par YoJob',
      description: '6 jautājumi • 3 min',
    },
    5: {
      title: 'Nākotnes vīzija',
      description: '2 jautājumi • 1 min',
    },
    6: {
      title: 'Kontakti',
      description: '1 jautājums • 1 min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Jūsu uzņēmuma profils',
        description: 'Pastāstiet mums par savu aģentūru un kompetenci',
      },
      client: {
        title: '📋 Jūsu uzņēmuma profils',
        description: 'Pastāstiet mums par savu uzņēmumu un darbā pieņemšanas vajadzībām',
      },
      worker: {
        title: '📋 Jūsu profils',
        description: 'Pastāstiet mums par savu profesionālo pieredzi',
      },
    },
    2: {
      agency: {
        title: '💼 Norīkošanas darbība',
        description: 'Jūsu pieredze darbinieku norīkošanā',
      },
      client: {
        title: '💼 Jūsu darbā pieņemšanas pieredze',
        description: 'Jūsu pašreizējā darbā pieņemšana un pagaidu darbs',
      },
      worker: {
        title: '💼 Jūsu pagaidu darba pieredze',
        description: 'Jūsu ceļš kā aģentūras darbinieka',
      },
    },
    3: {
      agency: {
        title: '🎯 Vajadzības un rīki',
        description: 'Jūsu izaicinājumi un pašreizējie risinājumi',
      },
      client: {
        title: '🎯 Jūsu pašreizējās vajadzības',
        description: 'Izaicinājumi un cerības darbā pieņemšanā',
      },
      worker: {
        title: '🎯 Jūsu cerības',
        description: 'Kas jums ir svarīgi uzdevumā',
      },
    },
    4: {
      agency: {
        title: '⭐ Interese par Eiropas platformu',
        description: 'Atklājiet mūsu inovatīvā tirgus vīziju',
      },
      client: {
        title: '⭐ Interese par Eiropas platformu',
        description: 'Inovatīvs risinājums jūsu vajadzībām',
      },
      worker: {
        title: '⭐ Jūsu interese par platformu',
        description: 'Platforma vieglai uzdevumu meklēšanai',
      },
    },
    5: {
      agency: {
        title: '🔮 Nākotnes vīzija',
        description: 'Budžets un attīstības perspektīvas',
      },
      client: {
        title: '🔮 Jūsu nākotnes prioritātes',
        description: 'Budžets un darbā pieņemšanas stratēģija',
      },
      worker: {
        title: '🔮 Jūsu mērķi',
        description: 'Jūsu gaidāmie profesionālie projekti',
      },
    },
    6: {
      agency: {
        title: '📧 Saglabājiet kontaktu',
        description: 'Saņemiet pētījuma rezultātus un esiet informēts',
      },
      client: {
        title: '📧 Saglabājiet kontaktu',
        description: 'Saņemiet rezultātus un mūsu ieteikumus',
      },
      worker: {
        title: '📧 Saglabājiet kontaktu',
        description: 'Saņemiet rezultātus un iespējas',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Tirgus pētījums',
  },
  
  // Hero
  hero: {
    title: 'Tirgus aptauja',
    subtitle: 'Palīdziet mums labāk saprast jūsu vajadzības',
    description: 'Šī aptauja ilgst aptuveni 10-15 minūtes. Jūsu atbildes palīdzēs mums izveidot risinājumu, kas pielāgots jūsu nozarei.',
    cta_start: 'Sākt aptauju',
    cta_dashboard: 'Atvērt vadības paneli',
    badge: 'Eiropas tirgus pētījums',
    stat: {
      countries: '27 Eiropas valstis',
      questions: 'jautājumi',
      benchmark: 'Iegūstiet 2025. gada etalonu',
      insights: 'Ekskluzīvi tirgus ieskati',
      opportunities: 'Prioritāra piekļuve darbiem',
    },
    footer: {
      info: 'jautājumi • Anonīmi • Atbilst VDAR',
      anonymous: 'Anonīmi',
      gdpr: 'Atbilst VDAR',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Kas jūs esat?',
    subtitle: 'Izvēlieties savu profilu jautājumu pielāgošanai',
    agency: 'Nodarbinātības aģentūra',
    agency_description: 'Jūs esat pagaidu nodarbinātības vai norīkošanas aģentūra',
    client: 'Klients',
    client_description: 'Jūs esat uzņēmums, kas nodarbina aģentūras darbiniekus',
    worker: 'Aģentūras darbinieks',
    worker_description: 'Jūs esat aģentūras vai norīkots darbinieks',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Eiropas tirgus pētījums - Nodarbinātība un Pagaidu darbs',
    title: 'Dalieties ar savu pieredzi Eiropas tirgū',
    subtitle: 'Izvēlieties savu profilu aptaujas sākšanai',
    cta: 'Noklikšķiniet, lai sāktu →',
    trust: {
      secure: 'Drošie dati',
      languages: '{count} pieejamās valodas',
      languages_suffix: 'pieejamās valodas',
      anonymous: 'Anonīmi un konfidenciāli',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Nodarbinātības aģentūra',
      description: 'Jūs esat Eiropas pagaidu nodarbinātības aģentūra. Dalieties ar savu norīkošanas pieredzi.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klients',
      description: 'Jūs nodarbināt aģentūras darbiniekus. Dalieties ar savām vajadzībām un cerībām.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Aģentūras darbinieks',
      description: 'Jūs strādājat kā aģentūras darbinieks. Dalieties ar savu pieredzi no vietas.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Iepriekšējais',
    next: 'Nākamais',
    submit: 'Nosūtīt atbildes',
    submitting: 'Nosūta...',
    back: 'Atpakaļ',
    start: 'Sākt',
  },
  
  // Confirmation
  confirmation: {
    title: 'Paldies par piedalīšanos!',
    subtitle: 'Jūsu atbildes ir veiksmīgi saglabātas',
    message: 'Pašlaik analizējam visas atbildes, lai izveidotu risinājumu, kas pilnībā pielāgots jūsu vajadzībām.',
    cta_back: 'Atpakaļ uz sākumlapu',
    cta_dashboard: 'Rādīt vadības paneli',
  },
  
  // Progress
  progress: {
    section: 'Sadaļa',
    question: 'Jautājums',
    section_completed: 'Sadaļa pabeigta',
    questions_remaining: '{count} atlikušo jautājumu',
    time_remaining: 'Aptuveni {time} atlicis',
  },
  
  // Common translations
  common: {
    oui: 'Jā',
    non: 'Nē',
    autre: 'Cits',
    loading: 'Ielādē...',
    submit: 'Nosūtīt',
    next: 'Nākamais',
    previous: 'Iepriekšējais',
    skip: 'Izlaist',
    save: 'Saglabāt',
    cancel: 'Atcelt',
    close: 'Aizvērt',
    required: 'Obligāts',
    optional: 'Neobligāts',
    error: 'Kļūda',
    success: 'Panākums',
    completed: 'Pabeigts',
    inProgress: 'Procesā',
    notStarted: 'Nav sākts',
    profileAgency: 'Nodarbinātības aģentūra',
    profileClient: 'Klients',
    profileWorker: 'Aģentūras darbinieks',
  },
  
  // Sectors
  sectors: {
    btp: 'Celtniecība',
    industrie: 'Rūpniecība',
    logistique: 'Loģistika',
    hotellerie: 'Viesmīlība',
    sante: 'Veselības aprūpe',
    agriculture: 'Lauksaimniecība',
    tech: 'Tehnoloģijas/IT',
    autres: 'Cits',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions LV
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nosaukums',
      placeholder: 'Organizācijas nosaukums vai jūsu pilnais vārds',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Dibināšanas gads',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Jūsu uzņēmuma dibināšanas gads',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Jūsu pilsonība',
      placeholder: 'piemēram: poļu, rumāņu...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
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
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Pagaidu darba pieredzes gadi',
      options: {
        '<1': 'Mazāk par 1 gadu',
        '1-3': '1-3 gadi',
        '3-5': '3-5 gadi',
        '5-10': '5-10 gadi',
        '10+': 'Vairāk nekā 10 gadi',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Galvenie sektori',
      description: 'Izvēlieties visus atbilstošos sektorus',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Jūsu profesijas',
      description: 'Izvēlieties visas savas profesijas',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Jūsu aģentūras valsts',
      placeholder: 'piemēram: Polija',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Valsts, kurā darbojas jūsu uzņēmums',
      placeholder: 'piemēram: Francija',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Valstis, kurās esat strādājis kā aģentūras darbinieks',
      placeholder: 'piemēram: Francija, Vācija, Beļģija...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Gada norīkoto darbinieku apjoms',
      options: {
        '0': 'Vēl neviens',
        '1-50': '1-50 darbinieki',
        '51-200': '51-200 darbinieki',
        '201-500': '201-500 darbinieki',
        '500+': 'Vairāk nekā 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Cik aģentūras darbiniekus nodarbināt gadā?',
      options: {
        '0': 'Pašlaik nevienu',
        '1-10': '1-10 cilvēki',
        '11-50': '11-50 cilvēki',
        '51-200': '51-200 cilvēki',
        '200+': '200+ cilvēki',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Cik bieži strādājat kā aģentūras darbinieks?',
      options: {
        permanent: 'Regulāri (visu gadu)',
        saisonnier: 'Sezonāli (noteiktos mēnešos)',
        occasionnel: 'Reizēm',
        jamais: 'Vēl nekad (meklēju)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'No kurienes nāk jūsu norīkotie darbinieki?',
      placeholder: 'piemēram: Polija, Rumānija, Bulgārija...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Galamērķa valstis',
      description: 'Valstis, uz kurām norīkojat darbiniekus',
      placeholder: 'piemēram: Francija, Vācija, Beļģija, Nīderlande...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Aģentūras darbinieku, kurus nodarbināt, pilsonības',
      placeholder: 'piemēram: poļu, rumāņu, bulgāru...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Jūsu galvenais izaicinājums ar starptautisko norīkošanu',
      options: {
        admin: 'Administratīvā sarežģītība (A1, SIPSI...)',
        conformite: 'Atbilstība noteikumiem vairākās valstīs',
        cout: 'Vadības izmaksas un laiks',
        langues: 'Valodu barjeras',
        autre: 'Cits',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Jūsu galvenais izaicinājums ar Eiropas aģentūras darbiniekiem',
      options: {
        trouver: 'Uzticamu aģentūru meklēšana',
        conformite: 'Juridiskā atbilstība',
        qualite: 'Kvalitāte/prasmes',
        cout: 'Pārāk augstas izmaksas',
        langues: 'Komunikācija / Valodas',
        autre: 'Cits',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Jūsu galvenais izaicinājums ar pagaidu darbu ārzemēs',
      options: {
        admin: 'Administratīvā dokumentācija',
        langue: 'Valodu barjera',
        logement: 'Mājokļa meklēšana',
        transport: 'Transports',
        salaire: 'Maksājuma/algas problēmas',
        autre: 'Cits',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Norādiet savu galveno izaicinājumu',
      placeholder: 'Aprakstiet savu galveno izaicinājumu...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Kā šodien pārvaldāt norīkošanas pieteikumus?',
      options: {
        interne: 'Iekšējā komanda',
        externe: 'Ārējais pakalpojumu sniedzējs',
        mixte: 'Jaukta pieeja',
        manuel: 'Manuāla pārvaldība',
        logiciel: 'Specializēta programmatūra',
        manuel: 'Manuāli (Excel, Word...)',
        logiciel_interne: 'Iekšējā programmatūra',
        prestataire: 'Ārējais pakalpojumu sniedzējs',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Cik nodarbinātības aģentūras izmantojat?',
      options: {
        '0': 'Nevienu',
        '1': '1 aģentūru',
        '2-3': '2-3 aģentūras',
        '4-10': '4-10 aģentūras',
        '10+': 'Vairāk nekā 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kā nodarbināt aģentūras darbiniekus?',
      options: {
        agence_fr: 'Franču nodarbinātības aģentūras',
        agence_euro: 'Eiropas nodarbinātības aģentūras',
        direct: 'Tieša nodarbināšana',
        mixte: 'Jaukts',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Kā meklējat pagaidu darbu?',
      options: {
        agence: 'Caur nodarbinātības aģentūrām',
        bouche: 'Ieteikums',
        internet: 'Tiešsaistes darba portāli',
        direct: 'Tieša pieteikšanās',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Ar cik aģentūrām sadarbojaties?',
      options: {
        '1': 'Tikai 1 aģentūra',
        '2-3': '2-3 aģentūras',
        '4-10': '4-10 aģentūras',
        '10+': 'Vairāk nekā 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Vai esat saņēmis naudas sodus vai incidentus saistībā ar norīkošanas atbilstību?',
      description: 'Jūsu atbilde paliek anonīma',
      options: {
        jamais: 'Nē, nekad',
        rarement: 'Reti (1-2 reizes)',
        parfois: 'Dažreiz (3-5 reizes)',
        souvent: 'Bieži (6+ reizes)',
        oui_souvent: 'Jā, bieži',
        oui_rare: 'Jā, reizēm',
        non: 'Nē',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Vai pārbaudāt nodarbinātības aģentūru juridisko atbilstību?',
      options: {
        oui_systematique: 'Jā, sistemātiski',
        oui_parfois: 'Jā, dažreiz',
        non: 'Nē',
        ne_sait_pas: 'Nezinu',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Vai esat saskāries ar problēmām pagaidu darbā ārzemēs?',
      options: {
        oui_graves: 'Jā, nopietnas problēmas',
        oui_mineurs: 'Jā, mazas problēmas',
        non: 'Nē',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Vai jums ir budžets ārējiem pakalpojumiem norīkošanas pārvaldībai?',
      options: {
        oui_important: 'Jā, būtisks',
        oui_modere: 'Jā, mērens',
        non: 'Nē',
        ne_sait_pas: 'Nezinu',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Kādi ir jūsu galvenie kritēriji, izvēloties nodarbinātības aģentūru?',
      description: 'Izvēlieties vairākus variantus',
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Cik apmierināts esat ar saviem pašreizējiem darba apstākļiem?',
      options: {
        tres_satisfait: 'Ļoti apmierināts',
        satisfait: 'Apmierināts',
        neutre: 'Neitrāls',
        insatisfait: 'Neapmierināts',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Vidējais jūsu norīkošanas uzdevumu ilgums',
      options: {
        '<1mois': 'Mazāk par 1 mēnesi',
        '1-3mois': '1-3 mēneši',
        '3-6mois': '3-6 mēneši',
        '6-12mois': '6-12 mēneši',
        '12+mois': 'Vairāk nekā 12 mēneši',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Kāds ir jūsu gada budžets pagaidu darbam?',
      options: {
        '<50k': 'Mazāk par €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Vairāk nekā €1M',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Jūsu vēlamais uzdevuma ilgums',
      options: {
        court: 'Īss (< 3 mēneši)',
        moyen: 'Vidējs (3-6 mēneši)',
        long: 'Garš (> 6 mēneši)',
        indifferent: 'Man ir vienalga',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Vai jūs interesētu Eiropas platforma savu pakalpojumu piedāvāšanai?',
      description: 'Tirgus jūsu redzamības palielināšanai',
      options: {
        tres_interesse: 'Ļoti ieinteresēts',
        interesse: 'Ieinteresēts',
        neutre: 'Neitrāls',
        pas_interesse: 'Nav ieinteresēts',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Vai jūs interesētu platforma, lai viegli atrastu Eiropas aģentūras?',
      options: {
        tres_interesse: 'Ļoti ieinteresēts',
        interesse: 'Ieinteresēts',
        neutre: 'Neitrāls',
        pas_interesse: 'Nav ieinteresēts',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Vai jūs interesētu platforma uzdevumu meklēšanai?',
      options: {
        tres_interesse: 'Ļoti ieinteresēts',
        interesse: 'Ieinteresēts',
        neutre: 'Neitrāls',
        pas_interesse: 'Nav ieinteresēts',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Kādas funkcijas būtu visnoderīgākās?',
      description: 'Izvēlieties vairākus variantus',
      options: {
        marketplace: 'Pakalpojumu tirgus',
        admin: 'Automatizēta administrācija',
        conformite: 'Atbilstības pārbaudes',
        payment: 'Integrēti maksājumi',
        support: 'Daudzvalodu atbalsts',
        autre: 'Cits',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Kādas funkcijas būtu visnoderīgākās?',
      description: 'Izvēlieties vairākus variantus',
      options: {
        comparaison: 'Aģentūru salīdzinājums',
        avis: 'Pārbaudīti atsauksmes',
        suivi: 'Uzdevumu izsekošana',
        documentation: 'Centralizēta dokumentācija',
        facturation: 'Rēķinu pārvaldība',
        autre: 'Cits',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Kādas funkcijas būtu visnoderīgākās?',
      description: 'Izvēlieties vairākus variantus',
      options: {
        recherche: 'Paplašināta uzdevumu meklēšana',
        alertes: 'Paziņojumi par jauniem uzdevumiem',
        documents: 'Dokumentu pārvaldība',
        avis: 'Aģentūru vērtējumi',
        support: 'Daudzvalodu atbalsts',
        autre: 'Cits',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Kāds būtu jūsu lielākais šķērslis, izmantojot šādu platformu?',
      options: {
        cout: 'Izmaksas',
        complexite: 'Pārāk sarežģīts',
        confiance: 'Uzticības trūkums',
        changement: 'Nevēlos mainīt',
        aucun: 'Nav šķēršļu',
        autre: 'Cits',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Kāds būtu jūsu lielākais šķērslis?',
      options: {
        cout: 'Izmaksas',
        confiance: 'Uzticība aģentūrām',
        complexite: 'Pārāk sarežģīts',
        aucun: 'Nav šķēršļu',
        autre: 'Cits',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Kāds būtu jūsu lielākais šķērslis?',
      options: {
        complexite: 'Pārāk sarežģīts',
        confiance: 'Uzticība platformai',
        acces: 'Piekļuve tehnoloģijām',
        aucun: 'Nav šķēršļu',
        autre: 'Cits',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Kāds cenu modelis jums šķiet vispiemērotākais?',
      options: {
        commission: 'Komisijas maksa par uzdevumu',
        abonnement: 'Mēneša abonements',
        freemium: 'Bezmaksas + premium funkcijas',
        autre: 'Cits',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Kādus pakalpojumus visvairāk novērtētu?',
      description: 'Izvēlieties vairākus variantus',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Kādus pakalpojumus visvairāk novērtētu?',
      description: 'Izvēlieties vairākus variantus',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Vai ieteiktu šādu platformu kolēģiem?',
      options: {
        certainement: 'Noteikti',
        probablement: 'Ticams',
        peut_etre: 'Varbūt',
        probablement_pas: 'Ticams, ka nē',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Vai ieteiktu šādu risinājumu?',
      options: {
        certainement: 'Noteikti',
        probablement: 'Ticams',
        peut_etre: 'Varbūt',
        probablement_pas: 'Ticams, ka nē',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Vai ieteiktu šādu platformu?',
      options: {
        certainement: 'Noteikti',
        probablement: 'Ticams',
        peut_etre: 'Varbūt',
        probablement_pas: 'Ticams, ka nē',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Vai vēlētos piedalīties beta fāzē?',
      options: {
        oui_immediat: 'Jā, uzreiz',
        oui_plus_tard: 'Jā, bet vēlāk',
        non: 'Nē',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Vai vēlētos piedalīties testēšanā?',
      options: {
        oui_immediat: 'Jā, uzreiz',
        oui_plus_tard: 'Jā, bet vēlāk',
        non: 'Nē',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Vai vēlētos piedalīties testēšanā?',
      options: {
        oui_immediat: 'Jā, uzreiz',
        oui_plus_tard: 'Jā, bet vēlāk',
        non: 'Nē',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Kā redzat savu norīkošanas darbību nākamajos 3 gados?',
      options: {
        forte_croissance: 'Strauja izaugsme',
        croissance: 'Mērena izaugsme',
        stable: 'Stabils',
        decroissance: 'Samazinājums',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Kā redzat savu pagaidu darba vajadzību attīstību?',
      options: {
        hausse: 'Pieaugums',
        stable: 'Stabils',
        baisse: 'Samazinājums',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Kādi ir jūsu projekti nākamajos mēnešos?',
      options: {
        meme_secteur: 'Turpināt tajā pašā sektorā',
        changer_secteur: 'Mainīt sektoru',
        se_former: 'Mācīties',
        entrepreneur: 'Kļūt par uzņēmēju',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Vai plānojat palielināt savu budžetu ārējiem pakalpojumiem?',
      options: {
        oui_beaucoup: 'Jā, ievērojami',
        oui_peu: 'Jā, nedaudz',
        non: 'Nē',
        ne_sait_pas: 'Nezinu',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Vai plānojat palielināt savu nodarbinātības budžetu?',
      options: {
        oui_beaucoup: 'Jā, ievērojami',
        oui_peu: 'Jā, nedaudz',
        non: 'Nē',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Vai esat gatavs pārcelties darba dēļ?',
      options: {
        oui_europe: 'Jā, jebkur Eiropā',
        oui_proche: 'Jā, kaimiņvalstīs',
        non: 'Nē, tikai manā valstī',
      },
    },
    
    // Section 5 - Contact
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Papildu komentāri vai ierosinājumi',
      placeholder: 'Dalieties ar savām idejām, cerībām vai īpašajām vajadzībām...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Tirgus vīzija nākamajos 3 gados',
      placeholder: 'Dalieties ar savu vīziju...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Citas vajadzības vai ierosinājumi',
      placeholder: 'Jūsu ierosinājumi mūs interesē...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Darba tālrunis',
      placeholder: '+371 1234 5678',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Vārds',
      placeholder: 'Jūsu vārds',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Uzvārds',
      placeholder: 'Jūsu uzvārds',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'Reģistrācijas numurs (neobligāts)',
      placeholder: '12345678901',
      description: 'Bagātināšanai caur Uzņēmumu reģistru',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-pasts',
      placeholder: 'jusu.epasts@piemers.lv',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Es piekrītu, ka ar mani atkal sazināsieties',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Es vēlētos saņemt pētījuma ziņojumu',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Cena',
    },
    critere_qualite: {
      label: 'Profilu kvalitāte',
    },
    critere_rapidite: {
      label: 'Atbildes ātrums',
    },
    critere_conformite: {
      label: 'Juridiskā atbilstība',
    },
    critere_flexibilite: {
      label: 'Elastība',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Personīgais atbalsts',
    },
    service_garantie: {
      label: 'Nomaiņas garantija',
    },
    service_formation: {
      label: 'Iepriekšēja apmācība',
    },
    service_gestion: {
      label: 'Administratīvā pārvaldība',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Apmācības un sertifikāti',
    },
    service_logement: {
      label: 'Palīdzība ar mājokli',
    },
    service_transport: {
      label: 'Transporta atbalsts',
    },
    service_administratif: {
      label: 'Administratīvais atbalsts',
    },
  },
};