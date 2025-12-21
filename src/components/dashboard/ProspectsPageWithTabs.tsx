import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ProspectsPage } from './ProspectsPage';
import { DevisTab } from './DevisTab';
import { BarChart3, FileText, Users } from 'lucide-react';

export function ProspectsPageWithTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/50 border border-slate-200">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger 
            value="survey"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white gap-2"
          >
            <Users className="w-4 h-4" />
            Étude marché
          </TabsTrigger>
          <TabsTrigger 
            value="devis"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white gap-2"
          >
            <FileText className="w-4 h-4" />
            Demandes devis
          </TabsTrigger>
        </TabsList>

        {/* Tab Overview */}
        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-slate-900 text-xl mb-4">📊 Vue d'ensemble commerciale</h2>
              <p className="text-slate-600 mb-6">
                Centralisez tous vos prospects et demandes de devis en un seul endroit.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setActiveTab('survey')}
                  className="border-2 border-violet-200 rounded-lg p-6 hover:border-violet-400 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-2">Prospects Étude Marché</h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Prospects issus du formulaire d'étude de marché (clients, agences ETT, intérimaires).
                      </p>
                      <div className="text-violet-600 text-sm">
                        Gérer les prospects →
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('devis')}
                  className="border-2 border-emerald-200 rounded-lg p-6 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-2">Demandes de Devis</h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Demandes complètes de devis avec calculs détaillés pour le recrutement européen.
                      </p>
                      <div className="text-emerald-600 text-sm">
                        Gérer les devis →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats preview could go here */}
          </div>
        </TabsContent>

        {/* Tab Survey Prospects */}
        <TabsContent value="survey" className="mt-6">
          <ProspectsPage />
        </TabsContent>

        {/* Tab Devis */}
        <TabsContent value="devis" className="mt-6">
          <DevisTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
