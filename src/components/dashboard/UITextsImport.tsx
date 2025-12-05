import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, CheckCircle, AlertCircle, Languages, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { convertToSectionsFormat, convertToNavigationFormat } from '../../lib/ui-texts-all-languages';

interface UITextsImportProps {
  onImportSuccess?: () => void;
}

export function UITextsImport({ onImportSuccess }: UITextsImportProps) {
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Fonction générique pour importer des traductions
  const importTranslations = async (
    data: { translations: any[] },
    description: string
  ) => {
    setImporting(true);
    setStatus('idle');

    try {
      console.log(`📦 ${description}...`);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/ui-texts/bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erreur lors de l\'import');
      }

      setStatus('success');
      setMessage(`✅ ${result.count} traduction(s) importée(s) dans 24 langues !`);

      if (onImportSuccess) {
        setTimeout(() => onImportSuccess(), 500);
      }
    } catch (error: any) {
      console.error('❌ Import error:', error);
      setStatus('error');
      setMessage(error.message || 'Erreur lors de l\'import');
    } finally {
      setImporting(false);
    }
  };

  const handleImportSections = () => {
    importTranslations(
      { translations: convertToSectionsFormat() },
      'Importing 6 section titles'
    );
  };

  const handleImportNavigation = () => {
    importTranslations(
      { translations: convertToNavigationFormat() },
      'Importing 7 navigation texts'
    );
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-600" />
            Import rapide UI
          </CardTitle>
          <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 shadow-lg">
            <Languages className="w-3 h-3 mr-1" />
            24 langues
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5">
        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
          <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700 space-y-1">
            <p className="font-medium text-slate-900">
              Import automatique dans les 24 langues européennes
            </p>
            <p className="text-xs text-slate-600">
              Cliquez sur un bouton ci-dessous pour importer instantanément les traductions pré-configurées.
            </p>
          </div>
        </div>

        {/* Quick Import Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleImportSections}
            disabled={importing}
            size="lg"
            className="h-auto py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                {importing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Upload className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span className="font-semibold">6 Sections</span>
              </div>
              <span className="text-xs text-white/80">
                Profil • Détachement • Besoins • etc.
              </span>
            </div>
          </Button>

          <Button
            onClick={handleImportNavigation}
            disabled={importing}
            size="lg"
            className="h-auto py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                {importing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Upload className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span className="font-semibold">7 Navigation</span>
              </div>
              <span className="text-xs text-white/80">
                Boutons • Helpers • Liens
              </span>
            </div>
          </Button>
        </div>

        {/* Languages Grid */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-slate-200">
          <p className="text-xs font-medium text-slate-600 mb-3">Langues supportées :</p>
          <div className="flex flex-wrap gap-2">
            {[
              { code: 'FR', flag: '🇫🇷' },
              { code: 'EN', flag: '🇬🇧' },
              { code: 'DE', flag: '🇩🇪' },
              { code: 'ES', flag: '🇪🇸' },
              { code: 'IT', flag: '🇮🇹' },
              { code: 'NL', flag: '🇳🇱' },
              { code: 'PT', flag: '🇵🇹' },
              { code: 'PL', flag: '🇵🇱' },
              { code: 'CS', flag: '🇨🇿' },
              { code: 'SK', flag: '🇸🇰' },
              { code: 'HU', flag: '🇭🇺' },
              { code: 'RO', flag: '🇷🇴' },
              { code: 'BG', flag: '🇧🇬' },
              { code: 'HR', flag: '🇭🇷' },
              { code: 'SL', flag: '🇸🇮' },
              { code: 'ET', flag: '🇪🇪' },
              { code: 'LV', flag: '🇱🇻' },
              { code: 'LT', flag: '🇱🇹' },
              { code: 'EL', flag: '🇬🇷' },
              { code: 'SV', flag: '🇸🇪' },
              { code: 'DA', flag: '🇩🇰' },
              { code: 'FI', flag: '🇫🇮' },
              { code: 'NO', flag: '🇳🇴' },
            ].map((lang) => (
              <Badge
                key={lang.code}
                variant="outline"
                className="text-xs bg-white border-slate-300 text-slate-700"
              >
                {lang.flag} {lang.code}
              </Badge>
            ))}
          </div>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Erreur :</strong> {message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
