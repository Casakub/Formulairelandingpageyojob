# ==========================================
# Stage 1 : Build
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY .npmrc ./

# Installer les dépendances
RUN npm ci --only=production --ignore-scripts

# Copier le code source
COPY . .

# Build arguments (reçus du docker-compose)
ARG VITE_SUPABASE_PROJECT_ID
ARG VITE_SUPABASE_ANON_KEY
ARG NODE_ENV=production

# Les exposer comme variables d'environnement pour Vite
ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV NODE_ENV=$NODE_ENV

# Afficher les variables (pour debugging - RETIRER EN PROD)
RUN echo "Building with SUPABASE_PROJECT_ID: $VITE_SUPABASE_PROJECT_ID"

# Build de production
RUN npm run build

# Vérifier que le build existe
RUN ls -la /app/build || (echo "Build folder not found!" && exit 1)

# ==========================================
# Stage 2 : Production avec Nginx
# ==========================================
FROM nginx:alpine

# Installer wget pour healthcheck
RUN apk add --no-cache wget

# Copier les fichiers buildés
COPY --from=builder /app/build /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
