/**
 * 🇸🇮 TRADUCTIONS SLOVÈNES (SL)
 * 
 * Traductions complètes pour le slovène
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const sl: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profil',
    section2: 'Izkušnje',
    section3: 'Potrebe',
    section4: 'Interes',
    section5: 'Vizija',
    section6: 'Kontakt',
    dashboard: 'Nadzorna plošča',
    back_to_site: 'Nazaj na spletno stran',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Nadzorna plošča',
    tabs: {
      overview: 'Pregled',
      results: 'Rezultati',
      questions: 'Vprašanja',
      translations: 'Prevodi',
      export: 'Izvoz',
      integrations: 'Integracije',
      cms: 'CMS obrazec',
      settings: 'Nastavitve',
      prospects: 'Potencialni stranki',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Novo',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Odjava',
      back_to_survey: 'Nazaj na anketo',
      toggle_sidebar: 'Strni/Razširi',
    },
    user: {
      welcome: 'Dobrodošli',
      logged_in_as: 'Prijavljeni kot',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profil',
      description: '4 vprašanja • 2 min',
    },
    2: {
      title: 'Izkušnje',
      description: '7 vprašanj • 3 min',
    },
    3: {
      title: 'Potrebe',
      description: '6 vprašanj • 2 min',
    },
    4: {
      title: 'Interes za YoJob',
      description: '6 vprašanj • 3 min',
    },
    5: {
      title: 'Prihodnja vizija',
      description: '2 vprašanji • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 vprašanje • 1 min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Vaš poslovni profil',
        description: 'Povejte nam o vaši agenciji in strokovnosti',
      },
      client: {
        title: '📋 Vaš poslovni profil',
        description: 'Povejte nam o vašem podjetju in potrebah po zaposlovanju',
      },
      worker: {
        title: '📋 Vaš profil',
        description: 'Povejte nam o vaši poklicni ozadju',
      },
    },
    2: {
      agency: {
        title: '💼 Aktivnost napotitve',
        description: 'Vaše izkušnje z napotitvijo delavcev',
      },
      client: {
        title: '💼 Vaše izkušnje z zaposlovanjem',
        description: 'Vaše trenutno zaposlovanje in začasno delo',
      },
      worker: {
        title: '💼 Vaše izkušnje začasnega dela',
        description: 'Vaša pot kot agencijski delavec',
      },
    },
    3: {
      agency: {
        title: '🎯 Potrebe in orodja',
        description: 'Vaši izzivi in trenutne rešitve',
      },
      client: {
        title: '🎯 Vaše trenutne potrebe',
        description: 'Izzivi in pričakovanja pri zaposlovanju',
      },
      worker: {
        title: '🎯 Vaša pričakovanja',
        description: 'Kaj vam je pomembno pri angažmaju',
      },
    },
    4: {
      agency: {
        title: '⭐ Interes za evropsko platformo',
        description: 'Odkrijte našo vizijo inovativnega trga',
      },
      client: {
        title: '⭐ Interes za evropsko platformo',
        description: 'Inovativna rešitev za vaše potrebe',
      },
      worker: {
        title: '⭐ Vaš interes za platformo',
        description: 'Platforma za enostavno iskanje angažmajev',
      },
    },
    5: {
      agency: {
        title: '🔮 Prihodnja vizija',
        description: 'Proračun in obeti razvoja',
      },
      client: {
        title: '🔮 Vaše prihodnje prioritete',
        description: 'Proračun in strategija zaposlovanja',
      },
      worker: {
        title: '🔮 Vaši cilji',
        description: 'Vaši prihajajoči poklicni projekti',
      },
    },
    6: {
      agency: {
        title: '📧 Ostanite v stiku',
        description: 'Prejmite rezultate študije in bodite obveščeni',
      },
      client: {
        title: '📧 Ostanite v stiku',
        description: 'Prejmite rezultate in naša priporočila',
      },
      worker: {
        title: '📧 Ostanite v stiku',
        description: 'Prejmite rezultate in priložnosti',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Raziskava trga',
  },
  
  // Hero
  hero: {
    title: 'Anketa o trgu',
    subtitle: 'Pomagajte nam bolje razumeti vaše potrebe',
    description: 'Ta anketa traja približno 10-15 minut. Vaši odgovori nam bodo pomagali ustvariti rešitev, prilagojeno vaši industriji.',
    cta_start: 'Začnite anketo',
    cta_dashboard: 'Odpri nadzorno ploščo',
    badge: 'Evropska študija trga',
    stat: {
      countries: '27 evropskih držav',
      questions: 'vprašanja',
      benchmark: 'Pridobite benchmark 2025',
      insights: 'Ekskluzivni vpogledi v trg',
      opportunities: 'Prednostni dostop do delovnih mest',
    },
    footer: {
      info: 'vprašanja • Anonimno • Skladno z GDPR',
      anonymous: 'Anonimno',
      gdpr: 'Skladno z GDPR',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Kdo ste?',
    subtitle: 'Izberite svoj profil za prilagoditev vprašanj',
    agency: 'Agencija za zaposlovanje',
    agency_description: 'Ste agencija za začasno zaposlovanje ali napotitev',
    client: 'Stranka',
    client_description: 'Ste podjetje, ki zaposluje agencijske delavce',
    worker: 'Agencijski delavec',
    worker_description: 'Ste agencijski ali napoteni delavec',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Evropska študija trga - Zaposlovanje & Začasno delo',
    title: 'Delite svoje izkušnje z evropskim trgom',
    subtitle: 'Izberite svoj profil za začetek ankete',
    cta: 'Kliknite za začetek →',
    trust: {
      secure: 'Varni podatki',
      languages: '{count} razpoložljivih jezikov',
      languages_suffix: 'razpoložljivih jezikov',
      anonymous: 'Anonimno & zaupno',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Agencija za zaposlovanje',
      description: 'Ste evropska agencija za začasno zaposlovanje. Delite svoje izkušnje z napotitvijo.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Stranka',
      description: 'Zaposlujete agencijske delavce. Delite svoje potrebe in pričakovanja.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agencijski delavec',
      description: 'Delate kot agencijski delavec. Delite svoje izkušnje s terena.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Prejšnje',
    next: 'Naslednje',
    submit: 'Pošlji odgovore',
    submitting: 'Pošiljanje...',
    back: 'Nazaj',
    start: 'Začetek',
  },
  
  // Confirmation
  confirmation: {
    title: 'Hvala za sodelovanje!',
    subtitle: 'Vaši odgovori so bili uspešno shranjeni',
    message: 'Trenutno analiziramo vse odgovore, da bi ustvarili rešitev, popolnoma prilagojeno vašim potrebam.',
    cta_back: 'Nazaj na domačo stran',
    cta_dashboard: 'Prikaži nadzorno ploščo',
  },
  
  // Progress
  progress: {
    section: 'Odsek',
    question: 'Vprašanje',
    section_completed: 'Odsek zaključen',
    questions_remaining: '{count} preostalih vprašanj',
    time_remaining: 'Približno {time} preostalo',
  },
  
  // Common translations
  common: {
    oui: 'Da',
    non: 'Ne',
    autre: 'Drugo',
    loading: 'Nalaganje...',
    submit: 'Pošlji',
    next: 'Naslednje',
    previous: 'Prejšnje',
    skip: 'Preskoči',
    save: 'Shrani',
    cancel: 'Prekliči',
    close: 'Zapri',
    required: 'Obvezno',
    optional: 'Neobvezno',
    error: 'Napaka',
    success: 'Uspeh',
    completed: 'Zaključeno',
    inProgress: 'V teku',
    notStarted: 'Ni začeto',
    profileAgency: 'Agencija za zaposlovanje',
    profileClient: 'Stranka',
    profileWorker: 'Agencijski delavec',
  },
  
  // Sectors
  sectors: {
    btp: 'Gradbeništvo',
    industrie: 'Industrija',
    logistique: 'Logistika',
    hotellerie: 'Gostinstvo',
    sante: 'Zdravstvo',
    agriculture: 'Kmetijstvo',
    tech: 'Tech/IT',
    autres: 'Drugo',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions SL
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Ime',
      placeholder: 'Ime organizacije ali vaše polno ime',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Leto ustanovitve',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Leto ustanovitve vašega podjetja',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Vaša narodnost',
      placeholder: 'npr.: poljska, romunska...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Velikost organizacije',
      options: {
        '1-9': '1-9 zaposlenih',
        '10-49': '10-49 zaposlenih',
        '50-249': '50-249 zaposlenih',
        '250+': '250+ zaposlenih',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Leta izkušenj začasnega dela',
      options: {
        '<1': 'Manj kot 1 leto',
        '1-3': '1-3 leta',
        '3-5': '3-5 let',
        '5-10': '5-10 let',
        '10+': 'Več kot 10 let',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Glavni sektorji',
      description: 'Izberite vse ustrezne sektorje',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Vaši poklici',
      description: 'Izberite vse vaše poklice',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Država vaše agencije',
      placeholder: 'npr.: Poljska',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Država, v kateri vaše podjetje deluje',
      placeholder: 'npr.: Francija',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Države, v katerih ste delali kot agencijski delavec',
      placeholder: 'npr.: Francija, Nemčija, Belgija...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Letni obseg napotenih delavcev',
      options: {
        '0': 'Še noben',
        '1-50': '1-50 delavcev',
        '51-200': '51-200 delavcev',
        '201-500': '201-500 delavcev',
        '500+': 'Več kot 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Koliko agencijskih delavcev zaposlujete letno?',
      options: {
        '0': 'Trenutno nobenega',
        '1-10': '1-10 oseb',
        '11-50': '11-50 oseb',
        '51-200': '51-200 oseb',
        '200+': '200+ oseb',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Kako pogosto delate kot agencijski delavec?',
      options: {
        permanent: 'Redno (vse leto)',
        saisonnier: 'Sezonsko (določeni meseci)',
        occasionnel: 'Občasno',
        jamais: 'Še nikoli (iščem)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Od kod prihajajo vaši napoteni delavci?',
      placeholder: 'npr.: Poljska, Romunija, Bolgarija...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Ciljne države',
      description: 'Države, v katere napotujete delavce',
      placeholder: 'npr.: Francija, Nemčija, Belgija, Nizozemska...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Narodnosti agencijskih delavcev, ki jih zaposlujete',
      placeholder: 'npr.: poljska, romunska, bolgarska...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Vaš glavni izziv z mednarodno napotitvijo',
      options: {
        admin: 'Administrativna kompleksnost (A1, SIPSI...)',
        conformite: 'Skladnost s predpisi v več državah',
        cout: 'Stroški in čas upravljanja',
        langues: 'Jezikovne ovire',
        autre: 'Drugo',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Vaš glavni izziv z evropskimi agencijskimi delavci',
      options: {
        trouver: 'Iskanje zanesljivih agencij',
        conformite: 'Pravna skladnost',
        qualite: 'Kakovost/spretnosti',
        cout: 'Previsoki stroški',
        langues: 'Komunikacija / Jeziki',
        autre: 'Drugo',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Vaš glavni izziv z začasnim delom v tujini',
      options: {
        admin: 'Administrativno papirologija',
        langue: 'Jezikovna ovira',
        logement: 'Iskanje nastanitve',
        transport: 'Prevoz',
        salaire: 'Težave s plačilom/plačo',
        autre: 'Drugo',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Navedite svoj glavni izziv',
      placeholder: 'Opišite svoj glavni izziv...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Kako danes upravljate prijave za napotitev?',
      options: {
        interne: 'Notranja ekipa',
        externe: 'Zunanji ponudnik storitev',
        mixte: 'Mešan pristop',
        manuel: 'Ročno upravljanje',
        logiciel: 'Specializirana programska oprema',
        manuel: 'Ročno (Excel, Word...)',
        logiciel_interne: 'Notranja programska oprema',
        prestataire: 'Zunanji ponudnik storitev',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Koliko agencij za zaposlovanje uporabljate?',
      options: {
        '0': 'Nobene',
        '1': '1 agencijo',
        '2-3': '2-3 agencije',
        '4-10': '4-10 agencij',
        '10+': 'Več kot 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kako zaposlujete agencijske delavce?',
      options: {
        agence_fr: 'Francoske agencije za zaposlovanje',
        agence_euro: 'Evropske agencije za zaposlovanje',
        direct: 'Neposredno zaposlovanje',
        mixte: 'Mešano',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Kako iščete začasno delo?',
      options: {
        agence: 'Preko agencij za zaposlovanje',
        bouche: 'Priporočilo',
        internet: 'Spletni portali za iskanje dela',
        direct: 'Neposredna prijava',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'S koliko agencijami sodelujete?',
      options: {
        '1': 'Samo 1 agencija',
        '2-3': '2-3 agencije',
        '4-10': '4-10 agencij',
        '10+': 'Več kot 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Ali ste imeli kazni ali incidente, povezane s skladnostjo s predpisi o napotitvi?',
      description: 'Vaš odgovor ostaja anonimen',
      options: {
        jamais: 'Ne, nikoli',
        rarement: 'Redko (1-2 krat)',
        parfois: 'Včasih (3-5 krat)',
        souvent: 'Pogosto (6+ krat)',
        oui_souvent: 'Da, pogosto',
        oui_rare: 'Da, občasno',
        non: 'Ne',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Ali preverjate pravno skladnost agencij za zaposlovanje?',
      options: {
        oui_systematique: 'Da, sistematično',
        oui_parfois: 'Da, včasih',
        non: 'Ne',
        ne_sait_pas: 'Ne vem',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Ali ste imeli težave z začasnim delom v tujini?',
      options: {
        oui_graves: 'Da, resne težave',
        oui_mineurs: 'Da, manjše težave',
        non: 'Ne',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Ali imate proračun za zunanje storitve za upravljanje napotitve?',
      options: {
        oui_important: 'Da, pomemben',
        oui_modere: 'Da, zmeren',
        non: 'Ne',
        ne_sait_pas: 'Ne vem',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Kateri so vaši glavni kriteriji pri izbiri agencije za zaposlovanje?',
      description: 'Izberite več možnosti',
    },
    
    // Q12 : Budget client (CLIENT) - Version intérim
    q12_budget_client: {
      label: 'Letni proračun, namenjen začasnemu delu',
      options: {
        '0-50k': '0-50 000 €',
        '50-200k': '50 000-200 000 €',
        '200-500k': '200 000-500 000 €',
        '500k+': '500 000+ €',
        inconnu: 'Ne vem',
      },
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Kako zadovoljni ste s svojimi trenutnimi delovnimi pogoji?',
      options: {
        tres_satisfait: 'Zelo zadovoljen',
        satisfait: 'Zadovoljen',
        neutre: 'Nevtralen',
        insatisfait: 'Nezadovoljen',
      },
    },
    
    // Q12ter : Salaire moyen (WORKER)
    q12_salaire: {
      label: 'Povprečna mesečna plača vaših misij',
      options: {
        '<1500': 'Manj kot 1 500 €',
        '1500-2500': '1 500-2 500 €',
        '2500-3500': '2 500-3 500 €',
        '3500+': '3 500+ €',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Povprečno trajanje vaših misij napotitve',
      options: {
        '<1mois': 'Manj kot 1 mesec',
        '1-3mois': '1-3 mesece',
        '3-6mois': '3-6 mesecev',
        '6-12mois': '6-12 mesecev',
        '12+mois': 'Več kot 12 mesecev',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Kakšen je vaš letni proračun za začasno delo?',
      options: {
        '<50k': 'Manj kot €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Več kot €1M',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Vaše preferirano trajanje angažmaja',
      options: {
        court: 'Kratko (< 3 mesece)',
        moyen: 'Srednje (3-6 mesecev)',
        long: 'Dolgo (> 6 mesecev)',
        indifferent: 'Vseeno mi je',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      label: 'Izguba dobička zaradi omejitev napotitve?',
      options: {
        non: 'Ne, ne res',
        faible: 'Da, nizka (< 5% prihodkov)',
        moyen: 'Da, srednja (5-15% prihodkov)',
        important: 'Da, pomembna (> 15% prihodkov)',
      },
    },
    
    // Q13bis : Satisfaction agences (CLIENT)
    q13_satisfaction: {
      label: 'Zadovoljstvo z vašimi trenutnimi agencijami',
      options: {
        tres_satisfait: 'Zelo zadovoljen',
        satisfait: 'Zadovoljen',
        neutre: 'Nevtralen',
        insatisfait: 'Nezadovoljen',
        tres_insatisfait: 'Zelo nezadovoljen',
      },
    },
    
    // Q13ter : Satisfaction agences (WORKER)
    q13_satisfaction_worker: {
      label: 'Zadovoljstvo z vašimi trenutnimi agencijami',
      options: {
        tres_satisfait: 'Zelo zadovoljen',
        satisfait: 'Zadovoljen',
        neutre: 'Nevtralen',
        insatisfait: 'Nezadovoljen',
        tres_insatisfait: 'Zelo nezadovoljen',
      },
    },
    
    // Q14 : Préoccupations risques (AGENCY)
    q14_risques: {
      label: 'Katera tveganja vas najbolj skrbijo?',
      options: {
        amendes: 'Kazni in sankcije',
        reputation: 'Ugled / Podoba',
        penal: 'Kazenska odgovornost',
        delais: 'Zamude pri misijah',
        clients: 'Izguba strank',
        aucun: 'Nobeno veliko tveganje',
      },
    },
    
    // Q14bis : Préoccupations client (CLIENT)
    q14_risques_client: {
      label: 'Katera tveganja vas najbolj skrbijo?',
      options: {
        conformite: 'Neskladnost s predpisi',
        qualite: 'Nezadostna kakovost',
        fiabilite: 'Zanesljivost agencij',
        cout: 'Nepričakovani stroški',
        disponibilite: 'Razpoložljivost kandidatov',
        aucun: 'Nobeno veliko tveganje',
      },
    },
    
    // Q14ter : Préoccupations worker (WORKER)
    q14_risques_worker: {
      label: 'S katerimi težavami se najpogosteje srečujete?',
      options: {
        paiement: 'Zamude pri plačilih',
        conditions: 'Slabi pogoji',
        contrat: 'Neupoštevane pogodbe',
        logement: 'Neprimerna nastanitev',
        communication: 'Komunikacijske težave',
        aucun: 'Brez večjih težav',
      },
    },
    
    // Q14 : Besoins client (CLIENT)
    q14_besoins_client: {
      label: 'Vaše glavne potrebe',
      description: 'Izberite vse ustrezne',
      options: {
        fiabilite: 'Iskanje zanesljivih agencij',
        conformite: 'Pravna skladnost',
        qualite: 'Kakovost/spretnosti',
        cout: 'Stroški',
        disponibilite: 'Razpoložljivost kandidatov',
        aucun: 'Ni večjih potreb',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      label: 'Vaša pričakovanja za začasno delo v tujini',
      description: 'Izberite vse ustrezne',
      options: {
        salaire: 'Boljša plača',
        conditions: 'Boljši delovni pogoji',
        stabilite: 'Stabilnost',
        experience: 'Mednarodne izkušnje',
        logement: 'Pomoč pri nastanitvah',
        aucun: 'Ni posebnih pričakovanj',
      },
    },
    
    // Q15 : Plus gros problème (AGENCY)
    q15_probleme: {
      label: 'Kakšen je vaš največji problem z napotitvijo?',
      placeholder: 'Opišite v nekaj stavkih...',
    },
    
    // Q15bis : Besoins prioritaires (CLIENT)
    q15_besoins_client: {
      label: 'Kakšne so vaše prednostne potrebe?',
      placeholder: 'Npr.: Hitro iskanje, boljša kakovost, cena...',
    },
    
    // Q15ter : Améliorations souhaitées (WORKER)
    q15_ameliorations: {
      label: 'Kaj bi želeli izboljšati pri svojih misijah?',
      placeholder: 'Npr.: Plača, nastanitev, podpora, stabilnost...',
    },
    
    // Q16_autre : Précision ERP (AGENCY only)
    q16_autre: {
      label: 'Navedite svoj ERP',
      placeholder: 'Ime programske opreme...',
    },
    
    // Q16 : Nom ERP (AGENCY)
    q16_nom_erp: {
      label: 'Katera programska oprema/ERP?',
      placeholder: 'Npr.: SAP, Odoo, lastna...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Vaši glavni kriteriji izbire agencij za zaposlovanje',
      description: 'Izberite svoja prva 3',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Kaj bi izboljšalo vašo izkušnjo začasnega dela?',
      description: 'Izberite vse ustrezne',
    },
    
    // Q17 : Migration vers nouvelle solution (AGENCY only)
    q17_migration: {
      label: 'Pripravljeni za prehod na novo rešitev?',
      options: {
        oui: 'Da, brez težav',
        conditions: 'Da, pod pogoji',
        difficile: 'Težko, vendar odprt',
        non: 'Ne, nepredvidljivo',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Mesečni proračun za platformo zaposlovanja',
      options: {
        '0': 'Ne želim plačati',
        '1-100': '€1 - €100/mesec',
        '100-500': '€100 - €500/mesec',
        '500-1000': '€500 - €1 000/mesec',
        '1000+': 'Več kot €1 000/mesec',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Bi uporabljali platformo za iskanje začasnega dela v tujini?',
      options: {
        oui_certainement: 'Da, zagotovo',
        oui_probablement: 'Da, verjetno',
        peut_etre: 'Morda',
        non: 'Ne',
      },
    },
    
    // SECTION 4 : INTÉRÊT PLATEFORME YOJOB
    
    // Q18 : Score d'intérêt (ALL)
    q18_score: {
      label: 'Interes za platformo YoJob (0-10)',
      description: '0 = Nezainteresiran, 10 = Zelo zainteresiran',
    },
    
    // Q19 : Fonctionnalités intéressantes (AGENCY)
    q19_features: {
      label: 'Najbolj zanimive funkcionalnosti',
      options: {
        sipsi: 'Avtomatska prijava SIPSI',
        a1: 'Upravljanje certifikatov A1',
        conformite: 'Nadzorna plošča za skladnost',
        alertes: 'Opozorila in podaljšanja',
        documents: 'Centralizacija dokumentov',
        marketplace: 'Tržnica agencij',
        support: 'Ekspertna večjezična podpora',
        api: 'Integracija API (ERP)',
      },
    },
    
    // Q19bis : Fonctionnalités intéressantes (CLIENT)
    q19_features_client: {
      label: 'Najbolj zanimive funkcionalnosti',
      options: {
        recherche: 'Iskanje zanesljivih agencij',
        comparaison: 'Primerjava cena/kakovost',
        avis: 'Preverjene ocene',
        conformite: 'Garancija skladnosti',
        support: 'Namenjena podpora',
        facturation: 'Centralizirano fakturiranje',
        suivi: 'Sledenje v realnem času',
      },
    },
    
    // Q19ter : Fonctionnalités intéressantes (WORKER)
    q19_features_worker: {
      label: 'Najbolj zanimive funkcionalnosti',
      options: {
        recherche: 'Iskanje misij',
        avis: 'Ocene agencij',
        logement: 'Pomoč pri nastanitvah',
        paiement: 'Varno plačilo',
        support: 'Podpora v mojem jeziku',
        documents: 'Pomoč pri administrativnih dokumentih',
        formation: 'Kvalifikacijska usposabljanja',
      },
    },
    
    // Q20 : Modèle de tarification (ALL)
    q20_prix: {
      label: 'Preferiran cenovni model',
      options: {
        mensuel: 'Fiksna mesečna naročnina',
        usage: 'Pay-as-you-go (glede na uporabo)',
        annuel: 'Letni paket (popust)',
        gratuit: 'Brezplačno za delavce',
      },
    },
    
    // Q21 : Budget mensuel (AGENCY & CLIENT)
    q21_budget_mensuel: {
      label: 'Sprejemljiv mesečni proračun',
      options: {
        '0-100': '0-100 € / mesec',
        '100-300': '100-300 € / mesec',
        '300-500': '300-500 € / mesec',
        '500-1000': '500-1 000 € / mesec',
        '1000+': '1 000+ € / mesec',
      },
    },
    
    // Q22 : Test MVP (ALL)
    q22_mvp: {
      label: 'Pripravljeni testirati MVP (beta različica)?',
      options: {
        oui_gratuit: 'Da, brezplačno',
        oui_reduc: 'Da, s popustom',
        peut_etre: 'Morda, odvisno od funkcionalnosti',
        non: 'Ne, nezainteresiran',
      },
    },
    
    // Q23 : Rôle dans décision (AGENCY & CLIENT)
    q23_role: {
      label: 'Vloga pri nakupni odločitvi',
      options: {
        decideur: 'Končni odločevalec',
        influenceur: 'Vplivar / Priporočilo',
        utilisateur: 'Končni uporabnik',
        autre: 'Drugo',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Bi vas zanimala evropska platforma za ponujanje vaših storitev?',
      description: 'Tržnica za povečanje vaše vidnosti',
      options: {
        tres_interesse: 'Zelo zainteresiran',
        interesse: 'Zainteresiran',
        neutre: 'Nevtralen',
        pas_interesse: 'Nezainteresiran',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Bi vas zanimala platforma za enostavno iskanje evropskih agencij?',
      options: {
        tres_interesse: 'Zelo zainteresiran',
        interesse: 'Zainteresiran',
        neutre: 'Nevtralen',
        pas_interesse: 'Nezainteresiran',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Bi vas zanimala platforma za iskanje angažmajev?',
      options: {
        tres_interesse: 'Zelo zainteresiran',
        interesse: 'Zainteresiran',
        neutre: 'Nevtralen',
        pas_interesse: 'Nezainteresiran',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Katere funkcionalnosti bi bile najbolj koristne?',
      description: 'Izberite več možnosti',
      options: {
        marketplace: 'Tržnica storitev',
        admin: 'Avtomatizirana administracija',
        conformite: 'Preverjanja skladnosti',
        payment: 'Integrirane plačila',
        support: 'Večjezična podpora',
        autre: 'Drugo',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Katere funkcionalnosti bi bile najbolj koristne?',
      description: 'Izberite več možnosti',
      options: {
        comparaison: 'Primerjava agencij',
        avis: 'Preverjene ocene',
        suivi: 'Sledenje misij',
        documentation: 'Centralizirana dokumentacija',
        facturation: 'Upravljanje faktur',
        autre: 'Drugo',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Katere funkcionalnosti bi bile najbolj koristne?',
      description: 'Izberite več možnosti',
      options: {
        recherche: 'Napredno iskanje angažmajev',
        alertes: 'Obvestila o novih angažmajih',
        documents: 'Upravljanje dokumentov',
        avis: 'Ocene agencij',
        support: 'Večjezična podpora',
        autre: 'Drugo',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Katera bi bila vaša največja ovira za uporabo take platforme?',
      options: {
        cout: 'Stroški',
        complexite: 'Preveč kompleksno',
        confiance: 'Pomanjkanje zaupanja',
        changement: 'Ne želim spremeniti',
        aucun: 'Ni ovir',
        autre: 'Drugo',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Katera bi bila vaša največja ovira?',
      options: {
        cout: 'Stroški',
        confiance: 'Zaupanje v agencije',
        complexite: 'Preveč kompleksno',
        aucun: 'Ni ovir',
        autre: 'Drugo',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Katera bi bila vaša največja ovira?',
      options: {
        complexite: 'Preveč kompleksno',
        confiance: 'Zaupanje v platformo',
        acces: 'Dostop do tehnologije',
        aucun: 'Ni ovir',
        autre: 'Drugo',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Kateri cenovni model se vam zdi najprimernejši?',
      options: {
        commission: 'Provizija na misijo',
        abonnement: 'Mesečna naročnina',
        freemium: 'Brezplačno + premium možnosti',
        autre: 'Drugo',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Katere storitve bi najbolj cenili?',
      description: 'Izberite več možnosti',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Katere storitve bi najbolj cenili?',
      description: 'Izberite več možnosti',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Bi priporočili tako platformo kolegom?',
      options: {
        certainement: 'Zagotovo',
        probablement: 'Verjetno',
        peut_etre: 'Morda',
        probablement_pas: 'Verjetno ne',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Bi priporočili tako rešitev?',
      options: {
        certainement: 'Zagotovo',
        probablement: 'Verjetno',
        peut_etre: 'Morda',
        probablement_pas: 'Verjetno ne',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Bi priporočili tako platformo?',
      options: {
        certainement: 'Zagotovo',
        probablement: 'Verjetno',
        peut_etre: 'Morda',
        probablement_pas: 'Verjetno ne',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Bi želeli sodelovati v beta fazi?',
      options: {
        oui_immediat: 'Da, takoj',
        oui_plus_tard: 'Da, ampak kasneje',
        non: 'Ne',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Bi želeli sodelovati pri testiranju?',
      options: {
        oui_immediat: 'Da, takoj',
        oui_plus_tard: 'Da, ampak kasneje',
        non: 'Ne',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Bi želeli sodelovati pri testiranju?',
      options: {
        oui_immediat: 'Da, takoj',
        oui_plus_tard: 'Da, ampak kasneje',
        non: 'Ne',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Kako vidite svojo dejavnost napotitve v naslednjih 3 letih?',
      options: {
        forte_croissance: 'Močna rast',
        croissance: 'Zmerna rast',
        stable: 'Stabilno',
        decroissance: 'Upad',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Kako vidite razvoj svojih potreb po začasnem delu?',
      options: {
        hausse: 'Povečanje',
        stable: 'Stabilno',
        baisse: 'Upad',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Kateri so vaši projekti v naslednjih mesecih?',
      options: {
        meme_secteur: 'Nadaljevati v istem sektorju',
        changer_secteur: 'Spremeniti sektor',
        se_former: 'Izobraževati se',
        entrepreneur: 'Postati podjetnik',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Ali načrtujete povečanje svojega proračuna za zunanje storitve?',
      options: {
        oui_beaucoup: 'Da, občutno',
        oui_peu: 'Da, malo',
        non: 'Ne',
        ne_sait_pas: 'Ne vem',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Ali načrtujete povečanje svojega proračuna za zaposlovanje?',
      options: {
        oui_beaucoup: 'Da, občutno',
        oui_peu: 'Da, malo',
        non: 'Ne',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Ste pripravljeni preseliti se zaradi dela?',
      options: {
        oui_europe: 'Da, kjerkoli v Evropi',
        oui_proche: 'Da, sosednje države',
        non: 'Ne, samo moja država',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'E-pošta (neobvezno)',
      placeholder: 'vas@email.si',
      description: 'Za prejemanje rezultatov in informacij o projektu',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Poslovna e-pošta (neobvezno)',
      placeholder: 'kontakt@vasaagencija.si',
      description: 'Za prejemanje rezultatov in ekskluziven dostop do platforme',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Poslovna e-pošta (neobvezno)',
      placeholder: 'kontakt@vase-podjetje.si',
      description: 'Za prejemanje priporočil, prilagojenih vašim potrebam',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'E-pošta (neobvezno)',
      placeholder: 'vas@email.si',
      description: 'Za prejemanje priložnosti, ki ustrezajo vašemu profilu',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Telefon (neobvezno)',
      placeholder: '+386 1 234 5678',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Dodatne pripombe ali predlogi',
      placeholder: 'Delite svoje ideje, pričakovanja ali specifične potrebe...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Vizija trga v naslednjih 3 letih',
      placeholder: 'Delite svojo vizijo...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Druge potrebe ali predlogi',
      placeholder: 'Vaši predlogi nas zanimajo...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Poslovna telefonska številka',
      placeholder: '+386 1 234 5678',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Ime',
      placeholder: 'Vaše ime',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Priimek',
      placeholder: 'Vaš priimek',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'SIRET ali SIREN (neobvezno)',
      placeholder: '123 456 789 00012',
      description: 'Za obogat itev preko Pappers/Société.com',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-pošta',
      placeholder: 'vasa.eposta@primer.si',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Strinjam se, da me kontaktirate',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Želim prejeti poročilo študije',
    },
  },
};