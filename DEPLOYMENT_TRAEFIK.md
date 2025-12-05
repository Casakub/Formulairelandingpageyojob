# 🚀 Déploiement YOJOB avec Traefik

Guide complet pour déployer les applications YOJOB (landing page + formulaire) avec Traefik.

---

## 📋 Architecture

```
Internet
    │
    ▼
Traefik (Ports 80/443)
    │
    ├──▶ yojob.fr (+ www)──────▶ yojob-landing (conteneur)
    │
    └──▶ etude.yojob.fr ───────▶ yojob-survey (conteneur)

Services :
  • Traefik : Reverse proxy + SSL Let's Encrypt automatique
  • yojob-landing : Site principal React+Vite
  • yojob-survey : Formulaire React+Vite avec Supabase
  • watchtower : Auto-update des conteneurs (optionnel)
```

---

## 🎯 Avantages de cette Stack

✅ **SSL automatique** : Let's Encrypt via Traefik TLS Challenge
✅ **Routing par domaine** : Labels Traefik (pas de fichiers de config)
✅ **Security headers** : HSTS, XSS Protection, etc.
✅ **Dashboard Traefik** : Monitoring sur traefik.yojob.fr (optionnel)
✅ **Auto-update** : Watchtower surveille les nouvelles images
✅ **Séparé de n8n** : Infrastructure dédiée YOJOB

---

## 📁 Structure du Projet

```
yojob-project/
├── docker-compose.traefik.yml  ✅ Stack complète avec Traefik
├── .env.traefik                ✅ Variables d'environnement
│
├── landing-page/               (Git submodule)
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── survey-form/                (Git submodule ou dossier)
    ├── Dockerfile
    ├── nginx.conf
    ├── src/
    ├── package.json
    └── vite.config.ts
```

---

## 🚀 Déploiement en 10 Étapes

### **1. Préparer le VPS**

```bash
# Connexion SSH
ssh user@votre-vps.com

# Créer le dossier du projet (séparé de n8n)
mkdir -p /opt/yojob
cd /opt/yojob
```

### **2. Cloner les Repositories**

**Option A : Avec Git Submodules (recommandé)**

```bash
# Cloner le projet principal avec les submodules
git clone --recurse-submodules \
  -b claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ \
  https://github.com/Casakub/Formulairelandingpageyojob.git .

# Ajouter la landing page comme submodule (si pas déjà fait)
git submodule add https://github.com/Casakub/Newlandingpageyojob.git landing-page
git submodule init
git submodule update
```

**Option B : Clones séparés (plus simple)**

```bash
# Cloner la landing page
git clone https://github.com/Casakub/Newlandingpageyojob.git landing-page

# Cloner le formulaire
git clone -b claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ \
  https://github.com/Casakub/Formulairelandingpageyojob.git survey-form-source

# Extraire le contenu du formulaire
mkdir survey-form
cp -r survey-form-source/src survey-form/
cp survey-form-source/{package.json,vite.config.ts,index.html,.npmrc,Dockerfile,nginx.conf} survey-form/
rm -rf survey-form-source

# Copier les fichiers Docker à la racine
cp survey-form/docker-compose.traefik.yml .
cp survey-form/.env.traefik .env
cp survey-form/Dockerfile landing-page/
cp survey-form/nginx.conf landing-page/
```

### **3. Configuration DNS**

Avant de continuer, configurer le DNS :

```
Type A :
  yojob.fr        → IP_DU_VPS
  www.yojob.fr    → IP_DU_VPS
  etude.yojob.fr  → IP_DU_VPS
  traefik.yojob.fr → IP_DU_VPS (optionnel, pour le dashboard)
```

**Vérifier** :

```bash
nslookup yojob.fr
nslookup etude.yojob.fr
```

### **4. Configurer l'Environnement**

```bash
# Éditer le .env
nano .env

# Modifier ces lignes :
SSL_EMAIL=votre-email@yojob.fr  # ⚠️ Email valide pour Let's Encrypt
DOMAIN_NAME=yojob.fr

# Si vous voulez activer le dashboard Traefik :
# Générer un mot de passe bcrypt
htpasswd -nb admin votre_mot_de_passe | sed 's/\$/\$\$/g'
# Copier le résultat dans TRAEFIK_DASHBOARD_AUTH
```

**Générer un mot de passe bcrypt en ligne** (si `htpasswd` n'est pas installé) :
- https://hostingcanada.org/htpasswd-generator/
- Remplacer les `$` par `$$` dans le .env

### **5. Vérifier la Structure**

```bash
# Vérifier que tout est en place
ls -la

# Vous devriez voir :
# docker-compose.traefik.yml
# .env
# landing-page/
# survey-form/

# Vérifier les Dockerfiles
ls -la landing-page/Dockerfile
ls -la survey-form/Dockerfile
```

### **6. Build des Images**

```bash
# Build sans démarrer
docker-compose -f docker-compose.traefik.yml build

# Vérifier les images créées
docker images | grep yojob
```

### **7. Créer le Réseau et Volume**

```bash
# Créer le réseau Docker
docker network create yojob-network

# Le volume traefik_data sera créé automatiquement
```

### **8. Démarrer les Services**

```bash
# Démarrer tout
docker-compose -f docker-compose.traefik.yml up -d

# Vérifier que tout tourne
docker-compose -f docker-compose.traefik.yml ps
```

**Résultat attendu** :

```
NAME                STATUS              PORTS
traefik             Up                  0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
yojob-landing       Up
yojob-survey        Up
yojob-watchtower    Up
```

### **9. Vérifier les Logs**

```bash
# Logs en temps réel
docker-compose -f docker-compose.traefik.yml logs -f

# Logs Traefik (pour voir les certificats SSL)
docker-compose -f docker-compose.traefik.yml logs traefik | grep certificate

# Logs d'un service spécifique
docker-compose -f docker-compose.traefik.yml logs -f yojob-landing
```

### **10. Tester l'Accès**

```bash
# Tester HTTP (doit rediriger vers HTTPS)
curl -I http://yojob.fr
curl -I http://etude.yojob.fr

# Tester HTTPS
curl -I https://yojob.fr
curl -I https://etude.yojob.fr

# Dashboard Traefik (si activé)
curl -I https://traefik.yojob.fr
```

**Ouvrir dans le navigateur** :
- 🌐 https://yojob.fr
- 🌐 https://etude.yojob.fr
- 🔧 https://traefik.yojob.fr (dashboard, avec auth)

---

## 🔄 Mise à Jour des Applications

### **Mise à Jour de la Landing Page**

```bash
cd /opt/yojob/landing-page
git pull origin main

cd /opt/yojob
docker-compose -f docker-compose.traefik.yml build yojob-landing
docker-compose -f docker-compose.traefik.yml up -d yojob-landing

# ⏱️ Downtime : ~2-3 secondes
# ✅ etude.yojob.fr reste en ligne
```

### **Mise à Jour du Formulaire**

```bash
cd /opt/yojob/survey-form
git pull origin main

cd /opt/yojob
docker-compose -f docker-compose.traefik.yml build yojob-survey
docker-compose -f docker-compose.traefik.yml up -d yojob-survey

# ⏱️ Downtime : ~2-3 secondes
# ✅ yojob.fr reste en ligne
```

---

## 🛠️ Commandes Utiles

### **Gestion des Services**

```bash
# Voir l'état
docker-compose -f docker-compose.traefik.yml ps

# Démarrer
docker-compose -f docker-compose.traefik.yml up -d

# Arrêter
docker-compose -f docker-compose.traefik.yml down

# Redémarrer un service
docker-compose -f docker-compose.traefik.yml restart yojob-landing

# Rebuild complet
docker-compose -f docker-compose.traefik.yml build --no-cache
docker-compose -f docker-compose.traefik.yml up -d
```

### **Logs**

```bash
# Logs en temps réel de tous les services
docker-compose -f docker-compose.traefik.yml logs -f

# Logs d'un service
docker-compose -f docker-compose.traefik.yml logs -f yojob-landing

# Logs des dernières 100 lignes
docker-compose -f docker-compose.traefik.yml logs --tail=100
```

### **Certificats SSL**

```bash
# Voir les certificats Let's Encrypt
docker exec traefik cat /letsencrypt/acme.json | jq .

# Forcer le renouvellement (si problème)
docker-compose -f docker-compose.traefik.yml restart traefik
```

### **Dashboard Traefik**

Accédez à https://traefik.yojob.fr pour voir :
- Liste des routers et services
- État des certificats SSL
- Métriques en temps réel

---

## 🔒 Sécurité

### **1. Firewall (UFW)**

```bash
# Autoriser uniquement HTTP, HTTPS et SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

### **2. Protection du .env**

```bash
chmod 600 .env
echo ".env" >> .gitignore
```

### **3. Dashboard Traefik**

Le dashboard est protégé par :
- ✅ Auth basic (login/mot de passe)
- ✅ HTTPS obligatoire
- ✅ Security headers

**Pour désactiver le dashboard** (production) :

```bash
# Dans docker-compose.traefik.yml, commenter :
# - "--api.dashboard=true"
# Et toutes les labels traefik.http.routers.traefik.*
```

---

## 📊 Monitoring

### **1. Watchtower (Auto-update)**

Watchtower vérifie toutes les 5 minutes s'il y a de nouvelles images Docker.

**Voir les logs** :

```bash
docker-compose -f docker-compose.traefik.yml logs watchtower
```

**Forcer une vérification** :

```bash
docker-compose -f docker-compose.traefik.yml restart watchtower
```

### **2. Healthchecks**

Tous les conteneurs ont des healthchecks :

```bash
# Voir l'état de santé
docker ps --format "table {{.Names}}\t{{.Status}}"
```

### **3. Ressources Système**

```bash
# Utilisation CPU/RAM en temps réel
docker stats

# Espace disque Docker
docker system df
```

---

## 🆘 Troubleshooting

### **Problème : Certificats SSL non créés**

**Vérifier** :

```bash
# DNS pointe bien vers le VPS ?
nslookup yojob.fr

# Port 80 accessible ?
curl http://yojob.fr/.well-known/acme-challenge/test

# Logs Traefik
docker-compose -f docker-compose.traefik.yml logs traefik | grep certificate
```

**Solution** :

```bash
# Redémarrer Traefik
docker-compose -f docker-compose.traefik.yml restart traefik

# Attendre 1-2 minutes et recharger https://yojob.fr
```

### **Problème : "Bad Gateway" ou 502**

**Cause** : Le conteneur backend n'est pas prêt.

**Solution** :

```bash
# Vérifier l'état des conteneurs
docker-compose -f docker-compose.traefik.yml ps

# Voir les logs du conteneur
docker-compose -f docker-compose.traefik.yml logs yojob-landing

# Rebuild si nécessaire
docker-compose -f docker-compose.traefik.yml build yojob-landing
docker-compose -f docker-compose.traefik.yml up -d yojob-landing
```

### **Problème : Variables d'environnement non prises en compte**

**Solution** :

```bash
# Vérifier le .env
cat .env

# Rebuild avec --no-cache
docker-compose -f docker-compose.traefik.yml build --no-cache
docker-compose -f docker-compose.traefik.yml up -d
```

### **Problème : Dashboard Traefik inaccessible**

**Vérifier** :

```bash
# Le DNS traefik.yojob.fr pointe bien ?
nslookup traefik.yojob.fr

# Le mot de passe est correct ?
echo $TRAEFIK_DASHBOARD_AUTH
```

---

## 🎯 Checklist de Déploiement

- [ ] VPS prêt avec Docker + Docker Compose
- [ ] DNS configurés (yojob.fr, www, etude)
- [ ] Repos clonés (landing-page + survey-form)
- [ ] .env configuré (email SSL + domaine)
- [ ] Réseau Docker créé (`docker network create yojob-network`)
- [ ] Build réussi (`docker-compose build`)
- [ ] Services démarrés (`docker-compose up -d`)
- [ ] HTTPS fonctionne sur les 2 domaines
- [ ] Dashboard Traefik accessible (si activé)
- [ ] Firewall configuré (ports 80, 443, 22)

---

## 📚 Ressources

- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Let's Encrypt Rate Limits](https://letsencrypt.org/docs/rate-limits/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)

---

## 🔗 Comparaison avec votre Stack n8n

| Aspect | Projet n8n | Projet YOJOB |
|--------|------------|--------------|
| **Reverse Proxy** | Traefik ✅ | Traefik ✅ |
| **SSL** | Let's Encrypt TLS Challenge | Let's Encrypt TLS Challenge |
| **Réseau** | n8n-network | yojob-network (séparé) |
| **Apps** | n8n + Puppeteer | Landing + Survey |
| **Dashboard** | traefik.uxomnia.cloud | traefik.yojob.fr |
| **Auto-update** | Non (semble absent) | Watchtower ✅ |

---

**🎉 Votre infrastructure YOJOB est prête !**

Visitez https://yojob.fr et https://etude.yojob.fr pour voir vos applications en ligne.
