#!/bin/bash
# Script de mise à jour après Figma Make
#
# Usage:
#   ./update-from-figma.sh                              Auto: détecte les pages modifiées
#   PRERENDER_LANGS=fr,en ./update-from-figma.sh        FR + EN (26 pages)
#   PRERENDER_LANGS=fr PRERENDER_PAGES="/,/a-propos,/devis" ./update-from-figma.sh  Pages choisies
#   FULL_PRERENDER=1 ./update-from-figma.sh             Complet: toutes langues x toutes pages (~300 routes)

set -e

GUARD_BRANCH="claude/verify-root-files-placement-B4mK1"
BRANCH_REF="origin/$GUARD_BRANCH"
LAST_COMMIT_FILE=".last-deploy-commit"

DOCKER_FILES="Dockerfile docker-compose.yml .dockerignore .env.example nginx/nginx.conf"
APP_FILES="package.json package-lock.json package.json package-lock.json index.html src/index.html src/components/SEOHead.tsx src/src/i18n/seo/metadata.ts src/App-Survey-Original.tsx src/scripts/prerender.cjs src/src/i18n/devis/locales/it.ts update-from-figma.sh"

# ── Vérification de branche ──────────────────────────────────────────────────
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Vous êtes sur la branche '$CURRENT_BRANCH'."
  echo "   Ce script doit être exécuté depuis 'main'."
  echo "   → git checkout main"
  exit 1
fi

# ── Fonction: mapper un fichier source vers une route de page ────────────────
# Retourne la route (ex: /a-propos) ou "SHARED" ou "" (non pertinent)
map_file_to_page() {
  local file="$1"
  case "$file" in
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

    # ── Traductions page → route correspondante ──
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

    # ── Composants partagés → toutes les pages ──
    src/App.tsx)                                echo "SHARED" ;;
    src/components/SEOHead.tsx)                 echo "SHARED" ;;
    src/components/landing/Footer.tsx)          echo "SHARED" ;;
    src/components/landing/EuropeMap.tsx)       echo "SHARED" ;;
    src/components/shared/*)                    echo "SHARED" ;;
    src/src/i18n/services/footer.ts)           echo "SHARED" ;;
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
    tailwind.config.*)                         echo "SHARED" ;;
    src/index.css)                             echo "SHARED" ;;

    # ── Fichiers non pertinents pour le prerender ──
    *)                                         echo "" ;;
  esac
}

# ── Fonction: extraire la langue d'un fichier de traduction ──────────────────
# Ex: src/src/i18n/pages/aPropos/de.ts → de
extract_lang() {
  local file="$1"
  local basename
  basename=$(basename "$file" .ts)
  # Vérifier que c'est bien un code langue (2 lettres)
  if echo "$basename" | grep -qE '^[a-z]{2}$'; then
    echo "$basename"
  fi
}

# ── Fonction: détection intelligente des pages modifiées ─────────────────────
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
  local need_full=false

  while IFS= read -r file; do
    local page
    page=$(map_file_to_page "$file")

    if [ "$page" = "SHARED" ]; then
      need_full=true
      break
    fi

    if [ -n "$page" ]; then
      # Ajouter la page à la liste (dédupliquée plus tard)
      pages="$pages $page"

      # Si c'est un fichier de traduction, extraire la langue
      local lang
      lang=$(extract_lang "$file")
      if [ -n "$lang" ]; then
        langs="$langs $lang"
      fi
    fi
  done <<< "$changed_files"

  if [ "$need_full" = true ]; then
    echo "FULL"
    return
  fi

  if [ -z "$pages" ]; then
    echo "NO_PRERENDER"
    return
  fi

  # Dédupliquer et formater
  local unique_pages
  unique_pages=$(echo "$pages" | tr ' ' '\n' | sort -u | tr '\n' ',' | sed 's/^,//;s/,$//')

  local unique_langs=""
  if [ -n "$langs" ]; then
    unique_langs=$(echo "$langs" | tr ' ' '\n' | sort -u | tr '\n' ',' | sed 's/^,//;s/,$//')
  fi

  echo "SMART|$unique_pages|$unique_langs"
}

echo "🔄 Fetching latest changes..."
git fetch origin

# S'assurer que la branche garde-fou est disponible
if ! git show-ref --verify --quiet "refs/remotes/$BRANCH_REF"; then
  echo "🔍 Guard branch not found on remotes, fetching..."
  git fetch origin "$GUARD_BRANCH":"$GUARD_BRANCH" 2>/dev/null || true
  if git show-ref --verify --quiet "refs/heads/$GUARD_BRANCH"; then
    BRANCH_REF="$GUARD_BRANCH"
  else
    BRANCH_REF=""
  fi
fi

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

# Restaurer les fichiers Docker (FORCER la restauration)
if [ -n "$BRANCH_REF" ]; then
  echo "🛡️  Restoring infra files from $BRANCH_REF..."
  for file in $DOCKER_FILES; do
      echo "   Restoring $file..."
      git checkout "$BRANCH_REF" -- "$file" 2>/dev/null || true
  done

  git add -A
  git commit -m "Restore Docker configuration files" 2>/dev/null || true

  echo "🛡️  Restoring app files from $BRANCH_REF..."
  for file in $APP_FILES; do
      git checkout "$BRANCH_REF" -- "$file" 2>/dev/null || true
  done

  git add -A
  git commit -m "Restore app files from guard branch" 2>/dev/null || true
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

# ── Déterminer le mode de prerender ──────────────────────────────────────────
if [ -n "$FULL_PRERENDER" ]; then
  echo "🌍 Mode: COMPLET (toutes langues × toutes pages)"
elif [ -n "$PRERENDER_LANGS" ] || [ -n "$PRERENDER_PAGES" ]; then
  echo "🎯 Mode: CIBLÉ (langs=${PRERENDER_LANGS:-toutes} pages=${PRERENDER_PAGES:-toutes})"
else
  # ── Mode AUTO: détection intelligente ──
  if [ -f "$LAST_COMMIT_FILE" ]; then
    LAST_COMMIT=$(cat "$LAST_COMMIT_FILE")
    if git rev-parse --verify "$LAST_COMMIT" >/dev/null 2>&1; then
      echo "🔍 Détection des pages modifiées depuis le dernier déploiement..."
      DETECTION=$(detect_changed_routes "$LAST_COMMIT")
      DETECT_MODE=$(echo "$DETECTION" | cut -d'|' -f1)

      case "$DETECT_MODE" in
        NO_CHANGES)
          echo "✅ Aucun changement détecté. Rebuild Docker sans prerender."
          export PRERENDER_LANGS="NONE"
          ;;
        NO_PRERENDER)
          echo "ℹ️  Changements détectés mais aucune page affectée. Rebuild Docker sans prerender."
          export PRERENDER_LANGS="NONE"
          ;;
        FULL)
          echo "🌍 Mode AUTO → COMPLET (composant partagé modifié)"
          echo "   Prerender de toutes les pages en FR."
          export PRERENDER_LANGS=fr
          ;;
        SMART)
          DETECTED_PAGES=$(echo "$DETECTION" | cut -d'|' -f2)
          DETECTED_LANGS=$(echo "$DETECTION" | cut -d'|' -f3)

          if [ -n "$DETECTED_LANGS" ]; then
            echo "🎯 Mode AUTO → CIBLÉ (pages=$DETECTED_PAGES langs=$DETECTED_LANGS)"
            export PRERENDER_PAGES="$DETECTED_PAGES"
            export PRERENDER_LANGS="$DETECTED_LANGS"
          else
            echo "🎯 Mode AUTO → CIBLÉ (pages=$DETECTED_PAGES langs=fr)"
            export PRERENDER_PAGES="$DETECTED_PAGES"
            export PRERENDER_LANGS=fr
          fi
          ;;
      esac
    else
      echo "⚠️  Commit de référence introuvable, prerender FR par défaut."
      export PRERENDER_LANGS=fr
    fi
  else
    echo "ℹ️  Premier déploiement détecté, prerender FR par défaut."
    export PRERENDER_LANGS=fr
  fi
fi

# ── Rebuild Docker ───────────────────────────────────────────────────────────
echo "🐳 Rebuilding Docker..."
if [ -f docker-compose.yml ]; then
  PRERENDER_LANGS="${PRERENDER_LANGS:-}" PRERENDER_PAGES="${PRERENDER_PAGES:-}" docker compose up -d --build
else
  echo "⚠️  No docker compose file found, skipping Docker rebuild."
fi

# ── Sauvegarder le commit déployé ────────────────────────────────────────────
git rev-parse HEAD > "$LAST_COMMIT_FILE"
echo "📌 Commit déployé sauvegardé: $(cat "$LAST_COMMIT_FILE")"

echo "✅ Update complete!"
