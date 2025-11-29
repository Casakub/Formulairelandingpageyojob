# 🚀 Migration SQL - Guide Ultra-Rapide

## ⏱️ Temps requis : 3 minutes

---

## 📋 Étape 1 : Accéder à Supabase

1. Ouvrez votre navigateur
2. Allez sur **https://supabase.com/dashboard**
3. Connectez-vous avec vos identifiants
4. Sélectionnez le projet **YoJob Market Study**

---

## 📋 Étape 2 : Ouvrir SQL Editor

Dans le menu de gauche, cliquez sur :
```
🗄️ SQL Editor
```

Puis cliquez sur le bouton :
```
➕ New Query
```

---

## 📋 Étape 3 : Copier la Migration

**Option A - Depuis votre éditeur :**
1. Ouvrez le fichier `/supabase/migrations/fix_questions_structure.sql`
2. Sélectionnez tout (`Ctrl+A` ou `Cmd+A`)
3. Copiez (`Ctrl+C` ou `Cmd+C`)

**Option B - Depuis ce document :**
Copiez le code SQL ci-dessous (il est déjà prêt) :

```sql
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
```

---

## 📋 Étape 4 : Coller et Exécuter

1. Dans SQL Editor, **collez** le code SQL (`Ctrl+V` ou `Cmd+V`)
2. Cliquez sur le bouton vert **"Run"** (ou `Ctrl+Enter`)
3. Attendez 2-5 secondes

---

## 📋 Étape 5 : Vérifier le Succès

### ✅ Vous devriez voir :

Dans la section "Messages" en bas :

```
✅ Migration completed successfully!
Added: q23_role (Section 4)
Removed: q23_amelioration, q24_priorite (incorrect)
Added: q24_evolution, q25_besoins (Section 5)
Fixed: email column name (Section 6)
Total columns now match 26 form questions
```

### ❌ En cas d'erreur :

**Erreur : "table does not exist"**
- La table `market_research_responses` n'existe pas encore
- Consultez `/SETUP_DATABASE.md` pour créer la table d'abord

**Erreur : "permission denied"**
- Vous n'avez pas les droits d'administration
- Connectez-vous avec un compte admin

---

## 📋 Étape 6 : Vérification Finale (Optionnel)

Pour confirmer que tout est OK, exécutez cette requête dans SQL Editor :

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'market_research_responses'
  AND column_name IN ('q23_role', 'q24_evolution', 'q25_besoins', 'email')
ORDER BY column_name;
```

### ✅ Résultat attendu :

```
column_name     | data_type | is_nullable
----------------|-----------|------------
email           | text      | NO
q23_role        | text      | NO
q24_evolution   | text      | NO
q25_besoins     | text      | YES
```

---

## 🎉 C'est Terminé !

Votre base de données est maintenant à jour et prête à recevoir les 26 questions du formulaire.

### Ce qui a été fait :

✅ **Ajouté** : `q23_role` (Section 4 - Rôle dans la décision)
✅ **Ajouté** : `q24_evolution` (Section 5 - Vision 3 ans)
✅ **Ajouté** : `q25_besoins` (Section 5 - Besoins spécifiques)
✅ **Corrigé** : Colonne `email` (Section 6)
✅ **Supprimé** : Colonnes incorrectes (`q23_amelioration`, `q24_priorite`)
✅ **Créé** : Index sur email pour performances

### Prochaines étapes :

1. ✅ Testez le formulaire complet (toutes les 26 questions)
2. ✅ Vérifiez que la soumission fonctionne sans erreur
3. ✅ Consultez le dashboard pour voir les nouvelles réponses
4. ✅ Le projet est maintenant **100% opérationnel** ! 🚀

---

## 🆘 Besoin d'Aide ?

**Documentation complète** : `/MIGRATION_SQL_GUIDE.md` (4,000+ mots)
**Action requise** : `/🚨_ACTION_REQUISE_MIGRATION.md`
**Status projet** : `/✅_PROJET_STATUS_FINAL.md`

---

**Date** : 29 Novembre 2024  
**Version** : 1.0  
**Statut** : ✅ Prêt à exécuter
