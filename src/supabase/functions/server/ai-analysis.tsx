import { Context } from "npm:hono";
import { getApiKey } from "./settings.tsx";

interface AnalysisRequest {
  responses: any[];
  stats: {
    totalResponses: number;
    withExperience: number;
    veryInterested: number;
    avgEmployees: number;
    avgWorkers: number;
    experienceRate: number;
    interestRate: number;
    countriesCount: Record<string, number>;
    sectorsCount: Record<string, number>;
    budgetCount: Record<string, number>;
  };
}

export async function analyzeWithClaude(c: Context) {
  try {
    // Try to get API key from database first, fallback to env var
    let apiKey = await getApiKey();
    
    if (!apiKey) {
      apiKey = Deno.env.get("ANTHROPIC_API_KEY") || null;
    }
    
    if (!apiKey) {
      return c.json({
        success: false,
        error: "ANTHROPIC_API_KEY not configured. Please add your API key in the Settings panel."
      }, 500);
    }

    const body: AnalysisRequest = await c.req.json();
    const { responses, stats } = body;

    if (!responses || responses.length === 0) {
      return c.json({
        success: false,
        error: "No responses to analyze"
      }, 400);
    }

    // Prepare data summary for Claude
    const dataForAnalysis = {
      summary: {
        totalResponses: responses.length,
        withExperience: stats.withExperience,
        veryInterested: stats.veryInterested,
        averageEmployees: stats.avgEmployees,
        averageWorkers: stats.avgWorkers,
        experienceRate: stats.experienceRate,
        interestRate: stats.interestRate
      },
      countriesDistribution: stats.countriesCount,
      sectorsDistribution: stats.sectorsCount,
      budgetDistribution: stats.budgetCount,
      sampleResponses: responses.slice(0, 10).map(r => ({
        country: r.country,
        sector: r.sector,
        employees: r.company_size,
        experience: r.detachment_experience,
        interest: r.interest_level,
        budget: r.q21_budget_mensuel,
        difficulties: r.q9_defi,
        mainCountries: r.q8_destinations
      }))
    };

    // Create prompt for Claude
    const prompt = `Tu es un expert en analyse de marché et stratégie business. Analyse les résultats de cette étude de marché pour YOJOB, une plateforme de courtage en recrutement européen qui vise à créer une marketplace connectant 27,000 agences ETT européennes.

**DONNÉES À ANALYSER :**

${JSON.stringify(dataForAnalysis, null, 2)}

**CONTEXTE :**
- YOJOB veut lancer une plateforme SaaS pour simplifier le détachement de travailleurs en Europe
- Actuellement 500+ agences partenaires dans 27 pays
- Le marché cible : 27,000 agences ETT européennes
- Pricing envisagé : 500€ à 10,000€+ par an selon la taille

**GÉNÈRE UNE ANALYSE COMPLÈTE EN MARKDOWN incluant :**

1. **📊 Synthèse Exécutive** (3-4 points clés)
2. **🌍 Analyse Géographique** (pays les plus actifs, opportunités)
3. **🏭 Segmentation Sectorielle** (secteurs dominants, potentiel)
4. **💰 Analyse Budgétaire** (distribution, potentiel de revenus)
5. **🎯 Personas Identifiés** (2-3 personas avec caractéristiques)
6. **🚀 Recommandations Stratégiques** (positionnement, pricing, GTM)
7. **📈 Projections de Marché** (TAM, SAM, SOM, prévisions Année 1)
8. **⚠️ Risques & Mitigations** (top 3-4 risques)
9. **💡 Insights Qualitatifs** (pain points mentionnés)
10. **🏆 Prochaines Actions** (immediate, court terme, moyen terme)
11. **Conclusion** (recommandation GO/NO-GO)

**FORMAT :** Markdown avec emojis, sections claires, données chiffrées précises, insights actionnables.

**LONGUEUR :** Analyse détaillée de 300-400 lignes minimum.`;

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8000,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Claude API Error:", error);
      return c.json({
        success: false,
        error: `Claude API error: ${response.status} - ${error}`
      }, response.status);
    }

    const result = await response.json();
    
    // Extract analysis from Claude's response
    const analysis = result.content[0].text;

    return c.json({
      success: true,
      analysis,
      metadata: {
        model: result.model,
        usage: result.usage,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Error in AI analysis:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }, 500);
  }
}
