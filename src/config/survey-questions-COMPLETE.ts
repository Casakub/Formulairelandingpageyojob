/**
 * 🎯 CONFIGURATION COMPLÈTE DES QUESTIONS D'ENQUÊTE MULTI-PROFILS
 * 
 * Architecture :
 * - AGENCE : 26 questions (8-10 min) - Agences ETT européennes
 * - CLIENT : 18 questions (6-7 min) - Entreprises utilisatrices
 * - WORKER : 15 questions (5-6 min) - Intérimaires/Travailleurs
 * 
 * Version: 2.0.0
 * Date: 10 Décembre 2024
 */

import type { RespondentType } from '../types/survey';

export interface QuestionConfig {
  id: string;
  section: number;
  order: number;
  category: 'profile' | 'experience' | 'needs' | 'interest' | 'vision' | 'contact';
  visibleFor: RespondentType[];
  type: 'text' | 'textarea' | 'radio' | 'multi-select' | 'number' | 'email' | 'score' | 'checkbox';
  required: boolean;
  fieldName: string;
  labelKey: string;
  labelFallback: string;
  placeholderKey?: string;
  placeholderFallback?: string;
  descriptionKey?: string;
  descriptionFallback?: string;
  options?: Array<{
    value: string;
    labelKey: string;
    labelFallback: string;
    icon?: string;
  }>;
  conditional?: {
    dependsOn: string;
    showWhen: string | string[];
  };
}

/**
 * 📋 TOUTES LES QUESTIONS DE L'ENQUÊTE (3 PROFILS)
 */
export const SURVEY_QUESTIONS: QuestionConfig[] = [
  // ========================================
  // SECTION 1 : PROFIL
  // ========================================
  
  // Q1 : Nom (ALL)
  {
    id: 'q1_nom',
    section: 1,
    order: 1,
    category: 'profile',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'text',
    required: true,
    fieldName: 'q1_nom',
    labelKey: 'questions.q1_nom.label',
    labelFallback: 'Nom',
    placeholderKey: 'questions.q1_nom.placeholder',
    placeholderFallback: 'Nom de l\'organisation ou votre nom',
  },

  // Q2 : Année création (AGENCY only)
  {
    id: 'q2_annee',
    section: 1,
    order: 2,
    category: 'profile',
    visibleFor: ['agency'],
    type: 'number',
    required: true,
    fieldName: 'q2_annee',
    labelKey: 'questions.q2_annee.label',
    labelFallback: 'Année de création',
    placeholderKey: 'questions.q2_annee.placeholder',
    placeholderFallback: '2015',
  },

  // Q2bis : Année d'entreprise (CLIENT only)
  {
    id: 'q2_annee_client',
    section: 1,
    order: 2,
    category: 'profile',
    visibleFor: ['client'],
    type: 'number',
    required: true,
    fieldName: 'q2_annee',
    labelKey: 'questions.q2_annee_client.label',
    labelFallback: 'Année de création de votre entreprise',
    placeholderKey: 'questions.q2_annee_client.placeholder',
    placeholderFallback: '2010',
  },

  // Q2ter : Nationalité (WORKER only)
  {
    id: 'q2_nationalite',
    section: 1,
    order: 2,
    category: 'profile',
    visibleFor: ['worker'],
    type: 'text',
    required: true,
    fieldName: 'q5_pays', // Réutilise le champ pays
    labelKey: 'questions.q2_nationalite.label',
    labelFallback: 'Votre nationalité',
    placeholderKey: 'questions.q2_nationalite.placeholder',
    placeholderFallback: 'Ex: Polonaise, Roumaine...',
  },

  // Q3 : Taille (AGENCY & CLIENT)
  {
    id: 'q3_taille',
    section: 1,
    order: 3,
    category: 'profile',
    visibleFor: ['agency', 'client'],
    type: 'radio',
    required: true,
    fieldName: 'q3_taille',
    labelKey: 'questions.q3_taille.label',
    labelFallback: 'Taille de l\'organisation',
    options: [
      { value: '1-9', labelKey: 'questions.q3_taille.options.1-9', labelFallback: '1-9 personnes', icon: '👤' },
      { value: '10-49', labelKey: 'questions.q3_taille.options.10-49', labelFallback: '10-49 personnes', icon: '👥' },
      { value: '50-249', labelKey: 'questions.q3_taille.options.50-249', labelFallback: '50-249 personnes', icon: '🏢' },
      { value: '250+', labelKey: 'questions.q3_taille.options.250+', labelFallback: '250+ personnes', icon: '🏛️' },
    ],
  },

  // Q3bis : Expérience intérim (WORKER only)
  {
    id: 'q3_experience',
    section: 1,
    order: 3,
    category: 'profile',
    visibleFor: ['worker'],
    type: 'radio',
    required: true,
    fieldName: 'q3_taille', // Réutilise le champ taille
    labelKey: 'questions.q3_experience.label',
    labelFallback: 'Années d\'expérience en intérim',
    options: [
      { value: '<1', labelKey: 'questions.q3_experience.options.<1', labelFallback: 'Moins d\'1 an', icon: '🌱' },
      { value: '1-3', labelKey: 'questions.q3_experience.options.1-3', labelFallback: '1-3 ans', icon: '📈' },
      { value: '3-5', labelKey: 'questions.q3_experience.options.3-5', labelFallback: '3-5 ans', icon: '🎯' },
      { value: '5-10', labelKey: 'questions.q3_experience.options.5-10', labelFallback: '5-10 ans', icon: '⭐' },
      { value: '10+', labelKey: 'questions.q3_experience.options.10+', labelFallback: 'Plus de 10 ans', icon: '🏆' },
    ],
  },

  // Q4 : Secteurs d'activité (AGENCY & CLIENT)
  {
    id: 'q4_secteurs',
    section: 1,
    order: 4,
    category: 'profile',
    visibleFor: ['agency', 'client'],
    type: 'multi-select',
    required: true,
    fieldName: 'q4_secteurs',
    labelKey: 'questions.q4_secteurs.label',
    labelFallback: 'Principaux secteurs d\'activité',
    descriptionKey: 'questions.q4_secteurs.description',
    descriptionFallback: 'Sélectionnez tous les secteurs concernés',
    options: [
      { value: 'btp', labelKey: 'sectors.btp', labelFallback: 'BTP / Construction', icon: '🏗️' },
      { value: 'industrie', labelKey: 'sectors.industrie', labelFallback: 'Industrie', icon: '🏭' },
      { value: 'logistique', labelKey: 'sectors.logistique', labelFallback: 'Logistique / Transport', icon: '📦' },
      { value: 'hotellerie', labelKey: 'sectors.hotellerie', labelFallback: 'Hôtellerie / Restauration', icon: '🏨' },
      { value: 'sante', labelKey: 'sectors.sante', labelFallback: 'Santé', icon: '🏥' },
      { value: 'agriculture', labelKey: 'sectors.agriculture', labelFallback: 'Agriculture', icon: '🌾' },
      { value: 'tech', labelKey: 'sectors.tech', labelFallback: 'Tech / IT', icon: '💻' },
      { value: 'autres', labelKey: 'sectors.autres', labelFallback: 'Autres', icon: '📋' },
    ],
  },

  // Q4bis : Métiers exercés (WORKER only)
  {
    id: 'q4_metiers',
    section: 1,
    order: 4,
    category: 'profile',
    visibleFor: ['worker'],
    type: 'multi-select',
    required: true,
    fieldName: 'q4_secteurs', // Réutilise le champ secteurs
    labelKey: 'questions.q4_metiers.label',
    labelFallback: 'Métiers exercés',
    descriptionKey: 'questions.q4_metiers.description',
    descriptionFallback: 'Sélectionnez tous vos métiers',
    options: [
      { value: 'btp', labelKey: 'sectors.btp', labelFallback: 'BTP / Maçonnerie', icon: '🏗️' },
      { value: 'industrie', labelKey: 'sectors.industrie', labelFallback: 'Opérateur industriel', icon: '🏭' },
      { value: 'logistique', labelKey: 'sectors.logistique', labelFallback: 'Logistique / Magasinier', icon: '📦' },
      { value: 'hotellerie', labelKey: 'sectors.hotellerie', labelFallback: 'Hôtellerie / Service', icon: '🏨' },
      { value: 'sante', labelKey: 'sectors.sante', labelFallback: 'Aide-soignant', icon: '🏥' },
      { value: 'agriculture', labelKey: 'sectors.agriculture', labelFallback: 'Ouvrier agricole', icon: '🌾' },
      { value: 'autres', labelKey: 'sectors.autres', labelFallback: 'Autres', icon: '📋' },
    ],
  },

  // ========================================
  // SECTION 2 : EXPÉRIENCE DÉTACHEMENT / INTÉRIM
  // ========================================

  // Q5 : Pays d'origine (AGENCY)
  {
    id: 'q5_pays',
    section: 2,
    order: 1,
    category: 'experience',
    visibleFor: ['agency'],
    type: 'text',
    required: true,
    fieldName: 'q5_pays',
    labelKey: 'questions.q5_pays.label',
    labelFallback: 'Pays d\'origine de votre agence',
    placeholderKey: 'questions.q5_pays.placeholder',
    placeholderFallback: 'Ex: Pologne',
  },

  // Q5bis : Localisation entreprise (CLIENT)
  {
    id: 'q5_localisation',
    section: 2,
    order: 1,
    category: 'experience',
    visibleFor: ['client'],
    type: 'text',
    required: true,
    fieldName: 'q5_pays',
    labelKey: 'questions.q5_localisation.label',
    labelFallback: 'Pays de localisation de votre entreprise',
    placeholderKey: 'questions.q5_localisation.placeholder',
    placeholderFallback: 'Ex: France',
  },

  // Q5ter : Pays où vous travaillez (WORKER)
  {
    id: 'q5_pays_travail',
    section: 2,
    order: 1,
    category: 'experience',
    visibleFor: ['worker'],
    type: 'textarea',
    required: true,
    fieldName: 'q8_destinations', // Réutilise destinations
    labelKey: 'questions.q5_pays_travail.label',
    labelFallback: 'Pays où vous avez travaillé en intérim',
    placeholderKey: 'questions.q5_pays_travail.placeholder',
    placeholderFallback: 'Ex: France, Allemagne, Belgique...',
  },

  // Q6 : Volume détachements (AGENCY)
  {
    id: 'q6_volume',
    section: 2,
    order: 2,
    category: 'experience',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q6_volume',
    labelKey: 'questions.q6_volume.label',
    labelFallback: 'Volume annuel de détachements',
    options: [
      { value: '0', labelKey: 'questions.q6_volume.options.0', labelFallback: 'Aucun (pas encore)', icon: '⭕' },
      { value: '1-50', labelKey: 'questions.q6_volume.options.1-50', labelFallback: '1-50 travailleurs', icon: '📊' },
      { value: '51-200', labelKey: 'questions.q6_volume.options.51-200', labelFallback: '51-200 travailleurs', icon: '📈' },
      { value: '201-500', labelKey: 'questions.q6_volume.options.201-500', labelFallback: '201-500 travailleurs', icon: '🚀' },
      { value: '500+', labelKey: 'questions.q6_volume.options.500+', labelFallback: '500+ travailleurs', icon: '⭐' },
    ],
  },

  // Q6bis : Volume intérimaires (CLIENT)
  {
    id: 'q6_volume_client',
    section: 2,
    order: 2,
    category: 'experience',
    visibleFor: ['client'],
    type: 'radio',
    required: true,
    fieldName: 'q6_volume',
    labelKey: 'questions.q6_volume_client.label',
    labelFallback: 'Combien d\'intérimaires employez-vous par an ?',
    options: [
      { value: '0', labelKey: 'questions.q6_volume_client.options.0', labelFallback: 'Aucun actuellement', icon: '⭕' },
      { value: '1-10', labelKey: 'questions.q6_volume_client.options.1-10', labelFallback: '1-10 personnes', icon: '👤' },
      { value: '11-50', labelKey: 'questions.q6_volume_client.options.11-50', labelFallback: '11-50 personnes', icon: '👥' },
      { value: '51-200', labelKey: 'questions.q6_volume_client.options.51-200', labelFallback: '51-200 personnes', icon: '🏢' },
      { value: '200+', labelKey: 'questions.q6_volume_client.options.200+', labelFallback: '200+ personnes', icon: '🏛️' },
    ],
  },

  // Q6ter : Fréquence missions (WORKER)
  {
    id: 'q6_frequence',
    section: 2,
    order: 2,
    category: 'experience',
    visibleFor: ['worker'],
    type: 'radio',
    required: true,
    fieldName: 'q6_volume',
    labelKey: 'questions.q6_frequence.label',
    labelFallback: 'À quelle fréquence travaillez-vous en intérim ?',
    options: [
      { value: 'permanent', labelKey: 'questions.q6_frequence.options.permanent', labelFallback: 'Régulièrement (toute l\'année)', icon: '📅' },
      { value: 'saisonnier', labelKey: 'questions.q6_frequence.options.saisonnier', labelFallback: 'Saisonnier (certains mois)', icon: '🌞' },
      { value: 'occasionnel', labelKey: 'questions.q6_frequence.options.occasionnel', labelFallback: 'Occasionnel (quelques fois)', icon: '🔄' },
      { value: 'jamais', labelKey: 'questions.q6_frequence.options.jamais', labelFallback: 'Jamais encore (recherche)', icon: '🔍' },
    ],
  },

  // Q7 : Pays d'origine travailleurs (AGENCY only)
  {
    id: 'q7_origine',
    section: 2,
    order: 3,
    category: 'experience',
    visibleFor: ['agency'],
    type: 'text',
    required: false,
    fieldName: 'q7_origine',
    labelKey: 'questions.q7_origine.label',
    labelFallback: 'Pays d\'origine de vos travailleurs détachés',
    placeholderKey: 'questions.q7_origine.placeholder',
    placeholderFallback: 'Ex: Pologne, Ukraine, Roumanie...',
  },

  // Q8 : Destinations détachement (AGENCY)
  {
    id: 'q8_destinations',
    section: 2,
    order: 4,
    category: 'experience',
    visibleFor: ['agency'],
    type: 'textarea',
    required: true,
    fieldName: 'q8_destinations',
    labelKey: 'questions.q8_destinations.label',
    labelFallback: 'Pays de destination (où vous détachez)',
    placeholderKey: 'questions.q8_destinations.placeholder',
    placeholderFallback: 'Ex: France, Allemagne, Belgique, Pays-Bas...',
  },

  // Q8bis : Nationalités intérimaires (CLIENT only)
  {
    id: 'q8_nationalites',
    section: 2,
    order: 3,
    category: 'experience',
    visibleFor: ['client'],
    type: 'textarea',
    required: false,
    fieldName: 'q8_destinations',
    labelKey: 'questions.q8_nationalites.label',
    labelFallback: 'Nationalités des intérimaires que vous employez',
    placeholderKey: 'questions.q8_nationalites.placeholder',
    placeholderFallback: 'Ex: Polonais, Roumains, Bulgares...',
  },

  // Q9 : Principal défi (AGENCY)
  {
    id: 'q9_defi',
    section: 2,
    order: 5,
    category: 'experience',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q9_defi',
    labelKey: 'questions.q9_defi.label',
    labelFallback: 'Principal défi du détachement européen',
    options: [
      { value: 'admin', labelKey: 'questions.q9_defi.options.admin', labelFallback: 'Complexité administrative (A1, SIPSI...)', icon: '📋' },
      { value: 'conformite', labelKey: 'questions.q9_defi.options.conformite', labelFallback: 'Conformité légale multi-pays', icon: '⚖️' },
      { value: 'cout', labelKey: 'questions.q9_defi.options.cout', labelFallback: 'Coûts et temps de gestion', icon: '💰' },
      { value: 'langues', labelKey: 'questions.q9_defi.options.langues', labelFallback: 'Barrières linguistiques', icon: '🌐' },
      { value: 'autre', labelKey: 'questions.q9_defi.options.autre', labelFallback: 'Autre', icon: '❓' },
    ],
  },

  // Q9bis : Principal défi client (CLIENT)
  {
    id: 'q9_defi_client',
    section: 2,
    order: 4,
    category: 'experience',
    visibleFor: ['client'],
    type: 'radio',
    required: true,
    fieldName: 'q9_defi',
    labelKey: 'questions.q9_defi_client.label',
    labelFallback: 'Principal défi avec l\'intérim européen',
    options: [
      { value: 'trouver', labelKey: 'questions.q9_defi_client.options.trouver', labelFallback: 'Trouver des agences fiables', icon: '🔍' },
      { value: 'conformite', labelKey: 'questions.q9_defi_client.options.conformite', labelFallback: 'Conformité légale', icon: '⚖️' },
      { value: 'qualite', labelKey: 'questions.q9_defi_client.options.qualite', labelFallback: 'Qualité des candidats', icon: '⭐' },
      { value: 'cout', labelKey: 'questions.q9_defi_client.options.cout', labelFallback: 'Coûts trop élevés', icon: '💰' },
      { value: 'langues', labelKey: 'questions.q9_defi_client.options.langues', labelFallback: 'Communication / Langues', icon: '🌐' },
      { value: 'autre', labelKey: 'questions.q9_defi_client.options.autre', labelFallback: 'Autre', icon: '❓' },
    ],
  },

  // Q9ter : Principal défi worker (WORKER)
  {
    id: 'q9_defi_worker',
    section: 2,
    order: 3,
    category: 'experience',
    visibleFor: ['worker'],
    type: 'radio',
    required: true,
    fieldName: 'q9_defi',
    labelKey: 'questions.q9_defi_worker.label',
    labelFallback: 'Principal défi dans vos missions',
    options: [
      { value: 'trouver', labelKey: 'questions.q9_defi_worker.options.trouver', labelFallback: 'Trouver des missions', icon: '🔍' },
      { value: 'admin', labelKey: 'questions.q9_defi_worker.options.admin', labelFallback: 'Paperasse administrative', icon: '📋' },
      { value: 'logement', labelKey: 'questions.q9_defi_worker.options.logement', labelFallback: 'Logement / Hébergement', icon: '🏠' },
      { value: 'langue', labelKey: 'questions.q9_defi_worker.options.langue', labelFallback: 'Langue locale', icon: '🌐' },
      { value: 'paiement', labelKey: 'questions.q9_defi_worker.options.paiement', labelFallback: 'Paiements / Salaire', icon: '💰' },
      { value: 'autre', labelKey: 'questions.q9_defi_worker.options.autre', labelFallback: 'Autre', icon: '❓' },
    ],
  },

  // Q9_autre : Précision défi (ALL avec condition)
  {
    id: 'q9_autre',
    section: 2,
    order: 6,
    category: 'experience',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'text',
    required: false,
    fieldName: 'q9_autre',
    labelKey: 'questions.q9_autre.label',
    labelFallback: 'Précisez votre défi',
    placeholderKey: 'questions.q9_autre.placeholder',
    placeholderFallback: 'Décrivez...',
    conditional: {
      dependsOn: 'q9_defi',
      showWhen: 'autre',
    },
  },

  // Q10 : Mode de gestion (AGENCY)
  {
    id: 'q10_gestion',
    section: 2,
    order: 7,
    category: 'experience',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q10_gestion',
    labelKey: 'questions.q10_gestion.label',
    labelFallback: 'Comment gérez-vous vos détachements ?',
    options: [
      { value: 'interne', labelKey: 'questions.q10_gestion.options.interne', labelFallback: 'Équipe interne', icon: '👥' },
      { value: 'externe', labelKey: 'questions.q10_gestion.options.externe', labelFallback: 'Prestataire externe', icon: '🏢' },
      { value: 'mixte', labelKey: 'questions.q10_gestion.options.mixte', labelFallback: 'Mixte', icon: '🔄' },
      { value: 'manuel', labelKey: 'questions.q10_gestion.options.manuel', labelFallback: 'Gestion manuelle', icon: '📊' },
      { value: 'logiciel', labelKey: 'questions.q10_gestion.options.logiciel', labelFallback: 'Logiciel spécialisé', icon: '💻' },
    ],
  },

  // Q10bis : Agences utilisées (CLIENT)
  {
    id: 'q10_agences',
    section: 2,
    order: 5,
    category: 'experience',
    visibleFor: ['client'],
    type: 'radio',
    required: true,
    fieldName: 'q10_gestion',
    labelKey: 'questions.q10_agences.label',
    labelFallback: 'Combien d\'agences d\'intérim utilisez-vous ?',
    options: [
      { value: '0', labelKey: 'questions.q10_agences.options.0', labelFallback: 'Aucune', icon: '⭕' },
      { value: '1', labelKey: 'questions.q10_agences.options.1', labelFallback: '1 agence', icon: '🏢' },
      { value: '2-3', labelKey: 'questions.q10_agences.options.2-3', labelFallback: '2-3 agences', icon: '👥' },
      { value: '4-10', labelKey: 'questions.q10_agences.options.4-10', labelFallback: '4-10 agences', icon: '📊' },
      { value: '10+', labelKey: 'questions.q10_agences.options.10+', labelFallback: 'Plus de 10', icon: '🌐' },
    ],
  },

  // Q10ter : Agences utilisées (WORKER)
  {
    id: 'q10_agences_worker',
    section: 2,
    order: 4,
    category: 'experience',
    visibleFor: ['worker'],
    type: 'radio',
    required: true,
    fieldName: 'q10_gestion',
    labelKey: 'questions.q10_agences_worker.label',
    labelFallback: 'Avec combien d\'agences travaillez-vous ?',
    options: [
      { value: '1', labelKey: 'questions.q10_agences_worker.options.1', labelFallback: '1 seule agence', icon: '🏢' },
      { value: '2-3', labelKey: 'questions.q10_agences_worker.options.2-3', labelFallback: '2-3 agences', icon: '👥' },
      { value: '4-10', labelKey: 'questions.q10_agences_worker.options.4-10', labelFallback: '4-10 agences', icon: '📊' },
      { value: '10+', labelKey: 'questions.q10_agences_worker.options.10+', labelFallback: 'Plus de 10', icon: '🌐' },
    ],
  },

  // Q11 : Incidents conformité (AGENCY only)
  {
    id: 'q11_incidents',
    section: 2,
    order: 8,
    category: 'experience',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q11_incidents',
    labelKey: 'questions.q11_incidents.label',
    labelFallback: 'Avez-vous eu des incidents de conformité ?',
    options: [
      { value: 'jamais', labelKey: 'questions.q11_incidents.options.jamais', labelFallback: 'Non, jamais', icon: '✅' },
      { value: 'rarement', labelKey: 'questions.q11_incidents.options.rarement', labelFallback: 'Rarement (1-2 fois)', icon: '⚠️' },
      { value: 'parfois', labelKey: 'questions.q11_incidents.options.parfois', labelFallback: 'Parfois (3-5 fois)', icon: '🔴' },
      { value: 'souvent', labelKey: 'questions.q11_incidents.options.souvent', labelFallback: 'Souvent (6+ fois)', icon: '🚨' },
    ],
  },

  // ========================================
  // SECTION 3 : BESOINS & OUTILS
  // ========================================

  // Q12 : Budget détachement (AGENCY)
  {
    id: 'q12_budget',
    section: 3,
    order: 1,
    category: 'needs',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q12_budget',
    labelKey: 'questions.q12_budget.label',
    labelFallback: 'Budget actuel pour la gestion du détachement',
    options: [
      { value: '0-5k', labelKey: 'questions.q12_budget.options.0-5k', labelFallback: '0-5 000 € / an', icon: '💵' },
      { value: '5-15k', labelKey: 'questions.q12_budget.options.5-15k', labelFallback: '5 000-15 000 € / an', icon: '💰' },
      { value: '15-30k', labelKey: 'questions.q12_budget.options.15-30k', labelFallback: '15 000-30 000 € / an', icon: '💸' },
      { value: '30k+', labelKey: 'questions.q12_budget.options.30k+', labelFallback: '30 000+ € / an', icon: '🏦' },
      { value: 'inconnu', labelKey: 'questions.q12_budget.options.inconnu', labelFallback: 'Je ne sais pas', icon: '❓' },
    ],
  },

  // Q12bis : Budget intérim (CLIENT)
  {
    id: 'q12_budget_client',
    section: 3,
    order: 1,
    category: 'needs',
    visibleFor: ['client'],
    type: 'radio',
    required: true,
    fieldName: 'q12_budget',
    labelKey: 'questions.q12_budget_client.label',
    labelFallback: 'Budget annuel consacré à l\'intérim',
    options: [
      { value: '0-50k', labelKey: 'questions.q12_budget_client.options.0-50k', labelFallback: '0-50 000 €', icon: '💵' },
      { value: '50-200k', labelKey: 'questions.q12_budget_client.options.50-200k', labelFallback: '50 000-200 000 €', icon: '💰' },
      { value: '200-500k', labelKey: 'questions.q12_budget_client.options.200-500k', labelFallback: '200 000-500 000 €', icon: '💸' },
      { value: '500k+', labelKey: 'questions.q12_budget_client.options.500k+', labelFallback: '500 000+ €', icon: '🏦' },
      { value: 'inconnu', labelKey: 'questions.q12_budget_client.options.inconnu', labelFallback: 'Je ne sais pas', icon: '❓' },
    ],
  },

  // Q12ter : Salaire moyen (WORKER)
  {
    id: 'q12_salaire',
    section: 3,
    order: 1,
    category: 'needs',
    visibleFor: ['worker'],
    type: 'radio',
    required: true,
    fieldName: 'q12_budget',
    labelKey: 'questions.q12_salaire.label',
    labelFallback: 'Salaire mensuel moyen de vos missions',
    options: [
      { value: '<1500', labelKey: 'questions.q12_salaire.options.<1500', labelFallback: 'Moins de 1 500 €', icon: '💵' },
      { value: '1500-2500', labelKey: 'questions.q12_salaire.options.1500-2500', labelFallback: '1 500-2 500 €', icon: '💰' },
      { value: '2500-3500', labelKey: 'questions.q12_salaire.options.2500-3500', labelFallback: '2 500-3 500 €', icon: '💸' },
      { value: '3500+', labelKey: 'questions.q12_salaire.options.3500+', labelFallback: '3 500+ €', icon: '🏦' },
    ],
  },

  // Q13 : Manque à gagner (AGENCY)
  {
    id: 'q13_manque_gagner',
    section: 3,
    order: 2,
    category: 'needs',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q13_manque_gagner',
    labelKey: 'questions.q13_manque_gagner.label',
    labelFallback: 'Manque à gagner dû aux contraintes du détachement ?',
    options: [
      { value: 'non', labelKey: 'questions.q13_manque_gagner.options.non', labelFallback: 'Non, pas vraiment', icon: '✅' },
      { value: 'faible', labelKey: 'questions.q13_manque_gagner.options.faible', labelFallback: 'Oui, faible (< 5% CA)', icon: '📉' },
      { value: 'moyen', labelKey: 'questions.q13_manque_gagner.options.moyen', labelFallback: 'Oui, moyen (5-15% CA)', icon: '📊' },
      { value: 'important', labelKey: 'questions.q13_manque_gagner.options.important', labelFallback: 'Oui, important (> 15% CA)', icon: '🔴' },
    ],
  },

  // Q13bis : Satisfaction agences (CLIENT)
  {
    id: 'q13_satisfaction',
    section: 3,
    order: 2,
    category: 'needs',
    visibleFor: ['client'],
    type: 'radio',
    required: true,
    fieldName: 'q13_manque_gagner',
    labelKey: 'questions.q13_satisfaction.label',
    labelFallback: 'Satisfaction avec vos agences actuelles',
    options: [
      { value: 'tres_satisfait', labelKey: 'questions.q13_satisfaction.options.tres_satisfait', labelFallback: 'Très satisfait', icon: '⭐' },
      { value: 'satisfait', labelKey: 'questions.q13_satisfaction.options.satisfait', labelFallback: 'Satisfait', icon: '✅' },
      { value: 'neutre', labelKey: 'questions.q13_satisfaction.options.neutre', labelFallback: 'Neutre', icon: '😐' },
      { value: 'insatisfait', labelKey: 'questions.q13_satisfaction.options.insatisfait', labelFallback: 'Peu satisfait', icon: '📉' },
      { value: 'tres_insatisfait', labelKey: 'questions.q13_satisfaction.options.tres_insatisfait', labelFallback: 'Très insatisfait', icon: '🔴' },
    ],
  },

  // Q13ter : Satisfaction agences (WORKER)
  {
    id: 'q13_satisfaction_worker',
    section: 3,
    order: 2,
    category: 'needs',
    visibleFor: ['worker'],
    type: 'radio',
    required: true,
    fieldName: 'q13_manque_gagner',
    labelKey: 'questions.q13_satisfaction_worker.label',
    labelFallback: 'Satisfaction avec vos agences actuelles',
    options: [
      { value: 'tres_satisfait', labelKey: 'questions.q13_satisfaction_worker.options.tres_satisfait', labelFallback: 'Très satisfait', icon: '⭐' },
      { value: 'satisfait', labelKey: 'questions.q13_satisfaction_worker.options.satisfait', labelFallback: 'Satisfait', icon: '✅' },
      { value: 'neutre', labelKey: 'questions.q13_satisfaction_worker.options.neutre', labelFallback: 'Neutre', icon: '😐' },
      { value: 'insatisfait', labelKey: 'questions.q13_satisfaction_worker.options.insatisfait', labelFallback: 'Peu satisfait', icon: '📉' },
      { value: 'tres_insatisfait', labelKey: 'questions.q13_satisfaction_worker.options.tres_insatisfait', labelFallback: 'Très insatisfait', icon: '🔴' },
    ],
  },

  // Q14 : Préoccupations risques (AGENCY)
  {
    id: 'q14_risques',
    section: 3,
    order: 3,
    category: 'needs',
    visibleFor: ['agency'],
    type: 'multi-select',
    required: true,
    fieldName: 'q14_risques',
    labelKey: 'questions.q14_risques.label',
    labelFallback: 'Quels risques vous préoccupent le plus ?',
    options: [
      { value: 'amendes', labelKey: 'questions.q14_risques.options.amendes', labelFallback: 'Amendes et sanctions', icon: '💸' },
      { value: 'reputation', labelKey: 'questions.q14_risques.options.reputation', labelFallback: 'Réputation / Image', icon: '🏆' },
      { value: 'penal', labelKey: 'questions.q14_risques.options.penal', labelFallback: 'Responsabilité pénale', icon: '⚖️' },
      { value: 'delais', labelKey: 'questions.q14_risques.options.delais', labelFallback: 'Retards missions', icon: '⏰' },
      { value: 'clients', labelKey: 'questions.q14_risques.options.clients', labelFallback: 'Perte de clients', icon: '📉' },
      { value: 'aucun', labelKey: 'questions.q14_risques.options.aucun', labelFallback: 'Aucun risque majeur', icon: '✅' },
    ],
  },

  // Q14bis : Préoccupations client (CLIENT)
  {
    id: 'q14_risques_client',
    section: 3,
    order: 3,
    category: 'needs',
    visibleFor: ['client'],
    type: 'multi-select',
    required: true,
    fieldName: 'q14_risques',
    labelKey: 'questions.q14_risques_client.label',
    labelFallback: 'Quels risques vous préoccupent le plus ?',
    options: [
      { value: 'conformite', labelKey: 'questions.q14_risques_client.options.conformite', labelFallback: 'Non-conformité légale', icon: '⚖️' },
      { value: 'qualite', labelKey: 'questions.q14_risques_client.options.qualite', labelFallback: 'Qualité insuffisante', icon: '📉' },
      { value: 'fiabilite', labelKey: 'questions.q14_risques_client.options.fiabilite', labelFallback: 'Fiabilité agences', icon: '🏢' },
      { value: 'cout', labelKey: 'questions.q14_risques_client.options.cout', labelFallback: 'Coûts imprévus', icon: '💸' },
      { value: 'disponibilite', labelKey: 'questions.q14_risques_client.options.disponibilite', labelFallback: 'Disponibilité candidats', icon: '⏰' },
      { value: 'aucun', labelKey: 'questions.q14_risques_client.options.aucun', labelFallback: 'Aucun risque majeur', icon: '✅' },
    ],
  },

  // Q14ter : Préoccupations worker (WORKER)
  {
    id: 'q14_risques_worker',
    section: 3,
    order: 3,
    category: 'needs',
    visibleFor: ['worker'],
    type: 'multi-select',
    required: true,
    fieldName: 'q14_risques',
    labelKey: 'questions.q14_risques_worker.label',
    labelFallback: 'Quels problèmes rencontrez-vous le plus souvent ?',
    options: [
      { value: 'paiement', labelKey: 'questions.q14_risques_worker.options.paiement', labelFallback: 'Retards de paiement', icon: '💸' },
      { value: 'conditions', labelKey: 'questions.q14_risques_worker.options.conditions', labelFallback: 'Mauvaises conditions', icon: '🔴' },
      { value: 'contrat', labelKey: 'questions.q14_risques_worker.options.contrat', labelFallback: 'Contrats non respectés', icon: '📋' },
      { value: 'logement', labelKey: 'questions.q14_risques_worker.options.logement', labelFallback: 'Logement inadéquat', icon: '🏠' },
      { value: 'communication', labelKey: 'questions.q14_risques_worker.options.communication', labelFallback: 'Problèmes communication', icon: '🌐' },
      { value: 'aucun', labelKey: 'questions.q14_risques_worker.options.aucun', labelFallback: 'Aucun problème majeur', icon: '✅' },
    ],
  },

  // Q15 : Plus gros problème (AGENCY)
  {
    id: 'q15_probleme',
    section: 3,
    order: 4,
    category: 'needs',
    visibleFor: ['agency'],
    type: 'textarea',
    required: true,
    fieldName: 'q15_probleme',
    labelKey: 'questions.q15_probleme.label',
    labelFallback: 'Quel est votre plus gros problème avec le détachement ?',
    placeholderKey: 'questions.q15_probleme.placeholder',
    placeholderFallback: 'Décrivez en quelques phrases...',
  },

  // Q15bis : Besoins prioritaires (CLIENT)
  {
    id: 'q15_besoins_client',
    section: 3,
    order: 4,
    category: 'needs',
    visibleFor: ['client'],
    type: 'textarea',
    required: true,
    fieldName: 'q15_probleme',
    labelKey: 'questions.q15_besoins_client.label',
    labelFallback: 'Quels sont vos besoins prioritaires ?',
    placeholderKey: 'questions.q15_besoins_client.placeholder',
    placeholderFallback: 'Ex: Trouver rapidement, meilleure qualité, prix...',
  },

  // Q15ter : Améliorations souhaitées (WORKER)
  {
    id: 'q15_ameliorations',
    section: 3,
    order: 4,
    category: 'needs',
    visibleFor: ['worker'],
    type: 'textarea',
    required: true,
    fieldName: 'q15_probleme',
    labelKey: 'questions.q15_ameliorations.label',
    labelFallback: 'Qu\'aimeriez-vous améliorer dans vos missions ?',
    placeholderKey: 'questions.q15_ameliorations.placeholder',
    placeholderFallback: 'Ex: Salaire, logement, support, stabilité...',
  },

  // Q16 : ERP utilisé (AGENCY only)
  {
    id: 'q16_erp',
    section: 3,
    order: 5,
    category: 'needs',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q16_erp',
    labelKey: 'questions.q16_erp.label',
    labelFallback: 'Utilisez-vous un ERP ou logiciel de gestion ?',
    options: [
      { value: 'sage', labelKey: 'questions.q16_erp.options.sage', labelFallback: 'Sage', icon: '📘' },
      { value: 'sap', labelKey: 'questions.q16_erp.options.sap', labelFallback: 'SAP', icon: '🔷' },
      { value: 'cegid', labelKey: 'questions.q16_erp.options.cegid', labelFallback: 'Cegid', icon: '📗' },
      { value: 'bullhorn', labelKey: 'questions.q16_erp.options.bullhorn', labelFallback: 'Bullhorn / ATS', icon: '🎯' },
      { value: 'autre', labelKey: 'questions.q16_erp.options.autre', labelFallback: 'Autre', icon: '💼' },
      { value: 'aucun', labelKey: 'questions.q16_erp.options.aucun', labelFallback: 'Aucun ERP', icon: '❌' },
    ],
  },

  // Q16_autre : Précision ERP (AGENCY only)
  {
    id: 'q16_autre',
    section: 3,
    order: 6,
    category: 'needs',
    visibleFor: ['agency'],
    type: 'text',
    required: false,
    fieldName: 'q16_autre',
    labelKey: 'questions.q16_autre.label',
    labelFallback: 'Précisez votre ERP',
    placeholderKey: 'questions.q16_autre.placeholder',
    placeholderFallback: 'Nom du logiciel...',
    conditional: {
      dependsOn: 'q16_erp',
      showWhen: 'autre',
    },
  },

  // Q17 : Migration vers nouvelle solution (AGENCY only)
  {
    id: 'q17_migration',
    section: 3,
    order: 7,
    category: 'needs',
    visibleFor: ['agency'],
    type: 'radio',
    required: true,
    fieldName: 'q17_migration',
    labelKey: 'questions.q17_migration.label',
    labelFallback: 'Prêt à migrer vers une nouvelle solution ?',
    options: [
      { value: 'oui', labelKey: 'questions.q17_migration.options.oui', labelFallback: 'Oui, sans problème', icon: '✅' },
      { value: 'conditions', labelKey: 'questions.q17_migration.options.conditions', labelFallback: 'Oui, sous conditions', icon: '⚠️' },
      { value: 'difficile', labelKey: 'questions.q17_migration.options.difficile', labelFallback: 'Difficile, mais ouvert', icon: '🤔' },
      { value: 'non', labelKey: 'questions.q17_migration.options.non', labelFallback: 'Non, pas envisageable', icon: '❌' },
    ],
  },

  // ========================================
  // SECTION 4 : INTÉRÊT PLATEFORME YOJOB
  // ========================================

  // Q18 : Score d'intérêt (ALL)
  {
    id: 'q18_score',
    section: 4,
    order: 1,
    category: 'interest',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'score',
    required: true,
    fieldName: 'q18_score',
    labelKey: 'questions.q18_score.label',
    labelFallback: 'Intérêt pour une plateforme YoJob (0-10)',
    descriptionKey: 'questions.q18_score.description',
    descriptionFallback: '0 = Pas intéressé, 10 = Très intéressé',
  },

  // Q19 : Fonctionnalités intéressantes (AGENCY)
  {
    id: 'q19_features',
    section: 4,
    order: 2,
    category: 'interest',
    visibleFor: ['agency'],
    type: 'multi-select',
    required: true,
    fieldName: 'q19_features',
    labelKey: 'questions.q19_features.label',
    labelFallback: 'Fonctionnalités les plus intéressantes',
    options: [
      { value: 'sipsi', labelKey: 'questions.q19_features.options.sipsi', labelFallback: 'Déclaration SIPSI auto', icon: '🤖' },
      { value: 'a1', labelKey: 'questions.q19_features.options.a1', labelFallback: 'Gestion certificats A1', icon: '📜' },
      { value: 'conformite', labelKey: 'questions.q19_features.options.conformite', labelFallback: 'Dashboard conformité', icon: '📊' },
      { value: 'alertes', labelKey: 'questions.q19_features.options.alertes', labelFallback: 'Alertes & renouvellements', icon: '🔔' },
      { value: 'documents', labelKey: 'questions.q19_features.options.documents', labelFallback: 'Centralisation documents', icon: '📁' },
      { value: 'marketplace', labelKey: 'questions.q19_features.options.marketplace', labelFallback: 'Marketplace agences', icon: '🛒' },
      { value: 'support', labelKey: 'questions.q19_features.options.support', labelFallback: 'Support expert multilingue', icon: '💬' },
      { value: 'api', labelKey: 'questions.q19_features.options.api', labelFallback: 'Intégration API (ERP)', icon: '🔌' },
    ],
  },

  // Q19bis : Fonctionnalités intéressantes (CLIENT)
  {
    id: 'q19_features_client',
    section: 4,
    order: 2,
    category: 'interest',
    visibleFor: ['client'],
    type: 'multi-select',
    required: true,
    fieldName: 'q19_features',
    labelKey: 'questions.q19_features_client.label',
    labelFallback: 'Fonctionnalités les plus intéressantes',
    options: [
      { value: 'recherche', labelKey: 'questions.q19_features_client.options.recherche', labelFallback: 'Recherche agences fiables', icon: '🔍' },
      { value: 'comparaison', labelKey: 'questions.q19_features_client.options.comparaison', labelFallback: 'Comparaison prix/qualité', icon: '⚖️' },
      { value: 'avis', labelKey: 'questions.q19_features_client.options.avis', labelFallback: 'Avis vérifiés', icon: '⭐' },
      { value: 'conformite', labelKey: 'questions.q19_features_client.options.conformite', labelFallback: 'Garantie conformité', icon: '📊' },
      { value: 'support', labelKey: 'questions.q19_features_client.options.support', labelFallback: 'Support dédié', icon: '💬' },
      { value: 'facturation', labelKey: 'questions.q19_features_client.options.facturation', labelFallback: 'Facturation centralisée', icon: '💳' },
      { value: 'suivi', labelKey: 'questions.q19_features_client.options.suivi', labelFallback: 'Suivi temps réel', icon: '📈' },
    ],
  },

  // Q19ter : Fonctionnalités intéressantes (WORKER)
  {
    id: 'q19_features_worker',
    section: 4,
    order: 2,
    category: 'interest',
    visibleFor: ['worker'],
    type: 'multi-select',
    required: true,
    fieldName: 'q19_features',
    labelKey: 'questions.q19_features_worker.label',
    labelFallback: 'Fonctionnalités les plus intéressantes',
    options: [
      { value: 'recherche', labelKey: 'questions.q19_features_worker.options.recherche', labelFallback: 'Recherche missions', icon: '🔍' },
      { value: 'avis', labelKey: 'questions.q19_features_worker.options.avis', labelFallback: 'Avis sur agences', icon: '⭐' },
      { value: 'logement', labelKey: 'questions.q19_features_worker.options.logement', labelFallback: 'Aide logement', icon: '🏠' },
      { value: 'paiement', labelKey: 'questions.q19_features_worker.options.paiement', labelFallback: 'Paiement sécurisé', icon: '💳' },
      { value: 'support', labelKey: 'questions.q19_features_worker.options.support', labelFallback: 'Support dans ma langue', icon: '💬' },
      { value: 'documents', labelKey: 'questions.q19_features_worker.options.documents', labelFallback: 'Aide documents admin', icon: '📋' },
      { value: 'formation', labelKey: 'questions.q19_features_worker.options.formation', labelFallback: 'Formations qualifiantes', icon: '🎓' },
    ],
  },

  // Q20 : Modèle de tarification (ALL)
  {
    id: 'q20_prix',
    section: 4,
    order: 3,
    category: 'interest',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'radio',
    required: true,
    fieldName: 'q20_prix',
    labelKey: 'questions.q20_prix.label',
    labelFallback: 'Modèle de tarification préféré',
    options: [
      { value: 'mensuel', labelKey: 'questions.q20_prix.options.mensuel', labelFallback: 'Abonnement mensuel fixe', icon: '📆' },
      { value: 'usage', labelKey: 'questions.q20_prix.options.usage', labelFallback: 'Pay-as-you-go (à l\'usage)', icon: '💳' },
      { value: 'annuel', labelKey: 'questions.q20_prix.options.annuel', labelFallback: 'Forfait annuel (réduction)', icon: '🎁' },
      { value: 'gratuit', labelKey: 'questions.q20_prix.options.gratuit', labelFallback: 'Gratuit pour workers', icon: '✨' },
    ],
  },

  // Q21 : Budget mensuel (AGENCY & CLIENT)
  {
    id: 'q21_budget_mensuel',
    section: 4,
    order: 4,
    category: 'interest',
    visibleFor: ['agency', 'client'],
    type: 'radio',
    required: true,
    fieldName: 'q21_budget_mensuel',
    labelKey: 'questions.q21_budget_mensuel.label',
    labelFallback: 'Budget mensuel acceptable',
    options: [
      { value: '0-100', labelKey: 'questions.q21_budget_mensuel.options.0-100', labelFallback: '0-100 € / mois', icon: '💵' },
      { value: '100-300', labelKey: 'questions.q21_budget_mensuel.options.100-300', labelFallback: '100-300 € / mois', icon: '💰' },
      { value: '300-500', labelKey: 'questions.q21_budget_mensuel.options.300-500', labelFallback: '300-500 € / mois', icon: '💸' },
      { value: '500-1000', labelKey: 'questions.q21_budget_mensuel.options.500-1000', labelFallback: '500-1 000 € / mois', icon: '💎' },
      { value: '1000+', labelKey: 'questions.q21_budget_mensuel.options.1000+', labelFallback: '1 000+ € / mois', icon: '🏦' },
    ],
  },

  // Q22 : Test MVP (ALL)
  {
    id: 'q22_mvp',
    section: 4,
    order: 5,
    category: 'interest',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'radio',
    required: true,
    fieldName: 'q22_mvp',
    labelKey: 'questions.q22_mvp.label',
    labelFallback: 'Prêt à tester un MVP (version beta) ?',
    options: [
      { value: 'oui_gratuit', labelKey: 'questions.q22_mvp.options.oui_gratuit', labelFallback: 'Oui, gratuitement', icon: '🎁' },
      { value: 'oui_reduc', labelKey: 'questions.q22_mvp.options.oui_reduc', labelFallback: 'Oui, avec réduction', icon: '💰' },
      { value: 'peut_etre', labelKey: 'questions.q22_mvp.options.peut_etre', labelFallback: 'Peut-être, selon features', icon: '🤔' },
      { value: 'non', labelKey: 'questions.q22_mvp.options.non', labelFallback: 'Non, pas intéressé', icon: '❌' },
    ],
  },

  // Q23 : Rôle dans décision (AGENCY & CLIENT)
  {
    id: 'q23_role',
    section: 4,
    order: 6,
    category: 'interest',
    visibleFor: ['agency', 'client'],
    type: 'radio',
    required: true,
    fieldName: 'q23_role',
    labelKey: 'questions.q23_role.label',
    labelFallback: 'Rôle dans la décision d\'achat',
    options: [
      { value: 'decideur', labelKey: 'questions.q23_role.options.decideur', labelFallback: 'Décideur final', icon: '👑' },
      { value: 'influenceur', labelKey: 'questions.q23_role.options.influenceur', labelFallback: 'Influenceur / Recommandation', icon: '🎯' },
      { value: 'utilisateur', labelKey: 'questions.q23_role.options.utilisateur', labelFallback: 'Utilisateur final', icon: '👤' },
      { value: 'autre', labelKey: 'questions.q23_role.options.autre', labelFallback: 'Autre', icon: '❓' },
    ],
  },

  // ========================================
  // SECTION 5 : VISION FUTURE
  // ========================================

  // Q24 : Vision évolution marché (AGENCY & CLIENT)
  {
    id: 'q24_evolution',
    section: 5,
    order: 1,
    category: 'vision',
    visibleFor: ['agency', 'client'],
    type: 'textarea',
    required: true,
    fieldName: 'q24_evolution',
    labelKey: 'questions.q24_evolution.label',
    labelFallback: 'Vision du marché dans les 3 prochaines années',
    placeholderKey: 'questions.q24_evolution.placeholder',
    placeholderFallback: 'Partagez votre vision...',
  },

  // Q24bis : Aspirations futures (WORKER)
  {
    id: 'q24_aspirations',
    section: 5,
    order: 1,
    category: 'vision',
    visibleFor: ['worker'],
    type: 'textarea',
    required: true,
    fieldName: 'q24_evolution',
    labelKey: 'questions.q24_aspirations.label',
    labelFallback: 'Vos aspirations professionnelles futures',
    placeholderKey: 'questions.q24_aspirations.placeholder',
    placeholderFallback: 'Ex: CDI, retour au pays, formation...',
  },

  // Q25 : Autres besoins / suggestions (ALL)
  {
    id: 'q25_besoins',
    section: 5,
    order: 2,
    category: 'vision',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'textarea',
    required: false,
    fieldName: 'q25_besoins',
    labelKey: 'questions.q25_besoins.label',
    labelFallback: 'Autres besoins ou suggestions',
    placeholderKey: 'questions.q25_besoins.placeholder',
    placeholderFallback: 'Vos suggestions nous intéressent...',
  },

  // ========================================
  // SECTION 6 : CONTACT
  // ========================================

  // Q26 : Téléphone professionnel (AGENCY & CLIENT)
  {
    id: 'q26_phone',
    section: 6,
    order: 1,
    category: 'contact',
    visibleFor: ['agency', 'client'],
    type: 'text',
    required: true,
    fieldName: 'q26_phone',
    labelKey: 'questions.q26_phone.label',
    labelFallback: 'Téléphone professionnel',
    placeholderKey: 'questions.q26_phone.placeholder',
    placeholderFallback: '+33 6 12 34 56 78',
  },

  // Q27 : Prénom (ALL)
  {
    id: 'q27_firstname',
    section: 6,
    order: 2,
    category: 'contact',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'text',
    required: true,
    fieldName: 'q27_firstname',
    labelKey: 'questions.q27_firstname.label',
    labelFallback: 'Prénom',
    placeholderKey: 'questions.q27_firstname.placeholder',
    placeholderFallback: 'Votre prénom',
  },

  // Q28 : Nom (ALL)
  {
    id: 'q28_lastname',
    section: 6,
    order: 3,
    category: 'contact',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'text',
    required: true,
    fieldName: 'q28_lastname',
    labelKey: 'questions.q28_lastname.label',
    labelFallback: 'Nom',
    placeholderKey: 'questions.q28_lastname.placeholder',
    placeholderFallback: 'Votre nom',
  },

  // Q29 : SIRET/SIREN (AGENCY & CLIENT - optionnel)
  {
    id: 'q29_siret',
    section: 6,
    order: 4,
    category: 'contact',
    visibleFor: ['agency', 'client'],
    type: 'text',
    required: false,
    fieldName: 'q29_siret',
    labelKey: 'questions.q29_siret.label',
    labelFallback: 'SIRET ou SIREN (optionnel)',
    placeholderKey: 'questions.q29_siret.placeholder',
    placeholderFallback: '123 456 789 00012',
    descriptionKey: 'questions.q29_siret.description',
    descriptionFallback: 'Pour enrichissement via Pappers/Société.com',
  },

  // Q30 : Email professionnel (ALL)
  {
    id: 'email',
    section: 6,
    order: 5,
    category: 'contact',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'email',
    required: true,
    fieldName: 'email',
    labelKey: 'questions.email.label',
    labelFallback: 'Email',
    placeholderKey: 'questions.email.placeholder',
    placeholderFallback: 'votre.email@exemple.com',
  },

  // Q31 : Autorisation contact (ALL)
  {
    id: 'autorise_contact',
    section: 6,
    order: 6,
    category: 'contact',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'checkbox',
    required: false,
    fieldName: 'autorise_contact',
    labelKey: 'questions.autorise_contact.label',
    labelFallback: 'J\'accepte d\'être recontacté',
  },

  // Q32 : Rapport d'étude (ALL)
  {
    id: 'souhaite_rapport',
    section: 6,
    order: 7,
    category: 'contact',
    visibleFor: ['agency', 'client', 'worker'],
    type: 'checkbox',
    required: false,
    fieldName: 'souhaite_rapport',
    labelKey: 'questions.souhaite_rapport.label',
    labelFallback: 'Je souhaite recevoir le rapport d\'étude',
  },
];

/**
 * 🔢 COMPTEUR DE QUESTIONS PAR PROFIL
 */
export const QUESTION_COUNT_BY_PROFILE: Record<RespondentType, number> = {
  agency: 30,  // 26 questions de base + 4 nouveaux champs contact
  client: 22,  // 18 questions de base + 4 nouveaux champs contact
  worker: 17,  // 15 questions de base + 2 nouveaux champs contact (prénom, nom)
};

/**
 * ⏱️ TEMPS ESTIMÉ PAR PROFIL (en minutes)
 */
export const ESTIMATED_TIME_BY_PROFILE: Record<RespondentType, string> = {
  agency: '9-11 min',  // Augmenté avec nouveaux champs
  client: '7-8 min',   // Augmenté avec nouveaux champs
  worker: '5-6 min',   // Légèrement augmenté
};

/**
 * 🔍 FONCTIONS HELPER
 */
export function getQuestionsByProfile(profile: RespondentType): QuestionConfig[] {
  return SURVEY_QUESTIONS.filter(q => q.visibleFor.includes(profile));
}

export function getQuestionsBySection(section: number, profile: RespondentType): QuestionConfig[] {
  return SURVEY_QUESTIONS.filter(
    q => q.section === section && q.visibleFor.includes(profile)
  );
}

// Alias pour compatibilité avec useQuestionVisibility
export function getQuestionsForSection(sectionId: number, respondentType: RespondentType): QuestionConfig[] {
  return getQuestionsBySection(sectionId, respondentType);
}

export function getQuestionById(id: string): QuestionConfig | undefined {
  return SURVEY_QUESTIONS.find(q => q.id === id);
}

export function getTotalQuestions(profile: RespondentType): number {
  return getQuestionsByProfile(profile).length;
}

export function getRequiredQuestions(profile: RespondentType): QuestionConfig[] {
  return getQuestionsByProfile(profile).filter(q => q.required);
}