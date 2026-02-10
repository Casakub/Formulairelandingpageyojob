#!/bin/bash
# =============================================================================
# YOJOB — SEO CI/CD Guard
# Run at build time to catch SEO regressions before deploy
# Checks: sitemap integrity, metadata coverage, route-page alignment
# Exit code: 0 = pass, 1 = blocking issue found
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$(dirname "$SCRIPT_DIR")"
ROOT_DIR="$(dirname "$SRC_DIR")"
ERRORS=0

err() { echo "CI-SEO FAIL: $1"; ERRORS=$((ERRORS+1)); }
ok()  { echo "CI-SEO PASS: $1"; }

echo "=== YOJOB SEO CI Guard ==="
echo ""

# --- 1. Check sitemap files are non-empty ---
echo "--- Sitemap Integrity ---"
for SM in "public/sitemap.xml" "public/sitemap-main.xml" "public/sitemap-about.xml"; do
  FILE="$ROOT_DIR/$SM"
  if [ ! -f "$FILE" ]; then
    err "$SM does not exist"
  elif [ ! -s "$FILE" ]; then
    err "$SM is empty (0 bytes)"
  else
    SIZE=$(wc -c < "$FILE")
    ok "$SM exists ($SIZE bytes)"
  fi
done

# --- 2. Verify sitemap-about contains all service routes ---
echo ""
echo "--- Sitemap Coverage ---"
ABOUT_FILE="$ROOT_DIR/public/sitemap-about.xml"
REQUIRED_IN_SITEMAP=(
  "/services/interim-europeen"
  "/services/recrutement-specialise"
  "/services/conseil-conformite"
  "/services/detachement-personnel"
  "/services/detachement-btp"
  "/services/detachement-industrie"
  "/blog/directive-detachement-europe"
  "/privacy"
  "/legal"
  "/cgv"
)

for ROUTE in "${REQUIRED_IN_SITEMAP[@]}"; do
  if grep -q "$ROUTE" "$ABOUT_FILE" 2>/dev/null; then
    ok "sitemap-about.xml contains $ROUTE"
  else
    err "sitemap-about.xml MISSING $ROUTE"
  fi
done

# --- 3. Check that App.tsx has routes for all service/blog pages ---
echo ""
echo "--- Route Coverage ---"
APP_FILE="$SRC_DIR/App.tsx"
REQUIRED_ROUTES=(
  "/services/interim-europeen"
  "/services/recrutement-specialise"
  "/services/conseil-conformite"
  "/services/detachement-personnel"
  "/services/detachement-btp"
  "/services/detachement-industrie"
  "/blog/directive-detachement-europe"
)

for ROUTE in "${REQUIRED_ROUTES[@]}"; do
  if grep -q "'$ROUTE'" "$APP_FILE" 2>/dev/null; then
    ok "App.tsx has route $ROUTE"
  else
    err "App.tsx MISSING route $ROUTE"
  fi
done

# --- 4. Check prerender.cjs includes all routes ---
echo ""
echo "--- Prerender Coverage ---"
PRERENDER_FILE="$SRC_DIR/scripts/prerender.cjs"
for ROUTE in "${REQUIRED_ROUTES[@]}"; do
  if grep -q "'$ROUTE'" "$PRERENDER_FILE" 2>/dev/null; then
    ok "prerender.cjs has $ROUTE"
  else
    err "prerender.cjs MISSING $ROUTE"
  fi
done

# --- 5. Check index.html has essential meta tags ---
echo ""
echo "--- index.html SEO Shell ---"
INDEX_FILE="$ROOT_DIR/index.html"
for TAG in 'rel="canonical"' 'og:title' 'og:image' 'og:description' 'twitter:card'; do
  if grep -q "$TAG" "$INDEX_FILE" 2>/dev/null; then
    ok "index.html has $TAG"
  else
    err "index.html MISSING $TAG"
  fi
done

# --- Summary ---
echo ""
echo "==========================="
if [ "$ERRORS" -gt 0 ]; then
  echo "SEO CI: $ERRORS error(s) found -- BUILD SHOULD FAIL"
  exit 1
else
  echo "SEO CI: All checks passed"
  exit 0
fi