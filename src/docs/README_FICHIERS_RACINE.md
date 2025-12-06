# ⚠️ FICHIERS RESTÉS À LA RACINE

**Date:** 6 décembre 2025

---

## 📋 LISTE DES FICHIERS .md RESTÉS À LA RACINE

Certains fichiers `.md` sont restés à la racine du projet car **Figma Make ne permet pas de les supprimer** (fichiers protégés).

### Fichiers à déplacer manuellement (sur VPS)

| Fichier | Équivalent dans /docs/ | Action |
|---------|------------------------|--------|
| `/CHECKLIST_VERIFICATION.md` | ❌ Pas de copie | À déplacer |
| `/DEPLOYMENT_INSTRUCTIONS.md` | ❌ Pas de copie | À déplacer |
| `/README_SUPABASE_CONFIG.md` | ❌ Pas de copie | À déplacer |
| `/SECURITY_UPDATE.md` | ❌ Pas de copie | À déplacer |
| `/SUPABASE_SETUP_COMPLETE.md` | ❌ Pas de copie | À déplacer |
| `/SYNC_GITHUB_COMPLETE.md` | ❌ Pas de copie | À déplacer |

### Fichiers en double (racine + /docs/)

Ces fichiers existent à la fois à la racine ET dans `/docs/` :

| Fichier | Version à utiliser | Action sur racine |
|---------|-------------------|-------------------|
| `/Attributions.md` | ✅ `/docs/Attributions.md` | Supprimer sur VPS |
| `/DEPLOY_VPS_GUIDE.md` | ✅ `/docs/DEPLOY_VPS_GUIDE.md` | Supprimer sur VPS |
| `/QUICK_START_VPS.md` | ✅ `/docs/QUICK_START_VPS.md` | Supprimer sur VPS |

---

## 🎯 COMMANDES POUR NETTOYER LA RACINE (sur VPS)

### Étape 1 : Déplacer les fichiers uniques

```bash
# Connexion SSH
ssh root@72.65.161.3

# Aller dans le projet
cd /root/Formulairelandingpageyojob

# Déplacer les fichiers vers /docs/
mv CHECKLIST_VERIFICATION.md docs/
mv DEPLOYMENT_INSTRUCTIONS.md docs/
mv README_SUPABASE_CONFIG.md docs/
mv SECURITY_UPDATE.md docs/
mv SUPABASE_SETUP_COMPLETE.md docs/
mv SYNC_GITHUB_COMPLETE.md docs/
```

---

### Étape 2 : Supprimer les doublons

```bash
# Supprimer les fichiers qui existent déjà dans /docs/
rm -f Attributions.md
rm -f DEPLOY_VPS_GUIDE.md
rm -f QUICK_START_VPS.md
```

---

### Étape 3 : Vérifier

```bash
# Lister les fichiers .md restants à la racine
ls -la *.md

# Résultat attendu : uniquement README.md et MOVED_FILES_SUMMARY.md
```

---

### Étape 4 : Commit

```bash
git add .
git commit -m "docs: move all .md files to /docs/ and clean root directory"
git push origin main
```

---

## ✅ RÉSULTAT FINAL ATTENDU

Après nettoyage, la racine devrait contenir uniquement :

```
/
├── README.md                     # ✅ Fichier principal (convention)
├── MOVED_FILES_SUMMARY.md        # ✅ Récapitulatif déplacement (optionnel)
├── docker-compose.yml
├── package.json
├── .env.example
├── .npmrc
├── Dockerfile.txt
│
└── /docs/                        # 📚 TOUTE LA DOCUMENTATION
    ├── INDEX_DOCUMENTATION.md    # 🔍 START HERE
    ├── README_FICHIERS_RACINE.md # 📋 Ce fichier
    ├── Attributions.md
    ├── CHECKLIST_VERIFICATION.md
    ├── DEPLOY_VPS_GUIDE.md
    ├── DEPLOYMENT_INSTRUCTIONS.md
    ├── QUICK_START_VPS.md
    ├── README_SUPABASE_CONFIG.md
    ├── SECURITY_UPDATE.md
    ├── SUPABASE_SETUP_COMPLETE.md
    ├── SYNC_GITHUB_COMPLETE.md
    └── ... (23 autres fichiers)
```

---

## 📚 FICHIERS IMPORTANTS DANS /docs/

### 🔍 Point d'entrée principal
- **`INDEX_DOCUMENTATION.md`** - Table des matières complète

### 🚀 Guides de déploiement
- **`QUICK_START_VPS.md`** - Déploiement rapide (3 commandes)
- **`DEPLOY_VPS_GUIDE.md`** - Guide complet avec troubleshooting
- **`DEPLOYMENT_INSTRUCTIONS.md`** - Instructions détaillées

### 🔐 Sécurité
- **`SECURITY_UPDATE.md`** - Mise à jour critique SERVICE_ROLE_KEY
- **`SYNC_GITHUB_COMPLETE.md`** - Synchronisation GitHub

### 🗄️ Supabase
- **`SUPABASE_SETUP_COMPLETE.md`** - Configuration complète
- **`README_SUPABASE_CONFIG.md`** - Récapitulatif Supabase

### ✅ Vérification
- **`CHECKLIST_VERIFICATION.md`** - Checklist avant déploiement

---

## 💡 POURQUOI CES FICHIERS SONT RESTÉS À LA RACINE ?

**Raison technique :** Figma Make protège certains fichiers existants et ne permet pas de les supprimer via l'API.

**Solution :** Déplacement manuel sur le VPS après `git pull`

---

## 📞 BESOIN D'AIDE ?

Si tu rencontres des problèmes lors du déplacement :

1. Vérifie que tu es bien dans le bon dossier : `pwd`
2. Liste les fichiers : `ls -la *.md`
3. Vérifie que `/docs/` existe : `ls -la docs/`
4. Consulte `/docs/INDEX_DOCUMENTATION.md` pour trouver le bon fichier

---

**✅ Une fois le nettoyage terminé, utilise uniquement les fichiers dans `/docs/` !**
