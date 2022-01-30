FROM php:8.0.7-apache

# Install Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Install unzip utility and libs needed by zip PHP extension 
RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libzip-dev \
    unzip
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install opcache
RUN docker-php-ext-install calendar 
RUN a2enmod rewrite