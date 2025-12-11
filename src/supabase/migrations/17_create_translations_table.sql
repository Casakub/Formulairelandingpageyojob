-- Migration 17: Create translations table
-- Date: 2024-12-11
-- Description: Table dédiée pour stocker les traductions multilingues (22 langues)

-- Create translations table
CREATE TABLE IF NOT EXISTS public.translations_10092a63 (
  id BIGSERIAL PRIMARY KEY,
  language VARCHAR(10) NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  context TEXT,
  section VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(language, key)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_translations_language 
  ON public.translations_10092a63(language);

CREATE INDEX IF NOT EXISTS idx_translations_key 
  ON public.translations_10092a63(key);

CREATE INDEX IF NOT EXISTS idx_translations_section 
  ON public.translations_10092a63(section);

CREATE INDEX IF NOT EXISTS idx_translations_language_section 
  ON public.translations_10092a63(language, section);

-- Add comments
COMMENT ON TABLE public.translations_10092a63 IS 'Traductions multilingues pour l''interface et les questions (22 langues européennes)';
COMMENT ON COLUMN public.translations_10092a63.language IS 'Code ISO 639-1 de la langue (fr, en, de, es, it, pl, ro, etc.)';
COMMENT ON COLUMN public.translations_10092a63.key IS 'Clé de traduction (ex: questions.q1_nom.label)';
COMMENT ON COLUMN public.translations_10092a63.value IS 'Texte traduit';
COMMENT ON COLUMN public.translations_10092a63.context IS 'Contexte pour aider les traducteurs';
COMMENT ON COLUMN public.translations_10092a63.section IS 'Section du formulaire (profile, experience, needs, etc.)';

-- Enable RLS (Row Level Security)
ALTER TABLE public.translations_10092a63 ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read translations (public data)
CREATE POLICY "Translations are viewable by everyone" 
  ON public.translations_10092a63 
  FOR SELECT 
  USING (true);

-- Policy: Only authenticated users can insert/update translations (admins)
CREATE POLICY "Only authenticated users can modify translations" 
  ON public.translations_10092a63 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_translations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_translations_updated_at_trigger ON public.translations_10092a63;
CREATE TRIGGER update_translations_updated_at_trigger
  BEFORE UPDATE ON public.translations_10092a63
  FOR EACH ROW
  EXECUTE FUNCTION public.update_translations_updated_at();

-- Insert some sample French translations (base minimum)
INSERT INTO public.translations_10092a63 (language, key, value, section, context) VALUES
  ('fr', 'questions.q1_nom.label', 'Nom de l''agence', 'profile', 'Question 1 - Nom'),
  ('fr', 'questions.q1_nom.placeholder', 'Ex: ABC Recrutement', 'profile', 'Question 1 - Placeholder'),
  ('fr', 'questions.q24_email.label', 'Adresse email', 'contact', 'Question 24 - Email'),
  ('fr', 'questions.q24_email.placeholder', 'email@example.com', 'contact', 'Question 24 - Placeholder'),
  ('fr', 'common.submit', 'Envoyer', 'ui', 'Bouton de soumission'),
  ('fr', 'common.cancel', 'Annuler', 'ui', 'Bouton d''annulation'),
  ('fr', 'common.save', 'Enregistrer', 'ui', 'Bouton de sauvegarde'),
  ('fr', 'common.loading', 'Chargement...', 'ui', 'État de chargement')
ON CONFLICT (language, key) DO NOTHING;

-- Insert some sample English translations
INSERT INTO public.translations_10092a63 (language, key, value, section, context) VALUES
  ('en', 'questions.q1_nom.label', 'Agency Name', 'profile', 'Question 1 - Name'),
  ('en', 'questions.q1_nom.placeholder', 'Ex: ABC Recruitment', 'profile', 'Question 1 - Placeholder'),
  ('en', 'questions.q24_email.label', 'Email Address', 'contact', 'Question 24 - Email'),
  ('en', 'questions.q24_email.placeholder', 'email@example.com', 'contact', 'Question 24 - Placeholder'),
  ('en', 'common.submit', 'Submit', 'ui', 'Submit button'),
  ('en', 'common.cancel', 'Cancel', 'ui', 'Cancel button'),
  ('en', 'common.save', 'Save', 'ui', 'Save button'),
  ('en', 'common.loading', 'Loading...', 'ui', 'Loading state')
ON CONFLICT (language, key) DO NOTHING;

-- Success message
SELECT 'Migration 17 completed: translations_10092a63 table created with sample data' AS status;
