# ⚡ Quick Start - 5 minutes pour démarrer

## 🎯 Ce que vous allez faire

1. ✅ Créer un projet Supabase (2 min)
2. ✅ Créer la table de données (1 min)
3. ✅ Configurer les clés API (1 min)
4. ✅ Tester l'application (1 min)

---

## Étape 1 : Créer le projet Supabase

### 1.1 Aller sur Supabase
👉 [https://supabase.com](https://supabase.com)

### 1.2 Créer un compte / Se connecter
- Si vous n'avez pas de compte, inscrivez-vous (gratuit)
- Sinon, connectez-vous

### 1.3 Nouveau projet
Cliquez sur **"New Project"** et remplissez :

```
Name: yojob-market-research
Database Password: [Générer un mot de passe fort] ⚠️ NOTEZ-LE !
Region: Europe (West) - Frankfurt
```

Cliquez sur **"Create new project"**

⏳ Attendez 2-3 minutes...

---

## Étape 2 : Créer la table

### 2.1 Ouvrir l'éditeur SQL
Dans votre projet Supabase :
- Cliquez sur l'icône **</>** (SQL Editor) dans la sidebar gauche
- Cliquez sur **"New query"**

### 2.2 Copier-coller le SQL
1. Ouvrez le fichier `SUPABASE_SETUP.md` de ce projet
2. Copiez **TOUT** le code SQL (à partir de `CREATE TABLE...` jusqu'à la fin)
3. Collez-le dans l'éditeur SQL de Supabase

### 2.3 Exécuter
- Cliquez sur **"Run"** (ou `Ctrl/Cmd + Enter`)
- Vous devriez voir : ✅ **"Success. No rows returned"**

### 2.4 Vérifier
- Cliquez sur l'icône **🗂️** (Table Editor) dans la sidebar
- Vous devriez voir la table **`market_research_responses`**

---

## Étape 3 : Récupérer les clés API

### 3.1 Aller dans les paramètres
- Cliquez sur l'icône **⚙️** (Settings) en bas à gauche
- Cliquez sur **"API"** dans la sidebar

### 3.2 Copier les clés

Vous verrez deux sections importantes :

#### 📌 Project URL
```
https://xxxxxxxxxxxx.supabase.co
```
👉 **COPIEZ CETTE URL COMPLÈTE**

#### 📌 Project API keys

Trouvez la clé **"anon"** / **"public"** (PAS la "service_role") :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```
👉 **COPIEZ CETTE CLÉ COMPLÈTE** (elle est très longue, c'est normal)

---

## Étape 4 : Configurer l'application

### Option A : Variables d'environnement Figma Make

Si vous déployez sur Figma Make :

1. Allez dans les **paramètres du projet**
2. Trouvez **"Environment Variables"** ou **"Secrets"**
3. Ajoutez :

| Variable | Valeur |
|----------|--------|
| `VITE_SUPABASE_URL` | Collez votre Project URL |
| `VITE_SUPABASE_ANON_KEY` | Collez votre Anon Key |

4. **Sauvegardez**
5. **Redéployez** l'application

### Option B : Fichier .env (développement local)

Si vous testez en local :

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez :

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Remplacez les valeurs par vos vraies clés
4. Sauvegardez
5. Redémarrez votre serveur de dev

---

## Étape 5 : Tester ! 🎉

### 5.1 Tester le formulaire

1. Ouvrez votre application
2. Cliquez sur **"Commencer l'étude"**
3. Remplissez quelques questions (pas besoin de tout remplir pour tester)
4. Allez jusqu'à la section Contact et soumettez
5. Vous devriez voir : ✅ **"Merci ! Votre réponse a été enregistrée."**

### 5.2 Vérifier dans Supabase

1. Retournez dans Supabase
2. Allez dans **Table Editor**
3. Ouvrez la table **`market_research_responses`**
4. Vous devriez voir votre réponse ! 🎉

### 5.3 Tester le dashboard

1. Dans l'app, cliquez sur **"Dashboard"** dans le header
2. Connectez-vous :
   - Email : `admin@yojob.fr`
   - Password : `YoJob2025!`
3. Vous devriez voir :
   - Badge vert **"Données Réelles"**
   - Vos statistiques
   - Votre réponse dans la liste

---

## ✅ C'est terminé !

Votre application est maintenant **100% fonctionnelle** et connectée à Supabase !

### Ce qui fonctionne maintenant :

✅ Formulaire sauvegarde automatiquement dans Supabase  
✅ Dashboard affiche les vraies données  
✅ Export des données en JSON/CSV/Format IA  
✅ Statistiques et graphiques en temps réel  
✅ Prêt pour recevoir 27,000 réponses  

---

## 🚀 Pour aller plus loin

📖 **Guide complet** : Lisez `README_SUPABASE.md`  
🔒 **Sécurité** : Configurez le rate limiting  
📊 **Analytics** : Explorez les requêtes SQL avancées  
🤖 **IA** : Intégrez Claude/GPT pour l'analyse  

---

## 🆘 Besoin d'aide ?

### Problème : "Failed to fetch" ou "Supabase credentials not found"

**Solution** : Vérifiez que vos variables d'environnement sont bien configurées
- Les noms sont exacts : `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
- Les valeurs sont complètes (pas de coupure)
- Vous avez redéployé après avoir ajouté les variables

### Problème : Badge "Mode Démo" dans le dashboard

**Solution** : Aucune donnée dans Supabase
- Soumettez au moins une réponse via le formulaire
- Cliquez sur "Actualiser" dans le dashboard
- Vérifiez que les données apparaissent dans Supabase Table Editor

### Autres problèmes

Consultez `README_SUPABASE.md` section 🚨 Dépannage

---

**🎉 Bravo ! Vous êtes prêt à collecter des données !**
