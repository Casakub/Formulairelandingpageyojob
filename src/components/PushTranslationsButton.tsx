/**
 * 🚀 BOUTON: Push Translations to Supabase
 * 
 * Bouton admin pour pousser les traductions de /config/ vers Supabase
 * 
 * Version: 1.0.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, Database, Check, X, Loader2, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../src/i18n';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/push-translations`;

interface PushResult {
  success: boolean;
  stats?: {
    totalRecords: number;
    insertedCount: number;
    languages: number;
    batches: number;
    errors: number;
  };
  errors?: Array<any>;
  message?: string;
}

interface StatusResult {
  success: boolean;
  totalTranslations: number;
  languages: string[];
  stats: Record<string, { total: number; sections: Record<string, number> }>;
}

export function PushTranslationsButton() {
  const [isPushing, setIsPushing] = useState(false);
  const [result, setResult] = useState<PushResult | null>(null);
  const [status, setStatus] = useState<StatusResult | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  const handlePush = async (dryRun = false) => {
    setIsPushing(true);
    setResult(null);

    try {
      console.log('🚀 Pushing translations to Supabase...');

      const response = await fetch(`${API_BASE_URL}/push`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          translations: TRANSLATIONS,
          dryRun,
        }),
      });

      const data: PushResult = await response.json();
      setResult(data);

      if (data.success) {
        console.log('✅ Push successful!', data);
        // Refresh status after push
        if (!dryRun) {
          setTimeout(() => fetchStatus(), 1000);
        }
      } else {
        console.error('❌ Push failed:', data);
      }
    } catch (error: any) {
      console.error('❌ Network error:', error);
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setIsPushing(false);
    }
  };

  const fetchStatus = async () => {
    setIsLoadingStatus(true);

    try {
      const response = await fetch(`${API_BASE_URL}/status`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        console.warn('⚠️ Status endpoint returned non-OK status:', response.status);
        return;
      }

      // Vérifier le content-type avant de parser en JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('⚠️ Status endpoint did not return JSON:', contentType);
        return;
      }

      const data: StatusResult = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('❌ Error fetching status:', error);
    } finally {
      setIsLoadingStatus(false);
    }
  };

  // Auto-fetch status on mount
  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <Card className="border-cyan-400/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          Push Translations to Supabase
        </CardTitle>
        <CardDescription>
          Pousser les {SUPPORTED_LANGUAGES.length} langues depuis /config/ vers la base de données
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status */}
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-blue-200">Status actuel</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Traductions totales:</span>
                <span className="ml-2 font-bold text-white">{status.totalTranslations}</span>
              </div>
              <div>
                <span className="text-gray-400">Langues:</span>
                <span className="ml-2 font-bold text-white">{status.languages.length}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {status.languages.join(', ')}
            </div>
          </motion.div>
        )}

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-cyan-900/20 border border-cyan-400/30 rounded-lg text-sm">
          <Info className="w-4 h-4 text-cyan-400 mt-0.5" />
          <div className="text-gray-300">
            <p>
              Ce bouton lit les traductions depuis <code className="text-cyan-400">/config/translations-index.ts</code>
            </p>
            <p className="mt-1">
              et les insère dans <code className="text-cyan-400">translations_10092a63</code>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => handlePush(true)}
            disabled={isPushing}
            variant="outline"
            className="flex-1 border-cyan-400/30 hover:bg-cyan-400/10"
          >
            {isPushing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Preview...
              </>
            ) : (
              <>
                <Info className="w-4 h-4 mr-2" />
                Preview (Dry Run)
              </>
            )}
          </Button>

          <Button
            onClick={() => handlePush(false)}
            disabled={isPushing}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            {isPushing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Pushing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Push to Supabase
              </>
            )}
          </Button>
        </div>

        <Button
          onClick={fetchStatus}
          disabled={isLoadingStatus}
          variant="ghost"
          size="sm"
          className="w-full"
        >
          {isLoadingStatus ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Chargement...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Rafraîchir le statut
            </>
          )}
        </Button>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg border ${
              result.success
                ? 'bg-green-900/20 border-green-400/30'
                : 'bg-red-900/20 border-red-400/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {result.success ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <X className="w-5 h-5 text-red-400" />
              )}
              <span className={`font-semibold ${result.success ? 'text-green-200' : 'text-red-200'}`}>
                {result.success ? 'Succès !' : 'Erreur'}
              </span>
            </div>

            {result.stats && (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Records totaux:</span>
                  <span className="font-bold text-white">{result.stats.totalRecords}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Insérés:</span>
                  <span className="font-bold text-white">{result.stats.insertedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Langues:</span>
                  <span className="font-bold text-white">{result.stats.languages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Batches:</span>
                  <span className="font-bold text-white">{result.stats.batches}</span>
                </div>
                {result.stats.errors > 0 && (
                  <div className="flex justify-between text-red-400">
                    <span>Erreurs:</span>
                    <span className="font-bold">{result.stats.errors}</span>
                  </div>
                )}
              </div>
            )}

            {result.message && (
              <p className="mt-2 text-sm text-gray-300">{result.message}</p>
            )}

            {result.errors && result.errors.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-red-400">
                  Voir les erreurs ({result.errors.length})
                </summary>
                <pre className="mt-2 p-2 bg-black/20 rounded text-xs overflow-auto">
                  {JSON.stringify(result.errors, null, 2)}
                </pre>
              </details>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}