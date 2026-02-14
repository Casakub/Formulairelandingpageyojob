/* eslint-disable no-console */
/**
 * generate-sitemaps.cjs
 *
 * Script standalone qui :
 * 1. Connecte a Supabase (public anon key)
 * 2. Recupere les articles publies + leurs traductions effectives
 * 3. Genere sitemap-blog.xml avec hreflang UNIQUEMENT pour les langues qui existent
 * 4. Met a jour sitemap.xml (index) pour inclure sitemap-blog.xml
 * 5. Ecrit le tout dans src/public/
 *
 * Usage :
 *   node src/scripts/generate-sitemaps.cjs          # Generation directe depuis Supabase DB
 *   node src/scripts/generate-sitemaps.cjs --pull    # Telecharge depuis Supabase Storage
 *                                                     (les versions sauvees via le dashboard)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ─── Supabase config (meme valeurs que info.tsx) ───
const PROJECT_ID = 'vhpbmckgxtdyxdwhmdxy';
const ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE5ODUsImV4cCI6MjA3OTgzNzk4NX0.Vv0nIgRa91pi-trbK9drGTF6uoeCvvm4L2HEJ4UlyBo';
const SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;
const BASE_URL = 'https://yojob.fr';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// ─── Helpers HTTP (pas besoin de npm install) ───

function supabaseGet(tablePath) {
  return new Promise((resolve, reject) => {
    const url = new URL(`/rest/v1/${tablePath}`, SUPABASE_URL);
    const options = {
      method: 'GET',
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        Accept: 'application/json',
      },
    };

    https
      .get(url.toString(), options, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode >= 400) {
            return reject(new Error(`Supabase ${res.statusCode}: ${body}`));
          }
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error(`JSON parse error: ${e.message}`));
          }
        });
      })
      .on('error', reject);
  });
}

// ─── Fetch published articles + translations ───

async function fetchPublishedArticles() {
  // Fetch published articles
  const articles = await supabaseGet(
    'blog_articles?status=eq.published&order=published_at.desc'
  );

  if (!articles || articles.length === 0) {
    console.log('[sitemaps] Aucun article publie trouve.');
    return [];
  }

  // Fetch all translations for these articles
  const articleIds = articles.map((a) => a.id);
  const translations = await supabaseGet(
    `blog_article_translations?article_id=in.(${articleIds.join(',')})`
  );

  // Group translations by article_id
  const translationsByArticle = {};
  for (const t of translations || []) {
    if (!translationsByArticle[t.article_id]) {
      translationsByArticle[t.article_id] = [];
    }
    translationsByArticle[t.article_id].push(t);
  }

  // Merge
  return articles.map((article) => ({
    ...article,
    translations: translationsByArticle[article.id] || [],
  }));
}

// ─── XML generation ───

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Genere les liens hreflang UNIQUEMENT pour les langues disponibles
 */
function generateHreflangLinks(articlePath, availableLangs, baseUrl) {
  const links = availableLangs.map((lang) => {
    const href =
      lang === 'fr'
        ? `${baseUrl}${articlePath}`
        : `${baseUrl}/${lang}${articlePath}`;
    return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href)}" />`;
  });

  // x-default pointe toujours vers la version FR (ou la premiere langue dispo)
  const defaultLang = availableLangs.includes('fr') ? 'fr' : availableLangs[0];
  const defaultHref =
    defaultLang === 'fr'
      ? `${baseUrl}${articlePath}`
      : `${baseUrl}/${defaultLang}${articlePath}`;
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultHref)}" />`
  );

  return links.join('\n');
}

function generateBlogSitemap(articles) {
  const now = new Date().toISOString().split('T')[0];

  // Collecte toutes les langues ayant au moins un article
  const allBlogLangs = new Set();
  for (const article of articles) {
    for (const t of article.translations) {
      allBlogLangs.add(t.language_code);
    }
  }

  // Blog index : hreflang pour toutes les langues qui ont du contenu
  const blogIndexLangs = Array.from(allBlogLangs).sort();
  const blogIndexUrl = `  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
${generateHreflangLinks('/blog', blogIndexLangs.length > 0 ? blogIndexLangs : ['fr'], BASE_URL)}
  </url>`;

  // Articles : hreflang seulement pour les langues avec traduction effective
  const articleUrls = articles
    .map((article) => {
      const articleLangs = article.translations
        .map((t) => t.language_code)
        .sort();

      if (articleLangs.length === 0) return null;

      const articlePath = `/blog/${escapeXml(article.slug)}`;
      const lastmod = article.updated_at
        ? article.updated_at.split('T')[0]
        : now;

      return `  <url>
    <loc>${BASE_URL}${articlePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
${generateHreflangLinks(`/blog/${article.slug}`, articleLangs, BASE_URL)}
  </url>`;
    })
    .filter(Boolean);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Blog sitemap - Auto-generated on ${now} -->
  <!-- Langues incluses dynamiquement selon les traductions effectives -->
${blogIndexUrl}
${articleUrls.join('\n')}
</urlset>`;
}

function generateSitemapIndex() {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-about.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-blog.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// ─── Download helper (Supabase Storage) ───

const BLOG_IMAGES_BUCKET = 'blog-images';
const SITEMAPS_STORAGE_PREFIX = '_sitemaps';

function downloadFromStorage(fileName) {
  const storageUrl = `${SUPABASE_URL}/storage/v1/object/public/${BLOG_IMAGES_BUCKET}/${SITEMAPS_STORAGE_PREFIX}/${fileName}`;
  return new Promise((resolve, reject) => {
    https
      .get(storageUrl, (res) => {
        if (res.statusCode === 404) {
          return reject(new Error(`Fichier non trouve dans le storage: ${fileName}`));
        }
        if (res.statusCode >= 400) {
          return reject(new Error(`Storage HTTP ${res.statusCode} pour ${fileName}`));
        }
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve(body));
      })
      .on('error', reject);
  });
}

// ─── Mode --pull : telecharge depuis Supabase Storage ───

async function pullFromStorage() {
  console.log('[sitemaps] Mode --pull : telechargement depuis Supabase Storage...');
  console.log(`[sitemaps] Dossier cible : ${PUBLIC_DIR}`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const filesToPull = ['sitemap.xml', 'sitemap-blog.xml'];

  for (const fileName of filesToPull) {
    console.log(`[sitemaps] Telechargement de ${fileName}...`);
    const content = await downloadFromStorage(fileName);
    const outputPath = path.join(PUBLIC_DIR, fileName);
    fs.writeFileSync(outputPath, content, 'utf8');
    const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
    console.log(`[sitemaps] ${fileName} ecrit (${sizeKB} KB)`);
  }

  console.log('[sitemaps] Pull termine. Fichiers ecrits dans src/public/');
}

// ─── Mode par defaut : generation depuis Supabase DB ───

async function generateFromDB() {
  console.log('[sitemaps] Generation des sitemaps depuis Supabase DB...');
  console.log(`[sitemaps] Dossier cible : ${PUBLIC_DIR}`);

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    console.log(`[sitemaps] Dossier ${PUBLIC_DIR} cree.`);
  }

  // 1. Fetch articles
  console.log('[sitemaps] Recuperation des articles publies depuis Supabase...');
  const articles = await fetchPublishedArticles();
  console.log(`[sitemaps] ${articles.length} article(s) publie(s) trouve(s).`);

  for (const article of articles) {
    const langs = article.translations.map((t) => t.language_code).join(', ');
    console.log(`[sitemaps]   - ${article.slug} [${langs}]`);
  }

  // 2. Generate sitemap-blog.xml
  const blogSitemap = generateBlogSitemap(articles);
  const blogPath = path.join(PUBLIC_DIR, 'sitemap-blog.xml');
  fs.writeFileSync(blogPath, blogSitemap, 'utf8');
  const blogSize = (Buffer.byteLength(blogSitemap, 'utf8') / 1024).toFixed(1);
  console.log(`[sitemaps] sitemap-blog.xml ecrit (${blogSize} KB)`);

  // 3. Update sitemap.xml (index)
  const sitemapIndex = generateSitemapIndex();
  const indexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(indexPath, sitemapIndex, 'utf8');
  console.log('[sitemaps] sitemap.xml (index) mis a jour avec sitemap-blog.xml');

  console.log('[sitemaps] Generation terminee.');
}

// ─── Main ───

const mode = process.argv.includes('--pull') ? 'pull' : 'generate';

const main = mode === 'pull' ? pullFromStorage : generateFromDB;

main().catch((err) => {
  console.error('[sitemaps] Erreur:', err);
  process.exit(1);
});