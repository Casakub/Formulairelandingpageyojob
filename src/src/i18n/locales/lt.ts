/**
 * 🇱🇹 LIETUVIŲ VERTIMAI (LT)
 *
 * Pilnas lietuviškas vertimas
 * Bazė: en.ts (tokia pati struktūra)
 *
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const lt: TranslationBundle = {
  // Paveldi trūkstamus raktus iš FR
  ...fr,

  // Navigacija
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
      integrations: 'Integracijos',
      cms: 'Formos CMS',
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

  // Skyriai
  section: {
    1: {
      title: 'Agentūros profilis',
      description: '4 klausimai • 2 min',
    },
    2: {
      title: 'Komandiravimas',
      description: '7 klausimai • 3 min',
    },
    3: {
      title: 'Poreikiai',
      description: '6 klausimai • 2 min',
    },
    4: {
      title: 'YoJob interesas',
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

  // Antraštė
  header: {
    title: 'YoJob',
    subtitle: 'Rinkos tyrimas',
  },

  // Hero
  hero: {
    title: 'Rinkos apklausa',
    subtitle: 'Padėkite mums geriau suprasti jūsų poreikius',
    description:
      'Apklausa trunka apie 10–15 minučių. Jūsų atsakymai padės mums sukurti sprendimą, pritaikytą jūsų sektoriui.',
    cta_start: 'Pradėti apklausą',
    cta_dashboard: 'Atidaryti valdymo skydą',
    badge: 'Europos rinkos tyrimas',
    stat: {
      countries: '27 Europos šalys',
      questions: 'klausimai',
      benchmark: 'Gaukite 2025 m. etaloną',
      insights: 'Išskirtinės rinkos įžvalgos',
      opportunities: 'Prioritetinė prieiga prie darbo pasiūlymų',
    },
    footer: {
      info: 'klausimai • Anonimiška • BDAR atitiktis',
      anonymous: 'Anonimiška',
      gdpr: 'BDAR atitiktis',
    },
  },

  // Respondentų tipas
  respondent_type: {
    title: 'Kas esate?',
    subtitle: 'Pasirinkite profilį, kad pritaikytume klausimus',
    agency: 'Laikinojo įdarbinimo agentūra',
    agency_description: 'Esate laikinojo įdarbinimo ar komandiravimo agentūra',
    client: 'Klientas',
    client_description: 'Esate įmonė, kuri samdo agentūros darbuotojus',
    worker: 'Agentūros darbuotojas',
    worker_description: 'Esate agentūros ar komandiruotas darbuotojas',
  },

  // Respondentų pasirinkimas
  selector: {
    badge: '🌍 Europos rinkos tyrimas – Įdarbinimas ir laikinas darbas',
    title: 'Pasidalinkite savo patirtimi Europos rinkoje',
    subtitle: 'Pasirinkite profilį ir pradėkite apklausą',
    cta: 'Spustelėkite pradėti →',
    trust: {
      secure: 'Saugūs duomenys',
      languages: '{count} prieinamos kalbos',
      languages_suffix: 'prieinamos kalbos',
      anonymous: 'Anonimiška ir konfidencialu',
    },
  },

  // Kortelių profiliai
  respondent: {
    agency: {
      label: 'Laikinojo įdarbinimo agentūra',
      description:
        'Esate Europos laikinojo įdarbinimo agentūra. Pasidalinkite komandiravimo patirtimi.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klientas',
      description: 'Samdote agentūros darbuotojus. Pasidalinkite poreikiais ir lūkesčiais.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agentūros darbuotojas',
      description: 'Dirbate kaip agentūros darbuotojas. Pasidalinkite praktine patirtimi.',
      estimatedTime: '10 min',
    },
  },

  // Mygtukai
  button: {
    previous: 'Ankstesnis',
    next: 'Kitas',
    submit: 'Pateikti atsakymus',
    submitting: 'Siunčiama...',
    back: 'Atgal',
    start: 'Pradėti',
  },

  // Patvirtinimas
  confirmation: {
    title: 'Ačiū už dalyvavimą! 🙏',
    subtitle: 'Jūsų atsakymai sėkmingai išsaugoti',
    message: 'Šiuo metu analizuojame visus atsakymus, kad sukurtume sprendimą, puikiai pritaikytą jūsų poreikiams.',
    cta_back: 'Grįžti į pagrindinį puslapį',
    cta_dashboard: 'Žiūrėti valdymo skydą',
    description: 'Jūsų nuomonė yra vertinga ir padeda formuoti YoJob ateitį.',
    cta: 'Grįžti į YoJob svetainę',
    
    reward: {
      report: {
        title: 'Ataskaita "Tendencijos 2025"',
        description: 'Išsiųsta per 3 savaites'
      },
      earlyaccess: {
        title: 'Ankstyvoji prieiga prie YoJob',
        description: 'Top 100 dalyvių'
      }
    },
    
    thanks: {
      title: '🎁 Kaip padėka už dalyvavimą:',
      item1: '• Ekskliatyvi ataskaita "Komandiruočių tendencijos 2025"',
      item2: '• Top 100 dalyvių = 3 mėnesiai nemokamos prieigos prie YoJob (vertė 500€)'
    }
  },

  // Progresas
  progress: {
    section: 'Skyrius',
    question: 'Klausimas',
    section_completed: 'Skyrius užbaigtas',
    questions_remaining: '{count} likusių klausimų',
    time_remaining: 'Apie {time} liko',
  },

  // Bendri vertimai
  common: {
    oui: 'Taip',
    non: 'Ne',
    autre: 'Kita',
    loading: 'Kraunama...',
    submit: 'Pateikti',
    next: 'Kitas',
    previous: 'Ankstesnis',
    skip: 'Praleisti',
    save: 'Išsaugoti',
    cancel: 'Atšaukti',
    close: 'Uždaryti',
    required: 'Privaloma',
    optional: 'Neprivaloma',
    error: 'Klaida',
    success: 'Sėkmingai',
    completed: 'Baigta',
    inProgress: 'Vykdoma',
    notStarted: 'Nepradėta',
    profileAgency: 'Laikinojo įdarbinimo agentūra',
    profileClient: 'Klientas',
    profileWorker: 'Agentūros darbuotojas',
    score_not_interested: 'Nedomina',
    score_very_interested: 'Labai domina',
  },

  // Sektoriai
  sectors: {
    btp: 'Statyba',
    industrie: 'Pramonė',
    logistique: 'Logistika',
    hotellerie: 'Svetingumas',
    sante: 'Sveikatos priežiūra',
    agriculture: 'Žemės ūkis',
    tech: 'Technologijos/IT',
    autres: 'Kita',
  },

  // Klausimai – paveldi iš FR ir perrašo vertimais LT
  questions: {
    ...fr.questions,

    // Q1 : Pavadinimas
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Pavadinimas',
      placeholder: 'Organizacijos pavadinimas arba jūsų vardas ir pavardė',
    },

    // Q2 : Įkūrimo metai (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Įkūrimo metai',
      placeholder: '2015',
    },

    // Q2 : Įkūrimo metai (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Jūsų įmonės įkūrimo metai',
      placeholder: '2010',
    },

    // Q2 : Pilietybė (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Jūsų pilietybė',
      placeholder: 'Pvz.: lenkų, rumunų...',
    },

    // Q3 : Dydis (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Organizacijos dydis',
      options: {
        '1-9': '1-9 darbuotojų',
        '10-49': '10-49 darbuotojų',
        '50-249': '50-249 darbuotojų',
        '250+': '250+ darbuotojų',
      },
    },

    // Q3 : Patirtis (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Laikino darbo patirtis (metai)',
      options: {
        '<1': 'Mažiau nei 1 metai',
        '1-3': '1-3 metai',
        '3-5': '3-5 metai',
        '5-10': '5-10 metų',
        '10+': 'Daugiau nei 10 metų',
      },
    },

    // Q4 : Sektoriai
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Pagrindiniai veiklos sektoriai',
      description: 'Pasirinkite visus aktualius sektorius',
    },

    // Q4 : Profesijos (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Jūsų profesijos',
      description: 'Pasirinkite visas savo profesijas',
    },

    // Q5 : Šalis (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Jūsų agentūros šalis',
      placeholder: 'Pvz.: Lenkija',
    },

    // Q5 : Lokacija (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Šalis, kurioje veikia jūsų įmonė',
      placeholder: 'Pvz.: Prancūzija',
    },

    // Q5 : Darbo šalys (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Šalys, kuriose dirbote kaip agentūros darbuotojas',
      placeholder: 'Pvz.: Prancūzija, Vokietija, Belgija...',
    },

    // Q6 : Apimtis (AGENCY)
    q6_volume: {
      label: 'Metinis komandiruotų darbuotojų skaičius',
      options: {
        '0': 'Dar nėra',
        '1-50': '1-50 darbuotojų',
        '51-200': '51-200 darbuotojų',
        '201-500': '201-500 darbuotojų',
        '500+': 'Daugiau nei 500',
      },
    },

    // Q6 : Apimtis klientui (CLIENT)
    q6_volume_client: {
      label: 'Kiek agentūros darbuotojų įdarbinat per metus?',
      options: {
        '0': 'Šiuo metu nė vieno',
        '1-10': '1-10 žmonių',
        '11-50': '11-50 žmonių',
        '51-200': '51-200 žmonių',
        '200+': '200+ žmonių',
      },
    },

    // Q6 : Dažnis (WORKER)
    q6_frequence: {
      label: 'Kaip dažnai dirbate kaip laikinas darbuotojas?',
      options: {
        permanent: 'Reguliariai (visus metus)',
        saisonnier: 'Sezoniškai (tam tikrais mėnesiais)',
        occasionnel: 'Kartais',
        jamais: 'Dar niekada (ieškau)',
      },
    },

    // 2 skyrius – Komandiravimas / Patirtis

    // Q7 : Kilmė (AGENCY)
    q7_origine: {
      label: 'Iš kur atvyksta jūsų komandiruoti darbuotojai?',
      placeholder: 'Pvz.: Lenkija, Rumunija, Bulgarija...',
    },

    // Q8 : Paskirties šalys (AGENCY)
    q8_destinations: {
      label: 'Paskirties šalys',
      description: 'Šalys, į kurias komandiruojate darbuotojus',
      placeholder: 'Pvz.: Prancūzija, Vokietija, Belgija, Nyderlandai...',
    },

    // Q8 : Pilietybės (CLIENT)
    q8_nationalites: {
      label: 'Agentūros darbuotojų, kuriuos įdarbinat, pilietybės',
      placeholder: 'Pvz.: lenkų, rumunų, bulgarų...',
    },

    // Q9 : Iššūkis (AGENCY)
    q9_defi: {
      label: 'Pagrindinis iššūkis su tarptautiniu komandiravimu',
      options: {
        admin: 'Administracinis sudėtingumas (A1, SIPSI...)',
        conformite: 'Teisinė atitiktis kelioms šalims',
        cout: 'Valdymo kaštai ir laikas',
        langues: 'Kalbos barjerai',
        autre: 'Kita',
      },
    },

    // Q9 : Iššūkis klientui (CLIENT)
    q9_defi_client: {
      label: 'Pagrindinis iššūkis su Europos laikinais darbuotojais',
      options: {
        trouver: 'Rasti patikimas agentūras',
        conformite: 'Teisinė atitiktis',
        qualite: 'Kokybė/įgūdžiai',
        cout: 'Per dideli kaštai',
        langues: 'Komunikacija / Kalbos',
        autre: 'Kita',
      },
    },

    // Q9 : Iššūkis darbuotojui (WORKER)
    q9_defi_worker: {
      label: 'Pagrindinis iššūkis jūsų užduotyse',
      options: {
        trouver: 'Rasti užduotis',
        admin: 'Administracinė dokumentacija',
        logement: 'Būstas / Apgyvendinimas',
        langue: 'Vietos kalba',
        paiement: 'Mokėjimai / Atlyginimas',
        autre: 'Kita',
      },
    },

    // Q9 : Kita
    q9_autre: {
      label: 'Nurodykite pagrindinį iššūkį',
      placeholder: 'Apibūdinkite pagrindinį iššūkį...',
    },

    // Q10 : Valdymas (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Kaip šiandien valdote komandiravimo deklaracijas?',
      options: {
        interne: 'Vidinė komanda',
        externe: 'Išorinis paslaugų teikėjas',
        mixte: 'Mišrus būdas',
        manuel: 'Rankinis valdymas',
        logiciel: 'Specializuota programinė įranga',
      },
    },

    // Q10 : Agentūros (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Kiek laikinojo įdarbinimo agentūrų naudojate?',
      options: {
        '0': 'Nė vienos',
        '1': '1 agentūrą',
        '2-3': '2-3 agentūras',
        '4-10': '4-10 agentūrų',
        '10+': 'Daugiau nei 10',
      },
    },

    // Q10 : Procesas (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kaip įdarbinat agentūros darbuotojus?',
      options: {
        agence_fr: 'Prancūzijos laikinojo įdarbinimo agentūros',
        agence_euro: 'Europos laikinojo įdarbinimo agentūros',
        direct: 'Tiesioginis įdarbinimas',
        mixte: 'Mišrus',
      },
    },

    // Q10 : Agentūra (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Kaip randate laikino darbo?',
      options: {
        agence: 'Per laikinojo įdarbinimo agentūras',
        bouche: 'Rekomendacijos',
        internet: 'Internetiniai darbo portalai',
        direct: 'Tiesioginė paraiška',
      },
    },

    // Q10ter : Naudotos agentūros (WORKER)
    q10_agences_worker: {
      label: 'Su kiek agentūrų dirbate?',
      options: {
        '1': 'Tik 1 agentūra',
        '2-3': '2-3 agentūros',
        '4-10': '4-10 agentūrų',
        '10+': 'Daugiau nei 10',
      },
    },

    // Q11 : Incidentai (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Ar patyrėte baudų ar incidentų dėl komandiravimo atitikties?',
      description: 'Atsakymas lieka anonimiškas',
      options: {
        jamais: 'Ne, niekada',
        rarement: 'Retai (1-2 kartus)',
        parfois: 'Kartais (3-5 kartus)',
        souvent: 'Dažnai (6+ kartų)',
      },
    },

    // Q11 : Atitiktis (CLIENT)
    q11_conformite: {
      label: 'Ar tikrinate laikinojo įdarbinimo agentūrų teisinę atitiktį?',
      options: {
        oui_systematique: 'Taip, sistemingai',
        oui_parfois: 'Taip, kartais',
        non: 'Ne',
        ne_sait_pas: 'Nežinau',
      },
    },

    // Q11 : Problemų (WORKER)
    q11_problemes: {
      label: 'Ar turėjote problemų su laikinu darbu užsienyje?',
      options: {
        oui_graves: 'Taip, rimtų problemų',
        oui_mineurs: 'Taip, nedidelių problemų',
        non: 'Ne',
      },
    },

    // Q12 : Biudžetas (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Metinis biudžetas komandiravimo administravimui',
      options: {
        '0-5k': '€0-5 000 / metus',
        '5-15k': '€5 000-15 000 / metus',
        '15-30k': '€15 000-30 000 / metus',
        '30k+': '€30 000+ / metus',
        inconnu: 'Nežinau',
      },
    },

    // Q12 : Biudžetas klientui (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Metinis biudžetas laikinam darbui',
      options: {
        '0-50k': '€0 - €50 000',
        '50-200k': '€50 000 - €200 000',
        '200-500k': '€200 000 - €500 000',
        '500k+': '€500 000+',
        'inconnu': 'Nežinau',
      },
    },

    // Q12 : Pasitenkinimas (CLIENT)
    q12_satisfaction: {
      label: 'Pasitenkinimas dabartinėmis agentūromis',
      options: {
        tres_satisfait: 'Labai patenkintas',
        satisfait: 'Patenkintas',
        neutre: 'Neutralus',
        insatisfait: 'Nepatenkintas',
      },
    },

    // Q12 : Atlyginimas (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Ar esate patenkintas atlyginimu iš laikino darbo?',
      options: {
        '<1500': 'Mažiau nei €1 500',
        '1500-2500': '€1 500 - €2 500',
        '2500-3500': '€2 500 - €3 500',
        '3500+': '€3 500+',
      },
    },

    // Q13 : Pajamų praradimas (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Koks pajamų procentas prarandamas dėl administracinio sudėtingumo?',
      options: {
        'non': 'Ne, ne iš tikrųjų',
        'faible': 'Taip, mažas (< 5% pajamų)',
        'moyen': 'Taip, vidutinis (5-15% pajamų)',
        'important': 'Taip, reikšmingas (> 15% pajamų)',
      },
    },

    // Q13 : Pasitenkinimas (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Pasitenkinimas dabartinėmis laikinojo darbo agentūromis',
      options: {
        'tres_satisfait': 'Labai patenkintas',
        'satisfait': 'Patenkintas',
        'neutre': 'Neutralus',
        'insatisfait': 'Nepatenkintas',
        'tres_insatisfait': 'Labai nepatenkintas',
      },
    },

    // Q13 : Pasitenkinimas darbuotojo (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Pasitenkinimas dabartinėmis agentūromis',
      options: {
        'tres_satisfait': 'Labai patenkintas',
        'satisfait': 'Patenkintas',
        'neutre': 'Neutralus',
        'insatisfait': 'Nepatenkintas',
        'tres_insatisfait': 'Labai nepatenkintas',
      },
    },

    // 3 skyrius – Poreikiai

    // Q14 : Rizikos (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Pagrindinės rizikos',
      description: 'Pasirinkite visas, kurios tinka',
      options: {
        amendes: 'Baudos ir sankcijos',
        reputation: 'Reputacija / Įvaizdis',
        penal: 'Baudžiamoji atsakomybė',
        delais: 'Užduočių vėlavimai',
        clients: 'Klientų praradimas',
        aucun: 'Nėra didelės rizikos',
      },
    },

    // Q14 : Poreikiai (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Pagrindiniai poreikiai',
      description: 'Pasirinkite visas, kurios tinka',
      options: {
        fiabilite: 'Rasti patikimas agentūras',
        conformite: 'Teisinė atitiktis',
        qualite: 'Kokybė/įgūdžiai',
        cout: 'Kaštai',
        disponibilite: 'Kandidatų prieinamumas',
        aucun: 'Nėra didelio poreikio',
      },
    },

    // Q14 : Lūkesčiai (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Lūkesčiai dėl laikino darbo užsienyje',
      description: 'Pasirinkite visas, kurios tinka',
      options: {
        salaire: 'Geresnis atlyginimas',
        conditions: 'Geresnės darbo sąlygos',
        stabilite: 'Stabilumas',
        experience: 'Tarptautinė patirtis',
        logement: 'Pagalba su būstu',
        aucun: 'Jokių ypatingų lūkesčių',
      },
    },

    // Q14_risques_client
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Pagrindinės rizikos',
      description: 'Pasirinkite visas, kurios tinka',
      options: {
        conformite: 'Teisinė atitiktis',
        qualite: 'Kokybė/įgūdžiai',
        communication: 'Komunikacija/Kalbos',
        cout: 'Netikėti kaštai',
        disponibilite: 'Kandidatų prieinamumas',
        aucun: 'Nėra didelių rizikų',
      },
    },

    // Q14_risques_worker
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Dažniausiai pasitaikančios problemos',
      description: 'Pasirinkite visas, kurios tinka',
      options: {
        paiement: 'Mokėjimo vėlavimai',
        conditions: 'Prastos sąlygos',
        contrat: 'Nesilaikoma sutarčių',
        logement: 'Netinkamas būstas',
        communication: 'Komunikacijos problemos',
        aucun: 'Nėra didelių problemų',
      },
    },

    // Q15 : Problema
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Kokią problemą norėtumėte išspręsti pirmiausia?',
      placeholder: 'Apibūdinkite prioritetinę problemą...',
    },

    // Q15 : Poreikiai klientui (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Kokie jūsų prioritetiniai poreikiai?',
      placeholder: 'Pvz.: Rasti greitai, geresnė kokybė, kainos...',
    },

    // Q15 : Patobulinimai (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Ką norėtumėte pagerinti savo užduotyse?',
      placeholder: 'Pvz.: Atlyginimas, būstas, pagalba, stabilumas...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Ar naudojate ERP/valdymo programinę įrangą?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Kita',
        aucun: 'Nėra ERP',
      },
    },

    // Q16 : Kita ERP (patikslinimas)
    q16_autre: {
      label: 'Nurodykite savo ERP',
      placeholder: 'Programinės įrangos pavadinimas...',
    },

    // Q16 : Kriterijai (CLIENT)
    q16_criteres: {
      label: 'Pagrindiniai kriterijai renkantis agentūras',
      description: 'Pasirinkite 3 prioritetus',
    },

    // Q16 : Patobulinimai (WORKER)
    q16_amelioration: {
      label: 'Kas pagerintų jūsų laikino darbo patirtį?',
      description: 'Pasirinkite visas, kurios tinka',
    },

    // Q17 : Migracija (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Ar pasiruošę keisti savo darbo įrankius?',
      options: {
        oui: 'Taip, jokių problemų',
        conditions: 'Taip, su sąlygomis',
        difficile: 'Sunku, bet atvira',
        non: 'Ne, neįmanoma',
      },
    },

    // Q17 : Biudžetas (CLIENT)
    q17_budget: {
      label: 'Mėnesinis biudžetas laikinojo įdarbinimo platformai',
      options: {
        '0': 'Nesu pasiruošęs mokėti',
        '1-100': '€1 - €100/mėn',
        '100-500': '€100 - €500/mėn',
        '500-1000': '€500 - €1 000/mėn',
        '1000+': 'Daugiau nei €1 000/mėn',
      },
    },

    // Q17 : Platforma (WORKER)
    q17_plateforme: {
      label: 'Ar naudotumėte platformą rasti laikino darbo užsienyje?',
      options: {
        oui_certainement: 'Taip, tikrai',
        oui_probablement: 'Taip, tikriausiai',
        peut_etre: 'Galbūt',
        non: 'Ne',
      },
    },

    // 4 skyrius – YoJob susidomėjimas

    // Q18 : Įvertinimas
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Kiek jus domina Europos komandiravimo rinka?',
      description: 'Įvertinkite nuo 1 (nedomina) iki 10 (labai domina)',
    },

    // Q19 : Funkcijos (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Įdomiausios funkcijos',
      description: 'Pasirinkite 3 prioritetus',
      options: {
        sipsi: 'Automatinė SIPSI deklaracija',
        a1: 'A1 sertifikato valdymas',
        conformite: 'Atitikties valdymo skydelis',
        alertes: 'Priminimai ir atnaujinimai',
        documents: 'Dokumentų centralizavimas',
        marketplace: 'Agentūrų rinka',
        support: 'Daugiakalbė ekspertų pagalba',
        api: 'API integracija (ERP)',
      },
    },

    // Q19 : Funkcijos (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Įdomiausios funkcijos',
      description: 'Pasirinkite visas, kurios domina',
      options: {
        recherche: 'Patikimų agentūrų paieška',
        comparaison: 'Kainos/kokybės palyginimas',
        avis: 'Patikrintos apžvalgos',
        conformite: 'Atitikties garantija',
        support: 'Dedikuota pagalba',
        facturation: 'Centralizuota apskaita',
        suivi: 'Stebėjimas realiu laiku',
      },
    },

    // Q19 : Funkcijos (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Įdomiausios funkcijos',
      description: 'Pasirinkite visas, kurios domina',
      options: {
        recherche: 'Darbo paieška',
        avis: 'Agentūrų vertinimai',
        logement: 'Pagalba su būstu',
        paiement: 'Saugus mokėjimas',
        support: 'Pagalba mano kalba',
        documents: 'Pagalba su dokumentais',
        formation: 'Mokymo programos',
      },
    },

    // Q20 : Kaina
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Pageidaujamas kainodaros modelis',
      options: {
        mensuel: 'Fiksuotas mėnesinis abonementas',
        usage: 'Mokėti pagal naudojimą',
        annuel: 'Metinis planas (nuolaida)',
        gratuit: 'Nemokamai darbuotojams',
      },
    },

    // Q21 : Mėnesinis biudžetas
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Mėnesinis biudžetas pilnam SaaS sprendimui',
      options: {
        '0-100': '€0 - €100/mėn',
        '100-300': '€100 - €300/mėn',
        '300-500': '€300 - €500/mėn',
        '500-1000': '€500 - €1 000/mėn',
        '1000+': 'Daugiau nei €1 000/mėn',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Ar norėtumėte išbandyti ankstyvą versiją (MVP)?',
      options: {
        oui_gratuit: 'Taip, nemokamai',
        oui_reduc: 'Taip, su nuolaida',
        peut_etre: 'Galbūt, priklauso nuo funkcijų',
        non: 'Ne, nedomina',
      },
    },

    // 5 skyrius – Ateities vizija

    // Q23 : Vaidmuo
    q23_role: {
      label: 'Kaip matote savo vaidmenį Europos rinkoje?',
      options: {
        decideur: 'Galutinis sprendimų priėmėjas',
        influenceur: 'Patarėjas / Rekomendacijos',
        utilisateur: 'Galinysis naudotojas',
        autre: 'Kita',
      },
    },

    // Q24 : Plėtra
    q24_evolution: {
      label: 'Jūsų tarptautinės plėtros planai',
      options: {
        oui_rapide: 'Taip, per 6 mėnesius',
        oui_lent: 'Taip, per 1-2 metus',
        maintien: 'Išlaikyti dabartines šalis',
        reduction: 'Sumažinti tarptautinę apimtį',
      },
    },

    // Q24bis : Ambicijos (WORKER)
    q24_aspirations: {
      label: 'Jūsų būsimos profesinės ambicijos',
      placeholder: 'Pvz.: nuolatinė sutartis, grįžimas į šalį, mokymai...',
    },

    // Q25 : Poreikiai
    q25_besoins: {
      label: 'Kiti poreikiai ar komentarai',
      placeholder: 'Pasidalykite kita atsiliepimu ar poreikiais...',
    },

    // 6 skyrius – Kontaktas

    // Q26 : Profesinis telefonas
    q26_phone: {
      label: 'Profesinis telefono numeris',
      placeholder: '+370 612 34567',
    },

    // Q27 : Vardas
    q27_firstname: {
      label: 'Vardas',
      placeholder: 'Jūsų vardas',
    },

    // Q28 : Pavardė
    q28_lastname: {
      label: 'Pavardė',
      placeholder: 'Jūsų pavardė',
    },

    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'Įmonės kodas (pasirinktinai)',
      placeholder: '123456789',
      description: 'Duomenų praturtinimui per registrus',
    },

    // Q30 : El. paštas
    email: {
      label: 'Jūsų el. paštas',
      placeholder: 'jusu.el.pastas@pavyzdys.lt',
    },

    // Q31 : Sutikimas dėl kontakto
    autorise_contact: {
      label: 'Sutinku, kad su manimi būtų susisiekta dar kartą',
    },

    // Q32 : Ataskaita
    souhaite_rapport: {
      label: 'Noriu gauti tyrimo ataskaitą',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Lithuanian (LT) Translation',
    _locale: 'lt-LT',
    _completeness: 100,
  },
};