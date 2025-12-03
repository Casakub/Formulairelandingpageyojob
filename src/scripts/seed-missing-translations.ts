/**
 * Script to add missing Section 6 Contact translations to the database
 * Run this from the browser console when logged in as admin
 * 
 * Usage:
 * 1. Login to admin dashboard
 * 2. Open browser console (F12)
 * 3. Copy-paste this entire script
 * 4. Press Enter
 */

const MISSING_TRANSLATIONS = [
  {
    text_id: 'section6.consent.contact.title',
    category: 'ui',
    translations: {
      fr: "J'autorise YoJob à me recontacter"
    }
  },
  {
    text_id: 'section6.consent.contact.description',
    category: 'ui',
    translations: {
      fr: "Pour discuter de vos besoins et vous présenter notre solution"
    }
  },
  {
    text_id: 'section6.consent.report.title',
    category: 'ui',
    translations: {
      fr: "Je souhaite recevoir le rapport de l'étude 2025"
    }
  },
  {
    text_id: 'section6.consent.report.description',
    category: 'ui',
    translations: {
      fr: "Recevez en avant-première les insights du marché européen"
    }
  },
  {
    text_id: 'section6.rgpd',
    category: 'ui',
    translations: {
      fr: "Vos données sont sécurisées et conformes au RGPD. Elles ne seront jamais vendues à des tiers."
    }
  },
  {
    text_id: 'confirmation.toast.title',
    category: 'ui',
    translations: {
      fr: "Merci ! Votre réponse a été enregistrée."
    }
  },
  {
    text_id: 'confirmation.toast.description',
    category: 'ui',
    translations: {
      fr: "Vous recevrez une analyse par email si vous avez coché l'option."
    }
  }
];

async function seedMissingTranslations() {
  console.log('🌱 Starting to seed missing translations...');
  
  const results = {
    success: 0,
    errors: 0,
    skipped: 0
  };

  for (const translation of MISSING_TRANSLATIONS) {
    try {
      const response = await fetch('/api/i18n/translations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(translation)
      });

      if (response.ok) {
        console.log(`✅ Added: ${translation.text_id}`);
        results.success++;
      } else if (response.status === 409) {
        console.log(`⏭️  Skipped (already exists): ${translation.text_id}`);
        results.skipped++;
      } else {
        console.error(`❌ Error adding ${translation.text_id}:`, await response.text());
        results.errors++;
      }
    } catch (error) {
      console.error(`❌ Failed to add ${translation.text_id}:`, error);
      results.errors++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n📊 Seeding Results:');
  console.log(`   ✅ Success: ${results.success}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log(`   ❌ Errors: ${results.errors}`);
  console.log(`   📝 Total: ${MISSING_TRANSLATIONS.length}`);
  
  if (results.success > 0) {
    console.log('\n🎉 Seeding completed! Refresh the page to see the new translations.');
  }
}

// Auto-run when pasted in console
seedMissingTranslations();
