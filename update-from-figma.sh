#!/bin/bash
# =============================================================================
# UPDATE-FROM-FIGMA.SH - Mise à jour intelligente après Figma Make
#
# Détecte automatiquement les changements et ne lance le prerender
# QUE quand c'est nécessaire (changements de contenu/structure).
#
# Usage:
#   ./update-from-figma.sh                                    Auto-détection
#   PRERENDER_LANGS=fr,en ./update-from-figma.sh              FR + EN
#   PRERENDER_LANGS=NONE ./update-from-figma.sh               Skip prerender
#   FULL_PRERENDER=1 ./update-from-figma.sh                   Toutes langues x pages
#   PRERENDER_PAGES="/,/a-propos" ./update-from-figma.sh      Pages spécifiques
# =============================================================================

set -e

GUARD_BRANCH="claude/verify-root-files-placement-B4mK1"
BRANCH_REF="origin/$GUARD_BRANCH"
LAST_COMMIT_FILE=".last-deploy-commit"

# Fichiers d'infra à restaurer depuis la branche garde-fou
INFRA_FILES="Dockerfile docker-compose.yml .dockerignore .env.example nginx/nginx.conf update-from-figma.sh"
# Fichiers applicatifs protégés (modifiés manuellement, pas par Figma)
APP_FILES="package.json .npmrc index.html src/components/SEOHead.tsx src/src/i18n/seo/metadata.ts src/scripts/prerender.cjs src/hooks/useLanguageManager.ts vite.config.ts"

# ── Vérification de branche ──────────────────────────────────────────────────
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Branche actuelle: '$CURRENT_BRANCH'. Ce script doit tourner sur 'main'."
  echo "   → git checkout main"
  exit 1
fi

# =============================================================================
# CLASSIFICATION DES FICHIERS MODIFIES
# =============================================================================

# Retourne: PAGE_ROUTE, "SHARED", "STYLE_ONLY", "STATIC_ONLY", ou "" (ignoré)
classify_file() {
  local file="$1"
  case "$file" in

    # ── CSS / Styles → pas besoin de prerender ──
    *.css|*.scss|*.less|tailwind.config.*|postcss.config.*)
      echo "STYLE_ONLY" ;;

    # ── Assets statiques → pas besoin de prerender ──
    *.png|*.jpg|*.jpeg|*.gif|*.svg|*.ico|*.woff|*.woff2|*.ttf|*.eot|*.webp)
      echo "STATIC_ONLY" ;;
    public/*)
      echo "STATIC_ONLY" ;;

    # ── Composants page → route correspondante ──
    src/App-Landing.tsx)                        echo "/" ;;
    src/APropos.tsx)                            echo "/a-propos" ;;
    src/NotreReseau.tsx)                        echo "/notre-reseau" ;;
    src/NosSecteurs.tsx)                        echo "/nos-secteurs" ;;
    src/Temoignages.tsx)                        echo "/temoignages" ;;
    src/ServiceInterimEuropeen.tsx)             echo "/services/interim-europeen" ;;
    src/ServiceRecrutementSpecialise.tsx)       echo "/services/recrutement-specialise" ;;
    src/ServiceConseilConformite.tsx)           echo "/services/conseil-conformite" ;;
    src/ServiceDetachementPersonnel.tsx)        echo "/services/detachement-personnel" ;;
    src/DemandeDevis.tsx)                       echo "/devis" ;;
    src/Privacy.tsx)                            echo "/privacy" ;;
    src/Legal.tsx)                              echo "/legal" ;;
    src/CGV.tsx)                                echo "/cgv" ;;

    # ── Traductions par page → route correspondante ──
    src/src/i18n/pages/landingPage/*)          echo "/" ;;
    src/src/i18n/pages/aPropos/*)              echo "/a-propos" ;;
    src/src/i18n/pages/notreReseau/*)          echo "/notre-reseau" ;;
    src/src/i18n/pages/nosSecteurs/*)          echo "/nos-secteurs" ;;
    src/src/i18n/pages/temoignages/*)          echo "/temoignages" ;;
    src/src/i18n/pages/privacy/*)              echo "/privacy" ;;
    src/src/i18n/pages/legal/*)                echo "/legal" ;;
    src/src/i18n/pages/cgv/*)                  echo "/cgv" ;;
    src/src/i18n/services/interimEuropeen/*)   echo "/services/interim-europeen" ;;
    src/src/i18n/services/recrutementSpecialise/*) echo "/services/recrutement-specialise" ;;
    src/src/i18n/services/conseilConformite/*) echo "/services/conseil-conformite" ;;
    src/src/i18n/services/detachementPersonnel/*) echo "/services/detachement-personnel" ;;
    src/src/i18n/devis/locales/*)              echo "/devis" ;;

    # ── Composants partagés (structure) → FULL prerender ──
    src/App.tsx)                                echo "SHARED" ;;
    src/components/SEOHead.tsx)                 echo "SHARED" ;;
    src/components/landing/Footer.tsx)          echo "SHARED" ;;
    src/components/landing/EuropeMap.tsx)       echo "SHARED" ;;
    src/components/shared/*)                    echo "SHARED" ;;
    src/src/i18n/seo/*)                        echo "SHARED" ;;
    src/src/i18n/index.ts)                     echo "SHARED" ;;
    src/src/i18n/types.ts)                     echo "SHARED" ;;
    src/src/i18n/constants.ts)                 echo "SHARED" ;;
    src/lib/i18nRouting.ts)                    echo "SHARED" ;;
    src/src/i18n/pages/index.ts)               echo "SHARED" ;;
    src/src/i18n/pages/usePageTranslation.ts)  echo "SHARED" ;;
    src/src/i18n/services/index.ts)            echo "SHARED" ;;
    src/src/i18n/services/useServiceTranslation.ts) echo "SHARED" ;;
    vite.config.*)                             echo "SHARED" ;;

    # ── Fichiers sans impact prerender ──
    *)                                         echo "" ;;
  esac
}

# Extraire le code langue d'un fichier de traduction (ex: de.ts → de)
extract_lang() {
  local basename
  basename=$(basename "$1" .ts)
  if echo "$basename" | grep -qE '^[a-z]{2}$'; then
    echo "$basename"
  fi
}

# =============================================================================
# DETECTION INTELLIGENTE
# =============================================================================
detect_changed_routes() {
  local last_commit="$1"
  local changed_files
  changed_files=$(git diff --name-only "$last_commit"..HEAD 2>/dev/null)

  if [ -z "$changed_files" ]; then
    echo "NO_CHANGES"
    return
  fi

  local pages=""
  local langs=""
  local has_shared=false
  local has_content=false
  local has_style_only=false
  local has_static_only=false

  while IFS= read -r file; do
    local classification
    classification=$(classify_file "$file")

    case "$classification" in
      SHARED)
        has_shared=true
        ;;
      STYLE_ONLY)
        has_style_only=true
        ;;
      STATIC_ONLY)
        has_static_only=true
        ;;
      "")
        # Fichier non pertinent, ignorer
        ;;
      *)
        # C'est une route de page
        has_content=true
        pages="$pages $classification"

        local lang
        lang=$(extract_lang "$file")
        if [ -n "$lang" ]; then
          langs="$langs $lang"
        fi
        ;;
    esac
  done <<< "$changed_files"

  # Priorités de décision :
  # 1. Composant partagé modifié → FULL (prerender FR uniquement)
  if [ "$has_shared" = true ]; then
    echo "FULL"
    return
  fi

  # 2. Pages spécifiques modifiées → SMART (prerender ciblé)
  if [ "$has_content" = true ]; then
    local unique_pages
    unique_pages=$(echo "$pages" | tr ' ' '\n' | sort -u | tr '\n' ',' | sed 's/^,//;s/,$//')
    local unique_langs=""
    if [ -n "$langs" ]; then
      unique_langs=$(echo "$langs" | tr ' ' '\n' | sort -u | tr '\n' ',' | sed 's/^,//;s/,$//')
    fi
    echo "SMART|$unique_pages|$unique_langs"
    return
  fi

  # 3. Que du CSS/styles ou des assets statiques → pas de prerender
  if [ "$has_style_only" = true ] || [ "$has_static_only" = true ]; then
    echo "NO_PRERENDER"
    return
  fi

  # 4. Aucun fichier pertinent
  echo "NO_PRERENDER"
}

# =============================================================================
# EXECUTION
# =============================================================================

echo "============================================"
echo "  YoJob - Update from Figma Make"
echo "============================================"

echo ""
echo "🔄 Fetching latest changes..."
git fetch origin

# S'assurer que la branche garde-fou est disponible
if ! git show-ref --verify --quiet "refs/remotes/$BRANCH_REF"; then
  echo "🔍 Guard branch not found, fetching..."
  git fetch origin "$GUARD_BRANCH":"$GUARD_BRANCH" 2>/dev/null || true
  if git show-ref --verify --quiet "refs/heads/$GUARD_BRANCH"; then
    BRANCH_REF="$GUARD_BRANCH"
  else
    BRANCH_REF=""
  fi
fi

echo "📥 Merging main into current branch..."
if ! git merge origin/main -m "Merge Figma Make updates from main" --no-edit 2>/dev/null; then
    echo "⚠️  Merge conflict, résolution automatique..."
    git checkout --theirs src/public/ 2>/dev/null || true
    if [ -d "src/public" ]; then
        mkdir -p public
        cp -r src/public/* public/ 2>/dev/null || true
        rm -rf src/public
    fi
    git add -A
    git commit -m "Merge Figma Make updates - auto-fix" || true
fi

# Restaurer les fichiers protégés depuis la branche garde-fou
if [ -n "$BRANCH_REF" ]; then
  echo "🛡️  Restoring infra files from guard branch..."
  for file in $INFRA_FILES; do
      git checkout "$BRANCH_REF" -- "$file" 2>/dev/null || true
  done
  git add -A
  git commit -m "Restore Docker configuration files" 2>/dev/null || true

  echo "🛡️  Restoring app files from guard branch..."
  for file in $APP_FILES; do
      git checkout "$BRANCH_REF" -- "$file" 2>/dev/null || true
  done
  git add -A
  git commit -m "Restore app files from guard branch" 2>/dev/null || true
fi

# Corriger le placement des fichiers public
if [ -d "src/public" ]; then
    echo "📁 Moving files from src/public/ to public/..."
    mkdir -p public
    mv src/public/* public/ 2>/dev/null || true
    rmdir src/public 2>/dev/null || true
    git add -A
    git commit -m "Fix: move static files from src/public/ to public/" || true
fi

# =============================================================================
# DETERMINATION DU MODE PRERENDER
# =============================================================================
echo ""
echo "── Prerender Decision ──────────────────────"

if [ -n "$FULL_PRERENDER" ]; then
  echo "🌍 Mode: COMPLET (forcé via FULL_PRERENDER=1)"
  echo "   → Toutes langues × toutes pages (~300 routes)"

elif [ -n "$PRERENDER_LANGS" ] || [ -n "$PRERENDER_PAGES" ]; then
  echo "🎯 Mode: CIBLÉ (forcé via variables d'environnement)"
  echo "   → langs=${PRERENDER_LANGS:-toutes} pages=${PRERENDER_PAGES:-toutes}"

else
  # ── Mode AUTO ──
  if [ -f "$LAST_COMMIT_FILE" ]; then
    LAST_COMMIT=$(cat "$LAST_COMMIT_FILE")
    if git rev-parse --verify "$LAST_COMMIT" >/dev/null 2>&1; then
      echo "🔍 Auto-détection des changements depuis $(echo "$LAST_COMMIT" | cut -c1-8)..."
      DETECTION=$(detect_changed_routes "$LAST_COMMIT")
      DETECT_MODE=$(echo "$DETECTION" | cut -d'|' -f1)

      case "$DETECT_MODE" in
        NO_CHANGES)
          echo "✅ Aucun changement. Docker rebuild sans prerender."
          export PRERENDER_LANGS="NONE"
          ;;
        NO_PRERENDER)
          echo "🎨 Changements CSS/assets uniquement. Docker rebuild sans prerender."
          export PRERENDER_LANGS="NONE"
          ;;
        FULL)
          echo "🌍 Composant partagé modifié → prerender FR uniquement."
          export PRERENDER_LANGS=fr
          ;;
        SMART)
          DETECTED_PAGES=$(echo "$DETECTION" | cut -d'|' -f2)
          DETECTED_LANGS=$(echo "$DETECTION" | cut -d'|' -f3)

          if [ -n "$DETECTED_LANGS" ]; then
            echo "🎯 Prerender ciblé: pages=$DETECTED_PAGES langs=$DETECTED_LANGS"
            export PRERENDER_PAGES="$DETECTED_PAGES"
            export PRERENDER_LANGS="$DETECTED_LANGS"
          else
            echo "🎯 Prerender ciblé: pages=$DETECTED_PAGES langs=fr"
            export PRERENDER_PAGES="$DETECTED_PAGES"
            export PRERENDER_LANGS=fr
          fi
          ;;
      esac
    else
      echo "⚠️  Commit de référence introuvable, prerender FR."
      export PRERENDER_LANGS=fr
    fi
  else
    echo "ℹ️  Premier déploiement, prerender FR."
    export PRERENDER_LANGS=fr
  fi
fi

# =============================================================================
# DOCKER BUILD
# =============================================================================
echo ""
echo "── Docker Build ────────────────────────────"
echo "   PRERENDER_LANGS=${PRERENDER_LANGS:-<all>}"
echo "   PRERENDER_PAGES=${PRERENDER_PAGES:-<all>}"

if [ -f docker-compose.yml ]; then
  PRERENDER_LANGS="${PRERENDER_LANGS:-}" \
  PRERENDER_PAGES="${PRERENDER_PAGES:-}" \
  docker compose up -d --build
else
  echo "⚠️  docker-compose.yml non trouvé, skip Docker."
fi

# Sauvegarder le commit déployé
git rev-parse HEAD > "$LAST_COMMIT_FILE"
echo ""
echo "📌 Commit déployé: $(cat "$LAST_COMMIT_FILE" | cut -c1-8)"
echo "✅ Update complete!"
