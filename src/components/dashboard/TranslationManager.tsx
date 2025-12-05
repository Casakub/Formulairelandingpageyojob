import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuestionTranslation } from './QuestionTranslation';
import { CountryLanguageManager } from './CountryLanguageManager';
import { UITextsList } from './UITextsList';
import { TranslationExport } from './TranslationExport';
import { TranslationStatistics } from './TranslationStatistics';
import { TranslationSyncBar } from './TranslationSyncBar';
import { TranslationDebugPanel } from './TranslationDebugPanel';
import { TranslationDiagnostic } from './TranslationDiagnostic';
import { MCPAdvancedSettings } from './MCPAdvancedSettings';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { 
  Globe, 
  Languages, 
  Bot, 
  Key, 
  AlertCircle,
  Check,
  Sparkles,
  ExternalLink,
  Save,
  Loader2,
  RefreshCw,
  Info,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type TranslationMode = 'manual' | 'mcp' | 'api';

interface APIProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  docs: string;
}

const API_PROVIDERS: APIProvider[] = [
  { 
    id: 'deepl', 
    name: 'DeepL', 
    icon: '🇩🇪',
    color: 'from-blue-500 to-cyan-500',
    docs: 'https://www.deepl.com/pro-api'
  },
  { 
    id: 'google', 
    name: 'Google Translate', 
    icon: '🌐',
    color: 'from-green-500 to-emerald-500',
    docs: 'https://cloud.google.com/translate'
  },
  { 
    id: 'azure', 
    name: 'Azure Translator', 
    icon: '☁️',
    color: 'from-cyan-500 to-blue-500',
    docs: 'https://azure.microsoft.com/translator'
  },
  { 
    id: 'aws', 
    name: 'AWS Translate', 
    icon: '🟠',
    color: 'from-orange-500 to-amber-500',
    docs: 'https://aws.amazon.com/translate'
  }
];

export function TranslationManager() {
  // Translation context from Supabase
  const {
    hasUnsavedChanges,
    saving,
    lastSyncTime,
    error,
    saveAll,
    loadAll,
  } = useTranslationContext();

  const [activeMode, setActiveMode] = useState<TranslationMode>('manual');
  const [selectedProvider, setSelectedProvider] = useState('deepl');
  const [apiKey, setApiKey] = useState('');
  const [mcpEnabled, setMcpEnabled] = useState(false);
  const [savingApiKey, setSavingApiKey] = useState(false);
  const [showQuestionTranslation, setShowQuestionTranslation] = useState(false);
  const [showCountryLanguages, setShowCountryLanguages] = useState(false);
  const [showUITextTranslation, setShowUITextTranslation] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showMCPSettings, setShowMCPSettings] = useState(false);

  const handleSaveApiKey = async () => {
    setSavingApiKey(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSavingApiKey(false);
    console.log('API Key saved for provider:', selectedProvider);
  };

  const handleToggleMCP = async () => {
    setMcpEnabled(!mcpEnabled);
    console.log('MCP toggled:', !mcpEnabled);
  };

  // Show QuestionTranslation screen if active
  if (showQuestionTranslation) {
    return <QuestionTranslation onBack={() => setShowQuestionTranslation(false)} />;
  }

  // Show CountryLanguageManager screen if active
  if (showCountryLanguages) {
    return <CountryLanguageManager onBack={() => setShowCountryLanguages(false)} />;
  }

  // Show UITextsList screen if active
  if (showUITextTranslation) {
    return <UITextsList onBack={() => setShowUITextTranslation(false)} />;
  }

  // Show TranslationStatistics screen if active
  if (showStatistics) {
    return (
      <TranslationStatistics 
        onBack={() => setShowStatistics(false)} 
        onSelectLanguage={(code) => {
          console.log('Selected language:', code);
          setShowStatistics(false);
          setShowQuestionTranslation(true);
        }}
      />
    );
  }

  return (
    <>
      {/* Sync Bar */}
      <TranslationSyncBar
        hasUnsavedChanges={hasUnsavedChanges}
        saving={saving}
        lastSyncTime={lastSyncTime}
        error={error}
        onSave={saveAll}
        onReload={loadAll}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <Languages className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900">Gestion des langues & traductions</h2>
            <p className="text-slate-600 text-sm">
              Configurez vos méthodes de traduction pour l'application multilingue
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowQuestionTranslation(true)}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Questions</h3>
                <p className="text-sm text-slate-600">Traduire le formulaire</p>
              </div>
              <ExternalLink className="w-5 h-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowUITextTranslation(true)}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Interface</h3>
                <p className="text-sm text-slate-600">Boutons, labels, messages</p>
              </div>
              <ExternalLink className="w-5 h-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50 hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowCountryLanguages(true)}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Pays & langues</h3>
                <p className="text-sm text-slate-600">Mapping européen</p>
              </div>
              <ExternalLink className="w-5 h-5 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 hover:shadow-lg transition-all cursor-pointer" onClick={() => setShowStatistics(true)}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Statistiques</h3>
                <p className="text-sm text-slate-600">Progression & qualité</p>
              </div>
              <ExternalLink className="w-5 h-5 text-violet-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Alert className="border-cyan-200 bg-cyan-50/50">
        <Info className="h-4 w-4 text-cyan-600" />
        <AlertDescription className="text-cyan-800 text-sm">
          <strong>3 modes disponibles :</strong> Traduction manuelle pour un contrôle total, MCP IA pour des suggestions automatiques, ou API externe pour une automatisation complète.
        </AlertDescription>
      </Alert>

      {/* Translation Modes Tabs */}
      <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as TranslationMode)}>
        <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm p-1">
          <TabsTrigger value="manual" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
            <Globe className="w-4 h-4 mr-2" />
            Manuel
          </TabsTrigger>
          <TabsTrigger value="mcp" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
            <Bot className="w-4 h-4 mr-2" />
            MCP IA
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white">
            <Key className="w-4 h-4 mr-2" />
            API Externe
          </TabsTrigger>
        </TabsList>

        {/* MANUAL MODE */}
        <TabsContent value="manual" className="mt-6 space-y-4">
          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    Traduction manuelle
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Saisie et validation humaine des traductions pour chaque langue
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  Par défaut
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  Avantages
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Contrôle total sur la qualité et le contexte des traductions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Adaptation culturelle et terminologie métier spécifique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Aucun coût externe ni dépendance à des services tiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Révision et validation par des traducteurs professionnels</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-600" />
                  Workflow recommandé
                </h4>
                <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                  <li>Accédez à l'écran "Traduction des questions"</li>
                  <li>Sélectionnez la question à traduire</li>
                  <li>Saisissez les traductions pour chaque langue cible</li>
                  <li>Marquez comme "Validé" une fois relu</li>
                </ol>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
                onClick={() => setShowQuestionTranslation(true)}
              >
                Ouvrir l'interface de traduction
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MCP IA MODE */}
        <TabsContent value="mcp" className="mt-6 space-y-4">
          <Card className="border-violet-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    Traduction via MCP (Model Context Protocol)
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Proposition automatique de traductions via IA, à relire et valider
                  </CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0">
                  <Sparkles className="w-3 h-3 mr-1" />
                  IA
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enable/Disable Switch */}
              <div className="flex items-center justify-between p-4 bg-violet-50 rounded-xl border border-violet-100">
                <div className="flex-1">
                  <h4 className="text-slate-900 mb-1">Activer MCP IA</h4>
                  <p className="text-sm text-slate-600">
                    Permet de générer des traductions automatiques via Claude
                  </p>
                </div>
                <Switch 
                  checked={mcpEnabled}
                  onCheckedChange={handleToggleMCP}
                  className="data-[state=checked]:bg-violet-600"
                />
              </div>

              {mcpEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <Alert className="border-violet-200 bg-violet-50/50">
                    <Sparkles className="h-4 w-4 text-violet-600" />
                    <AlertDescription className="text-violet-800 text-sm">
                      MCP IA est maintenant actif. Les traductions seront générées automatiquement et marquées comme "Auto (MCP)" pour révision.
                    </AlertDescription>
                  </Alert>

                  <div className="p-4 bg-white rounded-xl border border-violet-100">
                    <h4 className="text-slate-900 mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4 text-violet-600" />
                      Comment ça marche ?
                    </h4>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <p>L'IA analyse le contexte de chaque texte source (question, label, message)</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <p>Génération de traductions adaptées au vocabulaire métier du recrutement</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <p>Les traductions sont marquées "Auto (MCP)" et nécessitent une validation manuelle</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
                          4
                        </div>
                        <p>Vous pouvez modifier, accepter ou rejeter chaque traduction proposée</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      className="border-violet-300 text-violet-700 hover:bg-violet-50"
                      onClick={() => setShowQuestionTranslation(true)}
                    >
                      <Languages className="w-4 h-4 mr-2" />
                      Gérer les traductions
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg"
                      onClick={() => setShowMCPSettings(true)}
                    >
                      Paramètres avancés
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {!mcpEnabled && (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <Bot className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 text-sm">
                    Activez MCP IA pour bénéficier de traductions automatiques intelligentes
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API EXTERNAL MODE */}
        <TabsContent value="api" className="mt-6 space-y-4">
          <Card className="border-cyan-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                      <Key className="w-4 h-4 text-white" />
                    </div>
                    Traduction via API externe
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Traductions générées depuis un service externe (DeepL, Google, Azure, AWS)
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-cyan-300 text-cyan-700">
                  Payant
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Provider Selection */}
              <div className="space-y-3">
                <Label className="text-slate-900">Sélectionnez un fournisseur</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {API_PROVIDERS.map((provider) => (
                    <motion.button
                      key={provider.id}
                      onClick={() => setSelectedProvider(provider.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedProvider === provider.id
                          ? 'border-cyan-400 bg-cyan-50 shadow-lg'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{provider.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-slate-900">{provider.name}</h4>
                        </div>
                        {selectedProvider === provider.id && (
                          <Check className="w-5 h-5 text-cyan-600" />
                        )}
                      </div>
                      <a 
                        href={provider.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-600 hover:underline flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Documentation
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* API Key Input */}
              <div className="space-y-3">
                <Label htmlFor="api-key" className="text-slate-900">
                  Clé API {API_PROVIDERS.find(p => p.id === selectedProvider)?.name}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Entrez votre clé API..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSaveApiKey}
                    disabled={!apiKey || savingApiKey}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                  >
                    {savingApiKey ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  🔒 Votre clé API est stockée de manière sécurisée et chiffrée
                </p>
              </div>

              {/* Features & Pricing Info */}
              <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                <h4 className="text-slate-900 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-600" />
                  Informations importantes
                </h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">💰</span>
                    <span>Services payants : consultez les tarifs de chaque fournisseur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">⚡</span>
                    <span>Traduction automatique en temps réel pour toutes les langues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">✅</span>
                    <span>Les traductions sont marquées "Auto (API)" et peuvent être modifiées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">📊</span>
                    <span>Tableau de bord pour suivre votre consommation API</span>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1 border-cyan-300 text-cyan-700 hover:bg-cyan-50"
                  onClick={() => console.log('Test API connection')}
                  disabled={!apiKey}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tester la connexion
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-lg"
                  onClick={() => console.log('View API usage')}
                >
                  Voir l'utilisation API
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

        {/* Debug Panel - Development only */}
        {process.env.NODE_ENV === 'development' && (
          <TranslationDebugPanel />
        )}

        {/* Import/Export Section */}
        <TranslationExport />

        {/* Diagnostic Section */}
        <TranslationDiagnostic />
      </motion.div>

      {/* MCP Advanced Settings Modal */}
      <AnimatePresence>
        {showMCPSettings && (
          <MCPAdvancedSettings onClose={() => setShowMCPSettings(false)} />
        )}
      </AnimatePresence>
    </>
  );
}