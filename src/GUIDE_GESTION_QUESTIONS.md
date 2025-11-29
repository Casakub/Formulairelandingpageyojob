# 🎯 Guide Rapide : Gérer les Questions du Formulaire

## 📍 Accès à la Gestion des Questions

1. **Connexion au Dashboard Admin**
   - Rendez-vous sur l'application
   - Cliquez sur "Dashboard Admin" en haut à droite
   - Connectez-vous avec vos identifiants

2. **Navigation vers les Questions**
   - Dans le menu latéral gauche
   - Cliquez sur **"Questions"** 📝
   - Vous accédez au gestionnaire complet

---

## 🔍 Vue d'Ensemble du Gestionnaire

```
┌────────────────────────────────────────────────────────────────┐
│  Gestionnaire de Questions                     26 questions     │
│  Modifiez, ajoutez ou supprimez des questions du formulaire    │
│                                                                 │
│  [🔍 Recherche avancée...]        [👁️ Aperçu] [+ Nouvelle]   │
├────────────────────────────────────────────────────────────────┤
│  📊 Statistiques                                                │
│  Total: 26  |  Visibles: 26  |  Obligatoires: 22  |  Opt: 4   │
├────────────────────────────────────────────────────────────────┤
│  📋 Liste des questions                                         │
│                                                                 │
│  [≡] Section 1 • q1_nom                        [👁️] [📋] [✏️] [🗑️] │
│      Nom de l'agence                                           │
│      Type: text  • Obligatoire                                 │
│                                                                 │
│  [≡] Section 1 • q2_annee                      [👁️] [📋] [✏️] [🗑️] │
│      Année de création                                         │
│      Type: number  • Obligatoire                               │
│                                                                 │
│  ...                                                            │
└────────────────────────────────────────────────────────────────┘
```

---

## ✏️ Modifier une Question Existante

### Étape par étape :

1. **Localiser la question**
   - Parcourez la liste ou utilisez la recherche
   - Trouvez la question à modifier

2. **Ouvrir l'éditeur**
   - Cliquez sur l'icône **✏️ Modifier** (bleue)
   - Le modal d'édition s'ouvre

3. **Modifier les champs souhaités**
   - **Code** : Identifiant unique (ex: `q1_nom`)
   - **Libellé** : Texte de la question affiché aux utilisateurs
   - **Type** : text, textarea, number, email, radio, multi-select, score
   - **Section** : Choisir la section 1-6
   - **Placeholder** : Texte d'aide dans le champ
   - **Options** : Pour radio/multi-select (format JSON)
   - **☑️ Obligatoire** : Rendre la réponse requise
   - **☑️ Visible** : Afficher/masquer dans le formulaire

4. **Enregistrer**
   - Cliquez sur **"Mettre à jour"**
   - La question est mise à jour instantanément

### Exemple de modification :

**Avant :**
```
Code: q1_nom
Libellé: Nom de l'agence
Type: text
Placeholder: Ex: CEA Personalmanagement
```

**Après modification :**
```
Code: q1_nom
Libellé: Nom complet de votre agence ETT
Type: text
Placeholder: Ex: CEA Personalmanagement GmbH
```

---

## ➕ Ajouter une Nouvelle Question

### Étapes :

1. **Cliquer sur "+ Nouvelle Question"** (bouton gradient cyan-violet en haut à droite)

2. **Remplir le formulaire**
   ```
   Code de la question * : q27_nouvelle
   Libellé * : Quelle est votre nouvelle question ?
   Type : Texte court ▼
   Section : Section 1 - Profil ▼
   Placeholder : Votre réponse...
   Options : (si radio/multi-select)
   ☑️ Question obligatoire
   ☑️ Question visible
   ```

3. **Enregistrer**
   - Cliquez sur **"Enregistrer"**
   - La nouvelle question apparaît dans la liste

### Format des Options (JSON)

Pour les questions de type **radio** ou **multi-select**, utilisez ce format :

```json
[
  {
    "value": "option1",
    "label": "Première option",
    "icon": "🔥"
  },
  {
    "value": "option2",
    "label": "Deuxième option",
    "icon": "⚡"
  },
  {
    "value": "autre",
    "label": "Autre",
    "icon": "❓"
  }
]
```

---

## 🗑️ Supprimer une Question

### ⚠️ ATTENTION : Action irréversible !

1. **Localiser la question à supprimer**

2. **Cliquer sur l'icône 🗑️ Supprimer** (rouge)

3. **Confirmer la suppression**
   - Une alerte de confirmation apparaît
   - "Êtes-vous sûr de vouloir supprimer cette question ?"
   - Cliquez sur **OK** pour confirmer

4. **La question est supprimée définitivement**

### 💡 Conseil :
Au lieu de supprimer, vous pouvez simplement **masquer** une question en cliquant sur l'icône 👁️. Elle restera dans le système mais ne sera pas visible dans le formulaire.

---

## 👁️ Masquer/Afficher une Question

### Utilisation :

- **Cliquer sur l'icône 👁️** (œil ouvert) pour masquer
- **Cliquer sur l'icône 👁️‍🗨️** (œil barré) pour réafficher

### Avantages :
- ✅ Question conservée dans le système
- ✅ Pas de perte de données
- ✅ Peut être réactivée à tout moment
- ✅ Utile pour tester différentes versions du formulaire

---

## 📋 Dupliquer une Question

### Utilisation rapide :

1. **Cliquer sur l'icône 📋 Dupliquer**

2. **Une copie est créée automatiquement**
   - Code : `[original]_copy`
   - Libellé : `[original] (Copie)`
   - Toutes les autres propriétés identiques

3. **Modifier la copie selon vos besoins**

### Exemple :
```
Original:
  Code: q18_score
  Libellé: Intérêt pour YoJob

Copie créée:
  Code: q18_score_copy
  Libellé: Intérêt pour YoJob (Copie)
```

---

## 🔄 Réorganiser les Questions

### Drag & Drop :

1. **Survoler le handle de drag** ≡ (à gauche de chaque question)

2. **Cliquer et maintenir**

3. **Glisser vers le haut ou le bas**

4. **Relâcher à la position souhaitée**

L'ordre est mis à jour automatiquement !

### Effet visuel :
- Pendant le drag : bordure cyan + ombre
- Transition fluide et animée

---

## 🔍 Recherche Avancée

### Filtres disponibles :

```
┌────────────────────────────────────────────┐
│  🔍 Recherche Avancée                      │
├────────────────────────────────────────────┤
│  [Rechercher par code ou label.........]   │
│                                            │
│  Section : [Toutes les sections ▼]        │
│  Type : [Tous les types ▼]                │
│  Visibilité : [Toutes ▼]                  │
│  Statut : [Toutes ▼]                      │
│                                            │
│  [🔄 Réinitialiser]                       │
└────────────────────────────────────────────┘
```

### Combinaisons possibles :

**Exemple 1 :** Trouver toutes les questions radio de la section 2
- Section : Section 2
- Type : radio

**Exemple 2 :** Trouver toutes les questions masquées
- Visibilité : Masquées uniquement

**Exemple 3 :** Trouver toutes les questions optionnelles
- Statut : Optionnelles uniquement

---

## 👀 Aperçu Live du Formulaire

### Tester vos modifications en temps réel :

1. **Cliquer sur "👁️ Aperçu"** (bouton en haut)

2. **Le formulaire s'affiche en modal**
   - Navigation par sections
   - Affichage des questions modifiées
   - Test des questions conditionnelles

3. **Vérifier le rendu**
   - Desktop / Mobile
   - Questions visibles/masquées
   - Ordre des questions

4. **Fermer l'aperçu**
   - Revenir aux modifications

---

## 📊 Statistiques en Temps Réel

Le dashboard affiche automatiquement :

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   TOTAL      │   VISIBLES   │ OBLIGATOIRES │ OPTIONNELLES │
│     26       │      26      │      22      │      4       │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

Répartition par section :
- 📋 Section 1 : 4 questions
- 🌍 Section 2 : 7 questions
- 💼 Section 3 : 6 questions
- ⭐ Section 4 : 6 questions
- 🔮 Section 5 : 2 questions
- 📧 Section 6 : 1 question

---

## 🎨 Types de Questions Disponibles

### 1. **Texte court** (`text`)
```
Exemple: Nom de l'agence
[________________________]
```

### 2. **Texte long** (`textarea`)
```
Exemple: Plus gros problème
[                          ]
[                          ]
[                          ]
```

### 3. **Nombre** (`number`)
```
Exemple: Année de création
[2024___]
```

### 4. **Email** (`email`)
```
Exemple: Email professionnel
[votremail@agence.com____]
```

### 5. **Choix unique** (`radio`)
```
Exemple: Taille de l'agence
○ 1-5 personnes
● 6-50 personnes
○ 51-250 personnes
○ 250+ personnes
```

### 6. **Choix multiple** (`multi-select`)
```
Exemple: Secteurs d'activité
☑️ BTP / Construction
☑️ Industrie
☐ Logistique
☑️ Santé
```

### 7. **Score** (`score`)
```
Exemple: Intérêt pour YoJob (1-10)
[1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
                            ✓
```

---

## 🔐 Questions Conditionnelles

### Fonctionnement :

Certaines questions apparaissent uniquement si une condition est remplie.

**Exemple :**
```
Question parent:
  q9_defi: "Principal défi du détachement"
  Options: Admin, Conformité, Coût, Langues, Autre

Question conditionnelle:
  q9_autre: "Précisez votre principal défi"
  Affichée uniquement si: q9_defi = "autre"
```

### Configuration :

Dans le formulaire d'édition, vous pouvez définir :
```json
{
  "conditional": {
    "dependsOn": "q9_defi",
    "showWhen": "autre"
  }
}
```

---

## 💡 Bonnes Pratiques

### ✅ À FAIRE :

1. **Codes uniques**
   - Format : `q[numéro]_[descriptif]`
   - Exemple : `q27_experience_internationale`

2. **Labels clairs**
   - Poser une question précise
   - Éviter les ambiguïtés
   - Être concis mais complet

3. **Placeholders utiles**
   - Donner des exemples concrets
   - Guider l'utilisateur

4. **Options cohérentes**
   - Pour radio : choix mutuellement exclusifs
   - Pour multi-select : choix cumulables
   - Toujours inclure "Autre" si pertinent

5. **Tester avant de publier**
   - Utiliser l'aperçu live
   - Vérifier sur mobile et desktop

### ❌ À ÉVITER :

1. **Codes en double** → Erreur garantie
2. **Questions trop longues** → Perte d'attention
3. **Trop de questions obligatoires** → Abandon
4. **Options mal formatées** → Bug d'affichage
5. **Supprimer sans réfléchir** → Perte de données

---

## 🔧 Dépannage Rapide

### Problème : "La question n'apparaît pas dans le formulaire"

**Solution :**
1. Vérifier que **Visible** est coché ✅
2. Vérifier la section assignée
3. Rafraîchir l'aperçu

---

### Problème : "Les options ne s'affichent pas"

**Solution :**
1. Vérifier le format JSON
2. S'assurer que le type est `radio` ou `multi-select`
3. Exemple valide :
```json
[
  {"value": "opt1", "label": "Option 1", "icon": "🔥"}
]
```

---

### Problème : "Impossible de modifier une question"

**Solution :**
1. Vérifier que le modal s'ouvre bien
2. Attendre le chargement des données
3. Si vide, rafraîchir la page

---

### Problème : "L'ordre ne change pas"

**Solution :**
1. S'assurer de bien drag & drop avec le handle ≡
2. Relâcher au bon endroit
3. Rafraîchir si besoin

---

## 📞 Support

Si vous rencontrez un problème non résolu :

1. **Vérifier les logs console** (F12 dans le navigateur)
2. **Recharger la page** (Ctrl+R ou Cmd+R)
3. **Vider le cache** si nécessaire
4. **Contacter le support technique**

---

## 🎉 Résumé des Actions Rapides

| Action | Icône | Effet |
|--------|-------|-------|
| **Modifier** | ✏️ Bleu | Ouvre le modal d'édition |
| **Supprimer** | 🗑️ Rouge | Supprime après confirmation |
| **Masquer/Afficher** | 👁️ Gris | Toggle la visibilité |
| **Dupliquer** | 📋 Gris | Crée une copie |
| **Drag** | ≡ Gris | Réorganise l'ordre |

---

## 🚀 Workflow Recommandé

### Pour ajouter une nouvelle question :

```
1. Cliquer "+ Nouvelle Question"
2. Remplir le code (unique)
3. Rédiger le libellé
4. Choisir le type
5. Assigner la section
6. Ajouter placeholder
7. Configurer les options (si radio/multi-select)
8. Cocher "Obligatoire" si nécessaire
9. Cliquer "Enregistrer"
10. Tester dans l'aperçu
11. Ajuster si besoin
```

### Pour modifier une question existante :

```
1. Trouver la question (recherche ou scroll)
2. Cliquer ✏️ Modifier
3. Attendre le chargement des données
4. Modifier les champs souhaités
5. Cliquer "Mettre à jour"
6. Vérifier dans l'aperçu
```

---

**🎯 Vous êtes maintenant prêt à gérer efficacement toutes les questions du formulaire !**

**Questions ? Consultez les fichiers :**
- `/QUESTIONS_VERIFICATION.md` : Liste complète des 26 questions
- `/DASHBOARD_USER_GUIDE.md` : Guide complet du dashboard
- `/README.md` : Documentation générale du projet
