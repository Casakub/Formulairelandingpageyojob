/**
 * 🪝 HOOKS REACT POUR I18N v2.0
 * 
 * Hooks React pour utiliser le système i18n v2.0 dans les composants
 * - useI18n() : Hook principal pour traduire
 * - I18nProvider : Provider React pour gérer la langue courante
 * 
 * @version 2.0.0
 * @date 11 Décembre 2024
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { 
  getTranslation, 
  getBrowserLanguage,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  type GetTranslationOptions,
} from './index';

/**
 * Contexte I18n
 */
interface I18nContextType {
  /** Langue courante */
  currentLang: SupportedLanguage;
  
  /** Changer de langue */
  setLanguage: (lang: SupportedLanguage) => void;
  
  /** Fonction de traduction principale */
  t: (key: string, fallback?: string) => string;
  
  /** Fonction de traduction avec options avancées */
  translate: (key: string, options?: GetTranslationOptions) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * Props du Provider
 */
interface I18nProviderProps {
  children: ReactNode;
  initialLang?: SupportedLanguage;
}

/**
 * Provider I18n v2.0
 * 
 * @example
 * ```tsx
 * <I18nProvider initialLang="fr">
 *   <App />
 * </I18nProvider>
 * ```
 */
export function I18nProvider({ children, initialLang }: I18nProviderProps) {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(
    initialLang || getBrowserLanguage()
  );

  /**
   * Fonction de traduction simple
   * Compatible avec l'ancien useI18n().t()
   */
  const t = useCallback((key: string, fallback?: string): string => {
    return getTranslation(currentLang, key, { fallback });
  }, [currentLang]);

  /**
   * Fonction de traduction avancée avec options
   */
  const translate = useCallback((key: string, options?: GetTranslationOptions): string => {
    return getTranslation(currentLang, key, options);
  }, [currentLang]);

  /**
   * Changer de langue
   */
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setCurrentLang(lang);
    
    // Optionnel : Sauvegarder dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('yojob-survey-lang', lang);
    }
  }, []);

  const value: I18nContextType = {
    currentLang,
    setLanguage,
    t,
    translate,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook pour utiliser i18n v2.0
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, currentLang, setLanguage } = useI18n();
 *   
 *   return (
 *     <div>
 *       <h1>{t('nav.section1')}</h1>
 *       <p>{t('section1.description')}</p>
 *       <button onClick={() => setLanguage('en')}>EN</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
}

/**
 * Re-exports utiles
 */
export { SUPPORTED_LANGUAGES };
export type { SupportedLanguage };
