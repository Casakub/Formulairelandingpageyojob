/**
 * 🇳🇴 NORSK OVERSETTELSER - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const noLandingPage: LandingPageContent = {
  language: 'no',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Leder i Europeisk Rekruttering - Vikarer og faste kontrakter i 27 land",
    metaDescription: "Tilgang til over 500 rekrutteringsbyråer i 27 europeiske land. Vikarer, faste kontrakter, utplassering av medarbeidere: YOJOB forenkler internasjonal rekruttering.",
    slug: "/",
    h1: "Leder i Europeisk Rekruttering",
    ogTitle: "YOJOB - Din partner for rekruttering i Europa",
    ogDescription: "Forenklet europeisk rekruttering: over 500 byråer, 27 land, alle formaliteter håndtert.",
    altTexts: {
      heroVisual: "Interaktivt kart over Europa som viser YOJOB-nettverket",
      europeMap: "Kart over de 27 europeiske landene som YOJOB dekker",
      logoFooter: "YOJOB logo - Europeisk rekruttering",
    },
    aiSummary: "YOJOB er den ledende franske megleren for europeisk rekruttering med et nettverk av over 500 partnere i 27 land. Vi letter europeisk vikarbyrå, spesialisert rekruttering, utplassering av medarbeidere og tilbyr rådgivning om overholdelse. Vår ekspertise gjør det mulig for bedrifter å rekruttere medarbeidere raskt og lovlig over hele Europa med fullstendig håndtering av administrative formaliteter.",
    faq: [
      {
        question: "Hva er YOJOB?",
        answer: "YOJOB er en europeisk rekrutteringsmegler som forbinder franske bedrifter med et nettverk av over 500 byråer i 27 europeiske land for å lette vikarbyrå, rekruttering og utplassering av medarbeidere."
      },
      {
        question: "Hvilke land er dere aktive i?",
        answer: "Vi dekker 27 land i Den europeiske union pluss Norge, det vil si full dekning av Vest-, Nord-, Sør- og Øst-Europa."
      },
      {
        question: "Hvilke typer rekruttering tilbyr dere?",
        answer: "Vi tilbyr europeisk vikarbyrå, rekruttering med midlertidig/fast kontrakt, utplassering av medarbeidere og rådgivning om overholdelse for å sikre lovlig etterlevelse."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Hjem",
      services: "Tjenester",
      network: "Nettverk",
      contact: "Kontakt"
    },
    cta: "Be om tilbud",
    survey: "Europeisk undersøkelse"
  },

  // Hero Section
  hero: {
    badge: "⭐ Leder i Europeisk Rekruttering",
    title: "Rekrutter over hele Europa takket være vårt nettverk med over 500 partnerbyråer",
    subtitle: "Vikarer, faste kontrakter, utplassering: tilgang til de beste europeiske talentene. Vi håndterer alle formaliteter for deg.",
    benefits: [
      "27 dekkede europeiske land",
      "Over 500 sertifiserte byråer",
      "Fullstendig administrativ håndtering",
      "Garantert overholdelse"
    ],
    ctaPrimaryLabel: "Få et gratis tilbud",
    ctaSecondaryLabel: "Oppdag våre tjenester",
    stats: {
      agencies: { value: "500+", label: "partnerbyråer" },
      countries: { value: "27", label: "europeiske land" },
      missions: { value: "2000+", label: "vellykkede oppdrag" }
    },
    floatingCards: {
      since: { label: "Siden", value: "2014" },
      expertise: { value: "10 år", label: "Ledende ekspertise" },
      partners: { label: "Partnere", value: "Over 500 sertifiserte byråer" },
      countries: { value: "27", label: "Europeiske land" },
      certified: { value: "500+", label: "Sertifiserte byråer" },
      activeNetwork: "Aktivt nettverk"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Våre Nøkkeltall",
    title: "Anerkjent ekspertise i Europa",
    items: [
      { value: "10", label: "års erfaring", icon: "Target" },
      { value: "27", label: "dekkede land", icon: "Globe" },
      { value: "500", label: "partnerbyråer", icon: "Network" },
      { value: "2000", label: "gjennomførte oppdrag", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Våre Tjenester",
    title: "Rekrutteringsløsninger tilpasset dine behov",
    subtitle: "Enten du søker vikarer, fast eller utplassert personell, har vi løsningen",
    services: [
      {
        icon: "Users",
        title: "Europeisk Vikarbyrå",
        description: "Rekrutter kvalifiserte vikarer over hele Europa. Vi håndterer alle administrative formaliteter.",
        linkLabel: "Les mer",
        href: "/tjeneste/europeisk-vikarbyra"
      },
      {
        icon: "Target",
        title: "Spesialisert Rekruttering",
        description: "Finn de beste talentene for dine stillinger med midlertidig/fast kontrakt takket være vårt nettverk av europeiske eksperter.",
        linkLabel: "Les mer",
        href: "/tjeneste/spesialisert-rekruttering"
      },
      {
        icon: "ShieldCheck",
        title: "Rådgivning og Overholdelse",
        description: "Sikre overholdelse av alle europeiske regler angående utplassering og mobilitet.",
        linkLabel: "Les mer",
        href: "/tjeneste/raadgivning-overholdelse"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Europeisk Nettverk",
    title: "27 land, over 500 sertifiserte partnerbyråer",
    subtitle: "Vår styrke: et tett og kvalifisert nettverk over hele Europa",
    mapLabel: "partnerbyråer",
    waitlist: {
      badge: "🚀 Nytt 2025",
      title: "Europeisk byrå-markedsplass",
      subtitle: "Snart: sammenlign og kontakt byråer fra vårt nettverk direkte",
      features: [
        "✓ Flerkriterier søk (land, sektor, yrke)",
        "✓ Øyeblikkelig byrå-sammenligning",
        "✓ Verifiserte kundeanmeldelser",
        "✓ Direkte og sikker kontakt"
      ],
      formTitle: "Vær blant de første!",
      formSubtitle: "Registrer deg på ventelisten for tidlig tilgang",
      emailPlaceholder: "din@epost.no",
      ctaLabel: "Bli med på ventelisten",
      securityNote: "🔒 Dine data er trygge og vil aldri bli delt",
      successMessage: "Takk! Du er registrert på ventelisten. Vi kontakter deg så snart vi åpner."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Slik fungerer det",
    title: "Europeisk rekruttering, forenklet i 4 trinn",
    subtitle: "En klar og effektiv prosess for din rekruttering",
    steps: [
      {
        number: "01",
        title: "Beskriv ditt behov",
        description: "Del dine rekrutteringsbehov med oss: yrke, antall stillinger, varighet, nødvendige kvalifikasjoner.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Vi aktiverer vårt nettverk",
        description: "Våre partnerbyråer over hele Europa identifiserer og velger ut de beste tilgjengelige profilene.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Godkjenn kandidatene",
        description: "Du mottar forhåndsutvalgte CV-er og gjennomfører intervjuer med kandidatene som interesserer deg.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Ønsk teamet ditt velkommen",
        description: "De utvalgte kandidatene blir med i teamene dine. Vi håndterer alle administrative og juridiske formaliteter.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Anmeldelser",
    title: "De stoler på oss",
    subtitle: "Opplev våre kunders erfaringer",
    testimonials: [
      {
        name: "Ole Hansen",
        position: "Personaldirektør",
        company: "TechBuild Norge",
        quote: "Takket være YOJOB kunne vi rekruttere 15 kvalifiserte polske murere på 3 uker. Profesjonell og effektiv tjeneste!",
        rating: 5,
        sector: "Bygg og Anlegg"
      },
      {
        name: "Ingrid Berg",
        position: "HR-sjef",
        company: "AgroNorge",
        quote: "Administrativ håndtering er en reell hodepine ved internasjonal rekruttering. YOJOB tar seg av alt, det er en enorm tidsbesparelse.",
        rating: 5,
        sector: "Matindustri"
      },
      {
        name: "Lars Johansen",
        position: "Produksjonssjef",
        company: "AutoParts Europa",
        quote: "Utmerket støtte! Vi fant spesialiserte teknikere i Tyskland som vi aldri kunne ha rekruttert selv.",
        rating: 5,
        sector: "Industri"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Aktivitetsområder",
    title: "Vi rekrutterer innen alle sektorer",
    subtitle: "Vårt nettverk dekker alle yrker og industrisektorer",
    sectors: [
      { icon: "Building2", name: "Bygg og Anlegg", color: "orange" },
      { icon: "Factory", name: "Industri", color: "blue" },
      { icon: "Tractor", name: "Landbruk", color: "green" },
      { icon: "UtensilsCrossed", name: "Restaurant og Hotell", color: "red" },
      { icon: "Heart", name: "Helse og Omsorg", color: "pink" },
      { icon: "Laptop", name: "Teknologi og IT", color: "violet" },
      { icon: "Truck", name: "Logistikk og Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Handel og Distribusjon", color: "green" },
      { icon: "Briefcase", name: "Forretningstjenester", color: "cyan" },
      { icon: "Wrench", name: "Vedlikehold og Service", color: "orange" },
      { icon: "Plane", name: "Turisme og Fritid", color: "blue" },
      { icon: "Ship", name: "Maritime og Havnetjenester", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontakt oss",
    title: "Klar til å rekruttere i Europa?",
    subtitle: "Få et gratis og personlig tilbud innen 24 timer",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Rask respons",
        description: "Tilbud innen 24 arbeidstimer"
      },
      {
        icon: "ShieldCheck",
        title: "Uten forpliktelser",
        description: "Gratis og uten forpliktelser"
      },
      {
        icon: "Users",
        title: "Dedikert støtte",
        description: "En ekspert til din disposisjon"
      },
      {
        icon: "Globe",
        title: "Europeisk dekning",
        description: "27 tilgjengelige land"
      }
    ],
    form: {
      fields: {
        name: { label: "Fullt navn", placeholder: "Ole Hansen" },
        email: { label: "Arbeids-e-post", placeholder: "ole.hansen@firma.no" },
        phone: { label: "Telefon", placeholder: "+47 12 34 56 78" },
        company: { label: "Selskap", placeholder: "Ditt firmanavn" },
        contactType: {
          label: "Kontakttype",
          placeholder: "Velg din profil",
          options: {
            client: "Jeg er kunde (bedrift som søker medarbeidere)",
            agency: "Jeg er et rekrutteringsbyrå",
            interim: "Jeg er vikar",
            other: "Annet"
          }
        },
        needType: { 
          label: "Type behov", 
          placeholder: "Velg ditt behov",
          options: [
            "Europeisk vikarbyrå",
            "Spesialisert rekruttering",
            "Rådgivning og Overholdelse",
            "Annet behov"
          ]
        },
        message: { label: "Beskriv ditt behov", placeholder: "F.eks.: Vi søker 10 murere til et 6 måneders byggeprosjekt i Oslo-området..." }
      },
      ctaLabel: "Send min forespørsel",
      securityNote: "🔒 Dine data beskyttes og vil aldri bli delt med tredjeparter",
      successMessage: "Takk! Vi har mottatt din forespørsel og kontakter deg innen 24 timer."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Din partner for rekruttering i Europa"
    },
    columns: {
      services: {
        title: "Tjenester",
        links: [
          { label: "Europeisk Vikarbyrå", href: "/tjeneste/europeisk-vikarbyra" },
          { label: "Spesialisert Rekruttering", href: "/tjeneste/spesialisert-rekruttering" },
          { label: "Utplassering av Medarbeidere", href: "/tjeneste/utplassering-medarbeidere" },
          { label: "Rådgivning og Overholdelse", href: "/tjeneste/raadgivning-overholdelse" }
        ]
      },
      company: {
        title: "Selskap",
        links: [
          { label: "Om oss", href: "/om-oss" },
          { label: "Vårt nettverk", href: "/vart-nettverk" },
          { label: "Våre sektorer", href: "/vare-sektorer" },
          { label: "Anmeldelser", href: "/anmeldelser" }
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
      copyright: "© 2026 YOJOB. Alle rettigheter reservert.",
      madeWith: "Laget med ❤️ for å lette europeisk rekruttering",
      legalLinks: [
        { label: "Juridisk informasjon", href: "/legal" },
        { label: "Vilkår", href: "/cgv" },
        { label: "Personvernpolicy", href: "/privacy" }
      ]
    }
  }
};