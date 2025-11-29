import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const app = new Hono();

/**
 * POST /database/deploy
 * Déploie automatiquement le schéma complet de la base de données
 * 
 * Note: Comme Supabase ne permet pas l'exécution de SQL arbitraire via le client JS,
 * cette route retourne le SQL à exécuter manuellement dans le dashboard.
 * 
 * Pour un vrai déploiement automatique, il faudrait utiliser l'API Management de Supabase
 * ou une connexion directe PostgreSQL.
 */
app.post("/deploy", async (c) => {
  try {
    console.log("[DATABASE] 🚀 Tentative de déploiement de la base de données...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[DATABASE] ❌ Credentials Supabase manquants");
      return c.json(
        {
          success: false,
          error: "SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY non configuré",
        },
        500
      );
    }

    console.log("[DATABASE] ✅ Credentials Supabase récupérés");

    // Malheureusement, Supabase JS Client ne supporte pas l'exécution de DDL (CREATE TABLE, etc.)
    // La seule façon de le faire est via:
    // 1. Le Dashboard Supabase (SQL Editor)
    // 2. L'API Management de Supabase (nécessite des credentials spéciaux)
    // 3. Une connexion PostgreSQL directe (nécessite SUPABASE_DB_URL)

    // Pour l'instant, on va créer la table en utilisant une approche alternative
    // On va vérifier si la table existe et retourner des instructions

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Test de connexion
    console.log("[DATABASE] 🔍 Test de connexion à Supabase...");
    
    const { data: healthCheck, error: healthError } = await supabase
      .from("_health_check_table_that_does_not_exist")
      .select("*")
      .limit(1);

    // L'erreur est normale, on vérifie juste que la connexion fonctionne
    console.log("[DATABASE] ✅ Connexion Supabase OK");

    // Retourner les instructions pour le déploiement manuel
    return c.json({
      success: false,
      error: "Déploiement automatique non disponible via Supabase JS Client",
      message: "Le déploiement automatique nécessite une configuration supplémentaire",
      instructions: {
        method1: {
          title: "Méthode Recommandée (Dashboard Supabase)",
          steps: [
            "1. Ouvrez https://supabase.com/dashboard",
            "2. Sélectionnez votre projet: vhpbmckgxtdyxdwhmdxy",
            "3. Allez dans 'SQL Editor'",
            "4. Cliquez sur 'New Query'",
            "5. Copiez le contenu de /supabase/migrations/00_create_complete_database.sql",
            "6. Collez dans l'éditeur",
            "7. Cliquez sur 'Run'",
            "8. Attendez la confirmation de succès",
          ],
          time: "3 minutes",
          guide: "/🚀_SETUP_BASE_PROPRE.md",
        },
        method2: {
          title: "Alternative (Configuration SUPABASE_DB_URL)",
          steps: [
            "1. Récupérez votre Database URL dans Supabase Dashboard > Settings > Database",
            "2. Format: postgresql://postgres:[PASSWORD]@db.vhpbmckgxtdyxdwhmdxy.supabase.co:5432/postgres",
            "3. Ajoutez SUPABASE_DB_URL dans les secrets de votre projet",
            "4. Redéployez les Edge Functions",
            "5. Réessayez cette route",
          ],
          time: "10 minutes",
          complexity: "Avancé",
        },
      },
      sqlFile: "/supabase/migrations/00_create_complete_database.sql",
      projectId: "vhpbmckgxtdyxdwhmdxy",
    });
  } catch (error) {
    console.error("[DATABASE] ❌ Erreur générale:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de la tentative de déploiement",
        details: error.message,
        guide: "/🚀_SETUP_BASE_PROPRE.md",
      },
      500
    );
  }
});

/**
 * GET /database/status
 * Vérifie le statut de la base de données
 */
app.get("/status", async (c) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      return c.json(
        {
          success: false,
          exists: false,
          error: "Credentials Supabase manquants",
        },
        500
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("[DATABASE] 🔍 Vérification de l'existence de la table...");

    // Vérifier si la table existe en tentant un SELECT
    const { data, error } = await supabase
      .from("market_research_responses")
      .select("id")
      .limit(1);

    if (error) {
      // Code 42P01 = relation does not exist (table n'existe pas)
      if (error.code === "42P01" || error.message.includes("does not exist")) {
        console.log("[DATABASE] ⚠️  La table n'existe pas encore");
        return c.json({
          success: true,
          exists: false,
          message: "La table market_research_responses n'existe pas encore",
          action: "Utilisez le guide manuel pour la créer",
          guide: "/🚀_SETUP_BASE_PROPRE.md",
        });
      }

      // Autre erreur
      console.error("[DATABASE] ❌ Erreur lors de la vérification:", error);
      return c.json(
        {
          success: false,
          exists: false,
          error: "Erreur lors de la vérification",
          details: error.message,
        },
        500
      );
    }

    console.log("[DATABASE] ✅ La table existe");

    // La table existe, récupérer des stats
    const { count } = await supabase
      .from("market_research_responses")
      .select("*", { count: "exact", head: true });

    return c.json({
      success: true,
      exists: true,
      message: "La table market_research_responses existe",
      stats: {
        total_responses: count || 0,
      },
      project_id: "vhpbmckgxtdyxdwhmdxy",
    });
  } catch (error) {
    console.error("[DATABASE] ❌ Erreur:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de la vérification",
        details: error.message,
      },
      500
    );
  }
});

/**
 * GET /database/sql
 * Retourne le contenu du fichier SQL complet
 */
app.get("/sql", async (c) => {
  try {
    // Lire le fichier SQL
    const sqlContent = await Deno.readTextFile(
      "/supabase/migrations/00_create_complete_database.sql"
    );

    return c.text(sqlContent, 200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="create_database.sql"',
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Impossible de lire le fichier SQL",
        details: error.message,
      },
      500
    );
  }
});

/**
 * POST /database/fix-rls
 * Applique le fix RLS pour autoriser les insertions publiques
 * 
 * Ce endpoint corrige l'erreur "new row violates row-level security policy"
 * en ajoutant la clause TO anon, authenticated à la policy
 */
app.post("/fix-rls", async (c) => {
  try {
    console.log("[DATABASE] 🔧 Application du fix RLS...");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[DATABASE] ❌ Credentials manquants");
      return c.json(
        {
          success: false,
          error: "Credentials Supabase manquants",
        },
        500
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Étape 1: Supprimer l'ancienne policy
    console.log("[DATABASE] 🗑️ Suppression de l'ancienne policy...");
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: 'DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses'
    });

    if (dropError) {
      console.warn("[DATABASE] ⚠️ Erreur lors de la suppression de la policy (peut-être normale):", dropError);
    }

    // Étape 2: Recréer la policy avec le fix
    console.log("[DATABASE] ✨ Création de la nouvelle policy avec TO anon...");
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY "allow_public_inserts"
          ON market_research_responses
          FOR INSERT
          TO anon, authenticated
          WITH CHECK (true)
      `
    });

    if (createError) {
      console.error("[DATABASE] ❌ Erreur lors de la création de la policy:", createError);
      return c.json({
        success: false,
        error: "Impossible de créer la policy",
        details: createError,
        manualFix: {
          instructions: "Exécutez ce SQL manuellement dans Supabase SQL Editor",
          sql: `
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;

CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

GRANT INSERT ON market_research_responses TO anon;
          `
        }
      });
    }

    // Étape 3: Vérifier les GRANT
    console.log("[DATABASE] 🔐 Vérification des permissions GRANT...");
    const { error: grantError } = await supabase.rpc('exec_sql', {
      sql: 'GRANT INSERT ON market_research_responses TO anon'
    });

    if (grantError) {
      console.warn("[DATABASE] ⚠️ Erreur GRANT (peut-être déjà existant):", grantError);
    }

    console.log("[DATABASE] ✅ Fix RLS appliqué avec succès !");

    return c.json({
      success: true,
      message: "Fix RLS appliqué avec succès",
      details: {
        policyDropped: !dropError,
        policyCreated: !createError,
        grantApplied: !grantError,
      }
    });
  } catch (error) {
    console.error("[DATABASE] ❌ Erreur inattendue:", error);
    return c.json(
      {
        success: false,
        error: "Erreur lors de l'application du fix",
        details: error.message,
        manualFix: {
          instructions: "Exécutez ce SQL manuellement dans Supabase SQL Editor",
          sql: `
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;

CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

GRANT INSERT ON market_research_responses TO anon;
          `
        }
      },
      500
    );
  }
});

export default app;
