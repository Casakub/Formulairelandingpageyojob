import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇫🇮 YOJOB Landing Page Content - Suomi
 * Ammattimainen käännös ranskasta
 */

export const landingContentFI: LandingPageContent = {
  language: 'fi',
  
  seo: {
    metaTitle: 'YOJOB - Eurooppalainen lähetettyjen työntekijöiden alusta | 27 maata',
    metaDescription: 'Keskitä eurooppalaiset lähetysmenettelysi. Turvallinen digitaalinen kassakaappi, verkossa tehtävät hallinnolliset menettelyt ja työpaikkailmoitusten hallinta. 500+ kumppanivirastoa 27 maassa.',
    slug: '/',
    h1: 'Kaikki yhdessä -alustasi eurooppalaiseen lähettämiseen',
    ogTitle: 'YOJOB - Yksinkertaistettu työntekijöiden lähettäminen Euroopassa',
    ogDescription: 'Hallitse lähetysmenettelyitäsi YOJOB:n avulla: taattu noudattaminen, 500+ kumppanivirastoa, 27 eurooppalaista maata.',
    altTexts: {
      heroVisual: 'Interaktiivinen Euroopan kartta, joka näyttää YOJOB-verkoston 500+ virastolla 27 maassa',
      europeMap: 'Euroopan kartta 27 maasta, jotka YOJOB kattaa',
      logoFooter: 'YOJOB-logo - Eurooppalainen lähetysalusta',
    },
    aiSummary: 'YOJOB on eurooppalainen alusta, joka on erikoistunut työntekijöiden lähettämiseen. Se keskittää kaikki asiakirjat ja hallinnolliset menettelyt turvalliseen digitaaliseen kassakaappiin. Yritykset voivat hallita työpaikkailmoituksia, valmistella lähetysasiakirjoja ja varmistaa lakisääteisen noudattamisen 27 eurooppalaisessa maassa 500+ kumppanivirastoverkoston kautta.',
    faq: [
      {
        question: 'Mikä on YOJOB?',
        answer: 'YOJOB on eurooppalainen alusta rekrytointivälitykseen ja työntekijöiden lähettämisen hallintaan. Yhdistämme yritykset yli 500 kumppanivirastoon 27 eurooppalaisessa maassa.',
      },
      {
        question: 'Missä maissa YOJOB toimii?',
        answer: 'YOJOB kattaa 27 eurooppalaista maata: Ranska, Saksa, Espanja, Italia, Puola, Romania, Alankomaat, Belgia, Portugali, Tšekki, Unkari, Ruotsi, Itävalta, Bulgaria, Tanska, Suomi, Slovakia, Irlanti, Kroatia, Liettua, Slovenia, Latvia, Viro, Kypros, Luxemburg, Malta ja Kreikka.',
      },
      {
        question: 'Miten digitaalinen kassakaappi toimii?',
        answer: 'Digitaalinen kassakaappimme keskittää kaikki lähetysasiakirjasi (A1, sopimukset, todistukset) turvalliseen tilaan, joka on saatavilla 24/7.',
      },
      {
        question: 'Takaako YOJOB lakisääteisen noudattamisen?',
        answer: 'Kyllä, YOJOB integroi eurooppalaiset työntekijöiden lähettämistä koskevat säännökset. Alustamme ohjaa sinut pakollisten menettelyjen läpi.',
      },
      {
        question: 'Miten voin julkaista työpaikkailmoituksen YOJOB:ssa?',
        answer: 'Vuodesta 2026 alkaen voit julkaista työpaikkailmoituksesi suoraan markkinapaikkallamme.',
      },
      {
        question: 'Paljonko YOJOB-alusta maksaa?',
        answer: 'YOJOB tarjoaa erilaisia paketteja, jotka on räätälöity tarpeisiisi. Ota meihin yhteyttä saadaksesi henkilökohtaisen tarjouksen.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Etusivu',
      services: 'Palvelut',
      network: 'Verkostomme',
      contact: 'Yhteystiedot',
    },
    cta: 'Pyydä tarjous',
  },

  hero: {
    badge: '⭐ Johtava eurooppalaisessa rekrytoinnissa',
    title: 'Kumppanisi rekrytointiin Euroopassa',
    subtitle: 'Pääsy 500+ työvoimatoimiston verkostoon 27 maassa. Yksinkertaista eurooppalainen rekrytointisi kokeneen ja luotettavan välittäjän avulla.',
    benefits: [
      'Keskitetyt ja turvalliset asiakirjat',
      'Verkossa tehtävät hallinnolliset menettelyt',
      'Työpaikkailmoitusten hallinta',
      'Monimainen noudattaminen',
    ],
    ctaPrimaryLabel: 'Pyydä tarjous',
    ctaSecondaryLabel: 'Tutustu verkostoon',
    stats: {
      agencies: { value: '500+', label: 'kumppanivirastoa' },
      countries: { value: '27', label: 'eurooppalaista maata' },
      missions: { value: '2000+', label: 'onnistunutta tehtävää' },
    },
    floatingCards: {
      since: { label: 'Vuodesta', value: '2014' },
      expertise: { value: '10 vuotta', label: 'Johtavaa asiantuntemusta' },
      partners: { label: 'Kumppanit', value: '500+ sertifioitua virastoa' },
      countries: { value: '27', label: 'Eurooppalaista maata' },
      certified: { value: '500+', label: 'Sertifioitua virastoa' },
      activeNetwork: 'Aktiivinen verkosto',
    },
  },

  stats: {
    badge: '📊 Keskeiset lukumme',
    title: 'Tunnustettu asiantuntemus Euroopassa',
    items: [
      { value: '10+', label: 'vuoden kokemus', icon: 'Target' },
      { value: '27', label: 'katettua maata', icon: 'Globe' },
      { value: '500+', label: 'kumppanivirastoa', icon: 'Network' },
      { value: '2000+', label: 'toteutettua tehtävää', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Palvelumme',
    title: 'Tarpeisiisi räätälöidyt ratkaisut',
    subtitle: 'Saatamme sinut kaikkien eurooppalaisten rekrytointimenettelyjen läpi.',
    services: [
      {
        icon: 'Users',
        title: 'Eurooppalainen vuokratyö',
        description: 'Tilapäisen henkilöstön rekrytointi koko Euroopassa muodollisuuksien täydellisellä hallinnalla.',
        linkLabel: 'Lue lisää',
      },
      {
        icon: 'Target',
        title: 'Erikoistunut rekrytointi',
        description: 'Löydä tarvitsemasi lahjakkuudet toimialaasiantuntijoiden verkostomme ansiosta.',
        linkLabel: 'Lue lisää',
      },
      {
        icon: 'ShieldCheck',
        title: 'Neuvonta ja noudattaminen',
        description: 'Varmista, että noudatat kaikkia eurooppalaisia lähettämistä koskevia säännöksiä.',
        linkLabel: 'Lue lisää',
      },
    ],
  },

  network: {
    badge: '🌍 Eurooppalainen verkosto',
    title: 'Koko Eurooppaa kattava verkosto',
    subtitle: 'Yli 500 kumppanivirastoa 27 maassa täyttämään kaikki rekrytointitarpeesi.',
    mapLabel: 'kumppanivirastoa',
    waitlist: {
      badge: '✨ Uutuus 2026',
      title: 'Kaikki yhdessä -alustasi eurooppalaiseen lähettämiseen',
      subtitle: 'Keskitä kaikki lähetysasiakirjasi ja -tietosi turvalliseen tilaan. Suorita hallinnolliset menettelysi suoraan verkossa ja hallitse työpaikkailmoituksiasi yhdestä käyttöliittymästä.',
      features: [
        'Keskitetyt ja turvalliset asiakirjat',
        'Verkossa tehtävät hallinnolliset menettelyt',
        'Työpaikkailmoitusten hallinta',
        'Monimainen noudattaminen',
      ],
      formTitle: 'Ole ensimmäisten joukossa!',
      formSubtitle: 'Rekisteröidy odotuslistalle ja saat etuoikeuden pääsyn',
      emailPlaceholder: 'Työpaikan sähköpostiosoitteesi',
      ctaLabel: 'Liity odotuslistalle',
      securityNote: '🔒 Tietosi ovat turvassa, eikä niitä koskaan jaeta.',
      successMessage: 'Kiitos! Olet odotuslistalla.',
    },
  },

  steps: {
    badge: '🎯 Miten se toimii',
    title: 'Yksinkertainen ja tehokas prosessi',
    subtitle: '4 askeleessa löydät tarvitsemasi lahjakkuudet koko Euroopassa.',
    steps: [
      {
        number: '01',
        title: 'Kuvaile tarpeesi',
        description: 'Jaa rekrytointitarpeesi kanssamme: profiilit, taidot, sijainti ja kesto.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Aktivoimme verkostomme',
        description: 'Kumppanivirastomme ympäri Eurooppaa etsivät parhaat ehdokkaat sinulle.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Hyväksy ehdokkaat',
        description: 'Esittelemme sinulle valikoiman päteviä profiileja, jotka voit arvioida.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Toivota tiimisi tervetulleeksi',
        description: 'Hoidamme kaikki hallinnolliset muodollisuudet, jotta voit keskittyä olennaiseen.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Arvostelut',
    title: 'He luottavat meihin',
    subtitle: 'Tutustu asiakkaidemme palautteeseen ympäri Eurooppaa.',
    testimonials: [
      {
        name: 'Matti Virtanen',
        position: 'HR-johtaja',
        company: 'Rakennus Suomi',
        quote: 'YOJOB:n ansiosta pystyimme rekrytoimaan 50 pätevää työntekijää Puolasta vain 3 viikossa. Merkittävä ajansäästö ja moitteeton hallinnollinen hoito.',
        rating: 5,
        sector: 'Rakentaminen',
      },
      {
        name: 'Maria Korhonen',
        position: 'Liikkuvuusjohtaja',
        company: 'IndusTech Saksa',
        quote: 'YOJOB:n eurooppalainen verkosto on vaikuttava. Onnistuimme laajentamaan toimintaamme 5 maahan asiantuntija-avun kanssa jokaisessa vaiheessa.',
        rating: 5,
        sector: 'Teollisuus',
      },
      {
        name: 'Antonio Silva',
        position: 'Toimitusjohtaja',
        company: 'AgriPro Portugali',
        quote: 'Vihdoinkin ratkaisu, joka todella yksinkertaistaa rajat ylittävää rekrytointia. Taattu noudattaminen ja määräaikojen noudattaminen.',
        rating: 5,
        sector: 'Maatalous',
      },
    ],
  },

  sectors: {
    badge: '🏭 Toimialat',
    title: 'Toimimme kaikilla aloilla',
    subtitle: 'Asiantuntemuksemme kattaa kaikki eurooppalaiset toimialat.',
    sectors: [
      { icon: 'Building2', name: 'Rakentaminen ja työt', color: 'orange' },
      { icon: 'Factory', name: 'Teollisuus ja logistiikka', color: 'blue' },
      { icon: 'Tractor', name: 'Maatalous ja viininviljely', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Ravintola-ala ja hotellit', color: 'red' },
      { icon: 'Heart', name: 'Terveydenhuolto ja lääketiede', color: 'pink' },
      { icon: 'Laptop', name: 'Palvelut ja IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Ota meihin yhteyttä',
    title: 'Valmis rekrytoimaan Euroopassa?',
    subtitle: 'Kerro meille projektistasi ja saat henkilökohtaisen tarjouksen 24 tunnin kuluessa.',
    benefits: [
      {
        icon: 'Users',
        title: 'Henkilökohtainen tuki',
        description: 'Omistettu asiantuntija projektiisi',
      },
      {
        icon: 'ShieldCheck',
        title: 'Taattu noudattaminen',
        description: 'Kaikkien sääntöjen noudattaminen',
      },
      {
        icon: 'Globe',
        title: 'Eurooppalainen kattavuus',
        description: '27 maata heti saatavilla',
      },
      {
        icon: 'CheckCircle',
        title: 'Maksimaalinen reagointikyky',
        description: 'Vastaus 24 työtunnin kuluessa',
      },
    ],
    form: {
      fields: {
        name: { label: 'Koko nimi', placeholder: 'Matti Virtanen' },
        email: { label: 'Työpaikan sähköposti', placeholder: 'matti.virtanen@yritys.fi' },
        phone: { label: 'Puhelin', placeholder: '+358 9 1234 5678' },
        company: { label: 'Yritys', placeholder: 'Yrityksesi nimi' },
        needType: { label: 'Tarpeen tyyppi', placeholder: 'Valitse tarpeen tyyppi' },
        message: { label: 'Kuvaile tarpeesi', placeholder: 'Kerro meille eurooppalaisesta rekrytointiprojektistasi...' },
      },
      ctaLabel: 'Lähetä pyyntö',
      securityNote: '🔒 Tietosi ovat turvassa, eikä niitä koskaan jaeta.',
      successMessage: 'Kiitos! Otamme sinuun yhteyttä 24 tunnin kuluessa.',
    },
  },

  footer: {
    logo: {
      tagline: 'Luotettava kumppanisi eurooppalaiseen rekrytointiin',
    },
    columns: {
      services: {
        title: 'Palvelut',
        links: [
          { label: 'Eurooppalainen vuokratyö', href: '/services/interim-europeen' },
          { label: 'Erikoistunut rekrytointi', href: '/services/recrutement-specialise' },
          { label: 'Neuvonta ja noudattaminen', href: '/services/conseil-conformite' },
          { label: 'Työntekijöiden lähettäminen', href: '/services/detachement-personnel' },
        ],
      },
      company: {
        title: 'Yritys',
        links: [
          { label: 'Tietoa meistä', href: '#about' },
          { label: 'Verkostomme', href: '#reseau' },
          { label: 'Toimialamme', href: '#secteurs' },
          { label: 'Arvostelut', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Yhteystiedot',
        address: '123 Avenue de l\'Europe, 75001 Pariisi, Ranska',
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
      copyright: '© 2026 YOJOB. Kaikki oikeudet pidätetään. Tehty ❤️:lla Euroopassa.',
      legalLinks: [
        { label: 'Oikeudelliset tiedot', href: '#mentions' },
        { label: 'Tietosuoja', href: '#privacy' },
        { label: 'Ehdot', href: '#cgv' },
      ],
    },
  },
};