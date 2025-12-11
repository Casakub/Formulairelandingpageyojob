# 🚀 GUIDE : Pousser les Traductions vers Supabase

**Date** : 11 Décembre 2024  
**Version** : 1.0.0  
**Statut** : ✅ **PRÊT À UTILISER**

---

## 🎯 **OBJECTIF**

Tu as raison ! Les traductions complètes sont déjà dans `/config/` (22 langues).

**Il faut maintenant les pousser vers Supabase** pour que le système i18n les utilise.

---

## 📁 **FICHIERS DE TRADUCTIONS EXISTANTS**

### **Dans `/config/` :**

```
/config/
├── translations-index.ts         ← Index principal (22 langues)
├── translations-complete.ts      ← FR + EN complets
├── translations-european.ts      ← 20 langues européennes
├── translations.ts               ← Legacy
└── survey-questions-COMPLETE.ts  ← Questions avec traductions
```

### **Langues disponibles (22) :**

```typescript
fr, en, de, es, it, pt, nl, pl, ro, bg, hu, cz, sk, hr, sl, lt, lv, ee, el, sv, da, fi
```

---

## 🚀 **MÉTHODE 1 : Interface Graphique** ⭐ (RECOMMANDÉE)

### **Étape 1 : Ouvrir l'outil**

Ouvre dans ton navigateur :

```
/App-Push-Translations
```

Tu verras une interface avec :
- ✅ Statut actuel de la DB
- ✅ Liste des 22 langues
- ✅ Boutons Preview / Push

---

### **Étape 2 : Preview (Dry Run)**

Clique sur **"Preview (Dry Run)"**

**Ce que ça fait** :
- ✅ Lit les traductions depuis `/config/`
- ✅ Calcule combien de records seront insérés
- ✅ Affiche un aperçu
- ❌ N'insère RIEN dans la DB

**Résultat attendu** :
```json
{
  "success": true,
  "dryRun": true,
  "stats": {
    "totalRecords": 5000+,
    "languages": 22,
    "sampleRecords": [...]
  }
}
```

---

### **Étape 3 : Push réel**

Clique sur **"Push to Supabase"**

**Ce que ça fait** :
- ✅ Lit les traductions depuis `/config/`
- ✅ Flatten l'arbre nested en clés plates
- ✅ Insère dans `translations_10092a63`
- ✅ UPSERT (met à jour si existe déjà)

**Résultat attendu** :
```json
{
  "success": true,
  "stats": {
    "totalRecords": 5284,
    "insertedCount": 5284,
    "languages": 22,
    "batches": 11,
    "errors": 0
  }
}
```

---

### **Étape 4 : Vérifier**

Après le push, vérifie dans Supabase :

```sql
SELECT 
  language, 
  COUNT(*) as total 
FROM translations_10092a63 
GROUP BY language 
ORDER BY language;
```

**Résultat attendu** :
```
language | total
---------|------
bg       | 240
cz       | 240
da       | 240
de       | 240
ee       | 240
el       | 240
en       | 240
es       | 240
fi       | 240
fr       | 240
...
```

---

## 🖥️ **MÉTHODE 2 : Console du navigateur**

### **Étape 1 : Ouvrir la console**

Appuie sur `F12` → Onglet **Console**

---

### **Étape 2 : Importer le script**

Le script est déjà exposé automatiquement. Tape :

```javascript
await pushTranslationsToSupabase()
```

**Preview uniquement** :
```javascript
await pushTranslationsToSupabase(true)
```

---

### **Étape 3 : Vérifier le statut**

```javascript
await getTranslationsStatus()
```

**Résultat** :
```
📊 DATABASE STATUS:
   Total translations: 5284
   Languages: bg, cz, da, de, ee, el, en, es, fi, fr, hr, hu, it, lt, lv, nl, pl, pt, ro, sk, sl, sv
```

---

## 🔧 **MÉTHODE 3 : API directe (cURL)**

### **Preview (Dry Run)**

```bash
curl -X POST https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/push-translations/push \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "translations": { ... },
    "dryRun": true
  }'
```

**⚠️ Note** : Tu dois envoyer l'objet `translations` dans le body.

---

### **Push réel**

```bash
curl -X POST https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/push-translations/push \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "translations": { ... },
    "dryRun": false
  }'
```

---

### **Statut**

```bash
curl https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/push-translations/status \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## 📊 **STRUCTURE DES DONNÉES**

### **Format source (nested) :**

```typescript
// /config/translations-complete.ts
const fr = {
  nav: {
    section1: 'Profil',
  },
  common: {
    submit: 'Envoyer',
  },
  questions: {
    q1_nom: {
      label: {
        agency: 'Nom de votre agence',
        client: 'Nom de votre entreprise',
      },
    },
  },
};
```

---

### **Format DB (flat) :**

```sql
-- Table translations_10092a63
language | key                            | value                  | section
---------|--------------------------------|------------------------|----------
fr       | nav.section1                   | Profil                 | nav
fr       | common.submit                  | Envoyer                | common
fr       | questions.q1_nom.label.agency  | Nom de votre agence    | questions
fr       | questions.q1_nom.label.client  | Nom de votre entreprise| questions
```

---

## 🔄 **TRANSFORMATION**

Le script effectue automatiquement :

1. **Flatten** : Arbre nested → Clés plates
2. **Profile expansion** : `{ agency: "X", client: "Y" }` → 2 clés séparées
3. **Section detection** : Automatique (nav, common, questions)
4. **Batch insert** : 500 records/batch pour performance

---

## ✅ **VÉRIFICATION APRÈS PUSH**

### **Test 1 : Compter les traductions**

```sql
SELECT COUNT(*) FROM translations_10092a63;
```

**Attendu** : ~5000+ records

---

### **Test 2 : Vérifier FR**

```sql
SELECT key, value 
FROM translations_10092a63 
WHERE language = 'fr' 
AND key LIKE 'questions.q1_nom%'
ORDER BY key;
```

**Attendu** :
```
questions.q1_nom.label.agency  | Nom de votre agence
questions.q1_nom.label.client  | Nom de votre entreprise
questions.q1_nom.label.worker  | Votre prénom et nom
questions.q1_nom.placeholder.agency | Ex: Staffing Europe Solutions
...
```

---

### **Test 3 : Endpoint API**

```
https://vhpbmckgxtdyxdwhmdxy.supabase.co/functions/v1/make-server-10092a63/i18n/translations/fr
```

**Attendu** :
```json
{
  "success": true,
  "language": "fr",
  "translations": {
    "nav.section1": "Profil",
    "common.submit": "Envoyer",
    "questions.q1_nom.label.agency": "Nom de votre agence",
    ...
  },
  "count": 240+
}
```

---

### **Test 4 : Console navigateur**

Après refresh, l'erreur devrait disparaître :

```
❌ Error fetching translations  → ✅ Translations loaded for fr: 240 translations
```

---

## 🎯 **PROCHAINES ÉTAPES**

Une fois les traductions poussées :

### **1. Vérifier le hook useI18n**

```typescript
import { useI18n } from './hooks/useI18n';

const { t, tQuestion } = useI18n();

// Devrait fonctionner maintenant
const submitText = t('common.submit'); // "Envoyer"
const labelAgency = tQuestion('q1_nom', 'label', 'agency'); // "Nom de votre agence"
```

---

### **2. Créer le formulaire moderne**

Maintenant que les traductions sont en place, crée :

```
/App-Survey-Modern.tsx
```

Avec les 3 profils (agency, client, worker).

---

### **3. Tester les changements de langue**

```typescript
const { currentLang, setCurrentLang } = useI18n();

// Changer de langue
setCurrentLang('en'); // Tout le formulaire passe en anglais
setCurrentLang('de'); // Tout le formulaire passe en allemand
```

---

## ⚠️ **NOTES IMPORTANTES**

### **UPSERT automatique**

Le push utilise `UPSERT` :
- ✅ Si la clé existe → **Mise à jour**
- ✅ Si la clé n'existe pas → **Insertion**

**Conclusion** : Tu peux relancer le push autant de fois que tu veux sans dupliquer les données.

---

### **Batch processing**

Le push traite **500 records par batch** pour éviter les timeouts Supabase.

**Exemple** : 5284 traductions = 11 batches (~10 secondes total)

---

### **Erreurs gérées**

Si un batch échoue :
- ✅ Les autres batches continuent
- ✅ Les erreurs sont loggées
- ✅ Le statut final indique combien ont réussi

---

## 🆘 **TROUBLESHOOTING**

### **Erreur : "Missing translations object"**

**Cause** : Le body de la requête est vide

**Solution** : Utilise l'interface graphique ou envoie `{ translations: { ... } }`

---

### **Erreur : "Table not found"**

**Cause** : Schema cache pas rafraîchi

**Solution** : Exécute `/QUICK_FIX.sql` dans Supabase

---

### **Erreur : "Timeout"**

**Cause** : Trop de traductions d'un coup

**Solution** : Le système batch automatiquement (500/batch), ça devrait marcher

---

### **Erreur : "Permission denied"**

**Cause** : RLS trop restrictif

**Solution** : Vérifie les policies :

```sql
SELECT * FROM pg_policies WHERE tablename = 'translations_10092a63';
```

---

## 📚 **FICHIERS CRÉÉS**

| Fichier | Description |
|---------|-------------|
| `/supabase/functions/server/push-translations.tsx` | Route API backend |
| `/components/PushTranslationsButton.tsx` | Composant React |
| `/App-Push-Translations.tsx` | Page outil complète |
| `/scripts/push-translations-to-db.ts` | Script console |
| `/PUSH_TRANSLATIONS_GUIDE.md` | Ce guide |

---

## 🎉 **CONCLUSION**

**Action immédiate** :

1. ✅ Ouvre `/App-Push-Translations`
2. ✅ Clique sur "Push to Supabase"
3. ✅ Attends ~10 secondes
4. ✅ Vérifie que ~5000 traductions sont insérées
5. ✅ Rafraîchis ton app principale
6. ✅ L'erreur "translations not found" devrait disparaître

**Les 22 langues seront disponibles pour le formulaire !** 🌍

---

**Version** : 1.0.0  
**Date** : 11 Décembre 2024  
**Statut** : ✅ **PRÊT À UTILISER**
