import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Upload, FileJson, CheckCircle, AlertCircle, Loader2, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner@2.0.3';
import { 
  fetchQuestionTranslations, 
  fetchUITextTranslations, 
  fetchCountryLanguageMappings,
  bulkSaveQuestionTranslations,
  bulkSaveUITextTranslations,
  bulkSaveCountryLanguageMappings
} from '../../lib/i18n-api';
import { FULL_SEED_DATA } from '../../lib/i18n-seed-data';

export function TranslationExport() {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [loadingSeed, setLoadingSeed] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    
    try {
      // Fetch all translations
      const [questions, uiTexts, countries] = await Promise.all([
        fetchQuestionTranslations(),
        fetchUITextTranslations(),
        fetchCountryLanguageMappings()
      ]);

      // Create export object
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        data: {
          questions,
          uiTexts,
          countries
        },
        stats: {
          questionsCount: questions.length,
          uiTextsCount: uiTexts.length,
          countriesCount: countries.length
        }
      };

      // Create JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `yojob-i18n-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Export réussi', {
        description: `${exportData.stats.questionsCount + exportData.stats.uiTextsCount} traductions exportées`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur d\'export', {
        description: 'Impossible d\'exporter les traductions'
      });
    } finally {
      setExporting(false);
    }
  };

  const handleLoadSeedData = async () => {
    setLoadingSeed(true);

    try {
      const promises = [];

      if (FULL_SEED_DATA.data.questions.length > 0) {
        promises.push(bulkSaveQuestionTranslations(FULL_SEED_DATA.data.questions));
      }

      if (FULL_SEED_DATA.data.uiTexts.length > 0) {
        promises.push(bulkSaveUITextTranslations(FULL_SEED_DATA.data.uiTexts));
      }

      if (FULL_SEED_DATA.data.countries.length > 0) {
        promises.push(bulkSaveCountryLanguageMappings(FULL_SEED_DATA.data.countries));
      }

      const results = await Promise.all(promises);
      const allSuccess = results.every(r => r === true);

      if (allSuccess) {
        toast.success('Données de test chargées', {
          description: `${FULL_SEED_DATA.stats.questionsCount + FULL_SEED_DATA.stats.uiTextsCount} traductions importées`
        });
        
        // Reload page to refresh data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warning('Chargement partiel', {
          description: 'Certaines données n\'ont pas pu être chargées'
        });
      }
    } catch (error) {
      console.error('Seed data loading error:', error);
      toast.error('Erreur de chargement', {
        description: 'Impossible de charger les données de test'
      });
    } finally {
      setLoadingSeed(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);

    try {
      const text = await file.text();
      const importData = JSON.parse(text);

      // Validate import data structure
      if (!importData.data || !importData.version) {
        throw new Error('Format de fichier invalide');
      }

      // Import translations
      const promises = [];

      if (importData.data.questions?.length > 0) {
        promises.push(bulkSaveQuestionTranslations(importData.data.questions));
      }

      if (importData.data.uiTexts?.length > 0) {
        promises.push(bulkSaveUITextTranslations(importData.data.uiTexts));
      }

      if (importData.data.countries?.length > 0) {
        promises.push(bulkSaveCountryLanguageMappings(importData.data.countries));
      }

      const results = await Promise.all(promises);
      const allSuccess = results.every(r => r === true);

      if (allSuccess) {
        toast.success('Import réussi', {
          description: `${importData.stats?.questionsCount || 0 + importData.stats?.uiTextsCount || 0} traductions importées`
        });
        
        // Reload page to refresh data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warning('Import partiel', {
          description: 'Certaines traductions n\'ont pas pu être importées'
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Erreur d\'import', {
        description: error instanceof Error ? error.message : 'Fichier invalide'
      });
    } finally {
      setImporting(false);
      event.target.value = ''; // Reset input
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <FileJson className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900">Import/Export</CardTitle>
              <CardDescription>Gérer les traductions en masse</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50/50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 text-sm">
              Exportez vos traductions pour backup ou importez un fichier existant pour restauration/migration.
            </AlertDescription>
          </Alert>

          {/* Quick Load Seed Data */}
          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-slate-900">Données de test</h4>
                    <p className="text-xs text-slate-600">
                      Charger {FULL_SEED_DATA.stats.questionsCount + FULL_SEED_DATA.stats.uiTextsCount} traductions d'exemple
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLoadSeedData}
                  disabled={loadingSeed}
                  size="sm"
                  className="bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                >
                  {loadingSeed ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Charger
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Export */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Exporter</h3>
                      <p className="text-sm text-slate-600">Format JSON complet</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleExport}
                    disabled={exporting}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  >
                    {exporting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Export en cours...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Exporter tout
                      </>
                    )}
                  </Button>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      Questions du formulaire
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      Textes d'interface
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      Mappings pays-langues
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Import */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Importer</h3>
                      <p className="text-sm text-slate-600">Restaurer depuis JSON</p>
                    </div>
                  </div>
                  
                  <label htmlFor="import-file">
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      disabled={importing}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => document.getElementById('import-file')?.click()}
                      disabled={importing}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    >
                      {importing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Import en cours...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Choisir un fichier
                        </>
                      )}
                    </Button>
                  </label>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-blue-600" />
                      Fichier JSON uniquement
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-blue-600" />
                      Écrase les traductions existantes
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-3 h-3 text-blue-600" />
                      Page rechargée après import
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
