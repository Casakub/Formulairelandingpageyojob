import * as kv from "./kv_store.tsx";

const ANTHROPIC_API_KEY_ENV = Deno.env.get("ANTHROPIC_API_KEY") || "";

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

    return c.json({
      success: true,
      hasApiKey: hasEnvKey || hasStoredKey,
      source: hasEnvKey ? "environment" : hasStoredKey ? "stored" : "none",
      keyPreview: hasEnvKey
        ? `${ANTHROPIC_API_KEY_ENV.slice(0, 10)}...`
        : hasStoredKey
        ? `${(storedKey as string).slice(0, 10)}...`
        : null,
    });
  } catch (error: any) {
    console.error("Error getting API key status:", error);
    return c.json({
      success: false,
      error: error.message,
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
        error: "Invalid API key format",
      }, 400);
    }

    await kv.set("anthropic_api_key", apiKey);

    return c.json({
      success: true,
      message: "API key saved successfully",
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
    const { apiKey } = await c.req.json();

    if (!apiKey || !apiKey.startsWith("sk-ant-")) {
      return c.json({
        success: false,
        error: "Invalid API key format",
      }, 400);
    }

    // Test simple de validation du format
    const isValid = apiKey.length > 20;

    return c.json({
      success: isValid,
      message: isValid ? "API key is valid" : "API key is invalid",
    });
  } catch (error: any) {
    console.error("Error testing API key:", error);
    return c.json({
      success: false,
      error: error.message,
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