/**
 * 🇭🇺 MAGYAR FORDÍTÁSOK - ADATVÉDELMI IRÁNYELVEK OLDAL
 * 
 * @version 1.0.0
 */

export const privacyHU = {
  hero: {
    badge: "Adatvédelmi irányelvek",
    title: "Az Ön személyes adatainak védelme",
    subtitle: "A {company} cégnél elkötelezettek vagyunk az Ön adatainak védelme és tiszteletben tartása mellett, az Általános Adatvédelmi Rendelet (GDPR) előírásainak megfelelően.",
    lastUpdate: "Utolsó frissítés:"
  },

  dpo: {
    title: "Adatvédelmi tisztviselő (DPO)",
    subtitle: "Az Ön elsődleges kapcsolattartója az adataival kapcsolatos kérdésekben"
  },

  sections: {
    dataController: {
      title: "1. Adatkezelő",
      intro: "A személyes adatok kezelője:",
      location: "Bordeaux, Franciaország",
      email: "E-mail:"
    },

    dataCollected: {
      title: "2. Gyűjtött személyes adatok",
      intro: "Európai toborzási szolgáltatásaink keretében az alábbi adatokat gyűjtjük:",
      items: [
        {
          label: "Azonosító adatok:",
          description: "Vezetéknév, keresztnév, e-mail, telefon"
        },
        {
          label: "Szakmai adatok:",
          description: "Cég, beosztás, tevékenységi ágazat"
        },
        {
          label: "Kapcsolattartási adatok:",
          description: "Postai cím, kommunikációs preferenciák"
        },
        {
          label: "Navigációs adatok:",
          description: "Cookie-k, IP-cím, kapcsolódási adatok"
        }
      ]
    },

    purposes: {
      title: "3. Az adatkezelés célja",
      intro: "Az Ön adatait az alábbi célokból gyűjtjük és kezeljük:",
      items: [
        {
          title: "Toborzási megkeresések kezelése",
          description: "Az Ön ajánlatkérési igényeinek feldolgozása és összekötése partnerügynökségeink hálózatával."
        },
        {
          title: "Szolgáltatásaink javítása",
          description: "Szolgáltatásaink használatának elemzése a felhasználói élmény javítása érdekében."
        },
        {
          title: "Üzleti kommunikáció",
          description: "Tájékoztatás új szolgáltatásainkról és európai piacterünkről (az Ön hozzájárulásával)."
        }
      ]
    },

    legalBasis: {
      title: "4. Az adatkezelés jogalapja",
      intro: "Az Ön adatainak kezelése az alábbi jogalapokon nyugszik:",
      items: [
        {
          basis: "Szerződés teljesítése",
          description: "A toborzási megkeresésekre való válaszadáshoz szükséges adatkezelés"
        },
        {
          basis: "Hozzájárulás",
          description: "Marketing kommunikáció küldéséhez (a hozzájárulást bármikor visszavonhatja)"
        },
        {
          basis: "Jogos érdek",
          description: "Szolgáltatásaink javítása és platformunk biztonsága"
        }
      ]
    },

    retention: {
      title: "5. Adatmegőrzési időtartam",
      intro: "Az Ön személyes adatait az alábbi időtartamokig őrizzük meg:",
      items: [
        {
          period: "3 év",
          description: "Potenciális ügyfelek és ügyfelek adatai"
        },
        {
          period: "13 hónap",
          description: "Cookie-k és navigációs adatok"
        },
        {
          period: "5 év",
          description: "Számviteli és adózási dokumentumok"
        },
        {
          period: "{days} nap",
          description: "Űrlapokból származó adatok (konfigurálható)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Az Ön jogai",
      intro: "A GDPR szerint az alábbi jogokkal rendelkezik:",
      items: [
        {
          title: "Hozzáférési jog",
          description: "Személyes adatainak másolatának megszerzése"
        },
        {
          title: "Helyesbítéshez való jog",
          description: "Helytelen vagy hiányos adatok javítása"
        },
        {
          title: "Törléshez való jog",
          description: "Adatainak törlésének kérése"
        },
        {
          title: "Korlátozáshoz való jog",
          description: "Adatai kezelésének korlátozása"
        },
        {
          title: "Adathordozhatósághoz való jog",
          description: "Adatainak strukturált formátumban való megkapása"
        },
        {
          title: "Tiltakozáshoz való jog",
          description: "Tiltakozás adatai kezelése ellen"
        }
      ],
      footer: "Jogai gyakorlásához forduljon adatvédelmi tisztviselőnkhöz a következő címen"
    },

    security: {
      title: "7. Adatbiztonság",
      intro: "Megfelelő technikai és szervezési biztonsági intézkedéseket hajtunk végre:",
      measures: [
        "Adatok titkosítása átvitel és tárolás közben (SSL/TLS)",
        "Korlátozott adathozzáférés erős hitelesítéssel",
        "Rendszeres biztonsági mentések és üzletmenet-folytonossági terv",
        "Biztonsági auditok és rendszeres frissítések",
        "Munkatársak képzése a GDPR bevált gyakorlatairól"
      ]
    },

    transfers: {
      title: "8. Adattovábbítás",
      intro: "500+ partnerügynökségünk európai hálózata keretében 27 országban:",
      eu: {
        title: "🇪🇺 Az Európai Unión belül",
        description: "Az Ön adatai továbbíthatók az EU/EGT területén található partnerügynökségeinknek, amelyek ugyanazon GDPR védelmi szintet alkalmazzák."
      },
      nonEu: {
        title: "🌍 Az Európai Unión kívül",
        description: "EU-n kívüli adattovábbítás esetén az Európai Bizottság Standard Szerződéses Záradékait (SCC) használjuk a megfelelő védelmi szint biztosítására."
      }
    },

    cookies: {
      title: "9. Cookie-k és nyomkövető mechanizmusok",
      intro: "Weboldalunk cookie-kat használ a böngészési élmény javítása érdekében:",
      types: [
        {
          type: "Alapvető cookie-k",
          description: "A weboldal működéséhez nélkülözhetetlenek (munkamenet, biztonság)",
          required: true
        },
        {
          type: "Analitikai cookie-k",
          description: "Látogatottság mérése és statisztikák",
          required: false
        },
        {
          type: "Marketing cookie-k",
          description: "Célzott hirdetés és személyre szabás",
          required: false
        }
      ],
      footer: "Cookie-beállításait bármikor módosíthatja a böngészője beállításaiban."
    },

    contact: {
      title: "10. Kapcsolat és panasz",
      intro: "Személyes adatai kezelésével kapcsolatos kérdéseivel:",
      dpoCard: {
        title: "Lépjen kapcsolatba DPO-nkkal"
      },
      cnilCard: {
        title: "Felügyeleti hatóság",
        name: "CNIL (Franciaország)"
      },
      footer: "Ha úgy véli, hogy jogait nem tartják tiszteletben, panaszt nyújthat be a Nemzeti Informatikai és Szabadságjogi Bizottsághoz (CNIL)."
    }
  },

  cta: {
    title: "Az Ön adatai biztonságban vannak",
    description: "Az Ön személyes adatainak védelme prioritásunk. Elkötelezettek vagyunk a GDPR betartása és adatai biztonságának garantálása mellett.",
    backHome: "Vissza a főoldalra",
    contactDpo: "DPO kapcsolat"
  },

  badges: {
    required: "Kötelező",
    optional: "Opcionális"
  }
};
