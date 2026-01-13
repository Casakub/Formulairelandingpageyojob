/**
 * 🇸🇪 SVENSKA ÖVERSÄTTNINGAR - ALLMÄNNA FÖRSÄLJNINGSVILLKOR (AFV)
 * 
 * @version 1.0.0
 */

export const cgvSV = {
  hero: {
    badge: "B2B-dokument - Avtalsmässigt",
    title: "Allmänna försäljningsvillkor",
    subtitle: "AFV tillämpliga för Användarföretag (AF) och bemanningsföretag partners",
    effectiveDate: "Version i kraft från 19 december 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Mellanhand / Affärsmäklare"
    },
    eu: {
      title: "Användarföretag (AF)",
      description: "Slutkund som tar emot arbetskraft"
    },
    ett: {
      title: "Bemanningsföretag",
      description: "Rekryteringspartner"
    }
  },

  sections: {
    article0: {
      title: "Artikel 0 - Tjänsteleverantörens identitet",
      fields: {
        legalForm: "Juridisk form",
        legalFormValue: "Enskild näringsidkare (EI)",
        manager: "Chef",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Inomeuropeiskt momsregnr",
        vatValue: "FR79447862764",
        address: "Adress",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakter",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Yrkesansvarsförsäkring",
        description: "YOJOB har en yrkesansvarsförsäkring som täcker de ekonomiska konsekvenserna av dess ansvar i samband med dess tjänster."
      }
    },

    article1: {
      title: "Artikel 1 - Definitioner",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Mellanhand/affärsmäklare som säkerställer förvärv, kvalificering, samordning och formalisering av affärserbjudanden mellan AF och byråer."
        },
        eu: {
          term: "Användarföretag (AF)",
          definition: "Slutkundsföretag som tar emot arbetskraft som tillhandahålls av bemanningsföretag partner."
        },
        ett: {
          term: "Bemanningsföretag / Partnerbyrå",
          definition: "Bemanningsföretag som utför rekrytering, avtalsskrivning och organisering av personalförsörjning."
        },
        profile: {
          term: "Profil",
          definition: "Kandidat eller tillfällig arbetstagare som byrån presenterar för AF via YOJOB."
        },
        mission: {
          term: "Uppdrag",
          definition: "Rekryteringsbehov uttryckt av AF (yrke, volym, tidsfrister, plats, särskilda krav)."
        },
        proposition: {
          term: "Trepartsförslag",
          definition: "Strukturerat och bekräftat av AF och byrån affärs- och administrativt förslag från YOJOB (underskrift eller skriftligt avtal)."
        },
        handover: {
          term: "Överlämning",
          definition: "Tidpunkt när byrån blir AF:s huvudkontakt efter dubbel validering AF + byrå."
        },
        insurer: {
          term: "Kreditförsäkrare",
          definition: "Kreditförsäkringsorganisation (COFACE, Allianz Trade etc.) som deltar i kundriskananalys och tilldelning av kreditgränser."
        }
      }
    },

    article2: {
      title: "Artikel 2 - Föremål",
      intro: "Dessa AFV reglerar YOJOB:s tjänster, som huvudsakligen består av:",
      steps: {
        step1: {
          title: "Förvärv och kvalificering",
          description: "Identifiering och kvalificering av Användarföretag med europeiska rekryteringsbehov"
        },
        step2: {
          title: "Presentation av möjligheter",
          description: "Överföring av kvalificerade möjligheter till lämpliga bemanningsföretag partners"
        },
        step3: {
          title: "Strukturering av förslag",
          description: "Beredning av detaljerat affärsförslag (volym, samordning, administrativa delar)"
        },
        step4: {
          title: "Organisation av överlämning",
          description: "Säkerställande av övergång till byrån efter undertecknande för genomförande (rekrytering, försörjning, fakturering)"
        }
      },
      yojobRole: {
        title: "YOJOB:s roll",
        description: "YOJOB agerar endast som mellanhand. Byrån ansvarar för rekrytering, försörjning, arbetsgivarens efterlevnad och fakturering till AF, om inte annat uttryckligen föreskrivs i avtalet."
      }
    },

    article3: {
      title: "Artikel 3 - Avtalsdokument och hierarki",
      intro: "Vid motsägelse mellan dokument tillämpas följande prioritetsordning:",
      hierarchy: {
        rank1: {
          title: "Särskilt avtal / Särskilda villkor",
          subtitle: "Anpassat partnerskap eller affärsbidrag"
        },
        rank2: {
          title: "Trepartsförslag / Förslag / Beställning",
          subtitle: "Dokument undertecknat av parterna"
        },
        rank3: {
          title: "Allmänna försäljningsvillkor (AFV)",
          subtitle: "Detta dokument"
        },
        rank4: {
          title: "Bilagor",
          subtitle: "SLA, DPA, processer, checklistor etc."
        }
      }
    },

    article4: {
      title: "Artikel 4 - Avtalsscheman",
      intro: "Det tillämpliga schemat anges i förslaget eller avtalet. YOJOB kan arbeta enligt 3 modeller:",
      schemes: {
        schemaB: {
          label: "Schema B",
          badge: "Huvudsaklig",
          title: "Byrå kund hos YOJOB",
          description: "YOJOB ersätts av byrån för affärsbidrag (månadsarvode och/eller framgångsbonus)"
        },
        schemaA: {
          label: "Schema A",
          badge: "Valfri",
          title: "AF kund hos YOJOB",
          description: "YOJOB fakturerar AF för tilläggstjänster (förstärkt samordning, utökad dokumentationsstöd)"
        },
        schemaC: {
          label: "Schema C",
          badge: "Blandad",
          title: "Kombinerad ersättning",
          description: "YOJOB ersätts av byrån (Schema B) OCH fakturerar AF för tilläggstjänster (Schema A)"
        }
      }
    },

    article5: {
      title: "Artikel 5 - Process och överlämning",
      phase1: {
        title: "5.1 Introduktionsfas (affärer och samordning)",
        intro: "YOJOB säkerställer:",
        items: [
          "Förvärv och kvalificering av Användarföretag",
          "Insamling av nödvändiga delar för uppdraget",
          "Överföring av behovet till en eller flera bemanningsföretag partners",
          "Samordning fram till avslutande av trepartsförslaget"
        ]
      },
      phase2: {
        title: "5.2 Aktivering av överlämning",
        intro: "\"Överlämningen\" sker efter uppfyllelse av två kumulativa villkor:",
        conditions: [
          "AF:s underskrift/skriftligt avtal för förslaget",
          "Byråns acceptans/validering (kapacitet, villkor, efterlevnad, risk)"
        ],
        consequences: "Från denna tidpunkt blir byrån huvudkontakt: rekrytering, avtal, introduktion, försörjning, löner, utstationeringsförpliktelser, fakturering och indrivning från AF."
      },
      phase3: {
        title: "5.3 Kvarvarande stöd (om förutsett)",
        description: "YOJOB kan förbli som stöd (samordning/kvalitet) i den omfattning som anges i förslaget eller avtalet."
      }
    },

    article6: {
      title: "Artikel 6 - Ekonomiska villkor och betalningssätt",
      section1: {
        title: "6.1 Princip: \"selektiva\" villkor för varje fall",
        intro: "Med hänsyn till branschpraxis (kreditförsäkring, kundrisk, faktureringens organisation) fastställs betalningsvillkoren för varje fall i det gällande förslaget/avtalet.",
        modalitiesTitle: "Metoderna kan inkludera:",
        modalities: [
          "Betalning vid mottagande",
          "Förskottsbetalning / förskott",
          "Veckovis fakturering",
          "Garantier (deposition, begränsning av kreditgräns)"
        ],
        legalLimit: "När en betalningsvillkor \"med förfallotid\" beviljas respekteras de lagliga gränserna: 60 dagar från fakturans utfärdandedatum eller 45 dagar slutet av månaden, om angivet."
      },
      section2: {
        title: "6.2 Standardnätverk — AF \"risker\"",
        intro: "Riskklassificeringen bestäms från 3 kumulativa källor:",
        sources: {
          insurer: {
            title: "Kreditförsäkrare",
            description: "Täckning/kreditgräns/villkor"
          },
          score: {
            title: "Byråns interna bedömning",
            description: "Risk- och indrivningspolicy"
          },
          history: {
            title: "Betalningshistorik",
            description: "Beteende och påverkan"
          }
        },
        primacy: "Prioritet: vid motsägelse har kreditförsäkrarens beslut prioritet framför andra signaler.",
        levelsTitle: "Risknivåer och betalningsvillkor",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Försäkrare: täckt / kreditgräns OK; Byråns bedömning: A/B; Historik: god (0 incidenter)",
            conditions: "Månadsvis + överenskommen tidsfrist (t.ex. 30d) inom laglig gräns",
            safeguards: "Standard kreditgräns"
          },
          r1: {
            level: "R1",
            title: "Övervakad",
            trigger: "Försäkrare: begränsad kreditgräns; Byråns bedömning: B/C; Historik: mindre förseningar",
            conditions: "Vid mottagande ELLER förskott 30-50% + resterande vid mottagande",
            safeguards: "Begränsad kreditgräns + veckovis översyn"
          },
          r2: {
            level: "R2",
            title: "Förstärkt",
            trigger: "Försäkrare: otillräcklig partiell täckning; Byråns bedömning: C/D; Historik: betydande förseningar",
            conditions: "Veckovis vid mottagande ELLER förskott 50-70% + veckovis justering",
            safeguards: "Start i serier (begränsad volym)"
          },
          r3: {
            level: "R3",
            title: "Kritisk",
            trigger: "Försäkrare: AVSLAG / oförsäkrad; Byråns bedömning: D; Historik: allvarliga incidenter",
            conditions: "100% förskottsbetalning (eller vägran att starta)",
            safeguards: "Villkorad start med betalning; avbrytande vid avvikelse"
          }
        },
        transparency: {
          title: "Transparens och acceptans",
          description: "Trepartsförslaget anger nivån (R0/R1/R2/R3), faktureringsmetod och betalningsvillkor. Förslagets underskrift/acceptans är lika med acceptans av dessa metoder."
        },
        adjustment: {
          title: "Dynamisk justeringsklausul",
          description: "Vid riskutveckling (försäkrarens kreditgränsminskning, förseningar, incidenter) kan byrån se över betalningsvillkoren för nästa period efter meddelande till AF, med hänsyn till det gällande avtalet."
        }
      },
      section3: {
        title: "6.3 Betalningsförseningar",
        intro: "Vid försening av faktura utfärdad av YOJOB (Schema A eller fakturering byrå→YOJOB):",
        penalties: [
          "Dröjsmålsränta betalas utan påminnelse, enligt den ränta som anges i avtalet eller den tillämpliga rättsliga ramen",
          "Fast ersättning för indrivning: 40 € per obetald faktura",
          "Möjlig avbrytande av tjänster efter skriftligt meddelande"
        ]
      }
    },

    article7: {
      title: "Artikel 7 - Användarföretagets (AF) åtaganden",
      intro: "AF åtar sig att:",
      obligations: [
        "Tillhandahålla exakt och fullständigt behov och aktivt samarbete (åsikter, valideringar, planering)",
        "Överföra säkerhetskrav och tillträdesmetoder till platser",
        "Respektera informationens konfidentialitet (byrå, profiler, affärsvillkor)",
        "Erkänna att rekrytering, försörjning och fakturering av arbetskraft är byråns ansvar (om inte annat skriftligen föreskrivs)",
        "Följa betalningsvillkoren som anges i trepartsförslaget"
      ]
    },

    article8: {
      title: "Artikel 8 - Partnerbyråns åtaganden och ersättning",
      section1: {
        title: "8.1 Månadsarvode (affärsbidrag)",
        intro: "Byrån är skyldig YOJOB ett arvode beräknat på nettobeloppet som byrån fakturerar AF för uppdrag som kommer från YOJOB.",
        details: {
          rate: {
            label: "Arvodesats",
            value: "Variabel enligt avtal (t.ex. 3-8%)"
          },
          base: {
            label: "Beräkningsbas",
            value: "Nettobelopp fakturerat AF (YOJOB-uppdrag)"
          },
          rhythm: {
            label: "Faktureringsrytm",
            value: "Månadsvis"
          },
          deadline: {
            label: "Betalningstidsfrist",
            value: "Från mottagande av AF:s betalning, utan dröjsmål"
          }
        }
      },
      section2: {
        title: "8.2 Framgångsbonus \"placering\"",
        intro: "För vissa uppdrag kan en framgångsbonus läggas till månadsarvodet:",
        items: {
          trigger: {
            label: "Genererande faktor",
            value: "Slutet av gällande provanställningstid (se art. 9), utan avbrott hänförligt till Profilen"
          },
          exigibility: {
            label: "Kravbarhet",
            value: "Omedelbar full betalning vid YOJOB-fakturas utfärdande"
          },
          amount: {
            label: "Belopp",
            value: "Variabel enligt avtal (t.ex. % av årlig bruttolön eller fast belopp)"
          }
        }
      },
      section3: {
        title: "8.3 Rapportering",
        intro: "Byrån tillhandahåller YOJOB med överenskommen frekvens (t.ex. månadsvis):",
        items: [
          "Lista över YOJOB-uppdrag (AF, placering, datum, volymer)",
          "Relaterat nettobelopp per uppdrag",
          "Rimliga motiverande delar",
          "GDPR- och affärshemlighetsrespekt"
        ]
      }
    },

    article9: {
      title: "Artikel 9 - Lagstadgad provanställningstid",
      section1: {
        title: "9.1 Princip",
        description: "Den tillämpliga provanställningstiden är den som fastställs i avtalsdokumenten (byrå↔AF och/eller byrå↔Profil) och de tillämpliga reglerna/kollektivavtalen. Den får inte överstiga maximalt tillåtna varaktigheter."
      },
      section2: {
        title: "9.2 Utstationering / Tillfälligt arbete (uppdragsavtal)",
        intro: "Uppdragsavtalet kan ha en avtalsbaserad provanställningstid; vid dess frånvaro är den begränsad till:",
        durations: [
          { duration: "2 dagar", condition: "Avtal ≤ 1 månad" },
          { duration: "3 dagar", condition: "1 månad < avtal ≤ 2 månader" },
          { duration: "5 dagar", condition: "Avtal > 2 månader" }
        ]
      },
      section3: {
        title: "9.3 Anställning (tillsvidare/liknande) — Juridisk begränsning",
        intro: "För tillsvidareavtal är den maximala varaktigheten av provanställningstiden särskilt:",
        durations: [
          { duration: "2 månader", condition: "Arbetare / Anställda", color: "green" },
          { duration: "3 månader", condition: "Mellanchefer / Tekniker", color: "blue" },
          { duration: "4 månader", condition: "Chefer", color: "violet" }
        ],
        note: "Enligt tillämpliga regler och eventuell lagreglerad förlängning."
      }
    },

    article10: {
      title: "Artikel 10 - Förbud mot kringgående — Varaktighet 24 månader",
      intro: "Under avtalsförhållandet och i 24 månader efter sista kontakt (byrå och/eller Profil) förbjuder parterna varje kringgående:",
      actors: {
        eu: "Förbud för AF att avtala direkt med byrå som presenterats av YOJOB (eller ansluten enhet), kringgående YOJOB, utan skriftligt avtal.",
        ett: "Förbud för byrån att kringgå YOJOB:s ersättning för AF/möjlighet som kommer från YOJOB, utan skriftligt avtal."
      },
      penalty: {
        title: "Avtalsstraff",
        description: "Vid brott mot denna klausul om förbud mot kringgående åtar sig den felande parten att betala YOJOB ett fast skadestånd vars belopp anges i avtalet (eller procentuell motsvarighet av genererade/uppskattade belopp), utan att det påverkar ytterligare skadestånd."
      }
    },

    article11: {
      title: "Artikel 11 - Ansvar och begränsning",
      items: {
        obligation: {
          title: "Åtagande om medel",
          description: "YOJOB åtar sig att använda alla nödvändiga medel för genomförandet av sina förmedlingstjänster, utan garanti för resultat."
        },
        nonResponsibility: {
          title: "Inget ansvar byrå/Profiler",
          description: "YOJOB ansvarar inte för byråns, anställda Profilers handlingar, underlåtelser eller icke-fullgörande, inte heller för kredit-/försäkringsbeslut."
        },
        cap: {
          title: "Begränsning",
          description: "Förutom vid grov vårdslöshet eller uppsåt är YOJOB:s ansvar begränsat till nettobeloppet som mottagits avseende det berörda avtalet under de senaste 12 månaderna."
        },
        indirect: {
          title: "Indirekta skador undantagna",
          description: "YOJOB kan inte anses ansvarig för indirekta skador (verksamhetsförlust, utebliven vinst, kundförlust etc.)."
        }
      }
    },

    article12: {
      title: "Artikel 12 - Konfidentialitet",
      intro: "Parterna åtar sig att behålla konfidentialitet för all information som utbyts inom ramen för deras samarbete.",
      items: [
        "Konfidentiell information inkluderar affärs-, tekniska, finansiella och strategiska data",
        "Sekretessåtagandet varar under avtalsförhållandet och 5 år efter dess slut",
        "Informationen får inte avslöjas för tredje part utan föregående skriftligt samtycke",
        "Parterna måste vidta alla nödvändiga åtgärder för att skydda informationens konfidentialitet"
      ]
    },

    article13: {
      title: "Artikel 13 - Personuppgifter (GDPR)",
      intro: "Utbytet av personuppgifter är strikt begränsat till data som är nödvändiga för genomförandet av tjänsterna (kontakter, behov, kandidatprofiler).",
      cards: {
        compliance: {
          title: "GDPR-efterlevnad",
          description: "Behandlingen av personuppgifter utförs i enlighet med GDPR och dataskyddslagen.",
          linkText: "Integritetspolicy"
        },
        dpo: {
          title: "DPO-kontakt",
          description: "För alla förfrågningar angående dina personuppgifter eller utövande av dina GDPR-rättigheter."
        }
      },
      dpaNote: "En DPA (Databehandlingsavtal) kan läggas till efter behov, beroende på datautbytets karaktär."
    },

    article14: {
      title: "Artikel 14 - Varaktighet och uppsägning",
      items: {
        duration: {
          title: "Varaktighet",
          description: "Avtalsförhållandets varaktighet anges i avtalet eller det accepterade trepartsförslaget."
        },
        earlyTermination: {
          title: "Förtida uppsägning",
          description: "Uppsägningstid 30 dagar (eller varaktighet angiven i avtalet) + betalning av skuldade belopp (inklusive arvoden/framgångsbonusar, om genererande faktor uppnåtts)."
        },
        breach: {
          title: "Uppsägning för icke-fullgörande",
          description: "Vid allvarlig icke-fullgörande av åtaganden: påminnelse + rättelsetid 15 dagar. Vid utebliven rättelse, uppsägning av lag."
        }
      }
    },

    article15: {
      title: "Artikel 15 - Force majeure",
      intro: "Parterna kan inte anses ansvariga om deras icke-fullgörande eller försening av deras åtaganden härrör från ett fall av force majeure i den mening som avses i fransk rättspraxis.",
      examplesTitle: "Fall av force majeure inkluderar särskilt:",
      examples: [
        "Naturkatastrofer, översvämningar, bränder",
        "Krig, attacker, oroligheter",
        "Generalstrejker, transportblockader",
        "Nätverksavbrott (telekommunikation, el)",
        "Epidemier, pandemier",
        "Statliga hälsoåtgärder"
      ],
      suspension: "Vid force majeure suspenderas åtagandena under händelsens varaktighet efter meddelande till den andra parten."
    },

    article16: {
      title: "Artikel 16 - Tillämplig lag och tvister",
      sections: {
        law: {
          title: "Tillämplig lag",
          description: "Dessa AFV lyder under fransk rätt."
        },
        amicable: {
          title: "Föregående försök till minnelig lösning",
          description: "Vid tvist åtar sig parterna att söka en minnelig lösning före varje rättslig process. Kunden kan tillämpa konventionell medling eller någon annan alternativ tvistelösningsmetod."
        },
        jurisdiction: {
          title: "Behörig domstol",
          description: "Vid avsaknad av minnelig lösning faller alla tvister under den exklusiva jurisdiktionen för domstolarna vid YOJOB:s säte, om inte en tvingande motsatt regel tillämpas."
        }
      }
    },

    article17: {
      title: "Artikel 17 - Ändring av AFV",
      intro: "YOJOB förbehåller sig rätten att när som helst ändra dessa AFV.",
      items: [
        "AFV som tillämpas är de som gällde vid datum för förslags-/avtalsacceptans",
        "Ändringarna har inte retroaktiv verkan på pågående avtal, om inte det finns uttryckligt skriftligt samtycke från parterna",
        "Den senaste versionen av AFV kan konsulteras när som helst på YOJOB:s webbplats"
      ]
    }
  },

  cta: {
    title: "Har du frågor om våra AFV?",
    description: "Vårt juridiska och affärsteam står till ditt förfogande för alla förtydliganden om dessa Allmänna försäljningsvillkor.",
    backHome: "Tillbaka till startsidan",
    contactUs: "Kontakta oss"
  },

  footer: {
    copyright: "© {year} {company} — Enskild näringsidkare. Alla rättigheter förbehållna.",
    links: {
      legal: "Juridisk information",
      privacy: "Integritet",
      cgv: "AFV"
    }
  },

  badges: {
    main: "Huvudsaklig",
    optional: "Valfri",
    mixed: "Blandad"
  },

  common: {
    back: "Tillbaka",
    triggers: "Utlösare",
    conditions: "Villkor",
    safeguards: "Garantier"
  }
};
