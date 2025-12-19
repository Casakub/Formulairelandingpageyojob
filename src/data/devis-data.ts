// Données de référence pour le système de devis YOJOB

export const REGIONS = [
  'AUVERGNE-RHÔNE-ALPES',
  'BOURGOGNE-FRANCHE-COMTÉ',
  'BRETAGNE',
  'CENTRE-VAL DE LOIRE',
  'CORSE',
  'GRAND EST',
  'HAUTS-DE-FRANCE',
  'ÎLE-DE-FRANCE',
  'NORMANDIE',
  'NOUVELLE-AQUITAINE',
  'OCCITANIE',
  'PAYS DE LA LOIRE',
  'PROVENCE-ALPES-CÔTE D\'AZUR'
] as const;

export const SECTEURS = {
  'Bâtiment': {
    convention: 'Convention collective nationale des ouvriers du bâtiment (3193)',
    postes: [
      'Maçon',
      'Coffreur',
      'Ferrailleur',
      'Carreleur',
      'Plâtrier',
      'Peintre',
      'Plombier',
      'Électricien',
      'Couvreur',
      'Menuisier',
      'Chef d\'équipe',
      'Chef de chantier'
    ],
    classifications: ['N1P1', 'N1P2', 'N2P1', 'N2P2', 'N3P1', 'N3P2', 'N4P1', 'N4P2']
  },
  'Métallurgie': {
    convention: 'Convention collective de la métallurgie (3109)',
    postes: [
      'Soudeur',
      'Chaudronnier',
      'Tuyauteur',
      'Tourneur',
      'Fraiseur',
      'Usineur',
      'Mécanicien industriel',
      'Monteur',
      'Contrôleur qualité',
      'Ajusteur',
      'Chef d\'équipe'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV', 'Niveau V']
  },
  'TP': {
    convention: 'Convention collective nationale des travaux publics (3005)',
    postes: [
      'Conducteur d\'engins',
      'Terrassier',
      'Canalisateur',
      'Constructeur de routes',
      'Coffreur bancheur',
      'Maçon VRD',
      'Chef d\'équipe TP',
      'Manœuvre TP'
    ],
    classifications: ['N1', 'N2', 'N3', 'N4']
  },
  'Hôtellerie': {
    convention: 'Convention collective de l\'hôtellerie-restauration (3292)',
    postes: [
      'Réceptionniste',
      'Femme de chambre',
      'Agent d\'entretien',
      'Bagagiste',
      'Concierge',
      'Night audit',
      'Gouvernante',
      'Chef de réception'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV', 'Niveau V']
  },
  'Restauration': {
    convention: 'Convention collective de l\'hôtellerie-restauration (3292)',
    postes: [
      'Cuisinier',
      'Commis de cuisine',
      'Chef de partie',
      'Serveur',
      'Barman',
      'Plongeur',
      'Chef de rang',
      'Maître d\'hôtel',
      'Second de cuisine',
      'Chef de cuisine'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV', 'Niveau V']
  },
  'Plasturgie': {
    convention: 'Convention collective de la plasturgie (0292)',
    postes: [
      'Opérateur injection',
      'Opérateur extrusion',
      'Régleur',
      'Opérateur thermoformage',
      'Contrôleur qualité',
      'Technicien maintenance',
      'Chef d\'équipe'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Automobile Carrosserie': {
    convention: 'Convention collective de la réparation automobile (1090)',
    postes: [
      'Carrossier',
      'Peintre automobile',
      'Mécanicien auto',
      'Électricien auto',
      'Chef d\'atelier',
      'Contrôleur technique'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Sylviculture': {
    convention: 'Convention collective de l\'agriculture (7501)',
    postes: [
      'Bûcheron',
      'Élagueur',
      'Conducteur d\'engins forestiers',
      'Chef d\'équipe sylviculture'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Cartonnerie': {
    convention: 'Convention collective de l\'industrie de la transformation (3107)',
    postes: [
      'Opérateur de production',
      'Conducteur de ligne',
      'Régleur',
      'Chef d\'équipe'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Autre': {
    convention: 'À définir selon activité',
    postes: ['Autre poste (à préciser)'],
    classifications: ['À définir']
  }
} as const;

// Salaires minimaux par région/secteur/classification (en euros brut mensuel)
// Base horaire standard : 151.67h
export const SALAIRES: Record<string, Record<string, Record<string, number>>> = {
  'ÎLE-DE-FRANCE': {
    'Bâtiment': {
      'N1P1': 1850,
      'N1P2': 1920,
      'N2P1': 2050,
      'N2P2': 2180,
      'N3P1': 2400,
      'N3P2': 2600,
      'N4P1': 2900,
      'N4P2': 3200
    },
    'Métallurgie': {
      'Niveau I': 1800,
      'Niveau II': 1950,
      'Niveau III': 2200,
      'Niveau IV': 2500,
      'Niveau V': 2800
    },
    'TP': {
      'N1': 1850,
      'N2': 2000,
      'N3': 2300,
      'N4': 2700
    },
    'Hôtellerie': {
      'Niveau I': 1750,
      'Niveau II': 1900,
      'Niveau III': 2100,
      'Niveau IV': 2400,
      'Niveau V': 2700
    },
    'Restauration': {
      'Niveau I': 1750,
      'Niveau II': 1900,
      'Niveau III': 2100,
      'Niveau IV': 2400,
      'Niveau V': 2800
    },
    'Plasturgie': {
      'Niveau I': 1800,
      'Niveau II': 1950,
      'Niveau III': 2200,
      'Niveau IV': 2500
    },
    'Automobile Carrosserie': {
      'Niveau I': 1800,
      'Niveau II': 1950,
      'Niveau III': 2200,
      'Niveau IV': 2600
    },
    'Sylviculture': {
      'Niveau I': 1850,
      'Niveau II': 2000,
      'Niveau III': 2300,
      'Niveau IV': 2700
    },
    'Cartonnerie': {
      'Niveau I': 1800,
      'Niveau II': 1950,
      'Niveau III': 2200,
      'Niveau IV': 2500
    }
  },
  'PROVENCE-ALPES-CÔTE D\'AZUR': {
    'Bâtiment': {
      'N1P1': 1800,
      'N1P2': 1870,
      'N2P1': 2000,
      'N2P2': 2130,
      'N3P1': 2350,
      'N3P2': 2550,
      'N4P1': 2850,
      'N4P2': 3150
    },
    'Métallurgie': {
      'Niveau I': 1750,
      'Niveau II': 1900,
      'Niveau III': 2150,
      'Niveau IV': 2450,
      'Niveau V': 2750
    },
    'TP': {
      'N1': 1800,
      'N2': 1950,
      'N3': 2250,
      'N4': 2650
    },
    'Hôtellerie': {
      'Niveau I': 1700,
      'Niveau II': 1850,
      'Niveau III': 2050,
      'Niveau IV': 2350,
      'Niveau V': 2650
    },
    'Restauration': {
      'Niveau I': 1700,
      'Niveau II': 1850,
      'Niveau III': 2050,
      'Niveau IV': 2350,
      'Niveau V': 2750
    },
    'Plasturgie': {
      'Niveau I': 1750,
      'Niveau II': 1900,
      'Niveau III': 2150,
      'Niveau IV': 2450
    },
    'Automobile Carrosserie': {
      'Niveau I': 1750,
      'Niveau II': 1900,
      'Niveau III': 2150,
      'Niveau IV': 2550
    },
    'Sylviculture': {
      'Niveau I': 1800,
      'Niveau II': 1950,
      'Niveau III': 2250,
      'Niveau IV': 2650
    },
    'Cartonnerie': {
      'Niveau I': 1750,
      'Niveau II': 1900,
      'Niveau III': 2150,
      'Niveau IV': 2450
    }
  },
  // Autres régions avec salaires légèrement inférieurs (hors ÎDF et PACA)
  'AUVERGNE-RHÔNE-ALPES': {
    'Bâtiment': {
      'N1P1': 1750,
      'N1P2': 1820,
      'N2P1': 1950,
      'N2P2': 2080,
      'N3P1': 2300,
      'N3P2': 2500,
      'N4P1': 2800,
      'N4P2': 3100
    },
    'Métallurgie': {
      'Niveau I': 1700,
      'Niveau II': 1850,
      'Niveau III': 2100,
      'Niveau IV': 2400,
      'Niveau V': 2700
    },
    'TP': {
      'N1': 1750,
      'N2': 1900,
      'N3': 2200,
      'N4': 2600
    },
    'Hôtellerie': {
      'Niveau I': 1650,
      'Niveau II': 1800,
      'Niveau III': 2000,
      'Niveau IV': 2300,
      'Niveau V': 2600
    },
    'Restauration': {
      'Niveau I': 1650,
      'Niveau II': 1800,
      'Niveau III': 2000,
      'Niveau IV': 2300,
      'Niveau V': 2700
    },
    'Plasturgie': {
      'Niveau I': 1700,
      'Niveau II': 1850,
      'Niveau III': 2100,
      'Niveau IV': 2400
    },
    'Automobile Carrosserie': {
      'Niveau I': 1700,
      'Niveau II': 1850,
      'Niveau III': 2100,
      'Niveau IV': 2500
    },
    'Sylviculture': {
      'Niveau I': 1750,
      'Niveau II': 1900,
      'Niveau III': 2200,
      'Niveau IV': 2600
    },
    'Cartonnerie': {
      'Niveau I': 1700,
      'Niveau II': 1850,
      'Niveau III': 2100,
      'Niveau IV': 2400
    }
  }
  // Les autres régions auront les mêmes salaires que AUVERGNE-RHÔNE-ALPES par défaut
};

// Coefficients agence par secteur (marge ETT)
export const COEFFICIENTS: Record<string, number> = {
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
};

// Montants paniers repas par région (euros/jour)
export const PANIERS_REPAS: Record<string, number> = {
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
};

// Suppléments horaires
export const SUPPLEMENTS = {
  hebergement: 3.50, // €/h si hébergement non à charge EU
  transport: 1.50    // €/h si transport à charge ETT
};

// Niveaux de langue
export const NIVEAUX_LANGUE = [
  { value: 'non-requis', label: 'Non requis' },
  { value: 'A1', label: 'A1 - Débutant' },
  { value: 'A2', label: 'A2 - Élémentaire' },
  { value: 'B1', label: 'B1 - Intermédiaire' },
  { value: 'B2', label: 'B2 - Avancé' },
  { value: 'C1', label: 'C1 - Autonome' },
  { value: 'C2', label: 'C2 - Maîtrise' }
];

// Langues disponibles
export const LANGUES = ['Français', 'Anglais', 'Portugais', 'Espagnol', 'Italien', 'Autre'];

// EPI disponibles
export const EPIS = [
  'Casque de sécurité',
  'Lunettes de sécurité',
  'Protections auditives',
  'Gants de protection',
  'Chaussures de sécurité',
  'Harnais de sécurité',
  'Vêtements de travail',
  'Masque respiratoire',
  'Protection faciale',
  'Vêtements haute visibilité'
];

// Motifs de recours
export const MOTIFS_RECOURS = [
  'Accroissement temporaire d\'activité',
  'Remplacement salarié absent',
  'Travaux saisonniers',
  'Commande exceptionnelle à l\'exportation',
  'Autre (à préciser)'
];

// Périodes d'essai
export const PERIODES_ESSAI = [
  { value: '2', label: '2 jours' },
  { value: '3', label: '3 jours' },
  { value: '5', label: '5 jours' },
  { value: '15', label: '15 jours' }
];

// Délais de paiement
export const DELAIS_PAIEMENT = [
  'Paiement à réception',
  '30 jours',
  '45 jours',
  '60 jours'
];

// Fonction pour obtenir les salaires d'une région (avec fallback)
export function getSalairesByRegion(region: string, secteur: string): Record<string, number> {
  // Si la région a des salaires spécifiques, les retourner
  if (SALAIRES[region]?.[secteur]) {
    return SALAIRES[region][secteur];
  }
  
  // Sinon, utiliser les salaires d'AUVERGNE-RHÔNE-ALPES comme référence
  if (SALAIRES['AUVERGNE-RHÔNE-ALPES']?.[secteur]) {
    return SALAIRES['AUVERGNE-RHÔNE-ALPES'][secteur];
  }
  
  // Fallback par défaut
  return {};
}

// Fonction pour obtenir le montant panier repas
export function getPanierRepas(region: string): number {
  return PANIERS_REPAS[region] || 10.00;
}
