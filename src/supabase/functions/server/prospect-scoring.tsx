import Anthropic from "npm:@anthropic-ai/sdk@0.32.1";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

/**
 * 🤖 SCORING IA DES PROSPECTS
 * Utilise Claude pour analyser et scorer automatiquement les prospects
 */

interface ProspectForScoring {
  id: string;
  type: string;
  source: string;
  name: string | null;
  email: string;
  company: string | null;
  country_code: string | null;
  sector: string | null;
  need_type: string | null;
  message: string | null;
  custom_fields: any;
}

function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase credentials");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

function getAnthropicClient() {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    throw new Error("Missing Anthropic API key");
  }
  return new Anthropic({ apiKey });
}

export async function scoreProspectWithAI(prospect: ProspectForScoring) {
  try {
    const anthropic = getAnthropicClient();

    const prompt = `Tu es un expert en scoring de prospects B2B pour YOJOB, entreprise de courtage en recrutement européen.

CONTEXTE YOJOB:
- Spécialité: Intérim européen, recrutement transfrontalier
- Cibles principales: Clients BTP/Industrie, Agences ETT partenaires
- Zone: 27 pays européens
- Value: Projets de recrutement > 10 personnes = haute valeur

PROSPECT À SCORER:
Type: ${prospect.type}
Source: ${prospect.source}
Nom: ${prospect.name || 'Non renseigné'}
Email: ${prospect.email}
Entreprise: ${prospect.company || 'Non renseignée'}
Pays: ${prospect.country_code || 'Non renseigné'}
Secteur: ${prospect.sector || 'Non renseigné'}
Besoin: ${prospect.need_type || 'Non renseigné'}
Message: ${prospect.message || 'Aucun message'}

CRITÈRES DE SCORING (0-100):
1. **Fit secteur** (0-25 pts): BTP/Industrie = max, autres = moyen
2. **Taille projet** (0-25 pts): Mots-clés volume (10+, 50+, équipe, chantier)
3. **Qualité lead** (0-25 pts): Email pro > perso, entreprise renseignée, message détaillé
4. **Urgence** (0-15 pts): Mots-clés temporels (urgent, ASAP, début, prochainement)
5. **Budget potentiel** (0-10 pts): Indices budget, durée mission, type contrat

CONSIGNES:
- Réponds UNIQUEMENT avec un JSON valide
- Sois objectif et data-driven
- Score = 0-100 (entier)
- Priority = 'low' | 'medium' | 'high' | 'urgent'
- Raison = explication courte (1-2 phrases)

FORMAT RÉPONSE (JSON uniquement):
{
  "score": 75,
  "priority": "high",
  "reason": "Client BTP avec projet de 50+ ouvriers, secteur prioritaire, message détaillé indiquant urgence.",
  "recommended_action": "Appel téléphonique sous 24h",
  "estimated_value": "high"
}`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Parser la réponse JSON
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in Claude response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return {
      score: Math.min(100, Math.max(0, analysis.score || 50)),
      priority: analysis.priority || "medium",
      reason: analysis.reason || "Score automatique",
      recommended_action: analysis.recommended_action || "Suivre normalement",
      estimated_value: analysis.estimated_value || "medium",
    };
  } catch (error) {
    console.error("Error scoring prospect with AI:", error);
    // Fallback: scoring basique
    return {
      score: 50,
      priority: "medium",
      reason: "Scoring automatique (IA indisponible)",
      recommended_action: "Suivre normalement",
      estimated_value: "medium",
    };
  }
}

/**
 * Scorer un prospect et mettre à jour la BDD
 */
export async function scoreAndUpdateProspect(prospectId: string) {
  const supabase = getSupabaseClient();

  // Récupérer le prospect
  const { data: prospect, error: fetchError } = await supabase
    .from("prospects")
    .select("*")
    .eq("id", prospectId)
    .single();

  if (fetchError || !prospect) {
    throw new Error("Prospect not found");
  }

  // Scorer avec l'IA
  const scoring = await scoreProspectWithAI(prospect);

  // Mettre à jour le prospect
  const { error: updateError } = await supabase
    .from("prospects")
    .update({
      score: scoring.score,
      priority: scoring.priority,
      custom_fields: {
        ...prospect.custom_fields,
        ai_scoring: {
          score: scoring.score,
          priority: scoring.priority,
          reason: scoring.reason,
          recommended_action: scoring.recommended_action,
          estimated_value: scoring.estimated_value,
          scored_at: new Date().toISOString(),
        },
      },
    })
    .eq("id", prospectId);

  if (updateError) {
    throw new Error("Failed to update prospect with score");
  }

  // Ajouter une action
  await supabase.from("prospect_actions").insert({
    prospect_id: prospectId,
    action_type: "ai_scoring",
    action_label: `Score IA: ${scoring.score}/100 - ${scoring.priority}`,
    action_description: scoring.reason,
    user_name: "IA Claude",
    metadata: scoring,
  });

  return scoring;
}

/**
 * Scorer tous les prospects non scorés
 */
export async function scoreBatchProspects(limit = 50) {
  const supabase = getSupabaseClient();

  // Récupérer les prospects sans score ou avec score ancien
  const { data: prospects } = await supabase
    .from("prospects")
    .select("*")
    .is("score", null)
    .eq("is_archived", false)
    .limit(limit);

  if (!prospects || prospects.length === 0) {
    return { scored: 0, results: [] };
  }

  const results = [];

  for (const prospect of prospects) {
    try {
      const scoring = await scoreAndUpdateProspect(prospect.id);
      results.push({
        id: prospect.id,
        email: prospect.email,
        score: scoring.score,
        success: true,
      });
    } catch (error) {
      console.error(`Error scoring prospect ${prospect.id}:`, error);
      results.push({
        id: prospect.id,
        email: prospect.email,
        success: false,
        error: error.message,
      });
    }
  }

  return {
    scored: results.filter((r) => r.success).length,
    total: prospects.length,
    results,
  };
}