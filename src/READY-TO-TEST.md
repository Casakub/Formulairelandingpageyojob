# ✅ Système de Modification des Questions - PRÊT POUR TEST

## 🎯 Ce qui a été implémenté

### ✅ Backend API (`/supabase/functions/server/questions.tsx`)
```
GET    /make-server-10092a63/questions           → Liste tous les overrides
GET    /make-server-10092a63/questions/:id       → Récupère un override spécifique
PUT    /make-server-10092a63/questions/:id       → Modifie une question
POST   /make-server-10092a63/questions           → Crée une nouvelle question
DELETE /make-server-10092a63/questions/:id       → Supprime (soft delete)
POST   /make-server-10092a63/questions/:id/restore → Restaure une question
```

### ✅ Hook React (`/hooks/useQuestions.ts`)
- Fusion automatique des questions de base + overrides KV
- Filtrage par profil (agency/client/worker)
- Fonctions : `saveQuestion`, `createQuestion`, `deleteQuestion`, `refreshQuestions`

### ✅ Interface Dashboard (`QuestionManagerV2.tsx`)
- Connecté au hook `useQuestions`
- Modal d'édition complet (tous les champs)
- Bouton "Actualiser" pour recharger
- Logs de debug en console
- Toasts de feedback

---

## 🧪 2 FAÇONS DE TESTER

### Option 1 : Page de Test HTML (Test API direct)
**URL** : `/test-question-update.html`

**Fonctionnalités** :
- ✅ Charger une question (GET /questions/q1_nom)
- ✅ Modifier la question (PUT /questions/q1_nom)
- ✅ Vérifier dans KV store (question_config:q1_nom)
- ✅ Vérifier la traduction (i18n:fr:question:q1_nom)
- ✅ Charger toutes les questions (GET /questions)

**Avantages** :
- Test direct de l'API
- Pas besoin de navigation dans l'interface
- Voir les payloads JSON bruts

---

### Option 2 : Dashboard (Test interface complète)
**URL** : `/dashboard?tab=questions`

**Fonctionnalités** :
- ✅ Voir toutes les questions par profil (3 onglets)
- ✅ Modifier une question (clic sur ✏️)
- ✅ Changer type, libellé, placeholder, required, profils visibles, options
- ✅ Sauvegarder avec feedback (toast + logs console)
- ✅ Actualiser pour vérifier la persistance

**Avantages** :
- Test en conditions réelles
- UX complète
- Validation de bout en bout

---

## 🎬 SCÉNARIO DE TEST RECOMMANDÉ

### Étape 1 : Test API direct (5 min)
```
1. Ouvrir /test-question-update.html
2. Cliquer "Charger q1_nom" → Vérifier la réponse
3. Modifier le libellé et placeholder
4. Cliquer "💾 Sauvegarder les modifications"
5. Cliquer "Lire question_config:q1_nom" → Vérifier que c'est sauvé
6. Cliquer "Lire i18n:fr:question:q1_nom" → Vérifier la traduction
```

**Résultat attendu** :
```json
{
  "success": true,
  "message": "Question mise à jour avec succès",
  "questionId": "q1_nom",
  "configOverride": {
    "required": true,
    "labelFallback": "Nom complet (TEST MODIFIÉ)",
    "placeholderFallback": "Entrez le nom complet (MODIFIÉ)",
    "updatedAt": "2024-12-10T..."
  }
}
```

---

### Étape 2 : Test Dashboard (10 min)

#### A. Modification simple
```
1. Ouvrir /dashboard?tab=questions
2. Sélectionner profil "Agences ETT"
3. Trouver la question "Nom" (q1_nom)
4. Cliquer sur ✏️ (Edit)
5. Modifier :
   - Libellé : "Nom de votre agence (MODIFIÉ VIA DASHBOARD)"
   - Placeholder : "Ex: YOJOB Recrutement"
   - Changer "Question obligatoire" si désiré
6. Cliquer "Enregistrer"
7. Vérifier le toast vert "✅ Question mise à jour avec succès"
8. Cliquer "Actualiser" (bouton en haut à droite)
9. Vérifier que les modifications sont toujours là
```

#### B. Changement de type
```
1. Éditer une question de type "text"
2. Changer le type en "textarea"
3. Sauvegarder
4. Actualiser
5. Vérifier que le type a changé (icône 📄 au lieu de 📝)
```

#### C. Modification des profils visibles
```
1. Éditer une question visible uniquement pour "agency"
2. Cocher aussi "client" et "worker"
3. Sauvegarder
4. Changer d'onglet → "Clients/Entreprises"
5. Vérifier que la question apparaît maintenant
6. Changer d'onglet → "Intérimaires"
7. Vérifier que la question apparaît aussi
```

---

## 🔍 VÉRIFICATION DES DONNÉES

### Console développeur (F12)
Pendant le test dans le dashboard, surveillez la console pour voir :

```
🔵 [QuestionManagerV2] handleSaveQuestion called { questionId: 'q1_nom', ... }
📥 [useQuestions] Saving question: q1_nom
✅ [useQuestions] Question saved: q1_nom
✅ [QuestionManagerV2] Question saved successfully
📥 [useQuestions] Loaded X questions
```

### Logs serveur (dans les Network tools)
```
📝 [QUESTIONS] PUT question: q1_nom
✅ [QUESTIONS] Config override saved for: q1_nom
✅ [QUESTIONS] Translation saved for: q1_nom
```

---

## 📊 STRUCTURE DES DONNÉES

### KV Store : `question_config:q1_nom`
```json
{
  "required": true,
  "labelFallback": "Nom de votre agence (MODIFIÉ)",
  "placeholderFallback": "Ex: YOJOB Recrutement",
  "type": "text",
  "visibleFor": ["agency", "client", "worker"],
  "updatedAt": "2024-12-10T15:30:00.000Z"
}
```

### KV Store : `i18n:fr:question:q1_nom`
```json
{
  "key": "q1_nom",
  "lang_code": "fr",
  "type": "question",
  "text": "Nom de votre agence (MODIFIÉ)",
  "placeholder": "Ex: YOJOB Recrutement",
  "status": "validated",
  "updatedAt": "2024-12-10T15:30:00.000Z"
}
```

---

## 🎯 CE QUI FONCTIONNE

- ✅ Modification du libellé (labelFallback)
- ✅ Modification du placeholder
- ✅ Modification de la description
- ✅ Changement du type (text, textarea, radio, etc.)
- ✅ Toggle required (obligatoire ou non)
- ✅ Modification des profils visibles
- ✅ Modification des options (pour radio/multi-select)
- ✅ Sauvegarde dans KV store (question_config:*)
- ✅ Sauvegarde de la traduction FR (i18n:fr:question:*)
- ✅ Fusion automatique avec questions de base
- ✅ Actualisation des données
- ✅ Feedback utilisateur (toasts)
- ✅ Logs de debug

---

## 🚧 CE QUI RESTE À FAIRE

### Priorité 1 (Aujourd'hui)
- 🔨 **Ajout de nouvelles questions** (bouton existe mais modal à créer)
- 🌍 **Restaurer les traductions françaises** perdues

### Priorité 2 (Plus tard)
- 📝 Édition des traductions EN (actuellement seul FR est auto-sauvé)
- 🗑️ Hard delete (actuellement soft delete uniquement)
- 📋 Réorganisation des questions (drag & drop pour changer l'ordre)
- 🔄 Synchronisation temps réel avec le formulaire live

---

## 🐛 DEBUGGING

### Si ça ne marche pas

1. **Ouvrir la console (F12)**
   - Y a-t-il des erreurs rouges ?
   - Les logs 🔵 et ✅ apparaissent-ils ?

2. **Ouvrir l'onglet Network**
   - La requête PUT est-elle envoyée ?
   - Quel est le status code ? (devrait être 200)
   - Regarder la réponse JSON

3. **Tester l'API directement**
   - Utiliser `/test-question-update.html`
   - Si l'API fonctionne mais pas le dashboard → problème frontend
   - Si l'API ne fonctionne pas → problème backend

4. **Vérifier le KV store**
   - Utiliser les boutons "Lire question_config:..." dans la page de test
   - Vérifier manuellement via Supabase Dashboard (si disponible)

---

## 🎉 PRÊT POUR LE TEST !

**Commencez par** : `/test-question-update.html`

**Puis testez** : `/dashboard?tab=questions`

**Partagez les résultats** : Console logs + Network requests si problème

---

**Bonne chance ! 🚀**
