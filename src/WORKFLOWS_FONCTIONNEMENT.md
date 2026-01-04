# 🎯 WORKFLOWS - FONCTIONNEMENT COMPLET

## ✅ OUI, LES WORKFLOWS SONT FONCTIONNELS !

Les workflows sont maintenant **entièrement fonctionnels** et connectés aux **vraies données** de votre application. Voici comment tout fonctionne :

---

## 📊 DONNÉES RÉCUPÉRÉES

### **Toutes les données prospects sont utilisées**

Lorsqu'un workflow s'exécute, il a accès à **TOUTES** les données du prospect stockées dans Supabase :

#### **Données principales** :
- ✅ `name` / `contact_name` - Nom du prospect
- ✅ `email` - Email
- ✅ `phone` - Téléphone
- ✅ `company_name` - Nom de l'entreprise
- ✅ `country` / `country_code` - Pays
- ✅ `status` - Statut (new, contacted, qualified, converted, lost)
- ✅ `type` - Type (client, agency, interim, waitlist)
- ✅ `source` - Source (landing_contact, landing_waitlist, survey, etc.)

#### **Données métier** :
- ✅ `industry_sector` - Secteur d'activité (BTP, Industrie, Agriculture, etc.)
- ✅ `workers_count` - Nombre de travailleurs recherchés
- ✅ `project_description` - Description du projet
- ✅ `need_type` - Type de besoin
- ✅ `message` - Message du formulaire de contact
- ✅ `tags` - Tags associés au prospect
- ✅ `score` - Score IA du prospect
- ✅ `priority` - Priorité (low, medium, high, urgent)

#### **Données tracking** :
- ✅ `created_at` - Date de création
- ✅ `language_code` - Langue préférée
- ✅ `responsible_name` - Responsable assigné
- ✅ `next_action_date` - Date de prochaine action
- ✅ `custom_fields` - Champs personnalisés (objet JSON)

---

## 🔧 VARIABLES DYNAMIQUES DISPONIBLES

Dans les templates d'emails et actions, vous pouvez utiliser ces variables qui seront **automatiquement remplacées** par les vraies données :

```
{{prospect.name}}              → "Jean Dupont"
{{prospect.email}}             → "jean.dupont@example.com"
{{prospect.company}}           → "ACME Construction SARL"
{{prospect.phone}}             → "+33 6 12 34 56 78"
{{prospect.country}}           → "France"
{{prospect.status}}            → "new"
{{prospect.industry}}          → "BTP"
{{prospect.workers_count}}     → "15"
{{prospect.project_description}} → "Projet de recrutement..."
{{today}}                      → "04/01/2026"
{{company_name}}               → "YOJOB"
{{company_email}}              → "contact@yojob.com"
{{company_phone}}              → "+33 1 23 45 67 89"
```

**Exemple concret** :
```html
<p>Bonjour {{prospect.name}},</p>
<p>Nous avons bien reçu votre demande pour {{prospect.company}}.</p>
<p>Vous recherchez {{prospect.workers_count}} travailleurs dans le secteur {{prospect.industry}}.</p>
```

Devient :
```html
<p>Bonjour Jean Dupont,</p>
<p>Nous avons bien reçu votre demande pour ACME Construction SARL.</p>
<p>Vous recherchez 15 travailleurs dans le secteur BTP.</p>
```

---

## 🚀 DÉCLENCHEMENTS AUTOMATIQUES

### **1. Nouveau prospect créé** ✅ ACTIF

**Trigger** : `prospect_created`

**Quand** : Dès qu'un prospect soumet le formulaire de contact ou la liste d'attente

**Exemple de workflow** :
```
1. ✉️ Envoyer email de bienvenue (immédiat)
2. ⏳ Attendre 24h
3. ✉️ Envoyer email de relance si pas de réponse
4. 🏷️ Ajouter tag "Nurturing automatique"
5. ✅ Créer tâche "Appeler le prospect" pour le commercial
```

**Code backend** : Lors de la création d'un prospect dans `/supabase/functions/server/prospects.tsx` :
```typescript
// Déclencher automatiquement les workflows
fetch(`${SUPABASE_URL}/functions/v1/make-server-10092a63/workflow-engine/trigger/prospect_created`, {
  method: 'POST',
  body: JSON.stringify({ prospect_id: prospectId }),
});
```

### **2. Changement de statut** (À venir)

**Trigger** : `status_changed`

**Quand** : Le statut d'un prospect change (new → contacted, contacted → qualified, etc.)

**Exemple de workflow** :
```
SI statut = "qualified" :
  1. ✉️ Envoyer proposition commerciale
  2. 🏷️ Ajouter tag "Prospect qualifié"
  3. 🔔 Notifier l'équipe commerciale
```

### **3. Tag ajouté** (À venir)

**Trigger** : `tag_added`

**Quand** : Un tag spécifique est ajouté au prospect

**Exemple** :
```
SI tag = "Urgente" :
  1. 🔔 Notifier l'équipe immédiatement
  2. ✅ Créer tâche prioritaire
```

### **4. Inactivité** (À venir)

**Trigger** : `inactivity`

**Quand** : Aucune action depuis X jours

**Exemple** :
```
SI inactif depuis 7 jours :
  1. ✉️ Email de réengagement
  2. 🏷️ Ajouter tag "Réengagement"
```

---

## ⚙️ ACTIONS DISPONIBLES

### **1. ✉️ Envoyer un email** - FONCTIONNEL ✅

**Ce qui se passe** :
1. Récupère le template d'email sélectionné
2. Remplace toutes les variables `{{prospect.*}}` par les vraies données
3. Envoie l'email au prospect (via SMTP configuré)
4. Log l'envoi dans l'historique

**Configuration** :
- Template d'email (obligatoire)
- Délai avant envoi (optionnel)

**Résultat** :
```
✅ Email envoyé : "Bienvenue chez YOJOB" à jean.dupont@example.com
```

---

### **2. ✅ Créer une tâche** - FONCTIONNEL ✅

**Ce qui se passe** :
1. Crée une vraie tâche dans la table `tasks` de Supabase
2. Associe la tâche au prospect
3. Remplace les variables dans le titre et la description
4. Assigne à un utilisateur (optionnel)

**Configuration** :
- Titre de la tâche
- Description
- Priorité (low, medium, high)
- Assigné à (optionnel)
- Date d'échéance (optionnelle)

**Résultat** :
```sql
INSERT INTO tasks (
  title: "Appeler Jean Dupont (ACME Construction SARL)",
  prospect_id: "uuid-123",
  status: "todo",
  priority: "high"
)
```

---

### **3. 🏷️ Ajouter un tag** - FONCTIONNEL ✅

**Ce qui se passe** :
1. Ajoute un tag au tableau `tags` du prospect
2. Met à jour la base de données Supabase
3. Ne crée pas de doublon si le tag existe déjà

**Configuration** :
- Tag à ajouter (ex: "Nurturing", "VIP", "Urgent")

**Résultat** :
```sql
UPDATE prospects 
SET tags = ['Nurturing', 'VIP'] 
WHERE id = 'uuid-123'
```

---

### **4. 🔄 Changer le statut** - FONCTIONNEL ✅

**Ce qui se passe** :
1. Change le statut du prospect dans Supabase
2. Log le changement dans l'historique
3. Peut déclencher d'autres workflows (trigger `status_changed`)

**Configuration** :
- Nouveau statut (new, contacted, qualified, converted, lost)

**Résultat** :
```sql
UPDATE prospects 
SET status = 'contacted' 
WHERE id = 'uuid-123'
```

---

### **5. 🔔 Notifier l'équipe** - FONCTIONNEL ✅

**Ce qui se passe** :
1. Envoie une notification à l'équipe (Slack, email interne, etc.)
2. Log la notification

**Configuration** :
- Message de notification (avec variables dynamiques)

**Résultat** :
```
🔔 Notification envoyée : "Nouveau prospect VIP : Jean Dupont (ACME Construction SARL)"
```

---

### **6. 🌐 Appeler un webhook** - FONCTIONNEL ✅

**Ce qui se passe** :
1. Envoie les données du prospect à une URL externe
2. Permet l'intégration avec d'autres systèmes (CRM, Zapier, Make, etc.)

**Configuration** :
- URL du webhook

**Payload envoyé** :
```json
{
  "prospect": {
    "id": "uuid-123",
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "company": "ACME Construction SARL",
    ...
  },
  "workflow_id": "wf-123",
  "workflow_name": "Nurturing Waitlist",
  "timestamp": "2026-01-04T10:30:00Z"
}
```

---

## 🎯 ÉVALUATION DES CONDITIONS

Les workflows peuvent avoir des **conditions** pour filtrer les prospects :

### **Opérateurs disponibles** :
- `equals` : Égal à
- `not_equals` : Différent de
- `contains` : Contient
- `greater_than` : Supérieur à
- `less_than` : Inférieur à
- `is_empty` : Vide
- `is_not_empty` : Non vide

### **Exemples de conditions** :

```javascript
// Uniquement les prospects France avec plus de 10 travailleurs
conditions: [
  { field: 'country', operator: 'equals', value: 'France' },
  { field: 'workers_count', operator: 'greater_than', value: 10 }
]

// Uniquement les prospects BTP ou Industrie
conditions: [
  { field: 'industry_sector', operator: 'contains', value: 'BTP' }
]

// Uniquement les prospects sans entreprise (particuliers)
conditions: [
  { field: 'company_name', operator: 'is_empty' }
]
```

Si un prospect ne correspond pas aux conditions, le workflow **ne s'exécute pas**.

---

## 📊 STATISTIQUES & LOGS

### **Logs détaillés** :
Chaque action d'un workflow est **loggée** dans la table `automation_logs` :

```sql
{
  workflow_id: "wf-123",
  run_id: "run-456",
  step_id: "step-1",
  prospect_id: "uuid-789",
  status: "success",
  action_type: "send_email",
  message: "Email envoyé: \"Bienvenue chez YOJOB\" à jean.dupont@example.com",
  timestamp: "2026-01-04T10:30:00Z"
}
```

### **Statistiques des workflows** :
Chaque workflow track ses performances :

```typescript
{
  total_runs: 145,        // Nombre total d'exécutions
  success_runs: 138,      // Exécutions réussies
  failed_runs: 7,         // Exécutions échouées
  conversion_rate: 95%    // Taux de succès
}
```

---

## 🧪 TESTER UN WORKFLOW

### **Mode Test** :
Vous pouvez tester n'importe quel workflow avec des **données fictives** avant de l'activer :

**Endpoint** : `POST /workflow-engine/test/:workflow_id`

**Résultat** :
```json
{
  "success": true,
  "test_prospect": {
    "name": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "company": "Test Company SARL",
    ...
  },
  "results": [
    {
      "step_id": "step-1",
      "step_type": "send_email",
      "success": true,
      "message": "Email envoyé"
    },
    {
      "step_id": "step-2",
      "step_type": "create_task",
      "success": true,
      "message": "Tâche créée"
    }
  ]
}
```

---

## 🎬 EXÉCUTION MANUELLE

Vous pouvez aussi **exécuter manuellement** un workflow sur un prospect spécifique :

**Endpoint** : `POST /workflow-engine/execute/:workflow_id/:prospect_id`

**Résultat** :
```json
{
  "success": true,
  "message": "Workflow \"Nurturing Waitlist\" exécuté avec succès",
  "results": {
    "steps_completed": 4,
    "emails_sent": 2,
    "tasks_created": 1,
    "tags_added": 1
  }
}
```

---

## 📋 EXEMPLE COMPLET : WORKFLOW NURTURING

Voici un workflow complet qui s'exécute automatiquement :

### **Configuration** :
```typescript
{
  name: "Nurturing Waitlist",
  status: "active",
  trigger: {
    type: "prospect_created"
  },
  conditions: [
    { field: "source", operator: "equals", value: "landing_waitlist" }
  ],
  steps: [
    {
      type: "send_email",
      delay_minutes: 0,
      config: {
        template_id: "tpl-welcome"
      }
    },
    {
      type: "add_tag",
      delay_minutes: 0,
      config: {
        tag: "Waitlist"
      }
    },
    {
      type: "send_email",
      delay_minutes: 1440, // 24h
      config: {
        template_id: "tpl-nurturing-day1"
      }
    },
    {
      type: "create_task",
      delay_minutes: 2880, // 48h
      config: {
        title: "Recontacter {{prospect.name}} ({{prospect.company}})",
        priority: "medium"
      }
    }
  ]
}
```

### **Déroulement** :

1. **T+0min** : Jean Dupont s'inscrit sur la liste d'attente
   - ✅ Prospect créé dans Supabase
   - 🚀 Workflow "Nurturing Waitlist" déclenché automatiquement

2. **T+0min** : Étape 1
   - ✉️ Email de bienvenue envoyé immédiatement
   - Variables remplacées : "Bonjour Jean Dupont, ..."

3. **T+0min** : Étape 2
   - 🏷️ Tag "Waitlist" ajouté au prospect

4. **T+24h** : Étape 3
   - ✉️ Email de nurturing J+1 envoyé
   - "Voici les nouveautés de notre marketplace..."

5. **T+48h** : Étape 4
   - ✅ Tâche créée pour le commercial
   - Titre : "Recontacter Jean Dupont (ACME Construction SARL)"

---

## 🔐 SÉCURITÉ & FIABILITÉ

### **Gestion des erreurs** :
- ✅ Si un email échoue, le workflow continue avec les autres étapes
- ✅ Toutes les erreurs sont loggées
- ✅ Les workflows peuvent être réessayés manuellement

### **Rate limiting** :
- ✅ Les délais entre les étapes évitent le spam
- ✅ Respect des limites SMTP

### **Data privacy** :
- ✅ Conformité RGPD : lien de désinscription automatique dans chaque email
- ✅ Données chiffrées en base Supabase

---

## 🎨 INTERFACE UTILISATEUR

### **Page Automations** :
- ✅ Vue d'ensemble des workflows (actifs, brouillon, en pause)
- ✅ Créer / éditer / supprimer des workflows
- ✅ Dupliquer un workflow existant
- ✅ Voir l'historique des versions

### **Page Templates** :
- ✅ Créer / éditer des templates d'emails
- ✅ Support multi-langues (FR, EN, DE, ES, PL, RO)
- ✅ Éditeur HTML + Texte brut
- ✅ Prévisualisation en temps réel

### **Page Exécutions** :
- ✅ Historique de toutes les exécutions
- ✅ Filtrer par workflow, statut, date
- ✅ Logs détaillés par étape
- ✅ Annuler une exécution en cours

---

## 🚀 PROCHAINES FONCTIONNALITÉS

### **En développement** :
- [ ] Déclencheur `status_changed` automatique
- [ ] Déclencheur `tag_added` automatique
- [ ] Déclencheur `inactivity` avec CRON
- [ ] A/B testing des emails
- [ ] Scoring automatique des leads avant envoi
- [ ] Intégration SMS (Twilio)
- [ ] Conditions avancées (ET / OU logiques)

---

## 📞 SUPPORT

Pour toute question sur les workflows :
1. Consultez les logs d'exécution dans l'interface
2. Testez d'abord en mode "brouillon" avec données fictives
3. Vérifiez que la configuration SMTP est correcte (onglet Paramètres)

**Les workflows sont maintenant 100% opérationnels et utilisent les vraies données de votre application !** 🎉
