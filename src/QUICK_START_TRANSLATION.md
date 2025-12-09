# 🚀 Quick Start - Système de Traduction Multilingue

## ⚡ Démarrage rapide (5 minutes)

### **Étape 1 : Migration SQL** (1 minute)

```bash
# Ouvrez Supabase Dashboard → SQL Editor
# Copiez-collez le fichier :
/supabase/migrations/11_landing_translations_table.sql
# Cliquez sur "Run"
```

✅ Table `landing_translations` créée !

---

### **Étape 2 : Migration des données** (2 minutes)

1. Ouvrez `/admin` (Dashboard)
2. **Paramètres** → Card **"Migration vers Supabase"**
3. Cliquez sur **"Lancer la migration"**
4. Attendez la barre de progression (30s - 1min)

✅ Vos traductions FR/EN sont maintenant dans Supabase !

---

### **Étape 3 : Vérification** (30 secondes)

1. Ouvrez `/` (Landing page)
2. Cliquez sur le **sélecteur de langue** (header en haut à droite)
3. Choisissez 🇬🇧 English ou 🇫🇷 Français
4. La page se met à jour instantanément

✅ Le système fonctionne !

---

### **Étape 4 : Traduire une nouvelle langue** (2 minutes)

1. Dashboard → **📝 Traductions** → Onglet **Landing Page**
2. Dans la colonne de droite, trouvez **🇩🇪 Deutsch**
3. Cliquez sur **"Traduire avec l'IA"** 🤖
4. Attendez 30 secondes (Claude traduit tout automatiquement)
5. L'éditeur s'ouvre → **Validez** les traductions ✅
6. Cliquez sur **"Sauvegarder"**

✅ Votre landing page est maintenant disponible en allemand !

---

## 🎯 Fonctionnalités clés

| Feature | Description |
|---------|-------------|
| 🌍 **23 langues** | Toutes les langues européennes |
| 🤖 **IA Claude** | Traduction automatique haute qualité |
| 💾 **Supabase** | Base de données cloud synchronisée |
| 📊 **Workflow** | NOT_STARTED → AI_PROPOSED → IN_REVIEW → VALIDATED |
| 🎨 **UI/UX** | Sélecteur élégant avec drapeaux |
| 📱 **Responsive** | Desktop & Mobile |
| 🔍 **Détection auto** | Langue du navigateur détectée |
| 💿 **Cache** | localStorage pour accès offline |

---

## 📋 Les 23 langues disponibles

| Langue | Code | Drapeau | Langue | Code | Drapeau |
|--------|------|---------|--------|------|---------|
| Français | `fr` | 🇫🇷 | Néerlandais | `nl` | 🇳🇱 |
| English | `en` | 🇬🇧 | Português | `pt` | 🇵🇹 |
| Deutsch | `de` | 🇩🇪 | Polski | `pl` | 🇵🇱 |
| Español | `es` | 🇪🇸 | Čeština | `cs` | 🇨🇿 |
| Italiano | `it` | 🇮🇹 | Slovenčina | `sk` | 🇸🇰 |
| Magyar | `hu` | 🇭🇺 | Română | `ro` | 🇷🇴 |
| Български | `bg` | 🇧🇬 | Hrvatski | `hr` | 🇭🇷 |
| Slovenščina | `sl` | 🇸🇮 | Eesti | `et` | 🇪🇪 |
| Latviešu | `lv` | 🇱🇻 | Lietuvių | `lt` | 🇱🇹 |
| Ελληνικά | `el` | 🇬🇷 | Svenska | `sv` | 🇸🇪 |
| Dansk | `da` | 🇩🇰 | Suomi | `fi` | 🇫🇮 |
| Norsk | `no` | 🇳🇴 | | | |

---

## 🔧 Commandes utiles

### **Charger les traductions dans votre code**

```typescript
import { useLandingTranslations } from './hooks/useLandingTranslations';

const {
  translations,        // Toutes les traductions
  currentLanguage,     // 'fr', 'en', 'de'...
  setLanguage,         // Changer de langue
  availableLanguages,  // ['fr', 'en', 'de', ...]
  isLoading,           // État de chargement
} = useLandingTranslations('fr');
```

### **Afficher un sélecteur de langue**

```tsx
import { LanguageSelector } from './components/landing/LanguageSelector';

<LanguageSelector
  currentLanguage={currentLanguage}
  onLanguageChange={setLanguage}
  availableLanguages={availableLanguages}
  variant="default" // ou "mobile"
/>
```

---

## 🎨 Personnalisation

### **Changer la langue par défaut**

Dans `/App-Landing.tsx` :

```typescript
// Ligne ~130
const initialLanguage = 'de'; // Au lieu de 'fr'
```

### **Désactiver certaines langues**

Dans le Dashboard :
1. Traductions → Landing Page
2. Supprimez les langues non souhaitées
3. Elles disparaissent du sélecteur

---

## 📊 Tableau de bord CMS

### **Accès**
`/admin` → **📝 Traductions** → **Landing Page**

### **Interface 3 blocs**

| Bloc | Description |
|------|-------------|
| **A** | Structure du contenu (Hero, Services, Footer...) |
| **B** | Gestion des 23 langues + Traduction IA |
| **C** | SEO & Référencement IA (500 caractères) |

### **Workflow de traduction**

1. **Source (FR)** : Modifiez le contenu français dans **Landing CMS**
2. **Traduire** : Cliquez sur "Traduire avec l'IA" pour une langue
3. **Valider** : Ouvrez l'éditeur et validez les propositions IA
4. **Publier** : Les traductions sont automatiquement publiées

---

## 🚨 Dépannage rapide

| Problème | Solution |
|----------|----------|
| "Aucune traduction disponible" | Faites la migration (Étape 2) |
| Sélecteur de langue invisible | Vérifiez la console (F12) pour erreurs |
| Traduction IA échoue | Paramètres → Testez la clé API Anthropic |
| Page blanche | Rechargez après migration |

---

## 💡 Bonnes pratiques

✅ **DO** :
- Traduire le français en premier (langue source)
- Valider manuellement les traductions IA
- Tester sur mobile ET desktop
- Optimiser le SEO pour chaque langue

❌ **DON'T** :
- Ne supprimez pas la langue française (source)
- N'oubliez pas de sauvegarder après édition
- Ne traduisez pas manuellement 23 langues (utilisez l'IA !)

---

## 🎯 Checklist complète

- [ ] Migration SQL exécutée
- [ ] Données migrées vers Supabase
- [ ] Sélecteur de langue visible sur `/`
- [ ] Badge "Traductions Live" dans le footer
- [ ] Au moins 2 langues traduites (FR + EN)
- [ ] Clé API Anthropic configurée
- [ ] SEO optimisé pour chaque langue
- [ ] Tests sur mobile réussis
- [ ] Détection automatique de langue fonctionne

---

**Temps total** : ~10 minutes  
**Langues actives** : 23/23 disponibles  
**Support IA** : Claude 3.5 Sonnet  
**Coût traduction** : ~$0.02 par langue  

🚀 **Votre landing page est maintenant multilingue !**
