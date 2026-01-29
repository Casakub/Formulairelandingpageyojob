/**
 * 🇸🇮 SLOVENSKI PREVOD - OBRAZEC ZA ZAHTEVO ZA PONUDBO
 * 
 * Popoln slovenski prevod obrazca za zahtevo za ponudbo
 * 
 * @version 1.0.0
 * @created 2025-01-13
 */

import type { DevisTranslations } from '../types';

export const sl: DevisTranslations = {
  // === SPLOŠNO ===
  common: {
    next: "Naprej",
    previous: "Nazaj",
    submit: "Pošlji",
    required: "*",
    optional: "(neobvezno)",
    loading: "Nalaganje...",
    error: "Napaka",
    success: "Uspeh",
    cancel: "Prekliči",
    save: "Shrani",
    edit: "Uredi",
    delete: "Izbriši",
    confirm: "Potrdi",
    euro: "€",
    perHour: "/uro",
    perMonth: "/mes",
    perDay: "/dan",
    persons: "oseb",
    hours: "ur",
    days: "dni",
    months: "mesecev",
    year: "let",
  },

  // === NAVIGACIJA ===
  navigation: {
    back: "Nazaj",
    stepOf: "Korak {step} od {total}",
    steps: {
      entreprise: {
        title: "Podjetje",
        badge: "🏢 Vaše podjetje",
      },
      contact: {
        title: "Kontakt",
        badge: "👤 Vaša kontaktna oseba",
      },
      besoins: {
        title: "Potrebe",
        badge: "💼 Vaše potrebe",
      },
      conditions: {
        title: "Pogoji",
        badge: "📋 Pogoji",
      },
      candidats: {
        title: "Kandidati",
        badge: "👷 Iskani profil",
      },
      recapitulatif: {
        title: "Povzetek",
        badge: "✅ Povzetek",
      },
    },
  },

  // === VALIDACIJA ===
  validation: {
    fillRequired: "Prosimo, izpolnite vsa obvezna polja",
    selectRegion: "Prosimo, izberite regijo",
    addAtLeastOnePosition: "Prosimo, dodajte vsaj eno delovno mesto",
    invalidEmail: "Prosimo, vnesite veljaven e-poštni naslov",
    invalidPhone: "Prosimo, vnesite veljavno telefonsko številko",
    invalidSIRET: "Prosimo, vnesite veljavno številko SIRET (14 številk)",
    dateRequired: "Prosimo, vnesite datum začetka",
    missionLocationRequired: "Prosimo, vnesite lokacijo misije",
  },

  // === SPOROČILA ===
  messages: {
    success: {
      quoteSent: "Zahteva za ponudbo uspešno poslana!",
      redirecting: "Preusmeritev...",
    },
    error: {
      submitError: "Napaka pri pošiljanju zahteve za ponudbo",
      genericError: "Prišlo je do napake",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Zahteva za ponudbo | YOJOB",
    pageDescription: "Zahtevajte ponudbo za vaše evropske potrebe začasnega zaposlovanja.",
  },

  // === KORAK 1: PODJETJE ===
  step1: {
    title: "Podatki o podjetju",
    subtitle: "Vnesite pravne podatke vašega uporabniškega podjetja.",
    fields: {
      pays: {
        label: "Država",
        placeholder: "Izberite državo",
      },
      raisonSociale: {
        label: "Naziv podjetja",
        placeholder: "Npr.: YOJOB d.o.o.",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 številk",
        helper: "Identifikacijska številka vašega obrata",
      },
      codeAPE: {
        label: "Šifra APE/NAF",
        placeholder: "Npr.: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Intrakomunitetna DDV",
        placeholder: "Npr.: SI12345678",
      },
      adresse: {
        label: "Popoln naslov",
        placeholder: "Hišna številka in ime ulice",
      },
      codePostal: {
        label: "Poštna številka",
        placeholder: "Npr.: 1000",
      },
      ville: {
        label: "Mesto",
        placeholder: "Npr.: Ljubljana",
      },
      region: {
        label: "Regija/Pokrajina",
        placeholder: "Izberite regijo",
        placeholderOtherCountry: "Npr.: Bayern, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Spletna stran",
        placeholder: "https://www.primer.si",
      },
    },
    infoMessage: "✓ Ti podatki bodo uporabljeni za izdelavo vaše personalizirane ponudbe",
  },

  // === KORAK 2: KONTAKT ===
  step2: {
    title: "Kontaktna oseba",
    subtitle: "Kdo bo vaša glavna kontaktna oseba za ta projekt?",
    fields: {
      civilite: {
        label: "Nagovor",
        options: {
          m: "Gospod",
          mme: "Gospa",
        },
      },
      nom: {
        label: "Priimek",
        placeholder: "Npr.: Novak",
      },
      prenom: {
        label: "Ime",
        placeholder: "Npr.: Janez",
      },
      fonction: {
        label: "Funkcija",
        placeholder: "Npr.: Vodja kadrov",
      },
      email: {
        label: "Službeni e-poštni naslov",
        placeholder: "janez.novak@podjetje.si",
      },
      telephone: {
        label: "Telefon",
        placeholder: "+386 31 123 456",
      },
    },
  },

  // === KORAK 3: POTREBE ===
  step3: {
    title: "Vaše potrebe po zaposlovanju",
    subtitle: "Opišite iskane profile in njihove pogoje.",
    profileLabel: "Profil",
    addProfile: "Dodaj dodatni profil",
    removeProfile: "Odstrani ta profil",
    loadingConfig: "Nalaganje konfiguracije...",
    missingRegionWarning: "⚠️ Prosimo, izberite svojo regijo v koraku 1 za samodejni prikaz plač.",
    fields: {
      secteur: {
        label: "Področje dejavnosti",
        placeholder: "Izberite področje",
      },
      convention: {
        label: "Kolektivna pogodba",
        placeholder: "Samodejno glede na področje",
      },
      poste: {
        label: "Iskano delovno mesto",
        placeholder: "Izberite delovno mesto",
      },
      classification: {
        label: "Klasifikacija / Kvalifikacija",
        placeholder: "Izberite klasifikacijo",
      },
      quantite: {
        label: "Število oseb",
        placeholder: "Npr.: 5",
        helper: "Koliko oseb je potrebnih za to delovno mesto?",
      },
      salaireBrut: {
        label: "Bruto mesečna plača",
        placeholder: "Npr.: 2500",
        helper: "Bruto plača na podlagi 151,67 ur/mesec",
      },
      nationalite: {
        label: "Državljanstvo delavcev",
        placeholder: "Izberite državo",
        helper: "Državljanstvo vpliva na koeficient stopnje agencije",
      },
    },
    ajouterPoste: "Dodaj novo delovno mesto",
    supprimerPoste: "Odstrani to delovno mesto",
    posteNumero: "Delovno mesto",
    coefficientInfo: {
      title: "💡 Uporabljen koeficient agencije",
      base: "Osnovni koef.",
      facteurPays: "Faktor države",
      final: "Končni koeficient",
    },
    summary: {
      title: "Nadomestilo delavca",
      salaireBrutMensuel: "Bruto mesečna plača",
      tauxHoraireBrut: "Bruto urna postavka",
      baseMensuelle: "(Osnova 151,67 ur/mes po kolektivni pogodbi)",
    },
  },

  // === KORAK 4: POGOJI ===
  step4: {
    title: "Delovni pogoji",
    subtitle: "Natančneje navedite pogoje zaposlitve in ponujene ugodnosti.",
    dateError: "Datum zaključka mora biti po datumu začetka",
    fields: {
      dateDebut: {
        label: "Zahtevani datum začetka",
        placeholder: "DD/MM/LLLL",
      },
      dateFin: {
        label: "Predvideni datum zaključka",
        placeholder: "DD/MM/LLLL",
        helper: "Pustite prazno za nedoločen čas",
      },
      baseHoraire: {
        label: "Mesečna urna osnova",
        placeholder: "Npr.: 151,67",
        helper: "Zakonska osnova v Franciji: 151,67 ur/mesec (35 ur/teden)",
      },
      lieuxMission: {
        label: "Lokacije misije",
        placeholder: "Npr.: Ljubljana center, Maribor cona 3, Celje...",
      },
      periodeEssai: {
        label: "Poskusno delo",
        placeholder: "Izberite trajanje",
        options: {
          '2': '2 dni',
          '3': '3 dni',
          '5': '5 dni',
          '15': '15 dni',
        },
      },
      motifRecours: {
        label: "Razlog začasne zaposlitve",
        placeholder: "Izberite razlog",
        options: {
          accroissement: "Začasno povečanje dejavnosti",
          remplacement: "Nadomestitev odsotnega zaposlenega",
          saisonnier: "Sezonsko delo",
          exportation: "Izredna izvozna naročila",
          autre: "Drugo (prosimo, navedite)",
        },
      },
      delaiPaiement: {
        label: "Zahtevani rok plačila",
        placeholder: "Izberite rok",
        options: {
          reception: "Plačilo ob prejemu",
          j30: "30 dni",
          j45: "45 dni",
          j60: "60 dni",
        },
      },
    },
    hebergement: {
      title: "Nastanitev",
      chargeEU: {
        label: "Nastanitev zagotovljena s strani uporabniškega podjetja",
        helper: "Če NE: agencija bo zaračunala doplačilo +3,50 €/uro",
      },
      supplementWarning: "⚠️ Zaračunano bo doplačilo +3,50 €/uro, ker nastanitev ni zagotovljena",
      commentaire: {
        label: "Podrobnosti o nastanitvi",
        placeholder: "Vrsta nastanitve, naslov, posebni pogoji...",
      },
    },
    transport: {
      title: "Lokalni prevoz",
      chargeETT: {
        label: "Lokalni prevoz zagotovljen s strani agencije",
        helper: "Če DA: zaračunano bo doplačilo +1,50 €/uro",
      },
      supplementInfo: "✓ Zaračunano bo doplačilo +1,50 €/uro za kritje stroškov lokalnega prevoza",
    },
    repas: {
      title: "Prehrana",
      options: {
        restaurant: "Podjetniška jedilnica / Boni za hrano",
        panier: "Dnevnica za prehrano (zaračunana dnevno)",
        nonConcerne: "Se ne nanaša",
      },
      montantInfo: "📋 Znesek dnevnice: {montant} / delovni dan (zaračunano ločeno)",
      montantNonDefini: "⚠️ Znesek ni določen za to državo/regijo",
    },
    sections: {
      hebergement: {
        title: "Nastanitev",
        chargeEU: {
          label: "Nastanitev zagotovljena s strani uporabniškega podjetja",
          helper: "Če NE: agencija bo zaračunala doplačilo +3,50 €/uro",
          options: {
            oui: "Da, zagotovljeno s strani uporabnika",
            non: "Ne, plača delavec",
          },
        },
        detailsEU: {
          type: {
            label: "Vrsta nastanitve",
            options: {
              hotel: "Hotel",
              appartement: "Stanovanje",
              foyer: "Dom delavcev",
              autre: "Drugo",
            },
          },
          adresse: {
            label: "Naslov nastanitve",
            placeholder: "Popoln naslov nastanitve",
          },
        },
      },
      transportInternational: {
        title: "Mednarodni prevoz (država izvora ↔ Francija)",
        chargeEU: {
          label: "Prevoz zagotovljen s strani uporabniškega podjetja",
          helper: "Potovanja med državo izvora in lokacijo misije",
          options: {
            oui: "Da, zagotovljeno s strani uporabnika",
            non: "Ne, plača delavec",
          },
        },
        detailsEU: {
          type: {
            label: "Vrsta prevoza",
            options: {
              avion: "Letalo",
              train: "Vlak",
              bus: "Avtobus",
              covoiturage: "Organizirana skupna vožnja",
            },
          },
          frequence: {
            label: "Pogostost potovanj",
            options: {
              allerRetour: "Samo začetni prihod in odhod",
              hebdomadaire: "Tedensko",
              mensuel: "Mesečno",
            },
          },
        },
      },
      transportLocal: {
        title: "Lokalni prevoz",
        chargeETT: {
          label: "Lokalni prevoz zagotovljen s strani agencije",
          helper: "Če DA: zaračunano bo doplačilo +1,50 €/uro",
          options: {
            oui: "Da, zagotovljeno s strani agencije",
            non: "Ne, plača delavec",
          },
        },
        detailsETT: {
          type: {
            label: "Vrsta prevoza",
            options: {
              vehicule: "Službeno vozilo",
              transport: "Javni prevoz",
              velo: "Kolo",
            },
          },
        },
      },
      repas: {
        title: "Prehrana",
        type: {
          label: "Vrsta prehrane",
          options: {
            restaurant: "Podjetniška jedilnica / Boni za hrano",
            panier: "Dnevnica za prehrano (zaračunana dnevno)",
            nonConcerne: "Se ne nanaša",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Dnevni proračun",
            placeholder: "Znesek v €",
          },
        },
        detailsPanier: {
          info: "Dnevnica za prehrano bo zaračunana ločeno za vsak delovni dan",
        },
      },
    },
  },

  // === KORAK 5: KANDIDATI ===
  step5: {
    title: "Profil kandidatov",
    subtitle: "Določite kompetence in konkretne zahteve.",
    sections: {
      experience: {
        title: "Poklicne izkušnje",
        obligatoire: {
          label: "Obvezne izkušnje",
        },
        annees: {
          label: "Minimalno število let izkušenj",
          placeholder: "Npr.: 3",
          options: {
            '0-1': "Začetnik (0-1 leto)",
            '1-3': "Srednji (1-3 leta)",
            '3-5': "Potrjene (3-5 let)",
            '5+': "Strokovnjak (5 let in več)",
          },
        },
        competences: {
          label: "Zahtevane tehnične kompetence",
          placeholder: "Npr.: Zidarska dela, opaž, branje načrtov, TIG varjenje...",
        },
      },
      formation: {
        title: "Izobrazba",
        obligatoire: {
          label: "Obvezna izobrazba",
        },
        type: {
          label: "Vrsta izobrazbe",
          placeholder: "Npr.: Kvalificirani zidar, CACES R489...",
        },
      },
      travailRisque: {
        title: "Tvegano delo",
        active: {
          label: "Specifično tvegano delo",
        },
        precisions: {
          label: "Natančnejši opis tveganj",
          placeholder: "Npr.: Delo na višini, ravnanje s težkimi bremeni...",
        },
      },
      langues: {
        title: "Jezikovne spretnosti",
        francais: {
          label: "Zahtevana raven francoskega jezika",
          placeholder: "Izberite raven",
          options: {
            a1: "A1 - Začetnik",
            a2: "A2 - Osnovni",
            b1: "B1 - Srednji",
            b2: "B2 - Napredni",
            c1: "C1 - Zelo napredni",
            c2: "C2 - Materni govorec",
            natif: "Materni govorec",
          },
        },
        autres: {
          label: "Drugi koristni jeziki",
          placeholder: "Npr.: Angleščina (B1), Nemščina (A2)...",
        },
        languageNames: {
          francais: "Francoščina",
          anglais: "Angleščina",
          portugais: "Portugalščina",
          espagnol: "Španščina",
          italien: "Italijanščina",
          autre: "Drugo",
        },
        levels: {
          'non-requis': "Ni potrebno",
          'A1': "A1 - Začetnik",
          'A2': "A2 - Osnovni",
          'B1': "B1 - Srednji",
          'B2': "B2 - Napredni",
          'C1': "C1 - Samostojen",
          'C2': "C2 - Materni govorec",
        },
      },
      permis: {
        title: "Vozniško dovoljenje",
        requis: {
          label: "Zahtevano vozniško dovoljenje",
          options: {
            aucun: "Vozniško dovoljenje ni potrebno",
            b: "Vozniško dovoljenje kat. B (osebno vozilo)",
            c: "Vozniško dovoljenje kat. C (tovornjak)",
            ce: "Vozniško dovoljenje kat. CE (tovornjak + prikolica)",
            d: "Vozniško dovoljenje kat. D (prevoz oseb)",
          },
        },
        categorie: {
          label: "Kategorija vozniškega dovoljenja",
          placeholder: "Npr.: B, C, CE...",
        },
      },
      outillage: {
        title: "Ročno orodje",
        requis: {
          label: "Zahtevano lastno orodje",
        },
        type: {
          label: "Vrsta orodja",
          placeholder: "Npr.: Kladivo, libela, merilni trak, gladilka...",
        },
      },
      epi: {
        title: "Osebna zaščitna oprema (OZO)",
        infoLegale: "ℹ️ Glede na predpise mora delodajalec zagotoviti OZO, prilagojeno tveganjem delovnega mesta.",
        selectionCount: "✓ {count} izbrane OZO",
        fournis: {
          label: "OZO zagotovljena s strani podjetja",
          helper: "Čelada, varnostna obutev, rokavice itd.",
          options: {
            oui: "Da, zagotovljeno s strani uporabnika",
            non: "Ne, plača delavec",
          },
        },
        liste: {
          label: "Seznam potrebne OZO",
          placeholder: "Npr.: Čelada, obutev S3, rezalno odporne rokavice, varnostni pas...",
        },
        items: {
          casque: "Zaščitna čelada",
          lunettes: "Zaščitna očala",
          protections_auditives: "Zaščita sluha",
          gants: "Zaščitne rokavice",
          chaussures: "Varnostna obutev",
          harnais: "Varnostni pas",
          vetements: "Delovna oblačila",
          masque: "Respirator",
          protection_faciale: "Zaščitni ščit za obraz",
          vetements_visibilite: "Oblačila visoke vidljivosti",
        },
      },
      autresExigences: {
        title: "Druge zahteve",
        label: "Druge specifične zahteve",
        placeholder: "Npr.: Električna pooblastila, CACES, razpoložljivost ob vikendih, delo na višini...",
      },
    },
  },

  // === POVZETEK ===
  recapitulatif: {
    title: "Povzetek vaše zahteve",
    subtitle: "Preverite podatke pred pošiljanjem zahteve za ponudbo.",
    acceptConditionsError: "Prosimo, sprejmite pogoje pred nadaljevanjem",
    entreprise: {
      title: "Podjetje",
      raisonSociale: "Naziv podjetja",
      siret: "SIRET",
      pays: "Država",
      ville: "Mesto",
      region: "Regija/Pokrajina",
    },
    contact: {
      title: "Kontakt",
      nomPrenom: "Ime in priimek",
      email: "E-pošta",
      telephone: "Telefon",
      fonction: "Funkcija",
    },
    postes: {
      title: "Zahtevana delovna mesta",
      coeffETT: "📊 Uporabljen koeficient agencije",
      coeffBase: "Osnovni koef.",
      facteurPays: "Faktor države",
      supplementsHoraires: "✨ Urni dodatki (vključeni v stopnjo)",
      hebergement: "✓ Nastanitev",
      transport: "✓ Lokalni prevoz",
      panierRepas: "🍽️ Dnevnica za prehrano (zaračunana dnevno)",
      baseHoraire: "📅 Urna osnova: {heures} ur/mes (ugotovljene nadure)",
      heuresNormales: "Normalne ure (0-35 ur/teden)",
      heuresSup25: "Nadure +25% (36.-43. ura)",
      heuresSup50: "Nadure +50% (44.+ ura)",
      sousTotal: "Vmesni seštevek dela (na osebo)",
      tauxHoraireBrut: "Bruto urna postavka",
      tauxETTFinal: "Končna stopnja agencije",
      coutMensuel: "Skupni mesečni stroški",
    },
    conditions: {
      title: "Pogoji misije",
      dateDebut: "Datum začetka",
      dateFin: "Datum zaključka",
      dureeEstimee: "Ocenjeno trajanje",
      lieuMission: "Lokacija misije",
      mois: "mesecev",
    },
    majorations: {
      title: "Tarifne prilagoditve misije",
      total: "Skupne prilagoditve",
      notSet: "Ni nastavljenih prilagoditev",
    },
    totaux: {
      mensuelHT: "Skupaj mesečno brez DDV",
      mensuelTTC: "Skupaj mesečno z DDV",
      totalMission: "Skupni stroški misije",
    },
    noteLegale: "ℹ️ Ta ocena je informativne narave. Končna stopnja bo potrjena po odobritvi naše ekipe in izbrane partnerske agencije.",
    acceptConditions: {
      text: "Strinjam se, da bodo moji podatki obdelani v skladu s",
      lien: "politiko zasebnosti",
    },
    boutonEnvoi: {
      texte: "Pošlji mojo zahtevo za ponudbo",
      enCours: "Pošiljanje...",
    },
    footer: "✓ Odgovor v 24 delovnih urah • ✓ Brez obveznosti",
  },

  // === NAPAKE ===
  errors: {
    required: "To polje je obvezno",
    invalidEmail: "Neveljaven e-poštni naslov",
    invalidSIRET: "Neveljaven SIRET (potrebnih 14 številk)",
    invalidPhone: "Neveljavna telefonska številka",
    minValue: "Vrednost mora biti večja ali enaka {min}",
    maxValue: "Vrednost mora biti manjša ali enaka {max}",
    genericError: "Prišlo je do napake. Prosimo, poskusite znova.",
    loadingError: "Napaka pri nalaganju podatkov",
    submitError: "Napaka pri pošiljanju zahteve",
  },

  // === PODROČJA & POKLICI ===
  secteurs: {
    batiment: {
      label: "Gradbeništvo",
      convention: "Nacionalna kolektivna pogodba gradbeni delavci (3193)",
      postes: {
        macon: "Zidar",
        coffreur: "Tesar za opaž",
        ferrailleur: "Armirač",
        carreleur: "Tlakovalec",
        platrier: "Gisar",
        peintre: "Slikopleskar",
        plombier: "Vodovodar",
        electricien: "Elektrikar",
        couvreur: "Krovninec",
        menuisier: "Tesar",
        chef_equipe_batiment: "Vodja ekipe",
        chef_chantier: "Vodja gradbišča",
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
      convention: "Kolektivna pogodba metalurgija (3109)",
      postes: {
        soudeur: "Varilec",
        chaudronnier: "Kotlar",
        tuyauteur: "Cevovodar",
        tourneur: "Strugar",
        fraiseur: "Rezkar",
        usineur: "CNC operater",
        mecanicien_industriel: "Industrijski mehanik",
        monteur: "Monter",
        controleur_qualite: "Kontrolor kakovosti",
        ajusteur: "Ključavničar",
        chef_equipe_metallurgie: "Vodja ekipe",
      },
      classifications: {
        niveau_1: "Raven I",
        niveau_2: "Raven II",
        niveau_3: "Raven III",
        niveau_4: "Raven IV",
        niveau_5: "Raven V",
      },
    },
    tp: {
      label: "Javna dela",
      convention: "Nacionalna kolektivna pogodba javna dela (3005)",
      postes: {
        conducteur_engins: "Upravljavec strojev",
        terrassier: "Izkopovalec",
        canalisateur: "Kanalizacijski delavec",
        constructeur_routes: "Cestni delavec",
        coffreur_bancheur: "Tesar za opaž",
        macon_vrd: "Zidar javna dela",
        chef_equipe_tp: "Vodja ekipe JD",
        manoeuvre_tp: "Pomožni delavec JD",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelirstvo",
      convention: "Kolektivna pogodba hoteli-restavracije (3292)",
      postes: {
        receptionniste: "Receptor",
        femme_chambre: "Sobarica",
        agent_entretien: "Delavec vzdrževanja",
        bagagiste: "Vratar za prtljago",
        concierge: "Vratar",
        night_audit: "Nočni revizor",
        gouvernante: "Glavna sobarica",
        chef_reception: "Vodja recepcije",
      },
      classifications: {
        niveau_1: "Raven I",
        niveau_2: "Raven II",
        niveau_3: "Raven III",
        niveau_4: "Raven IV",
        niveau_5: "Raven V",
      },
    },
    restauration: {
      label: "Gostinstvo",
      convention: "Kolektivna pogodba hoteli-restavracije (3292)",
      postes: {
        cuisinier: "Kuhar",
        commis_cuisine: "Pomožni kuhar",
        chef_partie: "Chef de partie",
        serveur: "Natakar",
        barman: "Barman",
        plongeur: "Pomočnik v kuhinji",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maitre d'hôtel",
        second_cuisine: "Sous chef",
        chef_cuisine: "Glavni kuhar",
      },
      classifications: {
        niveau_1: "Raven I",
        niveau_2: "Raven II",
        niveau_3: "Raven III",
        niveau_4: "Raven IV",
        niveau_5: "Raven V",
      },
    },
    plasturgie: {
      label: "Industrija plastike",
      convention: "Kolektivna pogodba industrija plastike (0292)",
      postes: {
        operateur_injection: "Operater brizganja",
        operateur_extrusion: "Operater ekstrudiranja",
        regleur: "Nastavitelj",
        operateur_thermoformage: "Operater termooblikovanja",
        controleur_qualite_plasturgie: "Kontrolor kakovosti",
        technicien_maintenance: "Tehnik vzdrževanja",
        chef_equipe_plasturgie: "Vodja ekipe",
      },
      classifications: {
        niveau_1: "Raven I",
        niveau_2: "Raven II",
        niveau_3: "Raven III",
        niveau_4: "Raven IV",
      },
    },
    automobile_carrosserie: {
      label: "Avtomobilska industrija & Kleparstvo",
      convention: "Kolektivna pogodba popravilo avtomobilov (1090)",
      postes: {
        carrossier: "Klepar",
        peintre_automobile: "Avtomobilski lakirer",
        mecanicien_auto: "Avtomehanik",
        electricien_auto: "Avtoelektrikar",
        chef_atelier: "Vodja delavnice",
        controleur_technique: "Tehnični kontrolor",
      },
      classifications: {
        niveau_1: "Raven I",
        niveau_2: "Raven II",
        niveau_3: "Raven III",
        niveau_4: "Raven IV",
      },
    },
    sylviculture: {
      label: "Gozdarstvo",
      convention: "Kolektivna pogodba kmetijstvo (7501)",
      postes: {
        bucheron: "Gozdar",
        elagueur: "Obrezovalec dreves",
        conducteur_engins_forestiers: "Operater gozdarskih strojev",
        chef_equipe_sylviculture: "Vodja ekipe gozdarstvo",
      },
      classifications: {
        niveau_1: "Raven I",
        niveau_2: "Raven II",
        niveau_3: "Raven III",
        niveau_4: "Raven IV",
      },
    },
    cartonnerie: {
      label: "Industrija kartona",
      convention: "Kolektivna pogodba predelovalna industrija (3107)",
      postes: {
        operateur_production: "Proizvodni operater",
        conducteur_ligne: "Vodja linije",
        regleur_cartonnerie: "Nastavitelj",
        chef_equipe_cartonnerie: "Vodja ekipe",
      },
      classifications: {
        niveau_1: "Raven I",
        niveau_2: "Raven II",
        niveau_3: "Raven III",
        niveau_4: "Raven IV",
      },
    },
    autre: {
      label: "Drugo",
      convention: "Določiti glede na dejavnost",
      postes: {
        autre_poste: "Drugo delovno mesto (prosimo, navedite)",
      },
      classifications: {
        a_definir: "Določiti",
      },
    },
  },

  // === EVROPSKE DRŽAVE ===
  pays: {
    france: "Francija",
    allemagne: "Nemčija",
    autriche: "Avstrija",
    belgique: "Belgija",
    bulgarie: "Bolgarija",
    croatie: "Hrvaška",
    chypre: "Ciper",
    danemark: "Danska",
    espagne: "Španija",
    estonie: "Estonija",
    finlande: "Finska",
    grece: "Grčija",
    hongrie: "Madžarska",
    irlande: "Irska",
    italie: "Italija",
    lettonie: "Latvija",
    lituanie: "Litva",
    luxembourg: "Luksemburg",
    malte: "Malta",
    pays_bas: "Nizozemska",
    pologne: "Poljska",
    portugal: "Portugalska",
    republique_tcheque: "Češka",
    roumanie: "Romunija",
    slovaquie: "Slovaška",
    slovenie: "Slovenija",
    suede: "Švedska",
  },

  // === STRAN POVZETEK PONUDBE (PODPIS) ===
  pageRecap: {
    header: {
      title: "Povzetek ponudbe",
      exportPDF: "Izvozi v PDF",
      loading: "Nalaganje ponudbe...",
      notFound: "Ponudba ni najdena",
    },
    statut: {
      signe: "Podpisano",
      nouveau: "Novo",
    },
    dates: {
      creeLe: "Ustvarjeno",
      a: "ob",
      signeLe: "Podpisano",
      derniereModification: "Zadnja sprememba:",
    },
    entreprise: {
      title: "Podatki o podjetju",
      raisonSociale: "Naziv podjetja",
      siret: "SIRET",
      codeAPE: "Šifra APE",
      tvaIntracommunautaire: "Intrakomunitetna DDV",
      adresse: "Naslov",
      siteInternet: "Spletna stran",
    },
    contact: {
      title: "Kontaktna oseba",
      nomComplet: "Polno ime",
      fonction: "Funkcija",
      email: "E-pošta",
      telephonePortable: "Mobilni telefon",
      telephoneFixe: "Fiksni telefon",
    },
    postes: {
      title: "Delovna mesta za zasedbo",
      nationalite: "Državljanstvo",
      salaireBrut: "Bruto plača",
      tauxHoraireBrut: "Bruto urna postavka",
      coefficientETT: "Koeficient agencije",
      tauxETT: "Stopnja agencije",
    },
    conditions: {
      title: "Delovni pogoji",
      dateDebut: "Datum začetka",
      dateFin: "Datum zaključka",
      periodeEssai: "Poskusno delo",
      baseHoraire: "Urna osnova",
      heuresMois: "ur/mes",
      lieuxMission: "Lokacije misije",
      motifRecours: "Razlog začasne zaposlitve",
    },
    candidats: {
      title: "Profil iskanih kandidatov",
      experience: "Izkušnje",
      ansMinimum: "let minimalno",
      formation: "Izobrazba",
      permis: "Vozniško dovoljenje",
      langues: "Jeziki",
    },
    signature: {
      title: "Elektronski podpis",
      subtitle: "Podpišite svojo ponudbo varno na spletu",
      commencer: "Začni s podpisovanjem",
      identiteSignataire: "Identiteta podpisnika",
      nomComplet: "Polno ime",
      fonction: "Funkcija",
      email: "E-pošta",
      entreprise: "Podjetje",
      siret: "SIRET",
      signataire: "Podpisnik",
      tracabilite: "Tehnična sledljivost",
      dateHeure: "Datum in čas",
      adresseIP: "IP naslov",
      navigateur: "Brskalnik",
      signatureManuscrite: "Ročni podpis",
      infoLegale: "🔒 Te informacije bodo zabeležene v certifikatu elektronskega podpisa za zagotavljanje sledljivosti in pravne skladnosti v skladu z uredbo eIDAS (EU) št. 910/2014.",
      dessinerSignature: "Narišite svoj podpis spodaj",
      effacer: "Izbriši",
      accepteCGV: "Sprejemam",
      cgvLien: "Splošne pogoje poslovanja",
      accepteCGVSuite: "in potrjujem, da so posredovane informacije točne. Ta elektronski podpis ima enako pravno vrednost kot ročni podpis.",
      annuler: "Prekliči",
      validerSigner: "Potrdi in podpiši",
      signatureEnCours: "Podpisovanje v teku...",
      erreurSignatureVide: "Prosimo, podpišite pred potrditvijo",
      erreurCGV: "Prosimo, sprejmite Splošne pogoje",
    },
    actions: {
      modifier: "Uredi ponudbo",
      telecharger: "Prenesi PDF",
      partager: "Deli",
    },
  },
};