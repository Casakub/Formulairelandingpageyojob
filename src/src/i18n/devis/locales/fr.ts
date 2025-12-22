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
    back: "Retour",
    stepOf: "Étape {step} sur {total}",
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

  // === VALIDATION ===
  validation: {
    fillRequired: "Veuillez remplir tous les champs obligatoires",
    selectRegion: "Veuillez sélectionner une région",
    addAtLeastOnePosition: "Veuillez ajouter au moins un poste",
    invalidEmail: "Veuillez saisir une adresse email valide",
    invalidPhone: "Veuillez saisir un numéro de téléphone valide",
    invalidSIRET: "Veuillez saisir un numéro SIRET valide (14 chiffres)",
    dateRequired: "Veuillez renseigner la date de début",
    missionLocationRequired: "Veuillez renseigner le lieu de mission",
  },

  // === MESSAGES ===
  messages: {
    success: {
      quoteSent: "Devis envoyé avec succès !",
      redirecting: "Redirection en cours...",
    },
    error: {
      submitError: "Erreur lors de l'envoi du devis",
      genericError: "Une erreur est survenue",
    },
  },

  // === META ===
  meta: {
    pageTitle: "Demande de devis | YOJOB",
    pageDescription: "Demandez un devis pour vos besoins en personnel intérimaire européen.",
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
    title: "Vos besoins en recrutement",
    subtitle: "Décrivez les profils recherchés et leurs conditions.",
    profileLabel: "Profil",
    addProfile: "Ajouter un profil supplémentaire",
    removeProfile: "Supprimer ce profil",
    loadingConfig: "Chargement de la configuration...",
    missingRegionWarning: "⚠️ Veuillez sélectionner votre région à l'étape 1 pour afficher les salaires automatiquement.",
    fields: {
      secteur: {
        label: "Secteur d'activité",
        placeholder: "Sélectionnez un secteur",
      },
      convention: {
        label: "Convention collective",
        placeholder: "Automatique selon le secteur",
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
    summary: {
      title: "Rémunération du salarié",
      salaireBrutMensuel: "Salaire brut mensuel",
      tauxHoraireBrut: "Taux horaire brut",
      baseMensuelle: "(Base 151,67h/mois selon convention collective)",
    },
  },

  // === ÉTAPE 4 : CONDITIONS ===
  step4: {
    title: "Conditions de travail",
    subtitle: "Précisez les conditions d'emploi et les avantages proposés.",
    dateError: "La date de fin doit être postérieure à la date de début",
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
      periodeEssai: {
        label: "Période d'essai",
        placeholder: "Sélectionnez une durée",
        options: {
          '2': '2 jours',
          '3': '3 jours',
          '5': '5 jours',
          '15': '15 jours',
        },
      },
      motifRecours: {
        label: "Motif du recours à l'intérim",
        placeholder: "Sélectionnez un motif",
        options: {
          accroissement: "Accroissement temporaire d'activité",
          remplacement: "Remplacement salarié absent",
          saisonnier: "Travaux saisonniers",
          exportation: "Commande exceptionnelle à l'exportation",
          autre: "Autre (à préciser)",
        },
      },
      delaiPaiement: {
        label: "Délai de paiement souhaité",
        placeholder: "Sélectionnez un délai",
        options: {
          reception: "Paiement à réception",
          j30: "30 jours",
          j45: "45 jours",
          j60: "60 jours",
        },
      },
    },
    hebergement: {
      title: "Hébergement",
      chargeEU: {
        label: "Hébergement pris en charge par l'entreprise utilisatrice",
        helper: "Si NON : supplément horaire de +3,50 €/h sera facturé par l'agence",
      },
      supplementWarning: "⚠️ Un supplément de +3,50 €/h sera appliqué car l'hébergement n'est pas pris en charge",
      commentaire: {
        label: "Précisions sur l'hébergement",
        placeholder: "Type d'hébergement, adresse, conditions particulières...",
      },
    },
    transport: {
      title: "Transport Local",
      chargeETT: {
        label: "Transport local pris en charge par l'agence",
        helper: "Si OUI : supplément horaire de +1,50 €/h sera facturé",
      },
      supplementInfo: "✓ Un supplément de +1,50 €/h sera appliqué pour couvrir les frais de transport local",
    },
    repas: {
      title: "Repas",
      options: {
        restaurant: "Restaurant d'entreprise / Tickets restaurant",
        panier: "Panier repas (facturé au jour)",
        nonConcerne: "Non concerné",
      },
      montantInfo: "📋 Montant du panier repas : {montant} / jour travaillé (facturé séparément)",
      montantNonDefini: "⚠️ Montant non défini pour ce pays/région",
    },
    sections: {
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

  // === SECTEURS & MÉTIERS ===
  secteurs: {
    batiment: {
      label: "Bâtiment",
      convention: "Convention collective nationale des ouvriers du bâtiment (3193)",
      postes: {
        macon: "Maçon",
        coffreur: "Coffreur",
        ferrailleur: "Ferrailleur",
        carreleur: "Carreleur",
        platrier: "Plâtrier",
        peintre: "Peintre",
        plombier: "Plombier",
        electricien: "Électricien",
        couvreur: "Couvreur",
        menuisier: "Menuisier",
        chef_equipe_batiment: "Chef d'équipe",
        chef_chantier: "Chef de chantier",
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
      label: "Métallurgie",
      convention: "Convention collective de la métallurgie (3109)",
      postes: {
        soudeur: "Soudeur",
        chaudronnier: "Chaudronnier",
        tuyauteur: "Tuyauteur",
        tourneur: "Tourneur",
        fraiseur: "Fraiseur",
        usineur: "Usineur",
        mecanicien_industriel: "Mécanicien industriel",
        monteur: "Monteur",
        controleur_qualite: "Contrôleur qualité",
        ajusteur: "Ajusteur",
        chef_equipe_metallurgie: "Chef d'équipe",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
        niveau_5: "Niveau V",
      },
    },
    tp: {
      label: "Travaux Publics",
      convention: "Convention collective nationale des travaux publics (3005)",
      postes: {
        conducteur_engins: "Conducteur d'engins",
        terrassier: "Terrassier",
        canalisateur: "Canalisateur",
        constructeur_routes: "Constructeur de routes",
        coffreur_bancheur: "Coffreur bancheur",
        macon_vrd: "Maçon VRD",
        chef_equipe_tp: "Chef d'équipe TP",
        manoeuvre_tp: "Manœuvre TP",
      },
      classifications: {
        n1: "N1",
        n2: "N2",
        n3: "N3",
        n4: "N4",
      },
    },
    hotellerie: {
      label: "Hôtellerie",
      convention: "Convention collective de l'hôtellerie-restauration (3292)",
      postes: {
        receptionniste: "Réceptionniste",
        femme_chambre: "Femme de chambre",
        agent_entretien: "Agent d'entretien",
        bagagiste: "Bagagiste",
        concierge: "Concierge",
        night_audit: "Night audit",
        gouvernante: "Gouvernante",
        chef_reception: "Chef de réception",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
        niveau_5: "Niveau V",
      },
    },
    restauration: {
      label: "Restauration",
      convention: "Convention collective de l'hôtellerie-restauration (3292)",
      postes: {
        cuisinier: "Cuisinier",
        commis_cuisine: "Commis de cuisine",
        chef_partie: "Chef de partie",
        serveur: "Serveur",
        barman: "Barman",
        plongeur: "Plongeur",
        chef_rang: "Chef de rang",
        maitre_hotel: "Maître d'hôtel",
        second_cuisine: "Second de cuisine",
        chef_cuisine: "Chef de cuisine",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
        niveau_5: "Niveau V",
      },
    },
    plasturgie: {
      label: "Plasturgie",
      convention: "Convention collective de la plasturgie (0292)",
      postes: {
        operateur_injection: "Opérateur injection",
        operateur_extrusion: "Opérateur extrusion",
        regleur: "Régleur",
        operateur_thermoformage: "Opérateur thermoformage",
        controleur_qualite_plasturgie: "Contrôleur qualité",
        technicien_maintenance: "Technicien maintenance",
        chef_equipe_plasturgie: "Chef d'équipe",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    automobile_carrosserie: {
      label: "Automobile & Carrosserie",
      convention: "Convention collective de la réparation automobile (1090)",
      postes: {
        carrossier: "Carrossier",
        peintre_automobile: "Peintre automobile",
        mecanicien_auto: "Mécanicien auto",
        electricien_auto: "Électricien auto",
        chef_atelier: "Chef d'atelier",
        controleur_technique: "Contrôleur technique",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    sylviculture: {
      label: "Sylviculture",
      convention: "Convention collective de l'agriculture (7501)",
      postes: {
        bucheron: "Bûcheron",
        elagueur: "Élagueur",
        conducteur_engins_forestiers: "Conducteur d'engins forestiers",
        chef_equipe_sylviculture: "Chef d'équipe sylviculture",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    cartonnerie: {
      label: "Cartonnerie",
      convention: "Convention collective de l'industrie de la transformation (3107)",
      postes: {
        operateur_production: "Opérateur de production",
        conducteur_ligne: "Conducteur de ligne",
        regleur_cartonnerie: "Régleur",
        chef_equipe_cartonnerie: "Chef d'équipe",
      },
      classifications: {
        niveau_1: "Niveau I",
        niveau_2: "Niveau II",
        niveau_3: "Niveau III",
        niveau_4: "Niveau IV",
      },
    },
    autre: {
      label: "Autre",
      convention: "À définir selon activité",
      postes: {
        autre_poste: "Autre poste (à préciser)",
      },
      classifications: {
        a_definir: "À définir",
      },
    },
  },
};