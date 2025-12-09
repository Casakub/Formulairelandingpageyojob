import { motion } from 'motion/react';
import { Download, Globe, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SitemapGenerator } from '../SitemapGenerator';
import type { LandingContentState } from '../../types/landing';

interface SEOToolsPanelProps {
  landingContent: LandingContentState;
}

/**
 * 🔧 SEO Tools Panel
 * Outils SEO : sitemap.xml, hreflang, robots.txt, etc.
 */
export function SEOToolsPanel({ landingContent }: SEOToolsPanelProps) {
  const languageCount = Object.keys(landingContent).length;
  
  const handleDownloadRobotsTxt = () => {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://yojob.fr/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;

    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-cyan-50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-600" />
          Outils SEO Avancés
        </CardTitle>
        <CardDescription>
          Générez automatiquement vos fichiers SEO
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sitemap.xml */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-slate-900 mb-1 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Sitemap.xml
              </h4>
              <p className="text-sm text-slate-600">
                Généré automatiquement avec {languageCount} langue{languageCount > 1 ? 's' : ''} et balises hreflang
              </p>
            </div>
            <Badge className="bg-green-100 text-green-700">Auto</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <SitemapGenerator landingContent={landingContent} baseUrl="https://yojob.fr" />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://www.xml-sitemaps.com/', '_blank')}
              className="text-slate-600"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Valider
            </Button>
          </div>
          
          <div className="mt-3 p-2 bg-slate-50 rounded text-xs text-slate-600 font-mono">
            Contient : {languageCount} URL{languageCount > 1 ? 's' : ''} • Hreflang • Priorités • LastMod
          </div>
        </motion.div>

        {/* robots.txt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-slate-900 mb-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-600" />
                robots.txt
              </h4>
              <p className="text-sm text-slate-600">
                Fichier pour contrôler l'exploration des moteurs de recherche
              </p>
            </div>
            <Badge className="bg-cyan-100 text-cyan-700">Recommandé</Badge>
          </div>
          
          <Button
            onClick={handleDownloadRobotsTxt}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger robots.txt
          </Button>
        </motion.div>

        {/* Hreflang Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
        >
          <h4 className="text-slate-900 mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-violet-600" />
            Balises Hreflang
          </h4>
          <p className="text-sm text-slate-600 mb-3">
            Générées automatiquement dans le &lt;head&gt; pour toutes les langues
          </p>
          
          <div className="space-y-1">
            {Object.keys(landingContent).map((lang) => (
              <div key={lang} className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <code className="bg-slate-100 px-2 py-0.5 rounded">
                  &lt;link rel="alternate" hrefLang="{lang}" href=".../{lang}" /&gt;
                </code>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-slate-900 mb-2 text-sm">📝 Instructions de déploiement</h4>
          <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
            <li>Téléchargez sitemap.xml et robots.txt</li>
            <li>Placez-les à la racine de votre site (même niveau que index.html)</li>
            <li>Soumettez sitemap.xml à Google Search Console</li>
            <li>Les balises hreflang sont déjà dans le code (react-helmet-async)</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}