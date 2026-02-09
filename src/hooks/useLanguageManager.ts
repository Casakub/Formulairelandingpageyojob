import { useState, useEffect } from 'react';
import { getAllLanguageCodes } from '../lib/languages';
import { buildLocalizedPath, DEFAULT_LANGUAGE, splitPathByLang } from '../lib/i18nRouting';

/**
 * 🌍 Hook unifié de gestion de la langue pour tout le site YOJOB
 * 
 * Centralise la logique de :
 * - Détection automatique de la langue du navigateur
 * - Persistance dans localStorage
 * - Changement manuel de langue
 * 
 * Utilisé par :
 * - Landing page (App-Landing.tsx)
 * - Pages services (ServiceInterimEuropeen.tsx, etc.)
 * - Toute autre page nécessitant la langue courante
 * 
 * @version 1.0.0
 */

export interface UseLanguageManagerReturn {
  /** Langue courante (ex: 'fr', 'en', 'pl') */
  currentLanguage: string;
  
  /** Fonction pour changer manuellement la langue */
  setLanguage: (lang: string) => void;
  
  /** Indique si l'initialisation est terminée (évite flash de contenu) */
  isReady: boolean;
}

/**
 * Détecte la langue initiale selon les priorités :
 * 1. localStorage (choix manuel précédent)
 * 2. Paramètre URL (?lang=pl)
 * 3. Langue du navigateur (auto-détection)
 * 4. Fallback sur anglais, puis français
 */
function detectInitialLanguage(): { language: string; hasLangPrefix: boolean } {
  const supportedLangs = getAllLanguageCodes(); // 23 langues européennes

  // 1. Vérifier le préfixe d'URL (/en/...)
  if (typeof window !== 'undefined') {
    const { lang, hasLangPrefix } = splitPathByLang(window.location.pathname);
    if (hasLangPrefix && supportedLangs.includes(lang)) {
      console.log('🌍 Langue détectée depuis URL (prefix):', lang);
      return { language: lang, hasLangPrefix: true };
    }
  }

  // 2. Vérifier localStorage (choix manuel = priorité max)
  try {
    const savedLang = localStorage.getItem('yojob_preferred_language');
    if (savedLang && supportedLangs.includes(savedLang)) {
      console.log('🌍 Langue détectée depuis localStorage:', savedLang);
      return { language: savedLang, hasLangPrefix: false };
    }
  } catch (e) {
    console.warn('⚠️ Impossible de lire localStorage:', e);
  }

  // 3. Vérifier paramètre URL (?lang=pl)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && supportedLangs.includes(langParam)) {
      console.log('🌍 Langue détectée depuis URL (param):', langParam);
      return { language: langParam, hasLangPrefix: false };
    }
  }

  // 4. Détecter la langue du navigateur (AUTO-DETECTION 🎯)
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0]; // 'pl-PL' -> 'pl'
    if (supportedLangs.includes(browserLang)) {
      console.log('🌍 Langue auto-détectée depuis navigateur:', browserLang);
      return { language: browserLang, hasLangPrefix: false };
    }
  }

  // 5. Fallback sur anglais si la langue du navigateur n'est pas supportée
  if (supportedLangs.includes('en')) {
    console.log('🌍 Langue du navigateur non supportée, fallback sur anglais');
    return { language: 'en', hasLangPrefix: false };
  }

  // 6. Fallback final sur français
  console.log('🌍 Fallback final sur français');
  return { language: 'fr', hasLangPrefix: false };
}

/**
 * Hook de gestion de la langue courante
 * 
 * @example
 * ```tsx
 * const { currentLanguage, setLanguage, isReady } = useLanguageManager();
 * 
 * // Afficher un loader pendant l'initialisation
 * if (!isReady) return <Loader />;
 * 
 * // Utiliser la langue courante
 * const t = useServiceTranslation('interimEuropeen', currentLanguage);
 * 
 * // Changer de langue
 * <LanguageSelector value={currentLanguage} onChange={setLanguage} />
 * ```
 */
export function useLanguageManager(): UseLanguageManagerReturn {
  const [currentLanguage, setCurrentLanguage] = useState<string>('fr');
  const [isReady, setIsReady] = useState(false);

  // Initialisation : détecter la langue au montage du composant
  useEffect(() => {
    const { language: detectedLanguage, hasLangPrefix } = detectInitialLanguage();
    setCurrentLanguage(detectedLanguage);
    
    // Sauvegarder la langue auto-détectée si c'est la 1ère visite
    try {
      const savedLang = localStorage.getItem('yojob_preferred_language');
      if (!savedLang && detectedLanguage !== 'fr') {
        localStorage.setItem('yojob_preferred_language', detectedLanguage);
        console.log('💾 Langue auto-détectée sauvegardée:', detectedLanguage);
      }
    } catch (e) {
      console.warn('⚠️ Impossible de sauvegarder dans localStorage:', e);
    }

    // Synchroniser l'URL avec la langue détectée (Option B)
    if (typeof window !== 'undefined') {
      const { pathname, search, hash } = window.location;
      const localizedPath = buildLocalizedPath(pathname, detectedLanguage);
      const nextUrl = `${localizedPath}${search}${hash}`;
      const currentUrl = `${pathname}${search}${hash}`;

      if (detectedLanguage === DEFAULT_LANGUAGE && hasLangPrefix) {
        // Canonicaliser /fr/... vers /
        window.history.replaceState({}, '', nextUrl);
      } else if (detectedLanguage !== DEFAULT_LANGUAGE && currentUrl !== nextUrl) {
        // Ajouter le préfixe de langue si absent
        window.history.replaceState({}, '', nextUrl);
      }
    }
    
    setIsReady(true);
  }, []);

  // Garder l'attribut lang du document synchronisé
  useEffect(() => {
    if (typeof document !== 'undefined' && currentLanguage) {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  // Mettre à jour la langue lors de la navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const { lang, hasLangPrefix } = splitPathByLang(window.location.pathname);
      const nextLang = hasLangPrefix ? lang : DEFAULT_LANGUAGE;
      setCurrentLanguage(nextLang);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fonction pour changer manuellement la langue (via LanguageSelector)
  const setLanguage = (lang: string) => {
    const supportedLangs = getAllLanguageCodes();
    
    if (supportedLangs.includes(lang)) {
      setCurrentLanguage(lang);
      
      // Sauvegarder la préférence MANUELLE (priorité absolue)
      try {
        localStorage.setItem('yojob_preferred_language', lang);
        console.log('💾 Préférence manuelle sauvegardée:', lang);
      } catch (e) {
        console.warn('⚠️ Impossible de sauvegarder la langue:', e);
      }

      // Mettre à jour l'URL pour refléter la langue choisie
      if (typeof window !== 'undefined') {
        const { pathname, search, hash } = window.location;
        const localizedPath = buildLocalizedPath(pathname, lang);
        const nextUrl = `${localizedPath}${search}${hash}`;
        const currentUrl = `${pathname}${search}${hash}`;
        if (nextUrl !== currentUrl) {
          window.history.pushState({}, '', nextUrl);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
    } else {
      console.warn(`⚠️ Langue ${lang} non supportée, langue courante conservée`);
    }
  };

  return {
    currentLanguage,
    setLanguage,
    isReady,
  };
}
