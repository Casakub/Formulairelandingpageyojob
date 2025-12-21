/**
 * 🇫🇷 TRADUCTIONS FRANÇAISES - FORMULAIRE DE DEVIS
 * 
 * Langue de référence (base locale)
 * Toutes les 116+ clés de traduction
 * 
 * @version 2.0.0
 * @updated 2024-12-21
 */

import type { DevisTranslations } from '../types';

export const fr: DevisTranslations = {
  // === COMMUN ===
  common: {
    next: "Suivant",
    previous: "Précédent",
    submit: "Envoyer",
    required: "*",
    optional: "(optionnel)",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    save: "Enregistrer",
    edit: "Modifier",
    delete: "Supprimer",
    confirm: "Confirmer",
    euro: "€",
    perHour: "/h",
    perMonth: "/mois",
    perDay: "/jour",
    persons: "personne(s)",
    hours: "heure(s)",
    days: "jour(s)",
    months: "mois",
    year: "an(s)",
  },

  // === NAVIGATION ===
  navigation: {
    steps: {
      entreprise: {
        title: "Entreprise",
        badge: "🏢 Votre entreprise",
      },
      contact: {
        title: "Contact",
        badge: "👤 Votre contact",
      },
      besoins: {
        title: "Besoins",
        badge: "💼 Vos besoins",
      },
      conditions: {
        title: "Conditions",
        badge: "📋 Conditions",
      },
      candidats: {
        title: "Candidats",
        badge: "👷 Profil recherché",
      },
      recapitulatif: {
        title: "Récapitulatif",
        badge: "✅ Récapitulatif",
      },
    },
  },

  // === ÉTAPE 1 : ENTREPRISE ===
  step1: {
    title: "Informations de l'entreprise",
    subtitle: "Renseignez les informations légales de votre entreprise utilisatrice.",
    fields: {
      pays: {
        label: "Pays",
        placeholder: "Sélectionnez un pays",
      },
      raisonSociale: {
        label: "Raison sociale",
        placeholder: "Ex: YOJOB SAS",
      },
      siret: {
        label: "SIRET",
        placeholder: "14 chiffres",
        helper: "Numéro d'identification de votre établissement",
      },
      codeAPE: {
        label: "Code APE/NAF",
        placeholder: "Ex: 7830Z",
      },
      tvaIntracommunautaire: {
        label: "N° TVA Intracommunautaire",
        placeholder: "Ex: FR12345678901",
      },
      adresse: {
        label: "Adresse complète",
        placeholder: "Numéro et nom de rue",
      },
      codePostal: {
        label: "Code postal",
        placeholder: "Ex: 75001",
      },
      ville: {
        label: "Ville",
        placeholder: "Ex: Paris",
      },
      region: {
        label: "Région/État",
        placeholder: "Sélectionnez une région",
        placeholderOtherCountry: "Ex: Bavaria, Cataluña, Lombardia...",
      },
      siteInternet: {
        label: "Site internet",
        placeholder: "https://www.exemple.fr",
      },
    },
    infoMessage: "✓ Ces informations seront utilisées pour générer votre devis personnalisé",
  },

  // === ÉTAPE 2 : CONTACT ===
  step2: {
    title: "Personne de contact",
    subtitle: "Qui sera votre interlocuteur privilégié pour ce projet ?",
    fields: {
      civilite: {
        label: "Civilité",
        options: {
          m: "M.",
          mme: "Mme",
        },
      },
      nom: {
        label: "Nom",
        placeholder: "Ex: Dupont",
      },
      prenom: {
        label: "Prénom",
        placeholder: "Ex: Jean",
      },
      fonction: {
        label: "Fonction",
        placeholder: "Ex: Responsable RH",
      },
      email: {
        label: "Email professionnel",
        placeholder: "jean.dupont@entreprise.fr",
      },
      telephone: {
        label: "Téléphone",
        placeholder: "+33 6 12 34 56 78",
      },
    },
  },

  // === ÉTAPE 3 : BESOINS ===
  step3: {
    title: "Définissez vos besoins",
    subtitle: "Décrivez précisément les postes recherchés.",
    fields: {
      secteur: {
        label: "Secteur d'activité",
        placeholder: "Sélectionnez un secteur",
      },
      poste: {
        label: "Poste recherché",
        placeholder: "Sélectionnez un poste",
      },
      classification: {
        label: "Classification / Qualification",
        placeholder: "Sélectionnez une classification",
      },
      quantite: {
        label: "Nombre de personnes",
        placeholder: "Ex: 5",
        helper: "Combien de personnes pour ce poste ?",
      },
      salaireBrut: {
        label: "Salaire brut mensuel",
        placeholder: "Ex: 2500",
        helper: "Salaire brut sur base 151.67h/mois",
      },
      nationalite: {
        label: "Nationalité des travailleurs",
        placeholder: "Sélectionnez un pays",
        helper: "La nationalité impacte le coefficient de tarification ETT",
      },
    },
    ajouterPoste: "Ajouter un autre poste",
    supprimerPoste: "Supprimer ce poste",
    posteNumero: "Poste",
    coefficientInfo: {
      title: "💡 Coefficient ETT appliqué",
      base: "Coeff. base",
      facteurPays: "Facteur pays",
      final: "Coefficient final",
    },
  },

  // === ÉTAPE 4 : CONDITIONS ===
  step4: {
    title: "Conditions de travail",
    subtitle: "Précisez les conditions d'emploi et les avantages proposés.",
    fields: {
      dateDebut: {
        label: "Date de début souhaitée",
        placeholder: "JJ/MM/AAAA",
      },
      dateFin: {
        label: "Date de fin prévisionnelle",
        placeholder: "JJ/MM/AAAA",
        helper: "Laissez vide si durée indéterminée",
      },
      baseHoraire: {
        label: "Base horaire mensuelle",
        placeholder: "Ex: 151.67",
        helper: "Base légale France: 151.67h/mois (35h/semaine)",
      },
      lieuxMission: {
        label: "Lieux de mission",
        placeholder: "Ex: Paris 15e, Lyon 3e, Marseille...",
      },
    },
    sections: {
      hebergement: {
        title: "Hébergement",
        chargeEU: {
          label: "Hébergement pris en charge par l'entreprise utilisatrice",
          helper: "Si NON : supplément horaire de +3.50€/h sera facturé par l'ETT",
          options: {
            oui: "Oui, fourni par EU",
            non: "Non, à charge de l'ETT",
          },
        },
        detailsEU: {
          type: {
            label: "Type d'hébergement",
            options: {
              hotel: "Hôtel",
              appartement: "Appartement",
              foyer: "Foyer",
              autre: "Autre",
            },
          },
          adresse: {
            label: "Adresse de l'hébergement",
            placeholder: "Adresse complète",
          },
        },
      },
      transportInternational: {
        title: "Transport international (pays d'origine ↔ France)",
        chargeEU: {
          label: "Transport pris en charge par l'entreprise utilisatrice",
          helper: "Voyages entre le pays d'origine et le lieu de mission",
          options: {
            oui: "Oui, fourni par EU",
            non: "Non, à charge du travailleur",
          },
        },
        detailsEU: {
          type: {
            label: "Type de transport",
            options: {
              avion: "Avion",
              train: "Train",
              bus: "Bus/Car",
              covoiturage: "Covoiturage organisé",
            },
          },
          frequence: {
            label: "Fréquence des trajets",
            options: {
              allerRetour: "Aller-retour initial uniquement",
              hebdomadaire: "Hebdomadaire",
              mensuel: "Mensuel",
            },
          },
        },
      },
      transportLocal: {
        title: "Transport local (sur le lieu de mission)",
        chargeETT: {
          label: "Transport local pris en charge par l'ETT",
          helper: "Si OUI : supplément horaire de +1.50€/h sera facturé",
          options: {
            oui: "Oui, fourni par ETT",
            non: "Non",
          },
        },
        detailsETT: {
          type: {
            label: "Type de transport",
            options: {
              vehicule: "Véhicule de service",
              transport: "Abonnement transport en commun",
              velo: "Vélo/Trottinette",
            },
          },
        },
      },
      repas: {
        title: "Restauration",
        type: {
          label: "Solution de restauration",
          options: {
            restaurant: "Restaurant d'entreprise / Tickets resto",
            panier: "Panier repas (facturé par jour)",
            nonConcerne: "Non concerné",
          },
        },
        detailsRestaurant: {
          budgetJour: {
            label: "Budget par jour",
            placeholder: "Ex: 12.00",
          },
        },
        detailsPanier: {
          info: "Le panier repas sera facturé séparément par jour travaillé selon le barème du pays d'origine",
        },
      },
    },
  },

  // === ÉTAPE 5 : CANDIDATS ===
  step5: {
    title: "Profil des candidats",
    subtitle: "Définissez les compétences et exigences spécifiques.",
    sections: {
      experience: {
        title: "Expérience professionnelle",
        annees: {
          label: "Années d'expérience minimales",
          placeholder: "Sélectionnez un niveau",
          options: {
            '0-1': "Débutant (0-1 an)",
            '1-3': "Intermédiaire (1-3 ans)",
            '3-5': "Confirmé (3-5 ans)",
            '5+': "Expert (5 ans et plus)",
          },
        },
        competences: {
          label: "Compétences techniques requises",
          placeholder: "Ex: Maçonnerie, coffrage, lecture de plans, soudure TIG...",
        },
      },
      langues: {
        title: "Compétences linguistiques",
        francais: {
          label: "Niveau de français requis",
          placeholder: "Sélectionnez un niveau",
          options: {
            a1: "A1 - Débutant",
            a2: "A2 - Élémentaire",
            b1: "B1 - Intermédiaire",
            b2: "B2 - Intermédiaire avancé",
            c1: "C1 - Avancé",
            c2: "C2 - Maîtrise",
            natif: "Langue maternelle",
          },
        },
        autres: {
          label: "Autres langues utiles",
          placeholder: "Ex: Anglais (B1), Allemand (A2)...",
        },
      },
      permis: {
        title: "Permis de conduire",
        requis: {
          label: "Permis requis",
          options: {
            aucun: "Aucun permis requis",
            b: "Permis B (voiture)",
            c: "Permis C (poids lourd)",
            ce: "Permis CE (poids lourd + remorque)",
            d: "Permis D (transport de personnes)",
          },
        },
      },
      epi: {
        title: "Équipements de protection individuelle (EPI)",
        fournis: {
          label: "EPI fournis par l'entreprise",
          helper: "Casque, chaussures de sécurité, gants, etc.",
          options: {
            oui: "Oui, fournis par EU",
            non: "Non, à charge du travailleur",
          },
        },
        liste: {
          label: "Liste des EPI nécessaires",
          placeholder: "Ex: Casque, chaussures S3, gants anti-coupure, harnais...",
        },
      },
      autresExigences: {
        title: "Autres exigences",
        label: "Exigences spécifiques supplémentaires",
        placeholder: "Ex: Habilitations électriques, CACES, disponibilité weekend, travail en hauteur...",
      },
    },
  },

  // === RÉCAPITULATIF ===
  recapitulatif: {
    title: "Récapitulatif de votre demande",
    subtitle: "Vérifiez les informations avant d'envoyer votre demande de devis.",
    acceptConditionsError: "Veuillez accepter les conditions avant de continuer",
    entreprise: {
      title: "Entreprise",
      raisonSociale: "Raison sociale",
      siret: "SIRET",
      pays: "Pays",
      ville: "Ville",
      region: "Région/État",
    },
    contact: {
      title: "Contact",
      nomPrenom: "Nom et prénom",
      email: "Email",
      telephone: "Téléphone",
      fonction: "Fonction",
    },
    postes: {
      title: "Postes demandés",
      coeffETT: "📊 Coefficient ETT appliqué",
      coeffBase: "Coeff. base",
      facteurPays: "Facteur pays",
      supplementsHoraires: "✨ Suppléments horaires (inclus dans le taux)",
      hebergement: "✓ Hébergement",
      transport: "✓ Transport local",
      panierRepas: "🍽️ Panier repas (facturé par jour)",
      baseHoraire: "📅 Base horaire : {heures}h/mois (heures supplémentaires détectées)",
      heuresNormales: "Heures normales (0-35h/sem)",
      heuresSup25: "Heures supp. +25% (36e-43e h)",
      heuresSup50: "Heures supp. +50% (44e+ h)",
      sousTotal: "Sous-total main d'œuvre (par personne)",
      tauxHoraireBrut: "Taux horaire brut",
      tauxETTFinal: "Taux ETT final",
      coutMensuel: "Coût mensuel total",
    },
    conditions: {
      title: "Conditions de mission",
      dateDebut: "Date de début",
      dateFin: "Date de fin",
      dureeEstimee: "Durée estimée",
      lieuMission: "Lieu de mission",
      mois: "mois",
    },
    totaux: {
      mensuelHT: "Total mensuel HT",
      mensuelTTC: "Total mensuel TTC",
      totalMission: "Coût total mission",
    },
    noteLegale: "ℹ️ Cette estimation est donnée à titre indicatif. Le tarif définitif sera confirmé après validation par notre équipe et l'ETT partenaire sélectionnée.",
    acceptConditions: {
      text: "J'accepte que mes données soient traitées conformément à la",
      lien: "politique de confidentialité",
    },
    boutonEnvoi: {
      texte: "Envoyer ma demande de devis",
      enCours: "Envoi en cours...",
    },
    footer: "✓ Réponse sous 24h ouvrées • ✓ Sans engagement",
  },

  // === ERREURS ===
  errors: {
    required: "Ce champ est obligatoire",
    invalidEmail: "Adresse email invalide",
    invalidSIRET: "SIRET invalide (14 chiffres requis)",
    invalidPhone: "Numéro de téléphone invalide",
    minValue: "La valeur doit être supérieure ou égale à {min}",
    maxValue: "La valeur doit être inférieure ou égale à {max}",
    genericError: "Une erreur est survenue. Veuillez réessayer.",
    loadingError: "Erreur lors du chargement des données",
    submitError: "Erreur lors de l'envoi de la demande",
  },
};