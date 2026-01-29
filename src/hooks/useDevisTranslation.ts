/**
 * 🌍 HOOK PERSONNALISÉ POUR LES TRADUCTIONS DU FORMULAIRE DE DEVIS
 * 
 * Gère le chargement et l'accès aux traductions selon la langue sélectionnée
 * 
 * @version 1.0.0
 * @created 2024-12-21
 */

import { useState, useEffect, useCallback } from 'react';
import type { DevisTranslations, DevisLanguage } from '../src/i18n/devis/types';
import { DEFAULT_LANGUAGE } from '../src/i18n/devis/languages';
import { fr } from '../src/i18n/devis/locales/fr';
import { en } from '../src/i18n/devis/locales/en';
import { de } from '../src/i18n/devis/locales/de';
import { es } from '../src/i18n/devis/locales/es';
import { pl } from '../src/i18n/devis/locales/pl';
import { ro } from '../src/i18n/devis/locales/ro';
import { it } from '../src/i18n/devis/locales/it';
import { pt } from '../src/i18n/devis/locales/pt';
import { nl } from '../src/i18n/devis/locales/nl';
import { bg } from '../src/i18n/devis/locales/bg';
import { hu } from '../src/i18n/devis/locales/hu';
import { cs } from '../src/i18n/devis/locales/cs';
import { sk } from '../src/i18n/devis/locales/sk';
import { hr } from '../src/i18n/devis/locales/hr';
import { sl } from '../src/i18n/devis/locales/sl';
import { et } from '../src/i18n/devis/locales/et';
import { lt } from '../src/i18n/devis/locales/lt';
import { lv } from '../src/i18n/devis/locales/lv';
import { el } from '../src/i18n/devis/locales/el';
import { fi } from '../src/i18n/devis/locales/fi';
import { sv } from '../src/i18n/devis/locales/sv';
import { da } from '../src/i18n/devis/locales/da';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Cache des traductions locales - 🎉 TOUTES LES 22 LANGUES DISPONIBLES ! 🏆
const LOCAL_TRANSLATIONS: Record<string, DevisTranslations> = {
  fr: fr,
  en: en,
  de: de,
  es: es,
  pl: pl,
  ro: ro,
  it: it,
  pt: pt,
  nl: nl,
  bg: bg,
  hu: hu,
  cs: cs,
  sk: sk,
  hr: hr,
  sl: sl,
  et: et,
  lt: lt,
  lv: lv,
  el: el,
  fi: fi,
  sv: sv,
  da: da,
};

interface UseDevisTranslationReturn {
  t: DevisTranslations;
  isLoading: boolean;
  error: string | null;
  currentLanguage: DevisLanguage;
  changeLanguage: (lang: DevisLanguage) => void;
}

/**
 * Hook pour gérer les traductions du formulaire de devis
 * 
 * @param initialLang - Langue initiale (défaut: 'fr')
 * @returns Objet contenant les traductions et fonctions utilitaires
 * 
 * @example
 * ```tsx
 * function Step1Entreprise() {
 *   const { t, isLoading, changeLanguage } = useDevisTranslation('fr');
 *   
 *   return (
 *     <div>
 *       <h2>{t.step1.title}</h2>
 *       <p>{t.step1.subtitle}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useDevisTranslation(initialLang: DevisLanguage = DEFAULT_LANGUAGE): UseDevisTranslationReturn {
  const [translations, setTranslations] = useState<DevisTranslations>(fr);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<DevisLanguage>(initialLang);

  /**
   * Charger les traductions depuis le backend
   */
  const loadTranslations = useCallback(async (lang: DevisLanguage) => {
    // Si la langue est dans le cache local, utiliser la version locale (pas besoin d'appel API)
    if (LOCAL_TRANSLATIONS[lang]) {
      setTranslations(LOCAL_TRANSLATIONS[lang]);
      setCurrentLanguage(lang);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`🔄 [useDevisTranslation] Chargement des traductions: ${lang}`);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/translations/${lang}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !data.translations) {
        throw new Error(data.error || 'Traductions non disponibles');
      }

      console.log(`✅ [useDevisTranslation] Traductions ${lang} chargées avec succès`);
      setTranslations(data.translations);
      setCurrentLanguage(lang);
      setError(null);

    } catch (err) {
      console.error(`❌ [useDevisTranslation] Erreur chargement traductions ${lang}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
      
      // Fallback: utiliser le français par défaut
      console.warn('⚠️ [useDevisTranslation] Fallback vers le français');
      setTranslations(fr);
      setCurrentLanguage('fr');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Changer la langue active
   */
  const changeLanguage = useCallback((lang: DevisLanguage) => {
    if (lang === currentLanguage) {
      return; // Déjà sur cette langue
    }
    
    console.log(`🌍 [useDevisTranslation] Changement de langue: ${currentLanguage} → ${lang}`);
    loadTranslations(lang);
  }, [currentLanguage, loadTranslations]);

  /**
   * Charger les traductions au montage du composant
   */
  useEffect(() => {
    loadTranslations(initialLang);
  }, []); // Seulement au montage

  return {
    t: translations,
    isLoading,
    error,
    currentLanguage,
    changeLanguage,
  };
}

/**
 * Hook simplifié pour accéder directement aux traductions
 * (sans gestion du changement de langue)
 * 
 * @param lang - Langue souhaitée
 * @returns Traductions et état de chargement
 * 
 * @example
 * ```tsx
 * function MyComponent({ lang }: { lang: DevisLanguage }) {
 *   const { t, isLoading } = useDevisTranslationStatic(lang);
 *   
 *   if (isLoading) return <div>Chargement...</div>;
 *   
 *   return <div>{t.step1.title}</div>;
 * }
 * ```
 */
export function useDevisTranslationStatic(lang: DevisLanguage = DEFAULT_LANGUAGE) {
  const [translations, setTranslations] = useState<DevisTranslations>(LOCAL_TRANSLATIONS[lang] || fr);
  const [isLoading, setIsLoading] = useState(true); // Commencer à true

  useEffect(() => {
    // Si la langue est dans le cache local, l'utiliser directement
    if (LOCAL_TRANSLATIONS[lang]) {
      console.log(`✅ [useDevisTranslationStatic] Traductions ${lang} chargées depuis le cache local`);
      
      // 🔄 Utiliser setTimeout pour permettre à React de terminer le cycle de rendu
      setTimeout(() => {
        setTranslations(LOCAL_TRANSLATIONS[lang]);
        setIsLoading(false);
      }, 0);
      
      return;
    }

    // Sinon, tenter de charger depuis le backend
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/translations/${lang}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Traductions non disponibles');
        }

        const data = await response.json();

        if (isMounted && data.success && data.translations) {
          setTranslations(data.translations);
        }
      } catch (err) {
        console.warn(`⚠️ Fallback vers français pour ${lang}:`, err);
        if (isMounted) {
          setTranslations(fr);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [lang]);

  return {
    t: translations,
    isLoading,
  };
}