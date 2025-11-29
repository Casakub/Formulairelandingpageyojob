import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Globe, TrendingUp, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAvailableLanguages, getCompletionColor, getCompletionLabel } from '../../hooks/useAvailableLanguages';

/**
 * Widget to display available languages with translation completion stats
 * Shows on dashboard to give admins visibility into translation coverage
 */
export function LanguageAvailabilityWidget() {
  const { availableLanguages, loading, error } = useAvailableLanguages();

  if (loading) {
    return (
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-500" />
            Langues disponibles
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            Erreur de chargement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (availableLanguages.length === 0) {
    return (
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <AlertCircle className="w-5 h-5" />
            Aucune traduction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-600">
            Commencez à traduire vos questions et textes d'interface pour activer le support multilingue.
          </p>
        </CardContent>
      </Card>
    );
  }

  const completeLanguages = availableLanguages.filter(l => l.completion >= 95);
  const inProgressLanguages = availableLanguages.filter(l => l.completion < 95 && l.completion >= 25);
  const limitedLanguages = availableLanguages.filter(l => l.completion < 25);

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-500" />
            Langues disponibles
          </CardTitle>
          <Badge className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white">
            {availableLanguages.length} {availableLanguages.length === 1 ? 'langue' : 'langues'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Complete Languages */}
        {completeLanguages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-slate-600">
                Complètes ({completeLanguages.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {completeLanguages.map((lang) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge 
                    className="bg-green-100 text-green-700 border-green-300 px-3 py-1"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="mr-2">{lang.name}</span>
                    <span className="text-xs opacity-70">{lang.completion}%</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Languages */}
        {inProgressLanguages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-cyan-500" />
              <span className="text-sm text-slate-600">
                En cours ({inProgressLanguages.length})
              </span>
            </div>
            <div className="space-y-2">
              {inProgressLanguages.map((lang) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700">{lang.name}</span>
                      <span className={`text-xs ${getCompletionColor(lang.completion)}`}>
                        {lang.completion}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.completion}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full ${
                          lang.completion >= 75 ? 'bg-cyan-500' :
                          lang.completion >= 50 ? 'bg-yellow-500' :
                          'bg-orange-500'
                        }`}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">
                    {lang.totalTranslations}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Limited Languages */}
        {limitedLanguages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-slate-600">
                Limitées ({limitedLanguages.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {limitedLanguages.map((lang) => (
                <motion.div
                  key={lang.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge 
                    variant="outline"
                    className="border-orange-300 text-orange-700 px-3 py-1"
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="mr-2">{lang.name}</span>
                    <span className="text-xs opacity-70">{lang.completion}%</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>Total traductions disponibles</span>
            <span className="text-cyan-600">
              {availableLanguages.reduce((sum, lang) => sum + lang.totalTranslations, 0)} éléments
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
