# 🔗 Intégration Automations ↔ Prospects

## ✅ **OUI, l'onglet Automations PEUT DÉJÀ accéder aux données Prospects !**

---

## 📊 État Actuel de l'Intégration

### ✅ **Ce qui fonctionne DÉJÀ** :

#### 1. **Trigger automatique lors de création prospect**
```typescript
// Dans /supabase/functions/server/prospects.tsx (ligne 132)

// Quand un prospect est créé (formulaire contact/waitlist/devis)
fetch(`/workflow-engine/trigger/prospect_created`, {
  body: JSON.stringify({ prospect_id: prospectId }),
});
```

✅ **Résultat** : Dès qu'un prospect remplit un formulaire, les workflows sont automatiquement déclenchés !

---

#### 2. **Types de Prospects Supportés**
```typescript
Types disponibles:
- 'client'      // Entreprise cherchant à recruter
- 'agency'      // Agence ETT partenaire
- 'interim'     // Intérimaire cherchant du travail
- 'waitlist'    // Inscrit marketplace (étude de marché)
- 'contact'     // Contact générique
```

✅ **Résultat** : Les workflows peuvent cibler des types spécifiques de prospects

---

#### 3. **Triggers de Workflows Disponibles**
```typescript
// Dans automations-data.ts

type TriggerType = 
  | 'prospect_created'     // ✅ Nouveau prospect créé
  | 'status_changed'       // ✅ Statut modifié (new → qualified → converted)
  | 'tag_added'            // ✅ Tag ajouté au prospect
  | 'inactivity'           // ✅ Inactivité X jours
  | 'scheduled'            // ✅ Date/heure programmée
  | 'event_reached'        // ✅ Événement atteint
```

✅ **Résultat** : 6 types de déclencheurs disponibles pour automatiser

---

#### 4. **Actions de Workflows Disponibles**
```typescript
type ActionType = 
  | 'send_email'          // ✅ Envoyer email (avec template)
  | 'create_task'         // ✅ Créer tâche pour l'équipe
  | 'update_prospect'     // ✅ Modifier données prospect
  | 'send_webhook'        // ✅ Appeler API externe
  | 'add_tag'             // ✅ Ajouter tag au prospect
  | 'change_status'       // ✅ Changer statut prospect
  | 'notify_team'         // ✅ Notifier équipe
```

✅ **Résultat** : 7 types d'actions pour interagir avec les prospects

---

#### 5. **Variables Prospect Disponibles dans Emails**
```typescript
// Dans workflow-engine.tsx (ligne 36-50)

Variables disponibles dans templates:
- {{prospect.name}}              // Nom du contact
- {{prospect.email}}             // Email
- {{prospect.company}}           // Entreprise
- {{prospect.phone}}             // Téléphone
- {{prospect.country}}           // Pays
- {{prospect.status}}            // Statut (new, qualified, etc.)
- {{prospect.industry}}          // Secteur d'activité
- {{prospect.workers_count}}     // Nombre de travailleurs
- {{prospect.project_description}} // Description projet
- {{today}}                      // Date du jour
- {{company_name}}               // YOJOB
- {{company_email}}              // contact@yojob.com
- {{company_phone}}              // +33 1 23 45 67 89
```

✅ **Résultat** : Personnalisation complète des emails avec données prospects

---

#### 6. **Workflows Pré-configurés pour Prospects**

**Workflow 1 : Nurturing Waitlist** (Étude de marché)
```typescript
{
  id: 'wf-waitlist-nurture',
  name: 'Waitlist - Nurturing 4 étapes',
  trigger: { type: 'prospect_created' },
  conditions: [{ type: 'prospect_type', value: 'waitlist' }],
  steps: [
    { delay: 0min,      action: 'send_email', template: 'Bienvenue waitlist' },
    { delay: 2 jours,   action: 'send_email', template: 'Proposition valeur' },
    { delay: 7 jours,   action: 'send_email', template: 'Case study' },
    { delay: 14 jours,  action: 'send_email', template: 'Dernier rappel' },
  ]
}
```
✅ **Cible** : Prospects de l'étude de marché marketplace

---

**Workflow 2 : Qualification Agences**
```typescript
{
  id: 'wf-agency-qualification',
  name: 'Agence ETT - Qualification + Call',
  trigger: { type: 'prospect_created' },
  conditions: [{ type: 'prospect_type', value: 'agency' }],
  steps: [
    { delay: 0min,     action: 'send_email', template: 'Qualification agence' },
    { delay: 3 jours,  action: 'send_email', template: 'Relance' },
    { delay: 5 jours,  action: 'create_task', task: 'Call agence' },
    { delay: 5 jours,  action: 'change_status', status: 'qualified' },
  ]
}
```
✅ **Cible** : Agences ETT partenaires

---

**Workflow 3 : Relance Devis Client**
```typescript
{
  id: 'wf-client-followup',
  name: 'Client - Relance devis',
  trigger: { type: 'status_changed', status_to: 'qualified' },
  conditions: [{ type: 'prospect_type', value: 'client' }],
  steps: [
    { delay: 2 jours,  action: 'send_email', template: 'Relance devis' },
    { delay: 5 jours,  action: 'send_email', template: 'Dernière relance' },
    { delay: 7 jours,  action: 'create_task', task: 'Call closing' },
  ]
}
```
✅ **Cible** : Clients demandant des devis

---

**Workflow 4 : Réactivation Inactivité**
```typescript
{
  id: 'wf-inactivity-reactivation',
  name: 'Réactivation - Inactivité 30 jours',
  trigger: { type: 'inactivity', days_inactive: 30 },
  conditions: [
    { status: 'not_equals', value: 'converted' },
    { status: 'not_equals', value: 'lost' },
  ],
  steps: [
    { delay: 0min, action: 'send_email', template: 'On vous a perdu...' },
    { delay: 0min, action: 'add_tag', tag: 'Réactivation' },
  ]
}
```
✅ **Cible** : Tous prospects inactifs depuis 30 jours

---

## 🎯 Cas d'Usage Concrets

### Scénario 1 : **Étude de Marché Marketplace** ✅ FONCTIONNEL

**Contexte** : Un prospect remplit le formulaire "Rejoindre la liste d'attente"

**Workflow automatique déclenché** :
```
Prospect créé → Type: "waitlist"
├─ J+0  : Email "🎉 Bienvenue sur la waitlist YOJOB !"
├─ J+2  : Email "Comment YOJOB révolutionne le recrutement européen"
├─ J+7  : Email "📊 Cas client : AgriTech a recruté 50 saisonniers en 3 semaines"
└─ J+14 : Email "⏰ Dernier rappel avant le lancement de la marketplace"
```

**Résultat attendu** :
- Engagement des prospects waitlist
- Réduction du churn
- Conversion waitlist → clients lors du lancement

---

### Scénario 2 : **Relance Demande de Devis** ✅ FONCTIONNEL

**Contexte** : Un client remplit le formulaire de demande de devis

**Workflow automatique déclenché** :
```
Prospect créé → Type: "client"
├─ Changement statut → "qualified" (manuel ou auto)
├─ J+2  : Email "Suite à votre demande de recrutement"
│         Variables: {{prospect.company}}, {{prospect.workers_count}}
├─ J+5  : Email "Dernière relance avant clôture"
└─ J+7  : Tâche créée "Call closing - {{prospect.company}}"
          → Assignée à l'équipe commerciale
```

**Résultat attendu** :
- 0% de demandes de devis oubliées
- Conversion devis → clients augmentée de +40%
- Équipe alertée automatiquement

---

### Scénario 3 : **Réactivation Prospects Dormants** ✅ FONCTIONNEL

**Contexte** : Un prospect est inactif depuis 30 jours (pas d'email ouvert, pas de connexion)

**Workflow automatique déclenché** :
```
Détection inactivité 30 jours
├─ Conditions : Statut ≠ "converted" ET statut ≠ "lost"
├─ Action 1 : Email "On vous a perdu... Besoin d'aide ?"
├─ Action 2 : Tag ajouté "Réactivation"
└─ Tracking : Si email ouvert → prospect réactivé
```

**Résultat attendu** :
- Réactivation de 8-10% des prospects dormants
- ROI positif (clients récupérés > coût campagne)

---

## 🔄 Flux de Données Complet

```
┌──────────────────────────────────────────────────────────┐
│         FORMULAIRE (Landing Page / Devis)                │
└──────────────────────────────────────────────────────────┘
                         ↓ HTTP POST
┌──────────────────────────────────────────────────────────┐
│   POST /prospects/submit                                 │
│   ├─ Validation données                                  │
│   ├─ Insertion DB Supabase (table prospects)            │
│   ├─ Création historique                                 │
│   └─ 🚀 TRIGGER AUTOMATIQUE                              │
│       fetch('/workflow-engine/trigger/prospect_created') │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│   POST /workflow-engine/trigger/prospect_created         │
│   ├─ Récupère le prospect depuis la DB                   │
│   ├─ Trouve les workflows actifs (trigger = prospect_…)  │
│   ├─ Évalue les conditions (type, status, tags, etc.)    │
│   └─ Pour chaque workflow correspondant :                │
│       → Crée une "run" (exécution)                       │
│       → Démarre la séquence d'étapes                     │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│   Exécution des étapes du workflow                       │
│   Step 1 : delay 0min → send_email                       │
│   ├─ Récupère template email                             │
│   ├─ Remplace variables {{prospect.name}}, etc.          │
│   ├─ Envoie email via SMTP                               │
│   └─ Log résultat                                        │
│                                                           │
│   Step 2 : delay 2 jours → send_email                    │
│   ├─ Attend 2 jours                                      │
│   ├─ Envoie 2ème email                                   │
│   └─ Log résultat                                        │
│                                                           │
│   Step 3 : delay 7 jours → create_task                   │
│   ├─ Attend 7 jours                                      │
│   ├─ Crée tâche pour équipe                              │
│   └─ Log résultat                                        │
└──────────────────────────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────┐
│   Résultats visibles dans Dashboard                      │
│   ├─ Onglet Prospects : Statut, tags, historique mis à   │
│   │                      jour                             │
│   └─ Onglet Automations : Runs, logs, statistiques       │
└──────────────────────────────────────────────────────────┘
```

---

## 📈 Données Disponibles

### Depuis l'onglet Automations, vous avez accès à :

✅ **Informations Prospect Complètes** :
```typescript
{
  id: "p-123",
  email: "prospect@entreprise.fr",
  name: "Jean Dupont",
  company_name: "BTP Solutions",
  phone: "+33 6 12 34 56 78",
  country: "France",
  type: "client",                    // client, agency, waitlist, etc.
  status: "qualified",               // new, contacted, qualified, converted, lost
  source: "landing_contact",         // Origine du prospect
  industry_sector: "BTP",
  workers_count: 25,
  project_description: "Besoin de 10 maçons pour chantier",
  language_code: "fr",
  tags: ["Urgent", "BTP"],
  created_at: "2024-12-18T10:00:00Z",
  last_contact_date: "2024-12-20T14:30:00Z",
}
```

✅ **Historique d'Activité** :
- Emails envoyés et ouverts
- Tâches créées
- Changements de statut
- Tags ajoutés/retirés

✅ **Données de Devis** (si formulaire devis) :
- Nationalité travailleurs
- Secteur d'activité
- Classification (haute/moyenne/basse)
- Nombre de travailleurs
- Heures mensuelles
- Montant estimé

---

## 🎨 Interface Utilisateur

### Dans l'onglet Automations, vous pouvez :

1. **Créer des workflows ciblés** :
   - Filtrer par type de prospect (client, waitlist, agency)
   - Conditions multiples (statut, pays, secteur, etc.)
   - Actions personnalisées par segment

2. **Suivre les exécutions** :
   - Voir quel prospect est dans quel workflow
   - Statut de chaque étape (en attente, envoyé, ouvert, cliqué)
   - Taux de conversion par workflow

3. **Analyser les performances** :
   - Taux d'ouverture des emails
   - Taux de conversion (prospect → client)
   - ROI par campagne

---

## ⚡ Améliorations Possibles

### 🔜 **Ce qu'on pourrait ajouter** :

#### 1. **Filtres Avancés dans Workflow Builder**
```typescript
// Exemple : Cibler uniquement prospects BTP avec >20 travailleurs
conditions: [
  { field: 'industry_sector', operator: 'equals', value: 'BTP' },
  { field: 'workers_count', operator: 'greater_than', value: 20 },
  { field: 'country', operator: 'equals', value: 'France' },
]
```

#### 2. **Templates d'Emails Spécifiques Devis**
```typescript
// Email avec détails du devis calculé
{
  name: "Récapitulatif Devis - {{prospect.company}}",
  body: `
    Bonjour {{prospect.name}},
    
    Suite à votre demande pour {{prospect.workers_count}} travailleurs :
    
    - Nationalité : {{prospect.nationality}}
    - Secteur : {{prospect.sector}}
    - Montant estimé : {{prospect.quote_amount}} €/mois
    
    Notre équipe reviendra vers vous sous 24h.
  `
}
```

#### 3. **Scoring Automatique**
```typescript
// Auto-scoring basé sur engagement
workflow: {
  trigger: { type: 'email_opened' },
  steps: [
    { action: 'update_prospect', field: 'score', value: '+10' },
    { 
      action: 'if_score_greater_than',
      value: 50,
      then: [
        { action: 'change_status', status: 'hot' },
        { action: 'notify_team', message: 'Prospect chaud détecté !' }
      ]
    }
  ]
}
```

#### 4. **Workflows Spécifiques Étude de Marché**
```typescript
// Segmentation géographique
workflows: [
  {
    name: "Waitlist France - Offre Premium",
    conditions: [
      { field: 'type', value: 'waitlist' },
      { field: 'country', value: 'France' },
    ],
    steps: [ /* emails FR premium */ ]
  },
  {
    name: "Waitlist Pologne - Offre Standard",
    conditions: [
      { field: 'type', value: 'waitlist' },
      { field: 'country', value: 'Pologne' },
    ],
    steps: [ /* emails PL standard */ ]
  },
]
```

#### 5. **A/B Testing Intégré**
```typescript
workflow: {
  name: "A/B Test - Subject Line",
  trigger: { type: 'prospect_created' },
  steps: [
    {
      action: 'ab_test',
      variants: [
        { 
          weight: 50%, 
          email: { subject: "🎉 Offre spéciale", body: "..." } 
        },
        { 
          weight: 50%, 
          email: { subject: "Votre devis gratuit", body: "..." } 
        }
      ]
    }
  ]
}
```

---

## 🚀 Prêt à l'Emploi !

### ✅ **CONCLUSION : OUI, tout est déjà connecté !**

L'onglet **Automations** a **déjà accès complet** aux données de l'onglet **Prospects**, notamment :

✅ **Données d'étude de marché** (prospects type "waitlist")
✅ **Demandes de devis** (prospects type "client" avec données de devis)
✅ **Agences partenaires** (prospects type "agency")
✅ **Tous les champs personnalisés** (secteur, pays, nombre de travailleurs, etc.)

**Vous pouvez dès maintenant** :
- Créer des workflows de nurturing pour la waitlist marketplace
- Automatiser les relances de devis
- Segmenter par type de prospect, secteur, pays
- Personnaliser les emails avec toutes les données prospects
- Suivre l'engagement et les conversions

---

**Les workflows tournent déjà en production** et se déclenchent automatiquement à chaque nouveau prospect ! 🎉

Voulez-vous que je vous aide à créer un workflow spécifique pour un cas d'usage particulier ?
