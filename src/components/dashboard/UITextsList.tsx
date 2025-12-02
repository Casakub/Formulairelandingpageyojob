import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Edit2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';

interface UITextsListProps {
  onBack: () => void;
}

export function UITextsList({ onBack }: UITextsListProps) {
  const { uiTextTranslations, saveUITextTranslation, loadAll, loading } = useTranslationContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    console.log('🔄 Loading UI text translations...');
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    console.log(`📝 UI texts loaded: ${uiTextTranslations.length}`);
    console.log('Sample UI texts:', uiTextTranslations.slice(0, 3));
  }, [uiTextTranslations]);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(uiTextTranslations.map(t => t.category)))];

  // Filter texts
  const filteredTexts = uiTextTranslations.filter(text => {
    const matchesCategory = categoryFilter === 'all' || text.category === categoryFilter;
    const matchesSearch = !searchTerm || 
      text.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.textId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(text.translations).some(t => t.text.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleEdit = (textId: string) => {
    const text = uiTextTranslations.find(t => t.textId === textId);
    if (text) {
      setEditingTextId(textId);
      setEditValue(text.translations[selectedLanguage]?.text || '');
    }
  };

  const handleSave = async () => {
    if (!editingTextId) return;
    
    setSaving(true);
    try {
      const text = uiTextTranslations.find(t => t.textId === editingTextId);
      if (text) {
        await saveUITextTranslation(
          editingTextId,
          selectedLanguage,
          editValue,
          'validated',
          text.key,
          text.category
        );
        console.log(`✅ Saved: ${editingTextId}`);
      }
      setEditingTextId(null);
      setEditValue('');
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status || status === 'missing') {
      return <Badge variant="outline" className="text-xs border-red-300 text-red-700">À traduire</Badge>;
    }
    if (status === 'validated') {
      return <Badge className="text-xs bg-green-50 text-green-700 border border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Validé</Badge>;
    }
    return <Badge className="text-xs bg-blue-50 text-blue-700">{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        <span className="ml-3 text-slate-600">Chargement des textes UI...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <Edit2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900">Textes d'interface</h2>
            <p className="text-sm text-slate-500">{uiTextTranslations.length} textes UI chargés</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-600">Rechercher</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher par clé ou texte..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-600">Catégorie</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'Toutes' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-600">Langue cible</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EUROPEAN_LANGUAGES.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">
            {filteredTexts.length} texte{filteredTexts.length > 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredTexts.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Aucun texte trouvé</p>
              <p className="text-sm mt-2">Importez vos traductions depuis l'onglet Import/Export</p>
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 p-4">
                {filteredTexts.map((text, idx) => {
                  const sourceFr = text.translations.fr?.text || '';
                  const targetTranslation = text.translations[selectedLanguage];
                  const isEditing = editingTextId === text.textId;

                  return (
                    <motion.div
                      key={text.textId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.01 }}
                    >
                      <Card className="border-slate-200 hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{text.key}</Badge>
                              <Badge className="text-xs bg-slate-100 text-slate-700">{text.category}</Badge>
                              {getStatusBadge(targetTranslation?.status)}
                            </div>
                          </div>

                          {/* Source */}
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-3">
                            <div className="text-xs text-blue-700 mb-1">🇫🇷 Français (source)</div>
                            <div className="text-sm text-slate-900">{sourceFr || <span className="text-slate-400 italic">Pas de source</span>}</div>
                          </div>

                          {/* Target */}
                          <div className={`p-3 rounded-lg border ${isEditing ? 'bg-white border-cyan-200' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="text-xs text-slate-600 mb-1">
                              {EUROPEAN_LANGUAGES.find(l => l.code === selectedLanguage)?.flag} {EUROPEAN_LANGUAGES.find(l => l.code === selectedLanguage)?.name}
                            </div>
                            
                            {isEditing ? (
                              <div className="space-y-3">
                                <Textarea
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="min-h-[80px]"
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                  >
                                    {saving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <CheckCircle className="w-3 h-3 mr-2" />}
                                    Enregistrer
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingTextId(null)}
                                    disabled={saving}
                                  >
                                    Annuler
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="text-sm text-slate-900 mb-3">
                                  {targetTranslation?.text || <span className="text-slate-400 italic">Non traduit</span>}
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(text.textId)}
                                >
                                  <Edit2 className="w-3 h-3 mr-2" />
                                  Éditer
                                </Button>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
