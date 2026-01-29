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
    summary: {
      title: "Employee Compensation",
      salaireBrutMensuel: "Gross monthly salary",
      tauxHoraireBrut: "Gross hourly rate",
      baseMensuelle: "(Base 151.67h/month according to collective agreement)",
    },
  },

  // === STEP 4: CONDITIONS ===
  step4: {
    title: "Working Conditions",
    subtitle: "Specify employment conditions and benefits offered.",
    dateError: "End date must be after start date",
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
      periodeEssai: {
        label: "Trial Period",
        placeholder: "Select a duration",
        options: {
          '2': '2 days',
          '3': '3 days',
          '5': '5 days',
          '15': '15 days',
        },
      },
      motifRecours: {
        label: "Reason for Using Temporary Staffing",
        placeholder: "Select a reason",
        options: {
          accroissement: "Temporary increase in activity",
          remplacement: "Replacement of absent employee",
          saisonnier: "Seasonal work",
          exportation: "Exceptional export order",
          autre: "Other (please specify)",
        },
      },
      delaiPaiement: {
        label: "Desired Payment Terms",
        placeholder: "Select a payment term",
        options: {
          reception: "Payment upon receipt",
          j30: "30 days",
          j45: "45 days",
          j60: "60 days",
        },
      },
    },
    hebergement: {
      title: "Accommodation",
      chargeEU: {
        label: "Accommodation provided by client company",
        helper: "If NO: hourly supplement of +€3.50/hr will be charged by the agency",
      },
      supplementWarning: "⚠️ A supplement of +€3.50/hr will be applied as accommodation is not provided",
      commentaire: {
        label: "Accommodation details",
        placeholder: "Type of accommodation, address, special conditions...",
      },
    },
    transport: {
      title: "Local Transport",
      chargeETT: {
        label: "Local transport provided by agency",
        helper: "If YES: hourly supplement of +€1.50/hr will be charged",
      },
      supplementInfo: "✓ A supplement of +€1.50/hr will be applied to cover local transport costs",
    },
    repas: {
      title: "Meals",
      options: {
        restaurant: "Company restaurant / Meal vouchers",
        panier: "Packed lunch (billed per day)",
        nonConcerne: "Not applicable",
      },
      montantInfo: "📋 Packed lunch amount: {montant} / working day (billed separately)",
      montantNonDefini: "⚠️ Amount not defined for this country/region",
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
        obligatoire: {
          label: "Required Experience",
        },
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
      formation: {
        title: "Training",
        obligatoire: {
          label: "Required Training",
        },
        type: {
          label: "Type of Training",
          placeholder: "e.g. Masonry Certificate, Forklift License...",
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
        // Language names
        languageNames: {
          francais: "French",
          anglais: "English",
          portugais: "Portuguese",
          espagnol: "Spanish",
          italien: "Italian",
          autre: "Other",
        },
        // Language levels
        levels: {
          'non-requis': "Not required",
          'A1': "A1 - Beginner",
          'A2': "A2 - Elementary",
          'B1': "B1 - Intermediate",
          'B2': "B2 - Advanced",
          'C1': "C1 - Autonomous",
          'C2': "C2 - Proficient",
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
        categorie: {
          label: "License category",
          placeholder: "e.g. B, C, CE...",
        },
      },
      outillage: {
        title: "Small tools",
        requis: {
          label: "Personal tools required",
        },
        type: {
          label: "Type of tools",
          placeholder: "e.g. Hammer, level, measuring tape, trowel...",
        },
      },
      epi: {
        title: "Personal Protective Equipment (PPE)",
        infoLegale: "ℹ️ According to regulations, the employer must provide PPE adapted to job hazards.",
        selectionCount: "✓ {count} PPE selected",
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
        // PPE items
        items: {
          casque: "Safety helmet",
          lunettes: "Safety glasses",
          protections_auditives: "Hearing protection",
          gants: "Protective gloves",
          chaussures: "Safety shoes",
          harnais: "Safety harness",
          vetements: "Work clothing",
          masque: "Respiratory mask",
          protection_faciale: "Face protection",
          vetements_visibilite: "High visibility clothing",
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
    majorations: {
      title: "Applied Adjustments",
      total: "Total Adjustments",
      notSet: "Not specified",
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

  // === SECTORS & PROFESSIONS ===
  secteurs: {
    batiment: {
      label: "Construction",
      convention: "National collective agreement for construction workers (3193)",
      postes: {
        macon: "Mason",
        coffreur: "Form worker",
        ferrailleur: "Steel fixer",
        carreleur: "Tiler",
        platrier: "Plasterer",
        peintre: "Painter",
        plombier: "Plumber",
        electricien: "Electrician",
        couvreur: "Roofer",
        menuisier: "Carpenter",
        chef_equipe_batiment: "Team leader",
        chef_chantier: "Site manager",
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
      label: "Metallurgy",
      convention: "Metallurgy collective agreement (3109)",
      postes: {
        soudeur: "Welder",
        chaudronnier: "Boilermaker",
        tuyauteur: "Pipe fitter",
        tourneur: "Turner",
        fraiseur: "Milling machine operator",
        usineur: "Machinist",
        mecanicien_industriel: "Industrial mechanic",
        monteur: "Assembler",
        controleur_qualite: "Quality controller",
        ajusteur: "Fitter",
        chef_equipe_metallurgie: "Team leader",
      },
      classifications: {
        niveau_1: "Level I",
        niveau_2: "Level II",
        niveau_3: "Level III",
        niveau_4: "Level IV",
        niveau_5: "Level V",
      },
    },
    tp: {
      label: "Public Works",
      convention: "National collective agreement for public works (3005)",
      postes: {
        conducteur_engins: "Heavy equipment operator",
        terrassier: "Excavator",
        canalisateur: "Pipe layer",
        constructeur_routes: "Road builder",
        coffreur_bancheur: "Formwork carpenter",
        macon_vrd: "VRD mason",
        chef_equipe_tp: "Public works team leader",
        manoeuvre_tp: "Public works laborer",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotel Industry",
      convention: "Hotel and catering collective agreement (3292)",
      postes: {
        receptionniste: "Receptionist",
        femme_chambre: "Housekeeper",
        agent_entretien: "Maintenance worker",
        bagagiste: "Porter",
        concierge: "Concierge",
        night_audit: "Night auditor",
        gouvernante: "Head housekeeper",
        chef_reception: "Front desk manager",
      },
      classifications: {
        niveau_1: "Level I",
        niveau_2: "Level II",
        niveau_3: "Level III",
        niveau_4: "Level IV",
        niveau_5: "Level V",
      },
    },
    restauration: {
      label: "Catering",
      convention: "Hotel and catering collective agreement (3292)",
      postes: {
        cuisinier: "Cook",
        commis_cuisine: "Kitchen assistant",
        chef_partie: "Chef de partie",
        serveur: "Waiter",
        barman: "Bartender",
        plongeur: "Dishwasher",
        chef_rang: "Head waiter",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Head chef",
      },
      classifications: {
        niveau_1: "Level I",
        niveau_2: "Level II",
        niveau_3: "Level III",
        niveau_4: "Level IV",
        niveau_5: "Level V",
      },
    },
    plasturgie: {
      label: "Plastics Industry",
      convention: "Plastics industry collective agreement (0292)",
      postes: {
        operateur_injection: "Injection operator",
        operateur_extrusion: "Extrusion operator",
        regleur: "Setter",
        operateur_thermoformage: "Thermoforming operator",
        controleur_qualite_plasturgie: "Quality controller",
        technicien_maintenance: "Maintenance technician",
        chef_equipe_plasturgie: "Team leader",
      },
      classifications: {
        niveau_1: "Level I",
        niveau_2: "Level II",
        niveau_3: "Level III",
        niveau_4: "Level IV",
      },
    },
    automobile_carrosserie: {
      label: "Automotive & Bodywork",
      convention: "Automotive repair collective agreement (1090)",
      postes: {
        carrossier: "Panel beater",
        peintre_automobile: "Automotive painter",
        mecanicien_auto: "Auto mechanic",
        electricien_auto: "Auto electrician",
        chef_atelier: "Workshop manager",
        controleur_technique: "Vehicle inspector",
      },
      classifications: {
        niveau_1: "Level I",
        niveau_2: "Level II",
        niveau_3: "Level III",
        niveau_4: "Level IV",
      },
    },
    sylviculture: {
      label: "Forestry",
      convention: "Agriculture collective agreement (7501)",
      postes: {
        bucheron: "Lumberjack",
        elagueur: "Tree pruner",
        conducteur_engins_forestiers: "Forestry equipment operator",
        chef_equipe_sylviculture: "Forestry team leader",
      },
      classifications: {
        niveau_1: "Level I",
        niveau_2: "Level II",
        niveau_3: "Level III",
        niveau_4: "Level IV",
      },
    },
    cartonnerie: {
      label: "Cardboard Industry",
      convention: "Processing industry collective agreement (3107)",
      postes: {
        operateur_production: "Production operator",
        conducteur_ligne: "Line operator",
        regleur_cartonnerie: "Setter",
        chef_equipe_cartonnerie: "Team leader",
      },
      classifications: {
        niveau_1: "Level I",
        niveau_2: "Level II",
        niveau_3: "Level III",
        niveau_4: "Level IV",
      },
    },
    autre: {
      label: "Other",
      convention: "To be defined according to activity",
      postes: {
        autre_poste: "Other position (to be specified)",
      },
      classifications: {
        a_definir: "To be defined",
      },
    },
  },

  // === QUOTE SUMMARY PAGE (SIGNATURE) ===
  pageRecap: {
    header: {
      title: "Quote Summary",
      exportPDF: "Export PDF",
      apercuImpression: "Preview & Print",
      loading: "Loading quote...",
      notFound: "Quote not found",
    },
    statut: {
      signe: "Signed",
      nouveau: "New",
    },
    dates: {
      creeLe: "Created on",
      a: "at",
      signeLe: "Signed on",
      derniereModification: "Last modified:",
    },
    tooltips: {
      signezPourPDF: "Sign your quote to unlock the official PDF",
      signezMaintenant: "Sign now to receive your official PDF",
      documentDisponible: "The document will be available immediately after signing",
      pdfDebloque: "PDF unlocked!",
      telechargerPDF: "You can now download your official quote at the top of the page",
    },
    modales: {
      apercu: {
        title: "Quote Preview",
        imprimer: "Print / Save as PDF",
      },
      cgv: {
        title: "Terms and Conditions of Sale",
      },
    },
    print: {
      courtage: "European recruitment brokerage",
      documentGenere: "Document generated on",
    },
    entreprise: {
      title: "Company Information",
      raisonSociale: "Company name",
      siret: "Company registration number",
      codeAPE: "Business code",
      tvaIntracommunautaire: "VAT number",
      adresse: "Address",
      siteInternet: "Website",
    },
    contact: {
      title: "Contact Person",
      nomComplet: "Full name",
      fonction: "Job title",
      email: "Email",
      telephonePortable: "Mobile phone",
      telephoneFixe: "Landline",
    },
    postes: {
      title: "Positions to Fill",
      nationalite: "Nationality",
      salaireBrut: "Gross salary",
      tauxHoraireBrut: "Gross hourly rate",
      coefficientETT: "Staffing agency coefficient",
      tauxETT: "Staffing agency rate",
    },
    conditions: {
      title: "Working Conditions",
      dateDebut: "Start date",
      dateFin: "End date",
      periodeEssai: "Trial period",
      baseHoraire: "Hourly base",
      heuresMois: "h/month",
      lieuxMission: "Assignment locations",
      motifRecours: "Reason for temporary work",
    },
    candidats: {
      title: "Candidate Profile",
      experience: "Experience",
      ansMinimum: "years minimum",
      formation: "Education",
      permis: "Driver's license",
      langues: "Languages",
    },
    signature: {
      title: "Electronic Signature",
      subtitle: "Sign your quote online securely",
      commencer: "Start signing",
      identiteSignataire: "Signatory identity",
      nomComplet: "Full name",
      fonction: "Job title",
      email: "Email",
      entreprise: "Company",
      siret: "Company registration number",
      signataire: "Signatory",
      tracabilite: "Technical traceability",
      dateHeure: "Date and time",
      adresseIP: "IP address",
      navigateur: "Browser",
      signatureManuscrite: "Handwritten signature",
      infoLegale: "🔒 This information will be recorded in the electronic signature certificate to ensure traceability and legal compliance according to eIDAS Regulation (EU) No 910/2014.",
      dessinerSignature: "Draw your signature below",
      effacer: "Clear",
      accepteCGV: "I accept the",
      cgvLien: "Terms and Conditions of Sale",
      accepteCGVSuite: "and certify that the information provided is accurate. This electronic signature has the same legal value as a handwritten signature.",
      annuler: "Cancel",
      validerSigner: "Validate and sign",
      signatureEnCours: "Signing in progress...",
      erreurSignatureVide: "Please sign before validating",
      erreurCGV: "Please accept the Terms and Conditions",
    },
  },
};