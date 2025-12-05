import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, AlertTriangle, Check, X, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { getHistoryByText, type HistoryEntry } from '../../lib/history-api';

interface RestorePreviousModalProps {
  isOpen: boolean;
  onClose: () => void;
  textId: string;
  languageCode: string;
  currentContent: string;
  category: 'hero' | 'progress' | 'ui';
  onRestore: (oldContent: string, historyEntry: HistoryEntry) => void;
}

export function RestorePreviousModal({
  isOpen,
  onClose,
  textId,
  languageCode,
  currentContent,
  category,
  onRestore
}: RestorePreviousModalProps) {
  const [loading, setLoading] = useState(true);
  const [previousEntry, setPreviousEntry] = useState<HistoryEntry | null>(null);

  // Charger la version précédente
  useEffect(() => {
    if (isOpen) {
      loadPreviousVersion();
    }
  }, [isOpen, textId, languageCode]);

  async function loadPreviousVersion() {
    setLoading(true);
    try {
      const history = await getHistoryByText(textId, languageCode);
      
      if (history.length > 0) {
        // Prendre la version la plus récente
        setPreviousEntry(history[0]);
      } else {
        setPreviousEntry(null);
      }
    } catch (error) {
      console.error('Erreur chargement version précédente:', error);
      toast.error('Erreur lors du chargement de la version précédente');
    } finally {
      setLoading(false);
    }
  }

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

  // Gérer la restauration
  function handleRestore() {
    if (previousEntry) {
      onRestore(previousEntry.old_content, previousEntry);
      onClose();
      toast.success('✅ Version précédente restaurée !');
    }
  }

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${categoryColors[category]} text-white p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Restaurer version précédente</h2>
                      <p className="text-white/90 text-sm mt-1">
                        {textId} • {languageCode.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-12">
                    <RotateCcw className="w-12 h-12 text-slate-400 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Chargement de l'historique...</p>
                  </div>
                ) : !previousEntry ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-slate-900 font-semibold mb-2">Aucune version précédente</p>
                    <p className="text-sm text-slate-600">
                      Ce texte n'a pas encore été modifié ou l'historique n'est pas disponible.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Info de la version */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Dernière modification</p>
                          <p className="text-xs text-slate-600">{formatDate(previousEntry.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Par</p>
                          <p className="text-xs text-slate-600">{previousEntry.user}</p>
                        </div>
                      </div>
                    </div>

                    {/* Aperçu de la restauration */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <h3 className="font-semibold text-slate-900">Aperçu de la restauration</h3>
                      </div>

                      {/* Version actuelle */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-700">
                            Version actuelle (sera perdue)
                          </label>
                          <Badge variant="outline" className="text-xs">Actuel</Badge>
                        </div>
                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                          <p className="text-slate-900 line-through">{currentContent}</p>
                        </div>
                      </div>

                      {/* Flèche de direction */}
                      <div className="flex items-center justify-center">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg`}>
                          <RotateCcw className="w-4 h-4" />
                          <span className="text-sm font-medium">Restaurer</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Version précédente */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-700">
                            Version précédente (sera restaurée)
                          </label>
                          <Badge className={categoryBadgeColors[category]}>
                            Version précédente
                          </Badge>
                        </div>
                        <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                          <p className="text-slate-900 font-medium">{previousEntry.old_content}</p>
                        </div>
                      </div>
                    </div>

                    {/* Avertissement */}
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-900">
                          <p className="font-medium mb-1">Attention :</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Cette action remplacera le contenu actuel</li>
                            <li>Le changement ne sera pas sauvegardé automatiquement</li>
                            <li>Vous devrez cliquer sur "Sauvegarder" pour confirmer définitivement</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {!loading && previousEntry && (
                <div className="border-t border-slate-200 p-6 bg-slate-50 flex items-center justify-end gap-3">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Annuler
                  </Button>
                  <Button
                    onClick={handleRestore}
                    className={`bg-gradient-to-r ${categoryColors[category]} text-white flex items-center gap-2 shadow-lg hover:shadow-xl`}
                  >
                    <Check className="w-4 h-4" />
                    Restaurer cette version
                  </Button>
                </div>
              )}

              {!loading && !previousEntry && (
                <div className="border-t border-slate-200 p-6 bg-slate-50 flex items-center justify-center">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Fermer
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
