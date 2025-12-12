/**
 * 🇱🇹 TRADUCTIONS LITUANIENNES (LT)
 * 
 * Traductions complètes pour le lituanien
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const lt: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profilis',
    section2: 'Patirtis',
    section3: 'Poreikiai',
    section4: 'Susidomėjimas',
    section5: 'Vizija',
    section6: 'Kontaktai',
    dashboard: 'Valdymo skydas',
    back_to_site: 'Grįžti į svetainę',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Valdymo skydas',
    tabs: {
      overview: 'Apžvalga',
      results: 'Rezultatai',
      questions: 'Klausimai',
      translations: 'Vertimai',
      export: 'Eksportas',
      integrations: 'Integracija',
      cms: 'CMS forma',
      settings: 'Nustatymai',
      prospects: 'Potencialūs klientai',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nauja',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Atsijungti',
      back_to_survey: 'Grįžti į apklausą',
      toggle_sidebar: 'Suskleisti/Išskleisti',
    },
    user: {
      welcome: 'Sveiki',
      logged_in_as: 'Prisijungęs kaip',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profilis',
      description: '4 klausimai • 2 min',
    },
    2: {
      title: 'Patirtis',
      description: '7 klausimai • 3 min',
    },
    3: {
      title: 'Poreikiai',
      description: '6 klausimai • 2 min',
    },
    4: {
      title: 'Susidomėjimas YoJob',
      description: '6 klausimai • 3 min',
    },
    5: {
      title: 'Ateities vizija',
      description: '2 klausimai • 1 min',
    },
    6: {
      title: 'Kontaktai',
      description: '1 klausimas • 1 min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Jūsų verslo profilis',
        description: 'Papasakokite mums apie savo agentūrą ir kompetenciją',
      },
      client: {
        title: '📋 Jūsų verslo profilis',
        description: 'Papasakokite mums apie savo įmonę ir įdarbinimo poreikius',
      },
      worker: {
        title: '📋 Jūsų profilis',
        description: 'Papasakokite mums apie savo profesinę patirtį',
      },
    },
    2: {
      agency: {
        title: '💼 Komandiravimo veikla',
        description: 'Jūsų patirtis komandiruojant darbuotojus',
      },
      client: {
        title: '💼 Jūsų įdarbinimo patirtis',
        description: 'Jūsų dabartinis įdarbinimas ir laikinas darbas',
      },
      worker: {
        title: '💼 Jūsų laikino darbo patirtis',
        description: 'Jūsų kelias kaip agentūros darbuotojo',
      },
    },
    3: {
      agency: {
        title: '🎯 Poreikiai ir įrankiai',
        description: 'Jūsų iššūkiai ir dabartiniai sprendimai',
      },
      client: {
        title: '🎯 Jūsų dabartiniai poreikiai',
        description: 'Iššūkiai ir lūkesčiai įdarbinant',
      },
      worker: {
        title: '🎯 Jūsų lūkesčiai',
        description: 'Kas jums svarbu užduotyje',
      },
    },
    4: {
      agency: {
        title: '⭐ Susidomėjimas Europos platforma',
        description: 'Atraskite mūsų inovatyvios rinkos viziją',
      },
      client: {
        title: '⭐ Susidomėjimas Europos platforma',
        description: 'Inovatyvus sprendimas jūsų poreikiams',
      },
      worker: {
        title: '⭐ Jūsų susidomėjimas platforma',
        description: 'Platforma lengvam užduočių paieškai',
      },
    },
    5: {
      agency: {
        title: '🔮 Ateities vizija',
        description: 'Biudžetas ir plėtros perspektyvos',
      },
      client: {
        title: '🔮 Jūsų būsimi prioritetai',
        description: 'Biudžetas ir įdarbinimo strategija',
      },
      worker: {
        title: '🔮 Jūsų tikslai',
        description: 'Jūsų artimiausi profesiniai projektai',
      },
    },
    6: {
      agency: {
        title: '📧 Pasilikite kontakte',
        description: 'Gaukite tyrimo rezultatus ir būkite informuoti',
      },
      client: {
        title: '📧 Pasilikite kontakte',
        description: 'Gaukite rezultatus ir mūsų rekomenacijas',
      },
      worker: {
        title: '📧 Pasilikite kontakte',
        description: 'Gaukite rezultatus ir galimybes',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Rinkos tyrimas',
  },
  
  // Hero
  hero: {
    title: 'Rinkos apklausa',
    subtitle: 'Padėkite mums geriau suprasti jūsų poreikius',
    description: 'Ši apklausa trunka maždaug 10-15 minučių. Jūsų atsakymai padės mums sukurti sprendimą, pritaikytą jūsų pramonės šakai.',
    cta_start: 'Pradėti apklausą',
    cta_dashboard: 'Atidaryti valdymo skydą',
    badge: 'Europos rinkos tyrimas',
    stat: {
      countries: '27 Europos šalys',
      questions: 'klausimai',
      benchmark: 'Gaukite 2025 m. etaloną',
      insights: 'Ekskluzyvūs rinkos įžvalgos',
      opportunities: 'Prioritetinė prieiga prie darbų',
    },
    footer: {
      info: 'klausimai • Anonimiškai • Atitinka BDAR',
      anonymous: 'Anonimiškai',
      gdpr: 'Atitinka BDAR',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Kas esate?',
    subtitle: 'Pasirinkite savo profilį klausimams pritaikyti',
    agency: 'Įdarbinimo agentūra',
    agency_description: 'Esate laikino įdarbinimo ar komandiravimo agentūra',
    client: 'Klientas',
    client_description: 'Esate įmonė, įdarbinanti agentūros darbuotojus',
    worker: 'Agentūros darbuotojas',
    worker_description: 'Esate agentūros ar komandiruotas darbuotojas',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Europos rinkos tyrimas - Įdarbinimas ir Laikinas darbas',
    title: 'Pasidalinkite savo patirtimi Europos rinkoje',
    subtitle: 'Pasirinkite savo profilį apklausai pradėti',
    cta: 'Spustelėkite pradėti →',
    trust: {
      secure: 'Saugūs duomenys',
      languages: '{count} prieinamos kalbos',
      languages_suffix: 'prieinamos kalbos',
      anonymous: 'Anonimiškai ir konfidencialiai',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Įdarbinimo agentūra',
      description: 'Esate Europos laikino įdarbinimo agentūra. Pasidalinkite savo komandiravimo patirtimi.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klientas',
      description: 'Įdarbinate agentūros darbuotojus. Pasidalinkite savo poreikiais ir lūkesčiais.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agentūros darbuotojas',
      description: 'Dirbate kaip agentūros darbuotojas. Pasidalinkite savo patirtimi iš lauko.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Ankstesnis',
    next: 'Kitas',
    submit: 'Siųsti atsakymus',
    submitting: 'Siunčiama...',
    back: 'Atgal',
    start: 'Pradėti',
  },
  
  // Confirmation
  confirmation: {
    title: 'Dėkojame už dalyvavimą!',
    subtitle: 'Jūsų atsakymai sėkmingai išsaugoti',
    message: 'Šiuo metu analizuojame visus atsakymus, kad sukurtume sprendimą, puikiai pritaikytą jūsų poreikiams.',
    cta_back: 'Grįžti į pagrindinį puslapį',
    cta_dashboard: 'Rodyti valdymo skydą',
  },
  
  // Progress
  progress: {
    section: 'Skyrius',
    question: 'Klausimas',
    section_completed: 'Skyrius baigtas',
    questions_remaining: '{count} likusių klausimų',
    time_remaining: 'Maždaug {time} liko',
  },
  
  // Common translations
  common: {
    oui: 'Taip',
    non: 'Ne',
    autre: 'Kita',
    loading: 'Įkeliama...',
    submit: 'Siųsti',
    next: 'Kitas',
    previous: 'Ankstesnis',
    skip: 'Praleisti',
    save: 'Išsaugoti',
    cancel: 'Atšaukti',
    close: 'Uždaryti',
    required: 'Privaloma',
    optional: 'Neprivaloma',
    error: 'Klaida',
    success: 'Sėkmė',
    completed: 'Baigta',
    inProgress: 'Vykdoma',
    notStarted: 'Nepradėta',
    profileAgency: 'Įdarbinimo agentūra',
    profileClient: 'Klientas',
    profileWorker: 'Agentūros darbuotojas',
    score_not_interested: 'Nedomina',
    score_very_interested: 'Labai domina',
  },
  
  // Sectors
  sectors: {
    btp: 'Statyba',
    industrie: 'Pramonė',
    logistique: 'Logistika',
    hotellerie: 'Svetingumas',
    sante: 'Sveikatos priežiūra',
    agriculture: 'Žemės ūkis',
    tech: 'Tech/IT',
    autres: 'Kita',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions LT
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Pavadinimas',
      placeholder: 'Organizacijos pavadinimas arba jūsų vardas ir pavardė',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Įkūrimo metai',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Jūsų įmonės įkūrimo metai',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Jūsų pilietybė',
      placeholder: 'pvz.: lenkiška, rumunų...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organizacijos dydis',
      options: {
        '1-9': '1-9 darbuotojai',
        '10-49': '10-49 darbuotojai',
        '50-249': '50-249 darbuotojai',
        '250+': '250+ darbuotojai',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Laikino darbo patirties metai',
      options: {
        '<1': 'Mažiau nei 1 metai',
        '1-3': '1-3 metai',
        '3-5': '3-5 metai',
        '5-10': '5-10 metų',
        '10+': 'Daugiau nei 10 metų',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Pagrindiniai sektoriai',
      description: 'Pasirinkite visus tinkamus sektorius',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Jūsų profesijos',
      description: 'Pasirinkite visas savo profesijas',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Jūsų agentūros šalis',
      placeholder: 'pvz.: Lenkija',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Šalis, kurioje veikia jūsų įmonė',
      placeholder: 'pvz.: Prancūzija',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Šalys, kuriose dirbote kaip agentūros darbuotojas',
      placeholder: 'pvz.: Prancūzija, Vokietija, Belgija...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Metinis komandiruotų darbuotojų apimtis',
      options: {
        '0': 'Dar nė vieno',
        '1-50': '1-50 darbuotojų',
        '51-200': '51-200 darbuotojų',
        '201-500': '201-500 darbuotojų',
        '500+': 'Daugiau nei 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Kiek agentūros darbuotojų įdarbinate per metus?',
      options: {
        '0': 'Šiuo metu nė vieno',
        '1-10': '1-10 žmonių',
        '11-50': '11-50 žmonių',
        '51-200': '51-200 žmonių',
        '200+': '200+ žmonių',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Kaip dažnai dirbate kaip agentūros darbuotojas?',
      options: {
        permanent: 'Reguliariai (visus metus)',
        saisonnier: 'Sezoniškai (tam tikrais mėnesiais)',
        occasionnel: 'Retkarčiais',
        jamais: 'Dar niekada (ieškau)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Iš kur atvyksta jūsų komandiruoti darbuotojai?',
      placeholder: 'pvz.: Lenkija, Rumunija, Bulgarija...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Paskirties šalys',
      description: 'Šalys, į kurias komandiruojate darbuotojus',
      placeholder: 'pvz.: Prancūzija, Vokietija, Belgija, Nyderlandai...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Agentūros darbuotojų, kuriuos įdarbinate, pilietybės',
      placeholder: 'pvz.: lenkiška, rumunų, bulgariška...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Jūsų pagrindinis iššūkis su tarptautiniu komandirovimu',
      options: {
        admin: 'Administracinis sudėtingumas (A1, SIPSI...)',
        conformite: 'Atitiktis taisyklėms keliose šalyse',
        cout: 'Valdymo kaštai ir laikas',
        langues: 'Kalbos barjerai',
        autre: 'Kita',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Jūsų pagrindinis iššūkis su Europos agentūros darbuotojais',
      options: {
        trouver: 'Patikimų agentūrų paieška',
        conformite: 'Teisinė atitiktis',
        qualite: 'Kokybė/įgūdžiai',
        cout: 'Per dideli kaštai',
        langues: 'Komunikacija / Kalbos',
        autre: 'Kita',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Jūsų pagrindinis iššūkis su laikinu darbu užsienyje',
      options: {
        admin: 'Administracinė dokumentacija',
        langue: 'Kalbos barjeras',
        logement: 'Būsto paieška',
        transport: 'Transportas',
        salaire: 'Problemos su apmokėjimu/atlyginimu',
        autre: 'Kita',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Nurodykite savo pagrindinį iššūkį',
      placeholder: 'Apibūdinkite savo pagrindinį iššūkį...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Kaip šiandien valdote komandiravimo paraiškas?',
      options: {
        interne: 'Vidinė komanda',
        externe: 'Išorės paslaugų teikėjas',
        mixte: 'Mišrus požiūris',
        manuel: 'Rankinis valdymas',
        logiciel: 'Specializuota programinė įranga',
        manuel: 'Rankiniu būdu (Excel, Word...)',
        logiciel_interne: 'Vidinė programinė įranga',
        prestataire: 'Išorės paslaugų teikėjas',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Kiek įdarbinimo agentūrų naudojate?',
      options: {
        '0': 'Nė vienos',
        '1': '1 agentūrą',
        '2-3': '2-3 agentūras',
        '4-10': '4-10 agentūrų',
        '10+': 'Daugiau nei 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kaip įdarbinate agentūros darbuotojus?',
      options: {
        agence_fr: 'Prancūzų įdarbinimo agentūros',
        agence_euro: 'Europos įdarbinimo agentūros',
        direct: 'Tiesioginis įdarbinimas',
        mixte: 'Mišrus',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Kaip ieškote laikino darbo?',
      options: {
        agence: 'Per įdarbinimo agentūras',
        bouche: 'Rekomendacija',
        internet: 'Internetiniai darbo portalai',
        direct: 'Tiesioginė paraiška',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Su kiek agentūrų bendradarbiaujate?',
      options: {
        '1': 'Tik 1 agentūra',
        '2-3': '2-3 agentūros',
        '4-10': '4-10 agentūrų',
        '10+': 'Daugiau nei 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Ar turėjote baudų ar incidentų, susijusių su komandiravimo atitikties taisyklėmis?',
      description: 'Jūsų atsakymas lieka anonimiškas',
      options: {
        jamais: 'Ne, niekada',
        rarement: 'Retai (1-2 kartus)',
        parfois: 'Kartais (3-5 kartus)',
        souvent: 'Dažnai (6+ kartus)',
        oui_souvent: 'Taip, dažnai',
        oui_rare: 'Taip, retkarčiais',
        non: 'Ne',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Ar tikrinate įdarbinimo agentūrų teisinę atitiktį?',
      options: {
        oui_systematique: 'Taip, sistemingai',
        oui_parfois: 'Taip, kartais',
        non: 'Ne',
        ne_sait_pas: 'Nežinau',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Ar turėjote problemų su laikinu darbu užsienyje?',
      options: {
        oui_graves: 'Taip, rimtų problemų',
        oui_mineurs: 'Taip, nedidelių problemų',
        non: 'Ne',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Ar turite biudžetą išorės paslaugoms komandiravimo valdymui?',
      options: {
        oui_important: 'Taip, reikšmingą',
        oui_modere: 'Taip, vidutinį',
        non: 'Ne',
        ne_sait_pas: 'Nežinau',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Kokie yra pagrindiniai kriterijai renkantis įdarbinimo agentūrą?',
      description: 'Pasirinkite kelis variantus',
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      label: 'Metinis biudžetas laikinajam darbui',
      options: {
        '0-50k': '€0 - €50 000',
        '50-200k': '€50 000 - €200 000',
        '200-500k': '€200 000 - €500 000',
        '500k+': '€500 000+',
        'inconnu': 'Nežinau',
      },
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Kaip patenkinti esate savo dabartinėmis darbo sąlygomis?',
      options: {
        tres_satisfait: 'Labai patenkintas',
        satisfait: 'Patenkintas',
        neutre: 'Neutralus',
        insatisfait: 'Nepatenkintas',
      },
    },
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      label: 'Ar esate patenkintas savo laikino darbo atlyginimu?',
      options: {
        '<1500': 'Mažiau nei €1 500',
        '1500-2500': '€1 500 - €2 500',
        '2500-3500': '€2 500 - €3 500',
        '3500+': '€3 500+',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Vidutinė jūsų komandiravimo užduočių trukmė',
      options: {
        '<1mois': 'Mažiau nei 1 mėnuo',
        '1-3mois': '1-3 mėnesiai',
        '3-6mois': '3-6 mėnesiai',
        '6-12mois': '6-12 mėnesių',
        '12+mois': 'Daugiau nei 12 mėnesių',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      label: 'Koks pajamų procentas prarandamas dėl administracinės sudėtingumo?',
      options: {
        'non': 'Ne, ne iš tikrųjų',
        'faible': 'Taip, mažas (< 5% pajamų)',
        'moyen': 'Taip, vidutinis (5-15% pajamų)',
        'important': 'Taip, reikšmingas (> 15% pajamų)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      label: 'Pasitenkinimas dabartinėmis laikino darbo agentūromis',
      options: {
        'tres_satisfait': 'Labai patenkintas',
        'satisfait': 'Patenkintas',
        'neutre': 'Neutralus',
        'insatisfait': 'Nepatenkintas',
        'tres_insatisfait': 'Labai nepatenkintas',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Koks yra jūsų metinis biudžetas laikinajam darbui?',
      options: {
        '<50k': 'Mažiau nei €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Daugiau nei €1M',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      label: 'Pasitenkinimas dabartinėmis laikino darbo agentūromis',
      options: {
        'tres_satisfait': 'Labai patenkintas',
        'satisfait': 'Patenkintas',
        'neutre': 'Neutralus',
        'insatisfait': 'Nepatenkintas',
        'tres_insatisfait': 'Labai nepatenkintas',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Jūsų pageidaujama užduoties trukmė',
      options: {
        court: 'Trumpa (< 3 mėnesiai)',
        moyen: 'Vidutinė (3-6 mėnesiai)',
        long: 'Ilga (> 6 mėnesiai)',
        indifferent: 'Man nesvarbu',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      label: 'Jūsų pagrindinės baimės',
      description: 'Pasirinkite visus tinkamus',
      options: {
        amendes: 'Baudos ir nuobaudos',
        reputation: 'Reputacija / Įvaizdis',
        penal: 'Baudžiamoji atsakomybė',
        delais: 'Užduočių vėlavimai',
        clients: 'Klientų praradimas',
        aucun: 'Jokių reikšmingų rizikų',
        sanctions: 'Nuobaudos/sankcijos',
        conformite: 'Atitiktis taisyklėms keliose šalyse',
        cout: 'Administraciniai kaštai',
        documentation: 'Dokumentų valdymas',
        responsabilite: 'Baudžiamoji atsakomybė',
        perte_clients: 'Klientų praradimas',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      label: 'Jūsų pagrindiniai poreikiai',
      description: 'Pasirinkite visus tinkamus',
      options: {
        fiabilite: 'Patikimų agentūrų paieška',
        conformite: 'Teisinė atitiktis',
        qualite: 'Kokybė/įgūdžiai',
        cout: 'Kaštai',
        disponibilite: 'Kandidatų prieinamumas',
        aucun: 'Jokių reikšmingų poreikių',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      label: 'Jūsų lūkesčiai laikiniam darbui užsienyje',
      description: 'Pasirinkite visus tinkamus',
      options: {
        salaire: 'Geresnis atlyginimas',
        conditions: 'Geresnės darbo sąlygos',
        stabilite: 'Stabilumas',
        experience: 'Tarptautinė patirtis',
        logement: 'Pagalba su būstu',
        aucun: 'Jokių specialių lūkesčių',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      label: 'Jūsų pagrindinės baimės',
      description: 'Pasirinkite visus tinkamus',
      options: {
        conformite: 'Teisinė atitiktis',
        qualite: 'Kokybė/įgūdžiai',
        communication: 'Komunikacija/Kalbos',
        cout: 'Netikėti kaštai',
        disponibilite: 'Kandidatų prieinamumas',
        aucun: 'Jokių reikšmingų baimių',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      label: 'Kokias problemas dažniausiai sutinkate?',
      description: 'Pasirinkite visus tinkamus',
      options: {
        paiement: 'Mokėjimo vėlavimai',
        conditions: 'Prastos sąlygos',
        contrat: 'Sutartys negerbiamos',
        logement: 'Netinkamas būstas',
        communication: 'Komunikacijos problemos',
        aucun: 'Jokių reikšmingų problemų',
      },
    },
    
    // Q15 : Problème (AGENCY)
    q15_probleme: {
      label: 'Kokią problemą norėtumėte išspręsti pirmiausia?',
      placeholder: 'Apibūdinkite savo prioritetinę problemą...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      label: 'Kokie yra jūsų prioritetiniai poreikiai?',
      placeholder: 'Pvz.: Rasti greitai, geresnę kokybę, kainas...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      label: 'Ką norėtumėte pagerinti savo užduotyse?',
      placeholder: 'Pvz.: Atlyginimas, būstas, pagalba, stabilumas...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      label: 'Ar naudojate ERP/valdymo programinę įrangą?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Kita',
        aucun: 'Jokios ERP',
        oui: 'Taip',
        non: 'Ne',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Kokia programinė įranga/ERP?',
      placeholder: 'Pvz.: SAP, Odoo, pasirinktinė...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Jūsų pagrindiniai atrankos kriterijai laikino darbo agentūroms',
      description: 'Pasirinkite savo 3 prioritetus',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Kas pagerintų jūsų laikino darbo patirtį?',
      description: 'Pasirinkite visus tinkamus',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      label: 'Ar pasiruošę pakeisti savo darbo įrankius?',
      options: {
        oui: 'Taip, jokių problemų',
        conditions: 'Taip, su sąlygomis',
        difficile: 'Sunku, bet atviras',
        non: 'Ne, neįmanoma',
        oui_rapidement: 'Taip, nedelsiant',
        oui_progressivement: 'Taip, palaipsniui',
        non_satisfait: 'Ne, patenkintas dabartiniais įrankiais',
        non_peur: 'Ne, bijau pokyčių',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Mėnesinis biudžetas laikino darbo įdarbinimo platformai',
      options: {
        '0': 'Nenoriu mokėti',
        '1-100': '€1 - €100/mėnesį',
        '100-500': '€100 - €500/mėnesį',
        '500-1000': '€500 - €1 000/mėnesį',
        '1000+': 'Daugiau nei €1 000/mėnesį',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Ar naudotumėte platformą laikino darbo paieškai užsienyje?',
      options: {
        oui_certainement: 'Taip, tikrai',
        oui_probablement: 'Taip, tikriausiai',
        peut_etre: 'Galbūt',
        non: 'Ne',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      label: 'Kaip jus domina Europos komandiravimo rinka?',
      description: 'Įvertinkite nuo 1 (nedomina) iki 10 (labai domina)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      label: 'Įdomiausios funkcijos',
      description: 'Pasirinkite savo 3 prioritetus',
      options: {
        sipsi: 'Automatinė SIPSI deklaracija',
        a1: 'A1 sertifikato valdymas',
        conformite: 'Atitikties valdymo skydelis',
        alertes: 'Įspėjimai ir atnaujinimai',
        documents: 'Dokumentų centralizavimas',
        marketplace: 'Agentūrų rinka',
        support: 'Daugiakalbė ekspertų pagalba',
        api: 'API integracija (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      label: 'Įdomiausios funkcijos',
      description: 'Pasirinkite visas, kurios jus domina',
      options: {
        recherche: 'Patikimų agentūrų paieška',
        comparaison: 'Kainos/kokybės palyginimas',
        avis: 'Patikrinti atsiliepimai',
        conformite: 'Atitikties garantija',
        support: 'Paskirta pagalba',
        facturation: 'Centralizuota apskaita',
        suivi: 'Realaus laiko stebėjimas',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      label: 'Įdomiausios funkcijos',
      description: 'Pasirinkite visas, kurios jus domina',
      options: {
        recherche: 'Darbų paieška',
        avis: 'Agentūrų vertinimai',
        logement: 'Pagalba su būstu',
        paiement: 'Saugus mokėjimas',
        support: 'Pagalba mano kalba',
        documents: 'Pagalba su administraciniais dokumentais',
        formation: 'Mokymo programos',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      label: 'Pageidaujamas kainų modelis',
      options: {
        mensuel: 'Fiksuota mėnesinė prenumerata',
        usage: 'Mokėti už naudojimą',
        annuel: 'Metinis planas (nuolaida)',
        gratuit: 'Nemokama darbuotojams',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      label: 'Mėnesinis biudžetas pilnam SaaS sprendimui',
      options: {
        '0-100': '€0 - €100/mėnesį',
        '100-300': '€100 - €300/mėnesį',
        '300-500': '€300 - €500/mėnesį',
        '500-1000': '€500 - €1 000/mėnesį',
        '1000+': 'Daugiau nei €1 000/mėnesį',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      label: 'Ar norėtumėte išbandyti ankstyvą versiją (MVP)?',
      options: {
        oui_gratuit: 'Taip, nemokamai',
        oui_reduc: 'Taip, su nuolaida',
        peut_etre: 'Galbūt, priklauso nuo funkcijų',
        non: 'Ne, nedomina',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Kaip matote savo vaidmenį Europos rinkoje?',
      options: {
        decideur: 'Galutinis sprendimus priimantis asmuo',
        influenceur: 'Įtakos darytėjas / Rekomendacija',
        utilisateur: 'Galutinis vartotojas',
        autre: 'Kita',
      },
    },
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Kaip matote savo komandiravimo veiklą per ateinančius 3 metus?',
      options: {
        forte_croissance: 'Spartus augimas',
        croissance: 'Vidutinis augimas',
        stable: 'Stabilu',
        decroissance: 'Mažėjimas',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Kaip matote savo laikino darbo poreikių raidą?',
      options: {
        hausse: 'Padidėjimas',
        stable: 'Stabilu',
        baisse: 'Sumažėjimas',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Kokie yra jūsų projektai artimiausius mėnesius?',
      options: {
        meme_secteur: 'Tęsti tame pačiame sektoriuje',
        changer_secteur: 'Pakeisti sektorių',
        se_former: 'Mokytis',
        entrepreneur: 'Tapti verslininkui',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Ar planuojate padidinti savo biudžetą išorės paslaugoms?',
      options: {
        oui_beaucoup: 'Taip, žymiai',
        oui_peu: 'Taip, šiek tiek',
        non: 'Ne',
        ne_sait_pas: 'Nežinau',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Ar planuojate padidinti savo įdarbinimo biudžetą?',
      options: {
        oui_beaucoup: 'Taip, žymiai',
        oui_peu: 'Taip, šiek tiek',
        non: 'Ne',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Ar pasiruošę persikraustyti dėl darbo?',
      options: {
        oui_europe: 'Taip, bet kur Europoje',
        oui_proche: 'Taip, kaimyninės šalys',
        non: 'Ne, tik mano šalyje',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'El. paštas (neprivaloma)',
      placeholder: 'jusu@email.lt',
      description: 'Rezultatams ir informacijai apie projektą gauti',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Verslo el. paštas (neprivaloma)',
      placeholder: 'kontaktai@jusųagentūra.lt',
      description: 'Rezultatams ir ekskluzyviai prieigai prie platformos gauti',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Verslo el. paštas (neprivaloma)',
      placeholder: 'kontaktai@jusu-imonė.lt',
      description: 'Rekomendacijoms, pritaikytoms jūsų poreikiams, gauti',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'El. paštas (neprivaloma)',
      placeholder: 'jusu@email.lt',
      description: 'Galimybėms, atitinkančioms jūsų profilį, gauti',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Telefonas (neprivaloma)',
      placeholder: '+370 123 45678',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Papildomi komentarai ar pasiūlymai',
      placeholder: 'Pasidalykite savo idėjomis, lūkesčiais ar konkrečiais poreikiais...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Rinkos vizija per ateinančius 3 metus',
      placeholder: 'Pasidalykite savo vizija...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Kiti poreikiai ar pasiūlymai',
      placeholder: 'Jūsų pasiūlymai mums įdomūs...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Darbo telefonas',
      placeholder: '+370 1234 5678',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Vardas',
      placeholder: 'Jūsų vardas',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Pavardė',
      placeholder: 'Jūsų pavardė',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'Įmonės kodas (neprivaloma)',
      placeholder: '123456789',
      description: 'Praturtinimui per VĮ Registrų centrą',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'El. paštas',
      placeholder: 'jusu.pastas@pavyzdys.lt',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Sutinku, kad vėl susisiektumėte',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Norėčiau gauti tyrimo ataskaitą',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Kaina',
    },
    critere_qualite: {
      label: 'Profilių kokybė',
    },
    critere_rapidite: {
      label: 'Atsakymo greitis',
    },
    critere_conformite: {
      label: 'Teisinė atitiktis',
    },
    critere_flexibilite: {
      label: 'Lankstumas',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Asmeninė pagalba',
    },
    service_garantie: {
      label: 'Pakeitimo garantija',
    },
    service_formation: {
      label: 'Išankstinis mokymas',
    },
    service_gestion: {
      label: 'Administracinis valdymas',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Mokymai ir sertifikatai',
    },
    service_logement: {
      label: 'Pagalba dėl būsto',
    },
    service_transport: {
      label: 'Transporto pagalba',
    },
    service_administratif: {
      label: 'Administracinė pagalba',
    },
  },
};