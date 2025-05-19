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
libwasm_version := `go list -m -f '{{ .Version }}' github.com/CosmWasm/wasmvm/v2`
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
        -e LIBWASM_VERSION={{ libwasm_version }} \
        -e RELEASE={{ release }} \
        -e GITHUB_TOKEN={{ github_token }} \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v {{ current_dir }}:/go/src/{{ binary }} \
        -w /go/src/{{ binary }} \
        ghcr.io/goreleaser/goreleaser-cross:{{ goreleaser_cross_version }} \
        -f "{{ binary }}/.goreleaser.yaml" \
        --clean \
        {{ skip }}
