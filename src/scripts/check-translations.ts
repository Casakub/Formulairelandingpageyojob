/**
 * 🔍 VÉRIFICATEUR DE TRADUCTIONS
 * 
 * Audite toutes les langues pour détecter :
 * - Clés manquantes
 * - Clés obsolètes
 * - Clés nécessitant révision
 * - Taux de complétion
 * 
 * Usage: yarn i18n:check
 * 
 * @version 2.0.0
 * @date 11 Décembre 2024
 */

import { SURVEY_QUESTIONS } from '../config/survey-questions-COMPLETE';
import type { 
  TranslationBundle, 
  SupportedLanguage,
  TranslationAuditResult 
} from '../src/i18n/types';

/**
 * Extrait toutes les clés attendues depuis SURVEY_QUESTIONS
 */
function getExpectedKeys(): Set<string> {
  const keys = new Set<string>();
  
  // Clés de navigation
  for (let i = 1; i <= 6; i++) {
    keys.add(`nav.section${i}`);
  }
  
  // Clés communes
  const commonKeys = [
    'oui', 'non', 'autre', 'loading', 'submit', 'next', 'previous', 'skip',
    'save', 'cancel', 'close', 'required', 'optional', 'error', 'success',
    'completed', 'inProgress', 'notStarted',
    'profileAgency', 'profileClient', 'profileWorker'
  ];
  commonKeys.forEach(k => keys.add(`common.${k}`));
  
  // Clés secteurs
  const sectorKeys = ['btp', 'industrie', 'logistique', 'hotellerie', 'sante', 'agriculture', 'tech', 'autres'];
  sectorKeys.forEach(k => keys.add(`sectors.${k}`));
  
  // Clés des questions
  for (const question of SURVEY_QUESTIONS) {
    // Label
    if (question.labelKey) {
      keys.add(question.labelKey);
    }
    
    // Placeholder
    if (question.placeholderKey) {
      keys.add(question.placeholderKey);
    }
    
    // Description
    if (question.descriptionKey) {
      keys.add(question.descriptionKey);
    }
    
    // Options
    if (question.options) {
      for (const option of question.options) {
        if (option.labelKey) {
          keys.add(option.labelKey);
        }
      }
    }
  }
  
  return keys;
}

/**
 * Extrait toutes les clés présentes dans un bundle
 */
function getBundleKeys(bundle: TranslationBundle): Set<string> {
  const keys = new Set<string>();
  
  // Navigation
  Object.keys(bundle.nav).forEach(k => keys.add(`nav.${k}`));
  
  // Common
  Object.keys(bundle.common).forEach(k => keys.add(`common.${k}`));
  
  // Sectors
  Object.keys(bundle.sectors).forEach(k => keys.add(`sectors.${k}`));
  
  // Questions
  Object.entries(bundle.questions).forEach(([questionId, translation]) => {
    if (translation.label) {
      keys.add(`questions.${questionId}.label`);
    }
    if (translation.placeholder) {
      keys.add(`questions.${questionId}.placeholder`);
    }
    if (translation.description) {
      keys.add(`questions.${questionId}.description`);
    }
    if (translation.options) {
      Object.keys(translation.options).forEach(optValue => {
        keys.add(`questions.${questionId}.options.${optValue}`);
      });
    }
  });
  
  return keys;
}

/**
 * Audite un bundle de traduction
 */
function auditBundle(
  lang: SupportedLanguage,
  bundle: TranslationBundle,
  expectedKeys: Set<string>
): TranslationAuditResult {
  const bundleKeys = getBundleKeys(bundle);
  
  // Clés manquantes
  const missingKeys: string[] = [];
  expectedKeys.forEach(key => {
    if (!bundleKeys.has(key)) {
      missingKeys.push(key);
    }
  });
  
  // Clés obsolètes
  const obsoleteKeys: string[] = [];
  bundleKeys.forEach(key => {
    if (!expectedKeys.has(key)) {
      obsoleteKeys.push(key);
    }
  });
  
  // Clés nécessitant révision
  const needsReviewKeys: string[] = [];
  Object.entries(bundle.questions).forEach(([questionId, translation]) => {
    if (translation._meta?._needsReview) {
      needsReviewKeys.push(`questions.${questionId}`);
    }
  });
  
  // Calcul de complétion
  const totalKeys = expectedKeys.size;
  const translatedKeys = totalKeys - missingKeys.length;
  const completeness = Math.round((translatedKeys / totalKeys) * 100);
  
  return {
    language: lang,
    totalKeys,
    translatedKeys,
    missingKeys,
    obsoleteKeys,
    needsReviewKeys,
    completeness,
    lastChecked: new Date().toISOString(),
  };
}

/**
 * Affiche le rapport d'audit
 */
function displayAuditReport(results: TranslationAuditResult[]): void {
  console.log('\n📊 RAPPORT D\'AUDIT DES TRADUCTIONS\n');
  console.log('='.repeat(80));
  
  let totalIssues = 0;
  
  for (const result of results) {
    const issues = result.missingKeys.length + result.obsoleteKeys.length;
    totalIssues += issues;
    
    const statusIcon = result.completeness === 100 ? '✅' : 
                       result.completeness >= 80 ? '⚠️' : '❌';
    
    console.log(`\n${statusIcon} ${result.language.toUpperCase()} - ${result.completeness}% complet`);
    console.log(`   Traduites: ${result.translatedKeys}/${result.totalKeys}`);
    
    if (result.missingKeys.length > 0) {
      console.log(`   ❌ ${result.missingKeys.length} clés manquantes:`);
      result.missingKeys.slice(0, 5).forEach(key => {
        console.log(`      - ${key}`);
      });
      if (result.missingKeys.length > 5) {
        console.log(`      ... et ${result.missingKeys.length - 5} autres`);
      }
    }
    
    if (result.obsoleteKeys.length > 0) {
      console.log(`   ⚠️  ${result.obsoleteKeys.length} clés obsolètes:`);
      result.obsoleteKeys.slice(0, 3).forEach(key => {
        console.log(`      - ${key}`);
      });
      if (result.obsoleteKeys.length > 3) {
        console.log(`      ... et ${result.obsoleteKeys.length - 3} autres`);
      }
    }
    
    if (result.needsReviewKeys.length > 0) {
      console.log(`   🔍 ${result.needsReviewKeys.length} clés à réviser`);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log(`\n📈 RÉSUMÉ GLOBAL:`);
  console.log(`   Total problèmes détectés: ${totalIssues}`);
  
  const avgCompleteness = Math.round(
    results.reduce((sum, r) => sum + r.completeness, 0) / results.length
  );
  console.log(`   Taux de complétion moyen: ${avgCompleteness}%`);
  
  if (totalIssues === 0) {
    console.log('\n✨ Toutes les traductions sont à jour !');
  } else {
    console.log(`\n⚠️  Action requise: ${totalIssues} problèmes à corriger`);
  }
  
  console.log('');
}

/**
 * Main
 */
async function main() {
  console.log('🔍 Vérification des traductions...\n');
  
  // Charger les bundles (pour l'instant juste FR généré)
  let bundles: Record<string, TranslationBundle>;
  
  try {
    const { fr } = await import('../src/i18n/locales/fr.generated');
    bundles = { fr };
  } catch (error) {
    console.error('❌ Erreur: Impossible de charger les traductions');
    console.error('   Assurez-vous d\'avoir lancé: yarn i18n:generate');
    process.exit(1);
  }
  
  // Obtenir les clés attendues
  const expectedKeys = getExpectedKeys();
  
  console.log(`📋 ${expectedKeys.size} clés attendues au total\n`);
  
  // Auditer chaque langue
  const results: TranslationAuditResult[] = [];
  
  for (const [lang, bundle] of Object.entries(bundles)) {
    const result = auditBundle(lang as SupportedLanguage, bundle, expectedKeys);
    results.push(result);
  }
  
  // Afficher le rapport
  displayAuditReport(results);
  
  // Exit code basé sur les résultats
  const hasIssues = results.some(r => r.missingKeys.length > 0);
  process.exit(hasIssues ? 1 : 0);
}

// Exécution
main();
