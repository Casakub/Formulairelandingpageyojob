/**
 * 🛠️ HELPERS POUR LE FORMULAIRE D'ENQUÊTE
 * 
 * Fonctions utilitaires pour gérer l'affichage et la logique du formulaire
 * multi-profils avec questions conditionnelles
 * 
 * Version: 3.0.0
 * Date: 11 Décembre 2024
 */

import { SURVEY_QUESTIONS, getQuestionsByProfile, type QuestionConfig } from '../config/survey-questions-COMPLETE';
import type { RespondentType } from '../types/survey';

/**
 * Obtenir les questions visibles pour un profil donné
 * Triées par section puis ordre
 */
export function getVisibleQuestions(profileType: RespondentType): QuestionConfig[] {
  return getQuestionsByProfile(profileType)
    .sort((a, b) => {
      // D'abord par section
      if (a.section !== b.section) {
        return a.section - b.section;
      }
      // Puis par ordre
      return a.order - b.order;
    });
}

/**
 * Vérifier si une question conditionnelle doit être affichée
 * 
 * @param question - La question à vérifier
 * @param formData - Les données du formulaire actuel
 * @returns true si la question doit être affichée
 */
export function shouldShowConditionalQuestion(
  question: QuestionConfig,
  formData: Record<string, any>
): boolean {
  // Si pas de condition, toujours afficher
  if (!question.conditional) {
    return true;
  }

  const { dependsOn, showWhen } = question.conditional;
  const parentValue = formData[dependsOn];

  // Si le parent n'a pas de valeur, ne pas afficher
  if (!parentValue) {
    return false;
  }

  // Vérifier si la valeur parent correspond à showWhen
  if (Array.isArray(showWhen)) {
    return showWhen.includes(parentValue);
  }

  return parentValue === showWhen;
}

/**
 * Obtenir toutes les questions à afficher pour un profil
 * En tenant compte des conditions
 * 
 * @param profileType - Type de profil (agency/client/worker)
 * @param formData - Données actuelles du formulaire
 * @returns Questions filtrées et triées
 */
export function getQuestionsToDisplay(
  profileType: RespondentType,
  formData: Record<string, any> = {}
): QuestionConfig[] {
  const allQuestions = getVisibleQuestions(profileType);

  return allQuestions.filter(question => 
    shouldShowConditionalQuestion(question, formData)
  );
}

/**
 * Obtenir les questions par section
 * 
 * @param profileType - Type de profil
 * @param formData - Données du formulaire
 * @returns Map de section -> questions
 */
export function getQuestionsBySection(
  profileType: RespondentType,
  formData: Record<string, any> = {}
): Map<number, QuestionConfig[]> {
  const questions = getQuestionsToDisplay(profileType, formData);
  const sectionMap = new Map<number, QuestionConfig[]>();

  questions.forEach(question => {
    const sectionQuestions = sectionMap.get(question.section) || [];
    sectionQuestions.push(question);
    sectionMap.set(question.section, sectionQuestions);
  });

  return sectionMap;
}

/**
 * Obtenir le titre de section
 */
export const SECTION_TITLES: Record<number, { fr: string; en: string; icon: string }> = {
  1: { fr: 'Profil', en: 'Profile', icon: '👤' },
  2: { fr: 'Expérience', en: 'Experience', icon: '💼' },
  3: { fr: 'Besoins', en: 'Needs', icon: '🎯' },
  4: { fr: 'Intérêt', en: 'Interest', icon: '✨' },
  5: { fr: 'Vision', en: 'Vision', icon: '🔮' },
  6: { fr: 'Contact', en: 'Contact', icon: '📧' },
};

/**
 * Calculer la progression du formulaire
 * 
 * @param formData - Données actuelles du formulaire
 * @param profileType - Type de profil
 * @returns Pourcentage de complétion (0-100)
 */
export function calculateProgress(
  formData: Record<string, any>,
  profileType: RespondentType
): number {
  const questionsToDisplay = getQuestionsToDisplay(profileType, formData);
  const requiredQuestions = questionsToDisplay.filter(q => q.required);
  
  if (requiredQuestions.length === 0) {
    return 100;
  }

  const answeredRequired = requiredQuestions.filter(q => {
    const value = formData[q.fieldName];
    
    // Pour les arrays (multi-select)
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    
    // Pour les autres types
    return value !== null && value !== undefined && value !== '';
  }).length;

  return Math.round((answeredRequired / requiredQuestions.length) * 100);
}

/**
 * Calculer la progression par section
 * 
 * @param formData - Données actuelles du formulaire
 * @param profileType - Type de profil
 * @returns Map de section -> pourcentage
 */
export function calculateSectionProgress(
  formData: Record<string, any>,
  profileType: RespondentType
): Map<number, number> {
  const sectionMap = getQuestionsBySection(profileType, formData);
  const progressMap = new Map<number, number>();

  sectionMap.forEach((questions, section) => {
    const requiredQuestions = questions.filter(q => q.required);
    
    if (requiredQuestions.length === 0) {
      progressMap.set(section, 100);
      return;
    }

    const answeredRequired = requiredQuestions.filter(q => {
      const value = formData[q.fieldName];
      
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      
      return value !== null && value !== undefined && value !== '';
    }).length;

    const percentage = Math.round((answeredRequired / requiredQuestions.length) * 100);
    progressMap.set(section, percentage);
  });

  return progressMap;
}

/**
 * Vérifier si une section est complète
 * 
 * @param section - Numéro de section
 * @param formData - Données du formulaire
 * @param profileType - Type de profil
 * @returns true si toutes les questions obligatoires sont remplies
 */
export function isSectionComplete(
  section: number,
  formData: Record<string, any>,
  profileType: RespondentType
): boolean {
  const sectionProgress = calculateSectionProgress(formData, profileType);
  return (sectionProgress.get(section) || 0) === 100;
}

/**
 * Obtenir la prochaine question non répondue
 * 
 * @param formData - Données actuelles du formulaire
 * @param profileType - Type de profil
 * @returns La prochaine question requise sans réponse, ou null
 */
export function getNextUnansweredQuestion(
  formData: Record<string, any>,
  profileType: RespondentType
): QuestionConfig | null {
  const questions = getQuestionsToDisplay(profileType, formData);
  const requiredQuestions = questions.filter(q => q.required);

  for (const question of requiredQuestions) {
    const value = formData[question.fieldName];
    
    const isEmpty = Array.isArray(value) 
      ? value.length === 0
      : (value === null || value === undefined || value === '');

    if (isEmpty) {
      return question;
    }
  }

  return null;
}

/**
 * Obtenir le nombre total de questions pour un profil
 */
export function getTotalQuestions(profileType: RespondentType): number {
  return getQuestionsByProfile(profileType).length;
}

/**
 * Obtenir le nombre de questions obligatoires
 */
export function getRequiredQuestionsCount(
  profileType: RespondentType,
  formData: Record<string, any> = {}
): number {
  const questions = getQuestionsToDisplay(profileType, formData);
  return questions.filter(q => q.required).length;
}

/**
 * Valider les réponses du formulaire
 * 
 * @param formData - Données du formulaire
 * @param profileType - Type de profil
 * @returns { valid: boolean, errors: Record<fieldName, message> }
 */
export function validateFormData(
  formData: Record<string, any>,
  profileType: RespondentType
): { valid: boolean; errors: Record<string, string> } {
  const questions = getQuestionsToDisplay(profileType, formData);
  const errors: Record<string, string> = {};

  questions.forEach(question => {
    if (!question.required) return;

    const value = formData[question.fieldName];
    
    // Vérifier si vide
    const isEmpty = Array.isArray(value)
      ? value.length === 0
      : (value === null || value === undefined || value === '');

    if (isEmpty) {
      errors[question.fieldName] = `${question.labelFallback} est obligatoire`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Obtenir les statistiques du formulaire
 */
export function getFormStats(
  formData: Record<string, any>,
  profileType: RespondentType
): {
  totalQuestions: number;
  requiredQuestions: number;
  answeredQuestions: number;
  answeredRequired: number;
  progress: number;
  isComplete: boolean;
} {
  const questions = getQuestionsToDisplay(profileType, formData);
  const requiredQuestions = questions.filter(q => q.required);

  const answeredQuestions = questions.filter(q => {
    const value = formData[q.fieldName];
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined && value !== '';
  }).length;

  const answeredRequired = requiredQuestions.filter(q => {
    const value = formData[q.fieldName];
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined && value !== '';
  }).length;

  const progress = requiredQuestions.length > 0
    ? Math.round((answeredRequired / requiredQuestions.length) * 100)
    : 100;

  return {
    totalQuestions: questions.length,
    requiredQuestions: requiredQuestions.length,
    answeredQuestions,
    answeredRequired,
    progress,
    isComplete: progress === 100,
  };
}

/**
 * Obtenir une question par fieldName
 */
export function getQuestionByFieldName(
  fieldName: string,
  profileType: RespondentType
): QuestionConfig | undefined {
  const questions = getQuestionsByProfile(profileType);
  return questions.find(q => q.fieldName === fieldName);
}

/**
 * Obtenir une question par ID
 */
export function getQuestionById(
  id: string,
  profileType: RespondentType
): QuestionConfig | undefined {
  const questions = getQuestionsByProfile(profileType);
  return questions.find(q => q.id === id);
}

/**
 * Export de tous les helpers
 */
export const SurveyHelpers = {
  getVisibleQuestions,
  shouldShowConditionalQuestion,
  getQuestionsToDisplay,
  getQuestionsBySection,
  calculateProgress,
  calculateSectionProgress,
  isSectionComplete,
  getNextUnansweredQuestion,
  getTotalQuestions,
  getRequiredQuestionsCount,
  validateFormData,
  getFormStats,
  getQuestionByFieldName,
  getQuestionById,
  SECTION_TITLES,
};
