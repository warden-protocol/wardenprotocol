# syntax=docker/dockerfile:1

# The following Dockerfile includes multiple targets.
# Each target is a separate image that can be built specifying the --target
# flag when using `docker build`.

FROM golang:1.22-bookworm AS build-env
WORKDIR /build
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*
# install just
RUN curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to /usr/bin

## wardend
FROM build-env AS wardend-build
WORKDIR /warden
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    just output_dir=/build build wardend
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    just output_dir=/build build faucet

FROM debian:bookworm-slim AS wardend
RUN apt update && \
    apt install ca-certificates curl -y && \
    rm -rf /var/lib/apt/lists/* && \
    useradd -M -u 1000 -U -s /bin/sh -d /data warden && \
    install -o 1000 -g 1000 -d /data
COPY --from=wardend-build --chown=warden:warden /build/wardend /usr/bin/wardend
ADD --checksum=sha256:e6e1ffb5d0bbcf869ae5d25ea36f209484f23f44a9f7d409ce3c5a7a7d473e8e --chown=warden:warden https://github.com/CosmWasm/wasmvm/releases/download/v2.0.0/libwasmvm.x86_64.so /lib/libwasmvm.x86_64.so
USER warden
CMD ["wardend", "start"]

## wardend-debug
FROM wardend-build AS wardend-debug
CMD just localnet

## faucet
FROM debian:bookworm-slim AS faucet
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* && \
    useradd -M -u 1000 -U -s /bin/sh -d /data warden && \
    install -o 1000 -g 1000 -d /data

COPY --from=wardend-build --chown=warden:warden /build/wardend /usr/bin/wardend
COPY --from=wardend-build --chown=warden:warden /build/faucet /usr/bin/faucet
ADD --chown=warden:warden --checksum=sha256:e6e1ffb5d0bbcf869ae5d25ea36f209484f23f44a9f7d409ce3c5a7a7d473e8e https://github.com/CosmWasm/wasmvm/releases/download/v2.0.0/libwasmvm.x86_64.so /lib/libwasmvm.x86_64.so


EXPOSE 8000
USER warden
CMD ["/usr/bin/faucet"]


## wardenkms
FROM build-env AS wardenkms-build
WORKDIR /warden
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    just output_dir=/build build wardenkms 


FROM debian:bookworm-slim AS wardenkms
COPY --chown=nobody:nogroup --from=wardenkms-build /build/wardenkms /
ADD --chown=nobody:nogroup --checksum=sha256:e6e1ffb5d0bbcf869ae5d25ea36f209484f23f44a9f7d409ce3c5a7a7d473e8e https://github.com/CosmWasm/wasmvm/releases/download/v2.0.0/libwasmvm.x86_64.so /lib/libwasmvm.x86_64.so
USER nobody
ENTRYPOINT ["/wardenkms"]

## node-builder
FROM node:lts-alpine AS node-build-env
RUN apk add --no-cache python3 build-base
RUN npm install -g pnpm@9

## snap
FROM node-build-env AS snap-builder
WORKDIR /snap
COPY snap/package*.json ./
RUN npm ci
COPY snap/ .
RUN npm run build

## wardenjs
FROM node-build-env AS wardenjs-builder
WORKDIR /wardenjs
COPY wardenjs/package*.json wardenjs/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY wardenjs/ .
RUN pnpm run build

## spaceward
FROM node-build-env AS spaceward-builder
WORKDIR /wardenprotocol
COPY --from=wardenjs-builder /wardenjs ./wardenjs
RUN mkdir spaceward
COPY spaceward/package*.json spaceward/pnpm-lock.yaml spaceward/.npmrc spaceward/
RUN cd spaceward && pnpm install
COPY . .

ENV VITE_FAUCET_URL=%FAUCET_URL%
ENV VITE_WARDEN_RPC_URL=%WARDEN_RPC_URL%
ENV VITE_WARDEN_REST_URL=%WARDEN_REST_URL%
ENV VITE_WARDEN_CHAIN_NAME=%WARDEN_CHAIN_NAME%
ENV VITE_WARDEN_COSMOSKIT_CHAIN_NAME=%WARDEN_COSMOSKIT_CHAIN_NAME%
ENV VITE_WARDEN_CHAIN_ID=%WARDEN_CHAIN_ID%
ENV VITE_WARDEN_MAINTENANCE=%WARDEN_MAINTENANCE%
ENV VITE_WARDEN_SNAP_ORIGIN=%WARDEN_SNAP_ORIGIN%
ENV VITE_WARDEN_ENVIRONMENT=%WARDEN_ENVIRONMENT%
ENV VITE_WARDEN_STORYBLOK_TOKEN=%WARDEN_STORYBLOK_TOKEN%
ENV VITE_WARDEN_ETHEREUM_ANALYZER_CONTRACT=%WARDEN_ETHEREUM_ANALYZER_CONTRACT%
ENV VITE_WARDEN_AMINO_ANALYZER_CONTRACT=%WARDEN_AMINO_ANALYZER_CONTRACT%

RUN cd spaceward && pnpm run build

COPY --from=snap-builder /snap/snap.manifest.json /wardenprotocol/spaceward/dist
COPY --from=snap-builder /snap/images /wardenprotocol/spaceward/dist/images
COPY --from=snap-builder /snap/dist /wardenprotocol/spaceward/dist/dist

FROM nginx:1.25.3-alpine3.18-perl AS spaceward
WORKDIR /var/www/app
EXPOSE 8080

COPY ./spaceward/entrypoint.sh /opt/entrypoint.sh
COPY ./spaceward/nginx.conf /etc/nginx/nginx.conf
COPY --from=spaceward-builder /wardenprotocol/spaceward/dist .

RUN touch /var/run/nginx.pid && \
    chown -R 1000 /var/run/nginx.pid && \
    chown -R 1000 /var/cache/nginx && \
    chown -R 1000 /var/www/app && \
    chown -R 1000 /etc/nginx/conf.d/ && \
    install -o 1000 -g 1000 -d /var/log/nginx -d /var/run/nginx

USER 1000
ENTRYPOINT ["sh", "/opt/entrypoint.sh"]
CMD ["nginx-fe"]

## spaceward-relay
FROM node-build-env AS spaceward-relay
WORKDIR /wardenprotocol/spaceward
COPY --chown=nobody:nogroup spaceward/ ./
COPY --chown=nobody:nogroup --from=wardenjs-builder /wardenjs /wardenprotocol/wardenjs
RUN pnpm install
USER nobody
ENTRYPOINT ["pnpm", "relay"]