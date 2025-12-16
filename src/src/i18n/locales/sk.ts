/**
 * 🇸🇰 SLOVENSKÉ PREKLADY (SK)
 *
 * Kompletný preklad do slovenčiny
 * Báza: en.ts (identická štruktúra)
 *
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const sk: TranslationBundle = {
  // Zdedené z FR pre chýbajúce kľúče
  ...fr,

  // Navigácia
  nav: {
    section1: 'Profil',
    section2: 'Skúsenosti',
    section3: 'Potreby',
    section4: 'Záujem',
    section5: 'Vízia',
    section6: 'Kontakt',
    dashboard: 'Dashboard',
    back_to_site: 'Späť na web',
  },

  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Prehľad',
      results: 'Výsledky',
      questions: 'Otázky',
      translations: 'Preklady',
      export: 'Export',
      integrations: 'Integrácie',
      cms: 'CMS formulára',
      settings: 'Nastavenia',
      prospects: 'Záujemcovia',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nové',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Odhlásiť sa',
      back_to_survey: 'Späť k dotazníku',
      toggle_sidebar: 'Zbaliť/Rozbaliť',
    },
    user: {
      welcome: 'Vitajte',
      logged_in_as: 'Prihlásený ako',
    },
  },

  // Sekcie
  section: {
    1: { title: 'Profil agentúry', description: '4 otázky • 2 min' },
    2: { title: 'Vysielanie', description: '7 otázok • 3 min' },
    3: { title: 'Potreby', description: '6 otázok • 2 min' },
    4: { title: 'Záujem o YoJob', description: '6 otázok • 3 min' },
    5: { title: 'Budúca vízia', description: '2 otázky • 1 min' },
    6: { title: 'Kontakt', description: '1 otázka • 1 min' },
  },

  // Hlavička
  header: {
    title: 'YoJob',
    subtitle: 'Prieskum trhu',
  },

  // Hero
  hero: {
    title: 'Prieskum trhu',
    subtitle: 'Pomôžte nám lepšie porozumieť vašim potrebám',
    description:
      'Tento prieskum trvá približne 10-15 minút. Vaše odpovede nám pomôžu vytvoriť riešenie prispôsobené vášmu odvetviu.',
    cta_start: 'Spustiť prieskum',
    cta_dashboard: 'Otvoriť Dashboard',
    badge: 'Európska štúdia trhu',
    stat: {
      countries: '27 európskych krajín',
      questions: 'otázky',
      benchmark: 'Získajte benchmark 2025',
      insights: 'Exkluzívne poznatky o trhu',
      opportunities: 'Prioritný prístup k pracovným príležitostiam',
    },
    footer: {
      info: 'otázky • Anonymné • GDPR v súlade',
      anonymous: 'Anonymné',
      gdpr: 'V súlade s GDPR',
    },
  },

  // Typ respondenta
  respondent_type: {
    title: 'Kto ste?',
    subtitle: 'Vyberte profil pre prispôsobenie otázok',
    agency: 'Personálna agentúra',
    agency_description: 'Ste agentúra dočasného zamestnávania alebo vysielania',
    client: 'Spoločnosť klient',
    client_description: 'Ste spoločnosť, ktorá zamestnáva agentúrnych pracovníkov',
    worker: 'Agentúrny pracovník',
    worker_description: 'Ste agentúrny alebo vyslaný pracovník',
  },

  // Výber profilu
  selector: {
    badge: '🌍 Európska štúdia trhu - Nábor & Dočasná práca',
    title: 'Zdieľajte svoje skúsenosti na európskom trhu',
    subtitle: 'Vyberte profil a začnite prieskum',
    cta: 'Kliknite pre začatie →',
    trust: {
      secure: 'Zabezpečené dáta',
      languages: '{count} dostupných jazykov',
      languages_suffix: 'dostupných jazykov',
      anonymous: 'Anonymné & dôverné',
    },
  },

  // Profily
  respondent: {
    agency: {
      label: 'Personálna agentúra',
      description: 'Ste európska personálna agentúra. Zdieľajte skúsenosti s vysielaním.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Spoločnosť klient',
      description: 'Zamestnávate agentúrnych pracovníkov. Zdieľajte svoje potreby a očakávania.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agentúrny pracovník',
      description: 'Pracujete ako agentúrny pracovník. Zdieľajte skúsenosti z terénu.',
      estimatedTime: '10 min',
    },
  },

  // Tlačidlá
  button: {
    previous: 'Späť',
    next: 'Ďalej',
    submit: 'Odoslať odpovede',
    submitting: 'Odosiela sa...',
    back: 'Späť',
    start: 'Štart',
  },

  // Potvrdenie
  confirmation: {
    title: 'Ďakujeme za účasť!',
    subtitle: 'Vaše odpovede boli úspešne uložené',
    message: 'Analyzujeme všetky odpovede, aby sme vytvorili riešenie presne pre vaše potreby.',
    cta_back: 'Späť na hlavnú stránku',
    cta_dashboard: 'Zobraziť Dashboard',
  },

  // Progres
  progress: {
    section: 'Sekcia',
    question: 'Otázka',
    section_completed: 'Sekcia dokončená',
    questions_remaining: '{count} zostávajúcich otázok',
    time_remaining: 'Približne {time} zostáva',
  },

  // Spoločné preklady
  common: {
    oui: 'Áno',
    non: 'Nie',
    autre: 'Iné',
    loading: 'Načítava sa...',
    submit: 'Odoslať',
    next: 'Ďalej',
    previous: 'Späť',
    skip: 'Preskočiť',
    save: 'Uložiť',
    cancel: 'Zrušiť',
    close: 'Zavrieť',
    required: 'Povinné',
    optional: 'Voliteľné',
    error: 'Chyba',
    success: 'Úspech',
    completed: 'Dokončené',
    inProgress: 'Prebieha',
    notStarted: 'Nezačaté',
    profileAgency: 'Personálna agentúra',
    profileClient: 'Klient',
    profileWorker: 'Agentúrny pracovník',
    score_not_interested: 'Nemám záujem',
    score_very_interested: 'Veľmi ma zaujíma',
  },

  // Sektory
  sectors: {
    btp: 'Stavebníctvo',
    industrie: 'Priemysel',
    logistique: 'Logistika',
    hotellerie: 'Pohostinstvo',
    sante: 'Zdravotníctvo',
    agriculture: 'Poľnohospodárstvo',
    tech: 'Tech/IT',
    autres: 'Ostatné',
  },

  // Otázky – štruktúra en.ts
  questions: {
    ...fr.questions,

    // Q1 : Názov
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Názov',
      placeholder: 'Názov organizácie alebo vaše celé meno',
    },

    // Q2 : Rok založenia (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Rok založenia',
      placeholder: '2015',
    },

    // Q2 : Rok založenia (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Rok založenia vašej spoločnosti',
      placeholder: '2010',
    },

    // Q2 : Národnosť (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Vaša národnosť',
      placeholder: 'Napr.: poľská, rumunská...',
    },

    // Q3 : Veľkosť (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Veľkosť organizácie',
      options: {
        '1-9': '1-9 zamestnancov',
        '10-49': '10-49 zamestnancov',
        '50-249': '50-249 zamestnancov',
        '250+': '250+ zamestnancov',
      },
    },

    // Q3 : Skúsenosti (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Roky skúseností s dočasnou prácou',
      options: {
        '<1': 'Menej ako 1 rok',
        '1-3': '1-3 roky',
        '3-5': '3-5 rokov',
        '5-10': '5-10 rokov',
        '10+': 'Viac ako 10 rokov',
      },
    },

    // Q4 : Sektory
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Hlavné odvetvia',
      description: 'Vyberte všetky relevantné odvetvia',
    },

    // Q4 : Profesia (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Vaše profesie',
      description: 'Vyberte všetky svoje profesie',
    },

    // Q5 : Krajina (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Krajina vašej agentúry',
      placeholder: 'Napr.: Poľsko',
    },

    // Q5 : Lokalita (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Krajina, kde pôsobí vaša spoločnosť',
      placeholder: 'Napr.: Francúzsko',
    },

    // Q5 : Krajiny práce (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Krajiny, kde ste pracovali ako agentúrny pracovník',
      placeholder: 'Napr.: Francúzsko, Nemecko, Belgicko...',
    },

    // Q6 : Objemy (AGENCY)
    q6_volume: {
      label: 'Ročný objem vyslaných pracovníkov',
      options: {
        '0': 'Zatiaľ žiadni',
        '1-50': '1-50 pracovníkov',
        '51-200': '51-200 pracovníkov',
        '201-500': '201-500 pracovníkov',
        '500+': 'Viac ako 500',
      },
    },

    // Q6 : Objemy klient (CLIENT)
    q6_volume_client: {
      label: 'Koľko agentúrnych pracovníkov zamestnávate ročne?',
      options: {
        '0': 'Momentálne žiadnych',
        '1-10': '1-10 osôb',
        '11-50': '11-50 osôb',
        '51-200': '51-200 osôb',
        '200+': '200+ osôb',
      },
    },

    // Q6 : Frekvencia (WORKER)
    q6_frequence: {
      label: 'Ako často pracujete ako agentúrny pracovník?',
      options: {
        permanent: 'Pravidelne (celý rok)',
        saisonnier: 'Sezónne (určité mesiace)',
        occasionnel: 'Príležitostne',
        jamais: 'Zatiaľ nikdy (hľadám)',
      },
    },

    // Sekcia 2 - Vysielanie / Skúsenosti

    // Q7 : Pôvod (AGENCY)
    q7_origine: {
      label: 'Odkiaľ pochádzajú vaši vyslaní pracovníci?',
      placeholder: 'Napr.: Poľsko, Rumunsko, Bulharsko...',
    },

    // Q8 : Destinácie (AGENCY)
    q8_destinations: {
      label: 'Cieľové krajiny',
      description: 'Krajiny, kam vysielate pracovníkov',
      placeholder: 'Napr.: Francúzsko, Nemecko, Belgicko, Holandsko...',
    },

    // Q8 : Národnosti (CLIENT)
    q8_nationalites: {
      label: 'Národnosti agentúrnych pracovníkov, ktorých zamestnávate',
      placeholder: 'Napr.: poľská, rumunská, bulharská...',
    },

    // Q9 : Výzva (AGENCY)
    q9_defi: {
      label: 'Hlavná výzva pri medzinárodnom vysielaní',
      options: {
        admin: 'Administratívna zložitosť (A1, SIPSI...)',
        conformite: 'Právna zhoda vo viacerých krajinách',
        cout: 'Náklady a čas na správu',
        langues: 'Jazykové bariéry',
        autre: 'Iné',
      },
    },

    // Q9 : Výzva klient (CLIENT)
    q9_defi_client: {
      label: 'Hlavná výzva s európskymi agentúrnymi pracovníkmi',
      options: {
        trouver: 'Hľadanie spoľahlivých agentúr',
        conformite: 'Právna zhoda',
        qualite: 'Kvalita/zručnosti',
        cout: 'Príliš vysoké náklady',
        langues: 'Komunikácia / Jazyky',
        autre: 'Iné',
      },
    },

    // Q9 : Výzva worker (WORKER)
    q9_defi_worker: {
      label: 'Hlavná výzva vo vašich zákazkách',
      options: {
        trouver: 'Hľadanie zákaziek',
        admin: 'Administratívne papierovanie',
        logement: 'Hľadanie ubytovania',
        langue: 'Jazyková bariéra',
        paiement: 'Platby / Plat',
        autre: 'Iné',
      },
    },

    // Q9 : Iné
    q9_autre: {
      label: 'Uveďte svoju hlavnú výzvu',
      placeholder: 'Popíšte svoju hlavnú výzvu...',
    },

    // Q10 : Správa (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Ako dnes spravujete prihlášky k vyslaniu?',
      options: {
        interne: 'Interný tím',
        externe: 'Externý poskytovateľ',
        mixte: 'Zmiešaný prístup',
        manuel: 'Manuálna správa',
        logiciel: 'Špecializovaný softvér',
      },
    },

    // Q10 : Agentúry (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Koľko personálnych agentúr používate?',
      options: {
        '0': 'Žiadnu',
        '1': '1 agentúru',
        '2-3': '2-3 agentúry',
        '4-10': '4-10 agentúr',
        '10+': 'Viac ako 10',
      },
    },

    // Q10 : Proces (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Ako najímate agentúrnych pracovníkov?',
      options: {
        agence_fr: 'Francúzske personálne agentúry',
        agence_euro: 'Európske personálne agentúry',
        direct: 'Priamy nábor',
        mixte: 'Zmiešané',
      },
    },

    // Q10 : Agentúra (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Ako hľadáte agentúrnu prácu?',
      options: {
        agence: 'Cez agentúry',
        bouche: 'Odporúčanie',
        internet: 'Online pracovné portály',
        direct: 'Priama žiadosť',
      },
    },

    // Q10ter : Použité agentúry (WORKER)
    q10_agences_worker: {
      label: 'S koľkými agentúrami spolupracujete?',
      options: {
        '1': 'Iba 1 agentúra',
        '2-3': '2-3 agentúry',
        '4-10': '4-10 agentúr',
        '10+': 'Viac ako 10',
      },
    },

    // Q11 : Incidenty (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Mali ste pokuty alebo incidenty súvisiace s dodržiavaním vysielania?',
      description: 'Vaša odpoveď zostane anonymná',
      options: {
        jamais: 'Nie, nikdy',
        rarement: 'Zriedka (1-2×)',
        parfois: 'Niekedy (3-5×)',
        souvent: 'Často (6+×)',
      },
    },

    // Q11 : Zhoda (CLIENT)
    q11_conformite: {
      label: 'Overujete právnu zhodu personálnych agentúr?',
      options: {
        oui_systematique: 'Áno, systematicky',
        oui_parfois: 'Áno, niekedy',
        non: 'Nie',
        ne_sait_pas: 'Neviem',
      },
    },

    // Q11 : Problémy (WORKER)
    q11_problemes: {
      label: 'Mali ste problémy s agentúrnou prácou v zahraničí?',
      options: {
        oui_graves: 'Áno, vážne problémy',
        oui_mineurs: 'Áno, menšie problémy',
        non: 'Nie',
      },
    },

    // Q12 : Rozpočet (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Ročný rozpočet na administratívu vysielania',
      options: {
        '0-5k': '€0-5 000 / rok',
        '5-15k': '€5 000-15 000 / rok',
        '15-30k': '€15 000-30 000 / rok',
        '30k+': '€30 000+ / rok',
        inconnu: 'Neviem',
      },
    },

    // Q12 : Rozpočet klient (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Ročný rozpočet na dočasnú prácu',
      options: {
        '0-50k': '€0 - €50 000',
        '50-200k': '€50 000 - €200 000',
        '200-500k': '€200 000 - €500 000',
        '500k+': '€500 000+',
        'inconnu': 'Neviem',
      },
    },

    // Q12 : Spokojnosť (CLIENT)
    q12_satisfaction: {
      label: 'Spokojnosť s aktuálnymi personálnymi agentúrami',
      options: {
        tres_satisfait: 'Veľmi spokojný',
        satisfait: 'Spokojný',
        neutre: 'Neutrálny',
        insatisfait: 'Nespokojný',
      },
    },

    // Q12 : Plat (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Ste spokojný so mzdou pri agentúrnej práci?',
      options: {
        '<1500': 'Menej ako €1 500',
        '1500-2500': '€1 500 - €2 500',
        '2500-3500': '€2 500 - €3 500',
        '3500+': '€3 500+',
      },
    },

    // Q13 : Strata príjmov (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Aký podiel príjmov sa stráca kvôli administratívnej zložitosti?',
      options: {
        'non': 'Nie, nie veľmi',
        'faible': 'Áno, nízky (< 5% príjmu)',
        'moyen': 'Áno, stredný (5-15% príjmu)',
        'important': 'Áno, významný (> 15% príjmu)',
      },
    },

    // Q13 : Spokojnosť (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Spokojnosť s aktuálnymi agentúrami',
      options: {
        'tres_satisfait': 'Veľmi spokojný',
        'satisfait': 'Spokojný',
        'neutre': 'Neutrálny',
        'insatisfait': 'Nespokojný',
        'tres_insatisfait': 'Veľmi nespokojný',
      },
    },

    // Q13 : Spokojnosť worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Spokojnosť s aktuálnymi agentúrami',
      options: {
        'tres_satisfait': 'Veľmi spokojný',
        'satisfait': 'Spokojný',
        'neutre': 'Neutrálny',
        'insatisfait': 'Nespokojný',
        'tres_insatisfait': 'Veľmi nespokojný',
      },
    },

    // Sekcia 3 - Potreby

    // Q14 : Riziká (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Hlavné obavy',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        amendes: 'Pokuty a sankcie',
        reputation: 'Povesť / Image',
        penal: 'Trestná zodpovednosť',
        delais: 'Oneskorenia misií',
        clients: 'Strata klientov',
        aucun: 'Žiadne významné riziko',
      },
    },

    // Q14 : Potreby (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Hlavné potreby',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        fiabilite: 'Hľadanie spoľahlivých agentúr',
        conformite: 'Právna zhoda',
        qualite: 'Kvalita/zručnosti',
        cout: 'Náklady',
        disponibilite: 'Dostupnosť kandidátov',
        aucun: 'Žiadna veľká potreba',
      },
    },

    // Q14 : Očakávania (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Očakávania od práce v zahraničí',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        salaire: 'Lepšia mzda',
        conditions: 'Lepšie pracovné podmienky',
        stabilite: 'Stabilita',
        experience: 'Medzinárodná skúsenosť',
        logement: 'Pomoc s ubytovaním',
        aucun: 'Žiadne špeciálne očakávania',
      },
    },

    // Q14_risques_client
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Hlavné obavy',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        conformite: 'Právna zhoda',
        qualite: 'Kvalita/zručnosti',
        communication: 'Komunikácia/Jazyky',
        cout: 'Neočakávané náklady',
        disponibilite: 'Dostupnosť kandidátov',
        aucun: 'Žiadne významné obavy',
      },
    },

    // Q14_risques_worker
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'S akými problémami sa stretávate najčastejšie?',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        paiement: 'Oneskorené platby',
        conditions: 'Zlé podmienky',
        contrat: 'Nedodržané zmluvy',
        logement: 'Nedostatočné ubytovanie',
        communication: 'Problémy s komunikáciou',
        aucun: 'Žiadne veľké problémy',
      },
    },

    // Q15 : Problém
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Aký problém by ste chceli vyriešiť ako prvý?',
      placeholder: 'Popíšte svoj prioritný problém...',
    },

    // Q15 : Potreby klient (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Aké sú vaše prioritné potreby?',
      placeholder: 'Napr.: Nájsť rýchlo, lepšia kvalita, ceny...',
    },

    // Q15 : Zlepšenia (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Čo by ste radi zlepšili na svojich misiách?',
      placeholder: 'Napr.: Mzda, ubytovanie, podpora, stabilita...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Používate ERP/riadiaci softvér?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Iný',
        aucun: 'Žiadny ERP',
      },
    },

    // Q16 : Názov ERP
    q16_nom_erp: {
      label: 'Ktorý softvér/ERP?',
      placeholder: 'Napr.: SAP, Odoo, vlastný...',
    },

    // Q16 : Kritériá (CLIENT)
    q16_criteres: {
      label: 'Vaše hlavné kritériá výberu personálnych agentúr',
      description: 'Vyberte svoje top 3',
    },

    // Q16 : Zlepšenie (WORKER)
    q16_amelioration: {
      label: 'Čo by zlepšilo vašu skúsenosť s agentúrnou prácou?',
      description: 'Vyberte všetky relevantné možnosti',
    },

    // Q17 : Migrácia (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Ste pripravení zmeniť svoje pracovné nástroje?',
      options: {
        oui: 'Áno, bez problémov',
        conditions: 'Áno, za určitých podmienok',
        difficile: 'Ťažké, ale som otvorený',
        non: 'Nie, nepredstaviteľné',
      },
    },

    // Q17 : Rozpočet (CLIENT)
    q17_budget: {
      label: 'Mesačný rozpočet na platformu dočasnej práce',
      options: {
        '0': 'Nie som ochotný platiť',
        '1-100': '€1 - €100/mesiac',
        '100-500': '€100 - €500/mesiac',
        '500-1000': '€500 - €1 000/mesiac',
        '1000+': 'Viac ako €1 000/mesiac',
      },
    },

    // Q17 : Platforma (WORKER)
    q17_plateforme: {
      label: 'Použili by ste platformu na hľadanie agentúrnej práce v zahraničí?',
      options: {
        oui_certainement: 'Áno, určite',
        oui_probablement: 'Áno, pravdepodobne',
        peut_etre: 'Možno',
        non: 'Nie',
      },
    },

    // Sekcia 4 - Záujem YoJob

    // Q18 : Skóre
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Ako veľmi vás zaujíma európske trhovisko vysielania?',
      description: 'Ohodnoťte od 1 (nezaujíma ma) do 10 (veľmi ma zaujíma)',
    },

    // Q19 : Funkcie (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Najzaujímavejšie funkcie',
      description: 'Vyberte svoje top 3 priority',
      options: {
        sipsi: 'Automatické hlásenie SIPSI',
        a1: 'Správa certifikátu A1',
        conformite: 'Dashboard zhody',
        alertes: 'Upozornenia a obnovy',
        documents: 'Centralizácia dokumentov',
        marketplace: 'Trhovisko agentúr',
        support: 'Viacjazyčná expertná podpora',
        api: 'API integrácia (ERP)',
      },
    },

    // Q19 : Funkcie (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Najzaujímavejšie funkcie',
      description: 'Vyberte všetko, čo vás zaujíma',
      options: {
        recherche: 'Hľadanie spoľahlivých agentúr',
        comparaison: 'Porovnanie ceny/kvality',
        avis: 'Overené recenzie',
        conformite: 'Záruka zhody',
        support: 'Vyhradená podpora',
        facturation: 'Centralizovaná fakturácia',
        suivi: 'Sledovanie v reálnom čase',
      },
    },

    // Q19 : Funkcie (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Najzaujímavejšie funkcie',
      description: 'Vyberte všetko, čo vás zaujíma',
      options: {
        recherche: 'Hľadanie práce',
        avis: 'Hodnotenie agentúr',
        logement: 'Pomoc s ubytovaním',
        paiement: 'Bezpečná platba',
        support: 'Podpora v mojom jazyku',
        documents: 'Pomoc s administratívnymi dokumentmi',
        formation: 'Vzdelávacie programy',
      },
    },

    // Q20 : Cena
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Preferovaný cenový model',
      options: {
        mensuel: 'Pevné mesačné predplatné',
        usage: 'Platba podľa využitia',
        annuel: 'Ročný plán (zľava)',
        gratuit: 'Zadarmo pre pracovníkov',
      },
    },

    // Q21 : Mesačný rozpočet
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Mesačný rozpočet na kompletné SaaS riešenie',
      options: {
        '0-100': '€0 - €100/mesiac',
        '100-300': '€100 - €300/mesiac',
        '300-500': '€300 - €500/mesiac',
        '500-1000': '€500 - €1 000/mesiac',
        '1000+': 'Viac ako €1 000/mesiac',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Chceli by ste otestovať skorú verziu (MVP)?',
      options: {
        oui_gratuit: 'Áno, zadarmo',
        oui_reduc: 'Áno, so zľavou',
        peut_etre: 'Možno, závisí od funkcií',
        non: 'Nie, nemám záujem',
      },
    },

    // Sekcia 5 - Budúca vízia

    // Q23 : Rola
    q23_role: {
      label: 'Ako vidíte svoju rolu na európskom trhu?',
      options: {
        decideur: 'Konečný rozhodovateľ',
        influenceur: 'Influencer / Odporúčanie',
        utilisateur: 'Koncový používateľ',
        autre: 'Iné',
      },
    },

    // Q24 : Evolúcia
    q24_evolution: {
      label: 'Plány na medzinárodnú expanziu',
      options: {
        oui_rapide: 'Áno, do 6 mesiacov',
        oui_lent: 'Áno, do 1-2 rokov',
        maintien: 'Udržať aktuálne krajiny',
        reduction: 'Zmenšiť medzinárodný rozsah',
      },
    },

    // Q24bis : Ambície (WORKER)
    q24_aspirations: {
      label: 'Vaše budúce profesijné ambície',
      placeholder: 'Napr.: trvalá zmluva, návrat domov, školenie...',
    },

    // Q25 : Potreby
    q25_besoins: {
      label: 'Ďalšie potreby alebo komentáre',
      placeholder: 'Zdieľajte akúkoľvek ďalšiu spätnú väzbu alebo potreby...',
    },

    // Sekcia 6 - Kontakt

    // Q26 : Firemný telefón
    q26_phone: {
      label: 'Firemný telefón',
      placeholder: '+421 2 1234 5678',
    },

    // Q27 : Meno
    q27_firstname: {
      label: 'Meno',
      placeholder: 'Vaše meno',
    },

    // Q28 : Priezvisko
    q28_lastname: {
      label: 'Priezvisko',
      placeholder: 'Vaše priezvisko',
    },

    // Q29 : IČO
    q29_siret: {
      label: 'IČO (voliteľné)',
      placeholder: '12345678',
      description: 'Na obohatenie cez obchodný register',
    },

    // Q30 : Email
    email: {
      label: 'E-mail',
      placeholder: 'vas.email@priklad.sk',
    },

    // Q31 : Povolenie kontaktu
    autorise_contact: {
      label: 'Súhlasím s opätovným kontaktovaním',
    },

    // Q32 : Správa zo štúdie
    souhaite_rapport: {
      label: 'Chcel(a) by som dostať správu zo štúdie',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Slovak (SK) Complete Translation',
    _locale: 'sk-SK',
    _completeness: 100,
  },
};
