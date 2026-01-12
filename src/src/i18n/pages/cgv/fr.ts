/**
 * 🇫🇷 TRADUCTIONS FRANÇAISES - CONDITIONS GÉNÉRALES DE VENTE (CGV)
 * 
 * @version 1.0.0
 */

export const cgvFR = {
  hero: {
    badge: "Document B2B - Contractuel",
    title: "Conditions Générales de Vente",
    subtitle: "CGV applicables aux Entreprises Utilisatrices (EU) et aux Agences de Travail Temporaire partenaires (ETT)",
    effectiveDate: "Version en vigueur depuis le 19 décembre 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Intermédiaire / Courtier commercial"
    },
    eu: {
      title: "Entreprise Utilisatrice (EU)",
      description: "Client final recevant la main-d'œuvre"
    },
    ett: {
      title: "Agence ETT",
      description: "Partenaire réalisant le recrutement"
    }
  },

  sections: {
    article0: {
      title: "Article 0 - Identité du prestataire",
      fields: {
        legalForm: "Forme juridique",
        legalFormValue: "Entreprise Individuelle (EI)",
        manager: "Gérant",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "TVA intracommunautaire",
        vatValue: "FR79447862764",
        address: "Adresse",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Contact",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Assurance RC Professionnelle",
        description: "YOJOB dispose d'une assurance responsabilité civile professionnelle couvrant les conséquences pécuniaires de sa responsabilité au titre de ses prestations."
      }
    },

    article1: {
      title: "Article 1 - Définitions",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Intermédiaire/courtier commercial assurant la prospection, qualification, coordination et formalisation de propositions commerciales entre EU et ETT."
        },
        eu: {
          term: "Entreprise Utilisatrice (EU)",
          definition: "Entreprise cliente finale recevant la main-d'œuvre mise à disposition par une ETT partenaire."
        },
        ett: {
          term: "ETT / Agence partenaire",
          definition: "Agence de travail temporaire réalisant le recrutement, la contractualisation et l'organisation de la mise à disposition de personnel."
        },
        profile: {
          term: "Profil",
          definition: "Candidat ou intérimaire présenté par une ETT à une EU via l'intermédiation de YOJOB."
        },
        mission: {
          term: "Mission",
          definition: "Besoin en recrutement exprimé par l'EU (métier, volume, dates, site, contraintes spécifiques)."
        },
        proposition: {
          term: "Proposition tripartite",
          definition: "Proposition commerciale et administrative structurée par YOJOB et validée par l'EU et l'ETT (signature ou accord écrit)."
        },
        handover: {
          term: "Passage de main",
          definition: "Moment où l'ETT devient l'interlocuteur principal de l'EU après double validation EU + ETT."
        },
        insurer: {
          term: "Assureur-crédit",
          definition: "Organisme d'assurance-crédit (COFACE, Allianz Trade, etc.) intervenant dans l'analyse du risque client et l'octroi d'encours."
        }
      }
    },

    article2: {
      title: "Article 2 - Objet",
      intro: "Les présentes CGV encadrent les prestations de YOJOB consistant notamment à :",
      steps: {
        step1: {
          title: "Prospecter et qualifier",
          description: "Identifier et qualifier des Entreprises Utilisatrices ayant des besoins en recrutement européen"
        },
        step2: {
          title: "Présenter les opportunités",
          description: "Transmettre les opportunités qualifiées aux ETT partenaires correspondantes"
        },
        step3: {
          title: "Structurer la proposition",
          description: "Élaborer une proposition commerciale détaillée (périmètre, coordination, éléments administratifs)"
        },
        step4: {
          title: "Organiser le passage de main",
          description: "Assurer la transition vers l'ETT après signature pour l'exécution (recrutement, mise à disposition, facturation)"
        }
      },
      yojobRole: {
        title: "Rôle de YOJOB",
        description: "YOJOB agit exclusivement comme intermédiaire. L'ETT est responsable du recrutement, de la mise à disposition, de la conformité employeur et de la facturation à l'EU, sauf stipulation expresse contraire dans le contrat."
      }
    },

    article3: {
      title: "Article 3 - Documents contractuels et hiérarchie",
      intro: "En cas de contradiction entre les documents, l'ordre de priorité suivant s'applique :",
      hierarchy: {
        rank1: {
          title: "Contrat particulier / Conditions spécifiques",
          subtitle: "Partenariat ou apport d'affaires personnalisé"
        },
        rank2: {
          title: "Proposition tripartite / Devis / Bon de commande",
          subtitle: "Document signé par les parties"
        },
        rank3: {
          title: "Conditions Générales de Vente (CGV)",
          subtitle: "Présent document"
        },
        rank4: {
          title: "Annexes",
          subtitle: "SLA, DPA, process, checklists, etc."
        }
      }
    },

    article4: {
      title: "Article 4 - Schémas contractuels",
      intro: "Le schéma applicable est précisé dans la proposition ou le contrat. YOJOB peut intervenir selon 3 modèles :",
      schemes: {
        schemaB: {
          label: "Schéma B",
          badge: "Principal",
          title: "ETT cliente de YOJOB",
          description: "YOJOB est rémunéré par l'ETT au titre de l'apport d'affaires (commission mensuelle et/ou success fee)"
        },
        schemaA: {
          label: "Schéma A",
          badge: "Optionnel",
          title: "EU cliente de YOJOB",
          description: "YOJOB facture à l'EU des services additionnels (coordination renforcée, assistance documentaire étendue)"
        },
        schemaC: {
          label: "Schéma C",
          badge: "Mixte",
          title: "Rémunération combinée",
          description: "YOJOB est rémunéré par l'ETT (Schéma B) ET facture des services additionnels à l'EU (Schéma A)"
        }
      }
    },

    article5: {
      title: "Article 5 - Process et passage de main",
      phase1: {
        title: "5.1 Phase amont (commerciale & coordination)",
        intro: "YOJOB assure :",
        items: [
          "Prospection et qualification de l'Entreprise Utilisatrice",
          "Collecte des éléments nécessaires à la Mission",
          "Transmission du besoin à une ou plusieurs ETT partenaires",
          "Coordination jusqu'à la finalisation de la proposition tripartite"
        ]
      },
      phase2: {
        title: "5.2 Déclencheur du passage de main",
        intro: "Le \"passage de main\" intervient dès la réunion de deux conditions cumulatives :",
        conditions: [
          "Signature/accord écrit de l'EU sur la proposition",
          "Acceptation/validation de l'ETT (capacité, conditions, conformité, risque)"
        ],
        consequences: "À partir de ce moment, l'ETT devient l'interlocuteur principal pour : recrutement, contrats, onboarding, mise à disposition, paie, obligations détachement, facturation et recouvrement EU."
      },
      phase3: {
        title: "5.3 Assistance résiduelle (si prévue)",
        description: "YOJOB peut rester en support (coordination/qualité) dans la limite du périmètre convenu dans la proposition ou le contrat."
      }
    },

    article6: {
      title: "Article 6 - Conditions financières et modalités de règlement",
      section1: {
        title: "6.1 Principe : délais \"sélectifs\" et au cas par cas",
        intro: "Compte tenu des pratiques du secteur (assurance-crédit, risque client, organisation de facturation), les conditions de règlement sont définies au cas par cas dans la proposition/contrat applicable.",
        modalitiesTitle: "Les modalités peuvent inclure :",
        modalities: [
          "Paiement à réception",
          "Paiement à l'avance / acompte",
          "Facturation hebdomadaire",
          "Garanties (dépôt, limitation d'encours)"
        ],
        legalLimit: "Lorsqu'un délai de paiement \"à terme\" est accordé, il respecte les plafonds légaux : 60 jours à compter de la date d'émission de la facture, ou 45 jours fin de mois si stipulé."
      },
      section2: {
        title: "6.2 Grille standard — EU \"à risque\"",
        intro: "La classification du risque est déterminée à partir de 3 sources cumulatives :",
        sources: {
          insurer: {
            title: "Assureur-crédit",
            description: "Couverture/encours/conditions"
          },
          score: {
            title: "Score interne ETT",
            description: "Politique risque & recouvrement"
          },
          history: {
            title: "Historique paiement",
            description: "Comportement & exposition"
          }
        },
        primacy: "Primauté : en cas de contradiction, la décision assureur-crédit prévaut sur les autres signaux.",
        levelsTitle: "Niveaux de risque & conditions de règlement",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Assureur : couvert / encours OK ; Score ETT : A/B ; Historique : bon (0 incident)",
            conditions: "Mensuel + délai négocié (ex. 30j) dans la limite légale",
            safeguards: "Encours standard"
          },
          r1: {
            level: "R1",
            title: "Surveillé",
            trigger: "Assureur : encours limité ; Score ETT : B/C ; Historique : retards modérés",
            conditions: "À réception OU acompte 30-50% + solde à réception",
            safeguards: "Encours plafonné + revue hebdomadaire"
          },
          r2: {
            level: "R2",
            title: "Renforcé",
            trigger: "Assureur : couverture partielle insuffisante ; Score ETT : C/D ; Historique : retards significatifs",
            conditions: "Hebdomadaire à réception OU acompte 50-70% + ajustement hebdo",
            safeguards: "Démarrage par lots (volume limité)"
          },
          r3: {
            level: "R3",
            title: "Critique",
            trigger: "Assureur : REFUS / non-assurable ; Score ETT : D ; Historique : incidents majeurs",
            conditions: "Paiement 100% à l'avance (ou refus de démarrage)",
            safeguards: "Démarrage conditionné au paiement ; stop si écart"
          }
        },
        transparency: {
          title: "Transparence & acceptation",
          description: "La Proposition tripartite précise le niveau (R0/R1/R2/R3), le mode de facturation et la condition de règlement. La signature/acceptation de la proposition vaut acceptation de ces modalités."
        },
        adjustment: {
          title: "Clause d'ajustement dynamique",
          description: "En cas d'évolution du risque (baisse d'encours assureur, retards, incidents), l'ETT peut réviser les conditions de règlement pour les périodes suivantes, après notification à l'EU, dans le respect du contrat applicable."
        }
      },
      section3: {
        title: "6.3 Retards de paiement",
        intro: "En cas de retard sur une facture émise par YOJOB (Schéma A ou facturation ETT→YOJOB) :",
        penalties: [
          "Pénalités de retard exigibles sans rappel, selon le taux prévu au contrat ou le cadre légal applicable",
          "Indemnité forfaitaire de recouvrement : 40 € par facture impayée",
          "Suspension possible des prestations après notification écrite"
        ]
      }
    },

    article7: {
      title: "Article 7 - Obligations de l'Entreprise Utilisatrice (EU)",
      intro: "L'EU s'engage à :",
      obligations: [
        "Fournir un besoin exact et complet, et coopérer activement (retours, validations, planning)",
        "Transmettre les contraintes de sécurité et les modalités d'accès au site",
        "Respecter la confidentialité des informations (ETT, profils, conditions commerciales)",
        "Reconnaître que le recrutement, la mise à disposition et la facturation main-d'œuvre relèvent de l'ETT (sauf schéma différent écrit)",
        "Respecter les conditions de règlement définies dans la proposition tripartite"
      ]
    },

    article8: {
      title: "Article 8 - Obligations et rémunération de l'ETT partenaire",
      section1: {
        title: "8.1 Commission mensuelle (apport d'affaires)",
        intro: "L'ETT doit à YOJOB une commission calculée sur le CA HT facturé par l'ETT à l'EU au titre des missions issues de YOJOB.",
        details: {
          rate: {
            label: "Taux de commission",
            value: "Variable selon contrat (ex. 3-8%)"
          },
          base: {
            label: "Base de calcul",
            value: "CA HT facturé EU (missions YOJOB)"
          },
          rhythm: {
            label: "Rythme facturation",
            value: "Mensuel"
          },
          deadline: {
            label: "Délai de paiement",
            value: "Dès réception du paiement de l'EU, sans délai"
          }
        }
      },
      section2: {
        title: "8.2 Success fee \"placement\"",
        intro: "Pour certaines missions, un success fee peut s'ajouter à la commission mensuelle :",
        items: {
          trigger: {
            label: "Fait générateur",
            value: "Fin de la période d'essai applicable (voir art. 9), sans rupture imputable au Profil"
          },
          exigibility: {
            label: "Exigibilité",
            value: "Paiement intégral immédiat à émission de la facture YOJOB"
          },
          amount: {
            label: "Montant",
            value: "Variable selon contrat (ex. % du salaire annuel brut ou montant forfaitaire)"
          }
        }
      },
      section3: {
        title: "8.3 Reporting",
        intro: "L'ETT fournit à YOJOB, à fréquence convenue (ex. mensuelle) :",
        items: [
          "Liste des missions YOJOB (EU, site, dates, volumes)",
          "CA HT associé par mission",
          "Éléments justificatifs raisonnables",
          "Respect du RGPD et du secret des affaires"
        ]
      }
    },

    article9: {
      title: "Article 9 - Période d'essai réglementaire",
      section1: {
        title: "9.1 Principe",
        description: "La période d'essai applicable est celle prévue par les documents contractuels (ETT↔EU et/ou ETT↔Profil) et par la réglementation/accords applicables. Elle ne peut excéder les durées maximales autorisées."
      },
      section2: {
        title: "9.2 Détachement / Intérim (contrat de mission)",
        intro: "Le contrat de mission peut comporter une période d'essai fixée par accord ; à défaut, elle est plafonnée à :",
        durations: [
          { duration: "2 jours", condition: "Contrat ≤ 1 mois" },
          { duration: "3 jours", condition: "1 mois < contrat ≤ 2 mois" },
          { duration: "5 jours", condition: "Contrat > 2 mois" }
        ]
      },
      section3: {
        title: "9.3 Recrutement (CDI/assimilé) — Plafond légal",
        intro: "Pour un CDI, la durée maximale de la période d'essai est notamment :",
        durations: [
          { duration: "2 mois", condition: "Ouvriers / Employés", color: "green" },
          { duration: "3 mois", condition: "Agents de maîtrise / Techniciens", color: "blue" },
          { duration: "4 mois", condition: "Cadres", color: "violet" }
        ],
        note: "Selon les règles applicables et éventuel renouvellement encadré par la loi."
      }
    },

    article10: {
      title: "Article 10 - Non-contournement — Durée 24 mois",
      intro: "Pendant la relation contractuelle et pendant 24 mois après la dernière mise en relation (ETT et/ou Profil), les parties s'interdisent tout contournement :",
      actors: {
        eu: "Interdiction de contractualiser directement avec une ETT introduite par YOJOB (ou via entité liée) en contournant YOJOB, sauf accord écrit.",
        ett: "Interdiction de contourner la rémunération YOJOB sur une EU/opportunité issue de YOJOB, sauf accord écrit."
      },
      penalty: {
        title: "Clause pénale",
        description: "En cas de violation de cette clause de non-contournement, la partie défaillante s'engage à verser à YOJOB une indemnité forfaitaire dont le montant est précisé au contrat (ou équivalent à un pourcentage des sommes générées/estimées), sans préjudice des dommages-intérêts complémentaires."
      }
    },

    article11: {
      title: "Article 11 - Responsabilité et limitations",
      items: {
        obligation: {
          title: "Obligation de moyens",
          description: "YOJOB s'engage à mettre en œuvre tous les moyens nécessaires pour réaliser ses prestations d'intermédiation, sans garantie de résultat."
        },
        nonResponsibility: {
          title: "Non-responsabilité ETT/Profils",
          description: "YOJOB n'est pas responsable des actes, omissions ou manquements de l'ETT, des Profils recrutés, ni des décisions de crédit/assurance."
        },
        cap: {
          title: "Plafonnement",
          description: "Sauf faute lourde ou dol, la responsabilité de YOJOB est plafonnée au montant HT perçu au titre du contrat concerné sur les 12 derniers mois."
        },
        indirect: {
          title: "Dommages indirects exclus",
          description: "YOJOB ne peut être tenu responsable des dommages indirects (perte d'exploitation, manque à gagner, perte de clientèle, etc.)."
        }
      }
    },

    article12: {
      title: "Article 12 - Confidentialité",
      intro: "Les parties s'engagent à maintenir confidentielles toutes les informations échangées dans le cadre de leur collaboration.",
      items: [
        "Les informations confidentielles incluent les données commerciales, techniques, financières et stratégiques",
        "L'obligation de confidentialité perdure pendant toute la durée de la relation contractuelle et 5 ans après sa cessation",
        "Les informations ne peuvent être divulguées à des tiers sans accord préalable écrit",
        "Les parties doivent prendre toutes les mesures nécessaires pour protéger la confidentialité des informations"
      ]
    },

    article13: {
      title: "Article 13 - Données personnelles (RGPD)",
      intro: "Les échanges de données personnelles sont strictement limités aux données nécessaires à l'exécution des prestations (contacts, besoins, profils candidats).",
      cards: {
        compliance: {
          title: "Conformité RGPD",
          description: "Le traitement des données personnelles est effectué conformément au RGPD et à la loi Informatique et Libertés.",
          linkText: "Politique de confidentialité"
        },
        dpo: {
          title: "Contact DPO",
          description: "Pour toute demande concernant vos données personnelles ou l'exercice de vos droits RGPD."
        }
      },
      dpaNote: "Un DPA (Data Processing Agreement) peut être annexé si nécessaire selon la nature des échanges de données."
    },

    article14: {
      title: "Article 14 - Durée et résiliation",
      items: {
        duration: {
          title: "Durée",
          description: "La durée de la relation contractuelle est celle définie dans le contrat ou la proposition tripartite acceptée."
        },
        earlyTermination: {
          title: "Résiliation anticipée",
          description: "Préavis de 30 jours (ou durée convenue au contrat) + paiement des sommes dues (y compris commissions/success fees si fait générateur atteint)."
        },
        breach: {
          title: "Résiliation pour manquement",
          description: "En cas de manquement grave aux obligations : mise en demeure + délai de cure de 15 jours. À défaut de régularisation, résiliation de plein droit."
        }
      }
    },

    article15: {
      title: "Article 15 - Force majeure",
      intro: "Les parties ne pourront être tenues responsables si la non-exécution ou le retard dans l'exécution de leurs obligations découle d'un cas de force majeure au sens de la jurisprudence française.",
      examplesTitle: "Constituent notamment des cas de force majeure :",
      examples: [
        "Catastrophes naturelles, inondations, incendies",
        "Guerres, attentats, émeutes",
        "Grèves générales, blocages des transports",
        "Défaillance des réseaux (télécoms, électricité)",
        "Épidémies, pandémies",
        "Mesures sanitaires gouvernementales"
      ],
      suspension: "En cas de force majeure, les obligations sont suspendues pendant la durée de l'événement, après notification à l'autre partie."
    },

    article16: {
      title: "Article 16 - Droit applicable et litiges",
      sections: {
        law: {
          title: "Droit applicable",
          description: "Les présentes CGV sont soumises au droit français."
        },
        amicable: {
          title: "Tentative amiable préalable",
          description: "En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire. Le client peut recourir à une médiation conventionnelle ou à tout autre mode alternatif de règlement des différends."
        },
        jurisdiction: {
          title: "Juridiction compétente",
          description: "À défaut de résolution amiable, tout litige relève de la compétence exclusive des tribunaux du ressort du siège social de YOJOB, sauf règle impérative contraire."
        }
      }
    },

    article17: {
      title: "Article 17 - Modification des CGV",
      intro: "YOJOB se réserve le droit de modifier à tout moment les présentes CGV.",
      items: [
        "Les CGV applicables sont celles en vigueur à la date d'acceptation de la proposition/contrat",
        "Les modifications n'ont pas d'effet rétroactif sur les contrats en cours d'exécution, sauf accord express écrit des parties",
        "La dernière version des CGV est consultable à tout moment sur le site web de YOJOB"
      ]
    }
  },

  cta: {
    title: "Questions sur nos CGV ?",
    description: "Notre équipe juridique et commerciale est à votre disposition pour toute clarification concernant ces Conditions Générales de Vente.",
    backHome: "Retour à l'accueil",
    contactUs: "Nous contacter"
  },

  footer: {
    copyright: "© {year} {company} — Entreprise Individuelle. Tous droits réservés.",
    links: {
      legal: "Mentions légales",
      privacy: "Confidentialité",
      cgv: "CGV"
    }
  },

  badges: {
    main: "Principal",
    optional: "Optionnel",
    mixed: "Mixte"
  },

  common: {
    back: "Retour",
    triggers: "Déclencheurs",
    conditions: "Conditions",
    safeguards: "Garde-fous"
  }
};
