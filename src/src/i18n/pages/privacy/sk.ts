/**
 * 🇸🇰 SLOVENSKÉ PREKLADY - STRÁNKA ZÁSAD OCHRANY OSOBNÝCH ÚDAJOV
 * 
 * @version 1.0.0
 */

export const privacySK = {
  hero: {
    badge: "Zásady ochrany osobných údajov",
    title: "Ochrana vašich osobných údajov",
    subtitle: "V spoločnosti {company} sa zaväzujeme chrániť a rešpektovať vaše súkromie v súlade s Všeobecným nariadením o ochrane údajov (GDPR).",
    lastUpdate: "Posledná aktualizácia:"
  },

  dpo: {
    title: "Zodpovedná osoba pre ochranu osobných údajov (DPO)",
    subtitle: "Váš privilegovaný kontakt pre otázky týkajúce sa vašich údajov"
  },

  sections: {
    dataController: {
      title: "1. Prevádzkovateľ údajov",
      intro: "Prevádzkovateľom osobných údajov je:",
      location: "Bordeaux, Francúzsko",
      email: "E-mail:"
    },

    dataCollected: {
      title: "2. Zhromažďované osobné údaje",
      intro: "V rámci našich európskych náborových služieb zhromažďujeme nasledujúce údaje:",
      items: [
        {
          label: "Identifikačné údaje:",
          description: "Meno, priezvisko, e-mail, telefón"
        },
        {
          label: "Profesijné údaje:",
          description: "Spoločnosť, pozícia, odvetvie činnosti"
        },
        {
          label: "Kontaktné údaje:",
          description: "Poštová adresa, komunikačné preferencie"
        },
        {
          label: "Navigačné údaje:",
          description: "Súbory cookie, IP adresa, údaje o pripojení"
        }
      ]
    },

    purposes: {
      title: "3. Účely spracovania",
      intro: "Vaše údaje sú zhromažďované a spracovávané na nasledujúce účely:",
      items: [
        {
          title: "Správa náborových dopytov",
          description: "Spracovanie vašich dopytov a spojenie s našou sieťou partnerských agentúr."
        },
        {
          title: "Zlepšovanie našich služieb",
          description: "Analýza využívania našich služieb na účely zlepšenia vášho používateľského zážitku."
        },
        {
          title: "Obchodná komunikácia",
          description: "Informovanie o našich nových službách a našom európskom marketplace (s vaším súhlasom)."
        }
      ]
    },

    legalBasis: {
      title: "4. Právny základ spracovania",
      intro: "Spracovanie vašich údajov je založené na nasledujúcich právnych základoch:",
      items: [
        {
          basis: "Plnenie zmluvy",
          description: "Spracovanie potrebné na odpoveď na vaše náborové dopyty"
        },
        {
          basis: "Súhlas",
          description: "Pre zasielanie marketingovej komunikácie (môžete súhlas kedykoľvek odvolať)"
        },
        {
          basis: "Oprávnený záujem",
          description: "Zlepšovanie našich služieb a zabezpečenie našej platformy"
        }
      ]
    },

    retention: {
      title: "5. Doba uchovania",
      intro: "Vaše osobné údaje uchovávame po nasledujúce obdobie:",
      items: [
        {
          period: "3 roky",
          description: "Údaje potenciálnych klientov a klientov"
        },
        {
          period: "13 mesiacov",
          description: "Súbory cookie a navigačné údaje"
        },
        {
          period: "5 rokov",
          description: "Účtovné a daňové doklady"
        },
        {
          period: "{days} dní",
          description: "Údaje z formulárov (konfigurovateľné)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Vaše práva",
      intro: "V súlade s GDPR máte nasledujúce práva:",
      items: [
        {
          title: "Právo na prístup",
          description: "Získanie kópie vašich osobných údajov"
        },
        {
          title: "Právo na opravu",
          description: "Oprava nesprávnych alebo neúplných údajov"
        },
        {
          title: "Právo na vymazanie",
          description: "Požiadavka na vymazanie vašich údajov"
        },
        {
          title: "Právo na omedzenie",
          description: "Omedzenie spracovania vašich údajov"
        },
        {
          title: "Právo na prenosnosť",
          description: "Získanie vašich údajov v štruktúrovanom formáte"
        },
        {
          title: "Právo namietať",
          description: "Námietka proti spracovaniu vašich údajov"
        }
      ],
      footer: "Pre uplatnenie svojich práv kontaktujte nášho DPO na adrese"
    },

    security: {
      title: "7. Zabezpečenie údajov",
      intro: "Implementujeme vhodné technické a organizačné bezpečnostné opatrenia:",
      measures: [
        "Šifrovanie údajov pri prenose a v pokoji (SSL/TLS)",
        "Obmedzený prístup k údajom pomocou silného overenia",
        "Pravidelné zálohy a plán kontinuity prevádzky",
        "Bezpečnostné audity a pravidelné aktualizácie",
        "Školenie personálu o osvedčených postupoch GDPR"
      ]
    },

    transfers: {
      title: "8. Prenos údajov",
      intro: "V rámci našej európskej siete viac ako 500 partnerských agentúr v 27 krajinách:",
      eu: {
        title: "🇪🇺 V rámci Európskej únie",
        description: "Vaše údaje môžu byť prenášané našim partnerským agentúram nachádzajúcim sa v EÚ/EHP, ktoré využívajú rovnakú úroveň ochrany GDPR."
      },
      nonEu: {
        title: "🌍 Mimo Európsku úniu",
        description: "V prípade prenosu mimo EÚ používame Štandardné zmluvné doložky (SCC) Európskej komisie na zabezpečenie primeranej úrovne ochrany."
      }
    },

    cookies: {
      title: "9. Súbory cookie a sledovacie mechanizmy",
      intro: "Naša webová stránka používa súbory cookie na zlepšenie vášho prehliadania:",
      types: [
        {
          type: "Nevyhnutné súbory cookie",
          description: "Nevyhnutné pre fungovanie webu (relácia, zabezpečenie)",
          required: true
        },
        {
          type: "Analytické súbory cookie",
          description: "Meranie návštevnosti a štatistiky",
          required: false
        },
        {
          type: "Marketingové súbory cookie",
          description: "Cielená reklama a personalizácia",
          required: false
        }
      ],
      footer: "Svoje preferencie týkajúce sa súborov cookie môžete kedykoľvek spravovať v nastaveniach prehliadača."
    },

    contact: {
      title: "10. Kontakt a sťažnosť",
      intro: "V prípade akýchkoľvek otázok týkajúcich sa spracovania vašich osobných údajov:",
      dpoCard: {
        title: "Kontaktujte nášho DPO"
      },
      cnilCard: {
        title: "Dozorný orgán",
        name: "CNIL (Francúzsko)"
      },
      footer: "Ak sa domnievate, že vaše práva nie sú rešpektované, máte právo podať sťažnosť Národnej komisii pre informatiku a slobody (CNIL)."
    }
  },

  cta: {
    title: "Vaše údaje v bezpečných rukách",
    description: "Ochrana vašich osobných údajov je naša priorita. Zaväzujeme sa dodržiavať GDPR a zabezpečiť bezpečnosť vašich informácií.",
    backHome: "Späť na hlavnú stránku",
    contactDpo: "Kontaktovať DPO"
  },

  badges: {
    required: "Povinné",
    optional: "Voliteľné"
  }
};
