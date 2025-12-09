import type { LandingContentState } from '../types/landing';

interface SitemapGeneratorProps {
  landingContent: LandingContentState;
  baseUrl?: string;
}

/**
 * 🗺️ Sitemap XML Generator
 * Génère un sitemap.xml avec toutes les langues disponibles
 */
export function generateSitemap(landingContent: LandingContentState, baseUrl = 'https://yojob.fr'): string {
  const now = new Date().toISOString();
  
  const urls = Object.keys(landingContent).map((lang) => {
    const url = lang === 'fr' ? baseUrl : `${baseUrl}/${lang}`;
    const priority = lang === 'fr' ? '1.0' : '0.8';
    
    return `
  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>`;
}

/**
 * Bouton pour télécharger le sitemap.xml
 */
export function SitemapGenerator({ landingContent, baseUrl }: SitemapGeneratorProps) {
  const handleDownload = () => {
    const sitemap = generateSitemap(landingContent, baseUrl);
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Télécharger sitemap.xml
    </button>
  );
}
