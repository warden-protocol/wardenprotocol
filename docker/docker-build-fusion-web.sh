#!/usr/bin/env bash

set -e

commit_hash=$(git rev-parse HEAD)
commit_hash_short=$(git rev-parse --short HEAD)
faucet_url="https://fs-faucet.dev.development-qredo.com"
fusion_rpc_url="https://fs-rpc.dev.development-qredo.com"
fusion_rest_url="https://fs-api.dev.development-qredo.com"
blackbird_api_url=""

docker build \
       --build-arg BUILD_DATE="$(git show -s --format=%ci $commit_hash)"\
       --build-arg SERVICE=fusion-web \
       --build-arg GIT_SHA="$commit_hash" \
       --build-arg FAUCET_URL="$faucet_url" \
       --build-arg FUSION_RPC_URL="$fusion_rpc_url" \
       --build-arg FUSION_REST_URL="$fusion_rest_url" \
       --build-arg BLACKBIRD_API_URL="$blackbird_api_url" \
       --target web \
       -t "${ECR}"fusion-web:latest  \
       -t "${ECR}"fusion-web:"$commit_hash_short"  \
       -f Dockerfile-fusion-stack ..

# must login with 'aws ecr get-login-password  --region eu-west-1 | docker login --username AWS --password-stdin 532153175488.dkr.ecr.eu-west-1.amazonaws.com'
docker tag fusion-web:latest 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/fusion-web:latest
docker tag fusion-web:latest 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/fusion-web:${commit_hash_short}
docker push 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/fusion-web:latest
docker push 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/fusion-web:${commit_hash_short}