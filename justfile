# Binary commands
mod wardend

# Protobuf commands
mod proto

# Localnet and development commands
mod localnet

_default:
    @just --list

# regenerate wardenjs and update spaceward
wardenjs:
    cd wardenjs && just build
    cd spaceward && pnpm add @wardenprotocol/wardenjs

# regenerate precompiles abi and clients
mod precompiles

# solidity contracts build, test and deploy
mod solidity

# deploy a .wasm binary to the chain and return the contract address
deploy-contract contract from="shulgin" label="":
    #!/usr/bin/env bash
    CODE_ID=$(wardend tx wasm store {{contract}} --from {{from}} -y --gas auto --gas-adjustment 1.3 | wardend q wait-tx -o json | jq '.events[] | select(.type == "store_code") | .attributes[] | select(.key == "code_id") | .value | tonumber')
    ADDR=$(wardend tx wasm instantiate $CODE_ID '{}' --from {{from}} --label "{{if label == "" { "default" } else { label } }}" --no-admin -y | wardend q wait-tx -o json | jq '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')
    echo {{contract}} deployed at $ADDR

# variables for building and releasing
wasmvm_version := `go list -m -f '{{ .Version }}' github.com/CosmWasm/wasmvm/v2`
wasmvm_amd64_checksum := 'a7f6f5a79f41c756f87e4e3de86439a18fec07238c2521ac21ac2e5655751460'
wasmvm_arm64_checksum := '3a6f1a2448cb88c6a00faf9a2c72262d8b2d6b65a3a1dd3c969e5df42534bb0d'
commit := `git rev-parse HEAD`
short_commit := `git rev-parse --short HEAD`
date := `date -u +"%Y-%m-%dT%H:%M:%SZ"`
version := `git describe --tags --dirty --always`

release-wardend push="true": (release-publish-docker "wardend" push)

release-faucet push="true": (release-publish-docker "faucet" push)

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
        --push={{push}} \
        -f ./cmd/{{ project-name }}/Dockerfile \
        .

# Build the "dist/" folder with the wardend binaries for different architectures.
release-wardend-binaries:
    rm -rf dist

    # build the wardend binaries
    docker buildx build \
        --platform linux/amd64,linux/arm64 \
        --target binary \
        -t wardend-multi-platform \
        --build-arg WASMVM_VERSION={{ wasmvm_version }} \
        --build-arg WASMVM_AMD64_CHECKSUM={{ wasmvm_amd64_checksum }} \
        --build-arg WASMVM_ARM64_CHECKSUM={{ wasmvm_arm64_checksum }} \
        -f ./cmd/wardend/Dockerfile \
        --output dist .

    mv dist/linux_amd64/wardend dist/wardend-{{version}}-linux-amd64
    mv dist/linux_arm64/wardend dist/wardend-{{version}}-linux-arm64
    rm -rf dist/linux_amd64 dist/linux_arm64

    tar caf dist/wardend-{{version}}-linux-amd64.tar.gz dist/wardend-{{version}}-linux-amd64
    tar caf dist/wardend-{{version}}-linux-arm64.tar.gz dist/wardend-{{version}}-linux-arm64

    cd dist && sha256sum * > sha256sum.txt

    @echo "Binary files written to dist/:"
    ls -alh dist/

