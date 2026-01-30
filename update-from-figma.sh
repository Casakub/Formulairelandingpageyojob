#!/bin/bash
# Script de mise à jour après Figma Make
# Usage: ./update-from-figma.sh

set -e

echo "🔄 Fetching latest changes..."
git fetch origin

echo "📥 Merging main into current branch..."
git merge origin/main -m "Merge Figma Make updates from main" --no-edit || {
    echo "⚠️  Merge conflict detected. Please resolve manually."
    exit 1
}

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
