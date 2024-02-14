# syntax=docker/dockerfile:1

# The following Dockerfile includes multiple targets.
# Each target is a separate image that can be built specifying the --target
# flag when using `docker build`.

FROM --platform=linux/amd64 golang:1.21-alpine3.18 AS build-env
RUN apk add --update git build-base linux-headers
WORKDIR /build

## wardend
FROM build-env AS wardend-build
WORKDIR /warden
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    go build -o /build/wardend ./warden/cmd/wardend
RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    go build -o /build/faucet ./warden/cmd/faucet


FROM alpine:3.18.0 AS wardend
RUN apk add --update ca-certificates jq
WORKDIR /
COPY --from=wardend-build /build/wardend /usr/bin/wardend
CMD ["wardend", "start"]


## faucet
FROM alpine:3.18.0 AS faucet
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
    go build -o /build/wardenkms ./keychain/cmd/wardenkms


FROM scratch AS wardenkms
COPY --from=wardenkms-build /build/wardenkms .
COPY --from=build-env /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
USER svcuser
EXPOSE 8080
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
ENV VITE_WARDEN_CHAIN_ID_NUM=%WARDEN_CHAIN_ID_NUM%
ENV VITE_WARDEN_CHAIN_ID=%WARDEN_CHAIN_ID%
ENV VITE_WARDEN_CHAIN_NAME=%WARDEN_CHAIN_NAME%

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
