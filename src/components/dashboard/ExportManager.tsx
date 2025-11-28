import { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Download,
  FileJson,
  FileSpreadsheet,
  Sparkles,
  Check,
  Copy,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface ExportManagerProps {
  responses: any[];
  onClose: () => void;
}

export function ExportManager({ responses, onClose }: ExportManagerProps) {
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'ai' | null>(null);
  const [copied, setCopied] = useState(false);

  const handleExport = (format: 'json' | 'csv' | 'ai') => {
    setExportFormat(format);

    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'json') {
      // Export JSON brut
      content = JSON.stringify(responses, null, 2);
      filename = `yojob-etude-marche-${new Date().toISOString().split('T')[0]}.json`;
      mimeType = 'application/json';
    } else if (format === 'csv') {
      // Export CSV
      const headers = ['Date', 'Pays', 'Agence', 'Secteur', 'Employés', 'Expérience', 'Intérêt', 'Budget', 'Email', 'Téléphone'];
      const rows = responses.map(r => [
        new Date(r.timestamp).toLocaleDateString('fr-FR'),
        r.country,
        r.companyName,
        r.sector,
        r.employees,
        r.detachmentExperience,
        r.interestedInPlatform,
        r.budget,
        r.contact?.email || '',
        r.contact?.phone || ''
      ]);
      
      content = [
        headers.join(';'),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
      ].join('\n');
      
      filename = `yojob-etude-marche-${new Date().toISOString().split('T')[0]}.csv`;
      mimeType = 'text/csv;charset=utf-8;';
    } else if (format === 'ai') {
      // Export formaté pour l'IA
      content = `# Étude de Marché YOJOB - Analyse des Agences ETT Européennes

## 📊 Contexte
Date d'export: ${new Date().toLocaleDateString('fr-FR', { dateStyle: 'full' })}
Nombre de réponses: ${responses.length}
Période: ${new Date(responses[0].timestamp).toLocaleDateString('fr-FR')} - ${new Date(responses[responses.length - 1].timestamp).toLocaleDateString('fr-FR')}

## 🎯 Objectif
Analyser les besoins et l'intérêt des agences d'emploi temporaire européennes pour une plateforme de mise en relation facilitant le détachement de travailleurs entre pays.

## 📋 Données Collectées

${responses.map((r, i) => `
### Réponse ${i + 1}
- **Date**: ${new Date(r.timestamp).toLocaleString('fr-FR')}
- **Pays**: ${r.country}
- **Agence**: ${r.companyName}
- **Secteur**: ${r.sector}
- **Taille**: ${r.employees} employés
- **Expérience détachement**: ${r.detachmentExperience}
${r.averageWorkers > 0 ? `- **Travailleurs détachés/an**: ${r.averageWorkers}` : ''}
${r.mainCountries.length > 0 ? `- **Pays cibles**: ${r.mainCountries.join(', ')}` : ''}
- **Difficultés rencontrées**: ${r.difficulties}
- **Intérêt pour la plateforme**: ${r.interestedInPlatform}
- **Budget annuel**: ${r.budget}
- **Contact**: ${r.contact.name} (${r.contact.email})
`).join('\n')}

## 🤖 Instructions pour l'IA

Merci d'analyser ces données et de fournir :

1. **Synthèse Exécutive** :
   - Vue d'ensemble du marché
   - Principaux enseignements
   - Opportunités identifiées

2. **Analyse Détaillée** :
   - Répartition géographique et insights
   - Secteurs les plus actifs
   - Niveau d'expérience en détachement
   - Difficultés principales rencontrées
   - Niveau d'intérêt pour YOJOB
   - Budgets alloués

3. **Segmentation du Marché** :
   - Profils types d'agences
   - Personas client
   - Segments prioritaires

4. **Recommandations Stratégiques** :
   - Positionnement produit
   - Pricing strategy
   - Go-to-market approach
   - Quick wins

5. **Projections** :
   - Potentiel de marché
   - Taux d'adoption estimé
   - Revenus prévisionnels

Merci de structurer l'analyse de manière claire avec des chiffres clés et des visualisations textuelles si possible.
`;
      
      filename = `yojob-analyse-ia-${new Date().toISOString().split('T')[0]}.txt`;
      mimeType = 'text/plain;charset=utf-8;';
    }

    // Create download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success
    setTimeout(() => {
      setExportFormat(null);
      alert(`✅ Export ${format.toUpperCase()} réussi !\n\nFichier téléchargé : ${filename}`);
    }, 500);
  };

  const handleCopyForAI = () => {
    const content = responses.map((r, i) => 
      `Réponse ${i + 1}: ${r.country} - ${r.companyName} (${r.sector}, ${r.employees} emp.) - ${r.interestedInPlatform}`
    ).join('\n');
    
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-cyan-500/10 to-violet-500/10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-slate-900 text-xl mb-1">📥 Exporter les Résultats</h2>
              <p className="text-slate-600 text-sm">
                {responses.length} réponses à exporter
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Info Banner */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-blue-900 text-sm mb-1">💡 Conseil</h4>
                  <p className="text-blue-700 text-sm">
                    Pour une analyse IA, utilisez l'export "Format IA" puis collez le contenu 
                    dans Claude, GPT-4 ou tout autre modèle de langage. Le format est optimisé 
                    pour générer des insights détaillés.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <div className="space-y-3">
            {/* JSON Export */}
            <Card
              onClick={() => handleExport('json')}
              className="cursor-pointer hover:border-cyan-400 hover:shadow-lg transition-all border-slate-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <FileJson className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 mb-1">JSON Brut</h3>
                      <p className="text-slate-600 text-sm">
                        Données structurées complètes • Développeurs
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            {/* CSV Export */}
            <Card
              onClick={() => handleExport('csv')}
              className="cursor-pointer hover:border-green-400 hover:shadow-lg transition-all border-slate-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 mb-1">CSV Excel</h3>
                      <p className="text-slate-600 text-sm">
                        Tableau pour Excel/Google Sheets • Analyse manuelle
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-400" />
                </div>
              </CardContent>
            </Card>

            {/* AI Format Export */}
            <Card
              onClick={() => handleExport('ai')}
              className="cursor-pointer hover:border-violet-400 hover:shadow-lg transition-all border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 mb-1">Format IA ⭐</h3>
                      <p className="text-slate-600 text-sm">
                        Optimisé pour Claude/GPT • Insights automatiques
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-violet-500 text-white">Recommandé</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Copy */}
          <div className="pt-4 border-t border-slate-200">
            <Button
              onClick={handleCopyForAI}
              variant="outline"
              className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copier résumé pour IA
                </>
              )}
            </Button>
            <p className="text-slate-500 text-xs text-center mt-2">
              Colle directement dans ChatGPT/Claude pour une analyse rapide
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 rounded-b-2xl">
          <div className="flex items-center justify-between text-sm">
            <div className="text-slate-600">
              💾 Les fichiers seront téléchargés localement
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900"
            >
              Fermer
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
