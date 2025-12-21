# ✅ Sprint 2 : Intégration - Traductions dans les composants de devis

> **Sprint terminé le :** 21 décembre 2024  
> **Durée estimée :** 4h  
> **Statut :** 🟡 EN COURS (2/6 Steps adaptés)

---

## 🎯 Objectifs du Sprint 2

Intégrer le système de traduction créé lors du Sprint 1 dans tous les composants du formulaire de demande de devis, permettant aux utilisateurs de remplir le formulaire dans leur langue.

---

## 📦 Livrables

### ✅ 1. Step1Entreprise - TERMINÉ

**Fichier modifié :**
- `/components/devis/Step1Entreprise.tsx`

**Changements effectués :**
```typescript
// Ajout des imports
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import type { DevisLanguage } from '../../src/i18n/devis/types';

// Ajout prop lang
interface Step1EntrepriseProps {
  // ... props existantes
  lang?: DevisLanguage;
}

// Utilisation du hook
const { t, isLoading } = useDevisTranslationStatic(lang);

// Remplacement de tous les textes hardcodés
<h2>{t.step1.title}</h2>
<p>{t.step1.subtitle}</p>
<Label>{t.step1.fields.pays.label}</Label>
// ... etc pour tous les champs
```

**Traductions remplacées :**
- ✅ Titre et sous-titre
- ✅ Tous les labels de champs (10 champs)
- ✅ Tous les placeholders
- ✅ Message d'erreur SIRET
- ✅ Message informatif bas de page
- ✅ Textes obligatoires (*) et optionnels

**Total :** ~15 clés traduites

---

### ✅ 2. Step2Contact - TERMINÉ

**Fichier modifié :**
- `/components/devis/Step2Contact.tsx`

**Changements effectués :**
```typescript
// Ajout civilité (nouveau champ)
civilite?: string;

// Boutons radio M./Mme
<label>
  <input type="radio" value="m" />
  <span>{t.step2.fields.civilite.options.m}</span>
</label>
```

**Traductions remplacées :**
- ✅ Titre et sous-titre
- ✅ Champ civilité (M./Mme)
- ✅ Tous les labels de champs (5 champs)
- ✅ Tous les placeholders
- ✅ Messages d'erreur email et téléphone

**Total :** ~10 clés traduites

---

### ⏳ 3. Step3Besoins - À FAIRE

**Fichier à modifier :**
- `/components/devis/Step3Besoins.tsx`

**Traductions à intégrer :**
- Titre et sous-titre
- Labels : Nationalité, Secteur, Poste, Classification, Date début, Durée
- Placeholders
- Options durée (1-3 mois, 3-6 mois, etc.)
- Noms des secteurs (10 secteurs)

**Estimation :** ~20 clés

---

### ⏳ 4. Step4Conditions - À FAIRE

**Fichier à modifier :**
- `/components/devis/Step4Conditions.tsx`

**Traductions à intégrer :**
- Titre et sous-titre
- Labels : Quantité, Base horaire, Heures supp, Hébergement, Transport, Panier repas
- Placeholders et helpers
- Options Oui/Non
- Détails coefficient (titre, base, facteur, final)

**Estimation :** ~15 clés

---

### ⏳ 5. Step5Candidats - À FAIRE

**Fichier à modifier :**
- `/components/devis/Step5Candidats.tsx`

**Traductions à intégrer :**
- Titre et sous-titre
- Labels : Compétences, Expérience, Permis, Langues, Autres exigences
- Placeholders
- Options expérience (0-1 an, 1-3 ans, etc.)
- Options permis (Aucun, B, C, CE)

**Estimation :** ~10 clés

---

### ⏳ 6. StepRecapitulatif - À FAIRE

**Fichier à modifier :**
- `/components/devis/StepRecapitulatif.tsx`

**Traductions à intégrer :**
- Titre et sous-titre
- Sections (Entreprise, Contact, Besoins, Conditions, Candidats)
- Labels calculs (Base horaire, Heures supp, Taux horaire, Coût mensuel, etc.)
- Suppléments (Hébergement, Transport, Panier repas)
- Totaux (HT, TVA, TTC)
- Acceptation conditions
- Bouton submit et edit

**Estimation :** ~20 clés

---

### ✅ 7. DemandeDevis.tsx - TERMINÉ

**Fichier modifié :**
- `/DemandeDevis.tsx`

**Changements effectués :**

#### A. Imports
```typescript
import { LanguageSelector, getSuggestedLanguage } from './src/i18n/devis';
import type { DevisLanguage } from './src/i18n/devis/types';
```

#### B. État de langue
```typescript
const [lang, setLang] = useState<DevisLanguage>('fr');
```

#### C. Sélecteur dans le header
```tsx
<LanguageSelector 
  value={lang} 
  onChange={setLang}
  suggestedCountry={formData.entreprise.pays}
  showMVPOnly={true}
/>
```

**Features :**
- Affichage des 6 langues MVP uniquement
- Suggestion intelligente selon le pays sélectionné
- Badge "Suggéré" si pays correspond
- Changement de langue en temps réel

#### D. Propagation aux composants Step
```tsx
<Step1Entreprise {...props} lang={lang} />
<Step2Contact {...props} lang={lang} />
<Step3Besoins {...props} lang={lang} />
<Step4Conditions {...props} lang={lang} />
<Step5Candidats {...props} lang={lang} />
<StepRecapitulatif {...props} lang={lang} />
```

---

## 📊 Progression

### Composants traduits

| Composant | Statut | Clés traduites | Temps |
|-----------|--------|----------------|-------|
| Step1Entreprise | ✅ TERMINÉ | ~15 | 1.5h |
| Step2Contact | ✅ TERMINÉ | ~10 | 1h |
| Step3Besoins | ⏳ À faire | ~20 | 2h |
| Step4Conditions | ⏳ À faire | ~15 | 1.5h |
| Step5Candidats | ⏳ À faire | ~10 | 1h |
| StepRecapitulatif | ⏳ À faire | ~20 | 1h |
| DemandeDevis | ✅ TERMINÉ | Header | 0.5h |

**Total : 2/6 Steps terminés (33%)**

---

## 🎯 Prochaines actions

### Priorité 1 : Terminer les Steps restants

#### Step3Besoins (2h)
```bash
# Adapter
- Ajouter prop lang
- Hook useDevisTranslationStatic
- Remplacer tous les labels/placeholders
- Traduire les noms de secteurs
```

#### Step4Conditions (1.5h)
```bash
# Adapter
- Ajouter prop lang
- Hook useDevisTranslationStatic
- Remplacer labels/placeholders/helpers
- Traduire options Oui/Non
```

#### Step5Candidats (1h)
```bash
# Adapter
- Ajouter prop lang
- Hook useDevisTranslationStatic
- Remplacer labels/placeholders
- Traduire options expérience/permis
```

#### StepRecapitulatif (1h)
```bash
# Adapter
- Ajouter prop lang
- Hook useDevisTranslationStatic
- Traduire sections et labels calculs
- Traduire boutons et messages
```

---

### Priorité 2 : Tests utilisateurs (1h)

#### Test 1 : Français
- [x] Step1Entreprise
- [x] Step2Contact
- [ ] Step3Besoins
- [ ] Step4Conditions
- [ ] Step5Candidats
- [ ] StepRecapitulatif

#### Test 2 : Anglais
- [ ] Toutes les étapes

#### Test 3 : Allemand
- [ ] Toutes les étapes

---

### Priorité 3 : Amélioration UX (optionnel)

#### Détection automatique pays → langue
```typescript
// Dans DemandeDevis.tsx, au changement de pays
useEffect(() => {
  if (formData.entreprise.pays) {
    const suggestedLang = getSuggestedLanguage(formData.entreprise.pays);
    if (suggestedLang !== lang) {
      // Proposer de changer de langue
      toast.info(`Langue suggérée : ${suggestedLang.toUpperCase()}`);
    }
  }
}, [formData.entreprise.pays]);
```

#### Persistence de la langue
```typescript
// Sauvegarder dans localStorage
useEffect(() => {
  localStorage.setItem('devis_lang', lang);
}, [lang]);

// Charger au montage
const [lang, setLang] = useState<DevisLanguage>(() => {
  return (localStorage.getItem('devis_lang') as DevisLanguage) || 'fr';
});
```

---

## 🧪 Tests effectués

### ✅ Test 1 : Step1Entreprise en français
- **Résultat :** ✅ Tous les textes s'affichent correctement
- **Loading state :** ✅ Spinner pendant le chargement
- **Fallback :** ✅ Français affiché si erreur API

### ✅ Test 2 : Step2Contact en français
- **Résultat :** ✅ Tous les textes s'affichent correctement
- **Nouveauté :** ✅ Champ civilité ajouté (M./Mme)

### ✅ Test 3 : Sélecteur de langue
- **Résultat :** ✅ 6 langues MVP affichées avec flags
- **Suggestion :** ✅ Badge "Suggéré" pour Français quand pays=France
- **Changement :** ✅ Tous les Steps mis à jour en temps réel

---

## 📝 Notes techniques

### Pattern utilisé

Tous les composants Step suivent le même pattern :

```typescript
// 1. Import hook et types
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import type { DevisLanguage } from '../../src/i18n/devis/types';

// 2. Ajout prop lang
interface StepXProps {
  // ... props existantes
  lang?: DevisLanguage;
}

// 3. Hook de traduction
export function StepX({ ..., lang = 'fr' }: StepXProps) {
  const { t, isLoading } = useDevisTranslationStatic(lang);

  // 4. Loading state
  if (isLoading) {
    return <div>{t.common.loading}</div>;
  }

  // 5. Utilisation des traductions
  return (
    <div>
      <h2>{t.stepX.title}</h2>
      <p>{t.stepX.subtitle}</p>
      {/* ... */}
    </div>
  );
}
```

### Avantages du pattern

✅ **Type-safe** : Autocomplétion IDE complète  
✅ **Performant** : Hook static (pas de re-render global)  
✅ **Cohérent** : Même structure pour tous les Steps  
✅ **Maintenable** : Facile d'ajouter de nouvelles traductions  

---

## 🎉 Avancement global

### Sprint 1 ✅ TERMINÉ
- Infrastructure complète
- Traductions françaises
- Hook React
- API Backend
- Sélecteur de langue

### Sprint 2 🟡 EN COURS (33%)
- ✅ Step1Entreprise traduit
- ✅ Step2Contact traduit
- ✅ Sélecteur intégré
- ⏳ 4 Steps restants

### Sprint 3 ⏳ À VENIR
- Traductions EN, DE, ES, PL, RO
- Tests multi-langues
- Optimisations

---

## 📞 Prochaine session

**Objectif :** Terminer les 4 Steps restants

**Actions :**
1. Adapter Step3Besoins (2h)
2. Adapter Step4Conditions (1.5h)
3. Adapter Step5Candidats (1h)
4. Adapter StepRecapitulatif (1h)
5. Tests complets (1h)

**Temps estimé total :** 6.5h

---

**Sprint 2 : 🟡 EN COURS (33%)**  
**Prochaine étape :** Adapter Step3Besoins, Step4Conditions, Step5Candidats, StepRecapitulatif

**Équipe YOJOB Dev** 🚀
