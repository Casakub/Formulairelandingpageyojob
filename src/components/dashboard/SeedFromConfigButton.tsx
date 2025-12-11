/**
 * 🌱 BOUTON SEED DEPUIS CONFIG
 * 
 * Bouton pour créer toutes les traductions manquantes depuis survey-questions-COMPLETE.ts
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { Loader2, Download, CheckCircle2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { SURVEY_QUESTIONS } from '../../config/survey-questions-COMPLETE';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export function SeedFromConfigButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<{
    questionsProcessed: number;
    translationsGenerated: number;
    translationsInserted: number;
  } | null>(null);

  const handleSeed = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-from-config`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questions: SURVEY_QUESTIONS,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
        toast.success('✅ Traductions créées avec succès !', {
          description: `${data.stats.translationsInserted} traductions insérées`,
        });
      } else {
        throw new Error(data.error || 'Failed to seed translations');
      }
    } catch (error: any) {
      console.error('❌ Error seeding from config:', error);
      toast.error('❌ Erreur lors du seed', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Création...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Créer toutes les traductions
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            Créer toutes les traductions depuis la config
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <p>
              Ce script va lire <code className="bg-gray-100 px-2 py-1 rounded text-sm">survey-questions-COMPLETE.ts</code>
              {' '}et créer <strong>toutes les traductions manquantes</strong> en français pour les 3 profils.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-blue-900">
                <strong>📋 Ce qui sera créé :</strong>
              </p>
              <ul className="text-sm text-blue-800 space-y-1 ml-4">
                <li>• Labels de toutes les questions</li>
                <li>• Placeholders de tous les champs</li>
                <li>• Descriptions (si définies dans la config)</li>
                <li>• Options de toutes les questions (select, radio, multi-select)</li>
                <li>• Pour les 3 profils : agency, client, worker</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                <strong>⚠️ Note :</strong> Les traductions existantes ne seront pas écrasées.
                Seules les traductions manquantes seront créées.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {stats && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-900">
                <CheckCircle2 className="w-5 h-5" />
                <strong>Résultats :</strong>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {stats.questionsProcessed}
                  </div>
                  <div className="text-xs text-green-600">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {stats.translationsGenerated}
                  </div>
                  <div className="text-xs text-green-600">Générées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {stats.translationsInserted}
                  </div>
                  <div className="text-xs text-green-600">Insérées</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSeed}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Créer les traductions
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}