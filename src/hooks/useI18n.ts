import { useState, useEffect, createContext, useContext } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { EUROPEAN_LANGUAGES, type Language } from '../lib/languages';

// Re-export from centralized languages
export const SUPPORTED_LANGUAGES = EUROPEAN_LANGUAGES;

export type LanguageCode = string;

interface QuestionTranslation {
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string; icon?: string }>;
  status: string;
}

interface Translations {
  questions: Record<string, QuestionTranslation>;
  ui: Record<string, string>;
}

interface I18nContextType {
  currentLang: LanguageCode;
  setCurrentLang: (lang: LanguageCode) => void;
  translations: Translations;
  t: (key: string, fallback?: string) => string;
  tQuestion: (questionId: string, fallback?: string) => string;
  tPlaceholder: (questionId: string, fallback?: string) => string;
  tOptions: (questionId: string, fallbackOptions?: Array<{ value: string; label: string; icon?: string }>) => Array<{ value: string; label: string; icon?: string }>;
  loading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Detect browser language
export function detectBrowserLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'fr';
  
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  const supported = SUPPORTED_LANGUAGES.find(l => l.code === browserLang);
  
  return supported ? (supported.code as LanguageCode) : 'fr';
}

// Fetch translations from API
async function fetchTranslations(lang: LanguageCode): Promise<Translations> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/translate/${lang}`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success && data.translations) {
      return data.translations;
    }

    return { questions: {}, ui: {} };
  } catch (error) {
    console.error('Error fetching translations:', error);
    return { questions: {}, ui: {} };
  }
}

// Save translation to API
export async function saveTranslation(
  type: 'question' | 'ui',
  id: string,
  langCode: LanguageCode,
  text: string,
  status: 'missing' | 'auto-mcp' | 'auto-api' | 'validated' = 'validated',
  metadata?: { key?: string; category?: string }
): Promise<boolean> {
  try {
    const endpoint = type === 'question' 
      ? `/i18n/questions/${id}`
      : `/i18n/ui-texts/${id}`;

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          langCode,
          text,
          status,
          ...metadata
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to save translation: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error saving translation:', error);
    return false;
  }
}

// Save country-language mapping
export async function saveCountryLanguages(
  countryCode: string,
  languages: LanguageCode[]
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/country-languages/${countryCode}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ languages })
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to save country-language mapping: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error saving country-language mapping:', error);
    return false;
  }
}

// Get country languages
export async function getCountryLanguages(countryCode: string): Promise<LanguageCode[]> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/country-languages`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch country languages: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success && data.mappings) {
      const mapping = data.mappings.find((m: any) => m.countryCode === countryCode);
      return mapping ? mapping.languages : [];
    }

    return [];
  } catch (error) {
    console.error('Error fetching country languages:', error);
    return [];
  }
}

// Hook to use i18n
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
}

// Provider component props
interface I18nProviderProps {
  children: React.ReactNode;
  initialLang?: LanguageCode;
}

// Provider component
export function I18nProvider({ children, initialLang }: I18nProviderProps) {
  const [currentLang, setCurrentLang] = useState<LanguageCode>(
    initialLang || detectBrowserLanguage()
  );
  const [translations, setTranslations] = useState<Translations>({
    questions: {},
    ui: {}
  });
  const [loading, setLoading] = useState(true);

  // Load translations when language changes
  useEffect(() => {
    let mounted = true;

    async function loadTranslations() {
      setLoading(true);
      const data = await fetchTranslations(currentLang);
      
      if (mounted) {
        setTranslations(data);
        setLoading(false);
      }
    }

    loadTranslations();

    return () => {
      mounted = false;
    };
  }, [currentLang]);

  // Translate UI text by key
  const t = (key: string, fallback?: string): string => {
    // D'abord chercher dans UI
    if (translations.ui[key]) {
      return translations.ui[key];
    }
    
    // Si c'est une clé de question (questions.XXX)
    if (key.startsWith('questions.')) {
      const parts = key.split('.');
      const isProfileSpecific = ['agency', 'client', 'worker'].includes(parts[1]);
      
      // CAS 1 : Format AVEC profil (questions.agency.q1_nom.label)
      if (isProfileSpecific && parts.length >= 4) {
        const questionId = parts[2];
        const field = parts[3]; // 'label', 'placeholder', 'description', 'options'
        
        const question = translations.questions[questionId];
        if (question) {
          if (field === 'label') return question.label || fallback || key;
          if (field === 'placeholder') return question.placeholder || fallback || '';
          if (field === 'description') return (question as any).description || fallback || '';
          
          // Gérer les options : questions.agency.q3_taille.options.1-9
          if (field === 'options' && parts.length >= 5) {
            const optionValue = parts[4]; // "1-9", "btp", etc.
            if (question.options && typeof question.options === 'object') {
              return (question.options as any)[optionValue] || fallback || key;
            }
          }
        }
      }
      
      // CAS 2 : Format SANS profil (questions.q1_nom.label)
      // Fallback pour compatibilité avec les clés de survey-questions-COMPLETE.ts
      if (!isProfileSpecific && parts.length >= 3) {
        const questionId = parts[1]; // q1_nom, q6_volume_client, etc.
        const field = parts[2]; // 'label', 'placeholder', 'description', 'options'
        
        const question = translations.questions[questionId];
        if (question) {
          if (field === 'label') return question.label || fallback || key;
          if (field === 'placeholder') return question.placeholder || fallback || '';
          if (field === 'description') return (question as any).description || fallback || '';
          
          // Gérer les options : questions.q3_taille.options.1-9
          if (field === 'options' && parts.length >= 4) {
            const optionValue = parts[3]; // "1-9", "btp", etc.
            if (question.options && typeof question.options === 'object') {
              return (question.options as any)[optionValue] || fallback || key;
            }
          }
        }
      }
    }
    
    return fallback || key;
  };

  // Translate question by ID - returns translated label
  const tQuestion = (questionId: string, fallback?: string): string => {
    const translation = translations.questions[questionId];
    return translation?.label || fallback || questionId;
  };

  // Translate placeholder by question ID
  const tPlaceholder = (questionId: string, fallback?: string): string => {
    const translation = translations.questions[questionId];
    return translation?.placeholder || fallback || '';
  };

  // Translate options by question ID
  const tOptions = (
    questionId: string, 
    fallbackOptions?: Array<{ value: string; label: string; icon?: string }>
  ): Array<{ value: string; label: string; icon?: string }> => {
    const translation = translations.questions[questionId];
    return translation?.options || fallbackOptions || [];
  };

  const value: I18nContextType = {
    currentLang,
    setCurrentLang,
    translations,
    t,
    tQuestion,
    tPlaceholder,
    tOptions,
    loading
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}