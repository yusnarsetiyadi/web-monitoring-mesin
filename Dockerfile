FROM php:8.3-apache

# Install dependencies + mysql client
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libzip-dev zip unzip git curl \
    default-mysql-client nano \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite
RUN a2enmod rewrite

# Set working dir
WORKDIR /var/www/html/deploy/monitoringmesin

# Copy Laravel files ke dalam container
COPY . /var/www/html/deploy/monitoringmesin

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Set Apache DocumentRoot ke public/
RUN sed -i 's!/var/www/html!/var/www/html/deploy/monitoringmesin/public!' /etc/apache2/sites-available/000-default.conf

# Permission Laravel
RUN chown -R www-data:www-data /var/www/html/deploy/monitoringmesin/storage /var/www/html/deploy/monitoringmesin/bootstrap/cache \
    && chmod -R 775 /var/www/html/deploy/monitoringmesin/storage /var/www/html/deploy/monitoringmesin/bootstrap/cache

EXPOSE 80
CMD ["apache2-foreground"]
