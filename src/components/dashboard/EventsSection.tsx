import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import {
  Calendar,
  Phone,
  Video,
  Mail,
  Users,
  Briefcase,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  Clock,
  MapPin,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Event {
  id: string;
  prospect_id: string;
  event_type: 'call' | 'meeting' | 'email' | 'demo' | 'proposal' | 'follow-up';
  title: string;
  description: string | null;
  start_datetime: string;
  end_datetime: string;
  location: string | null;
  attendees: any;
  reminder_time: number | null;
  reminder_sent: boolean;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  created_by: string | null;
  completed_at: string | null;
  created_at: string;
}

interface EventsSectionProps {
  prospectId: string;
  onUpdate?: () => void;
}

const EVENT_TYPES = {
  call: { label: 'Appel téléphonique', icon: Phone, color: 'bg-blue-100 text-blue-800 border-blue-200' },
  meeting: { label: 'Réunion', icon: Users, color: 'bg-purple-100 text-purple-800 border-purple-200' },
  email: { label: 'Email', icon: Mail, color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  demo: { label: 'Démonstration', icon: Video, color: 'bg-orange-100 text-orange-800 border-orange-200' },
  proposal: { label: 'Proposition', icon: FileText, color: 'bg-green-100 text-green-800 border-green-200' },
  'follow-up': { label: 'Suivi', icon: Briefcase, color: 'bg-slate-100 text-slate-800 border-slate-200' },
};

const STATUS_LABELS = {
  scheduled: { label: 'Planifié', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Terminé', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' },
  'no-show': { label: 'Absent', color: 'bg-orange-100 text-orange-800' },
};

export function EventsSection({ prospectId, onUpdate }: EventsSectionProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    event_type: 'call' as Event['event_type'],
    title: '',
    description: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
  });

  // Charger les événements
  useEffect(() => {
    if (!prospectId) return;
    loadEvents();
  }, [prospectId]);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events?prospect_id=${prospectId}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Erreur chargement événements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.start_datetime || !formData.end_datetime) return;

    setIsSaving(true);
    try {
      const url = editingEvent
        ? `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events/${editingEvent.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events`;

      const response = await fetch(url, {
        method: editingEvent ? 'PATCH' : 'POST',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prospect_id: prospectId,
          ...formData,
          location: formData.location || null,
          created_by: 'Admin',
        }),
      });

      const data = await response.json();
      if (data.success) {
        await loadEvents();
        resetForm();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Erreur sauvegarde événement:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (event: Event, newStatus: Event['status']) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events/${event.id}`,
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
        await loadEvents();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Erreur changement statut événement:', error);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet événement ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events/${eventId}`,
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
        await loadEvents();
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error('Erreur suppression événement:', error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      event_type: event.event_type,
      title: event.title,
      description: event.description || '',
      start_datetime: new Date(event.start_datetime).toISOString().slice(0, 16),
      end_datetime: new Date(event.end_datetime).toISOString().slice(0, 16),
      location: event.location || '',
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      event_type: 'call',
      title: '',
      description: '',
      start_datetime: '',
      end_datetime: '',
      location: '',
    });
    setEditingEvent(null);
    setShowAddForm(false);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let dateLabel = '';
    if (diffDays === 0) dateLabel = "Aujourd'hui";
    else if (diffDays === 1) dateLabel = 'Demain';
    else if (diffDays === -1) dateLabel = 'Hier';
    else if (diffDays < 0) dateLabel = `Il y a ${Math.abs(diffDays)} jours`;
    else if (diffDays < 7) dateLabel = `Dans ${diffDays} jours`;
    else dateLabel = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

    const time = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return { dateLabel, time, fullDate: date };
  };

  const getEventStatus = (event: Event) => {
    if (event.status !== 'scheduled') return event.status;
    
    const now = new Date();
    const start = new Date(event.start_datetime);
    const diffHours = (start.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours < 0) return 'overdue';
    if (diffHours < 2) return 'soon';
    return 'scheduled';
  };

  const upcomingEvents = events.filter((e) => e.status === 'scheduled');
  const pastEvents = events.filter((e) => e.status !== 'scheduled');

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-violet-600" />
          Agenda ({upcomingEvents.length} à venir)
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
          Planifier
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
          <Card className="p-4 bg-violet-50 border-violet-200">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs text-slate-600 mb-1.5 block">Type d'événement *</label>
                  <select
                    value={formData.event_type}
                    onChange={(e) =>
                      setFormData({ ...formData, event_type: e.target.value as Event['event_type'] })
                    }
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                  >
                    {Object.entries(EVENT_TYPES).map(([value, config]) => {
                      const Icon = config.icon;
                      return (
                        <option key={value} value={value}>
                          {config.label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-600 mb-1.5 block">Titre *</label>
                  <input
                    type="text"
                    placeholder="Ex: Appel de suivi commercial"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block">Début *</label>
                  <input
                    type="datetime-local"
                    value={formData.start_datetime}
                    onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-600 mb-1.5 block">Fin *</label>
                  <input
                    type="datetime-local"
                    value={formData.end_datetime}
                    onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-600 mb-1.5 block">Lieu (optionnel)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ex: Visioconférence, Bureau Paris..."
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 bg-white rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-600 mb-1.5 block">Description</label>
                  <Textarea
                    placeholder="Notes, ordre du jour, points à aborder..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white text-sm min-h-[60px]"
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
                  className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
                  disabled={
                    !formData.title.trim() ||
                    !formData.start_datetime ||
                    !formData.end_datetime ||
                    isSaving
                  }
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : editingEvent ? (
                    'Modifier'
                  ) : (
                    'Créer l\'événement'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Liste des événements */}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {events.length === 0 && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <p className="text-sm text-slate-600">Aucun événement planifié</p>
              <p className="text-xs text-slate-500 mt-1">Cliquez sur "Planifier" pour créer un rendez-vous</p>
            </div>
          )}

          {/* Événements à venir */}
          {upcomingEvents.length > 0 && (
            <div className="space-y-2">
              {upcomingEvents.map((event) => {
                const eventType = EVENT_TYPES[event.event_type];
                const Icon = eventType.icon;
                const { dateLabel, time } = formatDateTime(event.start_datetime);
                const status = getEventStatus(event);

                return (
                  <Card
                    key={event.id}
                    className={`p-3 border transition-all hover:shadow-md group ${
                      status === 'overdue'
                        ? 'bg-red-50 border-red-200'
                        : status === 'soon'
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-white border-violet-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${eventType.color} flex-shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">{event.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5">
                              <span className="mr-2">📅 {dateLabel}</span>
                              <span className="mr-2">🕐 {time}</span>
                              {event.location && <span>📍 {event.location}</span>}
                            </p>
                          </div>

                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <button
                              onClick={() => handleEdit(event)}
                              className="p-1 hover:bg-violet-100 rounded text-violet-600"
                              title="Modifier"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              className="p-1 hover:bg-red-100 rounded text-red-600"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {event.description && (
                          <p className="text-xs text-slate-600 mb-2">{event.description}</p>
                        )}

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleToggleStatus(event, 'completed')}
                            className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Terminé
                          </button>
                          <button
                            onClick={() => handleToggleStatus(event, 'cancelled')}
                            className="text-xs px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Événements passés */}
          {pastEvents.length > 0 && (
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Historique ({pastEvents.length})</p>
              <div className="space-y-2">
                {pastEvents.slice(0, 3).map((event) => {
                  const eventType = EVENT_TYPES[event.event_type];
                  const Icon = eventType.icon;
                  const statusConfig = STATUS_LABELS[event.status];

                  return (
                    <Card key={event.id} className="p-2 bg-slate-50 border-slate-200 opacity-70">
                      <div className="flex items-start gap-2">
                        <Icon className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-600">{event.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={`text-xs ${statusConfig.color}`}>
                              {statusConfig.label}
                            </Badge>
                            <p className="text-xs text-slate-500">
                              {new Date(event.start_datetime).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
