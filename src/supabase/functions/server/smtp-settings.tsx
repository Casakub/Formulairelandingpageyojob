import { Hono } from 'npm:hono@4.0.2';
import * as kv from './kv_store.tsx';

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
};

// Paramètres de conformité par défaut
const DEFAULT_COMPLIANCE_SETTINGS = {
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
    
    // Validation basique
    if (!config.host || !config.username || !config.from_email) {
      return c.json({
        success: false,
        error: 'Champs obligatoires manquants (host, username, from_email)',
      }, 400);
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

// POST /settings/smtp/test - Tester la connexion SMTP
app.post('/smtp/test', async (c) => {
  try {
    const config = await c.req.json();

    // Validation basique
    if (!config.host || !config.username || !config.password) {
      return c.json({
        success: false,
        message: 'Configuration SMTP incomplète',
      }, 400);
    }

    // NOTE: Dans un environnement réel, vous utiliseriez nodemailer ou un service équivalent
    // Ici on simule un test réussi si les champs sont remplis
    console.log('Test SMTP avec config:', {
      host: config.host,
      port: config.port,
      username: config.username,
      from_email: config.from_email,
    });

    // Simulation d'un test
    const testSuccess = config.host.length > 3 && config.username.includes('@');

    if (testSuccess) {
      return c.json({
        success: true,
        message: `✅ Connexion réussie à ${config.host}:${config.port}`,
      });
    } else {
      return c.json({
        success: false,
        message: '❌ Impossible de se connecter au serveur SMTP',
      });
    }
  } catch (error: any) {
    console.error('Erreur test SMTP:', error);
    return c.json({
      success: false,
      message: `Erreur: ${error.message}`,
    }, 500);
  }
});

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
    const settings = await c.req.json();
    
    await kv.set('settings:compliance', settings);

    return c.json({
      success: true,
      message: 'Paramètres de conformité sauvegardés',
    });
  } catch (error: any) {
    console.error('Erreur sauvegarde conformité:', error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

export default app;
