# 📦 Installation des Dépendances - Dashboard YoJob v2.0

## 🎯 Nouvelles dépendances requises

Pour utiliser la fonctionnalité **Drag & Drop**, vous devez installer les packages suivants :

### Option 1 : NPM
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Option 2 : Yarn
```bash
yarn add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### Option 3 : PNPM
```bash
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## 📋 Détails des packages

### @dnd-kit/core
**Version** : ^6.1.0  
**Taille** : ~50kb (minified + gzipped: ~15kb)  
**Usage** : Core du système de drag & drop

**Exports utilisés** :
- `DndContext` - Contexte principal
- `closestCenter` - Algorithme de collision
- `PointerSensor` - Support souris/touch
- `KeyboardSensor` - Support clavier (a11y)
- `useSensor`, `useSensors` - Hooks de configuration

---

### @dnd-kit/sortable
**Version** : ^8.0.0  
**Taille** : ~30kb (minified + gzipped: ~10kb)  
**Usage** : Logique de tri et réorganisation

**Exports utilisés** :
- `SortableContext` - Wrapper pour liste sortable
- `useSortable` - Hook pour éléments draggables
- `verticalListSortingStrategy` - Stratégie de tri vertical
- `sortableKeyboardCoordinates` - Navigation clavier

---

### @dnd-kit/utilities
**Version** : ^3.2.2  
**Taille** : ~10kb (minified + gzipped: ~3kb)  
**Usage** : Utilitaires CSS et transformations

**Exports utilisés** :
- `CSS.Transform.toString()` - Conversion des transformations CSS

---

## ✅ Vérification de l'installation

Après installation, vérifiez que tout fonctionne :

```bash
# Vérifier les versions installées
npm list @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Devrait afficher quelque chose comme :
# ├── @dnd-kit/core@6.1.0
# ├── @dnd-kit/sortable@8.0.0
# └── @dnd-kit/utilities@3.2.2
```

---

## 🚀 Test rapide

Lancez l'application et testez :

```bash
npm run dev
# ou
yarn dev
```

1. Ouvrez `http://localhost:3000/dashboard`
2. Allez dans l'onglet "Questions"
3. Essayez de glisser-déposer une question
4. ✅ Si la question se déplace, l'installation est OK !

---

## 🐛 Troubleshooting

### Erreur : "Cannot find module '@dnd-kit/core'"

**Solution** :
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
```

---

### Erreur : "Peer dependency conflict"

**Cause** : Versions incompatibles de React

**Solution** :
```bash
# Force l'installation
npm install --legacy-peer-deps
```

**Note** : @dnd-kit requiert React 18+

---

### Erreur TypeScript : "Type DragEndEvent not found"

**Solution** :
Assurez-vous d'importer le bon type :
```tsx
import { DragEndEvent } from '@dnd-kit/core';
```

---

### Le drag & drop ne fonctionne pas sur mobile

**Vérifications** :
1. Assurez-vous d'utiliser `PointerSensor` (pas juste `MouseSensor`)
2. Vérifiez le CSS touch-action :
```css
.draggable {
  touch-action: none;
}
```

---

## 📦 Package.json complet

Votre `package.json` devrait contenir au minimum :

```json
{
  "name": "yojob-survey",
  "version": "2.0.0",
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "motion": "latest",
    "lucide-react": "latest",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## 🎨 Dépendances existantes (ne pas modifier)

Ces packages sont déjà installés et utilisés :

```json
{
  "motion": "latest",           // Animations
  "lucide-react": "latest",     // Icônes
  "react-slick": "latest",      // Carousels
  "recharts": "latest"          // Graphiques
}
```

---

## 💾 Taille du bundle

**Impact sur le bundle final** :

| Package | Size (minified) | Size (gzipped) |
|---------|----------------|----------------|
| @dnd-kit/core | 50 KB | 15 KB |
| @dnd-kit/sortable | 30 KB | 10 KB |
| @dnd-kit/utilities | 10 KB | 3 KB |
| **TOTAL** | **90 KB** | **28 KB** |

**Comparaison avec alternatives** :

| Bibliothèque | Size (gzipped) | Tree-shakable |
|--------------|----------------|---------------|
| @dnd-kit | 28 KB | ✅ Oui |
| react-beautiful-dnd | 45 KB | ❌ Non |
| react-dnd | 38 KB | ⚠️ Partiel |

**Verdict** : @dnd-kit est la solution la plus légère et moderne ! ✅

---

## 🔄 Mise à jour future

Pour mettre à jour vers les dernières versions :

```bash
# Mise à jour mineure (sécuritaire)
npm update @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Mise à jour majeure (vérifier breaking changes)
npm install @dnd-kit/core@latest @dnd-kit/sortable@latest @dnd-kit/utilities@latest
```

**Changelog officiel** : https://github.com/clauderic/dnd-kit/releases

---

## 📖 Documentation complète

**Ressources officielles** :
- 📚 [Documentation @dnd-kit](https://docs.dndkit.com/)
- 🎓 [Exemples](https://docs.dndkit.com/presets/sortable)
- 💻 [GitHub](https://github.com/clauderic/dnd-kit)
- 🐛 [Issues](https://github.com/clauderic/dnd-kit/issues)

**Tutoriels recommandés** :
- [Sortable List Tutorial](https://docs.dndkit.com/presets/sortable/usesortable)
- [Sensors & Modifiers](https://docs.dndkit.com/api-documentation/sensors)
- [Accessibility](https://docs.dndkit.com/guides/accessibility)

---

## ✅ Checklist d'installation

Cochez au fur et à mesure :

- [ ] Packages installés (`npm install`)
- [ ] Pas d'erreurs dans la console
- [ ] Application lance (`npm run dev`)
- [ ] Dashboard accessible
- [ ] Drag & drop fonctionne (souris)
- [ ] Drag & drop fonctionne (touch mobile)
- [ ] Navigation clavier fonctionne
- [ ] Build production OK (`npm run build`)

---

## 🎯 Étape suivante

Une fois les dépendances installées et testées :

1. ✅ Lisez `/DASHBOARD_CHANGELOG.md` pour comprendre les changements
2. 📖 Consultez `/DASHBOARD_IMPROVEMENTS.md` pour les prochaines features
3. 🚀 Commencez à utiliser le dashboard amélioré !

---

**Besoin d'aide ?**  
Consultez la section Troubleshooting ci-dessus ou créez une issue.

**Version** : 2.0  
**Date** : 28 Novembre 2024
