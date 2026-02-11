# =============================================================================
# DOCKERFILE - YoJob Landing Page
# Build Vite + Nginx (SANS Chromium, SANS prerender)
# Le prerender est géré par le conteneur dédié yojob-prerender
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1 : BUILD (Node.js)
# -----------------------------------------------------------------------------
FROM node:20-bullseye AS builder

WORKDIR /app

COPY package.json .npmrc ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --legacy-peer-deps

COPY . .

ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_APP_ENV=production
ARG VITE_MATOMO_TAG_MANAGER_URL

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_MATOMO_TAG_MANAGER_URL=$VITE_MATOMO_TAG_MANAGER_URL

RUN npm run build

# -----------------------------------------------------------------------------
# STAGE 2 : PRODUCTION (Nginx Alpine)
# -----------------------------------------------------------------------------
FROM nginx:1.25-alpine AS production

RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Cache-bust : force Docker à recopier le build même si les layers sont cached
# Passé via --build-arg CACHEBUST=$(date +%s) dans update-from-figma.sh
ARG CACHEBUST=0
COPY --from=builder /app/build /usr/share/nginx/html

# Entrypoint : restaure les pages pré-rendues depuis le volume cache
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
