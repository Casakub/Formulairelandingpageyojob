import { createContext, useContext, ReactNode } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import {
  QuestionTranslation,
  UITextTranslation,
  CountryLanguageMapping,
  TranslationStats,
  Translation,
} from '../services/translationService';

interface TranslationContextType {
  // Data
  questionTranslations: QuestionTranslation[];
  uiTextTranslations: UITextTranslation[];
  countryLanguageMappings: CountryLanguageMapping[];
  stats: TranslationStats | null;
  
  // Loading states
  loading: boolean;
  saving: boolean;
  
  // Error state
  error: string | null;
  
  // Actions
  loadAll: () => Promise<void>;
  saveAll: () => Promise<void>;
  
  // Question translations
  updateQuestionTranslation: (questionId: string, langCode: string, text: string, status?: Translation['status']) => void;
  saveQuestionTranslationNow: (questionId: string, langCode: string, text: string, status?: Translation['status']) => Promise<void>;
  
  // UI text translations
  updateUITextTranslation: (textId: string, langCode: string, text: string, status?: Translation['status']) => void;
  saveUITextTranslationNow: (textId: string, langCode: string, text: string, status?: Translation['status'], key?: string, category?: string) => Promise<void>;
  
  // Country language mappings
  updateCountryLanguageMapping: (countryCode: string, languages: string[]) => void;
  saveCountryLanguageMappingNow: (countryCode: string, languages: string[]) => Promise<void>;
  
  // Sync status
  hasUnsavedChanges: boolean;
  lastSyncTime: Date | null;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const translations = useTranslations();

  return (
    <TranslationContext.Provider value={translations}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  
  return context;
}
