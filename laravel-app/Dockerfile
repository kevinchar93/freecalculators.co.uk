# syntax=docker/dockerfile:1

# --- builder ------------------------------------------------------------
# One stage does both composer install and npm build, because the Vite
# build needs PHP: the @laravel/vite-plugin-wayfinder plugin shells out to
# `php artisan wayfinder:generate` to read the app's routes, so `vendor/`
# and the app code must exist *before* `npm run build` runs.
FROM dunglas/frankenphp:1.12-php8.4 AS builder

# install nodejs and other necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl ca-certificates gnupg unzip \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

  # copy composer binary from the official composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-interaction --no-progress --optimize-autoloader

COPY . .

# Dummy values so `artisan` (needed by composer's post-autoload scripts and
# by wayfinder:generate) can boot without the real, secret runtime config —
# the real values come from DO env vars at container *run* time, never
# baked into this image.
ENV APP_ENV=production \
    APP_KEY=base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA= \
    APP_DEBUG=false \
    DB_CONNECTION=sqlite \
    SESSION_DRIVER=cookie \
    CACHE_STORE=file \
    QUEUE_CONNECTION=sync

RUN composer run-script post-autoload-dump

RUN npm ci
RUN npm run build

RUN rm -rf node_modules

# --- runtime --------------------------------------------------------------
FROM dunglas/frankenphp:1.12-php8.4

# DO App Platform's http_port for this app is set to 8080 to match.
ENV SERVER_NAME=:8080

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

WORKDIR /app

COPY --from=builder /app /app

# storage/ and bootstrap/cache/ are where Laravel writes logs, the file
# cache (CACHE_STORE=file), and compiled view templates — the web server
# user needs write access to them.
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 8080
