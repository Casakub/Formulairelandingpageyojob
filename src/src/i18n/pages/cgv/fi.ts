/**
 * 🇫🇮 SUOMENKIELISET KÄÄNNÖKSET - YLEISET MYYNTIEHDOT (YME)
 * 
 * @version 1.0.0
 */

export const cgvFI = {
  hero: {
    badge: "B2B-asiakirja - Sopimusperusteinen",
    title: "Yleiset myyntiehdot",
    subtitle: "YME sovellettavaksi Käyttäjäyrityksille (KY) ja henkilöstövuokrausyritys kumppaneille",
    effectiveDate: "Voimassa oleva versio 19. joulukuuta 2025 alkaen"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Välittäjä / Liiketoimintavälittäjä"
    },
    eu: {
      title: "Käyttäjäyritys (KY)",
      description: "Loppuasiakas joka vastaanottaa työvoiman"
    },
    ett: {
      title: "Henkilöstövuokrausyritys",
      description: "Rekrytointikumppani"
    }
  },

  sections: {
    article0: {
      title: "Artikla 0 - Palveluntarjoajan tunnistetiedot",
      fields: {
        legalForm: "Oikeudellinen muoto",
        legalFormValue: "Yksityinen elinkeinonharjoittaja (EI)",
        manager: "Johtaja",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "EU:n sisäinen ALV-tunnus",
        vatValue: "FR79447862764",
        address: "Osoite",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Yhteystiedot",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Ammattivastuu vakuutus",
        description: "YOJOB:lla on ammattivastuu vakuutus, joka kattaa sen palveluihin liittyvän vastuun taloudelliset seuraukset."
      }
    },

    article1: {
      title: "Artikla 1 - Määritelmät",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Välittäjä/liiketoimintavälittäjä, joka varmistaa liiketoimintatarjousten hankinnan, pätevyyden, koordinoinnin ja virallistamisen KY:n ja toimistojen välillä."
        },
        eu: {
          term: "Käyttäjäyritys (KY)",
          definition: "Loppuasiakasyritys, joka vastaanottaa henkilöstövuokrausyritys kumppanin toimittaman työvoiman."
        },
        ett: {
          term: "Henkilöstövuokrausyritys / Kumppani toimisto",
          definition: "Henkilöstövuokrausyritys, joka suorittaa rekrytoinnin, sopimuksen teon ja henkilöstötoimituksen järjestelyn."
        },
        profile: {
          term: "Profiili",
          definition: "Ehdokas tai vuokratyöntekijä, jonka toimisto esittelee KY:lle YOJOB:n kautta."
        },
        mission: {
          term: "Tehtävä",
          definition: "KY:n ilmaisema rekrytointitarve (ammatti, määrä, määräajat, sijainti, erityisvaatimukset)."
        },
        proposition: {
          term: "Kolmikantaehdotus",
          definition: "Strukturoitu ja KY:n ja toimiston vahvistama YOJOB:n liiketoiminta- ja hallinnollinen ehdotus (allekirjoitus tai kirjallinen sopimus)."
        },
        handover: {
          term: "Luovutus",
          definition: "Hetki, jolloin toimistosta tulee KY:n pääyhteyshenkilö kaksinkertaisen vahvistuksen KY + toimisto jälkeen."
        },
        insurer: {
          term: "Luottovakuuttaja",
          definition: "Luottovakuutusorganisaatio (COFACE, Allianz Trade jne.), joka osallistuu asiakasriskien analyysiin ja luottolimiittien myöntämiseen."
        }
      }
    },

    article2: {
      title: "Artikla 2 - Kohde",
      intro: "Nämä YME säätelevät YOJOB:n palveluja, jotka koostuvat pääasiassa:",
      steps: {
        step1: {
          title: "Hankinta ja pätevyys",
          description: "Käyttäjäyritysten tunnistaminen ja pätevyys eurooppalaisilla rekrytointitarpeilla"
        },
        step2: {
          title: "Mahdollisuuksien esittely",
          description: "Pätevien mahdollisuuksien siirtäminen sopiviin henkilöstövuokrausyritys kumppaneihin"
        },
        step3: {
          title: "Ehdotuksen strukturointi",
          description: "Yksityiskohtaisen liiketoimintaehdotuksen valmistelu (määrä, koordinointi, hallinnolliset osat)"
        },
        step4: {
          title: "Luovutuksen järjestäminen",
          description: "Siirtymisen varmistaminen toimistolle allekirjoituksen jälkeen toteutusta varten (rekrytointi, toimitus, laskutus)"
        }
      },
      yojobRole: {
        title: "YOJOB:n rooli",
        description: "YOJOB toimii vain välittäjänä. Toimisto on vastuussa rekrytoinnista, toimituksesta, työnantajan noudattamisesta ja laskutuksesta KY:lle, ellei sopimuksessa nimenomaisesti toisin määrätä."
      }
    },

    article3: {
      title: "Artikla 3 - Sopimusasiakirjat ja hierarkia",
      intro: "Asiakirjojen välisessä ristiriidassa sovelletaan seuraavaa tärkeysjärjestystä:",
      hierarchy: {
        rank1: {
          title: "Erityissopimus / Erityisehdot",
          subtitle: "Mukautettu kumppanuus tai liiketoiminnan panos"
        },
        rank2: {
          title: "Kolmikantaehdotus / Ehdotus / Tilaus",
          subtitle: "Osapuolten allekirjoittama asiakirja"
        },
        rank3: {
          title: "Yleiset myyntiehdot (YME)",
          subtitle: "Tämä asiakirja"
        },
        rank4: {
          title: "Liitteet",
          subtitle: "SLA, DPA, prosessit, tarkistuslistat jne."
        }
      }
    },

    article4: {
      title: "Artikla 4 - Sopimusmallit",
      intro: "Sovellettava malli ilmoitetaan ehdotuksessa tai sopimuksessa. YOJOB voi työskennellä 3 mallin mukaan:",
      schemes: {
        schemaB: {
          label: "Malli B",
          badge: "Pääasiallinen",
          title: "Toimisto asiakas YOJOB:lla",
          description: "YOJOB saa korvauksen toimistolta liiketoiminnan panoksesta (kuukausittainen provisio ja/tai onnistumisbonus)"
        },
        schemaA: {
          label: "Malli A",
          badge: "Valinnainen",
          title: "KY asiakas YOJOB:lla",
          description: "YOJOB laskuttaa KY:tä lisäpalveluista (vahvistettu koordinointi, laajennettu dokumentaatiotuki)"
        },
        schemaC: {
          label: "Malli C",
          badge: "Sekoitettu",
          title: "Yhdistetty korvaus",
          description: "YOJOB saa korvauksen toimistolta (Malli B) JA laskuttaa KY:tä lisäpalveluista (Malli A)"
        }
      }
    },

    article5: {
      title: "Artikla 5 - Prosessi ja luovutus",
      phase1: {
        title: "5.1 Esittelyvaihe (liiketoiminta ja koordinointi)",
        intro: "YOJOB varmistaa:",
        items: [
          "Käyttäjäyrityksen hankinnan ja pätevyyden",
          "Tehtävään tarvittavien osien keräämisen",
          "Tarpeen siirtämisen yhdelle tai useammalle henkilöstövuokrausyritys kumppanille",
          "Koordinoinnin kolmikantaehdotuksen sulkemiseen asti"
        ]
      },
      phase2: {
        title: "5.2 Luovutuksen aktivointi",
        intro: "\"Luovutus\" tapahtuu kahden kumulatiivisen ehdon täytyttyä:",
        conditions: [
          "KY:n allekirjoitus/kirjallinen sopimus ehdotukseen",
          "Toimiston hyväksyntä/vahvistus (kapasiteetti, ehdot, noudattaminen, riski)"
        ],
        consequences: "Tästä hetkestä alkaen toimistosta tulee pääyhteyshenkilö: rekrytointi, sopimukset, esittely, toimitus, palkat, lähettämisvelvoitteet, laskutus ja perintä KY:ltä."
      },
      phase3: {
        title: "5.3 Jäljellä oleva tuki (jos määrätty)",
        description: "YOJOB voi jäädä tueksi (koordinointi/laatu) ehdotuksessa tai sopimuksessa määritetyssä laajuudessa."
      }
    },

    article6: {
      title: "Artikla 6 - Taloudelliset ehdot ja maksutapa",
      section1: {
        title: "6.1 Periaate: \"valikoivat\" ehdot jokaiselle tapaukselle",
        intro: "Ottaen huomioon alan käytännöt (luottovakuutus, asiakasriski, laskutuksen järjestäminen) maksuehdot määritetään jokaiselle tapaukselle sovellettavassa ehdotuksessa/sopimuksessa.",
        modalitiesTitle: "Menetelmät voivat sisältää:",
        modalities: [
          "Maksu vastaanotettaessa",
          "Ennakkomaksu / ennakko",
          "Viikoittainen laskutus",
          "Takuut (talletus, luottolimiitin rajoitus)"
        ],
        legalLimit: "Kun myönnetään maksuehdolle \"eräpäivällä\", noudatetaan oikeudellisia rajoja: 60 päivää laskun päiväyksestä tai 45 päivää kuukauden lopussa, jos määrätty."
      },
      section2: {
        title: "6.2 Vakioverkosto — KY \"riskit\"",
        intro: "Riskien luokittelu määritetään 3 kumulatiivisesta lähteestä:",
        sources: {
          insurer: {
            title: "Luottovakuuttaja",
            description: "Kattavuus/luottolimiitti/ehdot"
          },
          score: {
            title: "Toimiston sisäinen arviointi",
            description: "Riski- ja perintäpolitiikka"
          },
          history: {
            title: "Maksuhistoria",
            description: "Käyttäytyminen ja vaikutus"
          }
        },
        primacy: "Ensisijaisuus: ristiriitatilanteessa luottovakuuttajan päätöksellä on etusija muihin signaaleihin nähden.",
        levelsTitle: "Riskitasot ja maksuehdot",
        levels: {
          r0: {
            level: "R0",
            title: "Vakio",
            trigger: "Vakuuttaja: katettu / luottolimiitti OK; Toimiston arviointi: A/B; Historia: hyvä (0 tapausta)",
            conditions: "Kuukausittain + sovittu määräaika (esim. 30pv) oikeudellisen rajan sisällä",
            safeguards: "Vakio luottolimiitti"
          },
          r1: {
            level: "R1",
            title: "Valvottu",
            trigger: "Vakuuttaja: rajoitettu luottolimiitti; Toimiston arviointi: B/C; Historia: pieniä viivästyksiä",
            conditions: "Vastaanotettaessa TAI ennakko 30-50% + loppuosa vastaanotettaessa",
            safeguards: "Rajoitettu luottolimiitti + viikoittainen tarkistus"
          },
          r2: {
            level: "R2",
            title: "Vahvistettu",
            trigger: "Vakuuttaja: riittämätön osittainen kattavuus; Toimiston arviointi: C/D; Historia: merkittäviä viivästyksiä",
            conditions: "Viikoittain vastaanotettaessa TAI ennakko 50-70% + viikoittainen säätö",
            safeguards: "Aloitus sarjoissa (rajoitettu määrä)"
          },
          r3: {
            level: "R3",
            title: "Kriittinen",
            trigger: "Vakuuttaja: HYLKÄYS / vakuuttamaton; Toimiston arviointi: D; Historia: vakavia tapauksia",
            conditions: "100% ennakkomaksu (tai aloituksesta kieltäytyminen)",
            safeguards: "Ehdollinen aloitus maksulla; keskeytys poikkeaman yhteydessä"
          }
        },
        transparency: {
          title: "Läpinäkyvyys ja hyväksyntä",
          description: "Kolmikantaehdotus ilmaisee tason (R0/R1/R2/R3), laskutusmenetelmän ja maksuehdon. Ehdotuksen allekirjoitus/hyväksyntä vastaa näiden menetelmien hyväksyntää."
        },
        adjustment: {
          title: "Dynaaminen säätölauseke",
          description: "Riskin kehittyessä (vakuuttajan luottolimiitin lasku, viivästykset, tapaukset) toimisto voi tarkistaa seuraavan jakson maksuehdot ilmoittamalla KY:lle, noudattaen voimassa olevaa sopimusta."
        }
      },
      section3: {
        title: "6.3 Maksuviivästykset",
        intro: "YOJOB:n myöntämän laskun viivästyessä (Malli A tai laskutus toimisto→YOJOB):",
        penalties: [
          "Viivästyskorot maksetaan ilman muistutusta, sopimuksessa määrätyn koron tai sovellettavan oikeudellisen kehyksen mukaisesti",
          "Kiinteä perintäkorvaus: 40 € maksamatonta laskua kohden",
          "Mahdollinen palvelujen keskeytys kirjallisen ilmoituksen jälkeen"
        ]
      }
    },

    article7: {
      title: "Artikla 7 - Käyttäjäyrityksen (KY) velvoitteet",
      intro: "KY sitoutuu:",
      obligations: [
        "Toimittamaan tarkan ja täydellisen tarpeen sekä aktiivisen yhteistyön (mielipiteet, vahvistukset, suunnittelu)",
        "Siirtämään turvallisuusvaatimukset ja paikkojen pääsymenetelmät",
        "Kunnioittamaan tietojen luottamuksellisuutta (toimisto, profiilit, liiketoimintaehdot)",
        "Tunnustamaan, että rekrytointi, toimitus ja työvoiman laskutus on toimiston vastuulla (ellei toisin kirjallisesti määrätä)",
        "Noudattamaan kolmikantaehdotuksessa ilmoitettuja maksuehtoja"
      ]
    },

    article8: {
      title: "Artikla 8 - Kumppani toimiston velvoitteet ja korvaus",
      section1: {
        title: "8.1 Kuukausittainen provisio (liiketoiminnan panos)",
        intro: "Toimisto on velkaa YOJOB:lle provision, joka lasketaan nettosummasta, jonka toimisto laskuttaa KY:ltä YOJOB:sta peräisin olevista tehtävistä.",
        details: {
          rate: {
            label: "Provisioaste",
            value: "Vaihteleva sopimuksen mukaan (esim. 3-8%)"
          },
          base: {
            label: "Laskentaperusta",
            value: "KY:ltä laskutettu nettosumma (YOJOB-tehtävät)"
          },
          rhythm: {
            label: "Laskutusrytmi",
            value: "Kuukausittainen"
          },
          deadline: {
            label: "Maksuaika",
            value: "KY:n maksun vastaanottamisesta, ilman viivästystä"
          }
        }
      },
      section2: {
        title: "8.2 Onnistumisbonus \"sijoitus\"",
        intro: "Tietyille tehtäville voidaan lisätä onnistumisbonus kuukausittaiseen provisioon:",
        items: {
          trigger: {
            label: "Generoiva tekijä",
            value: "Voimassa olevan koeajan päättyminen (katso art. 9), ilman Profiiliin liittyvää keskeytystä"
          },
          exigibility: {
            label: "Vaadittavuus",
            value: "Välitön täysi maksu YOJOB-laskun myöntämisen yhteydessä"
          },
          amount: {
            label: "Määrä",
            value: "Vaihteleva sopimuksen mukaan (esim. % vuosittaisesta bruttopalkasta tai kiinteä summa)"
          }
        }
      },
      section3: {
        title: "8.3 Raportointi",
        intro: "Toimisto toimittaa YOJOB:lle sovitulla taajuudella (esim. kuukausittain):",
        items: [
          "Luettelo YOJOB-tehtävistä (KY, sijoitus, päivämäärät, määrät)",
          "Liittyvä nettosumma tehtävää kohti",
          "Kohtuulliset perustelevat osat",
          "GDPR- ja liikesalaisuuksien noudattaminen"
        ]
      }
    },

    article9: {
      title: "Artikla 9 - Lakisääteinen koeaika",
      section1: {
        title: "9.1 Periaate",
        description: "Sovellettava koeaika on se, joka on määritetty sopimusasiakirjoissa (toimisto↔KY ja/tai toimisto↔Profiili) ja sovellettavissa säännöissä/työehtosopimuksissa. Se ei saa ylittää sallittuja enimmäiskestoja."
      },
      section2: {
        title: "9.2 Lähettäminen / Vuokratyö (tehtäväsopimus)",
        intro: "Tehtäväsopimuksessa voi olla sopimuksellinen koeaika; sen puuttuessa se on rajoitettu:",
        durations: [
          { duration: "2 päivää", condition: "Sopimus ≤ 1 kuukausi" },
          { duration: "3 päivää", condition: "1 kuukausi < sopimus ≤ 2 kuukautta" },
          { duration: "5 päivää", condition: "Sopimus > 2 kuukautta" }
        ]
      },
      section3: {
        title: "9.3 Palvelussuhde (toistaiseksi/vastaava) — Oikeudellinen rajoitus",
        intro: "Toistaiseksi voimassa olevassa sopimuksessa koeajan enimmäiskesto on erityisesti:",
        durations: [
          { duration: "2 kuukautta", condition: "Työntekijät / Toimihenkilöt", color: "green" },
          { duration: "3 kuukautta", condition: "Keskijohdot / Teknikot", color: "blue" },
          { duration: "4 kuukautta", condition: "Johtajat", color: "violet" }
        ],
        note: "Sovellettavien sääntöjen ja mahdollisen lainsäädännöllisen jatkamisen mukaisesti."
      }
    },

    article10: {
      title: "Artikla 10 - Kiertämiskielto — Kesto 24 kuukautta",
      intro: "Sopimussuhteiden aikana ja 24 kuukautta viimeisen yhteyden jälkeen (toimisto ja/tai Profiili) osapuolet kieltävät kaiken kiertämisen:",
      actors: {
        eu: "Kielto KY:lle tehdä sopimus suoraan YOJOB:n esittelemän toimiston (tai sidosyksikön) kanssa, kiertäen YOJOB:n, ilman kirjallista sopimusta.",
        ett: "Kielto toimistolle kiertää YOJOB:n korvausta YOJOB:sta peräisin olevasta KY:sta/mahdollisuudesta, ilman kirjallista sopimusta."
      },
      penalty: {
        title: "Sopimussakko",
        description: "Tämän kiertämiskieltoa koskevan lausekkeen rikkomisen yhteydessä laiminlyönyt osapuoli sitoutuu maksamaan YOJOB:lle kiinteän vahingonkorvauksen, jonka määrä ilmoitetaan sopimuksessa (tai prosenttiosuus vastaava tuotetuista/arvioiduista summista), vaikuttamatta lisävahingonkorvauksiin."
      }
    },

    article11: {
      title: "Artikla 11 - Vastuu ja rajoitus",
      items: {
        obligation: {
          title: "Keinojen velvoite",
          description: "YOJOB sitoutuu käyttämään kaikkia tarvittavia keinoja välityspalvelujensa toteuttamiseen, ilman tulostakausta."
        },
        nonResponsibility: {
          title: "Ei vastuuta toimisto/Profiilit",
          description: "YOJOB ei ole vastuussa toimiston, palkattujen Profiilien toimista, laiminlyönneistä tai täyttämättä jättämisestä, eikä luotto-/vakuutuspäätöksistä."
        },
        cap: {
          title: "Rajoitus",
          description: "Lukuun ottamatta törkeää huolimattomuutta tai tahallisuutta, YOJOB:n vastuu on rajoitettu nettosummaan, joka on saatu kyseisestä sopimuksesta viimeisen 12 kuukauden aikana."
        },
        indirect: {
          title: "Epäsuorat vahingot poissuljettu",
          description: "YOJOB:ta ei voida pitää vastuullisena epäsuorista vahingoista (liiketoiminnan menetys, menetetty voitto, asiakkaiden menetys jne.)."
        }
      }
    },

    article12: {
      title: "Artikla 12 - Luottamuksellisuus",
      intro: "Osapuolet sitoutuvat säilyttämään kaikkien yhteistyönsä puitteissa vaihdettujen tietojen luottamuksellisuuden.",
      items: [
        "Luottamukselliset tiedot sisältävät liiketoiminta-, tekniset, taloudelliset ja strategiset tiedot",
        "Luottamuksellisuusvelvoite kestää sopimussuhteiden aikana ja 5 vuotta sen päättymisen jälkeen",
        "Tietoja ei saa paljastaa kolmansille osapuolille ilman ennalta annettua kirjallista suostumusta",
        "Osapuolten on toteutettava kaikki tarvittavat toimenpiteet tietojen luottamuksellisuuden suojaamiseksi"
      ]
    },

    article13: {
      title: "Artikla 13 - Henkilötiedot (GDPR)",
      intro: "Henkilötietojen vaihto on tiukasti rajoitettu palvelujen toteuttamiseen tarvittaviin tietoihin (yhteyshenkilöt, tarpeet, ehdokasprofiilit).",
      cards: {
        compliance: {
          title: "GDPR-noudattaminen",
          description: "Henkilötietojen käsittely suoritetaan GDPR:n ja tietosuojalain mukaisesti.",
          linkText: "Tietosuojakäytäntö"
        },
        dpo: {
          title: "DPO-yhteyshenkilö",
          description: "Kaikki henkilötietojasi tai GDPR-oikeuksiesi käyttöä koskevat kyselyt."
        }
      },
      dpaNote: "DPA (Tietojenkäsittelysopimus) voidaan lisätä tarpeen mukaan tiedonvaihdon luonteen mukaan."
    },

    article14: {
      title: "Artikla 14 - Kesto ja irtisanominen",
      items: {
        duration: {
          title: "Kesto",
          description: "Sopimussuhteiden kesto ilmoitetaan sopimuksessa tai hyväksytyssä kolmikantaehdotuksessa."
        },
        earlyTermination: {
          title: "Ennenaikainen irtisanominen",
          description: "Irtisanomisaika 30 päivää (tai sopimuksessa määritetty kesto) + velkojien summien maksu (mukaan lukien palkkiot/onnistumiset, jos generoiva tekijä saavutettu)."
        },
        breach: {
          title: "Irtisanominen täyttämättä jättämisestä",
          description: "Vakavan velvoitteiden täyttämättä jättämisen yhteydessä: muistutus + oikaisuaika 15 päivää. Oikaisun puuttuessa, lain mukainen irtisanominen."
        }
      }
    },

    article15: {
      title: "Artikla 15 - Ylivoimainen este",
      intro: "Osapuolia ei voida pitää vastuullisina, jos niiden velvoitteiden täyttämättä jättäminen tai viivästyminen johtuu ylivoimaisesta esteestä ranskalaisessa oikeuskäytännössä tarkoitetulla tavalla.",
      examplesTitle: "Ylivoimaisen esteen tapaukset sisältävät erityisesti:",
      examples: [
        "Luonnonkatastrofit, tulvat, tulipalot",
        "Sodat, hyökkäykset, levottomuudet",
        "Yleiset lakot, kuljetussulut",
        "Verkkohäiriöt (tietoliikenne, sähkö)",
        "Epidemiat, pandemiat",
        "Hallituksen terveystoimenpiteet"
      ],
      suspension: "Ylivoimaisen esteen yhteydessä velvoitteet keskeytetään tapahtuman keston ajaksi ilmoittamisen jälkeen toiselle osapuolelle."
    },

    article16: {
      title: "Artikla 16 - Sovellettava laki ja riidat",
      sections: {
        law: {
          title: "Sovellettava laki",
          description: "Nämä YME ovat Ranskan lain alaisia."
        },
        amicable: {
          title: "Ennalta tehty sovinnollisen ratkaisun yritys",
          description: "Riidan sattuessa osapuolet sitoutuvat etsimään sovinnollista ratkaisua ennen oikeudellista menettelyä. Asiakas voi soveltaa tavanomaista sovittelua tai mitä tahansa muuta vaihtoehtoista riidanratkaisumenetelmää."
        },
        jurisdiction: {
          title: "Toimivaltainen tuomioistuin",
          description: "Sovinnollisen ratkaisun puuttuessa kaikki riidat kuuluvat YOJOB:n kotipaikkakunnan tuomioistuinten yksinomaiseen toimivaltaan, ellei pakottavaa vastakkaista sääntöä sovelleta."
        }
      }
    },

    article17: {
      title: "Artikla 17 - YME:n muuttaminen",
      intro: "YOJOB varaa oikeuden muuttaa näitä YME:tä milloin tahansa.",
      items: [
        "Sovellettavat YME ovat ne, jotka olivat voimassa ehdotuksen/sopimuksen hyväksymispäivänä",
        "Muutoksilla ei ole takautuvaa vaikutusta käynnissä oleviin sopimuksiin, ellei osapuolten nimenomaisesta kirjallisesta suostumuksesta",
        "YME:n uusin versio voidaan tutustua milloin tahansa YOJOB:n verkkosivustolla"
      ]
    }
  },

  cta: {
    title: "Onko sinulla kysymyksiä YME:istämme?",
    description: "Oikeudellinen ja liiketoiminta tiimimme on käytettävissäsi kaikkiin näitä Yleisiä myyntiehtoja koskeviin selvityksiin.",
    backHome: "Takaisin kotisivulle",
    contactUs: "Ota yhteyttä"
  },

  footer: {
    copyright: "© {year} {company} — Yksityinen elinkeinonharjoittaja. Kaikki oikeudet pidätetään.",
    links: {
      legal: "Oikeudelliset tiedot",
      privacy: "Tietosuoja",
      cgv: "YME"
    }
  },

  badges: {
    main: "Pääasiallinen",
    optional: "Valinnainen",
    mixed: "Sekoitettu"
  },

  common: {
    back: "Takaisin",
    triggers: "Laukaisimet",
    conditions: "Ehdot",
    safeguards: "Takuut"
  }
};
