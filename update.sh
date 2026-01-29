#!/bin/bash
# =============================================================================
# SCRIPT DE MISE À JOUR - YoJob Landing Page
# Récupère les derniers fichiers depuis Figma Make (branche main) et rebuild
#
# Usage:
#   ./update.sh           # Mise à jour complète (pull + rebuild + restart)
#   ./update.sh --pull    # Uniquement pull les changements
#   ./update.sh --build   # Uniquement rebuild et restart
#   ./update.sh --status  # Afficher le statut actuel
# =============================================================================

set -e

# Configuration
REPO_URL="https://github.com/Casakub/Formulairelandingpageyojob"
SOURCE_BRANCH="main"
DOCKER_BRANCH="claude/docker-compose-setup-R4UoP"
CONTAINER_NAME="yojob-landing-page"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Afficher le statut
show_status() {
    echo ""
    echo "=== YoJob Landing Page - Status ==="
    echo ""
    log_info "Repository: $REPO_URL"
    log_info "Source Branch (Figma Make): $SOURCE_BRANCH"
    log_info "Docker Branch: $DOCKER_BRANCH"
    echo ""

    # Git status
    log_info "Git Status:"
    git status --short
    echo ""

    # Docker status
    log_info "Docker Container Status:"
    if docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -q "$CONTAINER_NAME"; then
        docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "$CONTAINER_NAME"
    else
        log_warning "Container '$CONTAINER_NAME' not found"
    fi
    echo ""

    # Derniers commits
    log_info "Last 3 commits on current branch:"
    git log --oneline -3
    echo ""
}

# Pull les changements depuis main
pull_changes() {
    log_info "Fetching latest changes from origin..."
    git fetch origin

    log_info "Merging changes from $SOURCE_BRANCH into current branch..."

    # Vérifier s'il y a des changements locaux non commités
    if [[ -n $(git status --porcelain) ]]; then
        log_warning "Uncommitted changes detected. Stashing..."
        git stash
        STASHED=true
    fi

    # Merger les changements de main
    if git merge origin/$SOURCE_BRANCH -m "Merge Figma Make updates from $SOURCE_BRANCH"; then
        log_success "Changes merged successfully!"
    else
        log_error "Merge conflict detected! Please resolve manually."
        if [[ "$STASHED" == true ]]; then
            log_info "Restoring stashed changes..."
            git stash pop
        fi
        exit 1
    fi

    # Restaurer les changements stashés
    if [[ "$STASHED" == true ]]; then
        log_info "Restoring stashed changes..."
        git stash pop
    fi

    log_success "Pull completed!"
}

# Build et restart le container
build_and_restart() {
    log_info "Stopping current container..."
    docker-compose down || true

    log_info "Building new image..."
    docker-compose build --no-cache

    log_info "Starting container..."
    docker-compose up -d

    log_info "Waiting for container to be healthy..."
    sleep 5

    # Vérifier le statut
    if docker ps | grep -q "$CONTAINER_NAME"; then
        log_success "Container is running!"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "$CONTAINER_NAME"
    else
        log_error "Container failed to start. Check logs with: docker-compose logs"
        exit 1
    fi
}

# Nettoyage des anciennes images
cleanup() {
    log_info "Cleaning up old Docker images..."
    docker image prune -f
    log_success "Cleanup completed!"
}

# Main
main() {
    echo ""
    echo "=============================================="
    echo "  YoJob Landing Page - Update Script"
    echo "=============================================="
    echo ""

    case "${1:-}" in
        --pull)
            pull_changes
            ;;
        --build)
            build_and_restart
            ;;
        --status)
            show_status
            ;;
        --cleanup)
            cleanup
            ;;
        --help|-h)
            echo "Usage: $0 [OPTION]"
            echo ""
            echo "Options:"
            echo "  (none)      Full update: pull + build + restart"
            echo "  --pull      Only pull changes from main branch"
            echo "  --build     Only rebuild and restart container"
            echo "  --status    Show current status"
            echo "  --cleanup   Remove old Docker images"
            echo "  --help      Show this help message"
            echo ""
            ;;
        *)
            # Full update
            pull_changes
            echo ""
            build_and_restart
            echo ""
            cleanup
            echo ""
            log_success "=== Update completed successfully! ==="
            echo ""
            echo "Application is running at: http://localhost:3000"
            echo ""
            ;;
    esac
}

main "$@"
