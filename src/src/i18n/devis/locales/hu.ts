/**
 * 🇭🇺 MAGYAR FORDÍTÁSOK - ÁRAJÁNLAT KÉRŐ ŰRLAP
 * 
 * Teljes magyar fordítások az árajánlat kérő űrlaphoz
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const hu: DevisTranslations = {
  // === ÁLTALÁNOS ===
  common: {
    next: "Következő",
    previous: "Előző",
    submit: "Küldés",
    required: "*",
    optional: "(opcionális)",
    loading: "Betöltés...",
    error: "Hiba",
    success: "Sikeres",
    cancel: "Mégse",
    save: "Mentés",
    edit: "Szerkesztés",
    delete: "Törlés",
    confirm: "Megerősítés",
    euro: "€",
    perHour: "/óra",
    perMonth: "/hó",
    perDay: "/nap",
    persons: "fő",
    hours: "óra",
    days: "nap",
    months: "hónap",
    year: "év",
  },

  // === NAVIGÁCIÓ ===
  navigation: {
    back: "Vissza",
    stepOf: "{step}. lépés a {total}-ból",
    steps: {
      entreprise: {
        title: "Vállalat",
        badge: "🏢 Az Ön vállalata",
      },
      contact: {
        title: "Kapcsolat",
        badge: "👤 Az Ön kapcsolattartója",
      },
      besoins: {
        title: "Igények",
        badge: "💼 Az Ön igényei",
      },
      conditions: {
        title: "Feltételek",
        badge: "📋 Feltételek",
      },
      candidats: {
        title: "Jelöltek",
        badge: "👷 Keresett profil",
      },
      recapitulatif: {
        title: "Összefoglaló",
        badge: "✅ Összefoglaló",
      },
    },
  },

  // === VALIDÁCIÓ ===
  validation: {
    fillRequired: "Kérjük, töltse ki az összes kötelező mezőt",
    selectRegion: "Kérjük, válasszon régiót",
    addAtLeastOnePosition: "Kérjük, adjon hozzá legalább egy pozíciót",
    invalidEmail: "Kérjük, adjon meg érvényes e-mail címet",
    invalidPhone: "Kérjük, adjon meg érvényes telefonszámot",
    invalidSIRET: "Kérjük, adjon meg érvényes SIRET számot (14 számjegy)",
    dateRequired: "Kérjük, adja meg a kezdési dátumot",
    missionLocationRequired: "Kérjük, adja meg a kiküldetés helyét",
  },

  // === ÜZENETEK ===
  messages: {
    success: {
      quoteSent: "Árajánlat kérés sikeresen elküldve!",
      redirecting: "Átirányítás...",
    },
    error: {
      submitError: "Hiba az árajánlat kérés küldésekor",
      genericError: "Hiba történt",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Árajánlat kérés | YOJOB",
    pageDescription: "Kérjen árajánlatot európai munkaerő-kölcsönzési igényeihez.",
  },

  // === 1. LÉPÉS: VÁLLALAT ===
  step1: {
    title: "Vállalati adatok",
    subtitle: "Adja meg felhasználó vállalata jogi információit.",
    fields: {
      pays: {
        label: "Ország",
        placeholder: "Válasszon országot",
      },
      raisonSociale: {
        label: "Cégnév",
        placeholder: "Pl.: YOJOB Kft.",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 számjegy",
        helper: "Az Ön telephelyének azonosító száma",
      },
      codeAPE: {
        label: "APE/NAF kód",
        placeholder: "Pl.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Közösségi adószám",
        placeholder: "Pl.: HU12345678",
      },
      adresse: {
        label: "Teljes cím",
        placeholder: "Házszám és utca neve",
      },
      codePostal: {
        label: "Irányítószám",
        placeholder: "Pl.: 1011",
      },
      ville: {
        label: "Város",
        placeholder: "Pl.: Budapest",
      },
      region: {
        label: "Régió/Megye",
        placeholder: "Válasszon régiót",
        placeholderOtherCountry: "Pl.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Weboldal",
        placeholder: "https://www.pelda.hu",
      },
    },
    infoMessage: "✓ Ezeket az információkat személyre szabott árajánlata elkészítéséhez használjuk",
  },

  // === 2. LÉPÉS: KAPCSOLATTARTÓ ===
  step2: {
    title: "Kapcsolattartó személy",
    subtitle: "Ki lesz az Ön elsődleges kapcsolattartója ehhez a projekthez?",
    fields: {
      civilite: {
        label: "Megszólítás",
        options: {
          m: "Úr",
          mme: "Asszony",
        },
      },
      nom: {
        label: "Vezetéknév",
        placeholder: "Pl.: Nagy",
      },
      prenom: {
        label: "Keresztnév",
        placeholder: "Pl.: János",
      },
      fonction: {
        label: "Beosztás",
        placeholder: "Pl.: HR menedzser",
      },
      email: {
        label: "Szolgálati e-mail",
        placeholder: "nagy.janos@ceg.hu",
      },
      telephone: {
        label: "Telefonszám",
        placeholder: "+36 20 123 4567",
      },
    },
  },

  // === 3. LÉPÉS: IGÉNYEK ===
  step3: {
    title: "Az Ön toborzási igényei",
    subtitle: "Írja le a keresett profilokat és feltételeiket.",
    profileLabel: "Profil",
    addProfile: "További profil hozzáadása",
    removeProfile: "Profil eltávolítása",
    loadingConfig: "Konfiguráció betöltése...",
    missingRegionWarning: "⚠️ Kérjük, válassza ki régióját az 1. lépésben a bérek automatikus megjelenítéséhez.",
    fields: {
      secteur: {
        label: "Tevékenységi ágazat",
        placeholder: "Válasszon ágazatot",
      },
      convention: {
        label: "Kollektív szerződés",
        placeholder: "Automatikus az ágazat szerint",
      },
      poste: {
        label: "Keresett pozíció",
        placeholder: "Válasszon pozíciót",
      },
      classification: {
        label: "Besorolás / Képesítés",
        placeholder: "Válasszon besorolást",
      },
      quantite: {
        label: "Személyek száma",
        placeholder: "Pl.: 5",
        helper: "Hány fő szükséges ehhez a pozícióhoz?",
      },
      salaireBrut: {
        label: "Bruttó havi bér",
        placeholder: "Pl.: 2500",
        helper: "Bruttó bér 151,67 óra/hó alapján",
      },
      nationalite: {
        label: "Munkavállalók nemzetisége",
        placeholder: "Válasszon országot",
        helper: "A nemzetiség befolyásolja az ügynökségi díjszabási együtthatót",
      },
    },
    ajouterPoste: "Másik pozíció hozzáadása",
    supprimerPoste: "Pozíció eltávolítása",
    posteNumero: "Pozíció",
    coefficientInfo: {
      title: "💡 Alkalmazott ügynökségi együttható",
      base: "Alap együttható",
      facteurPays: "Ország tényező",
      final: "Végső együttható",
    },
    summary: {
      title: "Munkavállaló díjazása",
      salaireBrutMensuel: "Bruttó havi bér",
      tauxHoraireBrut: "Bruttó órabér",
      baseMensuelle: "(151,67 óra/hó alapján a kollektív szerződés szerint)",
    },
  },

  // === 4. LÉPÉS: FELTÉTELEK ===
  step4: {
    title: "Munkafeltételek",
    subtitle: "Határozza meg a foglalkoztatási feltételeket és a felkínált juttatásokat.",
    dateError: "A befejezés dátumának a kezdés dátuma után kell lennie",
    fields: {
      dateDebut: {
        label: "Kívánt kezdési dátum",
        placeholder: "NN/HH/ÉÉÉÉ",
      },
      dateFin: {
        label: "Várható befejezési dátum",
        placeholder: "NN/HH/ÉÉÉÉ",
        helper: "Hagyja üresen, ha határozatlan",
      },
      baseHoraire: {
        label: "Havi óraalap",
        placeholder: "Pl.: 151,67",
        helper: "Franciaországi törvényes alap: 151,67 óra/hó (35 óra/hét)",
      },
      lieuxMission: {
        label: "Kiküldetés helyszínei",
        placeholder: "Pl.: Budapest központ, Győr 3. zóna, Debrecen...",
      },
      periodeEssai: {
        label: "Próbaidő",
        placeholder: "Válasszon időtartamot",
        options: {
          '2': '2 nap',
          '3': '3 nap',
          '5': '5 nap',
          '15': '15 nap',
        },
      },
      motifRecours: {
        label: "Munkaerő-kölcsönzés indoka",
        placeholder: "Válasszon okot",
        options: {
          accroissement: "Tevékenység átmeneti növekedése",
          remplacement: "Távollévő munkavállaló helyettesítése",
          saisonnier: "Szezonális munkák",
          exportation: "Kivételes exportmegrendelés",
          autre: "Egyéb (pontosítandó)",
        },
      },
      delaiPaiement: {
        label: "Kívánt fizetési határidő",
        placeholder: "Válasszon határidőt",
        options: {
          reception: "Fizetés átvételkor",
          j30: "30 nap",
          j45: "45 nap",
          j60: "60 nap",
        },
      },
    },
    hebergement: {
      title: "Szállás",
      chargeEU: {
        label: "A felhasználó vállalat biztosítja a szállást",
        helper: "Ha NEM: +3,50 €/óra pótlékot számláz az ügynökség",
      },
      supplementWarning: "⚠️ +3,50 €/óra pótlék kerül felszámításra, mivel a szállás nincs biztosítva",
      commentaire: {
        label: "Szállás részletei",
        placeholder: "Szállás típusa, cím, különleges feltételek...",
      },
    },
    transport: {
      title: "Helyi Közlekedés",
      chargeETT: {
        label: "Az ügynökség biztosítja a helyi közlekedést",
        helper: "Ha IGEN: +1,50 €/óra pótlék kerül felszámításra",
      },
      supplementInfo: "✓ +1,50 €/óra pótlék kerül felszámításra a helyi közlekedési költségek fedezésére",
    },
    repas: {
      title: "Étkezés",
      options: {
        restaurant: "Vállalati étterem / Étkezési utalványok",
        panier: "Étkezési költségtérítés (naponta számlázva)",
        nonConcerne: "Nem releváns",
      },
      montantInfo: "📋 Étkezési költségtérítés összege: {montant} / ledolgozott nap (külön számlázva)",
      montantNonDefini: "⚠️ Az összeg nincs meghatározva ehhez az országhoz/régióhoz",
    },
    sections: {
      hebergement: {
        title: "Szállás",
        chargeEU: {
          label: "A felhasználó vállalat biztosítja a szállást",
          helper: "Ha NEM: +3,50 €/óra pótlékot számláz az ügynökség",
          options: {
            oui: "Igen, a felhasználó biztosítja",
            non: "Nem, a munkavállaló fizeti",
          },
        },
        detailsEU: {
          type: {
            label: "Szállás típusa",
            options: {
              hotel: "Szálloda",
              appartement: "Lakás",
              foyer: "Kollégium",
              autre: "Egyéb",
            },
          },
          adresse: {
            label: "Szállás címe",
            placeholder: "A szállás teljes címe",
          },
        },
      },
      transportInternational: {
        title: "Nemzetközi közlekedés (származási ország ↔ Franciaország)",
        chargeEU: {
          label: "A felhasználó vállalat biztosítja a közlekedést",
          helper: "Utazások a származási ország és a kiküldetés helyszíne között",
          options: {
            oui: "Igen, a felhasználó biztosítja",
            non: "Nem, a munkavállaló fizeti",
          },
        },
        detailsEU: {
          type: {
            label: "Közlekedés típusa",
            options: {
              avion: "Repülőgép",
              train: "Vonat",
              bus: "Busz",
              covoiturage: "Szervezett autómegosztás",
            },
          },
          frequence: {
            label: "Utazások gyakorisága",
            options: {
              allerRetour: "Csak kezdeti oda-vissza",
              hebdomadaire: "Hetente",
              mensuel: "Havonta",
            },
          },
        },
      },
      transportLocal: {
        title: "Helyi közlekedés",
        chargeETT: {
          label: "Az ügynökség biztosítja a helyi közlekedést",
          helper: "Ha IGEN: +1,50 €/óra pótlék kerül felszámításra",
          options: {
            oui: "Igen, az ügynökség biztosítja",
            non: "Nem, a munkavállaló fizeti",
          },
        },
        detailsETT: {
          type: {
            label: "Közlekedés típusa",
            options: {
              vehicule: "Szolgálati jármű",
              transport: "Tömegközlekedés",
              velo: "Kerékpár",
            },
          },
        },
      },
      repas: {
        title: "Étkezés",
        type: {
          label: "Étkezés típusa",
          options: {
            restaurant: "Vállalati étterem / Étkezési utalványok",
            panier: "Étkezési költségtérítés (naponta számlázva)",
            nonConcerne: "Nem releváns",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Napi költségkeret",
            placeholder: "Összeg €-ban",
          },
        },
        detailsPanier: {
          info: "Az étkezési költségtérítés minden ledolgozott napra külön kerül számlázásra",
        },
      },
    },
  },

  // === 5. LÉPÉS: JELÖLTEK ===
  step5: {
    title: "Jelöltek profilja",
    subtitle: "Határozza meg a kompetenciákat és a konkrét követelményeket.",
    sections: {
      experience: {
        title: "Szakmai tapasztalat",
        obligatoire: {
          label: "Kötelező tapasztalat",
        },
        annees: {
          label: "Minimum tapasztalati évek száma",
          placeholder: "Pl.: 3",
          options: {
            '0-1': "Kezdő (0-1 év)",
            '1-3': "Közepes (1-3 év)",
            '3-5': "Megerősített (3-5 év)",
            '5+': "Szakértő (5 év és több)",
          },
        },
        competences: {
          label: "Elvárt műszaki kompetenciák",
          placeholder: "Pl.: Kőművesség, zsaluzás, tervrajz olvasása, TIG hegesztés...",
        },
      },
      formation: {
        title: "Képzés",
        obligatoire: {
          label: "Kötelező képzés",
        },
        type: {
          label: "Képzés típusa",
          placeholder: "Pl.: Szakmunkás kőműves, CACES R489...",
        },
      },
      travailRisque: {
        title: "Veszélyes munka",
        active: {
          label: "Különleges veszélyes munka",
        },
        precisions: {
          label: "Kockázatokkal kapcsolatos pontosítások",
          placeholder: "Pl.: Magasban végzett munka, nehéz terhek mozgatása...",
        },
      },
      langues: {
        title: "Nyelvi készségek",
        francais: {
          label: "Elvárt francia szint",
          placeholder: "Válasszon szintet",
          options: {
            a1: "A1 - Kezdő",
            a2: "A2 - Elemi",
            b1: "B1 - Közepes",
            b2: "B2 - Közép haladó",
            c1: "C1 - Haladó",
            c2: "C2 - Anyanyelvi",
            natif: "Anyanyelv",
          },
        },
        autres: {
          label: "További hasznos nyelvek",
          placeholder: "Pl.: Angol (B1), Német (A2)...",
        },
        languageNames: {
          francais: "Francia",
          anglais: "Angol",
          portugais: "Portugál",
          espagnol: "Spanyol",
          italien: "Olasz",
          autre: "Egyéb",
        },
        levels: {
          'non-requis': "Nem szükséges",
          'A1': "A1 - Kezdő",
          'A2': "A2 - Elemi",
          'B1': "B1 - Közepes",
          'B2': "B2 - Haladó",
          'C1': "C1 - Önálló",
          'C2': "C2 - Anyanyelvi",
        },
      },
      permis: {
        title: "Vezetői engedély",
        requis: {
          label: "Szükséges vezetői engedély",
          options: {
            aucun: "Nincs szükség vezetői engedélyre",
            b: "B kategóriás jogosítvány (személygépkocsi)",
            c: "C kategóriás jogosítvány (tehergépkocsi)",
            ce: "CE kategóriás jogosítvány (tehergépkocsi + pótkocsi)",
            d: "D kategóriás jogosítvány (személyszállítás)",
          },
        },
        categorie: {
          label: "Jogosítvány kategória",
          placeholder: "Pl.: B, C, CE...",
        },
      },
      outillage: {
        title: "Kéziszerszámok",
        requis: {
          label: "Szükséges saját szerszámok",
        },
        type: {
          label: "Szerszámok típusa",
          placeholder: "Pl.: Kalapács, vízmérték, mérőszalag, simítókanál...",
        },
      },
      epi: {
        title: "Egyéni védőfelszerelések (EVF)",
        infoLegale: "ℹ️ A szabályozás szerint a munkáltatónak kell biztosítania a pozíció kockázataihoz igazított EVF-eket.",
        selectionCount: "✓ {count} kiválasztott EVF",
        fournis: {
          label: "A vállalat által biztosított EVF",
          helper: "Sisak, munkavédelmi cipő, kesztyű stb.",
          options: {
            oui: "Igen, a felhasználó biztosítja",
            non: "Nem, a munkavállaló fizeti",
          },
        },
        liste: {
          label: "Szükséges EVF-ek listája",
          placeholder: "Pl.: Sisak, S3 cipő, vágásbiztos kesztyű, biztonsági heveder...",
        },
        items: {
          casque: "Védősisak",
          lunettes: "Védőszemüveg",
          protections_auditives: "Hallásvédelem",
          gants: "Védőkesztyű",
          chaussures: "Munkavédelmi cipő",
          harnais: "Biztonsági heveder",
          vetements: "Munkavédelmi ruházat",
          masque: "Légzésvédő maszk",
          protection_faciale: "Arcvédő pajzs",
          vetements_visibilite: "Nagy láthatóságú ruházat",
        },
      },
      autresExigences: {
        title: "További követelmények",
        label: "További konkrét követelmények",
        placeholder: "Pl.: Villamos képesítések, CACES, hétvégi rendelkezésre állás, magasban végzett munka...",
      },
    },
  },

  // === ÖSSZEFOGLALÓ ===
  recapitulatif: {
    title: "Kérése összefoglalása",
    subtitle: "Ellenőrizze az információkat, mielőtt elküldi árajánlat kérését.",
    acceptConditionsError: "Kérjük, fogadja el a feltételeket a folytatás előtt",
    entreprise: {
      title: "Vállalat",
      raisonSociale: "Cégnév",
      siret: "SIRET",
      pays: "Ország",
      ville: "Város",
      region: "Régió/Megye",
    },
    contact: {
      title: "Kapcsolattartó",
      nomPrenom: "Név",
      email: "E-mail",
      telephone: "Telefon",
      fonction: "Beosztás",
    },
    postes: {
      title: "Igényelt pozíciók",
      coeffETT: "📊 Alkalmazott ügynökségi együttható",
      coeffBase: "Alap együttható",
      facteurPays: "Ország tényező",
      supplementsHoraires: "✨ Órapótlékok (benne a díjszabásban)",
      hebergement: "✓ Szállás",
      transport: "✓ Helyi közlekedés",
      panierRepas: "🍽️ Étkezési költségtérítés (naponta számlázva)",
      baseHoraire: "📅 Óraalap: {heures} óra/hó (túlóra észlelve)",
      heuresNormales: "Normál órák (0-35 óra/hét)",
      heuresSup25: "Túlóra +25% (36.-43. óra)",
      heuresSup50: "Túlóra +50% (44.+ óra)",
      sousTotal: "Munkaerő részösszeg (személyenként)",
      tauxHoraireBrut: "Bruttó órabér",
      tauxETTFinal: "Végső ügynökségi díjszabás",
      coutMensuel: "Teljes havi költség",
    },
    conditions: {
      title: "Kiküldetés feltételei",
      dateDebut: "Kezdés dátuma",
      dateFin: "Befejezés dátuma",
      dureeEstimee: "Becsült időtartam",
      lieuMission: "Kiküldetés helyszíne",
      mois: "hónap",
    },
    majorations: {
      title: "A megbízás árkorrekciói",
      total: "Összes korrekció",
      notSet: "Nincsenek beállított korrekciók",
    },
    totaux: {
      mensuelHT: "Havi összesen ÁFA nélkül",
      mensuelTTC: "Havi összesen ÁFÁ-val",
      totalMission: "Kiküldetés teljes költsége",
    },
    noteLegale: "ℹ️ Ez a becslés tájékoztató jellegű. A végleges díjszabást csapatunk és a kiválasztott partner ügynökség jóváhagyása után erősítjük meg.",
    acceptConditions: {
      text: "Elfogadom, hogy adataimat a következőknek megfelelően kezelik:",
      lien: "adatvédelmi szabályzat",
    },
    boutonEnvoi: {
      texte: "Árajánlat kérésem elküldése",
      enCours: "Küldés...",
    },
    footer: "✓ Válasz 24 munkaidőn belül • ✓ Kötelezettségvállalás nélkül",
  },

  // === HIBÁK ===
  errors: {
    required: "Ez a mező kötelező",
    invalidEmail: "Érvénytelen e-mail cím",
    invalidSIRET: "Érvénytelen SIRET (14 számjegy szükséges)",
    invalidPhone: "Érvénytelen telefonszám",
    minValue: "Az értéknek nagyobbnak vagy egyenlőnek kell lennie {min}",
    maxValue: "Az értéknek kisebbnek vagy egyenlőnek kell lennie {max}",
    genericError: "Hiba történt. Kérjük, próbálja újra.",
    loadingError: "Hiba az adatok betöltésekor",
    submitError: "Hiba a kérés küldésekor",
  },

  // === ÁGAZATOK & SZAKMÁK ===
  secteurs: {
    batiment: {
      label: "Építőipar",
      convention: "Országos kollektív szerződés építőipari munkások (3193)",
      postes: {
        macon: "Kőműves",
        coffreur: "Zsaluzó",
        ferrailleur: "Vasszerelő",
        carreleur: "Burkoló",
        platrier: "Gipszkartonszerelő",
        peintre: "Festő",
        plombier: "Vízvezeték-szerelő",
        electricien: "Villanyszerelő",
        couvreur: "Tetőfedő",
        menuisier: "Ács",
        chef_equipe_batiment: "Csoportvezető",
        chef_chantier: "Építésvezető",
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
      label: "Fémfeldolgozás",
      convention: "Fémfeldolgozási kollektív szerződés (3109)",
      postes: {
        soudeur: "Hegesztő",
        chaudronnier: "Kazánkovács",
        tuyauteur: "Csőszerelő",
        tourneur: "Esztergályos",
        fraiseur: "Marós",
        usineur: "CNC operátor",
        mecanicien_industriel: "Ipari szerelő",
        monteur: "Összeszerelő",
        controleur_qualite: "Minőségellenőr",
        ajusteur: "Lakatos",
        chef_equipe_metallurgie: "Csoportvezető",
      },
      classifications: {
        niveau_1: "I. szint",
        niveau_2: "II. szint",
        niveau_3: "III. szint",
        niveau_4: "IV. szint",
        niveau_5: "V. szint",
      },
    },
    tp: {
      label: "Közműépítés",
      convention: "Országos közműépítési kollektív szerződés (3005)",
      postes: {
        conducteur_engins: "Gépkezelő",
        terrassier: "Földmunkás",
        canalisateur: "Csatornaépítő",
        constructeur_routes: "Útépítő",
        coffreur_bancheur: "Zsaluzó",
        macon_vrd: "Kőműves közműépítés",
        chef_equipe_tp: "Csoportvezető közműépítés",
        manoeuvre_tp: "Segédmunkás közműépítés",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Szállodaipar",
      convention: "Szálloda-vendéglátás kollektív szerződés (3292)",
      postes: {
        receptionniste: "Recepciós",
        femme_chambre: "Szobalány",
        agent_entretien: "Takarító",
        bagagiste: "Bőröndös",
        concierge: "Portás",
        night_audit: "Éjszakai auditor",
        gouvernante: "Főnővér",
        chef_reception: "Recepciós vezető",
      },
      classifications: {
        niveau_1: "I. szint",
        niveau_2: "II. szint",
        niveau_3: "III. szint",
        niveau_4: "IV. szint",
        niveau_5: "V. szint",
      },
    },
    restauration: {
      label: "Vendéglátás",
      convention: "Szálloda-vendéglátás kollektív szerződés (3292)",
      postes: {
        cuisinier: "Szakács",
        commis_cuisine: "Konyhai kisegítő",
        chef_partie: "Chef de partie",
        serveur: "Felszolgáló",
        barman: "Pultos",
        plongeur: "Mosogató",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Főszakács",
      },
      classifications: {
        niveau_1: "I. szint",
        niveau_2: "II. szint",
        niveau_3: "III. szint",
        niveau_4: "IV. szint",
        niveau_5: "V. szint",
      },
    },
    plasturgie: {
      label: "Műanyagipar",
      convention: "Műanyagipari kollektív szerződés (0292)",
      postes: {
        operateur_injection: "Fröccsöntő gép operátor",
        operateur_extrusion: "Extrudáló gép operátor",
        regleur: "Beállító",
        operateur_thermoformage: "Termoformáló gép operátor",
        controleur_qualite_plasturgie: "Minőségellenőr",
        technicien_maintenance: "Karbantartó technikus",
        chef_equipe_plasturgie: "Csoportvezető",
      },
      classifications: {
        niveau_1: "I. szint",
        niveau_2: "II. szint",
        niveau_3: "III. szint",
        niveau_4: "IV. szint",
      },
    },
    automobile_carrosserie: {
      label: "Autóipar & Karosszéria",
      convention: "Autójavítási kollektív szerződés (1090)",
      postes: {
        carrossier: "Karosszérialakatos",
        peintre_automobile: "Autófestő",
        mecanicien_auto: "Autószerelő",
        electricien_auto: "Autóvillanyszerelő",
        chef_atelier: "Műhelyvezető",
        controleur_technique: "Műszaki ellenőr",
      },
      classifications: {
        niveau_1: "I. szint",
        niveau_2: "II. szint",
        niveau_3: "III. szint",
        niveau_4: "IV. szint",
      },
    },
    sylviculture: {
      label: "Erdőgazdálkodás",
      convention: "Mezőgazdasági kollektív szerződés (7501)",
      postes: {
        bucheron: "Favágó",
        elagueur: "Fametszéssel foglalkozó",
        conducteur_engins_forestiers: "Erdészeti gépkezelő",
        chef_equipe_sylviculture: "Csoportvezető erdőgazdálkodás",
      },
      classifications: {
        niveau_1: "I. szint",
        niveau_2: "II. szint",
        niveau_3: "III. szint",
        niveau_4: "IV. szint",
      },
    },
    cartonnerie: {
      label: "Kartongyártás",
      convention: "Feldolgozóipari kollektív szerződés (3107)",
      postes: {
        operateur_production: "Termelési operátor",
        conducteur_ligne: "Sorvezető",
        regleur_cartonnerie: "Beállító",
        chef_equipe_cartonnerie: "Csoportvezető",
      },
      classifications: {
        niveau_1: "I. szint",
        niveau_2: "II. szint",
        niveau_3: "III. szint",
        niveau_4: "IV. szint",
      },
    },
    autre: {
      label: "Egyéb",
      convention: "Tevékenység szerint meghatározandó",
      postes: {
        autre_poste: "Egyéb pozíció (pontosítandó)",
      },
      classifications: {
        a_definir: "Meghatározandó",
      },
    },
  },

  // === EURÓPAI ORSZÁGOK ===
  pays: {
    france: "Franciaország",
    allemagne: "Németország",
    autriche: "Ausztria",
    belgique: "Belgium",
    bulgarie: "Bulgária",
    croatie: "Horvátország",
    chypre: "Ciprus",
    danemark: "Dánia",
    espagne: "Spanyolország",
    estonie: "Észtország",
    finlande: "Finnország",
    grece: "Görögország",
    hongrie: "Magyarország",
    irlande: "Írország",
    italie: "Olaszország",
    lettonie: "Lettország",
    lituanie: "Litvánia",
    luxembourg: "Luxemburg",
    malte: "Málta",
    pays_bas: "Hollandia",
    pologne: "Lengyelország",
    portugal: "Portugália",
    republique_tcheque: "Csehország",
    roumanie: "Románia",
    slovaquie: "Szlovákia",
    slovenie: "Szlovénia",
    suede: "Svédország",
  },

  // === ÁRAJÁNLAT ÖSSZEFOGLALÓ OLDAL (ALÁÍRÁS) ===
  pageRecap: {
    header: {
      title: "Árajánlat összefoglalása",
      exportPDF: "Exportálás PDF-be",
      loading: "Árajánlat betöltése...",
      notFound: "Árajánlat nem található",
    },
    statut: {
      signe: "Aláírva",
      nouveau: "Új",
    },
    dates: {
      creeLe: "Létrehozva",
      a: "ekkor",
      signeLe: "Aláírva",
      derniereModification: "Utolsó módosítás:",
    },
    entreprise: {
      title: "Vállalati adatok",
      raisonSociale: "Cégnév",
      siret: "SIRET",
      codeAPE: "APE kód",
      tvaIntracommunautaire: "Közösségi adószám",
      adresse: "Cím",
      siteInternet: "Weboldal",
    },
    contact: {
      title: "Kapcsolattartó személy",
      nomComplet: "Teljes név",
      fonction: "Beosztás",
      email: "E-mail",
      telephonePortable: "Mobiltelefon",
      telephoneFixe: "Vezetékes telefon",
    },
    postes: {
      title: "Betöltendő pozíciók",
      nationalite: "Nemzetiség",
      salaireBrut: "Bruttó bér",
      tauxHoraireBrut: "Bruttó órabér",
      coefficientETT: "Ügynökségi együttható",
      tauxETT: "Ügynökségi díjszabás",
    },
    conditions: {
      title: "Munkafeltételek",
      dateDebut: "Kezdés dátuma",
      dateFin: "Befejezés dátuma",
      periodeEssai: "Próbaidő",
      baseHoraire: "Óraalap",
      heuresMois: "óra/hó",
      lieuxMission: "Kiküldetés helyszínei",
      motifRecours: "Munkaerő-kölcsönzés indoka",
    },
    candidats: {
      title: "Keresett jelölti profil",
      experience: "Tapasztalat",
      ansMinimum: "év minimum",
      formation: "Képzés",
      permis: "Jogosítvány",
      langues: "Nyelvek",
    },
    signature: {
      title: "Elektronikus aláírás",
      subtitle: "Írja alá ajánlatát biztonságosan online",
      commencer: "Aláírás kezdése",
      identiteSignataire: "Az aláíró személyazonossága",
      nomComplet: "Teljes név",
      fonction: "Beosztás",
      email: "E-mail",
      entreprise: "Cég",
      siret: "SIRET",
      signataire: "Aláíró",
      tracabilite: "Műszaki nyomon követhetőség",
      dateHeure: "Dátum és idő",
      adresseIP: "IP-cím",
      navigateur: "Böngésző",
      signatureManuscrite: "Kézírásos aláírás",
      infoLegale: "🔒 Ezen információk rögzítésre kerülnek az elektronikus aláírási tanúsítványban a nyomonkövethetőség és a jogszabályi megfelelés biztosítása érdekében az eIDAS rendelet (EU) 910/2014 szerint.",
      dessinerSignature: "Rajzolja meg aláírását alább",
      effacer: "Törlés",
      accepteCGV: "Elfogadom az",
      cgvLien: "Általános Szerződési Feltételeket",
      accepteCGVSuite: "és tanúsítom, hogy a megadott információk pontosak. Ez az elektronikus aláírás ugyanolyan jogi érvényű, mint a kézírásos aláírás.",
      annuler: "Mégse",
      validerSigner: "Érvényesítés és aláírás",
      signatureEnCours: "Aláírás folyamatban...",
      erreurSignatureVide: "Kérjük, írja alá az érvényesítés előtt",
      erreurCGV: "Kérjük, fogadja el az Általános Feltételeket",
    },
    actions: {
      modifier: "Árajánlat módosítása",
      telecharger: "PDF letöltése",
      partager: "Megosztás",
    },
  },
};