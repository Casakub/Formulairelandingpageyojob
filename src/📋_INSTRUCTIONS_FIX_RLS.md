# 🔧 Instructions Fix RLS - 2 Minutes Chrono

## Vous avez cette erreur ?

```
❌ Error saving response
❌ new row violates row-level security policy
```

## ✅ Solution en 3 Étapes

### 1️⃣ Ouvrir Supabase SQL Editor

Cliquez ici : https://supabase.com/dashboard

Puis : **Votre Projet** → **SQL Editor** → **New Query**

---

### 2️⃣ Copier-Coller Ce SQL

```sql
DROP POLICY IF EXISTS "allow_public_inserts" ON market_research_responses;

CREATE POLICY "allow_public_inserts"
  ON market_research_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

GRANT INSERT ON market_research_responses TO anon;
```

---

### 3️⃣ Cliquer "Run"

Attendez 2 secondes → ✅ **Succès !**

---

## 🧪 Test

1. Retournez sur votre formulaire
2. Remplissez-le
3. Soumettez
4. ✅ **Doit fonctionner !**

---

## 🆘 Ça ne marche toujours pas ?

Allez sur `/fix-rls` pour des instructions détaillées avec interface visuelle.

---

**Temps total** : 2 minutes  
**Difficulté** : Facile (copier-coller)  
**Résultat** : Formulaire opérationnel ✅
