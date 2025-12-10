/**
 * 🎯 HOOK PERSONNALISÉ : useQuestionVisibility
 * 
 * Gère la visibilité des questions selon le type de répondant et les conditions
 */

import { useMemo } from 'react';
import type { RespondentType } from '../types/survey';
import { getQuestionsForSection, type QuestionConfig } from '../config/survey-questions';

interface UseQuestionVisibilityProps {
  sectionId: number;
  respondentType: RespondentType;
  formData: Record<string, any>;
}

export function useQuestionVisibility({
  sectionId,
  respondentType,
  formData,
}: UseQuestionVisibilityProps) {
  // Filtre les questions par section et type de répondant
  const sectionQuestions = useMemo(
    () => getQuestionsForSection(sectionId, respondentType),
    [sectionId, respondentType]
  );

  // Filtre en plus les questions avec conditions (ex: q9_autre si q9_defi = "Autre")
  const visibleQuestions = useMemo(() => {
    return sectionQuestions.filter((question) => {
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
  }, [sectionQuestions, formData]);

  return {
    questions: visibleQuestions,
    totalQuestions: sectionQuestions.length,
  };
}
