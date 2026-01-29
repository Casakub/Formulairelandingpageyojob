import { Hono } from 'npm:hono@4.0.2';
import * as kv from './kv_store.tsx';
import { sendEmailWithConfig } from './email-service.tsx';

const app = new Hono();

// Configuration SMTP par défaut
const DEFAULT_SMTP_CONFIG = {
  host: '',
  port: 587,
  secure: true,
  username: '',
  password: '',
  from_email: '',
  from_name: 'YOJOB',
  provider: 'smtp',
  provider_api_key: '',
  provider_domain: '',
  reply_to: '',
  test_email: '',
};

function validateSMTPConfig(config: any): string | null {
  if (!config) {
    return 'Configuration SMTP manquante';
  }

  const provider = (config.provider || 'smtp').toString().toLowerCase();

  if (!config.from_email || !config.from_email.includes('@')) {
    return 'Email d\'expédition invalide';
  }

  if (provider === 'smtp') {
    if (!config.host || config.host.length < 3) {
      return 'Serveur SMTP invalide';
    }
    const port = Number(config.port);
    if (!Number.isFinite(port) || port < 1 || port > 65535) {
      return 'Port SMTP invalide (1-65535)';
    }
    if (!config.username || !config.username.includes('@')) {
      return 'Nom d\'utilisateur SMTP invalide (email requis)';
    }
    if (!config.password || config.password.length < 4) {
      return 'Mot de passe SMTP requis';
    }
    return null;
  }

  if (provider === 'sendgrid') {
    if (!config.provider_api_key || config.provider_api_key.length < 10) {
      return 'Clé API SendGrid requise';
    }
    return null;
  }

  if (provider === 'mailgun') {
    if (!config.provider_api_key || config.provider_api_key.length < 10) {
      return 'Clé API Mailgun requise';
    }
    if (!config.provider_domain || config.provider_domain.length < 3) {
      return 'Domaine Mailgun requis';
    }
    return null;
  }

  return 'Provider SMTP invalide';
}

// Paramètres de conformité par défaut
const DEFAULT_COMPLIANCE_SETTINGS = {
  // ComplianceConfig (informations entreprise)
  companyName: '',
  dpoName: '',
  dpoEmail: '',
  privacyPolicyUrl: '',
  gdprCompliant: false,
  // ComplianceSettings (paramètres techniques)
  gdpr_enabled: true,
  unsubscribe_link: true,
  double_optin: false,
  data_retention_days: 365,
  consent_tracking: true,
};

// GET /settings/smtp - Récupérer config SMTP
app.get('/smtp', async (c) => {
  try {
    const config = await kv.get('settings:smtp');
    return c.json({
      success: true,
      config: config || DEFAULT_SMTP_CONFIG,
    });
  } catch (error: any) {
    console.error('Erreur récupération config SMTP:', error);
    return c.json({
      success: false,
      error: error.message,
      config: DEFAULT_SMTP_CONFIG,
    });
  }
});

// PUT /settings/smtp - Sauvegarder config SMTP
app.put('/smtp', async (c) => {
  try {
    const config = await c.req.json();
    
    const validationError = validateSMTPConfig(config);
    if (validationError) {
      return c.json({ success: false, error: validationError }, 400);
    }

    await kv.set('settings:smtp', config);

    return c.json({
      success: true,
      message: 'Configuration SMTP sauvegardée avec succès',
    });
  } catch (error: any) {
    console.error('Erreur sauvegarde config SMTP:', error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

// POST /settings/smtp - Sauvegarder config SMTP (alias pour compatibilité frontend)
app.post('/smtp', async (c) => {
  try {
    const config = await c.req.json();
    
    const validationError = validateSMTPConfig(config);
    if (validationError) {
      return c.json({ success: false, error: validationError }, 400);
    }

    await kv.set('settings:smtp', config);

    return c.json({
      success: true,
      message: 'Configuration SMTP sauvegardée avec succès',
      config, // Retourner la config pour mise à jour frontend
    });
  } catch (error: any) {
    console.error('Erreur sauvegarde config SMTP:', error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

// POST /settings/smtp/test - Tester la connexion SMTP
app.post('/smtp/test', async (c) => {
  try {
    const config = await c.req.json();

    // Validation basique
    const validationError = validateSMTPConfig(config);
    if (validationError) {
      return c.json({ success: false, message: validationError }, 400);
    }

    console.log('🧪 Test connexion SMTP:', {
      host: config.host,
      port: config.port,
      username: config.username,
      from_email: config.from_email,
      secure: config.secure,
    });

    // Envoi réel d'un email de test
    const testEmail = config.test_email || config.username || config.from_email;
    const sendResult = await sendEmailWithConfig(config, {
      to: testEmail,
      subject: '✅ Test SMTP YOJOB',
      body: 'Ceci est un email de test SMTP envoyé depuis YOJOB.',
      html: '<p>Ceci est un email de test SMTP envoyé depuis <strong>YOJOB</strong>.</p>',
    });

    if (sendResult.success) {
      return c.json({
        success: true,
        message: `✅ Email de test envoyé à ${testEmail}`,
        messageId: sendResult.messageId,
      });
    }

    return c.json({
      success: false,
      message: `❌ ${sendResult.message}`,
    }, 400);
  } catch (error: any) {
    console.error('Erreur test SMTP:', error);
    return c.json({
      success: false,
      message: `Erreur: ${error.message}`,
    }, 500);
  }
});

// POST /settings/test-smtp - Alias pour compatibilité frontend
app.post('/test-smtp', async (c) => {
  // Charger la config stockée pour le test
  try {
    const storedConfig = await kv.get('settings:smtp');
    
    if (!storedConfig) {
      return c.json({
        success: false,
        message: 'Aucune configuration SMTP trouvée. Veuillez d\'abord sauvegarder votre configuration.',
      }, 400);
    }

    console.log('🧪 Test connexion SMTP (config stockée):', {
      host: (storedConfig as any).host,
      port: (storedConfig as any).port,
      username: (storedConfig as any).username,
      provider: (storedConfig as any).provider,
    });

    const validationError = validateSMTPConfig(storedConfig);
    if (validationError) {
      return c.json({ success: false, message: validationError }, 400);
    }

    const testEmail = (storedConfig as any).test_email || (storedConfig as any).username || (storedConfig as any).from_email;
    const sendResult = await sendEmailWithConfig(storedConfig as any, {
      to: testEmail,
      subject: '✅ Test SMTP YOJOB',
      body: 'Ceci est un email de test SMTP envoyé depuis YOJOB.',
      html: '<p>Ceci est un email de test SMTP envoyé depuis <strong>YOJOB</strong>.</p>',
    });

    if (sendResult.success) {
      return c.json({
        success: true,
        message: `✅ Email de test envoyé à ${testEmail}`,
        messageId: sendResult.messageId,
      });
    }

    return c.json({
      success: false,
      message: `❌ ${sendResult.message}`,
    }, 400);
  } catch (error: any) {
    console.error('Erreur test SMTP:', error);
    return c.json({
      success: false,
      message: `Erreur: ${error.message}`,
    }, 500);
  }
});

// POST /settings/smtp/dry-run - Prévisualiser un envoi sans envoyer réellement
app.post('/smtp/dry-run', async (c) => {
  try {
    const body = await c.req.json();
    const storedConfig = await kv.get('settings:smtp');
    const config = storedConfig || body;

    if (!config) {
      return c.json({ success: false, message: 'Aucune configuration SMTP trouvée' }, 400);
    }

    const validationError = validateSMTPConfig(config);
    if (validationError) {
      return c.json({ success: false, message: validationError }, 400);
    }

    const testEmail = (config as any).test_email || (config as any).username || (config as any).from_email;
    const subject = '🧪 Dry-run SMTP YOJOB';
    const html = '<p><strong>Dry-run</strong> : aucun email réel n’a été envoyé.</p>';
    const text = 'Dry-run : aucun email réel n’a été envoyé.';

    return c.json({
      success: true,
      message: 'Dry-run OK (aucun email envoyé)',
      preview: {
        to: testEmail,
        subject,
        text,
        html,
        note: 'Aucun email réel n’a été envoyé.',
        provider: (config as any).provider || 'smtp',
      },
    });
  } catch (error: any) {
    console.error('Erreur dry-run SMTP:', error);
    return c.json({ success: false, message: `Erreur: ${error.message}` }, 500);
  }
});

// POST /settings/dry-run-smtp - Alias compatibilité
app.post('/dry-run-smtp', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const storedConfig = await kv.get('settings:smtp');
    const config = storedConfig || body;

    if (!config) {
      return c.json({ success: false, message: 'Aucune configuration SMTP trouvée' }, 400);
    }

    const validationError = validateSMTPConfig(config);
    if (validationError) {
      return c.json({ success: false, message: validationError }, 400);
    }

    const testEmail = (config as any).test_email || (config as any).username || (config as any).from_email;
    const subject = '🧪 Dry-run SMTP YOJOB';
    const html = '<p><strong>Dry-run</strong> : aucun email réel n’a été envoyé.</p>';
    const text = 'Dry-run : aucun email réel n’a été envoyé.';

    return c.json({
      success: true,
      message: 'Dry-run OK (aucun email envoyé)',
      preview: {
        to: testEmail,
        subject,
        text,
        html,
        note: 'Aucun email réel n’a été envoyé.',
        provider: (config as any).provider || 'smtp',
      },
    });
  } catch (error: any) {
    console.error('Erreur dry-run SMTP (alias):', error);
    return c.json({ success: false, message: `Erreur: ${error.message}` }, 500);
  }
});

/**
 * Teste la connexion SMTP en tentant de se connecter au serveur
 */
async function testSMTPConnection(config: any): Promise<{
  success: boolean;
  error?: string;
  details?: any;
}> {
  try {
    // Validation du host
    if (!config.host || config.host.length < 3) {
      return {
        success: false,
        error: 'Nom d\'hôte SMTP invalide',
      };
    }

    // Validation du port
    const port = parseInt(config.port);
    if (isNaN(port) || port < 1 || port > 65535) {
      return {
        success: false,
        error: 'Port SMTP invalide (doit être entre 1 et 65535)',
      };
    }

    // Validation email
    if (!config.username || !config.username.includes('@')) {
      return {
        success: false,
        error: 'Nom d\'utilisateur SMTP invalide (doit être un email)',
      };
    }

    // Validation password
    if (!config.password || config.password.length < 4) {
      return {
        success: false,
        error: 'Mot de passe SMTP trop court',
      };
    }

    // Test de connexion TCP au serveur SMTP
    console.log(`🔌 Tentative de connexion à ${config.host}:${port}...`);
    
    try {
      // Utiliser Deno.connect pour tester la connexion TCP
      const conn = await Deno.connect({
        hostname: config.host,
        port: port,
        transport: "tcp",
      });

      // Lire le banner SMTP (première ligne envoyée par le serveur)
      const buffer = new Uint8Array(1024);
      const bytesRead = await conn.read(buffer);
      
      if (bytesRead) {
        const banner = new TextDecoder().decode(buffer.slice(0, bytesRead));
        console.log('📬 SMTP Banner:', banner);
        
        // Fermer la connexion
        conn.close();

        // Vérifier que c'est bien un serveur SMTP (commence par 220)
        if (banner.startsWith('220')) {
          return {
            success: true,
            details: {
              host: config.host,
              port: port,
              banner: banner.trim(),
              secure: config.secure,
              timestamp: new Date().toISOString(),
            },
          };
        } else {
          return {
            success: false,
            error: `Le serveur ne répond pas comme un serveur SMTP (attendu: 220, reçu: ${banner.slice(0, 3)})`,
          };
        }
      } else {
        conn.close();
        return {
          success: false,
          error: 'Aucune réponse du serveur SMTP',
        };
      }
    } catch (connError: any) {
      console.error('❌ Erreur de connexion TCP:', connError);
      
      // Messages d'erreur spécifiques
      if (connError.message.includes('connection refused')) {
        return {
          success: false,
          error: `Connexion refusée par ${config.host}:${port}. Vérifiez le host et le port.`,
        };
      }
      
      if (connError.message.includes('timeout')) {
        return {
          success: false,
          error: `Timeout de connexion à ${config.host}:${port}. Le serveur est peut-être inaccessible.`,
        };
      }
      
      if (connError.message.includes('not found') || connError.message.includes('NOTFOUND')) {
        return {
          success: false,
          error: `Serveur ${config.host} introuvable. Vérifiez le nom d'hôte.`,
        };
      }

      return {
        success: false,
        error: `Impossible de se connecter: ${connError.message}`,
      };
    }
  } catch (error: any) {
    console.error('❌ Erreur test SMTP:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// GET /settings/compliance - Récupérer paramètres conformité
app.get('/compliance', async (c) => {
  try {
    const settings = await kv.get('settings:compliance');
    return c.json({
      success: true,
      settings: settings || DEFAULT_COMPLIANCE_SETTINGS,
    });
  } catch (error: any) {
    console.error('Erreur récupération conformité:', error);
    return c.json({
      success: false,
      error: error.message,
      settings: DEFAULT_COMPLIANCE_SETTINGS,
    });
  }
});

// PUT /settings/compliance - Sauvegarder paramètres conformité
app.put('/compliance', async (c) => {
  try {
    console.log('📥 [PUT /compliance] Début de la requête');
    const settings = await c.req.json();
    console.log('📥 [PUT /compliance] Settings reçus:', JSON.stringify(settings, null, 2));
    
    await kv.set('settings:compliance', settings);
    console.log('✅ [PUT /compliance] Settings sauvegardés dans KV store');

    const response = {
      success: true,
      message: 'Paramètres de conformité sauvegardés',
    };
    console.log('📤 [PUT /compliance] Réponse:', JSON.stringify(response));
    return c.json(response);
  } catch (error: any) {
    console.error('❌ [PUT /compliance] Erreur sauvegarde conformité:', error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

export default app;
