/**
 * 🎯 MODAL D'ÉDITION DE QUESTION
 * 
 * Permet de modifier tous les paramètres d'une question :
 * - Texte (label, placeholder, description)
 * - Type de question
 * - Profils visibles
 * - Options (pour select/radio/multi-select)
 * - Validation (requis/optionnel)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Save, 
  X, 
  Type, 
  ListOrdered, 
  Users, 
  Settings,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Card, CardContent } from '../ui/card';
import type { QuestionConfig } from '../../config/survey-questions';
import type { RespondentType } from '../../types/survey';

interface QuestionEditModalProps {
  question: QuestionConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedQuestion: QuestionConfig) => void;
}

const QUESTION_TYPES = [
  { value: 'text', label: 'Texte court', icon: '📝' },
  { value: 'textarea', label: 'Texte long', icon: '📄' },
  { value: 'radio', label: 'Choix unique', icon: '⭕' },
  { value: 'multi-select', label: 'Choix multiple', icon: '☑️' },
  { value: 'number', label: 'Nombre', icon: '🔢' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'score', label: 'Score (1-5)', icon: '⭐' },
  { value: 'checkbox', label: 'Case à cocher', icon: '✅' },
];

const PROFILES: { value: RespondentType; label: string; icon: string; color: string }[] = [
  { value: 'agency', label: 'Agences ETT', icon: '🏢', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 'client', label: 'Clients/Entreprises', icon: '💼', color: 'bg-violet-100 text-violet-700 border-violet-300' },
  { value: 'worker', label: 'Intérimaires', icon: '👷', color: 'bg-green-100 text-green-700 border-green-300' },
];

export function QuestionEditModal({ question, isOpen, onClose, onSave }: QuestionEditModalProps) {
  const [editedQuestion, setEditedQuestion] = useState<QuestionConfig | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form when question changes
  useEffect(() => {
    if (question) {
      setEditedQuestion({ ...question });
      setHasChanges(false);
    }
  }, [question]);

  const handleChange = (field: keyof QuestionConfig, value: any) => {
    if (!editedQuestion) return;
    
    setEditedQuestion(prev => ({
      ...prev!,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleProfileToggle = (profile: RespondentType) => {
    if (!editedQuestion) return;
    
    const currentProfiles = editedQuestion.visibleFor;
    const newProfiles = currentProfiles.includes(profile)
      ? currentProfiles.filter(p => p !== profile)
      : [...currentProfiles, profile];
    
    handleChange('visibleFor', newProfiles);
  };

  const handleAddOption = () => {
    if (!editedQuestion) return;
    
    const newOption = {
      value: `option_${Date.now()}`,
      labelKey: `questions.${editedQuestion.id}.options.new`,
      labelFallback: 'Nouvelle option',
    };
    
    handleChange('options', [...(editedQuestion.options || []), newOption]);
  };

  const handleRemoveOption = (index: number) => {
    if (!editedQuestion || !editedQuestion.options) return;
    
    const newOptions = editedQuestion.options.filter((_, i) => i !== index);
    handleChange('options', newOptions);
  };

  const handleUpdateOption = (index: number, field: 'value' | 'labelFallback', value: string) => {
    if (!editedQuestion || !editedQuestion.options) return;
    
    const newOptions = [...editedQuestion.options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value,
    };
    handleChange('options', newOptions);
  };

  const handleSave = () => {
    if (!editedQuestion) return;
    
    // Validation
    if (!editedQuestion.labelFallback.trim()) {
      alert('Le libellé de la question est obligatoire');
      return;
    }
    
    if (editedQuestion.visibleFor.length === 0) {
      alert('Veuillez sélectionner au moins un profil');
      return;
    }
    
    if (['radio', 'multi-select'].includes(editedQuestion.type) && (!editedQuestion.options || editedQuestion.options.length === 0)) {
      alert('Ce type de question nécessite au moins une option');
      return;
    }
    
    onSave(editedQuestion);
    setHasChanges(false);
  };

  const handleClose = () => {
    if (hasChanges) {
      if (!confirm('Vous avez des modifications non sauvegardées. Voulez-vous vraiment fermer ?')) {
        return;
      }
    }
    onClose();
  };

  if (!editedQuestion) return null;

  const requiresOptions = ['radio', 'multi-select'].includes(editedQuestion.type);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-900">
            <Settings className="w-5 h-5 text-cyan-600" />
            Modifier la question
          </DialogTitle>
          <DialogDescription>
            ID: <code className="text-xs bg-slate-100 px-2 py-1 rounded">{editedQuestion.id}</code>
            {hasChanges && (
              <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-600 border-orange-300">
                Non sauvegardé
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Section: Profils visibles */}
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-slate-600" />
                <Label className="text-slate-900">Visible pour les profils</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILES.map(profile => (
                  <Badge
                    key={profile.value}
                    variant="outline"
                    className={`cursor-pointer transition-all ${
                      editedQuestion.visibleFor.includes(profile.value)
                        ? profile.color
                        : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                    }`}
                    onClick={() => handleProfileToggle(profile.value)}
                  >
                    <span className="mr-1">{profile.icon}</span>
                    {profile.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section: Type de question */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-slate-900">
              <Type className="w-4 h-4" />
              Type de question
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {QUESTION_TYPES.map(type => (
                <Button
                  key={type.value}
                  type="button"
                  variant="outline"
                  className={`h-auto py-3 px-3 flex flex-col items-center gap-1 ${
                    editedQuestion.type === type.value
                      ? 'bg-cyan-50 border-cyan-400 text-cyan-700'
                      : 'bg-white hover:bg-slate-50'
                  }`}
                  onClick={() => handleChange('type', type.value)}
                >
                  <span className="text-xl">{type.icon}</span>
                  <span className="text-xs text-center">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Section: Textes */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label" className="text-slate-900">
                Libellé de la question <span className="text-red-500">*</span>
              </Label>
              <Input
                id="label"
                value={editedQuestion.labelFallback}
                onChange={(e) => handleChange('labelFallback', e.target.value)}
                placeholder="Ex: Quel est le nom de votre entreprise ?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="placeholder" className="text-slate-900">
                Placeholder (texte d'exemple)
              </Label>
              <Input
                id="placeholder"
                value={editedQuestion.placeholderFallback || ''}
                onChange={(e) => handleChange('placeholderFallback', e.target.value)}
                placeholder="Ex: ACME Corporation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-900">
                Description (aide contextuelle)
              </Label>
              <Textarea
                id="description"
                value={editedQuestion.descriptionFallback || ''}
                onChange={(e) => handleChange('descriptionFallback', e.target.value)}
                placeholder="Information complémentaire pour aider le répondant..."
                rows={2}
              />
            </div>
          </div>

          {/* Section: Options (pour radio/multi-select) */}
          <AnimatePresence>
            {requiresOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="flex items-center gap-2 text-blue-900">
                        <ListOrdered className="w-4 h-4" />
                        Options de réponse
                      </Label>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAddOption}
                        className="bg-white hover:bg-blue-100 border-blue-300"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {(editedQuestion.options || []).map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center gap-2"
                        >
                          <Input
                            value={option.value}
                            onChange={(e) => handleUpdateOption(index, 'value', e.target.value)}
                            placeholder="Valeur"
                            className="flex-1 bg-white"
                          />
                          <Input
                            value={option.labelFallback}
                            onChange={(e) => handleUpdateOption(index, 'labelFallback', e.target.value)}
                            placeholder="Libellé"
                            className="flex-1 bg-white"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveOption(index)}
                            className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                      
                      {(!editedQuestion.options || editedQuestion.options.length === 0) && (
                        <div className="text-center py-4 text-blue-600 text-sm">
                          <AlertCircle className="w-5 h-5 mx-auto mb-2" />
                          Aucune option. Cliquez sur "Ajouter" pour créer des options.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section: Validation */}
          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="required" className="text-slate-900">
                    Question obligatoire
                  </Label>
                  <p className="text-sm text-slate-600">
                    Le répondant devra obligatoirement répondre à cette question
                  </p>
                </div>
                <Switch
                  id="required"
                  checked={editedQuestion.required}
                  onCheckedChange={(checked) => handleChange('required', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Info: Traductions */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-3">
              <div className="flex items-start gap-2 text-amber-900">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <strong>Note :</strong> Les modifications seront appliquées aux traductions automatiquement. 
                  Les clés de traduction (<code className="text-xs bg-amber-100 px-1 py-0.5 rounded">{editedQuestion.labelKey}</code>) 
                  restent inchangées.
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
            className="bg-white"
          >
            <X className="w-4 h-4 mr-2" />
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}