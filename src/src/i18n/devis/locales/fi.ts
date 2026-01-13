/**
 * 🇫🇮 SUOMENKIELINEN KÄÄNNÖS - TARJOUSPYYNTÖLOMAKE
 * 
 * Täydellinen suomenkielinen käännös tarjouspyyntölomakkeelle
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const fi: DevisTranslations = {
  // === YLEISET ===
  common: {
    next: "Seuraava",
    previous: "Edellinen",
    submit: "Lähetä",
    required: "*",
    optional: "(valinnainen)",
    loading: "Ladataan...",
    error: "Virhe",
    success: "Onnistui",
    cancel: "Peruuta",
    save: "Tallenna",
    edit: "Muokkaa",
    delete: "Poista",
    confirm: "Vahvista",
    euro: "€",
    perHour: "/tunti",
    perMonth: "/kk",
    perDay: "/päivä",
    persons: "henkilöä",
    hours: "tuntia",
    days: "päivää",
    months: "kuukautta",
    year: "vuosi",
  },

  // === NAVIGOINTI ===
  navigation: {
    back: "Takaisin",
    stepOf: "Vaihe {step} / {total}",
    steps: {
      entreprise: {
        title: "Yritys",
        badge: "🏢 Yrityksesi",
      },
      contact: {
        title: "Yhteyshenkilö",
        badge: "👤 Yhteyshenkilösi",
      },
      besoins: {
        title: "Tarpeet",
        badge: "💼 Tarpeesi",
      },
      conditions: {
        title: "Ehdot",
        badge: "📋 Ehdot",
      },
      candidats: {
        title: "Hakijat",
        badge: "👷 Haettu profiili",
      },
      recapitulatif: {
        title: "Yhteenveto",
        badge: "✅ Yhteenveto",
      },
    },
  },

  // === VALIDOINTI ===
  validation: {
    fillRequired: "Täytä kaikki pakolliset kentät",
    selectRegion: "Valitse alue",
    addAtLeastOnePosition: "Lisää vähintään yksi tehtävä",
    invalidEmail: "Anna kelvollinen sähköpostiosoite",
    invalidPhone: "Anna kelvollinen puhelinnumero",
    invalidSIRET: "Anna kelvollinen SIRET-numero (14 numeroa)",
    dateRequired: "Anna aloituspäivämäärä",
    missionLocationRequired: "Anna työpaikan sijainti",
  },

  // === VIESTIT ===
  messages: {
    success: {
      quoteSent: "Tarjouspyyntö lähetetty onnistuneesti!",
      redirecting: "Ohjataan...",
    },
    error: {
      submitError: "Virhe tarjouspyynnön lähetyksessä",
      genericError: "Tapahtui virhe",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Tarjouspyyntö | YOJOB",
    pageDescription: "Pyydä tarjous eurooppalaisiin vuokratyövoimatarpeisiisi.",
  },

  // === VAIHE 1: YRITYS ===
  step1: {
    title: "Yrityksen tiedot",
    subtitle: "Anna asiakasyrityksesi oikeudelliset tiedot.",
    fields: {
      pays: {
        label: "Maa",
        placeholder: "Valitse maa",
      },
      raisonSociale: {
        label: "Yrityksen nimi",
        placeholder: "Esim.: YOJOB OY",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 numeroa",
        helper: "Toimipaikkasi tunnistuskoodi",
      },
      codeAPE: {
        label: "APE/NAF-koodi",
        placeholder: "Esim.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "EU:n ALV-tunnus",
        placeholder: "Esim.: FI12345678",
      },
      adresse: {
        label: "Täydellinen osoite",
        placeholder: "Kadun numero ja nimi",
      },
      codePostal: {
        label: "Postinumero",
        placeholder: "Esim.: 00100",
      },
      ville: {
        label: "Kaupunki",
        placeholder: "Esim.: Helsinki",
      },
      region: {
        label: "Alue/Maakunta",
        placeholder: "Valitse alue",
        placeholderOtherCountry: "Esim.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Verkkosivusto",
        placeholder: "https://www.esimerkki.fi",
      },
    },
    infoMessage: "✓ Näitä tietoja käytetään räätälöidyn tarjouksesi valmisteluun",
  },

  // === VAIHE 2: YHTEYSHENKILÖ ===
  step2: {
    title: "Yhteyshenkilö",
    subtitle: "Kuka on tämän projektin pääyhteyshenkilö?",
    fields: {
      civilite: {
        label: "Titteli",
        options: {
          m: "Herra",
          mme: "Rouva",
        },
      },
      nom: {
        label: "Sukunimi",
        placeholder: "Esim.: Virtanen",
      },
      prenom: {
        label: "Etunimi",
        placeholder: "Esim.: Mikko",
      },
      fonction: {
        label: "Tehtävänimike",
        placeholder: "Esim.: Henkilöstöpäällikkö",
      },
      email: {
        label: "Työsähköposti",
        placeholder: "mikko.virtanen@yritys.fi",
      },
      telephone: {
        label: "Puhelin",
        placeholder: "+358 40 123 4567",
      },
    },
  },

  // === VAIHE 3: TARPEET ===
  step3: {
    title: "Työvoimatarpeesi",
    subtitle: "Kuvaile etsimäsi profiilit ja niiden ehdot.",
    profileLabel: "Profiili",
    addProfile: "Lisää profiili",
    removeProfile: "Poista tämä profiili",
    loadingConfig: "Ladataan asetuksia...",
    missingRegionWarning: "⚠️ Valitse alueesi vaiheessa 1 palkkojen automaattista näyttöä varten.",
    fields: {
      secteur: {
        label: "Toimiala",
        placeholder: "Valitse toimiala",
      },
      convention: {
        label: "Työehtosopimus",
        placeholder: "Automaattisesti toimialan mukaan",
      },
      poste: {
        label: "Haettu tehtävä",
        placeholder: "Valitse tehtävä",
      },
      classification: {
        label: "Luokitus / Pätevyys",
        placeholder: "Valitse luokitus",
      },
      quantite: {
        label: "Henkilöiden määrä",
        placeholder: "Esim.: 5",
        helper: "Kuinka monta henkilöä tarvitaan tähän tehtävään?",
      },
      salaireBrut: {
        label: "Bruttokuukausipalkka",
        placeholder: "Esim.: 2500",
        helper: "Bruttopalkka 151,67 tunnin/kk perusteella",
      },
      nationalite: {
        label: "Työntekijöiden kansallisuus",
        placeholder: "Valitse maa",
        helper: "Kansallisuus vaikuttaa välitystoimiston hintakertoimeen",
      },
    },
    ajouterPoste: "Lisää uusi tehtävä",
    supprimerPoste: "Poista tämä tehtävä",
    posteNumero: "Tehtävä",
    coefficientInfo: {
      title: "💡 Sovellettu välitystoimiston kerroin",
      base: "Peruskerroin",
      facteurPays: "Maakohtainen tekijä",
      final: "Lopullinen kerroin",
    },
    summary: {
      title: "Työntekijän palkkaus",
      salaireBrutMensuel: "Bruttokuukausipalkka",
      tauxHoraireBrut: "Bruttotuntipalkka",
      baseMensuelle: "(Peruste 151,67 tuntia/kk työehtosopimuksen mukaan)",
    },
  },

  // === VAIHE 4: EHDOT ===
  step4: {
    title: "Työehdot",
    subtitle: "Täsmennä työsuhteen ehdot ja tarjotut edut.",
    dateError: "Päättymispäivän on oltava aloituspäivän jälkeen",
    fields: {
      dateDebut: {
        label: "Vaadittu aloituspäivä",
        placeholder: "PP/KK/VVVV",
      },
      dateFin: {
        label: "Arvioitu päättymispäivä",
        placeholder: "PP/KK/VVVV",
        helper: "Jätä tyhjäksi toistaiseksi voimassa olevalle",
      },
      baseHoraire: {
        label: "Kuukausittainen tuntimäärä",
        placeholder: "Esim.: 151,67",
        helper: "Lakisääteinen peruste Ranskassa: 151,67 tuntia/kk (35 tuntia/viikko)",
      },
      lieuxMission: {
        label: "Työpaikat",
        placeholder: "Esim.: Helsingin keskusta, Espoon alue 3, Tampere...",
      },
      periodeEssai: {
        label: "Koeaika",
        placeholder: "Valitse kesto",
        options: {
          '2': '2 päivää',
          '3': '3 päivää',
          '5': '5 päivää',
          '15': '15 päivää',
        },
      },
      motifRecours: {
        label: "Vuokratyön syy",
        placeholder: "Valitse syy",
        options: {
          accroissement: "Tilapäinen toiminnan kasvu",
          remplacement: "Poissaolevan työntekijän sijaisuus",
          saisonnier: "Kausiluonteinen työ",
          exportation: "Poikkeuksellinen vientitilaus",
          autre: "Muu (täsmennä)",
        },
      },
      delaiPaiement: {
        label: "Vaadittu maksuaika",
        placeholder: "Valitse määräaika",
        options: {
          reception: "Maksu vastaanotettaessa",
          j30: "30 päivää",
          j45: "45 päivää",
          j60: "60 päivää",
        },
      },
    },
    hebergement: {
      title: "Majoitus",
      chargeEU: {
        label: "Majoitus järjestetään asiakasyrityksen toimesta",
        helper: "Jos EI: välitystoimisto veloittaa lisämaksun +3,50 €/tunti",
      },
      supplementWarning: "⚠️ Lisämaksu +3,50 €/tunti veloitetaan, koska majoitusta ei järjestetä",
      commentaire: {
        label: "Majoituksen yksityiskohdat",
        placeholder: "Majoitustyyppi, osoite, erityisehdot...",
      },
    },
    transport: {
      title: "Paikallisliikenne",
      chargeETT: {
        label: "Paikallisliikenteen järjestää välitystoimisto",
        helper: "Jos KYLLÄ: lisämaksu +1,50 €/tunti veloitetaan",
      },
      supplementInfo: "✓ Lisämaksu +1,50 €/tunti veloitetaan paikallisliikenteen kustannusten kattamiseksi",
    },
    repas: {
      title: "Ateriat",
      options: {
        restaurant: "Yrityksen ruokala / Ateriaseteli",
        panier: "Päiväraha ruokailuun (veloitetaan päivittäin)",
        nonConcerne: "Ei koske",
      },
      montantInfo: "📋 Päivärahan määrä: {montant} / työpäivä (veloitetaan erikseen)",
      montantNonDefini: "⚠️ Määrää ei ole määritelty tälle maalle/alueelle",
    },
    sections: {
      hebergement: {
        title: "Majoitus",
        chargeEU: {
          label: "Majoitus järjestetään asiakasyrityksen toimesta",
          helper: "Jos EI: välitystoimisto veloittaa lisämaksun +3,50 €/tunti",
          options: {
            oui: "Kyllä, asiakas järjestää",
            non: "Ei, työntekijä maksaa",
          },
        },
        detailsEU: {
          type: {
            label: "Majoitustyyppi",
            options: {
              hotel: "Hotelli",
              appartement: "Asunto",
              foyer: "Työntekijöiden asuntola",
              autre: "Muu",
            },
          },
          adresse: {
            label: "Majoitusosoite",
            placeholder: "Täydellinen majoitusosoite",
          },
        },
      },
      transportInternational: {
        title: "Kansainvälinen liikenne (lähtömaa ↔ Ranska)",
        chargeEU: {
          label: "Liikenteen järjestää asiakasyritys",
          helper: "Matkat lähtömaan ja työpaikan välillä",
          options: {
            oui: "Kyllä, asiakas järjestää",
            non: "Ei, työntekijä maksaa",
          },
        },
        detailsEU: {
          type: {
            label: "Liikennemuoto",
            options: {
              avion: "Lentokone",
              train: "Juna",
              bus: "Linja-auto",
              covoiturage: "Järjestetty kimppakyytit",
            },
          },
          frequence: {
            label: "Matkojen tiheys",
            options: {
              allerRetour: "Vain alkuperäinen saapuminen ja lähtö",
              hebdomadaire: "Viikoittain",
              mensuel: "Kuukausittain",
            },
          },
        },
      },
      transportLocal: {
        title: "Paikallisliikenne",
        chargeETT: {
          label: "Paikallisliikenteen järjestää välitystoimisto",
          helper: "Jos KYLLÄ: lisämaksu +1,50 €/tunti veloitetaan",
          options: {
            oui: "Kyllä, välitystoimisto järjestää",
            non: "Ei, työntekijä maksaa",
          },
        },
        detailsETT: {
          type: {
            label: "Liikennemuoto",
            options: {
              vehicule: "Työauto",
              transport: "Julkinen liikenne",
              velo: "Polkupyörä",
            },
          },
        },
      },
      repas: {
        title: "Ateriat",
        type: {
          label: "Ateriatyyppi",
          options: {
            restaurant: "Yrityksen ruokala / Ateriaseteli",
            panier: "Päiväraha ruokailuun (veloitetaan päivittäin)",
            nonConcerne: "Ei koske",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Päiväbudjetti",
            placeholder: "Summa €",
          },
        },
        detailsPanier: {
          info: "Päiväraha ruokailuun veloitetaan erikseen jokaiselta työpäivältä",
        },
      },
    },
  },

  // === VAIHE 5: HAKIJAT ===
  step5: {
    title: "Hakijoiden profiili",
    subtitle: "Määritä taidot ja erityisvaatimukset.",
    sections: {
      experience: {
        title: "Työkokemus",
        obligatoire: {
          label: "Pakollinen kokemus",
        },
        annees: {
          label: "Vähimmäisvuosien määrä",
          placeholder: "Esim.: 3",
          options: {
            '0-1': "Aloittelija (0-1 vuosi)",
            '1-3': "Keskitasoinen (1-3 vuotta)",
            '3-5': "Vahvistettu (3-5 vuotta)",
            '5+': "Asiantuntija (5 vuotta ja enemmän)",
          },
        },
        competences: {
          label: "Vaaditut tekniset taidot",
          placeholder: "Esim.: Muuraus, muotit, piirustusten luku, TIG-hitsaus...",
        },
      },
      formation: {
        title: "Koulutus",
        obligatoire: {
          label: "Pakollinen koulutus",
        },
        type: {
          label: "Koulutuksen tyyppi",
          placeholder: "Esim.: Pätevä muurari, CACES R489...",
        },
      },
      travailRisque: {
        title: "Vaarallinen työ",
        active: {
          label: "Erityinen vaarallinen työ",
        },
        precisions: {
          label: "Riskien täsmennykset",
          placeholder: "Esim.: Korkealla työskentely, raskaiden taakkojen käsittely...",
        },
      },
      langues: {
        title: "Kielitaito",
        francais: {
          label: "Vaadittu ranskan kielen taso",
          placeholder: "Valitse taso",
          options: {
            a1: "A1 - Aloittelija",
            a2: "A2 - Perustaso",
            b1: "B1 - Keskitaso",
            b2: "B2 - Ylempi keskitaso",
            c1: "C1 - Edistynyt",
            c2: "C2 - Äidinkieli",
            natif: "Äidinkieli",
          },
        },
        autres: {
          label: "Muut hyödylliset kielet",
          placeholder: "Esim.: Englanti (B1), Saksa (A2)...",
        },
        languageNames: {
          francais: "Ranska",
          anglais: "Englanti",
          portugais: "Portugali",
          espagnol: "Espanja",
          italien: "Italia",
          autre: "Muu",
        },
        levels: {
          'non-requis': "Ei vaadittu",
          'A1': "A1 - Aloittelija",
          'A2': "A2 - Perustaso",
          'B1': "B1 - Keskitaso",
          'B2': "B2 - Ylempi keskitaso",
          'C1': "C1 - Itsenäinen",
          'C2': "C2 - Äidinkieli",
        },
      },
      permis: {
        title: "Ajokortti",
        requis: {
          label: "Vaadittu ajokortti",
          options: {
            aucun: "Ajokorttia ei vaadita",
            b: "Ajokortti luokka B (henkilöauto)",
            c: "Ajokortti luokka C (kuorma-auto)",
            ce: "Ajokortti luokka CE (kuorma-auto + perävaunu)",
            d: "Ajokortti luokka D (matkustajien kuljetus)",
          },
        },
        categorie: {
          label: "Ajokortin luokka",
          placeholder: "Esim.: B, C, CE...",
        },
      },
      outillage: {
        title: "Käsityökalut",
        requis: {
          label: "Omat työkalut vaaditaan",
        },
        type: {
          label: "Työkalun tyyppi",
          placeholder: "Esim.: Vasara, vatupassi, mittanauha, hiomakone...",
        },
      },
      epi: {
        title: "Henkilönsuojaimet (HSV)",
        infoLegale: "ℹ️ Säännösten mukaan työnantajan on toimitettava tehtävän riskeihin sovitetut henkilönsuojaimet.",
        selectionCount: "✓ {count} valittua HSV:tä",
        fournis: {
          label: "HSV:t toimittaa yritys",
          helper: "Kypärä, turvakengät, käsineet jne.",
          options: {
            oui: "Kyllä, asiakas toimittaa",
            non: "Ei, työntekijä maksaa",
          },
        },
        liste: {
          label: "Vaadittujen HSV:iden luettelo",
          placeholder: "Esim.: Kypärä, S3-kengät, viiltosuojakäsineet, turvavaljaat...",
        },
        items: {
          casque: "Suojakypärä",
          lunettes: "Suojalasit",
          protections_auditives: "Kuulosuojaimet",
          gants: "Suojakäsineet",
          chaussures: "Turvakengät",
          harnais: "Turvavaljaat",
          vetements: "Työvaatteet",
          masque: "Hengityssuojain",
          protection_faciale: "Kasvosuojus",
          vetements_visibilite: "Korkean näkyvyyden vaatteet",
        },
      },
      autresExigences: {
        title: "Muut vaatimukset",
        label: "Muut erityisvaatimukset",
        placeholder: "Esim.: Sähköasentajan luvat, CACES, saatavuus viikonloppuisin, korkealla työskentely...",
      },
    },
  },

  // === YHTEENVETO ===
  recapitulatif: {
    title: "Pyyntösi yhteenveto",
    subtitle: "Tarkista tiedot ennen tarjouspyynnön lähettämistä.",
    acceptConditionsError: "Hyväksy ehdot ennen jatkamista",
    entreprise: {
      title: "Yritys",
      raisonSociale: "Yrityksen nimi",
      siret: "SIRET",
      pays: "Maa",
      ville: "Kaupunki",
      region: "Alue/Maakunta",
    },
    contact: {
      title: "Yhteyshenkilö",
      nomPrenom: "Nimi",
      email: "Sähköposti",
      telephone: "Puhelin",
      fonction: "Tehtävänimike",
    },
    postes: {
      title: "Vaaditut tehtävät",
      coeffETT: "📊 Sovellettu välitystoimiston kerroin",
      coeffBase: "Peruskerroin",
      facteurPays: "Maakohtainen tekijä",
      supplementsHoraires: "✨ Tuntikohtaiset lisät (sisältyvät hintaan)",
      hebergement: "✓ Majoitus",
      transport: "✓ Paikallisliikenne",
      panierRepas: "🍽️ Päiväraha ruokailuun (veloitetaan päivittäin)",
      baseHoraire: "📅 Tuntimäärä: {heures} tuntia/kk (ylityöt määritelty)",
      heuresNormales: "Normaalit tunnit (0-35 tuntia/viikko)",
      heuresSup25: "Ylityöt +25% (36.-43. tunti)",
      heuresSup50: "Ylityöt +50% (44.+ tunti)",
      sousTotal: "Työn välisumma (per henkilö)",
      tauxHoraireBrut: "Bruttotuntipalkka",
      tauxETTFinal: "Lopullinen välitystoimiston hinta",
      coutMensuel: "Kokonaiskustannukset kuukaudessa",
    },
    conditions: {
      title: "Työpaikkojen ehdot",
      dateDebut: "Aloituspäivä",
      dateFin: "Päättymispäivä",
      dureeEstimee: "Arvioitu kesto",
      lieuMission: "Työpaikan sijainti",
      mois: "kuukautta",
    },
    totaux: {
      mensuelHT: "Yhteensä kuukaudessa alv 0%",
      mensuelTTC: "Yhteensä kuukaudessa sis. alv",
      totalMission: "Työpaikkojen kokonaiskustannukset",
    },
    noteLegale: "ℹ️ Tämä arvio on ohjeellinen. Lopullinen hinta vahvistetaan tiimimme ja valitun yhteistyövälitystoimiston hyväksynnän jälkeen.",
    acceptConditions: {
      text: "Hyväksyn, että tietojani käsitellään",
      lien: "tietosuojakäytännön mukaisesti",
    },
    boutonEnvoi: {
      texte: "Lähetä tarjouspyyntöni",
      enCours: "Lähetetään...",
    },
    footer: "✓ Vastaus 24 tunnin kuluessa • ✓ Ei sitoumuksia",
  },

  // === VIRHEET ===
  errors: {
    required: "Tämä kenttä on pakollinen",
    invalidEmail: "Virheellinen sähköpostiosoite",
    invalidSIRET: "Virheellinen SIRET (vaaditaan 14 numeroa)",
    invalidPhone: "Virheellinen puhelinnumero",
    minValue: "Arvon on oltava vähintään {min}",
    maxValue: "Arvon on oltava enintään {max}",
    genericError: "Tapahtui virhe. Yritä uudelleen.",
    loadingError: "Virhe tietojen latauksessa",
    submitError: "Virhe pyynnön lähetyksessä",
  },

  // === TOIMIALAT & AMMATIT ===
  secteurs: {
    batiment: {
      label: "Rakentaminen",
      convention: "Kansallinen työehtosopimus rakennustyöntekijät (3193)",
      postes: {
        macon: "Muurari",
        coffreur: "Muottimies",
        ferrailleur: "Raudoittaja",
        carreleur: "Laatoittaja",
        platrier: "Rappari",
        peintre: "Maalari",
        plombier: "Putkiasentaja",
        electricien: "Sähköasentaja",
        couvreur: "Kattoasentaja",
        menuisier: "Kirvesmies",
        chef_equipe_batiment: "Työryhmän johtaja",
        chef_chantier: "Työmaan johtaja",
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
      convention: "Työehtosopimus metallurgia (3109)",
      postes: {
        soudeur: "Hitsaaja",
        chaudronnier: "Levyseppä",
        tuyauteur: "Putkiasentaja",
        tourneur: "Sorvari",
        fraiseur: "Jyrsin",
        usineur: "CNC-koneistaja",
        mecanicien_industriel: "Teollisuusmekaanikko",
        monteur: "Kokoonpanija",
        controleur_qualite: "Laatutarkastaja",
        ajusteur: "Säätäjä",
        chef_equipe_metallurgie: "Työryhmän johtaja",
      },
      classifications: {
        niveau_1: "Taso I",
        niveau_2: "Taso II",
        niveau_3: "Taso III",
        niveau_4: "Taso IV",
        niveau_5: "Taso V",
      },
    },
    tp: {
      label: "Julkiset työt",
      convention: "Kansallinen työehtosopimus julkiset työt (3005)",
      postes: {
        conducteur_engins: "Konekäyttäjä",
        terrassier: "Maanrakennustyöntekijä",
        canalisateur: "Viemärityöntekijä",
        constructeur_routes: "Tienrakentaja",
        coffreur_bancheur: "Muottimies",
        macon_vrd: "Muurari julkiset työt",
        chef_equipe_tp: "Työryhmän johtaja JT",
        manoeuvre_tp: "Apumies JT",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotellitoiminta",
      convention: "Työehtosopimus hotellit-ravintolat (3292)",
      postes: {
        receptionniste: "Vastaanottovirkailija",
        femme_chambre: "Kerroshoitaja",
        agent_entretien: "Huoltomies",
        bagagiste: "Kantoapulainen",
        concierge: "Ovimies",
        night_audit: "Yövuoron tarkastaja",
        gouvernante: "Emäntä",
        chef_reception: "Vastaanottojohtaja",
      },
      classifications: {
        niveau_1: "Taso I",
        niveau_2: "Taso II",
        niveau_3: "Taso III",
        niveau_4: "Taso IV",
        niveau_5: "Taso V",
      },
    },
    restauration: {
      label: "Ravintola-ala",
      convention: "Työehtosopimus hotellit-ravintolat (3292)",
      postes: {
        cuisinier: "Kokki",
        commis_cuisine: "Keittiöapulainen",
        chef_partie: "Chef de partie",
        serveur: "Tarjoilija",
        barman: "Baarimestari",
        plongeur: "Tiskari",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Pääkokki",
      },
      classifications: {
        niveau_1: "Taso I",
        niveau_2: "Taso II",
        niveau_3: "Taso III",
        niveau_4: "Taso IV",
        niveau_5: "Taso V",
      },
    },
    plasturgie: {
      label: "Muoviteollisuus",
      convention: "Työehtosopimus muoviteollisuus (0292)",
      postes: {
        operateur_injection: "Ruiskupuristaja",
        operateur_extrusion: "Ekstruusiokoneen käyttäjä",
        regleur: "Säätäjä",
        operateur_thermoformage: "Lämpömuovaaja",
        controleur_qualite_plasturgie: "Laatutarkastaja",
        technicien_maintenance: "Huoltoteknikko",
        chef_equipe_plasturgie: "Työryhmän johtaja",
      },
      classifications: {
        niveau_1: "Taso I",
        niveau_2: "Taso II",
        niveau_3: "Taso III",
        niveau_4: "Taso IV",
      },
    },
    automobile_carrosserie: {
      label: "Autoteollisuus & Korikorjaus",
      convention: "Työehtosopimus autokorjaamo (1090)",
      postes: {
        carrossier: "Korikorjaaja",
        peintre_automobile: "Automaalari",
        mecanicien_auto: "Automekaanikko",
        electricien_auto: "Autosähköasentaja",
        chef_atelier: "Korjaamon johtaja",
        controleur_technique: "Tekninen tarkastaja",
      },
      classifications: {
        niveau_1: "Taso I",
        niveau_2: "Taso II",
        niveau_3: "Taso III",
        niveau_4: "Taso IV",
      },
    },
    sylviculture: {
      label: "Metsätalous",
      convention: "Työehtosopimus maatalous (7501)",
      postes: {
        bucheron: "Metsuri",
        elagueur: "Oksija",
        conducteur_engins_forestiers: "Metsäkoneen kuljettaja",
        chef_equipe_sylviculture: "Työryhmän johtaja metsätalous",
      },
      classifications: {
        niveau_1: "Taso I",
        niveau_2: "Taso II",
        niveau_3: "Taso III",
        niveau_4: "Taso IV",
      },
    },
    cartonnerie: {
      label: "Kartonkiteollisuus",
      convention: "Työehtosopimus jalostava teollisuus (3107)",
      postes: {
        operateur_production: "Tuotantotyöntekijä",
        conducteur_ligne: "Linjatyöntekijä",
        regleur_cartonnerie: "Säätäjä",
        chef_equipe_cartonnerie: "Työryhmän johtaja",
      },
      classifications: {
        niveau_1: "Taso I",
        niveau_2: "Taso II",
        niveau_3: "Taso III",
        niveau_4: "Taso IV",
      },
    },
    autre: {
      label: "Muu",
      convention: "Määriteltävä toimialan mukaan",
      postes: {
        autre_poste: "Muu tehtävä (täsmennä)",
      },
      classifications: {
        a_definir: "Määriteltävä",
      },
    },
  },

  // === EUROOPAN MAAT ===
  pays: {
    france: "Ranska",
    allemagne: "Saksa",
    autriche: "Itävalta",
    belgique: "Belgia",
    bulgarie: "Bulgaria",
    croatie: "Kroatia",
    chypre: "Kypros",
    danemark: "Tanska",
    espagne: "Espanja",
    estonie: "Viro",
    finlande: "Suomi",
    grece: "Kreikka",
    hongrie: "Unkari",
    irlande: "Irlanti",
    italie: "Italia",
    lettonie: "Latvia",
    lituanie: "Liettua",
    luxembourg: "Luxemburg",
    malte: "Malta",
    pays_bas: "Alankomaat",
    pologne: "Puola",
    portugal: "Portugali",
    republique_tcheque: "Tšekki",
    roumanie: "Romania",
    slovaquie: "Slovakia",
    slovenie: "Slovenia",
    suede: "Ruotsi",
  },

  // === TARJOUSYHTEENVETOSIVU (ALLEKIRJOITUS) ===
  pageRecap: {
    header: {
      title: "Tarjouksen yhteenveto",
      exportPDF: "Vie PDF:ksi",
      loading: "Ladataan tarjousta...",
      notFound: "Tarjousta ei löytynyt",
    },
    statut: {
      signe: "Allekirjoitettu",
      nouveau: "Uusi",
    },
    dates: {
      creeLe: "Luotu",
      a: "",
      signeLe: "Allekirjoitettu",
      derniereModification: "Viimeisin muutos:",
    },
    entreprise: {
      title: "Yrityksen tiedot",
      raisonSociale: "Yrityksen nimi",
      siret: "SIRET",
      codeAPE: "APE-koodi",
      tvaIntracommunautaire: "EU:n ALV-tunnus",
      adresse: "Osoite",
      siteInternet: "Verkkosivusto",
    },
    contact: {
      title: "Yhteyshenkilö",
      nomComplet: "Koko nimi",
      fonction: "Tehtävänimike",
      email: "Sähköposti",
      telephonePortable: "Matkapuhelin",
      telephoneFixe: "Kiinteä puhelin",
    },
    postes: {
      title: "Täytettävät tehtävät",
      nationalite: "Kansallisuus",
      salaireBrut: "Bruttopalkka",
      tauxHoraireBrut: "Bruttotuntipalkka",
      coefficientETT: "Välitystoimiston kerroin",
      tauxETT: "Välitystoimiston hinta",
    },
    conditions: {
      title: "Työehdot",
      dateDebut: "Aloituspäivä",
      dateFin: "Päättymispäivä",
      periodeEssai: "Koeaika",
      baseHoraire: "Tuntimäärä",
      heuresMois: "tuntia/kk",
      lieuxMission: "Työpaikkojen sijainnit",
      motifRecours: "Vuokratyön syy",
    },
    exigences: {
      title: "Hakijoiden vaatimukset",
      experience: "Kokemus",
      competences: "Taidot",
      langues: "Kielet",
      permis: "Ajokortit",
      epi: "HSV",
    },
    calculs: {
      title: "Hintojen laskenta",
      salaireBrut: "Bruttopalkka",
      coefficientETT: "Välitystoimiston kerroin",
      tauxHoraireBrut: "Bruttotuntipalkka",
      tauxETT: "Välitystoimiston hinta",
      baseHoraire: "Tuntimäärä",
      coutMensuel: "Kuukausikustannus",
      duree: "Kesto",
      coutTotal: "Kokonaiskustannus",
    },
    signature: {
      title: "Sähköinen allekirjoitus",
      intro: "Vahvistan lukeneeni ja hyväksyväni tämän tarjouksen ehdot.",
      nomComplet: {
        label: "Koko nimi",
        placeholder: "Mikko Virtanen",
      },
      email: {
        label: "Vahvistussähköposti",
        placeholder: "mikko.virtanen@yritys.fi",
      },
      checkbox: "Hyväksyn yleiset ehdot",
      boutonSigner: "Allekirjoita sähköisesti",
      enCours: "Allekirjoitetaan...",
      succes: "✓ Tarjous allekirjoitettu onnistuneesti!",
      erreur: "Virhe allekirjoituksessa. Yritä uudelleen.",
    },
    actions: {
      modifier: "Muokkaa tarjousta",
      telecharger: "Lataa PDF",
      partager: "Jaa",
    },
  },
};
