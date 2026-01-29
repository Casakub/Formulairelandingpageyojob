/**
 * 🇱🇹 LIETUVIŲ VERTIMAS - PASIŪLYMO UŽKLAUSOS FORMA
 * 
 * Pilnas lietuvių vertimas pasiūlymo užklausos formai
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const lt: DevisTranslations = {
  // === BENDRI ===
  common: {
    next: "Toliau",
    previous: "Atgal",
    submit: "Siųsti",
    required: "*",
    optional: "(neprivaloma)",
    loading: "Kraunama...",
    error: "Klaida",
    success: "Sėkmingai",
    cancel: "Atšaukti",
    save: "Išsaugoti",
    edit: "Redaguoti",
    delete: "Ištrinti",
    confirm: "Patvirtinti",
    euro: "€",
    perHour: "/val.",
    perMonth: "/mėn.",
    perDay: "/d.",
    persons: "asmenų",
    hours: "valandų",
    days: "dienų",
    months: "mėnesių",
    year: "metų",
  },

  // === NAVIGACIJA ===
  navigation: {
    back: "Atgal",
    stepOf: "Žingsnis {step} iš {total}",
    steps: {
      entreprise: {
        title: "Įmonė",
        badge: "🏢 Jūsų įmonė",
      },
      contact: {
        title: "Kontaktas",
        badge: "👤 Jūsų kontaktinis asmuo",
      },
      besoins: {
        title: "Poreikiai",
        badge: "💼 Jūsų poreikiai",
      },
      conditions: {
        title: "Sąlygos",
        badge: "📋 Sąlygos",
      },
      candidats: {
        title: "Kandidatai",
        badge: "👷 Ieškomas profilis",
      },
      recapitulatif: {
        title: "Santrauka",
        badge: "✅ Santrauka",
      },
    },
  },

  // === VALIDACIJA ===
  validation: {
    fillRequired: "Prašome užpildyti visus privalomus laukus",
    selectRegion: "Prašome pasirinkti regioną",
    addAtLeastOnePosition: "Prašome pridėti bent vieną pareigas",
    invalidEmail: "Prašome įvesti tinkamą el. pašto adresą",
    invalidPhone: "Prašome įvesti tinkamą telefono numerį",
    invalidSIRET: "Prašome įvesti tinkamą SIRET numerį (14 skaitmenų)",
    dateRequired: "Prašome įvesti pradžios datą",
    missionLocationRequired: "Prašome įvesti misijos vietą",
  },

  // === PRANEŠIMAI ===
  messages: {
    success: {
      quoteSent: "Pasiūlymo užklausa sėkmingai išsiųsta!",
      redirecting: "Nukreipiama...",
    },
    error: {
      submitError: "Klaida siunčiant pasiūlymo užklausą",
      genericError: "Įvyko klaida",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Pasiūlymo užklausa | YOJOB",
    pageDescription: "Užsakykite pasiūlymą savo Europos laikino įdarbinimo poreikiams.",
  },

  // === ŽINGSNIS 1: ĮMONĖ ===
  step1: {
    title: "Įmonės informacija",
    subtitle: "Įveskite savo kliento įmonės juridinius duomenis.",
    fields: {
      pays: {
        label: "Šalis",
        placeholder: "Pasirinkite šalį",
      },
      raisonSociale: {
        label: "Įmonės pavadinimas",
        placeholder: "Pvz.: YOJOB UAB",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 skaitmenų",
        helper: "Jūsų įstaigos identifikavimo kodas",
      },
      codeAPE: {
        label: "APE/NAF kodas",
        placeholder: "Pvz.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Bendrijos vidaus PVM",
        placeholder: "Pvz.: LT123456789",
      },
      adresse: {
        label: "Pilnas adresas",
        placeholder: "Namo numeris ir gatvės pavadinimas",
      },
      codePostal: {
        label: "Pašto kodas",
        placeholder: "Pvz.: 01001",
      },
      ville: {
        label: "Miestas",
        placeholder: "Pvz.: Vilnius",
      },
      region: {
        label: "Regionas/Apskritis",
        placeholder: "Pasirinkite regioną",
        placeholderOtherCountry: "Pvz.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Interneto svetainė",
        placeholder: "https://www.pavyzdys.lt",
      },
    },
    infoMessage: "✓ Šie duomenys bus naudojami jūsų asmeniniam pasiūlymui parengti",
  },

  // === ŽINGSNIS 2: KONTAKTAS ===
  step2: {
    title: "Kontaktinis asmuo",
    subtitle: "Kas bus pagrindinis šio projekto kontaktinis asmuo?",
    fields: {
      civilite: {
        label: "Kreipinys",
        options: {
          m: "Ponas",
          mme: "Ponia",
        },
      },
      nom: {
        label: "Pavardė",
        placeholder: "Pvz.: Kazlauskas",
      },
      prenom: {
        label: "Vardas",
        placeholder: "Pvz.: Jonas",
      },
      fonction: {
        label: "Pareigos",
        placeholder: "Pvz.: Personalo vadovas",
      },
      email: {
        label: "Verslo el. paštas",
        placeholder: "jonas.kazlauskas@imone.lt",
      },
      telephone: {
        label: "Telefonas",
        placeholder: "+370 612 34567",
      },
    },
  },

  // === ŽINGSNIS 3: POREIKIAI ===
  step3: {
    title: "Jūsų įdarbinimo poreikiai",
    subtitle: "Apibūdinkite ieškomus profilius ir jų sąlygas.",
    profileLabel: "Profilis",
    addProfile: "Pridėti papildomą profilį",
    removeProfile: "Pašalinti šį profilį",
    loadingConfig: "Kraunama konfigūracija...",
    missingRegionWarning: "⚠️ Prašome pasirinkti savo regioną 1 žingsnyje automatiniam atlyginimų rodymui.",
    fields: {
      secteur: {
        label: "Veiklos sritis",
        placeholder: "Pasirinkite veiklos sritį",
      },
      convention: {
        label: "Kolektyvinė sutartis",
        placeholder: "Automatiškai pagal veiklos sritį",
      },
      poste: {
        label: "Ieškomas pareigos",
        placeholder: "Pasirinkite pareigas",
      },
      classification: {
        label: "Klasifikacija / Kvalifikacija",
        placeholder: "Pasirinkite klasifikaciją",
      },
      quantite: {
        label: "Asmenų skaičius",
        placeholder: "Pvz.: 5",
        helper: "Kiek asmenų reikia šioms pareigoms?",
      },
      salaireBrut: {
        label: "Bruto mėnesinis atlyginimas",
        placeholder: "Pvz.: 2500",
        helper: "Bruto atlyginimas 151,67 val./mėn. pagrindu",
      },
      nationalite: {
        label: "Darbuotojų pilietybė",
        placeholder: "Pasirinkite šalį",
        helper: "Pilietybė įtakoja agentūros tarifo koeficientą",
      },
    },
    ajouterPoste: "Pridėti naujas pareigas",
    supprimerPoste: "Pašalinti šias pareigas",
    posteNumero: "Pareigos",
    coefficientInfo: {
      title: "💡 Taikomas agentūros koeficientas",
      base: "Bazinis koef.",
      facteurPays: "Šalies veiksnys",
      final: "Galutinis koeficientas",
    },
    summary: {
      title: "Darbuotojo atlyginimas",
      salaireBrutMensuel: "Bruto mėnesinis atlyginimas",
      tauxHoraireBrut: "Bruto valandinis tarifas",
      baseMensuelle: "(Bazė 151,67 val./mėn. pagal kolektyvinę sutartį)",
    },
  },

  // === ŽINGSNIS 4: SĄLYGOS ===
  step4: {
    title: "Darbo sąlygos",
    subtitle: "Patikslinkite įdarbinimo sąlygas ir siūlomas išmokas.",
    dateError: "Pabaigos data turi būti po pradžios datos",
    fields: {
      dateDebut: {
        label: "Reikalinga pradžios data",
        placeholder: "DD/MM/MMMM",
      },
      dateFin: {
        label: "Numatomą pabaigos data",
        placeholder: "DD/MM/MMMM",
        helper: "Palikite tuščią neribotam laikui",
      },
      baseHoraire: {
        label: "Mėnesinis valandų bazė",
        placeholder: "Pvz.: 151,67",
        helper: "Teisinis pagrindas Prancūzijoje: 151,67 val./mėn. (35 val./savaitę)",
      },
      lieuxMission: {
        label: "Misijos vietos",
        placeholder: "Pvz.: Vilniaus centras, Kauno zona 3, Klaipėda...",
      },
      periodeEssai: {
        label: "Bandomasis laikotarpis",
        placeholder: "Pasirinkite trukmę",
        options: {
          '2': '2 dienos',
          '3': '3 dienos',
          '5': '5 dienos',
          '15': '15 dienų',
        },
      },
      motifRecours: {
        label: "Laikino įdarbinimo priežastis",
        placeholder: "Pasirinkite priežastį",
        options: {
          accroissement: "Laikinas veiklos padidėjimas",
          remplacement: "Nebuvusio darbuotojo pakeitimas",
          saisonnier: "Sezoninis darbas",
          exportation: "Nepaprastas eksporto užsakymas",
          autre: "Kita (patikslinkite)",
        },
      },
      delaiPaiement: {
        label: "Reikalaujamas mokėjimo terminas",
        placeholder: "Pasirinkite terminą",
        options: {
          reception: "Apmokėjimas gavus",
          j30: "30 dienų",
          j45: "45 dienos",
          j60: "60 dienų",
        },
      },
    },
    hebergement: {
      title: "Apgyvendinimas",
      chargeEU: {
        label: "Apgyvendinimas užtikrintas kliento įmonės",
        helper: "Jei NE: agentūra taikys papildomą mokestį +3,50 €/val.",
      },
      supplementWarning: "⚠️ Bus taikomas papildomas mokestis +3,50 €/val., nes apgyvendinimas neužtikrintas",
      commentaire: {
        label: "Apgyvendinimo detalės",
        placeholder: "Apgyvendinimo tipas, adresas, specialios sąlygos...",
      },
    },
    transport: {
      title: "Vietinis transportas",
      chargeETT: {
        label: "Vietinis transportas užtikrintas agentūros",
        helper: "Jei TAIP: bus taikomas papildomas mokestis +1,50 €/val.",
      },
      supplementInfo: "✓ Bus taikomas papildomas mokestis +1,50 €/val. vietinio transporto išlaidoms padengti",
    },
    repas: {
      title: "Maitinimas",
      options: {
        restaurant: "Įmonės valgykla / Maisto talonai",
        panier: "Dienpinigiai maistui (apmokestinama kasdien)",
        nonConcerne: "Netaikoma",
      },
      montantInfo: "📋 Dienpinigių suma: {montant} / darbo diena (apmokestinama atskirai)",
      montantNonDefini: "⚠️ Suma neapibrėžta šiai šaliai/regionui",
    },
    sections: {
      hebergement: {
        title: "Apgyvendinimas",
        chargeEU: {
          label: "Apgyvendinimas užtikrintas kliento įmonės",
          helper: "Jei NE: agentūra taikys papildomą mokestį +3,50 €/val.",
          options: {
            oui: "Taip, užtikrinta kliento",
            non: "Ne, moka darbuotojas",
          },
        },
        detailsEU: {
          type: {
            label: "Apgyvendinimo tipas",
            options: {
              hotel: "Viešbutis",
              appartement: "Butas",
              foyer: "Darbininkų namai",
              autre: "Kita",
            },
          },
          adresse: {
            label: "Apgyvendinimo adresas",
            placeholder: "Pilnas apgyvendinimo adresas",
          },
        },
      },
      transportInternational: {
        title: "Tarptautinis transportas (kilmės šalis ↔ Prancūzija)",
        chargeEU: {
          label: "Transportas užtikrintas kliento įmonės",
          helper: "Kelionės tarp kilmės šalies ir misijos vietos",
          options: {
            oui: "Taip, užtikrinta kliento",
            non: "Ne, moka darbuotojas",
          },
        },
        detailsEU: {
          type: {
            label: "Transporto tipas",
            options: {
              avion: "Lėktuvas",
              train: "Traukinys",
              bus: "Autobusas",
              covoiturage: "Organizuotas bendras važiavimas",
            },
          },
          frequence: {
            label: "Kelionių dažnumas",
            options: {
              allerRetour: "Tik pradinis atvykimas ir išvykimas",
              hebdomadaire: "Kas savaitę",
              mensuel: "Kas mėnesį",
            },
          },
        },
      },
      transportLocal: {
        title: "Vietinis transportas",
        chargeETT: {
          label: "Vietinis transportas užtikrintas agentūros",
          helper: "Jei TAIP: bus taikomas papildomas mokestis +1,50 €/val.",
          options: {
            oui: "Taip, užtikrinta agentūros",
            non: "Ne, moka darbuotojas",
          },
        },
        detailsETT: {
          type: {
            label: "Transporto tipas",
            options: {
              vehicule: "Tarnybinis automobilis",
              transport: "Viešasis transportas",
              velo: "Dviratis",
            },
          },
        },
      },
      repas: {
        title: "Maitinimas",
        type: {
          label: "Maitinimo tipas",
          options: {
            restaurant: "Įmonės valgykla / Maisto talonai",
            panier: "Dienpinigiai maistui (apmokestinama kasdien)",
            nonConcerne: "Netaikoma",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Dienos biudžetas",
            placeholder: "Suma €",
          },
        },
        detailsPanier: {
          info: "Dienpinigiai maistui bus apmokestinami atskirai už kiekvieną darbo dieną",
        },
      },
    },
  },

  // === ŽINGSNIS 5: KANDIDATAI ===
  step5: {
    title: "Kandidatų profilis",
    subtitle: "Nustatykite kompetencijas ir konkrečius reikalavimus.",
    sections: {
      experience: {
        title: "Darbo patirtis",
        obligatoire: {
          label: "Privaloma patirtis",
        },
        annees: {
          label: "Minimalus patirties metų skaičius",
          placeholder: "Pvz.: 3",
          options: {
            '0-1': "Pradedantysis (0-1 metai)",
            '1-3': "Vidutinis (1-3 metai)",
            '3-5': "Patvirtintas (3-5 metai)",
            '5+': "Ekspertas (5 metai ir daugiau)",
          },
        },
        competences: {
          label: "Reikalaujamos techninės kompetencijos",
          placeholder: "Pvz.: Mūro darbai, klojimas, brėžinių skaitymas, TIG suvirinimas...",
        },
      },
      formation: {
        title: "Išsilavinimas",
        obligatoire: {
          label: "Privalomas išsilavinimas",
        },
        type: {
          label: "Išsilavinimo tipas",
          placeholder: "Pvz.: Kvalifikuotas mūrininkas, CACES R489...",
        },
      },
      travailRisque: {
        title: "Pavojingas darbas",
        active: {
          label: "Specifinis pavojingas darbas",
        },
        precisions: {
          label: "Rizikų patikslinimai",
          placeholder: "Pvz.: Darbas aukštyje, darbas su sunkiomis kroviniais...",
        },
      },
      langues: {
        title: "Kalbų įgūdžiai",
        francais: {
          label: "Reikalaujamas prancūzų kalbos lygis",
          placeholder: "Pasirinkite lygį",
          options: {
            a1: "A1 - Pradedantysis",
            a2: "A2 - Bazinis",
            b1: "B1 - Vidutinis",
            b2: "B2 - Aukštesnis vidutinis",
            c1: "C1 - Pažengęs",
            c2: "C2 - Gimtakalbis",
            natif: "Gimtakalbis",
          },
        },
        autres: {
          label: "Kitos naudingos kalbos",
          placeholder: "Pvz.: Anglų kalba (B1), Vokiečių kalba (A2)...",
        },
        languageNames: {
          francais: "Prancūzų kalba",
          anglais: "Anglų kalba",
          portugais: "Portugalų kalba",
          espagnol: "Ispanų kalba",
          italien: "Italų kalba",
          autre: "Kita",
        },
        levels: {
          'non-requis': "Nereikalaujama",
          'A1': "A1 - Pradedantysis",
          'A2': "A2 - Bazinis",
          'B1': "B1 - Vidutinis",
          'B2': "B2 - Aukštesnis vidutinis",
          'C1': "C1 - Savarankiškas",
          'C2': "C2 - Gimtakalbis",
        },
      },
      permis: {
        title: "Vairuotojo pažymėjimas",
        requis: {
          label: "Reikalaujamas vairuotojo pažymėjimas",
          options: {
            aucun: "Vairuotojo pažymėjimas nereikalingas",
            b: "Vairuotojo pažymėjimas kat. B (lengvasis automobilis)",
            c: "Vairuotojo pažymėjimas kat. C (sunkvežimis)",
            ce: "Vairuotojo pažymėjimas kat. CE (sunkvežimis + priekaba)",
            d: "Vairuotojo pažymėjimas kat. D (keleivių vežimas)",
          },
        },
        categorie: {
          label: "Vairuotojo pažymėjimo kategorija",
          placeholder: "Pvz.: B, C, CE...",
        },
      },
      outillage: {
        title: "Rankiniai įrankiai",
        requis: {
          label: "Reikalaujami savi įrankiai",
        },
        type: {
          label: "Įrankio tipas",
          placeholder: "Pvz.: Plaktukas, gulsčiukas, matavimo juosta, šlifuoklis...",
        },
      },
      epi: {
        title: "Asmeninės apsaugos priemonės (AAP)",
        infoLegale: "ℹ️ Pagal taisykles darbdavys privalo užtikrinti AAP, pritaikytas pareigų rizikai.",
        selectionCount: "✓ {count} pasirinktos AAP",
        fournis: {
          label: "AAP užtikrintos įmonės",
          helper: "Šalmas, apsauginiai batai, pirštinės ir kt.",
          options: {
            oui: "Taip, užtikrinta kliento",
            non: "Ne, moka darbuotojas",
          },
        },
        liste: {
          label: "Reikalingų AAP sąrašas",
          placeholder: "Pvz.: Šalmas, batai S3, pjovimui atsparūs pirštinės, saugos diržas...",
        },
        items: {
          casque: "Apsauginis šalmas",
          lunettes: "Apsauginiai akiniai",
          protections_auditives: "Klausos apsauga",
          gants: "Apsauginės pirštinės",
          chaussures: "Apsauginiai batai",
          harnais: "Saugos diržas",
          vetements: "Darbo drabužiai",
          masque: "Respiratorius",
          protection_faciale: "Veido apsauga",
          vetements_visibilite: "Didelio matomumo drabužiai",
        },
      },
      autresExigences: {
        title: "Kiti reikalavimai",
        label: "Kiti specifiniai reikalavimai",
        placeholder: "Pvz.: Elektros leidimai, CACES, galimybė savaitgaliais, darbas aukštyje...",
      },
    },
  },

  // === SANTRAUKA ===
  recapitulatif: {
    title: "Jūsų užklausos santrauka",
    subtitle: "Patikrinkite duomenis prieš siunčiant pasiūlymo užklausą.",
    acceptConditionsError: "Prašome sutikti su sąlygomis prieš tęsiant",
    entreprise: {
      title: "Įmonė",
      raisonSociale: "Įmonės pavadinimas",
      siret: "SIRET",
      pays: "Šalis",
      ville: "Miestas",
      region: "Regionas/Apskritis",
    },
    contact: {
      title: "Kontaktas",
      nomPrenom: "Vardas ir pavardė",
      email: "El. paštas",
      telephone: "Telefonas",
      fonction: "Pareigos",
    },
    postes: {
      title: "Reikalaujamos pareigos",
      coeffETT: "📊 Taikomas agentūros koeficientas",
      coeffBase: "Bazinis koef.",
      facteurPays: "Šalies veiksnys",
      supplementsHoraires: "✨ Valandiniai priedai (įskaičiuoti į tarifą)",
      hebergement: "✓ Apgyvendinimas",
      transport: "✓ Vietinis transportas",
      panierRepas: "🍽️ Dienpinigiai maistui (apmokestinama kasdien)",
      baseHoraire: "📅 Valandų bazė: {heures} val./mėn. (nustatytos viršvalandžiai)",
      heuresNormales: "Įprastos valandos (0-35 val./savaitę)",
      heuresSup25: "Viršvalandžiai +25% (36-43 val.)",
      heuresSup50: "Viršvalandžiai +50% (44+ val.)",
      sousTotal: "Darbo tarpinė suma (vienam asmeniui)",
      tauxHoraireBrut: "Bruto valandinis tarifas",
      tauxETTFinal: "Galutinis agentūros tarifas",
      coutMensuel: "Bendros mėnesinės išlaidos",
    },
    conditions: {
      title: "Misijos sąlygos",
      dateDebut: "Pradžios data",
      dateFin: "Pabaigos data",
      dureeEstimee: "Numatoma trukmė",
      lieuMission: "Misijos vieta",
      mois: "mėn.",
    },
    majorations: {
      title: "Misijos tarifinės pataisos",
      total: "Iš viso pataisų",
      notSet: "Nėra nustatytų pataisų",
    },
    totaux: {
      mensuelHT: "Viso per mėnesį be PVM",
      mensuelTTC: "Viso per mėnesį su PVM",
      totalMission: "Bendros misijos išlaidos",
    },
    noteLegale: "ℹ️ Šis įvertinimas yra informatyvus. Galutinis tarifas bus patvirtintas po mūsų komandos ir pasirinktos partnerinės agentūros patvirtinimo.",
    acceptConditions: {
      text: "Sutinku, kad mano duomenys būtų tvarkomi pagal",
      lien: "privatumo politiką",
    },
    boutonEnvoi: {
      texte: "Siųsti mano pasiūlymo užklausą",
      enCours: "Siunčiama...",
    },
    footer: "✓ Atsakymas per 24 darbo valandas • ✓ Be įsipareigojimų",
  },

  // === KLAIDOS ===
  errors: {
    required: "Šis laukas yra privalomas",
    invalidEmail: "Netinkamas el. pašto adresas",
    invalidSIRET: "Netinkamas SIRET (reikia 14 skaitmenų)",
    invalidPhone: "Netinkamas telefono numeris",
    minValue: "Reikšmė turi būti didesnė arba lygi {min}",
    maxValue: "Reikšmė turi būti mažesnė arba lygi {max}",
    genericError: "Įvyko klaida. Prašome bandyti dar kartą.",
    loadingError: "Klaida įkeliant duomenis",
    submitError: "Klaida siunčiant užklausą",
  },

  // === VEIKLOS SRITYS & PROFESIJOS ===
  secteurs: {
    batiment: {
      label: "Statyba",
      convention: "Nacionalinė kolektyvinė sutartis statybos darbininkai (3193)",
      postes: {
        macon: "Mūrininkas",
        coffreur: "Klojimo dailidė",
        ferrailleur: "Armatūrininkas",
        carreleur: "Plytelių klojėjas",
        platrier: "Tinkorius",
        peintre: "Dažytojas",
        plombier: "Santechnikas",
        electricien: "Elektrikas",
        couvreur: "Stogų dengėjas",
        menuisier: "Dailidė",
        chef_equipe_batiment: "Komandos vadovas",
        chef_chantier: "Statybos vadovas",
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
      label: "Metalurgija",
      convention: "Kolektyvinė sutartis metalurgija (3109)",
      postes: {
        soudeur: "Suvirintojas",
        chaudronnier: "Katilų meistras",
        tuyauteur: "Vamzdynų montuotojas",
        tourneur: "Tekintojas",
        fraiseur: "Frezuotojas",
        usineur: "CNC operatorius",
        mecanicien_industriel: "Pramoninis mechanikas",
        monteur: "Montuotojas",
        controleur_qualite: "Kokybės kontrolierius",
        ajusteur: "Mechanikas",
        chef_equipe_metallurgie: "Komandos vadovas",
      },
      classifications: {
        niveau_1: "Lygis I",
        niveau_2: "Lygis II",
        niveau_3: "Lygis III",
        niveau_4: "Lygis IV",
        niveau_5: "Lygis V",
      },
    },
    tp: {
      label: "Viešieji darbai",
      convention: "Nacionalinė kolektyvinė sutartis viešieji darbai (3005)",
      postes: {
        conducteur_engins: "Mašinų operatorius",
        terrassier: "Žemės darbų darbininkas",
        canalisateur: "Kanalizacijos darbininkas",
        constructeur_routes: "Kelių statytojas",
        coffreur_bancheur: "Klojimo dailidė",
        macon_vrd: "Mūrininkas viešieji darbai",
        chef_equipe_tp: "Komandos vadovas VD",
        manoeuvre_tp: "Padėjėjas VD",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Viešbučių verslas",
      convention: "Kolektyvinė sutartis viešbučiai-restoranai (3292)",
      postes: {
        receptionniste: "Registratorius",
        femme_chambre: "Kambario tvarkytojas",
        agent_entretien: "Priežiūros darbuotojas",
        bagagiste: "Bagažo nešikas",
        concierge: "Sargas",
        night_audit: "Naktinis auditorius",
        gouvernante: "Viršininkė",
        chef_reception: "Registratūros vadovas",
      },
      classifications: {
        niveau_1: "Lygis I",
        niveau_2: "Lygis II",
        niveau_3: "Lygis III",
        niveau_4: "Lygis IV",
        niveau_5: "Lygis V",
      },
    },
    restauration: {
      label: "Viešasis maitinimas",
      convention: "Kolektyvinė sutartis viešbučiai-restoranai (3292)",
      postes: {
        cuisinier: "Virėjas",
        commis_cuisine: "Padėjėjas virtuvėje",
        chef_partie: "Chef de partie",
        serveur: "Padavėjas",
        barman: "Barmenas",
        plongeur: "Indų plovėjas",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Vyriausiasis virėjas",
      },
      classifications: {
        niveau_1: "Lygis I",
        niveau_2: "Lygis II",
        niveau_3: "Lygis III",
        niveau_4: "Lygis IV",
        niveau_5: "Lygis V",
      },
    },
    plasturgie: {
      label: "Plastiko pramonė",
      convention: "Kolektyvinė sutartis plastiko pramonė (0292)",
      postes: {
        operateur_injection: "Įpurškimo operatorius",
        operateur_extrusion: "Ekstruzijos operatorius",
        regleur: "Nustatytojas",
        operateur_thermoformage: "Termoformavimo operatorius",
        controleur_qualite_plasturgie: "Kokybės kontrolierius",
        technicien_maintenance: "Priežiūros technikas",
        chef_equipe_plasturgie: "Komandos vadovas",
      },
      classifications: {
        niveau_1: "Lygis I",
        niveau_2: "Lygis II",
        niveau_3: "Lygis III",
        niveau_4: "Lygis IV",
      },
    },
    automobile_carrosserie: {
      label: "Automobilių pramonė ir kėbulų taisymas",
      convention: "Kolektyvinė sutartis automobilių remontas (1090)",
      postes: {
        carrossier: "Kėbulų meistras",
        peintre_automobile: "Automobilių dažytojas",
        mecanicien_auto: "Automechanikas",
        electricien_auto: "Autoelektrikas",
        chef_atelier: "Dirbtuvės vadovas",
        controleur_technique: "Techninis kontrolierius",
      },
      classifications: {
        niveau_1: "Lygis I",
        niveau_2: "Lygis II",
        niveau_3: "Lygis III",
        niveau_4: "Lygis IV",
      },
    },
    sylviculture: {
      label: "Miškininkystė",
      convention: "Kolektyvinė sutartis žemės ūkis (7501)",
      postes: {
        bucheron: "Miško kirtėjas",
        elagueur: "Medžių genėtojas",
        conducteur_engins_forestiers: "Miško įrenginių operatorius",
        chef_equipe_sylviculture: "Komandos vadovas miškininkystė",
      },
      classifications: {
        niveau_1: "Lygis I",
        niveau_2: "Lygis II",
        niveau_3: "Lygis III",
        niveau_4: "Lygis IV",
      },
    },
    cartonnerie: {
      label: "Kartono pramonė",
      convention: "Kolektyvinė sutartis perdirbamoji pramonė (3107)",
      postes: {
        operateur_production: "Gamybos operatorius",
        conducteur_ligne: "Linijos operatorius",
        regleur_cartonnerie: "Nustatytojas",
        chef_equipe_cartonnerie: "Komandos vadovas",
      },
      classifications: {
        niveau_1: "Lygis I",
        niveau_2: "Lygis II",
        niveau_3: "Lygis III",
        niveau_4: "Lygis IV",
      },
    },
    autre: {
      label: "Kita",
      convention: "Nustatyti pagal veiklos sritį",
      postes: {
        autre_poste: "Kitos pareigos (patikslinkite)",
      },
      classifications: {
        a_definir: "Nustatyti",
      },
    },
  },

  // === EUROPOS ŠALYS ===
  pays: {
    france: "Prancūzija",
    allemagne: "Vokietija",
    autriche: "Austrija",
    belgique: "Belgija",
    bulgarie: "Bulgarija",
    croatie: "Kroatija",
    chypre: "Kipras",
    danemark: "Danija",
    espagne: "Ispanija",
    estonie: "Estija",
    finlande: "Suomija",
    grece: "Graikija",
    hongrie: "Vengrija",
    irlande: "Airija",
    italie: "Italija",
    lettonie: "Latvija",
    lituanie: "Lietuva",
    luxembourg: "Liuksemburgas",
    malte: "Malta",
    pays_bas: "Nyderlandai",
    pologne: "Lenkija",
    portugal: "Portugalija",
    republique_tcheque: "Čekija",
    roumanie: "Rumunija",
    slovaquie: "Slovakija",
    slovenie: "Slovėnija",
    suede: "Švedija",
  },

  // === PUSLAPIS PASIŪLYMO SANTRAUKA (PARAŠAS) ===
  pageRecap: {
    header: {
      title: "Pasiūlymo santrauka",
      exportPDF: "Eksportuoti į PDF",
      loading: "Kraunamas pasiūlymas...",
      notFound: "Pasiūlymas nerastas",
    },
    statut: {
      signe: "Pasirašyta",
      nouveau: "Naujas",
    },
    dates: {
      creeLe: "Sukurta",
      a: "",
      signeLe: "Pasirašyta",
      derniereModification: "Paskutinis pakeitimas:",
    },
    entreprise: {
      title: "Įmonės informacija",
      raisonSociale: "Įmonės pavadinimas",
      siret: "SIRET",
      codeAPE: "APE kodas",
      tvaIntracommunautaire: "Bendrijos vidaus PVM",
      adresse: "Adresas",
      siteInternet: "Interneto svetainė",
    },
    contact: {
      title: "Kontaktinis asmuo",
      nomComplet: "Pilnas vardas",
      fonction: "Pareigos",
      email: "El. paštas",
      telephonePortable: "Mobilusis telefonas",
      telephoneFixe: "Stacionarusis telefonas",
    },
    postes: {
      title: "Pareigos užpildyti",
      nationalite: "Pilietybė",
      salaireBrut: "Bruto atlyginimas",
      tauxHoraireBrut: "Bruto valandinis tarifas",
      coefficientETT: "Agentūros koeficientas",
      tauxETT: "Agentūros tarifas",
    },
    conditions: {
      title: "Darbo sąlygos",
      dateDebut: "Pradžios data",
      dateFin: "Pabaigos data",
      periodeEssai: "Bandomasis laikotarpis",
      baseHoraire: "Valandų bazė",
      heuresMois: "val./mėn.",
      lieuxMission: "Misijos vietos",
      motifRecours: "Laikino įdarbinimo priežastis",
    },
    exigences: {
      title: "Kandidatų reikalavimai",
      experience: "Patirtis",
      competences: "Kompetencijos",
      langues: "Kalbos",
      permis: "Vairuotojo pažymėjimai",
      epi: "AAP",
    },
    calculs: {
      title: "Tarifų apskaičiavimai",
      salaireBrut: "Bruto atlyginimas",
      coefficientETT: "Agentūros koeficientas",
      tauxHoraireBrut: "Bruto valandinis tarifas",
      tauxETT: "Agentūros tarifas",
      baseHoraire: "Valandų bazė",
      coutMensuel: "Mėnesinės išlaidos",
      duree: "Trukmė",
      coutTotal: "Bendros išlaidos",
    },
    signature: {
      title: "Elektroninis parašas",
      intro: "Patvirtinu, kad perskaičiau ir sutinku su šio pasiūlymo sąlygomis.",
      nomComplet: {
        label: "Pilnas vardas",
        placeholder: "Jonas Kazlauskas",
      },
      email: {
        label: "Patvirtinantis el. paštas",
        placeholder: "jonas.kazlauskas@imone.lt",
      },
      checkbox: "Sutinku su bendrosiomis sąlygomis",
      boutonSigner: "Pasirašyti elektroniškai",
      enCours: "Pasirašoma...",
      succes: "✓ Pasiūlymas sėkmingai pasirašytas!",
      erreur: "Klaida pasirašant. Prašome bandyti dar kartą.",
    },
    actions: {
      modifier: "Redaguoti pasiūlymą",
      telecharger: "Atsisiųsti PDF",
      partager: "Dalintis",
    },
  },
};