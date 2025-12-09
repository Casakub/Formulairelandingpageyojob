import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Upload, FileJson, FileSpreadsheet, CheckCircle, AlertCircle, Loader2, FileType, Copy, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../../lib/clipboard';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { getTranslationsByCategory, updateTranslation, Translation } from '../../lib/i18n-api';

interface TranslationContent {
  text_id: string;
  category: 'hero' | 'progress' | 'ui';
  translations: {
    [lang: string]: string;
  };
}

interface CMSExportData {
  version: string;
  exportDate: string;
  source: string;
  data: {
    hero: TranslationContent[];
    progress: TranslationContent[];
    ui: TranslationContent[];
  };
  stats: {
    heroCount: number;
    progressCount: number;
    uiCount: number;
    totalTexts: number;
    totalLanguages: number;
    languages: string[];
  };
}

export function CMSExportSection() {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [cmsData, setCmsData] = useState<TranslationContent[]>([]);
  const [importPreview, setImportPreview] = useState<CMSExportData | null>(null);

  // Load CMS data from Supabase
  useEffect(() => {
    loadCMSData();
  }, []);

  const loadCMSData = async () => {
    setLoading(true);
    try {
      // Charger les 3 catégories en parallèle
      const [heroData, progressData, uiData] = await Promise.all([
        getTranslationsByCategory('hero'),
        getTranslationsByCategory('progress'),
        getTranslationsByCategory('ui')
      ]);

      // Fusionner toutes les traductions
      const allTranslations = [...heroData, ...progressData, ...uiData];

      // Transformer le format : Translation[] → TranslationContent[]
      const transformedData = transformTranslations(allTranslations);
      
      setCmsData(transformedData);
    } catch (error) {
      console.error('Error loading CMS data:', error);
      toast.error('Erreur de chargement', {
        description: 'Impossible de charger les données CMS'
      });
    } finally {
      setLoading(false);
    }
  };

  // Transformer Translation[] en TranslationContent[]
  const transformTranslations = (translations: Translation[]): TranslationContent[] => {
    const grouped: Record<string, TranslationContent> = {};

    translations.forEach(t => {
      if (!grouped[t.text_id]) {
        grouped[t.text_id] = {
          text_id: t.text_id,
          category: t.category as 'hero' | 'progress' | 'ui',
          translations: {}
        };
      }
      grouped[t.text_id].translations[t.language_code] = t.text_content;
    });

    return Object.values(grouped);
  };

  // Organize data by category
  const organizeDataByCategory = (data: TranslationContent[]) => {
    return {
      hero: data.filter(item => item.category === 'hero'),
      progress: data.filter(item => item.category === 'progress'),
      ui: data.filter(item => item.category === 'ui')
    };
  };

  // Get all unique languages
  const getAllLanguages = (data: TranslationContent[]): string[] => {
    const languagesSet = new Set<string>();
    data.forEach(item => {
      Object.keys(item.translations).forEach(lang => languagesSet.add(lang));
    });
    return Array.from(languagesSet).sort();
  };

  // Export JSON Complete
  const handleExportJSON = () => {
    setExporting(true);
    
    try {
      const organizedData = organizeDataByCategory(cmsData);
      const languages = getAllLanguages(cmsData);

      const exportData: CMSExportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        source: 'YOJOB CMS Landing Page',
        data: organizedData,
        stats: {
          heroCount: organizedData.hero.length,
          progressCount: organizedData.progress.length,
          uiCount: organizedData.ui.length,
          totalTexts: cmsData.length,
          totalLanguages: languages.length,
          languages: languages
        }
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `yojob-cms-complete-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Export JSON réussi', {
        description: `${exportData.stats.totalTexts} textes × ${exportData.stats.totalLanguages} langues`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur d\'export', {
        description: 'Impossible d\'exporter les données CMS'
      });
    } finally {
      setExporting(false);
    }
  };

  // Export Excel (CSV avec structure) - Include all 23 languages
  const handleExportExcel = () => {
    setExporting(true);
    
    try {
      const organizedData = organizeDataByCategory(cmsData);
      
      // All 23 target languages
      const allLanguages = [
        'fr', 'en', 'de', 'es', 'it', 'nl', 'pl', 'pt',
        'el', 'sv', 'da', 'fi', 'cs', 'hu', 'ro', 'bg',
        'sk', 'sl', 'hr', 'lt', 'lv', 'et'
      ];

      // Create CSV for each category
      const categories = [
        { name: 'hero', data: organizedData.hero, label: 'Hero Section' },
        { name: 'progress', data: organizedData.progress, label: 'Progress Section' },
        { name: 'ui', data: organizedData.ui, label: 'UI Section' }
      ];

      categories.forEach(category => {
        if (category.data.length === 0) return;

        // CSV Headers with all languages
        const headers = ['Text ID', 'Category', ...allLanguages.map(l => l.toUpperCase())];
        
        // CSV Rows
        const rows = category.data.map(item => {
          const row = [
            item.text_id,
            item.category,
            ...allLanguages.map(lang => {
              const text = item.translations[lang] || '';
              // Escape quotes and wrap in quotes
              return `"${text.replace(/"/g, '""')}"`;
            })
          ];
          return row.join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');
        
        // Add BOM for Excel UTF-8 support
        const BOM = '\uFEFF';
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `yojob-cms-${category.name}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });

      toast.success('Export Excel réussi', {
        description: `3 fichiers CSV avec 23 langues (Hero, Progress, UI)`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur d\'export', {
        description: 'Impossible d\'exporter en format Excel'
      });
    } finally {
      setExporting(false);
    }
  };

  // Export Translation Template (French + existing translations + empty for missing)
  const handleExportTemplate = () => {
    setExporting(true);
    
    try {
      const organizedData = organizeDataByCategory(cmsData);
      
      // All target languages (23 languages)
      const allLanguages = [
        'fr', 'en', 'de', 'es', 'it', 'nl', 'pl', 'pt', // 8 principales
        'el', 'sv', 'da', 'fi', 'cs', 'hu', 'ro', 'bg', // Europe centrale/nord
        'sk', 'sl', 'hr', 'lt', 'lv', 'et'              // Europe de l'Est
      ];

      // Calculate statistics for existing translations
      let totalExisting = 0;
      let totalMissing = 0;
      const languageStats: Record<string, { existing: number; missing: number }> = {};

      allLanguages.forEach(lang => {
        languageStats[lang] = { existing: 0, missing: 0 };
      });

      // Create template with existing translations preserved and empty for missing
      const createTemplateItem = (item: TranslationContent) => {
        const translations: Record<string, string> = {};
        
        allLanguages.forEach(lang => {
          const existingTranslation = item.translations[lang];
          if (existingTranslation && existingTranslation.trim()) {
            translations[lang] = existingTranslation;
            languageStats[lang].existing++;
            totalExisting++;
          } else {
            translations[lang] = '';
            languageStats[lang].missing++;
            totalMissing++;
          }
        });

        return {
          ...item,
          translations
        };
      };

      const templateData: CMSExportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        source: 'YOJOB CMS Translation Template',
        data: {
          hero: organizedData.hero.map(createTemplateItem),
          progress: organizedData.progress.map(createTemplateItem),
          ui: organizedData.ui.map(createTemplateItem)
        },
        stats: {
          heroCount: organizedData.hero.length,
          progressCount: organizedData.progress.length,
          uiCount: organizedData.ui.length,
          totalTexts: cmsData.length,
          totalLanguages: allLanguages.length,
          languages: allLanguages
        }
      };

      // Add translation status to the export
      const exportWithMeta = {
        ...templateData,
        translationStatus: {
          totalSlots: cmsData.length * allLanguages.length,
          existingTranslations: totalExisting,
          missingTranslations: totalMissing,
          completionRate: Math.round((totalExisting / (cmsData.length * allLanguages.length)) * 100),
          languageStats: Object.entries(languageStats).map(([lang, stats]) => ({
            language: lang.toUpperCase(),
            existing: stats.existing,
            missing: stats.missing,
            completionRate: Math.round((stats.existing / cmsData.length) * 100)
          })).sort((a, b) => b.completionRate - a.completionRate)
        }
      };

      const blob = new Blob([JSON.stringify(exportWithMeta, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `yojob-cms-template-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Template généré avec succès', {
        description: `${totalExisting} traductions existantes + ${totalMissing} à compléter (${Math.round((totalExisting / (totalExisting + totalMissing)) * 100)}% complété)`
      });
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur de génération', {
        description: 'Impossible de générer le template'
      });
    } finally {
      setExporting(false);
    }
  };

  // Copy JSON to clipboard
  const handleCopyJSON = () => {
    const organizedData = organizeDataByCategory(cmsData);
    const languages = getAllLanguages(cmsData);

    const exportData: CMSExportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      source: 'YOJOB CMS Landing Page',
      data: organizedData,
      stats: {
        heroCount: organizedData.hero.length,
        progressCount: organizedData.progress.length,
        uiCount: organizedData.ui.length,
        totalTexts: cmsData.length,
        totalLanguages: languages.length,
        languages: languages
      }
    };

    copyToClipboard(JSON.stringify(exportData, null, 2));
    toast.success('JSON CMS copié dans le presse-papier !');
  };

  // Import CMS data
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);

    try {
      const text = await file.text();
      const importData = JSON.parse(text) as CMSExportData;

      // Validate import data structure
      if (!importData.data || !importData.version) {
        throw new Error('Format de fichier invalide');
      }

      // Show preview modal
      setImportPreview(importData);
      
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

  // Confirm import
  const confirmImport = async () => {
    if (!importPreview) return;

    setImporting(true);

    try {
      // Flatten data for API
      const allTranslations = [
        ...importPreview.data.hero,
        ...importPreview.data.progress,
        ...importPreview.data.ui
      ];

      let updateCount = 0;
      let errorCount = 0;

      // Import chaque traduction via l'API existante
      for (const item of allTranslations) {
        for (const [languageCode, textContent] of Object.entries(item.translations)) {
          if (textContent && textContent.trim()) {
            try {
              const success = await updateTranslation(
                item.text_id,
                languageCode,
                textContent,
                undefined, // pas d'oldContent car c'est un import
                item.category
              );
              if (success) {
                updateCount++;
              } else {
                errorCount++;
              }
            } catch (error) {
              console.error(`Error importing ${item.text_id} (${languageCode}):`, error);
              errorCount++;
            }
          }
        }
      }

      if (updateCount > 0) {
        toast.success('Import réussi !', {
          description: `${updateCount} traduction${updateCount > 1 ? 's' : ''} importée${updateCount > 1 ? 's' : ''}`
        });
      }

      if (errorCount > 0) {
        toast.warning('Import partiel', {
          description: `${errorCount} erreur${errorCount > 1 ? 's' : ''} rencontrée${errorCount > 1 ? 's' : ''}`
        });
      }

      // Reload data
      await loadCMSData();
      setImportPreview(null);

    } catch (error) {
      console.error('Import error:', error);
      toast.error('Erreur d\'import', {
        description: 'Impossible d\'importer les données'
      });
    } finally {
      setImporting(false);
    }
  };

  const stats = {
    total: cmsData.length,
    hero: cmsData.filter(item => item.category === 'hero').length,
    progress: cmsData.filter(item => item.category === 'progress').length,
    ui: cmsData.filter(item => item.category === 'ui').length,
    languages: getAllLanguages(cmsData).length,
    // Calculate translation completion
    totalSlots: cmsData.length * 23, // 23 target languages
    existingTranslations: cmsData.reduce((sum, item) => {
      return sum + Object.values(item.translations).filter(t => t && t.trim()).length;
    }, 0),
    get completionRate() {
      return this.totalSlots > 0 ? Math.round((this.existingTranslations / this.totalSlots) * 100) : 0;
    }
  };

  if (loading) {
    return (
      <Card className="bg-white border-slate-200 shadow-md">
        <CardContent className="p-12 text-center">
          <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement des données CMS...</p>
        </CardContent>
      </Card>
    );
  }

  if (!loading && cmsData.length === 0) {
    return (
      <Card className="bg-white border-slate-200 shadow-md">
        <CardContent className="p-12 text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-slate-900 mb-2">Aucune donnée CMS trouvée</h3>
          <p className="text-slate-600 mb-2">
            Les contenus CMS sont vides. Cela peut être normal si :
          </p>
          <ul className="text-slate-600 text-sm mb-6 space-y-1">
            <li>• C'est votre première utilisation</li>
            <li>• Les traductions n'ont pas encore été ajoutées dans l'onglet CMS</li>
            <li>• La base de données vient d'être réinitialisée</li>
          </ul>
          <div className="flex gap-3 justify-center">
            <Button onClick={loadCMSData} variant="outline">
              <Loader2 className="w-4 h-4 mr-2" />
              Recharger
            </Button>
            <Button 
              onClick={() => window.location.hash = '#cms'}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
            >
              Aller au CMS
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <FileType className="w-5 h-5 text-pink-600" />
                Exporter le contenu CMS
              </CardTitle>
              <p className="text-slate-600 text-sm mt-2">
                Sauvegardez les traductions de la landing page (Hero + Progress + UI)
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
              Landing Page
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-5 gap-4 p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
              <div className="text-center">
                <div className="text-2xl text-slate-900 mb-1">{stats.total}</div>
                <div className="text-slate-600 text-xs">Textes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-blue-600 mb-1">{stats.hero}</div>
                <div className="text-slate-600 text-xs">Hero</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-violet-600 mb-1">{stats.progress}</div>
                <div className="text-slate-600 text-xs">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-cyan-600 mb-1">{stats.ui}</div>
                <div className="text-slate-600 text-xs">UI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-pink-600 mb-1">{stats.languages}</div>
                <div className="text-slate-600 text-xs">Langues actives</div>
              </div>
            </div>

            {/* Completion Stats */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Progression des traductions
                  </h4>
                  <p className="text-slate-600 text-xs mt-1">
                    {stats.existingTranslations} / {stats.totalSlots} traductions complétées
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl text-green-600 mb-1">{stats.completionRate}%</div>
                  <div className="text-slate-600 text-xs">Complété</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-green-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.completionRate}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              </div>
              
              <div className="mt-2 text-xs text-slate-600 text-center">
                {stats.totalSlots - stats.existingTranslations} traductions manquantes sur 23 langues cibles
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* JSON Complete */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleExportJSON}
                disabled={exporting}
                className="w-full p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-400/50 rounded-xl hover:shadow-lg transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileJson className="w-6 h-6 text-blue-600" />
                  <h4 className="text-slate-900">JSON Complet</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Toutes les catégories avec métadonnées (Hero + Progress + UI)
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm">Recommandé pour IA</span>
                  {exporting ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-blue-600 group-hover:translate-y-1 transition-transform" />
                  )}
                </div>
              </button>
            </motion.div>

            {/* Excel Export */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleExportExcel}
                disabled={exporting}
                className="w-full p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/50 rounded-xl hover:shadow-lg transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileSpreadsheet className="w-6 h-6 text-green-600" />
                  <h4 className="text-slate-900">Format Excel/CSV</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  3 fichiers CSV × 23 langues (existantes + vides) pour Excel/Sheets
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 text-sm">Traducteurs humains</span>
                  {exporting ? (
                    <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-green-600 group-hover:translate-y-1 transition-transform" />
                  )}
                </div>
              </button>
            </motion.div>

            {/* Translation Template */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleExportTemplate}
                disabled={exporting}
                className="w-full p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-400/50 rounded-xl hover:shadow-lg transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileType className="w-6 h-6 text-violet-600" />
                  <h4 className="text-slate-900">Template avec Existantes</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Traductions existantes + langues manquantes vides + statistiques
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-violet-600 text-sm">Complétion intelligente</span>
                  {exporting ? (
                    <Loader2 className="w-4 h-4 text-violet-600 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 text-violet-600 group-hover:translate-y-1 transition-transform" />
                  )}
                </div>
              </button>
            </motion.div>

            {/* Copy JSON */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleCopyJSON}
                disabled={exporting}
                className="w-full p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-2 border-orange-400/50 rounded-xl hover:shadow-lg transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Copy className="w-6 h-6 text-orange-600" />
                  <h4 className="text-slate-900">Copier JSON</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Copier dans le presse-papier pour partage rapide
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-600 text-sm">Presse-papier</span>
                  <Copy className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
                </div>
              </button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Import Section */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-pink-600" />
            Importer du contenu CMS
          </CardTitle>
          <p className="text-slate-600 text-sm mt-2">
            Restaurez ou mettez à jour les traductions depuis un fichier JSON
          </p>
        </CardHeader>
        <CardContent>
          <Alert className="border-blue-200 bg-blue-50/50 mb-6">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 text-sm">
              <strong>Mode intelligent :</strong> Les traductions seront fusionnées avec les existantes. 
              Seules les langues présentes dans le fichier seront mises à jour.
            </AlertDescription>
          </Alert>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-pink-400 hover:bg-pink-500/5 transition-all">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={importing}
              className="hidden"
              id="import-cms-json"
            />
            <label htmlFor="import-cms-json" className="cursor-pointer">
              {importing ? (
                <>
                  <Loader2 className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-spin" />
                  <h4 className="text-slate-900 mb-2">Import en cours...</h4>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h4 className="text-slate-900 mb-2">
                    Cliquez pour sélectionner un fichier JSON
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Ou glissez-déposez un fichier .json ici
                  </p>
                </>
              )}
            </label>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Aperçu avant import</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Fusion intelligente</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-violet-50 rounded-lg border border-violet-200">
              <CheckCircle className="w-4 h-4 text-violet-600 flex-shrink-0" />
              <span>Validation automatique</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Import Preview Modal */}
      {importPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-pink-600" />
                  Aperçu de l'import
                </h3>
                <Badge className="bg-pink-100 text-pink-700">
                  {importPreview.stats.totalTexts} textes
                </Badge>
              </div>
              <p className="text-slate-600 text-sm">
                Vérifiez les données avant de confirmer l'import
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <div className="text-2xl text-blue-600 mb-1">{importPreview.stats.heroCount}</div>
                  <div className="text-xs text-slate-600">Hero Section</div>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-200 text-center">
                  <div className="text-2xl text-violet-600 mb-1">{importPreview.stats.progressCount}</div>
                  <div className="text-xs text-slate-600">Progress Section</div>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-200 text-center">
                  <div className="text-2xl text-cyan-600 mb-1">{importPreview.stats.uiCount}</div>
                  <div className="text-xs text-slate-600">UI Section</div>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h4 className="text-slate-900 text-sm mb-2">Langues détectées ({importPreview.stats.totalLanguages})</h4>
                <div className="flex flex-wrap gap-2">
                  {importPreview.stats.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sample Data */}
              <div>
                <h4 className="text-slate-900 text-sm mb-2">Aperçu des données (3 premiers textes)</h4>
                <div className="space-y-2">
                  {[...importPreview.data.hero, ...importPreview.data.progress, ...importPreview.data.ui]
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span className="text-xs text-slate-600">{item.text_id}</span>
                        </div>
                        <p className="text-sm text-slate-700 line-clamp-2">
                          {item.translations.fr || item.translations.en || Object.values(item.translations)[0]}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setImportPreview(null)}
                disabled={importing}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                onClick={confirmImport}
                disabled={importing}
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
              >
                {importing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Import en cours...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirmer l'import
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}