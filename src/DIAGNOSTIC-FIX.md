# 🔧 DIAGNOSTIC & FIX - Sauvegarde des Questions

## 🐛 Problème identifié

Quand tu cliques sur "Enregistrer" dans le modal d'édition, les modifications ne sont PAS persistées.

## 🔍 Analyse du bug

### Flux de données AVANT le fix

1. **Modal** : Tu modifies `labelFallback = "Taille de l'organisation - test"`
2. **Modal** : Clic sur "Enregistrer" → appelle `onSave(editedQuestion)`
3. **QuestionManagerV2** : `handleSaveQuestion` appelle `saveQuestion(id, updatedQuestion)`
4. **Hook useQuestions** : Envoie PUT à l'API avec tout l'objet
5. **API PUT** : Reçoit `{ labelFallback: "...", type: "radio", ... }`
6. **API PUT** : Sauvegarde dans `question_config:q3_taille` :
   ```json
   {
     "type": "radio",
     "required": true,
     "visibleFor": ["agency"],
     "updatedAt": "..."
     // ❌ PAS de labelFallback ici !
   }
   ```
7. **API PUT** : Sauvegarde dans `i18n:fr:question:q3_taille` :
   ```json
   {
     "text": "Taille de l'organisation - test",
     "key": "q3_taille",
     "lang_code": "fr",
     ...
     // ✅ labelFallback est bien sauvé ici (comme "text")
   }
   ```
8. **Hook useQuestions** : Recharge avec `refreshQuestions()`
9. **Hook useQuestions** : Fait GET /questions → récupère seulement les `question_config:*`
10. **Hook useQuestions** : Fusionne avec les questions de base :
    ```javascript
    return {
      ...baseQuestion,        // labelFallback: "Taille de l'organisation" (ancien)
      ...override,            // type, required, visibleFor (nouveau)
      id: baseQuestion.id,
      labelKey: baseQuestion.labelKey,
      placeholderKey: baseQuestion.placeholderKey,
    }
    ```
11. **Résultat** : Le nouveau `labelFallback` n'est JAMAIS chargé car il est dans `i18n:fr:question:*`, pas dans `question_config:*` !

### ❌ Le problème

L'API sauvegardait `labelFallback` dans **2 endroits différents** :
- `i18n:fr:question:*` → traduction française ✅
- `question_config:*` → MANQUANT ❌

Le hook ne chargeait que `question_config:*`, donc il ne voyait jamais le nouveau label.

## ✅ Solution appliquée

### Changements dans `/supabase/functions/server/questions.tsx`

**PUT endpoint (ligne 120-122)** :
```typescript
// AVANT (bug)
if (type !== undefined) configOverride.type = type;
if (required !== undefined) configOverride.required = required;
// ... mais PAS labelFallback !

// APRÈS (fix)
if (type !== undefined) configOverride.type = type;
if (required !== undefined) configOverride.required = required;
// ... tous les champs de structure ...

// ✅ AJOUTÉ : Sauvegarder aussi les labels dans l'override
if (labelFallback !== undefined) configOverride.labelFallback = labelFallback;
if (placeholderFallback !== undefined) configOverride.placeholderFallback = placeholderFallback;
if (descriptionFallback !== undefined) configOverride.descriptionFallback = descriptionFallback;
```

**POST endpoint (ligne 228-233)** :
```typescript
// AVANT (bug)
const newQuestion = {
  type,
  required,
  visibleFor,
  // ... mais PAS labelFallback !
};

// APRÈS (fix)
const newQuestion = {
  type,
  required,
  visibleFor,
  labelFallback: labelFallback || 'Nouvelle question',  // ✅ AJOUTÉ
  placeholderFallback: placeholderFallback || '',       // ✅ AJOUTÉ
  descriptionFallback: descriptionFallback || '',       // ✅ AJOUTÉ
  options,
  isNew: true,
  ...
};
```

## 🎯 Flux de données APRÈS le fix

1. **Modal** : Tu modifies `labelFallback = "Taille de l'organisation - test"`
2. **Modal** : Clic sur "Enregistrer" → appelle `onSave(editedQuestion)`
3. **QuestionManagerV2** : `handleSaveQuestion` appelle `saveQuestion(id, updatedQuestion)`
4. **Hook useQuestions** : Envoie PUT à l'API
5. **API PUT** : Sauvegarde dans `question_config:q3_taille` :
   ```json
   {
     "type": "radio",
     "required": true,
     "visibleFor": ["agency"],
     "labelFallback": "Taille de l'organisation - test",      // ✅ Maintenant c'est là !
     "placeholderFallback": "Ex: ACME Corporation",           // ✅ Maintenant c'est là !
     "descriptionFallback": "",                                // ✅ Maintenant c'est là !
     "updatedAt": "2024-12-10T..."
   }
   ```
6. **API PUT** : Sauvegarde AUSSI dans `i18n:fr:question:q3_taille` (pour les traductions)
7. **Hook useQuestions** : Recharge avec `refreshQuestions()`
8. **Hook useQuestions** : Fait GET /questions → récupère les `question_config:*`
9. **Hook useQuestions** : Fusionne :
    ```javascript
    return {
      ...baseQuestion,        // labelFallback: "Taille de l'organisation" (ancien)
      ...override,            // ✅ labelFallback: "... - test" (NOUVEAU, écrase l'ancien)
      id: baseQuestion.id,
      labelKey: baseQuestion.labelKey,
    }
    ```
10. **Résultat** : Le nouveau `labelFallback` est maintenant visible ! 🎉

## 📦 Données sauvegardées

### KV Store : `question_config:q3_taille`
```json
{
  "type": "radio",
  "required": true,
  "visibleFor": ["agency", "client", "worker"],
  "section": 1,
  "order": 3,
  "fieldName": "q3_taille",
  "labelFallback": "Taille de l'organisation - test",
  "placeholderFallback": "Ex: ACME Corporation",
  "descriptionFallback": "",
  "options": [
    { "value": "1-9", "labelFallback": "1-9 personnes", "icon": "👤" },
    { "value": "10-49", "labelFallback": "10-49 personnes", "icon": "👥" },
    { "value": "50-249", "labelFallback": "50-249 personnes", "icon": "🏢" },
    { "value": "250+", "labelFallback": "250+ personnes", "icon": "🏛️" }
  ],
  "updatedAt": "2024-12-10T16:00:00.000Z"
}
```

### KV Store : `i18n:fr:question:q3_taille`
```json
{
  "key": "q3_taille",
  "lang_code": "fr",
  "type": "question",
  "text": "Taille de l'organisation - test",
  "placeholder": "Ex: ACME Corporation",
  "description": "",
  "options": [
    { "value": "1-9", "label": "1-9 personnes", "icon": "👤" },
    { "value": "10-49", "label": "10-49 personnes", "icon": "👥" },
    { "value": "50-249", "label": "50-249 personnes", "icon": "🏢" },
    { "value": "250+", "label": "250+ personnes", "icon": "🏛️" }
  ],
  "status": "validated",
  "updatedAt": "2024-12-10T16:00:00.000Z"
}
```

## ✅ Test de validation

### Étapes pour vérifier que le fix fonctionne

1. **Ouvrir** `/dashboard?tab=questions`
2. **Sélectionner** le profil "Agences ETT"
3. **Trouver** la question "Taille de l'organisation" (q3_taille)
4. **Cliquer** sur l'icône ✏️ (Edit)
5. **Modifier** le libellé en : `Taille de l'organisation - TEST FIX`
6. **Modifier** le placeholder en : `Ex: Mon Entreprise SARL`
7. **Cliquer** sur "Enregistrer"
8. **Vérifier** le toast vert : "✅ Question mise à jour avec succès"
9. **Vérifier** dans la console (F12) les logs :
   ```
   🔵 [QuestionManagerV2] handleSaveQuestion called
   📝 [QUESTIONS] PUT question: q3_taille
   ✅ [QUESTIONS] Config override saved for: q3_taille
   ✅ [QUESTIONS] Translation saved for: q3_taille
   ✅ [useQuestions] Question saved: q3_taille
   📥 [useQuestions] Loaded X questions
   ```
10. **Cliquer** sur le bouton "Actualiser" (en haut à droite)
11. **Vérifier** que le libellé est maintenant : `Taille de l'organisation - TEST FIX`
12. **Rafraîchir** la page entière (F5)
13. **Revenir** sur l'onglet Questions
14. **Vérifier** que la modification est TOUJOURS là (persistance)

### Si ça ne fonctionne toujours pas

1. **Ouvrir la console (F12)**
   - Y a-t-il des erreurs rouges ?
   - Les logs 🔵 et ✅ apparaissent-ils ?

2. **Ouvrir l'onglet Network**
   - Chercher la requête PUT `/questions/q3_taille`
   - Cliquer dessus
   - Onglet "Payload" : vérifier que `labelFallback` est bien envoyé
   - Onglet "Response" : vérifier que `success: true`

3. **Vérifier le KV store**
   - Ouvrir la console
   - Exécuter :
     ```javascript
     fetch('https://{PROJECT_ID}.supabase.co/functions/v1/make-server-10092a63/kv-store/question_config:q3_taille', {
       headers: { 'Authorization': 'Bearer {ANON_KEY}' }
     }).then(r => r.json()).then(console.log)
     ```
   - Vérifier que `labelFallback` est dans l'objet retourné

## 🎉 Résultat attendu

Après avoir cliqué sur "Enregistrer", tu devrais voir :
1. ✅ Toast de succès
2. ✅ Le libellé change immédiatement dans la liste
3. ✅ Après "Actualiser", la modification persiste
4. ✅ Après F5 (refresh complet), la modification persiste

## 📝 Note technique

La **double sauvegarde** (question_config + i18n) est intentionnelle :
- `question_config` → Pour le chargement rapide des overrides (hook useQuestions)
- `i18n:fr:question` → Pour le système de traductions (futur support multi-langue)

C'est une forme de **dénormalisation** pour améliorer les performances.
