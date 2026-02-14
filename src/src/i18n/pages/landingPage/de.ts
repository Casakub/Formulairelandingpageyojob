/**
 * 🇩🇪 DEUTSCHE ÜBERSETZUNGEN - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const deLandingPage: LandingPageContent = {
  language: 'de',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Marktführer bei europäischer Personalbeschaffung - Zeitarbeit & unbefristete Verträge in 27 Ländern",
    metaDescription: "Zugang zu 500+ Personalvermittlungsagenturen in 27 europäischen Ländern. Zeitarbeit, unbefristete Verträge, Mitarbeiterentsendung: YOJOB vereinfacht Ihre internationale Personalbeschaffung.",
    slug: "/",
    h1: "Marktführer bei europäischer Personalbeschaffung",
    ogTitle: "YOJOB - Ihr Partner für Personalbeschaffung in Europa",
    ogDescription: "Vereinfachte europäische Personalbeschaffung: 500+ Agenturen, 27 Länder, alle Formalitäten verwaltet.",
    altTexts: {
      heroVisual: "Interaktive Karte Europas mit dem YOJOB-Netzwerk",
      europeMap: "Karte der 27 von YOJOB abgedeckten europäischen Länder",
      logoFooter: "YOJOB Logo - Europäische Personalbeschaffung",
    },
    aiSummary: "YOJOB ist der französische Marktführer im europäischen Personalvermittlungs-Brokerage mit einem Netzwerk von 500+ Partneragenturen in 27 Ländern. Wir erleichtern europäische Zeitarbeit, spezialisierte Personalbeschaffung, Mitarbeiterentsendung und bieten Compliance-Beratung. Unsere Expertise ermöglicht es Unternehmen, schnell und legal in ganz Europa zu rekrutieren, mit vollständiger Verwaltung der administrativen Formalitäten.",
    faq: [
      {
        question: "Was ist YOJOB?",
        answer: "YOJOB ist ein europäischer Personalvermittlungs-Broker, der französische Unternehmen mit einem Netzwerk von 500+ Agenturen in 27 europäischen Ländern verbindet, um Zeitarbeit, Personalbeschaffung und Mitarbeiterentsendung zu erleichtern."
      },
      {
        question: "In welchen Ländern sind Sie tätig?",
        answer: "Wir decken die 27 Länder der Europäischen Union plus Norwegen ab, was eine vollständige Abdeckung von West-, Nord-, Süd- und Osteuropa bedeutet."
      },
      {
        question: "Welche Arten von Personalbeschaffung bieten Sie an?",
        answer: "Wir bieten europäische Zeitarbeit, Rekrutierung auf unbefristeter/befristeter Basis, Mitarbeiterentsendung und Compliance-Beratung an, um die Einhaltung von Vorschriften zu gewährleisten."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      network: "Netzwerk",
      blog: "Blog",
      contact: "Kontakt"
    },
    cta: "Angebot anfordern",
    survey: "Europäische Umfrage"
  },

  // Hero Section
  hero: {
    badge: "⭐ Marktführer bei europäischer Personalbeschaffung",
    title: "Rekrutieren Sie überall in Europa dank unserem Netzwerk von 500+ Partneragenturen",
    subtitle: "Zeitarbeit, unbefristete Verträge, Entsendung: Zugang zum besten Pool europäischer Talente. Wir kümmern uns um alle Formalitäten für Sie.",
    benefits: [
      "27 europäische Länder abgedeckt",
      "500+ zertifizierte Agenturen",
      "Vollständige administrative Verwaltung",
      "Garantierte Compliance"
    ],
    ctaPrimaryLabel: "Kostenloses Angebot erhalten",
    ctaSecondaryLabel: "Unsere Dienstleistungen entdecken",
    stats: {
      agencies: { value: "500+", label: "Partneragenturen" },
      countries: { value: "27", label: "europäische Länder" },
      missions: { value: "2000+", label: "erfolgreiche Einsätze" }
    },
    floatingCards: {
      since: { label: "Seit", value: "2014" },
      expertise: { value: "10 Jahre", label: "Führende Expertise" },
      partners: { label: "Partner", value: "500+ zertifizierte Agenturen" },
      countries: { value: "27", label: "Europäische Länder" },
      certified: { value: "500+", label: "Zertifizierte Agenturen" },
      activeNetwork: "Aktives Netzwerk"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Unsere Kennzahlen",
    title: "Anerkannte Expertise in Europa",
    items: [
      { value: "10", label: "Jahre Expertise", icon: "Target" },
      { value: "27", label: "abgedeckte Länder", icon: "Globe" },
      { value: "500", label: "Partneragenturen", icon: "Network" },
      { value: "2000", label: "durchgeführte Einsätze", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Unsere Dienstleistungen",
    title: "Personalbeschaffungslösungen angepasst an Ihre Bedürfnisse",
    subtitle: "Ob Sie temporäres, permanentes oder entsandtes Personal suchen, wir haben die Lösung",
    services: [
      {
        icon: "Users",
        title: "Europäische Zeitarbeit",
        description: "Rekrutieren Sie qualifiziertes Zeitpersonal überall in Europa. Wir kümmern uns um alle administrativen Formalitäten.",
        linkLabel: "Mehr erfahren",
        href: "/service/interim-europeen"
      },
      {
        icon: "Target",
        title: "Spezialisierte Personalbeschaffung",
        description: "Finden Sie die besten Talente für Ihre unbefristeten/befristeten Positionen dank unserem europäischen Expertennetzwerk.",
        linkLabel: "Mehr erfahren",
        href: "/service/recrutement-specialise"
      },
      {
        icon: "ShieldCheck",
        title: "Beratung & Compliance",
        description: "Stellen Sie sicher, dass Sie alle europäischen Vorschriften in Bezug auf Entsendung und Mobilität einhalten.",
        linkLabel: "Mehr erfahren",
        href: "/service/conseil-conformite"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Europäisches Netzwerk",
    title: "27 Länder, 500+ zertifizierte Partneragenturen",
    subtitle: "Unsere Stärke: ein dichtes und qualifiziertes Netzwerk in ganz Europa",
    mapLabel: "Partneragenturen",
    waitlist: {
      badge: "🚀 Neuheit 2025",
      title: "Marktplatz für europäische Agenturen",
      subtitle: "Demnächst: Vergleichen Sie und kontaktieren Sie direkt die Agenturen unseres Netzwerks",
      features: [
        "✓ Multikriteriensuche (Land, Branche, Beruf)",
        "✓ Sofortiger Agenturvergleich",
        "✓ Verifizierte Kundenbewertungen",
        "✓ Direkte und sichere Kontaktaufnahme"
      ],
      formTitle: "Seien Sie unter den Ersten!",
      formSubtitle: "Melden Sie sich für die Warteliste an, um frühzeitig Zugang zu erhalten",
      emailPlaceholder: "ihre@email.com",
      ctaLabel: "Der Warteliste beitreten",
      securityNote: "🔒 Ihre Daten sind sicher und werden niemals weitergegeben",
      successMessage: "Vielen Dank! Sie sind auf der Warteliste eingetragen. Wir kontaktieren Sie bei der Eröffnung."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Wie es funktioniert",
    title: "Europäische Personalbeschaffung vereinfacht in 4 Schritten",
    subtitle: "Ein klarer und effizienter Prozess für Ihre Personalbeschaffung",
    steps: [
      {
        number: "01",
        title: "Beschreiben Sie Ihren Bedarf",
        description: "Teilen Sie uns Ihre Personalbeschaffungsbedürfnisse mit: Beruf, Anzahl der Stellen, Dauer, erforderliche Qualifikationen.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Wir aktivieren unser Netzwerk",
        description: "Unsere Partneragenturen in ganz Europa identifizieren und wählen die besten verfügbaren Profile aus.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Validieren Sie die Kandidaten",
        description: "Sie erhalten die vorausgewählten Lebensläufe und führen Vorstellungsgespräche mit den Kandidaten, die Sie interessieren.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Empfangen Sie Ihr Team",
        description: "Die ausgewählten Kandidaten schließen sich Ihren Teams an. Wir kümmern uns um alle administrativen und rechtlichen Formalitäten.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Referenzen",
    title: "Sie vertrauen uns",
    subtitle: "Entdecken Sie die Erfahrungsberichte unserer Kunden",
    testimonials: [
      {
        name: "Peter Schmidt",
        position: "HR-Direktor",
        company: "TechBuild Deutschland",
        quote: "Dank YOJOB konnten wir in 3 Wochen 15 qualifizierte polnische Maurer rekrutieren. Ein professioneller und effizienter Service!",
        rating: 5,
        sector: "Bauwesen"
      },
      {
        name: "Anna Müller",
        position: "Personalchefin",
        company: "AgroGermany",
        quote: "Die administrative Verwaltung ist ein echtes Kopfzerbrechen bei internationaler Rekrutierung. YOJOB kümmert sich um alles, das ist eine enorme Zeitersparnis.",
        rating: 5,
        sector: "Agrar- und Ernährungswirtschaft"
      },
      {
        name: "Klaus Weber",
        position: "Produktionsleiter",
        company: "AutoParts Europe",
        quote: "Ausgezeichnete Begleitung! Wir haben spezialisierte Techniker in Deutschland gefunden, die wir allein nie hätten rekrutieren können.",
        rating: 5,
        sector: "Industrie"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Tätigkeitsbereiche",
    title: "Wir rekrutieren in allen Branchen",
    subtitle: "Unser Netzwerk deckt alle Berufe und Industrien ab",
    sectors: [
      { icon: "Building2", name: "Bauwesen & Bau", color: "orange" },
      { icon: "Factory", name: "Industrie", color: "blue" },
      { icon: "Tractor", name: "Landwirtschaft", color: "green" },
      { icon: "UtensilsCrossed", name: "Hotellerie-Gastronomie", color: "red" },
      { icon: "Heart", name: "Gesundheit & Soziales", color: "pink" },
      { icon: "Laptop", name: "Tech & IT", color: "violet" },
      { icon: "Truck", name: "Logistik & Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Handel & Vertrieb", color: "green" },
      { icon: "Briefcase", name: "Unternehmensdienstleistungen", color: "cyan" },
      { icon: "Wrench", name: "Wartung & Kundendienst", color: "orange" },
      { icon: "Plane", name: "Tourismus & Freizeit", color: "blue" },
      { icon: "Ship", name: "Schifffahrt & Hafen", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontaktieren Sie uns",
    title: "Bereit, in Europa zu rekrutieren?",
    subtitle: "Erhalten Sie ein kostenloses und personalisiertes Angebot innerhalb von 24 Stunden",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Schnelle Antwort",
        description: "Angebot innerhalb von 24 Arbeitsstunden"
      },
      {
        icon: "ShieldCheck",
        title: "Unverbindlich",
        description: "Kostenlos und ohne Verpflichtung"
      },
      {
        icon: "Users",
        title: "Dedizierte Begleitung",
        description: "Ein Experte hört Ihnen zu"
      },
      {
        icon: "Globe",
        title: "Europäische Abdeckung",
        description: "27 zugängliche Länder"
      }
    ],
    form: {
      fields: {
        name: { label: "Vollständiger Name", placeholder: "Hans Müller" },
        email: { label: "Geschäftliche E-Mail", placeholder: "hans.mueller@unternehmen.de" },
        phone: { label: "Telefon", placeholder: "+49 176 12345678" },
        company: { label: "Unternehmen", placeholder: "Name Ihres Unternehmens" },
        needType: { 
          label: "Art des Bedarfs", 
          placeholder: "Wählen Sie Ihren Bedarf",
          options: [
            "Europäische Zeitarbeit",
            "Spezialisierte Personalbeschaffung",
            "Beratung & Compliance",
            "Anderer Bedarf"
          ]
        },
        message: { label: "Beschreiben Sie Ihren Bedarf", placeholder: "Z.B.: Suche nach 10 Maurern für eine 6-monatige Baustelle in der Region Paris..." }
      },
      ctaLabel: "Meine Anfrage senden",
      securityNote: "🔒 Ihre Daten sind geschützt und werden niemals an Dritte weitergegeben",
      successMessage: "Vielen Dank! Wir haben Ihre Anfrage erhalten und werden Sie innerhalb von 24 Stunden kontaktieren."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Ihr Partner für Personalbeschaffung in Europa"
    },
    columns: {
      services: {
        title: "Dienstleistungen",
        links: [
          { label: "Europäische Zeitarbeit", href: "/service/interim-europeen" },
          { label: "Spezialisierte Personalbeschaffung", href: "/service/recrutement-specialise" },
          { label: "Mitarbeiterentsendung", href: "/service/detachement-personnel" },
          { label: "Beratung & Compliance", href: "/service/conseil-conformite" }
        ]
      },
      company: {
        title: "Unternehmen",
        links: [
          { label: "Über uns", href: "/a-propos" },
          { label: "Unser Netzwerk", href: "/notre-reseau" },
          { label: "Unsere Branchen", href: "/nos-secteurs" },
          { label: "Referenzen", href: "/temoignages" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Frankreich",
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
      copyright: "© 2026 YOJOB. Alle Rechte vorbehalten.",
      madeWith: "Mit ❤️ gemacht, um europäische Personalbeschaffung zu erleichtern",
      legalLinks: [
        { label: "Impressum", href: "/legal" },
        { label: "AGB", href: "/cgv" },
        { label: "Datenschutzrichtlinie", href: "/privacy" }
      ]
    }
  }
};