# 🚀 Guide Express - Hostinger VPS + Supabase

## ⚡ 3 étapes EXACTES pour configurer Supabase

---

### ✅ ÉTAPE 1 : Variables d'environnement Hostinger (2 min)

**Dans ton interface Hostinger Docker Compose :**

Ouvre le fichier `HOSTINGER_ENV_EXAMPLE.txt` et copie-colle les 4 lignes **EXACTEMENT** :

```env
VITE_SUPABASE_URL=https://vhpbmckgxtdyxdwhmdxy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE5ODUsImV4cCI6MjA3OTgzNzk4NX0.Vv0nIgRa91pi-trbK9drGTF6uoeCvvm4L2HEJ4UlyBo
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI2MTk4NSwiZXhwIjoyMDc5ODM3OTg1fQ.HB2lomdiGpf3g2fOnW6qFjPwQXJTxeP4S8wG4kXuZik
VITE_APP_ENV=production
```

---

### ✅ ÉTAPE 2 : Configuration Supabase Dashboard (3 min)

**2.1 - Autoriser ton IP temporaire**

1. Va sur : https://supabase.com/dashboard/project/vhpbmckgxtdyxdwhmdxy
2. Menu **Authentication** → **URL Configuration**
3. Dans **Site URL**, écris : `http://72.65.161.3:3000`
4. Dans **Redirect URLs**, clique **Add URL** et ajoute (une par une) :
   - `http://72.65.161.3:3000`
   - `http://72.65.161.3:3000/**`
   - `http://72.65.161.3:3000/admin`
   - `http://72.65.161.3:3000/survey`

5. Clique **Save** en bas de la page

**2.2 - Créer les tables (IMPORTANT)**

1. Menu **SQL Editor** (icône < > à gauche)
2. Clique **New query**
3. Ouvre le fichier `/supabase/migrations/00_create_complete_database.sql` de ton projet
4. Copie **TOUT** le contenu
5. Colle dans l'éditeur SQL Supabase
6. Clique **Run** (bouton vert en bas à droite)
7. ✅ Tu devrais voir "Success. No rows returned"

**2.3 - Créer le compte admin**

1. Menu **Authentication** → **Users**
2. Clique **Add user** (bouton vert)
3. Remplis :
   - Email : `a.auger@yojob.fr`
   - Password : `Adeole@33700`
   - ✅ Coche **Auto Confirm User**
4. Clique **Create user**

---

### ✅ ÉTAPE 3 : Déploiement sur Hostinger (2 min)

**SSH sur ton VPS :**

```bash
# Se connecter
ssh root@72.65.161.3

# Aller dans le dossier projet
cd /chemin/vers/ton/projet

# Rebuild complet
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Vérifier les logs
docker-compose logs -f yojob-landing
```

Appuie sur `Ctrl+C` pour sortir des logs quand tu vois "Serving on port 80" ou similaire.

---

## 🧪 Tests rapides

### Test 1 : Landing page
Ouvre : `http://72.65.161.3:3000`  
✅ La page doit s'afficher correctement

### Test 2 : Formulaire
1. Va sur : `http://72.65.161.3:3000/survey`
2. Remplis le formulaire
3. Soumets
4. ✅ Message de confirmation doit apparaître
5. Vérifie dans Supabase → **Table Editor** → `market_research_responses`
6. ✅ Ta réponse doit apparaître dans la table

### Test 3 : Admin
1. Va sur : `http://72.65.161.3:3000/admin`
2. Connecte-toi avec :
   - Email : `a.auger@yojob.fr`
   - Password : `Adeole@33700`
3. ✅ Le dashboard doit s'afficher

---

## ❌ En cas de problème

### Erreur "Failed to fetch"
- Vérifie que les URLs sont bien ajoutées dans Supabase → **Authentication** → **URL Configuration**

### Erreur "Invalid API key"
- Vérifie que tu as bien copié les 4 lignes COMPLÈTES dans Docker Compose
- Rebuild : `docker-compose down && docker-compose build --no-cache && docker-compose up -d`

### Login admin ne fonctionne pas
- Vérifie que le compte existe dans Supabase → **Authentication** → **Users**
- Si besoin, réinitialise le mot de passe dans l'interface Supabase

### Tables introuvables
- Retourne dans **SQL Editor**
- Copie-colle le fichier `/supabase/migrations/00_create_complete_database.sql`
- Clique **Run**

---

## 📚 Guides complets

Pour plus de détails, consulte :
- `SUPABASE_SETUP_COMPLETE.md` - Guide détaillé complet
- `DEPLOYMENT_INSTRUCTIONS.md` - Instructions de déploiement

---

**🎉 C'est tout !**  
Une fois ces 3 étapes suivies, ton application est 100% fonctionnelle.
