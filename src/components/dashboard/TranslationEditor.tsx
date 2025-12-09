import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Save,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  MessageSquare,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import type { LanguageCode } from '../../types/landingContent';
import type {
  LanguageTranslationMeta,
  TranslationKeyMeta,
  TranslationWorkflowStatus,
  ContentFieldType,
} from '../../types/translationWorkflow';
import { landingContent } from '../../content/landing';
import { useAITranslation, estimateTranslationCost } from '../../services/aiTranslationService';

/**
 * 🌍 Translation Editor - Éditeur de traduction en deux colonnes
 * Colonne gauche : Source (FR) - Lecture seule
 * Colonne droite : Cible - Éditable
 */

interface TranslationEditorProps {
  targetLang: LanguageCode;
  translationMeta: LanguageTranslationMeta;
  onClose: () => void;
  onSave: (meta: LanguageTranslationMeta) => void;
  onTranslateWithAI?: () => void;
}

export function TranslationEditor({
  targetLang,
  translationMeta,
  onClose,
  onSave,
  onTranslateWithAI,
}: TranslationEditorProps) {
  const [localMeta, setLocalMeta] = useState<LanguageTranslationMeta>(translationMeta);
  const [activeKeyPath, setActiveKeyPath] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<TranslationWorkflowStatus | 'ALL'>('ALL');
  const [filterFieldType, setFilterFieldType] = useState<ContentFieldType | 'ALL'>('ALL');
  const [showSourceColumn, setShowSourceColumn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { translateContent } = useAITranslation();

  const sourceContent = landingContent.fr;
  const targetContent = landingContent[targetLang];

  // Filtrer les clés selon les critères
  const filteredKeys = Object.values(localMeta.keys).filter(keyMeta => {
    if (filterStatus !== 'ALL' && keyMeta.status !== filterStatus) return false;
    if (filterFieldType !== 'ALL' && keyMeta.fieldType !== filterFieldType) return false;
    if (searchQuery && !keyMeta.keyPath.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Grouper les clés par section
  const keysBySection = filteredKeys.reduce((acc, keyMeta) => {
    const section = keyMeta.keyPath.split('.')[0];
    if (!acc[section]) acc[section] = [];
    acc[section].push(keyMeta);
    return acc;
  }, {} as Record<string, TranslationKeyMeta[]>);

  // Mettre à jour une clé
  const updateKeyMeta = (keyPath: string, updates: Partial<TranslationKeyMeta>) => {
    setLocalMeta(prev => ({
      ...prev,
      keys: {
        ...prev.keys,
        [keyPath]: {
          ...prev.keys[keyPath],
          ...updates,
          lastModified: new Date().toISOString(),
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  // Changer le statut d'une clé
  const changeKeyStatus = (keyPath: string, newStatus: TranslationWorkflowStatus) => {
    updateKeyMeta(keyPath, { status: newStatus });
  };

  // Copier le texte source dans la cible
  const copySourceToTarget = (keyPath: string) => {
    const keyMeta = localMeta.keys[keyPath];
    updateKeyMeta(keyPath, {
      targetText: keyMeta.sourceText,
      status: 'IN_REVIEW',
    });
  };

  // Sauvegarder
  const handleSave = () => {
    // Recalculer les statistiques
    const validatedKeys = Object.values(localMeta.keys).filter(k => k.status === 'VALIDATED').length;
    const aiProposedKeys = Object.values(localMeta.keys).filter(k => k.status === 'AI_PROPOSED').length;
    const inReviewKeys = Object.values(localMeta.keys).filter(k => k.status === 'IN_REVIEW').length;
    const notStartedKeys = Object.values(localMeta.keys).filter(k => k.status === 'NOT_STARTED').length;

    const updatedMeta: LanguageTranslationMeta = {
      ...localMeta,
      validatedKeys,
      aiProposedKeys,
      inReviewKeys,
      notStartedKeys,
      completionPercentage: Math.round((validatedKeys / localMeta.totalKeys) * 100),
      lastUpdated: new Date().toISOString(),
    };

    onSave(updatedMeta);
    setHasUnsavedChanges(false);
  };

  // Badges de statut
  const statusBadges: Record<TranslationWorkflowStatus, { color: string; icon: any }> = {
    NOT_STARTED: { color: 'bg-gray-500/20 text-gray-300 border-gray-400/30', icon: AlertTriangle },
    AI_PROPOSED: { color: 'bg-purple-500/20 text-purple-300 border-purple-400/30', icon: Sparkles },
    IN_REVIEW: { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30', icon: Eye },
    VALIDATED: { color: 'bg-green-500/20 text-green-300 border-green-400/30', icon: Check },
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 overflow-auto">
      <div className="container mx-auto p-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div>
                <h2 className="text-white text-2xl">
                  Éditeur de traduction - {translationMeta.languageCode.toUpperCase()}
                </h2>
                <p className="text-cyan-200">
                  {localMeta.validatedKeys} / {localMeta.totalKeys} clés validées (
                  {localMeta.completionPercentage}%)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Modifications non sauvegardées
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSourceColumn(!showSourceColumn)}
                className="bg-white/10 text-white border-white/20"
              >
                {showSourceColumn ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showSourceColumn ? 'Masquer source' : 'Afficher source'}
              </Button>
              {onTranslateWithAI && (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white"
                  onClick={onTranslateWithAI}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Traduire tout avec l'IA
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className="bg-white text-blue-900 hover:bg-cyan-50"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <Progress value={localMeta.completionPercentage} className="h-2 bg-white/10" />

          {/* Filtres */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10 mt-4">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-white text-sm mb-2 block">Rechercher</Label>
                  <Input
                    placeholder="Nom de clé..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/10 text-white border-white/20"
                  />
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">Filtrer par statut</Label>
                  <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)}>
                    <SelectTrigger className="bg-white/10 text-white border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Tous les statuts</SelectItem>
                      <SelectItem value="NOT_STARTED">Non traduit</SelectItem>
                      <SelectItem value="AI_PROPOSED">Proposition IA</SelectItem>
                      <SelectItem value="IN_REVIEW">En révision</SelectItem>
                      <SelectItem value="VALIDATED">Validé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">Filtrer par type</Label>
                  <Select value={filterFieldType} onValueChange={(v) => setFilterFieldType(v as any)}>
                    <SelectTrigger className="bg-white/10 text-white border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Tous les types</SelectItem>
                      <SelectItem value="title">Titres</SelectItem>
                      <SelectItem value="subtitle">Sous-titres</SelectItem>
                      <SelectItem value="cta">CTAs</SelectItem>
                      <SelectItem value="meta">Meta tags</SelectItem>
                      <SelectItem value="paragraph">Paragraphes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                    {filteredKeys.length} clés affichées
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Éditeur deux colonnes */}
        <div className="space-y-6">
          {Object.entries(keysBySection).map(([section, keys]) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white capitalize">{section}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {keys.map((keyMeta) => (
                    <TranslationKeyRow
                      key={keyMeta.keyPath}
                      keyMeta={keyMeta}
                      showSource={showSourceColumn}
                      onUpdate={(updates) => updateKeyMeta(keyMeta.keyPath, updates)}
                      onChangeStatus={(status) => changeKeyStatus(keyMeta.keyPath, status)}
                      onCopySource={() => copySourceToTarget(keyMeta.keyPath)}
                      statusBadges={statusBadges}
                    />
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredKeys.length === 0 && (
          <Card className="bg-white/5 backdrop-blur-md border-white/10 mt-6">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-white text-lg">Aucune clé ne correspond aux filtres</p>
              <p className="text-cyan-200">Essayez de changer les filtres ci-dessus</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

/**
 * Ligne de traduction (une clé)
 */
interface TranslationKeyRowProps {
  keyMeta: TranslationKeyMeta;
  showSource: boolean;
  onUpdate: (updates: Partial<TranslationKeyMeta>) => void;
  onChangeStatus: (status: TranslationWorkflowStatus) => void;
  onCopySource: () => void;
  statusBadges: Record<TranslationWorkflowStatus, { color: string; icon: any }>;
}

function TranslationKeyRow({
  keyMeta,
  showSource,
  onUpdate,
  onChangeStatus,
  onCopySource,
  statusBadges,
}: TranslationKeyRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localText, setLocalText] = useState(keyMeta.targetText);
  const [showNotes, setShowNotes] = useState(false);

  const StatusIcon = statusBadges[keyMeta.status].icon;
  const isTextarea = ['paragraph', 'faq_answer', 'meta'].includes(keyMeta.fieldType);
  const currentLength = localText.length;
  const isOverLimit = keyMeta.characterLimit && currentLength > keyMeta.characterLimit;

  const handleTextChange = (newText: string) => {
    setLocalText(newText);
    onUpdate({ targetText: newText });
  };

  return (
    <div className="border border-white/10 rounded-lg p-4 bg-white/5">
      {/* Header de la clé */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <Badge className={statusBadges[keyMeta.status].color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {keyMeta.status}
          </Badge>
          <code className="text-xs text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded">
            {keyMeta.keyPath}
          </code>
          <Badge variant="outline" className="text-xs text-white border-white/20">
            {keyMeta.fieldType}
          </Badge>
          {keyMeta.characterLimit && (
            <span className={`text-xs ${isOverLimit ? 'text-red-400' : 'text-cyan-300'}`}>
              {currentLength} / {keyMeta.characterLimit}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopySource}
            className="h-8 text-xs text-white hover:bg-white/10"
          >
            <Copy className="w-3 h-3 mr-1" />
            Copier source
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className="h-8 text-xs text-white hover:bg-white/10"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Notes
          </Button>
        </div>
      </div>

      {/* Contenu deux colonnes */}
      <div className={`grid ${showSource ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {/* Source (FR) */}
        {showSource && (
          <div>
            <Label className="text-xs text-cyan-300 mb-2 block">Source (FR) - Lecture seule</Label>
            {isTextarea ? (
              <Textarea
                value={keyMeta.sourceText}
                readOnly
                className="bg-white/5 text-white/70 border-white/10 cursor-not-allowed resize-none"
                rows={3}
              />
            ) : (
              <Input
                value={keyMeta.sourceText}
                readOnly
                className="bg-white/5 text-white/70 border-white/10 cursor-not-allowed"
              />
            )}
          </div>
        )}

        {/* Target (langue cible) */}
        <div>
          <Label className="text-xs text-white mb-2 block">Traduction - Éditable</Label>
          {isTextarea ? (
            <Textarea
              value={localText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="bg-white/10 text-white border-white/20"
              rows={3}
              placeholder="Entrez la traduction..."
            />
          ) : (
            <Input
              value={localText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="bg-white/10 text-white border-white/20"
              placeholder="Entrez la traduction..."
            />
          )}
          {isOverLimit && (
            <p className="text-xs text-red-400 mt-1">
              ⚠️ Texte trop long ({currentLength - keyMeta.characterLimit!} caractères en trop)
            </p>
          )}
        </div>
      </div>

      {/* Proposition IA si disponible */}
      {keyMeta.aiProposedText && (
        <div className="mt-3 p-3 bg-purple-500/10 border border-purple-400/30 rounded">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs text-purple-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Proposition IA
            </Label>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleTextChange(keyMeta.aiProposedText!)}
              className="h-6 text-xs text-purple-300 hover:bg-purple-500/20"
            >
              Utiliser cette traduction
            </Button>
          </div>
          <p className="text-sm text-purple-200">{keyMeta.aiProposedText}</p>
        </div>
      )}

      {/* Notes de révision */}
      {showNotes && (
        <div className="mt-3">
          <Label className="text-xs text-white mb-2 block">Notes de révision</Label>
          <Textarea
            value={keyMeta.reviewNotes || ''}
            onChange={(e) => onUpdate({ reviewNotes: e.target.value })}
            className="bg-white/10 text-white border-white/20"
            rows={2}
            placeholder="Ajoutez des notes pour cette traduction..."
          />
        </div>
      )}

      {/* Actions de statut */}
      <div className="mt-3 flex items-center gap-2">
        <Label className="text-xs text-white">Changer le statut :</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChangeStatus('IN_REVIEW')}
          disabled={keyMeta.status === 'IN_REVIEW'}
          className="h-7 text-xs bg-yellow-500/10 text-yellow-300 border-yellow-400/30 hover:bg-yellow-500/20"
        >
          En révision
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onChangeStatus('VALIDATED')}
          disabled={keyMeta.status === 'VALIDATED' || !localText}
          className="h-7 text-xs bg-green-500/10 text-green-300 border-green-400/30 hover:bg-green-500/20"
        >
          <Check className="w-3 h-3 mr-1" />
          Valider
        </Button>
      </div>
    </div>
  );
}