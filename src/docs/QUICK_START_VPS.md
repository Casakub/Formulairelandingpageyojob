# ⚡ QUICK START - Déploiement VPS en 3 minutes

**Pour déployer sur ton VPS : 72.65.161.3**

---

## 📋 3 COMMANDES SEULEMENT

```bash
# 1. Connexion SSH
ssh root@72.65.161.3

# 2. Aller dans le projet et pull
cd /root/Formulairelandingpageyojob
git pull origin main

# 3. Rebuild et déployer
docker-compose down && docker-compose build --no-cache && docker-compose up -d
```

**C'est tout ! ✅**

---

## 🌐 URLs de test

**Landing Page :**  
http://72.65.161.3:3000/

**Formulaire Survey :**  
http://72.65.161.3:3000/survey

**Dashboard Admin :**  
http://72.65.161.3:3000/admin

---

## 📝 Configuration .env (si besoin)

Si le fichier `.env` n'existe pas sur ton VPS :

```bash
nano .env
```

Copier-coller :

```env
VITE_SUPABASE_URL=https://vhpbmckgxtdyxdwhmdxy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZocGJtY2tneHRkeXhkd2htZHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMzk0MTUsImV4cCI6MjA0ODcxNTQxNX0.cQCCYkR4jhf3j9qmXZGGH_hQwNAXWLhqAGFWBRIk74I
VITE_APP_ENV=production
```

**⚠️ NE PAS AJOUTER de ligne `VITE_SUPABASE_SERVICE_ROLE_KEY` (risque de sécurité)**

Sauvegarder : `Ctrl+X` → `Y` → `Entrée`

---

## 🔍 Vérifier que ça marche

```bash
# Voir les logs
docker logs -f yojob-landing-page

# Tester l'URL
curl http://localhost:3000/
```

---

## 📚 Guides détaillés

Si tu veux plus de détails :

- **Guide complet :** `DEPLOY_VPS_GUIDE.md`
- **Synchronisation GitHub :** `SYNC_GITHUB_COMPLETE.md`
- **Sécurité :** `SECURITY_UPDATE.md`

---

**C'est tout ! 🚀**
