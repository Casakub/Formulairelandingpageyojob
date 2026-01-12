/**
 * 🇩🇪 DEUTSCHE ÜBERSETZUNGEN - ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB)
 * 
 * @version 1.0.0
 */

export const cgvDE = {
  hero: {
    badge: "B2B-Dokument - Vertraglich",
    title: "Allgemeine Geschäftsbedingungen",
    subtitle: "AGB für Benutzerunternehmen (BU) und Partner-Zeitarbeitsagenturen (ZAA)",
    effectiveDate: "Gültige Version seit 19. Dezember 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Vermittler / Handelsmakler"
    },
    eu: {
      title: "Benutzerunternehmen (BU)",
      description: "Endkunde, der Arbeitskräfte erhält"
    },
    ett: {
      title: "ZAA-Agentur",
      description: "Partner für die Personalbeschaffung"
    }
  },

  sections: {
    article0: {
      title: "Artikel 0 - Identität des Dienstleisters",
      fields: {
        legalForm: "Rechtsform",
        legalFormValue: "Einzelunternehmen (EI)",
        manager: "Geschäftsführer",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "USt-IdNr.",
        vatValue: "FR79447862764",
        address: "Anschrift",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakt",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Berufshaftpflichtversicherung",
        description: "YOJOB verfügt über eine Berufshaftpflichtversicherung, die die finanziellen Folgen ihrer Haftung für ihre Dienstleistungen abdeckt."
      }
    },

    article1: {
      title: "Artikel 1 - Definitionen",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Vermittler/Handelsmakler, der die Akquise, Qualifizierung, Koordination und Formalisierung von Handelsangeboten zwischen BU und ZAA gewährleistet."
        },
        eu: {
          term: "Benutzerunternehmen (BU)",
          definition: "Endkundenunternehmen, das die von einer Partner-ZAA zur Verfügung gestellten Arbeitskräfte erhält."
        },
        ett: {
          term: "ZAA / Partneragentur",
          definition: "Zeitarbeitsagentur, die die Personalbeschaffung, Vertragsabwicklung und Organisation der Arbeitskräftebereitstellung durchführt."
        },
        profile: {
          term: "Profil",
          definition: "Kandidat oder Zeitarbeiter, der von einer ZAA über YOJOB-Vermittlung einem BU vorgestellt wird."
        },
        mission: {
          term: "Mission",
          definition: "Vom BU geäußerter Personalbeschaffungsbedarf (Beruf, Umfang, Termine, Standort, spezifische Anforderungen)."
        },
        proposition: {
          term: "Dreiseitiger Vorschlag",
          definition: "Von YOJOB strukturierter und vom BU und der ZAA validierter kaufmännischer und administrativer Vorschlag (Unterschrift oder schriftliche Vereinbarung)."
        },
        handover: {
          term: "Übergabe",
          definition: "Zeitpunkt, zu dem die ZAA nach doppelter Validierung BU + ZAA zum Hauptansprechpartner des BU wird."
        },
        insurer: {
          term: "Kreditversicherer",
          definition: "Kreditversicherungsorganisation (COFACE, Allianz Trade usw.), die an der Kundenrisikoanalyse und Kreditlinienvergabe beteiligt ist."
        }
      }
    },

    article2: {
      title: "Artikel 2 - Gegenstand",
      intro: "Diese AGB regeln die Leistungen von YOJOB, die hauptsächlich bestehen aus:",
      steps: {
        step1: {
          title: "Akquirieren und qualifizieren",
          description: "Identifizierung und Qualifizierung von Benutzerunternehmen mit europäischem Personalbeschaffungsbedarf"
        },
        step2: {
          title: "Chancen präsentieren",
          description: "Übermittlung qualifizierter Chancen an entsprechende Partner-ZAA"
        },
        step3: {
          title: "Vorschlag strukturieren",
          description: "Ausarbeitung eines detaillierten kaufmännischen Vorschlags (Umfang, Koordination, administrative Elemente)"
        },
        step4: {
          title: "Übergabe organisieren",
          description: "Sicherstellung des Übergangs zur ZAA nach Unterzeichnung für die Ausführung (Personalbeschaffung, Bereitstellung, Rechnungsstellung)"
        }
      },
      yojobRole: {
        title: "Rolle von YOJOB",
        description: "YOJOB handelt ausschließlich als Vermittler. Die ZAA ist verantwortlich für Personalbeschaffung, Bereitstellung, Arbeitgeber-Compliance und Rechnungsstellung an das BU, sofern nicht ausdrücklich anders im Vertrag festgelegt."
      }
    },

    article3: {
      title: "Artikel 3 - Vertragsdokumente und Hierarchie",
      intro: "Bei Widersprüchen zwischen den Dokumenten gilt folgende Prioritätsordnung:",
      hierarchy: {
        rank1: {
          title: "Sondervertrag / Besondere Bedingungen",
          subtitle: "Individualisierte Partnerschaft oder Geschäftsvermittlung"
        },
        rank2: {
          title: "Dreiseitiger Vorschlag / Angebot / Bestellung",
          subtitle: "Von den Parteien unterzeichnetes Dokument"
        },
        rank3: {
          title: "Allgemeine Geschäftsbedingungen (AGB)",
          subtitle: "Dieses Dokument"
        },
        rank4: {
          title: "Anhänge",
          subtitle: "SLA, DPA, Prozesse, Checklisten usw."
        }
      }
    },

    article4: {
      title: "Artikel 4 - Vertragsmodelle",
      intro: "Das anwendbare Modell wird im Vorschlag oder Vertrag angegeben. YOJOB kann nach 3 Modellen tätig werden:",
      schemes: {
        schemaB: {
          label: "Modell B",
          badge: "Haupt",
          title: "ZAA als Kunde von YOJOB",
          description: "YOJOB wird von der ZAA für die Geschäftsvermittlung vergütet (monatliche Provision und/oder Erfolgsprämie)"
        },
        schemaA: {
          label: "Modell A",
          badge: "Optional",
          title: "BU als Kunde von YOJOB",
          description: "YOJOB stellt dem BU zusätzliche Dienstleistungen in Rechnung (verstärkte Koordination, erweiterte Dokumentenhilfe)"
        },
        schemaC: {
          label: "Modell C",
          badge: "Gemischt",
          title: "Kombinierte Vergütung",
          description: "YOJOB wird von der ZAA vergütet (Modell B) UND stellt zusätzliche Dienstleistungen an das BU in Rechnung (Modell A)"
        }
      }
    },

    article5: {
      title: "Artikel 5 - Prozess und Übergabe",
      phase1: {
        title: "5.1 Vorbereitungsphase (kommerziell & Koordination)",
        intro: "YOJOB gewährleistet:",
        items: [
          "Akquise und Qualifizierung des Benutzerunternehmens",
          "Sammlung der für die Mission erforderlichen Elemente",
          "Übermittlung des Bedarfs an eine oder mehrere Partner-ZAA",
          "Koordination bis zur Fertigstellung des dreiseitigen Vorschlags"
        ]
      },
      phase2: {
        title: "5.2 Auslöser der Übergabe",
        intro: "Die \"Übergabe\" erfolgt bei Erfüllung von zwei kumulativen Bedingungen:",
        conditions: [
          "Unterzeichnung/schriftliche Vereinbarung des BU zum Vorschlag",
          "Annahme/Validierung der ZAA (Kapazität, Bedingungen, Compliance, Risiko)"
        ],
        consequences: "Ab diesem Zeitpunkt wird die ZAA zum Hauptansprechpartner für: Personalbeschaffung, Verträge, Onboarding, Bereitstellung, Lohn, Entsendepflichten, Rechnungsstellung und BU-Inkasso."
      },
      phase3: {
        title: "5.3 Verbleibende Unterstützung (falls vorgesehen)",
        description: "YOJOB kann im Rahmen des im Vorschlag oder Vertrag vereinbarten Umfangs als Support (Koordination/Qualität) verbleiben."
      }
    },

    article6: {
      title: "Artikel 6 - Finanzielle Bedingungen und Zahlungsmodalitäten",
      section1: {
        title: "6.1 Grundsatz: \"selektive\" Fristen im Einzelfall",
        intro: "Angesichts der Branchenpraktiken (Kreditversicherung, Kundenrisiko, Rechnungsorganisation) werden die Zahlungsbedingungen im Einzelfall im geltenden Vorschlag/Vertrag definiert.",
        modalitiesTitle: "Die Modalitäten können umfassen:",
        modalities: [
          "Zahlung bei Erhalt",
          "Vorauszahlung / Anzahlung",
          "Wöchentliche Rechnungsstellung",
          "Garantien (Kaution, Kreditlinienbegrenzung)"
        ],
        legalLimit: "Wenn eine \"befristete\" Zahlungsfrist gewährt wird, werden die gesetzlichen Obergrenzen eingehalten: 60 Tage ab Rechnungsdatum oder 45 Tage Monatsende, falls festgelegt."
      },
      section2: {
        title: "6.2 Standardraster — BU \"mit Risiko\"",
        intro: "Die Risikoklassifizierung wird aus 3 kumulativen Quellen bestimmt:",
        sources: {
          insurer: {
            title: "Kreditversicherer",
            description: "Deckung/Kreditlinie/Bedingungen"
          },
          score: {
            title: "Interner ZAA-Score",
            description: "Risiko- & Inkassopolitik"
          },
          history: {
            title: "Zahlungshistorie",
            description: "Verhalten & Exposition"
          }
        },
        primacy: "Vorrang: Bei Widerspruch hat die Kreditversicherer-Entscheidung Vorrang vor anderen Signalen.",
        levelsTitle: "Risikoebenen & Zahlungsbedingungen",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Versicherer: gedeckt / Kreditlinie OK; ZAA-Score: A/B; Historie: gut (0 Vorfälle)",
            conditions: "Monatlich + verhandelte Frist (z.B. 30T) innerhalb gesetzlicher Grenze",
            safeguards: "Standard-Kreditlinie"
          },
          r1: {
            level: "R1",
            title: "Überwacht",
            trigger: "Versicherer: begrenzte Kreditlinie; ZAA-Score: B/C; Historie: mäßige Verzögerungen",
            conditions: "Bei Erhalt ODER Anzahlung 30-50% + Restbetrag bei Erhalt",
            safeguards: "Begrenzte Kreditlinie + wöchentliche Überprüfung"
          },
          r2: {
            level: "R2",
            title: "Verstärkt",
            trigger: "Versicherer: unzureichende Teildeckung; ZAA-Score: C/D; Historie: erhebliche Verzögerungen",
            conditions: "Wöchentlich bei Erhalt ODER Anzahlung 50-70% + wöchentliche Anpassung",
            safeguards: "Start in Chargen (begrenztes Volumen)"
          },
          r3: {
            level: "R3",
            title: "Kritisch",
            trigger: "Versicherer: ABLEHNUNG / nicht versicherbar; ZAA-Score: D; Historie: schwere Vorfälle",
            conditions: "100% Vorauszahlung (oder Startverweigerung)",
            safeguards: "Start abhängig von Zahlung; Stopp bei Abweichung"
          }
        },
        transparency: {
          title: "Transparenz & Annahme",
          description: "Der dreiseitige Vorschlag gibt die Ebene (R0/R1/R2/R3), die Rechnungsart und die Zahlungsbedingung an. Die Unterzeichnung/Annahme des Vorschlags gilt als Annahme dieser Modalitäten."
        },
        adjustment: {
          title: "Dynamische Anpassungsklausel",
          description: "Bei Risikoentwicklung (Kreditlinienrückgang des Versicherers, Verzögerungen, Vorfälle) kann die ZAA die Zahlungsbedingungen für nachfolgende Zeiträume nach Benachrichtigung des BU gemäß dem geltenden Vertrag überarbeiten."
        }
      },
      section3: {
        title: "6.3 Zahlungsverzug",
        intro: "Bei Verzug einer von YOJOB ausgestellten Rechnung (Modell A oder ZAA→YOJOB-Rechnungsstellung):",
        penalties: [
          "Verzugszinsen ohne Mahnung fällig, gemäß dem im Vertrag vorgesehenen oder geltenden gesetzlichen Rahmen",
          "Pauschalinkassoentschädigung: 40 € pro unbezahlter Rechnung",
          "Mögliche Aussetzung der Leistungen nach schriftlicher Benachrichtigung"
        ]
      }
    },

    article7: {
      title: "Artikel 7 - Pflichten des Benutzerunternehmens (BU)",
      intro: "Das BU verpflichtet sich zu:",
      obligations: [
        "Bereitstellung eines genauen und vollständigen Bedarfs und aktive Zusammenarbeit (Rückmeldungen, Validierungen, Planung)",
        "Übermittlung von Sicherheitsanforderungen und Standortzugangsmodalitäten",
        "Wahrung der Vertraulichkeit von Informationen (ZAA, Profile, Geschäftsbedingungen)",
        "Anerkennung, dass Personalbeschaffung, Bereitstellung und Arbeitskräfte-Rechnungsstellung in der Verantwortung der ZAA liegen (sofern nicht schriftlich anders vereinbart)",
        "Einhaltung der im dreiseitigen Vorschlag definierten Zahlungsbedingungen"
      ]
    },

    article8: {
      title: "Artikel 8 - Pflichten und Vergütung der Partner-ZAA",
      section1: {
        title: "8.1 Monatliche Provision (Geschäftsvermittlung)",
        intro: "Die ZAA schuldet YOJOB eine Provision, die auf dem von der ZAA an das BU in Rechnung gestellten Umsatz ohne MwSt. für YOJOB-Missionen berechnet wird.",
        details: {
          rate: {
            label: "Provisionssatz",
            value: "Variabel je nach Vertrag (z.B. 3-8%)"
          },
          base: {
            label: "Berechnungsbasis",
            value: "BU-Umsatz ohne MwSt. (YOJOB-Missionen)"
          },
          rhythm: {
            label: "Rechnungsrhythmus",
            value: "Monatlich"
          },
          deadline: {
            label: "Zahlungsfrist",
            value: "Bei Erhalt der BU-Zahlung, ohne Verzögerung"
          }
        }
      },
      section2: {
        title: "8.2 \"Vermittlungs\"-Erfolgsprämie",
        intro: "Für bestimmte Missionen kann eine Erfolgsprämie zur monatlichen Provision hinzukommen:",
        items: {
          trigger: {
            label: "Auslösendes Ereignis",
            value: "Ende der geltenden Probezeit (siehe Art. 9), ohne dem Profil zuschreibbare Kündigung"
          },
          exigibility: {
            label: "Fälligkeit",
            value: "Sofortige vollständige Zahlung bei YOJOB-Rechnungsausstellung"
          },
          amount: {
            label: "Betrag",
            value: "Variabel je nach Vertrag (z.B. % des Bruttojahresgehalts oder Pauschalbetrag)"
          }
        }
      },
      section3: {
        title: "8.3 Berichterstattung",
        intro: "Die ZAA stellt YOJOB in vereinbarter Frequenz (z.B. monatlich) bereit:",
        items: [
          "Liste der YOJOB-Missionen (BU, Standort, Termine, Volumen)",
          "Zugehöriger Umsatz ohne MwSt. pro Mission",
          "Angemessene Belege",
          "DSGVO-Konformität und Geschäftsgeheimnis"
        ]
      }
    },

    article9: {
      title: "Artikel 9 - Gesetzliche Probezeit",
      section1: {
        title: "9.1 Grundsatz",
        description: "Die geltende Probezeit ist die in den Vertragsdokumenten (ZAA↔BU und/oder ZAA↔Profil) und den geltenden Vorschriften/Vereinbarungen vorgesehene. Sie darf die maximal zulässigen Dauern nicht überschreiten."
      },
      section2: {
        title: "9.2 Entsendung / Zeitarbeit (Einsatzvertrag)",
        intro: "Der Einsatzvertrag kann eine durch Vereinbarung festgelegte Probezeit enthalten; andernfalls ist sie begrenzt auf:",
        durations: [
          { duration: "2 Tage", condition: "Vertrag ≤ 1 Monat" },
          { duration: "3 Tage", condition: "1 Monat < Vertrag ≤ 2 Monate" },
          { duration: "5 Tage", condition: "Vertrag > 2 Monate" }
        ]
      },
      section3: {
        title: "9.3 Personalbeschaffung (unbefristeter Vertrag/ähnlich) — Gesetzliche Obergrenze",
        intro: "Für einen unbefristeten Vertrag beträgt die maximale Probezeit insbesondere:",
        durations: [
          { duration: "2 Monate", condition: "Arbeiter / Angestellte", color: "green" },
          { duration: "3 Monate", condition: "Vorarbeiter / Techniker", color: "blue" },
          { duration: "4 Monate", condition: "Führungskräfte", color: "violet" }
        ],
        note: "Gemäß geltenden Regelungen und möglicher gesetzlich geregelter Verlängerung."
      }
    },

    article10: {
      title: "Artikel 10 - Nichtumgehung — Dauer 24 Monate",
      intro: "Während der Vertragsbeziehung und für 24 Monate nach der letzten Kontaktvermittlung (ZAA und/oder Profil) verpflichten sich die Parteien, jegliche Umgehung zu unterlassen:",
      actors: {
        eu: "Verbot für das BU, direkt mit einer von YOJOB eingeführten ZAA (oder über verbundene Einheit) unter Umgehung von YOJOB zu kontraktieren, außer schriftlicher Vereinbarung.",
        ett: "Verbot für die ZAA, die YOJOB-Vergütung für ein von YOJOB stammendes BU/eine Chance zu umgehen, außer schriftlicher Vereinbarung."
      },
      penalty: {
        title: "Vertragsstrafe",
        description: "Bei Verstoß gegen diese Nichtumgehungsklausel verpflichtet sich die säumige Partei, YOJOB eine Pauschalentschädigung zu zahlen, deren Betrag im Vertrag festgelegt ist (oder gleichwertig mit einem Prozentsatz der generierten/geschätzten Summen), unbeschadet zusätzlicher Schadensersatzleistungen."
      }
    },

    article11: {
      title: "Artikel 11 - Haftung und Einschränkungen",
      items: {
        obligation: {
          title: "Bemühungspflicht",
          description: "YOJOB verpflichtet sich, alle erforderlichen Mittel zur Erbringung seiner Vermittlungsdienstleistungen einzusetzen, ohne Erfolgsgarantie."
        },
        nonResponsibility: {
          title: "Nichtverantwortlichkeit ZAA/Profile",
          description: "YOJOB ist nicht verantwortlich für Handlungen, Unterlassungen oder Versäumnisse der ZAA, der eingestellten Profile noch für Kredit-/Versicherungsentscheidungen."
        },
        cap: {
          title: "Haftungsbegrenzung",
          description: "Außer bei grober Fahrlässigkeit oder Vorsatz ist die Haftung von YOJOB begrenzt auf den im betreffenden Vertrag erhaltenen Nettobetrag der letzten 12 Monate."
        },
        indirect: {
          title: "Ausschluss indirekter Schäden",
          description: "YOJOB kann nicht für indirekte Schäden haftbar gemacht werden (Betriebsausfall, entgangener Gewinn, Kundenverlust usw.)."
        }
      }
    },

    article12: {
      title: "Artikel 12 - Vertraulichkeit",
      intro: "Die Parteien verpflichten sich, alle im Rahmen ihrer Zusammenarbeit ausgetauschten Informationen vertraulich zu behandeln.",
      items: [
        "Vertrauliche Informationen umfassen kommerzielle, technische, finanzielle und strategische Daten",
        "Die Vertraulichkeitspflicht besteht während der gesamten Dauer der Vertragsbeziehung und 5 Jahre nach deren Beendigung",
        "Informationen dürfen nicht ohne vorherige schriftliche Zustimmung an Dritte weitergegeben werden",
        "Die Parteien müssen alle erforderlichen Maßnahmen zum Schutz der Vertraulichkeit der Informationen ergreifen"
      ]
    },

    article13: {
      title: "Artikel 13 - Personenbezogene Daten (DSGVO)",
      intro: "Der Austausch personenbezogener Daten ist streng auf die für die Leistungserbringung erforderlichen Daten beschränkt (Kontakte, Bedarf, Kandidatenprofile).",
      cards: {
        compliance: {
          title: "DSGVO-Konformität",
          description: "Die Verarbeitung personenbezogener Daten erfolgt in Übereinstimmung mit der DSGVO und dem Datenschutzgesetz.",
          linkText: "Datenschutzerklärung"
        },
        dpo: {
          title: "DSB-Kontakt",
          description: "Für alle Anfragen zu Ihren personenbezogenen Daten oder zur Ausübung Ihrer DSGVO-Rechte."
        }
      },
      dpaNote: "Ein DPA (Datenverarbeitungsvereinbarung) kann je nach Art des Datenaustauschs bei Bedarf beigefügt werden."
    },

    article14: {
      title: "Artikel 14 - Dauer und Kündigung",
      items: {
        duration: {
          title: "Dauer",
          description: "Die Dauer der Vertragsbeziehung ist die im Vertrag oder angenommenen dreiseitigen Vorschlag definierte."
        },
        earlyTermination: {
          title: "Vorzeitige Kündigung",
          description: "Kündigungsfrist von 30 Tagen (oder im Vertrag vereinbarte Dauer) + Zahlung fälliger Beträge (einschließlich Provisionen/Erfolgsprämien bei erreichtem auslösendem Ereignis)."
        },
        breach: {
          title: "Kündigung bei Verstoß",
          description: "Bei schwerem Verstoß gegen Pflichten: Mahnung + Heilungsfrist von 15 Tagen. Bei fehlender Regularisierung Kündigung von Rechts wegen."
        }
      }
    },

    article15: {
      title: "Artikel 15 - Höhere Gewalt",
      intro: "Die Parteien können nicht haftbar gemacht werden, wenn die Nichterfüllung oder Verzögerung bei der Erfüllung ihrer Verpflichtungen auf einen Fall höherer Gewalt im Sinne der französischen Rechtsprechung zurückzuführen ist.",
      examplesTitle: "Fälle höherer Gewalt sind insbesondere:",
      examples: [
        "Naturkatastrophen, Überschwemmungen, Brände",
        "Kriege, Anschläge, Unruhen",
        "Generalstreiks, Verkehrsblockaden",
        "Netzausfälle (Telekom, Strom)",
        "Epidemien, Pandemien",
        "Staatliche Gesundheitsmaßnahmen"
      ],
      suspension: "Im Falle höherer Gewalt werden die Verpflichtungen für die Dauer des Ereignisses nach Benachrichtigung der anderen Partei ausgesetzt."
    },

    article16: {
      title: "Artikel 16 - Anwendbares Recht und Streitigkeiten",
      sections: {
        law: {
          title: "Anwendbares Recht",
          description: "Diese AGB unterliegen französischem Recht."
        },
        amicable: {
          title: "Versuch einer gütlichen Einigung im Vorfeld",
          description: "Im Streitfall verpflichten sich die Parteien, vor jeder gerichtlichen Klage eine gütliche Lösung zu suchen. Der Kunde kann auf eine konventionelle Mediation oder jede andere alternative Streitbeilegungsmethode zurückgreifen."
        },
        jurisdiction: {
          title: "Zuständiges Gericht",
          description: "Bei fehlender gütlicher Einigung unterliegen alle Streitigkeiten der ausschließlichen Zuständigkeit der Gerichte des Sitzes von YOJOB, sofern keine zwingende gegenteilige Regel besteht."
        }
      }
    },

    article17: {
      title: "Artikel 17 - Änderung der AGB",
      intro: "YOJOB behält sich das Recht vor, diese AGB jederzeit zu ändern.",
      items: [
        "Die geltenden AGB sind diejenigen, die zum Zeitpunkt der Annahme des Vorschlags/Vertrags in Kraft sind",
        "Änderungen haben keine rückwirkende Wirkung auf laufende Verträge, außer ausdrücklicher schriftlicher Vereinbarung der Parteien",
        "Die neueste Version der AGB kann jederzeit auf der YOJOB-Website eingesehen werden"
      ]
    }
  },

  cta: {
    title: "Fragen zu unseren AGB?",
    description: "Unser Rechts- und Vertriebsteam steht Ihnen für jede Klärung zu diesen Allgemeinen Geschäftsbedingungen zur Verfügung.",
    backHome: "Zurück zur Startseite",
    contactUs: "Kontaktieren Sie uns"
  },

  footer: {
    copyright: "© {year} {company} — Einzelunternehmen. Alle Rechte vorbehalten.",
    links: {
      legal: "Impressum",
      privacy: "Datenschutz",
      cgv: "AGB"
    }
  },

  badges: {
    main: "Haupt",
    optional: "Optional",
    mixed: "Gemischt"
  },

  common: {
    back: "Zurück",
    triggers: "Auslöser",
    conditions: "Bedingungen",
    safeguards: "Sicherungen"
  }
};
