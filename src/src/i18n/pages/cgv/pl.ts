/**
 * 🇵🇱 POLSKIE TŁUMACZENIA - OGÓLNE WARUNKI SPRZEDAŻY (OWS)
 * 
 * @version 1.0.0
 */

export const cgvPL = {
  hero: {
    badge: "Dokument B2B - Umowny",
    title: "Ogólne Warunki Sprzedaży",
    subtitle: "OWS mające zastosowanie do Firm Użytkowników (FU) i agencji pracy tymczasowej partnerskich",
    effectiveDate: "Wersja obowiązująca od 19 grudnia 2025"
  },

  actors: {
    yojob: {
      title: "YOJOB",
      description: "Pośrednik / Broker handlowy"
    },
    eu: {
      title: "Firma Użytkownik (FU)",
      description: "Klient końcowy otrzymujący siłę roboczą"
    },
    ett: {
      title: "Agencja Pracy Tymczasowej",
      description: "Partner rekrutacyjny"
    }
  },

  sections: {
    article0: {
      title: "Artykuł 0 - Tożsamość usługodawcy",
      fields: {
        legalForm: "Forma prawna",
        legalFormValue: "Jednoosobowa działalność gospodarcza (EI)",
        manager: "Kierownik",
        managerValue: "Alexandre AUGER",
        siret: "SIRET",
        siretValue: "44786276400035",
        vat: "NIP wewnątrzwspólnotowy",
        vatValue: "FR79447862764",
        address: "Adres",
        addressValue: "108 AVENUE MONTESQUIEU, 33160 SAINT-MEDARD-EN-JALLES",
        contact: "Kontakt",
        contactValue: "contact@yojob.fr"
      },
      insurance: {
        title: "Ubezpieczenie OC Zawodowe",
        description: "YOJOB posiada ubezpieczenie odpowiedzialności cywilnej zawodowej pokrywające skutki finansowe jej odpowiedzialności w związku z jej świadczeniami."
      }
    },

    article1: {
      title: "Artykuł 1 - Definicje",
      terms: {
        yojob: {
          term: "YOJOB",
          definition: "Pośrednik/broker handlowy zapewniający pozyskiwanie, kwalifikację, koordynację i formalizację propozycji handlowych między FU a agencjami."
        },
        eu: {
          term: "Firma Użytkownik (FU)",
          definition: "Firma klienta końcowego otrzymująca siłę roboczą udostępnioną przez partnerską agencję pracy tymczasowej."
        },
        ett: {
          term: "Agencja Pracy Tymczasowej / Agencja partnerska",
          definition: "Agencja pracy tymczasowej przeprowadzająca rekrutację, zawieranie umów i organizację udostępniania personelu."
        },
        profile: {
          term: "Profil",
          definition: "Kandydat lub pracownik tymczasowy przedstawiony przez agencję FU za pośrednictwem YOJOB."
        },
        mission: {
          term: "Misja",
          definition: "Potrzeba rekrutacyjna wyrażona przez FU (zawód, zakres, terminy, lokalizacja, wymagania szczególne)."
        },
        proposition: {
          term: "Propozycja trójstronna",
          definition: "Propozycja handlowa i administracyjna ustrukturyzowana przez YOJOB i zatwierdzona przez FU i agencję (podpis lub umowa pisemna)."
        },
        handover: {
          term: "Przekazanie",
          definition: "Moment, w którym agencja staje się głównym rozmówcą FU po podwójnej walidacji FU + agencja."
        },
        insurer: {
          term: "Ubezpieczyciel kredytowy",
          definition: "Organizacja ubezpieczenia kredytu (COFACE, Allianz Trade itp.) interweniująca w analizie ryzyka klienta i przyznawaniu linii kredytowych."
        }
      }
    },

    article2: {
      title: "Artykuł 2 - Przedmiot",
      intro: "Niniejsze OWS regulują świadczenia YOJOB, które składają się głównie z:",
      steps: {
        step1: {
          title: "Pozyskiwać i kwalifikować",
          description: "Identyfikować i kwalifikować Firmy Użytkowników z europejskimi potrzebami rekrutacyjnymi"
        },
        step2: {
          title: "Prezentować możliwości",
          description: "Przekazywać wykwalifikowane możliwości odpowiednim partnerskim agencjom pracy tymczasowej"
        },
        step3: {
          title: "Strukturyzować propozycję",
          description: "Opracowywać szczegółową propozycję handlową (zakres, koordynacja, elementy administracyjne)"
        },
        step4: {
          title: "Organizować przekazanie",
          description: "Zapewniać przejście do agencji po podpisaniu w celu realizacji (rekrutacja, udostępnienie, fakturowanie)"
        }
      },
      yojobRole: {
        title: "Rola YOJOB",
        description: "YOJOB działa wyłącznie jako pośrednik. Agencja odpowiada za rekrutację, udostępnienie, zgodność pracodawcy i fakturowanie do FU, chyba że w umowie wyraźnie określono inaczej."
      }
    },

    article3: {
      title: "Artykuł 3 - Dokumenty umowne i hierarchia",
      intro: "W przypadku sprzeczności między dokumentami obowiązuje następująca kolejność pierwszeństwa:",
      hierarchy: {
        rank1: {
          title: "Umowa szczególna / Warunki szczególne",
          subtitle: "Spersonalizowane partnerstwo lub wniesienie biznesowe"
        },
        rank2: {
          title: "Propozycja trójstronna / Kosztorys / Zamówienie",
          subtitle: "Dokument podpisany przez strony"
        },
        rank3: {
          title: "Ogólne Warunki Sprzedaży (OWS)",
          subtitle: "Niniejszy dokument"
        },
        rank4: {
          title: "Załączniki",
          subtitle: "SLA, DPA, procesy, listy kontrolne itp."
        }
      }
    },

    article4: {
      title: "Artykuł 4 - Schematy umowne",
      intro: "Stosowany schemat jest określony w propozycji lub umowie. YOJOB może działać według 3 modeli:",
      schemes: {
        schemaB: {
          label: "Schemat B",
          badge: "Główny",
          title: "Agencja klientem YOJOB",
          description: "YOJOB jest wynagradzany przez agencję z tytułu wniesienia biznesowego (prowizja miesięczna i/lub premia za sukces)"
        },
        schemaA: {
          label: "Schemat A",
          badge: "Opcjonalny",
          title: "FU klientem YOJOB",
          description: "YOJOB fakturuje FU dodatkowe usługi (wzmocniona koordynacja, rozszerzona pomoc dokumentacyjna)"
        },
        schemaC: {
          label: "Schemat C",
          badge: "Mieszany",
          title: "Wynagrodzenie połączone",
          description: "YOJOB jest wynagradzany przez agencję (Schemat B) I fakturuje dodatkowe usługi do FU (Schemat A)"
        }
      }
    },

    article5: {
      title: "Artykuł 5 - Proces i przekazanie",
      phase1: {
        title: "5.1 Faza wstępna (handlowa i koordynacja)",
        intro: "YOJOB zapewnia:",
        items: [
          "Pozyskiwanie i kwalifikację Firmy Użytkownika",
          "Zbieranie elementów niezbędnych dla Misji",
          "Przekazanie potrzeby jednej lub kilku partnerskim agencjom pracy tymczasowej",
          "Koordynację do zakończenia propozycji trójstronnej"
        ]
      },
      phase2: {
        title: "5.2 Wyzwalacz przekazania",
        intro: "\"Przekazanie\" następuje po spełnieniu dwóch warunków łącznych:",
        conditions: [
          "Podpis/umowa pisemna FU na propozycję",
          "Akceptacja/walidacja agencji (zdolność, warunki, zgodność, ryzyko)"
        ],
        consequences: "Od tego momentu agencja staje się głównym rozmówcą dla: rekrutacji, umów, onboardingu, udostępnienia, wynagrodzeń, obowiązków delegowania, fakturowania i windykacji FU."
      },
      phase3: {
        title: "5.3 Wsparcie rezydualne (jeśli przewidziane)",
        description: "YOJOB może pozostać jako wsparcie (koordynacja/jakość) w zakresie uzgodnionym w propozycji lub umowie."
      }
    },

    article6: {
      title: "Artykuł 6 - Warunki finansowe i modalności płatności",
      section1: {
        title: "6.1 Zasada: terminy \"selektywne\" przypadek po przypadku",
        intro: "Biorąc pod uwagę praktyki sektorowe (ubezpieczenie kredytu, ryzyko klienta, organizacja fakturowania), warunki płatności są określane przypadek po przypadku w obowiązującej propozycji/umowie.",
        modalitiesTitle: "Modalności mogą obejmować:",
        modalities: [
          "Płatność przy odbiorze",
          "Płatność z góry / zaliczka",
          "Fakturowanie tygodniowe",
          "Gwarancje (depozyt, ograniczenie linii kredytowej)"
        ],
        legalLimit: "Gdy przyznawany jest termin płatności \"terminowy\", przestrzegane są limity prawne: 60 dni od daty wystawienia faktury lub 45 dni koniec miesiąca, jeśli określono."
      },
      section2: {
        title: "6.2 Siatka standardowa — FU \"ryzyka\"",
        intro: "Klasyfikacja ryzyka jest określana z 3 źródeł łącznych:",
        sources: {
          insurer: {
            title: "Ubezpieczyciel kredytowy",
            description: "Pokrycie/linia kredytowa/warunki"
          },
          score: {
            title: "Wewnętrzna ocena agencji",
            description: "Polityka ryzyka i windykacji"
          },
          history: {
            title: "Historia płatności",
            description: "Zachowanie i ekspozycja"
          }
        },
        primacy: "Pierwszeństwo: w przypadku sprzeczności decyzja ubezpieczyciela kredytowego ma pierwszeństwo przed innymi sygnałami.",
        levelsTitle: "Poziomy ryzyka i warunki płatności",
        levels: {
          r0: {
            level: "R0",
            title: "Standard",
            trigger: "Ubezpieczyciel: objęty / linia kredytowa OK; Ocena agencji: A/B; Historia: dobra (0 incydentów)",
            conditions: "Miesięcznie + negocjowany termin (np. 30d) w ramach limitu prawnego",
            safeguards: "Standardowa linia kredytowa"
          },
          r1: {
            level: "R1",
            title: "Monitorowany",
            trigger: "Ubezpieczyciel: ograniczona linia kredytowa; Ocena agencji: B/C; Historia: umiarkowane opóźnienia",
            conditions: "Przy odbiorze LUB zaliczka 30-50% + saldo przy odbiorze",
            safeguards: "Ograniczona linia kredytowa + przegląd tygodniowy"
          },
          r2: {
            level: "R2",
            title: "Wzmocniony",
            trigger: "Ubezpieczyciel: niewystarczające pokrycie częściowe; Ocena agencji: C/D; Historia: znaczące opóźnienia",
            conditions: "Tygodniowo przy odbiorze LUB zaliczka 50-70% + korekta tygodniowa",
            safeguards: "Start partiami (ograniczona objętość)"
          },
          r3: {
            level: "R3",
            title: "Krytyczny",
            trigger: "Ubezpieczyciel: ODMOWA / nie do ubezpieczenia; Ocena agencji: D; Historia: poważne incydenty",
            conditions: "Płatność 100% z góry (lub odmowa startu)",
            safeguards: "Start warunkowy od płatności; zatrzymanie w przypadku odchylenia"
          }
        },
        transparency: {
          title: "Przejrzystość i akceptacja",
          description: "Propozycja trójstronna określa poziom (R0/R1/R2/R3), tryb fakturowania i warunek płatności. Podpis/akceptacja propozycji równa się akceptacji tych modalności."
        },
        adjustment: {
          title: "Klauzula dynamicznej korekty",
          description: "W przypadku ewolucji ryzyka (obniżenie linii kredytowej ubezpieczyciela, opóźnienia, incydenty), agencja może zrewidować warunki płatności dla kolejnych okresów po powiadomieniu FU, z poszanowaniem obowiązującej umowy."
        }
      },
      section3: {
        title: "6.3 Opóźnienia w płatnościach",
        intro: "W przypadku opóźnienia w fakturze wystawionej przez YOJOB (Schemat A lub fakturowanie agencja→YOJOB):",
        penalties: [
          "Odsetki za opóźnienie należne bez wezwania, według stawki przewidzianej w umowie lub mającej zastosowanie ramy prawne",
          "Ryczałtowe odszkodowanie windykacyjne: 40 € za nieopłaconą fakturę",
          "Możliwe zawieszenie świadczeń po pisemnym powiadomieniu"
        ]
      }
    },

    article7: {
      title: "Artykuł 7 - Obowiązki Firmy Użytkownika (FU)",
      intro: "FU zobowiązuje się do:",
      obligations: [
        "Dostarczenia dokładnej i kompletnej potrzeby oraz aktywnej współpracy (opinie, walidacje, planowanie)",
        "Przekazania wymagań bezpieczeństwa i modalności dostępu do lokalizacji",
        "Poszanowania poufności informacji (agencja, profile, warunki handlowe)",
        "Uznania, że rekrutacja, udostępnienie i fakturowanie siły roboczej są w odpowiedzialności agencji (chyba że inny schemat pisemnie)",
        "Poszanowania warunków płatności określonych w propozycji trójstronnej"
      ]
    },

    article8: {
      title: "Artykuł 8 - Obowiązki i wynagrodzenie agencji partnerskiej",
      section1: {
        title: "8.1 Prowizja miesięczna (wniesienie biznesowe)",
        intro: "Agencja jest winna YOJOB prowizję obliczoną od kwoty netto zafakturowanej przez agencję do FU w odniesieniu do misji pochodzących z YOJOB.",
        details: {
          rate: {
            label: "Stawka prowizji",
            value: "Zmienna według umowy (np. 3-8%)"
          },
          base: {
            label: "Podstawa obliczeń",
            value: "Kwota netto zafakturowana FU (misje YOJOB)"
          },
          rhythm: {
            label: "Rytm fakturowania",
            value: "Miesięczny"
          },
          deadline: {
            label: "Termin płatności",
            value: "Od otrzymania płatności FU, bez opóźnienia"
          }
        }
      },
      section2: {
        title: "8.2 Premia za sukces \"umieszczenie\"",
        intro: "Dla niektórych misji premia za sukces może być dodana do prowizji miesięcznej:",
        items: {
          trigger: {
            label: "Fakt generujący",
            value: "Koniec obowiązującego okresu próbnego (patrz art. 9), bez rozwiązania przypisywalnego Profilowi"
          },
          exigibility: {
            label: "Egzekwowalność",
            value: "Natychmiastowa pełna płatność przy wystawieniu faktury YOJOB"
          },
          amount: {
            label: "Kwota",
            value: "Zmienna według umowy (np. % wynagrodzenia rocznego brutto lub kwota ryczałtowa)"
          }
        }
      },
      section3: {
        title: "8.3 Raportowanie",
        intro: "Agencja dostarcza YOJOB, z uzgodnioną częstotliwością (np. miesięczną):",
        items: [
          "Listę misji YOJOB (FU, lokalizacja, daty, objętości)",
          "Powiązaną kwotę netto na misję",
          "Rozsądne elementy uzasadniające",
          "Poszanowanie RODO i tajemnicy handlowej"
        ]
      }
    },

    article9: {
      title: "Artykuł 9 - Okres próbny regulaminowy",
      section1: {
        title: "9.1 Zasada",
        description: "Okres próbny mający zastosowanie to ten przewidziany w dokumentach umownych (agencja↔FU i/lub agencja↔Profil) oraz w obowiązujących przepisach/układach. Nie może przekraczać maksymalnych dozwolonych czasów trwania."
      },
      section2: {
        title: "9.2 Delegowanie / Praca tymczasowa (umowa o misję)",
        intro: "Umowa o misję może zawierać okres próbny ustalony umową; w przypadku braku jest ograniczony do:",
        durations: [
          { duration: "2 dni", condition: "Umowa ≤ 1 miesiąc" },
          { duration: "3 dni", condition: "1 miesiąc < umowa ≤ 2 miesiące" },
          { duration: "5 dni", condition: "Umowa > 2 miesiące" }
        ]
      },
      section3: {
        title: "9.3 Rekrutacja (czas nieokreślony/podobny) — Limit prawny",
        intro: "Dla umowy na czas nieokreślony maksymalny czas trwania okresu próbnego wynosi w szczególności:",
        durations: [
          { duration: "2 miesiące", condition: "Robotnicy / Pracownicy", color: "green" },
          { duration: "3 miesiące", condition: "Kadra średnia / Technicy", color: "blue" },
          { duration: "4 miesiące", condition: "Kadra kierownicza", color: "violet" }
        ],
        note: "Zgodnie z obowiązującymi zasadami i ewentualnym przedłużeniem uregulowanym prawem."
      }
    },

    article10: {
      title: "Artykuł 10 - Nieobchodzenie — Czas trwania 24 miesiące",
      intro: "W trakcie relacji umownej i przez 24 miesiące po ostatnim nawiązaniu kontaktu (agencja i/lub Profil), strony zabraniają sobie wszelkiego obchodzenia:",
      actors: {
        eu: "Zakaz dla FU bezpośredniego zawierania umów z agencją wprowadzoną przez YOJOB (lub przez podmiot powiązany) obchodząc YOJOB, chyba że umowa pisemna.",
        ett: "Zakaz dla agencji obchodzenia wynagrodzenia YOJOB na FU/możliwość pochodzącą z YOJOB, chyba że umowa pisemna."
      },
      penalty: {
        title: "Kara umowna",
        description: "W przypadku naruszenia tej klauzuli nieobchodzenia, strona będąca w zwłoce zobowiązuje się zapłacić YOJOB odszkodowanie ryczałtowe, którego kwota jest określona w umowie (lub równoważne procentowi wygenerowanych/szacowanych sum), bez uszczerbku dla dodatkowego odszkodowania."
      }
    },

    article11: {
      title: "Artykuł 11 - Odpowiedzialność i ograniczenia",
      items: {
        obligation: {
          title: "Zobowiązanie do środków",
          description: "YOJOB zobowiązuje się zastosować wszelkie niezbędne środki do realizacji swoich świadczeń pośrednictwa, bez gwarancji rezultatu."
        },
        nonResponsibility: {
          title: "Brak odpowiedzialności agencja/Profile",
          description: "YOJOB nie odpowiada za działania, zaniedbania lub niedopełnienia agencji, rekrutowanych Profili, ani za decyzje kredytowe/ubezpieczeniowe."
        },
        cap: {
          title: "Ograniczenie",
          description: "Z wyjątkiem rażącego zaniedbania lub umyślności, odpowiedzialność YOJOB jest ograniczona do kwoty netto otrzymanej w związku z daną umową w ciągu ostatnich 12 miesięcy."
        },
        indirect: {
          title: "Szkody pośrednie wyłączone",
          description: "YOJOB nie może być pociągnięty do odpowiedzialności za szkody pośrednie (utrata działalności, utracone zyski, utrata klienteli itp.)."
        }
      }
    },

    article12: {
      title: "Artykuł 12 - Poufność",
      intro: "Strony zobowiązują się zachować w poufności wszystkie informacje wymieniane w ramach ich współpracy.",
      items: [
        "Informacje poufne obejmują dane handlowe, techniczne, finansowe i strategiczne",
        "Obowiązek poufności trwa przez cały czas trwania relacji umownej i 5 lat po jej ustaniu",
        "Informacje nie mogą być ujawniane osobom trzecim bez uprzedniej pisemnej zgody",
        "Strony muszą podjąć wszelkie niezbędne środki w celu ochrony poufności informacji"
      ]
    },

    article13: {
      title: "Artykuł 13 - Dane osobowe (RODO)",
      intro: "Wymiana danych osobowych jest ściśle ograniczona do danych niezbędnych do realizacji świadczeń (kontakty, potrzeby, profile kandydatów).",
      cards: {
        compliance: {
          title: "Zgodność z RODO",
          description: "Przetwarzanie danych osobowych jest realizowane zgodnie z RODO i ustawą o ochronie danych.",
          linkText: "Polityka prywatności"
        },
        dpo: {
          title: "Kontakt IOD",
          description: "W przypadku wszelkich żądań dotyczących Państwa danych osobowych lub wykonania praw RODO."
        }
      },
      dpaNote: "DPA (Data Processing Agreement) może być dołączone w razie potrzeby w zależności od charakteru wymiany danych."
    },

    article14: {
      title: "Artykuł 14 - Czas trwania i rozwiązanie",
      items: {
        duration: {
          title: "Czas trwania",
          description: "Czas trwania relacji umownej jest określony w umowie lub zaakceptowanej propozycji trójstronnej."
        },
        earlyTermination: {
          title: "Rozwiązanie przedterminowe",
          description: "Okres wypowiedzenia 30 dni (lub czas trwania uzgodniony w umowie) + płatność należnych kwot (w tym prowizje/premie za sukces, jeśli osiągnięto fakt generujący)."
        },
        breach: {
          title: "Rozwiązanie z powodu niedopełnienia",
          description: "W przypadku poważnego niedopełnienia obowiązków: wezwanie + termin regularyzacji 15 dni. W przypadku braku regularyzacji, rozwiązanie z mocy prawa."
        }
      }
    },

    article15: {
      title: "Artykuł 15 - Siła wyższa",
      intro: "Strony nie mogą być pociągnięte do odpowiedzialności, jeśli niedopełnienie lub opóźnienie w wykonaniu ich obowiązków wynika z przypadku siły wyższej w rozumieniu orzecznictwa francuskiego.",
      examplesTitle: "Stanowią w szczególności przypadki siły wyższej:",
      examples: [
        "Katastrofy naturalne, powodzie, pożary",
        "Wojny, zamachy, zamieszki",
        "Strajki generalne, blokady transportu",
        "Awarie sieci (telekomunikacja, elektryczność)",
        "Epidemie, pandemie",
        "Środki sanitarne rządowe"
      ],
      suspension: "W przypadku siły wyższej obowiązki są zawieszone na czas trwania zdarzenia, po powiadomieniu drugiej strony."
    },

    article16: {
      title: "Artykuł 16 - Prawo właściwe i spory",
      sections: {
        law: {
          title: "Prawo właściwe",
          description: "Niniejsze OWS podlegają prawu francuskiemu."
        },
        amicable: {
          title: "Próba polubowna wstępna",
          description: "W przypadku sporu strony zobowiązują się szukać rozwiązania polubownego przed wszelkim postępowaniem sądowym. Klient może skorzystać z mediacji konwencjonalnej lub jakiegokolwiek innego alternatywnego trybu rozwiązywania sporów."
        },
        jurisdiction: {
          title: "Właściwy sąd",
          description: "W przypadku braku rozstrzygnięcia polubownego, wszelkie spory podlegają wyłącznej właściwości sądów siedziby YOJOB, chyba że obowiązuje imperatywna przeciwna reguła."
        }
      }
    },

    article17: {
      title: "Artykuł 17 - Modyfikacja OWS",
      intro: "YOJOB zastrzega sobie prawo do modyfikacji w dowolnym momencie niniejszych OWS.",
      items: [
        "OWS mające zastosowanie to te obowiązujące w dniu akceptacji propozycji/umowy",
        "Modyfikacje nie mają skutku wstecznego na umowy w trakcie wykonania, chyba że wyraźna pisemna zgoda stron",
        "Najnowsza wersja OWS może być konsultowana w dowolnym momencie na stronie internetowej YOJOB"
      ]
    }
  },

  cta: {
    title: "Pytania dotyczące naszych OWS?",
    description: "Nasz zespół prawny i handlowy jest do Państwa dyspozycji w celu wszelkich wyjaśnień dotyczących tych Ogólnych Warunków Sprzedaży.",
    backHome: "Powrót do strony głównej",
    contactUs: "Skontaktuj się z nami"
  },

  footer: {
    copyright: "© {year} {company} — Jednoosobowa działalność gospodarcza. Wszelkie prawa zastrzeżone.",
    links: {
      legal: "Informacje prawne",
      privacy: "Prywatność",
      cgv: "OWS"
    }
  },

  badges: {
    main: "Główny",
    optional: "Opcjonalny",
    mixed: "Mieszany"
  },

  common: {
    back: "Powrót",
    triggers: "Wyzwalacze",
    conditions: "Warunki",
    safeguards: "Zabezpieczenia"
  }
};
