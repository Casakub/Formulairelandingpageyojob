import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft,
  Search, 
  Filter,
  Save,
  Check,
  AlertCircle,
  Globe,
  Edit2,
  X,
  RefreshCw,
  Download,
  ChevronDown,
  Languages,
  Sparkles,
  Copy,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useQuestions } from '../../context/QuestionsContext';
import { HorizontalScrollHint } from './HorizontalScrollHint';
import { TranslationKeyboardShortcuts } from './TranslationKeyboardShortcuts';
import { CharacterCounter } from './CharacterCounter';
import { QuickTranslationExport } from './QuickTranslationExport';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';

// Use all European languages (23 languages)
const LANGUAGES = EUROPEAN_LANGUAGES;

type TranslationStatus = 'missing' | 'auto-mcp' | 'auto-api' | 'validated';

interface Translation {
  text: string;
  status: TranslationStatus;
}

interface QuestionTranslations {
  [questionId: string]: {
    [langCode: string]: Translation;
  };
}

interface QuestionTranslationProps {
  onBack: () => void;
}

export function QuestionTranslation({ onBack }: QuestionTranslationProps) {
  const { questions } = useQuestions();
  const { questionTranslations, updateQuestionTranslation } = useTranslationContext();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [editingCell, setEditingCell] = useState<{ questionId: string; langCode: string } | null>(null);
  const [translations, setTranslations] = useState<QuestionTranslations>({});
  const [editValue, setEditValue] = useState('');
  const [generatingAll, setGeneratingAll] = useState(false);

  // Sync translations from context
  useEffect(() => {
    const syncedTranslations: QuestionTranslations = {};
    
    questions.forEach((q) => {
      const contextTranslation = questionTranslations.find(qt => qt.questionId === q.id);
      
      if (contextTranslation) {
        // Use translations from Supabase
        syncedTranslations[q.id] = contextTranslation.translations;
      } else {
        // Initialize with French as source
        syncedTranslations[q.id] = {
          fr: { text: q.label, status: 'validated' },
          // Initialize other languages as missing
          ...LANGUAGES.slice(1).reduce((acc, lang) => ({
            ...acc,
            [lang.code]: { text: '', status: 'missing' as TranslationStatus }
          }), {})
        };
      }
    });
    
    setTranslations(syncedTranslations);
  }, [questions, questionTranslations]);

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         q.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'all' || q.section.toString() === selectedSection;
    return matchesSearch && matchesSection;
  }).filter((q) => {
    if (selectedStatus === 'all' && selectedLanguage === 'all') return true;
    
    const qTranslations = translations[q.id] || {};
    
    if (selectedLanguage !== 'all') {
      const langTranslation = qTranslations[selectedLanguage];
      if (!langTranslation) return false;
      if (selectedStatus === 'all') return true;
      return langTranslation.status === selectedStatus;
    }
    
    return true;
  });

  const handleStartEdit = (questionId: string, langCode: string) => {
    if (langCode === 'fr') return; // Source language is read-only
    setEditingCell({ questionId, langCode });
    const currentTranslation = translations[questionId]?.[langCode]?.text || '';
    setEditValue(currentTranslation);
  };

  const handleSaveEdit = () => {
    if (!editingCell) return;
    
    // Update translation in context (will be synced to Supabase)
    updateQuestionTranslation(
      editingCell.questionId,
      editingCell.langCode,
      editValue,
      'validated'
    );
    
    // Update local state for immediate UI feedback
    setTranslations(prev => ({
      ...prev,
      [editingCell.questionId]: {
        ...prev[editingCell.questionId],
        [editingCell.langCode]: {
          text: editValue,
          status: 'validated'
        }
      }
    }));
    
    setEditingCell(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleGenerateTranslation = async (questionId: string, langCode: string, method: 'mcp' | 'api') => {
    const sourceText = translations[questionId]?.fr?.text || '';
    
    if (!sourceText) {
      toast.error('Pas de texte source', {
        description: 'Impossible de traduire sans texte français',
      });
      return;
    }

    try {
      // Load MCP settings if method is MCP
      let mcpSettings = {};
      if (method === 'mcp') {
        const settingsJson = localStorage.getItem('mcp_settings');
        mcpSettings = settingsJson ? JSON.parse(settingsJson) : {};
      }

      // Build context window (previous 5 translations for coherence)
      const contextWindow: Array<{ source: string; target: string }> = [];
      const allQuestions = Object.keys(translations);
      const currentIndex = allQuestions.indexOf(questionId);
      if (currentIndex > 0) {
        const prevQuestions = allQuestions.slice(Math.max(0, currentIndex - 5), currentIndex);
        prevQuestions.forEach(qId => {
          const sourceTxt = translations[qId]?.fr?.text;
          const targetTxt = translations[qId]?.[langCode]?.text;
          if (sourceTxt && targetTxt) {
            contextWindow.push({ source: sourceTxt, target: targetTxt });
          }
        });
      }

      console.log('🤖 Generating translation:', {
        questionId,
        langCode,
        method,
        contextSize: contextWindow.length,
      });

      // Import autoTranslate function
      const { autoTranslate } = await import('../../services/translationService');
      
      const result = await autoTranslate(
        sourceText,
        langCode,
        method,
        'fr',
        mcpSettings,
        contextWindow
      );

      // Update local state for immediate UI feedback
      setTranslations(prev => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          [langCode]: {
            text: result.translatedText,
            status: result.status
          }
        }
      }));

      // Update context for Supabase sync
      updateQuestionTranslation(
        questionId,
        langCode,
        result.translatedText,
        result.status
      );

      toast.success('Traduction générée !', {
        description: `${result.translatedText.substring(0, 60)}...`,
        duration: 3000,
      });

    } catch (error: any) {
      console.error('❌ Error generating translation:', error);
      
      let errorMessage = 'Erreur de génération';
      let errorDescription = error.message || 'Impossible de générer la traduction';

      if (error.message?.includes('ANTHROPIC_API_KEY')) {
        errorMessage = 'Clé API non configurée';
        errorDescription = 'Configurez ANTHROPIC_API_KEY dans Supabase';
      } else if (error.message?.includes('crédits') || error.message?.includes('credit balance')) {
        errorMessage = 'Crédits insuffisants';
        errorDescription = 'Rechargez votre compte Anthropic';
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000,
      });
    }
  };

  const handleGenerateAllMissing = async () => {
    setGeneratingAll(true);

    try {
      // Load MCP settings
      const settingsJson = localStorage.getItem('mcp_settings');
      const mcpSettings = settingsJson ? JSON.parse(settingsJson) : {};

      // Import autoTranslate
      const { autoTranslate } = await import('../../services/translationService');

      let generatedCount = 0;
      let errorCount = 0;

      // Find all missing translations
      const missingTranslations: Array<{ questionId: string; langCode: string; sourceText: string }> = [];
      
      questions.forEach((q) => {
        const sourceText = translations[q.id]?.fr?.text || '';
        if (!sourceText) return;

        LANGUAGES.forEach((lang) => {
          if (lang.code !== 'fr') {
            const current = translations[q.id][lang.code];
            if (!current?.text || current.status === 'missing') {
              missingTranslations.push({
                questionId: q.id,
                langCode: lang.code,
                sourceText,
              });
            }
          }
        });
      });

      toast.info(`Génération de ${missingTranslations.length} traductions...`, {
        description: 'Cette opération peut prendre quelques minutes',
        duration: 5000,
      });

      // Generate translations (with rate limiting to avoid API throttling)
      for (let i = 0; i < missingTranslations.length; i++) {
        const { questionId, langCode, sourceText } = missingTranslations[i];

        try {
          // Build context window
          const contextWindow: Array<{ source: string; target: string }> = [];
          const allQIds = Object.keys(translations);
          const currentIdx = allQIds.indexOf(questionId);
          if (currentIdx > 0) {
            const prevQIds = allQIds.slice(Math.max(0, currentIdx - 5), currentIdx);
            prevQIds.forEach(qId => {
              const srcTxt = translations[qId]?.fr?.text;
              const tgtTxt = translations[qId]?.[langCode]?.text;
              if (srcTxt && tgtTxt) {
                contextWindow.push({ source: srcTxt, target: tgtTxt });
              }
            });
          }

          const result = await autoTranslate(
            sourceText,
            langCode,
            'mcp',
            'fr',
            mcpSettings,
            contextWindow
          );

          // Update local state
          setTranslations(prev => ({
            ...prev,
            [questionId]: {
              ...prev[questionId],
              [langCode]: {
                text: result.translatedText,
                status: result.status
              }
            }
          }));

          // Update context for Supabase
          updateQuestionTranslation(
            questionId,
            langCode,
            result.translatedText,
            result.status
          );

          generatedCount++;

          // Rate limiting: Wait 500ms between requests to avoid throttling
          if (i < missingTranslations.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }

        } catch (error: any) {
          console.error(`❌ Error generating translation for ${questionId} (${langCode}):`, error);
          errorCount++;
        }
      }

      toast.success(`Génération terminée !`, {
        description: `${generatedCount} traductions générées${errorCount > 0 ? `, ${errorCount} erreurs` : ''}`,
        duration: 5000,
      });

    } catch (error: any) {
      console.error('❌ Error in batch generation:', error);
      toast.error('Erreur de génération', {
        description: error.message || 'Impossible de générer les traductions',
        duration: 5000,
      });
    } finally {
      setGeneratingAll(false);
    }
  };

  const getStatusBadge = (status: TranslationStatus) => {
    switch (status) {
      case 'missing':
        return <Badge variant="outline" className="border-red-300 text-red-700 bg-red-50">À traduire</Badge>;
      case 'auto-mcp':
        return <Badge className="border-violet-300 text-violet-700 bg-violet-50 border">Auto (MCP)</Badge>;
      case 'auto-api':
        return <Badge className="border-cyan-300 text-cyan-700 bg-cyan-50 border">Auto (API)</Badge>;
      case 'validated':
        return <Badge className="border-green-300 text-green-700 bg-green-50 border"><Check className="w-3 h-3 mr-1" />Validé</Badge>;
    }
  };

  const getStats = () => {
    let total = 0;
    let missing = 0;
    let autoMcp = 0;
    let autoApi = 0;
    let validated = 0;

    Object.values(translations).forEach((qTranslations) => {
      Object.entries(qTranslations).forEach(([lang, translation]) => {
        if (lang === 'fr') return; // Skip source language
        total++;
        switch (translation.status) {
          case 'missing': missing++; break;
          case 'auto-mcp': autoMcp++; break;
          case 'auto-api': autoApi++; break;
          case 'validated': validated++; break;
        }
      });
    });

    return { total, missing, autoMcp, autoApi, validated };
  };

  const stats = getStats();

  // Keyboard shortcuts handler
  const handleKeyboardShortcut = (action: string) => {
    switch (action) {
      case 'save':
        if (editingCell) {
          handleSaveEdit();
        }
        break;
      case 'search':
        searchInputRef.current?.focus();
        break;
      case 'cancel':
        if (editingCell) {
          handleCancelEdit();
        }
        break;
      case 'generate-mcp':
        if (editingCell) {
          handleGenerateTranslation(editingCell.questionId, editingCell.langCode, 'mcp');
        }
        break;
      case 'generate-api':
        if (editingCell) {
          handleGenerateTranslation(editingCell.questionId, editingCell.langCode, 'api');
        }
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Languages className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900">Traduction des questions</h2>
              <p className="text-slate-600 text-sm">
                Gérez les traductions de votre formulaire pour {LANGUAGES.length} langues
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerateAllMissing}
          disabled={generatingAll}
          className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg"
        >
          {generatingAll ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Génération...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Générer tout (MCP)
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-slate-500" />
              <p className="text-xs text-slate-600">Total</p>
            </div>
            <p className="text-slate-900">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-xs text-red-700">À traduire</p>
            </div>
            <p className="text-red-900">{stats.missing}</p>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-violet-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <p className="text-xs text-violet-700">Auto MCP</p>
            </div>
            <p className="text-violet-900">{stats.autoMcp}</p>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 bg-cyan-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <RefreshCw className="w-4 h-4 text-cyan-500" />
              <p className="text-xs text-cyan-700">Auto API</p>
            </div>
            <p className="text-cyan-900">{stats.autoApi}</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-xs text-green-700">Validés</p>
            </div>
            <p className="text-green-900">{stats.validated}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-slate-600">Recherche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  ref={searchInputRef}
                  placeholder="Question ou code... (Ctrl+K)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-600">Section</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les sections</SelectItem>
                  <SelectItem value="1">Section 1: Profil</SelectItem>
                  <SelectItem value="2">Section 2: Détachement</SelectItem>
                  <SelectItem value="3">Section 3: Besoins</SelectItem>
                  <SelectItem value="4">Section 4: Intérêt</SelectItem>
                  <SelectItem value="5">Section 5: Vision</SelectItem>
                  <SelectItem value="6">Section 6: Contact</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-600">Langue</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les langues</SelectItem>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-600">Statut</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="missing">À traduire</SelectItem>
                  <SelectItem value="auto-mcp">Auto (MCP)</SelectItem>
                  <SelectItem value="auto-api">Auto (API)</SelectItem>
                  <SelectItem value="validated">Validés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Table */}
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-900">
                {filteredQuestions.length} question{filteredQuestions.length > 1 ? 's' : ''}
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <span>↔️</span>
                <span>Défilez horizontalement pour voir toutes les langues</span>
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-slate-600">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Wrapper avec scroll horizontal ET vertical */}
          <div className="overflow-x-auto overflow-y-auto max-h-[600px] relative scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            <div className="min-w-max">
              {/* Table Header */}
              <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200">
                <div className="grid grid-cols-[200px_repeat(10,minmax(200px,1fr))] gap-px">
                  <div className="p-3 bg-slate-100 sticky left-0 z-20 shadow-[2px_0_8px_rgba(0,0,0,0.06)]">
                    <p className="text-xs text-slate-600">Question (FR - source)</p>
                  </div>
                  {LANGUAGES.slice(1).map((lang) => (
                    <div key={lang.code} className="p-3 bg-slate-100">
                      <p className="text-xs text-slate-600 flex items-center gap-1">
                        <span>{lang.flag}</span>
                        <span>{lang.code.toUpperCase()}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table Body */}
              {filteredQuestions.map((question, idx) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  className="grid grid-cols-[200px_repeat(10,minmax(200px,1fr))] gap-px border-b border-slate-100 hover:bg-slate-50/50"
                >
                  {/* Source Language (French) - Sticky Column */}
                  <div className="p-3 bg-blue-50/50 sticky left-0 z-10 border-r border-slate-200 shadow-[2px_0_8px_rgba(0,0,0,0.06)]">
                    <p className="text-sm text-slate-900 mb-1">{translations[question.id]?.fr?.text || question.label}</p>
                    <p className="text-xs text-slate-500">{question.code}</p>
                    <Badge variant="outline" className="mt-1 text-xs border-blue-300 text-blue-700">Source</Badge>
                  </div>

                  {/* Target Languages */}
                  {LANGUAGES.slice(1).map((lang) => {
                    const translation = translations[question.id]?.[lang.code];
                    const isEditing = editingCell?.questionId === question.id && editingCell?.langCode === lang.code;

                    return (
                      <div key={lang.code} className="p-3 relative group">
                        {isEditing ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="min-h-[80px] text-sm"
                              autoFocus
                            />
                            {/* Character Counter */}
                            <CharacterCounter
                              current={editValue.length}
                              max={500}
                              recommended={200}
                              sourceLength={translations[question.id]?.fr?.text?.length || 0}
                              showComparison={true}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={handleSaveEdit}
                                disabled={saving}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                              >
                                {saving ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                disabled={saving}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {translation?.text ? (
                              <div className="space-y-2">
                                <p className="text-sm text-slate-700 line-clamp-2">{translation.text}</p>
                                {getStatusBadge(translation.status)}
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400 italic">Non traduit</div>
                            )}

                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-white shadow-lg"
                                onClick={() => handleStartEdit(question.id, lang.code)}
                              >
                                <Edit2 className="w-3 h-3 mr-1" />
                                Éditer
                              </Button>
                              {(!translation?.text || translation.status === 'missing') && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg"
                                    onClick={() => handleGenerateTranslation(question.id, lang.code, 'mcp')}
                                  >
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    MCP
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg"
                                    onClick={() => handleGenerateTranslation(question.id, lang.code, 'api')}
                                  >
                                    <RefreshCw className="w-3 h-3 mr-1" />
                                    API
                                  </Button>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Shortcuts */}
      <TranslationKeyboardShortcuts onShortcut={handleKeyboardShortcut} />

      {/* Quick Export */}
      <QuickTranslationExport questionCount={questions.length} />

      {/* Horizontal Scroll Hint */}
      <HorizontalScrollHint />
    </motion.div>
  );
}
