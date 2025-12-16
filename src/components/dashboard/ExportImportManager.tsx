import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Download, 
  FileJson, 
  FileSpreadsheet, 
  Sparkles,
  Copy,
  Check,
  AlertCircle,
  FileText,
  Database,
  RefreshCw,
  Filter,
  Calendar,
  Users
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getAllResponses, type MarketResearchResponse } from '../../lib/supabase';
import { useQuestions } from '../../context/QuestionsContext';
import { toast } from 'sonner@2.0.3';
import { Question } from '../../config/survey-questions-COMPLETE';

/**
 * 📤 EXPORT & IMPORT MANAGER - PAGE COMPLÈTE
 * ==========================================
 * Gestionnaire d'export/import standalone pour l'onglet Export du dashboard
 */

const COLORS = {
  blue: '#1E3A8A',
  cyan: '#06B6D4',
  violet: '#7C3AED',
  green: '#10B981',
  orange: '#F59E0B',
};

export function ExportImportManager() {
  const { questions } = useQuestions();
  const [responses, setResponses] = useState<MarketResearchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'ai'>('json');
  const [copied, setCopied] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('all');

  // Charger les réponses
  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    setIsLoading(true);
    try {
      const result = await getAllResponses();
      
      if (result.success && result.data) {
        setResponses(Array.isArray(result.data) ? result.data : []);
        toast.success(`${result.data.length} réponses chargées`);
      } else {
        setResponses([]);
        toast.info('Aucune réponse disponible');
      }
    } catch (error) {
      console.error('Error loading responses:', error);
      setResponses([]);
      toast.error('Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  };

  // Questions visibles uniquement
  const visibleQuestions = questions.filter(q => q.visible !== false);

  // Filtrer par profil
  const filteredResponses = selectedProfile === 'all' 
    ? responses 
    : responses.filter(r => r.respondent_type === selectedProfile);

  // Générer JSON
  const generateJSON = () => {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalResponses: filteredResponses.length,
        totalQuestions: visibleQuestions.length,
        profile: selectedProfile,
        version: '2.0.0'
      },
      questions: visibleQuestions.map(q => ({
        id: q.id,
        label: q.label,
        type: q.type,
        section: q.section,
        options: q.options || []
      })),
      responses: filteredResponses
    };

    return JSON.stringify(exportData, null, 2);
  };

  // Générer CSV
  const generateCSV = () => {
    if (filteredResponses.length === 0) return '';

    // Headers
    const headers = ['ID', 'Date', 'Type Répondant', ...visibleQuestions.map(q => q.label)];
    
    // Rows
    const rows = filteredResponses.map(response => {
      const row = [
        response.id || '',
        new Date(response.created_at || '').toLocaleDateString('fr-FR'),
        response.respondent_type || 'N/A',
        ...visibleQuestions.map(q => {
          const value = (response as any)[q.id];
          if (Array.isArray(value)) return value.join('; ');
          return value || '';
        })
      ];
      return row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',');
    });

    return [headers.map(h => `"${h}"`).join(','), ...rows].join('\n');
  };

  // Générer texte pour IA
  const generateAIText = () => {
    const text = `
=== ÉTUDE DE MARCHÉ YOJOB ===
Date d'export: ${new Date().toLocaleDateString('fr-FR')}
Profil: ${selectedProfile === 'all' ? 'Tous les profils' : selectedProfile}
Total réponses: ${filteredResponses.length}

=== QUESTIONS (${visibleQuestions.length}) ===
${visibleQuestions.map((q, i) => `${i + 1}. [${q.type}] ${q.label}`).join('\n')}

=== RÉPONSES ===
${filteredResponses.map((response, i) => {
  const answers = visibleQuestions.map(q => {
    const value = (response as any)[q.id];
    return `${q.label}: ${Array.isArray(value) ? value.join(', ') : value || 'N/A'}`;
  }).join('\n  ');
  
  return `
--- Réponse ${i + 1} ---
Type: ${response.respondent_type || 'N/A'}
Date: ${new Date(response.created_at || '').toLocaleDateString('fr-FR')}
  ${answers}
`;
}).join('\n')}

=== FIN DU RAPPORT ===
`;
    return text.trim();
  };

  // Télécharger
  const handleDownload = () => {
    if (filteredResponses.length === 0) {
      toast.error('Aucune réponse à exporter');
      return;
    }

    let content = '';
    let filename = '';
    let mimeType = '';

    if (exportFormat === 'json') {
      content = generateJSON();
      filename = `yojob-export-${selectedProfile}-${Date.now()}.json`;
      mimeType = 'application/json';
    } else if (exportFormat === 'csv') {
      content = generateCSV();
      filename = `yojob-export-${selectedProfile}-${Date.now()}.csv`;
      mimeType = 'text/csv';
    } else if (exportFormat === 'ai') {
      content = generateAIText();
      filename = `yojob-export-${selectedProfile}-${Date.now()}.txt`;
      mimeType = 'text/plain';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`Export ${exportFormat.toUpperCase()} téléchargé !`);
  };

  // Copier dans le presse-papier
  const handleCopy = async () => {
    let content = '';
    if (exportFormat === 'json') content = generateJSON();
    else if (exportFormat === 'csv') content = generateCSV();
    else if (exportFormat === 'ai') content = generateAIText();

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Copié dans le presse-papier !');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Erreur lors de la copie');
    }
  };

  // Preview du contenu
  const getPreview = () => {
    if (exportFormat === 'json') return generateJSON();
    else if (exportFormat === 'csv') return generateCSV();
    else if (exportFormat === 'ai') return generateAIText();
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-slate-900">📤 Export & Import</h2>
            <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-300">
              <Download className="w-3 h-3 mr-1" />
              Multi-formats
            </Badge>
          </div>
          <p className="text-slate-600">
            Exportez vos données au format JSON, CSV ou texte pour IA
          </p>
        </div>

        <Button
          onClick={loadResponses}
          disabled={isLoading}
          variant="outline"
          className="border-slate-300 hover:bg-slate-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualiser
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 text-white shadow-lg">
          <CardContent className="p-6">
            <Database className="w-8 h-8 mb-2 text-white/80" />
            <div className="text-3xl mb-1">{responses.length}</div>
            <div className="text-white/80 text-sm">Réponses totales</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 border-0 text-white shadow-lg">
          <CardContent className="p-6">
            <Filter className="w-8 h-8 mb-2 text-white/80" />
            <div className="text-3xl mb-1">{filteredResponses.length}</div>
            <div className="text-white/80 text-sm">Réponses filtrées</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-500 to-purple-500 border-0 text-white shadow-lg">
          <CardContent className="p-6">
            <FileText className="w-8 h-8 mb-2 text-white/80" />
            <div className="text-3xl mb-1">{visibleQuestions.length}</div>
            <div className="text-white/80 text-sm">Questions actives</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-amber-500 border-0 text-white shadow-lg">
          <CardContent className="p-6">
            <Calendar className="w-8 h-8 mb-2 text-white/80" />
            <div className="text-3xl mb-1">{exportFormat.toUpperCase()}</div>
            <div className="text-white/80 text-sm">Format sélectionné</div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Export */}
      <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardHeader className="border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900">Configuration de l'export</CardTitle>
              <CardDescription>Personnalisez votre export de données</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Filtre profil */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Filtrer par profil</label>
              <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Tous les profils
                    </div>
                  </SelectItem>
                  <SelectItem value="agency">Agences ETT</SelectItem>
                  <SelectItem value="client">Clients / Entreprises</SelectItem>
                  <SelectItem value="worker">Intérimaires</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Format export */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700">Format d'export</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={exportFormat === 'json' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('json')}
                  className={exportFormat === 'json' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                >
                  <FileJson className="w-4 h-4 mr-2" />
                  JSON
                </Button>
                <Button
                  variant={exportFormat === 'csv' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('csv')}
                  className={exportFormat === 'csv' ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  CSV
                </Button>
                <Button
                  variant={exportFormat === 'ai' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('ai')}
                  className={exportFormat === 'ai' ? 'bg-violet-500 hover:bg-violet-600' : ''}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  IA
                </Button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200">
            <Button
              onClick={handleDownload}
              disabled={filteredResponses.length === 0}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger ({filteredResponses.length} réponses)
            </Button>
            <Button
              onClick={handleCopy}
              disabled={filteredResponses.length === 0}
              variant="outline"
              className="border-slate-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copier
                </>
              )}
            </Button>
          </div>

          {filteredResponses.length === 0 && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-orange-700">
                <strong>Aucune réponse disponible</strong>
                <p className="mt-1">Remplissez d'abord le formulaire ou ajustez vos filtres.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      {filteredResponses.length > 0 && (
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900">Prévisualisation</CardTitle>
                <CardDescription>Aperçu de votre export {exportFormat.toUpperCase()}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-xs font-mono">
              {getPreview()}
            </pre>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
