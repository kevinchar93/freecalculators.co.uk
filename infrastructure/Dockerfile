# syntax=docker/dockerfile:1

# Build context is the AdonisJS app directory (webapp/), e.g.
#   podman build -f infrastructure/Dockerfile webapp
# DigitalOcean does the same via `source_dir: webapp` in the app spec.

# --- builder ------------------------------------------------------------
# Compiles the TypeScript backend and the Vite frontend bundle into
# build/, a standalone app with its own package.json.
FROM node:24-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines VITE_* variables into the frontend bundle at build time.
ARG VITE_APP_NAME=freecalculators.co.uk
ENV VITE_APP_NAME=$VITE_APP_NAME

RUN node ace build

# Production dependencies only for the compiled app.
RUN cd build && npm ci --omit=dev

# --- runtime --------------------------------------------------------------
FROM node:24-slim

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080

WORKDIR /app

COPY --from=builder --chown=node:node /app/build /app

USER node

# DO App Platform's http_port for this app is set to 8080 to match.
EXPOSE 8080

CMD ["node", "bin/server.js"]
