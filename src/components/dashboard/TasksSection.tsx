import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  Calendar,
  Flag,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Task {
  id: string;
  prospect_id: string;
  assigned_to: string | null;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string | null;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
}

interface TasksSectionProps {
  prospectId: string;
  onUpdate?: () => void;
}

const PRIORITY_CONFIG = {
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-800 border-red-200', icon: '🔥' },
  high: { label: 'Haute', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '⚠️' },
  medium: { label: 'Moyenne', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '📌' },
  low: { label: 'Basse', color: 'bg-slate-100 text-slate-800 border-slate-200', icon: '📋' },
};

export function TasksSection({ prospectId, onUpdate }: TasksSectionProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    due_date: '',
  });

  // Charger les tâches
  useEffect(() => {
    if (!prospectId) return;
    loadTasks();
  }, [prospectId]);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/tasks?prospect_id=${prospectId}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks || []);
      }
    } catch (error) {
      console.error('Erreur chargement tâches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;

    setIsSaving(true);
    try {
      const url = editingTask
        ? `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/tasks/${editingTask.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/tasks`;

      const response = await fetch(url, {
        method: editingTask ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prospect_id: prospectId,
          ...formData,
          due_date: formData.due_date || null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        await loadTasks();
        resetForm();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Erreur sauvegarde tâche:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/tasks/${task.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !task.completed }),
        }
      );

      const data = await response.json();
      if (data.success) {
        await loadTasks();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Erreur toggle tâche:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette tâche ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/tasks/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        await loadTasks();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Erreur suppression tâche:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      due_date: task.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : '',
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      due_date: '',
    });
    setEditingTask(null);
    setShowAddForm(false);
  };

  const getTaskStatus = (task: Task) => {
    if (task.completed) return 'completed';
    if (!task.due_date) return 'normal';
    
    const dueDate = new Date(task.due_date);
    const now = new Date();
    const diffHours = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours < 0) return 'overdue';
    if (diffHours < 24) return 'urgent';
    return 'normal';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Demain';
    if (diffDays === -1) return 'Hier';
    if (diffDays < 0) return `Il y a ${Math.abs(diffDays)} jours`;
    if (diffDays < 7) return `Dans ${diffDays} jours`;

    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-900 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          Tâches ({activeTasks.length} active{activeTasks.length > 1 ? 's' : ''})
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
      </div>

      {/* Formulaire d'ajout/édition */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4"
        >
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">Titre de la tâche *</label>
                <input
                  type="text"
                  placeholder="Ex: Envoyer la proposition commerciale"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 mb-1.5 block">Description</label>
                <Textarea
                  placeholder="Détails de la tâche..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white text-sm min-h-[60px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block">Priorité</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value as Task['priority'] })
                    }
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                  >
                    <option value="low">📋 Basse</option>
                    <option value="medium">📌 Moyenne</option>
                    <option value="high">⚠️ Haute</option>
                    <option value="urgent">🔥 Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block">Échéance</label>
                  <input
                    type="datetime-local"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetForm}
                  className="flex-1"
                  disabled={isSaving}
                >
                  Annuler
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  disabled={!formData.title.trim() || isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : editingTask ? (
                    'Modifier'
                  ) : (
                    'Créer la tâche'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Liste des tâches */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Tâches actives */}
          {activeTasks.length === 0 && completedTasks.length === 0 && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <p className="text-sm text-slate-600">Aucune tâche pour le moment</p>
              <p className="text-xs text-slate-500 mt-1">Cliquez sur "Ajouter" pour créer une tâche</p>
            </div>
          )}

          {activeTasks.map((task) => {
            const status = getTaskStatus(task);
            const priorityConfig = PRIORITY_CONFIG[task.priority];

            return (
              <Card
                key={task.id}
                className={`p-3 border transition-all hover:shadow-md group ${
                  status === 'overdue'
                    ? 'bg-red-50 border-red-200'
                    : status === 'urgent'
                    ? 'bg-orange-50 border-orange-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      task.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {task.title}
                      </p>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-1 hover:bg-blue-100 rounded text-blue-600"
                          title="Modifier"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-600 mb-2">{task.description}</p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={`text-xs ${priorityConfig.color}`}>
                        {priorityConfig.icon} {priorityConfig.label}
                      </Badge>

                      {task.due_date && (
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            status === 'overdue'
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : status === 'urgent'
                              ? 'bg-orange-100 text-orange-800 border-orange-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(task.due_date)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Tâches complétées */}
          {completedTasks.length > 0 && (
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">✓ Terminées ({completedTasks.length})</p>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <Card key={task.id} className="p-2 bg-slate-50 border-slate-200 opacity-60">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 line-through">{task.title}</p>
                        {task.completed_at && (
                          <p className="text-xs text-slate-500 mt-1">
                            Terminée le {new Date(task.completed_at).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
