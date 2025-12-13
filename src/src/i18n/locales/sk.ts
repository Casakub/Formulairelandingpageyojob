/**
 * 🇸🇰 TRADUCTIONS SLOVAQUES (SK)
 * 
 * Traductions complètes pour le slovaque
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const sk: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
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
  
  // Sections
  section: {
    1: {
      title: 'Profil',
      description: '4 otázky • 2 min',
    },
    2: {
      title: 'Skúsenosti',
      description: '7 otázok • 3 min',
    },
    3: {
      title: 'Potreby',
      description: '6 otázok • 2 min',
    },
    4: {
      title: 'Záujem o YoJob',
      description: '6 otázok • 3 min',
    },
    5: {
      title: 'Budúca vízia',
      description: '2 otázky • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 otázka • 1 min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Váš firemný profil',
        description: 'Povedzte nám o vašej agentúre a odbornosti',
      },
      client: {
        title: '📋 Váš firemný profil',
        description: 'Povedzte nám o vašej spoločnosti a potrebách náboru',
      },
      worker: {
        title: '📋 Váš profil',
        description: 'Povedzte nám o vašom profesijnom zázemí',
      },
    },
    2: {
      agency: {
        title: '💼 Aktivita vyslania',
        description: 'Vaše zkušenosti s vysielaním pracovníkov',
      },
      client: {
        title: '💼 Vaše skúsenosti s náborom',
        description: 'Vaše súčasné nábory a dočasné zamestnávanie',
      },
      worker: {
        title: '💼 Vaše skúsenosti na agentúrach',
        description: 'Vaša cesta ako agentúrny pracovník',
      },
    },
    3: {
      agency: {
        title: '🎯 Potreby a nástroje',
        description: 'Vaše výzvy a súčasné riešenia',
      },
      client: {
        title: '🎯 Vaše súčasné potreby',
        description: 'Výzvy a očakávania pri nábore',
      },
      worker: {
        title: '🎯 Vaše očakávania',
        description: 'Čo je pre vás dôležité pri zákazke',
      },
    },
    4: {
      agency: {
        title: '⭐ Záujem o európsku platformu',
        description: 'Objavte našu víziu inovatívneho trhoviska',
      },
      client: {
        title: '⭐ Záujem o európsku platformu',
        description: 'Inovatívne riešenie pre vaše potreby',
      },
      worker: {
        title: '⭐ Váš záujem o platformu',
        description: 'Platforma pre jednoduché hľadanie zákaziek',
      },
    },
    5: {
      agency: {
        title: '🔮 Budúca vízia',
        description: 'Rozpočet a vyhliadky rozvoja',
      },
      client: {
        title: '🔮 Vaše budúce priority',
        description: 'Rozpočet a náborová stratégia',
      },
      worker: {
        title: '🔮 Vaše ciele',
        description: 'Vaše nadchádzajúce profesijné projekty',
      },
    },
    6: {
      agency: {
        title: '📧 Zostaňte v kontakte',
        description: 'Získajte výsledky štúdie a zostaňte informovaní',
      },
      client: {
        title: '📧 Zostaňte v kontakte',
        description: 'Získajte výsledky a naše odporúčania',
      },
      worker: {
        title: '📧 Zostaňte v kontakte',
        description: 'Získajte výsledky a príležitosti',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Prieskum trhu',
  },
  
  // Hero
  hero: {
    title: 'Prieskum trhu',
    subtitle: 'Pomôžte nám lepšie porozumieť vašim potrebám',
    description: 'Tento prieskum trvá približne 10-15 minút. Vaše odpovede nám pomôžu vytvoriť riešenie prispôsobené vášmu odvetviu.',
    cta_start: 'Začať prieskum',
    cta_dashboard: 'Otvoriť Dashboard',
    badge: 'Európska štúdia trhu',
    stat: {
      countries: '27 európskych krajín',
      questions: 'otázky',
      benchmark: 'Získajte benchmark 2025',
      insights: 'Exkluzívne poznatky o trhu',
      opportunities: 'Prioritný prístup k prácam',
    },
    footer: {
      info: 'otázky • Anonymné • V súlade s GDPR',
      anonymous: 'Anonymné',
      gdpr: 'V súlade s GDPR',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Kto ste?',
    subtitle: 'Vyberte svoj profil pre prispôsobenie otázok',
    agency: 'Agentúra práce',
    agency_description: 'Ste personálna alebo vysielacia agentúra',
    client: 'Klient',
    client_description: 'Ste spoločnosť, ktorá zamestnáva agentúrnych pracovníkov',
    worker: 'Agentúrny pracovník',
    worker_description: 'Ste agentúrny alebo vyslaný pracovník',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Európska štúdia trhu - Nábor & Agentúrna práca',
    title: 'Zdieľajte svoje skúsenosti s európskym trhom',
    subtitle: 'Vyberte svoj profil pre začatie prieskumu',
    cta: 'Kliknite pre začatie →',
    trust: {
      secure: 'Zabezpečené dáta',
      languages: '{count} dostupných jazykov',
      languages_suffix: 'dostupných jazykov',
      anonymous: 'Anonymné & dôverné',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Agentúra práce',
      description: 'Ste európska personálna agentúra. Zdieľajte svoje skúsenosti s vysielaním.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klient',
      description: 'Najímate agentúrnych pracovníkov. Zdieľajte svoje potreby a očakávania.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agentúrny pracovník',
      description: 'Pracujete na agentúrach. Zdieľajte svoje skúsenosti z praxe.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Predchádzajúce',
    next: 'Ďalej',
    submit: 'Odoslať odpovede',
    submitting: 'Odosielanie...',
    back: 'Späť',
    start: 'Štart',
  },
  
  // Confirmation
  confirmation: {
    title: 'Ďakujeme za vašu účasť!',
    subtitle: 'Vaše odpovede boli úspešne uložené',
    message: 'Momentálne analyzujeme všetky odpovede, aby sme vytvorili riešenie presne zodpovedajúce vašim potrebám.',
    cta_back: 'Späť na hlavnú stránku',
    cta_dashboard: 'Zobraziť Dashboard',
  },
  
  // Progress
  progress: {
    section: 'Sekcia',
    question: 'Otázka',
    section_completed: 'Sekcia dokončená',
    questions_remaining: '{count} zostávajúcich otázok',
    time_remaining: 'Približne {time} zostáva',
  },
  
  // Common translations
  common: {
    oui: 'Áno',
    non: 'Nie',
    autre: 'Iné',
    loading: 'Načítavanie...',
    submit: 'Odoslať',
    next: 'Ďalej',
    previous: 'Predchádzajúce',
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
    profileAgency: 'Agentúra práce',
    profileClient: 'Klient',
    profileWorker: 'Agentúrny pracovník',
    score_not_interested: 'Nemám záujem',
    score_very_interested: 'Veľmi ma zaujíma',
  },
  
  // Sectors
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
  
  // Questions - hérite de FR puis surcharge avec traductions SK
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Názov',
      placeholder: 'Názov organizácie alebo vaše celé meno',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Rok založenia',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Rok založenia vašej spoločnosti',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Vaša národnosť',
      placeholder: 'napr.: poľská, rumunská...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
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
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Roky skúseností s agentúrnou prácou',
      options: {
        '<1': 'Menej ako 1 rok',
        '1-3': '1-3 roky',
        '3-5': '3-5 rokov',
        '5-10': '5-10 rokov',
        '10+': 'Viac ako 10 rokov',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Hlavné odvetvia',
      description: 'Vyberte všetky relevantné odvetvia',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Vaše profesie',
      description: 'Vyberte všetky vaše profesie',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Krajina vašej agentúry',
      placeholder: 'napr.: Poľsko',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Krajina, kde vaša spoločnosť pôsobí',
      placeholder: 'napr.: Francúzsko',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Krajiny, kde ste pracovali ako agentúrny pracovník',
      placeholder: 'napr.: Francúzsko, Nemecko, Belgicko...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Ročný objem vyslaných pracovníkov',
      options: {
        '0': 'Zatiaľ žiadny',
        '1-50': '1-50 pracovníkov',
        '51-200': '51-200 pracovníkov',
        '201-500': '201-500 pracovníkov',
        '500+': 'Viac ako 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
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
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Ako často pracujete na agentúrach?',
      options: {
        permanent: 'Pravidelne (celý rok)',
        saisonnier: 'Sezónne (určité mesiace)',
        occasionnel: 'Občas',
        jamais: 'Zatiaľ nikdy (hľadám)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Odkiaľ pochádzajú vaši vyslaní pracovníci?',
      placeholder: 'napr.: Poľsko, Rumunsko, Bulharsko...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Cieľové krajiny',
      description: 'Krajiny, kam vysielajete pracovníkov',
      placeholder: 'napr.: Francúzsko, Nemecko, Belgicko, Holandsko...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Národnosti agentúrnych pracovníkov, ktorých zamestnávate',
      placeholder: 'napr.: poľská, rumunská, bulharská...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Vaša hlavná výzva s medzinárodným vysielaním',
      options: {
        admin: 'Administratívna zložitosť (A1, SIPSI...)',
        conformite: 'Dodržiavanie predpisov vo viacerých krajinách',
        cout: 'Náklady a čas na správu',
        langues: 'Jazykové bariéry',
        autre: 'Iné',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Vaša hlavná výzva s európskymi agentúrnymi pracovníkmi',
      options: {
        trouver: 'Hľadanie spoľahlivých agentúr',
        conformite: 'Právna zhoda',
        qualite: 'Kvalita/zručnosti',
        cout: 'Príliš vysoké náklady',
        langues: 'Komunikácia / Jazyky',
        autre: 'Iné',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Vaša hlavná výzva s agentúrnou prácou v zahraničí',
      options: {
        admin: 'Administratívne papierovanie',
        langue: 'Jazyková bariéra',
        logement: 'Hľadanie ubytovania',
        transport: 'Doprava',
        salaire: 'Problémy s výplatou/platom',
        autre: 'Iné',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Upresnite svoju hlavnú výzvu',
      placeholder: 'Popíšte svoju hlavnú výzvu...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      label: 'Ako dnes spravujete prihlášky k vyslaniu?',
      options: {
        interne: 'Interný tím',
        externe: 'Externý poskytovateľ služieb',
        mixte: 'Zmiešaný prístup',
        manuel: 'Manuálna správa',
        logiciel: 'Špecializovaný softvér',
        manuel: 'Manuálne (Excel, Word...)',
        logiciel_interne: 'Interný softvér',
        prestataire: 'Externý poskytovateľ služieb',
      },
    },
    
    // Q10 : Agences (CLIENT)
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
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Ako najímate agentúrnych pracovníkov?',
      options: {
        agence_fr: 'Francúzske personálne agentúry',
        agence_euro: 'Európske personálne agentúry',
        direct: 'Priamy nábor',
        mixte: 'Zmiešane',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Ako hľadáte agentúrnu prácu?',
      options: {
        agence: 'Cez personálne agentúry',
        bouche: 'Odporúčanie',
        internet: 'Online pracovné portály',
        direct: 'Priama žiadosť',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'S koľkými agentúrami spolupracujete?',
      options: {
        '1': 'Iba 1 agentúra',
        '2-3': '2-3 agentúry',
        '4-10': '4-10 agentúr',
        '10+': 'Viac ako 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      label: 'Mali ste pokuty alebo incidenty súvisiace s dodržiavaním predpisov pre vyslanie?',
      description: 'Vaša odpoveď zostane anonymná',
      options: {
        jamais: 'Nie, nikdy',
        rarement: 'Zriedka (1-2x)',
        parfois: 'Niekedy (3-5x)',
        souvent: 'Často (6+x)',
        oui_souvent: 'Áno, často',
        oui_rare: 'Áno, občas',
        non: 'Nie',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Overujete právnu zhodu personálnych agentúr?',
      options: {
        oui_systematique: 'Áno, systematicky',
        oui_parfois: 'Áno, niekedy',
        non: 'Nie',
        ne_sait_pas: 'Neviem',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Mali ste problémy s agentúrnou prácou v zahraničí?',
      options: {
        oui_graves: 'Áno, vážne problémy',
        oui_mineurs: 'Áno, menšie problémy',
        non: 'Nie',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Máte rozpočet na externé služby pre správu vyslania?',
      options: {
        oui_important: 'Áno, významný',
        oui_modere: 'Áno, mierny',
        non: 'Nie',
        ne_sait_pas: 'Neviem',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Aké sú vaše hlavné kritériá pri výbere personálnej agentúry?',
      description: 'Vyberte viac možností',
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Ako ste spokojný so svojimi súčasnými pracovnými podmienkami?',
      options: {
        tres_satisfait: 'Veľmi spokojný',
        satisfait: 'Spokojný',
        neutre: 'Neutrálny',
        insatisfait: 'Nespokojný',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Priemerná doba trvania vašich vysielacích misií',
      options: {
        '<1mois': 'Menej ako 1 mesiac',
        '1-3mois': '1-3 mesiace',
        '3-6mois': '3-6 mesiacov',
        '6-12mois': '6-12 mesiacov',
        '12+mois': 'Viac ako 12 mesiacov',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Ročný rozpočet venovaný agentúrnej práci',
      options: {
        '0-50k': '0-50 000 €',
        '50-200k': '50 000-200 000 €',
        '200-500k': '200 000-500 000 €',
        '500k+': '500 000+ €',
        'inconnu': 'Neviem',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Vaša preferovaná doba trvania zákazky',
      options: {
        court: 'Krátka (< 3 mesiace)',
        moyen: 'Stredná (3-6 mesiacov)',
        long: 'Dlhá (> 6 mesiacov)',
        indifferent: 'Je mi to jedno',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Spokojnosť s vašimi súčasnými agentúrami',
      options: {
        'tres_satisfait': 'Veľmi spokojný',
        'satisfait': 'Spokojný',
        'neutre': 'Neutrálny',
        'insatisfait': 'Málo spokojný',
        'tres_insatisfait': 'Veľmi nespokojný',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Spokojnosť s vašimi súčasnými agentúrami',
      options: {
        'tres_satisfait': 'Veľmi spokojný',
        'satisfait': 'Spokojný',
        'neutre': 'Neutrálny',
        'insatisfait': 'Málo spokojný',
        'tres_insatisfait': 'Veľmi nespokojný',
      },
    },
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Vaše hlavné obavy',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        amendes: 'Pokuty a sankcie',
        reputation: 'Povesť / Image',
        penal: 'Trestná zodpovednosť',
        delais: 'Oneskorenie misií',
        clients: 'Strata klientov',
        aucun: 'Žiadne významné riziko',
        sanctions: 'Pokuty/sankcie',
        conformite: 'Súlad vo viacerých krajinách',
        cout: 'Administratívne náklady',
        documentation: 'Správa dokumentov',
        responsabilite: 'Trestná zodpovednosť',
        perte_clients: 'Strata klientov',
      },
    },
    
    // Q14 : Risques client (CLIENT)
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Aké riziká vás najviac znepokojujú?',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        conformite: 'Nedodržanie právnych predpisov',
        qualite: 'Nedostatočná kvalita',
        communication: 'Komunikácia/Jazyky',
        cout: 'Neočakávané náklady',
        disponibilite: 'Dostupnosť kandidátov',
        aucun: 'Žiadne významné obavy',
        fiabilite: 'Spoľahlivosť agentúr',
      },
    },
    
    // Q14 : Risques worker (WORKER)
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'S akými problémami sa najčastejšie stretávate?',
      description: 'Vyberte všetky relevantné možnosti',
      options: {
        paiement: 'Oneskorenie platieb',
        conditions: 'Zlé podmienky',
        contrat: 'Nedodržané zmluvy',
        logement: 'Nevyhovujúce ubytovanie',
        communication: 'Problémy s komunikáciou',
        aucun: 'Žiadne veľké problémy',
      },
    },
    
    // Q15 : Problème (AGENCY)
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Aký problém by ste chceli vyriešiť ako prvý?',
      placeholder: 'Popíšte svoj prioritný problém...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Aké sú vaše prioritné potreby?',
      placeholder: 'Napr.: Rýchlo nájsť, lepšia kvalita, ceny...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Čo by ste chceli zlepšiť na svojich zákazkách?',
      placeholder: 'Napr.: Plat, ubytovanie, podpora, stabilita...',
    },
    
    // Section 3 - Besoins/Potreby
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Mali by ste záujem o európsku platformu pre ponuku svojich služieb?',
      description: 'Trhovisko pre zvýšenie vašej viditeľnosti',
      options: {
        tres_interesse: 'Veľmi zaujatý',
        interesse: 'Zaujatý',
        neutre: 'Neutrálny',
        pas_interesse: 'Nezaujatý',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Mali by ste záujem o platformu pre jednoduché hľadanie európskych agentúr?',
      options: {
        tres_interesse: 'Veľmi zaujatý',
        interesse: 'Zaujatý',
        neutre: 'Neutrálny',
        pas_interesse: 'Nezaujatý',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Mali by ste záujem o platformu pre hľadanie zákaziek?',
      options: {
        tres_interesse: 'Veľmi zaujatý',
        interesse: 'Zaujatý',
        neutre: 'Neutrálny',
        pas_interesse: 'Nezaujatý',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Ktoré funkcie by boli najužitočnejšie?',
      description: 'Vyberte viac možností',
      options: {
        marketplace: 'Trhovisko služieb',
        admin: 'Automatizovaná administrativa',
        conformite: 'Kontroly zhody',
        payment: 'Integrované platby',
        support: 'Viacjazyčná podpora',
        autre: 'Iné',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Ktoré funkcie by boli najužitočnejšie?',
      description: 'Vyberte viac možností',
      options: {
        comparaison: 'Porovnanie agentúr',
        avis: 'Overené recenzie',
        suivi: 'Sledovanie misií',
        documentation: 'Centralizovaná dokumentácia',
        facturation: 'Správa fakturácie',
        autre: 'Iné',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Ktoré funkcie by boli najužitočnejšie?',
      description: 'Vyberte viac možností',
      options: {
        recherche: 'Pokročilé vyhľadávanie zákaziek',
        alertes: 'Upozornenia na nové zákazky',
        documents: 'Správa dokumentov',
        avis: 'Hodnotenia agentúr',
        support: 'Viacjazyčná podpora',
        autre: 'Iné',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Aká by bola vaša najväčšia prekážka pre použitie takejto platformy?',
      options: {
        cout: 'Náklady',
        complexite: 'Príliš zložité',
        confiance: 'Nedostatok dôvery',
        changement: 'Nechcem meniť',
        aucun: 'Žiadna prekážka',
        autre: 'Iné',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Aká by bola vaša najväčšia prekážka?',
      options: {
        cout: 'Náklady',
        confiance: 'Dôvera v agentúry',
        complexite: 'Príliš zložité',
        aucun: 'Žiadna prekážka',
        autre: 'Iné',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Aká by bola vaša najväčšia prekážka?',
      options: {
        complexite: 'Príliš zložité',
        confiance: 'Dôvera v platformu',
        acces: 'Prístup k technológii',
        aucun: 'Žiadna prekážka',
        autre: 'Iné',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Ktorý cenový model sa vám zdá najvhodnejší?',
      options: {
        commission: 'Provízia za misiu',
        abonnement: 'Mesačné predplatné',
        freemium: 'Zadarmo + prémiové možnosti',
        autre: 'Iné',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Ktoré služby by ste najviac ocenili?',
      description: 'Vyberte viac možností',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Ktoré služby by ste najviac ocenili?',
      description: 'Vyberte viac možností',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Odporučili by ste takúto platformu kolegom?',
      options: {
        certainement: 'Určite',
        probablement: 'Pravdepodobne',
        peut_etre: 'Možno',
        probablement_pas: 'Pravdepodobne nie',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Odporučili by ste takéto riešenie?',
      options: {
        certainement: 'Určite',
        probablement: 'Pravdepodobne',
        peut_etre: 'Možno',
        probablement_pas: 'Pravdepodobne nie',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Odporučili by ste takúto platformu?',
      options: {
        certainement: 'Určite',
        probablement: 'Pravdepodobne',
        peut_etre: 'Možno',
        probablement_pas: 'Pravdepodobne nie',
      },
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      label: 'Používate ERP/riadiaci softvér?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Iný',
        aucun: 'Žiadny ERP',
        oui: 'Áno',
        non: 'Nie',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Ktorý softvér/ERP?',
      placeholder: 'Napr.: SAP, Odoo, vlastný...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Vaše hlavné kritériá výberu personálnych agentúr',
      description: 'Vyberte top 3',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Čo by zlepšilo vašu skúsenosť s agentúrnou prácou?',
      description: 'Vyberte všetky relevantné možnosti',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      label: 'Ste pripravení zmeniť svoje pracovné nástroje?',
      options: {
        oui: 'Áno, bez problému',
        conditions: 'Áno, za určitých podmienok',
        difficile: 'Ťažké, ale otvorený',
        non: 'Nie, nepredstaviteľné',
        oui_rapidement: 'Áno, okamžite',
        oui_progressivement: 'Áno, postupne',
        non_satisfait: 'Nie, spokojný so súčasnými nástrojmi',
        non_peur: 'Nie, strach zo zmeny',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Mesačný rozpočet na platformu pre nábor',
      options: {
        '0': 'Nie som ochotný platiť',
        '1-100': '1 - 100 €/mesiac',
        '100-500': '100 - 500 €/mesiac',
        '500-1000': '500 - 1 000 €/mesiac',
        '1000+': 'Viac ako 1 000 €/mesiac',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Používali by ste platformu pre hľadanie agentúrnej práce v zahraničí?',
      options: {
        oui_certainement: 'Áno, určite',
        oui_probablement: 'Áno, pravdepodobne',
        peut_etre: 'Možno',
        non: 'Nie',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Záujem o európske trhovisko pre vyslanie (0-10)',
      description: 'Hodnotenie od 1 (nemám záujem) do 10 (veľký záujem)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Najzaujímavejšie funkcie',
      description: 'Vyberte svoje top 3 priority',
      options: {
        sipsi: 'Automatické hlásenie SIPSI',
        a1: 'Správa certifikátu A1',
        conformite: 'Dashboard dodržiavania predpisov',
        alertes: 'Upozornenia a obnovenie',
        documents: 'Centralizácia dokumentov',
        marketplace: 'Trhovisko agentúr',
        support: 'Viacjazyčná expertná podpora',
        api: 'API integrácia (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Najzaujímavejšie funkcie',
      description: 'Vyberte všetky, ktoré vás zaujímajú',
      options: {
        recherche: 'Hľadanie spoľahlivých agentúr',
        comparaison: 'Porovnanie ceny/kvality',
        avis: 'Overené recenzie',
        conformite: 'Záruka dodržiavania predpisov',
        support: 'Vyhradená podpora',
        facturation: 'Centralizovaná fakturácia',
        suivi: 'Sledovanie v reálnom čase',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Najzaujímavejšie funkcie',
      description: 'Vyberte všetky, ktoré vás zaujímajú',
      options: {
        recherche: 'Hľadanie práce',
        avis: 'Hodnotenie agentúr',
        logement: 'Pomoc s ubytovaním',
        paiement: 'Bezpečná platba',
        support: 'Podpora v mojom jazyku',
        documents: 'Pomoc s administratívnymi dokumentmi',
        formation: 'Školiace programy',
      },
    },
    
    // Q20 : Prix
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
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Mesačný rozpočet na kompletné SaaS riešenie',
      options: {
        '0-100': '0 - 100 €/mesiac',
        '100-300': '100 - 300 €/mesiac',
        '300-500': '300 - 500 €/mesiac',
        '500-1000': '500 - 1 000 €/mesiac',
        '1000+': 'Viac ako 1 000 €/mesiac',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Chceli by ste otestovať rannú verziu (MVP)?',
      options: {
        oui_gratuit: 'Áno, zadarmo',
        oui_reduc: 'Áno, so zľavou',
        peut_etre: 'Možno, závisí na funkciách',
        non: 'Nie, nemám záujem',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Ako vidíte svoju rolu na európskom trhu?',
      options: {
        decideur: 'Konečný rozhodovateľ',
        influenceur: 'Influencer / Odporúčanie',
        utilisateur: 'Koncový používateľ',
        autre: 'Iné',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Chceli by ste sa zúčastniť beta fázy?',
      options: {
        oui_immediat: 'Áno, okamžite',
        oui_plus_tard: 'Áno, ale neskôr',
        non: 'Nie',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Chceli by ste sa zúčastniť testu?',
      options: {
        oui_immediat: 'Áno, okamžite',
        oui_plus_tard: 'Áno, ale neskôr',
        non: 'Nie',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Chceli by ste sa zúčastniť testu?',
      options: {
        oui_immediat: 'Áno, okamžite',
        oui_plus_tard: 'Áno, ale neskôr',
        non: 'Nie',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Ako vidíte svoju vysielaciu aktivitu v nasledujúcich 3 rokoch?',
      options: {
        forte_croissance: 'Silný rast',
        croissance: 'Mierny rast',
        stable: 'Stabilný',
        decroissance: 'Pokles',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Ako vidíte vývoj svojich agentúrnych potrieb?',
      options: {
        hausse: 'Nárast',
        stable: 'Stabilný',
        baisse: 'Pokles',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Aké sú vaše projekty v nadchádzajúcich mesiacoch?',
      options: {
        meme_secteur: 'Pokračovať v rovnakom odvetví',
        changer_secteur: 'Zmeniť odvetvie',
        se_former: 'Vzdelávať sa',
        entrepreneur: 'Stať sa podnikateľom',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Plánujete zvýšiť svoj rozpočet na externé služby?',
      options: {
        oui_beaucoup: 'Áno, výrazne',
        oui_peu: 'Áno, trochu',
        non: 'Nie',
        ne_sait_pas: 'Neviem',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Plánujete zvýšiť svoj náborový rozpočet?',
      options: {
        oui_beaucoup: 'Áno, výrazne',
        oui_peu: 'Áno, trochu',
        non: 'Nie',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Ste ochotný sa presťahovať za prácou?',
      options: {
        oui_europe: 'Áno, kdekoľvek v Európe',
        oui_proche: 'Áno, susedné krajiny',
        non: 'Nie, iba moja krajina',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'E-mail (voliteľné)',
      placeholder: 'vas@email.sk',
      description: 'Pre získanie výsledkov a informácií o projekte',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Firemný e-mail (voliteľné)',
      placeholder: 'kontakt@vasaagentura.sk',
      description: 'Pre získanie výsledkov a exkluzívny prístup k platforme',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Firemný e-mail (voliteľné)',
      placeholder: 'kontakt@vasafirma.sk',
      description: 'Pre získanie odporúčaní prispôsobených vašim potrebám',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'E-mail (voliteľné)',
      placeholder: 'vas@email.sk',
      description: 'Pre získanie príležitostí zodpovedajúcich vášmu profilu',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Telefón (voliteľné)',
      placeholder: '+421 123 456 789',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Dodatočné pripomienky alebo návrhy',
      placeholder: 'Zdieľajte svoje nápady, očakávania alebo špecifické potreby...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Vízia trhu v nasledujúcich 3 rokoch',
      placeholder: 'Zdieľajte svoju víziu...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Ďalšie potreby alebo návrhy',
      placeholder: 'Vaše návrhy nás zaujímajú...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Firemný telefón',
      placeholder: '+421 2 1234 5678',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Meno',
      placeholder: 'Vaše meno',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Priezvisko',
      placeholder: 'Vaše priezvisko',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'IČO (nepovinné)',
      placeholder: '12345678',
      description: 'Na obohacovanie cez obchodný register',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-mail',
      placeholder: 'vas.email@priklad.sk',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Súhlasím s opätovným kontaktovaním',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Chcel(a) by som dostať správu o štúdii',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Cena',
    },
    critere_qualite: {
      label: 'Kvalita profilov',
    },
    critere_rapidite: {
      label: 'Rýchlosť reakcie',
    },
    critere_conformite: {
      label: 'Právna zhoda',
    },
    critere_flexibilite: {
      label: 'Flexibilita',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Osobný sprievod',
    },
    service_garantie: {
      label: 'Záruka náhrady',
    },
    service_formation: {
      label: 'Predbežné školenie',
    },
    service_gestion: {
      label: 'Administratívna správa',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Školenie a certifikácie',
    },
    service_logement: {
      label: 'Pomoc s ubytovaním',
    },
    service_transport: {
      label: 'Dopravná podpora',
    },
    service_administratif: {
      label: 'Administratívna podpora',
    },
  },
};