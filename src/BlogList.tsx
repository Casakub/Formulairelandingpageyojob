import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import {
  BlogArticleWithTranslations,
  BlogTranslation,
  getPublishedArticles,
} from './services/blogService';

export default function BlogList() {
  const { currentLanguage: lang } = useLanguageManager();
  const [articles, setArticles] = useState<BlogArticleWithTranslations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedArticles(lang)
      .then(setArticles)
      .catch((err) => console.error('Error loading blog articles:', err))
      .finally(() => setLoading(false));
  }, [lang]);

  const getTranslation = (article: BlogArticleWithTranslations): BlogTranslation | undefined => {
    return (
      article.translations.find((t) => t.language_code === lang) ||
      article.translations.find((t) => t.language_code === 'fr')
    );
  };

  const langPrefix = lang === 'fr' ? '' : `/${lang}`;

  return (
    <>
      <SEOHead
        title="Détachement de travailleurs & recrutement européen | Blog"
        description="Découvrez nos articles et guides sur le détachement de travailleurs en Europe, la réglementation européenne et les bonnes pratiques en recrutement international."
      />

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
                href={langPrefix || '/'}
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                Retour au site
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Blog YOJOB
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 max-w-2xl mx-auto"
            >
              Articles, guides et actualités sur le détachement de travailleurs
              et le recrutement européen.
            </motion.p>
          </div>
        </section>

        {/* Articles */}
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
              </div>
            )}

            {!loading && articles.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/50 text-lg">Aucun article pour le moment.</p>
              </div>
            )}

            <div className="space-y-6">
              {articles.map((article, index) => {
                const t = getTranslation(article);
                if (!t) return null;

                return (
                  <motion.a
                    key={article.id}
                    href={`${langPrefix}/blog/${article.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="block group"
                  >
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                      <div className="flex gap-6">
                        {article.featured_image_url && (
                          <img
                            src={article.featured_image_url}
                            alt={t.title}
                            className="w-48 h-32 rounded-xl object-cover flex-shrink-0 hidden sm:block"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          {article.category && (
                            <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
                              {article.category}
                            </span>
                          )}
                          <h2 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-cyan-300 transition-colors">
                            {t.title}
                          </h2>
                          {t.excerpt && (
                            <p className="text-white/60 text-sm line-clamp-2 mb-3">{t.excerpt}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-white/40">
                            {article.published_at && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(article.published_at).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-cyan-400/70 group-hover:text-cyan-400 transition-colors">
                              Lire l'article
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer language={lang} />
      </div>
    </>
  );
}