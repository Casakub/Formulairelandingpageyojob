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
  cp -r "$CACHE_DIR"/* "$HTML_DIR"/
  echo "[entrypoint] Done."
else
  echo "[entrypoint] No pre-rendered cache found. Serving SPA only."
fi

exec "$@"
