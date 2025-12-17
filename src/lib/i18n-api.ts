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

// Nouvelle structure pour les questions complètes (avec label, placeholder, options)
export interface QuestionFieldTranslation {
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string; icon?: string }>;
  status: TranslationStatus;
}

export interface QuestionTranslationData {
  questionId: string;
  translations: {
    [langCode: string]: QuestionFieldTranslation;
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
      const errorText = await response.text();
      console.error('❌ fetchQuestionTranslations failed:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: `${BASE_URL}/questions`
      });
      throw new Error(`Failed to fetch question translations: ${response.statusText} - ${errorText}`);
    }
    
    // Vérifier le content-type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('❌ fetchQuestionTranslations: Response is not JSON', contentType);
      return [];
    }
    
    const data = await response.json();
    console.log('✅ fetchQuestionTranslations response:', { success: data.success, count: data.translations?.length });
    return data.success ? data.translations : [];
  } catch (error) {
    console.error('❌ Error fetching question translations:', error);
    throw error; // Re-throw to see the full error
  }
}

export async function saveQuestionTranslation(
  questionId: string,
  langCode: string,
  label: string,
  placeholder?: string,
  options?: Array<{ value: string; label: string; icon?: string }>,
  status: TranslationStatus = 'validated'
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/questions/${questionId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ langCode, label, placeholder, options, status })
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
    console.log('🔄 Bulk saving question translations:', translations.length);
    console.log('📋 Sample data being sent:', JSON.stringify(translations[0], null, 2));
    
    const response = await fetch(`${BASE_URL}/questions/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ translations })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server response error:', response.status, errorText);
      throw new Error(`Failed to bulk save question translations: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Bulk save response:', data);
    return data.success;
  } catch (error) {
    console.error('Error bulk saving question translations:', error);
    throw error; // Re-throw to see the error in the caller
  }
}

// ========== UI TEXT TRANSLATIONS ==========

export async function fetchUITextTranslations(): Promise<UITextTranslationData[]> {
  try {
    console.log('🔍 [fetchUITextTranslations] Fetching from:', `${BASE_URL}/ui-texts`);
    const response = await fetch(`${BASE_URL}/ui-texts`, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ fetchUITextTranslations failed:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: `${BASE_URL}/ui-texts`
      });
      throw new Error(`Failed to fetch UI text translations: ${response.statusText} - ${errorText}`);
    }
    
    // Vérifier le content-type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('❌ fetchUITextTranslations: Response is not JSON', contentType);
      return [];
    }
    
    const data = await response.json();
    console.log('✅ fetchUITextTranslations response:', { success: data.success, count: data.translations?.length });
    return data.success ? data.translations : [];
  } catch (error) {
    console.error('❌ Error fetching UI text translations:', error);
    throw error; // Re-throw to see the full error
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
    console.log('📤 Sending UI text translations:', translations.length);
    
    // If empty array, just skip
    if (translations.length === 0) {
      console.log('⚠️ No UI text translations to save, skipping...');
      return true; // Success because there's nothing to do
    }
    
    // Log sample of what we're sending
    console.log('📦 Sample translation being sent:', JSON.stringify(translations[0], null, 2));
    console.log('📋 Translation structure check:', {
      hasTextId: !!translations[0]?.textId,
      hasKey: !!translations[0]?.key,
      hasCategory: !!translations[0]?.category,
      hasTranslations: !!translations[0]?.translations,
      translationsType: typeof translations[0]?.translations,
      translationsKeys: translations[0]?.translations ? Object.keys(translations[0].translations) : []
    });
    
    const response = await fetch(`${BASE_URL}/ui-texts/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ translations })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server response error:', errorText);
      throw new Error(`Failed to bulk save UI text translations: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ UI text translations saved:', data);
    return data.success;
  } catch (error) {
    console.error('❌ Error bulk saving UI text translations:', error);
    throw error; // Propagate error instead of returning false
  }
}

// ========== COUNTRY LANGUAGE MAPPINGS ==========

export async function fetchCountryLanguageMappings(): Promise<CountryLanguageMapping[]> {
  try {
    console.log('🔍 [fetchCountryLanguageMappings] Fetching from:', `${BASE_URL}/country-languages`);
    const response = await fetch(`${BASE_URL}/country-languages`, { headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ fetchCountryLanguageMappings failed:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: `${BASE_URL}/country-languages`
      });
      throw new Error(`Failed to fetch country-language mappings: ${response.statusText} - ${errorText}`);
    }
    
    // Vérifier le content-type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('❌ fetchCountryLanguageMappings: Response is not JSON', contentType);
      return [];
    }
    
    const data = await response.json();
    console.log('✅ fetchCountryLanguageMappings response:', { success: data.success, count: data.mappings?.length });
    return data.success ? data.mappings : [];
  } catch (error) {
    console.error('❌ Error fetching country-language mappings:', error);
    throw error; // Re-throw to see the full error
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
    console.log('🔄 Bulk saving country-language mappings:', mappings.length);
    console.log('📋 Sample mapping being sent:', JSON.stringify(mappings[0], null, 2));
    
    const response = await fetch(`${BASE_URL}/country-languages/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ mappings })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Server response error:', response.status, errorText);
      throw new Error(`Failed to bulk save country-language mappings: ${response.statusText} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Bulk save response:', data);
    return data.success;
  } catch (error) {
    console.error('Error bulk saving country-language mappings:', error);
    throw error; // Re-throw to see the error in the caller
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

// ========== CMS FUNCTIONS ==========

// Structure pour les traductions récupérées depuis Supabase
export interface Translation {
  text_id: string;
  language_code: string;
  text_content: string;
  category: string;
  validation_status: string;
}

// Récupérer toutes les traductions d'une catégorie (hero, progress, ui)
export async function getTranslationsByCategory(category: string): Promise<Translation[]> {
  try {
    const response = await fetch(`${BASE_URL}/translations?category=${category}`, { headers });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch translations by category: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success ? data.translations : [];
  } catch (error) {
    console.error('Error fetching translations by category:', error);
    return [];
  }
}

// Mettre à jour une traduction individuelle
export async function updateTranslation(
  textId: string,
  languageCode: string,
  textContent: string,
  oldContent?: string,
  category?: string
): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/translations/update`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ textId, languageCode, textContent })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update translation: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error updating translation:', error);
    return false;
  }
}