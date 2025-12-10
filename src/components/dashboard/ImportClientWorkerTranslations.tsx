import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, Loader2, CheckCircle, AlertCircle, FileJson } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// Import directement les traductions complètes (27 langues, CLIENT & WORKER)
import { fullClientWorkerTranslations } from '../../data/translations-client-worker-full';
// Import les traductions essentielles (5 langues principales)
import { essentialTranslations } from '../../data/translations-client-worker-essentials';

interface ImportStats {
  imported: number;
  skipped: number;
  errors: string[];
}

export function ImportClientWorkerTranslations() {
  const [isImporting, setIsImporting] = useState(false);
  const [stats, setStats] = useState<ImportStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importType, setImportType] = useState<'essential' | 'full'>('full');

  const currentData = importType === 'essential' ? essentialTranslations : fullClientWorkerTranslations;

  const handleImport = async () => {
    setIsImporting(true);
    setError(null);
    setStats(null);

    try {
      console.log('🚀 Starting CLIENT & WORKER translations import...');
      console.log(`📊 ${currentData.translations.length} entries to process`);

      // Transformer les données au format attendu par l'API /questions/bulk
      const questionsToImport = currentData.translations.map(entry => {
        const { textId, translations } = entry;
        
        // Convertir les traductions au format QuestionFieldTranslation
        const formattedTranslations: any = {};
        for (const [langCode, text] of Object.entries(translations)) {
          formattedTranslations[langCode] = {
            label: text as string,
            status: 'validated'
          };
        }
        
        return {
          questionId: textId,
          translations: formattedTranslations
        };
      });

      console.log('📦 Prepared payload:', {
        count: questionsToImport.length,
        sample: questionsToImport[0]
      });

      // Envoyer en bulk via l'API
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/questions/bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            translations: questionsToImport
          })
        }
      );

      // Améliorer la gestion des erreurs de réponse
      let result;
      const responseText = await response.text();
      
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse response:', responseText);
        throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 100)}`);
      }

      if (response.ok) {
        console.log('✅ Import completed:', result);
        
        setStats({
          imported: result.count || questionsToImport.length,
          skipped: 0,
          errors: []
        });
      } else {
        console.error('❌ Import failed:', result);
        throw new Error(result.error || 'Import failed');
      }

    } catch (err: any) {
      console.error('❌ Import failed:', err);
      setError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="w-6 h-6 text-green-600" />
              Importer les traductions CLIENT & WORKER
            </CardTitle>
            <CardDescription>
              {importType === 'full' 
                ? 'Importer TOUTES les traductions professionnelles CLIENT & WORKER dans 23 langues européennes'
                : 'Importer 30 traductions essentielles CLIENT & WORKER en 5 langues (EN, DE, ES, IT, PL)'}
            </CardDescription>
          </div>
          <Badge className="bg-green-500/20 text-green-700 border-green-400/30">
            Qualité Pro
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Info - Validation requise */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
          <strong>ℹ️ Avant d&apos;importer :</strong> Vérifiez que toutes les traductions sont validées dans la carte ci-dessus. Les traductions doivent être complètes pour les 23 langues.
        </div>

        {/* Sélecteur de type d'import */}
        <div className="flex gap-2 p-2 bg-white rounded-lg border border-green-200">
          <button
            onClick={() => setImportType('full')}
            className={`flex-1 px-4 py-2 rounded-md transition-all ${
              importType === 'full'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="text-sm">🌍 Complet (23 langues)</div>
            <div className="text-xs opacity-80">{fullClientWorkerTranslations.translations.length} questions</div>
          </button>
          <button
            onClick={() => setImportType('essential')}
            className={`flex-1 px-4 py-2 rounded-md transition-all ${
              importType === 'essential'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="text-sm">⚡ Essentiel (5 langues)</div>
            <div className="text-xs opacity-80">{essentialTranslations.translations.length} questions</div>
          </button>
        </div>

        {/* Statistiques du fichier */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-white rounded-lg border border-green-200">
            <div className="text-2xl text-green-600">
              {importType === 'full' 
                ? fullClientWorkerTranslations.translations.length 
                : essentialTranslations.meta.totalKeys}
            </div>
            <div className="text-xs text-slate-600">Clés de traduction</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-200">
            <div className="text-2xl text-green-600">
              {importType === 'full' 
                ? fullClientWorkerTranslations.meta.languages.length 
                : essentialTranslations.meta.languages.length}
            </div>
            <div className="text-xs text-slate-600">Langues</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-green-200">
            <div className="text-2xl text-green-600">
              {importType === 'full'
                ? (fullClientWorkerTranslations.translations.length * fullClientWorkerTranslations.meta.languages.length)
                : (essentialTranslations.meta.totalKeys * essentialTranslations.meta.languages.length)}
            </div>
            <div className="text-xs text-slate-600">Traductions totales</div>
          </div>
        </div>

        {/* Langues couvertes */}
        <div className="p-3 bg-white rounded-lg border border-green-200">
          <div className="text-xs text-slate-600 mb-2">Langues couvertes :</div>
          <div className="flex flex-wrap gap-2">
            {(importType === 'full' 
              ? fullClientWorkerTranslations.meta.languages 
              : essentialTranslations.meta.languages
            ).map((lang: string) => (
              <Badge key={lang} variant="outline" className="border-green-300 text-green-700">
                {lang.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bouton d'import */}
        <Button
          onClick={handleImport}
          disabled={isImporting}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
        >
          {isImporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Import en cours...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Importer maintenant
            </>
          )}
        </Button>

        {/* Résultats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white rounded-lg border border-green-200"
          >
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span>Import terminé avec succès !</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Importées :</span>
                <span className="text-green-600">{stats.imported}</span>
              </div>
              {stats.errors.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Erreurs :</span>
                  <span className="text-red-600">{stats.errors.length}</span>
                </div>
              )}
            </div>
            {stats.errors.length > 0 && (
              <details className="mt-3 text-xs text-red-600">
                <summary className="cursor-pointer">Voir les erreurs</summary>
                <ul className="mt-2 space-y-1">
                  {stats.errors.slice(0, 10).map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              </details>
            )}
          </motion.div>
        )}

        {/* Erreur globale */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Info */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs text-blue-700">
          <strong>💡 Note :</strong> Ces traductions remplaceront automatiquement les traductions mock. 
          Elles sont marquées comme "manual" pour indiquer leur qualité professionnelle.
        </div>
      </CardContent>
    </Card>
  );
}