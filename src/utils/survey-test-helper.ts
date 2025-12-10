/**
 * 🧪 HELPER DE TEST POUR LE SYSTÈME MULTI-PROFILS
 * 
 * Utilitaires pour tester rapidement le nouveau système d'enquête
 * Utiliser dans la console navigateur ou en tests unitaires
 */

import type { RespondentType } from '../types/survey';
import { getQuestionsForRespondent, getQuestionCountByType } from '../config/questions-extended';
import { RESPONDENT_PROFILES, RESPONDENT_TO_PROSPECT_TYPE, RESPONDENT_TO_SOURCE } from '../types/survey';

/**
 * Afficher un résumé du système multi-profils
 */
export function displaySystemSummary() {
  console.log('🎯 SYSTÈME D\'ENQUÊTE MULTI-PROFILS - RÉSUMÉ');
  console.log('═'.repeat(60));
  
  const profiles: RespondentType[] = ['agency', 'client', 'worker'];
  
  profiles.forEach(type => {
    const profile = RESPONDENT_PROFILES[type];
    const questions = getQuestionsForRespondent(type);
    const commonQuestions = questions.filter(q => q.category === 'common');
    const specificQuestions = questions.filter(q => q.category === type);
    
    console.log(`\n${profile.icon || '📋'} ${profile.label.toUpperCase()}`);
    console.log('─'.repeat(60));
    console.log(`  Total questions    : ${questions.length}`);
    console.log(`  Questions communes : ${commonQuestions.length}`);
    console.log(`  Questions spécifiques : ${specificQuestions.length}`);
    console.log(`  Durée estimée      : ${profile.estimatedTime}`);
    console.log(`  Type prospect      : ${RESPONDENT_TO_PROSPECT_TYPE[type]}`);
    console.log(`  Source             : ${RESPONDENT_TO_SOURCE[type]}`);
  });
  
  console.log('\n' + '═'.repeat(60));
}

/**
 * Afficher les questions pour un profil donné
 */
export function displayQuestionsForProfile(respondentType: RespondentType) {
  const profile = RESPONDENT_PROFILES[respondentType];
  const questions = getQuestionsForRespondent(respondentType);
  
  console.log(`\n📋 QUESTIONS POUR : ${profile.label}`);
  console.log('═'.repeat(80));
  
  let currentSection = 0;
  
  questions.forEach((q, index) => {
    if (q.section !== currentSection) {
      currentSection = q.section;
      console.log(`\n[SECTION ${q.section}]`);
      console.log('─'.repeat(80));
    }
    
    const categoryBadge = q.category === 'common' ? '🌍' : 
                         q.category === respondentType ? '⭐' : '❓';
    
    console.log(`${index + 1}. ${categoryBadge} ${q.label}`);
    console.log(`   Code: ${q.code} | Type: ${q.type} | Required: ${q.required}`);
    
    if (q.options && q.options.length > 0) {
      console.log(`   Options (${q.options.length}):`, q.options.map(o => o.label).join(', '));
    }
  });
  
  console.log('\n' + '═'.repeat(80));
  console.log(`Total : ${questions.length} questions`);
}

/**
 * Comparer les questions entre profils
 */
export function compareProfiles() {
  console.log('\n📊 COMPARAISON DES PROFILS');
  console.log('═'.repeat(80));
  
  const profiles: RespondentType[] = ['agency', 'client', 'worker'];
  const data: any[] = [];
  
  profiles.forEach(type => {
    const questions = getQuestionsForRespondent(type);
    const common = questions.filter(q => q.category === 'common').length;
    const specific = questions.filter(q => q.category === type).length;
    const sections = [...new Set(questions.map(q => q.section))].length;
    
    data.push({
      profil: RESPONDENT_PROFILES[type].label,
      total: questions.length,
      communes: common,
      spécifiques: specific,
      sections: sections,
    });
  });
  
  console.table(data);
}

/**
 * Générer des données de test pour un profil
 */
export function generateTestData(respondentType: RespondentType): Record<string, any> {
  const questions = getQuestionsForRespondent(respondentType);
  const testData: Record<string, any> = {};
  
  testData.respondent_type = respondentType;
  
  questions.forEach(q => {
    switch (q.type) {
      case 'text':
        testData[q.code] = `Test ${q.code}`;
        break;
      case 'email':
        testData[q.code] = `test-${respondentType}@yojob.com`;
        break;
      case 'number':
        testData[q.code] = 2020;
        break;
      case 'textarea':
        testData[q.code] = `Texte de test pour ${q.code}. Lorem ipsum dolor sit amet.`;
        break;
      case 'radio':
        if (q.options && q.options.length > 0) {
          testData[q.code] = q.options[0].value;
        }
        break;
      case 'multi-select':
        if (q.options && q.options.length > 0) {
          testData[q.code] = [q.options[0].value, q.options[1]?.value].filter(Boolean);
        }
        break;
      case 'score':
        testData[q.code] = 8; // Score par défaut
        break;
      case 'checkbox':
        testData[q.code] = true;
        break;
      default:
        testData[q.code] = null;
    }
  });
  
  return testData;
}

/**
 * Valider les données d'un formulaire
 */
export function validateFormData(respondentType: RespondentType, formData: Record<string, any>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const questions = getQuestionsForRespondent(respondentType);
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Vérifier que respondent_type est correct
  if (formData.respondent_type !== respondentType) {
    errors.push(`respondent_type doit être "${respondentType}", reçu "${formData.respondent_type}"`);
  }
  
  // Vérifier les questions requises
  questions.forEach(q => {
    if (q.required) {
      const value = formData[q.code];
      
      if (value === undefined || value === null || value === '') {
        errors.push(`Question requise manquante : ${q.code} (${q.label})`);
      }
      
      // Validation spéciale pour multi-select
      if (q.type === 'multi-select' && Array.isArray(value) && value.length === 0) {
        errors.push(`Question requise vide : ${q.code} (${q.label})`);
      }
    }
  });
  
  // Vérifier les questions conditionnelles
  questions.forEach(q => {
    if (q.conditional) {
      const parentValue = formData[q.conditional.dependsOn];
      const shouldShow = parentValue === q.conditional.showWhen;
      
      if (shouldShow && q.required && !formData[q.code]) {
        errors.push(`Question conditionnelle requise manquante : ${q.code}`);
      }
    }
  });
  
  // Warnings pour les champs non-requis vides
  questions.forEach(q => {
    if (!q.required && !formData[q.code]) {
      warnings.push(`Question optionnelle vide : ${q.code}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Simuler une soumission complète
 */
export async function simulateSubmission(respondentType: RespondentType): Promise<void> {
  console.log(`\n🚀 SIMULATION SOUMISSION : ${RESPONDENT_PROFILES[respondentType].label}`);
  console.log('═'.repeat(80));
  
  // 1. Générer données de test
  console.log('1️⃣ Génération des données de test...');
  const testData = generateTestData(respondentType);
  console.log(`   ✅ ${Object.keys(testData).length} champs générés`);
  
  // 2. Valider les données
  console.log('\n2️⃣ Validation des données...');
  const validation = validateFormData(respondentType, testData);
  
  if (validation.isValid) {
    console.log('   ✅ Validation réussie');
  } else {
    console.log('   ❌ Erreurs de validation :');
    validation.errors.forEach(err => console.log(`      - ${err}`));
  }
  
  if (validation.warnings.length > 0) {
    console.log('   ⚠️ Warnings :');
    validation.warnings.forEach(warn => console.log(`      - ${warn}`));
  }
  
  // 3. Préparer payload
  console.log('\n3️⃣ Préparation du payload...');
  const payload = {
    response_id: `test-${respondentType}-${Date.now()}`,
    respondent_type: respondentType,
    country: testData.q_common_1_pays || 'France',
    interest_level: testData.q_common_8_score >= 7 ? 'high' : testData.q_common_8_score >= 4 ? 'medium' : 'low',
    responses: testData,
    submitted_at: new Date().toISOString(),
    language_code: 'fr',
  };
  
  console.log('   ✅ Payload créé');
  console.log(`   → Response ID: ${payload.response_id}`);
  console.log(`   → Interest Level: ${payload.interest_level}`);
  
  // 4. Afficher le résumé
  console.log('\n4️⃣ Résumé de la soumission');
  console.log('─'.repeat(80));
  console.log(`   Type répondant     : ${respondentType}`);
  console.log(`   Type prospect CRM  : ${RESPONDENT_TO_PROSPECT_TYPE[respondentType]}`);
  console.log(`   Source CRM         : ${RESPONDENT_TO_SOURCE[respondentType]}`);
  console.log(`   Pays               : ${payload.country}`);
  console.log(`   Niveau d'intérêt   : ${payload.interest_level}`);
  console.log(`   Nombre de réponses : ${Object.keys(payload.responses).length}`);
  
  console.log('\n📦 Payload complet :');
  console.log(JSON.stringify(payload, null, 2));
  
  console.log('\n' + '═'.repeat(80));
  console.log('✅ Simulation terminée');
}

/**
 * Tester tous les profils
 */
export async function testAllProfiles() {
  console.log('\n🧪 TEST COMPLET DES 3 PROFILS');
  console.log('═'.repeat(80));
  
  const profiles: RespondentType[] = ['agency', 'client', 'worker'];
  
  for (const type of profiles) {
    await simulateSubmission(type);
    console.log('\n\n');
  }
  
  console.log('✅ TOUS LES TESTS TERMINÉS');
}

/**
 * Afficher les statistiques du système
 */
export function displayStats() {
  console.log('\n📊 STATISTIQUES DU SYSTÈME');
  console.log('═'.repeat(80));
  
  const profiles: RespondentType[] = ['agency', 'client', 'worker'];
  
  let totalQuestions = 0;
  let uniqueQuestions = new Set<string>();
  
  profiles.forEach(type => {
    const questions = getQuestionsForRespondent(type);
    totalQuestions += questions.length;
    questions.forEach(q => uniqueQuestions.add(q.id));
  });
  
  const commonQuestions = getQuestionsForRespondent('agency').filter(q => q.category === 'common');
  
  console.log(`  Profils disponibles      : ${profiles.length}`);
  console.log(`  Questions totales (tous) : ${totalQuestions}`);
  console.log(`  Questions uniques        : ${uniqueQuestions.size}`);
  console.log(`  Questions communes       : ${commonQuestions.length}`);
  console.log(`  Questions agences        : ${getQuestionCountByType('agency') - commonQuestions.length}`);
  console.log(`  Questions clients        : ${getQuestionCountByType('client') - commonQuestions.length}`);
  console.log(`  Questions intérimaires   : ${getQuestionCountByType('worker') - commonQuestions.length}`);
  
  console.log('\n' + '═'.repeat(80));
}

// Export global pour utilisation dans console
if (typeof window !== 'undefined') {
  (window as any).surveyTestHelper = {
    displaySystemSummary,
    displayQuestionsForProfile,
    compareProfiles,
    generateTestData,
    validateFormData,
    simulateSubmission,
    testAllProfiles,
    displayStats,
  };
  
  console.log('🧪 Survey Test Helper chargé !');
  console.log('   Utilisation : window.surveyTestHelper.displaySystemSummary()');
}

// Export par défaut
export default {
  displaySystemSummary,
  displayQuestionsForProfile,
  compareProfiles,
  generateTestData,
  validateFormData,
  simulateSubmission,
  testAllProfiles,
  displayStats,
};
