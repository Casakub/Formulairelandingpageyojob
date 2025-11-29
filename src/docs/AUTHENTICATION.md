# 🔐 Système d'Authentification YOJOB

## Vue d'ensemble

Le système d'authentification YOJOB utilise **Supabase Auth** pour gérer de manière sécurisée l'accès au dashboard d'administration.

---

## 🎯 Fonctionnalités

### ✅ Implémentées

- **Authentification par email/mot de passe** avec Supabase Auth
- **Création de compte admin** (first-time setup)
- **Connexion sécurisée** avec tokens JWT
- **Déconnexion** avec invalidation de session
- **Vérification de session** automatique
- **Refresh tokens** pour prolonger les sessions
- **Changement de mot de passe** depuis le dashboard
- **Protection des routes** (dashboard réservé aux admins)
- **Migration automatique** depuis l'ancien système localStorage

---

## 🏗️ Architecture

### Backend (Supabase Edge Functions)

**Fichier** : `/supabase/functions/server/auth.tsx`

#### Routes disponibles

| Route | Méthode | Description | Auth requise |
|-------|---------|-------------|--------------|
| `/auth/signup` | POST | Créer un nouveau compte admin | Non |
| `/auth/login` | POST | Se connecter | Non |
| `/auth/logout` | POST | Se déconnecter | Oui |
| `/auth/session` | GET | Vérifier la session active | Oui |
| `/auth/refresh` | POST | Rafraîchir le token | Non |
| `/auth/change-password` | POST | Changer le mot de passe | Oui |
| `/auth/users` | GET | Lister tous les users | Oui |

### Frontend (React)

**Service** : `/services/authService.ts`

Fonctions exportées :
- `login(email, password)` - Connexion
- `signup(email, password, name)` - Création de compte
- `logout()` - Déconnexion
- `getStoredSession()` - Récupérer la session locale
- `getStoredUser()` - Récupérer l'utilisateur local
- `verifySession()` - Vérifier avec le serveur
- `refreshSession()` - Rafraîchir le token
- `changePassword(newPassword)` - Changer le mot de passe
- `isAuthenticated()` - Vérifier l'état d'auth
- `initAuth()` - Initialiser au démarrage

### Composants

1. **`<AdminLogin />`** - Page de connexion
2. **`<FirstTimeSetup />`** - Création du premier compte
3. **`<AdminSetupHelper />`** - Widget de setup rapide

---

## 🚀 Configuration Initiale

### Méthode 1 : Via l'interface (Recommandée)

1. **Aller sur votre app** : `https://your-app.com`

2. **Cliquer sur Dashboard** dans le header

3. **Page de connexion** apparaît avec lien "Première connexion ? Créer un compte →"

4. **Cliquer sur le lien** pour ouvrir le formulaire de création

5. **Remplir les champs** :
   - **Nom** : Admin YOJOB
   - **Email** : admin@yojob.com
   - **Mot de passe** : Adeole@33700
   - **Confirmation** : Adeole@33700

6. **Cliquer sur "Créer mon compte"**

7. **Succès !** Vous serez redirigé vers la page de connexion

8. **Se connecter** avec vos identifiants

### Méthode 2 : Via le Helper Component

Si vous avez accès au code :

```tsx
import { AdminSetupHelper } from './components/admin/AdminSetupHelper';

// Ajouter temporairement dans votre app
<AdminSetupHelper />
```

Le composant affiche un bouton "Créer le compte administrateur" qui crée automatiquement le compte avec les credentials configurés.

### Méthode 3 : Via la Console

1. Ouvrir la **console du navigateur** (F12)

2. Copier-coller ce code :

```javascript
async function createAdmin() {
  const response = await fetch(
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-10092a63/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ANON_KEY',
      },
      body: JSON.stringify({
        email: 'admin@yojob.com',
        password: 'Adeole@33700',
        name: 'Admin YOJOB',
      }),
    }
  );
  
  const data = await response.json();
  console.log(data);
}

createAdmin();
```

3. Remplacer `YOUR_PROJECT_ID` et `YOUR_ANON_KEY` par vos vraies valeurs

4. Appuyer sur **Entrée**

---

## 🔑 Identifiants par Défaut

**Email** : `admin@yojob.com`  
**Mot de passe** : `Adeole@33700`

⚠️ **Important** : Changez ce mot de passe après la première connexion !

---

## 🔄 Flux d'Authentification

### Connexion

```
1. Utilisateur saisit email + mot de passe
   ↓
2. Frontend appelle /auth/login
   ↓
3. Supabase Auth vérifie les credentials
   ↓
4. Backend retourne session + user
   ↓
5. Frontend stocke dans localStorage
   ↓
6. Redirection vers dashboard
```

### Vérification de Session

```
1. App.tsx charge
   ↓
2. initAuth() vérifie localStorage
   ↓
3. Si session existe → verifySession() avec API
   ↓
4. Si valide → setIsAuthenticated(true)
   ↓
5. Sinon → Afficher page de login
```

### Déconnexion

```
1. Utilisateur clique "Déconnexion"
   ↓
2. Frontend appelle /auth/logout
   ↓
3. Backend invalide le token
   ↓
4. Frontend clear localStorage
   ↓
5. Redirection vers survey
```

---

## 💾 Stockage Local

### localStorage Keys

- `yojob_session` : Session Supabase (access_token, refresh_token, expires_at)
- `yojob_user` : Données utilisateur (id, email, name, role)

### Structure de Session

```typescript
{
  access_token: "eyJhbGci...", // JWT token
  refresh_token: "...",         // Pour prolonger la session
  expires_at: 1699999999        // Timestamp d'expiration
}
```

### Structure User

```typescript
{
  id: "uuid",
  email: "admin@yojob.com",
  name: "Admin YOJOB",
  role: "admin",
  created_at: "2024-11-29T..."
}
```

---

## 🛡️ Sécurité

### ✅ Ce qui est sécurisé

1. **Mots de passe chiffrés** - Jamais stockés en clair
2. **JWT tokens** - Signés et vérifiés par Supabase
3. **HTTPS only** - Communication chiffrée
4. **Session expiration** - Tokens expirent après 1h
5. **Refresh tokens** - Permettent de prolonger sans re-login
6. **Server-side validation** - Toutes les requêtes sensibles vérifiées
7. **CORS configuré** - Uniquement les origines autorisées

### ⚠️ Recommandations

1. **Changez le mot de passe par défaut** dès la première connexion
2. **Utilisez un mot de passe fort** (12+ caractères, mixte)
3. **Ne partagez pas vos credentials**
4. **Déconnectez-vous** sur les postes partagés
5. **Vérifiez l'URL** (HTTPS + domaine correct)

---

## 🔧 Changement de Mot de Passe

### Via le Dashboard

1. Se connecter au dashboard
2. Aller dans **Paramètres** → **Sécurité**
3. Saisir le nouveau mot de passe
4. Confirmer
5. Le mot de passe est changé instantanément

### Via l'API

```typescript
import { changePassword } from './services/authService';

const result = await changePassword('MonNouveauMotDePasse123!');

if (result.success) {
  console.log('Mot de passe changé !');
}
```

---

## 🐛 Dépannage

### Problème : "Email ou mot de passe incorrect"

**Causes possibles** :
- Compte admin pas encore créé
- Mauvais mot de passe
- Erreur de frappe dans l'email

**Solutions** :
1. Vérifier que le compte existe (voir Méthode 3 pour créer)
2. Essayer "Première connexion ? Créer un compte"
3. Vérifier les majuscules/minuscules du mot de passe
4. Copier-coller le mot de passe depuis cette doc

### Problème : "Session invalide ou expirée"

**Causes possibles** :
- Token expiré (après 1h)
- Session invalidée côté serveur
- Déconnexion depuis un autre appareil

**Solutions** :
1. Se reconnecter (le refresh devrait être automatique)
2. Vider le cache du navigateur
3. Vérifier que Supabase fonctionne

### Problème : "Erreur réseau lors de la connexion"

**Causes possibles** :
- Supabase non configuré
- Mauvais project ID ou anon key
- Edge Functions non déployées
- Pas de connexion internet

**Solutions** :
1. Vérifier les variables d'environnement Supabase
2. Déployer les Edge Functions
3. Tester `/auth/signup` avec curl/Postman
4. Vérifier la console navigateur pour détails

### Problème : "Un utilisateur avec cet email existe déjà"

**Cause** : Le compte admin existe déjà

**Solution** : Utilisez simplement la page de login normale !

---

## 📊 API Reference

### POST /auth/signup

**Body** :
```json
{
  "email": "admin@yojob.com",
  "password": "Adeole@33700",
  "name": "Admin YOJOB"
}
```

**Response (success)** :
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "admin@yojob.com",
    "name": "Admin YOJOB"
  },
  "message": "Utilisateur créé avec succès"
}
```

### POST /auth/login

**Body** :
```json
{
  "email": "admin@yojob.com",
  "password": "Adeole@33700"
}
```

**Response (success)** :
```json
{
  "success": true,
  "session": {
    "access_token": "eyJhbGci...",
    "refresh_token": "...",
    "expires_at": 1699999999
  },
  "user": {
    "id": "uuid",
    "email": "admin@yojob.com",
    "name": "Admin YOJOB",
    "role": "admin"
  }
}
```

### POST /auth/logout

**Headers** :
```
Authorization: Bearer {access_token}
```

**Response** :
```json
{
  "success": true,
  "message": "Déconnexion réussie"
}
```

### GET /auth/session

**Headers** :
```
Authorization: Bearer {access_token}
```

**Response** :
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "admin@yojob.com",
    "name": "Admin YOJOB",
    "role": "admin"
  }
}
```

---

## 🔮 Évolutions Futures

- [ ] **Authentification multi-facteurs** (2FA)
- [ ] **Récupération de mot de passe** par email
- [ ] **Gestion des rôles** (admin, viewer, editor)
- [ ] **Logs d'activité** (qui s'est connecté quand)
- [ ] **Sessions actives** (voir/révoquer)
- [ ] **OAuth providers** (Google, GitHub)
- [ ] **IP whitelisting** pour plus de sécurité
- [ ] **Rate limiting** sur login (anti-bruteforce)

---

## ✅ Migration depuis l'Ancien Système

L'ancien système utilisait :
```javascript
localStorage.setItem('yojob_admin_auth', 'true');
```

Le nouveau système migre automatiquement :
- Détecte l'ancien flag `yojob_admin_auth`
- Le supprime
- Demande de se reconnecter avec les vrais credentials

**Aucune action manuelle requise !** 🎉

---

**Version** : 2.0  
**Dernière mise à jour** : 29 Novembre 2024  
**Maintenu par** : Équipe YOJOB Dev
