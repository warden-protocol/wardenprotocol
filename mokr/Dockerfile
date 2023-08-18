FROM --platform=linux/amd64 golang:1.21-alpine3.16 AS build-env
ARG arch=x86_64

RUN apk add --update git build-base linux-headers

# Set up Qredo private repos access
ARG GITLAB_TOKEN
ARG GITHUB_TOKEN
ENV GOPRIVATE=github.com/qredo,gitlab.qredo.com
RUN git config --global url."https://gitlab-ci-token:$GITLAB_TOKEN@gitlab.qredo.com".insteadOf "https://gitlab.qredo.com"
RUN git config --global url."https://$GITHUB_TOKEN@github.com".insteadOf "https://github.com"

# Add libwasmvm for musl
# Run `grep wasmvm go.mod` to find the version used in the project.
# Download checksum.txt from https://github.com/CosmWasm/wasmvm/releases to find correct checksums.
ENV WASMVM_VERSION=v1.3.0
ADD https://github.com/CosmWasm/wasmvm/releases/download/$WASMVM_VERSION/libwasmvm_muslc.aarch64.a /lib/libwasmvm_muslc.aarch64.a
ADD https://github.com/CosmWasm/wasmvm/releases/download/$WASMVM_VERSION/libwasmvm_muslc.x86_64.a /lib/libwasmvm_muslc.x86_64.a
RUN sha256sum /lib/libwasmvm_muslc.aarch64.a | grep b1610f9c8ad8bdebf5b8f819f71d238466f83521c74a2deb799078932e862722
RUN sha256sum /lib/libwasmvm_muslc.x86_64.a | grep b4aad4480f9b4c46635b4943beedbb72c929eab1d1b9467fe3b43e6dbf617e32

RUN cp /lib/libwasmvm_muslc.${arch}.a /lib/libwasmvm_muslc.a

WORKDIR /fusionchain
COPY . .

WORKDIR /fusionchain/mokr

RUN --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    go build -o mokr -tags "muslc" -ldflags '-linkmode=external -extldflags "-Wl,-z,muldefs -static"' .


FROM alpine:3.16.0 AS mokr
RUN apk add --update ca-certificates jq
COPY --from=build-env /fusionchain/mokr/mokr /usr/bin/mokr
CMD ["mokr"]
