# 🗄️ Configuration de la base de données Supabase

## ✅ Bonne nouvelle !

Supabase est **déjà configuré** dans votre projet Figma Make !

**Project ID**: `vhpbmckgxtdyxdwhmdxy`  
**URL**: `https://vhpbmckgxtdyxdwhmdxy.supabase.co`

---

## 🚀 Configuration en 2 minutes

### Étape 1 : Accéder à votre projet Supabase

1. Allez sur **https://supabase.com/dashboard**
2. Connectez-vous à votre compte
3. Trouvez le projet **vhpbmckgxtdyxdwhmdxy**
   - Si vous ne le voyez pas, créez-en un nouveau avec cet ID

### Étape 2 : Créer la table

1. Dans votre projet Supabase, cliquez sur **SQL Editor** (dans la barre latérale gauche)

2. Cliquez sur **+ New Query**

3. Copiez-collez le contenu du fichier `/supabase/migrations/create_market_research_table.sql`

4. Cliquez sur **Run** (ou appuyez sur Ctrl+Enter)

5. Vous devriez voir : ✅ **Success. No rows returned**

### Étape 3 : Vérifier

1. Cliquez sur **Table Editor** (dans la barre latérale)

2. Vous devriez voir la table **market_research_responses**

3. Cliquez dessus pour voir sa structure

---

## ✅ C'est terminé !

Votre application est maintenant **100% fonctionnelle** :

- ✅ Supabase connecté
- ✅ Table créée
- ✅ Permissions configurées (RLS)
- ✅ Indexes optimisés
- ✅ Prêt à recevoir des réponses

---

## 🧪 Tester la connexion

### Test 1 : Console

1. Ouvrez votre application
2. Ouvrez la console (F12)
3. Vous devriez voir : ✅ **Supabase connected: vhpbmckgxtdyxdwhmdxy**

### Test 2 : Soumettre une réponse

1. Remplissez le formulaire
2. Cliquez sur "Soumettre"
3. Vous devriez voir : 🟢 **"Merci ! Votre réponse a été enregistrée."**

### Test 3 : Vérifier dans Supabase

1. Retournez dans Supabase → Table Editor
2. Ouvrez **market_research_responses**
3. Vous devriez voir votre réponse !

### Test 4 : Dashboard

1. Cliquez sur "Dashboard" dans le header
2. Login : `admin@yojob.fr` / `YoJob2025!`
3. Vous devriez voir : 🟢 **Badge "Données Réelles"**
4. Les statistiques devraient afficher les vraies données

---

## 🔧 Structure de la table

La table `market_research_responses` contient :

### Colonnes principales (25 questions)
- `q1_nom` → `q25_email` : Toutes les réponses du formulaire
- `autorise_contact` : Boolean (autorisation contact)
- `souhaite_rapport` : Boolean (souhait rapport)

### Métadonnées enrichies
- `country` : Pays extrait de q5_pays
- `sector` : Secteur principal (q4_secteurs[0])
- `company_size` : Taille numérique (extrait de q3_taille)
- `detachment_experience` : Oui/Non (basé sur q6_volume)
- `interest_level` : Niveau calculé (basé sur q18_score)

### Tracking
- `ip_address` : IP de soumission
- `user_agent` : Navigateur utilisé
- `completion_time` : Temps de complétion (secondes)
- `referrer` : Source du trafic

### Système
- `id` : UUID auto-généré
- `created_at` : Timestamp auto
- `response_id` : ID unique (RESP-xxxxx)

---

## 🔒 Sécurité (RLS - Row Level Security)

La table est protégée avec des politiques :

✅ **Inserts publics** : Tout le monde peut soumettre une réponse  
✅ **Lectures authentifiées** : Seuls les admins peuvent lire  
✅ **Suppressions authentifiées** : Seuls les admins peuvent supprimer  

Cela garantit que :
- Les agences peuvent soumettre anonymement
- Seuls les administrateurs YoJob peuvent voir les réponses
- Les données sont protégées

---

## 📊 Indexes créés

Pour des performances optimales :

- `idx_market_research_created_at` : Tri par date
- `idx_market_research_country` : Filtrage par pays
- `idx_market_research_sector` : Filtrage par secteur
- `idx_market_research_interest` : Filtrage par niveau d'intérêt
- `idx_market_research_response_id` : Recherche par ID

---

## 🆘 Problèmes courants

### Problème : "relation market_research_responses does not exist"

**Cause** : La table n'a pas été créée

**Solution** :
1. Retournez à l'Étape 2
2. Exécutez le SQL dans SQL Editor
3. Vérifiez dans Table Editor

### Problème : "permission denied for table"

**Cause** : Les politiques RLS ne sont pas configurées

**Solution** :
1. Exécutez à nouveau tout le SQL (il contient les politiques)
2. Ou vérifiez manuellement : Table → RLS → Policies

### Problème : Toast orange "Mode démonstration"

**Cause** : La table n'existe pas ou autre erreur

**Solution** :
1. Vérifiez la console (F12) pour voir l'erreur exacte
2. Vérifiez que la table existe dans Supabase
3. Testez la connexion : `SELECT * FROM market_research_responses LIMIT 1;` dans SQL Editor

---

## 📈 Monitoring

Pour surveiller l'activité :

1. **Supabase Dashboard** → **Database** → **Tables**
   - Voir le nombre de lignes
   - Voir les dernières réponses

2. **SQL Editor** - Requêtes utiles :

```sql
-- Nombre total de réponses
SELECT COUNT(*) FROM market_research_responses;

-- Réponses par pays
SELECT country, COUNT(*) as count 
FROM market_research_responses 
GROUP BY country 
ORDER BY count DESC;

-- Réponses des 24 dernières heures
SELECT COUNT(*) 
FROM market_research_responses 
WHERE created_at > NOW() - INTERVAL '24 hours';

-- Niveau d'intérêt moyen
SELECT AVG(q18_score) as avg_interest 
FROM market_research_responses;
```

---

## 🎉 Prochaines étapes

Maintenant que la base est configurée :

1. ✅ **Testez** : Soumettez quelques réponses test
2. ✅ **Vérifiez** : Consultez le dashboard admin
3. ✅ **Exportez** : Testez les exports JSON/CSV
4. ✅ **Analysez** : Testez l'analyse IA (si MCP configuré)
5. 🚀 **Lancez** : Envoyez le lien aux 27,000 agences !

---

## 📚 Guides complémentaires

- 📖 **QUICK_START.md** - Vue d'ensemble rapide
- 📘 **README_SUPABASE.md** - Documentation complète
- ✅ **DEPLOYMENT_CHECKLIST.md** - Checklist avant lancement
- 🤖 **AI_ANALYSIS_SETUP.md** - Configurer l'analyse IA

---

**🎯 Votre application est maintenant prête pour la production !**

_Mis à jour : 28 Novembre 2024_
