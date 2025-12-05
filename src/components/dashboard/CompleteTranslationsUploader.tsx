import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Upload, Check, X, Loader2, Languages, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { bulkSaveUITextTranslations, type UITextTranslationData } from '../../lib/i18n-api';

export function CompleteTranslationsUploader() {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    uiTexts: 'pending' | 'success' | 'error';
  }>({
    uiTexts: 'pending'
  });

  const handleUpload = async () => {
    setUploading(true);
    
    try {
      console.log('🚀 Importation du module de traductions...');
      
      // Import dynamique du script
      const module = await import('../../scripts/complete-translations-upload');
      
      console.log('📤 Début de l\'upload...');
      
      // Exécuter l'upload
      const success = await module.uploadAllTranslations();
      
      if (success) {
        setUploadStatus({ uiTexts: 'success' });
        toast.success('✅ Toutes les traductions ont été uploadées !', {
          description: `16 textes UI × 23 langues = 368 traductions`
        });
      } else {
        throw new Error('Upload failed');
      }
      
    } catch (error) {
      console.error('❌ Erreur upload:', error);
      setUploadStatus({ uiTexts: 'error' });
      toast.error('Erreur lors de l\'upload', {
        description: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-6 h-6 text-violet-600" />
          Upload complet des traductions
        </CardTitle>
        <CardDescription>
          Envoyer toutes les traductions UI dans Supabase (23 langues européennes)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-violet-100">
            <div className="text-2xl font-bold text-violet-600">23</div>
            <div className="text-sm text-slate-600">Langues</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-cyan-100">
            <div className="text-2xl font-bold text-cyan-600">16</div>
            <div className="text-sm text-slate-600">Textes UI</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <div className="text-2xl font-bold text-green-600">368</div>
            <div className="text-sm text-slate-600">Traductions</div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium">Textes UI</span>
            </div>
            {getStatusIcon(uploadStatus.uiTexts)}
          </div>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Upload en cours...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Uploader toutes les traductions
            </>
          )}
        </Button>

        {/* Warning */}
        <div className="text-xs text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ⚠️ Cette opération va créer/mettre à jour 368 traductions dans Supabase. 
          Assurez-vous que la base de données est prête.
        </div>
      </CardContent>
    </Card>
  );
}
