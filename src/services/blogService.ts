import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export type BlogStatus = 'draft' | 'in_review' | 'published' | 'archived';
export type BlogPersonaTarget = 'enterprise' | 'agency' | 'both';
export type BlogRiskLevel = 'low' | 'medium' | 'high';

export interface BlogSource {
  label: string;
  url: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogInternalLink {
  label: string;
  url: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  status: BlogStatus;
  author_id?: string;
  featured_image_url?: string;
  category?: string;
  tags: string[];
  published_at?: string;
  created_at: string;
  updated_at: string;
  persona_target: BlogPersonaTarget;
  risk_level: BlogRiskLevel;
  cta_persona: BlogPersonaTarget;
  last_updated_at?: string;
  sources: BlogSource[];
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
  faq_items?: BlogFaqItem[];
  key_points?: string[];
  checklist_items?: string[];
  cta_mid_label?: string;
  cta_mid_text?: string;
  cta_end_label?: string;
  cta_end_text?: string;
  internal_links?: BlogInternalLink[];
}

export interface BlogArticleWithTranslations extends BlogArticle {
  translations: BlogTranslation[];
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === 'string' ? item.trim() : '')).filter(Boolean);
}

function normalizeFaqItems(value: unknown): BlogFaqItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      question: typeof (item as BlogFaqItem)?.question === 'string' ? (item as BlogFaqItem).question.trim() : '',
      answer: typeof (item as BlogFaqItem)?.answer === 'string' ? (item as BlogFaqItem).answer.trim() : '',
    }))
    .filter((item) => item.question && item.answer);
}

function normalizeInternalLinks(value: unknown): BlogInternalLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      label: typeof (item as BlogInternalLink)?.label === 'string' ? (item as BlogInternalLink).label.trim() : '',
      url: typeof (item as BlogInternalLink)?.url === 'string' ? (item as BlogInternalLink).url.trim() : '',
    }))
    .filter((item) => item.label && item.url);
}

function normalizeSources(value: unknown): BlogSource[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      label: typeof (item as BlogSource)?.label === 'string' ? (item as BlogSource).label.trim() : '',
      url: typeof (item as BlogSource)?.url === 'string' ? (item as BlogSource).url.trim() : '',
    }))
    .filter((item) => item.label && item.url);
}

function normalizePersona(value: unknown, fallback: BlogPersonaTarget = 'both'): BlogPersonaTarget {
  return value === 'enterprise' || value === 'agency' || value === 'both' ? value : fallback;
}

function normalizeRiskLevel(value: unknown, fallback: BlogRiskLevel = 'medium'): BlogRiskLevel {
  return value === 'low' || value === 'medium' || value === 'high' ? value : fallback;
}

function normalizeStatus(value: unknown): BlogStatus {
  return value === 'draft' || value === 'in_review' || value === 'published' || value === 'archived'
    ? value
    : 'draft';
}

function normalizeTranslation(translation: any): BlogTranslation {
  return {
    ...translation,
    language_code: typeof translation?.language_code === 'string' ? translation.language_code : 'fr',
    title: typeof translation?.title === 'string' ? translation.title : '',
    excerpt: typeof translation?.excerpt === 'string' ? translation.excerpt : '',
    content: typeof translation?.content === 'string' ? translation.content : '',
    seo_title: typeof translation?.seo_title === 'string' ? translation.seo_title : '',
    seo_description: typeof translation?.seo_description === 'string' ? translation.seo_description : '',
    faq_items: normalizeFaqItems(translation?.faq_items),
    key_points: normalizeStringArray(translation?.key_points),
    checklist_items: normalizeStringArray(translation?.checklist_items),
    cta_mid_label: typeof translation?.cta_mid_label === 'string' ? translation.cta_mid_label : '',
    cta_mid_text: typeof translation?.cta_mid_text === 'string' ? translation.cta_mid_text : '',
    cta_end_label: typeof translation?.cta_end_label === 'string' ? translation.cta_end_label : '',
    cta_end_text: typeof translation?.cta_end_text === 'string' ? translation.cta_end_text : '',
    internal_links: normalizeInternalLinks(translation?.internal_links),
  };
}

function normalizeArticle(article: any): BlogArticleWithTranslations {
  return {
    ...article,
    status: normalizeStatus(article?.status),
    persona_target: normalizePersona(article?.persona_target),
    risk_level: normalizeRiskLevel(article?.risk_level),
    cta_persona: normalizePersona(article?.cta_persona),
    tags: normalizeStringArray(article?.tags),
    sources: normalizeSources(article?.sources),
    translations: Array.isArray(article?.translations)
      ? article.translations.map(normalizeTranslation)
      : [],
  };
}

function buildTranslationPayload(articleId: string, translation: BlogTranslation) {
  return {
    article_id: articleId,
    language_code: translation.language_code,
    title: translation.title || '',
    excerpt: translation.excerpt || '',
    content: translation.content || '',
    seo_title: translation.seo_title || '',
    seo_description: translation.seo_description || '',
    faq_items: translation.faq_items || [],
    key_points: translation.key_points || [],
    checklist_items: translation.checklist_items || [],
    cta_mid_label: translation.cta_mid_label || '',
    cta_mid_text: translation.cta_mid_text || '',
    cta_end_label: translation.cta_end_label || '',
    cta_end_text: translation.cta_end_text || '',
    internal_links: translation.internal_links || [],
  };
}

function filterTranslationsForLang(
  article: BlogArticleWithTranslations,
  lang?: string
): BlogArticleWithTranslations {
  if (!lang) return article;
  return {
    ...article,
    translations: article.translations.filter(
      (translation) => translation.language_code === lang || translation.language_code === 'fr'
    ),
  };
}

function getAuthClient(): SupabaseClient {
  const sessionStr = localStorage.getItem('yojob_session');
  if (!sessionStr) throw new Error('Non authentifie');
  const session = JSON.parse(sessionStr);
  return createClient(supabaseUrl, publicAnonKey, {
    global: { headers: { Authorization: `Bearer ${session.access_token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function getPublicClient(): SupabaseClient {
  return createClient(supabaseUrl, publicAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${publicAnonKey}` } },
  });
}

export async function getArticles(): Promise<BlogArticleWithTranslations[]> {
  const supabase = getAuthClient();
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*, translations:blog_article_translations(*)')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeArticle);
}

export async function getArticleById(id: string): Promise<BlogArticleWithTranslations | null> {
  const supabase = getAuthClient();
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*, translations:blog_article_translations(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return normalizeArticle(data);
}

export async function createArticle(
  article: Partial<BlogArticle>,
  translations: BlogTranslation[]
): Promise<BlogArticle> {
  const supabase = getAuthClient();

  const { data: newArticle, error: articleError } = await supabase
    .from('blog_articles')
    .insert({
      slug: article.slug,
      status: article.status || 'draft',
      featured_image_url: article.featured_image_url,
      category: article.category,
      tags: article.tags || [],
      published_at: article.status === 'published' ? new Date().toISOString() : null,
      persona_target: article.persona_target || 'both',
      risk_level: article.risk_level || 'medium',
      cta_persona: article.cta_persona || article.persona_target || 'both',
      last_updated_at: article.last_updated_at || new Date().toISOString(),
      sources: article.sources || [],
    })
    .select()
    .single();

  if (articleError) throw articleError;

  if (translations.length > 0) {
    const translationRows = translations.map((translation) =>
      buildTranslationPayload(newArticle.id, translation)
    );

    const { error: transError } = await supabase
      .from('blog_article_translations')
      .insert(translationRows);

    if (transError) throw transError;
  }

  return normalizeArticle({ ...newArticle, translations: [] });
}

export async function updateArticle(
  id: string,
  article: Partial<BlogArticle>,
  translations: BlogTranslation[]
): Promise<void> {
  const supabase = getAuthClient();

  const updateData: Record<string, unknown> = {};
  if (article.slug !== undefined) updateData.slug = article.slug;
  if (article.status !== undefined) updateData.status = article.status;
  if (article.featured_image_url !== undefined) updateData.featured_image_url = article.featured_image_url;
  if (article.category !== undefined) updateData.category = article.category;
  if (article.tags !== undefined) updateData.tags = article.tags;
  if (article.persona_target !== undefined) updateData.persona_target = article.persona_target;
  if (article.risk_level !== undefined) updateData.risk_level = article.risk_level;
  if (article.cta_persona !== undefined) updateData.cta_persona = article.cta_persona;
  if (article.sources !== undefined) updateData.sources = article.sources;
  if (article.last_updated_at !== undefined) updateData.last_updated_at = article.last_updated_at;

  if (article.status === 'published') {
    const { data: existing } = await supabase
      .from('blog_articles')
      .select('published_at')
      .eq('id', id)
      .single();

    if (!existing?.published_at) {
      updateData.published_at = new Date().toISOString();
    }
  }

  if (Object.keys(updateData).length > 0) {
    const { error } = await supabase.from('blog_articles').update(updateData).eq('id', id);
    if (error) throw error;
  }

  for (const translation of translations) {
    const { error } = await supabase
      .from('blog_article_translations')
      .upsert(buildTranslationPayload(id, translation), { onConflict: 'article_id,language_code' });

    if (error) throw error;
  }
}

export async function deleteArticle(id: string): Promise<void> {
  const supabase = getAuthClient();
  const { error } = await supabase.from('blog_articles').delete().eq('id', id);
  if (error) throw error;
}

export async function getPublishedArticles(lang?: string): Promise<BlogArticleWithTranslations[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*, translations:blog_article_translations(*)')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) throw error;

  return (data || [])
    .map(normalizeArticle)
    .map((article) => filterTranslationsForLang(article, lang));
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
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  const normalized = normalizeArticle(data);
  return filterTranslationsForLang(normalized, lang);
}

export async function getRelatedPublishedArticles(
  currentArticle: Pick<BlogArticle, 'id' | 'category' | 'tags'>,
  lang?: string,
  limit = 3
): Promise<BlogArticleWithTranslations[]> {
  const all = await getPublishedArticles(lang);
  const candidates = all.filter((item) => item.id !== currentArticle.id);

  return candidates
    .map((item) => {
      let score = 0;
      if (currentArticle.category && item.category === currentArticle.category) score += 3;
      const sharedTags = item.tags.filter((tag) => currentArticle.tags.includes(tag)).length;
      score += sharedTags;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

const BLOG_IMAGES_BUCKET = 'blog-images';

export async function uploadBlogImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Le fichier doit etre une image');
  if (file.size > 5 * 1024 * 1024) throw new Error("L'image ne doit pas depasser 5 Mo");

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

const HREFLANG_CODES = [
  'fr',
  'en',
  'de',
  'es',
  'it',
  'nl',
  'pt',
  'pl',
  'cs',
  'sk',
  'hu',
  'ro',
  'bg',
  'hr',
  'sl',
  'et',
  'lv',
  'lt',
  'el',
  'sv',
  'da',
  'fi',
  'no',
];

function generateHreflangLinks(path: string, baseUrl: string): string {
  return (
    HREFLANG_CODES.map((lang) => {
      const href = lang === 'fr' ? `${baseUrl}${path}` : `${baseUrl}/${lang}${path}`;
      return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`;
    }).join('\n') +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${path}" />`
  );
}

export async function generateBlogSitemap(baseUrl = 'https://yojob.fr'): Promise<string> {
  const articles = await getPublishedArticles();
  const now = new Date().toISOString().split('T')[0];

  const urls = articles
    .map((article) => {
      const path = `/blog/${article.slug}`;
      return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${article.updated_at ? article.updated_at.split('T')[0] : now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
${generateHreflangLinks(path, baseUrl)}
  </url>`;
    })
    .join('\n');

  const blogIndexUrl = `  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
${generateHreflangLinks('/blog', baseUrl)}
  </url>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Blog sitemap - Auto-generated on ${now} -->
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

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
