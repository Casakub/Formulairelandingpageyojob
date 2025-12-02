import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../ui/badge';
import { Loader2, Database, RefreshCw } from 'lucide-react';
import { fetchQuestionTranslations, fetchUITextTranslations, fetchCountryLanguageMappings } from '../lib/i18n-api';

export default function DiagnosticTranslations() {
  const [loading, setLoading] = useState(true);
  const [questionTranslations, setQuestionTranslations] = useState<any[]>([]);
  const [uiTranslations, setUITranslations] = useState<any[]>([]);
  const [countryMappings, setCountryMappings] = useState<any[]>([]);
  const [rawKVData, setRawKVData] = useState<any>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [questions, ui, countries] = await Promise.all([
        fetchQuestionTranslations(),
        fetchUITextTranslations(),
        fetchCountryLanguageMappings()
      ]);

      console.log('✅ Translations loaded from Supabase:', {
        questions: questions.length,
        uiTexts: ui.length,
        countries: countries.length
      });

      setQuestionTranslations(questions);
      setUITranslations(ui);
      setCountryMappings(countries);

      // Fetch raw KV data directly from Supabase
      await fetchRawKVData();
    } catch (error) {
      console.error('❌ Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRawKVData = async () => {
    try {
      const response = await fetch(`https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/i18n/questions`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NzM4NTEsImV4cCI6MjA0ODQ0OTg1MX0.9sD19eJpDZWWlKvlp2a0e1-0rBm0lzvNNRw6bLJG_II`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRawKVData(data);
        console.log('📦 Raw KV data:', data);
      }
    } catch (error) {
      console.error('❌ Error fetching raw KV data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">🔍 Diagnostic Traductions</h1>
            <p className="text-slate-600">État des données i18n dans Supabase KV Store</p>
          </div>
          <Button onClick={loadData} disabled={loading}>
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Chargement...</>
            ) : (
              <><RefreshCw className="w-4 h-4 mr-2" /> Recharger</>
            )}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Questions Translations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-2">{questionTranslations.length}</div>
              <Badge variant={questionTranslations.length > 0 ? "default" : "secondary"}>
                {questionTranslations.length > 0 ? "✅ Données présentes" : "❌ Vide"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">UI Texts Translations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-2">{uiTranslations.length}</div>
              <Badge variant={uiTranslations.length > 0 ? "default" : "secondary"}>
                {uiTranslations.length > 0 ? "✅ Données présentes" : "❌ Vide"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Country Mappings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl mb-2">{countryMappings.length}</div>
              <Badge variant={countryMappings.length > 0 ? "default" : "secondary"}>
                {countryMappings.length > 0 ? "✅ Données présentes" : "❌ Vide"}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Questions Details */}
        {questionTranslations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>📝 Questions Translations (détails)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {questionTranslations.map((q: any, idx: number) => (
                  <div key={idx} className="p-4 border rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{q.questionId}</Badge>
                      <span className="text-sm text-slate-600">
                        {Object.keys(q.translations || {}).length} langues
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      Langues: {Object.keys(q.translations || {}).join(', ')}
                    </div>
                    {q.translations?.fr && (
                      <div className="mt-2 text-sm">
                        <strong>FR:</strong> {q.translations.fr.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Raw KV Data */}
        {rawKVData && (
          <Card>
            <CardHeader>
              <CardTitle>📦 Raw Server Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                {JSON.stringify(rawKVData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="mb-3">💡 Comment vérifier ?</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Si les 3 compteurs sont à <strong>0</strong>, l'import n'a pas fonctionné</li>
              <li>Si <strong>Questions = 28</strong>, l'import a réussi !</li>
              <li>Vérifiez les détails des questions pour voir les langues disponibles</li>
              <li>Vérifiez la console du navigateur pour les logs d'import</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
