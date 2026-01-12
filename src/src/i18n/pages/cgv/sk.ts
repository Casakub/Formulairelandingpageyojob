/**
 * 🇸🇰 SLOVENSKÉ PREKLADY - VŠEOBECNÉ OBCHODNÉ PODMIENKY (VOP)
 * 
 * @version 1.0.0
 */

export const cgvSK = {
  hero: {
    badge: "Dokument B2B - Zmluvný",
    title: "Všeobecné obchodné podmienky",
    subtitle: "VOP platné pre Používateľské spoločnosti (US) a partnerské agentúry práce",
    effectiveDate: "Verzia platná od 19. decembra 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Sprostredkovateľ / Obchodný broker"
    },
    eu: {
      title: "Používateľská spoločnosť (US)",
      description: "Konečný klient prijímajúci pracovnú silu"
    },
    ett: {
      title: "Agentúra práce",
      description: "Náborový partner"
    }
  },

  sections: {
    article0: {
      title: "Článok 0 - Identita poskytovateľa služieb",
      fields: {
        legalForm: "Právna forma",
        legalFormValue: "Samostatný podnikateľ (EI)",
        manager: "Vedúci",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Intrakomunitárne DIČ",
        vatValue: "FR79447862764",
        address: "Adresa",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakt",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Poistenie profesijnej zodpovednosti",
        description: "YOJOB má poistenie profesijnej zodpovednosti pokrývajúce finančné dôsledky jej zodpovednosti v súvislosti s jej službami."
      }
    },

    article1: {
      title: "Článok 1 - Definície",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Sprostredkovateľ/obchodný broker zabezpečujúci získavanie, kvalifikáciu, koordináciu a formalizáciu obchodných ponúk medzi US a agentúrami."
        },
        eu: {
          term: "Používateľská spoločnosť (US)",
          definition: "Spoločnosť konečného klienta prijímajúca pracovnú silu poskytnutú partnerskou agentúrou práce."
        },
        ett: {
          term: "Agentúra práce / Partnerská agentúra",
          definition: "Agentúra práce vykonávajúca nábor, uzatváranie zmlúv a organizáciu poskytovania personálu."
        },
        profile: {
          term: "Profil",
          definition: "Kandidát alebo dočasný pracovník predstavený agentúrou US prostredníctvom YOJOB."
        },
        mission: {
          term: "Misia",
          definition: "Náborová potreba vyjadrená US (povolanie, rozsah, termíny, umiestnenie, osobitné požiadavky)."
        },
        proposition: {
          term: "Trojstranná ponuka",
          definition: "Obchodná a administratívna ponuka štruktúrovaná YOJOB a schválená US a agentúrou (podpis alebo písomná zmluva)."
        },
        handover: {
          term: "Odovzdanie",
          definition: "Okamih, keď sa agentúra stáva hlavným kontaktom US po dvojitej validácii US + agentúra."
        },
        insurer: {
          term: "Úverový poisťovateľ",
          definition: "Organizácia úverového poistenia (COFACE, Allianz Trade atd.) zasahujúca do analýzy rizík klienta a prideľovania úverových limitov."
        }
      }
    },

    article2: {
      title: "Článok 2 - Predmet",
      intro: "Tieto VOP upravujú služby YOJOB, ktoré sa skladajú hlavne z:",
      steps: {
        step1: {
          title: "Získavať a kvalifikovať",
          description: "Identifikovať a kvalifikovať Používateľské spoločnosti s európskymi nábory potrebami"
        },
        step2: {
          title: "Prezentovať príležitosti",
          description: "Odovzdávať kvalifikované príležitosti zodpovedajúcim partnerským agentúram práce"
        },
        step3: {
          title: "Štruktúrovať ponuku",
          description: "Vypracovávať podrobnú obchodnú ponuku (rozsah, koordinácia, administratívne prvky)"
        },
        step4: {
          title: "Organizovať odovzdanie",
          description: "Zabezpečiť prechod k agentúre po podpise za účelom realizácie (nábor, poskytnutie, fakturácia)"
        }
      },
      yojobRole: {
        title: "Rola YOJOB",
        description: "YOJOB pôsobí výlučne ako sprostredkovateľ. Agentúra zodpovedá za nábor, poskytnutie, súlad zamestnávateľa a fakturáciu US, pokiaľ nie je v zmluve výslovne stanovené inak."
      }
    },

    article3: {
      title: "Článok 3 - Zmluvné dokumenty a hierarchia",
      intro: "V prípade rozporu medzi dokumentmi platí nasledujúce poradie priorít:",
      hierarchy: {
        rank1: {
          title: "Osobitná zmluva / Osobitné podmienky",
          subtitle: "Personalizované partnerstvo alebo obchodný príspevok"
        },
        rank2: {
          title: "Trojstranná ponuka / Ponuka / Objednávka",
          subtitle: "Dokument podpísaný stranami"
        },
        rank3: {
          title: "Všeobecné obchodné podmienky (VOP)",
          subtitle: "Tento dokument"
        },
        rank4: {
          title: "Prílohy",
          subtitle: "SLA, DPA, procesy, kontrolné zoznamy atď."
        }
      }
    },

    article4: {
      title: "Článok 4 - Zmluvné schémy",
      intro: "Použitá schéma je špecifikovaná v ponuke alebo zmluve. YOJOB môže pôsobiť podľa 3 modelov:",
      schemes: {
        schemaB: {
          label: "Schéma B",
          badge: "Hlavná",
          title: "Agentúra klientom YOJOB",
          description: "YOJOB je odmeňovaný agentúrou za obchodný príspevok (mesačná provízia a/nebo prémia za úspech)"
        },
        schemaA: {
          label: "Schéma A",
          badge: "Voliteľná",
          title: "US klientom YOJOB",
          description: "YOJOB fakturuje US doplnkové služby (posilnená koordinácia, rozšírená dokumentačná pomoc)"
        },
        schemaC: {
          label: "Schéma C",
          badge: "Zmiešaná",
          title: "Kombinované odmeňovanie",
          description: "YOJOB je odmeňovaný agentúrou (Schéma B) A fakturuje doplnkové služby US (Schéma A)"
        }
      }
    },

    article5: {
      title: "Článok 5 - Proces a odovzdanie",
      phase1: {
        title: "5.1 Úvodná fáza (obchodná a koordinácia)",
        intro: "YOJOB zabezpečuje:",
        items: [
          "Získavanie a kvalifikáciu Používateľskej spoločnosti",
          "Zber prvkov nevyhnutných pre Misiu",
          "Odovzdanie potreby jednej alebo viacerým partnerským agentúram práce",
          "Koordináciu do uzavretia trojstrannej ponuky"
        ]
      },
      phase2: {
        title: "5.2 Spustenie odovzdania",
        intro: "\"Odovzdanie\" nastáva po splnení dvoch kumulatívnych podmienok:",
        conditions: [
          "Podpis/písomná dohoda US k ponuke",
          "Akceptácia/validácia agentúry (kapacita, podmienky, súlad, riziko)"
        ],
        consequences: "Od tohto okamihu sa agentúra stáva hlavným kontaktom pre: nábor, zmluvy, onboarding, poskytnutie, platy, povinnosti vyslania, fakturáciu a vymáhanie od US."
      },
      phase3: {
        title: "5.3 Zvyškové podpory (pokiaľ je predpokladané)",
        description: "YOJOB môže zostať ako podpora (koordinácia/kvalita) v rozsahu dohodnutom v ponuke alebo zmluve."
      }
    },

    article6: {
      title: "Článok 6 - Finančné podmienky a platobná modalita",
      section1: {
        title: "6.1 Zásada: \"selektívne\" termíny prípad od prípadu",
        intro: "Vzhľadom k odvetvovým praktikám (úverové poistenie, riziko klienta, organizácia fakturácie) sú platobné podmienky stanovené prípad od prípadu v platnej ponuke/zmluve.",
        modalitiesTitle: "Modality môžu zahŕňať:",
        modalities: [
          "Platba pri prijatí",
          "Platba vopred / záloha",
          "Týždenná fakturácia",
          "Záruky (kauciu, obmedzenie úverového limitu)"
        ],
        legalLimit: "Keď je pridelený platobný termín \"na termín\", sú dodržiavané zákonné limity: 60 dní od dátumu vystavenia faktúry alebo 45 dní koniec mesiaca, pokiaľ je špecifikované."
      },
      section2: {
        title: "6.2 Štandardná mriežka — US \"riziká\"",
        intro: "Klasifikácia rizík je stanovená z 3 kumulatívnych zdrojov:",
        sources: {
          insurer: {
            title: "Úverový poisťovateľ",
            description: "Krytie/úverový limit/podmienky"
          },
          score: {
            title: "Interné hodnotenie agentúry",
            description: "Politika rizík a vymáhania"
          },
          history: {
            title: "História platieb",
            description: "Správanie a expozícia"
          }
        },
        primacy: "Priorita: v prípade rozporu má rozhodnutie úverového poisťovateľa prednosť pred ostatnými signálmi.",
        levelsTitle: "Úrovne rizika a platobné podmienky",
        levels: {
          r0: {
            level: "R0",
            title: "Štandardná",
            trigger: "Poisťovateľ: pokrytý / úverový limit OK; Hodnotenie agentúry: A/B; História: dobrá (0 incidentov)",
            conditions: "Mesačne + dohodnutý termín (napr. 30d) v rámci zákonného limitu",
            safeguards: "Štandardný úverový limit"
          },
          r1: {
            level: "R1",
            title: "Monitorovaná",
            trigger: "Poisťovateľ: obmedzený úverový limit; Hodnotenie agentúry: B/C; História: mierne oneskorenia",
            conditions: "Pri prijatí ALEBO záloha 30-50% + zostatok pri prijatí",
            safeguards: "Obmedzený úverový limit + týždenný prehľad"
          },
          r2: {
            level: "R2",
            title: "Posilnená",
            trigger: "Poisťovateľ: nedostatočné čiastočné krytie; Hodnotenie agentúry: C/D; História: významné oneskorenia",
            conditions: "Týždenne pri prijatí ALEBO záloha 50-70% + týždenná úprava",
            safeguards: "Štart po dávkach (obmedzený objem)"
          },
          r3: {
            level: "R3",
            title: "Kritická",
            trigger: "Poisťovateľ: ODMIETNUTIE / nepoisťovateľné; Hodnotenie agentúry: D; História: vážne incidenty",
            conditions: "Platba 100% vopred (alebo odmietnutie štartu)",
            safeguards: "Podmienený štart od platby; zastavenie pri odchýlke"
          }
        },
        transparency: {
          title: "Transparentnosť a akceptácia",
          description: "Trojstranná ponuka špecifikuje úroveň (R0/R1/R2/R3), režim fakturácie a platobnú podmienku. Podpis/akceptácia ponuky sa rovná akceptácii týchto modalít."
        },
        adjustment: {
          title: "Doložka dynamickej úpravy",
          description: "V prípade vývoja rizika (zníženie úverového limitu poisťovateľa, oneskorenia, incidenty) môže agentúra revidovať platobné podmienky pre nasledujúce obdobie po oznámení US, s ohľadom na platnú zmluvu."
        }
      },
      section3: {
        title: "6.3 Oneskorenia platieb",
        intro: "V prípade oneskorenia faktúry vystavenej YOJOB (Schéma A alebo fakturácia agentúra→YOJOB):",
        penalties: [
          "Úroky z omeškania splatné bez upomienky, podľa sadzby stanovenej v zmluve alebo použiteľného právneho rámca",
          "Paušálna náhrada na vymáhanie: 40 € za nezaplatenú faktúru",
          "Možné pozastavenie služieb po písomnom oznámení"
        ]
      }
    },

    article7: {
      title: "Článok 7 - Povinnosti Používateľskej spoločnosti (US)",
      intro: "US sa zaväzuje:",
      obligations: [
        "Poskytnúť presnú a úplnú potrebu a aktívnu spoluprácu (stanoviská, validácie, plánovanie)",
        "Odovzdať bezpečnostné požiadavky a modalitu prístupu k miestam",
        "Rešpektovať dôvernosť informácií (agentúra, profily, obchodné podmienky)",
        "Uznať, že nábor, poskytnutie a fakturácia pracovnej sily sú v zodpovednosti agentúry (pokiaľ nie je iné schéma písomne)",
        "Rešpektovať platobné podmienky špecifikované v trojstrannej ponuke"
      ]
    },

    article8: {
      title: "Článok 8 - Povinnosti a odmeňovanie partnerskej agentúry",
      section1: {
        title: "8.1 Mesačná provízia (obchodný príspevok)",
        intro: "Agentúra dlhuje YOJOB províziu vypočítanú z čistej sumy fakturovanej agentúrou US ohľadom misií pochádzajúcich z YOJOB.",
        details: {
          rate: {
            label: "Sadzba provízie",
            value: "Premenná podľa zmluvy (napr. 3-8%)"
          },
          base: {
            label: "Základ výpočtu",
            value: "Čistá suma fakturovaná US (misie YOJOB)"
          },
          rhythm: {
            label: "Rytmus fakturácie",
            value: "Mesačný"
          },
          deadline: {
            label: "Platobný termín",
            value: "Od prijatia platby US, bez omeškania"
          }
        }
      },
      section2: {
        title: "8.2 Prémia za úspech \"umiestnenie\"",
        intro: "Pre niektoré misie môže byť prémia za úspech pridaná k mesačnej provízii:",
        items: {
          trigger: {
            label: "Generujúci fakt",
            value: "Koniec platnej skúšobnej doby (viz čl. 9), bez ukončenia pripísateľného Profilu"
          },
          exigibility: {
            label: "Vymáhateľnosť",
            value: "Okamžitá plná platba pri vystavení faktúry YOJOB"
          },
          amount: {
            label: "Suma",
            value: "Premenná podľa zmluvy (napr. % ročného hrubého platu alebo paušálna suma)"
          }
        }
      },
      section3: {
        title: "8.3 Reportovanie",
        intro: "Agentúra poskytuje YOJOB, s dohodnutou frekvenciou (napr. mesačný):",
        items: [
          "Zoznam misií YOJOB (US, umiestnenie, dáta, objemy)",
          "Spojenú čistú sumu na misiu",
          "Rozumné odôvodňujúce prvky",
          "Rešpektovanie GDPR a obchodného tajomstva"
        ]
      }
    },

    article9: {
      title: "Článok 9 - Regulačná skúšobná doba",
      section1: {
        title: "9.1 Zásada",
        description: "Použitá skúšobná doba je tá stanovená v zmluvných dokumentoch (agentúra↔US a/alebo agentúra↔Profil) a v použiteľných predpisoch/kolektívnych zmluvách. Nemôže prekročiť maximálne povolené doby trvania."
      },
      section2: {
        title: "9.2 Vyslanie / Dočasná práca (zmluva o misii)",
        intro: "Zmluva o misii môže obsahovať skúšobnú dobu stanovenú zmluvne; v prípade absencie je obmedzená na:",
        durations: [
          { duration: "2 dni", condition: "Zmluva ≤ 1 mesiac" },
          { duration: "3 dni", condition: "1 mesiac < zmluva ≤ 2 mesiace" },
          { duration: "5 dní", condition: "Zmluva > 2 mesiace" }
        ]
      },
      section3: {
        title: "9.3 Nábor (na dobu neurčitú/podobné) — Zákonný limit",
        intro: "Pre zmluvu na dobu neurčitú je maximálna doba trvania skúšobnej doby najmä:",
        durations: [
          { duration: "2 mesiace", condition: "Robotníci / Zamestnanci", color: "green" },
          { duration: "3 mesiace", condition: "Stredný manažment / Technici", color: "blue" },
          { duration: "4 mesiace", condition: "Vedúci pracovníci", color: "violet" }
        ],
        note: "Podľa použiteľných pravidiel a prípadného predĺženia upraveného zákonom."
      }
    },

    article10: {
      title: "Článok 10 - Neobchádzanie — Doba trvania 24 mesiacov",
      intro: "Počas zmluvného vzťahu a po dobu 24 mesiacov po poslednom kontakte (agentúra a/alebo Profil) si strany zakazujú akékoľvek obchádzanie:",
      actors: {
        eu: "Zákaz pre US priamo uzatvárať zmluvy s agentúrou predstavenou YOJOB (alebo spojenou entitou) s obchádzaním YOJOB, pokiaľ nie je písomná dohoda.",
        ett: "Zákaz pre agentúru obchádzať odmeňovanie YOJOB na US/príležitosť pochádzajúcu z YOJOB, pokiaľ nie je písomná dohoda."
      },
      penalty: {
        title: "Zmluvná pokuta",
        description: "V prípade porušenia tejto doložky o neobchádzaní sa strana v omeškaní zaväzuje zaplatiť YOJOB paušálnu náhradu, ktorej suma je stanovená v zmluve (alebo ekvivalent percenta vygenerovaných/odhadovaných súm), bez toho aby to bolo na úkor dodatočnej náhrady."
      }
    },

    article11: {
      title: "Článok 11 - Zodpovednosť a obmedzenie",
      items: {
        obligation: {
          title: "Povinnosť prostriedkov",
          description: "YOJOB sa zaväzuje použiť všetky potrebné prostriedky k realizácii svojich sprostredkovateľských služieb, bez záruky výsledku."
        },
        nonResponsibility: {
          title: "Žiadna zodpovednosť agentúra/Profily",
          description: "YOJOB nezodpovedá za činy, opomenutia alebo nesplnenie agentúry, náborovaných Profilov, ani za úverové/poisťovacie rozhodnutia."
        },
        cap: {
          title: "Obmedzenie",
          description: "S výnimkou hrubej nedbanlivosti alebo úmyslu je zodpovednosť YOJOB obmedzená na čistú sumu obdržanú v súvislosti s danou zmluvou počas posledných 12 mesiacov."
        },
        indirect: {
          title: "Nepriame škody vylúčené",
          description: "YOJOB nemôže byť činený zodpovedným za nepriame škody (strata činnosti, ušlé zisky, strata zákazníkov atď.)."
        }
      }
    },

    article12: {
      title: "Článok 12 - Dôvernosť",
      intro: "Strany sa zaväzujú zachovať dôvernosť všetkých informácií vymenených v rámci ich spolupráce.",
      items: [
        "Dôverné informácie zahŕňajú obchodné, technické, finančné a strategické dáta",
        "Povinnosť dôvernosti trvá po celú dobu trvania zmluvného vzťahu a 5 rokov po jeho ukončení",
        "Informácie nemôžu byť zverejnené tretím stranám bez predchádzajúceho písomného súhlasu",
        "Strany musia prijať všetky potrebné opatrenia na ochranu dôvernosti informácií"
      ]
    },

    article13: {
      title: "Článok 13 - Osobné údaje (GDPR)",
      intro: "Výmena osobných údajov je prísne obmedzená na údaje nevyhnutné k realizácii služieb (kontakty, potreby, profily kandidátov).",
      cards: {
        compliance: {
          title: "Súlad s GDPR",
          description: "Spracovanie osobných údajov sa vykonáva v súlade s GDPR a zákonom o ochrane údajov.",
          linkText: "Zásady ochrany osobných údajov"
        },
        dpo: {
          title: "Kontakt DPO",
          description: "Pre akékoľvek žiadosti týkajúce sa vašich osobných údajov alebo výkonu práv GDPR."
        }
      },
      dpaNote: "DPA (Zmluva o spracovaní údajov) môže byť pripojená v prípade potreby v závislosti na povahe výmeny údajov."
    },

    article14: {
      title: "Článok 14 - Doba trvania a ukončenie",
      items: {
        duration: {
          title: "Doba trvania",
          description: "Doba trvania zmluvného vzťahu je stanovená v zmluve alebo akceptovanej trojstrannej ponuke."
        },
        earlyTermination: {
          title: "Predčasné ukončenie",
          description: "Výpovedná doba 30 dní (alebo doba trvania dohodnutá v zmluve) + platba splatných súm (vrátane provízií/prémií za úspech, pokiaľ bolo dosiahnuté generujúceho faktu)."
        },
        breach: {
          title: "Ukončenie z důvodu nesplnenia",
          description: "V prípade závažného nesplnenia povinností: upomienka + lehota na nápravu 15 dní. V prípade absencie nápravy, ukončenie zo zákona."
        }
      }
    },

    article15: {
      title: "Článok 15 - Vyššia moc",
      intro: "Strany nemôžu byť činené zodpovednými, pokiaľ nesplnenie alebo oneskorenie vo výkone ich povinností vyplýva z prípadu vyššej moci v zmysle francúzskej judikatúry.",
      examplesTitle: "Predstavujú najmä prípady vyššej moci:",
      examples: [
        "Prírodné katastrofy, povodne, požiare",
        "Vojny, útoky, nepokoje",
        "Generálne štrajky, blokády dopravy",
        "Výpadky sietí (telekomunikácie, elektrina)",
        "Epidémie, pandémie",
        "Vládne zdravotné opatrenia"
      ],
      suspension: "V prípade vyššej moci sú povinnosti pozastavené po dobu trvania udalosti, po oznámení druhej strane."
    },

    article16: {
      title: "Článok 16 - Rozhodné právo a spory",
      sections: {
        law: {
          title: "Rozhodné právo",
          description: "Tieto VOP podliehajú francúzskemu právu."
        },
        amicable: {
          title: "Predbežný pokus o zmierivé riešenie",
          description: "V prípade sporu sa strany zaväzujú hľadať zmierivé riešenie pred akýmkoľvek súdnym konaním. Klient môže využiť konvenčnú mediáciu alebo akýkoľvek iný alternatívny spôsob riešenia sporov."
        },
        jurisdiction: {
          title: "Príslušný súd",
          description: "V prípade absencie zmierivého riešenia podliehajú všetky spory výlučnej právomoci súdov sídla YOJOB, pokiaľ neplatí imperatívne opačné pravidlo."
        }
      }
    },

    article17: {
      title: "Článok 17 - Úprava VOP",
      intro: "YOJOB si vyhradzuje právo kedykoľvek upraviť tieto VOP.",
      items: [
        "VOP použiteľné sú tie platné k dátumu akceptácie ponuky/zmluvy",
        "Úpravy nemajú spätný účinok na prebiehajúce zmluvy, pokiaľ nie je výslovný písomný súhlas strán",
        "Najnovšia verzia VOP môže byť konzultovaná kedykoľvek na webových stránkach YOJOB"
      ]
    }
  },

  cta: {
    title: "Máte otázky ohľadom našich VOP?",
    description: "Náš právny a obchodný tím je vám k dispozícii pre akékoľvek vysvetlenia týkajúce sa týchto Všeobecných obchodných podmienok.",
    backHome: "Späť na domovskú stránku",
    contactUs: "Kontaktujte nás"
  },

  footer: {
    copyright: "© {year} {company} — Samostatný podnikateľ. Všetky práva vyhradené.",
    links: {
      legal: "Právne informácie",
      privacy: "Súkromie",
      cgv: "VOP"
    }
  },

  badges: {
    main: "Hlavná",
    optional: "Voliteľná",
    mixed: "Zmiešaná"
  },

  common: {
    back: "Späť",
    triggers: "Spúšťače",
    conditions: "Podmienky",
    safeguards: "Záruky"
  }
};
