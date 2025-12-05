/**
 * Composant pour uploader les traductions de la barre de progression et sections
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Upload, Check, AlertCircle, Loader2, BarChart3 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { bulkSaveUITextTranslations } from '../../lib/i18n-api';
import { PROGRESS_TRANSLATIONS } from '../../data/progress-translations';

export function UploadProgressTranslations() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const totalTranslations = PROGRESS_TRANSLATIONS.length * 23; // 8 textes × 23 langues = 184

  const handleUpload = async () => {
    setStatus('uploading');
    setProgress(0);
    setError(null);

    try {
      console.log('🚀 Upload des traductions de progression...');
      console.log(`📊 ${PROGRESS_TRANSLATIONS.length} textes × 23 langues = ${totalTranslations} traductions`);
      
      setProgress(20);

      // Upload via API
      const result = await bulkSaveUITextTranslations(PROGRESS_TRANSLATIONS);

      setProgress(90);

      if (result) {
        setProgress(100);
        setStatus('success');
        toast.success('✅ Traductions de progression uploadées !', {
          description: `${totalTranslations} traductions dans 23 langues`
        });
        console.log('✅ Upload progression terminé !');
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
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <BarChart3 className="w-6 h-6 text-green-600" />
          Progression & Sections
        </CardTitle>
        <CardDescription>
          {totalTranslations} traductions pour barre de progression • 23 langues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/60 rounded-lg p-3 border border-green-200">
            <div className="text-2xl font-bold text-green-600">23</div>
            <div className="text-xs text-slate-600">Langues</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600">{PROGRESS_TRANSLATIONS.length}</div>
            <div className="text-xs text-slate-600">Textes</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border border-teal-200">
            <div className="text-2xl font-bold text-teal-600">{totalTranslations}</div>
            <div className="text-xs text-slate-600">Traductions</div>
          </div>
        </div>

        {/* Progress */}
        {status === 'uploading' && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-green-600">{progress}%</p>
          </div>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Upload réussi !</p>
              <p className="text-sm text-green-700">{totalTranslations} traductions dans Supabase</p>
              <p className="text-xs text-green-600 mt-1">✨ Les badges de sections sont traduits !</p>
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
          className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          {status === 'uploading' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Upload en cours... {progress}%
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Progression uploadée !
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Uploader ({totalTranslations} traductions)
            </>
          )}
        </Button>

        {/* Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-900">
          <p className="font-medium mb-1">📋 Textes inclus :</p>
          <ul className="list-disc list-inside space-y-0.5 text-green-800">
            <li>"Section" et "Question" (barre de progression)</li>
            <li>Section 1 : Profil Agence</li>
            <li>Section 2 : Détachement</li>
            <li>Section 3 : Besoins</li>
            <li>Section 4 : Intérêt YoJob</li>
            <li>Section 5 : Vision Future</li>
            <li>Section 6 : Contact</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
