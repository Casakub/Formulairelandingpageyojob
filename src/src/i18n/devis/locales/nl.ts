/**
 * 🇳🇱 NEDERLANDSE VERTALINGEN - OFFERTEFORMULIER
 * 
 * Volledige Nederlandse vertalingen voor het aanvraagformulier voor offertes
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const nl: DevisTranslations = {
  // === ALGEMEEN ===
  common: {
    next: "Volgende",
    previous: "Vorige",
    submit: "Verzenden",
    required: "*",
    optional: "(optioneel)",
    loading: "Laden...",
    error: "Fout",
    success: "Succes",
    cancel: "Annuleren",
    save: "Opslaan",
    edit: "Bewerken",
    delete: "Verwijderen",
    confirm: "Bevestigen",
    euro: "€",
    perHour: "/u",
    perMonth: "/maand",
    perDay: "/dag",
    persons: "persoon/personen",
    hours: "uur/uren",
    days: "dag(en)",
    months: "maanden",
    year: "jaar/jaren",
  },

  // === NAVIGATIE ===
  navigation: {
    back: "Terug",
    stepOf: "Stap {step} van {total}",
    steps: {
      entreprise: {
        title: "Bedrijf",
        badge: "🏢 Uw bedrijf",
      },
      contact: {
        title: "Contact",
        badge: "👤 Uw contactpersoon",
      },
      besoins: {
        title: "Behoeften",
        badge: "💼 Uw behoeften",
      },
      conditions: {
        title: "Voorwaarden",
        badge: "📋 Voorwaarden",
      },
      candidats: {
        title: "Kandidaten",
        badge: "👷 Gezocht profiel",
      },
      recapitulatif: {
        title: "Samenvatting",
        badge: "✅ Samenvatting",
      },
    },
  },

  // === VALIDATIE ===
  validation: {
    fillRequired: "Vul alle verplichte velden in",
    selectRegion: "Selecteer een regio",
    addAtLeastOnePosition: "Voeg minimaal één functie toe",
    invalidEmail: "Voer een geldig e-mailadres in",
    invalidPhone: "Voer een geldig telefoonnummer in",
    invalidSIRET: "Voer een geldig SIRET-nummer in (14 cijfers)",
    dateRequired: "Voer de startdatum in",
    missionLocationRequired: "Voer de opdrachtslocatie in",
  },

  // === BERICHTEN ===
  messages: {
    success: {
      quoteSent: "Offerte succesvol verzonden!",
      redirecting: "Doorverwijzen...",
    },
    error: {
      submitError: "Fout bij verzenden van offerte",
      genericError: "Er is een fout opgetreden",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Offerte aanvragen | YOJOB",
    pageDescription: "Vraag een offerte aan voor uw Europese uitzendbehoeften.",
  },

  // === STAP 1: BEDRIJF ===
  step1: {
    title: "Bedrijfsgegevens",
    subtitle: "Voer de juridische gegevens van uw inlenend bedrijf in.",
    fields: {
      pays: {
        label: "Land",
        placeholder: "Selecteer een land",
      },
      raisonSociale: {
        label: "Bedrijfsnaam",
        placeholder: "Bijv.: YOJOB BV",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 cijfers",
        helper: "Identificatienummer van uw vestiging",
      },
      codeAPE: {
        label: "APE/NAF-code",
        placeholder: "Bijv.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Intracommunautair btw-nummer",
        placeholder: "Bijv.: NL123456789B01",
      },
      adresse: {
        label: "Volledig adres",
        placeholder: "Huisnummer en straatnaam",
      },
      codePostal: {
        label: "Postcode",
        placeholder: "Bijv.: 1012 AB",
      },
      ville: {
        label: "Plaats",
        placeholder: "Bijv.: Amsterdam",
      },
      region: {
        label: "Regio/Provincie",
        placeholder: "Selecteer een regio",
        placeholderOtherCountry: "Bijv.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Website",
        placeholder: "https://www.voorbeeld.nl",
      },
    },
    infoMessage: "✓ Deze informatie wordt gebruikt voor het opstellen van uw gepersonaliseerde offerte",
  },

  // === STAP 2: CONTACTPERSOON ===
  step2: {
    title: "Contactpersoon",
    subtitle: "Wie wordt uw vaste contactpersoon voor dit project?",
    fields: {
      civilite: {
        label: "Aanhef",
        options: {
          m: "Dhr.",
          mme: "Mevr.",
        },
      },
      nom: {
        label: "Achternaam",
        placeholder: "Bijv.: de Jong",
      },
      prenom: {
        label: "Voornaam",
        placeholder: "Bijv.: Jan",
      },
      fonction: {
        label: "Functie",
        placeholder: "Bijv.: HR-manager",
      },
      email: {
        label: "Zakelijk e-mailadres",
        placeholder: "jan.dejong@bedrijf.nl",
      },
      telephone: {
        label: "Telefoonnummer",
        placeholder: "+31 6 12345678",
      },
    },
  },

  // === STAP 3: BEHOEFTEN ===
  step3: {
    title: "Uw wervingsbehoeften",
    subtitle: "Beschrijf de gezochte profielen en hun voorwaarden.",
    profileLabel: "Profiel",
    addProfile: "Extra profiel toevoegen",
    removeProfile: "Dit profiel verwijderen",
    loadingConfig: "Configuratie laden...",
    missingRegionWarning: "⚠️ Selecteer uw regio in stap 1 om salarissen automatisch weer te geven.",
    fields: {
      secteur: {
        label: "Bedrijfssector",
        placeholder: "Selecteer een sector",
      },
      convention: {
        label: "Collectieve arbeidsovereenkomst",
        placeholder: "Automatisch volgens sector",
      },
      poste: {
        label: "Gezochte functie",
        placeholder: "Selecteer een functie",
      },
      classification: {
        label: "Classificatie / Kwalificatie",
        placeholder: "Selecteer een classificatie",
      },
      quantite: {
        label: "Aantal personen",
        placeholder: "Bijv.: 5",
        helper: "Hoeveel personen voor deze functie?",
      },
      salaireBrut: {
        label: "Bruto maandsalaris",
        placeholder: "Bijv.: 2500",
        helper: "Brutosalaris op basis van 151,67u/maand",
      },
      nationalite: {
        label: "Nationaliteit werknemers",
        placeholder: "Selecteer een land",
        helper: "De nationaliteit beïnvloedt de tariefcoëfficiënt van het uitzendbureau",
      },
    },
    ajouterPoste: "Andere functie toevoegen",
    supprimerPoste: "Deze functie verwijderen",
    posteNumero: "Functie",
    coefficientInfo: {
      title: "💡 Toegepaste uitzendcoëfficiënt",
      base: "Basiscoëff.",
      facteurPays: "Landfactor",
      final: "Eindcoëfficiënt",
    },
    summary: {
      title: "Beloning werknemer",
      salaireBrutMensuel: "Bruto maandsalaris",
      tauxHoraireBrut: "Bruto uurtarief",
      baseMensuelle: "(Basis 151,67u/maand volgens CAO)",
    },
  },

  // === STAP 4: VOORWAARDEN ===
  step4: {
    title: "Arbeidsvoorwaarden",
    subtitle: "Specificeer de arbeidsvoorwaarden en aangeboden voordelen.",
    dateError: "De einddatum moet na de startdatum liggen",
    fields: {
      dateDebut: {
        label: "Gewenste startdatum",
        placeholder: "DD/MM/JJJJ",
      },
      dateFin: {
        label: "Verwachte einddatum",
        placeholder: "DD/MM/JJJJ",
        helper: "Laat leeg bij onbepaalde duur",
      },
      baseHoraire: {
        label: "Maandelijkse uurbasis",
        placeholder: "Bijv.: 151,67",
        helper: "Wettelijke basis Frankrijk: 151,67u/maand (35u/week)",
      },
      lieuxMission: {
        label: "Opdrachtslocaties",
        placeholder: "Bijv.: Amsterdam Centrum, Rotterdam Zone 3, Utrecht...",
      },
      periodeEssai: {
        label: "Proefperiode",
        placeholder: "Selecteer een duur",
        options: {
          '2': '2 dagen',
          '3': '3 dagen',
          '5': '5 dagen',
          '15': '15 dagen',
        },
      },
      motifRecours: {
        label: "Reden voor uitzendwerk",
        placeholder: "Selecteer een reden",
        options: {
          accroissement: "Tijdelijke activiteitengroei",
          remplacement: "Vervanging afwezige werknemer",
          saisonnier: "Seizoenswerkzaamheden",
          exportation: "Uitzonderlijke exportorder",
          autre: "Andere (te specificeren)",
        },
      },
      delaiPaiement: {
        label: "Gewenste betalingstermijn",
        placeholder: "Selecteer een termijn",
        options: {
          reception: "Betaling bij ontvangst",
          j30: "30 dagen",
          j45: "45 dagen",
          j60: "60 dagen",
        },
      },
    },
    hebergement: {
      title: "Huisvesting",
      chargeEU: {
        label: "Huisvesting verzorgd door inlenend bedrijf",
        helper: "Indien NEE: uurtoeslag van +3,50 €/u wordt door het uitzendbureau gefactureerd",
      },
      supplementWarning: "⚠️ Een toeslag van +3,50 €/u wordt toegepast omdat huisvesting niet verzorgd is",
      commentaire: {
        label: "Details over huisvesting",
        placeholder: "Type huisvesting, adres, bijzondere voorwaarden...",
      },
    },
    transport: {
      title: "Lokaal Vervoer",
      chargeETT: {
        label: "Lokaal vervoer verzorgd door uitzendbureau",
        helper: "Indien JA: uurtoeslag van +1,50 €/u wordt gefactureerd",
      },
      supplementInfo: "✓ Een toeslag van +1,50 €/u wordt toegepast voor lokale vervoerskosten",
    },
    repas: {
      title: "Maaltijden",
      options: {
        restaurant: "Bedrijfsrestaurant / Maaltijdcheques",
        panier: "Maaltijdvergoeding (per dag gefactureerd)",
        nonConcerne: "Niet van toepassing",
      },
      montantInfo: "📋 Bedrag maaltijdvergoeding: {montant} / gewerkte dag (apart gefactureerd)",
      montantNonDefini: "⚠️ Bedrag niet gedefinieerd voor dit land/regio",
    },
    sections: {
      hebergement: {
        title: "Huisvesting",
        chargeEU: {
          label: "Huisvesting verzorgd door inlenend bedrijf",
          helper: "Indien NEE: uurtoeslag van +3,50 €/u wordt door het uitzendbureau gefactureerd",
          options: {
            oui: "Ja, verzorgd door inlener",
            non: "Nee, voor rekening werknemer",
          },
        },
        detailsEU: {
          type: {
            label: "Type huisvesting",
            options: {
              hotel: "Hotel",
              appartement: "Appartement",
              foyer: "Woonhuis",
              autre: "Andere",
            },
          },
          adresse: {
            label: "Adres huisvesting",
            placeholder: "Volledig adres van de huisvesting",
          },
        },
      },
      transportInternational: {
        title: "Internationaal vervoer (land van herkomst ↔ Frankrijk)",
        chargeEU: {
          label: "Vervoer verzorgd door inlenend bedrijf",
          helper: "Reizen tussen land van herkomst en opdrachtslocatie",
          options: {
            oui: "Ja, verzorgd door inlener",
            non: "Nee, voor rekening werknemer",
          },
        },
        detailsEU: {
          type: {
            label: "Type vervoer",
            options: {
              avion: "Vliegtuig",
              train: "Trein",
              bus: "Bus",
              covoiturage: "Georganiseerd carpoolen",
            },
          },
          frequence: {
            label: "Reisfrequentie",
            options: {
              allerRetour: "Alleen initiële retour",
              hebdomadaire: "Wekelijks",
              mensuel: "Maandelijks",
            },
          },
        },
      },
      transportLocal: {
        title: "Lokaal vervoer",
        chargeETT: {
          label: "Lokaal vervoer verzorgd door uitzendbureau",
          helper: "Indien JA: uurtoeslag van +1,50 €/u wordt gefactureerd",
          options: {
            oui: "Ja, voor rekening uitzendbureau",
            non: "Nee, voor rekening werknemer",
          },
        },
        detailsETT: {
          type: {
            label: "Type vervoer",
            options: {
              vehicule: "Bedrijfsvoertuig",
              transport: "Openbaar vervoer",
              velo: "Fiets",
            },
          },
        },
      },
      repas: {
        title: "Maaltijden",
        type: {
          label: "Type maaltijdvoorziening",
          options: {
            restaurant: "Bedrijfsrestaurant / Maaltijdcheques",
            panier: "Maaltijdvergoeding (per dag gefactureerd)",
            nonConcerne: "Niet van toepassing",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Dagelijks budget",
            placeholder: "Bedrag in €",
          },
        },
        detailsPanier: {
          info: "De maaltijdvergoeding wordt apart gefactureerd per gewerkte dag",
        },
      },
    },
  },

  // === STAP 5: KANDIDATEN ===
  step5: {
    title: "Profiel kandidaten",
    subtitle: "Definieer de competenties en specifieke vereisten.",
    sections: {
      experience: {
        title: "Werkervaring",
        obligatoire: {
          label: "Ervaring verplicht",
        },
        annees: {
          label: "Minimaal aantal jaren ervaring",
          placeholder: "Bijv.: 3",
          options: {
            '0-1': "Beginner (0-1 jaar)",
            '1-3': "Gemiddeld (1-3 jaar)",
            '3-5': "Gevorderd (3-5 jaar)",
            '5+': "Expert (5 jaar en meer)",
          },
        },
        competences: {
          label: "Vereiste technische competenties",
          placeholder: "Bijv.: Metselwerk, bekisting, plantekeningen lezen, TIG-lassen...",
        },
      },
      formation: {
        title: "Opleiding",
        obligatoire: {
          label: "Opleiding verplicht",
        },
        type: {
          label: "Type opleiding",
          placeholder: "Bijv.: MBO Metselaar, CACES R489...",
        },
      },
      travailRisque: {
        title: "Risicovolle werkzaamheden",
        active: {
          label: "Specifieke risicovolle werkzaamheden",
        },
        precisions: {
          label: "Specificaties over risico's",
          placeholder: "Bijv.: Werken op hoogte, tillen van zware lasten...",
        },
      },
      langues: {
        title: "Taalvaardigheden",
        francais: {
          label: "Vereist niveau Frans",
          placeholder: "Selecteer een niveau",
          options: {
            a1: "A1 - Beginner",
            a2: "A2 - Elementair",
            b1: "B1 - Gemiddeld",
            b2: "B2 - Gevorderd gemiddeld",
            c1: "C1 - Gevorderd",
            c2: "C2 - Beheersing",
            natif: "Moedertaal",
          },
        },
        autres: {
          label: "Andere nuttige talen",
          placeholder: "Bijv.: Engels (B1), Duits (A2)...",
        },
        languageNames: {
          francais: "Frans",
          anglais: "Engels",
          portugais: "Portugees",
          espagnol: "Spaans",
          italien: "Italiaans",
          autre: "Andere",
        },
        levels: {
          'non-requis': "Niet vereist",
          'A1': "A1 - Beginner",
          'A2': "A2 - Elementair",
          'B1': "B1 - Gemiddeld",
          'B2': "B2 - Gevorderd",
          'C1': "C1 - Zelfstandig",
          'C2': "C2 - Beheersing",
        },
      },
      permis: {
        title: "Rijbewijs",
        requis: {
          label: "Vereist rijbewijs",
          options: {
            aucun: "Geen rijbewijs vereist",
            b: "Rijbewijs B (personenauto)",
            c: "Rijbewijs C (vrachtwagen)",
            ce: "Rijbewijs CE (vrachtwagen + aanhanger)",
            d: "Rijbewijs D (personenvervoer)",
          },
        },
        categorie: {
          label: "Rijbewijscategorie",
          placeholder: "Bijv.: B, C, CE...",
        },
      },
      outillage: {
        title: "Klein gereedschap",
        requis: {
          label: "Eigen gereedschap vereist",
        },
        type: {
          label: "Type gereedschap",
          placeholder: "Bijv.: Hamer, waterpas, rolmaat, troffel...",
        },
      },
      epi: {
        title: "Persoonlijke beschermingsmiddelen (PBM)",
        infoLegale: "ℹ️ Volgens regelgeving moet de werkgever PBM verstrekken die zijn aangepast aan de risico's van de functie.",
        selectionCount: "✓ {count} PBM geselecteerd",
        fournis: {
          label: "PBM verstrekt door bedrijf",
          helper: "Helm, veiligheidsschoenen, handschoenen, enz.",
          options: {
            oui: "Ja, verstrekt door inlener",
            non: "Nee, voor rekening werknemer",
          },
        },
        liste: {
          label: "Lijst benodigde PBM",
          placeholder: "Bijv.: Helm, S3-schoenen, snijbestendige handschoenen, valbeveiliging...",
        },
        items: {
          casque: "Veiligheidshelm",
          lunettes: "Veiligheidsbril",
          protections_auditives: "Gehoorbescherming",
          gants: "Beschermende handschoenen",
          chaussures: "Veiligheidsschoenen",
          harnais: "Valbeveiligingsharnas",
          vetements: "Werkkleding",
          masque: "Ademhalingsmasker",
          protection_faciale: "Gelaatsbescherming",
          vetements_visibilite: "Hoge zichtbaarheidskleding",
        },
      },
      autresExigences: {
        title: "Overige vereisten",
        label: "Aanvullende specifieke vereisten",
        placeholder: "Bijv.: Elektrische bevoegdheden, CACES, weekendbeschikbaarheid, werken op hoogte...",
      },
    },
  },

  // === SAMENVATTING ===
  recapitulatif: {
    title: "Samenvatting van uw aanvraag",
    subtitle: "Controleer de informatie voordat u uw offerteaanvraag verzendt.",
    acceptConditionsError: "Accepteer de voorwaarden voordat u verdergaat",
    entreprise: {
      title: "Bedrijf",
      raisonSociale: "Bedrijfsnaam",
      siret: "SIRET",
      pays: "Land",
      ville: "Plaats",
      region: "Regio/Provincie",
    },
    contact: {
      title: "Contact",
      nomPrenom: "Naam en voornaam",
      email: "E-mail",
      telephone: "Telefoon",
      fonction: "Functie",
    },
    postes: {
      title: "Aangevraagde functies",
      coeffETT: "📊 Toegepaste uitzendcoëfficiënt",
      coeffBase: "Basiscoëff.",
      facteurPays: "Landfactor",
      supplementsHoraires: "✨Uurtoeslagen (inbegrepen in tarief)",
      hebergement: "✓ Huisvesting",
      transport: "✓ Lokaal vervoer",
      panierRepas: "🍽️ Maaltijdvergoeding (per dag gefactureerd)",
      baseHoraire: "📅 Uurbasis: {heures}u/maand (overuren gedetecteerd)",
      heuresNormales: "Normale uren (0-35u/week)",
      heuresSup25: "Overuren +25% (36e-43e u)",
      heuresSup50: "Overuren +50% (44e+ u)",
      sousTotal: "Subtotaal arbeid (per persoon)",
      tauxHoraireBrut: "Bruto uurtarief",
      tauxETTFinal: "Eindtarief uitzendbureau",
      coutMensuel: "Totale maandelijkse kosten",
    },
    conditions: {
      title: "Opdrachtsvoorwaarden",
      dateDebut: "Startdatum",
      dateFin: "Einddatum",
      dureeEstimee: "Geschatte duur",
      lieuMission: "Opdrachtslocatie",
      mois: "maanden",
    },
    totaux: {
      mensuelHT: "Maandtotaal excl. btw",
      mensuelTTC: "Maandtotaal incl. btw",
      totalMission: "Totale kosten opdracht",
    },
    noteLegale: "ℹ️ Deze schatting is indicatief. Het definitieve tarief wordt bevestigd na validatie door ons team en het geselecteerde partneruitzendbureau.",
    acceptConditions: {
      text: "Ik ga ermee akkoord dat mijn gegevens worden verwerkt in overeenstemming met het",
      lien: "privacybeleid",
    },
    boutonEnvoi: {
      texte: "Mijn offerteaanvraag verzenden",
      enCours: "Verzenden...",
    },
    footer: "✓ Antwoord binnen 24 werkuren • ✓ Vrijblijvend",
  },

  // === FOUTEN ===
  errors: {
    required: "Dit veld is verplicht",
    invalidEmail: "Ongeldig e-mailadres",
    invalidSIRET: "Ongeldig SIRET (14 cijfers vereist)",
    invalidPhone: "Ongeldig telefoonnummer",
    minValue: "De waarde moet groter zijn dan of gelijk aan {min}",
    maxValue: "De waarde moet kleiner zijn dan of gelijk aan {max}",
    genericError: "Er is een fout opgetreden. Probeer het opnieuw.",
    loadingError: "Fout bij laden van gegevens",
    submitError: "Fout bij verzenden van aanvraag",
  },

  // === SECTOREN & BEROEPEN ===
  secteurs: {
    batiment: {
      label: "Bouw",
      convention: "Nationale CAO bouwvakarbeiders (3193)",
      postes: {
        macon: "Metselaar",
        coffreur: "Bekister",
        ferrailleur: "Wapeneningsvlechter",
        carreleur: "Tegelzetter",
        platrier: "Stukadoor",
        peintre: "Schilder",
        plombier: "Loodgieter",
        electricien: "Elektricien",
        couvreur: "Dakdekker",
        menuisier: "Timmerman",
        chef_equipe_batiment: "Voorman",
        chef_chantier: "Werfleider",
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
      label: "Metaalbewerking",
      convention: "CAO metaalbewerking (3109)",
      postes: {
        soudeur: "Lasser",
        chaudronnier: "Plaatwerker",
        tuyauteur: "Pijpfitter",
        tourneur: "Draaier",
        fraiseur: "Frezer",
        usineur: "CNC-operator",
        mecanicien_industriel: "Industrieel monteur",
        monteur: "Monteur",
        controleur_qualite: "Kwaliteitscontroleur",
        ajusteur: "Bankwerker",
        chef_equipe_metallurgie: "Voorman",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
        niveau_5: "Niveau V",
      },
    },
    tp: {
      label: "Grond-, Weg- en Waterbouw",
      convention: "Nationale CAO GWW (3005)",
      postes: {
        conducteur_engins: "Machinist",
        terrassier: "Grondwerker",
        canalisateur: "Rioollegger",
        constructeur_routes: "Wegenbouwer",
        coffreur_bancheur: "Bekister",
        macon_vrd: "Metselaar GWW",
        chef_equipe_tp: "Voorman GWW",
        manoeuvre_tp: "Helper GWW",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Horeca - Hotel",
      convention: "CAO horeca (3292)",
      postes: {
        receptionniste: "Receptionist(e)",
        femme_chambre: "Kamermeisje",
        agent_entretien: "Schoonmaker",
        bagagiste: "Bagagist",
        concierge: "Conciërge",
        night_audit: "Nachtreceptionist",
        gouvernante: "Hoofd housekeeping",
        chef_reception: "Receptiechef",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
        niveau_5: "Niveau V",
      },
    },
    restauration: {
      label: "Horeca - Restaurants",
      convention: "CAO horeca (3292)",
      postes: {
        cuisinier: "Kok",
        commis_cuisine: "Hulpkok",
        chef_partie: "Chef de partie",
        serveur: "Ober/Serveerster",
        barman: "Barkeeper",
        plongeur: "Afwasser",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Souschef",
        chef_cuisine: "Chef-kok",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
        niveau_5: "Niveau V",
      },
    },
    plasturgie: {
      label: "Kunststoffen",
      convention: "CAO kunststoffen (0292)",
      postes: {
        operateur_injection: "Spuitgietoperator",
        operateur_extrusion: "Extrusieoperator",
        regleur: "Insteller",
        operateur_thermoformage: "Thermoformoperator",
        controleur_qualite_plasturgie: "Kwaliteitscontroleur",
        technicien_maintenance: "Onderhoudstechnicus",
        chef_equipe_plasturgie: "Voorman",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    automobile_carrosserie: {
      label: "Auto & Carrosserie",
      convention: "CAO auto-industrie (1090)",
      postes: {
        carrossier: "Plaatwerker auto",
        peintre_automobile: "Autospuiter",
        mecanicien_auto: "Automonteur",
        electricien_auto: "Auto-elektricien",
        chef_atelier: "Werkplaatschef",
        controleur_technique: "APK-keurmeester",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    sylviculture: {
      label: "Bosbouw",
      convention: "CAO landbouw (7501)",
      postes: {
        bucheron: "Houthakker",
        elagueur: "Boomverzorger",
        conducteur_engins_forestiers: "Bosbouwmachinist",
        chef_equipe_sylviculture: "Voorman bosbouw",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    cartonnerie: {
      label: "Karton",
      convention: "CAO verwerkende industrie (3107)",
      postes: {
        operateur_production: "Productieoperator",
        conducteur_ligne: "Lijnoperator",
        regleur_cartonnerie: "Insteller",
        chef_equipe_cartonnerie: "Voorman",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    autre: {
      label: "Andere",
      convention: "Te bepalen volgens activiteit",
      postes: {
        autre_poste: "Andere functie (te specificeren)",
      },
      classifications: {
        a_definir: "Te bepalen",
      },
    },
  },

  // === EUROPESE LANDEN ===
  pays: {
    france: "Frankrijk",
    allemagne: "Duitsland",
    autriche: "Oostenrijk",
    belgique: "België",
    bulgarie: "Bulgarije",
    croatie: "Kroatië",
    chypre: "Cyprus",
    danemark: "Denemarken",
    espagne: "Spanje",
    estonie: "Estland",
    finlande: "Finland",
    grece: "Griekenland",
    hongrie: "Hongarije",
    irlande: "Ierland",
    italie: "Italië",
    lettonie: "Letland",
    lituanie: "Litouwen",
    luxembourg: "Luxemburg",
    malte: "Malta",
    pays_bas: "Nederland",
    pologne: "Polen",
    portugal: "Portugal",
    republique_tcheque: "Tsjechië",
    roumanie: "Roemenië",
    slovaquie: "Slowakije",
    slovenie: "Slovenië",
    suede: "Zweden",
  },

  // === SAMENVATTINGSPAGINA OFFERTE (ONDERTEKENING) ===
  pageRecap: {
    header: {
      title: "Samenvattingsofferte",
      exportPDF: "Exporteren als PDF",
      loading: "Offerte laden...",
      notFound: "Offerte niet gevonden",
    },
    statut: {
      signe: "Ondertekend",
      nouveau: "Nieuw",
    },
    dates: {
      creeLe: "Aangemaakt op",
      a: "om",
      signeLe: "Ondertekend op",
      derniereModification: "Laatste wijziging:",
    },
    entreprise: {
      title: "Bedrijfsgegevens",
      raisonSociale: "Bedrijfsnaam",
      siret: "SIRET",
      codeAPE: "APE-code",
      tvaIntracommunautaire: "Intracommunautair btw-nummer",
      adresse: "Adres",
      siteInternet: "Website",
    },
    contact: {
      title: "Contactpersoon",
      nomComplet: "Volledige naam",
      fonction: "Functie",
      email: "E-mail",
      telephonePortable: "Mobiel",
      telephoneFixe: "Vast telefoonnummer",
    },
    postes: {
      title: "In te vullen functies",
      nationalite: "Nationaliteit",
      salaireBrut: "Brutosalaris",
      tauxHoraireBrut: "Bruto uurtarief",
      coefficientETT: "Uitzendcoëfficiënt",
      tauxETT: "Uitzendtarief",
    },
    conditions: {
      title: "Arbeidsvoorwaarden",
      dateDebut: "Startdatum",
      dateFin: "Einddatum",
      periodeEssai: "Proefperiode",
      baseHoraire: "Uurbasis",
      heuresMois: "u/maand",
      lieuxMission: "Opdrachtslocaties",
      motifRecours: "Reden uitzendwerk",
    },
    exigences: {
      title: "Vereisten kandidaten",
      experience: "Ervaring",
      competences: "Competenties",
      langues: "Talen",
      permis: "Rijbewijzen",
      epi: "PBM",
    },
    calculs: {
      title: "Tariefberekeningen",
      salaireBrut: "Brutosalaris",
      coefficientETT: "Uitzendcoëfficiënt",
      tauxHoraireBrut: "Bruto uurtarief",
      tauxETT: "Uitzendtarief",
      baseHoraire: "Uurbasis",
      coutMensuel: "Maandelijkse kosten",
      duree: "Duur",
      coutTotal: "Totale kosten",
    },
    signature: {
      title: "Elektronische ondertekening",
      intro: "Ik bevestig dat ik de voorwaarden van deze offerte heb gelezen en accepteer.",
      nomComplet: {
        label: "Volledige naam",
        placeholder: "Jan de Jong",
      },
      email: {
        label: "Bevestigings-e-mail",
        placeholder: "jan.dejong@bedrijf.nl",
      },
      checkbox: "Ik accepteer de algemene verkoopvoorwaarden",
      boutonSigner: "Elektronisch ondertekenen",
      enCours: "Ondertekenen...",
      succes: "✓ Offerte succesvol ondertekend!",
      erreur: "Fout bij ondertekenen. Probeer het opnieuw.",
    },
    actions: {
      modifier: "Offerte wijzigen",
      telecharger: "PDF downloaden",
      partager: "Delen",
    },
  },
};
