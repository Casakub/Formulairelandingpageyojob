-- =============================================================================
-- MIGRATION 18: Blog System (articles + translations multilingues)
-- =============================================================================

-- Table principale des articles
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID,
  featured_image_url TEXT,
  category TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table des traductions (1 ligne par article x langue)
CREATE TABLE IF NOT EXISTS blog_article_translations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES blog_articles(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT, -- HTML from TipTap WYSIWYG
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(article_id, language_code)
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON blog_articles(status);
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published_at ON blog_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_translations_article ON blog_article_translations(article_id);
CREATE INDEX IF NOT EXISTS idx_blog_translations_lang ON blog_article_translations(language_code);

-- Trigger updated_at automatique
CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_articles_updated_at
  BEFORE UPDATE ON blog_articles
  FOR EACH ROW EXECUTE FUNCTION update_blog_updated_at();

CREATE TRIGGER blog_translations_updated_at
  BEFORE UPDATE ON blog_article_translations
  FOR EACH ROW EXECUTE FUNCTION update_blog_updated_at();

-- =============================================================================
-- RLS (Row Level Security)
-- =============================================================================
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_article_translations ENABLE ROW LEVEL SECURITY;

-- Public: lecture des articles publiés uniquement
CREATE POLICY "blog_articles_public_read" ON blog_articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "blog_translations_public_read" ON blog_article_translations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM blog_articles WHERE id = article_id AND status = 'published')
  );

-- Anon: lecture des articles publiés (même policy pour le rôle anon)
CREATE POLICY "blog_articles_anon_read" ON blog_articles
  FOR SELECT TO anon USING (status = 'published');

CREATE POLICY "blog_translations_anon_read" ON blog_article_translations
  FOR SELECT TO anon USING (
    EXISTS (SELECT 1 FROM blog_articles WHERE id = article_id AND status = 'published')
  );

-- Authenticated (admin): accès complet
CREATE POLICY "blog_articles_admin_all" ON blog_articles
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "blog_translations_admin_all" ON blog_article_translations
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
