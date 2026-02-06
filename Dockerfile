# =============================================================================
# DOCKERFILE - YoJob Landing Page
# Multi-stage build : Node.js (build) → Nginx (serve)
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1 : BUILD
# Utilise Node.js pour installer les dépendances et builder l'application
# -----------------------------------------------------------------------------
FROM node:20-bullseye AS builder

# Définir le répertoire de travail
WORKDIR /app

# Puppeteer: use system Chromium to avoid large downloads
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install Chromium for prerendering
RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium \
  && rm -rf /var/lib/apt/lists/*


# Copier les fichiers de configuration npm AVANT le code source
# Cela permet de mettre en cache les dépendances npm
COPY package.json ./
COPY .npmrc ./

# Installer les dépendances
# --legacy-peer-deps pour éviter les conflits de versions
RUN npm config set registry https://registry.npmjs.org/

RUN npm install --legacy-peer-deps

# Copier tout le code source
COPY . .

# Variables d'environnement pour le build (Vite les injecte au build-time)
# Ces valeurs seront remplacées par docker-compose via args
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_APP_ENV=production
ARG VITE_MATOMO_TAG_MANAGER_URL
ARG PRERENDER_LANGS
ARG PRERENDER_PAGES

# Exposer les ARG comme ENV pour que Vite puisse les lire
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_MATOMO_TAG_MANAGER_URL=$VITE_MATOMO_TAG_MANAGER_URL
ENV PRERENDER_LANGS=$PRERENDER_LANGS
ENV PRERENDER_PAGES=$PRERENDER_PAGES
ENV PRERENDER_PREVIEW_TIMEOUT=$PRERENDER_PREVIEW_TIMEOUT
ENV PRERENDER_HOST=$PRERENDER_HOST

# Builder l'application (output dans /app/build/)
RUN npm run build && if [ -f src/scripts/prerender.cjs ] && node -e 'require.resolve("puppeteer")' >/dev/null 2>&1; then node src/scripts/prerender.cjs; else echo "Skipping prerender (puppeteer missing)"; fi

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
