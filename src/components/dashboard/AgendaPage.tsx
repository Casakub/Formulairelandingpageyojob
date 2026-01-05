import { motion } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  Phone,
  Video,
  Mail,
  Users,
  Briefcase,
  FileText,
  AlertTriangle,
  CheckCircle,
  Loader2,
  MapPin,
  List,
  Grid,
  Search,
  TrendingUp,
  X,
  ExternalLink,
  Check,
  XCircle,
  BarChart3,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { EventDetailsModal } from './EventDetailsModal';

interface Event {
  id: string;
  prospect_id: string;
  event_type: 'call' | 'meeting' | 'email' | 'demo' | 'proposal' | 'follow-up';
  title: string;
  description: string | null;
  start_datetime: string;
  end_datetime: string;
  location: string | null;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  created_by: string | null;
  created_at: string;
}

interface Prospect {
  id: string;
  company_name: string;
  contact_email: string;
  country: string;
}

const EVENT_TYPES = {
  call: { label: 'Appel', icon: Phone, color: 'bg-blue-500' },
  meeting: { label: 'Réunion', icon: Users, color: 'bg-purple-500' },
  email: { label: 'Email', icon: Mail, color: 'bg-cyan-500' },
  demo: { label: 'Démo', icon: Video, color: 'bg-orange-500' },
  proposal: { label: 'Proposition', icon: FileText, color: 'bg-green-500' },
  'follow-up': { label: 'Suivi', icon: Briefcase, color: 'bg-slate-500' },
};

const STATUS_CONFIG = {
  scheduled: { label: 'Planifié', color: 'bg-blue-100 text-blue-700', icon: Clock },
  completed: { label: 'Terminé', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-700', icon: XCircle },
  'no-show': { label: 'Absent', color: 'bg-orange-100 text-orange-700', icon: AlertTriangle },
};

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

type ViewMode = 'calendar' | 'list';
type PeriodFilter = 'all' | 'today' | 'week' | 'month';

export function AgendaPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Filtres
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Charger les événements et prospects au montage
  useEffect(() => {
    loadData();
  }, []);

  // Polling automatique toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      loadData(true); // true = silent refresh (pas de loading spinner)
    }, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, []);

  const loadData = async (silent = false) => {
    if (!silent) setIsLoading(true);
    setIsRefreshing(true);
    try {
      const eventsUrl = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events`;
      const prospectsUrl = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/list`;
      
      const eventsResponse = await fetch(eventsUrl, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      const prospectsResponse = await fetch(prospectsUrl, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      // Lire les réponses en tant que texte d'abord
      const eventsText = await eventsResponse.text();
      const prospectsText = await prospectsResponse.text();
      
      // Vérifier si c'est du JSON valide
      let eventsData, prospectsData;
      
      try {
        eventsData = JSON.parse(eventsText);
      } catch (e) {
        console.error('❌ Erreur parsing events JSON:', e);
        console.error('❌ Réponse complète:', eventsText);
        eventsData = { success: false, events: [] };
      }
      
      try {
        prospectsData = JSON.parse(prospectsText);
      } catch (e) {
        console.error('❌ Erreur parsing prospects JSON:', e);
        prospectsData = { success: false, prospects: [] };
      }

      if (eventsData.success) {
        setEvents(eventsData.events || []);
      } else {
        setEvents([]);
      }
      
      if (prospectsData.success) {
        setProspects(prospectsData.prospects || []);
      } else {
        setProspects([]);
      }
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('❌ Erreur chargement agenda:', error);
      // En cas d'erreur réseau, mettre des tableaux vides
      setEvents([]);
      setProspects([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fonction de rafraîchissement manuel
  const handleRefresh = () => {
    loadData();
  };

  // Mettre à jour le statut d'un événement
  const updateEventStatus = async (eventId: string, newStatus: Event['status']) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events/${eventId}`,
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
        setEvents(events.map(e => e.id === eventId ? { ...e, status: newStatus } : e));
      }
    } catch (error) {
      console.error('Erreur mise à jour événement:', error);
    }
  };

  // Obtenir les événements du jour
  const getTodayEvents = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return events.filter((e) => {
      const eventDate = new Date(e.start_datetime);
      return (
        e.status === 'scheduled' &&
        eventDate >= today &&
        eventDate < tomorrow
      );
    }).sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime());
  };

  // Obtenir les événements à venir (prochaines 24h)
  const getUpcomingEvents = () => {
    const now = new Date();
    const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return events.filter((e) => {
      const eventDate = new Date(e.start_datetime);
      return (
        e.status === 'scheduled' &&
        eventDate >= now &&
        eventDate <= next24h
      );
    }).sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime());
  };

  // Filtrer les événements pour la vue liste
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    // Filtre par type
    if (filterType !== 'all') {
      filtered = filtered.filter(e => e.event_type === filterType);
    }

    // Filtre par statut
    if (filterStatus !== 'all') {
      filtered = filtered.filter(e => e.status === filterStatus);
    }

    // Filtre par période
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (periodFilter === 'today') {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.start_datetime);
        return eventDate >= today && eventDate < tomorrow;
      });
    } else if (periodFilter === 'week') {
      const weekEnd = new Date(today);
      weekEnd.setDate(weekEnd.getDate() + 7);
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.start_datetime);
        return eventDate >= today && eventDate < weekEnd;
      });
    } else if (periodFilter === 'month') {
      const monthEnd = new Date(today);
      monthEnd.setMonth(monthEnd.getMonth() + 1);
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.start_datetime);
        return eventDate >= today && eventDate < monthEnd;
      });
    }

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e => {
        const prospect = getProspectForEvent(e.prospect_id);
        return (
          e.title.toLowerCase().includes(query) ||
          e.description?.toLowerCase().includes(query) ||
          prospect?.company_name.toLowerCase().includes(query)
        );
      });
    }

    // Trier par date (plus récent en premier)
    filtered.sort((a, b) => new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime());

    return filtered;
  }, [events, filterType, filterStatus, periodFilter, searchQuery]);

  // Grouper les événements par date
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: Event[] } = {};
    
    filteredEvents.forEach(event => {
      const eventDate = new Date(event.start_datetime);
      const dateKey = eventDate.toISOString().split('T')[0]; // YYYY-MM-DD
      
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });

    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [filteredEvents]);

  // Statistiques
  const stats = useMemo(() => {
    return {
      total: events.length,
      scheduled: events.filter(e => e.status === 'scheduled').length,
      completed: events.filter(e => e.status === 'completed').length,
      cancelled: events.filter(e => e.status === 'cancelled').length,
      upcoming: getUpcomingEvents().length,
    };
  }, [events]);

  // Générer les jours du calendrier
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    
    const dayOfWeek = firstDay.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startDate.setDate(firstDay.getDate() - diff);

    const days = [];
    const currentDay = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  // Obtenir les événements d'un jour
  const getEventsForDay = (date: Date) => {
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    return events.filter((e) => {
      if (filterStatus !== 'all' && e.status !== filterStatus) return false;
      if (filterType !== 'all' && e.event_type !== filterType) return false;
      
      const eventDate = new Date(e.start_datetime);
      return eventDate >= dayStart && eventDate < dayEnd;
    });
  };

  const getProspectForEvent = (prospectId: string) => {
    return prospects.find((p) => p.id === prospectId);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Aujourd\'hui';
    if (date.toDateString() === tomorrow.toDateString()) return 'Demain';
    if (date.toDateString() === yesterday.toDateString()) return 'Hier';

    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  };

  const isEventPast = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const isEventSoon = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffMinutes = (eventDate.getTime() - now.getTime()) / (1000 * 60);
    return diffMinutes > 0 && diffMinutes < 60;
  };

  const upcomingEvents = getUpcomingEvents();
  const todayEvents = getTodayEvents();
  const calendarDays = getCalendarDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-8 h-8 text-violet-600" />
              <div>
                <h1 className="text-slate-900">Agenda & Calendrier</h1>
                <p className="text-slate-600 text-sm">
                  {stats.total} événements · {stats.upcoming} à venir
                  {!isLoading && (
                    <span className="ml-2 text-slate-400">
                      · Actualisé il y a {Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000)}s
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Actions & Toggle View */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="relative"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
              <div className="h-8 w-px bg-slate-200" />
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className={viewMode === 'calendar' ? 'bg-gradient-to-r from-violet-600 to-purple-600' : ''}
              >
                <Grid className="w-4 h-4 mr-2" />
                Calendrier
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-gradient-to-r from-violet-600 to-purple-600' : ''}
              >
                <List className="w-4 h-4 mr-2" />
                Liste
              </Button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
            <Card className="p-4 border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-slate-900">{stats.total}</p>
                  <p className="text-xs text-slate-600">Total</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl text-slate-900">{stats.upcoming}</p>
                  <p className="text-xs text-slate-600">Prochaines 24h</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-slate-900">{stats.scheduled}</p>
                  <p className="text-xs text-slate-600">Planifiés</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl text-slate-900">{stats.completed}</p>
                  <p className="text-xs text-slate-600">Terminés</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl text-slate-900">{stats.cancelled}</p>
                  <p className="text-xs text-slate-600">Annulés</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Widget Mes RDV du jour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-orange-500 to-pink-500 text-white border-0 shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-white">Mes rendez-vous du jour</h2>
                    <p className="text-white/80 text-sm">
                      {todayEvents.length === 0
                        ? 'Aucun rendez-vous prévu'
                        : `${todayEvents.length} rendez-vous ${todayEvents.length > 1 ? 'prévus' : 'prévu'}`}
                    </p>
                  </div>
                </div>
                {upcomingEvents.length > 0 && (
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {upcomingEvents.length} dans les 24h
                  </Badge>
                )}
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-white/60" />
                  <p className="text-white/80">Aucun rendez-vous prévu dans les prochaines 24h</p>
                  <p className="text-white/60 text-sm mt-1">Profitez-en pour planifier vos prochains rendez-vous !</p>
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.slice(0, 6).map((event) => {
                    const eventType = EVENT_TYPES[event.event_type];
                    const Icon = eventType.icon;
                    const prospect = getProspectForEvent(event.prospect_id);
                    const eventDate = new Date(event.start_datetime);
                    const now = new Date();
                    const diffMinutes = Math.floor((eventDate.getTime() - now.getTime()) / (1000 * 60));
                    const isVeryClose = diffMinutes < 60;

                    return (
                      <motion.div
                        key={event.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl backdrop-blur-sm border ${
                          isVeryClose
                            ? 'bg-red-500/30 border-red-300/50'
                            : 'bg-white/20 border-white/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${eventType.color} flex-shrink-0`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{event.title}</p>
                            <p className="text-xs text-white/70 truncate mt-1">
                              {prospect?.company_name || 'Prospect inconnu'}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-white/80">
                              <Clock className="w-3 h-3" />
                              {formatTime(event.start_datetime)}
                              {isVeryClose && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  Dans {diffMinutes}min
                                </Badge>
                              )}
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1 mt-1 text-xs text-white/70">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Vue Calendrier ou Liste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-slate-200 shadow-xl">
            <div className="p-6">
              {/* Filtres et recherche */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                {/* Recherche */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher un événement, prospect..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  )}
                </div>

                {/* Filtre Type */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                >
                  <option value="all">Tous types</option>
                  {Object.entries(EVENT_TYPES).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>

                {/* Filtre Statut */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                >
                  <option value="all">Tous statuts</option>
                  <option value="scheduled">Planifiés</option>
                  <option value="completed">Terminés</option>
                  <option value="cancelled">Annulés</option>
                  <option value="no-show">Absents</option>
                </select>

                {/* Filtre Période (uniquement en mode liste) */}
                {viewMode === 'list' && (
                  <select
                    value={periodFilter}
                    onChange={(e) => setPeriodFilter(e.target.value as PeriodFilter)}
                    className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                  >
                    <option value="all">Toutes périodes</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                  </select>
                )}
              </div>

              {/* Vue Calendrier */}
              {viewMode === 'calendar' && (
                <>
                  {/* Header du calendrier */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-slate-900">
                        {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </h2>
                      <Button variant="outline" size="sm" onClick={goToToday}>
                        Aujourd'hui
                      </Button>
                    </div>

                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={previousMonth}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={nextMonth}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Grille du calendrier */}
                  <div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {DAYS.map((day) => (
                        <div key={day} className="text-center text-sm text-slate-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day, index) => {
                        const dayEvents = getEventsForDay(day);
                        const isTodayDay = isToday(day);
                        const isCurrentMonthDay = isCurrentMonth(day);

                        return (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className={`min-h-[100px] p-2 rounded-lg border transition-all cursor-pointer ${
                              isTodayDay
                                ? 'bg-gradient-to-br from-violet-500 to-purple-500 border-violet-600 text-white'
                                : isCurrentMonthDay
                                ? 'bg-white border-slate-200 hover:border-violet-300 hover:shadow-md'
                                : 'bg-slate-50 border-slate-100 opacity-50'
                            }`}
                          >
                            <div className="text-sm mb-1">
                              <span
                                className={
                                  isTodayDay
                                    ? 'text-white'
                                    : isCurrentMonthDay
                                    ? 'text-slate-900'
                                    : 'text-slate-400'
                                }
                              >
                                {day.getDate()}
                              </span>
                            </div>

                            {dayEvents.length > 0 && (
                              <div className="space-y-1">
                                {dayEvents.slice(0, 2).map((event) => {
                                  const eventType = EVENT_TYPES[event.event_type];
                                  return (
                                    <div
                                      key={event.id}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(event);
                                      }}
                                      className={`text-xs px-1.5 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                        isTodayDay
                                          ? 'bg-white/30 text-white'
                                          : `${eventType.color} text-white`
                                      } truncate`}
                                      title={event.title}
                                    >
                                      {formatTime(event.start_datetime)} {event.title}
                                    </div>
                                  );
                                })}
                                {dayEvents.length > 2 && (
                                  <div
                                    className={`text-xs px-1.5 ${
                                      isTodayDay ? 'text-white/80' : 'text-slate-500'
                                    }`}
                                  >
                                    +{dayEvents.length - 2} autre{dayEvents.length - 2 > 1 ? 's' : ''}
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Légende */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-3">Types d'événements :</p>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(EVENT_TYPES).map(([key, config]) => {
                        const Icon = config.icon;
                        return (
                          <div key={key} className="flex items-center gap-2">
                            <div className={`p-1.5 rounded ${config.color}`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-slate-600">{config.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Vue Liste */}
              {viewMode === 'list' && (
                <div className="space-y-6">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
                    </div>
                  ) : groupedEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <p className="text-slate-600">Aucun événement trouvé</p>
                      <p className="text-slate-400 text-sm mt-1">
                        Essayez de modifier vos filtres ou votre recherche
                      </p>
                    </div>
                  ) : (
                    groupedEvents.map(([dateKey, dayEvents]) => (
                      <div key={dateKey}>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-slate-900 capitalize">
                            {formatDate(dateKey)}
                          </h3>
                          <div className="flex-1 h-px bg-slate-200" />
                          <Badge variant="outline" className="text-slate-600">
                            {dayEvents.length} événement{dayEvents.length > 1 ? 's' : ''}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          {dayEvents.map((event) => {
                            const eventType = EVENT_TYPES[event.event_type];
                            const Icon = eventType.icon;
                            const statusConfig = STATUS_CONFIG[event.status];
                            const StatusIcon = statusConfig.icon;
                            const prospect = getProspectForEvent(event.prospect_id);
                            const isPast = isEventPast(event.start_datetime);
                            const isSoon = isEventSoon(event.start_datetime);

                            return (
                              <motion.div
                                key={event.id}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => setSelectedEvent(event)}
                                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-violet-300 hover:shadow-md transition-all cursor-pointer"
                              >
                                <div className="flex items-start gap-4">
                                  {/* Icône */}
                                  <div className={`p-3 rounded-xl ${eventType.color} flex-shrink-0`}>
                                    <Icon className="w-5 h-5 text-white" />
                                  </div>

                                  {/* Contenu */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                      <div className="flex-1">
                                        <h4 className="text-slate-900 mb-1">{event.title}</h4>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span>{formatTime(event.start_datetime)}</span>
                                          {formatTime(event.end_datetime) && (
                                            <span>- {formatTime(event.end_datetime)}</span>
                                          )}
                                          {isSoon && (
                                            <Badge className="bg-red-500 text-white text-xs">
                                              Bientôt !
                                            </Badge>
                                          )}
                                          {isPast && event.status === 'scheduled' && (
                                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                                              En retard
                                            </Badge>
                                          )}
                                        </div>
                                      </div>

                                      <Badge className={statusConfig.color}>
                                        <StatusIcon className="w-3 h-3 mr-1" />
                                        {statusConfig.label}
                                      </Badge>
                                    </div>

                                    {event.description && (
                                      <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                                    )}

                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4 text-sm text-slate-600">
                                        {prospect && (
                                          <div className="flex items-center gap-1.5">
                                            <Users className="w-3.5 h-3.5" />
                                            <span>{prospect.company_name}</span>
                                          </div>
                                        )}
                                        {event.location && (
                                          <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{event.location}</span>
                                          </div>
                                        )}
                                        <Badge variant="outline" className="text-xs">
                                          {eventType.label}
                                        </Badge>
                                      </div>

                                      {/* Actions */}
                                      <div className="flex items-center gap-2">
                                        {event.status === 'scheduled' && (
                                          <>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateEventStatus(event.id, 'completed');
                                              }}
                                              className="text-green-600 hover:bg-green-50"
                                            >
                                              <Check className="w-3.5 h-3.5 mr-1" />
                                              Terminé
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateEventStatus(event.id, 'cancelled');
                                              }}
                                              className="text-red-600 hover:bg-red-50"
                                            >
                                              <X className="w-3.5 h-3.5 mr-1" />
                                              Annuler
                                            </Button>
                                          </>
                                        )}
                                        {prospect && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              // Navigation vers la fiche prospect
                                              const prospectsTab = document.querySelector('[data-tab="prospects"]') as HTMLElement;
                                              prospectsTab?.click();
                                            }}
                                          >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={() => {
            loadData(true);
            setSelectedEvent(null);
          }}
          onDelete={(id) => {
            setEvents(events.filter(e => e.id !== id));
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}