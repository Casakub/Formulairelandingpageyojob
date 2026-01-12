/**
 * 🇪🇪 EESTI TÕLKED - JURIIDILINE TEAVE
 * 
 * @version 1.0.0
 */

export const legalET = {
  hero: {
    badge: "Juriidiline teave",
    title: "Juriidiline teave",
    subtitle: "Vastavalt Prantsusmaa seaduse nr 2004-575 sätetele 21. juunist 2004 usalduse kohta digitaalmajandusse.",
    lastUpdate: "Viimati uuendatud:"
  },

  backButton: "Tagasi",

  companyInfo: {
    title: "Ettevõtte identifitseerimine",
    subtitle: "Ametlik teave ettevõtte kohta",
    fields: {
      companyName: "Ettevõtte nimi",
      manager: "Direktor",
      siret: "SIRET",
      vat: "Käibemaksukohustuslase number",
      address: "Registreeritud asukoht",
      contact: "Kontakt"
    }
  },

  sections: {
    editor: {
      title: "1. Veebisaidi väljaandja",
      intro: "Veebisaiti, mis on kättesaadav aadressil {domain}, avaldab:",
      representedBy: "Esindab Alexandre AUGER, Direktori ametikohal"
    },

    hosting: {
      title: "2. Veebimajutus",
      intro: "Veebisaiti majutab:",
      companyName: "HOSTINGER International Ltd.",
      address1: "61 Lordou Vironos Street",
      address2: "6023 Larnaka, Küpros",
      website: "Veebisait:",
      gdprNote: "Majutus on kooskõlas Euroopa andmekaitsestandartidega (GDPR)."
    },

    director: {
      title: "3. Väljaande direktor",
      content: "Veebisaidi väljaande direktor on {manager}, ettevõtte {company} Direktor."
    },

    intellectualProperty: {
      title: "4. Intellektuaalomand",
      intro: "Kogu veebisait kuulub Prantsusmaa ja rahvusvahelise autoriõiguse ja intellektuaalomandi seadusandluse alla.",
      items: [
        {
          title: "Kaitstud sisu",
          description: "Kõik selle veebisaidi elemendid (tekstid, pildid, logod, graafika, videod) on ettevõtte YOJOB või tema partnerite ainuomand."
        },
        {
          title: "Kaubamärgid ja logod",
          description: "Sellel lehel kuvatud kaubamärgid, logod ja äratuntavad märgid on ettevõtte YOJOB omand ja neid ei tohi kasutada ilma eelneva kirjaliku loata."
        },
        {
          title: "Reprodutseerimise keeld",
          description: "Veebisaidi terviku või osade reprodutseerimine, esitamine, muutmine, avaldamine või kohandamine mis tahes viisil on keelatud ilma eelneva kirjaliku loata."
        }
      ],
      warning: "Veebisaidi või mis tahes selle elementide volitamata kasutamist käsitletakse autoriõiguse rikkumisena ja seda karistatakse vastavalt Prantsusmaa intellektuaalomandi seadustiku artiklite L.335-2 ja järgnevate sätetele."
    },

    dataProtection: {
      title: "5. Isikuandmete kaitse",
      intro: "{company} kohustub järgima isikuandmete kaitse kehtivaid eeskirju, eriti üldist andmekaitsemäärust (GDPR).",
      privacyCard: {
        title: "Privaatsuspoliitika",
        description: "Vaadake meie üksikasjalikku poliitikat teie isikuandmete kaitse kohta.",
        linkText: "Vaata poliitikat"
      },
      dpoCard: {
        title: "DPO kontakt",
        description: "Kõigi teie isikuandmetega seotud küsimuste korral."
      }
    },

    cookies: {
      title: "6. Küpsised ja jälgimine",
      intro: "Veebisait kasutab küpsiseid kasutajakogemuse parandamiseks ja liikluse analüüsimiseks.",
      types: [
        {
          type: "Tehnilised küpsised",
          description: "Vajalikud veebisaidi nõuetekohaseks toimimiseks (seanss, seaded)",
          essential: true
        },
        {
          type: "Analüütilised küpsised",
          description: "Liikluse mõõtmine ja külastuste statistika",
          essential: false
        },
        {
          type: "Turundustküpsised",
          description: "Reklaamide personaliseerimine (teie nõusolekul)",
          essential: false
        }
      ],
      footer: "Saate oma küpsiste seadeid hallata brauseri seadete või meie nõusolekubänneri kaudu."
    },

    liability: {
      title: "7. Vastutuse piiramine",
      intro: "{company} teeb kõik jõupingutused, et pakkuda kasutajatele usaldusväärseid ja kontrollitud andmeid. Siiski:",
      items: [
        {
          title: "Teabe täpsus",
          description: "Veebisaidil avaldatud teave on esitatud ainult informatiivsel eesmärgil ja võib sisaldada ebatäpsusi või olla aegunud. Püüame neid võimalikult kiiresti parandada."
        },
        {
          title: "Teenuse kättesaadavus",
          description: "YOJOB ei võta vastutust veebisaidi ajutise katkestuse eest hoolduse, värskenduste või tehniliste tõrgete tõttu."
        },
        {
          title: "Välised lingid",
          description: "Veebisait võib sisaldada linke kolmandate osapoolte saitidele. YOJOB ei kontrolli neid saite ega võta vastutust nende sisu eest."
        },
        {
          title: "Viirused ja häkkimine",
          description: "YOJOB kasutab kõiki mõistlikke vahendeid veebisaidi turvalisuse tagamiseks, kuid ei saa tagada absoluutset kaitset viirusetest või pahatahtlike tegude eest."
        }
      ]
    },

    applicableLaw: {
      title: "8. Kohaldatav õigus ja pädevus",
      intro: "Need juriidilised märkused kuuluvad Prantsusmaa õiguse alla.",
      law: {
        title: "🇫🇷 Kohaldatav õigus",
        description: "Need juriidilised märkused ja veebisaidi kasutamine kuuluvad Prantsusmaa õiguse alla."
      },
      jurisdiction: {
        title: "⚖️ Pädev kohus",
        description: "Vaidluse korral ja rahumeelse lahenduse puudumisel on ainupädevus Prantsusmaa kohtutes. Vastavalt kohaldatavatele kohaliku pädevuse reeglitele on pädevad kohad, kus asub ettevõtte YOJOB registreeritud asukoht."
      },
      amicableSettlement: {
        title: "🤝 Rahumeelne lahendus",
        description: "Enne mis tahes kohtumenetluse algatamist soovitame meil võtta ühendust, et proovida võimalikud erimeelsused rahumeelselt lahendada."
      }
    },

    mediation: {
      title: "9. Vahendamine ja vaidluste lahendamine",
      intro: "Vastavalt Prantsusmaa tarbijakaitseseaduse sätetele vaidluste rahumeelse lahendamise kohta:",
      platform: {
        title: "Veebiplatvorm vaidluste lahendamiseks",
        description: "Euroopa Komisjon on loonud veebiplatvormi vaidluste lahendamiseks, mis on kättesaadav järgmisel aadressil:"
      }
    },

    contact: {
      title: "10. Võtke meiega ühendust",
      intro: "Kõigi juriidiliste märkuste või veebisaidi kasutamisega seotud küsimuste korral:",
      emailCard: {
        title: "E-posti teel"
      },
      mailCard: {
        title: "Posti teel"
      }
    }
  },

  cta: {
    title: "Läbipaistvus ja vastavus",
    description: "{company} kohustub järgima kehtivaid eeskirju ja andma teile kogu vajaliku juriidilise teabe.",
    backHome: "Tagasi avalehele",
    contactUs: "Võtke meiega ühendust"
  },

  badges: {
    essential: "Hädavajalik",
    optional: "Valikuline"
  },

  footer: {
    copyright: "© {year} {company}. Kõik õigused kaitstud."
  }
};
