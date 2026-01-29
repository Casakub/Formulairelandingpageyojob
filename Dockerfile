# =============================================================================
# DOCKERFILE - YoJob Landing Page
# Multi-stage build : Node.js (build) → Nginx (serve)
# Compatible avec Figma Make updates
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1 : BUILD
# Utilise Node.js pour installer les dépendances et builder l'application
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration npm AVANT le code source
# Cela permet de mettre en cache les dépendances npm
COPY package.json ./
COPY .npmrc ./

# Installer les dépendances
# --legacy-peer-deps pour éviter les conflits de versions
RUN npm install --legacy-peer-deps

# Copier tout le code source
COPY . .

# Variables d'environnement pour le build (Vite les injecte au build-time)
# Ces valeurs seront remplacées par docker-compose via args
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_APP_ENV=production

# Exposer les ARG comme ENV pour que Vite puisse les lire
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_APP_ENV=$VITE_APP_ENV

# Builder l'application (output dans /app/build/)
RUN npm run build

# -----------------------------------------------------------------------------
# STAGE 2 : PRODUCTION
# Utilise Nginx Alpine pour servir les fichiers statiques
# -----------------------------------------------------------------------------
FROM nginx:1.25-alpine AS production

# Supprimer la configuration nginx par défaut
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copier la configuration nginx personnalisée
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le stage précédent
COPY --from=builder /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Healthcheck pour vérifier que nginx répond
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Démarrer nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
