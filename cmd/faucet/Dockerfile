FROM golang:1.24 AS build

# Install just
RUN curl --proto '=https' --tlsv1.2 -sSf https://just.systems/install.sh | bash -s -- --to /usr/bin

WORKDIR /warden

RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build,sharing=locked \
    --mount=type=cache,target=/go/pkg/mod,sharing=locked \
    OUTPUT_DIR=/dist just wardend build

RUN --mount=type=bind,source=.,target=.,readonly\
    --mount=type=cache,target=/root/.cache/go-build,sharing=locked \
    --mount=type=cache,target=/go/pkg/mod,sharing=locked \
    OUTPUT_DIR=/dist just wardend build faucet

FROM debian:bookworm-slim AS runtime
RUN apt update && \
    apt install ca-certificates curl -y && \
    rm -rf /var/lib/apt/lists/*

RUN useradd -M -u 1000 -U -s /bin/sh -d /data warden && \
    install -o 1000 -g 1000 -d /data

ARG WASMVM_VERSION
ARG WASMVM_AMD64_CHECKSUM
ARG WASMVM_ARM64_CHECKSUM
ADD --checksum=sha256:${WASMVM_AMD64_CHECKSUM} --chmod=755 https://github.com/CosmWasm/wasmvm/releases/download/${WASMVM_VERSION}/libwasmvm.x86_64.so /usr/lib/libwasmvm.x86_64.so
ADD --checksum=sha256:${WASMVM_ARM64_CHECKSUM} --chmod=755 https://github.com/CosmWasm/wasmvm/releases/download/${WASMVM_VERSION}/libwasmvm.aarch64.so /usr/lib/libwasmvm.aarch64.so

COPY --from=build /dist/wardend /usr/bin/wardend
COPY --from=build /dist/faucet /usr/bin/faucet

USER warden

COPY cmd/faucet/assets/ /assets
COPY cmd/faucet/css/ /css
COPY cmd/faucet/js/ /js
COPY cmd/faucet/templates/ /templates

EXPOSE 8081
CMD ["faucet"]

# vi: ft=dockerfile
