# 📝 Template : Ajouter une nouvelle traduction

## Quand utiliser ce template ?

Utilisez ce template quand vous ajoutez un **nouveau texte** dans la Hero Section qui nécessite une traduction.

Exemples :
- Vous ajoutez un bandeau "Offre limitée"
- Vous ajoutez une 4ème statistique
- Vous ajoutez un sous-texte sous le bouton

---

## ÉTAPE 1 : Template TypeScript vide

Copiez-collez ce template dans `/data/hero-translations.ts` :

```typescript
{
  textId: 'hero.VOTRE_CLE_ICI',  // Ex: hero.limited.offer
  key: 'hero.VOTRE_CLE_ICI',
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

## ÉTAPE 2 : Remplir le texte français

1. **Choisissez une clé** unique (ex: `hero.limited.offer`)
2. **Écrivez le texte français** dans `fr: { text: 'ICI' }`

Exemple :
```typescript
{
  textId: 'hero.limited.offer',
  key: 'hero.limited.offer',
  category: 'hero',
  translations: {
    fr: { text: 'Offre limitée : Participez avant le 31 décembre', status: 'validated' },
    en: { text: '', status: 'validated' },
    // ... reste vide pour l'instant
  }
}
```

---

## ÉTAPE 3 : Générer les traductions avec Claude/ChatGPT

### Prompt recommandé pour Claude

```
Traduis ce texte français dans les 22 langues européennes suivantes :
EN, DE, ES, IT, NL, PL, PT, RO, BG, HU, CS, SK, EL, SV, DA, FI, NO, HR, SL, LT, LV, ET

Texte français : "Offre limitée : Participez avant le 31 décembre"

Contexte : C'est un badge d'urgence sur une page d'accueil d'enquête de marché.

Format de sortie (copier-coller direct) :
en: { text: 'TRADUCTION_ICI', status: 'validated' },
de: { text: 'TRADUCTION_ICI', status: 'validated' },
...

Garde le même niveau de formalité (professionnel mais engageant).
```

### Exemple de réponse de Claude

```typescript
en: { text: 'Limited offer: Participate before December 31st', status: 'validated' },
de: { text: 'Begrenztes Angebot: Teilnahme bis 31. Dezember', status: 'validated' },
es: { text: 'Oferta limitada: Participe antes del 31 de diciembre', status: 'validated' },
it: { text: 'Offerta limitata: Partecipate entro il 31 dicembre', status: 'validated' },
nl: { text: 'Beperkte aanbieding: Neem deel vóór 31 december', status: 'validated' },
pl: { text: 'Oferta limitowana: Weź udział przed 31 grudnia', status: 'validated' },
pt: { text: 'Oferta limitada: Participe antes de 31 de dezembro', status: 'validated' },
ro: { text: 'Ofertă limitată: Participați înainte de 31 decembrie', status: 'validated' },
bg: { text: 'Ограничена оферта: Участвайте преди 31 декември', status: 'validated' },
hu: { text: 'Korlátozott ajánlat: Vegyél részt december 31. előtt', status: 'validated' },
cs: { text: 'Omezená nabídka: Zúčastněte se před 31. prosincem', status: 'validated' },
sk: { text: 'Obmedzená ponuka: Zúčastnite sa pred 31. decembrom', status: 'validated' },
el: { text: 'Περιορισμένη προσφορά: Συμμετάσχετε πριν τις 31 Δεκεμβρίου', status: 'validated' },
sv: { text: 'Begränsat erbjudande: Delta innan 31 december', status: 'validated' },
da: { text: 'Begrænset tilbud: Deltag inden 31. december', status: 'validated' },
fi: { text: 'Rajoitettu tarjous: Osallistu ennen 31. joulukuuta', status: 'validated' },
no: { text: 'Begrenset tilbud: Delta før 31. desember', status: 'validated' },
hr: { text: 'Ograničena ponuda: Sudjelujte prije 31. prosinca', status: 'validated' },
sl: { text: 'Omejena ponudba: Sodelujte pred 31. decembrom', status: 'validated' },
lt: { text: 'Ribota pasiūla: Dalyvaukite iki gruodžio 31 d.', status: 'validated' },
lv: { text: 'Ierobežots piedāvājums: Piedalieties līdz 31. decembrim', status: 'validated' },
et: { text: 'Piiratud pakkumine: Osalege enne 31. detsembrit', status: 'validated' },
```

---

## ÉTAPE 4 : Copier-coller dans votre template

Remplacez les lignes vides par les traductions générées :

```typescript
{
  textId: 'hero.limited.offer',
  key: 'hero.limited.offer',
  category: 'hero',
  translations: {
    fr: { text: 'Offre limitée : Participez avant le 31 décembre', status: 'validated' },
    en: { text: 'Limited offer: Participate before December 31st', status: 'validated' },
    de: { text: 'Begrenztes Angebot: Teilnahme bis 31. Dezember', status: 'validated' },
    es: { text: 'Oferta limitada: Participe antes del 31 de diciembre', status: 'validated' },
    it: { text: 'Offerta limitata: Partecipate entro il 31 dicembre', status: 'validated' },
    nl: { text: 'Beperkte aanbieding: Neem deel vóór 31 december', status: 'validated' },
    pl: { text: 'Oferta limitowana: Weź udział przed 31 grudnia', status: 'validated' },
    pt: { text: 'Oferta limitada: Participe antes de 31 de dezembro', status: 'validated' },
    ro: { text: 'Ofertă limitată: Participați înainte de 31 decembrie', status: 'validated' },
    bg: { text: 'Ограничена оферта: Участвайте преди 31 декември', status: 'validated' },
    hu: { text: 'Korlátozott ajánlat: Vegyél részt december 31. előtt', status: 'validated' },
    cs: { text: 'Omezená nabídka: Zúčastněte se před 31. prosincem', status: 'validated' },
    sk: { text: 'Obmedzená ponuka: Zúčastnite sa pred 31. decembrom', status: 'validated' },
    el: { text: 'Περιορισμένη προσφορά: Συμμετάσχετε πριν τις 31 Δεκεμβρίου', status: 'validated' },
    sv: { text: 'Begränsat erbjudande: Delta innan 31 december', status: 'validated' },
    da: { text: 'Begrænset tilbud: Deltag inden 31. december', status: 'validated' },
    fi: { text: 'Rajoitettu tarjous: Osallistu ennen 31. joulukuuta', status: 'validated' },
    no: { text: 'Begrenset tilbud: Delta før 31. desember', status: 'validated' },
    hr: { text: 'Ograničena ponuda: Sudjelujte prije 31. prosinca', status: 'validated' },
    sl: { text: 'Omejena ponudba: Sodelujte pred 31. decembrom', status: 'validated' },
    lt: { text: 'Ribota pasiūla: Dalyvaukite iki gruodžio 31 d.', status: 'validated' },
    lv: { text: 'Ierobežots piedāvājums: Piedalieties līdz 31. decembrim', status: 'validated' },
    et: { text: 'Piiratud pakkumine: Osalege enne 31. detsembrit', status: 'validated' }
  }
}
```

---

## ÉTAPE 5 : Utiliser dans le composant React

Dans `/components/survey/HeroSection.tsx`, ajoutez où vous voulez :

```tsx
<div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30">
  <Clock className="w-5 h-5 text-red-300" />
  <span className="text-red-200 text-sm font-medium">
    {getText('hero.limited.offer', 'Offre limitée : Participez avant le 31 décembre')}
  </span>
</div>
```

---

## ÉTAPE 6 : Uploader dans le dashboard

1. Sauvegardez `/data/hero-translations.ts`
2. Allez sur `?mode=admin`
3. Cliquez sur **"Uploader Hero Section"**
4. Attendez la confirmation
5. Testez dans plusieurs langues

---

## 🎯 EXEMPLES D'UTILISATION

### Exemple 1 : Badge "Nouveauté 2025"

**Clé** : `hero.new.badge`

**Prompt Claude** :
```
Traduis "🎉 Nouveauté 2025" dans les 22 langues européennes.
Contexte : Badge sur une page d'accueil.
Format : en: { text: '...', status: 'validated' },
```

**Utilisation dans React** :
```tsx
<span>{getText('hero.new.badge', '🎉 Nouveauté 2025')}</span>
```

---

### Exemple 2 : Sous-texte explicatif

**Clé** : `hero.privacy.note`

**Prompt Claude** :
```
Traduis "Vos données sont 100% confidentielles et ne seront jamais partagées" dans les 22 langues européennes.
Contexte : Note de confidentialité sous un formulaire.
Ton : Rassurant et professionnel.
Format : en: { text: '...', status: 'validated' },
```

**Utilisation dans React** :
```tsx
<p className="text-xs text-white/50 mt-2">
  {getText('hero.privacy.note', 'Vos données sont 100% confidentielles et ne seront jamais partagées')}
</p>
```

---

### Exemple 3 : Message d'urgence

**Clé** : `hero.urgency.message`

**Prompt Claude** :
```
Traduis "⏰ Plus que 48 heures pour participer et recevoir votre rapport gratuit" dans les 22 langues européennes.
Contexte : Message d'urgence marketing.
Ton : Urgent mais pas agressif.
Format : en: { text: '...', status: 'validated' },
```

**Utilisation dans React** :
```tsx
<div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 mb-4">
  <p className="text-yellow-200 text-sm font-medium">
    {getText('hero.urgency.message', '⏰ Plus que 48 heures pour participer et recevoir votre rapport gratuit')}
  </p>
</div>
```

---

## ✅ CHECKLIST

Avant d'ajouter une nouvelle traduction :

- [ ] J'ai choisi une clé unique et descriptive (format : `hero.categorie.element`)
- [ ] J'ai écrit le texte français original
- [ ] J'ai utilisé Claude/ChatGPT pour générer les 22 traductions
- [ ] J'ai vérifié la syntaxe TypeScript (virgules, accolades)
- [ ] J'ai ajouté le texte dans le composant React avec `getText()`
- [ ] J'ai uploadé via le dashboard admin
- [ ] J'ai testé dans au moins 3 langues

---

## 🔍 CONVENTIONS DE NOMMAGE

### Format des clés

```
hero.{categorie}.{element}
```

### Catégories recommandées

- `hero.badge.*` - Badges et labels
- `hero.title.*` - Titres et sous-titres
- `hero.stat.*` - Statistiques
- `hero.cta.*` - Call-to-action
- `hero.footer.*` - Textes de bas de page
- `hero.urgency.*` - Messages d'urgence
- `hero.privacy.*` - Messages de confidentialité
- `hero.social.*` - Preuves sociales

### Exemples

```typescript
hero.badge.main          // Badge principal
hero.badge.new           // Badge "Nouveauté"
hero.badge.limited       // Badge "Offre limitée"

hero.title.main          // Titre principal
hero.title.secondary     // Sous-titre

hero.stat.countries      // Stat pays
hero.stat.agencies       // Stat agences
hero.stat.time           // Stat temps

hero.cta.primary         // Bouton principal
hero.cta.secondary       // Bouton secondaire

hero.footer.gdpr         // Note RGPD
hero.footer.privacy      // Note confidentialité
```

---

**💡 Astuce** : Gardez ce template à portée de main pour ajouter rapidement de nouvelles traductions !
