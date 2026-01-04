import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Brain, 
  Zap, 
  Target, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Loader2,
  RefreshCw,
  Info,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface ModelInfo {
  name: string;
  alias: string;
  description: string;
  tier: string;
  speed: string;
  intelligence: string;
  costTier: string;
  pricing: {
    input: number;
    output: number;
  };
  inputTokensPerMin: number;
  outputTokensPerMin: number;
  requestsPerMin: number;
  contextWindow: number;
  contextWindowBeta?: number;
  maxOutput: number;
  extendedThinking: boolean;
  priorityTier: boolean;
  knowledgeCutoff: string;
  trainingDataCutoff: string;
}

const SPEED_ICONS = {
  fastest: { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Très rapide' },
  fast: { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', label: 'Rapide' },
  medium: { icon: Target, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Moyen' },
  moderate: { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Modéré' },
  slow: { icon: Clock, color: 'text-red-600', bg: 'bg-red-50', label: 'Lent' },
};

const INTELLIGENCE_LEVELS = {
  'highest': { label: 'Maximum', color: 'text-purple-700', dots: 5 },
  'high': { label: 'Élevée', color: 'text-indigo-600', dots: 4 },
  'medium-high': { label: 'Moyenne-Haute', color: 'text-blue-600', dots: 3 },
  'medium': { label: 'Moyenne', color: 'text-cyan-600', dots: 2 },
};

const COST_TIERS = {
  'premium': { label: 'Premium', color: 'bg-red-100 text-red-700', emoji: '💰💰💰' },
  'standard': { label: 'Standard', color: 'bg-yellow-100 text-yellow-700', emoji: '💰💰' },
  'economy': { label: 'Économique', color: 'bg-green-100 text-green-700', emoji: '💰' },
};

export function ClaudeModelSelector() {
  const [models, setModels] = useState<Record<string, ModelInfo>>({});
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/available-models`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();

      if (data.success) {
        setModels(data.models);
        setSelectedModel(data.selectedModel);
      }
    } catch (error) {
      console.error('Error loading models:', error);
      toast.error('Erreur lors du chargement des modèles');
    } finally {
      setIsLoading(false);
    }
  };

  const saveModel = async (modelId: string) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/save-selected-model`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ model: modelId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSelectedModel(modelId);
        toast.success('✅ Modèle sauvegardé avec succès !', {
          description: `${models[modelId].name} est maintenant le modèle par défaut`,
        });
      } else {
        throw new Error(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error: any) {
      console.error('Error saving model:', error);
      toast.error('❌ Erreur: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const detectModels = async () => {
    setIsDetecting(true);
    toast.info('🔍 Détection des modèles disponibles...', {
      description: 'Cela peut prendre quelques secondes',
    });

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/detect-available-models`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('✅ Détection terminée !', {
          description: `${data.totalAvailable}/${data.totalTested} modèles disponibles`,
        });
        loadModels();
      } else {
        throw new Error(data.error || 'Erreur lors de la détection');
      }
    } catch (error: any) {
      console.error('Error detecting models:', error);
      toast.error('❌ Erreur: ' + error.message);
    } finally {
      setIsDetecting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Modèles Claude</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  // Séparer les modèles 4.5 et 3.x
  const models45 = Object.entries(models).filter(([id]) => id.includes('4-5'));
  const models3x = Object.entries(models).filter(([id]) => !id.includes('4-5'));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900">Sélection du modèle Claude</CardTitle>
                <CardDescription className="text-purple-700">
                  Choisissez le modèle IA utilisé pour les analyses et suggestions
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={detectModels}
              disabled={isDetecting}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              {isDetecting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Détecter les modèles
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-200">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-purple-800">
                <p className="mb-2">
                  <strong>Modèle actuel :</strong> {models[selectedModel]?.name || 'Non configuré'}
                </p>
                <p className="text-xs text-purple-600">
                  Le modèle sélectionné sera utilisé pour l'AI Workflow Advisor, les analyses de marché, et le scoring des prospects.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claude 4.5 (Latest) */}
      {models45.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg text-gray-900">Claude 4.5 (Dernière génération)</h3>
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              🆕 Nouveau
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {models45.map(([modelId, modelInfo]) => (
              <ModelCard
                key={modelId}
                modelId={modelId}
                modelInfo={modelInfo}
                isSelected={selectedModel === modelId}
                isSaving={isSaving}
                onSelect={saveModel}
              />
            ))}
          </div>
        </div>
      )}

      {/* Claude 3.x (Previous) */}
      {models3x.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg text-gray-900">Claude 3.x (Génération précédente)</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {models3x.map(([modelId, modelInfo]) => (
              <ModelCard
                key={modelId}
                modelId={modelId}
                modelInfo={modelInfo}
                isSelected={selectedModel === modelId}
                isSaving={isSaving}
                onSelect={saveModel}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ModelCardProps {
  modelId: string;
  modelInfo: ModelInfo;
  isSelected: boolean;
  isSaving: boolean;
  onSelect: (modelId: string) => void;
}

function ModelCard({ modelId, modelInfo, isSelected, isSaving, onSelect }: ModelCardProps) {
  const speedConfig = SPEED_ICONS[modelInfo.speed as keyof typeof SPEED_ICONS] || SPEED_ICONS.medium;
  const intelligenceConfig = INTELLIGENCE_LEVELS[modelInfo.intelligence as keyof typeof INTELLIGENCE_LEVELS] || INTELLIGENCE_LEVELS.medium;
  const costConfig = COST_TIERS[modelInfo.costTier as keyof typeof COST_TIERS] || COST_TIERS.standard;

  const SpeedIcon = speedConfig.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`overflow-hidden transition-all cursor-pointer ${
          isSelected
            ? 'border-2 border-purple-500 shadow-xl ring-4 ring-purple-100'
            : 'border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg'
        }`}
        onClick={() => onSelect(modelId)}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg text-gray-900">{modelInfo.name}</h3>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{modelInfo.description}</p>
              <code className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {modelInfo.alias}
              </code>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Vitesse */}
            <div className={`p-3 rounded-xl ${speedConfig.bg}`}>
              <div className="flex items-center gap-2 mb-1">
                <SpeedIcon className={`w-4 h-4 ${speedConfig.color}`} />
                <span className="text-xs text-gray-700">Vitesse</span>
              </div>
              <p className={`text-sm ${speedConfig.color}`}>{speedConfig.label}</p>
            </div>

            {/* Intelligence */}
            <div className="p-3 bg-indigo-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Brain className="w-4 h-4 text-indigo-600" />
                <span className="text-xs text-gray-700">Intelligence</span>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: intelligenceConfig.dots }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                ))}
              </div>
            </div>

            {/* Prix */}
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-700">Prix</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge className={costConfig.color}>
                  {costConfig.emoji}
                </Badge>
              </div>
            </div>

            {/* Output */}
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-700">Max output</span>
              </div>
              <p className="text-sm text-gray-900">{(modelInfo.maxOutput / 1000).toFixed(0)}K</p>
            </div>
          </div>

          {/* Pricing details */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
            <div>
              <span className="text-gray-500">Input:</span>{' '}
              <span className="text-gray-900">${modelInfo.pricing.input}/MTok</span>
            </div>
            <div>
              <span className="text-gray-500">Output:</span>{' '}
              <span className="text-gray-900">${modelInfo.pricing.output}/MTok</span>
            </div>
            <div>
              <span className="text-gray-500">Context:</span>{' '}
              <span className="text-gray-900">{(modelInfo.contextWindow / 1000).toFixed(0)}K</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {modelInfo.extendedThinking && (
              <Badge className="bg-purple-100 text-purple-700 text-xs">
                🧠 Extended Thinking
              </Badge>
            )}
            {modelInfo.priorityTier && (
              <Badge className="bg-blue-100 text-blue-700 text-xs">
                ⚡ Priority Tier
              </Badge>
            )}
            {modelInfo.contextWindowBeta && (
              <Badge className="bg-green-100 text-green-700 text-xs">
                🚀 1M context (beta)
              </Badge>
            )}
          </div>

          {/* Button */}
          <Button
            onClick={() => onSelect(modelId)}
            disabled={isSaving || isSelected}
            className={`w-full ${
              isSelected
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
            } text-white`}
          >
            {isSelected ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Modèle actif
              </>
            ) : isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              <>
                Sélectionner ce modèle
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
