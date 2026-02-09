#!/bin/bash
# =============================================================================
# PRERENDER-ENTRYPOINT.SH - YoJob Prerender Worker
# Lance le prerender et copie les pages HTML vers le volume /output
# =============================================================================

set -e

echo "============================================"
echo "  YoJob - Prerender Worker"
echo "============================================"
echo "  PRERENDER_LANGS=${PRERENDER_LANGS:-<all>}"
echo "  PRERENDER_PAGES=${PRERENDER_PAGES:-<all>}"
echo ""

# Vérifier que le build existe
if [ ! -d "build" ]; then
  echo "❌ Build directory not found. Something went wrong."
  exit 1
fi

# Lancer le prerender
echo "🔄 Starting prerender..."
node src/scripts/prerender.cjs

# Copier les index.html pré-rendues vers le volume de sortie
# IMPORTANT : -mindepth 2 exclut le root ./index.html qui doit rester
# celui du build Vite (sinon les hashes d'assets ne correspondent plus)
echo ""
echo "📦 Syncing pre-rendered pages to output volume..."
mkdir -p /output

# Nettoyer un éventuel root index.html d'un ancien run
rm -f /output/index.html

cd build
find . -mindepth 2 -name 'index.html' -exec cp --parents {} /output/ \;

PAGE_COUNT=$(find /output -name 'index.html' | wc -l)
echo ""
echo "✅ $PAGE_COUNT pages pre-rendered and cached in volume."
echo "   The landing container will pick them up on next restart."
