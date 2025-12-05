# 🚀 YOJOB - Guide de Déploiement

Ce projet contient **deux configurations Docker** différentes. Choisissez celle qui correspond à votre besoin.

---

## 📦 Quelle Configuration Utiliser ?

### **Option 1 : Traefik (Recommandée)** ⭐

**Fichiers** :
- `docker-compose.traefik.yml`
- `.env.traefik`
- `DEPLOYMENT_TRAEFIK.md`

**Avantages** :
- ✅ SSL automatique avec Let's Encrypt (TLS Challenge)
- ✅ Routing par labels Docker (pas de fichiers de config)
- ✅ Dashboard Traefik pour monitoring
- ✅ Compatible avec votre infrastructure n8n existante
- ✅ Plus moderne et flexible

**Quand l'utiliser** :
- Vous voulez une stack moderne et simple
- Vous utilisez déjà Traefik ailleurs (comme pour n8n)
- Vous voulez un dashboard de monitoring
- Infrastructure séparée de n8n

**Démarrage rapide** :
```bash
# Copier le .env
cp .env.traefik .env

# Configurer
nano .env  # Modifier SSL_EMAIL et DOMAIN_NAME

# Démarrer
docker-compose -f docker-compose.traefik.yml up -d
```

📖 **Guide complet** : [DEPLOYMENT_TRAEFIK.md](DEPLOYMENT_TRAEFIK.md)

---

### **Option 2 : Nginx + Certbot (Alternative)**

**Fichiers** :
- `docker-compose.yml`
- `.env`
- `DOCKER_DEPLOYMENT.md`

**Avantages** :
- ✅ Stack classique et éprouvée
- ✅ Plus de contrôle sur la config Nginx
- ✅ Certbot pour SSL Let's Encrypt (HTTP Challenge)

**Quand l'utiliser** :
- Vous préférez Nginx
- Vous avez besoin de configurations Nginx avancées
- Vous ne voulez pas de Traefik

**Démarrage rapide** :
```bash
# Configurer
nano .env  # Modifier CERTBOT_EMAIL

# Initialiser SSL
./scripts/init-letsencrypt.sh

# Démarrer
docker-compose up -d
```

📖 **Guide complet** : [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

---

## 🎯 Recommandation

**Pour votre cas (infrastructure similaire à n8n)** :

👉 **Utilisez Traefik (Option 1)**

Pourquoi ?
- Même approche que votre projet n8n
- Plus simple à gérer
- Labels Docker au lieu de fichiers de config
- Dashboard intégré

---

## 📁 Structure du Projet

```
Formulairelandingpageyojob/
│
├── 🚀 OPTION 1 : TRAEFIK (Recommandée)
│   ├── docker-compose.traefik.yml
│   ├── .env.traefik
│   └── DEPLOYMENT_TRAEFIK.md
│
├── 🔧 OPTION 2 : NGINX + CERTBOT
│   ├── docker-compose.yml
│   ├── .env
│   ├── DOCKER_DEPLOYMENT.md
│   ├── nginx/
│   └── scripts/init-letsencrypt.sh
│
├── 📚 DOCUMENTATION
│   ├── QUICK_START_DOCKER.md
│   ├── ENV_CONFIGURATION.md
│   └── INTEGRATION_LANDING_PAGE.md
│
├── 🏗️ CODE SOURCE (à organiser)
│   ├── landing-page/          (à ajouter via Git submodule)
│   └── survey-form/            (contenu actuel à déplacer)
│
└── 🛠️ FICHIERS DOCKER
    ├── Dockerfile              (pour les conteneurs)
    ├── nginx.conf              (config interne des conteneurs)
    └── .dockerignore
```

---

## 🔄 Prochaines Étapes

### **1. Choisir votre configuration**

Décidez entre Traefik ou Nginx+Certbot.

### **2. Organiser les dossiers**

```bash
# Ajouter la landing page
git submodule add https://github.com/Casakub/Newlandingpageyojob.git landing-page

# Déplacer le formulaire
mkdir survey-form
mv src package.json vite.config.ts index.html survey-form/
cp Dockerfile nginx.conf survey-form/
```

### **3. Déployer**

Suivre le guide correspondant :
- **Traefik** → [DEPLOYMENT_TRAEFIK.md](DEPLOYMENT_TRAEFIK.md)
- **Nginx** → [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

---

## 📖 Documentation Disponible

| Fichier | Description |
|---------|-------------|
| **README_DEPLOYMENT.md** | Ce fichier (choisir sa config) |
| **DEPLOYMENT_TRAEFIK.md** | Guide complet Traefik ⭐ |
| **DOCKER_DEPLOYMENT.md** | Guide complet Nginx+Certbot |
| **QUICK_START_DOCKER.md** | Démarrage rapide (Nginx) |
| **ENV_CONFIGURATION.md** | Gestion des variables d'environnement |
| **INTEGRATION_LANDING_PAGE.md** | Intégrer le repo landing page |

---

## 🆘 Besoin d'Aide ?

### **Pour Traefik** :
Consultez [DEPLOYMENT_TRAEFIK.md](DEPLOYMENT_TRAEFIK.md)

### **Pour Nginx** :
Consultez [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md)

### **Pour les variables d'environnement** :
Consultez [ENV_CONFIGURATION.md](ENV_CONFIGURATION.md)

---

## 🎯 TL;DR - Déploiement Express

### **Avec Traefik (Recommandé)** :

```bash
cd /opt/yojob
git clone --recurse-submodules [votre-repo] .
cp .env.traefik .env
nano .env  # Configurer SSL_EMAIL
docker network create yojob-network
docker-compose -f docker-compose.traefik.yml up -d
```

### **Avec Nginx** :

```bash
cd /opt/yojob
git clone --recurse-submodules [votre-repo] .
nano .env  # Configurer CERTBOT_EMAIL
./scripts/init-letsencrypt.sh
docker-compose up -d
```

---

**Bonne chance avec votre déploiement ! 🚀**
