import { useState } from 'react';
import { Button } from './ui/button';
import { Upload, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { bulkSaveUITextTranslations, type UITextTranslationData } from '../lib/i18n-api';

export function QuickUploadButton() {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleQuickUpload = async () => {
    setUploading(true);

    try {
      // Import dynamique des traductions
      const response = await fetch('/all-ui-translations-23-langs.json');
      const data = await response.json();
      const uiTexts = data.data.uiTexts as UITextTranslationData[];

      console.log(`🚀 Upload rapide : ${uiTexts.length} textes UI...`);

      // Upload
      const result = await bulkSaveUITextTranslations(uiTexts);

      if (result) {
        setUploaded(true);
        toast.success('✅ Traductions uploadées !', {
          description: `${data.stats.totalTranslations} traductions dans Supabase`
        });
        
        // Reset après 3 secondes
        setTimeout(() => setUploaded(false), 3000);
      } else {
        throw new Error('Upload échoué');
      }
    } catch (error) {
      console.error('❌ Erreur upload:', error);
      toast.error('Erreur lors de l\'upload', {
        description: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    } finally {
      setUploading(false);
    }
  };

  if (uploaded) {
    return (
      <Button
        variant="outline"
        className="border-green-500 text-green-600 hover:bg-green-50"
        disabled
      >
        <Check className="w-4 h-4 mr-2" />
        Uploadé !
      </Button>
    );
  }

  return (
    <Button
      onClick={handleQuickUpload}
      disabled={uploading}
      variant="outline"
      className="border-violet-500 text-violet-600 hover:bg-violet-50"
    >
      {uploading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Upload...
        </>
      ) : (
        <>
          <Upload className="w-4 h-4 mr-2" />
          Upload traductions
        </>
      )}
    </Button>
  );
}
