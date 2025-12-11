/**
 * 🌱 SEED COMPLET DES TRADUCTIONS FR/EN/DE - PARTIE 2
 * 
 * Questions manquantes à ajouter au seed principal
 */

export const SEED_DATA_PART2 = [
  // Q13 Satisfaction Worker Options
  {
    key: 'i18n:question:q13_satisfaction_worker.options.tres_satisfait',
    value: {
      translations: {
        fr: { label: "Très satisfait", status: "validated" },
        en: { label: "Very satisfied", status: "validated" },
        de: { label: "Sehr zufrieden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction_worker.options.satisfait',
    value: {
      translations: {
        fr: { label: "Satisfait", status: "validated" },
        en: { label: "Satisfied", status: "validated" },
        de: { label: "Zufrieden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction_worker.options.neutre',
    value: {
      translations: {
        fr: { label: "Neutre", status: "validated" },
        en: { label: "Neutral", status: "validated" },
        de: { label: "Neutral", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction_worker.options.insatisfait',
    value: {
      translations: {
        fr: { label: "Peu satisfait", status: "validated" },
        en: { label: "Dissatisfied", status: "validated" },
        de: { label: "Unzufrieden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction_worker.options.tres_insatisfait',
    value: {
      translations: {
        fr: { label: "Très insatisfait", status: "validated" },
        en: { label: "Very dissatisfied", status: "validated" },
        de: { label: "Sehr unzufrieden", status: "validated" }
      }
    }
  },

  // Q14 : Risques (AGENCY)
  {
    key: 'i18n:question:q14_risques',
    value: {
      translations: {
        fr: {
          label: "Quels risques vous préoccupent le plus ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Which risks concern you the most?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Welche Risiken beunruhigen Sie am meisten?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q14 Options (AGENCY)
  {
    key: 'i18n:question:q14_risques.options.amendes',
    value: {
      translations: {
        fr: { label: "Amendes et sanctions", status: "validated" },
        en: { label: "Fines and penalties", status: "validated" },
        de: { label: "Bußgelder und Strafen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques.options.reputation',
    value: {
      translations: {
        fr: { label: "Réputation / Image", status: "validated" },
        en: { label: "Reputation / Image", status: "validated" },
        de: { label: "Ruf / Image", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques.options.penal',
    value: {
      translations: {
        fr: { label: "Responsabilité pénale", status: "validated" },
        en: { label: "Criminal liability", status: "validated" },
        de: { label: "Strafrechtliche Haftung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques.options.delais',
    value: {
      translations: {
        fr: { label: "Retards missions", status: "validated" },
        en: { label: "Assignment delays", status: "validated" },
        de: { label: "Auftragsverzögerungen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques.options.clients',
    value: {
      translations: {
        fr: { label: "Perte de clients", status: "validated" },
        en: { label: "Client loss", status: "validated" },
        de: { label: "Kundenverlust", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques.options.aucun',
    value: {
      translations: {
        fr: { label: "Aucun risque majeur", status: "validated" },
        en: { label: "No major risk", status: "validated" },
        de: { label: "Kein großes Risiko", status: "validated" }
      }
    }
  },

  // Q14bis : Risques client (CLIENT)
  {
    key: 'i18n:question:q14_risques_client',
    value: {
      translations: {
        fr: {
          label: "Quels risques vous préoccupent le plus ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Which risks concern you the most?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Welche Risiken beunruhigen Sie am meisten?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q14 Options (CLIENT)
  {
    key: 'i18n:question:q14_risques_client.options.conformite',
    value: {
      translations: {
        fr: { label: "Non-conformité légale", status: "validated" },
        en: { label: "Legal non-compliance", status: "validated" },
        de: { label: "Rechtswidrigkeit", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_client.options.qualite',
    value: {
      translations: {
        fr: { label: "Qualité insuffisante", status: "validated" },
        en: { label: "Insufficient quality", status: "validated" },
        de: { label: "Unzureichende Qualität", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_client.options.fiabilite',
    value: {
      translations: {
        fr: { label: "Fiabilité agences", status: "validated" },
        en: { label: "Agency reliability", status: "validated" },
        de: { label: "Agenturzuverlässigkeit", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_client.options.cout',
    value: {
      translations: {
        fr: { label: "Coûts imprévus", status: "validated" },
        en: { label: "Unexpected costs", status: "validated" },
        de: { label: "Unerwartete Kosten", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_client.options.disponibilite',
    value: {
      translations: {
        fr: { label: "Disponibilité candidats", status: "validated" },
        en: { label: "Candidate availability", status: "validated" },
        de: { label: "Kandidatenverfügbarkeit", status: "validated" }
      }
    }
  },

  // Q14ter : Risques worker (WORKER)
  {
    key: 'i18n:question:q14_risques_worker',
    value: {
      translations: {
        fr: {
          label: "Quels problèmes rencontrez-vous le plus souvent ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "What problems do you encounter most often?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Welche Probleme treten am häufigsten auf?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q14 Options (WORKER)
  {
    key: 'i18n:question:q14_risques_worker.options.paiement',
    value: {
      translations: {
        fr: { label: "Retards de paiement", status: "validated" },
        en: { label: "Payment delays", status: "validated" },
        de: { label: "Zahlungsverzögerungen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_worker.options.conditions',
    value: {
      translations: {
        fr: { label: "Mauvaises conditions", status: "validated" },
        en: { label: "Poor conditions", status: "validated" },
        de: { label: "Schlechte Bedingungen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_worker.options.contrat',
    value: {
      translations: {
        fr: { label: "Contrats non respectés", status: "validated" },
        en: { label: "Contracts not honored", status: "validated" },
        de: { label: "Verträge nicht eingehalten", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_worker.options.logement',
    value: {
      translations: {
        fr: { label: "Logement inadéquat", status: "validated" },
        en: { label: "Inadequate housing", status: "validated" },
        de: { label: "Unzureichende Unterkunft", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q14_risques_worker.options.communication',
    value: {
      translations: {
        fr: { label: "Problèmes communication", status: "validated" },
        en: { label: "Communication problems", status: "validated" },
        de: { label: "Kommunikationsprobleme", status: "validated" }
      }
    }
  },

  // Q15 : Problème (AGENCY)
  {
    key: 'i18n:question:q15_probleme',
    value: {
      translations: {
        fr: {
          label: "Quel est votre plus gros problème avec le détachement ?",
          placeholder: "Décrivez en quelques phrases...",
          description: "",
          status: "validated"
        },
        en: {
          label: "What is your biggest problem with posting?",
          placeholder: "Describe in a few sentences...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Was ist Ihr größtes Problem bei der Entsendung?",
          placeholder: "Beschreiben Sie in wenigen Sätzen...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q15bis : Besoins client (CLIENT)
  {
    key: 'i18n:question:q15_besoins_client',
    value: {
      translations: {
        fr: {
          label: "Quels sont vos besoins prioritaires ?",
          placeholder: "Ex: Trouver rapidement, meilleure qualité, prix...",
          description: "",
          status: "validated"
        },
        en: {
          label: "What are your priority needs?",
          placeholder: "E.g: Find quickly, better quality, price...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Was sind Ihre vorrangigen Bedürfnisse?",
          placeholder: "z.B: Schnell finden, bessere Qualität, Preis...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q15ter : Améliorations (WORKER)
  {
    key: 'i18n:question:q15_ameliorations',
    value: {
      translations: {
        fr: {
          label: "Qu'aimeriez-vous améliorer dans vos missions ?",
          placeholder: "Ex: Salaire, logement, support, stabilité...",
          description: "",
          status: "validated"
        },
        en: {
          label: "What would you like to improve in your assignments?",
          placeholder: "E.g: Salary, housing, support, stability...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Was würden Sie bei Ihren Einsätzen verbessern?",
          placeholder: "z.B: Gehalt, Unterkunft, Support, Stabilität...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q16 : ERP (AGENCY)
  {
    key: 'i18n:question:q16_erp',
    value: {
      translations: {
        fr: {
          label: "Utilisez-vous un ERP ou logiciel de gestion ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Do you use an ERP or management software?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Verwenden Sie ein ERP oder Verwaltungssoftware?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q16 Options
  {
    key: 'i18n:question:q16_erp.options.sage',
    value: {
      translations: {
        fr: { label: "Sage", status: "validated" },
        en: { label: "Sage", status: "validated" },
        de: { label: "Sage", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q16_erp.options.sap',
    value: {
      translations: {
        fr: { label: "SAP", status: "validated" },
        en: { label: "SAP", status: "validated" },
        de: { label: "SAP", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q16_erp.options.cegid',
    value: {
      translations: {
        fr: { label: "Cegid", status: "validated" },
        en: { label: "Cegid", status: "validated" },
        de: { label: "Cegid", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q16_erp.options.bullhorn',
    value: {
      translations: {
        fr: { label: "Bullhorn / ATS", status: "validated" },
        en: { label: "Bullhorn / ATS", status: "validated" },
        de: { label: "Bullhorn / ATS", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q16_erp.options.autre',
    value: {
      translations: {
        fr: { label: "Autre", status: "validated" },
        en: { label: "Other", status: "validated" },
        de: { label: "Sonstige", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q16_erp.options.aucun',
    value: {
      translations: {
        fr: { label: "Aucun ERP", status: "validated" },
        en: { label: "No ERP", status: "validated" },
        de: { label: "Kein ERP", status: "validated" }
      }
    }
  },

  // Q16_autre : Précision ERP
  {
    key: 'i18n:question:q16_autre',
    value: {
      translations: {
        fr: {
          label: "Précisez votre ERP",
          placeholder: "Nom du logiciel...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Specify your ERP",
          placeholder: "Software name...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Geben Sie Ihr ERP an",
          placeholder: "Softwarename...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q17 : Migration (AGENCY)
  {
    key: 'i18n:question:q17_migration',
    value: {
      translations: {
        fr: {
          label: "Prêt à migrer vers une nouvelle solution ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Ready to migrate to a new solution?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Bereit, zu einer neuen Lösung zu migrieren?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q17 Options
  {
    key: 'i18n:question:q17_migration.options.oui',
    value: {
      translations: {
        fr: { label: "Oui, sans problème", status: "validated" },
        en: { label: "Yes, no problem", status: "validated" },
        de: { label: "Ja, kein Problem", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q17_migration.options.conditions',
    value: {
      translations: {
        fr: { label: "Oui, sous conditions", status: "validated" },
        en: { label: "Yes, under conditions", status: "validated" },
        de: { label: "Ja, unter Bedingungen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q17_migration.options.difficile',
    value: {
      translations: {
        fr: { label: "Difficile, mais ouvert", status: "validated" },
        en: { label: "Difficult, but open", status: "validated" },
        de: { label: "Schwierig, aber offen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q17_migration.options.non',
    value: {
      translations: {
        fr: { label: "Non, pas envisageable", status: "validated" },
        en: { label: "No, not feasible", status: "validated" },
        de: { label: "Nein, nicht machbar", status: "validated" }
      }
    }
  },

  // Q19 : Features (AGENCY)
  {
    key: 'i18n:question:q19_features',
    value: {
      translations: {
        fr: {
          label: "Fonctionnalités les plus intéressantes",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Most interesting features",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Interessanteste Funktionen",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q19 Options (AGENCY) - 8 options
  {
    key: 'i18n:question:q19_features.options.sipsi',
    value: {
      translations: {
        fr: { label: "Déclaration SIPSI auto", status: "validated" },
        en: { label: "Automatic SIPSI declaration", status: "validated" },
        de: { label: "Automatische SIPSI-Erklärung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features.options.a1',
    value: {
      translations: {
        fr: { label: "Gestion certificats A1", status: "validated" },
        en: { label: "A1 certificate management", status: "validated" },
        de: { label: "A1-Bescheinigungsverwaltung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features.options.conformite',
    value: {
      translations: {
        fr: { label: "Dashboard conformité", status: "validated" },
        en: { label: "Compliance dashboard", status: "validated" },
        de: { label: "Compliance-Dashboard", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features.options.alertes',
    value: {
      translations: {
        fr: { label: "Alertes & renouvellements", status: "validated" },
        en: { label: "Alerts & renewals", status: "validated" },
        de: { label: "Warnungen & Verlängerungen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features.options.documents',
    value: {
      translations: {
        fr: { label: "Centralisation documents", status: "validated" },
        en: { label: "Document centralization", status: "validated" },
        de: { label: "Dokumentenzentralisierung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features.options.marketplace',
    value: {
      translations: {
        fr: { label: "Marketplace agences", status: "validated" },
        en: { label: "Agency marketplace", status: "validated" },
        de: { label: "Agentur-Marktplatz", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features.options.support',
    value: {
      translations: {
        fr: { label: "Support expert multilingue", status: "validated" },
        en: { label: "Multilingual expert support", status: "validated" },
        de: { label: "Mehrsprachiger Expertenservice", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features.options.api',
    value: {
      translations: {
        fr: { label: "Intégration API (ERP)", status: "validated" },
        en: { label: "API integration (ERP)", status: "validated" },
        de: { label: "API-Integration (ERP)", status: "validated" }
      }
    }
  },

  // Q19bis : Features client (CLIENT)
  {
    key: 'i18n:question:q19_features_client',
    value: {
      translations: {
        fr: {
          label: "Fonctionnalités les plus intéressantes",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Most interesting features",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Interessanteste Funktionen",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q19 Options (CLIENT) - 7 options
  {
    key: 'i18n:question:q19_features_client.options.recherche',
    value: {
      translations: {
        fr: { label: "Recherche agences fiables", status: "validated" },
        en: { label: "Search for reliable agencies", status: "validated" },
        de: { label: "Suche nach zuverlässigen Agenturen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_client.options.comparaison',
    value: {
      translations: {
        fr: { label: "Comparaison prix/qualité", status: "validated" },
        en: { label: "Price/quality comparison", status: "validated" },
        de: { label: "Preis-/Qualitätsvergleich", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_client.options.avis',
    value: {
      translations: {
        fr: { label: "Avis vérifiés", status: "validated" },
        en: { label: "Verified reviews", status: "validated" },
        de: { label: "Verifizierte Bewertungen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_client.options.conformite',
    value: {
      translations: {
        fr: { label: "Garantie conformité", status: "validated" },
        en: { label: "Compliance guarantee", status: "validated" },
        de: { label: "Compliance-Garantie", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_client.options.support',
    value: {
      translations: {
        fr: { label: "Support dédié", status: "validated" },
        en: { label: "Dedicated support", status: "validated" },
        de: { label: "Dedizierter Support", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_client.options.facturation',
    value: {
      translations: {
        fr: { label: "Facturation centralisée", status: "validated" },
        en: { label: "Centralized billing", status: "validated" },
        de: { label: "Zentralisierte Abrechnung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_client.options.suivi',
    value: {
      translations: {
        fr: { label: "Suivi temps réel", status: "validated" },
        en: { label: "Real-time tracking", status: "validated" },
        de: { label: "Echtzeit-Tracking", status: "validated" }
      }
    }
  },

  // Q19ter : Features worker (WORKER)
  {
    key: 'i18n:question:q19_features_worker',
    value: {
      translations: {
        fr: {
          label: "Fonctionnalités les plus intéressantes",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Most interesting features",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Interessanteste Funktionen",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q19 Options (WORKER) - 7 options
  {
    key: 'i18n:question:q19_features_worker.options.recherche',
    value: {
      translations: {
        fr: { label: "Recherche missions", status: "validated" },
        en: { label: "Job search", status: "validated" },
        de: { label: "Auftragssuche", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_worker.options.avis',
    value: {
      translations: {
        fr: { label: "Avis sur agences", status: "validated" },
        en: { label: "Agency reviews", status: "validated" },
        de: { label: "Agenturbewertungen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_worker.options.logement',
    value: {
      translations: {
        fr: { label: "Aide logement", status: "validated" },
        en: { label: "Housing assistance", status: "validated" },
        de: { label: "Wohnungsunterstützung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_worker.options.paiement',
    value: {
      translations: {
        fr: { label: "Paiement sécurisé", status: "validated" },
        en: { label: "Secure payment", status: "validated" },
        de: { label: "Sichere Zahlung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_worker.options.support',
    value: {
      translations: {
        fr: { label: "Support dans ma langue", status: "validated" },
        en: { label: "Support in my language", status: "validated" },
        de: { label: "Support in meiner Sprache", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_worker.options.documents',
    value: {
      translations: {
        fr: { label: "Aide documents admin", status: "validated" },
        en: { label: "Help with admin documents", status: "validated" },
        de: { label: "Hilfe bei Verwaltungsdokumenten", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q19_features_worker.options.formation',
    value: {
      translations: {
        fr: { label: "Formations qualifiantes", status: "validated" },
        en: { label: "Qualifying training", status: "validated" },
        de: { label: "Qualifizierende Schulungen", status: "validated" }
      }
    }
  },

  // Q21 : Budget mensuel (AGENCY & CLIENT)
  {
    key: 'i18n:question:q21_budget_mensuel',
    value: {
      translations: {
        fr: {
          label: "Budget mensuel acceptable",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Acceptable monthly budget",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Akzeptables monatliches Budget",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q21 Options
  {
    key: 'i18n:question:q21_budget_mensuel.options.0-100',
    value: {
      translations: {
        fr: { label: "0-100 € / mois", status: "validated" },
        en: { label: "0-100 € / month", status: "validated" },
        de: { label: "0-100 € / Monat", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q21_budget_mensuel.options.100-300',
    value: {
      translations: {
        fr: { label: "100-300 € / mois", status: "validated" },
        en: { label: "100-300 € / month", status: "validated" },
        de: { label: "100-300 € / Monat", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q21_budget_mensuel.options.300-500',
    value: {
      translations: {
        fr: { label: "300-500 € / mois", status: "validated" },
        en: { label: "300-500 € / month", status: "validated" },
        de: { label: "300-500 € / Monat", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q21_budget_mensuel.options.500-1000',
    value: {
      translations: {
        fr: { label: "500-1 000 € / mois", status: "validated" },
        en: { label: "500-1,000 € / month", status: "validated" },
        de: { label: "500-1.000 € / Monat", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q21_budget_mensuel.options.1000+',
    value: {
      translations: {
        fr: { label: "1 000+ € / mois", status: "validated" },
        en: { label: "1,000+ € / month", status: "validated" },
        de: { label: "1.000+ € / Monat", status: "validated" }
      }
    }
  },

  // Q23 : Rôle (AGENCY & CLIENT)
  {
    key: 'i18n:question:q23_role',
    value: {
      translations: {
        fr: {
          label: "Rôle dans la décision d'achat",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Role in purchasing decision",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Rolle bei der Kaufentscheidung",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q23 Options
  {
    key: 'i18n:question:q23_role.options.decideur',
    value: {
      translations: {
        fr: { label: "Décideur final", status: "validated" },
        en: { label: "Final decision maker", status: "validated" },
        de: { label: "Endgültiger Entscheidungsträger", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q23_role.options.influenceur',
    value: {
      translations: {
        fr: { label: "Influenceur / Recommandation", status: "validated" },
        en: { label: "Influencer / Recommendation", status: "validated" },
        de: { label: "Beeinflusser / Empfehlung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q23_role.options.utilisateur',
    value: {
      translations: {
        fr: { label: "Utilisateur final", status: "validated" },
        en: { label: "End user", status: "validated" },
        de: { label: "Endbenutzer", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q23_role.options.autre',
    value: {
      translations: {
        fr: { label: "Autre", status: "validated" },
        en: { label: "Other", status: "validated" },
        de: { label: "Sonstige", status: "validated" }
      }
    }
  },

  // ============================================
  // SECTION 5 : VISION
  // ============================================

  // Q24 : Vision évolution (AGENCY & CLIENT)
  {
    key: 'i18n:question:q24_evolution',
    value: {
      translations: {
        fr: {
          label: "Vision du marché dans les 3 prochaines années",
          placeholder: "Partagez votre vision...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Market vision for the next 3 years",
          placeholder: "Share your vision...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Marktvision für die nächsten 3 Jahre",
          placeholder: "Teilen Sie Ihre Vision...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q24bis : Aspirations (WORKER)
  {
    key: 'i18n:question:q24_aspirations',
    value: {
      translations: {
        fr: {
          label: "Vos aspirations professionnelles futures",
          placeholder: "Ex: CDI, retour au pays, formation...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Your future professional aspirations",
          placeholder: "E.g: Permanent contract, return home, training...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Ihre beruflichen Zukunftsziele",
          placeholder: "z.B: Festanstellung, Heimkehr, Schulung...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q25 : Besoins/suggestions (ALL)
  {
    key: 'i18n:question:q25_besoins',
    value: {
      translations: {
        fr: {
          label: "Autres besoins ou suggestions",
          placeholder: "Vos suggestions nous intéressent...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Other needs or suggestions",
          placeholder: "Your suggestions are valuable to us...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Weitere Bedürfnisse oder Vorschläge",
          placeholder: "Ihre Vorschläge interessieren uns...",
          description: "",
          status: "validated"
        }
      }
    }
  },
];
