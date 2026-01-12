/**
 * 🇸🇮 SLOVENSKI PREVODI - PRAVNE INFORMACIJE
 * 
 * @version 1.0.0
 */

export const legalSL = {
  hero: {
    badge: "Pravne informacije",
    title: "Pravne informacije",
    subtitle: "V skladu z določbami francoskega zakona št. 2004-575 z dne 21. junija 2004 o zaupanju v digitalno gospodarstvo.",
    lastUpdate: "Zadnja posodobitev:"
  },

  backButton: "Nazaj",

  companyInfo: {
    title: "Identifikacija podjetja",
    subtitle: "Uradne informacije o podjetju",
    fields: {
      companyName: "Ime podjetja",
      manager: "Direktor",
      siret: "SIRET",
      vat: "Davčna številka",
      address: "Sedež",
      contact: "Kontakt"
    }
  },

  sections: {
    editor: {
      title: "1. Izdajatelj spletne strani",
      intro: "Spletno stran, dostopno na naslovu {domain}, izdaja:",
      representedBy: "Zastopa Alexandre AUGER, v funkciji Direktorja"
    },

    hosting: {
      title: "2. Spletno gostovanje",
      intro: "Spletno stran gosti:",
      companyName: "HOSTINGER International Ltd.",
      address1: "61 Lordou Vironos Street",
      address2: "6023 Larnaka, Ciper",
      website: "Spletna stran:",
      gdprNote: "Gostovanje je v skladu z evropskimi standardi varstva podatkov (GDPR)."
    },

    director: {
      title: "3. Direktor objave",
      content: "Direktor objave spletne strani je {manager}, Direktor podjetja {company}."
    },

    intellectualProperty: {
      title: "4. Intelektualna lastnina",
      intro: "Celotna spletna stran je predmet francoske in mednarodne zakonodaje o avtorskih pravicah in intelektualni lastnini.",
      items: [
        {
          title: "Zaščitena vsebina",
          description: "Vsi elementi te spletne strani (besedila, slike, logotipi, grafike, videoposnetki) so izključna last podjetja YOJOB ali njegovih partnerjev."
        },
        {
          title: "Blagovne znamke in logotipi",
          description: "Blagovne znamke, logotipi in razpoznavni znaki, prikazani na tej strani, so last podjetja YOJOB in se ne smejo uporabljati brez predhodnega pisnega soglasja."
        },
        {
          title: "Prepoved razmnoževanja",
          description: "Vsako razmnoževanje, predstavljanje, spreminjanje, objavljanje ali prilagajanje celote ali dela spletne strani na kakršen koli način je prepovedano brez predhodnega pisnega soglasja."
        }
      ],
      warning: "Vsaka nepooblaščena uporaba spletne strani ali katerega koli od njenih elementov bo obravnavana kot kršitev avtorskih pravic in bo kaznovana v skladu z določbami členov L.335-2 in naslednjih Francoskega zakonika o intelektualni lastnini."
    },

    dataProtection: {
      title: "5. Varstvo osebnih podatkov",
      intro: "{company} se zavezuje spoštovati veljavne predpise o varstvu osebnih podatkov, zlasti Splošno uredbo o varstvu podatkov (GDPR).",
      privacyCard: {
        title: "Politika zasebnosti",
        description: "Oglejte si našo podrobno politiko varstva vaših osebnih podatkov.",
        linkText: "Ogled politike"
      },
      dpoCard: {
        title: "Kontakt DPO",
        description: "Za vsa vprašanja v zvezi z vašimi osebnimi podatki."
      }
    },

    cookies: {
      title: "6. Piškotki in sledenje",
      intro: "Spletna stran uporablja piškotke za izboljšanje uporabniške izkušnje in analizo prometa.",
      types: [
        {
          type: "Tehnični piškotki",
          description: "Potrebni za pravilno delovanje spletne strani (seja, nastavitve)",
          essential: true
        },
        {
          type: "Analitični piškotki",
          description: "Merjenje prometa in statistika obiskov",
          essential: false
        },
        {
          type: "Trženjski piškotki",
          description: "Personalizacija oglaševanja (z vašim soglasjem)",
          essential: false
        }
      ],
      footer: "Svoje nastavitve piškotkov lahko upravljate prek nastavitev brskalnika ali našega pasice za soglasje."
    },

    liability: {
      title: "7. Omejitev odgovornosti",
      intro: "{company} vlaga vse napore, da uporabnikom zagotovi zanesljive in preverjene informacije. Vendar:",
      items: [
        {
          title: "Točnost informacij",
          description: "Informacije, objavljene na spletni strani, so podane samo informativno in lahko vsebujejo netočnosti ali so zastarele. Trudimo se jih čim hitreje popraviti."
        },
        {
          title: "Razpoložljivost storitve",
          description: "YOJOB ne prevzema odgovornosti za začasno prekinitev spletne strani zaradi vzdrževanja, posodabljanja ali tehnične okvare."
        },
        {
          title: "Zunanje povezave",
          description: "Spletna stran lahko vsebuje povezave do strani tretjih oseb. YOJOB ne izvaja nadzora nad temi stranmi in zavrača vsakršno odgovornost za njihovo vsebino."
        },
        {
          title: "Virusi in hekerski napadi",
          description: "YOJOB uporablja vsa razumna sredstva za zagotavljanje varnosti spletne strani, vendar ne more zagotoviti absolutne zaščite pred virusi ali zlonamernimi dejanji."
        }
      ]
    },

    applicableLaw: {
      title: "8. Veljavno pravo in pristojnost",
      intro: "Te pravne informacije so predmet francoskega prava.",
      law: {
        title: "🇫🇷 Veljavno pravo",
        description: "Te pravne informacije in uporaba spletne strani so predmet francoskega prava."
      },
      jurisdiction: {
        title: "⚖️ Pristojno sodišče",
        description: "V primeru spora in ob odsotnosti mirne poravnave bodo imela francoska sodišča izključno pristojnost. V skladu z veljavnimi pravili o krajevni pristojnosti bodo pristojna sodišča kraja, kjer se nahaja sedež podjetja YOJOB."
      },
      amicableSettlement: {
        title: "🤝 Mirna poravnava",
        description: "Preden sprožite kakršen koli sodni postopek, vas spodbujamo, da nas kontaktirate in poskušamo mirno rešiti morebitna nesoglasja."
      }
    },

    mediation: {
      title: "9. Mediacija in reševanje sporov",
      intro: "V skladu z določbami Francoskega potrošniškega zakonika o mirnem reševanju sporov:",
      platform: {
        title: "Platforma za spletno reševanje sporov",
        description: "Evropska komisija je vzpostavila platformo za spletno reševanje sporov, dostopno na naslednjem naslovu:"
      }
    },

    contact: {
      title: "10. Kontaktirajte nas",
      intro: "Za vsa vprašanja v zvezi s pravnimi informacijami ali uporabo spletne strani:",
      emailCard: {
        title: "Po e-pošti"
      },
      mailCard: {
        title: "Po pošti"
      }
    }
  },

  cta: {
    title: "Preglednost in skladnost",
    description: "{company} se zavezuje spoštovati veljavne predpise in vam zagotoviti vse potrebne pravne informacije.",
    backHome: "Nazaj na domačo stran",
    contactUs: "Kontaktirajte nas"
  },

  badges: {
    essential: "Nujno",
    optional: "Neobvezno"
  },

  footer: {
    copyright: "© {year} {company}. Vse pravice pridržane."
  }
};
