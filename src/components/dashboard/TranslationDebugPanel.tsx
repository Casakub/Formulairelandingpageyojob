import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Database, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Eye,
  EyeOff,
  Code
} from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

export function TranslationDebugPanel() {
  const [showDetails, setShowDetails] = useState(false);
  const {
    questionTranslations,
    uiTextTranslations,
    countryLanguageMappings,
    stats,
    loading,
    saving,
    error,
    hasUnsavedChanges,
    lastSyncTime,
    loadAll,
    saveAll,
  } = useTranslationContext();

  const formatDate = (date: Date | null) => {
    if (!date) return 'Jamais';
    return date.toLocaleString('fr-FR');
  };

  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              Debug Panel - État Supabase
            </CardTitle>
            <CardDescription className="mt-2">
              Informations de synchronisation en temps réel
            </CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
            className="gap-2"
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showDetails ? 'Masquer' : 'Détails'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Loading */}
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              {loading ? (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              <span className="text-xs text-slate-600">Chargement</span>
            </div>
            <p className="text-sm font-medium text-slate-900">
              {loading ? 'En cours...' : 'Terminé'}
            </p>
          </div>

          {/* Saving */}
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              {saving ? (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              <span className="text-xs text-slate-600">Sauvegarde</span>
            </div>
            <p className="text-sm font-medium text-slate-900">
              {saving ? 'En cours...' : 'Terminé'}
            </p>
          </div>

          {/* Unsaved Changes */}
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              {hasUnsavedChanges ? (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              <span className="text-xs text-slate-600">Modifications</span>
            </div>
            <p className="text-sm font-medium text-slate-900">
              {hasUnsavedChanges ? 'Non sauvegardées' : 'Synchronisé'}
            </p>
          </div>

          {/* Last Sync */}
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-600">Dernière sync</span>
            </div>
            <p className="text-xs font-medium text-slate-900 truncate">
              {formatDate(lastSyncTime)}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Erreur de synchronisation</p>
                <p className="text-xs text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="text-xs text-blue-600 mb-2">Questions</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total</span>
                  <span className="font-medium">{stats.questions.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Validées</span>
                  <span className="font-medium text-green-600">{stats.questions.validated}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                      style={{ width: `${stats.questions.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{stats.questions.progress}% complété</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-green-200">
              <h4 className="text-xs text-green-600 mb-2">Textes UI</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total</span>
                  <span className="font-medium">{stats.ui.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Validés</span>
                  <span className="font-medium text-green-600">{stats.ui.validated}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${stats.ui.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{stats.ui.progress}% complété</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-cyan-200">
              <h4 className="text-xs text-cyan-600 mb-2">Pays configurés</h4>
              <div className="flex items-center justify-center h-full">
                <p className="text-3xl font-bold text-cyan-600">{stats.countries}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadAll}
            disabled={loading}
            className="flex-1 gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Recharger depuis Supabase
          </Button>
          <Button
            size="sm"
            onClick={saveAll}
            disabled={!hasUnsavedChanges || saving}
            className="flex-1 gap-2 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
          >
            <Database className="w-4 h-4" />
            Sauvegarder dans Supabase
          </Button>
        </div>

        {/* Detailed View */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-4 border-t border-violet-200"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-violet-600" />
                <h4 className="text-sm font-medium text-slate-900">Données chargées</h4>
              </div>

              <ScrollArea className="h-64 w-full">
                <div className="space-y-2 pr-4">
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-700">Question Translations</span>
                      <Badge variant="outline">{questionTranslations.length} items</Badge>
                    </div>
                    <pre className="text-xs text-slate-600 overflow-x-auto">
                      {JSON.stringify(questionTranslations.slice(0, 2), null, 2)}
                      {questionTranslations.length > 2 && '\n...' }
                    </pre>
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-700">UI Text Translations</span>
                      <Badge variant="outline">{uiTextTranslations.length} items</Badge>
                    </div>
                    <pre className="text-xs text-slate-600 overflow-x-auto">
                      {JSON.stringify(uiTextTranslations.slice(0, 2), null, 2)}
                      {uiTextTranslations.length > 2 && '\n...'}
                    </pre>
                  </div>

                  <div className="p-3 bg-white rounded border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-700">Country Mappings</span>
                      <Badge variant="outline">{countryLanguageMappings.length} items</Badge>
                    </div>
                    <pre className="text-xs text-slate-600 overflow-x-auto">
                      {JSON.stringify(countryLanguageMappings.slice(0, 3), null, 2)}
                      {countryLanguageMappings.length > 3 && '\n...'}
                    </pre>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
