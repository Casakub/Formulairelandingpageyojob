/**
 * 🇭🇷 HRVATSKI PRIJEVOD - OBRAZAC ZA ZAHTJEV ZA PONUDU
 * 
 * Kompletan hrvatski prijevod obrasca za zahtjev za ponudu
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const hr: DevisTranslations = {
  // === OPĆE ===
  common: {
    next: "Dalje",
    previous: "Natrag",
    submit: "Pošalji",
    required: "*",
    optional: "(neobavezno)",
    loading: "Učitavanje...",
    error: "Greška",
    success: "Uspjeh",
    cancel: "Otkaži",
    save: "Spremi",
    edit: "Uredi",
    delete: "Izbriši",
    confirm: "Potvrdi",
    euro: "€",
    perHour: "/sat",
    perMonth: "/mj",
    perDay: "/dan",
    persons: "osoba",
    hours: "sati",
    days: "dana",
    months: "mjeseci",
    year: "godina",
  },

  // === NAVIGACIJA ===
  navigation: {
    back: "Natrag",
    stepOf: "Korak {step} od {total}",
    steps: {
      entreprise: {
        title: "Tvrtka",
        badge: "🏢 Vaša tvrtka",
      },
      contact: {
        title: "Kontakt",
        badge: "👤 Vaša kontakt osoba",
      },
      besoins: {
        title: "Potrebe",
        badge: "💼 Vaše potrebe",
      },
      conditions: {
        title: "Uvjeti",
        badge: "📋 Uvjeti",
      },
      candidats: {
        title: "Kandidati",
        badge: "👷 Traženi profil",
      },
      recapitulatif: {
        title: "Sažetak",
        badge: "✅ Sažetak",
      },
    },
  },

  // === VALIDACIJA ===
  validation: {
    fillRequired: "Molimo ispunite sva obavezna polja",
    selectRegion: "Molimo odaberite regiju",
    addAtLeastOnePosition: "Molimo dodajte barem jednu poziciju",
    invalidEmail: "Molimo unesite valjanu e-mail adresu",
    invalidPhone: "Molimo unesite valjan telefonski broj",
    invalidSIRET: "Molimo unesite valjan SIRET broj (14 znamenki)",
    dateRequired: "Molimo unesite datum početka",
    missionLocationRequired: "Molimo unesite mjesto misije",
  },

  // === PORUKE ===
  messages: {
    success: {
      quoteSent: "Zahtjev za ponudu uspješno poslan!",
      redirecting: "Preusmjeravanje...",
    },
    error: {
      submitError: "Greška pri slanju zahtjeva za ponudu",
      genericError: "Došlo je do greške",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Zahtjev za ponudu | YOJOB",
    pageDescription: "Zatražite ponudu za vaše europske potrebe privremenog zapošljavanja.",
  },

  // === KORAK 1: TVRTKA ===
  step1: {
    title: "Informacije o tvrtki",
    subtitle: "Unesite pravne podatke vaše korisničke tvrtke.",
    fields: {
      pays: {
        label: "Država",
        placeholder: "Odaberite državu",
      },
      raisonSociale: {
        label: "Naziv tvrtke",
        placeholder: "Npr.: YOJOB d.o.o.",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 znamenki",
        helper: "Identifikacijski broj vašeg pogona",
      },
      codeAPE: {
        label: "APE/NAF šifra",
        placeholder: "Npr.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Intrakomunitarni PDV",
        placeholder: "Npr.: HR12345678901",
      },
      adresse: {
        label: "Puna adresa",
        placeholder: "Kućni broj i naziv ulice",
      },
      codePostal: {
        label: "Poštanski broj",
        placeholder: "Npr.: 10000",
      },
      ville: {
        label: "Grad",
        placeholder: "Npr.: Zagreb",
      },
      region: {
        label: "Regija/Županija",
        placeholder: "Odaberite regiju",
        placeholderOtherCountry: "Npr.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Web stranica",
        placeholder: "https://www.primjer.hr",
      },
    },
    infoMessage: "✓ Ovi podaci će se koristiti za izradu vaše personalizirane ponude",
  },

  // === KORAK 2: KONTAKT ===
  step2: {
    title: "Kontakt osoba",
    subtitle: "Tko će biti vaša primarna kontakt osoba za ovaj projekt?",
    fields: {
      civilite: {
        label: "Oslovljavanje",
        options: {
          m: "Gospodin",
          mme: "Gospođa",
        },
      },
      nom: {
        label: "Prezime",
        placeholder: "Npr.: Horvat",
      },
      prenom: {
        label: "Ime",
        placeholder: "Npr.: Ivan",
      },
      fonction: {
        label: "Funkcija",
        placeholder: "Npr.: HR menadžer",
      },
      email: {
        label: "Poslovna e-mail adresa",
        placeholder: "ivan.horvat@tvrtka.hr",
      },
      telephone: {
        label: "Telefon",
        placeholder: "+385 91 123 4567",
      },
    },
  },

  // === KORAK 3: POTREBE ===
  step3: {
    title: "Vaše potrebe za zapošljavanjem",
    subtitle: "Opišite tražene profile i njihove uvjete.",
    profileLabel: "Profil",
    addProfile: "Dodaj dodatni profil",
    removeProfile: "Ukloni ovaj profil",
    loadingConfig: "Učitavanje konfiguracije...",
    missingRegionWarning: "⚠️ Molimo odaberite svoju regiju u koraku 1 za automatski prikaz plaća.",
    fields: {
      secteur: {
        label: "Djelatnost",
        placeholder: "Odaberite djelatnost",
      },
      convention: {
        label: "Kolektivni ugovor",
        placeholder: "Automatski prema djelatnosti",
      },
      poste: {
        label: "Tražena pozicija",
        placeholder: "Odaberite poziciju",
      },
      classification: {
        label: "Klasifikacija / Kvalifikacija",
        placeholder: "Odaberite klasifikaciju",
      },
      quantite: {
        label: "Broj osoba",
        placeholder: "Npr.: 5",
        helper: "Koliko osoba je potrebno za ovu poziciju?",
      },
      salaireBrut: {
        label: "Bruto mjesečna plaća",
        placeholder: "Npr.: 2500",
        helper: "Bruto plaća na temelju 151,67 sati/mjesec",
      },
      nationalite: {
        label: "Državljanstvo radnika",
        placeholder: "Odaberite državu",
        helper: "Državljanstvo utječe na koeficijent stope agencije",
      },
    },
    ajouterPoste: "Dodaj novu poziciju",
    supprimerPoste: "Ukloni ovu poziciju",
    posteNumero: "Pozicija",
    coefficientInfo: {
      title: "💡 Primijenjeni koeficijent agencije",
      base: "Osnovni koef.",
      facteurPays: "Faktor države",
      final: "Konačni koeficijent",
    },
    summary: {
      title: "Naknada radnika",
      salaireBrutMensuel: "Bruto mjesečna plaća",
      tauxHoraireBrut: "Bruto satnica",
      baseMensuelle: "(Osnova 151,67 sati/mj prema kolektivnom ugovoru)",
    },
  },

  // === KORAK 4: UVJETI ===
  step4: {
    title: "Radni uvjeti",
    subtitle: "Preciznije navedite uvjete zapošljavanja i ponuđene pogodnosti.",
    dateError: "Datum završetka mora biti nakon datuma početka",
    fields: {
      dateDebut: {
        label: "Traženi datum početka",
        placeholder: "DD/MM/GGGG",
      },
      dateFin: {
        label: "Predviđeni datum završetka",
        placeholder: "DD/MM/GGGG",
        helper: "Ostavite prazno za neodređeno vrijeme",
      },
      baseHoraire: {
        label: "Mjesečna satna osnova",
        placeholder: "Npr.: 151,67",
        helper: "Zakonska osnova u Francuskoj: 151,67 sati/mjesec (35 sati/tjedan)",
      },
      lieuxMission: {
        label: "Mjesta misije",
        placeholder: "Npr.: Zagreb centar, Split zona 3, Rijeka...",
      },
      periodeEssai: {
        label: "Probni rad",
        placeholder: "Odaberite trajanje",
        options: {
          '2': '2 dana',
          '3': '3 dana',
          '5': '5 dana',
          '15': '15 dana',
        },
      },
      motifRecours: {
        label: "Razlog privremenog zapošljavanja",
        placeholder: "Odaberite razlog",
        options: {
          accroissement: "Privremeno povećanje aktivnosti",
          remplacement: "Zamjena odsutnog zaposlenika",
          saisonnier: "Sezonski rad",
          exportation: "Izvanredna izvozna narudžba",
          autre: "Ostalo (precizirati)",
        },
      },
      delaiPaiement: {
        label: "Traženi rok plaćanja",
        placeholder: "Odaberite rok",
        options: {
          reception: "Plaćanje po primitku",
          j30: "30 dana",
          j45: "45 dana",
          j60: "60 dana",
        },
      },
    },
    hebergement: {
      title: "Smještaj",
      chargeEU: {
        label: "Smještaj osiguran od strane korisničke tvrtke",
        helper: "Ako NE: agencija će naplatiti dodatak +3,50 €/sat",
      },
      supplementWarning: "⚠️ Naplatit će se dodatak +3,50 €/sat jer smještaj nije osiguran",
      commentaire: {
        label: "Detalji o smještaju",
        placeholder: "Vrsta smještaja, adresa, posebni uvjeti...",
      },
    },
    transport: {
      title: "Lokalni prijevoz",
      chargeETT: {
        label: "Lokalni prijevoz osiguran od strane agencije",
        helper: "Ako DA: naplatit će se dodatak +1,50 €/sat",
      },
      supplementInfo: "✓ Naplatit će se dodatak +1,50 €/sat za pokrivanje troškova lokalnog prijevoza",
    },
    repas: {
      title: "Prehrana",
      options: {
        restaurant: "Tvrtkaća kantina / Restorani bonovi",
        panier: "Dnevnica za hranu (naplaćuje se dnevno)",
        nonConcerne: "Ne odnosi se",
      },
      montantInfo: "📋 Iznos dnevnice: {montant} / radni dan (naplaćuje se odvojeno)",
      montantNonDefini: "⚠️ Iznos nije definiran za ovu državu/regiju",
    },
    sections: {
      hebergement: {
        title: "Smještaj",
        chargeEU: {
          label: "Smještaj osiguran od strane korisničke tvrtke",
          helper: "Ako NE: agencija će naplatiti dodatak +3,50 €/sat",
          options: {
            oui: "Da, osigurano od korisnika",
            non: "Ne, plaća radnik",
          },
        },
        detailsEU: {
          type: {
            label: "Vrsta smještaja",
            options: {
              hotel: "Hotel",
              appartement: "Stan",
              foyer: "Dom radnika",
              autre: "Ostalo",
            },
          },
          adresse: {
            label: "Adresa smještaja",
            placeholder: "Puna adresa smještaja",
          },
        },
      },
      transportInternational: {
        title: "Međunarodni prijevoz (država porijekla ↔ Francuska)",
        chargeEU: {
          label: "Prijevoz osiguran od strane korisničke tvrtke",
          helper: "Putovanja između države porijekla i mjesta misije",
          options: {
            oui: "Da, osigurano od korisnika",
            non: "Ne, plaća radnik",
          },
        },
        detailsEU: {
          type: {
            label: "Vrsta prijevoza",
            options: {
              avion: "Avion",
              train: "Vlak",
              bus: "Autobus",
              covoiturage: "Organizirano dijeljenje vožnje",
            },
          },
          frequence: {
            label: "Učestalost putovanja",
            options: {
              allerRetour: "Samo početni dolazak i odlazak",
              hebdomadaire: "Tjedno",
              mensuel: "Mjesečno",
            },
          },
        },
      },
      transportLocal: {
        title: "Lokalni prijevoz",
        chargeETT: {
          label: "Lokalni prijevoz osiguran od strane agencije",
          helper: "Ako DA: naplatit će se dodatak +1,50 €/sat",
          options: {
            oui: "Da, osigurano od agencije",
            non: "Ne, plaća radnik",
          },
        },
        detailsETT: {
          type: {
            label: "Vrsta prijevoza",
            options: {
              vehicule: "Službeno vozilo",
              transport: "Javni prijevoz",
              velo: "Bicikl",
            },
          },
        },
      },
      repas: {
        title: "Prehrana",
        type: {
          label: "Vrsta prehrane",
          options: {
            restaurant: "Tvrtkaća kantina / Restorani bonovi",
            panier: "Dnevnica za hranu (naplaćuje se dnevno)",
            nonConcerne: "Ne odnosi se",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Dnevni budžet",
            placeholder: "Iznos u €",
          },
        },
        detailsPanier: {
          info: "Dnevnica za hranu će se naplaćivati odvojeno za svaki radni dan",
        },
      },
    },
  },

  // === KORAK 5: KANDIDATI ===
  step5: {
    title: "Profil kandidata",
    subtitle: "Definirajte kompetencije i konkretne zahtjeve.",
    sections: {
      experience: {
        title: "Radno iskustvo",
        obligatoire: {
          label: "Obvezno iskustvo",
        },
        annees: {
          label: "Minimalni broj godina iskustva",
          placeholder: "Npr.: 3",
          options: {
            '0-1': "Početnik (0-1 godina)",
            '1-3': "Srednji (1-3 godine)",
            '3-5': "Potvrđeno (3-5 godina)",
            '5+': "Stručnjak (5 godina i više)",
          },
        },
        competences: {
          label: "Potrebne tehničke kompetencije",
          placeholder: "Npr.: Zidarski radovi, oplate, čitanje planova, TIG zavarivanje...",
        },
      },
      formation: {
        title: "Obrazovanje",
        obligatoire: {
          label: "Obvezno obrazovanje",
        },
        type: {
          label: "Vrsta obrazovanja",
          placeholder: "Npr.: Kvalificirani zidar, CACES R489...",
        },
      },
      travailRisque: {
        title: "Rizičan rad",
        active: {
          label: "Specifičan rizičan rad",
        },
        precisions: {
          label: "Preciziranje rizika",
          placeholder: "Npr.: Rad na visini, rukovanje teškim teretima...",
        },
      },
      langues: {
        title: "Jezične vještine",
        francais: {
          label: "Potrebna razina francuskog jezika",
          placeholder: "Odaberite razinu",
          options: {
            a1: "A1 - Početnik",
            a2: "A2 - Osnovni",
            b1: "B1 - Srednji",
            b2: "B2 - Napredni",
            c1: "C1 - Vrlo napredni",
            c2: "C2 - Izvorni govornik",
            natif: "Izvorni govornik",
          },
        },
        autres: {
          label: "Drugi korisni jezici",
          placeholder: "Npr.: Engleski (B1), Njemački (A2)...",
        },
        languageNames: {
          francais: "Francuski",
          anglais: "Engleski",
          portugais: "Portugalski",
          espagnol: "Španjolski",
          italien: "Talijanski",
          autre: "Ostali",
        },
        levels: {
          'non-requis': "Nije potrebno",
          'A1': "A1 - Početnik",
          'A2': "A2 - Osnovni",
          'B1': "B1 - Srednji",
          'B2': "B2 - Napredni",
          'C1': "C1 - Autonoman",
          'C2': "C2 - Izvorni govornik",
        },
      },
      permis: {
        title: "Vozačka dozvola",
        requis: {
          label: "Potrebna vozačka dozvola",
          options: {
            aucun: "Vozačka dozvola nije potrebna",
            b: "Vozačka dozvola kat. B (osobni automobil)",
            c: "Vozačka dozvola kat. C (kamion)",
            ce: "Vozačka dozvola kat. CE (kamion + prikolica)",
            d: "Vozačka dozvola kat. D (prijevoz osoba)",
          },
        },
        categorie: {
          label: "Kategorija vozačke dozvole",
          placeholder: "Npr.: B, C, CE...",
        },
      },
      outillage: {
        title: "Ručni alat",
        requis: {
          label: "Potreban vlastiti alat",
        },
        type: {
          label: "Vrsta alata",
          placeholder: "Npr.: Čekić, libela, rolmetar, gleter...",
        },
      },
      epi: {
        title: "Osobna zaštitna oprema (OZO)",
        infoLegale: "ℹ️ Prema propisima, poslodavac mora osigurati OZO prilagođenu rizicima pozicije.",
        selectionCount: "✓ {count} odabrano OZO",
        fournis: {
          label: "OZO osiguran od strane tvrtke",
          helper: "Kaciga, zaštitna obuća, rukavice itd.",
          options: {
            oui: "Da, osigurano od korisnika",
            non: "Ne, plaća radnik",
          },
        },
        liste: {
          label: "Popis potrebne OZO",
          placeholder: "Npr.: Kaciga, obuća S3, rukavice otporne na rezanje, sigurnosni pojas...",
        },
        items: {
          casque: "Zaštitna kaciga",
          lunettes: "Zaštitne naočale",
          protections_auditives: "Zaštita sluha",
          gants: "Zaštitne rukavice",
          chaussures: "Sigurnosna obuća",
          harnais: "Sigurnosni pojas",
          vetements: "Radna odjeća",
          masque: "Respirator",
          protection_faciale: "Štitnik za lice",
          vetements_visibilite: "Odjeća visoke vidljivosti",
        },
      },
      autresExigences: {
        title: "Ostali zahtjevi",
        label: "Ostali specifični zahtjevi",
        placeholder: "Npr.: Električarska ovlaštenja, CACES, dostupnost vikendom, rad na visini...",
      },
    },
  },

  // === SAŽETAK ===
  recapitulatif: {
    title: "Sažetak vašeg zahtjeva",
    subtitle: "Provjerite podatke prije slanja zahtjeva za ponudu.",
    acceptConditionsError: "Molimo prihvatite uvjete prije nastavka",
    entreprise: {
      title: "Tvrtka",
      raisonSociale: "Naziv tvrtke",
      siret: "SIRET",
      pays: "Država",
      ville: "Grad",
      region: "Regija/Županija",
    },
    contact: {
      title: "Kontakt",
      nomPrenom: "Ime i prezime",
      email: "E-mail",
      telephone: "Telefon",
      fonction: "Funkcija",
    },
    postes: {
      title: "Tražene pozicije",
      coeffETT: "📊 Primijenjeni koeficijent agencije",
      coeffBase: "Osnovni koef.",
      facteurPays: "Faktor države",
      supplementsHoraires: "✨ Satni dodaci (uključeni u stopu)",
      hebergement: "✓ Smještaj",
      transport: "✓ Lokalni prijevoz",
      panierRepas: "🍽️ Dnevnica za hranu (naplaćuje se dnevno)",
      baseHoraire: "📅 Satna osnova: {heures} sati/mj (utvrđeni prekovremeni)",
      heuresNormales: "Normalni sati (0-35 sati/tjedan)",
      heuresSup25: "Prekovremeni +25% (36.-43. sat)",
      heuresSup50: "Prekovremeni +50% (44.+ sat)",
      sousTotal: "Međuzbroj rada (po osobi)",
      tauxHoraireBrut: "Bruto satnica",
      tauxETTFinal: "Konačna stopa agencije",
      coutMensuel: "Ukupni mjesečni troškovi",
    },
    conditions: {
      title: "Uvjeti misije",
      dateDebut: "Datum početka",
      dateFin: "Datum završetka",
      dureeEstimee: "Procijenjeno trajanje",
      lieuMission: "Mjesto misije",
      mois: "mjeseci",
    },
    majorations: {
      title: "Tarifne prilagodbe misije",
      total: "Ukupne prilagodbe",
      notSet: "Nije definirano",
    },
    totaux: {
      mensuelHT: "Ukupno mjesečno bez PDV-a",
      mensuelTTC: "Ukupno mjesečno s PDV-om",
      totalMission: "Ukupni troškovi misije",
    },
    noteLegale: "ℹ️ Ova procjena je informativna. Konačna stopa bit će potvrđena nakon odobrenja našeg tima i odabrane partnerske agencije.",
    acceptConditions: {
      text: "Prihvaćam da će moji podaci biti obrađeni u skladu s",
      lien: "politikom zaštite privatnosti",
    },
    boutonEnvoi: {
      texte: "Pošalji moj zahtjev za ponudu",
      enCours: "Slanje...",
    },
    footer: "✓ Odgovor u roku od 24 radna sata • ✓ Bez obveza",
  },

  // === GREŠKE ===
  errors: {
    required: "Ovo polje je obavezno",
    invalidEmail: "Neispravna e-mail adresa",
    invalidSIRET: "Neispravan SIRET (potrebno 14 znamenki)",
    invalidPhone: "Neispravan telefonski broj",
    minValue: "Vrijednost mora biti veća ili jednaka {min}",
    maxValue: "Vrijednost mora biti manja ili jednaka {max}",
    genericError: "Došlo je do greške. Molimo pokušajte ponovno.",
    loadingError: "Greška pri učitavanju podataka",
    submitError: "Greška pri slanju zahtjeva",
  },

  // === DJELATNOSTI & ZANIMANJA ===
  secteurs: {
    batiment: {
      label: "Građevinarstvo",
      convention: "Nacionalni kolektivni ugovor građevinski radnici (3193)",
      postes: {
        macon: "Zidar",
        coffreur: "Stolar za oplate",
        ferrailleur: "Armirač",
        carreleur: "Pločar",
        platrier: "Gipsar",
        peintre: "Soboslikar",
        plombier: "Vodoinstalater",
        electricien: "Električar",
        couvreur: "Krovopokrivač",
        menuisier: "Stolar",
        chef_equipe_batiment: "Voditelj ekipe",
        chef_chantier: "Voditelj gradilišta",
      },
      classifications: {
        n1p1: "N1P1",
        n1p2: "N1P2",
        n2p1: "N2P1",
        n2p2: "N2P2",
        n3p1: "N3P1",
        n3p2: "N3P2",
        n4p1: "N4P1",
        n4p2: "N4P2",
      },
    },
    metallurgie: {
      label: "Metalurgija",
      convention: "Kolektivni ugovor metalurgija (3109)",
      postes: {
        soudeur: "Zavarivač",
        chaudronnier: "Kotlar",
        tuyauteur: "Cjevopolagač",
        tourneur: "Tokar",
        fraiseur: "Glodač",
        usineur: "CNC operater",
        mecanicien_industriel: "Industrijski mehaničar",
        monteur: "Monter",
        controleur_qualite: "Kontrolor kvalitete",
        ajusteur: "Bravar",
        chef_equipe_metallurgie: "Voditelj ekipe",
      },
      classifications: {
        niveau_1: "Razina I",
        niveau_2: "Razina II",
        niveau_3: "Razina III",
        niveau_4: "Razina IV",
        niveau_5: "Razina V",
      },
    },
    tp: {
      label: "Javni radovi",
      convention: "Nacionalni kolektivni ugovor javni radovi (3005)",
      postes: {
        conducteur_engins: "Rukovatelj strojevima",
        terrassier: "Kopač",
        canalisateur: "Kanalizacijski radnik",
        constructeur_routes: "Cestograđevinski radnik",
        coffreur_bancheur: "Stolar za oplate",
        macon_vrd: "Zidar javni radovi",
        chef_equipe_tp: "Voditelj ekipe JR",
        manoeuvre_tp: "Pomoćni radnik JR",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelijerstvo",
      convention: "Kolektivni ugovor hoteli-restorani (3292)",
      postes: {
        receptionniste: "Recepcioner",
        femme_chambre: "Sobarica",
        agent_entretien: "Radnik održavanja",
        bagagiste: "Vratar za prtljagu",
        concierge: "Vratar",
        night_audit: "Noćni revizor",
        gouvernante: "Glavna sobarica",
        chef_reception: "Voditelj recepcije",
      },
      classifications: {
        niveau_1: "Razina I",
        niveau_2: "Razina II",
        niveau_3: "Razina III",
        niveau_4: "Razina IV",
        niveau_5: "Razina V",
      },
    },
    restauration: {
      label: "Ugostiteljstvo",
      convention: "Kolektivni ugovor hoteli-restorani (3292)",
      postes: {
        cuisinier: "Kuhar",
        commis_cuisine: "Pomoćni kuhar",
        chef_partie: "Chef de partie",
        serveur: "Konobar",
        barman: "Barmen",
        plongeur: "Pomoćnik u kuhinji",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Glavni kuhar",
      },
      classifications: {
        niveau_1: "Razina I",
        niveau_2: "Razina II",
        niveau_3: "Razina III",
        niveau_4: "Razina IV",
        niveau_5: "Razina V",
      },
    },
    plasturgie: {
      label: "Industrija plastike",
      convention: "Kolektivni ugovor industrija plastike (0292)",
      postes: {
        operateur_injection: "Operater injekcijskog prešanja",
        operateur_extrusion: "Operater ekstruzije",
        regleur: "Podešavač",
        operateur_thermoformage: "Operater termoformiranja",
        controleur_qualite_plasturgie: "Kontrolor kvalitete",
        technicien_maintenance: "Tehničar održavanja",
        chef_equipe_plasturgie: "Voditelj ekipe",
      },
      classifications: {
        niveau_1: "Razina I",
        niveau_2: "Razina II",
        niveau_3: "Razina III",
        niveau_4: "Razina IV",
      },
    },
    automobile_carrosserie: {
      label: "Automobilska industrija & Limarska",
      convention: "Kolektivni ugovor popravak automobila (1090)",
      postes: {
        carrossier: "Limar",
        peintre_automobile: "Automobilski lakirer",
        mecanicien_auto: "Automehaničar",
        electricien_auto: "Autoelektričar",
        chef_atelier: "Voditelj radionice",
        controleur_technique: "Tehnički kontrolor",
      },
      classifications: {
        niveau_1: "Razina I",
        niveau_2: "Razina II",
        niveau_3: "Razina III",
        niveau_4: "Razina IV",
      },
    },
    sylviculture: {
      label: "Šumarstvo",
      convention: "Kolektivni ugovor poljoprivreda (7501)",
      postes: {
        bucheron: "Drvosjeca",
        elagueur: "Obrezivač drveća",
        conducteur_engins_forestiers: "Operater šumskih strojeva",
        chef_equipe_sylviculture: "Voditelj ekipe šumarstvo",
      },
      classifications: {
        niveau_1: "Razina I",
        niveau_2: "Razina II",
        niveau_3: "Razina III",
        niveau_4: "Razina IV",
      },
    },
    cartonnerie: {
      label: "Kartonska industrija",
      convention: "Kolektivni ugovor prerađivačka industrija (3107)",
      postes: {
        operateur_production: "Proizvodni operater",
        conducteur_ligne: "Voditelj linije",
        regleur_cartonnerie: "Podešavač",
        chef_equipe_cartonnerie: "Voditelj ekipe",
      },
      classifications: {
        niveau_1: "Razina I",
        niveau_2: "Razina II",
        niveau_3: "Razina III",
        niveau_4: "Razina IV",
      },
    },
    autre: {
      label: "Ostalo",
      convention: "Utvrditi prema djelatnosti",
      postes: {
        autre_poste: "Druga pozicija (precizirati)",
      },
      classifications: {
        a_definir: "Utvrditi",
      },
    },
  },

  // === EUROPSKE DRŽAVE ===
  pays: {
    france: "Francuska",
    allemagne: "Njemačka",
    autriche: "Austrija",
    belgique: "Belgija",
    bulgarie: "Bugarska",
    croatie: "Hrvatska",
    chypre: "Cipar",
    danemark: "Danska",
    espagne: "Španjolska",
    estonie: "Estonija",
    finlande: "Finska",
    grece: "Grčka",
    hongrie: "Mađarska",
    irlande: "Irska",
    italie: "Italija",
    lettonie: "Latvija",
    lituanie: "Litva",
    luxembourg: "Luksemburg",
    malte: "Malta",
    pays_bas: "Nizozemska",
    pologne: "Poljska",
    portugal: "Portugal",
    republique_tcheque: "Češka",
    roumanie: "Rumunjska",
    slovaquie: "Slovačka",
    slovenie: "Slovenija",
    suede: "Švedska",
  },

  // === STRANICA SAŽETAK PONUDE (POTPIS) ===
  pageRecap: {
    header: {
      title: "Sažetak ponude",
      exportPDF: "Izvezi u PDF",
      loading: "Učitavanje ponude...",
      notFound: "Ponuda nije pronađena",
    },
    statut: {
      signe: "Potpisano",
      nouveau: "Novo",
    },
    dates: {
      creeLe: "Stvoreno",
      a: "u",
      signeLe: "Potpisano",
      derniereModification: "Posljednja izmjena:",
    },
    entreprise: {
      title: "Informacije o tvrtki",
      raisonSociale: "Naziv tvrtke",
      siret: "SIRET",
      codeAPE: "APE šifra",
      tvaIntracommunautaire: "Intrakomunitarni PDV",
      adresse: "Adresa",
      siteInternet: "Web stranica",
    },
    contact: {
      title: "Kontakt osoba",
      nomComplet: "Puno ime",
      fonction: "Funkcija",
      email: "E-mail",
      telephonePortable: "Mobitel",
      telephoneFixe: "Fiksni telefon",
    },
    postes: {
      title: "Pozicije za popunjavanje",
      nationalite: "Državljanstvo",
      salaireBrut: "Bruto plaća",
      tauxHoraireBrut: "Bruto satnica",
      coefficientETT: "Koeficijent agencije",
      tauxETT: "Stopa agencije",
    },
    conditions: {
      title: "Radni uvjeti",
      dateDebut: "Datum početka",
      dateFin: "Datum završetka",
      periodeEssai: "Probni rad",
      baseHoraire: "Satna osnova",
      heuresMois: "sati/mj",
      lieuxMission: "Mjesta misije",
      motifRecours: "Razlog privremenog zapošljavanja",
    },
    candidats: {
      title: "Profil traženih kandidata",
      experience: "Iskustvo",
      ansMinimum: "godina minimalno",
      formation: "Obrazovanje",
      permis: "Vozačka dozvola",
      langues: "Jezici",
    },
    signature: {
      title: "Elektronički potpis",
      subtitle: "Potpišite svoju ponudu sigurno online",
      commencer: "Započni potpisivanje",
      identiteSignataire: "Identitet potpisnika",
      nomComplet: "Puno ime",
      fonction: "Funkcija",
      email: "E-mail",
      entreprise: "Tvrtka",
      siret: "SIRET",
      signataire: "Potpisnik",
      tracabilite: "Tehnička sljedivost",
      dateHeure: "Datum i vrijeme",
      adresseIP: "IP adresa",
      navigateur: "Preglednik",
      signatureManuscrite: "Vlastoručni potpis",
      infoLegale: "🔒 Ove informacije bit će zabilježene u certifikatu elektroničkog potpisa kako bi se osigurala sljedivost i pravna usklađenost u skladu s uredbom eIDAS (EU) br. 910/2014.",
      dessinerSignature: "Nacrtajte svoj potpis ispod",
      effacer: "Obriši",
      accepteCGV: "Prihvaćam",
      cgvLien: "Opće uvjete poslovanja",
      accepteCGVSuite: "i potvrđujem da su pružene informacije točne. Ovaj elektronički potpis ima istu pravnu vrijednost kao vlastoručni potpis.",
      annuler: "Odustani",
      validerSigner: "Potvrdi i potpiši",
      signatureEnCours: "Potpisivanje u tijeku...",
      erreurSignatureVide: "Molimo potpišite prije potvrde",
      erreurCGV: "Molimo prihvatite Opće uvjete",
    },
    actions: {
      modifier: "Uredi ponudu",
      telecharger: "Preuzmi PDF",
      partager: "Podijeli",
    },
  },
};