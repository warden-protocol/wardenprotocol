FROM golang:1.21-alpine3.18 AS build-env

RUN apk add --update git build-base

# Set up Qredo private repos access
ARG GITLAB_TOKEN
ARG GITHUB_TOKEN
ENV GOPRIVATE=github.com/qredo,gitlab.qredo.com
RUN git config --global url."https://gitlab-ci-token:$GITLAB_TOKEN@gitlab.qredo.com".insteadOf "https://gitlab.qredo.com"
RUN git config --global url."https://$GITHUB_TOKEN@github.com".insteadOf "https://github.com"

WORKDIR /fusionchain
COPY . .

WORKDIR /fusionchain/relayer-eth
RUN --mount=type=cache,target=/root/.cache/go-build \
    --mount=type=cache,target=/go/pkg/mod \
    go build -o relayer ./cmd/relayer


FROM alpine:3.18.0 AS relayer
RUN apk add --update ca-certificates jq
COPY --from=build-env /fusionchain/relayer-eth/relayer /usr/bin/relayer
CMD ["relayer"]
