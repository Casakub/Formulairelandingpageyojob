import { createContext, useContext, ReactNode } from 'react';

type TabType = 'overview' | 'agenda' | 'questions' | 'results' | 'integrations' | 'translations' | 'settings' | 'export' | 'prospects' | 'automations';

interface DashboardContextValue {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    // Si pas de contexte, retourner des no-ops pour éviter les erreurs
    return {
      activeTab: 'overview' as TabType,
      setActiveTab: () => {},
    };
  }
  return context;
}

interface DashboardProviderProps {
  children: ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function DashboardProvider({ children, activeTab, setActiveTab }: DashboardProviderProps) {
  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardContext.Provider>
  );
}
