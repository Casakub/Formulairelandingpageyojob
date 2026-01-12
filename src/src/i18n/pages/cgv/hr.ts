/**
 * 🇭🇷 HRVATSKI PRIJEVODI - OPĆI UVJETI POSLOVANJA (OUP)
 * 
 * @version 1.0.0
 */

export const cgvHR = {
  hero: {
    badge: "B2B dokument - Ugovorni",
    title: "Opći uvjeti poslovanja",
    subtitle: "OUP primjenjivi za Korisničke tvrtke (KT) i partnerske agencije za privremeno zapošljavanje",
    effectiveDate: "Verzija na snazi od 19. prosinca 2025."
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Posrednik / Poslovni broker"
    },
    eu: {
      title: "Korisnička tvrtka (KT)",
      description: "Krajnji klijent koji prima radnu snagu"
    },
    ett: {
      title: "Agencija za privremeno zapošljavanje",
      description: "Partner za zapošljavanje"
    }
  },

  sections: {
    article0: {
      title: "Članak 0 - Identitet pružatelja usluga",
      fields: {
        legalForm: "Pravni oblik",
        legalFormValue: "Individualni poduzetnik (EI)",
        manager: "Voditelj",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Intrakomunitarni PDV",
        vatValue: "FR79447862764",
        address: "Adresa",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakt",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Osiguranje profesionalne odgovornosti",
        description: "YOJOB ima osiguranje profesionalne odgovornosti koje pokriva financijske posljedice njegove odgovornosti u vezi s njegovim uslugama."
      }
    },

    article1: {
      title: "Članak 1 - Definicije",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Posrednik/poslovni broker koji osigurava nabavu, kvalifikaciju, koordinaciju i formalizaciju poslovnih ponuda između KT i agencija."
        },
        eu: {
          term: "Korisnička tvrtka (KT)",
          definition: "Tvrtka krajnjeg klijenta koja prima radnu snagu koju pruža partnerska agencija za privremeno zapošljavanje."
        },
        ett: {
          term: "Agencija za privremeno zapošljavanje / Partnerska agencija",
          definition: "Agencija za privremeno zapošljavanje koja obavlja zapošljavanje, sklapanje ugovora i organizaciju pružanja osoblja."
        },
        profile: {
          term: "Profil",
          definition: "Kandidat ili privremeni radnik kojeg agencija predstavlja KT-u putem YOJOB-a."
        },
        mission: {
          term: "Misija",
          definition: "Potreba za zapošljavanjem izražena od strane KT-a (zanimanje, opseg, rokovi, lokacija, posebni zahtjevi)."
        },
        proposition: {
          term: "Trostruna ponuda",
          definition: "Poslovna i administrativna ponuda strukturirana od strane YOJOB-a i odobrena od strane KT-a i agencije (potpis ili pisani sporazum)."
        },
        handover: {
          term: "Predaja",
          definition: "Trenutak kada agencija postaje glavni kontakt KT-a nakon dvostruke validacije KT + agencija."
        },
        insurer: {
          term: "Kreditni osiguravatelj",
          definition: "Organizacija kreditnog osiguranja (COFACE, Allianz Trade itd.) koja sudjeluje u analizi rizika klijenta i dodjeli kreditnih limita."
        }
      }
    },

    article2: {
      title: "Članak 2 - Predmet",
      intro: "Ovi OUP reguliraju usluge YOJOB-a, koje se uglavnom sastoje od:",
      steps: {
        step1: {
          title: "Nabava i kvalifikacija",
          description: "Identifikacija i kvalifikacija Korisničkih tvrtki s europskim potrebama za zapošljavanjem"
        },
        step2: {
          title: "Prezentacija prilika",
          description: "Prosljeđivanje kvalificiranih prilika odgovarajućim partnerskim agencijama za privremeno zapošljavanje"
        },
        step3: {
          title: "Strukturiranje ponude",
          description: "Izrada detaljne poslovne ponude (opseg, koordinacija, administrativni elementi)"
        },
        step4: {
          title: "Organizacija predaje",
          description: "Osiguranje prijelaza na agenciju nakon potpisivanja radi realizacije (zapošljavanje, pružanje, fakturiranje)"
        }
      },
      yojobRole: {
        title: "Uloga YOJOB-a",
        description: "YOJOB djeluje isključivo kao posrednik. Agencija je odgovorna za zapošljavanje, pružanje, usklađenost poslodavca i fakturiranje prema KT-u, osim ako se u ugovoru izričito ne navodi drugačije."
      }
    },

    article3: {
      title: "Članak 3 - Ugovorni dokumenti i hijerarhija",
      intro: "U slučaju kontradikcije između dokumenata, primjenjuje se sljedeći redoslijed prioriteta:",
      hierarchy: {
        rank1: {
          title: "Poseban ugovor / Posebni uvjeti",
          subtitle: "Personalizirano partnerstvo ili poslovni doprinos"
        },
        rank2: {
          title: "Trostruna ponuda / Ponuda / Narudžba",
          subtitle: "Dokument potpisan od strane strana"
        },
        rank3: {
          title: "Opći uvjeti poslovanja (OUP)",
          subtitle: "Ovaj dokument"
        },
        rank4: {
          title: "Prilozi",
          subtitle: "SLA, DPA, procesi, kontrolne liste itd."
        }
      }
    },

    article4: {
      title: "Članak 4 - Ugovorne sheme",
      intro: "Primijenjena shema je specificirana u ponudi ili ugovoru. YOJOB može djelovati prema 3 modela:",
      schemes: {
        schemaB: {
          label: "Shema B",
          badge: "Glavna",
          title: "Agencija klijent YOJOB-a",
          description: "YOJOB je nagrađen od strane agencije za poslovni doprinos (mjesečna provizija i/ili nagrada za uspjeh)"
        },
        schemaA: {
          label: "Shema A",
          badge: "Opcionalna",
          title: "KT klijent YOJOB-a",
          description: "YOJOB naplaćuje KT-u dodatne usluge (pojačana koordinacija, proširena dokumentacijska pomoć)"
        },
        schemaC: {
          label: "Shema C",
          badge: "Mješovita",
          title: "Kombinirana naknada",
          description: "YOJOB je nagrađen od strane agencije (Shema B) I naplaćuje dodatne usluge KT-u (Shema A)"
        }
      }
    },

    article5: {
      title: "Članak 5 - Proces i predaja",
      phase1: {
        title: "5.1 Uvodna faza (poslovna i koordinacija)",
        intro: "YOJOB osigurava:",
        items: [
          "Nabavu i kvalifikaciju Korisničke tvrtke",
          "Prikupljanje elemenata potrebnih za Misiju",
          "Prosljeđivanje potrebe jednoj ili više partnerskih agencija za privremeno zapošljavanje",
          "Koordinaciju do zatvaranja trostruke ponude"
        ]
      },
      phase2: {
        title: "5.2 Aktiviranje predaje",
        intro: "\"Predaja\" nastaje nakon ispunjenja dva kumulativna uvjeta:",
        conditions: [
          "Potpis/pisani sporazum KT-a za ponudu",
          "Prihvaćanje/validacija agencije (kapacitet, uvjeti, usklađenost, rizik)"
        ],
        consequences: "Od tog trenutka, agencija postaje glavni kontakt za: zapošljavanje, ugovore, uvođenje, pružanje, plaće, obveze upućivanja, fakturiranje i naplatu od KT-a."
      },
      phase3: {
        title: "5.3 Rezidualne podrške (ako je predviđeno)",
        description: "YOJOB može ostati kao podrška (koordinacija/kvaliteta) u mjeri dogovorenoj u ponudi ili ugovoru."
      }
    },

    article6: {
      title: "Članak 6 - Financijski uvjeti i način plaćanja",
      section1: {
        title: "6.1 Načelo: \"selektivni\" rokovi slučaj po slučaj",
        intro: "S obzirom na prakse u industriji (kreditno osiguranje, rizik klijenta, organizacija fakturiranja), uvjeti plaćanja se utvrđuju slučaj po slučaj u važećoj ponudi/ugovoru.",
        modalitiesTitle: "Modaliteti mogu uključivati:",
        modalities: [
          "Plaćanje po primitku",
          "Plaćanje unaprijed / predujam",
          "Tjedna naplata",
          "Garancije (depozit, ograničenje kreditnog limita)"
        ],
        legalLimit: "Kada se dodijeli rok plaćanja \"na rok\", poštuju se zakonska ograničenja: 60 dana od datuma izdavanja računa ili 45 dana kraj mjeseca, ako je navedeno."
      },
      section2: {
        title: "6.2 Standardna mreža — KT \"rizici\"",
        intro: "Klasifikacija rizika je utvrđena iz 3 kumulativna izvora:",
        sources: {
          insurer: {
            title: "Kreditni osiguravatelj",
            description: "Pokriće/kreditni limit/uvjeti"
          },
          score: {
            title: "Interna procjena agencije",
            description: "Politika rizika i naplate"
          },
          history: {
            title: "Povijest plaćanja",
            description: "Ponašanje i izloženost"
          }
        },
        primacy: "Prioritet: u slučaju kontradikcije, odluka kreditnog osiguravatelja ima prednost nad ostalim signalima.",
        levelsTitle: "Razine rizika i uvjeti plaćanja",
        levels: {
          r0: {
            level: "R0",
            title: "Standardna",
            trigger: "Osiguravatelj: pokriven / kreditni limit OK; Procjena agencije: A/B; Povijest: dobra (0 incidenata)",
            conditions: "Mjesečno + dogovoreni rok (npr. 30d) u okviru zakonskog limita",
            safeguards: "Standardni kreditni limit"
          },
          r1: {
            level: "R1",
            title: "Nadzirana",
            trigger: "Osiguravatelj: ograničeni kreditni limit; Procjena agencije: B/C; Povijest: blaga kašnjenja",
            conditions: "Po primitku ILI predujam 30-50% + saldo po primitku",
            safeguards: "Ograničeni kreditni limit + tjedni pregled"
          },
          r2: {
            level: "R2",
            title: "Pojačana",
            trigger: "Osiguravatelj: nedovoljna djelomična pokrivenost; Procjena agencije: C/D; Povijest: značajna kašnjenja",
            conditions: "Tjedno po primitku ILI predujam 50-70% + tjedna prilagodba",
            safeguards: "Početak u serijama (ograničeni volumen)"
          },
          r3: {
            level: "R3",
            title: "Kritična",
            trigger: "Osiguravatelj: ODBIJANJE / neosiguran; Procjena agencije: D; Povijest: ozbiljni incidenti",
            conditions: "Plaćanje 100% unaprijed (ili odbijanje početka)",
            safeguards: "Uvjetovani početak plaćanjem; zaustavljanje kod odstupanja"
          }
        },
        transparency: {
          title: "Transparentnost i prihvaćanje",
          description: "Trostruka ponuda specificira razinu (R0/R1/R2/R3), način naplate i uvjet plaćanja. Potpis/prihvaćanje ponude jednako je prihvaćanju ovih modaliteta."
        },
        adjustment: {
          title: "Klauzula dinamičke prilagodbe",
          description: "U slučaju razvoja rizika (smanjenje kreditnog limita osiguravatelja, kašnjenja, incidenti), agencija može revidirati uvjete plaćanja za sljedeće razdoblje nakon obavijesti KT-u, uzimajući u obzir važeći ugovor."
        }
      },
      section3: {
        title: "6.3 Kašnjenja u plaćanju",
        intro: "U slučaju kašnjenja računa izdanog od strane YOJOB-a (Shema A ili naplata agencija→YOJOB):",
        penalties: [
          "Zatezne kamate dospijevaju bez podsjetnika, prema stopi utvrđenoj u ugovoru ili primjenjivom pravnom okviru",
          "Paušalna naknada za naplatu: 40 € po neplaćenom računu",
          "Moguće obustavljanje usluga nakon pismene obavijesti"
        ]
      }
    },

    article7: {
      title: "Članak 7 - Obveze Korisničke tvrtke (KT)",
      intro: "KT se obvezuje:",
      obligations: [
        "Pružiti preciznu i potpunu potrebu i aktivnu suradnju (mišljenja, validacije, planiranje)",
        "Prenijeti sigurnosne zahtjeve i način pristupa lokacijama",
        "Poštovati povjerljivost informacija (agencija, profili, poslovni uvjeti)",
        "Priznati da su zapošljavanje, pružanje i fakturiranje radne snage odgovornost agencije (osim ako je drugačija shema pisana)",
        "Poštovati uvjete plaćanja specificirane u trostrukoj ponudi"
      ]
    },

    article8: {
      title: "Članak 8 - Obveze i naknada partnerske agencije",
      section1: {
        title: "8.1 Mjesečna provizija (poslovni doprinos)",
        intro: "Agencija duguje YOJOB-u proviziju izračunatu iz neto iznosa koji agencija naplaćuje KT-u u vezi s misijama koje potječu od YOJOB-a.",
        details: {
          rate: {
            label: "Stopa provizije",
            value: "Varijabilna prema ugovoru (npr. 3-8%)"
          },
          base: {
            label: "Osnova izračuna",
            value: "Neto iznos naplaćen KT-u (misije YOJOB)"
          },
          rhythm: {
            label: "Ritam naplate",
            value: "Mjesečno"
          },
          deadline: {
            label: "Rok plaćanja",
            value: "Od primitka plaćanja KT-a, bez kašnjenja"
          }
        }
      },
      section2: {
        title: "8.2 Nagrada za uspjeh \"plasman\"",
        intro: "Za određene misije, nagrada za uspjeh može biti dodana mjesečnoj proviziji:",
        items: {
          trigger: {
            label: "Čimbenik generiranja",
            value: "Kraj važećeg probnog roka (vidi čl. 9), bez prekida koji se može pripisati Profilu"
          },
          exigibility: {
            label: "Naplativost",
            value: "Trenutno cjelovito plaćanje pri izdavanju računa YOJOB"
          },
          amount: {
            label: "Iznos",
            value: "Varijabilan prema ugovoru (npr. % godišnje bruto plaće ili paušalni iznos)"
          }
        }
      },
      section3: {
        title: "8.3 Izvještavanje",
        intro: "Agencija pruža YOJOB-u, s dogovorenom učestalošću (npr. mjesečno):",
        items: [
          "Popis misija YOJOB (KT, plasman, datumi, volumeni)",
          "Povezani neto iznos po misiji",
          "Razumni opravdavajući elementi",
          "Poštovanje GDPR-a i poslovne tajne"
        ]
      }
    },

    article9: {
      title: "Članak 9 - Regulatorni probni rok",
      section1: {
        title: "9.1 Načelo",
        description: "Primijenjeni probni rok je onaj utvrđen u ugovornim dokumentima (agencija↔KT i/ili agencija↔Profil) i u primjenjivim propisima/kolektivnim ugovorima. Ne može prelaziti maksimalna dopuštena trajanja."
      },
      section2: {
        title: "9.2 Upućivanje / Privremeni rad (ugovor o misiji)",
        intro: "Ugovor o misiji može sadržavati probni rok utvrđen ugovorno; u nedostatku toga, ograničen je na:",
        durations: [
          { duration: "2 dana", condition: "Ugovor ≤ 1 mjesec" },
          { duration: "3 dana", condition: "1 mjesec < ugovor ≤ 2 mjeseca" },
          { duration: "5 dana", condition: "Ugovor > 2 mjeseca" }
        ]
      },
      section3: {
        title: "9.3 Zapošljavanje (na neodređeno/slično) — Zakonsko ograničenje",
        intro: "Za ugovor na neodređeno vrijeme, maksimalno trajanje probnog roka je posebno:",
        durations: [
          { duration: "2 mjeseca", condition: "Radnici / Zaposlenici", color: "green" },
          { duration: "3 mjeseca", condition: "Srednji menadžment / Tehničari", color: "blue" },
          { duration: "4 mjeseca", condition: "Kadrovi", color: "violet" }
        ],
        note: "Prema primjenjivim pravilima i eventualnom produženju reguliranom zakonom."
      }
    },

    article10: {
      title: "Članak 10 - Zabrana zaobilaženja — Trajanje 24 mjeseca",
      intro: "Tijekom ugovornog odnosa i 24 mjeseca nakon posljednjeg kontakta (agencija i/ili Profil), strane zabranjuju bilo kakvo zaobilaženje:",
      actors: {
        eu: "Zabrana za KT izravno ugovaranje s agencijom predstavljenom od strane YOJOB-a (ili povezanim entitetom) zaobilazeći YOJOB, bez pisanog sporazuma.",
        ett: "Zabrana za agenciju zaobilaženje naknade YOJOB-a na KT/priliku koja potječe od YOJOB-a, bez pisanog sporazuma."
      },
      penalty: {
        title: "Ugovorna kazna",
        description: "U slučaju kršenja ove klauzule o zabrani zaobilaženja, strana u kršenju se obvezuje platiti YOJOB-u paušalnu naknadu, čiji iznos je utvrđen u ugovoru (ili ekvivalent postotka generiranih/procijenjenih iznosa), ne dovodeći u pitanje dodatnu naknadu."
      }
    },

    article11: {
      title: "Članak 11 - Odgovornost i ograničenje",
      items: {
        obligation: {
          title: "Obveza sredstava",
          description: "YOJOB se obvezuje koristiti sva potrebna sredstva za realizaciju svojih posredničkih usluga, bez garancije rezultata."
        },
        nonResponsibility: {
          title: "Nema odgovornosti agencije/Profili",
          description: "YOJOB nije odgovoran za djela, propuste ili neispunjenje agencije, zaposlenih Profila, niti za kreditne/osiguravajuće odluke."
        },
        cap: {
          title: "Ograničenje",
          description: "Osim grubog nemara ili namjere, odgovornost YOJOB-a ograničena je na neto iznos primljen u vezi s predmetnim ugovorom tijekom posljednjih 12 mjeseci."
        },
        indirect: {
          title: "Neizravne štete isključene",
          description: "YOJOB se ne može smatrati odgovornim za neizravne štete (gubitak aktivnosti, izgubljenu dobit, gubitak klijenata itd.)."
        }
      }
    },

    article12: {
      title: "Članak 12 - Povjerljivost",
      intro: "Strane se obvezuju održavati povjerljivost svih informacija razmijenjenih u okviru njihove suradnje.",
      items: [
        "Povjerljive informacije uključuju poslovne, tehničke, financijske i strateške podatke",
        "Obveza povjerljivosti traje tijekom trajanja ugovornog odnosa i 5 godina nakon njegovog prestanka",
        "Informacije ne mogu biti otkrivene trećim stranama bez prethodne pisane suglasnosti",
        "Strane moraju poduzeti sve potrebne mjere za zaštitu povjerljivosti informacija"
      ]
    },

    article13: {
      title: "Članak 13 - Osobni podaci (GDPR)",
      intro: "Razmjena osobnih podataka strogo je ograničena na podatke potrebne za realizaciju usluga (kontakti, potrebe, profili kandidata).",
      cards: {
        compliance: {
          title: "GDPR usklađenost",
          description: "Obrada osobnih podataka provodi se u skladu s GDPR-om i zakonom o zaštiti podataka.",
          linkText: "Politika privatnosti"
        },
        dpo: {
          title: "DPO kontakt",
          description: "Za sve zahtjeve u vezi vaših osobnih podataka ili ostvarivanja GDPR prava."
        }
      },
      dpaNote: "DPA (Sporazum o obradi podataka) može biti priložen po potrebi, ovisno o prirodi razmjene podataka."
    },

    article14: {
      title: "Članak 14 - Trajanje i prestanak",
      items: {
        duration: {
          title: "Trajanje",
          description: "Trajanje ugovornog odnosa utvrđeno je u ugovoru ili prihvaćenoj trostrukoj ponudi."
        },
        earlyTermination: {
          title: "Prijevremeni prestanak",
          description: "Otkazni rok od 30 dana (ili trajanje dogovoreno u ugovoru) + plaćanje dospjelih iznosa (uključujući provizije/nagrade za uspjeh, ako je čimbenik generiranja postignut)."
        },
        breach: {
          title: "Prestanak zbog neispunjenja",
          description: "U slučaju ozbiljnog neispunjenja obveza: podsjetnik + rok za ispravljanje od 15 dana. U nedostatku ispravljanja, prestanak po zakonu."
        }
      }
    },

    article15: {
      title: "Članak 15 - Viša sila",
      intro: "Strane se ne mogu smatrati odgovornima ako neispunjenje ili kašnjenje u izvršenju njihovih obveza proizlazi iz slučaja više sile u smislu francuske sudske prakse.",
      examplesTitle: "Posebno predstavljaju slučajeve više sile:",
      examples: [
        "Prirodne katastrofe, poplave, požari",
        "Ratovi, napadi, nemiri",
        "Generalni štrajkovi, blokade prijevoza",
        "Prekidi mreže (telekomunikacije, električna energija)",
        "Epidemije, pandemije",
        "Vladine zdravstvene mjere"
      ],
      suspension: "U slučaju više sile, obveze su obustavljene tijekom trajanja događaja, nakon obavijesti drugoj strani."
    },

    article16: {
      title: "Članak 16 - Mjerodavno pravo i sporovi",
      sections: {
        law: {
          title: "Mjerodavno pravo",
          description: "Ovi OUP podliježu francuskom pravu."
        },
        amicable: {
          title: "Prethodni pokušaj mirnog rješavanja",
          description: "U slučaju spora, strane se obvezuju tražiti mirno rješenje prije bilo kakvog sudskog postupka. Klijent može primijeniti konvencionalnu medijaciju ili bilo koji drugi alternativni način rješavanja sporova."
        },
        jurisdiction: {
          title: "Nadležni sud",
          description: "U nedostatku mirnog rješenja, svi sporovi su pod isključivom nadležnošću sudova sjedišta YOJOB-a, osim ako se primjenjuje imperativno suprotno pravilo."
        }
      }
    },

    article17: {
      title: "Članak 17 - Izmjena OUP-a",
      intro: "YOJOB zadržava pravo izmijeniti ove OUP u bilo kojem trenutku.",
      items: [
        "OUP primjenjivi su oni na snazi na datum prihvaćanja ponude/ugovora",
        "Izmjene nemaju retroaktivni učinak na ugovore u tijeku, osim ako postoji izričita pisana suglasnost strana",
        "Najnovija verzija OUP-a može se konzultirati u bilo kojem trenutku na web stranici YOJOB"
      ]
    }
  },

  cta: {
    title: "Imate pitanja o našim OUP-ima?",
    description: "Naš pravni i poslovni tim je vam na raspolaganju za bilo kakva objašnjenja u vezi ovih Općih uvjeta poslovanja.",
    backHome: "Natrag na početnu stranicu",
    contactUs: "Kontaktirajte nas"
  },

  footer: {
    copyright: "© {year} {company} — Individualni poduzetnik. Sva prava pridržana.",
    links: {
      legal: "Pravne informacije",
      privacy: "Privatnost",
      cgv: "OUP"
    }
  },

  badges: {
    main: "Glavna",
    optional: "Opcionalna",
    mixed: "Mješovita"
  },

  common: {
    back: "Natrag",
    triggers: "Okidači",
    conditions: "Uvjeti",
    safeguards: "Garancije"
  }
};
