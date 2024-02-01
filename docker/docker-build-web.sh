#!/usr/bin/env bash

set -e

commit_hash=$(git rev-parse HEAD)
commit_hash_short=$(git rev-parse --short HEAD)

docker build \
       --build-arg BUILD_DATE="$(git show -s --format=%ci $commit_hash)"\
       --build-arg SERVICE=warden-web \
       --build-arg GIT_SHA="$commit_hash" \
       -t "${DOCKER_REGISTRY}"warden-web:latest  \
       -t "${DOCKER_REGISTRY}"warden-web:"$commit_hash_short"  \
       -f Dockerfile-web ..

