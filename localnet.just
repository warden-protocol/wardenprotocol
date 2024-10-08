chain_id := "warden_1337-1"
shulgin := "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
shulgin_mnemonic := "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"

# run a single-node chain locally, use "bin" to specify the binary name
start bin="wardend" install="true":
    #!/usr/bin/env bash
    set -euxo pipefail

    if [[ "{{install}}" == "true" && "{{bin}}" == "wardend" ]]; then
        just wardend install
    fi

    function replace() {
      if [[ "$(uname)" == "Darwin" ]]; then
        /usr/bin/sed -i '' "$1" "$2"
      else
        sed -i "$1" "$2"
      fi
    }

    rm -rf ~/.warden
    {{bin}} init localnet --chain-id {{chain_id}} --default-denom award > /dev/null
    {{bin}} config set client chain-id {{chain_id}}
    {{bin}} config set client keyring-backend test
    {{bin}} config set app minimum-gas-prices 0award
    {{bin}} config set app api.enable true
    {{bin}} config set app api.enabled-unsafe-cors true
    {{bin}} config set config consensus.timeout_commit 1s -s
    replace 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/' ~/.warden/config/config.toml
    {{bin}} keys add val > /dev/null
    echo -n '{{shulgin_mnemonic}}' | {{bin}} keys add shulgin --recover > /dev/null
    {{bin}} genesis add-genesis-account val 10000000000000000000000000award
    {{bin}} genesis add-genesis-account shulgin 10000000000000000000000000award
    {{bin}} genesis add-genesis-space {{shulgin}}
    {{bin}} genesis add-genesis-keychain {{shulgin}} "WardenKMS" "{\"key_req\":[],\"sig_req\":[]}"
    replace 's/aevmos/award/' ~/.warden/config/genesis.json
    jq '.app_state.evm.params.active_static_precompiles = []' ~/.warden/config/genesis.json > temp.json && mv temp.json ~/.warden/config/genesis.json
    {{bin}} genesis gentx val 1000000000000000000000award
    {{bin}} genesis collect-gentxs
    {{bin}} genesis add-genesis-slinky-markets
    GENESIS="$HOME/.warden/config/genesis.json"
    jq '.consensus["params"]["abci"]["vote_extensions_enable_height"] = "2"' "$GENESIS" > "$GENESIS".tmp && mv "$GENESIS".tmp "$GENESIS"

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

# deploy a .wasm binary to the chain and return the contract address
deploy-contract contract from="shulgin" label="":
    #!/usr/bin/env bash
    CODE_ID=$(wardend tx wasm store {{contract}} --from {{from}} -y --gas auto --gas-adjustment 1.3 | wardend q wait-tx -o json | jq '.events[] | select(.type == "store_code") | .attributes[] | select(.key == "code_id") | .value | tonumber')
    ADDR=$(wardend tx wasm instantiate $CODE_ID '{}' --from {{from}} --label "{{if label == "" { "default" } else { label } }}" --no-admin -y | wardend q wait-tx -o json | jq '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')
    echo {{contract}} deployed at $ADDR

# run the slinky sidecar
slinky:
    go run github.com/skip-mev/slinky/cmd/slinky
