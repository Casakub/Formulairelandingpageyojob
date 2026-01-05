import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { contactTypeTranslations } from "./contact-type-translations.tsx";

const app = new Hono();

/**
 * 🌍 Landing Page Translations API
 * Gestion des traductions de la landing page YOJOB dans 23 langues européennes
 */

// Helper pour obtenir le client Supabase
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * GET /languages
 * Obtenir la liste de toutes les langues disponibles
 */
app.get("/languages", async (c) => {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("landing_translations")
      .select("language_code, translation_status, updated_at, translation_progress, translated_by")
      .order("language_code", { ascending: true });

    if (error) {
      console.error("Error fetching languages:", error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      languages: data || [],
      total: data?.length || 0,
    });
  } catch (error: any) {
    console.error("Error in GET /languages:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /all
 * Obtenir toutes les traductions en une seule requête
 * ⚠️ IMPORTANT: Cette route DOIT être avant /:lang pour éviter les conflits
 */
app.get("/all", async (c) => {
  try {
    const supabase = getSupabaseClient();

    // Ajouter un timeout pour éviter les connexions qui traînent
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

    const { data, error } = await supabase
      .from("landing_translations")
      .select("*")
      .order("language_code", { ascending: true })
      .abortSignal(controller.signal);

    clearTimeout(timeoutId);

    if (error) {
      console.error("Error fetching all translations:", error);
      return c.json({ error: error.message }, 500);
    }

    // Transformer en objet { fr: {...}, en: {...}, ... }
    const translations: Record<string, any> = {};
    data?.forEach((row) => {
      translations[row.language_code] = row.content;
    });

    return c.json({
      success: true,
      translations,
      total: data?.length || 0,
    });
  } catch (error: any) {
    console.error("Error in GET /all:", error);
    
    // Si l'erreur est un abort (timeout), retourner un message spécifique
    if (error.name === 'AbortError') {
      return c.json({ 
        error: "Request timeout - database query took too long",
        hint: "Try loading individual languages instead"
      }, 408);
    }
    
    return c.json({ error: error.message }, 500);
  }
});

/**
 * GET /:lang
 * Obtenir le contenu traduit pour une langue spécifique
 */
app.get("/:lang", async (c) => {
  try {
    const lang = c.req.param("lang");
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("landing_translations")
      .select("*")
      .eq("language_code", lang)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found - retourner un objet vide
        return c.json({
          success: true,
          exists: false,
          language_code: lang,
          content: null,
        });
      }
      console.error(`Error fetching translation for ${lang}:`, error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      exists: true,
      language_code: lang,
      content: data.content,
      translation_status: data.translation_status,
      translation_progress: data.translation_progress,
      translated_by: data.translated_by,
      updated_at: data.updated_at,
    });
  } catch (error: any) {
    console.error("Error in GET /:lang:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /:lang
 * Créer ou mettre à jour une traduction
 */
app.post("/:lang", async (c) => {
  try {
    const lang = c.req.param("lang");
    const body = await c.req.json();
    const { content, translation_status, translated_by, translation_progress } = body;

    if (!content) {
      return c.json({ error: "Content is required" }, 400);
    }

    const supabase = getSupabaseClient();

    // Vérifier si la traduction existe déjà
    const { data: existing } = await supabase
      .from("landing_translations")
      .select("id")
      .eq("language_code", lang)
      .single();

    let result;
    if (existing) {
      // Mise à jour
      const { data, error } = await supabase
        .from("landing_translations")
        .update({
          content,
          translation_status: translation_status || "draft",
          translated_by: translated_by || "manual",
          translation_progress: translation_progress || 0,
          updated_at: new Date().toISOString(),
        })
        .eq("language_code", lang)
        .select()
        .single();

      if (error) {
        console.error(`Error updating translation for ${lang}:`, error);
        return c.json({ error: error.message }, 500);
      }
      result = data;
    } else {
      // Création
      const { data, error } = await supabase
        .from("landing_translations")
        .insert({
          language_code: lang,
          content,
          translation_status: translation_status || "draft",
          translated_by: translated_by || "manual",
          translation_progress: translation_progress || 0,
        })
        .select()
        .single();

      if (error) {
        console.error(`Error creating translation for ${lang}:`, error);
        return c.json({ error: error.message }, 500);
      }
      result = data;
    }

    return c.json({
      success: true,
      message: existing ? "Translation updated successfully" : "Translation created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Error in POST /:lang:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * DELETE /:lang
 * Supprimer une traduction
 */
app.delete("/:lang", async (c) => {
  try {
    const lang = c.req.param("lang");
    
    // Ne pas permettre de supprimer la version française
    if (lang === "fr") {
      return c.json({ error: "Cannot delete French (source) translation" }, 403);
    }

    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from("landing_translations")
      .delete()
      .eq("language_code", lang);

    if (error) {
      console.error(`Error deleting translation for ${lang}:`, error);
      return c.json({ error: error.message }, 500);
    }

    return c.json({
      success: true,
      message: `Translation for ${lang} deleted successfully`,
    });
  } catch (error: any) {
    console.error("Error in DELETE /:lang:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /bulk-upload
 * Upload de plusieurs traductions en une seule fois
 */
app.post("/bulk-upload", async (c) => {
  try {
    const body = await c.req.json();
    const { translations } = body; // { fr: {...}, en: {...}, de: {...} }

    if (!translations || typeof translations !== "object") {
      return c.json({ error: "Translations object is required" }, 400);
    }

    const supabase = getSupabaseClient();
    const results = [];
    const errors = [];

    for (const [lang, content] of Object.entries(translations)) {
      try {
        // Vérifier si existe
        const { data: existing } = await supabase
          .from("landing_translations")
          .select("id")
          .eq("language_code", lang)
          .single();

        if (existing) {
          // Mise à jour
          const { error } = await supabase
            .from("landing_translations")
            .update({
              content,
              updated_at: new Date().toISOString(),
            })
            .eq("language_code", lang);

          if (error) throw error;
          results.push({ lang, action: "updated" });
        } else {
          // Création
          const { error } = await supabase
            .from("landing_translations")
            .insert({
              language_code: lang,
              content,
              translation_status: "draft",
              translated_by: "bulk_upload",
            });

          if (error) throw error;
          results.push({ lang, action: "created" });
        }
      } catch (error: any) {
        console.error(`Error uploading ${lang}:`, error);
        errors.push({ lang, error: error.message });
      }
    }

    return c.json({
      success: errors.length === 0,
      results,
      errors,
      total_processed: results.length,
      total_errors: errors.length,
    });
  } catch (error: any) {
    console.error("Error in POST /bulk-upload:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /translate
 * Traduire automatiquement un contenu via Claude AI
 */
app.post("/translate", async (c) => {
  try {
    const body = await c.req.json();
    const { sourceContent, sourceLang, targetLang, targetLangName } = body;

    if (!sourceContent || !sourceLang || !targetLang || !targetLangName) {
      return c.json({ 
        error: "Missing required fields: sourceContent, sourceLang, targetLang, targetLangName" 
      }, 400);
    }

    // Récupérer la clé API Anthropic
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return c.json({ 
        error: "ANTHROPIC_API_KEY not configured. Please add your API key in Settings." 
      }, 500);
    }

    console.log(`🤖 Translating landing page from ${sourceLang} to ${targetLang} (${targetLangName})...`);

    // Préparer le prompt pour Claude
    const prompt = `You are a professional translator specializing in marketing and business content for the European recruitment industry.

**Task:** Translate the following landing page content from ${sourceLang.toUpperCase()} to ${targetLangName} (${targetLang.toUpperCase()}).

**Context:**
- Company: YOJOB - European recruitment brokerage with 500+ partner agencies in 27 countries
- Industry: Temporary staffing, specialized recruitment, labor compliance
- Tone: Professional, modern, trustworthy
- Target audience: HR managers, business owners, recruitment professionals

**Important guidelines:**
1. Maintain the exact JSON structure - do not modify keys, only translate values
2. Preserve all formatting (line breaks, punctuation, capitalization style)
3. Keep technical terms consistent (e.g., "marketplace", "compliance")
4. Adapt cultural references appropriately for ${targetLangName} speakers
5. Maintain professional business tone
6. Do not translate: URLs, email addresses, phone numbers, company names, icon names
7. For arrays, translate each item while preserving the array structure
8. Return ONLY the translated JSON, no explanations or comments

**Source content (${sourceLang.toUpperCase()}):**

${JSON.stringify(sourceContent, null, 2)}

**Your task:**
Return the complete translated JSON in ${targetLangName}. Respond with ONLY the JSON object, nothing else.`;

    // Appeler l'API Claude
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 8000,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.text();
      console.error("Anthropic API error:", errorData);
      return c.json({ 
        error: `Anthropic API error: ${anthropicResponse.status}`,
        details: errorData 
      }, 500);
    }

    const anthropicData = await anthropicResponse.json();
    const translatedText = anthropicData.content[0].text;

    // Parser le JSON traduit
    let translatedContent;
    try {
      // Extraire le JSON si Claude a ajouté du texte autour
      const jsonMatch = translatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        translatedContent = JSON.parse(jsonMatch[0]);
      } else {
        translatedContent = JSON.parse(translatedText);
      }
    } catch (parseError: any) {
      console.error("Error parsing translated JSON:", parseError);
      console.error("Raw response:", translatedText);
      return c.json({ 
        error: "Failed to parse translated content",
        details: parseError.message,
        raw: translatedText.substring(0, 500)
      }, 500);
    }

    // Vérifier que la structure est correcte
    if (!translatedContent.language || !translatedContent.hero || !translatedContent.footer) {
      return c.json({ 
        error: "Invalid translated content structure",
        details: "Missing required keys (language, hero, footer)"
      }, 500);
    }

    // Mettre à jour le code de langue
    translatedContent.language = targetLang;

    console.log(`✅ Translation to ${targetLang} completed successfully`);

    return c.json({
      success: true,
      content: translatedContent,
      sourceLang,
      targetLang,
      tokensUsed: anthropicData.usage?.total_tokens || 0,
    });

  } catch (error: any) {
    console.error("Error in POST /translate:", error);
    return c.json({ error: error.message }, 500);
  }
});

/**
 * POST /migrate-contacttype
 * Migrer le champ contactType dans toutes les traductions existantes
 */
app.post("/migrate-contacttype", async (c) => {
  try {
    const supabase = getSupabaseClient();
    const results = [];
    const errors = [];

    console.log('🔄 Starting contactType migration...');

    // Récupérer toutes les traductions existantes
    const { data: translations, error: fetchError } = await supabase
      .from("landing_translations")
      .select("*");

    if (fetchError) {
      console.error("Error fetching translations:", fetchError);
      return c.json({ error: fetchError.message }, 500);
    }

    // Pour chaque traduction, ajouter le champ contactType
    for (const translation of translations || []) {
      try {
        const lang = translation.language_code;
        const content = translation.content;

        // Vérifier si contactType existe déjà
        if (content?.ctaForm?.form?.fields?.contactType) {
          console.log(`✓ ${lang}: contactType already exists, skipping`);
          results.push({ lang, action: 'skipped', reason: 'already_exists' });
          continue;
        }

        // Vérifier si ctaForm existe
        if (!content?.ctaForm?.form?.fields) {
          console.log(`⚠ ${lang}: ctaForm.form.fields not found, skipping`);
          results.push({ lang, action: 'skipped', reason: 'no_ctaform' });
          continue;
        }

        // Ajouter le champ contactType depuis les traductions pré-définies
        const contactTypeData = contactTypeTranslations[lang];
        
        if (!contactTypeData) {
          console.log(`⚠ ${lang}: No contactType translation found, using French as fallback`);
          content.ctaForm.form.fields.contactType = contactTypeTranslations.fr;
          results.push({ lang, action: 'updated', fallback: true });
        } else {
          content.ctaForm.form.fields.contactType = contactTypeData;
          results.push({ lang, action: 'updated', fallback: false });
        }

        // Sauvegarder la mise à jour
        const { error: updateError } = await supabase
          .from("landing_translations")
          .update({
            content,
            updated_at: new Date().toISOString(),
          })
          .eq("language_code", lang);

        if (updateError) throw updateError;
        console.log(`✅ ${lang}: contactType added successfully`);

      } catch (error: any) {
        console.error(`Error migrating ${translation.language_code}:`, error);
        errors.push({ lang: translation.language_code, error: error.message });
      }
    }

    return c.json({
      success: errors.length === 0,
      message: `Migration completed: ${results.length} processed, ${errors.length} errors`,
      results,
      errors,
      total_processed: results.length,
      total_errors: errors.length,
    });

  } catch (error: any) {
    console.error("Error in POST /migrate-contacttype:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default app;