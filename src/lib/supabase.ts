import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Supabase configuration using Figma Make's built-in Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Check if credentials are configured
const credentialsConfigured = Boolean(supabaseUrl && supabaseAnonKey && projectId);

if (credentialsConfigured) {
  // Supabase is configured
} else {
  console.warn('⚠️ Supabase credentials not configured');
  console.warn('📖 See SETUP_DATABASE.md for instructions');
}

// ⚠️ NE PLUS CRÉER D'INSTANCE ICI POUR ÉVITER "Multiple GoTrueClient"
// L'instance est maintenant créée dans /lib/supabase-public.ts
// Ce fichier est conservé pour la compatibilité avec les helpers

// SINGLETON: Create only ONE Supabase client instance (lazy initialization)
let supabaseInstance: SupabaseClient | null = null;

/**
 * ⚠️ DEPRECATED: Utilisez getSupabasePublicClient() de /lib/supabase-public.ts à la place
 * Cette fonction est conservée pour la compatibilité avec le code existant
 */
function getSupabaseClient(): SupabaseClient | null {
  if (!credentialsConfigured) {
    return null;
  }
  
  // Return existing instance if already created
  if (supabaseInstance) {
    return supabaseInstance;
  }
  
  // Create new instance only if it doesn't exist (LAZY)
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Pas de session pour formulaire public
      autoRefreshToken: false,
      detectSessionInUrl: false, // Ne pas détecter de session dans l'URL
      storage: undefined, // Pas de storage = pas de session cachée
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAnonKey}` // FORCER l'utilisation de la clé anon
      }
    }
  });
  
  return supabaseInstance;
}

// ⚠️ Export de la fonction pour usage externe (lazy loading)
export { getSupabaseClient };

// ⚠️ Export du client comme getter pour compatibilité avec le code existant
export const supabase = (() => {
  // Retourne un proxy qui crée l'instance seulement quand utilisé
  let _instance: SupabaseClient | null = null;
  return new Proxy({} as SupabaseClient, {
    get(target, prop) {
      if (!_instance) {
        _instance = getSupabaseClient();
      }
      if (!_instance) {
        throw new Error('Supabase not configured');
      }
      return (_instance as any)[prop];
    }
  });
})();

// Database types
export interface MarketResearchResponse {
  id?: string;
  created_at?: string;
  response_id: string;
  respondent_type?: string; // ✅ 'agency' | 'client' | 'worker'
  language_code?: string; // ✅ Code ISO 639-1 de la langue (fr, en, de, pl, ro, etc.)
  
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
  q14_risques: string | string[]; // ✅ Peut être string ou array
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
  q26_phone: string;
  q27_firstname: string;
  q28_lastname: string;
  q29_siret: string;
  email: string;
  autorise_contact: boolean;
  souhaite_rapport: boolean;
  
  // 🔹 ADDITIONAL DATA (questions spécifiques au type de répondant)
  additional_data?: {
    // Client specific
    q10_agences?: string;
    q10_processus?: string;
    // Worker specific
    q10_agence?: string;
    q10_agences_worker?: string;
    // Raw form data pour référence complète
    raw_form_data?: any;
    [key: string]: any; // Permet d'ajouter n'importe quelle clé dynamiquement
  };
  
  // Metadata enrichie
  country?: string;
  country_code?: string; // ✅ Code pays ISO 3166-1 alpha-2 (FR, DE, PL, RO, etc.) basé sur la langue
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

// Helper functions
export async function saveResponse(data: MarketResearchResponse) {
  const client = getSupabaseClient();
  if (!client) {
    console.error('Supabase not configured. Cannot save response.');
    return { success: false, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data: response, error } = await client
      .from('market_research_responses')
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data: response };
  } catch (error) {
    console.error('Error saving response:', error);
    return { success: false, error };
  }
}

export async function getAllResponses() {
  const client = getSupabaseClient();
  if (!client) {
    console.warn('Supabase not configured. Using mock data.');
    return { success: false, data: null, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await client
      .from('market_research_responses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching responses:', error);
    return { success: false, error, data: [] };
  }
}

export async function getResponseById(id: string) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await client
      .from('market_research_responses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching response:', error);
    return { success: false, error };
  }
}

export async function getResponsesCount() {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, count: 0 };
  }
  
  try {
    const { count, error } = await client
      .from('market_research_responses')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    return { success: true, count };
  } catch (error) {
    console.error('Error counting responses:', error);
    return { success: false, count: 0 };
  }
}

export async function getResponsesByCountry(country: string) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: new Error('Supabase not configured'), data: [] };
  }
  
  try {
    const { data, error } = await client
      .from('market_research_responses')
      .select('*')
      .eq('country', country)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching responses by country:', error);
    return { success: false, error, data: [] };
  }
}

export async function getResponsesBySector(sector: string) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: new Error('Supabase not configured'), data: [] };
  }
  
  try {
    const { data, error } = await client
      .from('market_research_responses')
      .select('*')
      .eq('sector', sector)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching responses by sector:', error);
    return { success: false, error, data: [] };
  }
}

export async function deleteResponse(id: string) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, error: new Error('Supabase not configured') };
  }
  
  try {
    const { error } = await client
      .from('market_research_responses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting response:', error);
    return { success: false, error };
  }
}

// Helper to extract country from q5_pays
export function extractCountry(q5_pays: string): string {
  if (!q5_pays) return 'Non spécifié';
  
  // Liste des pays européens (à personnaliser selon vos besoins)
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

// Helper to get interest level from score
export function getInterestLevel(score: number): string {
  if (score >= 9) return 'Très fortement intéressé';
  if (score >= 7) return 'Très intéressé';
  if (score >= 5) return 'Intéressé';
  if (score >= 3) return 'Peu intéressé';
  return 'Pas intéressé';
}

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return credentialsConfigured;
}