/**
 * 🇳🇱 NEDERLANDSE VERTALINGEN - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const nlLandingPage: LandingPageContent = {
  language: 'nl',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Leider in Europese werving - Uitzendwerk & vaste contracten in 27 landen",
    metaDescription: "Toegang tot meer dan 500 wervingsbureaus in 27 Europese landen. Uitzendwerk, vaste contracten, detachering van personeel: YOJOB vereenvoudigt uw internationale werving.",
    slug: "/",
    h1: "Leider in Europese werving",
    ogTitle: "YOJOB - Uw partner voor werving in Europa",
    ogDescription: "Vereenvoudigde Europese werving: meer dan 500 bureaus, 27 landen, alle formaliteiten verzorgd.",
    altTexts: {
      heroVisual: "Interactieve kaart van Europa met het YOJOB-netwerk",
      europeMap: "Kaart van de 27 Europese landen gedekt door YOJOB",
      logoFooter: "YOJOB Logo - Europese werving",
    },
    aiSummary: "YOJOB is de Franse leider in Europese wervingsbemiddeling, met een netwerk van meer dan 500 partnerbureaus in 27 landen. Wij faciliteren Europees uitzendwerk, gespecialiseerde werving, detachering van personeel en bieden advies over compliance. Onze expertise stelt bedrijven in staat om snel en legaal te werven in heel Europa, met een complete afhandeling van administratieve formaliteiten.",
    faq: [
      {
        question: "Wat is YOJOB?",
        answer: "YOJOB is een Europese wervingsbemiddelaar die Franse bedrijven verbindt met een netwerk van meer dan 500 bureaus in 27 Europese landen om uitzendwerk, werving en detachering van personeel te faciliteren."
      },
      {
        question: "In welke landen werkt u?",
        answer: "Wij dekken de 27 landen van de Europese Unie plus Noorwegen, dus een volledige dekking van West-, Noord-, Zuid- en Oost-Europa."
      },
      {
        question: "Welke soorten werving biedt u aan?",
        answer: "Wij bieden Europees uitzendwerk, werving voor vaste/tijdelijke contracten, detachering van personeel en compliance-advies om naleving van regelgeving te garanderen."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Home",
      services: "Diensten",
      network: "Netwerk",
      blog: "Blog",
      contact: "Contact"
    },
    cta: "Offerte aanvragen",
    survey: "Europese Enquête"
  },

  // Hero Section
  hero: {
    badge: "⭐ Leider in Europese werving",
    title: "Werf overal in Europa dankzij ons netwerk van meer dan 500 partnerbureaus",
    subtitle: "Uitzendwerk, vaste contracten, detachering: toegang tot het beste Europese talent. Wij regelen alle formaliteiten voor u.",
    benefits: [
      "27 Europese landen gedekt",
      "Meer dan 500 gecertificeerde bureaus",
      "Volledige administratieve afhandeling",
      "Gegarandeerde compliance"
    ],
    ctaPrimaryLabel: "Gratis offerte aanvragen",
    ctaSecondaryLabel: "Ontdek onze diensten",
    stats: {
      agencies: { value: "500+", label: "partnerbureaus" },
      countries: { value: "27", label: "Europese landen" },
      missions: { value: "2000+", label: "succesvolle opdrachten" }
    },
    floatingCards: {
      since: { label: "Sinds", value: "2014" },
      expertise: { value: "10 jaar", label: "Leidende expertise" },
      partners: { label: "Partners", value: "Meer dan 500 gecertificeerde bureaus" },
      countries: { value: "27", label: "Europese landen" },
      certified: { value: "500+", label: "Gecertificeerde bureaus" },
      activeNetwork: "Actief netwerk"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Onze Belangrijkste Cijfers",
    title: "Een erkende expertise in Europa",
    items: [
      { value: "10", label: "jaar expertise", icon: "Target" },
      { value: "27", label: "gedekte landen", icon: "Globe" },
      { value: "500", label: "partnerbureaus", icon: "Network" },
      { value: "2000", label: "gerealiseerde opdrachten", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Onze Diensten",
    title: "Wervingsoplossingen aangepast aan uw behoeften",
    subtitle: "Of u nu op zoek bent naar tijdelijk, vast of gedetacheerd personeel, wij hebben de oplossing",
    services: [
      {
        icon: "Users",
        title: "Europees Uitzendwerk",
        description: "Werf gekwalificeerd tijdelijk personeel overal in Europa. Wij regelen alle administratieve formaliteiten.",
        linkLabel: "Meer weten",
        href: "/dienst/europees-uitzendwerk"
      },
      {
        icon: "Target",
        title: "Gespecialiseerde Werving",
        description: "Vind de beste talenten voor uw vaste/tijdelijke posities dankzij ons Europees netwerk van experts.",
        linkLabel: "Meer weten",
        href: "/dienst/gespecialiseerde-werving"
      },
      {
        icon: "ShieldCheck",
        title: "Advies & Compliance",
        description: "Zorg ervoor dat u alle Europese regelgeving met betrekking tot detachering en mobiliteit naleeft.",
        linkLabel: "Meer weten",
        href: "/dienst/advies-compliance"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Europees Netwerk",
    title: "27 landen, meer dan 500 gecertificeerde partnerbureaus",
    subtitle: "Onze kracht: een dicht en gekwalificeerd netwerk in heel Europa",
    mapLabel: "partnerbureaus",
    waitlist: {
      badge: "🚀 Nieuw in 2025",
      title: "Marketplace van Europese bureaus",
      subtitle: "Binnenkort: vergelijk en contacteer bureaus uit ons netwerk rechtstreeks",
      features: [
        "✓ Zoeken op meerdere criteria (land, sector, beroep)",
        "✓ Directe vergelijking van bureaus",
        "✓ Geverifieerde klantbeoordelingen",
        "✓ Directe en veilige verbinding"
      ],
      formTitle: "Wees een van de eersten!",
      formSubtitle: "Schrijf u in voor de wachtlijst voor vroege toegang",
      emailPlaceholder: "uw@email.nl",
      ctaLabel: "Doe mee aan de wachtlijst",
      securityNote: "🔒 Uw gegevens zijn veilig en worden nooit gedeeld",
      successMessage: "Bedankt! U staat op de wachtlijst. We nemen contact met u op zodra we openen."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Hoe het werkt",
    title: "Europese werving vereenvoudigd in 4 stappen",
    subtitle: "Een duidelijk en efficiënt proces voor uw werving",
    steps: [
      {
        number: "01",
        title: "Beschrijf uw behoefte",
        description: "Deel uw wervingsbehoeften met ons: beroep, aantal posities, duur, vereiste kwalificaties.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Wij activeren ons netwerk",
        description: "Onze partnerbureaus in heel Europa identificeren en selecteren de beste beschikbare profielen.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Valideer de kandidaten",
        description: "U ontvangt de voorgeselecteerde CV's en voert gesprekken met de kandidaten die u interesseren.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Verwelkom uw team",
        description: "De geselecteerde kandidaten sluiten zich aan bij uw teams. Wij regelen alle administratieve en juridische formaliteiten.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Getuigenissen",
    title: "Zij vertrouwen ons",
    subtitle: "Ontdek de ervaringen van onze klanten",
    testimonials: [
      {
        name: "Pieter van der Berg",
        position: "HR-directeur",
        company: "TechBuild Nederland",
        quote: "Dankzij YOJOB konden we 15 gekwalificeerde Poolse metselaars in 3 weken werven. Een professionele en efficiënte service!",
        rating: 5,
        sector: "Bouw"
      },
      {
        name: "Sophie de Vries",
        position: "HR-directeur",
        company: "AgroNederland",
        quote: "Administratief beheer is een echte hoofdpijn bij internationale werving. YOJOB regelt alles, het is een enorme tijdsbesparing.",
        rating: 5,
        sector: "Agro-industrie"
      },
      {
        name: "Mark Jansen",
        position: "Productiemanager",
        company: "AutoParts Europa",
        quote: "Uitstekende begeleiding! We vonden gespecialiseerde technici in Duitsland die we zelf nooit hadden kunnen werven.",
        rating: 5,
        sector: "Industrie"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Activiteitensectoren",
    title: "Wij werven in alle sectoren",
    subtitle: "Ons netwerk dekt alle beroepen en industrieën",
    sectors: [
      { icon: "Building2", name: "Bouw & Constructie", color: "orange" },
      { icon: "Factory", name: "Industrie", color: "blue" },
      { icon: "Tractor", name: "Landbouw", color: "green" },
      { icon: "UtensilsCrossed", name: "Horeca", color: "red" },
      { icon: "Heart", name: "Zorg & Welzijn", color: "pink" },
      { icon: "Laptop", name: "Tech & IT", color: "violet" },
      { icon: "Truck", name: "Logistiek & Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Handel & Distributie", color: "green" },
      { icon: "Briefcase", name: "Zakelijke diensten", color: "cyan" },
      { icon: "Wrench", name: "Onderhoud & Service", color: "orange" },
      { icon: "Plane", name: "Toerisme & Vrije tijd", color: "blue" },
      { icon: "Ship", name: "Maritiem & Haven", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Neem contact op",
    title: "Klaar om te werven in Europa?",
    subtitle: "Ontvang een gratis en gepersonaliseerde offerte binnen 24 uur",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Snelle reactie",
        description: "Offerte binnen 24 werkuren"
      },
      {
        icon: "ShieldCheck",
        title: "Vrijblijvend",
        description: "Gratis en zonder verplichting"
      },
      {
        icon: "Users",
        title: "Toegewijde begeleiding",
        description: "Een expert tot uw beschikking"
      },
      {
        icon: "Globe",
        title: "Europese dekking",
        description: "27 toegankelijke landen"
      }
    ],
    form: {
      fields: {
        name: { label: "Volledige naam", placeholder: "Jan de Vries" },
        email: { label: "Zakelijk e-mailadres", placeholder: "jan.devries@bedrijf.nl" },
        phone: { label: "Telefoon", placeholder: "+31 6 12 34 56 78" },
        company: { label: "Bedrijf", placeholder: "Naam van uw bedrijf" },
        contactType: {
          label: "Type contact",
          placeholder: "Selecteer uw profiel",
          options: {
            client: "Ik ben een klant (bedrijf dat personeel zoekt)",
            agency: "Ik ben een wervingsbureau",
            interim: "Ik ben een uitzendkracht",
            other: "Anders"
          }
        },
        needType: { 
          label: "Type behoefte", 
          placeholder: "Selecteer uw behoefte",
          options: [
            "Europees uitzendwerk",
            "Gespecialiseerde werving",
            "Advies & Compliance",
            "Andere behoefte"
          ]
        },
        message: { label: "Beschrijf uw behoefte", placeholder: "Bijv: Zoeken naar 10 metselaars voor een project van 6 maanden in de regio Amsterdam..." }
      },
      ctaLabel: "Verstuur mijn aanvraag",
      securityNote: "🔒 Uw gegevens zijn beschermd en worden nooit met derden gedeeld",
      successMessage: "Bedankt! We hebben uw aanvraag ontvangen en nemen binnen 24 uur contact met u op."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Uw partner voor werving in Europa"
    },
    columns: {
      services: {
        title: "Diensten",
        links: [
          { label: "Europees Uitzendwerk", href: "/dienst/europees-uitzendwerk" },
          { label: "Gespecialiseerde Werving", href: "/dienst/gespecialiseerde-werving" },
          { label: "Detachering van Personeel", href: "/dienst/detachering-personeel" },
          { label: "Advies & Compliance", href: "/dienst/advies-compliance" }
        ]
      },
      company: {
        title: "Bedrijf",
        links: [
          { label: "Over ons", href: "/over-ons" },
          { label: "Ons netwerk", href: "/ons-netwerk" },
          { label: "Onze sectoren", href: "/onze-sectoren" },
          { label: "Getuigenissen", href: "/getuigenissen" }
        ]
      },
      contact: {
        title: "Contact",
        address: "Bordeaux, Frankrijk",
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
      copyright: "© 2026 YOJOB. Alle rechten voorbehouden.",
      madeWith: "Gemaakt met ❤️ om Europese werving te vergemakkelijken",
      legalLinks: [
        { label: "Juridische vermeldingen", href: "/legal" },
        { label: "AVV", href: "/cgv" },
        { label: "Privacybeleid", href: "/privacy" }
      ]
    }
  }
};