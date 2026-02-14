import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  FileText,
  Copy,
  Loader2,
  ExternalLink,
  Upload,
  FolderOpen,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  generateBlogSitemap,
  generateSitemapIndex,
  applySitemapsToStorage,
  getSitemapStorageUrl,
} from '../../services/blogService';

interface SitemapFile {
  name: string;
  description: string;
  type: 'static' | 'dynamic';
  content?: string;
}

export function SitemapManager() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<SitemapFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const [blogSitemap, sitemapIndex] = await Promise.all([
        generateBlogSitemap(),
        Promise.resolve(generateSitemapIndex()),
      ]);

      setGenerated([
        {
          name: 'sitemap.xml',
          description: 'Index principal (inclut maintenant sitemap-blog.xml)',
          type: 'dynamic',
          content: sitemapIndex,
        },
        {
          name: 'sitemap-blog.xml',
          description: `Sitemap blog avec tous les articles publiés`,
          type: 'dynamic',
          content: blogSitemap,
        },
      ]);
    } catch (err: any) {
      console.error('Erreur génération sitemap:', err);
      setError(err.message || 'Erreur lors de la génération');
    } finally {
      setGenerating(false);
    }
  };

  const downloadFile = (file: SitemapFile) => {
    if (!file.content) return;
    const blob = new Blob([file.content], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    generated.forEach((file) => {
      if (file.content) {
        setTimeout(() => downloadFile(file), 100);
      }
    });
  };

  const copyContent = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleApply = async () => {
    setApplying(true);
    setError(null);
    setApplied(false);
    try {
      const filesToApply = generated
        .filter((f) => f.content)
        .map((f) => ({ name: f.name, content: f.content! }));

      await applySitemapsToStorage(filesToApply);
      setApplied(true);
    } catch (err: any) {
      console.error('Erreur application sitemap:', err);
      setError(err.message || 'Erreur lors de l\'application dans le storage');
    } finally {
      setApplying(false);
    }
  };

  const countUrls = (xml: string): number => {
    return (xml.match(/<url>/g) || []).length;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            Gestion des Sitemaps
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Générez et téléchargez vos sitemaps avec les articles de blog inclus automatiquement
          </p>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
        >
          {generating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          Générer les sitemaps
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Current static sitemaps info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { name: 'sitemap-main.xml', desc: 'Pages principales (23 langues)', urls: '275 URLs', status: 'static' },
          { name: 'sitemap-about.xml', desc: 'Services et pages légales', urls: '10 URLs', status: 'static' },
          { name: 'sitemap-blog.xml', desc: 'Articles de blog (dynamique)', urls: 'A générer', status: 'dynamic' },
        ].map((item) => (
          <div key={item.name} className="p-4 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-slate-800 text-sm">{item.name}</span>
              </div>
              <Badge
                className={
                  item.status === 'static'
                    ? 'bg-slate-100 text-slate-600 text-xs'
                    : 'bg-violet-100 text-violet-700 text-xs'
                }
              >
                {item.status === 'static' ? 'Statique' : 'Dynamique'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">{item.desc}</p>
            <p className="text-xs text-slate-400 mt-1">{item.urls}</p>
          </div>
        ))}
      </div>

      {/* Generated files */}
      {generated.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-slate-800">Fichiers générés</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={downloadAll}>
                <Download className="w-4 h-4 mr-2" />
                Tout télécharger
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                disabled={applying || applied}
                className={
                  applied
                    ? 'bg-green-600 hover:bg-green-600'
                    : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700'
                }
              >
                {applying ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : applied ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <FolderOpen className="w-4 h-4 mr-2" />
                )}
                {applying ? 'Application...' : applied ? 'Appliqué !' : 'Appliquer dans public/'}
              </Button>
            </div>
          </div>

          {generated.map((file, idx) => (
            <div
              key={file.name}
              className="rounded-xl border border-green-200 bg-green-50/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {file.description}
                      {file.content && ` - ${countUrls(file.content)} URL(s)`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => file.content && copyContent(file.content, idx)}
                    title="Copier le contenu XML"
                  >
                    {copiedIndex === idx ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500" />
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadFile(file)}>
                    <Download className="w-4 h-4 mr-1" />
                    Télécharger
                  </Button>
                </div>
              </div>

              {/* XML Preview */}
              {file.content && (
                <div className="border-t border-green-200 bg-slate-900 p-4 max-h-48 overflow-auto">
                  <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                    {file.content.slice(0, 2000)}
                    {file.content.length > 2000 && '\n... (tronqué)'}
                  </pre>
                </div>
              )}
            </div>
          ))}

          {/* Applied success message */}
          {applied && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-emerald-50 border border-emerald-200"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-800 text-sm mb-1">
                    Sitemaps sauvegardés dans Supabase Storage
                  </h4>
                  <p className="text-xs text-emerald-700 mb-2">
                    Les fichiers sont prêts à être déployés dans <code className="bg-emerald-100 px-1 rounded">public/</code>.
                    Exécutez cette commande sur votre serveur :
                  </p>
                  <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                    node src/scripts/generate-sitemaps.cjs --pull
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Instructions */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2 text-sm">Instructions de mise à jour</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-slate-700 mb-1">Option 1 — Appliquer depuis le dashboard (recommandé)</p>
                <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Cliquez sur <strong>"Appliquer dans public/"</strong> ci-dessus</li>
                  <li>
                    Sur votre serveur, exécutez : <code className="bg-blue-100 px-1 rounded">node src/scripts/generate-sitemaps.cjs --pull</code>
                  </li>
                  <li>Les sitemaps seront téléchargés et écrits dans <code className="bg-blue-100 px-1 rounded">src/public/</code></li>
                </ol>
              </div>
              <div className="border-t border-blue-200 pt-3">
                <p className="text-xs font-medium text-slate-700 mb-1">Option 2 — Génération directe sur le serveur</p>
                <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
                  <li>
                    Exécutez : <code className="bg-blue-100 px-1 rounded">node src/scripts/generate-sitemaps.cjs</code>
                  </li>
                  <li>Le script interroge Supabase et génère les sitemaps directement</li>
                </ol>
              </div>
              <div className="border-t border-blue-200 pt-3">
                <p className="text-xs font-medium text-slate-700 mb-1">Option 3 — Téléchargement manuel</p>
                <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Cliquez sur "Tout télécharger" pour récupérer les fichiers</li>
                  <li>
                    Remplacez les fichiers dans le dossier <code className="bg-blue-100 px-1 rounded">public/</code>
                  </li>
                </ol>
              </div>
              <div className="border-t border-blue-200 pt-2 text-xs text-slate-500">
                Pensez à soumettre dans{' '}
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  Google Search Console <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty state if not generated */}
      {generated.length === 0 && !generating && (
        <div className="text-center py-12 px-4">
          <Globe className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            Générer vos sitemaps
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Cliquez sur le bouton pour générer automatiquement le sitemap blog
            avec tous vos articles publiés et le nouvel index sitemap.
          </p>
          <Button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-violet-600 to-cyan-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Générer maintenant
          </Button>
        </div>
      )}
    </motion.div>
  );
}