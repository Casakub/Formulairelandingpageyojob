/**
 * 🇷🇴 TRADUCERI ROMÂNEȘTI (RO)
 *
 * Traducere completă pentru română
 * Bază: en.ts (structură identică)
 *
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const ro: TranslationBundle = {
  // Moștenește de la FR pentru cheile lipsă
  ...fr,

  // Navigație
  nav: {
    section1: 'Profil',
    section2: 'Experiență',
    section3: 'Nevoi',
    section4: 'Interes',
    section5: 'Viziune',
    section6: 'Contact',
    dashboard: 'Dashboard',
    back_to_site: 'Înapoi pe site',
  },

  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Prezentare generală',
      results: 'Rezultate',
      questions: 'Întrebări',
      translations: 'Traduceri',
      export: 'Export',
      integrations: 'Integrări',
      cms: 'CMS Formular',
      settings: 'Setări',
      prospects: 'Prospecte',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nou',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Deconectare',
      back_to_survey: 'Înapoi la sondaj',
      toggle_sidebar: 'Restrânge/Extinde',
    },
    user: {
      welcome: 'Bun venit',
      logged_in_as: 'Conectat ca',
    },
  },

  // Secțiuni
  section: {
    1: { title: 'Profilul agenției', description: '4 întrebări • 2 min' },
    2: { title: 'Detașare', description: '7 întrebări • 3 min' },
    3: { title: 'Nevoi', description: '6 întrebări • 2 min' },
    4: { title: 'Interes YoJob', description: '6 întrebări • 3 min' },
    5: { title: 'Viziune de viitor', description: '2 întrebări • 1 min' },
    6: { title: 'Contact', description: '1 întrebare • 1 min' },
  },

  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Studiu de piață',
  },

  // Hero
  hero: {
    title: 'Sondaj de piață',
    subtitle: 'Ajutați-ne să înțelegem mai bine nevoile dvs.',
    description:
      'Acest sondaj durează aproximativ 10-15 minute. Răspunsurile dvs. ne vor ajuta să creăm o soluție adaptată sectorului dvs.',
    cta_start: 'Porniți sondajul',
    cta_dashboard: 'Accesați dashboard-ul',
    badge: 'Studiu de piață european',
    stat: {
      countries: '27 de țări europene',
      questions: 'întrebări',
      benchmark: 'Primiți benchmark-ul 2025',
      insights: 'Informații exclusive de piață',
      opportunities: 'Acces prioritar la joburi',
    },
    footer: {
      info: 'întrebări • Anonim • Conform GDPR',
      anonymous: 'Anonim',
      gdpr: 'Conform GDPR',
    },
  },

  // Tip respondent
  respondent_type: {
    title: 'Cine sunteți?',
    subtitle: 'Selectați profilul pentru a personaliza întrebările',
    agency: 'Agenție de muncă temporară',
    agency_description: 'Sunteți o agenție de muncă temporară sau de detașare',
    client: 'Companie client',
    client_description: 'Sunteți o companie care angajează muncitori temporari',
    worker: 'Muncitor temporar',
    worker_description: 'Sunteți muncitor temporar sau detașat',
  },

  // Selector respondent
  selector: {
    badge: '🌍 Studiu de piață european - Recrutare & Muncă temporară',
    title: 'Împărtășiți experiența dvs. pe piața europeană',
    subtitle: 'Selectați profilul pentru a începe sondajul',
    cta: 'Clic pentru a începe →',
    trust: {
      secure: 'Date securizate',
      languages: '{count} limbi disponibile',
      languages_suffix: 'limbi disponibile',
      anonymous: 'Anonim & confidențial',
    },
  },

  // Profile card
  respondent: {
    agency: {
      label: 'Agenție de muncă temporară',
      description: 'Sunteți o agenție europeană. Împărtășiți experiența de detașare.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Companie client',
      description: 'Angajați muncitori temporari. Împărtășiți nevoile și așteptările dvs.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Muncitor temporar',
      description: 'Lucrați ca muncitor temporar. Împărtășiți experiența din teren.',
      estimatedTime: '10 min',
    },
  },

  // Butoane
  button: {
    previous: 'Înapoi',
    next: 'Următor',
    submit: 'Trimite răspunsurile',
    submitting: 'Se trimite...',
    back: 'Înapoi',
    start: 'Start',
  },

  // Confirmare
  confirmation: {
    title: 'Vă mulțumim pentru participare! 🙏',
    subtitle: 'Răspunsurile au fost salvate cu succes',
    message: 'Analizăm toate răspunsurile pentru a crea o soluție perfect adaptată nevoilor dvs.',
    cta_back: 'Înapoi la pagina principală',
    cta_dashboard: 'Vezi dashboard-ul',
    description: 'Părerea dvs. este prețioasă și contribuie la modelarea viitorului YoJob.',
    cta: 'Înapoi la site-ul YoJob',
    
    reward: {
      report: {
        title: 'Raport "Tendințe 2025"',
        description: 'Trimis în 3 săptămâni'
      },
      earlyaccess: {
        title: 'Acces Anticipat YoJob',
        description: 'Top 100 participanți'
      }
    },
    
    thanks: {
      title: '🎁 Ca mulțumire pentru participare:',
      item1: '• Raport exclusiv "Tendințe ale detașării 2025"',
      item2: '• Top 100 participanți = 3 luni acces gratuit la YoJob (valoare 500€)'
    }
  },

  // Progres
  progress: {
    section: 'Secțiune',
    question: 'Întrebare',
    section_completed: 'Secțiune completată',
    questions_remaining: '{count} întrebări rămase',
    time_remaining: 'Aproximativ {time} rămas',
  },

  // Traduceri comune
  common: {
    oui: 'Da',
    non: 'Nu',
    autre: 'Altul',
    loading: 'Se încarcă...',
    submit: 'Trimite',
    next: 'Următor',
    previous: 'Anterior',
    skip: 'Sari peste',
    save: 'Salvează',
    cancel: 'Anulează',
    close: 'Închide',
    required: 'Obligatoriu',
    optional: 'Opțional',
    error: 'Eroare',
    success: 'Succes',
    completed: 'Finalizat',
    inProgress: 'În curs',
    notStarted: 'Neînceput',
    profileAgency: 'Agenție de muncă temporară',
    profileClient: 'Client',
    profileWorker: 'Muncitor temporar',
    score_not_interested: 'Nu sunt interesat',
    score_very_interested: 'Foarte interesat',
  },

  // Sectoare
  sectors: {
    btp: 'Construcții',
    industrie: 'Industrie',
    logistique: 'Logistică',
    hotellerie: 'HoReCa',
    sante: 'Sănătate',
    agriculture: 'Agricultură',
    tech: 'Tech/IT',
    autres: 'Altele',
  },

  // Întrebări – moștenește din FR și suprascrie cu RO
  questions: {
    ...fr.questions,

    // Q1 : Nume
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nume',
      placeholder: 'Numele organizației sau numele complet',
    },

    // Q2 : An înființare (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Anul înființării',
      placeholder: '2015',
    },

    // Q2 : An înființare (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Anul înființării companiei',
      placeholder: '2010',
    },

    // Q2 : Naționalitate (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Naționalitatea dvs.',
      placeholder: 'Ex.: Poloneză, Română...',
    },

    // Q3 : Dimensiune (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Dimensiunea organizației',
      options: {
        '1-9': '1-9 angajați',
        '10-49': '10-49 angajați',
        '50-249': '50-249 angajați',
        '250+': '250+ angajați',
      },
    },

    // Q3 : Experiență (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Ani de experiență în muncă temporară',
      options: {
        '<1': 'Mai puțin de 1 an',
        '1-3': '1-3 ani',
        '3-5': '3-5 ani',
        '5-10': '5-10 ani',
        '10+': 'Peste 10 ani',
      },
    },

    // Q4 : Sectoare
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Sectoare principale de activitate',
      description: 'Selectați toate sectoarele relevante',
    },

    // Q4 : Meserii (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Meseriile dvs.',
      description: 'Selectați toate meseriile',
    },

    // Q5 : Țară (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Țara agenției',
      placeholder: 'Ex.: Polonia',
    },

    // Q5 : Localizare (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Țara în care operează compania',
      placeholder: 'Ex.: Franța',
    },

    // Q5 : Țări de lucru (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Țările unde ați lucrat ca muncitor temporar',
      placeholder: 'Ex.: Franța, Germania, Belgia...',
    },

    // Q6 : Volum (AGENCY)
    q6_volume: {
      label: 'Volumul anual de lucrători detașați',
      options: {
        '0': 'Niciunul încă',
        '1-50': '1-50 lucrători',
        '51-200': '51-200 lucrători',
        '201-500': '201-500 lucrători',
        '500+': 'Peste 500',
      },
    },

    // Q6 : Volum client (CLIENT)
    q6_volume_client: {
      label: 'Câți muncitori temporari angajați anual?',
      options: {
        '0': 'Niciunul în prezent',
        '1-10': '1-10 persoane',
        '11-50': '11-50 persoane',
        '51-200': '51-200 persoane',
        '200+': '200+ persoane',
      },
    },

    // Q6 : Frecvență (WORKER)
    q6_frequence: {
      label: 'Cât de des lucrați ca muncitor temporar?',
      options: {
        permanent: 'Regulat (tot anul)',
        saisonnier: 'Sezonier (anumite luni)',
        occasionnel: 'Ocazional',
        jamais: 'Încă niciodată (în căutare)',
      },
    },

    // Secțiunea 2 - Detașare / Experiență

    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'De unde provin lucrătorii detașați?',
      placeholder: 'Ex.: Polonia, România, Bulgaria...',
    },

    // Q8 : Destinații (AGENCY)
    q8_destinations: {
      label: 'Țări de destinație',
      description: 'Țările unde detașați lucrători',
      placeholder: 'Ex.: Franța, Germania, Belgia, Olanda...',
    },

    // Q8 : Naționalități (CLIENT)
    q8_nationalites: {
      label: 'Naționalitățile muncitorilor temporari pe care îi angajați',
      placeholder: 'Ex.: Poloneză, Română, Bulgară...',
    },

    // Q9 : Provocare (AGENCY)
    q9_defi: {
      label: 'Principala provocare în detașarea internațională',
      options: {
        admin: 'Complexitate administrativă (A1, SIPSI...)',
        conformite: 'Conformitate legală multi-țară',
        cout: 'Costuri și timp de gestionare',
        langues: 'Bariere lingvistice',
        autre: 'Altele',
      },
    },

    // Q9 : Provocare client (CLIENT)
    q9_defi_client: {
      label: 'Principala provocare cu muncitorii temporari europeni',
      options: {
        trouver: 'Găsirea de agenții de încredere',
        conformite: 'Conformitate legală',
        qualite: 'Calitate/competențe',
        cout: 'Costuri prea mari',
        langues: 'Comunicare / Limbi',
        autre: 'Altele',
      },
    },

    // Q9 : Provocare worker (WORKER)
    q9_defi_worker: {
      label: 'Principala provocare în misiunile dvs.',
      options: {
        trouver: 'Găsirea de misiuni',
        admin: 'Hârtii administrative',
        logement: 'Cazare / Locuință',
        langue: 'Limba locală',
        paiement: 'Plăți / Salariu',
        autre: 'Altele',
      },
    },

    // Q9 : Altceva
    q9_autre: {
      label: 'Specifică provocarea principală',
      placeholder: 'Descrieți provocarea principală...',
    },

    // Q10 : Gestionare (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Cum gestionați declarațiile de detașare astăzi?',
      options: {
        interne: 'Echipă internă',
        externe: 'Furnizor extern',
        mixte: 'Abordare mixtă',
        manuel: 'Gestionare manuală',
        logiciel: 'Software specializat',
      },
    },

    // Q10 : Agenții (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Câte agenții de muncă temporară folosiți?',
      options: {
        '0': 'Niciuna',
        '1': '1 agenție',
        '2-3': '2-3 agenții',
        '4-10': '4-10 agenții',
        '10+': 'Peste 10',
      },
    },

    // Q10 : Proces (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Cum recrutați muncitori temporari?',
      options: {
        agence_fr: 'Agenții franceze de muncă temporară',
        agence_euro: 'Agenții europene de muncă temporară',
        direct: 'Recrutare directă',
        mixte: 'Mixt',
      },
    },

    // Q10 : Agenție (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Cum găsiți muncă temporară?',
      options: {
        agence: 'Prin agenții de muncă temporară',
        bouche: 'Din gură în gură',
        internet: 'Platforme online',
        direct: 'Aplicare directă',
      },
    },

    // Q10ter : Agenții utilizate (WORKER)
    q10_agences_worker: {
      label: 'Cu câte agenții lucrați?',
      options: {
        '1': 'Doar 1 agenție',
        '2-3': '2-3 agenții',
        '4-10': '4-10 agenții',
        '10+': 'Peste 10',
      },
    },

    // Q11 : Incidente (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Ați avut penalități sau incidente legate de conformitatea detașării?',
      description: 'Răspunsul rămâne anonim',
      options: {
        jamais: 'Nu, niciodată',
        rarement: 'Rar (1-2 ori)',
        parfois: 'Uneori (3-5 ori)',
        souvent: 'Des (6+ ori)',
      },
    },

    // Q11 : Conformitate (CLIENT)
    q11_conformite: {
      label: 'Verificați conformitatea legală a agențiilor de muncă temporară?',
      options: {
        oui_systematique: 'Da, sistematic',
        oui_parfois: 'Da, uneori',
        non: 'Nu',
        ne_sait_pas: 'Nu știu',
      },
    },

    // Q11 : Probleme (WORKER)
    q11_problemes: {
      label: 'Ați întâmpinat probleme cu munca temporară în străinătate?',
      options: {
        oui_graves: 'Da, probleme grave',
        oui_mineurs: 'Da, probleme minore',
        non: 'Nu',
      },
    },

    // Q12 : Buget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Buget anual pentru administrarea detașărilor',
      options: {
        '0-5k': '€0-5.000 / an',
        '5-15k': '€5.000-15.000 / an',
        '15-30k': '€15.000-30.000 / an',
        '30k+': '€30.000+ / an',
        inconnu: 'Nu știu',
      },
    },

    // Q12 : Buget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Buget anual dedicat muncii temporare',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'Nu știu',
      },
    },

    // Q12 : Satisfacție (CLIENT)
    q12_satisfaction: {
      label: 'Satisfacția față de agențiile actuale',
      options: {
        tres_satisfait: 'Foarte mulțumit',
        satisfait: 'Mulțumit',
        neutre: 'Neutru',
        insatisfait: 'Nemulțumit',
      },
    },

    // Q12 : Salariu (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Sunteți mulțumit de salariul din munca temporară?',
      options: {
        '<1500': 'Sub €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },

    // Q13 : Pierdere venituri (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Ce procent din venituri se pierde din cauza complexității administrative?',
      options: {
        'non': 'Nu, nu prea',
        'faible': 'Da, scăzut (< 5% venit)',
        'moyen': 'Da, mediu (5-15% venit)',
        'important': 'Da, semnificativ (> 15% venit)',
      },
    },

    // Q13 : Satisfacție (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Satisfacția față de agențiile actuale',
      options: {
        'tres_satisfait': 'Foarte mulțumit',
        'satisfait': 'Mulțumit',
        'neutre': 'Neutru',
        'insatisfait': 'Nemulțumit',
        'tres_insatisfait': 'Foarte nemulțumit',
      },
    },

    // Q13 : Satisfacție worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Satisfacția față de agențiile actuale',
      options: {
        'tres_satisfait': 'Foarte mulțumit',
        'satisfait': 'Mulțumit',
        'neutre': 'Neutru',
        'insatisfait': 'Nemulțumit',
        'tres_insatisfait': 'Foarte nemulțumit',
      },
    },

    // Secțiunea 3 - Nevoi

    // Q14 : Riscuri (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Preocupările principale',
      description: 'Selectați toate opțiunile aplicabile',
      options: {
        amendes: 'Amenzi și sancțiuni',
        reputation: 'Reputație / Imagine',
        penal: 'Răspundere penală',
        delais: 'Întârzieri în misiuni',
        clients: 'Pierderea clienților',
        aucun: 'Niciun risc major',
      },
    },

    // Q14 : Nevoi (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Nevoile principale',
      description: 'Selectați toate opțiunile aplicabile',
      options: {
        fiabilite: 'Găsirea de agenții fiabile',
        conformite: 'Conformitate legală',
        qualite: 'Calitate/competențe',
        cout: 'Costuri',
        disponibilite: 'Disponibilitate candidați',
        aucun: 'Nicio nevoie majoră',
      },
    },

    // Q14 : Așteptări (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Așteptările pentru munca temporară în străinătate',
      description: 'Selectați toate opțiunile aplicabile',
      options: {
        salaire: 'Salariu mai bun',
        conditions: 'Condiții de lucru mai bune',
        stabilite: 'Stabilitate',
        experience: 'Experiență internațională',
        logement: 'Ajutor la cazare',
        aucun: 'Nicio așteptare specifică',
      },
    },

    // Q14_risques_client
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Preocupările principale',
      description: 'Selectați toate opțiunile aplicabile',
      options: {
        conformite: 'Conformitate legală',
        qualite: 'Calitate/competențe',
        communication: 'Comunicare/Limbi',
        cout: 'Costuri neașteptate',
        disponibilite: 'Disponibilitatea candidaților',
        aucun: 'Nicio preocupare majoră',
      },
    },

    // Q14_risques_worker
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Ce probleme întâmpinați cel mai des?',
      description: 'Selectați toate opțiunile aplicabile',
      options: {
        paiement: 'Întârzieri la plată',
        conditions: 'Condiții proaste',
        contrat: 'Contracte nerespectate',
        logement: 'Cazare neadecvată',
        communication: 'Probleme de comunicare',
        aucun: 'Nicio problemă majoră',
      },
    },

    // Q15 : Problemă
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Ce problemă ați dori să rezolvați prima?',
      placeholder: 'Descrieți problema prioritară...',
    },

    // Q15 : Nevoi client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Care sunt nevoile prioritare?',
      placeholder: 'Ex.: Găsire rapidă, calitate mai bună, prețuri...',
    },

    // Q15 : Îmbunătățiri (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Ce ați dori să îmbunătățiți în misiuni?',
      placeholder: 'Ex.: Salariu, cazare, suport, stabilitate...',
    },

    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Folosiți ERP/soluție de management?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Altul',
        aucun: 'Fără ERP',
      },
    },

    // Q16 : Nume ERP
    q16_nom_erp: {
      label: 'Ce software/ERP?',
      placeholder: 'Ex.: SAP, Odoo, personalizat...',
    },

    // Q16 : Criterii (CLIENT)
    q16_criteres: {
      label: 'Criterii principale de selecție pentru agenții',
      description: 'Selectați top 3',
    },

    // Q16 : Îmbunătățire (WORKER)
    q16_amelioration: {
      label: 'Ce ar îmbunătăți experiența de muncă temporară?',
      description: 'Selectați toate opțiunile aplicabile',
    },

    // Q17 : Migrare (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Sunteți pregătiți să schimbați instrumentele de lucru?',
      options: {
        oui: 'Da, fără problemă',
        conditions: 'Da, cu anumite condiții',
        difficile: 'Dificil, dar deschis',
        non: 'Nu, de neconceput',
      },
    },

    // Q17 : Buget (CLIENT)
    q17_budget: {
      label: 'Buget lunar pentru o platformă de recrutare',
      options: {
        '0': 'Nu sunt dispus să plătesc',
        '1-100': '€1 - €100/lună',
        '100-500': '€100 - €500/lună',
        '500-1000': '€500 - €1.000/lună',
        '1000+': 'Peste €1.000/lună',
      },
    },

    // Q17 : Platformă (WORKER)
    q17_plateforme: {
      label: 'Ați folosi o platformă pentru a găsi muncă temporară în străinătate?',
      options: {
        oui_certainement: 'Da, cu siguranță',
        oui_probablement: 'Da, probabil',
        peut_etre: 'Poate',
        non: 'Nu',
      },
    },

    // Secțiunea 4 - Interes YoJob

    // Q18 : Scor
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Cât de interesat sunteți de un marketplace european?',
      description: 'Notați de la 1 (neinteresat) la 10 (foarte interesat)',
    },

    // Q19 : Funcționalități (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Funcționalități cele mai interesante',
      description: 'Selectați top 3 priorități',
      options: {
        sipsi: 'Declarație SIPSI automată',
        a1: 'Gestionare certificat A1',
        conformite: 'Panou de conformitate',
        alertes: 'Alerte și reînnoiri',
        documents: 'Centralizare documente',
        marketplace: 'Marketplace de agenții',
        support: 'Suport expert multilingv',
        api: 'Integrare API (ERP)',
      },
    },

    // Q19 : Funcționalități (CLIENT)
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Funcționalități cele mai interesante',
      description: 'Selectați toate cele care vă interesează',
      options: {
        recherche: 'Căutare de agenții fiabile',
        comparaison: 'Comparare preț/calitate',
        avis: 'Recenzii verificate',
        conformite: 'Garanție de conformitate',
        support: 'Suport dedicat',
        facturation: 'Facturare centralizată',
        suivi: 'Urmărire în timp real',
      },
    },

    // Q19 : Funcționalități (WORKER)
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Funcționalități cele mai interesante',
      description: 'Selectați toate cele care vă interesează',
      options: {
        recherche: 'Căutare joburi',
        avis: 'Recenzii despre agenții',
        logement: 'Ajutor pentru cazare',
        paiement: 'Plată sigură',
        support: 'Suport în limba mea',
        documents: 'Ajutor cu documentele administrative',
        formation: 'Programe de formare',
      },
    },

    // Q20 : Preț
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Model de preț preferat',
      options: {
        mensuel: 'Abonament lunar fix',
        usage: 'Plată pe utilizare',
        annuel: 'Abonament anual (reducere)',
        gratuit: 'Gratuit pentru lucrători',
      },
    },

    // Q21 : Buget lunar
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Buget lunar pentru o soluție SaaS completă',
      options: {
        '0-100': '€0 - €100/lună',
        '100-300': '€100 - €300/lună',
        '300-500': '€300 - €500/lună',
        '500-1000': '€500 - €1.000/lună',
        '1000+': 'Peste €1.000/lună',
      },
    },

    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Doriți să testați o versiune timpurie (MVP)?',
      options: {
        oui_gratuit: 'Da, gratuit',
        oui_reduc: 'Da, cu reducere',
        peut_etre: 'Poate, depinde de funcții',
        non: 'Nu, nu sunt interesat',
      },
    },

    // Secțiunea 5 - Viziune de viitor

    // Q23 : Rol
    q23_role: {
      label: 'Cum vă vedeți rolul pe marketplace-ul european?',
      options: {
        decideur: 'Factor de decizie final',
        influenceur: 'Influencer / Recomandare',
        utilisateur: 'Utilizator final',
        autre: 'Altul',
      },
    },

    // Q24 : Evoluție
    q24_evolution: {
      label: 'Planurile de expansiune internațională',
      options: {
        oui_rapide: 'Da, în 6 luni',
        oui_lent: 'Da, în 1-2 ani',
        maintien: 'Mențin țările actuale',
        reduction: 'Reduc anvergura internațională',
      },
    },

    // Q24bis : Aspirații (WORKER)
    q24_aspirations: {
      label: 'Aspirațiile profesionale viitoare',
      placeholder: 'Ex.: contract pe perioadă nedeterminată, revenire în țară, formare...',
    },

    // Q25 : Nevoi
    q25_besoins: {
      label: 'Alte nevoi sau comentarii',
      placeholder: 'Împărtășiți orice feedback sau nevoi suplimentare...',
    },

    // Secțiunea 6 - Contact

    // Q26 : Telefon profesional
    q26_phone: {
      label: 'Număr de telefon profesional',
      placeholder: '+40 712 345 678',
    },

    // Q27 : Prenume
    q27_firstname: {
      label: 'Prenume',
      placeholder: 'Prenumele dvs.',
    },

    // Q28 : Nume
    q28_lastname: {
      label: 'Nume',
      placeholder: 'Numele dvs.',
    },

    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'CUI (opțional)',
      placeholder: 'RO12345678',
      description: 'Pentru îmbogățire prin registrul comerțului',
    },

    // Q30 : Email
    email: {
      label: 'Adresa de email',
      placeholder: 'email.dvs@exemplu.ro',
    },

    // Q31 : Autorizare contact
    autorise_contact: {
      label: 'Sunt de acord să fiu contactat din nou',
    },

    // Q32 : Raport de studiu
    souhaite_rapport: {
      label: 'Doresc să primesc raportul studiului',
    },
  },

  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Romanian (RO) Translation',
    _locale: 'ro-RO',
    _completeness: 100,
  },
};