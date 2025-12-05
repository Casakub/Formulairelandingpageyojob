import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Eye, RotateCcw, Check, AlertCircle, Navigation, Clock, Loader2, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { getTranslationsByCategory, updateTranslation, type Translation } from '../../lib/i18n-api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { HistoryViewer } from './HistoryViewer';
import { RestorePreviousModal } from './RestorePreviousModal';
import { SplitScreenPreview } from './SplitScreenPreview';
import type { HistoryEntry } from '../../lib/history-api';

// Liste des 23 langues avec drapeaux
const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' }
];

// Clés des textes Progress avec descriptions
const PROGRESS_TEXT_IDS = [
  { id: 'progress.of', label: 'Séparateur "sur" (ex: "2 sur 6")', icon: '➗' },
  { id: 'progress.questions', label: 'Label "questions"', icon: '❓' },
  { id: 'progress.back', label: 'Bouton "Retour"', icon: '⬅️' },
  { id: 'progress.next', label: 'Bouton "Suivant"', icon: '➡️' },
  { id: 'section.1.title', label: 'Section 1 : Titre', icon: '👤' },
  { id: 'section.2.title', label: 'Section 2 : Titre', icon: '🌍' },
  { id: 'section.3.title', label: 'Section 3 : Titre', icon: '💼' },
  { id: 'section.4.title', label: 'Section 4 : Titre', icon: '⭐' },
  { id: 'section.5.title', label: 'Section 5 : Titre', icon: '🔮' },
  { id: 'section.6.title', label: 'Section 6 : Titre', icon: '📧' }
];

export function ProgressContentEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [editedTexts, setEditedTexts] = useState<Record<string, Record<string, string>>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedTextId, setSelectedTextId] = useState<string>('section.1.title');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedLanguageForRestore, setSelectedLanguageForRestore] = useState<string>('fr');
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [previewLanguage, setPreviewLanguage] = useState<string>('fr');

  // Charger les traductions Progress depuis Supabase
  useEffect(() => {
    loadTranslations();
  }, []);

  async function loadTranslations() {
    setLoading(true);
    try {
      const data = await getTranslationsByCategory('progress');
      setTranslations(data);
      
      // Initialiser editedTexts avec les données existantes
      const initial: Record<string, Record<string, string>> = {};
      data.forEach((t) => {
        if (!initial[t.text_id]) {
          initial[t.text_id] = {};
        }
        initial[t.text_id][t.language_code] = t.text_content;
      });
      setEditedTexts(initial);
    } catch (error) {
      console.error('Erreur chargement traductions:', error);
      toast.error('Erreur lors du chargement des traductions');
    } finally {
      setLoading(false);
    }
  }

  // Gérer les modifications de texte
  function handleTextChange(textId: string, languageCode: string, value: string) {
    setEditedTexts(prev => ({
      ...prev,
      [textId]: {
        ...(prev[textId] || {}),
        [languageCode]: value
      }
    }));
    setHasChanges(true);
  }

  // Sauvegarder toutes les modifications
  async function handleSave() {
    setSaving(true);
    try {
      let updateCount = 0;
      
      // Parcourir toutes les modifications
      for (const [textId, languages] of Object.entries(editedTexts)) {
        for (const [languageCode, textContent] of Object.entries(languages)) {
          // Vérifier si le texte a changé
          const original = translations.find(
            t => t.text_id === textId && t.language_code === languageCode
          );
          
          if (original && original.text_content !== textContent) {
            // Appeler updateTranslation avec l'ancien contenu pour l'historique
            await updateTranslation(
              textId,
              languageCode,
              textContent,
              original.text_content,  // oldContent pour l'historique
              'progress'              // category pour l'historique
            );
            updateCount++;
          }
        }
      }

      if (updateCount > 0) {
        setLastSaved(new Date());
        setHasChanges(false);
        toast.success(`✅ ${updateCount} traduction${updateCount > 1 ? 's' : ''} mise${updateCount > 1 ? 's' : ''} à jour !`);
        
        // Recharger les données pour confirmer
        await loadTranslations();
      } else {
        toast.info('Aucune modification à sauvegarder');
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  // Restaurer une version depuis l'historique
  function handleRestoreFromHistory(entry: HistoryEntry) {
    setEditedTexts(prev => ({
      ...prev,
      [entry.text_id]: {
        ...(prev[entry.text_id] || {}),
        [entry.language_code]: entry.old_content
      }
    }));
    setHasChanges(true);
    toast.success(`Version restaurée pour ${entry.text_id} (${entry.language_code.toUpperCase()})`);
  }

  // Restaurer la version précédente depuis la modal
  function handleRestorePrevious(oldContent: string, historyEntry: HistoryEntry) {
    setEditedTexts(prev => ({
      ...prev,
      [selectedTextId]: {
        ...(prev[selectedTextId] || {}),
        [selectedLanguageForRestore]: oldContent
      }
    }));
    setHasChanges(true);
  }

  // Annuler les modifications
  function handleCancel() {
    loadTranslations();
    setHasChanges(false);
    toast.info('Modifications annulées');
  }

  // Prévisualiser (ouvre la page principale dans un nouvel onglet)
  function handlePreview() {
    window.open('/', '_blank');
    toast.info('Prévisualisation ouverte dans un nouvel onglet');
  }

  if (loading) {
    return (
      <Card className="bg-white border-slate-200 shadow-md">
        <CardContent className="p-12 text-center">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement des traductions...</p>
        </CardContent>
      </Card>
    );
  }

  const currentTextData = PROGRESS_TEXT_IDS.find(t => t.id === selectedTextId);

  return (
    <div className="space-y-6">
      {/* Header avec actions */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 font-semibold">Progression & Sections - 10 textes × 23 langues</h3>
                <div className="flex items-center gap-3 mt-1">
                  {lastSaved && (
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>Dernière sauvegarde : {lastSaved.toLocaleTimeString('fr-FR')}</span>
                    </div>
                  )}
                  {hasChanges && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                      Modifications non sauvegardées
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  setShowSplitScreen(!showSplitScreen);
                  if (!showSplitScreen) {
                    toast.success('Mode split-screen activé');
                  }
                }}
                variant={showSplitScreen ? 'default' : 'outline'}
                size="sm"
                className={`flex items-center gap-2 ${
                  showSplitScreen 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                    : ''
                }`}
              >
                <Monitor className="w-4 h-4" />
                Split-screen
              </Button>

              <Button
                onClick={handlePreview}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Prévisualiser
              </Button>

              {hasChanges && (
                <>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Annuler
                  </Button>

                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sélection du texte à éditer */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-slate-900">Sélectionnez le texte à modifier</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Groupe : Barre de progression */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center text-xs">📊</span>
                Barre de progression
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {PROGRESS_TEXT_IDS.filter(t => t.id.startsWith('progress.')).map((text) => (
                  <motion.button
                    key={text.id}
                    onClick={() => setSelectedTextId(text.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTextId === text.id
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{text.icon}</span>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          selectedTextId === text.id ? 'text-green-900' : 'text-slate-900'
                        }`}>
                          {text.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{text.id}</div>
                      </div>
                      {selectedTextId === text.id && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Groupe : Sections */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-violet-100 flex items-center justify-center text-xs">📑</span>
                Titres des sections
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {PROGRESS_TEXT_IDS.filter(t => t.id.startsWith('section.')).map((text) => (
                  <motion.button
                    key={text.id}
                    onClick={() => setSelectedTextId(text.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTextId === text.id
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{text.icon}</span>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          selectedTextId === text.id ? 'text-green-900' : 'text-slate-900'
                        }`}>
                          {text.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{text.id}</div>
                      </div>
                      {selectedTextId === text.id && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Éditeur des traductions */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <span className="text-2xl">{currentTextData?.icon}</span>
              {currentTextData?.label}
            </CardTitle>
            <Badge className="bg-slate-100 text-slate-700">
              {selectedTextId}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="main" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="main">
                Principales
              </TabsTrigger>
              <TabsTrigger value="north">
                Europe du Nord
              </TabsTrigger>
              <TabsTrigger value="east">
                Europe de l'Est
              </TabsTrigger>
            </TabsList>

            {/* Langues principales */}
            <TabsContent value="main" className="space-y-4">
              {['fr', 'en', 'de', 'es', 'it', 'pt'].map((langCode) => {
                const lang = LANGUAGES.find(l => l.code === langCode);
                if (!lang) return null;
                
                return (
                  <div key={langCode} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Label>
                    <Input
                      value={editedTexts[selectedTextId]?.[langCode] || ''}
                      onChange={(e) => handleTextChange(selectedTextId, langCode, e.target.value)}
                      placeholder={`Texte en ${lang.name}...`}
                      className="text-base"
                    />
                  </div>
                );
              })}
            </TabsContent>

            {/* Europe du Nord */}
            <TabsContent value="north" className="space-y-4">
              {['nl', 'sv', 'da', 'fi', 'no'].map((langCode) => {
                const lang = LANGUAGES.find(l => l.code === langCode);
                if (!lang) return null;
                
                return (
                  <div key={langCode} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Label>
                    <Input
                      value={editedTexts[selectedTextId]?.[langCode] || ''}
                      onChange={(e) => handleTextChange(selectedTextId, langCode, e.target.value)}
                      placeholder={`Texte en ${lang.name}...`}
                      className="text-base"
                    />
                  </div>
                );
              })}
            </TabsContent>

            {/* Europe de l'Est */}
            <TabsContent value="east" className="space-y-4">
              {['pl', 'ro', 'bg', 'hu', 'cs', 'sk', 'el', 'hr', 'sl', 'lt', 'lv', 'et'].map((langCode) => {
                const lang = LANGUAGES.find(l => l.code === langCode);
                if (!lang) return null;
                
                return (
                  <div key={langCode} className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Label>
                    <Input
                      value={editedTexts[selectedTextId]?.[langCode] || ''}
                      onChange={(e) => handleTextChange(selectedTextId, langCode, e.target.value)}
                      placeholder={`Texte en ${lang.name}...`}
                      className="text-base"
                    />
                  </div>
                );
              })}
            </TabsContent>
          </Tabs>

          {/* Info validation */}
          <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm text-green-900">
                <strong>Conseil :</strong> Ces textes apparaissent dans la barre de progression et les titres de sections.
                Assurez-vous que toutes les 23 langues sont remplies pour une expérience cohérente.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique des modifications */}
      <Card className="bg-white border-slate-200 shadow-md">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-slate-900">Historique des modifications</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <HistoryViewer category="progress" onRestore={handleRestoreFromHistory} />
        </CardContent>
      </Card>

      {/* Modal de restauration rapide */}
      <RestorePreviousModal
        isOpen={showRestoreModal}
        onClose={() => setShowRestoreModal(false)}
        textId={selectedTextId}
        languageCode={selectedLanguageForRestore}
        currentContent={editedTexts[selectedTextId]?.[selectedLanguageForRestore] || ''}
        category="progress"
        onRestore={handleRestorePrevious}
      />

      {/* Split-screen preview */}
      <SplitScreenPreview
        isOpen={showSplitScreen}
        onClose={() => setShowSplitScreen(false)}
        selectedLanguage={previewLanguage}
      />
    </div>
  );
}