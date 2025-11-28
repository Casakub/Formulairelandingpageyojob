# 📊 Dashboard YoJob - Guide d'utilisation

## 🎯 Vue d'ensemble

Le dashboard YoJob permet de gérer l'intégralité du formulaire d'étude de marché avec 26 questions réparties en 6 sections. Toutes les questions sont maintenant centralisées et modifiables depuis le dashboard.

---

## 🔗 Questions connectées

### Architecture

```
/config/questions.ts          → Définition des 26 questions
/context/QuestionsContext.tsx → Gestion d'état global
/components/dashboard/        → Interface d'administration
/components/survey/           → Formulaire utilisateur
```

### 26 Questions configurées

#### **Section 1 : Profil Agence** (4 questions)
- `q1_nom` - Nom de l'agence (text)
- `q2_annee` - Année de création (number)
- `q3_taille` - Taille de l'agence (radio, 4 options)
- `q4_secteurs` - Secteurs d'activité (multi-select, 8 options)

#### **Section 2 : Détachement** (8 questions)
- `q5_pays` - Pays d'origine (text)
- `q6_volume` - Volume annuel (radio, 5 options)
- `q7_origine` - Pays d'origine travailleurs (text)
- `q8_destinations` - Pays de destination (textarea)
- `q9_defi` - Principal défi (radio, 5 options)
- `q9_autre` - Précision défi (text, conditionnel)
- `q10_gestion` - Mode de gestion (radio, 5 options)
- `q11_incidents` - Incidents conformité (radio, 4 options)

#### **Section 3 : Besoins** (7 questions)
- `q12_budget` - Budget actuel (radio, 5 options)
- `q13_manque_gagner` - Manque à gagner (radio, 4 options)
- `q14_risques` - Risques préoccupants (multi-select, 6 options)
- `q15_probleme` - Plus gros problème (textarea)
- `q16_erp` - ERP/Logiciel (radio, 6 options)
- `q16_autre` - Précision ERP (text, conditionnel)
- `q17_migration` - Prêt à migrer (radio, 4 options)

#### **Section 4 : Intérêt YoJob** (6 questions)
- `q18_score` - Score d'intérêt 1-10 (score)
- `q19_features` - Fonctionnalités intéressantes (multi-select, 8 options)
- `q20_prix` - Modèle de tarification (radio, 4 options)
- `q21_budget_mensuel` - Budget mensuel (radio, 5 options)
- `q22_mvp` - Test MVP (radio, 4 options)
- `q23_role` - Rôle dans décision (radio, 4 options)

#### **Section 5 : Vision Future** (2 questions)
- `q24_evolution` - Vision marché 3 ans (textarea)
- `q25_besoins` - Suggestions (textarea, optionnel)

#### **Section 6 : Contact** (1 question)
- `email` - Email professionnel (email)

---

## 🛠️ Fonctionnalités du Dashboard

### 1. Vue d'ensemble (onglet Dashboard)
- **KPIs en temps réel** : Réponses, taux de complétion, scores moyens
- **Top 5 Features** : Fonctionnalités les plus demandées
- **Répartition géographique** : Top 5 pays
- **Distribution des scores** : Ambassadeurs (9-10), Intéressés (7-8), etc.
- **Quick stats** : Réponses du jour, temps moyen, taux de validation

### 2. Gestionnaire de Questions (onglet Questions)

#### Statistiques affichées
- ✅ **Questions totales** : 26 questions
- ✅ **Questions visibles** : Combien sont actives
- ✅ **Questions masquées** : Temporairement désactivées
- ✅ **Questions obligatoires** : Champs requis
- ✅ **Répartition par section** : Nombre de questions par section

#### Actions disponibles

**Ajouter une question** :
1. Cliquer sur "Nouvelle Question"
2. Remplir les champs :
   - Code (ex: `q27_nouvelle`)
   - Libellé
   - Type (text, textarea, number, email, radio, multi-select, score)
   - Section (1-6)
   - Placeholder
   - Options (pour radio/multi-select en JSON)
   - Obligatoire (checkbox)
   - Visible (checkbox)
3. Enregistrer

**Modifier une question** :
1. Cliquer sur l'icône "Edit" ✏️
2. Modifier les champs
3. Enregistrer

**Supprimer une question** :
1. Cliquer sur l'icône "Trash" 🗑️
2. Confirmer la suppression

**Masquer/Afficher une question** :
1. Cliquer sur l'icône "Eye" 👁️
2. La question sera masquée dans le formulaire mais conservée dans la base

**Dupliquer une question** :
1. Cliquer sur l'icône "Copy" 📋
2. Une copie est créée avec le suffixe "_copy"

**Filtrer par section** :
- Utiliser le sélecteur pour voir uniquement les questions d'une section

### 3. Gestionnaire d'Intégrations (onglet Intégrations)

#### Statistiques
- **Connectées** : Intégrations actives
- **Inactives** : En attente de configuration
- **Erreurs** : Problèmes de connexion
- **Total** : Nombre d'intégrations

#### Templates disponibles
1. **Google Sheets** (API) - Envoyer les réponses
2. **Zapier** (Webhook) - Automatisations
3. **Make/Integromat** (Webhook) - Scénarios
4. **Notion** (MCP) - Export vers Notion
5. **Airtable** (API) - Synchronisation
6. **Slack** (MCP) - Notifications
7. **Custom Webhook** - Personnalisé

#### Ajouter une intégration
1. Cliquer sur "Nouvelle Intégration"
2. Choisir un template
3. Configurer :
   - **API** : URL + API Key + Méthode HTTP
   - **MCP** : Nom du serveur MCP
   - **Webhook** : URL + Méthode HTTP
4. Tester la connexion
5. Enregistrer

#### Bouton "Découvrir MCP"
- Détecte automatiquement les serveurs MCP connectés
- Propose de les ajouter comme intégrations

---

## 🔄 Synchronisation Formulaire ↔ Dashboard

### Comment ça fonctionne

1. **QuestionsContext** : État partagé entre le dashboard et le formulaire
2. **Modifications en temps réel** : Toute modification dans le dashboard affecte immédiatement le formulaire
3. **Persistance** : Les modifications sont conservées pendant la session

### Utilisation dans le formulaire

#### Option 1 : Utiliser le DynamicQuestionRenderer (Recommandé)

```tsx
import { DynamicQuestionRenderer } from './components/survey/DynamicQuestionRenderer';

function MySection({ formData, updateFormData }) {
  return (
    <DynamicQuestionRenderer
      sectionNumber={1}
      formData={formData}
      updateFormData={updateFormData}
    />
  );
}
```

#### Option 2 : Utiliser le hook directement

```tsx
import { useQuestions } from './context/QuestionsContext';

function MySection() {
  const { getVisibleQuestionsBySection } = useQuestions();
  const questions = getVisibleQuestionsBySection(1);

  return (
    <div>
      {questions.map(q => (
        <div key={q.id}>{q.label}</div>
      ))}
    </div>
  );
}
```

---

## 📋 Types de questions supportés

### 1. Text (`type: 'text'`)
Champ texte court
```json
{
  "type": "text",
  "placeholder": "Entrez votre réponse"
}
```

### 2. Number (`type: 'number'`)
Champ numérique
```json
{
  "type": "number",
  "placeholder": "Ex: 2010"
}
```

### 3. Email (`type: 'email'`)
Champ email avec validation
```json
{
  "type": "email",
  "placeholder": "votre@email.com"
}
```

### 4. Textarea (`type: 'textarea'`)
Champ texte long
```json
{
  "type": "textarea",
  "placeholder": "Décrivez en détail..."
}
```

### 5. Radio (`type: 'radio'`)
Choix unique
```json
{
  "type": "radio",
  "options": [
    { "value": "opt1", "label": "Option 1", "icon": "🔥" },
    { "value": "opt2", "label": "Option 2", "icon": "⭐" }
  ]
}
```

### 6. Multi-select (`type: 'multi-select'`)
Choix multiples
```json
{
  "type": "multi-select",
  "options": [
    { "value": "opt1", "label": "Option 1", "icon": "🔥" },
    { "value": "opt2", "label": "Option 2", "icon": "⭐" }
  ]
}
```

### 7. Score (`type: 'score'`)
Sélecteur 1-10
```json
{
  "type": "score"
}
```

---

## 🎨 Questions conditionnelles

Les questions peuvent être conditionnelles (affichées uniquement si une condition est remplie) :

```json
{
  "id": "q9_autre",
  "code": "q9_autre",
  "type": "text",
  "label": "Précisez",
  "conditional": {
    "dependsOn": "q9_defi",
    "showWhen": "autre"
  }
}
```

Dans cet exemple, `q9_autre` n'apparaît que si `q9_defi === "autre"`.

---

## 🚀 Workflow recommandé

### 1. Phase de test
1. Accéder au dashboard via le bouton "Dashboard" dans le header
2. Vérifier les 26 questions dans l'onglet "Questions"
3. Tester l'ajout/modification/suppression
4. Vérifier que les changements apparaissent dans le formulaire

### 2. Phase de production
1. Configurer les intégrations (Google Sheets, etc.)
2. Tester les connexions
3. Masquer les questions non pertinentes
4. Surveiller les KPIs dans la vue d'ensemble

### 3. Phase d'analyse
1. Exporter les données via les intégrations
2. Analyser les réponses par section
3. Identifier les features les plus demandées
4. Ajuster le formulaire selon les retours

---

## 💡 Conseils d'utilisation

### Pour ajouter une nouvelle question
- ✅ Choisir un code unique (ex: `q27_nouvelle_question`)
- ✅ Rendre optionnelle au début (`required: false`)
- ✅ Tester avec quelques utilisateurs
- ✅ Rendre obligatoire si pertinent

### Pour les options radio/multi-select
- ✅ Utiliser des icônes emoji pour l'UX
- ✅ Limiter à 8 options maximum
- ✅ Ajouter une option "Autre" si besoin

### Pour les intégrations
- ✅ Toujours tester la connexion
- ✅ Vérifier les logs d'erreur
- ✅ Avoir un backup (plusieurs intégrations)

---

## 🐛 Dépannage

### Les modifications n'apparaissent pas dans le formulaire
- Vérifier que le `QuestionsProvider` enveloppe bien l'application
- Recharger la page
- Vérifier la console pour les erreurs

### Une question ne s'affiche pas
- Vérifier `visible: true` dans le dashboard
- Vérifier les conditions (`conditional`)
- Vérifier la section correcte

### L'intégration ne fonctionne pas
- Cliquer sur "Tester"
- Vérifier l'URL et l'API Key
- Vérifier les permissions CORS

---

## 📞 Support

Pour toute question ou problème :
- 📧 Email : dev@yojob.com
- 💬 Slack : #yojob-dev
- 📚 Documentation : /docs

---

**Version** : 1.0
**Dernière mise à jour** : 28 Novembre 2024
