/**
 * 🇳🇴 NORSKE OVERSETTELSER - GENERELLE SALGS- OG LEVERINGSBETINGELSER (GSL)
 * 
 * @version 1.0.0
 */

export const cgvNO = {
  hero: {
    badge: "B2B-dokument - Kontraktsmessig",
    title: "Generelle salgs- og leveringsbetingelser",
    subtitle: "GSL gjeldende for Brukerselskaper (BS) og bemanningsbyråer partnere",
    effectiveDate: "Versjon gjeldende fra 19. desember 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Mellommann / Forretningsmegler"
    },
    eu: {
      title: "Brukerselskap (BS)",
      description: "Sluttkunde som mottar arbeidskraft"
    },
    ett: {
      title: "Bemanningsbyrå",
      description: "Rekrutteringspartner"
    }
  },

  sections: {
    article0: {
      title: "Artikkel 0 - Tjenesteleverandørens identitet",
      fields: {
        legalForm: "Juridisk form",
        legalFormValue: "Enkeltpersonforetak (EI)",
        manager: "Leder",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "Intra-EU MVA-nr.",
        vatValue: "FR79447862764",
        address: "Adresse",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakter",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Yrkesansvarsforsikring",
        description: "YOJOB har en yrkesansvarsforsikring som dekker de økonomiske konsekvensene av sitt ansvar i forbindelse med sine tjenester."
      }
    },

    article1: {
      title: "Artikkel 1 - Definisjoner",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Mellommann/forretningsmegler som sikrer anskaffelse, kvalifisering, koordinering og formalisering av forretningstilbud mellom BS og byråer."
        },
        eu: {
          term: "Brukerselskap (BS)",
          definition: "Sluttkundeselskap som mottar arbeidskraft levert av bemanningsbyrå partner."
        },
        ett: {
          term: "Bemanningsbyrå / Partnerbyrå",
          definition: "Bemanningsbyrå som utfører rekruttering, kontraktsinngåelse og organisering av personelleveranser."
        },
        profile: {
          term: "Profil",
          definition: "Kandidat eller vikar som byrået presenterer for BS via YOJOB."
        },
        mission: {
          term: "Oppdrag",
          definition: "Rekrutteringsbehov uttrykt av BS (yrke, omfang, tidsfrister, sted, spesielle krav)."
        },
        proposition: {
          term: "Trepartsforslag",
          definition: "Strukturert og bekreftet av BS og byrået forretnings- og administrativt forslag fra YOJOB (signatur eller skriftlig avtale)."
        },
        handover: {
          term: "Overlevering",
          definition: "Tidspunkt når byrået blir BS sin hovedkontakt etter dobbel validering BS + byrå."
        },
        insurer: {
          term: "Kredittforsikrer",
          definition: "Kredittforsikringsorganisasjon (COFACE, Allianz Trade osv.) som deltar i kunderisikoanalyse og tildeling av kredittgrenser."
        }
      }
    },

    article2: {
      title: "Artikkel 2 - Formål",
      intro: "Disse GSL regulerer YOJOB sine tjenester, som hovedsakelig består av:",
      steps: {
        step1: {
          title: "Anskaffelse og kvalifisering",
          description: "Identifisering og kvalifisering av Brukerselskaper med europeiske rekrutteringsbehov"
        },
        step2: {
          title: "Presentasjon av muligheter",
          description: "Overføring av kvalifiserte muligheter til passende bemanningsbyråer partnere"
        },
        step3: {
          title: "Strukturering av forslag",
          description: "Utarbeidelse av detaljert forretningsforslag (omfang, koordinering, administrative deler)"
        },
        step4: {
          title: "Organisering av overlevering",
          description: "Sikring av overgang til byrået etter signering for gjennomføring (rekruttering, levering, fakturering)"
        }
      },
      yojobRole: {
        title: "YOJOB sin rolle",
        description: "YOJOB fungerer kun som mellommann. Byrået er ansvarlig for rekruttering, levering, arbeidsgiverens overholdelse og fakturering til BS, med mindre annet uttrykkelig er fastsatt i kontrakten."
      }
    },

    article3: {
      title: "Artikkel 3 - Kontraktsdokumenter og hierarki",
      intro: "Ved motsetning mellom dokumenter anvendes følgende prioritetsrekkefølge:",
      hierarchy: {
        rank1: {
          title: "Spesiell kontrakt / Spesielle betingelser",
          subtitle: "Tilpasset partnerskap eller forretningsmessig bidrag"
        },
        rank2: {
          title: "Trepartsforslag / Forslag / Ordre",
          subtitle: "Dokument signert av partene"
        },
        rank3: {
          title: "Generelle salgs- og leveringsbetingelser (GSL)",
          subtitle: "Dette dokumentet"
        },
        rank4: {
          title: "Vedlegg",
          subtitle: "SLA, DPA, prosesser, sjekklister osv."
        }
      }
    },

    article4: {
      title: "Artikkel 4 - Kontraktsskjemaer",
      intro: "Det gjeldende skjemaet er angitt i forslaget eller kontrakten. YOJOB kan arbeide etter 3 modeller:",
      schemes: {
        schemaB: {
          label: "Skjema B",
          badge: "Hovedsakelig",
          title: "Byrå kunde hos YOJOB",
          description: "YOJOB kompenseres av byrået for forretningsmessig bidrag (månedlig provisjon og/eller suksessbonus)"
        },
        schemaA: {
          label: "Skjema A",
          badge: "Valgfri",
          title: "BS kunde hos YOJOB",
          description: "YOJOB fakturerer BS for tilleggstjenester (forsterket koordinering, utvidet dokumentasjonsstøtte)"
        },
        schemaC: {
          label: "Skjema C",
          badge: "Blandet",
          title: "Kombinert kompensasjon",
          description: "YOJOB kompenseres av byrået (Skjema B) OG fakturerer BS for tilleggstjenester (Skjema A)"
        }
      }
    },

    article5: {
      title: "Artikkel 5 - Prosess og overlevering",
      phase1: {
        title: "5.1 Introduksjonsfase (forretning og koordinering)",
        intro: "YOJOB sikrer:",
        items: [
          "Anskaffelse og kvalifisering av Brukerselskapet",
          "Innsamling av nødvendige deler til oppdraget",
          "Overføring av behovet til ett eller flere bemanningsbyråer partnere",
          "Koordinering til lukking av trepartsforslaget"
        ]
      },
      phase2: {
        title: "5.2 Aktivering av overlevering",
        intro: "\"Overleveringen\" skjer etter oppfyllelse av to kumulative betingelser:",
        conditions: [
          "BS sin signatur/skriftlig avtale til forslaget",
          "Byråets aksept/validering (kapasitet, betingelser, overholdelse, risiko)"
        ],
        consequences: "Fra dette tidspunktet blir byrået hovedkontakt: rekruttering, kontrakter, introduksjon, levering, lønn, utstasjoneringsforpliktelser, fakturering og innkreving fra BS."
      },
      phase3: {
        title: "5.3 Gjenværende støtte (hvis fastsatt)",
        description: "YOJOB kan forbli som støtte (koordinering/kvalitet) i det omfanget som er angitt i forslaget eller kontrakten."
      }
    },

    article6: {
      title: "Artikkel 6 - Økonomiske betingelser og betalingsmåte",
      section1: {
        title: "6.1 Prinsipp: \"selektive\" betingelser for hvert tilfelle",
        intro: "Under hensyntagen til bransjepraksis (kredittforsikring, kunderisiko, faktureringsorganisering) fastsettes betalingsbetingelsene for hvert tilfelle i det gjeldende forslaget/kontrakten.",
        modalitiesTitle: "Metodene kan omfatte:",
        modalities: [
          "Betaling ved mottak",
          "Forskuddsbetaling / forskudd",
          "Ukentlig fakturering",
          "Garantier (depositum, begrensning av kredittgrense)"
        ],
        legalLimit: "Når en betalingsbetingelse \"med forfall\" tildeles, overholdes de juridiske grensene: 60 dager fra fakturaens utstedelsesdato eller 45 dager ved månedens slutt, hvis angitt."
      },
      section2: {
        title: "6.2 Standardnettverk — BS \"risikoer\"",
        intro: "Risikoklassifiseringen bestemmes ut fra 3 kumulative kilder:",
        sources: {
          insurer: {
            title: "Kredittforsikrer",
            description: "Dekning/kredittgrense/betingelser"
          },
          score: {
            title: "Byråets interne vurdering",
            description: "Risiko- og innkrevingspolitikk"
          },
          history: {
            title: "Betalingshistorikk",
            description: "Adferd og innvirkning"
          }
        },
        primacy: "Prioritet: ved motsetning har kredittforsikrerens beslutning prioritet over andre signaler.",
        levelsTitle: "Risikonivåer og betalingsbetingelser",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Forsikrer: dekket / kredittgrense OK; Byråets vurdering: A/B; Historikk: god (0 hendelser)",
            conditions: "Månedlig + avtalt frist (f.eks. 30d) innenfor juridisk grense",
            safeguards: "Standard kredittgrense"
          },
          r1: {
            level: "R1",
            title: "Overvåket",
            trigger: "Forsikrer: begrenset kredittgrense; Byråets vurdering: B/C; Historikk: mindre forsinkelser",
            conditions: "Ved mottak ELLER forskudd 30-50% + rest ved mottak",
            safeguards: "Begrenset kredittgrense + ukentlig gjennomgang"
          },
          r2: {
            level: "R2",
            title: "Forsterket",
            trigger: "Forsikrer: utilstrekkelig delvis dekning; Byråets vurdering: C/D; Historikk: betydelige forsinkelser",
            conditions: "Ukentlig ved mottak ELLER forskudd 50-70% + ukentlig justering",
            safeguards: "Start i serier (begrenset volum)"
          },
          r3: {
            level: "R3",
            title: "Kritisk",
            trigger: "Forsikrer: AVVISNING / uforsikret; Byråets vurdering: D; Historikk: alvorlige hendelser",
            conditions: "100% forskuddsbetaling (eller avvisning av start)",
            safeguards: "Betinget start med betaling; stopp ved avvik"
          }
        },
        transparency: {
          title: "Gjennomsiktighet og aksept",
          description: "Trepartsforslaget angir nivået (R0/R1/R2/R3), faktureringsmetode og betalingsbetingelse. Forslagets signatur/aksept tilsvarer aksept av disse metodene."
        },
        adjustment: {
          title: "Dynamisk justeringsklausul",
          description: "Ved risikoutvikling (forsikrerens kredittgrensereduksjon, forsinkelser, hendelser) kan byrået gjennomgå betalingsbetingelsene for neste periode etter varsel til BS, under overholdelse av gjeldende kontrakt."
        }
      },
      section3: {
        title: "6.3 Betalingsforsinkelser",
        intro: "Ved forsinkelse av faktura utstedt av YOJOB (Skjema A eller fakturering byrå→YOJOB):",
        penalties: [
          "Forsinkelsesrenter betales uten påminnelse, i henhold til den satsen som er fastsatt i kontrakten eller den gjeldende juridiske rammen",
          "Fast erstatning for innkreving: 40 € per ubetalt faktura",
          "Mulig stopp av tjenester etter skriftlig varsel"
        ]
      }
    },

    article7: {
      title: "Artikkel 7 - Brukerselskapets (BS) forpliktelser",
      intro: "BS forplikter seg til:",
      obligations: [
        "Å levere presist og fullstendig behov og aktivt samarbeid (meninger, valideringer, planlegging)",
        "Å overføre sikkerhetskrav og tilgangsmetoder til steder",
        "Å respektere konfidensialiteten til opplysninger (byrå, profiler, forretningsbetingelser)",
        "Å anerkjenne at rekruttering, levering og fakturering av arbeidskraft er byråets ansvar (med mindre annet skriftlig er fastsatt)",
        "Å overholde betalingsbetingelsene angitt i trepartsforslaget"
      ]
    },

    article8: {
      title: "Artikkel 8 - Partnerbyråets forpliktelser og kompensasjon",
      section1: {
        title: "8.1 Månedlig provisjon (forretningsmessig bidrag)",
        intro: "Byrået skylder YOJOB en provisjon beregnet på nettobeløpet som byrået fakturerer BS for oppdrag som stammer fra YOJOB.",
        details: {
          rate: {
            label: "Provisjonsrate",
            value: "Variabel etter kontrakt (f.eks. 3-8%)"
          },
          base: {
            label: "Beregningsgrunnlag",
            value: "Nettobeløp fakturert BS (YOJOB-oppdrag)"
          },
          rhythm: {
            label: "Faktureringsrytme",
            value: "Månedlig"
          },
          deadline: {
            label: "Betalingsfrist",
            value: "Fra mottak av BS sin betaling, uten forsinkelse"
          }
        }
      },
      section2: {
        title: "8.2 Suksessbonus \"plassering\"",
        intro: "For visse oppdrag kan en suksessbonus legges til den månedlige provisjonen:",
        items: {
          trigger: {
            label: "Genererende faktor",
            value: "Avslutning av gjeldende prøvetid (se art. 9), uten avbrudd som kan tilskrives Profilen"
          },
          exigibility: {
            label: "Forfallstidspunkt",
            value: "Umiddelbar full betaling ved YOJOB-fakturaens utstedelse"
          },
          amount: {
            label: "Beløp",
            value: "Variabel etter kontrakt (f.eks. % av årlig bruttolønn eller fast beløp)"
          }
        }
      },
      section3: {
        title: "8.3 Rapportering",
        intro: "Byrået leverer til YOJOB med avtalt frekvens (f.eks. månedlig):",
        items: [
          "Liste over YOJOB-oppdrag (BS, plassering, datoer, volumer)",
          "Relatert nettobeløp per oppdrag",
          "Rimelige begrunnende elementer",
          "GDPR- og forretningshemmelighets-overholdelse"
        ]
      }
    },

    article9: {
      title: "Artikkel 9 - Lovpålagt prøvetid",
      section1: {
        title: "9.1 Prinsipp",
        description: "Den gjeldende prøvetiden er den som er fastsatt i kontraktsdokumentene (byrå↔BS og/eller byrå↔Profil) og de gjeldende reglene/kollektive avtaler. Den må ikke overstige maksimalt tillatte varigheter."
      },
      section2: {
        title: "9.2 Utstasjonering / Vikariat (oppdragskontrakt)",
        intro: "Oppdragskontrakten kan ha en kontraktsmessig prøvetid; ved dens fravær er den begrenset til:",
        durations: [
          { duration: "2 dager", condition: "Kontrakt ≤ 1 måned" },
          { duration: "3 dager", condition: "1 måned < kontrakt ≤ 2 måneder" },
          { duration: "5 dager", condition: "Kontrakt > 2 måneder" }
        ]
      },
      section3: {
        title: "9.3 Ansettelse (tidsubegrenset/tilsvarende) — Juridisk begrensning",
        intro: "For tidsubegrenset kontrakt er den maksimale varigheten av prøvetiden spesielt:",
        durations: [
          { duration: "2 måneder", condition: "Arbeidere / Ansatte", color: "green" },
          { duration: "3 måneder", condition: "Mellomledere / Teknikere", color: "blue" },
          { duration: "4 måneder", condition: "Ledere", color: "violet" }
        ],
        note: "I henhold til gjeldende regler og eventuell lovregulert forlengelse."
      }
    },

    article10: {
      title: "Artikkel 10 - Forbud mot omgåelse — Varighet 24 måneder",
      intro: "Under kontraktsforholdet og i 24 måneder etter siste kontakt (byrå og/eller Profil) forbyr partene enhver omgåelse:",
      actors: {
        eu: "Forbud for BS å inngå kontrakt direkte med byrå presentert av YOJOB (eller tilknyttet enhet), som omgår YOJOB, uten skriftlig avtale.",
        ett: "Forbud for byrået å omgå YOJOB sin kompensasjon for BS/mulighet som stammer fra YOJOB, uten skriftlig avtale."
      },
      penalty: {
        title: "Kontraktsbot",
        description: "Ved brudd på denne klausulen om forbud mot omgåelse forplikter den misligholdende parten seg til å betale YOJOB en fast erstatning, hvis beløp er fastsatt i kontrakten (eller prosentvis ekvivalent av genererte/estimerte beløp), uten at det berører ytterligere erstatning."
      }
    },

    article11: {
      title: "Artikkel 11 - Ansvar og begrensning",
      items: {
        obligation: {
          title: "Middelforpliktelse",
          description: "YOJOB forplikter seg til å anvende alle nødvendige midler til gjennomføringen av sine formidlingstjenester, uten resultatgaranti."
        },
        nonResponsibility: {
          title: "Intet ansvar byrå/Profiler",
          description: "YOJOB er ikke ansvarlig for byråets, ansatte Profilers handlinger, unnlatelser eller manglende oppfyllelse, heller ikke for kreditt-/forsikringsbeslutninger."
        },
        cap: {
          title: "Begrensning",
          description: "Bortsett fra grov uaktsomhet eller forsett er YOJOB sitt ansvar begrenset til nettobeløpet mottatt vedrørende den aktuelle kontrakten i de siste 12 månedene."
        },
        indirect: {
          title: "Indirekte skader utelukket",
          description: "YOJOB kan ikke anses ansvarlig for indirekte skader (aktivitetstap, tapt fortjeneste, kundetap osv.)."
        }
      }
    },

    article12: {
      title: "Artikkel 12 - Konfidensialitet",
      intro: "Partene forplikter seg til å bevare konfidensialiteten til alle opplysninger utvekslet innenfor rammen av deres samarbeid.",
      items: [
        "Konfidensielle opplysninger omfatter forretnings-, tekniske, finansielle og strategiske data",
        "Konfidensialitetsforpliktelsen varer under kontraktsforholdet og 5 år etter dets avslutning",
        "Opplysningene må ikke videreformidles til tredjeparter uten forutgående skriftlig samtykke",
        "Partene må ta alle nødvendige tiltak for å beskytte opplysningenes konfidensialitet"
      ]
    },

    article13: {
      title: "Artikkel 13 - Personopplysninger (GDPR)",
      intro: "Utvekslingen av personopplysninger er strengt begrenset til data som er nødvendige for gjennomføringen av tjenestene (kontakter, behov, kandidatprofiler).",
      cards: {
        compliance: {
          title: "GDPR-overholdelse",
          description: "Behandlingen av personopplysninger utføres i samsvar med GDPR og databeskyttelsesloven.",
          linkText: "Personvernerklæring"
        },
        dpo: {
          title: "DPO-kontakt",
          description: "For alle forespørsler vedrørende dine personopplysninger eller utøvelse av dine GDPR-rettigheter."
        }
      },
      dpaNote: "En DPA (Databehandleravtale) kan legges til etter behov, avhengig av datautvekslingens karakter."
    },

    article14: {
      title: "Artikkel 14 - Varighet og oppsigelse",
      items: {
        duration: {
          title: "Varighet",
          description: "Kontraktsforholdets varighet er fastsatt i kontrakten eller det aksepterte trepartsforslaget."
        },
        earlyTermination: {
          title: "Tidlig oppsigelse",
          description: "Oppsigelsesvarsel 30 dager (eller varighet fastsatt i kontrakten) + betaling av skyldige beløp (inkludert provisjoner/suksessbonuser, hvis genererende faktor er oppnådd)."
        },
        breach: {
          title: "Oppsigelse for manglende oppfyllelse",
          description: "Ved alvorlig manglende oppfyllelse av forpliktelser: påminnelse + rettetid 15 dager. Ved manglende retting, oppsigelse av loven."
        }
      }
    },

    article15: {
      title: "Artikkel 15 - Force majeure",
      intro: "Partene kan ikke anses ansvarlige hvis deres manglende oppfyllelse eller forsinkelse av deres forpliktelser skyldes et tilfelle av force majeure i henhold til fransk rettspraksis.",
      examplesTitle: "Tilfeller av force majeure omfatter spesielt:",
      examples: [
        "Naturkatastrofer, flom, branner",
        "Kriger, angrep, uroligheter",
        "Generalstreiker, transportblokader",
        "Nettverksavbrudd (telekommunikasjon, elektrisitet)",
        "Epidemier, pandemier",
        "Regjeringens helsetiltak"
      ],
      suspension: "Ved force majeure suspenderes forpliktelsene i hendelsens varighet etter varsel til den andre parten."
    },

    article16: {
      title: "Artikkel 16 - Gjeldende lov og tvister",
      sections: {
        law: {
          title: "Gjeldende lov",
          description: "Disse GSL er underlagt fransk lovgivning."
        },
        amicable: {
          title: "Forutgående forsøk på minnelig løsning",
          description: "Ved tvist forplikter partene seg til å søke en minnelig løsning før enhver rettslig prosess. Kunden kan anvende konvensjonell megling eller enhver annen alternativ tvisteløsningsmetode."
        },
        jurisdiction: {
          title: "Kompetent domstol",
          description: "Ved mangel på minnelig løsning faller alle tvister inn under den eksklusive jurisdiksjonen til domstolene ved YOJOB sitt hjemsted, med mindre en tvingende motsatt regel anvendes."
        }
      }
    },

    article17: {
      title: "Artikkel 17 - Endring av GSL",
      intro: "YOJOB forbeholder seg retten til når som helst å endre disse GSL.",
      items: [
        "GSL som anvendes er de som var gjeldende på datoen for forslags-/kontraktsaksept",
        "Endringene har ikke tilbakevirkende kraft på pågående kontrakter, med mindre det er uttrykkelig skriftlig samtykke fra partene",
        "Den nyeste versjonen av GSL kan konsulteres når som helst på YOJOB sitt nettsted"
      ]
    }
  },

  cta: {
    title: "Har du spørsmål om våre GSL?",
    description: "Vårt juridiske og forretningsteam står til din disposisjon for eventuelle avklaringer vedrørende disse Generelle salgs- og leveringsbetingelser.",
    backHome: "Tilbake til hjemmesiden",
    contactUs: "Kontakt oss"
  },

  footer: {
    copyright: "© {year} {company} — Enkeltpersonforetak. Alle rettigheter forbeholdes.",
    links: {
      legal: "Juridisk informasjon",
      privacy: "Personvern",
      cgv: "GSL"
    }
  },

  badges: {
    main: "Hovedsakelig",
    optional: "Valgfri",
    mixed: "Blandet"
  },

  common: {
    back: "Tilbake",
    triggers: "Utløsere",
    conditions: "Betingelser",
    safeguards: "Garantier"
  }
};
