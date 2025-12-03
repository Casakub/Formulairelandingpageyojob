import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Navigation, Type, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { HeroContentEditor } from './HeroContentEditor';
import { ProgressContentEditor } from './ProgressContentEditor';
import { UIContentEditor } from './UIContentEditor';
import { SeedMissingTranslationsButton } from './SeedMissingTranslationsButton';
import { Badge } from '../ui/badge';

export function ContentCMS() {
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Éditeur de Contenu</h1>
          <p className="text-slate-600">
            Modifiez les textes de votre application en temps réel sans toucher au code
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 shadow-lg">
          CMS v1.0
        </Badge>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 via-cyan-50 to-white border-blue-200 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-lg">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-slate-900 font-semibold">Comment utiliser le CMS</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• <strong>Modifiez</strong> les textes directement dans les formulaires ci-dessous</li>
                <li>• <strong>Prévisualisez</strong> vos modifications avant de publier</li>
                <li>• <strong>Sauvegardez</strong> pour appliquer les changements instantanément</li>
                <li>• <strong>Restaurez</strong> une version précédente si besoin</li>
              </ul>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-200">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500">
                  Les modifications sont appliquées en temps réel • Aucun redéploiement nécessaire
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seed Missing Translations Button */}
      <SeedMissingTranslationsButton />

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-100">
          <TabsTrigger 
            value="hero"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white py-3"
          >
            <FileText className="w-4 h-4" />
            <span>Hero Section</span>
            <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
              8 textes
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="progress"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white py-3"
          >
            <Navigation className="w-4 h-4" />
            <span>Progression</span>
            <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
              10 textes
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="ui"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-500 data-[state=active]:text-white py-3"
          >
            <Type className="w-4 h-4" />
            <span>Textes UI</span>
            <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
              9 textes
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <HeroContentEditor />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <ProgressContentEditor />
        </TabsContent>

        <TabsContent value="ui" className="mt-6">
          <UIContentEditor />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}