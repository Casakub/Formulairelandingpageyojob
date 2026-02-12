import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  ArrowRight,
  Loader2,
  BookOpen,
  Filter,
  Search,
  ShieldAlert,
  Building2,
} from 'lucide-react';
import { SEOHead } from './components/SEOHead';
import { LogoSvg } from './imports/YojobLogoComplete';
import { Footer } from './components/landing/Footer';
import { useLanguageManager } from './hooks/useLanguageManager';
import {
  BlogArticleWithTranslations,
  BlogPersonaTarget,
  BlogRiskLevel,
  BlogTranslation,
  getPublishedArticles,
} from './services/blogService';

const PERSONA_LABELS: Record<BlogPersonaTarget, string> = {
  enterprise: 'Entreprise',
  agency: 'Agence',
  both: 'Entreprise + Agence',
};

const RISK_LABELS: Record<BlogRiskLevel, string> = {
  low: 'Risque faible',
  medium: 'Risque modere',
  high: 'Risque eleve',
};

type DateFilter = 'all' | '30d' | '90d' | '365d';
const FILTER_LABEL_CLASS = 'text-xs font-medium text-slate-200';
const FILTER_CONTROL_CLASS = 'mt-1 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900';

export default function BlogList() {
  const { currentLanguage: lang } = useLanguageManager();
  const [articles, setArticles] = useState<BlogArticleWithTranslations[]>([]);
  const [loading, setLoading] = useState(true);
  const [themeFilter, setThemeFilter] = useState('all');
  const [personaFilter, setPersonaFilter] = useState<'all' | BlogPersonaTarget>('all');
  const [riskFilter, setRiskFilter] = useState<'all' | BlogRiskLevel>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getPublishedArticles(lang)
      .then(setArticles)
      .catch((err) => console.error('Error loading blog articles:', err))
      .finally(() => setLoading(false));
  }, [lang]);

  const getTranslation = (article: BlogArticleWithTranslations): BlogTranslation | undefined => {
    return (
      article.translations.find((translation) => translation.language_code === lang) ||
      article.translations.find((translation) => translation.language_code === 'fr')
    );
  };

  const langPrefix = lang === 'fr' ? '' : `/${lang}`;

  const themes = useMemo(() => {
    const categories = articles
      .map((article) => article.category)
      .filter((category): category is string => Boolean(category));
    return [...new Set(categories)].sort((a, b) => a.localeCompare(b, 'fr'));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const now = Date.now();
    return articles.filter((article) => {
      const translation = getTranslation(article);
      if (!translation) return false;

      if (themeFilter !== 'all' && article.category !== themeFilter) return false;
      if (personaFilter !== 'all' && article.persona_target !== personaFilter) return false;
      if (riskFilter !== 'all' && article.risk_level !== riskFilter) return false;

      if (dateFilter !== 'all' && article.published_at) {
        const maxAgeMs = dateFilter === '30d'
          ? 30 * 24 * 60 * 60 * 1000
          : dateFilter === '90d'
            ? 90 * 24 * 60 * 60 * 1000
            : 365 * 24 * 60 * 60 * 1000;
        if (now - new Date(article.published_at).getTime() > maxAgeMs) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const haystack = `${translation.title} ${translation.excerpt || ''}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [articles, dateFilter, personaFilter, riskFilter, searchQuery, themeFilter, lang]);

  return (
    <>
      <SEOHead
        title="Détachement de travailleurs & recrutement europeen | Blog"
        description="Guides pratiques YOJOB: conformité détachement, obligations employeur, checklists et FAQ pour entreprises et agences de staffing."
      />

      <div className="min-h-screen bg-gradient-to-br from-[#111c46] via-[#2a1f63] to-[#213b72]">
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

        <section className="px-4 pb-10 pt-14">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-4xl font-bold text-white md:text-5xl"
            >
              Blog conformité & détachement YOJOB
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-3xl text-lg text-white/80"
            >
              Articles actionnables pour sécuriser vos opérations en Europe, avec points clés, FAQ et passerelles vers un devis personnalisé.
            </motion.p>
          </div>
        </section>

        <section className="px-4 pb-6">
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-slate-900/45 p-4 shadow-lg shadow-black/15 backdrop-blur-sm sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-white">
              <Filter className="w-4 h-4" />
              <p className="text-sm font-semibold">Filtres de lecture qualifiee</p>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
              <label className="lg:col-span-2" htmlFor="blog-search">
                <span className="sr-only">Recherche</span>
                <div className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:ring-2 focus-within:ring-cyan-300 focus-within:ring-offset-2 focus-within:ring-offset-slate-900">
                  <Search className="h-4 w-4 text-slate-500" />
                  <input
                    id="blog-search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Recherche par sujet..."
                    className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
              </label>

              <label className={FILTER_LABEL_CLASS}>
                Theme
                <select
                  value={themeFilter}
                  onChange={(event) => {
                    setThemeFilter(event.target.value);
                  }}
                  className={FILTER_CONTROL_CLASS}
                >
                  <option value="all">Tous</option>
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </label>

              <label className={FILTER_LABEL_CLASS}>
                Persona
                <select
                  value={personaFilter}
                  onChange={(event) => {
                    const value = event.target.value as 'all' | BlogPersonaTarget;
                    setPersonaFilter(value);
                  }}
                  className={FILTER_CONTROL_CLASS}
                >
                  <option value="all">Tous</option>
                  <option value="enterprise">Entreprise</option>
                  <option value="agency">Agence</option>
                  <option value="both">Entreprise + Agence</option>
                </select>
              </label>

              <label className={FILTER_LABEL_CLASS}>
                Niveau de risque
                <select
                  value={riskFilter}
                  onChange={(event) => {
                    const value = event.target.value as 'all' | BlogRiskLevel;
                    setRiskFilter(value);
                  }}
                  className={FILTER_CONTROL_CLASS}
                >
                  <option value="all">Tous</option>
                  <option value="low">Faible</option>
                  <option value="medium">Modere</option>
                  <option value="high">Eleve</option>
                </select>
              </label>

              <label className={FILTER_LABEL_CLASS}>
                Fraicheur
                <select
                  value={dateFilter}
                  onChange={(event) => {
                    const value = event.target.value as DateFilter;
                    setDateFilter(value);
                  }}
                  className={FILTER_CONTROL_CLASS}
                >
                  <option value="all">Toutes dates</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">90 derniers jours</option>
                  <option value="365d">12 derniers mois</option>
                </select>
              </label>
            </div>
          </div>
        </section>

        <section className="pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-white/70" />
              </div>
            )}

            {!loading && filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="mx-auto mb-4 h-16 w-16 text-white/25" />
                <p className="text-lg text-white/80">Aucun article correspondant a vos filtres.</p>
              </div>
            )}

            <div className="space-y-6">
              {filteredArticles.map((article, index) => {
                const translation = getTranslation(article);
                if (!translation) return null;

                return (
                  <motion.a
                    key={article.id}
                    href={`${langPrefix}/blog/${article.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="block group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    <div className="rounded-2xl border border-white/20 bg-slate-900/45 p-5 shadow-sm shadow-black/20 transition-all hover:border-cyan-300/40 hover:bg-slate-900/55 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                        {article.featured_image_url && (
                          <img
                            src={article.featured_image_url}
                            alt={translation.title}
                            className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-52 sm:flex-shrink-0"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {article.category && (
                              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                {article.category}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] text-slate-100">
                              <Building2 className="h-3 w-3" />
                              {PERSONA_LABELS[article.persona_target]}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] text-slate-100">
                              <ShieldAlert className="h-3 w-3" />
                              {RISK_LABELS[article.risk_level]}
                            </span>
                          </div>

                          <h2 className="mb-2 mt-1 text-xl font-semibold text-white transition-colors group-hover:text-cyan-200">
                            {translation.title}
                          </h2>

                          {translation.excerpt && (
                            <p className="mb-3 line-clamp-2 text-sm text-slate-100/85">{translation.excerpt}</p>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200/85">
                            {article.published_at && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(article.published_at).toLocaleDateString(
                                  lang === 'fr' ? 'fr-FR' : 'en-GB',
                                  { day: 'numeric', month: 'long', year: 'numeric' }
                                )}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-cyan-200 transition-colors group-hover:text-cyan-100">
                              Lire l'article
                              <ArrowRight className="h-3 w-3" />
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

        <Footer language={lang} />
      </div>
    </>
  );
}
