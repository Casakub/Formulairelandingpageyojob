/**
 * 🇩🇪 DEUTSCHE ÜBERSETZUNGEN - ANGEBOTSANFRAGEFORMULAR
 * 
 * Vollständige deutsche Übersetzungen für das Angebotsformular
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import type { DevisTranslations } from '../types';

export const de: DevisTranslations = {
  // === ALLGEMEIN ===
  common: {
    next: "Weiter",
    previous: "Zurück",
    submit: "Absenden",
    required: "*",
    optional: "(optional)",
    loading: "Lädt...",
    error: "Fehler",
    success: "Erfolg",
    cancel: "Abbrechen",
    save: "Speichern",
    edit: "Bearbeiten",
    delete: "Löschen",
    confirm: "Bestätigen",
    euro: "€",
    perHour: "/Std",
    perMonth: "/Monat",
    perDay: "/Tag",
    persons: "Person(en)",
    hours: "Stunde(n)",
    days: "Tag(e)",
    months: "Monate",
    year: "Jahr(e)",
  },

  // === NAVIGATION ===
  navigation: {
    back: "Zurück",
    stepOf: "Schritt {step} von {total}",
    steps: {
      entreprise: {
        title: "Unternehmen",
        badge: "🏢 Ihr Unternehmen",
      },
      contact: {
        title: "Kontakt",
        badge: "👤 Ihr Kontakt",
      },
      besoins: {
        title: "Bedarf",
        badge: "💼 Ihr Bedarf",
      },
      conditions: {
        title: "Bedingungen",
        badge: "📋 Bedingungen",
      },
      candidats: {
        title: "Kandidaten",
        badge: "👷 Gesuchtes Profil",
      },
      recapitulatif: {
        title: "Zusammenfassung",
        badge: "✅ Zusammenfassung",
      },
    },
  },

  // === VALIDATION ===
  validation: {
    fillRequired: "Bitte füllen Sie alle Pflichtfelder aus",
    selectRegion: "Bitte wählen Sie eine Region",
    addAtLeastOnePosition: "Bitte fügen Sie mindestens eine Stelle hinzu",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    invalidPhone: "Bitte geben Sie eine gültige Telefonnummer ein",
    invalidSIRET: "Bitte geben Sie eine gültige SIRET-Nummer ein (14 Ziffern)",
    dateRequired: "Bitte geben Sie das Startdatum ein",
    missionLocationRequired: "Bitte geben Sie den Einsatzort ein",
  },

  // === MESSAGES ===
  messages: {
    success: {
      quoteSent: "Angebot erfolgreich gesendet!",
      redirecting: "Weiterleitung...",
    },
    error: {
      submitError: "Fehler beim Senden des Angebots",
      genericError: "Ein Fehler ist aufgetreten",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Angebotsanfrage | YOJOB",
    pageDescription: "Fordern Sie ein Angebot für Ihren europäischen Zeitarbeitsbedarf an.",
  },

  // === SCHRITT 1: UNTERNEHMEN ===
  step1: {
    title: "Unternehmensinformationen",
    subtitle: "Geben Sie die rechtlichen Informationen Ihres Unternehmens ein.",
    fields: {
      pays: {
        label: "Land",
        placeholder: "Wählen Sie ein Land",
      },
      raisonSociale: {
        label: "Firmenname",
        placeholder: "z.B. YOJOB GmbH",
      },
      siret: {
        label: "Handelsregisternummer",
        placeholder: "Registrierungsnummer",
        helper: "Ihre Unternehmensregistrierungsnummer",
      },
      codeAPE: {
        label: "Wirtschaftszweig-Code",
        placeholder: "z.B. 7830Z",
      },
      tvaIntracommunautaire: {
        label: "USt-IdNr.",
        placeholder: "z.B. DE123456789",
      },
      adresse: {
        label: "Vollständige Adresse",
        placeholder: "Straße und Hausnummer",
      },
      codePostal: {
        label: "Postleitzahl",
        placeholder: "z.B. 10115",
      },
      ville: {
        label: "Stadt",
        placeholder: "z.B. Berlin",
      },
      region: {
        label: "Region/Bundesland",
        placeholder: "Wählen Sie eine Region",
        placeholderOtherCountry: "z.B. Bayern, Katalonien, Lombardei...",
      },
      siteInternet: {
        label: "Webseite",
        placeholder: "https://www.beispiel.de",
      },
    },
    infoMessage: "✓ Diese Informationen werden zur Erstellung Ihres personalisierten Angebots verwendet",
  },

  // === SCHRITT 2: KONTAKT ===
  step2: {
    title: "Ansprechpartner",
    subtitle: "Wer wird der Hauptansprechpartner für dieses Projekt sein?",
    fields: {
      civilite: {
        label: "Anrede",
        options: {
          m: "Herr",
          mme: "Frau",
        },
      },
      nom: {
        label: "Nachname",
        placeholder: "z.B. Müller",
      },
      prenom: {
        label: "Vorname",
        placeholder: "z.B. Hans",
      },
      fonction: {
        label: "Position",
        placeholder: "z.B. Personalleiter",
      },
      email: {
        label: "Geschäftliche E-Mail",
        placeholder: "hans.mueller@firma.de",
      },
      telephone: {
        label: "Telefonnummer",
        placeholder: "+49 30 12345678",
      },
    },
  },

  // === SCHRITT 3: ANFORDERUNGEN ===
  step3: {
    title: "Definieren Sie Ihren Bedarf",
    subtitle: "Beschreiben Sie genau die gesuchten Positionen.",
    fields: {
      secteur: {
        label: "Branche",
        placeholder: "Wählen Sie eine Branche",
      },
      convention: {
        label: "Tarifvertrag",
        placeholder: "Automatisch je nach Branche",
      },
      poste: {
        label: "Position",
        placeholder: "Wählen Sie eine Position",
      },
      classification: {
        label: "Klassifizierung / Qualifikation",
        placeholder: "Wählen Sie eine Klassifizierung",
      },
      quantite: {
        label: "Anzahl der Personen",
        placeholder: "z.B. 5",
        helper: "Wie viele Personen für diese Position?",
      },
      salaireBrut: {
        label: "Monatliches Bruttogehalt",
        placeholder: "z.B. 2500",
        helper: "Bruttogehalt basierend auf 151,67 Std/Monat",
      },
      nationalite: {
        label: "Nationalität der Arbeitnehmer",
        placeholder: "Wählen Sie ein Land",
        helper: "Die Nationalität beeinflusst den Agenturpreiskoeffizienten",
      },
    },
    ajouterPoste: "Weitere Position hinzufügen",
    supprimerPoste: "Diese Position entfernen",
    posteNumero: "Position",
    coefficientInfo: {
      title: "💡 Angewandter Agenturkoeffizient",
      base: "Basiskoeff.",
      facteurPays: "Länderfaktor",
      final: "Endkoeffizient",
    },
    summary: {
      title: "Arbeitnehmervergütung",
      salaireBrutMensuel: "Bruttomonatsgehalt",
      tauxHoraireBrut: "Bruttostundenlohn",
      baseMensuelle: "(Basis 151,67 Std./Monat gemäß Tarifvertrag)",
    },
  },

  // === SCHRITT 4: BEDINGUNGEN ===
  step4: {
    title: "Arbeitsbedingungen",
    subtitle: "Geben Sie die Arbeitsbedingungen und angebotenen Leistungen an.",
    dateError: "Das Enddatum muss nach dem Startdatum liegen",
    fields: {
      dateDebut: {
        label: "Gewünschtes Startdatum",
        placeholder: "TT.MM.JJJJ",
      },
      dateFin: {
        label: "Voraussichtliches Enddatum",
        placeholder: "TT.MM.JJJJ",
        helper: "Leer lassen bei unbefristeter Dauer",
      },
      baseHoraire: {
        label: "Monatliche Arbeitsstunden",
        placeholder: "z.B. 151,67",
        helper: "Gesetzliche Basis in Frankreich: 151,67 Std/Monat (35 Std/Woche)",
      },
      lieuxMission: {
        label: "Einsatzorte",
        placeholder: "z.B. Paris 15., Lyon 3., Marseille...",
      },
      periodeEssai: {
        label: "Probezeit",
        placeholder: "Wählen Sie eine Dauer",
        options: {
          '2': '2 Tage',
          '3': '3 Tage',
          '5': '5 Tage',
          '15': '15 Tage',
        },
      },
      motifRecours: {
        label: "Grund für Zeitarbeit",
        placeholder: "Wählen Sie einen Grund",
        options: {
          accroissement: "Vorübergehende Aktivitätssteigerung",
          remplacement: "Ersatz für abwesenden Mitarbeiter",
          saisonnier: "Saisonarbeiten",
          exportation: "Außergewöhnlicher Exportauftrag",
          autre: "Andere (bitte angeben)",
        },
      },
      delaiPaiement: {
        label: "Gewünschte Zahlungsfrist",
        placeholder: "Wählen Sie eine Zahlungsfrist",
        options: {
          reception: "Zahlung bei Erhalt",
          j30: "30 Tage",
          j45: "45 Tage",
          j60: "60 Tage",
        },
      },
    },
    hebergement: {
      title: "Unterkunft",
      chargeEU: {
        label: "Unterkunft vom Kundenunternehmen bereitgestellt",
        helper: "Wenn NEIN: Stundenzuschlag von +3,50 €/Std wird von der Agentur berechnet",
      },
      supplementWarning: "⚠️ Ein Zuschlag von +3,50 €/Std wird angewendet, da die Unterkunft nicht bereitgestellt wird",
      commentaire: {
        label: "Details zur Unterkunft",
        placeholder: "Art der Unterkunft, Adresse, besondere Bedingungen...",
      },
    },
    transport: {
      title: "Lokaler Transport",
      chargeETT: {
        label: "Lokaler Transport von der Agentur bereitgestellt",
        helper: "Wenn JA: Stundenzuschlag von +1,50 €/Std wird berechnet",
      },
      supplementInfo: "✓ Ein Zuschlag von +1,50 €/Std wird zur Deckung der lokalen Transportkosten angewendet",
    },
    repas: {
      title: "Mahlzeiten",
      options: {
        restaurant: "Betriebskantine / Essensgutscheine",
        panier: "Lunchpaket (tageweise abgerechnet)",
        nonConcerne: "Nicht zutreffend",
      },
      montantInfo: "📋 Lunchpaket-Betrag: {montant} / Arbeitstag (separat abgerechnet)",
      montantNonDefini: "⚠️ Betrag für dieses Land/Region nicht definiert",
    },
    sections: {
      hebergement: {
        title: "Unterkunft",
        chargeEU: {
          label: "Unterkunft vom Kundenunternehmen bereitgestellt",
          helper: "Wenn NEIN: Stundenzuschlag von +3,50 €/Std wird von der Agentur berechnet",
          options: {
            oui: "Ja, vom Kunden bereitgestellt",
            non: "Nein, Verantwortung der Agentur",
          },
        },
        detailsEU: {
          type: {
            label: "Art der Unterkunft",
            options: {
              hotel: "Hotel",
              appartement: "Wohnung",
              foyer: "Herberge",
              autre: "Andere",
            },
          },
          adresse: {
            label: "Adresse der Unterkunft",
            placeholder: "Vollständige Adresse",
          },
        },
      },
      transportInternational: {
        title: "Internationaler Transport (Heimatland ↔ Frankreich)",
        chargeEU: {
          label: "Transport vom Kundenunternehmen bereitgestellt",
          helper: "Reisen zwischen Heimatland und Einsatzort",
          options: {
            oui: "Ja, vom Kunden bereitgestellt",
            non: "Nein, Verantwortung des Arbeitnehmers",
          },
        },
        detailsEU: {
          type: {
            label: "Transportart",
            options: {
              avion: "Flugzeug",
              train: "Zug",
              bus: "Bus/Reisebus",
              covoiturage: "Organisierte Fahrgemeinschaft",
            },
          },
          frequence: {
            label: "Reisehäufigkeit",
            options: {
              allerRetour: "Nur anfängliche Hin- und Rückfahrt",
              hebdomadaire: "Wöchentlich",
              mensuel: "Monatlich",
            },
          },
        },
      },
      transportLocal: {
        title: "Lokaler Transport (am Einsatzort)",
        chargeETT: {
          label: "Lokaler Transport von der Agentur bereitgestellt",
          helper: "Wenn JA: Stundenzuschlag von +1,50 €/Std wird berechnet",
          options: {
            oui: "Ja, von der Agentur bereitgestellt",
            non: "Nein",
          },
        },
        detailsETT: {
          type: {
            label: "Transportart",
            options: {
              vehicule: "Dienstfahrzeug",
              transport: "ÖPNV-Ticket",
              velo: "Fahrrad/Roller",
            },
          },
        },
      },
      repas: {
        title: "Verpflegung",
        type: {
          label: "Verpflegungslösung",
          options: {
            restaurant: "Firmenkantine / Essensmarken",
            panier: "Lunchpaket (pro Tag abgerechnet)",
            nonConcerne: "Nicht zutreffend",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Tagesbudget",
            placeholder: "z.B. 12,00",
          },
        },
        detailsPanier: {
          info: "Lunchpaket wird separat pro Arbeitstag nach dem Tarif des Heimatlandes abgerechnet",
        },
      },
    },
  },

  // === SCHRITT 5: KANDIDATEN ===
  step5: {
    title: "Kandidatenprofil",
    subtitle: "Definieren Sie spezifische Fähigkeiten und Anforderungen.",
    sections: {
      experience: {
        title: "Berufserfahrung",
        obligatoire: {
          label: "Erforderliche Erfahrung",
        },
        annees: {
          label: "Mindestjahre Erfahrung",
          placeholder: "Wählen Sie ein Niveau",
          options: {
            '0-1': "Anfänger (0-1 Jahr)",
            '1-3': "Mittelstufe (1-3 Jahre)",
            '3-5': "Erfahren (3-5 Jahre)",
            '5+': "Experte (5+ Jahre)",
          },
        },
        competences: {
          label: "Erforderliche technische Fähigkeiten",
          placeholder: "z.B. Maurerarbeiten, Schalungsarbeiten, Planlesung, WIG-Schweißen...",
        },
      },
      formation: {
        title: "Ausbildung",
        obligatoire: {
          label: "Erforderliche Ausbildung",
        },
        type: {
          label: "Art der Ausbildung",
          placeholder: "z.B. Maurerausbildung, Gabelstaplerführerschein...",
        },
      },
      langues: {
        title: "Sprachkenntnisse",
        francais: {
          label: "Erforderliches Französischniveau",
          placeholder: "Wählen Sie ein Niveau",
          options: {
            a1: "A1 - Anfänger",
            a2: "A2 - Grundkenntnisse",
            b1: "B1 - Mittelstufe",
            b2: "B2 - Gute Mittelstufe",
            c1: "C1 - Fortgeschritten",
            c2: "C2 - Kompetent",
            natif: "Muttersprachler",
          },
        },
        autres: {
          label: "Andere nützliche Sprachen",
          placeholder: "z.B. Englisch (B1), Deutsch (A2)...",
        },
        // Sprachnamen
        languageNames: {
          francais: "Französisch",
          anglais: "Englisch",
          portugais: "Portugiesisch",
          espagnol: "Spanisch",
          italien: "Italienisch",
          autre: "Andere",
        },
        // Sprachniveaus
        levels: {
          'non-requis': "Nicht erforderlich",
          'A1': "A1 - Anfänger",
          'A2': "A2 - Grundkenntnisse",
          'B1': "B1 - Mittelstufe",
          'B2': "B2 - Fortgeschritten",
          'C1': "C1 - Autonom",
          'C2': "C2 - Kompetent",
        },
      },
      permis: {
        title: "Führerschein",
        requis: {
          label: "Erforderlicher Führerschein",
          options: {
            aucun: "Kein Führerschein erforderlich",
            b: "Führerschein B (PKW)",
            c: "Führerschein C (LKW)",
            ce: "Führerschein CE (LKW + Anhänger)",
            d: "Führerschein D (Personentransport)",
          },
        },
        categorie: {
          label: "Führerscheinkategorie",
          placeholder: "z.B. B, C, CE...",
        },
      },
      outillage: {
        title: "Kleinwerkzeug",
        requis: {
          label: "Persönliches Werkzeug erforderlich",
        },
        type: {
          label: "Art des Werkzeugs",
          placeholder: "z.B. Hammer, Wasserwaage, Maßband, Kelle...",
        },
      },
      epi: {
        title: "Persönliche Schutzausrüstung (PSA)",
        infoLegale: "ℹ️ Gemäß den Vorschriften muss der Arbeitgeber PSA bereitstellen, die den Risiken der Stelle entspricht.",
        selectionCount: "✓ {count} PSA ausgewählt",
        fournis: {
          label: "PSA vom Unternehmen bereitgestellt",
          helper: "Helm, Sicherheitsschuhe, Handschuhe usw.",
          options: {
            oui: "Ja, vom Kunden bereitgestellt",
            non: "Nein, Verantwortung des Arbeitnehmers",
          },
        },
        liste: {
          label: "Liste der erforderlichen PSA",
          placeholder: "z.B. Helm, S3-Sicherheitsschuhe, schnittfeste Handschuhe, Geschirr...",
        },
        // PSA-Artikel
        items: {
          casque: "Schutzhelm",
          lunettes: "Schutzbrille",
          protections_auditives: "Gehörschutz",
          gants: "Schutzhandschuhe",
          chaussures: "Sicherheitsschuhe",
          harnais: "Sicherheitsgurt",
          vetements: "Arbeitskleidung",
          masque: "Atemschutzmaske",
          protection_faciale: "Gesichtsschutz",
          vetements_visibilite: "Warnkleidung",
        },
      },
      autresExigences: {
        title: "Weitere Anforderungen",
        label: "Zusätzliche spezifische Anforderungen",
        placeholder: "z.B. Elektrozertifikate, Staplerschein, Wochenendverfügbarkeit, Höhenarbeit...",
      },
    },
  },

  // === ZUSAMMENFASSUNG ===
  recapitulatif: {
    title: "Zusammenfassung Ihrer Anfrage",
    subtitle: "Überprüfen Sie die Informationen vor dem Absenden Ihrer Angebotsanfrage.",
    acceptConditionsError: "Bitte akzeptieren Sie die Bedingungen, bevor Sie fortfahren",
    entreprise: {
      title: "Unternehmen",
      raisonSociale: "Firmenname",
      siret: "Registrierungsnummer",
      pays: "Land",
      ville: "Stadt",
      region: "Region/Bundesland",
    },
    contact: {
      title: "Kontakt",
      nomPrenom: "Name",
      email: "E-Mail",
      telephone: "Telefon",
      fonction: "Position",
    },
    postes: {
      title: "Angeforderte Positionen",
      coeffETT: "📊 Angewandter Agenturkoeffizient",
      coeffBase: "Basiskoeff.",
      facteurPays: "Länderfaktor",
      supplementsHoraires: "✨ Stundenzuschläge (im Tarif enthalten)",
      hebergement: "✓ Unterkunft",
      transport: "✓ Lokaler Transport",
      panierRepas: "🍽️ Lunchpaket (pro Tag abgerechnet)",
      baseHoraire: "📅 Monatliche Stunden: {heures} Std/Monat (Überstunden erkannt)",
      heuresNormales: "Normalstunden (0-35 Std/Wo)",
      heuresSup25: "Überstunden +25% (36.-43. Std)",
      heuresSup50: "Überstunden +50% (44.+ Std)",
      sousTotal: "Arbeitskosten-Zwischensumme (pro Person)",
      tauxHoraireBrut: "Bruttostundensatz",
      tauxETTFinal: "Endagenturstundensatz",
      coutMensuel: "Gesamte Monatskosten",
    },
    conditions: {
      title: "Einsatzbedingungen",
      dateDebut: "Startdatum",
      dateFin: "Enddatum",
      dureeEstimee: "Geschätzte Dauer",
      lieuMission: "Einsatzort",
      mois: "Monate",
    },
    majorations: {
      title: "Angewandte Anpassungen",
      total: "Gesamtanpassungen",
      notSet: "Nicht angegeben",
    },
    totaux: {
      mensuelHT: "Monatssumme (netto)",
      mensuelTTC: "Monatssumme (brutto)",
      totalMission: "Gesamte Einsatzkosten",
    },
    noteLegale: "ℹ️ Diese Schätzung ist indikativ. Der endgültige Preis wird nach Bestätigung durch unser Team und die ausgewählte Partneragentur bestätigt.",
    acceptConditions: {
      text: "Ich stimme zu, dass meine Daten gemäß der",
      lien: "Datenschutzrichtlinie",
    },
    boutonEnvoi: {
      texte: "Meine Angebotsanfrage absenden",
      enCours: "Wird gesendet...",
    },
    footer: "✓ Antwort innerhalb von 24 Geschäftsstunden • ✓ Unverbindlich",
  },

  // === FEHLER ===
  errors: {
    required: "Dieses Feld ist erforderlich",
    invalidEmail: "Ungültige E-Mail-Adresse",
    invalidSIRET: "Ungültige Registrierungsnummer",
    invalidPhone: "Ungültige Telefonnummer",
    minValue: "Der Wert muss größer oder gleich {min} sein",
    maxValue: "Der Wert muss kleiner oder gleich {max} sein",
    genericError: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    loadingError: "Fehler beim Laden der Daten",
    submitError: "Fehler beim Absenden der Anfrage",
  },

  // === SEKTOREN & BERUFE ===
  secteurs: {
    batiment: {
      label: "Bauwesen",
      convention: "Tarifvertrag Bauarbeiter (3193)",
      postes: {
        macon: "Maurer",
        coffreur: "Schaler",
        ferrailleur: "Eisenflechter",
        carreleur: "Fliesenleger",
        platrier: "Gipser",
        peintre: "Maler",
        plombier: "Klempner",
        electricien: "Elektriker",
        couvreur: "Dachdecker",
        menuisier: "Schreiner",
        chef_equipe_batiment: "Vorarbeiter",
        chef_chantier: "Bauleiter",
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
      label: "Metallverarbeitung",
      convention: "Tarifvertrag Metallindustrie (3109)",
      postes: {
        soudeur: "Schweißer",
        chaudronnier: "Kesselschmied",
        tuyauteur: "Rohrleger",
        tourneur: "Dreher",
        fraiseur: "Fräser",
        usineur: "Zerspanungsmechaniker",
        mecanicien_industriel: "Industriemechaniker",
        monteur: "Monteur",
        controleur_qualite: "Qualitätsprüfer",
        ajusteur: "Schlosser",
        chef_equipe_metallurgie: "Vorarbeiter",
      },
      classifications: {
        niveau_1: "Stufe I",
        niveau_2: "Stufe II",
        niveau_3: "Stufe III",
        niveau_4: "Stufe IV",
        niveau_5: "Stufe V",
      },
    },
    tp: {
      label: "Tiefbau",
      convention: "Tarifvertrag Tiefbau (3005)",
      postes: {
        conducteur_engins: "Baggerführer",
        terrassier: "Erdarbeiter",
        canalisateur: "Kanalbauer",
        constructeur_routes: "Straßenbauer",
        coffreur_bancheur: "Schalungsbauer",
        macon_vrd: "VRD-Maurer",
        chef_equipe_tp: "Tiefbau-Vorarbeiter",
        manoeuvre_tp: "Tiefbau-Helfer",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotellerie",
      convention: "Tarifvertrag Gastgewerbe (3292)",
      postes: {
        receptionniste: "Rezeptionist",
        femme_chambre: "Zimmermädchen",
        agent_entretien: "Reinigungskraft",
        bagagiste: "Gepäckträger",
        concierge: "Concierge",
        night_audit: "Nachtportier",
        gouvernante: "Hausdame",
        chef_reception: "Rezeptionsleiter",
      },
      classifications: {
        niveau_1: "Stufe I",
        niveau_2: "Stufe II",
        niveau_3: "Stufe III",
        niveau_4: "Stufe IV",
        niveau_5: "Stufe V",
      },
    },
    restauration: {
      label: "Gastronomie",
      convention: "Tarifvertrag Gastgewerbe (3292)",
      postes: {
        cuisinier: "Koch",
        commis_cuisine: "Jungkoch",
        chef_partie: "Chef de Partie",
        serveur: "Kellner",
        barman: "Barkeeper",
        plongeur: "Spüler",
        chef_rang: "Oberkellner",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Souschef",
        chef_cuisine: "Küchenchef",
      },
      classifications: {
        niveau_1: "Stufe I",
        niveau_2: "Stufe II",
        niveau_3: "Stufe III",
        niveau_4: "Stufe IV",
        niveau_5: "Stufe V",
      },
    },
    plasturgie: {
      label: "Kunststoffindustrie",
      convention: "Tarifvertrag Kunststoffindustrie (0292)",
      postes: {
        operateur_injection: "Spritzgießer",
        operateur_extrusion: "Extruder",
        regleur: "Einrichter",
        operateur_thermoformage: "Thermoformer",
        controleur_qualite_plasturgie: "Qualitätsprüfer",
        technicien_maintenance: "Wartungstechniker",
        chef_equipe_plasturgie: "Vorarbeiter",
      },
      classifications: {
        niveau_1: "Stufe I",
        niveau_2: "Stufe II",
        niveau_3: "Stufe III",
        niveau_4: "Stufe IV",
      },
    },
    automobile_carrosserie: {
      label: "Automobil & Karosseriebau",
      convention: "Tarifvertrag Kfz-Gewerbe (1090)",
      postes: {
        carrossier: "Karosseriebauer",
        peintre_automobile: "Autolackierer",
        mecanicien_auto: "Kfz-Mechaniker",
        electricien_auto: "Kfz-Elektriker",
        chef_atelier: "Werkstattleiter",
        controleur_technique: "TÜV-Prüfer",
      },
      classifications: {
        niveau_1: "Stufe I",
        niveau_2: "Stufe II",
        niveau_3: "Stufe III",
        niveau_4: "Stufe IV",
      },
    },
    sylviculture: {
      label: "Forstwirtschaft",
      convention: "Tarifvertrag Landwirtschaft (7501)",
      postes: {
        bucheron: "Holzfäller",
        elagueur: "Baumkletterer",
        conducteur_engins_forestiers: "Forstmaschinenführer",
        chef_equipe_sylviculture: "Forstwirtschaftsvorarbeiter",
      },
      classifications: {
        niveau_1: "Stufe I",
        niveau_2: "Stufe II",
        niveau_3: "Stufe III",
        niveau_4: "Stufe IV",
      },
    },
    cartonnerie: {
      label: "Kartonagenindustrie",
      convention: "Tarifvertrag Verarbeitende Industrie (3107)",
      postes: {
        operateur_production: "Produktionsarbeiter",
        conducteur_ligne: "Linienführer",
        regleur_cartonnerie: "Einrichter",
        chef_equipe_cartonnerie: "Vorarbeiter",
      },
      classifications: {
        niveau_1: "Stufe I",
        niveau_2: "Stufe II",
        niveau_3: "Stufe III",
        niveau_4: "Stufe IV",
      },
    },
    autre: {
      label: "Andere",
      convention: "Je nach Tätigkeit zu definieren",
      postes: {
        autre_poste: "Andere Position (bitte angeben)",
      },
      classifications: {
        a_definir: "Zu definieren",
      },
    },
  },
};