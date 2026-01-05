import { ProspectSheet } from './ProspectSheet';
import { NewProspectDialog } from './NewProspectDialog';
import { ProspectsExport } from './ProspectsExport';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Building2, 
  UserCheck, 
  Search, 
  Plus, 
  RefreshCw, 
  ClipboardList,
  Rocket,
  Archive,
  ArchiveX,
  MoreVertical,
  CheckSquare,
  Square,
  AlertCircle,
  Phone,
  XCircle,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type ProspectStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost' | 'archived';

interface Prospect {
  id: string;
  type: string;
  source: string;
  status: ProspectStatus;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  country_code: string | null;
  language_code: string | null;
  sector: string | null;
  need_type: string | null;
  message: string | null;
  responsible_name: string | null;
  next_action_date: string | null;
  next_action_type: string | null;
  next_action_label: string | null;
  created_at: string;
  custom_fields: any;
}

interface LandingStats {
  total_contact: number;
  total_waitlist: number;
  total_new: number;
  total_contacted: number;
  total_qualified: number;
  total_this_month: number;
}

const SOURCE_BADGES = {
  landing_contact: { bg: '#e0e7ff', text: '#4f46e5', icon: MessageSquare, label: 'CONTACT' },
  landing_waitlist: { bg: '#fef3c7', text: '#b45309', icon: Rocket, label: 'WAITLIST' },
};

const STATUS_BADGES = {
  new: { bg: '#dbeafe', text: '#1d4ed8', label: 'Nouveau' },
  contacted: { bg: '#ffedd5', text: '#c2410c', label: 'Contacté' },
  qualified: { bg: '#dcfce7', text: '#15803d', label: 'Qualifié' },
  converted: { bg: '#d1fae5', text: '#047857', label: 'Converti' },
  lost: { bg: '#fee2e2', text: '#b91c1c', label: 'Perdu' },
  archived: { bg: '#f3f4f6', text: '#6b7280', label: 'Archivé' },
};

const COUNTRY_FLAGS: Record<string, string> = {
  FR: '🇫🇷', DE: '🇩🇪', ES: '🇪🇸', IT: '🇮🇹', PL: '🇵🇱',
  PT: '🇵🇹', CZ: '🇨🇿', NL: '🇳🇱', BE: '🇧🇪', AT: '🇦🇹',
  GB: '🇬🇧', IE: '🇮🇪', SE: '🇸🇪', DK: '🇩🇰', FI: '🇫🇮',
  NO: '🇳🇴', GR: '🇬🇷', HU: '🇭🇺', RO: '🇷🇴', BG: '🇧🇬',
};

const AVATAR_COLORS = [
  'from-blue-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-orange-500 to-amber-500',
  'from-green-500 to-emerald-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
];

export function LandingProspectsPage() {
  const [activeSourceFilter, setActiveSourceFilter] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [stats, setStats] = useState<LandingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newProspectDialogOpen, setNewProspectDialogOpen] = useState(false);
  const [isPerformingBulkAction, setIsPerformingBulkAction] = useState(false);

  // Charger les statistiques
  const loadStats = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/stats`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success && data.stats) {
        // Extraire uniquement les stats landing
        setStats({
          total_contact: data.stats.total_contact || 0,
          total_waitlist: data.stats.total_waitlist || 0,
          total_new: data.stats.total_new || 0,
          total_contacted: data.stats.total_contacted || 0,
          total_qualified: data.stats.total_qualified || 0,
          total_this_month: data.stats.total_this_month || 0,
        });
      }
    } catch (error) {
      console.error('Error loading landing stats:', error);
    }
  };

  // Charger les prospects (filtrer uniquement landing_contact et landing_waitlist)
  const loadProspects = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        // Filtrer uniquement les sources landing
        source: activeSourceFilter === 'all' ? 'landing' : activeSourceFilter,
      });

      if (activeStatusFilter !== 'all') {
        params.append('status', activeStatusFilter);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/list?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        // Filtrer côté client pour ne garder que landing_contact et landing_waitlist
        const landingProspects = data.prospects.filter((p: Prospect) => 
          p.source === 'landing_contact' || p.source === 'landing_waitlist'
        );
        setProspects(landingProspects);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error loading landing prospects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadProspects();
  }, [activeSourceFilter, activeStatusFilter, searchQuery, currentPage]);

  const handleRefresh = () => {
    loadStats();
    loadProspects();
  };

  // Actions groupées
  const handleBulkArchive = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`Archiver ${selectedIds.size} prospect(s) ?`)) return;

    setIsPerformingBulkAction(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/bulk-archive`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: Array.from(selectedIds) }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSelectedIds(new Set());
        handleRefresh();
      }
    } catch (error) {
      console.error('Erreur archivage groupé:', error);
    } finally {
      setIsPerformingBulkAction(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`⚠️ ATTENTION : Supprimer définitivement ${selectedIds.size} prospect(s) ?\n\nCette action est IRRÉVERSIBLE.`)) return;

    setIsPerformingBulkAction(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/bulk-delete`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: Array.from(selectedIds) }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSelectedIds(new Set());
        handleRefresh();
      }
    } catch (error) {
      console.error('Erreur suppression groupée:', error);
    } finally {
      setIsPerformingBulkAction(false);
    }
  };

  // Actions individuelles
  const handleArchiveProspect = async (prospectId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospectId}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'archived' }),
        }
      );

      const data = await response.json();
      if (data.success) {
        handleRefresh();
      }
    } catch (error) {
      console.error('Erreur archivage:', error);
    }
  };

  const handleUnarchiveProspect = async (prospectId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospectId}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'new' }),
        }
      );

      const data = await response.json();
      if (data.success) {
        handleRefresh();
      }
    } catch (error) {
      console.error('Erreur désarchivage:', error);
    }
  };

  const handleDeleteProspect = async (prospectId: string) => {
    if (!confirm('⚠️ Supprimer définitivement ce prospect ?\n\nCette action est IRRÉVERSIBLE.')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospectId}`,
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
        handleRefresh();
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  // Sélection multiple
  const toggleSelectAll = () => {
    if (selectedIds.size === prospects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(prospects.map(p => p.id)));
    }
  };

  const toggleSelectProspect = (prospectId: string) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(prospectId)) {
      newSelectedIds.delete(prospectId);
    } else {
      newSelectedIds.add(prospectId);
    }
    setSelectedIds(newSelectedIds);
  };

  const KPI_CARDS = [
    {
      icon: MessageSquare,
      gradient: 'from-blue-500 to-indigo-500',
      value: stats?.total_contact || 0,
      label: 'Formulaire contact',
      sublabel: `Demandes landing page`,
      progress: 65,
    },
    {
      icon: Rocket,
      gradient: 'from-yellow-500 to-orange-500',
      value: stats?.total_waitlist || 0,
      label: 'Liste d\'attente',
      sublabel: `Marketplace future`,
      progress: 45,
    },
    {
      icon: AlertCircle,
      gradient: 'from-cyan-500 to-blue-500',
      value: stats?.total_new || 0,
      label: 'Nouveaux',
      sublabel: `À traiter`,
      progress: Math.round(((stats?.total_new || 0) / ((stats?.total_contact || 1) + (stats?.total_waitlist || 1))) * 100),
    },
    {
      icon: UserCheck,
      gradient: 'from-green-500 to-emerald-500',
      value: stats?.total_qualified || 0,
      label: 'Qualifiés',
      sublabel: `Prospects chauds`,
      progress: Math.round(((stats?.total_qualified || 0) / ((stats?.total_contact || 1) + (stats?.total_waitlist || 1))) * 100),
    },
  ];

  const SOURCE_CHIPS = [
    { id: 'all', label: 'Tous', count: (stats?.total_contact || 0) + (stats?.total_waitlist || 0) },
    { id: 'landing_contact', label: 'Contact', count: stats?.total_contact || 0 },
    { id: 'landing_waitlist', label: 'Waitlist', count: stats?.total_waitlist || 0 },
  ];

  const STATUS_CHIPS = [
    { id: 'all', label: 'Tous les statuts', icon: ClipboardList },
    { id: 'new', label: 'Nouveau', icon: AlertCircle },
    { id: 'contacted', label: 'Contacté', icon: Phone },
    { id: 'qualified', label: 'Qualifié', icon: CheckSquare },
    { id: 'converted', label: 'Converti', icon: UserCheck },
    { id: 'lost', label: 'Perdu', icon: XCircle },
    { id: 'archived', label: 'Archivés', icon: Archive },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900">📬 Demandes Landing Page</h1>
            <p className="text-slate-600 text-sm mt-1">
              Prospects issus du formulaire de contact et de la liste d'attente marketplace.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </Button>
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="space-y-3"
      >
        {/* Source filters */}
        <div className="flex flex-wrap items-center gap-2">
          {SOURCE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveSourceFilter(chip.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                activeSourceFilter === chip.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {chip.label} ({chip.count})
            </button>
          ))}
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_CHIPS.map((chip) => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveStatusFilter(chip.id)}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-all ${
                  activeStatusFilter === chip.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher un prospect…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200"
            />
          </div>

          {/* Bulk Actions */}
          {selectedIds.size > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkArchive}
                disabled={isPerformingBulkAction}
                className="gap-2"
              >
                <Archive className="w-4 h-4" />
                Archiver ({selectedIds.size})
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Card className="border-slate-200 shadow-md overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-cyan-600" />
                <h3 className="text-slate-900">Prospects Landing Page</h3>
              </div>
              <p className="text-sm text-slate-600">
                Total : {(stats?.total_contact || 0) + (stats?.total_waitlist || 0)}
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500">
                Chargement...
              </div>
            ) : prospects.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                Aucun prospect trouvé
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 text-left w-12">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelectAll();
                            }}
                            className="w-5 h-5 flex items-center justify-center rounded border-2 border-slate-300 hover:border-cyan-500 transition-colors"
                          >
                            {selectedIds.size === prospects.length && prospects.length > 0 ? (
                              <CheckSquare className="w-4 h-4 text-cyan-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Source</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 min-w-[200px]">Contact</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Entreprise</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-24">Pays</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Besoin</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Statut</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Date</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-20">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prospects.map((prospect, idx) => {
                        const sourceBadge = SOURCE_BADGES[prospect.source as keyof typeof SOURCE_BADGES] || SOURCE_BADGES.landing_contact;
                        const statusBadge = STATUS_BADGES[prospect.status as keyof typeof STATUS_BADGES] || { bg: '#e5e7eb', text: '#374151', label: prospect.status };
                        const SourceIcon = sourceBadge.icon;
                        const countryFlag = COUNTRY_FLAGS[prospect.country_code || ''] || '🌍';
                        const isSelected = selectedIds.has(prospect.id);

                        return (
                          <tr
                            key={prospect.id}
                            className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                              isSelected ? 'bg-cyan-50/50' : ''
                            }`}
                          >
                            <td className="px-4 py-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelectProspect(prospect.id);
                                }}
                                className="w-5 h-5 flex items-center justify-center rounded border-2 border-slate-300 hover:border-cyan-500 transition-colors"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-4 h-4 text-cyan-600" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400" />
                                )}
                              </button>
                            </td>
                            <td className="px-4 py-4" onClick={() => setSelectedProspect(prospect)}>
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs cursor-pointer"
                                style={{ backgroundColor: sourceBadge.bg, color: sourceBadge.text }}
                              >
                                <SourceIcon className="w-3.5 h-3.5" />
                                {sourceBadge.label}
                              </span>
                            </td>
                            <td className="px-4 py-4 cursor-pointer" onClick={() => setSelectedProspect(prospect)}>
                              <div>
                                <p className="text-sm text-slate-900">{prospect.name || prospect.email}</p>
                                <p className="text-xs text-slate-500">{prospect.email}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600 cursor-pointer" onClick={() => setSelectedProspect(prospect)}>{prospect.company || '—'}</td>
                            <td className="px-4 py-4 text-sm text-slate-900 cursor-pointer" onClick={() => setSelectedProspect(prospect)}>
                              <span className="flex items-center gap-1.5">
                                <span className="text-base">{countryFlag}</span>
                                {prospect.country_code || '—'}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-xs text-slate-600 cursor-pointer" onClick={() => setSelectedProspect(prospect)}>{prospect.need_type || prospect.sector || '—'}</td>
                            <td className="px-4 py-4 cursor-pointer" onClick={() => setSelectedProspect(prospect)}>
                              <span
                                className="inline-block px-2.5 py-1 rounded-md text-xs"
                                style={{ backgroundColor: statusBadge.bg, color: statusBadge.text }}
                              >
                                {statusBadge.label}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-xs text-slate-600 cursor-pointer" onClick={() => setSelectedProspect(prospect)}>
                              {new Date(prospect.created_at).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="px-4 py-4">
                              <div className="relative group">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-8 h-8 p-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="w-4 h-4 text-slate-400" />
                                </Button>
                                
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                                  {prospect.status === 'archived' ? (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnarchiveProspect(prospect.id);
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700"
                                    >
                                      <ArchiveX className="w-4 h-4" />
                                      Désarchiver
                                    </button>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleArchiveProspect(prospect.id);
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm text-slate-700"
                                    >
                                      <Archive className="w-4 h-4" />
                                      Archiver
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Précédent
                    </Button>
                    <span className="text-sm text-slate-600">
                      Page {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Prospect Sheet */}
      <ProspectSheet
        prospect={selectedProspect}
        open={!!selectedProspect}
        onClose={() => setSelectedProspect(null)}
        onUpdate={handleRefresh}
      />

      {/* New Prospect Dialog */}
      <NewProspectDialog
        open={newProspectDialogOpen}
        onClose={() => setNewProspectDialogOpen(false)}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
