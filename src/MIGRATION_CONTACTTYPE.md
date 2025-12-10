# 🔄 Migration du champ "Type de contact"

## Vue d'ensemble

Cette migration ajoute un nouveau champ **"Type de contact"** dans le formulaire de contact de la landing page YOJOB. Ce champ permet d'identifier si le prospect est :
- 🏢 **Client / Entreprise**
- 👥 **Agence de travail temporaire**
- 👤 **Intérimaire**
- ❓ **Autre**

---

## ✅ Modifications effectuées

### 1. Frontend - Formulaire de contact

**Fichier** : `/App-Landing.tsx`

- ✅ Ajout du champ `contactType` dans le state `formData`
- ✅ Nouveau sélecteur avant le champ "Type de besoin"
- ✅ Le type est envoyé au backend lors de la soumission

### 2. Frontend - Traductions FR

**Fichier** : `/hooks/useLandingContent.ts`

- ✅ Ajout des traductions françaises par défaut
- ✅ Migration automatique pour les anciennes données

**Structure ajoutée** :
```typescript
contactType: {
  label: 'Vous êtes',
  placeholder: 'Sélectionnez votre profil',
  options: {
    client: 'Client / Entreprise',
    agency: 'Agence de travail temporaire',
    interim: 'Intérimaire',
    other: 'Autre',
  },
}
```

### 3. Backend - Traductions multilingues

**Fichier** : `/supabase/functions/server/contact-type-translations.tsx`

- ✅ Traductions dans **23 langues européennes** :
  - 🇫🇷 Français, 🇬🇧 Anglais, 🇩🇪 Allemand, 🇪🇸 Espagnol, 🇮🇹 Italien
  - 🇵🇹 Portugais, 🇳🇱 Néerlandais, 🇵🇱 Polonais, 🇷🇴 Roumain, 🇨🇿 Tchèque
  - 🇭🇺 Hongrois, 🇧🇬 Bulgare, 🇬🇷 Grec, 🇸🇪 Suédois, 🇩🇰 Danois
  - 🇫🇮 Finnois, 🇸🇰 Slovaque, 🇭🇷 Croate, 🇸🇮 Slovène, 🇱🇹 Lituanien
  - 🇱🇻 Letton, 🇪🇪 Estonien, 🇮🇪 Irlandais, 🇲🇹 Maltais

### 4. Backend - Gestion des prospects

**Fichier** : `/supabase/functions/server/prospects.tsx`

- ✅ Accepte le champ `type` depuis le formulaire
- ✅ Priorité au type du formulaire sur la détection automatique
- ✅ Sauvegarde dans la colonne `type` de la table `prospects`

### 5. Backend - Endpoint de migration

**Fichier** : `/supabase/functions/server/landing.tsx`

- ✅ Nouveau endpoint `POST /migrate-contacttype`
- ✅ Met à jour automatiquement toutes les traductions Supabase

### 6. Dashboard CRM

**Fichiers** : `/components/dashboard/ProspectsPage.tsx` et `/components/dashboard/ProspectSheet.tsx`

- ✅ Le type est déjà affiché dans la liste des prospects
- ✅ Le type est affiché dans la fiche détaillée du prospect

---

## 🚀 Comment lancer la migration

### Étape 1 : Migration automatique côté client (déjà fait ✅)

La migration est **automatique** pour tous les utilisateurs. Au prochain chargement de la landing page, le système :
1. Détecte l'absence du champ `contactType`
2. L'ajoute automatiquement avec les traductions françaises
3. Sauvegarde dans localStorage

**Aucune action requise** de votre part.

### Étape 2 : Migration des traductions Supabase (optionnel)

Si vous avez des traductions dans Supabase (autres langues), vous pouvez les migrer :

**Option A : Via un appel API**

```bash
curl -X POST \
  https://VOTRE_PROJECT_ID.supabase.co/functions/v1/make-server-10092a63/landing/migrate-contacttype \
  -H "Authorization: Bearer VOTRE_ANON_KEY" \
  -H "Content-Type: application/json"
```

**Option B : Depuis la console navigateur**

```javascript
await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/landing/migrate-contacttype`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
  }
).then(r => r.json()).then(console.log);
```

**Réponse attendue** :
```json
{
  "success": true,
  "message": "Migration completed: 23 processed, 0 errors",
  "results": [
    { "lang": "fr", "action": "updated", "fallback": false },
    { "lang": "en", "action": "updated", "fallback": false },
    ...
  ],
  "total_processed": 23,
  "total_errors": 0
}
```

---

## 📊 Vérification

### Vérifier le formulaire

1. Ouvrez la landing page : `/`
2. Scrollez jusqu'au formulaire de contact
3. Vous devriez voir le nouveau champ **"Vous êtes"** entre "Entreprise" et "Type de besoin"
4. Sélectionnez une option et soumettez le formulaire

### Vérifier le dashboard CRM

1. Ouvrez le dashboard : `/crm/prospects`
2. Dans la liste, la colonne "Type/Source" affiche le type (Client, Agence, Intérimaire, etc.)
3. Cliquez sur un prospect pour voir sa fiche détaillée
4. Le type est affiché dans la section "Identité" : `🏢 Client`, `👥 Agence`, etc.

### Vérifier la base de données

Connectez-vous à Supabase et exécutez :

```sql
SELECT 
  name, 
  email, 
  type, 
  source, 
  created_at 
FROM prospects 
ORDER BY created_at DESC 
LIMIT 10;
```

La colonne `type` devrait contenir `client`, `agency`, `interim`, `waitlist`, ou `other`.

---

## 🌍 Traductions disponibles

| Langue | Code | Label | Client | Agence | Intérimaire | Autre |
|--------|------|-------|--------|--------|-------------|-------|
| 🇫🇷 Français | `fr` | Vous êtes | Client / Entreprise | Agence de travail temporaire | Intérimaire | Autre |
| 🇬🇧 Anglais | `en` | You are | Client / Company | Temporary work agency | Temporary worker | Other |
| 🇩🇪 Allemand | `de` | Sie sind | Kunde / Unternehmen | Zeitarbeitsfirma | Zeitarbeiter | Andere |
| 🇪🇸 Espagnol | `es` | Usted es | Cliente / Empresa | Agencia de trabajo temporal | Trabajador temporal | Otro |
| 🇮🇹 Italien | `it` | Lei è | Cliente / Azienda | Agenzia di lavoro temporaneo | Lavoratore temporaneo | Altro |
| ... | ... | ... | ... | ... | ... | ... |

*Total : 23 langues européennes*

---

## 🐛 Dépannage

### Le champ ne s'affiche pas

**Solution** : Videz le cache du navigateur et rechargez la page.

```javascript
// Dans la console navigateur
localStorage.removeItem('yojob_landing_content');
location.reload();
```

### Erreur "Cannot read properties of undefined (reading 'label')"

**Cause** : Migration non effectuée

**Solution** : La migration est automatique. Si l'erreur persiste, vérifiez que le fichier `/hooks/useLandingContent.ts` contient bien le code de migration.

### Les traductions ne fonctionnent pas

**Solution** : Exécutez l'endpoint de migration `/migrate-contacttype` (voir Étape 2 ci-dessus).

---

## 📝 Notes techniques

### Structure de données

**formData (frontend)** :
```typescript
{
  name: string;
  email: string;
  phone: string;
  company: string;
  contactType: 'client' | 'agency' | 'interim' | 'other';  // ← NOUVEAU
  needType: string;
  message: string;
}
```

**API payload** :
```json
{
  "name": "Jean Dupont",
  "email": "j.dupont@entreprise.fr",
  "phone": "+33612345678",
  "company": "Mon Entreprise",
  "type": "client",  // ← Mappé depuis contactType
  "needType": "interim",
  "message": "Besoin de 10 ouvriers BTP",
  "source": "landing_contact",
  "countryCode": "FR",
  "languageCode": "fr"
}
```

**Table prospects (Supabase)** :
```sql
CREATE TABLE prospects (
  id UUID PRIMARY KEY,
  type VARCHAR(50),  -- 'client', 'agency', 'interim', 'waitlist', 'other'
  source VARCHAR(100),
  status VARCHAR(50),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50),
  company VARCHAR(255),
  ...
);
```

---

## ✅ Checklist de validation

- [x] Le champ s'affiche dans le formulaire de contact
- [x] Les 4 options sont disponibles (Client, Agence, Intérimaire, Autre)
- [x] Le formulaire se soumet correctement avec le nouveau champ
- [x] Le type est sauvegardé dans la base de données
- [x] Le type s'affiche dans le dashboard CRM (liste)
- [x] Le type s'affiche dans la fiche détaillée du prospect
- [x] Les traductions françaises fonctionnent
- [x] Les 23 traductions sont disponibles dans le backend
- [x] L'endpoint de migration fonctionne

---

**✅ Migration complète et opérationnelle !**

Si vous avez des questions ou rencontrez des problèmes, consultez les logs du navigateur (F12) ou les logs Supabase Functions.
