/**
 * 🇫🇷 TRADUCTIONS FRANÇAISES - PAGE POLITIQUE DE CONFIDENTIALITÉ
 * 
 * @version 1.0.0
 */

export const frPrivacy = {
  hero: {
    badge: "Politique de Confidentialité",
    title: "Protection de vos données personnelles",
    subtitle: "Chez {company}, nous nous engageons à protéger et respecter votre vie privée conformément au Règlement Général sur la Protection des Données (RGPD).",
    lastUpdate: "Dernière mise à jour :"
  },

  dpo: {
    title: "Délégué à la Protection des Données (DPO)",
    subtitle: "Votre interlocuteur privilégié pour toute question relative à vos données"
  },

  sections: {
    dataController: {
      title: "1. Responsable du traitement",
      intro: "Le responsable du traitement des données à caractère personnel est :",
      location: "Bordeaux, France",
      email: "Email :"
    },

    dataCollected: {
      title: "2. Données personnelles collectées",
      intro: "Nous collectons les données suivantes dans le cadre de nos services de recrutement européen :",
      items: [
        {
          label: "Données d'identification :",
          description: "Nom, prénom, email, téléphone"
        },
        {
          label: "Données professionnelles :",
          description: "Entreprise, fonction, secteur d'activité"
        },
        {
          label: "Données de contact :",
          description: "Adresse postale, préférences de communication"
        },
        {
          label: "Données de navigation :",
          description: "Cookies, adresse IP, données de connexion"
        }
      ]
    },

    purposes: {
      title: "3. Finalités du traitement",
      intro: "Vos données sont collectées et traitées pour les finalités suivantes :",
      items: [
        {
          title: "Gestion des demandes de recrutement",
          description: "Traiter vos demandes de devis et vous mettre en relation avec notre réseau d'agences partenaires."
        },
        {
          title: "Amélioration de nos services",
          description: "Analyser l'utilisation de nos services pour améliorer votre expérience utilisateur."
        },
        {
          title: "Communication commerciale",
          description: "Vous informer de nos nouveaux services et de notre marketplace européenne (avec votre consentement)."
        }
      ]
    },

    legalBasis: {
      title: "4. Base légale du traitement",
      intro: "Le traitement de vos données repose sur les bases légales suivantes :",
      items: [
        {
          basis: "Exécution du contrat",
          description: "Traitement nécessaire pour répondre à vos demandes de recrutement"
        },
        {
          basis: "Consentement",
          description: "Pour l'envoi de communications marketing (vous pouvez retirer votre consentement à tout moment)"
        },
        {
          basis: "Intérêt légitime",
          description: "Amélioration de nos services et sécurité de notre plateforme"
        }
      ]
    },

    retention: {
      title: "5. Durée de conservation",
      intro: "Nous conservons vos données personnelles pour les durées suivantes :",
      items: [
        {
          period: "3 ans",
          description: "Données des prospects et clients"
        },
        {
          period: "13 mois",
          description: "Cookies et données de navigation"
        },
        {
          period: "5 ans",
          description: "Documents comptables et fiscaux"
        },
        {
          period: "{days} jours",
          description: "Données de formulaires (paramétrable)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Vos droits",
      intro: "Conformément au RGPD, vous disposez des droits suivants :",
      items: [
        {
          title: "Droit d'accès",
          description: "Obtenir une copie de vos données personnelles"
        },
        {
          title: "Droit de rectification",
          description: "Corriger vos données inexactes ou incomplètes"
        },
        {
          title: "Droit à l'effacement",
          description: "Demander la suppression de vos données"
        },
        {
          title: "Droit à la limitation",
          description: "Limiter le traitement de vos données"
        },
        {
          title: "Droit à la portabilité",
          description: "Recevoir vos données dans un format structuré"
        },
        {
          title: "Droit d'opposition",
          description: "Vous opposer au traitement de vos données"
        }
      ],
      footer: "Pour exercer vos droits, contactez notre DPO à l'adresse"
    },

    security: {
      title: "7. Sécurité des données",
      intro: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées :",
      measures: [
        "Chiffrement des données en transit et au repos (SSL/TLS)",
        "Accès restreint aux données par authentification forte",
        "Sauvegardes régulières et plan de continuité d'activité",
        "Audits de sécurité et mises à jour régulières",
        "Formation du personnel aux bonnes pratiques RGPD"
      ]
    },

    transfers: {
      title: "8. Transferts de données",
      intro: "Dans le cadre de notre réseau européen de 500+ agences partenaires dans 27 pays :",
      eu: {
        title: "🇪🇺 Au sein de l'Union Européenne",
        description: "Vos données peuvent être transférées à nos agences partenaires situées dans l'UE/EEE, qui bénéficient du même niveau de protection RGPD."
      },
      nonEu: {
        title: "🌍 Hors Union Européenne",
        description: "En cas de transfert hors UE, nous utilisons les Clauses Contractuelles Types (CCT) de la Commission européenne pour garantir un niveau de protection adéquat."
      }
    },

    cookies: {
      title: "9. Cookies et traceurs",
      intro: "Notre site utilise des cookies pour améliorer votre expérience de navigation :",
      types: [
        {
          type: "Cookies essentiels",
          description: "Nécessaires au fonctionnement du site (session, sécurité)",
          required: true
        },
        {
          type: "Cookies analytiques",
          description: "Mesure d'audience et statistiques de visite",
          required: false
        },
        {
          type: "Cookies marketing",
          description: "Publicités ciblées et personnalisation",
          required: false
        }
      ],
      footer: "Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur."
    },

    contact: {
      title: "10. Contact et réclamation",
      intro: "Pour toute question concernant le traitement de vos données personnelles :",
      dpoCard: {
        title: "Contactez notre DPO"
      },
      cnilCard: {
        title: "Autorité de contrôle",
        name: "CNIL (France)"
      },
      footer: "Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL)."
    }
  },

  cta: {
    title: "Vos données en sécurité",
    description: "La protection de vos données personnelles est notre priorité. Nous nous engageons à respecter le RGPD et à garantir la sécurité de vos informations.",
    backHome: "Retour à l'accueil",
    contactDpo: "Contacter le DPO"
  },

  badges: {
    required: "Requis",
    optional: "Optionnel"
  }
};