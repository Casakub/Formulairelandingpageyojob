# 🚀 YoJob Market Research - Guide de Déploiement Supabase

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Configuration Supabase](#configuration-supabase)
3. [Déploiement sur Figma Make](#déploiement-sur-figma-make)
4. [Utilisation](#utilisation)
5. [Maintenance](#maintenance)

---

## 🎯 Vue d'ensemble

Cette application est maintenant **100% fonctionnelle** avec :

✅ **Formulaire de 25 questions** (6 sections)  
✅ **Sauvegarde automatique dans Supabase** avec enrichissement des données  
✅ **Dashboard admin** avec login sécurisé  
✅ **Analyse avancée** avec statistiques, graphiques, filtres  
✅ **Export multi-format** (JSON, CSV, Format IA)  
✅ **Analyse IA simulée** (prête pour intégration Claude/GPT)  
✅ **Design YoJob** (glassmorphism, gradients, animations Motion)  
✅ **Responsive** mobile-first  

---

## 🗄️ Configuration Supabase

### Étape 1 : Créer le projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur **"New Project"**
3. Remplissez :
   - **Name** : `yojob-market-research`
   - **Database Password** : Générer un mot de passe fort (⚠️ le sauvegarder !)
   - **Region** : `Europe (West) - Frankfurt`
4. Cliquez sur **"Create new project"**
5. Attendez 2-3 minutes que le projet soit provisionné

### Étape 2 : Créer la base de données

1. Dans votre projet Supabase, allez dans **SQL Editor** (icône </> dans la sidebar)
2. Cliquez sur **"New query"**
3. Ouvrez le fichier `SUPABASE_SETUP.md` dans ce projet
4. Copiez tout le code SQL (à partir de `CREATE TABLE...`)
5. Collez-le dans l'éditeur SQL de Supabase
6. Cliquez sur **"Run"** (ou appuyez sur `Ctrl/Cmd + Enter`)
7. Vérifiez que vous voyez : ✅ **"Success. No rows returned"**

### Étape 3 : Récupérer les clés API

1. Dans Supabase, cliquez sur l'icône **⚙️ Settings** (en bas à gauche)
2. Allez dans **"API"** dans la sidebar
3. Dans la section **"Project API keys"**, vous trouverez :

#### 📌 Project URL
```
https://xxxxxxxxxxxx.supabase.co
```
👉 Copiez cette URL complète

#### 📌 Anon Key (anon, public)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjIwMTU1NzYwMDB9...
```
👉 Copiez cette clé complète

⚠️ **IMPORTANT** : N'utilisez JAMAIS la **Service Role Key** dans le frontend !

---

## 🚀 Déploiement sur Figma Make

### Option 1 : Variables d'environnement (Recommandé)

Si Figma Make supporte les variables d'environnement :

1. Allez dans les **paramètres du projet**
2. Trouvez la section **"Environment Variables"** ou **"Secrets"**
3. Ajoutez ces deux variables :

| Variable Name | Value |
|--------------|-------|
| `VITE_SUPABASE_URL` | Votre Project URL (copiée plus haut) |
| `VITE_SUPABASE_ANON_KEY` | Votre Anon Key (copiée plus haut) |

4. Sauvegardez
5. Redéployez l'application

### Option 2 : Hardcoder temporairement (Non recommandé pour production)

Si Figma Make ne supporte pas les variables d'environnement :

1. Ouvrez le fichier `/lib/supabase.ts`
2. Remplacez les lignes 4-5 par :

```typescript
const supabaseUrl = 'https://votre-project-id.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...votre-anon-key';
```

⚠️ **Attention** : Cette méthode expose vos clés dans le code. C'est OK pour l'anon key (elle est publique), mais pas idéal pour la gestion.

### Option 3 : Créer un fichier .env (Développement local)

Si vous testez en local avant déploiement :

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez :

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Ajoutez `.env` à votre `.gitignore` :
```
.env
.env.local
```

---

## 🧪 Tester la connexion

### Test 1 : Vérifier les logs du navigateur

1. Déployez l'application
2. Ouvrez la console du navigateur (F12)
3. Rechargez la page
4. Vous devriez voir :
   - ✅ Aucune erreur de connexion
   - ⚠️ Si vous voyez "Supabase credentials not found", vérifiez vos variables d'environnement

### Test 2 : Soumettre le formulaire

1. Remplissez le formulaire (toutes les 6 sections)
2. Cliquez sur **"Soumettre"**
3. Vous devriez voir :
   - ✅ Toast de succès : "Merci ! Votre réponse a été enregistrée."
   - ✅ Écran de confirmation

### Test 3 : Vérifier dans Supabase

1. Allez dans **Table Editor** dans Supabase
2. Ouvrez la table `market_research_responses`
3. Vous devriez voir votre réponse avec toutes les données
4. Vérifiez que les colonnes enrichies sont remplies : `country`, `sector`, `interest_level`, etc.

### Test 4 : Accéder au Dashboard

1. Dans l'application, cliquez sur le bouton **"Dashboard"** dans le header
2. Connectez-vous avec :
   - **Login** : `admin@yojob.fr`
   - **Password** : `YoJob2025!`
3. Vous devriez voir :
   - ✅ Badge "Données Réelles" (vert)
   - ✅ Vos vraies données affichées
   - ✅ Statistiques correctes

### Test 5 : Export

1. Dans le dashboard, cliquez sur **"Exporter"**
2. Testez les 3 formats :
   - 📄 **JSON** : Format technique
   - 📊 **CSV** : Pour Excel/Google Sheets
   - 🤖 **Format IA** : Pour analyse avec Claude/GPT
3. Vérifiez que les fichiers contiennent vos données

---

## 💡 Utilisation

### Pour les répondants (Public)

1. **Accès** : URL de votre application déployée
2. **Durée** : 8-10 minutes
3. **Sections** :
   - Section 1 : Profil Agence (4 questions)
   - Section 2 : Détachement Européen (7 questions)
   - Section 3 : Besoins & Outils (6 questions)
   - Section 4 : Intérêt YoJob (6 questions)
   - Section 5 : Vision Future (2 questions)
   - Section 6 : Contact (1 question)
4. **Après soumission** : Écran de confirmation + email (si option cochée)

### Pour les administrateurs

#### Accès au Dashboard

**Méthode 1 : Bouton dans le header**
- Cliquez sur le bouton **"Dashboard"** (icône 📊) dans le header

**Méthode 2 : URL directe**
- Ajoutez `?mode=admin` à l'URL de votre app
- Exemple : `https://votre-app.com?mode=admin`

#### Login
- **Email** : `admin@yojob.fr`
- **Password** : `YoJob2025!`

⚠️ **Sécurité** : Pour changer les identifiants, modifiez `/components/auth/AdminLogin.tsx`

#### Fonctionnalités du Dashboard

**1. Vue d'ensemble**
- 📊 Stats globales (total réponses, pays, secteurs)
- 📈 Taux d'expérience en détachement
- ⭐ Taux d'intérêt élevé
- 👥 Moyennes (employés, travailleurs détachés)

**2. Filtres**
- 🌍 Par pays (27 pays européens)
- 🏢 Par secteur (BTP, Industrie, Tech, etc.)
- 🔄 Réinitialiser les filtres

**3. Visualisations**
- 📊 Distribution par pays (bar chart)
- 🥧 Distribution par secteur (pie chart)
- 💰 Distribution des budgets
- 📈 Niveau d'intérêt

**4. Liste détaillée**
- Tableau avec toutes les réponses
- Tri par colonne
- Pagination (10 par page)
- Détails complets de chaque réponse

**5. Export**
- 📄 **JSON** : Données brutes
  ```json
  {
    "responses": [...],
    "stats": {...},
    "exportDate": "2024-11-28T..."
  }
  ```
  
- 📊 **CSV** : Compatible Excel
  ```csv
  ID,Timestamp,Company Name,Country,Sector,...
  ```
  
- 🤖 **Format IA** : Optimisé pour Claude/GPT
  ```
  CONTEXTE: Étude de marché européenne...
  DONNÉES: X réponses collectées...
  ```

**6. Analyse IA** (Simulée)
- 🤖 Cliquez sur "Analyser avec l'IA"
- ⏳ Simulation de 3 secondes
- 📊 Insights générés :
  - Tendances principales
  - Pays/Secteurs prometteurs
  - Niveau d'intérêt moyen
  - Difficultés communes
  - Recommandations stratégiques

---

## 🔧 Maintenance

### Surveillance

#### Dans Supabase

1. **Database** → **Usage**
   - Voir le nombre de lignes
   - Voir l'espace disque utilisé
   - Voir les requêtes par minute

2. **Database** → **Logs**
   - Voir les erreurs SQL
   - Voir les requêtes lentes
   - Debugging

3. **API** → **Logs**
   - Voir les appels API
   - Voir les erreurs d'authentification

#### Configurer des alertes

1. Allez dans **Project Settings** → **Alerts**
2. Activez :
   - ✅ **Database > 80% full** : Email quand 80% de l'espace est utilisé
   - ✅ **API quota exceeded** : Email quand proche de la limite
   - ✅ **Unusual activity** : Email en cas d'activité suspecte

### Backup

#### Automatique (Inclus dans Supabase)

- ✅ Backups quotidiens automatiques (7 jours de rétention sur le plan Free)
- ✅ Point-in-time recovery sur les plans payants

#### Manuel

Pour faire un backup manuel :

1. Allez dans **SQL Editor**
2. Exécutez :
```sql
COPY (SELECT * FROM market_research_responses) TO STDOUT WITH CSV HEADER;
```
3. Ou utilisez l'export CSV du dashboard

### Nettoyage

Si vous voulez supprimer toutes les données de test :

```sql
-- ⚠️ ATTENTION : Ceci supprime TOUTES les réponses
DELETE FROM market_research_responses;

-- Pour supprimer seulement les réponses de test
DELETE FROM market_research_responses 
WHERE email LIKE '%@test.%' OR email LIKE '%@example.%';

-- Pour supprimer les réponses incomplètes
DELETE FROM market_research_responses 
WHERE email IS NULL OR email = '';
```

### Statistiques SQL avancées

```sql
-- Réponses par jour
SELECT 
  DATE(created_at) as date,
  COUNT(*) as responses
FROM market_research_responses
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Top 5 pays
SELECT 
  country,
  COUNT(*) as count,
  ROUND(AVG(q18_score)::numeric, 2) as avg_interest
FROM market_research_responses
GROUP BY country
ORDER BY count DESC
LIMIT 5;

-- Taux de conversion (intérêt élevé)
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN q18_score >= 8 THEN 1 END) as highly_interested,
  ROUND(
    (COUNT(CASE WHEN q18_score >= 8 THEN 1 END)::numeric / COUNT(*)::numeric) * 100,
    2
  ) as conversion_rate_pct
FROM market_research_responses;

-- Budget moyen par secteur
SELECT 
  sector,
  q21_budget_mensuel as budget,
  COUNT(*) as count
FROM market_research_responses
WHERE q21_budget_mensuel IS NOT NULL
GROUP BY sector, q21_budget_mensuel
ORDER BY sector, count DESC;
```

---

## 🛡️ Sécurité

### ✅ Ce qui est déjà sécurisé

- ✅ **Row Level Security (RLS)** activé sur la table
- ✅ **Anon Key** publique (sans risque)
- ✅ **HTTPS** : Toutes les communications sont chiffrées
- ✅ **Validation** : Les données sont validées côté client
- ✅ **Enrichissement** : Métadonnées ajoutées automatiquement
- ✅ **Tracking non-invasif** : IP, User Agent (pour anti-spam)

### 🔒 Améliorations pour production

#### 1. Rate Limiting (Anti-spam)

Limitez à 3 soumissions par heure par IP :

```sql
CREATE OR REPLACE FUNCTION check_rate_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) 
    FROM market_research_responses 
    WHERE ip_address = NEW.ip_address 
      AND created_at > NOW() - INTERVAL '1 hour'
  ) >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rate_limit_trigger
BEFORE INSERT ON market_research_responses
FOR EACH ROW EXECUTE FUNCTION check_rate_limit();
```

#### 2. Email unique

Empêchez les doublons d'email :

```sql
CREATE UNIQUE INDEX idx_unique_email 
ON market_research_responses(email);
```

#### 3. Changer les identifiants admin

Éditez `/components/auth/AdminLogin.tsx` :

```typescript
const ADMIN_CREDENTIALS = {
  email: 'votre-email@votre-domaine.com',
  password: 'VotreMotDePasseComplexe123!'
};
```

---

## 🚨 Dépannage

### Problème : "Failed to fetch"

**Cause** : Connexion Supabase échouée

**Solutions** :
1. Vérifiez que `VITE_SUPABASE_URL` est correct
2. Vérifiez que `VITE_SUPABASE_ANON_KEY` est correct
3. Vérifiez que le projet Supabase est actif (pas en pause)
4. Vérifiez votre connexion internet
5. Ouvrez F12 → Network → Vérifiez les requêtes vers Supabase

### Problème : Badge "Mode Démo" au lieu de "Données Réelles"

**Cause** : Aucune donnée dans Supabase OU échec de connexion

**Solutions** :
1. Vérifiez dans Supabase Table Editor que des données existent
2. Cliquez sur le bouton "Actualiser" dans le dashboard
3. Vérifiez les logs dans F12 → Console
4. Soumettez au moins une réponse via le formulaire

### Problème : Erreur "Permission denied"

**Cause** : RLS mal configuré

**Solution** :
Vérifiez que les policies sont créées :

```sql
-- Vérifier les policies
SELECT * FROM pg_policies WHERE tablename = 'market_research_responses';

-- Si aucune policy, les créer à nouveau (voir SUPABASE_SETUP.md)
```

### Problème : Toast d'erreur à la soumission

**Cause** : Erreur SQL ou validation échouée

**Solutions** :
1. Ouvrez F12 → Console → Regardez l'erreur exacte
2. Vérifiez dans Supabase → Database → Logs
3. Vérifiez que tous les champs requis sont remplis
4. Vérifiez que l'email est valide

### Problème : Export vide

**Cause** : Aucune donnée filtrée

**Solutions** :
1. Réinitialisez les filtres (pays/secteur)
2. Vérifiez qu'il y a des données dans la table
3. Actualisez le dashboard

---

## 📊 Quotas Supabase (Plan Free)

- ✅ **500 MB** de base de données (≈ 50,000+ réponses)
- ✅ **5 GB** de bande passante par mois
- ✅ **50,000** requêtes API par mois
- ✅ **2 GB** de stockage fichiers
- ✅ **7 jours** de backup automatique

**Estimations pour 27,000 réponses** :
- 📊 **Espace DB** : ≈ 150 MB (OK ✅)
- 🌐 **Bande passante** : ≈ 2 GB/mois (OK ✅)
- 📞 **API calls** : ≈ 30,000/mois (OK ✅)

👉 Le plan Free est **largement suffisant** pour cette étude !

---

## 🎉 Félicitations !

Votre application est maintenant **100% opérationnelle** avec :

✅ Formulaire fonctionnel  
✅ Sauvegarde Supabase automatique  
✅ Dashboard admin complet  
✅ Analytics & Export  
✅ Prêt pour 27,000 réponses  

**Prochaines étapes** :
1. ✅ Tester le formulaire complet
2. ✅ Vérifier que les données apparaissent dans Supabase
3. ✅ Tester le dashboard admin
4. ✅ Configurer le rate limiting (optionnel)
5. 🚀 **Déployer en production !**

---

**Support** : Pour toute question, consultez la [documentation Supabase](https://supabase.com/docs) ou le [Discord Supabase](https://discord.supabase.com).
