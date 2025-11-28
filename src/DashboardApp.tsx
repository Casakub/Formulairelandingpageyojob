import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileEdit, 
  Plug, 
  Settings, 
  LogOut,
  Menu,
  X,
  ArrowLeft,
  Download,
  BarChart3
} from 'lucide-react';
import { Button } from './components/ui/button';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { QuestionManager } from './components/dashboard/QuestionManager';
import { IntegrationManager } from './components/dashboard/IntegrationManager';
import { ExportImportManager } from './components/dashboard/ExportImportManager';
import { ResultsOverview } from './components/dashboard/ResultsOverview';

type TabType = 'overview' | 'questions' | 'results' | 'integrations' | 'settings' | 'export';

interface DashboardAppProps {
  onBackToSurvey?: () => void;
}

export default function DashboardApp({ onBackToSurvey }: DashboardAppProps = {}) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview' as TabType, label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'results' as TabType, label: 'Résultats', icon: BarChart3 },
    { id: 'questions' as TabType, label: 'Questions', icon: FileEdit },
    { id: 'export' as TabType, label: 'Export/Import', icon: Download },
    { id: 'integrations' as TabType, label: 'Intégrations', icon: Plug },
    { id: 'settings' as TabType, label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Background effects - Version claire */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern subtil */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="grid-light" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-light)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white text-xl">Y</span>
              </div>
              <div>
                <h1 className="text-slate-900">YoJob Dashboard</h1>
                <p className="text-cyan-600 text-sm">Administration de l'étude</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500/10 to-violet-500/10 text-slate-900 border border-cyan-400'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {onBackToSurvey && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBackToSurvey}
                  className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au formulaire
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="hidden md:flex text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Retour au site
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-slate-900"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 space-y-2"
              >
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white border border-cyan-400/50'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <DashboardOverview key="overview" />
          )}
          {activeTab === 'results' && (
            <ResultsOverview key="results" />
          )}
          {activeTab === 'questions' && (
            <QuestionManager key="questions" />
          )}
          {activeTab === 'export' && (
            <ExportImportManager key="export" />
          )}
          {activeTab === 'integrations' && (
            <IntegrationManager key="integrations" />
          )}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8"
            >
              <h2 className="text-white mb-4">Paramètres</h2>
              <p className="text-white/60">Section en cours de développement...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
