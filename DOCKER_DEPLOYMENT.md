# 🐳 Guide de Déploiement Docker - YOJOB

Guide complet pour déployer les applications YOJOB (site principal + formulaire d'étude) avec Docker.

## 📋 Prérequis

- ✅ Serveur VPS avec Docker et Docker Compose installés
- ✅ Domaines configurés dans le DNS :
  - `yojob.fr` et `www.yojob.fr` → IP du VPS
  - `etude.yojob.fr` → IP du VPS
- ✅ Port 80 et 443 ouverts sur le firewall
- ✅ Git installé sur le serveur

---

## 📁 Structure du Projet

```
yojob-project/
├── docker-compose.yml          # Configuration des conteneurs
├── .env                        # Variables d'environnement (credentials)
├── .dockerignore               # Fichiers exclus du build
│
├── landing-page/               # Site principal (à créer/copier)
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/...
│
├── survey-form/                # Formulaire (répertoire actuel)
│   ├── Dockerfile              ✅ Créé
│   ├── nginx.conf              ✅ Créé
│   ├── .dockerignore           ✅ Créé
│   └── src/...
│
├── nginx/                      # Configuration Nginx principale
│   ├── nginx.conf              ✅ Créé
│   ├── sites-enabled/
│   │   ├── yojob.fr.conf       ✅ Créé
│   │   └── etude.yojob.fr.conf ✅ Créé
│   └── logs/                   (créé automatiquement)
│
├── certbot/                    (créé automatiquement)
│   ├── conf/                   # Certificats SSL
│   └── www/                    # Challenge ACME
│
└── scripts/
    └── init-letsencrypt.sh     ✅ Créé
```

---

## 🚀 Installation et Premier Déploiement

### **1. Préparation du Serveur**

```bash
# Connexion SSH au VPS
ssh user@votre-vps.com

# Créer le dossier du projet
mkdir -p /opt/yojob
cd /opt/yojob
```

### **2. Organisation des Dossiers**

**Option A : Renommer le projet actuel**

```bash
# Si vous êtes dans Formulairelandingpageyojob
cd ..
mv Formulairelandingpageyojob survey-form
cd survey-form
```

**Option B : Créer une nouvelle structure**

```bash
# Copier le contenu du projet actuel dans survey-form/
mkdir -p /opt/yojob/survey-form
cp -r /chemin/vers/Formulairelandingpageyojob/* /opt/yojob/survey-form/

# Copier les fichiers Docker à la racine
cd /opt/yojob
cp survey-form/docker-compose.yml .
cp survey-form/.env .
cp -r survey-form/nginx .
cp -r survey-form/scripts .
```

### **3. Configuration de la Landing Page**

Vous devez créer ou copier votre landing page dans `landing-page/`.

**Si vous n'avez pas encore de landing page** :

```bash
# Créer un Dockerfile minimal pour tester
mkdir -p landing-page
cat > landing-page/Dockerfile << 'EOF'
FROM nginx:alpine
RUN echo "<h1>YOJOB - Coming Soon</h1>" > /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
```

**Si vous avez déjà une landing page React** :

```bash
# Copier votre projet landing page
cp -r /chemin/vers/landing-page ./landing-page/

# Créer le Dockerfile (similaire au formulaire)
cp survey-form/Dockerfile landing-page/Dockerfile
cp survey-form/nginx.conf landing-page/nginx.conf
```

### **4. Configuration de l'Environnement**

Modifier le fichier `.env` :

```bash
nano .env
```

**Remplacer ces valeurs** :

```env
# Email pour les certificats SSL
CERTBOT_EMAIL=votre-email@yojob.fr  # ⚠️ MODIFIER ICI

# Vérifier que les domaines sont corrects
DOMAIN_LANDING=yojob.fr
DOMAIN_SURVEY=etude.yojob.fr

# Les credentials Supabase sont déjà renseignés
```

### **5. Vérifier la Configuration DNS**

```bash
# Vérifier que les domaines pointent vers votre VPS
nslookup yojob.fr
nslookup etude.yojob.fr

# Les deux doivent afficher l'IP de votre VPS
```

### **6. Build des Images Docker**

```bash
# Build sans démarrer les conteneurs
docker-compose build

# Vérifier que les images sont créées
docker images | grep yojob
```

### **7. Initialisation SSL avec Let's Encrypt**

```bash
# Rendre le script exécutable (si ce n'est pas déjà fait)
chmod +x scripts/init-letsencrypt.sh

# Lancer l'initialisation SSL
./scripts/init-letsencrypt.sh
```

**⚠️ Note** : Le script va :
1. Créer des certificats temporaires
2. Démarrer Nginx
3. Obtenir les vrais certificats Let's Encrypt
4. Recharger Nginx avec les certificats valides

**Si vous voulez tester d'abord en staging** (éviter les limites de Let's Encrypt) :

```bash
# Modifier la variable staging dans le script
nano scripts/init-letsencrypt.sh
# Changer : staging=0 → staging=1
```

### **8. Démarrer Tous les Services**

```bash
# Démarrer en mode détaché
docker-compose up -d

# Vérifier que tous les conteneurs fonctionnent
docker-compose ps
```

Résultat attendu :

```
NAME                STATUS              PORTS
yojob-landing       Up 30 seconds       80/tcp
yojob-survey        Up 30 seconds       80/tcp
yojob-nginx         Up 30 seconds       0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
yojob-certbot       Up 30 seconds
yojob-watchtower    Up 30 seconds
```

### **9. Vérifier les Logs**

```bash
# Logs en temps réel de tous les services
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f survey
docker-compose logs -f landing
docker-compose logs -f nginx

# Vérifier les logs Nginx
tail -f nginx/logs/yojob.fr.access.log
tail -f nginx/logs/etude.yojob.fr.access.log
```

### **10. Tester l'Accès**

```bash
# Tester HTTP (doit rediriger vers HTTPS)
curl -I http://yojob.fr
curl -I http://etude.yojob.fr

# Tester HTTPS
curl -I https://yojob.fr
curl -I https://etude.yojob.fr
```

Ouvrez dans votre navigateur :
- 🌐 https://yojob.fr
- 🌐 https://etude.yojob.fr

---

## 🔄 Mise à Jour Après Modification

### **Mise à Jour du Formulaire (Figma Make ou Claude Code)**

```bash
cd /opt/yojob/survey-form

# 1. Récupérer les modifications
git pull origin main

# 2. Rebuild UNIQUEMENT le conteneur survey
cd ..
docker-compose build survey

# 3. Redémarrer UNIQUEMENT le conteneur survey
docker-compose up -d survey

# ⏱️ Downtime : ~2-3 secondes pour etude.yojob.fr
# ✅ yojob.fr reste en ligne pendant ce temps
```

### **Mise à Jour de la Landing Page**

```bash
cd /opt/yojob/landing-page

# 1. Récupérer les modifications
git pull origin main

# 2. Rebuild UNIQUEMENT le conteneur landing
cd ..
docker-compose build landing

# 3. Redémarrer UNIQUEMENT le conteneur landing
docker-compose up -d landing

# ⏱️ Downtime : ~2-3 secondes pour yojob.fr
# ✅ etude.yojob.fr reste en ligne pendant ce temps
```

### **Rebuild Complet (si nécessaire)**

```bash
cd /opt/yojob

# Arrêter tous les conteneurs
docker-compose down

# Rebuild sans cache
docker-compose build --no-cache

# Redémarrer
docker-compose up -d
```

---

## 🛠️ Commandes Utiles

### **Gestion des Conteneurs**

```bash
# Voir l'état des conteneurs
docker-compose ps

# Démarrer tous les services
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Redémarrer un service spécifique
docker-compose restart survey

# Voir les logs en temps réel
docker-compose logs -f

# Voir les logs d'un service
docker-compose logs -f survey
```

### **Gestion des Images**

```bash
# Lister les images
docker images

# Supprimer les images inutilisées
docker image prune -a

# Rebuild une image spécifique
docker-compose build --no-cache survey
```

### **SSL / Certificats**

```bash
# Vérifier les certificats installés
docker-compose exec certbot certbot certificates

# Renouveler manuellement les certificats
docker-compose run --rm certbot certbot renew

# Recharger la config Nginx
docker-compose exec nginx nginx -s reload

# Tester la config Nginx
docker-compose exec nginx nginx -t
```

### **Debugging**

```bash
# Accéder au shell d'un conteneur
docker-compose exec survey sh
docker-compose exec nginx sh

# Voir les processus dans un conteneur
docker-compose top survey

# Voir l'utilisation des ressources
docker stats

# Inspecter la configuration d'un conteneur
docker inspect yojob-survey
```

---

## 🔒 Sécurité

### **Protéger le fichier .env**

```bash
# Le .env contient des secrets sensibles
chmod 600 .env

# Ne jamais commiter le .env dans Git
echo ".env" >> .gitignore
```

### **Firewall (UFW)**

```bash
# Autoriser uniquement HTTP, HTTPS et SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### **Monitoring des Certificats**

Les certificats Let's Encrypt expirent tous les 90 jours. Le conteneur `certbot` les renouvelle automatiquement.

**Vérifier la date d'expiration** :

```bash
docker-compose exec certbot certbot certificates
```

---

## 🆘 Dépannage

### **Problème : Les certificats SSL ne se créent pas**

**Solution** :

```bash
# Vérifier que les domaines pointent vers le VPS
nslookup yojob.fr

# Vérifier que le port 80 est accessible
curl -I http://yojob.fr/.well-known/acme-challenge/test

# Relancer l'initialisation SSL
./scripts/init-letsencrypt.sh
```

### **Problème : "Build folder not found"**

**Cause** : Le build Vite échoue.

**Solution** :

```bash
# Tester le build localement
cd survey-form
npm install
npm run build

# Si ça fonctionne, rebuilder l'image
cd ..
docker-compose build --no-cache survey
```

### **Problème : Nginx ne démarre pas**

**Solution** :

```bash
# Tester la configuration Nginx
docker-compose exec nginx nginx -t

# Voir les logs d'erreur
docker-compose logs nginx

# Vérifier les permissions
ls -la nginx/sites-enabled/
```

### **Problème : Les variables d'environnement ne sont pas prises en compte**

**Solution** :

```bash
# Vérifier que les variables sont dans .env
cat .env

# Rebuilder avec les arguments
docker-compose build --no-cache \
  --build-arg VITE_SUPABASE_PROJECT_ID=$SUPABASE_PROJECT_ID \
  --build-arg VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY \
  survey

# Redémarrer
docker-compose up -d survey
```

### **Problème : Watchtower ne met pas à jour automatiquement**

**Solution** :

```bash
# Vérifier que les labels sont présents
docker inspect yojob-survey | grep watchtower

# Forcer une mise à jour
docker-compose restart watchtower
```

---

## 📊 Monitoring

### **Voir les Ressources Utilisées**

```bash
# En temps réel
docker stats

# Espace disque utilisé par Docker
docker system df
```

### **Logs Nginx**

```bash
# Access logs
tail -f nginx/logs/yojob.fr.access.log
tail -f nginx/logs/etude.yojob.fr.access.log

# Error logs
tail -f nginx/logs/yojob.fr.error.log
tail -f nginx/logs/etude.yojob.fr.error.log
```

---

## 🔄 Workflow de Développement

### **Développement Local (sans Docker)**

```bash
cd survey-form
npm install
npm run dev

# L'application utilise automatiquement le fichier Figma Make
# (src/utils/supabase/info.tsx)
```

### **Test Local avec Docker**

```bash
# Build de l'image
docker build -t yojob-survey-test \
  --build-arg VITE_SUPABASE_PROJECT_ID=vhpbmckgxtdyxdwhmdxy \
  --build-arg VITE_SUPABASE_ANON_KEY=eyJh... \
  .

# Lancer localement
docker run -p 8080:80 yojob-survey-test

# Tester sur http://localhost:8080
```

### **Déploiement sur VPS**

```bash
# 1. Commit et push
git add .
git commit -m "Modifications du formulaire"
git push origin main

# 2. Sur le VPS
ssh user@vps.com
cd /opt/yojob/survey-form
git pull
cd ..
docker-compose build survey
docker-compose up -d survey
```

---

## ✅ Checklist de Déploiement

- [ ] DNS configurés (yojob.fr, etude.yojob.fr)
- [ ] Fichier .env configuré avec le bon email
- [ ] Landing page créée/copiée dans `landing-page/`
- [ ] Formulaire dans `survey-form/`
- [ ] Docker et Docker Compose installés
- [ ] Ports 80 et 443 ouverts
- [ ] Build des images réussi (`docker-compose build`)
- [ ] SSL initialisé (`./scripts/init-letsencrypt.sh`)
- [ ] Services démarrés (`docker-compose up -d`)
- [ ] HTTPS fonctionne sur les 2 domaines
- [ ] Watchtower actif pour les mises à jour automatiques

---

## 📚 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Documentation Docker Compose](https://docs.docker.com/compose/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Nginx](https://nginx.org/en/docs/)

---

## 🎯 Support

En cas de problème :

1. **Vérifier les logs** : `docker-compose logs -f`
2. **Tester la config Nginx** : `docker-compose exec nginx nginx -t`
3. **Vérifier les certificats** : `docker-compose exec certbot certbot certificates`
4. **Consulter ce guide** : section Dépannage

---

**🚀 Bon déploiement !**
