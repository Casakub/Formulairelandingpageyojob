/**
 * Script pour retirer tous les console.log sensibles
 * Garde uniquement les console.error pour le debugging critique
 */

const fs = require('fs');
const path = require('path');

const SENSITIVE_PATTERNS = [
  // Données utilisateur
  /console\.log\([^)]*(?:email|password|token|session|user|prospect|client)[^)]*\)/gi,
  // URLs et endpoints
  /console\.log\([^)]*(?:supabase\.co|API|endpoint|url)[^)]*\)/gi,
  // Données métier
  /console\.log\([^)]*(?:SIRET|IP|address|phone|certificat)[^)]*\)/gi,
  // Messages de succès qui exposent des données
  /console\.log\(['"`]✅[^)]*:[^)]+\)/gi,
  // Tous les console.log avec emojis (généralement trop verbeux)
  /console\.log\(['"`][🔍🚀📤📥✅❌📦🌍🔄💾🗑️📊📝🔐📍🕐🌐🔧][^)]*\)/gi,
];

const KEEP_PATTERNS = [
  // Garder les console.error (utiles pour le debugging)
  /console\.error/i,
  // Garder les console.warn (warnings importants)
  /console\.warn/i,
];

function shouldRemoveLog(line) {
  // Ne jamais retirer les errors et warnings
  for (const pattern of KEEP_PATTERNS) {
    if (pattern.test(line)) return false;
  }
  
  // Retirer si correspond à un pattern sensible
  for (const pattern of SENSITIVE_PATTERNS) {
    if (pattern.test(line)) return true;
  }
  
  // Retirer tous les console.log restants par sécurité
  return /console\.log\(/.test(line);
}

function cleanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const cleanedLines = [];
  let removedCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (shouldRemoveLog(line)) {
      removedCount++;
      // Retirer la ligne complètement
      continue;
    }
    
    cleanedLines.push(line);
  }
  
  if (removedCount > 0) {
    fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf-8');
    console.log(`✅ ${filePath}: ${removedCount} logs retirés`);
  }
  
  return removedCount;
}

function cleanDirectory(dir) {
  let totalRemoved = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      totalRemoved += cleanDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      totalRemoved += cleanFile(fullPath);
    }
  }
  
  return totalRemoved;
}

// Nettoyer tous les fichiers sensibles
const directories = [
  './components',
  './pages',
  './utils',
];

let grandTotal = 0;
for (const dir of directories) {
  if (fs.existsSync(dir)) {
    console.log(`\n🔍 Nettoyage de ${dir}...`);
    grandTotal += cleanDirectory(dir);
  }
}

console.log(`\n✅ Total: ${grandTotal} console.log sensibles retirés`);
console.log('🔒 Application sécurisée !');
