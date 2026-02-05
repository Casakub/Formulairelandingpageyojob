# =============================================================================
# DOCKERFILE - YoJob Landing Page (prerender enabled)
# Multi-stage build : Node.js (build + prerender) → Nginx (serve)
# =============================================================================

# -----------------------------------------------------------------------------
# STAGE 1 : BUILD + PRERENDER
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

COPY package.json ./
COPY .npmrc ./

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

# Build + prerender (generates static HTML per route)
RUN npm run build:prerender

# -----------------------------------------------------------------------------
# STAGE 2 : PRODUCTION
# -----------------------------------------------------------------------------
FROM nginx:1.25-alpine AS production

RUN rm -rf /usr/share/nginx/html/* \
  && rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
