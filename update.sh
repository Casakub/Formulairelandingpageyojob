#!/bin/bash
# =============================================================================
# SCRIPT DE MISE À JOUR - YoJob Landing Page
# Récupère UNIQUEMENT le code src depuis Figma/main (sans écraser Docker config)
# =============================================================================
# Usage: ./update.sh
# =============================================================================

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[ATTENTION]${NC} $1"; }
log_error() { echo -e "${RED}[ERREUR]${NC} $1"; }

echo ""
echo "=============================================="
echo "   MISE À JOUR - YoJob Landing Page"
echo "   (Récupère src depuis Figma, garde Docker)"
echo "=============================================="
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "docker-compose.yml" ]; then
    log_error "docker-compose.yml non trouvé !"
    log_error "Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

# Vérifier que Docker est disponible
if ! command -v docker &> /dev/null; then
    log_error "Docker n'est pas installé ou accessible."
    exit 1
fi

# Vérifier le fichier .env
if [ ! -f ".env" ]; then
    log_warning "Fichier .env non trouvé."
    if [ -f ".env.example" ]; then
        log_info "Copie de .env.example vers .env..."
        cp .env.example .env
        log_warning "Pensez à configurer vos variables dans .env !"
    fi
fi

# =============================================================================
# ÉTAPE 1: Récupérer UNIQUEMENT le dossier src depuis main (Figma)
# =============================================================================
log_info "Récupération du code source depuis Figma/main..."
git fetch origin main

# Récupérer SEULEMENT les fichiers qui viennent de Figma (src, index.html, etc.)
# SANS toucher aux fichiers Docker locaux
log_info "Mise à jour du dossier src..."
git checkout origin/main -- src/

log_info "Mise à jour des fichiers de config Vite..."
git checkout origin/main -- index.html package.json vite.config.ts .npmrc 2>/dev/null || true

log_success "Code source mis à jour (Docker config préservée)"

# =============================================================================
# ÉTAPE 2: Arrêter le container existant
# =============================================================================
log_info "Arrêt du container existant..."
docker-compose down 2>/dev/null || true
log_success "Container arrêté"

# =============================================================================
# ÉTAPE 3: Reconstruire l'image avec le nouveau code
# =============================================================================
log_info "Reconstruction de l'image Docker..."
docker-compose build --no-cache
log_success "Image reconstruite"

# =============================================================================
# ÉTAPE 4: Démarrer le nouveau container
# =============================================================================
log_info "Démarrage du nouveau container..."
docker-compose up -d
log_success "Container démarré"

# =============================================================================
# ÉTAPE 5: Nettoyage
# =============================================================================
log_info "Nettoyage des images inutilisées..."
docker image prune -f 2>/dev/null || true
log_success "Nettoyage terminé"

# =============================================================================
# RÉSUMÉ
# =============================================================================
echo ""
echo "=============================================="
log_success "MISE À JOUR TERMINÉE !"
echo "=============================================="
echo ""
log_info "Fichiers mis à jour depuis Figma:"
echo "  - src/ (code source)"
echo "  - index.html, package.json, vite.config.ts"
echo ""
log_info "Fichiers Docker préservés:"
echo "  - Dockerfile"
echo "  - docker-compose.yml"
echo "  - nginx/nginx.conf"
echo "  - .env, .env.example"
echo ""
log_info "Statut du container:"
docker-compose ps
echo ""
log_info "Application: http://localhost:3000"
log_info "Logs: docker-compose logs -f"
echo ""
