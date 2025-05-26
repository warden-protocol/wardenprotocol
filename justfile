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
wasmvm_amd64_checksum := '015bdae5e70304f1e487981f90e3956754718fe7bdac4446aab0838fcb8b33e0'
wasmvm_arm64_checksum := 'aaca92c6a114c34128b9c8e826f49841229d33d914fab0369007591b2d6b782d'
wasmvm_muslc_amd64_checksum := '58e1f6bfa89ee390cb9abc69a5bc126029a497fe09dd399f38a82d0d86fe95ef'
wasmvm_muslc_arm64_checksum := '0881c5b463e89e229b06370e9e2961aec0a5c636772d5142c68d351564464a66'
wasmvm_static_darwin_checksum := '28527dcc9fde23292ed096a22eaf9577d12a8e772fe64c0700170514f976a5f2'
goreleaser_cross_version := 'v1.24.1'
release := env("RELEASE", "false")
github_token := env("GITHUB_TOKEN", "")
skip := env("SKIP", "")
current_dir := `pwd`

# build binaries for a release and publish images
release binary="wardend":
    @docker run \
        --rm \
        -e CGO_ENABLED=1 \
        -e WASMVM_VERSION={{ wasmvm_version }} \
        -e WASMVM_AMD64_CHECKSUM={{ wasmvm_amd64_checksum }} \
        -e WASMVM_ARM64_CHECKSUM={{ wasmvm_arm64_checksum }} \
        -e WASMVM_MUSLC_AMD64_CHECKSUM={{ wasmvm_muslc_amd64_checksum }} \
        -e WASMVM_MUSLC_ARM64_CHECKSUM={{ wasmvm_muslc_arm64_checksum }} \
        -e WASMVM_STATIC_DARWIN_CHECKSUM={{ wasmvm_static_darwin_checksum }} \
        -e RELEASE={{ release }} \
        -e GITHUB_TOKEN={{ github_token }} \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v {{ current_dir }}:/go/src/{{ binary }} \
        -w /go/src/{{ binary }} \
        ghcr.io/goreleaser/goreleaser-cross:{{ goreleaser_cross_version }} \
        -f "cmd/{{ binary }}/.goreleaser.yaml" \
        --clean \
        {{ skip }}
