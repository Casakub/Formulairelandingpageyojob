import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const history = new Hono();

interface HistoryEntry {
  id: string;
  text_id: string;
  language_code: string;
  old_content: string;
  new_content: string;
  timestamp: string;
  user: string;
  category: string;
}

// Générer un ID unique pour l'historique
function generateHistoryId(): string {
  return `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// POST /history/save - Sauvegarder une entrée d'historique
history.post('/save', async (c) => {
  try {
    const { textId, languageCode, oldContent, newContent, category, user = 'admin' } = await c.req.json();

    if (!textId || !languageCode || oldContent === undefined || newContent === undefined || !category) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }

    const entry: HistoryEntry = {
      id: generateHistoryId(),
      text_id: textId,
      language_code: languageCode,
      old_content: oldContent,
      new_content: newContent,
      timestamp: new Date().toISOString(),
      user,
      category
    };

    const key = `history:${textId}:${languageCode}:${entry.id}`;
    await kv.set(key, JSON.stringify(entry));

    console.log(`✅ History entry saved: ${key}`);
    return c.json({ success: true, entry });
  } catch (error) {
    console.error('❌ Error saving history entry:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// GET /history/by-text - Récupérer l'historique pour un texte
history.get('/by-text', async (c) => {
  try {
    const textId = c.req.query('textId');
    const languageCode = c.req.query('languageCode');

    if (!textId) {
      return c.json({ success: false, error: 'textId is required' }, 400);
    }

    const prefix = languageCode 
      ? `history:${textId}:${languageCode}:`
      : `history:${textId}:`;
    
    const results = await kv.getByPrefix(prefix);
    
    const entries = results
      .map(item => {
        try {
          return JSON.parse(item.value) as HistoryEntry;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is HistoryEntry => entry !== null);

    // Trier par timestamp décroissant
    entries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return c.json({ success: true, entries });
  } catch (error) {
    console.error('❌ Error getting history by text:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// GET /history/by-category - Récupérer l'historique par catégorie
history.get('/by-category', async (c) => {
  try {
    const category = c.req.query('category');
    const limitStr = c.req.query('limit') || '50';
    const limit = parseInt(limitStr, 10);

    if (!category) {
      return c.json({ success: false, error: 'category is required' }, 400);
    }

    const allHistory = await kv.getByPrefix('history:');
    
    const entries = allHistory
      .map(item => {
        try {
          return JSON.parse(item.value) as HistoryEntry;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is HistoryEntry => entry !== null)
      .filter(entry => entry.category === category);

    // Trier par timestamp décroissant et limiter
    entries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const limitedEntries = entries.slice(0, limit);

    return c.json({ success: true, entries: limitedEntries });
  } catch (error) {
    console.error('❌ Error getting history by category:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// GET /history/recent - Récupérer l'historique récent
history.get('/recent', async (c) => {
  try {
    const limitStr = c.req.query('limit') || '100';
    const limit = parseInt(limitStr, 10);

    const allHistory = await kv.getByPrefix('history:');
    
    const entries = allHistory
      .map(item => {
        try {
          return JSON.parse(item.value) as HistoryEntry;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is HistoryEntry => entry !== null);

    // Trier par timestamp décroissant et limiter
    entries.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const limitedEntries = entries.slice(0, limit);

    return c.json({ success: true, entries: limitedEntries });
  } catch (error) {
    console.error('❌ Error getting recent history:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// GET /history/stats - Statistiques sur l'historique
history.get('/stats', async (c) => {
  try {
    const allHistory = await kv.getByPrefix('history:');
    
    const entries = allHistory
      .map(item => {
        try {
          return JSON.parse(item.value) as HistoryEntry;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is HistoryEntry => entry !== null);

    const byCategory: Record<string, number> = {};
    const byUser: Record<string, number> = {};
    
    let oldestEntry: HistoryEntry | null = null;
    let newestEntry: HistoryEntry | null = null;

    entries.forEach(entry => {
      // Compter par catégorie
      byCategory[entry.category] = (byCategory[entry.category] || 0) + 1;
      
      // Compter par utilisateur
      byUser[entry.user] = (byUser[entry.user] || 0) + 1;
      
      // Trouver la plus ancienne
      if (!oldestEntry || new Date(entry.timestamp) < new Date(oldestEntry.timestamp)) {
        oldestEntry = entry;
      }
      
      // Trouver la plus récente
      if (!newestEntry || new Date(entry.timestamp) > new Date(newestEntry.timestamp)) {
        newestEntry = entry;
      }
    });

    const stats = {
      totalEntries: entries.length,
      byCategory,
      byUser,
      oldestEntry: oldestEntry?.timestamp || null,
      newestEntry: newestEntry?.timestamp || null
    };

    return c.json({ success: true, stats });
  } catch (error) {
    console.error('❌ Error getting history stats:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

export default history;
