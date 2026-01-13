/**
 * 🇸🇰 SLOVENSKÝ PREKLAD - FORMULÁR PRE ŽIADOSŤ O PONUKU
 * 
 * Kompletné slovenské preklady pre formulár žiadosti o ponuku
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const sk: DevisTranslations = {
  // === VŠEOBECNÉ ===
  common: {
    next: "Ďalej",
    previous: "Späť",
    submit: "Odoslať",
    required: "*",
    optional: "(voliteľné)",
    loading: "Načítavanie...",
    error: "Chyba",
    success: "Úspech",
    cancel: "Zrušiť",
    save: "Uložiť",
    edit: "Upraviť",
    delete: "Vymazať",
    confirm: "Potvrdiť",
    euro: "€",
    perHour: "/hod",
    perMonth: "/mes",
    perDay: "/deň",
    persons: "osôb",
    hours: "hodín",
    days: "dní",
    months: "mesiacov",
    year: "rokov",
  },

  // === NAVIGÁCIA ===
  navigation: {
    back: "Späť",
    stepOf: "Krok {step} z {total}",
    steps: {
      entreprise: {
        title: "Spoločnosť",
        badge: "🏢 Vaša spoločnosť",
      },
      contact: {
        title: "Kontakt",
        badge: "👤 Vaša kontaktná osoba",
      },
      besoins: {
        title: "Požiadavky",
        badge: "💼 Vaše požiadavky",
      },
      conditions: {
        title: "Podmienky",
        badge: "📋 Podmienky",
      },
      candidats: {
        title: "Kandidáti",
        badge: "👷 Hľadaný profil",
      },
      recapitulatif: {
        title: "Súhrn",
        badge: "✅ Súhrn",
      },
    },
  },

  // === VALIDÁCIA ===
  validation: {
    fillRequired: "Vyplňte prosím všetky povinné polia",
    selectRegion: "Vyberte prosím región",
    addAtLeastOnePosition: "Pridajte prosím aspoň jednu pozíciu",
    invalidEmail: "Zadajte prosím platnú e-mailovú adresu",
    invalidPhone: "Zadajte prosím platné telefónne číslo",
    invalidSIRET: "Zadajte prosím platné číslo SIRET (14 číslic)",
    dateRequired: "Zadajte prosím dátum začiatku",
    missionLocationRequired: "Zadajte prosím miesto misie",
  },

  // === SPRÁVY ===
  messages: {
    success: {
      quoteSent: "Žiadosť o ponuku bola úspešne odoslaná!",
      redirecting: "Presmerovanie...",
    },
    error: {
      submitError: "Chyba pri odosielaní žiadosti o ponuku",
      genericError: "Vyskytla sa chyba",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Žiadosť o ponuku | YOJOB",
    pageDescription: "Požiadajte o ponuku pre vaše európske požiadavky na dočasné zamestnanie.",
  },

  // === KROK 1: SPOLOČNOSŤ ===
  step1: {
    title: "Informácie o spoločnosti",
    subtitle: "Zadajte právne informácie o vašej užívateľskej spoločnosti.",
    fields: {
      pays: {
        label: "Krajina",
        placeholder: "Vyberte krajinu",
      },
      raisonSociale: {
        label: "Obchodný názov",
        placeholder: "Napr.: YOJOB s.r.o.",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 číslic",
        helper: "Identifikačné číslo vašej prevádzky",
      },
      codeAPE: {
        label: "Kód APE/NAF",
        placeholder: "Napr.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Intrakomunitárne DIČ",
        placeholder: "Napr.: SK2022123456",
      },
      adresse: {
        label: "Úplná adresa",
        placeholder: "Číslo a názov ulice",
      },
      codePostal: {
        label: "PSČ",
        placeholder: "Napr.: 811 01",
      },
      ville: {
        label: "Mesto",
        placeholder: "Napr.: Bratislava",
      },
      region: {
        label: "Región/Kraj",
        placeholder: "Vyberte región",
        placeholderOtherCountry: "Napr.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Webová stránka",
        placeholder: "https://www.priklad.sk",
      },
    },
    infoMessage: "✓ Tieto informácie budú použité na vytvorenie vašej personalizovanej ponuky",
  },

  // === KROK 2: KONTAKT ===
  step2: {
    title: "Kontaktná osoba",
    subtitle: "Kto bude vašou primárnou kontaktnou osobou pre tento projekt?",
    fields: {
      civilite: {
        label: "Oslovenie",
        options: {
          m: "Pán",
          mme: "Pani",
        },
      },
      nom: {
        label: "Priezvisko",
        placeholder: "Napr.: Novák",
      },
      prenom: {
        label: "Meno",
        placeholder: "Napr.: Ján",
      },
      fonction: {
        label: "Funkcia",
        placeholder: "Napr.: HR manažér",
      },
      email: {
        label: "Pracovný e-mail",
        placeholder: "jan.novak@firma.sk",
      },
      telephone: {
        label: "Telefón",
        placeholder: "+421 911 123 456",
      },
    },
  },

  // === KROK 3: POŽIADAVKY ===
  step3: {
    title: "Vaše požiadavky na nábor",
    subtitle: "Popíšte hľadané profily a ich podmienky.",
    profileLabel: "Profil",
    addProfile: "Pridať ďalší profil",
    removeProfile: "Odstrániť tento profil",
    loadingConfig: "Načítavanie konfigurácie...",
    missingRegionWarning: "⚠️ Vyberte prosím váš región v kroku 1 pre automatické zobrazenie platov.",
    fields: {
      secteur: {
        label: "Odvetvie činnosti",
        placeholder: "Vyberte odvetvie",
      },
      convention: {
        label: "Kolektívna zmluva",
        placeholder: "Automaticky podľa odvetvia",
      },
      poste: {
        label: "Hľadaná pozícia",
        placeholder: "Vyberte pozíciu",
      },
      classification: {
        label: "Klasifikácia / Kvalifikácia",
        placeholder: "Vyberte klasifikáciu",
      },
      quantite: {
        label: "Počet osôb",
        placeholder: "Napr.: 5",
        helper: "Koľko osôb je potrebných na túto pozíciu?",
      },
      salaireBrut: {
        label: "Hrubá mesačná mzda",
        placeholder: "Napr.: 2500",
        helper: "Hrubá mzda na základe 151,67 hod/mesiac",
      },
      nationalite: {
        label: "Štátna príslušnosť pracovníkov",
        placeholder: "Vyberte krajinu",
        helper: "Štátna príslušnosť ovplyvňuje koeficient sadzby agentúry",
      },
    },
    ajouterPoste: "Pridať ďalšiu pozíciu",
    supprimerPoste: "Odstrániť túto pozíciu",
    posteNumero: "Pozícia",
    coefficientInfo: {
      title: "💡 Aplikovaný koeficient agentúry",
      base: "Základný koef.",
      facteurPays: "Faktor krajiny",
      final: "Konečný koeficient",
    },
    summary: {
      title: "Odmeňovanie pracovníka",
      salaireBrutMensuel: "Hrubá mesačná mzda",
      tauxHoraireBrut: "Hrubá hodinová sadzba",
      baseMensuelle: "(Základňa 151,67 hod/mes podľa kolektívnej zmluvy)",
    },
  },

  // === KROK 4: PODMIENKY ===
  step4: {
    title: "Pracovné podmienky",
    subtitle: "Spresníte podmienky zamestnania a ponúkané výhody.",
    dateError: "Dátum ukončenia musí byť po dátume začiatku",
    fields: {
      dateDebut: {
        label: "Požadovaný dátum začiatku",
        placeholder: "DD/MM/RRRR",
      },
      dateFin: {
        label: "Predpokladaný dátum ukončenia",
        placeholder: "DD/MM/RRRR",
        helper: "Ponechajte prázdne pre neurčitú dobu",
      },
      baseHoraire: {
        label: "Mesačná hodinová základňa",
        placeholder: "Napr.: 151,67",
        helper: "Zákonná základňa vo Francúzsku: 151,67 hod/mesiac (35 hod/týždeň)",
      },
      lieuxMission: {
        label: "Miesta misie",
        placeholder: "Napr.: Bratislava centrum, Košice zóna 3, Žilina...",
      },
      periodeEssai: {
        label: "Skúšobná doba",
        placeholder: "Vyberte trvanie",
        options: {
          '2': '2 dni',
          '3': '3 dni',
          '5': '5 dní',
          '15': '15 dní',
        },
      },
      motifRecours: {
        label: "Dôvod dočasného zamestnania",
        placeholder: "Vyberte dôvod",
        options: {
          accroissement: "Dočasné zvýšenie činnosti",
          remplacement: "Nahradenie neprítomného zamestnanca",
          saisonnier: "Sezónne práce",
          exportation: "Výnimočná exportná zákazka",
          autre: "Iné (spresniť)",
        },
      },
      delaiPaiement: {
        label: "Požadovaná lehota splatnosti",
        placeholder: "Vyberte lehotu",
        options: {
          reception: "Platba pri prijatí",
          j30: "30 dní",
          j45: "45 dní",
          j60: "60 dní",
        },
      },
    },
    hebergement: {
      title: "Ubytovanie",
      chargeEU: {
        label: "Ubytovanie zabezpečené užívateľskou spoločnosťou",
        helper: "Ak NIE: agentúra bude účtovať príplatok +3,50 €/hod",
      },
      supplementWarning: "⚠️ Bude účtovaný príplatok +3,50 €/hod, pretože ubytovanie nie je zabezpečené",
      commentaire: {
        label: "Podrobnosti o ubytovaní",
        placeholder: "Typ ubytovanie, adresa, špeciálne podmienky...",
      },
    },
    transport: {
      title: "Miestna doprava",
      chargeETT: {
        label: "Miestna doprava zabezpečená agentúrou",
        helper: "Ak ÁNO: bude účtovaný príplatok +1,50 €/hod",
      },
      supplementInfo: "✓ Bude účtovaný príplatok +1,50 €/hod na pokrytie nákladov na miestnu dopravu",
    },
    repas: {
      title: "Stravovanie",
      options: {
        restaurant: "Podniková jedáleň / Stravenky",
        panier: "Stravné (účtované denne)",
        nonConcerne: "Netýka sa",
      },
      montantInfo: "📋 Výška stravného: {montant} / odpracovaný deň (účtované samostatne)",
      montantNonDefini: "⚠️ Suma nie je definovaná pre túto krajinu/región",
    },
    sections: {
      hebergement: {
        title: "Ubytovanie",
        chargeEU: {
          label: "Ubytovanie zabezpečené užívateľskou spoločnosťou",
          helper: "Ak NIE: agentúra bude účtovať príplatok +3,50 €/hod",
          options: {
            oui: "Áno, zabezpečené užívateľom",
            non: "Nie, hradí pracovník",
          },
        },
        detailsEU: {
          type: {
            label: "Typ ubytovanie",
            options: {
              hotel: "Hotel",
              appartement: "Byt",
              foyer: "Ubytovňa",
              autre: "Iné",
            },
          },
          adresse: {
            label: "Adresa ubytovanie",
            placeholder: "Úplná adresa ubytovanie",
          },
        },
      },
      transportInternational: {
        title: "Medzinárodná doprava (krajina pôvodu ↔ Francúzsko)",
        chargeEU: {
          label: "Doprava zabezpečená užívateľskou spoločnosťou",
          helper: "Cesty medzi krajinou pôvodu a miestom misie",
          options: {
            oui: "Áno, zabezpečené užívateľom",
            non: "Nie, hradí pracovník",
          },
        },
        detailsEU: {
          type: {
            label: "Typ dopravy",
            options: {
              avion: "Lietadlo",
              train: "Vlak",
              bus: "Autobus",
              covoiturage: "Organizované spolucestovanie",
            },
          },
          frequence: {
            label: "Frekvencia ciest",
            options: {
              allerRetour: "Len počiatočné tam a späť",
              hebdomadaire: "Týždenne",
              mensuel: "Mesačne",
            },
          },
        },
      },
      transportLocal: {
        title: "Miestna doprava",
        chargeETT: {
          label: "Miestna doprava zabezpečená agentúrou",
          helper: "Ak ÁNO: bude účtovaný príplatok +1,50 €/hod",
          options: {
            oui: "Áno, zabezpečené agentúrou",
            non: "Nie, hradí pracovník",
          },
        },
        detailsETT: {
          type: {
            label: "Typ dopravy",
            options: {
              vehicule: "Služobné vozidlo",
              transport: "Verejná doprava",
              velo: "Bicykel",
            },
          },
        },
      },
      repas: {
        title: "Stravovanie",
        type: {
          label: "Typ stravovania",
          options: {
            restaurant: "Podniková jedáleň / Stravenky",
            panier: "Stravné (účtované denne)",
            nonConcerne: "Netýka sa",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Denný rozpočet",
            placeholder: "Suma v €",
          },
        },
        detailsPanier: {
          info: "Stravné bude účtované samostatne za každý odpracovaný deň",
        },
      },
    },
  },

  // === KROK 5: KANDIDÁTI ===
  step5: {
    title: "Profil kandidátov",
    subtitle: "Definujte kompetencie a konkrétne požiadavky.",
    sections: {
      experience: {
        title: "Profesijné skúsenosti",
        obligatoire: {
          label: "Povinné skúsenosti",
        },
        annees: {
          label: "Minimálne roky skúseností",
          placeholder: "Napr.: 3",
          options: {
            '0-1': "Začiatočník (0-1 rok)",
            '1-3': "Stredný (1-3 roky)",
            '3-5': "Potvrdené (3-5 rokov)",
            '5+': "Expert (5 rokov a viac)",
          },
        },
        competences: {
          label: "Požadované technické kompetencie",
          placeholder: "Napr.: Murárstvo, debnenie, čítanie plánov, TIG zváranie...",
        },
      },
      formation: {
        title: "Vzdelanie",
        obligatoire: {
          label: "Povinné vzdelanie",
        },
        type: {
          label: "Typ vzdelania",
          placeholder: "Napr.: Vyučený murár, CACES R489...",
        },
      },
      travailRisque: {
        title: "Riziková práca",
        active: {
          label: "Špecifická riziková práca",
        },
        precisions: {
          label: "Spresnenie ohľadom rizík",
          placeholder: "Napr.: Práca vo výške, manipulácia s ťažkými bremenami...",
        },
      },
      langues: {
        title: "Jazykové zručnosti",
        francais: {
          label: "Požadovaná úroveň francúzštiny",
          placeholder: "Vyberte úroveň",
          options: {
            a1: "A1 - Začiatočník",
            a2: "A2 - Mierne pokročilý",
            b1: "B1 - Stredný",
            b2: "B2 - Pokročilý",
            c1: "C1 - Veľmi pokročilý",
            c2: "C2 - Rodený hovorca",
            natif: "Rodený hovorca",
          },
        },
        autres: {
          label: "Ďalšie užitočné jazyky",
          placeholder: "Napr.: Angličtina (B1), Nemčina (A2)...",
        },
        languageNames: {
          francais: "Francúzština",
          anglais: "Angličtina",
          portugais: "Portugalčina",
          espagnol: "Španielčina",
          italien: "Taliančina",
          autre: "Iný",
        },
        levels: {
          'non-requis': "Nie je požadované",
          'A1': "A1 - Začiatočník",
          'A2': "A2 - Mierne pokročilý",
          'B1': "B1 - Stredný",
          'B2': "B2 - Pokročilý",
          'C1': "C1 - Autonómny",
          'C2': "C2 - Rodený hovorca",
        },
      },
      permis: {
        title: "Vodičský preukaz",
        requis: {
          label: "Požadovaný vodičský preukaz",
          options: {
            aucun: "Vodičský preukaz nie je vyžadovaný",
            b: "Vodičský preukaz sk. B (osobný automobil)",
            c: "Vodičský preukaz sk. C (nákladný automobil)",
            ce: "Vodičský preukaz sk. CE (nákladný automobil + príves)",
            d: "Vodičský preukaz sk. D (preprava osôb)",
          },
        },
        categorie: {
          label: "Skupina vodičského preukazu",
          placeholder: "Napr.: B, C, CE...",
        },
      },
      outillage: {
        title: "Ručné náradie",
        requis: {
          label: "Požadované vlastné náradie",
        },
        type: {
          label: "Typ náradia",
          placeholder: "Napr.: Kladivo, vodováha, zvinovací meter, hladidlo...",
        },
      },
      epi: {
        title: "Osobné ochranné prostriedky (OOP)",
        infoLegale: "ℹ️ Podľa predpisov musí zamestnávateľ poskytnúť OOP prispôsobené rizikám pozície.",
        selectionCount: "✓ {count} vybraných OOP",
        fournis: {
          label: "OOP poskytnuté spoločnosťou",
          helper: "Prilba, bezpečnostná obuv, rukavice atď.",
          options: {
            oui: "Áno, poskytnuté užívateľom",
            non: "Nie, hradí pracovník",
          },
        },
        liste: {
          label: "Zoznam potrebných OOP",
          placeholder: "Napr.: Prilba, obuv S3, rukavice proti rezaniu, bezpečnostný postroj...",
        },
        items: {
          casque: "Ochranná prilba",
          lunettes: "Ochranné okuliare",
          protections_auditives: "Ochrana sluchu",
          gants: "Ochranné rukavice",
          chaussures: "Bezpečnostná obuv",
          harnais: "Bezpečnostný postroj",
          vetements: "Pracovný odev",
          masque: "Respirátor",
          protection_faciale: "Ochranný štít na tvár",
          vetements_visibilite: "Oblečenie s vysokou viditeľnosťou",
        },
      },
      autresExigences: {
        title: "Ďalšie požiadavky",
        label: "Ďalšie špecifické požiadavky",
        placeholder: "Napr.: Elektrikárske oprávnenia, CACES, dostupnosť cez víkendy, práca vo výške...",
      },
    },
  },

  // === SÚHRN ===
  recapitulatif: {
    title: "Súhrn vašej žiadosti",
    subtitle: "Skontrolujte informácie pred odoslaním vašej žiadosti o ponuku.",
    acceptConditionsError: "Pred pokračovaním prijmite prosím podmienky",
    entreprise: {
      title: "Spoločnosť",
      raisonSociale: "Obchodný názov",
      siret: "SIRET",
      pays: "Krajina",
      ville: "Mesto",
      region: "Región/Kraj",
    },
    contact: {
      title: "Kontakt",
      nomPrenom: "Meno a priezvisko",
      email: "E-mail",
      telephone: "Telefón",
      fonction: "Funkcia",
    },
    postes: {
      title: "Požadované pozície",
      coeffETT: "📊 Aplikovaný koeficient agentúry",
      coeffBase: "Základný koef.",
      facteurPays: "Faktor krajiny",
      supplementsHoraires: "✨ Hodinové príplatky (zahrnuté v sadzbe)",
      hebergement: "✓ Ubytovanie",
      transport: "✓ Miestna doprava",
      panierRepas: "🍽️ Stravné (účtované denne)",
      baseHoraire: "📅 Hodinová základňa: {heures} hod/mes (zistené nadčasy)",
      heuresNormales: "Normálne hodiny (0-35 hod/týždeň)",
      heuresSup25: "Nadčasy +25% (36.-43. hod)",
      heuresSup50: "Nadčasy +50% (44.+ hod)",
      sousTotal: "Medzisúčet práce (na osobu)",
      tauxHoraireBrut: "Hrubá hodinová sadzba",
      tauxETTFinal: "Konečná sadzba agentúry",
      coutMensuel: "Celkové mesačné náklady",
    },
    conditions: {
      title: "Podmienky misie",
      dateDebut: "Dátum začiatku",
      dateFin: "Dátum ukončenia",
      dureeEstimee: "Odhadované trvanie",
      lieuMission: "Miesto misie",
      mois: "mesiacov",
    },
    totaux: {
      mensuelHT: "Celkom mesačne bez DPH",
      mensuelTTC: "Celkom mesačne s DPH",
      totalMission: "Celkové náklady misie",
    },
    noteLegale: "ℹ️ Tento odhad je orientačný. Konečná sadzba bude potvrdená po schválení naším tímom a vybranou partnerskou agentúrou.",
    acceptConditions: {
      text: "Súhlasím s tým, že moje údaje budú spracované v súlade s",
      lien: "zásadami ochrany osobných údajov",
    },
    boutonEnvoi: {
      texte: "Odoslať moju žiadosť o ponuku",
      enCours: "Odosielanie...",
    },
    footer: "✓ Odpoveď do 24 pracovných hodín • ✓ Bez záväzkov",
  },

  // === CHYBY ===
  errors: {
    required: "Toto pole je povinné",
    invalidEmail: "Neplatná e-mailová adresa",
    invalidSIRET: "Neplatné SIRET (vyžadovaných 14 číslic)",
    invalidPhone: "Neplatné telefónne číslo",
    minValue: "Hodnota musí byť väčšia alebo rovná {min}",
    maxValue: "Hodnota musí byť menšia alebo rovná {max}",
    genericError: "Vyskytla sa chyba. Skúste to prosím znova.",
    loadingError: "Chyba pri načítavaní údajov",
    submitError: "Chyba pri odosielaní žiadosti",
  },

  // === ODVETVIA & PROFESIE ===
  secteurs: {
    batiment: {
      label: "Stavebníctvo",
      convention: "Národná kolektívna zmluva stavební robotníci (3193)",
      postes: {
        macon: "Murár",
        coffreur: "Tesár na debnenie",
        ferrailleur: "Armovač",
        carreleur: "Obkladač",
        platrier: "Sadrokartónár",
        peintre: "Maliar",
        plombier: "Inštalatér",
        electricien: "Elektrikár",
        couvreur: "Pokrývač",
        menuisier: "Stolár",
        chef_equipe_batiment: "Vedúci čaty",
        chef_chantier: "Stavbyvedúci",
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
      label: "Kovovýroba",
      convention: "Kolektívna zmluva kovovýroba (3109)",
      postes: {
        soudeur: "Zvárač",
        chaudronnier: "Kotlár",
        tuyauteur: "Potrubiár",
        tourneur: "Sústružník",
        fraiseur: "Frézar",
        usineur: "CNC operátor",
        mecanicien_industriel: "Priemyselný mechanik",
        monteur: "Montér",
        controleur_qualite: "Kontrolór kvality",
        ajusteur: "Zámočník",
        chef_equipe_metallurgie: "Vedúci čaty",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
        niveau_5: "Úroveň V",
      },
    },
    tp: {
      label: "Verejné práce",
      convention: "Národná kolektívna zmluva verejné práce (3005)",
      postes: {
        conducteur_engins: "Obsluha strojov",
        terrassier: "Výkopový robotník",
        canalisateur: "Kanalizačný robotník",
        constructeur_routes: "Cestár",
        coffreur_bancheur: "Tesár na debnenie",
        macon_vrd: "Murár VP",
        chef_equipe_tp: "Vedúci čaty VP",
        manoeuvre_tp: "Pomocný robotník VP",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelierstvo",
      convention: "Kolektívna zmluva hotely-reštaurácie (3292)",
      postes: {
        receptionniste: "Recepčný",
        femme_chambre: "Izbárka",
        agent_entretien: "Pracovník údržby",
        bagagiste: "Vrátnik pre batožinu",
        concierge: "Portier",
        night_audit: "Nočný audítor",
        gouvernante: "Vrchná izbárka",
        chef_reception: "Vedúci recepcie",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
        niveau_5: "Úroveň V",
      },
    },
    restauration: {
      label: "Reštaurácie",
      convention: "Kolektívna zmluva hotely-reštaurácie (3292)",
      postes: {
        cuisinier: "Kuchár",
        commis_cuisine: "Pomocný kuchár",
        chef_partie: "Chef de partie",
        serveur: "Čašník",
        barman: "Barman",
        plongeur: "Pomocník v kuchyni",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Šéfkuchár",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
        niveau_5: "Úroveň V",
      },
    },
    plasturgie: {
      label: "Plastikárstvo",
      convention: "Kolektívna zmluva plastikárstvo (0292)",
      postes: {
        operateur_injection: "Operátor vstrekovania",
        operateur_extrusion: "Operátor extrúzie",
        regleur: "Nastavovač",
        operateur_thermoformage: "Operátor termoformovania",
        controleur_qualite_plasturgie: "Kontrolór kvality",
        technicien_maintenance: "Technik údržby",
        chef_equipe_plasturgie: "Vedúci čaty",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    automobile_carrosserie: {
      label: "Automobilový priemysel & Karoséria",
      convention: "Kolektívna zmluva opravy automobilov (1090)",
      postes: {
        carrossier: "Karosár",
        peintre_automobile: "Automobilový lakýrnik",
        mecanicien_auto: "Automechanik",
        electricien_auto: "Autoelektrikár",
        chef_atelier: "Vedúci dielne",
        controleur_technique: "Technický kontrolór",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    sylviculture: {
      label: "Lesníctvo",
      convention: "Kolektívna zmluva poľnohospodárstvo (7501)",
      postes: {
        bucheron: "Drevorubač",
        elagueur: "Orezávač stromov",
        conducteur_engins_forestiers: "Operátor lesnej techniky",
        chef_equipe_sylviculture: "Vedúci čaty lesníctvo",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    cartonnerie: {
      label: "Kartónovanie",
      convention: "Kolektívna zmluva spracovateľský priemysel (3107)",
      postes: {
        operateur_production: "Výrobný operátor",
        conducteur_ligne: "Vedúci linky",
        regleur_cartonnerie: "Nastavovač",
        chef_equipe_cartonnerie: "Vedúci čaty",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    autre: {
      label: "Iné",
      convention: "Určiť podľa činnosti",
      postes: {
        autre_poste: "Iná pozícia (spresniť)",
      },
      classifications: {
        a_definir: "Určiť",
      },
    },
  },

  // === EURÓPSKE KRAJINY ===
  pays: {
    france: "Francúzsko",
    allemagne: "Nemecko",
    autriche: "Rakúsko",
    belgique: "Belgicko",
    bulgarie: "Bulharsko",
    croatie: "Chorvátsko",
    chypre: "Cyprus",
    danemark: "Dánsko",
    espagne: "Španielsko",
    estonie: "Estónsko",
    finlande: "Fínsko",
    grece: "Grécko",
    hongrie: "Maďarsko",
    irlande: "Írsko",
    italie: "Taliansko",
    lettonie: "Lotyšsko",
    lituanie: "Litva",
    luxembourg: "Luxembursko",
    malte: "Malta",
    pays_bas: "Holandsko",
    pologne: "Poľsko",
    portugal: "Portugalsko",
    republique_tcheque: "Česká republika",
    roumanie: "Rumunsko",
    slovaquie: "Slovensko",
    slovenie: "Slovinsko",
    suede: "Švédsko",
  },

  // === STRÁNKA SÚHRN PONUKY (PODPIS) ===
  pageRecap: {
    header: {
      title: "Súhrn ponuky",
      exportPDF: "Exportovať do PDF",
      loading: "Načítavanie ponuky...",
      notFound: "Ponuka nenájdená",
    },
    statut: {
      signe: "Podpísané",
      nouveau: "Nové",
    },
    dates: {
      creeLe: "Vytvorené",
      a: "o",
      signeLe: "Podpísané",
      derniereModification: "Posledná zmena:",
    },
    entreprise: {
      title: "Informácie o spoločnosti",
      raisonSociale: "Obchodný názov",
      siret: "SIRET",
      codeAPE: "Kód APE",
      tvaIntracommunautaire: "Intrakomunitárne DIČ",
      adresse: "Adresa",
      siteInternet: "Webová stránka",
    },
    contact: {
      title: "Kontaktná osoba",
      nomComplet: "Celé meno",
      fonction: "Funkcia",
      email: "E-mail",
      telephonePortable: "Mobilný telefón",
      telephoneFixe: "Pevná linka",
    },
    postes: {
      title: "Pozície na obsadenie",
      nationalite: "Štátna príslušnosť",
      salaireBrut: "Hrubá mzda",
      tauxHoraireBrut: "Hrubá hodinová sadzba",
      coefficientETT: "Koeficient agentúry",
      tauxETT: "Sadzba agentúry",
    },
    conditions: {
      title: "Pracovné podmienky",
      dateDebut: "Dátum začiatku",
      dateFin: "Dátum ukončenia",
      periodeEssai: "Skúšobná doba",
      baseHoraire: "Hodinová základňa",
      heuresMois: "hod/mes",
      lieuxMission: "Miesta misie",
      motifRecours: "Dôvod dočasného zamestnania",
    },
    exigences: {
      title: "Požiadavky na kandidátov",
      experience: "Skúsenosti",
      competences: "Kompetencie",
      langues: "Jazyky",
      permis: "Vodičské preukazy",
      epi: "OOP",
    },
    calculs: {
      title: "Výpočty sadzieb",
      salaireBrut: "Hrubá mzda",
      coefficientETT: "Koeficient agentúry",
      tauxHoraireBrut: "Hrubá hodinová sadzba",
      tauxETT: "Sadzba agentúry",
      baseHoraire: "Hodinová základňa",
      coutMensuel: "Mesačné náklady",
      duree: "Trvanie",
      coutTotal: "Celkové náklady",
    },
    signature: {
      title: "Elektronický podpis",
      intro: "Potvrdzujem, že som si prečítal(a) a súhlasím s podmienkami tejto ponuky.",
      nomComplet: {
        label: "Celé meno",
        placeholder: "Ján Novák",
      },
      email: {
        label: "Potvrdzovací e-mail",
        placeholder: "jan.novak@firma.sk",
      },
      checkbox: "Prijímam všeobecné obchodné podmienky",
      boutonSigner: "Elektronicky podpísať",
      enCours: "Podpisovanie...",
      succes: "✓ Ponuka bola úspešne podpísaná!",
      erreur: "Chyba pri podpisovaní. Skúste to prosím znova.",
    },
    actions: {
      modifier: "Upraviť ponuku",
      telecharger: "Stiahnuť PDF",
      partager: "Zdieľať",
    },
  },
};
