# 🎯 Workflows Prêts à l'Emploi - YOJOB

## Workflows Spécifiques pour Étude de Marché & Devis

---

## 📊 **Catégorie 1 : Nurturing Liste d'Attente Marketplace**

### Workflow 1.1 : Nurturing Standard (14 jours)

**Objectif** : Engager les inscrits waitlist sur 2 semaines

**Trigger** : Nouveau prospect créé
**Conditions** : Type = "waitlist"

**Étapes** :
```typescript
{
  name: "Waitlist - Nurturing Standard",
  steps: [
    // J+0 : Confirmation immédiate
    {
      delay: 0,
      action: "send_email",
      template: {
        subject: "🎉 Bienvenue sur la liste d'attente YOJOB !",
        body: `
          Bonjour {{prospect.name}},
          
          Merci de votre intérêt pour notre marketplace européenne de recrutement !
          
          ✅ Votre inscription est confirmée
          🎯 Vous serez parmi les premiers informés du lancement
          🎁 Accès anticipé + offre de lancement réservée
          
          À très bientôt,
          L'équipe YOJOB
        `
      }
    },
    
    // J+3 : Proposition de valeur
    {
      delay: 4320, // 3 jours en minutes
      action: "send_email",
      template: {
        subject: "Comment YOJOB révolutionne le recrutement européen",
        body: `
          Bonjour {{prospect.name}},
          
          Vous vous demandez peut-être ce qui rend YOJOB unique ?
          
          🌍 500+ agences partenaires dans 27 pays
          ⚡ Matching instantané entre vos besoins et les candidats
          ✅ Conformité légale garantie dans chaque pays
          💰 Transparence totale des tarifs
          
          👉 [Découvrir notre vision en vidéo]
          
          À bientôt,
          L'équipe YOJOB
        `
      }
    },
    
    // J+7 : Social proof
    {
      delay: 10080, // 7 jours
      action: "send_email",
      template: {
        subject: "📊 AgriTech a recruté 50 saisonniers en 3 semaines",
        body: `
          Bonjour {{prospect.name}},
          
          Laissez-moi vous partager une success story :
          
          AgriTech Solutions cherchait 50 travailleurs saisonniers pour 
          la récolte dans 3 pays (France, Espagne, Portugal).
          
          Grâce à notre réseau :
          ✅ 50 candidats recrutés en 3 semaines
          ✅ Conformité 100% dans les 3 pays
          ✅ Économie de 40% vs. cabinet traditionnel
          
          👉 [Lire le cas complet]
          
          Vous aussi, profitez bientôt de notre marketplace !
          
          L'équipe YOJOB
        `
      }
    },
    
    // J+14 : Urgence + CTA
    {
      delay: 20160, // 14 jours
      action: "send_email",
      template: {
        subject: "⏰ Dernier rappel - Lancement imminent !",
        body: `
          Bonjour {{prospect.name}},
          
          Le lancement de la marketplace YOJOB approche à grands pas !
          
          🎁 OFFRE SPÉCIALE pour les premiers inscrits :
          - 3 mois gratuits sur l'abonnement Premium
          - Accompagnement personnalisé au démarrage
          - Accès prioritaire aux meilleures agences
          
          👉 [Réserver mon offre de lancement]
          
          Plus que quelques places disponibles !
          
          À très vite,
          L'équipe YOJOB
        `
      }
    }
  ]
}
```

**KPIs attendus** :
- Taux d'ouverture : 45-55%
- Taux de clic : 12-18%
- Conversion waitlist → clients au lancement : 10-15%

---

### Workflow 1.2 : Segmentation Géographique

**Objectif** : Adapter le message selon le pays du prospect

**Trigger** : Nouveau prospect créé
**Conditions** : Type = "waitlist" + Pays spécifique

#### Variant France
```typescript
{
  name: "Waitlist France - Focus Conformité",
  conditions: [
    { field: 'type', operator: 'equals', value: 'waitlist' },
    { field: 'country', operator: 'equals', value: 'France' }
  ],
  steps: [
    {
      action: "send_email",
      template: {
        subject: "🇫🇷 Simplifiez votre recrutement européen depuis la France",
        body: `
          Bonjour {{prospect.name}},
          
          En tant qu'entreprise française, vous connaissez les défis :
          - Détachement de travailleurs (directive 96/71/CE)
          - Déclaration A1
          - Respect du salaire minimum local
          
          YOJOB gère tout cela pour vous !
          
          ✅ Conformité automatique dans les 27 pays UE
          ✅ Veille réglementaire continue
          ✅ Support juridique inclus
          
          Rejoignez la marketplace dès le lancement.
        `
      }
    }
  ]
}
```

#### Variant Pologne
```typescript
{
  name: "Waitlist Pologne - Focus Coût",
  conditions: [
    { field: 'type', operator: 'equals', value: 'waitlist' },
    { field: 'country', operator: 'equals', value: 'Pologne' }
  ],
  steps: [
    {
      action: "send_email",
      template: {
        subject: "🇵🇱 Rozwijaj swoją firmę w całej Europie z YOJOB",
        body: `
          Dzień dobry {{prospect.name}},
          
          Chcesz rozszerzyć działalność poza Polskę?
          
          YOJOB to marketplace łączący polskie agencje z klientami w całej Europie:
          
          ✅ Dostęp do tysięcy ofert w 27 krajach
          ✅ Transparentne stawki
          ✅ Płatności zabezpieczone
          
          Dołącz do listy oczekujących już teraz!
        `
      }
    }
  ]
}
```

---

### Workflow 1.3 : Ré-engagement Waitlist Inactive

**Objectif** : Réactiver les inscrits waitlist qui n'ouvrent pas les emails

**Trigger** : Inactivité 14 jours
**Conditions** : 
- Type = "waitlist"
- Aucun email ouvert depuis 14 jours
- Statut ≠ "converted"

```typescript
{
  name: "Waitlist - Réactivation Inactifs",
  trigger: {
    type: "inactivity",
    days: 14
  },
  conditions: [
    { field: 'type', operator: 'equals', value: 'waitlist' },
    { field: 'status', operator: 'not_equals', value: 'converted' }
  ],
  steps: [
    {
      action: "send_email",
      template: {
        subject: "{{prospect.name}}, vous nous manquez... 💔",
        body: `
          Bonjour {{prospect.name}},
          
          On a remarqué que vous n'avez pas ouvert nos derniers emails.
          
          Pas grave ! On reste à votre disposition 😊
          
          ❓ Avez-vous encore besoin d'aide pour recruter en Europe ?
          
          👉 [Oui, je suis toujours intéressé(e)]
          👉 [Non, me désinscrire]
          
          Pas de pression, on reste là si vous changez d'avis !
          
          Bonne journée,
          L'équipe YOJOB
        `
      }
    },
    {
      delay: 10080, // 7 jours après
      action: "send_email",
      template: {
        subject: "Dernière chance - Offre exclusive waitlist",
        body: `
          {{prospect.name}},
          
          On ne voulait pas que vous ratiez ça :
          
          🎁 OFFRE EXCEPTIONNELLE (48h restantes)
          - 6 mois gratuits au lieu de 3
          - Formation gratuite à la plateforme
          - Garantie satisfaction 30 jours
          
          Uniquement pour les 50 premiers !
          
          👉 [Je réserve mon offre maintenant]
          
          À très vite (on l'espère) !
          YOJOB
        `
      }
    }
  ]
}
```

---

## 💼 **Catégorie 2 : Relance Demandes de Devis**

### Workflow 2.1 : Relance Standard Devis

**Objectif** : Convertir les demandes de devis en clients

**Trigger** : Nouveau prospect créé
**Conditions** : Type = "client"

```typescript
{
  name: "Client - Relance Devis Standard",
  trigger: { type: "prospect_created" },
  conditions: [
    { field: 'type', operator: 'equals', value: 'client' }
  ],
  steps: [
    // J+0 : Confirmation immédiate
    {
      delay: 0,
      action: "send_email",
      template: {
        subject: "✅ Demande de devis reçue - {{prospect.company}}",
        body: `
          Bonjour {{prospect.name}},
          
          Merci pour votre demande de recrutement !
          
          📋 RÉCAPITULATIF DE VOTRE BESOIN :
          - Entreprise : {{prospect.company}}
          - Secteur : {{prospect.industry}}
          - Nombre de travailleurs : {{prospect.workers_count}}
          - Pays ciblé : {{prospect.country}}
          
          ⏰ Nos experts analysent votre besoin et reviendront vers vous 
          sous 24h avec une proposition commerciale détaillée.
          
          En attendant, découvrez comment YOJOB simplifie le recrutement 
          européen : [Voir la vidéo]
          
          À très vite,
          {{sender_name}}
          YOJOB
        `
      }
    },
    
    // J+0 : Notification équipe
    {
      delay: 0,
      action: "create_task",
      config: {
        title: "🔥 NOUVEAU DEVIS - {{prospect.company}}",
        description: `
          Besoin : {{prospect.workers_count}} travailleurs
          Secteur : {{prospect.industry}}
          Budget estimé : {{prospect.quote_amount}} €
          
          ACTION : Préparer devis personnalisé sous 24h
        `,
        type: "quote",
        priority: "high",
        due_date: "+1 day"
      }
    },
    
    // J+2 : Première relance si pas de réponse
    {
      delay: 2880, // 2 jours
      action: "send_email",
      template: {
        subject: "Suite à votre demande de recrutement",
        body: `
          Bonjour {{prospect.name}},
          
          Je reviens vers vous concernant votre besoin de 
          {{prospect.workers_count}} travailleurs.
          
          💡 BONNE NOUVELLE : Nous avons plusieurs agences partenaires 
          disponibles dans votre secteur ({{prospect.industry}}) !
          
          📊 Voici une estimation rapide :
          - Coût moyen : {{prospect.quote_amount}} €/mois
          - Délai de recrutement : 2-3 semaines
          - Conformité incluse
          
          🗓️ Seriez-vous disponible pour un call de 15 minutes cette 
          semaine pour finaliser votre devis personnalisé ?
          
          👉 [Réserver un créneau]
          
          Cordialement,
          {{sender_name}}
          {{sender_phone}}
        `
      }
    },
    
    // J+5 : Relance avec urgence
    {
      delay: 7200, // 5 jours
      action: "send_email",
      template: {
        subject: "{{prospect.company}} - Dernière relance devis",
        body: `
          Bonjour {{prospect.name}},
          
          Je n'ai pas eu de retour de votre part concernant votre besoin 
          de recrutement.
          
          ❓ Y a-t-il quelque chose qui vous bloque ?
          - Budget ?
          - Délais ?
          - Questions sur la conformité ?
          
          Je suis là pour répondre à toutes vos questions !
          
          ⚠️ ATTENTION : Les agences de qualité sont très sollicitées 
          en ce moment. Plus on attend, plus les délais s'allongent.
          
          👉 Appelez-moi directement : {{sender_phone}}
          
          Ou répondez à cet email, je suis dispo !
          
          Cordialement,
          {{sender_name}}
        `
      }
    },
    
    // J+7 : Tâche call final
    {
      delay: 10080, // 7 jours
      action: "create_task",
      config: {
        title: "☎️ CALL CLOSING - {{prospect.company}}",
        description: "Dernier call avant clôture du dossier",
        type: "call",
        priority: "high"
      }
    },
    
    // J+10 : Email final
    {
      delay: 14400, // 10 jours
      action: "send_email",
      template: {
        subject: "On clôture votre dossier ?",
        body: `
          Bonjour {{prospect.name}},
          
          N'ayant pas eu de retour, je vais clôturer votre dossier.
          
          Mais pas de souci ! Si vous avez toujours besoin de recruter, 
          contactez-moi à tout moment :
          
          📧 {{sender_email}}
          📞 {{sender_phone}}
          
          Je garde votre demande en archive et peux la réactiver en 
          quelques clics 😊
          
          Bonne continuation,
          {{sender_name}}
        `
      }
    },
    
    // J+10 : Changer statut
    {
      delay: 14400,
      action: "change_status",
      config: {
        new_status: "lost",
        reason: "Pas de réponse après 10 jours"
      }
    }
  ]
}
```

---

### Workflow 2.2 : Urgence BTP (Secteur Spécifique)

**Objectif** : Traiter rapidement les demandes BTP (secteur à fort volume)

**Trigger** : Nouveau prospect créé
**Conditions** : 
- Type = "client"
- Secteur = "BTP"

```typescript
{
  name: "Client BTP - Traitement Urgent",
  conditions: [
    { field: 'type', operator: 'equals', value: 'client' },
    { field: 'industry_sector', operator: 'equals', value: 'BTP' }
  ],
  steps: [
    // Immédiat : Email + SMS
    {
      delay: 0,
      action: "send_email",
      template: {
        subject: "🚧 BTP - Devis prioritaire en cours",
        body: `
          Bonjour {{prospect.name}},
          
          Demande BTP détectée → Traitement prioritaire activé !
          
          Nous savons que dans le BTP, chaque jour compte.
          
          ⚡ ENGAGEMENT : Devis personnalisé sous 4H (ouvrées)
          
          Notre expert BTP {{sender_name}} prend en charge votre dossier.
          
          À très vite !
        `
      }
    },
    
    // Immédiat : Notif Slack équipe BTP
    {
      delay: 0,
      action: "notify_team",
      config: {
        channel: "#devis-btp-urgent",
        message: `
          🚨 NOUVEAU DEVIS BTP URGENT
          
          Client : {{prospect.company}}
          Besoin : {{prospect.workers_count}} travailleurs
          Projet : {{prospect.project_description}}
          
          → Traiter sous 4H !
        `
      }
    },
    
    // 4H : Si pas traité, escalade
    {
      delay: 240, // 4 heures
      action: "notify_team",
      config: {
        channel: "#management",
        message: `
          ⚠️ ALERTE : Devis BTP non traité depuis 4H
          Client : {{prospect.company}}
          
          → Intervention manager requise
        `
      }
    }
  ]
}
```

---

### Workflow 2.3 : Devis Gros Volume (>50 travailleurs)

**Objectif** : Accompagnement VIP pour gros contrats

**Trigger** : Nouveau prospect créé
**Conditions** :
- Type = "client"
- workers_count > 50

```typescript
{
  name: "Client VIP - Gros Volume",
  conditions: [
    { field: 'type', operator: 'equals', value: 'client' },
    { field: 'workers_count', operator: 'greater_than', value: 50 }
  ],
  steps: [
    {
      delay: 0,
      action: "send_email",
      template: {
        subject: "🏆 Demande VIP détectée - Accompagnement personnalisé",
        body: `
          Bonjour {{prospect.name}},
          
          Votre besoin de {{prospect.workers_count}} travailleurs a été 
          identifié comme prioritaire.
          
          🎯 ACCOMPAGNEMENT VIP ACTIVÉ :
          ✅ Account Manager dédié
          ✅ Devis sous 12H
          ✅ Négociation tarifs préférentiels
          ✅ Support 7j/7 pendant le projet
          
          Je vous appelle personnellement dans les 2H.
          
          {{sender_name}}
          Directeur Commercial YOJOB
          {{sender_phone}}
        `
      }
    },
    
    {
      delay: 0,
      action: "create_task",
      config: {
        title: "🏆 VIP - CALL IMMÉDIAT - {{prospect.company}}",
        assignee: "directeur_commercial",
        priority: "urgent"
      }
    },
    
    {
      delay: 0,
      action: "add_tag",
      config: {
        tags: ["VIP", "Gros Volume", "Priorité Max"]
      }
    }
  ]
}
```

---

## 🔄 **Catégorie 3 : Workflows Mixtes (Étude + Devis)**

### Workflow 3.1 : Conversion Waitlist → Client

**Objectif** : Transformer un inscrit waitlist en client actif

**Trigger** : Tag ajouté "Intéressé Devis"
**Conditions** : Type = "waitlist"

```typescript
{
  name: "Conversion Waitlist → Client",
  trigger: { type: "tag_added", tag: "Intéressé Devis" },
  conditions: [
    { field: 'type', operator: 'equals', value: 'waitlist' }
  ],
  steps: [
    {
      delay: 0,
      action: "send_email",
      template: {
        subject: "🎉 Passez à l'action avec YOJOB !",
        body: `
          Bonjour {{prospect.name}},
          
          Vous avez manifesté votre intérêt pour un devis personnalisé.
          
          Génial ! Parlons de votre projet de recrutement.
          
          👉 [Demander un devis en 2 minutes]
          
          Ou appelez-moi directement : {{sender_phone}}
          
          À très vite,
          {{sender_name}}
        `
      }
    },
    
    {
      delay: 0,
      action: "change_status",
      config: {
        new_status: "interested"
      }
    },
    
    {
      delay: 0,
      action: "create_task",
      config: {
        title: "🔥 Hot Lead - Call {{prospect.company}}",
        priority: "high"
      }
    }
  ]
}
```

---

## 📊 **Dashboard de Suivi**

### KPIs à Tracker par Workflow

```typescript
// Exemple de statistiques attendues

Workflow "Waitlist - Nurturing Standard" :
├─ Prospects entrés : 500
├─ Email 1 (J+0) : Taux ouverture 65%, Taux clic 12%
├─ Email 2 (J+3) : Taux ouverture 48%, Taux clic 18%
├─ Email 3 (J+7) : Taux ouverture 42%, Taux clic 22%
├─ Email 4 (J+14) : Taux ouverture 38%, Taux clic 28%
└─ Conversion finale : 15% (75 clients)

Workflow "Client - Relance Devis Standard" :
├─ Prospects entrés : 150
├─ Devis envoyés : 145 (96%)
├─ Relance J+2 nécessaire : 80 (53%)
├─ Relance J+5 nécessaire : 35 (23%)
└─ Conversion finale : 40 clients (26%)

Workflow "Client VIP - Gros Volume" :
├─ Prospects entrés : 12
├─ Call effectués < 2H : 100%
├─ Devis envoyés < 12H : 100%
└─ Conversion finale : 10 clients (83%)
```

---

## 🎯 **Checklist Avant Lancement**

### Avant d'activer un workflow :

✅ **Template d'email créé** avec tous les champs personnalisés
✅ **Variables testées** ({{prospect.name}}, etc.)
✅ **Délais configurés** (cohérents avec le parcours client)
✅ **Conditions validées** (bon ciblage)
✅ **Équipe notifiée** (qui reçoit les tâches ?)
✅ **Test sur 1-2 prospects** avant activation globale
✅ **Tracking configuré** (ouvertures, clics)
✅ **Désabonnement prévu** dans tous les emails

---

**Tous ces workflows sont prêts à être créés dans votre interface Automations ! 🚀**

Voulez-vous que j'en implémente un en particulier ?
