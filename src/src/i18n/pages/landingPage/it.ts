/**
 * 🇮🇹 TRADUZIONI ITALIANE - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const itLandingPage: LandingPageContent = {
  language: 'it',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Leader nel reclutamento europeo - Lavoro interinale e contratti a tempo indeterminato in 27 paesi",
    metaDescription: "Accedi a oltre 500 agenzie di reclutamento in 27 paesi europei. Lavoro interinale, contratti a tempo indeterminato, distacco di personale: YOJOB semplifica le tue assunzioni internazionali.",
    slug: "/",
    h1: "Leader nel reclutamento europeo",
    ogTitle: "YOJOB - Il tuo partner per il reclutamento in Europa",
    ogDescription: "Reclutamento europeo semplificato: oltre 500 agenzie, 27 paesi, tutte le formalità gestite.",
    altTexts: {
      heroVisual: "Mappa interattiva dell'Europa che mostra la rete YOJOB",
      europeMap: "Mappa dei 27 paesi europei coperti da YOJOB",
      logoFooter: "Logo YOJOB - Reclutamento europeo",
    },
    aiSummary: "YOJOB è il leader francese nell'intermediazione di reclutamento europeo, con una rete di oltre 500 agenzie partner in 27 paesi. Facilitiamo il lavoro interinale europeo, il reclutamento specializzato, il distacco di personale e offriamo consulenza sulla conformità normativa. La nostra esperienza consente alle aziende di assumere rapidamente e legalmente in tutta Europa, con una gestione completa delle formalità amministrative.",
    faq: [
      {
        question: "Cos'è YOJOB?",
        answer: "YOJOB è un intermediario di reclutamento europeo che collega le aziende francesi a una rete di oltre 500 agenzie in 27 paesi europei per facilitare il lavoro interinale, il reclutamento e il distacco di personale."
      },
      {
        question: "In quali paesi operate?",
        answer: "Copriamo i 27 paesi dell'Unione Europea più la Norvegia, ovvero una copertura completa dell'Europa occidentale, settentrionale, meridionale e orientale."
      },
      {
        question: "Che tipi di reclutamento offrite?",
        answer: "Offriamo lavoro interinale europeo, reclutamento a tempo determinato/indeterminato, distacco di personale e consulenza sulla conformità per garantire il rispetto delle normative."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Home",
      services: "Servizi",
      network: "Rete",
      contact: "Contatto"
    },
    cta: "Richiedi un preventivo",
    survey: "Sondaggio Europeo"
  },

  // Hero Section
  hero: {
    badge: "⭐ Leader nel reclutamento europeo",
    title: "Assumi in tutta Europa grazie alla nostra rete di oltre 500 agenzie partner",
    subtitle: "Lavoro interinale, contratti a tempo indeterminato, distacco: accedi ai migliori talenti europei. Gestiamo tutte le formalità per te.",
    benefits: [
      "27 paesi europei coperti",
      "Oltre 500 agenzie certificate",
      "Gestione amministrativa completa",
      "Conformità garantita"
    ],
    ctaPrimaryLabel: "Ottieni un preventivo gratuito",
    ctaSecondaryLabel: "Scopri i nostri servizi",
    stats: {
      agencies: { value: "500+", label: "agenzie partner" },
      countries: { value: "27", label: "paesi europei" },
      missions: { value: "2000+", label: "missioni di successo" }
    },
    floatingCards: {
      since: { label: "Dal", value: "2014" },
      expertise: { value: "10 anni", label: "Di esperienza leader" },
      partners: { label: "Partner", value: "Oltre 500 agenzie certificate" },
      countries: { value: "27", label: "Paesi europei" },
      certified: { value: "500+", label: "Agenzie certificate" },
      activeNetwork: "Rete attiva"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 I Nostri Numeri Chiave",
    title: "Un'esperienza riconosciuta in Europa",
    items: [
      { value: "10", label: "anni di esperienza", icon: "Target" },
      { value: "27", label: "paesi coperti", icon: "Globe" },
      { value: "500", label: "agenzie partner", icon: "Network" },
      { value: "2000", label: "missioni realizzate", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 I Nostri Servizi",
    title: "Soluzioni di reclutamento adattate alle tue esigenze",
    subtitle: "Che tu stia cercando personale temporaneo, permanente o distaccato, abbiamo la soluzione",
    services: [
      {
        icon: "Users",
        title: "Lavoro Interinale Europeo",
        description: "Assumi personale temporaneo qualificato in tutta Europa. Gestiamo tutte le formalità amministrative.",
        linkLabel: "Scopri di più",
        href: "/servizio/lavoro-interinale-europeo"
      },
      {
        icon: "Target",
        title: "Reclutamento Specializzato",
        description: "Trova i migliori talenti per le tue posizioni a tempo determinato/indeterminato grazie alla nostra rete europea di esperti.",
        linkLabel: "Scopri di più",
        href: "/servizio/reclutamento-specializzato"
      },
      {
        icon: "ShieldCheck",
        title: "Consulenza e Conformità",
        description: "Assicurati di rispettare tutte le normative europee in materia di distacco e mobilità.",
        linkLabel: "Scopri di più",
        href: "/servizio/consulenza-conformita"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Rete Europea",
    title: "27 paesi, oltre 500 agenzie partner certificate",
    subtitle: "La nostra forza: una rete densa e qualificata in tutta Europa",
    mapLabel: "agenzie partner",
    waitlist: {
      badge: "🚀 Novità 2025",
      title: "Marketplace di agenzie europee",
      subtitle: "Prossimamente: confronta e contatta direttamente le agenzie della nostra rete",
      features: [
        "✓ Ricerca multicriterio (paese, settore, professione)",
        "✓ Confronto istantaneo delle agenzie",
        "✓ Recensioni clienti verificate",
        "✓ Connessione diretta e sicura"
      ],
      formTitle: "Sii tra i primi!",
      formSubtitle: "Iscriviti alla lista d'attesa per accedere in anteprima",
      emailPlaceholder: "tua@email.it",
      ctaLabel: "Unisciti alla lista d'attesa",
      securityNote: "🔒 I tuoi dati sono sicuri e non saranno mai condivisi",
      successMessage: "Grazie! Sei iscritto alla lista d'attesa. Ti contatteremo non appena apriremo."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Come funziona",
    title: "Reclutamento europeo semplificato in 4 passaggi",
    subtitle: "Un processo chiaro ed efficace per le tue assunzioni",
    steps: [
      {
        number: "01",
        title: "Descrivi la tua esigenza",
        description: "Condividi con noi le tue esigenze di reclutamento: professione, numero di posizioni, durata, qualifiche richieste.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Attiviamo la nostra rete",
        description: "Le nostre agenzie partner in tutta Europa identificano e selezionano i migliori profili disponibili.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Convalida i candidati",
        description: "Ricevi i CV preselezionati e conduci i colloqui con i candidati che ti interessano.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Accogli il tuo team",
        description: "I candidati selezionati si uniscono ai tuoi team. Gestiamo tutte le formalità amministrative e legali.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Testimonianze",
    title: "Si fidano di noi",
    subtitle: "Scopri le esperienze dei nostri clienti",
    testimonials: [
      {
        name: "Pietro Rossi",
        position: "Direttore HR",
        company: "TechBuild Italia",
        quote: "Grazie a YOJOB, abbiamo potuto assumere 15 muratori polacchi qualificati in 3 settimane. Un servizio professionale ed efficace!",
        rating: 5,
        sector: "Edilizia"
      },
      {
        name: "Sofia Bianchi",
        position: "Direttrice HR",
        company: "AgroItalia",
        quote: "La gestione amministrativa è un vero grattacapo quando si assume a livello internazionale. YOJOB si occupa di tutto, è un enorme risparmio di tempo.",
        rating: 5,
        sector: "Agroalimentare"
      },
      {
        name: "Marco Ferrari",
        position: "Responsabile Produzione",
        company: "AutoParts Europa",
        quote: "Eccellente accompagnamento! Abbiamo trovato tecnici specializzati in Germania che non avremmo mai potuto assumere da soli.",
        rating: 5,
        sector: "Industria"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Settori di attività",
    title: "Assumiamo in tutti i settori",
    subtitle: "La nostra rete copre tutte le professioni e industrie",
    sectors: [
      { icon: "Building2", name: "Edilizia e Costruzioni", color: "orange" },
      { icon: "Factory", name: "Industria", color: "blue" },
      { icon: "Tractor", name: "Agricoltura", color: "green" },
      { icon: "UtensilsCrossed", name: "Ristorazione e Ospitalità", color: "red" },
      { icon: "Heart", name: "Salute e Sociale", color: "pink" },
      { icon: "Laptop", name: "Tecnologia e IT", color: "violet" },
      { icon: "Truck", name: "Logistica e Trasporti", color: "blue" },
      { icon: "ShoppingBag", name: "Commercio e Distribuzione", color: "green" },
      { icon: "Briefcase", name: "Servizi alle imprese", color: "cyan" },
      { icon: "Wrench", name: "Manutenzione e Assistenza", color: "orange" },
      { icon: "Plane", name: "Turismo e Tempo libero", color: "blue" },
      { icon: "Ship", name: "Marittimo e Portuale", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Contattaci",
    title: "Pronto ad assumere in Europa?",
    subtitle: "Ottieni un preventivo gratuito e personalizzato in 24 ore",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Risposta rapida",
        description: "Preventivo entro 24 ore lavorative"
      },
      {
        icon: "ShieldCheck",
        title: "Senza impegno",
        description: "Gratuito e senza obblighi"
      },
      {
        icon: "Users",
        title: "Accompagnamento dedicato",
        description: "Un esperto a tua disposizione"
      },
      {
        icon: "Globe",
        title: "Copertura europea",
        description: "27 paesi accessibili"
      }
    ],
    form: {
      fields: {
        name: { label: "Nome completo", placeholder: "Mario Rossi" },
        email: { label: "Email professionale", placeholder: "mario.rossi@azienda.it" },
        phone: { label: "Telefono", placeholder: "+39 3 12 34 56 78" },
        company: { label: "Azienda", placeholder: "Nome della tua azienda" },
        contactType: {
          label: "Tipo di contatto",
          placeholder: "Seleziona il tuo profilo",
          options: {
            client: "Sono un cliente (azienda che cerca personale)",
            agency: "Sono un'agenzia di reclutamento",
            interim: "Sono un lavoratore interinale",
            other: "Altro"
          }
        },
        needType: { 
          label: "Tipo di esigenza", 
          placeholder: "Seleziona la tua esigenza",
          options: [
            "Lavoro interinale europeo",
            "Reclutamento specializzato",
            "Consulenza e Conformità",
            "Altra esigenza"
          ]
        },
        message: { label: "Descrivi la tua esigenza", placeholder: "Es: Ricerca di 10 muratori per un cantiere di 6 mesi nella regione di Milano..." }
      },
      ctaLabel: "Invia la mia richiesta",
      securityNote: "🔒 I tuoi dati sono protetti e non saranno mai condivisi con terze parti",
      successMessage: "Grazie! Abbiamo ricevuto la tua richiesta e ti contatteremo entro 24 ore."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Il tuo partner per il reclutamento in Europa"
    },
    columns: {
      services: {
        title: "Servizi",
        links: [
          { label: "Lavoro Interinale Europeo", href: "/servizio/lavoro-interinale-europeo" },
          { label: "Reclutamento Specializzato", href: "/servizio/reclutamento-specializzato" },
          { label: "Distacco di Personale", href: "/servizio/distacco-personale" },
          { label: "Consulenza e Conformità", href: "/servizio/consulenza-conformita" }
        ]
      },
      company: {
        title: "Azienda",
        links: [
          { label: "Chi siamo", href: "/chi-siamo" },
          { label: "La nostra rete", href: "/la-nostra-rete" },
          { label: "I nostri settori", href: "/i-nostri-settori" },
          { label: "Testimonianze", href: "/testimonianze" }
        ]
      },
      contact: {
        title: "Contatto",
        address: "Bordeaux, Francia",
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
      copyright: "© 2026 YOJOB. Tutti i diritti riservati.",
      madeWith: "Fatto con ❤️ per facilitare il reclutamento europeo",
      legalLinks: [
        { label: "Note legali", href: "/legal" },
        { label: "CGV", href: "/cgv" },
        { label: "Informativa sulla privacy", href: "/privacy" }
      ]
    }
  }
};