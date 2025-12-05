# ⚙️ Configuration Environnement - YOJOB

Guide de configuration des variables d'environnement pour l'infrastructure Docker YOJOB.

---

## 🎯 Architecture : UN docker-compose.yml Central

```
yojob-project/
├── docker-compose.yml          ← SEUL UTILISÉ ✅
├── .env                        ← TOUTES LES VARIABLES ✅
│
├── landing-page/
│   ├── docker-compose.yml      ← IGNORÉ (existe mais non utilisé)
│   ├── Dockerfile              ← Utilisé par le docker-compose.yml racine
│   └── ...
│
└── survey-form/
    ├── Dockerfile              ← Utilisé par le docker-compose.yml racine
    └── ...
```

**Principe** : Le docker-compose.yml à la **racine** orchestre TOUT et lit le `.env` à la racine.

---

## 📋 Fichier .env Complet

### **Contenu Actuel**

```env
# ==========================================
# Supabase Configuration (Formulaire)
# ==========================================
SUPABASE_PROJECT_ID=vhpbmckgxtdyxdwhmdxy
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE5ODUsImV4cCI6MjA3OTgzNzk4NX0.Vv0nIgRa91pi-trbK9drGTF6uoeCvvm4L2HEJ4UlyBo

# ==========================================
# Domain Configuration
# ==========================================
DOMAIN_LANDING=yojob.fr
DOMAIN_SURVEY=etude.yojob.fr

# ==========================================
# Email pour Let's Encrypt
# ==========================================
CERTBOT_EMAIL=votre-email@yojob.fr

# ==========================================
# Environment
# ==========================================
NODE_ENV=production
```

### **Contenu à Ajouter (si nécessaire)**

Si votre landing page a besoin de variables d'environnement :

```env
# ==========================================
# Landing Page Configuration
# ==========================================
# API URL (si la landing page fait des appels API)
VITE_API_URL=https://api.yojob.fr

# Google Analytics (si vous utilisez Google Analytics)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Autres variables spécifiques à la landing page
# VITE_FEATURE_FLAG_X=true
# VITE_CONTACT_EMAIL=contact@yojob.fr
```

### **Template Complet**

```env
# ==========================================
# Supabase Configuration (Formulaire)
# ==========================================
SUPABASE_PROJECT_ID=vhpbmckgxtdyxdwhmdxy
SUPABASE_ANON_KEY=eyJh...

# ==========================================
# Landing Page Configuration
# ==========================================
# Décommenter et configurer si nécessaire :
# VITE_API_URL=https://api.yojob.fr
# VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# ==========================================
# Domain Configuration
# ==========================================
DOMAIN_LANDING=yojob.fr
DOMAIN_SURVEY=etude.yojob.fr

# ==========================================
# Email pour Let's Encrypt
# ==========================================
CERTBOT_EMAIL=votre-email@yojob.fr

# ==========================================
# Environment
# ==========================================
NODE_ENV=production
```

---

## 🔧 Comment ça Fonctionne

### **1. Vite Build-Time Variables**

⚠️ **IMPORTANT** : Vite intègre les variables d'environnement **au moment du build**, pas au runtime.

```dockerfile
# Dans le Dockerfile
ARG VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID

RUN npm run build  # Les variables sont intégrées ICI
```

### **2. Flux des Variables**

```
.env (racine)
    ↓
docker-compose.yml (lit le .env)
    ↓
build.args (passe aux Dockerfiles)
    ↓
ENV dans le Dockerfile
    ↓
npm run build (intègre dans le bundle JS)
    ↓
Image Docker finale (variables déjà dans le code JS)
```

### **3. Exemple pour la Landing Page**

**Étape 1** : Ajouter dans `.env`

```env
VITE_API_URL=https://api.yojob.fr
```

**Étape 2** : Modifier `docker-compose.yml`

```yaml
landing:
  build:
    context: ./landing-page
    dockerfile: Dockerfile
    args:
      - NODE_ENV=production
      - VITE_API_URL=${VITE_API_URL}  # ← Ajouter ici
```

**Étape 3** : Le `Dockerfile` (déjà configuré)

```dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
```

**Étape 4** : Dans votre code React

```typescript
// Dans landing-page/src/config.ts
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Utilisation
fetch(`${API_URL}/contact`, { ... })
```

---

## 🚀 Commandes de Build

### **Build avec Variables d'Environnement**

```bash
# Le .env est lu automatiquement par docker-compose
docker-compose build

# OU en spécifiant explicitement le .env
docker-compose --env-file .env build

# OU en overridant une variable
VITE_API_URL=https://staging-api.yojob.fr docker-compose build landing
```

### **Vérifier les Variables**

```bash
# Voir les variables passées au build
docker-compose config

# Tester dans le conteneur (après build)
docker-compose run --rm landing sh
# Dans le container :
env | grep VITE
```

---

## 🔒 Sécurité

### **Variables Publiques vs Privées**

**Variables PUBLIQUES** (intégrées dans le bundle client) :
- ✅ `VITE_API_URL` - OK, c'est public
- ✅ `VITE_GOOGLE_ANALYTICS_ID` - OK, visible de toute façon
- ✅ `VITE_SUPABASE_PROJECT_ID` - OK (anon key publique)
- ✅ `VITE_SUPABASE_ANON_KEY` - OK (conçue pour être publique)

**Variables PRIVÉES** (NE JAMAIS mettre dans Vite avec `VITE_`) :
- ❌ `SUPABASE_SERVICE_ROLE_KEY` - Secret serveur
- ❌ `DATABASE_PASSWORD` - Secret serveur
- ❌ `JWT_SECRET` - Secret serveur
- ❌ API keys privées

### **Protection du .env**

```bash
# Le .env ne doit JAMAIS être commité
echo ".env" >> .gitignore

# Permissions restreintes
chmod 600 .env

# Template pour l'équipe
cp .env .env.example
# Éditer .env.example pour retirer les vraies valeurs
git add .env.example
```

---

## 📝 Checklist de Configuration

### **Avant le Premier Déploiement**

- [ ] Créer le `.env` à la racine
- [ ] Configurer `CERTBOT_EMAIL` avec votre vrai email
- [ ] Vérifier `DOMAIN_LANDING` et `DOMAIN_SURVEY`
- [ ] Ajouter les variables spécifiques à la landing page (si nécessaire)
- [ ] Tester le build localement : `docker-compose build`
- [ ] Vérifier que le `.env` est dans `.gitignore`

### **Pour Ajouter une Nouvelle Variable**

1. [ ] Ajouter dans `.env`
   ```env
   VITE_MA_NOUVELLE_VAR=valeur
   ```

2. [ ] Ajouter dans `docker-compose.yml`
   ```yaml
   args:
     - VITE_MA_NOUVELLE_VAR=${VITE_MA_NOUVELLE_VAR}
   ```

3. [ ] Le `Dockerfile` la récupère automatiquement (déjà configuré)
   ```dockerfile
   ARG VITE_MA_NOUVELLE_VAR
   ENV VITE_MA_NOUVELLE_VAR=$VITE_MA_NOUVELLE_VAR
   ```

4. [ ] Utiliser dans le code
   ```typescript
   const maVar = import.meta.env.VITE_MA_NOUVELLE_VAR;
   ```

5. [ ] Rebuild
   ```bash
   docker-compose build landing  # ou survey
   docker-compose up -d landing
   ```

---

## 🔄 Environnements Multiples

### **Development, Staging, Production**

**Option 1** : Fichiers .env multiples

```
.env.development
.env.staging
.env.production
```

**Utilisation** :

```bash
# Development
docker-compose --env-file .env.development build

# Staging
docker-compose --env-file .env.staging build

# Production (par défaut)
docker-compose build
```

**Option 2** : Overrides

```yaml
# docker-compose.override.yml (pour dev local)
version: '3.8'
services:
  landing:
    build:
      args:
        - VITE_API_URL=http://localhost:3001
```

---

## 🆘 Troubleshooting

### **Problème : Variables non définies dans le code**

**Solution** : Les variables Vite doivent commencer par `VITE_`

```env
# ❌ Mauvais
API_URL=https://api.yojob.fr

# ✅ Bon
VITE_API_URL=https://api.yojob.fr
```

### **Problème : Variables non mises à jour après modification**

**Solution** : Rebuild l'image (les variables sont intégrées au build)

```bash
docker-compose build --no-cache landing
docker-compose up -d landing
```

### **Problème : "variable is undefined"**

**Vérifier dans l'ordre** :

1. Variable dans `.env` ?
   ```bash
   cat .env | grep VITE_MA_VAR
   ```

2. Variable dans `docker-compose.yml` ?
   ```bash
   grep -A 5 "args:" docker-compose.yml
   ```

3. Variable passée au build ?
   ```bash
   docker-compose config | grep VITE_MA_VAR
   ```

4. Rebuild sans cache
   ```bash
   docker-compose build --no-cache
   ```

---

## 📚 Références

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/)
- [Docker Build Args](https://docs.docker.com/engine/reference/builder/#arg)

---

## 🎯 Résumé

✅ **UN SEUL** docker-compose.yml à la racine
✅ **UN SEUL** .env à la racine
✅ Variables `VITE_*` pour le code client
✅ Build args dans docker-compose.yml
✅ Rebuild après modification du .env

---

**Tout est configuré pour que vous puissiez déployer facilement !** 🚀
