/**
 * 🎯 HOOK PERSONNALISÉ : useQuestionVisibility
 * 
 * Gère la visibilité des questions selon le type de répondant et les conditions
 * 🔄 Charge les questions depuis l'API avec overrides (synchronisé avec dashboard)
 */

import { useMemo, useState, useEffect } from 'react';
import type { RespondentType } from '../types/survey';
import { SURVEY_QUESTIONS, type QuestionConfig } from '../config/survey-questions';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface UseQuestionVisibilityProps {
  sectionId: number;
  respondentType: RespondentType;
  formData: Record<string, any>;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/questions`;

export function useQuestionVisibility({
  sectionId,
  respondentType,
  formData,
}: UseQuestionVisibilityProps) {
  const [allQuestions, setAllQuestions] = useState<QuestionConfig[]>(SURVEY_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);

  // 🔄 Charge les questions avec overrides depuis l'API
  useEffect(() => {
    const loadQuestions = async () => {
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

        // Fusionner les questions de base avec les overrides
        const overrides = data.overrides || {};
        
        const mergedQuestions = SURVEY_QUESTIONS.map(baseQuestion => {
          const override = overrides[baseQuestion.id];
          
          // Si la question est marquée comme supprimée, la filtrer
          if (override?.deleted) {
            return null;
          }
          
          // Fusionner l'override avec la base ET enrichir avec les clés i18n
          if (override) {
            const merged = { ...baseQuestion, ...override };
            
            // ✅ Enrichir avec les clés i18n si elles manquent (SANS le profil pour l'instant)
            // ⚠️ IMPORTANT : Ne JAMAIS utiliser override.label/placeholder/description comme fallback
            // Car ils peuvent être en anglais et écraser les traductions françaises !
            return {
              ...merged,
              labelKey: merged.labelKey || `questions.${baseQuestion.id}.label`,
              labelFallback: baseQuestion.labelFallback, // ✅ Toujours utiliser le fallback de la config de base
              placeholderKey: merged.placeholderKey || `questions.${baseQuestion.id}.placeholder`,
              placeholderFallback: baseQuestion.placeholderFallback || '', // ✅ Toujours utiliser le fallback de la config de base
              // ⚠️ NE CRÉER descriptionKey QUE si elle existe vraiment
              ...(merged.descriptionKey || baseQuestion.descriptionFallback ? {
                descriptionKey: merged.descriptionKey || `questions.${baseQuestion.id}.description`,
                descriptionFallback: baseQuestion.descriptionFallback || '', // ✅ Toujours utiliser le fallback de la config de base
              } : {}),
              // Enrichir les options si elles existent
              options: (override.options || merged.options || []).map((opt: any, idx: number) => {
                // Trouver l'option correspondante dans la config de base
                const baseOption = baseQuestion.options?.find((bo: any) => bo.value === opt.value);
                return {
                  value: opt.value,
                  labelKey: opt.labelKey || `questions.${baseQuestion.id}.options.${opt.value}`,
                  labelFallback: baseOption?.labelFallback || opt.value, // ✅ Utiliser le fallback de la config de base
                  icon: opt.icon || baseOption?.icon,
                };
              }),
            };
          }
          
          // ✅ Même sans override, enrichir les options avec les clés i18n
          if (baseQuestion.options && baseQuestion.options.length > 0) {
            return {
              ...baseQuestion,
              options: baseQuestion.options.map((opt: any) => ({
                value: opt.value,
                labelKey: opt.labelKey || `questions.${baseQuestion.id}.options.${opt.value}`,
                labelFallback: opt.labelFallback || opt.value,
                icon: opt.icon,
              })),
            };
          }
          
          return baseQuestion;
        }).filter(Boolean) as QuestionConfig[];

        // Ajouter les nouvelles questions créées via l'interface
        Object.entries(overrides).forEach(([questionId, override]: [string, any]) => {
          if (override.isNew && !override.deleted) {
            mergedQuestions.push({
              id: questionId,
              type: override.type || 'text',
              section: override.section || 1,
              order: override.order || 999,
              category: override.category || 'profile',
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
        mergedQuestions.sort((a, b) => {
          if (a.section !== b.section) return a.section - b.section;
          return a.order - b.order;
        });

        console.log(`✅ [useQuestionVisibility] Loaded ${mergedQuestions.length} questions from API`);
        setAllQuestions(mergedQuestions);

      } catch (error: any) {
        console.error('❌ [useQuestionVisibility] Error loading questions:', error);
        console.warn('⚠️ [useQuestionVisibility] Using SURVEY_QUESTIONS as fallback');
        
        // ✅ Enrichir les options même en mode fallback
        const enrichedQuestions = SURVEY_QUESTIONS.map(q => {
          if (q.options && q.options.length > 0) {
            return {
              ...q,
              options: q.options.map((opt: any) => ({
                value: opt.value,
                labelKey: opt.labelKey || `questions.${q.id}.options.${opt.value}`,
                labelFallback: opt.labelFallback || opt.value,
                icon: opt.icon,
              })),
            };
          }
          return q;
        });
        
        setAllQuestions(enrichedQuestions);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Filtre les questions par section et type de répondant
  const sectionQuestions = useMemo(
    () => allQuestions.filter(q => q.section === sectionId && q.visibleFor.includes(respondentType)),
    [allQuestions, sectionId, respondentType]
  );

  // Filtre en plus les questions avec conditions (ex: q9_autre si q9_defi = "Autre")
  const visibleQuestions = useMemo(() => {
    const filtered = sectionQuestions.filter((question) => {
      // Si la question n'a pas de condition, elle est visible
      if (!question.conditional) {
        return true;
      }

      // Sinon, vérifie la condition
      const { dependsOn, showWhen } = question.conditional;
      const dependencyValue = formData[dependsOn];

      // Support pour plusieurs valeurs possibles
      if (Array.isArray(showWhen)) {
        return showWhen.includes(dependencyValue);
      }

      // Valeur unique
      return dependencyValue === showWhen;
    });
    
    // ✅ NE PLUS enrichir avec le profil - les clés sont déjà correctes
    // Les labelKey dans survey-questions-COMPLETE.ts sont déjà au bon format
    return filtered;
  }, [sectionQuestions, formData]);

  return {
    questions: visibleQuestions,
    totalQuestions: sectionQuestions.length,
    isLoading,
  };
}