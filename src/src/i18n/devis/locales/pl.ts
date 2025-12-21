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
    fields: {
      secteur: {
        label: "Sektor Branżowy",
        placeholder: "Wybierz sektor",
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
  },

  // === KROK 4: WARUNKI ===
  step4: {
    title: "Warunki Pracy",
    subtitle: "Określ warunki zatrudnienia i oferowane świadczenia.",
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
      },
      epi: {
        title: "Środki Ochrony Osobistej (ŚOO)",
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
};