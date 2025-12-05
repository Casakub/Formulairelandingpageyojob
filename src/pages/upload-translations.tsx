/**
 * Page dédiée pour uploader toutes les traductions dans Supabase
 * Accessible via /upload-translations
 */

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Upload, Check, X, Loader2, Languages, FileText, Database, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from '../components/ui/sonner';
import { bulkSaveUITextTranslations, type UITextTranslationData } from '../lib/i18n-api';

// Import des traductions depuis le fichier JSON
import allTranslations from '../public/all-ui-translations-23-langs.json';

export default function UploadTranslationsPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stats = allTranslations.stats;
  const uiTexts = allTranslations.data.uiTexts as UITextTranslationData[];

  const handleUpload = async () => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      console.log('🚀 Début de l\'upload des traductions...');
      console.log(`📊 ${uiTexts.length} textes UI à uploader`);
      console.log(`🌍 ${stats.totalLanguages} langues`);
      console.log(`📝 ${stats.totalTranslations} traductions au total`);

      // Simulation du progress
      setProgress(10);

      // Upload des textes UI
      console.log('📤 Upload des textes UI...');
      const result = await bulkSaveUITextTranslations(uiTexts);

      setProgress(90);

      if (result) {
        setProgress(100);
        setUploadComplete(true);
        toast.success('✅ Upload terminé avec succès !', {
          description: `${stats.totalTranslations} traductions uploadées dans Supabase`
        });
        console.log('✅ Upload complet terminé !');
      } else {
        throw new Error('L\'upload a échoué');
      }

    } catch (err) {
      console.error('❌ Erreur lors de l\'upload:', err);
      const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMsg);
      toast.error('❌ Erreur lors de l\'upload', {
        description: errorMsg
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 p-8">
      <Toaster position="top-right" richColors />
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            🌍 Upload des Traductions YoJob
          </h1>
          <p className="text-cyan-100 text-lg">
            Système de traductions multilingues - 23 langues européennes
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-2xl">
              <Languages className="w-8 h-8 text-cyan-400" />
              Traductions UI Complètes
            </CardTitle>
            <CardDescription className="text-cyan-100">
              Prêt à uploader {stats.totalTranslations} traductions dans Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Statistics Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Languages className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-white/70">Langues</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.totalLanguages}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-violet-400" />
                  <span className="text-sm text-white/70">Textes UI</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.uiTextsCount}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-white/70">Total</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.totalTranslations}</div>
              </div>
            </div>

            {/* Progress Bar */}
            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-cyan-100 text-center">{progress}% complété</p>
              </div>
            )}

            {/* Success Message */}
            {uploadComplete && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3">
                <Check className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Upload terminé avec succès !</p>
                  <p className="text-green-300 text-sm">{stats.totalTranslations} traductions uploadées dans Supabase</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                <X className="w-6 h-6 text-red-400" />
                <div>
                  <p className="text-red-400 font-medium">Erreur lors de l'upload</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={uploading || uploadComplete}
              className="w-full h-14 text-lg bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-xl disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  Upload en cours... {progress}%
                </>
              ) : uploadComplete ? (
                <>
                  <Check className="w-6 h-6 mr-2" />
                  Upload terminé
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 mr-2" />
                  Lancer l'upload
                </>
              )}
            </Button>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-100">
                <p className="font-medium mb-1">Informations importantes :</p>
                <ul className="list-disc list-inside space-y-1 text-blue-200">
                  <li>Cette opération va créer/mettre à jour toutes les traductions UI</li>
                  <li>Les traductions existantes seront écrasées</li>
                  <li>L'opération prend environ 30 secondes</li>
                  <li>Assurez-vous que Supabase est configuré correctement</li>
                </ul>
              </div>
            </div>

            {/* Details Section */}
            <details className="bg-white/5 rounded-lg border border-white/10">
              <summary className="cursor-pointer p-4 text-white font-medium hover:bg-white/10 transition">
                📋 Détails des traductions
              </summary>
              <div className="p-4 pt-0 text-white/80 text-sm space-y-2">
                <p><strong>Langues supportées (23) :</strong></p>
                <div className="grid grid-cols-4 gap-2 text-xs bg-white/5 p-3 rounded">
                  <div>🇫🇷 Français</div>
                  <div>🇬🇧 Anglais</div>
                  <div>🇩🇪 Allemand</div>
                  <div>🇪🇸 Espagnol</div>
                  <div>🇮🇹 Italien</div>
                  <div>🇳🇱 Néerlandais</div>
                  <div>🇵🇱 Polonais</div>
                  <div>🇵🇹 Portugais</div>
                  <div>🇷🇴 Roumain</div>
                  <div>🇧🇬 Bulgare</div>
                  <div>🇭🇺 Hongrois</div>
                  <div>🇨🇿 Tchèque</div>
                  <div>🇸🇰 Slovaque</div>
                  <div>🇬🇷 Grec</div>
                  <div>🇸🇪 Suédois</div>
                  <div>🇩🇰 Danois</div>
                  <div>🇫🇮 Finnois</div>
                  <div>🇳🇴 Norvégien</div>
                  <div>🇭🇷 Croate</div>
                  <div>🇸🇮 Slovène</div>
                  <div>🇱🇹 Lituanien</div>
                  <div>🇱🇻 Letton</div>
                  <div>🇪🇪 Estonien</div>
                </div>
                <p className="mt-4"><strong>Catégories de textes :</strong></p>
                <ul className="list-disc list-inside text-xs bg-white/5 p-3 rounded space-y-1">
                  <li>Hero Section (badges, titres, CTA)</li>
                  <li>Navigation (sections, descriptions)</li>
                  <li>Boutons (actions utilisateur)</li>
                  <li>Headers & Progress</li>
                  <li>Helpers & Messages</li>
                </ul>
              </div>
            </details>

            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full border-white/30 text-white hover:bg-white/10"
            >
              ← Retour au dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-6 text-center text-white/60 text-sm">
          <p>📖 Voir le rapport complet : <code className="bg-white/10 px-2 py-1 rounded">/TRANSLATIONS_COMPLETE_REPORT.md</code></p>
        </div>
      </div>
    </div>
  );
}
