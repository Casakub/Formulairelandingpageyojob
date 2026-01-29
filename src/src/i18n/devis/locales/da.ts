/**
 * 🇩🇰 DANSK OVERSÆTTELSE - TILBUDSANMODNINGSFORMULAR
 * 
 * Komplet dansk oversættelse til tilbudsanmodningsformularen
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const da: DevisTranslations = {
  // === GENERELT ===
  common: {
    next: "Næste",
    previous: "Forrige",
    submit: "Send",
    required: "*",
    optional: "(valgfri)",
    loading: "Indlæser...",
    error: "Fejl",
    success: "Succes",
    cancel: "Annuller",
    save: "Gem",
    edit: "Rediger",
    delete: "Slet",
    confirm: "Bekræft",
    euro: "€",
    perHour: "/time",
    perMonth: "/md",
    perDay: "/dag",
    persons: "personer",
    hours: "timer",
    days: "dage",
    months: "måneder",
    year: "år",
  },

  // === NAVIGATION ===
  navigation: {
    back: "Tilbage",
    stepOf: "Trin {step} af {total}",
    steps: {
      entreprise: {
        title: "Virksomhed",
        badge: "🏢 Din virksomhed",
      },
      contact: {
        title: "Kontaktperson",
        badge: "👤 Din kontaktperson",
      },
      besoins: {
        title: "Behov",
        badge: "💼 Dine behov",
      },
      conditions: {
        title: "Betingelser",
        badge: "📋 Betingelser",
      },
      candidats: {
        title: "Kandidater",
        badge: "👷 Ønsket profil",
      },
      recapitulatif: {
        title: "Sammenfatning",
        badge: "✅ Sammenfatning",
      },
    },
  },

  // === VALIDERING ===
  validation: {
    fillRequired: "Udfyld venligst alle påkrævede felter",
    selectRegion: "Vælg venligst region",
    addAtLeastOnePosition: "Tilføj venligst mindst én stilling",
    invalidEmail: "Angiv venligst en gyldig e-mailadresse",
    invalidPhone: "Angiv venligst et gyldigt telefonnummer",
    invalidSIRET: "Angiv venligst et gyldigt SIRET-nummer (14 cifre)",
    dateRequired: "Angiv venligst startdato",
    missionLocationRequired: "Angiv venligst opdragssted",
  },

  // === MEDDELELSER ===
  messages: {
    success: {
      quoteSent: "Tilbudsanmodning sendt med succes!",
      redirecting: "Omdirigerer...",
    },
    error: {
      submitError: "Fejl ved afsendelse af tilbudsanmodning",
      genericError: "Der opstod en fejl",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Tilbudsanmodning | YOJOB",
    pageDescription: "Anmod om tilbud på dine europæiske vikarbehov.",
  },

  // === TRIN 1: VIRKSOMHED ===
  step1: {
    title: "Virksomhedsoplysninger",
    subtitle: "Angiv din kundevirksomheds juridiske oplysninger.",
    fields: {
      pays: {
        label: "Land",
        placeholder: "Vælg land",
      },
      raisonSociale: {
        label: "Virksomhedsnavn",
        placeholder: "F.eks.: YOJOB A/S",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 cifre",
        helper: "Identifikationskode for din virksomhed",
      },
      codeAPE: {
        label: "APE/NAF-kode",
        placeholder: "F.eks.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "EU-momsnummer",
        placeholder: "F.eks.: DK12345678",
      },
      adresse: {
        label: "Fuldstændig adresse",
        placeholder: "Gadenummer og navn",
      },
      codePostal: {
        label: "Postnummer",
        placeholder: "F.eks.: 1000",
      },
      ville: {
        label: "By",
        placeholder: "F.eks.: København",
      },
      region: {
        label: "Region",
        placeholder: "Vælg region",
        placeholderOtherCountry: "F.eks.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Hjemmeside",
        placeholder: "https://www.eksempel.dk",
      },
    },
    infoMessage: "✓ Disse oplysninger vil blive brugt til at forberede dit skræddersyede tilbud",
  },

  // === TRIN 2: KONTAKTPERSON ===
  step2: {
    title: "Kontaktperson",
    subtitle: "Hvem vil være hovedkontaktperson for dette projekt?",
    fields: {
      civilite: {
        label: "Titel",
        options: {
          m: "Hr.",
          mme: "Fru",
        },
      },
      nom: {
        label: "Efternavn",
        placeholder: "F.eks.: Nielsen",
      },
      prenom: {
        label: "Fornavn",
        placeholder: "F.eks.: Lars",
      },
      fonction: {
        label: "Stilling",
        placeholder: "F.eks.: HR-chef",
      },
      email: {
        label: "Arbejds-e-mail",
        placeholder: "lars.nielsen@firma.dk",
      },
      telephone: {
        label: "Telefon",
        placeholder: "+45 12 34 56 78",
      },
    },
  },

  // === TRIN 3: BEHOV ===
  step3: {
    title: "Dine vikarbehov",
    subtitle: "Beskriv de profiler, du søger, og deres betingelser.",
    profileLabel: "Profil",
    addProfile: "Tilføj endnu en profil",
    removeProfile: "Fjern denne profil",
    loadingConfig: "Indlæser konfiguration...",
    missingRegionWarning: "⚠️ Vælg venligst din region i trin 1 for automatisk visning af lønninger.",
    fields: {
      secteur: {
        label: "Branche",
        placeholder: "Vælg branche",
      },
      convention: {
        label: "Overenskomst",
        placeholder: "Automatisk ifølge branche",
      },
      poste: {
        label: "Ønsket stilling",
        placeholder: "Vælg stilling",
      },
      classification: {
        label: "Klassificering / Kvalifikation",
        placeholder: "Vælg klassificering",
      },
      quantite: {
        label: "Antal personer",
        placeholder: "F.eks.: 5",
        helper: "Hvor mange personer er der brug for til denne stilling?",
      },
      salaireBrut: {
        label: "Brutto månedsløn",
        placeholder: "F.eks.: 2500",
        helper: "Bruttoløn baseret på 151,67 timer/md",
      },
      nationalite: {
        label: "Medarbejdernes nationalitet",
        placeholder: "Vælg land",
        helper: "Nationaliteten påvirker bureauets prissætningskoefficient",
      },
    },
    ajouterPoste: "Tilføj ny stilling",
    supprimerPoste: "Fjern denne stilling",
    posteNumero: "Stilling",
    coefficientInfo: {
      title: "💡 Anvendt bureaukoefficient",
      base: "Basiskoeff.",
      facteurPays: "Landefaktor",
      final: "Endelig koefficient",
    },
    summary: {
      title: "Medarbejdervederlag",
      salaireBrutMensuel: "Brutto månedsløn",
      tauxHoraireBrut: "Brutto timeløn",
      baseMensuelle: "(Basis 151,67 timer/md ifølge overenskomst)",
    },
  },

  // === TRIN 4: BETINGELSER ===
  step4: {
    title: "Ansættelsesvilkår",
    subtitle: "Præciser ansættelsesvilkår og tilbudte fordele.",
    dateError: "Slutdato skal være efter startdato",
    fields: {
      dateDebut: {
        label: "Ønsket startdato",
        placeholder: "DD/MM/ÅÅÅÅ",
      },
      dateFin: {
        label: "Forventet slutdato",
        placeholder: "DD/MM/ÅÅÅÅ",
        helper: "Lad stå tomt for tidsubegrænset",
      },
      baseHoraire: {
        label: "Månedlig timebasis",
        placeholder: "F.eks.: 151,67",
        helper: "Lovbestemt basis i Frankrig: 151,67 timer/md (35 timer/uge)",
      },
      lieuxMission: {
        label: "Opdragssteder",
        placeholder: "F.eks.: København centrum, Aarhus zone 3, Odense...",
      },
      periodeEssai: {
        label: "Prøveperiode",
        placeholder: "Vælg varighed",
        options: {
          '2': '2 dage',
          '3': '3 dage',
          '5': '5 dage',
          '15': '15 dage',
        },
      },
      motifRecours: {
        label: "Årsag til vikariat",
        placeholder: "Vælg årsag",
        options: {
          accroissement: "Midlertidig aktivitetsstigning",
          remplacement: "Erstatning for fraværende medarbejder",
          saisonnier: "Sæsonarbejde",
          exportation: "Ekstraordinær eksportordre",
          autre: "Andet (præciser)",
        },
      },
      delaiPaiement: {
        label: "Ønsket betalingsfrist",
        placeholder: "Vælg betalingsbetingelser",
        options: {
          reception: "Betaling ved modtagelse",
          j30: "30 dage",
          j45: "45 dage",
          j60: "60 dage",
        },
      },
    },
    hebergement: {
      title: "Indkvartering",
      chargeEU: {
        label: "Indkvartering leveres af kundevirksomheden",
        helper: "Hvis NEJ: bureauet vil anvende en ekstra omkostning på +3,50 €/time",
      },
      supplementWarning: "⚠️ En ekstra omkostning på +3,50 €/time vil blive anvendt, da indkvartering ikke leveres",
      commentaire: {
        label: "Indkvarteringsdetaljer",
        placeholder: "Type indkvartering, adresse, særlige betingelser...",
      },
    },
    transport: {
      title: "Lokal transport",
      chargeETT: {
        label: "Lokal transport leveres af bureauet",
        helper: "Hvis JA: en ekstra omkostning på +1,50 €/time vil blive anvendt",
      },
      supplementInfo: "✓ En ekstra omkostning på +1,50 €/time vil blive anvendt til dækning af lokale transportomkostninger",
    },
    repas: {
      title: "Måltider",
      options: {
        restaurant: "Firmakantine / Madkuponer",
        panier: "Daglig kostgodtgørelse (faktureres dagligt)",
        nonConcerne: "Ikke relevant",
      },
      montantInfo: "📋 Daglig kostgodtgørelse: {montant} / arbejdsdag (faktureres separat)",
      montantNonDefini: "⚠️ Beløbet er ikke defineret for dette land/denne region",
    },
    sections: {
      hebergement: {
        title: "Indkvartering",
        chargeEU: {
          label: "Indkvartering leveres af kundevirksomheden",
          helper: "Hvis NEJ: bureauet vil anvende en ekstra omkostning på +3,50 €/time",
          options: {
            oui: "Ja, kunden leverer",
            non: "Nej, medarbejderen betaler",
          },
        },
        detailsEU: {
          type: {
            label: "Type indkvartering",
            options: {
              hotel: "Hotel",
              appartement: "Lejlighed",
              foyer: "Arbejderhjem",
              autre: "Andet",
            },
          },
          adresse: {
            label: "Indkvarteringsadresse",
            placeholder: "Fuldstændig indkvarteringsadresse",
          },
        },
      },
      transportInternational: {
        title: "International transport (oprindelsesland ↔ Frankrig)",
        chargeEU: {
          label: "Transport leveres af kundevirksomheden",
          helper: "Rejser mellem oprindelsesland og opdragssted",
          options: {
            oui: "Ja, kunden leverer",
            non: "Nej, medarbejderen betaler",
          },
        },
        detailsEU: {
          type: {
            label: "Transporttype",
            options: {
              avion: "Fly",
              train: "Tog",
              bus: "Bus",
              covoiturage: "Organiseret samkørsel",
            },
          },
          frequence: {
            label: "Rejsefrekvens",
            options: {
              allerRetour: "Kun initial ankomst og afrejse",
              hebdomadaire: "Ugentligt",
              mensuel: "Månedligt",
            },
          },
        },
      },
      transportLocal: {
        title: "Lokal transport",
        chargeETT: {
          label: "Lokal transport leveres af bureauet",
          helper: "Hvis JA: en ekstra omkostning på +1,50 €/time vil blive anvendt",
          options: {
            oui: "Ja, bureauet leverer",
            non: "Nej, medarbejderen betaler",
          },
        },
        detailsETT: {
          type: {
            label: "Transporttype",
            options: {
              vehicule: "Tjenestekøretøj",
              transport: "Offentlig transport",
              velo: "Cykel",
            },
          },
        },
      },
      repas: {
        title: "Måltider",
        type: {
          label: "Type måltider",
          options: {
            restaurant: "Firmakantine / Madkuponer",
            panier: "Daglig kostgodtgørelse (faktureres dagligt)",
            nonConcerne: "Ikke relevant",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Dagsbudget",
            placeholder: "Beløb €",
          },
        },
        detailsPanier: {
          info: "Den daglige kostgodtgørelse vil blive faktureret separat for hver arbejdsdag",
        },
      },
    },
  },

  // === TRIN 5: KANDIDATER ===
  step5: {
    title: "Kandidatprofil",
    subtitle: "Definer kompetencer og specifikke krav.",
    sections: {
      experience: {
        title: "Erhvervserfaring",
        obligatoire: {
          label: "Obligatorisk erfaring",
        },
        annees: {
          label: "Mindste antal erfaringsår",
          placeholder: "F.eks.: 3",
          options: {
            '0-1': "Begynder (0-1 år)",
            '1-3': "Mellem (1-3 år)",
            '3-5': "Bekræftet (3-5 år)",
            '5+': "Ekspert (5 år og mere)",
          },
        },
        competences: {
          label: "Påkrævede tekniske kompetencer",
          placeholder: "F.eks.: Murværk, forskallingssystemer, tegnelæsning, TIG-svejsning...",
        },
      },
      formation: {
        title: "Uddannelse",
        obligatoire: {
          label: "Obligatorisk uddannelse",
        },
        type: {
          label: "Type uddannelse",
          placeholder: "F.eks.: Kvalificeret murer, CACES R489...",
        },
      },
      travailRisque: {
        title: "Risikobetonet arbejde",
        active: {
          label: "Specifikt risikobetonet arbejde",
        },
        precisions: {
          label: "Risikopræciseringer",
          placeholder: "F.eks.: Arbejde i højden, håndtering af tunge byrder...",
        },
      },
      langues: {
        title: "Sprogkundskaber",
        francais: {
          label: "Påkrævet franskniveau",
          placeholder: "Vælg niveau",
          options: {
            a1: "A1 - Begynder",
            a2: "A2 - Grundlæggende",
            b1: "B1 - Mellem",
            b2: "B2 - Højere mellem",
            c1: "C1 - Avanceret",
            c2: "C2 - Modersmål",
            natif: "Modersmål",
          },
        },
        autres: {
          label: "Andre nyttige sprog",
          placeholder: "F.eks.: Engelsk (B1), Tysk (A2)...",
        },
        languageNames: {
          francais: "Fransk",
          anglais: "Engelsk",
          portugais: "Portugisisk",
          espagnol: "Spansk",
          italien: "Italiensk",
          autre: "Andet",
        },
        levels: {
          'non-requis': "Ikke påkrævet",
          'A1': "A1 - Begynder",
          'A2': "A2 - Grundlæggende",
          'B1': "B1 - Mellem",
          'B2': "B2 - Højere mellem",
          'C1': "C1 - Selvstændig",
          'C2': "C2 - Modersmål",
        },
      },
      permis: {
        title: "Kørekort",
        requis: {
          label: "Påkrævet kørekort",
          options: {
            aucun: "Intet kørekort påkrævet",
            b: "Kørekort kategori B (personbil)",
            c: "Kørekort kategori C (lastbil)",
            ce: "Kørekort kategori CE (lastbil + trailer)",
            d: "Kørekort kategori D (passagertransport)",
          },
        },
        categorie: {
          label: "Kørekortskategori",
          placeholder: "F.eks.: B, C, CE...",
        },
      },
      outillage: {
        title: "Håndværktøj",
        requis: {
          label: "Eget værktøj påkrævet",
        },
        type: {
          label: "Værktøjstype",
          placeholder: "F.eks.: Hammer, vaterpas, målebånd, slibemaskine...",
        },
      },
      epi: {
        title: "Personlige værnemidler (PV)",
        infoLegale: "ℹ️ Ifølge bestemmelserne skal arbejdsgiveren levere PV tilpasset stillingens risici.",
        selectionCount: "✓ {count} valgte PV",
        fournis: {
          label: "PV leveres af virksomheden",
          helper: "Hjelm, sikkerhedssko, handsker osv.",
          options: {
            oui: "Ja, kunden leverer",
            non: "Nej, medarbejderen betaler",
          },
        },
        liste: {
          label: "Liste over påkrævede PV",
          placeholder: "F.eks.: Hjelm, S3-sko, skærebeskyttende handsker, sikkerhedssele...",
        },
        items: {
          casque: "Beskyttelseshjelm",
          lunettes: "Beskyttelsesbriller",
          protections_auditives: "Høreværn",
          gants: "Beskyttelseshandsker",
          chaussures: "Sikkerhedssko",
          harnais: "Sikkerhedssele",
          vetements: "Arbejdstøj",
          masque: "Åndedrætsværn",
          protection_faciale: "Ansigtsbeskyttelse",
          vetements_visibilite: "Høj synlighed beklædning",
        },
      },
      autresExigences: {
        title: "Andre krav",
        label: "Andre specifikke krav",
        placeholder: "F.eks.: Elektriker tilladelser, CACES, tilgængelighed i weekender, arbejde i højden...",
      },
    },
  },

  // === SAMMENFATNING ===
  recapitulatif: {
    title: "Sammenfatning af din anmodning",
    subtitle: "Kontroller oplysningerne før afsendelse af tilbudsanmodningen.",
    acceptConditionsError: "Accepter venligst betingelserne før du fortsætter",
    entreprise: {
      title: "Virksomhed",
      raisonSociale: "Virksomhedsnavn",
      siret: "SIRET",
      pays: "Land",
      ville: "By",
      region: "Region",
    },
    contact: {
      title: "Kontaktperson",
      nomPrenom: "Navn",
      email: "E-mail",
      telephone: "Telefon",
      fonction: "Stilling",
    },
    postes: {
      title: "Ønskede stillinger",
      coeffETT: "📊 Anvendt bureaukoefficient",
      coeffBase: "Basiskoeff.",
      facteurPays: "Landefaktor",
      supplementsHoraires: "✨ Timetillæg (inkluderet i prisen)",
      hebergement: "✓ Indkvartering",
      transport: "✓ Lokal transport",
      panierRepas: "🍽️ Daglig kostgodtgørelse (faktureres dagligt)",
      baseHoraire: "📅 Timebasis: {heures} timer/md (fastlagt overtid)",
      heuresNormales: "Normale timer (0-35 timer/uge)",
      heuresSup25: "Overtid +25% (36.-43. time)",
      heuresSup50: "Overtid +50% (44.+ time)",
      sousTotal: "Delsum arbejde (pr. person)",
      tauxHoraireBrut: "Brutto timeløn",
      tauxETTFinal: "Endelig bureaupriser",
      coutMensuel: "Total månedlig omkostning",
    },
    conditions: {
      title: "Opdragsvilkår",
      dateDebut: "Startdato",
      dateFin: "Slutdato",
      dureeEstimee: "Forventet varighed",
      lieuMission: "Opdragssted",
      mois: "måneder",
    },
    majorations: {
      title: "Opdragstarif justeringer",
      total: "I alt justeringer",
      notSet: "Ikke defineret",
    },
    totaux: {
      mensuelHT: "I alt pr. måned ekskl. moms",
      mensuelTTC: "I alt pr. måned inkl. moms",
      totalMission: "Samlet opdragsomkostning",
    },
    noteLegale: "ℹ️ Dette skøn er vejledende. Den endelige pris vil blive bekræftet efter godkendelse fra vores team og det valgte partnerbureau.",
    acceptConditions: {
      text: "Jeg accepterer, at mine oplysninger behandles i henhold til",
      lien: "fortrolighedspolitikken",
    },
    boutonEnvoi: {
      texte: "Send min tilbudsanmodning",
      enCours: "Sender...",
    },
    footer: "✓ Svar inden for 24 timer • ✓ Uden forpligtelse",
  },

  // === FEJL ===
  errors: {
    required: "Dette felt er påkrævet",
    invalidEmail: "Ugyldig e-mailadresse",
    invalidSIRET: "Ugyldigt SIRET (14 cifre påkrævet)",
    invalidPhone: "Ugyldigt telefonnummer",
    minValue: "Værdien skal være større end eller lig med {min}",
    maxValue: "Værdien skal være mindre end eller lig med {max}",
    genericError: "Der opstod en fejl. Prøv venligst igen.",
    loadingError: "Fejl ved indlæsning af data",
    submitError: "Fejl ved afsendelse af anmodning",
  },

  // === BRANCHER & ERHVERV ===
  secteurs: {
    batiment: {
      label: "Byggeri",
      convention: "National overenskomst bygningsarbejdere (3193)",
      postes: {
        macon: "Murer",
        coffreur: "Forskaller",
        ferrailleur: "Armeringsarbejder",
        carreleur: "Flisemurer",
        platrier: "Stukkatør",
        peintre: "Maler",
        plombier: "Blikkenslager",
        electricien: "Elektriker",
        couvreur: "Tækker",
        menuisier: "Tømrer",
        chef_equipe_batiment: "Arbejdsleder",
        chef_chantier: "Byggepladsleder",
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
      label: "Metallurgi",
      convention: "Overenskomst metallurgi (3109)",
      postes: {
        soudeur: "Svejser",
        chaudronnier: "Plade- og kedelsmed",
        tuyauteur: "Rørmontør",
        tourneur: "Drejer",
        fraiseur: "Fræser",
        usineur: "CNC-operatør",
        mecanicien_industriel: "Industrimekaniker",
        monteur: "Montør",
        controleur_qualite: "Kvalitetskontrollant",
        ajusteur: "Justerer",
        chef_equipe_metallurgie: "Arbejdsleder",
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
      label: "Anlægsarbejde",
      convention: "National overenskomst anlægsarbejde (3005)",
      postes: {
        conducteur_engins: "Maskinfører",
        terrassier: "Jordarbejder",
        canalisateur: "Kloakarbejder",
        constructeur_routes: "Vejmand",
        coffreur_bancheur: "Forskaller",
        macon_vrd: "Murer anlæg",
        chef_equipe_tp: "Arbejdsleder anlæg",
        manoeuvre_tp: "Medhjælper anlæg",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelvirksomhed",
      convention: "Overenskomst hotel-restaurant (3292)",
      postes: {
        receptionniste: "Receptionist",
        femme_chambre: "Stuepige",
        agent_entretien: "Vedligeholdelsesmedarbejder",
        bagagiste: "Piccolo",
        concierge: "Concierge",
        night_audit: "Natreceptionist",
        gouvernante: "Husholderske",
        chef_reception: "Receptionschef",
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
      label: "Restaurant",
      convention: "Overenskomst hotel-restaurant (3292)",
      postes: {
        cuisinier: "Kok",
        commis_cuisine: "Køkkenmedhjælper",
        chef_partie: "Chef de partie",
        serveur: "Tjener",
        barman: "Bartender",
        plongeur: "Opvasker",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Souschef",
        chef_cuisine: "Køkkenchef",
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
      label: "Plastindustri",
      convention: "Overenskomst plastindustri (0292)",
      postes: {
        operateur_injection: "Sprøjtestøbningsoperatør",
        operateur_extrusion: "Ekstrusionsoperatør",
        regleur: "Indstiller",
        operateur_thermoformage: "Termoformningsoperatør",
        controleur_qualite_plasturgie: "Kvalitetskontrollant",
        technicien_maintenance: "Vedligeholdelsstekniker",
        chef_equipe_plasturgie: "Arbejdsleder",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    automobile_carrosserie: {
      label: "Bilindustri & Karrosseri",
      convention: "Overenskomst bilreparation (1090)",
      postes: {
        carrossier: "Karrosserimekaniker",
        peintre_automobile: "Billakerer",
        mecanicien_auto: "Bilmekaniker",
        electricien_auto: "Bilelektriker",
        chef_atelier: "Værkstedschef",
        controleur_technique: "Teknisk kontrollant",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    sylviculture: {
      label: "Skovbrug",
      convention: "Overenskomst landbrug (7501)",
      postes: {
        bucheron: "Skovhugger",
        elagueur: "Træbeskærer",
        conducteur_engins_forestiers: "Skovmaskinfører",
        chef_equipe_sylviculture: "Arbejdsleder skovbrug",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    cartonnerie: {
      label: "Kartonindustri",
      convention: "Overenskomst forædlingsindustri (3107)",
      postes: {
        operateur_production: "Produktionsoperatør",
        conducteur_ligne: "Linjeoperatør",
        regleur_cartonnerie: "Indstiller",
        chef_equipe_cartonnerie: "Arbejdsleder",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    autre: {
      label: "Andet",
      convention: "Skal defineres ifølge branche",
      postes: {
        autre_poste: "Anden stilling (præciser)",
      },
      classifications: {
        a_definir: "Skal defineres",
      },
    },
  },

  // === EUROPÆISKE LANDE ===
  pays: {
    france: "Frankrig",
    allemagne: "Tyskland",
    autriche: "Østrig",
    belgique: "Belgien",
    bulgarie: "Bulgarien",
    croatie: "Kroatien",
    chypre: "Cypern",
    danemark: "Danmark",
    espagne: "Spanien",
    estonie: "Estland",
    finlande: "Finland",
    grece: "Grækenland",
    hongrie: "Ungarn",
    irlande: "Irland",
    italie: "Italien",
    lettonie: "Letland",
    lituanie: "Litauen",
    luxembourg: "Luxembourg",
    malte: "Malta",
    pays_bas: "Nederlandene",
    pologne: "Polen",
    portugal: "Portugal",
    republique_tcheque: "Tjekkiet",
    roumanie: "Rumænien",
    slovaquie: "Slovakiet",
    slovenie: "Slovenien",
    suede: "Sverige",
  },

  // === TILBUDSSAMMENFATTNINGSSIDE (UNDERSKRIFT) ===
  pageRecap: {
    header: {
      title: "Tilbudssammenfatning",
      exportPDF: "Eksporter til PDF",
      loading: "Indlæser tilbud...",
      notFound: "Tilbuddet blev ikke fundet",
    },
    statut: {
      signe: "Underskrevet",
      nouveau: "Ny",
    },
    dates: {
      creeLe: "Oprettet",
      a: "den",
      signeLe: "Underskrevet",
      derniereModification: "Sidst ændret:",
    },
    entreprise: {
      title: "Virksomhedsoplysninger",
      raisonSociale: "Virksomhedsnavn",
      siret: "SIRET",
      codeAPE: "APE-kode",
      tvaIntracommunautaire: "EU-momsnummer",
      adresse: "Adresse",
      siteInternet: "Hjemmeside",
    },
    contact: {
      title: "Kontaktperson",
      nomComplet: "Fulde navn",
      fonction: "Stilling",
      email: "E-mail",
      telephonePortable: "Mobiltelefon",
      telephoneFixe: "Fastnettelefon",
    },
    postes: {
      title: "Stillinger at besætte",
      nationalite: "Nationalitet",
      salaireBrut: "Bruttoløn",
      tauxHoraireBrut: "Brutto timeløn",
      coefficientETT: "Bureaukoefficient",
      tauxETT: "Bureaupris",
    },
    conditions: {
      title: "Ansættelsesvilkår",
      dateDebut: "Startdato",
      dateFin: "Slutdato",
      periodeEssai: "Prøveperiode",
      baseHoraire: "Timebasis",
      heuresMois: "timer/md",
      lieuxMission: "Opdragssteder",
      motifRecours: "Årsag til vikariat",
    },
    exigences: {
      title: "Kandidatkrav",
      experience: "Erfaring",
      competences: "Kompetencer",
      langues: "Sprog",
      permis: "Kørekort",
      epi: "PV",
    },
    calculs: {
      title: "Prisberegninger",
      salaireBrut: "Bruttoløn",
      coefficientETT: "Bureaukoefficient",
      tauxHoraireBrut: "Brutto timeløn",
      tauxETT: "Bureaupris",
      baseHoraire: "Timebasis",
      coutMensuel: "Månedlig omkostning",
      duree: "Varighed",
      coutTotal: "Totalomkostning",
    },
    signature: {
      title: "Elektronisk underskrift",
      intro: "Jeg bekræfter, at jeg har læst og accepterer betingelserne i dette tilbud.",
      nomComplet: {
        label: "Fulde navn",
        placeholder: "Lars Nielsen",
      },
      email: {
        label: "Bekræftelses-e-mail",
        placeholder: "lars.nielsen@firma.dk",
      },
      checkbox: "Jeg accepterer de generelle betingelser",
      boutonSigner: "Underskriv elektronisk",
      enCours: "Underskriver...",
      succes: "✓ Tilbuddet er blevet underskrevet med succes!",
      erreur: "Fejl ved underskrift. Prøv venligst igen.",
    },
    actions: {
      modifier: "Rediger tilbud",
      telecharger: "Download PDF",
      partager: "Del",
    },
  },
};