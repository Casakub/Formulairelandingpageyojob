/**
 * Helper pour traduire les données du récapitulatif
 * Maps les valeurs brutes (français) vers les clés de traduction
 */

import type { DevisLanguage } from '../src/i18n/devis/types';
import { fr } from '../src/i18n/devis/locales/fr';
import { ro } from '../src/i18n/devis/locales/ro';
import { en } from '../src/i18n/devis/locales/en';
import { de } from '../src/i18n/devis/locales/de';
import { es } from '../src/i18n/devis/locales/es';
import { pl } from '../src/i18n/devis/locales/pl';

// Map des traductions
const TRANSLATIONS_MAP = {
  fr,
  ro,
  en,
  de,
  es,
  pl,
};

// Mapping des secteurs vers les clés de traduction
const SECTEUR_KEYS: Record<string, string> = {
  'Bâtiment': 'batiment',
  'Métallurgie': 'metallurgie',
  'TP': 'tp',
  'Hôtellerie': 'hotellerie',
  'Restauration': 'restauration',
  'Plasturgie': 'plasturgie',
  'Automobile Carrosserie': 'automobile_carrosserie',
  'Sylviculture': 'sylviculture',
  'Cartonnerie': 'cartonnerie',
  'Autre': 'autre',
};

// Mapping des postes vers les clés de traduction
const POSTE_KEYS: Record<string, Record<string, string>> = {
  'Bâtiment': {
    'Maçon': 'macon',
    'Coffreur': 'coffreur',
    'Ferrailleur': 'ferrailleur',
    'Carreleur': 'carreleur',
    'Plâtrier': 'platrier',
    'Peintre': 'peintre',
    'Plombier': 'plombier',
    'Électricien': 'electricien',
    'Couvreur': 'couvreur',
    'Menuisier': 'menuisier',
    'Chef d\'équipe': 'chef_equipe_batiment',
    'Chef de chantier': 'chef_chantier',
  },
  'Métallurgie': {
    'Soudeur': 'soudeur',
    'Chaudronnier': 'chaudronnier',
    'Tuyauteur': 'tuyauteur',
    'Tourneur': 'tourneur',
    'Fraiseur': 'fraiseur',
    'Usineur': 'usineur',
    'Mécanicien industriel': 'mecanicien_industriel',
    'Monteur': 'monteur',
    'Contrôleur qualité': 'controleur_qualite',
    'Ajusteur': 'ajusteur',
    'Chef d\'équipe': 'chef_equipe_metallurgie',
  },
  'TP': {
    'Conducteur d\'engins': 'conducteur_engins',
    'Terrassier': 'terrassier',
    'Canalisateur': 'canalisateur',
    'Constructeur de routes': 'constructeur_routes',
    'Coffreur bancheur': 'coffreur_bancheur',
    'Maçon VRD': 'macon_vrd',
    'Chef d\'équipe TP': 'chef_equipe_tp',
    'Manœuvre TP': 'manoeuvre_tp',
  },
  'Hôtellerie': {
    'Réceptionniste': 'receptionniste',
    'Femme de chambre': 'femme_chambre',
    'Agent d\'entretien': 'agent_entretien',
    'Bagagiste': 'bagagiste',
    'Concierge': 'concierge',
    'Night audit': 'night_audit',
    'Gouvernante': 'gouvernante',
    'Chef de réception': 'chef_reception',
  },
  'Restauration': {
    'Cuisinier': 'cuisinier',
    'Commis de cuisine': 'commis_cuisine',
    'Chef de partie': 'chef_partie',
    'Serveur': 'serveur',
    'Barman': 'barman',
    'Plongeur': 'plongeur',
    'Chef de rang': 'chef_rang',
    'Maître d\'hôtel': 'maitre_hotel',
    'Second de cuisine': 'second_cuisine',
    'Chef de cuisine': 'chef_cuisine',
  },
  'Plasturgie': {
    'Opérateur injection': 'operateur_injection',
    'Opérateur extrusion': 'operateur_extrusion',
    'Régleur': 'regleur',
    'Opérateur thermoformage': 'operateur_thermoformage',
    'Contrôleur qualité': 'controleur_qualite_plasturgie',
    'Technicien maintenance': 'technicien_maintenance',
    'Chef d\'équipe': 'chef_equipe_plasturgie',
  },
  'Automobile Carrosserie': {
    'Carrossier': 'carrossier',
    'Peintre automobile': 'peintre_automobile',
    'Mécanicien auto': 'mecanicien_auto',
    'Électricien auto': 'electricien_auto',
    'Chef d\'atelier': 'chef_atelier',
    'Contrôleur technique': 'controleur_technique',
  },
  'Sylviculture': {
    'Bûcheron': 'bucheron',
    'Élagueur': 'elagueur',
    'Conducteur d\'engins forestiers': 'conducteur_engins_forestiers',
    'Chef d\'équipe sylviculture': 'chef_equipe_sylviculture',
  },
  'Cartonnerie': {
    'Opérateur de production': 'operateur_production',
    'Conducteur de ligne': 'conducteur_ligne',
    'Régleur': 'regleur_cartonnerie',
    'Chef d\'équipe': 'chef_equipe_cartonnerie',
  },
  'Autre': {
    'Autre poste (à préciser)': 'autre_poste',
  },
};

// Mapping des classifications vers les clés de traduction
const CLASSIFICATION_KEYS: Record<string, Record<string, string>> = {
  'Bâtiment': {
    'N1P1': 'n1p1',
    'N1P2': 'n1p2',
    'N2P1': 'n2p1',
    'N2P2': 'n2p2',
    'N3P1': 'n3p1',
    'N3P2': 'n3p2',
    'N4P1': 'n4p1',
    'N4P2': 'n4p2',
  },
  'Métallurgie': {
    'Niveau I': 'niveau_1',
    'Niveau II': 'niveau_2',
    'Niveau III': 'niveau_3',
    'Niveau IV': 'niveau_4',
    'Niveau V': 'niveau_5',
  },
  'TP': {
    'N1': 'n1',
    'N2': 'n2',
    'N3': 'n3',
    'N4': 'n4',
  },
  'Hôtellerie': {
    'Niveau I': 'niveau_1',
    'Niveau II': 'niveau_2',
    'Niveau III': 'niveau_3',
    'Niveau IV': 'niveau_4',
    'Niveau V': 'niveau_5',
  },
  'Restauration': {
    'Niveau I': 'niveau_1',
    'Niveau II': 'niveau_2',
    'Niveau III': 'niveau_3',
    'Niveau IV': 'niveau_4',
    'Niveau V': 'niveau_5',
  },
  'Plasturgie': {
    'Niveau I': 'niveau_1',
    'Niveau II': 'niveau_2',
    'Niveau III': 'niveau_3',
    'Niveau IV': 'niveau_4',
  },
  'Automobile Carrosserie': {
    'Niveau I': 'niveau_1',
    'Niveau II': 'niveau_2',
    'Niveau III': 'niveau_3',
    'Niveau IV': 'niveau_4',
  },
  'Sylviculture': {
    'Niveau I': 'niveau_1',
    'Niveau II': 'niveau_2',
    'Niveau III': 'niveau_3',
    'Niveau IV': 'niveau_4',
  },
  'Cartonnerie': {
    'Niveau I': 'niveau_1',
    'Niveau II': 'niveau_2',
    'Niveau III': 'niveau_3',
    'Niveau IV': 'niveau_4',
  },
  'Autre': {
    'À définir': 'a_definir',
  },
};

// Mapping des pays vers les clés de traduction (noms de pays européens)
const PAYS_KEYS: Record<string, string> = {
  'France': 'france',
  'Allemagne': 'allemagne',
  'Autriche': 'autriche',
  'Belgique': 'belgique',
  'Bulgarie': 'bulgarie',
  'Croatie': 'croatie',
  'Chypre': 'chypre',
  'Danemark': 'danemark',
  'Espagne': 'espagne',
  'Estonie': 'estonie',
  'Finlande': 'finlande',
  'Grèce': 'grece',
  'Hongrie': 'hongrie',
  'Irlande': 'irlande',
  'Italie': 'italie',
  'Lettonie': 'lettonie',
  'Lituanie': 'lituanie',
  'Luxembourg': 'luxembourg',
  'Malte': 'malte',
  'Pays-Bas': 'pays_bas',
  'Pologne': 'pologne',
  'Portugal': 'portugal',
  'République tchèque': 'republique_tcheque',
  'Roumanie': 'roumanie',
  'Slovaquie': 'slovaquie',
  'Slovénie': 'slovenie',
  'Suède': 'suede',
};

/**
 * Traduit un nom de secteur
 */
export function translateSecteur(secteur: string, lang: DevisLanguage): string {
  const key = SECTEUR_KEYS[secteur];
  const translations = TRANSLATIONS_MAP[lang];
  
  if (key && translations?.secteurs?.[key as keyof typeof translations.secteurs]?.label) {
    return (translations.secteurs[key as keyof typeof translations.secteurs] as any).label;
  }
  return secteur; // Fallback
}

/**
 * Traduit un nom de poste
 */
export function translatePoste(secteur: string, poste: string, lang: DevisLanguage): string {
  const secteurKey = SECTEUR_KEYS[secteur];
  const posteKey = POSTE_KEYS[secteur]?.[poste];
  const translations = TRANSLATIONS_MAP[lang];
  
  if (secteurKey && posteKey && translations?.secteurs?.[secteurKey as keyof typeof translations.secteurs]) {
    const secteurData = translations.secteurs[secteurKey as keyof typeof translations.secteurs] as any;
    if (secteurData?.postes?.[posteKey]) {
      return secteurData.postes[posteKey];
    }
  }
  return poste; // Fallback
}

/**
 * Traduit une classification
 */
export function translateClassification(secteur: string, classification: string, lang: DevisLanguage): string {
  const secteurKey = SECTEUR_KEYS[secteur];
  const classificationKey = CLASSIFICATION_KEYS[secteur]?.[classification];
  const translations = TRANSLATIONS_MAP[lang];
  
  if (secteurKey && classificationKey && translations?.secteurs?.[secteurKey as keyof typeof translations.secteurs]) {
    const secteurData = translations.secteurs[secteurKey as keyof typeof translations.secteurs] as any;
    if (secteurData?.classifications?.[classificationKey]) {
      return secteurData.classifications[classificationKey];
    }
  }
  return classification; // Fallback
}

/**
 * Traduit un nom de pays
 */
export function translatePays(pays: string, lang: DevisLanguage): string {
  const key = PAYS_KEYS[pays];
  const translations = TRANSLATIONS_MAP[lang];
  
  if (key && translations?.pays?.[key as keyof typeof translations.pays]) {
    return translations.pays[key as keyof typeof translations.pays] as string;
  }
  return pays; // Fallback
}
