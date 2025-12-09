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
  Rocket,
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
import { AvatarUploader } from './AvatarUploader';

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
      
      // Log pour debug
      console.log('📦 Contenu actuel sauvegardé:', landingContent);
      console.log('📊 Secteurs:', landingContent.fr?.sectors);
      
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

  // Debug: Afficher le contenu localStorage
  const handleDebugStorage = () => {
    const stored = localStorage.getItem('yojob_landing_content');
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('🔍 DEBUG - Contenu localStorage:', parsed);
      console.log('🔍 DEBUG - Secteurs:', parsed.fr?.sectors);
      toast.info('Contenu affiché dans la console (F12)', {
        description: 'Vérifiez la console du navigateur',
      });
    } else {
      toast.error('Aucun contenu dans le localStorage');
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

  // Ajouter un nouveau témoignage
  const handleAddTestimonial = () => {
    const updatedContent = { ...landingContent.fr } as any;
    if (!updatedContent.testimonials) updatedContent.testimonials = [];
    
    updatedContent.testimonials.push({
      name: 'Nom du client',
      role: 'Poste',
      company: 'Entreprise',
      sector: 'Secteur',
      quote: 'Témoignage à personnaliser...',
      rating: 5,
    });

    updateLandingContent('fr', updatedContent as LandingPageContent);
    setHasUnsavedChanges(true);
    toast.success('➕ Témoignage ajouté');
  };

  // Supprimer un témoignage
  const handleRemoveTestimonial = (index: number) => {
    const updatedContent = { ...landingContent.fr } as any;
    if (!updatedContent.testimonials) return;
    
    updatedContent.testimonials.splice(index, 1);

    updateLandingContent('fr', updatedContent as LandingPageContent);
    setHasUnsavedChanges(true);
    toast.success('🗑️ Témoignage supprimé');
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
              Une fois vos modifications sauvegardées, rendez-vous dans l'onglet "Traductions" pour traduire le contenu.
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
            {/* Section Hero */}
            <TabsContent value="hero" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section Hero - Première impression</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Configurez la section d&apos;accueil de votre landing page : badge premium, titres accrocheurs et appels à l&apos;action.
                  </p>
                </div>

                {/* Card principale avec layout 2 colonnes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-violet-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-slate-900">Contenu de la section Hero</h4>
                            <p className="text-xs text-slate-500">Éditez vos textes et CTAs</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Formulaire d'édition */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              ⭐ Badge premium
                            </label>
                            <Input
                              value={contentFR.hero?.badge?.text || ''}
                              onChange={(e) => handleFieldChange('hero', 'badge.text', e.target.value)}
                              placeholder="⭐ Leader du recrutement européen"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                              Badge affiché en haut avec effet glow
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              📝 Titre principal (H1)
                            </label>
                            <Textarea
                              value={contentFR.hero?.title || ''}
                              onChange={(e) => handleFieldChange('hero', 'title', e.target.value)}
                              rows={3}
                              placeholder="Votre titre principal accrocheur..."
                            />
                            <p className="text-xs text-slate-500 mt-1">
                              Titre principal en très grande taille
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              💬 Sous-titre descriptif
                            </label>
                            <Textarea
                              value={contentFR.hero?.subtitle || ''}
                              onChange={(e) => handleFieldChange('hero', 'subtitle', e.target.value)}
                              rows={3}
                              placeholder="Décrivez votre proposition de valeur..."
                            />
                            <p className="text-xs text-slate-500 mt-1">
                              Description qui accompagne le titre
                            </p>
                          </div>

                          <div className="border-t border-slate-200 pt-4">
                            <h5 className="text-sm text-slate-900 mb-3">🎯 Boutons d&apos;action (CTAs)</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  CTA Principal
                                </label>
                                <Input
                                  value={contentFR.hero?.cta?.primary || ''}
                                  onChange={(e) => handleFieldChange('hero', 'cta.primary', e.target.value)}
                                  placeholder="Demander un devis"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  CTA Secondaire
                                </label>
                                <Input
                                  value={contentFR.hero?.cta?.secondary || ''}
                                  onChange={(e) => handleFieldChange('hero', 'cta.secondary', e.target.value)}
                                  placeholder="En savoir plus"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Aperçu en temps réel */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-600">Aperçu en temps réel</p>
                          </div>
                          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200 min-h-[400px] flex flex-col justify-center">
                            <motion.div
                              className="text-center"
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              {/* Badge */}
                              {contentFR.hero?.badge?.text && (
                                <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full">
                                  <p className="text-sm text-slate-800">
                                    {contentFR.hero?.badge?.text}
                                  </p>
                                </div>
                              )}
                              
                              {/* Titre */}
                              <h1 className="text-3xl text-slate-900 mb-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                {contentFR.hero?.title || 'Votre titre principal'}
                              </h1>
                              
                              {/* Sous-titre */}
                              <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
                                {contentFR.hero?.subtitle || 'Votre sous-titre descriptif'}
                              </p>
                              
                              {/* CTAs */}
                              <div className="flex items-center justify-center gap-3 flex-wrap">
                                {contentFR.hero?.cta?.primary && (
                                  <div className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full text-sm shadow-lg">
                                    {contentFR.hero?.cta?.primary}
                                  </div>
                                )}
                                {contentFR.hero?.cta?.secondary && (
                                  <div className="px-4 py-2 border-2 border-violet-300 text-violet-600 rounded-full text-sm">
                                    {contentFR.hero?.cta?.secondary}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </div>
                          <p className="text-xs text-slate-500 text-center mt-2">
                            ✨ Version simplifiée - Voir la landing page pour le rendu final
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Conseils d'utilisation */}
                <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour un Hero percutant
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-violet-500 mt-0.5">•</span>
                            <span><strong>Badge</strong> : Mettez en avant votre différenciation (expertise, leadership, innovation...)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span><strong>Titre H1</strong> : Clair, concis et orienté bénéfice client (max 2 lignes)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-violet-500 mt-0.5">•</span>
                            <span><strong>Sous-titre</strong> : Développez la proposition de valeur (1-2 phrases)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span><strong>CTA Principal</strong> : Action forte (Demander, Obtenir, Découvrir...)</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-violet-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            La section Hero est la première chose que vos visiteurs voient - soignez chaque mot !
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section SEO */}
            <TabsContent value="seo" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section SEO & Référencement</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Optimisez votre visibilité sur Google, les réseaux sociaux et les intelligences artificielles (ChatGPT, Perplexity...).
                  </p>
                </div>

                {/* Meta tags de base */}
                <Card className="border-2 border-green-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Meta tags essentiels</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Titre SEO (Title tag)
                          <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Max 60 caractères</Badge>
                        </label>
                        <Input
                          value={contentFR.seo?.title || ''}
                          onChange={(e) => handleFieldChange('seo', 'title', e.target.value)}
                          placeholder="YoJob - Courtage en recrutement européen"
                          maxLength={60}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          {(contentFR.seo?.title || '').length} / 60 caractères
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Description SEO (Meta description)
                          <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Max 160 caractères</Badge>
                        </label>
                        <Textarea
                          value={contentFR.seo?.description || ''}
                          onChange={(e) => handleFieldChange('seo', 'description', e.target.value)}
                          rows={3}
                          placeholder="Description pour les moteurs de recherche..."
                          maxLength={160}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          {(contentFR.seo?.description || '').length} / 160 caractères
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Mots-clés (séparés par des virgules)</label>
                        <Textarea
                          value={(contentFR.seo?.keywords || []).join(', ')}
                          onChange={(e) => handleFieldChange('seo', 'keywords', e.target.value.split(',').map(k => k.trim()))}
                          rows={2}
                          placeholder="recrutement, intérim, europe, agences..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Open Graph */}
                <Card className="border-2 border-blue-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 flex items-center gap-2">
                          📱 Open Graph
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Facebook / LinkedIn</Badge>
                        </h4>
                        <p className="text-xs text-slate-500">Optimisez le partage sur les réseaux sociaux</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">OG Title</label>
                      <Input
                        value={contentFR.seo?.ogTitle || ''}
                        onChange={(e) => handleFieldChange('seo', 'ogTitle', e.target.value)}
                        placeholder="Titre pour le partage social"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">OG Description</label>
                      <Textarea
                        value={contentFR.seo?.ogDescription || ''}
                        onChange={(e) => handleFieldChange('seo', 'ogDescription', e.target.value)}
                        rows={2}
                        placeholder="Description pour le partage social"
                      />
                    </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">OG Image URL</label>
                        <Input
                          value={contentFR.seo?.ogImage || ''}
                          onChange={(e) => handleFieldChange('seo', 'ogImage', e.target.value)}
                          placeholder="https://yojob.fr/images/og-image.jpg"
                        />
                        <p className="text-xs text-slate-500 mt-1">Recommandé : 1200x630px</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Twitter Cards */}
                <Card className="border-2 border-cyan-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 flex items-center gap-2">
                          🐦 Twitter Cards
                          <Badge className="bg-cyan-100 text-cyan-700 text-xs">Twitter / X</Badge>
                        </h4>
                        <p className="text-xs text-slate-500">Optimisez le partage sur Twitter/X</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Twitter Title</label>
                      <Input
                        value={contentFR.seo?.twitterTitle || ''}
                        onChange={(e) => handleFieldChange('seo', 'twitterTitle', e.target.value)}
                        placeholder="Titre pour Twitter"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Twitter Description</label>
                      <Textarea
                        value={contentFR.seo?.twitterDescription || ''}
                        onChange={(e) => handleFieldChange('seo', 'twitterDescription', e.target.value)}
                        rows={2}
                        placeholder="Description pour Twitter"
                      />
                    </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Twitter Image URL</label>
                        <Input
                          value={contentFR.seo?.twitterImage || ''}
                          onChange={(e) => handleFieldChange('seo', 'twitterImage', e.target.value)}
                          placeholder="https://yojob.fr/images/twitter-image.jpg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Référencement IA */}
                <Card className="border-2 border-violet-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 flex items-center gap-2">
                          Référencement IA
                          <Badge className="bg-violet-100 text-violet-700 text-xs">ChatGPT / Perplexity</Badge>
                        </h4>
                        <p className="text-xs text-slate-500">Optimisez pour les moteurs de recherche IA</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">
                        Résumé pour les IA
                        <Badge className="ml-2 bg-violet-100 text-violet-700 text-xs">Max 500 caractères</Badge>
                      </label>
                      <Textarea
                        value={contentFR.seo?.aiSummary || ''}
                        onChange={(e) => handleFieldChange('seo', 'aiSummary', e.target.value)}
                        rows={4}
                        placeholder="Résumé clair et structuré pour optimiser le référencement par les intelligences artificielles..."
                        maxLength={500}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {(contentFR.seo?.aiSummary || '').length} / 500 caractères
                      </p>
                      <p className="text-xs text-violet-600 mt-2 flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Ce texte aide ChatGPT, Perplexity et autres IA à comprendre et recommander votre site
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* URL Canonique */}
                <Card className="border-2 border-indigo-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">🔗 URL Canonique</h4>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">URL Canonique</label>
                      <Input
                        value={contentFR.seo?.canonicalUrl || ''}
                        onChange={(e) => handleFieldChange('seo', 'canonicalUrl', e.target.value)}
                        placeholder="https://yojob.fr"
                      />
                      <p className="text-xs text-slate-500 mt-1">URL principale de cette page pour éviter le contenu dupliqué</p>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Schema.org */}
                <Card className="border-2 border-green-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 flex items-center gap-2">
                          ❓ FAQ Structurée
                          <Badge className="bg-green-100 text-green-700 text-xs">Schema.org</Badge>
                        </h4>
                        <p className="text-xs text-slate-500">Questions affichées dans les résultats Google</p>
                      </div>
                    </div>
                  
                    {contentFR.seo?.faq?.map((item, index) => (
                      <Card key={index} className="mb-4 border-slate-200 bg-slate-50">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm text-slate-700 mb-2">Question {index + 1}</label>
                              <Input
                                value={item.question || ''}
                                onChange={(e) => {
                                  const newFaq = [...(contentFR.seo?.faq || [])];
                                  newFaq[index] = { ...newFaq[index], question: e.target.value };
                                  handleFieldChange('seo', 'faq', newFaq);
                                }}
                                placeholder="Qu'est-ce que YoJob ?"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-700 mb-2">Réponse {index + 1}</label>
                              <Textarea
                                value={item.answer || ''}
                                onChange={(e) => {
                                  const newFaq = [...(contentFR.seo?.faq || [])];
                                  newFaq[index] = { ...newFaq[index], answer: e.target.value };
                                  handleFieldChange('seo', 'faq', newFaq);
                                }}
                                rows={3}
                                placeholder="YoJob est le premier courtier..."
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>

                {/* Google Analytics & Tag Manager */}
                <Card className="border-2 border-blue-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 flex items-center gap-2">
                          📊 Google Analytics & Tag Manager
                          <Badge className="bg-blue-100 text-blue-700 text-xs">Tracking</Badge>
                        </h4>
                        <p className="text-xs text-slate-500">Configurez le suivi des visiteurs</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Google Analytics ID
                          <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">G-XXXXXXXXXX</Badge>
                        </label>
                        <Input
                          value={contentFR.seo?.googleAnalyticsId || ''}
                          onChange={(e) => handleFieldChange('seo', 'googleAnalyticsId', e.target.value)}
                          placeholder="G-XXXXXXXXXX"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Laissez vide pour désactiver Google Analytics
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          Google Tag Manager ID
                          <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">GTM-XXXXXXX</Badge>
                        </label>
                        <Input
                          value={contentFR.seo?.googleTagManagerId || ''}
                          onChange={(e) => handleFieldChange('seo', 'googleTagManagerId', e.target.value)}
                          placeholder="GTM-XXXXXXX"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Laissez vide pour désactiver Google Tag Manager
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conseils d'utilisation */}
                <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour un SEO optimal
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span><strong>Title SEO</strong> : Incluez votre mot-clé principal et votre marque (max 60 caractères)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span><strong>Meta Description</strong> : Rédigez un résumé attractif avec appel à l&apos;action (max 160 caractères)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span><strong>Open Graph</strong> : Images 1200x630px pour un rendu parfait sur Facebook/LinkedIn</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span><strong>Référencement IA</strong> : Rédigez un résumé structuré pour ChatGPT et Perplexity</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span><strong>FAQ Schema.org</strong> : Augmente vos chances d&apos;apparaître dans les featured snippets Google</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            Un bon SEO augmente votre visibilité organique et réduit vos coûts d&apos;acquisition
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section Stats */}
            <TabsContent value="stats" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec boutons d'action */}
                <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-slate-900 flex items-center gap-2">
                          Chiffres clés de votre activité
                          {Array.isArray(contentFR.stats) && contentFR.stats.length > 0 && (
                            <Badge className="bg-blue-500 text-white">
                              {contentFR.stats.length} {contentFR.stats.length === 1 ? 'statistique' : 'statistiques'}
                            </Badge>
                          )}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 ml-13">
                      Ces cards animés mettent en avant vos statistiques principales (expertise, réseau, missions...). 
                      Modifiez les <strong>valeurs numériques</strong>, <strong>icônes</strong> et <strong>couleurs</strong> pour refléter votre activité.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {(!contentFR.stats || !Array.isArray(contentFR.stats) || contentFR.stats.length === 0) && (
                      <Button
                        onClick={() => {
                          const defaultStats = [
                            { value: 10, suffix: '+', label: "ans d'expertise", icon: 'Target', color: 'blue' },
                            { value: 27, suffix: '', label: 'pays couverts', icon: 'Globe', color: 'cyan' },
                            { value: 500, suffix: '+', label: 'agences partenaires', icon: 'Network', color: 'violet' },
                            { value: 2000, suffix: '+', label: 'missions réalisées', icon: 'CheckCircle', color: 'green' },
                          ];
                          handleFieldChange('stats', '', defaultStats);
                          toast.success('✅ Statistiques par défaut restaurées !');
                        }}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Restaurer par défaut
                      </Button>
                    )}
                    {Array.isArray(contentFR.stats) && contentFR.stats.length > 0 && (
                      <Button
                        onClick={handleAddStat}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    )}
                  </div>
                </div>

                {(!contentFR.stats || !Array.isArray(contentFR.stats) || contentFR.stats.length === 0) ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xl">
                      <CardContent className="p-8 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <AlertCircle className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-slate-900 mb-3">Aucune statistique configurée</h4>
                        <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                          Les cards de statistiques mettent en avant vos chiffres clés sur la landing page. 
                          Cliquez sur <strong>&quot;Restaurer par défaut&quot;</strong> ci-dessus pour charger automatiquement 4 statistiques prêtes à l&apos;emploi.
                        </p>
                        
                        <div className="bg-white rounded-xl p-6 text-left max-w-md mx-auto border-2 border-amber-200 shadow-lg">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                              <Info className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-sm text-slate-900">Statistiques par défaut YoJob</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <div className="text-2xl text-blue-600 mb-1">10+</div>
                              <div className="text-xs text-slate-600">ans d&apos;expertise</div>
                            </div>
                            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                              <div className="text-2xl text-cyan-600 mb-1">27</div>
                              <div className="text-xs text-slate-600">pays couverts</div>
                            </div>
                            <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
                              <div className="text-2xl text-violet-600 mb-1">500+</div>
                              <div className="text-xs text-slate-600">agences</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                              <div className="text-2xl text-green-600 mb-1">2000+</div>
                              <div className="text-xs text-slate-600">missions</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  Array.isArray(contentFR.stats) && contentFR.stats.map((stat, index) => {
                    const colors = getColorClasses(stat.color || 'blue');
                    const IconComponent = ICON_MAP[stat.icon] || Target;
                    
                    return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-2 ${colors.border} bg-white shadow-lg hover:shadow-xl transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-slate-900">Statistique {index + 1}</h4>
                              <p className="text-xs text-slate-500">Modifiez les valeurs ci-dessous</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleRemoveStat(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Formulaire d'édition */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  💯 Valeur
                                </label>
                                <Input
                                  type="number"
                                  value={stat.value || 0}
                                  onChange={(e) => handleFieldChange('stats', 'value', parseInt(e.target.value) || 0, index)}
                                  placeholder="500"
                                  className="text-lg"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  ➕ Suffixe
                                </label>
                                <Input
                                  value={stat.suffix || ''}
                                  onChange={(e) => handleFieldChange('stats', 'suffix', e.target.value, index)}
                                  placeholder="+ ou ans..."
                                  maxLength={10}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm text-slate-700 mb-2">
                                📝 Label descriptif
                              </label>
                              <Input
                                value={stat.label || ''}
                                onChange={(e) => handleFieldChange('stats', 'label', e.target.value, index)}
                                placeholder="agences partenaires"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  🎨 Icône
                                </label>
                                <Select
                                  value={stat.icon || 'Target'}
                                  onValueChange={(value) => handleFieldChange('stats', 'icon', value, index)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Icône" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Target">🎯 Target</SelectItem>
                                    <SelectItem value="Globe">🌍 Globe</SelectItem>
                                    <SelectItem value="Network">🔗 Network</SelectItem>
                                    <SelectItem value="CheckCircle">✅ CheckCircle</SelectItem>
                                    <SelectItem value="Users">👥 Users</SelectItem>
                                    <SelectItem value="Building2">🏗️ Building</SelectItem>
                                    <SelectItem value="Briefcase">💼 Briefcase</SelectItem>
                                    <SelectItem value="Clock">⏰ Clock</SelectItem>
                                    <SelectItem value="Shield">🛡️ Shield</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  🎨 Couleur
                                </label>
                                <Select
                                  value={stat.color || 'blue'}
                                  onValueChange={(value) => handleFieldChange('stats', 'color', value, index)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Couleur" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="blue">🔵 Bleu</SelectItem>
                                    <SelectItem value="cyan">🩵 Cyan</SelectItem>
                                    <SelectItem value="violet">🟣 Violet</SelectItem>
                                    <SelectItem value="green">🟢 Vert</SelectItem>
                                    <SelectItem value="orange">🟠 Orange</SelectItem>
                                    <SelectItem value="pink">🩷 Rose</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          {/* Aperçu en temps réel */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-3">
                              <Eye className="w-4 h-4 text-slate-500" />
                              <p className="text-sm text-slate-600">Aperçu en temps réel</p>
                            </div>
                            <div className={`${colors.bg} rounded-xl p-6 border-2 ${colors.border}`}>
                              <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                                  <IconComponent className="w-10 h-10 text-white" />
                                </div>
                                <div className={`text-4xl mb-2 ${colors.text}`}>
                                  {stat.value || 0}{stat.suffix || ''}
                                </div>
                                <div className="text-sm text-slate-600">
                                  {stat.label || 'Label de la statistique'}
                                </div>
                              </motion.div>
                            </div>
                            <p className="text-xs text-slate-500 text-center mt-2">
                              ✨ Cette card sera animée sur la landing page
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                    );
                  })
                )}

                {/* Info footer - Aide contextuelle */}
                {Array.isArray(contentFR.stats) && contentFR.stats.length > 0 && (
                  <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                            💡 Conseils d&apos;utilisation
                          </h4>
                          <ul className="text-sm text-slate-700 space-y-1.5">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              <span><strong>Valeur numérique</strong> : Utilisez des chiffres ronds et impactants (10+, 500+, 2000+...)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-500 mt-0.5">•</span>
                              <span><strong>Suffixe</strong> : Ajoutez &quot;+&quot; pour &quot;plus de&quot;, &quot;ans&quot;, &quot;%&quot;, ou laissez vide</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-violet-500 mt-0.5">•</span>
                              <span><strong>Label descriptif</strong> : Décrivez la statistique de manière claire et concise</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">•</span>
                              <span><strong>Couleurs</strong> : Alternez les couleurs pour un rendu visuel harmonieux</span>
                            </li>
                          </ul>
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <p className="text-xs text-slate-600">
                              <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                              Recommandé : 4 statistiques pour un affichage optimal sur desktop et mobile
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Section Services */}
            <TabsContent value="services" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 flex items-center gap-2">
                        Services proposés
                        {Array.isArray(contentFR.services) && contentFR.services.length > 0 && (
                          <Badge className="bg-blue-500 text-white">
                            {contentFR.services.length} {contentFR.services.length === 1 ? 'service' : 'services'}
                          </Badge>
                        )}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Gérez les services principaux présentés sur votre landing page avec icônes, couleurs et descriptions.
                  </p>
                </div>
                
                {Array.isArray(contentFR.services) && contentFR.services.map((service, index) => {
                  const colors = getColorClasses(service.color || 'blue');
                  const IconComponent = ICON_MAP[service.icon] || Users;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`border-2 ${colors.border} bg-white shadow-lg hover:shadow-xl transition-shadow`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-slate-900">Service {index + 1}</h4>
                                <p className="text-xs text-slate-500">Personnalisez votre service</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Formulaire d'édition */}
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  📝 Titre du service
                                </label>
                                <Input
                                  value={service.title || ''}
                                  onChange={(e) => handleFieldChange('services', 'title', e.target.value, index)}
                                  placeholder="Intérim Européen"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  💬 Description
                                </label>
                                <Textarea
                                  value={service.description || ''}
                                  onChange={(e) => handleFieldChange('services', 'description', e.target.value, index)}
                                  rows={3}
                                  placeholder="Décrivez votre service..."
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm text-slate-700 mb-2">
                                    🎨 Icône
                                  </label>
                                  <Select
                                    value={service.icon || 'Users'}
                                    onValueChange={(value) => handleFieldChange('services', 'icon', value, index)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Icône" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Users">👥 Users</SelectItem>
                                      <SelectItem value="Target">🎯 Target</SelectItem>
                                      <SelectItem value="ShieldCheck">🛡️ ShieldCheck</SelectItem>
                                      <SelectItem value="Briefcase">💼 Briefcase</SelectItem>
                                      <SelectItem value="Network">🔗 Network</SelectItem>
                                      <SelectItem value="Globe">🌍 Globe</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <label className="block text-sm text-slate-700 mb-2">
                                    🎨 Couleur
                                  </label>
                                  <Select
                                    value={service.color || 'blue'}
                                    onValueChange={(value) => handleFieldChange('services', 'color', value, index)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Couleur" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="blue">🔵 Bleu</SelectItem>
                                      <SelectItem value="cyan">🩵 Cyan</SelectItem>
                                      <SelectItem value="violet">🟣 Violet</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            {/* Aperçu en temps réel */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-3">
                                <Eye className="w-4 h-4 text-slate-500" />
                                <p className="text-sm text-slate-600">Aperçu en temps réel</p>
                              </div>
                              <div className={`${colors.bg} rounded-xl p-6 border-2 ${colors.border}`}>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-xl`}>
                                    <IconComponent className="w-8 h-8 text-white" />
                                  </div>
                                  <h4 className={`mb-2 ${colors.text}`}>
                                    {service.title || 'Titre du service'}
                                  </h4>
                                  <p className="text-sm text-slate-600">
                                    {service.description || 'Description du service...'}
                                  </p>
                                </motion.div>
                              </div>
                              <p className="text-xs text-slate-500 text-center mt-2">
                                ✨ Cette card sera animée sur la landing page
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {/* Conseils d'utilisation */}
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour des services attractifs
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span><strong>Titre</strong> : Court et percutant (2-4 mots max)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span><strong>Description</strong> : Mettez en avant les bénéfices clients, pas les caractéristiques</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span><strong>Icône</strong> : Choisissez une icône évocatrice qui renforce le message</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span><strong>Couleurs</strong> : Variez pour créer un visuel harmonieux (bleu, cyan, violet)</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-blue-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            Recommandé : 3 services pour un affichage optimal en grille sur desktop
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section Network */}
            <TabsContent value="network" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section Réseau Européen</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Présentez votre réseau international et la future marketplace avec système d&apos;inscription waitlist.
                  </p>
                </div>

                {/* Card Section Réseau */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-cyan-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Globe className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-slate-900">Contenu principal</h4>
                            <p className="text-xs text-slate-500">Textes de présentation du réseau</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Formulaire d'édition */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              🌍 Badge section
                            </label>
                            <Input
                              value={contentFR.network?.badge || ''}
                              onChange={(e) => handleFieldChange('network', 'badge', e.target.value)}
                              placeholder="🌍 Réseau Européen"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                              Badge affiché en haut de la section
                            </p>
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              📝 Titre principal
                            </label>
                            <Input
                              value={contentFR.network?.title || ''}
                              onChange={(e) => handleFieldChange('network', 'title', e.target.value)}
                              placeholder="Un réseau de 500+ agences dans 27 pays"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              💬 Sous-titre descriptif
                            </label>
                            <Textarea
                              value={contentFR.network?.subtitle || ''}
                              onChange={(e) => handleFieldChange('network', 'subtitle', e.target.value)}
                              rows={2}
                              placeholder="Accédez au plus grand réseau..."
                            />
                          </div>
                        </div>

                        {/* Aperçu en temps réel */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-600">Aperçu en temps réel</p>
                          </div>
                          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 min-h-[200px] flex flex-col justify-center">
                            <motion.div
                              className="text-center"
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              {contentFR.network?.badge && (
                                <div className="inline-block mb-3 px-3 py-1.5 bg-gradient-to-r from-cyan-100 to-blue-100 border border-cyan-200 rounded-full">
                                  <p className="text-sm text-slate-800">
                                    {contentFR.network?.badge}
                                  </p>
                                </div>
                              )}
                              <h3 className="text-slate-900 mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                {contentFR.network?.title || 'Titre du réseau'}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {contentFR.network?.subtitle || 'Sous-titre descriptif...'}
                              </p>
                            </motion.div>
                          </div>
                          <p className="text-xs text-slate-500 text-center mt-2">
                            🗺️ Une carte interactive de l&apos;Europe sera affichée
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Card Waitlist / Marketplace 2025 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="border-2 border-purple-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Rocket className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-slate-900">Waitlist Marketplace 2025</h4>
                            <p className="text-xs text-slate-500">Inscription liste d&apos;attente</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              🚀 Badge nouveauté
                            </label>
                            <Input
                              value={contentFR.network?.waitlist?.badge || ''}
                              onChange={(e) => handleFieldChange('network', 'waitlist.badge', e.target.value)}
                              placeholder="🚀 Nouveauté 2025"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              📧 Placeholder email
                            </label>
                            <Input
                              value={contentFR.network?.waitlist?.placeholder || ''}
                              onChange={(e) => handleFieldChange('network', 'waitlist.placeholder', e.target.value)}
                              placeholder="Votre email professionnel"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-slate-700 mb-2">
                            📝 Titre waitlist
                          </label>
                          <Input
                            value={contentFR.network?.waitlist?.title || ''}
                            onChange={(e) => handleFieldChange('network', 'waitlist.title', e.target.value)}
                            placeholder="Bientôt : La première marketplace..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-slate-700 mb-2">
                            💬 Description
                          </label>
                          <Textarea
                            value={contentFR.network?.waitlist?.description || ''}
                            onChange={(e) => handleFieldChange('network', 'waitlist.description', e.target.value)}
                            rows={2}
                            placeholder="Recherchez, comparez et contactez..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-slate-700 mb-2">
                            🎯 Bouton CTA
                          </label>
                          <Input
                            value={contentFR.network?.waitlist?.cta || ''}
                            onChange={(e) => handleFieldChange('network', 'waitlist.cta', e.target.value)}
                            placeholder="Rejoindre la liste d'attente"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-slate-700 mb-2">
                            ✨ Fonctionnalités (4 items)
                          </label>
                          <p className="text-xs text-slate-500 mb-2">
                            Entrez les 4 fonctionnalités séparées par des points-virgules (;)
                          </p>
                          <Textarea
                            value={(contentFR.network?.waitlist?.features || []).join(' ; ')}
                            onChange={(e) => handleFieldChange('network', 'waitlist.features', e.target.value.split(';').map(f => f.trim()))}
                            rows={4}
                            placeholder="Recherche multicritères ; Comparaison instantanée ; Avis vérifiés ; Mise en relation directe"
                          />
                          {Array.isArray(contentFR.network?.waitlist?.features) && contentFR.network?.waitlist?.features.length > 0 && (
                            <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                              <p className="text-xs text-slate-600 mb-2">Aperçu des features :</p>
                              <ul className="space-y-1">
                                {contentFR.network?.waitlist?.features.map((feature, idx) => (
                                  <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Conseils d'utilisation */}
                <Card className="border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour la section Réseau
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-500 mt-0.5">•</span>
                            <span><strong>Titre</strong> : Mettez en avant les chiffres clés (nombre d&apos;agences, pays couverts)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span><strong>Waitlist</strong> : Créez l&apos;urgence et l&apos;exclusivité (Nouveauté 2025, Bientôt...)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-cyan-500 mt-0.5">•</span>
                            <span><strong>Features</strong> : Listez 4 bénéfices concrets de la future marketplace</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span><strong>CTA</strong> : Encouragez l&apos;inscription (FOMO - Fear Of Missing Out)</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-cyan-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            La carte interactive de l&apos;Europe sera automatiquement affichée avec vos données
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section Process */}
            <TabsContent value="process" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section Comment ça marche</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Présentez votre processus en 4 étapes claires avec une timeline visuelle sur la landing page.
                  </p>
                </div>

                {/* Card En-tête de section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-2 border-indigo-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Info className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-slate-900">En-tête de section</h4>
                            <p className="text-xs text-slate-500">Titre et sous-titre introductifs</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              📝 Titre de la section
                            </label>
                            <Input
                              value={contentFR.process?.title || ''}
                              onChange={(e) => handleFieldChange('process', 'title', e.target.value)}
                              placeholder="Comment ça marche ?"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              💬 Sous-titre descriptif
                            </label>
                            <Input
                              value={contentFR.process?.subtitle || ''}
                              onChange={(e) => handleFieldChange('process', 'subtitle', e.target.value)}
                              placeholder="De votre besoin à l'intégration de vos talents"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-4 h-4 text-slate-500" />
                            <p className="text-sm text-slate-600">Aperçu en temps réel</p>
                          </div>
                          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 min-h-[140px] flex flex-col justify-center text-center">
                            <h3 className="text-slate-900 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              {contentFR.process?.title || 'Comment ça marche ?'}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {contentFR.process?.subtitle || 'De votre besoin à l\'intégration de vos talents'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Cards des 4 étapes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-slate-900">Les 4 étapes du processus</h4>
                  </div>
                  
                  {Array.isArray(contentFR.process?.steps) && contentFR.process?.steps.map((step, index) => {
                    const colors = getColorClasses(step.color || 'blue');
                    const IconComponent = ICON_MAP[step.icon] || FileText;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`border-2 ${colors.border} bg-white shadow-lg hover:shadow-xl transition-shadow`}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center shadow-lg relative`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-current rounded-full flex items-center justify-center shadow">
                                    <span className="text-xs">{step.number}</span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-slate-900">Étape {step.number}</h4>
                                  <p className="text-xs text-slate-500">Configuration de l&apos;étape</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Formulaire d'édition */}
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm text-slate-700 mb-2">
                                    📝 Titre de l&apos;étape
                                  </label>
                                  <Input
                                    value={step.title || ''}
                                    onChange={(e) => handleFieldChange('process', 'steps.title', e.target.value, index)}
                                    placeholder="Décrivez votre besoin"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm text-slate-700 mb-2">
                                    💬 Description
                                  </label>
                                  <Textarea
                                    value={step.description || ''}
                                    onChange={(e) => handleFieldChange('process', 'steps.description', e.target.value, index)}
                                    rows={2}
                                    placeholder="Profils recherchés, volume, localisation..."
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-sm text-slate-700 mb-2">
                                      🎨 Icône
                                    </label>
                                    <Select
                                      value={step.icon || 'FileText'}
                                      onValueChange={(value) => handleFieldChange('process', 'steps.icon', value, index)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Icône" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="FileText">📄 FileText</SelectItem>
                                        <SelectItem value="Network">🔗 Network</SelectItem>
                                        <SelectItem value="UserCheck">✅ UserCheck</SelectItem>
                                        <SelectItem value="CheckCircle">✔️ CheckCircle</SelectItem>
                                        <SelectItem value="Users">👥 Users</SelectItem>
                                        <SelectItem value="Target">🎯 Target</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <label className="block text-sm text-slate-700 mb-2">
                                      🎨 Couleur
                                    </label>
                                    <Select
                                      value={step.color || 'blue'}
                                      onValueChange={(value) => handleFieldChange('process', 'steps.color', value, index)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Couleur" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="blue">🔵 Bleu</SelectItem>
                                        <SelectItem value="cyan">🩵 Cyan</SelectItem>
                                        <SelectItem value="violet">🟣 Violet</SelectItem>
                                        <SelectItem value="green">🟢 Vert</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>

                              {/* Aperçu en temps réel */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-3">
                                  <Eye className="w-4 h-4 text-slate-500" />
                                  <p className="text-sm text-slate-600">Aperçu en temps réel</p>
                                </div>
                                <div className={`${colors.bg} rounded-xl p-6 border-2 ${colors.border} min-h-[180px]`}>
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="relative mb-4">
                                      <div className={`w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                      </div>
                                      <div className={`absolute -top-1 -right-1 w-7 h-7 bg-white border-2 ${colors.border} rounded-full flex items-center justify-center shadow-lg`}>
                                        <span className={`text-sm ${colors.text}`}>{step.number}</span>
                                      </div>
                                    </div>
                                    <h4 className={`mb-2 ${colors.text}`}>
                                      {step.title || 'Titre de l\'étape'}
                                    </h4>
                                    <p className="text-sm text-slate-600">
                                      {step.description || 'Description de l\'étape...'}
                                    </p>
                                  </motion.div>
                                </div>
                                <p className="text-xs text-slate-500 text-center mt-2">
                                  🔗 Une timeline connectera les étapes sur la landing
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Conseils d'utilisation */}
                <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour un processus clair
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span><strong>Titres</strong> : Utilisez des verbes d&apos;action (Décrivez, Recevez, Validez, Accueillez)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span><strong>Descriptions</strong> : Soyez concret et rassurant (délais, livrables, actions)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span><strong>Couleurs</strong> : Progression logique (bleu → cyan → violet → vert)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500 mt-0.5">•</span>
                            <span><strong>Icônes</strong> : Choisissez des symboles évocateurs de chaque étape</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-indigo-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            Une timeline horizontale avec dots animés reliera visuellement les 4 étapes
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section Testimonials */}
            <TabsContent value="testimonials" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section Témoignages clients</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Gérez les témoignages clients affichés dans le carousel rotatif avec notation 5 étoiles.
                  </p>
                </div>

                {/* Bouton Ajouter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-slate-900">Liste des témoignages</h4>
                  </div>
                  <Button
                    onClick={handleAddTestimonial}
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un témoignage
                  </Button>
                </div>

                {/* Cards des témoignages */}
                {Array.isArray(contentFR.testimonials) && contentFR.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-amber-200 bg-white shadow-lg hover:shadow-xl transition-shadow relative group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-slate-900">Témoignage {index + 1}</h4>
                              <p className="text-xs text-slate-500">Avis client vérifié</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                                <span key={i} className="text-amber-500 text-lg">⭐</span>
                              ))}
                            </div>
                            <Button
                              onClick={() => handleRemoveTestimonial(index)}
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Formulaire d'édition */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  👤 Nom
                                </label>
                                <Input
                                  value={testimonial.name || ''}
                                  onChange={(e) => handleFieldChange('testimonials', 'name', e.target.value, index)}
                                  placeholder="Marie Dubois"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  💼 Poste
                                </label>
                                <Input
                                  value={testimonial.role || ''}
                                  onChange={(e) => handleFieldChange('testimonials', 'role', e.target.value, index)}
                                  placeholder="DRH"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  🏢 Entreprise
                                </label>
                                <Input
                                  value={testimonial.company || ''}
                                  onChange={(e) => handleFieldChange('testimonials', 'company', e.target.value, index)}
                                  placeholder="ConstructEurope"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  🏭 Secteur
                                </label>
                                <Input
                                  value={testimonial.sector || ''}
                                  onChange={(e) => handleFieldChange('testimonials', 'sector', e.target.value, index)}
                                  placeholder="BTP"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm text-slate-700 mb-2">
                                📸 Avatar / Photo
                              </label>
                              <AvatarUploader
                                currentAvatar={testimonial.avatar}
                                onAvatarChange={(url) => handleFieldChange('testimonials', 'avatar', url, index)}
                                name={testimonial.name || 'Client'}
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-slate-700 mb-2">
                                💬 Citation / Témoignage
                              </label>
                              <Textarea
                                value={testimonial.quote || ''}
                                onChange={(e) => handleFieldChange('testimonials', 'quote', e.target.value, index)}
                                rows={3}
                                placeholder="YoJob nous a permis de..."
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm text-slate-700 mb-2">
                                ⭐ Note (étoiles)
                              </label>
                              <Select
                                value={String(testimonial.rating || 5)}
                                onValueChange={(value) => handleFieldChange('testimonials', 'rating', parseInt(value), index)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choisir une note" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">⭐⭐⭐⭐⭐ (5 étoiles)</SelectItem>
                                  <SelectItem value="4">⭐⭐⭐⭐ (4 étoiles)</SelectItem>
                                  <SelectItem value="3">⭐⭐⭐ (3 étoiles)</SelectItem>
                                  <SelectItem value="2">⭐⭐ (2 étoiles)</SelectItem>
                                  <SelectItem value="1">⭐ (1 étoile)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Aperçu en temps réel */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-3">
                              <Eye className="w-4 h-4 text-slate-500" />
                              <p className="text-sm text-slate-600">Aperçu en temps réel</p>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 min-h-[280px]">
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col"
                              >
                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                                    <span key={i} className="text-amber-500 text-xl">⭐</span>
                                  ))}
                                </div>
                                
                                {/* Quote */}
                                <blockquote className="text-sm text-slate-700 mb-4 italic flex-1">
                                  &ldquo;{testimonial.quote || 'Citation du témoignage client...'}&rdquo;
                                </blockquote>
                                
                                {/* Author info */}
                                <div className="border-t border-amber-200 pt-3">
                                  <p className="text-slate-900 mb-1">
                                    {testimonial.name || 'Nom du client'}
                                  </p>
                                  <p className="text-sm text-slate-600">
                                    {testimonial.role || 'Poste'} • {testimonial.company || 'Entreprise'}
                                  </p>
                                  {testimonial.sector && (
                                    <p className="text-xs text-slate-500 mt-1">
                                      Secteur : {testimonial.sector}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            </div>
                            <p className="text-xs text-slate-500 text-center mt-2">
                              🎠 Ce témoignage sera affiché dans le carousel
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Conseils d'utilisation */}
                <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour des témoignages impactants
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span><strong>Citations</strong> : Utilisez des témoignages spécifiques avec chiffres et résultats concrets</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            <span><strong>Crédibilité</strong> : Nom complet, poste précis et entreprise réelle renforcent l&apos;authenticité</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span><strong>Diversité</strong> : Variez les secteurs pour montrer votre expertise multi-industries</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            <span><strong>Notation</strong> : Privilégiez 5 étoiles pour renforcer la confiance (4 minimum)</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-amber-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            Recommandé : 3 à 6 témoignages pour un carousel dynamique et crédible
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section Sectors */}
            <TabsContent value="sectors" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section Secteurs d&apos;activité</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Présentez les secteurs d&apos;activité couverts par votre entreprise avec icônes et couleurs personnalisées.
                  </p>
                </div>

                {/* En-tête de section */}
                <Card className="border-2 border-orange-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Textes de section</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Badge section</label>
                        <Input
                          value={contentFR.sectors?.badge || ''}
                          onChange={(e) => handleFieldChange('sectors', 'badge', e.target.value)}
                          placeholder="🎯 Tous secteurs"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Titre section</label>
                        <Input
                          value={contentFR.sectors?.title || ''}
                          onChange={(e) => handleFieldChange('sectors', 'title', e.target.value)}
                          placeholder="Tous secteurs, tous profils"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Sous-titre section</label>
                        <Textarea
                          value={contentFR.sectors?.subtitle || ''}
                          onChange={(e) => handleFieldChange('sectors', 'subtitle', e.target.value)}
                          rows={2}
                          placeholder="Nous recrutons pour l'ensemble des secteurs d'activité à travers toute l'Europe"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow">
                        <Briefcase className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-slate-900">Liste des secteurs</h4>
                    </div>
                    <Button
                      onClick={handleAddSector}
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un secteur
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentFR.sectors?.sectors?.map((sector, index) => (
                    <Card key={index} className="border-slate-200 bg-slate-50 relative group hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-slate-900">Secteur {index + 1}</h4>
                          <Button
                            onClick={() => handleRemoveSector(index)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">Nom du secteur</label>
                            <Input
                              value={sector.name || ''}
                              onChange={(e) => handleFieldChange('sectors', 'sectors.name', e.target.value, index)}
                              placeholder="BTP"
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">Icône (Lucide React)</label>
                            <Select
                              value={sector.icon || 'Briefcase'}
                              onValueChange={(value) => handleFieldChange('sectors', 'sectors.icon', value, index)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir une icône" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Building2">🏗️ Building2 (BTP)</SelectItem>
                                <SelectItem value="Factory">🏭 Factory (Industrie)</SelectItem>
                                <SelectItem value="Tractor">🚜 Tractor (Agriculture)</SelectItem>
                                <SelectItem value="UtensilsCrossed">🍴 UtensilsCrossed (Hôtellerie)</SelectItem>
                                <SelectItem value="Heart">❤️ Heart (Santé)</SelectItem>
                                <SelectItem value="Laptop">💻 Laptop (Tech)</SelectItem>
                                <SelectItem value="Truck">🚚 Truck (Logistique)</SelectItem>
                                <SelectItem value="ShoppingBag">🛍️ ShoppingBag (Commerce)</SelectItem>
                                <SelectItem value="Briefcase">💼 Briefcase (Services)</SelectItem>
                                <SelectItem value="Wrench">🔧 Wrench (Maintenance)</SelectItem>
                                <SelectItem value="Plane">✈️ Plane (Transport)</SelectItem>
                                <SelectItem value="Ship">🚢 Ship (Maritime)</SelectItem>
                                <SelectItem value="GraduationCap">🎓 GraduationCap (Éducation)</SelectItem>
                                <SelectItem value="Users">👥 Users (RH)</SelectItem>
                                <SelectItem value="PiggyBank">🐷 PiggyBank (Finance)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-sm text-slate-700 mb-2">Couleur</label>
                            <Select
                              value={sector.color || 'blue'}
                              onValueChange={(value) => handleFieldChange('sectors', 'sectors.color', value, index)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choisir une couleur" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="orange">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                                    Orange
                                  </div>
                                </SelectItem>
                                <SelectItem value="blue">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                    Bleu
                                  </div>
                                </SelectItem>
                                <SelectItem value="green">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                    Vert
                                  </div>
                                </SelectItem>
                                <SelectItem value="red">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                    Rouge
                                  </div>
                                </SelectItem>
                                <SelectItem value="pink">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                                    Rose
                                  </div>
                                </SelectItem>
                                <SelectItem value="violet">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                                    Violet
                                  </div>
                                </SelectItem>
                                <SelectItem value="cyan">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
                                    Cyan
                                  </div>
                                </SelectItem>
                                <SelectItem value="yellow">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                                    Jaune
                                  </div>
                                </SelectItem>
                                <SelectItem value="indigo">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                                    Indigo
                                  </div>
                                </SelectItem>
                                <SelectItem value="teal">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-teal-500"></div>
                                    Teal
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Preview de la card secteur */}
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <p className="text-xs text-slate-500 mb-2">Aperçu :</p>
                            <div className={`flex items-center gap-3 p-3 rounded-lg bg-${sector.color || 'blue'}-50 border border-${sector.color || 'blue'}-200`}>
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${sector.color || 'blue'}-400 to-${sector.color || 'blue'}-600 flex items-center justify-center text-white shadow-lg`}>
                                {(() => {
                                  const IconComponent = ICON_MAP[sector.icon];
                                  return IconComponent ? <IconComponent className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />;
                                })()}
                              </div>
                              <span className="text-slate-900">{sector.name || 'Nom du secteur'}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                  {(!contentFR.sectors?.sectors || contentFR.sectors.sectors.length === 0) && (
                    <div className="text-center p-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                      <p className="text-slate-600 mb-4">Aucun secteur défini</p>
                      <Button
                        onClick={handleAddSector}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter le premier secteur
                      </Button>
                    </div>
                  )}
                </div>

                {/* Conseils d'utilisation */}
                <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour les secteurs
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            <span><strong>Noms courts</strong> : BTP, Industrie, Tech... (1-2 mots maximum)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span><strong>Icônes adaptées</strong> : Choisissez des symboles immédiatement reconnaissables</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            <span><strong>Couleurs variées</strong> : Alternez les couleurs pour un rendu visuel attractif</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span><strong>Grille harmonieuse</strong> : 6 secteurs s&apos;affichent parfaitement en grille 3x2</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-orange-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            Les secteurs rassurent vos visiteurs sur votre polyvalence et expertise multi-industries
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section CTA */}
            <TabsContent value="cta" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section CTA / Contact</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Configurez l'appel à l'action principal et le formulaire de contact de votre landing page.
                  </p>
                </div>

                {/* Titres principaux */}
                <Card className="border-2 border-pink-200 bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Titres de section</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          🏷️ Badge
                        </label>
                        <Input
                          value={contentFR.ctaForm?.badge || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'badge', e.target.value)}
                          placeholder="📞 Contactez-nous"
                          className="border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          📢 Titre principal
                        </label>
                        <Input
                          value={contentFR.ctaForm?.title || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'title', e.target.value)}
                          placeholder="Prêt à recruter en Europe ?"
                          className="border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          💡 Sous-titre
                        </label>
                        <Input
                          value={contentFR.ctaForm?.subtitle || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'subtitle', e.target.value)}
                          placeholder="Contactez-nous pour un devis personnalisé"
                          className="border-slate-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bénéfices */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center shadow">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-slate-900">Bénéfices (4 items)</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentFR.ctaForm?.benefits?.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border-2 border-pink-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <h4 className="text-slate-900">Bénéfice {index + 1}</h4>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  🎨 Icône (Lucide React)
                                </label>
                                <Select
                                  value={benefit.icon || 'CheckCircle'}
                                  onValueChange={(value) => handleFieldChange('ctaForm', 'benefits.icon', value, index)}
                                >
                                  <SelectTrigger className="border-slate-300">
                                    <SelectValue placeholder="Choisir une icône" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Clock">⏰ Clock</SelectItem>
                                    <SelectItem value="Shield">🛡️ Shield</SelectItem>
                                    <SelectItem value="Users">👥 Users</SelectItem>
                                    <SelectItem value="HeadphonesIcon">🎧 HeadphonesIcon</SelectItem>
                                    <SelectItem value="CheckCircle">✅ CheckCircle</SelectItem>
                                    <SelectItem value="Target">🎯 Target</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  📌 Titre
                                </label>
                                <Input
                                  value={benefit.title || ''}
                                  onChange={(e) => handleFieldChange('ctaForm', 'benefits.title', e.target.value, index)}
                                  placeholder="Réponse rapide"
                                  className="border-slate-300"
                                />
                              </div>
                              <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                  💬 Description
                                </label>
                                <Input
                                  value={benefit.description || ''}
                                  onChange={(e) => handleFieldChange('ctaForm', 'benefits.description', e.target.value, index)}
                                  placeholder="Devis sous 24h"
                                  className="border-slate-300"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Formulaire de contact */}
                <Card className="border-2 border-pink-200 bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow">
                        <Edit3 className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Formulaire de contact</h4>
                    </div>
                  
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          📝 Titre formulaire
                        </label>
                        <Input
                          value={contentFR.ctaForm?.badge || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'badge', e.target.value)}
                          placeholder="Demander un devis"
                          className="border-slate-300"
                        />
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs text-slate-600 mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Labels des champs du formulaire
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              👤 Label "Nom"
                            </label>
                            <Input
                              value={contentFR.ctaForm?.form?.fields?.name?.label || ''}
                              onChange={(e) => handleFieldChange('ctaForm', 'form.fields.name.label', e.target.value)}
                              placeholder="Nom complet"
                              className="border-slate-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              📧 Label "Email"
                            </label>
                            <Input
                              value={contentFR.ctaForm?.form?.fields?.email?.label || ''}
                              onChange={(e) => handleFieldChange('ctaForm', 'form.fields.email.label', e.target.value)}
                              placeholder="Email professionnel"
                              className="border-slate-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              📞 Label "Téléphone"
                            </label>
                            <Input
                              value={contentFR.ctaForm?.form?.fields?.phone?.label || ''}
                              onChange={(e) => handleFieldChange('ctaForm', 'form.fields.phone.label', e.target.value)}
                              placeholder="Téléphone"
                              className="border-slate-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              🏢 Label "Entreprise"
                            </label>
                            <Input
                              value={contentFR.ctaForm?.form?.fields?.company?.label || ''}
                              onChange={(e) => handleFieldChange('ctaForm', 'form.fields.company.label', e.target.value)}
                              placeholder="Entreprise"
                              className="border-slate-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              🎯 Label "Type de besoin"
                            </label>
                            <Input
                              value={contentFR.ctaForm?.form?.fields?.needType?.label || ''}
                              onChange={(e) => handleFieldChange('ctaForm', 'form.fields.needType.label', e.target.value)}
                              placeholder="Type de besoin"
                              className="border-slate-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-slate-700 mb-2">
                              💬 Label "Message"
                            </label>
                            <Input
                              value={contentFR.ctaForm?.form?.fields?.message?.label || ''}
                              onChange={(e) => handleFieldChange('ctaForm', 'form.fields.message.label', e.target.value)}
                              placeholder="Décrivez votre besoin"
                              className="border-slate-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          🚀 Bouton d'envoi
                        </label>
                        <Input
                          value={contentFR.ctaForm?.form?.ctaLabel || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'form.ctaLabel', e.target.value)}
                          placeholder="Envoyer ma demande"
                          className="border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          🔒 Message de sécurité
                        </label>
                        <Input
                          value={contentFR.ctaForm?.form?.securityNote || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'form.securityNote', e.target.value)}
                          placeholder="🔒 Vos données sont sécurisées..."
                          className="border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          ✅ Message de succès
                        </label>
                        <Input
                          value={contentFR.ctaForm?.form?.successMessage || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'form.successMessage', e.target.value)}
                          placeholder="Merci ! Nous vous recontacterons sous 24h."
                          className="border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">
                          📋 Types de besoin (options select)
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                          Entrez les options séparées par des points-virgules (;)
                        </p>
                        <Textarea
                          value={contentFR.ctaForm?.form?.fields?.needType?.placeholder || ''}
                          onChange={(e) => handleFieldChange('ctaForm', 'form.fields.needType.placeholder', e.target.value)}
                          rows={3}
                          placeholder="Intérim ; CDI ; Consultant ; Détachement ; Autre"
                          className="border-slate-300"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conseils */}
                <Card className="border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour un formulaire efficace
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-0.5">•</span>
                            <span>Limitez le nombre de champs obligatoires pour augmenter le taux de conversion</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-0.5">•</span>
                            <span>Utilisez des labels clairs et concis (ex: "Email professionnel" plutôt que "Email")</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-0.5">•</span>
                            <span>Rédigez un message de succès personnalisé pour rassurer le client</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-pink-500 mt-0.5">•</span>
                            <span>Les bénéfices affichés à gauche renforcent la confiance avant de remplir le formulaire</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Section Footer */}
            <TabsContent value="footer" className="mt-0 space-y-6">
              <div className="space-y-6">
                {/* Header avec informations */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Section Footer</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 ml-13">
                    Configurez le pied de page : slogan, coordonnées, liens de navigation et mentions légales.
                  </p>
                </div>

                {/* Slogan */}
                <Card className="border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Slogan de marque</h4>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Slogan</label>
                      <Input
                        value={contentFR.footer?.slogan || ''}
                        onChange={(e) => handleFieldChange('footer', 'slogan', e.target.value)}
                        placeholder="Votre partenaire recrutement en Europe"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Phrase d&apos;accroche affichée sous le logo dans le footer
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Coordonnées */}
                <Card className="border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Coordonnées</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Adresse</label>
                        <Input
                          value={contentFR.footer?.contact?.address || ''}
                          onChange={(e) => handleFieldChange('footer', 'contact.address', e.target.value)}
                          placeholder="Paris, France"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Téléphone</label>
                        <Input
                          value={contentFR.footer?.contact?.phone || ''}
                          onChange={(e) => handleFieldChange('footer', 'contact.phone', e.target.value)}
                          placeholder="+33 1 23 45 67 89"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Email</label>
                        <Input
                          value={contentFR.footer?.contact?.email || ''}
                          onChange={(e) => handleFieldChange('footer', 'contact.email', e.target.value)}
                          placeholder="contact@yojob.fr"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Liens Services */}
                <Card className="border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Liens Footer - Services</h4>
                    </div>
                    
                    <div>
                      <p className="text-xs text-slate-500 mb-2">Format : Label|Lien ; Label|Lien (ex: Intérim européen|#services ; Recrutement CDI|#services)</p>
                      <Textarea
                        value={(contentFR.footer?.services || []).map(s => `${s.label}|${s.link}`).join(' ; ')}
                        onChange={(e) => {
                          const services = e.target.value.split(';').map(item => {
                            const [label, link] = item.trim().split('|');
                            return { label: label?.trim() || '', link: link?.trim() || '#' };
                          }).filter(s => s.label);
                          handleFieldChange('footer', 'services', services);
                        }}
                        rows={3}
                        placeholder="Intérim européen|#services ; Recrutement CDI|#services"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Liens Entreprise */}
                <Card className="border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Liens Footer - Entreprise</h4>
                    </div>
                    
                    <div>
                      <p className="text-xs text-slate-500 mb-2">Format : Label|Lien ; Label|Lien</p>
                      <Textarea
                        value={(contentFR.footer?.company || []).map(c => `${c.label}|${c.link}`).join(' ; ')}
                        onChange={(e) => {
                          const company = e.target.value.split(';').map(item => {
                            const [label, link] = item.trim().split('|');
                            return { label: label?.trim() || '', link: link?.trim() || '#' };
                          }).filter(c => c.label);
                          handleFieldChange('footer', 'company', company);
                        }}
                        rows={3}
                        placeholder="À propos|#about ; Notre réseau|#network"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Mentions légales */}
                <Card className="border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-slate-900">Mentions légales</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Copyright</label>
                        <Input
                          value={contentFR.footer?.legal?.copyright || ''}
                          onChange={(e) => handleFieldChange('footer', 'legal.copyright', e.target.value)}
                          placeholder="© 2024 YoJob. Tous droits réservés."
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-slate-700 mb-2">Liens légaux</label>
                        <p className="text-xs text-slate-500 mb-2">Format : Label|Lien ; Label|Lien</p>
                        <Textarea
                          value={(contentFR.footer?.legal?.links || []).map(l => `${l.label}|${l.link}`).join(' ; ')}
                          onChange={(e) => {
                            const links = e.target.value.split(';').map(item => {
                              const [label, link] = item.trim().split('|');
                              return { label: label?.trim() || '', link: link?.trim() || '#' };
                            }).filter(l => l.label);
                            handleFieldChange('footer', 'legal.links', links);
                          }}
                          rows={2}
                          placeholder="Mentions légales|/legal ; CGV|/cgv ; Confidentialité|/privacy"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conseils d'utilisation */}
                <Card className="border-slate-200 bg-gradient-to-r from-slate-50 to-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-slate-900 mb-2 flex items-center gap-2">
                          💡 Conseils pour un footer efficace
                        </h4>
                        <ul className="text-sm text-slate-700 space-y-1.5">
                          <li className="flex items-start gap-2">
                            <span className="text-slate-500 mt-0.5">•</span>
                            <span><strong>Slogan</strong> : Phrase courte et mémorable résumant votre proposition de valeur</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-slate-600 mt-0.5">•</span>
                            <span><strong>Coordonnées</strong> : Indiquez vos vraies coordonnées pour rassurer et faciliter le contact</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-slate-500 mt-0.5">•</span>
                            <span><strong>Liens de navigation</strong> : Organisez en catégories logiques (Services, Entreprise)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-slate-600 mt-0.5">•</span>
                            <span><strong>Mentions légales</strong> : Obligatoires pour la conformité RGPD et la confiance client</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <p className="text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                            Un footer bien structuré améliore la navigation et renforce votre crédibilité
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Info pour les autres sections */}
            {!['hero', 'seo', 'stats', 'services', 'network', 'process', 'testimonials', 'sectors', 'cta', 'footer'].includes(activeSection) && (
              <div className="p-8 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">Section en construction</h3>
                <p className="text-slate-600 text-sm mb-4">
                  L'éditeur pour la section <strong>{sections.find(s => s.id === activeSection)?.label}</strong> sera
                  ajouté prochainement.
                </p>
                <Badge className="bg-blue-100 text-blue-700">
                  En développement
                </Badge>
              </div>
            )}
          </CardContent>
        </Tabs>
      </Card>

      {/* 🔧 Panneau Outils SEO */}
      <SEOToolsPanel landingContent={landingContent} />

      {/* Footer d'aide */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-slate-900 mb-2">Workflow de publication</h4>
              <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                <li>Modifiez le contenu français dans cet éditeur</li>
                <li>Cliquez sur "Sauvegarder" pour enregistrer vos modifications</li>
                <li>Rendez-vous dans l'onglet <strong>"Traductions"</strong> → <strong>"Landing Page"</strong></li>
                <li>Générez les traductions avec l'IA Claude pour les 23 langues</li>
                <li>Validez et exportez les traductions finales</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}