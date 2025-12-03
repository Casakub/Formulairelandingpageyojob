import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronDown, ChevronUp, Lightbulb, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function ExportGuideCard() {
  const [expanded, setExpanded] = useState(false);

  const workflows = [
    {
      icon: '🤖',
      title: 'Traduction via IA',
      color: 'from-blue-500 to-cyan-500',
      steps: [
        'Exportez en JSON (Questions ou CMS)',
        'Envoyez le fichier à Claude, ChatGPT, ou DeepL API',
        'Récupérez le JSON traduit',
        'Importez le fichier avec aperçu automatique'
      ]
    },
    {
      icon: '👨‍💻',
      title: 'Traduction humaine',
      color: 'from-green-500 to-emerald-500',
      steps: [
        'Exportez en Excel/CSV (format tableur)',
        'Partagez avec vos traducteurs',
        'Récupérez les fichiers complétés',
        'Importez via JSON ou convertissez depuis Excel'
      ]
    },
    {
      icon: '📝',
      title: 'Template intelligent',
      color: 'from-violet-500 to-purple-500',
      steps: [
        'Cliquez sur "Template avec Existantes"',
        'Toutes les traductions déjà faites sont pré-remplies',
        'Complétez seulement les langues manquantes (vides)',
        'Importez le fichier JSON complété'
      ]
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-md">
      <CardHeader>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-md">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                Guide rapide
                <Badge variant="outline" className="bg-white/50 text-amber-700 border-amber-300">
                  3 workflows
                </Badge>
              </CardTitle>
              <p className="text-slate-600 text-sm mt-1">
                Comment exporter et traduire vos contenus
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-amber-600" />
          </motion.div>
        </button>
      </CardHeader>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {workflows.map((workflow, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                  >
                    <div className="text-3xl mb-2">{workflow.icon}</div>
                    <h4 className="text-slate-900 mb-3">{workflow.title}</h4>
                    <ol className="space-y-2">
                      {workflow.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-2 text-sm text-slate-600">
                          <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${workflow.color} text-white flex items-center justify-center text-xs flex-shrink-0`}>
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                ))}
              </div>

              {/* Format Comparison */}
              <div className="mb-6 p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="text-slate-900 text-sm mb-3">Quel format choisir ?</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">📄</span>
                    <div>
                      <strong className="text-slate-900">JSON Complet :</strong>
                      <span className="text-slate-600"> Toutes traductions existantes + métadonnées (pour IA ou backup)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">📊</span>
                    <div>
                      <strong className="text-slate-900">Excel/CSV :</strong>
                      <span className="text-slate-600"> 3 fichiers tableur (Hero, Progress, UI) pour traducteurs humains</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-violet-600">📝</span>
                    <div>
                      <strong className="text-slate-900">Template Intelligent :</strong>
                      <span className="text-slate-600"> Existantes pré-remplies + manquantes vides + stats par langue</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-blue-900 text-sm mb-1">Astuce performance</h5>
                    <p className="text-blue-800 text-xs">
                      Pour les traductions IA : le format JSON est optimal car il conserve la structure et les métadonnées. 
                      Claude 3.5 Sonnet gère parfaitement les 23 langues européennes !
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-green-900 text-sm mb-1">Import intelligent</h5>
                    <p className="text-green-800 text-xs">
                      Lors de l'import CMS, seules les langues présentes dans votre fichier seront mises à jour. 
                      Les autres traductions existantes restent intactes (fusion intelligente).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-violet-50 rounded-lg border border-violet-200">
                  <Shield className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-violet-900 text-sm mb-1">Protection des données</h5>
                    <p className="text-violet-800 text-xs">
                      Toujours un aperçu avant import avec statistiques détaillées. 
                      Pour les questions du formulaire, pensez à exporter d'abord (l'import remplace tout).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
