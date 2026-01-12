/**
 * 🇬🇧 ENGLISH TRANSLATIONS - TERMS AND CONDITIONS OF SALE (TCS)
 * 
 * @version 1.0.0
 */

export const cgvEN = {
  hero: {
    badge: "B2B Document - Contractual",
    title: "Terms and Conditions of Sale",
    subtitle: "TCS applicable to User Companies (UC) and partner Temporary Employment Agencies (TEA)",
    effectiveDate: "Version in effect since December 19, 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Intermediary / Commercial broker"
    },
    eu: {
      title: "User Company (UC)",
      description: "End customer receiving the workforce"
    },
    ett: {
      title: "TEA Agency",
      description: "Partner carrying out recruitment"
    }
  },

  sections: {
    article0: {
      title: "Article 0 - Service Provider Identity",
      fields: {
        legalForm: "Legal form",
        legalFormValue: "Sole Proprietorship (EI)",
        manager: "Manager",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "VAT number",
        vatValue: "FR79447862764",
        address: "Registered address",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Contact",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Professional Liability Insurance",
        description: "YOJOB has professional liability insurance covering the financial consequences of its liability for its services."
      }
    },

    article1: {
      title: "Article 1 - Definitions",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Intermediary/commercial broker ensuring prospecting, qualification, coordination and formalization of commercial proposals between UC and TEA."
        },
        eu: {
          term: "User Company (UC)",
          definition: "End customer company receiving the workforce made available by a partner TEA."
        },
        ett: {
          term: "TEA / Partner Agency",
          definition: "Temporary employment agency carrying out recruitment, contracting and organization of personnel provision."
        },
        profile: {
          term: "Profile",
          definition: "Candidate or temporary worker presented by a TEA to a UC via YOJOB's intermediation."
        },
        mission: {
          term: "Mission",
          definition: "Recruitment need expressed by the UC (profession, volume, dates, site, specific constraints)."
        },
        proposition: {
          term: "Tripartite proposal",
          definition: "Commercial and administrative proposal structured by YOJOB and validated by the UC and TEA (signature or written agreement)."
        },
        handover: {
          term: "Handover",
          definition: "Moment when the TEA becomes the UC's main contact after double UC + TEA validation."
        },
        insurer: {
          term: "Credit insurer",
          definition: "Credit insurance organization (COFACE, Allianz Trade, etc.) involved in customer risk analysis and credit limit granting."
        }
      }
    },

    article2: {
      title: "Article 2 - Purpose",
      intro: "These TCS govern YOJOB's services consisting mainly of:",
      steps: {
        step1: {
          title: "Prospect and qualify",
          description: "Identify and qualify User Companies with European recruitment needs"
        },
        step2: {
          title: "Present opportunities",
          description: "Transmit qualified opportunities to corresponding partner TEAs"
        },
        step3: {
          title: "Structure the proposal",
          description: "Develop a detailed commercial proposal (scope, coordination, administrative elements)"
        },
        step4: {
          title: "Organize handover",
          description: "Ensure transition to TEA after signature for execution (recruitment, provision, invoicing)"
        }
      },
      yojobRole: {
        title: "YOJOB's role",
        description: "YOJOB acts exclusively as an intermediary. The TEA is responsible for recruitment, provision, employer compliance and invoicing to the UC, unless expressly stipulated otherwise in the contract."
      }
    },

    article3: {
      title: "Article 3 - Contractual documents and hierarchy",
      intro: "In case of contradiction between documents, the following priority order applies:",
      hierarchy: {
        rank1: {
          title: "Specific contract / Specific conditions",
          subtitle: "Customized partnership or business referral"
        },
        rank2: {
          title: "Tripartite proposal / Quote / Purchase order",
          subtitle: "Document signed by the parties"
        },
        rank3: {
          title: "Terms and Conditions of Sale (TCS)",
          subtitle: "This document"
        },
        rank4: {
          title: "Appendices",
          subtitle: "SLA, DPA, process, checklists, etc."
        }
      }
    },

    article4: {
      title: "Article 4 - Contractual schemes",
      intro: "The applicable scheme is specified in the proposal or contract. YOJOB can intervene according to 3 models:",
      schemes: {
        schemaB: {
          label: "Scheme B",
          badge: "Main",
          title: "TEA client of YOJOB",
          description: "YOJOB is remunerated by the TEA for business referral (monthly commission and/or success fee)"
        },
        schemaA: {
          label: "Scheme A",
          badge: "Optional",
          title: "UC client of YOJOB",
          description: "YOJOB invoices the UC for additional services (enhanced coordination, extended documentary assistance)"
        },
        schemaC: {
          label: "Scheme C",
          badge: "Mixed",
          title: "Combined remuneration",
          description: "YOJOB is remunerated by the TEA (Scheme B) AND invoices additional services to the UC (Scheme A)"
        }
      }
    },

    article5: {
      title: "Article 5 - Process and handover",
      phase1: {
        title: "5.1 Upstream phase (commercial & coordination)",
        intro: "YOJOB ensures:",
        items: [
          "Prospecting and qualification of the User Company",
          "Collection of elements necessary for the Mission",
          "Transmission of the need to one or more partner TEAs",
          "Coordination until finalization of the tripartite proposal"
        ]
      },
      phase2: {
        title: "5.2 Handover trigger",
        intro: "The \"handover\" occurs upon meeting two cumulative conditions:",
        conditions: [
          "UC signature/written agreement on the proposal",
          "TEA acceptance/validation (capacity, conditions, compliance, risk)"
        ],
        consequences: "From this point, the TEA becomes the main contact for: recruitment, contracts, onboarding, provision, payroll, posting obligations, invoicing and UC collection."
      },
      phase3: {
        title: "5.3 Residual assistance (if provided)",
        description: "YOJOB may remain in support (coordination/quality) within the scope agreed in the proposal or contract."
      }
    },

    article6: {
      title: "Article 6 - Financial conditions and payment terms",
      section1: {
        title: "6.1 Principle: \"selective\" deadlines on a case-by-case basis",
        intro: "Given sector practices (credit insurance, customer risk, invoicing organization), payment terms are defined case by case in the applicable proposal/contract.",
        modalitiesTitle: "The modalities may include:",
        modalities: [
          "Payment on receipt",
          "Advance payment / deposit",
          "Weekly invoicing",
          "Guarantees (deposit, credit limit limitation)"
        ],
        legalLimit: "When a \"deferred\" payment term is granted, it respects legal caps: 60 days from invoice date, or 45 days end of month if stipulated."
      },
      section2: {
        title: "6.2 Standard grid — UC \"at risk\"",
        intro: "Risk classification is determined from 3 cumulative sources:",
        sources: {
          insurer: {
            title: "Credit insurer",
            description: "Coverage/credit limit/conditions"
          },
          score: {
            title: "TEA internal score",
            description: "Risk & collection policy"
          },
          history: {
            title: "Payment history",
            description: "Behavior & exposure"
          }
        },
        primacy: "Primacy: in case of contradiction, the credit insurer's decision prevails over other signals.",
        levelsTitle: "Risk levels & payment conditions",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Insurer: covered / credit limit OK; TEA Score: A/B; History: good (0 incident)",
            conditions: "Monthly + negotiated deadline (e.g. 30d) within legal limit",
            safeguards: "Standard credit limit"
          },
          r1: {
            level: "R1",
            title: "Monitored",
            trigger: "Insurer: limited credit limit; TEA Score: B/C; History: moderate delays",
            conditions: "On receipt OR 30-50% deposit + balance on receipt",
            safeguards: "Capped credit limit + weekly review"
          },
          r2: {
            level: "R2",
            title: "Enhanced",
            trigger: "Insurer: insufficient partial coverage; TEA Score: C/D; History: significant delays",
            conditions: "Weekly on receipt OR 50-70% deposit + weekly adjustment",
            safeguards: "Start in batches (limited volume)"
          },
          r3: {
            level: "R3",
            title: "Critical",
            trigger: "Insurer: REFUSAL / uninsurable; TEA Score: D; History: major incidents",
            conditions: "100% advance payment (or refusal to start)",
            safeguards: "Start conditional on payment; stop if deviation"
          }
        },
        transparency: {
          title: "Transparency & acceptance",
          description: "The tripartite proposal specifies the level (R0/R1/R2/R3), invoicing method and payment condition. Signature/acceptance of the proposal constitutes acceptance of these terms."
        },
        adjustment: {
          title: "Dynamic adjustment clause",
          description: "In case of risk evolution (insurer credit limit decrease, delays, incidents), the TEA may revise payment conditions for subsequent periods, after notification to the UC, in accordance with the applicable contract."
        }
      },
      section3: {
        title: "6.3 Payment delays",
        intro: "In case of delay on an invoice issued by YOJOB (Scheme A or TEA→YOJOB invoicing):",
        penalties: [
          "Late payment penalties payable without reminder, at the rate provided in the contract or applicable legal framework",
          "Fixed collection fee: €40 per unpaid invoice",
          "Possible suspension of services after written notification"
        ]
      }
    },

    article7: {
      title: "Article 7 - Obligations of the User Company (UC)",
      intro: "The UC commits to:",
      obligations: [
        "Provide an exact and complete need, and cooperate actively (feedback, validations, planning)",
        "Transmit safety constraints and site access procedures",
        "Respect confidentiality of information (TEA, profiles, commercial conditions)",
        "Recognize that recruitment, provision and workforce invoicing are the TEA's responsibility (unless different written scheme)",
        "Respect payment conditions defined in the tripartite proposal"
      ]
    },

    article8: {
      title: "Article 8 - Obligations and remuneration of the partner TEA",
      section1: {
        title: "8.1 Monthly commission (business referral)",
        intro: "The TEA owes YOJOB a commission calculated on the excl. tax turnover invoiced by the TEA to the UC for missions originating from YOJOB.",
        details: {
          rate: {
            label: "Commission rate",
            value: "Variable according to contract (e.g. 3-8%)"
          },
          base: {
            label: "Calculation base",
            value: "UC excl. tax turnover (YOJOB missions)"
          },
          rhythm: {
            label: "Invoicing rhythm",
            value: "Monthly"
          },
          deadline: {
            label: "Payment deadline",
            value: "Upon receipt of UC payment, without delay"
          }
        }
      },
      section2: {
        title: "8.2 \"Placement\" success fee",
        intro: "For certain missions, a success fee may be added to the monthly commission:",
        items: {
          trigger: {
            label: "Triggering event",
            value: "End of applicable trial period (see art. 9), without termination attributable to the Profile"
          },
          exigibility: {
            label: "Payability",
            value: "Full immediate payment upon YOJOB invoice issuance"
          },
          amount: {
            label: "Amount",
            value: "Variable according to contract (e.g. % of gross annual salary or fixed amount)"
          }
        }
      },
      section3: {
        title: "8.3 Reporting",
        intro: "The TEA provides YOJOB, at agreed frequency (e.g. monthly):",
        items: [
          "List of YOJOB missions (UC, site, dates, volumes)",
          "Associated excl. tax turnover per mission",
          "Reasonable supporting documents",
          "Compliance with GDPR and business secrecy"
        ]
      }
    },

    article9: {
      title: "Article 9 - Regulatory trial period",
      section1: {
        title: "9.1 Principle",
        description: "The applicable trial period is that provided by the contractual documents (TEA↔UC and/or TEA↔Profile) and by applicable regulations/agreements. It cannot exceed the maximum authorized durations."
      },
      section2: {
        title: "9.2 Posting / Temporary work (assignment contract)",
        intro: "The assignment contract may include a trial period set by agreement; in the absence thereof, it is capped at:",
        durations: [
          { duration: "2 days", condition: "Contract ≤ 1 month" },
          { duration: "3 days", condition: "1 month < contract ≤ 2 months" },
          { duration: "5 days", condition: "Contract > 2 months" }
        ]
      },
      section3: {
        title: "9.3 Recruitment (permanent contract/equivalent) — Legal cap",
        intro: "For a permanent contract, the maximum trial period duration is notably:",
        durations: [
          { duration: "2 months", condition: "Workers / Employees", color: "green" },
          { duration: "3 months", condition: "Supervisors / Technicians", color: "blue" },
          { duration: "4 months", condition: "Executives", color: "violet" }
        ],
        note: "According to applicable rules and possible renewal framed by law."
      }
    },

    article10: {
      title: "Article 10 - Non-circumvention — 24-month duration",
      intro: "During the contractual relationship and for 24 months after the last introduction (TEA and/or Profile), the parties prohibit any circumvention:",
      actors: {
        eu: "Prohibition for UC to contract directly with a TEA introduced by YOJOB (or via related entity) by circumventing YOJOB, except written agreement.",
        ett: "Prohibition for TEA to circumvent YOJOB's remuneration on a UC/opportunity originating from YOJOB, except written agreement."
      },
      penalty: {
        title: "Penalty clause",
        description: "In case of violation of this non-circumvention clause, the defaulting party commits to pay YOJOB a fixed penalty whose amount is specified in the contract (or equivalent to a percentage of amounts generated/estimated), without prejudice to additional damages."
      }
    },

    article11: {
      title: "Article 11 - Liability and limitations",
      items: {
        obligation: {
          title: "Obligation of means",
          description: "YOJOB commits to implement all necessary means to perform its intermediation services, without result guarantee."
        },
        nonResponsibility: {
          title: "Non-responsibility TEA/Profiles",
          description: "YOJOB is not responsible for acts, omissions or breaches of the TEA, recruited Profiles, nor credit/insurance decisions."
        },
        cap: {
          title: "Capping",
          description: "Except gross negligence or fraud, YOJOB's liability is capped at the excl. tax amount received under the concerned contract over the last 12 months."
        },
        indirect: {
          title: "Indirect damages excluded",
          description: "YOJOB cannot be held responsible for indirect damages (loss of profits, loss of earnings, loss of clientele, etc.)."
        }
      }
    },

    article12: {
      title: "Article 12 - Confidentiality",
      intro: "The parties commit to maintain confidential all information exchanged in the context of their collaboration.",
      items: [
        "Confidential information includes commercial, technical, financial and strategic data",
        "The confidentiality obligation lasts during the entire duration of the contractual relationship and 5 years after its termination",
        "Information cannot be disclosed to third parties without prior written agreement",
        "The parties must take all necessary measures to protect information confidentiality"
      ]
    },

    article13: {
      title: "Article 13 - Personal data (GDPR)",
      intro: "Personal data exchanges are strictly limited to data necessary for service execution (contacts, needs, candidate profiles).",
      cards: {
        compliance: {
          title: "GDPR Compliance",
          description: "Personal data processing is carried out in accordance with GDPR and Data Protection Act.",
          linkText: "Privacy policy"
        },
        dpo: {
          title: "DPO Contact",
          description: "For any request concerning your personal data or exercise of your GDPR rights."
        }
      },
      dpaNote: "A DPA (Data Processing Agreement) may be annexed if necessary depending on the nature of data exchanges."
    },

    article14: {
      title: "Article 14 - Duration and termination",
      items: {
        duration: {
          title: "Duration",
          description: "The duration of the contractual relationship is that defined in the contract or accepted tripartite proposal."
        },
        earlyTermination: {
          title: "Early termination",
          description: "30-day notice (or duration agreed in contract) + payment of amounts due (including commissions/success fees if triggering event reached)."
        },
        breach: {
          title: "Termination for breach",
          description: "In case of serious breach of obligations: formal notice + 15-day cure period. Failing regularization, termination of right."
        }
      }
    },

    article15: {
      title: "Article 15 - Force majeure",
      intro: "The parties cannot be held responsible if non-performance or delay in performance of their obligations results from a case of force majeure as defined by French case law.",
      examplesTitle: "Constitute notably cases of force majeure:",
      examples: [
        "Natural disasters, floods, fires",
        "Wars, attacks, riots",
        "General strikes, transport blockades",
        "Network failures (telecoms, electricity)",
        "Epidemics, pandemics",
        "Government health measures"
      ],
      suspension: "In case of force majeure, obligations are suspended during the duration of the event, after notification to the other party."
    },

    article16: {
      title: "Article 16 - Applicable law and disputes",
      sections: {
        law: {
          title: "Applicable law",
          description: "These TCS are subject to French law."
        },
        amicable: {
          title: "Prior amicable attempt",
          description: "In case of dispute, the parties commit to seek an amicable solution before any legal action. The customer may resort to conventional mediation or any other alternative dispute resolution method."
        },
        jurisdiction: {
          title: "Competent jurisdiction",
          description: "Failing amicable resolution, any dispute falls under the exclusive jurisdiction of the courts of YOJOB's registered office, except contrary mandatory rule."
        }
      }
    },

    article17: {
      title: "Article 17 - TCS modification",
      intro: "YOJOB reserves the right to modify these TCS at any time.",
      items: [
        "The applicable TCS are those in effect on the date of acceptance of the proposal/contract",
        "Modifications have no retroactive effect on contracts in progress, except express written agreement of the parties",
        "The latest version of the TCS can be consulted at any time on YOJOB's website"
      ]
    }
  },

  cta: {
    title: "Questions about our TCS?",
    description: "Our legal and commercial team is at your disposal for any clarification regarding these Terms and Conditions of Sale.",
    backHome: "Back to home",
    contactUs: "Contact us"
  },

  footer: {
    copyright: "© {year} {company} — Sole Proprietorship. All rights reserved.",
    links: {
      legal: "Legal notice",
      privacy: "Privacy",
      cgv: "TCS"
    }
  },

  badges: {
    main: "Main",
    optional: "Optional",
    mixed: "Mixed"
  },

  common: {
    back: "Back",
    triggers: "Triggers",
    conditions: "Conditions",
    safeguards: "Safeguards"
  }
};
