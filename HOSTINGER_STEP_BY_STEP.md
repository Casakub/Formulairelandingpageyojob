# 🚀 Guide Étape par Étape - Déploiement Hostinger

Guide pas-à-pas pour préparer et déployer YOJOB sur Hostinger.

---

## ⚠️ Important : Préparation Locale Requise

Hostinger a besoin que les dossiers `landing-page/` et `survey-form/` **existent dans votre repository** avec leurs Dockerfiles.

---

## 📝 Étapes à Suivre

### **Étape 1 : Préparer Localement** (sur votre machine)

```bash
cd /chemin/vers/Formulairelandingpageyojob

# 1. Cloner la landing page localement
# (Vous devez le faire manuellement car le repo est privé)
git clone https://github.com/Casakub/Newlandingpageyojob.git landing-page

# 2. Copier les Dockerfiles vers landing-page
cp Dockerfile landing-page/
cp nginx.conf landing-page/

# 3. Créer le dossier survey-form
mkdir survey-form

# 4. Déplacer les fichiers du formulaire
mv src survey-form/
mv package.json survey-form/
mv vite.config.ts survey-form/
mv index.html survey-form/

# 5. Copier les Dockerfiles vers survey-form
cp Dockerfile survey-form/
cp nginx.conf survey-form/

# 6. Vérifier la structure
ls -la
# Vous devez voir :
# - landing-page/
# - survey-form/
# - docker-compose.hostinger.yml
# - .env.hostinger
```

### **Étape 2 : Commit et Push**

```bash
# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Prepare for Hostinger: Add landing-page and survey-form directories"

# Push
git push origin claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ
```

### **Étape 3 : Configurer DNS**

**Avant de déployer**, configurez votre DNS chez votre registrar :

```
Type A :
  yojob.fr        → IP_HOSTINGER
  www.yojob.fr    → IP_HOSTINGER
  etude.yojob.fr  → IP_HOSTINGER
```

**Trouver l'IP Hostinger** :
- Panel Hostinger → VPS → IP Address

**Vérifier** :
```bash
nslookup yojob.fr
# Doit retourner l'IP de votre VPS Hostinger
```

---

## 🌐 Déploiement sur Hostinger

### **Option A : Via GitHub Repository** (Recommandée)

1. **Panel Hostinger** → **Docker** → **Create New Project**

2. **Choisir** "Deploy from GitHub Repository"

3. **Configuration** :
   - **Repository URL** : `https://github.com/Casakub/Formulairelandingpageyojob`
   - **Branch** : `claude/form-website-integration-01TWk7DpCUHeuhHuv1tpg7VJ`
   - **Docker Compose File** : `docker-compose.hostinger.yml`

4. **Autoriser l'accès** :
   - Si le repo est privé, autoriser Hostinger à y accéder
   - Ou rendre le repo public temporairement

5. **Variables d'Environnement** :

   Copier ces variables dans l'interface Hostinger :
   ```env
   DOMAIN_NAME=yojob.fr
   SSL_EMAIL=votre-email@yojob.fr
   SUPABASE_PROJECT_ID=vhpbmckgxtdyxdwhmdxy
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjE5ODUsImV4cCI6MjA3OTgzNzk4NX0.Vv0nIgRa91pi-trbK9drGTF6uoeCvvm4L2HEJ4UlyBo
   NODE_ENV=production
   TZ=Europe/Paris
   ```

6. **Cliquer sur "Deploy"**

7. **Attendre** ~10-15 minutes pour le build initial

---

### **Option B : Copier-Coller** (Plus rapide mais updates manuelles)

1. **Panel Hostinger** → **Docker** → **Create New Project**

2. **Choisir** "Paste docker-compose.yml"

3. **Copier-coller** le contenu de `docker-compose.hostinger.yml`

4. **Variables d'Environnement** (même que Option A)

5. **Cliquer sur "Create"**

---

## ✅ Vérification

### **1. Vérifier les Conteneurs**

Dans l'interface Hostinger, vous devez voir :
- ✅ `traefik` → Running (vert)
- ✅ `yojob-landing` → Running (vert)
- ✅ `yojob-survey` → Running (vert)

### **2. Vérifier les Logs**

Si un conteneur est en erreur :
1. Cliquer sur le conteneur
2. Onglet **"Logs"**
3. Voir les erreurs

**Erreurs courantes** :
- `npm install failed` → Problème de dépendances
- `Cannot find module` → Fichier manquant
- `ENOENT: no such file` → Mauvaise structure de dossiers

### **3. Tester les URLs**

Ouvrir dans le navigateur :
- 🌐 https://yojob.fr (doit charger la landing page)
- 🌐 https://etude.yojob.fr (doit charger le formulaire)

**Si SSL non généré** : Attendre 5-10 minutes après le premier déploiement.

---

## 🔄 Mettre à Jour l'Application

### **Si déployé via GitHub** :

1. **Faire vos modifications localement**
2. **Commit et push** :
   ```bash
   git add .
   git commit -m "Update application"
   git push
   ```
3. **Sur Hostinger** → Cliquer sur **"Redeploy"** ou **"Rebuild"**
4. Attendre ~5 minutes

### **Si déployé via Copier-Coller** :

1. **Modifier le docker-compose** si nécessaire
2. **Sauvegarder** dans l'interface Hostinger
3. **Rebuild** automatique

---

## 🆘 Dépannage

### **Erreur : "No such file or directory"**

**Cause** : Les dossiers `landing-page/` ou `survey-form/` n'existent pas dans le repo.

**Solution** :
- Vérifier l'Étape 1 (préparation locale)
- Push les dossiers sur GitHub
- Rebuild sur Hostinger

### **Erreur : "npm install failed"**

**Cause** : Problème avec `package.json` ou `.npmrc`.

**Solution** :
- Vérifier que `package.json` existe dans chaque dossier
- Vérifier que `.npmrc` est présent si nécessaire
- Voir les logs pour plus de détails

### **Erreur : "Build failed"**

**Vérifier** :
- Les Dockerfiles existent dans `landing-page/` et `survey-form/`
- Les chemins dans les Dockerfiles sont corrects
- Voir les logs de build dans Hostinger

### **Certificat SSL non généré**

**Vérifier** :
- DNS pointe bien vers l'IP Hostinger (vérifier avec `nslookup`)
- Attendre 10 minutes après le premier déploiement
- Vérifier les logs Traefik

**Forcer le renouvellement** :
- Restart du conteneur Traefik dans Hostinger

---

## 📋 Checklist Complète

- [ ] **Local** : Landing page clonée dans `landing-page/`
- [ ] **Local** : Dockerfiles copiés dans `landing-page/`
- [ ] **Local** : Dossier `survey-form/` créé
- [ ] **Local** : Fichiers formulaire déplacés dans `survey-form/`
- [ ] **Local** : Dockerfiles copiés dans `survey-form/`
- [ ] **Git** : Commit et push sur GitHub
- [ ] **DNS** : yojob.fr → IP Hostinger
- [ ] **DNS** : etude.yojob.fr → IP Hostinger
- [ ] **Hostinger** : Projet créé
- [ ] **Hostinger** : Repository ou docker-compose configuré
- [ ] **Hostinger** : Variables d'environnement ajoutées
- [ ] **Hostinger** : Deploy lancé
- [ ] **Test** : https://yojob.fr accessible
- [ ] **Test** : https://etude.yojob.fr accessible
- [ ] **SSL** : Certificats générés (cadenas vert)

---

## 🎯 Structure Finale

```
Formulairelandingpageyojob/
├── docker-compose.hostinger.yml  ✅ Config Hostinger
├── .env.hostinger                ✅ Variables
│
├── landing-page/                 ✅ À créer localement
│   ├── Dockerfile                ✅ Copier depuis la racine
│   ├── nginx.conf                ✅ Copier depuis la racine
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── survey-form/                  ✅ À créer localement
    ├── Dockerfile                ✅ Copier depuis la racine
    ├── nginx.conf                ✅ Copier depuis la racine
    ├── src/
    ├── package.json
    └── vite.config.ts
```

---

## 💡 Conseils

1. **Testez localement d'abord** :
   ```bash
   # Tester le build
   cd landing-page
   npm install
   npm run build

   cd ../survey-form
   npm install
   npm run build
   ```

2. **Vérifiez les dossiers de build** :
   - Les deux apps doivent builder dans `build/` (pas `dist/`)
   - C'est configuré dans `vite.config.ts` : `outDir: 'build'`

3. **Suivez les logs Hostinger** en temps réel pendant le déploiement

---

**Bonne chance avec votre déploiement ! 🚀**
