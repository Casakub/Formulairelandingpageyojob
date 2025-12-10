# 🔧 Migration 15: Champs de contact enrichis

## 📋 Vue d'ensemble

**Fichier** : `15_add_contact_fields.sql`  
**Table cible** : `market_research_responses`  
**Date** : 10 Décembre 2024

Cette migration ajoute 4 nouveaux champs pour qualifier les prospects :

| Colonne | Type | Description | Profils |
|---------|------|-------------|---------|
| `q26_phone` | TEXT | Téléphone professionnel | Agency, Client |
| `q27_firstname` | TEXT | Prénom du répondant | Tous |
| `q28_lastname` | TEXT | Nom du répondant | Tous |
| `q29_siret` | TEXT | SIRET/SIREN (optionnel) | Agency, Client |

---

## 🚀 Exécution

### Via Supabase Dashboard (Recommandé)

1. Ouvrez **Supabase Dashboard** → Votre projet
2. Allez dans **SQL Editor**
3. Cliquez **New Query**
4. Copiez-collez le contenu de `15_add_contact_fields.sql`
5. Cliquez **Run** (Ctrl+Entrée)
6. Vérifiez le message : ✅ `Migration 15 réussie: 4 colonnes de contact ajoutées`

### Via Supabase CLI

```bash
# Depuis la racine du projet
supabase db push

# Ou pour cette migration spécifique
supabase db execute --file supabase/migrations/15_add_contact_fields.sql
```

---

## ✅ Vérification

Exécutez cette requête pour confirmer :

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'market_research_responses'
AND column_name IN ('q26_phone', 'q27_firstname', 'q28_lastname', 'q29_siret')
ORDER BY column_name;
```

**Résultat attendu** (4 lignes) :
```
column_name    | data_type | is_nullable
---------------|-----------|------------
q26_phone      | text      | YES
q27_firstname  | text      | YES
q28_lastname   | text      | YES
q29_siret      | text      | YES
```

---

## 🔍 Index créés

La migration crée automatiquement 3 index pour optimiser les recherches :

1. **`idx_market_research_siret`** : Recherche rapide par SIRET (pour API Pappers)
2. **`idx_market_research_fullname`** : Recherche par nom complet
3. **`idx_market_research_phone`** : Dédoublonnage par téléphone

Vérifiez avec :

```sql
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'market_research_responses' 
AND indexname LIKE 'idx_market_research_%';
```

---

## 🎯 Utilisation

### Exemple d'insertion

```sql
INSERT INTO market_research_responses (
  response_id,
  respondent_type,
  q1_nom,
  q26_phone,
  q27_firstname,
  q28_lastname,
  q29_siret,
  email
) VALUES (
  gen_random_uuid(),
  'agency',
  'Agence Intérim Plus',
  '+33 6 12 34 56 78',
  'Marie',
  'Dupont',
  '123 456 789 00012',
  'marie.dupont@interim-plus.fr'
);
```

### Exemple de recherche

```sql
-- Trouver toutes les agences avec SIRET renseigné
SELECT 
  q27_firstname || ' ' || q28_lastname AS contact_name,
  q26_phone,
  q29_siret,
  email
FROM market_research_responses
WHERE respondent_type = 'agency'
AND q29_siret IS NOT NULL
ORDER BY created_at DESC;
```

---

## 🔗 Enrichissement SIRET (à venir)

Le champ `q29_siret` sera utilisé pour enrichir automatiquement les données via **API Pappers** :

```javascript
// Exemple d'appel API
const response = await fetch(
  `https://api.pappers.fr/v2/entreprise?siret=${siret}&api_token=${token}`
);

const data = await response.json();
// → Raison sociale, CA, effectifs, dirigeants, etc.
```

---

## 🐛 Dépannage

### Erreur : "relation does not exist"

**Cause** : La table `market_research_responses` n'existe pas.

**Solution** : Exécutez d'abord les migrations de base :
```bash
supabase db push
```

### Erreur : "column already exists"

**Cause** : La migration a déjà été appliquée.

**Solution** : Aucune action nécessaire. La migration utilise `IF NOT EXISTS`.

---

## 📊 Impact

- **Colonnes ajoutées** : 4
- **Index créés** : 3
- **Données existantes** : Non modifiées (colonnes NULL par défaut)
- **Performances** : Amélioration des recherches par nom/téléphone/SIRET

---

**Auteur** : Équipe YOJOB Dev  
**Version** : 1.0  
**Status** : ✅ Prêt pour production
