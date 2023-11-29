#! /bin/bash

set -e

commit_hash=$(git rev-parse HEAD)
commit_hash_short=$(git rev-parse --short HEAD)

docker build \
       --build-arg BUILD_DATE="$(git show -s --format=%ci $commit_hash)"\
       --build-arg SERVICE=fusiond \
       --build-arg GIT_SHA=$commit_hash \
       -t ${ECR}fusiond:latest  \
       -t ${ECR}fusiond:$commit_hash_short  \
       -f Dockerfile-fusiond ..