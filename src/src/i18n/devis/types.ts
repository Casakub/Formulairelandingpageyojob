/**
 * 🌍 TYPES POUR LES TRADUCTIONS DU FORMULAIRE DE DEVIS
 * 
 * Structure TypeScript complète pour toutes les traductions
 * Basée sur les clés réelles utilisées dans les composants
 * 
 * @version 2.0.0
 * @updated 2024-12-21
 */

export interface DevisTranslations {
  // === COMMUN ===
  common: {
    next: string;
    previous: string;
    submit: string;
    required: string;
    optional: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    confirm: string;
    euro: string;
    perHour: string;
    perMonth: string;
    perDay: string;
    persons: string;
    hours: string;
    days: string;
    months: string;
    year: string;
  };

  // === NAVIGATION ===
  navigation: {
    back: string;
    stepOf: string; // "Étape {step} sur {total}"
    steps: {
      entreprise: {
        title: string;
        badge: string;
      };
      contact: {
        title: string;
        badge: string;
      };
      besoins: {
        title: string;
        badge: string;
      };
      conditions: {
        title: string;
        badge: string;
      };
      candidats: {
        title: string;
        badge: string;
      };
      recapitulatif: {
        title: string;
        badge: string;
      };
    };
  };

  // === VALIDATION ===
  validation: {
    fillRequired: string;
    selectRegion: string;
    addAtLeastOnePosition: string;
    invalidEmail: string;
    invalidPhone: string;
    invalidSIRET: string;
    dateRequired: string;
    missionLocationRequired: string;
  };

  // === MESSAGES ===
  messages: {
    success: {
      quoteSent: string;
      redirecting: string;
    };
    error: {
      submitError: string;
      genericError: string;
    };
  };

  // === META ===
  meta: {
    pageTitle: string;
    pageDescription: string;
  };

  // === ÉTAPE 1 : ENTREPRISE ===
  step1: {
    title: string;
    subtitle: string;
    fields: {
      pays: {
        label: string;
        placeholder: string;
      };
      raisonSociale: {
        label: string;
        placeholder: string;
      };
      siret: {
        label: string;
        placeholder: string;
        helper: string;
      };
      codeAPE: {
        label: string;
        placeholder: string;
      };
      tvaIntracommunautaire: {
        label: string;
        placeholder: string;
      };
      adresse: {
        label: string;
        placeholder: string;
      };
      codePostal: {
        label: string;
        placeholder: string;
      };
      ville: {
        label: string;
        placeholder: string;
      };
      region: {
        label: string;
        placeholder: string;
        placeholderOtherCountry: string;
      };
      siteInternet: {
        label: string;
        placeholder: string;
      };
    };
    infoMessage: string;
  };

  // === ÉTAPE 2 : CONTACT ===
  step2: {
    title: string;
    subtitle: string;
    fields: {
      civilite: {
        label: string;
        options: {
          m: string;
          mme: string;
        };
      };
      nom: {
        label: string;
        placeholder: string;
      };
      prenom: {
        label: string;
        placeholder: string;
      };
      fonction: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      telephone: {
        label: string;
        placeholder: string;
      };
    };
  };

  // === ÉTAPE 3 : BESOINS ===
  step3: {
    title: string;
    subtitle: string;
    fields: {
      secteur: {
        label: string;
        placeholder: string;
      };
      convention: {
        label: string;
        placeholder: string;
      };
      poste: {
        label: string;
        placeholder: string;
      };
      classification: {
        label: string;
        placeholder: string;
      };
      quantite: {
        label: string;
        placeholder: string;
        helper: string;
      };
      salaireBrut: {
        label: string;
        placeholder: string;
        helper: string;
      };
      nationalite: {
        label: string;
        placeholder: string;
        helper: string;
      };
    };
    ajouterPoste: string;
    supprimerPoste: string;
    posteNumero: string;
    coefficientInfo: {
      title: string;
      base: string;
      facteurPays: string;
      final: string;
    };
  };

  // === ÉTAPE 4 : CONDITIONS ===
  step4: {
    title: string;
    subtitle: string;
    fields: {
      dateDebut: {
        label: string;
        placeholder: string;
      };
      dateFin: {
        label: string;
        placeholder: string;
        helper: string;
      };
      baseHoraire: {
        label: string;
        placeholder: string;
        helper: string;
      };
      lieuxMission: {
        label: string;
        placeholder: string;
      };
    };
    sections: {
      hebergement: {
        title: string;
        chargeEU: {
          label: string;
          helper: string;
          options: {
            oui: string;
            non: string;
          };
        };
        detailsEU: {
          type: {
            label: string;
            options: {
              hotel: string;
              appartement: string;
              foyer: string;
              autre: string;
            };
          };
          adresse: {
            label: string;
            placeholder: string;
          };
        };
      };
      transportInternational: {
        title: string;
        chargeEU: {
          label: string;
          helper: string;
          options: {
            oui: string;
            non: string;
          };
        };
        detailsEU: {
          type: {
            label: string;
            options: {
              avion: string;
              train: string;
              bus: string;
              covoiturage: string;
            };
          };
          frequence: {
            label: string;
            options: {
              allerRetour: string;
              hebdomadaire: string;
              mensuel: string;
            };
          };
        };
      };
      transportLocal: {
        title: string;
        chargeETT: {
          label: string;
          helper: string;
          options: {
            oui: string;
            non: string;
          };
        };
        detailsETT: {
          type: {
            label: string;
            options: {
              vehicule: string;
              transport: string;
              velo: string;
            };
          };
        };
      };
      repas: {
        title: string;
        type: {
          label: string;
          options: {
            restaurant: string;
            panier: string;
            nonConcerne: string;
          };
        };
        detailsRestaurant: {
          budgetJour: {
            label: string;
            placeholder: string;
          };
        };
        detailsPanier: {
          info: string;
        };
      };
    };
  };

  // === ÉTAPE 5 : CANDIDATS ===
  step5: {
    title: string;
    subtitle: string;
    sections: {
      experience: {
        title: string;
        annees: {
          label: string;
          placeholder: string;
          options: {
            '0-1': string;
            '1-3': string;
            '3-5': string;
            '5+': string;
          };
        };
        competences: {
          label: string;
          placeholder: string;
        };
      };
      langues: {
        title: string;
        francais: {
          label: string;
          placeholder: string;
          options: {
            a1: string;
            a2: string;
            b1: string;
            b2: string;
            c1: string;
            c2: string;
            natif: string;
          };
        };
        autres: {
          label: string;
          placeholder: string;
        };
      };
      permis: {
        title: string;
        requis: {
          label: string;
          options: {
            aucun: string;
            b: string;
            c: string;
            ce: string;
            d: string;
          };
        };
      };
      epi: {
        title: string;
        fournis: {
          label: string;
          helper: string;
          options: {
            oui: string;
            non: string;
          };
        };
        liste: {
          label: string;
          placeholder: string;
        };
      };
      autresExigences: {
        title: string;
        label: string;
        placeholder: string;
      };
    };
  };

  // === RÉCAPITULATIF ===
  recapitulatif: {
    title: string;
    subtitle: string;
    acceptConditionsError: string;
    entreprise: {
      title: string;
      raisonSociale: string;
      siret: string;
      pays: string;
      ville: string;
      region: string;
    };
    contact: {
      title: string;
      nomPrenom: string;
      email: string;
      telephone: string;
      fonction: string;
    };
    postes: {
      title: string;
      coeffETT: string;
      coeffBase: string;
      facteurPays: string;
      supplementsHoraires: string;
      hebergement: string;
      transport: string;
      panierRepas: string;
      baseHoraire: string;
      heuresNormales: string;
      heuresSup25: string;
      heuresSup50: string;
      sousTotal: string;
      tauxHoraireBrut: string;
      tauxETTFinal: string;
      coutMensuel: string;
    };
    conditions: {
      title: string;
      dateDebut: string;
      dateFin: string;
      dureeEstimee: string;
      lieuMission: string;
      mois: string;
    };
    totaux: {
      mensuelHT: string;
      mensuelTTC: string;
      totalMission: string;
    };
    noteLegale: string;
    acceptConditions: {
      text: string;
      lien: string;
    };
    boutonEnvoi: {
      texte: string;
      enCours: string;
    };
    footer: string;
  };

  // === ERREURS ===
  errors: {
    required: string;
    invalidEmail: string;
    invalidSIRET: string;
    invalidPhone: string;
    minValue: string;
    maxValue: string;
    genericError: string;
    loadingError: string;
    submitError: string;
  };

  // === SECTEURS & MÉTIERS ===
  secteurs: {
    [secteurKey: string]: {
      label: string;
      postes: {
        [posteKey: string]: string;
      };
      classifications: {
        [classificationKey: string]: string;
      };
    };
  };
}

// === TYPES DE LANGUES ===
export type DevisLanguage = 
  | 'fr' // Français
  | 'en' // Anglais
  | 'de' // Allemand
  | 'es' // Espagnol
  | 'pl' // Polonais
  | 'ro' // Roumain
  | 'it' // Italien
  | 'pt' // Portugais
  | 'nl' // Néerlandais
  | 'bg' // Bulgare
  | 'hu' // Hongrois
  | 'cs' // Tchèque
  | 'sk' // Slovaque
  | 'hr' // Croate
  | 'sl' // Slovène
  | 'el' // Grec
  | 'fi' // Finnois
  | 'sv' // Suédois
  | 'da' // Danois
  | 'et' // Estonien
  | 'lv' // Letton
  | 'lt'; // Lituanien

export interface DevisLanguageOption {
  code: DevisLanguage;
  label: string;
  flag: string;
  nativeName: string;
}