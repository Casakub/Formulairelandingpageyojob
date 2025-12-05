import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'motion/react';
import { GripVertical, Eye, EyeOff, Copy, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Question } from '../../config/questions';

interface SortableQuestionProps {
  question: Question;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicate: (question: Question) => void;
}

export function SortableQuestion({
  question,
  onEdit,
  onDelete,
  onToggleVisibility,
  onDuplicate
}: SortableQuestionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`bg-white border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all shadow-md ${
        !question.visible ? 'opacity-60' : ''
      } ${isDragging ? 'shadow-2xl ring-2 ring-cyan-400' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Drag Handle */}
            <div 
              {...attributes} 
              {...listeners}
              className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-cyan-600 mt-1 transition-colors"
            >
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-600 text-sm">Section {question.section}</span>
                    <span className="text-slate-400 text-sm">•</span>
                    <span className="text-slate-500 text-sm font-mono">{question.code}</span>
                    {question.required && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 text-xs border border-red-200">
                        Obligatoire
                      </span>
                    )}
                  </div>
                  <h4 className="text-slate-900">{question.label}</h4>
                  <p className="text-slate-600 text-sm mt-1">Type: {question.type}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleVisibility(question.id)}
                    className="text-slate-600 hover:text-slate-900"
                    title={question.visible ? 'Masquer' : 'Afficher'}
                  >
                    {question.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      console.log('📋 Duplicate clicked for question:', question.id);
                      onDuplicate(question);
                    }}
                    className="text-slate-600 hover:text-slate-900"
                    title="Dupliquer"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      console.log('🖊️ Edit clicked for question:', question.id);
                      onEdit(question.id);
                    }}
                    className="text-cyan-600 hover:text-cyan-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(question.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Options preview */}
              {question.options && question.options.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {question.options.slice(0, 5).map((opt, i) => (
                    <span key={i} className="px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs">
                      {opt.icon} {opt.label}
                    </span>
                  ))}
                  {question.options.length > 5 && (
                    <span className="px-2 py-1 text-slate-500 text-xs">
                      +{question.options.length - 5} autres
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}