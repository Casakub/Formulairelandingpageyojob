/**
 * Script to add ALL missing UI translations (Section 6 + Confirmation Screen)
 * Run this from the browser console when logged in as admin
 * 
 * Usage:
 * 1. Login to admin dashboard
 * 2. Open browser console (F12)
 * 3. Copy-paste this entire script
 * 4. Press Enter
 */

const ALL_MISSING_TRANSLATIONS = [
  // ========== SECTION 6 CONTACT (5 texts) ==========
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
  
  // ========== CONFIRMATION TOAST (2 texts) ==========
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
  },
  
  // ========== CONFIRMATION SCREEN (10 texts) ==========
  {
    text_id: 'confirmation.title',
    category: 'ui',
    translations: {
      fr: "Merci pour votre participation ! 🙏"
    }
  },
  {
    text_id: 'confirmation.description',
    category: 'ui',
    translations: {
      fr: "Votre avis est précieux et contribue à façonner l'avenir de YoJob."
    }
  },
  {
    text_id: 'confirmation.reward.report.title',
    category: 'ui',
    translations: {
      fr: 'Rapport "Tendances 2025"'
    }
  },
  {
    text_id: 'confirmation.reward.report.description',
    category: 'ui',
    translations: {
      fr: "Envoyé sous 3 semaines"
    }
  },
  {
    text_id: 'confirmation.reward.earlyaccess.title',
    category: 'ui',
    translations: {
      fr: "Early Access YoJob"
    }
  },
  {
    text_id: 'confirmation.reward.earlyaccess.description',
    category: 'ui',
    translations: {
      fr: "Top 100 répondants"
    }
  },
  {
    text_id: 'confirmation.cta',
    category: 'ui',
    translations: {
      fr: "Retour au site YoJob"
    }
  },
  {
    text_id: 'confirmation.thanks.title',
    category: 'ui',
    translations: {
      fr: "🎁 En remerciement de votre participation :"
    }
  },
  {
    text_id: 'confirmation.thanks.item1',
    category: 'ui',
    translations: {
      fr: '• Rapport exclusif "Tendances du détachement 2025"'
    }
  },
  {
    text_id: 'confirmation.thanks.item2',
    category: 'ui',
    translations: {
      fr: "• Top 100 répondants = 3 mois d'accès gratuit à YoJob (valeur 500€)"
    }
  }
];

async function seedAllMissingTranslations() {
  console.log('🌱 Starting to seed ALL missing translations...');
  console.log('📊 Total texts to add: ' + ALL_MISSING_TRANSLATIONS.length);
  console.log('   - Section 6 Contact: 5 texts');
  console.log('   - Confirmation Toast: 2 texts');
  console.log('   - Confirmation Screen: 10 texts');
  console.log('');
  
  const results = {
    success: 0,
    errors: 0,
    skipped: 0
  };

  for (const translation of ALL_MISSING_TRANSLATIONS) {
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

  console.log('\n📊 Final Results:');
  console.log('════════════════════════════════════════');
  console.log(`   ✅ Successfully added: ${results.success}`);
  console.log(`   ⏭️  Already existed: ${results.skipped}`);
  console.log(`   ❌ Errors: ${results.errors}`);
  console.log(`   📝 Total processed: ${ALL_MISSING_TRANSLATIONS.length}`);
  console.log('════════════════════════════════════════');
  
  if (results.success > 0 || results.skipped > 0) {
    console.log('\n🎉 Seeding completed!');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Refresh this page to see the new translations');
    console.log('   2. Go to Export tab → "Template with Existing"');
    console.log('   3. Download the JSON file');
    console.log('   4. Send to Claude 3.5 Sonnet for translation');
    console.log('   5. Import the completed JSON back');
    console.log('');
    console.log('💡 You need to translate: 17 texts × 22 languages = 374 translations');
  }
}

// Auto-run when pasted in console
seedAllMissingTranslations();
