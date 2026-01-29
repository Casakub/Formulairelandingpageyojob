/**
 * 🇮🇹 TRADUZIONI ITALIANE - MODULO PREVENTIVO
 * 
 * Traduzioni complete in italiano per il modulo di richiesta preventivo
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const it: DevisTranslations = {
  // === COMUNE ===
  common: {
    next: "Avanti",
    previous: "Indietro",
    submit: "Invia",
    required: "*",
    optional: "(opzionale)",
    loading: "Caricamento...",
    error: "Errore",
    success: "Successo",
    cancel: "Annulla",
    save: "Salva",
    edit: "Modifica",
    delete: "Elimina",
    confirm: "Conferma",
    euro: "€",
    perHour: "/h",
    perMonth: "/mese",
    perDay: "/giorno",
    persons: "persona/e",
    hours: "ora/e",
    days: "giorno/i",
    months: "mesi",
    year: "anno/i",
  },

  // === NAVIGAZIONE ===
  navigation: {
    back: "Indietro",
    stepOf: "Passo {step} di {total}",
    steps: {
      entreprise: {
        title: "Azienda",
        badge: "🏢 La tua azienda",
      },
      contact: {
        title: "Contatto",
        badge: "👤 Il tuo contatto",
      },
      besoins: {
        title: "Esigenze",
        badge: "💼 Le tue esigenze",
      },
      conditions: {
        title: "Condizioni",
        badge: "📋 Condizioni",
      },
      candidats: {
        title: "Candidati",
        badge: "👷 Profilo ricercato",
      },
      recapitulatif: {
        title: "Riepilogo",
        badge: "✅ Riepilogo",
      },
    },
  },

  // === VALIDAZIONE ===
  validation: {
    fillRequired: "Si prega di compilare tutti i campi obbligatori",
    selectRegion: "Si prega di selezionare una regione",
    addAtLeastOnePosition: "Si prega di aggiungere almeno una posizione",
    invalidEmail: "Si prega di inserire un indirizzo email valido",
    invalidPhone: "Si prega di inserire un numero di telefono valido",
    invalidSIRET: "Si prega di inserire un numero SIRET valido (14 cifre)",
    dateRequired: "Si prega di inserire la data di inizio",
    missionLocationRequired: "Si prega di inserire il luogo della missione",
  },

  // === MESSAGGI ===
  messages: {
    success: {
      quoteSent: "Preventivo inviato con successo!",
      redirecting: "Reindirizzamento in corso...",
    },
    error: {
      submitError: "Errore durante l'invio del preventivo",
      genericError: "Si è verificato un errore",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Richiesta preventivo | YOJOB",
    pageDescription: "Richiedi un preventivo per le tue esigenze di personale interinale europeo.",
  },

  // === PASSO 1: AZIENDA ===
  step1: {
    title: "Informazioni aziendali",
    subtitle: "Inserisci le informazioni legali della tua azienda utilizzatrice.",
    fields: {
      pays: {
        label: "Paese",
        placeholder: "Seleziona un paese",
      },
      raisonSociale: {
        label: "Ragione sociale",
        placeholder: "Es: YOJOB SAS",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 cifre",
        helper: "Numero di identificazione del tuo stabilimento",
      },
      codeAPE: {
        label: "Codice APE/NAF",
        placeholder: "Es: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "P.IVA Intracomunitaria",
        placeholder: "Es: IT12345678901",
      },
      adresse: {
        label: "Indirizzo completo",
        placeholder: "Numero civico e nome della via",
      },
      codePostal: {
        label: "Codice postale",
        placeholder: "Es: 00100",
      },
      ville: {
        label: "Città",
        placeholder: "Es: Roma",
      },
      region: {
        label: "Regione/Stato",
        placeholder: "Seleziona una regione",
        placeholderOtherCountry: "Es: Bavaria, Catalogna, Lombardia...",
      },
      siteInternet: {
        label: "Sito web",
        placeholder: "https://www.esempio.it",
      },
    },
    infoMessage: "✓ Queste informazioni saranno utilizzate per generare il tuo preventivo personalizzato",
  },

  // === PASSO 2: CONTATTO ===
  step2: {
    title: "Persona di contatto",
    subtitle: "Chi sarà il tuo interlocutore privilegiato per questo progetto?",
    fields: {
      civilite: {
        label: "Titolo",
        options: {
          m: "Sig.",
          mme: "Sig.ra",
        },
      },
      nom: {
        label: "Cognome",
        placeholder: "Es: Rossi",
      },
      prenom: {
        label: "Nome",
        placeholder: "Es: Mario",
      },
      fonction: {
        label: "Funzione",
        placeholder: "Es: Responsabile HR",
      },
      email: {
        label: "Email professionale",
        placeholder: "mario.rossi@azienda.it",
      },
      telephone: {
        label: "Telefono",
        placeholder: "+39 340 123 4567",
      },
    },
  },

  // === PASSO 3: ESIGENZE ===
  step3: {
    title: "Le tue esigenze di reclutamento",
    subtitle: "Descrivi i profili ricercati e le loro condizioni.",
    profileLabel: "Profilo",
    addProfile: "Aggiungi un profilo aggiuntivo",
    removeProfile: "Elimina questo profilo",
    loadingConfig: "Caricamento della configurazione...",
    missingRegionWarning: "⚠️ Si prega di selezionare la tua regione al passo 1 per visualizzare automaticamente i salari.",
    fields: {
      secteur: {
        label: "Settore di attività",
        placeholder: "Seleziona un settore",
      },
      convention: {
        label: "Contratto collettivo",
        placeholder: "Automatico secondo il settore",
      },
      poste: {
        label: "Posizione ricercata",
        placeholder: "Seleziona una posizione",
      },
      classification: {
        label: "Classificazione / Qualifica",
        placeholder: "Seleziona una classificazione",
      },
      quantite: {
        label: "Numero di persone",
        placeholder: "Es: 5",
        helper: "Quante persone per questa posizione?",
      },
      salaireBrut: {
        label: "Salario lordo mensile",
        placeholder: "Es: 2500",
        helper: "Salario lordo su base 151,67h/mese",
      },
      nationalite: {
        label: "Nazionalità dei lavoratori",
        placeholder: "Seleziona un paese",
        helper: "La nazionalità influenza il coefficiente di tariffa dell'agenzia",
      },
    },
    ajouterPoste: "Aggiungi un'altra posizione",
    supprimerPoste: "Elimina questa posizione",
    posteNumero: "Posizione",
    coefficientInfo: {
      title: "💡 Coefficiente agenzia applicato",
      base: "Coeff. base",
      facteurPays: "Fattore paese",
      final: "Coefficiente finale",
    },
    summary: {
      title: "Retribuzione del dipendente",
      salaireBrutMensuel: "Salario lordo mensile",
      tauxHoraireBrut: "Tariffa oraria lorda",
      baseMensuelle: "(Base 151,67h/mese secondo contratto collettivo)",
    },
  },

  // === PASSO 4: CONDIZIONI ===
  step4: {
    title: "Condizioni di lavoro",
    subtitle: "Specifica le condizioni di impiego e i benefit proposti.",
    fields: {
      dateDebut: {
        label: "Data di inizio desiderata",
        placeholder: "GG/MM/AAAA",
      },
      dateFin: {
        label: "Data di fine prevista",
        placeholder: "GG/MM/AAAA",
        helper: "Lascia vuoto se a tempo indeterminato",
      },
      baseHoraire: {
        label: "Base oraria mensile",
        placeholder: "Es: 151,67",
        helper: "Base legale Francia: 151,67h/mese (35h/settimana)",
      },
      lieuxMission: {
        label: "Luoghi della missione",
        placeholder: "Es: Roma Centro, Milano Zona 3, Napoli...",
      },
      periodeEssai: {
        label: "Periodo di prova",
        placeholder: "Seleziona una durata",
        options: {
          '2': '2 giorni',
          '3': '3 giorni',
          '5': '5 giorni',
          '15': '15 giorni',
        },
      },
      motifRecours: {
        label: "Motivo del ricorso al lavoro interinale",
        placeholder: "Seleziona un motivo",
        options: {
          accroissement: "Aumento temporaneo di attività",
          remplacement: "Sostituzione dipendente assente",
          saisonnier: "Lavori stagionali",
          exportation: "Ordine eccezionale per l'esportazione",
          autre: "Altro (da specificare)",
        },
      },
      delaiPaiement: {
        label: "Termini di pagamento desiderati",
        placeholder: "Seleziona un termine",
        options: {
          reception: "Pagamento alla ricezione",
          j30: "30 giorni",
          j45: "45 giorni",
          j60: "60 giorni",
        },
      },
    },
    hebergement: {
      title: "Alloggio",
      chargeEU: {
        label: "Alloggio a carico dell'azienda utilizzatrice",
        helper: "Se NO: supplemento orario di +3,50 €/h sarà fatturato dall'agenzia",
      },
      supplementWarning: "⚠️ Un supplemento di +3,50 €/h sarà applicato poiché l'alloggio non è a carico",
      commentaire: {
        label: "Dettagli sull'alloggio",
        placeholder: "Tipo di alloggio, indirizzo, condizioni particolari...",
      },
    },
    transport: {
      title: "Trasporto Locale",
      chargeETT: {
        label: "Trasporto locale a carico dell'agenzia",
        helper: "Se SI: supplemento orario di +1,50 €/h sarà fatturato",
      },
      supplementInfo: "✓ Un supplemento di +1,50 €/h sarà applicato per coprire le spese di trasporto locale",
    },
    repas: {
      title: "Pasti",
      options: {
        restaurant: "Ristorante aziendale / Buoni pasto",
        panier: "Cestino pasto (fatturato al giorno)",
        nonConcerne: "Non interessato",
      },
      montantInfo: "📋 Importo cestino pasto: {montant} / giorno lavorato (fatturato separatamente)",
      montantNonDefini: "⚠️ Importo non definito per questo paese/regione",
    },
    sections: {
      hebergement: {
        title: "Alloggio",
        chargeEU: {
          label: "Alloggio a carico dell'azienda utilizzatrice",
          helper: "Se NO: supplemento orario di +3,50 €/h sarà fatturato dall'agenzia",
          options: {
            oui: "Sì, fornito da EU",
            non: "No, a carico del lavoratore",
          },
        },
        detailsEU: {
          type: {
            label: "Tipo di alloggio",
            options: {
              hotel: "Hotel",
              appartement: "Appartamento",
              foyer: "Dormitorio",
              autre: "Altro",
            },
          },
          adresse: {
            label: "Indirizzo alloggio",
            placeholder: "Indirizzo completo dell'alloggio",
          },
        },
      },
      transportInternational: {
        title: "Trasporto internazionale (paese d'origine ↔ Francia)",
        chargeEU: {
          label: "Trasporto a carico dell'azienda utilizzatrice",
          helper: "Viaggi tra il paese d'origine e il luogo della missione",
          options: {
            oui: "Sì, fornito da EU",
            non: "No, a carico del lavoratore",
          },
        },
        detailsEU: {
          type: {
            label: "Tipo di trasporto",
            options: {
              avion: "Aereo",
              train: "Treno",
              bus: "Autobus/Pullman",
              covoiturage: "Car pooling organizzato",
            },
          },
          frequence: {
            label: "Frequenza dei viaggi",
            options: {
              allerRetour: "Solo andata-ritorno iniziale",
              hebdomadaire: "Settimanale",
              mensuel: "Mensile",
            },
          },
        },
      },
      transportLocal: {
        title: "Trasporto locale",
        chargeETT: {
          label: "Trasporto locale a carico dell'agenzia",
          helper: "Se SI: supplemento orario di +1,50 €/h sarà fatturato",
          options: {
            oui: "Sì, a carico agenzia",
            non: "No, a carico del lavoratore",
          },
        },
        detailsETT: {
          type: {
            label: "Tipo di trasporto",
            options: {
              vehicule: "Veicolo aziendale",
              transport: "Trasporto pubblico",
              velo: "Bicicletta",
            },
          },
        },
      },
      repas: {
        title: "Pasti",
        type: {
          label: "Tipo di pasto",
          options: {
            restaurant: "Ristorante aziendale / Buoni pasto",
            panier: "Cestino pasto (fatturato al giorno)",
            nonConcerne: "Non interessato",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Budget giornaliero",
            placeholder: "Importo in €",
          },
        },
        detailsPanier: {
          info: "Il cestino pasto sarà fatturato separatamente per giorno lavorato",
        },
      },
    },
  },

  // === PASSO 5: CANDIDATI ===
  step5: {
    title: "Profilo dei candidati",
    subtitle: "Definisci le competenze e i requisiti specifici.",
    sections: {
      experience: {
        title: "Esperienza professionale",
        annees: {
          label: "Anni di esperienza minimi",
          placeholder: "Es: 3",
          options: {
            '0-1': "Principiante (0-1 anno)",
            '1-3': "Intermedio (1-3 anni)",
            '3-5': "Confermato (3-5 anni)",
            '5+': "Esperto (5 anni e oltre)",
          },
        },
        competences: {
          label: "Competenze tecniche richieste",
          placeholder: "Es: Muratura, cassaforma, lettura piani, saldatura TIG...",
        },
      },
      langues: {
        title: "Competenze linguistiche",
        francais: {
          label: "Livello di francese richiesto",
          placeholder: "Seleziona un livello",
          options: {
            a1: "A1 - Principiante",
            a2: "A2 - Elementare",
            b1: "B1 - Intermedio",
            b2: "B2 - Intermedio avanzato",
            c1: "C1 - Avanzato",
            c2: "C2 - Padronanza",
            natif: "Madrelingua",
          },
        },
        autres: {
          label: "Altre lingue utili",
          placeholder: "Es: Inglese (B1), Tedesco (A2)...",
        },
      },
      permis: {
        title: "Patente di guida",
        requis: {
          label: "Patente richiesta",
          options: {
            aucun: "Nessuna patente richiesta",
            b: "Patente B (auto)",
            c: "Patente C (camion)",
            ce: "Patente CE (camion + rimorchio)",
            d: "Patente D (trasporto persone)",
          },
        },
      },
      epi: {
        title: "Dispositivi di protezione individuale (DPI)",
        fournis: {
          label: "DPI forniti dall'azienda",
          helper: "Casco, scarpe di sicurezza, guanti, ecc.",
          options: {
            oui: "Sì, forniti da EU",
            non: "No, a carico del lavoratore",
          },
        },
        liste: {
          label: "Elenco dei DPI necessari",
          placeholder: "Es: Casco, scarpe S3, guanti antitaglio, imbracatura...",
        },
      },
      autresExigences: {
        title: "Altri requisiti",
        label: "Requisiti specifici aggiuntivi",
        placeholder: "Es: Abilitazioni elettriche, CACES, disponibilità weekend, lavoro in altezza...",
      },
    },
  },

  // === RIEPILOGO ===
  recapitulatif: {
    title: "Riepilogo della tua richiesta",
    subtitle: "Verifica le informazioni prima di inviare la tua richiesta di preventivo.",
    acceptConditionsError: "Si prega di accettare le condizioni prima di continuare",
    entreprise: {
      title: "Azienda",
      raisonSociale: "Ragione sociale",
      siret: "SIRET",
      pays: "Paese",
      ville: "Città",
      region: "Regione/Stato",
    },
    contact: {
      title: "Contatto",
      nomPrenom: "Nome e cognome",
      email: "Email",
      telephone: "Telefono",
      fonction: "Funzione",
    },
    postes: {
      title: "Posizioni richieste",
      coeffETT: "📊 Coefficiente agenzia applicato",
      coeffBase: "Coeff. base",
      facteurPays: "Fattore paese",
      supplementsHoraires: "✨ Supplementi orari (inclusi nella tariffa)",
      hebergement: "✓ Alloggio",
      transport: "✓ Trasporto locale",
      panierRepas: "🍽️ Cestino pasto (fatturato al giorno)",
      baseHoraire: "📅 Base oraria: {heures}h/mese (ore straordinarie rilevate)",
      heuresNormales: "Ore normali (0-35h/sett)",
      heuresSup25: "Ore straord. +25% (36a-43a h)",
      heuresSup50: "Ore straord. +50% (44a+ h)",
      sousTotal: "Subtotale manodopera (per persona)",
      tauxHoraireBrut: "Tariffa oraria lorda",
      tauxETTFinal: "Tariffa agenzia finale",
      coutMensuel: "Costo mensile totale",
    },
    conditions: {
      title: "Condizioni della missione",
      dateDebut: "Data di inizio",
      dateFin: "Data di fine",
      dureeEstimee: "Durata stimata",
      lieuMission: "Luogo della missione",
      mois: "mesi",
    },
    majorations: {
      title: "Adeguamenti applicati",
      total: "Totale adeguamenti",
      notSet: "Non specificato",
    },
    totaux: {
      mensuelHT: "Totale mensile IVA esclusa",
      mensuelTTC: "Totale mensile IVA inclusa",
      totalMission: "Costo totale missione",
    },
    noteLegale: "ℹ️ Questa stima è fornita a titolo indicativo. La tariffa definitiva sarà confermata dopo la convalida da parte del nostro team e dell'agenzia partner selezionata.",
    acceptConditions: {
      text: "Accetto che i miei dati siano trattati in conformità con la",
      lien: "politica sulla privacy",
    },
    boutonEnvoi: {
      texte: "Invia la mia richiesta di preventivo",
      enCours: "Invio in corso...",
    },
    footer: "✓ Risposta entro 24 ore lavorative • ✓ Senza impegno",
  },

  // === ERRORI ===
  errors: {
    required: "Questo campo è obbligatorio",
    invalidEmail: "Indirizzo email non valido",
    invalidSIRET: "SIRET non valido (14 cifre richieste)",
    invalidPhone: "Numero di telefono non valido",
    minValue: "Il valore deve essere maggiore o uguale a {min}",
    maxValue: "Il valore deve essere minore o uguale a {max}",
    genericError: "Si è verificato un errore. Riprova.",
    loadingError: "Errore durante il caricamento dei dati",
    submitError: "Errore durante l'invio della richiesta",
  },

  // === SETTORI & MESTIERI ===
  secteurs: {
    batiment: {
      label: "Edilizia",
      convention: "Contratto collettivo nazionale operai edili (3193)",
      postes: {
        macon: "Muratore",
        coffreur: "Casserista",
        ferrailleur: "Ferraiolo",
        carreleur: "Piastrellista",
        platrier: "Stuccatore",
        peintre: "Imbianchino",
        plombier: "Idraulico",
        electricien: "Elettricista",
        couvreur: "Copritetto",
        menuisier: "Falegname",
        chef_equipe_batiment: "Caposquadra",
        chef_chantier: "Capocantiere",
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
      label: "Metallurgia",
      convention: "Contratto collettivo della metallurgia (3109)",
      postes: {
        soudeur: "Saldatore",
        chaudronnier: "Calderaio",
        tuyauteur: "Tubista",
        tourneur: "Tornitore",
        fraiseur: "Fresatore",
        usineur: "Operatore CNC",
        mecanicien_industriel: "Meccanico industriale",
        monteur: "Montatore",
        controleur_qualite: "Controllore qualità",
        ajusteur: "Attrezzista",
        chef_equipe_metallurgie: "Caposquadra",
      },
      classifications: {
        niveau_1: "Livello I",
        niveau_2: "Livello II",
        niveau_3: "Livello III",
        niveau_4: "Livello IV",
        niveau_5: "Livello V",
      },
    },
    tp: {
      label: "Lavori Pubblici",
      convention: "Contratto collettivo nazionale lavori pubblici (3005)",
      postes: {
        conducteur_engins: "Operatore macchine movimento terra",
        terrassier: "Sterratorre",
        canalisateur: "Tubista",
        constructeur_routes: "Costruttore stradale",
        coffreur_bancheur: "Casserista",
        macon_vrd: "Muratore VRD",
        chef_equipe_tp: "Caposquadra TP",
        manoeuvre_tp: "Manovale TP",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Alberghiero",
      convention: "Contratto collettivo alberghi-ristorazione (3292)",
      postes: {
        receptionniste: "Receptionist",
        femme_chambre: "Cameriera ai piani",
        agent_entretien: "Addetto alle pulizie",
        bagagiste: "Facchino",
        concierge: "Portiere",
        night_audit: "Night auditor",
        gouvernante: "Governante",
        chef_reception: "Capo ricevimento",
      },
      classifications: {
        niveau_1: "Livello I",
        niveau_2: "Livello II",
        niveau_3: "Livello III",
        niveau_4: "Livello IV",
        niveau_5: "Livello V",
      },
    },
    restauration: {
      label: "Ristorazione",
      convention: "Contratto collettivo alberghi-ristorazione (3292)",
      postes: {
        cuisinier: "Cuoco",
        commis_cuisine: "Commis di cucina",
        chef_partie: "Chef de partie",
        serveur: "Cameriere",
        barman: "Barista",
        plongeur: "Lavapiatti",
        chef_rang: "Capo rango",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Chef di cucina",
      },
      classifications: {
        niveau_1: "Livello I",
        niveau_2: "Livello II",
        niveau_3: "Livello III",
        niveau_4: "Livello IV",
        niveau_5: "Livello V",
      },
    },
    plasturgie: {
      label: "Plasturgia",
      convention: "Contratto collettivo della plasturgia (0292)",
      postes: {
        operateur_injection: "Operatore stampaggio",
        operateur_extrusion: "Operatore estrusione",
        regleur: "Attrezzista",
        operateur_thermoformage: "Operatore termoformatura",
        controleur_qualite_plasturgie: "Controllore qualità",
        technicien_maintenance: "Tecnico manutenzione",
        chef_equipe_plasturgie: "Caposquadra",
      },
      classifications: {
        niveau_1: "Livello I",
        niveau_2: "Livello II",
        niveau_3: "Livello III",
        niveau_4: "Livello IV",
      },
    },
    automobile_carrosserie: {
      label: "Automotive & Carrozzeria",
      convention: "Contratto collettivo riparazione automotive (1090)",
      postes: {
        carrossier: "Carrozziere",
        peintre_automobile: "Verniciatore auto",
        mecanicien_auto: "Meccanico auto",
        electricien_auto: "Elettrauto",
        chef_atelier: "Capofficina",
        controleur_technique: "Controllore tecnico",
      },
      classifications: {
        niveau_1: "Livello I",
        niveau_2: "Livello II",
        niveau_3: "Livello III",
        niveau_4: "Livello IV",
      },
    },
    sylviculture: {
      label: "Silvicoltura",
      convention: "Contratto collettivo dell'agricoltura (7501)",
      postes: {
        bucheron: "Boscaiolo",
        elagueur: "Potatore",
        conducteur_engins_forestiers: "Operatore macchine forestali",
        chef_equipe_sylviculture: "Caposquadra silvicoltura",
      },
      classifications: {
        niveau_1: "Livello I",
        niveau_2: "Livello II",
        niveau_3: "Livello III",
        niveau_4: "Livello IV",
      },
    },
    cartonnerie: {
      label: "Cartotecnica",
      convention: "Contratto collettivo industria trasformazione (3107)",
      postes: {
        operateur_production: "Operatore di produzione",
        conducteur_ligne: "Conduttore linea",
        regleur_cartonnerie: "Attrezzista",
        chef_equipe_cartonnerie: "Caposquadra",
      },
      classifications: {
        niveau_1: "Livello I",
        niveau_2: "Livello II",
        niveau_3: "Livello III",
        niveau_4: "Livello IV",
      },
    },
    autre: {
      label: "Altro",
      convention: "Da definire secondo l'attività",
      postes: {
        autre_poste: "Altra posizione (da specificare)",
      },
      classifications: {
        a_definir: "Da definire",
      },
    },
  },

  // === PAESI EUROPEI ===
  pays: {
    france: "Francia",
    allemagne: "Germania",
    autriche: "Austria",
    belgique: "Belgio",
    bulgarie: "Bulgaria",
    croatie: "Croazia",
    chypre: "Cipro",
    danemark: "Danimarca",
    espagne: "Spagna",
    estonie: "Estonia",
    finlande: "Finlandia",
    grece: "Grecia",
    hongrie: "Ungheria",
    irlande: "Irlanda",
    italie: "Italia",
    lettonie: "Lettonia",
    lituanie: "Lituania",
    luxembourg: "Lussemburgo",
    malte: "Malta",
    pays_bas: "Paesi Bassi",
    pologne: "Polonia",
    portugal: "Portogallo",
    republique_tcheque: "Repubblica Ceca",
    roumanie: "Romania",
    slovaquie: "Slovacchia",
    slovenie: "Slovenia",
    suede: "Svezia",
  },

  // === PAGINA RIEPILOGO PREVENTIVO (FIRMA) ===
  pageRecap: {
    header: {
      title: "Riepilogo preventivo",
      exportPDF: "Esporta PDF",
      loading: "Caricamento preventivo...",
      notFound: "Preventivo non trovato",
    },
    statut: {
      signe: "Firmato",
      nouveau: "Nuovo",
    },
    dates: {
      creeLe: "Creato il",
      a: "alle",
      signeLe: "Firmato il",
      derniereModification: "Ultima modifica:",
    },
    tooltips: {
      signezPourPDF: "Firma il preventivo per sbloccare il PDF ufficiale",
      signezMaintenant: "Firma ora per ricevere il tuo PDF ufficiale",
      documentDisponible: "Il documento sarà disponibile immediatamente dopo la firma",
      pdfDebloque: "PDF sbloccato!",
      telechargerPDF: "Ora puoi scaricare il tuo preventivo ufficiale in cima alla pagina",
    },
    modales: {
      apercu: {
        title: "Anteprima preventivo",
        imprimer: "Stampa / Salva come PDF",
      },
      cgv: {
        title: "Condizioni Generali di Vendita",
      },
    },
    print: {
      courtage: "Intermediazione di reclutamento europeo",
      documentGenere: "Documento generato il",
    },
    entreprise: {
      title: "Informazioni azienda",
      raisonSociale: "Ragione sociale",
      siret: "SIRET",
      codeAPE: "Codice APE",
      tvaIntracommunautaire: "P.IVA Intracomunitaria",
      adresse: "Indirizzo",
      siteInternet: "Sito web",
    },
    contact: {
      title: "Persona di contatto",
      nomComplet: "Nome completo",
      fonction: "Funzione",
      email: "Email",
      telephonePortable: "Telefono cellulare",
      telephoneFixe: "Telefono fisso",
    },
    postes: {
      title: "Posizioni da coprire",
      nationalite: "Nazionalità",
      salaireBrut: "Salario lordo",
      tauxHoraireBrut: "Tariffa oraria lorda",
      coefficientETT: "Coefficiente agenzia",
      tauxETT: "Tariffa agenzia",
    },
    conditions: {
      title: "Condizioni di lavoro",
      dateDebut: "Data di inizio",
      dateFin: "Data di fine",
      periodeEssai: "Periodo di prova",
      baseHoraire: "Base oraria",
      heuresMois: "h/mese",
      lieuxMission: "Luoghi della missione",
      motifRecours: "Motivo del ricorso",
    },
    candidats: {
      title: "Profilo candidati ricercati",
      experience: "Esperienza",
      ansMinimum: "anni minimo",
      formation: "Formazione",
      permis: "Patente",
      langues: "Lingue",
    },
    signature: {
      title: "Firma elettronica",
      subtitle: "Firma il tuo preventivo online in modo sicuro",
      commencer: "Inizia la firma",
      identiteSignataire: "Identità del firmatario",
      nomComplet: "Nome completo",
      fonction: "Funzione",
      email: "Email",
      entreprise: "Azienda",
      siret: "SIRET",
      signataire: "Firmatario",
      tracabilite: "Tracciabilità tecnica",
      dateHeure: "Data e ora",
      adresseIP: "Indirizzo IP",
      navigateur: "Browser",
      signatureManuscrite: "Firma manoscritta",
      infoLegale: "🔒 Queste informazioni saranno registrate nel certificato di firma elettronica per garantire la tracciabilità e la conformità legale secondo il regolamento eIDAS (UE) n. 910/2014.",
      dessinerSignature: "Disegna la tua firma qui sotto",
      effacer: "Cancella",
      accepteCGV: "Accetto le",
      cgvLien: "Condizioni Generali di Vendita",
      accepteCGVSuite: "e certifico che le informazioni fornite sono corrette. Questa firma elettronica ha lo stesso valore legale di una firma manoscritta.",
      annuler: "Annulla",
      validerSigner: "Convalida e firma",
      signatureEnCours: "Firma in corso...",
      erreurSignatureVide: "Si prega di firmare prima di convalidare",
      erreurCGV: "Si prega di accettare le CGV",
    },
    succes: {
      title: "Preventivo firmato con successo!",
      message: "Questo preventivo è stato firmato elettronicamente. Riceverai presto un'email di conferma con il PDF finale.",
      signeLe: "Firmato il",
    },
    erreurs: {
      chargement: "Impossibile caricare il preventivo",
      generation: "Impossibile generare il PDF",
      signature: "Impossibile firmare il preventivo",
    },
    toast: {
      pdfEnCours: "Generazione PDF in corso...",
      pdfSucces: "PDF generato con successo!",
      signatureSucces: "Preventivo firmato con successo! Un'email di conferma ti è stata inviata.",
    },
  },
  
  // === PAESI EUROPEI ===
  pays: {
    france: "Francia",
    allemagne: "Germania",
    autriche: "Austria",
    belgique: "Belgio",
    bulgarie: "Bulgaria",
    croatie: "Croazia",
    chypre: "Cipro",
    danemark: "Danimarca",
    espagne: "Spagna",
    estonie: "Estonia",
    finlande: "Finlandia",
    grece: "Grecia",
    hongrie: "Ungheria",
    irlande: "Irlanda",
    italie: "Italia",
    lettonie: "Lettonia",
    lituanie: "Lituania",
    luxembourg: "Lussemburgo",
    malte: "Malta",
    pays_bas: "Paesi Bassi",
    pologne: "Polonia",
    portugal: "Portogallo",
    republique_tcheque: "Repubblica Ceca",
    roumanie: "Romania",
    slovaquie: "Slovacchia",
    slovenie: "Slovenia",
    suede: "Svezia",
  },
};