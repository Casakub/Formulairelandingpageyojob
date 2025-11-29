import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { EUROPEAN_LANGUAGES, getLanguageByCode } from '../lib/languages';

export interface AvailableLanguage {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
  totalTranslations: number;
  questions: number;
  ui: number;
  completion: number;
}

interface AvailableLanguagesResponse {
  success: boolean;
  languages: Array<{
    code: string;
    totalTranslations: number;
    questions: number;
    ui: number;
    completion: number;
  }>;
  stats: {
    totalQuestions: number;
    totalUITexts: number;
    totalItems: number;
  };
}

/**
 * Hook to fetch available languages with translation completion stats
 * Only returns languages that have at least some translations
 */
export function useAvailableLanguages() {
  const [availableLanguages, setAvailableLanguages] = useState<AvailableLanguage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAvailableLanguages() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/available-languages`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch available languages: ${response.statusText}`);
        }

        const data: AvailableLanguagesResponse = await response.json();

        if (!mounted) return;

        if (data.success && data.languages) {
          // Enrich with language info from EUROPEAN_LANGUAGES
          const enrichedLanguages = data.languages.map(lang => {
            const languageInfo = getLanguageByCode(lang.code);
            return {
              ...lang,
              name: languageInfo?.name || lang.code.toUpperCase(),
              flag: languageInfo?.flag || '🏳️',
              nativeName: languageInfo?.nativeName || lang.code.toUpperCase()
            };
          });

          setAvailableLanguages(enrichedLanguages);
        } else {
          setAvailableLanguages([]);
        }

        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching available languages:', err);
        if (mounted) {
          setError(err.message);
          setLoading(false);
          
          // Fallback: return French and English if API fails
          const fallbackLanguages = EUROPEAN_LANGUAGES
            .filter(lang => ['fr', 'en'].includes(lang.code))
            .map(lang => ({
              ...lang,
              totalTranslations: 0,
              questions: 0,
              ui: 0,
              completion: 0
            }));
          
          setAvailableLanguages(fallbackLanguages);
        }
      }
    }

    fetchAvailableLanguages();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    availableLanguages,
    loading,
    error,
    hasLanguages: availableLanguages.length > 0
  };
}

/**
 * Get a specific available language by code
 */
export function getAvailableLanguage(
  availableLanguages: AvailableLanguage[],
  code: string
): AvailableLanguage | undefined {
  return availableLanguages.find(lang => lang.code === code);
}

/**
 * Check if a language is available (has translations)
 */
export function isLanguageAvailable(
  availableLanguages: AvailableLanguage[],
  code: string
): boolean {
  return availableLanguages.some(lang => lang.code === code);
}

/**
 * Get completion status label
 */
export function getCompletionLabel(completion: number): string {
  if (completion >= 95) return 'Complet';
  if (completion >= 75) return 'Avancé';
  if (completion >= 50) return 'Partiel';
  if (completion >= 25) return 'En cours';
  return 'Limité';
}

/**
 * Get completion color class for Tailwind
 */
export function getCompletionColor(completion: number): string {
  if (completion >= 95) return 'text-green-500';
  if (completion >= 75) return 'text-cyan-500';
  if (completion >= 50) return 'text-yellow-500';
  if (completion >= 25) return 'text-orange-500';
  return 'text-red-500';
}
