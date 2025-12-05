import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner@2.0.3';
import {
  QuestionTranslation,
  UITextTranslation,
  CountryLanguageMapping,
  TranslationStats,
  getQuestionTranslations,
  getUITextTranslations,
  getCountryLanguageMappings,
  getTranslationStats,
  bulkSaveQuestionTranslations,
  bulkSaveUITextTranslations,
  bulkSaveCountryLanguageMappings,
  saveQuestionTranslation,
  saveUITextTranslation,
  saveCountryLanguageMapping,
  Translation,
} from '../services/translationService';

interface UseTranslationsResult {
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

export function useTranslations(): UseTranslationsResult {
  const [questionTranslations, setQuestionTranslations] = useState<QuestionTranslation[]>([]);
  const [uiTextTranslations, setUITextTranslations] = useState<UITextTranslation[]>([]);
  const [countryLanguageMappings, setCountryLanguageMappings] = useState<CountryLanguageMapping[]>([]);
  const [stats, setStats] = useState<TranslationStats | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Load all data from Supabase
  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [questions, uiTexts, countries, statistics] = await Promise.all([
        getQuestionTranslations(),
        getUITextTranslations(),
        getCountryLanguageMappings(),
        getTranslationStats(),
      ]);
      
      setQuestionTranslations(questions);
      setUITextTranslations(uiTexts);
      setCountryLanguageMappings(countries);
      setStats(statistics);
      setLastSyncTime(new Date());
      setHasUnsavedChanges(false);
      
      console.log('✅ Translations loaded from Supabase:', {
        questions: questions.length,
        uiTexts: uiTexts.length,
        countries: countries.length,
      });
      
      toast.success('Traductions chargées depuis Supabase', {
        description: `${questions.length} questions, ${uiTexts.length} textes UI, ${countries.length} pays`,
        duration: 3000,
      });
    } catch (err: any) {
      console.error('❌ Error loading translations:', err);
      setError(err.message || 'Failed to load translations');
      
      toast.error('Erreur de chargement', {
        description: err.message || 'Impossible de charger les traductions',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Save all data to Supabase
  const saveAll = useCallback(async () => {
    setSaving(true);
    setError(null);
    
    try {
      await Promise.all([
        bulkSaveQuestionTranslations(questionTranslations),
        bulkSaveUITextTranslations(uiTextTranslations),
        bulkSaveCountryLanguageMappings(countryLanguageMappings),
      ]);
      
      setLastSyncTime(new Date());
      setHasUnsavedChanges(false);
      
      // Refresh stats
      const statistics = await getTranslationStats();
      setStats(statistics);
      
      console.log('✅ All translations saved to Supabase');
      
      toast.success('Toutes les traductions sauvegardées !', {
        description: 'Synchronisation avec Supabase réussie',
        duration: 3000,
      });
    } catch (err: any) {
      console.error('❌ Error saving translations:', err);
      setError(err.message || 'Failed to save translations');
      
      toast.error('Erreur de sauvegarde', {
        description: err.message || 'Impossible de sauvegarder les traductions',
        duration: 5000,
        action: {
          label: 'Réessayer',
          onClick: () => saveAll(),
        },
      });
      
      throw err;
    } finally {
      setSaving(false);
    }
  }, [questionTranslations, uiTextTranslations, countryLanguageMappings]);

  // Update question translation (local state only)
  const updateQuestionTranslation = useCallback((
    questionId: string,
    langCode: string,
    text: string,
    status: Translation['status'] = 'validated'
  ) => {
    setQuestionTranslations(prev => {
      const existing = prev.find(q => q.questionId === questionId);
      
      if (existing) {
        return prev.map(q =>
          q.questionId === questionId
            ? {
                ...q,
                translations: {
                  ...q.translations,
                  [langCode]: { text, status },
                },
              }
            : q
        );
      } else {
        return [
          ...prev,
          {
            questionId,
            translations: {
              [langCode]: { text, status },
            },
          },
        ];
      }
    });
    
    setHasUnsavedChanges(true);
  }, []);

  // Save question translation immediately
  const saveQuestionTranslationNow = useCallback(async (
    questionId: string,
    langCode: string,
    text: string,
    status: Translation['status'] = 'validated'
  ) => {
    try {
      const saved = await saveQuestionTranslation(questionId, langCode, text, status);
      
      // Update local state with server response
      setQuestionTranslations(prev => {
        const existing = prev.find(q => q.questionId === questionId);
        if (existing) {
          return prev.map(q => q.questionId === questionId ? saved : q);
        } else {
          return [...prev, saved];
        }
      });
      
      console.log(`✅ Question translation saved: ${questionId} (${langCode})`);
    } catch (err: any) {
      console.error('❌ Error saving question translation:', err);
      throw err;
    }
  }, []);

  // Update UI text translation (local state only)
  const updateUITextTranslation = useCallback((
    textId: string,
    langCode: string,
    text: string,
    status: Translation['status'] = 'validated'
  ) => {
    setUITextTranslations(prev => {
      const existing = prev.find(t => t.textId === textId);
      
      if (existing) {
        return prev.map(t =>
          t.textId === textId
            ? {
                ...t,
                translations: {
                  ...t.translations,
                  [langCode]: { text, status },
                },
              }
            : t
        );
      } else {
        return [
          ...prev,
          {
            textId,
            key: textId,
            category: 'general',
            translations: {
              [langCode]: { text, status },
            },
          },
        ];
      }
    });
    
    setHasUnsavedChanges(true);
  }, []);

  // Save UI text translation immediately
  const saveUITextTranslationNow = useCallback(async (
    textId: string,
    langCode: string,
    text: string,
    status: Translation['status'] = 'validated',
    key?: string,
    category?: string
  ) => {
    try {
      const saved = await saveUITextTranslation(textId, langCode, text, status, key, category);
      
      // Update local state with server response
      setUITextTranslations(prev => {
        const existing = prev.find(t => t.textId === textId);
        if (existing) {
          return prev.map(t => t.textId === textId ? saved : t);
        } else {
          return [...prev, saved];
        }
      });
      
      console.log(`✅ UI text translation saved: ${textId} (${langCode})`);
    } catch (err: any) {
      console.error('❌ Error saving UI text translation:', err);
      throw err;
    }
  }, []);

  // Update country language mapping (local state only)
  const updateCountryLanguageMapping = useCallback((
    countryCode: string,
    languages: string[]
  ) => {
    setCountryLanguageMappings(prev => {
      const existing = prev.find(c => c.countryCode === countryCode);
      
      if (existing) {
        return prev.map(c =>
          c.countryCode === countryCode
            ? { countryCode, languages }
            : c
        );
      } else {
        return [...prev, { countryCode, languages }];
      }
    });
    
    setHasUnsavedChanges(true);
  }, []);

  // Save country language mapping immediately
  const saveCountryLanguageMappingNow = useCallback(async (
    countryCode: string,
    languages: string[]
  ) => {
    try {
      const saved = await saveCountryLanguageMapping(countryCode, languages);
      
      // Update local state with server response
      setCountryLanguageMappings(prev => {
        const existing = prev.find(c => c.countryCode === countryCode);
        if (existing) {
          return prev.map(c => c.countryCode === countryCode ? saved : c);
        } else {
          return [...prev, saved];
        }
      });
      
      console.log(`✅ Country language mapping saved: ${countryCode}`);
    } catch (err: any) {
      console.error('❌ Error saving country language mapping:', err);
      throw err;
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    // Data
    questionTranslations,
    uiTextTranslations,
    countryLanguageMappings,
    stats,
    
    // Loading states
    loading,
    saving,
    
    // Error state
    error,
    
    // Actions
    loadAll,
    saveAll,
    
    // Question translations
    updateQuestionTranslation,
    saveQuestionTranslationNow,
    
    // UI text translations
    updateUITextTranslation,
    saveUITextTranslationNow,
    
    // Country language mappings
    updateCountryLanguageMapping,
    saveCountryLanguageMappingNow,
    
    // Sync status
    hasUnsavedChanges,
    lastSyncTime,
  };
}
