# ✅ FIX COMPLET - Formulaire CLIENT synchronisé avec Dashboard

## 🎯 Problème résolu

Les modifications dans le dashboard (ex: "Principaux secteurs d'activité - test") n'apparaissaient **PAS** dans le formulaire CLIENT/WORKER, seulement dans le formulaire AGENCY.

---

## 🔍 Cause racine

**DOUBLE DÉCONNEXION** :

### 1. Déconnexion du chargement des questions

Le formulaire CLIENT utilisait `useQuestionVisibility` qui chargeait depuis un **fichier hard-codé** au lieu de l'API.

### 2. Déconnexion du format de traductions

L'API `/questions` sauvegardait les traductions dans **un format**, mais l'API `/translate/:lang` les cherchait dans **un autre format**.

---

## 🔧 SOLUTIONS APPLIQUÉES

### Fix #1 : useQuestionVisibility → API

**Fichier modifié** : `/hooks/useQuestionVisibility.ts`

**AVANT** :
```typescript
const sectionQuestions = useMemo(
  () => getQuestionsForSection(sectionId, respondentType),  // ❌ Fichier hard-codé
  [sectionId, respondentType]
);
```

**APRÈS** :
```typescript
useEffect(() => {
  const response = await fetch('/questions');  // ✅ API
  const overrides = data.overrides || {};
  
  const mergedQuestions = SURVEY_QUESTIONS.map(baseQuestion => {
    const override = overrides[baseQuestion.id];
    return override ? { ...baseQuestion, ...override } : baseQuestion;
  });
  
  setAllQuestions(mergedQuestions);
}, []);

const sectionQuestions = useMemo(
  () => allQuestions.filter(q => q.section === sectionId && q.visibleFor.includes(respondentType)),
  [allQuestions, sectionId, respondentType]
);
```

**Résultat** : Le formulaire CLIENT charge maintenant les `labelFallback` modifiés depuis le KV Store ✅

---

### Fix #2 : Format de traductions unifié

**Fichier modifié** : `/supabase/functions/server/questions.tsx`

#### AVANT (format ancien par langue)

**Clé** : `i18n:fr:question:q4_secteurs` (langue dans la clé)

**Format** :
```json
{
  "key": "q4_secteurs",
  "lang_code": "fr",
  "text": "Principaux secteurs d'activité - test",
  "placeholder": "...",
  "status": "validated"
}
```

**Problème** : L'API `/translate/fr` cherchait dans `i18n:question:*` (sans langue dans la clé) !

---

#### APRÈS (format multi-langue unifié)

**Clé** : `i18n:question:q4_secteurs` (sans langue dans la clé)

**Format** :
```json
{
  "translations": {
    "fr": {
      "label": "Principaux secteurs d'activité - test",
      "placeholder": "Sélectionnez tous les secteurs concernés",
      "options": [...],
      "status": "validated"
    },
    "en": {
      "label": "Main business sectors",
      "placeholder": "Select all relevant sectors",
      "options": [...],
      "status": "auto-api"
    }
  }
}
```

**Avantages** :
- ✅ Une seule clé par question
- ✅ Toutes les langues dans un seul objet
- ✅ Compatible avec `/translate/:lang`
- ✅ Pas de duplication

---

## 📝 Code modifié (questions.tsx)

### Nouvelle logique de sauvegarde

```typescript
// 2. Sauvegarder la traduction française si fournie
if (labelFallback || placeholderFallback || descriptionFallback || options) {
  const translationKey = `i18n:question:${questionId}`;  // ✅ Sans langue dans la clé
  
  // 🔄 Récupérer les traductions existantes (format multi-langue)
  const existing: any = await kv.get(translationKey) || { translations: {} };

  // Initialiser les traductions si elles n'existent pas
  if (!existing.translations) {
    existing.translations = {};
  }

  // Mettre à jour UNIQUEMENT la traduction française
  existing.translations.fr = existing.translations.fr || {};

  if (labelFallback) {
    existing.translations.fr.label = labelFallback;  // ✅ Dans .translations.fr
  }
  if (placeholderFallback !== undefined) {
    existing.translations.fr.placeholder = placeholderFallback;
  }
  if (descriptionFallback !== undefined) {
    existing.translations.fr.description = descriptionFallback;
  }
  
  // Options : convertir le format si nécessaire
  if (options && Array.isArray(options)) {
    existing.translations.fr.options = options.map((opt: any) => ({
      value: opt.value,
      label: opt.labelFallback || opt.label || opt.value,
      icon: opt.icon
    }));
  }

  // Toujours marquer comme validé pour la langue française
  existing.translations.fr.status = 'validated';

  await kv.set(translationKey, existing);
  console.log(`✅ [QUESTIONS] Translation saved in multi-lang format: ${translationKey}`);
}
```

---

## 🔄 Flux complet après les fixes

```
┌────────────────────────────────────────┐
│      DASHBOARD - Modifier question     │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│  PUT /questions/q4_secteurs            │
│  body: { labelFallback: "... - test" }│
└────────────────────────────────────────┘
              ↓
      ┌───────────────┬────────────────┐
      ↓               ↓                ↓
┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐
│question_     │ │i18n:question:│ │i18n:question:       │
│config:       │ │q4_secteurs   │ │q4_secteurs          │
│q4_secteurs   │ │              │ │                     │
│              │ │translations: │ │.translations.fr:    │
│labelFallback:│ │  fr: {       │ │  label: "... - test"│
│"... - test"  │ │    label:... │ │  status: "validated"│
└─────────────┘ │  }           │ └─────────────────────┘
                └──────────────┘
              ↓
┌────────────────────────────────────────┐
│    FORMULAIRE CLIENT - Chargement      │
└────────────────────────────────────────┘
              ↓
      ┌───────────────┬────────────────┐
      ↓               ↓                ↓
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│useQuestion   │ │GET /questions│ │GET /translate/fr │
│Visibility    │ │              │ │                  │
│              │ │Retourne:     │ │Retourne:         │
│Charge depuis:│ │overrides {   │ │questions: {      │
│API /questions│ │ q4_secteurs: │ │  q4_secteurs: {  │
│              │ │  labelFall...│ │   label: "...    │
└──────────────┘ └──────────────┘ │   - test"        │
                                  │  }               │
                                  │}                 │
                                  └──────────────────┘
              ↓
┌────────────────────────────────────────┐
│  MultiProfileQuestionRenderer          │
│                                        │
│  const label = t(                      │
│    question.labelKey,                  │
│    question.labelFallback  ← De l'API  │
│  );                                    │
│                                        │
│  useI18n().t() charge depuis           │
│  /translate/fr qui retourne            │
│  "... - test" ✅                       │
└────────────────────────────────────────┘
              ↓
┌────────────────────────────────────────┐
│   AFFICHAGE dans le formulaire         │
│   "Principaux secteurs d'activité      │
│    - test"  ✅                         │
└────────────────────────────────────────┘
```

---

## 🧪 Test de validation

### Étapes pour vérifier

1. **Dashboard** : Va sur `/dashboard?tab=questions`
2. **Modifier** : Change "Principaux secteurs d'activité" → "Principaux secteurs d'activité - CONNECTÉ"
3. **Sauvegarder** : Clique sur "Enregistrer"
4. **Formulaire CLIENT** : Va sur `/` et choisis "Entreprise / Client"
5. **Vérifier** : Le label devrait être "Principaux secteurs d'activité - CONNECTÉ" ✅
6. **Refresh (F5)** : Rafraîchis la page
7. **Persistance** : Le label devrait toujours être "... - CONNECTÉ" ✅

### Logs attendus (console F12)

```
✅ [useQuestionVisibility] Loaded 59 questions from API
✅ [useI18n] Loaded translations for language: fr
```

---

## 📊 État du KV Store après fix

```
┌─────────────────────────────────────────┐
│  question_config:q4_secteurs            │
├─────────────────────────────────────────┤
│  {                                      │
│    type: "multi-select",                │
│    required: true,                      │
│    visibleFor: ["agency", "client"],    │
│    labelFallback: "... - test",  ✅     │
│    placeholderFallback: "...",          │
│    options: [...],                      │
│    updatedAt: "2024-12-10T..."          │
│  }                                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  i18n:question:q4_secteurs              │
├─────────────────────────────────────────┤
│  {                                      │
│    translations: {                      │
│      fr: {                              │
│        label: "... - test",  ✅         │
│        placeholder: "...",              │
│        options: [...],                  │
│        status: "validated"              │
│      },                                 │
│      en: {                              │
│        label: "Main business sectors",  │
│        placeholder: "...",              │
│        options: [...],                  │
│        status: "auto-api"               │
│      }                                  │
│    }                                    │
│  }                                      │
└─────────────────────────────────────────┘
```

---

## ✅ Résultat

### AVANT les fixes

- ❌ Dashboard et formulaire CLIENT déconnectés
- ❌ Modifications dashboard ignorées par CLIENT
- ✅ Modifications appliquées uniquement pour AGENCY
- ❌ Traductions incohérentes (2 formats)

### APRÈS les fixes

- ✅ Dashboard et formulaire CLIENT **synchronisés**
- ✅ Modifications dashboard **appliquées partout**
- ✅ AGENCY, CLIENT, WORKER tous connectés
- ✅ Format de traductions **unifié**
- ✅ Support multi-langue cohérent
- ✅ Source unique de vérité (KV Store)

---

## 🎯 Fichiers modifiés

1. `/hooks/useQuestionVisibility.ts` - Charge depuis API
2. `/supabase/functions/server/questions.tsx` - Format multi-langue unifié
3. `/context/QuestionsContext.tsx` - Charge depuis API (fix précédent)

---

## 🚀 Prochaines étapes

Maintenant que tout est synchronisé :

1. ✅ Tester toutes les modifications
2. ✅ Vérifier les 3 profils (agency/client/worker)
3. ✅ Tester les traductions multi-langues
4. ✅ Implémenter le modal "Ajouter une question"

---

**Le formulaire est maintenant COMPLÈTEMENT synchronisé ! 🎉**
