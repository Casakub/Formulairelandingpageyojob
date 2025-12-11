import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Question, DEFAULT_QUESTIONS, QuestionConfig, SURVEY_QUESTIONS } from '../config/survey-questions-COMPLETE';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface QuestionsContextType {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  toggleQuestionVisibility: (id: string) => void;
  reorderQuestions: (activeId: string, overId: string) => void;
  getQuestionsBySection: (section: number) => Question[];
  getVisibleQuestionsBySection: (section: number) => Question[];
  isLoading: boolean;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

/**
 * Convertit QuestionConfig (nouveau format avec i18n) en Question (ancien format simple)
 */
function convertQuestionConfigToQuestion(config: QuestionConfig): Question {
  // Mapper les IDs du nouveau format au format ancien
  const idMap: Record<string, string> = {
    'q1_nom': 'q1',
    'q2_annee': 'q2',
    'q3_taille': 'q3',
    'q4_secteurs': 'q4',
    'q5_pays': 'q5',
    'q6_annees_marche': 'q6',
    'q7_salaries_interimaires': 'q7',
    'q8_marche_principal': 'q8',
    'q9_satisfaction_legislation': 'q9',
    'q10_difficultes': 'q10',
    'q11_collaboration_europeenne': 'q11',
    'q12_types_collaboration': 'q12',
    'q13_pays_collaboration': 'q13',
    'q14_avantages_collaboration': 'q14',
    'q15_defis_collaboration': 'q15',
    'q16_solutions_souhaitees': 'q16',
    'q17_marketplace_interet': 'q17',
    'q18_marketplace_fonctionnalites': 'q18',
    'q19_marketplace_prix': 'q19',
    'q20_marketplace_freins': 'q20',
    'q21_services_complementaires': 'q21',
    'q22_vision_futur': 'q22',
    'q23_email': 'q23',
    'q24_telephone': 'q24',
    'q25_role': 'q25',
    'q26_newsletter': 'q26',
    // Nouveaux profils
    'q2_annee_client': 'q2_client',
    'q2_nationalite': 'q2_worker',
  };
  
  const oldId = idMap[config.id] || config.id;
  
  return {
    id: oldId,
    section: config.section,
    order: config.order,
    code: config.fieldName,
    type: config.type as any,
    label: config.labelFallback,
    placeholder: config.placeholderFallback,
    required: config.required,
    options: config.options?.map(opt => ({
      value: opt.value,
      label: opt.labelFallback,
      icon: opt.icon,
    })),
    visible: true,  // Par défaut visible (pas de système deleted dans l'ancien format)
    conditional: config.conditional,
    visibleFor: config.visibleFor,
    category: config.category,
  };
}

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 🔄 Charge les questions depuis l'API (avec overrides du KV Store)
   */
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      
      try {
        const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/questions`;
        
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
          
          // Fusionner l'override avec la base
          const merged = override ? { ...baseQuestion, ...override } : baseQuestion;
          
          // Convertir au format Question (ancien)
          return convertQuestionConfigToQuestion(merged);
        }).filter(Boolean) as Question[];

        // Ajouter les nouvelles questions créées via l'interface
        Object.entries(overrides).forEach(([questionId, override]: [string, any]) => {
          if (override.isNew && !override.deleted) {
            const newQuestionConfig: QuestionConfig = {
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
            };
            mergedQuestions.push(convertQuestionConfigToQuestion(newQuestionConfig));
          }
        });

        // Trier par section puis order
        mergedQuestions.sort((a, b) => {
          if (a.section !== b.section) return a.section - b.section;
          return a.order - b.order;
        });

        console.log(`✅ [QuestionsContext] Loaded ${mergedQuestions.length} questions from API`);
        setQuestions(mergedQuestions);

      } catch (error: any) {
        console.error('❌ [QuestionsContext] Error loading questions:', error);
        // En cas d'erreur, utiliser les questions par défaut
        console.warn('⚠️ [QuestionsContext] Using DEFAULT_QUESTIONS as fallback');
        setQuestions(DEFAULT_QUESTIONS);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const addQuestion = (question: Question) => {
    console.log('➕ Adding question to context:', question);
    setQuestions(prev => {
      const newQuestions = [...prev, question];
      console.log('✅ Questions after add:', newQuestions.length);
      return newQuestions;
    });
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const toggleQuestionVisibility = (id: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, visible: !q.visible } : q))
    );
  };

  const getQuestionsBySection = (section: number) => {
    return questions
      .filter(q => q.section === section)
      .sort((a, b) => a.order - b.order);
  };

  const getVisibleQuestionsBySection = (section: number) => {
    return questions
      .filter(q => q.section === section && q.visible)
      .sort((a, b) => a.order - b.order);
  };

  const reorderQuestions = (activeId: string, overId: string) => {
    const activeIndex = questions.findIndex(q => q.id === activeId);
    const overIndex = questions.findIndex(q => q.id === overId);

    if (activeIndex === -1 || overIndex === -1) return;

    const newQuestions = [...questions];
    const [movedQuestion] = newQuestions.splice(activeIndex, 1);
    newQuestions.splice(overIndex, 0, movedQuestion);

    // Update order property
    const updatedQuestions = newQuestions.map((q, index) => ({
      ...q,
      order: index + 1
    }));

    setQuestions(updatedQuestions);
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        toggleQuestionVisibility,
        reorderQuestions,
        getQuestionsBySection,
        getVisibleQuestionsBySection,
        isLoading
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
}