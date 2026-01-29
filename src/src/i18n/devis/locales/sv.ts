/**
 * 🇸🇪 SVENSK ÖVERSÄTTNING - OFFERTFÖRFRÅGNINGSFORMULÄR
 * 
 * Fullständig svensk översättning för offertförfrågningsformuläret
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const sv: DevisTranslations = {
  // === ALLMÄNT ===
  common: {
    next: "Nästa",
    previous: "Föregående",
    submit: "Skicka",
    required: "*",
    optional: "(valfritt)",
    loading: "Laddar...",
    error: "Fel",
    success: "Lyckades",
    cancel: "Avbryt",
    save: "Spara",
    edit: "Redigera",
    delete: "Ta bort",
    confirm: "Bekräfta",
    euro: "€",
    perHour: "/timme",
    perMonth: "/mån",
    perDay: "/dag",
    persons: "personer",
    hours: "timmar",
    days: "dagar",
    months: "månader",
    year: "år",
  },

  // === NAVIGERING ===
  navigation: {
    back: "Tillbaka",
    stepOf: "Steg {step} av {total}",
    steps: {
      entreprise: {
        title: "Företag",
        badge: "🏢 Ditt företag",
      },
      contact: {
        title: "Kontaktperson",
        badge: "👤 Din kontaktperson",
      },
      besoins: {
        title: "Behov",
        badge: "💼 Dina behov",
      },
      conditions: {
        title: "Villkor",
        badge: "📋 Villkor",
      },
      candidats: {
        title: "Kandidater",
        badge: "👷 Eftersökt profil",
      },
      recapitulatif: {
        title: "Sammanfattning",
        badge: "✅ Sammanfattning",
      },
    },
  },

  // === VALIDERING ===
  validation: {
    fillRequired: "Vänligen fyll i alla obligatoriska fält",
    selectRegion: "Vänligen välj region",
    addAtLeastOnePosition: "Vänligen lägg till minst en befattning",
    invalidEmail: "Vänligen ange en giltig e-postadress",
    invalidPhone: "Vänligen ange ett giltigt telefonnummer",
    invalidSIRET: "Vänligen ange ett giltigt SIRET-nummer (14 siffror)",
    dateRequired: "Vänligen ange startdatum",
    missionLocationRequired: "Vänligen ange uppdragsplats",
  },

  // === MEDDELANDEN ===
  messages: {
    success: {
      quoteSent: "Offertförfrågan skickad framgångsrikt!",
      redirecting: "Omdirigerar...",
    },
    error: {
      submitError: "Fel vid skickning av offertförfrågan",
      genericError: "Ett fel uppstod",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Offertförfrågan | YOJOB",
    pageDescription: "Begär offert för dina europeiska bemanningsbehov.",
  },

  // === STEG 1: FÖRETAG ===
  step1: {
    title: "Företagsinformation",
    subtitle: "Ange ditt kundföretags juridiska information.",
    fields: {
      pays: {
        label: "Land",
        placeholder: "Välj land",
      },
      raisonSociale: {
        label: "Företagsnamn",
        placeholder: "T.ex.: YOJOB AB",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 siffror",
        helper: "Identifikationskod för din anläggning",
      },
      codeAPE: {
        label: "APE/NAF-kod",
        placeholder: "T.ex.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "EU:s momsnummer",
        placeholder: "T.ex.: SE123456789001",
      },
      adresse: {
        label: "Fullständig adress",
        placeholder: "Gatunummer och namn",
      },
      codePostal: {
        label: "Postnummer",
        placeholder: "T.ex.: 111 22",
      },
      ville: {
        label: "Stad",
        placeholder: "T.ex.: Stockholm",
      },
      region: {
        label: "Region/Län",
        placeholder: "Välj region",
        placeholderOtherCountry: "T.ex.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Webbplats",
        placeholder: "https://www.exempel.se",
      },
    },
    infoMessage: "✓ Dessa uppgifter kommer att användas för att förbereda din skräddarsydda offert",
  },

  // === STEG 2: KONTAKTPERSON ===
  step2: {
    title: "Kontaktperson",
    subtitle: "Vem kommer att vara huvudkontaktperson för detta projekt?",
    fields: {
      civilite: {
        label: "Titel",
        options: {
          m: "Herr",
          mme: "Fru",
        },
      },
      nom: {
        label: "Efternamn",
        placeholder: "T.ex.: Andersson",
      },
      prenom: {
        label: "Förnamn",
        placeholder: "T.ex.: Erik",
      },
      fonction: {
        label: "Befattning",
        placeholder: "T.ex.: Personalchef",
      },
      email: {
        label: "Arbets-e-post",
        placeholder: "erik.andersson@foretag.se",
      },
      telephone: {
        label: "Telefon",
        placeholder: "+46 70 123 45 67",
      },
    },
  },

  // === STEG 3: BEHOV ===
  step3: {
    title: "Dina bemanningsbehov",
    subtitle: "Beskriv de profiler du söker och deras villkor.",
    profileLabel: "Profil",
    addProfile: "Lägg till ytterligare profil",
    removeProfile: "Ta bort denna profil",
    loadingConfig: "Laddar konfiguration...",
    missingRegionWarning: "⚠️ Vänligen välj din region i steg 1 för automatisk visning av löner.",
    fields: {
      secteur: {
        label: "Verksamhetsområde",
        placeholder: "Välj verksamhetsområde",
      },
      convention: {
        label: "Kollektivavtal",
        placeholder: "Automatiskt enligt verksamhetsområde",
      },
      poste: {
        label: "Eftersökt befattning",
        placeholder: "Välj befattning",
      },
      classification: {
        label: "Klassificering / Kvalifikation",
        placeholder: "Välj klassificering",
      },
      quantite: {
        label: "Antal personer",
        placeholder: "T.ex.: 5",
        helper: "Hur många personer behövs för denna befattning?",
      },
      salaireBrut: {
        label: "Bruttomånadslön",
        placeholder: "T.ex.: 2500",
        helper: "Bruttolön baserat på 151,67 timmar/mån",
      },
      nationalite: {
        label: "Arbetstagarnas nationalitet",
        placeholder: "Välj land",
        helper: "Nationaliteten påverkar byråns prissättningskoefficient",
      },
    },
    ajouterPoste: "Lägg till ny befattning",
    supprimerPoste: "Ta bort denna befattning",
    posteNumero: "Befattning",
    coefficientInfo: {
      title: "💡 Tillämpad byråkoefficient",
      base: "Baskoeff.",
      facteurPays: "Landsfaktor",
      final: "Slutlig koefficient",
    },
    summary: {
      title: "Arbetstagarens ersättning",
      salaireBrutMensuel: "Bruttomånadslön",
      tauxHoraireBrut: "Bruttotimlön",
      baseMensuelle: "(Bas 151,67 timmar/mån enligt kollektivavtal)",
    },
  },

  // === STEG 4: VILLKOR ===
  step4: {
    title: "Arbetsvillkor",
    subtitle: "Precisera anställningsvillkor och erbjudna förmåner.",
    dateError: "Slutdatum måste vara efter startdatum",
    fields: {
      dateDebut: {
        label: "Önskat startdatum",
        placeholder: "DD/MM/ÅÅÅÅ",
      },
      dateFin: {
        label: "Uppskattat slutdatum",
        placeholder: "DD/MM/ÅÅÅÅ",
        helper: "Lämna tomt för tillsvidare",
      },
      baseHoraire: {
        label: "Månatlig timbas",
        placeholder: "T.ex.: 151,67",
        helper: "Lagstadgad bas i Frankrike: 151,67 timmar/mån (35 timmar/vecka)",
      },
      lieuxMission: {
        label: "Uppdragsplatser",
        placeholder: "T.ex.: Stockholms centrum, Göteborgs zon 3, Malmö...",
      },
      periodeEssai: {
        label: "Provanställning",
        placeholder: "Välj längd",
        options: {
          '2': '2 dagar',
          '3': '3 dagar',
          '5': '5 dagar',
          '15': '15 dagar',
        },
      },
      motifRecours: {
        label: "Skäl för bemanningsanställning",
        placeholder: "Välj skäl",
        options: {
          accroissement: "Tillfällig verksamhetsökning",
          remplacement: "Ersättning för frånvarande anställd",
          saisonnier: "Säsongsarbete",
          exportation: "Exceptionell exportorder",
          autre: "Annat (specificera)",
        },
      },
      delaiPaiement: {
        label: "Begärd betalningstid",
        placeholder: "Välj betalningsvillkor",
        options: {
          reception: "Betalning vid mottagande",
          j30: "30 dagar",
          j45: "45 dagar",
          j60: "60 dagar",
        },
      },
    },
    hebergement: {
      title: "Boende",
      chargeEU: {
        label: "Boende tillhandahålls av kundföretaget",
        helper: "Om NEJ: byrån kommer att tillämpa en extrakostnad på +3,50 €/timme",
      },
      supplementWarning: "⚠️ En extrakostnad på +3,50 €/timme kommer att tillämpas eftersom boende inte tillhandahålls",
      commentaire: {
        label: "Boendedetaljer",
        placeholder: "Typ av boende, adress, särskilda villkor...",
      },
    },
    transport: {
      title: "Lokaltransport",
      chargeETT: {
        label: "Lokaltransport tillhandahålls av byrån",
        helper: "Om JA: en extrakostnad på +1,50 €/timme kommer att tillämapas",
      },
      supplementInfo: "✓ En extrakostnad på +1,50 €/timme kommer att tillämaps för att täcka lokala transportkostnader",
    },
    repas: {
      title: "Måltider",
      options: {
        restaurant: "Företagskafeteria / Måltidskuponger",
        panier: "Daglig kostpenning (debiteras dagligen)",
        nonConcerne: "Ej tillämpligt",
      },
      montantInfo: "📋 Daglig kostpenning: {montant} / arbetsdag (debiteras separat)",
      montantNonDefini: "⚠️ Beloppet är inte definierat för detta land/denna region",
    },
    sections: {
      hebergement: {
        title: "Boende",
        chargeEU: {
          label: "Boende tillhandahålls av kundföretaget",
          helper: "Om NEJ: byrån kommer att tillämpa en extrakostnad på +3,50 €/timme",
          options: {
            oui: "Ja, kunden tillhandahåller",
            non: "Nej, arbetstagaren betalar",
          },
        },
        detailsEU: {
          type: {
            label: "Typ av boende",
            options: {
              hotel: "Hotell",
              appartement: "Lägenhet",
              foyer: "Arbetarhem",
              autre: "Annat",
            },
          },
          adresse: {
            label: "Boendeadress",
            placeholder: "Fullständig boendeadress",
          },
        },
      },
      transportInternational: {
        title: "Internationell transport (ursprungsland ↔ Frankrike)",
        chargeEU: {
          label: "Transport tillhandahålls av kundföretaget",
          helper: "Resor mellan ursprungsland och uppdragsplats",
          options: {
            oui: "Ja, kunden tillhandahåller",
            non: "Nej, arbetstagaren betalar",
          },
        },
        detailsEU: {
          type: {
            label: "Transporttyp",
            options: {
              avion: "Flyg",
              train: "Tåg",
              bus: "Buss",
              covoiturage: "Organiserad samåkning",
            },
          },
          frequence: {
            label: "Resefrekvens",
            options: {
              allerRetour: "Endast initial ankomst och avresa",
              hebdomadaire: "Veckovis",
              mensuel: "Månadsvis",
            },
          },
        },
      },
      transportLocal: {
        title: "Lokaltransport",
        chargeETT: {
          label: "Lokaltransport tillhandahålls av byrån",
          helper: "Om JA: en extrakostnad på +1,50 €/timme kommer att tillämaps",
          options: {
            oui: "Ja, byrån tillhandahåller",
            non: "Nej, arbetstagaren betalar",
          },
        },
        detailsETT: {
          type: {
            label: "Transporttyp",
            options: {
              vehicule: "Tjänstefordon",
              transport: "Kollektivtrafik",
              velo: "Cykel",
            },
          },
        },
      },
      repas: {
        title: "Måltider",
        type: {
          label: "Typ av måltider",
          options: {
            restaurant: "Företagskafeteria / Måltidskuponger",
            panier: "Daglig kostpenning (debiteras dagligen)",
            nonConcerne: "Ej tillämpligt",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Dagsbudget",
            placeholder: "Belopp €",
          },
        },
        detailsPanier: {
          info: "Den dagliga kostpenningen kommer att debiteras separat för varje arbetsdag",
        },
      },
    },
  },

  // === STEG 5: KANDIDATER ===
  step5: {
    title: "Kandidatprofil",
    subtitle: "Definiera kompetenser och specifika krav.",
    sections: {
      experience: {
        title: "Arbetslivserfarenhet",
        obligatoire: {
          label: "Obligatorisk erfarenhet",
        },
        annees: {
          label: "Minsta antal erfarenhetsår",
          placeholder: "T.ex.: 3",
          options: {
            '0-1': "Nybörjare (0-1 år)",
            '1-3': "Mellan (1-3 år)",
            '3-5': "Bekräftad (3-5 år)",
            '5+': "Expert (5 år och mer)",
          },
        },
        competences: {
          label: "Erforderliga tekniska kompetenser",
          placeholder: "T.ex.: Murning, formar, ritningsläsning, TIG-svetsning...",
        },
      },
      formation: {
        title: "Utbildning",
        obligatoire: {
          label: "Obligatorisk utbildning",
        },
        type: {
          label: "Typ av utbildning",
          placeholder: "T.ex.: Kvalificerad murare, CACES R489...",
        },
      },
      travailRisque: {
        title: "Riskfyllt arbete",
        active: {
          label: "Specifikt riskfyllt arbete",
        },
        precisions: {
          label: "Riskpreciseringar",
          placeholder: "T.ex.: Arbete på hög höjd, hantering av tunga laster...",
        },
      },
      langues: {
        title: "Språkkunskaper",
        francais: {
          label: "Erforderlig franskanivå",
          placeholder: "Välj nivå",
          options: {
            a1: "A1 - Nybörjare",
            a2: "A2 - Grundläggande",
            b1: "B1 - Medel",
            b2: "B2 - Högre medel",
            c1: "C1 - Avancerad",
            c2: "C2 - Modersmål",
            natif: "Modersmål",
          },
        },
        autres: {
          label: "Andra användbara språk",
          placeholder: "T.ex.: Engelska (B1), Tyska (A2)...",
        },
        languageNames: {
          francais: "Franska",
          anglais: "Engelska",
          portugais: "Portugisiska",
          espagnol: "Spanska",
          italien: "Italienska",
          autre: "Annat",
        },
        levels: {
          'non-requis': "Ej erforderligt",
          'A1': "A1 - Nybörjare",
          'A2': "A2 - Grundläggande",
          'B1': "B1 - Medel",
          'B2': "B2 - Högre medel",
          'C1': "C1 - Självständig",
          'C2': "C2 - Modersmål",
        },
      },
      permis: {
        title: "Körkort",
        requis: {
          label: "Erforderligt körkort",
          options: {
            aucun: "Inget körkort krävs",
            b: "Körkort klass B (personbil)",
            c: "Körkort klass C (lastbil)",
            ce: "Körkort klass CE (lastbil + släp)",
            d: "Körkort klass D (passagerartransport)",
          },
        },
        categorie: {
          label: "Kökortskategori",
          placeholder: "T.ex.: B, C, CE...",
        },
      },
      outillage: {
        title: "Handverktyg",
        requis: {
          label: "Egna verktyg krävs",
        },
        type: {
          label: "Verktygstyp",
          placeholder: "T.ex.: Hammare, vattenpass, måttband, slipmaskin...",
        },
      },
      epi: {
        title: "Personlig skyddsutrustning (PSU)",
        infoLegale: "ℹ️ Enligt bestämmelserna måste arbetsgivaren tillhandahålla PSU anpassad till befattningens risker.",
        selectionCount: "✓ {count} valda PSU",
        fournis: {
          label: "PSU tillhandahålls av företaget",
          helper: "Hjälm, säkerhetsskor, handskar etc.",
          options: {
            oui: "Ja, kunden tillhandahåller",
            non: "Nej, arbetstagaren betalar",
          },
        },
        liste: {
          label: "Lista över erforderlig PSU",
          placeholder: "T.ex.: Hjälm, S3-skor, skärskyddande handskar, säkerhetssele...",
        },
        items: {
          casque: "Skyddshjälm",
          lunettes: "Skyddsglasögon",
          protections_auditives: "Hörselskydd",
          gants: "Skyddshandskar",
          chaussures: "Säkerhetsskor",
          harnais: "Säkerhetssele",
          vetements: "Arbetskläder",
          masque: "Andningsskydd",
          protection_faciale: "Ansiktsskydd",
          vetements_visibilite: "Högsynlighetskläder",
        },
      },
      autresExigences: {
        title: "Andra krav",
        label: "Andra specifika krav",
        placeholder: "T.ex.: Elektrikertillstånd, CACES, tillgänglighet helger, arbete på höjd...",
      },
    },
  },

  // === SAMMANFATTNING ===
  recapitulatif: {
    title: "Sammanfattning av din förfrågan",
    subtitle: "Kontrollera informationen innan du skickar offertförfrågan.",
    acceptConditionsError: "Vänligen acceptera villkoren innan du fortsätter",
    entreprise: {
      title: "Företag",
      raisonSociale: "Företagsnamn",
      siret: "SIRET",
      pays: "Land",
      ville: "Stad",
      region: "Region/Län",
    },
    contact: {
      title: "Kontaktperson",
      nomPrenom: "Namn",
      email: "E-post",
      telephone: "Telefon",
      fonction: "Befattning",
    },
    postes: {
      title: "Begärda befattningar",
      coeffETT: "📊 Tillämpad byråkoefficient",
      coeffBase: "Baskoeff.",
      facteurPays: "Landsfaktor",
      supplementsHoraires: "✨ Timtillägg (ingår i priset)",
      hebergement: "✓ Boende",
      transport: "✓ Lokaltransport",
      panierRepas: "🍽️ Daglig kostpenning (debiteras dagligen)",
      baseHoraire: "📅 Timbas: {heures} timmar/mån (fastställda övertidstimmar)",
      heuresNormales: "Normala timmar (0-35 timmar/vecka)",
      heuresSup25: "Övertid +25% (36:e-43:e timmen)",
      heuresSup50: "Övertid +50% (44:e+ timmen)",
      sousTotal: "Delsumma arbete (per person)",
      tauxHoraireBrut: "Bruttotimlön",
      tauxETTFinal: "Slutligt byråpris",
      coutMensuel: "Total månadskostnad",
    },
    conditions: {
      title: "Uppdragsvillkor",
      dateDebut: "Startdatum",
      dateFin: "Slutdatum",
      dureeEstimee: "Uppskattat varaktighet",
      lieuMission: "Uppdragsplats",
      mois: "månader",
    },
    majorations: {
      title: "Uppdragstariffjusteringar",
      total: "Totala justeringar",
      notSet: "Ej definierat",
    },
    totaux: {
      mensuelHT: "Totalt per månad exkl. moms",
      mensuelTTC: "Totalt per månad inkl. moms",
      totalMission: "Total uppdragskostnad",
    },
    noteLegale: "ℹ️ Denna uppskattning är vägledande. Det slutliga priset kommer att bekräftas efter godkännande av vårt team och den valda partnerbyrån.",
    acceptConditions: {
      text: "Jag godkänner att mina uppgifter behandlas i enlighet med",
      lien: "integritetspolicyn",
    },
    boutonEnvoi: {
      texte: "Skicka min offertförfrågan",
      enCours: "Skickar...",
    },
    footer: "✓ Svar inom 24 timmar • ✓ Utan åtagande",
  },

  // === FEL ===
  errors: {
    required: "Detta fält är obligatoriskt",
    invalidEmail: "Ogiltig e-postadress",
    invalidSIRET: "Ogiltigt SIRET (14 siffror krävs)",
    invalidPhone: "Ogiltigt telefonnummer",
    minValue: "Värdet måste vara större än eller lika med {min}",
    maxValue: "Värdet måste vara mindre än eller lika med {max}",
    genericError: "Ett fel uppstod. Vänligen försök igen.",
    loadingError: "Fel vid laddning av data",
    submitError: "Fel vid skickning av förfrågan",
  },

  // === SEKTORER & YRKEN ===
  secteurs: {
    batiment: {
      label: "Byggbranschen",
      convention: "Kollektivavtal byggnadsarbetare (3193)",
      postes: {
        macon: "Murare",
        coffreur: "Formsnickare",
        ferrailleur: "Armeringsarbetare",
        carreleur: "Kakel Läggare",
        platrier: "Gipsare",
        peintre: "Målare",
        plombier: "Rörmokare",
        electricien: "Elektriker",
        couvreur: "Taktäckare",
        menuisier: "Snickare",
        chef_equipe_batiment: "Arbets lagsledare",
        chef_chantier: "Byggledare",
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
      label: "Metallindustri",
      convention: "Kollektivavtal metallindustri (3109)",
      postes: {
        soudeur: "Svetsare",
        chaudronnier: "Pannmakare",
        tuyauteur: "Rörläggare",
        tourneur: "Svarvare",
        fraiseur: "Fräsare",
        usineur: "Maskinoperatör",
        mecanicien_industriel: "Industrimekaniker",
        monteur: "Montör",
        controleur_qualite: "Kvalitetskontrollant",
        ajusteur: "Mekaniker",
        chef_equipe_metallurgie: "Arbetslagsledare",
      },
      classifications: {
        niveau_1: "Nivå I",
        niveau_2: "Nivå II",
        niveau_3: "Nivå III",
        niveau_4: "Nivå IV",
        niveau_5: "Nivå V",
      },
    },
    tp: {
      label: "Anläggningsarbeten",
      convention: "Kollektivavtal anläggningsarbeten (3005)",
      postes: {
        conducteur_engins: "Maskinförare",
        terrassier: "Markarbetare",
        canalisateur: "Rörläggare",
        constructeur_routes: "Vägbyggare",
        coffreur_bancheur: "Formsnickare",
        macon_vrd: "VRD-murare",
        chef_equipe_tp: "Anläggningsarbetsledare",
        manoeuvre_tp: "Anläggningsarbetare",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotellbranschen",
      convention: "Kollektivavtal hotell och restaurang (3292)",
      postes: {
        receptionniste: "Receptionist",
        femme_chambre: "Städare",
        agent_entretien: "Städpersonal",
        bagagiste: "Piccolopojke",
        concierge: "Portier",
        night_audit: "Nattreceptionist",
        gouvernante: "Städchef",
        chef_reception: "Receptionschef",
      },
      classifications: {
        niveau_1: "Nivå I",
        niveau_2: "Nivå II",
        niveau_3: "Nivå III",
        niveau_4: "Nivå IV",
        niveau_5: "Nivå V",
      },
    },
    restauration: {
      label: "Restaurangbranschen",
      convention: "Kollektivavtal hotell och restaurang (3292)",
      postes: {
        cuisinier: "Kock",
        commis_cuisine: "Kökselev",
        chef_partie: "Chef de partie",
        serveur: "Servitör",
        barman: "Bartender",
        plongeur: "Diskare",
        chef_rang: "Serveringschef",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Souschef",
        chef_cuisine: "Kökschef",
      },
      classifications: {
        niveau_1: "Nivå I",
        niveau_2: "Nivå II",
        niveau_3: "Nivå III",
        niveau_4: "Nivå IV",
        niveau_5: "Nivå V",
      },
    },
    plasturgie: {
      label: "Plastindustri",
      convention: "Kollektivavtal plastindustri (0292)",
      postes: {
        operateur_injection: "Formsprutningsoperatör",
        operateur_extrusion: "Extrusionsoperatör",
        regleur: "Inställare",
        operateur_thermoformage: "Termoformningsoperatör",
        controleur_qualite_plasturgie: "Kvalitetskontrollant",
        technicien_maintenance: "Underhållstekniker",
        chef_equipe_plasturgie: "Arbetslagsledare",
      },
      classifications: {
        niveau_1: "Nivå I",
        niveau_2: "Nivå II",
        niveau_3: "Nivå III",
        niveau_4: "Nivå IV",
      },
    },
    automobile_carrosserie: {
      label: "Bil och karosseri",
      convention: "Kollektivavtal bilreparation (1090)",
      postes: {
        carrossier: "Plåtslagare",
        peintre_automobile: "Billackare",
        mecanicien_auto: "Bilmekaniker",
        electricien_auto: "Bilelektriker",
        chef_atelier: "Verkstadschef",
        controleur_technique: "Bilbesiktare",
      },
      classifications: {
        niveau_1: "Nivå I",
        niveau_2: "Nivå II",
        niveau_3: "Nivå III",
        niveau_4: "Nivå IV",
      },
    },
    sylviculture: {
      label: "Skogsbruk",
      convention: "Kollektivavtal jordbruk (7501)",
      postes: {
        bucheron: "Skogshuggare",
        elagueur: "Trädklättrare",
        conducteur_engins_forestiers: "Skogsmaskinförare",
        chef_equipe_sylviculture: "Skogsarbetsledare",
      },
      classifications: {
        niveau_1: "Nivå I",
        niveau_2: "Nivå II",
        niveau_3: "Nivå III",
        niveau_4: "Nivå IV",
      },
    },
    cartonnerie: {
      label: "Kartongindustri",
      convention: "Kollektivavtal förädlingsindustri (3107)",
      postes: {
        operateur_production: "Produktionsoperatör",
        conducteur_ligne: "Linjeoperatör",
        regleur_cartonnerie: "Inställare",
        chef_equipe_cartonnerie: "Arbetslagsledare",
      },
      classifications: {
        niveau_1: "Nivå I",
        niveau_2: "Nivå II",
        niveau_3: "Nivå III",
        niveau_4: "Nivå IV",
      },
    },
    autre: {
      label: "Övrigt",
      convention: "Att definieras enligt verksamhet",
      postes: {
        autre_poste: "Annan befattning (ange)",
      },
      classifications: {
        a_definir: "Att definieras",
      },
    },
  },

  // === EUROPEISKA LÄNDER ===
  pays: {
    france: "Frankrike",
    allemagne: "Tyskland",
    autriche: "Österrike",
    belgique: "Belgien",
    bulgarie: "Bulgarien",
    croatie: "Kroatien",
    chypre: "Cypern",
    danemark: "Danmark",
    espagne: "Spanien",
    estonie: "Estland",
    finlande: "Finland",
    grece: "Grekland",
    hongrie: "Ungern",
    irlande: "Irland",
    italie: "Italien",
    lettonie: "Lettland",
    lituanie: "Litauen",
    luxembourg: "Luxemburg",
    malte: "Malta",
    pays_bas: "Nederländerna",
    pologne: "Polen",
    portugal: "Portugal",
    republique_tcheque: "Tjeckien",
    roumanie: "Rumänien",
    slovaquie: "Slovakien",
    slovenie: "Slovenien",
    suede: "Sverige",
  },

  // === OFFERTSAMMANFATTNINGSSIDA (SIGNERING) ===
  pageRecap: {
    header: {
      title: "Offertsammanfattning",
      exportPDF: "Exportera till PDF",
      loading: "Laddar offert...",
      notFound: "Offerten hittades inte",
    },
    statut: {
      signe: "Signerad",
      nouveau: "Ny",
    },
    dates: {
      creeLe: "Skapad",
      a: "den",
      signeLe: "Signerad",
      derniereModification: "Senast ändrad:",
    },
    entreprise: {
      title: "Företagsinformation",
      raisonSociale: "Företagsnamn",
      siret: "SIRET",
      codeAPE: "APE-kod",
      tvaIntracommunautaire: "EU:s momsnummer",
      adresse: "Adress",
      siteInternet: "Webbplats",
    },
    contact: {
      title: "Kontaktperson",
      nomComplet: "Fullständigt namn",
      fonction: "Befattning",
      email: "E-post",
      telephonePortable: "Mobiltelefon",
      telephoneFixe: "Fasttelefon",
    },
    postes: {
      title: "Befattningar att tillsätta",
      nationalite: "Nationalitet",
      salaireBrut: "Bruttolön",
      tauxHoraireBrut: "Bruttotimlön",
      coefficientETT: "Byråkoefficient",
      tauxETT: "Byråpris",
    },
    conditions: {
      title: "Arbetsvillkor",
      dateDebut: "Startdatum",
      dateFin: "Slutdatum",
      periodeEssai: "Provanställning",
      baseHoraire: "Timbas",
      heuresMois: "timmar/mån",
      lieuxMission: "Uppdragsplatser",
      motifRecours: "Skäl för bemanningsanställning",
    },
    candidats: {
      title: "Profil för efterfrågade kandidater",
      experience: "Erfarenhet",
      ansMinimum: "år minimum",
      formation: "Utbildning",
      permis: "Körkort",
      langues: "Språk",
    },
    signature: {
      title: "Elektronisk signering",
      subtitle: "Signera din offert säkert online",
      commencer: "Börja signera",
      identiteSignataire: "Undertecknarens identitet",
      nomComplet: "Fullständigt namn",
      fonction: "Befattning",
      email: "E-post",
      entreprise: "Företag",
      siret: "SIRET",
      signataire: "Undertecknare",
      tracabilite: "Teknisk spårbarhet",
      dateHeure: "Datum och tid",
      adresseIP: "IP-adress",
      navigateur: "Webbläsare",
      signatureManuscrite: "Handskriven signatur",
      infoLegale: "🔒 Denna information kommer att registreras i det elektroniska signaturcertifikatet för att säkerställa spårbarhet och juridisk efterlevnad i enlighet med eIDAS-förordningen (EU) nr 910/2014.",
      dessinerSignature: "Rita din signatur nedan",
      effacer: "Radera",
      accepteCGV: "Jag godkänner",
      cgvLien: "de allmänna försäljningsvillkoren",
      accepteCGVSuite: "och bekräftar att den lämnade informationen är korrekt. Denna elektroniska signatur har samma juridiska värde som en handskriven signatur.",
      annuler: "Avbryt",
      validerSigner: "Bekräfta och signera",
      signatureEnCours: "Signering pågår...",
      erreurSignatureVide: "Vänligen signera innan bekräftelse",
      erreurCGV: "Vänligen godkänn de allmänna villkoren",
    },
    actions: {
      modifier: "Redigera offert",
      telecharger: "Ladda ner PDF",
      partager: "Dela",
    },
  },
};