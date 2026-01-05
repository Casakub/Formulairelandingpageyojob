#!/bin/bash
# =============================================================================
# SCRIPT DE MISE À JOUR - YoJob Landing Page
# Exécuter depuis le serveur Hostinger pour mettre à jour l'application
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

# Étape 1: Récupérer les dernières modifications
log_info "Récupération des dernières modifications..."
git fetch origin
git pull origin main
log_success "Code mis à jour depuis GitHub"

# Étape 2: Arrêter le container existant (si présent)
log_info "Arrêt du container existant..."
docker-compose down 2>/dev/null || true
log_success "Container arrêté"

# Étape 3: Reconstruire l'image
log_info "Reconstruction de l'image Docker..."
docker-compose build --no-cache
log_success "Image reconstruite"

# Étape 4: Démarrer le nouveau container
log_info "Démarrage du nouveau container..."
docker-compose up -d
log_success "Container démarré"

# Étape 5: Nettoyer les anciennes images
log_info "Nettoyage des images inutilisées..."
docker image prune -f 2>/dev/null || true
log_success "Nettoyage terminé"

# Afficher le statut
echo ""
echo "=============================================="
log_success "MISE À JOUR TERMINÉE !"
echo "=============================================="
echo ""
log_info "Statut du container:"
docker-compose ps
echo ""
log_info "L'application est accessible sur: http://localhost:3000"
log_info "Logs: docker-compose logs -f"
echo ""
