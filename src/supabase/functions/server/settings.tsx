import * as kv from "./kv_store.tsx";

const ANTHROPIC_API_KEY_ENV = Deno.env.get("ANTHROPIC_API_KEY") || "";

// Available Claude Models Configuration
export const CLAUDE_MODELS: Record<string, ModelInfo> = {
  // Claude 4.5 (Latest generation - January 2025)
  'claude-sonnet-4-5-20250929': {
    name: 'Claude Sonnet 4.5',
    alias: 'claude-sonnet-4-5',
    description: 'Notre modèle intelligent pour les tâches complexes et le codage',
    tier: 'balanced',
    speed: 'fast',
    intelligence: 'very-high',
    costTier: 'standard',
    pricing: {
      input: 3,
      output: 15,
    },
    inputTokensPerMin: 30000,
    outputTokensPerMin: 8000,
    requestsPerMin: 50,
    contextWindow: 200000,
    maxOutput: 64000,
    extendedThinking: true,
    priorityTier: true,
    knowledgeCutoff: 'May 2025',
    trainingDataCutoff: 'Aug 2025',
  },
  
  'claude-haiku-4-5-20251001': {
    name: 'Claude Haiku 4.5',
    alias: 'claude-haiku-4-5',
    description: 'Notre modèle le plus rapide avec une intelligence quasi-frontière',
    tier: 'fast',
    speed: 'fastest',
    intelligence: 'high',
    costTier: 'economy',
    pricing: {
      input: 1,
      output: 5,
    },
    inputTokensPerMin: 50000,
    outputTokensPerMin: 10000,
    requestsPerMin: 100,
    contextWindow: 200000,
    maxOutput: 64000,
    extendedThinking: false,
    priorityTier: true,
    knowledgeCutoff: 'Fév 2025',
    trainingDataCutoff: 'Juil 2025',
  },
  
  'claude-opus-4-5-20251101': {
    name: 'Claude Opus 4.5',
    alias: 'claude-opus-4-5',
    description: 'Modèle premium combinant intelligence maximale avec des performances pratiques',
    tier: 'premium',
    speed: 'moderate',
    intelligence: 'maximum',
    costTier: 'premium',
    pricing: {
      input: 5,
      output: 25,
    },
    inputTokensPerMin: 20000,
    outputTokensPerMin: 5000,
    requestsPerMin: 50,
    contextWindow: 200000,
    maxOutput: 64000,
    extendedThinking: true,
    priorityTier: true,
    knowledgeCutoff: 'Mai 2025',
    trainingDataCutoff: 'Août 2025',
  },
  
  // Claude 3.5 Sonnet (October 2024 - Previous stable version)
  'claude-3-5-sonnet-20241022': {
    name: 'Claude 3.5 Sonnet',
    alias: 'claude-3-5-sonnet',
    description: 'Previous generation balanced model',
    tier: 'balanced',
    speed: 'medium',
    intelligence: 'high',
    costTier: 'standard',
    pricing: {
      input: 3,
      output: 15,
    },
    inputTokensPerMin: 30000,
    outputTokensPerMin: 8000,
    requestsPerMin: 50,
    contextWindow: 200000,
    maxOutput: 8192,
    extendedThinking: false,
    priorityTier: true,
    knowledgeCutoff: 'Apr 2024',
    trainingDataCutoff: 'Apr 2024',
  },
};

export const DEFAULT_MODEL = 'claude-sonnet-4-5-20250929'; // Latest Sonnet 4.5

/**
 * Get selected Claude model from KV store
 */
export async function getSelectedModel(): Promise<string> {
  try {
    const model = await kv.get("settings:claude_model");
    return (model as string) || DEFAULT_MODEL;
  } catch (error) {
    console.error("Error getting selected model:", error);
    return DEFAULT_MODEL;
  }
}

/**
 * Save selected Claude model
 */
export async function saveSelectedModel(c: any) {
  try {
    const { model } = await c.req.json();

    if (!model || !CLAUDE_MODELS[model]) {
      return c.json({
        success: false,
        error: "Invalid model. Please select a valid Claude model.",
      }, 400);
    }

    await kv.set("settings:claude_model", model);

    return c.json({
      success: true,
      message: "Model saved successfully",
      model,
      modelInfo: CLAUDE_MODELS[model],
    });
  } catch (error: any) {
    console.error("Error saving model:", error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
}

/**
 * Get available Claude models
 */
export async function getAvailableModels(c: any) {
  try {
    const selectedModel = await getSelectedModel();

    return c.json({
      success: true,
      models: CLAUDE_MODELS,
      selectedModel,
      defaultModel: DEFAULT_MODEL,
    });
  } catch (error: any) {
    console.error("Error getting available models:", error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
}

/**
 * Detect available models via Anthropic API
 * Note: Anthropic doesn't have a public models endpoint yet,
 * so we test each model with a minimal request
 */
export async function detectAvailableModels(c: any) {
  try {
    const apiKey = await getApiKey();
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: "No API key configured",
      }, 400);
    }

    console.log("🔍 Detecting available Claude models...");

    const availableModels: Record<string, any> = {};
    const testPromises: Promise<any>[] = [];

    // Test each model with a minimal request
    for (const [modelId, modelInfo] of Object.entries(CLAUDE_MODELS)) {
      testPromises.push(
        fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: modelId,
            max_tokens: 10,
            messages: [{ role: "user", content: "Hi" }]
          }),
        })
          .then(async (response) => {
            if (response.ok || response.status === 529) { // 529 = overloaded but model exists
              availableModels[modelId] = {
                ...modelInfo,
                available: response.ok,
                status: response.ok ? 'active' : 'overloaded',
              };
              return { modelId, success: true };
            }
            return { modelId, success: false };
          })
          .catch(() => ({ modelId, success: false }))
      );
    }

    // Wait for all tests (with timeout)
    await Promise.race([
      Promise.all(testPromises),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Detection timeout")), 15000)
      )
    ]).catch(() => {
      console.log("⚠️ Model detection timed out");
    });

    console.log(`✅ Found ${Object.keys(availableModels).length} available models`);

    return c.json({
      success: true,
      availableModels,
      totalTested: Object.keys(CLAUDE_MODELS).length,
      totalAvailable: Object.keys(availableModels).length,
    });

  } catch (error: any) {
    console.error("Error detecting models:", error);
    return c.json({
      success: false,
      error: error.message,
      // Fallback to all models
      availableModels: CLAUDE_MODELS,
    }, 500);
  }
}

/**
 * Get API key from KV store or environment
 */
export async function getApiKey(): Promise<string | null> {
  try {
    const storedKey = await kv.get("anthropic_api_key");
    if (storedKey) {
      return storedKey as string;
    }
    return ANTHROPIC_API_KEY_ENV || null;
  } catch (error) {
    console.error("Error getting API key:", error);
    return ANTHROPIC_API_KEY_ENV || null;
  }
}

export async function getApiKeyStatus(c: any) {
  try {
    const storedKey = await kv.get("anthropic_api_key");
    const hasEnvKey = !!ANTHROPIC_API_KEY_ENV;
    const hasStoredKey = !!storedKey;
    const configured = hasEnvKey || hasStoredKey;

    return c.json({
      success: true,
      configured,
      hasApiKey: configured,
      source: hasEnvKey ? "environment" : hasStoredKey ? "stored" : "none",
      keyPreview: hasEnvKey
        ? `${ANTHROPIC_API_KEY_ENV.slice(0, 14)}••••••••`
        : hasStoredKey
        ? `${(storedKey as string).slice(0, 14)}••••••••`
        : null,
    });
  } catch (error: any) {
    console.error("Error getting API key status:", error);
    return c.json({
      success: false,
      error: error.message,
      configured: !!ANTHROPIC_API_KEY_ENV,
      hasApiKey: !!ANTHROPIC_API_KEY_ENV,
      source: ANTHROPIC_API_KEY_ENV ? "environment" : "none",
    });
  }
}

export async function saveApiKey(c: any) {
  try {
    const { apiKey } = await c.req.json();

    if (!apiKey || !apiKey.startsWith("sk-ant-")) {
      return c.json({
        success: false,
        error: "Invalid API key format. Key must start with 'sk-ant-'",
      }, 400);
    }

    await kv.set("anthropic_api_key", apiKey);

    return c.json({
      success: true,
      message: "API key saved successfully",
      keyPreview: `${apiKey.slice(0, 14)}••••••••`,
    });
  } catch (error: any) {
    console.error("Error saving API key:", error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
}

export async function deleteApiKey(c: any) {
  try {
    await kv.del("anthropic_api_key");

    return c.json({
      success: true,
      message: "API key deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting API key:", error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
}

export async function testApiKey(c: any) {
  try {
    // Get the API key from storage or use the one provided
    let apiKey = await getApiKey();
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: "No API key configured. Please save an API key first.",
      }, 400);
    }

    if (!apiKey.startsWith("sk-ant-")) {
      return c.json({
        success: false,
        error: "Invalid API key format. Key should start with 'sk-ant-'",
      }, 400);
    }

    // Test réel avec l'API Claude
    console.log("🧪 Testing Anthropic API connection...");
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 50,
        messages: [
          {
            role: "user",
            content: "Respond with exactly 'Connection successful' if you receive this message."
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Anthropic API test failed:", errorData);
      
      // Check for specific error types
      if (errorData.error?.type === "authentication_error") {
        return c.json({
          success: false,
          error: "Clé API invalide. Veuillez vérifier votre clé API Anthropic.",
        }, 401);
      }
      
      if (errorData.error?.type === "permission_error") {
        return c.json({
          success: false,
          error: "Votre clé API n'a pas les permissions nécessaires.",
        }, 403);
      }

      if (errorData.error?.message?.includes("credit")) {
        return c.json({
          success: false,
          error: "Solde de crédits insuffisant. Veuillez recharger votre compte Anthropic.",
        }, 402);
      }

      return c.json({
        success: false,
        error: errorData.error?.message || "Erreur lors du test de l'API",
      }, response.status);
    }

    const data = await response.json();
    console.log("✅ Anthropic API test successful:", data);

    return c.json({
      success: true,
      message: "Connexion à Claude réussie !",
      model: "claude-sonnet-4-5-20250929",
      response: data.content?.[0]?.text || "OK",
    });

  } catch (error: any) {
    console.error("❌ Error testing API key:", error);
    return c.json({
      success: false,
      error: `Erreur de connexion: ${error.message}`,
    }, 500);
  }
}

export async function getOverridesDebug(c: any) {
  try {
    const allKeys = await kv.getByPrefix("override:");
    return c.json({
      success: true,
      overrides: allKeys,
      count: allKeys.length,
    });
  } catch (error: any) {
    console.error("Error getting overrides debug:", error);
    return c.json({
      success: false,
      error: error.message,
    });
  }
}

export async function deleteAllOverrides(c: any) {
  try {
    const allKeys = await kv.getByPrefix("override:");
    const keysToDelete = allKeys.map((item: any) => item.key);
    
    if (keysToDelete.length > 0) {
      await kv.mdel(keysToDelete);
    }

    return c.json({
      success: true,
      message: `Deleted ${keysToDelete.length} overrides`,
      count: keysToDelete.length,
    });
  } catch (error: any) {
    console.error("Error deleting all overrides:", error);
    return c.json({
      success: false,
      error: error.message,
    });
  }
}

// ============================================
// SMTP Settings Helpers
// ============================================

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  from_email: string;
  from_name: string;
}

/**
 * Get SMTP configuration from KV store
 */
export async function getSMTPConfig(): Promise<SMTPConfig | null> {
  try {
    const config = await kv.get("settings:smtp");
    return config as SMTPConfig | null;
  } catch (error) {
    console.error("Error getting SMTP config:", error);
    return null;
  }
}

/**
 * Check if SMTP is properly configured
 */
export async function isSMTPConfigured(): Promise<boolean> {
  try {
    const config = await getSMTPConfig();
    return !!(
      config &&
      config.host &&
      config.username &&
      config.password &&
      config.from_email
    );
  } catch (error) {
    console.error("Error checking SMTP configuration:", error);
    return false;
  }
}

// ============================================
// Compliance Settings Helpers
// ============================================

interface ComplianceSettings {
  gdpr_enabled: boolean;
  unsubscribe_link: boolean;
  double_optin: boolean;
  data_retention_days: number;
  consent_tracking: boolean;
}

/**
 * Get compliance settings from KV store
 */
export async function getComplianceSettings(): Promise<ComplianceSettings | null> {
  try {
    const settings = await kv.get("settings:compliance");
    return settings as ComplianceSettings | null;
  } catch (error) {
    console.error("Error getting compliance settings:", error);
    return null;
  }
}

/**
 * Check if a specific compliance feature is enabled
 */
export async function isComplianceFeatureEnabled(feature: keyof ComplianceSettings): Promise<boolean> {
  try {
    const settings = await getComplianceSettings();
    if (!settings) return false;
    return !!settings[feature];
  } catch (error) {
    console.error(`Error checking compliance feature ${feature}:`, error);
    return false;
  }
}