# 🔧 FIX : Ajouter TOUTES les colonnes manquantes

## 🚨 PROBLÈME

Vous obtenez l'erreur :

```
Could not find the 'q26_phone' column of 'market_research_responses' 
in the schema cache (code: PGRST204)
```

**Cause :** La table `market_research_responses` dans Supabase n'a pas **toutes les colonnes** nécessaires pour stocker les réponses du formulaire.

---

## ✅ SOLUTION : Exécuter le script SQL complet

### Étape 1 : Ouvrez Supabase SQL Editor

1. Allez sur **[Supabase Dashboard](https://supabase.com/dashboard)**
2. Sélectionnez votre projet YOJOB
3. Menu de gauche → **"SQL Editor"**
4. Cliquez sur **"New query"**

### Étape 2 : Copiez-collez le SQL

**Ouvrez le fichier `/SQL_COMPLETE_SCHEMA.sql`** et copiez **TOUT le contenu** (du début à la fin).

Ou copiez directement ce script complet :

```sql
-- ========================================
-- 🔧 SCRIPT COMPLET : CRÉATION DE TOUTES LES COLONNES
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

-- INDEX POUR PERFORMANCES
CREATE INDEX IF NOT EXISTS idx_market_research_responses_respondent_type ON market_research_responses(respondent_type);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_language_code ON market_research_responses(language_code);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_email ON market_research_responses(email);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_response_id ON market_research_responses(response_id);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_additional_data ON market_research_responses USING GIN (additional_data);
CREATE INDEX IF NOT EXISTS idx_market_research_responses_created_at ON market_research_responses(created_at DESC);

-- VÉRIFICATION
SELECT COUNT(*) as total_colonnes
FROM information_schema.columns 
WHERE table_name = 'market_research_responses';
```

### Étape 3 : Exécutez le script

1. **Collez le SQL** dans l'éditeur Supabase
2. Cliquez sur **"RUN"** (ou Ctrl+Enter)
3. **Attendez 5-10 secondes** (le script ajoute ~45 colonnes + index)

### Étape 4 : Vérifiez le résultat

Vous devriez voir en bas :

```
Success. No rows returned
```

Et dans les résultats de la dernière requête :

| total_colonnes |
|----------------|
| ~50            |

✅ **Parfait !** Toutes les colonnes sont créées.

---

## 🎯 LISTE DES COLONNES CRÉÉES

### Questions (33 colonnes)
```
q1_nom, q2_annee, q3_taille, q4_secteurs,
q5_pays, q6_volume, q7_origine, q8_destinations,
q9_defi, q9_autre, q10_gestion, q11_incidents,
q12_budget, q13_manque_gagner, q14_risques, q15_probleme,
q16_erp, q16_autre, q17_migration,
q18_score, q19_features, q20_prix, q21_budget_mensuel,
q22_mvp, q23_role, q24_evolution, q25_besoins,
q26_phone, q27_firstname, q28_lastname, q29_siret,
email, autorise_contact, souhaite_rapport
```

### Métadonnées (14 colonnes)
```
id, created_at, 
response_id, respondent_type, language_code, additional_data,
country, sector, company_size,
detachment_experience, interest_level, completion_time,
user_agent, referrer
```

### Index (6 index)
- Sur `respondent_type` (filtrage par profil)
- Sur `language_code` (filtrage par langue)
- Sur `email` (recherche rapide)
- Sur `response_id` (clé unique)
- Sur `additional_data` (recherche JSON)
- Sur `created_at` (tri chronologique)

**Total : ~50 colonnes + 6 index**

---

## 🧪 TEST APRÈS EXÉCUTION

### 1. Retournez sur votre application

1. **Rafraîchissez la page** (F5)
2. **Ouvrez la console** (F12)
3. Sélectionnez un profil (Agency, Client ou Worker)
4. Remplissez le formulaire rapidement
5. **Soumettez**

### 2. Vérifiez la console

**✅ Attendu :**
```
📤 Envoi de la réponse avec type: agency
🌍 Langue utilisée: fr
✅ Réponse sauvegardée avec succès !
   → ID: YJ-2025-XXXXXX
```

**❌ Plus d'erreur PGRST204 !**

### 3. Vérifiez dans Supabase

**Table Editor** → `market_research_responses` → **Dernière ligne ajoutée**

Vous devriez voir :
- ✅ `q26_phone` rempli
- ✅ `q27_firstname` rempli
- ✅ `q28_lastname` rempli
- ✅ `email` rempli
- ✅ `respondent_type` = 'agency' / 'client' / 'worker'

---

## 📊 VÉRIFICATION AVANCÉE

### Voir toutes les colonnes créées

```sql
SELECT 
  column_name, 
  data_type,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'market_research_responses'
ORDER BY ordinal_position;
```

### Voir les types de colonnes

```sql
SELECT 
  data_type,
  COUNT(*) as nb_colonnes
FROM information_schema.columns 
WHERE table_name = 'market_research_responses'
GROUP BY data_type
ORDER BY nb_colonnes DESC;
```

**Résultat attendu :**
| data_type | nb_colonnes |
|-----------|-------------|
| text      | ~35         |
| ARRAY     | 2           |
| integer   | 3           |
| boolean   | 2           |
| jsonb     | 1           |
| ...       | ...         |

---

## ❓ FAQ

### Q: Pourquoi tant de colonnes ?

**R:** Le formulaire multi-profils (Agency, Client, Worker) avec 6 sections nécessite ~33 questions + métadonnées = ~50 colonnes au total.

### Q: Est-ce que ça va ralentir la base ?

**R:** Non ! PostgreSQL gère très bien 50+ colonnes. Les index garantissent des performances optimales même avec 100K réponses.

### Q: Si j'ai déjà des données, vont-elles être perdues ?

**R:** Non ! `ADD COLUMN IF NOT EXISTS` ne touche pas aux données existantes. Les anciennes lignes auront juste `NULL` dans les nouvelles colonnes.

### Q: Et si je dois ajouter d'autres colonnes plus tard ?

**R:** Vous pouvez soit :
1. Ajouter une nouvelle colonne SQL (comme dans ce script)
2. Utiliser `additional_data` (JSONB flexible)

---

## 🎉 APRÈS CE FIX

Votre système sera **100% opérationnel** pour :

✅ Les **3 types de profils** (Agency, Client, Worker)  
✅ Les **22 langues** supportées  
✅ Les **6 sections** du formulaire  
✅ L'**export complet** des données  
✅ Le **Dashboard Admin** avec toutes les colonnes  
✅ La **synchronisation CRM Prospects**  

---

**🚀 Exécutez le script SQL ci-dessus et retestez ! Vous n'aurez plus aucune erreur PGRST204 !**
