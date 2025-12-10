# 🔧 Migration: Ajout des champs de contact enrichis

## 📋 Vue d'ensemble

Cette migration ajoute 4 nouveaux champs à la Section 6 (Contact) pour mieux qualifier les prospects:

| Champ | Type | Obligatoire | Profils | Description |
|-------|------|-------------|---------|-------------|
| `q26_phone` | TEXT | ✅ Oui | Agency, Client | Téléphone professionnel |
| `q27_firstname` | TEXT | ✅ Oui | Tous | Prénom du répondant |
| `q28_lastname` | TEXT | ✅ Oui | Tous | Nom du répondant |
| `q29_siret` | TEXT | ❌ Non | Agency, Client | SIRET/SIREN pour enrichissement |

---

## 🎯 Objectifs

1. **Qualification commerciale** : Téléphone pour relance directe
2. **Personnalisation** : Prénom/Nom pour communication personnalisée
3. **Enrichissement** : SIRET pour données Pappers/Société.com API

---

## 📊 Impact sur les compteurs de questions

Les compteurs dans `/config/survey-questions-COMPLETE.ts` ont été mis à jour :

```typescript
export const QUESTION_COUNT_BY_PROFILE: Record<RespondentType, number> = {
  agency: 30,  // Avant: 26 | Ajouté: +4 (phone, firstname, lastname, siret)
  client: 22,  // Avant: 18 | Ajouté: +4 (phone, firstname, lastname, siret)
  worker: 17,  // Avant: 15 | Ajouté: +2 (firstname, lastname)
};
```

**Note**: Les intérimaires ne renseignent pas le téléphone ni le SIRET.

---

## 🚀 Instructions d'installation

### Étape 1: Appliquer la migration SQL

Connectez-vous à votre base de données Supabase et exécutez le fichier:

```bash
/supabase/migrations/15_add_contact_fields.sql
```

**Via Supabase Dashboard:**
1. Allez dans `SQL Editor`
2. Collez le contenu de `/supabase/migrations/15_add_contact_fields.sql`
3. Cliquez sur `Run`

**Via CLI:**
```bash
supabase db push
# Ou pour une migration spécifique:
supabase db execute --file supabase/migrations/15_add_contact_fields.sql
```

### Étape 2: Vérifier la migration

Exécutez cette requête pour vérifier que les colonnes ont été ajoutées :

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'market_research_responses'
AND column_name IN ('q26_phone', 'q27_firstname', 'q28_lastname', 'q29_siret');
```

Résultat attendu :
```
column_name    | data_type | is_nullable
---------------|-----------|------------
q26_phone      | text      | YES
q27_firstname  | text      | YES
q28_lastname   | text      | YES
q29_siret      | text      | YES
```

### Étape 3: Importer les traductions

1. Connectez-vous au **Dashboard Admin** de l'application
2. Ouvrez la **Console du navigateur** (F12)
3. Exécutez :

```javascript
// Charger le script
await import('/scripts/seed-contact-fields-translations.ts');

// Lancer l'import
await window.seedContactFieldsTranslations();
```

**Résultat attendu :**
```
🌱 Début de l'importation des traductions des champs de contact...
📊 Total: 8 traductions à importer
   - FR: 4 questions × 1 = 4 traductions
   - EN: 4 questions × 1 = 4 traductions

⏳ Import: q26_phone (fr)...
   ✅ OK
⏳ Import: q26_phone (en)...
   ✅ OK
...

✨ Toutes les traductions ont été importées avec succès !
🔄 Rechargez la page pour voir les nouveaux champs traduits.
```

### Étape 4: Tester

1. Rechargez l'application
2. Accédez à la Section 6 (Contact) de l'enquête
3. Vérifiez que les nouveaux champs apparaissent :
   - **Téléphone professionnel** (agences et clients uniquement)
   - **Prénom**
   - **Nom**
   - **SIRET/SIREN** (optionnel, agences et clients)

---

## 📍 Ordre des champs dans Section 6

Nouvelle structure :

```
Section 6: Contact
├─ 1. 📞 Téléphone professionnel (agency/client)
├─ 2. 👤 Prénom (tous)
├─ 3. 👤 Nom (tous)
├─ 4. 🏢 SIRET/SIREN (optionnel, agency/client)
├─ 5. 📧 Email professionnel (tous)
├─ 6. ✅ J'accepte d'être recontacté (tous)
└─ 7. 📊 Je souhaite recevoir le rapport (tous)
```

---

## 🔍 Validation des données

### Format attendu

| Champ | Format | Exemple |
|-------|--------|---------|
| `q26_phone` | International recommandé | `+33 6 12 34 56 78` |
| `q27_firstname` | Texte libre | `Jean` |
| `q28_lastname` | Texte libre | `Dupont` |
| `q29_siret` | 14 chiffres avec/sans espaces | `123 456 789 00012` |

### Contraintes

- **Téléphone** : Requis pour agency/client uniquement
- **Prénom/Nom** : Requis pour tous les profils
- **SIRET** : Optionnel, validé côté serveur si renseigné

---

## 🎨 Rendu visuel

Les nouveaux champs utilisent le même design que les champs existants :

- **Icon** : `Phone`, `User`, `Building2`
- **Style** : Input avec glassmorphism
- **Placeholder** : Texte d'exemple
- **Description** : Indication pour SIRET (enrichissement Pappers)

---

## 🔗 Intégration API Pappers/Société.com

Le champ SIRET permettra d'enrichir les données via :

### API Pappers
```bash
GET https://api.pappers.fr/v2/entreprise?siret={siret}&api_token={token}
```

### API Société.com
```bash
GET https://api.societe.com/entreprise/{siret}
```

**Données enrichies possibles** :
- Raison sociale
- Forme juridique
- Capital social
- Chiffre d'affaires
- Effectifs
- Date de création
- Adresse complète
- Dirigeants

---

## 📊 Analytics & Exports

Les nouveaux champs seront automatiquement inclus dans :

1. **Dashboard Admin** → Onglet "Prospects"
2. **Export CSV** → Colonnes supplémentaires
3. **Export Excel** → Feuille "Contacts"
4. **Export JSON** → Propriétés de l'objet

---

## ⚠️ Notes importantes

1. **Confidentialité RGPD** : Les données personnelles (téléphone, nom, prénom) doivent être traitées conformément au RGPD
2. **Stockage sécurisé** : Les données sont chiffrées en base via Supabase
3. **Accès restreint** : Seuls les administrateurs authentifiés peuvent voir les contacts
4. **Durée de conservation** : À définir selon vos besoins (ex: 2 ans)

---

## 🐛 Résolution de problèmes

### Erreur : "Column does not exist"

**Cause** : La migration SQL n'a pas été exécutée.

**Solution** : Réappliquer la migration (Étape 1).

### Traductions manquantes

**Cause** : Le script de traduction n'a pas été exécuté.

**Solution** : Réexécuter le script (Étape 3).

### Champs non visibles pour workers

**Normal** : Les intérimaires ne voient que prénom/nom, pas le téléphone ni SIRET.

---

## 📞 Support

Pour toute question sur cette migration :

1. Consultez `/Guidelines.md` section "Section 6: Contact"
2. Vérifiez `/config/survey-questions-COMPLETE.ts` lignes 1066-1109
3. Contactez l'équipe DevOps YOJOB

---

**Version** : 1.0  
**Date** : 10 Décembre 2024  
**Auteur** : Équipe YOJOB Dev