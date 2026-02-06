/**
 * 🇫🇷 DONNÉES CGV POUR GÉNÉRATION PDF
 * 
 * Version locale des CGV pour le serveur (ne peut pas importer depuis /src/)
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
          description: "Présenter les opportunités commerciales aux Agences ETT partenaires européennes"
        },
        step3: {
          title: "Coordonner",
          description: "Coordonner l'analyse de faisabilité technique et financière entre EU et ETT"
        },
        step4: {
          title: "Formaliser",
          description: "Formaliser les propositions commerciales tripartites structurées (EU, ETT, YOJOB)"
        },
        step5: {
          title: "Assurer le suivi",
          description: "Assurer le suivi et la coordination jusqu'au démarrage effectif de la mission"
        }
      }
    },

    article3: {
      title: "Article 3 - Rôle de YOJOB",
      intro: "YOJOB intervient en tant qu'intermédiaire commercial et ne remplace jamais les responsabilités contractuelles ou légales directes entre l'EU et l'ETT.",
      responsibilities: {
        what_yojob_does: {
          title: "Ce que YOJOB fait",
          items: [
            "Prospecter, qualifier et coordonner des opportunités commerciales",
            "Faciliter la mise en relation professionnelle entre EU et ETT",
            "Structurer des propositions administratives et commerciales claires",
            "Suivre les échanges jusqu'au passage de main (signature tripartite)"
          ]
        },
        what_yojob_does_not: {
          title: "Ce que YOJOB ne fait PAS",
          items: [
            "Recruter, embaucher ou gérer du personnel",
            "Se substituer aux responsabilités légales de l'ETT ou de l'EU",
            "Garantir la solvabilité, qualité ou conformité réglementaire des partenaires",
            "Exercer une fonction d'agence de travail temporaire"
          ]
        }
      }
    }
  }
};
