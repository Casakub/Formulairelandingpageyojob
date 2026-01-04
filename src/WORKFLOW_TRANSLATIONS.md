# 🌍 Système de Traduction Multilingue des Workflows

## Vue d'ensemble

Le système de traduction automatique des workflows permet de créer des workflows d'automatisation marketing **entièrement multilingues** pour les 22 langues supportées par YOJOB.

---

## 🎯 Fonctionnalités

### ✅ Ce qui est traduit

1. **Nom du workflow** (ex: "Relance après devis" → "Follow-up after quote")
2. **Description du workflow**
3. **Nom de chaque étape**
4. **Description de chaque étape**

### 🌍 Langues supportées (22 langues)

Le français est la **langue source**. Les 21 autres langues sont :

| Code | Langue | Nom natif |
|------|--------|-----------|
| `en` | English | English |
| `de` | German | Deutsch |
| `es` | Spanish | Español |
| `it` | Italian | Italiano |
| `pt` | Portuguese | Português |
| `nl` | Dutch | Nederlands |
| `pl` | Polish | Polski |
| `ro` | Romanian | Română |
| `bg` | Bulgarian | Български |
| `hu` | Hungarian | Magyar |
| `cz` | Czech | Čeština |
| `sk` | Slovak | Slovenčina |
| `hr` | Croatian | Hrvatski |
| `sl` | Slovenian | Slovenščina |
| `lt` | Lithuanian | Lietuvių |
| `lv` | Latvian | Latviešu |
| `ee` | Estonian | Eesti |
| `el` | Greek | Ελληνικά |
| `sv` | Swedish | Svenska |
| `da` | Danish | Dansk |
| `fi` | Finnish | Suomi |

---

## 🎨 Interface Utilisateur

### WorkflowBuilder - Étape 1

Lors de la création d'un workflow, l'utilisateur voit un bouton **"Gérer les traductions multilingues"** avec :
- 🎯 Badge indiquant le nombre de langues complétées (ex: "5 / 21")
- 🎨 Design glassmorphism avec bordure violette au hover
- 📝 Texte explicatif en dessous

### WorkflowTranslationEditor

Modal plein écran avec :
- 🏷️ **Header gradient violet/indigo** avec logo Languages
- 🇫🇷 **Bloc source français** en lecture seule (glassmorphism)
- 🤖 **Bouton "Traduire tout (21 langues)"** - Traduction IA en 1 clic
- 📑 **Tabs par langue** avec drapeaux et badges de complétion (0-100%)
- ✍️ **Formulaires d'édition** par langue avec inputs pour chaque champ
- ⚡ **Bouton "Traduire automatiquement"** par langue individuelle
- 💾 **Footer** avec compteur de langues complétées et bouton sauvegarder

---

## 🔧 Architecture Technique

### Frontend

#### Composant principal
```typescript
// /components/dashboard/WorkflowTranslationEditor.tsx

interface WorkflowTranslations {
  [languageCode: string]: {
    workflow: {
      name: string;
      description: string;
    };
    steps: Array<{
      name: string;
      description: string;
    }>;
  };
}
```

#### Intégration dans WorkflowBuilder
```typescript
// /components/dashboard/WorkflowBuilder.tsx

const [workflowTranslations, setWorkflowTranslations] = useState<any>({});
const [translationsEditorOpen, setTranslationsEditorOpen] = useState(false);
```

### Backend

#### Routes API

**1. Traduction vers une langue**
```
POST /make-server-10092a63/automations/auto-translate-workflow

Body:
{
  "sourceLang": "fr",
  "targetLang": "en",
  "workflow": {
    "name": "Nurturing Waitlist",
    "description": "Workflow automatique pour engager les prospects en liste d'attente"
  },
  "steps": [
    {
      "name": "Envoyer email de bienvenue",
      "description": "Premier contact avec le prospect"
    }
  ]
}

Response:
{
  "success": true,
  "translation": {
    "workflow": {
      "name": "Waitlist Nurturing",
      "description": "Automated workflow to engage waitlist prospects"
    },
    "steps": [
      {
        "name": "Send welcome email",
        "description": "First contact with the prospect"
      }
    ]
  },
  "targetLang": "en",
  "targetLangName": "English"
}
```

**2. Traduction vers toutes les langues**
```
POST /make-server-10092a63/automations/auto-translate-workflow-all

Body:
{
  "workflow": {
    "name": "Nurturing Waitlist",
    "description": "Workflow automatique pour engager les prospects en liste d'attente"
  },
  "steps": [...]
}

Response:
{
  "success": true,
  "translations": {
    "en": { workflow: {...}, steps: [...] },
    "de": { workflow: {...}, steps: [...] },
    // ... 19 autres langues
  },
  "stats": {
    "total": 21,
    "success": 21,
    "failed": 0
  }
}
```

#### Implémentation Backend
```typescript
// /supabase/functions/server/automations.tsx

import { getApiKey, getSelectedModel } from "./settings.tsx";

// Utilise Claude AI pour traductions contextuelles
// - Temperature: 0.3 (déterministe)
// - Max tokens: 4000
// - Modèle: Configuré dans Paramètres → Modèles IA
```

---

## 🚀 Utilisation

### Scénario 1 : Traduction manuelle

1. Créer un workflow en français
2. Cliquer sur "Gérer les traductions multilingues"
3. Sélectionner une langue dans les tabs
4. Remplir manuellement les champs
5. Sauvegarder

### Scénario 2 : Traduction automatique par langue

1. Créer un workflow en français
2. Ouvrir l'éditeur de traductions
3. Sélectionner une langue (ex: 🇬🇧 English)
4. Cliquer sur "Traduire automatiquement"
5. ⏳ L'IA Claude génère la traduction (3-5 secondes)
6. Vérifier et ajuster si nécessaire
7. Sauvegarder

### Scénario 3 : Traduction automatique globale ⭐

1. Créer un workflow en français
2. Ouvrir l'éditeur de traductions
3. Cliquer sur **"Traduire tout (21 langues)"**
4. ⏳ L'IA traduit les 21 langues en parallèle (~30 secondes)
5. Toast de confirmation avec stats
6. Vérifier les traductions dans les tabs
7. Sauvegarder

---

## 💡 Bonnes Pratiques

### ✅ DO

- **Écrire le workflow en français d'abord** (langue source de qualité)
- **Utiliser la traduction IA comme base** puis affiner manuellement
- **Vérifier les termes métier** spécifiques au recrutement
- **Tester les workflows traduits** avec des utilisateurs natifs
- **Sauvegarder régulièrement** pendant l'édition

### ❌ DON'T

- Ne pas créer de traductions littérales sans contexte
- Ne pas oublier de traduire les templates d'emails associés
- Ne pas mélanger plusieurs langues dans un même workflow
- Ne pas traduire les noms de variables techniques ({{prospect_name}})

---

## 🔮 Cas d'Usage Métier

### 1. **Workflow Nurturing Multilingue**
```
FR: "Nurturing Liste d'Attente"
EN: "Waitlist Nurturing"
DE: "Wartelisten-Pflege"
ES: "Cultivo de Lista de Espera"
```

### 2. **Relance Devis International**
```
FR: "Relance après devis"
EN: "Quote follow-up"
PL: "Kontynuacja po wycenie"
RO: "Urmărire după ofertă"
```

### 3. **Onboarding Client Européen**
```
FR: "Accueil nouveau client"
IT: "Benvenuto nuovo cliente"
NL: "Welkom nieuwe klant"
SV: "Välkommen ny kund"
```

---

## 🧪 Tests

### Test manuel frontend
1. Ouvrir `/automations`
2. Cliquer "Nouveau workflow"
3. Remplir nom + description en français
4. Cliquer "Gérer les traductions"
5. Tester traduction automatique pour 1 langue
6. Tester traduction globale (21 langues)
7. Vérifier les badges de progression
8. Sauvegarder et vérifier persistence

### Test API backend
```bash
# Test traduction vers anglais
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-10092a63/automations/auto-translate-workflow \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sourceLang": "fr",
    "targetLang": "en",
    "workflow": {
      "name": "Test Workflow",
      "description": "Description de test"
    },
    "steps": []
  }'

# Test traduction globale
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-10092a63/automations/auto-translate-workflow-all \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "workflow": {
      "name": "Test Workflow",
      "description": "Description de test"
    },
    "steps": []
  }'
```

---

## 📊 Performance

### Temps de traduction estimés

| Action | Temps | Coût API Claude |
|--------|-------|-----------------|
| 1 langue | ~3-5s | ~0.01 crédits |
| 21 langues (parallèle) | ~30-45s | ~0.20 crédits |

### Optimisations

- ✅ **Parallélisation** : Les 21 traductions se font en même temps
- ✅ **Caching** : Les traductions sont sauvegardées dans le state
- ✅ **Fallback** : En cas d'échec, garde le texte français par défaut
- ✅ **Error handling** : Logs détaillés côté serveur

---

## 🐛 Dépannage

### Erreur "Clé API Anthropic non configurée"
**Solution** : Aller dans Paramètres → onglet "Modèles IA" → Ajouter la clé API

### Traduction incohérente
**Solution** : Réessayer avec température plus basse (0.2) ou éditer manuellement

### Timeout sur traduction globale
**Solution** : Relancer individuellement les langues qui ont échoué

### Badge de complétion bloqué à 0%
**Solution** : Vérifier que tous les champs sont remplis (nom + description)

---

## 🎯 Prochaines Évolutions

### Phase 2 (à venir)
- [ ] Traduction des templates d'emails
- [ ] Traduction des conditions de workflow
- [ ] Export/Import des traductions (JSON)
- [ ] Historique des versions de traductions
- [ ] Validation par reviewers natifs
- [ ] Détection automatique de la langue du prospect
- [ ] A/B testing multilingue

### Phase 3 (futur)
- [ ] Traduction en temps réel pendant la frappe
- [ ] Suggestions de terminologie métier
- [ ] Glossaire centralisé multilingue
- [ ] API publique de traduction
- [ ] Webhooks sur traduction complète

---

## 📚 Ressources

- **API Anthropic** : https://docs.anthropic.com/claude/reference/messages_post
- **Langues européennes** : https://europa.eu/european-union/about-eu/languages_en
- **i18n YOJOB** : `/src/i18n/index.ts`

---

**Version** : 1.0.0  
**Date** : Janvier 2025  
**Auteur** : Équipe YOJOB Dev  
**Status** : ✅ Production Ready
