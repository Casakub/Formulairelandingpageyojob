/**
 * 🇷🇴 TRADUCERI ROMÂNEȘTI (RO)
 * 
 * Bazat pe sistemul de traducere englezesc
 * Bază: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const ro: TranslationBundle = {
  // Moștenește de la FR pentru chei lipsă
  ...fr,
  
  // Navigation
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
  
  // Sections
  section: {
    1: {
      title: 'Profilul agenției',
      description: '4 întrebări • 2 min',
    },
    2: {
      title: 'Detașare',
      description: '7 întrebări • 3 min',
    },
    3: {
      title: 'Nevoi',
      description: '6 întrebări • 2 min',
    },
    4: {
      title: 'Interes pentru YoJob',
      description: '6 întrebări • 3 min',
    },
    5: {
      title: 'Viziune de viitor',
      description: '2 întrebări • 1 min',
    },
    6: {
      title: 'Contact',
      description: '1 întrebare • 1 min',
    },
  },
  
  // Sections adaptate pe profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Profilul agenției dvs.',
        description: 'Spuneți-ne despre agenția dvs. de muncă temporară și expertiza dvs.',
      },
      client: {
        title: '📋 Profilul companiei dvs.',
        description: 'Spuneți-ne despre compania dvs. și nevoile de personal',
      },
      worker: {
        title: '📋 Profilul dvs.',
        description: 'Spuneți-ne despre parcursul dvs. profesional',
      },
    },
    2: {
      agency: {
        title: '💼 Experiența de detașare',
        description: 'Activitatea dvs. în detașarea lucrătorilor',
      },
      client: {
        title: '💼 Experiența dvs. de recrutare',
        description: 'Practicile dvs. actuale de recrutare și muncă temporară',
      },
      worker: {
        title: '💼 Experiența dvs. în muncă temporară',
        description: 'Parcursul dvs. în muncă temporară',
      },
    },
    3: {
      agency: {
        title: '🎯 Necesități și instrumente',
        description: 'Provocările și soluțiile dvs. actuale',
      },
      client: {
        title: '🎯 Necesitățile dvs. actuale',
        description: 'Provocări și așteptări în recrutare',
      },
      worker: {
        title: '🎯 Așteptările dvs.',
        description: 'Ce este important pentru dvs. într-o misiune',
      },
    },
    4: {
      agency: {
        title: '⭐ Interes pentru o platformă europeană',
        description: 'Descoperiți viziunea noastră asupra unui marketplace inovator',
      },
      client: {
        title: '⭐ Interes pentru o platformă europeană',
        description: 'O soluție inovatoare pentru nevoile dvs.',
      },
      worker: {
        title: '⭐ Interesul dvs. pentru o platformă',
        description: 'O platformă pentru a găsi misiuni ușor',
      },
    },
    5: {
      agency: {
        title: '🔮 Viziune de viitor',
        description: 'Buget și perspective de dezvoltare',
      },
      client: {
        title: '🔮 Prioritățile dvs. viitoare',
        description: 'Buget și strategie de recrutare',
      },
      worker: {
        title: '🔮 Obiectivele dvs.',
        description: 'Proiectele dvs. profesionale viitoare',
      },
    },
    6: {
      agency: {
        title: '📧 Rămâneți în legătură',
        description: 'Primiți rezultatele studiului și rămâneți informat',
      },
      client: {
        title: '📧 Rămâneți în legătură',
        description: 'Primiți rezultatele și recomandările noastre',
      },
      worker: {
        title: '📧 Rămâneți în legătură',
        description: 'Primiți rezultatele și oportunitățile',
      },
    },
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
    description: 'Acest sondaj durează aproximativ 10-15 minute. Răspunsurile dvs. ne vor ajuta să dezvoltăm o soluție adaptată industriei dvs.',
    cta_start: 'Începeți sondajul',
    cta_dashboard: 'Accesați panoul de control',
    badge: 'Studiu de piață european',
    stat: {
      countries: '27 de țări europene',
      questions: 'întrebări',
      benchmark: 'Primiți benchmark-ul 2025',
      insights: 'Informații exclusive de piață',
      opportunities: 'Acces prioritar la oferte',
    },
    footer: {
      info: 'întrebări • Anonim • Conform GDPR',
      anonymous: 'Anonim',
      gdpr: 'Conform GDPR',
    },
    cta: {
      start: 'Începeți sondajul',
      dashboard: 'Accesați panoul de control',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Cine sunteți?',
    subtitle: 'Alegeți profilul pentru a personaliza întrebările',
    agency: 'Agenție de muncă temporară',
    agency_description: 'Sunteți o agenție de muncă temporară sau de recrutare',
    client: 'Companie client',
    client_description: 'Sunteți o companie care folosește muncitori temporari',
    worker: 'Lucrător temporar',
    worker_description: 'Sunteți un lucrător temporar sau detașat',
  },
  
  // Respondent Selector
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
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Agenție de muncă temporară',
      description: 'Sunteți o agenție de muncă temporară europeană. Împărtășiți experiența de detașare.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Companie client',
      description: 'Angajați muncitori temporari. Împărtășiți nevoile și așteptările dvs.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Lucrător temporar',
      description: 'Lucrați în muncă temporară. Împărtășiți experiența dvs. pe teren.',
      estimatedTime: '10 min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Înapoi',
    next: 'Următorul',
    submit: 'Trimiteți răspunsurile',
    submitting: 'Se trimite...',
    back: 'Înapoi',
    start: 'Start',
  },
  
  // Confirmation
  confirmation: {
    title: 'Vă mulțumim pentru participare!',
    subtitle: 'Răspunsurile dvs. au fost salvate cu succes',
    message: 'Analizăm toate răspunsurile pentru a dezvolta o soluție perfect adaptată nevoilor dvs.',
    cta_back: 'Înapoi la pagina de start',
    cta_dashboard: 'Vedeți panoul de control',
  },
  
  // Progress
  progress: {
    section: 'Secțiune',
    question: 'Întrebare',
    section_completed: 'Secțiune completată',
    questions_remaining: '{count} întrebări rămase',
    time_remaining: 'Aproximativ {time} rămas',
  },
  
  // Common translations
  common: {
    oui: 'Da',
    non: 'Nu',
    autre: 'Altul',
    loading: 'Se încarcă...',
    submit: 'Trimite',
    next: 'Următorul',
    previous: 'Anteriorul',
    skip: 'Sari',
    save: 'Salvează',
    cancel: 'Anulează',
    close: 'Închide',
    required: 'Obligatoriu',
    optional: 'Opțional',
    error: 'Eroare',
    success: 'Succes',
    completed: 'Completat',
    inProgress: 'În curs',
    notStarted: 'Neînceput',
    profileAgency: 'Agenție de muncă temporară',
    profileClient: 'Client',
    profileWorker: 'Lucrător temporar',
    score_not_interested: 'Neinteresant',
    score_very_interested: 'Foarte interesant',
  },
  
  // Sectors
  sectors: {
    btp: 'Construcții',
    industrie: 'Industrie',
    logistique: 'Logistică',
    hotellerie: 'Hotelărie-Restaurante',
    sante: 'Sănătate',
    agriculture: 'Agricultură',
    tech: 'Tech/IT',
    autres: 'Altele',
  },
  
  // Questions - moștenește de la FR apoi suprascrie cu traduceri RO
  questions: {
    ...fr.questions,
    
    // Q1 : Nume
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nume',
      placeholder: 'Numele organizației sau numele dvs. complet',
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
      label: 'Anul înființării companiei dvs.',
      placeholder: '2010',
    },
    
    // Q2 : Naționalitate (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Naționalitatea dvs.',
      placeholder: 'Ex: Polonă, Română...',
    },
    
    // Q3 : Dimensiune (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Dimensiunea companiei',
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
      label: 'Sectoarele principale',
      description: 'Selectați toate sectoarele relevante',
    },
    
    // Q4 : Meserii (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Meseriile dvs.',
      description: 'Selectați toate meseriile dvs.',
    },
    
    // Q5 : Țară (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Țara agenției dvs.',
      placeholder: 'Ex: Polonia',
    },
    
    // Q5 : Localizare (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Țara în care operează compania dvs.',
      placeholder: 'Ex: Franța',
    },
    
    // Q5 : Țară muncă (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Țările în care ați lucrat ca muncitor temporar',
      placeholder: 'Ex: Franța, Germania, Belgia...',
    },
    
    // Q6 : Volum (AGENCY)
    q6_volume: {
      label: 'Volum anual de lucrători detașați',
      options: {
        '0': 'Încă nu',
        '1-50': '1-50 lucrători',
        '51-200': '51-200 lucrători',
        '201-500': '201-500 lucrători',
        '500+': 'Peste 500',
      },
    },
    
    // Q6 : Volum client (CLIENT)
    q6_volume_client: {
      label: 'Câți muncitori temporari angajați pe an?',
      options: {
        '0': 'Niciun lucrător în prezent',
        '1-10': '1-10 persoane',
        '11-50': '11-50 persoane',
        '51-200': '51-200 persoane',
        '200+': '200+ persoane',
      },
    },
    
    // Q6 : Frecvență (WORKER)
    q6_frequence: {
      label: 'Cât de des lucrați în muncă temporară?',
      options: {
        permanent: 'Regulat (tot anul)',
        saisonnier: 'Sezonier (anumite luni)',
        occasionnel: 'Ocazional',
        jamais: 'Niciodată încă (caut)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'De unde vin lucrătorii dvs. detașați?',
      placeholder: 'Ex: Polonia, România, Bulgaria...',
    },
    
    // Q8 : Destinații (AGENCY)
    q8_destinations: {
      label: 'Țările de destinație',
      description: 'Țări în care detașați lucrători',
      placeholder: 'Ex: Franța, Germania, Belgia, Olanda...',
    },
    
    // Q8 : Naționalități (CLIENT)
    q8_nationalites: {
      label: 'Naționalitățile muncitorilor temporari pe care îi angajați',
      placeholder: 'Ex: Poloneză, Română, Bulgară...',
    },
    
    // Q9 : Provocare (AGENCY)
    q9_defi: {
      label: 'Provocarea dvs. principală în detașarea internațională',
      options: {
        admin: 'Complexitate administrativă (A1, SIPSI...)',
        conformite: 'Conformitate legală în mai multe țări',
        cout: 'Costuri și timp administrativ',
        langues: 'Bariere lingvistice',
        autre: 'Altele',
      },
    },
    
    // Q9 : Provocare client (CLIENT)
    q9_defi_client: {
      label: 'Provocarea dvs. principală cu muncitorii temporari europeni',
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
      label: 'Provocarea dvs. principală în munca temporară în străinătate',
      options: {
        admin: 'Hârtii administrative',
        langue: 'Barieră lingvistică',
        logement: 'Găsirea de cazare',
        transport: 'Transport',
        salaire: 'Probleme de plată/salariu',
        autre: 'Altele',
      },
    },
    
    // Q9 : Altele
    q9_autre: {
      label: 'Vă rugăm specificați provocarea dvs. principală',
      placeholder: 'Descrieți provocarea dvs. principală...',
    },
    
    // Q10 : Gestionare (AGENCY)
    q10_gestion: {
      label: 'Cum gestionați astăzi declarațiile de detașare?',
      options: {
        interne: 'Echipă internă',
        externe: 'Furnizor extern',
        mixte: 'Abordare mixtă',
        manuel: 'Gestionare manuală',
        logiciel: 'Software specializat',
        manuel: 'Manual (Excel, Word...)',
        logiciel_interne: 'Software intern',
        prestataire: 'Furnizor extern',
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
      label: 'Cum găsiți muncă temporară?',
      options: {
        agence: 'Prin agenții de muncă temporară',
        bouche: 'Din gură în gură',
        internet: 'Platforme de joburi online',
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
        '10+': 'Mai mult de 10',
      },
    },
    
    // Q11 : Incidente (AGENCY)
    q11_incidents: {
      label: 'Ați avut penalități sau incidente legate de conformitatea detașării?',
      description: 'Răspunsul dvs. va rămâne anonim',
      options: {
        jamais: 'Nu, niciodată',
        rarement: 'Rar (1-2 ori)',
        parfois: 'Uneori (3-5 ori)',
        souvent: 'Des (6+ ori)',
        oui_souvent: 'Da, des',
        oui_rare: 'Da, ocazional',
        non: 'Nu',
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
      label: 'Ați avut probleme cu munca temporară în străinătate?',
      options: {
        oui_graves: 'Da, probleme grave',
        oui_mineurs: 'Da, probleme minore',
        non: 'Nu',
      },
    },
    
    // Q12 : Buget (AGENCY)
    q12_budget: {
      label: 'Buget anual pentru gestionarea detașărilor',
      options: {
        '0-5k': '0-5.000 € / an',
        '5-15k': '5.000-15.000 € / an',
        '15-30k': '15.000-30.000 € / an',
        '30k+': '30.000+ € / an',
        inconnu: 'Nu știu',
        '0': 'Niciun buget alocat',
        '1-5k': '1.000 € - 5.000 €',
        '5-20k': '5.000 € - 20.000 €',
        '20-50k': '20.000 € - 50.000 €',
        '50k+': 'Peste 50.000 €',
      },
    },
    
    // Q12 : Buget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Buget anual pentru muncă temporară',
      options: {
        '0-50k': '0 € - 50.000 €',
        '50-200k': '50.000 € - 200.000 €',
        '200-500k': '200.000 € - 500.000 €',
        '500k+': '500.000 €+',
        'inconnu': 'Nu știu',
      },
    },
    
    // Q12 : Satisfacție (CLIENT)
    q12_satisfaction: {
      label: 'Satisfacția cu agențiile actuale de muncă temporară',
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
        '<1500': 'Sub 1.500 €',
        '1500-2500': '1.500 € - 2.500 €',
        '2500-3500': '2.500 € - 3.500 €',
        '3500+': '3.500 €+',
      },
    },
    
    // Q13 : Pierdere venituri (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Ce procent din venituri pierdeți din cauza complexității administrative?',
      options: {
        'non': 'Nu, nu prea',
        'faible': 'Da, scăzut (< 5% CA)',
        'moyen': 'Da, mediu (5-15% CA)',
        'important': 'Da, semnificativ (> 15% CA)',
      },
    },
    
    // Q13 : Satisfacție (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Satisfacția cu agențiile actuale de muncă temporară',
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
      label: 'Satisfacția cu agențiile actuale de muncă temporară',
      options: {
        'tres_satisfait': 'Foarte mulțumit',
        'satisfait': 'Mulțumit',
        'neutre': 'Neutru',
        'insatisfait': 'Nemulțumit',
        'tres_insatisfait': 'Foarte nemulțumit',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Riscuri (AGENCY)
    q14_risques: {
      label: 'Preocupările dvs. principale',
      description: 'Selectați toate cele relevante',
      options: {
        amendes: 'Amenzi și sancțiuni',
        reputation: 'Reputație / Imagine',
        penal: 'Responsabilitate penală',
        delais: 'Întârzieri misiuni',
        clients: 'Pierderea clienților',
        aucun: 'Niciun risc major',
        sanctions: 'Amenzi/sancțiuni',
        conformite: 'Conformitate în mai multe țări',
        cout: 'Costuri administrative',
        documentation: 'Gestionarea documentelor',
        responsabilite: 'Responsabilitate penală',
        perte_clients: 'Pierderea clienților',
      },
    },
    
    // Q14 : Necesități (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Necesitățile dvs. principale',
      description: 'Selectați toate cele relevante',
      options: {
        fiabilite: 'Găsirea de agenții fiabile',
        conformite: 'Conformitate legală',
        qualite: 'Calitate/competențe',
        cout: 'Costuri',
        disponibilite: 'Disponibilitatea candidaților',
        aucun: 'Nicio nevoie majoră',
      },
    },
    
    // Q14 : Așteptări (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Așteptările dvs. de la munca temporară în străinătate',
      description: 'Selectați toate cele relevante',
      options: {
        salaire: 'Salariu mai bun',
        conditions: 'Condiții mai bune de muncă',
        stabilite: 'Stabilitate',
        experience: 'Experiență internațională',
        logement: 'Ajutor pentru cazare',
        aucun: 'Nicio așteptare specială',
      },
    },
    
    // Q14_risques_client opțiuni
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Preocupările dvs. principale',
      description: 'Selectați toate cele relevante',
      options: {
        conformite: 'Conformitate legală',
        qualite: 'Calitate/competențe',
        communication: 'Comunicare/limbi',
        cout: 'Costuri neașteptate',
        disponibilite: 'Disponibilitatea candidaților',
        aucun: 'Nicio preocupare majoră',
      },
    },
    
    // Q14_risques_worker opțiuni
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Ce probleme întâlniți cel mai des?',
      description: 'Selectați toate cele relevante',
      options: {
        paiement: 'Întârzieri la plată',
        conditions: 'Condiții proaste',
        contrat: 'Contracte nerespectate',
        logement: 'Cazare insuficientă',
        communication: 'Probleme de comunicare',
        aucun: 'Nicio problemă majoră',
      },
    },
    
    // Q15 : Problemă
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Ce problemă doriți să rezolvați mai întâi?',
      placeholder: 'Descrieți problema dvs. prioritară...',
    },
    
    // Q15 : Necesități client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Care sunt necesitățile dvs. prioritare?',
      placeholder: 'Ex: Găsire rapidă, calitate mai bună, prețuri...',
    },
    
    // Q15 : Îmbunătățiri (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Ce doriți să îmbunătățiți în misiunile dvs.?',
      placeholder: 'Ex: Salariu, cazare, suport, stabilitate...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      label: 'Folosiți ERP/software de gestionare?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Altul',
        aucun: 'Fără ERP',
        oui: 'Da',
        non: 'Nu',
      },
    },
    
    // Q16 : Nume ERP
    q16_nom_erp: {
      label: 'Ce software/ERP?',
      placeholder: 'Ex: SAP, Odoo, personalizat...',
    },
    
    // Q16 : Criterii (CLIENT)
    q16_criteres: {
      label: 'Criteriile dvs. principale de selecție a agențiilor de muncă temporară',
      description: 'Alegeți top 3',
    },
    
    // Q16 : Îmbunătățire (WORKER)
    q16_amelioration: {
      label: 'Ce ar îmbunătăți experiența dvs. de muncă temporară?',
      description: 'Selectați toate cele relevante',
    },
    
    // Q17 : Migrare (AGENCY)
    q17_migration: {
      label: 'Sunteți dispus să vă schimbați instrumentele de lucru?',
      options: {
        oui: 'Da, fără problemă',
        conditions: 'Da, sub condiții',
        difficile: 'Dificil, dar deschis',
        non: 'Nu, nu este posibil',
        oui_rapidement: 'Da, imediat',
        oui_progressivement: 'Da, treptat',
        non_satisfait: 'Nu, mulțumit de instrumentele actuale',
        non_peur: 'Nu, frică de schimbare',
      },
    },
    
    // Q17 : Buget (CLIENT)
    q17_budget: {
      label: 'Buget lunar pentru o platformă de recrutare de muncă temporară',
      options: {
        '0': 'Nu sunt dispus să plătesc',
        '1-100': '1 € - 100 €/lună',
        '100-500': '100 € - 500 €/lună',
        '500-1000': '500 € - 1.000 €/lună',
        '1000+': 'Peste 1.000 €/lună',
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
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Scor
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Cât de interesat sunteți de un marketplace european de detașare?',
      description: 'Notați de la 1 (deloc interesat) la 10 (foarte interesat)',
    },
    
    // Q19 : Funcții (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Funcțiile cele mai interesante',
      description: 'Alegeți top 3 priorități',
      options: {
        sipsi: 'Declarație SIPSI automată',
        a1: 'Gestionarea certificatelor A1',
        conformite: 'Panou de conformitate',
        alertes: 'Alerte & reînnoiri',
        documents: 'Centralizarea documentelor',
        marketplace: 'Marketplace de agenții',
        support: 'Suport expert multilingv',
        api: 'Integrare API (ERP)',
      },
    },
    
    // Q19 : Funcții CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Funcțiile cele mai interesante',
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
    
    // Q19 : Funcții WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Funcțiile cele mai interesante',
      description: 'Selectați toate cele care vă interesează',
      options: {
        recherche: 'Căutare de joburi',
        avis: 'Recenzii despre agenții',
        logement: 'Ajutor pentru cazare',
        paiement: 'Plată sigură',
        support: 'Suport în limba mea',
        documents: 'Ajutor pentru documente administrative',
        formation: 'Programe de formare',
      },
    },
    
    // Q20 : Preț
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Model de preț preferat',
      options: {
        mensuel: 'Abonament lunar fix',
        usage: 'Pay-as-you-go (bazat pe utilizare)',
        annuel: 'Plan anual (reducere)',
        gratuit: 'Gratuit pentru lucrători',
      },
    },
    
    // Q21 : Buget lunar
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Buget lunar pentru o soluție SaaS completă',
      options: {
        '0-100': '0 € - 100 €/lună',
        '100-300': '100 € - 300 €/lună',
        '300-500': '300 € - 500 €/lună',
        '500-1000': '500 € - 1.000 €/lună',
        '1000+': 'Peste 1.000 €/lună',
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
    
    // Section 5 - Vision Future
    
    // Q23 : Rol
    q23_role: {
      label: 'Cum vă vedeți rolul pe marketplace-ul european?',
      options: {
        decideur: 'Factorul final de decizie',
        influenceur: 'Influencer / recomandare',
        utilisateur: 'Utilizator final',
        autre: 'Altele',
      },
    },
    
    // Q24 : Evoluție
    q24_evolution: {
      label: 'Planurile dvs. de expansiune internațională',
      options: {
        oui_rapide: 'Da, în 6 luni',
        oui_lent: 'Da, în 1-2 ani',
        maintien: 'Mențineți țările actuale',
        reduction: 'Reduceți amploarea internațională',
      },
    },
    
    // Q25 : Necesități
    q25_besoins: {
      label: 'Necesități sau comentarii suplimentare',
      placeholder: 'Împărtășiți mai multe feedback sau necesități...',
    },
    
    // Section 6 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'E-mail (opțional)',
      placeholder: 'dvs@email.ro',
      description: 'Pentru a primi rezultatele și a rămâne la curent cu proiectul',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'E-mail profesional (opțional)',
      placeholder: 'contact@agentia-dvs.ro',
      description: 'Pentru a primi rezultate și acces exclusiv la platformă',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'E-mail profesional (opțional)',
      placeholder: 'contact@compania-dvs.ro',
      description: 'Pentru a primi recomandări adaptate nevoilor dvs.',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'E-mail (opțional)',
      placeholder: 'dvs@email.ro',
      description: 'Pentru a primi oportunități de misiuni care se potrivesc profilului dvs.',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Telefon (opțional)',
      placeholder: '+40 712 345 678',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Comentarii sau sugestii suplimentare',
      placeholder: 'Împărtășiți ideile, așteptările sau nevoile dvs. specifice...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Viziunea pieței în următorii 3 ani',
      placeholder: 'Împărtășiți viziunea dvs...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Alte necesități sau sugestii',
      placeholder: 'Sugestiile dvs. ne interesează...',
    },
    
    // SECTION 6 : CONTACT
    
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
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - opțional)
    q29_siret: {
      label: 'CUI (Cod Unic de Identificare) (opțional)',
      placeholder: 'RO12345678',
      description: 'Pentru îmbogățire prin registrul comerțului',
    },
    
    // Q30 : Email profesional (ALL)
    email: {
      label: 'E-mail',
      placeholder: 'email.dvs@exemplu.ro',
    },
    
    // Q31 : Autorizare contact (ALL)
    autorise_contact: {
      label: 'Sunt de acord să fiu contactat din nou',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Aș dori să primesc raportul studiului',
    },
    
    // Questions suplimentaire spécifice
    
    // Criterii de selecție (CLIENT)
    critere_prix: {
      label: 'Preț',
    },
    critere_qualite: {
      label: 'Calitatea profilurilor',
    },
    critere_rapidite: {
      label: 'Viteza de răspuns',
    },
    critere_conformite: {
      label: 'Conformitate legală',
    },
    critere_flexibilite: {
      label: 'Flexibilitate',
    },
    
    // Servicii valorizate (CLIENT)
    service_accompagnement: {
      label: 'Însoțire personalizată',
    },
    service_garantie: {
      label: 'Garanție de înlocuire',
    },
    service_formation: {
      label: 'Formare prealabilă',
    },
    service_gestion: {
      label: 'Gestionare administrativă',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Formare și certificări',
    },
    service_logement: {
      label: 'Asistență pentru cazare',
    },
    service_transport: {
      label: 'Asistență pentru transport',
    },
    service_administratif: {
      label: 'Asistență administrativă',
    },
  },
  
  // Dashboard (Admin)
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
  
  // Login
  login: {
    title: 'Autentificare Administrare',
    email: 'E-mail',
    password: 'Parolă',
    submit: 'Conectați-vă',
    error: 'E-mail sau parolă invalidă',
  },
  
  // Errors
  errors: {
    required: 'Acest câmp este obligatoriu',
    email: 'E-mail invalid',
    phone: 'Număr de telefon invalid',
    min_length: 'Minim {min} caractere',
    max_length: 'Maxim {max} caractere',
    network: 'Eroare de rețea. Încercați din nou.',
    unknown: 'A apărut o eroare. Încercați din nou.',
  },
};