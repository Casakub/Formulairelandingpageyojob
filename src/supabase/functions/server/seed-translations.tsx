import { Context } from 'npm:hono';
import * as kv from './kv_store.tsx';

const MISSING_TRANSLATIONS = [
  // ========== SECTION 6 CONTACT (5 texts) ==========
  {
    textId: 'section6.consent.contact.title',
    category: 'ui',
    translations: {
      fr: { text: "J'autorise YoJob à me recontacter", status: 'validated' }
    }
  },
  {
    textId: 'section6.consent.contact.description',
    category: 'ui',
    translations: {
      fr: { text: "Pour discuter de vos besoins et vous présenter notre solution", status: 'validated' }
    }
  },
  {
    textId: 'section6.consent.report.title',
    category: 'ui',
    translations: {
      fr: { text: "Je souhaite recevoir le rapport de l'étude 2025", status: 'validated' }
    }
  },
  {
    textId: 'section6.consent.report.description',
    category: 'ui',
    translations: {
      fr: { text: "Recevez en avant-première les insights du marché européen", status: 'validated' }
    }
  },
  {
    textId: 'section6.rgpd',
    category: 'ui',
    translations: {
      fr: { text: "Vos données sont sécurisées et conformes au RGPD. Elles ne seront jamais vendues à des tiers.", status: 'validated' }
    }
  },
  
  // ========== CONFIRMATION TOAST (2 texts) ==========
  {
    textId: 'confirmation.toast.title',
    category: 'ui',
    translations: {
      fr: { text: "Merci ! Votre réponse a été enregistrée.", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.toast.description',
    category: 'ui',
    translations: {
      fr: { text: "Vous recevrez une analyse par email si vous avez coché l'option.", status: 'validated' }
    }
  },
  
  // ========== CONFIRMATION SCREEN (10 texts) ==========
  {
    textId: 'confirmation.title',
    category: 'ui',
    translations: {
      fr: { text: "Merci pour votre participation ! 🙏", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.description',
    category: 'ui',
    translations: {
      fr: { text: "Votre avis est précieux et contribue à façonner l'avenir de YoJob.", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.reward.report.title',
    category: 'ui',
    translations: {
      fr: { text: 'Rapport "Tendances 2025"', status: 'validated' }
    }
  },
  {
    textId: 'confirmation.reward.report.description',
    category: 'ui',
    translations: {
      fr: { text: "Envoyé sous 3 semaines", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.reward.earlyaccess.title',
    category: 'ui',
    translations: {
      fr: { text: "Early Access YoJob", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.reward.earlyaccess.description',
    category: 'ui',
    translations: {
      fr: { text: "Top 100 répondants", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.cta',
    category: 'ui',
    translations: {
      fr: { text: "Retour au site YoJob", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.thanks.title',
    category: 'ui',
    translations: {
      fr: { text: "🎁 En remerciement de votre participation :", status: 'validated' }
    }
  },
  {
    textId: 'confirmation.thanks.item1',
    category: 'ui',
    translations: {
      fr: { text: '• Rapport exclusif "Tendances du détachement 2025"', status: 'validated' }
    }
  },
  {
    textId: 'confirmation.thanks.item2',
    category: 'ui',
    translations: {
      fr: { text: "• Top 100 répondants = 3 mois d'accès gratuit à YoJob (valeur 500€)", status: 'validated' }
    }
  },
  
  // ========== BUTTONS (1 text) ==========
  {
    textId: 'button.submitting',
    category: 'ui',
    translations: {
      fr: { text: "Envoi en cours...", status: 'validated' }
    }
  }
];

export async function seedMissingTranslations(c: Context) {
  try {
    console.log('🌱 Starting to seed missing translations...');
    console.log(`📊 Total texts to seed: ${MISSING_TRANSLATIONS.length}`);
    console.log('   - Section 6 Contact: 5 texts');
    console.log('   - Confirmation Toast: 2 texts');
    console.log('   - Confirmation Screen: 10 texts');
    console.log('   - Button: 1 text');
    
    const results = {
      success: 0,
      skipped: 0,
      errors: 0,
      details: [] as any[]
    };

    for (const translation of MISSING_TRANSLATIONS) {
      const key = `i18n:ui:${translation.textId}`;
      
      try {
        // Check if already exists
        const existing = await kv.get(key);
        
        if (existing) {
          console.log(`⏭️  Skipped (already exists): ${translation.textId}`);
          results.skipped++;
          results.details.push({
            textId: translation.textId,
            status: 'skipped',
            reason: 'Already exists'
          });
          continue;
        }

        // Store the translation
        await kv.set(key, {
          textId: translation.textId,
          key: translation.textId,
          category: translation.category,
          translations: translation.translations
        });

        console.log(`✅ Added: ${translation.textId}`);
        results.success++;
        results.details.push({
          textId: translation.textId,
          status: 'success'
        });

      } catch (error: any) {
        console.error(`❌ Error adding ${translation.textId}:`, error.message);
        results.errors++;
        results.details.push({
          textId: translation.textId,
          status: 'error',
          error: error.message
        });
      }
    }

    console.log('📊 Seeding Results:', {
      success: results.success,
      skipped: results.skipped,
      errors: results.errors,
      total: MISSING_TRANSLATIONS.length
    });

    return c.json({
      success: true,
      message: '🎉 Seeding completed!',
      stats: {
        added: results.success,
        skipped: results.skipped,
        errors: results.errors,
        total: MISSING_TRANSLATIONS.length
      },
      details: results.details,
      nextSteps: [
        '1. Refresh the page to see the new translations',
        '2. Go to Export tab → "Template with Existing"',
        '3. Download the JSON file',
        '4. Send to Claude 3.5 Sonnet for translation',
        '5. Import the completed JSON back'
      ]
    });

  } catch (error: any) {
    console.error('❌ Fatal error during seeding:', error);
    return c.json({
      success: false,
      error: error.message
    }, 500);
  }
}
