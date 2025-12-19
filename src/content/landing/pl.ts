import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇵🇱 YOJOB Landing Page Content - Polski
 * Profesjonalne tłumaczenie z francuskiego
 */

export const landingContentPL: LandingPageContent = {
  language: 'pl',
  
  seo: {
    metaTitle: 'YOJOB - Europejska Platforma Delegowania Pracowników | 27 Krajów',
    metaDescription: 'Centralizuj swoje europejskie procedury delegowania. Bezpieczny sejf cyfrowy, procedury administracyjne online i zarządzanie ofertami pracy. 500+ agencji partnerskich w 27 krajach.',
    slug: '/',
    h1: 'Twoja platforma wszystko-w-jednym do europejskiego delegowania',
    ogTitle: 'YOJOB - Uproszczone Delegowanie Pracowników w Europie',
    ogDescription: 'Zarządzaj swoimi procedurami delegowania z YOJOB: gwarantowana zgodność, 500+ agencji partnerskich, 27 krajów europejskich.',
    altTexts: {
      heroVisual: 'Interaktywna mapa Europy pokazująca sieć YOJOB 500+ agencji w 27 krajach',
      europeMap: 'Mapa Europy z 27 krajami objętymi przez YOJOB',
      logoFooter: 'Logo YOJOB - Europejska Platforma Delegowania',
    },
    aiSummary: 'YOJOB to europejska platforma specjalizująca się w delegowaniu pracowników. Centralizuje wszystkie dokumenty i procedury administracyjne w bezpiecznym sejfie cyfrowym. Firmy mogą zarządzać swoimi ofertami pracy, przygotowywać dokumenty delegowania i zapewniać zgodność prawną w 27 krajach europejskich poprzez sieć 500+ agencji partnerskich.',
    faq: [
      {
        question: 'Czym jest YOJOB?',
        answer: 'YOJOB to europejska platforma pośrednictwa rekrutacyjnego i zarządzania delegowanymi pracownikami. Łączymy firmy z ponad 500 agencjami partnerskimi w 27 krajach europejskich.',
      },
      {
        question: 'W jakich krajach działa YOJOB?',
        answer: 'YOJOB obejmuje 27 krajów europejskich: Francja, Niemcy, Hiszpania, Włochy, Polska, Rumunia, Holandia, Belgia, Portugalia, Czechy, Węgry, Szwecja, Austria, Bułgaria, Dania, Finlandia, Słowacja, Irlandia, Chorwacja, Litwa, Słowenia, Łotwa, Estonia, Cypr, Luksemburg, Malta i Grecja.',
      },
      {
        question: 'Jak działa sejf cyfrowy?',
        answer: 'Nasz sejf cyfrowy centralizuje wszystkie Twoje dokumenty delegowania (A1, umowy, dokumenty potwierdzające) w bezpiecznej przestrzeni dostępnej 24/7.',
      },
      {
        question: 'Czy YOJOB gwarantuje zgodność prawną?',
        answer: 'Tak, YOJOB integruje europejskie regulacje dotyczące delegowanych pracowników. Nasza platforma prowadzi Cię przez obowiązkowe procedury.',
      },
      {
        question: 'Jak opublikować ofertę pracy na YOJOB?',
        answer: 'Od 2026 roku będziesz mógł publikować swoje oferty pracy bezpośrednio na naszym rynku.',
      },
      {
        question: 'Jaki jest koszt platformy YOJOB?',
        answer: 'YOJOB oferuje różne pakiety dostosowane do Twoich potrzeb. Skontaktuj się z nami, aby otrzymać spersonalizowaną ofertę.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Strona główna',
      services: 'Usługi',
      network: 'Nasza sieć',
      contact: 'Kontakt',
    },
    cta: 'Poproś o ofertę',
  },

  hero: {
    badge: '⭐ Lider rekrutacji europejskiej',
    title: 'Twój partner w rekrutacji w Europie',
    subtitle: 'Dostęp do sieci 500+ agencji zatrudnienia w 27 krajach. Uprość swoją rekrutację europejską z doświadczonym i zaufanym pośrednikiem.',
    benefits: [
      'Scentralizowane i bezpieczne dokumenty',
      'Procedury administracyjne online',
      'Zarządzanie ofertami pracy',
      'Zgodność wielokrajowa',
    ],
    ctaPrimaryLabel: 'Poproś o ofertę',
    ctaSecondaryLabel: 'Odkryj sieć',
    stats: {
      agencies: { value: '500+', label: 'agencje partnerskie' },
      countries: { value: '27', label: 'kraje europejskie' },
      missions: { value: '2000+', label: 'udane misje' },
    },
    floatingCards: {
      since: { label: 'Od', value: '2014' },
      expertise: { value: '10 lat', label: 'Wiodącej ekspertyzy' },
      partners: { label: 'Partnerzy', value: '500+ certyfikowanych agencji' },
      countries: { value: '27', label: 'Krajów europejskich' },
      certified: { value: '500+', label: 'Certyfikowanych agencji' },
      activeNetwork: 'Aktywna sieć',
    },
  },

  stats: {
    badge: '📊 Nasze kluczowe liczby',
    title: 'Uznana ekspertyza w Europie',
    items: [
      { value: '10+', label: 'lat doświadczenia', icon: 'Target' },
      { value: '27', label: 'objętych krajów', icon: 'Globe' },
      { value: '500+', label: 'agencji partnerskich', icon: 'Network' },
      { value: '2000+', label: 'zrealizowanych misji', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Nasze usługi',
    title: 'Rozwiązania dostosowane do Twoich potrzeb',
    subtitle: 'Wspieramy Cię we wszystkich procedurach rekrutacji europejskiej.',
    services: [
      {
        icon: 'Users',
        title: 'Europejska praca tymczasowa',
        description: 'Rekrutacja personelu tymczasowego w całej Europie z pełną obsługą formalności.',
        linkLabel: 'Dowiedz się więcej',
      },
      {
        icon: 'Target',
        title: 'Specjalistyczna rekrutacja',
        description: 'Znajdź talenty, których potrzebujesz dzięki naszej sieci ekspertów sektorowych.',
        linkLabel: 'Dowiedz się więcej',
      },
      {
        icon: 'ShieldCheck',
        title: 'Doradztwo i Zgodność',
        description: 'Zapewnij zgodność ze wszystkimi europejskimi regulacjami dotyczącymi delegowania.',
        linkLabel: 'Dowiedz się więcej',
      },
    ],
  },

  network: {
    badge: '🌍 Sieć Europejska',
    title: 'Sieć obejmująca całą Europę',
    subtitle: 'Ponad 500 agencji partnerskich w 27 krajach, aby spełnić wszystkie Twoje potrzeby rekrutacyjne.',
    mapLabel: 'agencje partnerskie',
    waitlist: {
      badge: '✨ Nowość 2026',
      title: 'Twoja platforma wszystko-w-jednym do europejskiego delegowania',
      subtitle: 'Scentralizuj wszystkie swoje dokumenty i dane delegowania w bezpiecznej przestrzeni. Wykonuj swoje procedury administracyjne bezpośrednio online i zarządzaj swoimi ofertami pracy z jednego interfejsu.',
      features: [
        'Scentralizowane i bezpieczne dokumenty',
        'Procedury administracyjne online',
        'Zarządzanie ofertami pracy',
        'Zgodność wielokrajowa',
      ],
      formTitle: 'Bądź wśród pierwszych!',
      formSubtitle: 'Zapisz się na listę oczekujących i otrzymaj priorytetowy dostęp',
      emailPlaceholder: 'Twój służbowy adres e-mail',
      ctaLabel: 'Dołącz do listy oczekujących',
      securityNote: '🔒 Twoje dane są bezpieczne i nigdy nie będą udostępniane.',
      successMessage: 'Dziękujemy! Jesteś na liście oczekujących.',
    },
  },

  steps: {
    badge: '🎯 Jak to działa',
    title: 'Prosty i efektywny proces',
    subtitle: 'W 4 krokach znajdź talenty, których potrzebujesz w całej Europie.',
    steps: [
      {
        number: '01',
        title: 'Opisz swoje potrzeby',
        description: 'Podziel się z nami swoimi potrzebami rekrutacyjnymi: profile, umiejętności, lokalizacja i czas trwania.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Aktywujemy naszą sieć',
        description: 'Nasze agencje partnerskie w całej Europie szukają dla Ciebie najlepszych kandydatów.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Zatwierdź kandydatów',
        description: 'Przedstawiamy Ci selekcję wykwalifikowanych profili, które możesz ocenić.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Powitaj swój zespół',
        description: 'Zajmujemy się wszystkimi formalnościami administracyjnymi, abyś mógł skupić się na tym, co najważniejsze.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Opinie',
    title: 'Oni nam ufają',
    subtitle: 'Odkryj opinie naszych klientów w całej Europie.',
    testimonials: [
      {
        name: 'Piotr Kowalski',
        position: 'Dyrektor HR',
        company: 'Budownictwo Polska',
        quote: 'YOJOB umożliwił nam rekrutację 50 wykwalifikowanych pracowników w Polsce w zaledwie 3 tygodnie. Znacząca oszczędność czasu i nienagannamanagement administracyjny.',
        rating: 5,
        sector: 'Budownictwo',
      },
      {
        name: 'Sophie Martin',
        position: 'Menedżer Mobilności',
        company: 'IndusTech Niemcy',
        quote: 'Europejska sieć YOJOB jest imponująca. Udało nam się rozszerzyć nasze operacje na 5 krajów z eksperckim wsparciem na każdym etapie.',
        rating: 5,
        sector: 'Przemysł',
      },
      {
        name: 'Antonio Silva',
        position: 'CEO',
        company: 'AgriPro Portugalia',
        quote: 'Wreszcie rozwiązanie, które naprawdę upraszcza rekrutację transgraniczną. Gwarantowana zgodność i dotrzymane terminy.',
        rating: 5,
        sector: 'Rolnictwo',
      },
    ],
  },

  sectors: {
    badge: '🏭 Sektory działalności',
    title: 'Działamy we wszystkich sektorach',
    subtitle: 'Nasza ekspertyza obejmuje wszystkie europejskie sektory działalności.',
    sectors: [
      { icon: 'Building2', name: 'Budownictwo i Konstrukcje', color: 'orange' },
      { icon: 'Factory', name: 'Przemysł i Logistyka', color: 'blue' },
      { icon: 'Tractor', name: 'Rolnictwo i Winiarstwo', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Hotelarstwo i Gastronomia', color: 'red' },
      { icon: 'Heart', name: 'Zdrowie i Medycyna', color: 'pink' },
      { icon: 'Laptop', name: 'Usługi i IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Skontaktuj się',
    title: 'Gotowy do rekrutacji w Europie?',
    subtitle: 'Opowiedz nam o swoim projekcie i otrzymaj spersonalizowaną ofertę w ciągu 24 godzin.',
    benefits: [
      {
        icon: 'Users',
        title: 'Spersonalizowane wsparcie',
        description: 'Dedykowany ekspert dla Twojego projektu',
      },
      {
        icon: 'ShieldCheck',
        title: 'Gwarantowana zgodność',
        description: 'Zgodność ze wszystkimi regulacjami',
      },
      {
        icon: 'Globe',
        title: 'Pokrycie europejskie',
        description: '27 krajów natychmiast dostępnych',
      },
      {
        icon: 'CheckCircle',
        title: 'Maksymalna reaktywność',
        description: 'Odpowiedź w ciągu 24 godzin roboczych',
      },
    ],
    form: {
      fields: {
        name: { label: 'Pełne imię i nazwisko', placeholder: 'Jan Kowalski' },
        email: { label: 'E-mail służbowy', placeholder: 'jan.kowalski@firma.pl' },
        phone: { label: 'Telefon', placeholder: '+48 22 123 4567' },
        company: { label: 'Firma', placeholder: 'Nazwa Twojej firmy' },
        needType: { label: 'Rodzaj potrzeby', placeholder: 'Wybierz rodzaj potrzeby' },
        message: { label: 'Opisz swoje potrzeby', placeholder: 'Powiedz nam o swoim europejskim projekcie rekrutacyjnym...' },
      },
      ctaLabel: 'Wyślij zapytanie',
      securityNote: '🔒 Twoje dane są bezpieczne i nigdy nie będą udostępniane.',
      successMessage: 'Dziękujemy! Skontaktujemy się w ciągu 24 godzin.',
    },
  },

  footer: {
    logo: {
      tagline: 'Twój zaufany partner w rekrutacji europejskiej',
    },
    columns: {
      services: {
        title: 'Usługi',
        links: [
          { label: 'Praca tymczasowa w Europie', href: '/services/interim-europeen' },
          { label: 'Wyspecjalizowana rekrutacja', href: '/services/recrutement-specialise' },
          { label: 'Doradztwo i zgodność', href: '/services/conseil-conformite' },
          { label: 'Delegowanie pracowników', href: '/services/detachement-personnel' },
        ],
      },
      company: {
        title: 'Firma',
        links: [
          { label: 'O nas', href: '#about' },
          { label: 'Nasza sieć', href: '#reseau' },
          { label: 'Nasze sektory', href: '#secteurs' },
          { label: 'Opinie', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Kontakt',
        address: '123 Avenue de l\'Europe, 75001 Paryż, Francja',
        phone: '+33 1 23 45 67 89',
        email: 'contact@yojob.fr',
      },
    },
    social: {
      linkedin: 'https://linkedin.com/company/yojob',
      twitter: 'https://twitter.com/yojob',
      facebook: 'https://facebook.com/yojob',
    },
    bottom: {
      copyright: '© 2026 YOJOB. Wszelkie prawa zastrzeżone. Stworzone z ❤️ w Europie.',
      legalLinks: [
        { label: 'Informacje prawne', href: '#mentions' },
        { label: 'Prywatność', href: '#privacy' },
        { label: 'Warunki', href: '#cgv' },
      ],
    },
  },
};