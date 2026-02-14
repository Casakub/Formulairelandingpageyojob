/**
 * 🇩🇰 DANSK OVERSÆTTELSER - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const daLandingPage: LandingPageContent = {
  language: 'da',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Leder i Europæisk Rekruttering - Vikarer og faste kontrakter i 27 lande",
    metaDescription: "Adgang til over 500 rekrutteringsbureauer i 27 europæiske lande. Vikarer, faste kontrakter, udstationering af medarbejdere: YOJOB forenkler international rekruttering.",
    slug: "/",
    h1: "Leder i Europæisk Rekruttering",
    ogTitle: "YOJOB - Din partner for rekruttering i Europa",
    ogDescription: "Forenklet europæisk rekruttering: over 500 bureauer, 27 lande, alle formaliteter håndteret.",
    altTexts: {
      heroVisual: "Interaktivt kort over Europa, der viser YOJOB-netværket",
      europeMap: "Kort over de 27 europæiske lande, som YOJOB dækker",
      logoFooter: "YOJOB logo - Europæisk rekruttering",
    },
    aiSummary: "YOJOB er den førende franske formidler af europæisk rekruttering med et netværk af over 500 partnerbureauer i 27 lande. Vi letter europæisk vikarbemanding, specialiseret rekruttering, udstationering af medarbejdere og tilbyder rådgivning om overholdelse. Vores ekspertise gør det muligt for virksomheder at rekruttere medarbejdere hurtigt og lovligt i hele Europa med fuldstændig håndtering af administrative formaliteter.",
    faq: [
      {
        question: "Hvad er YOJOB?",
        answer: "YOJOB er en europæisk rekrutteringsformidler, der forbinder franske virksomheder med et netværk af over 500 bureauer i 27 europæiske lande for at lette vikarbemanding, rekruttering og udstationering af medarbejdere."
      },
      {
        question: "I hvilke lande er I aktive?",
        answer: "Vi dækker 27 lande i Den Europæiske Union plus Norge, det vil sige fuld dækning af Vest-, Nord-, Syd- og Østeuropa."
      },
      {
        question: "Hvilke typer rekruttering tilbyder I?",
        answer: "Vi tilbyder europæisk vikarbemanding, rekruttering med tidsbegrænset/tidsubestemt kontrakt, udstationering af medarbejdere og rådgivning om overholdelse for at sikre lovlig efterlevelse."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Hjem",
      services: "Tjenester",
      network: "Netværk",
      blog: "Blog",
      contact: "Kontakt"
    },
    cta: "Anmod om tilbud",
    survey: "Europæisk undersøgelse"
  },

  // Hero Section
  hero: {
    badge: "⭐ Leder i Europæisk Rekruttering",
    title: "Rekruttér i hele Europa takket være vores netværk med over 500 partnerbureauer",
    subtitle: "Vikarer, faste kontrakter, udstationering: adgang til de bedste europæiske talenter. Vi håndterer alle formaliteter for dig.",
    benefits: [
      "27 dækkede europæiske lande",
      "Over 500 certificerede bureauer",
      "Fuldstændig administrativ håndtering",
      "Garanteret overholdelse"
    ],
    ctaPrimaryLabel: "Få et gratis tilbud",
    ctaSecondaryLabel: "Oplev vores tjenester",
    stats: {
      agencies: { value: "500+", label: "partnerbureauer" },
      countries: { value: "27", label: "europæiske lande" },
      missions: { value: "2000+", label: "succesfulde missioner" }
    },
    floatingCards: {
      since: { label: "Siden", value: "2014" },
      expertise: { value: "10 år", label: "Førende ekspertise" },
      partners: { label: "Partnere", value: "Over 500 certificerede bureauer" },
      countries: { value: "27", label: "Europæiske lande" },
      certified: { value: "500+", label: "Certificerede bureauer" },
      activeNetwork: "Aktivt netværk"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Vores Nøgletal",
    title: "Anerkendt ekspertise i Europa",
    items: [
      { value: "10", label: "års erfaring", icon: "Target" },
      { value: "27", label: "dækkede lande", icon: "Globe" },
      { value: "500", label: "partnerbureauer", icon: "Network" },
      { value: "2000", label: "gennemførte missioner", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Vores Tjenester",
    title: "Rekrutteringsløsninger tilpasset dine behov",
    subtitle: "Uanset om du søger vikarer, fast eller udstationeret personale, har vi løsningen",
    services: [
      {
        icon: "Users",
        title: "Europæisk Vikarbemanding",
        description: "Rekruttér kvalificerede vikarer i hele Europa. Vi håndterer alle administrative formaliteter.",
        linkLabel: "Læs mere",
        href: "/tjeneste/europaeisk-vikarbemanding"
      },
      {
        icon: "Target",
        title: "Specialiseret Rekruttering",
        description: "Find de bedste talenter til dine stillinger med tidsbegrænset/tidsubestemt kontrakt takket være vores netværk af europæiske eksperter.",
        linkLabel: "Læs mere",
        href: "/tjeneste/specialiseret-rekruttering"
      },
      {
        icon: "ShieldCheck",
        title: "Rådgivning og Overholdelse",
        description: "Sikr overholdelse af alle europæiske regler vedrørende udstationering og mobilitet.",
        linkLabel: "Læs mere",
        href: "/tjeneste/raadgivning-overholdelse"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Europæisk Netværk",
    title: "27 lande, over 500 certificerede partnerbureauer",
    subtitle: "Vores styrke: et tæt og kvalificeret netværk i hele Europa",
    mapLabel: "partnerbureauer",
    waitlist: {
      badge: "🚀 Nyt 2025",
      title: "Europæisk bureau-markedsplads",
      subtitle: "Snart: sammenlign og kontakt bureauer fra vores netværk direkte",
      features: [
        "✓ Flerkriterie-søgning (land, sektor, erhverv)",
        "✓ Øjeblikkelig bureausammenligning",
        "✓ Verificerede kundeanmeldelser",
        "✓ Direkte og sikker kontakt"
      ],
      formTitle: "Vær blandt de første!",
      formSubtitle: "Tilmeld dig ventelisten for tidlig adgang",
      emailPlaceholder: "din@email.dk",
      ctaLabel: "Tilmeld dig ventelisten",
      securityNote: "🔒 Dine data er sikre og vil aldrig blive delt",
      successMessage: "Tak! Du er tilmeldt ventelisten. Vi kontakter dig, så snart vi åbner."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Sådan fungerer det",
    title: "Europæisk rekruttering, forenklet i 4 trin",
    subtitle: "En klar og effektiv proces til din rekruttering",
    steps: [
      {
        number: "01",
        title: "Beskriv dit behov",
        description: "Del dine rekrutteringsbehov med os: erhverv, antal stillinger, varighed, nødvendige kvalifikationer.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Vi aktiverer vores netværk",
        description: "Vores partnerbureauer i hele Europa identificerer og udvælger de bedste tilgængelige profiler.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Godkend kandidaterne",
        description: "Du modtager forudvalgte CV'er og gennemfører interviews med de kandidater, der interesserer dig.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Velkommen dit team",
        description: "De udvalgte kandidater tilslutter sig dine teams. Vi håndterer alle administrative og juridiske formaliteter.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Anmeldelser",
    title: "De stoler på os",
    subtitle: "Oplev vores kunders erfaringer",
    testimonials: [
      {
        name: "Lars Nielsen",
        position: "Personaledirektør",
        company: "TechBuild Danmark",
        quote: "Takket være YOJOB kunne vi rekruttere 15 kvalificerede polske murere på 3 uger. Professionel og effektiv service!",
        rating: 5,
        sector: "Byggeri"
      },
      {
        name: "Anne Jensen",
        position: "Personaledirektør",
        company: "AgroDanmark",
        quote: "Administrativ håndtering er en reel hovedpine ved international rekruttering. YOJOB tager sig af alt, det er en enorm tidsbesparelse.",
        rating: 5,
        sector: "Fødevareindustri"
      },
      {
        name: "Peter Hansen",
        position: "Produktionschef",
        company: "AutoParts Europa",
        quote: "Fremragende support! Vi fandt specialiserede teknikere i Tyskland, som vi aldrig kunne have rekrutteret selv.",
        rating: 5,
        sector: "Industri"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Aktivitetsområder",
    title: "Vi rekrutterer inden for alle sektorer",
    subtitle: "Vores netværk dækker alle erhverv og industrisektorer",
    sectors: [
      { icon: "Building2", name: "Byggeri og Anlæg", color: "orange" },
      { icon: "Factory", name: "Industri", color: "blue" },
      { icon: "Tractor", name: "Landbrug", color: "green" },
      { icon: "UtensilsCrossed", name: "Restaurant og Hotel", color: "red" },
      { icon: "Heart", name: "Sundhedspleje og Socialomsorg", color: "pink" },
      { icon: "Laptop", name: "Teknologi og IT", color: "violet" },
      { icon: "Truck", name: "Logistik og Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Handel og Distribution", color: "green" },
      { icon: "Briefcase", name: "Forretningsservice", color: "cyan" },
      { icon: "Wrench", name: "Vedligeholdelse og Service", color: "orange" },
      { icon: "Plane", name: "Turisme og Fritid", color: "blue" },
      { icon: "Ship", name: "Maritime og Havnetjenester", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Kontakt os",
    title: "Klar til at rekruttere i Europa?",
    subtitle: "Få et gratis og personligt tilbud inden for 24 timer",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Hurtig respons",
        description: "Tilbud inden for 24 arbejdstimer"
      },
      {
        icon: "ShieldCheck",
        title: "Uden forpligtelser",
        description: "Gratis og uden forpligtelser"
      },
      {
        icon: "Users",
        title: "Dedikeret support",
        description: "En ekspert til din rådighed"
      },
      {
        icon: "Globe",
        title: "Europæisk dækning",
        description: "27 tilgængelige lande"
      }
    ],
    form: {
      fields: {
        name: { label: "Fulde navn", placeholder: "Lars Nielsen" },
        email: { label: "Arbejds-e-mail", placeholder: "lars.nielsen@firma.dk" },
        phone: { label: "Telefon", placeholder: "+45 12 34 56 78" },
        company: { label: "Virksomhed", placeholder: "Dit firmanavn" },
        contactType: {
          label: "Kontakttype",
          placeholder: "Vælg din profil",
          options: {
            client: "Jeg er kunde (virksomhed, der søger medarbejdere)",
            agency: "Jeg er et rekrutteringsbureau",
            interim: "Jeg er vikar",
            other: "Andet"
          }
        },
        needType: { 
          label: "Type af behov", 
          placeholder: "Vælg dit behov",
          options: [
            "Europæisk vikarbemanding",
            "Specialiseret rekruttering",
            "Rådgivning og Overholdelse",
            "Andet behov"
          ]
        },
        message: { label: "Beskriv dit behov", placeholder: "F.eks.: Vi søger 10 murere til et 6 måneders byggeprojekt i København-området..." }
      },
      ctaLabel: "Send min anmodning",
      securityNote: "🔒 Dine data beskyttes og vil aldrig blive delt med tredjeparter",
      successMessage: "Tak! Vi har modtaget din anmodning og kontakter dig inden for 24 timer."
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
          { label: "Europæisk Vikarbemanding", href: "/tjeneste/europaeisk-vikarbemanding" },
          { label: "Specialiseret Rekruttering", href: "/tjeneste/specialiseret-rekruttering" },
          { label: "Udstationering af Medarbejdere", href: "/tjeneste/udstationering-medarbejdere" },
          { label: "Rådgivning og Overholdelse", href: "/tjeneste/raadgivning-overholdelse" }
        ]
      },
      company: {
        title: "Virksomhed",
        links: [
          { label: "Om os", href: "/om-os" },
          { label: "Vores netværk", href: "/vores-netvaerk" },
          { label: "Vores sektorer", href: "/vores-sektorer" },
          { label: "Anmeldelser", href: "/anmeldelser" }
        ]
      },
      contact: {
        title: "Kontakt",
        address: "Bordeaux, Frankrig",
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
      copyright: "© 2026 YOJOB. Alle rettigheder forbeholdt.",
      madeWith: "Lavet med ❤️ for at lette europæisk rekruttering",
      legalLinks: [
        { label: "Juridisk information", href: "/legal" },
        { label: "Vilkår", href: "/cgv" },
        { label: "Privatlivspolitik", href: "/privacy" }
      ]
    }
  }
};