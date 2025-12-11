# 🧪 Guide de Test - Modification des Questions

## 📋 Ce qui a été implémenté

### Backend
- ✅ API `/make-server-10092a63/questions` complète
- ✅ GET, PUT, POST, DELETE avec overrides dans KV store
- ✅ Sauvegarde des traductions françaises automatique

### Frontend  
- ✅ Hook `useQuestions` avec fusion base + overrides
- ✅ `QuestionManagerV2` connecté au hook
- ✅ Modal d'édition fonctionnel

---

## 🎯 Test 1 : API directe (Page HTML)

### Accès
Ouvrez dans votre navigateur :
```
/test-question-update.html
```

### Étapes de test
1. **Charger la question q1_nom**
   - Cliquez sur "Charger q1_nom"
   - Vérifiez la réponse JSON

2. **Modifier la question**
   - Changez le libellé : `Nom complet (TEST MODIFIÉ)`
   - Changez le placeholder : `Entrez le nom complet (MODIFIÉ)`
   - Cliquez "💾 Sauvegarder les modifications"

3. **Vérifier dans KV store**
   - Cliquez "Lire question_config:q1_nom" 
   - Vérifiez que les modifications sont présentes
   - Cliquez "Lire i18n:fr:question:q1_nom"
   - Vérifiez la traduction française

4. **Charger toutes les questions**
   - Cliquez "GET /questions"
   - Vérifiez que `q1_nom` apparaît dans les overrides

---

## 🎯 Test 2 : Dashboard (Interface réelle)

### Accès
```
/dashboard?tab=questions
```

### Étapes de test

#### Test A : Modification simple
1. Allez dans l'onglet **Questions**
2. Sélectionnez le profil **Agences ETT**
3. Sur la question **"Nom"** (q1_nom), cliquez sur l'icône ✏️ (Edit)
4. Dans le modal :
   - Changez le libellé : `Nom de votre agence (MODIFIÉ)`
   - Changez le placeholder : `Ex: YOJOB Intérim`
   - Cochez/décochez "Question obligatoire"
5. Cliquez **"Enregistrer"**
6. Vérifiez le toast de succès ✅
7. Cliquez sur **"Actualiser"** pour recharger
8. Vérifiez que les modifications sont persistées

#### Test B : Modification du type
1. Éditez une question de type "text"
2. Changez le type en "textarea"
3. Sauvegardez
4. Vérifiez que le type a changé

#### Test C : Modification des profils visibles
1. Éditez une question visible pour "agency" uniquement
2. Ajoutez "client" et "worker"
3. Sauvegardez
4. Changez d'onglet vers **Clients/Entreprises**
5. Vérifiez que la question apparaît maintenant

#### Test D : Modification des options (radio/multi-select)
1. Trouvez une question de type "radio" (ex: q3_pays)
2. Éditez-la
3. Ajoutez une nouvelle option
4. Modifiez le label d'une option existante
5. Supprimez une option
6. Sauvegardez
7. Vérifiez les modifications

---

## 🔍 Vérification des données

### Dans la console développeur

```javascript
// Vérifier la question q1_nom dans KV store
fetch('https://{PROJECT_ID}.supabase.co/functions/v1/make-server-10092a63/kv-store/question_config:q1_nom', {
  headers: { 'Authorization': 'Bearer {ANON_KEY}' }
}).then(r => r.json()).then(console.log)

// Vérifier la traduction française
fetch('https://{PROJECT_ID}.supabase.co/functions/v1/make-server-10092a63/kv-store/i18n:fr:question:q1_nom', {
  headers: { 'Authorization': 'Bearer {ANON_KEY}' }
}).then(r => r.json()).then(console.log)

// Charger tous les overrides
fetch('https://{PROJECT_ID}.supabase.co/functions/v1/make-server-10092a63/questions', {
  headers: { 'Authorization': 'Bearer {ANON_KEY}' }
}).then(r => r.json()).then(console.log)
```

---

## ✅ Résultats attendus

### Après modification via l'API
```json
// question_config:q1_nom
{
  "value": {
    "required": true,
    "labelFallback": "Nom complet (TEST MODIFIÉ)",
    "placeholderFallback": "Entrez le nom complet (MODIFIÉ)",
    "updatedAt": "2024-12-10T..."
  }
}
```

### Après modification via le Dashboard
```json
// question_config:q1_nom
{
  "value": {
    "required": true,
    "labelFallback": "Nom de votre agence (MODIFIÉ)",
    "placeholderFallback": "Ex: YOJOB Intérim",
    "updatedAt": "2024-12-10T..."
  }
}
```

### Traduction française automatique
```json
// i18n:fr:question:q1_nom
{
  "value": {
    "key": "q1_nom",
    "lang_code": "fr",
    "type": "question",
    "text": "Nom de votre agence (MODIFIÉ)",
    "placeholder": "Ex: YOJOB Intérim",
    "status": "validated",
    "updatedAt": "2024-12-10T..."
  }
}
```

---

## 🐛 Debugging

### Si les modifications ne sont pas sauvegardées

1. **Vérifier les logs serveur** (onglet Network dans DevTools)
   - La requête PUT est-elle envoyée ?
   - Quel est le status code ? (devrait être 200)
   - Y a-t-il une erreur dans la réponse ?

2. **Vérifier les logs console**
   ```
   ✅ [useQuestions] Question saved: q1_nom
   ✅ [QUESTIONS] Config override saved for: q1_nom
   ✅ [QUESTIONS] Translation saved for: q1_nom
   ```

3. **Vérifier le KV store directement**
   - Utilisez les fetch ci-dessus
   - Ou via Supabase Dashboard (si disponible)

### Si le hook ne recharge pas les données

1. Vérifiez que `refreshQuestions()` est bien appelé après save
2. Vérifiez les deps du useEffect dans le hook
3. Forcez un refresh manuel avec le bouton "Actualiser"

---

## 🎉 Prochaines étapes

Une fois les tests validés :

1. ✅ **Suppression de questions** (déjà implémenté avec soft delete)
2. 🔨 **Ajout de nouvelles questions** (modal à créer)
3. 🌍 **Restaurer les traductions françaises** perdues
4. 🔄 **Synchronisation avec le formulaire live**

---

## 📞 Support

Si vous rencontrez un problème :

1. Partagez les logs console (F12 > Console)
2. Partagez le payload de la requête (F12 > Network > Requête PUT)
3. Partagez le statut de la réponse
