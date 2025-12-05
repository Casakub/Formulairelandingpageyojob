import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, FileJson, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface Props {
  questionCount?: number;
  uiTextCount?: number;
}

export function QuickTranslationExport({ questionCount = 25, uiTextCount = 150 }: Props) {
  const [showPanel, setShowPanel] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async (format: 'json' | 'csv') => {
    setExporting(true);
    setExportSuccess(false);
    
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`Exporting translations in ${format.toUpperCase()} format...`);
    
    setExporting(false);
    setExportSuccess(true);
    
    setTimeout(() => {
      setExportSuccess(false);
      setShowPanel(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          size="lg"
          onClick={() => setShowPanel(prev => !prev)}
          className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white border-0 p-0"
        >
          {showPanel ? (
            <X className="w-6 h-6" />
          ) : (
            <Download className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Export Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80"
          >
            <Card className="border-2 border-violet-200 shadow-2xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-4 text-white">
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    <h3>Export rapide</h3>
                  </div>
                  <p className="text-sm text-violet-100 mt-1">
                    Téléchargez vos traductions
                  </p>
                </div>

                <div className="p-4 space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Contenu disponible</span>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {questionCount} questions
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {uiTextCount} textes UI
                      </Badge>
                    </div>
                  </div>

                  {/* Success Message */}
                  {exportSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Export réussi !</span>
                    </motion.div>
                  )}

                  {/* Export Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleExport('json')}
                      disabled={exporting}
                      className="w-full justify-start bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-violet-400"
                    >
                      <FileJson className="w-4 h-4 mr-2 text-violet-500" />
                      <div className="flex-1 text-left">
                        <p className="text-sm">Format JSON</p>
                        <p className="text-xs text-slate-500">Structure complète</p>
                      </div>
                    </Button>

                    <Button
                      onClick={() => handleExport('csv')}
                      disabled={exporting}
                      className="w-full justify-start bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-violet-400"
                    >
                      <FileSpreadsheet className="w-4 h-4 mr-2 text-green-500" />
                      <div className="flex-1 text-left">
                        <p className="text-sm">Format CSV</p>
                        <p className="text-xs text-slate-500">Excel compatible</p>
                      </div>
                    </Button>
                  </div>

                  {exporting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2 text-violet-600 text-sm"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.div>
                      <span>Export en cours...</span>
                    </motion.div>
                  )}

                  <p className="text-xs text-slate-500 text-center">
                    Les fichiers incluront toutes les langues configurées
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
