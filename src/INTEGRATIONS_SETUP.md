# 🔗 SYSTÈME D'INTÉGRATIONS - GUIDE COMPLET

## ✅ Système créé le 30 Novembre 2024

---

## 📋 RÉSUMÉ

Le système d'intégrations permet d'envoyer **automatiquement** chaque réponse du formulaire vers des outils externes :
- 📊 **Google Sheets** - Stockage en temps réel
- 🤖 **n8n** - Workflows automation
- 📝 **Notion** - Documentation automatique
- ⚡ **Zapier, Make** - 5000+ apps
- 🔗 **Webhooks** - API personnalisées

---

## 🎯 PRÉREQUIS - EXÉCUTEZ LA MIGRATION SQL !

**CRITIQUE** : Avant d'utiliser les intégrations, vous **DEVEZ** exécuter cette migration dans le SQL Editor de Supabase :

### Étape 1 : Ouvrir le SQL Editor Supabase
1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet
3. Cliquer sur "SQL Editor" dans la sidebar
4. Cliquer sur "New Query"

### Étape 2 : Copier/Coller la migration
```sql
-- Copier TOUT le contenu du fichier :
/supabase/migrations/10_integrations_system.sql
```

### Étape 3 : Exécuter
1. Coller le code SQL
2. Cliquer sur "Run" (ou Ctrl+Entrée)
3. Vérifier le message "Success. No rows returned"

---

## 🏗️ ARCHITECTURE

### 1. Tables Supabase

**Table `integrations`**
```sql
- id (UUID)
- name (text) - "Google Sheets Production"
- type (enum) - api | webhook | mcp | database
- status (enum) - connected | disconnected | error
- config (jsonb) - URL, API key, headers, etc.
- stats (jsonb) - Statistiques d'utilisation
- oauth (jsonb) - Tokens OAuth (optionnel)
```

**Table `integration_logs`**
```sql
- id (UUID)
- integration_id (FK)
- response_id (UUID) - Référence vers la réponse
- status (enum) - success | error | retrying
- url (text)
- status_code (int)
- duration_ms (int)
- error_message (text)
```

### 2. Edge Functions

**`/supabase/functions/server/integrations.ts`**
- `triggerAllIntegrations()` - Déclenche toutes les intégrations actives
- `triggerWebhook()` - Envoi HTTP POST/GET/PUT/PATCH
- `triggerMCP()` - Intégrations MCP (Notion, Slack)
- `testIntegration()` - Test d'une intégration

**Routes API**
```
POST /make-server-10092a63/integrations/trigger
POST /make-server-10092a63/integrations/test
```

### 3. Frontend

**`/lib/integrations.ts`** - Helpers CRUD
```typescript
getAllIntegrations()
createIntegration(integration)
updateIntegration(id, updates)
deleteIntegration(id)
testIntegration(integration)
getIntegrationLogs(integrationId)
```

**`/components/dashboard/IntegrationManager.tsx`**
- Interface de gestion des intégrations
- Sauvegarde dans Supabase (pas en mémoire)
- Templates préconfigurés

---

## 🚀 UTILISATION

### Créer une intégration Google Sheets

#### Étape 1 : Créer le formulaire Google Sheets
1. Créer un Google Sheet
2. Tools > Script editor
3. Coller ce code :

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Réponses');
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.response_id,
    data.q1_nom,
    data.email,
    data.country,
    data.interest_level
    // Ajoutez d'autres colonnes selon vos besoins
  ]);
  
  return ContentService.createTextOutput('OK');
}
```

4. Deploy > New deployment > Web app
5. Execute as: "Me"
6. Who has access: "Anyone"
7. Copier l'URL générée

#### Étape 2 : Configurer dans le Dashboard
1. Aller dans Dashboard > Intégrations
2. Cliquer "Nouvelle Intégration"
3. Choisir "Google Sheets"
4. Coller l'URL du webhook
5. Méthode : POST
6. Cliquer "Créer l'intégration"
7. Cliquer "Tester la connexion"

#### Étape 3 : Activer
- Si le test réussit, l'intégration passe en statut "connected"
- Toutes les futures soumissions seront envoyées automatiquement

---

### Créer une intégration n8n

#### Étape 1 : Créer le workflow n8n
1. Créer un nouveau workflow
2. Ajouter un node "Webhook"
3. Method: POST
4. Path: /yojob-survey
5. Copier l'"URL de production"

#### Étape 2 : Traiter les données
Ajouter des nodes selon vos besoins :
- Email notification
- Slack message
- Airtable insert
- etc.

#### Étape 3 : Configurer dans le Dashboard
1. Dashboard > Intégrations > Nouvelle
2. Choisir "n8n"
3. URL : Coller l'URL du webhook n8n
4. Méthode : POST
5. Créer et tester

---

### Créer une intégration Notion (MCP)

**⚠️ Nécessite Notion MCP configuré**

1. Installer Notion MCP server
2. Connecter Notion dans l'environnement
3. Dashboard > Intégrations > Notion
4. La connexion se fait automatiquement via MCP
5. Les réponses seront créées en pages Notion

---

### Webhook Personnalisé

Pour envoyer vers votre propre API :

```javascript
// Votre endpoint recevra un POST avec ce payload :
{
  "response_id": "uuid",
  "created_at": "2024-11-30T15:30:00Z",
  "q1_nom": "ACME Agency",
  "email": "contact@acme.com",
  "country": "France",
  "interest_level": "Très intéressé",
  // ... toutes les autres questions
}
```

Configuration :
- URL : `https://votre-api.com/webhook/survey`
- Méthode : POST
- Headers (optionnel) : Authorization, etc.
- API Key (optionnel)

---

## 📊 MONITORING

### Dashboard Intégrations

**Statistiques en temps réel :**
- ✅ Connectées
- ⚠️ Inactives
- ❌ Erreurs
- ⚡ Total

**Par intégration :**
- Nombre d'appels réussis
- Nombre d'erreurs
- Temps de réponse moyen
- Dernière synchronisation

### Logs détaillés

Cliquer sur "Configurer" > Onglet "Historique"
- Date/heure de chaque appel
- Status code HTTP
- Durée d'exécution
- Message d'erreur (si échec)
- Payload envoyé

---

## 🔧 CONFIGURATION AVANCÉE

### Retry Logic

Par défaut, chaque intégration retente 3 fois en cas d'échec :
- Délai entre tentatives : exponentiel
- Max retries : 3
- Timeout : 30 secondes

### Rate Limiting

Pour éviter de surcharger vos APIs :
- Rate limit : 100 requêtes/minute par défaut
- Configurable par intégration

### Headers personnalisés

Pour les webhooks :
```json
{
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "X-Custom-Header": "value"
  }
}
```

---

## 🐛 TROUBLESHOOTING

### L'intégration reste "disconnected"
- Vérifier que la migration SQL a bien été exécutée
- Tester la connexion avec le bouton "Test"
- Vérifier l'URL du webhook

### Erreur 401 Unauthorized
- Vérifier l'API key
- Vérifier les headers Authorization
- Pour OAuth, regénérer le token

### Erreur 500 côté serveur
- Vérifier les logs dans `/dashboard/integrations`
- Le payload peut être incompatible avec votre API
- Ajuster le mapping des champs

### Timeout
- L'endpoint cible met trop de temps à répondre (>30s)
- Augmenter le timeout dans la config
- Ou rendre l'endpoint plus rapide

---

## 📦 FICHIERS CRÉÉS

```
/supabase/migrations/
  └─ 10_integrations_system.sql     ← EXÉCUTER DANS SUPABASE

/supabase/functions/server/
  └─ integrations.ts                 ← Logique de déclenchement

/lib/
  └─ integrations.ts                 ← Helpers frontend
  └─ supabase-public.ts (modifié)    ← Déclenche les intégrations

/components/dashboard/
  └─ IntegrationManager.tsx (modifié) ← UI + Supabase persistence
```

---

## ✅ CHECKLIST DE VÉRIFICATION

Avant de tester :

- [ ] Migration SQL exécutée dans Supabase
- [ ] Tables `integrations` et `integration_logs` créées
- [ ] Edge function déployée et accessible
- [ ] Dashboard affiche "Aucune intégration configurée"
- [ ] Bouton "Nouvelle Intégration" fonctionne
- [ ] Templates visibles (Google Sheets, n8n, etc.)

---

## 🎉 PROCHAINES ÉTAPES

1. **Exécuter la migration SQL** (CRITIQUE)
2. **Créer votre première intégration** (Google Sheets recommandé)
3. **Tester avec une soumission réelle**
4. **Vérifier les logs dans le dashboard**
5. **Ajouter d'autres intégrations selon vos besoins**

---

## 💡 EXEMPLES D'UTILISATION

### Scénario 1 : Export Google Sheets
Chaque réponse → Google Sheet automatiquement

### Scénario 2 : Notification Slack (via n8n)
Réponse avec score > 8 → Message Slack à l'équipe commerciale

### Scénario 3 : CRM personnalisé
Réponse → Webhook → Votre API → Créer un lead dans votre CRM

### Scénario 4 : Multi-intégrations
1 réponse → 3 intégrations en parallèle :
- Google Sheets (archivage)
- Zapier (enrichissement data)
- Webhook (CRM interne)

---

**Créé avec ❤️ pour YOJOB**
**Version 1.0** | 30 Novembre 2024
