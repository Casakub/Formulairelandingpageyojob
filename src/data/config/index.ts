// Configuration centralisée pour le système de devis YOJOB
// Ce fichier remplace les imports JSON qui ne sont pas supportés
// Mise à jour: 2026-01-27 avec données officielles code.travail.gouv.fr

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
      { code: "SI", label: "Slovénie", flag: "🇸🇮", actif: true, ordre: 10 },
      { code: "FR", label: "France", flag: "🇫🇷", actif: true, ordre: 11 },
      { code: "DE", label: "Allemagne", flag: "🇩🇪", actif: true, ordre: 12 },
      { code: "AT", label: "Autriche", flag: "🇦🇹", actif: true, ordre: 13 },
      { code: "BE", label: "Belgique", flag: "🇧🇪", actif: true, ordre: 14 },
      { code: "CY", label: "Chypre", flag: "🇨🇾", actif: true, ordre: 15 },
      { code: "DK", label: "Danemark", flag: "🇩🇰", actif: true, ordre: 16 },
      { code: "EE", label: "Estonie", flag: "🇪🇪", actif: true, ordre: 17 },
      { code: "FI", label: "Finlande", flag: "🇫🇮", actif: true, ordre: 18 },
      { code: "GR", label: "Grèce", flag: "🇬🇷", actif: true, ordre: 19 },
      { code: "IE", label: "Irlande", flag: "🇮🇪", actif: true, ordre: 20 },
      { code: "IT", label: "Italie", flag: "🇮🇹", actif: true, ordre: 21 },
      { code: "LV", label: "Lettonie", flag: "🇱🇻", actif: true, ordre: 22 },
      { code: "LT", label: "Lituanie", flag: "🇱🇹", actif: true, ordre: 23 },
      { code: "LU", label: "Luxembourg", flag: "🇱🇺", actif: true, ordre: 24 },
      { code: "MT", label: "Malte", flag: "🇲🇹", actif: true, ordre: 25 },
      { code: "NL", label: "Pays-Bas", flag: "🇳🇱", actif: true, ordre: 26 },
      { code: "SE", label: "Suède", flag: "🇸🇪", actif: true, ordre: 27 },
      { code: "NO", label: "Norvège", flag: "🇳🇴", actif: true, ordre: 28 },
      { code: "CH", label: "Suisse", flag: "🇨🇭", actif: true, ordre: 29 },
      { code: "GB", label: "Royaume-Uni", flag: "🇬🇧", actif: true, ordre: 30 }
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
      "PT": { code: "PT", label: "Portugal", facteur: 1.07, description: "Majoration pour pays d'Europe du Sud (révisé Jan 2026)" },
      "ES": { code: "ES", label: "Espagne", facteur: 1.06, description: "Majoration standard pour pays d'Europe du Sud" },
      "BG": { code: "BG", label: "Bulgarie", facteur: 1.00, description: "Coefficient de référence (révisé Jan 2026)" },
      "HU": { code: "HU", label: "Hongrie", facteur: 1.01, description: "Coefficient proche de la référence" },
      "SK": { code: "SK", label: "Slovaquie", facteur: 1.00, description: "Coefficient de référence" },
      "CZ": { code: "CZ", label: "Tchéquie", facteur: 1.03, description: "Légère majoration liée aux coûts de détachement" },
      "HR": { code: "HR", label: "Croatie", facteur: 1.01, description: "Coefficient proche de la référence" },
      "SI": { code: "SI", label: "Slovénie", facteur: 1.04, description: "Majoration liée aux coûts de détachement" },
      "FR": { code: "FR", label: "France", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "DE": { code: "DE", label: "Allemagne", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "AT": { code: "AT", label: "Autriche", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "BE": { code: "BE", label: "Belgique", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "CY": { code: "CY", label: "Chypre", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "DK": { code: "DK", label: "Danemark", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "EE": { code: "EE", label: "Estonie", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "FI": { code: "FI", label: "Finlande", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "GR": { code: "GR", label: "Grèce", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "IE": { code: "IE", label: "Irlande", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "IT": { code: "IT", label: "Italie", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "LV": { code: "LV", label: "Lettonie", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "LT": { code: "LT", label: "Lituanie", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "LU": { code: "LU", label: "Luxembourg", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "MT": { code: "MT", label: "Malte", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "NL": { code: "NL", label: "Pays-Bas", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "SE": { code: "SE", label: "Suède", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "NO": { code: "NO", label: "Norvège", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "CH": { code: "CH", label: "Suisse", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" },
      "GB": { code: "GB", label: "Royaume-Uni", facteur: 1.00, description: "Coefficient provisoire (à ajuster)" }
    }
  },

  salaires: {
    salaires: {
      "ÎLE-DE-FRANCE": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1835, "N2P1": 1876, "N2P2": 1876, "N3P1": 2011, "N3P2": 2133, "N4P1": 2260, "N4P2": 2475 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1920, "N2": 2012, "N3": 2347, "N4": 2802 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2100, "Niveau IV": 2400, "Niveau V": 2700 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2100, "Niveau IV": 2400, "Niveau V": 2800 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1950, "Niveau III": 2200, "Niveau IV": 2600 },
        "Sylviculture": { "Niveau I": 1850, "Niveau II": 2000, "Niveau III": 2300, "Niveau IV": 2700 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1950, "Niveau III": 2200, "Niveau IV": 2500 },
        "Autre": { "À définir": 1823 }
      },
      "PROVENCE-ALPES-CÔTE D'AZUR": {
        "Bâtiment": { "N1P1": 1838, "N1P2": 1868, "N2P1": 1975, "N2P2": 1975, "N3P1": 2171, "N3P2": 2341, "N4P1": 2510, "N4P2": 2680 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1894, "N2": 2033, "N3": 2400, "N4": 2798 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2050, "Niveau IV": 2350, "Niveau V": 2650 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2050, "Niveau IV": 2350, "Niveau V": 2750 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1950, "Niveau III": 2250, "Niveau IV": 2650 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2450 },
        "Autre": { "À définir": 1823 }
      },
      "AUVERGNE-RHÔNE-ALPES": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1823, "N2P1": 1865, "N2P2": 1865, "N3P1": 2060, "N3P2": 2235, "N4P1": 2404, "N4P2": 2549 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1924, "N2": 2052, "N3": 2366, "N4": 2771 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1800, "Niveau III": 2000, "Niveau IV": 2300, "Niveau V": 2600 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1800, "Niveau III": 2000, "Niveau IV": 2300, "Niveau V": 2700 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2500 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2200, "Niveau IV": 2600 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "BOURGOGNE-FRANCHE-COMTÉ": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1840, "N2P1": 1874, "N2P2": 1874, "N3P1": 2051, "N3P2": 2193, "N4P1": 2335, "N4P2": 2477 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1900, "N2": 2000, "N3": 2300, "N4": 2700 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "BRETAGNE": {
        "Bâtiment": { "N1P1": 1845, "N1P2": 1850, "N2P1": 1899, "N2P2": 1899, "N3P1": 2044, "N3P2": 2213, "N4P1": 2381, "N4P2": 2549 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1936, "N2": 1997, "N3": 2354, "N4": 2801 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "CENTRE-VAL DE LOIRE": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1831, "N2P1": 1880, "N2P2": 1884, "N3P1": 2027, "N3P2": 2144, "N4P1": 2261, "N4P2": 2378 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1823, "N2": 1888, "N3": 2092, "N4": 2391 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "CORSE": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1823, "N2P1": 1884, "N2P2": 1884, "N3P1": 2101, "N3P2": 2275, "N4P1": 2449, "N4P2": 2622 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1823, "N2": 1823, "N3": 1900, "N4": 2119 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2050, "Niveau IV": 2300, "Niveau V": 2600 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2050, "Niveau IV": 2300, "Niveau V": 2700 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2500 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2200, "Niveau IV": 2600 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "GRAND EST": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1865, "N2P1": 1897, "N2P2": 1897, "N3P1": 2102, "N3P2": 2238, "N4P1": 2395, "N4P2": 2578 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1916, "N2": 2002, "N3": 2336, "N4": 2758 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "HAUTS-DE-FRANCE": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1833, "N2P1": 1930, "N2P2": 1930, "N3P1": 2084, "N3P2": 2240, "N4P1": 2437, "N4P2": 2616 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1900, "N2": 2000, "N3": 2300, "N4": 2700 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "NORMANDIE": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1824, "N2P1": 1862, "N2P2": 1862, "N3P1": 2041, "N3P2": 2185, "N4P1": 2352, "N4P2": 2497 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1932, "N2": 2033, "N3": 2400, "N4": 2852 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "NOUVELLE-AQUITAINE": {
        "Bâtiment": { "N1P1": 1838, "N1P2": 1863, "N2P1": 1913, "N2P2": 1913, "N3P1": 2073, "N3P2": 2230, "N4P1": 2399, "N4P2": 2560 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1880, "N2": 1962, "N3": 2341, "N4": 2759 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "OCCITANIE": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1823, "N2P1": 1867, "N2P2": 1867, "N3P1": 2046, "N3P2": 2207, "N4P1": 2336, "N4P2": 2500 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1873, "N2": 1990, "N3": 2354, "N4": 2744 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2300, "Niveau V": 2600 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2300, "Niveau V": 2700 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2500 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2200, "Niveau IV": 2600 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      },
      "PAYS DE LA LOIRE": {
        "Bâtiment": { "N1P1": 1823, "N1P2": 1823, "N2P1": 1828, "N2P2": 1828, "N3P1": 2023, "N3P2": 2201, "N4P1": 2378, "N4P2": 2554 },
        "Métallurgie": { "Niveau I": 1823, "Niveau II": 1910, "Niveau III": 2075, "Niveau IV": 2285, "Niveau V": 2675 },
        "TP": { "N1": 1909, "N2": 2008, "N3": 2377, "N4": 2809 },
        "Hôtellerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2550 },
        "Restauration": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2000, "Niveau IV": 2250, "Niveau V": 2650 },
        "Plasturgie": { "Niveau I": 1823, "Niveau II": 1861, "Niveau III": 2029, "Niveau IV": 2404 },
        "Automobile Carrosserie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2450 },
        "Sylviculture": { "Niveau I": 1823, "Niveau II": 1900, "Niveau III": 2150, "Niveau IV": 2550 },
        "Cartonnerie": { "Niveau I": 1823, "Niveau II": 1850, "Niveau III": 2100, "Niveau IV": 2400 },
        "Autre": { "À définir": 1823 }
      }
    },
    base_horaire_standard: 151.67
  },

  supplements: {
    supplements_horaires: {
      hebergement: { montant: 3.50, unite: "€/h", description: "Supplément horaire pour hébergement pris en charge par l'ETT" },
      transport: { montant: 1.50, unite: "€/h", description: "Supplément horaire pour transport local pris en charge par l'ETT" }
    },
    paniers_repas: {
      "ÎLE-DE-FRANCE": {
        "Bâtiment": 12.50,
        "Métallurgie": 5.94,
        "TP": 12.50,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "PROVENCE-ALPES-CÔTE D'AZUR": {
        "Bâtiment": 11.50,
        "Métallurgie": 5.94,
        "TP": 11.50,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "AUVERGNE-RHÔNE-ALPES": {
        "Bâtiment": 10.50,
        "Métallurgie": 5.94,
        "TP": 10.50,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "BOURGOGNE-FRANCHE-COMTÉ": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "BRETAGNE": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "CENTRE-VAL DE LOIRE": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "CORSE": {
        "Bâtiment": 10.50,
        "Métallurgie": 5.94,
        "TP": 10.50,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "GRAND EST": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "HAUTS-DE-FRANCE": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "NORMANDIE": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "NOUVELLE-AQUITAINE": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "OCCITANIE": {
        "Bâtiment": 10.50,
        "Métallurgie": 5.94,
        "TP": 10.50,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      },
      "PAYS DE LA LOIRE": {
        "Bâtiment": 10.00,
        "Métallurgie": 5.94,
        "TP": 10.00,
        "Hôtellerie": 5.94,
        "Restauration": 5.94,
        "Plasturgie": 5.94,
        "Automobile Carrosserie": 5.94,
        "Sylviculture": 9.00,
        "Cartonnerie": 5.94,
        "Autre": 8.00
      }
    }
  }
};
