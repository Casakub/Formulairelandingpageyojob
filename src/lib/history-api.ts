import { projectId, publicAnonKey } from '../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/history`;

const headers = {
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json'
};

export interface HistoryEntry {
  id: string;
  text_id: string;
  language_code: string;
  old_content: string;
  new_content: string;
  timestamp: string;
  user: string;
  category: string; // 'hero', 'progress', 'ui'
}

// Sauvegarder une entrée d'historique
export async function saveHistoryEntry(
  textId: string,
  languageCode: string,
  oldContent: string,
  newContent: string,
  category: string,
  user: string = 'admin'
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/save`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        textId,
        languageCode,
        oldContent,
        newContent,
        category,
        user
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to save history entry: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error saving history entry:', error);
    throw error;
  }
}

// Récupérer l'historique pour un texte spécifique
export async function getHistoryByText(
  textId: string,
  languageCode?: string
): Promise<HistoryEntry[]> {
  try {
    const params = new URLSearchParams({ textId });
    if (languageCode) {
      params.append('languageCode', languageCode);
    }

    const response = await fetch(`${BASE_URL}/by-text?${params}`, { headers });

    if (!response.ok) {
      throw new Error(`Failed to get history: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.entries : [];
  } catch (error) {
    console.error('Error getting history by text:', error);
    return [];
  }
}

// Récupérer l'historique par catégorie
export async function getHistoryByCategory(
  category: string,
  limit: number = 50
): Promise<HistoryEntry[]> {
  try {
    const response = await fetch(`${BASE_URL}/by-category?category=${category}&limit=${limit}`, { 
      headers 
    });

    if (!response.ok) {
      throw new Error(`Failed to get history: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.entries : [];
  } catch (error) {
    console.error('Error getting history by category:', error);
    return [];
  }
}

// Récupérer tout l'historique récent
export async function getRecentHistory(limit: number = 100): Promise<HistoryEntry[]> {
  try {
    const response = await fetch(`${BASE_URL}/recent?limit=${limit}`, { headers });

    if (!response.ok) {
      throw new Error(`Failed to get recent history: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.entries : [];
  } catch (error) {
    console.error('Error getting recent history:', error);
    return [];
  }
}

// Obtenir des statistiques sur l'historique
export async function getHistoryStats(): Promise<{
  totalEntries: number;
  byCategory: Record<string, number>;
  byUser: Record<string, number>;
  oldestEntry: string | null;
  newestEntry: string | null;
} | null> {
  try {
    const response = await fetch(`${BASE_URL}/stats`, { headers });

    if (!response.ok) {
      throw new Error(`Failed to get history stats: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.stats : null;
  } catch (error) {
    console.error('Error getting history stats:', error);
    return null;
  }
}
