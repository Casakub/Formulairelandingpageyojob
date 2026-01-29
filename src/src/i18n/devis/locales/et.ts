/**
 * 🇪🇪 EESTI TÕLGE - HINNAPAKKUMISE TAOTLUSE VORM
 * 
 * Täielik eesti tõlge hinnapakkumise taotluse vormist
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const et: DevisTranslations = {
  // === ÜLDINE ===
  common: {
    next: "Edasi",
    previous: "Tagasi",
    submit: "Saada",
    required: "*",
    optional: "(valikuline)",
    loading: "Laadimine...",
    error: "Viga",
    success: "Edukas",
    cancel: "Tühista",
    save: "Salvesta",
    edit: "Muuda",
    delete: "Kustuta",
    confirm: "Kinnita",
    euro: "€",
    perHour: "/tund",
    perMonth: "/kuu",
    perDay: "/päev",
    persons: "inimest",
    hours: "tundi",
    days: "päeva",
    months: "kuud",
    year: "aastat",
  },

  // === NAVIGEERIMINE ===
  navigation: {
    back: "Tagasi",
    stepOf: "Samm {step} / {total}",
    steps: {
      entreprise: {
        title: "Ettevõte",
        badge: "🏢 Teie ettevõte",
      },
      contact: {
        title: "Kontakt",
        badge: "👤 Teie kontaktisik",
      },
      besoins: {
        title: "Vajadused",
        badge: "💼 Teie vajadused",
      },
      conditions: {
        title: "Tingimused",
        badge: "📋 Tingimused",
      },
      candidats: {
        title: "Kandidaadid",
        badge: "👷 Otsitav profiil",
      },
      recapitulatif: {
        title: "Kokkuvõte",
        badge: "✅ Kokkuvõte",
      },
    },
  },

  // === VALIDEERIMINE ===
  validation: {
    fillRequired: "Palun täitke kõik kohustuslikud väljad",
    selectRegion: "Palun valige regioon",
    addAtLeastOnePosition: "Palun lisage vähemalt üks ametikoht",
    invalidEmail: "Palun sisestage kehtiv e-posti aadress",
    invalidPhone: "Palun sisestage kehtiv telefoninumber",
    invalidSIRET: "Palun sisestage kehtiv SIRET number (14 numbrit)",
    dateRequired: "Palun sisestage alguskuupäev",
    missionLocationRequired: "Palun sisestage missiooni asukoht",
  },

  // === TEATED ===
  messages: {
    success: {
      quoteSent: "Hinnapakkumise taotlus edukalt saadetud!",
      redirecting: "Suunamine...",
    },
    error: {
      submitError: "Viga hinnapakkumise taotluse saatmisel",
      genericError: "Tekkis viga",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Hinnapakkumise taotlus | YOJOB",
    pageDescription: "Taotlege hinnapakkumist oma Euroopa ajutise tööhõive vajaduste jaoks.",
  },

  // === SAMM 1: ETTEVÕTE ===
  step1: {
    title: "Ettevõtte andmed",
    subtitle: "Sisestage oma kliendi ettevõtte juriidilised andmed.",
    fields: {
      pays: {
        label: "Riik",
        placeholder: "Valige riik",
      },
      raisonSociale: {
        label: "Ettevõtte nimi",
        placeholder: "Nt: YOJOB OÜ",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 numbrit",
        helper: "Teie tegevuskoha identifitseerimiskood",
      },
      codeAPE: {
        label: "APE/NAF kood",
        placeholder: "Nt: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Ühendusesisene KM",
        placeholder: "Nt: EE123456789",
      },
      adresse: {
        label: "Täielik aadress",
        placeholder: "Maja number ja tänava nimi",
      },
      codePostal: {
        label: "Postiindeks",
        placeholder: "Nt: 10111",
      },
      ville: {
        label: "Linn",
        placeholder: "Nt: Tallinn",
      },
      region: {
        label: "Regioon/Maakond",
        placeholder: "Valige regioon",
        placeholderOtherCountry: "Nt: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Veebileht",
        placeholder: "https://www.naitis.ee",
      },
    },
    infoMessage: "✓ Neid andmeid kasutatakse teie isikupärastatud pakkumise koostamiseks",
  },

  // === SAMM 2: KONTAKT ===
  step2: {
    title: "Kontaktisik",
    subtitle: "Kes on selle projekti peamine kontaktisik?",
    fields: {
      civilite: {
        label: "Pöördumisviis",
        options: {
          m: "Härra",
          mme: "Proua",
        },
      },
      nom: {
        label: "Perekonnanimi",
        placeholder: "Nt: Tamm",
      },
      prenom: {
        label: "Eesnimi",
        placeholder: "Nt: Jüri",
      },
      fonction: {
        label: "Ametikoht",
        placeholder: "Nt: Personalijuht",
      },
      email: {
        label: "Äriline e-posti aadress",
        placeholder: "jyri.tamm@ettevote.ee",
      },
      telephone: {
        label: "Telefon",
        placeholder: "+372 5123 4567",
      },
    },
  },

  // === SAMM 3: VAJADUSED ===
  step3: {
    title: "Teie tööhõive vajadused",
    subtitle: "Kirjeldage otsitavaid profiile ja nende tingimusi.",
    profileLabel: "Profiil",
    addProfile: "Lisa täiendav profiil",
    removeProfile: "Eemalda see profiil",
    loadingConfig: "Konfiguratsiooni laadimine...",
    missingRegionWarning: "⚠️ Palun valige sammus 1 oma regioon palkade automaatseks kuvamiseks.",
    fields: {
      secteur: {
        label: "Tegevusvaldkond",
        placeholder: "Valige tegevusvaldkond",
      },
      convention: {
        label: "Kollektiivleping",
        placeholder: "Automaatne vastavalt tegevusvaldkonnale",
      },
      poste: {
        label: "Otsitav ametikoht",
        placeholder: "Valige ametikoht",
      },
      classification: {
        label: "Klassifikatsioon / Kvalifikatsioon",
        placeholder: "Valige klassifikatsioon",
      },
      quantite: {
        label: "Inimeste arv",
        placeholder: "Nt: 5",
        helper: "Kui palju inimesi on selle ametikoha jaoks vaja?",
      },
      salaireBrut: {
        label: "Brutokuupalk",
        placeholder: "Nt: 2500",
        helper: "Brutopalk 151,67 tunni/kuu alusel",
      },
      nationalite: {
        label: "Töötajate kodakondsus",
        placeholder: "Valige riik",
        helper: "Kodakondsus mõjutab agentuuri määra koefitsienti",
      },
    },
    ajouterPoste: "Lisa uus ametikoht",
    supprimerPoste: "Eemalda see ametikoht",
    posteNumero: "Ametikoht",
    coefficientInfo: {
      title: "💡 Rakendatud agentuuri koefitsient",
      base: "Põhikoef.",
      facteurPays: "Riigi tegur",
      final: "Lõplik koefitsient",
    },
    summary: {
      title: "Töötaja tasu",
      salaireBrutMensuel: "Brutokuupalk",
      tauxHoraireBrut: "Bruto tunnitasu",
      baseMensuelle: "(Alus 151,67 tundi/kuu vastavalt kollektiivlepingule)",
    },
  },

  // === SAMM 4: TINGIMUSED ===
  step4: {
    title: "Töötingimused",
    subtitle: "Täpsustage tööhõive tingimusi ja pakutavaid hüvesid.",
    dateError: "Lõppkuupäev peab olema pärast alguskuupäeva",
    fields: {
      dateDebut: {
        label: "Nõutav alguskuupäev",
        placeholder: "PP/KK/AAAA",
      },
      dateFin: {
        label: "Eeldatav lõppkuupäev",
        placeholder: "PP/KK/AAAA",
        helper: "Jätke tühjaks määramata aja puhul",
      },
      baseHoraire: {
        label: "Kuine tundide alus",
        placeholder: "Nt: 151,67",
        helper: "Seaduslik alus Prantsusmaal: 151,67 tundi/kuu (35 tundi/nädal)",
      },
      lieuxMission: {
        label: "Missiooni asukohad",
        placeholder: "Nt: Tallinna kesklinn, Tartu tsoon 3, Pärnu...",
      },
      periodeEssai: {
        label: "Katseaeg",
        placeholder: "Valige kestus",
        options: {
          '2': '2 päeva',
          '3': '3 päeva',
          '5': '5 päeva',
          '15': '15 päeva',
        },
      },
      motifRecours: {
        label: "Ajutise tööhõive põhjus",
        placeholder: "Valige põhjus",
        options: {
          accroissement: "Tegevuse ajutine suurenemine",
          remplacement: "Puuduva töötaja asendamine",
          saisonnier: "Hooajatöö",
          exportation: "Erakorraline eksporditelimus",
          autre: "Muu (täpsustage)",
        },
      },
      delaiPaiement: {
        label: "Nõutav maksetähtaeg",
        placeholder: "Valige tähtaeg",
        options: {
          reception: "Makse kättesaamisel",
          j30: "30 päeva",
          j45: "45 päeva",
          j60: "60 päeva",
        },
      },
    },
    hebergement: {
      title: "Majutus",
      chargeEU: {
        label: "Majutus tagatud kliendi ettevõtte poolt",
        helper: "Kui EI: agentuur võtab lisatasu +3,50 €/tund",
      },
      supplementWarning: "⚠️ Võetakse lisatasu +3,50 €/tund, kuna majutus ei ole tagatud",
      commentaire: {
        label: "Majutuse üksikasjad",
        placeholder: "Majutuse liik, aadress, eritingimused...",
      },
    },
    transport: {
      title: "Kohalik transport",
      chargeETT: {
        label: "Kohalik transport tagatud agentuuri poolt",
        helper: "Kui JAH: võetakse lisatasu +1,50 €/tund",
      },
      supplementInfo: "✓ Võetakse lisatasu +1,50 €/tund kohaliku transpordi kulude katmiseks",
    },
    repas: {
      title: "Toitlustamine",
      options: {
        restaurant: "Ettevõtte sööklat / Toidukupongid",
        panier: "Päevane toiduraha (arvestatakse päeviti)",
        nonConcerne: "Ei kehti",
      },
      montantInfo: "📋 Päevase toiduraha summa: {montant} / tööpäev (arvestatakse eraldi)",
      montantNonDefini: "⚠️ Summa ei ole selle riigi/regiooni jaoks määratletud",
    },
    sections: {
      hebergement: {
        title: "Majutus",
        chargeEU: {
          label: "Majutus tagatud kliendi ettevõtte poolt",
          helper: "Kui EI: agentuur võtab lisatasu +3,50 €/tund",
          options: {
            oui: "Jah, tagatud kliendi poolt",
            non: "Ei, maksab töötaja",
          },
        },
        detailsEU: {
          type: {
            label: "Majutuse liik",
            options: {
              hotel: "Hotell",
              appartement: "Korter",
              foyer: "Tööliste maja",
              autre: "Muu",
            },
          },
          adresse: {
            label: "Majutuse aadress",
            placeholder: "Majutuse täielik aadress",
          },
        },
      },
      transportInternational: {
        title: "Rahvusvaheline transport (päritoluriik ↔ Prantsusmaa)",
        chargeEU: {
          label: "Transport tagatud kliendi ettevõtte poolt",
          helper: "Reisid päritoluriigi ja missiooni asukoha vahel",
          options: {
            oui: "Jah, tagatud kliendi poolt",
            non: "Ei, maksab töötaja",
          },
        },
        detailsEU: {
          type: {
            label: "Transpordi liik",
            options: {
              avion: "Lennuk",
              train: "Rong",
              bus: "Buss",
              covoiturage: "Korraldatud ühissõit",
            },
          },
          frequence: {
            label: "Reisi sagedus",
            options: {
              allerRetour: "Ainult esialgne saabumine ja lahkumine",
              hebdomadaire: "Iganädalane",
              mensuel: "Igakuine",
            },
          },
        },
      },
      transportLocal: {
        title: "Kohalik transport",
        chargeETT: {
          label: "Kohalik transport tagatud agentuuri poolt",
          helper: "Kui JAH: võetakse lisatasu +1,50 €/tund",
          options: {
            oui: "Jah, tagatud agentuuri poolt",
            non: "Ei, maksab töötaja",
          },
        },
        detailsETT: {
          type: {
            label: "Transpordi liik",
            options: {
              vehicule: "Teenistusauto",
              transport: "Ühistransport",
              velo: "Jalgratas",
            },
          },
        },
      },
      repas: {
        title: "Toitlustamine",
        type: {
          label: "Toitlustamise liik",
          options: {
            restaurant: "Ettevõtte sööklat / Toidukupongid",
            panier: "Päevane toiduraha (arvestatakse päeviti)",
            nonConcerne: "Ei kehti",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Päevane eelarve",
            placeholder: "Summa €",
          },
        },
        detailsPanier: {
          info: "Päevane toiduraha arvestatakse eraldi iga tööpäeva eest",
        },
      },
    },
  },

  // === SAMM 5: KANDIDAADID ===
  step5: {
    title: "Kandidaatide profiil",
    subtitle: "Määratlege oskused ja konkreetsed nõuded.",
    sections: {
      experience: {
        title: "Töökogemus",
        obligatoire: {
          label: "Kohustuslik kogemus",
        },
        annees: {
          label: "Minimaalne kogemuse aastate arv",
          placeholder: "Nt: 3",
          options: {
            '0-1': "Algaja (0-1 aastat)",
            '1-3': "Keskmine (1-3 aastat)",
            '3-5': "Kinnitatud (3-5 aastat)",
            '5+': "Ekspert (5 aastat ja rohkem)",
          },
        },
        competences: {
          label: "Nõutavad tehnilised oskused",
          placeholder: "Nt: Müüritöö, loodimine, jooniste lugemine, TIG-keevitus...",
        },
      },
      formation: {
        title: "Haridus",
        obligatoire: {
          label: "Kohustuslik haridus",
        },
        type: {
          label: "Hariduse liik",
          placeholder: "Nt: Kvalifitseeritud müürsepp, CACES R489...",
        },
      },
      travailRisque: {
        title: "Ohtlik töö",
        active: {
          label: "Spetsiifiline ohtlik töö",
        },
        precisions: {
          label: "Riskide täpsustamine",
          placeholder: "Nt: Kõrgustööd, raskete koormate käsitsemine...",
        },
      },
      langues: {
        title: "Keeleoskus",
        francais: {
          label: "Nõutav prantsuse keele tase",
          placeholder: "Valige tase",
          options: {
            a1: "A1 - Algaja",
            a2: "A2 - Põhitase",
            b1: "B1 - Keskmine",
            b2: "B2 - Kõrgem keskmine",
            b3: "C1 - Kõrgtase",
            c2: "C2 - Emakeel",
            natif: "Emakeel",
          },
        },
        autres: {
          label: "Muud kasulikud keeled",
          placeholder: "Nt: Inglise keel (B1), Saksa keel (A2)...",
        },
        languageNames: {
          francais: "Prantsuse keel",
          anglais: "Inglise keel",
          portugais: "Portugali keel",
          espagnol: "Hispaania keel",
          italien: "Itaalia keel",
          autre: "Muu",
        },
        levels: {
          'non-requis': "Ei ole nõutav",
          'A1': "A1 - Algaja",
          'A2': "A2 - Põhitase",
          'B1': "B1 - Keskmine",
          'B2': "B2 - Kõrgem keskmine",
          'C1': "C1 - Iseseisev",
          'C2': "C2 - Emakeel",
        },
      },
      permis: {
        title: "Juhiluba",
        requis: {
          label: "Nõutav juhiluba",
          options: {
            aucun: "Juhiluba ei ole nõutav",
            b: "Juhiluba kat. B (sõiduauto)",
            c: "Juhiluba kat. C (veoauto)",
            ce: "Juhiluba kat. CE (veoauto + haagis)",
            d: "Juhiluba kat. D (inimeste vedu)",
          },
        },
        categorie: {
          label: "Juhiloa kategooria",
          placeholder: "Nt: B, C, CE...",
        },
      },
      outillage: {
        title: "Käsitööriistad",
        requis: {
          label: "Nõutav oma tööriist",
        },
        type: {
          label: "Tööriista liik",
          placeholder: "Nt: Haamer, vesivaht, mõõdulint, lihvija...",
        },
      },
      epi: {
        title: "Isikukaitsevahendid (IKV)",
        infoLegale: "ℹ️ Vastavalt määrustele peab tööandja tagama ametikoha riskidele kohandatud IKV.",
        selectionCount: "✓ {count} valitud IKV",
        fournis: {
          label: "IKV tagatud ettevõtte poolt",
          helper: "Kiiver, turvajalatsid, kindad jne.",
          options: {
            oui: "Jah, tagatud kliendi poolt",
            non: "Ei, maksab töötaja",
          },
        },
        liste: {
          label: "Nõutavate IKV nimekiri",
          placeholder: "Nt: Kiiver, jalatsid S3, lõikekindlad kindad, turvaköis...",
        },
        items: {
          casque: "Kaitsekiiver",
          lunettes: "Kaitseprillid",
          protections_auditives: "Kuulmiskaitse",
          gants: "Kaitsekindad",
          chaussures: "Turvajalatsid",
          harnais: "Turvaköis",
          vetements: "Tööriided",
          masque: "Respiraator",
          protection_faciale: "Näokaitse",
          vetements_visibilite: "Kõrgnähtavusega riided",
        },
      },
      autresExigences: {
        title: "Muud nõuded",
        label: "Muud konkreetsed nõuded",
        placeholder: "Nt: Elektrilitsentsid, CACES, kättesaadavus nädalavahetustel, kõrgustööd...",
      },
    },
  },

  // === KOKKUVÕTE ===
  recapitulatif: {
    title: "Teie taotluse kokkuvõte",
    subtitle: "Kontrollige andmeid enne hinnapakkumise taotluse saatmist.",
    acceptConditionsError: "Palun nõustuge tingimustega enne jätkamist",
    entreprise: {
      title: "Ettevõte",
      raisonSociale: "Ettevõtte nimi",
      siret: "SIRET",
      pays: "Riik",
      ville: "Linn",
      region: "Regioon/Maakond",
    },
    contact: {
      title: "Kontakt",
      nomPrenom: "Ees- ja perekonnanimi",
      email: "E-post",
      telephone: "Telefon",
      fonction: "Ametikoht",
    },
    postes: {
      title: "Nõutavad ametikohad",
      coeffETT: "📊 Rakendatud agentuuri koefitsient",
      coeffBase: "Põhikoef.",
      facteurPays: "Riigi tegur",
      supplementsHoraires: "✨ Tunnitasud (määras sisaldub)",
      hebergement: "✓ Majutus",
      transport: "✓ Kohalik transport",
      panierRepas: "🍽️ Päevane toiduraha (arvestatakse päeviti)",
      baseHoraire: "📅 Tundide alus: {heures} tundi/kuu (kindlaks määratud ületunnid)",
      heuresNormales: "Tavatunnid (0-35 tundi/nädal)",
      heuresSup25: "Ületunnid +25% (36.-43. tund)",
      heuresSup50: "Ületunnid +50% (44.+ tund)",
      sousTotal: "Töö vahesumma (inimese kohta)",
      tauxHoraireBrut: "Bruto tunnitasu",
      tauxETTFinal: "Lõplik agentuuri määr",
      coutMensuel: "Kuised kogukulud",
    },
    conditions: {
      title: "Missiooni tingimused",
      dateDebut: "Alguskuupäev",
      dateFin: "Lõppkuupäev",
      dureeEstimee: "Hinnanguline kestus",
      lieuMission: "Missiooni asukoht",
      mois: "kuud",
    },
    majorations: {
      title: "Missiooni tariifikohandused",
      total: "Kohandused kokku",
      notSet: "Kohandusi ei ole määratud",
    },
    totaux: {
      mensuelHT: "Kokku kuus ilma KM-ta",
      mensuelTTC: "Kokku kuus koos KM-ga",
      totalMission: "Missiooni kogukulud",
    },
    noteLegale: "ℹ️ See hinnang on informatiivne. Lõplik määr kinnitatakse pärast meie meeskonna ja valitud partneragentuuri heakskiitu.",
    acceptConditions: {
      text: "Nõustun, et minu andmeid töödeldakse vastavalt",
      lien: "privaatsuspoliitikale",
    },
    boutonEnvoi: {
      texte: "Saada minu hinnapakkumise taotlus",
      enCours: "Saatmine...",
    },
    footer: "✓ Vastus 24 tunni jooksul • ✓ Ilma kohustusteta",
  },

  // === VEAD ===
  errors: {
    required: "See väli on kohustuslik",
    invalidEmail: "Vigane e-posti aadress",
    invalidSIRET: "Vigane SIRET (vaja 14 numbrit)",
    invalidPhone: "Vigane telefoninumber",
    minValue: "Väärtus peab olema suurem või võrdne {min}",
    maxValue: "Väärtus peab olema väiksem või võrdne {max}",
    genericError: "Tekkis viga. Palun proovige uuesti.",
    loadingError: "Viga andmete laadimisel",
    submitError: "Viga taotluse saatmisel",
  },

  // === TEGEVUSVALDKONNAD & AMETID ===
  secteurs: {
    batiment: {
      label: "Ehitus",
      convention: "Riiklik kollektiivleping ehitustöölised (3193)",
      postes: {
        macon: "Müürsepp",
        coffreur: "Loodimine puusepp",
        ferrailleur: "Raudbetoonsepp",
        carreleur: "Plaatija",
        platrier: "Krohvija",
        peintre: "Maaler",
        plombier: "Torulukksepp",
        electricien: "Elektrik",
        couvreur: "Katusesep",
        menuisier: "Puusepp",
        chef_equipe_batiment: "Meeskonnajuht",
        chef_chantier: "Ehitusjuht",
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
      convention: "Kollektiivleping metallurgia (3109)",
      postes: {
        soudeur: "Keevitaja",
        chaudronnier: "Katlasep",
        tuyauteur: "Torulukksepp",
        tourneur: "Treialipink",
        fraiseur: "Freespink",
        usineur: "CNC-operaator",
        mecanicien_industriel: "Tööstuslik mehaanik",
        monteur: "Monteerija",
        controleur_qualite: "Kvaliteedikontrolör",
        ajusteur: "Lukksepp",
        chef_equipe_metallurgie: "Meeskonnajuht",
      },
      classifications: {
        niveau_1: "Tase I",
        niveau_2: "Tase II",
        niveau_3: "Tase III",
        niveau_4: "Tase IV",
        niveau_5: "Tase V",
      },
    },
    tp: {
      label: "Avalikud tööd",
      convention: "Riiklik kollektiivleping avalikud tööd (3005)",
      postes: {
        conducteur_engins: "Masinate operaator",
        terrassier: "Kaevetööline",
        canalisateur: "Kanalisatsioonitööline",
        constructeur_routes: "Teetööline",
        coffreur_bancheur: "Loodimine puusepp",
        macon_vrd: "Müürsepp avalikud tööd",
        chef_equipe_tp: "Meeskonnajuht AT",
        manoeuvre_tp: "Abitööline AT",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotellindus",
      convention: "Kollektiivleping hotellid-restoranid (3292)",
      postes: {
        receptionniste: "Vastuvõtutöötaja",
        femme_chambre: "Tubateenija",
        agent_entretien: "Hooldaja",
        bagagiste: "Pagatõstja",
        concierge: "Portjee",
        night_audit: "Öine audiitor",
        gouvernante: "Majahoidja",
        chef_reception: "Vastuvõtujuht",
      },
      classifications: {
        niveau_1: "Tase I",
        niveau_2: "Tase II",
        niveau_3: "Tase III",
        niveau_4: "Tase IV",
        niveau_5: "Tase V",
      },
    },
    restauration: {
      label: "Toitlustus",
      convention: "Kollektiivleping hotellid-restoranid (3292)",
      postes: {
        cuisinier: "Kokk",
        commis_cuisine: "Abikok",
        chef_partie: "Chef de partie",
        serveur: "Ettekandjad",
        barman: "Baarmen",
        plongeur: "Nõudepesija",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Peakokk",
      },
      classifications: {
        niveau_1: "Tase I",
        niveau_2: "Tase II",
        niveau_3: "Tase III",
        niveau_4: "Tase IV",
        niveau_5: "Tase V",
      },
    },
    plasturgie: {
      label: "Plastindustria",
      convention: "Kollektiivleping plastindustria (0292)",
      postes: {
        operateur_injection: "Surveoperaator",
        operateur_extrusion: "Ekstruuderoperaator",
        regleur: "Seadistaja",
        operateur_thermoformage: "Termovormimisoperaator",
        controleur_qualite_plasturgie: "Kvaliteedikontrolör",
        technicien_maintenance: "Hooldustehnik",
        chef_equipe_plasturgie: "Meeskonnajuht",
      },
      classifications: {
        niveau_1: "Tase I",
        niveau_2: "Tase II",
        niveau_3: "Tase III",
        niveau_4: "Tase IV",
      },
    },
    automobile_carrosserie: {
      label: "Autotööstus & Keresepad",
      convention: "Kollektiivleping autoremont (1090)",
      postes: {
        carrossier: "Keresep",
        peintre_automobile: "Automaaler",
        mecanicien_auto: "Automehaanik",
        electricien_auto: "Autoelektrik",
        chef_atelier: "Töökoja juhataja",
        controleur_technique: "Tehniline kontrolör",
      },
      classifications: {
        niveau_1: "Tase I",
        niveau_2: "Tase II",
        niveau_3: "Tase III",
        niveau_4: "Tase IV",
      },
    },
    sylviculture: {
      label: "Metsandus",
      convention: "Kollektiivleping põllumajandus (7501)",
      postes: {
        bucheron: "Metsavõtja",
        elagueur: "Puude kärpija",
        conducteur_engins_forestiers: "Metsamasinate operaator",
        chef_equipe_sylviculture: "Meeskonnajuht metsandus",
      },
      classifications: {
        niveau_1: "Tase I",
        niveau_2: "Tase II",
        niveau_3: "Tase III",
        niveau_4: "Tase IV",
      },
    },
    cartonnerie: {
      label: "Kartongitööstus",
      convention: "Kollektiivleping töötlev tööstus (3107)",
      postes: {
        operateur_production: "Tootmisoperaator",
        conducteur_ligne: "Liinitöötaja",
        regleur_cartonnerie: "Seadistaja",
        chef_equipe_cartonnerie: "Meeskonnajuht",
      },
      classifications: {
        niveau_1: "Tase I",
        niveau_2: "Tase II",
        niveau_3: "Tase III",
        niveau_4: "Tase IV",
      },
    },
    autre: {
      label: "Muu",
      convention: "Määrata vastavalt tegevusvaldkonnale",
      postes: {
        autre_poste: "Muu ametikoht (täpsustage)",
      },
      classifications: {
        a_definir: "Määrata",
      },
    },
  },

  // === EUROOPA RIIGID ===
  pays: {
    france: "Prantsusmaa",
    allemagne: "Saksamaa",
    autriche: "Austria",
    belgique: "Belgia",
    bulgarie: "Bulgaaria",
    croatie: "Horvaatia",
    chypre: "Küpros",
    danemark: "Taani",
    espagne: "Hispaania",
    estonie: "Eesti",
    finlande: "Soome",
    grece: "Kreeka",
    hongrie: "Ungari",
    irlande: "Iirimaa",
    italie: "Itaalia",
    lettonie: "Läti",
    lituanie: "Leedu",
    luxembourg: "Luksemburg",
    malte: "Malta",
    pays_bas: "Holland",
    pologne: "Poola",
    portugal: "Portugal",
    republique_tcheque: "Tšehhi",
    roumanie: "Rumeenia",
    slovaquie: "Slovakkia",
    slovenie: "Sloveenia",
    suede: "Rootsi",
  },

  // === LEHT PAKKUMISE KOKKUVÕTE (ALLKIRI) ===
  pageRecap: {
    header: {
      title: "Pakkumise kokkuvõte",
      exportPDF: "Ekspordi PDF-i",
      loading: "Pakkumise laadimine...",
      notFound: "Pakkumist ei leitud",
    },
    statut: {
      signe: "Allkirjastatud",
      nouveau: "Uus",
    },
    dates: {
      creeLe: "Loodud",
      a: "kell",
      signeLe: "Allkirjastatud",
      derniereModification: "Viimane muudatus:",
    },
    entreprise: {
      title: "Ettevõtte andmed",
      raisonSociale: "Ettevõtte nimi",
      siret: "SIRET",
      codeAPE: "APE kood",
      tvaIntracommunautaire: "Ühendusesisene KM",
      adresse: "Aadress",
      siteInternet: "Veebileht",
    },
    contact: {
      title: "Kontaktisik",
      nomComplet: "Täisnimi",
      fonction: "Ametikoht",
      email: "E-post",
      telephonePortable: "Mobiiltelefon",
      telephoneFixe: "Lauatelefon",
    },
    postes: {
      title: "Täidetavad ametikohad",
      nationalite: "Kodakondsus",
      salaireBrut: "Brutopalk",
      tauxHoraireBrut: "Bruto tunnitasu",
      coefficientETT: "Agentuuri koefitsient",
      tauxETT: "Agentuuri määr",
    },
    conditions: {
      title: "Töötingimused",
      dateDebut: "Alguskuupäev",
      dateFin: "Lõppkuupäev",
      periodeEssai: "Katseaeg",
      baseHoraire: "Tundide alus",
      heuresMois: "tundi/kuu",
      lieuxMission: "Missiooni asukohad",
      motifRecours: "Ajutise tööhõive põhjus",
    },
    exigences: {
      title: "Kandidaatide nõuded",
      experience: "Kogemus",
      competences: "Oskused",
      langues: "Keeled",
      permis: "Juhiload",
      epi: "IKV",
    },
    calculs: {
      title: "Määrade arvutused",
      salaireBrut: "Brutopalk",
      coefficientETT: "Agentuuri koefitsient",
      tauxHoraireBrut: "Bruto tunnitasu",
      tauxETT: "Agentuuri määr",
      baseHoraire: "Tundide alus",
      coutMensuel: "Kuised kulud",
      duree: "Kestus",
      coutTotal: "Kogukulud",
    },
    signature: {
      title: "Elektrooniline allkiri",
      intro: "Kinnitan, et olen lugenud ja nõustun selle pakkumise tingimustega.",
      nomComplet: {
        label: "Täisnimi",
        placeholder: "Jüri Tamm",
      },
      email: {
        label: "Kinnitav e-post",
        placeholder: "jyri.tamm@ettevote.ee",
      },
      checkbox: "Nõustun üldtingimustega",
      boutonSigner: "Allkirjasta elektrooniliselt",
      enCours: "Allkirjastamine...",
      succes: "✓ Pakkumus edukalt allkirjastatud!",
      erreur: "Viga allkirjastamisel. Palun proovige uuesti.",
    },
    actions: {
      modifier: "Muuda pakkumust",
      telecharger: "Laadi PDF alla",
      partager: "Jaga",
    },
  },
};