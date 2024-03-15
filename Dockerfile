# syntax=docker/dockerfile:1

# The following Dockerfile includes multiple targets.
# Each target is a separate image that can be built specifying the --target
# flag when using `docker build`.

FROM golang:1.21-alpine3.18 AS build-env
WORKDIR /build
ENV CGO_ENABLED=0
RUN apk add --no-cache make git

## wardend
FROM build-env AS wardend-build
WORKDIR /warden
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    make build-wardend OUTPUT_DIR=/build
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    make build-faucet OUTPUT_DIR=/build


FROM alpine:3.18 AS wardend
COPY --from=wardend-build /build/wardend /usr/bin/wardend
CMD ["wardend", "start"]

FROM wardend AS wardend-debug
WORKDIR /root/.warden
ADD --checksum=sha256:8c1fc9f6cb49f57bffb5664be2e11103d0ebdc7ffe8a12cd351870af47201496 https://github.com/warden-protocol/snapshots/raw/main/devnet.tar.gz .
RUN tar -xf devnet.tar.gz && rm devnet.tar.gz

## faucet
FROM alpine:3.18 AS faucet
COPY --from=wardend-build /build/wardend /usr/bin/wardend
COPY --from=wardend-build /build/faucet /usr/bin/faucet
EXPOSE 8000
CMD ["/usr/bin/faucet"]


## wardenkms
FROM build-env AS wardenkms-build
WORKDIR /warden
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    make build-wardenkms OUTPUT_DIR=/build


FROM alpine:3.18 AS wardenkms
COPY --from=wardenkms-build /build/wardenkms /
ENTRYPOINT ["/wardenkms"]

## snap
FROM node:lts-alpine as snap-builder
WORKDIR /snap
COPY snap/package*.json ./
RUN npm ci
COPY snap/ .
RUN npm run build

## spaceward
FROM node:lts-alpine as spaceward-builder
RUN npm install -g pnpm

WORKDIR /wardenprotocol
COPY ts-client ./ts-client
RUN mkdir spaceward
COPY spaceward/package*.json spaceward/.npmrc spaceward/
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


RUN cd spaceward && pnpm run build

COPY --from=snap-builder /snap/snap.manifest.json /wardenprotocol/spaceward/dist
COPY --from=snap-builder /snap/images /wardenprotocol/spaceward/dist/images
COPY --from=snap-builder /snap/dist /wardenprotocol/spaceward/dist/dist

FROM nginx:1.25.3-alpine3.18-perl as spaceward
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
    mkdir -p /var/log/nginx && \
    mkdir -p /var/run/nginx && \
    chown -R 1000 /var/log/nginx && \
    chown -R 1000 /var/run/nginx/

USER 1000
ENTRYPOINT ["sh", "/opt/entrypoint.sh"]
CMD ["nginx-fe"]
