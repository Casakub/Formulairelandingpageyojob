/**
 * 🌍 TYPES DU SYSTÈME I18N v2.0
 * 
 * Système de traduction typé et évolutif pour questionnaire multi-profils
 * Génération automatique + audit + fallback intelligent
 * 
 * @version 2.0.0
 * @date 11 Décembre 2024
 */

import type { SURVEY_QUESTIONS } from '../../config/survey-questions-COMPLETE';

/**
 * Langues supportées (22 langues européennes)
 */
export type SupportedLanguage = 
  | 'fr' // Français
  | 'en' // English
  | 'de' // Deutsch
  | 'es' // Español
  | 'it' // Italiano
  | 'pt' // Português
  | 'nl' // Nederlands
  | 'pl' // Polski
  | 'ro' // Română
  | 'bg' // Български
  | 'hu' // Magyar
  | 'cz' // Čeština
  | 'sk' // Slovenčina
  | 'hr' // Hrvatski
  | 'sl' // Slovenščina
  | 'lt' // Lietuvių
  | 'lv' // Latviešu
  | 'ee' // Eesti
  | 'el' // Ελληνικά
  | 'sv' // Svenska
  | 'da' // Dansk
  | 'fi'; // Suomi

/**
 * IDs de questions dérivés du fichier source de vérité
 * Garantit que seules les questions existantes peuvent être référencées
 */
export type QuestionId = typeof SURVEY_QUESTIONS[number]['id'];

/**
 * Métadonnées d'une traduction
 * Permet de tracer l'origine et la qualité des traductions
 */
export interface TranslationMetadata {
  /** Date de dernière mise à jour (ISO format) */
  _lastUpdated: string;
  
  /** Nom du traducteur (optionnel) */
  _translatedBy?: string;
  
  /** Indique si la traduction nécessite une révision */
  _needsReview?: boolean;
  
  /** Texte FR source au moment de la traduction (pour détecter les changements de wording) */
  _sourceFR?: string;
  
  /** Source de la traduction (generated, manual, migrated, ai) */
  _origin?: 'generated' | 'manual' | 'migrated' | 'ai';
}

/**
 * Traduction d'une question
 */
export interface QuestionTranslation {
  /** Libellé de la question */
  label?: string;
  
  /** Placeholder pour les champs input */
  placeholder?: string;
  
  /** Description/aide supplémentaire */
  description?: string;
  
  /** Traductions des options (pour select, radio, checkbox) */
  options?: {
    [optionValue: string]: string;
  };
  
  /** Métadonnées de traduction (optionnel) */
  _meta?: TranslationMetadata;
}

/**
 * Traduction complète d'une section navigation
 */
export interface NavigationTranslations {
  section1: string; // Profil
  section2: string; // Expérience / Détachement
  section3: string; // Besoins / Budget
  section4: string; // Intérêt YoJob
  section5: string; // Vision Future
  section6: string; // Contact
}

/**
 * Traductions des boutons
 */
export interface ButtonTranslations {
  previous: string;
  next: string;
  submit: string;
  submitting: string;
}

/**
 * Traductions des descriptions de sections
 */
export interface SectionDescriptions {
  description: string;
}

/**
 * Traductions communes (labels génériques)
 */
export interface CommonTranslations {
  // Actions
  oui: string;
  non: string;
  autre: string;
  loading: string;
  submit: string;
  next: string;
  previous: string;
  skip: string;
  save: string;
  cancel: string;
  close: string;
  
  // Validation
  required: string;
  optional: string;
  error: string;
  success: string;
  
  // États
  completed: string;
  inProgress: string;
  notStarted: string;
  
  // Profils
  profileAgency: string;
  profileClient: string;
  profileWorker: string;
}

/**
 * Traductions des secteurs d'activité
 */
export interface SectorTranslations {
  btp: string;
  industrie: string;
  logistique: string;
  hotellerie: string;
  sante: string;
  agriculture: string;
  tech: string;
  autres: string;
}

/**
 * Bundle complet de traductions pour une langue
 */
export interface TranslationBundle {
  /** Navigation entre sections */
  nav: NavigationTranslations;
  
  /** Boutons de navigation et actions */
  button?: ButtonTranslations;
  
  /** Descriptions des sections 1-6 */
  section1?: SectionDescriptions;
  section2?: SectionDescriptions;
  section3?: SectionDescriptions;
  section4?: SectionDescriptions;
  section5?: SectionDescriptions;
  section6?: SectionDescriptions;
  
  /** Textes communs réutilisables */
  common: CommonTranslations;
  
  /** Secteurs d'activité */
  sectors: SectorTranslations;
  
  /** Traductions des questions du questionnaire */
  questions: {
    [questionId: string]: QuestionTranslation;
  };
  
  /** Métadonnées globales du bundle */
  _meta?: TranslationMetadata;
}

/**
 * Ensemble de tous les bundles de traduction (une entrée par langue)
 */
export type TranslationsByLanguage = Record<SupportedLanguage, TranslationBundle>;

/**
 * Métadonnées d'une langue supportée
 */
export interface LanguageMetadata {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  completeness?: number; // Pourcentage de traduction (0-100)
}

/**
 * Résultat d'un audit de traduction
 */
export interface TranslationAuditResult {
  language: SupportedLanguage;
  totalKeys: number;
  translatedKeys: number;
  missingKeys: string[];
  obsoleteKeys: string[];
  needsReviewKeys: string[];
  completeness: number; // Pourcentage
  lastChecked: string; // ISO date
}

/**
 * Options pour la fonction getTranslation
 */
export interface GetTranslationOptions {
  /** Profil du répondant (pour traductions contextuelles) */
  profile?: 'agency' | 'client' | 'worker';
  
  /** Variables à interpoler dans la traduction */
  variables?: Record<string, string | number>;
  
  /** Valeur par défaut si traduction manquante */
  fallback?: string;
  
  /** Désactiver le fallback FR automatique */
  noFallback?: boolean;
}