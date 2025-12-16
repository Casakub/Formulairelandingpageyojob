/**
 * 🇬🇷 TRADUCTIONS GRECQUES (EL)
 * 
 * Traductions complètes pour le grec
 * Base: translations-complete.ts
 * 
 * @version 2.0.0
 * @created 2024-12-12T10:00:00.000Z
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const el: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Navigation
  nav: {
    section1: 'Προφίλ',
    section2: 'Εμπειρία',
    section3: 'Ανάγκες',
    section4: 'Ενδιαφέρον',
    section5: 'Όραμα',
    section6: 'Επικοινωνία',
    dashboard: 'Πίνακας ελέγχου',
    back_to_site: 'Επιστροφή στον ιστότοπο',
  },
  
  dashboard: {
    title: 'YoJob',
    subtitle: 'Πίνακας ελέγχου',
    tabs: {
      overview: 'Επισκόπηση',
      results: 'Αποτελέσματα',
      questions: 'Ερωτήσεις',
      translations: 'Μεταφράσεις',
      export: 'Εξαγωγή',
      integrations: 'Ενσωματώσεις',
      cms: 'Φόρμα CMS',
      settings: 'Ρυθμίσεις',
      prospects: 'Υποψήφιοι πελάτες',
    },
    badges: {
      hub: '⭐ Hub',
      new: '🆕 Νέο',
      beta: '🧪 Beta',
    },
    actions: {
      logout: 'Αποσύνδεση',
      back_to_survey: 'Επιστροφή στην έρευνα',
      toggle_sidebar: 'Σύμπτυξη/Ανάπτυξη',
    },
    user: {
      welcome: 'Καλώς ήρθατε',
      logged_in_as: 'Συνδεδεμένος ως',
    },
  },
  
  // Sections
  section: {
    1: {
      title: 'Προφίλ',
      description: '4 ερωτήσεις • 2 λεπτά',
    },
    2: {
      title: 'Εμπειρία',
      description: '7 ερωτήσεις • 3 λεπτά',
    },
    3: {
      title: 'Ανάγκες',
      description: '6 ερωτήσεις • 2 λεπτά',
    },
    4: {
      title: 'Ενδιαφέρον για το YoJob',
      description: '6 ερωτήσεις • 3 λεπτά',
    },
    5: {
      title: 'Μελλοντικό όραμα',
      description: '2 ερωτήσεις • 1 λεπτό',
    },
    6: {
      title: 'Επικοινωνία',
      description: '1 ερώτηση • 1 λεπτό',
    },
  },
  
  // Header
  header: {
    title: 'YoJob',
    subtitle: 'Έρευνα αγοράς',
  },
  
  // Hero
  hero: {
    title: 'Έρευνα αγοράς',
    subtitle: 'Βοηθήστε μας να κατανοήσουμε καλύτερα τις ανάγκες σας',
    description: 'Αυτή η έρευνα διαρκεί περίπου 10-15 λεπτά. Οι απαντήσεις σας θα μας βοηθήσουν να δημιουργήσουμε μια λύση προσαρμοσμένη στον κλάδο σας.',
    cta_start: 'Έναρξη έρευνας',
    cta_dashboard: 'Άνοιγμα πίνακα ελέγχου',
    badge: 'Ευρωπαϊκή έρευνα αγοράς',
    stat: {
      countries: '27 ευρωπαϊκές χώρες',
      questions: 'ερωτήσεις',
      benchmark: 'Λάβετε το benchmark 2025',
      insights: 'Αποκλειστικές πληροφορίες αγοράς',
      opportunities: 'Προνομιακή πρόσβαση σε θέσεις εργασίας',
    },
    footer: {
      info: 'ερωτήσεις • Ανώνυμα • Συμβατό με GDPR',
      anonymous: 'Ανώνυμα',
      gdpr: 'Συμβατό με GDPR',
    },
  },
  
  // Respondent Type
  respondent_type: {
    title: 'Ποιοι είστε;',
    subtitle: 'Επιλέξτε το προφίλ σας για να προσαρμόσετε τις ερωτήσεις',
    agency: 'Γραφείο απασχόλησης',
    agency_description: 'Είστε γραφείο προσωρινής απασχόλησης ή απόσπασης',
    client: 'Πελάτης',
    client_description: 'Είστε εταιρεία που προσλαμβάνει εργαζόμενους γραφείου',
    worker: 'Εργαζόμενος γραφείου',
    worker_description: 'Είστε εργαζόμενος γραφείου ή αποσπασμένος',
  },
  
  // Respondent Selector
  selector: {
    badge: '🌍 Ευρωπαϊκή έρευνα αγοράς - Απασχόληση και Προσωρινή εργασία',
    title: 'Μοιραστείτε την εμπειρία σας στην ευρωπαϊκή αγορά',
    subtitle: 'Επιλέξτε το προφίλ σας για να ξεκινήσετε την έρευνα',
    cta: 'Κάντε κλικ για να ξεκινήσετε →',
    trust: {
      secure: 'Ασφαλή δεδομένα',
      languages: '{count} διαθέσιμες γλώσσες',
      languages_suffix: 'διαθέσιμες γλώσσες',
      anonymous: 'Ανώνυμα και εμπιστευτικά',
    },
  },
  
  // Respondent profiles for cards
  respondent: {
    agency: {
      label: 'Γραφείο απασχόλησης',
      description: 'Είστε ευρωπαϊκό γραφείο προσωρινής απασχόλησης. Μοιραστείτε την εμπειρία σας στην απόσπαση.',
      estimatedTime: '15 λεπτά',
    },
    client: {
      label: 'Πελάτης',
      description: 'Προσλαμβάνετε εργαζόμενους γραφείου. Μοιραστείτε τις ανάγκες και προσδοκίες σας.',
      estimatedTime: '10 λεπτά',
    },
    worker: {
      label: 'Εργαζόμενος γραφείου',
      description: 'Εργάζεστε ως εργαζόμενος γραφείου. Μοιραστείτε την εμπειρία σας από το πεδίο.',
      estimatedTime: '10 λεπτά',
    },
  },
  
  // Buttons
  button: {
    previous: 'Προηγούμενο',
    next: 'Επόμενο',
    submit: 'Υποβολή απαντήσεων',
    submitting: 'Υποβολή...',
    back: 'Πίσω',
    start: 'Έναρξη',
  },
  
  // Confirmation
  confirmation: {
    title: 'Ευχαριστούμε για τη συμμετοχή σας!',
    subtitle: 'Οι απαντήσεις σας αποθηκεύτηκαν με επιτυχία',
    message: 'Αυτή τη στιγμή αναλύουμε όλες τις απαντήσεις για να δημιουργήσουμε μια λύση πλήρως προσαρμοσμένη στις ανάγκες σας.',
    cta_back: 'Επιστροφή στην αρχική σελίδα',
    cta_dashboard: 'Εμφάνιση πίνακα ελέγχου',
  },
  
  // Progress
  progress: {
    section: 'Ενότητα',
    question: 'Ερώτηση',
    section_completed: 'Ενότητα ολοκληρώθηκε',
    questions_remaining: '{count} ερωτήσεις που απομένουν',
    time_remaining: 'Περίπου {time} απομένει',
  },
  
  // Common translations
  common: {
    oui: 'Ναι',
    non: 'Όχι',
    autre: 'Άλλο',
    loading: 'Φόρτωση...',
    submit: 'Υποβολή',
    next: 'Επόμενο',
    previous: 'Προηγούμενο',
    skip: 'Παράλειψη',
    save: 'Αποθήκευση',
    cancel: 'Ακύρωση',
    close: 'Κλείσιμο',
    required: 'Υποχρεωτικό',
    optional: 'Προαιρετικό',
    error: 'Σφάλμα',
    success: 'Επιτυχία',
    completed: 'Ολοκληρώθηκε',
    inProgress: 'Σε εξέλιξη',
    notStarted: 'Δεν ξεκίνησε',
    profileAgency: 'Γραφείο απασχόλησης',
    profileClient: 'Πελάτης',
    profileWorker: 'Εργαζόμενος γραφείου',
    score_not_interested: 'Δεν ενδιαφέρομαι',
    score_very_interested: 'Πολύ ενδιαφέρομαι',
  },
  
  // Sectors
  sectors: {
    btp: 'Κατασκευές',
    industrie: 'Βιομηχανία',
    logistique: 'Εφοδιαστική',
    hotellerie: 'Φιλοξενία',
    sante: 'Υγειονομική περίθαλψη',
    agriculture: 'Γεωργία',
    tech: 'Τεχνολογία/IT',
    autres: 'Άλλο',
  },
  
  // Questions - hérite de FR puis surcharge avec traductions EL
  questions: {
    ...fr.questions,
    
    // Q1 : Nom
    q1_nom: {
      ...fr.questions.q1_nom,
      label: 'Όνομα',
      placeholder: 'Όνομα οργανισμού ή το πλήρες όνομά σας',
    },
    
    // Q2 : Année création (AGENCY)
    q2_annee: {
      ...fr.questions.q2_annee,
      label: 'Έτος ίδρυσης',
      placeholder: '2015',
    },
    
    // Q2 : Année création (CLIENT)
    q2_annee_client: {
      ...fr.questions.q2_annee_client,
      label: 'Έτος ίδρυσης της εταιρείας σας',
      placeholder: '2010',
    },
    
    // Q2 : Nationalité (WORKER)
    q2_nationalite: {
      ...fr.questions.q2_nationalite,
      label: 'Η υπηκοότητά σας',
      placeholder: 'π.χ.: πολωνική, ρουμανική...',
    },
    
    // Q3 : Taille (AGENCY/CLIENT)
    q3_taille: {
      ...fr.questions.q3_taille,
      label: 'Μέγεθος οργανισμού',
      options: {
        '1-9': '1-9 εργαζόμενοι',
        '10-49': '10-49 εργαζόμενοι',
        '50-249': '50-249 εργαζόμενοι',
        '250+': '250+ εργαζόμενοι',
      },
    },
    
    // Q3 : Expérience (WORKER)
    q3_experience: {
      ...fr.questions.q3_experience,
      label: 'Έτη εμπειρίας στην προσωρινή εργασία',
      options: {
        '<1': 'Λιγότερο από 1 έτος',
        '1-3': '1-3 έτη',
        '3-5': '3-5 έτη',
        '5-10': '5-10 έτη',
        '10+': 'Πάνω από 10 έτη',
      },
    },
    
    // Q4 : Secteurs
    q4_secteurs: {
      ...fr.questions.q4_secteurs,
      label: 'Κύριοι τομείς',
      description: 'Επιλέξτε όλους τους σχετικούς τομείς',
    },
    
    // Q4 : Métiers (WORKER)
    q4_metiers: {
      ...fr.questions.q4_metiers,
      label: 'Τα επαγγέλματά σας',
      description: 'Επιλέξτε όλα τα επαγγέλματά σας',
    },
    
    // Q5 : Pays (AGENCY)
    q5_pays: {
      ...fr.questions.q5_pays,
      label: 'Η χώρα του γραφείου σας',
      placeholder: 'π.χ.: Πολωνία',
    },
    
    // Q5 : Localisation (CLIENT)
    q5_localisation: {
      ...fr.questions.q5_localisation,
      label: 'Χώρα όπου λειτουργεί η εταιρεία σας',
      placeholder: 'π.χ.: Γαλλία',
    },
    
    // Q5 : Pays travail (WORKER)
    q5_pays_travail: {
      ...fr.questions.q5_pays_travail,
      label: 'Χώρες όπου έχετε εργαστεί ως εργαζόμενος γραφείου',
      placeholder: 'π.χ.: Γαλλία, Γερμανία, Βέλγιο...',
    },
    
    // Q6 : Volume (AGENCY)
    q6_volume: {
      label: 'Ετήσιος όγκος αποσπασμένων εργαζομένων',
      options: {
        '0': 'Κανένας ακόμα',
        '1-50': '1-50 εργαζόμενοι',
        '51-200': '51-200 εργαζόμενοι',
        '201-500': '201-500 εργαζόμενοι',
        '500+': 'Πάνω από 500',
      },
    },
    
    // Q6 : Volume client (CLIENT)
    q6_volume_client: {
      label: 'Πόσους εργαζόμενους γραφείου προσλαμβάνετε ετησίως;',
      options: {
        '0': 'Κανέναν προς το παρόν',
        '1-10': '1-10 άτομα',
        '11-50': '11-50 άτομα',
        '51-200': '51-200 άτομα',
        '200+': '200+ άτομα',
      },
    },
    
    // Q6 : Fréquence (WORKER)
    q6_frequence: {
      label: 'Πόσο συχνά εργάζεστε ως εργαζόμενος γραφείου;',
      options: {
        permanent: 'Τακτικά (όλο το χρόνο)',
        saisonnier: 'Εποχιακά (συγκεκριμένους μήνες)',
        occasionnel: 'Περιστασιακά',
        jamais: 'Ποτέ ακόμα (ψάχνω)',
      },
    },
    
    // Section 2 - Détachement/Experience
    
    // Q7 : Origine (AGENCY)
    q7_origine: {
      label: 'Από πού προέρχονται οι αποσπασμένοι εργαζόμενοί σας;',
      placeholder: 'π.χ.: Πολωνία, Ρουμανία, Βουλγαρία...',
    },
    
    // Q8 : Destinations (AGENCY)
    q8_destinations: {
      label: 'Χώρες προορισμού',
      description: 'Χώρες όπου αποσπάτε εργαζόμενους',
      placeholder: 'π.χ.: Γαλλία, Γερμανία, Βέλγιο, Ολλανδία...',
    },
    
    // Q8 : Nationalités (CLIENT)
    q8_nationalites: {
      label: 'Υπηκοότητες των εργαζομένων γραφείου που προσλαμβάνετε',
      placeholder: 'π.χ.: πολωνική, ρουμανική, βουλγαρική...',
    },
    
    // Q9 : Défi (AGENCY)
    q9_defi: {
      label: 'Η κύρια πρόκλησή σας με τη διεθνή απόσπαση',
      options: {
        admin: 'Διοικητική πολυπλοκότητα (A1, SIPSI...)',
        conformite: 'Συμμόρφωση με κανονισμούς σε πολλές χώρες',
        cout: 'Κόστος και χρόνος διαχείρισης',
        langues: 'Γλωσσικά εμπόδια',
        autre: 'Άλλο',
      },
    },
    
    // Q9 : Défi client (CLIENT)
    q9_defi_client: {
      label: 'Η κύρια πρόκλησή σας με τους ευρωπαίους εργαζόμενους γραφείου',
      options: {
        trouver: 'Εύρεση αξιόπιστων γραφείων',
        conformite: 'Νομική συμμόρφωση',
        qualite: 'Ποιότητα/δεξιότητες',
        cout: 'Υπερβολικό κόστος',
        langues: 'Επικοινωνία / Γλώσσες',
        autre: 'Άλλο',
      },
    },
    
    // Q9 : Défi worker (WORKER)
    q9_defi_worker: {
      label: 'Η κύρια πρόκλησή σας με την προσωρινή εργασία στο εξωτερικό',
      options: {
        admin: 'Διοικητική γραφειοκρατία',
        langue: 'Γλωσσικό εμπόδιο',
        logement: 'Εύρεση στέγασης',
        transport: 'Μεταφορές',
        salaire: 'Προβλήματα πληρωμής/μισθού',
        autre: 'Άλλο',
      },
    },
    
    // Q9 : Autre
    q9_autre: {
      label: 'Προσδιορίστε την κύρια πρόκλησή σας',
      placeholder: 'Περιγράψτε την κύρια πρόκλησή σας...',
    },
    
    // Q10 : Gestion (AGENCY)
    q10_gestion: {
      ...fr.questions.q10_gestion,
      label: 'Πώς διαχειρίζεστε σήμερα τις δηλώσεις απόσπασης;',
      options: {
        interne: 'Εσωτερική ομάδα',
        externe: 'Εξωτερικός πάροχος',
        mixte: 'Μικτή προσέγγιση',
        manuel: 'Χειροκίνητη διαχείριση',
        logiciel: 'Εξειδικευμένο λογισμικό',
      },
    },
    
    // Q10 : Agences (CLIENT)
    q10_agences: {
      ...fr.questions.q10_agences,
      label: 'Πόσα γραφεία απασχόλησης χρησιμοποιείτε;',
      options: {
        '0': 'Κανένα',
        '1': '1 γραφείο',
        '2-3': '2-3 γραφεία',
        '4-10': '4-10 γραφεία',
        '10+': 'Πάνω από 10',
      },
    },
    
    // Q10 : Processus (CLIENT)
    q10_processus: {
      ...fr.questions.q10_processus,
      label: 'Πώς προσλαμβάνετε εργαζόμενους γραφείου;',
      options: {
        agence_fr: 'Γαλλικά γραφεία απασχόλησης',
        agence_euro: 'Ευρωπαϊκά γραφεία απασχόλησης',
        direct: 'Άμεση πρόσληψη',
        mixte: 'Μικτό',
      },
    },
    
    // Q10 : Agence (WORKER)
    q10_agence: {
      ...fr.questions.q10_agence,
      label: 'Πώς αναζητάτε προσωρινή εργασία;',
      options: {
        agence: 'Μέσω γραφείων απασχόλησης',
        bouche: 'Σύσταση',
        internet: 'Διαδικτυακές πύλες εργασίας',
        direct: 'Άμεση αίτηση',
      },
    },
    
    // Q10ter : Agences utilisées (WORKER)
    q10_agences_worker: {
      label: 'Με πόσα γραφεία συνεργάζεστε;',
      options: {
        '1': 'Μόνο 1 γραφείο',
        '2-3': '2-3 γραφεία',
        '4-10': '4-10 γραφεία',
        '10+': 'Πάνω από 10',
      },
    },
    
    // Q11 : Incidents (AGENCY)
    q11_incidents: {
      ...fr.questions.q11_incidents,
      label: 'Έχετε αντιμετωπίσει πρόστιμα ή περιστατικά σχετικά με τη συμμόρφωση απόσπασης;',
      description: 'Η απάντησή σας παραμένει ανώνυμη',
      options: {
        jamais: 'Όχι, ποτέ',
        rarement: 'Σπάνια (1-2 φορές)',
        parfois: 'Μερικές φορές (3-5 φορές)',
        souvent: 'Συχνά (6+ φορές)',
      },
    },
    
    // Q11 : Conformité (CLIENT)
    q11_conformite: {
      label: 'Ελέγχετε τη νομική συμμόρφωση των γραφείων απασχόλησης;',
      options: {
        oui_systematique: 'Ναι, συστηματικά',
        oui_parfois: 'Ναι, μερικές φορές',
        non: 'Όχι',
        ne_sait_pas: 'Δεν ξέρω',
      },
    },
    
    // Q11 : Problèmes (WORKER)
    q11_problemes: {
      label: 'Έχετε αντιμετωπίσει προβλήματα με προσωρινή εργασία στο εξωτερικό;',
      options: {
        oui_graves: 'Ναι, σοβαρά προβλήματα',
        oui_mineurs: 'Ναι, μικρά προβλήματα',
        non: 'Όχι',
      },
    },
    
    // Q12 : Budget (AGENCY)
    q12_budget: {
      ...fr.questions.q12_budget,
      label: 'Ετήσιος προϋπολογισμός για διοικητική διαχείριση απόσπασης',
      options: {
        '0-5k': '0-5 000 € / έτος',
        '5-15k': '5 000-15 000 € / έτος',
        '15-30k': '15 000-30 000 € / έτος',
        '30k+': '30 000+ € / έτος',
        inconnu: 'Δεν ξέρω',
      },
    },
    
    // Q12 : Budget client (CLIENT)
    q12_budget_client: {
      ...fr.questions.q12_budget_client,
      label: 'Ετήσιος προϋπολογισμός για προσωρινή εργασία',
      options: {
        '0-50k': '0 - 50 000 €',
        '50-200k': '50 000 - 200 000 €',
        '200-500k': '200 000 - 500 000 €',
        '500k+': '500 000+ €',
        'inconnu': 'Δεν ξέρω',
      },
    },
    
    // Q12 : Satisfaction (CLIENT)
    q12_satisfaction: {
      label: 'Ικανοποίηση από τα τρέχοντα γραφεία απασχόλησης',
      options: {
        tres_satisfait: 'Πολύ ικανοποιημένος',
        satisfait: 'Ικανοποιημένος',
        neutre: 'Ουδέτερος',
        insatisfait: 'Δυσαρεστημένος',
      },
    },
    
    // Q12 : Salaire (WORKER)
    q12_salaire: {
      ...fr.questions.q12_salaire,
      label: 'Είστε ικανοποιημένοι με τον μισθό σας στην προσωρινή εργασία;',
      options: {
        '<1500': 'Λιγότερο από €1 500',
        '1500-2500': '€1 500 - €2 500',
        '2500-3500': '€2 500 - €3 500',
        '3500+': '€3 500+',
      },
    },
    
    // Q13 : Manque à gagner (AGENCY)
    q13_manque_gagner: {
      ...fr.questions.q13_manque_gagner,
      label: 'Ποιο ποσοστό εσόδων χάνεται λόγω διοικητικής πολυπλοκότητας;',
      options: {
        'non': 'Όχι, όχι πραγματικά',
        'faible': 'Ναι, χαμηλό (< 5% έσοδα)',
        'moyen': 'Ναι, μεσαίο (5-15% έσοδα)',
        'important': 'Ναι, σημαντικό (> 15% έσοδα)',
      },
    },
    
    // Q13 : Satisfaction (CLIENT)
    q13_satisfaction: {
      ...fr.questions.q13_satisfaction,
      label: 'Ικανοποίηση από τα τρέχοντα γραφεία σας',
      options: {
        'tres_satisfait': 'Πολύ ικανοποιημένος',
        'satisfait': 'Ικανοποιημένος',
        'neutre': 'Ουδέτερος',
        'insatisfait': 'Δυσαρεστημένος',
        'tres_insatisfait': 'Πολύ δυσαρεστημένος',
      },
    },
    
    // Q13 : Satisfaction worker (WORKER)
    q13_satisfaction_worker: {
      ...fr.questions.q13_satisfaction_worker,
      label: 'Ικανοποίηση από τα τρέχοντα γραφεία σας',
      options: {
        'tres_satisfait': 'Πολύ ικανοποιημένος',
        'satisfait': 'Ικανοποιημένος',
        'neutre': 'Ουδέτερος',
        'insatisfait': 'Δυσαρεστημένος',
        'tres_insatisfait': 'Πολύ δυσαρεστημένος',
      },
    },
    
    // Section 3 - Besoins
    
    // Q14 : Risques (AGENCY)
    q14_risques: {
      ...fr.questions.q14_risques,
      label: 'Κύριες ανησυχίες σας',
      description: 'Επιλέξτε όλα όσα ισχύουν',
      options: {
        amendes: 'Πρόστιμα και κυρώσεις',
        reputation: 'Φήμη / Εικόνα',
        penal: 'Ποινική ευθύνη',
        delais: 'Καθυστερήσεις στις αποστολές',
        clients: 'Απώλεια πελατών',
        aucun: 'Δεν υπάρχει σημαντικός κίνδυνος',
      },
    },
    
    // Q14 : Besoins (CLIENT)
    q14_besoins_client: {
      ...fr.questions.q14_besoins_client,
      label: 'Κύριες ανάγκες σας',
      description: 'Επιλέξτε όλα όσα ισχύουν',
      options: {
        fiabilite: 'Εύρεση αξιόπιστων γραφείων',
        conformite: 'Νομική συμμόρφωση',
        qualite: 'Ποιότητα/δεξιότητες',
        cout: 'Κόστη',
        disponibilite: 'Διαθεσιμότητα υποψηφίων',
        aucun: 'Καμία σημαντική ανάγκη',
      },
    },
    
    // Q14 : Attentes (WORKER)
    q14_attentes: {
      ...fr.questions.q14_attentes,
      label: 'Οι προσδοκίες σας για προσωρινή εργασία στο εξωτερικό',
      description: 'Επιλέξτε όλα όσα ισχύουν',
      options: {
        salaire: 'Καλύτερος μισθός',
        conditions: 'Καλύτερες συνθήκες εργασίας',
        stabilite: 'Σταθερότητα',
        experience: 'Διεθνής εμπειρία',
        logement: 'Βοήθεια στέγασης',
        aucun: 'Καμία ιδιαίτερη προσδοκία',
      },
    },
    
    // Q14_risques_client options
    q14_risques_client: {
      ...fr.questions.q14_risques_client,
      label: 'Κύριες ανησυχίες σας',
      description: 'Επιλέξτε όλα όσα ισχύουν',
      options: {
        conformite: 'Νομική συμμόρφωση',
        qualite: 'Ποιότητα/δεξιότητες',
        communication: 'Επικοινωνία/Γλώσσες',
        cout: 'Απρόβλεπτα κόστη',
        disponibilite: 'Διαθεσιμότητα υποψηφίων',
        aucun: 'Δεν υπάρχουν σημαντικές ανησυχίες',
      },
    },
    
    // Q14_risques_worker options
    q14_risques_worker: {
      ...fr.questions.q14_risques_worker,
      label: 'Με ποια προβλήματα συναντάστε πιο συχνά;',
      description: 'Επιλέξτε όλα όσα ισχύουν',
      options: {
        paiement: 'Καθυστερήσεις πληρωμών',
        conditions: 'Κακές συνθήκες',
        contrat: 'Μη τήρηση συμβολαίων',
        logement: 'Ανεπαρκής στέγαση',
        communication: 'Προβλήματα επικοινωνίας',
        aucun: 'Δεν υπάρχουν σημαντικά προβλήματα',
      },
    },
    
    // Q15 : Problème
    q15_probleme: {
      ...fr.questions.q15_probleme,
      label: 'Ποιο πρόβλημα θα θέλατε να λύσετε πρώτο;',
      placeholder: 'Περιγράψτε το κύριο πρόβλημά σας...',
    },
    
    // Q15 : Besoins client (CLIENT)
    q15_besoins_client: {
      ...fr.questions.q15_besoins_client,
      label: 'Ποιες είναι οι προτεραιότητές σας;',
      placeholder: 'π.χ.: γρήγορη εύρεση, καλύτερη ποιότητα, τιμές...',
    },
    
    // Q15 : Améliorations (WORKER)
    q15_ameliorations: {
      ...fr.questions.q15_ameliorations,
      label: 'Τι θα θέλατε να βελτιώσετε στις αποστολές σας;',
      placeholder: 'π.χ.: μισθός, στέγαση, υποστήριξη, σταθερότητα...',
    },
    
    // Q16 : ERP (AGENCY)
    q16_erp: {
      ...fr.questions.q16_erp,
      label: 'Χρησιμοποιείτε ERP/λογισμικό διαχείρισης;',
      options: {
        sage: 'Sage',
        sap: 'SAP',
        cegid: 'Cegid',
        bullhorn: 'Bullhorn / ATS',
        autre: 'Άλλο',
        aucun: 'Κανένα ERP',
      },
    },
    
    // Q16 : Nom ERP
    q16_nom_erp: {
      label: 'Ποιο λογισμικό/ERP;',
      placeholder: 'π.χ.: SAP, Odoo, προσαρμοσμένο...',
    },
    
    // Q16 : Critères (CLIENT)
    q16_criteres: {
      label: 'Κύρια κριτήριά σας για επιλογή γραφείων',
      description: 'Επιλέξτε τα 3 σημαντικότερα',
    },
    
    // Q16 : Amélioration (WORKER)
    q16_amelioration: {
      label: 'Τι θα βελτίωνε την εμπειρία προσωρινής εργασίας σας;',
      description: 'Επιλέξτε όλα όσα ισχύουν',
    },
    
    // Q17 : Migration (AGENCY)
    q17_migration: {
      ...fr.questions.q17_migration,
      label: 'Είστε έτοιμοι να αλλάξετε εργαλεία;',
      options: {
        oui: 'Ναι, χωρίς πρόβλημα',
        conditions: 'Ναι, υπό προϋποθέσεις',
        difficile: 'Δύσκολο, αλλά ανοιχτό',
        non: 'Όχι, δεν είναι εφικτό',
      },
    },
    
    // Q17 : Budget (CLIENT)
    q17_budget: {
      label: 'Μηνιαίο budget για πλατφόρμα πρόσληψης προσωρινής εργασίας',
      options: {
        '0': 'Δεν προτίθεμαι να πληρώσω',
        '1-100': '€1 - €100/μήνα',
        '100-500': '€100 - €500/μήνα',
        '500-1000': '€500 - €1 000/μήνα',
        '1000+': 'Πάνω από €1 000/μήνα',
      },
    },
    
    // Q17 : Plateforme (WORKER)
    q17_plateforme: {
      label: 'Θα χρησιμοποιούσατε πλατφόρμα για να βρείτε προσωρινή εργασία στο εξωτερικό;',
      options: {
        oui_certainement: 'Ναι, σίγουρα',
        oui_probablement: 'Ναι, πιθανώς',
        peut_etre: 'Ίσως',
        non: 'Όχι',
      },
    },
    
    // Section 4 - Intérêt YoJob
    
    // Q18 : Score
    q18_score: {
      ...fr.questions.q18_score,
      label: 'Πόσο σας ενδιαφέρει μια ευρωπαϊκή πλατφόρμα απόσπασης;',
      description: 'Βαθμολογήστε από 1 (καθόλου) έως 10 (πολύ)',
    },
    
    // Q19 : Features (AGENCY)
    q19_features: {
      ...fr.questions.q19_features,
      label: 'Οι πιο ενδιαφέρουσες λειτουργίες',
      description: 'Επιλέξτε τις 3 κύριες προτεραιότητές σας',
      options: {
        sipsi: 'Αυτόματη δήλωση SIPSI',
        a1: 'Διαχείριση πιστοποιητικού A1',
        conformite: 'Πίνακας συμμόρφωσης',
        alertes: 'Ειδοποιήσεις & ανανεώσεις',
        documents: 'Κεντρικοποίηση εγγράφων',
        marketplace: 'Αγορά γραφείων',
        support: 'Πολυγλωσσική εξειδικευμένη υποστήριξη',
        api: 'API ενσωμάτωση (ERP)',
      },
    },
    
    // Q19 : Features CLIENT
    q19_features_client: {
      ...fr.questions.q19_features_client,
      label: 'Οι πιο ενδιαφέρουσες λειτουργίες',
      description: 'Επιλέξτε όλες όσες σας ενδιαφέρουν',
      options: {
        recherche: 'Αναζήτηση αξιόπιστων γραφείων',
        comparaison: 'Σύγκριση τιμής/ποιότητας',
        avis: 'Επαληθευμένες κριτικές',
        conformite: 'Εγγύηση συμμόρφωσης',
        support: 'Αφιερωμένη υποστήριξη',
        facturation: 'Κεντρική τιμολόγηση',
        suivi: 'Παρακολούθηση σε πραγματικό χρόνο',
      },
    },
    
    // Q19 : Features WORKER
    q19_features_worker: {
      ...fr.questions.q19_features_worker,
      label: 'Οι πιο ενδιαφέρουσες λειτουργίες',
      description: 'Επιλέξτε όλες όσες σας ενδιαφέρουν',
      options: {
        recherche: 'Αναζήτηση εργασίας',
        avis: 'Αξιολογήσεις γραφείων',
        logement: 'Βοήθεια στέγασης',
        paiement: 'Ασφαλής πληρωμή',
        support: 'Υποστήριξη στη γλώσσα μου',
        documents: 'Βοήθεια με διοικητικά έγγραφα',
        formation: 'Προγράμματα κατάρτισης',
      },
    },
    
    // Q20 : Prix
    q20_prix: {
      ...fr.questions.q20_prix,
      label: 'Προτιμώμενο μοντέλο τιμολόγησης',
      options: {
        mensuel: 'Σταθερή μηνιαία συνδρομή',
        usage: 'Pay-as-you-go (χρήση)',
        annuel: 'Ετήσιο πλάνο (έκπτωση)',
        gratuit: 'Δωρεάν για εργαζόμενους',
      },
    },
    
    // Q21 : Budget mensuel
    q21_budget_mensuel: {
      ...fr.questions.q21_budget_mensuel,
      label: 'Μηνιαίο budget για πλήρη SaaS λύση',
      options: {
        '0-100': '€0 - €100/μήνα',
        '100-300': '€100 - €300/μήνα',
        '300-500': '€300 - €500/μήνα',
        '500-1000': '€500 - €1 000/μήνα',
        '1000+': 'Πάνω από €1 000/μήνα',
      },
    },
    
    // Q22 : MVP
    q22_mvp: {
      ...fr.questions.q22_mvp,
      label: 'Θα θέλατε να δοκιμάσετε μια πρώιμη έκδοση (MVP);',
      options: {
        oui_gratuit: 'Ναι, δωρεάν',
        oui_reduc: 'Ναι, με έκπτωση',
        peut_etre: 'Ίσως, εξαρτάται από τις λειτουργίες',
        non: 'Όχι, δεν ενδιαφέρομαι',
      },
    },
    
    // Section 5 - Vision Future
    
    // Q23 : Rôle
    q23_role: {
      label: 'Πώς βλέπετε τον ρόλο σας στην ευρωπαϊκή αγορά;',
      options: {
        decideur: 'Τελικός αποφασιστής',
        influenceur: 'Επηρεάζων / Σύσταση',
        utilisateur: 'Τελικός χρήστης',
        autre: 'Άλλο',
      },
    },
    
    // Q24 : Évolution
    q24_evolution: {
      label: 'Τα διεθνή σχέδια επέκτασής σας',
      options: {
        oui_rapide: 'Ναι, μέσα σε 6 μήνες',
        oui_lent: 'Ναι, μέσα σε 1-2 χρόνια',
        maintien: 'Διατήρηση των τωρινών χωρών',
        reduction: 'Μείωση διεθνούς εύρους',
      },
    },
    
    // Q24bis : Aspirations (WORKER)
    q24_aspirations: {
      label: 'Οι μελλοντικές επαγγελματικές φιλοδοξίες σας',
      placeholder: 'π.χ.: μόνιμη σύμβαση, επιστροφή στη χώρα, εκπαίδευση...',
    },
    
    // Q25 : Besoins
    q25_besoins: {
      label: 'Άλλες ανάγκες ή σχόλια',
      placeholder: 'Μοιραστείτε οποιαδήποτε άλλη ανατροφοδότηση ή ανάγκη...',
    },
    
    // Section 6 - Contact
    
    // Q26 : Téléphone professionnel
    q26_phone: {
      label: 'Επαγγελματικό τηλέφωνο',
      placeholder: '+30 210 1234567',
    },
    
    // Q27 : Prénom
    q27_firstname: {
      label: 'Όνομα',
      placeholder: 'Το όνομά σας',
    },
    
    // Q28 : Nom
    q28_lastname: {
      label: 'Επώνυμο',
      placeholder: 'Το επώνυμό σας',
    },
    
    // Q29 : SIRET/SIREN
    q29_siret: {
      label: 'ΑΦΜ (προαιρετικό)',
      placeholder: '123456789',
      description: 'Για εμπλουτισμό μέσω ΓΕΜΗ',
    },
    
    // Q30 : Email
    email: {
      label: 'Το email σας',
      placeholder: 'to.email@paradeigma.gr',
    },
    
    // Q31 : Autorisation contact
    autorise_contact: {
      label: 'Συμφωνώ να επικοινωνήσετε ξανά μαζί μου',
    },
    
    // Q32 : Rapport d'étude
    souhaite_rapport: {
      label: 'Θα ήθελα να λάβω την αναφορά της μελέτης',
    },
  },
};
