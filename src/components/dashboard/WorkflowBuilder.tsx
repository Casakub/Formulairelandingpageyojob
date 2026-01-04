import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  X, 
  Mail, 
  CheckSquare, 
  Tag, 
  UserCog, 
  Webhook, 
  Bell,
  Clock,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Save,
  Play,
  Workflow,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { AutomationWorkflow, AutomationStep, AutomationTrigger, AutomationCondition } from '../../types/automations';

interface WorkflowBuilderProps {
  open: boolean;
  onClose: () => void;
  onSave: (workflow: Partial<AutomationWorkflow>) => void;
  editingWorkflow?: AutomationWorkflow | null;
}

const TRIGGER_OPTIONS = [
  { value: 'prospect_created', label: 'Nouveau prospect créé', icon: Plus },
  { value: 'status_changed', label: 'Changement de statut', icon: UserCog },
  { value: 'tag_added', label: 'Tag ajouté', icon: Tag },
  { value: 'inactivity', label: 'Inactivité (X jours)', icon: Clock },
];

const ACTION_OPTIONS = [
  { value: 'send_email', label: 'Envoyer un email', icon: Mail, color: 'from-blue-500 to-cyan-500' },
  { value: 'create_task', label: 'Créer une tâche', icon: CheckSquare, color: 'from-green-500 to-emerald-500' },
  { value: 'add_tag', label: 'Ajouter un tag', icon: Tag, color: 'from-purple-500 to-violet-500' },
  { value: 'change_status', label: 'Changer le statut', icon: UserCog, color: 'from-orange-500 to-amber-500' },
  { value: 'send_webhook', label: 'Appeler un webhook', icon: Webhook, color: 'from-pink-500 to-red-500' },
  { value: 'notify_team', label: 'Notifier l\'équipe', icon: Bell, color: 'from-indigo-500 to-blue-500' },
];

const DELAY_PRESETS = [
  { value: 0, label: 'Immédiat' },
  { value: 60, label: '1 heure' },
  { value: 1440, label: '1 jour (24h)' },
  { value: 2880, label: '2 jours' },
  { value: 4320, label: '3 jours' },
  { value: 10080, label: '7 jours' },
  { value: 20160, label: '14 jours' },
];

export function WorkflowBuilder({ open, onClose, onSave, editingWorkflow }: WorkflowBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1); // 1=Info, 2=Trigger, 3=Conditions, 4=Actions
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  
  const [trigger, setTrigger] = useState<AutomationTrigger>({ type: 'prospect_created', config: {} });
  
  const [conditions, setConditions] = useState<AutomationCondition[]>([]);
  
  const [steps, setSteps] = useState<AutomationStep[]>([]);

  // Synchroniser les états avec editingWorkflow quand il change
  useEffect(() => {
    if (editingWorkflow) {
      setWorkflowName(editingWorkflow.name);
      setWorkflowDescription(editingWorkflow.description);
      setTrigger(editingWorkflow.trigger);
      setConditions(editingWorkflow.conditions || []);
      setSteps(editingWorkflow.steps || []);
      setCurrentStep(1);
    } else {
      // Réinitialiser pour un nouveau workflow
      setWorkflowName('');
      setWorkflowDescription('');
      setTrigger({ type: 'prospect_created', config: {} });
      setConditions([]);
      setSteps([]);
      setCurrentStep(1);
    }
  }, [editingWorkflow, open]);

  const handleAddStep = () => {
    const newStep: AutomationStep = {
      id: `step-${Date.now()}`,
      type: 'send_email',
      delay_minutes: 0,
      config: {},
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleUpdateStep = (index: number, field: keyof AutomationStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const handleUpdateStepConfig = (index: number, configField: string, value: any) => {
    const updated = [...steps];
    updated[index] = {
      ...updated[index],
      config: { ...updated[index].config, [configField]: value },
    };
    setSteps(updated);
  };

  const handleAddCondition = () => {
    setConditions([
      ...conditions,
      { type: 'prospect_type', operator: 'equals', value: 'client' },
    ]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const workflow: Partial<AutomationWorkflow> = {
      name: workflowName,
      description: workflowDescription,
      trigger,
      conditions,
      steps,
      status: 'draft',
    };
    
    // Ajouter l'ID si on édite un workflow existant
    if (editingWorkflow) {
      (workflow as any).id = editingWorkflow.id;
    }
    
    onSave(workflow);
    handleReset();
  };

  const handleReset = () => {
    setCurrentStep(1);
    setWorkflowName('');
    setWorkflowDescription('');
    setTrigger({ type: 'prospect_created', config: {} });
    setConditions([]);
    setSteps([]);
    onClose();
  };

  const WIZARD_STEPS = [
    { number: 1, title: 'Informations', description: 'Nom et description' },
    { number: 2, title: 'Déclencheur', description: 'Quand lancer ce workflow' },
    { number: 3, title: 'Conditions', description: 'Filtres optionnels' },
    { number: 4, title: 'Actions', description: 'Étapes du workflow' },
  ];

  const isStepValid = () => {
    if (currentStep === 1) return workflowName.trim().length > 0;
    if (currentStep === 2) return trigger.type.length > 0;
    if (currentStep === 3) return true; // Conditions are optional
    if (currentStep === 4) return steps.length > 0;
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 to-white border-0 shadow-2xl p-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              {editingWorkflow ? 'Modifier le workflow' : 'Nouveau workflow'}
            </DialogTitle>
            <DialogDescription className="text-white/90 text-sm mt-2">
              Créez un workflow automatique en 4 étapes simples
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Modern Progress Steps */}
          <div className="flex items-center justify-between mb-8 mt-6 relative">
            {/* Connection line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-10" />
            <div 
              className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 -z-10"
              style={{ width: `${((currentStep - 1) / (WIZARD_STEPS.length - 1)) * 100}%` }}
            />
            
            {WIZARD_STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                    currentStep === step.number
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 scale-110'
                      : currentStep > step.number
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                      : 'bg-white border-2 border-slate-300 text-slate-500 hover:border-blue-400'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </button>
                <div className="mt-3 text-center max-w-[100px]">
                  <div className={`text-sm transition-colors ${
                    currentStep === step.number 
                      ? 'text-blue-600 font-medium' 
                      : currentStep > step.number
                      ? 'text-green-600 font-medium'
                      : 'text-slate-600'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{step.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {/* Step 1: Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="workflow-name">Nom du workflow *</Label>
                  <Input
                    id="workflow-name"
                    placeholder="Ex: Nurturing Waitlist"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="workflow-description">Description</Label>
                  <Textarea
                    id="workflow-description"
                    placeholder="Décrivez l'objectif de ce workflow..."
                    value={workflowDescription}
                    onChange={(e) => setWorkflowDescription(e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Trigger */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Label>Déclencheur *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {TRIGGER_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setTrigger({ type: option.value as any, config: {} })}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          trigger.type === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2 ${trigger.type === option.value ? 'text-blue-600' : 'text-slate-600'}`} />
                        <div className="text-sm text-slate-900">{option.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Config fields based on trigger */}
                {trigger.type === 'status_changed' && (
                  <div className="mt-4 space-y-3">
                    <Label>Configuration</Label>
                    <Select
                      value={trigger.config.status_to || ''}
                      onValueChange={(value) => setTrigger({ ...trigger, config: { ...trigger.config, status_to: value } })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Vers quel statut ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qualified">Qualifié</SelectItem>
                        <SelectItem value="contacted">Contacté</SelectItem>
                        <SelectItem value="converted">Converti</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {trigger.type === 'inactivity' && (
                  <div className="mt-4">
                    <Label>Nombre de jours d'inactivité</Label>
                    <Input
                      type="number"
                      placeholder="30"
                      value={trigger.config.days_inactive || ''}
                      onChange={(e) => setTrigger({ ...trigger, config: { days_inactive: parseInt(e.target.value) } })}
                      className="mt-1"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Conditions */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Label>Conditions (optionnel)</Label>
                  <Button variant="outline" size="sm" onClick={handleAddCondition}>
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </Button>
                </div>

                {conditions.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg">
                    Aucune condition définie. Le workflow s'appliquera à tous les prospects.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {conditions.map((condition, idx) => (
                      <Card key={idx} className="border-slate-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Select
                              value={condition.type}
                              onValueChange={(value) => {
                                const updated = [...conditions];
                                updated[idx] = { ...updated[idx], type: value as any };
                                setConditions(updated);
                              }}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="prospect_type">Type</SelectItem>
                                <SelectItem value="country">Pays</SelectItem>
                                <SelectItem value="status">Statut</SelectItem>
                                <SelectItem value="source">Source</SelectItem>
                              </SelectContent>
                            </Select>

                            <Select
                              value={condition.operator}
                              onValueChange={(value) => {
                                const updated = [...conditions];
                                updated[idx] = { ...updated[idx], operator: value as any };
                                setConditions(updated);
                              }}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">égal à</SelectItem>
                                <SelectItem value="not_equals">différent de</SelectItem>
                              </SelectContent>
                            </Select>

                            <Input
                              placeholder="Valeur"
                              value={condition.value as string}
                              onChange={(e) => {
                                const updated = [...conditions];
                                updated[idx] = { ...updated[idx], value: e.target.value };
                                setConditions(updated);
                              }}
                              className="flex-1"
                            />

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveCondition(idx)}
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Actions */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Label>Actions du workflow *</Label>
                  <Button variant="outline" size="sm" onClick={handleAddStep}>
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter une action
                  </Button>
                </div>

                {steps.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg">
                    Ajoutez au moins une action pour créer le workflow
                  </div>
                ) : (
                  <div className="space-y-4">
                    {steps.map((step, idx) => {
                      const actionOption = ACTION_OPTIONS.find(a => a.value === step.type);
                      const ActionIcon = actionOption?.icon || Mail;

                      return (
                        <Card key={step.id} className="border-slate-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${actionOption?.color} flex items-center justify-center`}>
                                  <ActionIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-sm text-slate-900">Étape {idx + 1}</CardTitle>
                                  <Select
                                    value={step.type}
                                    onValueChange={(value) => handleUpdateStep(idx, 'type', value)}
                                  >
                                    <SelectTrigger className="w-48 mt-1">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {ACTION_OPTIONS.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveStep(idx)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {/* Delay */}
                            <div className="mb-3">
                              <Label className="text-xs">Délai avant exécution</Label>
                              <Select
                                value={step.delay_minutes?.toString() || '0'}
                                onValueChange={(value) => handleUpdateStep(idx, 'delay_minutes', parseInt(value))}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {DELAY_PRESETS.map(preset => (
                                    <SelectItem key={preset.value} value={preset.value.toString()}>
                                      {preset.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Config based on action type */}
                            {step.type === 'send_email' && (
                              <div className="space-y-2">
                                <Input
                                  placeholder="Sujet de l'email"
                                  value={step.config.subject || ''}
                                  onChange={(e) => handleUpdateStepConfig(idx, 'subject', e.target.value)}
                                />
                                <Textarea
                                  placeholder="Corps de l'email..."
                                  value={step.config.body || ''}
                                  onChange={(e) => handleUpdateStepConfig(idx, 'body', e.target.value)}
                                  rows={3}
                                />
                              </div>
                            )}

                            {step.type === 'create_task' && (
                              <Input
                                placeholder="Titre de la tâche"
                                value={step.config.task_title || ''}
                                onChange={(e) => handleUpdateStepConfig(idx, 'task_title', e.target.value)}
                              />
                            )}

                            {step.type === 'add_tag' && (
                              <Input
                                placeholder="Nom du tag"
                                value={step.config.tag_name || ''}
                                onChange={(e) => handleUpdateStepConfig(idx, 'tag_name', e.target.value)}
                              />
                            )}

                            {step.type === 'change_status' && (
                              <Select
                                value={step.config.new_status || ''}
                                onValueChange={(value) => handleUpdateStepConfig(idx, 'new_status', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Nouveau statut" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="contacted">Contacté</SelectItem>
                                  <SelectItem value="qualified">Qualifié</SelectItem>
                                  <SelectItem value="converted">Converti</SelectItem>
                                </SelectContent>
                              </Select>
                            )}

                            {step.type === 'send_webhook' && (
                              <Input
                                placeholder="URL du webhook"
                                value={step.config.webhook_url || ''}
                                onChange={(e) => handleUpdateStepConfig(idx, 'webhook_url', e.target.value)}
                              />
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : handleReset()}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {currentStep > 1 ? 'Précédent' : 'Annuler'}
            </Button>

            <div className="flex items-center gap-2">
              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSave();
                    }}
                    disabled={!isStepValid()}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Sauvegarder en brouillon
                  </Button>
                  <Button
                    onClick={() => {
                      handleSave();
                    }}
                    disabled={!isStepValid()}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Sauvegarder et activer
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}