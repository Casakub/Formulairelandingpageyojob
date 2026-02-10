import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Save,
  Globe,
  Eye,
  Search,
  Loader2,
  Tag,
  Link2,
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { TipTapEditor } from './TipTapEditor';
import { ImageDropZone } from './ImageDropZone';
import {
  BlogArticleWithTranslations,
  BlogTranslation,
  createArticle,
  updateArticle,
  generateSlug,
  uploadBlogImage,
} from '../../../services/blogService';
import { EUROPEAN_LANGUAGES } from '../../../lib/languages';

interface BlogEditorProps {
  article?: BlogArticleWithTranslations | null;
  onBack: () => void;
  onSaved: () => void;
}

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Brouillon', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'published', label: 'Publié', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'archived', label: 'Archivé', color: 'bg-slate-100 text-slate-800 border-slate-200' },
];

export function BlogEditor({ article, onBack, onSaved }: BlogEditorProps) {
  const isNew = !article;
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('fr');
  const [showSeoPanel, setShowSeoPanel] = useState(false);

  // Article fields
  const [slug, setSlug] = useState(article?.slug || '');
  const [status, setStatus] = useState<string>(article?.status || 'draft');
  const [category, setCategory] = useState(article?.category || '');
  const [featuredImage, setFeaturedImage] = useState(article?.featured_image_url || '');

  // Translations state
  const [translations, setTranslations] = useState<Record<string, BlogTranslation>>(() => {
    const initial: Record<string, BlogTranslation> = {};
    initial.fr = { language_code: 'fr', title: '', excerpt: '', content: '', seo_title: '', seo_description: '' };
    if (article?.translations) {
      for (const t of article.translations) {
        initial[t.language_code] = { ...t };
      }
    }
    return initial;
  });

  const activeLangs = Object.keys(translations).filter(
    (lang) => translations[lang].title || translations[lang].content
  );

  // Auto-generate slug from FR title
  useEffect(() => {
    if (isNew && translations.fr?.title && !slug) {
      setSlug(generateSlug(translations.fr.title));
    }
  }, [isNew, translations.fr?.title, slug]);

  const updateTranslation = (lang: string, field: keyof BlogTranslation, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], language_code: lang, [field]: value },
    }));
  };

  const addLanguage = (langCode: string) => {
    if (!translations[langCode]) {
      setTranslations((prev) => ({
        ...prev,
        [langCode]: { language_code: langCode, title: '', excerpt: '', content: '', seo_title: '', seo_description: '' },
      }));
    }
    setActiveLang(langCode);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const translationsList = Object.values(translations).filter((t) => t.title);
      if (isNew) {
        await createArticle(
          { slug, status: status as 'draft' | 'published' | 'archived', category, featured_image_url: featuredImage, tags: [] },
          translationsList
        );
      } else {
        await updateArticle(
          article!.id,
          { slug, status: status as 'draft' | 'published' | 'archived', category, featured_image_url: featuredImage },
          translationsList
        );
      }
      onSaved();
    } catch (err: any) {
      console.error('Erreur sauvegarde:', err);
      alert(`Erreur: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const currentT = translations[activeLang] || { language_code: activeLang, title: '', excerpt: '', content: '', seo_title: '', seo_description: '' };
  const langInfo = EUROPEAN_LANGUAGES.find((l) => l.code === activeLang);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-500 hover:text-slate-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isNew ? 'Nouvel article' : 'Modifier l\'article'}
            </h2>
            {!isNew && slug && (
              <p className="text-xs text-slate-400 mt-0.5">/blog/{slug}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSeoPanel(!showSeoPanel)} className={showSeoPanel ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}>
            <Search className="w-4 h-4 mr-2" />
            SEO
          </Button>
          <Button onClick={handleSave} disabled={saving || !translations.fr?.title || !slug} className="bg-blue-600 hover:bg-blue-700">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Sauvegarder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main editor (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Language tabs */}
          <div className="flex items-center gap-2 flex-wrap p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Globe className="w-4 h-4 text-slate-400" />
            {Object.keys(translations).map((lang) => {
              const info = EUROPEAN_LANGUAGES.find((l) => l.code === lang);
              const hasContent = translations[lang]?.title;
              return (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeLang === lang
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : hasContent
                      ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      : 'bg-transparent text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {info?.flag} {lang.toUpperCase()}
                </button>
              );
            })}
            <select
              className="px-2 py-1.5 rounded-lg text-sm border border-dashed border-slate-300 bg-white text-slate-500 cursor-pointer hover:border-blue-400 transition-colors"
              value=""
              onChange={(e) => e.target.value && addLanguage(e.target.value)}
            >
              <option value="">+ Langue</option>
              {EUROPEAN_LANGUAGES.filter((l) => !translations[l.code]).map((l) => (
                <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Titre {langInfo?.flag} {activeLang.toUpperCase()}
            </label>
            <input
              type="text"
              value={currentT.title}
              onChange={(e) => updateTranslation(activeLang, 'title', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Titre de l'article..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Extrait {activeLang.toUpperCase()}
            </label>
            <textarea
              value={currentT.excerpt || ''}
              onChange={(e) => updateTranslation(activeLang, 'excerpt', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={2}
              placeholder="Court résumé qui apparaîtra dans la liste du blog..."
            />
          </div>

          {/* WYSIWYG Editor */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Contenu {activeLang.toUpperCase()}
            </label>
            <TipTapEditor
              key={activeLang}
              content={currentT.content || ''}
              onChange={(html) => updateTranslation(activeLang, 'content', html)}
              placeholder={`Rédigez votre article en ${langInfo?.name || activeLang}... Vous pouvez glisser-déposer des images directement dans l'éditeur.`}
              onImageUpload={uploadBlogImage}
            />
          </div>

          {/* SEO Panel */}
          {showSeoPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-5 rounded-xl border border-blue-100 bg-blue-50/50 space-y-4"
            >
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                Optimisation SEO - {activeLang.toUpperCase()}
              </h3>

              {/* Google preview */}
              <div className="p-4 rounded-lg bg-white border border-slate-200">
                <p className="text-xs text-slate-400 mb-2">Aperçu Google</p>
                <p className="text-blue-700 text-base font-medium truncate">
                  {currentT.seo_title || currentT.title || 'Titre de l\'article'} | YOJOB Blog
                </p>
                <p className="text-green-700 text-xs truncate">
                  yojob.fr/blog/{slug || 'mon-article'}
                </p>
                <p className="text-slate-600 text-xs mt-1 line-clamp-2">
                  {currentT.seo_description || currentT.excerpt || 'Description de l\'article...'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Titre SEO <span className="text-slate-400">({(currentT.seo_title || '').length}/60)</span>
                </label>
                <input
                  type="text"
                  value={currentT.seo_title || ''}
                  onChange={(e) => updateTranslation(activeLang, 'seo_title', e.target.value)}
                  maxLength={60}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder={currentT.title || 'Titre SEO...'}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Description SEO <span className="text-slate-400">({(currentT.seo_description || '').length}/160)</span>
                </label>
                <textarea
                  value={currentT.seo_description || ''}
                  onChange={(e) => updateTranslation(activeLang, 'seo_description', e.target.value)}
                  maxLength={160}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                  rows={2}
                  placeholder={currentT.excerpt || 'Description pour les moteurs de recherche...'}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Statut</label>
            <div className="flex flex-col gap-1.5">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                    status === opt.value
                      ? opt.color + ' shadow-sm'
                      : 'border-transparent text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    opt.value === 'draft' ? 'bg-yellow-500' :
                    opt.value === 'published' ? 'bg-green-500' : 'bg-slate-400'
                  }`} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slug */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Link2 className="w-3.5 h-3.5 inline mr-1" />
              URL
            </label>
            <div className="flex items-center gap-1 bg-slate-50 rounded-lg px-2 py-1.5 border border-slate-100">
              <span className="text-xs text-slate-400 flex-shrink-0">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="flex-1 bg-transparent text-sm font-mono text-slate-700 focus:outline-none"
                placeholder="mon-article"
              />
            </div>
          </div>

          {/* Category */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Tag className="w-3.5 h-3.5 inline mr-1" />
              Catégorie
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="ex: Réglementation"
            />
          </div>

          {/* Featured image - drag & drop */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Image de couverture
            </label>
            <ImageDropZone
              value={featuredImage}
              onChange={setFeaturedImage}
              compact
            />
          </div>

          {/* Languages summary */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Globe className="w-3.5 h-3.5 inline mr-1" />
              Traductions
            </label>
            <div className="flex flex-wrap gap-1">
              {EUROPEAN_LANGUAGES.map((lang) => {
                const hasContent = translations[lang.code]?.title;
                return (
                  <button
                    key={lang.code}
                    onClick={() => addLanguage(lang.code)}
                    className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
                      hasContent
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-500'
                    }`}
                    title={lang.name}
                  >
                    {lang.code}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <span className="font-medium text-green-600">{activeLangs.length}</span>/23 langues
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}