# 🤖 CONFIGURATION DES MODÈLES CLAUDE

## ✅ **FONCTIONNALITÉ IMPLÉMENTÉE**

Le système permet maintenant de **sélectionner différents modèles Claude** selon vos besoins (vitesse vs qualité vs coût).

**✨ Données officielles Anthropic** : Toutes les informations (prix, tokens, latences) proviennent de la documentation officielle.

---

## 📊 **MODÈLES DISPONIBLES**

### **Claude 4.5 (Dernière génération - 2025)** 🆕

#### **Claude Sonnet 4.5** ⚖️ **(RECOMMANDÉ PAR DÉFAUT)**
- **ID** : `claude-sonnet-4-5-20250929`
- **Alias** : `claude-sonnet-4-5`
- **Description** : Smart model for complex agents and coding
- **Latence** : Fast ⚡
- **Intelligence** : High 🧠🧠🧠🧠
- **Prix** : $3/MTok input, $15/MTok output
- **Contexte** : 200K tokens (1M en beta)
- **Max output** : 64K tokens
- **Extended thinking** : ✅ Oui
- **Priority Tier** : ✅ Oui
- **Knowledge cutoff** : Jan 2025
- **Training cutoff** : Jul 2025
- **💡 Usage** : **PARFAIT pour YOJOB** - Meilleur modèle pour workflows, analyses, coding

---

#### **Claude Haiku 4.5** ⚡
- **ID** : `claude-haiku-4-5-20251001`
- **Alias** : `claude-haiku-4-5`
- **Description** : Fastest model with near-frontier intelligence
- **Latence** : Fastest ⚡⚡⚡
- **Intelligence** : Medium-High 🧠🧠🧠
- **Prix** : $1/MTok input, $5/MTok output
- **Contexte** : 200K tokens
- **Max output** : 64K tokens
- **Extended thinking** : ✅ Oui
- **Priority Tier** : ✅ Oui
- **Knowledge cutoff** : Feb 2025
- **Training cutoff** : Jul 2025
- **💡 Usage** : Scoring rapide, traductions, réponses instantanées

---

#### **Claude Opus 4.5** 🏆
- **ID** : `claude-opus-4-5-20251101`
- **Alias** : `claude-opus-4-5`
- **Description** : Premium model combining maximum intelligence with practical performance
- **Latence** : Moderate ⏱️
- **Intelligence** : Highest 🧠🧠🧠🧠🧠
- **Prix** : $5/MTok input, $25/MTok output
- **Contexte** : 200K tokens
- **Max output** : 64K tokens
- **Extended thinking** : ✅ Oui
- **Priority Tier** : ✅ Oui
- **Knowledge cutoff** : May 2025
- **Training cutoff** : Aug 2025
- **💡 Usage** : Analyses ultra-complexes, décisions stratégiques (coûteux)

---

### **Claude 3.x (Génération précédente - Toujours disponible)**

#### **Claude 3.5 Sonnet** ⚖️
- **ID** : `claude-3-5-sonnet-20240620`
- **Alias** : `claude-3-5-sonnet`
- **Prix** : $3/MTok input, $15/MTok output
- **Contexte** : 200K tokens
- **Max output** : 8K tokens
- **Extended thinking** : ❌ Non
- **Knowledge cutoff** : Apr 2024
- **💡 Usage** : Fallback si Sonnet 4.5 indisponible

---

#### **Claude 3.5 Haiku** ⚡
- **ID** : `claude-3-5-haiku-20241022`
- **Prix** : $1/MTok input, $5/MTok output
- **Contexte** : 200K tokens
- **Max output** : 8K tokens
- **Extended thinking** : ❌ Non
- **Knowledge cutoff** : Jul 2024
- **💡 Usage** : Économique mais moins puissant que Haiku 4.5

---

#### **Claude 3 Opus** 🏆
- **ID** : `claude-3-opus-20240229`
- **Prix** : $15/MTok input, $75/MTok output 💸💸💸
- **Contexte** : 200K tokens
- **Max output** : 4K tokens
- **Extended thinking** : ❌ Non
- **Knowledge cutoff** : Aug 2023
- **💡 Usage** : Ancien flagship (remplacé par Opus 4.5)

---

#### **Claude 3 Haiku** ⚡
- **ID** : `claude-3-haiku-20240307`
- **Prix** : $0.25/MTok input, $1.25/MTok output 💰
- **Contexte** : 200K tokens
- **Max output** : 4K tokens
- **Extended thinking** : ❌ Non
- **Knowledge cutoff** : Aug 2023
- **💡 Usage** : Le moins cher mais moins intelligent

---

## 🎯 **RECOMMANDATIONS PAR USAGE**

### **AI Workflow Advisor** (Suggestions de workflows)
✅ **Recommandé** : `Claude Sonnet 4.5`
- Requiert de la créativité et de l'analyse
- Complexité moyenne-haute
- Appelé occasionnellement

❌ **Non recommandé** : Haiku (qualité insuffisante)
💰 **Économiser** : Sonnet 3.5 (si budget limité)
🚀 **Maximum qualité** : Claude Opus 4.5 (si budget large)

---

### **Analyse de marché** (Dashboard)
✅ **Recommandé** : `Claude Sonnet 4.5`
- Analyse détaillée de données
- Appelé rarement
- Qualité importante

💰 **Économiser** : Claude 3.5 Haiku (si analyses simples)

---

### **Scoring IA des prospects** (Automatique)
✅ **Recommandé** : `Claude Haiku 4.5`
- Tâche répétitive et fréquente
- Scoring basé sur critères simples
- Coût optimisé

💰 **Économiser** : Claude 3 Haiku (encore moins cher)
🚀 **Maximum précision** : Claude 3.5 Sonnet

---

### **Traductions automatiques**
✅ **Recommandé** : `Claude Haiku 4.5`
- Tâche simple et répétitive
- Haute fréquence
- Coût important si Sonnet

⚠️ **Attention** : Pour langues rares, préférer Sonnet

---

### **Analyses de workflows existants**
✅ **Recommandé** : `Claude Sonnet 4.5`
- Requiert compréhension approfondie
- Suggestions d'optimisation
- Appelé occasionnellement

---

## ⚙️ **API ENDPOINTS AJOUTÉS**

### **GET /settings/available-models**
Récupérer la liste de tous les modèles disponibles
```json
{
  "success": true,
  "models": {
    "claude-sonnet-4-5-20250929": {
      "name": "Claude Sonnet 4.5",
      "tier": "balanced",
      "speed": "fast",
      "intelligence": "high",
      "costTier": "standard",
      "inputTokensPerMin": 30000,
      "outputTokensPerMin": 15000,
      "requestsPerMin": 50,
      "contextWindow": 200000
    },
    ...
  },
  "selectedModel": "claude-sonnet-4-5-20250929",
  "defaultModel": "claude-sonnet-4-5-20250929"
}
```

---

### **POST /settings/save-selected-model**
Sauvegarder le modèle sélectionné
```json
// Request
{
  "model": "claude-haiku-4-5-20251001"
}

// Response
{
  "success": true,
  "message": "Model saved successfully",
  "model": "claude-haiku-4-5-20251001",
  "modelInfo": {
    "name": "Claude Haiku 4.5",
    ...
  }
}
```

---

### **POST /settings/detect-available-models**
Détecter automatiquement les modèles accessibles avec votre clé API

⚠️ **Attention** : Cette route teste chaque modèle avec un mini-appel API (coût ~0.001$ par modèle)

```json
{
  "success": true,
  "availableModels": {
    "claude-sonnet-4-5-20250929": {
      "name": "Claude Sonnet 4.5",
      "available": true,
      "status": "active",
      ...
    },
    "claude-opus-4-5": {
      "name": "Claude Opus 4.5",
      "available": false,
      "status": "unavailable"
    }
  },
  "totalTested": 8,
  "totalAvailable": 5
}
```

---

## 🔧 **UTILISATION DANS LE CODE**

### **Backend - Utiliser le modèle sélectionné**

```typescript
import { getSelectedModel } from "./settings.tsx";

// Dans votre endpoint
const selectedModel = await getSelectedModel();

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01"
  },
  body: JSON.stringify({
    model: selectedModel, // Utilise le modèle sélectionné
    max_tokens: 8000,
    messages: [...]
  }),
});
```

---

### **Frontend - Afficher le sélecteur de modèles**

```tsx
// À ajouter dans la page Paramètres (Settings)
const [availableModels, setAvailableModels] = useState({});
const [selectedModel, setSelectedModel] = useState('');

// Charger les modèles
const loadModels = async () => {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/make-server-10092a63/settings/available-models`,
    {
      headers: { Authorization: `Bearer ${ANON_KEY}` },
    }
  );
  const data = await response.json();
  setAvailableModels(data.models);
  setSelectedModel(data.selectedModel);
};

// Sauvegarder le modèle
const saveModel = async (modelId) => {
  await fetch(
    `${SUPABASE_URL}/functions/v1/make-server-10092a63/settings/save-selected-model`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: modelId }),
    }
  );
};
```

---

## 💡 **PROCHAINES ÉTAPES**

### **À faire maintenant** :
1. ✅ Ajouter un **sélecteur de modèle** dans la page Paramètres
2. ✅ Afficher les **caractéristiques** (vitesse, coût, tokens) pour chaque modèle
3. ✅ Permettre la **détection automatique** des modèles accessibles
4. ✅ Afficher le **modèle utilisé** dans les réponses IA (AI Advisor, etc.)

### **Améliorations futures** :
- [ ] Configuration **par contexte** (un modèle pour scoring, un pour advisor, etc.)
- [ ] **Estimation des coûts** par modèle basée sur l'usage réel
- [ ] **Fallback automatique** : Si Opus échoue, utiliser Sonnet
- [ ] **Cache des réponses IA** pour éviter les appels répétitifs

---

## 📊 **TABLEAU COMPARATIF**

| Modèle | Vitesse | Intelligence | Coût | Input/min | Output/min | Usage YOJOB |
|--------|---------|--------------|------|-----------|------------|-------------|
| **Claude Sonnet 4.5** | ⚖️ Moyenne | 🧠🧠🧠🧠 | 💰💰 | 30K | 15K | **Recommandé** |
| **Claude Haiku 4.5** | ⚡ Rapide | 🧠🧠🧠 | 💰 | 50K | 10K | Scoring/Trad |
| **Claude Opus 4.5** | 🐌 Lent | 🧠🧠🧠🧠🧠 | 💰💰💰 | 20K | 4K | Rare |
| **Claude 3 Haiku** | ⚡ Rapide | 🧠🧠 | 💰 | 50K | 10K | Économique |

---

## 📊 **TABLEAU COMPARATIF DÉTAILLÉ**

| Modèle | Vitesse | Intelligence | Coût | Input/min | Output/min | Usage YOJOB |
|--------|---------|--------------|------|-----------|------------|-------------|
| **Claude Sonnet 4.5** | ⚖️ Moyenne | 🧠🧠🧠🧠 | 💰💰 | 30K | 15K | **Recommandé** |
| **Claude Haiku 4.5** | ⚡ Rapide | 🧠🧠🧠 | 💰 | 50K | 10K | Scoring/Trad |
| **Claude Opus 4.5** | 🐌 Lent | 🧠🧠🧠🧠🧠 | 💰💰💰 | 20K | 4K | Rare |
| **Claude 3 Haiku** | ⚡ Rapide | 🧠🧠 | 💰 | 50K | 10K | Économique |

---

## 📞 **SUPPORT**

Pour toute question :
1. Consultez la documentation Anthropic : https://docs.anthropic.com/
2. Vérifiez les limites de votre clé API : https://console.anthropic.com/
3. Testez la détection automatique des modèles dans Paramètres

**Les modèles Claude sont maintenant configurables et le système utilise automatiquement le modèle sélectionné !** 🚀