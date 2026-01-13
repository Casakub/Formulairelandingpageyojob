/**
 * 🇱🇹 LIETUVIŠKI VERTIMAI - BENDROSIOS VERSLO SĄLYGOS (BVS)
 * 
 * @version 1.0.0
 */

export const cgvLT = {
  hero: {
    badge: "B2B dokumentas - Sutartinis",
    title: "Bendrosios verslo sąlygos",
    subtitle: "BVS taikytinos Naudotojų įmonėms (NĮ) ir laikino įdarbinimo partnerių agentūroms",
    effectiveDate: "Versija galioja nuo 2025 m. gruodžio 19 d."
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Tarpininkas / Verslo brokeris"
    },
    eu: {
      title: "Naudotojo įmonė (NĮ)",
      description: "Galutinis klientas, gaunantis darbo jėgą"
    },
    ett: {
      title: "Laikino įdarbinimo agentūra",
      description: "Įdarbinimo partneris"
    }
  },

  sections: {
    article0: {
      title: "0 straipsnis - Paslaugų teikėjo tapatybė",
      fields: {
        legalForm: "Teisinė forma",
        legalFormValue: "Individualus verslininkas (EI)",
        manager: "Vadovas",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Vidaus prekybos PVM",
        vatValue: "FR79447862764",
        address: "Adresas",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontaktai",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Profesinės atsakomybės draudimas",
        description: "YOJOB turi profesinės atsakomybės draudimą, padengiantį jo atsakomybės finansines pasekmes, susijusias su jo paslaugomis."
      }
    },

    article1: {
      title: "1 straipsnis - Apibrėžimai",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Tarpininkas/verslo brokeris, užtikrinantis verslo pasiūlymų įsigijimą, kvalifikaciją, koordinavimą ir formalizavimą tarp NĮ ir agentūrų."
        },
        eu: {
          term: "Naudotojo įmonė (NĮ)",
          definition: "Galutinio kliento įmonė, gaunanti darbo jėgą, kurią teikia laikino įdarbinimo partnerių agentūra."
        },
        ett: {
          term: "Laikino įdarbinimo agentūra / Partnerių agentūra",
          definition: "Laikino įdarbinimo agentūra, atliekanti įdarbinimą, sutarčių sudarymą ir personalo teikimo organizavimą."
        },
        profile: {
          term: "Profilis",
          definition: "Kandidatas arba laikinas darbuotojas, kurį agentūra pristato NĮ per YOJOB."
        },
        mission: {
          term: "Misija",
          definition: "NĮ išreikštas įdarbinimo poreikis (profesija, apimtis, terminai, vieta, specialūs reikalavimai)."
        },
        proposition: {
          term: "Trišalis pasiūlymas",
          definition: "YOJOB struktūruotas ir NĮ bei agentūros patvirtintas verslo ir administracinis pasiūlymas (parašas arba rašytinis susitarimas)."
        },
        handover: {
          term: "Perdavimas",
          definition: "Momentas, kai agentūra tampa pagrindine NĮ kontaktu po dvigubo patvirtinimo NĮ + agentūra."
        },
        insurer: {
          term: "Kredito draudikas",
          definition: "Kredito draudimo organizacija (COFACE, Allianz Trade ir kt.), dalyvaujanti kliento rizikos analizėje ir kredito limitų skyrimo."
        }
      }
    },

    article2: {
      title: "2 straipsnis - Dalykas",
      intro: "Šios BVS reglamentuoja YOJOB paslaugas, kurios daugiausia susideda iš:",
      steps: {
        step1: {
          title: "Įsigijimas ir kvalifikacija",
          description: "Naudotojų įmonių su Europos įdarbinimo poreikiais identifikavimas ir kvalifikacija"
        },
        step2: {
          title: "Galimybių pristatymas",
          description: "Kvalifikuotų galimybių perdavimas atitinkamoms laikino įdarbinimo partnerių agentūroms"
        },
        step3: {
          title: "Pasiūlymo struktūrizavimas",
          description: "Išsamaus verslo pasiūlymo parengimas (apimtis, koordinavimas, administraciniai elementai)"
        },
        step4: {
          title: "Perdavimo organizavimas",
          description: "Perėjimo prie agentūros užtikrinimas po pasirašymo įgyvendinimui (įdarbinimas, teikimas, sąskaitų išrašymas)"
        }
      },
      yojobRole: {
        title: "YOJOB vaidmuo",
        description: "YOJOB veikia tik kaip tarpininkas. Agentūra yra atsakinga už įdarbinimą, teikimą, darbdavio atitiktį ir sąskaitų išrašymą NĮ, išskyrus atvejus, kai sutartyje aiškiai numatyta kitaip."
      }
    },

    article3: {
      title: "3 straipsnis - Sutarčių dokumentai ir hierarchija",
      intro: "Dokumentų prieštaravimų atveju taikoma ši pirmumo tvarka:",
      hierarchy: {
        rank1: {
          title: "Speciali sutartis / Specialios sąlygos",
          subtitle: "Individualizuota partnerystė arba verslo įnašas"
        },
        rank2: {
          title: "Trišalis pasiūlymas / Pasiūlymas / Užsakymas",
          subtitle: "Šalių pasirašytas dokumentas"
        },
        rank3: {
          title: "Bendrosios verslo sąlygos (BVS)",
          subtitle: "Šis dokumentas"
        },
        rank4: {
          title: "Priedai",
          subtitle: "SLA, DPA, procesai, kontroliniai sąrašai ir kt."
        }
      }
    },

    article4: {
      title: "4 straipsnis - Sutarčių schemos",
      intro: "Taikoma schema nurodyta pasiūlyme arba sutartyje. YOJOB gali veikti pagal 3 modelius:",
      schemes: {
        schemaB: {
          label: "B schema",
          badge: "Pagrindinė",
          title: "Agentūra YOJOB klientas",
          description: "YOJOB apmokama agentūros už verslo įnašą (mėnesio komisinis atlyginimas ir/arba sėkmės premija)"
        },
        schemaA: {
          label: "A schema",
          badge: "Pasirenkama",
          title: "NĮ YOJOB klientas",
          description: "YOJOB išrašo sąskaitą NĮ už papildomas paslaugas (sustiprintas koordinavimas, išplėsta dokumentų pagalba)"
        },
        schemaC: {
          label: "C schema",
          badge: "Mišri",
          title: "Kombinuotas atlyginimas",
          description: "YOJOB apmokama agentūros (B schema) IR išrašo sąskaitą NĮ už papildomas paslaugas (A schema)"
        }
      }
    },

    article5: {
      title: "5 straipsnis - Procesas ir perdavimas",
      phase1: {
        title: "5.1 Įvadinė fazė (verslo ir koordinavimas)",
        intro: "YOJOB užtikrina:",
        items: [
          "Naudotojo įmonės įsigijimą ir kvalifikaciją",
          "Misijai reikalingų elementų rinkimą",
          "Poreikio perdavimą vienai ar kelioms laikino įdarbinimo partnerių agentūroms",
          "Koordinavimą iki trišalio pasiūlymo uždarymo"
        ]
      },
      phase2: {
        title: "5.2 Perdavimo aktyvavimas",
        intro: "\"Perdavimas\" įvyksta įvykdžius du kaupinius sąlygas:",
        conditions: [
          "NĮ parašas/rašytinis susitarimas pasiūlymui",
          "Agentūros priėmimas/patvirtinimas (pajėgumas, sąlygos, atitiktis, rizika)"
        ],
        consequences: "Nuo šio momento agentūra tampa pagrindine kontaktu: įdarbinimas, sutartys, įdiegimas, teikimas, atlyginimai, komandiravimo įsipareigojimai, sąskaitų išrašymas ir išieškojimas iš NĮ."
      },
      phase3: {
        title: "5.3 Liekamosios paramos (jei numatyta)",
        description: "YOJOB gali likti kaip parama (koordinavimas/kokybė) pasiūlyme arba sutartyje nustatytu mastu."
      }
    },

    article6: {
      title: "6 straipsnis - Finansinės sąlygos ir mokėjimo būdas",
      section1: {
        title: "6.1 Principas: \"selektyvūs\" terminai kiekvienu atveju",
        intro: "Atsižvelgiant į pramonės praktiką (kredito draudimas, kliento rizika, sąskaitų išrašymo organizavimas), mokėjimo sąlygos nustatomos kiekvienu atveju galiojančiame pasiūlyme/sutartyje.",
        modalitiesTitle: "Būdai gali apimti:",
        modalities: [
          "Mokėjimas gavus",
          "Išankstinis mokėjimas / avansas",
          "Savaitinis sąskaitų išrašymas",
          "Garantijos (užstatas, kredito limito apribojimas)"
        ],
        legalLimit: "Kai priskiriamas mokėjimo terminas \"su terminu\", laikomasi teisinių apribojimų: 60 dienų nuo sąskaitos išdavimo datos arba 45 dienos mėnesio pabaigoje, jei nurodyta."
      },
      section2: {
        title: "6.2 Standartinis tinklas — NĮ \"rizikos\"",
        intro: "Rizikos klasifikacija nustatoma iš 3 kaupiamųjų šaltinių:",
        sources: {
          insurer: {
            title: "Kredito draudikas",
            description: "Draudimas/kredito limitas/sąlygos"
          },
          score: {
            title: "Agentūros vidinis įvertinimas",
            description: "Rizikos ir išieškojimo politika"
          },
          history: {
            title: "Mokėjimų istorija",
            description: "Elgesys ir poveikis"
          }
        },
        primacy: "Pirmenybė: prieštaravimų atveju kredito draudiko sprendimas turi pirmenybę prieš kitus signalus.",
        levelsTitle: "Rizikos lygiai ir mokėjimo sąlygos",
        levels: {
          r0: {
            level: "R0",
            title: "Standartinė",
            trigger: "Draudikas: apdraustas / kredito limitas OK; Agentūros įvertinimas: A/B; Istorija: gera (0 incidentų)",
            conditions: "Mėnesio + sutartas terminas (pvz., 30d) teisinio limito ribose",
            safeguards: "Standartinis kredito limitas"
          },
          r1: {
            level: "R1",
            title: "Stebima",
            trigger: "Draudikas: ribotas kredito limitas; Agentūros įvertinimas: B/C; Istorija: nedideli vėlavimai",
            conditions: "Gavus ARBA avansas 30-50% + likutis gavus",
            safeguards: "Ribotas kredito limitas + savaitinis peržiūrėjimas"
          },
          r2: {
            level: "R2",
            title: "Sustiprintas",
            trigger: "Draudikas: nepakankamas dalinis draudimas; Agentūros įvertinimas: C/D; Istorija: reikšmingi vėlavimai",
            conditions: "Savaitinis gavus ARBA avansas 50-70% + savaitinė korekcija",
            safeguards: "Pradžia serijiniu būdu (ribotas tūris)"
          },
          r3: {
            level: "R3",
            title: "Kritinė",
            trigger: "Draudikas: ATSISAKYMAS / neapdraustas; Agentūros įvertinimas: D; Istorija: rimti incidentai",
            conditions: "100% išankstinis mokėjimas (arba pradžios atsisakymas)",
            safeguards: "Sąlyginis pradžia su mokėjimu; sustabdymas nukrypimo atveju"
          }
        },
        transparency: {
          title: "Skaidrumas ir priėmimas",
          description: "Trišalis pasiūlymas nurodo lygį (R0/R1/R2/R3), sąskaitų išrašymo būdą ir mokėjimo sąlygą. Pasiūlymo parašas/priėmimas yra lygus šių būdų priėmimui."
        },
        adjustment: {
          title: "Dinaminės koregavimo sąlyga",
          description: "Rizikos raidos atveju (draudiko kredito limito mažinimas, vėlavimai, incidentai) agentūra gali peržiūrėti mokėjimo sąlygas kitam periodui po NĮ pranešimo, atsižvelgiant į galiojančią sutartį."
        }
      },
      section3: {
        title: "6.3 Mokėjimo vėlavimai",
        intro: "YOJOB išduotos sąskaitos vėlavimo atveju (A schema arba sąskaitų išrašymas agentūra→YOJOB):",
        penalties: [
          "Delspinigiai mokėtini be priminimo, pagal sutartyje arba taikomoje teisinėje sistemoje nustatytą tarifą",
          "Fiksuota kompensacija už išieškojimą: 40 € už neapmokėtą sąskaitą",
          "Galimas paslaugų sustabdymas po rašytinio pranešimo"
        ]
      }
    },

    article7: {
      title: "7 straipsnis - Naudotojo įmonės (NĮ) įsipareigojimai",
      intro: "NĮ įsipareigoja:",
      obligations: [
        "Pateikti tikslų ir išsamų poreikį ir aktyvų bendradarbiavimą (nuomonės, patvirtinimai, planavimas)",
        "Perduoti saugumo reikalavimus ir patekimo į vietas būdą",
        "Gerbti informacijos konfidencialumą (agentūra, profiliai, verslo sąlygos)",
        "Pripažinti, kad darbo jėgos įdarbinimas, teikimas ir sąskaitų išrašymas yra agentūros atsakomybė (išskyrus atvejus, kai raštu numatyta kita schema)",
        "Laikytis trišaliame pasiūlyme nurodytų mokėjimo sąlygų"
      ]
    },

    article8: {
      title: "8 straipsnis - Partnerių agentūros įsipareigojimai ir atlyginimas",
      section1: {
        title: "8.1 Mėnesio komisinis atlyginimas (verslo įnašas)",
        intro: "Agentūra skolinga YOJOB komisiją, apskaičiuotą iš neto sumos, kurią agentūra išrašo NĮ sąskaitą už misijas, kildinamas iš YOJOB.",
        details: {
          rate: {
            label: "Komisinio atlyginimo tarifas",
            value: "Kintamas pagal sutartį (pvz., 3-8%)"
          },
          base: {
            label: "Skaičiavimo pagrindas",
            value: "Neto suma išrašyta NĮ (YOJOB misijos)"
          },
          rhythm: {
            label: "Sąskaitų išrašymo ritmas",
            value: "Mėnesinis"
          },
          deadline: {
            label: "Mokėjimo terminas",
            value: "Nuo NĮ mokėjimo gavimo, be vėlavimo"
          }
        }
      },
      section2: {
        title: "8.2 Sėkmės premija \"išdėstymas\"",
        intro: "Tam tikroms misijoms mėnesio komisijai gali būti pridėta sėkmės premija:",
        items: {
          trigger: {
            label: "Generuojantis veiksnys",
            value: "Galiojančio bandomojo laikotarpio pabaiga (žr. 9 str.), be nutraukimo, priskiriamo Profiliui"
          },
          exigibility: {
            label: "Išieškojamumas",
            value: "Momentinis pilnas mokėjimas YOJOB sąskaitos išdavimo metu"
          },
          amount: {
            label: "Suma",
            value: "Kintamas pagal sutartį (pvz., % metinės bruto algos arba fiksuota suma)"
          }
        }
      },
      section3: {
        title: "8.3 Ataskaitų teikimas",
        intro: "Agentūra teikia YOJOB su sutartu dažnumu (pvz., mėnesinis):",
        items: [
          "YOJOB misijų sąrašas (NĮ, išdėstymas, datos, tūriai)",
          "Susijusi neto suma pagal misiją",
          "Pagrįsti pagrindžiantys elementai",
          "BDAR ir komercinės paslapties laikymasis"
        ]
      }
    },

    article9: {
      title: "9 straipsnis - Reguliuojamasis bandomasis laikotarpis",
      section1: {
        title: "9.1 Principas",
        description: "Taikomas bandomasis laikotarpis yra tas, kuris nustatytas sutarčių dokumentuose (agentūra↔NĮ ir/arba agentūra↔Profilis) ir taikomuose reglamentuose/kolektyvinėse sutartyse. Jis negali viršyti maksimalių leidžiamų trukmių."
      },
      section2: {
        title: "9.2 Komandiravimas / Laikinas darbas (misijos sutartis)",
        intro: "Misijos sutartis gali turėti sutartimi nustatytą bandomąjį laikotarpį; jo nesant, jis apribotas iki:",
        durations: [
          { duration: "2 dienos", condition: "Sutartis ≤ 1 mėnuo" },
          { duration: "3 dienos", condition: "1 mėnuo < sutartis ≤ 2 mėnesiai" },
          { duration: "5 dienos", condition: "Sutartis > 2 mėnesiai" }
        ]
      },
      section3: {
        title: "9.3 Įdarbinimas (neterminuotas/panašus) — Teisinis apribojimas",
        intro: "Neterminuotai sutarčiai bandomojo laikotarpio maksimali trukmė yra ypač:",
        durations: [
          { duration: "2 mėnesiai", condition: "Darbininkai / Darbuotojai", color: "green" },
          { duration: "3 mėnesiai", condition: "Vidurinis valdymas / Technikai", color: "blue" },
          { duration: "4 mėnesiai", condition: "Kadrai", color: "violet" }
        ],
        note: "Pagal taikomas taisykles ir galimą įstatymu reguliuojamą pratęsimą."
      }
    },

    article10: {
      title: "10 straipsnis - Apėjimo draudimas — Trukmė 24 mėnesiai",
      intro: "Sutartinių santykių metu ir 24 mėnesius po paskutinio kontakto (agentūra ir/arba Profilis) šalys draudžia bet kokį apėjimą:",
      actors: {
        eu: "NĮ draudimas tiesiogiai sudaryti sutartį su YOJOB pristatyta agentūra (arba susijusia struktūra), apeinant YOJOB, be rašytinio susitarimo.",
        ett: "Agentūros draudimas apėjimas YOJOB atlyginimo NĮ/galimybei, kildinčiai iš YOJOB, be rašytinio susitarimo."
      },
      penalty: {
        title: "Sutartinė sankcija",
        description: "Šios apėjimo draudimo sąlygos pažeidimo atveju pažeidusi šalis įsipareigoja sumokėti YOJOB fiksuotą kompensaciją, kurios suma nustatyta sutartyje (arba procentinis sugeneruotų/įvertintų sumų ekvivalentas), nepažeidžiant papildomos kompensacijos."
      }
    },

    article11: {
      title: "11 straipsnis - Atsakomybė ir apribojimas",
      items: {
        obligation: {
          title: "Priemonių įsipareigojimas",
          description: "YOJOB įsipareigoja naudoti visas reikalingas priemones savo tarpininkavimo paslaugų įgyvendinimui, be rezultato garantijos."
        },
        nonResponsibility: {
          title: "Nėra atsakomybės agentūros/Profiliai",
          description: "YOJOB nėra atsakingas už agentūros, įdarbintų Profilių veiksmus, neveikimą ar neįvykdymą, nei už kredito/draudimo sprendimus."
        },
        cap: {
          title: "Apribojimas",
          description: "Išskyrus didelį aplaidumą ar tyčią, YOJOB atsakomybė apribota iki neto sumos, gautos susijusios sutarties atžvilgiu per pastaruosius 12 mėnesių."
        },
        indirect: {
          title: "Netiesioginiai nuostoliai pašalinti",
          description: "YOJOB negali būti laikomas atsakingu už netiesinius nuostolius (veiklos praradimas, prarastas pelnas, klientų praradimas ir kt.)."
        }
      }
    },

    article12: {
      title: "12 straipsnis - Konfidencialumas",
      intro: "Šalys įsipareigoja išlaikyti visų jų bendradarbiavimo metu keičiamų informacijų konfidencialumą.",
      items: [
        "Konfidenciali informacija apima verslo, techninius, finansinius ir strateginius duomenis",
        "Konfidencialumo įsipareigojimas trunka sutartinių santykių metu ir 5 metus po jų pabaigos",
        "Informacija negali būti atskleista trečiosioms šalims be išankstinio rašytinio sutikimo",
        "Šalys privalo imtis visų reikalingų priemonių informacijos konfidencialumui apsaugoti"
      ]
    },

    article13: {
      title: "13 straipsnis - Asmens duomenys (BDAR)",
      intro: "Asmens duomenų keitimasis griežtai apribotas iki duomenų, reikalingų paslaugų įgyvendinimui (kontaktai, poreikiai, kandidatų profiliai).",
      cards: {
        compliance: {
          title: "BDAR atitiktis",
          description: "Asmens duomenų tvarkymas atliekamas pagal BDAR ir duomenų apsaugos įstatymą.",
          linkText: "Privatumo politika"
        },
        dpo: {
          title: "DPO kontaktai",
          description: "Visiems prašymams dėl jūsų asmens duomenų arba BDAR teisių įgyvendinimo."
        }
      },
      dpaNote: "DPA (Duomenų tvarkymo sutartis) gali būti pridėta pagal poreikį, priklausomai nuo duomenų keitimosi pobūdžio."
    },

    article14: {
      title: "14 straipsnis - Trukmė ir nutraukimas",
      items: {
        duration: {
          title: "Trukmė",
          description: "Sutartinių santykių trukmė nustatyta sutartyje arba priimtame trišaliame pasiūlyme."
        },
        earlyTermination: {
          title: "Išankstinis nutraukimas",
          description: "Įspėjimo laikotarpis 30 dienų (arba sutartyje nustatyta trukmė) + mokėtinų sumų apmokėjimas (įskaitant komisijas/sėkmės premijas, jei pasiektas generuojantis veiksnys)."
        },
        breach: {
          title: "Nutraukimas dėl neįvykdymo",
          description: "Didelio įsipareigojimų neįvykdymo atveju: priminimas + pataisymo terminas 15 dienų. Nesant pataisymo, nutraukimas pagal įstatymą."
        }
      }
    },

    article15: {
      title: "15 straipsnis - Nenugalima jėga",
      intro: "Šalys negali būti laikomos atsakingomis, jei jų įsipareigojimų neįvykdymas ar vėlavimas kyla iš nenugalimos jėgos atvejo Prancūzijos jurisprudencijos prasme.",
      examplesTitle: "Ypač nenugalimos jėgos atvejus sudaro:",
      examples: [
        "Gamtos katastrofos, potvyniai, gaisrai",
        "Karai, puolimai, neramumai",
        "Generaliniai streikai, transporto blokados",
        "Tinklo pertrūkiai (telekomunikacijos, elektra)",
        "Epidemijos, pandemijos",
        "Vyriausybės sveikatos priemonės"
      ],
      suspension: "Nenugalimos jėgos atveju įsipareigojimai sustabdomi įvykio metu po pranešimo kitai šaliai."
    },

    article16: {
      title: "16 straipsnis - Taikoma teisė ir ginčai",
      sections: {
        law: {
          title: "Taikoma teisė",
          description: "Šios BVS yra Prancūzijos teisės dalykas."
        },
        amicable: {
          title: "Išankstinis taikaus sprendimo bandymas",
          description: "Ginčo atveju šalys įsipareigoja ieškoti taikaus sprendimo prieš bet kokią teismo procedūrą. Klientas gali taikyti konvencinę mediaciją arba bet kokį kitą alternatyvų ginčų sprendimo būdą."
        },
        jurisdiction: {
          title: "Kompetentingas teismas",
          description: "Nesant taikaus sprendimo, visi ginčai priklauso išskirtinei YOJOB buveinės teismų jurisdikcijai, išskyrus atvejus, kai taikoma priverstinė priešinga taisyklė."
        }
      }
    },

    article17: {
      title: "17 straipsnis - BVS keitimas",
      intro: "YOJOB pasilieka teisę bet kuriuo metu keisti šias BVS.",
      items: [
        "BVS taikytinos tos, kurios galiojo pasiūlymo/sutarties priėmimo datą",
        "Pakeitimai neturi atgalinio poveikio vykstančioms sutartims, išskyrus atvejus, kai yra aiškus rašytinis šalių sutikimas",
        "Naujausią BVS versiją galima peržiūrėti bet kuriuo metu YOJOB svetainėje"
      ]
    }
  },

  cta: {
    title: "Turite klausimų apie mūsų BVS?",
    description: "Mūsų teisinė ir verslo komanda yra jūsų žinioje bet kokiems paaiškinimams dėl šių Bendrųjų verslo sąlygų.",
    backHome: "Grįžti į pagrindinį puslapį",
    contactUs: "Susisiekite su mumis"
  },

  footer: {
    copyright: "© {year} {company} — Individualus verslininkas. Visos teisės saugomos.",
    links: {
      legal: "Teisinė informacija",
      privacy: "Privatumas",
      cgv: "BVS"
    }
  },

  badges: {
    main: "Pagrindinė",
    optional: "Pasirenkama",
    mixed: "Mišri"
  },

  common: {
    back: "Atgal",
    triggers: "Trigeriai",
    conditions: "Sąlygos",
    safeguards: "Garantijos"
  }
};
