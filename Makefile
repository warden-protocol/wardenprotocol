PWD=$(shell pwd)
VERSION=$(shell git describe --tags --always)
COMMIT=$(shell git rev-parse HEAD)
DIRTY=$(shell git diff --quiet || echo "-dirty")
FULL_VERSION=$(VERSION)$(DIRTY)
CHAIN_ID=wardenprotocol
OUTPUT_DIR=./build
LDFLAGS=-ldflags "-s -w -X github.com/cosmos/cosmos-sdk/version.Name=warden -X github.com/cosmos/cosmos-sdk/version.AppName=wardend -X github.com/cosmos/cosmos-sdk/version.Version=$(FULL_VERSION) -X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) -X github.com/warden-protocol/wardenprotocol/cmd/wardenprotocold/cmd.ChainID=$(CHAIN_ID)"
TAG=$(shell git tag --points-at HEAD)

build-all: build-wardend build-faucet build-wardenkms

build: build-wardend

install: install-wardend

build-wardend:
	go build $(LDFLAGS) -o $(OUTPUT_DIR)/wardend ./cmd/wardend

install-wardend:
	go install $(LDFLAGS) ./cmd/wardend

build-faucet:
	go build $(LDFLAGS) -o $(OUTPUT_DIR)/faucet ./cmd/faucet

build-wardenkms:
	go build $(LDFLAGS) -o $(OUTPUT_DIR)/wardenkms ./cmd/wardenkms

release-wardend-cross-arm64:
	@docker run \
		--rm \
		-e CGO_ENABLED=1 \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v $(PWD):/go/src/wardend \
		-w /go/src/wardend \
		ghcr.io/goreleaser/goreleaser-cross:v1.22 \
		--clean --skip=validate --skip=publish

release-wardend-linux-amd64:
	@docker run \
		--platform linux/amd64 \
		--rm \
		-e CGO_ENABLED=1 \
		-v /var/run/docker.sock:/var/run/docker.sock \
		-v $(PWD):/go/src/wardend \
		-w /go/src/wardend \
		ghcr.io/goreleaser/goreleaser:v1.25.1 \
		--clean --skip=publish -f ./.goreleaser-amd64.yaml

release-wardend: release-wardend-linux-amd64 release-wardend-cross-arm64
	cat dist-linux-amd64/wardend_*_checksums.txt dist/wardend_*_checksums.txt > dist/checksums.txt
	@if [ -z "$(TAG)" ] || [ -n "$(DIRTY)" ]; then echo "No tag found for the current commit. Won't proceed with GitHub release."; exit 1; fi
	gh release create $(TAG) --title $(TAG) --verify-tag dist-linux-amd64/wardend_Linux_x86_64.zip dist/wardend_*.zip dist/checksums.txt

.PHONY: build-all build install build-wardend install-wardend build-faucet build-wardenkms
