-- ========================================
-- 🌍 AJOUT DE LA COLONNE country_code
-- ========================================
-- Date: 17 Décembre 2024
-- Description: Ajoute la colonne country_code basée sur la langue sélectionnée

-- Ajouter la colonne country_code (Code ISO 3166-1 alpha-2)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT 'XX';

-- Index pour filtres rapides par pays
CREATE INDEX IF NOT EXISTS idx_market_research_responses_country_code 
ON market_research_responses(country_code);

-- Commentaire explicatif
COMMENT ON COLUMN market_research_responses.country_code 
IS 'Code pays ISO 3166-1 alpha-2 (FR, DE, PL, RO, etc.) basé sur la langue sélectionnée dans le formulaire';

-- ========================================
-- 🔄 MIGRATION DES DONNÉES EXISTANTES (optionnel)
-- ========================================
-- Si vous avez déjà des réponses, vous pouvez mapper country → country_code

UPDATE market_research_responses
SET country_code = CASE
  WHEN country ILIKE '%France%' THEN 'FR'
  WHEN country ILIKE '%Allemagne%' OR country ILIKE '%Germany%' THEN 'DE'
  WHEN country ILIKE '%Espagne%' OR country ILIKE '%Spain%' THEN 'ES'
  WHEN country ILIKE '%Italie%' OR country ILIKE '%Italy%' THEN 'IT'
  WHEN country ILIKE '%Pologne%' OR country ILIKE '%Poland%' THEN 'PL'
  WHEN country ILIKE '%Roumanie%' OR country ILIKE '%Romania%' THEN 'RO'
  WHEN country ILIKE '%Belgique%' OR country ILIKE '%Belgium%' THEN 'BE'
  WHEN country ILIKE '%Pays-Bas%' OR country ILIKE '%Netherlands%' THEN 'NL'
  WHEN country ILIKE '%Bulgarie%' OR country ILIKE '%Bulgaria%' THEN 'BG'
  WHEN country ILIKE '%Croatie%' OR country ILIKE '%Croatia%' THEN 'HR'
  WHEN country ILIKE '%Tchèque%' OR country ILIKE '%Czech%' THEN 'CZ'
  WHEN country ILIKE '%Danemark%' OR country ILIKE '%Denmark%' THEN 'DK'
  WHEN country ILIKE '%Estonie%' OR country ILIKE '%Estonia%' THEN 'EE'
  WHEN country ILIKE '%Grèce%' OR country ILIKE '%Greece%' THEN 'GR'
  WHEN country ILIKE '%Finlande%' OR country ILIKE '%Finland%' THEN 'FI'
  WHEN country ILIKE '%Hongrie%' OR country ILIKE '%Hungary%' THEN 'HU'
  WHEN country ILIKE '%Lituanie%' OR country ILIKE '%Lithuania%' THEN 'LT'
  WHEN country ILIKE '%Lettonie%' OR country ILIKE '%Latvia%' THEN 'LV'
  WHEN country ILIKE '%Slovaquie%' OR country ILIKE '%Slovakia%' THEN 'SK'
  WHEN country ILIKE '%Slovénie%' OR country ILIKE '%Slovenia%' THEN 'SI'
  WHEN country ILIKE '%Suède%' OR country ILIKE '%Sweden%' THEN 'SE'
  WHEN country ILIKE '%Portugal%' THEN 'PT'
  WHEN country ILIKE '%United Kingdom%' OR country ILIKE '%Royaume-Uni%' THEN 'GB'
  ELSE 'XX' -- Valeur par défaut pour pays non reconnu
END
WHERE country_code = 'XX' OR country_code IS NULL;

-- Vérification
SELECT 
  country,
  country_code,
  language_code,
  COUNT(*) as nb_reponses
FROM market_research_responses
GROUP BY country, country_code, language_code
ORDER BY nb_reponses DESC;

-- Message de succès
DO $$
BEGIN
  RAISE NOTICE '✅ Colonne country_code ajoutée avec succès !';
  RAISE NOTICE '✅ Index créé pour performances optimales.';
  RAISE NOTICE '✅ Données existantes migrées (si applicable).';
END $$;
