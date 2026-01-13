/**
 * 🇪🇪 EESTI TÕLKED - ÜLDISED ÄRITINGIMUSED (ÜÄT)
 * 
 * @version 1.0.0
 */

export const cgvET = {
  hero: {
    badge: "B2B dokument - Lepinguline",
    title: "Üldised äritingimused",
    subtitle: "ÜÄT kehtivad Kasutajaettevõtetele (KE) ja ajutise tööhõive partneragentuuridele",
    effectiveDate: "Versioon kehtib alates 19. detsembrist 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Vahendaja / Ärimaakler"
    },
    eu: {
      title: "Kasutajaettevõte (KE)",
      description: "Lõppklient, kes saab tööjõudu"
    },
    ett: {
      title: "Ajutise tööhõive agentuur",
      description: "Värbamispartner"
    }
  },

  sections: {
    article0: {
      title: "Artikkel 0 - Teenusepakkuja identiteet",
      fields: {
        legalForm: "Õiguslik vorm",
        legalFormValue: "Füüsilisest isikust ettevõtja (EI)",
        manager: "Juht",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Käibemaksu number",
        vatValue: "FR79447862764",
        address: "Aadress",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakt",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Kutsetegevuse vastutuskindlustus",
        description: "YOJOB-il on kutsetegevuse vastutuskindlustus, mis katab tema vastutusega seotud teenuste finantsilised tagajärjed."
      }
    },

    article1: {
      title: "Artikkel 1 - Mõisted",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Vahendaja/ärimaakler, kes tagab äripakkumiste hankimise, kvalifitseerimise, koordineerimise ja vormistamise KE ja agentuuride vahel."
        },
        eu: {
          term: "Kasutajaettevõte (KE)",
          definition: "Lõppkliendi ettevõte, kes saab tööjõudu, mida pakub ajutise tööhõive partneragentuur."
        },
        ett: {
          term: "Ajutise tööhõive agentuur / Partneragentuur",
          definition: "Ajutise tööhõive agentuur, kes teostab värbamist, lepingute sõlmimist ja personali pakkumise korraldamist."
        },
        profile: {
          term: "Profiil",
          definition: "Kandidaat või ajutine töötaja, keda agentuur esitab KE-le YOJOB kaudu."
        },
        mission: {
          term: "Missioon",
          definition: "KE väljendatud värbamisvajadus (amet, ulatus, tähtajad, asukoht, erinõuded)."
        },
        proposition: {
          term: "Kolmepoolne pakkumine",
          definition: "YOJOB poolt struktureeritud ning KE ja agentuuri poolt heaks kiidetud äri- ja halduspakkumine (allkiri või kirjalik kokkulepe)."
        },
        handover: {
          term: "Üleandmine",
          definition: "Hetk, mil agentuur saab KE peamiseks kontaktiks pärast kahekordset valideerimist KE + agentuur."
        },
        insurer: {
          term: "Krediitkindlustaja",
          definition: "Krediitkindlustusorganisatsioon (COFACE, Allianz Trade jne), kes osaleb kliendi riskianalüüsis ja krediidilimiitide eraldamises."
        }
      }
    },

    article2: {
      title: "Artikkel 2 - Ese",
      intro: "Need ÜÄT reguleerivad YOJOB teenuseid, mis peamiselt koosnevad:",
      steps: {
        step1: {
          title: "Hankimine ja kvalifitseerimine",
          description: "Kasutajaettevõtete tuvastamine ja kvalifitseerimine Euroopa värbamisvajadustega"
        },
        step2: {
          title: "Võimaluste esitamine",
          description: "Kvalifitseeritud võimaluste edastamine vastavatele ajutise tööhõive partneragentuuridele"
        },
        step3: {
          title: "Pakkumise struktureerimine",
          description: "Üksikasjaliku äripakkumise koostamine (ulatus, koordineerimine, halduslikud elemendid)"
        },
        step4: {
          title: "Üleandmise korraldamine",
          description: "Ülemineku tagamine agentuurile pärast allkirjastamist elluviimiseks (värbamine, pakkumine, arveldustamine)"
        }
      },
      yojobRole: {
        title: "YOJOB roll",
        description: "YOJOB tegutseb ainult vahendajana. Agentuur vastutab värbamise, pakkumise, tööandja vastavuse ja KE-le arveldustamise eest, välja arvatud juhul, kui lepingus on sõnaselgelt ette nähtud teisiti."
      }
    },

    article3: {
      title: "Artikkel 3 - Lepingudokumendid ja hierarhia",
      intro: "Dokumentide vastuolu korral kehtib järgmine prioriteetsuse järjekord:",
      hierarchy: {
        rank1: {
          title: "Erilepe / Eritingimused",
          subtitle: "Isikupärastatud partnerlus või äriline panus"
        },
        rank2: {
          title: "Kolmepoolne pakkumine / Pakkumine / Tellimus",
          subtitle: "Osapoolte allkirjastatud dokument"
        },
        rank3: {
          title: "Üldised äritingimused (ÜÄT)",
          subtitle: "See dokument"
        },
        rank4: {
          title: "Lisad",
          subtitle: "SLA, DPA, protsessid, kontrollnimekirjad jne"
        }
      }
    },

    article4: {
      title: "Artikkel 4 - Lepinguskeemid",
      intro: "Rakendatav skeem on täpsustatud pakkumises või lepingus. YOJOB võib tegutseda 3 mudeli järgi:",
      schemes: {
        schemaB: {
          label: "Skeem B",
          badge: "Peamine",
          title: "Agentuur YOJOB klient",
          description: "YOJOB-i tasustab agentuur ärilise panuse eest (kuutasu ja/või edutasu)"
        },
        schemaA: {
          label: "Skeem A",
          badge: "Valikuline",
          title: "KE YOJOB klient",
          description: "YOJOB esitab KE-le arve lisateenuste eest (tugevdatud koordineerimine, laiendatud dokumentatsioonitoe)"
        },
        schemaC: {
          label: "Skeem C",
          badge: "Segatud",
          title: "Kombineeritud tasu",
          description: "YOJOB-i tasustab agentuur (Skeem B) JA esitab KE-le arve lisateenuste eest (Skeem A)"
        }
      }
    },

    article5: {
      title: "Artikkel 5 - Protsess ja üleandmine",
      phase1: {
        title: "5.1 Sissejuhatav faas (äri ja koordineerimine)",
        intro: "YOJOB tagab:",
        items: [
          "Kasutajaettevõtte hankimise ja kvalifitseerimise",
          "Missiooni jaoks vajalike elementide kogumise",
          "Vajaduse edastamise ühele või mitmele ajutise tööhõive partneragentuurile",
          "Koordineerimise kolmepoolse pakkumise sulgemiseni"
        ]
      },
      phase2: {
        title: "5.2 Üleandmise aktiveerimine",
        intro: "\"Üleandmine\" toimub pärast kahe kumulatiivse tingimuse täitmist:",
        conditions: [
          "KE allkiri/kirjalik kokkulepe pakkumisele",
          "Agentuuri aktsepteerimine/valideerimine (võimekus, tingimused, vastavus, risk)"
        ],
        consequences: "Sellest hetkest muutub agentuur peamiseks kontaktiks: värbamine, lepingud, sisseelamise, pakkumine, palgad, lähetamise kohustused, arveldustamine ja sissenõudmine KE-lt."
      },
      phase3: {
        title: "5.3 Jääktoetused (kui ette nähtud)",
        description: "YOJOB võib jääda toetuseks (koordineerimine/kvaliteet) pakkumises või lepingus kokkulepitud ulatuses."
      }
    },

    article6: {
      title: "Artikkel 6 - Finantstingimused ja makseviis",
      section1: {
        title: "6.1 Põhimõte: \"selektiivsed\" tähtajad juhtumipõhiselt",
        intro: "Arvestades tööstusharu tavasid (krediitkindlustus, kliendi risk, arveldustamise korraldus), määratakse maksetingimused juhtumipõhiselt kehtivas pakkumises/lepingus.",
        modalitiesTitle: "Viisid võivad hõlmata:",
        modalities: [
          "Tasumine kättesaamisel",
          "Ettemaks / ettemakse",
          "Nädalane arveldustamine",
          "Tagatised (deposiit, krediidilimiidi piiramine)"
        ],
        legalLimit: "Kui määratakse maksetähtaeg \"tähtajaga\", järgitakse õiguslikke piiranguid: 60 päeva arve väljaandmise kuupäevast või 45 päeva kuu lõpus, kui on märgitud."
      },
      section2: {
        title: "6.2 Standardvõrk — KE \"riskid\"",
        intro: "Riskiklassifikatsioon on määratud 3 kumulatiivsest allikast:",
        sources: {
          insurer: {
            title: "Krediitkindlustaja",
            description: "Katvus/krediidilimiit/tingimused"
          },
          score: {
            title: "Agentuuri sisetunnustamine",
            description: "Riski- ja sissenõudmispoliitika"
          },
          history: {
            title: "Maksete ajalugu",
            description: "Käitumine ja kokkupuude"
          }
        },
        primacy: "Prioriteet: vastuolu korral on krediitkindlustaja otsus muude signaalide ees eelistatud.",
        levelsTitle: "Riskitasemed ja maksetingimused",
        levels: {
          r0: {
            level: "R0",
            title: "Standardne",
            trigger: "Kindlustaja: kaetud / krediidilimiit OK; Agentuuri hinnang: A/B; Ajalugu: hea (0 juhtumit)",
            conditions: "Igakuine + kokkulepitud tähtaeg (nt 30p) õigusliku piiri raames",
            safeguards: "Standardne krediidilimiit"
          },
          r1: {
            level: "R1",
            title: "Jälgitav",
            trigger: "Kindlustaja: piiratud krediidilimiit; Agentuuri hinnang: B/C; Ajalugu: väikesed viivitused",
            conditions: "Kättesaamisel VÕI ettemaks 30-50% + saldo kättesaamisel",
            safeguards: "Piiratud krediidilimiit + iganädalane läbivaatus"
          },
          r2: {
            level: "R2",
            title: "Tugevdatud",
            trigger: "Kindlustaja: ebapiisav osaline katvus; Agentuuri hinnang: C/D; Ajalugu: märkimisväärsed viivitused",
            conditions: "Iganädalane kättesaamisel VÕI ettemaks 50-70% + iganädalane korrigeerimine",
            safeguards: "Alustamine seeriatena (piiratud maht)"
          },
          r3: {
            level: "R3",
            title: "Kriitiline",
            trigger: "Kindlustaja: KEELDUMINE / kindlustamata; Agentuuri hinnang: D; Ajalugu: tõsised juhtumid",
            conditions: "100% ettemaks (või alustamisest keeldumine)",
            safeguards: "Tingimuslik alustamine maksega; peatamine kõrvalekalde korral"
          }
        },
        transparency: {
          title: "Läbipaistvus ja aktsepteerimine",
          description: "Kolmepoolne pakkumine täpsustab taseme (R0/R1/R2/R3), arveldustamisviisi ja maksetingimuse. Pakkumise allkiri/aktsepteerimine võrdub nende viiside aktsepteerimisega."
        },
        adjustment: {
          title: "Dünaamilise kohandamise klausel",
          description: "Riski arengu korral (kindlustaja krediidilimiidi vähenemine, viivitused, juhtumid) võib agentuur pärast KE teavitamist korrigeerida järgmise perioodi maksetingimusi, arvestades kehtivat lepingut."
        }
      },
      section3: {
        title: "6.3 Maksete viivitused",
        intro: "YOJOB poolt väljastatud arve viivituse korral (Skeem A või arveldustamine agentuur→YOJOB):",
        penalties: [
          "Viivised tekivad ilma meeldetuletuseta, lepingus või kohaldatavas õigusraamistikus määratud määra järgi",
          "Sissenõudmise kindlasummaline hüvitis: 40 € maksmata arve kohta",
          "Võimalik teenuste peatamine pärast kirjalikku teavitust"
        ]
      }
    },

    article7: {
      title: "Artikkel 7 - Kasutajaettevõtte (KE) kohustused",
      intro: "KE kohustub:",
      obligations: [
        "Andma täpse ja täieliku vajaduse ning aktiivse koostöö (arvamused, valideerimised, planeerimine)",
        "Edastama ohutusnõuded ja asukohtadele juurdepääsu viisi",
        "Austama teabe konfidentsiaalsust (agentuur, profiilid, äritingimused)",
        "Tunnustama, et värbamine, pakkumine ja tööjõu arveldustamine on agentuuri vastutus (välja arvatud juhul, kui on kirjalikult ette nähtud teine skeem)",
        "Austama kolmepoolses pakkumises täpsustatud maksetingimusi"
      ]
    },

    article8: {
      title: "Artikkel 8 - Partneragentuuri kohustused ja tasu",
      section1: {
        title: "8.1 Kuutasu (äriline panus)",
        intro: "Agentuur võlgneb YOJOB-ile tasu, mis on arvutatud netosummast, mida agentuur arveldustab KE-le seoses YOJOB-ist pärinevate missioonidega.",
        details: {
          rate: {
            label: "Tasu määr",
            value: "Muutuv vastavalt lepingule (nt 3-8%)"
          },
          base: {
            label: "Arvutuse alus",
            value: "KE-le arveldustatud netosumma (YOJOB missioonid)"
          },
          rhythm: {
            label: "Arveldustamise rütm",
            value: "Igakuine"
          },
          deadline: {
            label: "Maksetähtaeg",
            value: "KE makse kättesaamisest, ilma viivituseta"
          }
        }
      },
      section2: {
        title: "8.2 Edutasu \"paigutus\"",
        intro: "Teatud missioonide puhul võib kuutasule lisada edutasu:",
        items: {
          trigger: {
            label: "Genereeriv tegur",
            value: "Kehtiva katseaja lõpp (vt art. 9), ilma Profiilile omistatava katkestuseta"
          },
          exigibility: {
            label: "Sissenõutavus",
            value: "Kohene täielik makse YOJOB arve väljaandmisel"
          },
          amount: {
            label: "Summa",
            value: "Muutuv vastavalt lepingule (nt % aastasest brutopalgast või kindlasummaline summa)"
          }
        }
      },
      section3: {
        title: "8.3 Aruandlus",
        intro: "Agentuur annab YOJOB-ile kokkulepitud sagedusega (nt igakuiselt):",
        items: [
          "YOJOB missioonide nimekiri (KE, paigutus, kuupäevad, mahud)",
          "Seotud netosumma missiooni kohta",
          "Mõistlikud põhjendavad elemendid",
          "GDPR ja ärislatsuse austamine"
        ]
      }
    },

    article9: {
      title: "Artikkel 9 - Regulatiivne katseaeg",
      section1: {
        title: "9.1 Põhimõte",
        description: "Rakendatav katseaeg on see, mis on määratud lepingudokumentides (agentuur↔KE ja/või agentuur↔Profiil) ja kohaldatavates eeskirjades/kollektiivlepingutes. See ei tohi ületada lubatud maksimaalset kestust."
      },
      section2: {
        title: "9.2 Lähetamine / Ajutine töö (missiooni leping)",
        intro: "Missiooni leping võib sisaldada lepinguliselt määratud katseaega; selle puudumisel on see piiratud:",
        durations: [
          { duration: "2 päeva", condition: "Leping ≤ 1 kuu" },
          { duration: "3 päeva", condition: "1 kuu < leping ≤ 2 kuud" },
          { duration: "5 päeva", condition: "Leping > 2 kuud" }
        ]
      },
      section3: {
        title: "9.3 Töölevõtmine (tähtajatu/sarnane) — Õiguslik piirang",
        intro: "Tähtajatu lepingu puhul on katseaja maksimaalne kestus eriti:",
        durations: [
          { duration: "2 kuud", condition: "Töölised / Töötajad", color: "green" },
          { duration: "3 kuud", condition: "Keskastme juhtkond / Tehnikud", color: "blue" },
          { duration: "4 kuud", condition: "Kaadrid", color: "violet" }
        ],
        note: "Vastavalt kehtivatele reeglitele ja võimalikule seadusega reguleeritud pikendamisele."
      }
    },

    article10: {
      title: "Artikkel 10 - Vältimise keeld — Kestus 24 kuud",
      intro: "Lepingulise suhte kestel ja 24 kuud pärast viimast kontakti (agentuur ja/või Profiil) keelavad osapooled igasuguse vältimise:",
      actors: {
        eu: "KE keeld sõlmida YOJOB poolt esitatud agentuuriga (või seotud üksusega) otselepingut, YOJOB-i vältides, ilma kirjaliku kokkuleppeta.",
        ett: "Agentuuri keeld vältida YOJOB tasu YOJOB-ist pärinevale KE/võimalusele, ilma kirjaliku kokkuleppeta."
      },
      penalty: {
        title: "Lepinguline karistus",
        description: "Selle vältimise keelu klausli rikkumise korral kohustub rikkuv pool maksma YOJOB-ile kindlasummalise hüvitise, mille summa on määratud lepingus (või protsent genereeritud/hinnangulistest summadest), ilma et see kahjustaks täiendavat hüvitist."
      }
    },

    article11: {
      title: "Artikkel 11 - Vastutus ja piiramine",
      items: {
        obligation: {
          title: "Vahenditealane kohustus",
          description: "YOJOB kohustub kasutama kõiki vajalikke vahendeid oma vahendamisteenuste elluviimiseks, ilma tulemuse garantiita."
        },
        nonResponsibility: {
          title: "Ei vastuta agentuuri/Profiilide eest",
          description: "YOJOB ei vastuta agentuuri, tööle võetud Profiilide tegude, tegemata jätmiste või täitmata jätmise ega krediidi/kindlustuse otsuste eest."
        },
        cap: {
          title: "Piiramine",
          description: "Välja arvatud raske hooletuse või tahtluse korral, on YOJOB vastutus piiratud viimase 12 kuu jooksul asjaomasel lepingul saadud netosummaga."
        },
        indirect: {
          title: "Kaudsed kahjud välistatud",
          description: "YOJOB-i ei saa pidada vastutavaks kaudsete kahjude eest (tegevuse kaotus, saamata jäänud kasum, klientide kaotus jne)."
        }
      }
    },

    article12: {
      title: "Artikkel 12 - Konfidentsiaalsus",
      intro: "Osapooled kohustuvad säilitama nende koostöö raames vahetatud kogu teabe konfidentsiaalsust.",
      items: [
        "Konfidentsiaalne teave hõlmab ärilisi, tehnilisi, finants- ja strateegilisi andmeid",
        "Konfidentsiaalsuse kohustus kestab lepingulise suhte kestel ja 5 aastat pärast selle lõppemist",
        "Teavet ei või kolmandatele isikutele avaldada ilma eelneva kirjaliku nõusolekuta",
        "Osapooled peavad võtma kõik vajalikud meetmed teabe konfidentsiaalsuse kaitsmiseks"
      ]
    },

    article13: {
      title: "Artikkel 13 - Isikuandmed (GDPR)",
      intro: "Isikuandmete vahetamine on rangelt piiratud teenuste elluviimiseks vajalike andmetega (kontaktid, vajadused, kandidaatide profiilid).",
      cards: {
        compliance: {
          title: "GDPR vastavus",
          description: "Isikuandmete töötlemine viiakse läbi GDPR-i ja andmekaitseseaduse kohaselt.",
          linkText: "Privaatsuspoliitika"
        },
        dpo: {
          title: "DPO kontakt",
          description: "Kõigi teie isikuandmeid puudutavate taotluste või GDPR õiguste teostamise jaoks."
        }
      },
      dpaNote: "DPA (Andmetöötlusleping) võib vajaduse korral lisada, olenevalt andmevahetuse olemusest."
    },

    article14: {
      title: "Artikkel 14 - Kestus ja lõpetamine",
      items: {
        duration: {
          title: "Kestus",
          description: "Lepingulise suhte kestus on määratud lepingus või aktsepteeritud kolmepoolses pakkumises."
        },
        earlyTermination: {
          title: "Ennetähtaegne lõpetamine",
          description: "Etteteatamistähtaeg 30 päeva (või lepingus kokkulepitud kestus) + võlgnetavate summade tasumine (sealhulgas tasud/edutasud, kui genereeriv tegur on saavutatud)."
        },
        breach: {
          title: "Lõpetamine täitmata jätmise tõttu",
          description: "Kohustuste raske täitmata jätmise korral: meeldetuletus + parandamistähtaeg 15 päeva. Parandamise puudumisel, lõpetamine seadusejärgselt."
        }
      }
    },

    article15: {
      title: "Artikkel 15 - Vääramatu jõud",
      intro: "Osapoolte ei saa pidada vastutavaks, kui nende kohustuste täitmata jätmine või viivitus tuleneb vääramatu jõu juhtumist Prantsuse kohtupraktika tähenduses.",
      examplesTitle: "Eriti kujutavad endast vääramatu jõu juhtumeid:",
      examples: [
        "Looduskatastroofid, üleujutused, tulekahjud",
        "Sõjad, rünnakud, rahutused",
        "Üldstreigid, transpordi blokeeringud",
        "Võrgu katkestused (telekommunikatsioon, elekter)",
        "Epideemiad, pandeemiad",
        "Valitsuse tervishoiumeetmed"
      ],
      suspension: "Vääramatu jõu korral peatatakse kohustused sündmuse kestuse ajaks pärast teisele poolele teavitamist."
    },

    article16: {
      title: "Artikkel 16 - Kohaldatav õigus ja vaidlused",
      sections: {
        law: {
          title: "Kohaldatav õigus",
          description: "Need ÜÄT alluvad Prantsuse õigusele."
        },
        amicable: {
          title: "Eelnev lepituskatsete",
          description: "Vaidluse korral kohustuvad osapooled otsima lepituslikku lahendust enne kohtumenetlust. Klient võib kasutada tavapärast vahendamist või muud alternatiivset vaidluste lahendamise viisi."
        },
        jurisdiction: {
          title: "Pädev kohus",
          description: "Lepitusliku lahenduse puudumisel on kõik vaidlused YOJOB asukoha kohtute ainupädevuses, välja arvatud juhul, kui kehtib vastupidine kohustuslik reegel."
        }
      }
    },

    article17: {
      title: "Artikkel 17 - ÜÄT muutmine",
      intro: "YOJOB jätab endale õiguse muuta neid ÜÄT igal ajal.",
      items: [
        "ÜÄT kehtivad need, mis on kehtinud pakkumise/lepingu aktsepteerimise kuupäeval",
        "Muudatustel ei ole tagasiulatuvat mõju käimasolevate lepingute suhtes, välja arvatud juhul, kui on osapoolte sõnaselge kirjalik nõusolek",
        "ÜÄT uusimat versiooni saab igal ajal vaadata YOJOB veebilehel"
      ]
    }
  },

  cta: {
    title: "Kas teil on küsimusi meie ÜÄT kohta?",
    description: "Meie õigus- ja ärimeeskond on teie käsutuses kõigi nende Üldiste äritingimustega seotud selgituste jaoks.",
    backHome: "Tagasi avalehele",
    contactUs: "Võtke meiega ühendust"
  },

  footer: {
    copyright: "© {year} {company} — Füüsilisest isikust ettevõtja. Kõik õigused kaitstud.",
    links: {
      legal: "Õiguslik teave",
      privacy: "Privaatsus",
      cgv: "ÜÄT"
    }
  },

  badges: {
    main: "Peamine",
    optional: "Valikuline",
    mixed: "Segatud"
  },

  common: {
    back: "Tagasi",
    triggers: "Päästikud",
    conditions: "Tingimused",
    safeguards: "Tagatised"
  }
};
