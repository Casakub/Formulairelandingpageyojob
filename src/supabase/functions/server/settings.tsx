import { Context } from "npm:hono";
import * as kv from "./kv_store.tsx";

const API_KEY_STORAGE_KEY = "anthropic_api_key";
const OVERRIDES_STORAGE_KEY = "question_overrides";

// Get API key status
export async function getApiKeyStatus(c: Context) {
  try {
    const apiKey = await kv.get(API_KEY_STORAGE_KEY);
    
    if (!apiKey) {
      return c.json({
        configured: false,
        keyPreview: null
      });
    }

    // Return preview of key (first 20 chars + dots)
    const keyPreview = typeof apiKey === 'string' 
      ? apiKey.substring(0, 20) + '••••••••'
      : 'sk-ant-api03-••••••••';

    return c.json({
      configured: true,
      keyPreview
    });

  } catch (error) {
    console.error("Error getting API key status:", error);
    return c.json({
      configured: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
}

// Save API key
export async function saveApiKey(c: Context) {
  try {
    const body = await c.req.json();
    const { apiKey } = body;

    if (!apiKey || typeof apiKey !== 'string') {
      return c.json({
        success: false,
        error: "API key is required"
      }, 400);
    }

    // Validate key format
    if (!apiKey.startsWith('sk-ant-api03-')) {
      return c.json({
        success: false,
        error: "Invalid API key format. Key must start with 'sk-ant-api03-'"
      }, 400);
    }

    // Store in KV
    await kv.set(API_KEY_STORAGE_KEY, apiKey);

    const keyPreview = apiKey.substring(0, 20) + '••••••••';

    return c.json({
      success: true,
      message: "API key saved successfully",
      keyPreview
    });

  } catch (error) {
    console.error("Error saving API key:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
}

// Delete API key
export async function deleteApiKey(c: Context) {
  try {
    await kv.del(API_KEY_STORAGE_KEY);

    return c.json({
      success: true,
      message: "API key deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting API key:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
}

// Test API key
export async function testApiKey(c: Context) {
  try {
    const apiKey = await kv.get(API_KEY_STORAGE_KEY);

    if (!apiKey || typeof apiKey !== 'string') {
      return c.json({
        success: false,
        error: "No API key configured"
      }, 400);
    }

    // Test with a simple request to Claude
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 50,
        messages: [
          {
            role: "user",
            content: "Réponds simplement 'OK' pour confirmer que tu fonctionnes."
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API test error:", errorText);
      
      // Parse error for better user feedback
      let errorMessage = `API test failed: ${response.status}`;
      let userFriendlyMessage = '';
      
      try {
        const errorData = JSON.parse(errorText);
        
        // Check for specific error types
        if (errorData.error?.type === 'invalid_request_error') {
          if (errorData.error.message?.includes('credit balance is too low')) {
            userFriendlyMessage = '💳 Votre solde de crédits Anthropic est insuffisant. Veuillez recharger votre compte sur console.anthropic.com (Plans & Billing) ou acheter des crédits supplémentaires.';
          } else if (errorData.error.message?.includes('Invalid API Key')) {
            userFriendlyMessage = '🔑 Clé API invalide. Vérifiez que vous avez copié la clé complète depuis console.anthropic.com';
          } else {
            userFriendlyMessage = errorData.error.message;
          }
        } else if (errorData.error?.type === 'authentication_error') {
          userFriendlyMessage = '🔐 Erreur d\'authentification. Vérifiez votre clé API ou créez-en une nouvelle sur console.anthropic.com';
        } else {
          userFriendlyMessage = errorData.error?.message || errorText;
        }
        
        errorMessage = userFriendlyMessage || errorText;
      } catch {
        errorMessage = errorText;
      }
      
      return c.json({
        success: false,
        error: errorMessage,
        details: errorText
      }, response.status);
    }

    const result = await response.json();

    return c.json({
      success: true,
      message: "API key is valid and working",
      model: result.model,
      usage: result.usage
    });

  } catch (error) {
    console.error("Error testing API key:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
}

// Get API key for internal use (by other functions)
export async function getApiKey(): Promise<string | null> {
  try {
    const apiKey = await kv.get(API_KEY_STORAGE_KEY);
    return typeof apiKey === 'string' ? apiKey : null;
  } catch (error) {
    console.error("Error retrieving API key:", error);
    return null;
  }
}

// 🐛 Get overrides debug info
export async function getOverridesDebug(c: Context) {
  try {
    const overrides = await kv.get(OVERRIDES_STORAGE_KEY);
    
    if (!overrides) {
      return c.json({
        success: true,
        overrides: {},
        count: 0,
        message: "Aucun override trouvé"
      });
    }

    const overridesObj = typeof overrides === 'object' ? overrides : {};
    const count = Object.keys(overridesObj).length;
    
    // Analyser les overrides problématiques (avec labels anglais)
    const problematicOverrides: any[] = [];
    
    Object.entries(overridesObj).forEach(([id, override]: [string, any]) => {
      if (override?.label || override?.placeholder || override?.description) {
        problematicOverrides.push({
          id,
          hasEnglishLabel: !!override.label,
          hasEnglishPlaceholder: !!override.placeholder,
          hasEnglishDescription: !!override.description,
          label: override.label,
          placeholder: override.placeholder,
          description: override.description,
        });
      }
    });

    return c.json({
      success: true,
      overrides: overridesObj,
      count,
      problematicCount: problematicOverrides.length,
      problematicOverrides,
      message: `${count} overrides trouvés (${problematicOverrides.length} avec labels anglais)`
    });

  } catch (error) {
    console.error("Error getting overrides debug:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
}

// 🗑️ Delete ALL overrides
export async function deleteAllOverrides(c: Context) {
  try {
    await kv.del(OVERRIDES_STORAGE_KEY);

    console.log("✅ [settings.tsx] All overrides deleted successfully");

    return c.json({
      success: true,
      message: "Tous les overrides ont été supprimés avec succès"
    });

  } catch (error) {
    console.error("Error deleting overrides:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, 500);
  }
}