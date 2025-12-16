/**
 * 🇨🇿 TRADUCTIONS TCHÈQUES (CZ)
 * 
 * Traductions complètes pour le tchèque
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const cz: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profil',
    section2: 'Zkušenosti',
    section3: 'Potřeby',
    section4: 'Zájem',
    section5: 'Vize',
    section6: 'Kontakt',
    dashboard: 'Dashboard',
    back_to_site: 'Zpět na web',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Přehled',
      results: 'Výsledky',
      questions: 'Otázky',
      translations: 'Překlady',
      export: 'Export',
      integrations: 'Integrace',
      cms: 'CMS formuláře',
      settings: 'Nastavení',
      prospects: 'Zájemci',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nové',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Odhlásit se',
      back_to_survey: 'Zpět k dotazníku',
      toggle_sidebar: 'Sbalit/Rozbalit',
    },
    user: {
      welcome: 'Vítejte',
      logged_in_as: 'Přihlášen jako',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Profil',
      description: '4 otázky • 2 min',
    },
    2: {
      title: 'Zkušenosti',
      description: '7 otázek • 3 min',
    },
    3: {
      title: 'Potřeby',
      description: '6 otázek • 2 min',
    },
    4: {
      title: 'Zájem o YoJob',
      description: '6 otázek • 3 min',
    },
    5: {
      title: 'Budoucí vize',
      description: '2 otázky • 1 min',
    },
    6: {
      title: 'Kontakt',
      description: '1 otázka • 1 min',
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Průzkum trhu',
  },
  
  // Hero
  hero: {
    title: 'Průzkum trhu',
    subtitle: 'Pomozte nám lépe porozumět vašim potřebám',
    description: 'Tento průzkum trvá přibližně 10-15 minut. Vaše odpovědi nám pomohou vytvořit řešení přizpůsobené vašemu odvětví.',
    cta_start: 'Zahájit průzkum',
    cta_dashboard: 'Otevřít Dashboard',
    badge: 'Evropská studie trhu',
    stat: {
      countries: '27 evropských zemí',
      questions: 'otázky',
      benchmark: 'Získejte benchmark 2025',
      insights: 'Exkluzivní poznatky o trhu',
      opportunities: 'Prioritní přístup k pracím',
    },
    footer: {
      info: 'otázky • Anonymní • V souladu s GDPR',
      anonymous: 'Anonymní',
      gdpr: 'V souladu s GDPR',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Kdo jste?',
    subtitle: 'Vyberte svůj profil pro přizpůsobení otázek',
    agency: 'Agentura práce',
    agency_description: 'Jste personální nebo vysílající agentura',
    client: 'Klient',
    client_description: 'Jste společnost, která zaměstnává agenturní pracovníky',
    worker: 'Agenturní pracovník',
    worker_description: 'Jste agenturní nebo vyslaný pracovník',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Evropská studie trhu - Nábor & Agenturní práce',
    title: 'Sdílejte své zkušenosti s evropským trhem',
    subtitle: 'Vyberte svůj profil pro zahájení průzkumu',
    cta: 'Klikněte pro zahájení →',
    trust: {
      secure: 'Zabezpečená data',
      languages: '{count} dostupných jazyků',
      languages_suffix: 'dostupných jazyků',
      anonymous: 'Anonymní & důvěrné',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Agentura práce',
      description: 'Jste evropská personální agentura. Sdílejte své zkušenosti s vysíláním.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Klient',
      description: 'Najímáte agenturní pracovníky. Sdílejte své potřeby a očekávání.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Agenturní pracovník',
      description: 'Pracujete na agenturách. Sdílejte své zkušenosti z praxe.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Předchozí',
    next: 'Další',
    submit: 'Odeslat odpovědi',
    submitting: 'Odesílání...',
    back: 'Zpět',
    start: 'Start',
  },
  
  // Confirmation
  confirmation: {
    title: 'Děkujeme za vaši účast!',
    subtitle: 'Vaše odpovědi byly úspěšně uloženy',
    message: 'Momentálně analyzujeme všechny odpovědi, abychom vytvořili řešení přesně odpovídající vašim potřebám.',
    cta_back: 'Zpět na hlavní stránku',
    cta_dashboard: 'Zobrazit Dashboard',
  },
  
  // Progress
  progress: {
    section: 'Sekce',
    question: 'Otázka',
    section_completed: 'Sekce dokončena',
    questions_remaining: '{count} zbývajících otázek',
    time_remaining: 'Přibližně {time} zbývá',
  },
  
  // Common translations
  common: {
    oui: 'Ano',
    non: 'Ne',
    autre: 'Jiné',
    loading: 'Načítání...',
    submit: 'Odeslat',
    next: 'Další',
    previous: 'Předchozí',
    skip: 'Přeskočit',
    save: 'Uložit',
    cancel: 'Zrušit',
    close: 'Zavřít',
    required: 'Povinné',
    optional: 'Volitelné',
    error: 'Chyba',
    success: 'Úspěch',
    completed: 'Dokončeno',
    inProgress: 'Probíhá',
    notStarted: 'Nezahájeno',
    profileAgency: 'Agentura práce',
    profileClient: 'Klient',
    profileWorker: 'Agenturní pracovník',
    score_not_interested: 'Nemám zájem',
    score_very_interested: 'Velmi mě zajímá',
  },
  
  // Sectors
  sectors: {
    btp: 'Stavebnictví',
    industrie: 'Průmysl',
    logistique: 'Logistika',
    hotellerie: 'Pohostinství',
    sante: 'Zdravotnictví',
    agriculture: 'Zemědělství',
    tech: 'Tech/IT',
    autres: 'Ostatní',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions CZ
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Název',
      placeholder: 'Název organizace nebo vaše celé jméno',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Rok založení',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Rok založení vaší společnosti',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Vaše národnost',
      placeholder: 'např.: polská, rumunská...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Velikost organizace',
      options: {
        '1-9': '1-9 zaměstnanců',
        '10-49': '10-49 zaměstnanců',
        '50-249': '50-249 zaměstnanců',
        '250+': '250+ zaměstnanců',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Roky zkušeností s agenturní prací',
      options: {
        '<1': 'Méně než 1 rok',
        '1-3': '1-3 roky',
        '3-5': '3-5 let',
        '5-10': '5-10 let',
        '10+': 'Více než 10 let',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Hlavní odvětví',
      description: 'Vyberte všechna relevantní odvětví',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Vaše profese',
      description: 'Vyberte všechny vaše profese',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Země vaší agentury',
      placeholder: 'např.: Polsko',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Země, kde vaše společnost působí',
      placeholder: 'např.: Francie',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Země, kde jste pracovali jako agenturní pracovník',
      placeholder: 'např.: Francie, Německo, Belgie...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Roční objem vyslaných pracovníků',
      options: {
        '0': 'Zatím žádný',
        '1-50': '1-50 pracovníků',
        '51-200': '51-200 pracovníků',
        '201-500': '201-500 pracovníků',
        '500+': 'Více než 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Kolik agenturních pracovníků zaměstnáváte ročně?',
      options: {
        '0': 'Momentálně žádné',
        '1-10': '1-10 osob',
        '11-50': '11-50 osob',
        '51-200': '51-200 osob',
        '200+': '200+ osob',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Jak často pracujete na agenturách?',
      options: {
        permanent: 'Pravidelně (celý rok)',
        saisonnier: 'Sezónně (určité měsíce)',
        occasionnel: 'Občas',
        jamais: 'Zatím nikdy (hledám)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Odkud pocházejí vaši vyslaní pracovníci?',
      placeholder: 'např.: Polsko, Rumunsko, Bulharsko...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Cílové země',
      description: 'Země, kam vysíláte pracovníky',
      placeholder: 'např.: Francie, Německo, Belgie, Nizozemsko...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Národnosti agenturních pracovníků, které zaměstnáváte',
      placeholder: 'např.: polská, rumunská, bulharská...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Vaše hlavní výzva s mezinárodním vysíláním',
      options: {
        admin: 'Administrativní složitost (A1, SIPSI...)',
        conformite: 'Dodržování předpisů ve více zemích',
        cout: 'Náklady a čas na správu',
        langues: 'Jazykové bariéry',
        autre: 'Jiné',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Vaše hlavní výzva s evropskými agenturními pracovníky',
      options: {
        trouver: 'Hledání spolehlivých agentur',
        conformite: 'Právní shoda',
        qualite: 'Kvalita/dovednosti',
        cout: 'Příliš vysoké náklady',
        langues: 'Komunikace / Jazyky',
        autre: 'Jiné',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Vaše hlavní výzva na zakázkách',
      options: {
        trouver: 'Hledání zakázek',
        admin: 'Administrativní papírování',
        logement: 'Ubytování / Bydlení',
        langue: 'Místní jazyk',
        paiement: 'Platby / Plat',
        autre: 'Jiné',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Upřesněte svou hlavní výzvu',
      placeholder: 'Popište svou hlavní výzvu...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Jak dnes spravujete přihlášky k vyslání?',
      options: {
        interne: 'Interní tým',
        externe: 'Externí poskytovatel služeb',
        mixte: 'Smíšený přístup',
        manuel: 'Ruční správa',
        logiciel: 'Specializovaný software',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Kolik personálních agentur používáte?',
      options: {
        '0': 'Žádnou',
        '1': '1 agenturu',
        '2-3': '2-3 agentury',
        '4-10': '4-10 agentur',
        '10+': 'Více než 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Jak najímáte agenturní pracovníky?',
      options: {
        agence_fr: 'Francouzské personální agentury',
        agence_euro: 'Evropské personální agentury',
        direct: 'Přímý nábor',
        mixte: 'Smíšeně',
      },
    },

    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Jak hledáte agenturní práci?',
      options: {
        agence: 'Přes personální agentury',
        bouche: 'Doporučení',
        internet: 'Online pracovní portály',
        direct: 'Přímé podání žádosti',
      },
    },

    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'S kolika agenturami spolupracujete?',
      options: {
        '1': 'Pouze 1 agentura',
        '2-3': '2-3 agentury',
        '4-10': '4-10 agentur',
        '10+': 'Více než 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Měli jste pokuty nebo incidenty související s dodržováním předpisů pro vyslání?',
      description: 'Vaše odpověď zůstane anonymní',
      options: {
        jamais: 'Ne, nikdy',
        rarement: 'Zřídka (1-2x)',
        parfois: 'Někdy (3-5x)',
        souvent: 'Často (6+)',
      },
    },

    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Ověřujete právní shodu personálních agentur?',
      options: {
        oui_systematique: 'Ano, systematicky',
        oui_parfois: 'Ano, někdy',
        non: 'Ne',
        ne_sait_pas: 'Nevím',
      },
    },

    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Měli jste problémy s agenturní prací v zahraničí?',
      options: {
        oui_graves: 'Ano, závažné problémy',
        oui_mineurs: 'Ano, drobné problémy',
        non: 'Ne',
      },
    },

    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Roční rozpočet na administrativní správu vyslání',
      options: {
        '0-5k': '0-5 000 € / rok',
        '5-15k': '5 000-15 000 € / rok',
        '15-30k': '15 000-30 000 € / rok',
        '30k+': '30 000+ € / rok',
        inconnu: 'Nevím',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Roční rozpočet věnovaný agenturní práci',
      options: {
        '0-50k': '0 - 50 000 €',
        '50-200k': '50 000 - 200 000 €',
        '200-500k': '200 000 - 500 000 €',
        '500k+': '500 000+ €',
        'inconnu': 'Nevím',
      },
    },

    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Spokojenost se současnými personálními agenturami',
      options: {
        tres_satisfait: 'Velmi spokojený',
        satisfait: 'Spokojený',
        neutre: 'Neutrální',
        insatisfait: 'Nespokojený',
      },
    },

    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Jste spokojeni se svým platem z agenturní práce?',
      options: {
        '<1500': 'Méně než 1 500 €',
        '1500-2500': '1 500 - 2 500 €',
        '2500-3500': '2 500 - 3 500 €',
        '3500+': '3 500+ €',
      },
    },

    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Jaké procento tržeb ztrácíte kvůli administrativní složitosti?',
      options: {
        'non': 'Ne, ne opravdu',
        'faible': 'Ano, nízké (< 5% tržeb)',
        'moyen': 'Ano, střední (5-15% tržeb)',
        'important': 'Ano, významné (> 15% tržeb)',
      },
    },

    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Spokojenost s vašimi současnými agenturami',
      options: {
        'tres_satisfait': 'Velmi spokojený',
        'satisfait': 'Spokojený',
        'neutre': 'Neutrální',
        'insatisfait': 'Málo spokojený',
        'tres_insatisfait': 'Velmi nespokojený',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Spokojenost s vašimi současnými agenturami',
      options: {
        'tres_satisfait': 'Velmi spokojený',
        'satisfait': 'Spokojený',
        'neutre': 'Neutrální',
        'insatisfait': 'Málo spokojený',
        'tres_insatisfait': 'Velmi nespokojený',
      },
    },
    
    // Section 3 - Besoins/Potřeby
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Vaše hlavní obavy',
      description: 'Vyberte všechny relevantní možnosti',
      options: {
        amendes: 'Pokuty a sankce',
        reputation: 'Pověst / Image',
        penal: 'Trestní odpovědnost',
        delais: 'Zpoždění misí',
        clients: 'Ztráta klientů',
        aucun: 'Žádné významné riziko',
      },
    },
    
    // Q14 : Risques client (CLIENT)
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Jaká rizika vás nejvíce znepokojují?',
      description: 'Vyberte všechny relevantní možnosti',
      options: {
        conformite: 'Nedodržení právních předpisů',
        qualite: 'Nedostatečná kvalita',
        communication: 'Komunikace/Jazyky',
        cout: 'Neočekávané náklady',
        disponibilite: 'Dostupnost kandidátů',
        aucun: 'Žádné významné obavy',
      },
    },
    
    // Q14 : Risques worker (WORKER)
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'S jakými problémy se nejčastěji setkáváte?',
      description: 'Vyberte všechny relevantní možnosti',
      options: {
        paiement: 'Zpoždění plateb',
        conditions: 'Špatné podmínky',
        contrat: 'Nedodržené smlouvy',
        logement: 'Nevyhovující ubytování',
        communication: 'Problémy s komunikací',
        aucun: 'Žádné velké problémy',
      },
    },

    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Vaše hlavní potřeby',
      description: 'Vyberte všechny relevantní možnosti',
      options: {
        fiabilite: 'Najít spolehlivé agentury',
        conformite: 'Právní shoda',
        qualite: 'Kvalita/dovednosti',
        cout: 'Náklady',
        disponibilite: 'Dostupnost kandidátů',
        aucun: 'Žádné významné potřeby',
      },
    },

    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Vaše očekávání od agenturní práce v zahraničí',
      description: 'Vyberte všechny relevantní možnosti',
      options: {
        salaire: 'Lepší plat',
        conditions: 'Lepší pracovní podmínky',
        stabilite: 'Stabilita',
        experience: 'Mezinárodní zkušenosti',
        logement: 'Pomoc s bydlením',
        aucun: 'Žádná zvláštní očekávání',
      },
    },

    // Q15 : Problème (AGENCY)
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Jaký problém byste chtěli vyřešit jako první?',
      placeholder: 'Popište svůj prioritní problém...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Jaké jsou vaše prioritní potřeby?',
      placeholder: 'Např.: Rychle najít, lepší kvalita, ceny...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Co byste chtěli zlepšit na svých zakázkách?',
      placeholder: 'Např.: Plat, ubytování, podpora, stabilita...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Používáte ERP/řídicí software?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Jiný',
        aucun: 'Žádný ERP',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Který software/ERP?',
      placeholder: 'Např.: SAP, Odoo, vlastní...',
    },

    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Vaše hlavní kritéria pro výběr personálních agentur',
      description: 'Vyberte svá top 3',
    },

    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Co by zlepšilo vaše zkušenosti s agenturní prací?',
      description: 'Vyberte všechny relevantní možnosti',
    },

    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Jste připraveni změnit své pracovní nástroje?',
      options: {
        oui: 'Ano, bez problému',
        conditions: 'Ano, za určitých podmínek',
        difficile: 'Obtížné, ale otevřený',
        non: 'Ne, nepředstavitelné',
      },
    },

    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Měsíční rozpočet na platformu pro agenturní nábor',
      options: {
        '0': 'Nejsem ochoten platit',
        '1-100': '1 - 100 €/měsíc',
        '100-500': '100 - 500 €/měsíc',
        '500-1000': '500 - 1 000 €/měsíc',
        '1000+': 'Více než 1 000 €/měsíc',
      },
    },

    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Použili byste platformu pro hledání agenturní práce v zahraničí?',
      options: {
        oui_certainement: 'Ano, určitě',
        oui_probablement: 'Ano, pravděpodobně',
        peut_etre: 'Možná',
        non: 'Ne',
      },
    },

    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Zájem o evropské tržiště pro vyslání (0-10)',
      description: 'Hodnocení od 1 (nemám zájem) do 10 (velký zájem)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Nejzajímavější funkce',
      description: 'Vyberte své top 3 priority',
      options: {
        sipsi: 'Automatické hlášení SIPSI',
        a1: 'Správa certifikátu A1',
        conformite: 'Dashboard dodržování předpisů',
        alertes: 'Upozornění a obnovení',
        documents: 'Centralizace dokumentů',
        marketplace: 'Tržiště agentur',
        support: 'Vícejazyčná expertní podpora',
        api: 'API integrace (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Nejzajímavější funkce',
      description: 'Vyberte všechny, které vás zajímají',
      options: {
        recherche: 'Hledání spolehlivých agentur',
        comparaison: 'Porovnání ceny/kvality',
        avis: 'Ověřené recenze',
        conformite: 'Záruka dodržování předpisů',
        support: 'Vyhrazená podpora',
        facturation: 'Centralizovaná fakturace',
        suivi: 'Sledování v reálném čase',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Nejzajímavější funkce',
      description: 'Vyberte všechny, které vás zajímají',
      options: {
        recherche: 'Hledání práce',
        avis: 'Hodnocení agentur',
        logement: 'Pomoc s ubytováním',
        paiement: 'Bezpečná platba',
        support: 'Podpora v mém jazyce',
        documents: 'Pomoc s administrativními dokumenty',
        formation: 'Školicí programy',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Preferovaný cenový model',
      options: {
        mensuel: 'Pevné měsíční předplatné',
        usage: 'Platba podle využití',
        annuel: 'Roční plán (sleva)',
        gratuit: 'Zdarma pro pracovníky',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Měsíční rozpočet na kompletní SaaS řešení',
      options: {
        '0-100': '0 - 100 €/měsíc',
        '100-300': '100 - 300 €/měsíc',
        '300-500': '300 - 500 €/měsíc',
        '500-1000': '500 - 1 000 €/měsíc',
        '1000+': 'Více než 1 000 €/měsíc',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Chtěli byste otestovat ranou verzi (MVP)?',
      options: {
        oui_gratuit: 'Ano, zdarma',
        oui_reduc: 'Ano, se slevou',
        peut_etre: 'Možná, závisí na funkcích',
        non: 'Ne, nemám zájem',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Jak vidíte svou roli na evropském trhu?',
      options: {
        decideur: 'Konečný rozhodovatel',
        influenceur: 'Influencer / Doporučení',
        utilisateur: 'Koncový uživatel',
        autre: 'Jiné',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Vaše mezinárodní plány expanze',
      options: {
        oui_rapide: 'Ano, do 6 měsíců',
        oui_lent: 'Ano, do 1-2 let',
        maintien: 'Zachovat současné země',
        reduction: 'Omezit mezinárodní rozsah',
      },
    },
    
    // Q24bis : Aspirace (WORKER)
    q24_aspirations: {
      label: 'Vaše budoucí profesní ambice',
      placeholder: 'Např.: trvalý úvazek, návrat do země, školení...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Další potřeby nebo návrhy',
      placeholder: 'Vaše návrhy nás zajímají...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Firemní telefon',
      placeholder: '+420 123 456 789',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Jméno',
      placeholder: 'Vaše jméno',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Příjmení',
      placeholder: 'Vaše příjmení',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'IČO (volitelné)',
      placeholder: '12345678',
      description: 'Pro obohacení přes obchodní rejstřík',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'E-mail',
      placeholder: 'vas.email@priklad.cz',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Souhlasím s opětovným kontaktováním',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Chtěl(a) bych obdržet zprávu o studii',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-12T12:30:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Czech (CZ) Complete Translation',
    _locale: 'cs-CZ',
    _completeness: 100,
  },
};
