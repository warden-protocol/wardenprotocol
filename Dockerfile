# syntax=docker/dockerfile:1

# The following Dockerfile includes multiple targets.
# Each target is a separate image that can be built specifying the --target
# flag when using `docker build`.

FROM golang:1.21-alpine3.18 AS build-env
WORKDIR /build
ENV CGO_ENABLED=0

## wardend
FROM build-env AS wardend-build
WORKDIR /warden
ARG VERSION
ARG COMMIT
ENV VERSION=$VERSION
ENV COMMIT=$COMMIT
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    go build -o /build/wardend -ldflags "-X github.com/cosmos/cosmos-sdk/version.Commit=$COMMIT -X github.com/cosmos/cosmos-sdk/version.Version=$VERSION" ./warden/cmd/wardend
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    go build -o /build/faucet ./warden/cmd/faucet


FROM alpine:3.18 AS wardend
COPY --from=wardend-build /build/wardend /usr/bin/wardend
CMD ["wardend", "start"]

FROM wardend AS wardend-debug
WORKDIR /root/.warden
ADD --checksum=sha256:25c62530d273b7bc5218b62c1eaa42fdd17639189baf767505580169a33489c5 https://github.com/warden-protocol/snapshots/raw/main/devnet.tar.gz .
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
    go build -o /build/wardenkms ./wardenkms


FROM alpine:3.18 AS wardenkms
COPY --from=wardenkms-build /build/wardenkms /
ENTRYPOINT ["/wardenkms"]

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
ENV VITE_WARDEN_CHAIN_ID=%WARDEN_CHAIN_ID%

RUN cd spaceward && pnpm run build

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
