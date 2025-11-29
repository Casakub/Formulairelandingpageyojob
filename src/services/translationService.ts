import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n`;

// ========== TYPES ==========
export interface Translation {
  text: string;
  status: 'missing' | 'auto-mcp' | 'auto-api' | 'validated';
}

export interface QuestionTranslation {
  questionId: string;
  translations: {
    [langCode: string]: Translation;
  };
}

export interface UITextTranslation {
  textId: string;
  key: string;
  category: string;
  translations: {
    [langCode: string]: Translation;
  };
}

export interface CountryLanguageMapping {
  countryCode: string;
  languages: string[];
}

export interface TranslationStats {
  questions: {
    total: number;
    validated: number;
    progress: number;
  };
  ui: {
    total: number;
    validated: number;
    progress: number;
  };
  countries: number;
}

// ========== API HELPERS ==========
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API Error: ${response.status}`);
  }

  return response.json();
}

// ========== QUESTION TRANSLATIONS ==========
export async function getQuestionTranslations(): Promise<QuestionTranslation[]> {
  const data = await apiCall('/questions');
  return data.translations || [];
}

export async function getQuestionTranslation(questionId: string): Promise<QuestionTranslation> {
  const data = await apiCall(`/questions/${questionId}`);
  return data.translation;
}

export async function saveQuestionTranslation(
  questionId: string,
  langCode: string,
  text: string,
  status: Translation['status'] = 'validated'
): Promise<QuestionTranslation> {
  const data = await apiCall(`/questions/${questionId}`, {
    method: 'POST',
    body: JSON.stringify({ langCode, text, status }),
  });
  return data.translation;
}

export async function bulkSaveQuestionTranslations(
  translations: QuestionTranslation[]
): Promise<{ success: boolean; count: number }> {
  return apiCall('/questions/bulk', {
    method: 'POST',
    body: JSON.stringify({ translations }),
  });
}

// ========== UI TEXT TRANSLATIONS ==========
export async function getUITextTranslations(): Promise<UITextTranslation[]> {
  const data = await apiCall('/ui-texts');
  return data.translations || [];
}

export async function saveUITextTranslation(
  textId: string,
  langCode: string,
  text: string,
  status: Translation['status'] = 'validated',
  key?: string,
  category?: string
): Promise<UITextTranslation> {
  const data = await apiCall(`/ui-texts/${textId}`, {
    method: 'POST',
    body: JSON.stringify({ langCode, text, status, key, category }),
  });
  return data.translation;
}

export async function bulkSaveUITextTranslations(
  translations: UITextTranslation[]
): Promise<{ success: boolean; count: number }> {
  return apiCall('/ui-texts/bulk', {
    method: 'POST',
    body: JSON.stringify({ translations }),
  });
}

// ========== COUNTRY LANGUAGE MAPPINGS ==========
export async function getCountryLanguageMappings(): Promise<CountryLanguageMapping[]> {
  const data = await apiCall('/country-languages');
  return data.mappings || [];
}

export async function saveCountryLanguageMapping(
  countryCode: string,
  languages: string[]
): Promise<CountryLanguageMapping> {
  const data = await apiCall(`/country-languages/${countryCode}`, {
    method: 'POST',
    body: JSON.stringify({ languages }),
  });
  return data.mapping;
}

export async function bulkSaveCountryLanguageMappings(
  mappings: CountryLanguageMapping[]
): Promise<{ success: boolean; count: number }> {
  return apiCall('/country-languages/bulk', {
    method: 'POST',
    body: JSON.stringify({ mappings }),
  });
}

// ========== TRANSLATION UTILITIES ==========
export async function getTranslationsForLanguage(lang: string): Promise<{
  questions: Record<string, string>;
  ui: Record<string, string>;
}> {
  const data = await apiCall(`/translate/${lang}`);
  return data.translations;
}

export async function autoTranslate(
  sourceText: string,
  targetLang: string,
  method: 'mcp' | 'api',
  sourceLang: string = 'fr',
  mcpSettings?: any,
  contextWindow?: Array<{ source: string; target: string }>
): Promise<{
  translatedText: string;
  status: Translation['status'];
}> {
  const data = await apiCall('/auto-translate', {
    method: 'POST',
    body: JSON.stringify({
      sourceText,
      sourceLang,
      targetLang,
      method,
      mcpSettings: mcpSettings || {},
      contextWindow: contextWindow || [],
    }),
  });
  return {
    translatedText: data.translation.translatedText,
    status: data.translation.status,
  };
}

export async function getTranslationStats(): Promise<TranslationStats> {
  const data = await apiCall('/stats');
  return data.stats;
}
