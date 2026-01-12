/**
 * 🇩🇪 TRADUCTIONS ALLEMANDES - PAGE POLITIQUE DE CONFIDENTIALITÉ
 * 
 * @version 1.0.0
 */

export const privacyDE = {
  hero: {
    badge: "Datenschutzrichtlinie",
    title: "Schutz Ihrer persönlichen Daten",
    subtitle: "Bei {company} verpflichten wir uns, Ihre Privatsphäre in Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO) zu schützen und zu respektieren.",
    lastUpdate: "Zuletzt aktualisiert:"
  },

  dpo: {
    title: "Datenschutzbeauftragter (DPO)",
    subtitle: "Ihr bevorzugter Ansprechpartner für alle Fragen zu Ihren Daten"
  },

  sections: {
    dataController: {
      title: "1. Verantwortlicher für die Verarbeitung",
      intro: "Der Verantwortliche für die Verarbeitung personenbezogener Daten ist:",
      location: "Bordeaux, Frankreich",
      email: "E-Mail:"
    },

    dataCollected: {
      title: "2. Erfasste personenbezogene Daten",
      intro: "Im Rahmen unserer europäischen Rekrutierungsdienstleistungen erfassen wir folgende Daten:",
      items: [
        {
          label: "Identifikationsdaten:",
          description: "Name, Vorname, E-Mail, Telefon"
        },
        {
          label: "Berufliche Daten:",
          description: "Unternehmen, Funktion, Tätigkeitsbereich"
        },
        {
          label: "Kontaktdaten:",
          description: "Postadresse, Kommunikationspräferenzen"
        },
        {
          label: "Navigationsdaten:",
          description: "Cookies, IP-Adresse, Verbindungsdaten"
        }
      ]
    },

    purposes: {
      title: "3. Zwecke der Verarbeitung",
      intro: "Ihre Daten werden für folgende Zwecke erfasst und verarbeitet:",
      items: [
        {
          title: "Verwaltung von Rekrutierungsanfragen",
          description: "Bearbeitung Ihrer Angebotsanfragen und Vermittlung an unser Netzwerk von Partneragenturen."
        },
        {
          title: "Verbesserung unserer Dienstleistungen",
          description: "Analyse der Nutzung unserer Dienstleistungen zur Verbesserung Ihrer Benutzererfahrung."
        },
        {
          title: "Kommerzielle Kommunikation",
          description: "Information über unsere neuen Dienstleistungen und unseren europäischen Marktplatz (mit Ihrer Zustimmung)."
        }
      ]
    },

    legalBasis: {
      title: "4. Rechtsgrundlage der Verarbeitung",
      intro: "Die Verarbeitung Ihrer Daten basiert auf folgenden Rechtsgrundlagen:",
      items: [
        {
          basis: "Vertragserfüllung",
          description: "Verarbeitung erforderlich zur Beantwortung Ihrer Rekrutierungsanfragen"
        },
        {
          basis: "Einwilligung",
          description: "Für den Versand von Marketingkommunikation (Sie können Ihre Einwilligung jederzeit widerrufen)"
        },
        {
          basis: "Berechtigtes Interesse",
          description: "Verbesserung unserer Dienstleistungen und Sicherheit unserer Plattform"
        }
      ]
    },

    retention: {
      title: "5. Aufbewahrungsdauer",
      intro: "Wir bewahren Ihre personenbezogenen Daten für folgende Zeiträume auf:",
      items: [
        {
          period: "3 Jahre",
          description: "Daten von Interessenten und Kunden"
        },
        {
          period: "13 Monate",
          description: "Cookies und Navigationsdaten"
        },
        {
          period: "5 Jahre",
          description: "Buchhaltungs- und Steuerdokumente"
        },
        {
          period: "{days} Tage",
          description: "Formulardaten (konfigurierbar)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Ihre Rechte",
      intro: "Gemäß der DSGVO haben Sie folgende Rechte:",
      items: [
        {
          title: "Auskunftsrecht",
          description: "Eine Kopie Ihrer personenbezogenen Daten erhalten"
        },
        {
          title: "Recht auf Berichtigung",
          description: "Ihre ungenauen oder unvollständigen Daten korrigieren"
        },
        {
          title: "Recht auf Löschung",
          description: "Die Löschung Ihrer Daten beantragen"
        },
        {
          title: "Recht auf Einschränkung",
          description: "Die Verarbeitung Ihrer Daten einschränken"
        },
        {
          title: "Recht auf Datenübertragbarkeit",
          description: "Ihre Daten in einem strukturierten Format erhalten"
        },
        {
          title: "Widerspruchsrecht",
          description: "Der Verarbeitung Ihrer Daten widersprechen"
        }
      ],
      footer: "Um Ihre Rechte auszuüben, kontaktieren Sie unseren DPO unter der Adresse"
    },

    security: {
      title: "7. Datensicherheit",
      intro: "Wir setzen angemessene technische und organisatorische Sicherheitsmaßnahmen um:",
      measures: [
        "Verschlüsselung der Daten während der Übertragung und im Ruhezustand (SSL/TLS)",
        "Eingeschränkter Datenzugriff durch starke Authentifizierung",
        "Regelmäßige Backups und Geschäftsfortführungsplan",
        "Sicherheitsaudits und regelmäßige Updates",
        "Schulung des Personals zu DSGVO-Best-Practices"
      ]
    },

    transfers: {
      title: "8. Datenübermittlungen",
      intro: "Im Rahmen unseres europäischen Netzwerks von 500+ Partneragenturen in 27 Ländern:",
      eu: {
        title: "🇪🇺 Innerhalb der Europäischen Union",
        description: "Ihre Daten können an unsere Partneragenturen in der EU/EWR übermittelt werden, die das gleiche DSGVO-Schutzniveau genießen."
      },
      nonEu: {
        title: "🌍 Außerhalb der Europäischen Union",
        description: "Bei Übermittlungen außerhalb der EU verwenden wir die Standardvertragsklauseln (SCC) der Europäischen Kommission, um ein angemessenes Schutzniveau zu gewährleisten."
      }
    },

    cookies: {
      title: "9. Cookies und Tracker",
      intro: "Unsere Website verwendet Cookies, um Ihr Browsing-Erlebnis zu verbessern:",
      types: [
        {
          type: "Wesentliche Cookies",
          description: "Für den Betrieb der Website erforderlich (Sitzung, Sicherheit)",
          required: true
        },
        {
          type: "Analytische Cookies",
          description: "Besucherzählungen und Besuchsstatistiken",
          required: false
        },
        {
          type: "Marketing-Cookies",
          description: "Gezielte Werbung und Personalisierung",
          required: false
        }
      ],
      footer: "Sie können Ihre Cookie-Präferenzen jederzeit über Ihre Browser-Einstellungen verwalten."
    },

    contact: {
      title: "10. Kontakt und Beschwerde",
      intro: "Für Fragen zur Verarbeitung Ihrer personenbezogenen Daten:",
      dpoCard: {
        title: "Kontaktieren Sie unseren DPO"
      },
      cnilCard: {
        title: "Aufsichtsbehörde",
        name: "CNIL (Frankreich)"
      },
      footer: "Wenn Sie der Meinung sind, dass Ihre Rechte nicht respektiert werden, haben Sie das Recht, eine Beschwerde bei der Commission Nationale de l'Informatique et des Libertés (CNIL) einzureichen."
    }
  },

  cta: {
    title: "Ihre Daten in Sicherheit",
    description: "Der Schutz Ihrer personenbezogenen Daten ist unsere Priorität. Wir verpflichten uns, die DSGVO einzuhalten und die Sicherheit Ihrer Informationen zu gewährleisten.",
    backHome: "Zurück zur Startseite",
    contactDpo: "DPO kontaktieren"
  },

  badges: {
    required: "Erforderlich",
    optional: "Optional"
  }
};
