VERSION=$(shell git describe --tags --always)
COMMIT=$(shell git rev-parse HEAD)
DIRTY=$(shell git diff --quiet || echo "-dirty")
FULL_VERSION=$(VERSION)$(DIRTY)
CHAIN_ID=wardenprotocol
OUTPUT_DIR=./build
LDFLAGS=-ldflags "-s -w -X github.com/cosmos/cosmos-sdk/version.Name=warden -X github.com/cosmos/cosmos-sdk/version.AppName=wardend -X github.com/cosmos/cosmos-sdk/version.Version=$(FULL_VERSION) -X github.com/cosmos/cosmos-sdk/version.Commit=$(COMMIT) -X github.com/warden-protocol/wardenprotocol/cmd/wardenprotocold/cmd.ChainID=$(CHAIN_ID)"

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

.PHONY: build-all build install build-wardend install-wardend build-faucet build-wardenkms
