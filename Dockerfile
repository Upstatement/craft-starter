FROM php:7.2-apache

# Add system-wide OS packages
RUN apt-get update && apt-get install -y \
	curl \
	git \
	libjpeg-dev \
	libicu-dev \
	libpng-dev \
	libxml2-dev \
	msmtp \
	mariadb-client \
	unzip \
	&& rm -rf /var/lib/apt/lists/*

# Configure PHP
RUN docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr; \
	docker-php-ext-install gd intl pdo_mysql soap zip

COPY docker/php.ini /usr/local/etc/php/php.ini

# Configure Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite headers

# Add Composer
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /tmp/composer

RUN curl -sS https://getcomposer.org/installer | php && \
	chmod +x composer.phar && \
	mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html

# Install Craft and all other project dependencies
COPY --chown=www-data:www-data plugins /var/www/html/plugins
COPY --chown=www-data:www-data modules /var/www/html/modules
COPY --chown=www-data:www-data composer.json composer.lock /var/www/html/

RUN composer install && \
	composer clear-cache && \
	chown -R www-data:www-data vendor

# Add project source files
COPY --chown=www-data:www-data . /var/www/html

# Ensure system timezone is consistent with Arcustech servers
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
