/**
 * 🇸🇮 SLOVENSKI PREVODI (SL)
 *
 * Popoln prevod v slovenščino
 * Osnova: en.ts (enaka struktura)
 *
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const sl: TranslationBundle = {
  // Podeduje manjkajoče ključe iz FR
  ...fr,

  // Navigacija
  nav: {
    section1: 'Profil',
    section2: 'Izkušnje',
    section3: 'Potrebe',
    section4: 'Interes',
    section5: 'Vizija',
    section6: 'Kontakt',
    dashboard: 'Nadzorna plošča',
    back_to_site: 'Nazaj na splet',
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
      cms: 'CMS obrazca',
      settings: 'Nastavitve',
      prospects: 'Potencialne stranke',
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

  // Sekcije
  section: {
    1: { title: 'Profil agencije', description: '4 vprašanja • 2 min' },
    2: { title: 'Napotenost', description: '7 vprašanj • 3 min' },
    3: { title: 'Potrebe', description: '6 vprašanj • 2 min' },
    4: { title: 'Zanimanje za YoJob', description: '6 vprašanj • 3 min' },
    5: { title: 'Vizija prihodnosti', description: '2 vprašanja • 1 min' },
    6: { title: 'Kontakt', description: '1 vprašanje • 1 min' },
  },

  // Glava
  header: {
    title: 'YoJob',
    subtitle: 'Raziskava trga',
  },

  // Hero
  hero: {
    title: 'Tržna anketa',
    subtitle: 'Pomagajte nam bolje razumeti vaše potrebe',
    description:
      'Anketa traja približno 10–15 minut. Vaši odgovori nam bodo pomagali ustvariti rešitev, prilagojeno vašemu sektorju.',
    cta_start: 'Začni anketo',
    cta_dashboard: 'Odpri nadzorno ploščo',
    badge: 'Evropska tržna študija',
    stat: {
      countries: '27 evropskih držav',
      questions: 'vprašanj',
      benchmark: 'Pridobite benchmark 2025',
      insights: 'Ekskluzivni vpogledi v trg',
      opportunities: 'Prednostni dostop do zaposlitev',
    },
    footer: {
      info: 'vprašanja • Anonimno • Skladno z GDPR',
      anonymous: 'Anonimno',
      gdpr: 'GDPR skladnost',
    },
  },

  // Tip respondenta
  respondent_type: {
    title: 'Kdo ste?',
    subtitle: 'Izberite profil za prilagoditev vprašanj',
    agency: 'Agencija za začasno delo',
    agency_description: 'Ste agencija za začasno delo ali napotovanje',
    client: 'Naročnik',
    client_description: 'Ste podjetje, ki zaposluje začasne delavce',
    worker: 'Začasni delavec',
    worker_description: 'Ste začasni ali napoteni delavec',
  },

  // Izbirnik profila
  selector: {
    badge: '🌍 Evropska tržna študija – Zaposlovanje & začasno delo',
    title: 'Delite izkušnje z evropskim trgom',
    subtitle: 'Izberite profil in začnite anketo',
    cta: 'Kliknite za začetek →',
    trust: {
      secure: 'Varni podatki',
      languages: '{count} razpoložljivih jezikov',
      languages_suffix: 'razpoložljivih jezikov',
      anonymous: 'Anonimno in zaupno',
    },
  },

  // Kartice profila
  respondent: {
    agency: {
      label: 'Agencija za začasno delo',
      description: 'Ste evropska agencija. Delite izkušnje z napotovanjem.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Podjetje naročnik',
      description: 'Zaposlujete začasne delavce. Delite potrebe in pričakovanja.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Začasni delavec',
      description: 'Delate kot začasni delavec. Delite izkušnje s terena.',
      estimatedTime: '10 min',
    },
  },

  // Gumbi
  button: {
    previous: 'Nazaj',
    next: 'Naprej',
    submit: 'Pošlji odgovore',
    submitting: 'Pošiljanje...',
    back: 'Nazaj',
    start: 'Začni',
  },

  // Potrditev
  confirmation: {
    title: 'Hvala za sodelovanje! 🙏',
    subtitle: 'Vaši odgovori so bili uspešno shranjeni',
    message: 'Trenutno analiziramo vse odgovore, da pripravimo rešitev za vaše potrebe.',
    cta_back: 'Nazaj na domačo stran',
    cta_dashboard: 'Poglej nadzorno ploščo',
    description: 'Vaše mnenje je dragoceno in pomaga oblikovati prihodnost YoJob.',
    cta: 'Nazaj na spletno mesto YoJob',
    
    reward: {
      report: {
        title: 'Poročilo "Trendi 2025"',
        description: 'Poslano v 3 tednih'
      },
      earlyaccess: {
        title: 'Zgodnji dostop YoJob',
        description: 'Top 100 udeležencev'
      }
    },
    
    thanks: {
      title: '🎁 Kot zahvalo za vaše sodelovanje:',
      item1: '• Ekskluzivno poročilo "Trendi napotitve 2025"',
      item2: '• Top 100 udeležencev = 3 mesece brezplačnega dostopa do YoJob (vrednost 500€)'
    }
  },

  // Napredek
  progress: {
    section: 'Sekcija',
    question: 'Vprašanje',
    section_completed: 'Sekcija zaključena',
    questions_remaining: '{count} vprašanj preostalih',
    time_remaining: 'Približno {time} preostaja',
  },

  // Skupni prevodi
  common: {
    oui: 'Da',
    non: 'Ne',
    autre: 'Drugo',
    loading: 'Nalaganje...',
    submit: 'Pošlji',
    next: 'Naprej',
    previous: 'Nazaj',
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
    profileAgency: 'Agencija za začasno delo',
    profileClient: 'Naročnik',
    profileWorker: 'Začasni delavec',
    score_not_interested: 'Ni me zanima',
    score_very_interested: 'Zelo me zanima',
  },

  // Sektorji
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

  // Vprašanja – struktura en.ts
  questions: {
    ...fr.questions,

    // Q1 : Ime
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Ime',
      placeholder: 'Ime organizacije ali vaše polno ime',
    },

    // Q2 : Leto ustanovitve (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Leto ustanovitve',
      placeholder: '2015',
    },

    // Q2 : Leto ustanovitve (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Leto ustanovitve vašega podjetja',
      placeholder: '2010',
    },

    // Q2 : Nacionalnost (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Vaša narodnost',
      placeholder: 'Npr.: poljska, romunska...',
    },

    // Q3 : Velikost (AGENCY/CLIENT)
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

    // Q3 : Izkušnje (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Leta izkušenj z začasnim delom',
      options: {
        '<1': 'Manj kot 1 leto',
        '1-3': '1-3 leta',
        '3-5': '3-5 let',
        '5-10': '5-10 let',
        '10+': 'Več kot 10 let',
      },
    },

    // Q4 : Sektorji
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Glavna področja dejavnosti',
      description: 'Izberite vse ustrezne sektorje',
    },

    // Q4 : Poklici (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Vaši poklici',
      description: 'Izberite vse svoje poklice',
    },

    // Q5 : Država (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Država vaše agencije',
      placeholder: 'Npr.: Poljska',
    },

    // Q5 : Lokacija (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Država, kjer deluje vaše podjetje',
      placeholder: 'Npr.: Francija',
    },

    // Q5 : Države dela (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Države, kjer ste delali kot začasni delavec',
      placeholder: 'Npr.: Francija, Nemčija, Belgija...',
    },

    // Q6 : Obseg (AGENCY)
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

    // Q6 : Obseg klient (CLIENT)
    q6_volume_client: {
      label: 'Koliko začasnih delavcev zaposlite na leto?',
      options: {
        '0': 'Trenutno nobenega',
        '1-10': '1-10 oseb',
        '11-50': '11-50 oseb',
        '51-200': '51-200 oseb',
        '200+': '200+ oseb',
      },
    },

    // Q6 : Pogostost (WORKER)
    q6_frequence: {
      label: 'Kako pogosto delate kot začasni delavec?',
      options: {
        permanent: 'Redno (celo leto)',
        saisonnier: 'Sezonsko (določeni meseci)',
        occasionnel: 'Občasno',
        jamais: 'Še nikoli (iščem)',
      },
    },

    // Sekcija 2 – Napotenost / Izkušnje

    // Q7 : Izvor (AGENCY)
    q7_origine: {
      label: 'Od kod prihajajo vaši napoteni delavci?',
      placeholder: 'Npr.: Poljska, Romunija, Bolgarija...',
    },

    // Q8 : Ciljne države (AGENCY)
    q8_destinations: {
      label: 'Ciljne države',
      description: 'Države, kamor napotujete delavce',
      placeholder: 'Npr.: Francija, Nemčija, Belgija, Nizozemska...',
    },

    // Q8 : Narodnosti (CLIENT)
    q8_nationalites: {
      label: 'Narodnosti začasnih delavcev, ki jih zaposlujete',
      placeholder: 'Npr.: poljska, romunska, bolgarska...',
    },

    // Q9 : Izziv (AGENCY)
    q9_defi: {
      label: 'Vaš glavni izziv pri mednarodnem napotovanju',
      options: {
        admin: 'Administrativna zahtevnost (A1, SIPSI...)',
        conformite: 'Pravna skladnost v več državah',
        cout: 'Stroški in čas upravljanja',
        langues: 'Jezikovne ovire',
        autre: 'Drugo',
      },
    },

    // Q9 : Izziv klient (CLIENT)
    q9_defi_client: {
      label: 'Glavni izziv z evropskimi začasnimi delavci',
      options: {
        trouver: 'Iskanje zanesljivih agencij',
        conformite: 'Pravna skladnost',
        qualite: 'Kakovost/spretnosti',
        cout: 'Previsoki stroški',
        langues: 'Komunikacija / Jeziki',
        autre: 'Drugo',
      },
    },

    // Q9 : Izziv worker (WORKER)
    q9_defi_worker: {
      label: 'Vaš glavni izziv pri nalogah',
      options: {
        trouver: 'Iskanje nalog',
        admin: 'Administrativni postopki',
        logement: 'Namestitev / Bivanje',
        langue: 'Lokalni jezik',
        paiement: 'Plačila / Plača',
        autre: 'Drugo',
      },
    },

    // Q9 : Drugo
    q9_autre: {
      label: 'Prosimo, navedite glavni izziv',
      placeholder: 'Opišite glavni izziv...',
    },

    // Q10 : Upravljanje (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Kako danes upravljate prijave napotitev?',
      options: {
        interne: 'Notranja ekipa',
        externe: 'Zunanji ponudnik',
        mixte: 'Kombiniran pristop',
        manuel: 'Ročno upravljanje',
        logiciel: 'Specializirana programska oprema',
      },
    },

    // Q10 : Agencije (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Koliko agencij za začasno delo uporabljate?',
      options: {
        '0': 'Nobene',
        '1': '1 agencijo',
        '2-3': '2-3 agencije',
        '4-10': '4-10 agencij',
        '10+': 'Več kot 10',
      },
    },

    // Q10 : Postopek (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Kako zaposlujete začasne delavce?',
      options: {
        agence_fr: 'Francoske agencije za začasno delo',
        agence_euro: 'Evropske agencije za začasno delo',
        direct: 'Neposredno zaposlovanje',
        mixte: 'Kombinirano',
      },
    },

    // Q10 : Agencija (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Kako najdete začasno delo?',
      options: {
        agence: 'Preko agencij',
        bouche: 'Od ust do ust',
        internet: 'Spletni portali za delo',
        direct: 'Neposredna prijava',
      },
    },

    // Q10ter : Uporabljene agencije (WORKER)
    q10_agences_worker: {
      label: 'S kolikimi agencijami sodelujete?',
      options: {
        '1': 'Samo 1 agencija',
        '2-3': '2-3 agencije',
        '4-10': '4-10 agencij',
        '10+': 'Več kot 10',
      },
    },

    // Q11 : Incidenti (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Ste imeli kazni ali incidente glede skladnosti napotitev?',
      description: 'Vaš odgovor ostane anonimen',
      options: {
        jamais: 'Ne, nikoli',
        rarement: 'Redko (1-2×)',
        parfois: 'Včasih (3-5×)',
        souvent: 'Pogosto (6+×)',
      },
    },

    // Q11 : Skladnost (CLIENT)
    q11_conformite: {
      label: 'Ali preverjate pravno skladnost agencij?',
      options: {
        oui_systematique: 'Da, sistematično',
        oui_parfois: 'Da, včasih',
        non: 'Ne',
        ne_sait_pas: 'Ne vem',
      },
    },

    // Q11 : Težave (WORKER)
    q11_problemes: {
      label: 'Ste imeli težave pri začasnem delu v tujini?',
      options: {
        oui_graves: 'Da, resne težave',
        oui_mineurs: 'Da, manjše težave',
        non: 'Ne',
      },
    },

    // Q12 : Proračun (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Letni proračun za upravljanje napotitev',
      options: {
        '0-5k': '€0-5.000 / leto',
        '5-15k': '€5.000-15.000 / leto',
        '15-30k': '€15.000-30.000 / leto',
        '30k+': '€30.000+ / leto',
        inconnu: 'Ne vem',
      },
    },

    // Q12 : Proračun klient (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Letni proračun za začasno delo',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'Ne vem',
      },
    },

    // Q12 : Zadovoljstvo (CLIENT)
    q12_satisfaction: {
      label: 'Zadovoljstvo s trenutnimi agencijami',
      options: {
        tres_satisfait: 'Zelo zadovoljen',
        satisfait: 'Zadovoljen',
        neutre: 'Nevtralen',
        insatisfait: 'Nezadovoljen',
      },
    },

    // Q12 : Plača (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Ste zadovoljni s plačo pri začasnem delu?',
      options: {
        '<1500': 'Manj kot €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },

    // Q13 : Izguba prihodkov (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Kolikšen delež prihodkov izgubite zaradi administrativne zahtevnosti?',
      options: {
        'non': 'Ne, ne prav',
        'faible': 'Da, nizek (< 5% prihodkov)',
        'moyen': 'Da, srednji (5-15% prihodkov)',
        'important': 'Da, pomemben (> 15% prihodkov)',
      },
    },

    // Q13 : Zadovoljstvo (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Zadovoljstvo s trenutnimi agencijami',
      options: {
        'tres_satisfait': 'Zelo zadovoljen',
        'satisfait': 'Zadovoljen',
        'neutre': 'Nevtralen',
        'insatisfait': 'Nezadovoljen',
        'tres_insatisfait': 'Zelo nezadovoljen',
      },
    },

    // Q13 : Zadovoljstvo worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Zadovoljstvo s trenutnimi agencijami',
      options: {
        'tres_satisfait': 'Zelo zadovoljen',
        'satisfait': 'Zadovoljen',
        'neutre': 'Nevtralen',
        'insatisfait': 'Nezadovoljen',
        'tres_insatisfait': 'Zelo nezadovoljen',
      },
    },

    // Sekcija 3 – Potrebe

    // Q14 : Tveganja (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Glavne skrbi',
      description: 'Izberite vse ustrezne možnosti',
      options: {
        amendes: 'Globe in sankcije',
        reputation: 'Ugled / Podoba',
        penal: 'Kazenska odgovornost',
        delais: 'Zamude misij',
        clients: 'Izguba strank',
        aucun: 'Ni večjega tveganja',
      },
    },

    // Q14 : Potrebe (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Glavne potrebe',
      description: 'Izberite vse ustrezne možnosti',
      options: {
        fiabilite: 'Iskanje zanesljivih agencij',
        conformite: 'Pravna skladnost',
        qualite: 'Kakovost/spretnosti',
        cout: 'Stroški',
        disponibilite: 'Dostopnost kandidatov',
        aucun: 'Ni velike potrebe',
      },
    },

    // Q14 : Pričakovanja (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Pričakovanja za začasno delo v tujini',
      description: 'Izberite vse ustrezne možnosti',
      options: {
        salaire: 'Boljša plača',
        conditions: 'Boljši pogoji dela',
        stabilite: 'Stabilnost',
        experience: 'Mednarodne izkušnje',
        logement: 'Pomoč pri nastanitvi',
        aucun: 'Brez posebnih pričakovanj',
      },
    },

    // Q14_risques_client
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Glavne skrbi',
      description: 'Izberite vse ustrezne možnosti',
      options: {
        conformite: 'Pravna skladnost',
        qualite: 'Kakovost/spretnosti',
        communication: 'Komunikacija/Jeziki',
        cout: 'Nepričakovani stroški',
        disponibilite: 'Dostopnost kandidatov',
        aucun: 'Ni večjih skrbi',
      },
    },

    // Q14_risques_worker
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'S kakšnimi težavami se najpogosteje srečujete?',
      description: 'Izberite vse ustrezne možnosti',
      options: {
        paiement: 'Zamude pri plačilih',
        conditions: 'Slabi pogoji',
        contrat: 'Kršenje pogodb',
        logement: 'Neustrezna nastanitev',
        communication: 'Težave pri komunikaciji',
        aucun: 'Ni večjih težav',
      },
    },

    // Q15 : Problem
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Kateri problem želite rešiti najprej?',
      placeholder: 'Opišite prioriteto...',
    },

    // Q15 : Potrebe klient (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Katere so vaše prioritetne potrebe?',
      placeholder: 'Npr.: hitro najti, boljša kakovost, cene...',
    },

    // Q15 : Izboljšave (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Kaj bi radi izboljšali pri svojih nalogah?',
      placeholder: 'Npr.: plača, nastanitev, podpora, stabilnost...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Ali uporabljate ERP/upravljalsko programsko opremo?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Drugo',
        aucun: 'Brez ERP',
      },
    },

    // Q16 : Ime ERP
    q16_nom_erp: {
      label: 'Kateri program/ERP?',
      placeholder: 'Npr.: SAP, Odoo, interni...',
    },

    // Q16 : Kriteriji (CLIENT)
    q16_criteres: {
      label: 'Glavna izbirna merila za agencije',
      description: 'Izberite svoje top 3',
    },

    // Q16 : Izboljšava (WORKER)
    q16_amelioration: {
      label: 'Kaj bi izboljšalo vašo izkušnjo začasnega dela?',
      description: 'Izberite vse ustrezne možnosti',
    },

    // Q16 : Autre ERP (précision)
    q16_autre: {
      label: 'Navedite svoj ERP',
      placeholder: 'Ime programske opreme...',
    },

    // Q17 : Migracija (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Ste pripravljeni zamenjati delovna orodja?',
      options: {
        oui: 'Da, brez težav',
        conditions: 'Da, pod pogoji',
        difficile: 'Težko, a sem odprt',
        non: 'Ne, nepredstavljivo',
      },
    },

    // Q17 : Proračun (CLIENT)
    q17_budget: {
      label: 'Mesečni proračun za platformo za začasno zaposlovanje',
      options: {
        '0': 'Nisem pripravljen plačati',
        '1-100': '€1 - €100/mesec',
        '100-500': '€100 - €500/mesec',
        '500-1000': '€500 - €1.000/mesec',
        '1000+': 'Več kot €1.000/mesec',
      },
    },

    // Q17 : Platforma (WORKER)
    q17_plateforme: {
      label: 'Bi uporabili platformo za iskanje začasne zaposlitve v tujini?',
      options: {
        oui_certainement: 'Da, zagotovo',
        oui_probablement: 'Da, verjetno',
        peut_etre: 'Morda',
        non: 'Ne',
      },
    },

    // Sekcija 4 – Zanimanje za YoJob

    // Q18 : Ocena
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Kako vas zanima evropsko tržnico napotitev?',
      description: 'Ocenite od 1 (me ne zanima) do 10 (zelo me zanima)',
    },

    // Q19 : Funkcije (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Najbolj zanimive funkcije',
      description: 'Izberite svoje top 3 prioritete',
      options: {
        sipsi: 'Avtomatska SIPSI prijava',
        a1: 'Upravljanje potrdila A1',
        conformite: 'Nadzorna plošča skladnosti',
        alertes: 'Opozorila in obnove',
        documents: 'Centralizacija dokumentov',
        marketplace: 'Tržnica agencij',
        support: 'Večjezična strokovna podpora',
        api: 'API integracija (ERP)',
      },
    },

    // Q19 : Funkcije (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Najbolj zanimive funkcije',
      description: 'Izberite vse, kar vas zanima',
      options: {
        recherche: 'Iskanje zanesljivih agencij',
        comparaison: 'Primerjava cene/kakovosti',
        avis: 'Preverjene ocene',
        conformite: 'Garancija skladnosti',
        support: 'Namenska podpora',
        facturation: 'Centralizirano fakturiranje',
        suivi: 'Sledenje v realnem času',
      },
    },

    // Q19 : Funkcije (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Najbolj zanimive funkcije',
      description: 'Izberite vse, kar vas zanima',
      options: {
        recherche: 'Iskanje dela',
        avis: 'Ocene agencij',
        logement: 'Pomoč pri nastanitvi',
        paiement: 'Varna plačila',
        support: 'Podpora v mojem jeziku',
        documents: 'Pomoč pri dokumentih',
        formation: 'Izobraževalni programi',
      },
    },

    // Q20 : Cena
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Želeni cenovni model',
      options: {
        mensuel: 'Fiksna mesečna naročnina',
        usage: 'Plačilo po uporabi',
        annuel: 'Letni paket (popust)',
        gratuit: 'Brezplačno za delavce',
      },
    },

    // Q21 : Mesečni proračun
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Mesečni proračun za celovito SaaS rešitev',
      options: {
        '0-100': '€0 - €100/mesec',
        '100-300': '€100 - €300/mesec',
        '300-500': '€300 - €500/mesec',
        '500-1000': '€500 - €1.000/mesec',
        '1000+': 'Več kot €1.000/mesec',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Bi želeli preizkusiti zgodnjo različico (MVP)?',
      options: {
        oui_gratuit: 'Da, brezplačno',
        oui_reduc: 'Da, s popustom',
        peut_etre: 'Morda, odvisno od funkcij',
        non: 'Ne, me ne zanima',
      },
    },

    // Sekcija 5 – Vizija

    // Q23 : Vloga
    q23_role: {
      label: 'Kako vidite svojo vlogo na evropski tržnici?',
      options: {
        decideur: 'Končni odločevalec',
        influenceur: 'Vplivnež / Priporočilo',
        utilisateur: 'Končni uporabnik',
        autre: 'Drugo',
      },
    },

    // Q24 : Razvoj
    q24_evolution: {
      label: 'Načrti za mednarodno širitev',
      options: {
        oui_rapide: 'Da, v 6 mesecih',
        oui_lent: 'Da, v 1-2 letih',
        maintien: 'Ohraniti trenutne države',
        reduction: 'Zmanjšati mednarodni obseg',
      },
    },

    // Q24bis : Prihodnje aspiracije (WORKER)
    q24_aspirations: {
      label: 'Vaše prihodnje poklicne ambicije',
      placeholder: 'Npr.: stalna pogodba, povratek domov, izobraževanje...',
    },

    // Q25 : Druge potrebe
    q25_besoins: {
      label: 'Druge potrebe ali komentarji',
      placeholder: 'Delite dodatne povratne informacije ali potrebe...',
    },

    // Sekcija 6 – Kontakt

    // Q26 : Poslovni telefon
    q26_phone: {
      label: 'Poslovna telefonska številka',
      placeholder: '+386 40 123 456',
    },

    // Q27 : Ime
    q27_firstname: {
      label: 'Ime',
      placeholder: 'Vaše ime',
    },

    // Q28 : Priimek
    q28_lastname: {
      label: 'Priimek',
      placeholder: 'Vaš priimek',
    },

    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'Davčna številka (neobvezno)',
      placeholder: '12345678',
      description: 'Za obogatitev podatkov prek registrov',
    },

    // Q30 : E-naslov
    email: {
      label: 'Vaš e-naslov',
      placeholder: 'vaš.email@primer.si',
    },

    // Q31 : Dovoljenje za kontakt
    autorise_contact: {
      label: 'Strinjam se z ponovnim kontaktom',
    },

    // Q32 : Poročilo študije
    souhaite_rapport: {
      label: 'Želim prejeti poročilo raziskave',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Slovenian (SL) Complete Translation',
    _locale: 'sl-SI',
    _completeness: 100,
  },
};