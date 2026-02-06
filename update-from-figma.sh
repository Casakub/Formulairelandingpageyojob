#!/bin/bash
# Script de mise à jour après Figma Make
# Usage: ./update-from-figma.sh

set -e

echo "🔄 Fetching latest changes..."
git fetch origin

echo "📥 Merging main into current branch..."
if ! git merge origin/main -m "Merge Figma Make updates from main" --no-edit 2>/dev/null; then
    echo "⚠️  Merge conflict detected, resolving automatically..."

    # GARDER nos fichiers de config (pas ceux de Figma Make)
    git checkout --ours package.json 2>/dev/null || true
    git checkout --ours vite.config.ts 2>/dev/null || true
    
    # Accepter les fichiers de design de main dans src/
    git checkout --theirs src/ 2>/dev/null || true

    # Déplacer src/public/ vers public/ si nécessaire
    if [ -d "src/public" ]; then
        mkdir -p public
        cp -r src/public/* public/ 2>/dev/null || true
        rm -rf src/public
    fi

    # Finaliser le merge
    git add -A
    git commit -m "Merge Figma Make updates - keep local config" || true
fi

# Restaurer les fichiers critiques depuis la branche garde-fou
GUARD_BRANCH="claude/verify-root-files-placement-B4mK1"
GUARD_REF=""
if git rev-parse --verify --quiet "$GUARD_BRANCH" >/dev/null; then
    GUARD_REF="$GUARD_BRANCH"
elif git rev-parse --verify --quiet "origin/$GUARD_BRANCH" >/dev/null; then
    GUARD_REF="origin/$GUARD_BRANCH"
else
    echo "🔍 Guard branch not found locally, fetching..."
    git fetch origin "$GUARD_BRANCH":"$GUARD_BRANCH" 2>/dev/null || true
    if git rev-parse --verify --quiet "$GUARD_BRANCH" >/dev/null; then
        GUARD_REF="$GUARD_BRANCH"
    fi
fi

if [ -n "$GUARD_REF" ]; then
    echo "🛡️  Restoring infra files from $GUARD_REF..."
    git checkout "$GUARD_REF" -- docker-compose.yml Dockerfile nginx/nginx.conf .dockerignore .env.example update-from-figma.sh 2>/dev/null || true
    git add docker-compose.yml Dockerfile nginx/nginx.conf .dockerignore .env.example update-from-figma.sh 2>/dev/null || true
    git commit -m "Restore infra files from guard branch" 2>/dev/null || true

echo "🛡️  Restoring app files from $GUARD_REF..."
APP_FILES="index.html src/index.html src/components/SEOHead.tsx src/src/i18n/seo/metadata.ts src/App-Survey-Original.tsx src/scripts/prerender.cjs"
for file in $APP_FILES; do
    git checkout "$GUARD_REF" -- "$file" 2>/dev/null || true
done
git add $APP_FILES 2>/dev/null || true
git commit -m "Restore app files from guard branch" 2>/dev/null || true

else
    echo "⚠️  Guard branch not available; skipping infra restore."
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
if [ -f "docker-compose.yml" ] || [ -f "compose.yml" ] || [ -f "compose.yaml" ]; then
    docker compose up -d --build
else
    echo "⚠️  No docker compose file found, skipping Docker rebuild."
fi

echo "✅ Update complete!"
