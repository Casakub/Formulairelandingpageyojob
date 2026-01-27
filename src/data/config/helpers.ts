// ==========================================
// 🛠️ FONCTIONS UTILITAIRES POUR INTERROGER LES DONNÉES DE CONFIGURATION
// ==========================================
// Ce fichier contient toutes les fonctions pour accéder aux données de devis
// Source unique de vérité pour éviter la duplication

import { configData } from './index';

// 🔑 Mapping entre clés techniques et labels français
const SECTEUR_KEY_TO_LABEL: Record<string, string> = {
  batiment: 'Bâtiment',
  metallurgie: 'Métallurgie',
  tp: 'TP',
  hotellerie: 'Hôtellerie',
  restauration: 'Restauration',
  plasturgie: 'Plasturgie',
  automobile_carrosserie: 'Automobile Carrosserie',
  sylviculture: 'Sylviculture',
  cartonnerie: 'Cartonnerie',
  autre: 'Autre',
};

// ==========================================
// 💶 SALAIRES
// ==========================================

/**
 * Récupère les salaires pour un pays et une région donnée
 * @param pays Code du pays (ex: "RO", "PL", "FR")
 * @param region Nom de la région (ex: "ÎLE-DE-FRANCE")
 * @returns Object avec les salaires par secteur et classification
 */
export function getSalairesByPaysRegion(pays: string, region: string): Record<string, Record<string, number>> | null {
  // Pour la France, on utilise les salaires régionaux
  if (pays === 'FR' || pays === 'France') {
    const regionNormalized = region.toUpperCase();
    return configData.salaires.salaires[regionNormalized] || null;
  }
  
  // Pour les autres pays, on devrait avoir des données spécifiques
  // À implémenter si nécessaire
  console.warn(`⚠️ Salaires non disponibles pour le pays: ${pays}`);
  return null;
}

/**
 * Récupère le coefficient ETT pour un pays donné
 * @param pays Code du pays (ex: "RO", "PL")
 * @returns Number - Coefficient multiplicateur
 */
export function getCoefficientByPays(pays: string): number {
  const facteurPays = configData.facteurs.facteurs[pays];
  if (facteurPays) {
    return facteurPays.facteur;
  }
  
  console.warn(`⚠️ Coefficient non trouvé pour le pays: ${pays}, utilisation de 1.00 par défaut`);
  return 1.00;
}

// ==========================================
// 🍽️ PANIERS REPAS
// ==========================================

/**
 * Récupère le montant du panier repas selon la région ET le secteur
 * @param region Nom de la région (ex: "ÎLE-DE-FRANCE")
 * @param secteur Nom du secteur (ex: "Bâtiment", "Métallurgie") ou clé technique (ex: "batiment", "metallurgie")
 * @returns Number - Montant en € par jour
 */
export function getPanierRepas(region: string, secteur: string): number {
  const regionNormalized = region.toUpperCase();
  const paniersRegion = configData.supplements.paniers_repas[regionNormalized];
  
  if (!paniersRegion) {
    console.warn(`⚠️ Région non trouvée pour panier repas: ${region}`);
    return 8.00; // Fallback
  }
  
  // 🔑 Normaliser le secteur (convertir clé technique → label français)
  const secteurNormalized = SECTEUR_KEY_TO_LABEL[secteur.toLowerCase()] || secteur;
  
  const montant = paniersRegion[secteurNormalized];
  
  if (montant === undefined) {
    console.warn(`⚠️ Secteur non trouvé pour panier repas: ${secteur} (normalisé: ${secteurNormalized}) dans ${region}`);
    return paniersRegion['Autre'] || 8.00; // Fallback
  }
  
  console.log(`✅ [getPanierRepas] ${region} / ${secteur} → ${secteurNormalized} = ${montant}€`);
  return montant;
}

/**
 * OBSOLÈTE : Fonction de compatibilité avec l'ancien système
 * Utilisez getPanierRepas() à la place
 */
export function getPanierRepasByPays(pays: string, region: string, secteur: string = 'Autre'): number {
  console.warn('⚠️ getPanierRepasByPays() est obsolète. Utilisez getPanierRepas(region, secteur) à la place.');
  return getPanierRepas(region, secteur);
}

// ==========================================
// 🏢 PAYS
// ==========================================

/**
 * Récupère la liste des pays actifs
 * @returns Array de pays avec leurs métadonnées
 */
export function getPaysActifs() {
  return configData.pays.pays.filter(p => p.actif);
}

/**
 * Récupère les informations d'un pays par son code
 * @param code Code du pays (ex: "RO", "PL")
 * @returns Object avec les infos du pays ou null
 */
export function getPaysParCode(code: string) {
  return configData.pays.pays.find(p => p.code === code) || null;
}

// ==========================================
// 🎯 COEFFICIENTS
// ==========================================

/**
 * Récupère le coefficient de base pour un secteur et une classification
 * @param secteur Nom du secteur (ex: "Bâtiment")
 * @param classification Nom de la classification (ex: "N1P1")
 * @returns Number - Coefficient de base
 */
export function getCoefficientBase(secteur: string, classification: string): number {
  const coeffsSecteur = configData.coefficients.coefficients[secteur];
  
  if (!coeffsSecteur) {
    console.warn(`⚠️ Secteur non trouvé: ${secteur}`);
    return 1.92; // Coefficient minimum légal
  }
  
  const coeff = coeffsSecteur[classification];
  
  if (coeff === undefined) {
    console.warn(`⚠️ Classification non trouvée: ${classification} dans ${secteur}`);
    return 1.92;
  }
  
  return coeff;
}

/**
 * Récupère toutes les classifications pour un secteur
 * @param secteur Nom du secteur
 * @returns Array de noms de classifications
 */
export function getClassificationsPourSecteur(secteur: string): string[] {
  const coeffsSecteur = configData.coefficients.coefficients[secteur];
  
  if (!coeffsSecteur) {
    return [];
  }
  
  return Object.keys(coeffsSecteur);
}

// ==========================================
// 📊 MAPPING ANCIENNES CLASSIFICATIONS
// ==========================================

/**
 * Convertit une ancienne classification vers la nouvelle
 * @param secteur Nom du secteur
 * @param ancienneClassification Ancien nom de classification
 * @returns String - Nouvelle classification ou l'ancienne si pas de mapping
 */
export function mapperClassification(secteur: string, ancienneClassification: string): string {
  const mapping = configData.coefficients.mapping_anciennes_classifications[secteur];
  
  if (!mapping) {
    return ancienneClassification;
  }
  
  return mapping[ancienneClassification] || ancienneClassification;
}

// ==========================================
// ✨ SUPPLÉMENTS HORAIRES
// ==========================================

/**
 * Récupère le montant du supplément hébergement
 * @returns Number - Montant en €/h
 */
export function getSupplementHebergement(): number {
  return configData.supplements.supplements_horaires.hebergement.montant;
}

/**
 * Récupère le montant du supplément transport
 * @returns Number - Montant en €/h
 */
export function getSupplementTransport(): number {
  return configData.supplements.supplements_horaires.transport.montant;
}

// ==========================================
// 📋 EXPORT DES FONCTIONS PRINCIPALES
// ==========================================

export const devisHelpers = {
  // Salaires
  getSalairesByPaysRegion,
  getCoefficientByPays,
  
  // Paniers repas
  getPanierRepas,
  getPanierRepasByPays, // Obsolète mais gardé pour compatibilité
  
  // Pays
  getPaysActifs,
  getPaysParCode,
  
  // Coefficients
  getCoefficientBase,
  getClassificationsPourSecteur,
  mapperClassification,
  
  // Suppléments
  getSupplementHebergement,
  getSupplementTransport
};