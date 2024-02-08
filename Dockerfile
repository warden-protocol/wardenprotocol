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
