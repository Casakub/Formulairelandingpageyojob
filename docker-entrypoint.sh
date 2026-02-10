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

  # Copier les sous-dossiers (pages par langue/route)
  for dir in "$CACHE_DIR"/*/; do
    [ -d "$dir" ] && cp -r "$dir" "$HTML_DIR"/
  done

  # Copier le root index.html avec vérification de sécurité des assets
  if [ -f "$CACHE_DIR/index.html" ]; then
    # Extraire le premier fichier JS référencé dans le root pré-rendu
    MAIN_JS=$(grep -o 'src="/assets/[^"]*\.js"' "$CACHE_DIR/index.html" | head -1 | sed 's/src="//;s/"//')
    if [ -n "$MAIN_JS" ] && [ -f "$HTML_DIR$MAIN_JS" ]; then
      echo "[entrypoint] Pre-rendered root page: assets verified OK. Using pre-rendered version."
      cp "$CACHE_DIR/index.html" "$HTML_DIR/index.html"
    else
      echo "[entrypoint] Pre-rendered root page: assets mismatch (build changed). Keeping SPA version."
      echo "[entrypoint]   Expected: $MAIN_JS"
    fi
  fi

  echo "[entrypoint] Done."
else
  echo "[entrypoint] No pre-rendered cache found. Serving SPA only."
fi

exec "$@"
