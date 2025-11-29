# 🌍 Système Multilingue YoJob - Démarrage Rapide

## 🎯 En bref

Le formulaire d'étude de marché YoJob supporte maintenant **8 langues européennes** pour cibler **27 000 agences ETT** dans **30 pays**.

## 🚀 Démarrage en 3 étapes

### Étape 1 : Charger les données de test (2 min)

1. Ouvrez le dashboard : `/dashboard`
2. Connectez-vous (admin/admin123)
3. Allez dans l'onglet **"Traductions"**
4. Cliquez sur le bouton violet **"Charger données de test"**
5. Attendez le rechargement automatique

✅ Vous avez maintenant 6 questions + 16 textes UI traduits en FR/EN/DE !

### Étape 2 : Tester la prévisualisation (1 min)

1. Dans le dashboard (onglet Overview)
2. Trouvez le widget **"Traductions multilingues"**
3. Cliquez sur **"Prévisualiser"**
4. Changez la langue dans le dropdown
5. Voyez les traductions en temps réel

### Étape 3 : Tester le formulaire public (1 min)

1. Retournez au formulaire : cliquez sur "Retour au formulaire"
2. Dans le header, cliquez sur l'icône **Globe** 🌐
3. Sélectionnez **English** ou **Deutsch**
4. Les sections se traduisent instantanément !

## 📚 Documentation complète

- **Guide utilisateur** : `/docs/I18N_GUIDE.md`
- **Résumé technique** : `/docs/I18N_IMPLEMENTATION_SUMMARY.md`

## 🎨 Langues disponibles

| Langue | Code | Statut | Pays cibles |
|--------|------|--------|-------------|
| 🇫🇷 Français | `fr` | ✅ Complet | France, Belgique, Suisse |
| 🇬🇧 English | `en` | ✅ Complet | UK, Irlande, +Secondaire |
| 🇩🇪 Deutsch | `de` | ✅ Complet | Allemagne, Autriche, Suisse |
| 🇪🇸 Español | `es` | 🟡 Partiel | Espagne |
| 🇮🇹 Italiano | `it` | 🟡 Partiel | Italie, Suisse |
| 🇵🇱 Polski | `pl` | 🟡 Partiel | Pologne |
| 🇵🇹 Português | `pt` | 🟡 Partiel | Portugal |
| 🇳🇱 Nederlands | `nl` | 🟡 Partiel | Pays-Bas, Belgique |

## 🛠️ Modules disponibles

### Dashboard Admin (`/dashboard`)

1. **Traduction des questions**
   - 25 questions du formulaire
   - Auto-traduction MCP/API
   - Validation manuelle

2. **Textes d'interface**
   - Boutons, navigation, labels
   - Organisation par catégories
   - Recherche et filtres

3. **Pays & Langues**
   - 30 pays européens
   - Mapping pays → langues
   - Configuration flexible

4. **Import/Export**
   - Export JSON complet
   - Import depuis fichier
   - Backup et migration

5. **Prévisualisation**
   - Voir les traductions en temps réel
   - Tester toutes les langues
   - Stats de progression

## 💡 Cas d'usage

### Lancer une campagne en Allemagne

```
1. Dashboard → Traductions → Questions
2. Sélectionner Q1-Q25
3. Pour chaque : Auto-traduire DE (DeepL recommandé)
4. Review manuel + Validation
5. Pays & Langues → Allemagne → [DE, EN]
6. Export JSON → Backup
7. Partager URL du formulaire
```

### Adapter pour la Belgique trilingue

```
1. Pays & Langues → Belgique
2. Cocher : FR, NL, EN
3. Traduire textes en néerlandais
4. Utilisateurs voient leur langue auto
```

### Créer un rapport multilingue

```
1. Dashboard → Export Manager
2. Format: CSV/JSON
3. Inclure réponses + langue détectée
4. Analyser distribution par pays/langue
```

## 🔧 API pour développeurs

### Utiliser le hook useI18n

```tsx
import { useI18n } from './hooks/useI18n';

function MyComponent() {
  const { t, tQuestion, currentLang, setCurrentLang } = useI18n();

  return (
    <div>
      <h1>{t('welcome.title', 'Bienvenue')}</h1>
      <p>{tQuestion('q1', 'Question par défaut')}</p>
      <button onClick={() => setCurrentLang('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

### Appeler l'API backend

```typescript
import { saveQuestionTranslation } from './lib/i18n-api';

await saveQuestionTranslation(
  'q12',
  'pl',
  'Jakie są Państwa główne wyzwania?',
  'validated'
);
```

## 📊 Statistiques

### Actuellement chargé (données de test)

- ✅ 6 questions traduites (FR, EN, DE, ES, PL, IT)
- ✅ 16 textes UI traduits (FR, EN, DE, ES, PL)
- ✅ 27 pays configurés

### Objectif production

- 🎯 25 questions × 8 langues = 200 traductions
- 🎯 50 textes UI × 8 langues = 400 traductions
- 🎯 30 pays configurés avec langues optimales

## 🐛 Problèmes courants

### "Les traductions ne s'affichent pas"

1. Vérifiez que les données de test sont chargées
2. Console → Regardez les erreurs API
3. Dashboard → Stats i18n (vérifier progression)

### "Impossible de changer de langue"

1. Videz le cache : `localStorage.clear()`
2. Rechargez la page
3. Le fallback est toujours français

### "Import JSON échoue"

1. Vérifiez le format (doit avoir `version` et `data`)
2. Regardez la console pour l'erreur exacte
3. Utilisez l'export comme modèle

## 🎯 Prochaines étapes suggérées

1. ✅ Compléter les 25 questions en FR/EN/DE
2. ✅ Traduire les 50 textes UI
3. ✅ Configurer les 30 pays
4. ✅ Tester avec utilisateurs natifs
5. ✅ Activer DeepL API pour qualité pro
6. ✅ Monitorer les stats par langue
7. ✅ Adapter selon feedback terrain

## 💬 Support

- Documentation : `/docs/I18N_GUIDE.md`
- Code source : `/hooks/useI18n.tsx`
- Backend : `/supabase/functions/server/i18n.ts`

---

**YoJob i18n System v1.0** • Prêt pour production • Novembre 2024
