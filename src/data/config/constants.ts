// ==========================================
// 📋 CONSTANTES CENTRALISÉES POUR LE SYSTÈME DE DEVIS YOJOB
// ==========================================
// Ce fichier contient toutes les constantes réutilisables
// Source unique de vérité pour éviter la duplication

// ==========================================
// 🌍 PAYS EUROPÉENS
// ==========================================

export const PAYS_EUROPEENS = [
  'France',
  'Allemagne',
  'Autriche',
  'Belgique',
  'Bulgarie',
  'Croatie',
  'Chypre',
  'Danemark',
  'Espagne',
  'Estonie',
  'Finlande',
  'Grèce',
  'Hongrie',
  'Irlande',
  'Italie',
  'Lettonie',
  'Lituanie',
  'Luxembourg',
  'Malte',
  'Pays-Bas',
  'Pologne',
  'Portugal',
  'République tchèque',
  'Roumanie',
  'Slovaquie',
  'Slovénie',
  'Suède'
] as const;

// ==========================================
// 🗺️ RÉGIONS FRANÇAISES
// ==========================================

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

// ==========================================
// 🏗️ SECTEURS D'ACTIVITÉ
// ==========================================

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
    convention: 'Convention collective de la plasturgie (292)',
    postes: [
      'Opérateur de production',
      'Régleur',
      'Technicien maintenance',
      'Contrôleur qualité',
      'Chef d\'équipe'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Automobile Carrosserie': {
    convention: 'Convention collective des services de l\'automobile (1090)',
    postes: [
      'Carrossier',
      'Peintre automobile',
      'Mécanicien auto',
      'Électricien auto',
      'Chef d\'atelier'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Sylviculture': {
    convention: 'Convention collective des exploitations forestières (3718)',
    postes: [
      'Bûcheron',
      'Élagueur',
      'Conducteur d\'engins forestiers',
      'Chef d\'équipe forestière'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Cartonnerie': {
    convention: 'Convention collective de la cartonnerie (3344)',
    postes: [
      'Opérateur de production',
      'Conducteur de machine',
      'Régleur',
      'Chef d\'équipe'
    ],
    classifications: ['Niveau I', 'Niveau II', 'Niveau III', 'Niveau IV']
  },
  'Autre': {
    convention: 'Convention collective à déterminer',
    postes: ['À définir'],
    classifications: ['À définir']
  }
} as const;

// ==========================================
// 💰 COEFFICIENTS AGENCE PAR SECTEUR
// ==========================================
// Marge ETT appliquée au coût de revient

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

// ==========================================
// ✨ SUPPLÉMENTS HORAIRES
// ==========================================

export const SUPPLEMENTS = {
  hebergement: 3.50, // €/h si hébergement non à charge EU
  transport: 1.50    // €/h si transport à charge ETT
};

// ==========================================
// 📈 MAJORATIONS TAUX HORAIRE AGENCE
// ==========================================

export const MAJORATIONS_TAUX = {
  delaiPaiement: {
    reception: 0,
    reception_facture: -0.10, // Remise 10% si paiement à réception de facture
    j30: 0.15,
    j45: 0.20,
    j60: 0.25,
  },
  experience: {
    entre_4_6: 0.03,
    entre_7_10: 0.05,
    plus_10: 0.07,
  },
  permis: 0.01,
  outillage: 0.05,
  langues: {
    B1: 0.03,
    B2: 0.04,
    C1: 0.05,
    C2: 0.07,
  },
} as const;

// ==========================================
// 🗣️ NIVEAUX DE LANGUE
// ==========================================

export const NIVEAUX_LANGUE = [
  { value: 'non-requis', label: 'Non requis' },
  { value: 'A1', label: 'A1 - Débutant' },
  { value: 'A2', label: 'A2 - Élémentaire' },
  { value: 'B1', label: 'B1 - Intermédiaire' },
  { value: 'B2', label: 'B2 - Avancé' },
  { value: 'C1', label: 'C1 - Autonome' },
  { value: 'C2', label: 'C2 - Maîtrise' }
] as const;

// ==========================================
// 🌐 LANGUES DISPONIBLES
// ==========================================

export const LANGUES = [
  'Français', 
  'Anglais', 
  'Portugais', 
  'Espagnol', 
  'Italien', 
  'Autre'
] as const;

// ==========================================
// 🦺 EPI (Équipements de Protection Individuelle)
// ==========================================

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
] as const;

// ==========================================
// 📅 BASE HORAIRE STANDARD
// ==========================================

export const BASE_HORAIRE_STANDARD = 151.67; // heures/mois (35h/semaine)
