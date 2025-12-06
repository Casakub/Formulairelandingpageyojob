# 🚀 Instructions de déploiement - VPS Hostinger

## 📋 Fichiers créés/modifiés

### ✅ Fichiers à uploader sur le VPS

1. **`/Dockerfile`** - Dockerfile principal avec support SERVICE_ROLE_KEY
2. **`/docker-compose.yml`** - Mis à jour avec la nouvelle variable
3. **`/.env.production`** - Fichier avec tes vraies clés Supabase ⚠️
4. **`/.gitignore`** - Protection contre commit accidentel des clés
5. **`/.env.example`** - Template pour documentation

---

## 🔐 Configuration Supabase

### Tes credentials (déjà dans `.env.production`)

```env
VITE_SUPABASE_URL=https://vhpbmckgxtdyxdwhmdxy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE5ODUsImV4cCI6MjA3OTgzNzk4NX0.Vv0nIgRa91pi-trbK9drGTF6uoeCvvm4L2HEJ4UlyBo
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI2MTk4NSwiZXhwIjoyMDc5ODM3OTg1fQ.HB2lomdiGpf3g2fOnW6qFjPwQXJTxeP4S8wG4kXuZik
VITE_APP_ENV=production
```

---

## 🌐 Configuration Supabase Dashboard

### 1. Autoriser ton IP temporaire

**Navigation :** https://supabase.com/dashboard/project/vhpbmckgxtdyxdwhmdxy

**Authentication → URL Configuration**

Ajoute ces URLs (une par ligne) :

```
http://72.65.161.3:3000
http://72.65.161.3:3000/admin
http://72.65.161.3:3000/survey
http://72.65.161.3:3000/**
```

**Après transfert DNS, ajoute aussi ton domaine final :**
```
https://ton-domaine.com
https://ton-domaine.com/**
```

### 2. Vérifier CORS

**Project Settings → API Settings**

S'assurer que l'origine `http://72.65.161.3:3000` est autorisée.

---

## 📦 Déploiement sur Hostinger VPS

### Étape 1 : Upload des fichiers

Via SSH ou FileZilla, upload tous les fichiers du projet sur le VPS.

### Étape 2 : Se connecter au VPS

```bash
ssh root@72.65.161.3
cd /chemin/vers/ton/projet
```

### Étape 3 : Copier le fichier d'environnement

```bash
# Le fichier .env.production est déjà configuré avec tes clés
# Docker Compose va l'utiliser automatiquement
```

### Étape 4 : Stopper les anciens conteneurs (si existants)

```bash
docker-compose down
```

### Étape 5 : Rebuild et redémarrer

```bash
# Build avec les nouvelles variables d'environnement
docker-compose build --no-cache

# Démarrer en mode détaché
docker-compose up -d

# Vérifier les logs
docker-compose logs -f yojob-landing
```

### Étape 6 : Vérifier que tout fonctionne

```bash
# Vérifier que le conteneur tourne
docker ps

# Tester l'accès
curl http://localhost:80
```

---

## 🧪 Tests à effectuer

### 1. Test de la landing page
- ✅ Ouvrir `http://72.65.161.3:3000`
- ✅ Vérifier que la page s'affiche correctement
- ✅ Tester les animations et interactions

### 2. Test du formulaire survey
- ✅ Aller sur `http://72.65.161.3:3000/survey`
- ✅ Remplir le formulaire complet
- ✅ Soumettre
- ✅ Vérifier dans Supabase Dashboard → Table Editor → `survey_responses`

### 3. Test de l'authentification admin
- ✅ Aller sur `http://72.65.161.3:3000/admin`
- ✅ Se connecter avec :
  - Email : `a.auger@yojob.fr`
  - Password : `Adeole@33700`
- ✅ Vérifier l'accès au dashboard

### 4. Test de la base de données
- ✅ Dans le dashboard admin, vérifier que les stats s'affichent
- ✅ Tester l'export CSV/Excel
- ✅ Tester les filtres par pays/langue

---

## 🐛 Dépannage

### Erreur : "Failed to connect to Supabase"

**Solution :**
1. Vérifier que les URLs sont bien configurées dans Supabase Dashboard
2. Vérifier les logs Docker : `docker-compose logs -f`
3. Vérifier que les variables d'env sont bien passées au build

### Erreur CORS

**Solution :**
1. Dans Supabase Dashboard → Project Settings → API Settings
2. Ajouter `http://72.65.161.3:3000` aux origines autorisées

### Les variables d'environnement ne sont pas reconnues

**Solution :**
```bash
# Rebuild sans cache
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Vérifier les variables d'environnement dans le conteneur

```bash
# Se connecter au conteneur
docker exec -it yojob-landing-page sh

# Afficher les variables (dans le code source buildé)
cat /usr/share/nginx/html/assets/index-*.js | grep -o 'vhpbmckgxtdyxdwhmdxy'
```

---

## 📝 Checklist finale

Avant de transférer le DNS :

- [ ] Landing page fonctionne sur IP temporaire
- [ ] Formulaire survey enregistre bien dans Supabase
- [ ] Login admin fonctionne
- [ ] Dashboard affiche les données correctement
- [ ] Export CSV/Excel fonctionne
- [ ] Filtres et recherches fonctionnent
- [ ] Pas d'erreurs dans la console navigateur
- [ ] Pas d'erreurs dans les logs Docker

Une fois tout validé :

- [ ] Configurer le certificat SSL (Let's Encrypt)
- [ ] Ajouter le domaine final dans Supabase Dashboard
- [ ] Transférer le DNS vers le VPS
- [ ] Retester sur le domaine final

---

## 🔒 Sécurité

**⚠️ IMPORTANT :**

1. **NE JAMAIS** commiter le fichier `.env.production` dans Git
2. La clé `SERVICE_ROLE_KEY` donne un accès admin total à Supabase
3. Après le transfert DNS, passer en HTTPS obligatoire
4. Configurer un firewall sur le VPS (ufw)

---

**Date de création :** Décembre 2024  
**VPS :** Hostinger (72.65.161.3:3000)  
**Projet Supabase :** vhpbmckgxtdyxdwhmdxy
