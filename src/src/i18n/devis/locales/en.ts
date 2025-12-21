/**
 * 🇬🇧 ENGLISH TRANSLATIONS - QUOTE REQUEST FORM
 * 
 * Full English translations for the quote form
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import type { DevisTranslations } from '../types';

export const en: DevisTranslations = {
  // === COMMON ===
  common: {
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    required: "*",
    optional: "(optional)",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    euro: "€",
    perHour: "/hr",
    perMonth: "/month",
    perDay: "/day",
    persons: "person(s)",
    hours: "hour(s)",
    days: "day(s)",
    months: "months",
    year: "year(s)",
  },

  // === NAVIGATION ===
  navigation: {
    back: "Back",
    stepOf: "Step {step} of {total}",
    steps: {
      entreprise: {
        title: "Company",
        badge: "🏢 Your company",
      },
      contact: {
        title: "Contact",
        badge: "👤 Your contact",
      },
      besoins: {
        title: "Requirements",
        badge: "💼 Your needs",
      },
      conditions: {
        title: "Conditions",
        badge: "📋 Conditions",
      },
      candidats: {
        title: "Candidates",
        badge: "👷 Profile needed",
      },
      recapitulatif: {
        title: "Summary",
        badge: "✅ Summary",
      },
    },
  },

  // === VALIDATION ===
  validation: {
    fillRequired: "Please fill in all required fields",
    selectRegion: "Please select a region",
    addAtLeastOnePosition: "Please add at least one position",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    invalidSIRET: "Please enter a valid SIRET number (14 digits)",
    dateRequired: "Please enter the start date",
    missionLocationRequired: "Please enter the mission location",
  },

  // === MESSAGES ===
  messages: {
    success: {
      quoteSent: "Quote sent successfully!",
      redirecting: "Redirecting...",
    },
    error: {
      submitError: "Error sending quote",
      genericError: "An error occurred",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Request a quote | YOJOB",
    pageDescription: "Request a quote for your European temporary staffing needs.",
  },

  // === STEP 1: COMPANY ===
  step1: {
    title: "Company Information",
    subtitle: "Enter your company's legal information.",
    fields: {
      pays: {
        label: "Country",
        placeholder: "Select a country",
      },
      raisonSociale: {
        label: "Company Name",
        placeholder: "e.g. YOJOB Ltd",
      },
      siret: {
        label: "Company Registration Number",
        placeholder: "Registration number",
        helper: "Your business registration identifier",
      },
      codeAPE: {
        label: "Business Activity Code",
        placeholder: "e.g. 7830Z",
      },
      tvaIntracommunautaire: {
        label: "VAT Number",
        placeholder: "e.g. GB123456789",
      },
      adresse: {
        label: "Full Address",
        placeholder: "Street number and name",
      },
      codePostal: {
        label: "Postal Code",
        placeholder: "e.g. SW1A 1AA",
      },
      ville: {
        label: "City",
        placeholder: "e.g. London",
      },
      region: {
        label: "Region/State",
        placeholder: "Select a region",
        placeholderOtherCountry: "e.g. Bavaria, Catalonia, Lombardy...",
      },
      siteInternet: {
        label: "Website",
        placeholder: "https://www.example.com",
      },
    },
    infoMessage: "✓ This information will be used to generate your personalized quote",
  },

  // === STEP 2: CONTACT ===
  step2: {
    title: "Contact Person",
    subtitle: "Who will be the main contact for this project?",
    fields: {
      civilite: {
        label: "Title",
        options: {
          m: "Mr.",
          mme: "Ms.",
        },
      },
      nom: {
        label: "Last Name",
        placeholder: "e.g. Smith",
      },
      prenom: {
        label: "First Name",
        placeholder: "e.g. John",
      },
      fonction: {
        label: "Job Title",
        placeholder: "e.g. HR Manager",
      },
      email: {
        label: "Professional Email",
        placeholder: "john.smith@company.com",
      },
      telephone: {
        label: "Phone Number",
        placeholder: "+44 20 1234 5678",
      },
    },
  },

  // === STEP 3: REQUIREMENTS ===
  step3: {
    title: "Define Your Requirements",
    subtitle: "Describe precisely the positions you are looking for.",
    fields: {
      secteur: {
        label: "Industry Sector",
        placeholder: "Select a sector",
      },
      convention: {
        label: "Collective Agreement",
        placeholder: "Automatic based on sector",
      },
      poste: {
        label: "Position",
        placeholder: "Select a position",
      },
      classification: {
        label: "Classification / Qualification",
        placeholder: "Select a classification",
      },
      quantite: {
        label: "Number of People",
        placeholder: "e.g. 5",
        helper: "How many people for this position?",
      },
      salaireBrut: {
        label: "Monthly Gross Salary",
        placeholder: "e.g. 2500",
        helper: "Gross salary based on 151.67h/month",
      },
      nationalite: {
        label: "Worker Nationality",
        placeholder: "Select a country",
        helper: "Nationality impacts the agency pricing coefficient",
      },
    },
    ajouterPoste: "Add Another Position",
    supprimerPoste: "Remove This Position",
    posteNumero: "Position",
    coefficientInfo: {
      title: "💡 Applied Agency Coefficient",
      base: "Base coeff.",
      facteurPays: "Country factor",
      final: "Final coefficient",
    },
  },

  // === STEP 4: CONDITIONS ===
  step4: {
    title: "Working Conditions",
    subtitle: "Specify employment conditions and benefits offered.",
    fields: {
      dateDebut: {
        label: "Desired Start Date",
        placeholder: "DD/MM/YYYY",
      },
      dateFin: {
        label: "Expected End Date",
        placeholder: "DD/MM/YYYY",
        helper: "Leave blank if indefinite duration",
      },
      baseHoraire: {
        label: "Monthly Hours",
        placeholder: "e.g. 151.67",
        helper: "Legal base in France: 151.67h/month (35h/week)",
      },
      lieuxMission: {
        label: "Assignment Locations",
        placeholder: "e.g. Paris 15th, Lyon 3rd, Marseille...",
      },
    },
    sections: {
      hebergement: {
        title: "Accommodation",
        chargeEU: {
          label: "Accommodation provided by client company",
          helper: "If NO: hourly supplement of +€3.50/hr will be charged by the agency",
          options: {
            oui: "Yes, provided by client",
            non: "No, agency's responsibility",
          },
        },
        detailsEU: {
          type: {
            label: "Type of Accommodation",
            options: {
              hotel: "Hotel",
              appartement: "Apartment",
              foyer: "Hostel",
              autre: "Other",
            },
          },
          adresse: {
            label: "Accommodation Address",
            placeholder: "Full address",
          },
        },
      },
      transportInternational: {
        title: "International Transport (home country ↔ France)",
        chargeEU: {
          label: "Transport provided by client company",
          helper: "Travel between home country and assignment location",
          options: {
            oui: "Yes, provided by client",
            non: "No, worker's responsibility",
          },
        },
        detailsEU: {
          type: {
            label: "Type of Transport",
            options: {
              avion: "Plane",
              train: "Train",
              bus: "Bus/Coach",
              covoiturage: "Organized carpooling",
            },
          },
          frequence: {
            label: "Trip Frequency",
            options: {
              allerRetour: "Initial round trip only",
              hebdomadaire: "Weekly",
              mensuel: "Monthly",
            },
          },
        },
      },
      transportLocal: {
        title: "Local Transport (at assignment location)",
        chargeETT: {
          label: "Local transport provided by agency",
          helper: "If YES: hourly supplement of +€1.50/hr will be charged",
          options: {
            oui: "Yes, provided by agency",
            non: "No",
          },
        },
        detailsETT: {
          type: {
            label: "Type of Transport",
            options: {
              vehicule: "Service vehicle",
              transport: "Public transport pass",
              velo: "Bike/Scooter",
            },
          },
        },
      },
      repas: {
        title: "Meals",
        type: {
          label: "Meal Solution",
          options: {
            restaurant: "Company restaurant / Meal vouchers",
            panier: "Packed lunch (billed per day)",
            nonConcerne: "Not applicable",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Daily Budget",
            placeholder: "e.g. 12.00",
          },
        },
        detailsPanier: {
          info: "Packed lunch will be billed separately per working day according to the home country's rate",
        },
      },
    },
  },

  // === STEP 5: CANDIDATES ===
  step5: {
    title: "Candidate Profile",
    subtitle: "Define specific skills and requirements.",
    sections: {
      experience: {
        title: "Professional Experience",
        annees: {
          label: "Minimum Years of Experience",
          placeholder: "Select a level",
          options: {
            '0-1': "Beginner (0-1 year)",
            '1-3': "Intermediate (1-3 years)",
            '3-5': "Experienced (3-5 years)",
            '5+': "Expert (5+ years)",
          },
        },
        competences: {
          label: "Required Technical Skills",
          placeholder: "e.g. Masonry, formwork, blueprint reading, TIG welding...",
        },
      },
      langues: {
        title: "Language Skills",
        francais: {
          label: "Required French Level",
          placeholder: "Select a level",
          options: {
            a1: "A1 - Beginner",
            a2: "A2 - Elementary",
            b1: "B1 - Intermediate",
            b2: "B2 - Upper Intermediate",
            c1: "C1 - Advanced",
            c2: "C2 - Proficient",
            natif: "Native speaker",
          },
        },
        autres: {
          label: "Other Useful Languages",
          placeholder: "e.g. English (B1), German (A2)...",
        },
      },
      permis: {
        title: "Driving License",
        requis: {
          label: "Required License",
          options: {
            aucun: "No license required",
            b: "License B (car)",
            c: "License C (truck)",
            ce: "License CE (truck + trailer)",
            d: "License D (passenger transport)",
          },
        },
      },
      epi: {
        title: "Personal Protective Equipment (PPE)",
        fournis: {
          label: "PPE provided by company",
          helper: "Helmet, safety shoes, gloves, etc.",
          options: {
            oui: "Yes, provided by client",
            non: "No, worker's responsibility",
          },
        },
        liste: {
          label: "List of Required PPE",
          placeholder: "e.g. Helmet, S3 safety shoes, cut-resistant gloves, harness...",
        },
      },
      autresExigences: {
        title: "Other Requirements",
        label: "Additional Specific Requirements",
        placeholder: "e.g. Electrical certifications, forklift license, weekend availability, working at heights...",
      },
    },
  },

  // === SUMMARY ===
  recapitulatif: {
    title: "Summary of Your Request",
    subtitle: "Review the information before submitting your quote request.",
    acceptConditionsError: "Please accept the conditions before proceeding",
    entreprise: {
      title: "Company",
      raisonSociale: "Company Name",
      siret: "Registration Number",
      pays: "Country",
      ville: "City",
      region: "Region/State",
    },
    contact: {
      title: "Contact",
      nomPrenom: "Name",
      email: "Email",
      telephone: "Phone",
      fonction: "Job Title",
    },
    postes: {
      title: "Requested Positions",
      coeffETT: "📊 Applied Agency Coefficient",
      coeffBase: "Base coeff.",
      facteurPays: "Country factor",
      supplementsHoraires: "✨ Hourly Supplements (included in rate)",
      hebergement: "✓ Accommodation",
      transport: "✓ Local transport",
      panierRepas: "🍽️ Packed lunch (billed per day)",
      baseHoraire: "📅 Monthly hours: {heures}h/month (overtime detected)",
      heuresNormales: "Standard hours (0-35h/wk)",
      heuresSup25: "Overtime +25% (36th-43rd hr)",
      heuresSup50: "Overtime +50% (44th+ hr)",
      sousTotal: "Labor subtotal (per person)",
      tauxHoraireBrut: "Gross hourly rate",
      tauxETTFinal: "Final agency rate",
      coutMensuel: "Total monthly cost",
    },
    conditions: {
      title: "Assignment Conditions",
      dateDebut: "Start date",
      dateFin: "End date",
      dureeEstimee: "Estimated duration",
      lieuMission: "Assignment location",
      mois: "months",
    },
    totaux: {
      mensuelHT: "Monthly Total (excl. VAT)",
      mensuelTTC: "Monthly Total (incl. VAT)",
      totalMission: "Total Assignment Cost",
    },
    noteLegale: "ℹ️ This estimate is indicative. The final price will be confirmed after validation by our team and the selected partner agency.",
    acceptConditions: {
      text: "I agree that my data will be processed in accordance with the",
      lien: "privacy policy",
    },
    boutonEnvoi: {
      texte: "Submit My Quote Request",
      enCours: "Sending...",
    },
    footer: "✓ Response within 24 business hours • ✓ No commitment",
  },

  // === ERRORS ===
  errors: {
    required: "This field is required",
    invalidEmail: "Invalid email address",
    invalidSIRET: "Invalid registration number",
    invalidPhone: "Invalid phone number",
    minValue: "Value must be greater than or equal to {min}",
    maxValue: "Value must be less than or equal to {max}",
    genericError: "An error occurred. Please try again.",
    loadingError: "Error loading data",
    submitError: "Error submitting request",
  },
};