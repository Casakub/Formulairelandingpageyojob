/**
 * Script to check which UI translations are missing in the database
 * Run this from the browser console (F12)
 * 
 * Usage:
 * 1. Open any page of the app
 * 2. Open browser console (F12)
 * 3. Copy-paste this entire script
 * 4. Press Enter
 */

const EXPECTED_UI_TEXTS = [
  // Section 6 Contact (5)
  'section6.consent.contact.title',
  'section6.consent.contact.description',
  'section6.consent.report.title',
  'section6.consent.report.description',
  'section6.rgpd',
  
  // Confirmation Toast (2)
  'confirmation.toast.title',
  'confirmation.toast.description',
  
  // Confirmation Screen (10)
  'confirmation.title',
  'confirmation.description',
  'confirmation.reward.report.title',
  'confirmation.reward.report.description',
  'confirmation.reward.earlyaccess.title',
  'confirmation.reward.earlyaccess.description',
  'confirmation.cta',
  'confirmation.thanks.title',
  'confirmation.thanks.item1',
  'confirmation.thanks.item2',
];

async function checkMissingTranslations() {
  console.log('🔍 Checking for missing UI translations...\n');
  
  const missing = [];
  const existing = [];
  const errors = [];

  for (const textId of EXPECTED_UI_TEXTS) {
    try {
      // Try to fetch from API
      const response = await fetch(`/api/i18n/ui-texts/${textId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.translation) {
          existing.push(textId);
          console.log(`✅ Found: ${textId}`);
        } else {
          missing.push(textId);
          console.log(`❌ Missing: ${textId}`);
        }
      } else if (response.status === 404) {
        missing.push(textId);
        console.log(`❌ Missing: ${textId}`);
      } else {
        errors.push(textId);
        console.log(`⚠️  Error checking: ${textId}`);
      }
    } catch (error) {
      errors.push(textId);
      console.log(`⚠️  Error checking: ${textId} - ${error.message}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║        TRANSLATION STATUS REPORT              ║');
  console.log('╠════════════════════════════════════════════════╣');
  console.log(`║  ✅ Existing:  ${existing.length.toString().padStart(3, ' ')} / ${EXPECTED_UI_TEXTS.length}  ║`);
  console.log(`║  ❌ Missing:   ${missing.length.toString().padStart(3, ' ')} / ${EXPECTED_UI_TEXTS.length}  ║`);
  console.log(`║  ⚠️  Errors:   ${errors.length.toString().padStart(3, ' ')} / ${EXPECTED_UI_TEXTS.length}  ║`);
  console.log('╚════════════════════════════════════════════════╝\n');

  if (missing.length > 0) {
    console.log('📝 Missing Text IDs:');
    missing.forEach(id => console.log(`   - ${id}`));
    console.log('');
    console.log('💡 To add these translations, run:');
    console.log('   /scripts/seed-all-missing-translations.ts');
  } else if (existing.length === EXPECTED_UI_TEXTS.length) {
    console.log('🎉 All translations are present in the database!');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Export the template (Dashboard → Export → Template)');
    console.log('   2. Send to Claude for translation in 22 languages');
    console.log('   3. Import the completed JSON');
  }

  if (errors.length > 0) {
    console.log('\n⚠️  Errors occurred while checking:');
    errors.forEach(id => console.log(`   - ${id}`));
  }
}

// Auto-run when pasted in console
checkMissingTranslations();
