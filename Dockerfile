FROM php:8.3-apache

ARG APP_URL
ARG ASSET_URL
ARG VITE_SERVER_ORIGIN

ENV APP_URL=${APP_URL}
ENV ASSET_URL=${ASSET_URL}
ENV VITE_SERVER_ORIGIN=${VITE_SERVER_ORIGIN}

# Install dependencies + mysql client
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libzip-dev zip unzip git curl \
    default-mysql-client nano \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (supaya npm run build bisa jalan DI Docker build)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Enable Apache rewrite
RUN a2enmod rewrite

# Set working dir
WORKDIR /var/www/html/deploy/monitoringmesin

# Copy semua kode Laravel
COPY . .

# Install composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# ========== FRONTEND BUILD OTOMATIS ==========
WORKDIR /var/www/html/deploy/monitoringmesin

# Install Node dependencies dan build assets
RUN npm install \
    && npm run build \
    && rm -rf node_modules
# (node_modules dihapus agar image lebih kecil)

# ========== END FRONTEND BUILD ==========

# Set Apache DocumentRoot ke public/
RUN sed -i 's!/var/www/html!/var/www/html/deploy/monitoringmesin/public!' /etc/apache2/sites-available/000-default.conf

# Permission Laravel
RUN chown -R www-data:www-data /var/www/html/deploy/monitoringmesin/storage /var/www/html/deploy/monitoringmesin/bootstrap/cache \
    && chmod -R 775 /var/www/html/deploy/monitoringmesin/storage /var/www/html/deploy/monitoringmesin/bootstrap/cache

EXPOSE 80
CMD ["apache2-foreground"]