#!/usr/bin/env bash

set -e

# Version control
commit_hash=$(git rev-parse HEAD)
commit_hash_short=$(git rev-parse --short HEAD)

# Set ARCH variable based on the architecture
architecture=$(uname -m)
if [ -z "$architecture" ]; then
    export ARCH="x86_64" # Linux, Windows (default)
elif [ "$architecture" == "x86_64" ]; then
    export ARCH="x86_64" # Linux, Windows
else
    export ARCH="aarch64" # Mac
fi

docker build \
       --build-arg ARCH="$ARCH" \
       --build-arg BUILD_DATE="$(git show -s --format=%ci "$commit_hash")"\
       --build-arg SERVICE=mpcfusionmodel \
       --build-arg GIT_SHA="$commit_hash" \
       -t "${ECR}"mpcfusionmodel:latest  \
       -t "${ECR}"mpcfusionmodel:"$commit_hash_short"  \
       -f Dockerfile-mpcfusionmodel ..

# must login with 'aws ecr get-login-password  --region eu-west-1 | docker login --username AWS --password-stdin 532153175488.dkr.ecr.eu-west-1.amazonaws.com'
docker tag mpcfusionmodel 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/mpcfusionmodel:latest
docker tag mpcfusionmodel 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/mpcfusionmodel:${commit_hash_short}
docker push 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/mpcfusionmodel:latest
docker push 532153175488.dkr.ecr.eu-west-1.amazonaws.com/qredo/production/mpcfusionmodel:${commit_hash_short}