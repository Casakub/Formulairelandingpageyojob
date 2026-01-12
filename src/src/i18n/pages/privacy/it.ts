/**
 * 🇮🇹 TRADUZIONI ITALIANE - PAGINA INFORMATIVA SULLA PRIVACY
 * 
 * @version 1.0.0
 */

export const privacyIT = {
  hero: {
    badge: "Informativa sulla Privacy",
    title: "Protezione dei suoi dati personali",
    subtitle: "In {company}, ci impegniamo a proteggere e rispettare la sua privacy in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR).",
    lastUpdate: "Ultimo aggiornamento:"
  },

  dpo: {
    title: "Responsabile della Protezione dei Dati (DPO)",
    subtitle: "Il suo interlocutore privilegiato per qualsiasi domanda relativa ai suoi dati"
  },

  sections: {
    dataController: {
      title: "1. Titolare del trattamento",
      intro: "Il titolare del trattamento dei dati personali è:",
      location: "Bordeaux, Francia",
      email: "Email:"
    },

    dataCollected: {
      title: "2. Dati personali raccolti",
      intro: "Raccogliamo i seguenti dati nell'ambito dei nostri servizi di reclutamento europeo:",
      items: [
        {
          label: "Dati identificativi:",
          description: "Nome, cognome, email, telefono"
        },
        {
          label: "Dati professionali:",
          description: "Azienda, funzione, settore di attività"
        },
        {
          label: "Dati di contatto:",
          description: "Indirizzo postale, preferenze di comunicazione"
        },
        {
          label: "Dati di navigazione:",
          description: "Cookie, indirizzo IP, dati di connessione"
        }
      ]
    },

    purposes: {
      title: "3. Finalità del trattamento",
      intro: "I suoi dati sono raccolti e trattati per le seguenti finalità:",
      items: [
        {
          title: "Gestione delle richieste di reclutamento",
          description: "Elaborare le sue richieste di preventivo e metterla in contatto con la nostra rete di agenzie partner."
        },
        {
          title: "Miglioramento dei nostri servizi",
          description: "Analizzare l'utilizzo dei nostri servizi per migliorare la sua esperienza utente."
        },
        {
          title: "Comunicazione commerciale",
          description: "Informarla sui nostri nuovi servizi e sul nostro marketplace europeo (con il suo consenso)."
        }
      ]
    },

    legalBasis: {
      title: "4. Base giuridica del trattamento",
      intro: "Il trattamento dei suoi dati si basa sulle seguenti basi giuridiche:",
      items: [
        {
          basis: "Esecuzione del contratto",
          description: "Trattamento necessario per rispondere alle sue richieste di reclutamento"
        },
        {
          basis: "Consenso",
          description: "Per l'invio di comunicazioni di marketing (può ritirare il suo consenso in qualsiasi momento)"
        },
        {
          basis: "Interesse legittimo",
          description: "Miglioramento dei nostri servizi e sicurezza della nostra piattaforma"
        }
      ]
    },

    retention: {
      title: "5. Periodo di conservazione",
      intro: "Conserviamo i suoi dati personali per i seguenti periodi:",
      items: [
        {
          period: "3 anni",
          description: "Dati di prospect e clienti"
        },
        {
          period: "13 mesi",
          description: "Cookie e dati di navigazione"
        },
        {
          period: "5 anni",
          description: "Documenti contabili e fiscali"
        },
        {
          period: "{days} giorni",
          description: "Dati dei moduli (configurabile)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. I suoi diritti",
      intro: "In conformità con il GDPR, lei dispone dei seguenti diritti:",
      items: [
        {
          title: "Diritto di accesso",
          description: "Ottenere una copia dei suoi dati personali"
        },
        {
          title: "Diritto di rettifica",
          description: "Correggere i suoi dati inesatti o incompleti"
        },
        {
          title: "Diritto alla cancellazione",
          description: "Richiedere l'eliminazione dei suoi dati"
        },
        {
          title: "Diritto di limitazione",
          description: "Limitare il trattamento dei suoi dati"
        },
        {
          title: "Diritto alla portabilità",
          description: "Ricevere i suoi dati in un formato strutturato"
        },
        {
          title: "Diritto di opposizione",
          description: "Opporsi al trattamento dei suoi dati"
        }
      ],
      footer: "Per esercitare i suoi diritti, contatti il nostro DPO all'indirizzo"
    },

    security: {
      title: "7. Sicurezza dei dati",
      intro: "Implementiamo misure di sicurezza tecniche e organizzative appropriate:",
      measures: [
        "Crittografia dei dati in transito e a riposo (SSL/TLS)",
        "Accesso limitato ai dati mediante autenticazione forte",
        "Backup regolari e piano di continuità operativa",
        "Audit di sicurezza e aggiornamenti regolari",
        "Formazione del personale sulle buone pratiche GDPR"
      ]
    },

    transfers: {
      title: "8. Trasferimenti di dati",
      intro: "Nell'ambito della nostra rete europea di oltre 500 agenzie partner in 27 paesi:",
      eu: {
        title: "🇪🇺 All'interno dell'Unione Europea",
        description: "I suoi dati possono essere trasferiti alle nostre agenzie partner situate nell'UE/SEE, che beneficiano dello stesso livello di protezione GDPR."
      },
      nonEu: {
        title: "🌍 Fuori dall'Unione Europea",
        description: "In caso di trasferimento fuori dall'UE, utilizziamo le Clausole Contrattuali Standard (SCC) della Commissione Europea per garantire un livello di protezione adeguato."
      }
    },

    cookies: {
      title: "9. Cookie e tracker",
      intro: "Il nostro sito utilizza cookie per migliorare la sua esperienza di navigazione:",
      types: [
        {
          type: "Cookie essenziali",
          description: "Necessari per il funzionamento del sito (sessione, sicurezza)",
          required: true
        },
        {
          type: "Cookie analitici",
          description: "Misurazione dell'audience e statistiche delle visite",
          required: false
        },
        {
          type: "Cookie di marketing",
          description: "Pubblicità mirata e personalizzazione",
          required: false
        }
      ],
      footer: "Può gestire le sue preferenze sui cookie in qualsiasi momento tramite le impostazioni del suo browser."
    },

    contact: {
      title: "10. Contatto e reclamo",
      intro: "Per qualsiasi domanda sul trattamento dei suoi dati personali:",
      dpoCard: {
        title: "Contatti il nostro DPO"
      },
      cnilCard: {
        title: "Autorità di controllo",
        name: "CNIL (Francia)"
      },
      footer: "Se ritiene che i suoi diritti non siano rispettati, ha il diritto di presentare un reclamo presso la Commission Nationale de l'Informatique et des Libertés (CNIL)."
    }
  },

  cta: {
    title: "I suoi dati al sicuro",
    description: "La protezione dei suoi dati personali è la nostra priorità. Ci impegniamo a rispettare il GDPR e a garantire la sicurezza delle sue informazioni.",
    backHome: "Torna alla home",
    contactDpo: "Contatta il DPO"
  },

  badges: {
    required: "Obbligatorio",
    optional: "Facoltativo"
  }
};
