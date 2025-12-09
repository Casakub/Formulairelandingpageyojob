# 📚 Guide utilisateur - Content & Localisation Manager

## 🎯 Présentation

Le **Content & Localisation Manager** est un mini CMS intégré qui vous permet de gérer tous les textes de votre landing page YOJOB en **23 langues européennes**, sans toucher au code.

---

## 🚀 Accès à l'interface

### 1. Se connecter au dashboard admin

```
URL : https://votre-domaine.com/admin
Email : a.auger@yojob.fr
Mot de passe : Adeole@33700
```

### 2. Accéder au CMS

Dans le menu du dashboard, cliquez sur l'onglet **"Landing CMS"** ou naviguez vers :

```
/admin/landing-content
```

---

## 🖥️ Interface principale

L'interface est divisée en **3 blocs** :

### 📝 Bloc A - Structure des contenus (gauche, grande colonne)

C'est ici que vous éditez tous les textes de la landing page.

**Sections disponibles** :
1. **SEO & Meta** - Titres et descriptions pour les moteurs de recherche
2. **Hero** - Bannière principale avec titre, sous-titre, bénéfices
3. **Statistiques** - Chiffres clés (10+ ans, 27 pays, 500+ agences)
4. **Services** - 3 services principaux
5. **Réseau Européen** - Section marketplace + waitlist
6. **Comment ça marche** - 4 étapes du processus
7. **Témoignages** - Avis clients
8. **Secteurs** - 6 secteurs d'activité
9. **Formulaire CTA** - Formulaire de contact final
10. **Footer** - Pied de page avec liens et contact

**Comment naviguer** :
- Cliquez sur un bouton de section (ex: "Hero", "Services")
- Les champs éditables s'affichent en dessous
- Modifiez les textes directement dans les inputs
- Les modifications sont automatiquement sauvegardées

---

### 🌍 Bloc B - Gestion des langues (droite, haut)

**23 langues européennes disponibles** :

| Langue | Code | Statut |
|--------|------|--------|
| 🇫🇷 Français | fr | ✅ Validée |
| 🇬🇧 English | en | ✅ Validée |
| 🇩🇪 Deutsch | de | ⏳ À traduire |
| 🇪🇸 Español | es | ⏳ À traduire |
| 🇮🇹 Italiano | it | ⏳ À traduire |
| 🇵🇹 Português | pt | ⏳ À traduire |
| 🇳🇱 Nederlands | nl | ⏳ À traduire |
| 🇵🇱 Polski | pl | ⏳ À traduire |
| ... | ... | ... |

**Actions disponibles** :

1. **Langue validée** (badge vert ✅)
   - Bouton "Éditer" - Modifier les textes existants

2. **Langue à traduire** (badge gris ⏳)
   - Bouton "IA" - Générer automatiquement la traduction depuis le français

**Workflow de traduction** :

```
Étape 1 : Éditer le contenu en FR (langue de référence)
    ↓
Étape 2 : Cliquer sur "IA" pour une autre langue (ex: DE)
    ↓
Étape 3 : L'IA traduit automatiquement tous les textes
    ↓
Étape 4 : Vérifier et ajuster la traduction si nécessaire
    ↓
Étape 5 : Changer le statut en "Validée"
```

---

### 🔍 Bloc C - SEO & Référencement IA (droite, bas)

**Champs SEO classiques** :

1. **Meta Title** (60 caractères max)
   - Titre qui apparaît dans Google
   - Exemple : *"YOJOB - Plateforme européenne de détachement | 27 pays"*

2. **Meta Description** (160 caractères max)
   - Description qui apparaît dans Google
   - Exemple : *"Centralisez vos démarches de détachement européen..."*

**Référencement pour les IA** :

3. **Résumé pour les intelligences artificielles** (500 caractères max)
   - Texte clair et structuré pour ChatGPT, Perplexity, Claude, etc.
   - Décrit la proposition de valeur de YOJOB de manière concise
   - Exemple : *"YOJOB est une plateforme européenne spécialisée dans le détachement de personnel. Elle centralise tous les documents et démarches administratives dans un coffre-fort numérique sécurisé..."*

4. **FAQ Structurée**
   - Questions / réponses fréquentes
   - Optimise le référencement naturel
   - Cliquable par les utilisateurs
   - Exemple :
     - Q : *"Qu'est-ce que YOJOB ?"*
     - R : *"YOJOB est une plateforme européenne de courtage..."*

**Pourquoi le résumé IA est important** :

Les moteurs de recherche IA (ChatGPT, Perplexity, Claude) utilisent ces résumés pour :
- Répondre aux questions des utilisateurs
- Recommander votre plateforme
- Comprendre votre proposition de valeur

Un bon résumé IA = meilleure visibilité dans les recherches conversationnelles.

---

## 📝 Édition des contenus

### Section Hero (exemple détaillé)

**Champs disponibles** :

| Champ | Clé | Exemple de valeur |
|-------|-----|-------------------|
| Badge | `landing.fr.hero.badge` | "⭐ Leader du recrutement européen" |
| Titre H1 | `landing.fr.hero.title` | "Votre partenaire pour recruter en Europe" |
| Sous-titre | `landing.fr.hero.subtitle` | "Accédez à un réseau de 500+ agences..." |
| Bénéfice 1 | `landing.fr.hero.benefits[0]` | "Dossiers centralisés et sécurisés" |
| Bénéfice 2 | `landing.fr.hero.benefits[1]` | "Démarches administratives en ligne" |
| Bénéfice 3 | `landing.fr.hero.benefits[2]` | "Gestion des offres d'emploi" |
| Bénéfice 4 | `landing.fr.hero.benefits[3]` | "Conformité multi-pays" |
| CTA Primaire | `landing.fr.hero.ctaPrimaryLabel` | "Demander un devis" |
| CTA Secondaire | `landing.fr.hero.ctaSecondaryLabel` | "Découvrir notre réseau" |

**Comment éditer** :

1. Sélectionnez la section **"Hero"** en haut
2. Les champs s'affichent en dessous
3. Modifiez le texte directement dans l'input
4. Le compteur de caractères vous aide à respecter les limites
5. Cliquez sur **"Sauvegarder"** en haut à droite

**Copier une clé de contenu** :

À côté de chaque champ, vous voyez la clé (ex: `landing.fr.hero.title`).
Cliquez sur l'icône "Copy" pour la copier dans le presse-papiers.

---

### Section Services

**Structure** :

```
Section Services
├── Badge
├── Titre
├── Sous-titre
└── 3 Services
    ├── Service 1 (Intérim européen)
    │   ├── Icône
    │   ├── Titre
    │   ├── Description
    │   └── Label du lien
    ├── Service 2 (Recrutement spécialisé)
    └── Service 3 (Conseil & Conformité)
```

**Champs éditables** :

- Badge : `landing.fr.services.badge`
- Titre : `landing.fr.services.title`
- Sous-titre : `landing.fr.services.subtitle`
- Service 1 titre : `landing.fr.services.services[0].title`
- Service 1 description : `landing.fr.services.services[0].description`
- Service 1 lien : `landing.fr.services.services[0].linkLabel`

---

### Section Réseau Européen (Waitlist)

**Particularité** : Cette section contient la carte de sous-section "Waitlist" pour la future marketplace.

**Champs clés** :

| Champ | Clé | Type |
|-------|-----|------|
| Badge Waitlist | `landing.fr.network.waitlist.badge` | string |
| Titre Waitlist | `landing.fr.network.waitlist.title` | string |
| Sous-titre | `landing.fr.network.waitlist.subtitle` | textarea |
| Features (4) | `landing.fr.network.waitlist.features[0-3]` | array |
| Placeholder Email | `landing.fr.network.waitlist.emailPlaceholder` | string |
| CTA | `landing.fr.network.waitlist.ctaLabel` | string |

**Exemple de modification** :

```
Badge : "✨ Nouveauté 2026"
Titre : "Votre plateforme tout-en-un du détachement européen"
Sous-titre : "Centralisez tous vos documents et données de détachement..."
Feature 1 : "Dossiers centralisés et sécurisés"
Feature 2 : "Démarches administratives en ligne"
...
```

---

### Section Comment ça marche (4 étapes)

**Structure** :

```
4 Étapes
├── Étape 1 - Décrivez votre besoin
│   ├── Numéro : "01"
│   ├── Titre
│   ├── Description
│   └── Icône
├── Étape 2 - Nous activons notre réseau
├── Étape 3 - Validez les candidats
└── Étape 4 - Accueillez votre équipe
```

**Champs** :

- Étape 1 titre : `landing.fr.steps.steps[0].title`
- Étape 1 description : `landing.fr.steps.steps[0].description`

---

### Section Formulaire CTA

**Champs de formulaire** :

| Champ | Clé |
|-------|-----|
| Label "Nom" | `landing.fr.ctaForm.form.fields.name.label` |
| Placeholder "Nom" | `landing.fr.ctaForm.form.fields.name.placeholder` |
| Label "Email" | `landing.fr.ctaForm.form.fields.email.label` |
| Placeholder "Email" | `landing.fr.ctaForm.form.fields.email.placeholder` |
| Label "Téléphone" | `landing.fr.ctaForm.form.fields.phone.label` |
| Label "Entreprise" | `landing.fr.ctaForm.form.fields.company.label` |
| Label "Type de besoin" | `landing.fr.ctaForm.form.fields.needType.label` |
| Label "Message" | `landing.fr.ctaForm.form.fields.message.label` |
| Bouton CTA | `landing.fr.ctaForm.form.ctaLabel` |
| Note sécurité | `landing.fr.ctaForm.form.securityNote` |
| Message succès | `landing.fr.ctaForm.form.successMessage` |

**Exemple** :

```
Label Email : "Email professionnel"
Placeholder Email : "jean.dupont@entreprise.fr"
CTA : "Envoyer ma demande"
Note sécurité : "🔒 Vos données sont sécurisées et ne seront jamais partagées."
```

---

## 🌐 Workflow multilingue complet

### Scénario : Ajouter la traduction allemande

**Étape 1 : Préparer le contenu français** (5 min)

1. Se connecter au CMS
2. Sélectionner **FR** comme langue active
3. Parcourir toutes les sections (Hero, Services, Network, etc.)
4. Vérifier que tous les textes français sont corrects
5. Sauvegarder

**Étape 2 : Générer la traduction allemande** (2 min)

1. Dans le **Bloc B - Gestion des langues**
2. Trouver la ligne **🇩🇪 Deutsch (de)**
3. Cliquer sur le bouton **"IA"** (avec icône Sparkles)
4. L'IA traduit automatiquement tous les textes depuis le FR
5. Patienter 30 secondes

**Étape 3 : Vérifier et ajuster** (10-15 min)

1. Sélectionner **DE** comme langue active en haut
2. Parcourir section par section
3. Vérifier la qualité des traductions
4. Ajuster si nécessaire :
   - Termes métier spécifiques
   - Expressions idiomatiques
   - Longueur des textes (pour le design)
5. Sauvegarder

**Étape 4 : Valider la traduction** (1 min)

1. Dans le **Bloc B**, ligne **🇩🇪 Deutsch**
2. Changer le statut de ⏳ "À traduire" à ✅ "Validée"
3. Sauvegarder

**Étape 5 : Publication** (automatique)

- La landing page affichera automatiquement le contenu allemand
- Les utilisateurs peuvent sélectionner la langue via le sélecteur
- Aucun redéploiement nécessaire

---

## 🎨 Conseils de rédaction

### Pour les titres (H1, H2)

- ✅ Courts et percutants (50-60 caractères max)
- ✅ Contiennent des mots-clés importants
- ✅ Promesse claire de valeur
- ❌ Pas de jargon technique complexe
- ❌ Pas trop longs (cassent le design)

**Exemples** :

✅ "Votre partenaire pour recruter en Europe"  
✅ "Plateforme européenne de détachement de personnel"  
❌ "Solution innovante de gestion optimisée des ressources humaines à l'échelle européenne pour les entreprises de toutes tailles"

---

### Pour les sous-titres / descriptions

- ✅ Complètent le titre principal
- ✅ 1 à 2 phrases maximum
- ✅ Bénéfices concrets
- ❌ Pas de répétition du titre
- ❌ Pas de détails techniques

**Exemples** :

✅ "Accédez à un réseau de 500+ agences d'emploi dans 27 pays. Simplifiez votre recrutement européen avec un courtier expert et de confiance."

❌ "Notre plateforme vous permet d'accéder à notre réseau d'agences. Nous sommes experts. Faites-nous confiance pour vos recrutements."

---

### Pour les listes de bénéfices (bullets)

- ✅ 3 à 6 items maximum
- ✅ Courts (4-6 mots)
- ✅ Commencent par un verbe d'action ou un nom
- ✅ Parallélisme grammatical
- ❌ Pas de phrases complètes

**Exemples** :

✅  
- Dossiers centralisés et sécurisés
- Démarches administratives en ligne
- Gestion des offres d'emploi
- Conformité multi-pays

❌  
- Vous pouvez centraliser vos dossiers
- Les démarches se font en ligne
- Gérer des offres
- Nous assurons la conformité

---

### Pour le résumé IA (500 caractères)

**Structure recommandée** :

```
[Qui êtes-vous] + [Ce que vous faites] + [Comment] + [Pour qui] + [Bénéfices clés]
```

**Exemple** :

> YOJOB est une plateforme européenne spécialisée dans le détachement de personnel. Elle centralise tous les documents et démarches administratives dans un coffre-fort numérique sécurisé. Les entreprises peuvent gérer leurs offres d'emploi, préparer les dossiers de détachement et assurer la conformité légale dans 27 pays européens via un réseau de 500+ agences partenaires. La plateforme simplifie le recrutement européen et garantit la conformité sociale.

**Tips** :

- ✅ Phrases courtes et claires
- ✅ Mots-clés importants en début de phrase
- ✅ Chiffres concrets (500+, 27 pays)
- ✅ Bénéfices tangibles
- ❌ Pas de superlatifs vagues ("le meilleur", "révolutionnaire")
- ❌ Pas de jargon marketing

---

## 🔒 Bonnes pratiques

### Sauvegarde régulière

- Sauvegardez après chaque section éditée
- Ne fermez pas l'onglet sans sauvegarder
- Les modifications non sauvegardées seront perdues

### Tests multilingues

Après avoir édité une langue :

1. Allez sur la landing page
2. Sélectionnez la langue modifiée
3. Vérifiez que tous les textes s'affichent correctement
4. Vérifiez que le design n'est pas cassé (textes trop longs)

### Cohérence entre les langues

- Les structures doivent rester similaires
- Le nombre de bénéfices doit être identique
- Les labels de boutons doivent avoir la même longueur approximative
- Les tons et promesses doivent être cohérents

### SEO par langue

Chaque langue a ses propres :
- Meta title (adapté aux recherches locales)
- Meta description (adaptée)
- Slug (ex: `/fr`, `/en`, `/de`)
- FAQ (questions fréquentes dans chaque pays)

---

## 🐛 Problèmes courants

### "La traduction IA ne fonctionne pas"

**Solutions** :
1. Vérifiez que le contenu FR est complet
2. Attendez 30 secondes (l'IA peut prendre du temps)
3. Rafraîchissez la page
4. Contactez le support technique

### "Les modifications ne s'affichent pas sur la landing"

**Solutions** :
1. Vérifiez que vous avez cliqué sur "Sauvegarder"
2. Rafraîchissez la landing page (Ctrl + F5)
3. Videz le cache du navigateur
4. Vérifiez que vous avez sélectionné la bonne langue sur la landing

### "Le design est cassé après ma modification"

**Cause** : Texte trop long

**Solutions** :
1. Réduisez la longueur du texte
2. Respectez les limites de caractères indiquées
3. Utilisez des synonymes plus courts
4. Contactez le support pour ajuster le design

---

## 📞 Support

### Documentation technique

- **Guide d'intégration** : `/docs/LANDING_CMS_INTEGRATION.md`
- **Types TypeScript** : `/types/landingContent.ts`
- **Contenu FR** : `/content/landing/fr.ts`

### Contact

- **Email** : dev@yojob.fr
- **Documentation complète** : `/docs/INDEX_DOCUMENTATION.md`

---

## 🚀 Prochaines fonctionnalités

### Version 1.1 (À venir)

- ✨ Preview en temps réel (split-screen)
- ✨ Historique des versions
- ✨ Restauration de versions précédentes
- ✨ Comparaison de traductions côte à côte

### Version 1.2 (Roadmap)

- ✨ Édition collaborative multi-utilisateurs
- ✨ Workflow d'approbation (brouillon → en révision → publié)
- ✨ Commentaires et notes internes
- ✨ Export/Import des traductions (Excel, CSV)

---

**Version du guide** : 1.0  
**Dernière mise à jour** : 7 décembre 2024  
**Auteur** : Équipe YOJOB Dev
