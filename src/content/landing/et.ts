import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇪🇪 YOJOB Landing Page Content - Eesti
 * Professionaalne tõlge prantsuse keelest
 */

export const landingContentET: LandingPageContent = {
  language: 'et',
  
  seo: {
    metaTitle: 'YOJOB - Euroopa lähetusplatvorm | 27 riiki',
    metaDescription: 'Tsentraliseerige oma Euroopa lähetusmenetlused. Turvaline digitaalne seif, veebipõhised haldusmenetlused ja tööpakkumiste haldamine. 500+ partneragentuurid 27 riigis.',
    slug: '/',
    h1: 'Teie kõik-ühes platvorm Euroopa lähetamiseks',
    ogTitle: 'YOJOB - Lihtsustatud töötajate lähetamine Euroopas',
    ogDescription: 'Hallake oma lähetusmenetlusi YOJOB-iga: tagatud vastavus, 500+ partneragentuurid, 27 Euroopa riiki.',
    altTexts: {
      heroVisual: 'Interaktiivne Euroopa kaart, mis näitab YOJOB võrgustikku 500+ agentuuriga 27 riigis',
      europeMap: 'Euroopa kaart 27 riigiga, mida YOJOB hõlmab',
      logoFooter: 'YOJOB logo - Euroopa lähetusplatvorm',
    },
    aiSummary: 'YOJOB on Euroopa platvorm, mis spetsialiseerub töötajate lähetamisele. See tsentraliseerib kõik dokumendid ja haldusmenetlused turvalises digitaalses seifis. Ettevõtted saavad hallata tööpakkumisi, koostada lähetusfaile ja tagada õigusliku vastavuse 27 Euroopa riigis läbi 500+ partneragentuuri võrgustiku.',
    faq: [
      {
        question: 'Mis on YOJOB?',
        answer: 'YOJOB on Euroopa platvorm värbamisvahenduseks ja töötajate lähetamise haldamiseks. Ühendame ettevõtteid üle 500 partneragentuuriga 27 Euroopa riigis.',
      },
      {
        question: 'Millistes riikides YOJOB tegutseb?',
        answer: 'YOJOB hõlmab 27 Euroopa riiki: Prantsusmaa, Saksamaa, Hispaania, Itaalia, Poola, Rumeenia, Holland, Belgia, Portugal, Tšehhi, Ungari, Rootsi, Austria, Bulgaaria, Taani, Soome, Slovakkia, Iirimaa, Horvaatia, Leedu, Sloveenia, Läti, Eesti, Küpros, Luksemburg, Malta ja Kreeka.',
      },
      {
        question: 'Kuidas digitaalne seif töötab?',
        answer: 'Meie digitaalne seif tsentraliseerib kõik teie lähetusdokumendid (A1, lepingud, sertifikaadid) turvalises ruumis, mis on kättesaadav 24/7.',
      },
      {
        question: 'Kas YOJOB tagab õigusliku vastavuse?',
        answer: 'Jah, YOJOB integreerib Euroopa töötajate lähetamise eeskirju. Meie platvorm juhendab teid kohustuslike menetluste läbi.',
      },
      {
        question: 'Kuidas saan YOJOB-is tööpakkumise avaldada?',
        answer: 'Alates 2026. aastast saate avaldada oma tööpakkumisi otse meie turuplatsi.',
      },
      {
        question: 'Kui palju YOJOB platvorm maksab?',
        answer: 'YOJOB pakub erinevaid pakette, mis on kohandatud teie vajadustele. Võtke meiega ühendust personaalse pakkumise saamiseks.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Avaleht',
      services: 'Teenused',
      network: 'Meie võrgustik',
      contact: 'Kontakt',
    },
    cta: 'Küsi pakkumist',
  },

  hero: {
    badge: '⭐ Euroopa värbamise liider',
    title: 'Teie partner värbamiseks Euroopas',
    subtitle: 'Juurdepääs 500+ tööturuagentuuride võrgustikule 27 riigis. Lihtsustage oma Euroopa värbamist kogenud ja usaldusväärse vahendajaga.',
    benefits: [
      'Tsentraliseeritud ja turvalised failid',
      'Veebipõhised haldusmenetlused',
      'Tööpakkumiste haldamine',
      'Mitmeriiklik vastavus',
    ],
    ctaPrimaryLabel: 'Küsi pakkumist',
    ctaSecondaryLabel: 'Avasta võrgustik',
    stats: {
      agencies: { value: '500+', label: 'partneragentuurid' },
      countries: { value: '27', label: 'Euroopa riiki' },
      missions: { value: '2000+', label: 'edukat missiooni' },
    },
    floatingCards: {
      since: { label: 'Alates', value: '2014' },
      expertise: { value: '10 aastat', label: 'Juhtivat kogemust' },
      partners: { label: 'Partnerid', value: '500+ sertifitseeritud agentuurid' },
      countries: { value: '27', label: 'Euroopa riiki' },
      certified: { value: '500+', label: 'Sertifitseeritud agentuurid' },
      activeNetwork: 'Aktiivne võrgustik',
    },
  },

  stats: {
    badge: '📊 Meie põhinumbrid',
    title: 'Tunnustatud kogemus Euroopas',
    items: [
      { value: '10+', label: 'aastat kogemust', icon: 'Target' },
      { value: '27', label: 'hõlmatud riiki', icon: 'Globe' },
      { value: '500+', label: 'partneragentuurid', icon: 'Network' },
      { value: '2000+', label: 'läbiviidud missiooni', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Meie teenused',
    title: 'Teie vajadustele kohandatud lahendused',
    subtitle: 'Saadame teid kõigis teie Euroopa värbamismenetlustes.',
    services: [
      {
        icon: 'Users',
        title: 'Euroopa ajutine töö',
        description: 'Ajutise personali värbamine kogu Euroopas koos täieliku formaalsuste haldamisega.',
        linkLabel: 'Loe lähemalt',
      },
      {
        icon: 'Target',
        title: 'Spetsialiseeritud värbamine',
        description: 'Leidke vajalikud talendid tänu meie sektorite ekspertide võrgustikule.',
        linkLabel: 'Loe lähemalt',
      },
      {
        icon: 'ShieldCheck',
        title: 'Nõustamine ja vastavus',
        description: 'Veenduge, et järgite kõiki Euroopa lähetamise eeskirju.',
        linkLabel: 'Loe lähemalt',
      },
    ],
  },

  network: {
    badge: '🌍 Euroopa võrgustik',
    title: 'Kogu Euroopat hõlmav võrgustik',
    subtitle: 'Üle 500 partneragentuuri 27 riigis, et rahuldada kõik teie värbamisvajadused.',
    mapLabel: 'partneragentuurid',
    waitlist: {
      badge: '✨ Uuendus 2026',
      title: 'Teie kõik-ühes platvorm Euroopa lähetamiseks',
      subtitle: 'Tsentraliseerige kõik oma lähetusdokumendid ja -andmed turvalises ruumis. Viige oma haldusmenetlused läbi otse veebis ja hallake oma tööpakkumisi ühest liidesest.',
      features: [
        'Tsentraliseeritud ja turvalised failid',
        'Veebipõhised haldusmenetlused',
        'Tööpakkumiste haldamine',
        'Mitmeriiklik vastavus',
      ],
      formTitle: 'Olge esimeste seas!',
      formSubtitle: 'Registreeruge ootenimekirja ja saage eelisjuurdepääs',
      emailPlaceholder: 'Teie töö e-posti aadress',
      ctaLabel: 'Liitu ootenimekirjaga',
      securityNote: '🔒 Teie andmed on turvalised ega jagata kunagi.',
      successMessage: 'Täname! Olete ootenimekirjas.',
    },
  },

  steps: {
    badge: '🎯 Kuidas see töötab',
    title: 'Lihtne ja tõhus protsess',
    subtitle: '4 sammuga leidke talendid, mida vajate kogu Euroopas.',
    steps: [
      {
        number: '01',
        title: 'Kirjeldage oma vajadust',
        description: 'Jagage meiega oma värbamisvajadusi: profiilid, oskused, asukoht ja kestus.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'Aktiveerime oma võrgustiku',
        description: 'Meie partneragentuurid kogu Euroopas otsivad teile parimaid kandidaate.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Kinnitage kandidaadid',
        description: 'Esitame teile kvalifitseeritud profiilide valiku, mida saate hinnata.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Tervitage oma meeskonda',
        description: 'Haldame kõiki haldusformaalsusi, et saaksite keskenduda olulisele.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Tagasiside',
    title: 'Nad usaldavad meid',
    subtitle: 'Avastage meie klientide tagasisidet kogu Euroopast.',
    testimonials: [
      {
        name: 'Jaan Tamm',
        position: 'Personalijuht',
        company: 'Ehitus Eesti',
        quote: 'YOJOB võimaldas meil palgata 50 kvalifitseeritud töötajat Poolas vaid 3 nädalaga. Märkimisväärne ajavõit ja veatu haldushaldus.',
        rating: 5,
        sector: 'Ehitus',
      },
      {
        name: 'Maria Kask',
        position: 'Liikuvusjuht',
        company: 'IndusTech Saksamaa',
        quote: 'YOJOB Euroopa võrgustik on muljetavaldav. Suutsime laiendada tegevust 5 riiki ekspertide toel igas etapis.',
        rating: 5,
        sector: 'Tööstus',
      },
      {
        name: 'Antonio Silva',
        position: 'Tegevjuht',
        company: 'AgriPro Portugal',
        quote: 'Lõpuks lahendus, mis tõesti lihtsustab piiriülest värbamist. Tagatud vastavus ja järgitud tähtajad.',
        rating: 5,
        sector: 'Põllumajandus',
      },
    ],
  },

  sectors: {
    badge: '🏭 Tegevussektorid',
    title: 'Töötame kõigis sektorites',
    subtitle: 'Meie kogemus hõlmab kõiki Euroopa tegevussektoreid.',
    sectors: [
      { icon: 'Building2', name: 'Ehitus ja tööd', color: 'orange' },
      { icon: 'Factory', name: 'Tööstus ja logistika', color: 'blue' },
      { icon: 'Tractor', name: 'Põllumajandus ja viinamarjakasvatus', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Külalislahkus ja restoranid', color: 'red' },
      { icon: 'Heart', name: 'Tervishoiu ja meditsiin', color: 'pink' },
      { icon: 'Laptop', name: 'Teenused ja IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Võtke meiega ühendust',
    title: 'Valmis värbama Euroopas?',
    subtitle: 'Rääkige meile oma projektist ja saage personaalne pakkumine 24 tunni jooksul.',
    benefits: [
      {
        icon: 'Users',
        title: 'Personaalne toetus',
        description: 'Spetsiaalne ekspert teie projektile',
      },
      {
        icon: 'ShieldCheck',
        title: 'Tagatud vastavus',
        description: 'Kõigi eeskirjade järgimine',
      },
      {
        icon: 'Globe',
        title: 'Euroopa katvus',
        description: '27 riiki kohe kättesaadavad',
      },
      {
        icon: 'CheckCircle',
        title: 'Maksimaalne reageerimisvõime',
        description: 'Vastus 24 tunni jooksul',
      },
    ],
    form: {
      fields: {
        name: { label: 'Täisnimi', placeholder: 'Jaan Tamm' },
        email: { label: 'Töö e-post', placeholder: 'jaan.tamm@ettevote.ee' },
        phone: { label: 'Telefon', placeholder: '+372 6234 5678' },
        company: { label: 'Ettevõte', placeholder: 'Teie ettevõtte nimi' },
        needType: { label: 'Vajaduse tüüp', placeholder: 'Valige vajaduse tüüp' },
        message: { label: 'Kirjeldage oma vajadust', placeholder: 'Rääkige meile oma Euroopa värbamisprojektist...' },
      },
      ctaLabel: 'Saada päring',
      securityNote: '🔒 Teie andmed on turvalised ega jagata kunagi.',
      successMessage: 'Täname! Võtame teiega ühendust 24 tunni jooksul.',
    },
  },

  footer: {
    logo: {
      tagline: 'Teie usaldusväärne partner Euroopa värbamiseks',
    },
    columns: {
      services: {
        title: 'Teenused',
        links: [
          { label: 'Euroopa ajutine töö', href: '/services/interim-europeen' },
          { label: 'Spetsialiseeritud värbamine', href: '/services/recrutement-specialise' },
          { label: 'Nõustamine ja vastavus', href: '/services/conseil-conformite' },
          { label: 'Töötajate lähetamine', href: '/services/detachement-personnel' },
        ],
      },
      company: {
        title: 'Ettevõte',
        links: [
          { label: 'Meist', href: '#about' },
          { label: 'Meie võrgustik', href: '#reseau' },
          { label: 'Meie sektorid', href: '#secteurs' },
          { label: 'Tagasiside', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Kontakt',
        address: '123 Avenue de l\'Europe, 75001 Pariis, Prantsusmaa',
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
      copyright: '© 2026 YOJOB. Kõik õigused kaitstud. Tehtud ❤️-ga Euroopas.',
      legalLinks: [
        { label: 'Juriidiline teave', href: '#mentions' },
        { label: 'Privaatsus', href: '#privacy' },
        { label: 'Tingimused', href: '#cgv' },
      ],
    },
  },
};