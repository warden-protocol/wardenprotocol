FROM golang:1.25-alpine AS build

RUN set -eux; apk add --no-cache ca-certificates build-base linux-headers git curl just;

ARG WASMVM_VERSION
ARG WASMVM_AMD64_CHECKSUM
ARG WASMVM_ARM64_CHECKSUM
ADD --checksum=sha256:${WASMVM_AMD64_CHECKSUM} --chmod=755 https://github.com/CosmWasm/wasmvm/releases/download/${WASMVM_VERSION}/libwasmvm_muslc.x86_64.a /lib/libwasmvm_muslc.x86_64.a
ADD --checksum=sha256:${WASMVM_ARM64_CHECKSUM} --chmod=755 https://github.com/CosmWasm/wasmvm/releases/download/${WASMVM_VERSION}/libwasmvm_muslc.aarch64.a /lib/libwasmvm_muslc.aarch64.a

WORKDIR /warden

COPY go.mod go.sum ./

RUN --mount=type=cache,target=/go/pkg/mod,sharing=locked \
  go mod download

RUN --mount=type=bind,source=.,target=.,readonly\
  --mount=type=cache,target=/root/.cache/go-build,sharing=locked \
  --mount=type=cache,target=/go/pkg/mod,sharing=locked \
  OUTPUT_DIR=/dist LINK_STATIC=true just wardend build

FROM scratch AS binary
ARG TARGETOS
ARG TARGETARCH
ARG WARDEND_VERSION="unknown"
COPY --from=build /dist/wardend /wardend-$WARDEND_VERSION-$TARGETOS-$TARGETARCH
ENTRYPOINT ["/wardend-$WARDEND_VERSION-$TARGETOS-$TARGETARCH"]

FROM alpine:3.18 AS runtime
RUN set -eux; apk add --no-cache ca-certificates curl bash;

RUN addgroup -S -g 1000 warden && \
  adduser -S -u 1000 -G warden -h /data -s /bin/sh warden && \
  install -o warden -g warden -d /data

COPY --from=build /dist/wardend /usr/bin/wardend

USER warden
CMD ["wardend", "start"]

# vi: ft=dockerfile
