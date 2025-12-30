import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BarChart3, 
  FileEdit, 
  Languages, 
  Download, 
  Plug, 
  Settings, 
  Users, 
  Workflow,
  Calendar,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { DynamicResultsOverview } from './components/dashboard/DynamicResultsOverview';
import { QuestionManagerV2 } from './components/dashboard/QuestionManagerV2';
import { TranslationProvider } from './contexts/TranslationContext';
import { UnifiedTranslationManager } from './components/dashboard/UnifiedTranslationManager';
import { ExportImportManager } from './components/dashboard/ExportImportManager';
import { IntegrationManager } from './components/dashboard/IntegrationManager';
import { SettingsPanel } from './components/dashboard/SettingsPanel';
import { ProspectsPageWithTabs } from './components/dashboard/ProspectsPageWithTabs';
import { AgendaPage } from './components/dashboard/AgendaPage';
import { AutomationsPage } from './components/dashboard/AutomationsPage';
import { useAuth } from './hooks/useAuth';

type TabType = 'overview' | 'agenda' | 'questions' | 'results' | 'integrations' | 'translations' | 'settings' | 'export' | 'prospects' | 'automations';

interface DashboardAppProps {
  onBackToSurvey?: () => void;
}

export default function DashboardApp({ onBackToSurvey }: DashboardAppProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const tabs = [
    { id: 'overview' as TabType, label: 'Vue d\'ensemble', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500' },
    { id: 'agenda' as TabType, label: 'Agenda', icon: Calendar, color: 'from-violet-500 to-pink-500' },
    { id: 'results' as TabType, label: 'Résultats', icon: BarChart3, color: 'from-cyan-500 to-teal-500' },
    { id: 'questions' as TabType, label: 'Questions', icon: FileEdit, color: 'from-purple-500 to-violet-500' },
    { id: 'translations' as TabType, label: 'Traductions', icon: Languages, color: 'from-indigo-500 to-blue-500', badge: '⭐ Hub' },
    { id: 'export' as TabType, label: 'Export', icon: Download, color: 'from-green-500 to-emerald-500' },
    { id: 'integrations' as TabType, label: 'Intégrations', icon: Plug, color: 'from-orange-500 to-amber-500' },
    { id: 'settings' as TabType, label: 'Paramètres', icon: Settings, color: 'from-slate-500 to-gray-500' },
    { id: 'prospects' as TabType, label: 'Prospects', icon: Users, color: 'from-emerald-500 to-teal-500' },
    { id: 'automations' as TabType, label: 'Automatisations', icon: Workflow, color: 'from-pink-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden relative z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white text-xl">Y</span>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-slate-900">YoJob</h1>
                {user ? (
                  <p className="text-cyan-600 text-xs truncate">{user.email}</p>
                ) : (
                  <p className="text-cyan-600 text-xs">Dashboard</p>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-white to-slate-50 shadow-md border border-slate-200'
                        : 'hover:bg-slate-50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tab.color} flex items-center justify-center shadow-sm`}>
                      <tab.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={activeTab === tab.id ? 'text-slate-900' : 'text-slate-600'}>{tab.label}</span>
                  </motion.button>
                ))}

                <div className="h-px bg-slate-200 my-4" />

                {onBackToSurvey && (
                  <button
                    onClick={onBackToSurvey}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour au formulaire</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? '80px' : '280px' }}
        className="hidden lg:flex fixed left-0 top-0 h-screen bg-white/90 backdrop-blur-xl border-r border-slate-200 shadow-xl flex-col z-50"
      >
        {/* User Profile Header */}
        <div className="p-6 border-b border-slate-200">
          {!sidebarCollapsed && user ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 truncate" title={user.name || user.email}>
                    {user.name || 'Admin'}
                  </p>
                  <p className="text-cyan-600 text-xs truncate" title={user.email}>
                    {user.email}
                  </p>
                </div>
              </div>
              {user.role && (
                <Badge className="mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 text-xs">
                  {user.role}
                </Badge>
              )}
            </motion.div>
          ) : sidebarCollapsed ? (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mx-auto"
            >
              <User className="w-6 h-6" />
            </motion.div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-slate-600 text-sm text-center">Chargement...</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-slate-50 to-slate-100 shadow-md'
                  : 'hover:bg-slate-50'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Active indicator */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute left-0 w-1 h-8 rounded-r-full bg-gradient-to-b ${tab.color}`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                activeTab === tab.id
                  ? `bg-gradient-to-br ${tab.color} shadow-lg`
                  : 'bg-slate-100 group-hover:bg-slate-200'
              } transition-all`}>
                <tab.icon className={`w-5 h-5 ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-600'
                }`} />
              </div>

              {/* Label */}
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex-1 text-left ${
                    activeTab === tab.id ? 'text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {tab.label}
                </motion.span>
              )}

              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {tab.label}
                </div>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          {onBackToSurvey && (
            <button
              onClick={onBackToSurvey}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 transition-all ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              {!sidebarCollapsed && <span className="text-sm">Retour formulaire</span>}
            </button>
          )}

          <button
            onClick={logout}
            disabled={isLoading}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="text-sm">Déconnexion</span>}
          </button>

          {/* Collapse button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-all"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-xs">Réduire</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`relative transition-all ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <DashboardOverview key="overview" />
            )}
            {activeTab === 'results' && (
              <DynamicResultsOverview key="results" />
            )}
            {activeTab === 'questions' && (
              <QuestionManagerV2 key="questions" />
            )}
            {activeTab === 'translations' && (
              <TranslationProvider>
                <UnifiedTranslationManager key="translations" />
              </TranslationProvider>
            )}
            {activeTab === 'export' && (
              <ExportImportManager key="export" />
            )}
            {activeTab === 'integrations' && (
              <IntegrationManager key="integrations" />
            )}
            {activeTab === 'settings' && (
              <SettingsPanel key="settings" />
            )}
            {activeTab === 'prospects' && (
              <ProspectsPageWithTabs key="prospects" />
            )}
            {activeTab === 'agenda' && (
              <AgendaPage key="agenda" />
            )}
            {activeTab === 'automations' && (
              <AutomationsPage key="automations" />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}