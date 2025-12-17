# 🚨 URGENT : Exécutez ce SQL maintenant !

## ⚡ ACTION IMMÉDIATE (2 minutes)

### 1️⃣ Ouvrez Supabase SQL Editor

👉 **[Supabase Dashboard](https://supabase.com/dashboard)** → Votre projet → **SQL Editor**

### 2️⃣ Copiez-collez CE script complet :

```sql
-- ========================================
-- 🔧 AJOUT DE TOUTES LES COLONNES MANQUANTES
-- ========================================

-- SECTION 1 : PROFIL
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q1_nom TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q2_annee INTEGER;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q3_taille TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q4_secteurs TEXT[];
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q5_pays TEXT;

-- SECTION 2 : EXPÉRIENCE
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q6_volume TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q7_origine TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q8_destinations TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q9_defi TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q9_autre TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q10_gestion TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q11_incidents TEXT;

-- SECTION 3 : BESOINS
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q12_budget TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q13_manque_gagner TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q14_risques TEXT[];
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q15_probleme TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q16_erp TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q16_autre TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q17_migration TEXT;

-- SECTION 4 : INTÉRÊT YOJOB
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q18_score INTEGER;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q19_features TEXT[];
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q20_prix TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q21_budget_mensuel TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q22_mvp TEXT;

-- SECTION 5 : VISION FUTURE
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q23_role TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q24_evolution TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q25_besoins TEXT;

-- SECTION 6 : CONTACT
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q26_phone TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q27_firstname TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q28_lastname TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS q29_siret TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS autorise_contact BOOLEAN DEFAULT false;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS souhaite_rapport BOOLEAN DEFAULT false;

-- MÉTADONNÉES
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS response_id TEXT UNIQUE;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS respondent_type TEXT CHECK (respondent_type IN ('agency', 'client', 'worker'));
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS language_code TEXT DEFAULT 'fr';
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS additional_data JSONB DEFAULT '{}'::jsonb;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS company_size TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS detachment_experience TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS interest_level TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS completion_time INTEGER;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE market_research_responses ADD COLUMN IF NOT EXISTS referrer TEXT;

-- INDEX
CREATE INDEX IF NOT EXISTS idx_market_research_responses_respondent_type ON market_research_responses(respondent_type);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_language_code ON market_research_responses(language_code);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_email ON market_research_responses(email);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_response_id ON market_research_responses(response_id);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_additional_data ON market_research_responses USING GIN (additional_data);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_created_at ON market_research_responses(created_at DESC);

-- VÉRIFICATION
SELECT 'Script executé avec succès ! Total colonnes:' as message, COUNT(*) as total_colonnes
FROM information_schema.columns 
WHERE table_name = 'market_research_responses';
```

### 3️⃣ Cliquez sur **RUN** (ou Ctrl+Enter)

### 4️⃣ Attendez 10 secondes

Vous devriez voir :
```
✅ Success. 1 row returned.
message: "Script executé avec succès ! Total colonnes:"
total_colonnes: 50
```

---

## ✅ ENSUITE : Retestez votre formulaire

1. **Rafraîchissez votre app** (F5)
2. **Remplissez un formulaire** (n'importe quel profil)
3. **Soumettez**

**Résultat attendu :**
```
✅ Réponse sauvegardée avec succès !
```

**Plus d'erreur PGRST204 !** 🎉

---

## 📋 CE QUI A ÉTÉ CRÉÉ

- ✅ **33 colonnes** pour les questions
- ✅ **14 colonnes** pour les métadonnées
- ✅ **6 index** pour les performances
- ✅ **Total : ~50 colonnes**

---

**🚀 Exécutez le SQL maintenant et dites-moi le résultat !**
