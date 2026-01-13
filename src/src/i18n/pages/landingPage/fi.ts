/**
 * 🇫🇮 SUOMI KÄÄNNÖKSET - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const fiLandingPage: LandingPageContent = {
  language: 'fi',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | Johtava Eurooppalainen Rekrytointi - Vuokratyö ja vakituiset sopimukset 27 maassa",
    metaDescription: "Pääsy yli 500 rekrytointitoimistoon 27 Euroopan maassa. Vuokratyö, vakituiset sopimukset, työntekijöiden lähettäminen: YOJOB yksinkertaistaa kansainvälistä rekrytointia.",
    slug: "/",
    h1: "Johtava Eurooppalainen Rekrytointi",
    ogTitle: "YOJOB - Kumppanisi rekrytointiin Euroopassa",
    ogDescription: "Yksinkertaistettu eurooppalainen rekrytointi: yli 500 toimistoa, 27 maata, kaikki muodollisuudet hoidettu.",
    altTexts: {
      heroVisual: "Interaktiivinen Euroopan kartta, joka näyttää YOJOB-verkoston",
      europeMap: "Kartta 27 Euroopan maasta, jotka YOJOB kattaa",
      logoFooter: "YOJOB logo - Eurooppalainen rekrytointi",
    },
    aiSummary: "YOJOB on johtava ranskalainen eurooppalaisen rekrytoinnin välittäjä, jolla on yli 500 kumppanirekrytointitoimiston verkosto 27 maassa. Helpotamme eurooppalaista vuokratyötä, erikoistunutta rekrytointia, työntekijöiden lähettämistä ja tarjoamme neuvontaa vaatimustenmukaisuudesta. Asiantuntemuksemme ansiosta yritykset voivat rekrytoida työntekijöitä nopeasti ja laillisesti kaikkialla Euroopassa hallinnollisten muodollisuuksien täydellisellä hoidolla.",
    faq: [
      {
        question: "Mikä on YOJOB?",
        answer: "YOJOB on eurooppalainen rekrytointivälittäjä, joka yhdistää ranskalaiset yritykset yli 500 toimiston verkkoon 27 Euroopan maassa helpottaakseen vuokratyötä, rekrytointia ja työntekijöiden lähettämistä."
      },
      {
        question: "Missä maissa toimitte?",
        answer: "Kattaamme 27 Euroopan unionin maata plus Norjan, eli täyden Länsi-, Pohjois-, Etelä- ja Itä-Euroopan kattavuuden."
      },
      {
        question: "Millaisia rekrytointityyppejä tarjoatte?",
        answer: "Tarjoamme eurooppalaista vuokratyötä, rekrytointia määräaikaisella/toistaiseksi voimassa olevalla sopimuksella, työntekijöiden lähettämistä ja neuvontaa vaatimustenmukaisuudesta lain noudattamisen varmistamiseksi."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Etusivu",
      services: "Palvelut",
      network: "Verkosto",
      contact: "Yhteystiedot"
    },
    cta: "Pyydä tarjous",
    survey: "Eurooppalainen kysely"
  },

  // Hero Section
  hero: {
    badge: "⭐ Johtava Eurooppalainen Rekrytointi",
    title: "Rekrytoi kaikkialla Euroopassa kiitos yli 500 kumppanirekrytointitoimistomme verkoston",
    subtitle: "Vuokratyö, vakituiset sopimukset, lähettäminen: pääsy parhaisiin eurooppalaisiin kykyihin. Hoidamme kaikki muodollisuudet puolestasi.",
    benefits: [
      "27 katettua Euroopan maata",
      "Yli 500 sertifioitua toimistoa",
      "Täydellinen hallinnollinen hoito",
      "Taattu vaatimustenmukaisuus"
    ],
    ctaPrimaryLabel: "Hanki ilmainen tarjous",
    ctaSecondaryLabel: "Tutustu palveluihimme",
    stats: {
      agencies: { value: "500+", label: "kumppanirekrytointitoimistoa" },
      countries: { value: "27", label: "Euroopan maata" },
      missions: { value: "2000+", label: "onnistunutta toimeksiantoa" }
    },
    floatingCards: {
      since: { label: "Vuodesta", value: "2014" },
      expertise: { value: "10 vuotta", label: "Johtavaa asiantuntemusta" },
      partners: { label: "Kumppanit", value: "Yli 500 sertifioitua toimistoa" },
      countries: { value: "27", label: "Euroopan maata" },
      certified: { value: "500+", label: "Sertifioitua toimistoa" },
      activeNetwork: "Aktiivinen verkosto"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Keskeiset Lukumme",
    title: "Tunnustettu asiantuntemus Euroopassa",
    items: [
      { value: "10", label: "vuoden kokemus", icon: "Target" },
      { value: "27", label: "katettua maata", icon: "Globe" },
      { value: "500", label: "kumppanirekrytointitoimistoa", icon: "Network" },
      { value: "2000", label: "toteutettua toimeksiantoa", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Palvelumme",
    title: "Rekrytointiratkaisut räätälöity tarpeisiisi",
    subtitle: "Etitpä vuokratyöntekijöitä, vakituista tai lähetettyä henkilöstöä, meillä on ratkaisu",
    services: [
      {
        icon: "Users",
        title: "Eurooppalainen Vuokratyö",
        description: "Rekrytoi päteviä vuokratyöntekijöitä kaikkialla Euroopassa. Hoidamme kaikki hallinnolliset muodollisuudet.",
        linkLabel: "Lue lisää",
        href: "/palvelu/eurooppalainen-vuokratyo"
      },
      {
        icon: "Target",
        title: "Erikoistunut Rekrytointi",
        description: "Löydä parhaat kyvyt tehtäviisi määräaikaisella/toistaiseksi voimassa olevalla sopimuksella kiitos eurooppalaisten asiantuntijoiden verkostomme.",
        linkLabel: "Lue lisää",
        href: "/palvelu/erikoistunut-rekrytointi"
      },
      {
        icon: "ShieldCheck",
        title: "Neuvonta ja Vaatimustenmukaisuus",
        description: "Varmista kaikkien eurooppalaisten määräysten noudattaminen lähettämiseen ja liikkuvuuteen liittyen.",
        linkLabel: "Lue lisää",
        href: "/palvelu/neuvonta-vaatimustenmukaisuus"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 Eurooppalainen Verkosto",
    title: "27 maata, yli 500 sertifioitua kumppanirekrytointitoimistoa",
    subtitle: "Vahvuutemme: tiheä ja pätevä verkosto kaikkialla Euroopassa",
    mapLabel: "kumppanirekrytointitoimistoa",
    waitlist: {
      badge: "🚀 Uutta 2025",
      title: "Eurooppalainen toimistojen kauppapaikka",
      subtitle: "Pian: vertaile ja ota yhteyttä verkostomme toimistoihin suoraan",
      features: [
        "✓ Monikriteeriä haku (maa, sektori, ammatti)",
        "✓ Välitön toimistojen vertailu",
        "✓ Vahvistetut asiakasarvostelut",
        "✓ Suora ja turvallinen yhteys"
      ],
      formTitle: "Ole ensimmäisten joukossa!",
      formSubtitle: "Rekisteröidy odotuslistalle varhaiseen pääsyyn",
      emailPlaceholder: "sinun@sahkoposti.fi",
      ctaLabel: "Liity odotuslistalle",
      securityNote: "🔒 Tietosi ovat turvassa eivätkä niitä koskaan jaeta",
      successMessage: "Kiitos! Olet rekisteröity odotuslistalle. Olemme yhteydessä sinuun heti kun avaamme."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 Miten se toimii",
    title: "Eurooppalainen rekrytointi, yksinkertaistettu 4 vaiheessa",
    subtitle: "Selkeä ja tehokas prosessi rekrytointiisi",
    steps: [
      {
        number: "01",
        title: "Kuvaile tarpeesi",
        description: "Jaa kanssamme rekrytointitarpeesi: ammatti, tehtävien määrä, kesto, tarvittavat pätevyydet.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "Aktivoimme verkostomme",
        description: "Kumppanirekrytointitoimistomme kaikkialla Euroopassa tunnistavat ja valitsevat parhaat saatavilla olevat profiilit.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Hyväksy hakijat",
        description: "Saat esivalittuja CV:itä ja teet haastatteluja sinua kiinnostavien hakijoiden kanssa.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Toivota tiimisi tervetulleeksi",
        description: "Valitut hakijat liittyvät tiimeihisi. Hoidamme kaikki hallinnolliset ja oikeudelliset muodollisuudet.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Arvostelut",
    title: "He luottavat meihin",
    subtitle: "Tutustu asiakkaidemme kokemuksiin",
    testimonials: [
      {
        name: "Matti Virtanen",
        position: "Henkilöstöjohtaja",
        company: "TechBuild Suomi",
        quote: "YOJOB:in ansiosta pystyimme rekrytoimaan 15 pätevää puolalaista muuraajaa 3 viikossa. Ammattimainen ja tehokas palvelu!",
        rating: 5,
        sector: "Rakentaminen"
      },
      {
        name: "Liisa Korhonen",
        position: "Henkilöstöjohtaja",
        company: "AgroSuomi",
        quote: "Hallinnollinen hoito on todellinen päänsärky kansainvälisessä rekrytoinnissa. YOJOB hoitaa kaiken, se on valtava ajansäästö.",
        rating: 5,
        sector: "Elintarviketeollisuus"
      },
      {
        name: "Jukka Mäkinen",
        position: "Tuotantopäällikkö",
        company: "AutoParts Europa",
        quote: "Erinomainen tuki! Löysimme erikoistuneita teknikoita Saksasta, joita emme olisi koskaan voineet rekrytoida itse.",
        rating: 5,
        sector: "Teollisuus"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Toiminta-alat",
    title: "Rekrytoimme kaikilla aloilla",
    subtitle: "Verkostomme kattaa kaikki ammatit ja teollisuudenalat",
    sectors: [
      { icon: "Building2", name: "Rakentaminen ja Julkiset Työt", color: "orange" },
      { icon: "Factory", name: "Teollisuus", color: "blue" },
      { icon: "Tractor", name: "Maatalous", color: "green" },
      { icon: "UtensilsCrossed", name: "Ravintola ja Hotelli", color: "red" },
      { icon: "Heart", name: "Terveydenhuolto ja Sosiaalihuolto", color: "pink" },
      { icon: "Laptop", name: "Teknologia ja IT", color: "violet" },
      { icon: "Truck", name: "Logistiikka ja Kuljetus", color: "blue" },
      { icon: "ShoppingBag", name: "Kauppa ja Jakelu", color: "green" },
      { icon: "Briefcase", name: "Yrityspalvelut", color: "cyan" },
      { icon: "Wrench", name: "Huolto ja Palvelu", color: "orange" },
      { icon: "Plane", name: "Matkailu ja Vapaa-aika", color: "blue" },
      { icon: "Ship", name: "Merenkulku- ja Satamapalvelut", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Ota yhteyttä",
    title: "Valmis rekrytoimaan Euroopassa?",
    subtitle: "Hanki ilmainen ja henkilökohtainen tarjous 24 tunnin kuluessa",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Nopea vastaus",
        description: "Tarjous 24 työtunnin kuluessa"
      },
      {
        icon: "ShieldCheck",
        title: "Ilman sitoumuksia",
        description: "Ilmainen ja ilman sitoumuksia"
      },
      {
        icon: "Users",
        title: "Omistettu tuki",
        description: "Asiantuntija käytettävissäsi"
      },
      {
        icon: "Globe",
        title: "Eurooppalainen kattavuus",
        description: "27 saatavilla olevaa maata"
      }
    ],
    form: {
      fields: {
        name: { label: "Koko nimi", placeholder: "Matti Virtanen" },
        email: { label: "Työsähköposti", placeholder: "matti.virtanen@yritys.fi" },
        phone: { label: "Puhelin", placeholder: "+358 40 123 4567" },
        company: { label: "Yritys", placeholder: "Yrityksesi nimi" },
        contactType: {
          label: "Yhteystietotyyppi",
          placeholder: "Valitse profiilisi",
          options: {
            client: "Olen asiakas (yritys, joka etsii työntekijöitä)",
            agency: "Olen rekrytointitoimisto",
            interim: "Olen vuokratyöntekijä",
            other: "Muu"
          }
        },
        needType: { 
          label: "Tarpeen tyyppi", 
          placeholder: "Valitse tarpeesi",
          options: [
            "Eurooppalainen vuokratyö",
            "Erikoistunut rekrytointi",
            "Neuvonta ja Vaatimustenmukaisuus",
            "Muu tarve"
          ]
        },
        message: { label: "Kuvaile tarpeesi", placeholder: "Esim.: Etsimme 10 muuraajaa 6 kuukauden rakennusprojektiin Helsingin alueella..." }
      },
      ctaLabel: "Lähetä pyyntöni",
      securityNote: "🔒 Tietosi on suojattu eikä niitä koskaan jaeta kolmansille osapuolille",
      successMessage: "Kiitos! Olemme vastaanottaneet pyyntösi ja otamme sinuun yhteyttä 24 tunnin kuluessa."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Kumppanisi rekrytointiin Euroopassa"
    },
    columns: {
      services: {
        title: "Palvelut",
        links: [
          { label: "Eurooppalainen Vuokratyö", href: "/palvelu/eurooppalainen-vuokratyo" },
          { label: "Erikoistunut Rekrytointi", href: "/palvelu/erikoistunut-rekrytointi" },
          { label: "Työntekijöiden Lähettäminen", href: "/palvelu/tyontekijoiden-lahettaminen" },
          { label: "Neuvonta ja Vaatimustenmukaisuus", href: "/palvelu/neuvonta-vaatimustenmukaisuus" }
        ]
      },
      company: {
        title: "Yritys",
        links: [
          { label: "Tietoa meistä", href: "/tietoa-meista" },
          { label: "Verkostomme", href: "/verkostomme" },
          { label: "Toimialamme", href: "/toimialamme" },
          { label: "Arvostelut", href: "/arvostelut" }
        ]
      },
      contact: {
        title: "Yhteystiedot",
        address: "Bordeaux, Ranska",
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
      copyright: "© 2026 YOJOB. Kaikki oikeudet pidätetään.",
      madeWith: "Tehty ❤️:lla eurooppalaisen rekrytoinnin helpottamiseksi",
      legalLinks: [
        { label: "Oikeudelliset tiedot", href: "/oikeudelliset-tiedot" },
        { label: "Ehdot", href: "/cgv" },
        { label: "Tietosuojakäytäntö", href: "/tietosuoja" }
      ]
    }
  }
};