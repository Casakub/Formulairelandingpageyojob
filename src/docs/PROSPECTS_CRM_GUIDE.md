# 📊 GUIDE COMPLET - CRM PROSPECTS YOJOB

## 🎯 Vue d'ensemble

Module CRM complet intégré au dashboard YOJOB pour gérer tous les prospects collectés depuis la landing page et autres sources.

---

## ✅ Fonctionnalités Implémentées

### 1. **Formulaires Landing Page → CRM** ✅
- ✅ Formulaire "Rejoindre la liste d'attente" (Newsletter/Marketplace 2025)
- ✅ Formulaire "Contactez-nous" (Demande de devis)
- ✅ Auto-détection langue et pays
- ✅ Déduplication automatique (même email = mise à jour)

### 2. **Dashboard Prospects** ✅
- ✅ 4 Cartes KPI en temps réel
- ✅ Filtres par type (Client, Agence, Intérimaire, Waitlist)
- ✅ Recherche full-text (nom, email, entreprise)
- ✅ Tableau avec pagination
- ✅ Panneau latéral "Fiche prospect" avec historique complet

### 3. **Ajout Manuel de Prospects** ✅
- ✅ Dialog avec formulaire complet
- ✅ Sélection type (Client / Agence / Intérim / Waitlist)
- ✅ Validation des champs
- ✅ Enregistrement avec source `manual`

### 4. **Export Multi-Format** ✅
- ✅ Export CSV standard
- ✅ Export JSON (structure complète)
- ✅ Export CSV format HubSpot
- ✅ Respect des filtres actifs

### 5. **Scoring IA Automatique** ✅
- ✅ Analyse par Claude (Anthropic)
- ✅ Score 0-100 basé sur 5 critères :
  - Fit secteur (BTP/Industrie = prioritaire)
  - Taille projet (mots-clés volume)
  - Qualité lead (email pro, message détaillé)
  - Urgence (indicateurs temporels)
  - Budget potentiel
- ✅ Priorité auto (low/medium/high/urgent)
- ✅ Action recommandée
- ✅ Scoring batch (50 prospects à la fois)

### 6. **Intégrations CRM Externes** ✅
- ✅ **HubSpot** - API CRM Contacts
- ✅ **Salesforce** - API Leads
- ✅ **n8n** - Webhooks entrants
- ✅ **Zapier** - Webhooks génériques
- ✅ Mapping automatique des champs
- ✅ Logs d'intégration dans historique

---

## 📐 Architecture

```
Landing Page (Formulaires)
    ↓
Backend API (/prospects/submit)
    ↓
Base Supabase (prospects table)
    ↓
Dashboard (temps réel)
    ↓
Scoring IA + Intégrations
```

---

## 🗄️ Base de Données

### Table `prospects`
```sql
- id (UUID)
- type (client, agency, interim, waitlist, contact)
- source (landing_contact, landing_waitlist, manual, import)
- status (new, qualified, follow-up, proposal, won, lost)
- name, email*, phone, company
- country_code, language_code
- sector, need_type, message
- responsible_name, score, priority
- next_action_date, next_action_type, next_action_label
- custom_fields (JSONB - évolutif!)
- created_at, updated_at
- is_archived, is_newsletter_subscribed
```

### Table `prospect_actions`
```sql
- id (UUID)
- prospect_id (FK)
- action_type (call, email, meeting, note, status_change, form_submit, ai_scoring, integration)
- action_label, action_description
- user_name, metadata (JSONB)
- created_at
```

### Table `prospect_notes`
```sql
- id (UUID)
- prospect_id (FK)
- content, author_name
- is_pinned
- created_at, updated_at
```

### Vue `prospect_stats` (temps réel)
```sql
- total_active, total_clients, total_agencies, total_interims, total_waitlist
- total_new, total_qualified, total_won
- total_this_month
```

---

## 🔌 API Routes

### Gestion de Base
```
POST   /prospects/submit          # Créer/Mettre à jour prospect
GET    /prospects/list            # Lister avec filtres
GET    /prospects/stats           # Statistiques temps réel
GET    /prospects/:id             # Détails + actions + notes
PATCH  /prospects/:id             # Mettre à jour
DELETE /prospects/:id             # Archiver (soft delete)
```

### Actions & Notes
```
POST   /prospects/:id/action      # Ajouter une action
POST   /prospects/:id/note        # Ajouter une note
```

### Scoring IA
```
POST   /prospects/:id/score       # Scorer un prospect
POST   /prospects/score-batch     # Scorer en batch
```

### Intégrations
```
POST   /prospects/:id/integrations # Déclencher intégrations CRM
```

---

## 🤖 Scoring IA - Critères Détaillés

### 1. Fit Secteur (0-25 pts)
- **BTP** : 25 pts
- **Industrie** : 23 pts
- **Logistique** : 20 pts
- **Autres** : 10-15 pts

### 2. Taille Projet (0-25 pts)
Mots-clés détectés :
- "50+", "100+", "équipe importante" → 25 pts
- "10-50", "équipe", "chantier" → 20 pts
- "5-10", "mission" → 15 pts
- Aucune indication → 5 pts

### 3. Qualité Lead (0-25 pts)
- Email entreprise (@entreprise.com) : +10 pts
- Entreprise renseignée : +5 pts
- Message détaillé (>100 car) : +10 pts

### 4. Urgence (0-15 pts)
Mots-clés :
- "urgent", "ASAP", "immédiat" → 15 pts
- "prochainement", "bientôt", "début [mois]" → 10 pts
- Aucune urgence → 0 pts

### 5. Budget Potentiel (0-10 pts)
- Mention budget/prix/devis → +10 pts
- Durée mission (>6 mois) → +5 pts
- Type contrat (CDI/longue durée) → +5 pts

### Priorité Finale
- **Urgent** : Score ≥ 85
- **High** : Score 70-84
- **Medium** : Score 40-69
- **Low** : Score < 40

---

## 🔗 Intégrations CRM

### HubSpot
**Configuration requise :**
```json
{
  "type": "hubspot",
  "config": {
    "accessToken": "pat-xxx..."
  }
}
```

**Mapping :**
- `email` → `email`
- `name` → `firstname` + `lastname`
- `company` → `company`
- `status` → `hs_lead_status`
- `score` → `yojob_score` (champ custom)

### Salesforce
**Configuration requise :**
```json
{
  "type": "salesforce",
  "config": {
    "accessToken": "00D...",
    "instance": "na1"
  }
}
```

**Mapping :**
- `email` → `Email`
- `name` → `FirstName` + `LastName`
- `company` → `Company`
- `status` → `Status` (mapped)
- `score` → `YoJob_Score__c` (champ custom)

### n8n
**Configuration requise :**
```json
{
  "type": "n8n",
  "config": {
    "webhookUrl": "https://n8n.exemple.com/webhook/xxx"
  }
}
```

**Payload envoyé :**
```json
{
  "event": "prospect.created",
  "timestamp": "2024-12-09T...",
  "prospect": {
    "id": "uuid",
    "type": "client",
    "source": "landing_contact",
    "status": "new",
    "name": "...",
    "email": "...",
    "score": 75,
    "priority": "high",
    "custom_fields": {...}
  }
}
```

### Zapier / Webhook Générique
Même format que n8n. Possibilité d'ajouter un `apiKey` dans les headers.

---

## 🎨 Composants Frontend

### 1. `ProspectsPage.tsx`
Page principale du module.
- KPI cards
- Filtres
- Tableau
- Pagination
- Intégration des sous-composants

### 2. `ProspectSheet.tsx`
Panneau latéral (drawer) avec :
- Section Identité
- Coordonnées
- Prochaines actions
- Historique (timeline)
- Notes internes

### 3. `NewProspectDialog.tsx`
Dialog modal pour ajout manuel :
- Formulaire complet
- Validation
- Soumission API

### 4. `ProspectsExport.tsx`
Dropdown d'export :
- CSV standard
- JSON
- CSV HubSpot
- Respect des filtres actifs

---

## 🚀 Utilisation

### Ajouter un prospect manuellement
1. Dashboard → Prospects
2. Clic "Nouveau prospect"
3. Remplir le formulaire
4. Valider → Prospect créé avec `source: manual`

### Exporter les prospects
1. Dashboard → Prospects
2. Clic bouton "Exporter"
3. Choisir format (CSV / JSON / HubSpot)
4. Téléchargement automatique

### Scorer automatiquement
```bash
# Via API
curl -X POST https://xxx.supabase.co/functions/v1/make-server-10092a63/prospects/:id/score \
  -H "Authorization: Bearer xxx"

# Batch (50 prospects)
curl -X POST https://xxx.supabase.co/functions/v1/make-server-10092a63/prospects/score-batch \
  -H "Authorization: Bearer xxx" \
  -d '{"limit": 50}'
```

### Configurer une intégration
1. Dashboard → Intégrations
2. Ajouter nouvelle intégration
3. Type : HubSpot / Salesforce / n8n / Webhook
4. Configuration (API key / URL)
5. Trigger : `prospect_created`
6. Save → Auto-déclenchement lors des nouvelles soumissions

---

## 📊 Workflow Complet

```
1. Visiteur landing page
   ↓
2. Remplit formulaire (Contact ou Waitlist)
   ↓
3. Soumission → API /prospects/submit
   ↓
4. Création prospect + Action historique
   ↓
5. [AUTO] Scoring IA (si configuré)
   ↓
6. [AUTO] Intégrations CRM (HubSpot, Salesforce, n8n)
   ↓
7. Dashboard affiche en temps réel
   ↓
8. Admin ouvre fiche → Voit tout
   ↓
9. Actions : Notes, Appels, Relances, Changement statut
   ↓
10. Export CSV pour campagne email/CRM externe
```

---

## 🎯 Évolutions Futures (Optionnel)

1. **Emails automatiques de relance**
   - Template emails
   - Planification automatique
   - Suivi ouverture/clic

2. **Scoring prédictif ML**
   - Apprentissage sur prospects gagnés
   - Modèle de probabilité de conversion

3. **Intégration téléphonie (VoIP)**
   - Clic-to-call depuis dashboard
   - Enregistrement automatique appels

4. **Attribution multi-touch**
   - Tracking source UTM
   - Attribution conversion

5. **Segmentation avancée**
   - Cohortes dynamiques
   - Campagnes ciblées

---

## 🐛 Troubleshooting

### Problème : Prospects non affichés
**Solution :** Vérifier que la migration `12_prospects_crm_system.sql` a bien été exécutée.
```sql
SELECT * FROM prospects LIMIT 1;
```

### Problème : Scoring IA ne fonctionne pas
**Solution :** Vérifier que `ANTHROPIC_API_KEY` est bien définie.
```bash
# Dans Supabase Dashboard → Edge Functions → Secrets
ANTHROPIC_API_KEY=sk-ant-xxx...
```

### Problème : Intégration HubSpot échoue
**Solution :** Vérifier le token et les permissions.
- Token doit avoir scope `crm.objects.contacts.write`
- Vérifier dans table `prospect_actions` le message d'erreur

### Problème : Export CSV vide
**Solution :** Vérifier les filtres actifs. Essayer "Tous" pour voir tous les prospects.

---

## 📞 Support

Pour toute question :
1. Consulter cette documentation
2. Vérifier les logs serveur (Supabase Functions logs)
3. Vérifier console navigateur (Network tab)

---

**Version** : 1.0  
**Date** : 9 Décembre 2024  
**Auteur** : YOJOB Dev Team
