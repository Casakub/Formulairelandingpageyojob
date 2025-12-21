/**
 * 🔑 CLÉS TECHNIQUES POUR LES SECTEURS
 * 
 * Mapping entre clés techniques (utilisées en code) et les données
 * Permet la traduction multi-langues
 */

export interface SecteurData {
  key: string;
  convention: string;
  postes: string[];
  classifications: string[];
}

export const SECTEURS_DATA: Record<string, SecteurData> = {
  batiment: {
    key: 'batiment',
    convention: 'Convention collective nationale des ouvriers du bâtiment (3193)',
    postes: ['macon', 'coffreur', 'ferrailleur', 'carreleur', 'platrier', 'peintre', 'plombier', 'electricien', 'couvreur', 'menuisier', 'chef_equipe_batiment', 'chef_chantier'],
    classifications: ['n1p1', 'n1p2', 'n2p1', 'n2p2', 'n3p1', 'n3p2', 'n4p1', 'n4p2']
  },
  metallurgie: {
    key: 'metallurgie',
    convention: 'Convention collective de la métallurgie (3109)',
    postes: ['soudeur', 'chaudronnier', 'tuyauteur', 'tourneur', 'fraiseur', 'usineur', 'mecanicien_industriel', 'monteur', 'controleur_qualite', 'ajusteur', 'chef_equipe_metallurgie'],
    classifications: ['niveau_1', 'niveau_2', 'niveau_3', 'niveau_4', 'niveau_5']
  },
  tp: {
    key: 'tp',
    convention: 'Convention collective nationale des travaux publics (3005)',
    postes: ['conducteur_engins', 'terrassier', 'canalisateur', 'constructeur_routes', 'coffreur_bancheur', 'macon_vrd', 'chef_equipe_tp', 'manoeuvre_tp'],
    classifications: ['n1', 'n2', 'n3', 'n4']
  },
  hotellerie: {
    key: 'hotellerie',
    convention: 'Convention collective de l\'hôtellerie-restauration (3292)',
    postes: ['receptionniste', 'femme_chambre', 'agent_entretien', 'bagagiste', 'concierge', 'night_audit', 'gouvernante', 'chef_reception'],
    classifications: ['niveau_1', 'niveau_2', 'niveau_3', 'niveau_4', 'niveau_5']
  },
  restauration: {
    key: 'restauration',
    convention: 'Convention collective de l\'hôtellerie-restauration (3292)',
    postes: ['cuisinier', 'commis_cuisine', 'chef_partie', 'serveur', 'barman', 'plongeur', 'chef_rang', 'maitre_hotel', 'second_cuisine', 'chef_cuisine'],
    classifications: ['niveau_1', 'niveau_2', 'niveau_3', 'niveau_4', 'niveau_5']
  },
  plasturgie: {
    key: 'plasturgie',
    convention: 'Convention collective de la plasturgie (0292)',
    postes: ['operateur_injection', 'operateur_extrusion', 'regleur', 'operateur_thermoformage', 'controleur_qualite_plasturgie', 'technicien_maintenance', 'chef_equipe_plasturgie'],
    classifications: ['niveau_1', 'niveau_2', 'niveau_3', 'niveau_4']
  },
  automobile_carrosserie: {
    key: 'automobile_carrosserie',
    convention: 'Convention collective de la réparation automobile (1090)',
    postes: ['carrossier', 'peintre_automobile', 'mecanicien_auto', 'electricien_auto', 'chef_atelier', 'controleur_technique'],
    classifications: ['niveau_1', 'niveau_2', 'niveau_3', 'niveau_4']
  },
  sylviculture: {
    key: 'sylviculture',
    convention: 'Convention collective de l\'agriculture (7501)',
    postes: ['bucheron', 'elagueur', 'conducteur_engins_forestiers', 'chef_equipe_sylviculture'],
    classifications: ['niveau_1', 'niveau_2', 'niveau_3', 'niveau_4']
  },
  cartonnerie: {
    key: 'cartonnerie',
    convention: 'Convention collective de l\'industrie de la transformation (3107)',
    postes: ['operateur_production', 'conducteur_ligne', 'regleur_cartonnerie', 'chef_equipe_cartonnerie'],
    classifications: ['niveau_1', 'niveau_2', 'niveau_3', 'niveau_4']
  },
  autre: {
    key: 'autre',
    convention: 'À définir selon activité',
    postes: ['autre_poste'],
    classifications: ['a_definir']
  }
};

// Helper: Obtenir les postes d'un secteur
export function getPostesForSecteur(secteurKey: string): string[] {
  return SECTEURS_DATA[secteurKey]?.postes || [];
}

// Helper: Obtenir les classifications d'un secteur
export function getClassificationsForSecteur(secteurKey: string): string[] {
  return SECTEURS_DATA[secteurKey]?.classifications || [];
}

// Helper: Obtenir la convention d'un secteur
export function getConventionForSecteur(secteurKey: string): string {
  return SECTEURS_DATA[secteurKey]?.convention || '';
}
