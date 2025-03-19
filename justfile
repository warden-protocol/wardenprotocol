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
mod extensions './warden/extensions'

# solidity contracts build, test and deploy
mod solidity

# deploy a .wasm binary to the chain and return the contract address
deploy-contract contract from="shulgin" label="":
    #!/usr/bin/env bash
    CODE_ID=$(wardend tx wasm store {{contract}} --from {{from}} -y --gas auto --gas-adjustment 1.3 | wardend q wait-tx -o json | jq '.events[] | select(.type == "store_code") | .attributes[] | select(.key == "code_id") | .value | tonumber')
    ADDR=$(wardend tx wasm instantiate $CODE_ID '{}' --from {{from}} --label "{{if label == "" { "default" } else { label } }}" --no-admin -y | wardend q wait-tx -o json | jq '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')
    echo {{contract}} deployed at $ADDR
