import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, Loader2, BookOpen } from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import { footerTranslations } from './src/i18n/services/footer';
import type { SupportedLanguage } from './src/i18n/types';
import {
  BlogArticleWithTranslations,
  BlogTranslation,
  getPublishedArticleBySlug,
} from './services/blogService';

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const { currentLanguage: lang } = useLanguageManager();
  const [article, setArticle] = useState<BlogArticleWithTranslations | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const footerT = footerTranslations[lang as SupportedLanguage] || footerTranslations.fr;
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

  return (
    <>
      {t && (
        <SEOHead
          title={`${t.seo_title || t.title} | YOJOB Blog`}
          description={t.seo_description || t.excerpt || ''}
        />
      )}
      {!t && <SEOHead title="Blog - YOJOB" description="Article de blog YOJOB" />}

      {/* Article Schema */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
        {/* Header */}
        <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href={langPrefix || '/'} className="flex items-center gap-3">
                <div className="w-10 h-10">
                  <LogoSvg />
                </div>
                <span className="text-white font-bold text-xl">YOJOB</span>
              </a>
              <a
                href={`${langPrefix}/blog`}
                className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Blog
              </a>
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
            <section className="py-12 px-4">
              <div className="max-w-3xl mx-auto">
                {article.category && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-cyan-400 font-medium uppercase tracking-wider"
                  >
                    {article.category}
                  </motion.span>
                )}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4"
                >
                  {t.title}
                </motion.h1>
                {t.excerpt && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-white/60 mb-4"
                  >
                    {t.excerpt}
                  </motion.p>
                )}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-4 text-sm text-white/40"
                >
                  {article.published_at && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.published_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  <span>YOJOB</span>
                </motion.div>
              </div>
            </section>

            {/* Featured image */}
            {article.featured_image_url && (
              <div className="max-w-4xl mx-auto px-4 mb-8">
                <motion.img
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={article.featured_image_url}
                  alt={t.title}
                  className="w-full rounded-2xl object-cover max-h-[400px]"
                />
              </div>
            )}

            {/* Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto px-4 pb-20"
            >
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-white/80 prose-p:leading-relaxed
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-blockquote:border-cyan-500/50 prose-blockquote:text-white/70
                  prose-li:text-white/80
                  prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: t.content || '' }}
              />
            </motion.article>
          </>
        )}

        {/* Footer */}
        <Footer translations={footerT} />
      </div>
    </>
  );
}