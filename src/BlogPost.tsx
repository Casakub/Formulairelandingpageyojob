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
  BlogPersonaTarget,
  BlogTranslation,
  getPublishedArticleBySlug,
  getRelatedPublishedArticles,
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
    (heading as HTMLElement).style.scrollMarginTop = '112px';
  });

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
    getRelatedPublishedArticles(article, lang, 3)
      .then(setRelatedArticles)
      .catch((error) => console.error('Error loading related articles:', error));
  }, [article, lang]);

  const translation: BlogTranslation | undefined = article
    ? article.translations.find((item) => item.language_code === lang) ||
      article.translations.find((item) => item.language_code === 'fr')
    : undefined;

  const normalizedContent = useMemo(
    () => enrichContentWithHeadingIds(translation?.content || ''),
    [translation?.content]
  );

  const readingTime = useMemo(
    () => (normalizedContent ? estimateReadingTime(normalizedContent) : 0),
    [normalizedContent]
  );

  const headings = useMemo(() => extractHeadings(normalizedContent), [normalizedContent]);
  const splitContent = useMemo(() => splitContentForMidCta(normalizedContent), [normalizedContent]);
  const faqItems = translation?.faq_items || [];

  const articleSchema = article && translation ? {
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
  } : null;

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

  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const maxScrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
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
    <div className="my-10 rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">{personaCopy.badge}</p>
      <h3 className="mb-2 text-xl font-semibold leading-tight text-slate-900">{midCtaLabel}</h3>
      <p className="mb-5 text-sm leading-relaxed text-slate-700">{midCtaText}</p>
      <a
        href={devisLink}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-2.5 font-medium text-white transition-all hover:from-cyan-500 hover:to-blue-600 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 motion-reduce:transition-none sm:w-auto"
      >
        {midCtaLabel}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );

  const articleBodyClassName = `blog-article-content prose prose-lg max-w-none
    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
    prose-h2:mb-4 prose-h2:mt-12 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:text-[1.65rem]
    prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-[1.3rem] prose-h3:text-slate-900
    prose-p:my-4 prose-p:text-[17px] prose-p:leading-8 prose-p:text-slate-800
    prose-a:font-medium prose-a:text-cyan-700 prose-a:underline-offset-2 hover:prose-a:underline
    prose-strong:font-semibold prose-strong:text-slate-900
    prose-ul:my-5 prose-ul:space-y-2 prose-ol:my-5 prose-ol:space-y-2
    prose-li:text-slate-800 prose-li:marker:text-cyan-700
    prose-blockquote:my-6 prose-blockquote:rounded-r-xl prose-blockquote:border-l-4 prose-blockquote:border-cyan-600 prose-blockquote:bg-cyan-50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-slate-700
    prose-img:my-8 prose-img:rounded-xl prose-img:shadow-lg prose-img:shadow-slate-300/50
    prose-hr:my-10 prose-hr:border-slate-200
    prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-cyan-700
    prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-900`;

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

      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-[width] duration-150"
          style={{ width: `${readingProgress}%` }}
          aria-label="Progression de lecture"
        />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1040] to-[#0d2847]">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0e27]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href={langPrefix || '/'} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 p-0.5 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                  <div className="w-full h-full bg-[#0a0e27] rounded-[6px] flex items-center justify-center">
                    <LogoSvg className="w-8 h-8" />
                  </div>
                </div>
                <span className="text-white font-bold text-lg">YOJOB</span>
              </a>
              <div className="flex items-center gap-3">
                {translation && (
                  <button
                    onClick={handleShare}
                    aria-label="Partager cet article"
                    className="p-2 rounded-lg text-white/50 transition-all hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300"
                    title="Partager"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
                <a
                  href={`${langPrefix}/blog`}
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Blog
                </a>
              </div>
            </div>
          </div>
        </header>

        {loading && (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        )}

        {notFound && !loading && (
          <div className="text-center py-40 px-4">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Article introuvable</h1>
            <p className="text-white/50 mb-6">Cet article n&apos;existe pas ou n&apos;est pas encore publie.</p>
            <a
              href={`${langPrefix}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </a>
          </div>
        )}

        {article && translation && !loading && (
          <>
            <section className="pt-12 pb-8 px-4">
              <div className="max-w-4xl mx-auto">
                <nav className="flex items-center gap-2 text-xs text-white/40 mb-6">
                  <a href={langPrefix || '/'} className="hover:text-white/60 transition-colors">Accueil</a>
                  <span>/</span>
                  <a href={`${langPrefix}/blog`} className="hover:text-white/60 transition-colors">Blog</a>
                  {article.category && (
                    <>
                      <span>/</span>
                      <span className="text-cyan-400/70">{article.category}</span>
                    </>
                  )}
                </nav>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    {article.category && (
                      <span className="inline-block text-xs text-cyan-300 font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                        {article.category}
                      </span>
                    )}
                    <span className="text-[11px] text-white/55 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                      <Building2 className="w-3 h-3" />
                      {article.persona_target === 'enterprise'
                        ? 'Entreprise'
                        : article.persona_target === 'agency'
                          ? 'Agence'
                          : 'Entreprise + Agence'}
                    </span>
                    <span className="text-[11px] text-white/55 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                      <Scale className="w-3 h-3" />
                      {article.risk_level === 'high'
                        ? 'Risque eleve'
                        : article.risk_level === 'medium'
                          ? 'Risque modere'
                          : 'Risque faible'}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5 max-w-[20ch]">
                    {translation.title}
                  </h1>

                  {translation.excerpt && (
                    <p className="text-lg md:text-xl text-white/65 leading-relaxed mb-6 max-w-3xl">
                      {translation.excerpt}
                    </p>
                  )}

                  <div className="flex items-center flex-wrap gap-4 text-sm text-white/40 pb-1">
                    {article.published_at && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.published_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                    {readingTime > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {readingTime} min de lecture
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Verifie par YOJOB
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {article.featured_image_url && (
              <div className="max-w-5xl mx-auto px-4 mb-10">
                <motion.img
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  src={article.featured_image_url}
                  alt={translation.title}
                  className="w-full rounded-2xl object-cover max-h-[520px] shadow-2xl shadow-black/30"
                />
              </div>
            )}

            <section className="px-4 pb-16">
              <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-2xl shadow-slate-950/5 sm:px-6 md:px-8 md:py-8">
                <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:hidden">
                  <p className="mb-2 text-xs uppercase tracking-wide text-slate-600">Sommaire rapide</p>
                  <select
                    defaultValue=""
                    aria-label="Aller a une section de l'article"
                    onChange={(event) => {
                      const selectedId = event.target.value;
                      const selected = headings.find((heading) => heading.id === selectedId);
                      if (selected) handleTocClick(selected);
                    }}
                    className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
                  >
                    <option value="">Aller a une section...</option>
                    {headings.map((heading) => (
                      <option key={heading.id} value={heading.id}>
                        {heading.level === 3 ? '↳ ' : ''}
                        {heading.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,820px)_260px] lg:justify-between">
                  <article className="w-full max-w-[820px]">
                    <div className="mb-8 grid gap-4 sm:grid-cols-2">
                      {translation.key_points && translation.key_points.length > 0 && (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                            <ListTree className="h-3.5 w-3.5 text-cyan-700" />
                            Points cles
                          </p>
                          <ul className="space-y-2">
                            {translation.key_points.map((point, index) => (
                              <li key={index} className="flex gap-2 text-sm text-slate-700">
                                <span className="mt-0.5 text-cyan-700">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {translation.checklist_items && translation.checklist_items.length > 0 && (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <p className="mb-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                            <ClipboardList className="h-3.5 w-3.5 text-emerald-700" />
                            Checklist
                          </p>
                          <ul className="space-y-2">
                            {translation.checklist_items.map((item, index) => (
                              <li key={index} className="flex gap-2 text-sm text-slate-700">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-700" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="mb-2 text-xs uppercase tracking-wide text-slate-600">Fraicheur & sources</p>
                      <div className="text-sm text-slate-700">
                        <p className="mb-2">
                          Derniere mise a jour:
                          {' '}
                          <span className="font-semibold text-slate-900">
                            {new Date(article.last_updated_at || article.updated_at).toLocaleDateString(
                              lang === 'fr' ? 'fr-FR' : 'en-GB',
                              { day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                          </span>
                        </p>
                        {article.sources && article.sources.length > 0 && (
                          <ul className="space-y-1.5">
                            {article.sources.map((source, index) => (
                              <li key={`${source.url}-${index}`} className="text-sm text-slate-700">
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-medium text-cyan-700 hover:text-cyan-800 hover:underline"
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

                    <div
                      className={articleBodyClassName}
                      dangerouslySetInnerHTML={{ __html: splitContent.beforeHtml }}
                    />

                    {MidArticleCta}

                    {splitContent.afterHtml && (
                      <div
                        className={articleBodyClassName}
                        dangerouslySetInnerHTML={{ __html: splitContent.afterHtml }}
                      />
                    )}

                    {faqItems.length > 0 && (
                      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="mb-2 text-2xl font-bold text-slate-900">FAQ</h2>
                        <p className="mb-4 text-sm text-slate-600">
                          Questions frequentes sur les obligations de conformité et le détachement.
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                          {faqItems.map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`} className="border-slate-200">
                              <AccordionTrigger className="text-left text-slate-900 hover:text-cyan-700">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="leading-relaxed text-slate-700">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </section>
                    )}

                    <section className="mt-12 rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">{personaCopy.badge}</p>
                      <h2 className="mb-2 text-2xl font-bold text-slate-900">{personaCopy.title}</h2>
                      <p className="mb-5 leading-relaxed text-slate-700">{endCtaText}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={devisLink}
                          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-700 px-6 py-3 font-medium text-white transition-all hover:from-cyan-500 hover:to-violet-600 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 motion-reduce:transition-none sm:w-auto"
                        >
                          {endCtaLabel}
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <a
                          href={`${langPrefix}/blog`}
                          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 sm:w-auto"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Continuer la lecture
                        </a>
                      </div>
                    </section>

                    {relatedArticles.length > 0 && (
                      <section className="mt-12">
                        <h2 className="mb-4 text-2xl font-bold text-slate-900">Articles liés</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {relatedArticles.map((related) => {
                            const relatedTranslation =
                              related.translations.find((item) => item.language_code === lang) ||
                              related.translations.find((item) => item.language_code === 'fr');
                            if (!relatedTranslation) return null;
                            return (
                              <a
                                key={related.id}
                                href={`${langPrefix}/blog/${related.slug}`}
                                className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-cyan-200 hover:bg-slate-50"
                              >
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">
                                  {related.category || 'Article'}
                                </p>
                                <h3 className="mb-1 line-clamp-2 font-semibold text-slate-900">
                                  {relatedTranslation.title}
                                </h3>
                                <p className="line-clamp-2 text-sm text-slate-600">
                                  {relatedTranslation.excerpt || 'Lire cet article'}
                                </p>
                              </a>
                            );
                          })}
                        </div>
                      </section>
                    )}
                  </article>

                  <aside className="hidden lg:block">
                    <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="mb-3 text-xs uppercase tracking-wide text-slate-600">Sommaire</p>
                      <nav className="space-y-1.5">
                        {headings.map((heading) => (
                          <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(event) => {
                              event.preventDefault();
                              handleTocClick(heading);
                            }}
                            className={`block rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 ${
                              heading.level === 3
                                ? 'pl-5 text-slate-600 hover:text-cyan-700'
                                : 'text-slate-800 hover:text-cyan-700'
                            }`}
                          >
                            {heading.title}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          </>
        )}

        <Footer language={lang} />
      </div>
    </>
  );
}
