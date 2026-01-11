/**
 * 🇪🇪 EESTI TÕLKED - LEHT MEIE SEKTORID
 * 
 * @version 1.0.0
 */

export const etNosSecteurs = {
  hero: {
    badge: "🏢 Meie Tegevussektorid",
    title: "Mitmesektoraalne ekspertiis kõigiks teie värbamisvajadusteks",
    subtitle: "Ehitusest tehnoloogiani, läbi tööstuse ja tervishoiu: meie Euroopa võrgustik katab 6 põhisektorit spetsialiseerunud partneritega.",
    cta: {
      primary: "Küsige pakkumist",
      secondary: "Avastage meie teenused"
    }
  },
  
  sectors: [
    {
      id: "btp",
      name: "Ehitus & Avalikud Tööd",
      icon: "Building2",
      color: "from-orange-500 to-amber-600",
      description: "Müüritegijad, elektrikud, torumehed, ehitusjuhid: leidke kiiresti kvalifitseeritud spetsialistid oma ehitusprojektideks.",
      stats: {
        agencies: "150+ spetsialiseerunud agentuuri",
        missions: "800+ lõpetatud missiooni",
        countries: "27 Euroopa riiki"
      },
      profiles: [
        "Müüritegijad ja betoonimehed",
        "Elektrikud ja torumehed",
        "Ehitusjuhid",
        "Raskemasinate operaatorid",
        "Katusekatjad ja puusepad"
      ],
      advantages: [
        "Garanteeritud A1 vastavus",
        "Sertifitseeritud spetsialistid",
        "Saadaval 48h jooksul"
      ]
    },
    {
      id: "industrie",
      name: "Tööstus & Tootmine",
      icon: "Factory",
      color: "from-blue-500 to-cyan-600",
      description: "Tootmisoperaatorid, hooldustehnikud, logistikud: tugevdage oma tööstusmeeskondi Euroopa talentidega.",
      stats: {
        agencies: "120+ spetsialiseerunud agentuuri",
        missions: "600+ lõpetatud missiooni",
        countries: "25 Euroopa riiki"
      },
      profiles: [
        "Tootmisoperaatorid",
        "Hooldustehnikud",
        "Kahveltõstukijuhid ja logistika",
        "Kvalifitseeritud keevitajad",
        "Montaažiliini operaatorid"
      ],
      advantages: [
        "Tõestatud tehniline ekspertiis",
        "Valdatud tööstusprotsessid",
        "Paindlikud lepingud"
      ]
    },
    {
      id: "agriculture",
      name: "Põllumajandus & Toidutööstus",
      icon: "Tractor",
      color: "from-green-500 to-emerald-600",
      description: "Hooajalised töötajad, põllumajanduslikud töötajad, masinate operaatorid: vastake oma põllumajandusettevõtete vajadustele meie spetsialiseerunud võrgustikuga.",
      stats: {
        agencies: "80+ spetsialiseerunud agentuuri",
        missions: "500+ lõpetatud missiooni",
        countries: "20 Euroopa riiki"
      },
      profiles: [
        "Põllumajanduslikud töötajad",
        "Traktoristid",
        "Viinamarjade ja puuviljade korjajad",
        "Pakkimistöötajad",
        "Põllumajandustehnikud"
      ],
      advantages: [
        "Kohandamine hooaegadele",
        "Kohalike tingimuste tundmine",
        "Maksimaalne reageerimiskiirus"
      ]
    },
    {
      id: "hotellerie",
      name: "Hotellindus & Gastronoomia",
      icon: "UtensilsCrossed",
      color: "from-red-500 to-rose-600",
      description: "Kokad, ettekandjad, vastuvõtutöötajad: täiendage oma meeskondi Euroopa hotellikindussektori professionaalidega.",
      stats: {
        agencies: "100+ spetsialiseerunud agentuuri",
        missions: "700+ lõpetatud missiooni",
        countries: "27 Euroopa riiki"
      },
      profiles: [
        "Kokad ja peakokad",
        "Ettekandjad ja baarmenid",
        "Vastuvõtutöötajad",
        "Toateenijad",
        "Hotellide juhid"
      ],
      advantages: [
        "Hinnatud mitmekeelsus",
        "Euroopa savoir-faire",
        "Kohene kättesaadavus"
      ]
    },
    {
      id: "sante",
      name: "Tervishoiu & Teenused",
      icon: "Heart",
      color: "from-pink-500 to-purple-600",
      description: "Õed, hooldajad, kodused abilised: tugevdage oma meditsiinimeeskondi sertifitseeritud spetsialistidega.",
      stats: {
        agencies: "60+ spetsialiseerunud agentuuri",
        missions: "400+ lõpetatud missiooni",
        countries: "15 Euroopa riiki"
      },
      profiles: [
        "Diplomeeritud õed",
        "Hooldajad",
        "Kodused abilised",
        "Haigla koristusteenistujad",
        "Sanitarid"
      ],
      advantages: [
        "EL tunnustatud diplomid",
        "Jätkuv koolitus",
        "Professionaalne eetika"
      ]
    },
    {
      id: "tech",
      name: "Tehnoloogia & Digitaalne",
      icon: "Laptop",
      color: "from-violet-500 to-indigo-600",
      description: "Arendajad, disainerid, projektijuhid: saage juurdepääs parimatele Euroopa tehnoloogiatalentidele oma digitaalprojektide jaoks.",
      stats: {
        agencies: "90+ spetsialiseerunud agentuuri",
        missions: "550+ lõpetatud missiooni",
        countries: "22 Euroopa riiki"
      },
      profiles: [
        "Full-Stack arendajad",
        "UX/UI disainerid",
        "Digitaalsete projektide juhid",
        "Andmeteadlased",
        "DevOps insenerid"
      ],
      advantages: [
        "Arenenud tehnilised oskused",
        "Professionaalne inglise keel",
        "Sobivad kaugtööks"
      ]
    }
  ],

  process: {
    badge: "💼 Värbamisprotsess",
    title: "Kuidas värvata oma sektoris?",
    subtitle: "Lihtne ja kiire protsess, kohandatud iga tegevusala eripäradele.",
    steps: [
      {
        number: "1",
        title: "Määratlege oma vajadused",
        description: "Ametikohtade arv, nõutavad pädevused, missiooni kestus"
      },
      {
        number: "2",
        title: "Sihitud eelvalik",
        description: "Meie sektori eksperdid aktiveerivad oma spetsialiseerunud võrgustiku"
      },
      {
        number: "3",
        title: "Valideerimine ja vastavus",
        description: "Diplomite, sertifikaatide ja A1 dokumentide kontroll"
      },
      {
        number: "4",
        title: "Kiire integratsioon",
        description: "Täielik logistiline ja halduslik tugi"
      }
    ]
  },

  cta: {
    badge: "🚀 Valmis värbamiseks?",
    title: "Leidke talendid oma sektoris 48h jooksul",
    subtitle: "Olgu see ehitus, tööstus, põllumajandus või muu sektor: meie 500+ partneragentuuri ühendavad teid parimate Euroopa profiilidega.",
    primaryCta: "Küsige tasuta pakkumist",
    secondaryCta: "Vaadake meie teenuseid"
  },
  
  // Link sektorikaartidelt
  recruitNowLink: "Värbake kohe"
};
