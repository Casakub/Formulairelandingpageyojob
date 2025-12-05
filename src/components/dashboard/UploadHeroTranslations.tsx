/**
 * Composant pour uploader les traductions du Hero Section
 * Charge depuis /public/form-page-texts-hero.json et upload vers Supabase
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Upload, Check, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { bulkSaveUITextTranslations } from '../../lib/i18n-api';
import { HERO_TRANSLATIONS } from '../../data/hero-translations';

export function UploadHeroTranslations() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const totalTranslations = HERO_TRANSLATIONS.length * 23; // 8 textes × 23 langues = 184

  const handleUpload = async () => {
    setStatus('uploading');
    setProgress(0);
    setError(null);

    try {
      console.log('🚀 Upload des traductions Hero Section...');
      console.log(`📊 ${HERO_TRANSLATIONS.length} textes UI × 23 langues = ${totalTranslations} traductions`);
      
      setProgress(20);

      // Upload via API
      const result = await bulkSaveUITextTranslations(HERO_TRANSLATIONS);

      setProgress(90);

      if (result) {
        setProgress(100);
        setStatus('success');
        toast.success('✅ Traductions Hero uploadées !', {
          description: `${totalTranslations} traductions dans 23 langues`
        });
        console.log('✅ Upload Hero terminé !');
      } else {
        throw new Error('L\'upload a échoué');
      }
    } catch (err) {
      console.error('❌ Erreur lors de l\'upload:', err);
      const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMsg);
      setStatus('error');
      toast.error('❌ Erreur lors de l\'upload', {
        description: errorMsg
      });
    }
  };

  return (
    <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="w-6 h-6 text-cyan-600" />
          Hero Section - Traductions Complètes
        </CardTitle>
        <CardDescription>
          {totalTranslations} traductions pour la page d'accueil • 23 langues européennes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/60 rounded-lg p-3 border border-cyan-200">
            <div className="text-2xl font-bold text-cyan-600">23</div>
            <div className="text-xs text-slate-600">Langues</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs text-slate-600">Textes Hero</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border border-green-200">
            <div className="text-2xl font-bold text-green-600">{totalTranslations}</div>
            <div className="text-xs text-slate-600">Traductions</div>
          </div>
        </div>

        {/* Progress */}
        {status === 'uploading' && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-cyan-600">{progress}%</p>
          </div>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Upload réussi !</p>
              <p className="text-sm text-green-700">{totalTranslations} traductions Hero dans Supabase</p>
              <p className="text-xs text-green-600 mt-1">✨ Changez de langue maintenant pour tester !</p>
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">Erreur</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Button */}
        <Button
          onClick={handleUpload}
          disabled={status === 'uploading' || status === 'success'}
          className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
        >
          {status === 'uploading' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Upload en cours... {progress}%
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Hero Section uploadée !
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Uploader le Hero ({totalTranslations} traductions)
            </>
          )}
        </Button>

        {/* Info */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 text-xs text-cyan-900">
          <p className="font-medium mb-1">📋 Textes Hero inclus :</p>
          <ul className="list-disc list-inside space-y-0.5 text-cyan-800">
            <li>Badge : "Étude de marché européen"</li>
            <li>Titre : "Participez à l'avenir..."</li>
            <li>Sous-titre : "Votre avis façonne YoJob..."</li>
            <li>Stats : 27 pays, 500+ agences, 8-10 min</li>
            <li>CTA : "Commencer l'enquête"</li>
            <li>Footer : "25 questions • Anonyme..."</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}