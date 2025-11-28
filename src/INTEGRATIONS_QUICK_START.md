# ⚡ Guide Rapide - Intégrations YOJOB

## 🎯 Démarrage en 5 Minutes

### Étape 1 : Accéder aux Intégrations
1. Ouvrir le **Dashboard YOJOB**
2. Cliquer sur l'onglet **"Intégrations"**
3. Vous verrez vos intégrations existantes (ou un écran vide)

---

### Étape 2 : Créer une Intégration

#### Option A : Utiliser un Template (Recommandé)
1. Cliquer sur **"Nouvelle Intégration"**
2. Choisir parmi 9 templates :
   - 📊 **Google Sheets** - Export automatique
   - ⚡ **Zapier** - 5000+ apps
   - 🔧 **Make** - Workflows avancés
   - 🤖 **n8n** - Open-source automation
   - 📝 **Notion** - Pages automatiques
   - 🗂️ **Airtable** - Bases de données
   - 💬 **Slack** - Notifications
   - 🔗 **Webhook Personnalisé** - Votre API
   - 🔋 **Supabase** - Base de données temps réel

3. Le template pré-remplit la configuration
4. Cliquer **"Créer l'intégration"**

#### Option B : Configuration Manuelle
1. Sélectionner **"Webhook Personnalisé"**
2. Remplir les champs :
   - **Nom** : "Mon API"
   - **URL** : `https://api.example.com/webhook`
   - **Méthode** : POST
   - **API Key** (optionnel) : `sk_live_xxx`
3. Cliquer **"Créer l'intégration"**

---

### Étape 3 : Configurer l'Intégration

1. Cliquer sur **"Configurer"** sur votre intégration
2. Un modal s'ouvre avec 4 onglets

#### Onglet "Configuration"
```
⚙️ Configuration de base
├── URL de l'endpoint
├── Clé API (masquée)
└── Méthode HTTP (GET/POST/PUT/PATCH)

🔧 Paramètres avancés
├── ✓ Réessais automatiques (1-10 tentatives)
├── ⏱️ Timeout (5s - 60s)
└── 🚦 Rate limit (10-1000 req/min)
```

**Recommandations** :
- ✅ Activer les réessais automatiques
- ✅ Timeout : 30s (standard)
- ✅ Rate limit : 100 req/min (sauf cas spécial)

3. Cliquer **"Enregistrer la configuration"**

---

### Étape 4 : Tester la Connexion

1. Dans l'onglet **"Vue d'ensemble"**
2. Cliquer sur **"⚡ Tester la connexion"**
3. Attendre 2 secondes
4. ✅ Message de confirmation
5. Un log de test est créé automatiquement

**Payload de test** :
```json
{
  "test": true,
  "message": "Connection test",
  "timestamp": "2024-11-28T14:30:00Z"
}
```

---

### Étape 5 : Vérifier les Logs

1. Aller dans l'onglet **"Logs"**
2. Vous verrez le log de test
3. Cliquer sur l'œil 👁️ pour voir les détails
4. Vérifier :
   - ✅ Status : 200 (succès)
   - ✅ Durée : < 500ms (bon)
   - ✅ Payload envoyé
   - ✅ Réponse reçue

---

## 🔐 Configuration OAuth (Google, Notion, Slack...)

### Pour Google Sheets

1. Ouvrir votre intégration
2. Onglet **"OAuth"**
3. Cliquer sur **"Connecter Google"**
4. Autoriser l'accès dans la popup :
   - ✅ Accès aux Sheets
   - ✅ Lecture/Écriture
5. Vous êtes connecté ! 🎉

**Token automatiquement rafraîchi** 5 minutes avant expiration.

### Pour Notion

1. Même processus
2. Cliquer **"Connecter Notion"**
3. Sélectionner les pages/databases à partager
4. Confirmer

### Pour Slack

1. Cliquer **"Connecter Slack"**
2. Choisir le workspace
3. Autoriser l'accès au canal
4. C'est tout !

---

## 📊 Comprendre les Statistiques

### Cards dans "Vue d'ensemble"

```
┌─────────────────────┐
│ ✓ 98.5%            │  ← Success Rate
│ Taux de succès     │  (Vert si > 95%)
└─────────────────────┘

┌─────────────────────┐
│ ⚡ 156              │  ← Total Calls
│ Total appels       │
└─────────────────────┘

┌─────────────────────┐
│ ⏱️ 245ms            │  ← Avg Response Time
│ Temps moyen        │  (Vert si < 500ms)
└─────────────────────┘

┌─────────────────────┐
│ ❌ 14               │  ← Error Calls
│ Erreurs            │  (Rouge si > 10)
└─────────────────────┘
```

### Interprétation

| Métrique | Excellent | Bon | À améliorer | Problème |
|----------|-----------|-----|-------------|----------|
| Success Rate | > 99% | 95-99% | 90-95% | < 90% |
| Avg Response | < 200ms | 200-500ms | 500ms-2s | > 2s |
| Error Calls | 0 | 1-5 | 5-20 | > 20 |

---

## 🔄 Gérer les Erreurs

### Si un Appel Échoue

**Symptômes** :
- 🔴 Log rouge
- ❌ Status code 4xx ou 5xx
- Message d'erreur

**Solutions** :

#### 1. Retry Manuel
1. Ouvrir l'onglet **"Logs"**
2. Trouver le log en erreur
3. Cliquer **"🔄 Retry"**
4. L'appel est réessayé immédiatement

#### 2. Vérifier la Configuration
- ✅ URL correcte ?
- ✅ API Key valide ?
- ✅ Méthode HTTP correcte ?
- ✅ Endpoint actif ?

#### 3. Augmenter le Timeout
Si erreur "timeout" :
1. Onglet **"Configuration"**
2. Augmenter timeout à 45s ou 60s
3. Sauvegarder
4. Réessayer

#### 4. Activer Retry Automatique
1. Onglet **"Configuration"**
2. Activer **"Réessais automatiques"**
3. Mettre 5 tentatives max
4. Les prochaines erreurs seront auto-retry

---

## 📋 Cas d'Usage Courants

### 1. Envoyer vers Google Sheets

**Configuration** :
```
Template : Google Sheets
OAuth : Connecté
URL : Auto-générée
Rate Limit : 100 req/min
```

**Résultat** :
Chaque réponse du formulaire → nouvelle ligne dans Sheet

### 2. Notification Slack

**Configuration** :
```
Template : Slack
OAuth : Connecté
Channel : #leads
Rate Limit : 60 req/min
```

**Résultat** :
Message Slack à chaque réponse importante

### 3. Webhook Zapier

**Configuration** :
```
Template : Zapier
URL : https://hooks.zapier.com/hooks/catch/xxx/yyy
Method : POST
Retry : Activé (3 tentatives)
```

**Résultat** :
Déclenche un Zap qui peut :
- Envoyer email
- Créer deal dans CRM
- Ajouter à Airtable
- Etc.

### 4. Base de Données Supabase

**Configuration** :
```
Template : Supabase
URL : https://xxx.supabase.co/rest/v1/responses
API Key : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Method : POST
Rate Limit : 500 req/min
```

**Résultat** :
Stockage direct dans PostgreSQL avec temps réel

---

## 🎓 Bonnes Pratiques

### ✅ DO

1. **Tester avant de lancer** : Toujours tester la connexion
2. **Activer retry** : Pour éviter pertes de données
3. **Monitorer les logs** : Vérifier régulièrement les erreurs
4. **Utiliser OAuth** : Plus sécurisé que API keys
5. **Rate limit adapté** : Ni trop bas, ni trop haut
6. **Timeout raisonnable** : 30s standard, 60s max

### ❌ DON'T

1. **API key en clair** : Toujours masquer les credentials
2. **Ignorer les erreurs** : Investiguer les logs rouges
3. **Rate limit trop élevé** : Risque de ban par provider
4. **URLs HTTP** : Toujours HTTPS pour sécurité
5. **Timeout trop court** : Risque de faux timeouts
6. **Oublier de sauvegarder** : Cliquer "Enregistrer" après modif

---

## 🔍 Troubleshooting Rapide

### Problème : "401 Unauthorized"
**Cause** : API key invalide ou expirée  
**Solution** : Regénérer API key, mettre à jour config

### Problème : "404 Not Found"
**Cause** : URL incorrecte  
**Solution** : Vérifier l'URL de l'endpoint

### Problème : "429 Too Many Requests"
**Cause** : Rate limit dépassé  
**Solution** : Réduire le rate limit ou attendre

### Problème : "500 Internal Server Error"
**Cause** : Erreur côté serveur distant  
**Solution** : Activer retry automatique, contacter support API

### Problème : "Timeout"
**Cause** : Réponse trop lente (> timeout configuré)  
**Solution** : Augmenter timeout à 45-60s

### Problème : OAuth ne fonctionne pas
**Cause** : Popups bloquées ou HTTPS manquant  
**Solution** : Autoriser popups, utiliser HTTPS

---

## 📞 Besoin d'Aide ?

### Support Disponible

**Email** : integrations@yojob.fr  
Réponse sous 24h (jours ouvrés)

**Slack** : #integrations-support  
Réponse temps réel (9h-18h)

**Documentation** : https://docs.yojob.fr/integrations  
Guides détaillés + exemples

**Status** : https://status.yojob.fr  
Vérifier uptime des intégrations

### Avant de Contacter le Support

Préparer :
1. ✅ Nom de l'intégration
2. ✅ Screenshot de l'erreur
3. ✅ Log ID concerné
4. ✅ Configuration (masquer API key)
5. ✅ Steps pour reproduire

---

## 🎯 Checklist de Lancement

Avant de mettre en production :

- [ ] ✅ Intégration créée
- [ ] ✅ Configuration correcte (URL, API key, method)
- [ ] ✅ Test de connexion réussi
- [ ] ✅ Retry automatique activé (3-5 tentatives)
- [ ] ✅ Timeout configuré (30s standard)
- [ ] ✅ Rate limit approprié (100 req/min)
- [ ] ✅ Log de test visible et succès
- [ ] ✅ OAuth connecté (si applicable)
- [ ] ✅ Token rafraîchissement vérifié (OAuth)
- [ ] ✅ Monitoring configuré (alertes email)

---

## 🚀 Prochaines Étapes

Une fois votre intégration en place :

1. **Monitorer** : Vérifier les logs quotidiennement
2. **Optimiser** : Ajuster timeout/retry selon stats
3. **Étendre** : Ajouter d'autres intégrations
4. **Automatiser** : Créer workflows complexes (Zapier/Make)
5. **Analyser** : Exploiter les données collectées

---

## 📈 Objectifs de Performance

Pour une intégration saine :

| Métrique | Objectif | Action si non atteint |
|----------|----------|----------------------|
| Success Rate | > 99% | Activer retry + augmenter timeout |
| Avg Response | < 500ms | Optimiser endpoint ou changer provider |
| Uptime | > 99.9% | Vérifier status provider + activer alertes |
| Error Rate | < 1% | Investiguer logs + corriger config |

---

**🎉 Félicitations ! Vous êtes prêt à utiliser les intégrations YOJOB.**

---

**Version** : 2.6.0  
**Dernière mise à jour** : 28 Novembre 2024  
**Auteur** : Équipe YOJOB Dev
