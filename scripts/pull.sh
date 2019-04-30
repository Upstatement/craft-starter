#!/bin/bash
#
# Usage: ./scripts/pull.sh [environment]
#
# Pulls database and local assets from target environment into current environment.
#

set -e

FROM=${1:-prod}
FROM=$(echo $FROM | awk '{print toupper($0)}')

# Load Craft environment variables for current environment.
if [ -f .env ]; then
    source .env
else
    echo "Missing .env file!"
    exit 1
fi

# Define all variables required for pull ops.
source scripts/vars.sh

main() {
    echo "Starting craft pull from $FROM ..."
    echo "............................"

    pull_craft_db
    pull_craft_assets
    clear_craft_caches

    echo "............................"
    echo "Craft pull complete!"
}

pull_craft_db() {
    echo "Pulling craft database ..."

    echo "Dumping remote database ..."
    if [ $FROM_SSH_USER ]; then
        ssh $FROM_SSH_USER@$FROM_SSH_HOST "$FROM_MYSQLDUMP | gzip -c" | gunzip > $FROM_DB_DATABASE.sql
    else
        $FROM_MYSQLDUMP > $FROM_DB_DATABASE.sql
    fi

    echo "Backing up local database ..."
    $MYSQLDUMP > $TO_DB_DATABASE.sql

    echo "Dropping local database ..."
    $MYSQL -e "DROP DATABASE $TO_DB_DATABASE; CREATE DATABASE $TO_DB_DATABASE;"

    echo "Importing remote database ..."
    $MYSQL < $FROM_DB_DATABASE.sql

    echo "Cleaning up dumpfiles ..."
    rm $FROM_DB_DATABASE.sql $TO_DB_DATABASE.sql

    echo "Craft database pull complete!"
}

pull_craft_assets() {
    echo "Pulling craft assets ..."

    if [ $FROM_SSH_USER ]; then
        for ASSET_PATH in $ASSET_PATHS; do
            rsync -azL -e ssh $FROM_SSH_USER@$FROM_SSH_HOST:"${FROM_BASE_PATH}/${ASSET_PATH}/" "${TO_BASE_PATH}/${ASSET_PATH}/"
        done
    else
        for ASSET_PATH in $ASSET_PATHS; do
            rsync -azL "${FROM_BASE_PATH}/${ASSET_PATH}/" "${TO_BASE_PATH}/${ASSET_PATH}/"
        done
    fi

    echo "Craft asset pull complete!"
}

clear_craft_caches() {
    echo "Flushing all application caches ..."

    $CRAFT_CMD cache/flush-all

    echo "All craft caches cleared!"
}

main
