#! /bin/bash

set -e

commit_hash=$(git rev-parse HEAD)
commit_hash_short=$(git rev-parse --short HEAD)

docker build \
       --build-arg BUILD_DATE="$(git show -s --format=%ci $commit_hash)"\
       --build-arg SERVICE=mpc-relayer \
       --build-arg GIT_SHA=$commit_hash \
       -t ${ECR}mpc-relayer:latest  \
       -t ${ECR}mpc-relayer:$commit_hash_short  \
       -f docker/Dockerfile .