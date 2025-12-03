# ⚡ AIDE-MÉMOIRE RAPIDE - Modifications Hero Section

## 📝 Modifier un texte existant (3 étapes)

### 1️⃣ Fichier : `/components/survey/HeroSection.tsx`
```tsx
{getText('hero.badge', 'NOUVEAU TEXTE FRANÇAIS')}
```

### 2️⃣ Fichier : `/data/hero-translations.ts`
```typescript
{
  textId: 'hero.badge',
  translations: {
    fr: { text: 'NOUVEAU TEXTE FRANÇAIS', status: 'validated' },
    en: { text: 'NEW ENGLISH TEXT', status: 'validated' },
    // ... 21 autres langues
  }
}
```

### 3️⃣ Dashboard : `?mode=admin`
Cliquer sur **"Uploader Hero Section"** (card cyan)

---

## ➕ Ajouter un nouveau texte (4 étapes)

### 1️⃣ Dans `HeroSection.tsx`
```tsx
<div>
  {getText('hero.MA_NOUVELLE_CLE', 'Mon nouveau texte français')}
</div>
```

### 2️⃣ Dans `hero-translations.ts` (ajouter)
```typescript
{
  textId: 'hero.MA_NOUVELLE_CLE',
  key: 'hero.MA_NOUVELLE_CLE',
  category: 'hero',
  translations: {
    fr: { text: 'Mon nouveau texte français', status: 'validated' },
    en: { text: '', status: 'validated' },
    // ... copier le template complet
  }
}
```

### 3️⃣ Générer traductions avec Claude
```
Traduis "Mon nouveau texte français" dans les 22 langues :
EN, DE, ES, IT, NL, PL, PT, RO, BG, HU, CS, SK, EL, SV, DA, FI, NO, HR, SL, LT, LV, ET

Format : en: { text: '...', status: 'validated' },
```

### 4️⃣ Upload dashboard
`?mode=admin` → "Uploader Hero Section"

---

## 🎨 Modifier le design (CSS seulement)

### Pas de traduction nécessaire ✅

Modifiez uniquement les `className` dans `HeroSection.tsx` :

```tsx
// AVANT
className="text-white mb-6"

// APRÈS
className="text-cyan-100 mb-8 font-bold"
```

Testez directement (Ctrl+Shift+R pour vider le cache).

---

## 🗂️ Fichiers clés

| Fichier | Quoi modifier |
|---------|---------------|
| `/components/survey/HeroSection.tsx` | Textes FR, layout, CSS |
| `/data/hero-translations.ts` | Traductions 23 langues |
| `/GUIDE-MODIFICATION-HERO.md` | Guide complet |
| `/EXEMPLE-MODIFICATION-HERO.md` | Exemple pas-à-pas |
| `/TEMPLATE-NOUVELLE-TRADUCTION.md` | Template pour nouveau texte |

---

## 🔑 Clés de traduction existantes

```typescript
hero.badge                // Badge principal
hero.title                // Titre H1
hero.subtitle             // Sous-titre
hero.stat.countries       // "27 pays couverts"
hero.stat.agencies        // "500+ agences partenaires"
hero.stat.duration        // "8-10 min pour répondre"
hero.cta.start            // "Commencer l'enquête"
hero.footer.info          // "25 questions • Anonyme • RGPD"
```

---

## ✅ Checklist ultra-rapide

- [ ] Modifié `HeroSection.tsx` avec nouveau texte FR
- [ ] Modifié `hero-translations.ts` avec 23 langues
- [ ] Uploadé via dashboard (`?mode=admin`)
- [ ] Testé en FR, EN, et 1 autre langue

---

## 🚨 Dépannage rapide

| Problème | Solution |
|----------|----------|
| Texte ne change pas | `Ctrl+Shift+R` (vider cache) |
| Traductions ne marchent pas | Re-uploader via dashboard |
| Erreur syntaxe | Vérifier virgules dans `.ts` |
| Upload échoue | F12 → Console → Voir erreur |

---

## 🎯 Prompt Claude pour traductions

```
Traduis "VOTRE TEXTE ICI" dans les 22 langues européennes :
EN, DE, ES, IT, NL, PL, PT, RO, BG, HU, CS, SK, EL, SV, DA, FI, NO, HR, SL, LT, LV, ET

Contexte : [Description du contexte]
Ton : [Professionnel / Engageant / Urgent]

Format de sortie (copier-coller direct) :
en: { text: '...', status: 'validated' },
de: { text: '...', status: 'validated' },
...
```

---

## 📊 Template complet nouvelle traduction

```typescript
{
  textId: 'hero.MA_CLE',
  key: 'hero.MA_CLE',
  category: 'hero',
  translations: {
    fr: { text: '', status: 'validated' },
    en: { text: '', status: 'validated' },
    de: { text: '', status: 'validated' },
    es: { text: '', status: 'validated' },
    it: { text: '', status: 'validated' },
    nl: { text: '', status: 'validated' },
    pl: { text: '', status: 'validated' },
    pt: { text: '', status: 'validated' },
    ro: { text: '', status: 'validated' },
    bg: { text: '', status: 'validated' },
    hu: { text: '', status: 'validated' },
    cs: { text: '', status: 'validated' },
    sk: { text: '', status: 'validated' },
    el: { text: '', status: 'validated' },
    sv: { text: '', status: 'validated' },
    da: { text: '', status: 'validated' },
    fi: { text: '', status: 'validated' },
    no: { text: '', status: 'validated' },
    hr: { text: '', status: 'validated' },
    sl: { text: '', status: 'validated' },
    lt: { text: '', status: 'validated' },
    lv: { text: '', status: 'validated' },
    et: { text: '', status: 'validated' }
  }
}
```

---

**💾 Sauvegarde ce fichier pour référence rapide !**
