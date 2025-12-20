// Utilitaires de calcul pour les devis YOJOB

import { COEFFICIENTS, SUPPLEMENTS, getPanierRepas } from '../data/devis-data';

interface PosteData {
  secteur: string;
  salaireBrut: number;
  quantite: number;
  baseHoraire: number;
  hebergementEU: boolean;
  transportETT: boolean;
  panierRepas: boolean;
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
  
  // Supplément panier repas
  if (panierRepas) {
    const montantPanierJour = getPanierRepas(region);
    // Montant panier / 7 heures de travail (moyenne journalière)
    const supplementPanierHoraire = montantPanierJour / 7;
    supplements += supplementPanierHoraire;
  }
  
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
 * Valide un numéro de téléphone français
 */
export function validerTelephone(tel: string): boolean {
  const telClean = tel.replace(/\s/g, '');
  // Format: 0XXXXXXXXX (10 chiffres) ou +33XXXXXXXXX
  const regex = /^(?:(?:\+|00)33|0)[1-9](?:\d{8})$/;
  return regex.test(telClean);
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
  }>;
  totalHT: number;
  totalTTC: number;
  dureeMission: number;
  totalMission: number;
}

export function calculerRecapitulatif(
  postes: Array<PosteData & { poste: string; classification: string }>,
  dateDebut: string,
  dateFin: string | null
): RecapitulatifDevis {
  const dureeMission = calculerDureeMission(dateDebut, dateFin);
  
  const postesRecap = postes.map(poste => ({
    secteur: poste.secteur,
    poste: poste.poste,
    classification: poste.classification,
    quantite: poste.quantite,
    tauxHoraireBrut: calculerTauxHoraireBrut(poste.salaireBrut, poste.baseHoraire),
    tauxETTFinal: calculerTauxETTFinal(poste),
    coutMensuel: calculerCoutMensuel(poste)
  }));
  
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
 * Calcule le taux ETT complet avec tous les suppléments
 * Formule : Taux ETT + Hébergement + Transport + Panier repas
 * 
 * @param tauxHoraireBrut - Taux horaire brut du salarié
 * @param coeffBase - Coefficient de base (secteur + classification)
 * @param facteurPays - Facteur multiplicateur du pays
 * @param supplementHebergement - Montant supplément hébergement (€/h)
 * @param supplementTransport - Montant supplément transport (€/h)
 * @param options - Options pour les suppléments
 * @returns Taux ETT complet avec suppléments
 * 
 * @example
 * calculerTauxETTComplet(12.50, 1.92, 1.05, 3.50, 1.50, {
 *   hebergementNonFourni: true,
 *   transportETT: true,
 *   panierRepas: 10.50
 * }) // 30.75
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
    panierRepas?: number; // montant du panier en €/jour, 0 si non applicable
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

  // Supplément panier repas (montant/jour ÷ 7h)
  if (options.panierRepas && options.panierRepas > 0) {
    const supplementPanierHoraire = options.panierRepas / 7;
    tauxETT += supplementPanierHoraire;
  }

  return Math.round(tauxETT * 100) / 100;
}