import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Supabase configuration using Figma Make's built-in Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

// Check if credentials are configured
const credentialsConfigured = Boolean(supabaseUrl && supabaseAnonKey && projectId);

if (credentialsConfigured) {
  console.log('✅ Supabase connected:', projectId);
  console.log('📍 URL:', supabaseUrl);
  console.log('📋 Next step: Create the table → See SETUP_DATABASE.md');
} else {
  console.warn('⚠️ Supabase credentials not configured');
  console.warn('📖 See SETUP_DATABASE.md for instructions');
}

// Create Supabase client with explicit options
export const supabase = credentialsConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
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
    })
  : null;

// FORCE: Supprimer toute session au chargement
if (supabase) {
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      console.warn('⚠️ Session détectée sur formulaire public - Suppression...');
      supabase.auth.signOut();
    }
  });
}

// Database types
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

// Helper functions
export async function saveResponse(data: MarketResearchResponse) {
  if (!supabase) {
    console.error('Supabase not configured. Cannot save response.');
    return { success: false, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data: response, error } = await supabase
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
  if (!supabase) {
    console.warn('Supabase not configured. Using mock data.');
    return { success: false, data: null, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await supabase
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
  if (!supabase) {
    return { success: false, error: new Error('Supabase not configured') };
  }
  
  try {
    const { data, error } = await supabase
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
  if (!supabase) {
    return { success: false, count: 0 };
  }
  
  try {
    const { count, error } = await supabase
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
  if (!supabase) {
    return { success: false, error: new Error('Supabase not configured'), data: [] };
  }
  
  try {
    const { data, error } = await supabase
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
  if (!supabase) {
    return { success: false, error: new Error('Supabase not configured'), data: [] };
  }
  
  try {
    const { data, error } = await supabase
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
  if (!supabase) {
    return { success: false, error: new Error('Supabase not configured') };
  }
  
  try {
    const { error } = await supabase
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
