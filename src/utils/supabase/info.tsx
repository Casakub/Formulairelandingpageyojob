// =============================================================================
// SUPABASE CONFIGURATION
// Les valeurs sont lues depuis les variables d'environnement Vite
// =============================================================================

// ID du projet Supabase (extrait de l'URL)
export const projectId = import.meta.env?.VITE_SUPABASE_URL
  ? new URL(import.meta.env.VITE_SUPABASE_URL).hostname.split('.')[0]
  : "vhpbmckgxtdyxdwhmdxy";

// Clé publique anonyme
export const publicAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY 
  || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE5ODUsImV4cCI6MjA3OTgzNzk4NX0.Vv0nIgRa91pi-trbK9drGTF6uoeCvvm4L2HEJ4UlyBo";

// URL complète Supabase (export additionnel utile)
export const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL 
  || `https://${projectId}.supabase.co`;
