/**
 * 🎯 HOOK USE QUESTIONS
 * 
 * Gère les questions avec système d'override :
 * - Base : /config/survey-questions.ts
 * - Overrides : KV store
 * - Fusion automatique au runtime
 */

import { useState, useEffect, useCallback } from 'react';
import { SURVEY_QUESTIONS } from '../config/survey-questions';
import type { QuestionConfig } from '../config/survey-questions';
import type { RespondentType } from '../types/survey';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface UseQuestionsResult {
  questions: QuestionConfig[];
  isLoading: boolean;
  error: string | null;
  refreshQuestions: () => Promise<void>;
  saveQuestion: (questionId: string, updates: Partial<QuestionConfig>) => Promise<void>;
  createQuestion: (question: Partial<QuestionConfig>) => Promise<string>;
  deleteQuestion: (questionId: string) => Promise<void>;
  restoreQuestion: (questionId: string) => Promise<void>;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/questions`;

export function useQuestions(profile?: RespondentType): UseQuestionsResult {
  const [questions, setQuestions] = useState<QuestionConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fusionne les questions de base avec les overrides
   */
  const mergeQuestionsWithOverrides = useCallback((overrides: Record<string, any>): QuestionConfig[] => {
    const merged = SURVEY_QUESTIONS.map(baseQuestion => {
      const override = overrides[baseQuestion.id];
      
      // Si la question est marquée comme supprimée, la filtrer
      if (override?.deleted) {
        return null;
      }
      
      // Fusionner l'override avec la base
      if (override) {
        return {
          ...baseQuestion,
          ...override,
          id: baseQuestion.id, // Garder l'ID de base
          labelKey: baseQuestion.labelKey, // Garder les clés de traduction
          placeholderKey: baseQuestion.placeholderKey,
        };
      }
      
      return baseQuestion;
    }).filter(Boolean) as QuestionConfig[];

    // Ajouter les nouvelles questions créées via l'interface
    Object.entries(overrides).forEach(([questionId, override]) => {
      if (override.isNew && !override.deleted) {
        merged.push({
          id: questionId,
          type: override.type || 'text',
          section: override.section || 1,
          order: override.order || 999,
          required: override.required || false,
          fieldName: override.fieldName || questionId,
          labelKey: `questions.${questionId}.label`,
          labelFallback: override.labelFallback || 'Nouvelle question',
          visibleFor: override.visibleFor || ['agency'],
          placeholderKey: `questions.${questionId}.placeholder`,
          placeholderFallback: override.placeholderFallback || '',
          descriptionKey: `questions.${questionId}.description`,
          descriptionFallback: override.descriptionFallback || '',
          options: override.options || [],
        });
      }
    });

    // Trier par section puis order
    merged.sort((a, b) => {
      if (a.section !== b.section) return a.section - b.section;
      return a.order - b.order;
    });

    return merged;
  }, []);

  /**
   * Charge les questions avec overrides depuis l'API
   */
  const refreshQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_BASE, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors du chargement des questions');
      }

      let mergedQuestions = mergeQuestionsWithOverrides(data.overrides || {});

      // Filtrer par profil si spécifié
      if (profile) {
        mergedQuestions = mergedQuestions.filter(q => q.visibleFor.includes(profile));
      }

      setQuestions(mergedQuestions);
      console.log(`✅ [useQuestions] Loaded ${mergedQuestions.length} questions`);

    } catch (err: any) {
      console.error('❌ [useQuestions] Error loading questions:', err);
      setError(err.message);
      
      // En cas d'erreur, utiliser les questions de base
      let fallbackQuestions = [...SURVEY_QUESTIONS];
      if (profile) {
        fallbackQuestions = fallbackQuestions.filter(q => q.visibleFor.includes(profile));
      }
      setQuestions(fallbackQuestions);
      
    } finally {
      setIsLoading(false);
    }
  }, [profile, mergeQuestionsWithOverrides]);

  /**
   * Sauvegarde une question (modification)
   */
  const saveQuestion = useCallback(async (questionId: string, updates: Partial<QuestionConfig>) => {
    try {
      const response = await fetch(`${API_BASE}/${questionId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la sauvegarde');
      }

      console.log(`✅ [useQuestions] Question saved: ${questionId}`);
      
      // Rafraîchir la liste
      await refreshQuestions();

    } catch (err: any) {
      console.error('❌ [useQuestions] Error saving question:', err);
      throw err;
    }
  }, [refreshQuestions]);

  /**
   * Crée une nouvelle question
   */
  const createQuestion = useCallback(async (question: Partial<QuestionConfig>): Promise<string> => {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la création');
      }

      console.log(`✅ [useQuestions] Question created: ${data.questionId}`);
      
      // Rafraîchir la liste
      await refreshQuestions();

      return data.questionId;

    } catch (err: any) {
      console.error('❌ [useQuestions] Error creating question:', err);
      throw err;
    }
  }, [refreshQuestions]);

  /**
   * Supprime une question (soft delete)
   */
  const deleteQuestion = useCallback(async (questionId: string) => {
    try {
      const response = await fetch(`${API_BASE}/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la suppression');
      }

      console.log(`✅ [useQuestions] Question deleted: ${questionId}`);
      
      // Rafraîchir la liste
      await refreshQuestions();

    } catch (err: any) {
      console.error('❌ [useQuestions] Error deleting question:', err);
      throw err;
    }
  }, [refreshQuestions]);

  /**
   * Restaure une question supprimée
   */
  const restoreQuestion = useCallback(async (questionId: string) => {
    try {
      const response = await fetch(`${API_BASE}/${questionId}/restore`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la restauration');
      }

      console.log(`✅ [useQuestions] Question restored: ${questionId}`);
      
      // Rafraîchir la liste
      await refreshQuestions();

    } catch (err: any) {
      console.error('❌ [useQuestions] Error restoring question:', err);
      throw err;
    }
  }, [refreshQuestions]);

  // Charger les questions au montage
  useEffect(() => {
    refreshQuestions();
  }, [refreshQuestions]);

  return {
    questions,
    isLoading,
    error,
    refreshQuestions,
    saveQuestion,
    createQuestion,
    deleteQuestion,
    restoreQuestion,
  };
}