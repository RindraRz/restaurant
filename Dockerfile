FROM php:8.2-fpm

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    zlib1g-dev \
    libzip-dev \
    git \
    unzip \
    nginx \  # Ajoutez Nginx
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql xml zip

# Configurer pkg-config pour libzip
ENV PKG_CONFIG_PATH /usr/lib/x86_64-linux-gnu/pkgconfig
ENV LIBZIP_CFLAGS "-I/usr/include"
ENV LIBZIP_LIBS "-L/usr/lib/x86_64-linux-gnu -lzip"

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Créer un utilisateur non-root pour l'application
RUN useradd -m appuser && chown -R appuser /var/www/html

# Créer un utilisateur pour Nginx
RUN useradd -r -s /bin/false nginxuser

# Donner les permissions nécessaires à Nginx
RUN mkdir -p /var/lib/nginx/body /var/log/nginx /var/cache/nginx
RUN chown -R nginxuser:nginxuser /var/lib/nginx /var/log/nginx /var/cache/nginx
RUN chmod -R 755 /var/lib/nginx /var/log/nginx /var/cache/nginx

# Copier les fichiers de l'application
COPY --chown=appuser . /var/www/html

# Définir le répertoire de travail
WORKDIR /var/www/html

# Vider manuellement le cache
RUN rm -rf var/cache/* var/log/*
RUN mkdir -p var/cache var/log
RUN chmod -R 777 var/cache var/log

# Installer les dépendances Composer (sans scripts)
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs --no-scripts



# Copier la configuration Nginx
COPY --chown=nginxuser ./docker/nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 pour Nginx
EXPOSE 80

# Basculer vers l'utilisateur Nginx
USER nginxuser

# Lancer Nginx et PHP-FPM
CMD ["sh", "-c", "nginx && php-fpm"]
