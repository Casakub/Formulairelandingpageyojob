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
