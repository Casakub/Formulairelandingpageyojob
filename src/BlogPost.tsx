import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ArrowLeft,
  Loader2,
  BookOpen,
  Clock,
  ArrowRight,
  Share2,
  ListTree,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Link2,
  Building2,
  Scale,
} from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import {
  BlogArticleWithTranslations,
  BlogTranslation,
  getPublishedArticles,
  getPublishedArticleBySlug,
} from './services/blogService';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion';

interface BlogPostProps {
  slug: string;
}

interface HeadingItem {
  id: string;
  title: string;
  level: number;
}

type BlogPersonaTarget = 'enterprise' | 'agency' | 'both';

const PERSONA_COPY: Record<
  BlogPersonaTarget,
  { badge: string; title: string; subtitle: string; cta: string }
> = {
  enterprise: {
    badge: 'Pour les entreprises',
    title: 'Besoin d\'un cadrage conformité pour votre prochain détachement ?',
    subtitle:
      'Nous sécurisons A1, documentation, conformité pays d\'accueil et coordination opérationnelle.',
    cta: 'Demander un devis entreprise',
  },
  agency: {
    badge: 'Pour les agences de staffing',
    title: 'Vous placez des talents en Europe et voulez fiabiliser vos process ?',
    subtitle:
      'YOJOB vous aide à industrialiser vos démarches de conformité et à réduire le risque de sanctions.',
    cta: 'Demander un devis agence',
  },
  both: {
    badge: 'Pour entreprises et agences',
    title: 'Évaluez votre exposition réglementaire sur vos missions en Europe',
    subtitle:
      'Recevez un cadrage clair et un plan d\'actions opérationnel adapté à votre organisation.',
    cta: 'Demander un devis personnalisé',
  },
};

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .trim();
}

function enrichContentWithHeadingIds(html: string): string {
  if (!html || typeof window === 'undefined') return html;
  const parser = new DOMParser();
  const document = parser.parseFromString(`<article>${html}</article>`, 'text/html');
  const root = document.body.firstElementChild as HTMLElement | null;
  if (!root) return html;

  const usedIds = new Map<string, number>();
  root.querySelectorAll('h2, h3').forEach((heading) => {
    const text = heading.textContent?.trim() || 'section';
    const base = slugifyHeading(text) || 'section';
    const index = usedIds.get(base) || 0;
    usedIds.set(base, index + 1);
    const id = index === 0 ? base : `${base}-${index + 1}`;
    heading.setAttribute('id', id);
    (heading as HTMLElement).style.scrollMarginTop = '80px';
  });

  return root.innerHTML;
}

function normalizeComparableText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripLeadingTitleHeading(html: string, title: string): string {
  if (!html || !title || typeof window === 'undefined') return html;

  const parser = new DOMParser();
  const document = parser.parseFromString(`<article>${html}</article>`, 'text/html');
  const root = document.body.firstElementChild as HTMLElement | null;
  if (!root) return html;

  // Remove any leading H1 that matches or closely matches the article title
  const firstHeading = root.querySelector('h1');
  if (!firstHeading) return html;

  const headingText = normalizeComparableText(firstHeading.textContent || '');
  const titleText = normalizeComparableText(title);

  // Match exactly, or if one contains the other (handles slight variations)
  if (
    headingText &&
    titleText &&
    (headingText === titleText ||
      headingText.includes(titleText) ||
      titleText.includes(headingText))
  ) {
    firstHeading.remove();
  }

  return root.innerHTML;
}

function extractHeadings(html: string): HeadingItem[] {
  if (!html || typeof window === 'undefined') return [];
  const parser = new DOMParser();
  const document = parser.parseFromString(`<article>${html}</article>`, 'text/html');
  const root = document.body.firstElementChild as HTMLElement | null;
  if (!root) return [];

  return Array.from(root.querySelectorAll('h2, h3')).map((heading) => ({
    id: heading.getAttribute('id') || slugifyHeading(heading.textContent || ''),
    title: (heading.textContent || '').trim(),
    level: heading.tagName === 'H2' ? 2 : 3,
  }));
}

function splitContentForMidCta(html: string): {
  beforeHtml: string;
  afterHtml: string;
  hasSplit: boolean;
} {
  if (!html || typeof window === 'undefined') {
    return { beforeHtml: html, afterHtml: '', hasSplit: false };
  }

  const parser = new DOMParser();
  const document = parser.parseFromString(`<article>${html}</article>`, 'text/html');
  const root = document.body.firstElementChild as HTMLElement | null;
  if (!root) return { beforeHtml: html, afterHtml: '', hasSplit: false };

  const nodes = Array.from(root.childNodes).filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
    return true;
  });

  if (nodes.length < 6) {
    return { beforeHtml: html, afterHtml: '', hasSplit: false };
  }

  const splitIndex = Math.max(2, Math.floor(nodes.length / 2));
  const nodeToHtml = (node: ChildNode): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return `<p>${node.textContent?.trim() || ''}</p>`;
    }
    return (node as HTMLElement).outerHTML || '';
  };

  return {
    beforeHtml: nodes.slice(0, splitIndex).map(nodeToHtml).join(''),
    afterHtml: nodes.slice(splitIndex).map(nodeToHtml).join(''),
    hasSplit: true,
  };
}

function getPersonaFromArticle(article: BlogArticleWithTranslations | null): BlogPersonaTarget {
  if (!article) return 'both';
  return article.cta_persona || article.persona_target || 'both';
}

export default function BlogPost({ slug }: BlogPostProps) {
  const { currentLanguage: lang } = useLanguageManager();
  const [article, setArticle] = useState<BlogArticleWithTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticleWithTranslations[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);

  const langPrefix = lang === 'fr' ? '' : `/${lang}`;

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getPublishedArticleBySlug(slug, lang)
      .then((data) => {
        if (!data) setNotFound(true);
        else setArticle(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug, lang]);

  useEffect(() => {
    if (!article) return;
    getPublishedArticles(lang)
      .then((allArticles) => {
        const candidates = allArticles.filter((item) => item.id !== article.id);
        const ranked = candidates
          .map((item) => {
            let score = 0;
            if (article.category && item.category === article.category) score += 3;
            const sharedTags = (item.tags || []).filter((tag) => (article.tags || []).includes(tag)).length;
            score += sharedTags;
            return { item, score };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map(({ item }) => item);
        setRelatedArticles(ranked);
      })
      .catch((error) => console.error('Error loading related articles:', error));
  }, [article, lang]);

  const translation: BlogTranslation | undefined = article
    ? article.translations.find((item) => item.language_code === lang) ||
      article.translations.find((item) => item.language_code === 'fr')
    : undefined;

  const normalizedContent = useMemo(() => {
    const withIds = enrichContentWithHeadingIds(translation?.content || '');
    return stripLeadingTitleHeading(withIds, translation?.title || '');
  }, [translation?.content, translation?.title]);

  const readingTime = useMemo(
    () => (normalizedContent ? estimateReadingTime(normalizedContent) : 0),
    [normalizedContent]
  );

  const headings = useMemo(() => extractHeadings(normalizedContent), [normalizedContent]);
  const splitContent = useMemo(() => splitContentForMidCta(normalizedContent), [normalizedContent]);
  const faqItems = translation?.faq_items || [];

  const articleSchema = article && translation
    ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: translation.seo_title || translation.title,
      description: translation.seo_description || translation.excerpt || '',
      image: article.featured_image_url || 'https://yojob.fr/og-image-yojob-1200x630.svg',
      datePublished: article.published_at,
      dateModified: article.last_updated_at || article.updated_at,
      author: { '@type': 'Organization', name: 'YOJOB', url: 'https://yojob.fr' },
      publisher: {
        '@type': 'Organization',
        name: 'YOJOB',
        url: 'https://yojob.fr',
        logo: { '@type': 'ImageObject', url: 'https://yojob.fr/favicon.svg' },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://yojob.fr${langPrefix}/blog/${slug}`,
      },
    }
    : null;

  const faqSchema = faqItems.length > 0
    ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }
    : null;

  const persona = getPersonaFromArticle(article);
  const personaCopy = PERSONA_COPY[persona];
  const devisLink = `${langPrefix}/devis?source=blog&persona=${persona}&article=${encodeURIComponent(slug)}`;
  const midCtaLabel = (translation?.cta_mid_label || '').trim() || personaCopy.cta;
  const midCtaText = (translation?.cta_mid_text || '').trim() || personaCopy.subtitle;
  const endCtaLabel = (translation?.cta_end_label || '').trim() || personaCopy.cta;
  const endCtaText = (translation?.cta_end_text || '').trim() || personaCopy.subtitle;

  // Reading progress
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const maxScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(100, Math.max(0, (window.scrollY / maxScrollable) * 100));
      setReadingProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [article, lang]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: translation?.title, url });
      } catch {
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handleTocClick = (heading: HeadingItem) => {
    const target = document.getElementById(heading.id);
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState({}, '', `#${heading.id}`);
  };

  const MidArticleCta = (
    <div className="my-12 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 backdrop-blur-sm sm:p-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-400">{personaCopy.badge}</p>
      <h3 className="mb-2 text-xl font-bold leading-tight text-white">{midCtaLabel}</h3>
      <p className="mb-5 text-sm leading-relaxed text-white/70">{midCtaText}</p>
      <a
        href={devisLink}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-2.5 font-medium text-white shadow-md shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-600/25 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] motion-reduce:transition-none sm:w-auto"
      >
        {midCtaLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );

  const articleBodyClassName = `blog-article-content prose prose-lg prose-invert max-w-none
    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
    prose-h2:mb-4 prose-h2:mt-14 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3 prose-h2:text-[1.65rem]
    prose-h3:mb-3 prose-h3:mt-10 prose-h3:text-[1.3rem] prose-h3:text-white
    prose-p:my-5 prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-white/75
    prose-a:font-medium prose-a:text-cyan-400 prose-a:underline-offset-2 hover:prose-a:text-cyan-300 hover:prose-a:underline
    prose-strong:font-semibold prose-strong:text-white
    prose-ul:my-5 prose-ul:space-y-2 prose-ol:my-5 prose-ol:space-y-2
    prose-li:text-white/75 prose-li:marker:text-cyan-400
    prose-blockquote:my-8 prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-cyan-500/10 prose-blockquote:px-5 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-white/80
    prose-img:my-8 prose-img:rounded-2xl prose-img:shadow-lg prose-img:shadow-black/30
    prose-hr:my-12 prose-hr:border-white/10
    prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-cyan-400
    prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/30`;

  return (
    <>
      {translation ? (
        <SEOHead
          title={`${translation.seo_title || translation.title} | YOJOB Blog`}
          description={translation.seo_description || translation.excerpt || ''}
        />
      ) : (
        <SEOHead title="Blog - YOJOB" description="Article de blog YOJOB" />
      )}

      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-slate-200/30" role="progressbar" aria-valuenow={Math.round(readingProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Progression de lecture">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-[width] duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
        {/* Background ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* ── Dark hero zone (header + breadcrumb + article hero) ── */}
        <div className="relative">

          {/* ── Sticky header ── */}
          <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0e27]/80 backdrop-blur-xl">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-14 items-center justify-between">
                <a href={langPrefix || '/'} className="group flex items-center gap-3" aria-label="YOJOB — Accueil">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 p-0.5 transition-all group-hover:shadow-lg group-hover:shadow-cyan-500/20 motion-reduce:transition-none">
                    <div className="flex h-full w-full items-center justify-center rounded-[5px] bg-[#0a0e27]">
                      <LogoSvg className="h-7 w-7" />
                    </div>
                  </div>
                  <span className="text-base font-bold text-white">YOJOB</span>
                </a>
                <div className="flex items-center gap-2">
                  {translation && (
                    <button
                      onClick={handleShare}
                      aria-label="Partager cet article"
                      className="rounded-lg p-2 text-white/50 transition-all hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] motion-reduce:transition-none"
                      title="Partager"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  )}
                  <a
                    href={`${langPrefix}/blog`}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Blog
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center py-40">
              <Loader2 className="h-8 w-8 animate-spin text-white/50" aria-label="Chargement" />
            </div>
          )}

          {/* Not found state */}
          {notFound && !loading && (
            <div className="px-4 py-40 text-center">
              <BookOpen className="mx-auto mb-4 h-16 w-16 text-white/20" />
              <h1 className="mb-2 text-2xl font-bold text-white">Article introuvable</h1>
              <p className="mb-6 text-white/50">Cet article n&apos;existe pas ou n&apos;est pas encore publié.</p>
              <a
                href={`${langPrefix}/blog`}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour au blog
              </a>
            </div>
          )}

          {/* ── Article hero ── */}
          {article && translation && !loading && (
            <div className="relative px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
              <div className="mx-auto max-w-4xl">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-xs text-white/50" aria-label="Fil d'Ariane">
                  <a href={langPrefix || '/'} className="transition-colors hover:text-white/80 focus-visible:underline">Accueil</a>
                  <span aria-hidden="true">/</span>
                  <a href={`${langPrefix}/blog`} className="transition-colors hover:text-white/80 focus-visible:underline">Blog</a>
                  {article.category && (
                    <>
                      <span aria-hidden="true">/</span>
                      <span className="text-cyan-300/80">{article.category}</span>
                    </>
                  )}
                </nav>

                {/* Badges */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {article.category && (
                    <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      {article.category}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                    <Building2 className="h-3 w-3" />
                    {article.persona_target === 'enterprise'
                      ? 'Entreprise'
                      : article.persona_target === 'agency'
                        ? 'Agence'
                        : 'Entreprise + Agence'}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
                    <Scale className="h-3 w-3" />
                    {article.risk_level === 'high'
                      ? 'Risque élevé'
                      : article.risk_level === 'medium'
                        ? 'Risque modéré'
                        : 'Risque faible'}
                  </span>
                </div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl"
                >
                  {translation.title}
                </motion.h1>

                {/* Excerpt */}
                {translation.excerpt && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 }}
                    className="mb-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
                  >
                    {translation.excerpt}
                  </motion.p>
                )}

                {/* Meta row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-white/50"
                >
                  {article.published_at && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.published_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  {readingTime > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {readingTime} min de lecture
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400/70" />
                    <span className="text-emerald-300/70">Vérifié par YOJOB</span>
                  </span>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* ── Featured image ── */}
        {article && translation && !loading && article.featured_image_url && (
          <div className="relative -mt-1 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="-mt-6 overflow-hidden rounded-2xl shadow-2xl shadow-black/30 sm:-mt-8"
              >
                <img
                  src={article.featured_image_url}
                  alt={translation.title}
                  className="max-h-[480px] w-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* ── Article body — same max-w-4xl as hero for perfect alignment ── */}
        {article && translation && !loading && (
          <section className="relative z-10 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <article className="w-full">
                {/* Key points + Checklist */}
                {((translation.key_points && translation.key_points.length > 0) ||
                  (translation.checklist_items && translation.checklist_items.length > 0)) && (
                  <div className="mb-10 grid gap-5 sm:grid-cols-2">
                    {translation.key_points && translation.key_points.length > 0 && (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                        <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                          <ListTree className="h-3.5 w-3.5 text-cyan-400" />
                          Points clés
                        </p>
                        <ul className="space-y-2.5">
                          {translation.key_points.map((point, index) => (
                            <li key={index} className="flex gap-2 text-sm leading-relaxed text-white/80">
                              <span className="mt-1 text-cyan-400">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {translation.checklist_items && translation.checklist_items.length > 0 && (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                        <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                          <ClipboardList className="h-3.5 w-3.5 text-emerald-400" />
                          Checklist
                        </p>
                        <ul className="space-y-2.5">
                          {translation.checklist_items.map((item, index) => (
                            <li key={index} className="flex gap-2 text-sm leading-relaxed text-white/80">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile TOC */}
                {headings.length > 0 && (
                  <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">Sommaire</p>
                    <select
                      defaultValue=""
                      aria-label="Aller à une section de l'article"
                      onChange={(event) => {
                        const selectedId = event.target.value;
                        const selected = headings.find((heading) => heading.id === selectedId);
                        if (selected) handleTocClick(selected);
                      }}
                      className="min-h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]"
                    >
                      <option value="">Aller à une section...</option>
                      {headings.map((heading) => (
                        <option key={heading.id} value={heading.id}>
                          {heading.level === 3 ? '  ↳ ' : ''}
                          {heading.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sources & freshness */}
                <div className="mb-10 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">Fraîcheur & sources</p>
                  <div className="text-sm text-white/80">
                    <p className="mb-2">
                      Dernière mise à jour :{' '}
                      <span className="font-semibold text-white">
                        {new Date(article.last_updated_at || article.updated_at).toLocaleDateString(
                          lang === 'fr' ? 'fr-FR' : 'en-GB',
                          { day: 'numeric', month: 'long', year: 'numeric' }
                        )}
                      </span>
                    </p>
                    {article.sources && article.sources.length > 0 && (
                      <ul className="space-y-1.5">
                        {article.sources.map((source, index) => (
                          <li key={`${source.url}-${index}`} className="text-sm text-white/80">
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
                            >
                              <Link2 className="h-3 w-3" />
                              {source.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Article body (first half) */}
                <div
                  className={articleBodyClassName}
                  dangerouslySetInnerHTML={{ __html: splitContent.beforeHtml }}
                />

                {/* Mid-article CTA */}
                {MidArticleCta}

                {/* Article body (second half) */}
                {splitContent.afterHtml && (
                  <div
                    className={articleBodyClassName}
                    dangerouslySetInnerHTML={{ __html: splitContent.afterHtml }}
                  />
                )}

                {/* FAQ section */}
                {faqItems.length > 0 && (
                  <section className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm" aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className="mb-1 text-2xl font-bold text-white">FAQ</h2>
                    <p className="mb-5 text-sm text-white/50">
                      Questions fréquentes sur les obligations de conformité et le détachement.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`} className="border-white/10">
                          <AccordionTrigger className="text-left text-white hover:text-cyan-400 [&[data-state=open]]:text-cyan-400">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="leading-relaxed text-white/70">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                )}

                {/* End CTA */}
                <section className="mt-14 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6 backdrop-blur-sm sm:p-8" aria-labelledby="end-cta-heading">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-400">{personaCopy.badge}</p>
                  <h2 id="end-cta-heading" className="mb-3 text-2xl font-bold text-white">{personaCopy.title}</h2>
                  <p className="mb-6 leading-relaxed text-white/70">{endCtaText}</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={devisLink}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-700 px-6 py-3 font-medium text-white shadow-md shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-violet-600 hover:shadow-lg hover:shadow-cyan-600/25 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] motion-reduce:transition-none sm:w-auto"
                    >
                      {endCtaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={`${langPrefix}/blog`}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27] sm:w-auto"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Continuer la lecture
                    </a>
                  </div>
                </section>

                {/* Related articles */}
                {relatedArticles.length > 0 && (
                  <section className="mt-14" aria-labelledby="related-heading">
                    <h2 id="related-heading" className="mb-5 text-2xl font-bold text-white">Articles liés</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {relatedArticles.map((related) => {
                        const relatedTranslation =
                          related.translations.find((item) => item.language_code === lang) ||
                          related.translations.find((item) => item.language_code === 'fr');
                        if (!relatedTranslation) return null;
                        return (
                          <a
                            key={related.id}
                            href={`${langPrefix}/blog/${related.slug}`}
                            className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]"
                          >
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                              {related.category || 'Article'}
                            </p>
                            <h3 className="mb-1 line-clamp-2 font-semibold text-white transition-colors group-hover:text-cyan-400">
                              {relatedTranslation.title}
                            </h3>
                            <p className="line-clamp-2 text-sm text-white/50">
                              {relatedTranslation.excerpt || 'Lire cet article'}
                            </p>
                          </a>
                        );
                      })}
                    </div>
                  </section>
                )}
              </article>
            </div>
          </section>
        )}

        <Footer language={lang} />
      </div>
    </>
  );
}
