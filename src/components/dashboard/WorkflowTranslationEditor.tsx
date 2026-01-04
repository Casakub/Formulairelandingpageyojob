import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, X, Save, CheckCircle2, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// 22 langues supportées par YOJOB
export const SUPPORTED_LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴', nativeName: 'Română' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬', nativeName: 'Български' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺', nativeName: 'Magyar' },
  { code: 'cz', name: 'Czech', flag: '🇨🇿', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰', nativeName: 'Slovenčina' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷', nativeName: 'Hrvatski' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮', nativeName: 'Slovenščina' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹', nativeName: 'Lietuvių' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻', nativeName: 'Latviešu' },
  { code: 'ee', name: 'Estonian', flag: '🇪🇪', nativeName: 'Eesti' },
  { code: 'el', name: 'Greek', flag: '🇬🇷', nativeName: 'Ελληνικά' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', flag: '🇩🇰', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮', nativeName: 'Suomi' },
];

interface WorkflowTranslation {
  name: string;
  description: string;
}

interface StepTranslation {
  name: string;
  description: string;
}

interface WorkflowTranslations {
  [languageCode: string]: {
    workflow: WorkflowTranslation;
    steps: StepTranslation[];
  };
}

interface WorkflowTranslationEditorProps {
  open: boolean;
  onClose: () => void;
  workflowName: string;
  workflowDescription: string;
  steps: Array<{ name: string; description: string }>;
  existingTranslations?: WorkflowTranslations;
  onSave: (translations: WorkflowTranslations) => void;
}

export function WorkflowTranslationEditor({
  open,
  onClose,
  workflowName,
  workflowDescription,
  steps,
  existingTranslations = {},
  onSave,
}: WorkflowTranslationEditorProps) {
  const [translations, setTranslations] = useState<WorkflowTranslations>({});
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [isAutoTranslating, setIsAutoTranslating] = useState(false);
  const [completionStatus, setCompletionStatus] = useState<Record<string, number>>({});

  useEffect(() => {
    if (open) {
      // Initialiser avec les traductions existantes ou créer une structure vide
      const initialTranslations: WorkflowTranslations = {};
      
      SUPPORTED_LANGUAGES.forEach(lang => {
        if (lang.code === 'fr') return; // Le français est la langue source
        
        initialTranslations[lang.code] = existingTranslations[lang.code] || {
          workflow: {
            name: '',
            description: '',
          },
          steps: steps.map(() => ({
            name: '',
            description: '',
          })),
        };
      });
      
      setTranslations(initialTranslations);
      calculateCompletionStatus(initialTranslations);
    }
  }, [open, existingTranslations, steps]);

  const calculateCompletionStatus = (trans: WorkflowTranslations) => {
    const status: Record<string, number> = {};
    
    Object.entries(trans).forEach(([langCode, langData]) => {
      let filledFields = 0;
      const totalFields = 2 + (steps.length * 2); // workflow (name+desc) + steps (name+desc each)
      
      if (langData.workflow.name) filledFields++;
      if (langData.workflow.description) filledFields++;
      
      langData.steps.forEach(step => {
        if (step.name) filledFields++;
        if (step.description) filledFields++;
      });
      
      status[langCode] = Math.round((filledFields / totalFields) * 100);
    });
    
    setCompletionStatus(status);
  };

  const updateTranslation = (
    langCode: string,
    field: 'workflow' | 'step',
    subfield: 'name' | 'description',
    value: string,
    stepIndex?: number
  ) => {
    setTranslations(prev => {
      const updated = { ...prev };
      
      if (field === 'workflow') {
        updated[langCode] = {
          ...updated[langCode],
          workflow: {
            ...updated[langCode].workflow,
            [subfield]: value,
          },
        };
      } else if (field === 'step' && stepIndex !== undefined) {
        const newSteps = [...updated[langCode].steps];
        newSteps[stepIndex] = {
          ...newSteps[stepIndex],
          [subfield]: value,
        };
        updated[langCode] = {
          ...updated[langCode],
          steps: newSteps,
        };
      }
      
      calculateCompletionStatus(updated);
      return updated;
    });
  };

  const autoTranslate = async (targetLangCode: string) => {
    setIsAutoTranslating(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/auto-translate-workflow`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            sourceLang: 'fr',
            targetLang: targetLangCode,
            workflow: {
              name: workflowName,
              description: workflowDescription,
            },
            steps: steps,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTranslations(prev => ({
          ...prev,
          [targetLangCode]: data.translation,
        }));
        
        calculateCompletionStatus({
          ...translations,
          [targetLangCode]: data.translation,
        });
        
        toast.success(`✅ Traduction ${SUPPORTED_LANGUAGES.find(l => l.code === targetLangCode)?.flag} générée !`);
      } else {
        throw new Error(data.error || 'Erreur lors de la traduction automatique');
      }
    } catch (error: any) {
      console.error('Erreur auto-traduction:', error);
      toast.error('❌ Erreur: ' + error.message);
    } finally {
      setIsAutoTranslating(false);
    }
  };

  const autoTranslateAll = async () => {
    setIsAutoTranslating(true);
    toast.info('🔄 Traduction automatique en cours...', {
      description: 'Génération des 21 traductions avec IA',
    });

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/auto-translate-workflow-all`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            workflow: {
              name: workflowName,
              description: workflowDescription,
            },
            steps: steps,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setTranslations(data.translations);
        calculateCompletionStatus(data.translations);
        
        toast.success('✅ 21 traductions générées avec succès !', {
          description: 'Vous pouvez maintenant les modifier si nécessaire',
        });
      } else {
        throw new Error(data.error || 'Erreur lors de la traduction automatique');
      }
    } catch (error: any) {
      console.error('Erreur auto-traduction:', error);
      toast.error('❌ Erreur: ' + error.message);
    } finally {
      setIsAutoTranslating(false);
    }
  };

  const handleSave = () => {
    onSave(translations);
    toast.success('✅ Traductions sauvegardées !');
    onClose();
  };

  if (!open) return null;

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === activeLanguage);
  const currentTranslation = translations[activeLanguage];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Languages className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl">Traductions du Workflow</h2>
                  <p className="text-purple-100 text-sm mt-1">
                    Gérez les traductions pour les 22 langues supportées
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Source (French) */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇫🇷</span>
                <span className="text-sm text-purple-100">Texte source (Français)</span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-purple-200">Nom :</span>
                  <div className="text-white mt-1">{workflowName}</div>
                </div>
                <div>
                  <span className="text-xs text-purple-200">Description :</span>
                  <div className="text-white/90 text-sm mt-1">{workflowDescription}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
            {/* Auto-translate all button */}
            <div className="mb-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-sm text-slate-900">Traduction automatique par IA</div>
                  <div className="text-xs text-purple-600">
                    Générez automatiquement toutes les traductions en 1 clic
                  </div>
                </div>
              </div>
              <Button
                onClick={autoTranslateAll}
                disabled={isAutoTranslating}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                {isAutoTranslating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Traduction...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Traduire tout (21 langues)
                  </>
                )}
              </Button>
            </div>

            {/* Language tabs */}
            <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
              <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0 mb-6">
                {SUPPORTED_LANGUAGES.filter(l => l.code !== 'fr').map(lang => {
                  const completion = completionStatus[lang.code] || 0;
                  
                  return (
                    <TabsTrigger
                      key={lang.code}
                      value={lang.code}
                      className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 border border-slate-200 rounded-lg px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-xs hidden sm:inline">{lang.nativeName}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            completion === 100
                              ? 'bg-green-100 text-green-700 border-green-300'
                              : completion > 0
                              ? 'bg-orange-100 text-orange-700 border-orange-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          {completion}%
                        </Badge>
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {SUPPORTED_LANGUAGES.filter(l => l.code !== 'fr').map(lang => (
                <TabsContent key={lang.code} value={lang.code} className="space-y-6">
                  {/* Auto-translate button for this language */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{lang.flag}</span>
                      <h3 className="text-lg text-slate-900">{lang.nativeName}</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => autoTranslate(lang.code)}
                      disabled={isAutoTranslating}
                      className="gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Traduire automatiquement
                    </Button>
                  </div>

                  {currentTranslation && (
                    <>
                      {/* Workflow translation */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-slate-900 text-base">Informations du Workflow</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-slate-700">Nom du workflow</Label>
                            <Input
                              value={currentTranslation.workflow.name}
                              onChange={e =>
                                updateTranslation(lang.code, 'workflow', 'name', e.target.value)
                              }
                              placeholder={workflowName}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-700">Description</Label>
                            <Textarea
                              value={currentTranslation.workflow.description}
                              onChange={e =>
                                updateTranslation(lang.code, 'workflow', 'description', e.target.value)
                              }
                              placeholder={workflowDescription}
                              rows={3}
                              className="mt-1"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Steps translations */}
                      <div className="space-y-4">
                        <h4 className="text-slate-900">Étapes du workflow</h4>
                        {steps.map((step, index) => (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
                                <Badge variant="outline" className="rounded-full">
                                  {index + 1}
                                </Badge>
                                Étape {index + 1}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <Label className="text-slate-700 text-xs">
                                  Nom de l'étape
                                  <span className="text-slate-500 ml-2">({step.name})</span>
                                </Label>
                                <Input
                                  value={currentTranslation.steps[index]?.name || ''}
                                  onChange={e =>
                                    updateTranslation(lang.code, 'step', 'name', e.target.value, index)
                                  }
                                  placeholder={step.name}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label className="text-slate-700 text-xs">
                                  Description
                                  <span className="text-slate-500 ml-2">({step.description})</span>
                                </Label>
                                <Textarea
                                  value={currentTranslation.steps[index]?.description || ''}
                                  onChange={e =>
                                    updateTranslation(lang.code, 'step', 'description', e.target.value, index)
                                  }
                                  placeholder={step.description}
                                  rows={2}
                                  className="mt-1"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {Object.values(completionStatus).filter(c => c === 100).length} / 21 langues complétées
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les traductions
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
