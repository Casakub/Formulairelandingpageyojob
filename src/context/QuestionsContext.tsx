import { createContext, useContext, useState, ReactNode } from 'react';
import { Question, DEFAULT_QUESTIONS } from '../config/questions';

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
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);

  const addQuestion = (question: Question) => {
    setQuestions(prev => [...prev, question]);
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
        getVisibleQuestionsBySection
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
