import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { analyzeWithClaude } from "./ai-analysis.tsx";
import { getApiKeyStatus, saveApiKey, deleteApiKey, testApiKey } from "./settings.tsx";
import i18nRoutes from "./i18n.tsx";

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

Deno.serve(app.fetch);