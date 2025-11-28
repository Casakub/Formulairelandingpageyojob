# ⚙️ Guide du Panneau Paramètres - Configuration Claude

## 🎯 Vue d'ensemble

Le **Panneau Paramètres** est maintenant intégré directement dans le Dashboard Admin pour vous permettre de configurer facilement la clé API Claude/Anthropic sans avoir à gérer manuellement des variables d'environnement.

---

## ✨ Fonctionnalités

### 1. **Gestion de la Clé API** 🔑

**Ajout/Mise à jour :**
- Interface claire pour saisir votre clé API
- Validation automatique du format (doit commencer par `sk-ant-api03-`)
- Stockage sécurisé dans Supabase KV Store
- Confirmation immédiate de la sauvegarde

**Visualisation :**
- Aperçu masqué de la clé actuelle (`sk-ant-api03-••••••••`)
- Badge de statut (Configuré ✅ / Non configuré ⚠️)
- Indication visuelle claire de l'état

**Suppression :**
- Suppression en un clic avec confirmation
- Nettoyage complet de la base de données

### 2. **Test de Connexion** ✅

**Fonctionnalité de test intégrée :**
- Bouton "Tester" pour vérifier la clé API
- Appel réel à l'API Claude (coût : ~0.0001€)
- Affichage du modèle et usage de tokens
- Messages d'erreur clairs si problème

**Résultat du test :**
```
✅ Connexion Claude réussie !
Modèle: claude-3-5-sonnet-20241022
```

### 3. **Informations Tarifaires** 💰

**Tarification transparente :**
- Prix par million de tokens (Input/Output)
- Coût estimé par analyse (~0.02€)
- Exemples de budgets (10€ = ~500 analyses)
- Note sur les $5 offerts à l'inscription

### 4. **Guide Intégré** 📖

**Instructions pas à pas :**
- 6 étapes numérotées visuellement
- Lien direct vers console.anthropic.com
- Format de clé attendu clairement indiqué
- Aucune documentation externe nécessaire

---

## 🚀 Comment Utiliser

### Étape 1 : Accéder aux Paramètres

1. Connectez-vous au **Dashboard Admin**
2. Cliquez sur l'onglet **"Paramètres"** (icône Settings ⚙️)
3. Vous arrivez sur le panneau de configuration Claude

### Étape 2 : Obtenir une Clé API

**Suivez les étapes affichées dans l'interface :**

1. Allez sur [console.anthropic.com](https://console.anthropic.com/)
2. Créez un compte ou connectez-vous
3. Cliquez sur **API Keys** dans la navigation
4. Cliquez sur **Create Key**
5. Copiez la clé (format : `sk-ant-api03-...`)
6. Revenez sur le Dashboard

**💳 Important :**
- Une carte bleue est requise pour activer l'API
- $5 sont offerts à l'inscription
- Budget recommandé : 10-20€ pour démarrer

### Étape 3 : Configurer la Clé

1. **Collez la clé** dans le champ "Ajouter une clé API"
2. Cliquez sur **"Sauvegarder"**
3. Attendez la confirmation : ✅ "Clé API sauvegardée avec succès !"
4. Le badge passe de ⚠️ "Non configuré" à ✅ "Configuré"

### Étape 4 : Tester la Connexion

1. Cliquez sur le bouton **"Tester"** ✅
2. Attendez quelques secondes
3. Vérifiez le message de confirmation :
   - ✅ Si succès : "Connexion Claude réussie !"
   - ❌ Si erreur : Message d'erreur explicite

### Étape 5 : Utiliser l'Analyse IA

1. Allez dans **"Vue d'ensemble"** ou **"Résultats"**
2. Cliquez sur **"Analyse IA"** (icône Sparkles ✨)
3. Lancez l'analyse
4. Claude génère automatiquement l'analyse complète !

---

## 🔒 Sécurité

### Stockage Sécurisé

**Où est stockée la clé ?**
- Dans le **Supabase KV Store** (base de données chiffrée)
- Accessible uniquement par le serveur backend
- Jamais exposée au frontend (sauf preview masqué)

**Comment est-elle utilisée ?**
- Le frontend appelle le backend via `/ai-analysis`
- Le backend récupère la clé depuis KV Store
- La clé est utilisée uniquement côté serveur
- Aucune fuite possible côté client

**Hiérarchie de priorité :**
```
1. Clé dans KV Store (Dashboard Settings) ← Priorité
2. Variable d'environnement ANTHROPIC_API_KEY (fallback)
```

### Bonnes Pratiques

✅ **À FAIRE :**
- Utilisez une clé API dédiée pour chaque projet
- Limitez les dépenses mensuelles dans console.anthropic.com
- Testez régulièrement la connexion
- Surveillez votre usage dans la console Anthropic

❌ **À NE PAS FAIRE :**
- Ne partagez jamais votre clé API publiquement
- Ne commitez pas la clé dans Git
- Ne la collez pas dans le code frontend
- Ne dépassez pas votre budget sans surveillance

---

## 🎨 Interface Utilisateur

### Composants Visuels

**1. Status Card (Haut)**
```
┌─────────────────────────────────────────┐
│ ✨ Analyse IA avec Claude    ✅ Configuré│
│ API Anthropic Claude 3.5 Sonnet          │
│                                           │
│ ℹ️ Info: L'analyse IA utilise Claude...  │
│   • Analyse complète en 11 sections      │
│   • Coût: ~0.02€ par analyse             │
│   • Budget recommandé: 10-20€            │
└─────────────────────────────────────────┘
```

**2. Clé Actuelle (Si configurée)**
```
┌─────────────────────────────────────────┐
│ Clé API actuelle                         │
│ sk-ant-api03-•••••••• [Tester] [×]      │
└─────────────────────────────────────────┘
```

**3. Formulaire d'ajout**
```
┌─────────────────────────────────────────┐
│ 🔑 Ajouter une clé API                   │
│ [sk-ant-api03-...]                       │
│ Obtenez votre clé sur console.anthropic.com│
│                                           │
│ [✓ Sauvegarder]                          │
└─────────────────────────────────────────┘
```

**4. Pricing Info**
```
┌─────────────────────────────────────────┐
│ 💲 Tarification Anthropic                │
│                                           │
│ Input: $3/1M tokens  Output: $15/1M      │
│ 💡 Total: ~0.02€ par analyse             │
│ Budget 10€ = ~500 analyses               │
└─────────────────────────────────────────┘
```

**5. Guide Intégré**
```
┌─────────────────────────────────────────┐
│ Comment obtenir une clé API ?            │
│                                           │
│ ① Allez sur console.anthropic.com        │
│ ② Créez un compte                        │
│ ③ Cliquez sur API Keys                   │
│ ④ Cliquez sur Create Key                 │
│ ⑤ Copiez la clé                          │
│ ⑥ Collez-la ci-dessus                    │
└─────────────────────────────────────────┘
```

### Animations

**Motion Effects :**
- Fade in au chargement (opacity 0 → 1)
- Slide up (y: 20 → 0)
- Transitions fluides sur les boutons
- Loading spinners pendant les opérations

**États Interactifs :**
- Hover sur boutons : Changement de couleur
- Loading : Spinner animé
- Success : Toast vert
- Error : Toast rouge

---

## 🔧 Architecture Technique

### Frontend (`SettingsPanel.tsx`)

**Fonctions principales :**
```typescript
loadApiKey()      // Charge l'état de la clé au montage
saveApiKey()      // Sauvegarde une nouvelle clé
testApiKey()      // Test la connexion Claude
deleteApiKey()    // Supprime la clé
```

**États React :**
```typescript
apiKey: string              // Clé en cours de saisie
savedKey: string | null     // Preview de la clé sauvegardée
isLoading: boolean          // État de chargement
isTesting: boolean          // Test en cours
isConfigured: boolean       // Clé configurée ou non
```

**API Endpoints utilisés :**
```
GET    /settings/anthropic-key    // Récupère le statut
POST   /settings/anthropic-key    // Sauvegarde la clé
DELETE /settings/anthropic-key    // Supprime la clé
POST   /settings/test-anthropic   // Test la connexion
```

### Backend (`settings.tsx`)

**Fonctions exportées :**
```typescript
getApiKeyStatus()   // Retourne {configured, keyPreview}
saveApiKey()        // Valide et stocke la clé
deleteApiKey()      // Supprime du KV Store
testApiKey()        // Appel test à Claude
getApiKey()         // Usage interne (par ai-analysis)
```

**KV Store Key :**
```
Key: "anthropic_api_key"
Value: "sk-ant-api03-xxxxx..."
```

**Validation :**
- Vérifie que la clé commence par `sk-ant-api03-`
- Vérifie que la clé n'est pas vide
- Teste l'API avant de confirmer

### Intégration avec `ai-analysis.tsx`

**Flow de récupération de la clé :**
```typescript
1. getApiKey() depuis settings.tsx
2. Si null → fallback sur ANTHROPIC_API_KEY env var
3. Si toujours null → erreur "not configured"
4. Sinon → utilise la clé pour appel Claude
```

**Ordre de priorité :**
```
Priority 1: KV Store (Dashboard Settings) ✅
Priority 2: Environment Variable (Fallback)
Priority 3: Error
```

---

## 📊 Métriques & Monitoring

### Usage Tracking

**Dans la console Anthropic :**
- Nombre de requêtes
- Tokens utilisés (input/output)
- Coûts cumulés
- Graphiques d'usage

**Dans le Dashboard :**
- Indicateur "Configuré" / "Non configuré"
- Test de connexion pour vérifier la validité
- Messages d'erreur si problème

### Coûts Estimés

**Par analyse complète :**
```
Input:  2,000-3,000 tokens × $3/1M  = $0.006-0.009
Output: 4,000-6,000 tokens × $15/1M = $0.012-0.018
Total:  ~$0.018-0.027 ≈ 0.02€
```

**Exemples de budgets :**
- $5 (offert) = ~185-275 analyses
- $10 = ~370-550 analyses
- $20 = ~740-1,100 analyses
- $50 = ~1,850-2,750 analyses

---

## 🐛 Troubleshooting

### Problème : "ANTHROPIC_API_KEY not configured"

**Cause :** Aucune clé n'est configurée

**Solution :**
1. Allez dans Paramètres
2. Ajoutez votre clé API
3. Cliquez sur Sauvegarder
4. Testez la connexion

### Problème : "Invalid API key format"

**Cause :** Format de clé incorrect

**Solution :**
- Vérifiez que la clé commence par `sk-ant-api03-`
- Copiez-collez directement depuis console.anthropic.com
- Ne modifiez pas la clé manuellement

### Problème : Test échoue avec erreur 401

**Cause :** Clé invalide ou expirée

**Solution :**
1. Allez sur console.anthropic.com
2. Vérifiez que la clé existe toujours
3. Générez une nouvelle clé si nécessaire
4. Mettez à jour dans les Paramètres

### Problème : Test échoue avec erreur 429

**Cause :** Rate limit dépassé

**Solution :**
- Attendez 1 minute
- Claude gratuit = max 5 req/min
- Passez à un plan payant pour plus de débit

### Problème : La clé ne se sauvegarde pas

**Cause :** Problème de connexion au backend

**Solution :**
1. Vérifiez la console (F12) pour les erreurs
2. Vérifiez que Supabase fonctionne
3. Vérifiez votre connexion internet
4. Réessayez dans quelques instants

---

## 💡 Astuces & Conseils

### Optimiser les Coûts

**1. Limitez les analyses :**
- Ne lancez l'analyse que quand vous avez 10+ réponses
- Les résultats seront plus riches et plus fiables

**2. Exportez les analyses :**
- Téléchargez en Markdown pour référence
- Évitez de régénérer inutilement la même analyse

**3. Configurez des limites :**
- Dans console.anthropic.com → Settings → Usage limits
- Définissez un budget mensuel max

### Améliorer la Qualité

**1. Attendez d'avoir des données variées :**
- Plusieurs pays représentés
- Plusieurs secteurs
- Mix de tailles d'entreprises

**2. Lancez plusieurs analyses :**
- À différents moments de la collecte
- Comparez l'évolution des insights

**3. Personnalisez le prompt :**
- Modifiez `/supabase/functions/server/ai-analysis.tsx`
- Adaptez à vos besoins spécifiques

---

## 🎉 Avantages de l'Intégration

### Avant (Variables d'environnement)

❌ Configuration manuelle complexe
❌ Nécessite redémarrage après changement
❌ Pas de test facile
❌ Pas d'interface visuelle
❌ Difficile à debugger

### Après (Panneau Paramètres)

✅ Interface intuitive et visuelle
✅ Configuration en 2 minutes
✅ Test de connexion intégré
✅ Mise à jour instantanée
✅ Guide pas à pas intégré
✅ Gestion d'erreurs claire
✅ Sécurité maintenue (KV Store chiffré)
✅ Prêt pour production

---

## 🚀 Prochaines Étapes

Maintenant que les Paramètres sont configurés :

1. ✅ **Configurez votre clé API** (5 min)
2. ✅ **Testez la connexion** (30 sec)
3. ✅ **Lancez une première analyse** (1 min)
4. ✅ **Vérifiez le résultat** (analysez l'output)
5. 🎯 **Déployez en production !**

---

**Le panneau Paramètres rend l'intégration Claude aussi simple que possible ! 🎊**

_Créé le : 28 Novembre 2024_
_Version : 1.0 - Settings Panel Integration_
