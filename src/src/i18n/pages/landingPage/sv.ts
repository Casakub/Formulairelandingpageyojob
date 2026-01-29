/**
 * 🇸🇪 SVENSKA ÖVERSÄTTNINGAR - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const svLandingPage: LandingPageContent = {
  language: 'sv',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Ledare inom Europeisk Rekrytering - Inhyrd personal och fasta kontrakt i 27 länder",
    metaDescription: "Tillgång till över 500 rekryteringsbyråer i 27 europeiska länder. Inhyrd personal, fasta kontrakt, utstationering av anställda: YOJOB förenklar internationell rekrytering.",
    slug: "/",
    h1: "Ledare inom Europeisk Rekrytering",
    ogTitle: "YOJOB - Din partner för rekrytering i Europa",
    ogDescription: "Förenklad europeisk rekrytering: över 500 byråer, 27 länder, alla formaliteter hanterade.",
    altTexts: {
      heroVisual: "Interaktiv karta över Europa som visar YOJOB-nätverket",
      europeMap: "Karta över de 27 europeiska länder som YOJOB täcker",
      logoFooter: "YOJOB logotyp - Europeisk rekrytering",
    },
    aiSummary: "YOJOB är den ledande franska förmedlaren av europeisk rekrytering med ett nätverk av över 500 partnerbyråer i 27 länder. Vi underlättar europeisk inhyrning, specialiserad rekrytering, utstationering av anställda och erbjuder rådgivning om efterlevnad. Vår expertis gör det möjligt för företag att snabbt och lagligt rekrytera anställda i hela Europa med fullständig hantering av administrativa formaliteter.",
    faq: [
      {
        question: "Vad är YOJOB?",
        answer: "YOJOB är en europeisk rekryteringsförmedlare som kopplar samman franska företag med ett nätverk av över 500 byråer i 27 europeiska länder för att underlätta inhyrning, rekrytering och utstationering av anställda."
      },
      {
        question: "I vilka länder är ni verksamma?",
        answer: "Vi täcker 27 länder i Europeiska unionen plus Norge, det vill säga fullständig täckning av västra, norra, södra och östra Europa."
      },
      {
        question: "Vilka typer av rekrytering erbjuder ni?",
        answer: "Vi erbjuder europeisk inhyrning, rekrytering med tidsbegränsat/tillsvidareanställning, utstationering av anställda och rådgivning om efterlevnad för att säkerställa laglig efterlevnad."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Hem",
      services: "Tjänster",
      network: "Nätverk",
      contact: "Kontakt"
    },
    cta: "Begär offert",
    survey: "Europeisk undersökning"
  },

  // Hero Section
  hero: {
    badge: "⭐ Ledare inom Europeisk Rekrytering",
    title: "Rekrytera i hela Europa tack vare vårt nätverk med över 500 partnerbyråer",
    subtitle: "Inhyrd personal, fasta kontrakt, utstationering: tillgång till de bästa europeiska talangenerna. Vi hanterar alla formaliteter åt dig.",
    benefits: [
      "27 täckta europeiska länder",
      "Över 500 certifierade byråer",
      "Fullständig administrativ hantering",
      "Garanterad efterlevnad"
    ],
    ctaPrimaryLabel: "Få en kostnadsfri offert",
    ctaSecondaryLabel: "Upptäck våra tjänster",
    stats: {
      agencies: { value: "500+", label: "partnerbyråer" },
      countries: { value: "27", label: "europeiska länder" },
      missions: { value: "2000+", label: "framgångsrika uppdrag" }
    },
    floatingCards: {
      since: { label: "Sedan", value: "2014" },
      expertise: { value: "10 år", label: "Ledande expertis" },
      partners: { label: "Partners", value: "Över 500 certifierade byråer" },
      countries: { value: "27", label: "Europeiska länder" },
      certified: { value: "500+", label: "Certifierade byråer" },
      activeNetwork: "Aktivt nätverk"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Våra Nyckeltal",
    title: "Erkänd expertis i Europa",
    items: [
      { value: "10", label: "års erfarenhet", icon: "Target" },
      { value: "27", label: "täckta länder", icon: "Globe" },
      { value: "500", label: "partnerbyråer", icon: "Network" },
      { value: "2000", label: "genomförda uppdrag", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Våra Tjänster",
    title: "Rekryteringslösningar anpassade efter dina behov",
    subtitle: "Oavsett om du söker inhyrd, fast eller utstationerad personal har vi lösningen",
    services: [
      {
        icon: "Users",
        title: "Europeisk Inhyrning",
        description: "Rekrytera kvalificerad inhyrd personal i hela Europa. Vi hanterar alla administrativa formaliteter.",
        linkLabel: "Läs mer",
        href: "/tjanst/europeisk-inhyrning"
      },
      {
        icon: "Target",
        title: "Specialiserad Rekrytering",
        description: "Hitta de bästa talangenerna för dina positioner med tidsbegränsat/tillsvidareanställning tack vare vårt nätverk av europeiska experter.",
        linkLabel: "Läs mer",
        href: "/tjanst/specialiserad-rekrytering"
      },
      {
        icon: "ShieldCheck",
        title: "Rådgivning och Efterlevnad",
        description: "Säkerställ efterlevnad av alla europeiska regler gällande utstationering och mobilitet.",
        linkLabel: "Läs mer",
        href: "/tjanst/radgivning-efterlevnad"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Europeiskt Nätverk",
    title: "27 länder, över 500 certifierade partnerbyråer",
    subtitle: "Vår styrka: ett tätt och kvalificerat nätverk i hela Europa",
    mapLabel: "partnerbyråer",
    waitlist: {
      badge: "🚀 Nyhet 2025",
      title: "Europeisk byrå-marknadsplats",
      subtitle: "Snart: jämför och kontakta byråer från vårt nätverk direkt",
      features: [
        "✓ Flerkriteriasökning (land, sektor, yrke)",
        "✓ Omedelbar byråjämförelse",
        "✓ Verifierade kundrecensioner",
        "✓ Direkt och säker kontakt"
      ],
      formTitle: "Var bland de första!",
      formSubtitle: "Registrera dig på väntelistan för tidig åtkomst",
      emailPlaceholder: "din@epost.se",
      ctaLabel: "Gå med i väntelistan",
      securityNote: "🔒 Dina uppgifter är säkra och kommer aldrig att delas",
      successMessage: "Tack! Du är registrerad på väntelistan. Vi kontaktar dig så snart vi öppnar."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Hur det fungerar",
    title: "Europeisk rekrytering, förenklad i 4 steg",
    subtitle: "En tydlig och effektiv process för din rekrytering",
    steps: [
      {
        number: "01",
        title: "Beskriv ditt behov",
        description: "Dela med dig av dina rekryteringsbehov: yrke, antal positioner, varaktighet, nödvändiga kvalifikationer.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Vi aktiverar vårt nätverk",
        description: "Våra partnerbyråer i hela Europa identifierar och väljer ut de bästa tillgängliga profilerna.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Godkänn kandidaterna",
        description: "Du får förvalda CV:n och genomför intervjuer med de kandidater som intresserar dig.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Välkomna ditt team",
        description: "De utvalda kandidaterna ansluter sig till dina team. Vi hanterar alla administrativa och juridiska formaliteter.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Omdömen",
    title: "De litar på oss",
    subtitle: "Upptäck våra kunders erfarenheter",
    testimonials: [
      {
        name: "Erik Andersson",
        position: "Personaldirektör",
        company: "TechBuild Sverige",
        quote: "Tack vare YOJOB kunde vi rekrytera 15 kvalificerade polska murare på 3 veckor. Professionell och effektiv service!",
        rating: 5,
        sector: "Bygg"
      },
      {
        name: "Anna Svensson",
        position: "Personaldirektör",
        company: "AgroSverige",
        quote: "Administrativ hantering är en verklig huvudvärk vid internationell rekrytering. YOJOB tar hand om allt, det är en enorm tidsbesparing.",
        rating: 5,
        sector: "Livsmedelsindustri"
      },
      {
        name: "Lars Nilsson",
        position: "Produktionschef",
        company: "AutoParts Europa",
        quote: "Utmärkt support! Vi hittade specialiserade tekniker i Tyskland som vi aldrig kunde ha rekryterat själva.",
        rating: 5,
        sector: "Industri"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Verksamhetsområden",
    title: "Vi rekryterar inom alla sektorer",
    subtitle: "Vårt nätverk täcker alla yrken och industrisektorer",
    sectors: [
      { icon: "Building2", name: "Bygg och Anläggning", color: "orange" },
      { icon: "Factory", name: "Industri", color: "blue" },
      { icon: "Tractor", name: "Jordbruk", color: "green" },
      { icon: "UtensilsCrossed", name: "Restaurang och Hotell", color: "red" },
      { icon: "Heart", name: "Hälso- och sjukvård och Socialtjänst", color: "pink" },
      { icon: "Laptop", name: "Teknologi och IT", color: "violet" },
      { icon: "Truck", name: "Logistik och Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Handel och Distribution", color: "green" },
      { icon: "Briefcase", name: "Företagstjänster", color: "cyan" },
      { icon: "Wrench", name: "Underhåll och Service", color: "orange" },
      { icon: "Plane", name: "Turism och Fritid", color: "blue" },
      { icon: "Ship", name: "Maritima och Hamntjänster", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontakta oss",
    title: "Redo att rekrytera i Europa?",
    subtitle: "Få en kostnadsfri och personlig offert inom 24 timmar",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Snabbt svar",
        description: "Offert inom 24 arbetstimmar"
      },
      {
        icon: "ShieldCheck",
        title: "Utan förpliktelser",
        description: "Gratis och utan förpliktelser"
      },
      {
        icon: "Users",
        title: "Dedikerad support",
        description: "En expert till ditt förfogande"
      },
      {
        icon: "Globe",
        title: "Europeisk täckning",
        description: "27 tillgängliga länder"
      }
    ],
    form: {
      fields: {
        name: { label: "Fullständigt namn", placeholder: "Erik Andersson" },
        email: { label: "Arbets-e-post", placeholder: "erik.andersson@foretag.se" },
        phone: { label: "Telefon", placeholder: "+46 70 123 45 67" },
        company: { label: "Företag", placeholder: "Ditt företagsnamn" },
        contactType: {
          label: "Kontakttyp",
          placeholder: "Välj din profil",
          options: {
            client: "Jag är kund (företag som söker anställda)",
            agency: "Jag är en rekryteringsbyrå",
            interim: "Jag är inhyrd personal",
            other: "Annat"
          }
        },
        needType: { 
          label: "Typ av behov", 
          placeholder: "Välj ditt behov",
          options: [
            "Europeisk inhyrning",
            "Specialiserad rekrytering",
            "Rådgivning och Efterlevnad",
            "Annat behov"
          ]
        },
        message: { label: "Beskriv ditt behov", placeholder: "T.ex.: Vi söker 10 murare för ett 6 månaders byggprojekt i Stockholmsregionen..." }
      },
      ctaLabel: "Skicka min förfrågan",
      securityNote: "🔒 Dina uppgifter skyddas och kommer aldrig att delas med tredje part",
      successMessage: "Tack! Vi har tagit emot din förfrågan och kommer att kontakta dig inom 24 timmar."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Din partner för rekrytering i Europa"
    },
    columns: {
      services: {
        title: "Tjänster",
        links: [
          { label: "Europeisk Inhyrning", href: "/tjanst/europeisk-inhyrning" },
          { label: "Specialiserad Rekrytering", href: "/tjanst/specialiserad-rekrytering" },
          { label: "Utstationering av Anställda", href: "/tjanst/utstationering-anstallda" },
          { label: "Rådgivning och Efterlevnad", href: "/tjanst/radgivning-efterlevnad" }
        ]
      },
      company: {
        title: "Företag",
        links: [
          { label: "Om oss", href: "/om-oss" },
          { label: "Vårt nätverk", href: "/vart-natverk" },
          { label: "Våra sektorer", href: "/vara-sektorer" },
          { label: "Omdömen", href: "/omdomen" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Frankrike",
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
      copyright: "© 2026 YOJOB. Alla rättigheter förbehållna.",
      madeWith: "Skapad med ❤️ för att underlätta europeisk rekrytering",
      legalLinks: [
        { label: "Juridisk information", href: "/legal" },
        { label: "Villkor", href: "/cgv" },
        { label: "Integritetspolicy", href: "/privacy" }
      ]
    }
  }
};