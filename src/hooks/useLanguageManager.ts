import { useState, useEffect } from 'react';
import { getAllLanguageCodes } from '../lib/languages';

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
function detectInitialLanguage(): string {
  const supportedLangs = getAllLanguageCodes(); // 23 langues européennes

  // 1. Vérifier localStorage (choix manuel = priorité max)
  try {
    const savedLang = localStorage.getItem('yojob_preferred_language');
    if (savedLang && supportedLangs.includes(savedLang)) {
      console.log('🌍 Langue détectée depuis localStorage:', savedLang);
      return savedLang;
    }
  } catch (e) {
    console.warn('⚠️ Impossible de lire localStorage:', e);
  }

  // 2. Vérifier paramètre URL (?lang=pl)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && supportedLangs.includes(langParam)) {
      console.log('🌍 Langue détectée depuis URL:', langParam);
      return langParam;
    }
  }

  // 3. Détecter la langue du navigateur (AUTO-DETECTION 🎯)
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0]; // 'pl-PL' -> 'pl'
    if (supportedLangs.includes(browserLang)) {
      console.log('🌍 Langue auto-détectée depuis navigateur:', browserLang);
      return browserLang;
    }
  }

  // 4. Fallback sur anglais si la langue du navigateur n'est pas supportée
  if (supportedLangs.includes('en')) {
    console.log('🌍 Langue du navigateur non supportée, fallback sur anglais');
    return 'en';
  }

  // 5. Fallback final sur français
  console.log('🌍 Fallback final sur français');
  return 'fr';
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
    const detectedLanguage = detectInitialLanguage();
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
    
    setIsReady(true);
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
