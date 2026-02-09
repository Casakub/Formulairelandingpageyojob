# =============================================================================
# DOCKERFILE - YoJob Landing Page
# Multi-stage build : Node.js (build) → Nginx (serve)
# OPTIMISE : build et prerender en layers séparés pour un cache Docker efficace
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1 : BUILD
# -----------------------------------------------------------------------------
FROM node:20-bullseye AS builder

WORKDIR /app

# Puppeteer: use system Chromium to avoid large downloads
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install Chromium for prerendering
RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium \
  && rm -rf /var/lib/apt/lists/*

# Copier les fichiers de configuration npm AVANT le code source (cache npm)
COPY package.json ./
COPY .npmrc ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm install --legacy-peer-deps

# Copier tout le code source
COPY . .

# Variables d'environnement Vite (injectées au build-time)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_APP_ENV=production
ARG VITE_MATOMO_TAG_MANAGER_URL

ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_MATOMO_TAG_MANAGER_URL=$VITE_MATOMO_TAG_MANAGER_URL

# ── STEP 1 : Build Vite (layer cachée tant que le code source ne change pas) ─
RUN npm run build

# ── STEP 2 : Prerender (layer séparée, ne casse PAS le cache du build) ───────
# Les ARGs PRERENDER sont définis APRES le build : changer PRERENDER_LANGS
# n'invalide pas le cache du "npm run build" ci-dessus.
ARG PRERENDER_LANGS
ARG PRERENDER_PAGES
ARG PRERENDER_CONTINUE_ON_ERROR
ARG PRERENDER_NAV_TIMEOUT
ARG PRERENDER_RETRY_LIMIT

ENV PRERENDER_LANGS=$PRERENDER_LANGS
ENV PRERENDER_PAGES=$PRERENDER_PAGES
ENV PRERENDER_CONTINUE_ON_ERROR=$PRERENDER_CONTINUE_ON_ERROR
ENV PRERENDER_NAV_TIMEOUT=$PRERENDER_NAV_TIMEOUT
ENV PRERENDER_RETRY_LIMIT=$PRERENDER_RETRY_LIMIT

RUN if [ "$PRERENDER_LANGS" = "NONE" ]; then \
      echo "⏭️  Prerender SKIP (PRERENDER_LANGS=NONE)"; \
    elif [ -f src/scripts/prerender.cjs ] && node -e 'require.resolve("puppeteer")' >/dev/null 2>&1; then \
      echo "🔄 Prerender START (langs=${PRERENDER_LANGS:-all} pages=${PRERENDER_PAGES:-all})..." && \
      node src/scripts/prerender.cjs; \
    else \
      echo "⏭️  Prerender SKIP (puppeteer missing)"; \
    fi

# -----------------------------------------------------------------------------
# STAGE 2 : PRODUCTION (Nginx Alpine)
# -----------------------------------------------------------------------------
FROM nginx:1.25-alpine AS production

RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
