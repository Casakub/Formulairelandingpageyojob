import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, RefreshCw, CheckCircle, XCircle, AlertCircle, Loader2, Terminal, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { fetchQuestionTranslations, fetchUITextTranslations, fetchCountryLanguageMappings } from '../../lib/i18n-api';
import { CountryLanguageGenerator } from './CountryLanguageGenerator';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export function TranslationDiagnostic() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    questions: any[];
    uiTexts: any[];
    countries: any[];
  } | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showLogs, setShowLogs] = useState(true);

  const addLog = (type: LogEntry['type'], message: string, details?: any) => {
    const timestamp = new Date().toLocaleTimeString('fr-FR');
    setLogs(prev => [...prev, { timestamp, type, message, details }]);
    
    // Log dans la vraie console aussi
    const logMethod = type === 'error' ? console.error : type === 'warning' ? console.warn : console.log;
    const emoji = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '🔍';
    logMethod(`${emoji} [${timestamp}] ${message}`, details || '');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const runDiagnostic = async () => {
    setLoading(true);
    clearLogs();
    
    try {
      addLog('info', 'Démarrage du diagnostic des traductions...');
      
      addLog('info', 'Récupération des questions depuis Supabase...');
      const questions = await fetchQuestionTranslations();
      addLog('success', `Questions récupérées : ${questions.length}`, { count: questions.length });
      
      addLog('info', 'Récupération des textes UI depuis Supabase...');
      const uiTexts = await fetchUITextTranslations();
      addLog('success', `Textes UI récupérés : ${uiTexts.length}`, { count: uiTexts.length });
      
      addLog('info', 'Récupération des mappings pays-langues depuis Supabase...');
      const countries = await fetchCountryLanguageMappings();
      addLog('success', `Mappings pays récupérés : ${countries.length}`, { count: countries.length });

      addLog('success', 'Diagnostic terminé avec succès !', {
        questions: questions.length,
        uiTexts: uiTexts.length,
        countries: countries.length
      });

      setData({ questions, uiTexts, countries });
    } catch (error: any) {
      addLog('error', 'Erreur lors du chargement des traductions', {
        message: error.message,
        name: error.name,
        stack: error.stack?.split('\n').slice(0, 3).join('\n')
      });
      
      // Set empty data to avoid undefined state
      setData({ questions: [], uiTexts: [], countries: [] });
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (count: number) => {
    if (count === 0) return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Vide' };
    if (count < 10) return { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Partiel' };
    return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'OK' };
  };

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Diagnostic Traductions</CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Vérifiez l'état des données dans Supabase KV Store
              </p>
            </div>
          </div>
          <Button 
            onClick={runDiagnostic} 
            disabled={loading}
            size="sm"
            className="gap-2"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Scan...</>
            ) : (
              <><RefreshCw className="w-4 h-4" /> Lancer le diagnostic</>
            )}
          </Button>
        </div>
      </CardHeader>

      {data && (
        <CardContent className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Questions */}
            {(() => {
              const status = getStatus(data.questions.length);
              const StatusIcon = status.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`p-4 rounded-lg border-2 ${status.bg} border-${status.color.split('-')[1]}-200`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm text-slate-700">Questions</h4>
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl">{data.questions.length}</div>
                    <Badge variant={data.questions.length > 0 ? "default" : "secondary"}>
                      {status.label}
                    </Badge>
                  </div>
                  {data.questions.length > 0 && (
                    <div className="mt-2 text-xs text-slate-600">
                      {Object.keys(data.questions[0]?.translations || {}).length} langues détectées
                    </div>
                  )}
                </motion.div>
              );
            })()}

            {/* UI Texts */}
            {(() => {
              const status = getStatus(data.uiTexts.length);
              const StatusIcon = status.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`p-4 rounded-lg border-2 ${status.bg} border-${status.color.split('-')[1]}-200`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm text-slate-700">Textes UI</h4>
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl">{data.uiTexts.length}</div>
                    <Badge variant={data.uiTexts.length > 0 ? "default" : "secondary"}>
                      {status.label}
                    </Badge>
                  </div>
                </motion.div>
              );
            })()}

            {/* Countries */}
            {(() => {
              const status = getStatus(data.countries.length);
              const StatusIcon = status.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`p-4 rounded-lg border-2 ${status.bg} border-${status.color.split('-')[1]}-200`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm text-slate-700">Mappings Pays</h4>
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl">{data.countries.length}</div>
                    <Badge variant={data.countries.length > 0 ? "default" : "secondary"}>
                      {status.label}
                    </Badge>
                  </div>
                </motion.div>
              );
            })()}
          </div>

          {/* Detailed Results */}
          {data.questions.length > 0 && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>✅ Import réussi !</strong> Vos {data.questions.length} questions ont été importées avec succès.
                <div className="mt-2 text-sm">
                  Langues disponibles : {Object.keys(data.questions[0]?.translations || {}).join(', ')}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {data.questions.length === 0 && (
            <Alert className="bg-red-50 border-red-200">
              <XCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>❌ Aucune donnée trouvée</strong>
                <div className="mt-2 space-y-1 text-sm">
                  <div>Possible causes :</div>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>L'import n'a pas fonctionné (vérifiez la console)</li>
                    <li>Le serveur n'a pas sauvegardé les données</li>
                    <li>Structure JSON invalide</li>
                  </ul>
                  <div className="mt-3 font-medium">
                    → Vérifiez les logs de la console (F12) pour plus de détails
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Sample Question Data */}
          {data.questions.length > 0 && (
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-sm">📋 Exemple de donnée (première question)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge>{data.questions[0].questionId}</Badge>
                    <span className="text-sm text-slate-600">
                      {Object.keys(data.questions[0].translations || {}).length} langues
                    </span>
                  </div>
                  
                  {/* Show FR and EN translations if available */}
                  {data.questions[0].translations?.fr && (
                    <div className="p-3 bg-white rounded border text-sm">
                      <div className="text-xs text-slate-500 mb-1">🇫🇷 Français</div>
                      <div><strong>Label:</strong> {data.questions[0].translations.fr.label}</div>
                      {data.questions[0].translations.fr.placeholder && (
                        <div className="text-slate-600 mt-1">
                          <strong>Placeholder:</strong> {data.questions[0].translations.fr.placeholder}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {data.questions[0].translations?.en && (
                    <div className="p-3 bg-white rounded border text-sm">
                      <div className="text-xs text-slate-500 mb-1">🇬🇧 English</div>
                      <div><strong>Label:</strong> {data.questions[0].translations.en.label}</div>
                      {data.questions[0].translations.en.placeholder && (
                        <div className="text-slate-600 mt-1">
                          <strong>Placeholder:</strong> {data.questions[0].translations.en.placeholder}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* All Questions List */}
          {data.questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">📝 Liste complète ({data.questions.length} questions)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {data.questions.map((q: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded border text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{q.questionId}</Badge>
                        <span className="text-slate-700">
                          {q.translations?.fr?.label || q.translations?.en?.label || 'Sans label'}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {Object.keys(q.translations || {}).length} langues
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Country Language Generator - Show if missing mappings */}
          {data.countries.length < 27 && (
            <div className="pt-4 border-t border-slate-200">
              <CountryLanguageGenerator />
            </div>
          )}
        </CardContent>
      )}

      {!data && !loading && (
        <CardContent>
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Cliquez sur <strong>"Lancer le diagnostic"</strong> pour vérifier l'état des traductions dans la base de données.
            </AlertDescription>
          </Alert>
        </CardContent>
      )}

      {/* Logs Section */}
      {logs.length > 0 && (
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Logs du diagnostic</CardTitle>
            <Button
              onClick={() => setShowLogs(!showLogs)}
              size="sm"
              className="gap-2"
            >
              {showLogs ? (
                <><X className="w-4 h-4" /> Masquer les logs</>
              ) : (
                <><Terminal className="w-4 h-4" /> Afficher les logs</>
              )}
            </Button>
          </div>
          {showLogs && (
            <div className="max-h-64 overflow-y-auto space-y-2">
              {logs.map((log, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${log.type === 'error' ? 'bg-red-50' : log.type === 'warning' ? 'bg-orange-50' : 'bg-green-50'}`}>
                  <div className="flex items-center gap-2">
                    <Badge variant={log.type === 'error' ? 'outline' : log.type === 'warning' ? 'outline' : 'outline'} className={`text-${log.type === 'error' ? 'red-500' : log.type === 'warning' ? 'orange-500' : 'green-500'}`}>
                      {log.timestamp}
                    </Badge>
                    <span className={`text-sm ${log.type === 'error' ? 'text-red-500' : log.type === 'warning' ? 'text-orange-500' : 'text-green-500'}`}>
                      {log.message}
                    </span>
                  </div>
                  {log.details && (
                    <div className="mt-1 text-xs text-slate-600">
                      {log.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}