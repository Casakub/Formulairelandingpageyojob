# 🚀 Quick Start Docker - YOJOB

Guide rapide pour déployer en 10 minutes.

## ✅ Fichiers Créés

Tous les fichiers nécessaires ont été créés :

```
✅ docker-compose.yml              Configuration des 5 conteneurs
✅ .env                            Variables d'environnement (à configurer)
✅ Dockerfile                      Image Docker du formulaire
✅ nginx.conf                      Config Nginx du formulaire
✅ .dockerignore                   Exclusions pour le build
✅ nginx/nginx.conf                Config Nginx principale
✅ nginx/sites-enabled/yojob.fr.conf
✅ nginx/sites-enabled/etude.yojob.fr.conf
✅ scripts/init-letsencrypt.sh     Script d'initialisation SSL
✅ src/lib/supabase.ts             Modifié pour Option B (env vars)
```

---

## 🎯 Actions à Faire

### **1. Configurer l'Email SSL**

```bash
nano .env
# Modifier : CERTBOT_EMAIL=votre-email@yojob.fr
```

### **2. Organiser les Dossiers**

**Structure attendue** :

```
yojob-project/
├── docker-compose.yml
├── .env
├── landing-page/        # ⚠️ À créer ou copier
├── survey-form/         # 📂 Répertoire actuel
├── nginx/
├── certbot/
└── scripts/
```

**Option A** : Renommer ce dossier

```bash
cd ..
mv Formulairelandingpageyojob survey-form
cd survey-form
```

**Option B** : Copier dans une nouvelle structure

```bash
mkdir -p /opt/yojob/survey-form
cp -r . /opt/yojob/survey-form/
cd /opt/yojob
```

### **3. Ajouter la Landing Page**

Si vous n'avez pas encore de landing page :

```bash
# Créer un placeholder temporaire
mkdir -p landing-page
cat > landing-page/Dockerfile << 'EOF'
FROM nginx:alpine
RUN echo "<h1>YOJOB - Coming Soon</h1>" > /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
```

### **4. Configurer le DNS**

Ajouter dans votre DNS :

```
Type  | Nom   | Valeur
------|-------|------------------
A     | @     | IP_DE_VOTRE_VPS
A     | www   | IP_DE_VOTRE_VPS
A     | etude | IP_DE_VOTRE_VPS
```

### **5. Déploiement**

```bash
# Build
docker-compose build

# Initialiser SSL
chmod +x scripts/init-letsencrypt.sh
./scripts/init-letsencrypt.sh

# Démarrer
docker-compose up -d

# Vérifier
docker-compose ps
docker-compose logs -f
```

---

## 🔄 Après Modification Figma Make

```bash
cd survey-form
git pull
cd ..
docker-compose build survey
docker-compose up -d survey
```

**Downtime** : ~2-3 secondes pour `etude.yojob.fr` uniquement.

---

## 📖 Documentation Complète

👉 Voir **DOCKER_DEPLOYMENT.md** pour :
- Guide détaillé étape par étape
- Toutes les commandes utiles
- Troubleshooting
- Monitoring
- Workflow de développement

---

## 🆘 Aide Rapide

**Voir les logs** :
```bash
docker-compose logs -f
```

**Redémarrer un service** :
```bash
docker-compose restart survey
```

**Rebuild complet** :
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Vérifier SSL** :
```bash
docker-compose exec certbot certbot certificates
```

---

## 📊 Structure des Conteneurs

```
yojob-landing    → yojob.fr
yojob-survey     → etude.yojob.fr
yojob-nginx      → Reverse proxy + SSL
yojob-certbot    → Renouvellement SSL automatique
yojob-watchtower → Auto-update des images
```

---

**🎉 C'est prêt à déployer !**

Lisez **DOCKER_DEPLOYMENT.md** pour plus de détails.
