import { motion, AnimatePresence } from 'motion/react';
import { Cloud, CloudOff, Loader2, Save, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../lib/utils';

interface TranslationSyncBarProps {
  hasUnsavedChanges: boolean;
  saving: boolean;
  lastSyncTime: Date | null;
  error: string | null;
  onSave: () => Promise<void>;
  onReload: () => Promise<void>;
}

export function TranslationSyncBar({
  hasUnsavedChanges,
  saving,
  lastSyncTime,
  error,
  onSave,
  onReload,
}: TranslationSyncBarProps) {
  const formatSyncTime = (date: Date | null) => {
    if (!date) return 'Jamais synchronisé';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (seconds < 60) return `Il y a ${seconds}s`;
    if (minutes < 60) return `Il y a ${minutes}min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'sticky top-0 z-30 border-b backdrop-blur-sm transition-colors duration-300',
        error
          ? 'bg-red-50/90 border-red-200'
          : hasUnsavedChanges
          ? 'bg-amber-50/90 border-amber-200'
          : 'bg-green-50/90 border-green-200'
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Status */}
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {saving ? (
                <motion.div
                  key="saving"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="flex items-center gap-2 text-blue-600"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sauvegarde en cours...</span>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 text-red-600"
                >
                  <CloudOff className="w-5 h-5" />
                  <span>Erreur : {error}</span>
                </motion.div>
              ) : hasUnsavedChanges ? (
                <motion.div
                  key="unsaved"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 text-amber-600"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Modifications non sauvegardées</span>
                </motion.div>
              ) : (
                <motion.div
                  key="synced"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 text-green-600"
                >
                  <Cloud className="w-5 h-5" />
                  <span>Synchronisé avec Supabase</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Last sync time */}
            <Badge variant="outline" className="text-xs">
              <Check className="w-3 h-3 mr-1" />
              {formatSyncTime(lastSyncTime)}
            </Badge>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onReload}
              disabled={saving}
              className="gap-2"
            >
              <RefreshCw className={cn('w-4 h-4', saving && 'animate-spin')} />
              <span className="hidden sm:inline">Recharger</span>
            </Button>

            <Button
              size="sm"
              onClick={onSave}
              disabled={!hasUnsavedChanges || saving}
              className={cn(
                'gap-2 transition-all',
                hasUnsavedChanges
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg animate-pulse'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              )}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Sauvegarde...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {hasUnsavedChanges ? 'Sauvegarder' : 'Sauvegardé'}
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error details */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-2 pt-2 border-t border-red-200"
            >
              <p className="text-sm text-red-600">
                💡 Conseil : Vérifiez votre connexion internet et réessayez.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
