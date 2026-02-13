import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Types
export interface BlogArticle {
  id: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  author_id?: string;
  featured_image_url?: string;
  category?: string;
  tags: string[];
  published_at?: string;
  created_at: string;
  updated_at: string;
  translations?: BlogTranslation[];
}

export interface BlogTranslation {
  id?: string;
  article_id?: string;
  language_code: string;
  title: string;
  excerpt?: string;
  content?: string;
  seo_title?: string;
  seo_description?: string;
}

export interface BlogArticleWithTranslations extends BlogArticle {
  translations: BlogTranslation[];
}

// Client authentifié (admin dashboard)
function getAuthClient(): SupabaseClient {
  const sessionStr = localStorage.getItem('yojob_session');
  if (!sessionStr) throw new Error('Non authentifié');
  const session = JSON.parse(sessionStr);
  return createClient(supabaseUrl, publicAnonKey, {
    global: { headers: { Authorization: `Bearer ${session.access_token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Client public (pages blog visiteurs)
function getPublicClient(): SupabaseClient {
  return createClient(supabaseUrl, publicAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${publicAnonKey}` } },
  });
}

// =============================================================================
// ADMIN OPERATIONS (dashboard)
// =============================================================================

export async function getArticles(): Promise<BlogArticleWithTranslations[]> {
  const supabase = getAuthClient();
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*, translations:blog_article_translations(*)')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data || []) as BlogArticleWithTranslations[];
}

export async function getArticleById(id: string): Promise<BlogArticleWithTranslations | null> {
  const supabase = getAuthClient();
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*, translations:blog_article_translations(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as BlogArticleWithTranslations;
}

export async function createArticle(
  article: Partial<BlogArticle>,
  translations: BlogTranslation[]
): Promise<BlogArticle> {
  const supabase = getAuthClient();

  // Create article
  const { data: newArticle, error: articleError } = await supabase
    .from('blog_articles')
    .insert({
      slug: article.slug,
      status: article.status || 'draft',
      featured_image_url: article.featured_image_url,
      category: article.category,
      tags: article.tags || [],
      published_at: article.status === 'published' ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (articleError) throw articleError;

  // Insert translations
  if (translations.length > 0) {
    const translationRows = translations.map((t) => ({
      article_id: newArticle.id,
      language_code: t.language_code,
      title: t.title,
      excerpt: t.excerpt || '',
      content: t.content || '',
      seo_title: t.seo_title || '',
      seo_description: t.seo_description || '',
    }));

    const { error: transError } = await supabase
      .from('blog_article_translations')
      .insert(translationRows);

    if (transError) throw transError;
  }

  return newArticle as BlogArticle;
}

export async function updateArticle(
  id: string,
  article: Partial<BlogArticle>,
  translations: BlogTranslation[]
): Promise<void> {
  const supabase = getAuthClient();

  // Update article
  const updateData: Record<string, unknown> = {};
  if (article.slug !== undefined) updateData.slug = article.slug;
  if (article.status !== undefined) updateData.status = article.status;
  if (article.featured_image_url !== undefined) updateData.featured_image_url = article.featured_image_url;
  if (article.category !== undefined) updateData.category = article.category;
  if (article.tags !== undefined) updateData.tags = article.tags;
  if (article.status === 'published' && !article.published_at) {
    updateData.published_at = new Date().toISOString();
  }

  if (Object.keys(updateData).length > 0) {
    const { error } = await supabase
      .from('blog_articles')
      .update(updateData)
      .eq('id', id);
    if (error) throw error;
  }

  // Upsert translations
  for (const t of translations) {
    const { error } = await supabase
      .from('blog_article_translations')
      .upsert(
        {
          article_id: id,
          language_code: t.language_code,
          title: t.title,
          excerpt: t.excerpt || '',
          content: t.content || '',
          seo_title: t.seo_title || '',
          seo_description: t.seo_description || '',
        },
        { onConflict: 'article_id,language_code' }
      );
    if (error) throw error;
  }
}

export async function deleteArticle(id: string): Promise<void> {
  const supabase = getAuthClient();
  const { error } = await supabase.from('blog_articles').delete().eq('id', id);
  if (error) throw error;
}

// =============================================================================
// PUBLIC OPERATIONS (visitor-facing pages)
// =============================================================================

export async function getPublishedArticles(lang?: string): Promise<BlogArticleWithTranslations[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*, translations:blog_article_translations(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;

  // Filter translations to requested language (+ fr fallback)
  return (data || []).map((article: BlogArticleWithTranslations) => ({
    ...article,
    translations: lang
      ? article.translations.filter(
          (t) => t.language_code === lang || t.language_code === 'fr'
        )
      : article.translations,
  }));
}

export async function getPublishedArticleBySlug(
  slug: string,
  lang?: string
): Promise<BlogArticleWithTranslations | null> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*, translations:blog_article_translations(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }

  if (lang && data) {
    data.translations = data.translations.filter(
      (t: BlogTranslation) => t.language_code === lang || t.language_code === 'fr'
    );
  }

  return data as BlogArticleWithTranslations;
}

// =============================================================================
// IMAGE UPLOAD (Supabase Storage)
// =============================================================================

const BLOG_IMAGES_BUCKET = 'blog-images';

export async function uploadBlogImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Le fichier doit être une image');
  if (file.size > 5 * 1024 * 1024) throw new Error('L\'image ne doit pas dépasser 5 Mo');

  const supabase = getAuthClient();
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(BLOG_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteBlogImage(url: string): Promise<void> {
  const supabase = getAuthClient();
  const parts = url.split(`${BLOG_IMAGES_BUCKET}/`);
  const path = parts[parts.length - 1];
  if (!path) return;

  const { error } = await supabase.storage.from(BLOG_IMAGES_BUCKET).remove([path]);
  if (error) throw error;
}

// =============================================================================
// SITEMAP GENERATION (dynamique selon les traductions effectives)
// =============================================================================

/**
 * Genere les liens hreflang uniquement pour les langues disponibles
 */
function generateDynamicHreflangLinks(
  urlPath: string,
  availableLangs: string[],
  baseUrl: string
): string {
  const links = availableLangs.map((lang) => {
    const href = lang === 'fr' ? `${baseUrl}${urlPath}` : `${baseUrl}/${lang}${urlPath}`;
    return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`;
  });

  // x-default pointe vers la version FR (ou premiere langue dispo)
  const defaultLang = availableLangs.includes('fr') ? 'fr' : availableLangs[0];
  const defaultHref =
    defaultLang === 'fr'
      ? `${baseUrl}${urlPath}`
      : `${baseUrl}/${defaultLang}${urlPath}`;
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}" />`
  );

  return links.join('\n');
}

export async function generateBlogSitemap(baseUrl = 'https://yojob.fr'): Promise<string> {
  // Fetch tous les articles avec TOUTES les traductions (pas de filtre langue)
  const articles = await getPublishedArticles();
  const now = new Date().toISOString().split('T')[0];

  // Collecte toutes les langues ayant au moins un article
  const allBlogLangs = new Set<string>();
  for (const article of articles) {
    for (const t of article.translations) {
      allBlogLangs.add(t.language_code);
    }
  }
  const blogIndexLangs = Array.from(allBlogLangs).sort();

  // Blog index : hreflang pour toutes les langues qui ont du contenu
  const blogIndexUrl = `  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
${generateDynamicHreflangLinks('/blog', blogIndexLangs.length > 0 ? blogIndexLangs : ['fr'], baseUrl)}
  </url>`;

  // Articles : hreflang seulement pour les langues avec traduction effective
  const urls = articles
    .map((article) => {
      const articleLangs = article.translations
        .map((t) => t.language_code)
        .sort();

      if (articleLangs.length === 0) return '';

      const path = `/blog/${article.slug}`;
      return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${article.updated_at ? article.updated_at.split('T')[0] : now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
${generateDynamicHreflangLinks(path, articleLangs, baseUrl)}
  </url>`;
    })
    .filter(Boolean)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Blog sitemap - Auto-generated on ${now} -->
  <!-- Langues incluses dynamiquement selon les traductions effectives -->
${blogIndexUrl}
${urls}
</urlset>`;
}

export function generateSitemapIndex(baseUrl = 'https://yojob.fr'): string {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-about.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Helper: generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}