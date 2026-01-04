import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Workflow, 
  Plus, 
  Play, 
  Pause, 
  Archive, 
  Trash2, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  TrendingUp,
  RefreshCw,
  Settings,
  Zap,
  BarChart3,
  FileText,
  AlertTriangle,
  Copy,
  History,
  Sparkles,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { WorkflowBuilder } from './WorkflowBuilder';
import { EmailTemplateEditor } from './EmailTemplateEditor';
import { AIWorkflowAdvisor } from './AIWorkflowAdvisor';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import type { AutomationWorkflow, AutomationRun, EmailTemplate, WorkflowTemplate } from '../../types/automations';

interface AutomationStats {
  total_workflows: number;
  active_workflows: number;
  total_runs: number;
  running_now: number;
  success_rate: number;
  total_emails_sent: number;
  total_tasks_created: number;
  recent_errors: number;
}

const STATUS_BADGES = {
  active: { bg: '#dcfce7', text: '#15803d', label: 'Actif', icon: Play },
  draft: { bg: '#f3f4f6', text: '#6b7280', label: 'Brouillon', icon: FileText },
  paused: { bg: '#fef3c7', text: '#b45309', label: 'En pause', icon: Pause },
  archived: { bg: '#fee2e2', text: '#b91c1c', label: 'Archivé', icon: Archive },
};

const RUN_STATUS_BADGES = {
  pending: { bg: '#f3f4f6', text: '#6b7280', label: 'En attente', icon: Clock },
  running: { bg: '#dbeafe', text: '#1d4ed8', label: 'En cours', icon: Zap },
  completed: { bg: '#dcfce7', text: '#15803d', label: 'Complété', icon: CheckCircle2 },
  failed: { bg: '#fee2e2', text: '#b91c1c', label: 'Échec', icon: AlertCircle },
  cancelled: { bg: '#f3f4f6', text: '#6b7280', label: 'Annulé', icon: AlertTriangle },
};

export function AutomationsPage() {
  const [activeTab, setActiveTab] = useState('workflows');
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>([]);
  const [runs, setRuns] = useState<AutomationRun[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [workflowTemplates, setWorkflowTemplates] = useState<WorkflowTemplate[]>([]);
  const [stats, setStats] = useState<AutomationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [workflowBuilderOpen, setWorkflowBuilderOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<AutomationWorkflow | null>(null);
  const [emailTemplateEditorOpen, setEmailTemplateEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);

  // Charger les données
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, workflowsRes, runsRes, templatesRes, workflowTemplatesRes] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/stats`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflows`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/runs?limit=10`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/templates`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflow-templates`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }),
      ]);

      const [statsData, workflowsData, runsData, templatesData, workflowTemplatesData] = await Promise.all([
        statsRes.json(),
        workflowsRes.json(),
        runsRes.json(),
        templatesRes.json(),
        workflowTemplatesRes.json(),
      ]);

      if (statsData.success) setStats(statsData.stats);
      if (workflowsData.success) setWorkflows(workflowsData.workflows);
      if (runsData.success) setRuns(runsData.runs);
      if (templatesData.success) setTemplates(templatesData.templates);
      if (workflowTemplatesData.success) setWorkflowTemplates(workflowTemplatesData.templates);
    } catch (error) {
      console.error('Erreur chargement automations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Actions sur workflows
  const handleToggleWorkflow = async (workflowId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflows/${workflowId}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      if (data.success) {
        loadData();
      }
    } catch (error) {
      console.error('Erreur toggle workflow:', error);
    }
  };

  const handleDeleteWorkflow = async (workflowId: string) => {
    if (!confirm('Supprimer ce workflow ? Cette action est irréversible.')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflows/${workflowId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        loadData();
      }
    } catch (error) {
      console.error('Erreur suppression workflow:', error);
    }
  };

  const handleInstantiateTemplate = async (templateId: string, templateName: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflow-templates/${templateId}/instantiate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: templateName }),
        }
      );

      const data = await response.json();
      if (data.success) {
        loadData();
        setActiveTab('workflows');
      }
    } catch (error) {
      console.error('Erreur création workflow:', error);
    }
  };

  const handleSaveWorkflow = async (workflow: Partial<AutomationWorkflow>) => {
    try {
      // Déterminer si c'est une création ou une mise à jour
      const isEditing = !!(workflow as any).id;
      const url = isEditing
        ? `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflows/${(workflow as any).id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflows`;

      const response = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflow),
      });

      const data = await response.json();
      if (data.success) {
        loadData();
        setWorkflowBuilderOpen(false);
        setEditingWorkflow(null); // Réinitialiser le workflow en édition
        setActiveTab('workflows');
      }
    } catch (error) {
      console.error('Erreur sauvegarde workflow:', error);
    }
  };

  const handleSaveTemplate = async (template: Partial<EmailTemplate>) => {
    try {
      const isEditing = !!(template as any).id;
      const url = isEditing
        ? `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/templates/${(template as any).id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/templates`;

      const response = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });

      const data = await response.json();
      if (data.success) {
        loadData();
        setEmailTemplateEditorOpen(false);
        setEditingTemplate(null);
        setActiveTab('templates');
      }
    } catch (error) {
      console.error('Erreur sauvegarde template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Supprimer ce template ? Cette action est irréversible.')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/templates/${templateId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        loadData();
      }
    } catch (error) {
      console.error('Erreur suppression template:', error);
    }
  };

  const handleDuplicateWorkflow = async (workflow: AutomationWorkflow) => {
    try {
      const duplicatedWorkflow = {
        name: `${workflow.name} (copie)`,
        description: workflow.description,
        trigger: workflow.trigger,
        conditions: workflow.conditions,
        steps: workflow.steps,
        status: 'draft' as const,
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/automations/workflows`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(duplicatedWorkflow),
        }
      );

      const data = await response.json();
      if (data.success) {
        loadData();
        setActiveTab('workflows');
      }
    } catch (error) {
      console.error('Erreur duplication workflow:', error);
    }
  };

  const filteredWorkflows = filterStatus === 'all'
    ? workflows
    : workflows.filter(w => w.status === filterStatus);

  const KPI_CARDS = [
    {
      icon: Workflow,
      gradient: 'from-blue-500 to-cyan-500',
      value: stats?.total_workflows || 0,
      label: 'Workflows',
      sublabel: `${stats?.active_workflows || 0} actifs`,
      progress: stats?.total_workflows ? Math.round((stats.active_workflows / stats.total_workflows) * 100) : 0,
    },
    {
      icon: Zap,
      gradient: 'from-violet-500 to-purple-500',
      value: stats?.total_runs || 0,
      label: 'Exécutions',
      sublabel: `${stats?.running_now || 0} en cours`,
      progress: stats?.success_rate || 0,
    },
    {
      icon: Mail,
      gradient: 'from-orange-500 to-amber-500',
      value: stats?.total_emails_sent || 0,
      label: 'Emails envoyés',
      sublabel: 'Dernières 30j',
      progress: 85,
    },
    {
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      value: `${stats?.success_rate || 0}%`,
      label: 'Taux de succès',
      sublabel: `${stats?.recent_errors || 0} erreurs récentes`,
      progress: stats?.success_rate || 0,
    },
  ];

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900">Automatisations & Relances</h1>
            <p className="text-slate-600 text-sm mt-1">
              Gérez vos workflows automatiques, templates d'emails et relances multi-étapes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" onClick={loadData}>
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
            <Button 
              onClick={() => setAiAdvisorOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md gap-2"
            >
              <Sparkles className="w-4 h-4" />
              IA Conseiller
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md gap-2"
              onClick={() => setWorkflowBuilderOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Nouveau workflow
            </Button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Card className="border-slate-200 bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center mb-4`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-slate-900 text-3xl mb-1">{kpi.value}</div>
                <div className="text-slate-600 text-sm mb-1">{kpi.label}</div>
                <div className="text-cyan-600 text-xs mb-3">{kpi.sublabel}</div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${kpi.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white border border-slate-200">
          <TabsTrigger value="workflows" className="gap-2">
            <Workflow className="w-4 h-4" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="runs" className="gap-2">
            <Zap className="w-4 h-4" />
            Exécutions
          </TabsTrigger>
          <TabsTrigger value="library" className="gap-2">
            <Settings className="w-4 h-4" />
            Bibliothèque
          </TabsTrigger>
        </TabsList>

        {/* Tab: Workflows */}
        <TabsContent value="workflows" className="space-y-4">
          {/* Filtres */}
          <div className="flex items-center gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              Tous ({workflows.length})
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('active')}
            >
              Actifs ({workflows.filter(w => w.status === 'active').length})
            </Button>
            <Button
              variant={filterStatus === 'draft' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('draft')}
            >
              Brouillons ({workflows.filter(w => w.status === 'draft').length})
            </Button>
            <Button
              variant={filterStatus === 'paused' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('paused')}
            >
              En pause ({workflows.filter(w => w.status === 'paused').length})
            </Button>
          </div>

          {/* Liste workflows */}
          {isLoading ? (
            <Card>
              <CardContent className="p-12 text-center text-slate-500">
                Chargement...
              </CardContent>
            </Card>
          ) : filteredWorkflows.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Workflow className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Aucun workflow trouvé</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Créez votre premier workflow automatique ou utilisez un template pré-configuré
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un workflow
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredWorkflows.map((workflow, idx) => {
                const statusBadge = STATUS_BADGES[workflow.status];
                const StatusIcon = statusBadge.icon;

                return (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CardTitle className="text-slate-900 text-lg">
                                {workflow.name}
                              </CardTitle>
                              {workflow.version && (
                                <Badge variant="outline" className="text-xs">
                                  v{workflow.version}
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-600 text-sm">
                              {workflow.description}
                            </p>
                          </div>
                          <Badge
                            style={{ backgroundColor: statusBadge.bg, color: statusBadge.text }}
                            className="gap-1.5"
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusBadge.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg text-slate-900">{workflow.stats.total_runs}</div>
                            <div className="text-xs text-slate-600">Exécutions</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg text-green-600">{workflow.stats.success_runs}</div>
                            <div className="text-xs text-slate-600">Succès</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg text-cyan-600">{workflow.stats.conversion_rate}%</div>
                            <div className="text-xs text-slate-600">Conversion</div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => handleToggleWorkflow(workflow.id, workflow.status)}
                          >
                            {workflow.status === 'active' ? (
                              <>
                                <Pause className="w-4 h-4" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                Activer
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => {
                              setEditingWorkflow(workflow);
                              setWorkflowBuilderOpen(true);
                            }}
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDuplicateWorkflow(workflow)}
                            title="Dupliquer"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteWorkflow(workflow.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>

                        {/* Version history link */}
                        {workflow.version_history && workflow.version_history.length > 0 && (
                          <div className="flex items-center justify-center mt-2 text-xs text-slate-600">
                            <History className="w-3 h-3 mr-1" />
                            {workflow.version_history.length} version{workflow.version_history.length > 1 ? 's' : ''} précédente{workflow.version_history.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Tab: Templates Email */}
        <TabsContent value="templates" className="space-y-4">
          {/* Header with button */}
          <div className="flex items-center justify-between">
            <p className="text-slate-600 text-sm">
              Gérez vos templates d'emails réutilisables
            </p>
            <Button
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md gap-2"
              onClick={() => setEmailTemplateEditorOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Nouveau template
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-slate-900 text-lg mb-1">
                          {template.name}
                        </CardTitle>
                        <p className="text-slate-600 text-sm">{template.description}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {template.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="text-xs text-slate-600 mb-1">Sujet :</div>
                      <div className="text-sm text-slate-900 bg-slate-50 p-2 rounded">
                        {template.subject}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-600 mb-1">Variables :</div>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map(variable => (
                          <Badge key={variable} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Utilisé {template.usage_count} fois</span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingTemplate(template);
                            setEmailTemplateEditorOpen(true);
                          }}
                        >
                          Modifier
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Tab: Exécutions */}
        <TabsContent value="runs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-slate-900">Exécutions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              {runs.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  Aucune exécution en cours
                </div>
              ) : (
                <div className="space-y-3">
                  {runs.map(run => {
                    const statusBadge = RUN_STATUS_BADGES[run.status];
                    const StatusIcon = statusBadge.icon;

                    return (
                      <div
                        key={run.id}
                        className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-sm text-slate-900 mb-1">
                              {run.workflow_name}
                            </div>
                            <div className="text-xs text-slate-600">
                              {run.prospect_name} ({run.prospect_email})
                            </div>
                          </div>
                          <Badge
                            style={{ backgroundColor: statusBadge.bg, color: statusBadge.text }}
                            className="gap-1.5"
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusBadge.label}
                          </Badge>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                            <span>Étape {run.current_step} / {run.total_steps}</span>
                            <span>{Math.round((run.current_step / run.total_steps) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                              style={{ width: `${(run.current_step / run.total_steps) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-600">
                          <span>📧 {run.metadata.emails_sent} emails</span>
                          <span>✅ {run.metadata.tasks_created} tâches</span>
                          <span className="ml-auto">
                            {new Date(run.started_at).toLocaleString('fr-FR')}
                          </span>
                        </div>

                        {run.error_message && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
                            ⚠️ {run.error_message}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Bibliothèque (templates de workflows) */}
        <TabsContent value="library" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {workflowTemplates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4`}>
                      <Workflow className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-slate-900 text-lg mb-2">{template.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{template.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="capitalize">{template.category}</Badge>
                      <span className="text-xs text-slate-600">
                        {template.estimated_duration_days} jours
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mb-4">
                      {template.steps.length} étapes configurées
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      onClick={() => handleInstantiateTemplate(template.id, template.name)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Utiliser ce template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Workflow Builder Dialog */}
      <WorkflowBuilder
        open={workflowBuilderOpen}
        onClose={() => {
          setWorkflowBuilderOpen(false);
          setEditingWorkflow(null);
        }}
        onSave={handleSaveWorkflow}
        editingWorkflow={editingWorkflow}
      />

      {/* Email Template Editor Dialog */}
      <EmailTemplateEditor
        open={emailTemplateEditorOpen}
        onClose={() => {
          setEmailTemplateEditorOpen(false);
          setEditingTemplate(null);
        }}
        onSave={handleSaveTemplate}
        editingTemplate={editingTemplate}
      />

      {/* AI Workflow Advisor Dialog */}
      <AIWorkflowAdvisor
        open={aiAdvisorOpen}
        onClose={() => setAiAdvisorOpen(false)}
        onImplement={() => {
          loadData(); // Recharger les données après implémentation
          setActiveTab('workflows'); // Aller sur l'onglet workflows
        }}
      />
    </div>
  );
}