#!/bin/sh
# =============================================================================
# DOCKER-ENTRYPOINT.SH - YoJob Landing Page
# Restaure les pages pré-rendues depuis le volume cache avant de lancer nginx
# =============================================================================

CACHE_DIR="/prerender-cache"
HTML_DIR="/usr/share/nginx/html"

if [ -d "$CACHE_DIR" ] && [ "$(ls -A "$CACHE_DIR" 2>/dev/null)" ]; then
  PAGE_COUNT=$(find "$CACHE_DIR" -name 'index.html' | wc -l)
  echo "[entrypoint] Restoring $PAGE_COUNT pre-rendered pages from cache..."
  # Copier les sous-dossiers uniquement (ne PAS écraser le root index.html du Vite build)
  for dir in "$CACHE_DIR"/*/; do
    [ -d "$dir" ] && cp -r "$dir" "$HTML_DIR"/
  done
  echo "[entrypoint] Done."
else
  echo "[entrypoint] No pre-rendered cache found. Serving SPA only."
fi

exec "$@"
