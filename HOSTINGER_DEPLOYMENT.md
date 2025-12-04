# 🚀 Déploiement YOJOB sur Hostinger

Guide rapide pour déployer YOJOB (landing page + formulaire) sur Hostinger avec leur interface Docker Compose.

---

## 📋 Prérequis

- ✅ Compte Hostinger avec Docker Compose activé
- ✅ Domaine yojob.fr pointant vers Hostinger
- ✅ Repositories GitHub prêts et publics

---

## 🎯 Méthodes de Déploiement

### **Méthode 1 : Via GitHub** (Recommandée)

Hostinger clone automatiquement votre repo.

### **Méthode 2 : Copier-Coller** (Plus rapide)

Coller directement le docker-compose.yml dans l'interface.

---

## 📝 Méthode 1 : Déploiement via GitHub

### **Étape 1 : Préparer les Repos**

Sur votre machine locale :

```bash
cd /chemin/vers/Formulairelandingpageyojob

# 1. Ajouter la landing page (si pas déjà fait)
git submodule add https://github.com/Casakub/Newlandingpageyojob.git landing-page

# 2. Copier les Dockerfiles
cp Dockerfile landing-page/
cp nginx.conf landing-page/

# 3. Restructurer le formulaire
mkdir survey-form
mv src package.json vite.config.ts index.html survey-form/
cp Dockerfile nginx.conf survey-form/

# 4. Commit et push
git add .
git commit -m "Prepare for Hostinger deployment"
git push
```

### **Étape 2 : Sur Hostinger**

1. **Se connecter** à votre panel Hostinger
2. **Aller dans** "Docker" ou "Containers"
3. **Créer un nouveau projet**
4. **Choisir** "Deploy from GitHub"

**Configuration** :
- **Repository URL** : `https://github.com/Casakub/Formulairelandingpageyojob`
- **Branch** : `claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ`
- **Docker Compose file** : `docker-compose.hostinger.yml`

### **Étape 3 : Configurer les Variables**

Dans l'interface Hostinger, ajouter ces variables :

```env
DOMAIN_NAME=yojob.fr
SSL_EMAIL=votre-email@yojob.fr
SUPABASE_PROJECT_ID=vhpbmckgxtdyxdwhmdxy
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE5ODUsImV4cCI6MjA3OTgzNzk4NX0.Vv0nIgRa91pi-trbK9drGTF6uoeCvvm4L2HEJ4UlyBo
NODE_ENV=production
TZ=Europe/Paris
```

### **Étape 4 : Déployer**

Cliquer sur **"Deploy"** et attendre ~5-10 minutes.

---

## 📋 Méthode 2 : Copier-Coller

### **Étape 1 : Sur Hostinger**

1. **Se connecter** à votre panel
2. **Docker** → **Create New Project**
3. **Choisir** "Paste docker-compose.yml"

### **Étape 2 : Coller le Docker Compose**

**Copier le contenu de `docker-compose.hostinger.yml`** :

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.6.1
    restart: always
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entryPoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.mytlschallenge.acme.tlschallenge=true"
      - "--certificatesresolvers.mytlschallenge.acme.email=${SSL_EMAIL}"
      - "--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json"
      - "--ping=true"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - traefik_data:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks: [yojob-network]
    labels:
      - traefik.enable=true
      - traefik.docker.network=yojob-network

  yojob-landing:
    build:
      context: https://github.com/Casakub/Newlandingpageyojob.git
      dockerfile: Dockerfile
    restart: always
    networks: [yojob-network]
    labels:
      - traefik.enable=true
      - traefik.http.routers.yojob-landing.rule=Host(`${DOMAIN_NAME}`)
      - traefik.http.routers.yojob-landing.entrypoints=websecure
      - traefik.http.routers.yojob-landing.tls.certresolver=mytlschallenge
      - traefik.http.services.yojob-landing.loadbalancer.server.port=80
      - traefik.docker.network=yojob-network

  yojob-survey:
    build:
      context: https://github.com/Casakub/Formulairelandingpageyojob.git#claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ:survey-form
      dockerfile: Dockerfile
      args:
        - VITE_SUPABASE_PROJECT_ID=${SUPABASE_PROJECT_ID}
        - VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    restart: always
    networks: [yojob-network]
    labels:
      - traefik.enable=true
      - traefik.http.routers.yojob-survey.rule=Host(`etude.${DOMAIN_NAME}`)
      - traefik.http.routers.yojob-survey.entrypoints=websecure
      - traefik.http.routers.yojob-survey.tls.certresolver=mytlschallenge
      - traefik.http.services.yojob-survey.loadbalancer.server.port=80
      - traefik.docker.network=yojob-network

volumes:
  traefik_data:

networks:
  yojob-network:
```

### **Étape 3 : Configurer les Variables**

**Copier le contenu de `.env.hostinger`** dans l'interface Hostinger :

```env
DOMAIN_NAME=yojob.fr
SSL_EMAIL=votre-email@yojob.fr
SUPABASE_PROJECT_ID=vhpbmckgxtdyxdwhmdxy
SUPABASE_ANON_KEY=eyJh...
NODE_ENV=production
```

### **Étape 4 : Déployer**

Cliquer sur **"Create Project"** ou **"Deploy"**.

---

## 🌐 Configuration DNS

**Avant le déploiement**, configurez votre DNS :

### **Chez votre registrar de domaine** :

```
Type A :
  yojob.fr        → IP_HOSTINGER (fournie par Hostinger)
  www.yojob.fr    → IP_HOSTINGER
  etude.yojob.fr  → IP_HOSTINGER
  traefik.yojob.fr → IP_HOSTINGER (optionnel, dashboard)
```

**Trouver votre IP Hostinger** :
- Panel Hostinger → VPS Info → IP Address

**Vérification** :
```bash
nslookup yojob.fr
nslookup etude.yojob.fr
```

---

## ⏱️ Temps de Déploiement

- **Build initial** : ~10-15 minutes
  - Landing page : ~5 min
  - Formulaire : ~5 min
  - Traefik SSL : ~1-2 min

- **Rebuild (après update)** : ~5 minutes

---

## ✅ Vérification

### **1. Vérifier les Conteneurs**

Dans l'interface Hostinger :
- ✅ `traefik` → Running
- ✅ `yojob-landing` → Running
- ✅ `yojob-survey` → Running

### **2. Tester les URLs**

Ouvrir dans le navigateur :
- 🌐 https://yojob.fr
- 🌐 https://etude.yojob.fr
- 🔧 https://traefik.yojob.fr (dashboard, avec auth)

### **3. Vérifier SSL**

Le certificat Let's Encrypt doit être automatiquement généré (cadenas vert dans le navigateur).

---

## 🔄 Mise à Jour de l'Application

### **Si déployé via GitHub** :

1. **Pousser vos modifications** :
   ```bash
   git add .
   git commit -m "Update application"
   git push
   ```

2. **Sur Hostinger** :
   - Aller dans votre projet
   - Cliquer sur **"Rebuild"** ou **"Redeploy"**
   - Attendre ~5 minutes

### **Si déployé via Copier-Coller** :

1. **Rebuild manuel** :
   - Éditer le docker-compose.yml si nécessaire
   - Sauvegarder
   - Cliquer sur **"Rebuild"**

---

## 🛠️ Fonctionnalités Hostinger

### **Logs**

Dans l'interface Hostinger :
- Cliquer sur votre projet
- Onglet **"Logs"**
- Voir les logs en temps réel par conteneur

### **Terminal**

Accéder au terminal d'un conteneur :
- Cliquer sur le conteneur
- Onglet **"Terminal"**
- Exécuter des commandes

### **Variables d'Environnement**

Modifier les variables :
- Onglet **"Environment"**
- Éditer/Ajouter des variables
- Sauvegarder → Redéploiement automatique

---

## 🆘 Troubleshooting

### **Problème : Build échoue**

**Vérifier** :
- Les repositories GitHub sont publics ?
- Le Dockerfile existe dans chaque repo ?
- Les variables d'environnement sont correctes ?

**Solution** :
- Vérifier les logs du build dans Hostinger
- Corriger les erreurs
- Rebuild

### **Problème : "Bad Gateway" ou 502**

**Cause** : Le conteneur n'a pas démarré correctement.

**Solution** :
- Vérifier les logs du conteneur
- Vérifier que le port 80 est exposé dans le Dockerfile
- Rebuild

### **Problème : SSL non généré**

**Vérifier** :
- DNS pointe bien vers l'IP Hostinger ?
- Attendre 5-10 minutes après le premier déploiement
- Les ports 80 et 443 sont bien ouverts ?

**Solution** :
- Vérifier les logs Traefik
- Restart du conteneur Traefik

---

## 📊 Limites Hostinger

**À vérifier selon votre plan** :
- Nombre de conteneurs simultanés
- RAM et CPU alloués
- Bande passante
- Stockage

---

## 💰 Optimisation des Coûts

### **Build Cache**

Hostinger garde un cache des builds Docker. Les rebuilds sont plus rapides.

### **Multi-stage Builds**

Les Dockerfiles utilisent déjà des multi-stage builds pour réduire la taille des images finales.

---

## 🎯 Checklist de Déploiement

- [ ] Repos GitHub prêts (landing-page + survey-form)
- [ ] Dockerfiles présents dans chaque repo
- [ ] DNS configurés (yojob.fr, etude.yojob.fr)
- [ ] Variables d'environnement préparées
- [ ] Projet créé sur Hostinger
- [ ] Docker-compose collé ou lien GitHub configuré
- [ ] Variables d'environnement ajoutées dans Hostinger
- [ ] Déploiement lancé
- [ ] Vérification HTTPS fonctionne
- [ ] Test des deux applications

---

## 🔗 Ressources

- [Hostinger Docker Compose Documentation](https://www.hostinger.com/tutorials/docker-compose)
- [Traefik Documentation](https://doc.traefik.io/traefik/)
- Support Hostinger si problème

---

## 🎉 Résultat Final

Après déploiement, vous aurez :

```
Hostinger:
  └── YOJOB Project
      ├── traefik (Reverse proxy + SSL)
      ├── yojob-landing (yojob.fr)
      └── yojob-survey (etude.yojob.fr)
```

**Accessible via** :
- 🌐 https://yojob.fr (Landing page)
- 🌐 https://etude.yojob.fr (Formulaire)
- 🔧 https://traefik.yojob.fr (Dashboard)

---

**Bonne chance avec votre déploiement sur Hostinger ! 🚀**
