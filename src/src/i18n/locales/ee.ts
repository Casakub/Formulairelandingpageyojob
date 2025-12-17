/**
 * 🇪🇪 TRADUCTIONS ESTONIENNES (EE)
 * 
 * Traductions complètes pour l'estonien
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const ee: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profiil',
    section2: 'Kogemus',
    section3: 'Vajadused',
    section4: 'Huvi',
    section5: 'Visioon',
    section6: 'Kontakt',
    dashboard: 'Juhtpaneel',
    back_to_site: 'Tagasi veebilehele',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Juhtpaneel',
    tabs: {
      overview: 'Ülevaade',
      results: 'Tulemused',
      questions: 'Küsimused',
      translations: 'Tõlked',
      export: 'Eksport',
      integrations: 'Integratsioonid',
      cms: 'CMS vorm',
      settings: 'Seaded',
      prospects: 'Potentsiaalsed kliendid',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Uus',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Logi välja',
      back_to_survey: 'Tagasi küsitlusele',
      toggle_sidebar: 'Ahenda/Laienda',
    },
    user: {
      welcome: 'Tere tulemast',
      logged_in_as: 'Sisse logitud kui',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profiil',
      description: '4 küsimust • 2 min',
    },
    2: {
      title: 'Kogemus',
      description: '7 küsimust • 3 min',
    },
    3: {
      title: 'Vajadused',
      description: '6 küsimust • 2 min',
    },
    4: {
      title: 'Huvi YoJob vastu',
      description: '6 küsimust • 3 min',
    },
    5: {
      title: 'Tuleviku visioon',
      description: '2 küsimust • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 küsimus • 1 min',
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Turu-uuring',
  },
  
  // Hero
  hero: {
    title: 'Turu küsitlus',
    subtitle: 'Aidake meil teie vajadusi paremini mõista',
    description: 'See küsitlus kestab umbes 10-15 minutit. Teie vastused aitavad meil luua teie tööstusharule kohandatud lahenduse.',
    cta_start: 'Alusta küsitlust',
    cta_dashboard: 'Ava juhtpaneel',
    badge: 'Euroopa turu-uuring',
    stat: {
      countries: '27 Euroopa riiki',
      questions: 'küsimused',
      benchmark: 'Hankige 2025. aasta võrdlusalus',
      insights: 'Eksklusiivsed turu teadmised',
      opportunities: 'Eelistatud juurdepääs töödele',
    },
    footer: {
      info: 'küsimused • Anonüümselt • GDPR-iga kooskõlas',
      anonymous: 'Anonüümselt',
      gdpr: 'GDPR-iga kooskõlas',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Kes te olete?',
    subtitle: 'Valige oma profiil küsimuste kohandamiseks',
    agency: 'Tööhõiveagentuur',
    agency_description: 'Olete ajutise töö või lähetamise agentuur',
    client: 'Klient',
    client_description: 'Olete ettevõte, kes tööle võtab agentuuri töötajaid',
    worker: 'Agentuuri töötaja',
    worker_description: 'Olete agentuuri või lähetatud töötaja',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Euroopa turu-uuring - Tööhõive ja Ajutine töö',
    title: 'Jagage oma kogemusi Euroopa turul',
    subtitle: 'Valige oma profiil küsitluse alustamiseks',
    cta: 'Klõpsake alustamiseks →',
    trust: {
      secure: 'Turvalised andmed',
      languages: '{count} saadaolevat keelt',
      languages_suffix: 'saadaolevat keelt',
      anonymous: 'Anonüümselt ja konfidentsiaalselt',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Tööhõiveagentuur',
      description: 'Olete Euroopa ajutise töö agentuur. Jagage oma lähetamiskogemust.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klient',
      description: 'Võtate tööle agentuuri töötajaid. Jagage oma vajadusi ja ootusi.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agentuuri töötaja',
      description: 'Töötate agentuuri töötajana. Jagage oma kogemusi väljakult.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Eelmine',
    next: 'Järgmine',
    submit: 'Saada vastused',
    submitting: 'Saadan...',
    back: 'Tagasi',
    start: 'Alusta',
  },
  
  // Confirmation
  confirmation: {
    title: 'Täname osalemise eest! 🙏',
    subtitle: 'Teie vastused on edukalt salvestatud',
    message: 'Praegu analüüsime kõiki vastuseid, et luua lahendus, mis on täielikult kohandatud teie vajadustele.',
    cta_back: 'Tagasi avalehele',
    cta_dashboard: 'Kuva juhtpaneel',
    description: 'Teie arvamus on väärtuslik ja aitab kujundada YoJob tulevikku.',
    cta: 'Tagasi YoJob veebisaidile',
    
    reward: {
      report: {
        title: 'Aruanne "Trendid 2025"',
        description: 'Saadetud 3 nädala jooksul'
      },
      earlyaccess: {
        title: 'Varajane juurdepääs YoJob',
        description: 'Top 100 osalejat'
      }
    },
    
    thanks: {
      title: '🎁 Tänuks osalemise eest:',
      item1: '• Eksklusiivne aruanne "Lähetamise trendid 2025"',
      item2: '• Top 100 osalejat = 3 kuud tasuta juurdepääsu YoJobile (väärtus 500€)'
    }
  },
  
  // Progress
  progress: {
    section: 'Jaotis',
    question: 'Küsimus',
    section_completed: 'Jaotis lõpetatud',
    questions_remaining: '{count} küsimust järel',
    time_remaining: 'Umbes {time} järel',
  },
  
  // Common translations
  common: {
    oui: 'Jah',
    non: 'Ei',
    autre: 'Muu',
    loading: 'Laadimine...',
    submit: 'Saada',
    next: 'Järgmine',
    previous: 'Eelmine',
    skip: 'Jäta vahele',
    save: 'Salvesta',
    cancel: 'Tühista',
    close: 'Sulge',
    required: 'Kohustuslik',
    optional: 'Valikuline',
    error: 'Viga',
    success: 'Edu',
    completed: 'Lõpetatud',
    inProgress: 'Pooleli',
    notStarted: 'Pole alustatud',
    profileAgency: 'Tööhõiveagentuur',
    profileClient: 'Klient',
    profileWorker: 'Agentuuri töötaja',
    score_not_interested: 'Ei ole huvitatud',
    score_very_interested: 'Väga huvitatud',
  },
  
  // Sectors
  sectors: {
    btp: 'Ehitus',
    industrie: 'Tööstus',
    logistique: 'Logistika',
    hotellerie: 'Külalislahkus',
    sante: 'Tervishoid',
    agriculture: 'Põllumajandus',
    tech: 'Tech/IT',
    autres: 'Muu',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions EE
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nimi',
      placeholder: 'Organisatsiooni nimi või teie täisnimi',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Asutamise aasta',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Teie ettevõtte asutamise aasta',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Teie kodakondsus',
      placeholder: 'Nt: poola, rumeenia...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organisatsiooni suurus',
      options: {
        '1-9': '1-9 töötajat',
        '10-49': '10-49 töötajat',
        '50-249': '50-249 töötajat',
        '250+': '250+ töötajat',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Ajutise töö kogemuse aastad',
      options: {
        '<1': 'Vähem kui 1 aasta',
        '1-3': '1-3 aastat',
        '3-5': '3-5 aastat',
        '5-10': '5-10 aastat',
        '10+': 'Üle 10 aasta',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Peamised sektorid',
      description: 'Valige kõik asjakohased sektorid',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Teie ametid',
      description: 'Valige kõik oma ametid',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Teie agentuuri riik',
      placeholder: 'Nt: Poola',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Riik, kus teie ettevõte tegutseb',
      placeholder: 'Nt: Prantsusmaa',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Riigid, kus olete töötanud agentuuri töötajana',
      placeholder: 'Nt: Prantsusmaa, Saksamaa, Belgia...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Aastane lähetatud töötajate maht',
      options: {
        '0': 'Veel mitte ühtegi',
        '1-50': '1-50 töötajat',
        '51-200': '51-200 töötajat',
        '201-500': '201-500 töötajat',
        '500+': 'Üle 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Kui palju agentuuri töötajaid võtate aastas tööle?',
      options: {
        '0': 'Praegu mitte ühtegi',
        '1-10': '1-10 inimest',
        '11-50': '11-50 inimest',
        '51-200': '51-200 inimest',
        '200+': '200+ inimest',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Kui sageli töötate agentuuri töötajana?',
      options: {
        permanent: 'Regulaarselt (terve aasta)',
        saisonnier: 'Hooajaliselt (teatud kuudel)',
        occasionnel: 'Aeg-ajalt',
        jamais: 'Veel mitte kunagi (otsin)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Kust pärinevad teie lähetatud töötajad?',
      placeholder: 'Nt: Poola, Rumeenia, Bulgaaria...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Sihtriigid',
      description: 'Riigid, kuhu lähetate töötajaid',
      placeholder: 'Nt: Prantsusmaa, Saksamaa, Belgia, Holland...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Agentuuri töötajate kodakondsused, keda tööle võtate',
      placeholder: 'Nt: poola, rumeenia, bulgaaria...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Teie peamine väljakutse rahvusvahelise lähetamisega',
      options: {
        admin: 'Halduslik keerukus (A1, SIPSI...)',
        conformite: 'Vastavus eeskirjadele mitmes riigis',
        cout: 'Haldamise kulud ja aeg',
        langues: 'Keelebarjäärid',
        autre: 'Muu',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Teie peamine väljakutse Euroopa agentuuri töötajatega',
      options: {
        trouver: 'Usaldusväärsete agentuuride leidmine',
        conformite: 'Juriidiline vastavus',
        qualite: 'Kvaliteet/oskused',
        cout: 'Liiga kõrged kulud',
        langues: 'Suhtlemine / Keeled',
        autre: 'Muu',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Teie peamine väljakutse oma töövõttudel',
      options: {
        trouver: 'Töövõttude leidmine',
        admin: 'Administratiivne paberimajandus',
        logement: 'Majutus / elukoht',
        langue: 'Kohalik keel',
        paiement: 'Maksete / palga probleemid',
        autre: 'Muu',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Palun täpsustage oma peamine väljakutse',
      placeholder: 'Kirjeldage oma peamist väljakutset...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Kuidas haldate täna lähetamise deklaratsioone?',
      options: {
        interne: 'Sisemine meeskond',
        externe: 'Väline teenusepakkuja',
        mixte: 'Segatud lähenemine',
        manuel: 'Käsitsi haldamine',
        logiciel: 'Spetsialiseeritud tarkvara',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Kui palju tööhõiveagentuure kasutate?',
      options: {
        '0': 'Mitte ühtegi',
        '1': '1 agentuur',
        '2-3': '2-3 agentuuri',
        '4-10': '4-10 agentuuri',
        '10+': 'Üle 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kuidas värbate agentuuri töötajaid?',
      options: {
        agence_fr: 'Prantsuse tööhõiveagentuurid',
        agence_euro: 'Euroopa tööhõiveagentuurid',
        direct: 'Otsene värbamine',
        mixte: 'Segatud',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Kuidas leiate ajutist tööd?',
      options: {
        agence: 'Läbi tööhõiveagentuuride',
        bouche: 'Suust suhu soovitused',
        internet: 'Veebipõhised tööportaalid',
        direct: 'Otsene kandideerimine',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Mitu agentuuri te kasutate?',
      options: {
        '1': 'Ainult 1 agentuur',
        '2-3': '2-3 agentuuri',
        '4-10': '4-10 agentuuri',
        '10+': 'Üle 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Kas olete kokku puutunud trahvide või intsidentidega seoses lähetamise vastavusega?',
      description: 'Teie vastus jääb anonüümseks',
      options: {
        jamais: 'Ei, mitte kunagi',
        rarement: 'Harva (1-2 korda)',
        parfois: 'Mõnikord (3-5 korda)',
        souvent: 'Sageli (6+ korda)',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Kas kontrollite agentuuride juriidilist vastavust?',
      options: {
        oui_systematique: 'Jah, süstemaatiliselt',
        oui_parfois: 'Jah, mõnikord',
        non: 'Ei',
        ne_sait_pas: 'Ei tea',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Kas olete kogenud probleeme ajutise tööga välismaal?',
      options: {
        oui_graves: 'Jah, tõsiseid probleeme',
        oui_mineurs: 'Jah, väikseid probleeme',
        non: 'Ei',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Aastane eelarve lähetamise halduseks',
      options: {
        '0-5k': '0-5 000 € / aasta',
        '5-15k': '5 000-15 000 € / aasta',
        '15-30k': '15 000-30 000 € / aasta',
        '30k+': '30 000+ € / aasta',
        inconnu: 'Ei tea',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Aastane eelarve ajutisele tööle',
      options: {
        '0-50k': '0 - 50 000 €',
        '50-200k': '50 000 - 200 000 €',
        '200-500k': '200 000 - 500 000 €',
        '500k+': '500 000+ €',
        'inconnu': 'Ei tea',
      },
    },
    
    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Rahulolu praeguste agentuuridega',
      options: {
        tres_satisfait: 'Väga rahul',
        satisfait: 'Rahul',
        neutre: 'Neutraalne',
        insatisfait: 'Rahulolematu',
      },
    },
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Kas olete rahul oma ajutise töö palgaga?',
      options: {
        '<1500': 'Alla €1 500',
        '1500-2500': '€1 500 - €2 500',
        '2500-3500': '€2 500 - €3 500',
        '3500+': '€3 500+',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Milline protsent käibest kaob haldusliku keerukuse tõttu?',
      options: {
        'non': 'Ei, mitte eriti',
        'faible': 'Jah, madal (< 5% käibest)',
        'moyen': 'Jah, keskmine (5-15% käibest)',
        'important': 'Jah, märkimisväärne (> 15% käibest)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Rahulolu oma praeguste agentuuridega',
      options: {
        'tres_satisfait': 'Väga rahul',
        'satisfait': 'Rahul',
        'neutre': 'Neutraalne',
        'insatisfait': 'Rahulolematu',
        'tres_insatisfait': 'Väga rahulolematu',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Rahulolu oma praeguste agentuuridega',
      options: {
        'tres_satisfait': 'Väga rahul',
        'satisfait': 'Rahul',
        'neutre': 'Neutraalne',
        'insatisfait': 'Rahulolematu',
        'tres_insatisfait': 'Väga rahulolematu',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Teie peamised mured',
      description: 'Valige kõik, mis sobivad',
      options: {
        amendes: 'Trahvid ja sanktsioonid',
        reputation: 'Maine / Imago',
        penal: 'Kriminaalvastutus',
        delais: 'Töövõttude viivitused',
        clients: 'Klientide kaotus',
        aucun: 'Olulisi riske pole',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Teie peamised vajadused',
      description: 'Valige kõik, mis sobivad',
      options: {
        fiabilite: 'Usaldusväärsete agentuuride leidmine',
        conformite: 'Juriidiline vastavus',
        qualite: 'Kvaliteet/oskused',
        cout: 'Kulud',
        disponibilite: 'Kandidaatide kättesaadavus',
        aucun: 'Olulisi vajadusi pole',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Teie ootused ajutise töö suhtes välismaal',
      description: 'Valige kõik, mis sobivad',
      options: {
        salaire: 'Parem palk',
        conditions: 'Paremad töötingimused',
        stabilite: 'Stabiilsus',
        experience: 'Rahvusvaheline kogemus',
        logement: 'Abi elamispinnaga',
        aucun: 'Erilisi ootusi pole',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Teie peamised mured',
      description: 'Valige kõik, mis sobivad',
      options: {
        conformite: 'Juriidiline vastavus',
        qualite: 'Kvaliteet/oskused',
        communication: 'Suhtlus/keeled',
        cout: 'Ootamatud kulud',
        disponibilite: 'Kandidaatide kättesaadavus',
        aucun: 'Olulisi muresid pole',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Milliste probleemidega kohtute kõige sagedamini?',
      description: 'Valige kõik, mis sobivad',
      options: {
        paiement: 'Maksete viivitused',
        conditions: 'Halvad töötingimused',
        contrat: 'Lepingute mittejärgimine',
        logement: 'Ebapiisav elamispind',
        communication: 'Suhtlusprobleemid',
        aucun: 'Suuri probleeme pole',
      },
    },
    
    // Q15 : Problème
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Millise probleemi soovite esimesena lahendada?',
      placeholder: 'Kirjeldage oma prioriteetset probleemi...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Millised on teie prioriteetsed vajadused?',
      placeholder: 'Nt: kiire leidmine, parem kvaliteet, hinnad...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Mida soovite oma töövõttudel parandada?',
      placeholder: 'Nt: palk, majutus, tugi, stabiilsus...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Kas kasutate ERP/juhtimistarkvara?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Muu',
        aucun: 'ERP puudub',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Millist tarkvara/ERP-d?',
      placeholder: 'Nt: SAP, Odoo, kohandatud...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Teie peamised valikukriteeriumid agentuuridele',
      description: 'Valige oma 3 olulisemat',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Mis parandaks teie ajutise töö kogemust?',
      description: 'Valige kõik, mis sobivad',
    },
    
    // Q16 : Muu ERP (täpsustus)
    q16_autre: {
      label: 'Täpsustage oma ERP',
      placeholder: 'Tarkvara nimi...',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Kas olete valmis oma töövahendeid vahetama?',
      options: {
        oui: 'Jah, probleemideta',
        conditions: 'Jah, tingimustel',
        difficile: 'Raske, kuid avatud',
        non: 'Ei, ei ole mõeldav',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Igakuine eelarve ajutise töö platvormile',
      options: {
        '0': 'Pole valmis maksma',
        '1-100': '€1 - €100/kuus',
        '100-500': '€100 - €500/kuus',
        '500-1000': '€500 - €1 000/kuus',
        '1000+': 'Üle €1 000/kuus',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Kas kasutaksite platvormi ajutise töö leidmiseks välismaal?',
      options: {
        oui_certainement: 'Jah, kindlasti',
        oui_probablement: 'Jah, tõenäoliselt',
        peut_etre: 'Võib-olla',
        non: 'Ei',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Kui huvitatud olete Euroopa lähetusplatvormist?',
      description: 'Hinnang 1 (ei ole huvitatud) kuni 10 (väga huvitatud)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Kõige huvitavamad funktsioonid',
      description: 'Valige oma 3 tähtsaimat prioriteeti',
      options: {
        sipsi: 'Automaatne SIPSI deklareerimine',
        a1: 'A1 sertifikaadi haldus',
        conformite: 'Vastavuse juhtpaneel',
        alertes: 'Hoiatused ja uuendamised',
        documents: 'Dokumentide tsentraliseerimine',
        marketplace: 'Agentuuride turg',
        support: 'Mitmekeelne eksperttugi',
        api: 'API integratsioon (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Kõige huvitavamad funktsioonid',
      description: 'Valige kõik, mis teid huvitavad',
      options: {
        recherche: 'Usaldusväärsete agentuuride otsing',
        comparaison: 'Hinna/kvaliteedi võrdlus',
        avis: 'Kontrollitud arvustused',
        conformite: 'Vastavuse garantii',
        support: 'Pühendatud tugi',
        facturation: 'Tsentraliseeritud arveldamine',
        suivi: 'Reaalajas jälgimine',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Kõige huvitavamad funktsioonid',
      description: 'Valige kõik, mis teid huvitavad',
      options: {
        recherche: 'Tööotsing',
        avis: 'Agentuuride hinnangud',
        logement: 'Abi elamispinnaga',
        paiement: 'Turvalised maksed',
        support: 'Tugi minu keeles',
        documents: 'Abi haldusdokumentidega',
        formation: 'Koolitusprogrammid',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Eelistatud hinnamudel',
      options: {
        mensuel: 'Fikseeritud kuutellimus',
        usage: 'Makse vastavalt kasutusele',
        annuel: 'Aastaplaan (soodustus)',
        gratuit: 'Tasuta töötajatele',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Igakuine eelarve täielikule SaaS-lahendusele',
      options: {
        '0-100': '€0 - €100/kuus',
        '100-300': '€100 - €300/kuus',
        '300-500': '€300 - €500/kuus',
        '500-1000': '€500 - €1 000/kuus',
        '1000+': 'Üle €1 000/kuus',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Kas soovite testida varajast versiooni (MVP)?',
      options: {
        oui_gratuit: 'Jah, tasuta',
        oui_reduc: 'Jah, soodustusega',
        peut_etre: 'Võib-olla, sõltub funktsioonidest',
        non: 'Ei, ei ole huvitatud',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Kuidas näete oma rolli Euroopa turul?',
      options: {
        decideur: 'Lõplik otsustaja',
        influenceur: 'Mõjutaja / Soovitus',
        utilisateur: 'Lõppkasutaja',
        autre: 'Muu',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Teie rahvusvahelise laienemise plaanid',
      options: {
        oui_rapide: 'Jah, 6 kuu jooksul',
        oui_lent: 'Jah, 1-2 aasta jooksul',
        maintien: 'Säilitada praegused riigid',
        reduction: 'Vähendada rahvusvahelist ulatust',
      },
    },
    
    // Q24bis : Aspirations (WORKER)
    q24_aspirations: {
      label: 'Teie tulevased professionaalsed püüdlused',
      placeholder: 'Nt: tähtajatu leping, naasmine koduriiki, koolitus...',
    },
    
    // Q25 : Besoins
    q25_besoins: {
      label: 'Muud vajadused või kommentaarid',
      placeholder: 'Jagage muid tagasisidet või vajadusi...',
    },
    
    // Section 6 - Contact
    
    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Professionaalne telefoninumber',
      placeholder: '+372 1234 5678',
    },
    
    // Q27 : Prénom
    q27_firstname: {
      label: 'Eesnimi',
      placeholder: 'Teie eesnimi',
    },
    
    // Q28 : Nom
    q28_lastname: {
      label: 'Perekonnanimi',
      placeholder: 'Teie perekonnanimi',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'Registrikood (valikuline)',
      placeholder: '12345678',
      description: 'Ettevõtte registri põhjal rikastamiseks',
    },
    
    // Q30 : Email
    email: {
      label: 'Teie e-post',
      placeholder: 'teie.email@naide.ee',
    },
    
    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'Nõustun, et minuga võetakse uuesti ühendust',
    },
    
    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'Soovin saada uuringu aruande',
    },
  },
};