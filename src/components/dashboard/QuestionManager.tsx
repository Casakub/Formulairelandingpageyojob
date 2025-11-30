import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  GripVertical,
  Eye,
  EyeOff,
  Copy
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useQuestions } from '../../context/QuestionsContext';
import { Question } from '../../config/questions';
import { QuestionStats } from './QuestionStats';
import { SortableQuestion } from './SortableQuestion';
import { AdvancedSearch } from './AdvancedSearch';
import { LivePreview } from './LivePreview';

export function QuestionManager() {
  const { 
    questions, 
    addQuestion, 
    updateQuestion, 
    deleteQuestion, 
    toggleQuestionVisibility,
    reorderQuestions
  } = useQuestions();
  const [isMounted, setIsMounted] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [renderKey, setRenderKey] = useState(0);

  // Client-side only mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize filtered questions
  useEffect(() => {
    setFilteredQuestions(questions);
  }, [questions]);

  // Load question data when editing
  useEffect(() => {
    console.log('📝 editingId changed:', editingId);
    if (editingId) {
      const questionToEdit = questions.find(q => q.id === editingId);
      console.log('🔍 Question to edit:', questionToEdit);
      if (questionToEdit) {
        const formData = {
          code: questionToEdit.code,
          label: questionToEdit.label,
          type: questionToEdit.type,
          section: questionToEdit.section,
          placeholder: questionToEdit.placeholder,
          required: questionToEdit.required,
          visible: questionToEdit.visible,
          options: questionToEdit.options
        };
        console.log('📋 Setting form data:', formData);
        setNewQuestion(formData);
      }
    } else {
      // Reset form when not editing
      setNewQuestion({
        section: 1,
        type: 'text',
        required: false,
        visible: true,
        options: []
      });
    }
  }, [editingId, questions]);

  // Drag & Drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    section: 1,
    type: 'text',
    required: false,
    visible: true,
    options: []
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderQuestions(active.id as string, over.id as string);
    }
  };

  const handleSave = () => {
    if (!newQuestion.label || !newQuestion.code) {
      alert('Le label et le code sont requis');
      return;
    }

    if (editingId) {
      // Update existing question
      updateQuestion(editingId, {
        code: newQuestion.code,
        label: newQuestion.label,
        type: newQuestion.type,
        section: newQuestion.section,
        placeholder: newQuestion.placeholder,
        required: newQuestion.required,
        visible: newQuestion.visible,
        options: newQuestion.options
      });
      setEditingId(null);
    } else {
      // Create new question
      const newQ: Question = {
        id: Date.now().toString(),
        section: newQuestion.section || 1,
        order: questions.filter(q => q.section === newQuestion.section).length + 1,
        code: newQuestion.code || '',
        type: newQuestion.type || 'text',
        label: newQuestion.label || '',
        placeholder: newQuestion.placeholder,
        required: newQuestion.required || false,
        visible: newQuestion.visible !== false,
        options: newQuestion.options
      };

      addQuestion(newQ);
      setIsCreating(false);
    }

    setNewQuestion({
      section: 1,
      type: 'text',
      required: false,
      visible: true,
      options: []
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
      deleteQuestion(id);
    }
  };

  const handleToggleVisibility = (id: string) => {
    toggleQuestionVisibility(id);
  };

  const handleDuplicate = (question: Question) => {
    console.log('🔄 Duplicating question:', question);
    
    // Calculate the correct order for the duplicated question
    const sectionQuestions = questions.filter(q => q.section === question.section);
    const maxOrder = Math.max(...sectionQuestions.map(q => q.order), 0);
    
    const duplicated: Question = {
      ...question,
      id: Date.now().toString(),
      code: `${question.code}_copy`,
      label: `${question.label} (Copie)`,
      order: maxOrder + 1
    };
    console.log('✨ Created duplicate:', duplicated);
    addQuestion(duplicated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Stats */}
      <QuestionStats />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-slate-900">Gestionnaire de Questions</h2>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 text-sm border border-cyan-200">
              {questions.length} questions
            </span>
          </div>
          <p className="text-slate-600">Modifiez, ajoutez ou supprimez des questions du formulaire</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="border-violet-400 text-violet-600 hover:bg-violet-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Question
          </Button>
        </div>
      </div>

      {/* Advanced Search */}
      <AdvancedSearch 
        questions={questions} 
        onFilteredQuestionsChange={setFilteredQuestions}
      />

      {/* Old Filters - REMOVED */}
      {/* <div className="flex gap-4 mb-6">
        <Select value={filterSection} onValueChange={setFilterSection}>
          <SelectTrigger className="w-64 bg-white border-slate-200 text-slate-900">
            <SelectValue placeholder="Filtrer par section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les sections</SelectItem>
            <SelectItem value="1">Section 1 - Profil</SelectItem>
            <SelectItem value="2">Section 2 - Détachement</SelectItem>
            <SelectItem value="3">Section 3 - Besoins</SelectItem>
            <SelectItem value="4">Section 4 - Intérêt YoJob</SelectItem>
            <SelectItem value="5">Section 5 - Vision</SelectItem>
            <SelectItem value="6">Section 6 - Contact</SelectItem>
          </SelectContent>
        </Select>

        <div className="text-slate-600 text-sm flex items-center">
          {filteredQuestions.length} question(s)
        </div>
      </div> */}

      {/* Create/Edit Modal */}
      {isMounted && (isCreating || editingId !== null) && createPortal(
        <AnimatePresence mode="wait">
          <motion.div
            key={`modal-${editingId || 'create'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[99999] flex items-center justify-center p-4"
            onClick={() => {
              console.log('🚫 Closing modal');
              setIsCreating(false);
              setEditingId(null);
            }}
          >
            <motion.div
              key={`modal-content-${editingId || 'create'}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-slate-200 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900 text-xl">
                  {isCreating ? 'Nouvelle Question' : 'Modifier la Question'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                  }}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Code */}
                <div>
                  <Label htmlFor="code" className="text-slate-900 mb-2 block">
                    Code de la question *
                  </Label>
                  <Input
                    id="code"
                    value={newQuestion.code || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, code: e.target.value })}
                    placeholder="Ex: q26_nouvelle_question"
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Label */}
                <div>
                  <Label htmlFor="label" className="text-slate-900 mb-2 block">
                    Libellé de la question *
                  </Label>
                  <Input
                    id="label"
                    value={newQuestion.label || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, label: e.target.value })}
                    placeholder="Ex: Quelle est votre principale motivation ?"
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Type */}
                <div>
                  <Label htmlFor="type" className="text-slate-900 mb-2 block">
                    Type de question
                  </Label>
                  <div className="relative">
                    <select
                      id="type"
                      value={newQuestion.type}
                      onChange={(e) => {
                        console.log('🔄 Type changed to:', e.target.value);
                        setNewQuestion({ ...newQuestion, type: e.target.value as any });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2.5 pr-10 
                                 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                                 hover:border-cyan-300 transition-all duration-200 cursor-pointer
                                 appearance-none"
                    >
                      <option value="text">Texte court</option>
                      <option value="textarea">Texte long</option>
                      <option value="number">Nombre</option>
                      <option value="email">Email</option>
                      <option value="radio">Choix unique</option>
                      <option value="multi-select">Choix multiple</option>
                      <option value="score">Score (1-10)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Section */}
                <div>
                  <Label htmlFor="section" className="text-slate-900 mb-2 block">
                    Section
                  </Label>
                  <div className="relative">
                    <select
                      id="section"
                      value={newQuestion.section?.toString()}
                      onChange={(e) => {
                        console.log('🔄 Section changed to:', e.target.value);
                        setNewQuestion({ ...newQuestion, section: parseInt(e.target.value) });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-900 px-3 py-2.5 pr-10
                                 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                                 hover:border-violet-300 transition-all duration-200 cursor-pointer
                                 appearance-none"
                    >
                      <option value="1">Section 1 - Profil</option>
                      <option value="2">Section 2 - Détachement</option>
                      <option value="3">Section 3 - Besoins</option>
                      <option value="4">Section 4 - Intérêt</option>
                      <option value="5">Section 5 - Vision</option>
                      <option value="6">Section 6 - Contact</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Placeholder */}
                <div>
                  <Label htmlFor="placeholder" className="text-slate-900 mb-2 block">
                    Placeholder (optionnel)
                  </Label>
                  <Input
                    id="placeholder"
                    value={newQuestion.placeholder || ''}
                    onChange={(e) => setNewQuestion({ ...newQuestion, placeholder: e.target.value })}
                    placeholder="Ex: Entrez votre réponse ici..."
                    className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Options for radio/multi-select */}
                {(newQuestion.type === 'radio' || newQuestion.type === 'multi-select') && (
                  <div>
                    <Label className="text-slate-900 mb-2 block">
                      Options (format JSON)
                    </Label>
                    <Textarea
                      value={JSON.stringify(newQuestion.options || [], null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setNewQuestion({ ...newQuestion, options: parsed });
                        } catch (err) {
                          // Invalid JSON, ignore
                        }
                      }}
                      placeholder='[{"value": "opt1", "label": "Option 1", "icon": "🔥"}]'
                      className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 font-mono text-sm min-h-[150px]"
                    />
                  </div>
                )}

                {/* Checkboxes */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newQuestion.required}
                      onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-cyan-600"
                    />
                    <span>Question obligatoire</span>
                  </label>

                  <label className="flex items-center gap-2 text-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newQuestion.visible !== false}
                      onChange={(e) => setNewQuestion({ ...newQuestion, visible: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-300 bg-slate-50 text-cyan-600"
                    />
                    <span>Question visible</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? 'Mettre à jour' : 'Enregistrer'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                  }}
                  className="border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  Annuler
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Questions List with Drag & Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredQuestions.map(q => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {filteredQuestions.map((question) => (
              <SortableQuestion
                key={question.id}
                question={question}
                onEdit={setEditingId}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Live Preview Modal */}
      <LivePreview isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </motion.div>
  );
}