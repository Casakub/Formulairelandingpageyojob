// 🌍 DONNÉES DE TARIFICATION MULTI-PAYS POUR YOJOB
// Salaires, coefficients ETT, et avantages sociaux par pays européen
//
// ⚠️ MISE À JOUR JANVIER 2026 - Données officielles code.travail.gouv.fr
// Source: https://code.travail.gouv.fr/contribution/

import { SECTEURS, REGIONS } from './devis-data';

// ==========================================
// 💶 SALAIRES MINIMAUX PAR PAYS
// ==========================================

/**
 * Structure des salaires par pays :
 * - France : Détaillé par région (13 régions) - DONNÉES OFFICIELLES 2026
 * - Autres pays : Salaire moyen national par secteur/classification
 *
 * Base : 151.67h/mois (35h/semaine)
 * Montants en euros brut mensuel
 */

// 🇫🇷 FRANCE - Salaires par région (DONNÉES OFFICIELLES JANVIER 2026)
// Source IDCC: 1596/1597 (Bâtiment), 1702 (TP), 3248 (Métallurgie), 292 (Plasturgie)
const SALAIRES_FRANCE: Record<string, Record<string, Record<string, number>>> = {
  'ÎLE-DE-FRANCE': {
    // IDCC 1596/1597 - Bâtiment Ouvriers
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1835, 'N2P1': 1876, 'N2P2': 1876,
      'N3P1': 2011, 'N3P2': 2133, 'N4P1': 2260, 'N4P2': 2475
    },
    // IDCC 3248 - Métallurgie (national, appliqué à toutes les régions)
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    // IDCC 1702 - Travaux Publics Ouvriers
    'TP': { 'N1': 1920, 'N2': 2012, 'N3': 2347, 'N4': 2802 },
    // HCR - Données existantes conservées (pas de données mensuelles dans le CSV)
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2100,
      'Niveau IV': 2400, 'Niveau V': 2700
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2100,
      'Niveau IV': 2400, 'Niveau V': 2800
    },
    // IDCC 292 - Plasturgie (national, appliqué à toutes les régions)
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    // IDCC 1090 - Services Automobile (données partielles, ajustées)
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1950, 'Niveau III': 2200, 'Niveau IV': 2600
    },
    // Données existantes conservées (pas de données officielles)
    'Sylviculture': {
      'Niveau I': 1850, 'Niveau II': 2000, 'Niveau III': 2300, 'Niveau IV': 2700
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1950, 'Niveau III': 2200, 'Niveau IV': 2500
    }
  },

  'PROVENCE-ALPES-CÔTE D\'AZUR': {
    'Bâtiment': {
      'N1P1': 1838, 'N1P2': 1868, 'N2P1': 1975, 'N2P2': 1975,
      'N3P1': 2171, 'N3P2': 2341, 'N4P1': 2510, 'N4P2': 2680
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1894, 'N2': 2033, 'N3': 2400, 'N4': 2798 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2050,
      'Niveau IV': 2350, 'Niveau V': 2650
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2050,
      'Niveau IV': 2350, 'Niveau V': 2750
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1950, 'Niveau III': 2250, 'Niveau IV': 2650
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2450
    }
  },

  'AUVERGNE-RHÔNE-ALPES': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1823, 'N2P1': 1865, 'N2P2': 1865,
      'N3P1': 2060, 'N3P2': 2235, 'N4P1': 2404, 'N4P2': 2549
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1924, 'N2': 2052, 'N3': 2366, 'N4': 2771 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1800, 'Niveau III': 2000,
      'Niveau IV': 2300, 'Niveau V': 2600
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1800, 'Niveau III': 2000,
      'Niveau IV': 2300, 'Niveau V': 2700
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2500
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2200, 'Niveau IV': 2600
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'BOURGOGNE-FRANCHE-COMTÉ': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1840, 'N2P1': 1874, 'N2P2': 1874,
      'N3P1': 2051, 'N3P2': 2193, 'N4P1': 2335, 'N4P2': 2477
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    // TP: Fallback sur moyenne nationale (pas de données régionales)
    'TP': { 'N1': 1900, 'N2': 2000, 'N3': 2300, 'N4': 2700 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'BRETAGNE': {
    'Bâtiment': {
      'N1P1': 1845, 'N1P2': 1850, 'N2P1': 1899, 'N2P2': 1899,
      'N3P1': 2044, 'N3P2': 2213, 'N4P1': 2381, 'N4P2': 2549
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1936, 'N2': 1997, 'N3': 2354, 'N4': 2801 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'CENTRE-VAL DE LOIRE': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1831, 'N2P1': 1880, 'N2P2': 1884,
      'N3P1': 2027, 'N3P2': 2144, 'N4P1': 2261, 'N4P2': 2378
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1823, 'N2': 1888, 'N3': 2092, 'N4': 2391 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'CORSE': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1823, 'N2P1': 1884, 'N2P2': 1884,
      'N3P1': 2101, 'N3P2': 2275, 'N4P1': 2449, 'N4P2': 2622
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    // TP Corse: Données très basses dans CSV, ajustées avec minimum légal
    'TP': { 'N1': 1823, 'N2': 1823, 'N3': 1900, 'N4': 2119 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2050,
      'Niveau IV': 2300, 'Niveau V': 2600
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2050,
      'Niveau IV': 2300, 'Niveau V': 2700
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2500
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2200, 'Niveau IV': 2600
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'GRAND EST': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1865, 'N2P1': 1897, 'N2P2': 1897,
      'N3P1': 2102, 'N3P2': 2238, 'N4P1': 2395, 'N4P2': 2578
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1916, 'N2': 2002, 'N3': 2336, 'N4': 2758 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'HAUTS-DE-FRANCE': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1833, 'N2P1': 1930, 'N2P2': 1930,
      'N3P1': 2084, 'N3P2': 2240, 'N4P1': 2437, 'N4P2': 2616
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    // TP: Fallback sur moyenne nationale (pas de données régionales)
    'TP': { 'N1': 1900, 'N2': 2000, 'N3': 2300, 'N4': 2700 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'NORMANDIE': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1824, 'N2P1': 1862, 'N2P2': 1862,
      'N3P1': 2041, 'N3P2': 2185, 'N4P1': 2352, 'N4P2': 2497
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1932, 'N2': 2033, 'N3': 2400, 'N4': 2852 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'NOUVELLE-AQUITAINE': {
    'Bâtiment': {
      'N1P1': 1838, 'N1P2': 1863, 'N2P1': 1913, 'N2P2': 1913,
      'N3P1': 2073, 'N3P2': 2230, 'N4P1': 2399, 'N4P2': 2560
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1880, 'N2': 1962, 'N3': 2341, 'N4': 2759 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'OCCITANIE': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1823, 'N2P1': 1867, 'N2P2': 1867,
      'N3P1': 2046, 'N3P2': 2207, 'N4P1': 2336, 'N4P2': 2500
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1873, 'N2': 1990, 'N3': 2354, 'N4': 2744 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2300, 'Niveau V': 2600
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2300, 'Niveau V': 2700
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2500
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2200, 'Niveau IV': 2600
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  },

  'PAYS DE LA LOIRE': {
    'Bâtiment': {
      'N1P1': 1823, 'N1P2': 1823, 'N2P1': 1828, 'N2P2': 1828,
      'N3P1': 2023, 'N3P2': 2201, 'N4P1': 2378, 'N4P2': 2554
    },
    'Métallurgie': {
      'Niveau I': 1823, 'Niveau II': 1910, 'Niveau III': 2075,
      'Niveau IV': 2285, 'Niveau V': 2675
    },
    'TP': { 'N1': 1909, 'N2': 2008, 'N3': 2377, 'N4': 2809 },
    'Hôtellerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2550
    },
    'Restauration': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2000,
      'Niveau IV': 2250, 'Niveau V': 2650
    },
    'Plasturgie': {
      'Niveau I': 1823, 'Niveau II': 1861, 'Niveau III': 2029, 'Niveau IV': 2404
    },
    'Automobile Carrosserie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2450
    },
    'Sylviculture': {
      'Niveau I': 1823, 'Niveau II': 1900, 'Niveau III': 2150, 'Niveau IV': 2550
    },
    'Cartonnerie': {
      'Niveau I': 1823, 'Niveau II': 1850, 'Niveau III': 2100, 'Niveau IV': 2400
    }
  }
};

// 🇩🇪 ALLEMAGNE - Salaires nationaux (plus élevés que France)
const SALAIRES_ALLEMAGNE: Record<string, Record<string, number>> = {
  'Bâtiment': {
    'N1P1': 2100, 'N1P2': 2200, 'N2P1': 2400, 'N2P2': 2600,
    'N3P1': 2900, 'N3P2': 3200, 'N4P1': 3600, 'N4P2': 4000
  },
  'Métallurgie': {
    'Niveau I': 2000, 'Niveau II': 2300, 'Niveau III': 2700,
    'Niveau IV': 3100, 'Niveau V': 3500
  },
  'TP': { 'N1': 2100, 'N2': 2400, 'N3': 2800, 'N4': 3300 },
  'Hôtellerie': {
    'Niveau I': 1900, 'Niveau II': 2100, 'Niveau III': 2400,
    'Niveau IV': 2800, 'Niveau V': 3200
  },
  'Restauration': {
    'Niveau I': 1900, 'Niveau II': 2100, 'Niveau III': 2400,
    'Niveau IV': 2800, 'Niveau V': 3300
  },
  'Plasturgie': {
    'Niveau I': 2000, 'Niveau II': 2300, 'Niveau III': 2700, 'Niveau IV': 3100
  },
  'Automobile Carrosserie': {
    'Niveau I': 2000, 'Niveau II': 2300, 'Niveau III': 2700, 'Niveau IV': 3200
  },
  'Sylviculture': {
    'Niveau I': 2100, 'Niveau II': 2400, 'Niveau III': 2800, 'Niveau IV': 3300
  },
  'Cartonnerie': {
    'Niveau I': 2000, 'Niveau II': 2300, 'Niveau III': 2700, 'Niveau IV': 3100
  }
};

// 🇷🇴 ROUMANIE - Salaires plus bas (gros fournisseur de main d'œuvre)
const SALAIRES_ROUMANIE: Record<string, Record<string, number>> = {
  'Bâtiment': {
    'N1P1': 900, 'N1P2': 950, 'N2P1': 1050, 'N2P2': 1150,
    'N3P1': 1300, 'N3P2': 1450, 'N4P1': 1650, 'N4P2': 1850
  },
  'Métallurgie': {
    'Niveau I': 850, 'Niveau II': 1000, 'Niveau III': 1200,
    'Niveau IV': 1400, 'Niveau V': 1600
  },
  'TP': { 'N1': 900, 'N2': 1050, 'N3': 1250, 'N4': 1500 },
  'Hôtellerie': {
    'Niveau I': 800, 'Niveau II': 950, 'Niveau III': 1100,
    'Niveau IV': 1300, 'Niveau V': 1500
  },
  'Restauration': {
    'Niveau I': 800, 'Niveau II': 950, 'Niveau III': 1100,
    'Niveau IV': 1300, 'Niveau V': 1550
  },
  'Plasturgie': {
    'Niveau I': 850, 'Niveau II': 1000, 'Niveau III': 1200, 'Niveau IV': 1400
  },
  'Automobile Carrosserie': {
    'Niveau I': 850, 'Niveau II': 1000, 'Niveau III': 1200, 'Niveau IV': 1450
  },
  'Sylviculture': {
    'Niveau I': 900, 'Niveau II': 1050, 'Niveau III': 1250, 'Niveau IV': 1500
  },
  'Cartonnerie': {
    'Niveau I': 850, 'Niveau II': 1000, 'Niveau III': 1200, 'Niveau IV': 1400
  }
};

// 🇵🇱 POLOGNE - Salaires moyens-bas
const SALAIRES_POLOGNE: Record<string, Record<string, number>> = {
  'Bâtiment': {
    'N1P1': 1100, 'N1P2': 1150, 'N2P1': 1300, 'N2P2': 1400,
    'N3P1': 1600, 'N3P2': 1800, 'N4P1': 2100, 'N4P2': 2400
  },
  'Métallurgie': {
    'Niveau I': 1050, 'Niveau II': 1250, 'Niveau III': 1500,
    'Niveau IV': 1750, 'Niveau V': 2000
  },
  'TP': { 'N1': 1100, 'N2': 1300, 'N3': 1600, 'N4': 1900 },
  'Hôtellerie': {
    'Niveau I': 1000, 'Niveau II': 1150, 'Niveau III': 1350,
    'Niveau IV': 1600, 'Niveau V': 1850
  },
  'Restauration': {
    'Niveau I': 1000, 'Niveau II': 1150, 'Niveau III': 1350,
    'Niveau IV': 1600, 'Niveau V': 1900
  },
  'Plasturgie': {
    'Niveau I': 1050, 'Niveau II': 1250, 'Niveau III': 1500, 'Niveau IV': 1750
  },
  'Automobile Carrosserie': {
    'Niveau I': 1050, 'Niveau II': 1250, 'Niveau III': 1500, 'Niveau IV': 1800
  },
  'Sylviculture': {
    'Niveau I': 1100, 'Niveau II': 1300, 'Niveau III': 1600, 'Niveau IV': 1900
  },
  'Cartonnerie': {
    'Niveau I': 1050, 'Niveau II': 1250, 'Niveau III': 1500, 'Niveau IV': 1750
  }
};

// 🇵🇹 PORTUGAL - Salaires moyens-bas
const SALAIRES_PORTUGAL: Record<string, Record<string, number>> = {
  'Bâtiment': {
    'N1P1': 1000, 'N1P2': 1050, 'N2P1': 1200, 'N2P2': 1300,
    'N3P1': 1500, 'N3P2': 1650, 'N4P1': 1900, 'N4P2': 2200
  },
  'Métallurgie': {
    'Niveau I': 950, 'Niveau II': 1150, 'Niveau III': 1400,
    'Niveau IV': 1650, 'Niveau V': 1900
  },
  'TP': { 'N1': 1000, 'N2': 1200, 'N3': 1450, 'N4': 1750 },
  'Hôtellerie': {
    'Niveau I': 900, 'Niveau II': 1050, 'Niveau III': 1250,
    'Niveau IV': 1500, 'Niveau V': 1750
  },
  'Restauration': {
    'Niveau I': 900, 'Niveau II': 1050, 'Niveau III': 1250,
    'Niveau IV': 1500, 'Niveau V': 1800
  },
  'Plasturgie': {
    'Niveau I': 950, 'Niveau II': 1150, 'Niveau III': 1400, 'Niveau IV': 1650
  },
  'Automobile Carrosserie': {
    'Niveau I': 950, 'Niveau II': 1150, 'Niveau III': 1400, 'Niveau IV': 1700
  },
  'Sylviculture': {
    'Niveau I': 1000, 'Niveau II': 1200, 'Niveau III': 1450, 'Niveau IV': 1750
  },
  'Cartonnerie': {
    'Niveau I': 950, 'Niveau II': 1150, 'Niveau III': 1400, 'Niveau IV': 1650
  }
};

// 🇪🇸 ESPAGNE - Salaires moyens
const SALAIRES_ESPAGNE: Record<string, Record<string, number>> = {
  'Bâtiment': {
    'N1P1': 1400, 'N1P2': 1500, 'N2P1': 1700, 'N2P2': 1850,
    'N3P1': 2100, 'N3P2': 2300, 'N4P1': 2650, 'N4P2': 2950
  },
  'Métallurgie': {
    'Niveau I': 1350, 'Niveau II': 1600, 'Niveau III': 1900,
    'Niveau IV': 2200, 'Niveau V': 2500
  },
  'TP': { 'N1': 1400, 'N2': 1700, 'N3': 2000, 'N4': 2400 },
  'Hôtellerie': {
    'Niveau I': 1300, 'Niveau II': 1500, 'Niveau III': 1750,
    'Niveau IV': 2050, 'Niveau V': 2350
  },
  'Restauration': {
    'Niveau I': 1300, 'Niveau II': 1500, 'Niveau III': 1750,
    'Niveau IV': 2050, 'Niveau V': 2400
  },
  'Plasturgie': {
    'Niveau I': 1350, 'Niveau II': 1600, 'Niveau III': 1900, 'Niveau IV': 2200
  },
  'Automobile Carrosserie': {
    'Niveau I': 1350, 'Niveau II': 1600, 'Niveau III': 1900, 'Niveau IV': 2300
  },
  'Sylviculture': {
    'Niveau I': 1400, 'Niveau II': 1700, 'Niveau III': 2000, 'Niveau IV': 2400
  },
  'Cartonnerie': {
    'Niveau I': 1350, 'Niveau II': 1600, 'Niveau III': 1900, 'Niveau IV': 2200
  }
};

// 🌍 AUTRES PAYS - Salaires par défaut (moyenne européenne)
const SALAIRES_DEFAUT: Record<string, Record<string, number>> = {
  'Bâtiment': {
    'N1P1': 1500, 'N1P2': 1600, 'N2P1': 1800, 'N2P2': 1950,
    'N3P1': 2200, 'N3P2': 2400, 'N4P1': 2750, 'N4P2': 3050
  },
  'Métallurgie': {
    'Niveau I': 1450, 'Niveau II': 1700, 'Niveau III': 2000,
    'Niveau IV': 2300, 'Niveau V': 2600
  },
  'TP': { 'N1': 1500, 'N2': 1800, 'N3': 2100, 'N4': 2500 },
  'Hôtellerie': {
    'Niveau I': 1400, 'Niveau II': 1600, 'Niveau III': 1850,
    'Niveau IV': 2150, 'Niveau V': 2450
  },
  'Restauration': {
    'Niveau I': 1400, 'Niveau II': 1600, 'Niveau III': 1850,
    'Niveau IV': 2150, 'Niveau V': 2500
  },
  'Plasturgie': {
    'Niveau I': 1450, 'Niveau II': 1700, 'Niveau III': 2000, 'Niveau IV': 2300
  },
  'Automobile Carrosserie': {
    'Niveau I': 1450, 'Niveau II': 1700, 'Niveau III': 2000, 'Niveau IV': 2400
  },
  'Sylviculture': {
    'Niveau I': 1500, 'Niveau II': 1800, 'Niveau III': 2100, 'Niveau IV': 2500
  },
  'Cartonnerie': {
    'Niveau I': 1450, 'Niveau II': 1700, 'Niveau III': 2000, 'Niveau IV': 2300
  }
};

// ==========================================
// 📊 EXPORT DES SALAIRES PAR PAYS
// ==========================================

export const SALAIRES_PAR_PAYS: Record<string, any> = {
  'France': SALAIRES_FRANCE,
  'Allemagne': SALAIRES_ALLEMAGNE,
  'Roumanie': SALAIRES_ROUMANIE,
  'Pologne': SALAIRES_POLOGNE,
  'Portugal': SALAIRES_PORTUGAL,
  'Espagne': SALAIRES_ESPAGNE,
  // Autres pays utilisent SALAIRES_DEFAUT
  'Autriche': SALAIRES_DEFAUT,
  'Belgique': SALAIRES_DEFAUT,
  'Bulgarie': { ...SALAIRES_ROUMANIE }, // Similaire à Roumanie
  'Croatie': { ...SALAIRES_ROUMANIE },
  'Chypre': SALAIRES_DEFAUT,
  'Danemark': { ...SALAIRES_ALLEMAGNE }, // Similaire à Allemagne
  'Estonie': { ...SALAIRES_POLOGNE },
  'Finlande': { ...SALAIRES_ALLEMAGNE },
  'Grèce': { ...SALAIRES_ESPAGNE },
  'Hongrie': { ...SALAIRES_ROUMANIE },
  'Irlande': { ...SALAIRES_ALLEMAGNE },
  'Italie': { ...SALAIRES_ESPAGNE },
  'Lettonie': { ...SALAIRES_POLOGNE },
  'Lituanie': { ...SALAIRES_POLOGNE },
  'Luxembourg': { ...SALAIRES_ALLEMAGNE },
  'Malte': SALAIRES_DEFAUT,
  'Pays-Bas': { ...SALAIRES_ALLEMAGNE },
  'République tchèque': { ...SALAIRES_POLOGNE },
  'Slovaquie': { ...SALAIRES_POLOGNE },
  'Slovénie': { ...SALAIRES_ESPAGNE },
  'Suède': { ...SALAIRES_ALLEMAGNE }
};

// ==========================================
// 💰 COEFFICIENTS ETT PAR PAYS
// ==========================================

/**
 * Coefficients multiplicateurs pour la marge ETT
 * Varient selon le pays (coûts sociaux, réglementation)
 */

export const COEFFICIENTS_PAR_PAYS: Record<string, Record<string, number>> = {
  // 🇫🇷 France - Charges sociales élevées
  'France': {
    'Bâtiment': 1.45,
    'Métallurgie': 1.42,
    'TP': 1.47,
    'Hôtellerie': 1.38,
    'Restauration': 1.38,
    'Plasturgie': 1.40,
    'Automobile Carrosserie': 1.42,
    'Sylviculture': 1.45,
    'Cartonnerie': 1.40,
    'Autre': 1.40
  },

  // 🇩🇪 Allemagne - Charges moyennes-hautes
  'Allemagne': {
    'Bâtiment': 1.38,
    'Métallurgie': 1.35,
    'TP': 1.40,
    'Hôtellerie': 1.32,
    'Restauration': 1.32,
    'Plasturgie': 1.34,
    'Automobile Carrosserie': 1.35,
    'Sylviculture': 1.38,
    'Cartonnerie': 1.34,
    'Autre': 1.35
  },

  // 🇷🇴 Roumanie - Charges plus faibles
  'Roumanie': {
    'Bâtiment': 1.28,
    'Métallurgie': 1.26,
    'TP': 1.30,
    'Hôtellerie': 1.22,
    'Restauration': 1.22,
    'Plasturgie': 1.25,
    'Automobile Carrosserie': 1.26,
    'Sylviculture': 1.28,
    'Cartonnerie': 1.25,
    'Autre': 1.25
  },

  // 🇵🇱 Pologne - Charges moyennes-faibles
  'Pologne': {
    'Bâtiment': 1.32,
    'Métallurgie': 1.30,
    'TP': 1.34,
    'Hôtellerie': 1.26,
    'Restauration': 1.26,
    'Plasturgie': 1.28,
    'Automobile Carrosserie': 1.30,
    'Sylviculture': 1.32,
    'Cartonnerie': 1.28,
    'Autre': 1.28
  },

  // 🇵🇹 Portugal - Charges moyennes-faibles
  'Portugal': {
    'Bâtiment': 1.30,
    'Métallurgie': 1.28,
    'TP': 1.32,
    'Hôtellerie': 1.24,
    'Restauration': 1.24,
    'Plasturgie': 1.26,
    'Automobile Carrosserie': 1.28,
    'Sylviculture': 1.30,
    'Cartonnerie': 1.26,
    'Autre': 1.26
  },

  // 🇪🇸 Espagne - Charges moyennes
  'Espagne': {
    'Bâtiment': 1.35,
    'Métallurgie': 1.32,
    'TP': 1.37,
    'Hôtellerie': 1.28,
    'Restauration': 1.28,
    'Plasturgie': 1.30,
    'Automobile Carrosserie': 1.32,
    'Sylviculture': 1.35,
    'Cartonnerie': 1.30,
    'Autre': 1.30
  }
};

// Coefficient par défaut pour pays non définis
const COEFFICIENTS_DEFAUT: Record<string, number> = {
  'Bâtiment': 1.35,
  'Métallurgie': 1.32,
  'TP': 1.37,
  'Hôtellerie': 1.28,
  'Restauration': 1.28,
  'Plasturgie': 1.30,
  'Automobile Carrosserie': 1.32,
  'Sylviculture': 1.35,
  'Cartonnerie': 1.30,
  'Autre': 1.30
};

// ==========================================
// 🍽️ PANIERS REPAS PAR PAYS
// ==========================================

/**
 * Montants des paniers repas (€/jour)
 * France : Par région
 * Autres pays : Montant national uniforme
 */

export const PANIERS_REPAS_PAR_PAYS: Record<string, any> = {
  // 🇫🇷 France - Par région
  'France': {
    'ÎLE-DE-FRANCE': 12.50,
    'PROVENCE-ALPES-CÔTE D\'AZUR': 11.50,
    'AUVERGNE-RHÔNE-ALPES': 10.50,
    'BOURGOGNE-FRANCHE-COMTÉ': 10.00,
    'BRETAGNE': 10.00,
    'CENTRE-VAL DE LOIRE': 10.00,
    'CORSE': 11.00,
    'GRAND EST': 10.00,
    'HAUTS-DE-FRANCE': 10.00,
    'NORMANDIE': 10.00,
    'NOUVELLE-AQUITAINE': 10.00,
    'OCCITANIE': 10.50,
    'PAYS DE LA LOIRE': 10.00
  },

  // Autres pays - Montant national
  'Allemagne': 11.50,
  'Autriche': 11.00,
  'Belgique': 10.50,
  'Bulgarie': 6.50,
  'Croatie': 7.00,
  'Chypre': 9.00,
  'Danemark': 13.00,
  'Espagne': 9.50,
  'Estonie': 7.50,
  'Finlande': 12.00,
  'Grèce': 8.50,
  'Hongrie': 6.50,
  'Irlande': 12.00,
  'Italie': 10.00,
  'Lettonie': 7.00,
  'Lituanie': 7.00,
  'Luxembourg': 13.50,
  'Malte': 9.00,
  'Pays-Bas': 11.50,
  'Pologne': 7.50,
  'Portugal': 8.00,
  'République tchèque': 7.50,
  'Roumanie': 6.00,
  'Slovaquie': 7.00,
  'Slovénie': 9.00,
  'Suède': 12.50
};

// ==========================================
// 🛠️ FONCTIONS UTILITAIRES
// ==========================================

/**
 * Récupère les salaires pour un pays/région/secteur donné
 * @param pays - Nom du pays
 * @param secteur - Secteur d'activité
 * @param region - Région (utilisée uniquement pour la France)
 * @returns Objet { classification: salaire }
 */
export function getSalairesByPaysRegion(
  pays: string,
  secteur: string,
  region?: string
): Record<string, number> {
  const salairsPays = SALAIRES_PAR_PAYS[pays];

  if (!salairsPays) {
    // Pays non trouvé → utiliser salaires par défaut
    return SALAIRES_DEFAUT[secteur] || {};
  }

  // France : Utiliser la région
  if (pays === 'France' && region) {
    const salairesRegion = salairsPays[region];
    if (salairesRegion?.[secteur]) {
      return salairesRegion[secteur];
    }

    // Fallback : Utiliser AUVERGNE-RHÔNE-ALPES si région non trouvée
    if (salairsPays['AUVERGNE-RHÔNE-ALPES']?.[secteur]) {
      return salairsPays['AUVERGNE-RHÔNE-ALPES'][secteur];
    }
  }

  // Autres pays : Utiliser les salaires nationaux
  if (salairsPays[secteur]) {
    return salairsPays[secteur];
  }

  // Fallback final
  return SALAIRES_DEFAUT[secteur] || {};
}

/**
 * Récupère le coefficient ETT pour un pays/secteur donné
 * @param pays - Nom du pays
 * @param secteur - Secteur d'activité
 * @returns Coefficient multiplicateur
 */
export function getCoefficientByPays(pays: string, secteur: string): number {
  const coeffsPays = COEFFICIENTS_PAR_PAYS[pays];

  if (coeffsPays?.[secteur]) {
    return coeffsPays[secteur];
  }

  // Fallback
  return COEFFICIENTS_DEFAUT[secteur] || 1.35;
}

/**
 * Récupère le montant du panier repas pour un pays/région donné
 * @param pays - Nom du pays
 * @param region - Région (utilisée uniquement pour la France)
 * @returns Montant en euros/jour
 */
export function getPanierRepasByPays(pays: string, region?: string): number {
  const paniersPays = PANIERS_REPAS_PAR_PAYS[pays];

  if (!paniersPays) {
    return 9.00; // Valeur par défaut
  }

  // France : Utiliser la région
  if (pays === 'France' && region && typeof paniersPays === 'object') {
    return paniersPays[region] || 10.00;
  }

  // Autres pays : Montant national
  if (typeof paniersPays === 'number') {
    return paniersPays;
  }

  return 9.00; // Fallback
}

/**
 * Vérifie si un pays utilise des régions pour la tarification
 * @param pays - Nom du pays
 * @returns true si le pays a des régions définies
 */
export function paysUtiliseRegions(pays: string): boolean {
  return pays === 'France';
}
