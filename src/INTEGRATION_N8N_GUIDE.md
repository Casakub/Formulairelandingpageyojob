# 🤖 GUIDE D'INTÉGRATION N8N

## Configuration pour votre instance n8n auto-hébergée
**URL de base**: `https://uxomnia.cloud/api/v1/`

---

## 🎯 DEUX MODES DE CONNEXION

### ✅ Mode 1 : Webhook (RECOMMANDÉ - SIMPLE)

**Avantages**:
- ⚡ Facile à configurer
- ❌ Pas d'API key nécessaire
- 🚀 Déclenche le workflow directement
- ✅ Prêt en 2 minutes

**Étapes**:

#### 1. Créer le workflow n8n
1. Ouvrir n8n: `https://uxomnia.cloud`
2. Créer un nouveau workflow
3. Ajouter un node "Webhook"
4. Configuration du node Webhook:
   - **HTTP Method**: POST
   - **Path**: `/yojob-survey` (ou autre nom)
   - **Response Mode**: "Immediately"
   - **Response Code**: 200

#### 2. Copier l'URL du webhook
Cliquer sur "Copy webhook URL" dans le node.

Exemple d'URL:
```
https://uxomnia.cloud/webhook/yojob-survey-abc123def456
```

#### 3. Traiter les données dans n8n
Ajouter les nodes selon vos besoins:

**Exemple de workflow simple**:
```
Webhook → Function → Email
```

**Exemple de workflow avancé**:
```
Webhook → IF (score > 7) → Google Sheets
                        → Slack notification
```

**Données reçues** (dans le node Webhook):
```json
{
  "response_id": "uuid-1234",
  "created_at": "2024-11-30T15:30:00Z",
  "q1_nom": "ACME Recruitment",
  "email": "contact@acme.com",
  "country": "France",
  "interest_level": "Très intéressé",
  "score": 8.5,
  // ... toutes les autres questions
}
```

#### 4. Activer le workflow
- Cliquer sur le toggle "Active" en haut à droite
- Status doit passer à "ACTIVE"

#### 5. Configurer dans le Dashboard YOJOB
1. Dashboard > Intégrations > Nouvelle Intégration
2. Choisir "n8n"
3. **URL**: Coller l'URL du webhook
4. **Méthode**: POST
5. **API Key**: Laisser vide
6. Créer > Tester la connexion

✅ **C'est tout !** Chaque réponse du formulaire déclenchera automatiquement votre workflow n8n.

---

### 🔧 Mode 2 : API REST (AVANCÉ)

**Avantages**:
- 🎯 Contrôle programmatique total
- 🔄 Peut exécuter des workflows existants
- 📊 Accès à toutes les fonctionnalités de l'API n8n

**Inconvénients**:
- 🔑 Nécessite une API key
- 🧠 Plus complexe à configurer

**Prérequis**:
- Avoir créé une API key dans n8n

#### 1. Créer une API key n8n

1. Ouvrir n8n: `https://uxomnia.cloud`
2. Menu utilisateur (en bas à gauche) > Settings
3. API > Create an API key
4. Copier la clé (commence par `n8n_api_...`)
5. ⚠️ **Sauvegarder la clé** (elle ne sera pas réaffichée)

#### 2. Créer un workflow à exécuter

Créer un workflow qui commence par un node "Execute Workflow Trigger" ou tout autre déclencheur compatible avec l'API.

Notez l'ID du workflow (visible dans l'URL):
```
https://uxomnia.cloud/workflow/ABC123DEF456
                              ↑ Cet ID
```

#### 3. URL de l'API pour exécuter un workflow

Format:
```
https://uxomnia.cloud/api/v1/workflows/{workflowId}/execute
```

Exemple:
```
https://uxomnia.cloud/api/v1/workflows/ABC123DEF456/execute
```

#### 4. Configurer dans le Dashboard YOJOB

1. Dashboard > Intégrations > Nouvelle Intégration
2. Choisir "n8n"
3. **URL**: `https://uxomnia.cloud/api/v1/workflows/ABC123DEF456/execute`
4. **Méthode**: POST
5. **API Key n8n**: Coller votre clé API
6. Créer

⚠️ **Important**: L'API key sera automatiquement envoyée dans le header `X-N8N-API-KEY`.

#### 5. Tester

Cliquer sur "Tester la connexion" dans le dashboard.

---

## 📊 EXEMPLES DE WORKFLOWS N8N

### Exemple 1: Notification Slack pour leads qualifiés

```
Webhook 
  → IF (interest_level == "Très intéressé" AND q12_nombre_missions > 10)
      → TRUE: Slack (canal #sales-leads)
              Message: "🔥 Lead qualifié: {q2_nom_agence} - {q5_pays}"
      → FALSE: Stop workflow
```

### Exemple 2: Export multi-destinations

```
Webhook
  → Google Sheets (append row)
  → Airtable (create record)
  → Email notification à l'équipe
```

### Exemple 3: Enrichissement de données

```
Webhook
  → HTTP Request (enrichir avec API externe)
  → Function (calculer des métriques)
  → MySQL/PostgreSQL (sauvegarder)
  → Webhook response
```

### Exemple 4: Analyse IA avec Claude (via n8n)

```
Webhook
  → Function (formatter les données)
  → HTTP Request (API Claude)
      URL: https://api.anthropic.com/v1/messages
      Headers: X-API-Key, anthropic-version
      Body: {
        "model": "claude-3-5-sonnet-20241022",
        "messages": [{
          "role": "user",
          "content": "Analyse cette réponse: {{$json.body}}"
        }]
      }
  → Slack (envoyer l'analyse)
```

---

## 🧪 TESTER VOTRE INTÉGRATION

### Test via webhook.site (avant de configurer n8n)

1. Aller sur https://webhook.site
2. Copier votre URL unique
3. Configurer temporairement cette URL dans YOJOB
4. Soumettre une réponse test
5. Voir le payload reçu sur webhook.site
6. Utiliser ce payload pour construire votre workflow n8n

### Test direct dans n8n

1. Workflow > "Test workflow" (bouton)
2. Le webhook attend une requête
3. Soumettre une réponse via le formulaire YOJOB
4. Voir l'exécution en temps réel dans n8n

---

## 🔒 SÉCURITÉ

### Mode Webhook
- L'URL du webhook est secrète
- Pas d'API key dans les headers = pas de risque de fuite
- Recommandé pour la production

### Mode API
- L'API key donne accès à TOUTE votre instance n8n
- ⚠️ Ne jamais partager cette clé
- ⚠️ Ne jamais la commit dans Git
- ✅ Elle est stockée de manière sécurisée dans Supabase (cryptée)

### En-têtes envoyés automatiquement

**Mode Webhook**:
```
Content-Type: application/json
```

**Mode API**:
```
Content-Type: application/json
X-N8N-API-KEY: <votre-cle-api>
```

---

## 🐛 TROUBLESHOOTING

### ❌ Erreur 404: Not Found
**Cause**: L'URL du webhook est incorrecte ou le workflow n'est pas actif.
**Solution**:
- Vérifier que le workflow est bien ACTIF dans n8n
- Copier à nouveau l'URL du webhook depuis n8n
- Vérifier qu'il n'y a pas d'espaces dans l'URL

### ❌ Erreur 401: Unauthorized
**Cause**: API key invalide ou manquante (mode API seulement).
**Solution**:
- Régénérer une API key dans n8n
- La saisir à nouveau dans le dashboard YOJOB
- Vérifier que l'API key commence bien par `n8n_api_`

### ❌ Erreur 500: Internal Server Error
**Cause**: Erreur dans le workflow n8n.
**Solution**:
- Ouvrir n8n > Executions (menu de gauche)
- Voir les logs d'erreur
- Corriger le workflow
- Retester

### ❌ Timeout
**Cause**: Le workflow n8n met trop de temps à répondre (>30s).
**Solution**:
- Simplifier le workflow
- Ou utiliser "Respond to Webhook" node en début de workflow
- Continuer le traitement après avoir répondu

### ⚠️ Le workflow ne se déclenche pas
**Checklist**:
- [ ] Le workflow est-il ACTIF ?
- [ ] L'URL est-elle correcte ?
- [ ] Le node Webhook est-il correctement configuré ?
- [ ] Y a-t-il des erreurs dans les logs n8n ?
- [ ] Le test de connexion dans YOJOB fonctionne-t-il ?

---

## 📈 MONITORING

### Dans le Dashboard YOJOB
- Nombre d'appels réussis
- Nombre d'erreurs
- Temps de réponse moyen
- Logs détaillés avec payload et erreurs

### Dans n8n
- Menu "Executions" (historique complet)
- Voir les inputs/outputs de chaque node
- Temps d'exécution
- Erreurs détaillées

---

## 💡 BONNES PRATIQUES

### 1. Utiliser le mode Webhook pour la simplicité
```
✅ Webhook → Traitement → Actions
❌ API execute workflow (complexe)
```

### 2. Toujours répondre rapidement
```
Webhook → Respond to Webhook (200 OK)
       → Suite du traitement en async
```

### 3. Gérer les erreurs
```
Try → Catch → Log l'erreur → Notification
```

### 4. Tester avec des données réelles
- Créer un workflow de "staging"
- Tester avec de vraies soumissions
- Valider avant de passer en production

### 5. Documenter vos workflows
- Ajouter des notes dans n8n
- Décrire ce que fait chaque node
- Facilite la maintenance

---

## 🎓 RESSOURCES

- Documentation n8n: https://docs.n8n.io
- API Reference: https://docs.n8n.io/api/
- Community: https://community.n8n.io
- Exemples de workflows: https://n8n.io/workflows

---

**Créé avec ❤️ pour YOJOB**
**Version 1.0** | 30 Novembre 2024
