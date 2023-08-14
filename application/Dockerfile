FROM --platform=linux/amd64 golang:1.20-alpine3.16 AS build-env
ARG arch=x86_64

# Set up dependencies
ENV PACKAGES git build-base

# Set working directory for the build
WORKDIR /go/src/gitlab.qredo.com/qrdochain/fusionchain

# Install dependencies
RUN apk add --update $PACKAGES
RUN apk add linux-headers

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

# Add source files
COPY . .

# Make the binary
ENV BUILD_TAGS=muslc LINK_STATICALLY=true
RUN --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    make build

FROM alpine:3.16.0 as faucet
COPY --from=build-env /go/src/gitlab.qredo.com/qrdochain/fusionchain/build/fusiond /usr/bin/fusiond
COPY --from=build-env /go/src/gitlab.qredo.com/qrdochain/fusionchain/build/faucet /usr/bin/faucet
EXPOSE 8000
CMD ["/usr/bin/faucet"]


# Final image
FROM alpine:3.16.0

# Install ca-certificates
RUN apk add --update ca-certificates jq
WORKDIR /

# Copy over binaries from the build-env
COPY --from=build-env /go/src/gitlab.qredo.com/qrdochain/fusionchain/build/fusiond /usr/bin/fusiond

# Run fusiond by default
CMD ["fusiond"]
