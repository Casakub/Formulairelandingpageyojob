# ✅ Checklist de vérification - Configuration Supabase

## 📋 Avant de déployer sur Hostinger

### Fichiers du projet

- [ ] Le fichier `/Dockerfile` existe à la racine
- [ ] Le fichier `/docker-compose.yml` contient `VITE_SUPABASE_SERVICE_ROLE_KEY`
- [ ] Le fichier `/.env.production` existe avec les 3 clés
- [ ] Le fichier `/.gitignore` protège les `.env*`
- [ ] Le fichier `/supabase/migrations/00_create_complete_database.sql` existe

### Variables d'environnement

- [ ] `VITE_SUPABASE_URL` = `https://vhpbmckgxtdyxdwhmdxy.supabase.co`
- [ ] `VITE_SUPABASE_ANON_KEY` = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3... (445 caractères)
- [ ] `VITE_SUPABASE_SERVICE_ROLE_KEY` = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3... (509 caractères)
- [ ] `VITE_APP_ENV` = `production`

---

## 🌐 Configuration Supabase Dashboard

### URLs autorisées

- [ ] Connecté sur https://supabase.com/dashboard/project/vhpbmckgxtdyxdwhmdxy
- [ ] Navigation : **Authentication** → **URL Configuration**
- [ ] **Site URL** configurée : `http://72.65.161.3:3000`
- [ ] **Redirect URLs** contient :
  - [ ] `http://72.65.161.3:3000`
  - [ ] `http://72.65.161.3:3000/**`
  - [ ] `http://72.65.161.3:3000/admin`
  - [ ] `http://72.65.161.3:3000/survey`
- [ ] Cliqué sur **Save**

### Base de données

- [ ] Navigation : **SQL Editor**
- [ ] Cliqué sur **New query**
- [ ] Copié le contenu de `/supabase/migrations/00_create_complete_database.sql`
- [ ] Exécuté avec **Run**
- [ ] Message de succès affiché
- [ ] Navigation : **Table Editor**
- [ ] Table `market_research_responses` visible
- [ ] Table `i18n_translations` visible
- [ ] Table `i18n_hero_content` visible

### Authentification

- [ ] Navigation : **Authentication** → **Users**
- [ ] Cliqué sur **Add user**
- [ ] Email : `a.auger@yojob.fr`
- [ ] Password : `Adeole@33700`
- [ ] ✅ **Auto Confirm User** coché
- [ ] Cliqué sur **Create user**
- [ ] User visible dans la liste

### CORS (optionnel)

- [ ] Navigation : **Project Settings** → **API Settings**
- [ ] Section **CORS Allowed Origins**
- [ ] Vérifié que `*` est activé OU `http://72.65.161.3:3000` ajouté

---

## 🚀 Déploiement Hostinger

### Upload des fichiers

- [ ] Tous les fichiers du projet uploadés sur le VPS
- [ ] Fichier `Dockerfile` présent à la racine
- [ ] Fichier `docker-compose.yml` présent à la racine
- [ ] Dossier `nginx/nginx.conf` présent
- [ ] Dossier `supabase/` complet uploadé

### Configuration Docker Compose

- [ ] Connecté sur l'interface Hostinger Docker Compose
- [ ] Section **Environment Variables** ouverte
- [ ] Copié-collé les 4 lignes depuis `COPY_PASTE_THIS.txt` :
  ```
  VITE_SUPABASE_URL=https://vhpbmckgxtdyxdwhmdxy.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGci...
  VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
  VITE_APP_ENV=production
  ```
- [ ] Vérifié qu'il n'y a PAS de guillemets
- [ ] Vérifié qu'il n'y a PAS d'espaces avant/après `=`
- [ ] Sauvegardé la configuration

### Build et démarrage

- [ ] Connecté en SSH : `ssh root@72.65.161.3`
- [ ] Navigué dans le dossier projet : `cd /chemin/vers/projet`
- [ ] Stoppé les anciens conteneurs : `docker-compose down`
- [ ] Rebuild sans cache : `docker-compose build --no-cache`
- [ ] Démarré : `docker-compose up -d`
- [ ] Vérifié les logs : `docker-compose logs -f yojob-landing`
- [ ] Vu "Serving on port 80" ou message similaire
- [ ] Vérifié le conteneur : `docker ps`
- [ ] Status = `Up` (pas `Exited`)

---

## 🧪 Tests fonctionnels

### Test 1 : Landing page

- [ ] Ouvert `http://72.65.161.3:3000` dans le navigateur
- [ ] La page s'affiche correctement
- [ ] Pas d'erreurs dans la console (F12)
- [ ] Header visible
- [ ] Hero section visible
- [ ] Footer visible

### Test 2 : Console navigateur

- [ ] Ouvert la console (F12) → onglet **Console**
- [ ] Message `✅ Supabase connected: vhpbmckgxtdyxdwhmdxy` visible
- [ ] Aucune erreur rouge liée à Supabase
- [ ] Aucune erreur CORS

### Test 3 : Formulaire survey

- [ ] Navigué vers `http://72.65.161.3:3000/survey`
- [ ] Formulaire s'affiche correctement
- [ ] Rempli toutes les sections (6 sections, 26 questions)
- [ ] Cliqué sur le bouton de soumission
- [ ] Message de confirmation affiché
- [ ] Pas d'erreur dans la console

### Test 4 : Vérification BDD

- [ ] Retourné dans Supabase Dashboard
- [ ] Navigation : **Table Editor** → `market_research_responses`
- [ ] La réponse du test est visible dans la table
- [ ] Toutes les colonnes sont remplies correctement
- [ ] Timestamp `created_at` correct

### Test 5 : Login admin

- [ ] Navigué vers `http://72.65.161.3:3000/admin`
- [ ] Page de login affichée
- [ ] Saisi email : `a.auger@yojob.fr`
- [ ] Saisi password : `Adeole@33700`
- [ ] Cliqué sur "Se connecter"
- [ ] Redirection vers le dashboard admin réussie
- [ ] Pas d'erreur dans la console

### Test 6 : Dashboard admin

- [ ] Statistiques affichées en haut
- [ ] Nombre de réponses correct (≥1)
- [ ] Tableau des réponses visible
- [ ] Les données de test sont affichées
- [ ] Filtres fonctionnent (pays, langue)
- [ ] Bouton "Export CSV" visible

### Test 7 : Export de données

- [ ] Cliqué sur "Export CSV"
- [ ] Fichier CSV téléchargé
- [ ] Ouvert le CSV
- [ ] Les données du test sont présentes
- [ ] Format correct (colonnes séparées)

### Test 8 : Traductions (si applicable)

- [ ] Sélecteur de langue visible sur le survey
- [ ] Changement de langue fonctionne
- [ ] Textes traduits correctement
- [ ] Pas d'erreurs dans la console lors du changement

---

## 🔍 Vérifications techniques

### Logs Docker

- [ ] `docker-compose logs -f` ne montre pas d'erreurs critiques
- [ ] Nginx démarre correctement
- [ ] Pas de "500 Internal Server Error"
- [ ] Pas de "Connection refused"

### Réseau

- [ ] `curl http://localhost:80` retourne du HTML (depuis le VPS)
- [ ] `curl http://72.65.161.3:3000` retourne du HTML (depuis l'extérieur)
- [ ] Port 80 ouvert dans le firewall

### Supabase connexion

- [ ] Dans la console navigateur, testé :
  ```javascript
  fetch('https://vhpbmckgxtdyxdwhmdxy.supabase.co/rest/v1/', {
    headers: {
      'apikey': 'eyJhbGci...' // ta ANON_KEY
    }
  }).then(r => r.json()).then(console.log)
  ```
- [ ] Réponse JSON reçue (pas d'erreur CORS)

### Variables d'environnement dans le build

- [ ] Connecté au conteneur : `docker exec -it yojob-landing-page sh`
- [ ] Recherché dans les fichiers :
  ```sh
  cat /usr/share/nginx/html/assets/index-*.js | grep -o 'vhpbmckgxtdyxdwhmdxy'
  ```
- [ ] Le project ID est trouvé (= variables bien injectées)

---

## 🎯 Résultat final

Si **TOUS** les tests ci-dessus sont ✅ :

### 🎉 Configuration réussie !

Ton application est 100% fonctionnelle et connectée à Supabase.

**Tu peux maintenant :**
- Partager le lien `http://72.65.161.3:3000/survey` pour tests
- Accéder au dashboard admin à tout moment
- Collecter de vraies données
- Préparer le transfert DNS

---

### ❌ Si des tests échouent

Consulte les guides de dépannage :

1. **Erreurs de connexion Supabase** → `SUPABASE_SETUP_COMPLETE.md` section "Dépannage"
2. **Erreurs Docker** → `DEPLOYMENT_INSTRUCTIONS.md`
3. **Erreurs Auth** → Vérifie que le user existe dans Supabase Dashboard

**Logs utiles :**
```bash
# Logs Docker
docker-compose logs -f yojob-landing

# Logs Nginx dans le conteneur
docker exec -it yojob-landing-page cat /var/log/nginx/error.log

# Vérifier si nginx tourne
docker exec -it yojob-landing-page ps aux
```

---

**📊 Score de progression**

Coche les cases au fur et à mesure. Objectif : 100% ✅

- Fichiers projet : __ / 5
- Supabase Dashboard : __ / 15
- Déploiement Hostinger : __ / 10
- Tests fonctionnels : __ / 8
- Vérifications techniques : __ / 4

**Total : __ / 42**

---

Bon courage ! 🚀
