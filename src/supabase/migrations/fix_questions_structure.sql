-- Migration to fix market_research_responses table structure
-- Date: 2024-11-29
-- Purpose: Align database columns with actual form questions

-- 1. Add missing q23_role in Section 4
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q23_role TEXT;

-- 2. Remove incorrect Section 5 columns
ALTER TABLE market_research_responses 
DROP COLUMN IF EXISTS q23_amelioration,
DROP COLUMN IF EXISTS q24_priorite;

-- 3. Add correct Section 5 columns
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q24_evolution TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS q25_besoins TEXT;

-- 4. Rename email column (if using q25_email, rename to email)
-- Note: If data exists, we preserve it
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'market_research_responses' 
    AND column_name = 'q25_email'
  ) THEN
    ALTER TABLE market_research_responses 
    RENAME COLUMN q25_email TO email;
  END IF;
END $$;

-- 5. Ensure email column exists with correct name
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';

-- 6. Update q23_role to be required (after adding it)
-- We set a default temporarily to allow the change
UPDATE market_research_responses 
SET q23_role = 'Non spécifié' 
WHERE q23_role IS NULL;

ALTER TABLE market_research_responses 
ALTER COLUMN q23_role SET NOT NULL;

-- 7. Update q24_evolution default value removal (it's required)
-- Remove default after ensuring no NULL values
UPDATE market_research_responses 
SET q24_evolution = 'Non spécifié' 
WHERE q24_evolution IS NULL OR q24_evolution = '';

-- 8. Update email default value removal (it's required)
UPDATE market_research_responses 
SET email = 'noreply@example.com' 
WHERE email IS NULL OR email = '';

-- Add comments for documentation
COMMENT ON COLUMN market_research_responses.q23_role IS 'Section 4 Q6: Rôle dans la décision d''achat';
COMMENT ON COLUMN market_research_responses.q24_evolution IS 'Section 5 Q1: Vision du marché dans 3 ans';
COMMENT ON COLUMN market_research_responses.q25_besoins IS 'Section 5 Q2: Autres besoins ou suggestions (optionnel)';
COMMENT ON COLUMN market_research_responses.email IS 'Section 6 Q1: Email professionnel';

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_market_research_email ON market_research_responses(email);

-- Output summary
DO $$
BEGIN
  RAISE NOTICE '✅ Migration completed successfully!';
  RAISE NOTICE 'Added: q23_role (Section 4)';
  RAISE NOTICE 'Removed: q23_amelioration, q24_priorite (incorrect)';
  RAISE NOTICE 'Added: q24_evolution, q25_besoins (Section 5)';
  RAISE NOTICE 'Fixed: email column name (Section 6)';
  RAISE NOTICE 'Total columns now match 26 form questions';
END $$;
