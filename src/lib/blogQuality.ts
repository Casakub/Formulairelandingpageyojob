import { BlogArticle, BlogTranslation } from '../services/blogService';

export interface BlogQualityCheck {
  id: string;
  label: string;
  blocking: boolean;
  passed: boolean;
  hint: string;
}

export interface BlogQualityMetrics {
  wordCount: number;
  readingMinutes: number;
  h2Count: number;
  faqCount: number;
  sourcesCount: number;
  internalLinksCount: number;
}

export interface BlogQualityResult {
  score: number;
  checks: BlogQualityCheck[];
  blockingIssues: string[];
  warnings: string[];
  metrics: BlogQualityMetrics;
  publishReady: boolean;
}

function extractTextFromHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countMatches(text: string, regex: RegExp): number {
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function withinRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

export function evaluateBlogQuality(
  article: Partial<BlogArticle>,
  translation: Partial<BlogTranslation>
): BlogQualityResult {
  const content = translation.content || '';
  const plainText = extractTextFromHtml(content);
  const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(words / 200));
  const h2Count = countMatches(content, /<h2\b/gi);
  const internalLinksInHtml = countMatches(content, /<a[^>]+href="\/[^"]*"/gi);
  const internalLinksCount = Math.max(
    translation.internal_links?.length || 0,
    internalLinksInHtml
  );
  const faqCount = translation.faq_items?.length || 0;
  const sourcesCount = article.sources?.length || 0;

  const seoTitleLength = (translation.seo_title || '').trim().length;
  const seoDescLength = (translation.seo_description || '').trim().length;
  const hasMidCta = Boolean((translation.cta_mid_label || '').trim());
  const hasEndCta = Boolean((translation.cta_end_label || '').trim());

  const checks: BlogQualityCheck[] = [
    {
      id: 'title',
      label: 'Titre article',
      blocking: true,
      passed: Boolean((translation.title || '').trim()),
      hint: 'Renseigner un titre clair, orienté intention de recherche.',
    },
    {
      id: 'excerpt',
      label: 'Excerpt',
      blocking: true,
      passed: Boolean((translation.excerpt || '').trim()),
      hint: 'Ajouter un resume actionnable en 1-2 phrases.',
    },
    {
      id: 'slug',
      label: 'Slug SEO',
      blocking: true,
      passed: Boolean((article.slug || '').trim()) && isValidSlug((article.slug || '').trim()),
      hint: 'Format recommande: mots-cles-en-minuscule-separes-par-des-tirets.',
    },
    {
      id: 'meta_title',
      label: 'Meta title',
      blocking: true,
      passed: withinRange(seoTitleLength, 45, 60),
      hint: 'Vise 45-60 caracteres pour limiter la troncature.',
    },
    {
      id: 'meta_description',
      label: 'Meta description',
      blocking: true,
      passed: withinRange(seoDescLength, 120, 160),
      hint: 'Vise 120-160 caracteres avec proposition de valeur + intention.',
    },
    {
      id: 'content_depth',
      label: 'Profondeur de contenu',
      blocking: true,
      passed: words >= 450,
      hint: 'Objectif minimal 450 mots. Cible 900+ pour un article pilier.',
    },
    {
      id: 'heading_structure',
      label: 'Structure H2/H3',
      blocking: false,
      passed: h2Count >= 3,
      hint: 'Ajouter des H2 pour la scannabilite et les anchors de sommaire.',
    },
    {
      id: 'faq',
      label: 'FAQ',
      blocking: true,
      passed: faqCount >= 2,
      hint: 'Ajouter au moins 2 FAQ pour la comprehension et le schema FAQPage.',
    },
    {
      id: 'cta_mid',
      label: 'CTA mid-article',
      blocking: true,
      passed: hasMidCta,
      hint: 'Ajouter un CTA contextualise au milieu de l\'article.',
    },
    {
      id: 'cta_end',
      label: 'CTA fin article',
      blocking: true,
      passed: hasEndCta,
      hint: 'Ajouter un CTA de fin adapte a la persona.',
    },
    {
      id: 'sources',
      label: 'Sources officielles',
      blocking: true,
      passed: sourcesCount >= 1,
      hint: 'Ajouter au moins 1 source officielle pour la credibilite.',
    },
    {
      id: 'updated_date',
      label: 'Date de mise a jour',
      blocking: true,
      passed: Boolean(article.last_updated_at),
      hint: 'Renseigner une date de mise a jour explicite.',
    },
    {
      id: 'internal_links',
      label: 'Maillage interne',
      blocking: false,
      passed: internalLinksCount >= 2,
      hint: 'Ajouter au moins 2 liens internes vers contenus connexes.',
    },
  ];

  const blockingIssues = checks.filter((check) => check.blocking && !check.passed).map((check) => check.label);
  const warnings = checks.filter((check) => !check.blocking && !check.passed).map((check) => check.label);

  const passedWeight = checks.reduce((acc, check) => acc + (check.passed ? (check.blocking ? 10 : 5) : 0), 0);
  const maxWeight = checks.reduce((acc, check) => acc + (check.blocking ? 10 : 5), 0);
  const score = Math.round((passedWeight / Math.max(1, maxWeight)) * 100);

  return {
    score,
    checks,
    blockingIssues,
    warnings,
    metrics: {
      wordCount: words,
      readingMinutes,
      h2Count,
      faqCount,
      sourcesCount,
      internalLinksCount,
    },
    publishReady: blockingIssues.length === 0,
  };
}
