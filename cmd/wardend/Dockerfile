FROM golang:1.24 AS build

# Install just
RUN curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to /usr/bin

WORKDIR /warden

RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build,sharing=locked \
    --mount=type=cache,target=/go/pkg/mod,sharing=locked \
    OUTPUT_DIR=/dist just wardend build

FROM scratch AS binary
COPY --from=build /dist/wardend /
ENTRYPOINT ["/wardend"]

FROM debian:bookworm-slim AS runtime
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt update && apt install -y \
    libvips-dev \
    ca-certificates curl

RUN useradd -M -u 1000 -U -s /bin/sh -d /data warden && \
    install -o 1000 -g 1000 -d /data

ARG WASMVM_VERSION
ARG WASMVM_AMD64_CHECKSUM
ARG WASMVM_ARM64_CHECKSUM
ADD --checksum=sha256:${WASMVM_AMD64_CHECKSUM} --chmod=755 https://github.com/CosmWasm/wasmvm/releases/download/${WASMVM_VERSION}/libwasmvm.x86_64.so /usr/lib/libwasmvm.x86_64.so
ADD --checksum=sha256:${WASMVM_ARM64_CHECKSUM} --chmod=755 https://github.com/CosmWasm/wasmvm/releases/download/${WASMVM_VERSION}/libwasmvm.aarch64.so /usr/lib/libwasmvm.aarch64.so

COPY --from=build /dist/wardend /usr/bin/wardend

USER warden
CMD ["wardend", "start"]

# vi: ft=dockerfile
