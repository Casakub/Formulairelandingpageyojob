import { motion } from 'motion/react';
import { AlertTriangle, Database, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useState } from 'react';

export function ProspectsSetupBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopySQL = () => {
    // En production, on pourrait fetch le fichier SQL
    const instructions = `1. Ouvrez https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Menu → SQL Editor → + New Query
4. Ouvrez le fichier SETUP_PROSPECTS_CRM.sql
5. Copiez TOUT le contenu
6. Collez dans SQL Editor
7. Cliquez RUN ▶️`;
    
    navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h3 className="text-orange-900">Configuration requise</h3>
                  </div>
                  <p className="text-orange-800 text-sm">
                    Les tables de la base de données doivent être créées avant d'utiliser le module Prospects CRM.
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="bg-white/60 rounded-xl p-4 mb-4 border border-orange-200">
                <p className="text-orange-900 mb-3">
                  <strong>📋 Instructions (2 minutes)</strong>
                </p>
                <ol className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Ouvrez{' '}
                      <a
                        href="https://supabase.com/dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-orange-900"
                      >
                        Supabase Dashboard
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Menu → <strong>SQL Editor</strong> → + New Query</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      Ouvrez le fichier <code className="bg-orange-100 px-2 py-0.5 rounded">SETUP_PROSPECTS_CRM.sql</code>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Copiez TOUT le contenu (Ctrl+A → Ctrl+C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <span>Collez dans SQL Editor → Cliquez <strong>RUN ▶️</strong></span>
                  </li>
                </ol>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={handleCopySQL}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copier les instructions
                    </>
                  )}
                </Button>
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2 border-orange-300 hover:bg-orange-50">
                    <ExternalLink className="w-4 h-4" />
                    Ouvrir Supabase
                  </Button>
                </a>
              </div>

              {/* Help */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 text-xs">
                  💡 <strong>Astuce :</strong> Les fichiers <code>SETUP_PROSPECTS_CRM.sql</code> et{' '}
                  <code>SETUP_PROSPECTS_CRM.md</code> contiennent toutes les instructions détaillées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
