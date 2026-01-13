/**
 * 🔍 SCRIPT DE VALIDATION DES TRADUCTIONS
 * 
 * Vérifie que toutes les langues ont les mêmes clés de traduction
 * et qu'aucune traduction n'est manquante.
 * 
 * Usage:
 * ```bash
 * npx tsx src/i18n/pages/landingPage/validate-translation.ts
 * ```
 * 
 * @version 1.0.0
 */

import { frLandingPage } from './fr';
import { enLandingPage } from './en';
import { deLandingPage } from './de';
import type { LandingPageContent } from '../../../types/landingContent';

// Fonction pour extraire toutes les clés d'un objet de manière récursive
function getAllKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// Fonction pour comparer deux ensembles de clés
function compareKeys(lang1: string, keys1: string[], lang2: string, keys2: string[]): {
  missingInLang2: string[];
  extraInLang2: string[];
} {
  const missingInLang2 = keys1.filter(key => !keys2.includes(key));
  const extraInLang2 = keys2.filter(key => !keys1.includes(key));
  
  return { missingInLang2, extraInLang2 };
}

// Fonction principale de validation
function validateTranslations() {
  console.log('🔍 VALIDATION DES TRADUCTIONS LANDING PAGE\n');
  console.log('═══════════════════════════════════════════\n');
  
  const languages = {
    fr: { content: frLandingPage, name: 'Français 🇫🇷' },
    en: { content: enLandingPage, name: 'English 🇬🇧' },
    de: { content: deLandingPage, name: 'Deutsch 🇩🇪' },
  };
  
  // Extraire les clés de chaque langue
  const allKeys: Record<string, string[]> = {};
  
  for (const [code, lang] of Object.entries(languages)) {
    allKeys[code] = getAllKeys(lang.content);
    console.log(`📊 ${lang.name}: ${allKeys[code].length} clés de traduction`);
  }
  
  console.log('\n');
  
  // Comparer FR (référence) avec les autres langues
  let hasErrors = false;
  const frKeys = allKeys.fr;
  
  for (const [code, lang] of Object.entries(languages)) {
    if (code === 'fr') continue;
    
    console.log(`🔄 Comparaison FR ↔ ${lang.name}\n`);
    
    const comparison = compareKeys('fr', frKeys, code, allKeys[code]);
    
    if (comparison.missingInLang2.length > 0) {
      hasErrors = true;
      console.log(`❌ Clés manquantes dans ${code.toUpperCase()} (${comparison.missingInLang2.length}):`);
      comparison.missingInLang2.slice(0, 10).forEach(key => {
        console.log(`   - ${key}`);
      });
      if (comparison.missingInLang2.length > 10) {
        console.log(`   ... et ${comparison.missingInLang2.length - 10} autres\n`);
      }
    }
    
    if (comparison.extraInLang2.length > 0) {
      hasErrors = true;
      console.log(`⚠️  Clés supplémentaires dans ${code.toUpperCase()} (${comparison.extraInLang2.length}):`);
      comparison.extraInLang2.slice(0, 10).forEach(key => {
        console.log(`   - ${key}`);
      });
      if (comparison.extraInLang2.length > 10) {
        console.log(`   ... et ${comparison.extraInLang2.length - 10} autres\n`);
      }
    }
    
    if (comparison.missingInLang2.length === 0 && comparison.extraInLang2.length === 0) {
      console.log(`✅ Parfait ! Toutes les clés sont présentes.\n`);
    }
  }
  
  console.log('═══════════════════════════════════════════\n');
  
  if (hasErrors) {
    console.log('❌ VALIDATION ÉCHOUÉE - Des clés sont manquantes ou en trop\n');
    process.exit(1);
  } else {
    console.log('✅ VALIDATION RÉUSSIE - Toutes les traductions sont complètes !\n');
    process.exit(0);
  }
}

// Fonction pour vérifier les valeurs vides
function checkEmptyValues() {
  console.log('🔍 VÉRIFICATION DES VALEURS VIDES\n');
  console.log('═══════════════════════════════════════════\n');
  
  const languages = {
    fr: { content: frLandingPage, name: 'Français 🇫🇷' },
    en: { content: enLandingPage, name: 'English 🇬🇧' },
    de: { content: deLandingPage, name: 'Deutsch 🇩🇪' },
  };
  
  let hasEmptyValues = false;
  
  function checkObject(obj: any, path = ''): string[] {
    const emptyKeys: string[] = [];
    
    for (const key in obj) {
      const fullPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (value === '' || value === null || value === undefined) {
        emptyKeys.push(fullPath);
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        emptyKeys.push(...checkObject(value, fullPath));
      } else if (Array.isArray(value) && value.length === 0) {
        emptyKeys.push(fullPath);
      }
    }
    
    return emptyKeys;
  }
  
  for (const [code, lang] of Object.entries(languages)) {
    const emptyKeys = checkObject(lang.content);
    
    if (emptyKeys.length > 0) {
      hasEmptyValues = true;
      console.log(`⚠️  ${lang.name}: ${emptyKeys.length} valeur(s) vide(s) détectée(s):`);
      emptyKeys.forEach(key => {
        console.log(`   - ${key}`);
      });
      console.log('\n');
    } else {
      console.log(`✅ ${lang.name}: Aucune valeur vide\n`);
    }
  }
  
  console.log('═══════════════════════════════════════════\n');
  
  if (hasEmptyValues) {
    console.log('⚠️  ATTENTION - Certaines valeurs sont vides\n');
  } else {
    console.log('✅ PARFAIT - Aucune valeur vide détectée !\n');
  }
}

// Exécution
console.clear();
validateTranslations();
checkEmptyValues();
