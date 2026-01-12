/**
 * 🇨🇿 ČESKÉ PŘEKLADY - VŠEOBECNÉ OBCHODNÍ PODMÍNKY (VOP)
 * 
 * @version 1.0.0
 */

export const cgvCS = {
  hero: {
    badge: "Dokument B2B - Smluvní",
    title: "Všeobecné obchodní podmínky",
    subtitle: "VOP platné pro Uživatelské společnosti (US) a partnerské agentury práce",
    effectiveDate: "Verze platná od 19. prosince 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Zprostředkovatel / Obchodní broker"
    },
    eu: {
      title: "Uživatelská společnost (US)",
      description: "Konečný klient přijímající pracovní sílu"
    },
    ett: {
      title: "Agentura práce",
      description: "Náborový partner"
    }
  },

  sections: {
    article0: {
      title: "Článek 0 - Identita poskytovatele služeb",
      fields: {
        legalForm: "Právní forma",
        legalFormValue: "Samostatný podnikatel (EI)",
        manager: "Vedoucí",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Intrakomunitární DIČ",
        vatValue: "FR79447862764",
        address: "Adresa",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakt",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Pojištění profesní odpovědnosti",
        description: "YOJOB má pojištění profesní odpovědnosti pokrývající finanční důsledky její odpovědnosti v souvislosti s jejími službami."
      }
    },

    article1: {
      title: "Článek 1 - Definice",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Zprostředkovatel/obchodní broker zajišťující získávání, kvalifikaci, koordinaci a formalizaci obchodních nabídek mezi US a agenturami."
        },
        eu: {
          term: "Uživatelská společnost (US)",
          definition: "Společnost konečného klienta přijímající pracovní sílu poskytnutou partnerskou agenturou práce."
        },
        ett: {
          term: "Agentura práce / Partnerská agentura",
          definition: "Agentura práce provádějící nábor, uzavírání smluv a organizaci poskytování personálu."
        },
        profile: {
          term: "Profil",
          definition: "Kandidát nebo dočasný pracovník představený agenturou US prostřednictvím YOJOB."
        },
        mission: {
          term: "Mise",
          definition: "Náborová potřeba vyjádřená US (povolání, rozsah, termíny, umístění, zvláštní požadavky)."
        },
        proposition: {
          term: "Trojstranná nabídka",
          definition: "Obchodní a administrativní nabídka strukturovaná YOJOB a schválená US a agenturou (podpis nebo písemná smlouva)."
        },
        handover: {
          term: "Předání",
          definition: "Okamžik, kdy se agentura stává hlavním kontaktem US po dvojí validaci US + agentura."
        },
        insurer: {
          term: "Úvěrový pojistitel",
          definition: "Organizace úvěrového pojištění (COFACE, Allianz Trade atd.) zasahující do analýzy rizik klienta a přidělování úvěrových limitů."
        }
      }
    },

    article2: {
      title: "Článek 2 - Předmět",
      intro: "Tyto VOP upravují služby YOJOB, které se skládají hlavně z:",
      steps: {
        step1: {
          title: "Získávat a kvalifikovat",
          description: "Identifikovat a kvalifikovat Uživatelské společnosti s evropskými nábory potřebami"
        },
        step2: {
          title: "Prezentovat příležitosti",
          description: "Předávat kvalifikované příležitosti odpovídajícím partnerským agenturám práce"
        },
        step3: {
          title: "Strukturovat nabídku",
          description: "Vypracovávat podrobnou obchodní nabídku (rozsah, koordinace, administrativní prvky)"
        },
        step4: {
          title: "Organizovat předání",
          description: "Zajistit přechod k agentuře po podpisu za účelem realizace (nábor, poskytnutí, fakturace)"
        }
      },
      yojobRole: {
        title: "Role YOJOB",
        description: "YOJOB působí výhradně jako zprostředkovatel. Agentura odpovídá za nábor, poskytnutí, soulad zaměstnavatele a fakturaci US, pokud není ve smlouvě výslovně stanoveno jinak."
      }
    },

    article3: {
      title: "Článek 3 - Smluvní dokumenty a hierarchie",
      intro: "V případě rozporu mezi dokumenty platí následující pořadí priorit:",
      hierarchy: {
        rank1: {
          title: "Zvláštní smlouva / Zvláštní podmínky",
          subtitle: "Personalizované partnerství nebo obchodní příspěvek"
        },
        rank2: {
          title: "Trojstranná nabídka / Nabídka / Objednávka",
          subtitle: "Dokument podepsaný stranami"
        },
        rank3: {
          title: "Všeobecné obchodní podmínky (VOP)",
          subtitle: "Tento dokument"
        },
        rank4: {
          title: "Přílohy",
          subtitle: "SLA, DPA, procesy, kontrolní seznamy atd."
        }
      }
    },

    article4: {
      title: "Článek 4 - Smluvní schémata",
      intro: "Použité schéma je specifikováno v nabídce nebo smlouvě. YOJOB může působit podle 3 modelů:",
      schemes: {
        schemaB: {
          label: "Schéma B",
          badge: "Hlavní",
          title: "Agentura klientem YOJOB",
          description: "YOJOB je odměňován agenturou za obchodní příspěvek (měsíční provize a/nebo prémie za úspěch)"
        },
        schemaA: {
          label: "Schéma A",
          badge: "Volitelné",
          title: "US klientem YOJOB",
          description: "YOJOB fakturuje US doplňkové služby (posílená koordinace, rozšířená dokumentační pomoc)"
        },
        schemaC: {
          label: "Schéma C",
          badge: "Smíšené",
          title: "Kombinované odměňování",
          description: "YOJOB je odměňován agenturou (Schéma B) A fakturuje doplňkové služby US (Schéma A)"
        }
      }
    },

    article5: {
      title: "Článek 5 - Proces a předání",
      phase1: {
        title: "5.1 Úvodní fáze (obchodní a koordinace)",
        intro: "YOJOB zajišťuje:",
        items: [
          "Získávání a kvalifikaci Uživatelské společnosti",
          "Sběr prvků nezbytných pro Misi",
          "Předání potřeby jedné nebo více partnerským agenturám práce",
          "Koordinaci do uzavření trojstranné nabídky"
        ]
      },
      phase2: {
        title: "5.2 Spuštění předání",
        intro: "\"Předání\" nastává po splnění dvou kumulativních podmínek:",
        conditions: [
          "Podpis/písemná dohoda US k nabídce",
          "Akceptace/validace agentury (kapacita, podmínky, soulad, riziko)"
        ],
        consequences: "Od tohoto okamžiku se agentura stává hlavním kontaktem pro: nábor, smlouvy, onboarding, poskytnutí, platy, povinnosti vyslání, fakturaci a vymáhání od US."
      },
      phase3: {
        title: "5.3 Zbytkové podpory (pokud je předpokládáno)",
        description: "YOJOB může zůstat jako podpora (koordinace/kvalita) v rozsahu dohodnutém v nabídce nebo smlouvě."
      }
    },

    article6: {
      title: "Článek 6 - Finanční podmínky a platební modalita",
      section1: {
        title: "6.1 Zásada: \"selektivní\" termíny případ od případu",
        intro: "Vzhledem k odvětvovým praktikám (úvěrové pojištění, riziko klienta, organizace fakturace) jsou platební podmínky stanoveny případ od případu v platné nabídce/smlouvě.",
        modalitiesTitle: "Modality mohou zahrnovat:",
        modalities: [
          "Platba při přijetí",
          "Platba předem / záloha",
          "Týdenní fakturace",
          "Záruky (kauci, omezení úvěrového limitu)"
        ],
        legalLimit: "Když je přidělen platební termín \"na termín\", jsou dodržovány zákonné limity: 60 dní od data vystavení faktury nebo 45 dní konec měsíce, pokud je specifikováno."
      },
      section2: {
        title: "6.2 Standardní mřížka — US \"rizika\"",
        intro: "Klasifikace rizik je stanovena ze 3 kumulativních zdrojů:",
        sources: {
          insurer: {
            title: "Úvěrový pojistitel",
            description: "Krytí/úvěrový limit/podmínky"
          },
          score: {
            title: "Interní hodnocení agentury",
            description: "Politika rizik a vymáhání"
          },
          history: {
            title: "Historie plateb",
            description: "Chování a expozice"
          }
        },
        primacy: "Priorita: v případě rozporu má rozhodnutí úvěrového pojistitele přednost před ostatními signály.",
        levelsTitle: "Úrovně rizika a platební podmínky",
        levels: {
          r0: {
            level: "R0",
            title: "Standardní",
            trigger: "Pojistitel: pokrytý / úvěrový limit OK; Hodnocení agentury: A/B; Historie: dobrá (0 incidentů)",
            conditions: "Měsíčně + sjednávaný termín (např. 30d) v rámci zákonného limitu",
            safeguards: "Standardní úvěrový limit"
          },
          r1: {
            level: "R1",
            title: "Monitorovaný",
            trigger: "Pojistitel: omezený úvěrový limit; Hodnocení agentury: B/C; Historie: mírná zpoždění",
            conditions: "Při přijetí NEBO záloha 30-50% + zůstatek při přijetí",
            safeguards: "Omezený úvěrový limit + týdenní přezkum"
          },
          r2: {
            level: "R2",
            title: "Posílený",
            trigger: "Pojistitel: nedostatečné částečné krytí; Hodnocení agentury: C/D; Historie: významná zpoždění",
            conditions: "Týdně při přijetí NEBO záloha 50-70% + týdenní úprava",
            safeguards: "Start po dávkách (omezený objem)"
          },
          r3: {
            level: "R3",
            title: "Kritický",
            trigger: "Pojistitel: ODMÍTNUTÍ / nepojistitelné; Hodnocení agentury: D; Historie: vážné incidenty",
            conditions: "Platba 100% předem (nebo odmítnutí startu)",
            safeguards: "Podmíněný start od platby; zastavení při odchylce"
          }
        },
        transparency: {
          title: "Transparentnost a akceptace",
          description: "Trojstranná nabídka specifikuje úroveň (R0/R1/R2/R3), režim fakturace a platební podmínku. Podpis/akceptace nabídky se rovná akceptaci těchto modalit."
        },
        adjustment: {
          title: "Doložka dynamické úpravy",
          description: "V případě vývoje rizika (snížení úvěrového limitu pojistitele, zpoždění, incidenty) může agentura revidovat platební podmínky pro následující období po oznámení US, s ohledem na platnou smlouvu."
        }
      },
      section3: {
        title: "6.3 Zpoždění plateb",
        intro: "V případě zpoždění faktury vystavené YOJOB (Schéma A nebo fakturace agentura→YOJOB):",
        penalties: [
          "Úroky z prodlení splatné bez upomínky, podle sazby stanovené ve smlouvě nebo použitelného právního rámce",
          "Paušální náhrada na vymáhání: 40 € za nezaplacenou fakturu",
          "Možné pozastavení služeb po písemném oznámení"
        ]
      }
    },

    article7: {
      title: "Článek 7 - Povinnosti Uživatelské společnosti (US)",
      intro: "US se zavazuje:",
      obligations: [
        "Poskytnout přesnou a úplnou potřebu a aktivní spolupráci (stanoviska, validace, plánování)",
        "Předat bezpečnostní požadavky a modalitu přístupu k místům",
        "Respektovat důvěrnost informací (agentura, profily, obchodní podmínky)",
        "Uznat, že nábor, poskytnutí a fakturace pracovní síly jsou v odpovědnosti agentury (pokud není jiné schéma písemně)",
        "Respektovat platební podmínky specifikované v trojstranné nabídce"
      ]
    },

    article8: {
      title: "Článek 8 - Povinnosti a odměňování partnerské agentury",
      section1: {
        title: "8.1 Měsíční provize (obchodní příspěvek)",
        intro: "Agentura dluží YOJOB provizi vypočítanou z čisté částky fakturované agenturou US ohledně misí pocházejících z YOJOB.",
        details: {
          rate: {
            label: "Sazba provize",
            value: "Proměnná podle smlouvy (např. 3-8%)"
          },
          base: {
            label: "Základ výpočtu",
            value: "Čistá částka fakturovaná US (mise YOJOB)"
          },
          rhythm: {
            label: "Rytmus fakturace",
            value: "Měsíční"
          },
          deadline: {
            label: "Platební termín",
            value: "Od přijetí platby US, bez prodlení"
          }
        }
      },
      section2: {
        title: "8.2 Prémie za úspěch \"umístění\"",
        intro: "Pro některé mise může být prémie za úspěch přidána k měsíční provizi:",
        items: {
          trigger: {
            label: "Generující fakt",
            value: "Konec platné zkušební doby (viz čl. 9), bez ukončení přičitatelného Profilu"
          },
          exigibility: {
            label: "Vynutitelnost",
            value: "Okamžitá plná platba při vystavení faktury YOJOB"
          },
          amount: {
            label: "Částka",
            value: "Proměnná podle smlouvy (např. % ročního hrubého platu nebo paušální částka)"
          }
        }
      },
      section3: {
        title: "8.3 Reportování",
        intro: "Agentura poskytuje YOJOB, s dohodnutou frekvencí (např. měsíční):",
        items: [
          "Seznam misí YOJOB (US, umístění, data, objemy)",
          "Spojenou čistou částku na misi",
          "Rozumné odůvodňující prvky",
          "Respektování GDPR a obchodního tajemství"
        ]
      }
    },

    article9: {
      title: "Článek 9 - Regulační zkušební doba",
      section1: {
        title: "9.1 Zásada",
        description: "Použitá zkušební doba je ta stanovená ve smluvních dokumentech (agentura↔US a/nebo agentura↔Profil) a v použitelných předpisech/kolektivních smlouvách. Nemůže překročit maximální povolené doby trvání."
      },
      section2: {
        title: "9.2 Vyslání / Dočasná práce (smlouva o misi)",
        intro: "Smlouva o misi může obsahovat zkušební dobu stanovenou smluvně; v případě absence je omezena na:",
        durations: [
          { duration: "2 dny", condition: "Smlouva ≤ 1 měsíc" },
          { duration: "3 dny", condition: "1 měsíc < smlouva ≤ 2 měsíce" },
          { duration: "5 dní", condition: "Smlouva > 2 měsíce" }
        ]
      },
      section3: {
        title: "9.3 Nábor (na dobu neurčitou/podobné) — Zákonný limit",
        intro: "Pro smlouvu na dobu neurčitou je maximální doba trvání zkušební doby zejména:",
        durations: [
          { duration: "2 měsíce", condition: "Dělníci / Zaměstnanci", color: "green" },
          { duration: "3 měsíce", condition: "Střední management / Technici", color: "blue" },
          { duration: "4 měsíce", condition: "Vedoucí pracovníci", color: "violet" }
        ],
        note: "Podle použitelných pravidel a případného prodloužení upraveného zákonem."
      }
    },

    article10: {
      title: "Článek 10 - Neobcházení — Doba trvání 24 měsíců",
      intro: "Během smluvního vztahu a po dobu 24 měsíců po posledním kontaktu (agentura a/nebo Profil) si strany zakazují jakékoli obcházení:",
      actors: {
        eu: "Zákaz pro US přímo uzavírat smlouvy s agenturou představenou YOJOB (nebo spojenou entitou) s obcházením YOJOB, pokud není písemná dohoda.",
        ett: "Zákaz pro agenturu obcházet odměňování YOJOB na US/příležitost pocházející z YOJOB, pokud není písemná dohoda."
      },
      penalty: {
        title: "Smluvní pokuta",
        description: "V případě porušení této doložky o neobcházení se strana v prodlení zavazuje zaplatit YOJOB paušální náhradu, jejíž částka je stanovena ve smlouvě (nebo ekvivalent procentu vygenerovaných/odhadovaných částek), aniž by to bylo na újmu dodatečné náhrady."
      }
    },

    article11: {
      title: "Článek 11 - Odpovědnost a omezení",
      items: {
        obligation: {
          title: "Povinnost prostředků",
          description: "YOJOB se zavazuje použít všechny nezbytné prostředky k realizaci svých zprostředkovatelských služeb, bez záruky výsledku."
        },
        nonResponsibility: {
          title: "Žádná odpovědnost agentura/Profily",
          description: "YOJOB neodpovídá za činy, opomenutí nebo nesplnění agentury, náborovaných Profilů, ani za úvěrová/pojistná rozhodnutí."
        },
        cap: {
          title: "Omezení",
          description: "S výjimkou hrubé nedbalosti nebo úmyslu je odpovědnost YOJOB omezena na čistou částku obdrženou v souvislosti s danou smlouvou během posledních 12 měsíců."
        },
        indirect: {
          title: "Nepřímé škody vyloučeny",
          description: "YOJOB nemůže být činěn odpovědným za nepřímé škody (ztráta činnosti, ušlé zisky, ztráta zákazníků atd.)."
        }
      }
    },

    article12: {
      title: "Článek 12 - Důvěrnost",
      intro: "Strany se zavazují zachovat důvěrnost všech informací vyměněných v rámci jejich spolupráce.",
      items: [
        "Důvěrné informace zahrnují obchodní, technická, finanční a strategická data",
        "Povinnost důvěrnosti trvá po celou dobu trvání smluvního vztahu a 5 let po jeho ukončení",
        "Informace nemohou být zveřejněny třetím stranám bez předchozího písemného souhlasu",
        "Strany musí přijmout všechna nezbytná opatření k ochraně důvěrnosti informací"
      ]
    },

    article13: {
      title: "Článek 13 - Osobní údaje (GDPR)",
      intro: "Výměna osobních údajů je přísně omezena na údaje nezbytné k realizaci služeb (kontakty, potřeby, profily kandidátů).",
      cards: {
        compliance: {
          title: "Soulad s GDPR",
          description: "Zpracování osobních údajů se provádí v souladu s GDPR a zákonem o ochraně údajů.",
          linkText: "Zásady ochrany osobních údajů"
        },
        dpo: {
          title: "Kontakt DPO",
          description: "Pro jakékoli žádosti týkající se vašich osobních údajů nebo výkonu práv GDPR."
        }
      },
      dpaNote: "DPA (Smlouva o zpracování údajů) může být připojena v případě potřeby v závislosti na povaze výměny údajů."
    },

    article14: {
      title: "Článek 14 - Doba trvání a ukončení",
      items: {
        duration: {
          title: "Doba trvání",
          description: "Doba trvání smluvního vztahu je stanovena ve smlouvě nebo akceptované trojstranné nabídce."
        },
        earlyTermination: {
          title: "Předčasné ukončení",
          description: "Výpovědní doba 30 dní (nebo doba trvání dohodnutá ve smlouvě) + platba splatných částek (včetně provizí/prémií za úspěch, pokud bylo dosaženo generujícího faktu)."
        },
        breach: {
          title: "Ukončení z důvodu nesplnění",
          description: "V případě závažného nesplnění povinností: upomínka + lhůta k nápravě 15 dní. V případě absence nápravy, ukončení ze zákona."
        }
      }
    },

    article15: {
      title: "Článek 15 - Vyšší moc",
      intro: "Strany nemohou být činěny odpovědnými, pokud nesplnění nebo zpoždění ve výkonu jejich povinností vyplývá z případu vyšší moci ve smyslu francouzské judikatury.",
      examplesTitle: "Představují zejména případy vyšší moci:",
      examples: [
        "Přírodní katastrofy, povodně, požáry",
        "Války, útoky, nepokoje",
        "Generální stávky, blokády dopravy",
        "Výpadky sítí (telekomunikace, elektřina)",
        "Epidemie, pandemie",
        "Vládní zdravotní opatření"
      ],
      suspension: "V případě vyšší moci jsou povinnosti pozastaveny po dobu trvání události, po oznámení druhé straně."
    },

    article16: {
      title: "Článek 16 - Rozhodné právo a spory",
      sections: {
        law: {
          title: "Rozhodné právo",
          description: "Tyto VOP podléhají francouzskému právu."
        },
        amicable: {
          title: "Předběžný pokus o smírné řešení",
          description: "V případě sporu se strany zavazují hledat smírné řešení před jakýmkoli soudním řízením. Klient může využít konvenční mediaci nebo jakýkoli jiný alternativní způsob řešení sporů."
        },
        jurisdiction: {
          title: "Příslušný soud",
          description: "V případě absence smírného řešení podléhají všechny spory výlučné pravomoci soudů sídla YOJOB, pokud neplatí imperativní opačné pravidlo."
        }
      }
    },

    article17: {
      title: "Článek 17 - Úprava VOP",
      intro: "YOJOB si vyhrazuje právo kdykoli upravit tyto VOP.",
      items: [
        "VOP použitelné jsou ty platné k datu akceptace nabídky/smlouvy",
        "Úpravy nemají zpětný účinek na probíhající smlouvy, pokud není výslovný písemný souhlas stran",
        "Nejnovější verze VOP může být konzultována kdykoli na webových stránkách YOJOB"
      ]
    }
  },

  cta: {
    title: "Máte otázky ohledně našich VOP?",
    description: "Náš právní a obchodní tým je vám k dispozici pro jakákoli vysvětlení týkající se těchto Všeobecných obchodních podmínek.",
    backHome: "Zpět na domovskou stránku",
    contactUs: "Kontaktujte nás"
  },

  footer: {
    copyright: "© {year} {company} — Samostatný podnikatel. Všechna práva vyhrazena.",
    links: {
      legal: "Právní informace",
      privacy: "Soukromí",
      cgv: "VOP"
    }
  },

  badges: {
    main: "Hlavní",
    optional: "Volitelné",
    mixed: "Smíšené"
  },

  common: {
    back: "Zpět",
    triggers: "Spouštěče",
    conditions: "Podmínky",
    safeguards: "Záruky"
  }
};
