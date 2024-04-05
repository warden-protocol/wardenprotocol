#!/bin/sh

set -ex

replace_var() {
    # $1 var name
    # $2 file name
    eval "value=\$$1"
    if [ -z "$value" ]; then
        echo "WARN: Undefined variable $1"
        sed -i "s,%$1%,,g" $2
    else
        echo "Setting variable $1"
        sed -i "s,%$1%,$value,g" $2
    fi
}

if [ "$1" = 'nginx-fe' ]; then

    # go through all JS files and replace %VAR_NAME% with VAR_NAME value from env variables
    find /var/www/app -type f -name "*.js" | while read filename; do
        replace_var FAUCET_URL "$filename"
        replace_var WARDEN_RPC_URL "$filename"
        replace_var WARDEN_REST_URL "$filename"
        replace_var WARDEN_CHAIN_ID "$filename"
        replace_var WARDEN_CHAIN_ID_NUM "$filename"
        replace_var WARDEN_CHAIN_NAME "$filename"
        replace_var WARDEN_COSMOSKIT_CHAIN_NAME "$filename"
        replace_var WARDEN_MAINTENANCE "$filename"
        replace_var WARDEN_SNAP_ORIGIN "$filename"
        replace_var WARDEN_ENVIRONMENT "$filename"
        replace_var WARDEN_STORYBLOK_TOKEN "$filename"
    done

    exec nginx -g "daemon off;"
fi

exec "$@"
