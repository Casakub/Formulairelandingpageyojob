-- ========================================
-- 🔧 SCRIPT COMPLET : CRÉATION DE TOUTES LES COLONNES MANQUANTES
-- ========================================
-- Version: 3.0.0
-- Date: 17 Décembre 2024
-- Description: Ajoute TOUTES les colonnes nécessaires pour les 3 profils (Agency, Client, Worker)

-- ========================================
-- SECTION 1 : PROFIL (Questions 1-5)
-- ========================================

-- Q1 : Nom (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q1_nom TEXT;

-- Q2 : Année (Agency & Client)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q2_annee INTEGER;

-- Q3 : Taille / Expérience (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q3_taille TEXT;

-- Q4 : Secteurs / Métiers (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q4_secteurs TEXT[];

-- Q5 : Pays / Localisation / Nationalité (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q5_pays TEXT;

-- ========================================
-- SECTION 2 : EXPÉRIENCE (Questions 6-11)
-- ========================================

-- Q6 : Volume / Fréquence (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q6_volume TEXT;

-- Q7 : Origine travailleurs (Agency)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q7_origine TEXT;

-- Q8 : Destinations / Nationalités (Agency & Worker)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q8_destinations TEXT;

-- Q9 : Défi principal (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q9_defi TEXT;

-- Q9 : Autre défi (ALL - conditionnel)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q9_autre TEXT;

-- Q10 : Gestion / Agences (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q10_gestion TEXT;

-- Q11 : Incidents / Conformité (Agency)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q11_incidents TEXT;

-- ========================================
-- SECTION 3 : BESOINS (Questions 12-17)
-- ========================================

-- Q12 : Budget / Salaire (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q12_budget TEXT;

-- Q13 : Manque à gagner / Satisfaction (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q13_manque_gagner TEXT;

-- Q14 : Risques (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q14_risques TEXT[];

-- Q15 : Problème / Besoins / Améliorations (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q15_probleme TEXT;

-- Q16 : ERP / Logiciel (Agency)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q16_erp TEXT;

-- Q16 : Autre ERP (Agency - conditionnel)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q16_autre TEXT;

-- Q17 : Migration (Agency)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q17_migration TEXT;

-- ========================================
-- SECTION 4 : INTÉRÊT YOJOB (Questions 18-22)
-- ========================================

-- Q18 : Score intérêt (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q18_score INTEGER;

-- Q19 : Features importantes (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q19_features TEXT[];

-- Q20 : Prix acceptable (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q20_prix TEXT;

-- Q21 : Budget mensuel (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q21_budget_mensuel TEXT;

-- Q22 : Intérêt MVP (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q22_mvp TEXT;

-- ========================================
-- SECTION 5 : VISION FUTURE (Questions 23-25)
-- ========================================

-- Q23 : Rôle décisionnel (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q23_role TEXT;

-- Q24 : Vision évolution / Aspirations (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q24_evolution TEXT;

-- Q25 : Besoins spécifiques (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q25_besoins TEXT;

-- ========================================
-- SECTION 6 : CONTACT (Questions 26-31)
-- ========================================

-- Q26 : Téléphone (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q26_phone TEXT;

-- Q27 : Prénom (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q27_firstname TEXT;

-- Q28 : Nom de famille (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q28_lastname TEXT;

-- Q29 : SIRET (ALL - optionnel)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS q29_siret TEXT;

-- Email (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Autorise contact (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS autorise_contact BOOLEAN DEFAULT false;

-- Souhaite rapport (ALL)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS souhaite_rapport BOOLEAN DEFAULT false;

-- ========================================
-- COLONNES MÉTADONNÉES
-- ========================================

-- ID unique de réponse
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS response_id TEXT UNIQUE;

-- Type de répondant
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS respondent_type TEXT CHECK (respondent_type IN ('agency', 'client', 'worker'));

-- Langue utilisée
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS language_code TEXT DEFAULT 'fr';

-- Données additionnelles (JSON)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS additional_data JSONB DEFAULT '{}'::jsonb;

-- Métadonnées enrichies
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS country TEXT;

ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS sector TEXT;

ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS company_size TEXT;

ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS detachment_experience TEXT;

ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS interest_level TEXT;

ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS completion_time INTEGER;

ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS user_agent TEXT;

ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS referrer TEXT;

-- ========================================
-- INDEX POUR PERFORMANCES
-- ========================================

-- Index sur respondent_type
CREATE INDEX IF NOT EXISTS idx_market_research_responses_respondent_type 
ON market_research_responses(respondent_type);

-- Index sur language_code
CREATE INDEX IF NOT EXISTS idx_market_research_responses_language_code 
ON market_research_responses(language_code);

-- Index sur email
CREATE INDEX IF NOT EXISTS idx_market_research_responses_email 
ON market_research_responses(email);

-- Index sur response_id
CREATE INDEX IF NOT EXISTS idx_market_research_responses_response_id 
ON market_research_responses(response_id);

-- Index GIN pour additional_data (recherches JSON)
CREATE INDEX IF NOT EXISTS idx_market_research_responses_additional_data 
ON market_research_responses USING GIN (additional_data);

-- Index sur created_at
CREATE INDEX IF NOT EXISTS idx_market_research_responses_created_at 
ON market_research_responses(created_at DESC);

-- ========================================
-- COMMENTAIRES EXPLICATIFS
-- ========================================

COMMENT ON COLUMN market_research_responses.respondent_type 
IS 'Type de répondant: agency (Agence ETT), client (Entreprise), worker (Travailleur intérimaire)';

COMMENT ON COLUMN market_research_responses.language_code 
IS 'Code langue ISO 639-1 utilisée lors du remplissage du formulaire';

COMMENT ON COLUMN market_research_responses.additional_data 
IS 'Données supplémentaires au format JSON, contient raw_form_data pour backup complet';

COMMENT ON COLUMN market_research_responses.q10_gestion 
IS 'Agency: Gestion détachement | Client: Nb agences utilisées | Worker: Nb agences de travail';

-- ========================================
-- VÉRIFICATION FINALE
-- ========================================

-- Lister toutes les colonnes créées
SELECT 
  column_name, 
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'market_research_responses'
ORDER BY ordinal_position;

-- Compter les colonnes
SELECT COUNT(*) as total_colonnes
FROM information_schema.columns 
WHERE table_name = 'market_research_responses';

-- Afficher un message de succès
DO $$
BEGIN
  RAISE NOTICE '✅ Script exécuté avec succès !';
  RAISE NOTICE '✅ Toutes les colonnes ont été créées ou vérifiées.';
  RAISE NOTICE '✅ Votre table market_research_responses est maintenant complète !';
END $$;
