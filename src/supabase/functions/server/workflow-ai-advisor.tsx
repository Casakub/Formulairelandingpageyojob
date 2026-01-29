import { Hono } from "npm:hono@4";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { getApiKey, getSelectedModel } from "./settings.tsx";
import { MOCK_WORKFLOWS, MOCK_EMAIL_TEMPLATES } from "./automations-data.ts";

const app = new Hono();

/**
 * 🤖 WORKFLOW AI ADVISOR
 * 
 * Utilise Claude (Anthropic) pour analyser votre logiciel et suggérer
 * de nouveaux workflows parfaitement adaptés à votre contexte
 */

// Helper pour obtenir le client Supabase
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

// Détecte si la table automations_workflows existe (sinon on fallback sur les mocks)
async function isAutomationsDbReady(supabase: any): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("automations_workflows")
      .select("id")
      .limit(1);

    if (error) {
      const message = (error as any)?.message || "";
      const code = (error as any)?.code || "";
      if (
        code === "PGRST205" ||
        message.includes("schema cache") ||
        message.includes("does not exist") ||
        message.includes("relation")
      ) {
        return false;
      }
      console.error("Automations DB check failed:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Automations DB check error:", err);
    return false;
  }
}

/**
 * Collecter le contexte de l'application pour l'analyse IA
 */
async function collectAppContext() {
  const supabase = getSupabaseClient();

  try {
    // 1. Statistiques des prospects
    const { data: prospectsStats } = await supabase
      .from('prospects')
      .select('status, type, source, country_code, sector, tags');

    // Analyser les prospects
    const prospectsByStatus: Record<string, number> = {};
    const prospectsByType: Record<string, number> = {};
    const prospectsBySource: Record<string, number> = {};
    const prospectsByCountry: Record<string, number> = {};
    const prospectsBySector: Record<string, number> = {};
    const allTags: string[] = [];

    prospectsStats?.forEach(p => {
      prospectsByStatus[p.status] = (prospectsByStatus[p.status] || 0) + 1;
      prospectsByType[p.type] = (prospectsByType[p.type] || 0) + 1;
      prospectsBySource[p.source] = (prospectsBySource[p.source] || 0) + 1;
      prospectsByCountry[p.country_code] = (prospectsByCountry[p.country_code] || 0) + 1;
      if (p.sector) prospectsBySector[p.sector] = (prospectsBySector[p.sector] || 0) + 1;
      if (p.tags) allTags.push(...p.tags);
    });

    // 2. Workflows existants
    const existingWorkflows = MOCK_WORKFLOWS.map(w => ({
      name: w.name,
      status: w.status,
      trigger: w.trigger.type,
      conditions: w.conditions,
      steps: w.steps.map(s => ({
        type: s.type,
        delay: s.delay_minutes,
      })),
      stats: w.stats,
    }));

    // 3. Templates d'emails disponibles
    const emailTemplates = MOCK_EMAIL_TEMPLATES.map(t => ({
      name: t.name,
      category: t.category,
      language: t.language,
      subject: t.subject,
      usage_count: t.usage_count,
    }));

    // 4. Taux de conversion (prospects converted)
    const totalProspects = prospectsStats?.length || 0;
    const convertedProspects = prospectsByStatus['converted'] || 0;
    const conversionRate = totalProspects > 0 ? ((convertedProspects / totalProspects) * 100).toFixed(1) : 0;

    // 5. Prospects les plus fréquents (top 3 secteurs, top 3 pays)
    const topSectors = Object.entries(prospectsBySector)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([sector, count]) => ({ sector, count }));

    const topCountries = Object.entries(prospectsByCountry)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([country, count]) => ({ country, count }));

    // 6. Tags les plus utilisés
    const tagCounts: Record<string, number> = {};
    allTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    const topTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, count }));

    return {
      totalProspects,
      conversionRate,
      prospectsByStatus,
      prospectsByType,
      prospectsBySource,
      topSectors,
      topCountries,
      topTags,
      existingWorkflows,
      emailTemplates,
      workflowsCount: MOCK_WORKFLOWS.length,
      activeWorkflowsCount: MOCK_WORKFLOWS.filter(w => w.status === 'active').length,
    };
  } catch (error) {
    console.error('Error collecting app context:', error);
    throw error;
  }
}

/**
 * POST /suggest
 * Demander à l'IA de suggérer de nouveaux workflows
 */
app.post("/suggest", async (c) => {
  try {
    // 1. Vérifier que l'API key est configurée
    const apiKey = await getApiKey();
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: "Clé API Anthropic non configurée. Veuillez l'ajouter dans les Paramètres.",
      }, 400);
    }

    // 2. Collecter le contexte de l'application
    console.log('🔍 Collecte du contexte de l\'application...');
    const context = await collectAppContext();

    // 3. Créer le prompt pour Claude
    const prompt = `Tu es un expert en marketing automation et stratégie CRM pour YOJOB, entreprise française de courtage en recrutement européen.

**CONTEXTE YOJOB :**
- Activité : Courtage en recrutement européen (intérim, CDI)
- Réseau : 500+ agences partenaires dans 27 pays européens
- Secteurs : BTP, Industrie, Agriculture, Hôtellerie, Santé, Tech
- Objectif : Convertir les prospects en clients actifs

**ÉTAT ACTUEL DU LOGICIEL :**

📊 **Statistiques prospects :**
- Total de prospects : ${context.totalProspects}
- Taux de conversion : ${context.conversionRate}%
- Répartition par statut : ${JSON.stringify(context.prospectsByStatus, null, 2)}
- Répartition par type : ${JSON.stringify(context.prospectsByType, null, 2)}
- Répartition par source : ${JSON.stringify(context.prospectsBySource, null, 2)}

🎯 **Top 3 secteurs :**
${context.topSectors.map(s => `- ${s.sector} : ${s.count} prospects`).join('\n')}

🌍 **Top 3 pays :**
${context.topCountries.map(c => `- ${c.country} : ${c.count} prospects`).join('\n')}

🏷️ **Tags les plus utilisés :**
${context.topTags.map(t => `- ${t.tag} : ${t.count} fois`).join('\n')}

⚙️ **Workflows existants :**
- Nombre total : ${context.workflowsCount}
- Workflows actifs : ${context.activeWorkflowsCount}

Workflows configurés :
${JSON.stringify(context.existingWorkflows, null, 2)}

📧 **Templates d'emails disponibles :**
${context.emailTemplates.map(t => `- ${t.name} (${t.category}, ${t.language}) - Utilisé ${t.usage_count} fois`).join('\n')}

---

**TA MISSION :**

Analyse ces données et suggère **3 nouveaux workflows d'automatisation** qui sont :
1. ✅ **Adaptés au contexte YOJOB** (courtage recrutement européen)
2. ✅ **Basés sur les données réelles** (secteurs, pays, taux de conversion actuels)
3. ✅ **Complémentaires aux workflows existants** (éviter les doublons)
4. ✅ **Actionnables immédiatement** (utiliser les templates existants ou suggérer des nouveaux)
5. ✅ **Orientés conversion** (augmenter le taux de ${context.conversionRate}%)

**TYPES DE WORKFLOWS À CONSIDÉRER :**
- Nurturing prospects froids (new → contacted)
- Réengagement prospects inactifs
- Upsell/cross-sell prospects convertis
- Qualification automatique (contacted → qualified)
- Relance post-devis
- Onboarding nouveaux clients
- Segmentation par secteur/pays
- Récupération prospects perdus (lost → new)

**FORMAT DE RÉPONSE (STRICT JSON) :**

\`\`\`json
{
  "analysis": "Analyse en 2-3 phrases de l'état actuel et des opportunités identifiées",
  "suggestions": [
    {
      "name": "Nom du workflow (clair et actionnable)",
      "priority": "high|medium|low",
      "impact": "Description de l'impact attendu (conversions, engagement, etc.)",
      "trigger": {
        "type": "prospect_created|status_changed|tag_added|inactivity",
        "description": "Description du déclencheur"
      },
      "conditions": [
        {
          "field": "nom_du_champ",
          "operator": "equals|contains|greater_than|is_empty",
          "value": "valeur",
          "explanation": "Pourquoi cette condition"
        }
      ],
      "steps": [
        {
          "type": "send_email|create_task|add_tag|change_status|notify_team",
          "delay_minutes": 0,
          "description": "Description de l'action",
          "config": {
            "template_suggestion": "Si nouveau template : suggérer sujet et contenu",
            "task_title": "Si création de tâche : titre suggéré",
            "tag": "Si ajout de tag : nom du tag",
            "status": "Si changement de statut : nouveau statut"
          }
        }
      ],
      "expected_results": "Résultats attendus (quantifiés si possible)",
      "implementation_notes": "Notes pour l'implémentation (templates à créer, etc.)"
    }
  ]
}
\`\`\`

**CONTRAINTES IMPORTANTES :**
- Réponds UNIQUEMENT avec le JSON (pas de texte avant/après)
- Les workflows doivent être réalistes et implémentables immédiatement
- Privilégie la qualité sur la quantité (3 workflows maximum)
- Chaque workflow doit résoudre un problème identifié dans les données
- Suggère des noms de templates d'emails si nécessaire (avec sujet)

Analyse maintenant et suggère les 3 meilleurs workflows !`;

    // 4. Appeler Claude
    console.log('🤖 Appel à Claude pour suggestions...');
    
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: await getSelectedModel(),
        max_tokens: 8000,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Claude API Error:", errorData);
      
      let errorMessage = `Erreur API Claude (${response.status})`;
      
      if (errorData.error?.type === 'invalid_request_error') {
        if (errorData.error.message?.includes('credit balance is too low')) {
          errorMessage = '💳 Solde de crédits Anthropic insuffisant. Veuillez recharger sur console.anthropic.com';
        } else if (errorData.error.message?.includes('Invalid API Key')) {
          errorMessage = '🔑 Clé API invalide. Veuillez la reconfigurer dans les Paramètres.';
        }
      }
      
      return c.json({
        success: false,
        error: errorMessage,
        details: errorData.error?.message,
      }, response.status);
    }

    const result = await response.json();
    const aiResponse = result.content[0].text;

    // 5. Parser la réponse JSON de Claude
    let suggestions;
    try {
      // Nettoyer la réponse si elle contient des backticks
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      suggestions = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Error parsing Claude response:', parseError);
      console.log('Raw response:', aiResponse);
      
      return c.json({
        success: false,
        error: 'Erreur lors du parsing de la réponse IA',
        rawResponse: aiResponse.substring(0, 500),
      }, 500);
    }

    // 6. Valider la structure de la réponse
    if (!suggestions.analysis || !suggestions.suggestions || !Array.isArray(suggestions.suggestions)) {
      return c.json({
        success: false,
        error: 'Format de réponse IA invalide',
        rawResponse: aiResponse.substring(0, 500),
      }, 500);
    }

    console.log(`✅ ${suggestions.suggestions.length} workflows suggérés par l'IA`);

    return c.json({
      success: true,
      context,
      analysis: suggestions.analysis,
      suggestions: suggestions.suggestions,
      totalSuggestions: suggestions.suggestions.length,
      model: await getSelectedModel(),
      generatedAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("❌ Error in workflow AI advisor:", error);
    return c.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, 500);
  }
});

/**
 * POST /implement/:suggestionIndex
 * Implémenter automatiquement une suggestion de workflow
 */
app.post("/implement/:suggestionIndex", async (c) => {
  try {
    const { suggestionIndex } = c.req.param();
    const body = await c.req.json();
    const { suggestion } = body;

    if (!suggestion) {
      return c.json({
        success: false,
        error: 'Suggestion manquante dans le body',
      }, 400);
    }

    // Créer le workflow à partir de la suggestion
    const newWorkflow = {
      id: `wf-ai-${Date.now()}`,
      name: suggestion.name,
      description: `${suggestion.impact} (Suggéré par l'IA)`,
      status: 'draft' as const, // Créé en brouillon pour validation manuelle
      trigger: {
        type: suggestion.trigger.type,
        config: {},
        description: suggestion.trigger.description,
      },
      conditions: suggestion.conditions || [],
      steps: suggestion.steps.map((step: any, idx: number) => ({
        id: `step-${idx + 1}`,
        type: step.type,
        delay_minutes: step.delay_minutes || 0,
        description: step.description,
        config: step.config || {},
      })),
      stats: {
        total_runs: 0,
        success_runs: 0,
        failed_runs: 0,
        conversion_rate: 0,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'AI Advisor',
      version: 1,
      version_history: [],
      metadata: {
        ai_generated: true,
        ai_priority: suggestion.priority,
        ai_expected_results: suggestion.expected_results,
        ai_implementation_notes: suggestion.implementation_notes,
      },
    };

    // Ajouter aux workflows existants (DB si dispo, sinon mocks)
    try {
      const supabase = getSupabaseClient();
      const dbReady = await isAutomationsDbReady(supabase);

      if (dbReady) {
        const { data, error } = await supabase
          .from("automations_workflows")
          .insert([newWorkflow])
          .select()
          .single();

        if (error) {
          console.error("Error creating AI workflow in DB:", error);
          return c.json({ success: false, error: error.message }, 500);
        }

        return c.json({
          success: true,
          message: `Workflow "${suggestion.name}" créé avec succès en mode brouillon`,
          workflow: data,
          implementationNotes: suggestion.implementation_notes,
        });
      }
    } catch (err) {
      console.error("Error creating AI workflow (DB):", err);
    }

    MOCK_WORKFLOWS.push(newWorkflow);

    console.log(`✅ Workflow IA créé : ${newWorkflow.name}`);

    return c.json({
      success: true,
      message: `Workflow "${suggestion.name}" créé avec succès en mode brouillon`,
      workflow: newWorkflow,
      implementationNotes: suggestion.implementation_notes,
    });

  } catch (error: any) {
    console.error("❌ Error implementing AI suggestion:", error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

/**
 * POST /analyze-workflow/:workflowId
 * Demander à l'IA d'analyser et d'optimiser un workflow existant
 */
app.post("/analyze-workflow/:workflowId", async (c) => {
  try {
    const { workflowId } = c.req.param();
    
    // Vérifier que l'API key est configurée
    const apiKey = await getApiKey();
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: "Clé API Anthropic non configurée",
      }, 400);
    }

    // Trouver le workflow
    const workflow = MOCK_WORKFLOWS.find(w => w.id === workflowId);
    if (!workflow) {
      return c.json({
        success: false,
        error: "Workflow non trouvé",
      }, 404);
    }

    // Créer le prompt d'analyse
    const prompt = `Tu es un expert en marketing automation. Analyse ce workflow et suggère des optimisations.

**WORKFLOW À ANALYSER :**
${JSON.stringify(workflow, null, 2)}

**INSTRUCTIONS :**
1. Identifie les points forts du workflow
2. Identifie les points faibles ou améliorations possibles
3. Suggère 3-5 optimisations concrètes

**FORMAT DE RÉPONSE (STRICT JSON) :**
\`\`\`json
{
  "strengths": ["Point fort 1", "Point fort 2"],
  "weaknesses": ["Point faible 1", "Point faible 2"],
  "optimizations": [
    {
      "title": "Titre de l'optimisation",
      "description": "Description détaillée",
      "priority": "high|medium|low",
      "implementation": "Comment implémenter"
    }
  ],
  "overallScore": 75,
  "summary": "Résumé de l'analyse en 2-3 phrases"
}
\`\`\`

Réponds UNIQUEMENT avec le JSON.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 4000,
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return c.json({
        success: false,
        error: errorData.error?.message || 'Erreur API Claude',
      }, response.status);
    }

    const result = await response.json();
    const aiResponse = result.content[0].text;

    // Parser la réponse
    const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const analysis = JSON.parse(cleanedResponse);

    return c.json({
      success: true,
      workflowId,
      workflowName: workflow.name,
      analysis,
      generatedAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("❌ Error analyzing workflow:", error);
    return c.json({
      success: false,
      error: error.message,
    }, 500);
  }
});

export default app;
