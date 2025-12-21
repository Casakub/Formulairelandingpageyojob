// Configuration centralisée pour le système de devis YOJOB
// Ce fichier remplace les imports JSON qui ne sont pas supportés

export const configData = {
  pays: {
    pays: [
      { code: "RO", label: "Roumanie", flag: "🇷🇴", actif: true, ordre: 1 },
      { code: "PL", label: "Pologne", flag: "🇵🇱", actif: true, ordre: 2 },
      { code: "PT", label: "Portugal", flag: "🇵🇹", actif: true, ordre: 3 },
      { code: "ES", label: "Espagne", flag: "🇪🇸", actif: true, ordre: 4 },
      { code: "BG", label: "Bulgarie", flag: "🇧🇬", actif: true, ordre: 5 },
      { code: "HU", label: "Hongrie", flag: "🇭🇺", actif: true, ordre: 6 },
      { code: "SK", label: "Slovaquie", flag: "🇸🇰", actif: true, ordre: 7 },
      { code: "CZ", label: "Tchéquie", flag: "🇨🇿", actif: true, ordre: 8 },
      { code: "HR", label: "Croatie", flag: "🇭🇷", actif: true, ordre: 9 },
      { code: "SI", label: "Slovénie", flag: "🇸🇮", actif: true, ordre: 10 }
    ]
  },
  
  coefficients: {
    coefficients: {
      "Bâtiment": {
        "Ouvrier Exécution": 1.92,
        "Ouvrier Professionnel": 1.94,
        "Compagnon Professionnel": 1.96,
        "Maître Ouvrier": 1.98,
        "Chef Equipe": 2.05
      },
      "Métallurgie": {
        "Groupe A - Classe 1": 1.92,
        "Groupe A - Classe 2": 1.93,
        "Groupe B - Classe 3": 1.94,
        "Groupe B - Classe 4": 1.95,
        "Groupe C - Classe 5": 1.96,
        "Groupe C - Classe 6": 1.97,
        "Groupe D - Classe 7": 1.98,
        "Groupe D - Classe 8": 1.99,
        "Groupe E - Classe 9": 2.00,
        "Groupe E - Classe 10": 2.01
      },
      "TP": {
        "Manoeuvre": 1.92,
        "Manoeuvre spécialisé": 1.94,
        "Ouvrier professionnel": 1.96,
        "Ouvrier professionnel confirmé": 1.98,
        "Compagnon": 2.00,
        "Chef d'équipe": 2.02
      },
      "Hôtellerie": {
        "Employé débutant": 1.92,
        "Employé qualifié": 1.94,
        "Employé hautement qualifié": 1.96,
        "Agent de maîtrise": 1.98
      },
      "Restauration": {
        "Employé débutant": 1.92,
        "Employé qualifié": 1.94,
        "Employé hautement qualifié": 1.96,
        "Agent de maîtrise": 1.98
      },
      "Plasturgie": {
        "Ouvrier débutant": 1.92,
        "Ouvrier qualifié": 2.00,
        "Ouvrier hautement qualifié": 2.08
      },
      "Automobile Carrosserie": {
        "Ouvriers - Échelon 1": 1.92,
        "Ouvriers - Échelon 2": 1.93,
        "Ouvriers - Échelon 3": 1.94,
        "Ouvriers - Échelon 4": 1.95,
        "Ouvriers - Échelon 5": 1.96,
        "Ouvriers - Échelon 6": 1.97,
        "Ouvriers - Échelon 7": 1.98,
        "Ouvriers - Échelon 8": 1.99,
        "Ouvriers - Échelon 9": 2.00,
        "Ouvriers - Échelon 10": 2.01,
        "Ouvriers - Échelon 11": 2.02,
        "Ouvriers - Échelon 12": 2.03
      },
      "Sylviculture": {
        "Ouvrier - Niveau I": 1.92,
        "Ouvrier - Niveau II": 1.94
      },
      "Cartonnerie": {
        "Coefficient 180": 1.90,
        "Coefficient 190": 1.92,
        "Coefficient 195": 1.93,
        "Coefficient 200": 1.94,
        "Coefficient 210": 1.96,
        "Coefficient 220": 1.98,
        "Coefficient 240": 2.00,
        "Coefficient 260": 2.02,
        "Coefficient 275": 2.04,
        "Coefficient 290": 2.06,
        "Coefficient 315": 2.08,
        "Coefficient 350": 2.10
      },
      "Autre": {
        "Non défini": 1.92
      }
    },
    mapping_anciennes_classifications: {
      "Bâtiment": {
        "N1P1": "Ouvrier Exécution",
        "N1P2": "Ouvrier Professionnel",
        "N2P1": "Compagnon Professionnel",
        "N2P2": "Compagnon Professionnel",
        "N3P1": "Maître Ouvrier",
        "N3P2": "Maître Ouvrier",
        "N4P1": "Chef Equipe",
        "N4P2": "Chef Equipe"
      },
      "Métallurgie": {
        "Niveau I": "Groupe A - Classe 1",
        "Niveau II": "Groupe B - Classe 3",
        "Niveau III": "Groupe C - Classe 5",
        "Niveau IV": "Groupe D - Classe 7",
        "Niveau V": "Groupe E - Classe 9"
      },
      "TP": {
        "N1": "Manoeuvre",
        "N2": "Manoeuvre spécialisé",
        "N3": "Ouvrier professionnel",
        "N4": "Compagnon"
      },
      "Hôtellerie": {
        "Niveau I": "Employé débutant",
        "Niveau II": "Employé qualifié",
        "Niveau III": "Employé hautement qualifié",
        "Niveau IV": "Agent de maîtrise",
        "Niveau V": "Agent de maîtrise"
      },
      "Restauration": {
        "Niveau I": "Employé débutant",
        "Niveau II": "Employé qualifié",
        "Niveau III": "Employé hautement qualifié",
        "Niveau IV": "Agent de maîtrise",
        "Niveau V": "Agent de maîtrise"
      },
      "Plasturgie": {
        "Niveau I": "Ouvrier débutant",
        "Niveau II": "Ouvrier qualifié",
        "Niveau III": "Ouvrier hautement qualifié",
        "Niveau IV": "Ouvrier hautement qualifié"
      },
      "Automobile Carrosserie": {
        "Niveau I": "Ouvriers - Échelon 1",
        "Niveau II": "Ouvriers - Échelon 4",
        "Niveau III": "Ouvriers - Échelon 7",
        "Niveau IV": "Ouvriers - Échelon 10"
      },
      "Sylviculture": {
        "Niveau I": "Ouvrier - Niveau I",
        "Niveau II": "Ouvrier - Niveau II",
        "Niveau III": "Ouvrier - Niveau II",
        "Niveau IV": "Ouvrier - Niveau II"
      },
      "Cartonnerie": {
        "Niveau I": "Coefficient 180",
        "Niveau II": "Coefficient 210",
        "Niveau III": "Coefficient 260",
        "Niveau IV": "Coefficient 315"
      }
    }
  },
  
  facteurs: {
    facteurs: {
      "RO": { code: "RO", label: "Roumanie", facteur: 1.00, description: "Coefficient de référence" },
      "PL": { code: "PL", label: "Pologne", facteur: 1.02, description: "Légère majoration liée aux coûts de détachement" },
      "PT": { code: "PT", label: "Portugal", facteur: 1.05, description: "Majoration standard pour pays d'Europe du Sud" },
      "ES": { code: "ES", label: "Espagne", facteur: 1.06, description: "Majoration standard pour pays d'Europe du Sud" },
      "BG": { code: "BG", label: "Bulgarie", facteur: 0.98, description: "Légère réduction liée aux coûts de détachement" },
      "HU": { code: "HU", label: "Hongrie", facteur: 1.01, description: "Coefficient proche de la référence" },
      "SK": { code: "SK", label: "Slovaquie", facteur: 1.00, description: "Coefficient de référence" },
      "CZ": { code: "CZ", label: "Tchéquie", facteur: 1.03, description: "Légère majoration liée aux coûts de détachement" },
      "HR": { code: "HR", label: "Croatie", facteur: 1.01, description: "Coefficient proche de la référence" },
      "SI": { code: "SI", label: "Slovénie", facteur: 1.04, description: "Majoration liée aux coûts de détachement" }
    }
  },
  
  salaires: {
    salaires: {
      "ÎLE-DE-FRANCE": {
        "Bâtiment": { "N1P1": 1850, "N1P2": 1920, "N2P1": 2050, "N2P2": 2180, "N3P1": 2400, "N3P2": 2600, "N4P1": 2900, "N4P2": 3200 },
        "Métallurgie": { "Niveau I": 1800, "Niveau II": 1950, "Niveau III": 2200, "Niveau IV": 2500, "Niveau V": 2800 },
        "TP": { "N1": 1850, "N2": 2000, "N3": 2300, "N4": 2700 },
        "Hôtellerie": { "Niveau I": 1750, "Niveau II": 1900, "Niveau III": 2100, "Niveau IV": 2400, "Niveau V": 2700 },
        "Restauration": { "Niveau I": 1750, "Niveau II": 1900, "Niveau III": 2100, "Niveau IV": 2400, "Niveau V": 2800 },
        "Plasturgie": { "Niveau I": 1800, "Niveau II": 1950, "Niveau III": 2200, "Niveau IV": 2500 },
        "Automobile Carrosserie": { "Niveau I": 1800, "Niveau II": 1950, "Niveau III": 2200, "Niveau IV": 2600 },
        "Sylviculture": { "Niveau I": 1850, "Niveau II": 2000, "Niveau III": 2300, "Niveau IV": 2700 },
        "Cartonnerie": { "Niveau I": 1800, "Niveau II": 1950, "Niveau III": 2200, "Niveau IV": 2500 },
        "Autre": { "À définir": 1800 }
      },
      "AUVERGNE-RHÔNE-ALPES": {
        "Bâtiment": { "N1P1": 1800, "N1P2": 1870, "N2P1": 2000, "N2P2": 2130, "N3P1": 2350, "N3P2": 2550, "N4P1": 2850, "N4P2": 3150 },
        "Métallurgie": { "Niveau I": 1750, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2450, "Niveau V": 2750 },
        "TP": { "N1": 1800, "N2": 1950, "N3": 2250, "N4": 2650 },
        "Hôtellerie": { "Niveau I": 1700, "Niveau II": 1850, "Niveau III": 2050, "Niveau IV": 2350, "Niveau V": 2650 },
        "Restauration": { "Niveau I": 1700, "Niveau II": 1850, "Niveau III": 2050, "Niveau IV": 2350, "Niveau V": 2750 },
        "Plasturgie": { "Niveau I": 1750, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2450 },
        "Automobile Carrosserie": { "Niveau I": 1750, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Sylviculture": { "Niveau I": 1800, "Niveau II": 1950, "Niveau III": 2250, "Niveau IV": 2650 },
        "Cartonnerie": { "Niveau I": 1750, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2450 },
        "Autre": { "À définir": 1750 }
      }
    }
  },
  
  supplements: {
    supplements_horaires: {
      hebergement: { montant: 3.50, unite: "€/h", description: "Supplément horaire pour hébergement pris en charge par l'ETT" },
      transport: { montant: 1.50, unite: "€/h", description: "Supplément horaire pour transport local pris en charge par l'ETT" }
    },
    paniers_repas: {
      "ÎLE-DE-FRANCE": {
        "Bâtiment": 10.50,
        "Métallurgie": 10.00,
        "TP": 10.50,
        "Hôtellerie": 9.50,
        "Restauration": 9.50,
        "Plasturgie": 10.00,
        "Automobile Carrosserie": 10.00,
        "Sylviculture": 10.00,
        "Cartonnerie": 10.00,
        "Autre": 10.00
      },
      "AUVERGNE-RHÔNE-ALPES": {
        "Bâtiment": 10.00,
        "Métallurgie": 9.50,
        "TP": 10.00,
        "Hôtellerie": 9.00,
        "Restauration": 9.00,
        "Plasturgie": 9.50,
        "Automobile Carrosserie": 9.50,
        "Sylviculture": 9.50,
        "Cartonnerie": 9.50,
        "Autre": 9.50
      }
    }
  }
};
