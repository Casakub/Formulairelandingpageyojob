/**
 * 🇬🇷 ΕΛΛΗΝΙΚΗ ΜΕΤΑΦΡΑΣΗ - ΦΟΡΜΑ ΑΙΤΗΜΑΤΟΣ ΠΡΟΣΦΟΡΑΣ
 * 
 * Πλήρης ελληνική μετάφραση για τη φόρμα αιτήματος προσφοράς
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const el: DevisTranslations = {
  // === ΓΕΝΙΚΑ ===
  common: {
    next: "Επόμενο",
    previous: "Προηγούμενο",
    submit: "Αποστολή",
    required: "*",
    optional: "(προαιρετικό)",
    loading: "Φόρτωση...",
    error: "Σφάλμα",
    success: "Επιτυχία",
    cancel: "Ακύρωση",
    save: "Αποθήκευση",
    edit: "Επεξεργασία",
    delete: "Διαγραφή",
    confirm: "Επιβεβαίωση",
    euro: "€",
    perHour: "/ώρα",
    perMonth: "/μήνα",
    perDay: "/ημέρα",
    persons: "άτομα",
    hours: "ώρες",
    days: "ημέρες",
    months: "μήνες",
    year: "έτος",
  },

  // === ΠΛΟΗΓΗΣΗ ===
  navigation: {
    back: "Πίσω",
    stepOf: "Βήμα {step} από {total}",
    steps: {
      entreprise: {
        title: "Επιχείρηση",
        badge: "🏢 Η επιχείρησή σας",
      },
      contact: {
        title: "Επικοινωνία",
        badge: "👤 Το άτομο επικοινωνίας σας",
      },
      besoins: {
        title: "Ανάγκες",
        badge: "💼 Οι ανάγκες σας",
      },
      conditions: {
        title: "Όροι",
        badge: "📋 Όροι",
      },
      candidats: {
        title: "Υποψήφιοι",
        badge: "👷 Ζητούμενο προφίλ",
      },
      recapitulatif: {
        title: "Περίληψη",
        badge: "✅ Περίληψη",
      },
    },
  },

  // === ΕΠΙΚΥΡΩΣΗ ===
  validation: {
    fillRequired: "Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία",
    selectRegion: "Παρακαλώ επιλέξτε περιφέρεια",
    addAtLeastOnePosition: "Παρακαλώ προσθέστε τουλάχιστον μία θέση",
    invalidEmail: "Παρακαλώ εισάγετε έγκυρη διεύθυνση email",
    invalidPhone: "Παρακαλώ εισάγετε έγκυρο αριθμό τηλεφώνου",
    invalidSIRET: "Παρακαλώ εισάγετε έγκυρο αριθμό SIRET (14 ψηφία)",
    dateRequired: "Παρακαλώ εισάγετε ημερομηνία έναρξης",
    missionLocationRequired: "Παρακαλώ εισάγετε τόπο αποστολής",
  },

  // === ΜΗΝΥΜΑΤΑ ===
  messages: {
    success: {
      quoteSent: "Το αίτημα προσφοράς στάλθηκε επιτυχώς!",
      redirecting: "Ανακατεύθυνση...",
    },
    error: {
      submitError: "Σφάλμα κατά την αποστολή του αιτήματος προσφοράς",
      genericError: "Προέκυψε σφάλμα",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Αίτημα Προσφοράς | YOJOB",
    pageDescription: "Ζητήστε προσφορά για τις ευρωπαϊκές ανάγκες προσωρινής απασχόλησής σας.",
  },

  // === ΒΗΜΑ 1: ΕΠΙΧΕΙΡΗΣΗ ===
  step1: {
    title: "Πληροφορίες επιχείρησης",
    subtitle: "Εισάγετε τα νομικά στοιχεία της επιχείρησης του πελάτη σας.",
    fields: {
      pays: {
        label: "Χώρα",
        placeholder: "Επιλέξτε χώρα",
      },
      raisonSociale: {
        label: "Εταιρική επωνυμία",
        placeholder: "Π.χ.: YOJOB ΕΠΕ",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 ψηφία",
        helper: "Κωδικός αναγνώρισης της εγκατάστασής σας",
      },
      codeAPE: {
        label: "Κωδικός APE/NAF",
        placeholder: "Π.χ.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Ενδοκοινοτικός ΦΠΑ",
        placeholder: "Π.χ.: EL123456789",
      },
      adresse: {
        label: "Πλήρης διεύθυνση",
        placeholder: "Αριθμός και όνομα οδού",
      },
      codePostal: {
        label: "Ταχυδρομικός κώδικας",
        placeholder: "Π.χ.: 105 57",
      },
      ville: {
        label: "Πόλη",
        placeholder: "Π.χ.: Αθήνα",
      },
      region: {
        label: "Περιφέρεια/Νομός",
        placeholder: "Επιλέξτε περιφέρεια",
        placeholderOtherCountry: "Π.χ.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Ιστότοπος",
        placeholder: "https://www.paradeigma.gr",
      },
    },
    infoMessage: "✓ Αυτά τα στοιχεία θα χρησιμοποιηθούν για την προετοιμασία της εξατομικευμένης προσφοράς σας",
  },

  // === ΒΗΜΑ 2: ΕΠΙΚΟΙΝΩΝΙΑ ===
  step2: {
    title: "Άτομο επικοινωνίας",
    subtitle: "Ποιος θα είναι το κύριο άτομο επικοινωνίας για αυτό το έργο;",
    fields: {
      civilite: {
        label: "Προσφώνηση",
        options: {
          m: "Κύριος",
          mme: "Κυρία",
        },
      },
      nom: {
        label: "Επώνυμο",
        placeholder: "Π.χ.: Παπαδόπουλος",
      },
      prenom: {
        label: "Όνομα",
        placeholder: "Π.χ.: Γιώργος",
      },
      fonction: {
        label: "Θέση",
        placeholder: "Π.χ.: Διευθυντής Ανθρώπινου Δυναμικού",
      },
      email: {
        label: "Επαγγελματικό email",
        placeholder: "giorgos.papadopoulos@etaireia.gr",
      },
      telephone: {
        label: "Τηλέφωνο",
        placeholder: "+30 210 123 4567",
      },
    },
  },

  // === ΒΗΜΑ 3: ΑΝΑΓΚΕΣ ===
  step3: {
    title: "Οι ανάγκες απασχόλησής σας",
    subtitle: "Περιγράψτε τα προφίλ που αναζητάτε και τους όρους τους.",
    profileLabel: "Προφίλ",
    addProfile: "Προσθήκη επιπλέον προφίλ",
    removeProfile: "Αφαίρεση αυτού του προφίλ",
    loadingConfig: "Φόρτωση διαμόρφωσης...",
    missingRegionWarning: "⚠️ Παρακαλώ επιλέξτε την περιφέρειά σας στο βήμα 1 για αυτόματη εμφάνιση μισθών.",
    fields: {
      secteur: {
        label: "Τομέας δραστηριότητας",
        placeholder: "Επιλέξτε τομέα δραστηριότητας",
      },
      convention: {
        label: "Συλλογική σύμβαση",
        placeholder: "Αυτόματα ανάλογα με τον τομέα",
      },
      poste: {
        label: "Ζητούμενη θέση",
        placeholder: "Επιλέξτε θέση",
      },
      classification: {
        label: "Ταξινόμηση / Προσόν",
        placeholder: "Επιλέξτε ταξινόμηση",
      },
      quantite: {
        label: "Αριθμός ατόμων",
        placeholder: "Π.χ.: 5",
        helper: "Πόσα άτομα χρειάζονται για αυτή τη θέση;",
      },
      salaireBrut: {
        label: "Μικτός μηνιαίος μισθός",
        placeholder: "Π.χ.: 2500",
        helper: "Μικτός μισθός βάσει 151,67 ώρες/μήνα",
      },
      nationalite: {
        label: "Υπηκοότητα εργαζομένων",
        placeholder: "Επιλέξτε χώρα",
        helper: "Η υπηκοότητα επηρεάζει τον συντελεστή τιμολόγησης του πρακτορείου",
      },
    },
    ajouterPoste: "Προσθήκη νέας θέσης",
    supprimerPoste: "Αφαίρεση αυτής της θέσης",
    posteNumero: "Θέση",
    coefficientInfo: {
      title: "💡 Εφαρμοζόμενος συντελεστής πρακτορείου",
      base: "Βασικός συντ.",
      facteurPays: "Παράγοντας χώρας",
      final: "Τελικός συντελεστής",
    },
    summary: {
      title: "Αποδοχές εργαζομένου",
      salaireBrutMensuel: "Μικτός μηνιαίος μισθός",
      tauxHoraireBrut: "Μικτή ωριαία αμοιβή",
      baseMensuelle: "(Βάση 151,67 ώρες/μήνα σύμφωνα με τη συλλογική σύμβαση)",
    },
  },

  // === ΒΗΜΑ 4: ΟΡΟΙ ===
  step4: {
    title: "Όροι εργασίας",
    subtitle: "Προσδιορίστε τους όρους απασχόλησης και τις προσφερόμενες παροχές.",
    dateError: "Η ημερομηνία λήξης πρέπει να είναι μετά την ημερομηνία έναρξης",
    fields: {
      dateDebut: {
        label: "Απαιτούμενη ημερομηνία έναρξης",
        placeholder: "ΗΗ/ΜΜ/ΕΕΕΕ",
      },
      dateFin: {
        label: "Προβλεπόμενη ημερομηνία λήξης",
        placeholder: "ΗΗ/ΜΜ/ΕΕΕΕ",
        helper: "Αφήστε κενό για αόριστο χρόνο",
      },
      baseHoraire: {
        label: "Μηνιαία βάση ωρών",
        placeholder: "Π.χ.: 151,67",
        helper: "Νομική βάση στη Γαλλία: 151,67 ώρες/μήνα (35 ώρες/εβδομάδα)",
      },
      lieuxMission: {
        label: "Τοποθεσίες αποστολής",
        placeholder: "Π.χ.: Κέντρο Αθηνών, ζώνη 3 Θεσσαλονίκης, Πάτρα...",
      },
      periodeEssai: {
        label: "Περίοδος δοκιμής",
        placeholder: "Επιλέξτε διάρκεια",
        options: {
          '2': '2 ημέρες',
          '3': '3 ημέρες',
          '5': '5 ημέρες',
          '15': '15 ημέρες',
        },
      },
      motifRecours: {
        label: "Λόγος προσωρινής απασχόλησης",
        placeholder: "Επιλέξτε λόγο",
        options: {
          accroissement: "Προσωρινή αύξηση δραστηριότητας",
          remplacement: "Αντικατάσταση απόντος εργαζομένου",
          saisonnier: "Εποχιακή εργασία",
          exportation: "Έκτακτη παραγγελία εξαγωγής",
          autre: "Άλλο (προσδιορίστε)",
        },
      },
      delaiPaiement: {
        label: "Απαιτούμενη προθεσμία πληρωμής",
        placeholder: "Επιλέξτε προθεσμία",
        options: {
          reception: "Πληρωμή με την παραλαβή",
          j30: "30 ημέρες",
          j45: "45 ημέρες",
          j60: "60 ημέρες",
        },
      },
    },
    hebergement: {
      title: "Διαμονή",
      chargeEU: {
        label: "Η διαμονή εξασφαλίζεται από την επιχείρηση-πελάτη",
        helper: "Εάν ΟΧΙ: το πρακτορείο θα εφαρμόσει επιπλέον χρέωση +3,50 €/ώρα",
      },
      supplementWarning: "⚠️ Θα εφαρμοστεί επιπλέον χρέωση +3,50 €/ώρα, καθώς η διαμονή δεν εξασφαλίζεται",
      commentaire: {
        label: "Λεπτομέρειες διαμονής",
        placeholder: "Τύπος διαμονής, διεύθυνση, ειδικοί όροι...",
      },
    },
    transport: {
      title: "Τοπική μεταφορά",
      chargeETT: {
        label: "Η τοπική μεταφορά εξασφαλίζεται από το πρακτορείο",
        helper: "Εάν ΝΑΙ: θα εφαρμοστεί επιπλέον χρέωση +1,50 €/ώρα",
      },
      supplementInfo: "✓ Θα εφαρμοστεί επιπλέον χρέωση +1,50 €/ώρα για την κάλυψη εξόδων τοπικής μεταφοράς",
    },
    repas: {
      title: "Γεύματα",
      options: {
        restaurant: "Εταιρική καντίνα / Επιταγές γευμάτων",
        panier: "Ημερήσιο επίδομα τροφής (χρεώνεται καθημερινά)",
        nonConcerne: "Δεν αφορά",
      },
      montantInfo: "📋 Ποσό ημερήσιου επιδόματος: {montant} / εργάσιμη ημέρα (χρεώνεται ξεχωριστά)",
      montantNonDefini: "⚠️ Το ποσό δεν έχει οριστεί για αυτή τη χώρα/περιφέρεια",
    },
    sections: {
      hebergement: {
        title: "Διαμονή",
        chargeEU: {
          label: "Η διαμονή εξασφαλίζεται από την επιχείρηση-πελάτη",
          helper: "Εάν ΟΧΙ: το πρακτορείο θα εφαρμόσει επιπλέον χρέωση +3,50 €/ώρα",
          options: {
            oui: "Ναι, εξασφαλίζεται από τον πελάτη",
            non: "Όχι, πληρώνει ο εργαζόμενος",
          },
        },
        detailsEU: {
          type: {
            label: "Τύπος διαμονής",
            options: {
              hotel: "Ξενοδοχείο",
              appartement: "Διαμέρισμα",
              foyer: "Εργατικό οικοτροφείο",
              autre: "Άλλο",
            },
          },
          adresse: {
            label: "Διεύθυνση διαμονής",
            placeholder: "Πλήρης διεύθυνση διαμονής",
          },
        },
      },
      transportInternational: {
        title: "Διεθνής μεταφορά (χώρα προέλευσης ↔ Γαλλία)",
        chargeEU: {
          label: "Η μεταφορά εξασφαλίζεται από την επιχείρηση-πελάτη",
          helper: "Ταξίδια μεταξύ χώρας προέλευσης και τοποθεσίας αποστολής",
          options: {
            oui: "Ναι, εξασφαλίζεται από τον πελάτη",
            non: "Όχι, πληρώνει ο εργαζόμενος",
          },
        },
        detailsEU: {
          type: {
            label: "Τύπος μεταφοράς",
            options: {
              avion: "Αεροπλάνο",
              train: "Τρένο",
              bus: "Λεωφορείο",
              covoiturage: "Οργανωμένη κοινή μεταφορά",
            },
          },
          frequence: {
            label: "Συχνότητα ταξιδιών",
            options: {
              allerRetour: "Μόνο αρχική άφιξη και αναχώρηση",
              hebdomadaire: "Εβδομαδιαία",
              mensuel: "Μηνιαία",
            },
          },
        },
      },
      transportLocal: {
        title: "Τοπική μεταφορά",
        chargeETT: {
          label: "Η τοπική μεταφορά εξασφαλίζεται από το πρακτορείο",
          helper: "Εάν ΝΑΙ: θα εφαρμοστεί επιπλέον χρέωση +1,50 €/ώρα",
          options: {
            oui: "Ναι, εξασφαλίζεται από το πρακτορείο",
            non: "Όχι, πληρώνει ο εργαζόμενος",
          },
        },
        detailsETT: {
          type: {
            label: "Τύπος μεταφοράς",
            options: {
              vehicule: "Υπηρεσιακό όχημα",
              transport: "Δημόσιες συγκοινωνίες",
              velo: "Ποδήλατο",
            },
          },
        },
      },
      repas: {
        title: "Γεύματα",
        type: {
          label: "Τύπος γευμάτων",
          options: {
            restaurant: "Εταιρική καντίνα / Επιταγές γευμάτων",
            panier: "Ημερήσιο επίδομα τροφής (χρεώνεται καθημερινά)",
            nonConcerne: "Δεν αφορά",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Ημερήσιος προϋπολογισμός",
            placeholder: "Ποσό €",
          },
        },
        detailsPanier: {
          info: "Το ημερήσιο επίδομα τροφής θα χρεωθεί ξεχωριστά για κάθε εργάσιμη ημέρα",
        },
      },
    },
  },

  // === ΒΗΜΑ 5: ΥΠΟΨΗΦΙΟΙ ===
  step5: {
    title: "Προφίλ υποψηφίων",
    subtitle: "Ορίστε τις δεξιότητες και τις συγκεκριμένες απαιτήσεις.",
    sections: {
      experience: {
        title: "Επαγγελματική εμπειρία",
        obligatoire: {
          label: "Υποχρεωτική εμπειρία",
        },
        annees: {
          label: "Ελάχιστος αριθμός ετών εμπειρίας",
          placeholder: "Π.χ.: 3",
          options: {
            '0-1': "Αρχάριος (0-1 έτος)",
            '1-3': "Μεσαίος (1-3 έτη)",
            '3-5': "Επιβεβαιωμένος (3-5 έτη)",
            '5+': "Ειδικός (5 έτη και άνω)",
          },
        },
        competences: {
          label: "Απαιτούμενες τεχνικές δεξιότητες",
          placeholder: "Π.χ.: Τοιχοποιία, καλουπώματα, ανάγνωση σχεδίων, συγκόλληση TIG...",
        },
      },
      formation: {
        title: "Εκπαίδευση",
        obligatoire: {
          label: "Υποχρεωτική εκπαίδευση",
        },
        type: {
          label: "Τύπος εκπαίδευσης",
          placeholder: "Π.χ.: Διπλωματούχος τοιχοποιός, CACES R489...",
        },
      },
      travailRisque: {
        title: "Επικίνδυνη εργασία",
        active: {
          label: "Συγκεκριμένη επικίνδυνη εργασία",
        },
        precisions: {
          label: "Διευκρινίσεις κινδύνων",
          placeholder: "Π.χ.: Εργασία σε ύψος, χειρισμός βαρέων φορτίων...",
        },
      },
      langues: {
        title: "Γλωσσικές δεξιότητες",
        francais: {
          label: "Απαιτούμενο επίπεδο γαλλικών",
          placeholder: "Επιλέξτε επίπεδο",
          options: {
            a1: "A1 - Αρχάριος",
            a2: "A2 - Βασικός",
            b1: "B1 - Μεσαίος",
            b2: "B2 - Ανώτερος μεσαίος",
            c1: "C1 - Προχωρημένος",
            c2: "C2 - Μητρική γλώσσα",
            natif: "Μητρική γλώσσα",
          },
        },
        autres: {
          label: "Άλλες χρήσιμες γλώσσες",
          placeholder: "Π.χ.: Αγγλικά (B1), Γερμανικά (A2)...",
        },
        languageNames: {
          francais: "Γαλλικά",
          anglais: "Αγγλικά",
          portugais: "Πορτογαλικά",
          espagnol: "Ισπανικά",
          italien: "Ιταλικά",
          autre: "Άλλη",
        },
        levels: {
          'non-requis': "Δεν απαιτείται",
          'A1': "A1 - Αρχάριος",
          'A2': "A2 - Βασικός",
          'B1': "B1 - Μεσαίος",
          'B2': "B2 - Ανώτερος μεσαίος",
          'C1': "C1 - Αυτόνομος",
          'C2': "C2 - Μητρική γλώσσα",
        },
      },
      permis: {
        title: "Άδεια οδήγησης",
        requis: {
          label: "Απαιτούμενη άδεια οδήγησης",
          options: {
            aucun: "Δεν απαιτείται άδεια οδήγησης",
            b: "Άδεια οδήγησης κατ. B (επιβατικό)",
            c: "Άδεια οδήγησης κατ. C (φορτηγό)",
            ce: "Άδεια οδήγησης κατ. CE (φορτηγό + ρυμουλκούμενο)",
            d: "Άδεια οδήγησης κατ. D (μεταφορά επιβατών)",
          },
        },
        categorie: {
          label: "Κατηγορία άδειας οδήγησης",
          placeholder: "Π.χ.: B, C, CE...",
        },
      },
      outillage: {
        title: "Χειροκίνητα εργαλεία",
        requis: {
          label: "Απαιτούνται δικά του εργαλεία",
        },
        type: {
          label: "Τύπος εργαλείου",
          placeholder: "Π.χ.: Σφυρί, αλφάδι, μέτρο, τροχός...",
        },
      },
      epi: {
        title: "Μέσα ατομικής προστασίας (ΜΑΠ)",
        infoLegale: "ℹ️ Σύμφωνα με τους κανονισμούς, ο εργοδότης πρέπει να εξασφαλίζει ΜΑΠ προσαρμοσμένα στους κινδύνους της θέσης.",
        selectionCount: "✓ {count} επιλεγμένα ΜΑΠ",
        fournis: {
          label: "Τα ΜΑΠ εξασφαλίζονται από την επιχείρηση",
          helper: "Κράνος, παπούτσια ασφαλείας, γάντια κ.λπ.",
          options: {
            oui: "Ναι, εξασφαλίζονται από τον πελάτη",
            non: "Όχι, πληρώνει ο εργαζόμενος",
          },
        },
        liste: {
          label: "Λίστα απαιτούμενων ΜΑΠ",
          placeholder: "Π.χ.: Κράνος, παπούτσια S3, γάντια κοπής, ζώνη ασφαλείας...",
        },
        items: {
          casque: "Προστατευτικό κράνος",
          lunettes: "Προστατευτικά γυαλιά",
          protections_auditives: "Προστασία ακοής",
          gants: "Προστατευτικά γάντια",
          chaussures: "Παπούτσια ασφαλείας",
          harnais: "Ζώνη ασφαλείας",
          vetements: "Ρούχα εργασίας",
          masque: "Αναπνευστήρας",
          protection_faciale: "Προστασία προσώπου",
          vetements_visibilite: "Ρούχα υψηλής ορατότητας",
        },
      },
      autresExigences: {
        title: "Άλλες απαιτήσεις",
        label: "Άλλες συγκεκριμένες απαιτήσεις",
        placeholder: "Π.χ.: Άδειες ηλεκτρολόγου, CACES, διαθεσιμότητα σαββατοκύριακα, εργασία σε ύψος...",
      },
    },
  },

  // === ΠΕΡΙΛΗΨΗ ===
  recapitulatif: {
    title: "Περίληψη του αιτήματός σας",
    subtitle: "Ελέγξτε τα στοιχεία πριν στείλετε το αίτημα προσφοράς.",
    acceptConditionsError: "Παρακαλώ αποδεχτείτε τους όρους πριν συνεχίσετε",
    entreprise: {
      title: "Επιχείρηση",
      raisonSociale: "Εταιρική επωνυμία",
      siret: "SIRET",
      pays: "Χώρα",
      ville: "Πόλη",
      region: "Περιφέρεια/Νομός",
    },
    contact: {
      title: "Επικοινωνία",
      nomPrenom: "Ονοματεπώνυμο",
      email: "Email",
      telephone: "Τηλέφωνο",
      fonction: "Θέση",
    },
    postes: {
      title: "Απαιτούμενες θέσεις",
      coeffETT: "📊 Εφαρμοζόμενος συντελεστής πρακτορείου",
      coeffBase: "Βασικός συντ.",
      facteurPays: "Παράγοντας χώρας",
      supplementsHoraires: "✨ Ωριαία επιδόματα (συμπεριλαμβάνονται στην τιμολόγηση)",
      hebergement: "✓ Διαμονή",
      transport: "✓ Τοπική μεταφορά",
      panierRepas: "🍽️ Ημερήσιο επίδομα τροφής (χρεώνεται καθημερινά)",
      baseHoraire: "📅 Βάση ωρών: {heures} ώρες/μήνα (καθορισμένες υπερωρίες)",
      heuresNormales: "Κανονικές ώρες (0-35 ώρες/εβδομάδα)",
      heuresSup25: "Υπερωρίες +25% (36η-43η ώρα)",
      heuresSup50: "Υπερωρίες +50% (44η+ ώρα)",
      sousTotal: "Ενδιάμεσο σύνολο εργασίας (ανά άτομο)",
      tauxHoraireBrut: "Μικτή ωριαία αμοιβή",
      tauxETTFinal: "Τελική τιμολόγηση πρακτορείου",
      coutMensuel: "Συνολικό μηνιαίο κόστος",
    },
    conditions: {
      title: "Όροι αποστολής",
      dateDebut: "Ημερομηνία έναρξης",
      dateFin: "Ημερομηνία λήξης",
      dureeEstimee: "Εκτιμώμενη διάρκεια",
      lieuMission: "Τοποθεσία αποστολής",
      mois: "μήνες",
    },
    majorations: {
      title: "Τιμολογιακές προσαρμογές αποστολής",
      total: "Σύνολο προσαρμογών",
      notSet: "Δεν έχουν οριστεί προσαρμογές",
    },
    totaux: {
      mensuelHT: "Σύνολο μηνιαίως χωρίς ΦΠΑ",
      mensuelTTC: "Σύνολο μηνιαίως με ΦΠΑ",
      totalMission: "Συνολικό κόστος αποστολής",
    },
    noteLegale: "ℹ️ Αυτή η εκτίμηση είναι ενδεικτική. Η τελική τιμολόγηση θα επιβεβαιωθεί μετά την έγκριση της ομάδας μας και του επιλεγμένου συνεργαζόμενου πρακτορείου.",
    acceptConditions: {
      text: "Συμφωνώ ότι τα δεδομένά μου θα υποβληθούν σε επεξεργασία σύμφωνα με την",
      lien: "πολιτική απορρήτου",
    },
    boutonEnvoi: {
      texte: "Αποστολή του αιτήματος προσφοράς μου",
      enCours: "Αποστολή...",
    },
    footer: "✓ Απάντηση εντός 24 ωρών • ✓ Χωρίς δέσμευση",
  },

  // === ΣΦΑΛΜΑΤΑ ===
  errors: {
    required: "Αυτό το πεδίο είναι υποχρεωτικό",
    invalidEmail: "Μη έγκυρη διεύθυνση email",
    invalidSIRET: "Μη έγκυρο SIRET (απαιτούνται 14 ψηφία)",
    invalidPhone: "Μη έγκυρος αριθμός τηλεφώνου",
    minValue: "Η τιμή πρέπει να είναι μεγαλύτερη ή ίση με {min}",
    maxValue: "Η τιμή πρέπει να είναι μικρότερη ή ίση με {max}",
    genericError: "Προέκυψε σφάλμα. Παρακαλώ δοκιμάστε ξανά.",
    loadingError: "Σφάλμα κατά τη φόρτωση δεδομένων",
    submitError: "Σφάλμα κατά την αποστολή του αιτήματος",
  },

  // === ΤΟΜΕΙΣ ΔΡΑΣΤΗΡΙΟΤΗΤΑΣ & ΕΠΑΓΓΕΛΜΑΤΑ ===
  secteurs: {
    batiment: {
      label: "Οικοδομές",
      convention: "Εθνική συλλογική σύμβαση οικοδόμοι (3193)",
      postes: {
        macon: "Τοιχοποιός",
        coffreur: "Ξυλουργός καλουπιών",
        ferrailleur: "Σιδηρουργός",
        carreleur: "Πλακάς",
        platrier: "Σοβατζής",
        peintre: "Βαφέας",
        plombier: "Υδραυλικός",
        electricien: "Ηλεκτρολόγος",
        couvreur: "Κεραμοποιός",
        menuisier: "Ξυλουργός",
        chef_equipe_batiment: "Επικεφαλής ομάδας",
        chef_chantier: "Επικεφαλής εργοταξίου",
      },
      classifications: {
        n1p1: "N1P1",
        n1p2: "N1P2",
        n2p1: "N2P1",
        n2p2: "N2P2",
        n3p1: "N3P1",
        n3p2: "N3P2",
        n4p1: "N4P1",
        n4p2: "N4P2",
      },
    },
    metallurgie: {
      label: "Μεταλλουργία",
      convention: "Συλλογική σύμβαση μεταλλουργία (3109)",
      postes: {
        soudeur: "Συγκολλητής",
        chaudronnier: "Λεβητοποιός",
        tuyauteur: "Σωληνουργός",
        tourneur: "Τορναδόρος",
        fraiseur: "Φρεζιστής",
        usineur: "Χειριστής CNC",
        mecanicien_industriel: "Βιομηχανικός μηχανικός",
        monteur: "Συναρμολογητής",
        controleur_qualite: "Ελεγκτής ποιότητας",
        ajusteur: "Ρυθμιστής",
        chef_equipe_metallurgie: "Επικεφαλής ομάδας",
      },
      classifications: {
        niveau_1: "Επίπεδο I",
        niveau_2: "Επίπεδο II",
        niveau_3: "Επίπεδο III",
        niveau_4: "Επίπεδο IV",
        niveau_5: "Επίπεδο V",
      },
    },
    tp: {
      label: "Δημόσια έργα",
      convention: "Εθνική συλλογική σύμβαση δημόσια έργα (3005)",
      postes: {
        conducteur_engins: "Χειριστής μηχανημάτων",
        terrassier: "Χωματουργός",
        canalisateur: "Εργάτης υπονόμων",
        constructeur_routes: "Οδοποιός",
        coffreur_bancheur: "Ξυλουργός καλουπιών",
        macon_vrd: "Τοιχοποιός δημόσια έργα",
        chef_equipe_tp: "Επικεφαλής ομάδας ΔΕ",
        manoeuvre_tp: "Βοηθός ΔΕ",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Ξενοδοχεία",
      convention: "Συλλογική σύμβαση ξενοδοχεία-εστιατόρια (3292)",
      postes: {
        receptionniste: "Ρεσεψιονίστ",
        femme_chambre: "Καμαριέρα",
        agent_entretien: "Υπάλληλος καθαριότητας",
        bagagiste: "Αχθοφόρος",
        concierge: "Θυρωρός",
        night_audit: "Νυχτερινός ελεγκτής",
        gouvernante: "Οικονόμος",
        chef_reception: "Επικεφαλής ρεσεψιόν",
      },
      classifications: {
        niveau_1: "Επίπεδο I",
        niveau_2: "Επίπεδο II",
        niveau_3: "Επίπεδο III",
        niveau_4: "Επίπεδο IV",
        niveau_5: "Επίπεδο V",
      },
    },
    restauration: {
      label: "Εστίαση",
      convention: "Συλλογική σύμβαση ξενοδοχεία-εστιατόρια (3292)",
      postes: {
        cuisinier: "Μάγειρας",
        commis_cuisine: "Βοηθός μαγείρου",
        chef_partie: "Chef de partie",
        serveur: "Σερβιτόρος",
        barman: "Μπάρμαν",
        plongeur: "Πλύντης πιάτων",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Αρχιμάγειρας",
      },
      classifications: {
        niveau_1: "Επίπεδο I",
        niveau_2: "Επίπεδο II",
        niveau_3: "Επίπεδο III",
        niveau_4: "Επίπεδο IV",
        niveau_5: "Επίπεδο V",
      },
    },
    plasturgie: {
      label: "Πλαστικά",
      convention: "Συλλογική σύμβαση πλαστικά (0292)",
      postes: {
        operateur_injection: "Χειριστής έγχυσης",
        operateur_extrusion: "Χειριστής εξώθησης",
        regleur: "Ρυθμιστής",
        operateur_thermoformage: "Χειριστής θερμοδιαμόρφωσης",
        controleur_qualite_plasturgie: "Ελεγκτής ποιότητας",
        technicien_maintenance: "Τεχνικός συντήρησης",
        chef_equipe_plasturgie: "Επικεφαλής ομάδας",
      },
      classifications: {
        niveau_1: "Επίπεδο I",
        niveau_2: "Επίπεδο II",
        niveau_3: "Επίπεδο III",
        niveau_4: "Επίπεδο IV",
      },
    },
    automobile_carrosserie: {
      label: "Αυτοκινητοβιομηχανία & Επισκευή αμαξωμάτων",
      convention: "Συλλογική σύμβαση επισκευή αυτοκινήτων (1090)",
      postes: {
        carrossier: "Επισκευαστής αμαξωμάτων",
        peintre_automobile: "Βαφέας αυτοκινήτων",
        mecanicien_auto: "Μηχανικός αυτοκινήτων",
        electricien_auto: "Ηλεκτρολόγος αυτοκινήτων",
        chef_atelier: "Επικεφαλής συνεργείου",
        controleur_technique: "Τεχνικός ελεγκτής",
      },
      classifications: {
        niveau_1: "Επίπεδο I",
        niveau_2: "Επίπεδο II",
        niveau_3: "Επίπεδο III",
        niveau_4: "Επίπεδο IV",
      },
    },
    sylviculture: {
      label: "Δασοκομία",
      convention: "Συλλογική σύμβαση γεωργία (7501)",
      postes: {
        bucheron: "Ξυλοκόπος",
        elagueur: "Κλαδευτής",
        conducteur_engins_forestiers: "Χειριστής δασικών μηχανημάτων",
        chef_equipe_sylviculture: "Επικεφαλής ομάδας δασοκομία",
      },
      classifications: {
        niveau_1: "Επίπεδο I",
        niveau_2: "Επίπεδο II",
        niveau_3: "Επίπεδο III",
        niveau_4: "Επίπεδο IV",
      },
    },
    cartonnerie: {
      label: "Χαρτονοβιομηχανία",
      convention: "Συλλογική σύμβαση μεταποιητική βιομηχανία (3107)",
      postes: {
        operateur_production: "Χειριστής παραγωγής",
        conducteur_ligne: "Χειριστής γραμμής",
        regleur_cartonnerie: "Ρυθμιστής",
        chef_equipe_cartonnerie: "Επικεφαλής ομάδας",
      },
      classifications: {
        niveau_1: "Επίπεδο I",
        niveau_2: "Επίπεδο II",
        niveau_3: "Επίπεδο III",
        niveau_4: "Επίπεδο IV",
      },
    },
    autre: {
      label: "Άλλο",
      convention: "Να καθοριστεί ανάλογα με τον τομέα",
      postes: {
        autre_poste: "Άλλη θέση (προσδιορίστε)",
      },
      classifications: {
        a_definir: "Να καθοριστεί",
      },
    },
  },

  // === ΕΥΡΩΠΑΪΚΕΣ ΧΩΡΕΣ ===
  pays: {
    france: "Γαλλία",
    allemagne: "Γερμανία",
    autriche: "Αυστρία",
    belgique: "Βέλγιο",
    bulgarie: "Βουλγαρία",
    croatie: "Κροατία",
    chypre: "Κύπρος",
    danemark: "Δανία",
    espagne: "Ισπανία",
    estonie: "Εσθονία",
    finlande: "Φινλανδία",
    grece: "Ελλάδα",
    hongrie: "Ουγγαρία",
    irlande: "Ιρλανδία",
    italie: "Ιταλία",
    lettonie: "Λετονία",
    lituanie: "Λιθουανία",
    luxembourg: "Λουξεμβούργο",
    malte: "Μάλτα",
    pays_bas: "Ολλανδία",
    pologne: "Πολωνία",
    portugal: "Πορτογαλία",
    republique_tcheque: "Τσεχία",
    roumanie: "Ρουμανία",
    slovaquie: "Σλοβακία",
    slovenie: "Σλοβενία",
    suede: "Σουηδία",
  },

  // === ΣΕΛΙΔΑ ΠΕΡΙΛΗΨΗΣ ΠΡΟΣΦΟΡΑΣ (ΥΠΟΓΡΑΦΗ) ===
  pageRecap: {
    header: {
      title: "Περίληψη προσφοράς",
      exportPDF: "Εξαγωγή σε PDF",
      loading: "Φόρτωση προσφοράς...",
      notFound: "Η προσφορά δεν βρέθηκε",
    },
    statut: {
      signe: "Υπογεγραμμένο",
      nouveau: "Νέο",
    },
    dates: {
      creeLe: "Δημιουργήθηκε",
      a: "στις",
      signeLe: "Υπογράφηκε",
      derniereModification: "Τελευταία τροποποίηση:",
    },
    entreprise: {
      title: "Πληροφορίες επιχείρησης",
      raisonSociale: "Εταιρική επωνυμία",
      siret: "SIRET",
      codeAPE: "Κωδικός APE",
      tvaIntracommunautaire: "Ενδοκοινοτικός ΦΠΑ",
      adresse: "Διεύθυνση",
      siteInternet: "Ιστότοπος",
    },
    contact: {
      title: "Άτομο επικοινωνίας",
      nomComplet: "Πλήρες όνομα",
      fonction: "Θέση",
      email: "Email",
      telephonePortable: "Κινητό τηλέφωνο",
      telephoneFixe: "Σταθερό τηλέφωνο",
    },
    postes: {
      title: "Θέσεις προς πλήρωση",
      nationalite: "Υπηκοότητα",
      salaireBrut: "Μικτός μισθός",
      tauxHoraireBrut: "Μικτή ωριαία αμοιβή",
      coefficientETT: "Συντελεστής πρακτορείου",
      tauxETT: "Τιμολόγηση πρακτορείου",
    },
    conditions: {
      title: "Όροι εργασίας",
      dateDebut: "Ημερομηνία έναρξης",
      dateFin: "Ημερομηνία λήξης",
      periodeEssai: "Περίοδος δοκιμής",
      baseHoraire: "Βάση ωρών",
      heuresMois: "ώρες/μήνα",
      lieuxMission: "Τοποθεσίες αποστολής",
      motifRecours: "Λόγος προσωρινής απασχόλησης",
    },
    exigences: {
      title: "Απαιτήσεις υποψηφίων",
      experience: "Εμπειρία",
      competences: "Δεξιότητες",
      langues: "Γλώσσες",
      permis: "Άδειες οδήγησης",
      epi: "ΜΑΠ",
    },
    calculs: {
      title: "Υπολογισμοί τιμολόγησης",
      salaireBrut: "Μικτός μισθός",
      coefficientETT: "Συντελεστής πρακτορείου",
      tauxHoraireBrut: "Μικτή ωριαία αμοιβή",
      tauxETT: "Τιμολόγηση πρακτορείου",
      baseHoraire: "Βάση ωρών",
      coutMensuel: "Μηνιαίο κόστος",
      duree: "Διάρκεια",
      coutTotal: "Συνολικό κόστος",
    },
    signature: {
      title: "Ηλεκτρονική υπογραφή",
      intro: "Επιβεβαιώνω ότι έχω διαβάσει και συμφωνώ με τους όρους αυτής της προσφοράς.",
      nomComplet: {
        label: "Πλήρες όνομα",
        placeholder: "Γιώργος Παπαδόπουλος",
      },
      email: {
        label: "Email επιβεβαίωσης",
        placeholder: "giorgos.papadopoulos@etaireia.gr",
      },
      checkbox: "Συμφωνώ με τους γενικούς όρους",
      boutonSigner: "Υπογραφή ηλεκτρονικά",
      enCours: "Υπογραφή...",
      succes: "✓ Η προσφορά υπογράφηκε επιτυχώς!",
      erreur: "Σφάλμα κατά την υπογραφή. Παρακαλώ δοκιμάστε ξανά.",
    },
    actions: {
      modifier: "Επεξεργασία προσφοράς",
      telecharger: "Λήψη PDF",
      partager: "Κοινοποίηση",
    },
  },
};
