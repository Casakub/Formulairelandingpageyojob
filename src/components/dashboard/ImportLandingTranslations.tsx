/**
 * 🌍 Composant pour importer toutes les traductions de la landing page
 * Charge les 23 fichiers de langue et les envoie au backend
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Loader2, CheckCircle, XCircle, Globe, Upload } from 'lucide-react';
import { landingContent } from '../../content/landing/index';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63`;

interface ImportResult {
  lang: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
}

export function ImportLandingTranslations() {
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);

  const languages = Object.keys(landingContent);

  const importAllTranslations = async () => {
    setImporting(true);
    const tempResults: ImportResult[] = languages.map(lang => ({
      lang,
      status: 'pending'
    }));
    setResults(tempResults);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < languages.length; i++) {
      const lang = languages[i];
      
      try {
        const content = landingContent[lang as keyof typeof landingContent];
        
        const response = await fetch(`${API_BASE}/landing/${lang}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            translation_status: 'validated',
            translated_by: 'professional',
            translation_progress: 100,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        if (data.success) {
          tempResults[i] = { lang, status: 'success' };
          successCount++;
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (error: any) {
        tempResults[i] = { lang, status: 'error', message: error.message };
        errorCount++;
      }

      setResults([...tempResults]);
    }

    setImporting(false);
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const pendingCount = results.filter(r => r.status === 'pending').length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-blue-600" />
          <div>
            <CardTitle>Import Landing Page Translations</CardTitle>
            <CardDescription>
              Import all 23 European language translations to the database
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
          <Badge variant="outline" className="text-sm">
            {languages.length} languages ready
          </Badge>
          {results.length > 0 && (
            <>
              {successCount > 0 && (
                <Badge className="bg-green-100 text-green-700 border-green-300">
                  ✅ {successCount} imported
                </Badge>
              )}
              {errorCount > 0 && (
                <Badge className="bg-red-100 text-red-700 border-red-300">
                  ❌ {errorCount} failed
                </Badge>
              )}
              {pendingCount > 0 && (
                <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                  ⏳ {pendingCount} pending
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Import Button */}
        <Button
          onClick={importAllTranslations}
          disabled={importing}
          className="w-full"
          size="lg"
        >
          {importing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Importing translations...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Import All Translations
            </>
          )}
        </Button>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <h4 className="text-sm font-medium mb-2">Import Results:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {results.map((result) => (
                <div
                  key={result.lang}
                  className={`flex items-center gap-2 p-2 rounded border ${
                    result.status === 'success'
                      ? 'bg-green-50 border-green-200'
                      : result.status === 'error'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {result.status === 'success' && (
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                  {result.status === 'error' && (
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  )}
                  {result.status === 'pending' && (
                    <Loader2 className="w-4 h-4 text-gray-400 animate-spin flex-shrink-0" />
                  )}
                  <span className="text-sm font-mono uppercase">{result.lang}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Message */}
        {results.length > 0 && errorCount === 0 && pendingCount === 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  All translations imported successfully! 🎉
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Your YOJOB landing page is now available in 23 European languages.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}