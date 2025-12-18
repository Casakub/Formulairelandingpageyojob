import { ProspectSheet } from './ProspectSheet';
import { NewProspectDialog } from './NewProspectDialog';
import { ProspectsExport } from './ProspectsExport';
import { ProspectsSetupBanner } from './ProspectsSetupBanner';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Building2, 
  Briefcase, 
  UserCheck, 
  Search, 
  Plus, 
  RefreshCw, 
  ClipboardList,
  Rocket
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type ProspectType = 'all' | 'client' | 'agency' | 'interim' | 'waitlist' | 'contact';
type ProspectStatus = 'new' | 'qualified' | 'follow-up' | 'proposal' | 'won' | 'lost';

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

interface ProspectStats {
  total_active: number;
  total_clients: number;
  total_agencies: number;
  total_interims: number;
  total_waitlist: number;
  total_new: number;
  total_qualified: number;
  total_won: number;
  total_this_month: number;
}

const TYPE_BADGES = {
  client: { bg: '#dbeafe', text: '#1d4ed8', icon: Building2, label: 'CLIENT' },
  agency: { bg: '#ffedd5', text: '#c2410c', icon: Briefcase, label: 'AGENCE' },
  interim: { bg: '#dcfce7', text: '#15803d', icon: UserCheck, label: 'INTÉRIMAIRE' },
  waitlist: { bg: '#fef3c7', text: '#b45309', icon: Rocket, label: 'WAITLIST' },
  contact: { bg: '#e0e7ff', text: '#4f46e5', icon: Users, label: 'CONTACT' },
};

const STATUS_BADGES = {
  new: { bg: '#dbeafe', text: '#1d4ed8', label: 'Nouveau' },
  qualified: { bg: '#dcfce7', text: '#15803d', label: 'Qualifié' },
  'follow-up': { bg: '#fef3c7', text: '#b45309', label: 'Relance planifiée' },
  proposal: { bg: '#ede9fe', text: '#6d28d9', label: 'Proposition envoyée' },
  won: { bg: '#d1fae5', text: '#047857', label: 'Gagné' },
  lost: { bg: '#fee2e2', text: '#b91c1c', label: 'Perdu' },
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

export function ProspectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProspectType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [stats, setStats] = useState<ProspectStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newProspectDialogOpen, setNewProspectDialogOpen] = useState(false);
  const [isScoringBatch, setIsScoringBatch] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

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
        setStats(data.stats);
        setNeedsSetup(false);
      } else if (data.error && data.error.includes('prospects')) {
        setNeedsSetup(true);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      setNeedsSetup(true);
    }
  };

  // Charger les prospects
  const loadProspects = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      if (activeFilter !== 'all') {
        params.append('type', activeFilter);
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
        setProspects(data.prospects);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error loading prospects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger au montage et quand les filtres changent
  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadProspects();
  }, [activeFilter, searchQuery, currentPage]);

  const handleRefresh = () => {
    loadStats();
    loadProspects();
  };

  const KPI_CARDS = [
    {
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      value: stats?.total_active || 0,
      label: 'Prospects totaux',
      sublabel: `+${stats?.total_this_month || 0} ce mois`,
      progress: 68,
    },
    {
      icon: Building2,
      gradient: 'from-violet-500 to-purple-500',
      value: stats?.total_clients || 0,
      label: 'Clients',
      sublabel: `${Math.round(((stats?.total_clients || 0) / (stats?.total_active || 1)) * 100)}% du total`,
      progress: Math.round(((stats?.total_clients || 0) / (stats?.total_active || 1)) * 100),
    },
    {
      icon: Briefcase,
      gradient: 'from-orange-500 to-amber-500',
      value: stats?.total_agencies || 0,
      label: 'Agences ETT',
      sublabel: `${Math.round(((stats?.total_agencies || 0) / (stats?.total_active || 1)) * 100)}% du total`,
      progress: Math.round(((stats?.total_agencies || 0) / (stats?.total_active || 1)) * 100),
    },
    {
      icon: UserCheck,
      gradient: 'from-green-500 to-emerald-500',
      value: stats?.total_interims || 0,
      label: 'Intérimaires',
      sublabel: `${Math.round(((stats?.total_interims || 0) / (stats?.total_active || 1)) * 100)}% du total`,
      progress: Math.round(((stats?.total_interims || 0) / (stats?.total_active || 1)) * 100),
    },
  ];

  const TYPE_CHIPS = [
    { id: 'all' as ProspectType, label: 'Tous', count: stats?.total_active || 0 },
    { id: 'client' as ProspectType, label: 'Clients', count: stats?.total_clients || 0 },
    { id: 'agency' as ProspectType, label: 'Agences', count: stats?.total_agencies || 0 },
    { id: 'interim' as ProspectType, label: 'Intérimaires', count: stats?.total_interims || 0 },
    { id: 'waitlist' as ProspectType, label: 'Waitlist', count: stats?.total_waitlist || 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Setup Banner (if tables don't exist) */}
      {needsSetup && <ProspectsSetupBanner />}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-slate-900">Prospects & relances</h1>
          <p className="text-slate-600 text-sm mt-1">
            Gérez vos prospects collectés depuis la landing page (waitlist + contact) et autres sources.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Actualiser</span>
        </Button>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Card className="border-slate-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center shadow-lg`}>
                    <kpi.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-900 text-2xl">{kpi.value}</div>
                  <div className="text-slate-600 text-sm">{kpi.label}</div>
                  <div className="text-cyan-600 text-xs">{kpi.sublabel}</div>
                  <div className="mt-3">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${kpi.gradient} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                      />
                    </div>
                  </div>
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
        transition={{ delay: 0.4, duration: 0.4 }}
        className="space-y-4"
      >
        {/* Type filters */}
        <div className="flex flex-wrap items-center gap-3">
          {TYPE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === chip.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {chip.label} ({chip.count})
            </button>
          ))}
        </div>

        {/* Search & New */}
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
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md gap-2" onClick={() => setNewProspectDialogOpen(true)}>
            <Plus className="w-4 h-4" />
            Nouveau prospect
          </Button>
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
                <h3 className="text-slate-900">Liste des prospects</h3>
              </div>
              <p className="text-sm text-slate-600">
                Total : {stats?.total_active || 0}
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
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Type/Source</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 min-w-[200px]">Contact</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Entreprise</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-24">Pays</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Besoin</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Statut</th>
                        <th className="px-4 py-3 text-left text-sm text-slate-600 w-32">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prospects.map((prospect, idx) => {
                        const typeBadge = TYPE_BADGES[prospect.type as keyof typeof TYPE_BADGES] || TYPE_BADGES.contact;
                        const statusBadge = STATUS_BADGES[prospect.status];
                        const TypeIcon = typeBadge.icon;
                        const countryFlag = COUNTRY_FLAGS[prospect.country_code || ''] || '🌍';
                        const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];

                        return (
                          <tr
                            key={prospect.id}
                            data-prospect-id={prospect.id}
                            onClick={() => setSelectedProspect(prospect)}
                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <td className="px-4 py-4">
                              <div className="space-y-1">
                                <span
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
                                  style={{ backgroundColor: typeBadge.bg, color: typeBadge.text }}
                                >
                                  <TypeIcon className="w-3.5 h-3.5" />
                                  {typeBadge.label}
                                </span>
                                <p className="text-xs text-slate-500">{prospect.source}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div>
                                <p className="text-sm text-slate-900">{prospect.name || prospect.email}</p>
                                <p className="text-xs text-slate-500">{prospect.email}</p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600">{prospect.company || '—'}</td>
                            <td className="px-4 py-4 text-sm text-slate-900">
                              <span className="flex items-center gap-1.5">
                                <span className="text-base">{countryFlag}</span>
                                {prospect.country_code || '—'}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-xs text-slate-600">{prospect.need_type || prospect.sector || '—'}</td>
                            <td className="px-4 py-4">
                              <span
                                className="inline-block px-2.5 py-1 rounded-md text-xs"
                                style={{ backgroundColor: statusBadge.bg, color: statusBadge.text }}
                              >
                                {statusBadge.label}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-xs text-slate-600">
                              {new Date(prospect.created_at).toLocaleDateString('fr-FR')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Page {currentPage} sur {totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
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
        onUpdate={() => {
          loadStats();
          loadProspects();
        }}
      />

      {/* New Prospect Dialog */}
      <NewProspectDialog
        open={newProspectDialogOpen}
        onClose={() => setNewProspectDialogOpen(false)}
        onSuccess={() => {
          handleRefresh();
          setNewProspectDialogOpen(false);
        }}
      />
    </div>
  );
}