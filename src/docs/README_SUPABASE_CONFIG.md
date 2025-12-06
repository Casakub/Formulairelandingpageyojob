# 🎯 Configuration Supabase - Récapitulatif

## 📁 Fichiers créés pour toi

| Fichier | Description |
|---------|-------------|
| `COPY_PASTE_THIS.txt` | **⭐ START ICI** - Copier-coller rapide pour Hostinger |
| `QUICK_START_HOSTINGER.md` | Guide express en 3 étapes (5 min) |
| `SUPABASE_SETUP_COMPLETE.md` | Guide détaillé complet avec troubleshooting |
| `DEPLOYMENT_INSTRUCTIONS.md` | Instructions de déploiement Docker |
| `HOSTINGER_ENV_EXAMPLE.txt` | Variables d'environnement formatées |
| `.env.production` | Fichier local avec tes clés (NE PAS COMMITER) |
| `.env.example` | Template sans clés (safe pour Git) |
| `.gitignore` | Protection contre commit accidentel |
| `Dockerfile` | ✅ Mis à jour avec SERVICE_ROLE_KEY |
| `docker-compose.yml` | ✅ Mis à jour avec SERVICE_ROLE_KEY |

---

## 🚀 Par où commencer ?

### Option 1 : Ultra-rapide (5 min)
1. Ouvre `COPY_PASTE_THIS.txt`
2. Suis les instructions étape par étape
3. C'est fini !

### Option 2 : Guide visuel (10 min)
1. Ouvre `QUICK_START_HOSTINGER.md`
2. Suis les 3 étapes avec captures d'écran mentales
3. Teste ton application

### Option 3 : Guide complet (20 min)
1. Ouvre `SUPABASE_SETUP_COMPLETE.md`
2. Comprends l'architecture complète
3. Configure avec toutes les bonnes pratiques

---

## ✅ Ce qui a été modifié dans ton projet

### 1. Dockerfile (créé)
```dockerfile
# Ajout de la variable SERVICE_ROLE_KEY
ARG VITE_SUPABASE_SERVICE_ROLE_KEY
ENV VITE_SUPABASE_SERVICE_ROLE_KEY=$VITE_SUPABASE_SERVICE_ROLE_KEY
```

### 2. docker-compose.yml (mis à jour)
```yaml
args:
  - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
  - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
  - VITE_SUPABASE_SERVICE_ROLE_KEY=${VITE_SUPABASE_SERVICE_ROLE_KEY}  # ← NOUVEAU
  - VITE_APP_ENV=${VITE_APP_ENV:-production}
```

### 3. Fichiers de configuration
- `.env.production` : Tes vraies clés Supabase (local + Hostinger)
- `.gitignore` : Empêche le commit des clés sensibles
- `.env.example` : Template pour documentation

---

## 🔑 Tes credentials Supabase

```
Project ID    : vhpbmckgxtdyxdwhmdxy
URL           : https://vhpbmckgxtdyxdwhmdxy.supabase.co
ANON_KEY      : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SERVICE_KEY   : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (voir .env.production)
```

---

## 📊 Architecture

```
┌────────────────────────┐
│   Hostinger VPS        │
│   72.65.161.3:3000     │
│                        │
│   Docker Container     │
│   ├─ Nginx (port 80)   │
│   └─ React App         │
│      ├─ Landing (/)    │
│      ├─ Survey (/survey)
│      └─ Admin (/admin) │
└──────────┬─────────────┘
           │
           │ HTTPS
           │
┌──────────▼─────────────┐
│   Supabase Cloud       │
│   vhpbmckgxtdyxdwhmdxy │
│                        │
│   ├─ PostgreSQL DB     │
│   ├─ Auth             │
│   └─ Edge Functions   │
└────────────────────────┘
```

---

## 🧪 Tests à effectuer

Après avoir suivi les instructions, teste dans cet ordre :

1. ✅ Landing page : http://72.65.161.3:3000
2. ✅ Formulaire survey : http://72.65.161.3:3000/survey
3. ✅ Soumission formulaire → Vérifier dans Supabase Table Editor
4. ✅ Login admin : http://72.65.161.3:3000/admin
5. ✅ Dashboard affiche les données
6. ✅ Export CSV fonctionne

---

## 🐛 Problèmes fréquents

| Symptôme | Cause | Solution |
|----------|-------|----------|
| "Failed to fetch" | URLs non autorisées | Ajouter IP dans Supabase Auth Config |
| "Invalid API key" | Clés mal copiées | Re-copier depuis COPY_PASTE_THIS.txt |
| "Table does not exist" | Migration non exécutée | Exécuter le SQL dans Supabase Dashboard |
| "Invalid credentials" | Compte admin inexistant | Créer user dans Auth → Users |
| Page blanche | Build échoué | Vérifier logs : `docker-compose logs -f` |

---

## 🔒 Sécurité

### ⚠️ NE JAMAIS commiter ces fichiers :
- `.env`
- `.env.production`
- `.env.local`

### ✅ Safe pour Git :
- `.env.example`
- `COPY_PASTE_THIS.txt` (pour documentation équipe)
- Tous les `.md`

### 🔐 Clés API
- `ANON_KEY` → Publique (frontend) ✅
- `SERVICE_ROLE_KEY` → Privée (backend seulement) ❌ NE JAMAIS EXPOSER

---

## 📞 Support

**Si tu as un problème :**

1. Vérifie les logs Docker : `docker-compose logs -f`
2. Vérifie la console navigateur (F12)
3. Consulte `SUPABASE_SETUP_COMPLETE.md` section "Dépannage"
4. Vérifie que les 3 actions Supabase Dashboard sont faites

**Compte admin :**
- Email : `a.auger@yojob.fr`
- Password : `Adeole@33700`

**IP temporaire VPS :**
- `http://72.65.161.3:3000`

---

## 🎯 Prochaines étapes

Une fois que tout fonctionne sur l'IP temporaire :

1. ⬜ Installer certificat SSL (Let's Encrypt)
2. ⬜ Configurer ton domaine (DNS)
3. ⬜ Ajouter le domaine dans Supabase Auth Config
4. ⬜ Passer en HTTPS obligatoire
5. ⬜ Configurer firewall VPS

---

**✅ Configuration terminée !**

Tu as maintenant tout ce qu'il faut pour connecter Supabase à ton VPS Hostinger.

Commence par `COPY_PASTE_THIS.txt` et suis les instructions 🚀
