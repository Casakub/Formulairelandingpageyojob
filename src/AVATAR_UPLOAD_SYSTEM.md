# 📸 Système d'Upload d'Avatars pour les Témoignages

## 🎯 Vue d'ensemble

Système complet d'upload et de gestion des avatars pour les témoignages clients de la landing page YoJob.

---

## 🏗️ Architecture

### Backend (Supabase Storage)
**Fichier** : `/supabase/functions/server/storage.tsx`

- **Bucket** : `make-10092a63-landing-avatars` (créé automatiquement au démarrage)
- **Sécurité** : Bucket privé avec URLs signées (valides 10 ans)
- **Limites** :
  - Taille max : 5 MB
  - Formats autorisés : JPEG, PNG, WebP, GIF

**Routes disponibles** :
```
POST   /make-server-10092a63/storage/upload-avatar
DELETE /make-server-10092a63/storage/delete-avatar
POST   /make-server-10092a63/storage/refresh-url
```

---

## 🎨 Frontend

### 1. Composant AvatarUploader
**Fichier** : `/components/dashboard/AvatarUploader.tsx`

**Fonctionnalités** :
- ✅ Upload d'image avec preview
- ✅ Conversion automatique en base64
- ✅ Validation côté client (type + taille)
- ✅ Fallback sur initiales colorées (si pas d'image)
- ✅ Suppression d'avatar
- ✅ Messages toast informatifs

**Usage** :
```tsx
<AvatarUploader
  currentAvatar={testimonial.avatar}
  onAvatarChange={(url) => handleFieldChange('testimonials', 'avatar', url, index)}
  name={testimonial.name || 'Client'}
/>
```

---

### 2. TestimonialCarousel (Landing Page)
**Fichier** : `/components/landing/TestimonialCarousel.tsx`

**Connexion au CMS** :
- ✅ Utilise `useLandingContent()` pour lire les données
- ✅ Affiche les avatars uploadés en priorité
- ✅ Fallback sur images Unsplash (3 images par défaut)
- ✅ Fallback sur initiales colorées (si aucune image)

**Hiérarchie d'affichage** :
1. Avatar uploadé (depuis Supabase Storage)
2. Image Unsplash par défaut
3. Initiales colorées (générées depuis le nom)

---

### 3. Dashboard CMS
**Fichier** : `/components/dashboard/LandingContentEditor.tsx`

**Modifications** :
- Import du composant `AvatarUploader`
- Champ avatar ajouté dans l'onglet "Témoignages"
- Sauvegarde automatique de l'URL de l'avatar

---

## 🔄 Flow complet d'upload

```
1. Utilisateur sélectionne une image dans le dashboard
   └─> AvatarUploader (frontend)

2. Validation côté client
   ├─> Type: JPEG, PNG, WebP, GIF ✓
   ├─> Taille: < 5 MB ✓
   └─> Conversion en base64

3. Upload vers le backend
   └─> POST /storage/upload-avatar
       ├─> Création du bucket (si nécessaire)
       ├─> Upload dans Supabase Storage
       └─> Génération URL signée (10 ans)

4. Retour de l'URL signée
   └─> onAvatarChange(url)
       └─> handleFieldChange('testimonials', 'avatar', url, index)
           └─> Sauvegarde dans localStorage (CMS)

5. Affichage sur la landing page
   └─> TestimonialCarousel lit landingContent.fr.testimonials
       └─> Affiche testimonial.avatar
```

---

## 📊 Stockage des données

### Structure du témoignage (type TypeScript)
```typescript
{
  id: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  quote: string;
  rating: number;
  avatar?: string;  // ← Nouveau champ
}
```

### Stockage
- **CMS** : `localStorage` → clé `yojob_landing_content`
- **Images** : Supabase Storage → bucket `make-10092a63-landing-avatars`

---

## 🎨 Fallback & Initiales

Si aucun avatar n'est uploadé, le système affiche des **initiales colorées** :

**Extraction des initiales** :
```typescript
"Marie Dubois" → "MD"
"Jean-Pierre Martin" → "JM"
```

**Couleurs (5 variations basées sur le nom)** :
- 🔵 Bleu → Cyan
- 🟣 Violet → Pourpre
- 🟢 Vert → Émeraude
- 🟠 Orange → Ambre
- 🩷 Rose → Rouge

---

## 🔐 Sécurité

### Backend
- ✅ Bucket **privé** (pas d'accès public direct)
- ✅ URLs **signées** (expiration après 10 ans)
- ✅ Validation stricte des types MIME
- ✅ Limite de taille fichier (5 MB)

### Frontend
- ✅ Validation côté client avant upload
- ✅ Messages d'erreur clairs
- ✅ Gestion des erreurs réseau

---

## 🚀 Utilisation

### Dans le Dashboard CMS

1. Aller dans l'onglet **"Témoignages"**
2. Sélectionner un témoignage existant ou créer un nouveau
3. Cliquer sur **"Uploader un avatar"**
4. Choisir une image (JPG, PNG, WebP ou GIF - max 5 MB)
5. L'image s'upload automatiquement et un aperçu s'affiche
6. **Sauvegarder** les modifications

### Sur la Landing Page

Les avatars uploadés s'affichent automatiquement dans le carousel de témoignages.

---

## 🐛 Dépannage

### L'image ne s'upload pas
- Vérifier la taille (< 5 MB)
- Vérifier le format (JPEG, PNG, WebP, GIF)
- Consulter la console du navigateur pour les erreurs

### L'image ne s'affiche pas sur la landing
- Vérifier que les modifications ont été sauvegardées dans le CMS
- Rafraîchir la page landing
- Vérifier que l'URL signée est valide (console réseau)

### Le bucket n'existe pas
- Le bucket est créé automatiquement au démarrage du serveur
- Vérifier les logs du serveur Supabase
- Si nécessaire, redémarrer le serveur

---

## 📝 Notes techniques

### URLs signées (10 ans)
Les URLs sont valides **10 ans** pour éviter de devoir les régénérer régulièrement. Pour une landing page statique, c'est largement suffisant.

### Alternative : Base64
Si vous préférez stocker les images en **base64** directement dans le CMS (sans Supabase Storage), c'est possible mais déconseillé pour :
- Augmentation de la taille du localStorage
- Performances de chargement
- Pas adapté à de nombreuses images

---

## ✅ Checklist de validation

- [x] Backend Storage créé
- [x] Routes API ajoutées
- [x] Composant AvatarUploader créé
- [x] TestimonialCarousel connecté au CMS
- [x] Dashboard mis à jour avec upload
- [x] Fallback sur initiales colorées
- [x] Gestion des erreurs
- [x] Documentation complète

---

**Version** : 1.0  
**Date** : Décembre 2024  
**Auteur** : Équipe YoJob Dev
