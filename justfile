import "cmd/justfile"
import "proto/justfile"

_default:
    @just --list

# regenerate wardenjs and update spaceward
wardenjs:
    cd wardenjs && just build
    cd spaceward && pnpm add @wardenprotocol/wardenjs

# run docs website in developer mode
docusaurus:
    cd docs && just dev

_release-wardend-cross-arm64:
    @docker run \
    	--rm \
    	-e CGO_ENABLED=1 \
    	-v /var/run/docker.sock:/var/run/docker.sock \
    	-v {{ invocation_directory() }}:/go/src/wardend \
    	-w /go/src/wardend \
    	ghcr.io/goreleaser/goreleaser-cross:v1.22 \
    	--clean --skip=validate --skip=publish

_release-wardend-linux-amd64:
    @docker run \
    	--platform linux/amd64 \
    	--rm \
    	-e CGO_ENABLED=1 \
    	-v /var/run/docker.sock:/var/run/docker.sock \
    	-v {{ invocation_directory() }}:/go/src/wardend \
    	-w /go/src/wardend \
    	ghcr.io/goreleaser/goreleaser:v1.25.1 \
    	--clean --skip=publish -f ./.goreleaser-amd64.yaml

release_tag := `git tag --points-at HEAD`

# use goreleaser to build binaries, then create a GitHub release.
release-wardend: #_release-wardend-linux-amd64 _release-wardend-cross-arm64
    cat dist-linux-amd64/wardend_*_checksums.txt dist/wardend_*_checksums.txt > dist/checksums.txt
    if ! git diff-index --quiet HEAD -- || [ -z "{{release_tag}}" ]; then echo "Git working directory is dirty or current commit is not tagged"; exit 1; fi
    gh release create {{release_tag}} --title {{release_tag}} --verify-tag dist-linux-amd64/wardend_Linux_x86_64.zip dist/wardend_*.zip dist/checksums.txt


shulgin := "warden10kmgv5gzygnecf46x092ecfe5xcvvv9r870rq4"
shulgin_mnemonic := "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"

# run a single-node chain locally, a custom path to "wardend" can be configured
localnet bin="wardend":
    #!/usr/bin/env bash
    set -euxo pipefail

    function replace() {
      if [[ "$(uname)" == "Darwin" ]]; then
        /usr/bin/sed -i '' "$1" "$2"
      else
        sed -i "$1" "$2"
      fi
    }

    rm -rf ~/.warden
    {{bin}} init localnet --chain-id {{chain_id}} --default-denom uward > /dev/null
    {{bin}} config set client chain-id {{chain_id}}
    {{bin}} config set client keyring-backend test
    {{bin}} config set app minimum-gas-prices 0uward
    {{bin}} config set app api.enable true
    {{bin}} config set app api.enabled-unsafe-cors true
    {{bin}} config set app telemetry.enabled true
    {{bin}} config set config consensus.timeout_commit 1s -s
    replace 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/' ~/.warden/config/config.toml
    {{bin}} keys add val > /dev/null
    echo -n '{{shulgin_mnemonic}}' | {{bin}} keys add shulgin --recover > /dev/null
    {{bin}} genesis add-genesis-account val 10000000000000000000000000uward
    {{bin}} genesis add-genesis-account shulgin 10000000000000000000000000uward
    {{bin}} genesis add-genesis-space {{shulgin}}
    {{bin}} genesis add-genesis-keychain {{shulgin}} "WardenKMS"
    {{bin}} genesis gentx val 1000000000uward
    {{bin}} genesis collect-gentxs

    post_start () {
      sleep 3
      ethereum_analyzer_wasm="./contracts/artifacts/ethereum_analyzer.wasm"
      if [ -f $ethereum_analyzer_wasm ]; then
        just deploy-contract $ethereum_analyzer_wasm
      else
        echo "$ethereum_analyzer_wasm not found, will try to build it"
        pushd contracts
        just compile ethereum-analyzer
        popd
        if [ -f $ethereum_analyzer_wasm ]; then
          just deploy-contract $ethereum_analyzer_wasm
        else
          echo "Could not build ethereum_analyzer.wasm, giving up deploying it."
        fi
      fi
    }

    (post_start &) && {{bin}} start --x-crisis-skip-assert-invariants

deploy-contract contract from="shulgin" label="":
    #!/usr/bin/env bash
    CODE_ID=$(wardend tx wasm store {{contract}} --from {{from}} -y --gas auto --gas-adjustment 1.3 | wardend q wait-tx -o json | jq '.events[] | select(.type == "store_code") | .attributes[] | select(.key == "code_id") | .value | tonumber')
    ADDR=$(wardend tx wasm instantiate 1 '{}' --from {{from}} --label "{{if label == "" { "default" } else { label } }}" --no-admin -y | wardend q wait-tx -o json | jq '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')
    echo {{contract}} deployed at $ADDR
