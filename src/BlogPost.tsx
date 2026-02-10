import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, Loader2, BookOpen, Clock, ArrowRight, Share2 } from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import {
  BlogArticleWithTranslations,
  BlogTranslation,
  getPublishedArticleBySlug,
} from './services/blogService';

interface BlogPostProps {
  slug: string;
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPost({ slug }: BlogPostProps) {
  const { currentLanguage: lang } = useLanguageManager();
  const [article, setArticle] = useState<BlogArticleWithTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  const t: BlogTranslation | undefined = article
    ? article.translations.find((tr) => tr.language_code === lang) ||
      article.translations.find((tr) => tr.language_code === 'fr')
    : undefined;

  const readingTime = useMemo(() => t?.content ? estimateReadingTime(t.content) : 0, [t?.content]);

  // Article Schema.org
  const articleSchema = article && t ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.seo_title || t.title,
    description: t.seo_description || t.excerpt || '',
    image: article.featured_image_url || 'https://yojob.fr/og-image-yojob-1200x630.svg',
    datePublished: article.published_at,
    dateModified: article.updated_at,
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

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: t?.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <>
      {t && (
        <SEOHead
          title={`${t.seo_title || t.title} | YOJOB Blog`}
          description={t.seo_description || t.excerpt || ''}
        />
      )}
      {!t && <SEOHead title="Blog - YOJOB" description="Article de blog YOJOB" />}

      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1040] to-[#0d2847]">
        {/* Header */}
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
                {t && (
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
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

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        )}

        {/* Not found */}
        {notFound && !loading && (
          <div className="text-center py-40 px-4">
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Article introuvable</h1>
            <p className="text-white/50 mb-6">Cet article n'existe pas ou n'est pas encore publié.</p>
            <a
              href={`${langPrefix}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </a>
          </div>
        )}

        {/* Article */}
        {article && t && !loading && (
          <>
            {/* Hero */}
            <section className="pt-16 pb-8 px-4">
              <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <motion.nav
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-xs text-white/40 mb-6"
                >
                  <a href={langPrefix || '/'} className="hover:text-white/60 transition-colors">Accueil</a>
                  <span>/</span>
                  <a href={`${langPrefix}/blog`} className="hover:text-white/60 transition-colors">Blog</a>
                  {article.category && (
                    <>
                      <span>/</span>
                      <span className="text-cyan-400/60">{article.category}</span>
                    </>
                  )}
                </motion.nav>

                {article.category && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block text-xs text-cyan-400 font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-4"
                  >
                    {article.category}
                  </motion.span>
                )}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5"
                >
                  {t.title}
                </motion.h1>
                {t.excerpt && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg md:text-xl text-white/50 leading-relaxed mb-6"
                  >
                    {t.excerpt}
                  </motion.p>
                )}

                {/* Meta bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center flex-wrap gap-4 text-sm text-white/40 pb-8 border-b border-white/10"
                >
                  {article.published_at && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.published_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
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
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">Y</span>
                    </div>
                    YOJOB
                  </span>
                </motion.div>
              </div>
            </section>

            {/* Featured image */}
            {article.featured_image_url && (
              <div className="max-w-4xl mx-auto px-4 mb-12">
                <motion.img
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  src={article.featured_image_url}
                  alt={t.title}
                  className="w-full rounded-2xl object-cover max-h-[500px] shadow-2xl shadow-black/30"
                />
              </div>
            )}

            {/* Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-3xl mx-auto px-4 pb-16"
            >
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4
                  prose-h2:text-2xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                  prose-h3:text-xl prose-h3:text-cyan-300
                  prose-p:text-white/75 prose-p:leading-relaxed prose-p:text-[17px]
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-strong:text-white prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-cyan-500/50 prose-blockquote:bg-white/5 prose-blockquote:rounded-r-xl prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:text-white/60 prose-blockquote:not-italic
                  prose-li:text-white/75 prose-li:marker:text-cyan-400/60
                  prose-img:rounded-xl prose-img:shadow-xl prose-img:shadow-black/20
                  prose-hr:border-white/10
                  prose-code:text-cyan-300 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl"
                dangerouslySetInnerHTML={{ __html: t.content || '' }}
              />
            </motion.article>

            {/* CTA Section */}
            <section className="border-t border-white/10 bg-white/[0.02]">
              <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Besoin d'accompagnement pour vos projets de détachement ?
                  </h2>
                  <p className="text-white/50 mb-8 max-w-xl mx-auto">
                    YOJOB gère la conformité administrative, le recrutement et le détachement de vos travailleurs en Europe.
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <a
                      href="/devis"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium hover:from-cyan-400 hover:to-violet-500 transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Demander un devis gratuit
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={`${langPrefix}/blog`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Tous les articles
                    </a>
                  </div>
                </motion.div>
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <Footer language={lang} />
      </div>
    </>
  );
}
