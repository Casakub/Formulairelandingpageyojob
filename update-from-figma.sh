#!/usr/bin/env bash
# =============================================================================
# UPDATE-FROM-FIGMA.SH - Mise à jour intelligente après Figma Make
#
# Architecture 2 conteneurs :
#   - yojob-landing    : Nginx (SPA + pages pré-rendues depuis volume)
#   - yojob-prerender  : Worker Chromium (ne tourne que quand nécessaire)
#   - volume prerender-cache : stocke les pages pré-rendues (persiste entre rebuilds)
#
# REGLE D'OR : les pages pré-rendues vivent dans un volume Docker persistant.
# Un rebuild du landing page ne les supprime PLUS.
# Le prerender ne tourne que quand du contenu change réellement.
#
# CORRECTION v3: Zéro commit local. Le script fait un reset --hard sur
# origin/main puis copie les fichiers infra SANS committer. Cela élimine
# la divergence entre le main local du serveur et origin/main.
# Les fichiers applicatifs (src/) viennent de main (Figma Make + PRs mergées).
#
# Usage:
#   ./update-from-figma.sh                                    Auto-détection
#   PRERENDER_LANGS=fr,en ./update-from-figma.sh              FR + EN
#   PRERENDER_LANGS=NONE ./update-from-figma.sh               Skip prerender
#   FULL_PRERENDER=1 ./update-from-figma.sh                   Toutes langues x pages
#   PRERENDER_PAGES="/,/a-propos" ./update-from-figma.sh      Pages spécifiques
# =============================================================================

set -Eeuo pipefail

# ── Verrou anti-exécution simultanée ─────────────────────────────────────────
SCRIPT_NAME="$(basename "$0")"
LOCK_FILE="/tmp/${SCRIPT_NAME}.lock"
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Une autre exécution est en cours (${LOCK_FILE})."
  exit 1
fi

# ── Trap erreur avec numéro de ligne ─────────────────────────────────────────
on_error() {
  local exit_code=$?
  echo "Erreur (code=${exit_code}) à la ligne ${BASH_LINENO[0]}."
  exit "$exit_code"
}
trap on_error ERR

# ── Config ───────────────────────────────────────────────────────────────────
GUARD_BRANCH="claude/verify-root-files-placement-B4mK1"
BRANCH_REF="origin/${GUARD_BRANCH}"
LAST_COMMIT_FILE=".last-deploy-commit"

# INFRA_FILES : fichiers Docker/infrastructure protégés contre les écrasements
# par Figma Make. Ces fichiers n'existent pas sur Figma Make et doivent être
# restaurés depuis la guard branch après chaque merge.
INFRA_FILES=(
  "Dockerfile"
  "Dockerfile.prerender"
  "docker-compose.yml"
  "docker-entrypoint.sh"
  "prerender-entrypoint.sh"
  ".dockerignore"
  ".env.example"
  ".npmrc"
  "package.json"
  "nginx/nginx.conf"
  "src/scripts/prerender.cjs"
  "src/scripts/seo-ci-check.sh"
  "src/scripts/seo-validate.sh"
)

# NOTE: package.json est dans INFRA_FILES car Figma Make ne gère pas les
# dépendances serveur (puppeteer, etc.). La version de référence est sur
# la guard branch. Mettre à jour la guard branch si de nouvelles dépendances
# sont nécessaires.

# ── Helpers ──────────────────────────────────────────────────────────────────
is_true() {
  local v="${1:-}"
  [[ "${v,,}" =~ ^(1|true|yes|on)$ ]]
}

join_unique() {
  tr ' ' '\n' | awk 'NF' | sort -u | paste -sd ',' -
}

extract_lang() {
  local base
  base="$(basename "$1" .ts)"
  if [[ "$base" =~ ^[a-z]{2}$ ]]; then
    echo "$base"
  fi
}

# =============================================================================
# CLASSIFICATION DES FICHIERS MODIFIES
# =============================================================================
classify_file() {
  local file="$1"
  case "$file" in
    *.css|*.scss|*.less|tailwind.config.*|postcss.config.*)
      echo "STYLE_ONLY" ;;
    *.png|*.jpg|*.jpeg|*.gif|*.svg|*.ico|*.woff|*.woff2|*.ttf|*.eot|*.webp)
      echo "STATIC_ONLY" ;;
    public/*)
      echo "STATIC_ONLY" ;;

    # Page routes
    src/App-Landing.tsx)                        echo "/" ;;
    src/APropos.tsx)                            echo "/a-propos" ;;
    src/NotreReseau.tsx)                        echo "/notre-reseau" ;;
    src/NosSecteurs.tsx)                        echo "/nos-secteurs" ;;
    src/Temoignages.tsx)                        echo "/temoignages" ;;
    src/ServiceInterimEuropeen.tsx)             echo "/services/interim-europeen" ;;
    src/ServiceRecrutementSpecialise.tsx)       echo "/services/recrutement-specialise" ;;
    src/ServiceConseilConformite.tsx)           echo "/services/conseil-conformite" ;;
    src/ServiceDetachementPersonnel.tsx)        echo "/services/detachement-personnel" ;;
    src/ServiceDetachementBTP.tsx)              echo "/services/detachement-btp" ;;
    src/ServiceDetachementIndustrie.tsx)        echo "/services/detachement-industrie" ;;
    src/BlogDirective.tsx)                      echo "/blog/directive-detachement-europe" ;;
    src/BlogList.tsx)                            echo "/blog" ;;
    src/BlogPost.tsx)                            echo "/blog" ;;
    src/DemandeDevis.tsx)                       echo "/devis" ;;
    src/Privacy.tsx)                            echo "/privacy" ;;
    src/Legal.tsx)                              echo "/legal" ;;
    src/CGV.tsx)                                echo "/cgv" ;;

    # i18n per page
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
    src/src/i18n/services/detachementBtp/*)    echo "/services/detachement-btp" ;;
    src/src/i18n/services/detachementIndustrie/*) echo "/services/detachement-industrie" ;;
    src/src/i18n/blog/directiveDetachement/*)  echo "/blog/directive-detachement-europe" ;;
    src/src/i18n/devis/locales/*)              echo "/devis" ;;

    # Shared components → full prerender
    src/App.tsx|src/components/SEOHead.tsx|src/components/landing/Footer.tsx|\
src/components/landing/EuropeMap.tsx|src/components/shared/*|\
src/src/i18n/seo/*|src/src/i18n/index.ts|src/src/i18n/types.ts|\
src/src/i18n/constants.ts|src/lib/i18nRouting.ts|\
src/src/i18n/pages/index.ts|src/src/i18n/pages/usePageTranslation.ts|\
src/src/i18n/services/index.ts|src/src/i18n/services/useServiceTranslation.ts|\
vite.config.*|src/scripts/prerender.cjs|index.html)
      echo "SHARED" ;;

    *) echo "" ;;
  esac
}

# =============================================================================
# DETECTION INTELLIGENTE
# =============================================================================
detect_changed_routes() {
  local last_commit="$1"
  local changed_files
  changed_files="$(git diff --name-only "${last_commit}"..HEAD 2>/dev/null || true)"

  if [[ -z "$changed_files" ]]; then
    echo "NO_CHANGES"
    return
  fi

  local pages="" langs=""
  local has_shared=false has_content=false has_style_or_static=false
  local needs_all_langs=false

  while IFS= read -r file; do
    [[ -z "$file" ]] && continue
    local c
    c="$(classify_file "$file")"

    case "$c" in
      SHARED)        has_shared=true ;;
      STYLE_ONLY|STATIC_ONLY) has_style_or_static=true ;;
      "")            : ;;
      *)
        has_content=true
        pages+=" $c"
        local lang
        lang="$(extract_lang "$file" || true)"
        if [[ -n "${lang:-}" ]]; then
          langs+=" $lang"
        else
          needs_all_langs=true
        fi
        ;;
    esac
  done <<< "$changed_files"

  if [[ "$has_shared" == true ]]; then
    echo "FULL"; return
  fi
  if [[ "$has_content" == true ]]; then
    local unique_pages unique_langs
    unique_pages="$(echo "$pages" | join_unique)"
    if [[ "$needs_all_langs" == true ]]; then
      unique_langs=""
    else
      unique_langs="$(echo "$langs" | join_unique || true)"
    fi
    echo "SMART|${unique_pages}|${unique_langs}"; return
  fi
  if [[ "$has_style_or_static" == true ]]; then
    echo "NO_PRERENDER"; return
  fi
  echo "NO_PRERENDER"
}

# =============================================================================
# Restauration des fichiers infrastructure (SANS commit)
# Copie les fichiers depuis la guard branch dans le working directory.
# Pas de git add, pas de commit → zéro divergence avec origin/main.
# =============================================================================
restore_infra_files() {
  local ref="$1"

  echo "Restoring infra files from guard branch (working dir only)..."
  local restored=0
  for file in "${INFRA_FILES[@]}"; do
    if git cat-file -e "${ref}:${file}" 2>/dev/null; then
      # Créer le dossier parent si nécessaire
      local dir
      dir="$(dirname "$file")"
      [[ "$dir" != "." ]] && mkdir -p "$dir"
      # Copier le contenu sans staging (git show au lieu de git checkout)
      git show "${ref}:${file}" > "$file"
      restored=$((restored + 1))
    else
      echo "   Introuvable: $file"
    fi
  done
  echo "   ${restored} fichier(s) infra restauré(s) (non commités)."
}

# =============================================================================
# EXECUTION
# =============================================================================
echo "============================================"
echo "  YoJob - Update from Figma Make"
echo "============================================"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Branche actuelle: '$CURRENT_BRANCH'. Ce script doit tourner sur 'main'."
  exit 1
fi

echo ""
echo "Fetching latest changes..."
git fetch origin --prune

if ! git show-ref --verify --quiet "refs/remotes/${BRANCH_REF}"; then
  echo "Guard branch not found, fetching..."
  git fetch origin "${GUARD_BRANCH}:${GUARD_BRANCH}" 2>/dev/null || true
  if git show-ref --verify --quiet "refs/heads/${GUARD_BRANCH}"; then
    BRANCH_REF="${GUARD_BRANCH}"
  else
    BRANCH_REF=""
    echo "Guard branch indisponible, restauration protégée ignorée."
  fi
fi

# ── Sauvegarder les fichiers locaux avant reset ─────────────────────────────
ENV_BACKUP=""
if [[ -f .env ]]; then
  ENV_BACKUP="$(mktemp)"
  cp .env "$ENV_BACKUP"
  echo "Fichier .env sauvegardé."
fi

LAST_DEPLOY_BACKUP=""
if [[ -f "$LAST_COMMIT_FILE" ]]; then
  LAST_DEPLOY_BACKUP="$(cat "$LAST_COMMIT_FILE")"
  echo "Dernier deploy: ${LAST_DEPLOY_BACKUP:0:8}"
fi

# ── Reset local main = origin/main (zéro divergence) ────────────────────────
echo "Synchronisation avec origin/main (reset --hard)..."
git reset --hard origin/main
echo "   Local main synchronisé avec origin/main ($(git rev-parse --short HEAD))"

# Restaurer le fichier de tracking du dernier deploy
if [[ -n "${LAST_DEPLOY_BACKUP:-}" ]]; then
  echo "$LAST_DEPLOY_BACKUP" > "$LAST_COMMIT_FILE"
fi

# ── Gérer le cas src/public/ -> public/ (Figma Make artifact) ────────────────
if [[ -d "src/public" ]]; then
    echo "Moving files from src/public/ to public/..."
    mkdir -p public
    shopt -s nullglob dotglob
    cp -r src/public/* public/ 2>/dev/null || true
    shopt -u nullglob dotglob
    rm -rf src/public
fi

# ── Restaurer les fichiers infra (working dir only, pas de commit) ───────────
if [[ -n "$BRANCH_REF" ]]; then
  restore_infra_files "$BRANCH_REF"
fi

# ── Restaurer le fichier .env ────────────────────────────────────────────────
if [[ -n "${ENV_BACKUP:-}" && -f "$ENV_BACKUP" ]]; then
  cp "$ENV_BACKUP" .env
  rm -f "$ENV_BACKUP"
  echo "Fichier .env restauré."
fi

# =============================================================================
# DETERMINATION DU MODE PRERENDER
# =============================================================================
echo ""
echo "-- Prerender Decision --"

USER_FULL="${FULL_PRERENDER:-}"
USER_LANGS="${PRERENDER_LANGS:-}"
USER_PAGES="${PRERENDER_PAGES:-}"
unset PRERENDER_LANGS PRERENDER_PAGES 2>/dev/null || true

NEED_PRERENDER=false

if is_true "$USER_FULL"; then
  echo "Mode: COMPLET (forcé via FULL_PRERENDER=1)"
  echo "   -> Toutes langues x toutes pages (~300 routes)"
  NEED_PRERENDER=true

elif [[ -n "$USER_LANGS" || -n "$USER_PAGES" ]]; then
  if [[ "$USER_LANGS" == "NONE" ]]; then
    echo "Prerender SKIP (forcé via PRERENDER_LANGS=NONE)"
    NEED_PRERENDER=false
    export PRERENDER_LANGS="NONE"
  else
    echo "Mode: CIBLE (forcé via variables d'environnement)"
    echo "   -> langs=${USER_LANGS:-toutes} pages=${USER_PAGES:-toutes}"
    NEED_PRERENDER=true
    [[ -n "$USER_LANGS" ]] && export PRERENDER_LANGS="$USER_LANGS"
    [[ -n "$USER_PAGES" ]] && export PRERENDER_PAGES="$USER_PAGES"
  fi

else
  # ── Mode AUTO ──
  DETECTION="FULL"

  if [[ -f "$LAST_COMMIT_FILE" ]]; then
    LAST_COMMIT="$(cat "$LAST_COMMIT_FILE")"
    if git rev-parse --verify "$LAST_COMMIT" >/dev/null 2>&1; then
      echo "Auto-détection des changements depuis ${LAST_COMMIT:0:8}..."
      DETECTION="$(detect_changed_routes "$LAST_COMMIT")"
    else
      echo "Commit de référence introuvable -> prerender FR."
    fi
  else
    echo "Premier déploiement -> prerender FR."
  fi

  DETECT_MODE="$(echo "$DETECTION" | cut -d'|' -f1)"

  case "$DETECT_MODE" in
    NO_CHANGES)
      echo "Aucun changement de contenu. Pages pré-rendues conservées dans le volume."
      NEED_PRERENDER=false
      ;;
    NO_PRERENDER)
      echo "Changements CSS/assets uniquement. Pages pré-rendues conservées dans le volume."
      NEED_PRERENDER=false
      ;;
    FULL)
      echo "Composant partagé modifié -> prerender FR."
      NEED_PRERENDER=true
      export PRERENDER_LANGS=fr
      ;;
    SMART)
      DETECTED_PAGES="$(echo "$DETECTION" | cut -d'|' -f2)"
      DETECTED_LANGS="$(echo "$DETECTION" | cut -d'|' -f3)"
      echo "Prerender ciblé: pages=${DETECTED_PAGES} langs=${DETECTED_LANGS:-toutes}"
      NEED_PRERENDER=true
      export PRERENDER_PAGES="$DETECTED_PAGES"
      [[ -n "$DETECTED_LANGS" ]] && export PRERENDER_LANGS="$DETECTED_LANGS"
      ;;
    *)
      echo "Mode inconnu (${DETECT_MODE}) -> prerender FR."
      NEED_PRERENDER=true
      export PRERENDER_LANGS=fr
      ;;
  esac
fi

# =============================================================================
# DOCKER BUILD & DEPLOY
# =============================================================================
echo ""
echo "-- Docker Build --"

if [[ ! -f docker-compose.yml ]]; then
  echo "docker-compose.yml non trouvé."
  exit 1
fi

# STEP 1 : Build l'image avec cache-bust (évite que Docker serve l'ancien build)
# Le CACHEBUST ARG dans le Dockerfile invalide le cache à partir du COPY --from=builder
echo "Building landing page (nginx)..."
CACHEBUST="$(date +%s)"
docker compose build --build-arg CACHEBUST="$CACHEBUST" yojob-landing

# STEP 2 : Déployer le conteneur (toujours force-recreate pour utiliser la nouvelle image)
echo "Deploying landing page..."
docker compose up -d --force-recreate --remove-orphans yojob-landing

# STEP 3 : Prerender si nécessaire (conteneur dédié)
if [[ "$NEED_PRERENDER" == true ]]; then
  echo ""
  echo "-- Prerender --"
  echo "   PRERENDER_LANGS=${PRERENDER_LANGS:-<all>}"
  echo "   PRERENDER_PAGES=${PRERENDER_PAGES:-<all>}"
  echo ""

  # Build et run le worker prerender (écrit dans le volume)
  PRERENDER_LANGS="${PRERENDER_LANGS:-}" \
  PRERENDER_PAGES="${PRERENDER_PAGES:-}" \
  docker compose --profile prerender run --rm --build yojob-prerender

  # Restart le landing page pour qu'il charge les nouvelles pages du volume
  echo ""
  echo "Restarting landing page to load new pre-rendered pages..."
  docker compose up -d --force-recreate yojob-landing
else
  echo "Prerender non nécessaire. Pages du volume conservées."
fi

# Sauvegarder le commit déployé (= HEAD de origin/main, pas de commit local)
DEPLOYED_COMMIT="$(git rev-parse HEAD)"
echo "$DEPLOYED_COMMIT" > "$LAST_COMMIT_FILE"
echo ""
echo "Commit déployé: ${DEPLOYED_COMMIT:0:8}"
echo "Local main = origin/main (zéro divergence)"
echo "Update complete!"
