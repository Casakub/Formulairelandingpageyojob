# 🔧 Dépannage Authentification - Guide Rapide

## 🐛 Erreur: "Invalid login credentials"

Cette erreur signifie que Supabase ne trouve pas de compte avec ces identifiants.

---

## ✅ Solution Étape par Étape

### Étape 1️⃣ : Vérifier si le compte existe

1. **Ouvrir la console** du navigateur (F12)

2. **Taper cette commande** :

```javascript
authDebug.checkUserExists('admin@yojob.com')
```

3. **Résultats possibles** :

**✅ Si le compte existe :**
```
✅ User exists!
   Email: admin@yojob.com
   Created: 2024-11-29T...
   Email confirmed: Yes
   Last sign in: Never
```
→ Passez à l'Étape 2

**❌ Si le compte n'existe pas :**
```
❌ User not found
   Total users in system: 0
```
→ Passez à l'Étape 3 (Créer le compte)

---

### Étape 2️⃣ : Tester le login

Si le compte existe mais le login échoue :

```javascript
authDebug.testLogin('admin@yojob.com', 'Adeole@33700')
```

**✅ Si ça fonctionne :**
```
✅ Login successful!
```
→ Problème résolu ! Essayez de vous reconnecter dans l'interface

**❌ Si ça échoue :**
```
❌ Login failed
   Error: Email ou mot de passe incorrect
```
→ Le mot de passe est peut-être différent. Passez à l'Étape 4

---

### Étape 3️⃣ : Créer le compte (si n'existe pas)

#### Option A : Via l'interface (Recommandée)

1. Cliquer sur **"Première connexion ? Créer un compte →"**
2. Remplir le formulaire :
   - Email: `admin@yojob.com`
   - Mot de passe: `Adeole@33700`
   - Confirmer: `Adeole@33700`
3. Cliquer sur **"Créer mon compte"**

#### Option B : Via la console

```javascript
async function createAccount() {
  // Get Supabase info
  const response = await fetch(window.location.origin + '/utils/supabase/info.tsx');
  
  // Or manually with your project ID
  const projectId = 'YOUR_PROJECT_ID'; // Replace
  const anonKey = 'YOUR_ANON_KEY'; // Replace
  
  const result = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/auth/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        email: 'admin@yojob.com',
        password: 'Adeole@33700',
        name: 'Admin YOJOB',
      }),
    }
  );
  
  const data = await result.json();
  console.log(data);
  
  if (data.success) {
    console.log('✅ Compte créé ! Vous pouvez vous connecter.');
  } else {
    console.error('❌ Erreur:', data.error);
  }
}

createAccount();
```

---

### Étape 4️⃣ : Réinitialiser le mot de passe (compte existe mais mot de passe oublié)

Si vous avez oublié le mot de passe, vous devez créer un nouveau compte avec un email différent OU accéder à Supabase Dashboard pour le réinitialiser manuellement.

**Via Supabase Dashboard** :

1. Aller sur [app.supabase.com](https://app.supabase.com)
2. Sélectionner votre projet
3. Aller dans **Authentication** → **Users**
4. Trouver l'utilisateur `admin@yojob.com`
5. Cliquer sur les 3 points → **Reset Password**
6. Entrer le nouveau mot de passe: `Adeole@33700`

---

## 🧪 Tests Automatiques Complets

Pour tester tout le système d'un coup :

```javascript
authDebug.runAuthTests()
```

Cela va :
1. ✅ Vérifier si l'utilisateur existe
2. ✅ Tester le login
3. ✅ Afficher tous les détails

---

## 📊 Logs du Backend

Les nouveaux logs détaillés dans le backend vous montrent :

### Lors du Signup :
```
📝 Signup request received for: admin@yojob.com
🔧 Creating user with admin API...
✅ Admin user created successfully: admin@yojob.com
   User ID: uuid-xxx-xxx
   Email confirmed: Yes
🔐 Creating initial session...
```

### Lors du Login :
```
🔐 Login request received for: admin@yojob.com
🔍 Checking if user exists...
✓ User exists in database
  Email confirmed: Yes
  Last sign in: Never
🔑 Attempting sign in with password...
✅ User logged in successfully: admin@yojob.com
   User ID: uuid-xxx-xxx
   Session expires at: 2024-11-29T...
```

### En cas d'erreur :
```
❌ Authentication error during login: AuthApiError
   Error name: AuthApiError
   Error message: Invalid login credentials
   Error status: 400
```

---

## 🔍 Vérifications Manuelles

### 1. Vérifier Supabase Configuration

Assurez-vous que vos variables d'environnement sont définies :

```javascript
// Dans la console
console.log('Project ID:', window.location.hostname);
```

### 2. Vérifier le Backend

Tester si le backend fonctionne :

```javascript
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-10092a63/auth/debug?email=admin@yojob.com', {
  headers: {
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
})
.then(r => r.json())
.then(console.log);
```

### 3. Vérifier la Session

Voir si une session existe déjà :

```javascript
console.log('Session:', localStorage.getItem('yojob_session'));
console.log('User:', localStorage.getItem('yojob_user'));
```

---

## 🚨 Erreurs Courantes

### "Aucun compte trouvé avec cet email"
→ Le compte n'existe pas. Créez-le d'abord (Étape 3)

### "Email ou mot de passe incorrect"
→ Le mot de passe ne correspond pas. Vérifiez les majuscules/minuscules

### "Erreur réseau"
→ Vérifiez que Supabase est configuré et les Edge Functions déployées

### "Un utilisateur avec cet email existe déjà"
→ Le compte existe ! Utilisez juste le login normal

### "Session invalide ou expirée"
→ La session a expiré. Reconnectez-vous

---

## ✅ Checklist de Vérification

- [ ] Supabase est configuré (URL + keys)
- [ ] Edge Functions sont déployées
- [ ] Le compte admin existe (`authDebug.checkUserExists()`)
- [ ] Le mot de passe est correct : `Adeole@33700`
- [ ] L'email est correct : `admin@yojob.com`
- [ ] Pas d'espace avant/après l'email ou le mot de passe
- [ ] La console browser ne montre pas d'erreur CORS

---

## 💡 Astuce Pro

Si rien ne fonctionne, **supprimez tous les utilisateurs** et recréez :

1. Aller sur Supabase Dashboard
2. Authentication → Users
3. Supprimer tous les utilisateurs
4. Retourner sur votre app
5. Créer un nouveau compte via l'interface

---

## 📞 Besoin d'Aide ?

Si le problème persiste :

1. **Exporter les logs** :
   - Ouvrir console (F12)
   - Copier tous les logs
   - Partager avec le support

2. **Vérifier Supabase Logs** :
   - Aller sur Supabase Dashboard
   - Logs → Edge Functions
   - Chercher les erreurs

3. **Tester avec curl** :
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-10092a63/auth/login \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"email":"admin@yojob.com","password":"Adeole@33700"}'
```

---

**Bonne chance ! 🚀**
