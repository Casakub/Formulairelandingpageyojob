import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Save,
  Globe,
  Eye,
  Settings,
  Loader2,
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { TipTapEditor } from './TipTapEditor';
import {
  BlogArticleWithTranslations,
  BlogTranslation,
  createArticle,
  updateArticle,
  generateSlug,
} from '../../../services/blogService';
import { EUROPEAN_LANGUAGES } from '../../../lib/languages';

interface BlogEditorProps {
  article?: BlogArticleWithTranslations | null;
  onBack: () => void;
  onSaved: () => void;
}

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Brouillon', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'published', label: 'Publié', color: 'bg-green-100 text-green-800' },
  { value: 'archived', label: 'Archivé', color: 'bg-slate-100 text-slate-800' },
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

  // Translations state: { fr: { title, excerpt, content, seo_title, seo_description }, en: {...}, ... }
  const [translations, setTranslations] = useState<Record<string, BlogTranslation>>(() => {
    const initial: Record<string, BlogTranslation> = {};
    // Init FR at minimum
    initial.fr = { language_code: 'fr', title: '', excerpt: '', content: '', seo_title: '', seo_description: '' };

    if (article?.translations) {
      for (const t of article.translations) {
        initial[t.language_code] = { ...t };
      }
    }
    return initial;
  });

  // Languages that have content
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
      [lang]: {
        ...prev[lang],
        language_code: lang,
        [field]: value,
      },
    }));
  };

  const addLanguage = (langCode: string) => {
    if (!translations[langCode]) {
      setTranslations((prev) => ({
        ...prev,
        [langCode]: {
          language_code: langCode,
          title: '',
          excerpt: '',
          content: '',
          seo_title: '',
          seo_description: '',
        },
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
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h2 className="text-xl font-semibold text-slate-900">
            {isNew ? 'Nouvel article' : 'Modifier l\'article'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSeoPanel(!showSeoPanel)}>
            <Settings className="w-4 h-4 mr-2" />
            SEO
          </Button>
          <Button onClick={handleSave} disabled={saving || !translations.fr?.title || !slug}>
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Sauvegarder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main editor (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Language tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <Globe className="w-4 h-4 text-slate-500" />
            {Object.keys(translations).map((lang) => {
              const info = EUROPEAN_LANGUAGES.find((l) => l.code === lang);
              const hasContent = translations[lang]?.title;
              return (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    activeLang === lang
                      ? 'bg-blue-600 text-white shadow-md'
                      : hasContent
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {info?.flag} {lang.toUpperCase()}
                </button>
              );
            })}

            {/* Add language dropdown */}
            <select
              className="px-2 py-1.5 rounded-lg text-sm border border-dashed border-slate-300 bg-white text-slate-500 cursor-pointer"
              value=""
              onChange={(e) => e.target.value && addLanguage(e.target.value)}
            >
              <option value="">+ Ajouter langue</option>
              {EUROPEAN_LANGUAGES.filter((l) => !translations[l.code]).map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Titre ({langInfo?.flag} {activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={currentT.title}
              onChange={(e) => updateTranslation(activeLang, 'title', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Titre de l'article..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Extrait ({activeLang.toUpperCase()})
            </label>
            <textarea
              value={currentT.excerpt || ''}
              onChange={(e) => updateTranslation(activeLang, 'excerpt', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="Court résumé de l'article..."
            />
          </div>

          {/* WYSIWYG Editor */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contenu ({activeLang.toUpperCase()})
            </label>
            <TipTapEditor
              key={activeLang} // Force re-mount on language change
              content={currentT.content || ''}
              onChange={(html) => updateTranslation(activeLang, 'content', html)}
              placeholder={`Rédigez votre article en ${langInfo?.name || activeLang}...`}
            />
          </div>

          {/* SEO Panel (collapsible) */}
          {showSeoPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3"
            >
              <h3 className="font-medium text-slate-700 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                SEO - {activeLang.toUpperCase()}
              </h3>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Titre SEO (max 60 car.)</label>
                <input
                  type="text"
                  value={currentT.seo_title || ''}
                  onChange={(e) => updateTranslation(activeLang, 'seo_title', e.target.value)}
                  maxLength={60}
                  className="w-full px-3 py-2 rounded border border-slate-200 text-sm"
                  placeholder={currentT.title || 'Titre SEO...'}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Description SEO (max 160 car.)</label>
                <textarea
                  value={currentT.seo_description || ''}
                  onChange={(e) => updateTranslation(activeLang, 'seo_description', e.target.value)}
                  maxLength={160}
                  className="w-full px-3 py-2 rounded border border-slate-200 text-sm"
                  rows={2}
                  placeholder={currentT.excerpt || 'Description SEO...'}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar (1 col) */}
        <div className="space-y-4">
          {/* Status */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-200 text-sm"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <Badge className={`mt-2 ${STATUS_OPTIONS.find((o) => o.value === status)?.color}`}>
              {STATUS_OPTIONS.find((o) => o.value === status)?.label}
            </Badge>
          </div>

          {/* Slug */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <label className="block text-sm font-medium text-slate-700 mb-2">Slug (URL)</label>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="flex-1 px-2 py-1.5 rounded border border-slate-200 text-sm font-mono"
                placeholder="mon-article"
              />
            </div>
          </div>

          {/* Category */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-200 text-sm"
              placeholder="ex: Réglementation"
            />
          </div>

          {/* Featured image */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <label className="block text-sm font-medium text-slate-700 mb-2">Image de couverture</label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="w-full px-3 py-2 rounded border border-slate-200 text-sm"
              placeholder="URL de l'image..."
            />
            {featuredImage && (
              <img src={featuredImage} alt="Preview" className="mt-2 rounded-lg w-full h-32 object-cover" />
            )}
          </div>

          {/* Languages summary */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <label className="block text-sm font-medium text-slate-700 mb-2">Traductions</label>
            <div className="flex flex-wrap gap-1">
              {EUROPEAN_LANGUAGES.map((lang) => {
                const hasContent = translations[lang.code]?.title;
                return (
                  <span
                    key={lang.code}
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      hasContent ? 'bg-green-100 text-green-700' : 'bg-slate-50 text-slate-300'
                    }`}
                    title={lang.name}
                  >
                    {lang.code}
                  </span>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {activeLangs.length}/23 langues renseignées
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}