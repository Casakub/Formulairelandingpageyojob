/**
 * 🌱 BOUTON SEED COMPLET - TOUTES LES TRADUCTIONS FR/EN/DE
 * 
 * Permet de seed toutes les traductions des 3 profils en une fois :
 * - AGENCY : 30 questions
 * - CLIENT : 22 questions
 * - WORKER : 17 questions
 * 
 * Format complet avec FR/EN/DE pour chaque question
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Sprout, Check, AlertCircle, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Alert, AlertDescription } from '../ui/alert';

interface SeedResult {
  success: boolean;
  total?: number;
  created?: number;
  updated?: number;
  errors?: number;
  timestamp?: string;
  error?: string;
}

export function SeedAllFormsButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<SeedResult | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-all-forms-translations`,
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
          // Recharger la page pour voir les nouvelles traductions
          window.location.reload();
        }, 3000);
      }

    } catch (error: any) {
      console.error('❌ Seed error:', error);
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-4">
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="default" 
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
          >
            <Sprout className="mr-2 h-5 w-5" />
            🌱 Seed toutes les traductions (FR/EN/DE)
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl flex items-center gap-2">
              <Sprout className="h-6 w-6 text-green-600" />
              Seed complet des traductions
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-4">
              <p className="text-base">
                Cette action va créer/mettre à jour <strong className="text-green-600">toutes les traductions</strong> pour les 3 profils :
              </p>
              
              <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-blue-600">🏢 AGENCY</span>
                  <span className="text-slate-600">30 questions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-purple-600">🏭 CLIENT</span>
                  <span className="text-slate-600">22 questions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-orange-600">👷 WORKER</span>
                  <span className="text-slate-600">17 questions</span>
                </div>
                <div className="border-t pt-2 mt-2 flex items-center justify-between font-semibold">
                  <span>TOTAL</span>
                  <span className="text-green-600">~600 traductions</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-2">📋 Langues incluses :</h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-blue-300 rounded-full text-sm font-medium">🇫🇷 Français</span>
                  <span className="px-3 py-1 bg-white border border-blue-300 rounded-full text-sm font-medium">🇬🇧 English</span>
                  <span className="px-3 py-1 bg-white border border-blue-300 rounded-full text-sm font-medium">🇩🇪 Deutsch</span>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Les traductions existantes seront <strong>fusionnées</strong> (pas écrasées).
                  La page se rechargera automatiquement après le seed.
                </AlertDescription>
              </Alert>
            </AlertDialogDescription>
          </AlertDialogHeader>

          {result && (
            <div className="py-4">
              {result.success ? (
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-5 w-5 text-green-600" />
                  <AlertDescription className="text-green-900 space-y-2">
                    <p className="font-semibold text-lg">✅ Seed réussi !</p>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="bg-white rounded px-3 py-2 border border-green-200">
                        <div className="text-slate-600">Total</div>
                        <div className="text-xl font-bold text-green-600">{result.total}</div>
                      </div>
                      <div className="bg-white rounded px-3 py-2 border border-green-200">
                        <div className="text-slate-600">Créées</div>
                        <div className="text-xl font-bold text-blue-600">{result.created}</div>
                      </div>
                      <div className="bg-white rounded px-3 py-2 border border-green-200">
                        <div className="text-slate-600">Mises à jour</div>
                        <div className="text-xl font-bold text-orange-600">{result.updated}</div>
                      </div>
                      <div className="bg-white rounded px-3 py-2 border border-green-200">
                        <div className="text-slate-600">Erreurs</div>
                        <div className="text-xl font-bold text-red-600">{result.errors}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 pt-2">Rechargement dans 3 secondes...</p>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-semibold">Erreur lors du seed</p>
                    <p className="text-sm mt-1">{result.error}</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSeeding}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleSeed();
              }}
              disabled={isSeeding}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seed en cours...
                </>
              ) : (
                <>
                  <Sprout className="mr-2 h-4 w-4" />
                  Lancer le seed
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Instructions compactes en dessous du bouton */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <Sprout className="h-4 w-4" />
          Pourquoi utiliser ce seed ?
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✅ <strong>Base propre</strong> : Format unifié dès le départ</li>
          <li>✅ <strong>3 langues</strong> : FR/EN/DE pour tous les profils</li>
          <li>✅ <strong>Complet</strong> : Toutes les questions + options</li>
          <li>✅ <strong>Idempotent</strong> : Peut être relancé sans risque</li>
        </ul>
      </div>
    </div>
  );
}