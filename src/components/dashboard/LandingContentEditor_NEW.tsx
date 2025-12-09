import { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  Save,
  RefreshCw,
  FileText,
  Globe,
  Sparkles,
  Eye,
  Edit3,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Plus,
  Building2,
  Factory,
  Tractor,
  UtensilsCrossed,
  Heart,
  Laptop,
  Truck,
  ShoppingBag,
  Briefcase,
  Wrench,
  Plane,
  Ship,
  GraduationCap,
  Users,
  PiggyBank,
  Target,
  Network,
  ShieldCheck,
  UserCheck,
  Clock,
  Shield,
  Headphones as HeadphonesIcon,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLandingContent } from '../../hooks/useLandingContent';
import type { LandingPageContent } from '../../types/landing';
import { SEOToolsPanel } from './SEOToolsPanel';

/**
 * 📝 Landing Content Editor
 * Éditeur de contenu SOURCE (français) pour la landing page YoJob
 * 
 * Fonctionnalités :
 * - Édition du contenu français (langue native)
 * - Interface organisée par sections
 * - Prévisualisation en temps réel
 * - Sauvegarde automatique
 * - Validation des champs requis
 */

type SectionType = 'hero' | 'stats' | 'services' | 'network' | 'process' | 'testimonials' | 'sectors' | 'cta' | 'footer' | 'seo';

// 🎨 Mapping des icônes : string → Composant React
const ICON_MAP: Record<string, any> = {
  Building2,
  Factory,
  Tractor,
  UtensilsCrossed,
  Heart,
  Laptop,
  Truck,
  ShoppingBag,
  Briefcase,
  Wrench,
  Plane,
  Ship,
  GraduationCap,
  Users,
  PiggyBank,
  Target,
  Network,
  ShieldCheck,
  UserCheck,
  Clock,
  Shield,
  HeadphonesIcon,
  CheckCircle,
  Globe,
  FileText,
};

export function LandingContentEditor() {
  const { landingContent, updateLandingContent, isLoading } = useLandingContent();
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Contenu français (source) - FIXE: utiliser directement depuis landingContent
  const contentFR = landingContent.fr || {};

  if (!landingContent.fr) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 mb-1">Contenu français manquant</h4>
              <p className="text-slate-600 text-sm">
                Le contenu source en français n'est pas disponible. Veuillez initialiser le contenu.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handler pour mettre à jour un champ
  const handleFieldChange = (section: string, field: string, value: any, index?: number) => {
    const updatedContent = { ...landingContent.fr } as any;
    
    // Cas spécial : remplacer toute la section (ex: restaurer stats par défaut)
    if (field === '' && index === undefined) {
      updatedContent[section] = value;
    } else if (index !== undefined) {
      // Pour les tableaux (ex: services, testimonials, sectors.sectors)
      if (field.includes('.')) {
        // Champ imbriqué avec index (ex: 'sectors.name' pour sectors.sectors[index].name)
        const parts = field.split('.');
        if (!updatedContent[section]) updatedContent[section] = {};
        
        // Naviguer jusqu'à l'array
        let current = updatedContent[section];
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) current[parts[i]] = [];
          current = current[parts[i]];
        }
        
        // Accéder à l'élément du tableau
        if (!current[index]) current[index] = {};
        current[index][parts[parts.length - 1]] = value;
      } else {
        // Array direct (ex: services, testimonials)
        if (!updatedContent[section]) updatedContent[section] = [];
        if (!updatedContent[section][index]) updatedContent[section][index] = {};
        updatedContent[section][index][field] = value;
      }
    } else if (field.includes('.')) {
      // Pour les champs imbriqués (ex: hero.badge.text, footer.legal.copyright)
      if (!updatedContent[section]) updatedContent[section] = {};
      const parts = field.split('.');
      let current = updatedContent[section];  // ✅ COMMENCER depuis la section
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
    } else {
      // Pour les champs simples
      if (!updatedContent[section]) updatedContent[section] = {};
      updatedContent[section][field] = value;
    }

    updateLandingContent('fr', updatedContent as LandingPageContent);
    setHasUnsavedChanges(true);
  };

  // Sauvegarder les modifications
  const handleSave = async () => {
    setIsSaving(true);
    const toastId = toast.loading('💾 Sauvegarde en cours...');

    try {
      // Le contenu est déjà sauvegardé automatiquement dans localStorage par le hook
      // Cette fonction sert juste à confirmer visuellement la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('✅ Contenu sauvegardé !', {
        id: toastId,
        description: 'Vos modifications sont enregistrées automatiquement',
      });
      
      setHasUnsavedChanges(false);
    } catch (error: any) {
      toast.error('❌ Erreur de sauvegarde', {
        id: toastId,
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Ajouter un nouveau secteur
  const handleAddSector = () => {
    const updatedContent = { ...landingContent.fr } as any;
    if (!updatedContent.sectors) updatedContent.sectors = {};
    if (!updatedContent.sectors.sectors) updatedContent.sectors.sectors = [];
    
    updatedContent.sectors.sectors.push({
      name: 'Nouveau secteur',
      icon: 'Briefcase',
      color: 'blue',
    });

    updateLandingContent('fr', updatedContent as LandingPageContent);
    setHasUnsavedChanges(true);
    toast.success('➕ Secteur ajouté');
  };

  // Supprimer un secteur
  const handleRemoveSector = (index: number) => {
    const updatedContent = { ...landingContent.fr } as any;
    if (!updatedContent.sectors?.sectors) return;
    
    updatedContent.sectors.sectors.splice(index, 1);

    updateLandingContent('fr', updatedContent as LandingPageContent);
    setHasUnsavedChanges(true);
    toast.success('🗑️ Secteur supprimé');
  };

  // Ajouter une nouvelle statistique
  const handleAddStat = () => {
    const updatedContent = { ...landingContent.fr } as any;
    if (!updatedContent.stats) updatedContent.stats = [];
    
    updatedContent.stats.push({
      value: 0,
      suffix: '+',
      label: 'Nouvelle statistique',
      icon: 'Target',
      color: 'blue',
    });

    updateLandingContent('fr', updatedContent as LandingPageContent);
    setHasUnsavedChanges(true);
    toast.success('➕ Statistique ajoutée');
  };

  // Supprimer une statistique
  const handleRemoveStat = (index: number) => {
    const updatedContent = { ...landingContent.fr } as any;
    if (!updatedContent.stats || !Array.isArray(updatedContent.stats)) return;
    
    updatedContent.stats.splice(index, 1);

    updateLandingContent('fr', updatedContent as LandingPageContent);
    setHasUnsavedChanges(true);
    toast.success('🗑️ Statistique supprimée');
  };

  // Helper pour obtenir les classes de couleur
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { gradient: string; bg: string; border: string; text: string }> = {
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
      },
      cyan: {
        gradient: 'from-cyan-500 to-cyan-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-200',
        text: 'text-cyan-600',
      },
      violet: {
        gradient: 'from-violet-500 to-violet-600',
        bg: 'bg-violet-50',
        border: 'border-violet-200',
        text: 'text-violet-600',
      },
      green: {
        gradient: 'from-green-500 to-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
      },
      orange: {
        gradient: 'from-orange-500 to-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-600',
      },
      pink: {
        gradient: 'from-pink-500 to-pink-600',
        bg: 'bg-pink-50',
        border: 'border-pink-200',
        text: 'text-pink-600',
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const sections = [
    { id: 'hero' as SectionType, label: 'Hero', icon: Sparkles, color: 'from-violet-500 to-purple-500' },
    { id: 'stats' as SectionType, label: 'Statistiques', icon: Globe, color: 'from-cyan-500 to-blue-500' },
    { id: 'services' as SectionType, label: 'Services', icon: FileText, color: 'from-blue-500 to-indigo-500' },
    { id: 'network' as SectionType, label: 'Réseau', icon: Globe, color: 'from-green-500 to-emerald-500' },
    { id: 'process' as SectionType, label: 'Process', icon: CheckCircle, color: 'from-purple-500 to-pink-500' },
    { id: 'testimonials' as SectionType, label: 'Témoignages', icon: Sparkles, color: 'from-orange-500 to-red-500' },
    { id: 'sectors' as SectionType, label: 'Secteurs', icon: FileText, color: 'from-teal-500 to-cyan-500' },
    { id: 'cta' as SectionType, label: 'CTA/Contact', icon: Edit3, color: 'from-pink-500 to-rose-500' },
    { id: 'footer' as SectionType, label: 'Footer', icon: Globe, color: 'from-slate-500 to-gray-500' },
    { id: 'seo' as SectionType, label: 'SEO', icon: Info, color: 'from-indigo-500 to-violet-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 rounded-2xl p-6 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white mb-1">Éditeur de contenu Landing Page</h1>
              <p className="text-cyan-100">
                Modifiez le contenu source (français) de votre landing page YoJob
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <Badge className="bg-amber-500/20 text-amber-100 border-amber-400/30">
                <AlertCircle className="w-3 h-3 mr-1" />
                Modifications non sauvegardées
              </Badge>
            )}
            
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isSaving}
              className="bg-white text-blue-600 hover:bg-cyan-50 shadow-lg disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-white mb-1">
              <strong>Langue source :</strong> Français (FR)
            </p>
            <p className="text-cyan-100 text-xs">
              Ce contenu servira de base pour générer les traductions dans les 23 autres langues européennes.
              Une fois vos modifications sauvegardées, rendez-vous dans l'onglet &quot;Traductions&quot; pour traduire le contenu.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Éditeur par sections */}
      <Card className="border-slate-200 shadow-xl">
        <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as SectionType)}>
          <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Sections de la landing page
            </CardTitle>
            <CardDescription>
              Sélectionnez une section ci-dessous pour éditer son contenu
            </CardDescription>
            
            <TabsList className="mt-4 bg-white border border-slate-200 p-1 flex-wrap justify-start h-auto gap-2">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <section.icon className="w-4 h-4 mr-2" />
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            {/* Placeholder - Les autres onglets vont ici */}
            <div className="text-center p-8 bg-slate-50 rounded-xl">
              <p className="text-slate-600">
                🚧 Reconstruction en cours avec le nouveau design cohérent...
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Ce fichier a été créé pour demonstration. Le fichier complet suivra.
              </p>
            </div>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
