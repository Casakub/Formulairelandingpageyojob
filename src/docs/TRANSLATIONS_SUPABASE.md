# 🔄 Système de Traductions Supabase

## Vue d'ensemble

Le système de traductions est maintenant **entièrement connecté à Supabase** pour un stockage persistant et sécurisé des traductions.

---

## 🏗️ Architecture

### Structure en 3 couches

```
Frontend (React) ↔ Service API ↔ Supabase Backend (Edge Functions)
```

#### 1. **Service API** (`/services/translationService.ts`)
- Gère toutes les communications avec le backend Supabase
- Fonctions pour CRUD des traductions (questions, UI texts, country mappings)
- Auto-traduction via MCP/API
- Statistiques et exports

#### 2. **Hook React** (`/hooks/useTranslations.ts`)
- État global pour toutes les traductions
- Synchronisation automatique avec Supabase
- Méthodes de mise à jour locale + serveur
- Gestion des états de chargement/sauvegarde/erreur
- Détection des modifications non sauvegardées

#### 3. **Context Provider** (`/contexts/TranslationContext.tsx`)
- Fournit l'accès au hook `useTranslations` dans toute l'app
- Wrapper autour des composants de gestion de traductions

---

## 📦 Stockage dans Supabase

### KV Store (Key-Value)

Toutes les traductions sont stockées dans la table `kv_store_10092a63` de Postgres via le KV Store :

```typescript
// Traductions des questions du formulaire
i18n:question:{questionId} → {
  translations: {
    fr: { text: "Question en français", status: "validated" },
    en: { text: "Question in English", status: "auto-api" },
    de: { text: "Frage auf Deutsch", status: "missing" }
  }
}

// Traductions des textes d'interface
i18n:ui:{textId} → {
  key: "button.submit",
  category: "buttons",
  translations: {
    fr: { text: "Envoyer", status: "validated" },
    en: { text: "Submit", status: "validated" }
  }
}

// Mappings pays → langues
i18n:country:{countryCode} → {
  languages: ["fr", "nl"]  // Belgique → Français + Néerlandais
}
```

### Statuts de traduction

| Status | Description | Utilisation |
|--------|-------------|-------------|
| `missing` | Traduction manquante | Par défaut pour nouvelles langues |
| `auto-mcp` | Générée par MCP/IA | Nécessite validation humaine |
| `auto-api` | Générée par API externe | Nécessite validation humaine |
| `validated` | Validée manuellement | Prête pour production |

---

## 🔌 API Backend

### Routes disponibles

Le backend Supabase Edge Function expose les routes suivantes :

**Base URL** : `https://{projectId}.supabase.co/functions/v1/make-server-10092a63/i18n`

#### Questions

```typescript
GET    /questions              // Récupérer toutes les traductions de questions
GET    /questions/:questionId  // Récupérer une question spécifique
POST   /questions/:questionId  // Sauvegarder une traduction (langCode, text, status)
POST   /questions/bulk         // Sauvegarde en masse (translations[])
```

#### UI Texts

```typescript
GET    /ui-texts           // Récupérer toutes les traductions UI
POST   /ui-texts/:textId   // Sauvegarder une traduction UI
POST   /ui-texts/bulk      // Sauvegarde en masse
```

#### Country-Language Mappings

```typescript
GET    /country-languages                  // Récupérer tous les mappings
POST   /country-languages/:countryCode     // Sauvegarder un mapping
POST   /country-languages/bulk             // Sauvegarde en masse
```

#### Utilitaires

```typescript
GET    /translate/:lang    // Récupérer toutes les traductions pour une langue
POST   /auto-translate     // Auto-traduction via MCP/API
GET    /stats              // Statistiques (total, validé, progression)
```

---

## 🎯 Utilisation dans les composants

### Exemple de base

```typescript
import { useTranslationContext } from '@/contexts/TranslationContext';

function MonComposant() {
  const {
    questionTranslations,
    updateQuestionTranslation,
    saveAll,
    hasUnsavedChanges,
    saving
  } = useTranslationContext();

  const handleEdit = (questionId: string, langCode: string, newText: string) => {
    // Mise à jour locale immédiate
    updateQuestionTranslation(questionId, langCode, newText, 'validated');
    // La sauvegarde sera faite via le bouton "Sauvegarder" global
  };

  return (
    <div>
      {hasUnsavedChanges && <p>Modifications non sauvegardées</p>}
      <button onClick={saveAll} disabled={saving}>
        Sauvegarder tout
      </button>
    </div>
  );
}
```

### Sauvegarde immédiate (pour éditions critiques)

```typescript
const {
  saveQuestionTranslationNow
} = useTranslationContext();

const handleCriticalEdit = async (qId: string, lang: string, text: string) => {
  try {
    await saveQuestionTranslationNow(qId, lang, text, 'validated');
    toast.success('Sauvegardé !');
  } catch (error) {
    toast.error('Erreur de sauvegarde');
  }
};
```

---

## 🎨 Composants UI

### `TranslationSyncBar`

Barre sticky en haut de l'écran qui affiche :
- ✅ État de synchronisation (Supabase)
- ⚠️ Modifications non sauvegardées
- ❌ Erreurs de connexion
- ⏰ Dernière synchronisation
- 💾 Bouton "Sauvegarder tout"
- 🔄 Bouton "Recharger"

**Statuts affichés** :
- `hasUnsavedChanges` → Fond amber, icône AlertCircle, bouton Sauvegarder animé
- `saving` → Fond blue, icône Loader2 animé, "Sauvegarde en cours..."
- `error` → Fond red, icône CloudOff, message d'erreur
- Synchronisé → Fond green, icône Cloud, "Synchronisé avec Supabase"

---

## 🔄 Workflow de traduction

### 1. Chargement initial

```
User ouvre onglet "Traductions"
  ↓
TranslationProvider monte
  ↓
useTranslations() hook s'initialise
  ↓
loadAll() appelé automatiquement
  ↓
GET /questions + /ui-texts + /country-languages depuis Supabase
  ↓
État local mis à jour avec données serveur
  ↓
UI s'affiche avec traductions existantes
```

### 2. Édition de traduction

```
User édite une traduction dans l'interface
  ↓
updateQuestionTranslation(questionId, langCode, newText, 'validated')
  ↓
État local mis à jour immédiatement (UI réactive)
  ↓
hasUnsavedChanges = true
  ↓
TranslationSyncBar affiche badge "Modifications non sauvegardées"
```

### 3. Sauvegarde globale

```
User clique "Sauvegarder tout" dans la barre
  ↓
saveAll() appelé
  ↓
POST /questions/bulk + /ui-texts/bulk + /country-languages/bulk
  ↓
Supabase KV Store mis à jour
  ↓
hasUnsavedChanges = false
  ↓
lastSyncTime = Date actuelle
  ↓
TranslationSyncBar affiche "Synchronisé"
```

### 4. Sauvegarde immédiate (optionnelle)

```
User valide une traduction critique
  ↓
saveQuestionTranslationNow(questionId, langCode, text, status)
  ↓
POST /questions/:questionId
  ↓
Sauvegarde immédiate dans Supabase
  ↓
État local mis à jour avec réponse serveur
```

---

## 🚨 Gestion d'erreurs

### Types d'erreurs gérés

1. **Erreur réseau** → Message "Vérifiez votre connexion internet"
2. **Erreur serveur 500** → Log détaillé + retry suggestion
3. **Timeout** → Bouton "Réessayer"
4. **Données invalides** → Validation frontend avant envoi

### Recovery automatique

- Le hook conserve les modifications locales même en cas d'erreur
- L'utilisateur peut réessayer la sauvegarde
- Les données ne sont jamais perdues (état React persistant)

---

## 📊 Statistiques en temps réel

Le hook fournit des statistiques automatiquement mises à jour :

```typescript
const { stats } = useTranslationContext();

console.log(stats);
// {
//   questions: {
//     total: 250,           // 25 questions × 10 langues
//     validated: 175,       // 70% validées
//     progress: 70          // Pourcentage
//   },
//   ui: {
//     total: 170,           // 17 textes UI × 10 langues
//     validated: 150,
//     progress: 88
//   },
//   countries: 27           // 27 pays configurés
// }
```

---

## 🔐 Sécurité

### Headers d'authentification

```typescript
headers: {
  'Authorization': `Bearer ${publicAnonKey}`,
  'Content-Type': 'application/json'
}
```

- Utilise la clé publique Supabase (lecture/écriture limitée)
- Les Edge Functions valident l'origine des requêtes
- Pas de CORS issues (headers configurés côté serveur)

### Validation des données

- Frontend : Vérification des champs requis avant envoi
- Backend : Validation TypeScript + sanitation des entrées
- KV Store : Schéma strict pour éviter injections

---

## 🎯 Prochaines étapes (Sprint 2)

### Auto-traduction MCP

```typescript
// Déjà préparé dans l'API
POST /auto-translate
Body: {
  sourceText: "Question en français",
  sourceLang: "fr",
  targetLang: "en",
  method: "mcp"  // ou "api"
}

Response: {
  translatedText: "Question in English",
  status: "auto-mcp"
}
```

### Intégration DeepL

```typescript
// Configuration API DeepL
const deeplApiKey = Deno.env.get('DEEPL_API_KEY');

// Appel dans /auto-translate endpoint
const response = await fetch('https://api-free.deepl.com/v2/translate', {
  method: 'POST',
  headers: {
    'Authorization': `DeepL-Auth-Key ${deeplApiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: [sourceText],
    source_lang: sourceLang.toUpperCase(),
    target_lang: targetLang.toUpperCase()
  })
});
```

### Analyse IA avec Claude

```typescript
// POST /ai-analysis avec contexte traductions
const analysis = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  messages: [{
    role: 'user',
    content: `Analyse les traductions suivantes et suggère des améliorations : ${JSON.stringify(translations)}`
  }]
});
```

---

## 📝 Logs & Debugging

### Console logs activés

```
✅ Translations loaded from Supabase: { questions: 15, uiTexts: 17, countries: 27 }
✅ All translations saved to Supabase
✅ Question translation saved: q1 (en)
❌ Error loading translations: Network timeout
```

### DevTools inspection

```javascript
// Dans la console du navigateur
window.translationContext = useTranslationContext();

// Inspecter l'état
console.log(translationContext.questionTranslations);
console.log(translationContext.hasUnsavedChanges);
console.log(translationContext.lastSyncTime);
```

---

## ✅ Checklist de production

- [x] Service API créé et testé
- [x] Hook useTranslations implémenté
- [x] Context Provider configuré
- [x] TranslationSyncBar UI intégrée
- [x] QuestionTranslation connecté
- [x] Gestion d'erreurs robuste
- [x] Logs détaillés pour debugging
- [ ] Tests unitaires (TODO Sprint 2)
- [ ] Auto-traduction MCP/DeepL (TODO Sprint 2)
- [ ] Rate limiting API (TODO Sprint 2)
- [ ] Cache Redis optionnel (TODO Sprint 3)

---

**Version** : 1.0.0  
**Date** : Novembre 2024  
**Maintenu par** : Équipe YOJOB Dev
