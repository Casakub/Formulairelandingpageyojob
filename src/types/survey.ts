/**
 * 🎯 TYPES CENTRALISÉS POUR LE SYSTÈME D'ENQUÊTE MULTI-PROFILS
 * 
 * Ce fichier définit tous les types TypeScript pour le système d'enquête
 * avec support de 3 types de répondants : Agences, Clients, Intérimaires
 */

/**
 * Type de répondant à l'enquête
 */
export type RespondentType = 'agency' | 'client' | 'worker';

/**
 * Métadonnées d'un profil de répondant
 */
export interface RespondentProfile {
  type: RespondentType;
  label: string;
  labelKey: string;
  description: string;
  descriptionKey: string;
  icon: 'building' | 'briefcase' | 'user-check';
  color: 'orange' | 'blue' | 'green';
  totalQuestions: number;
  estimatedTime: string;
}

/**
 * Configuration des profils de répondants
 */
export const RESPONDENT_PROFILES: Record<RespondentType, RespondentProfile> = {
  agency: {
    type: 'agency',
    label: 'Agence de travail temporaire',
    labelKey: 'respondent.agency.label',
    description: 'Vous êtes une agence ETT européenne. Partagez votre expérience du détachement.',
    descriptionKey: 'respondent.agency.description',
    icon: 'building',
    color: 'orange',
    totalQuestions: 26,
    estimatedTime: '15 min',
  },
  client: {
    type: 'client',
    label: 'Entreprise cliente',
    labelKey: 'respondent.client.label',
    description: 'Vous recrutez des intérimaires. Partagez vos besoins et attentes.',
    descriptionKey: 'respondent.client.description',
    icon: 'briefcase',
    color: 'blue',
    totalQuestions: 18,
    estimatedTime: '10 min',
  },
  worker: {
    type: 'worker',
    label: 'Travailleur intérimaire',
    labelKey: 'respondent.worker.label',
    description: 'Vous travaillez en intérim. Partagez votre expérience terrain.',
    descriptionKey: 'respondent.worker.description',
    icon: 'user-check',
    color: 'green',
    totalQuestions: 18,
    estimatedTime: '10 min',
  },
};

/**
 * Mapping des types de répondants vers les types de prospects CRM
 */
export const RESPONDENT_TO_PROSPECT_TYPE: Record<RespondentType, string> = {
  agency: 'agency',
  client: 'client',
  worker: 'interim',
};

/**
 * Mapping des types de répondants vers les sources
 */
export const RESPONDENT_TO_SOURCE: Record<RespondentType, string> = {
  agency: 'survey_agency',
  client: 'survey_client',
  worker: 'survey_worker',
};

/**
 * FormData étendu avec le type de répondant
 */
export interface ExtendedFormData {
  // Meta
  respondent_type: RespondentType;
  
  // ========== QUESTIONS COMMUNES (tous profils) ==========
  q_common_1_pays: string;                    // Pays d'origine
  q_common_2_secteurs: string[];              // Secteurs d'activité
  q_common_3_taille: string;                  // Taille organisation
  q_common_4_volume: string;                  // Volume annuel (recrutements/détachements)
  q_common_5_defis: string;                   // Principaux défis
  q_common_5_autre: string;                   // Autre défi (si applicable)
  q_common_6_outils: string;                  // Outils/ERP utilisés
  q_common_6_autre: string;                   // Autre outil (si applicable)
  q_common_7_budget: string;                  // Budget mensuel
  q_common_8_score: number;                   // Intérêt pour solution européenne (1-10)
  q_common_9_features: string[];              // Fonctionnalités prioritaires
  q_common_10_email: string;                  // Email de contact
  q_common_10_autorise_contact: boolean;      // Consentement contact
  q_common_10_souhaite_rapport: boolean;      // Souhaite rapport résultats
  
  // ========== QUESTIONS AGENCES SPÉCIFIQUES ==========
  q_agency_1_nom: string;                     // Nom de l'agence
  q_agency_2_annee: string;                   // Année de création
  q_agency_3_origine: string;                 // Pays d'origine des travailleurs détachés
  q_agency_4_destinations: string;            // Pays de destination
  q_agency_5_gestion: string;                 // Gestion conformité
  q_agency_6_incidents: string;               // Incidents juridiques
  q_agency_7_budget_outils: string;           // Budget annuel outils
  q_agency_8_manque_gagner: string;           // Manque à gagner estimé
  q_agency_9_risques: string;                 // Niveau de risques juridiques
  q_agency_10_probleme: string;               // Problème le plus urgent
  q_agency_11_migration: string;              // Ouvert à migration logiciel
  q_agency_12_mvp: string;                    // Fonctionnalité MVP critique
  q_agency_13_role: string;                   // Rôle dans décision
  q_agency_14_evolution: string;              // Vision évolution marché
  q_agency_15_besoins: string;                // Besoins futurs
  q_agency_16_partenariats: string;           // Partenariats existants
  
  // ========== QUESTIONS CLIENTS SPÉCIFIQUES ==========
  q_client_1_nom: string;                     // Nom de l'entreprise
  q_client_2_volume_embauches: string;        // Volume d'embauches/an
  q_client_3_process: string;                 // Process actuel de recrutement
  q_client_4_delai: string;                   // Délai moyen d'embauche
  q_client_5_budget_annuel: string;           // Budget recrutement annuel
  q_client_6_difficulte: number;              // Difficulté recrutement (1-10)
  q_client_7_experience_detachement: string;  // Expérience détachement européen
  q_client_8_freins: string[];                // Freins principaux
  
  // ========== QUESTIONS INTÉRIMAIRES SPÉCIFIQUES ==========
  q_worker_1_nom: string;                     // Prénom + Nom
  q_worker_2_experience: string;              // Années d'expérience intérim
  q_worker_3_metiers: string[];               // Métiers exercés
  q_worker_4_pays_travailles: string[];       // Pays où travaillé
  q_worker_5_satisfaction: number;            // Satisfaction missions (1-10)
  q_worker_6_problemes: string[];             // Problèmes rencontrés
  q_worker_7_attentes: string;                // Attentes plateforme européenne
  q_worker_8_mobilite: string;                // Disponibilité mobilité
}

/**
 * Données de réponse pour sauvegarde en base de données
 */
export interface SurveyResponseData {
  response_id: string;
  respondent_type: RespondentType;
  country: string;
  interest_level: string;
  responses: Record<string, any>;
  submitted_at: string;
  language_code?: string;
}

/**
 * Structure d'une question avec visibilité conditionnelle
 */
export interface SurveyQuestion {
  id: string;
  section: number;
  order: number;
  code: string;
  type: 'text' | 'textarea' | 'radio' | 'multi-select' | 'number' | 'email' | 'score' | 'checkbox';
  label: string;
  labelKey?: string;
  placeholder?: string;
  placeholderKey?: string;
  required: boolean;
  options?: Array<{ value: string; label: string; labelKey?: string; icon?: string }>;
  visible: boolean;
  
  // 🔥 NOUVEAUTÉ : Visibilité par type de répondant
  visibleFor: RespondentType[];
  
  // Conditionnalité (déjà existant)
  conditional?: {
    dependsOn: string;
    showWhen: string;
  };
  
  // Catégorie de question
  category: 'common' | 'agency' | 'client' | 'worker';
}

/**
 * Configuration d'une section avec support multi-profils
 */
export interface SurveySection {
  id: number;
  labelKey: string;
  labelFallback: string;
  icon: string;
  questions: number;
  time: string;
  
  // 🔥 NOUVEAUTÉ : Sections conditionnelles par profil
  visibleFor?: RespondentType[];
  
  // Questions de cette section
  questionIds: string[];
}
