import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Upload, FileJson, CheckCircle, AlertCircle, Loader2, Zap, RefreshCw } from 'lucide-react';
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
import { useQuestions } from '../../context/QuestionsContext';

export function TranslationExport() {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [loadingSeed, setLoadingSeed] = useState(false);
  const [syncingQuestions, setSyncingQuestions] = useState(false);
  const [syncingUITexts, setSyncingUITexts] = useState(false);
  const { questions } = useQuestions();

  const handleExport = async () => {
    setExporting(true);
    
    try {
      // Fetch all translations
      const [questions, uiTexts, countries] = await Promise.all([
        fetchQuestionTranslations(),
        fetchUITextTranslations(),
        fetchCountryLanguageMappings()
      ]);

      // Check if data is empty
      const totalItems = questions.length + uiTexts.length;
      if (totalItems === 0) {
        toast.warning('Aucune donnée à exporter', {
          description: 'Chargez d\'abord les données de test ou ajoutez des traductions manuellement'
        });
        setExporting(false);
        return;
      }

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

      // Import translations with detailed error handling
      const promises = [];
      const types: string[] = [];

      if (importData.data.questions?.length > 0) {
        promises.push(bulkSaveQuestionTranslations(importData.data.questions));
        types.push('questions');
      }

      if (importData.data.uiTexts?.length > 0) {
        promises.push(bulkSaveUITextTranslations(importData.data.uiTexts));
        types.push('uiTexts');
      }

      if (importData.data.countries?.length > 0) {
        promises.push(bulkSaveCountryLanguageMappings(importData.data.countries));
        types.push('countries');
      }

      const results = await Promise.allSettled(promises);
      
      const successCount = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
      const failedTypes = results
        .map((r, i) => r.status === 'rejected' ? types[i] : null)
        .filter(Boolean);

      if (successCount === results.length) {
        toast.success('✅ Import réussi', {
          description: `${importData.stats?.questionsCount || 0 + importData.stats?.uiTextsCount || 0} traductions importées`
        });
        
        // Reload page to refresh data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (successCount > 0) {
        toast.warning('⚠️ Import partiel', {
          description: `${successCount}/${results.length} imports réussis. Échec: ${failedTypes.join(', ')}`
        });
      } else {
        // Show detailed error from first failure
        const firstError = results.find(r => r.status === 'rejected') as PromiseRejectedResult;
        toast.error('❌ Erreur d\'import', {
          description: firstError?.reason?.message || 'Toutes les importations ont échoué'
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('❌ Erreur d\'import', {
        description: error instanceof Error ? error.message : 'Fichier invalide'
      });
    } finally {
      setImporting(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleSyncFromQuestions = async () => {
    setSyncingQuestions(true);

    try {
      // Liste complète des langues européennes (27 pays)
      const allLanguages = [
        'fr', 'en', 'de', 'es', 'it', 'nl', 'pl', 'pt', // 8 principales
        'el', 'sv', 'da', 'fi', 'cs', 'hu', 'ro', 'bg', // Europe centrale/nord
        'sk', 'sl', 'hr', 'lt', 'lv', 'et'              // Europe de l'Est
      ];

      // Generate translation structure from current questions
      const questionTranslations = questions.map(q => {
        // Create translations object with all languages
        const translations: any = {};
        
        // French with pre-filled data
        translations.fr = {
          label: q.label,
          placeholder: q.placeholder || '',
          options: q.options || []
        };
        
        // All other languages with empty fields
        allLanguages.filter(lang => lang !== 'fr').forEach(lang => {
          translations[lang] = {
            label: '',
            placeholder: '',
            options: q.options?.map(() => '') || []
          };
        });

        return {
          questionId: q.id,
          translations
        };
      });

      // Create export object
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        data: {
          questions: questionTranslations,
          uiTexts: [],
          countries: [
            { countryCode: 'FR', languages: ['fr', 'en'] }
          ]
        },
        stats: {
          questionsCount: questionTranslations.length,
          uiTextsCount: 0,
          countriesCount: 1,
          totalLanguages: allLanguages.length
        }
      };

      // Create JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `yojob-questions-to-translate-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('JSON généré avec succès', {
        description: `${questions.length} questions × ${allLanguages.length} langues = ${questions.length * allLanguages.length} traductions à remplir`
      });
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Erreur de génération', {
        description: 'Impossible de générer le JSON depuis les questions'
      });
    } finally {
      setSyncingQuestions(false);
    }
  };

  const handleSyncFromUITexts = async () => {
    setSyncingUITexts(true);

    try {
      // Liste complète des langues européennes (27 pays)
      const allLanguages = [
        'fr', 'en', 'de', 'es', 'it', 'nl', 'pl', 'pt', // 8 principales
        'el', 'sv', 'da', 'fi', 'cs', 'hu', 'ro', 'bg', // Europe centrale/nord
        'sk', 'sl', 'hr', 'lt', 'lv', 'et'              // Europe de l'Est
      ];

      // Liste standard des textes d'interface en français
      const standardUITexts = [
        // Boutons
        { textId: 'button.next', key: 'button.next', category: 'buttons', text: 'Suivant' },
        { textId: 'button.previous', key: 'button.previous', category: 'buttons', text: 'Précédent' },
        { textId: 'button.submit', key: 'button.submit', category: 'buttons', text: 'Envoyer mes réponses' },
        { textId: 'button.save', key: 'button.save', category: 'buttons', text: 'Enregistrer' },
        { textId: 'button.cancel', key: 'button.cancel', category: 'buttons', text: 'Annuler' },
        { textId: 'button.close', key: 'button.close', category: 'buttons', text: 'Fermer' },
        { textId: 'button.confirm', key: 'button.confirm', category: 'buttons', text: 'Confirmer' },
        
        // Labels de formulaire
        { textId: 'label.required', key: 'label.required', category: 'form', text: 'Obligatoire' },
        { textId: 'label.optional', key: 'label.optional', category: 'form', text: 'Optionnel' },
        { textId: 'label.email', key: 'label.email', category: 'form', text: 'Email' },
        { textId: 'label.phone', key: 'label.phone', category: 'form', text: 'Téléphone' },
        { textId: 'label.company', key: 'label.company', category: 'form', text: 'Entreprise' },
        { textId: 'label.name', key: 'label.name', category: 'form', text: 'Nom' },
        
        // Navigation
        { textId: 'nav.section1', key: 'nav.section1', category: 'navigation', text: 'Profil de votre agence' },
        { textId: 'nav.section2', key: 'nav.section2', category: 'navigation', text: 'Détachement européen' },
        { textId: 'nav.section3', key: 'nav.section3', category: 'navigation', text: 'Vos besoins' },
        { textId: 'nav.section4', key: 'nav.section4', category: 'navigation', text: 'Votre intérêt pour YoJob' },
        { textId: 'nav.section5', key: 'nav.section5', category: 'navigation', text: 'Vision du futur' },
        { textId: 'nav.section6', key: 'nav.section6', category: 'navigation', text: 'Restons en contact' },
        
        // Descriptions
        { textId: 'section1.description', key: 'section1.description', category: 'descriptions', text: '4 questions • 2 min' },
        { textId: 'section2.description', key: 'section2.description', category: 'descriptions', text: '7 questions • 3 min' },
        { textId: 'section3.description', key: 'section3.description', category: 'descriptions', text: '5 questions • 2 min' },
        { textId: 'section4.description', key: 'section4.description', category: 'descriptions', text: '3 questions • 2 min' },
        { textId: 'section5.description', key: 'section5.description', category: 'descriptions', text: '3 questions • 2 min' },
        { textId: 'section6.description', key: 'section6.description', category: 'descriptions', text: '3 questions • 1 min' },
        
        // Messages
        { textId: 'message.success', key: 'message.success', category: 'messages', text: 'Merci pour votre participation !' },
        { textId: 'message.error', key: 'message.error', category: 'messages', text: 'Une erreur est survenue' },
        { textId: 'message.loading', key: 'message.loading', category: 'messages', text: 'Chargement en cours...' },
        { textId: 'message.saving', key: 'message.saving', category: 'messages', text: 'Enregistrement en cours...' },
        
        // Validation
        { textId: 'validation.required', key: 'validation.required', category: 'validation', text: 'Ce champ est obligatoire' },
        { textId: 'validation.email', key: 'validation.email', category: 'validation', text: 'Email invalide' },
        { textId: 'validation.phone', key: 'validation.phone', category: 'validation', text: 'Numéro de téléphone invalide' },
        { textId: 'validation.minLength', key: 'validation.minLength', category: 'validation', text: 'Trop court' },
        { textId: 'validation.maxLength', key: 'validation.maxLength', category: 'validation', text: 'Trop long' },
        
        // En-têtes
        { textId: 'header.title', key: 'header.title', category: 'headers', text: 'Étude de marché européen' },
        { textId: 'header.subtitle', key: 'header.subtitle', category: 'headers', text: 'Agences de travail temporaire' },
        
        // Footer
        { textId: 'footer.confidentiality', key: 'footer.confidentiality', category: 'footer', text: 'Vos données sont confidentielles et utilisées uniquement à des fins d\'étude' },
        { textId: 'footer.duration', key: 'footer.duration', category: 'footer', text: 'Temps estimé : 15 minutes' },
        { textId: 'footer.contact', key: 'footer.contact', category: 'footer', text: 'Questions ? Contactez-nous' }
      ];

      // Generate translation structure from standard UI texts
      const uiTextTranslations = standardUITexts.map(t => {
        const translations: any = {};
        
        // French with pre-filled data
        translations.fr = {
          text: t.text,
          status: 'validated'
        };
        
        // All other languages with empty fields
        allLanguages.filter(lang => lang !== 'fr').forEach(lang => {
          translations[lang] = {
            text: '',
            status: 'pending'
          };
        });

        return {
          textId: t.textId,
          key: t.key,
          category: t.category,
          translations
        };
      });

      // Create export object
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        data: {
          questions: [],
          uiTexts: uiTextTranslations,
          countries: [
            { countryCode: 'FR', languages: ['fr', 'en'] }
          ]
        },
        stats: {
          questionsCount: 0,
          uiTextsCount: uiTextTranslations.length,
          countriesCount: 1,
          totalLanguages: allLanguages.length
        }
      };

      // Create JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `yojob-ui-texts-to-translate-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('JSON généré avec succès', {
        description: `${standardUITexts.length} textes d'interface × ${allLanguages.length} langues = ${standardUITexts.length * allLanguages.length} traductions à remplir`
      });
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Erreur de génération', {
        description: 'Impossible de générer le JSON depuis les textes d\'interface'
      });
    } finally {
      setSyncingUITexts(false);
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

          {/* Sync from Questions and UI Texts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sync from Questions */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                      <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900">Questions du formulaire</h3>
                      <p className="text-sm text-slate-600">{questions.length} questions à traduire</p>
                    </div>
                  </div>
                  
                  <Alert className="border-orange-200 bg-orange-50/50">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800 text-xs">
                      JSON avec toutes vos questions en français, prêt à être traduit.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleSyncFromQuestions}
                    disabled={syncingQuestions}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  >
                    {syncingQuestions ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Générer JSON Questions
                      </>
                    )}
                  </Button>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-orange-600" />
                      Français pré-rempli
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-orange-600" />
                      22 langues européennes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sync from UI Texts */}
            <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900">Interface utilisateur</h3>
                      <p className="text-sm text-slate-600">Boutons, labels, messages</p>
                    </div>
                  </div>
                  
                  <Alert className="border-violet-200 bg-violet-50/50">
                    <AlertCircle className="h-4 w-4 text-violet-600" />
                    <AlertDescription className="text-violet-800 text-xs">
                      JSON avec tous vos textes d'interface en français, prêt à être traduit.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleSyncFromUITexts}
                    disabled={syncingUITexts}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                  >
                    {syncingUITexts ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Générer JSON Interface
                      </>
                    )}
                  </Button>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-violet-600" />
                      Français pré-rempli
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-violet-600" />
                      22 langues européennes
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