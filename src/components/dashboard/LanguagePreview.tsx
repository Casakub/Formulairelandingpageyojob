import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, Globe, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useI18n, SUPPORTED_LANGUAGES } from '../../hooks/useI18n';
import { Separator } from '../ui/separator';

interface LanguagePreviewProps {
  onClose: () => void;
}

export function LanguagePreview({ onClose }: LanguagePreviewProps) {
  const { currentLang, setCurrentLang, t, tQuestion, loading } = useI18n();
  const [previewLang, setPreviewLang] = useState(currentLang);

  // Sample questions IDs for preview
  const sampleQuestions = ['q1', 'q2', 'q5', 'q12', 'q18', 'q25'];
  
  // Sample UI texts for preview
  const sampleUITexts = [
    { key: 'button.next', fallback: 'Suivant' },
    { key: 'button.previous', fallback: 'Précédent' },
    { key: 'button.submit', fallback: 'Envoyer' },
    { key: 'label.required', fallback: 'Obligatoire' },
    { key: 'nav.section1', fallback: 'Profil agence' },
    { key: 'nav.section2', fallback: 'Détachement' }
  ];

  const handleLanguageChange = (lang: string) => {
    setPreviewLang(lang);
    setCurrentLang(lang as any);
  };

  const currentLanguageData = SUPPORTED_LANGUAGES.find(l => l.code === previewLang);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="border-slate-200 bg-white shadow-2xl">
          <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-slate-900">Prévisualisation multilingue</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Visualisez vos traductions en temps réel
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Language Selector */}
            <div className="mt-4 flex items-center gap-3">
              <Globe className="w-4 h-4 text-slate-600" />
              <Select value={previewLang} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[250px] bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {lang.code.toUpperCase()}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {loading && (
                <Badge variant="outline" className="border-blue-300 text-blue-700 animate-pulse">
                  Chargement...
                </Badge>
              )}

              {!loading && currentLanguageData && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  {currentLanguageData.flag} {currentLanguageData.nativeName}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {/* Questions Preview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-xs">📝</span>
                </div>
                <h3 className="text-slate-900">Questions du formulaire</h3>
                <Badge variant="outline" className="ml-auto">{sampleQuestions.length} exemples</Badge>
              </div>

              <div className="space-y-3">
                {sampleQuestions.map((qId, idx) => {
                  const translation = tQuestion(qId, `Question ${qId} (non traduite)`);
                  const isTranslated = translation !== `Question ${qId} (non traduite)`;

                  return (
                    <motion.div
                      key={qId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className={`border ${isTranslated ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">{qId}</Badge>
                                {isTranslated ? (
                                  <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">Traduit</Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-700 border-red-300 text-xs">Non traduit</Badge>
                                )}
                              </div>
                              <p className={`text-sm ${isTranslated ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                                {translation}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 mt-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* UI Texts Preview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-violet-100 flex items-center justify-center">
                  <span className="text-xs">🎨</span>
                </div>
                <h3 className="text-slate-900">Textes d'interface</h3>
                <Badge variant="outline" className="ml-auto">{sampleUITexts.length} exemples</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sampleUITexts.map((text, idx) => {
                  const translation = t(text.key, text.fallback);
                  const isTranslated = translation !== text.fallback;

                  return (
                    <motion.div
                      key={text.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (idx * 0.05) + 0.3 }}
                    >
                      <Card className={`border ${isTranslated ? 'border-green-200 bg-green-50/30' : 'border-amber-200 bg-amber-50/30'}`}>
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">{text.key}</Badge>
                              {isTranslated ? (
                                <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">✓</Badge>
                              ) : (
                                <Badge className="bg-amber-100 text-amber-700 border-amber-300 text-xs">FR</Badge>
                              )}
                            </div>
                            <p className={`text-sm ${isTranslated ? 'text-slate-900' : 'text-slate-500'}`}>
                              {translation}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Stats Summary */}
            <Card className="border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Progression pour {currentLanguageData?.name}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm text-slate-900">Traduites</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-sm text-slate-900">Manquantes</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      onClose();
                      // Could navigate to translation manager here
                    }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  >
                    Modifier les traductions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
