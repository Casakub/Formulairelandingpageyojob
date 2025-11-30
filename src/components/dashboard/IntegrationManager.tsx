import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Plug, 
  Check, 
  X, 
  Settings, 
  Key, 
  Trash2,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Zap,
  Info,
  Copy,
  Eye,
  EyeOff,
  TrendingUp,
  Activity,
  Database,
  Webhook as WebhookIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { IntegrationDetails } from './IntegrationDetails';
import { 
  getAllIntegrations, 
  createIntegration, 
  updateIntegration, 
  deleteIntegration,
  testIntegration as testIntegrationAPI,
  type Integration 
} from '../../lib/integrations';
import { toast } from 'sonner@2.0.3';

const INTEGRATION_TEMPLATES = [
  {
    name: 'Google Sheets',
    type: 'api' as const,
    icon: '📊',
    color: 'from-green-500 to-emerald-500',
    description: 'Envoyer automatiquement les réponses vers Google Sheets',
    features: ['Export automatique', 'Temps réel', 'Historique complet'],
    defaultConfig: {
      url: 'https://sheets.googleapis.com/v4/spreadsheets/',
      method: 'POST'
    }
  },
  {
    name: 'Zapier',
    type: 'webhook' as const,
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
    description: 'Déclencher des automatisations Zapier à chaque réponse',
    features: ['5000+ apps', 'Workflows avancés', 'Conditions'],
    defaultConfig: {
      method: 'POST'
    }
  },
  {
    name: 'Make (Integromat)',
    type: 'webhook' as const,
    icon: '🔧',
    color: 'from-purple-500 to-pink-500',
    description: 'Connecter avec Make pour des automatisations complexes',
    features: ['Visual builder', 'Multi-step', 'Error handling'],
    defaultConfig: {
      method: 'POST'
    }
  },
  {
    name: 'n8n',
    type: 'webhook' as const,
    icon: '🤖',
    color: 'from-indigo-500 to-blue-600',
    description: 'Workflow automation avec n8n - open-source et extensible',
    features: ['Open-source', 'Self-hosted', 'Custom nodes'],
    defaultConfig: {
      method: 'POST'
    }
  },
  {
    name: 'Notion',
    type: 'mcp' as const,
    icon: '📝',
    color: 'from-slate-500 to-zinc-600',
    description: 'Créer automatiquement des pages Notion via MCP',
    features: ['Templates', 'Databases', 'Relations'],
    defaultConfig: {}
  },
  {
    name: 'Airtable',
    type: 'api' as const,
    icon: '🗂️',
    color: 'from-blue-500 to-cyan-500',
    description: 'Synchroniser les réponses avec vos bases Airtable',
    features: ['Views', 'Automations', 'Collaboration'],
    defaultConfig: {
      url: 'https://api.airtable.com/v0/',
      method: 'POST'
    }
  },
  {
    name: 'Slack',
    type: 'mcp' as const,
    icon: '💬',
    color: 'from-pink-500 to-rose-500',
    description: 'Envoyer des notifications Slack via MCP',
    features: ['Channels', 'DMs', 'Rich formatting'],
    defaultConfig: {}
  },
  {
    name: 'Webhook Personnalisé',
    type: 'webhook' as const,
    icon: '🔗',
    color: 'from-violet-500 to-purple-500',
    description: 'Configurer un webhook vers votre propre API',
    features: ['Custom headers', 'Auth', 'Retry logic'],
    defaultConfig: {
      method: 'POST'
    }
  },
  {
    name: 'Supabase',
    type: 'database' as const,
    icon: '🔋',
    color: 'from-teal-500 to-green-500',
    description: 'Stocker directement dans Supabase',
    features: ['Real-time', 'PostgreSQL', 'Row-level security'],
    defaultConfig: {
      url: 'https://xxx.supabase.co',
      method: 'POST'
    }
  }
];

export function IntegrationManager() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  const [isMounted, setIsMounted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof INTEGRATION_TEMPLATES[0] | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const [newIntegration, setNewIntegration] = useState<Partial<Integration>>({
    type: 'api',
    status: 'disconnected',
    config: {}
  });

  // Charger les intégrations depuis Supabase au démarrage
  useEffect(() => {
    setIsMounted(true);
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      setLoading(true);
      const data = await getAllIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error('Error loading integrations:', error);
      toast.error('Erreur lors du chargement des intégrations');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template: typeof INTEGRATION_TEMPLATES[0]) => {
    setSelectedTemplate(template);
    setNewIntegration({
      name: template.name,
      type: template.type,
      icon: template.icon,
      description: template.description,
      status: 'disconnected',
      config: template.defaultConfig
    });
  };

  const handleSave = async () => {
    if (!newIntegration.name) {
      alert('Le nom est requis');
      return;
    }

    const integration: Integration = {
      id: Date.now().toString(),
      name: newIntegration.name || '',
      type: newIntegration.type || 'api',
      icon: newIntegration.icon || '🔌',
      description: newIntegration.description || '',
      status: 'disconnected',
      config: {
        ...newIntegration.config,
        retryEnabled: true,
        maxRetries: 3,
        rateLimit: 100,
        timeout: 30000
      },
      stats: {
        totalCalls: 0,
        successCalls: 0,
        errorCalls: 0,
        avgResponseTime: 0
      }
    };

    try {
      await createIntegration(integration);
      setIntegrations([...integrations, integration]);
      toast.success('Intégration créée avec succès');
    } catch (error) {
      console.error('Error creating integration:', error);
      toast.error('Erreur lors de la création de l\'intégration');
    }

    setIsCreating(false);
    setSelectedTemplate(null);
    setNewIntegration({ type: 'api', status: 'disconnected', config: {} });
  };

  const handleTest = async (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;

    // Simulate API test
    try {
      await testIntegrationAPI(id);
      setIntegrations(integrations.map(i => 
        i.id === id ? { ...i, status: 'connected' as const, lastSync: new Date().toISOString() } : i
      ));
      toast.success(`Connexion réussie avec ${integration.name} !`);
    } catch (error) {
      console.error('Error testing integration:', error);
      toast.error(`Erreur lors du test de ${integration.name}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette intégration ?')) {
      try {
        await deleteIntegration(id);
        setIntegrations(integrations.filter(i => i.id !== id));
        toast.success('Intégration supprimée avec succès');
      } catch (error) {
        console.error('Error deleting integration:', error);
        toast.error('Erreur lors de la suppression de l\'intégration');
      }
    }
  };

  const handleCopyWebhook = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('✅ URL copiée dans le presse-papier !');
  };

  const stats = {
    connected: integrations.filter(i => i.status === 'connected').length,
    disconnected: integrations.filter(i => i.status === 'disconnected').length,
    errors: integrations.filter(i => i.status === 'error').length,
    total: integrations.length
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg">
              <Plug className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900">Intégrations</h2>
              <p className="text-slate-600">Connectez vos outils préférés pour automatiser</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Intégration
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/50 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Check className="w-8 h-8 text-green-600" />
                <Activity className="w-5 h-5 text-green-500 animate-pulse" />
              </div>
              <div className="text-3xl text-green-600 mb-1">{stats.connected}</div>
              <div className="text-slate-600 text-sm">Connectées</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-400/50 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
              </div>
              <div className="text-3xl text-yellow-600 mb-1">{stats.disconnected}</div>
              <div className="text-slate-600 text-sm">Inactives</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-400/50 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <X className="w-8 h-8 text-red-600" />
                {stats.errors > 0 && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
              </div>
              <div className="text-3xl text-red-600 mb-1">{stats.errors}</div>
              <div className="text-slate-600 text-sm">Erreurs</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/50 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-8 h-8 text-cyan-600" />
                <TrendingUp className="w-5 h-5 text-cyan-500" />
              </div>
              <div className="text-3xl text-cyan-600 mb-1">{stats.total}</div>
              <div className="text-slate-600 text-sm">Total</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-cyan-400/50 mb-8">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 mb-1">💡 Automatisez vos workflows</h4>
              <p className="text-slate-600 text-sm">
                Connectez Google Sheets, Zapier, Make ou tout webhook personnalisé pour envoyer 
                automatiquement les réponses du formulaire. Configuration en 2 minutes !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Modal */}
      {isMounted && isCreating && (() => {
        return createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[99999] flex items-center justify-center p-4"
            onClick={() => {
              setIsCreating(false);
              setSelectedTemplate(null);
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-white/20 shadow-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              {!selectedTemplate ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-slate-900 text-2xl mb-2">Choisir un type d'intégration</h3>
                    <p className="text-slate-600">Sélectionnez l'outil que vous souhaitez connecter</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {INTEGRATION_TEMPLATES.map((template, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        onClick={() => handleSelectTemplate(template)}
                        className="p-6 rounded-xl bg-white border-2 border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all text-left group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`text-4xl w-16 h-16 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center shadow-md`}>
                            {template.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors">
                              {template.name}
                            </h4>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs uppercase">
                              {template.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{template.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {template.features.map((feature, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-slate-50 text-slate-600 text-xs border border-slate-200">
                              ✓ {feature}
                            </span>
                          ))}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setIsCreating(false)}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Annuler
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${INTEGRATION_TEMPLATES.find(t => t.name === selectedTemplate.name)?.color} flex items-center justify-center text-3xl shadow-lg`}>
                        {selectedTemplate.icon}
                      </div>
                      <div>
                        <h3 className="text-slate-900 text-xl">
                          Configurer {selectedTemplate.name}
                        </h3>
                        <p className="text-slate-600 text-sm">{selectedTemplate.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTemplate(null)}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name" className="text-slate-900 mb-2 block">
                        Nom de l'intégration
                      </Label>
                      <Input
                        id="name"
                        value={newIntegration.name || ''}
                        onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                        className="bg-white border-slate-200 text-slate-900"
                        placeholder={selectedTemplate.name}
                      />
                    </div>

                    {/* URL (for API/Webhook) */}
                    {(newIntegration.type === 'api' || newIntegration.type === 'webhook' || newIntegration.type === 'database') && (
                      <div>
                        <Label htmlFor="url" className="text-slate-900 mb-2 block flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-cyan-600" />
                          URL de l'endpoint
                        </Label>
                        <Input
                          id="url"
                          value={newIntegration.config?.url || ''}
                          onChange={(e) => setNewIntegration({ 
                            ...newIntegration, 
                            config: { ...newIntegration.config, url: e.target.value }
                          })}
                          placeholder="https://api.example.com/webhook"
                          className="bg-white border-slate-200 text-slate-900 font-mono text-sm"
                        />
                      </div>
                    )}

                    {/* API Key */}
                    {(newIntegration.type === 'api' || newIntegration.type === 'database') && (
                      <div>
                        <Label htmlFor="apiKey" className="text-slate-900 mb-2 block flex items-center gap-2">
                          <Key className="w-4 h-4 text-violet-600" />
                          Clé API (optionnel)
                        </Label>
                        <div className="relative">
                          <Input
                            id="apiKey"
                            type={showApiKey ? 'text' : 'password'}
                            value={newIntegration.config?.apiKey || ''}
                            onChange={(e) => setNewIntegration({ 
                              ...newIntegration, 
                              config: { ...newIntegration.config, apiKey: e.target.value }
                            })}
                            placeholder="sk_live_..."
                            className="bg-white border-slate-200 text-slate-900 font-mono text-sm pr-20"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* n8n API Key (Webhook type but needs auth) */}
                    {newIntegration.type === 'webhook' && selectedTemplate?.name === 'n8n' && (
                      <div>
                        <Label htmlFor="n8nApiKey" className="text-slate-900 mb-2 block flex items-center gap-2">
                          <Key className="w-4 h-4 text-indigo-600" />
                          Clé API n8n (optionnel)
                        </Label>
                        <div className="relative">
                          <Input
                            id="n8nApiKey"
                            type={showApiKey ? 'text' : 'password'}
                            value={newIntegration.config?.apiKey || ''}
                            onChange={(e) => setNewIntegration({ 
                              ...newIntegration, 
                              config: { 
                                ...newIntegration.config, 
                                apiKey: e.target.value,
                                headers: {
                                  ...newIntegration.config?.headers,
                                  'X-N8N-API-KEY': e.target.value
                                }
                              }
                            })}
                            placeholder="Votre clé API n8n..."
                            className="bg-white border-slate-200 text-slate-900 font-mono text-sm pr-20"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          💡 L'API key sera envoyée dans le header <code className="px-1 py-0.5 rounded bg-slate-100 text-indigo-600">X-N8N-API-KEY</code>
                        </p>
                      </div>
                    )}

                    {/* n8n Info Banner */}
                    {selectedTemplate?.name === 'n8n' && (
                      <Card className="bg-indigo-500/10 border-indigo-400/50">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-slate-900 text-sm mb-2">🤖 Configuration n8n</h4>
                              <p className="text-slate-600 text-sm mb-3">
                                Deux façons de se connecter à n8n :
                              </p>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                  <span className="text-green-600">✓</span>
                                  <div>
                                    <p className="text-slate-700"><strong>Mode Webhook</strong> (recommandé)</p>
                                    <p className="text-slate-500 text-xs">Créez un workflow avec un node Webhook et utilisez l'URL du webhook</p>
                                    <code className="text-xs bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">
                                      https://uxomnia.cloud/webhook/your-webhook-id
                                    </code>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-blue-600">✓</span>
                                  <div>
                                    <p className="text-slate-700"><strong>Mode API REST</strong> (avancé)</p>
                                    <p className="text-slate-500 text-xs">Utilisez l'API pour déclencher des workflows existants</p>
                                    <code className="text-xs bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">
                                      https://uxomnia.cloud/api/v1/workflows/:id/execute
                                    </code>
                                    <p className="text-indigo-600 text-xs mt-1">⚠️ Nécessite une API key</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Method */}
                    {(newIntegration.type === 'api' || newIntegration.type === 'webhook' || newIntegration.type === 'database') && (
                      <div>
                        <Label htmlFor="method" className="text-slate-900 mb-2 block">
                          Méthode HTTP
                        </Label>
                        <Select 
                          value={newIntegration.config?.method || 'POST'} 
                          onValueChange={(value) => setNewIntegration({ 
                            ...newIntegration, 
                            config: { ...newIntegration.config, method: value }
                          })}
                        >
                          <SelectTrigger className="bg-white border-slate-200 text-slate-900">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* MCP Info */}
                    {newIntegration.type === 'mcp' && (
                      <Card className="bg-cyan-500/10 border-cyan-400/50">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-slate-900 text-sm mb-1">Intégration MCP</h4>
                              <p className="text-slate-600 text-sm mb-2">
                                Les intégrations MCP utilisent le Model Context Protocol pour se connecter 
                                directement à vos outils sans API key.
                              </p>
                              <p className="text-cyan-600 text-xs">
                                ✓ Assurez-vous que l'outil MCP est installé et configuré dans votre environnement.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Description */}
                    <div>
                      <Label htmlFor="description" className="text-slate-900 mb-2 block">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newIntegration.description || ''}
                        onChange={(e) => setNewIntegration({ ...newIntegration, description: e.target.value })}
                        placeholder="Description de l'intégration..."
                        className="bg-white border-slate-200 text-slate-900 min-h-[80px]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Créer l'intégration
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedTemplate(null)}
                      className="border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Retour
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>,
          document.body
        );
        })()}

      {/* Integrations List */}
      {integrations.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration, index) => {
            const template = INTEGRATION_TEMPLATES.find(t => t.name === integration.name);
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="bg-white border-slate-200 hover:border-cyan-400 hover:shadow-xl transition-all shadow-md h-full">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template?.color || 'from-slate-400 to-slate-600'} flex items-center justify-center text-2xl shadow-md`}>
                          {integration.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-slate-900 mb-1">{integration.name}</h4>
                          <p className="text-slate-600 text-sm line-clamp-1">{integration.description}</p>
                        </div>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 flex-shrink-0 ${
                        integration.status === 'connected'
                          ? 'bg-green-500/10 text-green-600 border border-green-400/50'
                          : integration.status === 'error'
                          ? 'bg-red-500/10 text-red-600 border border-red-400/50'
                          : 'bg-yellow-500/10 text-yellow-600 border border-yellow-400/50'
                      }`}>
                        {integration.status === 'connected' && <Check className="w-3 h-3" />}
                        {integration.status === 'error' && <X className="w-3 h-3" />}
                        {integration.status === 'disconnected' && <AlertCircle className="w-3 h-3" />}
                        {integration.status === 'connected' ? 'Actif' : 
                         integration.status === 'error' ? 'Erreur' : 'Inactif'}
                      </div>
                    </div>

                    {/* Type & Method Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-600 text-xs uppercase border border-cyan-400/30">
                        {integration.type}
                      </span>
                      {integration.config.method && (
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs border border-slate-200">
                          {integration.config.method}
                        </span>
                      )}
                      {integration.status === 'connected' && integration.lastSync && (
                        <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-600 text-xs border border-green-400/30">
                          ✓ Sync active
                        </span>
                      )}
                    </div>

                    {/* Config Details */}
                    {integration.config.url && (
                      <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-start gap-2 mb-1">
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-500 text-xs mb-1">Endpoint</p>
                            <p className="text-slate-700 text-xs font-mono truncate">{integration.config.url}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyWebhook(integration.config.url!)}
                            className="text-slate-600 hover:text-slate-900 p-1 h-auto"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Last Sync */}
                    {integration.lastSync && (
                      <div className="mb-4 text-slate-500 text-xs flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Dernière sync: {new Date(integration.lastSync).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}

                    {/* Stats Preview */}
                    {integration.stats && (
                      <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-center">
                          <div className="text-green-600 text-lg">{integration.stats.successCalls}</div>
                          <div className="text-slate-500 text-xs">Succès</div>
                        </div>
                        <div className="text-center border-x border-slate-300">
                          <div className="text-red-600 text-lg">{integration.stats.errorCalls}</div>
                          <div className="text-slate-500 text-xs">Erreurs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-violet-600 text-lg">{integration.stats.avgResponseTime}ms</div>
                          <div className="text-slate-500 text-xs">Avg</div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t border-slate-200">
                      <Button
                        size="sm"
                        onClick={() => setSelectedIntegration(integration)}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white"
                      >
                        <Settings className="w-3.5 h-3.5 mr-2" />
                        Configurer
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleTest(integration.id)}
                        className="bg-cyan-500/10 text-cyan-600 hover:bg-cyan-500/20 border border-cyan-400/30"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(integration.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-dashed border-slate-300 shadow-md">
          <CardContent className="p-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Plug className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-slate-900 text-xl mb-3">Aucune intégration configurée</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Connectez vos outils préférés (Google Sheets, Zapier, Notion...) pour 
              automatiser l'envoi des réponses en temps réel.
            </p>
            <Button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Créer votre première intégration
            </Button>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Configuration en 2 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Automatique</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                <span>Temps réel</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Details Modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <IntegrationDetails
            integration={selectedIntegration}
            onClose={() => setSelectedIntegration(null)}
            onUpdate={(updated) => {
              setIntegrations(integrations.map(i => 
                i.id === updated.id ? updated : i
              ));
              setSelectedIntegration(null);
            }}
            onDelete={() => {
              handleDelete(selectedIntegration.id);
              setSelectedIntegration(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}