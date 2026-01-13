/**
 * 🇱🇻 LATVIEŠU TULKOJUMI - VISPĀRĪGIE DARĪJUMA NOSACĪJUMI (VDN)
 * 
 * @version 1.0.0
 */

export const cgvLV = {
  hero: {
    badge: "B2B dokuments - Līgumisks",
    title: "Vispārīgie darījuma nosacījumi",
    subtitle: "VDN piemērojami Lietotājuzņēmumiem (LU) un pagaidu nodarbinātības partneraģentūrām",
    effectiveDate: "Versija spēkā no 2025. gada 19. decembra"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Starpnieks / Biznesa brokeris"
    },
    eu: {
      title: "Lietotājuzņēmums (LU)",
      description: "Gala klients, kas saņem darbaspēku"
    },
    ett: {
      title: "Pagaidu nodarbinātības aģentūra",
      description: "Personāla atlases partneris"
    }
  },

  sections: {
    article0: {
      title: "0. pants - Pakalpojumu sniedzēja identitāte",
      fields: {
        legalForm: "Juridiskā forma",
        legalFormValue: "Individuālais uzņēmējs (EI)",
        manager: "Vadītājs",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Iekšējās tirdzniecības PVN",
        vatValue: "FR79447862764",
        address: "Adrese",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakti",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Profesionālās atbildības apdrošināšana",
        description: "YOJOB ir profesionālās atbildības apdrošināšana, kas sedz tā atbildības finansiālās sekas saistībā ar tā pakalpojumiem."
      }
    },

    article1: {
      title: "1. pants - Definīcijas",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Starpnieks/biznesa brokeris, kas nodrošina biznesa piedāvājumu iegādi, kvalifikāciju, koordināciju un formalizāciju starp LU un aģentūrām."
        },
        eu: {
          term: "Lietotājuzņēmums (LU)",
          definition: "Gala klienta uzņēmums, kas saņem darbaspēku, ko nodrošina pagaidu nodarbinātības partneraģentūra."
        },
        ett: {
          term: "Pagaidu nodarbinātības aģentūra / Partneraģentūra",
          definition: "Pagaidu nodarbinātības aģentūra, kas veic personāla atlasi, līgumu noslēgšanu un personāla nodrošināšanas organizēšanu."
        },
        profile: {
          term: "Profils",
          definition: "Kandidāts vai pagaidu darbinieks, ko aģentūra iepazīstina LU ar YOJOB starpniecību."
        },
        mission: {
          term: "Misija",
          definition: "LU izteikta personāla atlases vajadzība (profesija, apjoms, termiņi, atrašanās vieta, īpašās prasības)."
        },
        proposition: {
          term: "Trīspusējs piedāvājums",
          definition: "YOJOB strukturēts un LU un aģentūras apstiprināts biznesa un administratīvais piedāvājums (paraksts vai rakstisks līgums)."
        },
        handover: {
          term: "Nodošana",
          definition: "Brīdis, kad aģentūra kļūst par LU galveno kontaktu pēc divkāršas validācijas LU + aģentūra."
        },
        insurer: {
          term: "Kredīta apdrošinātājs",
          definition: "Kredīta apdrošināšanas organizācija (COFACE, Allianz Trade u.c.), kas piedalās klienta riska analīzē un kredīta limitu piešķiršanā."
        }
      }
    },

    article2: {
      title: "2. pants - Priekšmets",
      intro: "Šie VDN reglamentē YOJOB pakalpojumus, kas galvenokārt sastāv no:",
      steps: {
        step1: {
          title: "Iegāde un kvalifikācija",
          description: "Lietotājuzņēmumu ar Eiropas personāla atlases vajadzībām identificēšana un kvalifikācija"
        },
        step2: {
          title: "Iespēju prezentācija",
          description: "Kvalificētu iespēju nodošana atbilstošām pagaidu nodarbinātības partneraģentūrām"
        },
        step3: {
          title: "Piedāvājuma strukturēšana",
          description: "Detalizēta biznesa piedāvājuma sagatavošana (apjoms, koordinācija, administratīvie elementi)"
        },
        step4: {
          title: "Nodošanas organizēšana",
          description: "Pārejas nodrošināšana aģentūrai pēc parakstīšanas realizācijai (personāla atlase, nodrošināšana, rēķinu izrakstīšana)"
        }
      },
      yojobRole: {
        title: "YOJOB loma",
        description: "YOJOB darbojas tikai kā starpnieks. Aģentūra ir atbildīga par personāla atlasi, nodrošināšanu, darba devēja atbilstību un rēķinu izrakstīšanu LU, izņemot gadījumus, kad līgumā skaidri paredzēts citādi."
      }
    },

    article3: {
      title: "3. pants - Līguma dokumenti un hierarhija",
      intro: "Dokumentu pretrunu gadījumā tiek piemērota šāda prioritāšu secība:",
      hierarchy: {
        rank1: {
          title: "Īpašs līgums / Īpaši nosacījumi",
          subtitle: "Personalizēta partnerība vai biznesa ieguldījums"
        },
        rank2: {
          title: "Trīspusējs piedāvājums / Piedāvājums / Pasūtījums",
          subtitle: "Pušu parakstīts dokuments"
        },
        rank3: {
          title: "Vispārīgie darījuma nosacījumi (VDN)",
          subtitle: "Šis dokuments"
        },
        rank4: {
          title: "Pielikumi",
          subtitle: "SLA, DPA, procesi, kontrolsaraksti u.c."
        }
      }
    },

    article4: {
      title: "4. pants - Līguma shēmas",
      intro: "Piemērojamā shēma ir norādīta piedāvājumā vai līgumā. YOJOB var darboties pēc 3 modeļiem:",
      schemes: {
        schemaB: {
          label: "B shēma",
          badge: "Galvenā",
          title: "Aģentūra YOJOB klients",
          description: "YOJOB atlīdzina aģentūra par biznesa ieguldījumu (ikmēneša komisija un/vai panākumu atlīdzība)"
        },
        schemaA: {
          label: "A shēma",
          badge: "Izvēles",
          title: "LU YOJOB klients",
          description: "YOJOB izraksta rēķinu LU par papildu pakalpojumiem (pastiprināta koordinācija, paplašināts dokumentācijas atbalsts)"
        },
        schemaC: {
          label: "C shēma",
          badge: "Jaukta",
          title: "Kombinēta atlīdzība",
          description: "YOJOB atlīdzina aģentūra (B shēma) UN izraksta rēķinu LU par papildu pakalpojumiem (A shēma)"
        }
      }
    },

    article5: {
      title: "5. pants - Process un nodošana",
      phase1: {
        title: "5.1 Ievada fāze (biznesa un koordinācija)",
        intro: "YOJOB nodrošina:",
        items: [
          "Lietotājuzņēmuma iegādi un kvalifikāciju",
          "Misijai nepieciešamo elementu vākšanu",
          "Vajadzības nodošanu vienai vai vairākām pagaidu nodarbinātības partneraģentūrām",
          "Koordināciju līdz trīspusējā piedāvājuma slēgšanai"
        ]
      },
      phase2: {
        title: "5.2 Nodošanas aktivizēšana",
        intro: "\"Nodošana\" notiek pēc divu kumulatīvu nosacījumu izpildes:",
        conditions: [
          "LU paraksts/rakstisks līgums piedāvājumam",
          "Aģentūras akceptēšana/validācija (spēja, nosacījumi, atbilstība, risks)"
        ],
        consequences: "No šī brīža aģentūra kļūst par galveno kontaktu: personāla atlase, līgumi, ievadīšana, nodrošināšana, algas, nosūtīšanas pienākumi, rēķinu izrakstīšana un iekasēšana no LU."
      },
      phase3: {
        title: "5.3 Atlikušie atbalsti (ja paredzēts)",
        description: "YOJOB var palikt kā atbalsts (koordinācija/kvalitāte) piedāvājumā vai līgumā noteiktajā apmērā."
      }
    },

    article6: {
      title: "6. pants - Finanšu nosacījumi un maksājuma veids",
      section1: {
        title: "6.1 Princips: \"selektīvi\" termiņi katram gadījumam",
        intro: "Ņemot vērā nozares praksi (kredīta apdrošināšana, klienta risks, rēķinu izrakstīšanas organizācija), maksājuma nosacījumi tiek noteikti katram gadījumam spēkā esošajā piedāvājumā/līgumā.",
        modalitiesTitle: "Modalitātes var ietvert:",
        modalities: [
          "Maksājums saņemot",
          "Priekšapmaksa / avanss",
          "Iknedēļas rēķinu izrakstīšana",
          "Garantijas (depozīts, kredīta limita ierobežošana)"
        ],
        legalLimit: "Kad tiek piešķirts maksājuma termiņš \"ar termiņu\", tiek ievēroti juridiskie ierobežojumi: 60 dienas no rēķina izsniegšanas datuma vai 45 dienas mēneša beigās, ja norādīts."
      },
      section2: {
        title: "6.2 Standarta tīkls — LU \"riski\"",
        intro: "Riska klasifikācija tiek noteikta no 3 kumulatīviem avotiem:",
        sources: {
          insurer: {
            title: "Kredīta apdrošinātājs",
            description: "Segums/kredīta limits/nosacījumi"
          },
          score: {
            title: "Aģentūras iekšējais novērtējums",
            description: "Riska un iekasēšanas politika"
          },
          history: {
            title: "Maksājumu vēsture",
            description: "Uzvedība un riska pakāpe"
          }
        },
        primacy: "Prioritāte: pretrunu gadījumā kredīta apdrošinātāja lēmumam ir prioritāte pār citiem signāliem.",
        levelsTitle: "Riska līmeņi un maksājuma nosacījumi",
        levels: {
          r0: {
            level: "R0",
            title: "Standarta",
            trigger: "Apdrošinātājs: segts / kredīta limits OK; Aģentūras novērtējums: A/B; Vēsture: laba (0 incidenti)",
            conditions: "Ikmēneša + vienots termiņš (piemēram, 30d) juridiskā limita ietvaros",
            safeguards: "Standarta kredīta limits"
          },
          r1: {
            level: "R1",
            title: "Uzraudzīts",
            trigger: "Apdrošinātājs: ierobežots kredīta limits; Aģentūras novērtējums: B/C; Vēsture: nelieli kavējumi",
            conditions: "Saņemot VAI avanss 30-50% + atlikums saņemot",
            safeguards: "Ierobežots kredīta limits + iknedēļas pārskatīšana"
          },
          r2: {
            level: "R2",
            title: "Pastiprināts",
            trigger: "Apdrošinātājs: nepietiekams daļējs segums; Aģentūras novērtējums: C/D; Vēsture: ievērojami kavējumi",
            conditions: "Iknedēļas saņemot VAI avanss 50-70% + iknedēļas korekcija",
            safeguards: "Sākums sērijās (ierobežots apjoms)"
          },
          r3: {
            level: "R3",
            title: "Kritisks",
            trigger: "Apdrošinātājs: ATTEIKUMS / neapdrošināts; Aģentūras novērtējums: D; Vēsture: nopietni incidenti",
            conditions: "100% priekšapmaksa (vai sākuma atteikums)",
            safeguards: "Nosacījuma sākums ar maksājumu; apturēšana novirzes gadījumā"
          }
        },
        transparency: {
          title: "Pārredzamība un akceptēšana",
          description: "Trīspusējais piedāvājums norāda līmeni (R0/R1/R2/R3), rēķinu izrakstīšanas veidu un maksājuma nosacījumu. Piedāvājuma paraksts/akceptēšana ir vienāda ar šo modalitāšu akceptēšanu."
        },
        adjustment: {
          title: "Dinamiskās korekcijas klauzula",
          description: "Riska attīstības gadījumā (apdrošinātāja kredīta limita samazināšanās, kavējumi, incidenti) aģentūra var pārskatīt maksājuma nosacījumus nākamajam periodam pēc LU paziņošanas, ņemot vērā spēkā esošo līgumu."
        }
      },
      section3: {
        title: "6.3 Maksājumu kavējumi",
        intro: "YOJOB izsniegta rēķina kavējuma gadījumā (A shēma vai rēķinu izrakstīšana aģentūra→YOJOB):",
        penalties: [
          "Kavējuma procenti kļūst maksājami bez atgādinājuma, saskaņā ar līgumā vai piemērojamajā juridiskajā regulējumā noteikto likmi",
          "Fiksēta kompensācija par iekasēšanu: 40 € par nesamaksātu rēķinu",
          "Iespējams pakalpojumu apturēšana pēc rakstisku paziņojumu"
        ]
      }
    },

    article7: {
      title: "7. pants - Lietotājuzņēmuma (LU) pienākumi",
      intro: "LU apņemas:",
      obligations: [
        "Sniegt precīzu un pilnīgu vajadzību un aktīvu sadarbību (atzinumi, validācijas, plānošana)",
        "Nodot drošības prasības un piekļuves veidu vietām",
        "Ievērot informācijas konfidencialitāti (aģentūra, profili, biznesa nosacījumi)",
        "Atzīt, ka darbaspēka personāla atlase, nodrošināšana un rēķinu izrakstīšana ir aģentūras atbildība (izņemot gadījumus, kad ir rakstiska cita shēma)",
        "Ievērot trīspusējā piedāvājumā norādītos maksājuma nosacījumus"
      ]
    },

    article8: {
      title: "8. pants - Partneraģentūras pienākumi un atlīdzība",
      section1: {
        title: "8.1 Ikmēneša komisija (biznesa ieguldījums)",
        intro: "Aģentūra ir parādā YOJOB komisiju, kas aprēķināta no neto summas, ko aģentūra izraksta LU saistībā ar misijām, kas nāk no YOJOB.",
        details: {
          rate: {
            label: "Komisijas likme",
            value: "Mainīga saskaņā ar līgumu (piemēram, 3-8%)"
          },
          base: {
            label: "Aprēķina bāze",
            value: "Neto summa izrakstīta LU (YOJOB misijas)"
          },
          rhythm: {
            label: "Rēķinu izrakstīšanas ritms",
            value: "Ikmēneša"
          },
          deadline: {
            label: "Maksājuma termiņš",
            value: "No LU maksājuma saņemšanas, bez kavēšanās"
          }
        }
      },
      section2: {
        title: "8.2 Panākumu atlīdzība \"izvietošana\"",
        intro: "Dažām misijām ikmēneša komisijai var pievienot panākumu atlīdzību:",
        items: {
          trigger: {
            label: "Ģenerējošais faktors",
            value: "Spēkā esošā pārbaudes perioda beigas (skatīt 9. pantu), bez pārtraukuma, kas pieskaitāms Profilam"
          },
          exigibility: {
            label: "Iekasējamība",
            value: "Tūlītējs pilns maksājums YOJOB rēķina izsniegšanā"
          },
          amount: {
            label: "Summa",
            value: "Mainīga saskaņā ar līgumu (piemēram, % no gada bruto algas vai fiksēta summa)"
          }
        }
      },
      section3: {
        title: "8.3 Ziņošana",
        intro: "Aģentūra nodrošina YOJOB ar vienotu biežumu (piemēram, ikmēneša):",
        items: [
          "YOJOB misiju saraksts (LU, izvietošana, datumi, apjomi)",
          "Saistītā neto summa pa misijām",
          "Saprātīgi pamatojuma elementi",
          "GDPR un komercnoslēpuma ievērošana"
        ]
      }
    },

    article9: {
      title: "9. pants - Regulējošais pārbaudes periods",
      section1: {
        title: "9.1 Princips",
        description: "Piemērojamais pārbaudes periods ir tas, kas noteikts līguma dokumentos (aģentūra↔LU un/vai aģentūra↔Profils) un piemērojamajos noteikumos/kolektīvajos līgumos. Tas nedrīkst pārsniegt maksimāli atļautos ilgumus."
      },
      section2: {
        title: "9.2 Nosūtīšana / Pagaidu darbs (misijas līgums)",
        intro: "Misijas līgumā var būt līgumā noteikts pārbaudes periods; tā neesamības gadījumā tas ir ierobežots:",
        durations: [
          { duration: "2 dienas", condition: "Līgums ≤ 1 mēnesis" },
          { duration: "3 dienas", condition: "1 mēnesis < līgums ≤ 2 mēneši" },
          { duration: "5 dienas", condition: "Līgums > 2 mēneši" }
        ]
      },
      section3: {
        title: "9.3 Nodarbināšana (beztermiņa/līdzīgs) — Juridisks ierobežojums",
        intro: "Beztermiņa līgumam pārbaudes perioda maksimālais ilgums ir jo īpaši:",
        durations: [
          { duration: "2 mēneši", condition: "Strādnieki / Darbinieki", color: "green" },
          { duration: "3 mēneši", condition: "Vidējais vadības līmenis / Tehniķi", color: "blue" },
          { duration: "4 mēneši", condition: "Kadri", color: "violet" }
        ],
        note: "Saskaņā ar piemērojamiem noteikumiem un iespējamo ar likumu regulēto pagarinājumu."
      }
    },

    article10: {
      title: "10. pants - Apiešanas aizliegums — Ilgums 24 mēneši",
      intro: "Līguma attiecību laikā un 24 mēnešus pēc pēdējās kontakta (aģentūra un/vai Profils) puses aizliedz jebkādu apiešanu:",
      actors: {
        eu: "LU aizliegums tieši līgties ar YOJOB iepazīstināto aģentūru (vai saistīto vienību), apiešot YOJOB, bez rakstiska līguma.",
        ett: "Aģentūras aizliegums apiešana YOJOB atlīdzību uz LU/iespēju, kas nāk no YOJOB, bez rakstiska līguma."
      },
      penalty: {
        title: "Līguma sods",
        description: "Šīs apiešanas aizlieguma klauzulas pārkāpuma gadījumā pārkāpēja puse apņemas maksāt YOJOB fiksētu kompensāciju, kuras summa ir noteikta līgumā (vai procentuāls ekvivalents no ģenerētajām/aplēstajām summām), nemazinot papildu kompensāciju."
      }
    },

    article11: {
      title: "11. pants - Atbildība un ierobežojums",
      items: {
        obligation: {
          title: "Līdzekļu pienākums",
          description: "YOJOB apņemas izmantot visus nepieciešamos līdzekļus savu starpniecības pakalpojumu realizēšanai, bez rezultāta garantijas."
        },
        nonResponsibility: {
          title: "Nav atbildības aģentūra/Profili",
          description: "YOJOB nav atbildīgs par aģentūras, nodarbināto Profilu darbībām, nedarīšanu vai neizpildi, ne par kredīta/apdrošināšanas lēmumiem."
        },
        cap: {
          title: "Ierobežojums",
          description: "Izņemot rupju nolaidību vai nodomu, YOJOB atbildība ir ierobežota līdz neto summai, kas saņemta saistībā ar attiecīgo līgumu pēdējo 12 mēnešu laikā."
        },
        indirect: {
          title: "Netiešie zaudējumi izslēgti",
          description: "YOJOB nevar tikt uzskatīts par atbildīgu par netiešajiem zaudējumiem (darbības zaudējumi, zaudētā peļņa, klientu zaudējumi u.c.)."
        }
      }
    },

    article12: {
      title: "12. pants - Konfidencialitāte",
      intro: "Puses apņemas saglabāt konfidencialitāti visai informācijai, kas apmainīta to sadarbības ietvaros.",
      items: [
        "Konfidenciālā informācija ietver biznesa, tehniskos, finanšu un stratēģiskos datus",
        "Konfidencialitātes pienākums ilgst līguma attiecību laikā un 5 gadus pēc tā izbeigšanas",
        "Informāciju nedrīkst atklāt trešajām personām bez iepriekšējas rakstiskas piekrišanas",
        "Pusēm ir jāveic visi nepieciešamie pasākumi informācijas konfidencialitātes aizsardzībai"
      ]
    },

    article13: {
      title: "13. pants - Personas dati (GDPR)",
      intro: "Personas datu apmaiņa ir stingri ierobežota līdz datiem, kas nepieciešami pakalpojumu realizācijai (kontakti, vajadzības, kandidātu profili).",
      cards: {
        compliance: {
          title: "GDPR atbilstība",
          description: "Personas datu apstrāde tiek veikta saskaņā ar GDPR un datu aizsardzības likumu.",
          linkText: "Privātuma politika"
        },
        dpo: {
          title: "DPO kontakti",
          description: "Visiem pieprasījumiem attiecībā uz jūsu personas datiem vai GDPR tiesību izmantošanu."
        }
      },
      dpaNote: "DPA (Datu apstrādes līgums) var pievienot pēc vajadzības, atkarībā no datu apmaiņas rakstura."
    },

    article14: {
      title: "14. pants - Ilgums un izbeigšana",
      items: {
        duration: {
          title: "Ilgums",
          description: "Līguma attiecību ilgums ir noteikts līgumā vai akceptētajā trīspusējā piedāvājumā."
        },
        earlyTermination: {
          title: "Priekšlaicīga izbeigšana",
          description: "Brīdinājuma periods 30 dienas (vai līgumā noteikts ilgums) + maksājamās summas samaksa (ieskaitot komisijas/panākumu atlīdzības, ja ģenerējošais faktors ir sasniegts)."
        },
        breach: {
          title: "Izbeigšana par neizpildi",
          description: "Smagu pienākumu neizpildes gadījumā: atgādinājums + labošanas termiņš 15 dienas. Labošanas neesamības gadījumā, izbeigšana pēc likuma."
        }
      }
    },

    article15: {
      title: "15. pants - Nepārvarama vara",
      intro: "Puses nevar tikt uzskatītas par atbildīgām, ja to pienākumu neizpilde vai kavēšanās izriet no nepārvaramas varas gadījuma Francijas judikatūras izpratnē.",
      examplesTitle: "Jo īpaši nepārvaramas varas gadījumos ietilpst:",
      examples: [
        "Dabas katastrofas, plūdi, ugunsgrēki",
        "Kari, uzbrukumi, nemieri",
        "Vispārēji streiki, transporta blokādes",
        "Tīkla pārtraukumi (telekomunikācijas, elektrība)",
        "Epidēmijas, pandēmijas",
        "Valdības veselības pasākumi"
      ],
      suspension: "Nepārvaramas varas gadījumā pienākumi tiek apturēti notikuma laikā pēc otras puses paziņošanas."
    },

    article16: {
      title: "16. pants - Piemērojamie likumi un strīdi",
      sections: {
        law: {
          title: "Piemērojamie likumi",
          description: "Šie VDN ir pakļauti Francijas likumiem."
        },
        amicable: {
          title: "Iepriekšējs labas gribas atrisināšanas mēģinājums",
          description: "Strīda gadījumā puses apņemas meklēt labas gribas risinājumu pirms jebkāda tiesvedības procesa. Klients var izmantot konvencionālo mediāciju vai jebkuru citu alternatīvu strīdu atrisināšanas veidu."
        },
        jurisdiction: {
          title: "Kompetentā tiesa",
          description: "Labas gribas risinājuma neesamības gadījumā visi strīdi ir YOJOB atrašanās vietas tiesu ekskluzīvajā jurisdikcijā, izņemot gadījumus, kad tiek piemērots imperatīvs pretējs noteikums."
        }
      }
    },

    article17: {
      title: "17. pants - VDN grozīšana",
      intro: "YOJOB patur tiesības jebkurā laikā grozīt šos VDN.",
      items: [
        "VDN piemērojami tie, kas ir spēkā piedāvājuma/līguma akceptēšanas datumā",
        "Grozījumiem nav atpakaļejoša spēka attiecībā uz notiekošajiem līgumiem, izņemot gadījumus, kad ir pušu skaidra rakstiska piekrišana",
        "Jaunāko VDN versiju var apskatīt jebkurā laikā YOJOB tīmekļa vietnē"
      ]
    }
  },

  cta: {
    title: "Vai jums ir jautājumi par mūsu VDN?",
    description: "Mūsu juridiskā un biznesa komanda ir jūsu rīcībā jebkādiem paskaidrojumiem par šiem Vispārīgajiem darījuma nosacījumiem.",
    backHome: "Atpakaļ uz sākumlapu",
    contactUs: "Sazinieties ar mums"
  },

  footer: {
    copyright: "© {year} {company} — Individuālais uzņēmējs. Visas tiesības aizsargātas.",
    links: {
      legal: "Juridiskā informācija",
      privacy: "Privātums",
      cgv: "VDN"
    }
  },

  badges: {
    main: "Galvenā",
    optional: "Izvēles",
    mixed: "Jaukta"
  },

  common: {
    back: "Atpakaļ",
    triggers: "Trigeris",
    conditions: "Nosacījumi",
    safeguards: "Garantijas"
  }
};
