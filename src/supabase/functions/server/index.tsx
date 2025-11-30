import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { analyzeWithClaude } from "./ai-analysis.tsx";
import { getApiKeyStatus, saveApiKey, deleteApiKey, testApiKey } from "./settings.tsx";
import i18nRoutes from "./i18n.tsx";
import { triggerAllIntegrations, testIntegration } from "./integrations.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

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

Deno.serve(app.fetch);