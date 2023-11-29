#! /bin/bash

set -e

commit_hash=$(git rev-parse HEAD)
commit_hash_short=$(git rev-parse --short HEAD)
faucet_url=""
fusion_rpc_url=""
fusion_rest_url=""
blackbird_api_url=""

docker build \
       --build-arg BUILD_DATE="$(git show -s --format=%ci $commit_hash)"\
       --build-arg SERVICE=fusion-web \
       --build-arg GIT_SHA=$commit_hash \
       --build-arg FAUCET_URL=$faucet_url \
       --build-arg FUSION_RPC_URL=$fusion_rpc_url \
       --build-arg FUSION_REST_URL=$fusion_rest_url \
       --build-arg BLACKBIRD_API_URL=$blackbird_api_url \
       -t ${ECR}fusion-web:latest  \
       -t ${ECR}fusion-web:$commit_hash_short  \
       -f Dockerfile-fusion-web ..