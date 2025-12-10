/**
 * 🗑️ MODAL DE CONFIRMATION DE SUPPRESSION
 * 
 * Demande confirmation avant de supprimer une question
 * Affiche les impacts potentiels (profils affectés, réponses existantes)
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Trash2, X, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import type { QuestionConfig } from '../../config/survey-questions';

interface QuestionDeleteModalProps {
  question: QuestionConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (questionId: string) => void;
}

const PROFILE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  agency: { label: 'Agences ETT', icon: '🏢', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  client: { label: 'Clients/Entreprises', icon: '💼', color: 'bg-violet-100 text-violet-700 border-violet-300' },
  worker: { label: 'Intérimaires', icon: '👷', color: 'bg-green-100 text-green-700 border-green-300' },
};

export function QuestionDeleteModal({ 
  question, 
  isOpen, 
  onClose, 
  onConfirm 
}: QuestionDeleteModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!question || !confirmed) return;
    
    setIsDeleting(true);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onConfirm(question.id);
    setIsDeleting(false);
    setConfirmed(false);
  };

  const handleClose = () => {
    if (isDeleting) return;
    setConfirmed(false);
    onClose();
  };

  if (!question) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Supprimer la question
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Cette action est irréversible. Veuillez confirmer la suppression.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Question Details */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-red-600 mb-1">Question à supprimer</div>
                  <div className="text-red-900">{question.labelFallback}</div>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="outline" className="bg-white text-red-700 border-red-300">
                    ID: {question.id}
                  </Badge>
                  <Badge variant="outline" className="bg-white text-red-700 border-red-300">
                    Section {question.section}
                  </Badge>
                  <Badge variant="outline" className="bg-white text-red-700 border-red-300">
                    {question.type}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affected Profiles */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-orange-700" />
                <Label className="text-orange-900">Profils affectés</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {question.visibleFor.map(profile => {
                  const profileInfo = PROFILE_LABELS[profile];
                  return (
                    <Badge
                      key={profile}
                      variant="outline"
                      className={`${profileInfo.color} bg-opacity-50`}
                    >
                      <span className="mr-1">{profileInfo.icon}</span>
                      {profileInfo.label}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Impact Warning */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="space-y-2 text-sm text-amber-900">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Attention :</strong> Cette suppression aura les impacts suivants :
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 ml-6 text-amber-800">
                  <li>La question ne sera plus visible dans le formulaire</li>
                  <li>Les réponses existantes seront conservées mais la question ne sera plus exploitable</li>
                  <li>Les statistiques liées à cette question seront supprimées du dashboard</li>
                  <li>Cette action ne peut pas être annulée</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Checkbox */}
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="confirm-delete"
                  checked={confirmed}
                  onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                />
                <div>
                  <Label
                    htmlFor="confirm-delete"
                    className="text-slate-900 cursor-pointer"
                  >
                    Je comprends les conséquences et je souhaite supprimer cette question
                  </Label>
                  <p className="text-xs text-slate-500 mt-1">
                    Cochez cette case pour activer le bouton de suppression
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative suggestion */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-3">
              <div className="flex items-start gap-2 text-sm text-blue-900">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Alternative :</strong> Au lieu de supprimer, vous pouvez <strong>masquer</strong> cette question 
                  en utilisant le bouton "👁️ Visibilité". Elle sera désactivée mais pourra être réactivée plus tard.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isDeleting}
            className="bg-white"
          >
            <X className="w-4 h-4 mr-2" />
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={!confirmed || isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Suppression...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer définitivement
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}