/**
 * 🇮🇹 TRADUZIONI ITALIANE (ITALIA)
 * 
 * Traduzione completa per italiano
 * Copertura: Interfaccia, navigazione, tutte le domande del sondaggio
 * 
 * @version 2.0.0
 * @locale it-IT
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const it: TranslationBundle = {
  // Eredita da FR per le chiavi mancanti
  ...fr,
  
  // Navigazione
  nav: {
    section1: 'Profilo',
    section2: 'Esperienza',
    section3: 'Esigenze',
    section4: 'Interesse',
    section5: 'Visione',
    section6: 'Contatto',
    dashboard: 'Pannello',
    back_to_site: 'Torna al sito',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Pannello',
    tabs: {
      overview: 'Panoramica',
      results: 'Risultati',
      questions: 'Domande',
      translations: 'Traduzioni',
      export: 'Esporta',
      integrations: 'Integrazioni',
      cms: 'CMS del Modulo',
      settings: 'Impostazioni',
      prospects: 'Potenziali Clienti',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Nuovo',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Disconnetti',
      back_to_survey: 'Torna al sondaggio',
      toggle_sidebar: 'Comprimi/Espandi',
    },
    user: {
      welcome: 'Benvenuto',
      logged_in_as: 'Connesso come',
    },
  },
  
  // Sezioni
  section: {
    1: {
      title: 'Profilo Agenzia',
      description: '4 domande • 2 min',
    },
    2: {
      title: 'Distacco',
      description: '7 domande • 3 min',
    },
    3: {
      title: 'Esigenze',
      description: '6 domande • 2 min',
    },
    4: {
      title: 'Interesse YoJob',
      description: '6 domande • 3 min',
    },
    5: {
      title: 'Visione Futura',
      description: '2 domande • 1 min',
    },
    6: {
      title: 'Contatto',
      description: '1 domanda • 1 min',
    },
  },
  
  header: {
    title: 'YoJob',
    subtitle: 'Studio di mercato',
  },
  
  hero: {
    title: 'Sondaggio di mercato',
    subtitle: 'Ci aiuti a comprendere meglio le sue esigenze',
    description: 'Questo sondaggio richiede circa 10-15 minuti. Le sue risposte ci permetteranno di creare una soluzione adattata al suo settore.',
    cta_start: 'Inizia il sondaggio',
    cta_dashboard: 'Accedi al Dashboard',
    badge: 'Studio di mercato europeo',
    stat: {
      countries: '27 paesi europei',
      questions: 'domande',
      benchmark: 'Riceva il benchmark 2025',
      insights: 'Insights di mercato esclusivi',
      opportunities: 'Accesso prioritario alle offerte',
    },
    footer: {
      info: 'domande • Anonimo • Conforme GDPR',
      anonymous: 'Anonimo',
      gdpr: 'Conforme GDPR',
    },
  },
  
  respondent_type: {
    title: 'Chi è lei?',
    subtitle: 'Selezioni il suo profilo per personalizzare le domande',
    agency: 'Agenzia Interinale',
    agency_description: 'Lei è un\'agenzia di lavoro interinale',
    client: 'Azienda Cliente',
    client_description: 'Lei è un\'azienda che assume lavoratori interinali',
    worker: 'Lavoratore Interinale',
    worker_description: 'Lei è un lavoratore interinale o distaccato',
  },
  
  selector: {
    badge: '🌍 Studio di mercato europeo - Assunzione & Lavoro Interinale',
    title: 'Condivida la sua esperienza del mercato europeo',
    subtitle: 'Selezioni il suo profilo per iniziare il sondaggio',
    cta: 'Clicca per iniziare →',
    trust: {
      secure: 'Dati sicuri',
      languages: '{count} lingue disponibili',
      languages_suffix: 'lingue disponibili',
      anonymous: 'Anonimo e confidenziale',
    },
  },
  
  respondent: {
    agency: {
      label: 'Agenzia di lavoro interinale',
      description: 'Lei è un\'agenzia interinale europea. Condivida la sua esperienza di distacco.',
      estimatedTime: '15 min',
    },
    client: {
      label: 'Azienda cliente',
      description: 'Lei assume lavoratori interinali. Condivida le sue esigenze e aspettative.',
      estimatedTime: '10 min',
    },
    worker: {
      label: 'Lavoratore interinale',
      description: 'Lei lavora come interinale. Condivida la sua esperienza sul campo.',
      estimatedTime: '10 min',
    },
  },
  
  // Pulsanti
  button: {
    previous: 'Precedente',
    next: 'Successivo',
    submit: 'Invia le mie risposte',
    submitting: 'Invio in corso...',
    back: 'Indietro',
    start: 'Inizia',
  },
  
  // Conferma
  confirmation: {
    title: 'Grazie per la sua partecipazione!',
    subtitle: 'Le sue risposte sono state registrate con successo',
    message: 'Stiamo attualmente analizzando tutte le risposte per creare una soluzione perfettamente adattata alle sue esigenze.',
    cta_back: 'Torna all\'inizio',
    cta_dashboard: 'Vedi il Dashboard',
  },
  
  // Progresso
  progress: {
    section: 'Sezione',
    question: 'Domanda',
    section_completed: 'Sezione completata',
    questions_remaining: '{count} domande rimanenti',
    time_remaining: 'Circa {time} rimanente',
  },
  
  section1: {
    description: '4 domande • 2 min',
  },
  section2: {
    description: '7 domande • 3 min',
  },
  section3: {
    description: '6 domande • 2 min',
  },
  section4: {
    description: '6 domande • 3 min',
  },
  section5: {
    description: '2 domande • 1 min',
  },
  section6: {
    description: '1 domanda • 1 min',
  },
  
  // Traduzioni comuni
  common: {
    oui: 'Sì',
    non: 'No',
    autre: 'Altro',
    loading: 'Caricamento...',
    submit: 'Invia',
    next: 'Avanti',
    previous: 'Indietro',
    skip: 'Salta',
    save: 'Salva',
    cancel: 'Annulla',
    close: 'Chiudi',
    required: 'Obbligatorio',
    optional: 'Opzionale',
    error: 'Errore',
    success: 'Successo',
    completed: 'Completato',
    inProgress: 'In corso',
    notStarted: 'Non iniziato',
    profileAgency: 'Agenzia interinale',
    profileClient: 'Cliente',
    profileWorker: 'Lavoratore interinale',
    score_not_interested: 'Non interessato',
    score_very_interested: 'Molto interessato',
  },
  
  // Settori
  sectors: {
    btp: 'Edilizia',
    industrie: 'Industria',
    logistique: 'Logistica',
    hotellerie: 'Ospitalità',
    sante: 'Sanità',
    agriculture: 'Agricoltura',
    tech: 'Tecnologia/IT',
    autres: 'Altri',
  },
  
  // Domande - eredita da FR poi sovrascrive con traduzioni IT
  questions: {
    ...fr.questions,
    
    // Q1 : Nome
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Nome',
      placeholder: 'Nome dell\'organizzazione o il suo nome completo',
    },
    
    // Q2 : Anno creazione (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Anno di creazione',
      placeholder: '2015',
    },
    
    // Q2 : Anno creazione (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Anno di creazione della sua azienda',
      placeholder: '2010',
    },
    
    // Q2 : Nazionalità (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'La sua nazionalità',
      placeholder: 'Es: Polacca, Rumena...',
    },
    
    // Q3 : Dimensione (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Dimensione dell\'organizzazione',
      options: {
        '1-9': '1-9 dipendenti',
        '10-49': '10-49 dipendenti',
        '50-249': '50-249 dipendenti',
        '250+': '250+ dipendenti',
      },
    },
    
    // Q3 : Esperienza (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Anni di esperienza nel lavoro interinale',
      options: {
        '<1': 'Meno di 1 anno',
        '1-3': '1-3 anni',
        '3-5': '3-5 anni',
        '5-10': '5-10 anni',
        '10+': 'Più di 10 anni',
      },
    },
    
    // Q4 : Settori
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Principali settori di attività',
      description: 'Selezioni tutti i settori rilevanti',
    },
    
    // Q4 : Mestieri (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'I suoi mestieri',
      description: 'Selezioni tutti i suoi mestieri',
    },
    
    // Q5 : Paese (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Paese della sua agenzia',
      placeholder: 'Es: Polonia',
    },
    
    // Q5 : Localizzazione (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Paese dove opera la sua azienda',
      placeholder: 'Es: Francia',
    },
    
    // Q5 : Paese lavoro (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Paesi dove ha lavorato come lavoratore interinale',
      placeholder: 'Es: Francia, Germania, Belgio...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Volume annuale di lavoratori distaccati',
      options: {
        '0': 'Nessuno ancora',
        '1-50': '1-50 lavoratori',
        '51-200': '51-200 lavoratori',
        '201-500': '201-500 lavoratori',
        '500+': 'Più di 500',
      },
    },
    
    // Q6 : Volume cliente (CLIENT)
    q6_volume_client: {
      label: 'Quanti lavoratori interinali assume per anno?',
      options: {
        '0': 'Nessuno attualmente',
        '1-10': '1-10 persone',
        '11-50': '11-50 persone',
        '51-200': '51-200 persone',
        '200+': '200+ persone',
      },
    },
    
    // Q6 : Frequenza (WORKER)
    q6_frequence: {
      label: 'Con che frequenza lavora come interinale?',
      options: {
        permanent: 'Regolarmente (tutto l\'anno)',
        saisonnier: 'Stagionale (certi mesi)',
        occasionnel: 'Occasionalmente',
        jamais: 'Mai ancora (in cerca)',
      },
    },
    
    // Sezione 2 - Distacco/Esperienza
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Da dove provengono i suoi lavoratori distaccati?',
      placeholder: 'Es: Polonia, Romania, Bulgaria...',
    },
    
    // Q8 : Destinazioni (AGENCY)
    q8_destinations: {
      label: 'Paesi di destinazione',
      description: 'Paesi dove distacca i lavoratori',
      placeholder: 'Es: Francia, Germania, Belgio, Paesi Bassi...',
    },
    
    // Q8 : Nazionalità (CLIENT)
    q8_nationalites: {
      label: 'Nazionalità dei lavoratori interinali che assume',
      placeholder: 'Es: Polacchi, Rumeni, Bulgari...',
    },
    
    // Q9 : Sfida (AGENCY)
    q9_defi: {
      label: 'La sua principale sfida con il distacco internazionale',
      options: {
        admin: 'Complessità amministrativa (A1, SIPSI...)',
        conformite: 'Conformità legale multi-paese',
        cout: 'Costi e tempo di gestione',
        langues: 'Barriere linguistiche',
        autre: 'Altro',
      },
    },
    
    // Q9 : Sfida cliente (CLIENT)
    q9_defi_client: {
      label: 'La sua principale sfida con i lavoratori interinali europei',
      options: {
        trouver: 'Trovare agenzie affidabili',
        conformite: 'Conformità legale',
        qualite: 'Qualità/competenze',
        cout: 'Costi troppo alti',
        langues: 'Comunicazione / Lingue',
        autre: 'Altro',
      },
    },
    
    // Q9 : Sfida lavoratore (WORKER)
    q9_defi_worker: {
      label: 'La sua principale sfida con il lavoro interinale all\'estero',
      options: {
        trouver: 'Trovare incarichi',
        admin: 'Pratiche amministrative',
        langue: 'Barriera linguistica',
        logement: 'Trovare alloggio',
        paiement: 'Problemi di pagamento/salario',
        autre: 'Altro',
      },
    },
    
    // Q9 : Altro
    q9_autre: {
      label: 'Per favore specifichi la sua principale sfida',
      placeholder: 'Descriva la sua principale sfida...',
    },
    
    // Q10 : Gestione (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Come gestisce le dichiarazioni di distacco oggi?',
      options: {
        interne: 'Team interno',
        externe: 'Fornitore esterno',
        mixte: 'Approccio misto',
        manuel: 'Gestione manuale',
        logiciel: 'Software specializzato',
      },
    },
    
    // Q10 : Agenzie (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Quante agenzie di lavoro interinale utilizza?',
      options: {
        '0': 'Nessuna',
        '1': '1 agenzia',
        '2-3': '2-3 agenzie',
        '4-10': '4-10 agenzie',
        '10+': 'Più di 10',
      },
    },
    
    // Q10 : Processo (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Come assume lavoratori interinali?',
      options: {
        agence_fr: 'Agenzie francesi di lavoro interinale',
        agence_euro: 'Agenzie europee di lavoro interinale',
        direct: 'Assunzione diretta',
        mixte: 'Misto',
      },
    },
    
    // Q10 : Agenzia (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Come trova lavoro temporaneo?',
      options: {
        agence: 'Tramite agenzie di lavoro interinale',
        bouche: 'Passaparola',
        internet: 'Portali di lavoro online',
        direct: 'Candidatura diretta',
      },
    },
    
    // Q10ter : Agenzie utilizzate (WORKER)
    q10_agences_worker: {
      label: 'Con quante agenzie lavorate?',
      options: {
        '1': 'Solo 1 agenzia',
        '2-3': '2-3 agenzie',
        '4-10': '4-10 agenzie',
        '10+': 'Più di 10',
      },
    },
    
    // Q11 : Incidenti (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Ha affrontato sanzioni o incidenti relativi alla conformità del distacco?',
      description: 'La sua risposta rimane anonima',
      options: {
        jamais: 'No, mai',
        rarement: 'Raramente (1-2 volte)',
        parfois: 'A volte (3-5 volte)',
        souvent: 'Spesso (6+ volte)',
      },
    },
    
    // Q11 : Conformità (CLIENT)
    q11_conformite: {
      label: 'Verifica la conformità legale delle agenzie di lavoro interinale?',
      options: {
        oui_systematique: 'Sì, sistematicamente',
        oui_parfois: 'Sì, a volte',
        non: 'No',
        ne_sait_pas: 'Non so',
      },
    },
    
    // Q11 : Problemi (WORKER)
    q11_problemes: {
      label: 'Ha avuto problemi con il lavoro interinale all\'estero?',
      options: {
        oui_graves: 'Sì, problemi gravi',
        oui_mineurs: 'Sì, problemi minori',
        non: 'No',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Budget annuale allocato alla gestione amministrativa del distacco',
      options: {
        '0-5k': '€0-5.000 / anno',
        '5-15k': '€5.000-15.000 / anno',
        '15-30k': '€15.000-30.000 / anno',
        '30k+': '€30.000+ / anno',
        inconnu: 'Non so',
      },
    },
    
    // Q12 : Budget cliente (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Budget annuale dedicato al lavoro interinale',
      options: {
        '0-50k': '€0 - €50.000',
        '50-200k': '€50.000 - €200.000',
        '200-500k': '€200.000 - €500.000',
        '500k+': '€500.000+',
        'inconnu': 'Non so',
      },
    },
    
    // Q12 : Soddisfazione (CLIENT)
    q12_satisfaction: {
      label: 'Soddisfazione con le agenzie di lavoro interinale attuali',
      options: {
        tres_satisfait: 'Molto soddisfatto',
        satisfait: 'Soddisfatto',
        neutre: 'Neutro',
        insatisfait: 'Insoddisfatto',
      },
    },
    
    // Q12 : Salario (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'È soddisfatto del suo salario da lavoro interinale?',
      options: {
        '<1500': 'Meno di €1.500',
        '1500-2500': '€1.500 - €2.500',
        '2500-3500': '€2.500 - €3.500',
        '3500+': '€3.500+',
      },
    },
    
    // Q13 : Perdita di guadagno (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Quale percentuale di entrate viene persa a causa della complessità amministrativa?',
      options: {
        'non': 'No, non proprio',
        'faible': 'Sì, bassa (< 5% entrate)',
        'moyen': 'Sì, media (5-15% entrate)',
        'important': 'Sì, significativa (> 15% entrate)',
      },
    },
    
    // Q13 : Soddisfazione (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Soddisfazione con le sue agenzie di lavoro interinale attuali',
      options: {
        'tres_satisfait': 'Molto soddisfatto',
        'satisfait': 'Soddisfatto',
        'neutre': 'Neutro',
        'insatisfait': 'Insoddisfatto',
        'tres_insatisfait': 'Molto insoddisfatto',
      },
    },
    
    // Q13 : Soddisfazione lavoratore (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Soddisfazione con le sue agenzie di lavoro interinale attuali',
      options: {
        'tres_satisfait': 'Molto soddisfatto',
        'satisfait': 'Soddisfatto',
        'neutre': 'Neutro',
        'insatisfait': 'Insoddisfatto',
        'tres_insatisfait': 'Molto insoddisfatto',
      },
    },
    
    // Sezione 3 - Esigenze
    
    // Q14 : Rischi (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Le sue principali preoccupazioni',
      description: 'Selezioni tutte quelle applicabili',
      options: {
        amendes: 'Multe e sanzioni',
        reputation: 'Reputazione / Immagine',
        penal: 'Responsabilità penale',
        delais: 'Ritardi nelle missioni',
        clients: 'Perdita di clienti',
        aucun: 'Nessun rischio importante',
      },
    },
    
    // Q14 : Esigenze (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Le sue principali esigenze',
      description: 'Selezioni tutte quelle applicabili',
      options: {
        fiabilite: 'Trovare agenzie affidabili',
        conformite: 'Conformità legale',
        qualite: 'Qualità/competenze',
        cout: 'Costi',
        disponibilite: 'Disponibilità di candidati',
        aucun: 'Nessuna grande esigenza',
      },
    },
    
    // Q14 : Aspettative (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Le sue aspettative per il lavoro interinale all\'estero',
      description: 'Selezioni tutte quelle applicabili',
      options: {
        salaire: 'Salario migliore',
        conditions: 'Migliori condizioni di lavoro',
        stabilite: 'Stabilità',
        experience: 'Esperienza internazionale',
        logement: 'Assistenza per l\'alloggio',
        aucun: 'Nessuna aspettativa particolare',
      },
    },
    
    // Q14_rischi_cliente opzioni
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Le sue principali preoccupazioni',
      description: 'Selezioni tutte quelle applicabili',
      options: {
        conformite: 'Conformità legale',
        qualite: 'Qualità/competenze',
        communication: 'Comunicazione/Lingue',
        cout: 'Costi imprevisti',
        disponibilite: 'Disponibilità di candidati',
        aucun: 'Nessuna grande preoccupazione',
      },
    },
    
    // Q14_rischi_lavoratore opzioni
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Quali problemi incontra più frequentemente?',
      description: 'Selezioni tutti quelli applicabili',
      options: {
        paiement: 'Ritardi nei pagamenti',
        conditions: 'Cattive condizioni',
        contrat: 'Contratti non rispettati',
        logement: 'Alloggio inadeguato',
        communication: 'Problemi di comunicazione',
        aucun: 'Nessun grande problema',
      },
    },
    
    // Q15 : Problema
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Quale problema vorrebbe risolvere per primo?',
      placeholder: 'Descriva il suo problema prioritario...',
    },
    
    // Q15 : Esigenze cliente (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Quali sono le sue esigenze prioritarie?',
      placeholder: 'Es: Trovare rapidamente, migliore qualità, prezzi...',
    },
    
    // Q15 : Miglioramenti (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Cosa vorrebbe migliorare nelle sue missioni?',
      placeholder: 'Es: Salario, alloggio, supporto, stabilità...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Utilizza software di gestione ERP?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Altro',
        aucun: 'Nessun ERP',
      },
    },
    
    // Q16 : Nome ERP
    q16_nom_erp: {
      label: 'Quale software/ERP?',
      placeholder: 'Es: SAP, Odoo, personalizzato...',
    },
    
    // Q16 : Criteri (CLIENT)
    q16_criteres: {
      label: 'I suoi principali criteri di selezione per le agenzie di lavoro interinale',
      description: 'Selezioni i suoi 3 principali',
    },
    
    // Q16 : Miglioramento (WORKER)
    q16_amelioration: {
      label: 'Cosa migliorerebbe la sua esperienza di lavoro interinale?',
      description: 'Selezioni tutte quelle applicabili',
    },
    
    // Q17 : Migrazione (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'È pronto a cambiare i suoi strumenti di lavoro?',
      options: {
        oui: 'Sì, nessun problema',
        conditions: 'Sì, a condizioni',
        difficile: 'Difficile, ma aperto',
        non: 'No, non è pensabile',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Budget mensile per una piattaforma di assunzione interinale',
      options: {
        '0': 'Non disposto a pagare',
        '1-100': '€1 - €100/mese',
        '100-500': '€100 - €500/mese',
        '500-1000': '€500 - €1.000/mese',
        '1000+': 'Più di €1.000/mese',
      },
    },
    
    // Q17 : Piattaforma (WORKER)
    q17_plateforme: {
      label: 'Userebbe una piattaforma per trovare lavoro interinale all\'estero?',
      options: {
        oui_certainement: 'Sì, sicuramente',
        oui_probablement: 'Sì, probabilmente',
        peut_etre: 'Forse',
        non: 'No',
      },
    },
    
    // Sezione 4 - Interesse YoJob
    
    // Q18 : Punteggio
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Qual è il suo interesse per un marketplace europeo di distacco?',
      description: 'Valuti da 1 (non interessato) a 10 (molto interessato)',
    },
    
    // Q19 : Caratteristiche (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Caratteristiche più interessanti',
      description: 'Selezioni le sue 3 priorità principali',
      options: {
        sipsi: 'Dichiarazione SIPSI automatica',
        a1: 'Gestione certificato A1',
        conformite: 'Dashboard di conformità',
        alertes: 'Avvisi e rinnovi',
        documents: 'Centralizzazione documenti',
        marketplace: 'Marketplace di agenzie',
        support: 'Supporto multilingue specializzato',
        api: 'Integrazione API (ERP)',
      },
    },
    
    // Q19 : Caratteristiche CLIENTE
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Caratteristiche più interessanti',
      description: 'Selezioni tutte quelle che le interessano',
      options: {
        recherche: 'Cercare agenzie affidabili',
        comparaison: 'Confronto prezzo/qualità',
        avis: 'Recensioni verificate',
        conformite: 'Garanzia di conformità',
        support: 'Supporto dedicato',
        facturation: 'Fatturazione centralizzata',
        suivi: 'Monitoraggio in tempo reale',
      },
    },
    
    // Q19 : Caratteristiche LAVORATORE
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Caratteristiche più interessanti',
      description: 'Selezioni tutte quelle che le interessano',
      options: {
        recherche: 'Ricerca di lavoro',
        avis: 'Recensioni di agenzie',
        logement: 'Assistenza per l\'alloggio',
        paiement: 'Pagamento sicuro',
        support: 'Supporto nella mia lingua',
        documents: 'Aiuto con i documenti amministrativi',
        formation: 'Programmi di formazione',
      },
    },
    
    // Q20 : Prezzo
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Modello di prezzo preferito',
      options: {
        mensuel: 'Abbonamento mensile fisso',
        usage: 'Pagamento per utilizzo',
        annuel: 'Piano annuale (sconto)',
        gratuit: 'Gratuito per i lavoratori',
      },
    },
    
    // Q21 : Budget mensile
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Budget mensile per una soluzione SaaS completa',
      options: {
        '0-100': '€0 - €100/mese',
        '100-300': '€100 - €300/mese',
        '300-500': '€300 - €500/mese',
        '500-1000': '€500 - €1.000/mese',
        '1000+': 'Più di €1.000/mese',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Vorrebbe testare una versione iniziale (MVP)?',
      options: {
        oui_gratuit: 'Sì, gratuitamente',
        oui_reduc: 'Sì, con sconto',
        peut_etre: 'Forse, dipende dalle caratteristiche',
        non: 'No, non interessato',
      },
    },
    
    // Q23 : Scadenza
    q23_delai: {
      label: 'Quando vorrebbe iniziare?',
      options: {
        'immediat': 'Immediatamente',
        '1-3mois': 'In 1-3 mesi',
        '3-6mois': 'In 3-6 mesi',
        '6-12mois': 'In 6-12 mesi',
        'plus_tard': 'Più tardi',
      },
    },
    
    // Sezione 5 - Visione Futura
    
    // Q23 : Ruolo
    q23_role: {
      label: 'Come vede il suo ruolo nel marketplace europeo?',
      options: {
        decideur: 'Decisore finale',
        influenceur: 'Influencer / Raccomandazione',
        utilisateur: 'Utente finale',
        autre: 'Altro',
      },
    },
    
    // Q24 : Evoluzione
    q24_evolution: {
      label: 'I suoi piani di espansione internazionale',
      options: {
        oui_rapide: 'Sì, entro 6 mesi',
        oui_lent: 'Sì, entro 1-2 anni',
        maintien: 'Mantenere i paesi attuali',
        reduction: 'Ridurre la portata internazionale',
      },
    },
    
    // Q25 : Esigenze
    q25_besoins: {
      label: 'Altre esigenze o commenti',
      placeholder: 'Condivida qualsiasi altro feedback o esigenza...',
    },
    
    // Sezione 6 - Contatto
    
    // Q26 : Telefono professionale
    q26_phone: {
      label: 'Numero di telefono professionale',
      placeholder: '+39 312 345 678',
    },
    
    // Q27 : Nome
    q27_firstname: {
      label: 'Nome',
      placeholder: 'Il suo nome',
    },
    
    // Q28 : Cognome
    q28_lastname: {
      label: 'Cognome',
      placeholder: 'Il suo cognome',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'SIRET o SIREN (facoltativo)',
      placeholder: '123 456 789 00012',
      description: 'Per arricchimento tramite Pappers/Société.com',
    },
    
    // Q30 : Email
    email: {
      label: 'La sua email',
      placeholder: 'sua.email@esempio.it',
    },
    
    // Q31 : Autorizzazione contatto
    autorise_contact: {
      label: 'Accetto di essere ricontattato',
    },
    
    // Q32 : Rapporto di studio
    souhaite_rapport: {
      label: 'Vorrei ricevere il rapporto dello studio',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-12T10:00:00.000Z',
    _origin: 'manual',
    _translatedBy: 'YoJob Team - Italian (IT) Complete Translation',
    _locale: 'it-IT',
    _completeness: 100,
  },
};
