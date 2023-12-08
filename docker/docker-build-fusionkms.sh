#!/usr/bin/env bash

set -e

commit_hash=$(git rev-parse HEAD)
commit_hash_short=$(git rev-parse --short HEAD)

docker build \
       --build-arg BUILD_DATE="$(git show -s --format=%ci "$commit_hash")"\
       --build-arg SERVICE=fusionkms \
       --build-arg GIT_SHA="$commit_hash" \
       -t "${ECR}"fusionkms:latest  \
       -t "${ECR}"fusionkms:"$commit_hash_short"  \
       -f Dockerfile-fusionkms ..