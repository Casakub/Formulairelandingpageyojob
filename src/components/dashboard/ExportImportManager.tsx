import { copyToClipboard } from '../../lib/clipboard';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Upload, FileJson, CheckCircle, AlertCircle, FileText, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useQuestions } from '../../context/QuestionsContext';
import { Question } from '../../config/questions';

export function ExportImportManager() {
  const { questions, setQuestions } = useQuestions();
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');

  // Export Questions to JSON
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yojob-questions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export Questions to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Section', 'Code', 'Type', 'Label', 'Obligatoire', 'Visible'];
    const rows = questions.map(q => [
      q.id,
      q.section,
      q.code,
      q.type,
      `"${q.label.replace(/"/g, '""')}"`, // Escape quotes
      q.required ? 'Oui' : 'Non',
      q.visible ? 'Oui' : 'Non'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yojob-questions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export Summary as Markdown
  const handleExportMarkdown = () => {
    let markdown = `# Questions YoJob - Export du ${new Date().toLocaleDateString('fr-FR')}\n\n`;
    markdown += `**Total** : ${questions.length} questions\n\n`;

    for (let section = 1; section <= 6; section++) {
      const sectionQuestions = questions.filter(q => q.section === section);
      if (sectionQuestions.length > 0) {
        markdown += `## Section ${section}\n\n`;
        sectionQuestions.forEach(q => {
          markdown += `### ${q.code}\n`;
          markdown += `- **Label** : ${q.label}\n`;
          markdown += `- **Type** : ${q.type}\n`;
          markdown += `- **Obligatoire** : ${q.required ? 'Oui' : 'Non'}\n`;
          markdown += `- **Visible** : ${q.visible ? 'Oui' : 'Non'}\n`;
          if (q.placeholder) markdown += `- **Placeholder** : ${q.placeholder}\n`;
          if (q.options && q.options.length > 0) {
            markdown += `- **Options** :\n`;
            q.options.forEach(opt => {
              markdown += `  - ${opt.icon || ''} ${opt.label} (${opt.value})\n`;
            });
          }
          markdown += `\n`;
        });
      }
    }

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yojob-questions-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import Questions from JSON
  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as Question[];
        
        // Validation
        if (!Array.isArray(imported)) {
          throw new Error('Le fichier doit contenir un tableau de questions');
        }

        // Vérifier que chaque question a les champs requis
        const isValid = imported.every(q => 
          q.id && q.section && q.code && q.type && q.label
        );

        if (!isValid) {
          throw new Error('Format de questions invalide');
        }

        setQuestions(imported);
        setImportStatus('success');
        setImportMessage(`✅ ${imported.length} questions importées avec succès !`);
        
        setTimeout(() => {
          setImportStatus('idle');
          setImportMessage('');
        }, 5000);
      } catch (error) {
        setImportStatus('error');
        setImportMessage(`❌ Erreur : ${(error as Error).message}`);
        
        setTimeout(() => {
          setImportStatus('idle');
          setImportMessage('');
        }, 5000);
      }
    };

    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  // Copy JSON to Clipboard
  const handleCopyJSON = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    copyToClipboard(dataStr);
    toast.success('JSON copié dans le presse-papier !');
  };

  const exportStats = {
    total: questions.length,
    visible: questions.filter(q => q.visible).length,
    required: questions.filter(q => q.required).length,
    sections: [...new Set(questions.map(q => q.section))].length
  };

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {importMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`p-4 rounded-xl border-2 ${
            importStatus === 'success' 
              ? 'bg-green-500/10 border-green-400 text-green-700'
              : 'bg-red-500/10 border-red-400 text-red-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {importStatus === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{importMessage}</span>
          </div>
        </motion.div>
      )}

      {/* Export Section */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-cyan-600" />
            Exporter les questions
          </CardTitle>
          <p className="text-slate-600 text-sm mt-2">
            Sauvegardez votre configuration de questions dans différents formats
          </p>
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
            <div className="text-center">
              <div className="text-2xl text-slate-900 mb-1">{exportStats.total}</div>
              <div className="text-slate-600 text-xs">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-green-600 mb-1">{exportStats.visible}</div>
              <div className="text-slate-600 text-xs">Visibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-red-600 mb-1">{exportStats.required}</div>
              <div className="text-slate-600 text-xs">Obligatoires</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-violet-600 mb-1">{exportStats.sections}</div>
              <div className="text-slate-600 text-xs">Sections</div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* JSON Export */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleExportJSON}
                className="w-full p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-400/50 rounded-xl hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileJson className="w-6 h-6 text-cyan-600" />
                  <h4 className="text-slate-900">Format JSON</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Backup complet avec toutes les options et configurations
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-600 text-sm">Recommandé pour restore</span>
                  <Download className="w-4 h-4 text-cyan-600 group-hover:translate-y-1 transition-transform" />
                </div>
              </button>
            </motion.div>

            {/* CSV Export */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleExportCSV}
                className="w-full p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-400/50 rounded-xl hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h4 className="text-slate-900">Format CSV</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Compatible Excel pour analyse et partage avec l'équipe
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 text-sm">Pour Excel/Sheets</span>
                  <Download className="w-4 h-4 text-green-600 group-hover:translate-y-1 transition-transform" />
                </div>
              </button>
            </motion.div>

            {/* Markdown Export */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleExportMarkdown}
                className="w-full p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-2 border-violet-400/50 rounded-xl hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-6 h-6 text-violet-600" />
                  <h4 className="text-slate-900">Format Markdown</h4>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Documentation lisible pour GitHub, Notion, etc.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-violet-600 text-sm">Documentation</span>
                  <Download className="w-4 h-4 text-violet-600 group-hover:translate-y-1 transition-transform" />
                </div>
              </button>
            </motion.div>

            {/* Copy to Clipboard */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleCopyJSON}
                className="w-full p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-2 border-orange-400/50 rounded-xl hover:shadow-lg transition-all text-left group"
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
            <Upload className="w-5 h-5 text-violet-600" />
            Importer des questions
          </CardTitle>
          <p className="text-slate-600 text-sm mt-2">
            Restaurez ou fusionnez une configuration depuis un fichier JSON
          </p>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-yellow-900 mb-1">⚠️ Attention</h4>
                <p className="text-yellow-800 text-sm">
                  L'import remplace <strong>toutes</strong> les questions actuelles. 
                  Exportez d'abord si vous voulez conserver l'existant.
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-violet-400 hover:bg-violet-500/5 transition-all">
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
              id="import-json"
            />
            <label htmlFor="import-json" className="cursor-pointer">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h4 className="text-slate-900 mb-2">
                Cliquez pour sélectionner un fichier JSON
              </h4>
              <p className="text-slate-600 text-sm">
                Ou glissez-déposez un fichier .json ici
              </p>
            </label>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <h4 className="text-slate-900 text-sm mb-2">Format attendu :</h4>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg overflow-x-auto border border-slate-200">
{`[
  {
    "id": "1",
    "section": 1,
    "order": 1,
    "code": "q1_test",
    "type": "text",
    "label": "Ma question",
    "required": true,
    "visible": true
  }
]`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}