FROM --platform=linux/amd64 golang:1.20-alpine3.16 AS build-env
ARG arch=x86_64

RUN apk add --update git build-base linux-headers

# Set up Qredo private repos access
ARG GITLAB_TOKEN
ARG GITHUB_TOKEN
ENV GOPRIVATE=github.com/qredo,gitlab.qredo.com
RUN git config --global url."https://gitlab-ci-token:$GITLAB_TOKEN@gitlab.qredo.com".insteadOf "https://gitlab.qredo.com"
RUN git config --global url."https://$GITHUB_TOKEN@github.com".insteadOf "https://github.com"

# Add libwasmvm for musl
# See https://github.com/CosmWasm/wasmvm/releases
ENV WASMVM_VERSION=v1.0.0
ADD https://github.com/CosmWasm/wasmvm/releases/download/$WASMVM_VERSION/libwasmvm_muslc.aarch64.a /lib/libwasmvm_muslc.aarch64.a
ADD https://github.com/CosmWasm/wasmvm/releases/download/$WASMVM_VERSION/libwasmvm_muslc.x86_64.a /lib/libwasmvm_muslc.x86_64.a
RUN sha256sum /lib/libwasmvm_muslc.aarch64.a | grep 7d2239e9f25e96d0d4daba982ce92367aacf0cbd95d2facb8442268f2b1cc1fc
RUN sha256sum /lib/libwasmvm_muslc.x86_64.a | grep f6282df732a13dec836cda1f399dd874b1e3163504dbd9607c6af915b2740479
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
