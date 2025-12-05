# 🔗 Intégration de la Landing Page - Guide Complet

Guide pour intégrer le repository `Newlandingpageyojob` dans l'infrastructure Docker YOJOB.

---

## 📋 Prérequis

Le repository landing page doit contenir :
- ✅ Un projet web (React, Vue, HTML statique, etc.)
- ✅ Un fichier `package.json` (si framework JS)
- ✅ Un système de build (ou fichiers statiques)

---

## 🎯 Méthode 1 : Git Submodule (Recommandée)

### **Étape 1 : Ajouter comme Submodule**

```bash
cd /home/user/Formulairelandingpageyojob

# Ajouter le submodule
git submodule add https://github.com/Casakub/Newlandingpageyojob.git landing-page

# Initialiser et mettre à jour
git submodule init
git submodule update

# Vérifier
ls -la landing-page/
```

### **Étape 2 : Créer le Dockerfile pour la Landing Page**

**Cas A : Si la landing page est React + Vite (comme le formulaire)**

```bash
# Copier le Dockerfile du formulaire
cp Dockerfile landing-page/Dockerfile
cp nginx.conf landing-page/nginx.conf
```

**Cas B : Si la landing page est différente**

Créer `landing-page/Dockerfile` :

```dockerfile
# Pour React + Vite
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
RUN apk add --no-cache wget
COPY --from=builder /app/dist /usr/share/nginx/html
# OU /app/build selon le projet
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Cas C : Si la landing page est en HTML statique**

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Étape 3 : Restructurer le Projet**

```bash
cd /home/user/Formulairelandingpageyojob

# Créer le dossier survey-form
mkdir -p survey-form-temp

# Déplacer les fichiers du formulaire
mv src survey-form-temp/
mv package.json survey-form-temp/
mv vite.config.ts survey-form-temp/
mv index.html survey-form-temp/
mv Dockerfile survey-form-temp/
mv nginx.conf survey-form-temp/
mv .npmrc survey-form-temp/

# Renommer
mv survey-form-temp survey-form

# Vérifier la structure
ls -la
```

**Structure finale** :

```
Formulairelandingpageyojob/
├── docker-compose.yml
├── .env
├── .gitmodules                 (créé automatiquement)
├── landing-page/               (submodule)
│   ├── Dockerfile              (à créer)
│   ├── nginx.conf              (à créer si besoin)
│   └── src/...
├── survey-form/                (ancien contenu)
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/...
├── nginx/
├── certbot/
└── scripts/
```

### **Étape 4 : Commit**

```bash
git add .gitmodules landing-page survey-form
git commit -m "Restructure: Add landing page submodule and move survey to survey-form/"
git push
```

### **Étape 5 : Déploiement sur VPS**

```bash
# Sur le VPS
cd /opt

# Clone avec submodules
git clone --recurse-submodules \
  -b claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ \
  https://github.com/Casakub/Formulairelandingpageyojob.git yojob

cd yojob

# Configurer .env
nano .env

# Build et deploy
docker-compose build
./scripts/init-letsencrypt.sh
docker-compose up -d
```

### **Étape 6 : Mise à Jour de la Landing Page**

```bash
# Sur le VPS
cd /opt/yojob/landing-page
git pull origin main

# Rebuild seulement la landing page
cd ..
docker-compose build landing
docker-compose up -d landing
```

---

## 🎯 Méthode 2 : Clone Séparé (Plus Simple)

### **Sur le VPS**

```bash
# Clone du projet principal
git clone -b claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ \
  https://github.com/Casakub/Formulairelandingpageyojob.git yojob

cd yojob

# Restructurer
mkdir survey-form
mv src package.json vite.config.ts index.html Dockerfile nginx.conf .npmrc survey-form/

# Clone de la landing page
git clone https://github.com/Casakub/Newlandingpageyojob.git landing-page

# Créer le Dockerfile pour landing page (si nécessaire)
# Voir les exemples ci-dessus

# Deploy
docker-compose build
./scripts/init-letsencrypt.sh
docker-compose up -d
```

### **Mise à Jour**

```bash
# Landing page
cd /opt/yojob/landing-page
git pull
cd ..
docker-compose build landing
docker-compose up -d landing

# Survey form
cd /opt/yojob/survey-form
git pull
cd ..
docker-compose build survey
docker-compose up -d survey
```

---

## 🎯 Méthode 3 : Repo d'Orchestration

Créer un nouveau repo `yojob-deployment` qui contient uniquement la config Docker.

### **Structure**

```
yojob-deployment/  (nouveau repo)
├── docker-compose.yml
├── .env
├── nginx/
├── scripts/
│   ├── init-letsencrypt.sh
│   └── deploy.sh
└── .gitignore
```

### **Script `scripts/deploy.sh`**

```bash
#!/bin/bash

set -e

echo "🚀 YOJOB Deployment Script"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Clone ou update landing page
echo -e "${YELLOW}📦 Updating landing page...${NC}"
if [ ! -d "landing-page" ]; then
  git clone https://github.com/Casakub/Newlandingpageyojob.git landing-page
else
  cd landing-page && git pull && cd ..
fi

# Clone ou update survey form
echo -e "${YELLOW}📦 Updating survey form...${NC}"
if [ ! -d "survey-form" ]; then
  git clone https://github.com/Casakub/Formulairelandingpageyojob.git survey-form
else
  cd survey-form && git pull && cd ..
fi

# Build
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker-compose build

# Deploy
echo -e "${YELLOW}🚀 Deploying containers...${NC}"
docker-compose up -d

echo -e "${GREEN}✅ Deployment complete!${NC}"
docker-compose ps
```

### **Utilisation**

```bash
cd /opt/yojob-deployment
./scripts/deploy.sh
```

---

## 🔧 Détection Automatique du Type de Projet

### **Script pour détecter et créer le Dockerfile**

```bash
#!/bin/bash

PROJECT_DIR=$1

if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ Directory not found: $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"

# Détecter le type de projet
if [ -f "package.json" ]; then
  echo "📦 Node.js project detected"

  # Lire le package.json pour détecter le framework
  if grep -q "vite" package.json; then
    echo "⚡ Vite detected"
    BUILD_DIR="dist"
    BUILD_CMD="npm run build"
  elif grep -q "next" package.json; then
    echo "▲ Next.js detected"
    BUILD_DIR=".next"
    BUILD_CMD="npm run build"
  elif grep -q "react-scripts" package.json; then
    echo "⚛️  Create React App detected"
    BUILD_DIR="build"
    BUILD_CMD="npm run build"
  else
    echo "📦 Generic Node.js project"
    BUILD_DIR="dist"
    BUILD_CMD="npm run build"
  fi

  # Créer le Dockerfile
  cat > Dockerfile << EOF
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN $BUILD_CMD

FROM nginx:alpine
RUN apk add --no-cache wget
COPY --from=builder /app/$BUILD_DIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

  echo "✅ Dockerfile created for Node.js project"

elif [ -f "index.html" ]; then
  echo "📄 Static HTML project detected"

  cat > Dockerfile << EOF
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

  echo "✅ Dockerfile created for static HTML project"
else
  echo "❌ Unknown project type"
  exit 1
fi
```

**Utilisation** :

```bash
./scripts/create-dockerfile.sh landing-page
```

---

## 📝 Checklist d'Intégration

- [ ] Choisir la méthode (Submodule, Clone séparé, ou Orchestration)
- [ ] Vérifier le type de projet landing page
- [ ] Créer le Dockerfile approprié pour la landing page
- [ ] Créer nginx.conf si nécessaire
- [ ] Restructurer le projet (survey-form/)
- [ ] Tester le build localement
- [ ] Commit et push
- [ ] Déployer sur le VPS
- [ ] Vérifier que les deux sites fonctionnent
- [ ] Tester les mises à jour indépendantes

---

## 🆘 Troubleshooting

### **Problème : Build folder not found**

**Solution** : Vérifier le nom du dossier de build dans le Dockerfile.

```bash
# Tester localement
cd landing-page
npm install
npm run build
ls -la  # Voir le nom du dossier créé (dist, build, .next, etc.)
```

### **Problème : Submodule vide après clone**

**Solution** :

```bash
git submodule init
git submodule update --recursive
```

---

## 🎉 Résultat Final

Après intégration, vous aurez :

- ✅ **yojob.fr** : Landing page (conteneur indépendant)
- ✅ **etude.yojob.fr** : Formulaire (conteneur indépendant)
- ✅ Déploiement séparé : modifier une app sans affecter l'autre
- ✅ SSL automatique sur les deux domaines
- ✅ Auto-update avec Watchtower

---

**Prochaine étape** : Partagez-moi les informations sur le repo landing page pour que je vous aide à créer le bon Dockerfile !
