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
wasmvm_muslc_amd64_checksum := '70c989684d2b48ca17bbd55bb694bbb136d75c393c067ef3bdbca31d2b23b578'
wasmvm_muslc_arm64_checksum := '27fb13821dbc519119f4f98c30a42cb32429b111b0fdc883686c34a41777488f'
wasmvm_static_darwin_checksum := '43f1341015143c626b634a709872efe848e45ad24444c091496f9c648fd71a67'
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
