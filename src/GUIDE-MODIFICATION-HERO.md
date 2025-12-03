# 📘 Guide : Modifier la Hero Section et Mettre à Jour les Traductions

## 🎯 Vue d'ensemble

Ce guide vous explique comment :
1. ✅ Modifier le texte et la disposition de la Hero Section
2. ✅ Mettre à jour les traductions dans les 23 langues
3. ✅ Déployer les changements

---

## 📝 PARTIE 1 : Modifier le contenu français de la Hero Section

### Fichier à éditer : `/components/survey/HeroSection.tsx`

### 🔧 Exemple 1 : Modifier le badge

**AVANT** (lignes 56-59) :
```tsx
<div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
  <span className="mr-2 text-2xl">📊</span>
  <span className="text-white">{getText('hero.badge', 'Étude de marché européenne')}</span>
</div>
```

**APRÈS** (exemple de modification) :
```tsx
<div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
  <span className="mr-2 text-2xl">🚀</span> {/* Changement de l'icône */}
  <span className="text-white">{getText('hero.badge', 'Innovation RH en Europe')}</span> {/* Nouveau texte français */}
</div>
```

**⚠️ Important** : 
- Gardez la même **clé de traduction** (`'hero.badge'`)
- Changez uniquement le **fallback français** (`'Innovation RH en Europe'`)

---

### 🔧 Exemple 2 : Modifier le titre principal

**AVANT** (lignes 63-70) :
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="text-white mb-6 px-4"
>
  {getText('hero.title', 'Participez à l\'avenir du détachement européen')}
</motion.h1>
```

**APRÈS** (exemple) :
```tsx
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="text-white mb-6 px-4"
>
  {getText('hero.title', 'Révolutionnez le recrutement européen avec YoJob')}
</motion.h1>
```

---

### 🔧 Exemple 3 : Modifier le sous-titre

**AVANT** (lignes 73-80) :
```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="text-cyan-100 text-xl mb-12 max-w-3xl mx-auto px-4"
>
  {getText('hero.subtitle', 'Votre avis façonne YoJob. 8 minutes pour transformer votre quotidien administratif.')}
</motion.p>
```

**APRÈS** (exemple) :
```tsx
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="text-cyan-100 text-xl mb-12 max-w-3xl mx-auto px-4"
>
  {getText('hero.subtitle', 'Donnez votre avis en 10 minutes et participez à la création de la première marketplace européenne.')}
</motion.p>
```

---

### 🔧 Exemple 4 : Modifier les statistiques (cards)

**AVANT** (lignes 20-39) :
```tsx
const stats = [
  { 
    icon: Globe, 
    labelKey: 'hero.stat.countries',
    fallback: '27 pays couverts',
    color: 'from-cyan-400 to-blue-500' 
  },
  { 
    icon: Users, 
    labelKey: 'hero.stat.agencies',
    fallback: '500+ agences partenaires',
    color: 'from-violet-400 to-purple-500' 
  },
  { 
    icon: Clock, 
    labelKey: 'hero.stat.duration',
    fallback: '8-10 min pour répondre',
    color: 'from-green-400 to-emerald-500' 
  }
];
```

**APRÈS** (exemple : ajouter une 4ème stat) :
```tsx
const stats = [
  { 
    icon: Globe, 
    labelKey: 'hero.stat.countries',
    fallback: '27 pays européens',  // Texte modifié
    color: 'from-cyan-400 to-blue-500' 
  },
  { 
    icon: Users, 
    labelKey: 'hero.stat.agencies',
    fallback: '500+ agences ETT',  // Texte modifié
    color: 'from-violet-400 to-purple-500' 
  },
  { 
    icon: Clock, 
    labelKey: 'hero.stat.duration',
    fallback: '10 min pour répondre',  // Texte modifié
    color: 'from-green-400 to-emerald-500' 
  },
  { 
    icon: Award,  // Import : import { Award } from 'lucide-react'
    labelKey: 'hero.stat.missions',
    fallback: '2000+ missions réussies',  // Nouvelle stat
    color: 'from-yellow-400 to-orange-500' 
  }
];
```

**⚠️ Note** : Si vous ajoutez une 4ème stat, changez aussi la grille :
```tsx
className="grid md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto"  // 3 → 4
```

---

### 🔧 Exemple 5 : Modifier le bouton CTA

**AVANT** (lignes 117-127) :
```tsx
<Button
  onClick={onStart}
  size="lg"
  className="h-16 px-12 bg-white text-blue-900 hover:bg-cyan-50 rounded-full shadow-2xl hover:shadow-white/70 transition-all relative overflow-hidden group"
>
  <span className="relative z-10 flex items-center gap-3 text-lg">
    {getText('hero.cta.start', 'Commencer l\'enquête')}
    <ArrowRight className="w-6 h-6" />
  </span>
  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-200/40 to-transparent" />
</Button>
```

**APRÈS** (exemple : style différent) :
```tsx
<Button
  onClick={onStart}
  size="lg"
  className="h-20 px-16 bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-600 hover:to-violet-600 rounded-full shadow-2xl shadow-cyan-500/50 transition-all relative overflow-hidden group"
>
  <span className="relative z-10 flex items-center gap-3 text-xl font-bold">
    {getText('hero.cta.start', 'Démarrer maintenant')}  {/* Texte modifié */}
    <ArrowRight className="w-7 h-7" />
  </span>
  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
</Button>
```

---

### 🔧 Exemple 6 : Modifier le layout (disposition)

**Ajouter une image/illustration** :

```tsx
<div className="max-w-6xl mx-auto">  {/* max-w-5xl → max-w-6xl */}
  <div className="grid lg:grid-cols-2 gap-12 items-center">  {/* Nouveau : 2 colonnes */}
    
    {/* Colonne gauche : Texte */}
    <div className="text-center lg:text-left">
      {/* Badge */}
      <motion.div ...>
        ...badge...
      </motion.div>
      
      {/* Title */}
      <motion.h1 ...>
        ...titre...
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p ...>
        ...sous-titre...
      </motion.p>
      
      {/* CTA */}
      <motion.div ...>
        ...bouton...
      </motion.div>
      
      {/* Footer */}
      <motion.p ...>
        ...footer...
      </motion.p>
    </div>
    
    {/* Colonne droite : Stats cards */}
    <div className="grid gap-4">
      {stats.map((stat, index) => (
        ...cards...
      ))}
    </div>
    
  </div>
</div>
```

---

## 🌍 PARTIE 2 : Mettre à jour les traductions

### Option A : Modification directe dans `/data/hero-translations.ts` (RECOMMANDÉ)

Une fois que vous avez modifié les textes français dans `HeroSection.tsx`, mettez à jour les traductions.

**Fichier à éditer** : `/data/hero-translations.ts`

**Structure** :
```typescript
export const HERO_TRANSLATIONS: UITextTranslationData[] = [
  {
    textId: 'hero.badge',
    key: 'hero.badge',
    category: 'hero',
    translations: {
      fr: { text: 'Innovation RH en Europe', status: 'validated' },  // ✅ Nouveau texte français
      en: { text: 'HR Innovation in Europe', status: 'validated' },  // ✅ Nouvelle traduction anglaise
      de: { text: 'HR-Innovation in Europa', status: 'validated' },  // ✅ Nouvelle traduction allemande
      // ... 20 autres langues
    }
  },
  // ... autres clés
];
```

### 🔄 Workflow complet :

1. **Modifier `HeroSection.tsx`** avec les nouveaux textes français
2. **Modifier `hero-translations.ts`** avec les nouvelles traductions
3. **Aller sur le dashboard admin** (`?mode=admin`)
4. **Cliquer sur "Uploader Hero Section"** (bouton cyan)
5. ✅ **Les traductions sont déployées !**

---

### Option B : Utiliser Claude/ChatGPT pour les traductions (RAPIDE)

Si vous ne parlez pas les 23 langues, utilisez l'IA :

**Prompt pour Claude** :
```
Traduis ce texte dans les 23 langues européennes suivantes :
FR, EN, DE, ES, IT, NL, PL, PT, RO, BG, HU, CS, SK, EL, SV, DA, FI, NO, HR, SL, LT, LV, ET

Texte français : "Innovation RH en Europe"

Format de sortie :
fr: "Innovation RH en Europe"
en: "HR Innovation in Europe"
de: "HR-Innovation in Europa"
...
```

Ensuite, copiez-collez les traductions dans `hero-translations.ts`.

---

### Option C : Ajouter une nouvelle clé de traduction

Si vous ajoutez un **nouveau texte** (ex: une 4ème stat "2000+ missions"), vous devez :

1. **Ajouter dans `HeroSection.tsx`** :
```tsx
{ 
  icon: Award, 
  labelKey: 'hero.stat.missions',  // ✅ Nouvelle clé
  fallback: '2000+ missions réussies',
  color: 'from-yellow-400 to-orange-500' 
}
```

2. **Ajouter dans `hero-translations.ts`** :
```typescript
{
  textId: 'hero.stat.missions',
  key: 'hero.stat.missions',
  category: 'hero',
  translations: {
    fr: { text: '2000+ missions réussies', status: 'validated' },
    en: { text: '2000+ successful missions', status: 'validated' },
    de: { text: '2000+ erfolgreiche Einsätze', status: 'validated' },
    es: { text: '2000+ misiones exitosas', status: 'validated' },
    it: { text: '2000+ missioni riuscite', status: 'validated' },
    nl: { text: '2000+ succesvolle opdrachten', status: 'validated' },
    pl: { text: '2000+ udanych misji', status: 'validated' },
    pt: { text: '2000+ missões bem-sucedidas', status: 'validated' },
    ro: { text: '2000+ misiuni reușite', status: 'validated' },
    bg: { text: '2000+ успешни мисии', status: 'validated' },
    hu: { text: '2000+ sikeres küldetés', status: 'validated' },
    cs: { text: '2000+ úspěšných misí', status: 'validated' },
    sk: { text: '2000+ úspešných misií', status: 'validated' },
    el: { text: '2000+ επιτυχημένες αποστολές', status: 'validated' },
    sv: { text: '2000+ framgångsrika uppdrag', status: 'validated' },
    da: { text: '2000+ vellykkede missioner', status: 'validated' },
    fi: { text: '2000+ onnistunutta tehtävää', status: 'validated' },
    no: { text: '2000+ vellykkede oppdrag', status: 'validated' },
    hr: { text: '2000+ uspješnih misija', status: 'validated' },
    sl: { text: '2000+ uspešnih misij', status: 'validated' },
    lt: { text: '2000+ sėkmingų misijų', status: 'validated' },
    lv: { text: '2000+ veiksmīgas misijas', status: 'validated' },
    et: { text: '2000+ edukat missioonid', status: 'validated' }
  }
}
```

3. **Re-uploader** dans le dashboard

---

## 📊 PARTIE 3 : Vérifier les changements

### 1. Vérification visuelle en français
- Ouvrez l'application
- Vérifiez que les nouveaux textes français s'affichent correctement

### 2. Vérification des traductions
- Changez de langue (ex: Anglais, Allemand, Portugais)
- Vérifiez que les traductions s'affichent
- Si un texte reste en français → la clé de traduction est manquante dans `hero-translations.ts`

### 3. Vérification technique
- Ouvrez la console du navigateur (F12)
- Vérifiez qu'il n'y a pas d'erreurs
- Vérifiez que les animations fonctionnent

---

## 🚀 PARTIE 4 : Exemples de modifications courantes

### Exemple complet 1 : Changement de positionnement marketing

**Contexte** : Vous voulez passer de "Étude de marché" à "Rejoignez la révolution"

**Modifications** :

`/components/survey/HeroSection.tsx` :
```tsx
// Badge
{getText('hero.badge', '🚀 Rejoignez la révolution')}

// Titre
{getText('hero.title', 'Créons ensemble la marketplace européenne du recrutement')}

// Sous-titre
{getText('hero.subtitle', 'Votre expertise compte. 10 minutes pour façonner l\'avenir du recrutement transfrontalier.')}

// CTA
{getText('hero.cta.start', 'Je participe maintenant')}

// Footer
{getText('hero.footer.info', '20 questions • 100% confidentiel • Rapport exclusif offert')}
```

`/data/hero-translations.ts` :
```typescript
{
  textId: 'hero.badge',
  translations: {
    fr: { text: '🚀 Rejoignez la révolution', status: 'validated' },
    en: { text: '🚀 Join the revolution', status: 'validated' },
    de: { text: '🚀 Schließen Sie sich der Revolution an', status: 'validated' },
    // ...
  }
},
// ... répéter pour title, subtitle, cta.start, footer.info
```

---

### Exemple complet 2 : Ajouter un compte à rebours

**Objectif** : Afficher "Plus que 14 jours pour participer"

1. **Ajouter dans `HeroSection.tsx`** (après le badge) :
```tsx
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mb-6"
>
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/30">
    <Clock className="w-5 h-5 text-red-300" />
    <span className="text-red-200 text-sm font-medium">
      {getText('hero.countdown', 'Plus que 14 jours pour participer')}
    </span>
  </div>
</motion.div>
```

2. **Ajouter dans `hero-translations.ts`** :
```typescript
{
  textId: 'hero.countdown',
  key: 'hero.countdown',
  category: 'hero',
  translations: {
    fr: { text: 'Plus que 14 jours pour participer', status: 'validated' },
    en: { text: 'Only 14 days left to participate', status: 'validated' },
    de: { text: 'Nur noch 14 Tage zur Teilnahme', status: 'validated' },
    es: { text: 'Solo quedan 14 días para participar', status: 'validated' },
    it: { text: 'Solo 14 giorni per partecipare', status: 'validated' },
    nl: { text: 'Nog maar 14 dagen om deel te nemen', status: 'validated' },
    pl: { text: 'Zostało tylko 14 dni na udział', status: 'validated' },
    pt: { text: 'Apenas 14 dias para participar', status: 'validated' },
    ro: { text: 'Mai sunt doar 14 zile pentru a participa', status: 'validated' },
    bg: { text: 'Само 14 дни за участие', status: 'validated' },
    hu: { text: 'Csak 14 nap van hátra a részvételre', status: 'validated' },
    cs: { text: 'Zbývá jen 14 dní k účasti', status: 'validated' },
    sk: { text: 'Zostáva len 14 dní na účasť', status: 'validated' },
    el: { text: 'Μόνο 14 ημέρες για συμμετοχή', status: 'validated' },
    sv: { text: 'Bara 14 dagar kvar att delta', status: 'validated' },
    da: { text: 'Kun 14 dage tilbage til at deltage', status: 'validated' },
    fi: { text: 'Vain 14 päivää osallistua', status: 'validated' },
    no: { text: 'Bare 14 dager igjen til å delta', status: 'validated' },
    hr: { text: 'Samo 14 dana za sudjelovanje', status: 'validated' },
    sl: { text: 'Samo še 14 dni za sodelovanje', status: 'validated' },
    lt: { text: 'Liko tik 14 dienų dalyvauti', status: 'validated' },
    lv: { text: 'Tikai 14 dienas piedalīties', status: 'validated' },
    et: { text: 'Ainult 14 päeva osalemiseks', status: 'validated' }
  }
}
```

3. **Re-uploader** via le dashboard

---

## ✅ Checklist finale

Avant de déployer vos modifications :

- [ ] J'ai modifié les textes français dans `HeroSection.tsx`
- [ ] J'ai gardé les mêmes **clés de traduction** (`hero.badge`, `hero.title`, etc.)
- [ ] J'ai mis à jour `hero-translations.ts` avec les 23 langues
- [ ] J'ai testé visuellement en français
- [ ] J'ai uploadé via le dashboard admin
- [ ] J'ai testé dans au moins 3 langues différentes
- [ ] Les animations fonctionnent correctement
- [ ] Le responsive mobile fonctionne

---

## 🆘 Dépannage

### Problème 1 : "Le texte reste en français dans les autres langues"

**Cause** : La clé de traduction n'existe pas dans `hero-translations.ts`

**Solution** :
1. Vérifiez que la clé dans `HeroSection.tsx` correspond à celle dans `hero-translations.ts`
2. Re-uploadez les traductions via le dashboard

### Problème 2 : "Les traductions ne s'appliquent pas après l'upload"

**Cause** : Cache du navigateur

**Solution** :
1. Videz le cache (Ctrl+Shift+R ou Cmd+Shift+R)
2. Ou ouvrez en navigation privée

### Problème 3 : "Erreur lors de l'upload"

**Cause** : Format incorrect dans `hero-translations.ts`

**Solution** :
1. Vérifiez que toutes les 23 langues sont présentes
2. Vérifiez la syntaxe TypeScript (virgules, accolades)
3. Consultez les logs dans la console

---

## 📚 Ressources

- **Code Hero Section** : `/components/survey/HeroSection.tsx`
- **Traductions Hero** : `/data/hero-translations.ts`
- **Dashboard Admin** : Ajoutez `?mode=admin` à l'URL
- **Composant Upload** : `/components/dashboard/UploadHeroTranslations.tsx`

---

**Dernière mise à jour** : Décembre 2024
**Version** : 1.0
