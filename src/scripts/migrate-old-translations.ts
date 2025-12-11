/**
 * 🔄 MIGRATION DES ANCIENNES TRADUCTIONS
 * 
 * Script one-time pour migrer les traductions existantes
 * depuis translations-complete-DELETE.ts et translations-european-DELETE.ts
 * vers le nouveau système i18n v2
 * 
 * Usage: yarn i18n:migrate
 * 
 * @version 2.0.0
 * @date 11 Décembre 2024
 */

import * as fs from 'fs';
import * as path from 'path';
import type { TranslationBundle, QuestionTranslation } from '../src/i18n/types';

/**
 * Table de correspondance des anciennes clés vers nouvelles
 * Format: { oldKey: newKey }
 */
const KEY_MAPPING: Record<string, string> = {
  // Questions renommées
  'q7_exp_detachement': 'q6_volume',
  'q7_travail_etranger': 'q6_frequence',
  'q8_pays_origine_client': 'q5_localisation',
  'q8_pays_travailles': 'q5_pays_travail',
  'q9_freins': 'q9_defi_client',
  'q9_satisfaction': 'q13_satisfaction',
  'q10_delai': 'q10_agences',
  'q10_difficultes': 'q11_incidents',
  'q11_certifications': 'q14_risques',
  'q11_budget_client': 'q12_budget_client',
  'q11_ameliorations': 'q15_ameliorations',
  'q12_documents': 'q14_risques',
  'q12_criteres': 'q13_satisfaction',
  'q12_langues': 'q15_besoins_client',
  'q13_conformite_agency': 'q14_risques',
  'q13_conformite_client': 'q14_risques_client',
  'q13_competences': 'q15_ameliorations',
  'q15_budget_conformite': 'q12_budget',
  'q15_partenaire': 'q10_agences',
  'q15_support_souhaite': 'q15_besoins_client',
  'q16_cout_recrutement': 'q12_budget_client',
  'q16_agence_actuelle': 'q13_satisfaction',
  'q17_features': 'q19_features',
  'q19_prix': 'q20_prix',
  'q20_concurrents': 'q23_role',
  'q21_recommandation': 'q22_mvp',
  'q22_vision': 'q24_evolution',
  'q23_besoins': 'q25_besoins',
  'q24_email': 'email',
  'q25_telephone': 'q26_phone',
  'q26_siret': 'q29_siret',
  'q27_linkedin': 'q25_besoins',
  'q28_demo': 'q22_mvp',
  'q29_early_access': 'q22_mvp',
  'q30_commentaires': 'q25_besoins',
};

/**
 * Charge l'ancien fichier de traductions
 */
async function loadOldTranslations(): Promise<any> {
  try {
    const oldTranslations = await import('../config/translations-complete-DELETE');
    return oldTranslations.COMPLETE_TRANSLATIONS || oldTranslations.default;
  } catch (error) {
    console.warn('⚠️  Impossible de charger translations-complete-DELETE.ts');
    console.warn('   Le fichier sera peut-être renommé plus tard.');
    return null;
  }
}

/**
 * Migre une question de l'ancien format vers le nouveau
 */
function migrateQuestion(
  oldQuestionData: any,
  questionId: string
): QuestionTranslation | null {
  if (!oldQuestionData) return null;
  
  const translation: QuestionTranslation = {};
  
  // Migrer le label
  if (typeof oldQuestionData.label === 'string') {
    translation.label = oldQuestionData.label;
  } else if (typeof oldQuestionData.label === 'object') {
    // Si c'est un objet avec agency/client/worker, prendre agency par défaut
    translation.label = oldQuestionData.label.agency || 
                       oldQuestionData.label.client || 
                       oldQuestionData.label.worker;
  }
  
  // Migrer le placeholder
  if (typeof oldQuestionData.placeholder === 'string') {
    translation.placeholder = oldQuestionData.placeholder;
  } else if (typeof oldQuestionData.placeholder === 'object') {
    translation.placeholder = oldQuestionData.placeholder.agency || 
                              oldQuestionData.placeholder.client || 
                              oldQuestionData.placeholder.worker;
  }
  
  // Migrer la description
  if (oldQuestionData.description) {
    translation.description = oldQuestionData.description;
  }
  
  // Migrer les options
  if (oldQuestionData.options) {
    translation.options = { ...oldQuestionData.options };
  }
  
  // Ajouter métadonnées
  translation._meta = {
    _lastUpdated: new Date().toISOString(),
    _origin: 'migrated',
    _needsReview: true, // Marquer pour révision manuelle
  };
  
  return Object.keys(translation).length > 1 ? translation : null;
}

/**
 * Migre un bundle complet
 */
function migrateBundle(
  oldBundle: any,
  languageCode: string
): TranslationBundle {
  const questions: Record<string, QuestionTranslation> = {};
  
  // Migrer les questions
  if (oldBundle.questions) {
    for (const [oldKey, oldData] of Object.entries(oldBundle.questions)) {
      // Déterminer la nouvelle clé
      const newKey = KEY_MAPPING[oldKey] || oldKey;
      
      // Migrer la question
      const migrated = migrateQuestion(oldData, newKey);
      if (migrated) {
        questions[newKey] = migrated;
      }
    }
  }
  
  // Créer le bundle
  const bundle: TranslationBundle = {
    nav: oldBundle.nav || {
      section1: '',
      section2: '',
      section3: '',
      section4: '',
      section5: '',
      section6: '',
    },
    
    common: oldBundle.common || {},
    
    sectors: oldBundle.sectors || {},
    
    questions,
    
    _meta: {
      _lastUpdated: new Date().toISOString(),
      _origin: 'migrated',
      _translatedBy: `Migration from old ${languageCode} bundle`,
      _needsReview: true,
    },
  };
  
  return bundle;
}

/**
 * Écrit un bundle dans un fichier
 */
function writeLocaleFile(
  lang: string,
  bundle: TranslationBundle,
  outputDir: string
): void {
  const fileContent = `/**
 * 🌍 TRADUCTIONS ${lang.toUpperCase()}
 * 
 * ⚠️ Fichier migré automatiquement - RÉVISION MANUELLE REQUISE
 * 
 * Migré depuis l'ancien système de traductions
 * Date de migration: ${new Date().toISOString()}
 * 
 * TODO: Vérifier et compléter les traductions manquantes
 * TODO: Retirer le flag _needsReview après révision
 * 
 * @version 2.0.0
 * @migrated ${new Date().toISOString()}
 */

import type { TranslationBundle } from '../types';
import { fr } from './fr.generated';

export const ${lang}: TranslationBundle = {
  // Hérite de FR pour les clés manquantes
  ...fr,
  
  // Traductions spécifiques ${lang.toUpperCase()}
  nav: ${JSON.stringify(bundle.nav, null, 2)},
  
  common: ${JSON.stringify(bundle.common, null, 2)},
  
  sectors: ${JSON.stringify(bundle.sectors, null, 2)},
  
  questions: ${JSON.stringify(bundle.questions, null, 2)},
  
  _meta: ${JSON.stringify(bundle._meta, null, 2)},
};
`;
  
  const filePath = path.join(outputDir, `${lang}.ts`);
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  
  console.log(`✅ ${lang.toUpperCase()} migré: ${filePath}`);
}

/**
 * Main
 */
async function main() {
  console.log('🔄 Migration des anciennes traductions...\n');
  
  const outputDir = path.join(__dirname, '../src/i18n/locales');
  
  // Créer le dossier si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Charger les anciennes traductions
  const oldTranslations = await loadOldTranslations();
  
  if (!oldTranslations) {
    console.log('⚠️  Aucune ancienne traduction trouvée.');
    console.log('   Migration annulée.\n');
    return;
  }
  
  // Langues à migrer
  const languagesToMigrate = ['en', 'de', 'es', 'it', 'pt', 'nl'];
  
  let migratedCount = 0;
  
  for (const lang of languagesToMigrate) {
    if (oldTranslations[lang]) {
      const migratedBundle = migrateBundle(oldTranslations[lang], lang);
      writeLocaleFile(lang, migratedBundle, outputDir);
      migratedCount++;
    } else {
      console.log(`⚠️  ${lang.toUpperCase()}: Pas de traductions trouvées (skip)`);
    }
  }
  
  console.log(`\n✨ Migration terminée: ${migratedCount} langue(s) migrée(s)`);
  console.log(`\n⚠️  IMPORTANT: Révision manuelle requise !`);
  console.log(`   Vérifiez les fichiers générés dans: ${outputDir}`);
  console.log(`   Lancez ensuite: yarn i18n:check\n`);
}

// Exécution
main();
