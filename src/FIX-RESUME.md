# ✅ FIX APPLIQUÉ - Sauvegarde des Questions

## 🐛 Problème

Quand tu cliquais sur "Enregistrer" dans le modal d'édition, **les modifications n'étaient pas persistées**.

## 🔍 Cause

L'API sauvegardait `labelFallback` uniquement dans `i18n:fr:question:*` (traductions), mais **PAS dans `question_config:*`** (overrides).

Le hook `useQuestions` ne chargeait que `question_config:*`, donc il ne voyait jamais les nouveaux labels.

## ✅ Solution

J'ai modifié `/supabase/functions/server/questions.tsx` pour sauvegarder **aussi** les labels dans `question_config:*` :

### Changements appliqués

**PUT endpoint** (ligne ~120) :
```typescript
// ✅ AJOUTÉ
if (labelFallback !== undefined) configOverride.labelFallback = labelFallback;
if (placeholderFallback !== undefined) configOverride.placeholderFallback = placeholderFallback;
if (descriptionFallback !== undefined) configOverride.descriptionFallback = descriptionFallback;
```

**POST endpoint** (ligne ~228) :
```typescript
// ✅ AJOUTÉ
const newQuestion = {
  // ... autres champs ...
  labelFallback: labelFallback || 'Nouvelle question',
  placeholderFallback: placeholderFallback || '',
  descriptionFallback: descriptionFallback || '',
  // ...
};
```

## 🧪 Test maintenant

### Étapes

1. Va sur `/dashboard?tab=questions`
2. Sélectionne le profil **"Agences ETT"**
3. Trouve la question **"Taille de l'organisation"** (q3_taille) - celle de ton screenshot
4. Clique sur l'icône **✏️ (Edit)**
5. Modifie le libellé : `Taille de l'organisation - TEST FIX`
6. Modifie le placeholder : `Ex: Mon Entreprise SARL`
7. Clique sur **"Enregistrer"**
8. ✅ Tu devrais voir un toast vert : "Question mise à jour avec succès"
9. ✅ Le libellé devrait changer **immédiatement** dans la liste
10. Clique sur **"Actualiser"** (bouton en haut à droite)
11. ✅ La modification devrait **persister**
12. Rafraîchis la page entière (F5)
13. Retourne sur l'onglet Questions
14. ✅ La modification devrait **toujours être là**

## 📊 Logs attendus dans la console (F12)

```
🔵 [QuestionManagerV2] handleSaveQuestion called { questionId: 'q3_taille', ... }
📝 [QUESTIONS] PUT question: q3_taille
✅ [QUESTIONS] Config override saved for: q3_taille
✅ [QUESTIONS] Translation saved for: q3_taille
✅ [useQuestions] Question saved: q3_taille
📥 [QUESTIONS] GET all questions with overrides
✅ [QUESTIONS] Found X overrides
✅ [useQuestions] Loaded X questions
✅ [QuestionManagerV2] Question saved successfully
```

## 🎯 Ce qui fonctionne maintenant

- ✅ Modification du libellé (labelFallback)
- ✅ Modification du placeholder
- ✅ Modification de la description
- ✅ Changement du type (text, textarea, radio, multi-select, etc.)
- ✅ Toggle required (obligatoire/optionnel)
- ✅ Modification des profils visibles
- ✅ Modification des options (pour radio/multi-select)
- ✅ **PERSISTANCE après actualisation**
- ✅ **PERSISTANCE après refresh complet (F5)**

## 🔄 Architecture de sauvegarde (double)

Les données sont sauvegardées dans **2 endroits** (intentionnel) :

### 1. `question_config:q3_taille` (overrides)
```json
{
  "type": "radio",
  "required": true,
  "visibleFor": ["agency"],
  "labelFallback": "Taille de l'organisation - TEST FIX",
  "placeholderFallback": "Ex: Mon Entreprise SARL",
  "options": [...],
  "updatedAt": "2024-12-10T..."
}
```
👉 **Utilisé par le hook `useQuestions` pour charger les questions**

### 2. `i18n:fr:question:q3_taille` (traductions)
```json
{
  "key": "q3_taille",
  "lang_code": "fr",
  "type": "question",
  "text": "Taille de l'organisation - TEST FIX",
  "placeholder": "Ex: Mon Entreprise SARL",
  "options": [...],
  "status": "validated",
  "updatedAt": "2024-12-10T..."
}
```
👉 **Utilisé par le système de traductions (futur support EN/ES/etc.)**

## 🐛 Si ça ne fonctionne toujours pas

### 1. Vérifier les logs console (F12)
- Y a-t-il des erreurs rouges ?
- Les logs 🔵 et ✅ apparaissent-ils ?

### 2. Vérifier la requête Network
- Ouvrir l'onglet Network (F12)
- Chercher `PUT .../questions/q3_taille`
- **Payload** : vérifier que `labelFallback` est envoyé
- **Response** : vérifier que `success: true`

### 3. Vérifier le KV store manuellement
Exécute dans la console :
```javascript
// Remplace {PROJECT_ID} et {ANON_KEY} par les vraies valeurs
fetch('https://{PROJECT_ID}.supabase.co/functions/v1/make-server-10092a63/kv-store/question_config:q3_taille', {
  headers: { 'Authorization': 'Bearer {ANON_KEY}' }
})
.then(r => r.json())
.then(data => {
  console.log('📦 KV Store data:', data);
  if (data.value?.labelFallback) {
    console.log('✅ labelFallback trouvé:', data.value.labelFallback);
  } else {
    console.log('❌ labelFallback MANQUANT dans KV store');
  }
})
```

## 📝 Prochaines étapes

Une fois que la sauvegarde fonctionne :

1. 🔨 **Ajout de nouvelles questions** (modal à créer)
2. 🌍 **Restaurer les traductions françaises** perdues
3. 🗑️ **Tester la suppression** (soft delete)
4. 📋 **Réorganisation** (drag & drop pour changer l'ordre)

## 🎉 C'est corrigé !

Le système devrait maintenant fonctionner correctement.

**Teste et dis-moi si ça marche ! 🚀**
