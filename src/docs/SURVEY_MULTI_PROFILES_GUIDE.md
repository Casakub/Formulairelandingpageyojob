# 🎯 Guide : Système d'Enquête Multi-Profils

## Vue d'ensemble

Le système d'enquête YoJob supporte maintenant **3 types de répondants** :

1. **Agences ETT** (`agency`) - 26 questions (10 communes + 16 spécifiques)
2. **Entreprises clientes** (`client`) - 18 questions (10 communes + 8 spécifiques)
3. **Travailleurs intérimaires** (`worker`) - 18 questions (10 communes + 8 spécifiques)

## Architecture

### Flux de données

```
┌──────────────────┐
│   Utilisateur    │
│   arrive sur     │
│    /survey       │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Écran de sélection du profil            │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │ Agence │  │ Client │  │ Worker │    │
│  └────────┘  └────────┘  └────────┘    │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Formulaire dynamique                     │
│  • Questions communes (10)                │
│  • + Questions spécifiques (8-16)         │
│  • Filtrage automatique par profil        │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Soumission → market_research_responses  │
│  • respondent_type: 'agency'|'client'|   │
│    'worker'                               │
│  • Toutes les réponses en JSON            │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  🔗 Synchronisation automatique CRM      │
│  POST /survey/sync-to-prospect           │
│  • Création/MAJ dans table prospects     │
│  • Type mapping: worker→interim          │
│  • Source: survey_agency, survey_client, │
│    survey_worker                          │
│  • Score de qualification (0-100)        │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Dashboard CRM - Onglet Prospects        │
│  • Filtres: Source + Type                │
│  • Badge visuel par profil               │
│  • Détails complets de l'enquête         │
└──────────────────────────────────────────┘
```

## Fichiers créés/modifiés

### ✅ Nouveaux fichiers

| Fichier | Description |
|---------|-------------|
| `/types/survey.ts` | Types TypeScript pour le système multi-profils |
| `/config/questions-extended.ts` | Questions avec visibilité conditionnelle |
| `/components/survey/RespondentSelector.tsx` | Écran de sélection du profil |
| `/supabase/functions/server/survey-to-prospect.tsx` | Sync enquêtes → CRM |
| `/supabase/migrations/13_survey_multi_profils.sql` | Migration base de données |

### 🔄 Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `/supabase/functions/server/index.tsx` | Ajout routes sync |
| `/lib/supabase-public.ts` | Ajout sync CRM automatique |

## Structure de données

### Table `market_research_responses`

```sql
-- Nouveau champ
respondent_type VARCHAR(20) DEFAULT 'agency' -- 'agency', 'client', 'worker'
synced_to_prospect BOOLEAN DEFAULT FALSE     -- Statut de synchronisation
```

### Table `prospects`

```sql
-- Nouveau champ
survey_response_id UUID                      -- Référence vers enquête
```

### Mapping types

```typescript
respondent_type → type (dans prospects)
-------------------------------------------
'agency'  → 'agency'
'client'  → 'client'
'worker'  → 'interim'

respondent_type → source
-------------------------------------------
'agency'  → 'survey_agency'
'client'  → 'survey_client'
'worker'  → 'survey_worker'
```

## API Endpoints

### POST `/make-server-10092a63/survey/sync-to-prospect`

Synchronise une réponse d'enquête vers le CRM.

**Request:**
```json
{
  "response_id": "uuid",
  "respondent_type": "agency",
  "responses": { ... },
  "country": "France",
  "interest_level": "high",
  "submitted_at": "2024-12-10T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "prospectId": "uuid",
  "isNew": true,
  "qualificationScore": 85,
  "status": "qualified"
}
```

### POST `/make-server-10092a63/survey/batch-sync`

Synchronisation batch (pour migrations).

**Request:**
```json
{
  "limit": 100  // Optionnel, défaut 100
}
```

**Response:**
```json
{
  "success": true,
  "total": 100,
  "synced": 95,
  "failed": 5,
  "errors": ["..."]
}
```

## Score de qualification

Le système calcule automatiquement un score de qualification (0-100) basé sur :

| Critère | Poids | Détails |
|---------|-------|---------|
| **Intérêt** | 40% | Score 1-10 sur solution européenne |
| **Budget** | 30% | Budget mensuel/annuel déclaré |
| **Rôle décision** | 20% | Décideur > Influenceur > Utilisateur |
| **Volume** | 10% | Volume d'activité annuel |

### Statuts prospects

- **Score ≥ 80** → `qualified` (Qualifié)
- **Score ≥ 60** → `follow-up` (Relance planifiée)
- **Score < 60** → `new` (Nouveau)

## Questions communes (tous profils)

Les 10 questions communes sont réutilisées intelligemment :

1. **q_common_1_pays** : Pays d'origine
2. **q_common_2_secteurs** : Secteurs d'activité (multi-select)
3. **q_common_3_taille** : Taille organisation
4. **q_common_4_volume** : Volume annuel recrutements/détachements
5. **q_common_5_defis** : Principal défi
6. **q_common_6_outils** : Outils/ERP utilisés
7. **q_common_7_budget** : Budget mensuel
8. **q_common_8_score** : Intérêt solution européenne (1-10)
9. **q_common_9_features** : Fonctionnalités prioritaires
10. **q_common_10_email** : Email + consentements

## Migration des données existantes

### Automatique

La migration SQL applique automatiquement :

```sql
-- Toutes les réponses existantes → type 'agency'
UPDATE market_research_responses 
SET respondent_type = 'agency' 
WHERE respondent_type IS NULL;
```

### Synchronisation batch

Pour synchroniser les enquêtes existantes vers le CRM :

```bash
# Via l'API
curl -X POST \
  https://[PROJECT_ID].supabase.co/functions/v1/make-server-10092a63/survey/batch-sync \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json" \
  -d '{"limit": 1000}'
```

Ou via le Dashboard Admin :
1. Onglet **Settings**
2. Section **Data Migration**
3. Bouton **Sync Surveys to CRM**

## Traductions

### État actuel

- ✅ **Questions communes** : 23 langues (déjà traduites)
- ✅ **Questions agences** : 23 langues (déjà traduites)
- ⏳ **Questions clients** : FR uniquement (TODO: 23 langues)
- ⏳ **Questions intérimaires** : FR uniquement (TODO: 23 langues)

### Stratégie de traduction

**Phase 1** (Immédiat) :
- Français pour tous (100%)

**Phase 2** (Semaine 1) :
- EN, DE, ES, IT, PT pour clients/intérimaires

**Phase 3** (Semaine 2-3) :
- 18 autres langues via IA

## Vue Dashboard CRM

### Filtres disponibles

```typescript
// Source
- Toutes sources
- Formulaire Landing
- Enquêtes

// Type
- Tous types
- Agences ETT
- Entreprises clientes
- Intérimaires
- Liste d'attente

// Statut
- Nouveau
- Qualifié
- Relance planifiée
- Proposition envoyée
- Gagné
- Perdu
```

### Badges visuels

```typescript
SOURCE_BADGES:
- 📋 Landing (bleu clair)
- 🔍 Enquête (jaune)

TYPE_BADGES:
- 🏢 Agence (orange)
- 💼 Client (bleu)
- 👤 Intérimaire (vert)
```

## Fonctions SQL utilitaires

### Statistiques par profil

```sql
SELECT * FROM get_survey_stats_by_respondent_type();

-- Retourne:
-- respondent_type | total_responses | avg_interest_score | synced_to_crm | not_synced
-- agency          | 27000          | 7.5                | 25000         | 2000
-- client          | 150            | 8.2                | 140           | 10
-- worker          | 300            | 6.8                | 280           | 20
```

### Vue combinée prospects + enquêtes

```sql
SELECT * FROM prospects_with_survey
WHERE survey_respondent_type = 'client'
AND survey_interest_level = 'high';
```

## Tests

### Test de sélection du profil

1. Accéder à `/survey`
2. Vérifier affichage des 3 cards (Agence, Client, Intérimaire)
3. Cliquer sur "Client"
4. Vérifier que le formulaire n'affiche que 18 questions
5. Vérifier que les questions communes + clients sont affichées

### Test de synchronisation CRM

1. Soumettre une enquête type "Client"
2. Vérifier logs console :
   ```
   ✅ Réponse sauvegardée avec succès !
   🔗 Synchronisation vers CRM Prospects...
   ✅ Synchronisation CRM réussie
   → Prospect créé: [UUID]
   → Score qualification: 75/100
   ```
3. Dashboard → Prospects
4. Filtrer par Type: "Client" + Source: "Enquête"
5. Vérifier badge "🔍 Enquête" + "💼 CLIENT"
6. Ouvrir détails → Vérifier données enquête

## Troubleshooting

### Erreur: "TABLES_NOT_INITIALIZED"

**Cause** : Les migrations SQL n'ont pas été appliquées.

**Solution** :
```sql
-- Exécuter dans Supabase SQL Editor
\i supabase/migrations/12_prospects_crm_system.sql
\i supabase/migrations/13_survey_multi_profils.sql
```

### Synchronisation CRM ne fonctionne pas

**Vérification** :
```sql
-- Vérifier si les colonnes existent
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'market_research_responses'
AND column_name IN ('respondent_type', 'synced_to_prospect');

-- Résultat attendu: 2 lignes
```

### Questions ne s'affichent pas correctement

**Vérification** :
```typescript
// Dans la console navigateur
import { getQuestionsForRespondent } from './config/questions-extended';

console.log(getQuestionsForRespondent('client'));
// Devrait retourner 18 questions
```

## Roadmap

### ✅ Phase 1 : Infrastructure (Terminée)
- [x] Types TypeScript
- [x] Questions conditionnelles
- [x] Migration SQL
- [x] Sync backend
- [x] Composant sélection

### ⏳ Phase 2 : Intégration formulaire (En cours)
- [ ] Modifier App-Survey-Original.tsx
- [ ] Intégrer RespondentSelector
- [ ] Adapter sections dynamiques
- [ ] Tests end-to-end

### ⏳ Phase 3 : Dashboard (TODO)
- [ ] Filtres source + type
- [ ] Badges visuels
- [ ] Vue détaillée enquête
- [ ] Export avec profils

### ⏳ Phase 4 : Traductions (TODO)
- [ ] Clients EN, DE, ES, IT
- [ ] Intérimaires EN, DE, ES, IT
- [ ] IA pour 18 autres langues

## Support

Pour toute question :
- Documentation complète : `/docs/`
- Migrations SQL : `/supabase/migrations/`
- Types : `/types/survey.ts`
- Questions : `/config/questions-extended.ts`

---

**Version** : 1.0.0  
**Date** : 10 Décembre 2024  
**Statut** : Infrastructure complète ✅ | Intégration UI en cours ⏳
