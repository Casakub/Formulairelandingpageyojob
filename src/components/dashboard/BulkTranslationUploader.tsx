import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Upload, CheckCircle2, XCircle, Loader2, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import type { LanguageCode } from '../../types/landingContent';
import type { LanguageTranslationMeta } from '../../types/translationWorkflow';

// Import statique de toutes les traductions
import { landingContentEN } from '../../content/landing/en';
import { landingContentDE } from '../../content/landing/de';
import { landingContentES } from '../../content/landing/es';
import { landingContentIT } from '../../content/landing/it';
import { landingContentPT } from '../../content/landing/pt';
import { landingContentNL } from '../../content/landing/nl';
import { landingContentPL } from '../../content/landing/pl';
import { landingContentRO } from '../../content/landing/ro';
import { landingContentBG } from '../../content/landing/bg';
import { landingContentHU } from '../../content/landing/hu';
import { landingContentCS } from '../../content/landing/cs';
import { landingContentSK } from '../../content/landing/sk';
import { landingContentHR } from '../../content/landing/hr';
import { landingContentSL } from '../../content/landing/sl';
import { landingContentLT } from '../../content/landing/lt';
import { landingContentLV } from '../../content/landing/lv';
import { landingContentET } from '../../content/landing/et';
import { landingContentEL } from '../../content/landing/el';
import { landingContentSV } from '../../content/landing/sv';
import { landingContentDA } from '../../content/landing/da';
import { landingContentFI } from '../../content/landing/fi';
import { landingContentNO } from '../../content/landing/no';

/**
 * 🌍 Bulk Translation Uploader
 * Upload toutes les traductions créées par Claude vers Supabase
 * SANS consommer de crédits Anthropic
 * 
 * ⚡ SYNCHRONISATION BIDIRECTIONNELLE :
 * - Upload vers Supabase
 * - Met à jour les métadonnées locales (localStorage)
 * - Communique avec LandingContentManagerUnified
 */

interface LanguageStatus {
  code: LanguageCode;
  flag: string;
  name: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Mapping des traductions importées
const TRANSLATIONS: Record<LanguageCode, any> = {
  en: landingContentEN,
  de: landingContentDE,
  es: landingContentES,
  it: landingContentIT,
  pt: landingContentPT,
  nl: landingContentNL,
  pl: landingContentPL,
  ro: landingContentRO,
  bg: landingContentBG,
  hu: landingContentHU,
  cs: landingContentCS,
  sk: landingContentSK,
  hr: landingContentHR,
  sl: landingContentSL,
  lt: landingContentLT,
  lv: landingContentLV,
  et: landingContentET,
  el: landingContentEL,
  sv: landingContentSV,
  da: landingContentDA,
  fi: landingContentFI,
  no: landingContentNO,
};

export function BulkTranslationUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [languages, setLanguages] = useState<LanguageStatus[]>([
    { code: 'en', flag: '🇬🇧', name: 'English', status: 'pending' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch', status: 'pending' },
    { code: 'es', flag: '🇪🇸', name: 'Español', status: 'pending' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano', status: 'pending' },
    { code: 'pt', flag: '🇵🇹', name: 'Português', status: 'pending' },
    { code: 'nl', flag: '🇳🇱', name: 'Nederlands', status: 'pending' },
    { code: 'pl', flag: '🇵🇱', name: 'Polski', status: 'pending' },
    { code: 'ro', flag: '🇷🇴', name: 'Română', status: 'pending' },
    { code: 'bg', flag: '🇧🇬', name: 'Bulgare', status: 'pending' },
    { code: 'hu', flag: '🇭🇺', name: 'Hongrois', status: 'pending' },
    { code: 'cs', flag: '🇨🇿', name: 'Tchèque', status: 'pending' },
    { code: 'sk', flag: '🇸🇰', name: 'Slovaque', status: 'pending' },
    { code: 'hr', flag: '🇭🇷', name: 'Croate', status: 'pending' },
    { code: 'sl', flag: '🇸🇮', name: 'Slovène', status: 'pending' },
    { code: 'lt', flag: '🇱🇹', name: 'Lituanien', status: 'pending' },
    { code: 'lv', flag: '🇱🇻', name: 'Letton', status: 'pending' },
    { code: 'et', flag: '🇪🇪', name: 'Estonien', status: 'pending' },
    { code: 'el', flag: '🇬🇷', name: 'Grec', status: 'pending' },
    { code: 'sv', flag: '🇸🇪', name: 'Suédois', status: 'pending' },
    { code: 'da', flag: '🇩🇰', name: 'Danois', status: 'pending' },
    { code: 'fi', flag: '🇫🇮', name: 'Finnois', status: 'pending' },
    { code: 'no', flag: '🇳🇴', name: 'Norvégien', status: 'pending' },
  ]);

  const updateLanguageStatus = (code: LanguageCode, status: LanguageStatus['status'], error?: string) => {
    setLanguages(prev => 
      prev.map(lang => 
        lang.code === code ? { ...lang, status, error } : lang
      )
    );
  };

  const uploadAllTranslations = async () => {
    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    // 🔄 Charger les métadonnées existantes depuis localStorage
    let translationMeta: Record<string, LanguageTranslationMeta> = {};
    try {
      const saved = localStorage.getItem('yojob_translation_meta');
      if (saved) {
        translationMeta = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load translation meta:', e);
    }

    for (const lang of languages) {
      updateLanguageStatus(lang.code, 'uploading');

      try {
        // Récupération du contenu de la traduction
        const content = TRANSLATIONS[lang.code];

        if (!content) {
          throw new Error(`Content not found for ${lang.code}`);
        }

        // Upload vers Supabase
        const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
        
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/${lang.code}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content,
              translation_status: 'published',
              translation_progress: 100,
              translated_by: 'claude_manual',
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || `HTTP ${response.status}`);
        }

        // ⚡ SYNCHRONISATION : Mettre à jour les métadonnées locales
        translationMeta[lang.code] = {
          lang: lang.code,
          workflowStatus: 'completed',
          translationProgress: 100,
          lastTranslationDate: new Date().toISOString(),
          translatedBy: 'claude_manual',
          sections: {}, // Toutes les sections sont traduites
          notes: 'Uploaded via Bulk Translation Uploader',
        };

        updateLanguageStatus(lang.code, 'success');
        successCount++;

      } catch (error) {
        console.error(`Error uploading ${lang.code}:`, error);
        updateLanguageStatus(
          lang.code, 
          'error', 
          error instanceof Error ? error.message : 'Unknown error'
        );
        errorCount++;
      }

      // Petit délai entre chaque upload
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 💾 Sauvegarder les métadonnées mises à jour dans localStorage
    try {
      localStorage.setItem('yojob_translation_meta', JSON.stringify(translationMeta));
      console.log('✅ Translation metadata synchronized to localStorage');
    } catch (e) {
      console.warn('Failed to save translation meta:', e);
    }

    setIsUploading(false);

    // Toast final
    if (errorCount === 0) {
      // Vider le cache pour forcer le rechargement
      try {
        localStorage.removeItem('yojob_landing_translations_cache');
        localStorage.removeItem('yojob_landing_content');
        console.log('✅ Cache cleared successfully');
      } catch (e) {
        console.warn('Failed to clear cache:', e);
      }

      toast.success(`✅ ${successCount} traductions uploadées avec succès !`, {
        description: 'Métadonnées synchronisées • Cache vidé • Prêt à l\'utilisation',
        duration: 10000,
        action: {
          label: 'Actualiser',
          onClick: () => {
            window.dispatchEvent(new CustomEvent('landing-translations-updated'));
            window.location.reload();
          },
        },
      });
    } else {
      toast.warning(`⚠️ Upload terminé avec ${errorCount} erreur(s)`, {
        description: `${successCount} réussies, ${errorCount} échouées`,
        duration: 6000,
      });
    }
  };

  const stats = {
    total: languages.length,
    success: languages.filter(l => l.status === 'success').length,
    error: languages.filter(l => l.status === 'error').length,
    pending: languages.filter(l => l.status === 'pending').length,
  };

  const progress = ((stats.success + stats.error) / stats.total) * 100;

  return (
    <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                Upload Traductions Claude
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Manuel
                </Badge>
              </CardTitle>
              <CardDescription>
                Upload direct des traductions créées par Claude (sans API Anthropic)
              </CardDescription>
            </div>
          </div>

          <Badge 
            variant="outline" 
            className="border-slate-300 text-slate-700"
          >
            {stats.total} langues
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-2xl text-slate-900 mb-1">{stats.total}</div>
            <div className="text-xs text-slate-600">Total</div>
          </div>
          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="text-2xl text-green-700 mb-1">{stats.success}</div>
            <div className="text-xs text-green-600">Réussies</div>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="text-2xl text-red-700 mb-1">{stats.error}</div>
            <div className="text-xs text-red-600">Erreurs</div>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-2xl text-blue-700 mb-1">{stats.pending}</div>
            <div className="text-xs text-blue-600">En attente</div>
          </div>
        </div>

        {/* Progress bar */}
        {isUploading && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Progression</span>
              <span className="text-slate-900">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Liste des langues */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-2 bg-slate-50 rounded-lg">
          <AnimatePresence mode="popLayout">
            {languages.map((lang) => (
              <motion.div
                key={lang.code}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-300 text-center
                  ${lang.status === 'pending' ? 'bg-white border-slate-200' : ''}
                  ${lang.status === 'uploading' ? 'bg-blue-50 border-blue-400 scale-105' : ''}
                  ${lang.status === 'success' ? 'bg-green-50 border-green-400' : ''}
                  ${lang.status === 'error' ? 'bg-red-50 border-red-400' : ''}
                `}
              >
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="text-xs text-slate-700 mb-1">{lang.code.toUpperCase()}</div>
                
                {lang.status === 'uploading' && (
                  <Loader2 className="w-4 h-4 mx-auto text-blue-500 animate-spin" />
                )}
                {lang.status === 'success' && (
                  <CheckCircle2 className="w-4 h-4 mx-auto text-green-500" />
                )}
                {lang.status === 'error' && (
                  <XCircle className="w-4 h-4 mx-auto text-red-500" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Erreurs détaillées */}
        {stats.error > 0 && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <XCircle className="w-4 h-4" />
              <span className="text-sm">Erreurs détaillées :</span>
            </div>
            {languages
              .filter(l => l.status === 'error')
              .map(lang => (
                <div key={lang.code} className="text-xs text-red-700">
                  <span className="font-mono">{lang.code.toUpperCase()}</span>: {lang.error}
                </div>
              ))}
          </div>
        )}

        {/* Info */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <div>
                <p className="text-sm text-green-900 mb-1">
                  <strong>Traductions créées manuellement par Claude</strong>
                </p>
                <p className="text-xs text-green-700 leading-relaxed">
                  Ces traductions ont été rédigées par Claude et sont stockées dans <code className="px-1 py-0.5 bg-white rounded text-green-800">/content/landing/</code>.
                  <strong className="block mt-1">Aucun crédit Anthropic ne sera consommé lors de l'upload.</strong>
                </p>
              </div>
              
              <div className="pt-2 border-t border-green-300/50">
                <p className="text-xs text-green-800">
                  <strong>🔄 Synchronisation bidirectionnelle :</strong>
                </p>
                <ul className="text-xs text-green-700 mt-1 space-y-0.5 ml-4">
                  <li>• Upload vers Supabase (base de données)</li>
                  <li>• Mise à jour des métadonnées locales (localStorage)</li>
                  <li>• Communication avec le système de traduction IA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={uploadAllTranslations}
          disabled={isUploading || stats.pending === 0}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30"
          size="lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Upload en cours... ({stats.success + stats.error}/{stats.total})
            </>
          ) : stats.pending === 0 ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Upload terminé
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Upload {stats.total} traductions vers Supabase
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}