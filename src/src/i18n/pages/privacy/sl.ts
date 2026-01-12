/**
 * 🇸🇮 SLOVENSKI PREVODI - STRAN POLITIKE ZASEBNOSTI
 * 
 * @version 1.0.0
 */

export const privacySL = {
  hero: {
    badge: "Politika zasebnosti",
    title: "Zaščita vaših osebnih podatkov",
    subtitle: "Pri {company} smo zavezani k zaščiti in spoštovanju vaše zasebnosti v skladu s Splošno uredbo o varstvu podatkov (GDPR).",
    lastUpdate: "Zadnja posodobitev:"
  },

  dpo: {
    title: "Pooblaščena oseba za varstvo podatkov (DPO)",
    subtitle: "Vaša prednostna kontaktna oseba za vprašanja v zvezi z vašimi podatki"
  },

  sections: {
    dataController: {
      title: "1. Upravljavec podatkov",
      intro: "Upravljavec osebnih podatkov je:",
      location: "Bordeaux, Francija",
      email: "E-pošta:"
    },

    dataCollected: {
      title: "2. Zbrani osebni podatki",
      intro: "V okviru naših evropskih storitev zaposlovanja zbiramo naslednje podatke:",
      items: [
        {
          label: "Identifikacijski podatki:",
          description: "Priimek, ime, e-pošta, telefon"
        },
        {
          label: "Poklicni podatki:",
          description: "Podjetje, položaj, panoga dejavnosti"
        },
        {
          label: "Kontaktni podatki:",
          description: "Poštni naslov, komunikacijske preferencije"
        },
        {
          label: "Navigacijski podatki:",
          description: "Piškotki, IP naslov, podatki o povezavi"
        }
      ]
    },

    purposes: {
      title: "3. Namen obdelave",
      intro: "Vaši podatki se zbirajo in obdelujejo v naslednje namene:",
      items: [
        {
          title: "Upravljanje zahtev za zaposlovanje",
          description: "Obdelava vaših povpraševanj in povezovanje z našo mrežo partnerskih agencij."
        },
        {
          title: "Izboljšanje naših storitev",
          description: "Analiza uporabe naših storitev za izboljšanje vaše uporabniške izkušnje."
        },
        {
          title: "Poslovna komunikacija",
          description: "Obveščanje o naših novih storitvah in našem evropskem trgu (z vašim soglasjem)."
        }
      ]
    },

    legalBasis: {
      title: "4. Pravna podlaga obdelave",
      intro: "Obdelava vaših podatkov temelji na naslednjih pravnih podlagah:",
      items: [
        {
          basis: "Izpolnitev pogodbe",
          description: "Obdelava, potrebna za odgovor na vaše zahteve za zaposlovanje"
        },
        {
          basis: "Soglasje",
          description: "Za pošiljanje trženjskih sporočil (soglasje lahko kadar koli umaknete)"
        },
        {
          basis: "Legitimni interes",
          description: "Izboljšanje naših storitev in varnost naše platforme"
        }
      ]
    },

    retention: {
      title: "5. Rok hrambe",
      intro: "Vaše osebne podatke hranimo naslednja obdobja:",
      items: [
        {
          period: "3 leta",
          description: "Podatki potencialnih strank in strank"
        },
        {
          period: "13 mesecev",
          description: "Piškotki in navigacijski podatki"
        },
        {
          period: "5 let",
          description: "Računovodski in davčni dokumenti"
        },
        {
          period: "{days} dni",
          description: "Podatki iz obrazcev (nastavljivo)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Vaše pravice",
      intro: "V skladu z GDPR imate naslednje pravice:",
      items: [
        {
          title: "Pravica do dostopa",
          description: "Pridobitev kopije vaših osebnih podatkov"
        },
        {
          title: "Pravica do popravka",
          description: "Popravek netočnih ali nepopolnih podatkov"
        },
        {
          title: "Pravica do izbrisa",
          description: "Zahteva za izbris vaših podatkov"
        },
        {
          title: "Pravica do omejitve",
          description: "Omejitev obdelave vaših podatkov"
        },
        {
          title: "Pravica do prenosljivosti",
          description: "Pridobitev vaših podatkov v strukturirani obliki"
        },
        {
          title: "Pravica do ugovora",
          description: "Ugovor proti obdelavi vaših podatkov"
        }
      ],
      footer: "Za uveljavljanje svojih pravic se obrnite na našega DPO na"
    },

    security: {
      title: "7. Varnost podatkov",
      intro: "Izvajamo ustrezne tehnične in organizacijske varnostne ukrepe:",
      measures: [
        "Šifriranje podatkov pri prenosu in shranjevanju (SSL/TLS)",
        "Omejen dostop do podatkov z močno avtentikacijo",
        "Redne varnostne kopije in načrt neprekinjenega poslovanja",
        "Varnostne revizije in redne posodobitve",
        "Usposabljanje osebja o najboljših praksah GDPR"
      ]
    },

    transfers: {
      title: "8. Prenosi podatkov",
      intro: "V okviru naše evropske mreže več kot 500 partnerskih agencij v 27 državah:",
      eu: {
        title: "🇪🇺 Znotraj Evropske unije",
        description: "Vaši podatki se lahko prenesejo našim partnerskim agencijam, ki se nahajajo v EU/EGP in uživajo enako raven zaščite GDPR."
      },
      nonEu: {
        title: "🌍 Zunaj Evropske unije",
        description: "V primeru prenosov zunaj EU uporabljamo standardne pogodbene klavzule (SCC) Evropske komisije za zagotovitev ustrezne ravni zaščite."
      }
    },

    cookies: {
      title: "9. Piškotki in mehanizmi sledenja",
      intro: "Naša spletna stran uporablja piškotke za izboljšanje vašega brskanja:",
      types: [
        {
          type: "Bistveni piškotki",
          description: "Nujno potrebni za delovanje spletne strani (seja, varnost)",
          required: true
        },
        {
          type: "Analitični piškotki",
          description: "Merjenje obiskanosti in statistike",
          required: false
        },
        {
          type: "Trženjski piškotki",
          description: "Ciljno oglaševanje in personalizacija",
          required: false
        }
      ],
      footer: "Svoje nastavitve piškotkov lahko kadarkoli upravljate v nastavitvah brskalnika."
    },

    contact: {
      title: "10. Stik in pritožba",
      intro: "Za vsa vprašanja v zvezi z obdelavo vaših osebnih podatkov:",
      dpoCard: {
        title: "Obrnite se na našega DPO"
      },
      cnilCard: {
        title: "Nadzorni organ",
        name: "CNIL (Francija)"
      },
      footer: "Če menite, da vaše pravice niso spoštovane, imate pravico vložiti pritožbo pri Nacionalni komisiji za informatiko in svoboščine (CNIL)."
    }
  },

  cta: {
    title: "Vaši podatki v varnih rokah",
    description: "Zaščita vaših osebnih podatkov je naša prednostna naloga. Zavezani smo k spoštovanju GDPR in zagotavljanju varnosti vaših informacij.",
    backHome: "Nazaj na domačo stran",
    contactDpo: "Kontaktirajte DPO"
  },

  badges: {
    required: "Obvezno",
    optional: "Neobvezno"
  }
};
