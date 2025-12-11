/**
 * 🔧 BOUTON POUR CONVERTIR LES TRADUCTIONS EN FORMAT AVEC PROFILS
 * 
 * Ce composant permet de convertir toutes les traductions existantes
 * du format questions.q1_nom.label → questions.agency.q1_nom.label
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { RefreshCw, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface ConversionResult {
  success: boolean;
  message?: string;
  stats?: {
    originalCount: number;
    generatedCount: number;
    insertedCount: number;
  };
  error?: string;
  details?: string;
}

export function SeedWithProfilesButton() {
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleConvert = async () => {
    setIsConverting(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-with-profiles`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      setResult(data);
      
      // Auto-fermer le dialog après succès
      if (data.success) {
        setTimeout(() => {
          setShowDialog(false);
          setResult(null);
        }, 5000);
      }

    } catch (error: any) {
      console.error('Error converting translations:', error);
      setResult({
        success: false,
        error: error.message || 'Unknown error',
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Convertir en format profils
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convertir les traductions</DialogTitle>
          <DialogDescription>
            Cette opération va convertir toutes les traductions existantes au format avec profils
            (questions.agency.q1_nom.label au lieu de questions.q1_nom.label)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!result && !isConverting && (
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-2">📋 Ce qui va se passer :</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Lecture de toutes les traductions existantes</li>
                  <li>Génération des clés avec profils (agency/client/worker)</li>
                  <li>Insertion dans Supabase (sans supprimer les anciennes)</li>
                </ul>
              </div>

              <Button
                onClick={handleConvert}
                className="w-full"
                disabled={isConverting}
              >
                Lancer la conversion
              </Button>
            </div>
          )}

          {isConverting && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-sm text-slate-600">Conversion en cours...</p>
              <p className="text-xs text-slate-500">
                Cela peut prendre quelques secondes
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-3">
              {result.success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      Conversion réussie !
                    </span>
                  </div>
                  
                  {result.stats && (
                    <div className="space-y-2 text-sm text-green-700">
                      <div className="flex justify-between">
                        <span>Traductions originales :</span>
                        <span className="font-semibold">{result.stats.originalCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Traductions générées :</span>
                        <span className="font-semibold">{result.stats.generatedCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Traductions insérées :</span>
                        <span className="font-semibold">{result.stats.insertedCount}</span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-green-600 mt-3">
                    Les traductions sont maintenant disponibles avec le format profils ✓
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Erreur</span>
                  </div>
                  <p className="text-sm text-red-700">{result.error}</p>
                  {result.details && (
                    <p className="text-xs text-red-600 mt-2 font-mono">
                      {result.details}
                    </p>
                  )}
                </div>
              )}

              <Button
                onClick={() => {
                  setShowDialog(false);
                  setResult(null);
                }}
                variant="outline"
                className="w-full"
              >
                Fermer
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
