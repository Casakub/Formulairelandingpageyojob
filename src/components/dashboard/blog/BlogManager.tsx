import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Globe,
  FileText,
  Loader2,
  Search,
  AlertCircle,
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { BlogEditor } from './BlogEditor';
import {
  BlogArticleWithTranslations,
  getArticles,
  deleteArticle,
} from '../../../services/blogService';
import { evaluateBlogQuality } from '@/lib/blogQuality';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Brouillon', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  in_review: { label: 'En review', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  published: { label: 'Publié', color: 'bg-green-100 text-green-800 border-green-200' },
  archived: { label: 'Archivé', color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

export function BlogManager() {
  const [articles, setArticles] = useState<BlogArticleWithTranslations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingArticle, setEditingArticle] = useState<BlogArticleWithTranslations | null | 'new'>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err: any) {
      console.error('Erreur chargement articles:', err);
      setError(err.message || 'Erreur lors du chargement des articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article et toutes ses traductions ?')) return;
    setDeletingId(id);
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(`Erreur: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaved = () => {
    setEditingArticle(null);
    fetchArticles();
  };

  // Filter
  const filtered = articles.filter((a) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const frTitle = a.translations?.find((t) => t.language_code === 'fr')?.title || '';
    return (
      frTitle.toLowerCase().includes(q) ||
      a.slug.includes(q) ||
      a.category?.toLowerCase().includes(q)
    );
  });

  // Show editor
  if (editingArticle !== null) {
    return (
      <BlogEditor
        article={editingArticle === 'new' ? null : editingArticle}
        onBack={() => setEditingArticle(null)}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      {/* Header */}
      <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Blog
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {articles.length} article{articles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setEditingArticle('new')} className="min-h-11 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel article
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <label htmlFor="blog-manager-search" className="sr-only">
          Rechercher un article
        </label>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          id="blog-manager-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un article..."
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium text-sm">Erreur de chargement</p>
            <p className="text-red-600 text-xs mt-0.5">{error}</p>
          </div>
          <Button variant="outline" size="sm" className="sm:ml-auto" onClick={fetchArticles}>
            Réessayer
          </Button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Empty state */}
      {!loading && articles.length === 0 && !error && (
        <div className="text-center py-20">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">Aucun article</h3>
          <p className="text-slate-400 mb-6">Créez votre premier article de blog</p>
          <Button onClick={() => setEditingArticle('new')}>
            <Plus className="w-4 h-4 mr-2" />
            Créer un article
          </Button>
        </div>
      )}

      {/* Article list */}
      {!loading && (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((article) => {
              const frTrans = article.translations?.find((t) => t.language_code === 'fr');
              const langCount = article.translations?.filter((t) => t.title)?.length || 0;
              const statusInfo = STATUS_LABELS[article.status] || STATUS_LABELS.draft;
              const quality = evaluateBlogQuality(
                {
                  slug: article.slug,
                  sources: article.sources,
                  last_updated_at: article.last_updated_at,
                },
                frTrans || {}
              );

              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    {/* Image thumbnail */}
                    {article.featured_image_url ? (
                      <img
                        src={article.featured_image_url}
                        alt=""
                        className="h-36 w-full rounded-lg object-cover sm:h-14 sm:w-20 sm:flex-shrink-0"
                      />
                    ) : (
                      <div className="flex h-36 w-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 sm:h-14 sm:w-20 sm:flex-shrink-0">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {frTrans?.title || article.slug}
                        </h3>
                        <Badge className={`text-xs border ${statusInfo.color}`}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="mb-2 text-sm text-slate-500">
                        {frTrans?.excerpt || '/blog/' + article.slug}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {langCount}/23 langues
                        </span>
                        {article.category && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
                            {article.category}
                          </span>
                        )}
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
                          {article.persona_target === 'enterprise'
                            ? 'Entreprise'
                            : article.persona_target === 'agency'
                              ? 'Agence'
                              : 'Entreprise+Agence'}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
                          Risque {article.risk_level}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 ${
                          quality.score >= 80
                            ? 'bg-green-100 text-green-700'
                            : quality.score >= 60
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          Qualité {quality.score}
                        </span>
                        <span>
                          {new Date(article.updated_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 self-end sm:self-start">
                      {article.status === 'published' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-11 w-11 p-0 sm:h-9 sm:w-9"
                          onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                          aria-label="Voir l'article publié"
                          title="Voir"
                        >
                          <Eye className="w-4 h-4 text-slate-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-11 w-11 p-0 sm:h-9 sm:w-9"
                        onClick={() => setEditingArticle(article)}
                        aria-label="Modifier cet article"
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-11 w-11 p-0 sm:h-9 sm:w-9"
                        onClick={() => handleDelete(article.id)}
                        disabled={deletingId === article.id}
                        aria-label="Supprimer cet article"
                        title="Supprimer"
                      >
                        {deletingId === article.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-400" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
