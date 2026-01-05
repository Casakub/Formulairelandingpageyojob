import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Bot, 
  Sparkles, 
  Save,
  Settings,
  Info,
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';

interface MCPAdvancedSettingsProps {
  onClose: () => void;
}

export function MCPAdvancedSettings({ onClose }: MCPAdvancedSettingsProps) {
  // États pour les paramètres
  const [model, setModel] = useState('claude-sonnet-4-5-20250929');
  const [temperature, setTemperature] = useState(0.3);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [contextWindow, setContextWindow] = useState(5);
  const [batchMode, setBatchMode] = useState(true);
  const [autoValidate, setAutoValidate] = useState(false);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [customPrompt, setCustomPrompt] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    
    const settings = {
      model,
      temperature,
      maxTokens,
      contextWindow,
      batchMode,
      autoValidate,
      preserveFormatting,
      customPrompt,
    };

    // Sauvegarder dans localStorage pour persistance
    localStorage.setItem('mcp_settings', JSON.stringify(settings));
    
    // Simulation d'un délai
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSaving(false);
    console.log('✅ MCP Settings saved:', settings);
    
    // Fermer après sauvegarde
    setTimeout(() => onClose(), 500);
  };

  const resetToDefaults = () => {
    setModel('claude-sonnet-4-5-20250929');
    setTemperature(0.3);
    setMaxTokens(1000);
    setContextWindow(5);
    setBatchMode(true);
    setAutoValidate(false);
    setPreserveFormatting(true);
    setCustomPrompt('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-violet-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  Paramètres avancés MCP
                </CardTitle>
                <CardDescription className="text-violet-100 mt-2">
                  Configurez finement le comportement de l'IA Claude pour vos traductions
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Info Banner */}
            <Alert className="border-violet-200 bg-violet-50">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <AlertDescription className="text-violet-800 text-sm">
                Ces paramètres influencent la qualité et le style des traductions générées par Claude via MCP.
              </AlertDescription>
            </Alert>

            {/* Model Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-violet-600" />
                  Modèle Claude
                </Label>
                <Badge variant="outline" className="bg-violet-50 text-violet-700">
                  Recommandé
                </Badge>
              </div>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="claude-sonnet-4-5-20250929">
                    Claude 4.5 Sonnet (Recommandé)
                  </SelectItem>
                  <SelectItem value="claude-3-opus-20240229">
                    Claude 3 Opus (Plus puissant)
                  </SelectItem>
                  <SelectItem value="claude-3-haiku-20240307">
                    Claude 3 Haiku (Plus rapide)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Sonnet offre le meilleur équilibre qualité/vitesse pour les traductions
              </p>
            </div>

            <Separator />

            {/* Temperature */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-violet-600" />
                  Température : {temperature.toFixed(1)}
                </Label>
                <span className="text-xs text-slate-500">
                  {temperature < 0.5 ? 'Précis' : temperature < 0.8 ? 'Équilibré' : 'Créatif'}
                </span>
              </div>
              <Slider
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0.0 (Déterministe)</span>
                <span>1.0 (Créatif)</span>
              </div>
              <p className="text-xs text-slate-500">
                💡 Recommandé : 0.3 pour des traductions précises et cohérentes
              </p>
            </div>

            <Separator />

            {/* Max Tokens */}
            <div className="space-y-3">
              <Label>Tokens maximum par traduction</Label>
              <Input
                type="number"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                min={100}
                max={4000}
              />
              <p className="text-xs text-slate-500">
                Limite la longueur des réponses. 1000 tokens ≈ 750 mots.
              </p>
            </div>

            <Separator />

            {/* Context Window */}
            <div className="space-y-3">
              <Label>Fenêtre de contexte (questions)</Label>
              <Select value={contextWindow.toString()} onValueChange={(v) => setContextWindow(parseInt(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 question (isolée)</SelectItem>
                  <SelectItem value="3">3 questions (contexte léger)</SelectItem>
                  <SelectItem value="5">5 questions (contexte moyen)</SelectItem>
                  <SelectItem value="10">10 questions (contexte large)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Nombre de questions précédentes envoyées à l'IA pour maintenir la cohérence terminologique
              </p>
            </div>

            <Separator />

            {/* Options avancées */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Settings className="w-4 h-4 text-violet-600" />
                Options avancées
              </h4>

              <div className="space-y-4">
                {/* Batch Mode */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <Label className="cursor-pointer">Mode batch (par lots)</Label>
                    <p className="text-xs text-slate-500 mt-1">
                      Traiter plusieurs questions en une seule requête pour plus de cohérence
                    </p>
                  </div>
                  <Switch
                    checked={batchMode}
                    onCheckedChange={setBatchMode}
                    className="data-[state=checked]:bg-violet-600"
                  />
                </div>

                {/* Auto Validate */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <Label className="cursor-pointer">Validation automatique</Label>
                    <p className="text-xs text-slate-500 mt-1">
                      Marquer les traductions comme "Validé" au lieu de "Auto-MCP"
                    </p>
                  </div>
                  <Switch
                    checked={autoValidate}
                    onCheckedChange={setAutoValidate}
                    className="data-[state=checked]:bg-violet-600"
                  />
                </div>

                {/* Preserve Formatting */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <Label className="cursor-pointer">Préserver le formatage</Label>
                    <p className="text-xs text-slate-500 mt-1">
                      Conserver la ponctuation, majuscules et structure du texte source
                    </p>
                  </div>
                  <Switch
                    checked={preserveFormatting}
                    onCheckedChange={setPreserveFormatting}
                    className="data-[state=checked]:bg-violet-600"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Custom Prompt */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Info className="w-4 h-4 text-violet-600" />
                Prompt personnalisé (optionnel)
              </Label>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ajoutez des instructions spécifiques pour l'IA...&#10;&#10;Exemple :&#10;- Utilise un ton professionnel et formel&#10;- Privilégie le vocabulaire du recrutement&#10;- Adapte les expressions idiomatiques"
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-slate-500">
                Instructions additionnelles pour guider le style et le ton des traductions
              </p>
            </div>

            {/* Warning */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 text-sm">
                <strong>Important :</strong> Des paramètres trop créatifs (température élevée) peuvent produire des traductions moins précises.
              </AlertDescription>
            </Alert>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={resetToDefaults}
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Réinitialiser
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white gap-2"
                >
                  {saving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Settings className="w-4 h-4" />
                      </motion.div>
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Success Message */}
            {saving && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Paramètres sauvegardés localement
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}