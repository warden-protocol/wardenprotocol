chain_id := "warden_1337-1"
shulgin := "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"
shulgin_mnemonic := "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"
val2 := "warden194j3dx4t7u80765k2puu3082vc39yfqnvrxqu7"
val2_mnemonic := "door blast other element embark noodle maple agent drastic bunker swarm logic wide deputy exhibit bicycle evil exile air other mesh foot tackle spot"
warden-precompiles := '["0x0000000000000000000000000000000000000100","0x0000000000000000000000000000000000000400","0x0000000000000000000000000000000000000800","0x0000000000000000000000000000000000000801","0x0000000000000000000000000000000000000802","0x0000000000000000000000000000000000000803","0x0000000000000000000000000000000000000804","0x0000000000000000000000000000000000000805","0x0000000000000000000000000000000000000900", "0x0000000000000000000000000000000000000901", "0x0000000000000000000000000000000000000902", "0x0000000000000000000000000000000000000903", "0x0000000000000000000000000000000000000904", "0x0000000000000000000000000000000000000905"]'

# run a single-node chain locally, use "bin" to specify the binary name
start bin="wardend" install="true" deploy-contracts="false":
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

    function json() {
      jq "$1" "$2" > "$2".tmp
      mv "$2".tmp "$2"
    }

    WARDEN_HOME="$HOME/.warden"
    GENESIS="$WARDEN_HOME/config/genesis.json"
    function edit_genesis() {
      json "$1" "$GENESIS"
    }

    rm -rf $WARDEN_HOME
    {{bin}} init localnet --chain-id {{chain_id}} --default-denom award > /dev/null
    {{bin}} config set client chain-id {{chain_id}}
    {{bin}} config set client keyring-backend test
    {{bin}} config set app minimum-gas-prices 0award
    {{bin}} config set app api.enable true
    {{bin}} config set app api.enabled-unsafe-cors true
    {{bin}} config set config consensus.timeout_commit 1s -s
    replace 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["*"]/' "$WARDEN_HOME/config/config.toml"
    {{bin}} keys add val > /dev/null
    echo -n '{{shulgin_mnemonic}}' | {{bin}} keys add shulgin --recover > /dev/null
    {{bin}} genesis add-genesis-account val 10000000000000000000000000award
    {{bin}} genesis add-genesis-account shulgin 10000000000000000000000000award
    {{bin}} genesis add-genesis-space {{shulgin}}
    {{bin}} genesis add-genesis-keychain {{shulgin}} "WardenKMS" "{\"key_req\":[],\"sig_req\":[]}"

    {{bin}} genesis add-genesis-plugin echo
    {{bin}} genesis add-genesis-plugin http
    {{bin}} genesis add-genesis-plugin pfp
    {{bin}} genesis add-genesis-plugin pricepred
    {{bin}} genesis add-genesis-plugin venice
    {{bin}} genesis add-genesis-plugin veniceimg
    {{bin}} genesis add-genesis-plugin quantkit

    {{bin}} genesis gentx val 1000000000000000000000award --chain-id {{chain_id}}
    {{bin}} genesis collect-gentxs
    {{bin}} genesis add-genesis-slinky-markets

    edit_genesis '.app_state.evm.params.active_static_precompiles += {{warden-precompiles}}'
    edit_genesis '.consensus["params"]["abci"]["vote_extensions_enable_height"] = "2"'
    edit_genesis '.app_state["evm"]["params"]["evm_denom"]="award"'
    edit_genesis '.app_state["gov"]["params"]["voting_period"]="30s"'
    edit_genesis '.app_state["gov"]["params"]["expedited_voting_period"]="15s"'
    edit_genesis '.app_state["feemarket"]["params"]["no_base_fee"]=true'

    post_start () {
      if [[ "{{deploy-contracts}}" == "false" ]]; then
        return
      fi

      sleep 5

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

# run the slinky sidecar
slinky:
    go run github.com/warden-protocol/connect/cmd/slinky
