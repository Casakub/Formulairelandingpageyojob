import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { analyzeWithClaude } from "./ai-analysis.tsx";
import { getApiKeyStatus, saveApiKey, deleteApiKey, testApiKey } from "./settings.tsx";
import i18nRoutes from "./i18n.tsx";
import { triggerAllIntegrations, testIntegration } from "./integrations.ts";
import historyRoutes from "./history-routes.ts";
import { seedMissingTranslations } from "./seed-translations.tsx";
import { seedCompleteTranslations } from "./seed-complete-translations.tsx";
import { uploadAvatar, deleteAvatar, refreshSignedUrl } from "./storage.tsx";
import landingRoutes from "./landing.tsx";
import prospectsRoutes from "./prospects.tsx";
import { syncSurveyToProspect, batchSyncSurveysToProspects } from "./survey-to-prospect.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Middleware global de gestion d'erreurs pour éviter les "broken pipe"
app.onError((err, c) => {
  console.error('🔴 Global error handler:', err);
  
  // Si l'erreur est un "broken pipe", on ne peut plus répondre
  if (err.code === 'EPIPE' || err.message?.includes('broken pipe')) {
    console.warn('⚠️ Client disconnected (broken pipe) - cannot send response');
    // Ne pas essayer de répondre si la connexion est fermée
    return new Response(null, { status: 499 }); // Client Closed Request
  }
  
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
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

Deno.serve(app.fetch);