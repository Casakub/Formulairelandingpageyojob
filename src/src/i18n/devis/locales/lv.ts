/**
 * 🇱🇻 LATVIEŠU TULKOJUMS - PIEDĀVĀJUMA PIEPRASĪJUMA FORMA
 * 
 * Pilns latviešu tulkojums piedāvājuma pieprasījuma formai
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const lv: DevisTranslations = {
  // === VISPĀRĪGI ===
  common: {
    next: "Tālāk",
    previous: "Atpakaļ",
    submit: "Nosūtīt",
    required: "*",
    optional: "(neobligāti)",
    loading: "Ielādē...",
    error: "Kļūda",
    success: "Veiksmīgi",
    cancel: "Atcelt",
    save: "Saglabāt",
    edit: "Rediģēt",
    delete: "Dzēst",
    confirm: "Apstiprināt",
    euro: "€",
    perHour: "/h",
    perMonth: "/mēn.",
    perDay: "/d.",
    persons: "personas",
    hours: "stundas",
    days: "dienas",
    months: "mēneši",
    year: "gads",
  },

  // === NAVIGĀCIJA ===
  navigation: {
    back: "Atpakaļ",
    stepOf: "Solis {step} no {total}",
    steps: {
      entreprise: {
        title: "Uzņēmums",
        badge: "🏢 Jūsu uzņēmums",
      },
      contact: {
        title: "Kontaktpersona",
        badge: "👤 Jūsu kontaktpersona",
      },
      besoins: {
        title: "Vajadzības",
        badge: "💼 Jūsu vajadzības",
      },
      conditions: {
        title: "Nosacījumi",
        badge: "📋 Nosacījumi",
      },
      candidats: {
        title: "Kandidāti",
        badge: "👷 Meklētais profils",
      },
      recapitulatif: {
        title: "Kopsavilkums",
        badge: "✅ Kopsavilkums",
      },
    },
  },

  // === VALIDĀCIJA ===
  validation: {
    fillRequired: "Lūdzu, aizpildiet visus obligātos laukus",
    selectRegion: "Lūdzu, izvēlieties reģionu",
    addAtLeastOnePosition: "Lūdzu, pievienojiet vismaz vienu amatu",
    invalidEmail: "Lūdzu, ievadiet derīgu e-pasta adresi",
    invalidPhone: "Lūdzu, ievadiet derīgu tālruņa numuru",
    invalidSIRET: "Lūdzu, ievadiet derīgu SIRET numuru (14 cipari)",
    dateRequired: "Lūdzu, ievadiet sākuma datumu",
    missionLocationRequired: "Lūdzu, ievadiet misijas vietu",
  },

  // === PAZIŅOJUMI ===
  messages: {
    success: {
      quoteSent: "Piedāvājuma pieprasījums veiksmīgi nosūtīts!",
      redirecting: "Pārvirza...",
    },
    error: {
      submitError: "Kļūda nosūtot piedāvājuma pieprasījumu",
      genericError: "Radās kļūda",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Piedāvājuma pieprasījums | YOJOB",
    pageDescription: "Pieprasiet piedāvājumu savām Eiropas īslaicīgās nodarbinātības vajadzībām.",
  },

  // === SOLIS 1: UZŅĒMUMS ===
  step1: {
    title: "Uzņēmuma informācija",
    subtitle: "Ievadiet sava klienta uzņēmuma juridisko informāciju.",
    fields: {
      pays: {
        label: "Valsts",
        placeholder: "Izvēlieties valsti",
      },
      raisonSociale: {
        label: "Uzņēmuma nosaukums",
        placeholder: "Piemēram: YOJOB SIA",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 cipari",
        helper: "Jūsu iestādes identifikācijas kods",
      },
      codeAPE: {
        label: "APE/NAF kods",
        placeholder: "Piemēram: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Kopienas iekšējais PVN",
        placeholder: "Piemēram: LV12345678901",
      },
      adresse: {
        label: "Pilna adrese",
        placeholder: "Mājas numurs un ielas nosaukums",
      },
      codePostal: {
        label: "Pasta indekss",
        placeholder: "Piemēram: LV-1001",
      },
      ville: {
        label: "Pilsēta",
        placeholder: "Piemēram: Rīga",
      },
      region: {
        label: "Reģions/Novads",
        placeholder: "Izvēlieties reģionu",
        placeholderOtherCountry: "Piemēram: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Mājaslapa",
        placeholder: "https://www.piemers.lv",
      },
    },
    infoMessage: "✓ Šie dati tiks izmantoti jūsu personalizētā piedāvājuma sagatavošanai",
  },

  // === SOLIS 2: KONTAKTPERSONA ===
  step2: {
    title: "Kontaktpersona",
    subtitle: "Kas būs galvenā šī projekta kontaktpersona?",
    fields: {
      civilite: {
        label: "Uzruna",
        options: {
          m: "Kungs",
          mme: "Kundze",
        },
      },
      nom: {
        label: "Uzvārds",
        placeholder: "Piemēram: Bērziņš",
      },
      prenom: {
        label: "Vārds",
        placeholder: "Piemēram: Jānis",
      },
      fonction: {
        label: "Amats",
        placeholder: "Piemēram: Personāla vadītājs",
      },
      email: {
        label: "Darba e-pasts",
        placeholder: "janis.berzins@uznemums.lv",
      },
      telephone: {
        label: "Tālrunis",
        placeholder: "+371 2123 4567",
      },
    },
  },

  // === SOLIS 3: VAJADZĪBAS ===
  step3: {
    title: "Jūsu nodarbinātības vajadzības",
    subtitle: "Aprakstiet meklētos profilus un to nosacījumus.",
    profileLabel: "Profils",
    addProfile: "Pievienot papildu profilu",
    removeProfile: "Noņemt šo profilu",
    loadingConfig: "Ielādē konfigurāciju...",
    missingRegionWarning: "⚠️ Lūdzu, izvēlieties savu reģionu 1. solī automātiskai algu parādīšanai.",
    fields: {
      secteur: {
        label: "Darbības joma",
        placeholder: "Izvēlieties darbības jomu",
      },
      convention: {
        label: "Koplīgums",
        placeholder: "Automātiski pēc darbības jomas",
      },
      poste: {
        label: "Meklētais amats",
        placeholder: "Izvēlieties amatu",
      },
      classification: {
        label: "Klasifikācija / Kvalifikācija",
        placeholder: "Izvēlieties klasifikāciju",
      },
      quantite: {
        label: "Personu skaits",
        placeholder: "Piemēram: 5",
        helper: "Cik cilvēku nepieciešami šim amatam?",
      },
      salaireBrut: {
        label: "Bruto mēneša alga",
        placeholder: "Piemēram: 2500",
        helper: "Bruto alga 151,67 h/mēn. bāzē",
      },
      nationalite: {
        label: "Darbinieku pilsonība",
        placeholder: "Izvēlieties valsti",
        helper: "Pilsonība ietekmē aģentūras tarifa koeficientu",
      },
    },
    ajouterPoste: "Pievienot jaunu amatu",
    supprimerPoste: "Noņemt šo amatu",
    posteNumero: "Amats",
    coefficientInfo: {
      title: "💡 Piemērotais aģentūras koeficients",
      base: "Bāzes koef.",
      facteurPays: "Valsts faktors",
      final: "Galīgais koeficients",
    },
    summary: {
      title: "Darbinieka atalgojums",
      salaireBrutMensuel: "Bruto mēneša alga",
      tauxHoraireBrut: "Bruto stundas likme",
      baseMensuelle: "(Bāze 151,67 h/mēn. saskaņā ar koplīgumu)",
    },
  },

  // === SOLIS 4: NOSACĪJUMI ===
  step4: {
    title: "Darba nosacījumi",
    subtitle: "Precizējiet nodarbinātības nosacījumus un piedāvātās priekšrocības.",
    dateError: "Beigu datumam jābūt pēc sākuma datuma",
    fields: {
      dateDebut: {
        label: "Nepieciešamais sākuma datums",
        placeholder: "DD/MM/GGGG",
      },
      dateFin: {
        label: "Paredzamais beigu datums",
        placeholder: "DD/MM/GGGG",
        helper: "Atstājiet tukšu neierobežotam laikam",
      },
      baseHoraire: {
        label: "Mēneša stundu bāze",
        placeholder: "Piemēram: 151,67",
        helper: "Juridiskā bāze Francijā: 151,67 h/mēn. (35 h/nedēļā)",
      },
      lieuxMission: {
        label: "Misijas vietas",
        placeholder: "Piemēram: Rīgas centrs, Jūrmalas zona 3, Liepāja...",
      },
      periodeEssai: {
        label: "Pārbaudes periods",
        placeholder: "Izvēlieties ilgumu",
        options: {
          '2': '2 dienas',
          '3': '3 dienas',
          '5': '5 dienas',
          '15': '15 dienas',
        },
      },
      motifRecours: {
        label: "Īslaicīgās nodarbinātības iemesls",
        placeholder: "Izvēlieties iemeslu",
        options: {
          accroissement: "Pagaidu darbības pieaugums",
          remplacement: "Prombūtnē esoša darbinieka aizvietošana",
          saisonnier: "Sezonas darbs",
          exportation: "Ārkārtas eksporta pasūtījums",
          autre: "Cits (precizējiet)",
        },
      },
      delaiPaiement: {
        label: "Pieprasītais maksājuma termiņš",
        placeholder: "Izvēlieties termiņu",
        options: {
          reception: "Samaksa pēc saņemšanas",
          j30: "30 dienas",
          j45: "45 dienas",
          j60: "60 dienas",
        },
      },
    },
    hebergement: {
      title: "Izmitināšana",
      chargeEU: {
        label: "Izmitināšanu nodrošina klienta uzņēmums",
        helper: "Ja NĒ: aģentūra piemēros papildu maksu +3,50 €/h",
      },
      supplementWarning: "⚠️ Tiks piemērota papildu maksa +3,50 €/h, jo izmitināšana nav nodrošināta",
      commentaire: {
        label: "Izmitināšanas detaļas",
        placeholder: "Izmitināšanas veids, adrese, īpaši nosacījumi...",
      },
    },
    transport: {
      title: "Vietējais transports",
      chargeETT: {
        label: "Vietējo transportu nodrošina aģentūra",
        helper: "Ja JĀ: tiks piemērota papildu maksa +1,50 €/h",
      },
      supplementInfo: "✓ Tiks piemērota papildu maksa +1,50 €/h vietējā transporta izdevumu segšanai",
    },
    repas: {
      title: "Ēdināšana",
      options: {
        restaurant: "Uzņēmuma ēdnīca /Ēdināšanas taloni",
        panier: "Dienas nauda ēdienam (aprēķināta katru dienu)",
        nonConcerne: "Nav attiecināms",
      },
      montantInfo: "📋 Dienas naudas summa: {montant} / darba diena (aprēķināta atsevišķi)",
      montantNonDefini: "⚠️ Summa nav definēta šai valstij/reģionam",
    },
    sections: {
      hebergement: {
        title: "Izmitināšana",
        chargeEU: {
          label: "Izmitināšanu nodrošina klienta uzņēmums",
          helper: "Ja NĒ: aģentūra piemēros papildu maksu +3,50 €/h",
          options: {
            oui: "Jā, nodrošina klients",
            non: "Nē, maksā darbinieks",
          },
        },
        detailsEU: {
          type: {
            label: "Izmitināšanas veids",
            options: {
              hotel: "Viesnīca",
              appartement: "Dzīvoklis",
              foyer: "Strādnieku māja",
              autre: "Cits",
            },
          },
          adresse: {
            label: "Izmitināšanas adrese",
            placeholder: "Pilna izmitināšanas adrese",
          },
        },
      },
      transportInternational: {
        title: "Starptautiskais transports (izcelsmes valsts ↔ Francija)",
        chargeEU: {
          label: "Transportu nodrošina klienta uzņēmums",
          helper: "Braucieni starp izcelsmes valsti un misijas vietu",
          options: {
            oui: "Jā, nodrošina klients",
            non: "Nē, maksā darbinieks",
          },
        },
        detailsEU: {
          type: {
            label: "Transporta veids",
            options: {
              avion: "Lidmašīna",
              train: "Vilciens",
              bus: "Autobuss",
              covoiturage: "Organizēts kopbrauciens",
            },
          },
          frequence: {
            label: "Braucienu biežums",
            options: {
              allerRetour: "Tikai sākotnējā ierašanās un aizbraukšana",
              hebdomadaire: "Katru nedēļu",
              mensuel: "Katru mēnesi",
            },
          },
        },
      },
      transportLocal: {
        title: "Vietējais transports",
        chargeETT: {
          label: "Vietējo transportu nodrošina aģentūra",
          helper: "Ja JĀ: tiks piemērota papildu maksa +1,50 €/h",
          options: {
            oui: "Jā, nodrošina aģentūra",
            non: "Nē, maksā darbinieks",
          },
        },
        detailsETT: {
          type: {
            label: "Transporta veids",
            options: {
              vehicule: "Dienesta automašīna",
              transport: "Sabiedriskais transports",
              velo: "Velosipēds",
            },
          },
        },
      },
      repas: {
        title: "Ēdināšana",
        type: {
          label: "Ēdināšanas veids",
          options: {
            restaurant: "Uzņēmuma ēdnīca / Ēdināšanas taloni",
            panier: "Dienas nauda ēdienam (aprēķināta katru dienu)",
            nonConcerne: "Nav attiecināms",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Dienas budžets",
            placeholder: "Summa €",
          },
        },
        detailsPanier: {
          info: "Dienas nauda ēdienam tiks aprēķināta atsevišķi par katru darba dienu",
        },
      },
    },
  },

  // === SOLIS 5: KANDIDĀTI ===
  step5: {
    title: "Kandidātu profils",
    subtitle: "Nosakiet prasmes un konkrētās prasības.",
    sections: {
      experience: {
        title: "Darba pieredze",
        obligatoire: {
          label: "Obligāta pieredze",
        },
        annees: {
          label: "Minimālais pieredzes gadu skaits",
          placeholder: "Piemēram: 3",
          options: {
            '0-1': "Iesācējs (0-1 gads)",
            '1-3': "Vidējais (1-3 gadi)",
            '3-5': "Apstiprināts (3-5 gadi)",
            '5+': "Eksperts (5 gadi un vairāk)",
          },
        },
        competences: {
          label: "Nepieciešamās tehniskās prasmes",
          placeholder: "Piemēram: Mūrēšana, klājums, rasējumu lasīšana, TIG metināšana...",
        },
      },
      formation: {
        title: "Izglītība",
        obligatoire: {
          label: "Obligāta izglītība",
        },
        type: {
          label: "Izglītības veids",
          placeholder: "Piemēram: Kvalificēts mūrnieks, CACES R489...",
        },
      },
      travailRisque: {
        title: "Bīstams darbs",
        active: {
          label: "Specifisks bīstams darbs",
        },
        precisions: {
          label: "Risku precizējumi",
          placeholder: "Piemēram: Darbs augstumā, darbs ar smagām kravām...",
        },
      },
      langues: {
        title: "Valodu prasmes",
        francais: {
          label: "Pieprasītais franču valodas līmenis",
          placeholder: "Izvēlieties līmeni",
          options: {
            a1: "A1 - Iesācējs",
            a2: "A2 - Pamatlīmenis",
            b1: "B1 - Vidējais",
            b2: "B2 - Augstāks vidējais",
            c1: "C1 - Padziļināts",
            c2: "C2 - Dzimtā valoda",
            natif: "Dzimtā valoda",
          },
        },
        autres: {
          label: "Citas noderīgas valodas",
          placeholder: "Piemēram: Angļu valoda (B1), Vācu valoda (A2)...",
        },
        languageNames: {
          francais: "Franču valoda",
          anglais: "Angļu valoda",
          portugais: "Portugāļu valoda",
          espagnol: "Spāņu valoda",
          italien: "Itāļu valoda",
          autre: "Cita",
        },
        levels: {
          'non-requis': "Nav pieprasīts",
          'A1': "A1 - Iesācējs",
          'A2': "A2 - Pamatlīmenis",
          'B1': "B1 - Vidējais",
          'B2': "B2 - Augstāks vidējais",
          'C1': "C1 - Patstāvīgs",
          'C2': "C2 - Dzimtā valoda",
        },
      },
      permis: {
        title: "Vadītāja apliecība",
        requis: {
          label: "Pieprasītā vadītāja apliecība",
          options: {
            aucun: "Vadītāja apliecība nav nepieciešama",
            b: "Vadītāja apliecība kat. B (viegls automobilis)",
            c: "Vadītāja apliecība kat. C (kravas automašīna)",
            ce: "Vadītāja apliecība kat. CE (kravas automašīna + piekabe)",
            d: "Vadītāja apliecība kat. D (pasažieru pārvadājumi)",
          },
        },
        categorie: {
          label: "Vadītāja apliecības kategorija",
          placeholder: "Piemēram: B, C, CE...",
        },
      },
      outillage: {
        title: "Rokas instrumenti",
        requis: {
          label: "Nepieciešami paša instrumenti",
        },
        type: {
          label: "Instrumenta veids",
          placeholder: "Piemēram: Āmurs, līmeņrādis, mērlente, slīpmašīna...",
        },
      },
      epi: {
        title: "Individuālie aizsardzības līdzekļi (IAL)",
        infoLegale: "ℹ️ Saskaņā ar noteikumiem darba devējam jānodrošina IAL, kas pielāgoti amata riskiem.",
        selectionCount: "✓ {count} izvēlētie IAL",
        fournis: {
          label: "IAL nodrošina uzņēmums",
          helper: "Ķivere, drošības apavi, cimdi u.c.",
          options: {
            oui: "Jā, nodrošina klients",
            non: "Nē, maksā darbinieks",
          },
        },
        liste: {
          label: "Nepieciešamo IAL saraksts",
          placeholder: "Piemēram: Ķivere, apavi S3, pret griešanu izturīgi cimdi, drošības josta...",
        },
        items: {
          casque: "Aizsargķivere",
          lunettes: "Aizsargbrilles",
          protections_auditives: "Dzirdes aizsardzība",
          gants: "Aizsargcimdi",
          chaussures: "Drošības apavi",
          harnais: "Drošības josta",
          vetements: "Darba apģērbs",
          masque: "Respirators",
          protection_faciale: "Sejas aizsargs",
          vetements_visibilite: "Augstas redzamības apģērbs",
        },
      },
      autresExigences: {
        title: "Citas prasības",
        label: "Citas konkrētas prasības",
        placeholder: "Piemēram: Elektriķa atļaujas, CACES, pieejamība brīvdienās, darbs augstumā...",
      },
    },
  },

  // === KOPSAVILKUMS ===
  recapitulatif: {
    title: "Jūsu pieprasījuma kopsavilkums",
    subtitle: "Pārbaudiet datus pirms piedāvājuma pieprasījuma nosūtīšanas.",
    acceptConditionsError: "Lūdzu, piekrītiet nosacījumiem pirms turpināšanas",
    entreprise: {
      title: "Uzņēmums",
      raisonSociale: "Uzņēmuma nosaukums",
      siret: "SIRET",
      pays: "Valsts",
      ville: "Pilsēta",
      region: "Reģions/Novads",
    },
    contact: {
      title: "Kontaktpersona",
      nomPrenom: "Vārds un uzvārds",
      email: "E-pasts",
      telephone: "Tālrunis",
      fonction: "Amats",
    },
    postes: {
      title: "Pieprasītie amati",
      coeffETT: "📊 Piemērotais aģentūras koeficients",
      coeffBase: "Bāzes koef.",
      facteurPays: "Valsts faktors",
      supplementsHoraires: "✨ Stundas piemaksas (iekļautas tarifā)",
      hebergement: "✓ Izmitināšana",
      transport: "✓ Vietējais transports",
      panierRepas: "🍽️ Dienas nauda ēdienam (aprēķināta katru dienu)",
      baseHoraire: "📅 Stundu bāze: {heures} h/mēn. (noteiktas virsstundas)",
      heuresNormales: "Parastās stundas (0-35 h/nedēļā)",
      heuresSup25: "Virsstundas +25% (36.-43. stunda)",
      heuresSup50: "Virsstundas +50% (44.+ stunda)",
      sousTotal: "Darba starpsumma (vienai personai)",
      tauxHoraireBrut: "Bruto stundas likme",
      tauxETTFinal: "Galīgā aģentūras likme",
      coutMensuel: "Kopējie mēneša izdevumi",
    },
    conditions: {
      title: "Misijas nosacījumi",
      dateDebut: "Sākuma datums",
      dateFin: "Beigu datums",
      dureeEstimee: "Paredzamais ilgums",
      lieuMission: "Misijas vieta",
      mois: "mēneši",
    },
    totaux: {
      mensuelHT: "Kopā mēnesī bez PVN",
      mensuelTTC: "Kopā mēnesī ar PVN",
      totalMission: "Kopējie misijas izdevumi",
    },
    noteLegale: "ℹ️ Šis novērtējums ir informatīvs. Galīgā likme tiks apstiprināta pēc mūsu komandas un izvēlētās partneraģentūras apstiprinājuma.",
    acceptConditions: {
      text: "Piekrītu, ka mani dati tiks apstrādāti saskaņā ar",
      lien: "privātuma politiku",
    },
    boutonEnvoi: {
      texte: "Nosūtīt manu piedāvājuma pieprasījumu",
      enCours: "Nosūta...",
    },
    footer: "✓ Atbilde 24 stundu laikā • ✓ Bez saistībām",
  },

  // === KĻŪDAS ===
  errors: {
    required: "Šis lauks ir obligāts",
    invalidEmail: "Nederīga e-pasta adrese",
    invalidSIRET: "Nederīgs SIRET (nepieciešami 14 cipari)",
    invalidPhone: "Nederīgs tālruņa numurs",
    minValue: "Vērtībai jābūt lielākai vai vienādai ar {min}",
    maxValue: "Vērtībai jābūt mazākai vai vienādai ar {max}",
    genericError: "Radās kļūda. Lūdzu, mēģiniet vēlreiz.",
    loadingError: "Kļūda ielādējot datus",
    submitError: "Kļūda nosūtot pieprasījumu",
  },

  // === DARBĪBAS JOMAS & PROFESIJAS ===
  secteurs: {
    batiment: {
      label: "Celtniecība",
      convention: "Nacionālais koplīgums celtniecības strādnieki (3193)",
      postes: {
        macon: "Mūrnieks",
        coffreur: "Veidņu galdnieks",
        ferrailleur: "Dzelzsbetona stiegrotājs",
        carreleur: "Flīžu klājējs",
        platrier: "Apmetējs",
        peintre: "Krāsotājs",
        plombier: "Santehniķis",
        electricien: "Elektriķis",
        couvreur: "Jumta segējs",
        menuisier: "Galdnieks",
        chef_equipe_batiment: "Komandas vadītājs",
        chef_chantier: "Būvlaukuma vadītājs",
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
      label: "Metalurģija",
      convention: "Koplīgums metalurģija (3109)",
      postes: {
        soudeur: "Metinātājs",
        chaudronnier: "Katlu meistars",
        tuyauteur: "Cauruļu montieris",
        tourneur: "Virpotājs",
        fraiseur: "Frēzētājs",
        usineur: "CNC operators",
        mecanicien_industriel: "Rūpnieciskais mehāniķis",
        monteur: "Montieris",
        controleur_qualite: "Kvalitātes kontrolieris",
        ajusteur: "Mehāniķis",
        chef_equipe_metallurgie: "Komandas vadītājs",
      },
      classifications: {
        niveau_1: "Līmenis I",
        niveau_2: "Līmenis II",
        niveau_3: "Līmenis III",
        niveau_4: "Līmenis IV",
        niveau_5: "Līmenis V",
      },
    },
    tp: {
      label: "Sabiedriskie darbi",
      convention: "Nacionālais koplīgums sabiedriskie darbi (3005)",
      postes: {
        conducteur_engins: "Mašīnu operators",
        terrassier: "Zemes darbu strādnieks",
        canalisateur: "Kanalizācijas strādnieks",
        constructeur_routes: "Ceļu būvnieks",
        coffreur_bancheur: "Veidņu galdnieks",
        macon_vrd: "Mūrnieks sabiedriskie darbi",
        chef_equipe_tp: "Komandas vadītājs SD",
        manoeuvre_tp: "Palīgstrādnieks SD",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Viesnīcu bizness",
      convention: "Koplīgums viesnīcas-restorāni (3292)",
      postes: {
        receptionniste: "Reģistrators",
        femme_chambre: "Istabene",
        agent_entretien: "Apkopes strādnieks",
        bagagiste: "Bagāžas nesējs",
        concierge: "Sargs",
        night_audit: "Nakts auditors",
        gouvernante: "Saimniecības vadītāja",
        chef_reception: "Reģistratūras vadītājs",
      },
      classifications: {
        niveau_1: "Līmenis I",
        niveau_2: "Līmenis II",
        niveau_3: "Līmenis III",
        niveau_4: "Līmenis IV",
        niveau_5: "Līmenis V",
      },
    },
    restauration: {
      label: "Sabiedriskā ēdināšana",
      convention: "Koplīgums viesnīcas-restorāni (3292)",
      postes: {
        cuisinier: "Pavārs",
        commis_cuisine: "Palīgpavārs",
        chef_partie: "Chef de partie",
        serveur: "Viesmīlis",
        barman: "Bārmenis",
        plongeur: "Trauku mazgātājs",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Galvenais pavārs",
      },
      classifications: {
        niveau_1: "Līmenis I",
        niveau_2: "Līmenis II",
        niveau_3: "Līmenis III",
        niveau_4: "Līmenis IV",
        niveau_5: "Līmenis V",
      },
    },
    plasturgie: {
      label: "Plastmasas rūpniecība",
      convention: "Koplīgums plastmasas rūpniecība (0292)",
      postes: {
        operateur_injection: "Iesmidzināšanas operators",
        operateur_extrusion: "Ekstrūzijas operators",
        regleur: "Noregulētājs",
        operateur_thermoformage: "Termoformēšanas operators",
        controleur_qualite_plasturgie: "Kvalitātes kontrolieris",
        technicien_maintenance: "Apkopes tehniķis",
        chef_equipe_plasturgie: "Komandas vadītājs",
      },
      classifications: {
        niveau_1: "Līmenis I",
        niveau_2: "Līmenis II",
        niveau_3: "Līmenis III",
        niveau_4: "Līmenis IV",
      },
    },
    automobile_carrosserie: {
      label: "Automobiļu rūpniecība un virsbūves",
      convention: "Koplīgums automobiļu remonts (1090)",
      postes: {
        carrossier: "Virsbūves meistars",
        peintre_automobile: "Automobiļu krāsotājs",
        mecanicien_auto: "Automehāniķis",
        electricien_auto: "Autoelektriķis",
        chef_atelier: "Darbnīcas vadītājs",
        controleur_technique: "Tehniskais kontrolieris",
      },
      classifications: {
        niveau_1: "Līmenis I",
        niveau_2: "Līmenis II",
        niveau_3: "Līmenis III",
        niveau_4: "Līmenis IV",
      },
    },
    sylviculture: {
      label: "Mežsaimniecība",
      convention: "Koplīgums lauksaimniecība (7501)",
      postes: {
        bucheron: "Mežstrādnieks",
        elagueur: "Koku zāģētājs",
        conducteur_engins_forestiers: "Meža tehnikas operators",
        chef_equipe_sylviculture: "Komandas vadītājs mežsaimniecība",
      },
      classifications: {
        niveau_1: "Līmenis I",
        niveau_2: "Līmenis II",
        niveau_3: "Līmenis III",
        niveau_4: "Līmenis IV",
      },
    },
    cartonnerie: {
      label: "Kartona rūpniecība",
      convention: "Koplīgums pārstrādes rūpniecība (3107)",
      postes: {
        operateur_production: "Ražošanas operators",
        conducteur_ligne: "Līnijas operators",
        regleur_cartonnerie: "Noregulētājs",
        chef_equipe_cartonnerie: "Komandas vadītājs",
      },
      classifications: {
        niveau_1: "Līmenis I",
        niveau_2: "Līmenis II",
        niveau_3: "Līmenis III",
        niveau_4: "Līmenis IV",
      },
    },
    autre: {
      label: "Cits",
      convention: "Noteikt atbilstoši darbības jomai",
      postes: {
        autre_poste: "Cits amats (precizējiet)",
      },
      classifications: {
        a_definir: "Noteikt",
      },
    },
  },

  // === EIROPAS VALSTIS ===
  pays: {
    france: "Francija",
    allemagne: "Vācija",
    autriche: "Austrija",
    belgique: "Beļģija",
    bulgarie: "Bulgārija",
    croatie: "Horvātija",
    chypre: "Kipra",
    danemark: "Dānija",
    espagne: "Spānija",
    estonie: "Igaunija",
    finlande: "Somija",
    grece: "Grieķija",
    hongrie: "Ungārija",
    irlande: "Īrija",
    italie: "Itālija",
    lettonie: "Latvija",
    lituanie: "Lietuva",
    luxembourg: "Luksemburga",
    malte: "Malta",
    pays_bas: "Nīderlande",
    pologne: "Polija",
    portugal: "Portugāle",
    republique_tcheque: "Čehija",
    roumanie: "Rumānija",
    slovaquie: "Slovākija",
    slovenie: "Slovēnija",
    suede: "Zviedrija",
  },

  // === LAPA PIEDĀVĀJUMA KOPSAVILKUMS (PARAKSTS) ===
  pageRecap: {
    header: {
      title: "Piedāvājuma kopsavilkums",
      exportPDF: "Eksportēt PDF",
      loading: "Ielādē piedāvājumu...",
      notFound: "Piedāvājums nav atrasts",
    },
    statut: {
      signe: "Parakstīts",
      nouveau: "Jauns",
    },
    dates: {
      creeLe: "Izveidots",
      a: "",
      signeLe: "Parakstīts",
      derniereModification: "Pēdējās izmaiņas:",
    },
    entreprise: {
      title: "Uzņēmuma informācija",
      raisonSociale: "Uzņēmuma nosaukums",
      siret: "SIRET",
      codeAPE: "APE kods",
      tvaIntracommunautaire: "Kopienas iekšējais PVN",
      adresse: "Adrese",
      siteInternet: "Mājaslapa",
    },
    contact: {
      title: "Kontaktpersona",
      nomComplet: "Pilns vārds",
      fonction: "Amats",
      email: "E-pasts",
      telephonePortable: "Mobilais tālrunis",
      telephoneFixe: "Fiksētais tālrunis",
    },
    postes: {
      title: "Aizpildāmie amati",
      nationalite: "Pilsonība",
      salaireBrut: "Bruto alga",
      tauxHoraireBrut: "Bruto stundas likme",
      coefficientETT: "Aģentūras koeficients",
      tauxETT: "Aģentūras likme",
    },
    conditions: {
      title: "Darba nosacījumi",
      dateDebut: "Sākuma datums",
      dateFin: "Beigu datums",
      periodeEssai: "Pārbaudes periods",
      baseHoraire: "Stundu bāze",
      heuresMois: "h/mēn.",
      lieuxMission: "Misijas vietas",
      motifRecours: "Īslaicīgās nodarbinātības iemesls",
    },
    exigences: {
      title: "Kandidātu prasības",
      experience: "Pieredze",
      competences: "Prasmes",
      langues: "Valodas",
      permis: "Vadītāja apliecības",
      epi: "IAL",
    },
    calculs: {
      title: "Likmju aprēķini",
      salaireBrut: "Bruto alga",
      coefficientETT: "Aģentūras koeficients",
      tauxHoraireBrut: "Bruto stundas likme",
      tauxETT: "Aģentūras likme",
      baseHoraire: "Stundu bāze",
      coutMensuel: "Mēneša izdevumi",
      duree: "Ilgums",
      coutTotal: "Kopējie izdevumi",
    },
    signature: {
      title: "Elektroniskais paraksts",
      intro: "Apliecinu, ka esmu izlasījis un piekrītu šī piedāvājuma nosacījumiem.",
      nomComplet: {
        label: "Pilns vārds",
        placeholder: "Jānis Bērziņš",
      },
      email: {
        label: "Apstiprinošais e-pasts",
        placeholder: "janis.berzins@uznemums.lv",
      },
      checkbox: "Piekrītu vispārējiem nosacījumiem",
      boutonSigner: "Parakstīt elektroniski",
      enCours: "Paraksta...",
      succes: "✓ Piedāvājums veiksmīgi parakstīts!",
      erreur: "Kļūda parakstot. Lūdzu, mēģiniet vēlreiz.",
    },
    actions: {
      modifier: "Rediģēt piedāvājumu",
      telecharger: "Lejupielādēt PDF",
      partager: "Dalīties",
    },
  },
};
