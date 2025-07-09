# Use official PHP image with necessary extensions
FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application
COPY . /var/www

# Install dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Copy existing entrypoint script if you have, otherwise you can create
# RUN chmod +x /var/www/entrypoint.sh
# ENTRYPOINT ["/var/www/entrypoint.sh"]

# Expose port 9000 for php-fpm
EXPOSE 9000

# Start php-fpm
CMD ["php-fpm"]
