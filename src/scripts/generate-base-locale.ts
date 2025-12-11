/**
 * 🔧 GÉNÉRATEUR DE LOCALE DE BASE (FR)
 * 
 * Ce script génère automatiquement le fichier de traductions françaises
 * à partir de survey-questions-COMPLETE.ts (source de vérité)
 * 
 * Usage: yarn i18n:generate
 * 
 * @version 2.0.0
 * @date 11 Décembre 2024
 */

import * as fs from 'fs';
import * as path from 'path';
import { SURVEY_QUESTIONS } from '../config/survey-questions-COMPLETE';
import type { TranslationBundle, QuestionTranslation } from '../src/i18n/types';

/**
 * Génère le bundle de traductions FR à partir de SURVEY_QUESTIONS
 */
function generateFrenchBundle(): TranslationBundle {
  const questions: Record<string, QuestionTranslation> = {};
  
  // Parcourir toutes les questions
  for (const question of SURVEY_QUESTIONS) {
    const translation: QuestionTranslation = {};
    
    // Extraire le label
    if (question.labelFallback) {
      translation.label = question.labelFallback;
    }
    
    // Extraire le placeholder
    if (question.placeholderFallback) {
      translation.placeholder = question.placeholderFallback;
    }
    
    // Extraire la description
    if (question.descriptionFallback) {
      translation.description = question.descriptionFallback;
    }
    
    // Extraire les options
    if (question.options && question.options.length > 0) {
      translation.options = {};
      for (const option of question.options) {
        if (option.labelFallback) {
          translation.options[option.value] = option.labelFallback;
        }
      }
    }
    
    // Ajouter métadonnées
    translation._meta = {
      _lastUpdated: new Date().toISOString(),
      _origin: 'generated',
    };
    
    questions[question.id] = translation;
  }
  
  // Bundle complet
  const bundle: TranslationBundle = {
    nav: {
      section1: 'Profil',
      section2: 'Détachement',
      section3: 'Besoins & Budget',
      section4: 'Intérêt YoJob',
      section5: 'Vision Future',
      section6: 'Contact',
    },
    
    common: {
      oui: 'Oui',
      non: 'Non',
      autre: 'Autre',
      loading: 'Chargement...',
      submit: 'Envoyer',
      next: 'Suivant',
      previous: 'Précédent',
      skip: 'Passer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      close: 'Fermer',
      required: 'Obligatoire',
      optional: 'Optionnel',
      error: 'Erreur',
      success: 'Succès',
      completed: 'Complété',
      inProgress: 'En cours',
      notStarted: 'Non commencé',
      profileAgency: 'Agence ETT',
      profileClient: 'Entreprise Cliente',
      profileWorker: 'Travailleur Intérimaire',
    },
    
    sectors: {
      btp: 'BTP',
      industrie: 'Industrie',
      logistique: 'Logistique',
      hotellerie: 'Hôtellerie',
      sante: 'Santé',
      agriculture: 'Agriculture',
      tech: 'Tech/IT',
      autres: 'Autres',
    },
    
    questions,
    
    _meta: {
      _lastUpdated: new Date().toISOString(),
      _origin: 'generated',
      _translatedBy: 'Auto-generator from survey-questions-COMPLETE.ts',
    },
  };
  
  return bundle;
}

/**
 * Écrit le bundle dans un fichier TypeScript
 */
function writeBundle(bundle: TranslationBundle, outputPath: string): void {
  const fileContent = `/**
 * 🇫🇷 TRADUCTIONS FRANÇAISES (BASE LOCALE)
 * 
 * ⚠️ FICHIER AUTO-GÉNÉRÉ - NE PAS ÉDITER MANUELLEMENT
 * 
 * Généré automatiquement depuis survey-questions-COMPLETE.ts
 * Pour régénérer: yarn i18n:generate
 * 
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import type { TranslationBundle } from '../types';

export const fr: TranslationBundle = ${JSON.stringify(bundle, null, 2)};
`;
  
  // Créer le dossier si nécessaire
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Écrire le fichier
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  
  console.log(`✅ Locale FR générée avec succès: ${outputPath}`);
  console.log(`📊 ${Object.keys(bundle.questions).length} questions traduites`);
}

/**
 * Main
 */
function main() {
  console.log('🔧 Génération de la locale de base (FR)...\n');
  
  const bundle = generateFrenchBundle();
  const outputPath = path.join(__dirname, '../src/i18n/locales/fr.generated.ts');
  
  writeBundle(bundle, outputPath);
  
  console.log('\n✨ Génération terminée !');
}

// Exécution
main();
