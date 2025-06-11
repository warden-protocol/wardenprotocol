chain_id := "warden_1337-1"
shulgin := "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
shulgin_mnemonic := "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"
val2 := "warden194j3dx4t7u80765k2puu3082vc39yfqnvrxqu7"
val2_mnemonic := "door blast other element embark noodle maple agent drastic bunker swarm logic wide deputy exhibit bicycle evil exile air other mesh foot tackle spot"
warden-precompiles := '["0x0000000000000000000000000000000000000100","0x0000000000000000000000000000000000000400","0x0000000000000000000000000000000000000800","0x0000000000000000000000000000000000000801","0x0000000000000000000000000000000000000802","0x0000000000000000000000000000000000000803","0x0000000000000000000000000000000000000804","0x0000000000000000000000000000000000000805","0x0000000000000000000000000000000000000900", "0x0000000000000000000000000000000000000901", "0x0000000000000000000000000000000000000902", "0x0000000000000000000000000000000000000903", "0x0000000000000000000000000000000000000904", "0x0000000000000000000000000000000000000905"]'

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
    {{bin}} config set client chain-id {{chain_id}}
    {{bin}} config set client keyring-backend test
    {{bin}} init localnet --chain-id {{chain_id}} --default-denom award > /dev/null
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

    {{bin}} genesis add-genesis-plugin echo
    {{bin}} genesis add-genesis-plugin http
    {{bin}} genesis add-genesis-plugin pricepred
    {{bin}} genesis add-genesis-plugin venice
    {{bin}} genesis add-genesis-plugin veniceimg
    {{bin}} genesis add-genesis-plugin quantkit

    {{bin}} genesis gentx val 1000000000000000000000award
    {{bin}} genesis collect-gentxs
    {{bin}} genesis add-genesis-slinky-markets
    GENESIS="$HOME/.warden/config/genesis.json"
    jq '.app_state.evm.params.active_static_precompiles += {{warden-precompiles}}' "$GENESIS" > "$GENESIS".tmp && mv "$GENESIS".tmp "$GENESIS"
    jq '.consensus["params"]["abci"]["vote_extensions_enable_height"] = "2"' "$GENESIS" > "$GENESIS".tmp && mv "$GENESIS".tmp "$GENESIS"
    jq '.app_state["evm"]["params"]["evm_denom"]="award"' "$GENESIS" > $GENESIS.tmp && mv "$GENESIS".tmp "$GENESIS"

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

      osmosis_analyzer_wasm="./contracts/artifacts/osmosis_analyzer.wasm"
      if [ -f $osmosis_analyzer_wasm ]; then
        just deploy-contract $osmosis_analyzer_wasm
      else
        echo "$osmosis_analyzer_wasm not found, will try to build it"
        pushd contracts
        just compile osmosis-analyzer
        popd
        if [ -f $osmosis_analyzer_wasm ]; then
          just deploy-contract $ethereum_analyzer_wasm
        else
          echo "Could not build osmosis_analyzer.wasm, giving up deploying it."
        fi
      fi
    }

    (post_start &) && {{bin}} start

start-2 bin="wardend" install="true":
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

    # prepare node 2
    rm -rf $HOME/.warden-val2
    {{bin}} --home ~/.warden-val2 init localnet --chain-id {{chain_id}} --default-denom award > /dev/null
    {{bin}} --home ~/.warden-val2 config set client chain-id {{chain_id}}
    {{bin}} --home ~/.warden-val2 config set client keyring-backend test
    {{bin}} --home ~/.warden-val2 config set app minimum-gas-prices 0award
    {{bin}} --home ~/.warden-val2 config set config consensus.timeout_commit 1s -s
    echo -n '{{val2_mnemonic}}' | {{bin}} --home ~/.warden-val2 --keyring-backend=test keys add val --recover > /dev/null
    {{bin}} --home ~/.warden-val2 --keyring-backend=test genesis add-genesis-account val 10000000000000000000000000award
    replace 's/aevmos/award/' ~/.warden-val2/config/genesis.json
    replace 's/aevmos/award/' ~/.warden-val2/config/app.toml
    {{bin}} --home ~/.warden-val2 --keyring-backend=test genesis gentx val 1000000000000000000000award

    # for changing default ports
    replace 's/tcp\:\/\/localhost\:26657/tcp\:\/\/localhost:26697/' ~/.warden-val2/config/client.toml
    replace 's/tcp\:\/\/localhost\:1317/tcp\:\/\/localhost:1397/' ~/.warden-val2/config/app.toml
    replace 's/localhost\:9090/localhost:9990/' ~/.warden-val2/config/app.toml
    replace 's/127\.0\.0\.1\:8545/127.0.0.1:8595/' ~/.warden-val2/config/app.toml
    replace 's/127\.0\.0\.1\:8546/127.0.0.1:8596/' ~/.warden-val2/config/app.toml
    replace 's/tcp\:\/\/0\.0\.0\.0\:26656/tcp\:\/\/127.0.0.1:26696/' ~/.warden-val2/config/config.toml
    replace 's/tcp\:\/\/127\.0\.0\.1\:26657/tcp\:\/\/127.0.0.1:26697/' ~/.warden-val2/config/config.toml


    # prepare node 1
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
    replace 's/aevmos/award/' ~/.warden/config/app.toml
    jq '.app_state.evm.params.active_static_precompiles += {{warden-precompiles}}' ~/.warden/config/genesis.json > temp.json && mv temp.json ~/.warden/config/genesis.json
    {{bin}} genesis gentx val 1000000000000000000000award
    {{bin}} genesis add-genesis-account {{val2}} 10000000000000000000000000award
    cp ~/.warden-val2/config/gentx/* ~/.warden/config/gentx/
    {{bin}} genesis collect-gentxs
    {{bin}} genesis add-genesis-slinky-markets
    GENESIS="$HOME/.warden/config/genesis.json"
    jq '.consensus["params"]["abci"]["vote_extensions_enable_height"] = "2"' "$GENESIS" > "$GENESIS".tmp && mv "$GENESIS".tmp "$GENESIS"
    cp $GENESIS ~/.warden-val2/config/genesis.json

    echo "run \"wardend --home ~/.warden-val2 start\" to start node 2"
    node2_id=$({{bin}} comet show-node-id --home ~/.warden-val2)
    {{bin}} start --p2p.persistent_peers $node2_id@127.0.0.1:26696


# deploy a .wasm binary to the chain and return the contract address
deploy-contract contract from="shulgin" label="":
    #!/usr/bin/env bash
    CODE_ID=$(wardend tx wasm store {{contract}} --from {{from}} -y --gas auto --gas-adjustment 1.3 | wardend q wait-tx -o json | jq '.events[] | select(.type == "store_code") | .attributes[] | select(.key == "code_id") | .value | tonumber')
    ADDR=$(wardend tx wasm instantiate $CODE_ID '{}' --from {{from}} --label "{{if label == "" { "default" } else { label } }}" --no-admin -y | wardend q wait-tx -o json | jq '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')
    echo {{contract}} deployed at $ADDR

# run the slinky sidecar
slinky:
    go run github.com/skip-mev/slinky/cmd/slinky
