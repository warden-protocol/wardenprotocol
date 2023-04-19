# Building docker images

Let's see if this works...

```
VERSION=0.4.0-arm64
VERSION=0.4.0-amd64
docker build -t cosmwasm/go-optimizer:${VERSION} -f Dockerfile .

# failure cases
docker run -v "$(pwd):/code" cosmwasm/go-optimizer:${VERSION} .
docker run -v "$(pwd):/code" cosmwasm/go-optimizer:${VERSION} foo

# RUN
docker run -v "$(pwd):/code" cosmwasm/go-optimizer:${VERSION} ./example/queue
docker run -e PAGES=30 -v "$(pwd):/code" cosmwasm/go-optimizer:${VERSION} ./example/queue

# FULL RUN
docker run -e CHECK=1 -e STRIP=1 -v "$(pwd):/code" cosmwasm/go-optimizer:${VERSION} ./example/queue


# DEBUG
docker run -it --entrypoint /bin/bash cosmwasm/go-optimizer:${VERSION}
```

When we built on both architectures:

```
VERSION=0.4.0
ARM=${VERSION}-arm64
AMD=${VERSION}-amd64

docker push cosmwasm/go-optimizer:${ARM} || docker pull cosmwasm/go-optimizer:${ARM}
docker push cosmwasm/go-optimizer:${AMD} || docker pull cosmwasm/go-optimizer:${AMD}

docker manifest create cosmwasm/go-optimizer:${VERSION} \
  --amend cosmwasm/go-optimizer:${ARM} \
  --amend cosmwasm/go-optimizer:${AMD}

docker manifest inspect cosmwasm/go-optimizer:${VERSION}

docker manifest push cosmwasm/go-optimizer:${VERSION}
```
