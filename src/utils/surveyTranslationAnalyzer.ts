/**
 * 🔍 ANALYSEUR DE TRADUCTIONS SURVEY
 * 
 * Compare survey-questions-COMPLETE.ts (source de vérité)
 * avec les fichiers de traduction i18n/locales/*
 * 
 * Fonctionnalités :
 * - Détection des clés manquantes (questions non traduites)
 * - Détection des clés orphelines (traductions sans question)
 * - Calcul du pourcentage de complétion par langue
 * - Statistiques globales et par profil (AGENCY/CLIENT/WORKER)
 * 
 * @version 1.0.0
 */

import { SURVEY_QUESTIONS } from '../config/survey-questions-COMPLETE';
import type { TranslationBundle, SupportedLanguage, QuestionTranslation } from '../src/i18n/types';

/**
 * Langues supportées avec métadonnées
 */
export const SUPPORTED_LANGUAGES: Array<{
  code: SupportedLanguage;
  name: string;
  flag: string;
}> = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'cz', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'ee', name: 'Eesti', flag: '🇪🇪' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
];

/**
 * Clé de traduction attendue
 */
export interface ExpectedTranslationKey {
  questionId: string;
  keyType: 'label' | 'placeholder' | 'description' | 'option';
  fullKey: string; // questions.q1_nom.label
  optionValue?: string; // Pour les options
  profiles: string[]; // ['agency', 'client', 'worker']
}

/**
 * Résultat d'analyse pour une langue
 */
export interface LanguageAnalysis {
  language: SupportedLanguage;
  languageName: string;
  flag: string;
  totalKeys: number;
  translatedKeys: number;
  missingKeys: ExpectedTranslationKey[];
  orphanKeys: string[];
  completeness: number; // 0-100
  byProfile: {
    agency: { total: number; translated: number; completeness: number };
    client: { total: number; translated: number; completeness: number };
    worker: { total: number; translated: number; completeness: number };
  };
}

/**
 * Résultat d'analyse globale
 */
export interface GlobalAnalysis {
  totalQuestions: number;
  totalKeys: number; // Toutes les clés attendues
  languages: LanguageAnalysis[];
  averageCompleteness: number;
  bestLanguage: SupportedLanguage | null;
  worstLanguage: SupportedLanguage | null;
}

/**
 * Extrait toutes les clés de traduction attendues depuis survey-questions-COMPLETE.ts
 */
export function extractExpectedKeys(): ExpectedTranslationKey[] {
  const keys: ExpectedTranslationKey[] = [];

  for (const question of SURVEY_QUESTIONS) {
    const profiles = question.visibleFor;

    // Label (toujours présent)
    if (question.labelKey) {
      keys.push({
        questionId: question.id,
        keyType: 'label',
        fullKey: question.labelKey,
        profiles,
      });
    }

    // Placeholder (optionnel)
    if (question.placeholderKey) {
      keys.push({
        questionId: question.id,
        keyType: 'placeholder',
        fullKey: question.placeholderKey,
        profiles,
      });
    }

    // Description (optionnel)
    if (question.descriptionKey) {
      keys.push({
        questionId: question.id,
        keyType: 'description',
        fullKey: question.descriptionKey,
        profiles,
      });
    }

    // Options (pour radio, select, multi-select)
    if (question.options && question.options.length > 0) {
      for (const option of question.options) {
        if (option.labelKey) {
          keys.push({
            questionId: question.id,
            keyType: 'option',
            fullKey: option.labelKey,
            optionValue: option.value,
            profiles,
          });
        }
      }
    }
  }

  return keys;
}

/**
 * Vérifie si une clé existe dans un bundle de traduction
 */
function keyExistsInBundle(key: string, bundle: TranslationBundle): boolean {
  // Format attendu: questions.q1_nom.label
  const parts = key.split('.');
  
  if (parts[0] !== 'questions') return false;
  
  const questionId = parts[1];
  const field = parts[2]; // label, placeholder, description, options
  const optionValue = parts[3]; // Pour les options

  const questionTranslation = bundle.questions?.[questionId];
  if (!questionTranslation) return false;

  if (field === 'options' && optionValue) {
    return !!questionTranslation.options?.[optionValue];
  }

  return !!(questionTranslation as any)[field];
}

/**
 * Trouve les clés orphelines (présentes dans le bundle mais pas dans survey-questions)
 */
function findOrphanKeys(bundle: TranslationBundle, expectedKeys: ExpectedTranslationKey[]): string[] {
  const expectedKeySet = new Set(expectedKeys.map(k => k.fullKey));
  const orphans: string[] = [];

  // Parcourir toutes les questions du bundle
  for (const [questionId, questionTranslation] of Object.entries(bundle.questions || {})) {
    // Vérifier label
    if (questionTranslation.label) {
      const key = `questions.${questionId}.label`;
      if (!expectedKeySet.has(key)) {
        orphans.push(key);
      }
    }

    // Vérifier placeholder
    if (questionTranslation.placeholder) {
      const key = `questions.${questionId}.placeholder`;
      if (!expectedKeySet.has(key)) {
        orphans.push(key);
      }
    }

    // Vérifier description
    if (questionTranslation.description) {
      const key = `questions.${questionId}.description`;
      if (!expectedKeySet.has(key)) {
        orphans.push(key);
      }
    }

    // Vérifier options
    if (questionTranslation.options) {
      for (const optionValue of Object.keys(questionTranslation.options)) {
        const key = `questions.${questionId}.options.${optionValue}`;
        if (!expectedKeySet.has(key)) {
          orphans.push(key);
        }
      }
    }
  }

  return orphans;
}

/**
 * Analyse une langue spécifique
 */
export async function analyzeLanguage(
  langCode: SupportedLanguage,
  bundle: TranslationBundle
): Promise<LanguageAnalysis> {
  const expectedKeys = extractExpectedKeys();
  const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === langCode);

  const missingKeys: ExpectedTranslationKey[] = [];
  const translatedKeys: ExpectedTranslationKey[] = [];

  // Vérifier chaque clé attendue
  for (const expectedKey of expectedKeys) {
    if (keyExistsInBundle(expectedKey.fullKey, bundle)) {
      translatedKeys.push(expectedKey);
    } else {
      missingKeys.push(expectedKey);
    }
  }

  // Trouver les clés orphelines
  const orphanKeys = findOrphanKeys(bundle, expectedKeys);

  // Calculer stats par profil
  const byProfile = {
    agency: { total: 0, translated: 0, completeness: 0 },
    client: { total: 0, translated: 0, completeness: 0 },
    worker: { total: 0, translated: 0, completeness: 0 },
  };

  for (const key of expectedKeys) {
    for (const profile of key.profiles) {
      byProfile[profile as keyof typeof byProfile].total++;
    }
  }

  for (const key of translatedKeys) {
    for (const profile of key.profiles) {
      byProfile[profile as keyof typeof byProfile].translated++;
    }
  }

  // Calculer pourcentages
  for (const profile of ['agency', 'client', 'worker'] as const) {
    const stats = byProfile[profile];
    stats.completeness = stats.total > 0 ? Math.round((stats.translated / stats.total) * 100) : 0;
  }

  const completeness = expectedKeys.length > 0 
    ? Math.round((translatedKeys.length / expectedKeys.length) * 100) 
    : 0;

  return {
    language: langCode,
    languageName: langMeta?.name || langCode,
    flag: langMeta?.flag || '🏳️',
    totalKeys: expectedKeys.length,
    translatedKeys: translatedKeys.length,
    missingKeys,
    orphanKeys,
    completeness,
    byProfile,
  };
}

/**
 * Analyse globale de toutes les langues
 */
export async function analyzeAllLanguages(
  bundles: Record<SupportedLanguage, TranslationBundle>
): Promise<GlobalAnalysis> {
  const expectedKeys = extractExpectedKeys();
  const languages: LanguageAnalysis[] = [];

  for (const langCode of SUPPORTED_LANGUAGES.map(l => l.code)) {
    const bundle = bundles[langCode];
    if (bundle) {
      const analysis = await analyzeLanguage(langCode, bundle);
      languages.push(analysis);
    }
  }

  // Calculer moyenne
  const averageCompleteness = languages.length > 0
    ? Math.round(languages.reduce((sum, l) => sum + l.completeness, 0) / languages.length)
    : 0;

  // Meilleure et pire langue
  const sorted = [...languages].sort((a, b) => b.completeness - a.completeness);
  const bestLanguage = sorted[0]?.language || null;
  const worstLanguage = sorted[sorted.length - 1]?.language || null;

  return {
    totalQuestions: SURVEY_QUESTIONS.length,
    totalKeys: expectedKeys.length,
    languages,
    averageCompleteness,
    bestLanguage,
    worstLanguage,
  };
}

/**
 * Filtre les clés manquantes par profil
 */
export function filterMissingKeysByProfile(
  missingKeys: ExpectedTranslationKey[],
  profile: 'agency' | 'client' | 'worker'
): ExpectedTranslationKey[] {
  return missingKeys.filter(key => key.profiles.includes(profile));
}

/**
 * Groupe les clés manquantes par question
 */
export function groupMissingKeysByQuestion(
  missingKeys: ExpectedTranslationKey[]
): Record<string, ExpectedTranslationKey[]> {
  const grouped: Record<string, ExpectedTranslationKey[]> = {};

  for (const key of missingKeys) {
    if (!grouped[key.questionId]) {
      grouped[key.questionId] = [];
    }
    grouped[key.questionId].push(key);
  }

  return grouped;
}
