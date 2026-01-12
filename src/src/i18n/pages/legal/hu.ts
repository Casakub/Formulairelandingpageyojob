/**
 * 🇭🇺 MAGYAR FORDÍTÁSOK - JOGI INFORMÁCIÓK
 * 
 * @version 1.0.0
 */

export const legalHU = {
  hero: {
    badge: "Jogi információk",
    title: "Jogi információk",
    subtitle: "A digitális gazdaságba vetett bizalomról szóló 2004-575. számú, 2004. június 21-i francia törvény rendelkezéseivel összhangban.",
    lastUpdate: "Utolsó frissítés:"
  },

  backButton: "Vissza",

  companyInfo: {
    title: "A vállalat azonosítása",
    subtitle: "Hivatalos vállalati információk",
    fields: {
      companyName: "Cégnév",
      manager: "Ügyvezető",
      siret: "SIRET",
      vat: "Adószám",
      address: "Székhely",
      contact: "Kapcsolat"
    }
  },

  sections: {
    editor: {
      title: "1. A weboldal kiadója",
      intro: "A {domain} címen elérhető weboldalt az alábbi szervezet adja ki:",
      representedBy: "Képviseli: Alexandre AUGER, Ügyvezető minőségében"
    },

    hosting: {
      title: "2. Webtárhely",
      intro: "A weboldalt az alábbi szolgáltató tárolja:",
      companyName: "HOSTINGER International Ltd.",
      address1: "61 Lordou Vironos Street",
      address2: "6023 Larnaca, Ciprus",
      website: "Weboldal:",
      gdprNote: "A tárhely megfelel az európai adatvédelmi szabványoknak (GDPR)."
    },

    director: {
      title: "3. Kiadási igazgató",
      content: "A weboldal kiadási igazgatója {manager}, a {company} Ügyvezetője."
    },

    intellectualProperty: {
      title: "4. Szellemi tulajdon",
      intro: "A teljes weboldal a francia és nemzetközi szerzői jogi és szellemi tulajdonjogi jogszabályok hatálya alá tartozik.",
      items: [
        {
          title: "Védett tartalom",
          description: "A weboldal minden eleme (szövegek, képek, logók, grafikák, videók) a YOJOB vagy partnerei kizárólagos tulajdonát képezi."
        },
        {
          title: "Védjegyek és logók",
          description: "Az ezen az oldalon megjelenő védjegyek, logók és megkülönböztető jelek a YOJOB tulajdonát képezik, és előzetes írásos engedély nélkül nem használhatók fel."
        },
        {
          title: "Reprodukció tiltása",
          description: "A weboldal egészének vagy egy részének bármilyen módon történő reprodukálása, ábrázolása, módosítása, közzététele vagy adaptálása előzetes írásos engedély nélkül tilos."
        }
      ],
      warning: "A weboldal vagy bármely elemének jogosulatlan felhasználása szerzői jogi jogsértésnek minősül, és a francia szellemi tulajdonról szóló törvénykönyv L.335-2. és azt követő cikkei rendelkezéseivel összhangban büntetendő."
    },

    dataProtection: {
      title: "5. Személyes adatok védelme",
      intro: "A {company} vállalja, hogy betartja a személyes adatok védelmére vonatkozó hatályos szabályokat, különösen az Általános Adatvédelmi Rendeletet (GDPR).",
      privacyCard: {
        title: "Adatvédelmi szabályzat",
        description: "Tekintse meg részletes szabályzatunkat személyes adatai védelméről.",
        linkText: "Szabályzat megtekintése"
      },
      dpoCard: {
        title: "DPO kapcsolat",
        description: "Személyes adataival kapcsolatos bármilyen kérdés esetén."
      }
    },

    cookies: {
      title: "6. Sütik és nyomkövetők",
      intro: "A weboldal sütiket használ a felhasználói élmény javítása és a forgalom elemzése érdekében.",
      types: [
        {
          type: "Technikai sütik",
          description: "A weboldal megfelelő működéséhez szükségesek (munkamenet, beállítások)",
          essential: true
        },
        {
          type: "Analitikai sütik",
          description: "Látogatottság mérése és látogatási statisztikák",
          essential: false
        },
        {
          type: "Marketing sütik",
          description: "Reklámok személyre szabása (az Ön hozzájárulásával)",
          essential: false
        }
      ],
      footer: "A sütikkel kapcsolatos beállításait a böngésző beállításain vagy hozzájárulási bannerünkön keresztül kezelheti."
    },

    liability: {
      title: "7. Felelősség korlátozása",
      intro: "A {company} minden erőfeszítést megtesz annak érdekében, hogy megbízható és ellenőrzött információkat nyújtson a felhasználók számára. Mindazonáltal:",
      items: [
        {
          title: "Az információk pontossága",
          description: "A weboldalon terjesztett információk csak tájékoztató jellegűek, és pontatlanságokat tartalmazhatnak vagy elavultak lehetnek. Törekszünk a lehető leggyorsabb javításukra."
        },
        {
          title: "A szolgáltatás elérhetősége",
          description: "A YOJOB nem vállal felelősséget a weboldal karbantartás, frissítés vagy műszaki hiba miatti ideiglenes megszakításáért."
        },
        {
          title: "Külső hivatkozások",
          description: "A weboldal harmadik felek weboldalaira mutató hivatkozásokat tartalmazhat. A YOJOB nem gyakorol ellenőrzést ezek felett az oldalak felett, és minden felelősséget elhárít a tartalmukért."
        },
        {
          title: "Vírusok és hackelés",
          description: "A YOJOB minden ésszerű eszközt bevet a weboldal biztonságának garantálása érdekében, de nem tudja garantálni a vírusok vagy rosszindulatú cselekmények elleni abszolút védelmet."
        }
      ]
    },

    applicableLaw: {
      title: "8. Alkalmazandó jog és illetékesség",
      intro: "Ezen jogi információkra a francia jog az irányadó.",
      law: {
        title: "🇫🇷 Alkalmazandó jog",
        description: "Ezen jogi információkra és a weboldal használatára a francia jog az irányadó."
      },
      jurisdiction: {
        title: "⚖️ Illetékes bíróság",
        description: "Vita esetén és békés megegyezés hiányában kizárólag a francia bíróságok rendelkeznek hatáskörrel. A területi illetékességre vonatkozó alkalmazandó szabályokkal összhangban a YOJOB székhelye szerinti bíróságok rendelkeznek hatáskörrel."
      },
      amicableSettlement: {
        title: "🤝 Békés rendezés",
        description: "Bármilyen jogi eljárás megindítása előtt arra biztatjuk, hogy vegye fel velünk a kapcsolatot, hogy megpróbáljuk békésen rendezni az esetleges nézeteltéréseket."
      }
    },

    mediation: {
      title: "9. Közvetítés és vitarendezés",
      intro: "A francia fogyasztói törvénykönyv békés vitarendezésre vonatkozó rendelkezéseivel összhangban:",
      platform: {
        title: "Online vitarendezési platform",
        description: "Az Európai Bizottság online vitarendezési platformot hozott létre, amely a következő címen érhető el:"
      }
    },

    contact: {
      title: "10. Lépjen kapcsolatba velünk",
      intro: "A jogi információkkal vagy a weboldal használatával kapcsolatos bármilyen kérdés esetén:",
      emailCard: {
        title: "E-mailben"
      },
      mailCard: {
        title: "Postán"
      }
    }
  },

  cta: {
    title: "Átláthatóság és megfelelőség",
    description: "A {company} vállalja, hogy betartja a hatályos szabályokat, és minden szükséges jogi információt a rendelkezésére bocsát.",
    backHome: "Vissza a főoldalra",
    contactUs: "Kapcsolatfelvétel"
  },

  badges: {
    essential: "Elengedhetetlen",
    optional: "Opcionális"
  },

  footer: {
    copyright: "© {year} {company}. Minden jog fenntartva."
  }
};
