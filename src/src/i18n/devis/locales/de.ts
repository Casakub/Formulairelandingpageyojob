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
  },

  // === SCHRITT 4: BEDINGUNGEN ===
  step4: {
    title: "Arbeitsbedingungen",
    subtitle: "Geben Sie die Arbeitsbedingungen und angebotenen Leistungen an.",
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
};