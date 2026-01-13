/**
 * 🇩🇰 DANSKE OVERSÆTTELSER - ALMINDELIGE SALGS- OG LEVERINGSBETINGELSER (ASL)
 * 
 * @version 1.0.0
 */

export const cgvDA = {
  hero: {
    badge: "B2B-dokument - Kontraktmæssigt",
    title: "Almindelige salgs- og leveringsbetingelser",
    subtitle: "ASL gældende for Brugervirksomheder (BV) og vikarbureau partnere",
    effectiveDate: "Version gældende fra 19. december 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Mellemmand / Forretningsmægler"
    },
    eu: {
      title: "Brugervirksomhed (BV)",
      description: "Slutkunde der modtager arbejdskraft"
    },
    ett: {
      title: "Vikarbureau",
      description: "Rekrutteringspartner"
    }
  },

  sections: {
    article0: {
      title: "Artikel 0 - Tjenesteudbyders identitet",
      fields: {
        legalForm: "Juridisk form",
        legalFormValue: "Enkeltmandsvirksomhed (EI)",
        manager: "Leder",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Intra-EU momsnr.",
        vatValue: "FR79447862764",
        address: "Adresse",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakter",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Erhvervsansvarsforsikring",
        description: "YOJOB har en erhvervsansvarsforsikring, der dækker de økonomiske konsekvenser af dets ansvar i forbindelse med dets tjenester."
      }
    },

    article1: {
      title: "Artikel 1 - Definitioner",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Mellemmand/forretningsmægler der sikrer erhvervelse, kvalificering, koordinering og formalisering af forretningstilbud mellem BV og bureauer."
        },
        eu: {
          term: "Brugervirksomhed (BV)",
          definition: "Slutkundevirksomhed, der modtager arbejdskraft leveret af vikarbureau partner."
        },
        ett: {
          term: "Vikarbureau / Partnerbureau",
          definition: "Vikarbureau der udfører rekruttering, kontraktindgåelse og organisering af personaleleverancer."
        },
        profile: {
          term: "Profil",
          definition: "Kandidat eller vikar som bureauet præsenterer for BV via YOJOB."
        },
        mission: {
          term: "Mission",
          definition: "Rekrutteringsbehov udtrykt af BV (erhverv, omfang, tidsfrister, lokation, særlige krav)."
        },
        proposition: {
          term: "Trepartforslag",
          definition: "Struktureret og bekræftet af BV og bureauet forretnings- og administrativt forslag fra YOJOB (underskrift eller skriftlig aftale)."
        },
        handover: {
          term: "Overdragelse",
          definition: "Tidspunkt hvor bureauet bliver BV's hovedkontakt efter dobbelt validering BV + bureau."
        },
        insurer: {
          term: "Kreditforsikrer",
          definition: "Kreditforsikringsorganisation (COFACE, Allianz Trade osv.) der deltager i kunderisikoanalyse og tildeling af kreditgrænser."
        }
      }
    },

    article2: {
      title: "Artikel 2 - Genstand",
      intro: "Disse ASL regulerer YOJOB's tjenester, som hovedsageligt består af:",
      steps: {
        step1: {
          title: "Erhvervelse og kvalificering",
          description: "Identifikation og kvalificering af Brugervirksomheder med europæiske rekrutteringsbehov"
        },
        step2: {
          title: "Præsentation af muligheder",
          description: "Overførsel af kvalificerede muligheder til passende vikarbureau partnere"
        },
        step3: {
          title: "Strukturering af forslag",
          description: "Udarbejdelse af detaljeret forretningsforslag (omfang, koordinering, administrative elementer)"
        },
        step4: {
          title: "Organisering af overdragelse",
          description: "Sikring af overgang til bureauet efter underskrift til gennemførelse (rekruttering, levering, fakturering)"
        }
      },
      yojobRole: {
        title: "YOJOB's rolle",
        description: "YOJOB fungerer kun som mellemmand. Bureauet er ansvarligt for rekruttering, levering, arbejdsgiverens overholdelse og fakturering til BV, medmindre andet udtrykkeligt er fastsat i kontrakten."
      }
    },

    article3: {
      title: "Artikel 3 - Kontraktdokumenter og hierarki",
      intro: "I tilfælde af modsigelse mellem dokumenter anvendes følgende prioritetsrækkefølge:",
      hierarchy: {
        rank1: {
          title: "Særlig kontrakt / Særlige betingelser",
          subtitle: "Tilpasset partnerskab eller forretningsmæssigt bidrag"
        },
        rank2: {
          title: "Trepartforslag / Forslag / Ordre",
          subtitle: "Dokument underskrevet af parterne"
        },
        rank3: {
          title: "Almindelige salgs- og leveringsbetingelser (ASL)",
          subtitle: "Dette dokument"
        },
        rank4: {
          title: "Bilag",
          subtitle: "SLA, DPA, processer, tjeklister osv."
        }
      }
    },

    article4: {
      title: "Artikel 4 - Kontraktskemaer",
      intro: "Det gældende skema er angivet i forslaget eller kontrakten. YOJOB kan arbejde efter 3 modeller:",
      schemes: {
        schemaB: {
          label: "Skema B",
          badge: "Hovedsagelig",
          title: "Bureau kunde hos YOJOB",
          description: "YOJOB kompenseres af bureauet for forretningsmæssigt bidrag (månedlig provision og/eller succesbonus)"
        },
        schemaA: {
          label: "Skema A",
          badge: "Valgfri",
          title: "BV kunde hos YOJOB",
          description: "YOJOB fakturerer BV for tillægstjenester (forstærket koordinering, udvidet dokumentationsstøtte)"
        },
        schemaC: {
          label: "Skema C",
          badge: "Blandet",
          title: "Kombineret kompensation",
          description: "YOJOB kompenseres af bureauet (Skema B) OG fakturerer BV for tillægstjenester (Skema A)"
        }
      }
    },

    article5: {
      title: "Artikel 5 - Proces og overdragelse",
      phase1: {
        title: "5.1 Introduktionsfase (forretning og koordinering)",
        intro: "YOJOB sikrer:",
        items: [
          "Erhvervelse og kvalificering af Brugervirksomheden",
          "Indsamling af nødvendige elementer til missionen",
          "Overførsel af behovet til et eller flere vikarbureau partnere",
          "Koordinering indtil lukning af trepartforslaget"
        ]
      },
      phase2: {
        title: "5.2 Aktivering af overdragelse",
        intro: "\"Overdragelsen\" sker efter opfyldelse af to kumulative betingelser:",
        conditions: [
          "BV's underskrift/skriftlig aftale til forslaget",
          "Bureauets accept/validering (kapacitet, betingelser, overholdelse, risiko)"
        ],
        consequences: "Fra dette tidspunkt bliver bureauet hovedkontakt: rekruttering, kontrakter, introduktion, levering, løn, udstationeringsforpligtelser, fakturering og inddrivelse fra BV."
      },
      phase3: {
        title: "5.3 Resterende støtte (hvis fastsat)",
        description: "YOJOB kan forblive som støtte (koordinering/kvalitet) i det omfang der er angivet i forslaget eller kontrakten."
      }
    },

    article6: {
      title: "Artikel 6 - Økonomiske betingelser og betalingsmåde",
      section1: {
        title: "6.1 Princip: \"selektive\" betingelser for hvert tilfælde",
        intro: "Under hensyntagen til branchepraksis (kreditforsikring, kunderisiko, faktureringsorganisation) fastlægges betalingsbetingelserne for hvert tilfælde i det gældende forslag/kontrakt.",
        modalitiesTitle: "Metoderne kan omfatte:",
        modalities: [
          "Betaling ved modtagelse",
          "Forudbetaling / forskud",
          "Ugentlig fakturering",
          "Garantier (depositum, begrænsning af kreditgrænse)"
        ],
        legalLimit: "Når en betalingsbetingelse \"med forfald\" tildeles, overholdes de juridiske grænser: 60 dage fra fakturaens udstedelsesdato eller 45 dage ved månedsskifte, hvis angivet."
      },
      section2: {
        title: "6.2 Standardnetværk — BV \"risici\"",
        intro: "Risikoklassificeringen bestemmes ud fra 3 kumulative kilder:",
        sources: {
          insurer: {
            title: "Kreditforsikrer",
            description: "Dækning/kreditgrænse/betingelser"
          },
          score: {
            title: "Bureauets interne vurdering",
            description: "Risiko- og inddrivelsespolitik"
          },
          history: {
            title: "Betalingshistorik",
            description: "Adfærd og indvirkning"
          }
        },
        primacy: "Prioritet: i tilfælde af modsigelse har kreditforsikrerens beslutning prioritet over andre signaler.",
        levelsTitle: "Risikoniveauer og betalingsbetingelser",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Forsikrer: dækket / kreditgrænse OK; Bureauets vurdering: A/B; Historik: god (0 hændelser)",
            conditions: "Månedlig + aftalt frist (f.eks. 30d) inden for juridisk grænse",
            safeguards: "Standard kreditgrænse"
          },
          r1: {
            level: "R1",
            title: "Overvåget",
            trigger: "Forsikrer: begrænset kreditgrænse; Bureauets vurdering: B/C; Historik: mindre forsinkelser",
            conditions: "Ved modtagelse ELLER forskud 30-50% + rest ved modtagelse",
            safeguards: "Begrænset kreditgrænse + ugentlig gennemgang"
          },
          r2: {
            level: "R2",
            title: "Forstærket",
            trigger: "Forsikrer: utilstrækkelig delvis dækning; Bureauets vurdering: C/D; Historik: betydelige forsinkelser",
            conditions: "Ugentlig ved modtagelse ELLER forskud 50-70% + ugentlig justering",
            safeguards: "Start i serier (begrænset volumen)"
          },
          r3: {
            level: "R3",
            title: "Kritisk",
            trigger: "Forsikrer: AFVISNING / uforsikret; Bureauets vurdering: D; Historik: alvorlige hændelser",
            conditions: "100% forudbetaling (eller afvisning af start)",
            safeguards: "Betinget start med betaling; stop ved afvigelse"
          }
        },
        transparency: {
          title: "Gennemsigtighed og accept",
          description: "Trepartforslaget angiver niveauet (R0/R1/R2/R3), faktureringsmetode og betalingsbetingelse. Forslagets underskrift/accept svarer til accept af disse metoder."
        },
        adjustment: {
          title: "Dynamisk justeringsklausul",
          description: "I tilfælde af risikoudvikling (forsikrerens kreditgrænsenedgang, forsinkelser, hændelser) kan bureauet gennemgå betalingsbetingelserne for den næste periode efter meddelelse til BV, under overholdelse af den gældende kontrakt."
        }
      },
      section3: {
        title: "6.3 Betalingsforsinkelser",
        intro: "I tilfælde af forsinkelse af faktura udstedt af YOJOB (Skema A eller fakturering bureau→YOJOB):",
        penalties: [
          "Morarenter betales uden påmindelse, i henhold til den sats der er fastsat i kontrakten eller den gældende juridiske ramme",
          "Fast erstatning for inddrivelse: 40 € pr. ubetalt faktura",
          "Mulig stop af tjenester efter skriftlig meddelelse"
        ]
      }
    },

    article7: {
      title: "Artikel 7 - Brugervirksomhedens (BV) forpligtelser",
      intro: "BV forpligter sig til:",
      obligations: [
        "At levere præcist og fuldstændigt behov og aktivt samarbejde (meninger, valideringer, planlægning)",
        "At overføre sikkerhedskrav og adgangsmetoder til steder",
        "At respektere fortroligheden af oplysninger (bureau, profiler, forretningsbetingelser)",
        "At anerkende at rekruttering, levering og fakturering af arbejdskraft er bureauets ansvar (medmindre andet skriftligt er fastsat)",
        "At overholde betalingsbetingelserne angivet i trepartforslaget"
      ]
    },

    article8: {
      title: "Artikel 8 - Partnerbureauets forpligtelser og kompensation",
      section1: {
        title: "8.1 Månedlig provision (forretningsmæssigt bidrag)",
        intro: "Bureauet skylder YOJOB en provision beregnet på nettobeløbet som bureauet fakturerer BV for missioner stammende fra YOJOB.",
        details: {
          rate: {
            label: "Provisionssats",
            value: "Variabel efter kontrakt (f.eks. 3-8%)"
          },
          base: {
            label: "Beregningsgrundlag",
            value: "Nettobeløb faktureret BV (YOJOB-missioner)"
          },
          rhythm: {
            label: "Faktureringsrytme",
            value: "Månedlig"
          },
          deadline: {
            label: "Betalingsfrist",
            value: "Fra modtagelse af BV's betaling, uden forsinkelse"
          }
        }
      },
      section2: {
        title: "8.2 Succesbonus \"placering\"",
        intro: "For visse missioner kan en succesbonus tilføjes til den månedlige provision:",
        items: {
          trigger: {
            label: "Genererende faktor",
            value: "Afslutning af gældende prøvetid (se art. 9), uden afbrydelse der kan tilskrives Profilen"
          },
          exigibility: {
            label: "Forfaldstidspunkt",
            value: "Øjeblikkelig fuld betaling ved YOJOB-fakturas udstedelse"
          },
          amount: {
            label: "Beløb",
            value: "Variabel efter kontrakt (f.eks. % af årlig bruttoløn eller fast beløb)"
          }
        }
      },
      section3: {
        title: "8.3 Rapportering",
        intro: "Bureauet leverer til YOJOB med aftalt frekvens (f.eks. månedlig):",
        items: [
          "Liste over YOJOB-missioner (BV, placering, datoer, volumener)",
          "Relateret nettobeløb pr. mission",
          "Rimelige begrundende elementer",
          "GDPR- og forretningshemmeligheds-overholdelse"
        ]
      }
    },

    article9: {
      title: "Artikel 9 - Lovpligtig prøvetid",
      section1: {
        title: "9.1 Princip",
        description: "Den gældende prøvetid er den der er fastsat i kontraktdokumenterne (bureau↔BV og/eller bureau↔Profil) og de gældende regler/kollektive overenskomster. Den må ikke overstige maksimalt tilladte varigheder."
      },
      section2: {
        title: "9.2 Udstationering / Vikararbejde (missionskontrakt)",
        intro: "Missionskontrakten kan have en kontraktmæssig prøvetid; ved dens fravær er den begrænset til:",
        durations: [
          { duration: "2 dage", condition: "Kontrakt ≤ 1 måned" },
          { duration: "3 dage", condition: "1 måned < kontrakt ≤ 2 måneder" },
          { duration: "5 dage", condition: "Kontrakt > 2 måneder" }
        ]
      },
      section3: {
        title: "9.3 Ansættelse (tidsubegrænset/lignende) — Juridisk begrænsning",
        intro: "For tidsubegrænset kontrakt er den maksimale varighed af prøvetiden særligt:",
        durations: [
          { duration: "2 måneder", condition: "Arbejdere / Medarbejdere", color: "green" },
          { duration: "3 måneder", condition: "Mellemledere / Teknikere", color: "blue" },
          { duration: "4 måneder", condition: "Ledere", color: "violet" }
        ],
        note: "I henhold til gældende regler og mulig lovreguleret forlængelse."
      }
    },

    article10: {
      title: "Artikel 10 - Forbud mod omgåelse — Varighed 24 måneder",
      intro: "Under kontraktforholdet og i 24 måneder efter sidste kontakt (bureau og/eller Profil) forbyder parterne enhver omgåelse:",
      actors: {
        eu: "Forbud for BV at indgå kontrakt direkte med bureau præsenteret af YOJOB (eller tilknyttet enhed), der omgår YOJOB, uden skriftlig aftale.",
        ett: "Forbud for bureauet at omgå YOJOB's kompensation for BV/mulighed stammende fra YOJOB, uden skriftlig aftale."
      },
      penalty: {
        title: "Kontraktbod",
        description: "I tilfælde af overtrædelse af denne klausul om forbud mod omgåelse forpligter den misligholdende part sig til at betale YOJOB en fast erstatning, hvis beløb er fastsat i kontrakten (eller procentvis ækvivalent af genererede/estimerede beløb), uden at det berører yderligere erstatning."
      }
    },

    article11: {
      title: "Artikel 11 - Ansvar og begrænsning",
      items: {
        obligation: {
          title: "Middelforpligtelse",
          description: "YOJOB forpligter sig til at anvende alle nødvendige midler til gennemførelsen af sine formidlingstjenester, uden resultatgaranti."
        },
        nonResponsibility: {
          title: "Intet ansvar bureau/Profiler",
          description: "YOJOB er ikke ansvarlig for bureauets, ansatte Profilers handlinger, undladelser eller manglende opfyldelse, ej heller for kredit-/forsikringsbeslutninger."
        },
        cap: {
          title: "Begrænsning",
          description: "Bortset fra grov uagtsomhed eller forsæt er YOJOB's ansvar begrænset til nettobeløbet modtaget vedrørende den pågældende kontrakt i de seneste 12 måneder."
        },
        indirect: {
          title: "Indirekte skader udelukket",
          description: "YOJOB kan ikke anses for ansvarlig for indirekte skader (aktivitetstab, tabt fortjeneste, kundetab osv.)."
        }
      }
    },

    article12: {
      title: "Artikel 12 - Fortrolighed",
      intro: "Parterne forpligter sig til at bevare fortroligheden af alle oplysninger udvekslet inden for rammerne af deres samarbejde.",
      items: [
        "Fortrolige oplysninger omfatter forretnings-, tekniske, finansielle og strategiske data",
        "Fortrolighedsforpligtelsen varer under kontraktforholdet og 5 år efter dets afslutning",
        "Oplysningerne må ikke videregives til tredjeparter uden forudgående skriftligt samtykke",
        "Parterne skal træffe alle nødvendige foranstaltninger til beskyttelse af oplysningernes fortrolighed"
      ]
    },

    article13: {
      title: "Artikel 13 - Personoplysninger (GDPR)",
      intro: "Udvekslingen af personoplysninger er strengt begrænset til data, der er nødvendige for gennemførelsen af tjenesterne (kontakter, behov, kandidatprofiler).",
      cards: {
        compliance: {
          title: "GDPR-overholdelse",
          description: "Behandlingen af personoplysninger udføres i overensstemmelse med GDPR og databeskyttelsesloven.",
          linkText: "Fortrolighedspolitik"
        },
        dpo: {
          title: "DPO-kontakt",
          description: "For alle forespørgsler vedrørende dine personoplysninger eller udøvelse af dine GDPR-rettigheder."
        }
      },
      dpaNote: "En DPA (Databehandleraftale) kan tilføjes efter behov, afhængigt af dataudvekslingens karakter."
    },

    article14: {
      title: "Artikel 14 - Varighed og opsigelse",
      items: {
        duration: {
          title: "Varighed",
          description: "Kontraktforholdets varighed er fastsat i kontrakten eller det accepterede trepartforslag."
        },
        earlyTermination: {
          title: "Forudgående opsigelse",
          description: "Opsigelsesvarsel 30 dage (eller varighed fastsat i kontrakten) + betaling af skyldige beløb (inklusive provisioner/succesbonusser, hvis genererende faktor er opnået)."
        },
        breach: {
          title: "Opsigelse for manglende opfyldelse",
          description: "I tilfælde af alvorlig manglende opfyldelse af forpligtelser: påmindelse + rettelsestid 15 dage. Ved manglende rettelse, opsigelse af loven."
        }
      }
    },

    article15: {
      title: "Artikel 15 - Force majeure",
      intro: "Parterne kan ikke anses for ansvarlige, hvis deres manglende opfyldelse eller forsinkelse af deres forpligtelser skyldes et tilfælde af force majeure i henhold til fransk retspraksis.",
      examplesTitle: "Tilfælde af force majeure omfatter særligt:",
      examples: [
        "Naturkatastrofer, oversvømmelser, brande",
        "Krige, angreb, uroligheder",
        "Generalstrejker, transportblokader",
        "Netværksafbrydelser (telekommunikation, elektricitet)",
        "Epidemier, pandemier",
        "Regeringens sundhedsforanstaltninger"
      ],
      suspension: "I tilfælde af force majeure suspenderes forpligtelserne i begivenhedens varighed efter meddelelse til den anden part."
    },

    article16: {
      title: "Artikel 16 - Gældende lov og tvister",
      sections: {
        law: {
          title: "Gældende lov",
          description: "Disse ASL er underlagt fransk lovgivning."
        },
        amicable: {
          title: "Forudgående forsøg på mindelig løsning",
          description: "I tilfælde af tvist forpligter parterne sig til at søge en mindelig løsning før enhver retssag. Kunden kan anvende konventionel mediation eller enhver anden alternativ tvistløsningsmetode."
        },
        jurisdiction: {
          title: "Kompetent domstol",
          description: "Ved mangel på mindelig løsning falder alle tvister ind under den eksklusive jurisdiktion af domstolene ved YOJOB's hjemsted, medmindre en tvingende modsatrettet regel anvendes."
        }
      }
    },

    article17: {
      title: "Artikel 17 - Ændring af ASL",
      intro: "YOJOB forbeholder sig retten til når som helst at ændre disse ASL.",
      items: [
        "ASL der anvendes er dem, der var gældende på datoen for forslags-/kontraktaccept",
        "Ændringerne har ikke tilbagevirkende kraft på igangværende kontrakter, medmindre der er udtrykkeligt skriftligt samtykke fra parterne",
        "Den seneste version af ASL kan konsulteres når som helst på YOJOB's websted"
      ]
    }
  },

  cta: {
    title: "Har du spørgsmål om vores ASL?",
    description: "Vores juridiske og forretningsteam står til din rådighed for eventuelle afklaringer vedrørende disse Almindelige salgs- og leveringsbetingelser.",
    backHome: "Tilbage til startsiden",
    contactUs: "Kontakt os"
  },

  footer: {
    copyright: "© {year} {company} — Enkeltmandsvirksomhed. Alle rettigheder forbeholdes.",
    links: {
      legal: "Juridisk information",
      privacy: "Fortrolighed",
      cgv: "ASL"
    }
  },

  badges: {
    main: "Hovedsagelig",
    optional: "Valgfri",
    mixed: "Blandet"
  },

  common: {
    back: "Tilbage",
    triggers: "Udløsere",
    conditions: "Betingelser",
    safeguards: "Garantier"
  }
};
