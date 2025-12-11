/**
 * 🌱 SEED COMPLET DES TRADUCTIONS FR/EN/DE
 * 
 * Ce fichier contient TOUTES les traductions pour les 3 profils :
 * - AGENCY : 30 questions
 * - CLIENT : 22 questions
 * - WORKER : 17 questions
 * 
 * Version: 1.0.0
 * Date: 11 Décembre 2024
 */

import type { Context } from "npm:hono";
import * as kv from "./kv_store.tsx";
import { SEED_DATA_PART2 } from "./seed-all-forms-PART2.tsx";

/**
 * 📦 SEED COMPLET - TOUTES LES QUESTIONS
 */
const COMPLETE_SEED_DATA = [
  // ============================================
  // SECTION 1 : PROFIL
  // ============================================

  // Q1 : Nom (ALL)
  {
    key: 'i18n:question:q1_nom',
    value: {
      translations: {
        fr: {
          label: "Nom",
          placeholder: "Nom de l'organisation ou votre nom",
          description: "",
          status: "validated"
        },
        en: {
          label: "Name",
          placeholder: "Organization name or your name",
          description: "",
          status: "validated"
        },
        de: {
          label: "Name",
          placeholder: "Organisationsname oder Ihr Name",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q2 : Année création (AGENCY)
  {
    key: 'i18n:question:q2_annee',
    value: {
      translations: {
        fr: {
          label: "Année de création",
          placeholder: "2015",
          description: "",
          status: "validated"
        },
        en: {
          label: "Year of establishment",
          placeholder: "2015",
          description: "",
          status: "validated"
        },
        de: {
          label: "Gründungsjahr",
          placeholder: "2015",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q2bis : Année création entreprise (CLIENT)
  {
    key: 'i18n:question:q2_annee_client',
    value: {
      translations: {
        fr: {
          label: "Année de création de votre entreprise",
          placeholder: "2010",
          description: "",
          status: "validated"
        },
        en: {
          label: "Year your company was founded",
          placeholder: "2010",
          description: "",
          status: "validated"
        },
        de: {
          label: "Gründungsjahr Ihres Unternehmens",
          placeholder: "2010",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q2ter : Nationalité (WORKER)
  {
    key: 'i18n:question:q2_nationalite',
    value: {
      translations: {
        fr: {
          label: "Votre nationalité",
          placeholder: "Ex: Polonaise, Roumaine...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Your nationality",
          placeholder: "E.g: Polish, Romanian...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Ihre Nationalität",
          placeholder: "z.B: Polnisch, Rumänisch...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q3 : Taille (AGENCY & CLIENT)
  {
    key: 'i18n:question:q3_taille',
    value: {
      translations: {
        fr: {
          label: "Taille de l'organisation",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Organization size",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Organisationsgröße",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q3 Options
  {
    key: 'i18n:question:q3_taille.options.1-9',
    value: {
      translations: {
        fr: { label: "1-9 personnes", status: "validated" },
        en: { label: "1-9 people", status: "validated" },
        de: { label: "1-9 Personen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q3_taille.options.10-49',
    value: {
      translations: {
        fr: { label: "10-49 personnes", status: "validated" },
        en: { label: "10-49 people", status: "validated" },
        de: { label: "10-49 Personen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q3_taille.options.50-249',
    value: {
      translations: {
        fr: { label: "50-249 personnes", status: "validated" },
        en: { label: "50-249 people", status: "validated" },
        de: { label: "50-249 Personen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q3_taille.options.250+',
    value: {
      translations: {
        fr: { label: "250+ personnes", status: "validated" },
        en: { label: "250+ people", status: "validated" },
        de: { label: "250+ Personen", status: "validated" }
      }
    }
  },

  // Q3bis : Expérience (WORKER)
  {
    key: 'i18n:question:q3_experience',
    value: {
      translations: {
        fr: {
          label: "Années d'expérience en intérim",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Years of temporary work experience",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Jahre Zeitarbeitserfahrung",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q3 Experience Options
  {
    key: 'i18n:question:q3_experience.options.<1',
    value: {
      translations: {
        fr: { label: "Moins d'1 an", status: "validated" },
        en: { label: "Less than 1 year", status: "validated" },
        de: { label: "Weniger als 1 Jahr", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q3_experience.options.1-3',
    value: {
      translations: {
        fr: { label: "1-3 ans", status: "validated" },
        en: { label: "1-3 years", status: "validated" },
        de: { label: "1-3 Jahre", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q3_experience.options.3-5',
    value: {
      translations: {
        fr: { label: "3-5 ans", status: "validated" },
        en: { label: "3-5 years", status: "validated" },
        de: { label: "3-5 Jahre", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q3_experience.options.5-10',
    value: {
      translations: {
        fr: { label: "5-10 ans", status: "validated" },
        en: { label: "5-10 years", status: "validated" },
        de: { label: "5-10 Jahre", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q3_experience.options.10+',
    value: {
      translations: {
        fr: { label: "Plus de 10 ans", status: "validated" },
        en: { label: "More than 10 years", status: "validated" },
        de: { label: "Mehr als 10 Jahre", status: "validated" }
      }
    }
  },

  // Q4 : Secteurs (AGENCY & CLIENT)
  {
    key: 'i18n:question:q4_secteurs',
    value: {
      translations: {
        fr: {
          label: "Principaux secteurs d'activité",
          placeholder: "",
          description: "Sélectionnez tous les secteurs concernés",
          status: "validated"
        },
        en: {
          label: "Main sectors of activity",
          placeholder: "",
          description: "Select all relevant sectors",
          status: "validated"
        },
        de: {
          label: "Hauptgeschäftsbereiche",
          placeholder: "",
          description: "Wählen Sie alle relevanten Bereiche",
          status: "validated"
        }
      }
    }
  },

  // Secteurs options
  {
    key: 'i18n:sectors.btp',
    value: {
      translations: {
        fr: { label: "BTP / Construction", status: "validated" },
        en: { label: "Construction / Building", status: "validated" },
        de: { label: "Bau / Baugewerbe", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:sectors.industrie',
    value: {
      translations: {
        fr: { label: "Industrie", status: "validated" },
        en: { label: "Industry", status: "validated" },
        de: { label: "Industrie", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:sectors.logistique',
    value: {
      translations: {
        fr: { label: "Logistique / Transport", status: "validated" },
        en: { label: "Logistics / Transport", status: "validated" },
        de: { label: "Logistik / Transport", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:sectors.hotellerie',
    value: {
      translations: {
        fr: { label: "Hôtellerie / Restauration", status: "validated" },
        en: { label: "Hospitality / Catering", status: "validated" },
        de: { label: "Gastgewerbe / Gastronomie", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:sectors.sante',
    value: {
      translations: {
        fr: { label: "Santé", status: "validated" },
        en: { label: "Healthcare", status: "validated" },
        de: { label: "Gesundheitswesen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:sectors.agriculture',
    value: {
      translations: {
        fr: { label: "Agriculture", status: "validated" },
        en: { label: "Agriculture", status: "validated" },
        de: { label: "Landwirtschaft", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:sectors.tech',
    value: {
      translations: {
        fr: { label: "Tech / IT", status: "validated" },
        en: { label: "Tech / IT", status: "validated" },
        de: { label: "Tech / IT", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:sectors.autres',
    value: {
      translations: {
        fr: { label: "Autres", status: "validated" },
        en: { label: "Other", status: "validated" },
        de: { label: "Sonstige", status: "validated" }
      }
    }
  },

  // Q4bis : Métiers (WORKER)
  {
    key: 'i18n:question:q4_metiers',
    value: {
      translations: {
        fr: {
          label: "Métiers exercés",
          placeholder: "",
          description: "Sélectionnez tous vos métiers",
          status: "validated"
        },
        en: {
          label: "Occupations",
          placeholder: "",
          description: "Select all your occupations",
          status: "validated"
        },
        de: {
          label: "Ausgeübte Berufe",
          placeholder: "",
          description: "Wählen Sie alle Ihre Berufe",
          status: "validated"
        }
      }
    }
  },

  // ============================================
  // SECTION 2 : EXPÉRIENCE
  // ============================================

  // Q5 : Pays origine (AGENCY)
  {
    key: 'i18n:question:q5_pays',
    value: {
      translations: {
        fr: {
          label: "Pays d'origine de votre agence",
          placeholder: "Ex: Pologne",
          description: "",
          status: "validated"
        },
        en: {
          label: "Country of origin of your agency",
          placeholder: "E.g: Poland",
          description: "",
          status: "validated"
        },
        de: {
          label: "Herkunftsland Ihrer Agentur",
          placeholder: "z.B: Polen",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q5bis : Localisation (CLIENT)
  {
    key: 'i18n:question:q5_localisation',
    value: {
      translations: {
        fr: {
          label: "Pays de localisation de votre entreprise",
          placeholder: "Ex: France",
          description: "",
          status: "validated"
        },
        en: {
          label: "Country location of your company",
          placeholder: "E.g: France",
          description: "",
          status: "validated"
        },
        de: {
          label: "Standortland Ihres Unternehmens",
          placeholder: "z.B: Frankreich",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q5ter : Pays travail (WORKER)
  {
    key: 'i18n:question:q5_pays_travail',
    value: {
      translations: {
        fr: {
          label: "Pays où vous avez travaillé en intérim",
          placeholder: "Ex: France, Allemagne, Belgique...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Countries where you worked as a temporary worker",
          placeholder: "E.g: France, Germany, Belgium...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Länder, in denen Sie als Zeitarbeiter gearbeitet haben",
          placeholder: "z.B: Frankreich, Deutschland, Belgien...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q6 : Volume détachements (AGENCY)
  {
    key: 'i18n:question:q6_volume',
    value: {
      translations: {
        fr: {
          label: "Volume annuel de détachements",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Annual volume of posted workers",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Jährliches Volumen entsandter Arbeitnehmer",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q6 Options (AGENCY)
  {
    key: 'i18n:question:q6_volume.options.0',
    value: {
      translations: {
        fr: { label: "Aucun (pas encore)", status: "validated" },
        en: { label: "None (not yet)", status: "validated" },
        de: { label: "Keine (noch nicht)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume.options.1-50',
    value: {
      translations: {
        fr: { label: "1-50 travailleurs", status: "validated" },
        en: { label: "1-50 workers", status: "validated" },
        de: { label: "1-50 Arbeitnehmer", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume.options.51-200',
    value: {
      translations: {
        fr: { label: "51-200 travailleurs", status: "validated" },
        en: { label: "51-200 workers", status: "validated" },
        de: { label: "51-200 Arbeitnehmer", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume.options.201-500',
    value: {
      translations: {
        fr: { label: "201-500 travailleurs", status: "validated" },
        en: { label: "201-500 workers", status: "validated" },
        de: { label: "201-500 Arbeitnehmer", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume.options.500+',
    value: {
      translations: {
        fr: { label: "500+ travailleurs", status: "validated" },
        en: { label: "500+ workers", status: "validated" },
        de: { label: "500+ Arbeitnehmer", status: "validated" }
      }
    }
  },

  // Q6bis : Volume intérimaires (CLIENT)
  {
    key: 'i18n:question:q6_volume_client',
    value: {
      translations: {
        fr: {
          label: "Combien d'intérimaires employez-vous par an ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "How many temporary workers do you employ per year?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Wie viele Zeitarbeiter beschäftigen Sie pro Jahr?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q6 Options (CLIENT)
  {
    key: 'i18n:question:q6_volume_client.options.0',
    value: {
      translations: {
        fr: { label: "Aucun actuellement", status: "validated" },
        en: { label: "None currently", status: "validated" },
        de: { label: "Derzeit keine", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume_client.options.1-10',
    value: {
      translations: {
        fr: { label: "1-10 personnes", status: "validated" },
        en: { label: "1-10 people", status: "validated" },
        de: { label: "1-10 Personen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume_client.options.11-50',
    value: {
      translations: {
        fr: { label: "11-50 personnes", status: "validated" },
        en: { label: "11-50 people", status: "validated" },
        de: { label: "11-50 Personen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume_client.options.51-200',
    value: {
      translations: {
        fr: { label: "51-200 personnes", status: "validated" },
        en: { label: "51-200 people", status: "validated" },
        de: { label: "51-200 Personen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_volume_client.options.200+',
    value: {
      translations: {
        fr: { label: "200+ personnes", status: "validated" },
        en: { label: "200+ people", status: "validated" },
        de: { label: "200+ Personen", status: "validated" }
      }
    }
  },

  // Q6ter : Fréquence (WORKER)
  {
    key: 'i18n:question:q6_frequence',
    value: {
      translations: {
        fr: {
          label: "À quelle fréquence travaillez-vous en intérim ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "How often do you work as a temporary worker?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Wie oft arbeiten Sie als Zeitarbeiter?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q6 Fréquence Options
  {
    key: 'i18n:question:q6_frequence.options.permanent',
    value: {
      translations: {
        fr: { label: "Régulièrement (toute l'année)", status: "validated" },
        en: { label: "Regularly (all year)", status: "validated" },
        de: { label: "Regelmäßig (ganzjährig)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_frequence.options.saisonnier',
    value: {
      translations: {
        fr: { label: "Saisonnier (certains mois)", status: "validated" },
        en: { label: "Seasonal (certain months)", status: "validated" },
        de: { label: "Saisonal (bestimmte Monate)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_frequence.options.occasionnel',
    value: {
      translations: {
        fr: { label: "Occasionnel (quelques fois)", status: "validated" },
        en: { label: "Occasional (few times)", status: "validated" },
        de: { label: "Gelegentlich (ein paar Mal)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q6_frequence.options.jamais',
    value: {
      translations: {
        fr: { label: "Jamais encore (recherche)", status: "validated" },
        en: { label: "Never yet (looking)", status: "validated" },
        de: { label: "Noch nie (auf der Suche)", status: "validated" }
      }
    }
  },

  // Q7 : Origine travailleurs (AGENCY)
  {
    key: 'i18n:question:q7_origine',
    value: {
      translations: {
        fr: {
          label: "Pays d'origine de vos travailleurs détachés",
          placeholder: "Ex: Pologne, Ukraine, Roumanie...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Country of origin of your posted workers",
          placeholder: "E.g: Poland, Ukraine, Romania...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Herkunftsland Ihrer entsandten Arbeitnehmer",
          placeholder: "z.B: Polen, Ukraine, Rumänien...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q8 : Destinations (AGENCY)
  {
    key: 'i18n:question:q8_destinations',
    value: {
      translations: {
        fr: {
          label: "Pays de destination (où vous détachez)",
          placeholder: "Ex: France, Allemagne, Belgique, Pays-Bas...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Destination countries (where you post)",
          placeholder: "E.g: France, Germany, Belgium, Netherlands...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Zielländer (wohin Sie entsenden)",
          placeholder: "z.B: Frankreich, Deutschland, Belgien, Niederlande...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q8bis : Nationalités intérimaires (CLIENT)
  {
    key: 'i18n:question:q8_nationalites',
    value: {
      translations: {
        fr: {
          label: "Nationalités des intérimaires que vous employez",
          placeholder: "Ex: Polonais, Roumains, Bulgares...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Nationalities of temporary workers you employ",
          placeholder: "E.g: Polish, Romanian, Bulgarian...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Nationalitäten der von Ihnen beschäftigten Zeitarbeiter",
          placeholder: "z.B: Polnisch, Rumänisch, Bulgarisch...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q9 : Défi (AGENCY)
  {
    key: 'i18n:question:q9_defi',
    value: {
      translations: {
        fr: {
          label: "Principal défi du détachement européen",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Main challenge of European posting",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Hauptherausforderung der europäischen Entsendung",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q9 Options (AGENCY)
  {
    key: 'i18n:question:q9_defi.options.admin',
    value: {
      translations: {
        fr: { label: "Complexité administrative (A1, SIPSI...)", status: "validated" },
        en: { label: "Administrative complexity (A1, SIPSI...)", status: "validated" },
        de: { label: "Verwaltungsaufwand (A1, SIPSI...)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi.options.conformite',
    value: {
      translations: {
        fr: { label: "Conformité légale multi-pays", status: "validated" },
        en: { label: "Multi-country legal compliance", status: "validated" },
        de: { label: "Rechtskonformität in mehreren Ländern", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi.options.cout',
    value: {
      translations: {
        fr: { label: "Coûts et temps de gestion", status: "validated" },
        en: { label: "Management costs and time", status: "validated" },
        de: { label: "Verwaltungskosten und -zeit", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi.options.langues',
    value: {
      translations: {
        fr: { label: "Barrières linguistiques", status: "validated" },
        en: { label: "Language barriers", status: "validated" },
        de: { label: "Sprachbarrieren", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi.options.autre',
    value: {
      translations: {
        fr: { label: "Autre", status: "validated" },
        en: { label: "Other", status: "validated" },
        de: { label: "Sonstige", status: "validated" }
      }
    }
  },

  // Q9bis : Défi client (CLIENT)
  {
    key: 'i18n:question:q9_defi_client',
    value: {
      translations: {
        fr: {
          label: "Principal défi avec l'intérim européen",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Main challenge with European temporary work",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Hauptherausforderung bei europäischer Zeitarbeit",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q9 Options (CLIENT)
  {
    key: 'i18n:question:q9_defi_client.options.trouver',
    value: {
      translations: {
        fr: { label: "Trouver des agences fiables", status: "validated" },
        en: { label: "Finding reliable agencies", status: "validated" },
        de: { label: "Zuverlässige Agenturen finden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi_client.options.qualite',
    value: {
      translations: {
        fr: { label: "Qualité des candidats", status: "validated" },
        en: { label: "Quality of candidates", status: "validated" },
        de: { label: "Qualität der Kandidaten", status: "validated" }
      }
    }
  },

  // Q9ter : Défi worker (WORKER)
  {
    key: 'i18n:question:q9_defi_worker',
    value: {
      translations: {
        fr: {
          label: "Principal défi dans vos missions",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Main challenge in your assignments",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Hauptherausforderung bei Ihren Einsätzen",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q9 Options (WORKER)
  {
    key: 'i18n:question:q9_defi_worker.options.trouver',
    value: {
      translations: {
        fr: { label: "Trouver des missions", status: "validated" },
        en: { label: "Finding assignments", status: "validated" },
        de: { label: "Aufträge finden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi_worker.options.admin',
    value: {
      translations: {
        fr: { label: "Paperasse administrative", status: "validated" },
        en: { label: "Administrative paperwork", status: "validated" },
        de: { label: "Verwaltungsaufwand", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi_worker.options.logement',
    value: {
      translations: {
        fr: { label: "Logement / Hébergement", status: "validated" },
        en: { label: "Housing / Accommodation", status: "validated" },
        de: { label: "Wohnung / Unterkunft", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi_worker.options.langue',
    value: {
      translations: {
        fr: { label: "Langue locale", status: "validated" },
        en: { label: "Local language", status: "validated" },
        de: { label: "Lokale Sprache", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q9_defi_worker.options.paiement',
    value: {
      translations: {
        fr: { label: "Paiements / Salaire", status: "validated" },
        en: { label: "Payments / Salary", status: "validated" },
        de: { label: "Zahlungen / Gehalt", status: "validated" }
      }
    }
  },

  // Q9_autre : Précision
  {
    key: 'i18n:question:q9_autre',
    value: {
      translations: {
        fr: {
          label: "Précisez votre défi",
          placeholder: "Décrivez...",
          description: "",
          status: "validated"
        },
        en: {
          label: "Specify your challenge",
          placeholder: "Describe...",
          description: "",
          status: "validated"
        },
        de: {
          label: "Beschreiben Sie Ihre Herausforderung",
          placeholder: "Beschreiben...",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q10 : Gestion (AGENCY)
  {
    key: 'i18n:question:q10_gestion',
    value: {
      translations: {
        fr: {
          label: "Comment gérez-vous vos détachements ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "How do you manage your postings?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Wie verwalten Sie Ihre Entsendungen?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q10 Options (AGENCY)
  {
    key: 'i18n:question:q10_gestion.options.interne',
    value: {
      translations: {
        fr: { label: "Équipe interne", status: "validated" },
        en: { label: "Internal team", status: "validated" },
        de: { label: "Internes Team", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_gestion.options.externe',
    value: {
      translations: {
        fr: { label: "Prestataire externe", status: "validated" },
        en: { label: "External provider", status: "validated" },
        de: { label: "Externer Dienstleister", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_gestion.options.mixte',
    value: {
      translations: {
        fr: { label: "Mixte", status: "validated" },
        en: { label: "Mixed", status: "validated" },
        de: { label: "Gemischt", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_gestion.options.manuel',
    value: {
      translations: {
        fr: { label: "Gestion manuelle", status: "validated" },
        en: { label: "Manual management", status: "validated" },
        de: { label: "Manuelle Verwaltung", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_gestion.options.logiciel',
    value: {
      translations: {
        fr: { label: "Logiciel spécialisé", status: "validated" },
        en: { label: "Specialized software", status: "validated" },
        de: { label: "Spezialsoftware", status: "validated" }
      }
    }
  },

  // Q10bis : Nombre agences (CLIENT)
  {
    key: 'i18n:question:q10_agences',
    value: {
      translations: {
        fr: {
          label: "Combien d'agences d'intérim utilisez-vous ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "How many temporary work agencies do you use?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Wie viele Zeitarbeitsagenturen nutzen Sie?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q10 Options (CLIENT)
  {
    key: 'i18n:question:q10_agences.options.0',
    value: {
      translations: {
        fr: { label: "Aucune", status: "validated" },
        en: { label: "None", status: "validated" },
        de: { label: "Keine", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_agences.options.1',
    value: {
      translations: {
        fr: { label: "1 agence", status: "validated" },
        en: { label: "1 agency", status: "validated" },
        de: { label: "1 Agentur", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_agences.options.2-3',
    value: {
      translations: {
        fr: { label: "2-3 agences", status: "validated" },
        en: { label: "2-3 agencies", status: "validated" },
        de: { label: "2-3 Agenturen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_agences.options.4-10',
    value: {
      translations: {
        fr: { label: "4-10 agences", status: "validated" },
        en: { label: "4-10 agencies", status: "validated" },
        de: { label: "4-10 Agenturen", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q10_agences.options.10+',
    value: {
      translations: {
        fr: { label: "Plus de 10", status: "validated" },
        en: { label: "More than 10", status: "validated" },
        de: { label: "Mehr als 10", status: "validated" }
      }
    }
  },

  // Q10ter : Nombre agences worker (WORKER)
  {
    key: 'i18n:question:q10_agences_worker',
    value: {
      translations: {
        fr: {
          label: "Avec combien d'agences travaillez-vous ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "How many agencies do you work with?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Mit wie vielen Agenturen arbeiten Sie?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q10 Options (WORKER)
  {
    key: 'i18n:question:q10_agences_worker.options.1',
    value: {
      translations: {
        fr: { label: "1 seule agence", status: "validated" },
        en: { label: "1 agency only", status: "validated" },
        de: { label: "Nur 1 Agentur", status: "validated" }
      }
    }
  },

  // Q11 : Incidents (AGENCY)
  {
    key: 'i18n:question:q11_incidents',
    value: {
      translations: {
        fr: {
          label: "Avez-vous eu des incidents de conformité ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Have you had compliance incidents?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Hatten Sie Compliance-Vorfälle?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q11 Options
  {
    key: 'i18n:question:q11_incidents.options.jamais',
    value: {
      translations: {
        fr: { label: "Non, jamais", status: "validated" },
        en: { label: "No, never", status: "validated" },
        de: { label: "Nein, nie", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q11_incidents.options.rarement',
    value: {
      translations: {
        fr: { label: "Rarement (1-2 fois)", status: "validated" },
        en: { label: "Rarely (1-2 times)", status: "validated" },
        de: { label: "Selten (1-2 Mal)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q11_incidents.options.parfois',
    value: {
      translations: {
        fr: { label: "Parfois (3-5 fois)", status: "validated" },
        en: { label: "Sometimes (3-5 times)", status: "validated" },
        de: { label: "Manchmal (3-5 Mal)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q11_incidents.options.souvent',
    value: {
      translations: {
        fr: { label: "Souvent (6+ fois)", status: "validated" },
        en: { label: "Often (6+ times)", status: "validated" },
        de: { label: "Oft (6+ Mal)", status: "validated" }
      }
    }
  },

  // ============================================
  // SECTION 3 : BESOINS
  // ============================================

  // Q12 : Budget (AGENCY)
  {
    key: 'i18n:question:q12_budget',
    value: {
      translations: {
        fr: {
          label: "Budget actuel pour la gestion du détachement",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Current budget for posting management",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Aktuelles Budget für Entsendungsverwaltung",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q12 Options (AGENCY)
  {
    key: 'i18n:question:q12_budget.options.0-5k',
    value: {
      translations: {
        fr: { label: "0-5 000 € / an", status: "validated" },
        en: { label: "0-5,000 € / year", status: "validated" },
        de: { label: "0-5.000 € / Jahr", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_budget.options.5-15k',
    value: {
      translations: {
        fr: { label: "5 000-15 000 € / an", status: "validated" },
        en: { label: "5,000-15,000 € / year", status: "validated" },
        de: { label: "5.000-15.000 € / Jahr", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_budget.options.15-30k',
    value: {
      translations: {
        fr: { label: "15 000-30 000 € / an", status: "validated" },
        en: { label: "15,000-30,000 € / year", status: "validated" },
        de: { label: "15.000-30.000 € / Jahr", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_budget.options.30k+',
    value: {
      translations: {
        fr: { label: "30 000+ € / an", status: "validated" },
        en: { label: "30,000+ € / year", status: "validated" },
        de: { label: "30.000+ € / Jahr", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_budget.options.inconnu',
    value: {
      translations: {
        fr: { label: "Je ne sais pas", status: "validated" },
        en: { label: "I don't know", status: "validated" },
        de: { label: "Ich weiß nicht", status: "validated" }
      }
    }
  },

  // Q12bis : Budget intérim (CLIENT)
  {
    key: 'i18n:question:q12_budget_client',
    value: {
      translations: {
        fr: {
          label: "Budget annuel consacré à l'intérim",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Annual budget dedicated to temporary work",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Jährliches Budget für Zeitarbeit",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q12 Options (CLIENT)
  {
    key: 'i18n:question:q12_budget_client.options.0-50k',
    value: {
      translations: {
        fr: { label: "0-50 000 €", status: "validated" },
        en: { label: "0-50,000 €", status: "validated" },
        de: { label: "0-50.000 €", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_budget_client.options.50-200k',
    value: {
      translations: {
        fr: { label: "50 000-200 000 €", status: "validated" },
        en: { label: "50,000-200,000 €", status: "validated" },
        de: { label: "50.000-200.000 €", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_budget_client.options.200-500k',
    value: {
      translations: {
        fr: { label: "200 000-500 000 €", status: "validated" },
        en: { label: "200,000-500,000 €", status: "validated" },
        de: { label: "200.000-500.000 €", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_budget_client.options.500k+',
    value: {
      translations: {
        fr: { label: "500 000+ €", status: "validated" },
        en: { label: "500,000+ €", status: "validated" },
        de: { label: "500.000+ €", status: "validated" }
      }
    }
  },

  // Q12ter : Salaire (WORKER)
  {
    key: 'i18n:question:q12_salaire',
    value: {
      translations: {
        fr: {
          label: "Salaire mensuel moyen de vos missions",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Average monthly salary of your assignments",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Durchschnittliches Monatsgehalt Ihrer Einsätze",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q12 Options (WORKER)
  {
    key: 'i18n:question:q12_salaire.options.<1500',
    value: {
      translations: {
        fr: { label: "Moins de 1 500 €", status: "validated" },
        en: { label: "Less than 1,500 €", status: "validated" },
        de: { label: "Weniger als 1.500 €", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_salaire.options.1500-2500',
    value: {
      translations: {
        fr: { label: "1 500-2 500 €", status: "validated" },
        en: { label: "1,500-2,500 €", status: "validated" },
        de: { label: "1.500-2.500 €", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_salaire.options.2500-3500',
    value: {
      translations: {
        fr: { label: "2 500-3 500 €", status: "validated" },
        en: { label: "2,500-3,500 €", status: "validated" },
        de: { label: "2.500-3.500 €", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q12_salaire.options.3500+',
    value: {
      translations: {
        fr: { label: "3 500+ €", status: "validated" },
        en: { label: "3,500+ €", status: "validated" },
        de: { label: "3.500+ €", status: "validated" }
      }
    }
  },

  // Q13 : Manque à gagner (AGENCY)
  {
    key: 'i18n:question:q13_manque_gagner',
    value: {
      translations: {
        fr: {
          label: "Manque à gagner dû aux contraintes du détachement ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Lost revenue due to posting constraints?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Umsatzverlust durch Entsendungseinschränkungen?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q13 Options (AGENCY)
  {
    key: 'i18n:question:q13_manque_gagner.options.non',
    value: {
      translations: {
        fr: { label: "Non, pas vraiment", status: "validated" },
        en: { label: "No, not really", status: "validated" },
        de: { label: "Nein, nicht wirklich", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_manque_gagner.options.faible',
    value: {
      translations: {
        fr: { label: "Oui, faible (< 5% CA)", status: "validated" },
        en: { label: "Yes, low (< 5% revenue)", status: "validated" },
        de: { label: "Ja, gering (< 5% Umsatz)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_manque_gagner.options.moyen',
    value: {
      translations: {
        fr: { label: "Oui, moyen (5-15% CA)", status: "validated" },
        en: { label: "Yes, medium (5-15% revenue)", status: "validated" },
        de: { label: "Ja, mittel (5-15% Umsatz)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_manque_gagner.options.important',
    value: {
      translations: {
        fr: { label: "Oui, important (> 15% CA)", status: "validated" },
        en: { label: "Yes, significant (> 15% revenue)", status: "validated" },
        de: { label: "Ja, erheblich (> 15% Umsatz)", status: "validated" }
      }
    }
  },

  // Q13bis : Satisfaction (CLIENT)
  {
    key: 'i18n:question:q13_satisfaction',
    value: {
      translations: {
        fr: {
          label: "Satisfaction avec vos agences actuelles",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Satisfaction with your current agencies",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Zufriedenheit mit Ihren aktuellen Agenturen",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q13 Options (CLIENT)
  {
    key: 'i18n:question:q13_satisfaction.options.tres_satisfait',
    value: {
      translations: {
        fr: { label: "Très satisfait", status: "validated" },
        en: { label: "Very satisfied", status: "validated" },
        de: { label: "Sehr zufrieden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction.options.satisfait',
    value: {
      translations: {
        fr: { label: "Satisfait", status: "validated" },
        en: { label: "Satisfied", status: "validated" },
        de: { label: "Zufrieden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction.options.neutre',
    value: {
      translations: {
        fr: { label: "Neutre", status: "validated" },
        en: { label: "Neutral", status: "validated" },
        de: { label: "Neutral", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction.options.insatisfait',
    value: {
      translations: {
        fr: { label: "Peu satisfait", status: "validated" },
        en: { label: "Dissatisfied", status: "validated" },
        de: { label: "Unzufrieden", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q13_satisfaction.options.tres_insatisfait',
    value: {
      translations: {
        fr: { label: "Très insatisfait", status: "validated" },
        en: { label: "Very dissatisfied", status: "validated" },
        de: { label: "Sehr unzufrieden", status: "validated" }
      }
    }
  },

  // Q13ter : Satisfaction worker (WORKER)
  {
    key: 'i18n:question:q13_satisfaction_worker',
    value: {
      translations: {
        fr: {
          label: "Satisfaction avec vos agences actuelles",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Satisfaction with your current agencies",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Zufriedenheit mit Ihren aktuellen Agenturen",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Continuer avec les questions restantes...
  // Pour la suite, je vais créer un deuxième fichier ou continuer ici

  // Q18 : Score (ALL)
  {
    key: 'i18n:question:q18_score',
    value: {
      translations: {
        fr: {
          label: "Intérêt pour une plateforme YoJob (0-10)",
          placeholder: "",
          description: "0 = Pas intéressé, 10 = Très intéressé",
          status: "validated"
        },
        en: {
          label: "Interest in a YoJob platform (0-10)",
          placeholder: "",
          description: "0 = Not interested, 10 = Very interested",
          status: "validated"
        },
        de: {
          label: "Interesse an einer YoJob-Plattform (0-10)",
          placeholder: "",
          description: "0 = Nicht interessiert, 10 = Sehr interessiert",
          status: "validated"
        }
      }
    }
  },

  // Q20 : Prix (ALL)
  {
    key: 'i18n:question:q20_prix',
    value: {
      translations: {
        fr: {
          label: "Modèle de tarification préféré",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Preferred pricing model",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Bevorzugtes Preismodell",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q20 Options
  {
    key: 'i18n:question:q20_prix.options.mensuel',
    value: {
      translations: {
        fr: { label: "Abonnement mensuel fixe", status: "validated" },
        en: { label: "Fixed monthly subscription", status: "validated" },
        de: { label: "Festes monatliches Abonnement", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q20_prix.options.usage',
    value: {
      translations: {
        fr: { label: "Pay-as-you-go (à l'usage)", status: "validated" },
        en: { label: "Pay-as-you-go (usage-based)", status: "validated" },
        de: { label: "Pay-as-you-go (nutzungsbasiert)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q20_prix.options.annuel',
    value: {
      translations: {
        fr: { label: "Forfait annuel (réduction)", status: "validated" },
        en: { label: "Annual package (discount)", status: "validated" },
        de: { label: "Jahrespaket (Rabatt)", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q20_prix.options.gratuit',
    value: {
      translations: {
        fr: { label: "Gratuit pour workers", status: "validated" },
        en: { label: "Free for workers", status: "validated" },
        de: { label: "Kostenlos für Arbeiter", status: "validated" }
      }
    }
  },

  // Q22 : MVP (ALL)
  {
    key: 'i18n:question:q22_mvp',
    value: {
      translations: {
        fr: {
          label: "Prêt à tester un MVP (version beta) ?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "Ready to test an MVP (beta version)?",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Bereit, ein MVP (Beta-Version) zu testen?",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q22 Options
  {
    key: 'i18n:question:q22_mvp.options.oui_gratuit',
    value: {
      translations: {
        fr: { label: "Oui, gratuitement", status: "validated" },
        en: { label: "Yes, for free", status: "validated" },
        de: { label: "Ja, kostenlos", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q22_mvp.options.oui_reduc',
    value: {
      translations: {
        fr: { label: "Oui, avec réduction", status: "validated" },
        en: { label: "Yes, with discount", status: "validated" },
        de: { label: "Ja, mit Rabatt", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q22_mvp.options.peut_etre',
    value: {
      translations: {
        fr: { label: "Peut-être, selon features", status: "validated" },
        en: { label: "Maybe, depending on features", status: "validated" },
        de: { label: "Vielleicht, je nach Features", status: "validated" }
      }
    }
  },
  {
    key: 'i18n:question:q22_mvp.options.non',
    value: {
      translations: {
        fr: { label: "Non, pas intéressé", status: "validated" },
        en: { label: "No, not interested", status: "validated" },
        de: { label: "Nein, nicht interessiert", status: "validated" }
      }
    }
  },

  // ============================================
  // SECTION 6 : CONTACT
  // ============================================

  // Q26 : Téléphone (AGENCY & CLIENT)
  {
    key: 'i18n:question:q26_phone',
    value: {
      translations: {
        fr: {
          label: "Téléphone professionnel",
          placeholder: "+33 6 12 34 56 78",
          description: "",
          status: "validated"
        },
        en: {
          label: "Professional phone",
          placeholder: "+33 6 12 34 56 78",
          description: "",
          status: "validated"
        },
        de: {
          label: "Geschäftstelefon",
          placeholder: "+33 6 12 34 56 78",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q27 : Prénom (ALL)
  {
    key: 'i18n:question:q27_firstname',
    value: {
      translations: {
        fr: {
          label: "Prénom",
          placeholder: "Votre prénom",
          description: "",
          status: "validated"
        },
        en: {
          label: "First name",
          placeholder: "Your first name",
          description: "",
          status: "validated"
        },
        de: {
          label: "Vorname",
          placeholder: "Ihr Vorname",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q28 : Nom (ALL)
  {
    key: 'i18n:question:q28_lastname',
    value: {
      translations: {
        fr: {
          label: "Nom",
          placeholder: "Votre nom",
          description: "",
          status: "validated"
        },
        en: {
          label: "Last name",
          placeholder: "Your last name",
          description: "",
          status: "validated"
        },
        de: {
          label: "Nachname",
          placeholder: "Ihr Nachname",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Q29 : SIRET (AGENCY & CLIENT)
  {
    key: 'i18n:question:q29_siret',
    value: {
      translations: {
        fr: {
          label: "SIRET ou SIREN (optionnel)",
          placeholder: "123 456 789 00012",
          description: "Pour enrichissement via Pappers/Société.com",
          status: "validated"
        },
        en: {
          label: "SIRET or SIREN (optional)",
          placeholder: "123 456 789 00012",
          description: "For enrichment via Pappers/Société.com",
          status: "validated"
        },
        de: {
          label: "SIRET oder SIREN (optional)",
          placeholder: "123 456 789 00012",
          description: "Zur Anreicherung über Pappers/Société.com",
          status: "validated"
        }
      }
    }
  },

  // Email (ALL)
  {
    key: 'i18n:question:email',
    value: {
      translations: {
        fr: {
          label: "Email",
          placeholder: "votre.email@exemple.com",
          description: "",
          status: "validated"
        },
        en: {
          label: "Email",
          placeholder: "your.email@example.com",
          description: "",
          status: "validated"
        },
        de: {
          label: "E-Mail",
          placeholder: "ihre.email@beispiel.com",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Autorisation contact (ALL)
  {
    key: 'i18n:question:autorise_contact',
    value: {
      translations: {
        fr: {
          label: "J'accepte d'être recontacté",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "I agree to be contacted",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Ich bin damit einverstanden, kontaktiert zu werden",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },

  // Rapport (ALL)
  {
    key: 'i18n:question:souhaite_rapport',
    value: {
      translations: {
        fr: {
          label: "Je souhaite recevoir le rapport d'étude",
          placeholder: "",
          description: "",
          status: "validated"
        },
        en: {
          label: "I want to receive the study report",
          placeholder: "",
          description: "",
          status: "validated"
        },
        de: {
          label: "Ich möchte den Studienbericht erhalten",
          placeholder: "",
          description: "",
          status: "validated"
        }
      }
    }
  },
];

/**
 * 🚀 ROUTE POUR SEED TOUTES LES TRADUCTIONS
 */
export async function seedAllFormsTranslations(c: Context) {
  try {
    console.log('🌱 Starting complete translations seed...');
    
    let created = 0;
    let updated = 0;
    let errors = 0;

    // Fusionner les 2 parties
    const allSeedData = [...COMPLETE_SEED_DATA, ...SEED_DATA_PART2];
    console.log(`📦 Total items to seed: ${allSeedData.length}`);

    for (const item of allSeedData) {
      try {
        // Vérifier si la clé existe déjà
        const existing = await kv.get(item.key);
        
        if (existing) {
          // Fusionner avec les traductions existantes
          const merged = {
            translations: {
              ...existing.translations,
              ...item.value.translations
            }
          };
          await kv.set(item.key, merged);
          updated++;
          console.log(`  ✅ Updated: ${item.key}`);
        } else {
          // Créer nouvelle entrée
          await kv.set(item.key, item.value);
          created++;
          console.log(`  ➕ Created: ${item.key}`);
        }
      } catch (error: any) {
        errors++;
        console.error(`  ❌ Error for ${item.key}:`, error.message);
      }
    }

    const summary = {
      success: true,
      total: COMPLETE_SEED_DATA.length,
      created,
      updated,
      errors,
      timestamp: new Date().toISOString()
    };

    console.log('✅ Seed completed:', summary);

    return c.json(summary);

  } catch (error: any) {
    console.error('❌ Seed failed:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}
