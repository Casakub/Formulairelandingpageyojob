/**
 * 🇷🇴 TRADUCERI ROMÂNEȘTI - TERMENI ȘI CONDIȚII GENERALE (TCG)
 * 
 * @version 1.0.0
 */

export const cgvRO = {
  hero: {
    badge: "Document B2B - Contractual",
    title: "Termeni și Condiții Generale",
    subtitle: "TCG aplicabile pentru Întreprinderile Utilizatoare (IU) și agențiile partenere de muncă temporară",
    effectiveDate: "Versiune în vigoare din 19 decembrie 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Intermediar / Broker comercial"
    },
    eu: {
      title: "Întreprindere Utilizatoare (IU)",
      description: "Clientul final care primește forța de muncă"
    },
    ett: {
      title: "Agenție de muncă temporară",
      description: "Partener de recrutare"
    }
  },

  sections: {
    article0: {
      title: "Articolul 0 - Identitatea furnizorului de servicii",
      fields: {
        legalForm: "Formă juridică",
        legalFormValue: "Întreprinzător individual (EI)",
        manager: "Manager",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "TVA intracomunitar",
        vatValue: "FR79447862764",
        address: "Adresă",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Contact",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Asigurare de răspundere profesională",
        description: "YOJOB deține o asigurare de răspundere profesională care acoperă consecințele financiare ale răspunderii sale în legătură cu serviciile sale."
      }
    },

    article1: {
      title: "Articolul 1 - Definiții",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Intermediar/broker comercial care asigură achiziționarea, calificarea, coordonarea și formalizarea ofertelor comerciale între IU și agenții."
        },
        eu: {
          term: "Întreprindere Utilizatoare (IU)",
          definition: "Compania clientului final care primește forța de muncă furnizată de agenția parteneră de muncă temporară."
        },
        ett: {
          term: "Agenție de muncă temporară / Agenție parteneră",
          definition: "Agenție de muncă temporară care efectuează recrutarea, contractarea și organizarea furnizării de personal."
        },
        profile: {
          term: "Profil",
          definition: "Candidat sau lucrător temporar prezentat de agenție către IU prin intermediul YOJOB."
        },
        mission: {
          term: "Misiune",
          definition: "Necesitatea de recrutare exprimată de IU (meserie, anvergură, termene, locație, cerințe speciale)."
        },
        proposition: {
          term: "Ofertă tripartită",
          definition: "Ofertă comercială și administrativă structurată de YOJOB și aprobată de IU și agenție (semnătură sau acord scris)."
        },
        handover: {
          term: "Predare",
          definition: "Momentul în care agenția devine contactul principal al IU după validarea dublă IU + agenție."
        },
        insurer: {
          term: "Asigurător de credit",
          definition: "Organizație de asigurare de credit (COFACE, Allianz Trade etc.) care intervine în analiza riscurilor clientului și alocarea limitelor de credit."
        }
      }
    },

    article2: {
      title: "Articolul 2 - Obiect",
      intro: "Aceste TCG reglementează serviciile YOJOB, care constau în principal din:",
      steps: {
        step1: {
          title: "Achiziționare și calificare",
          description: "Identificarea și calificarea Întreprinderilor Utilizatoare cu nevoi de recrutare europene"
        },
        step2: {
          title: "Prezentarea oportunităților",
          description: "Transmiterea oportunităților calificate către agențiile partenere de muncă temporară corespunzătoare"
        },
        step3: {
          title: "Structurarea ofertei",
          description: "Elaborarea unei oferte comerciale detaliate (anvergură, coordonare, elemente administrative)"
        },
        step4: {
          title: "Organizarea predării",
          description: "Asigurarea tranziției către agenție după semnare în vederea realizării (recrutare, furnizare, facturare)"
        }
      },
      yojobRole: {
        title: "Rolul YOJOB",
        description: "YOJOB acționează exclusiv ca intermediar. Agenția este responsabilă pentru recrutare, furnizare, conformitate cu angajatorul și facturarea către IU, cu excepția cazului în care se prevede altfel în mod expres în contract."
      }
    },

    article3: {
      title: "Articolul 3 - Documente contractuale și ierarhie",
      intro: "În caz de contradicție între documente, se aplică următoarea ordine de prioritate:",
      hierarchy: {
        rank1: {
          title: "Contract special / Condiții speciale",
          subtitle: "Parteneriat personalizat sau contribuție comercială"
        },
        rank2: {
          title: "Ofertă tripartită / Ofertă / Comandă",
          subtitle: "Document semnat de părți"
        },
        rank3: {
          title: "Termeni și Condiții Generale (TCG)",
          subtitle: "Acest document"
        },
        rank4: {
          title: "Anexe",
          subtitle: "SLA, DPA, procese, liste de verificare etc."
        }
      }
    },

    article4: {
      title: "Articolul 4 - Scheme contractuale",
      intro: "Schema aplicată este specificată în ofertă sau contract. YOJOB poate opera conform a 3 modele:",
      schemes: {
        schemaB: {
          label: "Schema B",
          badge: "Principală",
          title: "Agenția client al YOJOB",
          description: "YOJOB este remunerat de agenție pentru contribuția comercială (comision lunar și/sau primă de succes)"
        },
        schemaA: {
          label: "Schema A",
          badge: "Opțională",
          title: "IU client al YOJOB",
          description: "YOJOB facturează IU servicii complementare (coordonare consolidată, asistență documentară extinsă)"
        },
        schemaC: {
          label: "Schema C",
          badge: "Mixtă",
          title: "Remunerare combinată",
          description: "YOJOB este remunerat de agenție (Schema B) ȘI facturează servicii complementare către IU (Schema A)"
        }
      }
    },

    article5: {
      title: "Articolul 5 - Proces și predare",
      phase1: {
        title: "5.1 Faza introductivă (comercială și coordonare)",
        intro: "YOJOB asigură:",
        items: [
          "Achiziționarea și calificarea Întreprinderii Utilizatoare",
          "Colectarea elementelor necesare pentru Misiune",
          "Transmiterea necesității către una sau mai multe agenții partenere de muncă temporară",
          "Coordonarea până la închiderea ofertei tripartite"
        ]
      },
      phase2: {
        title: "5.2 Activarea predării",
        intro: "\"Predarea\" are loc după îndeplinirea a două condiții cumulative:",
        conditions: [
          "Semnătura/acordul scris al IU pentru ofertă",
          "Acceptarea/validarea agenției (capacitate, condiții, conformitate, risc)"
        ],
        consequences: "Din acest moment, agenția devine contactul principal pentru: recrutare, contracte, integrare, furnizare, salarii, obligații de detașare, facturare și recuperare de la IU."
      },
      phase3: {
        title: "5.3 Suporturi reziduale (dacă este prevăzut)",
        description: "YOJOB poate rămâne ca suport (coordonare/calitate) în măsura stabilită în ofertă sau contract."
      }
    },

    article6: {
      title: "Articolul 6 - Condiții financiare și modalitate de plată",
      section1: {
        title: "6.1 Principiu: termene \"selective\" de la caz la caz",
        intro: "Având în vedere practicile din industrie (asigurare de credit, risc client, organizarea facturării), condițiile de plată sunt stabilite de la caz la caz în oferta/contractul valabil.",
        modalitiesTitle: "Modalitățile pot include:",
        modalities: [
          "Plată la primire",
          "Plată anticipată / avans",
          "Facturare săptămânală",
          "Garanții (depozit, limitare limită de credit)"
        ],
        legalLimit: "Când se atribuie un termen de plată \"la termen\", se respectă limitele legale: 60 de zile de la data emiterii facturii sau 45 de zile la sfârșitul lunii, dacă este specificat."
      },
      section2: {
        title: "6.2 Grilă standard — IU \"riscuri\"",
        intro: "Clasificarea riscurilor este stabilită din 3 surse cumulative:",
        sources: {
          insurer: {
            title: "Asigurător de credit",
            description: "Acoperire/limită de credit/condiții"
          },
          score: {
            title: "Evaluare internă a agenției",
            description: "Politica de risc și recuperare"
          },
          history: {
            title: "Istoric de plăți",
            description: "Comportament și expunere"
          }
        },
        primacy: "Prioritate: în caz de contradicție, decizia asigurătorului de credit are prioritate față de alte semnale.",
        levelsTitle: "Niveluri de risc și condiții de plată",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Asigurător: acoperit / limită de credit OK; Evaluare agenție: A/B; Istoric: bun (0 incidente)",
            conditions: "Lunar + termen negociat (ex. 30z) în cadrul limitei legale",
            safeguards: "Limită de credit standard"
          },
          r1: {
            level: "R1",
            title: "Monitorizat",
            trigger: "Asigurător: limită de credit limitată; Evaluare agenție: B/C; Istoric: întârzieri ușoare",
            conditions: "La primire SAU avans 30-50% + sold la primire",
            safeguards: "Limită de credit limitată + revizuire săptămânală"
          },
          r2: {
            level: "R2",
            title: "Consolidat",
            trigger: "Asigurător: acoperire parțială insuficientă; Evaluare agenție: C/D; Istoric: întârzieri semnificative",
            conditions: "Săptămânal la primire SAU avans 50-70% + ajustare săptămânală",
            safeguards: "Start pe loturi (volum limitat)"
          },
          r3: {
            level: "R3",
            title: "Critic",
            trigger: "Asigurător: REFUZ / neasigurabil; Evaluare agenție: D; Istoric: incidente grave",
            conditions: "Plată 100% anticipată (sau refuz de pornire)",
            safeguards: "Start condiționat de plată; oprire în caz de deviere"
          }
        },
        transparency: {
          title: "Transparență și acceptare",
          description: "Oferta tripartită specifică nivelul (R0/R1/R2/R3), modul de facturare și condiția de plată. Semnătura/acceptarea ofertei echivalează cu acceptarea acestor modalități."
        },
        adjustment: {
          title: "Clauză de ajustare dinamică",
          description: "În caz de evoluție a riscului (reducerea limitei de credit a asigurătorului, întârzieri, incidente), agenția poate revizui condițiile de plată pentru perioada următoare după notificarea IU, ținând cont de contractul valabil."
        }
      },
      section3: {
        title: "6.3 Întârzieri de plată",
        intro: "În caz de întârziere a unei facturi emise de YOJOB (Schema A sau facturare agenție→YOJOB):",
        penalties: [
          "Dobânzi de întârziere datorate fără memento, conform ratei stabilite în contract sau cadrului juridic aplicabil",
          "Compensație forfetară pentru recuperare: 40 € pe factură neplătită",
          "Posibilă suspendare a serviciilor după notificare scrisă"
        ]
      }
    },

    article7: {
      title: "Articolul 7 - Obligațiile Întreprinderii Utilizatoare (IU)",
      intro: "IU se angajează să:",
      obligations: [
        "Furnizeze o necesitate precisă și completă și o cooperare activă (avize, validări, planificare)",
        "Transmită cerințele de securitate și modalitatea de acces la locații",
        "Respecte confidențialitatea informațiilor (agenție, profiluri, condiții comerciale)",
        "Recunoască că recrutarea, furnizarea și facturarea forței de muncă sunt responsabilitatea agenției (cu excepția cazului în care se prevede altă schemă în scris)",
        "Respecte condițiile de plată specificate în oferta tripartită"
      ]
    },

    article8: {
      title: "Articolul 8 - Obligațiile și remunerarea agenției partenere",
      section1: {
        title: "8.1 Comision lunar (contribuție comercială)",
        intro: "Agenția datorează YOJOB un comision calculat din suma netă facturată de agenție către IU cu privire la misiunile provenind din YOJOB.",
        details: {
          rate: {
            label: "Rată comision",
            value: "Variabilă conform contractului (ex. 3-8%)"
          },
          base: {
            label: "Bază de calcul",
            value: "Suma netă facturată IU (misiuni YOJOB)"
          },
          rhythm: {
            label: "Ritm de facturare",
            value: "Lunar"
          },
          deadline: {
            label: "Termen de plată",
            value: "De la primirea plății IU, fără întârziere"
          }
        }
      },
      section2: {
        title: "8.2 Primă de succes \"plasare\"",
        intro: "Pentru anumite misiuni, o primă de succes poate fi adăugată la comisionul lunar:",
        items: {
          trigger: {
            label: "Fapt generator",
            value: "Sfârșitul perioadei de probă valabile (vezi art. 9), fără încetare atribuibilă Profilului"
          },
          exigibility: {
            label: "Exigibilitate",
            value: "Plată integrală imediată la emiterea facturii YOJOB"
          },
          amount: {
            label: "Sumă",
            value: "Variabilă conform contractului (ex. % din salariul brut anual sau sumă forfetară)"
          }
        }
      },
      section3: {
        title: "8.3 Raportare",
        intro: "Agenția furnizează YOJOB, cu frecvența agreată (ex. lunar):",
        items: [
          "Lista misiunilor YOJOB (IU, plasare, date, volume)",
          "Suma netă asociată pe misiune",
          "Elemente justificative rezonabile",
          "Respectarea GDPR și secretului comercial"
        ]
      }
    },

    article9: {
      title: "Articolul 9 - Perioadă de probă reglementară",
      section1: {
        title: "9.1 Principiu",
        description: "Perioada de probă aplicată este cea stabilită în documentele contractuale (agenție↔IU și/sau agenție↔Profil) și în reglementările/acordurile colective aplicabile. Nu poate depăși duratele maxime permise."
      },
      section2: {
        title: "9.2 Detașare / Muncă temporară (contract de misiune)",
        intro: "Contractul de misiune poate conține o perioadă de probă stabilită contractual; în absența acesteia, este limitat la:",
        durations: [
          { duration: "2 zile", condition: "Contract ≤ 1 lună" },
          { duration: "3 zile", condition: "1 lună < contract ≤ 2 luni" },
          { duration: "5 zile", condition: "Contract > 2 luni" }
        ]
      },
      section3: {
        title: "9.3 Recrutare (pe durată nedeterminată/similare) — Limită legală",
        intro: "Pentru un contract pe durată nedeterminată, durata maximă a perioadei de probă este în special:",
        durations: [
          { duration: "2 luni", condition: "Muncitori / Angajați", color: "green" },
          { duration: "3 luni", condition: "Management intermediar / Tehnicieni", color: "blue" },
          { duration: "4 luni", condition: "Cadre", color: "violet" }
        ],
        note: "Conform regulilor aplicabile și eventualei prelungiri reglementate de lege."
      }
    },

    article10: {
      title: "Articolul 10 - Non-ocolire — Durată de 24 de luni",
      intro: "Pe durata relației contractuale și timp de 24 de luni după ultimul contact (agenție și/sau Profil), părțile își interzic orice ocolire:",
      actors: {
        eu: "Interdicție pentru IU de a contracta direct cu agenția prezentată de YOJOB (sau entitate afiliată) prin ocolirea YOJOB, în absența unui acord scris.",
        ett: "Interdicție pentru agenție de a ocoli remunerarea YOJOB pe IU/oportunitate provenind din YOJOB, în absența unui acord scris."
      },
      penalty: {
        title: "Penalitate contractuală",
        description: "În caz de încălcare a acestei clauze de non-ocolire, partea în culpă se angajează să plătească YOJOB o compensație forfetară, a cărei sumă este stabilită în contract (sau echivalentul unui procent din sumele generate/estimate), fără a aduce atingere compensației suplimentare."
      }
    },

    article11: {
      title: "Articolul 11 - Responsabilitate și limitare",
      items: {
        obligation: {
          title: "Obligație de mijloace",
          description: "YOJOB se angajează să folosească toate mijloacele necesare pentru realizarea serviciilor sale de intermediere, fără garanție de rezultat."
        },
        nonResponsibility: {
          title: "Nicio responsabilitate agenție/Profiluri",
          description: "YOJOB nu este responsabil pentru actele, omisiunile sau neîndeplinirea agenției, Profilurilor recrutate, nici pentru deciziile de credit/asigurare."
        },
        cap: {
          title: "Limitare",
          description: "Cu excepția neglijenței grave sau intenției, responsabilitatea YOJOB este limitată la suma netă primită în legătură cu contractul în cauză în ultimele 12 luni."
        },
        indirect: {
          title: "Daune indirecte excluse",
          description: "YOJOB nu poate fi făcut responsabil pentru daunele indirecte (pierdere de activitate, profit ratat, pierdere de clienți etc.)."
        }
      }
    },

    article12: {
      title: "Articolul 12 - Confidențialitate",
      intro: "Părțile se angajează să mențină confidențialitatea tuturor informațiilor schimbate în cadrul cooperării lor.",
      items: [
        "Informațiile confidențiale includ date comerciale, tehnice, financiare și strategice",
        "Obligația de confidențialitate durează pe toată durata relației contractuale și 5 ani după încetarea acesteia",
        "Informațiile nu pot fi divulgate terților fără consimțământ scris prealabil",
        "Părțile trebuie să ia toate măsurile necesare pentru protejarea confidențialității informațiilor"
      ]
    },

    article13: {
      title: "Articolul 13 - Date cu caracter personal (GDPR)",
      intro: "Schimbul de date cu caracter personal este strict limitat la datele necesare pentru realizarea serviciilor (contacte, nevoi, profiluri de candidați).",
      cards: {
        compliance: {
          title: "Conformitate GDPR",
          description: "Prelucrarea datelor cu caracter personal se efectuează în conformitate cu GDPR și legea de protecție a datelor.",
          linkText: "Politica de confidențialitate"
        },
        dpo: {
          title: "Contact DPO",
          description: "Pentru orice solicitare privind datele dumneavoastră cu caracter personal sau exercitarea drepturilor GDPR."
        }
      },
      dpaNote: "DPA (Acord de Prelucrare a Datelor) poate fi anexat dacă este necesar, în funcție de natura schimbului de date."
    },

    article14: {
      title: "Articolul 14 - Durată și încetare",
      items: {
        duration: {
          title: "Durată",
          description: "Durata relației contractuale este stabilită în contract sau în oferta tripartită acceptată."
        },
        earlyTermination: {
          title: "Încetare anticipată",
          description: "Perioadă de preaviz de 30 de zile (sau durată convenită în contract) + plata sumelor datorate (inclusiv comisioane/prime de succes, dacă s-a realizat faptul generator)."
        },
        breach: {
          title: "Încetare pentru neîndeplinire",
          description: "În caz de neîndeplinire gravă a obligațiilor: memento + termen de remediere de 15 zile. În absența remedierii, încetare de drept."
        }
      }
    },

    article15: {
      title: "Articolul 15 - Forță majoră",
      intro: "Părțile nu pot fi făcute responsabile dacă neîndeplinirea sau întârzierea în executarea obligațiilor lor rezultă dintr-un caz de forță majoră în sensul jurisprudenței franceze.",
      examplesTitle: "Constituie în special cazuri de forță majoră:",
      examples: [
        "Catastrofe naturale, inundații, incendii",
        "Războaie, atacuri, revolte",
        "Greve generale, blocaje de transport",
        "Întreruperi de rețea (telecomunicații, electricitate)",
        "Epidemii, pandemii",
        "Măsuri sanitare guvernamentale"
      ],
      suspension: "În caz de forță majoră, obligațiile sunt suspendate pe durata evenimentului, după notificarea celeilalte părți."
    },

    article16: {
      title: "Articolul 16 - Legea aplicabilă și litigii",
      sections: {
        law: {
          title: "Legea aplicabilă",
          description: "Aceste TCG sunt supuse legii franceze."
        },
        amicable: {
          title: "Încercare prealabilă de rezolvare pe cale amiabilă",
          description: "În caz de litigiu, părțile se angajează să caute o soluție pe cale amiabilă înainte de orice procedură judiciară. Clientul poate recurge la medierea convențională sau la orice alt mod alternativ de rezolvare a litigiilor."
        },
        jurisdiction: {
          title: "Instanță competentă",
          description: "În absența unei soluții pe cale amiabilă, toate litigiile sunt de competența exclusivă a instanțelor sediului YOJOB, cu excepția cazului în care se aplică o regulă imperativă contrară."
        }
      }
    },

    article17: {
      title: "Articolul 17 - Modificarea TCG",
      intro: "YOJOB își rezervă dreptul de a modifica aceste TCG în orice moment.",
      items: [
        "TCG aplicabile sunt cele în vigoare la data acceptării ofertei/contractului",
        "Modificările nu au efect retroactiv asupra contractelor în curs, cu excepția cazului în care există consimțământ scris expres al părților",
        "Cea mai recentă versiune a TCG poate fi consultată în orice moment pe site-ul web YOJOB"
      ]
    }
  },

  cta: {
    title: "Aveți întrebări despre TCG-ul nostru?",
    description: "Echipa noastră juridică și comercială este la dispoziția dumneavoastră pentru orice explicații referitoare la aceste Termeni și Condiții Generale.",
    backHome: "Înapoi la pagina de start",
    contactUs: "Contactați-ne"
  },

  footer: {
    copyright: "© {year} {company} — Întreprinzător individual. Toate drepturile rezervate.",
    links: {
      legal: "Informații legale",
      privacy: "Confidențialitate",
      cgv: "TCG"
    }
  },

  badges: {
    main: "Principală",
    optional: "Opțională",
    mixed: "Mixtă"
  },

  common: {
    back: "Înapoi",
    triggers: "Declanșatori",
    conditions: "Condiții",
    safeguards: "Garanții"
  }
};
