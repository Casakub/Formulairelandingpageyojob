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
    fields: {
      secteur: {
        label: "Sector de Activitate",
        placeholder: "Selectați un sector",
      },
      poste: {
        label: "Poziție",
        placeholder: "Selectați o poziție",
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
  },

  // === PASUL 4: CONDIȚII ===
  step4: {
    title: "Condiții de Muncă",
    subtitle: "Specificați condițiile de angajare și beneficiile oferite.",
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
    },
    sections: {
      hebergement: {
        title: "Cazare",
        chargeEU: {
          label: "Cazare asigurată de compania client",
          helper: "Dacă NU: supliment orar de +3,50 €/oră va fi facturat de agenție",
          options: {
            oui: "Da, asigurat de client",
            non: "Nu, responsabilitatea agenției",
          },
        },
        detailsEU: {
          type: {
            label: "Tip de Cazare",
            options: {
              hotel: "Hotel",
              appartement: "Apartament",
              foyer: "Cămin",
              autre: "Altul",
            },
          },
          adresse: {
            label: "Adresa Cazării",
            placeholder: "Adresă completă",
          },
        },
      },
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
      transportLocal: {
        title: "Transport Local (la locul misiunii)",
        chargeETT: {
          label: "Transport local asigurat de agenție",
          helper: "Dacă DA: supliment orar de +1,50 €/oră va fi facturat",
          options: {
            oui: "Da, asigurat de agenție",
            non: "Nu",
          },
        },
        detailsETT: {
          type: {
            label: "Tip de Transport",
            options: {
              vehicule: "Vehicul de serviciu",
              transport: "Abonament transport public",
              velo: "Bicicletă/Trotinetă",
            },
          },
        },
      },
      repas: {
        title: "Mese",
        type: {
          label: "Soluție de Masă",
          options: {
            restaurant: "Cantină firmă / Tichete de masă",
            panier: "Pachet alimentar (facturat zilnic)",
            nonConcerne: "Nu se aplică",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Buget Zilnic",
            placeholder: "ex. 12,00",
          },
        },
        detailsPanier: {
          info: "Pachetul alimentar va fi facturat separat pe zi lucrată conform tarifului țării de origine",
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
        annees: {
          label: "Ani Minimi de Experiență",
          placeholder: "Selectați un nivel",
          options: {
            '0-1': "Începător (0-1 an)",
            '1-3': "Intermediar (1-3 ani)",
            '3-5': "Experimentat (3-5 ani)",
            '5+': "Expert (5+ ani)",
          },
        },
        competences: {
          label: "Abilități Tehnice Necesare",
          placeholder: "ex. Zidărie, cofrare, citire planuri, sudură TIG...",
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
      },
      epi: {
        title: "Echipament Individual de Protecție (EIP)",
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
};