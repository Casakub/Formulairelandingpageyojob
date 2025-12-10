/**
 * 🎯 QUESTION MANAGER V2 - Multi-Profils avec Onglets
 * 
 * Permet de gérer les questions pour les 3 types de profils :
 * - Agences ETT (26 questions)
 * - Clients/Entreprises (18 questions)
 * - Intérimaires (15 questions)
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Briefcase, 
  HardHat, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye,
  EyeOff,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  SURVEY_QUESTIONS, 
  getQuestionsByProfile, 
  getTotalQuestions,
  QUESTION_COUNT_BY_PROFILE,
  ESTIMATED_TIME_BY_PROFILE 
} from '../../config/survey-questions';
import type { QuestionConfig } from '../../config/survey-questions';
import type { RespondentType } from '../../types/survey';
import { QuestionEditModal } from './QuestionEditModal';
import { QuestionDeleteModal } from './QuestionDeleteModal';
import { toast } from 'sonner';

interface QuestionCardProps {
  question: QuestionConfig;
  onEdit: (question: QuestionConfig) => void;
  onDelete: (questionId: string) => void;
  onToggleVisibility: (questionId: string) => void;
  isHidden: boolean;
}

function QuestionCard({ question, onEdit, onDelete, onToggleVisibility, isHidden }: QuestionCardProps) {
  const sectionColors: Record<number, string> = {
    1: 'bg-blue-50 border-blue-200 text-blue-700',
    2: 'bg-green-50 border-green-200 text-green-700',
    3: 'bg-orange-50 border-orange-200 text-orange-700',
    4: 'bg-violet-50 border-violet-200 text-violet-700',
    5: 'bg-pink-50 border-pink-200 text-pink-700',
    6: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  };

  const typeIcons: Record<string, string> = {
    'text': '📝',
    'textarea': '📄',
    'radio': '⭕',
    'multi-select': '☑️',
    'number': '🔢',
    'email': '📧',
    'score': '⭐',
    'checkbox': '✅',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group"
    >
      <Card className={`border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all ${
        isHidden ? 'opacity-50 bg-slate-50/50' : ''
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Section Badge */}
            <div className="flex-shrink-0">
              <Badge variant="outline" className={`${sectionColors[question.section]} text-xs`}>
                Section {question.section}
              </Badge>
            </div>

            {/* Question Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{typeIcons[question.type]}</span>
                  <h4 className={`leading-tight ${isHidden ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                    {question.labelFallback}
                  </h4>
                  {question.required && (
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-xs">
                      Requis
                    </Badge>
                  )}
                  {isHidden && (
                    <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-300 text-xs">
                      👁️‍🗨️ Masquée
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(question)}
                    className="h-8 w-8 p-0 hover:bg-cyan-50 hover:text-cyan-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onToggleVisibility(question.id)}
                    className="h-8 w-8 p-0 hover:bg-violet-50 hover:text-violet-600"
                  >
                    {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(question.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600 flex-wrap">
                <span>ID: <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{question.id}</code></span>
                <span>Type: <strong>{question.type}</strong></span>
                <span>Champ: <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{question.fieldName}</code></span>
                {question.options && (
                  <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
                    {question.options.length} options
                  </Badge>
                )}
              </div>

              {question.conditional && (
                <div className="mt-2 text-xs text-slate-500 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  <strong>Conditionnel :</strong> Affiché si <code>{question.conditional.dependsOn}</code> = {Array.isArray(question.conditional.showWhen) ? question.conditional.showWhen.join(', ') : question.conditional.showWhen}
                </div>
              )}

              {question.placeholderFallback && (
                <div className="mt-2 text-xs text-slate-500">
                  <strong>Placeholder :</strong> {question.placeholderFallback}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function QuestionManagerV2() {
  const [selectedProfile, setSelectedProfile] = useState<RespondentType>('agency');
  const [editingQuestion, setEditingQuestion] = useState<QuestionConfig | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<QuestionConfig | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Track hidden questions (persisted in localStorage)
  const [hiddenQuestions, setHiddenQuestions] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hiddenQuestions');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    }
    return new Set();
  });

  // Get questions for selected profile
  const profileQuestions = useMemo(() => {
    return getQuestionsByProfile(selectedProfile);
  }, [selectedProfile]);

  // Group questions by section
  const questionsBySection = useMemo(() => {
    const grouped: Record<number, QuestionConfig[]> = {};
    profileQuestions.forEach(q => {
      if (!grouped[q.section]) grouped[q.section] = [];
      grouped[q.section].push(q);
    });
    // Sort questions within each section by order
    Object.keys(grouped).forEach(section => {
      grouped[Number(section)].sort((a, b) => a.order - b.order);
    });
    return grouped;
  }, [profileQuestions]);

  const sectionNames: Record<number, string> = {
    1: '📋 Profil',
    2: '💼 Expérience',
    3: '🎯 Besoins & Outils',
    4: '⭐ Intérêt Plateforme',
    5: '🔮 Vision Future',
    6: '📧 Contact',
  };

  const handleEdit = (question: QuestionConfig) => {
    setEditingQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleDelete = (questionId: string) => {
    const question = profileQuestions.find(q => q.id === questionId);
    if (question) {
      setEditingQuestion(question); // Store for delete modal
      setDeletingQuestion(question);
      setIsDeleteModalOpen(true);
    }
  };

  const handleToggleVisibility = (questionId: string) => {
    const newHiddenQuestions = new Set(hiddenQuestions);
    const isCurrentlyHidden = newHiddenQuestions.has(questionId);
    
    if (isCurrentlyHidden) {
      newHiddenQuestions.delete(questionId);
      toast.success(`✅ Question "${questionId}" réactivée`);
    } else {
      newHiddenQuestions.add(questionId);
      toast.info(`👁️‍🗨️ Question "${questionId}" masquée`);
    }
    
    setHiddenQuestions(newHiddenQuestions);
    localStorage.setItem('hiddenQuestions', JSON.stringify(Array.from(newHiddenQuestions)));
  };

  const handleAddQuestion = () => {
    toast.info('Fonctionnalité d\'ajout de question (à venir)');
    console.log('Add question for profile:', selectedProfile);
  };

  const handleSaveQuestion = (updatedQuestion: QuestionConfig) => {
    // TODO: Implement save to Supabase
    // For now, just show success message
    console.log('Saving question:', updatedQuestion);
    toast.success(`Question "${updatedQuestion.labelFallback}" mise à jour avec succès`);
    setEditingQuestion(null);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = (questionId: string) => {
    // TODO: Implement delete from Supabase
    // For now, just show success message
    console.log('Deleting question:', questionId);
    toast.success('Question supprimée avec succès');
    setDeletingQuestion(null);
    setEditingQuestion(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-slate-900 text-2xl mb-1">🎯 Gestion des Questions</h2>
          <div className="flex items-center gap-3">
            <p className="text-slate-600">Configurez les questions pour chaque type de profil</p>
            {hiddenQuestions.size > 0 && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
                {hiddenQuestions.size} masquée{hiddenQuestions.size > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
        <Button
          onClick={handleAddQuestion}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une question
        </Button>
      </div>

      {/* Profile Tabs */}
      <Tabs value={selectedProfile} onValueChange={(value) => setSelectedProfile(value as RespondentType)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-slate-100 rounded-xl">
          <TabsTrigger
            value="agency"
            className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span>Agences ETT</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {QUESTION_COUNT_BY_PROFILE.agency} questions
              </Badge>
              <span className="text-slate-500">{ESTIMATED_TIME_BY_PROFILE.agency}</span>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="client"
            className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all"
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span>Clients/Entreprises</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                {QUESTION_COUNT_BY_PROFILE.client} questions
              </Badge>
              <span className="text-slate-500">{ESTIMATED_TIME_BY_PROFILE.client}</span>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="worker"
            className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all"
          >
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5" />
              <span>Intérimaires</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {QUESTION_COUNT_BY_PROFILE.worker} questions
              </Badge>
              <span className="text-slate-500">{ESTIMATED_TIME_BY_PROFILE.worker}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content for each profile */}
        {(['agency', 'client', 'worker'] as RespondentType[]).map(profile => (
          <TabsContent key={profile} value={profile} className="mt-6 space-y-6">
            {/* Summary Card */}
            <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200">
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl text-slate-900">{profileQuestions.length}</div>
                      <div className="text-sm text-slate-600">Questions totales</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl text-slate-900">{profileQuestions.filter(q => q.required).length}</div>
                      <div className="text-sm text-slate-600">Questions requises</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-violet-100 rounded-lg">
                      <Eye className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-2xl text-slate-900">{Object.keys(questionsBySection).length}</div>
                      <div className="text-sm text-slate-600">Sections</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions by Section */}
            {Object.entries(questionsBySection)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([sectionNum, questions]) => (
                <div key={sectionNum} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-slate-900 text-lg">{sectionNames[Number(sectionNum)]}</h3>
                      <Badge variant="outline" className="bg-slate-100 text-slate-700">
                        {questions.length} question{questions.length > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {questions.map(question => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleVisibility={handleToggleVisibility}
                        isHidden={hiddenQuestions.has(question.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}

            {/* Empty State */}
            {profileQuestions.length === 0 && (
              <Card className="bg-white border-slate-200">
                <CardContent className="p-12 text-center">
                  <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-slate-900 mb-2">Aucune question pour ce profil</h3>
                  <p className="text-slate-600 mb-4">
                    Ajoutez votre première question pour commencer
                  </p>
                  <Button onClick={handleAddQuestion} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une question
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-blue-900 mb-1">💡 Astuce de configuration</h4>
              <p className="text-blue-700 text-sm">
                Les questions sont stockées dans <code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">/config/survey-questions.ts</code>. 
                Chaque question possède un champ <strong>visibleFor</strong> qui détermine pour quel(s) profil(s) elle apparaît. 
                Les modifications ici seront synchronisées avec le système de traductions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && editingQuestion && (
        <QuestionEditModal
          question={editingQuestion}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingQuestion(null);
          }}
          onSave={handleSaveQuestion}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && deletingQuestion && (
        <QuestionDeleteModal
          question={deletingQuestion}
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingQuestion(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}