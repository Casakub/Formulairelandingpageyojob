#!/bin/bash
# =============================================================================
# YOJOB — SEO Validation Runbook v2
# Robust PASS/FAIL scoring with timestamped report
# Usage: bash scripts/seo-validate.sh [BASE_URL]
# Exit code: 0 = all PASS, 1 = at least one FAIL
# =============================================================================
set -euo pipefail

BASE_URL="${1:-https://yojob.fr}"
REPORT_FILE="seo-report-$(date +%Y%m%d-%H%M%S).txt"
PASS_COUNT=0
FAIL_COUNT=0
WARN_COUNT=0

log()  { echo "$1" | tee -a "$REPORT_FILE"; }
pass() { PASS_COUNT=$((PASS_COUNT+1)); log "  PASS: $1"; }
fail() { FAIL_COUNT=$((FAIL_COUNT+1)); log "  FAIL: $1"; }
warn() { WARN_COUNT=$((WARN_COUNT+1)); log "  WARN: $1"; }

log "============================================================"
log "YOJOB SEO Validation Report"
log "Date:   $(date -Iseconds)"
log "Target: $BASE_URL"
log "============================================================"
log ""

# --- Critical SEO URLs ---
MONEY_PAGES=(
  "/"
  "/services/interim-europeen"
  "/services/recrutement-specialise"
  "/services/conseil-conformite"
  "/services/detachement-personnel"
  "/services/detachement-btp"
  "/services/detachement-industrie"
  "/blog/directive-detachement-europe"
  "/devis"
)

LEGAL_PAGES=(
  "/privacy"
  "/legal"
  "/cgv"
)

ALL_PAGES=("${MONEY_PAGES[@]}" "${LEGAL_PAGES[@]}")

# ============================================================
# 1. HTTP STATUS CHECK
# ============================================================
log "--- [1/7] HTTP Status ---"
for PAGE in "${ALL_PAGES[@]}"; do
  STATUS=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 15 "$BASE_URL$PAGE" 2>/dev/null || echo "ERR")
  if [ "$STATUS" = "200" ]; then
    pass "$PAGE -> HTTP $STATUS"
  else
    fail "$PAGE -> HTTP $STATUS (expected 200)"
  fi
done
log ""

# ============================================================
# 2. TITLE TAG VALIDATION
# ============================================================
log "--- [2/7] <title> Tags ---"
for PAGE in "${ALL_PAGES[@]}"; do
  HTML=$(curl -sL --max-time 15 "$BASE_URL$PAGE" 2>/dev/null || echo "")
  TITLE=$(echo "$HTML" | grep -oP '<title>\K[^<]+' | head -1)
  if [ -z "$TITLE" ]; then
    fail "$PAGE -> <title> absent"
  elif [ ${#TITLE} -lt 10 ]; then
    fail "$PAGE -> <title> too short: '$TITLE'"
  elif echo "$TITLE" | grep -qi "YOJOB"; then
    pass "$PAGE -> '$TITLE'"
  else
    warn "$PAGE -> <title> present but missing YOJOB brand: '$TITLE'"
  fi
done
log ""

# ============================================================
# 3. META DESCRIPTION
# ============================================================
log "--- [3/7] meta[description] ---"
for PAGE in "${ALL_PAGES[@]}"; do
  HTML=$(curl -sL --max-time 15 "$BASE_URL$PAGE" 2>/dev/null || echo "")
  DESC=$(echo "$HTML" | grep -oP 'name="description"\s+content="\K[^"]+' | head -1)
  if [ -z "$DESC" ]; then
    DESC=$(echo "$HTML" | grep -oP 'content="[^"]+"\s+name="description"' | head -1)
  fi
  if [ -z "$DESC" ]; then
    fail "$PAGE -> meta[description] absent"
  elif [ ${#DESC} -lt 50 ]; then
    warn "$PAGE -> meta[description] short (${#DESC} chars)"
  else
    pass "$PAGE -> meta[description] present (${#DESC} chars)"
  fi
done
log ""

# ============================================================
# 4. CANONICAL VALIDATION (absolute URL check)
# ============================================================
log "--- [4/7] Canonical URLs ---"
for PAGE in "${ALL_PAGES[@]}"; do
  HTML=$(curl -sL --max-time 15 "$BASE_URL$PAGE" 2>/dev/null || echo "")
  CANONICAL=$(echo "$HTML" | grep -oP 'rel="canonical"\s+href="\K[^"]+' | head -1)
  if [ -z "$CANONICAL" ]; then
    CANONICAL=$(echo "$HTML" | grep -oP 'href="[^"]+"\s+rel="canonical"' | grep -oP 'href="\K[^"]+' | head -1)
  fi
  EXPECTED_CANONICAL="${BASE_URL}${PAGE}"
  if [ "$PAGE" = "/" ]; then
    EXPECTED_CANONICAL="$BASE_URL"
  fi
  if [ -z "$CANONICAL" ]; then
    fail "$PAGE -> canonical absent"
  elif [ "$CANONICAL" = "$EXPECTED_CANONICAL" ]; then
    pass "$PAGE -> canonical correct: $CANONICAL"
  elif echo "$CANONICAL" | grep -q "^https://yojob.fr"; then
    warn "$PAGE -> canonical present but unexpected: $CANONICAL (expected $EXPECTED_CANONICAL)"
  else
    fail "$PAGE -> canonical not absolute or wrong domain: $CANONICAL"
  fi
done
log ""

# ============================================================
# 5. OG TAGS
# ============================================================
log "--- [5/7] Open Graph Tags ---"
OG_REQUIRED=("og:title" "og:description" "og:url" "og:image" "og:locale" "og:site_name")
for PAGE in "${ALL_PAGES[@]}"; do
  HTML=$(curl -sL --max-time 15 "$BASE_URL$PAGE" 2>/dev/null || echo "")
  ALL_OK=true
  MISSING=""
  for TAG in "${OG_REQUIRED[@]}"; do
    if ! echo "$HTML" | grep -q "property=\"$TAG\""; then
      ALL_OK=false
      MISSING="$MISSING $TAG"
    fi
  done
  if $ALL_OK; then
    pass "$PAGE -> all OG tags present"
  else
    fail "$PAGE -> missing OG:$MISSING"
  fi
done
log ""

# ============================================================
# 6. SITEMAPS
# ============================================================
log "--- [6/7] Sitemaps ---"
for SM in "sitemap.xml" "sitemap-main.xml" "sitemap-about.xml"; do
  STATUS=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 15 "$BASE_URL/$SM" 2>/dev/null || echo "ERR")
  SIZE=$(curl -sL --max-time 15 "$BASE_URL/$SM" 2>/dev/null | wc -c)
  if [ "$STATUS" = "200" ] && [ "$SIZE" -gt 100 ]; then
    pass "$SM -> HTTP $STATUS, ${SIZE} bytes"
  elif [ "$STATUS" = "200" ] && [ "$SIZE" -le 100 ]; then
    fail "$SM -> HTTP $STATUS but only ${SIZE} bytes (empty/broken)"
  else
    fail "$SM -> HTTP $STATUS"
  fi
done

# Check new URLs exist in sitemap-about.xml
SITEMAP_ABOUT=$(curl -sL --max-time 15 "$BASE_URL/sitemap-about.xml" 2>/dev/null || echo "")
for NEW_PATH in "/services/detachement-btp" "/services/detachement-industrie" "/blog/directive-detachement-europe"; do
  if echo "$SITEMAP_ABOUT" | grep -q "$NEW_PATH"; then
    pass "sitemap-about.xml contains $NEW_PATH"
  else
    fail "sitemap-about.xml missing $NEW_PATH"
  fi
done
log ""

# ============================================================
# 7. CONTENT ANTI-SHELL CHECK (not empty SPA shell)
# ============================================================
log "--- [7/7] Content Anti-Shell Check ---"
for PAGE in "${MONEY_PAGES[@]}"; do
  HTML=$(curl -sL --max-time 15 "$BASE_URL$PAGE" 2>/dev/null || echo "")
  SIZE=${#HTML}
  HAS_CONTENT=false
  # Check for at least some text content beyond the SPA shell
  if [ "$SIZE" -gt 5000 ] && echo "$HTML" | grep -qP '(YOJOB|détachement|recrutement|intérim|directive)'; then
    HAS_CONTENT=true
  fi
  if $HAS_CONTENT; then
    pass "$PAGE -> content present (${SIZE} chars)"
  elif [ "$SIZE" -gt 2000 ]; then
    warn "$PAGE -> HTML present (${SIZE} chars) but may be SPA shell only"
  else
    fail "$PAGE -> likely empty SPA shell (${SIZE} chars)"
  fi
done
log ""

# ============================================================
# SUMMARY
# ============================================================
log "============================================================"
log "RESUME"
log "  PASS: $PASS_COUNT"
log "  FAIL: $FAIL_COUNT"
log "  WARN: $WARN_COUNT"
log ""

if [ "$FAIL_COUNT" -gt 0 ]; then
  log "VERDICT: NO-GO ($FAIL_COUNT failures)"
  log "============================================================"
  log "Report saved to: $REPORT_FILE"
  exit 1
else
  log "VERDICT: GO ($PASS_COUNT passed, $WARN_COUNT warnings)"
  log "============================================================"
  log "Report saved to: $REPORT_FILE"
  exit 0
fi
