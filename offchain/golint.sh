#!/bin/sh

# golanci needs to be in the same dir as the go application
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH

golangci-lint run \
    --config ../.golangci.yml \
    --timeout 10m
