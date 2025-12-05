import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle2, Circle, Languages } from 'lucide-react';
import { Badge } from '../ui/badge';

export function TranslationStatusWidget() {
  const stats = {
    languages: 23,
    uiTexts: {
      total: 35,
      completed: 35,
      percentage: 100
    },
    questions: {
      total: 26,
      completed: 0,
      percentage: 0
    },
    totalTranslations: {
      ui: 805,
      questions: 0,
      total: 805
    }
  };

  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-violet-600" />
            <span className="text-lg">Statut des Traductions</span>
          </div>
          <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-300">
            {stats.languages} langues
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* UI Texts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Textes UI</span>
            </div>
            <span className="text-sm text-green-600 font-medium">{stats.uiTexts.percentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.uiTexts.percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-600">
            {stats.uiTexts.completed}/{stats.uiTexts.total} clés • {stats.totalTranslations.ui} traductions
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium">Questions</span>
            </div>
            <span className="text-sm text-slate-600 font-medium">{stats.questions.percentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.questions.percentage}%` }}
            />
          </div>
          <p className="text-xs text-slate-600">
            {stats.questions.completed}/{stats.questions.total} questions • {stats.totalTranslations.questions} traductions
          </p>
        </div>

        {/* Total */}
        <div className="pt-3 border-t border-violet-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Total</span>
            <span className="text-2xl font-bold text-violet-600">
              {stats.totalTranslations.total}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            traductions disponibles dans {stats.languages} langues
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <a
            href="/upload-translations"
            className="flex-1 text-center px-3 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition"
          >
            Uploader les traductions
          </a>
          <a
            href="/TRANSLATIONS_COMPLETE_REPORT.md"
            target="_blank"
            className="flex-1 text-center px-3 py-2 bg-white border border-violet-300 text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-50 transition"
          >
            Voir le rapport
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
