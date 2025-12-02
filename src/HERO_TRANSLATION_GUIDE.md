# 🌍 Guide de traduction du Hero Section

## ✅ Modifications effectuées

### 1. Fichier de traductions créé
📄 `/public/form-page-texts-hero.json`

Ce fichier contient **15 textes UI** au total :
- 7 textes existants (formulaire, progression)
- **8 nouveaux textes pour le Hero Section**

### 2. Nouveaux textes Hero ajoutés

| ID | Catégorie | Utilisation | Exemple FR |
|---|---|---|---|
| `hero.badge` | hero | Badge en haut de page | "Étude de marché européenne" |
| `hero.title` | hero | Titre principal H1 | "Participez à l'avenir du détachement européen" |
| `hero.subtitle` | hero | Description sous le titre | "Votre avis façonne YoJob. 8 minutes pour..." |
| `hero.stat.countries` | hero | Card statistique 1 | "27 pays couverts" |
| `hero.stat.agencies` | hero | Card statistique 2 | "500+ agences partenaires" |
| `hero.stat.duration` | hero | Card statistique 3 | "8-10 min pour répondre" |
| `hero.cta.start` | hero | Bouton principal | "Commencer l'enquête" |
| `hero.footer.info` | hero | Info RGPD en bas | "25 questions • Anonyme • Conforme RGPD" |

### 3. Composant HeroSection modifié
📄 `/components/survey/HeroSection.tsx`

Le composant utilise maintenant le hook `useI18n()` pour afficher les textes traduits :

```tsx
import { useI18n } from '../../hooks/useI18n';

export function HeroSection({ onStart }: HeroSectionProps) {
  const { t } = useI18n();
  
  // Utilisation :
  <span>{t('hero.badge')}</span>
  <h1>{t('hero.title')}</h1>
  <p>{t('hero.subtitle')}</p>
  // etc.
}
```

### 4. Composant d'import créé
📄 `/components/dashboard/ImportHeroTexts.tsx`

Un nouveau composant dans le dashboard permet d'importer facilement les 8 nouveaux textes Hero.

---

## 🚀 Comment importer les traductions

### Méthode 1 : Via le Dashboard (Recommandé)

1. **Accédez au dashboard** :
   - Cliquez sur "Dashboard" dans le header de l'application
   - Connectez-vous avec : `a.auger@yojob.fr` / `Adeole@33700`

2. **Allez dans Traductions** :
   - Cliquez sur l'onglet "Traductions"
   - Cliquez sur "📝 Textes d'interface (UI)"

3. **Importez les textes Hero** :
   - En haut de la page, vous verrez une card "Import Hero Section Translations"
   - Cliquez sur le bouton **"Import Hero Texts"**
   - Attendez la confirmation ✅

4. **Vérification** :
   - Le compteur passera de "7 textes UI chargés" à **"15 textes UI chargés"**
   - Vous pouvez filtrer par catégorie "hero" pour voir les nouveaux textes

### Méthode 2 : Import JSON manuel

Si vous préférez un import complet :

1. Allez dans l'onglet "Traductions" du dashboard
2. Utilisez la fonction d'import existante
3. Sélectionnez le fichier `/public/form-page-texts-hero.json`
4. Validez l'import

---

## 🎨 Langues supportées

Les 8 nouveaux textes Hero sont traduits dans **8 langues européennes** :

- 🇫🇷 Français (fr)
- 🇬🇧 Anglais (en)
- 🇩🇪 Allemand (de)
- 🇪🇸 Espagnol (es)
- 🇮🇹 Italien (it)
- 🇳🇱 Néerlandais (nl)
- 🇵🇱 Polonais (pl)
- 🇵🇹 Portugais (pt)

---

## 🧪 Test du système de traduction

### Test 1 : Changement de langue sur la page d'accueil

1. Ouvrez l'application (page d'accueil avec Hero Section)
2. Dans le header, utilisez le **sélecteur de langue** (FR/EN/DE/etc.)
3. **Vérifiez** que tous les textes changent instantanément :
   - Badge "📊 Étude de marché européenne"
   - Titre principal
   - Description
   - Les 3 cards de statistiques
   - Le bouton "Commencer l'enquête"
   - Le footer "25 questions • Anonyme • Conforme RGPD"

### Test 2 : Langue persistante

1. Changez la langue en **Allemand** (DE)
2. Rafraîchissez la page (F5)
3. **Vérifiez** que la langue reste en Allemand

### Test 3 : Navigation interne

1. Sur la page d'accueil en **Anglais**, cliquez sur "Start the survey"
2. **Vérifiez** que les sections du formulaire restent en Anglais
3. Revenez à la page d'accueil (logo YOJOB)
4. **Vérifiez** que le Hero reste en Anglais

---

## 📋 Détail des traductions

### Badge (hero.badge)
```json
{
  "fr": "Étude de marché européenne",
  "en": "European Market Study",
  "de": "Europäische Marktstudie",
  "es": "Estudio de mercado europeo",
  "it": "Studio di mercato europeo",
  "nl": "Europese marktstudie",
  "pl": "Europejskie badanie rynku",
  "pt": "Estudo de mercado europeu"
}
```

### Titre (hero.title)
```json
{
  "fr": "Participez à l'avenir du détachement européen",
  "en": "Participate in the future of European secondment",
  "de": "Beteiligen Sie sich an der Zukunft der europäischen Entsendung",
  "es": "Participe en el futuro del desplazamiento europeo",
  "it": "Partecipate al futuro del distacco europeo",
  "nl": "Neem deel aan de toekomst van Europese detachering",
  "pl": "Weź udział w przyszłości europejskiego delegowania",
  "pt": "Participe no futuro do destacamento europeu"
}
```

### Sous-titre (hero.subtitle)
```json
{
  "fr": "Votre avis façonne YoJob. 8 minutes pour transformer votre quotidien administratif.",
  "en": "Your opinion shapes YoJob. 8 minutes to transform your administrative daily life.",
  "de": "Ihre Meinung formt YoJob. 8 Minuten, um Ihren Verwaltungsalltag zu transformieren.",
  "es": "Su opinión da forma a YoJob. 8 minutos para transformar su rutina administrativa.",
  "it": "La vostra opinione plasma YoJob. 8 minuti per trasformare il vostro quotidiano amministrativo.",
  "nl": "Uw mening vormt YoJob. 8 minuten om uw administratieve dagelijkse leven te transformeren.",
  "pl": "Twoja opinia kształtuje YoJob. 8 minut, aby zmienić codzienność administracyjną.",
  "pt": "A sua opinião molda YoJob. 8 minutos para transformar o seu dia-a-dia administrativo."
}
```

---

## 🔧 Maintenance et ajout de langues

### Ajouter une nouvelle langue au Hero

1. Éditez `/public/form-page-texts-hero.json`
2. Ajoutez la langue dans chaque objet `translations`
3. Réimportez le fichier via le dashboard

Exemple pour ajouter le Tchèque (cs) :

```json
{
  "textId": "hero.badge",
  "translations": {
    "fr": { "text": "...", "status": "validated" },
    "cs": { "text": "Evropská tržní studie", "status": "validated" }
  }
}
```

### Modifier un texte existant

1. Dans le dashboard, allez dans "Textes d'interface"
2. Filtrez par catégorie "hero"
3. Cliquez sur "Éditer" à côté du texte
4. Modifiez le texte pour la langue souhaitée
5. Sauvegardez

---

## ✅ Checklist de vérification

Après l'import, vérifiez que :

- [ ] Les 8 nouveaux textes Hero apparaissent dans le dashboard
- [ ] La catégorie "hero" existe dans le filtre de catégories
- [ ] Le changement de langue fonctionne sur la page d'accueil
- [ ] Les textes s'affichent correctement dans les 8 langues
- [ ] La langue sélectionnée persiste après rafraîchissement
- [ ] Aucune erreur dans la console du navigateur

---

## 🐛 Dépannage

### "Les textes ne changent pas de langue"

1. Vérifiez que l'import a bien fonctionné (compteur = 15 textes)
2. Ouvrez la console du navigateur (F12)
3. Regardez les logs de chargement des traductions
4. Rechargez la page

### "Erreur 400 lors de l'import"

1. Vérifiez que le serveur est bien déployé
2. Testez l'endpoint : `https://YOUR_PROJECT.supabase.co/functions/v1/make-server-10092a63/i18n/version`
3. Vérifiez les logs de la console

### "Les textes affichent 'hero.badge' au lieu du texte traduit"

1. Le texte n'est pas importé → Réimportez
2. Le hook `useI18n()` n'est pas appelé → Vérifiez le composant
3. Cache du navigateur → Videz le cache (Ctrl+Shift+R)

---

## 📞 Support

Pour toute question ou problème :
- Vérifiez les logs de la console navigateur (F12)
- Vérifiez les logs du serveur Supabase
- Consultez le fichier `/components/survey/HeroSection.tsx` pour le code source

---

**Version** : 1.0
**Date** : 2 Décembre 2024
**Auteur** : Assistant IA - Figma Make
