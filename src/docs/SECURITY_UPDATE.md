# 🔐 MISE À JOUR DE SÉCURITÉ - Retrait de SERVICE_ROLE_KEY

**Date:** 6 décembre 2025  
**Commit GitHub:** `7dd5b45245c61481d5f8180a4b6ea2cc0b08fb15`  
**Auteur:** Claude Code  
**Sévérité:** 🚨 CRITIQUE

---

## ⚠️ PROBLÈME DE SÉCURITÉ DÉTECTÉ

### Description du problème

La clé `VITE_SUPABASE_SERVICE_ROLE_KEY` était passée au build Docker via les arguments de construction (`args`), ce qui avait pour effet de l'exposer **publiquement** dans le bundle JavaScript généré par Vite.

**Impact :**
- 🔓 N'importe qui pouvant accéder à l'application web pouvait extraire la `SERVICE_ROLE_KEY` depuis les fichiers JavaScript
- 🔓 Cette clé donne un **accès administrateur complet** à la base de données Supabase
- 🔓 Possibilité de lecture/modification/suppression de **toutes** les données sans restriction RLS

---

## 🔍 DÉTAILS TECHNIQUES

### Comment Vite expose les variables d'environnement

Vite (le bundler utilisé) fonctionne ainsi :

1. **Au moment du build**, Vite lit toutes les variables d'environnement préfixées `VITE_*`
2. Il **remplace** toutes les occurrences de `import.meta.env.VITE_*` par la **valeur réelle** de la variable
3. Le résultat est **inclus dans le bundle JavaScript final** (fichier `.js` envoyé au navigateur)

**Exemple concret :**

**Code source TypeScript :**
```typescript
const apiKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
```

**Bundle JavaScript généré (visible par tous) :**
```javascript
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...";
```

→ La clé secrète est **en clair** dans le fichier JavaScript !

---

## 🛡️ SOLUTION MISE EN PLACE

### Changements effectués

#### 1. `docker-compose.yml` - Retrait de la clé sensible

**AVANT (DANGEREUX) :**
```yaml
args:
  - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
  - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
  - VITE_SUPABASE_SERVICE_ROLE_KEY=${VITE_SUPABASE_SERVICE_ROLE_KEY}  # ⚠️ EXPOSÉ !
  - VITE_APP_ENV=${VITE_APP_ENV:-production}
```

**APRÈS (SÉCURISÉ) :**
```yaml
# IMPORTANT: Ne JAMAIS passer SERVICE_ROLE_KEY ici !
# Les args de build sont exposés publiquement dans le bundle client.
args:
  - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
  - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
  - VITE_APP_ENV=${VITE_APP_ENV:-production}
```

---

#### 2. `Dockerfile` - Retrait de la clé sensible

**AVANT (DANGEREUX) :**
```dockerfile
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_SUPABASE_SERVICE_ROLE_KEY  # ⚠️ EXPOSÉ !
ARG VITE_APP_ENV=production

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_SERVICE_ROLE_KEY=$VITE_SUPABASE_SERVICE_ROLE_KEY  # ⚠️ EXPOSÉ !
ENV VITE_APP_ENV=$VITE_APP_ENV
```

**APRÈS (SÉCURISÉ) :**
```dockerfile
# IMPORTANT: Ne JAMAIS passer de clés sensibles (SERVICE_ROLE_KEY) ici !
# Les variables VITE_* sont exposées publiquement dans le bundle client.
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_APP_ENV=production

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_APP_ENV=$VITE_APP_ENV
```

---

## 📋 ARCHITECTURE DE SÉCURITÉ CORRECTE

### Clés côté client (Frontend) - ✅ AUTORISÉES

**Variables préfixées `VITE_*` (exposées publiquement) :**

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Pourquoi c'est sécurisé :**
- La clé `ANON_KEY` est **publique par design**
- Elle a des **permissions limitées** définies par Row Level Security (RLS)
- Elle ne peut **jamais** bypasser les politiques RLS

---

### Clés côté serveur (Backend) - ✅ AUTORISÉES

**Variables SANS préfixe `VITE_` (privées, côté serveur uniquement) :**

```env
# Fichier .env (NE PAS committer sur GitHub)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Où utiliser ces clés :**
- ✅ Supabase Edge Functions (backend)
- ✅ Scripts serveur Node.js (backend)
- ✅ API Routes Next.js (backend)
- ❌ **JAMAIS dans le code frontend** (React components, etc.)

---

## 🎯 BONNES PRATIQUES

### ✅ DO (À FAIRE)

1. **Utiliser ANON_KEY côté client** avec RLS strict
2. **Utiliser SERVICE_ROLE_KEY uniquement côté serveur**
3. **Configurer des politiques RLS strictes** sur toutes les tables
4. **Ne JAMAIS committer les fichiers `.env`** avec des vraies clés
5. **Utiliser des variables non-préfixées** pour les clés sensibles serveur

---

### ❌ DON'T (À ÉVITER)

1. ❌ **NE JAMAIS** préfixer une clé sensible avec `VITE_`
2. ❌ **NE JAMAIS** passer la `SERVICE_ROLE_KEY` au build Docker/Vite
3. ❌ **NE JAMAIS** utiliser la `SERVICE_ROLE_KEY` dans le code frontend
4. ❌ **NE JAMAIS** committer des clés réelles dans Git
5. ❌ **NE JAMAIS** désactiver RLS en production

---

## 🔍 COMMENT VÉRIFIER QUE VOS CLÉS SONT SÉCURISÉES

### Test 1 : Inspecter le bundle JavaScript

```bash
# 1. Builder l'application
npm run build

# 2. Chercher la SERVICE_ROLE_KEY dans les fichiers buildés
grep -r "SERVICE_ROLE_KEY" build/

# Résultat attendu: AUCUNE OCCURRENCE
```

---

### Test 2 : Inspecter les sources dans le navigateur

1. Ouvrir l'application dans le navigateur
2. Ouvrir DevTools (F12)
3. Aller dans l'onglet **Sources**
4. Chercher (`Ctrl+Shift+F`) : `SERVICE_ROLE_KEY`

**Résultat attendu :** Aucune occurrence trouvée

---

## 🚨 ACTIONS URGENTES SI VOUS AVEZ DÉPLOYÉ AVEC SERVICE_ROLE_KEY EXPOSÉE

### 1. Régénérer immédiatement la clé Supabase

1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet
3. Aller dans **Settings** → **API**
4. Cliquer sur **Reset** à côté de `service_role key`
5. Copier la nouvelle clé
6. Mettre à jour votre fichier `.env` (côté serveur uniquement)

---

### 2. Redéployer immédiatement

```bash
# 1. Pull la version sécurisée depuis GitHub
git pull origin main

# 2. Vérifier que le docker-compose.yml n'a PAS de SERVICE_ROLE_KEY
cat docker-compose.yml | grep SERVICE_ROLE_KEY

# Résultat attendu: AUCUNE LIGNE (ou uniquement des commentaires)

# 3. Rebuild et redéployer
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## ✅ CHECKLIST DE SÉCURITÉ

Avant de déployer en production :

- [ ] Le fichier `docker-compose.yml` n'a PAS de `VITE_SUPABASE_SERVICE_ROLE_KEY`
- [ ] Le fichier `Dockerfile` n'a PAS de `VITE_SUPABASE_SERVICE_ROLE_KEY`
- [ ] Le fichier `.env` n'a PAS de `VITE_SUPABASE_SERVICE_ROLE_KEY`
- [ ] Le fichier `.env.example` contient des warnings de sécurité
- [ ] Les politiques RLS sont activées sur toutes les tables
- [ ] Les politiques RLS ont été testées avec le rôle `anon`
- [ ] Le bundle JavaScript ne contient pas de clés sensibles
- [ ] La clé `SERVICE_ROLE_KEY` est uniquement côté serveur (si nécessaire)
- [ ] Le fichier `.env` est dans `.gitignore`
- [ ] Aucun fichier `.env` n'a été commité dans Git

---

**🔐 SÉCURITÉ RENFORCÉE - DÉPLOIEMENT AUTORISÉ**

Cette mise à jour corrige une faille de sécurité critique. Tous les déploiements futurs doivent utiliser cette version.
