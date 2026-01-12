/**
 * 🇨🇿 ČESKÉ PŘEKLADY - STRÁNKA ZÁSAD OCHRANY OSOBNÍCH ÚDAJŮ
 * 
 * @version 1.0.0
 */

export const privacyCS = {
  hero: {
    badge: "Zásady ochrany osobních údajů",
    title: "Ochrana vašich osobních údajů",
    subtitle: "Ve společnosti {company} se zavazujeme chránit a respektovat vaše soukromí v souladu s Obecným nařízením o ochraně osobních údajů (GDPR).",
    lastUpdate: "Poslední aktualizace:"
  },

  dpo: {
    title: "Pověřenec pro ochranu osobních údajů (DPO)",
    subtitle: "Váš privilegovaný kontakt pro otázky týkající se vašich údajů"
  },

  sections: {
    dataController: {
      title: "1. Správce údajů",
      intro: "Správcem osobních údajů je:",
      location: "Bordeaux, Francie",
      email: "E-mail:"
    },

    dataCollected: {
      title: "2. Shromažďované osobní údaje",
      intro: "V rámci našich evropských náborových služeb shromažďujeme následující údaje:",
      items: [
        {
          label: "Identifikační údaje:",
          description: "Jméno, příjmení, e-mail, telefon"
        },
        {
          label: "Profesní údaje:",
          description: "Společnost, pozice, odvětví činnosti"
        },
        {
          label: "Kontaktní údaje:",
          description: "Poštovní adresa, komunikační preference"
        },
        {
          label: "Navigační údaje:",
          description: "Soubory cookie, IP adresa, údaje o připojení"
        }
      ]
    },

    purposes: {
      title: "3. Účely zpracování",
      intro: "Vaše údaje jsou shromažďovány a zpracovávány za následujícími účely:",
      items: [
        {
          title: "Správa náborových dotazů",
          description: "Zpracování vašich poptávek a spojení s naší sítí partnerských agentur."
        },
        {
          title: "Zlepšování našich služeb",
          description: "Analýza využívání našich služeb za účelem zlepšení vašeho uživatelského zážitku."
        },
        {
          title: "Obchodní komunikace",
          description: "Informování o našich nových službách a našem evropském marketplace (s vaším souhlasem)."
        }
      ]
    },

    legalBasis: {
      title: "4. Právní základ zpracování",
      intro: "Zpracování vašich údajů je založeno na následujících právních základech:",
      items: [
        {
          basis: "Plnění smlouvy",
          description: "Zpracování nezbytné pro odpověď na vaše náborové dotazy"
        },
        {
          basis: "Souhlas",
          description: "Pro zasílání marketingové komunikace (můžete souhlas kdykoli odvolat)"
        },
        {
          basis: "Oprávněný zájem",
          description: "Zlepšování našich služeb a zabezpečení naší platformy"
        }
      ]
    },

    retention: {
      title: "5. Doba uchovávání",
      intro: "Vaše osobní údaje uchováváme po následující dobu:",
      items: [
        {
          period: "3 roky",
          description: "Údaje potenciálních klientů a klientů"
        },
        {
          period: "13 měsíců",
          description: "Soubory cookie a navigační údaje"
        },
        {
          period: "5 let",
          description: "Účetní a daňové doklady"
        },
        {
          period: "{days} dní",
          description: "Údaje z formulářů (konfigurovatelné)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Vaše práva",
      intro: "V souladu s GDPR máte následující práva:",
      items: [
        {
          title: "Právo na přístup",
          description: "Získání kopie vašich osobních údajů"
        },
        {
          title: "Právo na opravu",
          description: "Oprava nesprávných nebo neúplných údajů"
        },
        {
          title: "Právo na výmaz",
          description: "Požadavek na vymazání vašich údajů"
        },
        {
          title: "Právo na omezení",
          description: "Omezení zpracování vašich údajů"
        },
        {
          title: "Právo na přenositelnost",
          description: "Získání vašich údajů ve strukturovaném formátu"
        },
        {
          title: "Právo vznést námitku",
          description: "Námitka proti zpracování vašich údajů"
        }
      ],
      footer: "Pro uplatnění svých práv kontaktujte našeho DPO na adrese"
    },

    security: {
      title: "7. Zabezpečení údajů",
      intro: "Implementujeme vhodná technická a organizační bezpečnostní opatření:",
      measures: [
        "Šifrování údajů při přenosu a v klidu (SSL/TLS)",
        "Omezený přístup k údajům pomocí silného ověřování",
        "Pravidelné zálohy a plán kontinuity provozu",
        "Bezpečnostní audity a pravidelné aktualizace",
        "Školení personálu o osvědčených postupech GDPR"
      ]
    },

    transfers: {
      title: "8. Předávání údajů",
      intro: "V rámci naší evropské sítě více než 500 partnerských agentur ve 27 zemích:",
      eu: {
        title: "🇪🇺 V rámci Evropské unie",
        description: "Vaše údaje mohou být předávány našim partnerským agenturám nacházejícím se v EU/EHP, které využívají stejnou úroveň ochrany GDPR."
      },
      nonEu: {
        title: "🌍 Mimo Evropskou unii",
        description: "V případě předávání mimo EU používáme Standardní smluvní doložky (SCC) Evropské komise k zajištění odpovídající úrovně ochrany."
      }
    },

    cookies: {
      title: "9. Soubory cookie a sledovací mechanismy",
      intro: "Naše webová stránka používá soubory cookie ke zlepšení vašeho prohlížení:",
      types: [
        {
          type: "Nezbytné soubory cookie",
          description: "Nezbytné pro fungování webu (relace, zabezpečení)",
          required: true
        },
        {
          type: "Analytické soubory cookie",
          description: "Měření návštěvnosti a statistiky",
          required: false
        },
        {
          type: "Marketingové soubory cookie",
          description: "Cílená reklama a personalizace",
          required: false
        }
      ],
      footer: "Své preference týkající se souborů cookie můžete kdykoli spravovat v nastavení prohlížeče."
    },

    contact: {
      title: "10. Kontakt a stížnost",
      intro: "V případě jakýchkoli dotazů týkajících se zpracování vašich osobních údajů:",
      dpoCard: {
        title: "Kontaktujte našeho DPO"
      },
      cnilCard: {
        title: "Dozorový orgán",
        name: "CNIL (Francie)"
      },
      footer: "Pokud se domníváte, že vaše práva nejsou respektována, máte právo podat stížnost Komisi pro informatiku a svobody (CNIL)."
    }
  },

  cta: {
    title: "Vaše údaje v bezpečných rukou",
    description: "Ochrana vašich osobních údajů je naší prioritou. Zavazujeme se dodržovat GDPR a zajistit bezpečnost vašich informací.",
    backHome: "Zpět na hlavní stránku",
    contactDpo: "Kontaktovat DPO"
  },

  badges: {
    required: "Povinné",
    optional: "Volitelné"
  }
};
