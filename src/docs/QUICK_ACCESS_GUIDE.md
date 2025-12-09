# 🚀 Guide d'accès rapide au Landing CMS

## 📍 Comment accéder au Landing CMS

### Option 1 : Via le dashboard admin

1. **Se connecter au dashboard**
   ```
   URL : /admin
   Email : a.auger@yojob.fr
   Mot de passe : Adeole@33700
   ```

2. **Naviguer vers Landing CMS**
   - Dans la sidebar gauche, cliquez sur **"Landing CMS"** (icône 🌍 Globe)
   - Un badge **"Nouveau"** violet/cyan indique le nouvel onglet
   - L'onglet se trouve juste après **"CMS Formulaire"**

3. **Vous êtes dans le Landing CMS !**
   - Interface avec 3 blocs : Structure, Langues, SEO
   - Gestion de 23 langues européennes
   - Workflow de traduction avancé

---

### Option 2 : Via l'URL directe

**Note** : L'onglet Landing CMS est intégré dans le dashboard, mais l'URL reste `/admin` avec navigation interne.

Pour accéder rapidement :
1. Allez sur `/admin`
2. Le système se souvient du dernier onglet actif
3. Si besoin, cliquez sur "Landing CMS" dans la sidebar

---

## 🎨 Structure du dashboard

```
┌────────────────────────────────────────────────────┐
│  SIDEBAR (gauche)                                  │
│                                                    │
│  👤 Admin Profile                                  │
│  ├── a.auger@yojob.fr                             │
│  └── [Admin]                                       │
│                                                    │
│  NAVIGATION                                        │
│  ├── 📊 Vue d'ensemble                            │
│  ├── 📈 Résultats                                  │
│  ├── ✏️ Questions                                  │
│  ├── 🌐 Traductions                                │
│  ├── 💾 Export                                     │
│  ├── 🔌 Intégrations                              │
│  ├── 📄 CMS Formulaire                            │
│  ├── 🌍 Landing CMS ✨ [Nouveau]  ← NOUVEAU !     │
│  └── ⚙️ Paramètres                                │
│                                                    │
│  ACTIONS                                           │
│  ├── ← Retour formulaire                          │
│  ├── 🚪 Déconnexion                                │
│  └── ◀ Réduire                                     │
└────────────────────────────────────────────────────┘
```

---

## 🎯 Différence entre les deux CMS

### CMS Formulaire (existant)
- **Icône** : 📄 FileType
- **But** : Gérer le contenu du formulaire d'enquête (26 questions)
- **Langues** : Traductions des questions pour 23 langues
- **Sections** : Hero, Progress, Questions (6 sections)

### Landing CMS (nouveau) ⭐
- **Icône** : 🌍 Globe
- **But** : Gérer le contenu de la landing page YOJOB
- **Langues** : 23 langues européennes avec workflow avancé
- **Sections** : Hero, Services, Network, Steps, Testimonials, CTA Form, Footer (10 sections)
- **Features** : Traduction IA, statuts avancés, progression par langue

---

## ✅ Checklist de premier accès

- [ ] Se connecter à `/admin` avec les identifiants
- [ ] Vérifier que la sidebar affiche "Landing CMS" avec badge "Nouveau"
- [ ] Cliquer sur "Landing CMS"
- [ ] Vérifier que l'interface affiche les 3 blocs :
  - Bloc A : Structure des contenus
  - Bloc B : Gestion des langues (23 langues)
  - Bloc C : SEO & Référencement IA
- [ ] Tester la sélection de langue (FR, EN)
- [ ] Explorer une section (ex: Hero)

---

## 🐛 Problèmes d'accès

### Problème 1 : "Je ne vois pas l'onglet Landing CMS"

**Solutions** :
1. Vérifier que vous êtes bien connecté
2. Rafraîchir la page (Ctrl + F5)
3. Vider le cache du navigateur
4. Vérifier que le fichier `/DashboardApp.tsx` a été mis à jour
5. Redémarrer le serveur de développement

**Vérification** :
```bash
# Dans le terminal
npm run dev

# Vérifier que le composant est bien importé
grep "LandingContentManager" DashboardApp.tsx
```

---

### Problème 2 : "L'onglet est là mais ne s'affiche pas"

**Solutions** :
1. Ouvrir la console développeur (F12)
2. Vérifier les erreurs JavaScript
3. Vérifier que le composant `/components/dashboard/LandingContentManager.tsx` existe
4. Vérifier les imports manquants

**Vérification** :
```bash
# Vérifier que le fichier existe
ls -la components/dashboard/LandingContentManager.tsx
```

---

### Problème 3 : "Badge 'Nouveau' n'apparaît pas"

**C'est normal si** :
- La sidebar est réduite (collapsed)
- Le badge apparaît dans le tooltip au survol

**Solutions** :
1. Étendre la sidebar (bouton "◀ Réduire" en bas)
2. Le badge violet/cyan devrait apparaître à côté de "Landing CMS"

---

## 📱 Accès mobile

Sur mobile, le menu est dans un hamburger (☰) en haut à droite :

1. Ouvrir `/admin` sur mobile
2. Cliquer sur le menu hamburger (☰)
3. Scroll vers le bas
4. Cliquer sur **"Landing CMS"**

---

## 🎓 Premiers pas après l'accès

### 1. Explorer l'interface (5 min)

- Naviguer entre les sections (Hero, Services, Network, etc.)
- Vérifier le contenu français (référence)
- Explorer le contenu anglais

### 2. Tester la traduction (10 min)

1. Aller dans **Bloc B - Gestion des langues**
2. Trouver une langue test (ex: 🇩🇪 Deutsch)
3. Cliquer sur **"Traduire avec l'IA"**
4. Observer l'éditeur qui s'ouvre
5. Parcourir les propositions IA (mode MOCK)

### 3. Éditer du contenu (5 min)

1. Sélectionner **FR** comme langue active
2. Aller dans section **Hero**
3. Modifier le titre ou le sous-titre
4. Cliquer sur **"Sauvegarder"** (en haut à droite)

---

## 📚 Documentation complète

Une fois dans le Landing CMS, consultez :

- **Guide utilisateur** : [`/docs/CMS_USER_GUIDE.md`](/docs/CMS_USER_GUIDE.md)
- **Workflow de traduction** : [`/docs/TRANSLATION_WORKFLOW_GUIDE.md`](/docs/TRANSLATION_WORKFLOW_GUIDE.md)
- **Index complet** : [`/docs/CMS_INDEX.md`](/docs/CMS_INDEX.md)

---

## 🎉 Résumé

**Pour accéder au Landing CMS** :

```
1. /admin
2. Login (a.auger@yojob.fr / Adeole@33700)
3. Cliquer sur "Landing CMS" (🌍) dans la sidebar
4. C'est tout ! 🚀
```

**Badge "Nouveau"** : Indique que c'est le nouveau système ajouté aujourd'hui

**Emplacement** : Entre "CMS Formulaire" et "Paramètres" dans la navigation

---

**Date de création** : 7 décembre 2024  
**Version** : 1.0  
**Auteur** : Équipe YOJOB Dev
