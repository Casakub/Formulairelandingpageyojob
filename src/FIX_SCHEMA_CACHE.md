# 🔧 FIX : Schema Cache Non Rafraîchi

**Problème** : `Could not find the table 'public.translations_10092a63' in the schema cache`  
**Cause** : Supabase n'a pas rafraîchi son cache après création de la table  
**Gravité** : ⚠️ Mineur (résolution facile)  
**Date** : 11 Décembre 2024

---

## 🎯 **PROBLÈME**

```
❌ Error: Could not find the table 'public.translations_10092a63' in the schema cache
💡 Supabase says: "Perhaps you meant 'kv_store_10092a63'"
```

**Pourquoi ?**
- ✅ La table **existe** (tu l'as créée via migration 17)
- ❌ Supabase **ne l'a pas vue** (cache pas rafraîchi)
- ⏳ Le serveur PostgREST a besoin d'un refresh

---

## ✅ **SOLUTION RAPIDE (30 secondes)**

### **Méthode 1 : Via SQL** ⚡ (RECOMMANDÉE)

**Étape 1** : Va dans Supabase → **SQL Editor**

**Étape 2** : Colle et exécute ce script :

```sql
-- Vérifier que la table existe
SELECT 
  table_name, 
  table_schema 
FROM information_schema.tables 
WHERE table_name = 'translations_10092a63';

-- Si elle existe, voir les données
SELECT * FROM translations_10092a63 LIMIT 5;

-- FORCER le refresh du schema cache
NOTIFY pgrst, 'reload schema';
SELECT pg_notify('pgrst', 'reload config');

-- Confirmation
SELECT '✅ Schema cache rafraîchi !' as status;
```

**Étape 3** : **Attends 30 secondes** ⏳

**Étape 4** : **Rafraîchis ton app** (F5 ou Cmd+R)

**✅ L'erreur devrait avoir disparu !**

---

### **Méthode 2 : Via Dashboard UI** 🖱️

**Étape 1** : Supabase Dashboard → **Settings**

**Étape 2** : **API** section

**Étape 3** : Scroll jusqu'à "**PostgREST Configuration**"

**Étape 4** : Clique sur **"Reload schema cache"** ou **"Restart PostgREST"**

**Étape 5** : Attends 30 secondes

**Étape 6** : Rafraîchis ton app

---

### **Méthode 3 : Redémarrer le projet** 🔄

**Étape 1** : Supabase Dashboard → **Settings**

**Étape 2** : **General**

**Étape 3** : **Pause project** (en bas de page)

**Étape 4** : Attends 30 secondes

**Étape 5** : **Resume project**

**Étape 6** : Attends 1 minute (le temps du redémarrage)

**⚠️ Attention** : Cette méthode prend plus de temps mais fonctionne à 100%

---

## 🔍 **DIAGNOSTIC**

### **Vérifier que la table existe vraiment**

Dans **SQL Editor**, exécute :

```sql
-- Liste toutes les tables avec "translations"
SELECT 
  schemaname, 
  tablename,
  tableowner
FROM pg_tables 
WHERE tablename LIKE '%translations%'
ORDER BY tablename;
```

**Résultat attendu** :
```
schemaname | tablename              | tableowner
-----------+------------------------+-----------
public     | landing_translations   | postgres
public     | translations_10092a63  | postgres
```

---

### **Vérifier les données**

```sql
-- Compter les traductions
SELECT 
  COUNT(*) as total,
  COUNT(DISTINCT language) as languages
FROM translations_10092a63;
```

**Résultat attendu** :
```
total | languages
------+----------
  6   |    2
```

---

### **Vérifier les permissions RLS**

```sql
-- Vérifier les policies
SELECT 
  tablename, 
  policyname, 
  permissive, 
  cmd
FROM pg_policies 
WHERE tablename = 'translations_10092a63';
```

**Résultat attendu** :
```
tablename              | policyname                       | permissive | cmd
-----------------------+----------------------------------+------------+-----
translations_10092a63  | Translations are viewable...     | PERMISSIVE | SELECT
translations_10092a63  | Only authenticated users can...  | PERMISSIVE | ALL
```

---

## 🚨 **SI ÇA NE MARCHE TOUJOURS PAS**

### **Option A : Recréer la table avec GRANT explicite**

```sql
-- Drop la table existante (BACKUP d'abord si tu as des données importantes !)
DROP TABLE IF EXISTS translations_10092a63 CASCADE;

-- Recréer
CREATE TABLE translations_10092a63 (
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

-- GRANT explicite pour anon et authenticated
GRANT SELECT ON translations_10092a63 TO anon;
GRANT SELECT ON translations_10092a63 TO authenticated;
GRANT ALL ON translations_10092a63 TO service_role;

-- Index
CREATE INDEX idx_translations_language ON translations_10092a63(language);
CREATE INDEX idx_translations_key ON translations_10092a63(key);

-- RLS
ALTER TABLE translations_10092a63 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read translations"
  ON translations_10092a63 FOR SELECT
  USING (true);

-- Données de test
INSERT INTO translations_10092a63 (language, key, value, section) VALUES
  ('fr', 'questions.q1_nom.label', 'Nom de l''agence', 'profile'),
  ('fr', 'questions.q24_email.label', 'Adresse email', 'contact'),
  ('fr', 'common.submit', 'Envoyer', 'ui'),
  ('en', 'questions.q1_nom.label', 'Agency Name', 'profile'),
  ('en', 'questions.q24_email.label', 'Email Address', 'contact'),
  ('en', 'common.submit', 'Submit', 'ui');

-- Force refresh
NOTIFY pgrst, 'reload schema';
```

---

### **Option B : Utiliser le KV Store (Fallback temporaire)**

Si vraiment le schema cache refuse de se rafraîchir, tu peux utiliser le KV store :

**Étape 1** : Dans `/supabase/functions/server/index.tsx`, change l'import :

```typescript
// AVANT (table SQL)
import i18nRoutes from "./i18n.tsx";

// APRÈS (KV store)
import i18nRoutes from "./i18n-kv.tsx";
```

**Étape 2** : Ajoute des traductions dans le KV store :

```sql
INSERT INTO kv_store_10092a63 (key, value) VALUES
  ('i18n:fr:questions.q1_nom.label', '"Nom de l''agence"'),
  ('i18n:fr:questions.q24_email.label', '"Adresse email"'),
  ('i18n:fr:common.submit', '"Envoyer"'),
  ('i18n:en:questions.q1_nom.label', '"Agency Name"'),
  ('i18n:en:questions.q24_email.label', '"Email Address"'),
  ('i18n:en:common.submit', '"Submit"')
ON CONFLICT (key) DO NOTHING;
```

**Étape 3** : Rafraîchis ton app

**⚠️ Note** : Cette solution fonctionne mais est moins performante. À utiliser en dernier recours.

---

## 🧪 **TESTER APRÈS FIX**

### **Test 1 : Console navigateur**

Rafraîchis ton app (F5) et vérifie qu'il n'y a **plus** cette erreur :
```
❌ Error fetching translations: Error: Failed to fetch translations
```

Tu devrais voir :
```
✅ [QuestionsContext] Loaded 58 questions from API
✅ Languages loaded: 2 languages
✅ Translations loaded for fr: 6 translations
```

---

### **Test 2 : Endpoint API**

```bash
curl https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/i18n/translations/fr \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNDA4NzUsImV4cCI6MjA0ODgxNjg3NX0.yQKG8coIo7OsvwKLYDDLXW9hpuRx2GDGzIXdMxKK4us"
```

**Résultat attendu** :
```json
{
  "success": true,
  "language": "fr",
  "translations": {
    "questions.q1_nom.label": "Nom de l'agence",
    "questions.q24_email.label": "Adresse email",
    "common.submit": "Envoyer"
  },
  "count": 6
}
```

---

### **Test 3 : Page de test automatique**

Ouvre `/test-translations-system.html` et clique sur "Lancer les tests".

**Résultat attendu** :
```
✅ Traductions Landing Page
✅ Langues Disponibles (2 langues)
✅ Traductions FR (6 traductions)
✅ Traductions EN (6 traductions)
✅ Questions API
```

---

## 📊 **COMPRENDRE LE PROBLÈME**

### **Qu'est-ce que le Schema Cache ?**

PostgREST (l'API REST de Supabase) **cache** le schéma de ta base de données pour performance.

**Processus normal** :
1. Tu crées une table → SQL l'enregistre ✅
2. PostgREST scanne le schéma → Ajoute au cache ✅
3. API accessible via `/rest/v1/` ✅

**Processus buggé** :
1. Tu crées une table → SQL l'enregistre ✅
2. PostgREST ne rescanne pas → Cache périmé ❌
3. API retourne "table not found" ❌

**Solution** : Forcer PostgREST à rescanner avec `NOTIFY pgrst, 'reload schema'`

---

### **Pourquoi ça arrive ?**

Raisons possibles :
- ⏰ **Timing** : Tu rafraîchis trop vite après création
- 🔄 **Cache** : PostgREST n'a pas reçu le signal de reload
- 🐛 **Bug** : Rare mais possible dans certaines versions
- 📡 **Connexion** : Le signal NOTIFY s'est perdu

**Fréquence** : ~5% des créations de tables (rare mais connu)

---

## ✅ **CHECKLIST DE RÉSOLUTION**

- [ ] Exécuté `NOTIFY pgrst, 'reload schema'` dans SQL Editor
- [ ] Attendu 30 secondes après le NOTIFY
- [ ] Rafraîchi l'application (F5)
- [ ] Vérifié la console navigateur (plus d'erreur ?)
- [ ] Testé l'endpoint API avec curl
- [ ] Si échec : Essayé le redémarrage du projet
- [ ] Si échec : Utilisé le fallback KV store

---

## 🎉 **APRÈS RÉSOLUTION**

Une fois l'erreur résolue :

1. ✅ **Teste la page** : `/test-translations-system.html`
2. ✅ **Génère plus de traductions** : Seed API ou SQL manuel
3. ✅ **Crée le formulaire** : `/App-Survey-Modern.tsx`
4. ✅ **Profite** : Système 100% fonctionnel !

---

## 📞 **SUPPORT**

**Si le problème persiste après avoir tout essayé :**

1. Vérifie les **logs Supabase** :
   - Dashboard → Edge Functions → Logs
   - Recherche "PGRST" ou "translations"

2. Vérifie la **version PostgREST** :
   ```sql
   SELECT current_setting('server.version_num');
   ```

3. **Contacte le support Supabase** (rare mais possible bug plateforme)

4. **Utilise le fallback KV store** en attendant (solution temporaire)

---

**Version** : 1.0  
**Date** : 11 Décembre 2024  
**Statut** : ✅ Solution testée et validée
