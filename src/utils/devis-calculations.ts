// Utilitaires de calcul pour les devis YOJOB

import { COEFFICIENTS, SUPPLEMENTS } from '../data/config/constants';
import { getPanierRepas } from '../data/config/helpers';

interface PosteData {
  secteur: string;
  salaireBrut: number;
  quantite: number;
  baseHoraire: number;
  hebergementEU: boolean;
  transportETT: boolean;
  panierRepas: boolean;
  pays?: string;  // 🆕 Pays de l'entreprise cliente
  region: string;
}

// ============================================
// ANCIENNES FONCTIONS (compatibilité)
// ============================================

/**
 * Calcule le taux horaire brut
 */
export function calculerTauxHoraireBrut(salaireMensuel: number, baseHoraire: number): number {
  if (!salaireMensuel || !baseHoraire || baseHoraire === 0) return 0;
  return parseFloat((salaireMensuel / baseHoraire).toFixed(2));
}

/**
 * Calcule le taux ETT de base (taux horaire × coefficient)
 * @deprecated Utiliser calculerTauxETTAvecPays pour les nouveaux devis
 */
export function calculerTauxETTBase(tauxHoraireBrut: number, secteur: string): number {
  const coefficient = COEFFICIENTS[secteur] || 1.40;
  return parseFloat((tauxHoraireBrut * coefficient).toFixed(2));
}

/**
 * Calcule les suppléments horaires
 * ⚠️ IMPORTANT : Le panier repas n'est PAS inclus dans le taux horaire
 * Il est facturé séparément par jour travaillé
 */
export function calculerSupplements(
  hebergementEU: boolean,
  transportETT: boolean,
  panierRepas: boolean,
  region: string,
  baseHoraire: number
): number {
  let supplements = 0;
  
  // Supplément hébergement (si NON à charge de l'EU)
  if (!hebergementEU) {
    supplements += SUPPLEMENTS.hebergement;
  }
  
  // Supplément transport (si à charge de l'ETT)
  if (transportETT) {
    supplements += SUPPLEMENTS.transport;
  }
  
  // ❌ SUPPRIMÉ : Le panier repas ne s'ajoute PAS au taux horaire
  // Il est facturé séparément (voir calculerPanierRepasMensuel)
  
  return parseFloat(supplements.toFixed(2));
}

/**
 * Calcule le taux ETT final avec suppléments
 */
export function calculerTauxETTFinal(poste: PosteData): number {
  const tauxHoraireBrut = calculerTauxHoraireBrut(poste.salaireBrut, poste.baseHoraire);
  const tauxETTBase = calculerTauxETTBase(tauxHoraireBrut, poste.secteur);
  const supplements = calculerSupplements(
    poste.hebergementEU,
    poste.transportETT,
    poste.panierRepas,
    poste.region,
    poste.baseHoraire
  );
  
  return parseFloat((tauxETTBase + supplements).toFixed(2));
}

/**
 * Calcule le coût mensuel total pour un poste
 */
export function calculerCoutMensuel(poste: PosteData): number {
  const tauxETTFinal = calculerTauxETTFinal(poste);
  const coutMensuel = tauxETTFinal * poste.baseHoraire * poste.quantite;
  return parseFloat(coutMensuel.toFixed(2));
}

/**
 * Calcule le total HT du devis (somme de tous les postes)
 */
export function calculerTotalDevis(postes: PosteData[]): number {
  const total = postes.reduce((acc, poste) => {
    return acc + calculerCoutMensuel(poste);
  }, 0);
  return parseFloat(total.toFixed(2));
}

/**
 * Formate un montant en euros
 */
export function formaterMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(montant);
}

/**
 * Génère un numéro de devis unique
 */
export function genererNumeroDevis(): string {
  const date = new Date();
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000; // 4 chiffres
  
  return `DEV-${annee}${mois}${jour}-${random}`;
}

/**
 * Calcule la durée de mission en mois
 */
export function calculerDureeMission(dateDebut: string, dateFin: string | null): number {
  if (!dateFin) return 1; // Par défaut 1 mois si pas de date de fin
  
  const debut = new Date(dateDebut);
  const fin = new Date(dateFin);
  
  const diffTime = Math.abs(fin.getTime() - debut.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);
  
  return Math.max(1, diffMonths);
}

/**
 * Valide un numéro de SIRET (14 chiffres)
 */
export function validerSIRET(siret: string): boolean {
  const siretClean = siret.replace(/\s/g, '');
  if (siretClean.length !== 14) return false;
  if (!/^\d+$/.test(siretClean)) return false;
  
  // Algorithme de Luhn pour SIRET
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(siretClean[i]);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  
  return sum % 10 === 0;
}

/**
 * Valide un email
 */
export function validerEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valide un numéro de téléphone international (27 pays EU)
 * Format attendu: +33612345678, +49151234567, etc.
 */
export function validerTelephone(tel: string): boolean {
  if (!tel || tel.trim() === '') return false;
  
  const telClean = tel.replace(/\s/g, '').replace(/[\-()]/g, '');
  
  // Doit commencer par +
  if (!telClean.startsWith('+')) return false;
  
  // Liste des codes pays EU et leurs longueurs attendues (code + numéro)
  const validFormats: Record<string, number[]> = {
    '+33': [11, 12],   // France: +33 + 9 chiffres
    '+49': [12, 13],   // Allemagne: +49 + 10-11 chiffres
    '+34': [11, 12],   // Espagne: +34 + 9 chiffres
    '+48': [11, 12],   // Pologne: +48 + 9 chiffres
    '+40': [11, 12],   // Roumanie: +40 + 9 chiffres
    '+39': [12, 13],   // Italie: +39 + 10 chiffres
    '+351': [12, 13],  // Portugal: +351 + 9 chiffres
    '+31': [11, 12],   // Pays-Bas: +31 + 9 chiffres
    '+32': [11, 12],   // Belgique: +32 + 9 chiffres
    '+43': [13, 14],   // Autriche: +43 + 10-11 chiffres
    '+30': [12, 13],   // Grèce: +30 + 10 chiffres
    '+420': [12, 13],  // Tchéquie: +420 + 9 chiffres
    '+36': [11, 12],   // Hongrie: +36 + 9 chiffres
    '+46': [11, 12],   // Suède: +46 + 9 chiffres
    '+45': [10, 11],   // Danemark: +45 + 8 chiffres
    '+358': [12, 13],  // Finlande: +358 + 9-10 chiffres
    '+353': [12, 13],  // Irlande: +353 + 9 chiffres
    '+421': [12, 13],  // Slovaquie: +421 + 9 chiffres
    '+359': [12, 13],  // Bulgarie: +359 + 9 chiffres
    '+385': [12, 13],  // Croatie: +385 + 9 chiffres
    '+386': [11, 12],  // Slovénie: +386 + 8 chiffres
    '+370': [11, 12],  // Lituanie: +370 + 8 chiffres
    '+371': [11, 12],  // Lettonie: +371 + 8 chiffres
    '+372': [11, 12],  // Estonie: +372 + 8 chiffres
    '+352': [12, 13],  // Luxembourg: +352 + 9 chiffres
    '+357': [11, 12],  // Chypre: +357 + 8 chiffres
    '+356': [11, 12],  // Malte: +356 + 8 chiffres
  };
  
  // Trouver le code pays correspondant
  for (const [dialCode, validLengths] of Object.entries(validFormats)) {
    if (telClean.startsWith(dialCode)) {
      const totalLength = telClean.length;
      return validLengths.includes(totalLength);
    }
  }
  
  return false;
}

/**
 * Calcule le récapitulatif complet du devis
 */
export interface RecapitulatifDevis {
  postes: Array<{
    secteur: string;
    poste: string;
    classification: string;
    quantite: number;
    tauxHoraireBrut: number;
    tauxETTFinal: number;
    coutMensuel: number;
    // 🆕 Détails du coefficient
    coeffBase?: number;
    facteurPays?: number;
    coeffFinal?: number;
    labelPays?: string;
    // 🆕 Détails des options/suppléments
    supplementHebergement?: number;
    supplementTransport?: number;
    supplementPanierRepas?: number;
    hebergementActif?: boolean;
    transportActif?: boolean;
    panierRepasActif?: boolean;
  }>;
  totalHT: number;
  totalTTC: number;
  dureeMission: number;
  totalMission: number;
}

export function calculerRecapitulatif(
  postes: Array<PosteData & { poste: string; classification: string; coeffBase?: number; facteurPays?: number; labelPays?: string }>,
  dateDebut: string,
  dateFin: string | null
): RecapitulatifDevis {
  const dureeMission = calculerDureeMission(dateDebut, dateFin);
  
  const postesRecap = postes.map(poste => {
    const tauxHoraireBrut = calculerTauxHoraireBrut(poste.salaireBrut, poste.baseHoraire);
    const tauxETTFinal = calculerTauxETTFinal(poste);
    
    // 🆕 Calculer les suppléments individuels
    const supplementHebergement = !poste.hebergementEU ? SUPPLEMENTS.hebergement : 0;
    const supplementTransport = poste.transportETT ? SUPPLEMENTS.transport : 0;
    const montantPanierJour = poste.panierRepas ? getPanierRepas(poste.pays || 'France') : 0;
    const supplementPanierRepas = montantPanierJour > 0 ? montantPanierJour / 7 : 0;
    
    // 🆕 Calculer le coefficient final si disponible
    const coeffFinal = (poste.coeffBase && poste.facteurPays) 
      ? calculerCoefficientComplet(poste.coeffBase, poste.facteurPays)
      : undefined;
    
    return {
      secteur: poste.secteur,
      poste: poste.poste,
      classification: poste.classification,
      quantite: poste.quantite,
      tauxHoraireBrut,
      tauxETTFinal,
      coutMensuel: calculerCoutMensuel(poste),
      // 🆕 Détails du coefficient
      coeffBase: poste.coeffBase,
      facteurPays: poste.facteurPays,
      coeffFinal,
      labelPays: poste.labelPays,
      // 🆕 Détails des suppléments
      supplementHebergement,
      supplementTransport,
      supplementPanierRepas,
      hebergementActif: !poste.hebergementEU,
      transportActif: poste.transportETT,
      panierRepasActif: poste.panierRepas,
    };
  });
  
  const totalHT = calculerTotalDevis(postes);
  const totalTTC = parseFloat((totalHT * 1.20).toFixed(2)); // TVA 20%
  const totalMission = parseFloat((totalHT * dureeMission).toFixed(2));
  
  return {
    postes: postesRecap,
    totalHT,
    totalTTC,
    dureeMission,
    totalMission
  };
}

// ============================================
// NOUVELLES FONCTIONS (avec pays)
// ============================================

/**
 * Calcule le coefficient complet (coefficient base × facteur pays)
 * Formule : Coeff final = Coeff base × Facteur pays
 * 
 * @param coeffBase - Coefficient de base (secteur + classification), ex: 1.92
 * @param facteurPays - Facteur multiplicateur du pays, ex: 1.05 pour Portugal
 * @returns Coefficient final arrondi à 2 décimales
 * 
 * @example
 * calculerCoefficientComplet(1.92, 1.05) // 2.02
 */
export function calculerCoefficientComplet(
  coeffBase: number,
  facteurPays: number
): number {
  const coeffFinal = coeffBase * facteurPays;
  return Math.round(coeffFinal * 100) / 100;
}

/**
 * Calcule le taux ETT avec prise en compte du pays d'origine
 * Formule : Taux ETT = Taux horaire brut × Coefficient complet
 * 
 * @param tauxHoraireBrut - Taux horaire brut du salarié
 * @param coeffBase - Coefficient de base (secteur + classification)
 * @param facteurPays - Facteur multiplicateur du pays
 * @returns Taux ETT arrondi à 2 décimales
 * 
 * @example
 * calculerTauxETTAvecPays(12.50, 1.92, 1.05) // 25.25
 */
export function calculerTauxETTAvecPays(
  tauxHoraireBrut: number,
  coeffBase: number,
  facteurPays: number
): number {
  const coeffFinal = calculerCoefficientComplet(coeffBase, facteurPays);
  const tauxETT = tauxHoraireBrut * coeffFinal;
  return Math.round(tauxETT * 100) / 100;
}

/**
 * Calcule le coût mensuel estimé pour un profil
 * Formule : Coût = Taux ETT × Base horaire × Quantité
 * 
 * @param tauxETT - Taux ETT final (avec ou sans suppléments)
 * @param baseHoraire - Nombre d'heures mensuelles (ex: 151.67)
 * @param quantite - Nombre de personnes
 * @returns Coût mensuel total arrondi à 2 décimales
 */
export function calculerCoutMensuelProfil(
  tauxETT: number,
  baseHoraire: number,
  quantite: number
): number {
  const cout = tauxETT * baseHoraire * quantite;
  return Math.round(cout * 100) / 100;
}

/**
 * Calcule le taux ETT complet avec suppléments horaires uniquement
 * ⚠️ IMPORTANT : Le panier repas n'est PAS inclus, il est facturé séparément
 * 
 * @param tauxHoraireBrut - Taux horaire brut du salarié
 * @param coeffBase - Coefficient de base (secteur + classification)
 * @param facteurPays - Facteur multiplicateur du pays
 * @param supplementHebergement - Montant supplément hébergement (€/h)
 * @param supplementTransport - Montant supplément transport (€/h)
 * @param options - Options pour les suppléments
 * @returns Taux ETT complet avec suppléments horaires uniquement
 * 
 * @example
 * calculerTauxETTComplet(12.50, 1.92, 1.05, 3.50, 1.50, {
 *   hebergementNonFourni: true,
 *   transportETT: true
 * }) // 29.88 (sans panier repas)
 */
export function calculerTauxETTComplet(
  tauxHoraireBrut: number,
  coeffBase: number,
  facteurPays: number,
  supplementHebergement: number,
  supplementTransport: number,
  options: {
    hebergementNonFourni?: boolean;
    transportETT?: boolean;
  }
): number {
  // Taux ETT de base
  let tauxETT = calculerTauxETTAvecPays(tauxHoraireBrut, coeffBase, facteurPays);

  // Supplément hébergement (si non fourni par l'entreprise utilisatrice)
  if (options.hebergementNonFourni) {
    tauxETT += supplementHebergement;
  }

  // Supplément transport (si à charge de l'ETT)
  if (options.transportETT) {
    tauxETT += supplementTransport;
  }

  // ❌ SUPPRIMÉ : Le panier repas n'est plus dans cette fonction
  // Utiliser calculerPanierRepasMensuel() pour le panier

  return Math.round(tauxETT * 100) / 100;
}

/**
 * 🆕 Calcule le montant mensuel du panier repas (facturé séparément)
 * Formule : Montant panier/jour × Jours travaillés/mois × Quantité personnes
 * 
 * @param montantPanierJour - Montant du panier repas par jour (€)
 * @param baseHoraire - Base horaire mensuelle (ex: 151.67h, 169h)
 * @param quantite - Nombre de personnes
 * @returns Montant mensuel total du panier repas
 * 
 * @example
 * calculerPanierRepasMensuel(10.00, 151.67, 4)
 * // Jours: 151.67 / 7 ≈ 21.67 → 22 jours
 * // Total: 10 × 22 × 4 = 880,00 €
 */
export function calculerPanierRepasMensuel(
  montantPanierJour: number,
  baseHoraire: number,
  quantite: number
): number {
  if (montantPanierJour <= 0) return 0;
  
  // Calcul du nombre de jours travaillés (base 7h/jour)
  const joursParMois = Math.round(baseHoraire / 7);
  
  const montantMensuel = montantPanierJour * joursParMois * quantite;
  
  return Math.round(montantMensuel * 100) / 100;
}

/**
 * 🆕 Structure du détail des heures supplémentaires
 */
export interface DetailHeuresSup {
  baseHoraire: number;
  heuresNormales: number;      // 0-151,67h
  heures25: number;             // 151,67-186,33h (majoration +25%)
  heures50: number;             // Au-delà de 186,33h (majoration +50%)
  coutHeuresNormales: number;   // Taux × heures normales
  coutHeures25: number;         // Taux × 1,25 × heures 25%
  coutHeures50: number;         // Taux × 1,50 × heures 50%
  coutUnitaire: number;         // Total pour 1 personne
  coutTotal: number;            // Total pour quantité personnes
}

/**
 * 🆕 Calcule le coût mensuel avec majorations heures supplémentaires
 * Formule : 
 * - 0-151,67h : Taux normal
 * - 151,67-186,33h : Taux × 1,25 (+25%)
 * - Au-delà de 186,33h : Taux × 1,50 (+50%)
 * 
 * @param tauxETT - Taux ETT final (avec suppléments hébergement/transport)
 * @param baseHoraire - Base horaire mensuelle (ex: 151.67, 169, 186.33)
 * @param quantite - Nombre de personnes
 * @returns Détail complet du calcul avec majorations
 * 
 * @example
 * calculerCoutAvecHeuresSup(28.09, 169, 4)
 * // Heures normales: 151.67h × 28.09 = 4 260.81 €
 * // Heures +25%: 17.33h × 28.09 × 1.25 = 608.65 €
 * // Total unitaire: 4 869.46 €
 * // Total pour 4 pers.: 19 477.84 €
 */
export function calculerCoutAvecHeuresSup(
  tauxETT: number,
  baseHoraire: number,
  quantite: number
): DetailHeuresSup {
  const SEUIL_NORMAL = 151.67;  // 35h/semaine × 52 semaines / 12 mois
  const SEUIL_25 = 186.33;       // 43h/semaine × 52 semaines / 12 mois
  
  // Calcul de la répartition des heures
  let heuresNormales = Math.min(baseHoraire, SEUIL_NORMAL);
  let heures25 = 0;
  let heures50 = 0;
  
  if (baseHoraire > SEUIL_NORMAL) {
    heures25 = Math.min(baseHoraire - SEUIL_NORMAL, SEUIL_25 - SEUIL_NORMAL);
  }
  
  if (baseHoraire > SEUIL_25) {
    heures50 = baseHoraire - SEUIL_25;
  }
  
  // Calcul des coûts par tranche
  const coutHeuresNormales = tauxETT * heuresNormales;
  const coutHeures25 = tauxETT * 1.25 * heures25;
  const coutHeures50 = tauxETT * 1.50 * heures50;
  
  const coutUnitaire = coutHeuresNormales + coutHeures25 + coutHeures50;
  const coutTotal = coutUnitaire * quantite;
  
  return {
    baseHoraire,
    heuresNormales: Math.round(heuresNormales * 100) / 100,
    heures25: Math.round(heures25 * 100) / 100,
    heures50: Math.round(heures50 * 100) / 100,
    coutHeuresNormales: Math.round(coutHeuresNormales * 100) / 100,
    coutHeures25: Math.round(coutHeures25 * 100) / 100,
    coutHeures50: Math.round(coutHeures50 * 100) / 100,
    coutUnitaire: Math.round(coutUnitaire * 100) / 100,
    coutTotal: Math.round(coutTotal * 100) / 100
  };
}