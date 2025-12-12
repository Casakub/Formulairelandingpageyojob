/**
 * 🇩🇪 DEUTSCHE ÜBERSETZUNGEN (DE)
 * 
 * Basierend auf dem englischen Übersetzungssystem
 * Basis: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-11T18:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const de: TranslationBundle = {
  // Erbt von FR für fehlende Schlüssel
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Profil',
    section2: 'Erfahrung',
    section3: 'Bedürfnisse',
    section4: 'Interesse',
    section5: 'Vision',
    section6: 'Kontakt',
    dashboard: 'Dashboard',
    back_to_site: 'Zurück zur Website',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Dashboard',
    tabs: {
      overview: 'Übersicht',
      results: 'Ergebnisse',
      questions: 'Fragen',
      translations: 'Übersetzungen',
      export: 'Export',
      integrations: 'Integrationen',
      cms: 'Formular-CMS',
      settings: 'Einstellungen',
      prospects: 'Interessenten',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Neu',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Abmelden',
      back_to_survey: 'Zurück zur Umfrage',
      toggle_sidebar: 'Seitenleiste ein-/ausblenden',
    },
    user: {
      welcome: 'Willkommen',
      logged_in_as: 'Angemeldet als',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Agenturprofil',
      description: '4 Fragen • 2 Min',
    },
    2: {
      title: 'Entsendung',
      description: '7 Fragen • 3 Min',
    },
    3: {
      title: 'Bedürfnisse',
      description: '6 Fragen • 2 Min',
    },
    4: {
      title: 'YoJob Interesse',
      description: '6 Fragen • 3 Min',
    },
    5: {
      title: 'Zukunftsvision',
      description: '2 Fragen • 1 Min',
    },
    6: {
      title: 'Kontakt',
      description: '1 Frage • 1 Min',
    },
  },
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Ihr Agenturprofil',
        description: 'Erzählen Sie uns von Ihrer Zeitarbeitsfirma und Ihrer Expertise',
      },
      client: {
        title: '📋 Ihr Unternehmensprofil',
        description: 'Erzählen Sie uns von Ihrem Unternehmen und Ihren Personalbedürfnissen',
      },
      worker: {
        title: '📋 Ihr Profil',
        description: 'Erzählen Sie uns von Ihrem beruflichen Werdegang',
      },
    },
    2: {
      agency: {
        title: '💼 Entsendungserfahrung',
        description: 'Ihre Aktivität im Bereich Arbeitnehmerentsendung',
      },
      client: {
        title: '💼 Ihre Rekrutierungserfahrung',
        description: 'Ihre aktuellen Praktiken bei Rekrutierung und Zeitarbeit',
      },
      worker: {
        title: '💼 Ihre Zeitarbeitserfahrung',
        description: 'Ihr Werdegang in der Zeitarbeit',
      },
    },
    3: {
      agency: {
        title: '🎯 Bedürfnisse und Tools',
        description: 'Ihre Herausforderungen und aktuellen Lösungen',
      },
      client: {
        title: '🎯 Ihre aktuellen Bedürfnisse',
        description: 'Herausforderungen und Erwartungen bei der Personalbeschaffung',
      },
      worker: {
        title: '🎯 Ihre Erwartungen',
        description: 'Was Ihnen bei einem Einsatz wichtig ist',
      },
    },
    4: {
      agency: {
        title: '⭐ Interesse an einer europäischen Plattform',
        description: 'Entdecken Sie unsere Vision eines innovativen Marktplatzes',
      },
      client: {
        title: '⭐ Interesse an einer europäischen Plattform',
        description: 'Eine innovative Lösung für Ihre Bedürfnisse',
      },
      worker: {
        title: '⭐ Ihr Interesse an einer Plattform',
        description: 'Eine Plattform, um Ihre Einsätze einfach zu finden',
      },
    },
    5: {
      agency: {
        title: '🔮 Zukunftsvision',
        description: 'Budget und Entwicklungsaussichten',
      },
      client: {
        title: '🔮 Ihre zukünftigen Prioritäten',
        description: 'Budget und Rekrutierungsstrategie',
      },
      worker: {
        title: '🔮 Ihre Ziele',
        description: 'Ihre anstehenden beruflichen Projekte',
      },
    },
    6: {
      agency: {
        title: '📧 In Kontakt bleiben',
        description: 'Erhalten Sie die Studienergebnisse und bleiben Sie informiert',
      },
      client: {
        title: '📧 In Kontakt bleiben',
        description: 'Erhalten Sie die Ergebnisse und unsere Empfehlungen',
      },
      worker: {
        title: '📧 In Kontakt bleiben',
        description: 'Erhalten Sie die Ergebnisse und Möglichkeiten',
      },
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Marktforschung',
  },
  
  // Hero
  hero: {
    title: 'Marktumfrage',
    subtitle: 'Helfen Sie uns, Ihre Bedürfnisse besser zu verstehen',
    description: 'Diese Umfrage dauert etwa 10-15 Minuten. Ihre Antworten helfen uns, eine maßgeschneiderte Lösung für Ihre Branche zu entwickeln.',
    cta_start: 'Umfrage starten',
    cta_dashboard: 'Zum Dashboard',
    badge: 'Europäische Marktstudie',
    stat: {
      countries: '27 europäische Länder',
      questions: 'Fragen',
      benchmark: 'Erhalten Sie den Benchmark 2025',
      insights: 'Exklusive Markteinblicke',
      opportunities: 'Prioritärer Zugang zu Stellenangeboten',
    },
    footer: {
      info: 'Fragen • Anonym • DSGVO-konform',
      anonymous: 'Anonym',
      gdpr: 'DSGVO-konform',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Wer sind Sie?',
    subtitle: 'Wählen Sie Ihr Profil, um die Fragen zu personalisieren',
    agency: 'Zeitarbeitsfirma',
    agency_description: 'Sie sind eine Zeitarbeits- oder Personalvermittlungsagentur',
    client: 'Kundenunternehmen',
    client_description: 'Sie sind ein Unternehmen, das Zeitarbeitskräfte beschäftigt',
    worker: 'Zeitarbeitskraft',
    worker_description: 'Sie sind eine Zeitarbeitskraft oder entsandter Arbeitnehmer',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Europäische Marktstudie - Rekrutierung & Zeitarbeit',
    title: 'Teilen Sie Ihre Erfahrung mit dem europäischen Markt',
    subtitle: 'Wählen Sie Ihr Profil, um die Umfrage zu starten',
    cta: 'Zum Starten klicken →',
    trust: {
      secure: 'Sichere Daten',
      languages: '{count} verfügbare Sprachen',
      languages_suffix: 'verfügbare Sprachen',
      anonymous: 'Anonym & vertraulich',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Zeitarbeitsfirma',
      description: 'Sie sind eine europäische Zeitarbeitsfirma. Teilen Sie Ihre Entsendungserfahrung.',
      estimatedTime: '15 Min',
    },
    client: {
      label: 'Kundenunternehmen',
      description: 'Sie stellen Zeitarbeitskräfte ein. Teilen Sie Ihre Bedürfnisse und Erwartungen.',
      estimatedTime: '10 Min',
    },
    worker: {
      label: 'Zeitarbeitskraft',
      description: 'Sie arbeiten als Zeitarbeitskraft. Teilen Sie Ihre praktischen Erfahrungen.',
      estimatedTime: '10 Min',
    },
  },
  
  // Buttons
  button: {
    previous: 'Zurück',
    next: 'Weiter',
    submit: 'Meine Antworten absenden',
    submitting: 'Wird übermittelt...',
    back: 'Zurück',
    start: 'Start',
  },
  
  // Confirmation
  confirmation: {
    title: 'Vielen Dank für Ihre Teilnahme!',
    subtitle: 'Ihre Antworten wurden erfolgreich gespeichert',
    message: 'Wir analysieren derzeit alle Antworten, um eine perfekt auf Ihre Bedürfnisse zugeschnittene Lösung zu entwickeln.',
    cta_back: 'Zurück zur Startseite',
    cta_dashboard: 'Dashboard ansehen',
  },
  
  // Progress
  progress: {
    section: 'Abschnitt',
    question: 'Frage',
    section_completed: 'Abschnitt abgeschlossen',
    questions_remaining: '{count} Fragen verbleibend',
    time_remaining: 'Etwa {time} verbleibend',
  },
  
  // Common translations
  common: {
    oui: 'Ja',
    non: 'Nein',
    autre: 'Andere',
    loading: 'Wird geladen...',
    submit: 'Absenden',
    next: 'Weiter',
    previous: 'Zurück',
    skip: 'Überspringen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    close: 'Schließen',
    required: 'Erforderlich',
    optional: 'Optional',
    error: 'Fehler',
    success: 'Erfolg',
    completed: 'Abgeschlossen',
    inProgress: 'In Bearbeitung',
    notStarted: 'Nicht begonnen',
    profileAgency: 'Zeitarbeitsfirma',
    profileClient: 'Kundenunternehmen',
    profileWorker: 'Zeitarbeitskraft',
  },
  
  // Sectors
  sectors: {
    btp: 'Bauwesen',
    industrie: 'Fertigung',
    logistique: 'Logistik',
    hotellerie: 'Gastgewerbe',
    sante: 'Gesundheitswesen',
    agriculture: 'Landwirtschaft',
    tech: 'Tech/IT',
    autres: 'Andere',
  },
  
  // Questions - erbt von FR dann überschreibt mit DE-Übersetzungen
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Name',
      placeholder: 'Name der Organisation oder Ihr vollständiger Name',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Gründungsjahr',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Gründungsjahr Ihres Unternehmens',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Ihre Nationalität',
      placeholder: 'Z.B.: Polnisch, Rumänisch...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Unternehmensgröße',
      options: {
        '1-9': '1-9 Mitarbeiter',
        '10-49': '10-49 Mitarbeiter',
        '50-249': '50-249 Mitarbeiter',
        '250+': '250+ Mitarbeiter',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Jahre Zeitarbeitserfahrung',
      options: {
        '<1': 'Weniger als 1 Jahr',
        '1-3': '1-3 Jahre',
        '3-5': '3-5 Jahre',
        '5-10': '5-10 Jahre',
        '10+': 'Mehr als 10 Jahre',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Hauptbranchen',
      description: 'Wählen Sie alle zutreffenden Branchen aus',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Ihre Berufe',
      description: 'Wählen Sie alle Ihre Berufe aus',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Land Ihrer Agentur',
      placeholder: 'Z.B.: Polen',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Land, in dem Ihr Unternehmen tätig ist',
      placeholder: 'Z.B.: Frankreich',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Länder, in denen Sie als Zeitarbeitskraft gearbeitet haben',
      placeholder: 'Z.B.: Frankreich, Deutschland, Belgien...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Jährliches Volumen entsandter Arbeitnehmer',
      options: {
        '0': 'Noch keine',
        '1-50': '1-50 Arbeitnehmer',
        '51-200': '51-200 Arbeitnehmer',
        '201-500': '201-500 Arbeitnehmer',
        '500+': 'Mehr als 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Wie viele Zeitarbeitskräfte beschäftigen Sie pro Jahr?',
      options: {
        '0': 'Derzeit keine',
        '1-10': '1-10 Personen',
        '11-50': '11-50 Personen',
        '51-200': '51-200 Personen',
        '200+': '200+ Personen',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Wie häufig arbeiten Sie in Zeitarbeit?',
      options: {
        permanent: 'Regelmäßig (das ganze Jahr)',
        saisonnier: 'Saisonal (bestimmte Monate)',
        occasionnel: 'Gelegentlich',
        jamais: 'Noch nie (suchend)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Woher kommen Ihre entsandten Arbeitnehmer?',
      placeholder: 'Z.B.: Polen, Rumänien, Bulgarien...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Zielländer',
      description: 'Länder, in die Sie Arbeitnehmer entsenden',
      placeholder: 'Z.B.: Frankreich, Deutschland, Belgien, Niederlande...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Nationalitäten der von Ihnen beschäftigten Zeitarbeitskräfte',
      placeholder: 'Z.B.: Polnisch, Rumänisch, Bulgarisch...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Ihre Hauptherausforderung bei internationaler Entsendung',
      options: {
        admin: 'Verwaltungskomplexität (A1, SIPSI...)',
        conformite: 'Rechtliche Konformität in mehreren Ländern',
        cout: 'Verwaltungskosten und Zeit',
        langues: 'Sprachbarrieren',
        autre: 'Andere',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Ihre Hauptherausforderung mit europäischen Zeitarbeitskräften',
      options: {
        trouver: 'Zuverlässige Agenturen finden',
        conformite: 'Rechtliche Konformität',
        qualite: 'Qualität/Fähigkeiten',
        cout: 'Zu hohe Kosten',
        langues: 'Kommunikation / Sprachen',
        autre: 'Andere',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Ihre Hauptherausforderung bei Zeitarbeit im Ausland',
      options: {
        admin: 'Verwaltungspapiere',
        langue: 'Sprachbarriere',
        logement: 'Unterkunft finden',
        transport: 'Transport',
        salaire: 'Zahlungs-/Gehaltsprobleme',
        autre: 'Andere',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Bitte spezifizieren Sie Ihre Hauptherausforderung',
      placeholder: 'Beschreiben Sie Ihre Hauptherausforderung...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Wie verwalten Sie heute Entsendungsmeldungen?',
      options: {
        manuel: 'Manuell (Excel, Word...)',
        logiciel_interne: 'Interne Software',
        prestataire: 'Externer Dienstleister',
        mixte: 'Gemischter Ansatz',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Wie viele Zeitarbeitsfirmen nutzen Sie?',
      options: {
        '0': 'Keine',
        '1': '1 Agentur',
        '2-3': '2-3 Agenturen',
        '4-10': '4-10 Agenturen',
        '10+': 'Mehr als 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Wie rekrutieren Sie Zeitarbeitskräfte?',
      options: {
        agence_fr: 'Französische Zeitarbeitsfirmen',
        agence_euro: 'Europäische Zeitarbeitsfirmen',
        direct: 'Direktrekrutierung',
        mixte: 'Gemischt',
      },
    },
    
    // Q10 : Agentur (WORKER)
    q10_agence: {
      label: 'Wie finden Sie Zeitarbeit?',
      options: {
        agence: 'Über Zeitarbeitsfirmen',
        bouche: 'Mundpropaganda',
        internet: 'Online-Jobbörsen',
        direct: 'Direktbewerbung',
      },
    },
    
    // Q10ter : Agenturen verwendet (WORKER)
    q10_agences_worker: {
      label: 'Mit wie vielen Agenturen arbeiten Sie?',
      options: {
        '1': 'Nur 1 Agentur',
        '2-3': '2-3 Agenturen',
        '4-10': '4-10 Agenturen',
        '10+': 'Mehr als 10',
      },
    },
    
    // Q11 : Vorfälle (AGENTUR)
    q11_incidents: {
      label: 'Hatten Sie Strafen oder Vorfälle im Zusammenhang mit der Einhaltung von Entsendungsvorschriften?',
      description: 'Ihre Antwort bleibt anonymisiert',
      options: {
        oui_souvent: 'Ja, häufig',
        oui_rare: 'Ja, gelegentlich',
        non: 'Nein',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Überprüfen Sie die rechtliche Konformität der Zeitarbeitsfirmen?',
      options: {
        oui_systematique: 'Ja, systematisch',
        oui_parfois: 'Ja, manchmal',
        non: 'Nein',
        ne_sait_pas: 'Weiß nicht',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Hatten Sie Probleme mit Zeitarbeit im Ausland?',
      options: {
        oui_graves: 'Ja, schwerwiegende Probleme',
        oui_mineurs: 'Ja, kleinere Probleme',
        non: 'Nein',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      label: 'Jährliches Budget für Verwaltung von Entsendungen',
      options: {
        '0': 'Nicht speziell zugewiesen',
        '1-5k': '1.000 € - 5.000 €',
        '5-20k': '5.000 € - 20.000 €',
        '20-50k': '20.000 € - 50.000 €',
        '50k+': 'Mehr als 50.000 €',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Jährliches Budget für Zeitarbeit',
      options: {
        '0-50k': '0 € - 50.000 €',
        '50-200k': '50.000 € - 200.000 €',
        '200-500k': '200.000 € - 500.000 €',
        '500k+': '500.000 €+',
        'inconnu': 'Weiß nicht',
      },
    },
    
    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Zufriedenheit mit aktuellen Zeitarbeitsfirmen',
      options: {
        tres_satisfait: 'Sehr zufrieden',
        satisfait: 'Zufrieden',
        neutre: 'Neutral',
        insatisfait: 'Unzufrieden',
      },
    },
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Sind Sie mit Ihrem Zeitarbeitsgehalt zufrieden?',
      options: {
        '<1500': 'Weniger als 1.500 €',
        '1500-2500': '1.500 € - 2.500 €',
        '2500-3500': '2.500 € - 3.500 €',
        '3500+': '3.500 €+',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Welcher Prozentsatz des Umsatzes geht durch Verwaltungskomplexität verloren?',
      options: {
        'non': 'Nein, nicht wirklich',
        'faible': 'Ja, niedrig (< 5% Umsatz)',
        'moyen': 'Ja, mittel (5-15% Umsatz)',
        'important': 'Ja, bedeutend (> 15% Umsatz)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Zufriedenheit mit Ihren aktuellen Zeitarbeitsfirmen',
      options: {
        'tres_satisfait': 'Sehr zufrieden',
        'satisfait': 'Zufrieden',
        'neutre': 'Neutral',
        'insatisfait': 'Unzufrieden',
        'tres_insatisfait': 'Sehr unzufrieden',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Zufriedenheit mit Ihren aktuellen Zeitarbeitsfirmen',
      options: {
        'tres_satisfait': 'Sehr zufrieden',
        'satisfait': 'Zufrieden',
        'neutre': 'Neutral',
        'insatisfait': 'Unzufrieden',
        'tres_insatisfait': 'Sehr unzufrieden',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Risiken (AGENCY)
    q14_risques: {
      label: 'Ihre Hauptbedenken',
      description: 'Wählen Sie alle zutreffenden aus',
      options: {
        amendes: 'Bußgelder und Strafen',
        reputation: 'Ruf / Image',
        penal: 'Strafrechtliche Haftung',
        delais: 'Missionsverzögerungen',
        clients: 'Verlust von Kunden',
        aucun: 'Kein größeres Risiko',
        sanctions: 'Strafen/Sanktionen',
        conformite: 'Konformität in mehreren Ländern',
        cout: 'Verwaltungskosten',
        documentation: 'Dokumentenverwaltung',
        responsabilite: 'Strafrechtliche Haftung',
        perte_clients: 'Verlust von Kunden',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Ihre Hauptbedürfnisse',
      description: 'Wählen Sie alle zutreffenden aus',
      options: {
        fiabilite: 'Zuverlässige Agenturen finden',
        conformite: 'Rechtliche Konformität',
        qualite: 'Qualität/Fähigkeiten',
        cout: 'Kosten',
        disponibilite: 'Verfügbarkeit von Kandidaten',
        aucun: 'Kein großer Bedarf',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Ihre Erwartungen an Zeitarbeit im Ausland',
      description: 'Wählen Sie alle zutreffenden aus',
      options: {
        salaire: 'Besseres Gehalt',
        conditions: 'Bessere Arbeitsbedingungen',
        stabilite: 'Stabilität',
        experience: 'Internationale Erfahrung',
        logement: 'Unterkunftshilfe',
        aucun: 'Keine besonderen Erwartungen',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Ihre Hauptbedenken',
      description: 'Wählen Sie alle zutreffenden aus',
      options: {
        conformite: 'Rechtliche Konformität',
        qualite: 'Qualität/Fähigkeiten',
        communication: 'Kommunikation/Sprachen',
        cout: 'Unerwartete Kosten',
        disponibilite: 'Verfügbarkeit von Kandidaten',
        aucun: 'Keine größeren Bedenken',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Welche Probleme begegnen Sie am häufigsten?',
      description: 'Wählen Sie alle zutreffenden aus',
      options: {
        paiement: 'Zahlungsverzögerungen',
        conditions: 'Schlechte Bedingungen',
        contrat: 'Verträge nicht eingehalten',
        logement: 'Unzureichende Unterkunft',
        communication: 'Kommunikationsprobleme',
        aucun: 'Keine größeren Probleme',
      },
    },
    
    // Q15 : Problème
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Welches Problem möchten Sie zuerst lösen?',
      placeholder: 'Beschreiben Sie Ihr vorrangiges Problem...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Was sind Ihre vorrangigen Bedürfnisse?',
      placeholder: 'Z.B.: Schnell finden, bessere Qualität, Preise...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Was möchten Sie bei Ihren Einsätzen verbessern?',
      placeholder: 'Z.B.: Gehalt, Unterkunft, Unterstützung, Stabilität...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      label: 'Nutzen Sie ERP/Verwaltungssoftware?',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Andere',
        aucun: 'Kein ERP',
        oui: 'Ja',
        non: 'Nein',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Welche Software/ERP?',
      placeholder: 'Z.B.: SAP, Odoo, individuell...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Ihre Hauptauswahlkriterien für Zeitarbeitsfirmen',
      description: 'Wählen Sie Ihre Top 3 aus',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Was würde Ihre Zeitarbeitserfahrung verbessern?',
      description: 'Wählen Sie alle zutreffenden aus',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      label: 'Sind Sie bereit, Ihre Arbeitstools zu wechseln?',
      options: {
        oui: 'Ja, kein Problem',
        conditions: 'Ja, unter Bedingungen',
        difficile: 'Schwierig, aber offen',
        non: 'Nein, nicht denkbar',
        oui_rapidement: 'Ja, sofort',
        oui_progressivement: 'Ja, schrittweise',
        non_satisfait: 'Nein, zufrieden mit aktuellen Tools',
        non_peur: 'Nein, Angst vor Veränderung',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Monatliches Budget für eine Zeitarbeitsrekrutierungsplattform',
      options: {
        '0': 'Nicht bereit zu zahlen',
        '1-100': '1 € - 100 €/Monat',
        '100-500': '100 € - 500 €/Monat',
        '500-1000': '500 € - 1.000 €/Monat',
        '1000+': 'Mehr als 1.000 €/Monat',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Würden Sie eine Plattform nutzen, um Zeitarbeit im Ausland zu finden?',
      options: {
        oui_certainement: 'Ja, definitiv',
        oui_probablement: 'Ja, wahrscheinlich',
        peut_etre: 'Vielleicht',
        non: 'Nein',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Wie interessiert sind Sie an einem europäischen Entsendungsmarktplatz?',
      description: 'Bewerten Sie von 1 (nicht interessiert) bis 10 (sehr interessiert)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Interessanteste Funktionen',
      description: 'Wählen Sie Ihre Top 3 Prioritäten aus',
      options: {
        sipsi: 'Automatische SIPSI-Meldung',
        a1: 'A1-Bescheinigungsverwaltung',
        conformite: 'Konformitäts-Dashboard',
        alertes: 'Warnungen & Verlängerungen',
        documents: 'Dokumentenzentralisierung',
        marketplace: 'Agenturen-Marktplatz',
        support: 'Mehrsprachiger Expertenservice',
        api: 'API-Integration (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Interessanteste Funktionen',
      description: 'Wählen Sie alle aus, die Sie interessieren',
      options: {
        recherche: 'Zuverlässige Agenturen suchen',
        comparaison: 'Preis-/Qualitätsvergleich',
        avis: 'Verifizierte Bewertungen',
        conformite: 'Konformitätsgarantie',
        support: 'Dedizierter Support',
        facturation: 'Zentralisierte Abrechnung',
        suivi: 'Echtzeit-Tracking',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Interessanteste Funktionen',
      description: 'Wählen Sie alle aus, die Sie interessieren',
      options: {
        recherche: 'Jobsuche',
        avis: 'Agenturbewertungen',
        logement: 'Unterkunftshilfe',
        paiement: 'Sichere Zahlung',
        support: 'Support in meiner Sprache',
        documents: 'Hilfe bei Verwaltungsdokumenten',
        formation: 'Schulungsprogramme',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Bevorzugtes Preismodell',
      options: {
        mensuel: 'Festes monatliches Abonnement',
        usage: 'Pay-as-you-go (nutzungsbasiert)',
        annuel: 'Jahresplan (Rabatt)',
        gratuit: 'Kostenlos für Arbeitnehmer',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Monatliches Budget für eine vollständige SaaS-Lösung',
      options: {
        '0-100': '0 € - 100 €/Monat',
        '100-300': '100 € - 300 €/Monat',
        '300-500': '300 € - 500 €/Monat',
        '500-1000': '500 € - 1.000 €/Monat',
        '1000+': 'Mehr als 1.000 €/Monat',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Möchten Sie eine frühe Version (MVP) testen?',
      options: {
        oui_gratuit: 'Ja, kostenlos',
        oui_reduc: 'Ja, mit Rabatt',
        peut_etre: 'Vielleicht, hängt von Funktionen ab',
        non: 'Nein, nicht interessiert',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Wie sehen Sie Ihre Rolle auf dem europäischen Marktplatz?',
      options: {
        decideur: 'Endgültiger Entscheidungsträger',
        influenceur: 'Beeinflusser / Empfehlung',
        utilisateur: 'Endbenutzer',
        autre: 'Andere',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Ihre internationalen Expansionspläne',
      options: {
        oui_rapide: 'Ja, innerhalb von 6 Monaten',
        oui_lent: 'Ja, innerhalb von 1-2 Jahren',
        maintien: 'Aktuelle Länder beibehalten',
        reduction: 'Internationalen Umfang reduzieren',
      },
    },
    
    // Q25 : Besoins
    q25_besoins: {
      label: 'Weitere Bedürfnisse oder Kommentare',
      placeholder: 'Teilen Sie weitere Rückmeldungen oder Bedürfnisse...',
    },
    
    // Section 6 - Contact
    
    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Geschäftliche Telefonnummer',
      placeholder: '+49 176 12 34 56 78',
    },
    
    // Q27 : Prénom
    q27_firstname: {
      label: 'Vorname',
      placeholder: 'Ihr Vorname',
    },
    
    // Q28 : Nom
    q28_lastname: {
      label: 'Nachname',
      placeholder: 'Ihr Nachname',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'SIRET oder SIREN (optional)',
      placeholder: '123 456 789 00012',
      description: 'Zur Anreicherung über Pappers/Société.com',
    },
    
    // Q30 : Email
    email: {
      label: 'Ihre E-Mail',
      placeholder: 'ihre.email@beispiel.com',
    },
    
    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'Ich bin einverstanden, wieder kontaktiert zu werden',
    },
    
    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'Ich möchte den Studienbericht erhalten',
    },
  },
  
  _meta: {
    _lastUpdated: '2024-12-11T18:00:00.000Z',
    _origin: 'translated',
    _translatedBy: 'German translation team',
  },
};