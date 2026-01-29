/**
 * 🇵🇱 POLSKIE TŁUMACZENIA - FORMULARZ OFERTY
 * 
 * Pełne polskie tłumaczenia dla formularza oferty
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import type { DevisTranslations } from '../types';

export const pl: DevisTranslations = {
  // === WSPÓLNE ===
  common: {
    next: "Dalej",
    previous: "Wstecz",
    submit: "Wyślij",
    required: "*",
    optional: "(opcjonalne)",
    loading: "Ładowanie...",
    error: "Błąd",
    success: "Sukces",
    cancel: "Anuluj",
    save: "Zapisz",
    edit: "Edytuj",
    delete: "Usuń",
    confirm: "Potwierdź",
    euro: "€",
    perHour: "/godz",
    perMonth: "/mies",
    perDay: "/dzień",
    persons: "osoba/y",
    hours: "godzina/y",
    days: "dzień/dni",
    months: "miesiące",
    year: "rok/lata",
  },

  // === NAWIGACJA ===
  navigation: {
    back: "Wstecz",
    stepOf: "Krok {step} z {total}",
    steps: {
      entreprise: {
        title: "Firma",
        badge: "🏢 Twoja firma",
      },
      contact: {
        title: "Kontakt",
        badge: "👤 Twój kontakt",
      },
      besoins: {
        title: "Wymagania",
        badge: "💼 Twoje potrzeby",
      },
      conditions: {
        title: "Warunki",
        badge: "📋 Warunki",
      },
      candidats: {
        title: "Kandydaci",
        badge: "👷 Poszukiwany profil",
      },
      recapitulatif: {
        title: "Podsumowanie",
        badge: "✅ Podsumowanie",
      },
    },
  },

  // === WALIDACJA ===
  validation: {
    fillRequired: "Proszę wypełnić wszystkie wymagane pola",
    selectRegion: "Proszę wybrać region",
    addAtLeastOnePosition: "Proszę dodać co najmniej jedno stanowisko",
    invalidEmail: "Proszę podać prawidłowy adres e-mail",
    invalidPhone: "Proszę podać prawidłowy numer telefonu",
    invalidSIRET: "Proszę podać prawidłowy numer SIRET (14 cyfr)",
    dateRequired: "Proszę podać datę rozpoczęcia",
    missionLocationRequired: "Proszę podać miejsce misji",
  },

  // === WIADOMOŚCI ===
  messages: {
    success: {
      quoteSent: "Wycena została wysłana pomyślnie!",
      redirecting: "Przekierowywanie...",
    },
    error: {
      submitError: "Błąd podczas wysyłania wyceny",
      genericError: "Wystąpił błąd",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Zapytanie ofertowe | YOJOB",
    pageDescription: "Poproś o wycenę dla swoich potrzeb dotyczących europejskiego personelu tymczasowego.",
  },

  // === KROK 1: FIRMA ===
  step1: {
    title: "Informacje o Firmie",
    subtitle: "Wprowadź dane prawne swojej firmy.",
    fields: {
      pays: {
        label: "Kraj",
        placeholder: "Wybierz kraj",
      },
      raisonSociale: {
        label: "Nazwa Firmy",
        placeholder: "np. YOJOB Sp. z o.o.",
      },
      siret: {
        label: "Numer Rejestracyjny Firmy",
        placeholder: "Numer rejestracyjny",
        helper: "Twój identyfikator rejestracyjny firmy",
      },
      codeAPE: {
        label: "Kod Działalności Gospodarczej",
        placeholder: "np. 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Numer VAT",
        placeholder: "np. PL1234567890",
      },
      adresse: {
        label: "Pełny Adres",
        placeholder: "Numer i nazwa ulicy",
      },
      codePostal: {
        label: "Kod Pocztowy",
        placeholder: "np. 00-001",
      },
      ville: {
        label: "Miasto",
        placeholder: "np. Warszawa",
      },
      region: {
        label: "Region/Województwo",
        placeholder: "Wybierz region",
        placeholderOtherCountry: "np. Bawaria, Katalonia, Lombardia...",
      },
      siteInternet: {
        label: "Strona Internetowa",
        placeholder: "https://www.przyklad.pl",
      },
    },
    infoMessage: "✓ Te informacje zostaną wykorzystane do wygenerowania spersonalizowanej oferty",
  },

  // === KROK 2: KONTAKT ===
  step2: {
    title: "Osoba Kontaktowa",
    subtitle: "Kto będzie główną osobą kontaktową dla tego projektu?",
    fields: {
      civilite: {
        label: "Tytuł",
        options: {
          m: "Pan",
          mme: "Pani",
        },
      },
      nom: {
        label: "Nazwisko",
        placeholder: "np. Kowalski",
      },
      prenom: {
        label: "Imię",
        placeholder: "np. Jan",
      },
      fonction: {
        label: "Stanowisko",
        placeholder: "np. Kierownik HR",
      },
      email: {
        label: "Email Służbowy",
        placeholder: "jan.kowalski@firma.pl",
      },
      telephone: {
        label: "Numer Telefonu",
        placeholder: "+48 22 123 45 67",
      },
    },
  },

  // === KROK 3: WYMAGANIA ===
  step3: {
    title: "Określ Swoje Wymagania",
    subtitle: "Opisz dokładnie stanowiska, których szukasz.",
    profileLabel: "Profil",
    addProfile: "Dodaj Kolejny Profil",
    removeProfile: "Usuń Ten Profil",
    loadingConfig: "Ładowanie konfiguracji...",
    missingRegionWarning: "⚠️ Proszę wybrać region w kroku 1, aby automatycznie wyświetlić wynagrodzenia.",
    fields: {
      secteur: {
        label: "Sektor Branżowy",
        placeholder: "Wybierz sektor",
      },
      convention: {
        label: "Układ Zbiorowy",
        placeholder: "Automatyczny według sektora",
      },
      poste: {
        label: "Stanowisko",
        placeholder: "Wybierz stanowisko",
      },
      classification: {
        label: "Klasyfikacja / Kwalifikacje",
        placeholder: "Wybierz klasyfikację",
      },
      quantite: {
        label: "Liczba Osób",
        placeholder: "np. 5",
        helper: "Ile osób na to stanowisko?",
      },
      salaireBrut: {
        label: "Miesięczne Wynagrodzenie Brutto",
        placeholder: "np. 2500",
        helper: "Wynagrodzenie brutto na podstawie 151,67 godz/mies",
      },
      nationalite: {
        label: "Narodowość Pracowników",
        placeholder: "Wybierz kraj",
        helper: "Narodowość wpływa na współczynnik ceny agencji",
      },
    },
    ajouterPoste: "Dodaj Kolejne Stanowisko",
    supprimerPoste: "Usuń To Stanowisko",
    posteNumero: "Stanowisko",
    coefficientInfo: {
      title: "💡 Zastosowany Współczynnik Agencji",
      base: "Współcz. bazowy",
      facteurPays: "Współcz. kraju",
      final: "Współczynnik końcowy",
    },
    summary: {
      title: "Wynagrodzenie pracownika",
      salaireBrutMensuel: "Wynagrodzenie brutto miesięczne",
      tauxHoraireBrut: "Stawka godzinowa brutto",
      baseMensuelle: "(Podstawa 151,67 godz./mies. według układu zbiorowego)",
    },
  },

  // === KROK 4: WARUNKI ===
  step4: {
    title: "Warunki Pracy",
    subtitle: "Określ warunki zatrudnienia i oferowane świadczenia.",
    dateError: "Data zakończenia musi być po dacie rozpoczęcia",
    fields: {
      dateDebut: {
        label: "Pożądana Data Rozpoczęcia",
        placeholder: "DD/MM/RRRR",
      },
      dateFin: {
        label: "Przewidywana Data Zakończenia",
        placeholder: "DD/MM/RRRR",
        helper: "Pozostaw puste, jeśli czas nieokreślony",
      },
      baseHoraire: {
        label: "Godziny Miesięczne",
        placeholder: "np. 151,67",
        helper: "Podstawa prawna we Francji: 151,67 godz/mies (35 godz/tydzień)",
      },
      lieuxMission: {
        label: "Miejsca Wykonywania Zadania",
        placeholder: "np. Paryż 15., Lyon 3., Marsylia...",
      },
      periodeEssai: {
        label: "Okres Próbny",
        placeholder: "Wybierz czas trwania",
        options: {
          '2': '2 dni',
          '3': '3 dni',
          '5': '5 dni',
          '15': '15 dni',
        },
      },
      motifRecours: {
        label: "Powód Korzystania z Pracy Tymczasowej",
        placeholder: "Wybierz powód",
        options: {
          accroissement: "Tymczasowy wzrost aktywności",
          remplacement: "Zastępstwo nieobecnego pracownika",
          saisonnier: "Prace sezonowe",
          exportation: "Wyjątkowe zamówienie eksportowe",
          autre: "Inne (proszę określić)",
        },
      },
      delaiPaiement: {
        label: "Pożądany Termin Płatności",
        placeholder: "Wybierz termin płatności",
        options: {
          reception: "Płatność przy odbiorze",
          j30: "30 dni",
          j45: "45 dni",
          j60: "60 dni",
        },
      },
    },
    hebergement: {
      title: "Zakwaterowanie",
      chargeEU: {
        label: "Zakwaterowanie zapewnione przez firmę klienta",
        helper: "Jeśli NIE: dodatek godzinowy +3,50 €/godz zostanie naliczony przez agencję",
      },
      supplementWarning: "⚠️ Dodatek +3,50 €/godz zostanie zastosowany, ponieważ zakwaterowanie nie jest zapewnione",
      commentaire: {
        label: "Szczegóły dotyczące zakwaterowania",
        placeholder: "Rodzaj zakwaterowania, adres, szczególne warunki...",
      },
    },
    transport: {
      title: "Transport Lokalny",
      chargeETT: {
        label: "Transport lokalny zapewniony przez agencję",
        helper: "Jeśli TAK: dodatek godzinowy +1,50 €/godz zostanie naliczony",
      },
      supplementInfo: "✓ Dodatek +1,50 €/godz zostanie zastosowany na pokrycie kosztów transportu lokalnego",
    },
    repas: {
      title: "Posiłki",
      options: {
        restaurant: "Stołówka firmowa / Bony żywieniowe",
        panier: "Pakowane posiłki (rozliczane dziennie)",
        nonConcerne: "Nie dotyczy",
      },
      montantInfo: "📋 Kwota pakowanego posiłku: {montant} / dzień pracy (rozliczane osobno)",
      montantNonDefini: "⚠️ Kwota niezdefiniowana dla tego kraju/regionu",
    },
    sections: {
      hebergement: {
        title: "Zakwaterowanie",
        chargeEU: {
          label: "Zakwaterowanie zapewnione przez firmę klienta",
          helper: "Jeśli NIE: dodatek godzinowy +3,50 €/godz zostanie naliczony przez agencję",
          options: {
            oui: "Tak, zapewnione przez klienta",
            non: "Nie, odpowiedzialność agencji",
          },
        },
        detailsEU: {
          type: {
            label: "Rodzaj Zakwaterowania",
            options: {
              hotel: "Hotel",
              appartement: "Mieszkanie",
              foyer: "Hostel",
              autre: "Inne",
            },
          },
          adresse: {
            label: "Adres Zakwaterowania",
            placeholder: "Pełny adres",
          },
        },
      },
      transportInternational: {
        title: "Transport Międzynarodowy (kraj pochodzenia ↔ Francja)",
        chargeEU: {
          label: "Transport zapewniony przez firmę klienta",
          helper: "Podróże między krajem pochodzenia a miejscem wykonywania zadania",
          options: {
            oui: "Tak, zapewnione przez klienta",
            non: "Nie, odpowiedzialność pracownika",
          },
        },
        detailsEU: {
          type: {
            label: "Rodzaj Transportu",
            options: {
              avion: "Samolot",
              train: "Pociąg",
              bus: "Autobus",
              covoiturage: "Zorganizowany carpooling",
            },
          },
          frequence: {
            label: "Częstotliwość Podróży",
            options: {
              allerRetour: "Tylko początkowy przejazd w obie strony",
              hebdomadaire: "Tygodniowo",
              mensuel: "Miesięcznie",
            },
          },
        },
      },
      transportLocal: {
        title: "Transport Lokalny (w miejscu wykonywania zadania)",
        chargeETT: {
          label: "Transport lokalny zapewniony przez agencję",
          helper: "Jeśli TAK: dodatek godzinowy +1,50 €/godz zostanie naliczony",
          options: {
            oui: "Tak, zapewnione przez agencję",
            non: "Nie",
          },
        },
        detailsETT: {
          type: {
            label: "Rodzaj Transportu",
            options: {
              vehicule: "Pojazd służbowy",
              transport: "Bilet komunikacji miejskiej",
              velo: "Rower/Hulajnoga",
            },
          },
        },
      },
      repas: {
        title: "Posiłki",
        type: {
          label: "Rozwiązanie Posiłkowe",
          options: {
            restaurant: "Stołówka firmowa / Bony żywieniowe",
            panier: "Pakowane posiłki (rozliczane dziennie)",
            nonConcerne: "Nie dotyczy",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Budżet Dzienny",
            placeholder: "np. 12,00",
          },
        },
        detailsPanier: {
          info: "Pakowane posiłki będą rozliczane osobno za każdy dzień pracy według stawki kraju pochodzenia",
        },
      },
    },
  },

  // === KROK 5: KANDYDACI ===
  step5: {
    title: "Profil Kandydata",
    subtitle: "Określ konkretne umiejętności i wymagania.",
    sections: {
      experience: {
        title: "Doświadczenie Zawodowe",
        obligatoire: {
          label: "Wymagane Doświadczenie",
        },
        annees: {
          label: "Minimalne Lata Doświadczenia",
          placeholder: "Wybierz poziom",
          options: {
            '0-1': "Początkujący (0-1 rok)",
            '1-3': "Średniozaawansowany (1-3 lata)",
            '3-5': "Doświadczony (3-5 lat)",
            '5+': "Ekspert (5+ lat)",
          },
        },
        competences: {
          label: "Wymagane Umiejętności Techniczne",
          placeholder: "np. Murarstwo, szalowanie, czytanie planów, spawanie TIG...",
        },
      },
      formation: {
        title: "Szkolenie",
        obligatoire: {
          label: "Wymagane Szkolenie",
        },
        type: {
          label: "Rodzaj Szkolenia",
          placeholder: "np. Certyfikat murarza, uprawnienia na wózek widłowy...",
        },
      },
      langues: {
        title: "Umiejętności Językowe",
        francais: {
          label: "Wymagany Poziom Francuskiego",
          placeholder: "Wybierz poziom",
          options: {
            a1: "A1 - Początkujący",
            a2: "A2 - Podstawowy",
            b1: "B1 - Średniozaawansowany",
            b2: "B2 - Dobry średniozaawansowany",
            c1: "C1 - Zaawansowany",
            c2: "C2 - Biegły",
            natif: "Język ojczysty",
          },
        },
        autres: {
          label: "Inne Przydatne Języki",
          placeholder: "np. Angielski (B1), Niemiecki (A2)...",
        },
        // Nazwy języków
        languageNames: {
          francais: "Francuski",
          anglais: "Angielski",
          portugais: "Portugalski",
          espagnol: "Hiszpański",
          italien: "Włoski",
          autre: "Inny",
        },
        // Poziomy językowe
        levels: {
          'non-requis': "Niewymagany",
          'A1': "A1 - Początkujący",
          'A2': "A2 - Podstawowy",
          'B1': "B1 - Średniozaawansowany",
          'B2': "B2 - Zaawansowany",
          'C1': "C1 - Autonomiczny",
          'C2': "C2 - Biegły",
        },
      },
      permis: {
        title: "Prawo Jazdy",
        requis: {
          label: "Wymagane Prawo Jazdy",
          options: {
            aucun: "Nie wymagane prawo jazdy",
            b: "Prawo jazdy kat. B (samochód)",
            c: "Prawo jazdy kat. C (ciężarówka)",
            ce: "Prawo jazdy kat. CE (ciężarówka + przyczepa)",
            d: "Prawo jazdy kat. D (transport pasażerów)",
          },
        },
        categorie: {
          label: "Kategoria prawa jazdy",
          placeholder: "np. B, C, CE...",
        },
      },
      outillage: {
        title: "Drobne narzędzia",
        requis: {
          label: "Wymagane narzędzia osobiste",
        },
        type: {
          label: "Rodzaj narzędzi",
          placeholder: "np. Młotek, poziomica, taśma miernicza, kielnia...",
        },
      },
      epi: {
        title: "Środki Ochrony Osobistej (ŚOO)",
        infoLegale: "ℹ️ Zgodnie z przepisami, pracodawca musi zapewnić ŚOO dostosowane do zagrożeń stanowiska.",
        selectionCount: "✓ Wybrano {count} ŚOO",
        fournis: {
          label: "ŚOO zapewnione przez firmę",
          helper: "Kask, buty ochronne, rękawice itp.",
          options: {
            oui: "Tak, zapewnione przez klienta",
            non: "Nie, odpowiedzialność pracownika",
          },
        },
        liste: {
          label: "Lista Wymaganych ŚOO",
          placeholder: "np. Kask, buty S3, rękawice antyprzecięciowe, szelki...",
        },
        // Artykuły ŚOO
        items: {
          casque: "Kask ochronny",
          lunettes: "Okulary ochronne",
          protections_auditives: "Ochrona słuchu",
          gants: "Rękawice ochronne",
          chaussures: "Buty ochronne",
          harnais: "Szelki bezpieczeństwa",
          vetements: "Odzież robocza",
          masque: "Maska oddechowa",
          protection_faciale: "Ochrona twarzy",
          vetements_visibilite: "Odzież o wysokiej widoczności",
        },
      },
      autresExigences: {
        title: "Inne Wymagania",
        label: "Dodatkowe Szczególne Wymagania",
        placeholder: "np. Uprawnienia elektryczne, uprawnienia wózkowe, dyspozycyjność weekendowa, praca na wysokości...",
      },
    },
  },

  // === PODSUMOWANIE ===
  recapitulatif: {
    title: "Podsumowanie Twojego Zapytania",
    subtitle: "Sprawdź informacje przed wysłaniem zapytania ofertowego.",
    acceptConditionsError: "Proszę zaakceptować warunki przed kontynuowaniem",
    entreprise: {
      title: "Firma",
      raisonSociale: "Nazwa Firmy",
      siret: "Numer Rejestracyjny",
      pays: "Kraj",
      ville: "Miasto",
      region: "Region/Województwo",
    },
    contact: {
      title: "Kontakt",
      nomPrenom: "Imię i nazwisko",
      email: "Email",
      telephone: "Telefon",
      fonction: "Stanowisko",
    },
    postes: {
      title: "Żądane Stanowiska",
      coeffETT: "📊 Zastosowany Współczynnik Agencji",
      coeffBase: "Współcz. bazowy",
      facteurPays: "Współcz. kraju",
      supplementsHoraires: "✨ Dodatki Godzinowe (uwzględnione w stawce)",
      hebergement: "✓ Zakwaterowanie",
      transport: "✓ Transport lokalny",
      panierRepas: "🍽️ Pakowane posiłki (rozliczane dziennie)",
      baseHoraire: "📅 Godziny miesięczne: {heures} godz/mies (wykryto nadgodziny)",
      heuresNormales: "Godziny normalne (0-35 godz/tydz)",
      heuresSup25: "Nadgodziny +25% (36.-43. godz)",
      heuresSup50: "Nadgodziny +50% (44.+ godz)",
      sousTotal: "Suma pośrednia pracy (na osobę)",
      tauxHoraireBrut: "Stawka godzinowa brutto",
      tauxETTFinal: "Końcowa stawka agencji",
      coutMensuel: "Całkowity koszt miesięczny",
    },
    conditions: {
      title: "Warunki Zadania",
      dateDebut: "Data rozpoczęcia",
      dateFin: "Data zakończenia",
      dureeEstimee: "Szacowany czas trwania",
      lieuMission: "Miejsce wykonywania zadania",
      mois: "miesiące",
    },
    majorations: {
      title: "Korekty taryfowe zlecenia",
      total: "Suma korekt",
      notSet: "Nie zdefiniowano",
    },
    totaux: {
      mensuelHT: "Suma Miesięczna (netto)",
      mensuelTTC: "Suma Miesięczna (brutto)",
      totalMission: "Całkowity Koszt Zadania",
    },
    noteLegale: "ℹ️ To oszacowanie ma charakter orientacyjny. Ostateczna cena zostanie potwierdzona po weryfikacji przez nasz zespół i wybraną agencję partnerską.",
    acceptConditions: {
      text: "Wyrażam zgodę na przetwarzanie moich danych zgodnie z",
      lien: "polityką prywatności",
    },
    boutonEnvoi: {
      texte: "Wyślij Moje Zapytanie Ofertowe",
      enCours: "Wysyłanie...",
    },
    footer: "✓ Odpowiedź w ciągu 24 godzin roboczych • ✓ Bez zobowiązań",
  },

  // === BŁĘDY ===
  errors: {
    required: "To pole jest wymagane",
    invalidEmail: "Nieprawidłowy adres email",
    invalidSIRET: "Nieprawidłowy numer rejestracyjny",
    invalidPhone: "Nieprawidłowy numer telefonu",
    minValue: "Wartość musi być większa lub równa {min}",
    maxValue: "Wartość musi być mniejsza lub równa {max}",
    genericError: "Wystąpił błąd. Proszę spróbować ponownie.",
    loadingError: "Błąd ładowania danych",
    submitError: "Błąd wysyłania zapytania",
  },

  // === SEKTORY & ZAWODY ===
  secteurs: {
    batiment: {
      label: "Budownictwo",
      convention: "Krajowy układ zbiorowy dla robotników budowlanych (3193)",
      postes: {
        macon: "Murarz",
        coffreur: "Szalowniczy",
        ferrailleur: "Zbrojarz",
        carreleur: "Glazurnik",
        platrier: "Tynkarz",
        peintre: "Malarz",
        plombier: "Hydraulik",
        electricien: "Elektryk",
        couvreur: "Dekarz",
        menuisier: "Stolarz",
        chef_equipe_batiment: "Brygadzista",
        chef_chantier: "Kierownik budowy",
      },
      classifications: {
        n1p1: "N1P1",
        n1p2: "N1P2",
        n2p1: "N2P1",
        n2p2: "N2P2",
        n3p1: "N3P1",
        n3p2: "N3P2",
        n4p1: "N4P1",
        n4p2: "N4P2",
      },
    },
    metallurgie: {
      label: "Metalurgia",
      convention: "Układ zbiorowy metalurgii (3109)",
      postes: {
        soudeur: "Spawacz",
        chaudronnier: "Kotlarz",
        tuyauteur: "Monter rurociągów",
        tourneur: "Tokarz",
        fraiseur: "Frezer",
        usineur: "Operator obrabiarek",
        mecanicien_industriel: "Mechanik przemysłowy",
        monteur: "Monter",
        controleur_qualite: "Kontroler jakości",
        ajusteur: "Ślusarz",
        chef_equipe_metallurgie: "Brygadzista",
      },
      classifications: {
        niveau_1: "Poziom I",
        niveau_2: "Poziom II",
        niveau_3: "Poziom III",
        niveau_4: "Poziom IV",
        niveau_5: "Poziom V",
      },
    },
    tp: {
      label: "Roboty Publiczne",
      convention: "Krajowy układ zbiorowy robót publicznych (3005)",
      postes: {
        conducteur_engins: "Operator maszyn budowlanych",
        terrassier: "Robotnik ziemny",
        canalisateur: "Kanalizator",
        constructeur_routes: "Budowlaniec dróg",
        coffreur_bancheur: "Szalowniczy betonowy",
        macon_vrd: "Murarz VRD",
        chef_equipe_tp: "Brygadzista robót publicznych",
        manoeuvre_tp: "Robotnik pomocniczy",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelarstwo",
      convention: "Układ zbiorowy hotelarstwa-restauracji (3292)",
      postes: {
        receptionniste: "Recepcjonista",
        femme_chambre: "Pokojówka",
        agent_entretien: "Pracownik obsługi",
        bagagiste: "Bagażowy",
        concierge: "Portier",
        night_audit: "Nocny audytor",
        gouvernante: "Główna gospodyni",
        chef_reception: "Kierownik recepcji",
      },
      classifications: {
        niveau_1: "Poziom I",
        niveau_2: "Poziom II",
        niveau_3: "Poziom III",
        niveau_4: "Poziom IV",
        niveau_5: "Poziom V",
      },
    },
    restauration: {
      label: "Gastronomia",
      convention: "Układ zbiorowy hotelarstwa-restauracji (3292)",
      postes: {
        cuisinier: "Kucharz",
        commis_cuisine: "Pomocnik kuchenny",
        chef_partie: "Szef partii",
        serveur: "Kelner",
        barman: "Barman",
        plongeur: "Pomywacz",
        chef_rang: "Główny kelner",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Szef kuchni",
      },
      classifications: {
        niveau_1: "Poziom I",
        niveau_2: "Poziom II",
        niveau_3: "Poziom III",
        niveau_4: "Poziom IV",
        niveau_5: "Poziom V",
      },
    },
    plasturgie: {
      label: "Przemysł Tworzyw Sztucznych",
      convention: "Układ zbiorowy przemysłu tworzyw sztucznych (0292)",
      postes: {
        operateur_injection: "Operator wtrysku",
        operateur_extrusion: "Operator wytłaczania",
        regleur: "Ustawiacz",
        operateur_thermoformage: "Operator termoformowania",
        controleur_qualite_plasturgie: "Kontroler jakości",
        technicien_maintenance: "Technik konserwacji",
        chef_equipe_plasturgie: "Brygadzista",
      },
      classifications: {
        niveau_1: "Poziom I",
        niveau_2: "Poziom II",
        niveau_3: "Poziom III",
        niveau_4: "Poziom IV",
      },
    },
    automobile_carrosserie: {
      label: "Motoryzacja i Karoseria",
      convention: "Układ zbiorowy napraw samochodowych (1090)",
      postes: {
        carrossier: "Blacharz samochodowy",
        peintre_automobile: "Lakiernik samochodowy",
        mecanicien_auto: "Mechanik samochodowy",
        electricien_auto: "Elektryk samochodowy",
        chef_atelier: "Kierownik warsztatu",
        controleur_technique: "Kontroler techniczny",
      },
      classifications: {
        niveau_1: "Poziom I",
        niveau_2: "Poziom II",
        niveau_3: "Poziom III",
        niveau_4: "Poziom IV",
      },
    },
    sylviculture: {
      label: "Leśnictwo",
      convention: "Układ zbiorowy rolnictwa (7501)",
      postes: {
        bucheron: "Drwal",
        elagueur: "Arborist",
        conducteur_engins_forestiers: "Operator maszyn leśnych",
        chef_equipe_sylviculture: "Brygadzista leśny",
      },
      classifications: {
        niveau_1: "Poziom I",
        niveau_2: "Poziom II",
        niveau_3: "Poziom III",
        niveau_4: "Poziom IV",
      },
    },
    cartonnerie: {
      label: "Przemysł Kartonowy",
      convention: "Układ zbiorowy przemysłu przetwórczego (3107)",
      postes: {
        operateur_production: "Operator produkcji",
        conducteur_ligne: "Operator linii",
        regleur_cartonnerie: "Ustawiacz",
        chef_equipe_cartonnerie: "Brygadzista",
      },
      classifications: {
        niveau_1: "Poziom I",
        niveau_2: "Poziom II",
        niveau_3: "Poziom III",
        niveau_4: "Poziom IV",
      },
    },
    autre: {
      label: "Inne",
      convention: "Do określenia według działalności",
      postes: {
        autre_poste: "Inne stanowisko (do określenia)",
      },
      classifications: {
        a_definir: "Do określenia",
      },
    },
  },
  
  // === KRAJE EUROPEJSKIE ===
  pays: {
    france: "Francja",
    allemagne: "Niemcy",
    autriche: "Austria",
    belgique: "Belgia",
    bulgarie: "Bułgaria",
    croatie: "Chorwacja",
    chypre: "Cypr",
    danemark: "Dania",
    espagne: "Hiszpania",
    estonie: "Estonia",
    finlande: "Finlandia",
    grece: "Grecja",
    hongrie: "Węgry",
    irlande: "Irlandia",
    italie: "Włochy",
    lettonie: "Łotwa",
    lituanie: "Litwa",
    luxembourg: "Luksemburg",
    malte: "Malta",
    pays_bas: "Holandia",
    pologne: "Polska",
    portugal: "Portugalia",
    republique_tcheque: "Czechy",
    roumanie: "Rumunia",
    slovaquie: "Słowacja",
    slovenie: "Słowenia",
    suede: "Szwecja",
  },

  // === STRONA PODSUMOWANIA OFERTY (PODPIS) ===
  pageRecap: {
    header: {
      title: "Podsumowanie oferty",
      exportPDF: "Eksportuj PDF",
      apercuImpression: "Podgląd i drukowanie",
      loading: "Ładowanie oferty...",
      notFound: "Oferta nie została znaleziona",
    },
    statut: {
      signe: "Podpisane",
      nouveau: "Nowe",
    },
    dates: {
      creeLe: "Utworzono",
      a: "o",
      signeLe: "Podpisano",
      derniereModification: "Ostatnia modyfikacja:",
    },
    tooltips: {
      signezPourPDF: "Podpisz swoją ofertę, aby odblokować oficjalny PDF",
      signezMaintenant: "Podpisz teraz, aby otrzymać oficjalny PDF",
      documentDisponible: "Dokument będzie dostępny natychmiast po podpisaniu",
      pdfDebloque: "PDF odblokowany!",
      telechargerPDF: "Możesz teraz pobrać swoją oficjalną ofertę na górze strony",
    },
    modales: {
      apercu: {
        title: "Podgląd oferty",
        imprimer: "Drukuj / Zapisz jako PDF",
      },
      cgv: {
        title: "Ogólne Warunki Sprzedaży",
      },
    },
    print: {
      courtage: "Europejskie pośrednictwo rekrutacyjne",
      documentGenere: "Dokument wygenerowany",
    },
    entreprise: {
      title: "Informacje o firmie",
      raisonSociale: "Nazwa firmy",
      siret: "SIRET",
      codeAPE: "Kod APE",
      tvaIntracommunautaire: "NIP UE",
      adresse: "Adres",
      siteInternet: "Strona internetowa",
    },
    contact: {
      title: "Osoba kontaktowa",
      nomComplet: "Pełne imię i nazwisko",
      fonction: "Funkcja",
      email: "E-mail",
      telephonePortable: "Telefon komórkowy",
      telephoneFixe: "Telefon stacjonarny",
    },
    postes: {
      title: "Stanowiska do obsadzenia",
      nationalite: "Narodowość",
      salaireBrut: "Wynagrodzenie brutto",
      tauxHoraireBrut: "Stawka godzinowa brutto",
      coefficientETT: "Współczynnik ETT",
      tauxETT: "Stawka ETT",
    },
    conditions: {
      title: "Warunki pracy",
      dateDebut: "Data rozpoczęcia",
      dateFin: "Data zakończenia",
      periodeEssai: "Okres próbny",
      baseHoraire: "Podstawa godzinowa",
      heuresMois: "godz./mies.",
      lieuxMission: "Miejsca misji",
      motifRecours: "Powód zatrudnienia",
    },
    candidats: {
      title: "Profil poszukiwanych kandydatów",
      experience: "Doświadczenie",
      ansMinimum: "lat minimum",
      formation: "Wykształcenie",
      permis: "Prawo jazdy",
      langues: "Języki",
    },
    signature: {
      title: "Podpis elektroniczny",
      subtitle: "Podpisz swoją ofertę online w bezpieczny sposób",
      commencer: "Rozpocznij podpisywanie",
      identiteSignataire: "Tożsamość sygnatariusza",
      nomComplet: "Pełne imię i nazwisko",
      fonction: "Funkcja",
      email: "E-mail",
      entreprise: "Firma",
      siret: "SIRET",
      signataire: "Sygnatariusz",
      tracabilite: "Śledzenie techniczne",
      dateHeure: "Data i godzina",
      adresseIP: "Adres IP",
      navigateur: "Przeglądarka",
      signatureManuscrite: "Podpis odręczny",
      infoLegale: "🔒 Te informacje zostaną zapisane w certyfikacie podpisu elektronicznego, aby zapewnić identyfikowalność i zgodność prawną zgodnie z rozporządzeniem eIDAS (UE) nr 910/2014.",
      dessinerSignature: "Narysuj swój podpis poniżej",
      effacer: "Wyczyść",
      accepteCGV: "Akceptuję",
      cgvLien: "Ogólne Warunki Sprzedaży",
      accepteCGVSuite: "i poświadczam, że podane informacje są dokładne. Ten podpis elektroniczny ma taką samą wartość prawną jak podpis odręczny.",
      annuler: "Anuluj",
      validerSigner: "Potwierdź i podpisz",
      signatureEnCours: "Podpisywanie w toku...",
      erreurSignatureVide: "Proszę podpisać przed zatwierdzeniem",
      erreurCGV: "Proszę zaakceptować OWS",
    },
    succes: {
      title: "Oferta podpisana pomyślnie!",
      message: "Ta oferta została podpisana elektronicznie. Wkrótce otrzymasz e-mail potwierdzający z ostatecznym plikiem PDF.",
      signeLe: "Podpisano",
    },
    erreurs: {
      chargement: "Nie można załadować oferty",
      generation: "Nie można wygenerować pliku PDF",
      signature: "Nie można podpisać oferty",
    },
    toast: {
      pdfEnCours: "Generowanie pliku PDF...",
      pdfSucces: "PDF wygenerowany pomyślnie!",
      signatureSucces: "Oferta podpisana pomyślnie! E-mail potwierdzający został wysłany.",
    },
  },
};