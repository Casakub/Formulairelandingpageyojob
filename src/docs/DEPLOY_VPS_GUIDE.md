# 🚀 GUIDE DE DÉPLOIEMENT VPS - YoJob Landing Page

**VPS IP:** `72.65.161.3`  
**Port:** `3000`  
**URL actuelle:** http://72.65.161.3:3000

---

## ⚡ DÉPLOIEMENT RAPIDE (5 minutes)

### Étape 1 : Connexion SSH

```bash
ssh root@72.65.161.3
```

---

### Étape 2 : Aller dans le projet

```bash
cd /root/Formulairelandingpageyojob
# ou
cd /chemin/vers/projet
```

---

### Étape 3 : Pull depuis GitHub

```bash
# Récupérer les dernières modifications
git pull origin main
```

**Ce qui sera téléchargé:**
- ✅ `/lib/supabase-public.ts` complet (167 lignes)
- ✅ `/docker-compose.yml` sécurisé (sans SERVICE_ROLE_KEY)
- ✅ `/Dockerfile` (multi-stage build)
- ✅ `/.env.example` avec warnings de sécurité
- ✅ `/.npmrc`

---

### Étape 4 : Vérifier les fichiers

```bash
# Vérifier que le Dockerfile existe (IMPORTANT)
ls -la Dockerfile

# Résultat attendu:
# -rw-r--r-- 1 root root 2345 Dec 6 13:24 Dockerfile
```

---

### Étape 5 : Configurer le fichier .env

```bash
# Éditer le .env
nano .env
```

**Contenu du `.env` (IMPORTANT - COPIER TEL QUEL):**

```env
# =============================================================================
# PRODUCTION ENVIRONMENT - VPS Hostinger
# =============================================================================

# Supabase Configuration
VITE_SUPABASE_URL=https://vhpbmckgxtdyxdwhmdxy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMzk0MTUsImV4cCI6MjA0ODcxNTQxNX0.cQCCYkR4jhf3j9qmXZGGH_hQwNAXWLhqAGFWBRIk74I

# Application Environment
VITE_APP_ENV=production
```

**⚠️ IMPORTANT - NE PAS AJOUTER :**
```env
# ❌ NE PAS AJOUTER CETTE LIGNE (risque de sécurité)
# VITE_SUPABASE_SERVICE_ROLE_KEY=...
```

**Sauvegarder et quitter:**
- Appuyer sur `Ctrl + X`
- Appuyer sur `Y`
- Appuyer sur `Entrée`

---

### Étape 6 : Rebuild Docker

```bash
# Arrêter le conteneur actuel
docker-compose down

# Rebuild complet (sans cache)
docker-compose build --no-cache

# Démarrer le conteneur
docker-compose up -d
```

**Temps estimé:** 3-5 minutes

---

### Étape 7 : Vérifier le déploiement

```bash
# 1. Vérifier que le conteneur tourne
docker ps | grep yojob

# Résultat attendu:
# yojob-landing-page   ...   Up 10 seconds   0.0.0.0:3000->80/tcp

# 2. Vérifier les logs (pas d'erreurs)
docker logs -f yojob-landing-page

# Appuyer sur Ctrl+C pour sortir

# 3. Tester l'URL
curl http://localhost:3000/

# Résultat attendu: du HTML
```

---

### Étape 8 : Tester dans le navigateur

**Landing Page:**  
http://72.65.161.3:3000/

**Formulaire Survey:**  
http://72.65.161.3:3000/survey

**Dashboard Admin:**  
http://72.65.161.3:3000/admin

---

## 🔍 DIAGNOSTIC EN CAS D'ERREUR

### Erreur 1 : "Cannot find module '@supabase/supabase-js'"

**Cause:** Build npm incomplet

**Solution:**
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

### Erreur 2 : "getSupabasePublicClient is not defined"

**Cause:** Fichier `/lib/supabase-public.ts` incomplet

**Solution:**
```bash
# Vérifier le contenu du fichier
cat src/lib/supabase-public.ts | head -20

# Si le fichier est incomplet, refaire git pull
git pull origin main --force

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

### Erreur 3 : "Port 3000 already in use"

**Cause:** Un autre conteneur utilise le port 3000

**Solution:**
```bash
# Trouver le processus qui utilise le port 3000
lsof -i :3000

# Ou
docker ps -a

# Stopper tous les conteneurs
docker stop $(docker ps -aq)

# Redémarrer
docker-compose up -d
```

---

### Erreur 4 : "Dockerfile not found"

**Cause:** Le fichier `Dockerfile.txt` n'a pas été renommé

**Solution:**
```bash
# Renommer manuellement
mv Dockerfile.txt Dockerfile

# Ou refaire git pull
git pull origin main
```

---

## 📋 COMMANDES UTILES

### Voir les logs en temps réel

```bash
docker logs -f yojob-landing-page
```

### Redémarrer le conteneur

```bash
docker-compose restart
```

### Arrêter le conteneur

```bash
docker-compose down
```

### Voir l'état du conteneur

```bash
docker ps | grep yojob
```

### Voir les variables d'environnement

```bash
docker exec yojob-landing-page env | grep VITE
```

### Entrer dans le conteneur

```bash
docker exec -it yojob-landing-page sh
```

### Nettoyer Docker (libérer de l'espace)

```bash
# Supprimer les conteneurs arrêtés
docker container prune -f

# Supprimer les images inutilisées
docker image prune -a -f

# Supprimer les volumes inutilisés
docker volume prune -f
```

---

## 🔐 SÉCURITÉ - CHECKLIST

Avant de mettre en production :

- [ ] Le fichier `.env` n'a PAS de `VITE_SUPABASE_SERVICE_ROLE_KEY`
- [ ] Le fichier `docker-compose.yml` n'a PAS de `VITE_SUPABASE_SERVICE_ROLE_KEY` dans les args
- [ ] Le port 3000 est bien exposé (pas le port 80)
- [ ] Les logs Docker ne montrent pas d'erreurs
- [ ] Le formulaire `/survey` fonctionne
- [ ] Les soumissions de formulaire arrivent dans Supabase

---

## 🎯 CONFIGURATION NGINX (Optionnel)

Si tu veux utiliser un nom de domaine (ex: `yojob.com`) :

### 1. Installer Nginx sur le VPS (si pas déjà fait)

```bash
apt update
apt install nginx -y
```

### 2. Créer un fichier de configuration Nginx

```bash
nano /etc/nginx/sites-available/yojob
```

**Contenu:**
```nginx
server {
    listen 80;
    server_name yojob.com www.yojob.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Activer la configuration

```bash
ln -s /etc/nginx/sites-available/yojob /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 4. Installer SSL avec Certbot (HTTPS)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yojob.com -d www.yojob.com
```

---

## 📊 MONITORING

### Voir l'utilisation des ressources

```bash
# CPU et RAM du conteneur
docker stats yojob-landing-page

# Espace disque
df -h

# Processus Docker
docker ps -a
```

---

## 🆘 EN CAS DE PROBLÈME GRAVE

### Option 1 : Redéploiement complet

```bash
# 1. Supprimer tout
docker-compose down
docker system prune -a -f

# 2. Refaire git pull
git pull origin main --force

# 3. Rebuild
docker-compose build --no-cache
docker-compose up -d
```

---

### Option 2 : Revenir à une version précédente

```bash
# Voir l'historique des commits
git log --oneline

# Revenir à un commit spécifique
git reset --hard <commit-sha>

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## ✅ CHECKLIST POST-DÉPLOIEMENT

Après le déploiement, vérifier :

- [ ] La landing page s'affiche : http://72.65.161.3:3000/
- [ ] Le formulaire survey s'affiche : http://72.65.161.3:3000/survey
- [ ] La connexion admin fonctionne : http://72.65.161.3:3000/admin
- [ ] Le formulaire peut être soumis (test avec données fictives)
- [ ] Les données arrivent dans Supabase
- [ ] Pas d'erreurs dans les logs Docker
- [ ] Le conteneur redémarre automatiquement (restart: unless-stopped)

---

## 📞 CONTACT

**Projet GitHub:**  
https://github.com/Casakub/Formulairelandingpageyojob

**Branche principale:**  
`main`

**Dernier commit:**  
`61206b1dcbc4c78c1fc5f358f6f1e67a26442d9e`

---

**🎉 BON DÉPLOIEMENT !**
