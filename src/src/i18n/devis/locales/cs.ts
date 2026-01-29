/**
 * 🇨🇿 ČESKÝ PŘEKLAD - FORMULÁŘ PRO ŽÁDOST O NABÍDKU
 * 
 * Kompletní české překlady pro formulář žádosti o nabídku
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const cs: DevisTranslations = {
  // === OBECNÉ ===
  common: {
    next: "Další",
    previous: "Předchozí",
    submit: "Odeslat",
    required: "*",
    optional: "(volitelné)",
    loading: "Načítání...",
    error: "Chyba",
    success: "Úspěch",
    cancel: "Zrušit",
    save: "Uložit",
    edit: "Upravit",
    delete: "Smazat",
    confirm: "Potvrdit",
    euro: "€",
    perHour: "/hod",
    perMonth: "/měs",
    perDay: "/den",
    persons: "osob(a/y)",
    hours: "hodin(a/y)",
    days: "den/dnů",
    months: "měsíc(e/ů)",
    year: "rok/let",
  },

  // === NAVIGACE ===
  navigation: {
    back: "Zpět",
    stepOf: "Krok {step} z {total}",
    steps: {
      entreprise: {
        title: "Společnost",
        badge: "🏢 Vaše společnost",
      },
      contact: {
        title: "Kontakt",
        badge: "👤 Vaše kontaktní osoba",
      },
      besoins: {
        title: "Požadavky",
        badge: "💼 Vaše požadavky",
      },
      conditions: {
        title: "Podmínky",
        badge: "📋 Podmínky",
      },
      candidats: {
        title: "Kandidáti",
        badge: "👷 Hledaný profil",
      },
      recapitulatif: {
        title: "Souhrn",
        badge: "✅ Souhrn",
      },
    },
  },

  // === VALIDACE ===
  validation: {
    fillRequired: "Vyplňte prosím všechna povinná pole",
    selectRegion: "Vyberte prosím region",
    addAtLeastOnePosition: "Přidejte prosím alespoň jednu pozici",
    invalidEmail: "Zadejte prosím platnou e-mailovou adresu",
    invalidPhone: "Zadejte prosím platné telefonní číslo",
    invalidSIRET: "Zadejte prosím platné číslo SIRET (14 číslic)",
    dateRequired: "Zadejte prosím datum zahájení",
    missionLocationRequired: "Zadejte prosím místo mise",
  },

  // === ZPRÁVY ===
  messages: {
    success: {
      quoteSent: "Žádost o nabídku byla úspěšně odeslána!",
      redirecting: "Přesměrování...",
    },
    error: {
      submitError: "Chyba při odesílání žádosti o nabídku",
      genericError: "Došlo k chybě",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Žádost o nabídku | YOJOB",
    pageDescription: "Požádejte o nabídku pro vaše evropské požadavky na dočasné zaměstnání.",
  },

  // === KROK 1: SPOLEČNOST ===
  step1: {
    title: "Informace o společnosti",
    subtitle: "Zadejte právní informace o vaší uživatelské společnosti.",
    fields: {
      pays: {
        label: "Země",
        placeholder: "Vyberte zemi",
      },
      raisonSociale: {
        label: "Obchodní název",
        placeholder: "Např.: YOJOB s.r.o.",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 číslic",
        helper: "Identifikační číslo vašeho závodu",
      },
      codeAPE: {
        label: "Kód APE/NAF",
        placeholder: "Např.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Intrakomunitární DIČ",
        placeholder: "Např.: CZ12345678",
      },
      adresse: {
        label: "Úplná adresa",
        placeholder: "Číslo popisné a název ulice",
      },
      codePostal: {
        label: "PSČ",
        placeholder: "Např.: 110 00",
      },
      ville: {
        label: "Město",
        placeholder: "Např.: Praha",
      },
      region: {
        label: "Region/Kraj",
        placeholder: "Vyberte region",
        placeholderOtherCountry: "Např.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Webové stránky",
        placeholder: "https://www.priklad.cz",
      },
    },
    infoMessage: "✓ Tyto informace budou použity k vytvoření vaší personalizované nabídky",
  },

  // === KROK 2: KONTAKT ===
  step2: {
    title: "Kontaktní osoba",
    subtitle: "Kdo bude vaší primární kontaktní osobou pro tento projekt?",
    fields: {
      civilite: {
        label: "Oslovení",
        options: {
          m: "Pan",
          mme: "Paní",
        },
      },
      nom: {
        label: "Příjmení",
        placeholder: "Např.: Novák",
      },
      prenom: {
        label: "Jméno",
        placeholder: "Např.: Jan",
      },
      fonction: {
        label: "Funkce",
        placeholder: "Např.: HR manažer",
      },
      email: {
        label: "Pracovní e-mail",
        placeholder: "jan.novak@spolecnost.cz",
      },
      telephone: {
        label: "Telefon",
        placeholder: "+420 777 123 456",
      },
    },
  },

  // === KROK 3: POŽADAVKY ===
  step3: {
    title: "Vaše požadavky na nábor",
    subtitle: "Popište hledané profily a jejich podmínky.",
    profileLabel: "Profil",
    addProfile: "Přidat další profil",
    removeProfile: "Odebrat tento profil",
    loadingConfig: "Načítání konfigurace...",
    missingRegionWarning: "⚠️ Vyberte prosím svůj region v kroku 1 pro automatické zobrazení platů.",
    fields: {
      secteur: {
        label: "Odvětví činnosti",
        placeholder: "Vyberte odvětví",
      },
      convention: {
        label: "Kolektivní smlouva",
        placeholder: "Automaticky podle odvětví",
      },
      poste: {
        label: "Hledaná pozice",
        placeholder: "Vyberte pozici",
      },
      classification: {
        label: "Klasifikace / Kvalifikace",
        placeholder: "Vyberte klasifikaci",
      },
      quantite: {
        label: "Počet osob",
        placeholder: "Např.: 5",
        helper: "Kolik osob je potřeba na tuto pozici?",
      },
      salaireBrut: {
        label: "Hrubá měsíční mzda",
        placeholder: "Např.: 2500",
        helper: "Hrubá mzda na základě 151,67 hod/měsíc",
      },
      nationalite: {
        label: "Státní příslušnost pracovníků",
        placeholder: "Vyberte zemi",
        helper: "Státní příslušnost ovlivňuje koeficient sazby agentury",
      },
    },
    ajouterPoste: "Přidat další pozici",
    supprimerPoste: "Odebrat tuto pozici",
    posteNumero: "Pozice",
    coefficientInfo: {
      title: "💡 Aplikovaný koeficient agentury",
      base: "Základní koef.",
      facteurPays: "Faktor země",
      final: "Konečný koeficient",
    },
    summary: {
      title: "Odměna pracovníka",
      salaireBrutMensuel: "Hrubá měsíční mzda",
      tauxHoraireBrut: "Hrubá hodinová sazba",
      baseMensuelle: "(Základna 151,67 hod/měs podle kolektivní smlouvy)",
    },
  },

  // === KROK 4: PODMÍNKY ===
  step4: {
    title: "Pracovní podmínky",
    subtitle: "Upřesněte podmínky zaměstnání a nabízené výhody.",
    dateError: "Datum ukončení musí být po datu zahájení",
    fields: {
      dateDebut: {
        label: "Požadované datum zahájení",
        placeholder: "DD/MM/RRRR",
      },
      dateFin: {
        label: "Předpokládané datum ukončení",
        placeholder: "DD/MM/RRRR",
        helper: "Ponechte prázdné pro neurčitou dobu",
      },
      baseHoraire: {
        label: "Měsíční hodinová základna",
        placeholder: "Např.: 151,67",
        helper: "Zákonná základna ve Francii: 151,67 hod/měsíc (35 hod/týden)",
      },
      lieuxMission: {
        label: "Místa mise",
        placeholder: "Např.: Praha centrum, Brno zóna 3, Ostrava...",
      },
      periodeEssai: {
        label: "Zkušební doba",
        placeholder: "Vyberte dobu trvání",
        options: {
          '2': '2 dny',
          '3': '3 dny',
          '5': '5 dnů',
          '15': '15 dnů',
        },
      },
      motifRecours: {
        label: "Důvod dočasného zaměstnání",
        placeholder: "Vyberte důvod",
        options: {
          accroissement: "Dočasné zvýšení činnosti",
          remplacement: "Nahrazení nepřítomného zaměstnance",
          saisonnier: "Sezónní práce",
          exportation: "Výjimečná exportní zakázka",
          autre: "Jiné (upřesnit)",
        },
      },
      delaiPaiement: {
        label: "Požadovaná lhůta splatnosti",
        placeholder: "Vyberte lhůtu",
        options: {
          reception: "Platba při přijetí",
          j30: "30 dní",
          j45: "45 dní",
          j60: "60 dní",
        },
      },
    },
    hebergement: {
      title: "Ubytování",
      chargeEU: {
        label: "Ubytování zajištěno uživatelskou společností",
        helper: "Pokud NE: agentura bude účtovat příplatek +3,50 €/hod",
      },
      supplementWarning: "⚠️ Bude účtován příplatek +3,50 €/hod, protože ubytování není zajištěno",
      commentaire: {
        label: "Podrobnosti o ubytování",
        placeholder: "Typ ubytování, adresa, zvláštní podmínky...",
      },
    },
    transport: {
      title: "Místní doprava",
      chargeETT: {
        label: "Místní doprava zajištěna agenturou",
        helper: "Pokud ANO: bude účtován příplatek +1,50 €/hod",
      },
      supplementInfo: "✓ Bude účtován příplatek +1,50 €/hod na pokrytí nákladů na místní dopravu",
    },
    repas: {
      title: "Stravování",
      options: {
        restaurant: "Podniková jídelna / Stravenky",
        panier: "Stravné (účtováno denně)",
        nonConcerne: "Netýká se",
      },
      montantInfo: "📋 Výše stravného: {montant} / odpracovaný den (účtováno samostatně)",
      montantNonDefini: "⚠️ Částka není definována pro tuto zemi/region",
    },
    sections: {
      hebergement: {
        title: "Ubytování",
        chargeEU: {
          label: "Ubytování zajištěno uživatelskou společností",
          helper: "Pokud NE: agentura bude účtovat příplatek +3,50 €/hod",
          options: {
            oui: "Ano, zajištěno uživatelem",
            non: "Ne, hradí pracovník",
          },
        },
        detailsEU: {
          type: {
            label: "Typ ubytování",
            options: {
              hotel: "Hotel",
              appartement: "Byt",
              foyer: "Ubytovna",
              autre: "Jiné",
            },
          },
          adresse: {
            label: "Adresa ubytování",
            placeholder: "Úplná adresa ubytování",
          },
        },
      },
      transportInternational: {
        title: "Mezinárodní doprava (země původu ↔ Francie)",
        chargeEU: {
          label: "Doprava zajištěna uživatelskou společností",
          helper: "Cesty mezi zemí původu a místem mise",
          options: {
            oui: "Ano, zajištěno uživatelem",
            non: "Ne, hradí pracovník",
          },
        },
        detailsEU: {
          type: {
            label: "Typ dopravy",
            options: {
              avion: "Letadlo",
              train: "Vlak",
              bus: "Autobus",
              covoiturage: "Organizované spolujíždění",
            },
          },
          frequence: {
            label: "Frekvence cest",
            options: {
              allerRetour: "Pouze počáteční tam a zpět",
              hebdomadaire: "Týdně",
              mensuel: "Měsíčně",
            },
          },
        },
      },
      transportLocal: {
        title: "Místní doprava",
        chargeETT: {
          label: "Místní doprava zajištěna agenturou",
          helper: "Pokud ANO: bude účtován příplatek +1,50 €/hod",
          options: {
            oui: "Ano, zajištěno agenturou",
            non: "Ne, hradí pracovník",
          },
        },
        detailsETT: {
          type: {
            label: "Typ dopravy",
            options: {
              vehicule: "Služební vozidlo",
              transport: "Veřejná doprava",
              velo: "Kolo",
            },
          },
        },
      },
      repas: {
        title: "Stravování",
        type: {
          label: "Typ stravování",
          options: {
            restaurant: "Podniková jídelna / Stravenky",
            panier: "Stravné (účtováno denně)",
            nonConcerne: "Netýká se",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Denní rozpočet",
            placeholder: "Částka v €",
          },
        },
        detailsPanier: {
          info: "Stravné bude účtováno samostatně za každý odpracovaný den",
        },
      },
    },
  },

  // === KROK 5: KANDIDÁTI ===
  step5: {
    title: "Profil kandidátů",
    subtitle: "Definujte kompetence a konkrétní požadavky.",
    sections: {
      experience: {
        title: "Profesní zkušenosti",
        obligatoire: {
          label: "Povinné zkušenosti",
        },
        annees: {
          label: "Minimální roky zkušeností",
          placeholder: "Např.: 3",
          options: {
            '0-1': "Začátečník (0-1 rok)",
            '1-3': "Střední (1-3 roky)",
            '3-5': "Potvrzené (3-5 let)",
            '5+': "Expert (5 let a více)",
          },
        },
        competences: {
          label: "Požadované technické kompetence",
          placeholder: "Např.: Zednictví, bednění, čtení plánů, TIG svařování...",
        },
      },
      formation: {
        title: "Vzdělání",
        obligatoire: {
          label: "Povinné vzdělání",
        },
        type: {
          label: "Typ vzdělání",
          placeholder: "Např.: Vyučen zedník, CACES R489...",
        },
      },
      travailRisque: {
        title: "Riziková práce",
        active: {
          label: "Specifická riziková práce",
        },
        precisions: {
          label: "Upřesnění ohledně rizik",
          placeholder: "Např.: Práce ve výšce, manipulace s těžkými břemeny...",
        },
      },
      langues: {
        title: "Jazykové dovednosti",
        francais: {
          label: "Požadovaná úroveň francouzštiny",
          placeholder: "Vyberte úroveň",
          options: {
            a1: "A1 - Začátečník",
            a2: "A2 - Mírně pokročilý",
            b1: "B1 - Střední",
            b2: "B2 - Pokročilý",
            c1: "C1 - Velmi pokročilý",
            c2: "C2 - Rodilý mluvčí",
            natif: "Rodilý mluvčí",
          },
        },
        autres: {
          label: "Další užitečné jazyky",
          placeholder: "Např.: Angličtina (B1), Němčina (A2)...",
        },
        languageNames: {
          francais: "Francouzština",
          anglais: "Angličtina",
          portugais: "Portugalština",
          espagnol: "Španělština",
          italien: "Italština",
          autre: "Jiný",
        },
        levels: {
          'non-requis': "Není požadováno",
          'A1': "A1 - Začátečník",
          'A2': "A2 - Mírně pokročilý",
          'B1': "B1 - Střední",
          'B2': "B2 - Pokročilý",
          'C1': "C1 - Autonomní",
          'C2': "C2 - Rodilý mluvčí",
        },
      },
      permis: {
        title: "Řidičský průkaz",
        requis: {
          label: "Požadovaný řidičský průkaz",
          options: {
            aucun: "Řidičský průkaz není vyžadován",
            b: "Řidičský průkaz sk. B (osobní automobil)",
            c: "Řidičský průkaz sk. C (nákladní automobil)",
            ce: "Řidičský průkaz sk. CE (nákladní automobil + přívěs)",
            d: "Řidičský průkaz sk. D (přeprava osob)",
          },
        },
        categorie: {
          label: "Skupina řidičského průkazu",
          placeholder: "Např.: B, C, CE...",
        },
      },
      outillage: {
        title: "Ruční nářadí",
        requis: {
          label: "Požadované vlastní nářadí",
        },
        type: {
          label: "Typ nářadí",
          placeholder: "Např.: Kladivo, vodováha, svinovací metr, hladítko...",
        },
      },
      epi: {
        title: "Osobní ochranné prostředky (OOP)",
        infoLegale: "ℹ️ Podle předpisů musí zaměstnavatel poskytnout OOP přizpůsobené rizikům pozice.",
        selectionCount: "✓ {count} vybraných OOP",
        fournis: {
          label: "OOP poskytnuté společností",
          helper: "Přilba, bezpečnostní obuv, rukavice atd.",
          options: {
            oui: "Ano, poskytnuté uživatelem",
            non: "Ne, hradí pracovník",
          },
        },
        liste: {
          label: "Seznam potřebných OOP",
          placeholder: "Např.: Přilba, obuv S3, rukavice proti řezání, bezpečnostní postroj...",
        },
        items: {
          casque: "Ochranná přilba",
          lunettes: "Ochranné brýle",
          protections_auditives: "Ochrana sluchu",
          gants: "Ochranné rukavice",
          chaussures: "Bezpečnostní obuv",
          harnais: "Bezpečnostní postroj",
          vetements: "Pracovní oděv",
          masque: "Respirátor",
          protection_faciale: "Obličejový štít",
          vetements_visibilite: "Oblečení s vysokou viditelností",
        },
      },
      autresExigences: {
        title: "Další požadavky",
        label: "Další specifické požadavky",
        placeholder: "Např.: Elektrikářské oprávnění, CACES, dostupnost o víkendech, práce ve výšce...",
      },
    },
  },

  // === SOUHRN ===
  recapitulatif: {
    title: "Souhrn vaší žádosti",
    subtitle: "Zkontrolujte informace před odesláním vaší žádosti o nabídku.",
    acceptConditionsError: "Před pokračováním přijměte prosím podmínky",
    entreprise: {
      title: "Společnost",
      raisonSociale: "Obchodní název",
      siret: "SIRET",
      pays: "Země",
      ville: "Město",
      region: "Region/Kraj",
    },
    contact: {
      title: "Kontakt",
      nomPrenom: "Jméno a příjmení",
      email: "E-mail",
      telephone: "Telefon",
      fonction: "Funkce",
    },
    postes: {
      title: "Požadované pozice",
      coeffETT: "📊 Aplikovaný koeficient agentury",
      coeffBase: "Základní koef.",
      facteurPays: "Faktor země",
      supplementsHoraires: "✨ Hodinové příplatky (zahrnuty v sazbě)",
      hebergement: "✓ Ubytování",
      transport: "✓ Místní doprava",
      panierRepas: "🍽️ Stravné (účtováno denně)",
      baseHoraire: "📅 Hodinová základna: {heures} hod/měs (zjištěny přesčasy)",
      heuresNormales: "Normální hodiny (0-35 hod/týden)",
      heuresSup25: "Přesčasy +25% (36.-43. hod)",
      heuresSup50: "Přesčasy +50% (44.+ hod)",
      sousTotal: "Mezisoučet práce (na osobu)",
      tauxHoraireBrut: "Hrubá hodinová sazba",
      tauxETTFinal: "Konečná sazba agentury",
      coutMensuel: "Celkové měsíční náklady",
    },
    conditions: {
      title: "Podmínky mise",
      dateDebut: "Datum zahájení",
      dateFin: "Datum ukončení",
      dureeEstimee: "Odhadovaná doba trvání",
      lieuMission: "Místo mise",
      mois: "měsíc(e/ů)",
    },
    majorations: {
      title: "Tarifní úpravy zakázky",
      total: "Celkem úpravy",
      notSet: "Není definováno",
    },
    totaux: {
      mensuelHT: "Celkem měsíčně bez DPH",
      mensuelTTC: "Celkem měsíčně s DPH",
      totalMission: "Celkové náklady mise",
    },
    noteLegale: "ℹ️ Tento odhad je orientační. Konečná sazba bude potvrzena po schválení naším týmem a vybranou partnerskou agenturou.",
    acceptConditions: {
      text: "Souhlasím s tím, že moje údaje budou zpracovány v souladu s",
      lien: "zásadami ochrany osobních údajů",
    },
    boutonEnvoi: {
      texte: "Odeslat mou žádost o nabídku",
      enCours: "Odesílání...",
    },
    footer: "✓ Odpověď do 24 pracovních hodin • ✓ Bez závazků",
  },

  // === CHYBY ===
  errors: {
    required: "Toto pole je povinné",
    invalidEmail: "Neplatná e-mailová adresa",
    invalidSIRET: "Neplatné SIRET (vyžadováno 14 číslic)",
    invalidPhone: "Neplatné telefonní číslo",
    minValue: "Hodnota musí být větší nebo rovna {min}",
    maxValue: "Hodnota musí být menší nebo rovna {max}",
    genericError: "Došlo k chybě. Zkuste to prosím znovu.",
    loadingError: "Chyba při načítání dat",
    submitError: "Chyba při odesílání žádosti",
  },

  // === ODVĚTVÍ & PROFESE ===
  secteurs: {
    batiment: {
      label: "Stavebnictví",
      convention: "Národní kolektivní smlouva stavební dělníci (3193)",
      postes: {
        macon: "Zedník",
        coffreur: "Tesař na bednění",
        ferrailleur: "Armovač",
        carreleur: "Obkladač",
        platrier: "Sádrokartonář",
        peintre: "Malíř",
        plombier: "Instalatér",
        electricien: "Elektrikář",
        couvreur: "Pokrývač",
        menuisier: "Truhlář",
        chef_equipe_batiment: "Vedoucí čety",
        chef_chantier: "Stavbyvedoucí",
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
      convention: "Kolektivní smlouva kovovýroba (3109)",
      postes: {
        soudeur: "Svářeč",
        chaudronnier: "Kotlář",
        tuyauteur: "Potrubář",
        tourneur: "Soustružník",
        fraiseur: "Frézař",
        usineur: "CNC operátor",
        mecanicien_industriel: "Průmyslový mechanik",
        monteur: "Montér",
        controleur_qualite: "Kontrolor kvality",
        ajusteur: "Zámečník",
        chef_equipe_metallurgie: "Vedoucí čety",
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
      label: "Veřejné práce",
      convention: "Národní kolektivní smlouva veřejné práce (3005)",
      postes: {
        conducteur_engins: "Obsluha strojů",
        terrassier: "Výkopový dělník",
        canalisateur: "Kanalizační dělník",
        constructeur_routes: "Silničář",
        coffreur_bancheur: "Tesař na bednění",
        macon_vrd: "Zedník VRD",
        chef_equipe_tp: "Vedoucí čety VP",
        manoeuvre_tp: "Pomocný dělník VP",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelnictví",
      convention: "Kolektivní smlouva hotely-restaurace (3292)",
      postes: {
        receptionniste: "Recepční",
        femme_chambre: "Pokojská",
        agent_entretien: "Pracovník údržby",
        bagagiste: "Vrátný pro zavazadla",
        concierge: "Portýr",
        night_audit: "Noční auditor",
        gouvernante: "Vrchní pokojská",
        chef_reception: "Vedoucí recepce",
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
      label: "Restaurace",
      convention: "Kolektivní smlouva hotely-restaurace (3292)",
      postes: {
        cuisinier: "Kuchař",
        commis_cuisine: "Pomocný kuchař",
        chef_partie: "Chef de partie",
        serveur: "Číšník",
        barman: "Barman",
        plongeur: "Pomocník v kuchyni",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Šéfkuchař",
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
      label: "Plastikářství",
      convention: "Kolektivní smlouva plastikářství (0292)",
      postes: {
        operateur_injection: "Operátor vstřikování",
        operateur_extrusion: "Operátor extruze",
        regleur: "Seřizovač",
        operateur_thermoformage: "Operátor termoformování",
        controleur_qualite_plasturgie: "Kontrolor kvality",
        technicien_maintenance: "Technik údržby",
        chef_equipe_plasturgie: "Vedoucí čety",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    automobile_carrosserie: {
      label: "Automobilový průmysl & Karoserie",
      convention: "Kolektivní smlouva opravy automobilů (1090)",
      postes: {
        carrossier: "Karosář",
        peintre_automobile: "Automobilový lakýrník",
        mecanicien_auto: "Automechanik",
        electricien_auto: "Autoelektrikář",
        chef_atelier: "Vedoucí dílny",
        controleur_technique: "Technický kontrolor",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    sylviculture: {
      label: "Lesnictví",
      convention: "Kolektivní smlouva zemědělství (7501)",
      postes: {
        bucheron: "Dřevorubec",
        elagueur: "Ořezávač stromů",
        conducteur_engins_forestiers: "Operátor lesní techniky",
        chef_equipe_sylviculture: "Vedoucí čety lesnictví",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    cartonnerie: {
      label: "Kartónování",
      convention: "Kolektivní smlouva zpracovatelský průmysl (3107)",
      postes: {
        operateur_production: "Výrobní operátor",
        conducteur_ligne: "Vedoucí linky",
        regleur_cartonnerie: "Seřizovač",
        chef_equipe_cartonnerie: "Vedoucí čety",
      },
      classifications: {
        niveau_1: "Úroveň I",
        niveau_2: "Úroveň II",
        niveau_3: "Úroveň III",
        niveau_4: "Úroveň IV",
      },
    },
    autre: {
      label: "Jiné",
      convention: "Určit podle činnosti",
      postes: {
        autre_poste: "Jiná pozice (upřesnit)",
      },
      classifications: {
        a_definir: "Určit",
      },
    },
  },

  // === EVROPSKÉ ZEMĚ ===
  pays: {
    france: "Francie",
    allemagne: "Německo",
    autriche: "Rakousko",
    belgique: "Belgie",
    bulgarie: "Bulharsko",
    croatie: "Chorvatsko",
    chypre: "Kypr",
    danemark: "Dánsko",
    espagne: "Španělsko",
    estonie: "Estonsko",
    finlande: "Finsko",
    grece: "Řecko",
    hongrie: "Maďarsko",
    irlande: "Irsko",
    italie: "Itálie",
    lettonie: "Lotyšsko",
    lituanie: "Litva",
    luxembourg: "Lucembursko",
    malte: "Malta",
    pays_bas: "Nizozemsko",
    pologne: "Polsko",
    portugal: "Portugalsko",
    republique_tcheque: "Česká republika",
    roumanie: "Rumunsko",
    slovaquie: "Slovensko",
    slovenie: "Slovinsko",
    suede: "Švédsko",
  },

  // === STRÁNKA SOUHRN NABÍDKY (PODPIS) ===
  pageRecap: {
    header: {
      title: "Souhrn nabídky",
      exportPDF: "Exportovat do PDF",
      loading: "Načítání nabídky...",
      notFound: "Nabídka nenalezena",
    },
    statut: {
      signe: "Podepsáno",
      nouveau: "Nové",
    },
    dates: {
      creeLe: "Vytvořeno",
      a: "v",
      signeLe: "Podepsáno",
      derniereModification: "Poslední změna:",
    },
    entreprise: {
      title: "Informace o společnosti",
      raisonSociale: "Obchodní název",
      siret: "SIRET",
      codeAPE: "Kód APE",
      tvaIntracommunautaire: "Intrakomunitární DIČ",
      adresse: "Adresa",
      siteInternet: "Webové stránky",
    },
    contact: {
      title: "Kontaktní osoba",
      nomComplet: "Celé jméno",
      fonction: "Funkce",
      email: "E-mail",
      telephonePortable: "Mobilní telefon",
      telephoneFixe: "Pevná linka",
    },
    postes: {
      title: "Pozice k obsazení",
      nationalite: "Státní příslušnost",
      salaireBrut: "Hrubá mzda",
      tauxHoraireBrut: "Hrubá hodinová sazba",
      coefficientETT: "Koeficient agentury",
      tauxETT: "Sazba agentury",
    },
    conditions: {
      title: "Pracovní podmínky",
      dateDebut: "Datum zahájení",
      dateFin: "Datum ukončení",
      periodeEssai: "Zkušební doba",
      baseHoraire: "Hodinová základna",
      heuresMois: "hod/měs",
      lieuxMission: "Místa mise",
      motifRecours: "Důvod dočasného zaměstnání",
    },
    exigences: {
      title: "Požadavky na kandidáty",
      experience: "Zkušenosti",
      competences: "Kompetence",
      langues: "Jazyky",
      permis: "Řidičské průkazy",
      epi: "OOP",
    },
    calculs: {
      title: "Výpočty sazeb",
      salaireBrut: "Hrubá mzda",
      coefficientETT: "Koeficient agentury",
      tauxHoraireBrut: "Hrubá hodinová sazba",
      tauxETT: "Sazba agentury",
      baseHoraire: "Hodinová základna",
      coutMensuel: "Měsíční náklady",
      duree: "Doba trvání",
      coutTotal: "Celkové náklady",
    },
    signature: {
      title: "Elektronický podpis",
      intro: "Potvrzujem, že jsem si přečetl(a) a souhlasím s podmínkami této nabídky.",
      nomComplet: {
        label: "Celé jméno",
        placeholder: "Jan Novák",
      },
      email: {
        label: "Potvrzovací e-mail",
        placeholder: "jan.novak@spolecnost.cz",
      },
      checkbox: "Přijímám všeobecné obchodní podmínky",
      boutonSigner: "Elektronicky podepsat",
      enCours: "Podepisování...",
      succes: "✓ Nabídka byla úspěšně podepsána!",
      erreur: "Chyba při podepisování. Zkuste to prosím znovu.",
    },
    actions: {
      modifier: "Upravit nabídku",
      telecharger: "Stáhnout PDF",
      partager: "Sdílet",
    },
  },
};