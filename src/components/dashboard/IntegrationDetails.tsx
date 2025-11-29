import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Activity,
  Settings,
  Key,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Zap,
  Database,
  Eye,
  Code,
  Download,
  RotateCcw,
  Shield,
  Info,
  AlertTriangle,
  Trash2,
  Copy,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface WebhookLog {
  id: string;
  timestamp: string;
  status: 'success' | 'error' | 'pending' | 'retrying';
  method: string;
  url: string;
  statusCode?: number;
  duration?: number;
  payload: any;
  response?: any;
  error?: string;
  retryCount?: number;
}

interface Integration {
  id: string;
  name: string;
  type: 'api' | 'mcp' | 'webhook' | 'database';
  status: 'connected' | 'disconnected' | 'error';
  icon: string;
  description: string;
  config: {
    url?: string;
    apiKey?: string;
    method?: string;
    headers?: Record<string, string>;
    retryEnabled?: boolean;
    maxRetries?: number;
    rateLimit?: number;
    timeout?: number;
  };
  oauth?: {
    provider: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
    scopes?: string[];
  };
  stats: {
    totalCalls: number;
    successCalls: number;
    errorCalls: number;
    avgResponseTime: number;
    lastCallAt?: string;
  };
  lastSync?: string;
}

interface IntegrationDetailsProps {
  integration: Integration;
  onClose: () => void;
  onUpdate: (integration: Integration) => void;
  onDelete: () => void;
}

// Mock webhook logs
const mockLogs: WebhookLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    status: 'success',
    method: 'POST',
    url: 'https://sheets.googleapis.com/v4/spreadsheets/abc123',
    statusCode: 200,
    duration: 245,
    payload: { name: 'Agence Paris', country: 'France', employees: 50 },
    response: { success: true, rowId: 42 }
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    status: 'error',
    method: 'POST',
    url: 'https://sheets.googleapis.com/v4/spreadsheets/abc123',
    statusCode: 401,
    duration: 180,
    payload: { name: 'Agence Lyon', country: 'France', employees: 30 },
    error: 'Unauthorized: Invalid API key',
    retryCount: 2
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    status: 'success',
    method: 'POST',
    url: 'https://sheets.googleapis.com/v4/spreadsheets/abc123',
    statusCode: 200,
    duration: 312,
    payload: { name: 'Agence Berlin', country: 'Germany', employees: 75 },
    response: { success: true, rowId: 41 }
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    status: 'retrying',
    method: 'POST',
    url: 'https://sheets.googleapis.com/v4/spreadsheets/abc123',
    statusCode: 503,
    duration: 5000,
    payload: { name: 'Agence Madrid', country: 'Spain', employees: 40 },
    error: 'Service temporarily unavailable',
    retryCount: 1
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
    status: 'success',
    method: 'POST',
    url: 'https://sheets.googleapis.com/v4/spreadsheets/abc123',
    statusCode: 200,
    duration: 198,
    payload: { name: 'Agence Rome', country: 'Italy', employees: 55 },
    response: { success: true, rowId: 40 }
  }
];

export function IntegrationDetails({ integration, onClose, onUpdate, onDelete }: IntegrationDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [logs, setLogs] = useState<WebhookLog[]>(mockLogs);
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'error' | 'retrying'>('all');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [localConfig, setLocalConfig] = useState(integration.config);

  const successRate = integration.stats.totalCalls > 0 
    ? ((integration.stats.successCalls / integration.stats.totalCalls) * 100).toFixed(1)
    : '0';

  const filteredLogs = logs.filter(log => {
    if (logFilter === 'all') return true;
    return log.status === logFilter;
  });

  const handleRetryLog = (logId: string) => {
    setLogs(logs.map(log => 
      log.id === logId 
        ? { ...log, status: 'retrying' as const, retryCount: (log.retryCount || 0) + 1 }
        : log
    ));

    // Simulate retry success after 2 seconds
    setTimeout(() => {
      setLogs(logs.map(log => 
        log.id === logId 
          ? { ...log, status: 'success' as const, statusCode: 200, error: undefined }
          : log
      ));
    }, 2000);
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newLog: WebhookLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'success',
      method: integration.config.method || 'POST',
      url: integration.config.url || '',
      statusCode: 200,
      duration: 245,
      payload: { test: true, message: 'Connection test' },
      response: { success: true, message: 'Connection successful' }
    };

    setLogs([newLog, ...logs]);
    setIsTestingConnection(false);

    alert('✅ Test de connexion réussi !');
  };

  const handleSaveConfig = () => {
    onUpdate({
      ...integration,
      config: localConfig
    });
    alert('✅ Configuration enregistrée !');
  };

  const handleOAuthConnect = (provider: string) => {
    alert(`🔐 Ouverture du flow OAuth pour ${provider}...\n\nDans une vraie application, cela ouvrirait une popup d'authentification.`);
    
    // Simulate OAuth success
    setTimeout(() => {
      onUpdate({
        ...integration,
        status: 'connected',
        oauth: {
          provider,
          accessToken: 'ya29.xxxxxxxxxxxxx',
          refreshToken: 'refresh_xxxxxxxxxxxxx',
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file']
        }
      });
      alert(`✅ OAuth connecté avec succès pour ${provider} !`);
    }, 1000);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('✅ Copié dans le presse-papier !');
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return '-';
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins}min`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `Il y a ${diffDays}j`;
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-cyan-500/10 to-violet-500/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-3xl shadow-lg">
                {integration.icon}
              </div>
              <div>
                <h2 className="text-slate-900 mb-1">{integration.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'} className={
                    integration.status === 'connected' 
                      ? 'bg-green-500/10 text-green-600 border-green-400/50' 
                      : 'bg-yellow-500/10 text-yellow-600 border-yellow-400/50'
                  }>
                    {integration.status === 'connected' ? 'Connecté' : 'Déconnecté'}
                  </Badge>
                  <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 border-cyan-400/30">
                    {integration.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Logs
                <Badge variant="secondary" className="ml-1">{logs.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="oauth" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                OAuth
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configuration
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl text-green-600 mb-1">{successRate}%</div>
                    <div className="text-slate-600 text-sm">Taux de succès</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Zap className="w-8 h-8 text-blue-600" />
                      <Activity className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl text-blue-600 mb-1">{integration.stats.totalCalls}</div>
                    <div className="text-slate-600 text-sm">Total appels</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-400/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-8 h-8 text-violet-600" />
                      <Activity className="w-4 h-4 text-violet-500" />
                    </div>
                    <div className="text-2xl text-violet-600 mb-1">{integration.stats.avgResponseTime}ms</div>
                    <div className="text-slate-600 text-sm">Temps moyen</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-400/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <XCircle className="w-8 h-8 text-red-600" />
                      {integration.stats.errorCalls > 0 && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                    </div>
                    <div className="text-2xl text-red-600 mb-1">{integration.stats.errorCalls}</div>
                    <div className="text-slate-600 text-sm">Erreurs</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-slate-900 mb-4">Actions rapides</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Button
                      onClick={handleTestConnection}
                      disabled={isTestingConnection}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white"
                    >
                      {isTestingConnection ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Test en cours...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Tester la connexion
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => handleCopyToClipboard(integration.config.url || '')}
                      variant="outline"
                      className="border-slate-200"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copier l'URL
                    </Button>

                    <Button
                      onClick={() => alert('Export des logs...')}
                      variant="outline"
                      className="border-slate-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Exporter les logs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-slate-900 mb-4">Activité récente</h3>
                  <div className="space-y-3">
                    {logs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-3">
                          {log.status === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : log.status === 'error' ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : (
                            <RefreshCw className="w-5 h-5 text-yellow-600 animate-spin" />
                          )}
                          <div>
                            <div className="text-slate-900 text-sm">{log.method} • {log.statusCode || '-'}</div>
                            <div className="text-slate-600 text-xs">{formatTimestamp(log.timestamp)}</div>
                          </div>
                        </div>
                        <div className="text-slate-600 text-sm">{formatDuration(log.duration)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logs Tab */}
            <TabsContent value="logs" className="space-y-4">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-slate-900">Filtrer :</Label>
                      <Select value={logFilter} onValueChange={(value: any) => setLogFilter(value)}>
                        <SelectTrigger className="w-[180px] bg-white border-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les logs</SelectItem>
                          <SelectItem value="success">Succès</SelectItem>
                          <SelectItem value="error">Erreurs</SelectItem>
                          <SelectItem value="retrying">En retry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLogs([])}
                        className="border-slate-200"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Effacer tout
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert('Rafraîchissement...')}
                        className="border-slate-200"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logs List */}
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className={`cursor-pointer hover:shadow-lg transition-all ${
                        selectedLog?.id === log.id ? 'border-cyan-400 shadow-lg' : 'border-slate-200'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              {log.status === 'success' ? (
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                              ) : log.status === 'error' ? (
                                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                  <XCircle className="w-5 h-5 text-red-600" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                  <RefreshCw className="w-5 h-5 text-yellow-600 animate-spin" />
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="bg-slate-100 text-slate-700">
                                    {log.method}
                                  </Badge>
                                  <Badge variant="outline" className={
                                    log.status === 'success' 
                                      ? 'bg-green-500/10 text-green-600 border-green-400/30'
                                      : log.status === 'error'
                                      ? 'bg-red-500/10 text-red-600 border-red-400/30'
                                      : 'bg-yellow-500/10 text-yellow-600 border-yellow-400/30'
                                  }>
                                    {log.statusCode || 'N/A'}
                                  </Badge>
                                  <span className="text-slate-600 text-sm">{formatDuration(log.duration)}</span>
                                  {log.retryCount && log.retryCount > 0 && (
                                    <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-400/30">
                                      Retry {log.retryCount}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-slate-900 text-sm mb-1 font-mono truncate">
                                  {log.url}
                                </div>
                                <div className="text-slate-600 text-xs">
                                  {formatTimestamp(log.timestamp)} • {new Date(log.timestamp).toLocaleString('fr-FR')}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {log.status === 'error' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRetryLog(log.id)}
                                  className="border-slate-200"
                                >
                                  <RotateCcw className="w-4 h-4 mr-1" />
                                  Retry
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          <AnimatePresence>
                            {selectedLog?.id === log.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-slate-200 pt-3 mt-3 space-y-3"
                              >
                                {log.error && (
                                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-400/30">
                                    <div className="flex items-start gap-2">
                                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                      <div>
                                        <div className="text-red-900 text-sm mb-1">Erreur</div>
                                        <div className="text-red-700 text-sm font-mono">{log.error}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="text-slate-900 text-sm">Payload envoyé</div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleCopyToClipboard(JSON.stringify(log.payload, null, 2))}
                                    >
                                      <Copy className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <pre className="p-3 rounded-lg bg-slate-900 text-green-400 text-xs font-mono overflow-x-auto">
                                    {JSON.stringify(log.payload, null, 2)}
                                  </pre>
                                </div>

                                {log.response && (
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="text-slate-900 text-sm">Réponse reçue</div>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleCopyToClipboard(JSON.stringify(log.response, null, 2))}
                                      >
                                        <Copy className="w-4 h-4" />
                                      </Button>
                                    </div>
                                    <pre className="p-3 rounded-lg bg-slate-900 text-cyan-400 text-xs font-mono overflow-x-auto">
                                      {JSON.stringify(log.response, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredLogs.length === 0 && (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h4 className="text-slate-900 mb-2">Aucun log trouvé</h4>
                      <p className="text-slate-600 text-sm">
                        {logFilter === 'all' 
                          ? 'Les appels webhook apparaîtront ici'
                          : `Aucun log avec le statut "${logFilter}"`
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* OAuth Tab */}
            <TabsContent value="oauth" className="space-y-6">
              <Card className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-cyan-400/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-900 mb-2">🔐 Authentification OAuth 2.0</h4>
                      <p className="text-slate-600 text-sm mb-3">
                        Connectez-vous de manière sécurisée avec OAuth 2.0. Vos tokens sont stockés de manière 
                        chiffrée et automatiquement rafraîchis avant expiration.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-white">✓ Auto-refresh</Badge>
                        <Badge variant="outline" className="bg-white">✓ Chiffrement AES-256</Badge>
                        <Badge variant="outline" className="bg-white">✓ Révocation facile</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {integration.oauth ? (
                <>
                  {/* Connected OAuth */}
                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-slate-900 mb-1">OAuth connecté</h4>
                            <p className="text-slate-600 text-sm">Provider: {integration.oauth.provider}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">Actif</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-700 text-sm mb-1 block">Access Token</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              value={integration.oauth.accessToken || ''}
                              readOnly
                              type="password"
                              className="bg-white border-slate-200 font-mono text-sm"
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopyToClipboard(integration.oauth?.accessToken || '')}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-slate-700 text-sm mb-1 block">Expire le</Label>
                          <Input
                            value={integration.oauth.expiresAt ? new Date(integration.oauth.expiresAt).toLocaleString('fr-FR') : 'N/A'}
                            readOnly
                            className="bg-white border-slate-200"
                          />
                        </div>
                      </div>

                      {integration.oauth.scopes && integration.oauth.scopes.length > 0 && (
                        <div className="mt-4">
                          <Label className="text-slate-700 text-sm mb-2 block">Permissions (Scopes)</Label>
                          <div className="flex flex-wrap gap-2">
                            {integration.oauth.scopes.map((scope, index) => (
                              <Badge key={index} variant="outline" className="bg-white text-slate-700">
                                {scope}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 mt-6 pt-4 border-t border-green-400/30">
                        <Button
                          onClick={() => alert('🔄 Rafraîchissement du token...')}
                          variant="outline"
                          className="flex-1 border-green-400/50"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Rafraîchir le token
                        </Button>
                        <Button
                          onClick={() => {
                            if (confirm('Êtes-vous sûr de vouloir déconnecter OAuth ?')) {
                              onUpdate({ ...integration, oauth: undefined, status: 'disconnected' });
                            }
                          }}
                          variant="outline"
                          className="border-red-400/50 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Déconnecter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  {/* OAuth Providers */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {['Google', 'Microsoft', 'Notion', 'Slack', 'GitHub', 'Airtable'].map((provider) => (
                      <Card key={provider} className="hover:border-cyan-400 hover:shadow-lg transition-all cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white">
                                <Shield className="w-6 h-6" />
                              </div>
                              <div>
                                <h4 className="text-slate-900">{provider}</h4>
                                <p className="text-slate-600 text-sm">OAuth 2.0</p>
                              </div>
                            </div>
                            <ExternalLink className="w-5 h-5 text-slate-400" />
                          </div>

                          <Button
                            onClick={() => handleOAuthConnect(provider)}
                            className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white"
                          >
                            <Key className="w-4 h-4 mr-2" />
                            Connecter {provider}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              {/* Basic Config */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-slate-900 mb-4">Configuration de base</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="url" className="text-slate-900 mb-2 block">URL de l'endpoint</Label>
                      <Input
                        id="url"
                        value={localConfig.url || ''}
                        onChange={(e) => setLocalConfig({ ...localConfig, url: e.target.value })}
                        placeholder="https://api.example.com/webhook"
                        className="bg-white border-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <Label htmlFor="apiKey" className="text-slate-900 mb-2 block">Clé API (optionnel)</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        value={localConfig.apiKey || ''}
                        onChange={(e) => setLocalConfig({ ...localConfig, apiKey: e.target.value })}
                        placeholder="sk_live_..."
                        className="bg-white border-slate-200 font-mono"
                      />
                    </div>

                    <div>
                      <Label htmlFor="method" className="text-slate-900 mb-2 block">Méthode HTTP</Label>
                      <Select
                        value={localConfig.method || 'POST'}
                        onValueChange={(value) => setLocalConfig({ ...localConfig, method: value })}
                      >
                        <SelectTrigger className="bg-white border-slate-200">
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
                  </div>
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-slate-900 mb-4">Paramètres avancés</h3>
                  <div className="space-y-6">
                    {/* Retry Logic */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <RotateCcw className="w-5 h-5 text-cyan-600" />
                          <Label className="text-slate-900">Réessais automatiques</Label>
                        </div>
                        <p className="text-slate-600 text-sm">
                          Réessayer automatiquement en cas d'échec
                        </p>
                      </div>
                      <Switch
                        checked={localConfig.retryEnabled || false}
                        onCheckedChange={(checked) => setLocalConfig({ ...localConfig, retryEnabled: checked })}
                      />
                    </div>

                    {localConfig.retryEnabled && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-slate-900">Nombre de réessais : {localConfig.maxRetries || 3}</Label>
                        </div>
                        <Slider
                          value={[localConfig.maxRetries || 3]}
                          onValueChange={(value) => setLocalConfig({ ...localConfig, maxRetries: value[0] })}
                          min={1}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-slate-600 text-xs mt-1">
                          <span>1</span>
                          <span>10</span>
                        </div>
                      </div>
                    )}

                    {/* Timeout */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-5 h-5 text-violet-600" />
                            <Label className="text-slate-900">Timeout : {(localConfig.timeout || 30000) / 1000}s</Label>
                          </div>
                          <p className="text-slate-600 text-sm">Délai maximum d'attente</p>
                        </div>
                      </div>
                      <Slider
                        value={[localConfig.timeout || 30000]}
                        onValueChange={(value) => setLocalConfig({ ...localConfig, timeout: value[0] })}
                        min={5000}
                        max={60000}
                        step={5000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-slate-600 text-xs mt-1">
                        <span>5s</span>
                        <span>60s</span>
                      </div>
                    </div>

                    {/* Rate Limiting */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-5 h-5 text-orange-600" />
                            <Label className="text-slate-900">Rate limit : {localConfig.rateLimit || 100} req/min</Label>
                          </div>
                          <p className="text-slate-600 text-sm">Limite d'appels par minute</p>
                        </div>
                      </div>
                      <Slider
                        value={[localConfig.rateLimit || 100]}
                        onValueChange={(value) => setLocalConfig({ ...localConfig, rateLimit: value[0] })}
                        min={10}
                        max={1000}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-slate-600 text-xs mt-1">
                        <span>10</span>
                        <span>1000</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSaveConfig}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Enregistrer la configuration
                </Button>
                <Button
                  onClick={() => setLocalConfig(integration.config)}
                  variant="outline"
                  className="border-slate-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
              </div>

              {/* Danger Zone */}
              <Card className="border-red-400/50 bg-red-500/5">
                <CardContent className="p-6">
                  <h3 className="text-red-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Zone de danger
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Actions irréversibles. Soyez prudent.
                  </p>
                  <Button
                    onClick={() => {
                      if (confirm(`Êtes-vous sûr de vouloir supprimer l'intégration "${integration.name}" ?\n\nCette action est irréversible.`)) {
                        onDelete();
                        onClose();
                      }
                    }}
                    variant="outline"
                    className="border-red-400/50 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer cette intégration
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
