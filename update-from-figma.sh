#!/bin/bash
# Script de mise à jour après Figma Make
# Usage: ./update-from-figma.sh

set -e

DOCKER_FILES="Dockerfile docker-compose.yml .dockerignore .env.example nginx/nginx.conf"
BRANCH_REF="origin/claude/verify-root-files-placement-B4mK1"

echo "🔄 Fetching latest changes..."
git fetch origin

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

# Restaurer les fichiers Docker s'ils ont été supprimés
echo "🔧 Ensuring Docker configuration files exist..."
for file in $DOCKER_FILES; do
    if [ ! -e "$file" ]; then
        echo "   Restoring $file..."
        git checkout $BRANCH_REF -- "$file" 2>/dev/null || true
    fi
done

# Committer si des fichiers ont été restaurés
if ! git diff --cached --quiet 2>/dev/null || ! git diff --quiet 2>/dev/null; then
    git add -A
    git commit -m "Restore Docker configuration files" 2>/dev/null || true
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
docker compose up -d --build

echo "✅ Update complete!"
