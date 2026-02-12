import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  ArrowRight,
  Loader2,
  BookOpen,
  Search,
  Clock,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import {
  BlogArticleWithTranslations,
  BlogTranslation,
  getPublishedArticles,
} from './services/blogService';

const ARTICLES_PER_PAGE = 9;

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogList() {
  const { currentLanguage: lang } = useLanguageManager();
  const [articles, setArticles] = useState<BlogArticleWithTranslations[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  useEffect(() => {
    getPublishedArticles(lang)
      .then(setArticles)
      .catch((err) => console.error('Error loading blog articles:', err))
      .finally(() => setLoading(false));
  }, [lang]);

  const getTranslation = (
    article: BlogArticleWithTranslations,
  ): BlogTranslation | undefined => {
    return (
      article.translations.find((t) => t.language_code === lang) ||
      article.translations.find((t) => t.language_code === 'fr')
    );
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    articles.forEach((a) => {
      if (a.category) cats.add(a.category);
    });
    return Array.from(cats).sort();
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const t = getTranslation(article);
      if (!t) return false;

      if (selectedCategory && article.category !== selectedCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title?.toLowerCase().includes(q);
        const matchExcerpt = t.excerpt?.toLowerCase().includes(q);
        const matchCategory = article.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchCategory) return false;
      }

      return true;
    });
  }, [articles, searchQuery, selectedCategory, lang]);

  const featuredArticle = filtered[0];
  const restArticles = filtered.slice(1, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const langPrefix = lang === 'fr' ? '' : `/${lang}`;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ARTICLES_PER_PAGE);
  };

  return (
    <>
      <SEOHead
        title="Détachement de travailleurs & recrutement européen | Blog YOJOB"
        description="Découvrez nos articles et guides sur le détachement de travailleurs en Europe, la réglementation européenne et les bonnes pratiques en recrutement international."
      />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: '#0a0e27',
          backgroundImage:
            'linear-gradient(135deg, #0a0e27 0%, #1a1040 48%, #0d2847 100%)',
        }}
      >
        {/* ── Header ── */}
        <header
          className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0e27]/80 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <a
                href={langPrefix || '/'}
                className="group flex items-center gap-3"
                aria-label="YOJOB — Accueil"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 p-0.5 transition-all group-hover:shadow-lg group-hover:shadow-cyan-500/20 motion-reduce:transition-none">
                  <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#0a0e27]">
                    <LogoSvg className="h-8 w-8" />
                  </div>
                </div>
                <span className="text-lg font-bold text-white">YOJOB</span>
              </a>

              <nav className="flex items-center gap-2" aria-label="Navigation blog">
                <a
                  href={`${langPrefix}/blog`}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]"
                  aria-current="page"
                >
                  Blog
                </a>
                <a
                  href={langPrefix || '/'}
                  className="rounded-lg px-3 py-1.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]"
                >
                  Retour au site
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pb-4 pt-16 sm:pt-20 lg:pt-24">
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 20%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(124,58,237,0.12) 0%, transparent 50%)',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                  Blog & Ressources
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Expertise détachement
                <span className="block bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  & recrutement européen
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
              >
                Articles, guides pratiques et analyses pour sécuriser vos missions
                de détachement en Europe et optimiser votre conformité.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Filter bar ── */}
        <section className="pb-2 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 sm:p-4"
            >
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(ARTICLES_PER_PAGE);
                  }}
                  placeholder="Rechercher un article..."
                  aria-label="Rechercher un article"
                  className="min-h-11 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 transition-colors focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]"
                />
              </div>

              {/* Category filter */}
              {categories.length > 0 && (
                <div className="relative flex-shrink-0">
                  <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setVisibleCount(ARTICLES_PER_PAGE);
                    }}
                    aria-label="Filtrer par catégorie"
                    className="min-h-11 appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white transition-colors focus:border-cyan-400/50 focus:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e27]"
                  >
                    <option value="" className="bg-[#0a0e27] text-white">
                      Toutes les catégories
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0a0e27] text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                </div>
              )}

              {/* Result count */}
              <p className="flex-shrink-0 text-xs text-white/40 sm:text-sm" aria-live="polite">
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="pb-20 pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-white/50" aria-label="Chargement des articles" />
              </div>
            )}

            {/* Empty */}
            {!loading && filtered.length === 0 && (
              <div className="py-24 text-center">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-white/20" />
                <p className="mb-2 text-lg font-medium text-white/70">Aucun article trouvé</p>
                <p className="text-sm text-white/40">
                  {searchQuery || selectedCategory
                    ? 'Essayez de modifier vos critères de recherche.'
                    : 'Aucun article publié pour le moment.'}
                </p>
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                    }}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            )}

            {/* Featured article */}
            {!loading && featuredArticle && (() => {
              const t = getTranslation(featuredArticle);
              if (!t) return null;
              const readTime = t.content ? estimateReadingTime(t.content) : 0;

              return (
                <motion.a
                  href={`${langPrefix}/blog/${featuredArticle.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group mb-10 block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0e27] motion-reduce:transition-none"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {featuredArticle.featured_image_url && (
                      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[320px]">
                        <img
                          src={featuredArticle.featured_image_url}
                          alt={t.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                      </div>
                    )}
                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {featuredArticle.category && (
                          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                            {featuredArticle.category}
                          </span>
                        )}
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/50">
                          A la une
                        </span>
                      </div>

                      <h2 className="mb-3 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-cyan-200 sm:text-3xl motion-reduce:transition-none">
                        {t.title}
                      </h2>

                      {t.excerpt && (
                        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/60 sm:text-base">
                          {t.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 sm:text-sm">
                        {featuredArticle.published_at && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(featuredArticle.published_at).toLocaleDateString(
                              lang === 'fr' ? 'fr-FR' : 'en-GB',
                              { day: 'numeric', month: 'long', year: 'numeric' },
                            )}
                          </span>
                        )}
                        {readTime > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {readTime} min
                          </span>
                        )}
                        <span className="ml-auto flex items-center gap-1.5 font-medium text-cyan-400 transition-colors group-hover:text-cyan-300">
                          Lire l'article
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })()}

            {/* Article grid */}
            {!loading && restArticles.length > 0 && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {restArticles.map((article, index) => {
                    const t = getTranslation(article);
                    if (!t) return null;
                    const readTime = t.content ? estimateReadingTime(t.content) : 0;

                    return (
                      <motion.a
                        key={article.id}
                        href={`${langPrefix}/blog/${article.slug}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: Math.min(index * 0.04, 0.3) }}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-cyan-400/25 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-cyan-500/5 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0e27] motion-reduce:transition-none"
                      >
                        {/* Image */}
                        {article.featured_image_url ? (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={article.featured_image_url}
                              alt={t.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        ) : (
                          <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-cyan-900/30 to-violet-900/30">
                            <BookOpen className="h-10 w-10 text-white/15" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-5">
                          {article.category && (
                            <span className="mb-2 self-start rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                              {article.category}
                            </span>
                          )}

                          <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-cyan-200 motion-reduce:transition-none">
                            {t.title}
                          </h3>

                          {t.excerpt && (
                            <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-white/55">
                              {t.excerpt}
                            </p>
                          )}

                          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3 text-xs text-white/40">
                            <div className="flex items-center gap-3">
                              {article.published_at && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(article.published_at).toLocaleDateString(
                                    lang === 'fr' ? 'fr-FR' : 'en-GB',
                                    { day: 'numeric', month: 'short' },
                                  )}
                                </span>
                              )}
                              {readTime > 0 && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {readTime} min
                                </span>
                              )}
                            </div>
                            <span className="flex items-center gap-1 font-medium text-cyan-400/80 transition-colors group-hover:text-cyan-300">
                              Lire
                              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                            </span>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Load more */}
            {!loading && hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0e27] motion-reduce:transition-none"
                >
                  Voir plus d'articles
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <Footer language={lang} />
      </div>
    </>
  );
}
