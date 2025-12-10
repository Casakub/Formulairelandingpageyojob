/**
 * Utility functions for the survey application
 */

/**
 * Extract country code from a country string
 * Example: "France (FR)" -> "FR"
 */
export function extractCountry(countryString: string): string {
  if (!countryString) return 'Non spécifié';
  
  // Extract country code from format "Country (CODE)"
  const match = countryString.match(/\(([A-Z]{2})\)/);
  if (match && match[1]) {
    return match[1];
  }
  
  // If no code found, return the full string
  return countryString;
}

/**
 * Get interest level based on NPS score
 * Score 0-6: Low
 * Score 7-8: Medium
 * Score 9-10: High
 */
export function getInterestLevel(score: number): string {
  if (score >= 9) {
    return 'Élevé';
  } else if (score >= 7) {
    return 'Moyen';
  } else {
    return 'Faible';
  }
}

/**
 * Format a number with thousands separator
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/**
 * Calculate completion percentage
 */
export function calculateProgress(currentSection: number, totalSections: number): number {
  if (currentSection === 0) return 0;
  return Math.round((currentSection / totalSections) * 100);
}

/**
 * Format date to French locale
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format duration in seconds to human-readable string
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}min ${secs}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a unique response ID
 */
export function generateResponseId(): string {
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `YJ-2025-${randomNum}`;
}

/**
 * Get respondent type label in French
 */
export function getRespondentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'agency': 'Agence ETT',
    'client': 'Client (Entreprise)',
    'temp_worker': 'Intérimaire'
  };
  
  return labels[type] || type;
}

/**
 * Map interest score to qualification level
 */
export function getQualificationScore(interestScore: number, hasEmail: boolean, wantsReport: boolean): number {
  let score = 0;
  
  // Interest score (max 60 points)
  if (interestScore >= 9) {
    score += 60;
  } else if (interestScore >= 7) {
    score += 40;
  } else if (interestScore >= 5) {
    score += 20;
  }
  
  // Email provided (20 points)
  if (hasEmail) {
    score += 20;
  }
  
  // Wants report (20 points)
  if (wantsReport) {
    score += 20;
  }
  
  return score;
}
