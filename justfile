# Binary commands
mod wardend

# Protobuf commands
mod proto

# Localnet and development commands
mod localnet

_default:
    @just --list

# regenerate precompiles abi and clients
mod precompiles

# solidity contracts build, test and deploy
mod solidity

# deploy a .wasm binary to the chain and return the contract address
deploy-contract contract from="shulgin" label="":
    #!/usr/bin/env bash
    set -euxo pipefail
    CODE_ID=$(wardend tx wasm store {{contract}} --from {{from}} -y --gas 10000000 --fees 1award | wardend q wait-tx -o json | jq '.events[] | select(.type == "store_code") | .attributes[] | select(.key == "code_id") | .value | tonumber')
    ADDR=$(wardend tx wasm instantiate $CODE_ID '{}' --from {{from}} --label "{{if label == "" { "default" } else { label } }}" --no-admin --fees 1award -y | wardend q wait-tx -o json | jq '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')
    echo {{contract}} deployed at $ADDR

# variables for building and releasing
wasmvm_version := `go list -m -f '{{ .Version }}' github.com/CosmWasm/wasmvm/v3`
wasmvm_amd64_checksum := 'b249396cf884b207f49f46bcf5b8d1fd73b8618eebbe35afb8bf60a8bb24f30a'
wasmvm_arm64_checksum := 'b9df5056ab9f61d3f9b944060b44e893d7ade7dad6ff134b36276be0f9a4185a'
commit := `git rev-parse HEAD`
short_commit := `git rev-parse --short HEAD`
date := `date -u +"%Y-%m-%dT%H:%M:%SZ"`
version := `git describe --tags --dirty --always`

release-wardend push="true": (release-publish-docker "wardend" push)

release-wardenkms push="true": (release-publish-docker "wardenkms" push)

release-publish-docker project-name push="true":
    # build the published docker image
    docker buildx build \
        -t ghcr.io/warden-protocol/wardenprotocol/{{ project-name }}:{{ version }} \
        -t ghcr.io/warden-protocol/wardenprotocol/{{ project-name }}:{{ commit }} \
        -t ghcr.io/warden-protocol/wardenprotocol/{{ project-name }}:{{ short_commit }} \
        --build-arg WASMVM_VERSION={{ wasmvm_version }} \
        --build-arg WASMVM_AMD64_CHECKSUM={{ wasmvm_amd64_checksum }} \
        --build-arg WASMVM_ARM64_CHECKSUM={{ wasmvm_arm64_checksum }} \
        --label=org.opencontainers.image.created={{ date }} \
        --label=org.opencontainers.image.title={{ project-name }} \
        --label=org.opencontainers.image.description={{ project-name }} \
        --label=org.opencontainers.image.revision={{ commit }} \
        --label=org.opencontainers.image.version={{ version }} \
        --label=org.opencontainers.image.url=https://wardenprotocol.org \
        --label=org.opencontainers.image.source=https://github.com/warden-protocol/wardenprotocol \
        --label=org.opencontainers.image.licenses=Apache-2.0 \
        {{ if env("GITHUB_ACTIONS", "") == "true" { "--cache-from type=gha --cache-to type=gha,mode=max" } else { "" } }} \
        --provenance=false --sbom=false \
        --push={{push}} \
        -f ./cmd/{{ project-name }}/Dockerfile \
        .

release-wardend-binary:
    rm -rf dist
    docker buildx build \
        --target binary \
        --build-arg WASMVM_VERSION={{ wasmvm_version }} \
        --build-arg WASMVM_AMD64_CHECKSUM={{ wasmvm_amd64_checksum }} \
        --build-arg WASMVM_ARM64_CHECKSUM={{ wasmvm_arm64_checksum }} \
        --build-arg WARDEND_VERSION={{ version }} \
        -f ./cmd/wardend/Dockerfile \
        {{ if env("GITHUB_ACTIONS", "") == "true" { "--cache-from type=gha --cache-to type=gha,mode=max" } else { "" } }} \
        --output dist .
    ls -alh dist

