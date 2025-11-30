/**
 * 🔓 CLIENT SUPABASE PUBLIC - FORMULAIRE SEULEMENT
 * 
 * Ce client est SÉPARÉ du client principal et est configuré pour :
 * - ❌ AUCUNE session (jamais)
 * - ❌ AUCUN storage (pas de cache)
 * - ❌ AUCUNE authentification
 * - ✅ SEULEMENT le rôle anon
 * 
 * Utilisé UNIQUEMENT pour les soumissions du formulaire public.
 */

import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Client PUBLIC dédié - Configuration ultra-stricte
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storage: undefined, // Pas de storage = impossible d'avoir une session
  },
  db: {
    schema: 'public'
  },
  // CRITIQUE: Headers personnalisés pour forcer le rôle anon
  global: {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Prefer': 'return=representation', // Pour récupérer la ligne insérée
    }
  }
});

console.log('🔓 Client Supabase PUBLIC initialisé (formulaire seulement)');
console.log('   → Authentification: DÉSACTIVÉE');
console.log('   → Session: IMPOSSIBLE');
console.log('   → Rôle forcé: anon');

// Types
export interface MarketResearchResponse {
  id?: string;
  created_at?: string;
  response_id: string;
  
  // Section 1: Profil
  q1_nom: string;
  q2_annee: string;
  q3_taille: string;
  q4_secteurs: string[];
  
  // Section 2: Détachement
  q5_pays: string;
  q6_volume: string;
  q7_origine: string;
  q8_destinations: string;
  q9_defi: string;
  q9_autre: string;
  q10_gestion: string;
  q11_incidents: string;
  
  // Section 3: Besoins
  q12_budget: string;
  q13_manque_gagner: string;
  q14_risques: string;
  q15_probleme: string;
  q16_erp: string;
  q16_autre: string;
  q17_migration: string;
  
  // Section 4: Intérêt
  q18_score: number;
  q19_features: string[];
  q20_prix: string;
  q21_budget_mensuel: string;
  q22_mvp: string;
  q23_role: string;
  
  // Section 5: Vision
  q24_evolution: string;
  q25_besoins: string;
  
  // Section 6: Contact
  email: string;
  autorise_contact: boolean;
  souhaite_rapport: boolean;
  
  // Metadata enrichie
  country?: string;
  sector?: string;
  company_size?: number;
  detachment_experience?: string;
  interest_level?: string;
  
  // Tracking
  ip_address?: string;
  user_agent?: string;
  completion_time?: number;
  referrer?: string;
}

/**
 * Sauvegarder une réponse au formulaire
 * Utilise UNIQUEMENT le client public sans session
 */
export async function saveResponsePublic(data: MarketResearchResponse) {
  console.log('💾 Sauvegarde via client PUBLIC...');
  console.log('   → Table: market_research_responses');
  console.log('   → Response ID:', data.response_id);
  
  try {
    // Vérifier qu'il n'y a PAS de session
    const { data: { session } } = await supabasePublic.auth.getSession();
    if (session) {
      console.error('🚨 SESSION DÉTECTÉE sur client public ! Suppression...');
      await supabasePublic.auth.signOut();
      
      // Attendre 500ms pour que la session soit bien supprimée
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('✅ Pas de session active - Insertion en tant que anon...');
    
    // Insertion directe avec le rôle anon
    const { data: response, error } = await supabasePublic
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
    
    // 🔗 DÉCLENCHER LES INTÉGRATIONS (Google Sheets, n8n, Notion, etc.)
    try {
      console.log('🔗 Déclenchement des intégrations...');
      
      const integrationsResponse = await fetch(
        `${supabaseUrl}/functions/v1/make-server-10092a63/integrations/trigger`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
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

// Helper functions
export function extractCountry(q5_pays: string): string {
  if (!q5_pays) return 'Non spécifié';
  
  const countries = [
    'France', 'Allemagne', 'Espagne', 'Italie', 'Portugal', 'Belgique',
    'Pays-Bas', 'Pologne', 'Roumanie', 'Grèce', 'Suède', 'Danemark',
    'Norvège', 'Finlande', 'Autriche', 'Suisse', 'Irlande', 'Luxembourg',
    'Croatie', 'Slovénie', 'Slovaquie', 'République Tchèque', 'Hongrie',
    'Bulgarie', 'Lituanie', 'Lettonie', 'Estonie'
  ];
  
  for (const country of countries) {
    if (q5_pays.includes(country)) {
      return country;
    }
  }
  
  return q5_pays.split(',')[0].trim();
}

export function getInterestLevel(score: number): string {
  if (score >= 9) return 'Très fortement intéressé';
  if (score >= 7) return 'Très intéressé';
  if (score >= 5) return 'Intéressé';
  if (score >= 3) return 'Peu intéressé';
  return 'Pas intéressé';
}