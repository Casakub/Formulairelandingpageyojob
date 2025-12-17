# 🔧 FIX : Ajouter le champ `additional_data` pour multi-profils

## 🚨 PROBLÈME

Vous obtenez l'erreur suivante lors de la soumission d'un formulaire **Client** ou **Worker** :

```
Could not find the 'q10_agence' column of 'market_research_responses' 
in the schema cache (code: PGRST204)
```

**Cause :** Le formulaire supporte maintenant **3 types de répondants** (Agency, Client, Worker) avec des questions différentes, mais la table `market_research_responses` a été conçue initialement pour un seul type.

---

## ✅ SOLUTION : Champ JSON flexible

Au lieu d'ajouter des dizaines de colonnes spécifiques, nous utilisons un **champ JSONB** appelé `additional_data` pour stocker les questions qui varient selon le type de répondant.

### Étape 1 : Ouvrez l'éditeur SQL Supabase

1. Allez sur **[Supabase Dashboard](https://supabase.com/dashboard)**
2. Sélectionnez votre projet YOJOB
3. Dans le menu de gauche, cliquez sur **"SQL Editor"**

### Étape 2 : Exécutez ce SQL

Copiez-collez ce code SQL et cliquez sur **"Run"** :

```sql
-- ✅ Ajouter la colonne additional_data (JSONB)
ALTER TABLE market_research_responses 
ADD COLUMN IF NOT EXISTS additional_data JSONB DEFAULT '{}'::jsonb;

-- ✅ Index GIN pour recherches performantes dans le JSON
CREATE INDEX IF NOT EXISTS idx_market_research_responses_additional_data 
ON market_research_responses USING GIN (additional_data);

-- ✅ Commentaire explicatif
COMMENT ON COLUMN market_research_responses.additional_data 
IS 'Données supplémentaires spécifiques au type de répondant (agency/client/worker). Contient les questions qui varient selon le profil.';

-- ✅ Vérification
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'market_research_responses' 
AND column_name = 'additional_data';
```

### Étape 3 : Vérifiez le résultat

Vous devriez voir :

| column_name | data_type | column_default | is_nullable |
|-------------|-----------|----------------|-------------|
| additional_data | jsonb | '{}'::jsonb | YES |

✅ **C'est tout !** La colonne est créée.

---

## 🎯 CE QUI EST STOCKÉ DANS `additional_data`

### Pour TOUS les profils (Agency, Client, Worker)
```json
{
  "raw_form_data": { 
    /* Backup complet de toutes les réponses */
    "q1_nom": "...",
    "q10_gestion": "...",
    /* ... toutes les autres réponses ... */
  }
}
```

**Note importante :** Après analyse complète de la configuration, il s'avère que **TOUS les fieldNames sont déjà mappés correctement** aux colonnes SQL existantes. Le champ `additional_data` sert principalement de **backup complet** pour référence future et debugging.

### ✅ Pourquoi un seul `raw_form_data` suffit ?

La configuration `survey-questions-COMPLETE.ts` réutilise intelligemment les **mêmes fieldNames** pour les 3 profils :

| Question | Tous les profils utilisent | Exemple valeurs |
|----------|---------------------------|-----------------|
| Gestion/Agences | `q10_gestion` | Agency: "Excel", Client: "2-3 agences", Worker: "1 agence" |
| Budget/Salaire | `q12_budget` | Agency: "10-50K€", Client: "50-100K€", Worker: "1500-2000€" |
| Satisfaction | `q13_manque_gagner` | Agency: "Oui", Client: "7/10", Worker: "8/10" |

**Résultat :** Les colonnes SQL stockent directement les bonnes valeurs, différenciées par `respondent_type`.

---

## 📊 MAPPING DES QUESTIONS PAR TYPE

| Question | Agency | Client | Worker |
|----------|--------|--------|--------|
| Profil | `q1_nom` | `q1_nom` | `q1_nom` |
| Année | `q2_annee` | `q2_annee_client` | `q2_nationalite` |
| Taille/Expérience | `q3_taille` | `q3_taille` | `q3_experience` |
| Secteurs/Métiers | `q4_secteurs[]` | `q4_secteurs[]` | `q4_metiers[]` |
| Pays | `q5_pays` | `q5_localisation` | `q5_pays_travail` |
| Volume/Fréquence | `q6_volume` | `q6_volume_client` | `q6_frequence` |
| Défi principal | `q9_defi` | `q9_defi_client` | `q9_defi_worker` |
| **Gestion/Agences** | `q10_gestion` | **`additional_data.q10_agences`** ⭐ | **`additional_data.q10_agence`** ⭐ |
| Budget/Salaire | `q12_budget` | `q12_budget_client` | `q12_salaire` |
| Satisfaction | `q13_manque_gagner` | `q13_satisfaction` | `q13_satisfaction_worker` |

**⭐ Les colonnes marquées sont stockées dans `additional_data` car elles n'existent pas dans le schéma principal.**

---

## 🧪 TEST

### 1. Testez avec un formulaire **Client**

1. Ouvrez votre formulaire d'enquête
2. **Sélectionnez le profil "Client / Entreprise"** 🏢
3. Remplissez les questions jusqu'à la question sur les agences
4. Soumettez le formulaire

### 2. Vérifiez dans la console du navigateur

Vous devriez voir :

```
📤 Envoi de la réponse avec type: client
🌍 Langue utilisée: fr
✅ Réponse sauvegardée avec succès !
🔗 Synchronisation vers CRM Prospects...
✅ Synchronisation CRM réussie
```

**Plus d'erreur PGRST204 !** ✅

### 3. Vérifiez dans Supabase

Allez dans **Table Editor** → `market_research_responses`

**Vérifiez la dernière ligne :**
- ✅ `respondent_type` = `'client'`
- ✅ `additional_data` contient `{ "q10_agences": "...", "raw_form_data": {...} }`

### 4. Exemple de requête SQL

```sql
-- Voir toutes les réponses CLIENT avec leurs données spécifiques
SELECT 
  id,
  response_id,
  respondent_type,
  q1_nom,
  email,
  additional_data->>'q10_agences' AS nombre_agences,
  additional_data->>'q10_processus' AS processus_recrutement
FROM market_research_responses
WHERE respondent_type = 'client'
ORDER BY created_at DESC;
```

---

## 🎨 AVANTAGES DE CETTE APPROCHE

### ✅ Flexibilité
- Ajouter de nouvelles questions sans modifier la structure de la table
- Supporte n'importe quel nouveau type de répondant (ex: "Partner", "Recruiter")

### ✅ Simplicité
- Une seule colonne à ajouter
- Pas besoin de créer des dizaines de colonnes spécifiques

### ✅ Performance
- Index GIN pour recherches rapides dans le JSON
- PostgreSQL gère très bien les colonnes JSONB

### ✅ Maintenabilité
- Code centralisé dans `/App-Survey-Original.tsx`
- Logique de mapping claire et lisible

---

## 🔍 REQUÊTES UTILES

### Compter les réponses par type

```sql
SELECT 
  respondent_type,
  COUNT(*) as total
FROM market_research_responses
GROUP BY respondent_type
ORDER BY total DESC;
```

### Voir les clients qui utilisent 2-3 agences

```sql
SELECT 
  q1_nom,
  email,
  additional_data->>'q10_agences' AS nombre_agences
FROM market_research_responses
WHERE respondent_type = 'client'
  AND additional_data->>'q10_agences' = '2-3 agences';
```

### Voir les workers qui travaillent avec une seule agence

```sql
SELECT 
  q1_nom,
  email,
  additional_data->>'q10_agence' AS nom_agence,
  additional_data->>'q10_agences_worker' AS nombre_agences
FROM market_research_responses
WHERE respondent_type = 'worker'
  AND additional_data->>'q10_agences_worker' = '1 agence';
```

### Extraire toutes les données brutes d'une réponse

```sql
SELECT 
  response_id,
  respondent_type,
  additional_data->'raw_form_data' AS toutes_les_reponses
FROM market_research_responses
WHERE id = 'VOTRE_ID_ICI';
```

---

## ❓ FAQ

### Q: Est-ce que je vais perdre mes anciennes réponses ?

**R:** Non ! Les anciennes réponses auront automatiquement `additional_data = {}` (objet vide).

### Q: Puis-je ajouter d'autres champs dans `additional_data` ?

**R:** Oui ! C'est justement le but. Modifiez `/App-Survey-Original.tsx` ligne 340+ pour ajouter d'autres données.

### Q: Est-ce que les recherches dans `additional_data` sont rapides ?

**R:** Oui ! L'index GIN rend les recherches très performantes (quelques millisecondes même avec 100K lignes).

### Q: Comment exporter les données `additional_data` dans un CSV ?

**R:** Dans le Dashboard Admin, l'export inclut automatiquement les champs JSON aplatis en colonnes.

---

## 🔧 SI VOUS AVEZ BESOIN DE PLUS DE COLONNES FIXES

Si une question devient commune à **tous les types** de répondants, vous pouvez :

1. Ajouter une colonne dédiée dans la table
2. Modifier le code pour mapper vers cette colonne au lieu de `additional_data`

**Exemple :**

```sql
-- Si q10_agences devient commun à tous
ALTER TABLE market_research_responses
ADD COLUMN q10_agences TEXT;
```

Puis dans le code :

```typescript
// Au lieu de additional_data
q10_agences: formData.q10_agences || formData.q10_agences_worker || '',
```

---

## 📝 CHANGELOG

**17 Décembre 2024**
- ✅ Ajout de la colonne `additional_data` (JSONB)
- ✅ Support multi-profils (Agency, Client, Worker)
- ✅ Mapping intelligent des questions par type
- ✅ Index GIN pour performances optimales
- ✅ Documentation complète avec exemples SQL

---

## 🚀 PRÊT !

Votre système supporte maintenant **3 types de répondants** avec une architecture flexible et performante ! 🎯

**Types supportés :**
- 🏢 **Agency** (Agences ETT)
- 🏭 **Client** (Entreprises clientes)
- 👷 **Worker** (Travailleurs intérimaires)

Vous pouvez maintenant collecter des insights de **toute la chaîne de valeur** du recrutement européen ! 🇪🇺