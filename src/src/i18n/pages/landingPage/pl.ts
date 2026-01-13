/**
 * 🇵🇱 POLSKIE TŁUMACZENIA - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const plLandingPage: LandingPageContent = {
  language: 'pl',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Lider w rekrutacji europejskiej - Praca tymczasowa i umowy stałe w 27 krajach",
    metaDescription: "Dostęp do ponad 500 agencji rekrutacyjnych w 27 krajach europejskich. Praca tymczasowa, umowy stałe, delegowanie pracowników: YOJOB upraszcza międzynarodową rekrutację.",
    slug: "/",
    h1: "Lider w rekrutacji europejskiej",
    ogTitle: "YOJOB - Twój partner w rekrutacji w Europie",
    ogDescription: "Uproszczona rekrutacja europejska: ponad 500 agencji, 27 krajów, wszystkie formalności załatwione.",
    altTexts: {
      heroVisual: "Interaktywna mapa Europy pokazująca sieć YOJOB",
      europeMap: "Mapa 27 krajów europejskich objętych przez YOJOB",
      logoFooter: "Logo YOJOB - Rekrutacja europejska",
    },
    aiSummary: "YOJOB jest francuskim liderem w pośrednictwie rekrutacyjnym w Europie, z siecią ponad 500 agencji partnerskich w 27 krajach. Ułatwiamy europejską pracę tymczasową, wyspecjalizowaną rekrutację, delegowanie pracowników i oferujemy doradztwo w zakresie zgodności z przepisami. Nasze doświadczenie pozwala firmom na szybką i legalną rekrutację w całej Europie, z pełną obsługą formalności administracyjnych.",
    faq: [
      {
        question: "Czym jest YOJOB?",
        answer: "YOJOB to europejski pośrednik rekrutacyjny, który łączy francuskie firmy z siecią ponad 500 agencji w 27 krajach europejskich, aby ułatwić pracę tymczasową, rekrutację i delegowanie pracowników."
      },
      {
        question: "W jakich krajach działacie?",
        answer: "Obejmujemy 27 krajów Unii Europejskiej plus Norwegię, czyli pełne pokrycie Europy Zachodniej, Północnej, Południowej i Wschodniej."
      },
      {
        question: "Jakie rodzaje rekrutacji oferujecie?",
        answer: "Oferujemy europejską pracę tymczasową, rekrutację na czas określony/nieokreślony, delegowanie pracowników oraz doradztwo w zakresie zgodności z przepisami, aby zapewnić zgodność z regulacjami."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Strona główna",
      services: "Usługi",
      network: "Sieć",
      contact: "Kontakt"
    },
    cta: "Poproś o wycenę"
  },

  // Hero Section
  hero: {
    badge: "⭐ Lider w rekrutacji europejskiej",
    title: "Rekrutuj w całej Europie dzięki naszej sieci ponad 500 agencji partnerskich",
    subtitle: "Praca tymczasowa, umowy stałe, delegowanie: dostęp do najlepszych europejskich talentów. Zajmujemy się wszystkimi formalnościami za Ciebie.",
    benefits: [
      "27 krajów europejskich objętych",
      "Ponad 500 certyfikowanych agencji",
      "Pełna obsługa administracyjna",
      "Gwarantowana zgodność"
    ],
    ctaPrimaryLabel: "Uzyskaj bezpłatną wycenę",
    ctaSecondaryLabel: "Odkryj nasze usługi",
    stats: {
      agencies: { value: "500+", label: "agencji partnerskich" },
      countries: { value: "27", label: "krajów europejskich" },
      missions: { value: "2000+", label: "udanych misji" }
    },
    floatingCards: {
      since: { label: "Od", value: "2014" },
      expertise: { value: "10 lat", label: "Wiodącej ekspertyzy" },
      partners: { label: "Partnerzy", value: "Ponad 500 certyfikowanych agencji" },
      countries: { value: "27", label: "Krajów europejskich" },
      certified: { value: "500+", label: "Certyfikowanych agencji" },
      activeNetwork: "Aktywna sieć"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Nasze Kluczowe Liczby",
    title: "Uznane doświadczenie w Europie",
    items: [
      { value: "10", label: "lat doświadczenia", icon: "Target" },
      { value: "27", label: "objętych krajów", icon: "Globe" },
      { value: "500", label: "agencji partnerskich", icon: "Network" },
      { value: "2000", label: "zrealizowanych misji", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Nasze Usługi",
    title: "Rozwiązania rekrutacyjne dostosowane do Twoich potrzeb",
    subtitle: "Niezależnie od tego, czy szukasz pracowników tymczasowych, stałych czy delegowanych, mamy rozwiązanie",
    services: [
      {
        icon: "Users",
        title: "Europejska Praca Tymczasowa",
        description: "Rekrutuj wykwalifikowanych pracowników tymczasowych w całej Europie. Zajmujemy się wszystkimi formalnościami administracyjnymi.",
        linkLabel: "Dowiedz się więcej",
        href: "/usluga/europejska-praca-tymczasowa"
      },
      {
        icon: "Target",
        title: "Wyspecjalizowana Rekrutacja",
        description: "Znajdź najlepsze talenty na swoje stanowiska stałe/tymczasowe dzięki naszej europejskiej sieci ekspertów.",
        linkLabel: "Dowiedz się więcej",
        href: "/usluga/wyspecjalizowana-rekrutacja"
      },
      {
        icon: "ShieldCheck",
        title: "Doradztwo i Zgodność",
        description: "Zapewnij zgodność ze wszystkimi europejskimi przepisami dotyczącymi delegowania i mobilności.",
        linkLabel: "Dowiedz się więcej",
        href: "/usluga/doradztwo-zgodnosc"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Sieć Europejska",
    title: "27 krajów, ponad 500 certyfikowanych agencji partnerskich",
    subtitle: "Nasza siła: gęsta i wykwalifikowana sieć w całej Europie",
    mapLabel: "agencji partnerskich",
    waitlist: {
      badge: "🚀 Nowość 2025",
      title: "Marketplace agencji europejskich",
      subtitle: "Wkrótce: porównuj i kontaktuj się bezpośrednio z agencjami z naszej sieci",
      features: [
        "✓ Wyszukiwanie wielokryterialne (kraj, sektor, zawód)",
        "✓ Natychmiastowe porównanie agencji",
        "✓ Zweryfikowane opinie klientów",
        "✓ Bezpośrednie i bezpieczne połączenie"
      ],
      formTitle: "Bądź wśród pierwszych!",
      formSubtitle: "Zapisz się na listę oczekujących, aby uzyskać wczesny dostęp",
      emailPlaceholder: "twoj@email.pl",
      ctaLabel: "Dołącz do listy oczekujących",
      securityNote: "🔒 Twoje dane są bezpieczne i nigdy nie będą udostępniane",
      successMessage: "Dziękujemy! Jesteś na liście oczekujących. Skontaktujemy się z Tobą, gdy tylko otworzymy."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Jak to działa",
    title: "Europejska rekrutacja uproszczona w 4 krokach",
    subtitle: "Przejrzysty i skuteczny proces rekrutacji",
    steps: [
      {
        number: "01",
        title: "Opisz swoje potrzeby",
        description: "Podziel się z nami swoimi potrzebami rekrutacyjnymi: zawód, liczba stanowisk, czas trwania, wymagane kwalifikacje.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktywujemy naszą sieć",
        description: "Nasze agencje partnerskie w całej Europie identyfikują i selekcjonują najlepsze dostępne profile.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Zatwierdzasz kandydatów",
        description: "Otrzymujesz wstępnie wyselekcjonowane CV i przeprowadzasz rozmowy z kandydatami, którzy Cię interesują.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Witasz swój zespół",
        description: "Wybrani kandydaci dołączają do Twoich zespołów. Zajmujemy się wszystkimi formalnościami administracyjnymi i prawnymi.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Opinie",
    title: "Zaufali nam",
    subtitle: "Odkryj doświadczenia naszych klientów",
    testimonials: [
      {
        name: "Piotr Kowalski",
        position: "Dyrektor HR",
        company: "TechBuild Polska",
        quote: "Dzięki YOJOB udało nam się zrekrutować 15 wykwalifikowanych polskich murarzy w 3 tygodnie. Profesjonalna i skuteczna usługa!",
        rating: 5,
        sector: "Budownictwo"
      },
      {
        name: "Anna Nowak",
        position: "Dyrektor HR",
        company: "AgroPolska",
        quote: "Zarządzanie administracyjne to prawdziwy ból głowy przy rekrutacji międzynarodowej. YOJOB zajmuje się wszystkim, to ogromna oszczędność czasu.",
        rating: 5,
        sector: "Przemysł spożywczy"
      },
      {
        name: "Marek Wiśniewski",
        position: "Kierownik Produkcji",
        company: "AutoParts Europa",
        quote: "Doskonałe wsparcie! Znaleźliśmy wyspecjalizowanych techników w Niemczech, których nigdy nie moglibyśmy zrekrutować sami.",
        rating: 5,
        sector: "Przemysł"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Sektory działalności",
    title: "Rekrutujemy we wszystkich sektorach",
    subtitle: "Nasza sieć obejmuje wszystkie zawody i branże",
    sectors: [
      { icon: "Building2", name: "Budownictwo i Roboty Publiczne", color: "orange" },
      { icon: "Factory", name: "Przemysł", color: "blue" },
      { icon: "Tractor", name: "Rolnictwo", color: "green" },
      { icon: "UtensilsCrossed", name: "Gastronomia i Hotelarstwo", color: "red" },
      { icon: "Heart", name: "Zdrowie i Opieka Społeczna", color: "pink" },
      { icon: "Laptop", name: "Technologia i IT", color: "violet" },
      { icon: "Truck", name: "Logistyka i Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Handel i Dystrybucja", color: "green" },
      { icon: "Briefcase", name: "Usługi dla biznesu", color: "cyan" },
      { icon: "Wrench", name: "Utrzymanie i Serwis", color: "orange" },
      { icon: "Plane", name: "Turystyka i Rekreacja", color: "blue" },
      { icon: "Ship", name: "Morski i Portowy", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Skontaktuj się z nami",
    title: "Gotowy do rekrutacji w Europie?",
    subtitle: "Otrzymaj bezpłatną i spersonalizowaną wycenę w ciągu 24 godzin",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Szybka odpowiedź",
        description: "Wycena w ciągu 24 godzin roboczych"
      },
      {
        icon: "ShieldCheck",
        title: "Bez zobowiązań",
        description: "Bezpłatnie i bez zobowiązań"
      },
      {
        icon: "Users",
        title: "Dedykowane wsparcie",
        description: "Ekspert do Twojej dyspozycji"
      },
      {
        icon: "Globe",
        title: "Pokrycie europejskie",
        description: "27 dostępnych krajów"
      }
    ],
    form: {
      fields: {
        name: { label: "Imię i nazwisko", placeholder: "Jan Kowalski" },
        email: { label: "Email służbowy", placeholder: "jan.kowalski@firma.pl" },
        phone: { label: "Telefon", placeholder: "+48 123 456 789" },
        company: { label: "Firma", placeholder: "Nazwa Twojej firmy" },
        contactType: {
          label: "Typ kontaktu",
          placeholder: "Wybierz swój profil",
          options: {
            client: "Jestem klientem (firma poszukująca pracowników)",
            agency: "Jestem agencją rekrutacyjną",
            interim: "Jestem pracownikiem tymczasowym",
            other: "Inne"
          }
        },
        needType: { 
          label: "Rodzaj potrzeby", 
          placeholder: "Wybierz swoją potrzebę",
          options: [
            "Europejska praca tymczasowa",
            "Wyspecjalizowana rekrutacja",
            "Doradztwo i Zgodność",
            "Inna potrzeba"
          ]
        },
        message: { label: "Opisz swoją potrzebę", placeholder: "Np.: Poszukiwanie 10 murarzy na budowę 6-miesięczną w regionie Warszawy..." }
      },
      ctaLabel: "Wyślij moje zapytanie",
      securityNote: "🔒 Twoje dane są chronione i nigdy nie będą udostępniane osobom trzecim",
      successMessage: "Dziękujemy! Otrzymaliśmy Twoje zapytanie i skontaktujemy się w ciągu 24 godzin."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Twój partner w rekrutacji w Europie"
    },
    columns: {
      services: {
        title: "Usługi",
        links: [
          { label: "Europejska Praca Tymczasowa", href: "/usluga/europejska-praca-tymczasowa" },
          { label: "Wyspecjalizowana Rekrutacja", href: "/usluga/wyspecjalizowana-rekrutacja" },
          { label: "Delegowanie Pracowników", href: "/usluga/delegowanie-pracownikow" },
          { label: "Doradztwo i Zgodność", href: "/usluga/doradztwo-zgodnosc" }
        ]
      },
      company: {
        title: "Firma",
        links: [
          { label: "O nas", href: "/o-nas" },
          { label: "Nasza sieć", href: "/nasza-siec" },
          { label: "Nasze sektory", href: "/nasze-sektory" },
          { label: "Opinie", href: "/opinie" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Francja",
        phone: "+33 6 50 62 25 24",
        email: "contact@yojob.fr"
      }
    },
    social: {
      linkedin: "https://linkedin.com/company/yojob",
      twitter: "https://twitter.com/yojob",
      facebook: "https://facebook.com/yojob"
    },
    bottom: {
      copyright: "© 2025 YOJOB. Wszelkie prawa zastrzeżone.",
      madeWith: "Stworzone z ❤️, aby ułatwić rekrutację europejską",
      legalLinks: [
        { label: "Informacje prawne", href: "/informacje-prawne" },
        { label: "OWH", href: "/cgv" },
        { label: "Polityka prywatności", href: "/prywatnosc" }
      ]
    }
  }
};
