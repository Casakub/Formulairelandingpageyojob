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
  
  // Sections adaptées par profil
  sectionContent: {
    1: {
      agency: {
        title: '📋 Το προφίλ της εταιρείας σας',
        description: 'Πείτε μας για το γραφείο σας και την εξειδίκευσή του',
      },
      client: {
        title: '📋 Το προφίλ της εταιρείας σας',
        description: 'Πείτε μας για την εταιρεία σας και τις ανάγκες πρόσληψης',
      },
      worker: {
        title: '📋 Το προφίλ σας',
        description: 'Πείτε μας για το επαγγελματικό σας υπόβαθρο',
      },
    },
    2: {
      agency: {
        title: '💼 Δραστηριότητα απόσπασης',
        description: 'Η εμπειρία σας στην απόσπαση εργαζομένων',
      },
      client: {
        title: '💼 Η εμπειρία πρόσληψής σας',
        description: 'Η τρέχουσα πρόσληψη και προσωρινή εργασία σας',
      },
      worker: {
        title: '💼 Η εμπειρία σας στην προσωρινή εργασία',
        description: 'Η πορεία σας ως εργαζόμενος γραφείου',
      },
    },
    3: {
      agency: {
        title: '🎯 Ανάγκες και εργαλεία',
        description: 'Οι προκλήσεις και οι τρέχουσες λύσεις σας',
      },
      client: {
        title: '🎯 Οι τρέχουσες ανάγκες σας',
        description: 'Προκλήσεις και προσδοκίες στην πρόσληψη',
      },
      worker: {
        title: '🎯 Οι προσδοκίες σας',
        description: 'Τι είναι σημαντικό για εσάς σε μια αποστολή',
      },
    },
    4: {
      agency: {
        title: '⭐ Ενδιαφέρον για την ευρωπαϊκή πλατφόρμα',
        description: 'Ανακαλύψτε το καινοτόμο όραμα της αγοράς μας',
      },
      client: {
        title: '⭐ Ενδιαφέρον για την ευρωπαϊκή πλατφόρμα',
        description: 'Μια καινοτόμος λύση για τις ανάγκες σας',
      },
      worker: {
        title: '⭐ Το ενδιαφέρον σας για την πλατφόρμα',
        description: 'Πλατφόρμα για ευκολότερη αναζήτηση αποστολών',
      },
    },
    5: {
      agency: {
        title: '🔮 Μελλοντικό όραμα',
        description: 'Προϋπολογισμός και προοπτικές ανάπτυξης',
      },
      client: {
        title: '🔮 Οι μελλοντικές προτεραιότητές σας',
        description: 'Προϋπολογισμός και στρατηγική πρόσληψης',
      },
      worker: {
        title: '🔮 Οι στόχοι σας',
        description: 'Οι επερχόμενες επαγγελματικές προοπτικές σας',
      },
    },
    6: {
      agency: {
        title: '📧 Παραμείνετε σε επαφή',
        description: 'Λάβετε τα αποτελέσματα της έρευνας και μείνετε ενημερωμένοι',
      },
      client: {
        title: '📧 Παραμείνετε σε επαφή',
        description: 'Λάβετε τα αποτελέσματα και τις συστάσεις μας',
      },
      worker: {
        title: '📧 Παραμείνετε σε επαφή',
        description: 'Λάβετε τα αποτελέσματα και ευκαιρίες',
      },
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
      label: 'Πώς διαχειρίζεστε σήμερα τα αιτήματα απόσπασης;',
      options: {
        interne: 'Εσωτερική ομάδα',
        externe: 'Εξωτερικός πάροχος υπηρεσιών',
        mixte: 'Μικτή προσέγγιση',
        manuel: 'Χειροκίνητη διαχείριση',
        logiciel: 'Εξειδικευμένο λογισμικό',
        manuel: 'Χειροκίνητα (Excel, Word...)',
        logiciel_interne: 'Εσωτερικό λογισμικό',
        prestataire: 'Εξωτερικός πάροχος υπηρεσιών',
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
      label: 'Έχετε λάβει πρόστιμα ή συμβάντα σχετικά με τη συμμόρφωση απόσπασης;',
      description: 'Η απάντησή σας παραμένει ανώνυμη',
      options: {
        jamais: 'Όχι, ποτέ',
        rarement: 'Σπάνια (1-2 φορές)',
        parfois: 'Μερικές φορές (3-5 φορές)',
        souvent: 'Συχνά (6+ φορές)',
        oui_souvent: 'Ναι, συχνά',
        oui_rare: 'Ναι, περιστασιακά',
        non: 'Όχι',
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
      label: 'Έχετε προϋπολογισμό για εξωτερικές υπηρεσίες διαχείρισης απόσπασης;',
      options: {
        oui_important: 'Ναι, σημαντικός',
        oui_modere: 'Ναι, μέτριος',
        non: 'Όχι',
        ne_sait_pas: 'Δεν ξέρω',
      },
    },
    
    // Q12 : Critères (CLIENT)
    q12_criteres: {
      label: 'Ποια είναι τα κύρια κριτήριά σας για την επιλογή γραφείου απασχόλησης;',
      description: 'Επιλέξτε πολλαπλές επιλογές',
    },
    
    // Q12 : Satisfaction (WORKER)
    q12_satisfaction: {
      label: 'Πόσο ικανοποιημένοι είστε με τις τρέχουσες συνθήκες εργασίας σας;',
      options: {
        tres_satisfait: 'Πολύ ικανοποιημένος',
        satisfait: 'Ικανοποιημένος',
        neutre: 'Ουδέτερος',
        insatisfait: 'Δυσαρεστημένος',
      },
    },
    
    // Q13 : Durée (AGENCY)
    q13_duree: {
      label: 'Μέση διάρκεια των αποστολών απόσπασής σας',
      options: {
        '<1mois': 'Λιγότερο από 1 μήνα',
        '1-3mois': '1-3 μήνες',
        '3-6mois': '3-6 μήνες',
        '6-12mois': '6-12 μήνες',
        '12+mois': 'Πάνω από 12 μήνες',
      },
    },
    
    // Q13 : Budget client (CLIENT)
    q13_budget_client: {
      label: 'Ποιος είναι ο ετήσιος προϋπολογισμός σας για προσωρινή εργασία;',
      options: {
        '<50k': 'Λιγότερο από €50k',
        '50-200k': '€50k - €200k',
        '200-500k': '€200k - €500k',
        '500k-1M': '€500k - €1M',
        '1M+': 'Πάνω από €1M',
      },
    },
    
    // Q13 : Durée worker (WORKER)
    q13_duree_worker: {
      label: 'Η προτιμώμενη διάρκεια αποστολής σας',
      options: {
        court: 'Σύντομη (< 3 μήνες)',
        moyen: 'Μέτρια (3-6 μήνες)',
        long: 'Μακρά (> 6 μήνες)',
        indifferent: 'Αδιάφορος',
      },
    },
    
    // Section 3 - Besoins/Potrebe
    
    // Q14 : Intérêt marketplace (AGENCY)
    q14_interet: {
      label: 'Θα σας ενδιέφερε μια ευρωπαϊκή πλατφόρμα για την προσφορά των υπηρεσιών σας;',
      description: 'Μια αγορά για την αύξηση της ορατότητάς σας',
      options: {
        tres_interesse: 'Πολύ ενδιαφερόμενος',
        interesse: 'Ενδιαφερόμενος',
        neutre: 'Ουδέτερος',
        pas_interesse: 'Δεν ενδιαφέρομαι',
      },
    },
    
    // Q14 : Intérêt plateforme (CLIENT)
    q14_interet_client: {
      label: 'Θα σας ενδιέφερε μια πλατφόρμα για εύκολη εύρεση ευρωπαϊκών γραφείων;',
      options: {
        tres_interesse: 'Πολύ ενδιαφερόμενος',
        interesse: 'Ενδιαφερόμενος',
        neutre: 'Ουδέτερος',
        pas_interesse: 'Δεν ενδιαφέρομαι',
      },
    },
    
    // Q14 : Intérêt worker (WORKER)
    q14_interet_worker: {
      label: 'Θα σας ενδιέφερε μια πλατφόρμα για αναζήτηση αποστολών;',
      options: {
        tres_interesse: 'Πολύ ενδιαφερόμενος',
        interesse: 'Ενδιαφερόμενος',
        neutre: 'Ουδέτερος',
        pas_interesse: 'Δεν ενδιαφέρομαι',
      },
    },
    
    // Q15 : Fonctionnalités (AGENCY)
    q15_fonctionnalites: {
      label: 'Ποιες λειτουργίες θα ήταν πιο χρήσιμες;',
      description: 'Επιλέξτε πολλαπλές επιλογές',
      options: {
        marketplace: 'Αγορά υπηρεσιών',
        admin: 'Αυτοματοποιημένη διαχείριση',
        conformite: 'Έλεγχοι συμμόρφωσης',
        payment: 'Ενσωματωμένες πληρωμές',
        support: 'Πολυγλωσσική υποστήριξη',
        autre: 'Άλλο',
      },
    },
    
    // Q15 : Fonctionnalités client (CLIENT)
    q15_fonctionnalites_client: {
      label: 'Ποιες λειτουργίες θα ήταν πιο χρήσιμες;',
      description: 'Επιλέξτε πολλαπλές επιλογές',
      options: {
        comparaison: 'Σύγκριση γραφείων',
        avis: 'Επαληθευμένες κριτικές',
        suivi: 'Παρακολούθηση αποστολών',
        documentation: 'Κεντρική τεκμηρίωση',
        facturation: 'Διαχείριση τιμολογίων',
        autre: 'Άλλο',
      },
    },
    
    // Q15 : Fonctionnalités worker (WORKER)
    q15_fonctionnalites_worker: {
      label: 'Ποιες λειτουργίες θα ήταν πιο χρήσιμες;',
      description: 'Επιλέξτε πολλαπλές επιλογές',
      options: {
        recherche: 'Προηγμένη αναζήτηση αποστολών',
        alertes: 'Ειδοποιήσεις για νέες αποστολές',
        documents: 'Διαχείριση εγγράφων',
        avis: 'Αξιολογήσεις γραφείων',
        support: 'Πολυγλωσσική υποστήριξη',
        autre: 'Άλλο',
      },
    },
    
    // Q16 : Frein (AGENCY)
    q16_frein: {
      label: 'Ποιο θα ήταν το μεγαλύτερο εμπόδιό σας στη χρήση τέτοιας πλατφόρμας;',
      options: {
        cout: 'Κόστος',
        complexite: 'Πολύ περίπλοκο',
        confiance: 'Έλλειψη εμπιστοσύνης',
        changement: 'Δεν θέλω να αλλάξω',
        aucun: 'Κανένα εμπόδιο',
        autre: 'Άλλο',
      },
    },
    
    // Q16 : Frein client (CLIENT)
    q16_frein_client: {
      label: 'Ποιο θα ήταν το μεγαλύτερο εμπόδιό σας;',
      options: {
        cout: 'Κόστος',
        confiance: 'Εμπιστοσύνη σε γραφεία',
        complexite: 'Πολύ περίπλοκο',
        aucun: 'Κανένα εμπόδιο',
        autre: 'Άλλο',
      },
    },
    
    // Q16 : Frein worker (WORKER)
    q16_frein_worker: {
      label: 'Ποιο θα ήταν το μεγαλύτερο εμπόδιό σας;',
      options: {
        complexite: 'Πολύ περίπλοκο',
        confiance: 'Εμπιστοσύνη στην πλατφόρμα',
        acces: 'Πρόσβαση σε τεχνολογία',
        aucun: 'Κανένα εμπόδιο',
        autre: 'Άλλο',
      },
    },
    
    // Q17 : Prix (AGENCY)
    q17_prix: {
      label: 'Ποιο μοντέλο τιμολόγησης σας φαίνεται πιο κατάλληλο;',
      options: {
        commission: 'Προμήθεια ανά αποστολή',
        abonnement: 'Μηνιαία συνδρομή',
        freemium: 'Δωρεάν + premium λειτουργίες',
        autre: 'Άλλο',
      },
    },
    
    // Q17 : Services (CLIENT)
    q17_services: {
      label: 'Ποιες υπηρεσίες θα εκτιμούσατε περισσότερο;',
      description: 'Επιλέξτε πολλαπλές επιλογές',
    },
    
    // Q17 : Services worker (WORKER)
    q17_services_worker: {
      label: 'Ποιες υπηρεσίες θα εκτιμούσατε περισσότερο;',
      description: 'Επιλέξτε πολλαπλές επιλογές',
    },
    
    // Q18 : Recommandation (AGENCY)
    q18_recommandation: {
      label: 'Θα συστήνατε τέτοια πλατφόρμα σε συναδέλφους;',
      options: {
        certainement: 'Σίγουρα',
        probablement: 'Πιθανώς',
        peut_etre: 'Ίσως',
        probablement_pas: 'Πιθανώς όχι',
      },
    },
    
    // Q18 : Recommandation client (CLIENT)
    q18_recommandation_client: {
      label: 'Θα συστήνατε τέτοια λύση;',
      options: {
        certainement: 'Σίγουρα',
        probablement: 'Πιθανώς',
        peut_etre: 'Ίσως',
        probablement_pas: 'Πιθανώς όχι',
      },
    },
    
    // Q18 : Recommandation worker (WORKER)
    q18_recommandation_worker: {
      label: 'Θα συστήνατε τέτοια πλατφόρμα;',
      options: {
        certainement: 'Σίγουρα',
        probablement: 'Πιθανώς',
        peut_etre: 'Ίσως',
        probablement_pas: 'Πιθανώς όχι',
      },
    },
    
    // Q19 : Test (AGENCY)
    q19_test: {
      label: 'Θα θέλατε να συμμετάσχετε στη beta φάση;',
      options: {
        oui_immediat: 'Ναι, αμέσως',
        oui_plus_tard: 'Ναι, αλλά αργότερα',
        non: 'Όχι',
      },
    },
    
    // Q19 : Test client (CLIENT)
    q19_test_client: {
      label: 'Θα θέλατε να συμμετάσχετε στη δοκιμή;',
      options: {
        oui_immediat: 'Ναι, αμέσως',
        oui_plus_tard: 'Ναι, αλλά αργότερα',
        non: 'Όχι',
      },
    },
    
    // Q19 : Test worker (WORKER)
    q19_test_worker: {
      label: 'Θα θέλατε να συμμετάσχετε στη δοκιμή;',
      options: {
        oui_immediat: 'Ναι, αμέσως',
        oui_plus_tard: 'Ναι, αλλά αργότερα',
        non: 'Όχι',
      },
    },
    
    // Section 4 - Vision Future
    
    // Q20 : Croissance (AGENCY)
    q20_croissance: {
      label: 'Πώς βλέπετε τη δραστηριότητα απόσπασής σας τα επόμενα 3 χρόνια;',
      options: {
        forte_croissance: 'Ισχυρή ανάπτυξη',
        croissance: 'Μέτρια ανάπτυξη',
        stable: 'Σταθερό',
        decroissance: 'Μείωση',
      },
    },
    
    // Q20 : Évolution (CLIENT)
    q20_evolution: {
      label: 'Πώς βλέπετε την εξέλιξη των αναγκών σας για προσωρινή εργασία;',
      options: {
        hausse: 'Αύξηση',
        stable: 'Σταθερό',
        baisse: 'Μείωση',
      },
    },
    
    // Q20 : Projets (WORKER)
    q20_projets: {
      label: 'Ποια είναι τα σχέδιά σας τους επόμενους μήνες;',
      options: {
        meme_secteur: 'Συνέχεια στον ίδιο τομέα',
        changer_secteur: 'Αλλαγή τομέα',
        se_former: 'Εκπαίδευση',
        entrepreneur: 'Γίνω επιχειρηματίας',
      },
    },
    
    // Q21 : Budget évolution (AGENCY)
    q21_budget_evolution: {
      label: 'Σχεδιάζετε να αυξήσετε τον προϋπολογισμό σας για εξωτερικές υπηρεσίες;',
      options: {
        oui_beaucoup: 'Ναι, σημαντικά',
        oui_peu: 'Ναι, λίγο',
        non: 'Όχι',
        ne_sait_pas: 'Δεν ξέρω',
      },
    },
    
    // Q21 : Budget évolution client (CLIENT)
    q21_budget_evolution_client: {
      label: 'Σχεδιάζετε να αυξήσετε τον προϋπολογισμό πρόσληψης σας;',
      options: {
        oui_beaucoup: 'Ναι, σημαντικά',
        oui_peu: 'Ναι, λίγο',
        non: 'Όχι',
      },
    },
    
    // Q21 : Mobilité (WORKER)
    q21_mobilite: {
      label: 'Είστε πρόθυμοι να μετακινηθείτε για δουλειά;',
      options: {
        oui_europe: 'Ναι, οπουδήποτε στην Ευρώπη',
        oui_proche: 'Ναι, σε γειτονικές χώρες',
        non: 'Όχι, μόνο στη χώρα μου',
      },
    },
    
    // Section 5 - Contact
    
    // Q22 : Email
    q22_email: {
      label: 'Email (προαιρετικό)',
      placeholder: 'to@email.gr',
      description: 'Για να λάβετε τα αποτελέσματα και πληροφορίες για το έργο',
    },
    
    // Q22 : Email AGENCY
    q22_email_agency: {
      label: 'Επαγγελματικό email (προαιρετικό)',
      placeholder: 'contact@youroffice.gr',
      description: 'Για να λάβετε τα αποτελέσματα και αποκλειστική πρόσβαση στην πλατφόρμα',
    },
    
    // Q22 : Email CLIENT
    q22_email_client: {
      label: 'Επαγγελματικό email (προαιρετικό)',
      placeholder: 'contact@your-company.gr',
      description: 'Για να λάβετε συστάσεις προσαρμοσμένες στις ανάγκες σας',
    },
    
    // Q22 : Email WORKER
    q22_email_worker: {
      label: 'Email (προαιρετικό)',
      placeholder: 'to@email.gr',
      description: 'Για να λάβετε ευκαιρίες που ταιριάζουν στο προφίλ σας',
    },
    
    // Q23 : Téléphone (optionnel)
    q23_telephone: {
      label: 'Τηλέφωνο (προαιρετικό)',
      placeholder: '+30 210 1234567',
    },
    
    // Q24 : Commentaires
    q24_commentaires: {
      label: 'Πρόσθετα σχόλια ή προτάσεις',
      placeholder: 'Μοιραστείτε τις ιδέες, προσδοκίες ή ειδικές ανάγκες σας...',
    },
    
    // Q24 : Vision du marché dans les 3 prochaines années (ALL)
    q24_evolution: {
      label: 'Όραμα της αγοράς τα επόμενα 3 χρόνια',
      placeholder: 'Μοιραστείτε το όραμά σας...',
    },
    
    // Q25 : Autres besoins ou suggestions (ALL)
    q25_besoins: {
      label: 'Άλλες ανάγκες ή προτάσεις',
      placeholder: 'Οι προτάσεις σας μας ενδιαφέρουν...',
    },
    
    // SECTION 6 : CONTACT
    
    // Q26 : Téléphone professionnel (AGENCY & CLIENT)
    q26_phone: {
      label: 'Επαγγελματικό τηλέφωνο',
      placeholder: '+30 210 1234567',
    },
    
    // Q27 : Prénom (ALL)
    q27_firstname: {
      label: 'Όνομα',
      placeholder: 'Το όνομά σας',
    },
    
    // Q28 : Nom (ALL)
    q28_lastname: {
      label: 'Επώνυμο',
      placeholder: 'Το επώνυμό σας',
    },
    
    // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
    q29_siret: {
      label: 'ΑΦΜ (προαιρετικό)',
      placeholder: '123456789',
      description: 'Για εμπλουτισμό μέσω ΓΕΜΗ',
    },
    
    // Q30 : Email professionnel (ALL)
    email: {
      label: 'Email',
      placeholder: 'to.email@paradeigma.gr',
    },
    
    // Q31 : Autorisation contact (ALL)
    autorise_contact: {
      label: 'Αποδέχομαι να επικοινωνήσετε ξανά μαζί μου',
    },
    
    // Q32 : Rapport d'étude (ALL)
    souhaite_rapport: {
      label: 'Θα ήθελα να λάβω την αναφορά της μελέτης',
    },
    
    // Questions additionnelles spécifiques
    
    // Critères de sélection (CLIENT)
    critere_prix: {
      label: 'Τιμή',
    },
    critere_qualite: {
      label: 'Ποιότητα προφίλ',
    },
    critere_rapidite: {
      label: 'Ταχύτητα απόκρισης',
    },
    critere_conformite: {
      label: 'Νομική συμμόρφωση',
    },
    critere_flexibilite: {
      label: 'Ευελιξία',
    },
    
    // Services valorisés (CLIENT)
    service_accompagnement: {
      label: 'Προσωπική υποστήριξη',
    },
    service_garantie: {
      label: 'Εγγύηση αντικατάστασης',
    },
    service_formation: {
      label: 'Προηγούμενη εκπαίδευση',
    },
    service_gestion: {
      label: 'Διοικητική διαχείριση',
    },
    
    // Services worker
    service_formation_worker: {
      label: 'Εκπαιδεύσεις και πιστοποιητικά',
    },
    service_logement: {
      label: 'Βοήθεια για στέγαση',
    },
    service_transport: {
      label: 'Υποστήριξη μεταφορών',
    },
    service_administratif: {
      label: 'Διοικητική υποστήριξη',
    },
  },
};