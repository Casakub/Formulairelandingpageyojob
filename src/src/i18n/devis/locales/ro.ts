/**
 * 🇷🇴 TRADUCERI ROMÂNEŞTI - FORMULAR OFERTĂ
 * 
 * Traduceri complete în limba română pentru formularul de ofertă
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import type { DevisTranslations } from '../types';

export const ro: DevisTranslations = {
  // === COMUN ===
  common: {
    next: "Înainte",
    previous: "Înapoi",
    submit: "Trimite",
    required: "*",
    optional: "(opţional)",
    loading: "Se încarcă...",
    error: "Eroare",
    success: "Succes",
    cancel: "Anulează",
    save: "Salvează",
    edit: "Editează",
    delete: "Şterge",
    confirm: "Confirmă",
    euro: "€",
    perHour: "/oră",
    perMonth: "/lună",
    perDay: "/zi",
    persons: "persoană/e",
    hours: "oră/ore",
    days: "zi/zile",
    months: "luni",
    year: "an/ani",
  },

  // === NAVIGARE ===
  navigation: {
    back: "Înapoi",
    stepOf: "Pasul {step} din {total}",
    steps: {
      entreprise: {
        title: "Companie",
        badge: "🏢 Compania ta",
      },
      contact: {
        title: "Contact",
        badge: "👤 Contactul tău",
      },
      besoins: {
        title: "Nevoi",
        badge: "💼 Nevoile tale",
      },
      conditions: {
        title: "Condiții",
        badge: "📋 Condiții",
      },
      candidats: {
        title: "Candidați",
        badge: "👷 Profil căutat",
      },
      recapitulatif: {
        title: "Rezumat",
        badge: "✅ Rezumat",
      },
    },
  },

  // === VALIDARE ===
  validation: {
    fillRequired: "Vă rugăm să completați toate câmpurile obligatorii",
    selectRegion: "Vă rugăm să selectați o regiune",
    addAtLeastOnePosition: "Vă rugăm să adăugați cel puțin un post",
    invalidEmail: "Vă rugăm să introduceți o adresă de email validă",
    invalidPhone: "Vă rugăm să introduceți un număr de telefon valid",
    invalidSIRET: "Vă rugăm să introduceți un număr SIRET valid (14 cifre)",
    dateRequired: "Vă rugăm să introduceți data de începere",
    missionLocationRequired: "Vă rugăm să introduceți locația misiunii",
  },

  // === MESAJE ===
  messages: {
    success: {
      quoteSent: "Oferta a fost trimisă cu succes!",
      redirecting: "Redirecționare...",
    },
    error: {
      submitError: "Eroare la trimiterea ofertei",
      genericError: "A apărut o eroare",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Cerere de ofertă | YOJOB",
    pageDescription: "Solicitați o ofertă pentru nevoile dvs. de personal temporar european.",
  },

  // === PASUL 1: COMPANIE ===
  step1: {
    title: "Informații despre Companie",
    subtitle: "Introduceți informațiile legale ale companiei dumneavoastră.",
    fields: {
      pays: {
        label: "Țară",
        placeholder: "Selectați o țară",
      },
      raisonSociale: {
        label: "Denumire Companie",
        placeholder: "ex. YOJOB SRL",
      },
      siret: {
        label: "Număr Înregistrare Companie",
        placeholder: "Număr de înregistrare",
        helper: "Identificatorul de înregistrare al companiei",
      },
      codeAPE: {
        label: "Cod Activitate Economică",
        placeholder: "ex. 7830Z",
      },
      tvaIntracommunautaire: {
        label: "Cod TVA",
        placeholder: "ex. RO12345678",
      },
      adresse: {
        label: "Adresă Completă",
        placeholder: "Număr şi numele străzii",
      },
      codePostal: {
        label: "Cod Poștal",
        placeholder: "ex. 010101",
      },
      ville: {
        label: "Oraș",
        placeholder: "ex. București",
      },
      region: {
        label: "Regiune/Județ",
        placeholder: "Selectați o regiune",
        placeholderOtherCountry: "ex. Bavaria, Catalonia, Lombardia...",
      },
      siteInternet: {
        label: "Site Web",
        placeholder: "https://www.exemplu.ro",
      },
    },
    infoMessage: "✓ Aceste informații vor fi folosite pentru a genera oferta dumneavoastră personalizată",
  },

  // === PASUL 2: CONTACT ===
  step2: {
    title: "Persoană de Contact",
    subtitle: "Cine va fi persoana de contact principală pentru acest proiect?",
    fields: {
      civilite: {
        label: "Titlu",
        options: {
          m: "Dl.",
          mme: "Dna.",
        },
      },
      nom: {
        label: "Nume",
        placeholder: "ex. Popescu",
      },
      prenom: {
        label: "Prenume",
        placeholder: "ex. Ion",
      },
      fonction: {
        label: "Funcție",
        placeholder: "ex. Manager HR",
      },
      email: {
        label: "Email Profesional",
        placeholder: "ion.popescu@companie.ro",
      },
      telephone: {
        label: "Telefon",
        placeholder: "+40 21 123 4567",
      },
    },
  },

  // === PASUL 3: NEVOI ===
  step3: {
    title: "Definiți-vă Nevoile",
    subtitle: "Descrieți cu precizie pozițiile pe care le căutați.",
    profileLabel: "Profil",
    addProfile: "Adăugați un profil suplimentar",
    removeProfile: "Ștergeți acest profil",
    loadingConfig: "Se încarcă configurația...",
    missingRegionWarning: "⚠️ Vă rugăm să selectați regiunea la pasul 1 pentru a afișa automat salariile.",
    fields: {
      secteur: {
        label: "Sector de Activitate",
        placeholder: "Selectați un sector",
      },
      convention: {
        label: "Acord Colectiv",
        placeholder: "Automat în funcție de sector",
      },
      poste: {
        label: "Post",
        placeholder: "Selectați un post",
      },
      classification: {
        label: "Clasificare / Calificare",
        placeholder: "Selectați o clasificare",
      },
      quantite: {
        label: "Număr de Persoane",
        placeholder: "ex. 5",
        helper: "Câte persoane pentru această poziție?",
      },
      salaireBrut: {
        label: "Salariu Brut Lunar",
        placeholder: "ex. 2500",
        helper: "Salariu brut pe baza 151,67 ore/lună",
      },
      nationalite: {
        label: "Naționalitate Lucrători",
        placeholder: "Selectați o țară",
        helper: "Naționalitatea influențează coeficientul de preț al agenției",
      },
    },
    ajouterPoste: "Adaugă Altă Poziție",
    supprimerPoste: "Șterge Această Poziție",
    posteNumero: "Poziția",
    coefficientInfo: {
      title: "💡 Coeficient Agenție Aplicat",
      base: "Coef. de bază",
      facteurPays: "Factor țară",
      final: "Coeficient final",
    },
    summary: {
      title: "Remunerația salariatului",
      salaireBrutMensuel: "Salariu brut lunar",
      tauxHoraireBrut: "Tarif orar brut",
      baseMensuelle: "(Bază 151,67h/lună conform convenției colective)",
    },
  },

  // === PASUL 4: CONDIȚII ===
  step4: {
    title: "Condiții de Muncă",
    subtitle: "Specificați condițiile de angajare și beneficiile oferite.",
    dateError: "Data de încheiere trebuie să fie după data de începere",
    fields: {
      dateDebut: {
        label: "Data Dorită de Începere",
        placeholder: "ZZ/LL/AAAA",
      },
      dateFin: {
        label: "Data Estimată de Încheiere",
        placeholder: "ZZ/LL/AAAA",
        helper: "Lăsați necompletat dacă durată nedeterminată",
      },
      baseHoraire: {
        label: "Ore Lunare",
        placeholder: "ex. 151,67",
        helper: "Baza legală în Franța: 151,67 ore/lună (35 ore/săptămână)",
      },
      lieuxMission: {
        label: "Locații Misiune",
        placeholder: "ex. Paris 15, Lyon 3, Marsilia...",
      },
      periodeEssai: {
        label: "Perioadă de Probă",
        placeholder: "Selectați o durată",
        options: {
          '2': '2 zile',
          '3': '3 zile',
          '5': '5 zile',
          '15': '15 zile',
        },
      },
      motifRecours: {
        label: "Motivul utilizării muncii temporare",
        placeholder: "Selectați un motiv",
        options: {
          accroissement: "Creștere temporară a activității",
          remplacement: "Înlocuire salariat absent",
          saisonnier: "Lucrări sezoniere",
          exportation: "Comandă excepțională la export",
          autre: "Altele (de precizat)",
        },
      },
      delaiPaiement: {
        label: "Termen de plată dorit",
        placeholder: "Selectați un termen",
        options: {
          reception: "Plată la primire",
          j30: "30 de zile",
          j45: "45 de zile",
          j60: "60 de zile",
        },
      },
    },
    hebergement: {
      title: "Cazare",
      chargeEU: {
        label: "Cazare asigurată de compania client",
        helper: "Dacă NU: supliment orar de +3,50 €/oră va fi facturat de agenție",
      },
      supplementWarning: "⚠️ Un supliment de +3,50 €/oră va fi aplicat deoarece cazarea nu este asigurată",
      commentaire: {
        label: "Detalii despre cazare",
        placeholder: "Tipul de cazare, adresă, condiții speciale...",
      },
    },
    transport: {
      title: "Transport Local",
      chargeETT: {
        label: "Transport local asigurat de agenție",
        helper: "Dacă DA: supliment orar de +1,50 €/oră va fi facturat",
      },
      supplementInfo: "✓ Un supliment de +1,50 €/oră va fi aplicat pentru acoperirea cheltuielilor de transport local",
    },
    repas: {
      title: "Mese",
      options: {
        restaurant: "Cantină firmă / Tichete de masă",
        panier: "Pachet alimentar (facturat zilnic)",
        nonConcerne: "Nu se aplică",
      },
      montantInfo: "📋 Valoare pachet alimentar: {montant} / zi lucrată (facturat separat)",
      montantNonDefini: "⚠️ Valoare nedefinită pentru această țară/regiune",
    },
    sections: {
      transportInternational: {
        title: "Transport Internațional (țara de origine ↔ Franța)",
        chargeEU: {
          label: "Transport asigurat de compania client",
          helper: "Călătorii între țara de origine și locul misiunii",
          options: {
            oui: "Da, asigurat de client",
            non: "Nu, responsabilitatea lucrătorului",
          },
        },
        detailsEU: {
          type: {
            label: "Tip de Transport",
            options: {
              avion: "Avion",
              train: "Tren",
              bus: "Autobuz",
              covoiturage: "Carpooling organizat",
            },
          },
          frequence: {
            label: "Frecvența Călătoriilor",
            options: {
              allerRetour: "Doar dus-întors inițial",
              hebdomadaire: "Săptămânal",
              mensuel: "Lunar",
            },
          },
        },
      },
    },
  },

  // === PASUL 5: CANDIDAȚI ===
  step5: {
    title: "Profilul Candidatului",
    subtitle: "Definiți abilitățile și cerințele specifice.",
    sections: {
      experience: {
        title: "Experiență Profesională",
        obligatoire: {
          label: "Experiență obligatorie",
        },
        annees: {
          label: "Ani de experiență minime",
          placeholder: "ex. 3",
          options: {
            '0-1': "Începător (0-1 an)",
            '1-3': "Intermediar (1-3 ani)",
            '3-5': "Confirmat (3-5 ani)",
            '5+': "Expert (5+ ani)",
          },
        },
        competences: {
          label: "Competențe tehnice necesare",
          placeholder: "ex. Zidărie, cofrare, citire planuri, sudură TIG...",
        },
      },
      formation: {
        title: "Formare",
        obligatoire: {
          label: "Formare obligatorie",
        },
        type: {
          label: "Tip de formare",
          placeholder: "ex. CAP Zidărie, CACES R489...",
        },
      },
      travailRisque: {
        title: "Lucru periculos",
        active: {
          label: "Lucru periculos specific",
        },
        precisions: {
          label: "Detalii despre riscuri",
          placeholder: "ex. Lucru la înălțime, manipularea sarcinilor grele...",
        },
      },
      langues: {
        title: "Abilități Lingvistice",
        francais: {
          label: "Nivel Necesar de Franceză",
          placeholder: "Selectați un nivel",
          options: {
            a1: "A1 - Începător",
            a2: "A2 - Elementar",
            b1: "B1 - Intermediar",
            b2: "B2 - Intermediar Avansat",
            c1: "C1 - Avansat",
            c2: "C2 - Competent",
            natif: "Vorbitor nativ",
          },
        },
        autres: {
          label: "Alte Limbi Utile",
          placeholder: "ex. Engleză (B1), Germană (A2)...",
        },
        // Noms de langues
        languageNames: {
          francais: "Franceză",
          anglais: "Engleză",
          portugais: "Portugheză",
          espagnol: "Spaniolă",
          italien: "Italiană",
          autre: "Altă limbă",
        },
        // Niveaux de langue
        levels: {
          'non-requis': "Neobligatoriu",
          'A1': "A1 - Începător",
          'A2': "A2 - Elementar",
          'B1': "B1 - Intermediar",
          'B2': "B2 - Avansat",
          'C1': "C1 - Autonom",
          'C2': "C2 - Competent",
        },
      },
      permis: {
        title: "Permis de Conducere",
        requis: {
          label: "Permis Necesar",
          options: {
            aucun: "Nu este necesar permis",
            b: "Permis B (autoturism)",
            c: "Permis C (camion)",
            ce: "Permis CE (camion + remorcă)",
            d: "Permis D (transport pasageri)",
          },
        },
        categorie: {
          label: "Categoria permisului",
          placeholder: "ex. B, C, CE...",
        },
      },
      outillage: {
        title: "Unelte de lucru",
        requis: {
          label: "Unelte personale necesare",
        },
        type: {
          label: "Tip de unelte",
          placeholder: "ex. Ciocan, nivel, metru, mistrie...",
        },
      },
      epi: {
        title: "Echipament Individual de Protecție (EIP)",
        infoLegale: "ℹ️ Conform reglementărilor, angajatorul trebuie să furnizeze EIP-urile adaptate riscurilor postului.",
        selectionCount: "✓ {count} EIP selectat(e)",
        fournis: {
          label: "EIP asigurat de companie",
          helper: "Cască, încălțăminte de protecție, mănuși etc.",
          options: {
            oui: "Da, asigurat de client",
            non: "Nu, responsabilitatea lucrătorului",
          },
        },
        liste: {
          label: "Lista EIP Necesare",
          placeholder: "ex. Cască, încălțăminte S3, mănuși anti-tăiere, ham...",
        },
        // Liste des EPIs
        items: {
          casque: "Cască de protecție",
          lunettes: "Ochelari de protecție",
          protections_auditives: "Protecții auditive",
          gants: "Mănuși de protecție",
          chaussures: "Încălțăminte de protecție",
          harnais: "Ham de siguranță",
          vetements: "Echipament de lucru",
          masque: "Mască respiratorie",
          protection_faciale: "Protecție facială",
          vetements_visibilite: "Echipament de înaltă vizibilitate",
        },
      },
      autresExigences: {
        title: "Alte Cerințe",
        label: "Cerințe Specifice Suplimentare",
        placeholder: "ex. Certificări electrice, permis stivuitor, disponibilitate weekend, lucru la înălțime...",
      },
    },
  },

  // === REZUMAT ===
  recapitulatif: {
    title: "Rezumatul Cererii Dumneavoastră",
    subtitle: "Verificați informațiile înainte de a trimite cererea de ofertă.",
    acceptConditionsError: "Vă rugăm să acceptați condițiile înainte de a continua",
    entreprise: {
      title: "Companie",
      raisonSociale: "Denumire Companie",
      siret: "Număr Înregistrare",
      pays: "Țară",
      ville: "Oraș",
      region: "Regiune/Județ",
    },
    contact: {
      title: "Contact",
      nomPrenom: "Nume și prenume",
      email: "Email",
      telephone: "Telefon",
      fonction: "Funcție",
    },
    postes: {
      title: "Poziții Solicitate",
      coeffETT: "📊 Coeficient Agenție Aplicat",
      coeffBase: "Coef. de bază",
      facteurPays: "Factor țară",
      supplementsHoraires: "✨ Suplimente Orare (incluse în tarif)",
      hebergement: "✓ Cazare",
      transport: "✓ Transport local",
      panierRepas: "🍽️ Pachet alimentar (facturat zilnic)",
      baseHoraire: "📅 Ore lunare: {heures} ore/lună (ore suplimentare detectate)",
      heuresNormales: "Ore normale (0-35 ore/săpt)",
      heuresSup25: "Ore suplimentare +25% (a 36-a - a 43-a oră)",
      heuresSup50: "Ore suplimentare +50% (a 44-a+ oră)",
      sousTotal: "Subtotal muncă (per persoană)",
      tauxHoraireBrut: "Tarif orar brut",
      tauxETTFinal: "Tarif final agenție",
      coutMensuel: "Cost lunar total",
    },
    conditions: {
      title: "Condiții Misiune",
      dateDebut: "Data de începere",
      dateFin: "Data de încheiere",
      dureeEstimee: "Durată estimată",
      lieuMission: "Locul misiunii",
      mois: "luni",
    },
    majorations: {
      title: "Ajustări tarifare ale misiunii",
      total: "Total ajustări",
      notSet: "Nedefinit",
    },
    totaux: {
      mensuelHT: "Total Lunar (fără TVA)",
      mensuelTTC: "Total Lunar (cu TVA)",
      totalMission: "Cost Total Misiune",
    },
    noteLegale: "ℹ️ Această estimare este orientativă. Prețul final va fi confirmat după validarea de către echipa noastră și agenția parteneră selectată.",
    acceptConditions: {
      text: "Sunt de acord ca datele mele să fie procesate în conformitate cu",
      lien: "politica de confidențialitate",
    },
    boutonEnvoi: {
      texte: "Trimite Cererea Mea de Ofertă",
      enCours: "Se trimite...",
    },
    footer: "✓ Răspuns în 24 de ore lucrătoare • ✓ Fără angajament",
  },

  // === ERORI ===
  errors: {
    required: "Acest câmp este obligatoriu",
    invalidEmail: "Adresă de email invalidă",
    invalidSIRET: "Număr de înregistrare invalid",
    invalidPhone: "Număr de telefon invalid",
    minValue: "Valoarea trebuie să fie mai mare sau egală cu {min}",
    maxValue: "Valoarea trebuie să fie mai mică sau egală cu {max}",
    genericError: "A apărut o eroare. Vă rugăm să încercați din nou.",
    loadingError: "Eroare la încărcarea datelor",
    submitError: "Eroare la trimiterea cererii",
  },

  // === SECTOARE & MESERII ===
  secteurs: {
    batiment: {
      label: "Construcții",
      convention: "Convenție colectivă națională a lucrătorilor din construcții (3193)",
      postes: {
        macon: "Zidar",
        coffreur: "Cofreur",
        ferrailleur: "Fierar betonist",
        carreleur: "Faianțar",
        platrier: "Gipsar",
        peintre: "Zugrav",
        plombier: "Instalator",
        electricien: "Electrician",
        couvreur: "Acoperișor",
        menuisier: "Tâmplar",
        chef_equipe_batiment: "Șef echipă",
        chef_chantier: "Șef șantier",
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
      label: "Metalurgie",
      convention: "Convenție colectivă a metalurgiei (3109)",
      postes: {
        soudeur: "Sudor",
        chaudronnier: "Tinichigiu",
        tuyauteur: "Instalator conducte",
        tourneur: "Strungar",
        fraiseur: "Frezor",
        usineur: "Operator mașini-unelte",
        mecanicien_industriel: "Mecanic industrial",
        monteur: "Montator",
        controleur_qualite: "Inspector calitate",
        ajusteur: "Ajustor mecanic",
        chef_equipe_metallurgie: "Șef echipă",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
        niveau_5: "Nivel V",
      },
    },
    tp: {
      label: "Lucrări Publice",
      convention: "Convenție colectivă națională a lucrărilor publice (3005)",
      postes: {
        conducteur_engins: "Operator utilaje",
        terrassier: "Muncitor terasamente",
        canalisateur: "Canalizator",
        constructeur_routes: "Constructor drumuri",
        coffreur_bancheur: "Cofreur beton",
        macon_vrd: "Zidar VRD",
        chef_equipe_tp: "Șef echipă LP",
        manoeuvre_tp: "Muncitor necalificat LP",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hotelărie",
      convention: "Convenție colectivă a hotelăriei-restaurației (3292)",
      postes: {
        receptionniste: "Recepționer",
        femme_chambre: "Cameristă",
        agent_entretien: "Agent întreținere",
        bagagiste: "Bagajist",
        concierge: "Concierge",
        night_audit: "Night audit",
        gouvernante: "Guvernantă",
        chef_reception: "Șef recepție",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
        niveau_5: "Nivel V",
      },
    },
    restauration: {
      label: "Restaurație",
      convention: "Convenție colectivă a hotelăriei-restaurației (3292)",
      postes: {
        cuisinier: "Bucătar",
        commis_cuisine: "Ajutor bucătar",
        chef_partie: "Șef de partidă",
        serveur: "Ospătar",
        barman: "Barman",
        plongeur: "Spălător vase",
        chef_rang: "Șef de rang",
        maitre_hotel: "Maitre d'hotel",
        second_cuisine: "Sous-chef",
        chef_cuisine: "Șef bucătar",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
        niveau_5: "Nivel V",
      },
    },
    plasturgie: {
      label: "Industria Materialelor Plastice",
      convention: "Convenție colectivă a industriei materialelor plastice (0292)",
      postes: {
        operateur_injection: "Operator injecție",
        operateur_extrusion: "Operator extrudare",
        regleur: "Reglor",
        operateur_thermoformage: "Operator termoformare",
        controleur_qualite_plasturgie: "Inspector calitate",
        technicien_maintenance: "Tehnician întreținere",
        chef_equipe_plasturgie: "Șef echipă",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    automobile_carrosserie: {
      label: "Caroserie Auto",
      convention: "Convenție colectivă a reparațiilor auto (1090)",
      postes: {
        carrossier: "Carosier",
        peintre_automobile: "Vopsitor auto",
        mecanicien_auto: "Mecanic auto",
        electricien_auto: "Electrician auto",
        chef_atelier: "Șef atelier",
        controleur_technique: "Inspector tehnic",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    sylviculture: {
      label: "Silvicultură",
      convention: "Convenție colectivă a agriculturii (7501)",
      postes: {
        bucheron: "Tăietor de lemne",
        elagueur: "Arborist",
        conducteur_engins_forestiers: "Operator utilaje forestiere",
        chef_equipe_sylviculture: "Șef echipă silvicultură",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    cartonnerie: {
      label: "Industria Cartonului",
      convention: "Convenție colectivă a industriei de transformare (3107)",
      postes: {
        operateur_production: "Operator producție",
        conducteur_ligne: "Operator linie",
        regleur_cartonnerie: "Reglor",
        chef_equipe_cartonnerie: "Șef echipă",
      },
      classifications: {
        niveau_1: "Nivel I",
        niveau_2: "Nivel II",
        niveau_3: "Nivel III",
        niveau_4: "Nivel IV",
      },
    },
    autre: {
      label: "Altele",
      convention: "De definit în funcție de activitate",
      postes: {
        autre_poste: "Alte posturi (de specificat)",
      },
      classifications: {
        a_definir: "De definit",
      },
    },
  },
  
  // === ȚĂRI EUROPENE ===
  pays: {
    france: "Franța",
    allemagne: "Germania",
    autriche: "Austria",
    belgique: "Belgia",
    bulgarie: "Bulgaria",
    croatie: "Croația",
    chypre: "Cipru",
    danemark: "Danemarca",
    espagne: "Spania",
    estonie: "Estonia",
    finlande: "Finlanda",
    grece: "Grecia",
    hongrie: "Ungaria",
    irlande: "Irlanda",
    italie: "Italia",
    lettonie: "Letonia",
    lituanie: "Lituania",
    luxembourg: "Luxemburg",
    malte: "Malta",
    pays_bas: "Țările de Jos",
    pologne: "Polonia",
    portugal: "Portugalia",
    republique_tcheque: "Republica Cehă",
    roumanie: "România",
    slovaquie: "Slovacia",
    slovenie: "Slovenia",
    suede: "Suedia",
  },
  
  // === PAGINĂ RECAPITULARE OFERTĂ (SEMNĂTURĂ) ===
  pageRecap: {
    header: {
      title: "Recapitulare ofertă",
      exportPDF: "Export PDF",
      loading: "Se încarcă oferta...",
      notFound: "Oferta nu a fost găsită",
    },
    statut: {
      signe: "Semnat",
      nouveau: "Nou",
    },
    dates: {
      creeLe: "Creat la",
      a: "la",
      signeLe: "Semnat la",
      derniereModification: "Ultima modificare:",
    },
    entreprise: {
      title: "Informații companie",
      raisonSociale: "Denumire socială",
      siret: "SIRET",
      codeAPE: "Cod APE",
      tvaIntracommunautaire: "TVA Intracomunitară",
      adresse: "Adresă",
      siteInternet: "Site web",
    },
    contact: {
      title: "Persoană de contact",
      nomComplet: "Nume complet",
      fonction: "Funcție",
      email: "Email",
      telephonePortable: "Telefon mobil",
      telephoneFixe: "Telefon fix",
    },
    postes: {
      title: "Posturi de ocupat",
      nationalite: "Naționalitate",
      salaireBrut: "Salariu brut",
      tauxHoraireBrut: "Rată orară brută",
      coefficientETT: "Coeficient ETT",
      tauxETT: "Rată ETT",
    },
    conditions: {
      title: "Condiții de muncă",
      dateDebut: "Data de început",
      dateFin: "Data de sfârșit",
      periodeEssai: "Perioadă de probă",
      baseHoraire: "Bază orară",
      heuresMois: "h/lună",
      lieuxMission: "Locuri de misiune",
      motifRecours: "Motivul recurgerii",
    },
    candidats: {
      title: "Profilul candidaților căutați",
      experience: "Experiență",
      ansMinimum: "ani minim",
      formation: "Formare",
      permis: "Permis",
      langues: "Limbi",
    },
    signature: {
      title: "Semnătură electronică",
      subtitle: "Semnați oferta dvs. online în siguranță",
      commencer: "Începeți semnarea",
      identiteSignataire: "Identitatea semnatarului",
      nomComplet: "Nume complet",
      fonction: "Funcție",
      email: "Email",
      entreprise: "Companie",
      siret: "SIRET",
      adresseIP: "Adresă IP",
      infoLegale: "🔒 Aceste informații vor fi înregistrate în certificatul de semnătură electronică pentru a garanta trasabilitatea și conformitatea legală conform regulamentului eIDAS (UE) nr. 910/2014.",
      dessinerSignature: "Desenați semnătura dvs. mai jos",
      effacer: "Șterge",
      accepteCGV: "Accept",
      cgvLien: "Termenii și Condițiile de Vânzare",
      accepteCGVSuite: "și certific că informațiile furnizate sunt exacte. Această semnătură electronică are aceeași valoare juridică ca o semnătură manuscrisă.",
      annuler: "Anulare",
      validerSigner: "Validați și semnați",
      signatureEnCours: "Semnare în curs...",
      erreurSignatureVide: "Vă rugăm să semnați înainte de validare",
      erreurCGV: "Vă rugăm să acceptați CGV",
    },
    succes: {
      title: "Oferta a fost semnată cu succes!",
      message: "Această ofertă a fost semnată electronic. Veți primi în curând un email de confirmare cu PDF-ul final.",
      signeLe: "Semnat la",
    },
    erreurs: {
      chargement: "Imposibil de încărcat oferta",
      generation: "Imposibil de generat PDF-ul",
      signature: "Imposibil de semnat oferta",
    },
    toast: {
      pdfEnCours: "Generare PDF în curs...",
      pdfSucces: "PDF generat cu succes!",
      signatureSucces: "Oferta a fost semnată cu succes! Un email de confirmare vi a fost trimis.",
    },
  },
};