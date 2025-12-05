import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Clock, User, FileText, ChevronDown, ChevronUp, X, RefreshCw, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import { getHistoryByCategory, type HistoryEntry } from '../../lib/history-api';

interface HistoryViewerProps {
  category: 'hero' | 'progress' | 'ui';
  onRestore?: (entry: HistoryEntry) => void;
}

export function HistoryViewer({ category, onRestore }: HistoryViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Charger l'historique
  async function loadHistory() {
    setLoading(true);
    try {
      const data = await getHistoryByCategory(category, 50);
      setHistory(data);
    } catch (error) {
      console.error('Erreur chargement historique:', error);
      toast.error('Erreur lors du chargement de l\'historique');
    } finally {
      setLoading(false);
    }
  }

  // Charger au montage et à l'ouverture
  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen, category]);

  // Formater la date
  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Grouper par date
  function groupByDate(entries: HistoryEntry[]): Record<string, HistoryEntry[]> {
    const groups: Record<string, HistoryEntry[]> = {};
    
    entries.forEach(entry => {
      const date = new Date(entry.timestamp);
      const dateKey = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(entry);
    });
    
    return groups;
  }

  const groupedHistory = groupByDate(history);

  // Couleurs par catégorie
  const categoryColors = {
    hero: 'from-cyan-500 to-blue-500',
    progress: 'from-green-500 to-emerald-500',
    ui: 'from-violet-500 to-purple-500'
  };

  const categoryBadgeColors = {
    hero: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    progress: 'bg-green-100 text-green-700 border-green-300',
    ui: 'bg-violet-100 text-violet-700 border-violet-300'
  };

  return (
    <div className="relative">
      {/* Bouton d'ouverture */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        <History className="w-4 h-4" />
        Historique
        {history.length > 0 && (
          <Badge className={categoryBadgeColors[category]}>
            {history.length}
          </Badge>
        )}
      </Button>

      {/* Panel de l'historique */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${categoryColors[category]} text-white p-6`}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <History className="w-6 h-6" />
                    Historique des modifications
                  </h2>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-white/90 text-sm">
                  Toutes les modifications effectuées sur les textes
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    onClick={loadHistory}
                    disabled={loading}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </Button>
                </div>
              </div>

              {/* Contenu */}
              <ScrollArea className="flex-1 p-6">
                {loading && history.length === 0 ? (
                  <div className="text-center py-12">
                    <RefreshCw className="w-12 h-12 text-slate-400 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Chargement de l'historique...</p>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium mb-2">Aucune modification</p>
                    <p className="text-sm text-slate-500">
                      Les modifications apportées aux textes apparaîtront ici
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedHistory).map(([dateKey, entries]) => (
                      <div key={dateKey}>
                        {/* Séparateur de date */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-px flex-1 bg-slate-200" />
                          <span className="text-sm font-medium text-slate-600">
                            {dateKey}
                          </span>
                          <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        {/* Entrées du jour */}
                        <div className="space-y-3">
                          {entries.map((entry) => (
                            <motion.div
                              key={entry.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors"
                            >
                              {/* Header de l'entrée */}
                              <button
                                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                                className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge className={categoryBadgeColors[category]}>
                                        {entry.text_id}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {entry.language_code.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                      <Clock className="w-3 h-3" />
                                      <span>{formatDate(entry.timestamp)}</span>
                                      <span>•</span>
                                      <User className="w-3 h-3" />
                                      <span>{entry.user}</span>
                                    </div>
                                  </div>
                                  {expandedId === entry.id ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                                  )}
                                </div>
                              </button>

                              {/* Détails expandables */}
                              <AnimatePresence>
                                {expandedId === entry.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-4 border-t border-slate-200 bg-white space-y-3">
                                      {/* Ancien contenu */}
                                      <div>
                                        <label className="text-xs font-medium text-slate-500 mb-1 block">
                                          Ancien contenu
                                        </label>
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-slate-700 line-through">
                                          {entry.old_content}
                                        </div>
                                      </div>

                                      {/* Nouveau contenu */}
                                      <div>
                                        <label className="text-xs font-medium text-slate-500 mb-1 block">
                                          Nouveau contenu
                                        </label>
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-slate-700">
                                          {entry.new_content}
                                        </div>
                                      </div>

                                      {/* Actions */}
                                      {onRestore && (
                                        <div className="pt-2">
                                          <Button
                                            onClick={() => {
                                              onRestore(entry);
                                              setIsOpen(false);
                                            }}
                                            size="sm"
                                            className={`bg-gradient-to-r ${categoryColors[category]} text-white w-full`}
                                          >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Restaurer cette version
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Footer avec stats */}
              {history.length > 0 && (
                <div className="border-t border-slate-200 p-4 bg-slate-50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">
                      {history.length} modification{history.length > 1 ? 's' : ''} enregistrée{history.length > 1 ? 's' : ''}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Derniers 50 changements
                    </Badge>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
