# Instructions après chaque mise à jour Figma Make

## Problème

Figma Make écrase certains fichiers critiques lors de ses pushs vers GitHub. Les fichiers suivants sont généralement supprimés ou modifiés :

### Fichiers à la racine (supprimés)
- `.dockerignore`
- `.env.example`
- `.gitignore`
- `Dockerfile`
- `docker-compose.yml`
- `nginx/nginx.conf`
- `package-lock.json`

### Fichiers dans `src/` (modifiés/supprimés)
- `src/hooks/useI18n.tsx` → renommé en `.ts` (casse le build car contient du JSX)
- `src/services/responseService.ts` → supprimé
- `src/utils/helpers.ts` → supprimé
- `src/utils/supabase/info.tsx` → `supabaseUrl` supprimé

---

## Solution : Merger la branche de référence

Après chaque push Figma Make, exécuter ces commandes :

```bash
# 1. Récupérer la branche avec tous les correctifs
git fetch origin claude/restore-deleted-files-01NBodDiTkLr7bxRGVwFoDjh

# 2. Merger les fichiers manquants
git merge origin/claude/restore-deleted-files-01NBodDiTkLr7bxRGVwFoDjh -m "fix: restore files after Figma Make update"

# 3. Pousser vers GitHub
git push
```

---

## Alternative : Script automatique

Créer un script `restore-after-figma.sh` :

```bash
#!/bin/bash
echo "🔄 Restauration des fichiers après Figma Make..."

git fetch origin claude/restore-deleted-files-01NBodDiTkLr7bxRGVwFoDjh
git merge origin/claude/restore-deleted-files-01NBodDiTkLr7bxRGVwFoDjh -m "fix: restore files after Figma Make update"

echo "✅ Fichiers restaurés. N'oubliez pas de push !"
```

---

## Vérification rapide

Après le merge, vérifier que ces fichiers existent :

```bash
ls -la Dockerfile docker-compose.yml .gitignore nginx/
ls -la src/services/responseService.ts
ls -la src/utils/helpers.ts
ls -la src/hooks/useI18n.tsx  # Doit être .tsx, PAS .ts
```

---

## Sur le serveur VPS (déploiement)

```bash
cd /docker/yojob
git pull
docker compose build
docker compose up -d
```

---

## Branche de référence

**Branche contenant tous les correctifs :**
`claude/restore-deleted-files-01NBodDiTkLr7bxRGVwFoDjh`

Cette branche contient tous les fichiers de configuration nécessaires au bon fonctionnement du projet Docker.
