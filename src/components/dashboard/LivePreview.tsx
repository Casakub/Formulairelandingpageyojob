import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, Monitor, Smartphone, Tablet, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useQuestions } from '../../context/QuestionsContext';
import { QuestionPreview } from './QuestionPreview';

interface LivePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LivePreview({ isOpen, onClose }: LivePreviewProps) {
  const { getVisibleQuestionsBySection } = useQuestions();
  const [currentSection, setCurrentSection] = useState(1);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const visibleQuestions = getVisibleQuestionsBySection(currentSection);

  const handleFieldChange = (code: string, value: any) => {
    setFormData(prev => ({ ...prev, [code]: value }));
  };

  const handleReset = () => {
    setFormData({});
    setCurrentSection(1);
  };

  const deviceSizes = {
    desktop: { width: '100%', label: 'Desktop', icon: Monitor },
    tablet: { width: '768px', label: 'Tablet', icon: Tablet },
    mobile: { width: '375px', label: 'Mobile', icon: Smartphone }
  };

  const sections = [
    { id: 1, name: 'Profil', color: 'from-blue-500 to-cyan-500' },
    { id: 2, name: 'Détachement', color: 'from-cyan-500 to-teal-500' },
    { id: 3, name: 'Besoins', color: 'from-teal-500 to-green-500' },
    { id: 4, name: 'Intérêt YoJob', color: 'from-green-500 to-emerald-500' },
    { id: 5, name: 'Vision Future', color: 'from-violet-500 to-purple-500' },
    { id: 6, name: 'Contact', color: 'from-purple-500 to-pink-500' }
  ];

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 left-0 top-0 right-0 bottom-0 bg-black/80 backdrop-blur-lg z-[99999] overflow-y-auto"
        onClick={onClose}
        style={{ margin: 0, padding: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="min-h-screen w-full p-6 flex items-start justify-center py-8"
        >
          <div className="w-full max-w-7xl my-4">
            {/* Header */}
            <Card className="bg-white border-slate-200 shadow-2xl mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center shadow-lg">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900">Aperçu en Temps Réel</h3>
                      <p className="text-slate-600 text-sm">
                        Section {currentSection}/6 - {visibleQuestions.length} question(s) visible(s)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Device Selector */}
                    <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                      {(Object.keys(deviceSizes) as Array<keyof typeof deviceSizes>).map((d) => {
                        const DeviceIcon = deviceSizes[d].icon;
                        return (
                          <button
                            key={d}
                            onClick={() => setDevice(d)}
                            className={`p-2 rounded-md transition-all ${
                              device === d
                                ? 'bg-white text-cyan-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                            title={deviceSizes[d].label}
                          >
                            <DeviceIcon className="w-4 h-4" />
                          </button>
                        );
                      })}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Réinitialiser
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section Navigation */}
            <div className="mb-4 grid grid-cols-6 gap-2">
              {sections.map((section) => {
                const sectionQuestions = getVisibleQuestionsBySection(section.id);
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      currentSection === section.id
                        ? `bg-gradient-to-br ${section.color} text-white shadow-lg scale-105`
                        : 'bg-white text-slate-700 hover:shadow-md border border-slate-200'
                    }`}
                  >
                    <div className="text-sm mb-1">Section {section.id}</div>
                    <div className="text-xs opacity-80">{section.name}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {sectionQuestions.length} Q
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Preview Container */}
            <div className="bg-slate-100 rounded-xl p-8 flex justify-center">
              <motion.div
                key={device}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: deviceSizes[device].width, maxWidth: '100%' }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Form Preview */}
                <div className="p-8">
                  {/* Header */}
                  <div className={`mb-8 pb-6 border-b-2 border-gradient-to-r ${sections[currentSection - 1].color}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sections[currentSection - 1].color} flex items-center justify-center text-white shadow-lg`}>
                        {currentSection}
                      </div>
                      <div>
                        <h2 className="text-slate-900">Section {currentSection}</h2>
                        <p className="text-slate-600 text-sm">{sections[currentSection - 1].name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Questions */}
                  {visibleQuestions.length > 0 ? (
                    <div className="space-y-6">
                      {visibleQuestions.map((question, index) => (
                        <QuestionPreview
                          key={question.id}
                          question={question}
                          value={formData[question.code]}
                          onChange={(value) => handleFieldChange(question.code, value)}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Eye className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h4 className="text-slate-600 mb-2">Aucune question visible</h4>
                      <p className="text-slate-500 text-sm">
                        Toutes les questions de cette section sont masquées
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between">
                    <Button
                      variant="outline"
                      disabled={currentSection === 1}
                      onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
                      className="border-slate-200 text-slate-700"
                    >
                      ← Précédent
                    </Button>
                    <div className="text-slate-500 text-sm self-center">
                      {currentSection} / 6
                    </div>
                    <Button
                      disabled={currentSection === 6}
                      onClick={() => setCurrentSection(prev => Math.min(6, prev + 1))}
                      className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white"
                    >
                      Suivant →
                    </Button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentSection / 6) * 100}%` }}
                    className={`h-full bg-gradient-to-r ${sections[currentSection - 1].color}`}
                  />
                </div>
              </motion.div>
            </div>

            {/* Info Card */}
            <Card className="bg-cyan-500/10 border-cyan-400/50 mt-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-cyan-600" />
                  <div className="flex-1">
                    <p className="text-slate-900 text-sm">
                      <strong>Astuce :</strong> Les modifications dans le dashboard sont reflétées instantanément ici !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Render using Portal to escape the dashboard layout hierarchy
  return createPortal(modalContent, document.body);
}
