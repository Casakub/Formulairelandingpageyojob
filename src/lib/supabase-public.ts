import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey, supabaseUrl } from '../utils/supabase/info';
import type { MarketResearchResponse } from './supabase';

// =============================================================================
// CLIENT SUPABASE PUBLIC (pour le formulaire - rôle anon uniquement)
// =============================================================================

// SINGLETON: Une seule instance du client public
let publicClientInstance: SupabaseClient | null = null;

/**
 * Obtenir le client Supabase public (rôle anon)
 * Utilisé pour les soumissions de formulaire sans authentification
 */
export function getSupabasePublicClient(): SupabaseClient {
  if (publicClientInstance) {
    return publicClientInstance;
  }

  publicClientInstance = createClient(supabaseUrl, publicAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: undefined,
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    }
  });

  return publicClientInstance;
}

/**
 * Sauvegarder une réponse au formulaire
 * Utilise UNIQUEMENT le client public sans session
 */
export async function saveResponsePublic(data: MarketResearchResponse) {
  console.log('💾 Sauvegarde via client PUBLIC...');
  console.log('   → Table: market_research_responses');
  console.log('   → Response ID:', data.response_id);

  const supabase = getSupabasePublicClient();

  try {
    // Vérifier qu'il n'y a PAS de session
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.error('🚨 SESSION DÉTECTÉE sur client public ! Suppression...');
      await supabase.auth.signOut();

      // Attendre 500ms pour que la session soit bien supprimée
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('✅ Pas de session active - Insertion en tant que anon...');

    // Insertion directe avec le rôle anon
    const { data: response, error } = await supabase
      .from('market_research_responses')
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error('❌ Error saving response:', error);

      // Logs détaillés pour debug
      console.error('   → Code:', error.code);
      console.error('   → Message:', error.message);
      console.error('   → Details:', error.details);
      console.error('   → Hint:', error.hint);

      throw error;
    }

    console.log('✅ Réponse sauvegardée avec succès !');
    console.log('   → ID:', response?.id);

    // 🔗 SYNCHRONISATION VERS LE CRM PROSPECTS
    try {
      console.log('🔗 Synchronisation vers CRM Prospects...');

      const syncResponse = await fetch(
        `${supabaseUrl}/functions/v1/make-server-10092a63/survey/sync-to-prospect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(response)
        }
      );

      if (syncResponse.ok) {
        const syncResult = await syncResponse.json();
        console.log('✅ Synchronisation CRM réussie:', syncResult);
        console.log(`   → Prospect ${syncResult.isNew ? 'créé' : 'mis à jour'}: ${syncResult.prospectId}`);
        console.log(`   → Score qualification: ${syncResult.qualificationScore}/100`);
      } else {
        console.warn('⚠️ Erreur synchronisation CRM (non bloquant)');
      }
    } catch (syncError) {
      // Les erreurs de sync ne doivent pas bloquer la soumission du formulaire
      console.warn('⚠️ CRM sync non déclenchée (non bloquant):', syncError);
    }

    // 🔗 DÉCLENCHER LES INTÉGRATIONS (Google Sheets, n8n, Notion, etc.)
    try {
      console.log('🔗 Déclenchement des intégrations...');

      const integrationsResponse = await fetch(
        `${supabaseUrl}/functions/v1/make-server-10092a63/integrations/trigger`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            responseData: response,
            responseId: response.id
          })
        }
      );

      if (integrationsResponse.ok) {
        const integrationResults = await integrationsResponse.json();
        console.log('✅ Intégrations déclenchées:', integrationResults);
        console.log(`   → ${integrationResults.successful}/${integrationResults.triggered} réussies`);
      } else {
        console.warn('⚠️ Erreur lors du déclenchement des intégrations (non bloquant)');
      }
    } catch (integrationError) {
      // Les erreurs d'intégration ne doivent pas bloquer la soumission du formulaire
      console.warn('⚠️ Intégrations non déclenchées (non bloquant):', integrationError);
    }

    return { success: true, data: response };
  } catch (error: any) {
    console.error('❌ Erreur lors de la soumission:', error);
    return { success: false, error };
  }
}

/**
 * Test de connexion Supabase public
 */
export async function testPublicConnection(): Promise<boolean> {
  try {
    const supabase = getSupabasePublicClient();
    const { error } = await supabase
      .from('market_research_responses')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Test connexion public échoué:', error);
      return false;
    }

    console.log('✅ Connexion Supabase public OK');
    return true;
  } catch (err) {
    console.error('❌ Erreur test connexion:', err);
    return false;
  }
}