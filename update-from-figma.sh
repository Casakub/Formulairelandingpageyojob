#!/bin/bash
# Script de mise à jour après Figma Make
# Usage: ./update-from-figma.sh

set -e

GUARD_BRANCH="claude/verify-root-files-placement-B4mK1"
BRANCH_REF="origin/$GUARD_BRANCH"

CRITICAL_FILES="Dockerfile docker-compose.yml .dockerignore .env.example nginx/nginx.conf update-from-figma.sh"

echo "🔄 Fetching latest changes..."
git fetch origin

# S'assurer que la branche garde-fou est disponible
if ! git show-ref --verify --quiet "refs/remotes/$BRANCH_REF"; then
  echo "🔍 Guard branch not found on remotes, fetching..."
  git fetch origin "$GUARD_BRANCH":"$GUARD_BRANCH" 2>/dev/null || true
  if git show-ref --verify --quiet "refs/heads/$GUARD_BRANCH"; then
    BRANCH_REF="$GUARD_BRANCH"
  else
    BRANCH_REF=""
  fi
fi

echo "📥 Merging main into current branch..."
if ! git merge origin/main -m "Merge Figma Make updates from main" --no-edit 2>/dev/null; then
    echo "⚠️  Merge conflict detected, resolving automatically..."

    # Accepter les fichiers de main dans src/public/
    git checkout --theirs src/public/ 2>/dev/null || true

    # Déplacer vers public/
    if [ -d "src/public" ]; then
        mkdir -p public
        cp -r src/public/* public/ 2>/dev/null || true
        rm -rf src/public
    fi

    # Finaliser le merge
    git add -A
    git commit -m "Merge Figma Make updates - auto-fix file locations" || true
fi

# Restaurer les fichiers critiques depuis la branche garde-fou
if [ -n "$BRANCH_REF" ]; then
  echo "🛡️  Restoring infra files from $BRANCH_REF..."
  for file in $CRITICAL_FILES; do
      if [ ! -e "$file" ]; then
          echo "   Restoring $file..."
          git checkout "$BRANCH_REF" -- "$file" 2>/dev/null || true
      fi
  done
else
  echo "⚠️  Guard branch not available; skipping infra restore."
fi

# Committer si des fichiers ont été restaurés
if ! git diff --cached --quiet 2>/dev/null || ! git diff --quiet 2>/dev/null; then
    git add -A
    git commit -m "Restore infra files from guard branch" 2>/dev/null || true
fi

# Corriger le placement des fichiers public si nécessaire
if [ -d "src/public" ]; then
    echo "📁 Moving files from src/public/ to public/..."
    mkdir -p public
    mv src/public/* public/ 2>/dev/null || true
    rmdir src/public 2>/dev/null || true
    git add -A
    git commit -m "Fix: move static files from src/public/ to public/" || true
fi

echo "🐳 Rebuilding Docker..."
# Prerender rapide par défaut (FR uniquement)
if [ -z "$PRERENDER_LANGS" ] && [ -z "$FULL_PRERENDER" ]; then
  export PRERENDER_LANGS=fr
fi

if [ -f "docker-compose.yml" ] || [ -f "compose.yml" ] || [ -f "compose.yaml" ]; then
  PRERENDER_LANGS="${PRERENDER_LANGS:-}" PRERENDER_PAGES="${PRERENDER_PAGES:-}" docker compose up -d --build
else
  echo "⚠️  No docker compose file found, skipping Docker rebuild."
fi

echo "✅ Update complete!"
