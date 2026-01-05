import { useState, useEffect } from 'react';
import type { LandingPageContent } from '../types/landing';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/**
 * 🌍 Hook pour charger les traductions de la landing page depuis Supabase
 * Remplace l'ancien système basé sur des imports statiques
 */

interface UseLandingTranslationsReturn {
  translations: Record<string, LandingPageContent>;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  saveTranslation: (lang: string, content: LandingPageContent, options?: {
    translation_status?: string;
    translated_by?: string;
    translation_progress?: number;
  }) => Promise<void>;
}

export function useLandingTranslations(
  initialLanguage: string = 'fr',
  fallbackToLocalStorage: boolean = true
): UseLandingTranslationsReturn {
  const [translations, setTranslations] = useState<Record<string, LandingPageContent>>({});
  const [currentLanguage, setCurrentLanguage] = useState<string>(initialLanguage);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🎯 Sauvegarder la langue initiale détectée automatiquement (1ère visite uniquement)
  useEffect(() => {
    const savedLang = localStorage.getItem('yojob_preferred_language');
    
    // Si aucune langue sauvegardée et initialLanguage n'est pas 'fr' par défaut
    // alors c'est une détection auto du navigateur → on la sauvegarde
    if (!savedLang && initialLanguage !== 'fr') {
      try {
        localStorage.setItem('yojob_preferred_language', initialLanguage);
      } catch (e) {
        console.warn('Failed to save auto-detected language:', e);
      }
    }
  }, [initialLanguage]);

  // Charger toutes les traductions au montage
  const loadTranslations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Ajouter un timeout côté client également (30s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/all`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url: response.url,
        });
        throw new Error(`Failed to load translations (${response.status}): ${errorText || response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.translations) {
        // 🔄 MIGRATION : Ajouter le champ contactType si absent
        const migratedTranslations = { ...data.translations };
        let hasMigrations = false;
        
        Object.keys(migratedTranslations).forEach(lang => {
          const translation = migratedTranslations[lang];
          if (translation?.ctaForm?.form?.fields && !translation.ctaForm.form.fields.contactType) {
            // Définir les traductions par défaut pour contactType
            const defaultContactType = {
              label: lang === 'fr' ? 'Vous êtes' : 'You are',
              placeholder: lang === 'fr' ? 'Sélectionnez votre profil' : 'Select your profile',
              options: {
                client: lang === 'fr' ? 'Client / Entreprise' : 'Client / Company',
                agency: lang === 'fr' ? 'Agence de travail temporaire' : 'Temporary work agency',
                interim: lang === 'fr' ? 'Intérimaire' : 'Temporary worker',
                other: lang === 'fr' ? 'Autre' : 'Other',
              },
            };
            
            migratedTranslations[lang].ctaForm.form.fields.contactType = defaultContactType;
            hasMigrations = true;
          }
        });
        
        setTranslations(migratedTranslations);
        setAvailableLanguages(Object.keys(migratedTranslations));
        
        // Sauvegarder en cache localStorage pour accès offline
        if (fallbackToLocalStorage) {
          try {
            localStorage.setItem('yojob_landing_translations_cache', JSON.stringify(migratedTranslations));
          } catch (e) {
            console.warn('Failed to cache translations in localStorage:', e);
          }
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('❌ Error loading landing translations:', err);
      
      // Gérer spécifiquement les erreurs de timeout
      if (err.name === 'AbortError') {
        console.error('⏱️ Request timeout - server took too long to respond');
        setError('Request timeout - please try again');
      } else {
        setError(err.message);
      }

      // Fallback sur localStorage si activé
      if (fallbackToLocalStorage) {
        try {
          const cached = localStorage.getItem('yojob_landing_translations_cache');
          if (cached) {
            const cachedTranslations = JSON.parse(cached);
            
            // 🔄 MIGRATION : Ajouter contactType aussi dans le cache
            Object.keys(cachedTranslations).forEach(lang => {
              const translation = cachedTranslations[lang];
              if (translation?.ctaForm?.form?.fields && !translation.ctaForm.form.fields.contactType) {
                const defaultContactType = {
                  label: lang === 'fr' ? 'Vous êtes' : 'You are',
                  placeholder: lang === 'fr' ? 'Sélectionnez votre profil' : 'Select your profile',
                  options: {
                    client: lang === 'fr' ? 'Client / Entreprise' : 'Client / Company',
                    agency: lang === 'fr' ? 'Agence de travail temporaire' : 'Temporary work agency',
                    interim: lang === 'fr' ? 'Intérimaire' : 'Temporary worker',
                    other: lang === 'fr' ? 'Autre' : 'Other',
                  },
                };
                cachedTranslations[lang].ctaForm.form.fields.contactType = defaultContactType;
                console.log(`🔄 Cache Migration: Added contactType field for ${lang}`);
              }
            });
            
            setTranslations(cachedTranslations);
            setAvailableLanguages(Object.keys(cachedTranslations));
            console.log('✅ Loaded translations from localStorage cache');
            setError(null); // Clear error si on a trouvé un cache
          } else {
            // Fallback ultime : charger depuis l'ancien système useLandingContent
            console.warn('⚠️ No cache found, trying old localStorage system...');
            const oldContent = localStorage.getItem('yojob_landing_content');
            if (oldContent) {
              const oldTranslations = JSON.parse(oldContent);
              
              // 🔄 MIGRATION : Ajouter contactType aussi dans l'ancien système
              Object.keys(oldTranslations).forEach(lang => {
                const translation = oldTranslations[lang];
                if (translation?.ctaForm?.form?.fields && !translation.ctaForm.form.fields.contactType) {
                  const defaultContactType = {
                    label: lang === 'fr' ? 'Vous êtes' : 'You are',
                    placeholder: lang === 'fr' ? 'Sélectionnez votre profil' : 'Select your profile',
                    options: {
                      client: lang === 'fr' ? 'Client / Entreprise' : 'Client / Company',
                      agency: lang === 'fr' ? 'Agence de travail temporaire' : 'Temporary work agency',
                      interim: lang === 'fr' ? 'Intérimaire' : 'Temporary worker',
                      other: lang === 'fr' ? 'Autre' : 'Other',
                    },
                  };
                  oldTranslations[lang].ctaForm.form.fields.contactType = defaultContactType;
                }
              });
              
              setTranslations(oldTranslations);
              setAvailableLanguages(Object.keys(oldTranslations));
              console.log('✅ Loaded translations from OLD localStorage system (yojob_landing_content)');
              setError(null); // Clear error
            }
          }
        } catch (e) {
          console.warn('Failed to load cached translations:', e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Charger au montage
  useEffect(() => {
    loadTranslations();
  }, []);

  // Fonction pour sauvegarder une traduction
  const saveTranslation = async (
    lang: string,
    content: LandingPageContent,
    options?: {
      translation_status?: string;
      translated_by?: string;
      translation_progress?: number;
    }
  ) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/${lang}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            translation_status: options?.translation_status || 'draft',
            translated_by: options?.translated_by || 'manual',
            translation_progress: options?.translation_progress || 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to save translation: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        // Mettre à jour l'état local
        setTranslations(prev => ({
          ...prev,
          [lang]: content,
        }));

        // Mettre à jour les langues disponibles
        if (!availableLanguages.includes(lang)) {
          setAvailableLanguages(prev => [...prev, lang]);
        }

        // Mettre à jour le cache localStorage
        if (fallbackToLocalStorage) {
          try {
            const updatedTranslations = { ...translations, [lang]: content };
            localStorage.setItem('yojob_landing_translations_cache', JSON.stringify(updatedTranslations));
          } catch (e) {
            console.warn('Failed to update localStorage cache:', e);
          }
        }
      } else {
        throw new Error(data.error || 'Failed to save translation');
      }
    } catch (err: any) {
      console.error('Error saving translation:', err);
      throw err;
    }
  };

  // Fonction pour changer de langue (choix manuel utilisateur)
  const setLanguage = (lang: string) => {
    if (availableLanguages.includes(lang) || lang === 'fr') {
      setCurrentLanguage(lang);
      // Sauvegarder la préférence MANUELLE (priorité absolue sur auto-détection)
      try {
        localStorage.setItem('yojob_preferred_language', lang);
      } catch (e) {
        console.warn('Failed to save language preference:', e);
      }
    } else {
      console.warn(`Language ${lang} not available, falling back to French`);
      setCurrentLanguage('fr');
    }
  };

  return {
    translations,
    currentLanguage,
    setLanguage,
    availableLanguages,
    isLoading,
    error,
    refresh: loadTranslations,
    saveTranslation,
  };
}

/**
 * 🌍 Hook simplifié pour charger une seule langue
 */
export function useLandingTranslation(language: string = 'fr') {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTranslation = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/${language}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to load translation: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.content) {
          setContent(data.content);
        } else if (data.exists === false && language !== 'fr') {
          // Fallback sur FR si la langue n'existe pas
          console.warn(`Translation for ${language} not found, falling back to French`);
          const frResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/fr`,
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (frResponse.ok) {
            const frData = await frResponse.json();
            if (frData.success && frData.content) {
              setContent(frData.content);
            }
          }
        }
      } catch (err: any) {
        console.error('Error loading translation:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslation();
  }, [language]);

  return {
    content,
    isLoading,
    error,
  };
}