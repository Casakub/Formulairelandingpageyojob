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
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Teie ettevõtte profiil',
        description: 'Rääkige meile oma agentuurist ja pädevusest',
      },
      client: {
        title: '📋 Teie ettevõtte profiil',
        description: 'Rääkige meile oma ettevõttest ja värbamisvajadustest',
      },
      worker: {
        title: '📋 Teie profiil',
        description: 'Rääkige meile oma tööalasest taustast',
      },
    },
    2: {
      agency: {
        title: '💼 Lähetamise tegevus',
        description: 'Teie kogemus töötajate lähetamisega',
      },
      client: {
        title: '💼 Teie värbamiskogemus',
        description: 'Teie praegune värbamine ja ajutine töö',
      },
      worker: {
        title: '💼 Teie ajutise töö kogemus',
        description: 'Teie tee agentuuri töötajana',
      },
    },
    3: {
      agency: {
        title: '🎯 Vajadused ja tööriistad',
        description: 'Teie väljakutsed ja praegused lahendused',
      },
      client: {
        title: '🎯 Teie praegused vajadused',
        description: 'Väljakutsed ja ootused värbamisel',
      },
      worker: {
        title: '🎯 Teie ootused',
        description: 'Mis on teile töövõtul tähtis',
      },
    },
    4: {
      agency: {
        title: '⭐ Huvi Euroopa platvormi vastu',
        description: 'Avastage meie uuenduslik turu visioon',
      },
      client: {
        title: '⭐ Huvi Euroopa platvormi vastu',
        description: 'Uuenduslik lahendus teie vajadustele',
      },
      worker: {
        title: '⭐ Teie huvi platvormi vastu',
        description: 'Platvorm lihtsamaks töövõttude otsimiseks',
      },
    },
    5: {
      agency: {
        title: '🔮 Tuleviku visioon',
        description: 'Eelarve ja arenguväljavaated',
      },
      client: {
        title: '🔮 Teie tulevikuprioriteedid',
        description: 'Eelarve ja värbamisstrateegia',
      },
      worker: {
        title: '🔮 Teie eesmärgid',
        description: 'Teie eelseisvad kutselised projektid',
      },
    },
    6: {
      agency: {
        title: '📧 Hoidke ühendust',
        description: 'Saage uuringu tulemused ja olge informeeritud',
      },
      client: {
        title: '📧 Hoidke ühendust',
        description: 'Saage tulemused ja meie soovitused',
      },
      worker: {
        title: '📧 Hoidke ühendust',
        description: 'Saage tulemused ja võimalused',
      },
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
    title: 'Täname osalemise eest!',
    subtitle: 'Teie vastused on edukalt salvestatud',
    message: 'Praegu analüüsime kõiki vastuseid, et luua lahendus, mis on täielikult kohandatud teie vajadustele.',
    cta_back: 'Tagasi avalehele',
    cta_dashboard: 'Kuva juhtpaneel',
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
      placeholder: 'nt: poola, rumeenia...',
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
      placeholder: 'nt: Poola',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Riik, kus teie ettevõte tegutseb',
      placeholder: 'nt: Prantsusmaa',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Riigid, kus olete töötanud agentuuri töötajana',
      placeholder: 'nt: Prantsusmaa, Saksamaa, Belgia...',
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
      placeholder: 'nt: Poola, Rumeenia, Bulgaaria...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Sihtriigid',
      description: 'Riigid, kuhu lähete töötajaid',
      placeholder: 'nt: Prantsusmaa, Saksamaa, Belgia, Holland...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Agentuuri töötajate kodakondsused, keda tööle võtate',
      placeholder: 'nt: poola, rumeenia, bulgaaria...',
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
      label: 'Teie peamine väljakutse ajutise tööga välismaal',
      options: {
        admin: 'Haldustöö',
        langue: 'Keelebarjäär',
        logement: 'Elukoha leidmine',
        transport: 'Transport',
        salaire: 'Maksete/palga probleemid',
        autre: 'Muu',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Täpsustage oma peamine väljakutse',
      placeholder: 'Kirjeldage oma peamist väljakutset...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Kuidas täna haldatakse lähetamistaotlusi?',
      options: {
        interne: 'Sisemine meeskond',
        externe: 'Väline teenusepakkuja',
        mixte: 'Segatud lähenemine',
        manuel: 'Käsitsi haldamine',
        logiciel: 'Spetsialiseeritud tarkvara',
        manuel: 'Käsitsi (Excel, Word...)',
        logiciel_interne: 'Sisemine tarkvara',
        prestataire: 'Väline teenusepakkuja',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Kui palju tööhõiveagentuure kasutate?',
      options: {
        '0': 'Mitte ühtegi',
        '1': '1 agentuuri',
        '2-3': '2-3 agentuuri',
        '4-10': '4-10 agentuuri',
        '10+': 'Üle 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kuidas võtate tööle agentuuri töötajaid?',
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
      label: 'Kuidas otsite ajutist tööd?',
      options: {
        agence: 'Läbi tööhõiveagentuuride',
        bouche: 'Soovitus',
        internet: 'Veebipõhised töökohta pakkuvad portaalid',
        direct: 'Otsene avaldus',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Kui paljude agentuuridega teete koostööd?',
      options: {
        '1': 'Ainult 1 agentuur',
        '2-3': '2-3 agentuuri',
        '4-10': '4-10 agentuuri',
        '10+': 'Üle 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Kas olete saanud trahve või intsidente seoses lähetamise vastavusega?',
      description: 'Teie vastus jääb anonüümseks',
      options: {
        jamais: 'Ei, mitte kunagi',
        rarement: 'Harva (1-2 korda)',
        parfois: 'Mõnikord (3-5 korda)',
        souvent: 'Sageli (6+ korda)',
        oui_souvent: 'Jah, sageli',
        oui_rare: 'Jah, aeg-ajalt',
        non: 'Ei',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Kas kontrollite tööhõiveagentuuride juriidilist vastavust?',
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
      label: 'Kas teil on eelarve välistele teenustele lähetamise haldamiseks?',
      options: {
        oui_important: 'Jah, märkimisväärne',
        oui_modere: 'Jah, mõõdukas',
        non: 'Ei',
        ne_sait_pas: 'Ei tea',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Mis on teie peamised kriteeriumid tööhõiveagentuuri valimisel?',
      description: 'Valige mitu varianti',
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Kui rahul olete oma praeguste töötingimustega?',
      options: {
        tres_satisfait: 'Väga rahul',
        satisfait: 'Rahul',
        neutre: 'Neutraalne',
        insatisfait: 'Rahulolematu',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Teie lähetamise töövõttude keskmine kestus',
      options: {
        '<1mois': 'Vähem kui 1 kuu',
        '1-3mois': '1-3 kuud',
        '3-6mois': '3-6 kuud',
        '6-12mois': '6-12 kuud',
        '12+mois': 'Üle 12 kuu',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      label: 'Aastane eelarve ajutisele tööle',
      options: {
        '0-50k': '0-50 000 €',
        '50-200k': '50 000-200 000 €',
        '200-500k': '200 000-500 000 €',
        '500k+': '500 000+ €',
        'inconnu': 'Ei tea',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Rahulolu praeguste agentuuridega',
      options: {
        'tres_satisfait': 'Väga rahul',
        'satisfait': 'Rahul',
        'neutre': 'Neutraalne',
        'insatisfait': 'Veidi rahulolematu',
        'tres_insatisfait': 'Väga rahulolematu',
      },
    },
    
    // Q14 : Risques client (CLIENT)
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Millised riskid teid kõige rohkem muret teevad?',
      description: 'Valige kõik asjakohased',
      options: {
        conformite: 'Eeskirjade eiramine',
        qualite: 'Ebapiisav kvaliteet',
        communication: 'Suhtlemine/Keeled',
        cout: 'Ootamatud kulud',
        disponibilite: 'Kandidaatide kättesaadavus',
        aucun: 'Suuri muresid pole',
        fiabilite: 'Agentuuride usaldusväärsus',
      },
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Mis on teie prioriteetsed vajadused?',
      placeholder: 'Näiteks: Kiire leidmine, parem kvaliteet, hinnad...',
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Teie eelistatud töövõtu kestus',
      options: {
        court: 'Lühike (< 3 kuud)',
        moyen: 'Keskmine (3-6 kuud)',
        long: 'Pikk (> 6 kuud)',
        indifferent: 'Ükskõik',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Kas teid huvitaks Euroopa platvorm oma teenuste pakkumiseks?',
      description: 'Turg teie nähtavuse suurendamiseks',
      options: {
        tres_interesse: 'Väga huvitatud',
        interesse: 'Huvitatud',
        neutre: 'Neutraalne',
        pas_interesse: 'Ei ole huvitatud',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Kas teid huvitaks platvorm Euroopa agentuuride lihtsaks leidmiseks?',
      options: {
        tres_interesse: 'Väga huvitatud',
        interesse: 'Huvitatud',
        neutre: 'Neutraalne',
        pas_interesse: 'Ei ole huvitatud',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Kas teid huvitaks platvorm töövõttude otsimiseks?',
      options: {
        tres_interesse: 'Väga huvitatud',
        interesse: 'Huvitatud',
        neutre: 'Neutraalne',
        pas_interesse: 'Ei ole huvitatud',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Millised funktsioonid oleksid kõige kasulikumad?',
      description: 'Valige mitu varianti',
      options: {
        marketplace: 'Teenuste turg',
        admin: 'Automatiseeritud haldamine',
        conformite: 'Vastavuse kontrollid',
        payment: 'Integreeritud maksed',
        support: 'Mitmekeelne tugi',
        autre: 'Muu',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Millised funktsioonid oleksid kõige kasulikumad?',
      description: 'Valige mitu varianti',
      options: {
        comparaison: 'Agentuuride võrdlus',
        avis: 'Kontrollitud arvustused',
        suivi: 'Töövõttude jälgimine',
        documentation: 'Tsentraliseeritud dokumentatsioon',
        facturation: 'Arvete haldamine',
        autre: 'Muu',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Millised funktsioonid oleksid kõige kasulikumad?',
      description: 'Valige mitu varianti',
      options: {
        recherche: 'Täiustatud töövõttude otsing',
        alertes: 'Teated uutest töövõttudest',
        documents: 'Dokumentide haldamine',
        avis: 'Agentuuride hinnangud',
        support: 'Mitmekeelne tugi',
        autre: 'Muu',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Mis oleks teie suurim takistus sellise platvormi kasutamisel?',
      options: {
        cout: 'Kulud',
        complexite: 'Liiga keeruline',
        confiance: 'Usalduse puudumine',
        changement: 'Ei taha muuta',
        aucun: 'Takistusi pole',
        autre: 'Muu',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Mis oleks teie suurim takistus?',
      options: {
        cout: 'Kulud',
        confiance: 'Usaldus agentuuride vastu',
        complexite: 'Liiga keeruline',
        aucun: 'Takistusi pole',
        autre: 'Muu',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Mis oleks teie suurim takistus?',
      options: {
        complexite: 'Liiga keeruline',
        confiance: 'Usaldus platvormi vastu',
        acces: 'Juurdepääs tehnoloogiale',
        aucun: 'Takistusi pole',
        autre: 'Muu',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Milline hinnakujunduse mudel tundub teile kõige sobivam?',
      options: {
        commission: 'Vahendustasu töövõtu kohta',
        abonnement: 'Kuutellimus',
        freemium: 'Tasuta + premium funktsioonid',
        autre: 'Muu',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Milliseid teenuseid hindaksite kõige rohkem?',
      description: 'Valige mitu varianti',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Milliseid teenuseid hindaksite kõige rohkem?',
      description: 'Valige mitu varianti',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Kas soovitaksite sellist platvormi kolleegidele?',
      options: {
        certainement: 'Kindlasti',
        probablement: 'Tõenäoliselt',
        peut_etre: 'Võib-olla',
        probablement_pas: 'Tõenäoliselt mitte',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Kas soovitaksite sellist lahendust?',
      options: {
        certainement: 'Kindlasti',
        probablement: 'Tõenäoliselt',
        peut_etre: 'Võib-olla',
        probablement_pas: 'Tõenäoliselt mitte',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Kas soovitaksite sellist platvormi?',
      options: {
        certainement: 'Kindlasti',
        probablement: 'Tõenäoliselt',
        peut_etre: 'Võib-olla',
        probablement_pas: 'Tõenäoliselt mitte',
      },
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Kõige huvitavamad funktsioonid',
      description: 'Valige kõik, mis teile meeldivad',
      options: {
        sipsi: 'Automaatne SIPSI deklareerimine',
        a1: 'A1 sertifikaatide haldamine',
        conformite: 'Vastavuse juhtpaneel',
        alertes: 'Hoiatused ja pikendamised',
        marketplace: 'Euroopa turg',
        autre: 'Muu',
      },
    },
    
    // Q19 : Features client (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Kõige huvitavamad funktsioonid',
      description: 'Valige kõik, mis teile meeldivad',
      options: {
        recherche: 'Usaldusväärsete agentuuride otsing',
        comparaison: 'Hinna/kvaliteedi võrdlus',
        avis: 'Kontrollitud arvustused',
        conformite: 'Vastavuse garantii',
        suivi: 'Reaalajas jälgimine',
        autre: 'Muu',
      },
    },
    
    // Q19 : Features worker (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Kõige huvitavamad funktsioonid',
      description: 'Valige kõik, mis teile meeldivad',
      options: {
        recherche: 'Töövõttude otsing',
        avis: 'Agentuuride arvustused',
        logement: 'Abi elukoha leidmisel',
        paiement: 'Turvaline maksmine',
        documents: 'Abi halduslike dokumentidega',
        formation: 'Kvalifikatsioonid andev koolitus',
      },
    },
    
    // Q20 : Prix (ALL)
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Eelistatud hinnamudel',
      options: {
        mensuel: 'Fikseeritud kuutellimus',
        usage: 'Tasuta kasutuse eest (Pay-as-you-go)',
        annuel: 'Aastane pakett (allahindlus)',
        gratuit: 'Tasuta töötajatele',
        freemium: 'Tasuta baas + premium',
      },
    },
    
    // Q21 : Budget mensuel (AGENCY & CLIENT)
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Vastuvõetav kuueelarve',
      options: {
        '0-100': '0-100 € / kuus',
        '100-300': '100-300 € / kuus',
        '300-500': '300-500 € / kuus',
        '500-1000': '500-1 000 € / kuus',
        '1000+': 'Üle 1 000 € / kuus',
      },
    },
    
    // Q22 : MVP (ALL)
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Kas olete valmis testima MVP-d (beeta versioon)?',
      options: {
        oui_gratuit: 'Jah, tasuta',
        oui_reduc: 'Jah, allahindlusega',
        peut_etre: 'Võib-olla, sõltuvalt funktsioonidest',
        non: 'Ei, ei ole huvitatud',
      },
    },
    
    // Q23 : Role (AGENCY & CLIENT)
    q23_role: {
      ...fr.questions.q23_role,
      label: 'Roll ostuotsuses',
      options: {
        decideur: 'Lõplik otsustaja',
        influenceur: 'Mõjutaja / Soovitus',
        utilisateur: 'Lõppkasutaja',
        autre: 'Muu',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Kas sooviksite osaleda beeta faasis?',
      options: {
        oui_immediat: 'Jah, kohe',
        oui_plus_tard: 'Jah, aga hiljem',
        non: 'Ei',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Kas sooviksite osaleda testimises?',
      options: {
        oui_immediat: 'Jah, kohe',
        oui_plus_tard: 'Jah, aga hiljem',
        non: 'Ei',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Kas sooviksite osaleda testimises?',
      options: {
        oui_immediat: 'Jah, kohe',
        oui_plus_tard: 'Jah, aga hiljem',
        non: 'Ei',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Kuidas näete oma lähetamise tegevust järgmise 3 aasta jooksul?',
      options: {
        forte_croissance: 'Tugev kasv',
        croissance: 'Mõõdukas kasv',
        stable: 'Stabiilne',
        decroissance: 'Langus',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Kuidas näete oma ajutise töö vajaduste arengut?',
      options: {
        hausse: 'Tõus',
        stable: 'Stabiilne',
        baisse: 'Langus',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Mis on teie projektid lähikuudel?',
      options: {
        meme_secteur: 'Jätkata samas sektoris',
        changer_secteur: 'Vahetada sektorit',
        se_former: 'Õppida',
        entrepreneur: 'Saada ettevõtjaks',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Kas plaanite oma eelarvet välistele teenustele suurendada?',
      options: {
        oui_beaucoup: 'Jah, märkimisväärselt',
        oui_peu: 'Jah, veidi',
        non: 'Ei',
        ne_sait_pas: 'Ei tea',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Kas plaanite oma värbamise eelarvet suurendada?',
      options: {
        oui_beaucoup: 'Jah, märkimisväärselt',
        oui_peu: 'Jah, veidi',
        non: 'Ei',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Kas olete valmis kolima töö pärast?',
      options: {
        oui_europe: 'Jah, kuhuiganes Euroopas',
        oui_proche: 'Jah, naaberriikides',
        non: 'Ei, ainult oma riigis',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'E-post (valikuline)',
      placeholder: 'teie@email.ee',
      description: 'Tulemuste ja projekti teabe saamiseks',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Äri e-post (valikuline)',
      placeholder: 'kontakt@teieagentuur.ee',
      description: 'Tulemuste ja eksklusiivse juurdepääsu saamiseks platvormile',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Äri e-post (valikuline)',
      placeholder: 'kontakt@teie-ettevõte.ee',
      description: 'Teie vajadustele kohandatud soovituste saamiseks',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'E-post (valikuline)',
      placeholder: 'teie@email.ee',
      description: 'Teie profiilile vastavate võimaluste saamiseks',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Telefon (valikuline)',
      placeholder: '+372 1234 5678',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Täiendavad märkused või ettepanekud',
      placeholder: 'Jagage oma ideid, ootusi või konkreetseid vajadusi...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Turu visioon järgmise 3 aasta jooksul',
      placeholder: 'Jagage oma visiooni...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Muud vajadused või ettepanekud',
      placeholder: 'Teie ettepanekud huvitavad meid...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Ettevõtte telefon',
      placeholder: '+372 1234 5678',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Eesnimi',
      placeholder: 'Teie eesnimi',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Perekonnanimi',
      placeholder: 'Teie perekonnanimi',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'Registrikood (valikuline)',
      placeholder: '12345678',
      description: 'Rikastamiseks äriregistri kaudu',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-post',
      placeholder: 'teie.email@naide.ee',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Nõustun uuesti kontakteerumisega',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Soovin saada uuringu aruande',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Hind',
    },
    critere_qualite: {
      label: 'Profiilide kvaliteet',
    },
    critere_rapidite: {
      label: 'Vastamise kiirus',
    },
    critere_conformite: {
      label: 'Juriidiline vastavus',
    },
    critere_flexibilite: {
      label: 'Paindlikkus',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Isiklik tugi',
    },
    service_garantie: {
      label: 'Asendamise garantii',
    },
    service_formation: {
      label: 'Eelkoolitus',
    },
    service_gestion: {
      label: 'Haldushaldus',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Koolitused ja sertifikaadid',
    },
    service_logement: {
      label: 'Abi elukoha leidmisel',
    },
    service_transport: {
      label: 'Transpordi tugi',
    },
    service_administratif: {
      label: 'Halduslik tugi',
    },
  },
};