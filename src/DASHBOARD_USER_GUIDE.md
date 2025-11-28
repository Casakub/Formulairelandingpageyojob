# 📘 Guide Utilisateur - Dashboard YoJob v2.0

## 🎉 Bienvenue dans le Dashboard Amélioré !

Ce guide vous accompagne pour maîtriser toutes les fonctionnalités du nouveau dashboard.

---

## 🚀 Démarrage Rapide

### 1. Accéder au Dashboard

**Depuis le formulaire** :
- Cliquez sur le bouton **"Dashboard"** dans le header

**URL directe** :
```
http://localhost:3000/dashboard
```

### 2. Interface principale

Le dashboard est organisé en **4 onglets** :

| Onglet | Icône | Description |
|--------|-------|-------------|
| **Vue d'ensemble** | 📊 | Statistiques et analytics |
| **Questions** | 📝 | Gestion des 26 questions |
| **Intégrations** | 🔌 | Supabase, Google Sheets... |
| **Paramètres** | ⚙️ | Configuration générale |

---

## 📊 Onglet 1 : Vue d'Ensemble

### Statistiques Principales

**4 KPIs en haut de page** :

1. **Réponses totales** 
   - Affiche : Nombre actuel / Objectif (27 000)
   - Barre de progression animée
   
2. **Taux de complétion**
   - % d'utilisateurs qui terminent le formulaire
   - Objectif : 70%
   
3. **Score moyen**
   - Note moyenne donnée à YoJob (Q18)
   - Sur une échelle de 1 à 10
   
4. **Prêts pour MVP**
   - Nombre d'agences intéressées (score ≥ 7)
   - % du total

### Graphiques

**Top 5 Features demandées**
- Barres horizontales animées
- Montre quelles features les agences veulent le plus

**Réponses par pays**
- Visualisation géographique
- Top 5 pays avec drapeaux emoji

**Distribution des scores**
- 4 colonnes colorées
- Ambassadeurs (9-10) 🟢
- Intéressés (7-8) 🔵
- Modérés (5-6) 🟡
- Peu intéressés (1-4) 🔴

### Quick Stats

**3 métriques rapides** :
- 📅 Réponses aujourd'hui
- ⏱️ Temps moyen de complétion
- ✅ Taux de validation

---

## 📝 Onglet 2 : Questions (⭐ Le Plus Important)

### Vue Générale

**En haut de page** :

**Statistiques des questions** (4 cards) :
- Questions totales : 26
- Questions visibles : X
- Questions masquées : X
- Questions obligatoires : 24

**Graphique de répartition** :
- Nombre de questions par section (1-6)

### Gestionnaire de Questions

**Actions principales** :

#### ➕ Créer une Nouvelle Question

1. Cliquez sur **"Nouvelle Question"**
2. Remplissez le formulaire :
   - **Code*** : Ex: `q27_test` (unique, sans espaces)
   - **Libellé*** : Ex: "Quelle est votre motivation ?"
   - **Type** : text, number, email, textarea, radio, multi-select, score
   - **Section** : 1 à 6
   - **Placeholder** : Texte d'aide (optionnel)
   - **Options** : Pour radio/multi-select (format JSON)
   - **☑️ Obligatoire** : Cochez si la réponse est requise
   - **☑️ Visible** : Cochez pour afficher dans le formulaire
3. Cliquez sur **"Enregistrer"**

**Format des options (JSON)** :
```json
[
  {"value": "opt1", "label": "Option 1", "icon": "🔥"},
  {"value": "opt2", "label": "Option 2", "icon": "⭐"},
  {"value": "opt3", "label": "Option 3", "icon": "🚀"}
]
```

#### ✏️ Modifier une Question

1. Cliquez sur l'icône **crayon bleu** ✏️
2. Modifiez les champs souhaités
3. Enregistrez

**Astuce** : Les modifications sont visibles immédiatement dans le formulaire !

#### 🗑️ Supprimer une Question

1. Cliquez sur l'icône **poubelle rouge** 🗑️
2. Confirmez la suppression
3. La question disparaît du formulaire

**⚠️ Attention** : Cette action est irréversible !

#### 👁️ Masquer/Afficher une Question

**Usage** :
- Test A/B : Masquer temporairement une question
- Questions saisonnières : Afficher seulement en période spécifique
- Debug : Masquer une question problématique

**Comment** :
1. Cliquez sur l'icône **œil** 👁️
2. **Œil ouvert** = Question visible
3. **Œil barré** = Question masquée

**Effet** : La question masquée n'apparaît plus dans le formulaire mais reste dans la configuration.

#### 📋 Dupliquer une Question

**Cas d'usage** :
- Créer une variante d'une question existante
- Gagner du temps (pas besoin de tout retaper)

**Comment** :
1. Cliquez sur l'icône **copie** 📋
2. Une copie est créée avec " (Copie)" ajouté au label
3. Modifiez la copie comme souhaité

---

### 🎯 NOUVEAU : Drag & Drop ! ⭐⭐⭐

**Réorganiser les questions en 2 secondes !**

#### Comment ça marche ?

1. **Cliquez et maintenez** sur l'icône de poignée (≡) à gauche d'une question
2. **Glissez** la question vers le haut ou le bas
3. **Déposez** à l'emplacement souhaité
4. **Tadaaa !** L'ordre est mis à jour automatiquement

#### Feedback Visuel

**Pendant le drag** :
- Question devient semi-transparente
- Ring cyan autour de la question
- Curseur change en "grabbing" 🖐️

**Pendant le survol** :
- Les autres questions se décalent automatiquement
- Animation fluide

#### Support Clavier (Accessibilité)

**Pour les utilisateurs sans souris** :

1. **Tab** : Naviguer jusqu'à une question
2. **Espace** : Sélectionner la question
3. **↑/↓** : Déplacer vers haut/bas
4. **Espace** : Déposer
5. **Escape** : Annuler

#### Cas d'usage

**Exemple 1 : Améliorer le flow**
```
Avant : Q1 → Q2 → Q3 (question difficile) → Q4
Après : Q1 → Q2 → Q4 → Q3 (question à la fin)
Résultat : Moins d'abandons !
```

**Exemple 2 : Regrouper par thème**
```
Toutes les questions sur le budget ensemble
Toutes les questions techniques ensemble
```

**Exemple 3 : Prioriser**
```
Questions obligatoires en premier
Questions optionnelles à la fin
```

---

### 🔍 Filtres et Recherche

**Filtre par section** :
- Dropdown en haut à gauche
- Sélectionnez "Section 1" à "Section 6"
- Ou "Toutes les sections" pour voir tout

**Compteur** :
- Affiche "X question(s)" filtrées

**Futur** (à venir) :
- 🔍 Recherche par texte
- 🏷️ Filtres multiples (Type + Visible + Obligatoire)
- 📊 Tri par date de création

---

## 🔌 Onglet 3 : Intégrations

### Supabase (Recommandé)

**Pourquoi connecter Supabase ?**
- Stocker les 27 000 réponses
- Analytics en temps réel
- Exports SQL vers Google Sheets
- Sécurité RGPD (RLS)

**Comment connecter ?**
1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Copiez l'URL et l'Anon Key
4. Collez dans les champs du dashboard
5. Cliquez sur "Connecter"

**Docs complètes** : `/SUPABASE_INTEGRATION.md`

### Google Sheets

**Backup automatique** :
- Export des réponses vers Google Sheets
- Mise à jour en temps réel
- Accès pour toute l'équipe

**Configuration** :
1. Créez un Google Sheet
2. Activez l'API Google Sheets
3. Copiez l'ID du spreadsheet
4. Authentifiez-vous

### Autres Intégrations

**Disponibles prochainement** :
- Slack (notifications)
- Zapier (automatisation)
- Metabase (analytics avancé)
- Mailchimp (email marketing)

---

## ⚙️ Onglet 4 : Paramètres

### Configuration Générale

**Langue** :
- FR (Français) - Par défaut
- EN (English) - Bientôt disponible

**Thème** :
- ☀️ Clair (actuel)
- 🌙 Sombre (à venir)

**Notifications** :
- Email à X réponses
- Slack quand score moyen > Y
- Alerte si taux d'abandon > Z

### Sécurité

**Accès Dashboard** :
- Protégé par mot de passe (à configurer)
- Logs des modifications
- Rôles : Admin / Éditeur / Lecteur

### Export / Import

**Export Questions** :
- Format JSON (backup)
- Format CSV (Excel)
- Format PDF (documentation)

**Import Questions** :
- Restaurer depuis backup
- Importer template
- Fusionner avec existant

---

## 💡 Astuces & Bonnes Pratiques

### 🎯 Gestion des Questions

**DO ✅** :
- Tester chaque question avant de publier
- Utiliser des codes clairs (q1_nom, q2_annee...)
- Grouper les questions par thème dans une section
- Masquer plutôt que supprimer (pour garder l'historique)

**DON'T ❌** :
- Ne pas utiliser d'espaces dans les codes
- Ne pas supprimer une question utilisée par une condition
- Ne pas dépasser 10 questions par section
- Ne pas mettre trop d'options dans un multi-select

### 🚀 Performance

**Optimisations** :
- Maximum 50 questions dans le formulaire
- Utilisez des conditions pour masquer/afficher
- Préférez radio à multi-select quand possible
- Évitez les textarea trop longs

### 📊 Analytics

**Surveillez** :
- Taux d'abandon par section
- Questions qui prennent le plus de temps
- Questions souvent laissées vides
- Score moyen par pays

**Actions** :
- Si abandon élevé → Simplifier la question
- Si temps long → Ajouter un helper text
- Si souvent vide → Rendre obligatoire ou clarifier

### 🎨 UX

**Conseils** :
- Questions obligatoires : 20-25 max
- Progress bar : Essentielle pour motivation
- Sections : 6 max pour ne pas décourager
- Labels : Courts et précis
- Placeholders : Donnez des exemples

---

## 🐛 FAQ & Troubleshooting

### Q : "Je ne vois pas mes modifications dans le formulaire"

**R** : 
1. Vérifiez que la question est **visible** (œil ouvert)
2. Rafraîchissez le formulaire (F5)
3. Videz le cache du navigateur (Ctrl+Shift+R)

### Q : "Le drag & drop ne fonctionne pas"

**R** :
1. Vérifiez que les dépendances sont installées (voir `/INSTALL_DEPENDENCIES.md`)
2. Vérifiez la console JavaScript (F12) pour les erreurs
3. Essayez avec le clavier (Espace + Flèches)

### Q : "J'ai supprimé une question par erreur"

**R** :
- Actuellement pas d'undo 😢
- Prochainement : Historique des modifications + rollback
- En attendant : Export régulier en JSON pour backup

### Q : "Comment créer une question conditionnelle ?"

**R** :
```typescript
// Dans config/questions.ts
{
  id: "q9_autre",
  conditional: {
    dependsOn: "q9_defi",  // Code de la question parent
    showWhen: "autre"       // Valeur qui déclenche l'affichage
  }
}
```

### Q : "Le formulaire est trop long"

**R** :
1. Utilisez des conditions pour masquer des questions
2. Passez certaines questions en "optionnel"
3. Divisez en plusieurs formulaires (multistep)
4. Priorisez les questions essentielles

### Q : "Comment exporter les statistiques ?"

**R** :
- Actuellement : Copier/coller depuis Dashboard Overview
- Prochainement : Export CSV/PDF avec graphiques

---

## 🎓 Tutoriels Vidéo (à venir)

**Prévus** :
- 📹 [01] Introduction au Dashboard (5 min)
- 📹 [02] Créer et modifier des questions (10 min)
- 📹 [03] Maîtriser le Drag & Drop (5 min)
- 📹 [04] Connecter Supabase (15 min)
- 📹 [05] Analytics avancés avec Recharts (20 min)

---

## 🏆 Raccourcis Clavier (Pro Tips)

**Navigation** :
- `Tab` : Élément suivant
- `Shift+Tab` : Élément précédent
- `Escape` : Fermer modal/annuler

**Actions** (à venir) :
- `Ctrl+N` : Nouvelle question
- `Ctrl+S` : Sauvegarder tout
- `Ctrl+P` : Preview formulaire
- `/` : Focus recherche
- `?` : Afficher les raccourcis

---

## 📞 Support

**Besoin d'aide ?**

1. 📖 Lisez la documentation complète
2. 🐛 Vérifiez la section Troubleshooting
3. 💬 Posez votre question sur le forum
4. 📧 Contactez le support : support@yojob.com

**Ressources** :
- [Guidelines.md](/Guidelines.md) - Design system
- [DASHBOARD_CHANGELOG.md](/DASHBOARD_CHANGELOG.md) - Historique des versions
- [SUPABASE_INTEGRATION.md](/SUPABASE_INTEGRATION.md) - Guide Supabase complet

---

## 🎉 Conclusion

Vous êtes maintenant prêt à maîtriser le Dashboard YoJob v2.0 !

**Fonctionnalités clés à retenir** :
- ✅ Thème clair pour moins de fatigue oculaire
- ✅ Drag & Drop pour réorganiser instantanément
- ✅ CRUD complet (Créer, Modifier, Supprimer, Masquer)
- ✅ Statistiques en temps réel
- ✅ Export/Import (à venir)

**Prochaine étape** :
➡️ Testez le drag & drop maintenant !  
➡️ Créez votre première question personnalisée  
➡️ Connectez Supabase pour la production  

---

**Version** : 2.0  
**Dernière mise à jour** : 28 Novembre 2024  
**Auteur** : Équipe YoJob Dev

**Happy Dashboarding! 🚀**
