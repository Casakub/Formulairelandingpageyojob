/**
 * 🌐 Script pour ajouter les traductions des NOUVEAUX champs de contact (Q26-Q29)
 * 
 * À exécuter depuis la console du dashboard admin après authentification
 * 
 * Nouveaux champs:
 * - q26_phone : Téléphone professionnel
 * - q27_firstname : Prénom
 * - q28_lastname : Nom
 * - q29_siret : SIRET/SIREN (optionnel)
 */

import { projectId, publicAnonKey } from '../utils/supabase/info';

interface TranslationEntry {
  question_id: string;
  lang_code: string;
  label: string;
  placeholder?: string;
  description?: string;
  status: 'validated' | 'auto-api';
}

// ✅ TRADUCTIONS DES NOUVEAUX CHAMPS DE CONTACT
const CONTACT_FIELDS_TRANSLATIONS: TranslationEntry[] = [
  // ========== Q26: Téléphone ==========
  {
    question_id: 'q26_phone',
    lang_code: 'fr',
    label: 'Téléphone professionnel',
    placeholder: '+33 6 12 34 56 78',
    status: 'validated'
  },
  {
    question_id: 'q26_phone',
    lang_code: 'en',
    label: 'Professional Phone',
    placeholder: '+33 6 12 34 56 78',
    status: 'validated'
  },
  
  // ========== Q27: Prénom ==========
  {
    question_id: 'q27_firstname',
    lang_code: 'fr',
    label: 'Prénom',
    placeholder: 'Votre prénom',
    status: 'validated'
  },
  {
    question_id: 'q27_firstname',
    lang_code: 'en',
    label: 'First Name',
    placeholder: 'Your first name',
    status: 'validated'
  },
  
  // ========== Q28: Nom ==========
  {
    question_id: 'q28_lastname',
    lang_code: 'fr',
    label: 'Nom',
    placeholder: 'Votre nom',
    status: 'validated'
  },
  {
    question_id: 'q28_lastname',
    lang_code: 'en',
    label: 'Last Name',
    placeholder: 'Your last name',
    status: 'validated'
  },
  
  // ========== Q29: SIRET ==========
  {
    question_id: 'q29_siret',
    lang_code: 'fr',
    label: 'SIRET ou SIREN (optionnel)',
    placeholder: '123 456 789 00012',
    description: 'Pour enrichissement via Pappers/Société.com',
    status: 'validated'
  },
  {
    question_id: 'q29_siret',
    lang_code: 'en',
    label: 'SIRET or SIREN (optional)',
    placeholder: '123 456 789 00012',
    description: 'For data enrichment via Pappers/Société.com',
    status: 'validated'
  },
];

/**
 * Fonction pour sauvegarder une traduction
 */
async function saveTranslation(entry: TranslationEntry): Promise<boolean> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/questions/${entry.question_id}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          langCode: entry.lang_code,
          text: entry.label,
          placeholder: entry.placeholder,
          description: entry.description,
          status: entry.status
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`❌ Erreur pour ${entry.question_id} (${entry.lang_code}):`, errorData);
      return false;
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error(`❌ Erreur réseau pour ${entry.question_id} (${entry.lang_code}):`, error);
    return false;
  }
}

/**
 * Fonction principale d'importation
 */
export async function seedContactFieldsTranslations() {
  console.log('🌱 Début de l\'importation des traductions des champs de contact...');
  console.log(`📊 Total: ${CONTACT_FIELDS_TRANSLATIONS.length} traductions à importer`);
  console.log('   - FR: 4 questions × 1 = 4 traductions');
  console.log('   - EN: 4 questions × 1 = 4 traductions');
  
  let successCount = 0;
  let errorCount = 0;

  for (const entry of CONTACT_FIELDS_TRANSLATIONS) {
    console.log(`⏳ Import: ${entry.question_id} (${entry.lang_code})...`);
    
    const success = await saveTranslation(entry);
    
    if (success) {
      successCount++;
      console.log(`   ✅ OK`);
    } else {
      errorCount++;
      console.log(`   ❌ ÉCHEC`);
    }
    
    // Petit délai pour éviter de surcharger l'API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 RÉSUMÉ:');
  console.log(`   ✅ Succès: ${successCount}/${CONTACT_FIELDS_TRANSLATIONS.length}`);
  console.log(`   ❌ Erreurs: ${errorCount}/${CONTACT_FIELDS_TRANSLATIONS.length}`);
  
  if (successCount === CONTACT_FIELDS_TRANSLATIONS.length) {
    console.log('\n✨ Toutes les traductions ont été importées avec succès !');
    console.log('🔄 Rechargez la page pour voir les nouveaux champs traduits.');
  } else {
    console.log('\n⚠️ Certaines traductions n\'ont pas été importées.');
    console.log('💡 Vérifiez les erreurs ci-dessus et réessayez.');
  }
}

// Export pour utilisation en tant que fonction autonome
if (typeof window !== 'undefined') {
  (window as any).seedContactFieldsTranslations = seedContactFieldsTranslations;
  console.log('💡 Fonction disponible: window.seedContactFieldsTranslations()');
}
