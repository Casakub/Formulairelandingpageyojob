import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Search, 
  Save,
  AlertCircle,
  Type,
  Edit2,
  X,
  RefreshCw,
  CheckCircle,
  Sparkles,
  FileText,
  MessageSquare,
  Menu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';

// Use all European languages (23 languages)
const LANGUAGES = EUROPEAN_LANGUAGES;

type UITextCategory = 'buttons' | 'labels' | 'messages' | 'navigation';

interface UIText {
  id: string;
  key: string;
  category: UITextCategory;
  context: string;
  sourceFr: string;
}

const UI_TEXTS: UIText[] = [
  // Buttons
  { id: 'btn_next', key: 'button.next', category: 'buttons', context: 'Bouton navigation suivant', sourceFr: 'Suivant' },
  { id: 'btn_prev', key: 'button.previous', category: 'buttons', context: 'Bouton navigation précédent', sourceFr: 'Précédent' },
  { id: 'btn_submit', key: 'button.submit', category: 'buttons', context: 'Bouton soumission formulaire', sourceFr: 'Envoyer' },
  { id: 'btn_save', key: 'button.save', category: 'buttons', context: 'Bouton sauvegarder', sourceFr: 'Enregistrer' },
  { id: 'btn_cancel', key: 'button.cancel', category: 'buttons', context: 'Bouton annuler', sourceFr: 'Annuler' },
  
  // Labels
  { id: 'lbl_required', key: 'label.required', category: 'labels', context: 'Champ obligatoire', sourceFr: 'Obligatoire' },
  { id: 'lbl_optional', key: 'label.optional', category: 'labels', context: 'Champ optionnel', sourceFr: 'Optionnel' },
  { id: 'lbl_select', key: 'label.select', category: 'labels', context: 'Sélectionner', sourceFr: 'Sélectionnez...' },
  { id: 'lbl_search', key: 'label.search', category: 'labels', context: 'Rechercher', sourceFr: 'Rechercher' },
  
  // Messages
  { id: 'msg_error', key: 'message.error', category: 'messages', context: 'Message erreur générique', sourceFr: 'Une erreur est survenue' },
  { id: 'msg_success', key: 'message.success', category: 'messages', context: 'Message succès', sourceFr: 'Opération réussie !' },
  { id: 'msg_loading', key: 'message.loading', category: 'messages', context: 'Chargement en cours', sourceFr: 'Chargement...' },
  { id: 'msg_required_field', key: 'message.required_field', category: 'messages', context: 'Validation champ requis', sourceFr: 'Ce champ est obligatoire' },
  { id: 'msg_invalid_email', key: 'message.invalid_email', category: 'messages', context: 'Email invalide', sourceFr: 'Adresse email invalide' },
  { id: 'msg_thank_you', key: 'message.thank_you', category: 'messages', context: 'Message de remerciement', sourceFr: 'Merci pour votre participation !' },
  
  // Navigation
  { id: 'nav_section1', key: 'nav.section1', category: 'navigation', context: 'Section 1 titre', sourceFr: 'Profil agence' },
  { id: 'nav_section2', key: 'nav.section2', category: 'navigation', context: 'Section 2 titre', sourceFr: 'Détachement' },
  { id: 'nav_section3', key: 'nav.section3', category: 'navigation', context: 'Section 3 titre', sourceFr: 'Besoins' },
  { id: 'nav_section4', key: 'nav.section4', category: 'navigation', context: 'Section 4 titre', sourceFr: 'Intérêt' },
  { id: 'nav_section5', key: 'nav.section5', category: 'navigation', context: 'Section 5 titre', sourceFr: 'Vision' },
  { id: 'nav_section6', key: 'nav.section6', category: 'navigation', context: 'Section 6 titre', sourceFr: 'Contact' },
  { id: 'nav_progress', key: 'nav.progress', category: 'navigation', context: 'Barre progression', sourceFr: 'Progression' },
];

type TranslationStatus = 'missing' | 'auto-mcp' | 'auto-api' | 'validated';

interface Translation {
  text: string;
  status: TranslationStatus;
}

interface UITextTranslations {
  [textId: string]: {
    [langCode: string]: Translation;
  };
}

interface UITextTranslationProps {
  onBack: () => void;
}

export function UITextTranslation({ onBack }: UITextTranslationProps) {
  const { uiTextTranslations, saveUITextTranslation, loadAll } = useTranslationContext();
  
  const [activeCategory, setActiveCategory] = useState<UITextCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [editingText, setEditingText] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  // Load UI text translations on mount
  useEffect(() => {
    loadAll();
  }, [loadAll]);

  console.log('📝 UI Text Translations loaded:', uiTextTranslations.length);

  // Filter UI texts from context
  const filteredTexts = uiTextTranslations.filter((uiText) => {
    const matchesCategory = activeCategory === 'all' || uiText.category === activeCategory;
    const matchesSearch = !searchTerm || 
                         uiText.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uiText.textId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         Object.values(uiText.translations).some(t => 
                           t.text.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  const handleStartEdit = (textId: string) => {
    setEditingText(textId);
    const uiText = uiTextTranslations.find(t => t.textId === textId);
    const currentTranslation = uiText?.translations[selectedLanguage]?.text || '';
    setEditValue(currentTranslation);
  };

  const handleSaveEdit = async () => {
    if (!editingText) return;
    
    setSaving(true);
    try {
      const uiText = uiTextTranslations.find(t => t.textId === editingText);
      if (uiText) {
        await saveUITextTranslation(
          editingText,
          selectedLanguage,
          editValue,
          'validated',
          uiText.key,
          uiText.category
        );
        console.log(`✅ Saved UI text: ${editingText} (${selectedLanguage})`);
      }
      setEditingText(null);
      setEditValue('');
    } catch (error) {
      console.error('Error saving UI text:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingText(null);
    setEditValue('');
  };

  const handleGenerateTranslation = async (textId: string, method: 'mcp' | 'api') => {
    const uiText = uiTextTranslations.find(t => t.textId === textId);
    if (!uiText) return;
    
    const sourceText = uiText.translations.fr?.text || '';
    // TODO: Implement real translation via MCP or API
    const autoTranslated = `[${method.toUpperCase()}] ${sourceText}`;
    
    await saveUITextTranslation(
      textId,
      selectedLanguage,
      autoTranslated,
      method === 'mcp' ? 'auto-mcp' : 'auto-api',
      uiText.key,
      uiText.category
    );
    
    console.log(`✅ Generated translation for ${textId} using ${method}`);
  };

  const getStatusBadge = (status: TranslationStatus) => {
    switch (status) {
      case 'missing':
        return <Badge variant="outline" className="border-red-300 text-red-700 bg-red-50 text-xs">À traduire</Badge>;
      case 'auto-mcp':
        return <Badge className="border-violet-300 text-violet-700 bg-violet-50 border text-xs">Auto (MCP)</Badge>;
      case 'auto-api':
        return <Badge className="border-cyan-300 text-cyan-700 bg-cyan-50 border text-xs">Auto (API)</Badge>;
      case 'validated':
        return <Badge className="border-green-300 text-green-700 bg-green-50 border text-xs"><CheckCircle className="w-3 h-3 mr-1" />Validé</Badge>;
    }
  };

  const getCategoryIcon = (category: UITextCategory) => {
    switch (category) {
      case 'buttons': return Menu;
      case 'labels': return Type;
      case 'messages': return MessageSquare;
      case 'navigation': return FileText;
    }
  };

  const getCategoryColor = (category: UITextCategory) => {
    switch (category) {
      case 'buttons': return 'from-blue-500 to-cyan-500';
      case 'labels': return 'from-violet-500 to-purple-500';
      case 'messages': return 'from-green-500 to-emerald-500';
      case 'navigation': return 'from-orange-500 to-amber-500';
    }
  };

  const getStats = (category?: UITextCategory) => {
    const textsToCount = category 
      ? uiTextTranslations.filter(t => t.category === category) 
      : uiTextTranslations;
    
    let total = 0;
    let missing = 0;
    let validated = 0;

    textsToCount.forEach((text) => {
      LANGUAGES.slice(1).forEach((lang) => {
        total++;
        const translation = text.translations[lang.code];
        if (!translation || translation.status === 'missing' || !translation.text) {
          missing++;
        } else if (translation.status === 'validated') {
          validated++;
        }
      });
    });

    return { total, missing, validated, progress: total > 0 ? Math.round((validated / total) * 100) : 0 };
  };

  const globalStats = getStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-3 -ml-2 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Type className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900">Textes d'interface</h2>
            <p className="text-slate-600 text-sm">
              Traduisez tous les labels, boutons et messages de l'application
            </p>
          </div>
        </div>
      </div>

      {/* Global Progress */}
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-slate-600">Progression globale</p>
              <p className="text-slate-900">{globalStats.validated} / {globalStats.total} textes traduits</p>
            </div>
            <div className="text-right">
              <p className="text-slate-900">{globalStats.progress}%</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${globalStats.progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Language Selector */}
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-slate-600">Langue cible</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.slice(1).map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-600">Recherche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Texte ou clé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as UITextCategory)}>
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm p-1">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Tous</span>
            <Badge variant="secondary" className="ml-2 text-xs">{uiTextTranslations.length}</Badge>
          </TabsTrigger>
          {(['buttons', 'labels', 'messages', 'navigation', 'form', 'descriptions', 'headers', 'footer', 'validation', 'progress', 'main'] as const).map((cat) => {
            const textsInCat = uiTextTranslations.filter(t => t.category === cat);
            if (textsInCat.length === 0) return null;
            
            const Icon = getCategoryIcon(cat as UITextCategory) || FileText;
            const stats = getStats(cat as UITextCategory);
            return (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                <Badge variant="secondary" className="ml-2 text-xs">{textsInCat.length}</Badge>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Content for all categories */}
        {(['buttons', 'labels', 'messages', 'navigation'] as UITextCategory[]).map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-6">
            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900">
                  {filteredTexts.length} texte{filteredTexts.length > 1 ? 's' : ''}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2 p-4">
                    {filteredTexts.map((text, idx) => {
                      const translation = text.translations[selectedLanguage];
                      const sourceFr = text.translations.fr?.text || '';
                      const isEditing = editingText === text.textId;

                      return (
                        <motion.div
                          key={text.textId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02 }}
                        >
                          <Card className="border-slate-200 hover:shadow-md transition-all">
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge variant="outline" className="text-xs">{text.key}</Badge>
                                      {getStatusBadge(translation?.status || 'missing')}
                                    </div>
                                    <p className="text-sm text-slate-500">{text.category}</p>
                                  </div>
                                </div>

                                {/* Source (French) */}
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                  <Label className="text-xs text-blue-700 mb-1 block">🇫🇷 Source (Français)</Label>
                                  <p className="text-sm text-slate-900">{sourceFr}</p>
                                </div>

                                {/* Target Language */}
                                {isEditing ? (
                                  <div className="space-y-2">
                                    <Label className="text-xs text-slate-600">
                                      {LANGUAGES.find(l => l.code === selectedLanguage)?.flag} Traduction
                                    </Label>
                                    <Textarea
                                      value={editValue}
                                      onChange={(e) => setEditValue(e.target.value)}
                                      className="min-h-[80px]"
                                      autoFocus
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={handleSaveEdit}
                                        disabled={saving}
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                      >
                                        {saving ? <RefreshCw className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
                                        Enregistrer
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleCancelEdit}
                                        disabled={saving}
                                      >
                                        <X className="w-3 h-3 mr-2" />
                                        Annuler
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <Label className="text-xs text-slate-600 mb-1 block">
                                      {LANGUAGES.find(l => l.code === selectedLanguage)?.flag} Traduction
                                    </Label>
                                    {translation?.text ? (
                                      <p className="text-sm text-slate-900">{translation.text}</p>
                                    ) : (
                                      <p className="text-sm text-slate-400 italic">Non traduit</p>
                                    )}
                                    <div className="flex gap-2 mt-3">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleStartEdit(text.textId)}
                                      >
                                        <Edit2 className="w-3 h-3 mr-2" />
                                        Éditer
                                      </Button>
                                      {(!translation?.text || translation.status === 'missing') && (
                                        <>
                                          <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                                            onClick={() => handleGenerateTranslation(text.textId, 'mcp')}
                                          >
                                            <Sparkles className="w-3 h-3 mr-2" />
                                            MCP
                                          </Button>
                                          <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
                                            onClick={() => handleGenerateTranslation(text.textId, 'api')}
                                          >
                                            <RefreshCw className="w-3 h-3 mr-2" />
                                            API
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
