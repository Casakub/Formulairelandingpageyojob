/**
 * 🇭🇺 MAGYAR FORDÍTÁSOK - ÁLTALÁNOS SZERZŐDÉSI FELTÉTELEK (ÁSzF)
 * 
 * @version 1.0.0
 */

export const cgvHU = {
  hero: {
    badge: "B2B dokumentum - Szerződéses",
    title: "Általános Szerződési Feltételek",
    subtitle: "A Felhasználó Vállalatok (US) és partneri munkaerő-kölcsönző ügynökségek számára érvényes ÁSzF",
    effectiveDate: "2025. december 19-től hatályos verzió"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Közvetítő / Üzleti bróker"
    },
    eu: {
      title: "Felhasználó Vállalat (US)",
      description: "A munkaerőt fogadó végső ügyfél"
    },
    ett: {
      title: "Munkaerő-kölcsönző ügynökség",
      description: "Toborzási partner"
    }
  },

  sections: {
    article0: {
      title: "0. cikk - A szolgáltató azonosítása",
      fields: {
        legalForm: "Jogi forma",
        legalFormValue: "Egyéni vállalkozó (EI)",
        manager: "Vezető",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Közösségi adószám",
        vatValue: "FR79447862764",
        address: "Cím",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kapcsolat",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Szakmai felelősségbiztosítás",
        description: "A YOJOB szakmai felelősségbiztosítással rendelkezik, amely fedezi a szolgáltatásaival kapcsolatos felelősségének pénzügyi következményeit."
      }
    },

    article1: {
      title: "1. cikk - Fogalommeghatározások",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Közvetítő/üzleti bróker, amely biztosítja az US és az ügynökségek közötti üzleti ajánlatok beszerzését, minősítését, koordinálását és formalizálását."
        },
        eu: {
          term: "Felhasználó Vállalat (US)",
          definition: "A végső ügyfél vállalat, amely a partneri munkaerő-kölcsönző ügynökség által biztosított munkaerőt fogadja."
        },
        ett: {
          term: "Munkaerő-kölcsönző ügynökség / Partneri ügynökség",
          definition: "Munkaerő-kölcsönző ügynökség, amely a toborzást, szerződéskötést és személyzet biztosításának szervezését végzi."
        },
        profile: {
          term: "Profil",
          definition: "Jelölt vagy ideiglenes munkavállaló, akit az ügynökség az US-nek bemutat a YOJOB-on keresztül."
        },
        mission: {
          term: "Küldetés",
          definition: "Az US által megfogalmazott toborzási igény (szakma, terjedelem, határidők, helyszín, különleges követelmények)."
        },
        proposition: {
          term: "Háromoldalú ajánlat",
          definition: "A YOJOB által strukturált és az US és az ügynökség által jóváhagyott üzleti és adminisztratív ajánlat (aláírás vagy írásbeli megállapodás)."
        },
        handover: {
          term: "Átadás",
          definition: "Az a pillanat, amikor az ügynökség az US fő kapcsolattartójává válik az US + ügynökség kettős validálása után."
        },
        insurer: {
          term: "Hitelbiztosító",
          definition: "Hitelbiztosítási szervezet (COFACE, Allianz Trade stb.), amely részt vesz az ügyfélkockázat elemzésében és a hitelkeretek allokálásában."
        }
      }
    },

    article2: {
      title: "2. cikk - Tárgy",
      intro: "Ez az ÁSzF szabályozza a YOJOB szolgáltatásait, amelyek főként a következőkből állnak:",
      steps: {
        step1: {
          title: "Beszerzés és minősítés",
          description: "Európai toborzási igényekkel rendelkező Felhasználó Vállalatok azonosítása és minősítése"
        },
        step2: {
          title: "Lehetőségek bemutatása",
          description: "Minősített lehetőségek továbbítása a megfelelő partneri munkaerő-kölcsönző ügynökségekhez"
        },
        step3: {
          title: "Ajánlat strukturálása",
          description: "Részletes üzleti ajánlat kidolgozása (terjedelem, koordináció, adminisztratív elemek)"
        },
        step4: {
          title: "Átadás szervezése",
          description: "Az ügynökséghez való átmenet biztosítása aláírás után a megvalósítás érdekében (toborzás, biztosítás, számlázás)"
        }
      },
      yojobRole: {
        title: "A YOJOB szerepe",
        description: "A YOJOB kizárólag közvetítőként működik. Az ügynökség felelős a toborzásért, a biztosításért, a munkáltatói megfelelésért és az US felé történő számlázásért, kivéve, ha a szerződésben kifejezetten másként szerepel."
      }
    },

    article3: {
      title: "3. cikk - Szerződéses dokumentumok és hierarchia",
      intro: "A dokumentumok közötti eltérés esetén a következő prioritási sorrend érvényes:",
      hierarchy: {
        rank1: {
          title: "Különleges szerződés / Különleges feltételek",
          subtitle: "Személyre szabott partnerség vagy üzleti hozzájárulás"
        },
        rank2: {
          title: "Háromoldalú ajánlat / Ajánlat / Megrendelés",
          subtitle: "A felek által aláírt dokumentum"
        },
        rank3: {
          title: "Általános Szerződési Feltételek (ÁSzF)",
          subtitle: "Ez a dokumentum"
        },
        rank4: {
          title: "Mellékletek",
          subtitle: "SLA, DPA, folyamatok, ellenőrző listák stb."
        }
      }
    },

    article4: {
      title: "4. cikk - Szerződéses sémák",
      intro: "Az alkalmazott séma az ajánlatban vagy szerződésben van meghatározva. A YOJOB 3 modell szerint működhet:",
      schemes: {
        schemaB: {
          label: "B séma",
          badge: "Fő",
          title: "Ügynökség a YOJOB ügyfele",
          description: "A YOJOB-ot az ügynökség díjazza az üzleti hozzájárulásért (havi jutalék és/vagy sikerdíj)"
        },
        schemaA: {
          label: "A séma",
          badge: "Opcionális",
          title: "US a YOJOB ügyfele",
          description: "A YOJOB kiegészítő szolgáltatásokat számlázik az US-nek (megerősített koordináció, kiterjesztett dokumentációs segítség)"
        },
        schemaC: {
          label: "C séma",
          badge: "Vegyes",
          title: "Kombinált díjazás",
          description: "A YOJOB-ot az ügynökség díjazza (B séma) ÉS kiegészítő szolgáltatásokat számlázik az US-nek (A séma)"
        }
      }
    },

    article5: {
      title: "5. cikk - Folyamat és átadás",
      phase1: {
        title: "5.1 Bevezető szakasz (üzleti és koordináció)",
        intro: "A YOJOB biztosítja:",
        items: [
          "A Felhasználó Vállalat beszerzését és minősítését",
          "A Küldetéshez szükséges elemek gyűjtését",
          "Az igény továbbítását egy vagy több partneri munkaerő-kölcsönző ügynökséghez",
          "A koordinációt a háromoldalú ajánlat lezárásáig"
        ]
      },
      phase2: {
        title: "5.2 Átadás aktiválása",
        intro: "Az \"Átadás\" két kumulatív feltétel teljesülése után következik be:",
        conditions: [
          "Az US ajánlatra vonatkozó aláírása/írásbeli megállapodása",
          "Az ügynökség elfogadása/validálása (kapacitás, feltételek, megfelelés, kockázat)"
        ],
        consequences: "Ettől a pillanattól az ügynökség válik a fő kapcsolattartóvá a következőkért: toborzás, szerződések, onboarding, biztosítás, fizetések, kiküldetési kötelezettségek, számlázás és US-től való behajtás."
      },
      phase3: {
        title: "5.3 Maradék támogatások (ha előre látható)",
        description: "A YOJOB támogatóként maradhat (koordináció/minőség) az ajánlatban vagy szerződésben megállapított mértékben."
      }
    },

    article6: {
      title: "6. cikk - Pénzügyi feltételek és fizetési mód",
      section1: {
        title: "6.1 Alapelv: \"szelektív\" határidők eseti alapon",
        intro: "Az iparági gyakorlatokat figyelembe véve (hitelbiztosítás, ügyfélkockázat, számlázás szervezése) a fizetési feltételek eseti alapon kerülnek megállapításra az érvényes ajánlatban/szerződésben.",
        modalitiesTitle: "A módok a következőket tartalmazhatják:",
        modalities: [
          "Fizetés kézhezvételkor",
          "Előzetes fizetés / előleg",
          "Heti számlázás",
          "Garanciák (letét, hitelkeret korlátozása)"
        ],
        legalLimit: "Amikor \"határidős\" fizetési határidőt rendelnek, a törvényes korlátokat be kell tartani: 60 nap a számla kiállításának dátumától vagy 45 nap hónap végétől, ha meg van határozva."
      },
      section2: {
        title: "6.2 Szabványos rács — US \"kockázatok\"",
        intro: "A kockázat-besorolás 3 kumulatív forrásból kerül megállapításra:",
        sources: {
          insurer: {
            title: "Hitelbiztosító",
            description: "Fedezet/hitelkeret/feltételek"
          },
          score: {
            title: "Ügynökség belső értékelése",
            description: "Kockázati és behajtási politika"
          },
          history: {
            title: "Fizetési előzmények",
            description: "Viselkedés és kitettség"
          }
        },
        primacy: "Elsőbbség: eltérés esetén a hitelbiztosító döntése elsőbbséget élvez a többi jelzéssel szemben.",
        levelsTitle: "Kockázati szintek és fizetési feltételek",
        levels: {
          r0: {
            level: "R0",
            title: "Szabványos",
            trigger: "Biztosító: fedezett / hitelkeret OK; Ügynökség értékelése: A/B; Előzmények: jó (0 incidens)",
            conditions: "Havi + egyeztetett határidő (pl. 30n) a törvényes korláton belül",
            safeguards: "Szabványos hitelkeret"
          },
          r1: {
            level: "R1",
            title: "Monitorozott",
            trigger: "Biztosító: korlátozott hitelkeret; Ügynökség értékelése: B/C; Előzmények: enyhe késések",
            conditions: "Kézhezvételkor VAGY 30-50% előleg + egyenleg kézhezvételkor",
            safeguards: "Korlátozott hitelkeret + heti felülvizsgálat"
          },
          r2: {
            level: "R2",
            title: "Megerősített",
            trigger: "Biztosító: elégtelen részleges fedezet; Ügynökség értékelése: C/D; Előzmények: jelentős késések",
            conditions: "Heti kézhezvételkor VAGY 50-70% előleg + heti kiigazítás",
            safeguards: "Indítás adagokban (korlátozott volumen)"
          },
          r3: {
            level: "R3",
            title: "Kritikus",
            trigger: "Biztosító: ELUTASÍTÁS / nem biztosítható; Ügynökség értékelése: D; Előzmények: súlyos incidensek",
            conditions: "100% előzetes fizetés (vagy indítás elutasítása)",
            safeguards: "Feltételes indítás fizetéstől; leállítás eltérés esetén"
          }
        },
        transparency: {
          title: "Átláthatóság és elfogadás",
          description: "A háromoldalú ajánlat meghatározza a szintet (R0/R1/R2/R3), a számlázási módot és a fizetési feltételt. Az ajánlat aláírása/elfogadása egyenlő ezen módok elfogadásával."
        },
        adjustment: {
          title: "Dinamikus kiigazítási záradék",
          description: "Kockázat fejlődése esetén (biztosító hitelkeretének csökkentése, késések, incidensek) az ügynökség felülvizsgálhatja a következő időszakra vonatkozó fizetési feltételeket az US értesítése után, figyelembe véve az érvényes szerződést."
        }
      },
      section3: {
        title: "6.3 Fizetési késedelmek",
        intro: "A YOJOB által kiállított számla késedelme esetén (A séma vagy ügynökség→YOJOB számlázás):",
        penalties: [
          "Késedelmi kamatok fizetendők emlékeztető nélkül, a szerződésben vagy az alkalmazandó jogi keretben meghatározott kamatlábnak megfelelően",
          "Átalányköltség behajtásra: 40 € kifizetetlen számlánként",
          "Lehetséges szolgáltatásfelfüggesztés írásbeli értesítés után"
        ]
      }
    },

    article7: {
      title: "7. cikk - A Felhasználó Vállalat (US) kötelezettségei",
      intro: "Az US vállalja:",
      obligations: [
        "Pontos és teljes igény nyújtását és aktív együttműködést (vélemények, validálások, tervezés)",
        "Biztonsági követelmények és a helyekhez való hozzáférés módjának átadását",
        "Az információk bizalmas kezelését (ügynökség, profilok, üzleti feltételek)",
        "Elismerését, hogy a toborzás, a biztosítás és a munkaerő számlázása az ügynökség felelőssége (kivéve, ha más séma írásban)",
        "A háromoldalú ajánlatban meghatározott fizetési feltételek betartását"
      ]
    },

    article8: {
      title: "8. cikk - A partneri ügynökség kötelezettségei és díjazása",
      section1: {
        title: "8.1 Havi jutalék (üzleti hozzájárulás)",
        intro: "Az ügynökség jutalékot tartozik a YOJOB-nak, amelyet az ügynökség által az US-nek számlázott nettó összegből számítanak ki a YOJOB-ból származó küldetésekre vonatkozóan.",
        details: {
          rate: {
            label: "Jutalék mértéke",
            value: "Változó szerződés szerint (pl. 3-8%)"
          },
          base: {
            label: "Számítási alap",
            value: "US-nek számlázott nettó összeg (YOJOB küldetések)"
          },
          rhythm: {
            label: "Számlázási ritmus",
            value: "Havi"
          },
          deadline: {
            label: "Fizetési határidő",
            value: "US fizetésének kézhezvételétől, késedelem nélkül"
          }
        }
      },
      section2: {
        title: "8.2 Sikerdíj \"elhelyezés\"",
        intro: "Egyes küldetésekhez sikerdíj adható hozzá a havi jutalékhoz:",
        items: {
          trigger: {
            label: "Generáló tény",
            value: "Érvényes próbaidő vége (lásd 9. cikk), a Profilnak betudható felmondás nélkül"
          },
          exigibility: {
            label: "Esedékesség",
            value: "Azonnali teljes fizetés a YOJOB számla kiállításakor"
          },
          amount: {
            label: "Összeg",
            value: "Változó szerződés szerint (pl. % éves bruttó fizetésből vagy átalányösszeg)"
          }
        }
      },
      section3: {
        title: "8.3 Jelentéstétel",
        intro: "Az ügynökség megállapodott gyakorisággal (pl. havi) biztosítja a YOJOB-nak:",
        items: [
          "A YOJOB küldetések listáját (US, elhelyezés, dátumok, volumenek)",
          "Küldetésenkénti kapcsolódó nettó összeget",
          "Ésszerű igazoló elemeket",
          "A GDPR és az üzleti titok tiszteletben tartását"
        ]
      }
    },

    article9: {
      title: "9. cikk - Szabályozási próbaidő",
      section1: {
        title: "9.1 Alapelv",
        description: "Az alkalmazott próbaidő az a szerződéses dokumentumokban (ügynökség↔US és/vagy ügynökség↔Profil) és az alkalmazandó rendelkezésekben/kollektív szerződésekben meghatározott. Nem lépheti túl a megengedett maximális időtartamokat."
      },
      section2: {
        title: "9.2 Kiküldetés / Ideiglenes munka (küldetési szerződés)",
        intro: "A küldetési szerződés tartalmazhat szerződésileg meghatározott próbaidőt; ennek hiányában a következőkre korlátozódik:",
        durations: [
          { duration: "2 nap", condition: "Szerződés ≤ 1 hónap" },
          { duration: "3 nap", condition: "1 hónap < szerződés ≤ 2 hónap" },
          { duration: "5 nap", condition: "Szerződés > 2 hónap" }
        ]
      },
      section3: {
        title: "9.3 Toborzás (határozatlan időre/hasonló) — Törvényes korlát",
        intro: "Határozatlan idejű szerződés esetén a próbaidő maximális időtartama különösen:",
        durations: [
          { duration: "2 hónap", condition: "Munkások / Alkalmazottak", color: "green" },
          { duration: "3 hónap", condition: "Középvezetők / Technikusok", color: "blue" },
          { duration: "4 hónap", condition: "Vezetők", color: "violet" }
        ],
        note: "Az alkalmazandó szabályok és a törvény által szabályozott esetleges meghosszabbítás szerint."
      }
    },

    article10: {
      title: "10. cikk - Megkerülés tilalma — 24 hónapos időtartam",
      intro: "A szerződéses kapcsolat során és az utolsó kapcsolattól (ügynökség és/vagy Profil) számított 24 hónapig a felek megtiltják bármilyen megkerülést:",
      actors: {
        eu: "Tilalom az US számára, hogy közvetlenül szerződést kössön a YOJOB által bemutatott ügynökséggel (vagy kapcsolt egységgel) a YOJOB megkerülésével, írásbeli megállapodás hiányában.",
        ett: "Tilalom az ügynökség számára, hogy megkerülje a YOJOB díjazását a YOJOB-ból származó US/lehetőségre vonatkozóan, írásbeli megállapodás hiányában."
      },
      penalty: {
        title: "Szerződéses büntetés",
        description: "Ennek a megkerülés tilalmáról szóló záradéknak a megsértése esetén a mulasztó fél vállalja, hogy átalánykártérítést fizet a YOJOB-nak, amelynek összegét a szerződés határozza meg (vagy a generált/becsült összegek százalékának megfelelője), anélkül, hogy ez sértené a további kártérítést."
      }
    },

    article11: {
      title: "11. cikk - Felelősség és korlátozás",
      items: {
        obligation: {
          title: "Eszközkötelezettség",
          description: "A YOJOB vállalja, hogy minden szükséges eszközt felhasznál közvetítői szolgáltatásainak megvalósítására, eredménygarancia nélkül."
        },
        nonResponsibility: {
          title: "Nincs felelősség az ügynökség/Profilok tekintetében",
          description: "A YOJOB nem felelős az ügynökség, a toborzott Profilok cselekedeteiért, mulasztásaiért vagy teljesítésének elmaradásáért, sem a hitel-/biztosítási döntésekért."
        },
        cap: {
          title: "Korlátozás",
          description: "Súlyos gondatlanság vagy szándékosság kivételével a YOJOB felelőssége korlátozódik az adott szerződéssel kapcsolatban az elmúlt 12 hónapban kapott nettó összegre."
        },
        indirect: {
          title: "Közvetett károk kizárva",
          description: "A YOJOB nem tehető felelőssé közvetett károkért (tevékenységvesztés, elmaradt haszon, ügyfélvesztés stb.)."
        }
      }
    },

    article12: {
      title: "12. cikk - Bizalmasság",
      intro: "A felek vállalják, hogy megtartják az együttműködésük során kicserélt összes információ bizalmas kezelését.",
      items: [
        "A bizalmas információk magukban foglalják az üzleti, technikai, pénzügyi és stratégiai adatokat",
        "A bizalmassági kötelezettség a szerződéses kapcsolat teljes időtartama alatt és annak megszűnését követő 5 évig tart",
        "Az információk nem tehetők közzé harmadik felek számára előzetes írásbeli hozzájárulás nélkül",
        "A feleknek meg kell tenniük minden szükséges intézkedést az információk bizalmas kezelésének védelmére"
      ]
    },

    article13: {
      title: "13. cikk - Személyes adatok (GDPR)",
      intro: "A személyes adatok cseréje szigorúan a szolgáltatások megvalósításához szükséges adatokra korlátozódik (kapcsolatok, igények, jelöltek profiljai).",
      cards: {
        compliance: {
          title: "GDPR megfelelés",
          description: "A személyes adatok kezelése a GDPR-nak és az adatvédelmi törvénynek megfelelően történik.",
          linkText: "Adatvédelmi irányelvek"
        },
        dpo: {
          title: "DPO kapcsolat",
          description: "A személyes adataira vonatkozó bármilyen kérelemhez vagy GDPR-jogok gyakorlásához."
        }
      },
      dpaNote: "DPA (Adatfeldolgozási Megállapodás) szükség esetén csatolható az adatcsere jellegétől függően."
    },

    article14: {
      title: "14. cikk - Időtartam és megszüntetés",
      items: {
        duration: {
          title: "Időtartam",
          description: "A szerződéses kapcsolat időtartamát a szerződés vagy az elfogadott háromoldalú ajánlat határozza meg."
        },
        earlyTermination: {
          title: "Korai megszüntetés",
          description: "30 napos felmondási idő (vagy a szerződésben megállapított időtartam) + esedékes összegek kifizetése (beleértve a jutalékokat/sikerdíjakat, ha a generáló tény elérésre került)."
        },
        breach: {
          title: "Megszüntetés teljesítés hiánya miatt",
          description: "Súlyos kötelezettségszegés esetén: emlékeztető + 15 napos helyreállítási határidő. Helyreállítás hiányában törvény erejénél fogva történő megszüntetés."
        }
      }
    },

    article15: {
      title: "15. cikk - Vis maior",
      intro: "A felek nem tehetők felelőssé, ha kötelezettségeik teljesítésének elmulasztása vagy késése a francia joggyakorlat értelmében vett vis maior esetből ered.",
      examplesTitle: "Különösen vis maior eseteket jelentenek:",
      examples: [
        "Természeti katasztrófák, árvizek, tüzek",
        "Háborúk, támadások, zavargások",
        "Általános sztrájkok, közlekedési blokádok",
        "Hálózatkimaradások (távközlés, elektromosság)",
        "Járványok, pandémiák",
        "Kormányzati egészségügyi intézkedések"
      ],
      suspension: "Vis maior esetén a kötelezettségek az esemény időtartamára felfüggesztésre kerülnek, a másik fél értesítése után."
    },

    article16: {
      title: "16. cikk - Irányadó jog és viták",
      sections: {
        law: {
          title: "Irányadó jog",
          description: "Ez az ÁSzF a francia jognak van alávetve."
        },
        amicable: {
          title: "Előzetes békés rendezési kísérlet",
          description: "Vita esetén a felek vállalják, hogy békés megoldást keresnek bármilyen bírósági eljárás előtt. Az ügyfél igénybe veheti a hagyományos közvetítést vagy bármely más alternatív vitarendezési módot."
        },
        jurisdiction: {
          title: "Illetékes bíróság",
          description: "Békés megoldás hiányában minden vita a YOJOB székhelyének bíróságainak kizárólagos joghatósága alá tartozik, kivéve, ha kötelező ellenkező szabály van érvényben."
        }
      }
    },

    article17: {
      title: "17. cikk - ÁSzF módosítása",
      intro: "A YOJOB fenntartja a jogot, hogy bármikor módosítsa ezt az ÁSzF-et.",
      items: [
        "Az alkalmazandó ÁSzF az ajánlat/szerződés elfogadásának dátumán érvényes",
        "A módosítások nem hatnak visszamenőlegesen a folyamatban lévő szerződésekre, kivéve, ha a felek kifejezett írásbeli hozzájárulása van",
        "Az ÁSzF legújabb verziója bármikor elérhető a YOJOB weboldalán"
      ]
    }
  },

  cta: {
    title: "Kérdései vannak az ÁSzF-ünkkel kapcsolatban?",
    description: "Jogi és üzleti csapatunk az Ön rendelkezésére áll az Általános Szerződési Feltételeinkkel kapcsolatos bármilyen magyarázatért.",
    backHome: "Vissza a kezdőlapra",
    contactUs: "Lépjen kapcsolatba velünk"
  },

  footer: {
    copyright: "© {year} {company} — Egyéni vállalkozó. Minden jog fenntartva.",
    links: {
      legal: "Jogi információk",
      privacy: "Adatvédelem",
      cgv: "ÁSzF"
    }
  },

  badges: {
    main: "Fő",
    optional: "Opcionális",
    mixed: "Vegyes"
  },

  common: {
    back: "Vissza",
    triggers: "Kiváltók",
    conditions: "Feltételek",
    safeguards: "Garanciák"
  }
};
