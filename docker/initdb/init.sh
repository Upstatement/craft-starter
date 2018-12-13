#!/bin/bash

set -ex

mysql=( mysql -uroot )

if [ ! -z "$MYSQL_ROOT_PASSWORD" ]; then
    mysql+=( -p"${MYSQL_ROOT_PASSWORD}" )
fi

# Create databases if they don't exist
echo "CREATE DATABASE IF NOT EXISTS \`craft\` ;" | "${mysql[@]}"

# Grant permissions to these database to our user
echo "CREATE USER 'craft'@'%' IDENTIFIED BY 'craft' ;" | "${mysql[@]}"
echo "GRANT ALL ON \`craft\`.* TO 'craft'@'%' ;" | "${mysql[@]}"

echo 'FLUSH PRIVILEGES ;' | "${mysql[@]}"

# Import from SQL dumpfiles
gunzip -c "./docker-entrypoint-initdb.d/sql/craft.sql.gz" | "${mysql[@]}" craft;
