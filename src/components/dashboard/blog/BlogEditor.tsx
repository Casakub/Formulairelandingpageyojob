import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Save,
  Globe,
  Loader2,
  Link2,
  Tag,
  ShieldAlert,
  Building2,
  CalendarClock,
  Plus,
  X,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { TipTapEditor } from './TipTapEditor';
import { ImageDropZone } from './ImageDropZone';
import {
  BlogArticleWithTranslations,
  BlogPersonaTarget,
  BlogRiskLevel,
  BlogSource,
  BlogTranslation,
  createArticle,
  generateSlug,
  updateArticle,
  uploadBlogImage,
} from '../../../services/blogService';
import { EUROPEAN_LANGUAGES } from '../../../lib/languages';
import { evaluateBlogQuality } from '@/lib/blogQuality';

interface BlogEditorProps {
  article?: BlogArticleWithTranslations | null;
  onBack: () => void;
  onSaved: () => void;
}

type PreviewMode = 'desktop' | 'mobile';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Brouillon', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'in_review', label: 'En review', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'published', label: 'Publie', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'archived', label: 'Archive', color: 'bg-slate-100 text-slate-800 border-slate-200' },
];
const PANEL_CLASS = 'rounded-xl border border-slate-200 bg-white p-4 shadow-sm';
const FIELD_CLASS = 'w-full min-h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500';
const TEXTAREA_CLASS = `${FIELD_CLASS} py-2.5 resize-none`;
const FIELD_LABEL_CLASS = 'mb-1.5 block text-sm font-medium text-slate-700';

function createEmptyTranslation(languageCode: string): BlogTranslation {
  return {
    language_code: languageCode,
    title: '',
    excerpt: '',
    content: '',
    seo_title: '',
    seo_description: '',
    faq_items: [],
    key_points: [],
    checklist_items: [],
    cta_mid_label: '',
    cta_mid_text: '',
    cta_end_label: '',
    cta_end_text: '',
    internal_links: [],
  };
}

function normalizeTranslation(translation: Partial<BlogTranslation>, languageCode: string): BlogTranslation {
  return {
    ...createEmptyTranslation(languageCode),
    ...translation,
    language_code: languageCode,
    faq_items: translation.faq_items || [],
    key_points: translation.key_points || [],
    checklist_items: translation.checklist_items || [],
    internal_links: translation.internal_links || [],
  };
}

function toDateInputValue(iso?: string): string {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return new Date(iso).toISOString().slice(0, 10);
}

function sanitizeTranslationPayload(translation: BlogTranslation): BlogTranslation {
  return {
    ...translation,
    title: (translation.title || '').trim(),
    excerpt: (translation.excerpt || '').trim(),
    seo_title: (translation.seo_title || '').trim(),
    seo_description: (translation.seo_description || '').trim(),
    faq_items: (translation.faq_items || [])
      .map((faq) => ({
        question: (faq.question || '').trim(),
        answer: (faq.answer || '').trim(),
      }))
      .filter((faq) => faq.question && faq.answer),
    key_points: (translation.key_points || []).map((item) => item.trim()).filter(Boolean),
    checklist_items: (translation.checklist_items || []).map((item) => item.trim()).filter(Boolean),
    cta_mid_label: (translation.cta_mid_label || '').trim(),
    cta_mid_text: (translation.cta_mid_text || '').trim(),
    cta_end_label: (translation.cta_end_label || '').trim(),
    cta_end_text: (translation.cta_end_text || '').trim(),
    internal_links: (translation.internal_links || [])
      .map((link) => ({ label: link.label.trim(), url: link.url.trim() }))
      .filter((link) => link.label && link.url),
  };
}

export function BlogEditor({ article, onBack, onSaved }: BlogEditorProps) {
  const isNew = !article;
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('fr');
  const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');

  const [slug, setSlug] = useState(article?.slug || '');
  const [status, setStatus] = useState<string>(article?.status || 'draft');
  const [category, setCategory] = useState(article?.category || '');
  const [featuredImage, setFeaturedImage] = useState(article?.featured_image_url || '');
  const [personaTarget, setPersonaTarget] = useState<BlogPersonaTarget>(article?.persona_target || 'both');
  const [riskLevel, setRiskLevel] = useState<BlogRiskLevel>(article?.risk_level || 'medium');
  const [ctaPersona, setCtaPersona] = useState<BlogPersonaTarget>(article?.cta_persona || article?.persona_target || 'both');
  const [lastUpdatedAt, setLastUpdatedAt] = useState(toDateInputValue(article?.last_updated_at || article?.updated_at));
  const [sources, setSources] = useState<BlogSource[]>(
    article?.sources?.length ? article.sources : [{ label: '', url: '' }]
  );

  const [translations, setTranslations] = useState<Record<string, BlogTranslation>>(() => {
    const initial: Record<string, BlogTranslation> = {
      fr: createEmptyTranslation('fr'),
    };
    if (article?.translations) {
      for (const translation of article.translations) {
        initial[translation.language_code] = normalizeTranslation(translation, translation.language_code);
      }
    }
    return initial;
  });

  const currentTranslation = translations[activeLang] || createEmptyTranslation(activeLang);
  const frTranslation = translations.fr || currentTranslation;

  const activeLangs = Object.keys(translations).filter((code) => {
    const translation = translations[code];
    return Boolean((translation.title || '').trim()) || Boolean((translation.content || '').trim());
  });

  const validSources = useMemo(
    () =>
      sources
        .map((source) => ({ label: source.label.trim(), url: source.url.trim() }))
        .filter((source) => source.label && source.url),
    [sources]
  );

  const quality = useMemo(() => {
    const articlePayload = {
      slug,
      last_updated_at: lastUpdatedAt ? new Date(`${lastUpdatedAt}T12:00:00Z`).toISOString() : undefined,
      sources: validSources,
    };
    return evaluateBlogQuality(articlePayload, currentTranslation);
  }, [currentTranslation, slug, lastUpdatedAt, validSources]);

  const publishQuality = useMemo(() => {
    const articlePayload = {
      slug,
      last_updated_at: lastUpdatedAt ? new Date(`${lastUpdatedAt}T12:00:00Z`).toISOString() : undefined,
      sources: validSources,
    };
    return evaluateBlogQuality(articlePayload, frTranslation);
  }, [frTranslation, slug, lastUpdatedAt, validSources]);

  useEffect(() => {
    if (isNew && translations.fr?.title && !slug) {
      setSlug(generateSlug(translations.fr.title));
    }
  }, [isNew, translations.fr?.title, slug]);

  const updateTranslation = (lang: string, patch: Partial<BlogTranslation>) => {
    setTranslations((prev) => {
      const current = prev[lang] || createEmptyTranslation(lang);
      return {
        ...prev,
        [lang]: {
          ...current,
          ...patch,
          language_code: lang,
        },
      };
    });
  };

  const addLanguage = (langCode: string) => {
    if (!translations[langCode]) {
      setTranslations((prev) => ({
        ...prev,
        [langCode]: createEmptyTranslation(langCode),
      }));
    }
    setActiveLang(langCode);
  };

  const setArrayItem = (
    field: 'key_points' | 'checklist_items',
    index: number,
    value: string
  ) => {
    const list = [...(currentTranslation[field] || [])];
    list[index] = value;
    updateTranslation(activeLang, { [field]: list } as Partial<BlogTranslation>);
  };

  const addArrayItem = (field: 'key_points' | 'checklist_items') => {
    const list = [...(currentTranslation[field] || []), ''];
    updateTranslation(activeLang, { [field]: list } as Partial<BlogTranslation>);
  };

  const removeArrayItem = (field: 'key_points' | 'checklist_items', index: number) => {
    const list = [...(currentTranslation[field] || [])];
    list.splice(index, 1);
    updateTranslation(activeLang, { [field]: list } as Partial<BlogTranslation>);
  };

  const setFaqItem = (
    index: number,
    key: 'question' | 'answer',
    value: string
  ) => {
    const faqs = [...(currentTranslation.faq_items || [])];
    const currentFaq = faqs[index] || { question: '', answer: '' };
    faqs[index] = { ...currentFaq, [key]: value };
    updateTranslation(activeLang, { faq_items: faqs });
  };

  const addFaqItem = () => {
    const faqs = [...(currentTranslation.faq_items || []), { question: '', answer: '' }];
    updateTranslation(activeLang, { faq_items: faqs });
  };

  const removeFaqItem = (index: number) => {
    const faqs = [...(currentTranslation.faq_items || [])];
    faqs.splice(index, 1);
    updateTranslation(activeLang, { faq_items: faqs });
  };

  const setInternalLink = (
    index: number,
    key: 'label' | 'url',
    value: string
  ) => {
    const links = [...(currentTranslation.internal_links || [])];
    const currentLink = links[index] || { label: '', url: '' };
    links[index] = { ...currentLink, [key]: value };
    updateTranslation(activeLang, { internal_links: links });
  };

  const addInternalLink = () => {
    const links = [...(currentTranslation.internal_links || []), { label: '', url: '' }];
    updateTranslation(activeLang, { internal_links: links });
  };

  const removeInternalLink = (index: number) => {
    const links = [...(currentTranslation.internal_links || [])];
    links.splice(index, 1);
    updateTranslation(activeLang, { internal_links: links });
  };

  const updateSource = (index: number, key: keyof BlogSource, value: string) => {
    setSources((prev) => {
      const next = [...prev];
      const current = next[index] || { label: '', url: '' };
      next[index] = { ...current, [key]: value };
      return next;
    });
  };

  const addSource = () => {
    setSources((prev) => [...prev, { label: '', url: '' }]);
  };

  const removeSource = (index: number) => {
    setSources((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next.length > 0 ? next : [{ label: '', url: '' }];
    });
  };

  const handleSave = async () => {
    const shouldPublish = status === 'published';

    if (shouldPublish && !publishQuality.publishReady) {
      alert(
        `Publication bloquee.\n\nCorrigez les points obligatoires:\n- ${publishQuality.blockingIssues.join('\n- ')}`
      );
      return;
    }

    setSaving(true);
    try {
      const translationsList = Object.values(translations)
        .map((translation) => sanitizeTranslationPayload(translation))
        .filter((translation) => translation.title);

      const articlePayload = {
        slug,
        status: status as 'draft' | 'in_review' | 'published' | 'archived',
        category,
        featured_image_url: featuredImage,
        tags: article?.tags || [],
        persona_target: personaTarget,
        risk_level: riskLevel,
        cta_persona: ctaPersona,
        last_updated_at: new Date(`${lastUpdatedAt}T12:00:00Z`).toISOString(),
        sources: validSources,
      };

      if (isNew) {
        await createArticle(articlePayload, translationsList);
      } else {
        await updateArticle(article!.id, articlePayload, translationsList);
      }

      onSaved();
    } catch (err: any) {
      console.error('Erreur sauvegarde:', err);
      alert(`Erreur: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const canSave = Boolean((currentTranslation.title || '').trim()) && Boolean(slug);
  const langInfo = EUROPEAN_LANGUAGES.find((language) => language.code === activeLang);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-500 hover:text-slate-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isNew ? 'Nouvel article SEO-ready' : 'Edition article'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Workflow: brouillon / en review / publie / archive
            </p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving || !canSave}
          className={`min-h-11 w-full sm:w-auto ${status === 'published' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {status === 'published' ? 'Publier' : 'Sauvegarder'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <Globe className="w-4 h-4 text-slate-400" />
            {Object.keys(translations).map((lang) => {
              const hasContent = Boolean(translations[lang]?.title);
              const info = EUROPEAN_LANGUAGES.find((language) => language.code === lang);
              return (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`min-h-11 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
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
              className="min-h-11 rounded-lg border border-dashed border-slate-300 bg-white px-2 text-sm text-slate-600 shadow-sm transition-colors hover:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500"
              value=""
              onChange={(event) => event.target.value && addLanguage(event.target.value)}
            >
              <option value="">+ Langue</option>
              {EUROPEAN_LANGUAGES.filter((language) => !translations[language.code]).map((language) => (
                <option key={language.code} value={language.code}>
                  {language.flag} {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className={`${PANEL_CLASS} space-y-4`}>
            <div>
              <label className={FIELD_LABEL_CLASS}>
                Titre {langInfo?.flag} {activeLang.toUpperCase()} *
              </label>
              <input
                type="text"
                value={currentTranslation.title}
                onChange={(event) => updateTranslation(activeLang, { title: event.target.value })}
                className={`${FIELD_CLASS} px-4 text-lg font-semibold`}
                placeholder="Titre de l'article..."
              />
            </div>

            <div>
              <label className={FIELD_LABEL_CLASS}>
                Excerpt *
              </label>
              <textarea
                value={currentTranslation.excerpt || ''}
                onChange={(event) => updateTranslation(activeLang, { excerpt: event.target.value })}
                className={`${TEXTAREA_CLASS} px-4`}
                rows={3}
                placeholder="Résumé utile de l'article..."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Meta title * ({(currentTranslation.seo_title || '').length}/60)
                </label>
                <input
                  type="text"
                  value={currentTranslation.seo_title || ''}
                  maxLength={60}
                  onChange={(event) => updateTranslation(activeLang, { seo_title: event.target.value })}
                  className={FIELD_CLASS}
                  placeholder={currentTranslation.title || 'Meta title...'}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Meta description * ({(currentTranslation.seo_description || '').length}/160)
                </label>
                <textarea
                  value={currentTranslation.seo_description || ''}
                  maxLength={160}
                  onChange={(event) => updateTranslation(activeLang, { seo_description: event.target.value })}
                  className={TEXTAREA_CLASS}
                  rows={2}
                  placeholder={currentTranslation.excerpt || 'Meta description...'}
                />
              </div>
            </div>
          </div>

          <div className={`${PANEL_CLASS} space-y-4`}>
            <h3 className="font-semibold text-slate-800">Blocs structurés</h3>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Points clés</label>
                <Button type="button" size="sm" variant="outline" className="min-h-11" onClick={() => addArrayItem('key_points')}>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-2">
                {(currentTranslation.key_points || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(event) => setArrayItem('key_points', index, event.target.value)}
                      className={`flex-1 ${FIELD_CLASS}`}
                      placeholder="Point clé..."
                    />
                    <Button type="button" size="icon" variant="ghost" className="h-11 w-11 md:h-9 md:w-9" onClick={() => removeArrayItem('key_points', index)}>
                      <X className="w-4 h-4 text-slate-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Checklist</label>
                <Button type="button" size="sm" variant="outline" className="min-h-11" onClick={() => addArrayItem('checklist_items')}>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-2">
                {(currentTranslation.checklist_items || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(event) => setArrayItem('checklist_items', index, event.target.value)}
                      className={`flex-1 ${FIELD_CLASS}`}
                      placeholder="Etape checklist..."
                    />
                    <Button type="button" size="icon" variant="ghost" className="h-11 w-11 md:h-9 md:w-9" onClick={() => removeArrayItem('checklist_items', index)}>
                      <X className="w-4 h-4 text-slate-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">FAQ *</label>
                <Button type="button" size="sm" variant="outline" className="min-h-11" onClick={addFaqItem}>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Ajouter Q/R
                </Button>
              </div>
              <div className="space-y-3">
                {(currentTranslation.faq_items || []).map((faq, index) => (
                  <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(event) => setFaqItem(index, 'question', event.target.value)}
                      className={FIELD_CLASS}
                      placeholder="Question"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(event) => setFaqItem(index, 'answer', event.target.value)}
                      className={TEXTAREA_CLASS}
                      rows={3}
                      placeholder="Réponse"
                    />
                    <div className="text-right">
                      <Button type="button" size="sm" variant="ghost" className="min-h-11" onClick={() => removeFaqItem(index)}>
                        <X className="w-3.5 h-3.5 mr-1" />
                        Retirer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">CTA mid-article *</label>
                <input
                  type="text"
                  value={currentTranslation.cta_mid_label || ''}
                  onChange={(event) => updateTranslation(activeLang, { cta_mid_label: event.target.value })}
                  className={FIELD_CLASS}
                  placeholder="Ex: Demander un audit conformité"
                />
                <textarea
                  value={currentTranslation.cta_mid_text || ''}
                  onChange={(event) => updateTranslation(activeLang, { cta_mid_text: event.target.value })}
                  className={`mt-2 ${TEXTAREA_CLASS}`}
                  rows={2}
                  placeholder="Texte de contexte CTA mid"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">CTA fin d'article *</label>
                <input
                  type="text"
                  value={currentTranslation.cta_end_label || ''}
                  onChange={(event) => updateTranslation(activeLang, { cta_end_label: event.target.value })}
                  className={FIELD_CLASS}
                  placeholder="Ex: Demander un devis personnalisé"
                />
                <textarea
                  value={currentTranslation.cta_end_text || ''}
                  onChange={(event) => updateTranslation(activeLang, { cta_end_text: event.target.value })}
                  className={`mt-2 ${TEXTAREA_CLASS}`}
                  rows={2}
                  placeholder="Texte de contexte CTA fin"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Maillage interne (semi-auto)</label>
                <Button type="button" size="sm" variant="outline" className="min-h-11" onClick={addInternalLink}>
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Ajouter lien
                </Button>
              </div>
              <div className="space-y-2">
                {(currentTranslation.internal_links || []).map((link, index) => (
                  <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(event) => setInternalLink(index, 'label', event.target.value)}
                      className={FIELD_CLASS}
                      placeholder="Ancre"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(event) => setInternalLink(index, 'url', event.target.value)}
                      className={FIELD_CLASS}
                      placeholder="/blog/..."
                    />
                    <Button type="button" size="icon" variant="ghost" className="h-11 w-11 md:h-9 md:w-9" onClick={() => removeInternalLink(index)}>
                      <X className="w-4 h-4 text-slate-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Contenu {activeLang.toUpperCase()}
            </label>
            <TipTapEditor
              key={activeLang}
              content={currentTranslation.content || ''}
              onChange={(html) => updateTranslation(activeLang, { content: html })}
              placeholder={`Rédigez votre article en ${langInfo?.name || activeLang}...`}
              onImageUpload={uploadBlogImage}
            />
          </div>
        </div>

        <aside className="space-y-4">
          <div className={PANEL_CLASS}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-slate-800">Score qualite</p>
              <Badge className={quality.score >= 80 ? 'bg-green-100 text-green-700' : quality.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}>
                {quality.score}/100
              </Badge>
            </div>
            <div className="space-y-2">
              {quality.checks.map((check) => (
                <div key={check.id} className="flex items-start gap-2 text-xs">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${check.blocking ? 'text-red-500' : 'text-amber-500'}`} />
                  )}
                  <div>
                    <p className={check.passed ? 'text-slate-700' : check.blocking ? 'text-red-700' : 'text-amber-700'}>
                      {check.label}
                      {check.blocking && ' *'}
                    </p>
                    {!check.passed && (
                      <p className="text-slate-500">{check.hint}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {status === 'published' && !publishQuality.publishReady && (
              <p className="mt-3 text-xs text-red-600">
                Publication bloquee: corrigez les champs obligatoires en FR.
              </p>
            )}
          </div>

          <div className={`${PANEL_CLASS} space-y-3`}>
            <label className="block text-sm font-semibold text-slate-700">Workflow</label>
            <div className="grid grid-cols-2 gap-2">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStatus(option.value)}
                  className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-medium ${
                    status === option.value ? option.color : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`${PANEL_CLASS} space-y-3`}>
            <label className="block text-sm font-semibold text-slate-700">
              <Link2 className="w-3.5 h-3.5 inline mr-1" />
              Slug *
            </label>
            <div className="flex min-h-11 items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/40">
              <span className="text-xs text-slate-400 flex-shrink-0">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(event) => setSlug(generateSlug(event.target.value))}
                className="flex-1 bg-transparent text-sm font-mono text-slate-700 focus:outline-none"
                placeholder="mon-article"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                <Tag className="w-3.5 h-3.5 inline mr-1" />
                Theme
              </label>
              <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={FIELD_CLASS}
                placeholder="ex: Réglementation"
              />
            </div>
          </div>

          <div className={`${PANEL_CLASS} space-y-3`}>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                <Building2 className="w-3.5 h-3.5 inline mr-1" />
                Persona cible
              </label>
              <select
                value={personaTarget}
                onChange={(event) => setPersonaTarget(event.target.value as BlogPersonaTarget)}
                className={FIELD_CLASS}
              >
                <option value="enterprise">Entreprise</option>
                <option value="agency">Agence</option>
                <option value="both">Entreprise + Agence</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                <ShieldAlert className="w-3.5 h-3.5 inline mr-1" />
                Niveau de risque
              </label>
              <select
                value={riskLevel}
                onChange={(event) => setRiskLevel(event.target.value as BlogRiskLevel)}
                className={FIELD_CLASS}
              >
                <option value="low">Faible</option>
                <option value="medium">Modere</option>
                <option value="high">Eleve</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                CTA persona *
              </label>
              <select
                value={ctaPersona}
                onChange={(event) => setCtaPersona(event.target.value as BlogPersonaTarget)}
                className={FIELD_CLASS}
              >
                <option value="enterprise">Entreprise</option>
                <option value="agency">Agence</option>
                <option value="both">Entreprise + Agence</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                <CalendarClock className="w-3.5 h-3.5 inline mr-1" />
                Date de mise a jour *
              </label>
              <input
                type="date"
                value={lastUpdatedAt}
                onChange={(event) => setLastUpdatedAt(event.target.value)}
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div className={PANEL_CLASS}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Sources officielles *</label>
              <Button type="button" size="sm" variant="outline" className="min-h-11" onClick={addSource}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {sources.map((source, index) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <input
                    type="text"
                    value={source.label}
                    onChange={(event) => updateSource(index, 'label', event.target.value)}
                    className={FIELD_CLASS}
                    placeholder="Organisme"
                  />
                  <input
                    type="url"
                    value={source.url}
                    onChange={(event) => updateSource(index, 'url', event.target.value)}
                    className={FIELD_CLASS}
                    placeholder="https://..."
                  />
                  <Button type="button" size="icon" variant="ghost" className="h-11 w-11 md:h-9 md:w-9" onClick={() => removeSource(index)}>
                    <X className="w-4 h-4 text-slate-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className={PANEL_CLASS}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Image de couverture
            </label>
            <ImageDropZone value={featuredImage} onChange={setFeaturedImage} compact />
          </div>

          <div className={PANEL_CLASS}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                Preview
              </label>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  className="min-h-11"
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="w-3.5 h-3.5 mr-1" />
                  Desktop
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  className="min-h-11"
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="w-3.5 h-3.5 mr-1" />
                  Mobile
                </Button>
              </div>
            </div>
            <div className={`${previewMode === 'mobile' ? 'max-w-[320px] mx-auto' : ''}`}>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 text-xs text-slate-500">
                  yojob.fr/blog/{slug || 'mon-article'}
                </div>
                <div className="p-3 space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {currentTranslation.title || 'Titre article'}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {currentTranslation.excerpt || 'Extrait de l\'article...'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Meta: {(currentTranslation.seo_title || currentTranslation.title || '').slice(0, 70)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={PANEL_CLASS}>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Globe className="w-3.5 h-3.5 inline mr-1" />
              Traductions
            </label>
            <div className="flex flex-wrap gap-1">
              {EUROPEAN_LANGUAGES.map((language) => {
                const hasContent = translations[language.code]?.title;
                return (
                  <button
                    key={language.code}
                    onClick={() => addLanguage(language.code)}
                    className={`text-xs px-1.5 py-0.5 rounded transition-colors ${
                      hasContent
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-50 text-slate-300 hover:bg-slate-100 hover:text-slate-500'
                    }`}
                    title={language.name}
                  >
                    {language.code}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              <span className="font-medium text-green-600">{activeLangs.length}</span>/23 langues
            </p>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
