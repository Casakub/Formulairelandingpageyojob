import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Mail, CheckCircle2, Clock, Play, Pause, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import type { AutomationWorkflow, AutomationRun } from '../../types/automations';

interface ProspectAutomationPanelProps {
  prospectId: string;
  prospectEmail: string;
  prospectType: string;
}

export function ProspectAutomationPanel({ prospectId, prospectEmail, prospectType }: ProspectAutomationPanelProps) {
  const [activeWorkflows, setActiveWorkflows] = useState<AutomationWorkflow[]>([]);
  const [currentRuns, setCurrentRuns] = useState<AutomationRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAutomationData();
  }, [prospectId]);

  const loadAutomationData = async () => {
    setIsLoading(true);
    try {
      // Charger les workflows actifs pour ce prospect
      const [workflowsRes, runsRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflows?status=active`,
          { headers: { Authorization: `Bearer ${publicAnonKey}` } }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/runs?prospect_email=${encodeURIComponent(prospectEmail)}`,
          { headers: { Authorization: `Bearer ${publicAnonKey}` } }
        ),
      ]);

      const [workflowsData, runsData] = await Promise.all([
        workflowsRes.json(),
        runsRes.json(),
      ]);

      if (workflowsData.success) {
        // Filtrer les workflows applicables à ce type de prospect
        const applicable = workflowsData.workflows.filter((w: AutomationWorkflow) => {
          const hasTypeCondition = w.conditions?.some(c => 
            c.type === 'prospect_type' && c.value === prospectType
          );
          return !w.conditions || w.conditions.length === 0 || hasTypeCondition;
        });
        setActiveWorkflows(applicable);
      }

      if (runsData.success) {
        setCurrentRuns(runsData.runs || []);
      }
    } catch (error) {
      console.error('Erreur chargement automations prospect:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseRun = async (runId: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/runs/${runId}/cancel`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      loadAutomationData();
    } catch (error) {
      console.error('Erreur pause exécution:', error);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-6 text-center text-slate-500">
          Chargement des automatisations...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Workflows actifs applicables */}
      <Card className="border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 text-base">Automatisations actives</CardTitle>
              <p className="text-slate-600 text-xs">
                {activeWorkflows.length} workflow(s) applicable(s)
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeWorkflows.length === 0 ? (
            <div className="text-center py-4 text-slate-500 text-sm">
              Aucun workflow actif pour ce prospect
            </div>
          ) : (
            <div className="space-y-2">
              {activeWorkflows.map(workflow => (
                <div
                  key={workflow.id}
                  className="p-3 bg-white border border-slate-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-slate-900">{workflow.name}</div>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      <Play className="w-3 h-3 mr-1" />
                      Actif
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-600">
                    {workflow.steps?.length || 0} étapes • Taux de succès {workflow.stats?.conversion_rate || 0}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exécutions en cours */}
      {currentRuns.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Exécutions en cours ({currentRuns.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentRuns.map(run => {
                const progress = (run.current_step / run.total_steps) * 100;
                const isRunning = run.status === 'running';
                const isFailed = run.status === 'failed';

                return (
                  <motion.div
                    key={run.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-slate-900 mb-1">
                          {run.workflow_name}
                        </div>
                        <div className="text-xs text-slate-600">
                          Étape {run.current_step}/{run.total_steps}
                        </div>
                      </div>
                      {isRunning && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePauseRun(run.id)}
                          className="h-7 px-2"
                        >
                          <Pause className="w-3 h-3 mr-1" />
                          Pause
                        </Button>
                      )}
                      {isFailed && (
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Échec
                        </Badge>
                      )}
                    </div>

                    {/* Barre de progression */}
                    <div className="mb-2">
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFailed 
                              ? 'bg-red-500' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {run.metadata?.emails_sent || 0} emails
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {run.metadata?.tasks_created || 0} tâches
                      </span>
                      {run.next_step_at && (
                        <span className="ml-auto">
                          Prochaine: {new Date(run.next_step_at).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                    </div>

                    {run.error_message && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                        ⚠️ {run.error_message}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lien vers page automatisations */}
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2"
        onClick={() => window.location.href = '/dashboard?tab=automations'}
      >
        <ExternalLink className="w-4 h-4" />
        Gérer les automatisations
      </Button>
    </div>
  );
}
