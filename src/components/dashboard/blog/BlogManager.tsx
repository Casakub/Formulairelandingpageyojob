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

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Brouillon', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Blog
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {articles.length} article{articles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setEditingArticle('new')}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvel article
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un article..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium text-sm">Erreur de chargement</p>
            <p className="text-red-600 text-xs mt-0.5">{error}</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto" onClick={fetchArticles}>
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

              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Image thumbnail */}
                    {article.featured_image_url ? (
                      <img
                        src={article.featured_image_url}
                        alt=""
                        className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-14 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-900 truncate">
                          {frTrans?.title || article.slug}
                        </h3>
                        <Badge className={`text-xs border ${statusInfo.color}`}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 truncate mb-2">
                        {frTrans?.excerpt || '/blog/' + article.slug}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {langCount}/23 langues
                        </span>
                        {article.category && (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {article.category}
                          </span>
                        )}
                        <span>
                          {new Date(article.updated_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {article.status === 'published' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                          title="Voir"
                        >
                          <Eye className="w-4 h-4 text-slate-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setEditingArticle(article)}
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDelete(article.id)}
                        disabled={deletingId === article.id}
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