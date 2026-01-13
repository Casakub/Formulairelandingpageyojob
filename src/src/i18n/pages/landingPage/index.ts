/**
 * 🏠 TRADUCTIONS LANDING PAGE - CENTRALISÉES
 * 
 * Structure modulaire identique aux pages de services :
 * - /landingPage/fr.ts, /landingPage/en.ts, etc.
 * 
 * Avantages :
 * - ✅ Fichiers légers et organisés
 * - ✅ Pas de dépendance à Supabase
 * - ✅ Performance optimale (pas de requête réseau)
 * - ✅ Synchronisation parfaite avec useLanguageManager
 * - ✅ Facile à maintenir
 * 
 * @version 2.0.0 - Migration depuis Supabase vers fichiers statiques
 */

import type { SupportedLanguage } from '../../types';
import type { LandingPageContent } from '../../../types/landingContent';

// Import des traductions par langue
import { frLandingPage } from './fr';
import { enLandingPage } from './en';
import { deLandingPage } from './de';
import { esLandingPage } from './es';
import { itLandingPage } from './it';
import { nlLandingPage } from './nl';
import { ptLandingPage } from './pt';
import { plLandingPage } from './pl';
import { csLandingPage } from './cs';
import { skLandingPage } from './sk';
import { huLandingPage } from './hu';
import { roLandingPage } from './ro';
import { bgLandingPage } from './bg';
import { hrLandingPage } from './hr';
import { slLandingPage } from './sl';
import { etLandingPage } from './et';
import { lvLandingPage } from './lv';
import { ltLandingPage } from './lt';
import { elLandingPage } from './el';
import { svLandingPage } from './sv';
import { daLandingPage } from './da';
import { fiLandingPage } from './fi';
import { noLandingPage } from './no';

// Liste des langues disponibles pour la landing page
export const AVAILABLE_LANGUAGES_LANDING: SupportedLanguage[] = ['fr', 'en', 'de', 'es', 'it', 'nl', 'pt', 'pl', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sl', 'et', 'lv', 'lt', 'el', 'sv', 'da', 'fi', 'no'];

/**
 * Récupère les traductions pour une langue donnée
 * 
 * @param language - Code langue (fr, en, de, es, it, nl, pt, pl, cs, sk, hu, ro, bg, hr, sl, et, lv, lt, el, sv, da, fi, no, etc.)
 * @returns Traductions de la landing page
 * 
 * @example
 * const t = getLandingPageTranslation('fr');
 * console.log(t.hero.title); // "Leader du recrutement européen"
 */
export function getLandingPageTranslation(language: SupportedLanguage = 'fr'): LandingPageContent {
  const translations: Record<string, LandingPageContent> = {
    fr: frLandingPage,
    en: enLandingPage,
    de: deLandingPage,
    es: esLandingPage,
    it: itLandingPage,
    nl: nlLandingPage,
    pt: ptLandingPage,
    pl: plLandingPage,
    cs: csLandingPage,
    sk: skLandingPage,
    hu: huLandingPage,
    ro: roLandingPage,
    bg: bgLandingPage,
    hr: hrLandingPage,
    sl: slLandingPage,
    et: etLandingPage,
    lv: lvLandingPage,
    lt: ltLandingPage,
    el: elLandingPage,
    sv: svLandingPage,
    da: daLandingPage,
    fi: fiLandingPage,
    no: noLandingPage,
  };

  // Fallback sur le français si la langue n'est pas disponible
  return translations[language] || translations['fr'];
}