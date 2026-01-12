/**
 * 🇭🇷 HRVATSKI PRIJEVODI - STRANICA POLITIKE PRIVATNOSTI
 * 
 * @version 1.0.0
 */

export const privacyHR = {
  hero: {
    badge: "Politika privatnosti",
    title: "Zaštita vaših osobnih podataka",
    subtitle: "U {company} smo posvećeni zaštiti i poštivanju vaše privatnosti u skladu s Općom uredbom o zaštiti podataka (GDPR).",
    lastUpdate: "Posljednje ažuriranje:"
  },

  dpo: {
    title: "Službenik za zaštitu podataka (DPO)",
    subtitle: "Vaš povlašteni kontakt za pitanja vezana uz vaše podatke"
  },

  sections: {
    dataController: {
      title: "1. Voditelj obrade",
      intro: "Voditelj osobnih podataka je:",
      location: "Bordeaux, Francuska",
      email: "E-mail:"
    },

    dataCollected: {
      title: "2. Prikupljeni osobni podaci",
      intro: "U okviru naših europskih usluga zapošljavanja prikupljamo sljedeće podatke:",
      items: [
        {
          label: "Identifikacijski podaci:",
          description: "Prezime, ime, e-mail, telefon"
        },
        {
          label: "Profesionalni podaci:",
          description: "Tvrtka, pozicija, djelatnost"
        },
        {
          label: "Kontakt podaci:",
          description: "Poštanska adresa, komunikacijske preferencije"
        },
        {
          label: "Navigacijski podaci:",
          description: "Kolačići, IP adresa, podaci o povezivanju"
        }
      ]
    },

    purposes: {
      title: "3. Svrhe obrade",
      intro: "Vaši podaci se prikupljaju i obrađuju u sljedeće svrhe:",
      items: [
        {
          title: "Upravljanje zahtjevima za zapošljavanje",
          description: "Obrada vaših zahtjeva za ponudu i povezivanje s našom mrežom partnerskih agencija."
        },
        {
          title: "Poboljšanje naših usluga",
          description: "Analiza korištenja naših usluga radi poboljšanja vašeg korisničkog iskustva."
        },
        {
          title: "Poslovna komunikacija",
          description: "Informiranje o našim novim uslugama i našem europskom tržištu (uz vašu privolu)."
        }
      ]
    },

    legalBasis: {
      title: "4. Pravna osnova obrade",
      intro: "Obrada vaših podataka temelji se na sljedećim pravnim osnovama:",
      items: [
        {
          basis: "Izvršenje ugovora",
          description: "Obrada potrebna za odgovor na vaše zahtjeve za zapošljavanje"
        },
        {
          basis: "Privola",
          description: "Za slanje marketinških komunikacija (privolu možete povući u bilo koje vrijeme)"
        },
        {
          basis: "Legitimni interes",
          description: "Poboljšanje naših usluga i sigurnost naše platforme"
        }
      ]
    },

    retention: {
      title: "5. Rok čuvanja",
      intro: "Vaše osobne podatke čuvamo sljedeća razdoblja:",
      items: [
        {
          period: "3 godine",
          description: "Podaci potencijalnih klijenata i klijenata"
        },
        {
          period: "13 mjeseci",
          description: "Kolačići i navigacijski podaci"
        },
        {
          period: "5 godina",
          description: "Računovodstveni i porezni dokumenti"
        },
        {
          period: "{days} dana",
          description: "Podaci iz obrazaca (prilagodljivo)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Vaša prava",
      intro: "Prema GDPR-u imate sljedeća prava:",
      items: [
        {
          title: "Pravo na pristup",
          description: "Dobivanje kopije vaših osobnih podataka"
        },
        {
          title: "Pravo na ispravak",
          description: "Ispravak netočnih ili nepotpunih podataka"
        },
        {
          title: "Pravo na brisanje",
          description: "Zahtjev za brisanje vaših podataka"
        },
        {
          title: "Pravo na ograničenje",
          description: "Ograničenje obrade vaših podataka"
        },
        {
          title: "Pravo na prenosivost",
          description: "Dobivanje vaših podataka u strukturiranom formatu"
        },
        {
          title: "Pravo na prigovor",
          description: "Prigovor na obradu vaših podataka"
        }
      ],
      footer: "Za ostvarivanje vaših prava kontaktirajte našeg DPO na"
    },

    security: {
      title: "7. Sigurnost podataka",
      intro: "Provodimo odgovarajuće tehničke i organizacijske sigurnosne mjere:",
      measures: [
        "Šifriranje podataka pri prijenosu i pohranjivanju (SSL/TLS)",
        "Ograničen pristup podacima s jakom autentifikacijom",
        "Redovite sigurnosne kopije i plan kontinuiteta poslovanja",
        "Sigurnosne revizije i redovita ažuriranja",
        "Obuka osoblja o najboljim GDPR praksama"
      ]
    },

    transfers: {
      title: "8. Prijenosi podataka",
      intro: "U okviru naše europske mreže od preko 500 partnerskih agencija u 27 zemalja:",
      eu: {
        title: "🇪🇺 Unutar Europske unije",
        description: "Vaši podaci mogu biti preneseni našim partnerskim agencijama smještenima u EU/EEA koje uživaju istu razinu GDPR zaštite."
      },
      nonEu: {
        title: "🌍 Izvan Europske unije",
        description: "U slučaju prijenosa izvan EU-a koristimo Standardne ugovorne klauzule (SCC) Europske komisije kako bismo osigurali odgovarajuću razinu zaštite."
      }
    },

    cookies: {
      title: "9. Kolačići i mehanizmi praćenja",
      intro: "Naša web stranica koristi kolačiće za poboljšanje vašeg pregledavanja:",
      types: [
        {
          type: "Osnovni kolačići",
          description: "Neophodni za rad web stranice (sesija, sigurnost)",
          required: true
        },
        {
          type: "Analitički kolačići",
          description: "Mjerenje posjećenosti i statistike",
          required: false
        },
        {
          type: "Marketinški kolačići",
          description: "Ciljano oglašavanje i personalizacija",
          required: false
        }
      ],
      footer: "Svoje postavke kolačića možete upravljati u bilo koje vrijeme u postavkama preglednika."
    },

    contact: {
      title: "10. Kontakt i prigovor",
      intro: "Za sva pitanja vezana uz obradu vaših osobnih podataka:",
      dpoCard: {
        title: "Kontaktirajte našeg DPO"
      },
      cnilCard: {
        title: "Nadzorno tijelo",
        name: "CNIL (Francuska)"
      },
      footer: "Ako smatrate da vaša prava nisu poštovana, imate pravo podnijeti prigovor Nacionalnoj komisiji za informatiku i slobode (CNIL)."
    }
  },

  cta: {
    title: "Vaši podaci u sigurnim rukama",
    description: "Zaštita vaših osobnih podataka je naš prioritet. Obvezujemo se poštivati GDPR i jamčiti sigurnost vaših informacija.",
    backHome: "Natrag na početnu stranicu",
    contactDpo: "Kontaktirajte DPO"
  },

  badges: {
    required: "Obavezno",
    optional: "Neobavezno"
  }
};
