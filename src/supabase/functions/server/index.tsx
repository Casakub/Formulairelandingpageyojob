import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { analyzeWithClaude } from "./ai-analysis.tsx";
import { getApiKeyStatus, saveApiKey, deleteApiKey, testApiKey, getOverridesDebug, deleteAllOverrides } from "./settings.tsx";
import i18nRoutes from "./i18n.tsx";
// Alternative KV store pour i18n (fallback si problème de cache)
// import i18nRoutes from "./i18n-kv.tsx";
import { triggerAllIntegrations, testIntegration } from "./integrations.ts";
import historyRoutes from "./history-routes.ts";
import { seedMissingTranslations } from "./seed-translations.tsx";
import { seedCompleteTranslations } from "./seed-complete-translations.tsx";
import { seedAllFormsTranslations } from "./seed-all-forms-translations.tsx";
import { seedFromSurveyConfig } from "./seed-from-survey-config.tsx";
import { uploadAvatar, deleteAvatar, refreshSignedUrl } from "./storage.tsx";
import landingRoutes from "./landing.tsx";
import prospectsRoutes from "./prospects.tsx";
import tasksRoutes from "./tasks.tsx";
import eventsRoutes from "./events.tsx";
import automationsRoutes from "./automations.tsx";
import smtpSettingsRoutes from "./smtp-settings.tsx";
import { syncSurveyToProspect, batchSyncSurveysToProspects } from "./survey-to-prospect.tsx";
import questionsRoutes from "./questions.tsx";
import migrateTranslationsRoutes from "./migrate-translations.tsx";
import smartSeedRoutes from "./seed-smart-translations.tsx";
import surveyResponsesRoutes from "./survey-responses.tsx";
import pushTranslationsRoutes from "./push-translations.tsx";
import { seedWithProfiles } from "./seed-with-profiles.tsx";
import { seedFromConfig } from "./seed-from-config.tsx";
import { seedClientWorkerTranslations } from "./seed-client-worker-translations.tsx";
import devisRoutes from "./devis.tsx";
import devisTranslationsRoutes from "./devis-translations.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Middleware pour capturer les "broken pipe" et autres erreurs réseau silencieusement
app.use('*', async (c, next) => {
  try {
    await next();
  } catch (err: any) {
    // Les erreurs réseau sont normales pendant le développement (hot reload)
    // et quand le client ferme la connexion avant la réponse
    const isNetworkError = 
      err?.code === 'EPIPE' || 
      err?.code === 'ECONNRESET' ||
      err?.name === 'Http' ||
      err?.message?.includes('broken pipe') ||
      err?.message?.includes('connection reset');
    
    if (isNetworkError) {
      // Ne pas logger ces erreurs car elles sont attendues
      // Retourner 499 (Client Closed Request) sans erreur
      return c.text('', 499);
    }
    
    // Re-throw les autres erreurs pour qu'elles soient gérées par onError
    throw err;
  }
});

// Middleware global de gestion d'erreurs
app.onError((err: any, c) => {
  // Ignorer toutes les erreurs réseau
  const isNetworkError = 
    err?.code === 'EPIPE' || 
    err?.code === 'ECONNRESET' ||
    err?.name === 'Http' ||
    err?.message?.includes('broken pipe') ||
    err?.message?.includes('connection reset');
  
  if (isNetworkError) {
    // Retourner une réponse vide avec code 499
    return c.text('', 499);
  }
  
  // Log des vraies erreurs seulement
  console.error('🔴 Server error:', {
    message: err.message,
    name: err.name,
    code: err.code,
    stack: err.stack?.split('\n').slice(0, 3).join('\n')
  });
  
  // Pour les autres erreurs, retourner une réponse JSON
  return c.json({
    error: 'Internal server error',
    message: err.message || 'Unknown error',
  }, 500);
});

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-10092a63/health", (c) => {
  return c.json({ status: "ok" });
});

// AI Analysis endpoint
app.post("/make-server-10092a63/ai-analysis", analyzeWithClaude);

// Settings endpoints
app.get("/make-server-10092a63/settings/anthropic-key", getApiKeyStatus);
app.post("/make-server-10092a63/settings/anthropic-key", saveApiKey);
app.delete("/make-server-10092a63/settings/anthropic-key", deleteApiKey);
app.post("/make-server-10092a63/settings/test-anthropic", testApiKey);
app.get("/make-server-10092a63/settings/overrides-debug", getOverridesDebug);
app.delete("/make-server-10092a63/settings/delete-all-overrides", deleteAllOverrides);

// i18n endpoints
app.route("/make-server-10092a63/i18n", i18nRoutes);

// History endpoints
app.route("/make-server-10092a63/history", historyRoutes);

// Landing translations endpoints
app.route("/make-server-10092a63/landing", landingRoutes);

// Seed missing translations endpoint
app.post("/make-server-10092a63/seed-missing-translations", seedMissingTranslations);

// Seed complete translations endpoint
app.post("/make-server-10092a63/seed-complete-translations", seedCompleteTranslations);

// Seed all forms translations endpoint
app.post("/make-server-10092a63/seed-all-forms-translations", seedAllFormsTranslations);

// Seed from survey config endpoint
app.post("/make-server-10092a63/seed-from-survey-config", seedFromSurveyConfig);

// Import auth routes
import authRoutes from "./auth.tsx";
app.route("/make-server-10092a63/auth", authRoutes);

// Import database routes
import databaseRoutes from "./database.tsx";
app.route("/make-server-10092a63/database", databaseRoutes);

// Integrations endpoints
app.post("/make-server-10092a63/integrations/trigger", async (c) => {
  try {
    const { responseData, responseId } = await c.req.json();
    
    if (!responseData || !responseId) {
      return c.json({ error: 'Missing responseData or responseId' }, 400);
    }
    
    const results = await triggerAllIntegrations(responseData, responseId);
    
    return c.json({ 
      success: true, 
      results,
      triggered: results.length,
      successful: results.filter(r => r.success).length
    });
  } catch (error: any) {
    console.error('Error triggering integrations:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-10092a63/integrations/test", async (c) => {
  try {
    const integration = await c.req.json();
    
    const result = await testIntegration(integration);
    
    return c.json({ success: true, result });
  } catch (error: any) {
    console.error('Error testing integration:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Storage endpoints for avatar uploads
app.post("/make-server-10092a63/storage/upload-avatar", uploadAvatar);
app.delete("/make-server-10092a63/storage/delete-avatar", deleteAvatar);
app.post("/make-server-10092a63/storage/refresh-url", refreshSignedUrl);

// Prospects endpoints
app.route("/make-server-10092a63/prospects", prospectsRoutes);

// Tasks endpoints
app.route("/make-server-10092a63/tasks", tasksRoutes);

// Events endpoints
app.route("/make-server-10092a63/events", eventsRoutes);

// Automations endpoints
app.route("/make-server-10092a63/automations", automationsRoutes);

// SMTP & Compliance settings endpoints
app.route("/make-server-10092a63/settings", smtpSettingsRoutes);

// Survey to Prospect sync endpoints
app.post("/make-server-10092a63/survey/sync-to-prospect", async (c) => {
  try {
    const surveyResponse = await c.req.json();
    
    if (!surveyResponse || !surveyResponse.response_id) {
      return c.json({ error: 'Missing survey response data' }, 400);
    }
    
    const result = await syncSurveyToProspect(surveyResponse);
    
    return c.json(result);
  } catch (error: any) {
    console.error('Error syncing survey to prospect:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-10092a63/survey/batch-sync", async (c) => {
  try {
    const { limit } = await c.req.json().catch(() => ({}));
    
    const result = await batchSyncSurveysToProspects(limit || 100);
    
    return c.json(result);
  } catch (error: any) {
    console.error('Error in batch sync:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Questions endpoints
app.route("/make-server-10092a63/questions", questionsRoutes);

// Migrate translations endpoints
app.route("/make-server-10092a63/migrate-translations", migrateTranslationsRoutes);

// Smart seed translations endpoints (nouvelle génération IA)
app.route("/make-server-10092a63/seed", smartSeedRoutes);

// Survey responses endpoints
app.route("/make-server-10092a63/survey-responses", surveyResponsesRoutes);

// Push translations endpoints
app.route("/make-server-10092a63/push-translations", pushTranslationsRoutes);

// Seed with profiles endpoint
app.post("/make-server-10092a63/seed-with-profiles", seedWithProfiles);

// Seed from config endpoint
app.post("/make-server-10092a63/seed-from-config", seedFromConfig);

// Seed client-worker translations endpoint
app.post("/make-server-10092a63/seed-client-worker-translations", seedClientWorkerTranslations);

// Devis endpoints
app.route("/make-server-10092a63/devis", devisRoutes);
app.route("/make-server-10092a63/devis-translations", devisTranslationsRoutes);

Deno.serve(app.fetch);