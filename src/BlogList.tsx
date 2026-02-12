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

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900">
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

        <section className="pt-14 pb-10 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Blog conformité & détachement YOJOB
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/70 max-w-3xl mx-auto"
            >
              Articles actionnables pour sécuriser vos opérations en Europe, avec points clés, FAQ et passerelles vers un devis personnalisé.
            </motion.p>
          </div>
        </section>

        <section className="px-4 pb-6">
          <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 sm:p-5">
            <div className="flex items-center gap-2 text-white/80 mb-3">
              <Filter className="w-4 h-4" />
              <p className="text-sm font-medium">Filtres de lecture qualifiee</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <label className="lg:col-span-2">
                <span className="sr-only">Recherche</span>
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#070b1e]/70 px-3 py-2">
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Recherche par sujet..."
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>
              </label>

              <label className="text-xs text-white/60">
                Theme
                <select
                  value={themeFilter}
                  onChange={(event) => {
                    setThemeFilter(event.target.value);
                  }}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-[#070b1e]/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                >
                  <option value="all">Tous</option>
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs text-white/60">
                Persona
                <select
                  value={personaFilter}
                  onChange={(event) => {
                    const value = event.target.value as 'all' | BlogPersonaTarget;
                    setPersonaFilter(value);
                  }}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-[#070b1e]/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                >
                  <option value="all">Tous</option>
                  <option value="enterprise">Entreprise</option>
                  <option value="agency">Agence</option>
                  <option value="both">Entreprise + Agence</option>
                </select>
              </label>

              <label className="text-xs text-white/60">
                Niveau de risque
                <select
                  value={riskFilter}
                  onChange={(event) => {
                    const value = event.target.value as 'all' | BlogRiskLevel;
                    setRiskFilter(value);
                  }}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-[#070b1e]/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                >
                  <option value="all">Tous</option>
                  <option value="low">Faible</option>
                  <option value="medium">Modere</option>
                  <option value="high">Eleve</option>
                </select>
              </label>

              <label className="text-xs text-white/60">
                Fraicheur
                <select
                  value={dateFilter}
                  onChange={(event) => {
                    const value = event.target.value as DateFilter;
                    setDateFilter(value);
                  }}
                  className="mt-1 w-full rounded-xl border border-white/15 bg-[#070b1e]/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
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
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
              </div>
            )}

            {!loading && filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Aucun article correspondant a vos filtres.</p>
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
                    className="block group"
                  >
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                      <div className="flex gap-6">
                        {article.featured_image_url && (
                          <img
                            src={article.featured_image_url}
                            alt={translation.title}
                            className="w-48 h-32 rounded-xl object-cover flex-shrink-0 hidden sm:block"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            {article.category && (
                              <span className="text-xs text-cyan-300 font-medium uppercase tracking-wider">
                                {article.category}
                              </span>
                            )}
                            <span className="text-[11px] text-white/55 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                              <Building2 className="w-3 h-3" />
                              {PERSONA_LABELS[article.persona_target]}
                            </span>
                            <span className="text-[11px] text-white/55 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                              <ShieldAlert className="w-3 h-3" />
                              {RISK_LABELS[article.risk_level]}
                            </span>
                          </div>

                          <h2 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-cyan-300 transition-colors">
                            {translation.title}
                          </h2>

                          {translation.excerpt && (
                            <p className="text-white/60 text-sm line-clamp-2 mb-3">{translation.excerpt}</p>
                          )}

                          <div className="flex items-center gap-4 text-xs text-white/40">
                            {article.published_at && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(article.published_at).toLocaleDateString(
                                  lang === 'fr' ? 'fr-FR' : 'en-GB',
                                  { day: 'numeric', month: 'long', year: 'numeric' }
                                )}
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

        <Footer language={lang} />
      </div>
    </>
  );
}
