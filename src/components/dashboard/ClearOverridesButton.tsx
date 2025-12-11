/**
 * 🗑️ BOUTON NETTOYAGE DES OVERRIDES
 * 
 * Supprime tous les overrides des questions qui écrasent les traductions
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export function ClearOverridesButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClearOverrides = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/questions/overrides`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('✅ Overrides supprimés !', {
          description: `${data.count} overrides effacés`,
        });
        setIsOpen(false);
        
        // Recharger la page pour appliquer les changements
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        throw new Error(data.error || 'Failed to clear overrides');
      }
    } catch (error: any) {
      console.error('❌ Error clearing overrides:', error);
      toast.error('❌ Erreur lors du nettoyage', {
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
          variant="destructive"
          className="gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Nettoyage...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4" />
              Nettoyer les overrides
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            ⚠️ Nettoyer les overrides des questions
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <p>
              Cette action va <strong className="text-red-600">supprimer tous les overrides</strong> des questions
              stockés en base de données.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
              <p className="text-sm text-red-900">
                <strong>🔍 Pourquoi nettoyer ?</strong>
              </p>
              <p className="text-sm text-red-800">
                Les overrides peuvent contenir des labels en anglais qui <strong>écrasent</strong> les traductions françaises.
                En les supprimant, les questions utiliseront directement la config et les traductions.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                <strong>⚠️ Attention :</strong> Cette action est irréversible. Les modifications manuelles
                des questions via le dashboard seront perdues.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>✅ Après le nettoyage :</strong> La page se rechargera automatiquement
                et les questions utiliseront les traductions de la config.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleClearOverrides}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Nettoyage en cours...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Confirmer le nettoyage
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
