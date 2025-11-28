# 🗄️ Configuration Supabase pour YoJob Market Research

## 📋 Étape 1 : Créer le projet Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte / Se connecter
3. Créer un nouveau projet :
   - **Nom** : `yojob-market-research`
   - **Database Password** : Générer un mot de passe fort (le sauvegarder !)
   - **Region** : Europe (West) - Frankfurt (le plus proche)
4. Attendre 2-3 minutes que le projet soit créé

---

## 📊 Étape 2 : Créer la table

1. Dans votre projet Supabase, aller dans **SQL Editor**
2. Créer une nouvelle query
3. Copier-coller le SQL suivant :

```sql
-- Table pour stocker les réponses de l'étude de marché
CREATE TABLE market_research_responses (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  response_id VARCHAR(20) UNIQUE NOT NULL,
  
  -- Section 1: Profil Agence
  q1_nom VARCHAR(255),
  q2_annee VARCHAR(50),
  q3_taille VARCHAR(50),
  q4_secteurs JSONB,
  
  -- Section 2: Détachement Européen
  q5_pays VARCHAR(255),
  q6_volume VARCHAR(50),
  q7_origine VARCHAR(255),
  q8_destinations TEXT,
  q9_defi VARCHAR(255),
  q9_autre TEXT,
  q10_gestion VARCHAR(255),
  q11_incidents TEXT,
  
  -- Section 3: Besoins & Outils
  q12_budget VARCHAR(50),
  q13_manque_gagner TEXT,
  q14_risques TEXT,
  q15_probleme TEXT,
  q16_erp VARCHAR(255),
  q16_autre TEXT,
  q17_migration VARCHAR(50),
  
  -- Section 4: Intérêt YoJob
  q18_score INTEGER CHECK (q18_score >= 0 AND q18_score <= 10),
  q19_features JSONB,
  q20_prix VARCHAR(50),
  q21_budget_mensuel VARCHAR(50),
  q22_mvp VARCHAR(50),
  q23_role VARCHAR(255),
  
  -- Section 5: Vision Future
  q24_evolution TEXT,
  q25_besoins TEXT,
  
  -- Section 6: Contact
  email VARCHAR(255),
  autorise_contact BOOLEAN DEFAULT false,
  souhaite_rapport BOOLEAN DEFAULT false,
  
  -- Metadata enrichie (calculée automatiquement)
  country VARCHAR(100),
  sector VARCHAR(100),
  company_size INTEGER,
  detachment_experience VARCHAR(50),
  interest_level VARCHAR(50),
  
  -- Tracking technique
  ip_address INET,
  user_agent TEXT,
  completion_time INTEGER, -- en secondes
  referrer TEXT
);

-- Index pour améliorer les performances
CREATE INDEX idx_responses_created_at ON market_research_responses(created_at DESC);
CREATE INDEX idx_responses_country ON market_research_responses(country);
CREATE INDEX idx_responses_sector ON market_research_responses(sector);
CREATE INDEX idx_responses_interest_level ON market_research_responses(interest_level);
CREATE INDEX idx_responses_email ON market_research_responses(email);

-- Enable Row Level Security (RLS)
ALTER TABLE market_research_responses ENABLE ROW LEVEL SECURITY;

-- Policy : Tout le monde peut INSERT (soumission publique du formulaire)
CREATE POLICY "Enable insert for all users" ON market_research_responses
  FOR INSERT
  WITH CHECK (true);

-- Policy : Seuls les admins peuvent lire (via service role key)
-- Note: En production, créer un rôle admin spécifique
CREATE POLICY "Enable read for authenticated users" ON market_research_responses
  FOR SELECT
  USING (true);
  
-- Policy : Seuls les admins peuvent supprimer
CREATE POLICY "Enable delete for authenticated users" ON market_research_responses
  FOR DELETE
  USING (true);

-- Vue pour statistiques rapides
CREATE OR REPLACE VIEW response_stats AS
SELECT 
  COUNT(*) as total_responses,
  COUNT(DISTINCT country) as countries_count,
  COUNT(DISTINCT sector) as sectors_count,
  ROUND(AVG(q18_score)::numeric, 2) as avg_interest_score,
  COUNT(CASE WHEN q18_score >= 8 THEN 1 END) as highly_interested,
  COUNT(CASE WHEN autorise_contact = true THEN 1 END) as authorized_contact
FROM market_research_responses;
```

4. Cliquer sur **Run** (ou F5)
5. Vérifier que la table est créée : Aller dans **Table Editor**

---

## 🔑 Étape 3 : Récupérer les clés API

1. Dans Supabase, aller dans **Project Settings** (icône engrenage en bas à gauche)
2. Aller dans **API**
3. Copier les deux clés suivantes :

### **Project URL**
```
https://xxxxxxxxxxxx.supabase.co
```

### **Anon Public Key** (pour le frontend)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚙️ Étape 4 : Configuration dans Figma Make

### Option A : Variables d'environnement Figma Make

1. Dans Figma Make, aller dans les paramètres du projet
2. Ajouter les variables d'environnement :
   - `VITE_SUPABASE_URL` = Votre Project URL
   - `VITE_SUPABASE_ANON_KEY` = Votre Anon Public Key

### Option B : Fichier .env local (développement)

Si vous développez en local, créer un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT** : Ne JAMAIS commit le fichier `.env` dans Git !

---

## 🧪 Étape 5 : Tester la connexion

1. Dans Supabase, aller dans **Table Editor**
2. Ouvrir la table `market_research_responses`
3. Remplir le formulaire sur votre app
4. Soumettre le formulaire
5. Rafraîchir la table dans Supabase
6. ✅ Vous devriez voir votre réponse apparaître !

---

## 📊 Étape 6 : Vérifier les données

### Via l'interface Supabase

**Table Editor** :
- Voir toutes les réponses
- Filtrer par pays, secteur, score
- Exporter en CSV

**SQL Editor** :
```sql
-- Voir toutes les réponses
SELECT * FROM market_research_responses ORDER BY created_at DESC;

-- Statistiques rapides
SELECT * FROM response_stats;

-- Réponses par pays
SELECT country, COUNT(*) as count 
FROM market_research_responses 
GROUP BY country 
ORDER BY count DESC;

-- Réponses très intéressées (score >= 8)
SELECT q1_nom, country, q18_score, email
FROM market_research_responses
WHERE q18_score >= 8
ORDER BY q18_score DESC;

-- Score moyen par pays
SELECT country, 
       COUNT(*) as responses,
       ROUND(AVG(q18_score)::numeric, 2) as avg_score
FROM market_research_responses
GROUP BY country
HAVING COUNT(*) > 0
ORDER BY avg_score DESC;
```

---

## 🔒 Sécurité & Bonnes Pratiques

### ✅ Ce qui est sécurisé

- ✅ **Anon Key** est publique (safe pour frontend)
- ✅ **RLS activé** : Les utilisateurs peuvent uniquement INSERT
- ✅ **Pas de données sensibles** exposées au client
- ✅ **HTTPS** : Toutes les requêtes sont chiffrées

### ⚠️ À faire en production

1. **Rate Limiting** : Limiter le nombre de soumissions par IP
   ```sql
   -- Exemple : Bloquer plus de 3 soumissions par heure par IP
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

2. **Email Validation** : Vérifier que l'email est unique
   ```sql
   -- Empêcher les doublons d'email
   CREATE UNIQUE INDEX idx_unique_email ON market_research_responses(email);
   ```

3. **Backup automatique** : Activer dans Supabase Settings > Database > Point-in-time recovery

---

## 📈 Monitoring

### Dashboard Supabase

- **Database** → **Usage** : Voir le nombre de requêtes
- **Database** → **Logs** : Voir les erreurs SQL
- **Auth** → **Logs** : Voir les tentatives de connexion

### Alertes

Configurer des alertes email dans **Project Settings** → **Alerts** :
- ✅ Database > 80% storage
- ✅ API > 80% quota
- ✅ Erreurs inattendues

---

## 🚀 Migration des données mock → Supabase

Si vous avez déjà des données mock à migrer :

```sql
-- Insérer des données de test
INSERT INTO market_research_responses (
  response_id, q1_nom, q2_annee, q3_taille, q4_secteurs,
  q5_pays, q6_volume, email, q18_score,
  country, sector, interest_level
) VALUES 
  ('YJ-2025-000001', 'TempWork Paris', '2015', '50-100', '["BTP", "Industrie"]', 
   'France', '10-50 par an', 'contact@tempwork.fr', 9,
   'France', 'BTP', 'Très fortement intéressé'),
  
  ('YJ-2025-000002', 'Deutsche Zeitarbeit GmbH', '2008', '100-500', '["Industrie"]',
   'Allemagne', '50-100 par an', 'info@deutsche-zeit.de', 8,
   'Allemagne', 'Industrie', 'Très intéressé');
```

---

## 🛠️ Dépannage

### Erreur : "Failed to fetch"
- ✅ Vérifier que VITE_SUPABASE_URL est correct
- ✅ Vérifier que le projet Supabase est bien actif
- ✅ Vérifier la connexion internet

### Erreur : "JWT expired"
- ✅ La clé Anon Public est valide indéfiniment
- ✅ Si erreur persiste, régénérer la clé dans Settings > API

### Erreur : "Permission denied"
- ✅ Vérifier que RLS est bien configuré
- ✅ Vérifier les policies (INSERT doit être autorisé)

### Données ne s'affichent pas dans le dashboard
- ✅ Vérifier dans Table Editor que les données sont bien là
- ✅ Vérifier la console browser (F12) pour les erreurs
- ✅ Vérifier que getAllResponses() est appelée

---

## 📞 Support

- **Documentation Supabase** : https://supabase.com/docs
- **Discord Supabase** : https://discord.supabase.com
- **GitHub Issues** : https://github.com/supabase/supabase/issues

---

## ✅ Checklist finale

- [ ] Projet Supabase créé
- [ ] Table `market_research_responses` créée
- [ ] Index créés
- [ ] RLS activé et policies configurées
- [ ] Clés API récupérées
- [ ] Variables d'environnement configurées
- [ ] Test de soumission formulaire OK
- [ ] Données visibles dans Supabase
- [ ] Dashboard admin affiche les vraies données
- [ ] Export fonctionne
- [ ] Backup configuré (optionnel mais recommandé)

---

**🎉 Félicitations ! Votre système est maintenant connecté à Supabase !**

La prochaine étape sera l'intégration de l'analyse IA avec Claude/GPT.
