/**
 * 🇵🇱 POLSKIE TŁUMACZENIA - STRONA POLITYKI PRYWATNOŚCI
 * 
 * @version 1.0.0
 */

export const privacyPL = {
  hero: {
    badge: "Polityka Prywatności",
    title: "Ochrona Twoich danych osobowych",
    subtitle: "W {company} zobowiązujemy się do ochrony i poszanowania Twojej prywatności zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO).",
    lastUpdate: "Ostatnia aktualizacja:"
  },

  dpo: {
    title: "Inspektor Ochrony Danych (IOD)",
    subtitle: "Twój uprzywilejowany kontakt w sprawach dotyczących Twoich danych"
  },

  sections: {
    dataController: {
      title: "1. Administrator danych",
      intro: "Administratorem danych osobowych jest:",
      location: "Bordeaux, Francja",
      email: "Email:"
    },

    dataCollected: {
      title: "2. Zbierane dane osobowe",
      intro: "Zbieramy następujące dane w ramach naszych europejskich usług rekrutacyjnych:",
      items: [
        {
          label: "Dane identyfikacyjne:",
          description: "Imię, nazwisko, email, telefon"
        },
        {
          label: "Dane zawodowe:",
          description: "Firma, stanowisko, sektor działalności"
        },
        {
          label: "Dane kontaktowe:",
          description: "Adres pocztowy, preferencje komunikacji"
        },
        {
          label: "Dane nawigacyjne:",
          description: "Pliki cookie, adres IP, dane połączenia"
        }
      ]
    },

    purposes: {
      title: "3. Cele przetwarzania",
      intro: "Twoje dane są zbierane i przetwarzane w następujących celach:",
      items: [
        {
          title: "Zarządzanie zapytaniami rekrutacyjnymi",
          description: "Przetwarzanie Twoich zapytań ofertowych i łączenie Cię z naszą siecią agencji partnerskich."
        },
        {
          title: "Poprawa naszych usług",
          description: "Analiza korzystania z naszych usług w celu poprawy Twojego doświadczenia użytkownika."
        },
        {
          title: "Komunikacja handlowa",
          description: "Informowanie Cię o naszych nowych usługach i naszym europejskim marketplace (za Twoją zgodą)."
        }
      ]
    },

    legalBasis: {
      title: "4. Podstawa prawna przetwarzania",
      intro: "Przetwarzanie Twoich danych opiera się na następujących podstawach prawnych:",
      items: [
        {
          basis: "Wykonanie umowy",
          description: "Przetwarzanie niezbędne do odpowiedzi na Twoje zapytania rekrutacyjne"
        },
        {
          basis: "Zgoda",
          description: "Do wysyłania komunikacji marketingowej (możesz wycofać zgodę w dowolnym momencie)"
        },
        {
          basis: "Uzasadniony interes",
          description: "Poprawa naszych usług i bezpieczeństwo naszej platformy"
        }
      ]
    },

    retention: {
      title: "5. Okres przechowywania",
      intro: "Przechowujemy Twoje dane osobowe przez następujące okresy:",
      items: [
        {
          period: "3 lata",
          description: "Dane potencjalnych klientów i klientów"
        },
        {
          period: "13 miesięcy",
          description: "Pliki cookie i dane nawigacyjne"
        },
        {
          period: "5 lat",
          description: "Dokumenty księgowe i podatkowe"
        },
        {
          period: "{days} dni",
          description: "Dane z formularzy (konfigurowalne)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Twoje prawa",
      intro: "Zgodnie z RODO przysługują Ci następujące prawa:",
      items: [
        {
          title: "Prawo dostępu",
          description: "Uzyskanie kopii swoich danych osobowych"
        },
        {
          title: "Prawo do sprostowania",
          description: "Poprawianie nieprawidłowych lub niekompletnych danych"
        },
        {
          title: "Prawo do usunięcia",
          description: "Żądanie usunięcia swoich danych"
        },
        {
          title: "Prawo do ograniczenia",
          description: "Ograniczenie przetwarzania swoich danych"
        },
        {
          title: "Prawo do przenoszenia",
          description: "Otrzymanie swoich danych w ustrukturyzowanym formacie"
        },
        {
          title: "Prawo sprzeciwu",
          description: "Sprzeciw wobec przetwarzania swoich danych"
        }
      ],
      footer: "Aby skorzystać ze swoich praw, skontaktuj się z naszym IOD pod adresem"
    },

    security: {
      title: "7. Bezpieczeństwo danych",
      intro: "Wdrażamy odpowiednie techniczne i organizacyjne środki bezpieczeństwa:",
      measures: [
        "Szyfrowanie danych w tranzycie i spoczynku (SSL/TLS)",
        "Ograniczony dostęp do danych poprzez silne uwierzytelnianie",
        "Regularne kopie zapasowe i plan ciągłości działania",
        "Audyty bezpieczeństwa i regularne aktualizacje",
        "Szkolenie personelu w zakresie dobrych praktyk RODO"
      ]
    },

    transfers: {
      title: "8. Przekazywanie danych",
      intro: "W ramach naszej europejskiej sieci ponad 500 agencji partnerskich w 27 krajach:",
      eu: {
        title: "🇪🇺 W obrębie Unii Europejskiej",
        description: "Twoje dane mogą być przekazywane do naszych agencji partnerskich znajdujących się w UE/EOG, które korzystają z tego samego poziomu ochrony RODO."
      },
      nonEu: {
        title: "🌍 Poza Unią Europejską",
        description: "W przypadku przekazywania poza UE stosujemy Standardowe Klauzule Umowne (SCC) Komisji Europejskiej, aby zapewnić odpowiedni poziom ochrony."
      }
    },

    cookies: {
      title: "9. Pliki cookie i mechanizmy śledzące",
      intro: "Nasza strona wykorzystuje pliki cookie w celu poprawy Twojego doświadczenia przeglądania:",
      types: [
        {
          type: "Niezbędne pliki cookie",
          description: "Niezbędne do funkcjonowania strony (sesja, bezpieczeństwo)",
          required: true
        },
        {
          type: "Analityczne pliki cookie",
          description: "Pomiar liczby odwiedzin i statystyki",
          required: false
        },
        {
          type: "Marketingowe pliki cookie",
          description: "Targetowana reklama i personalizacja",
          required: false
        }
      ],
      footer: "Możesz zarządzać swoimi preferencjami dotyczącymi plików cookie w dowolnym momencie za pomocą ustawień przeglądarki."
    },

    contact: {
      title: "10. Kontakt i skarga",
      intro: "W przypadku jakichkolwiek pytań dotyczących przetwarzania Twoich danych osobowych:",
      dpoCard: {
        title: "Skontaktuj się z naszym IOD"
      },
      cnilCard: {
        title: "Organ nadzorczy",
        name: "CNIL (Francja)"
      },
      footer: "Jeśli uważasz, że Twoje prawa nie są przestrzegane, masz prawo złożyć skargę do Commission Nationale de l'Informatique et des Libertés (CNIL)."
    }
  },

  cta: {
    title: "Twoje dane w bezpiecznych rękach",
    description: "Ochrona Twoich danych osobowych jest naszym priorytetem. Zobowiązujemy się do przestrzegania RODO i zapewnienia bezpieczeństwa Twoich informacji.",
    backHome: "Powrót do strony głównej",
    contactDpo: "Skontaktuj się z IOD"
  },

  badges: {
    required: "Wymagane",
    optional: "Opcjonalne"
  }
};
