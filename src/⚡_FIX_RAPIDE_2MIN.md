# ⚡ FIX RAPIDE 2 MINUTES - Erreur Formulaire

## 🎯 Vous Avez Cette Erreur ?

```
❌ Error lors de la soumission: Error: Echec de la sauvegarde
```

## ✅ Solution (2 minutes chrono)

### Étape 1 : Ouvrir Supabase SQL Editor

👉 https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

---

### Étape 2 : Copier-Coller Ce SQL

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

### Étape 3 : Cliquer "Run"

✅ **C'est tout !**

---

## 🧪 Test

1. Retournez sur votre formulaire
2. Remplissez-le
3. Soumettez
4. ✅ Doit fonctionner !

---

## ❓ Plus de Détails ?

Consultez : `/🚨_FIX_ERREUR_RLS.md`

---

**Temps** : 2 minutes  
**Difficulté** : Facile  
**Résultat** : ✅ Formulaire opérationnel
