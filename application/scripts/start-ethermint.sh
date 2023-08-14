#!/bin/sh
set -e

CONFIG=$1
if [ -z "$CONFIG" ]; then
    echo "No config file supplied"
    exit 1
fi
shift

DOTENV=$1
if [ -z "$DOTENV" ]; then
    echo "No dotenv file supplied"
    exit 1
fi
shift

DATA=$1
if [ -z "$DATA" ]; then
    echo "No data directory supplied"
    exit 1
fi
shift

echo 'pystarport:'
echo '  config: '$CONFIG
echo '  dotenv: '$DOTENV
echo '  data: '$DATA

pystarport init --config $CONFIG --dotenv $DOTENV --data $DATA $@
supervisord -c $DATA/tasks.ini
