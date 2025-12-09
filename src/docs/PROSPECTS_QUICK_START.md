# 🚀 QUICK START - CRM PROSPECTS YOJOB

## ⚡ Mise en route rapide (5 minutes)

### Étape 1 : Migration Base de Données
```sql
-- Exécuter dans Supabase SQL Editor
\i supabase/migrations/12_prospects_crm_system.sql
```

✅ Cela crée :
- Table `prospects`
- Table `prospect_actions`  
- Table `prospect_notes`
- Vue `prospect_stats`
- Données de test

### Étape 2 : Tester depuis la landing page

1. Aller sur `https://votre-app.com/`
2. Descendre jusqu'au formulaire "Contactez-nous"
3. Remplir le formulaire
4. Soumettre

✅ Le prospect est automatiquement créé !

### Étape 3 : Voir le prospect dans le dashboard

1. Aller sur `https://votre-app.com/admin`
2. Se connecter (a.auger@yojob.fr / Adeole@33700)
3. Cliquer sur l'onglet "Prospects"

✅ Vous voyez le prospect que vous venez de créer !

---

## 🎯 Fonctionnalités Principales

### ✅ Ce qui fonctionne IMMÉDIATEMENT

1. **Collecte automatique** depuis :
   - Formulaire "Contactez-nous" (landing page)
   - Formulaire "Rejoindre la waitlist" (landing page)

2. **Dashboard en temps réel** :
   - 4 KPI cards (totaux, clients, agences, intérimaires)
   - Filtres par type
   - Recherche
   - Tableau paginé

3. **Ajout manuel** :
   - Bouton "+ Nouveau prospect"
   - Formulaire complet

4. **Export** :
   - CSV standard
   - JSON
   - CSV HubSpot

---

## 🤖 Activer le Scoring IA (Optionnel)

### Prérequis
Clé API Anthropic configurée dans Supabase :
```
ANTHROPIC_API_KEY=sk-ant-xxx...
```

### Utilisation

**Scorer un prospect spécifique :**
```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-10092a63/prospects/:id/score \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

**Scorer en batch (50 premiers prospects) :**
```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-10092a63/prospects/score-batch \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"limit": 50}'
```

**Résultat :**
```json
{
  "score": 75,
  "priority": "high",
  "reason": "Client BTP avec projet important, secteur prioritaire",
  "recommended_action": "Appel téléphonique sous 24h"
}
```

---

## 🔗 Activer les Intégrations CRM

### 1. HubSpot

**Créer l'intégration** (dans table `integrations`) :
```sql
INSERT INTO integrations (
  name, type, enabled, trigger_on, config
) VALUES (
  'HubSpot Sync',
  'hubspot',
  true,
  'prospect_created',
  '{"accessToken": "pat-xxx..."}'::jsonb
);
```

**Obtenir le token** :
1. https://app.hubspot.com/settings/personal-access-tokens
2. Créer un token
3. Permissions : `crm.objects.contacts.write`

### 2. Salesforce

```sql
INSERT INTO integrations (
  name, type, enabled, trigger_on, config
) VALUES (
  'Salesforce Leads',
  'salesforce',
  true,
  'prospect_created',
  '{"accessToken": "00D...", "instance": "na1"}'::jsonb
);
```

### 3. n8n

```sql
INSERT INTO integrations (
  name, type, enabled, trigger_on, config
) VALUES (
  'n8n Workflow',
  'n8n',
  true,
  'prospect_created',
  '{"webhookUrl": "https://n8n.exemple.com/webhook/xxx"}'::jsonb
);
```

**Déclencher manuellement** :
```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-10092a63/prospects/:id/integrations \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## 📊 Exemples de Requêtes SQL Utiles

### Prospects ce mois
```sql
SELECT * FROM prospects
WHERE created_at >= date_trunc('month', CURRENT_DATE)
ORDER BY created_at DESC;
```

### Top clients par score
```sql
SELECT name, email, company, score, priority
FROM prospects
WHERE type = 'client' AND score IS NOT NULL
ORDER BY score DESC
LIMIT 10;
```

### Statistiques par source
```sql
SELECT 
  source,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE status = 'won') as won,
  ROUND(AVG(score), 1) as avg_score
FROM prospects
GROUP BY source
ORDER BY total DESC;
```

### Historique complet d'un prospect
```sql
SELECT 
  pa.created_at,
  pa.action_type,
  pa.action_label,
  pa.user_name
FROM prospect_actions pa
WHERE pa.prospect_id = 'uuid-du-prospect'
ORDER BY pa.created_at DESC;
```

---

## 🐛 Problèmes Courants

### "Aucun prospect affiché"
**Solution** : Vérifier la migration
```sql
SELECT COUNT(*) FROM prospects;
```
Si 0 ou erreur → Re-exécuter la migration

### "Export CSV vide"
**Solution** : Désactiver tous les filtres, sélectionner "Tous"

### "Scoring IA ne fonctionne pas"
**Solution** : Vérifier la clé API
```bash
# Dans Supabase Dashboard
Edge Functions → Secrets → ANTHROPIC_API_KEY
```

### "Intégration échoue"
**Solution** : Vérifier les logs
```sql
SELECT * FROM prospect_actions
WHERE action_type = 'integration'
ORDER BY created_at DESC
LIMIT 10;
```

---

## 📈 Prochaines Étapes

1. **Configurer les intégrations CRM** (HubSpot, Salesforce, n8n)
2. **Activer le scoring IA automatique** (cron job)
3. **Personnaliser les statuts** selon votre workflow
4. **Ajouter des champs customs** via `custom_fields`
5. **Créer des rapports** dans le dashboard

---

## 📞 Support

**Documentation complète** : `/docs/PROSPECTS_CRM_GUIDE.md`

**API Reference** : 
- GET `/prospects/list`
- GET `/prospects/stats`
- POST `/prospects/submit`
- POST `/prospects/:id/score`
- POST `/prospects/:id/integrations`

**Logs** : Supabase Dashboard → Edge Functions → Logs

---

**🎉 Vous êtes prêt ! Testez dès maintenant en soumettant le formulaire de contact sur votre landing page.**
