import { projectId, publicAnonKey } from '../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n`;

const headers = {
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json'
};

// ========== TYPES ==========
export type TranslationStatus = 'missing' | 'auto-mcp' | 'auto-api' | 'validated';

export interface Translation {
  text: string;
  status: TranslationStatus;
}

export interface QuestionTranslationData {
  questionId: string;
  translations: {
    [langCode: string]: Translation;
  };
}

export interface UITextTranslationData {
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

// ========== QUESTION TRANSLATIONS ==========

export async function fetchQuestionTranslations(): Promise<QuestionTranslationData[]> {
  try {
    const response = await fetch(`${BASE_URL}/questions`, { headers });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch question translations: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success ? data.translations : [];
  } catch (error) {
    console.error('Error fetching question translations:', error);
    return [];
  }
}

export async function saveQuestionTranslation(
  questionId: string,
  langCode: string,
  text: string,
  status: TranslationStatus = 'validated'
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/questions/${questionId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ langCode, text, status })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save question translation: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error saving question translation:', error);
    return false;
  }
}

export async function bulkSaveQuestionTranslations(
  translations: QuestionTranslationData[]
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/questions/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ translations })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to bulk save question translations: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error bulk saving question translations:', error);
    return false;
  }
}

// ========== UI TEXT TRANSLATIONS ==========

export async function fetchUITextTranslations(): Promise<UITextTranslationData[]> {
  try {
    const response = await fetch(`${BASE_URL}/ui-texts`, { headers });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch UI text translations: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success ? data.translations : [];
  } catch (error) {
    console.error('Error fetching UI text translations:', error);
    return [];
  }
}

export async function saveUITextTranslation(
  textId: string,
  langCode: string,
  text: string,
  status: TranslationStatus = 'validated',
  key?: string,
  category?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/ui-texts/${textId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ langCode, text, status, key, category })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save UI text translation: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error saving UI text translation:', error);
    return false;
  }
}

export async function bulkSaveUITextTranslations(
  translations: UITextTranslationData[]
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/ui-texts/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ translations })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to bulk save UI text translations: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error bulk saving UI text translations:', error);
    return false;
  }
}

// ========== COUNTRY LANGUAGE MAPPINGS ==========

export async function fetchCountryLanguageMappings(): Promise<CountryLanguageMapping[]> {
  try {
    const response = await fetch(`${BASE_URL}/country-languages`, { headers });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch country-language mappings: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success ? data.mappings : [];
  } catch (error) {
    console.error('Error fetching country-language mappings:', error);
    return [];
  }
}

export async function saveCountryLanguageMapping(
  countryCode: string,
  languages: string[]
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/country-languages/${countryCode}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ languages })
    });
    
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

export async function bulkSaveCountryLanguageMappings(
  mappings: CountryLanguageMapping[]
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/country-languages/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ mappings })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to bulk save country-language mappings: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error bulk saving country-language mappings:', error);
    return false;
  }
}

// ========== AUTO TRANSLATE ==========

export async function autoTranslate(
  sourceText: string,
  sourceLang: string,
  targetLang: string,
  method: 'mcp' | 'api'
): Promise<{ translatedText: string; status: TranslationStatus } | null> {
  try {
    const response = await fetch(`${BASE_URL}/auto-translate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ sourceText, sourceLang, targetLang, method })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to auto-translate: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.translation) {
      return {
        translatedText: data.translation.translatedText,
        status: data.translation.status
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error auto-translating:', error);
    return null;
  }
}

// ========== STATS ==========

export async function fetchI18nStats(): Promise<{
  questions: { total: number; validated: number; progress: number };
  ui: { total: number; validated: number; progress: number };
  countries: number;
} | null> {
  try {
    const response = await fetch(`${BASE_URL}/stats`, { headers });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch i18n stats: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success ? data.stats : null;
  } catch (error) {
    console.error('Error fetching i18n stats:', error);
    return null;
  }
}
