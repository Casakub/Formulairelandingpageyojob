/**
 * 📋 CALCUL AUTOMATIQUE DE LA PÉRIODE D'ESSAI
 * 
 * Selon la réglementation française du travail temporaire (Code du travail) :
 * - Contrat < 1 mois : 2 jours maximum
 * - Contrat entre 1 et 2 mois : 3 jours maximum
 * - Contrat > 2 mois : 5 jours maximum
 * 
 * Source : Article L1251-14 du Code du travail
 */

/**
 * Calcule la durée du contrat en mois entre deux dates
 */
export function calculerDureeContratEnMois(dateDebut: string, dateFin: string): number {
  if (!dateDebut || !dateFin) return 0;
  
  const debut = new Date(dateDebut);
  const fin = new Date(dateFin);
  
  // Vérifier que la date de fin est après la date de début
  if (fin <= debut) return 0;
  
  // Calculer la différence en millisecondes
  const diffMs = fin.getTime() - debut.getTime();
  
  // Convertir en jours
  const diffJours = diffMs / (1000 * 60 * 60 * 24);
  
  // Convertir en mois (approximation : 1 mois = 30.44 jours en moyenne)
  const diffMois = diffJours / 30.44;
  
  return diffMois;
}

/**
 * Détermine la période d'essai automatique selon la durée du contrat
 * 
 * @param dateDebut - Date de début du contrat (format ISO: YYYY-MM-DD)
 * @param dateFin - Date de fin du contrat (format ISO: YYYY-MM-DD)
 * @returns Période d'essai en jours ('2', '3', ou '5')
 */
export function calculerPeriodeEssaiAuto(dateDebut: string, dateFin: string): string {
  const dureeMois = calculerDureeContratEnMois(dateDebut, dateFin);
  
  // Si pas de dates valides, retourner la valeur par défaut
  if (dureeMois === 0) {
    return '3'; // Valeur par défaut : 3 jours
  }
  
  // Appliquer les règles légales
  if (dureeMois < 1) {
    return '2'; // Moins d'1 mois : 2 jours
  } else if (dureeMois >= 1 && dureeMois <= 2) {
    return '3'; // Entre 1 et 2 mois : 3 jours
  } else {
    return '5'; // Plus de 2 mois : 5 jours
  }
}

/**
 * Obtenir le label explicatif de la période d'essai calculée
 * 
 * @param periodeEssai - Période d'essai en jours
 * @param dureeMois - Durée du contrat en mois
 * @returns Message explicatif
 */
export function getExplicationPeriodeEssai(periodeEssai: string, dureeMois: number): string {
  if (dureeMois === 0) {
    return '';
  }
  
  const dureeMoisFormatee = dureeMois.toFixed(1);
  
  if (periodeEssai === '2') {
    return `Durée du contrat : ${dureeMoisFormatee} mois (< 1 mois) → 2 jours maximum`;
  } else if (periodeEssai === '3') {
    return `Durée du contrat : ${dureeMoisFormatee} mois (1 à 2 mois) → 3 jours maximum`;
  } else if (periodeEssai === '5') {
    return `Durée du contrat : ${dureeMoisFormatee} mois (> 2 mois) → 5 jours maximum`;
  }
  
  return '';
}

/**
 * Vérifie si la période d'essai manuelle est conforme à la loi
 * 
 * @param periodeEssai - Période d'essai saisie manuellement (en jours)
 * @param dateDebut - Date de début du contrat
 * @param dateFin - Date de fin du contrat
 * @returns { conforme: boolean, periodeMaxAutorisee: string, message: string }
 */
export function verifierConformitePeriodeEssai(
  periodeEssai: string,
  dateDebut: string,
  dateFin: string
): {
  conforme: boolean;
  periodeMaxAutorisee: string;
  message: string;
} {
  const periodeAuto = calculerPeriodeEssaiAuto(dateDebut, dateFin);
  const periodeManuelle = parseInt(periodeEssai, 10);
  const periodeMax = parseInt(periodeAuto, 10);
  
  const conforme = periodeManuelle <= periodeMax;
  
  if (!conforme) {
    const dureeMois = calculerDureeContratEnMois(dateDebut, dateFin);
    return {
      conforme: false,
      periodeMaxAutorisee: periodeAuto,
      message: `⚠️ La période d'essai de ${periodeEssai} jours dépasse le maximum légal de ${periodeAuto} jours pour un contrat de ${dureeMois.toFixed(1)} mois`
    };
  }
  
  return {
    conforme: true,
    periodeMaxAutorisee: periodeAuto,
    message: ''
  };
}
