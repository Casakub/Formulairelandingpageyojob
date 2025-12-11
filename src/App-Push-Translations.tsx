/**
 * 🚀 PAGE: Push Translations Tool
 * 
 * Outil pour pousser les traductions de /config/ vers Supabase
 * 
 * Usage: Ouvre /App-Push-Translations dans ton navigateur
 * 
 * Version: 1.0.0
 */

import { PushTranslationsButton } from './components/PushTranslationsButton';
import { SUPPORTED_LANGUAGES } from './src/i18n';

export default function AppPushTranslations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-white">
            🌍 Push Translations Tool
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Pousser les traductions depuis <code className="text-cyan-400">/config/</code> vers la base de données Supabase
          </p>
        </div>

        {/* Main Tool */}
        <PushTranslationsButton />

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Languages Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white mb-4">
              📋 Langues disponibles ({SUPPORTED_LANGUAGES.length})
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div key={lang.code} className="flex items-center gap-2">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="text-white font-medium">{lang.nativeName}</div>
                    <div className="text-gray-400 text-xs">{lang.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white mb-4">
              📖 Instructions
            </h3>
            <ol className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>
                  Clique sur <strong>"Preview"</strong> pour voir ce qui sera inséré (dry run)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>
                  Clique sur <strong>"Push to Supabase"</strong> pour insérer les traductions
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>
                  Vérifie le statut après insertion
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>
                  Les traductions existantes seront <strong>mises à jour</strong> (upsert)
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* Technical Info */}
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6">
          <h3 className="text-white mb-4">
            🔧 Informations techniques
          </h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>Fichier source:</span>
              <code className="text-cyan-400">/config/translations-index.ts</code>
            </div>
            <div className="flex justify-between">
              <span>Table Supabase:</span>
              <code className="text-cyan-400">translations_10092a63</code>
            </div>
            <div className="flex justify-between">
              <span>API Endpoint:</span>
              <code className="text-cyan-400">/push-translations/push</code>
            </div>
            <div className="flex justify-between">
              <span>Méthode d'insertion:</span>
              <code className="text-cyan-400">UPSERT (ON CONFLICT)</code>
            </div>
            <div className="flex justify-between">
              <span>Batch size:</span>
              <code className="text-cyan-400">500 records/batch</code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>
            Ce système lit les traductions depuis le code TypeScript et les synchronise avec Supabase
          </p>
          <p className="mt-2">
            Les traductions dans la base de données seront utilisées par le hook <code className="text-cyan-400">useI18n()</code>
          </p>
        </div>
      </div>
    </div>
  );
}