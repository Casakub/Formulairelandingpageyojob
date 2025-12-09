-- 🌍 Landing Page Translations Table
-- Table pour stocker les traductions de la landing page YOJOB dans 23 langues européennes

-- Créer la table landing_translations
CREATE TABLE IF NOT EXISTS landing_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_code VARCHAR(5) NOT NULL UNIQUE, -- fr, en, de, es, etc.
  content JSONB NOT NULL, -- Contenu complet de la landing page (hero, services, footer, etc.)
  translation_status VARCHAR(20) DEFAULT 'draft', -- draft, published
  translation_progress INTEGER DEFAULT 0, -- 0-100%
  translated_by VARCHAR(20) DEFAULT 'manual', -- manual, ai, bulk_upload
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche rapide par langue
CREATE INDEX IF NOT EXISTS idx_landing_translations_language 
  ON landing_translations(language_code);

-- Index pour recherche par statut
CREATE INDEX IF NOT EXISTS idx_landing_translations_status 
  ON landing_translations(translation_status);

-- Index GIN pour recherche dans le contenu JSON
CREATE INDEX IF NOT EXISTS idx_landing_translations_content 
  ON landing_translations USING GIN (content);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_landing_translations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_update_landing_translations_updated_at ON landing_translations;
CREATE TRIGGER trigger_update_landing_translations_updated_at
  BEFORE UPDATE ON landing_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_landing_translations_updated_at();

-- Commentaires sur la table
COMMENT ON TABLE landing_translations IS 'Traductions de la landing page YOJOB dans 23 langues européennes';
COMMENT ON COLUMN landing_translations.language_code IS 'Code ISO 639-1 de la langue (fr, en, de, etc.)';
COMMENT ON COLUMN landing_translations.content IS 'Contenu complet de la landing page au format JSON';
COMMENT ON COLUMN landing_translations.translation_status IS 'Statut de la traduction (draft, published)';
COMMENT ON COLUMN landing_translations.translation_progress IS 'Progression de la traduction (0-100%)';
COMMENT ON COLUMN landing_translations.translated_by IS 'Méthode de traduction (manual, ai, bulk_upload)';

-- RLS (Row Level Security) - Désactivé pour le moment car pas d'auth spécifique
ALTER TABLE landing_translations DISABLE ROW LEVEL SECURITY;

-- Grant permissions (accessible en lecture pour tous, écriture via service role)
GRANT SELECT ON landing_translations TO anon, authenticated;
GRANT ALL ON landing_translations TO service_role;

-- Insérer la version française par défaut (source)
-- Cette insertion sera faite via le script de migration des données existantes
