# 🔍 DIAGNOSTIC - Traductions formulaire CLIENT

## 🎯 Problème

La modification "Principaux secteurs d'activité - test" dans le dashboard **n'apparaît PAS** dans le formulaire CLIENT (mais fonctionne pour AGENCY).

---

## 🏗️ Architecture découverte

### Système AGENCY (ancien) ✅ FONCTIONNE

```
Formulaire AGENCY
  ↓
DynamicQuestionRenderer
  ↓
QuestionsContext
  ↓
API /questions
  ↓
KV Store (question_config:*)
  ↓
labelFallback modifié ✅
```

---

### Système CLIENT/WORKER (nouveau) ❌ NE FONCTIONNE PAS

```
Formulaire CLIENT
  ↓
MultiProfileQuestionRenderer
  ↓
useQuestionVisibility  ← ❌ CHARGEAIT DEPUIS FICHIER HARD-CODÉ
  ↓
getQuestionsForSection
  ↓
SURVEY_QUESTIONS (fichier /config/survey-questions-COMPLETE.ts)
  ↓
labelFallback pas mis à jour ❌
```

---

## 🔧 FIX #1 - useQuestionVisibility

**FAIT** : Modifier `/hooks/useQuestionVisibility.ts` pour charger depuis l'API

```typescript
// AVANT
const sectionQuestions = getQuestionsForSection(sectionId, respondentType);

// APRÈS
useEffect(() => {
  const response = await fetch('/questions');
  const mergedQuestions = SURVEY_QUESTIONS.map(base => {
    const override = overrides[base.id];
    return override ? { ...base, ...override } : base;
  });
  setAllQuestions(mergedQuestions);
}, []);
```

**Résultat** : `labelFallback` est maintenant chargé depuis le KV Store ✅

---

## 🔧 FIX #2 NÉCESSAIRE - Traductions i18n

### Structure de traductions actuelle (INCOHÉRENTE)

#### API `/questions` sauvegarde dans :

**Clé** : `i18n:fr:question:q4_secteurs`

**Format** :
```json
{
  "key": "q4_secteurs",
  "lang_code": "fr",
  "type": "question",
  "status": "validated",
  "text": "Principaux secteurs d'activité - test",
  "placeholder": "Sélectionnez tous les secteurs concernés",
  "options": [...]
}
```

---

#### API `/translate/:lang` cherche dans :

**Clé** : `i18n:question:q4_secteurs` (sans langue dans la clé)

**Format** :
```json
{
  "translations": {
    "fr": {
      "label": "Principaux secteurs d'activité",
      "placeholder": "Sélectionnez tous les secteurs concernés",
      "options": [...]
    },
    "en": {
      "label": "Main business sectors",
      "placeholder": "Select all relevant sectors",
      "options": [...]
    }
  }
}
```

---

## ❌ PROBLÈME DÉCOUVERT

### Incohérence dans le storage KV

**Deux systèmes de clés coexistent** :

1. **Format ancien** (par langue) :
   - `i18n:fr:question:q4_secteurs`
   - `i18n:en:question:q4_secteurs`
   - `i18n:de:question:q4_secteurs`
   - → Sauvegardé par `/questions` API

2. **Format nouveau** (multi-langue) :
   - `i18n:question:q4_secteurs` avec `.translations.fr/en/de`
   - → Chargé par `/translate/:lang` API

---

## 🎯 SOLUTION

### Option A : Unifier vers format multi-langue (RECOMMANDÉ)

**Modifier `/supabase/functions/server/questions.tsx`** :

```typescript
// AVANT (ligne 131)
const translationKey = `i18n:fr:question:${questionId}`;

// APRÈS
const translationKey = `i18n:question:${questionId}`;

// Charger traductions existantes
const existing = await kv.get(translationKey) || { translations: {} };

// Mettre à jour UNIQUEMENT la langue FR
existing.translations = existing.translations || {};
existing.translations.fr = {
  label: labelFallback,
  placeholder: placeholderFallback || '',
  options: options?.map(opt => ({
    value: opt.value,
    label: opt.labelFallback || opt.label,
    icon: opt.icon
  })),
  status: 'validated'
};

await kv.set(translationKey, existing);
```

**Avantages** :
- ✅ Une seule clé par question
- ✅ Support multi-langue cohérent
- ✅ Compatible avec `/translate/:lang`
- ✅ Pas de duplication de données

---

### Option B : Unifier vers format par langue

**Modifier `/supabase/functions/server/i18n.tsx`** :

```typescript
// AVANT (ligne 541)
const questionTranslations = await kv.getByPrefix('i18n:question:');

// APRÈS
const questionTranslations = await kv.getByPrefix(`i18n:${lang}:question:`);

// Adapter le parsing
questionTranslations.forEach((item: any) => {
  const questionId = item.key.replace(`i18n:${lang}:question:`, '');
  questions[questionId] = {
    label: item.value.text,
    placeholder: item.value.placeholder || '',
    options: item.value.options || [],
    status: item.value.status || 'missing'
  };
});
```

**Inconvénients** :
- ❌ Plus difficile de gérer plusieurs langues
- ❌ Requiert plus de requêtes KV
- ❌ Moins scalable

---

## 📊 État actuel du KV Store (hypothèse)

```
question_config:q4_secteurs = {
  labelFallback: "Principaux secteurs d'activité - test",
  type: "multi-select",
  required: true,
  ...
}

i18n:fr:question:q4_secteurs = {
  text: "Principaux secteurs d'activité - test",  ← Sauvegardé par /questions
  placeholder: "...",
  status: "validated"
}

i18n:question:q4_secteurs = {
  translations: {
    en: {
      label: "Main business sectors",  ← PAS de traduction FR !
      ...
    }
  }
}
```

**Le frontend charge depuis** `i18n:question:*` qui **n'a PAS** la traduction FR mise à jour !

---

## ✅ PLAN D'ACTION

### Étape 1 : Modifier `/supabase/functions/server/questions.tsx`

Changer la logique de sauvegarde pour utiliser `i18n:question:${questionId}` avec structure multi-langue.

### Étape 2 : Migrer les données existantes (si nécessaire)

Script pour copier `i18n:fr:question:*` → `i18n:question:*.translations.fr`.

### Étape 3 : Tester

1. Modifier "Principaux secteurs d'activité - test" dans dashboard
2. Vérifier formulaire CLIENT
3. Vérifier formulaire AGENCY
4. Vérifier traductions EN/DE

---

## 🎯 Résultat attendu après fix

```
Modification dashboard
  ↓
PUT /questions/q4_secteurs
  ↓
Sauvegarde question_config:q4_secteurs (labelFallback)
  ↓
Sauvegarde i18n:question:q4_secteurs (translations.fr.label)
  ↓
GET /translate/fr
  ↓
Charge i18n:question:q4_secteurs
  ↓
Retourne translations.fr.label ✅
  ↓
Formulaire CLIENT affiche "... - test" ✅
```

---

**Prochaine étape** : Implémenter Option A (format multi-langue unifié) 🚀
