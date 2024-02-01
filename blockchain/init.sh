#!/bin/bash

K1="shulgin"
K2="pootis"
CHAINID="wardenprotocol_121-1"
MONIKER="wardenprotocol"
KEYCHAIN="test"
#KEYALGO="eth_secp256k1"
LOGLEVEL="info"
# trace evm
TRACE="--trace"
# TRACE=""

# Check for and install jq if not present
command -v jq >/dev/null 2>&1 || {
    echo "jq not installed."
    # Detect OS and install jq
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Assume Ubuntu/Debian for simplicity. Adjust for other distros if needed.
        sudo apt update && sudo apt install -y jq
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install jq
    else
        echo "Unsupported OS for auto-install. Install jq manually. More info: https://stedolan.github.io/jq/download/"
        exit 1
    fi
}
# Check for and install gsed if on macOS if not present
if [[ "$OSTYPE" == "darwin"* ]]; then
    command -v gsed >/dev/null 2>&1 || {
        echo "gnu-sed not installed."
        brew install gnu-sed
    }
fi

# remove existing daemon and client
rm -rf ~/.wardend*

set -e

make install

wardend config keyring-backend $KEYCHAIN
wardend config chain-id $CHAINID

alias warden="wardend --node tcp://localhost:26657 --home ~/.wardend/ --from shulgin --gas-prices 1000000000nward"

#wardend keys add $K1 --keyring-backend $KEYCHAIN --algo $KEYALGO
echo "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge" | wardend keys add $K1 --recover
echo "maximum fold demand spend gauge describe expect end grain entry glow purse enlist chronic robust shy panic arrange eye retreat video chat sense rare" | wardend keys add $K2 --recover
# echo "wool bind jeans erase promote ten session sleep logic brick drift moral twist assume people action donor guard govern three disagree share clinic oppose" | wardend keys add $K3 --recover

# Set moniker and chain-id
wardend init $MONIKER --chain-id $CHAINID

# Change parameter token denominations to nward
cat $HOME/.wardend/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="nward"' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json
cat $HOME/.wardend/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="nward"' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json
cat $HOME/.wardend/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="nward"' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json
cat $HOME/.wardend/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="nward"' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json

# Initialize state for testing
# - First keychain, owned by shulgin
cat $HOME/.wardend/config/genesis.json | jq '.app_state["identity"]["keychains"]=[{"address": "wardenkeychain1ph63us46lyw56lmt585", "is_active": true, "creator": "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5", "description": "ACME corp", admins: ["warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"], parties: ["warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"], "admin_intent_id":0, fees: {"key_req":0, "sig_req":0} }]' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json
cat $HOME/.wardend/config/genesis.json | jq '.app_state["identity"]["spaces"]=[{"address": "wardenspace14a2hpadpsy9h5sm54xj", "creator": "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5", "owners": ["warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5"], address: "wardenspace14a2hpadpsy9h5sm54xj"}]' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json

# Set gas limit and base fee in genesis
cat $HOME/.wardend/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="20000000"' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json
cat $HOME/.wardend/config/genesis.json | jq '.app_state["feemarket"]["params"]["base_fee"]="50"' > $HOME/.wardend/config/tmp_genesis.json && mv $HOME/.wardend/config/tmp_genesis.json $HOME/.wardend/config/genesis.json

function ssed {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        gsed "$@"
    else
        sed "$@"
    fi
}

# disable produce empty block and enable prometheus metrics
ssed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.wardend/config/config.toml
ssed -i 's/prometheus = false/prometheus = true/' $HOME/.wardend/config/config.toml
ssed -i 's/prometheus-retention-time  = "0"/prometheus-retention-time  = "1000000000000"/g' $HOME/.wardend/config/app.toml
ssed -i 's/enabled = false/enabled = true/g' $HOME/.wardend/config/app.toml

# enable Tendermint RPC cors from localhost
ssed -i 's/cors_allowed_origins = \[\]/cors_allowed_origins = ["http:\/\/localhost:5173"]/g' $HOME/.wardend/config/config.toml

if [[ $1 == "pending" ]]; then
  echo "pending mode is on, please wait for the first block committed."
  ssed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $HOME/.wardend/config/config.toml
  ssed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.wardend/config/config.toml
fi

# Allocate genesis accounts (cosmos formatted addresses)
wardend add-genesis-account $K1 100000000000000000000000000nward --keyring-backend $KEYCHAIN
wardend add-genesis-account $K2 100000000000000000000000000nward --keyring-backend $KEYCHAIN

# Sign genesis transaction
wardend gentx $K1 1000000000000000000000nward --keyring-backend $KEYCHAIN --chain-id $CHAINID #--output-document $HOME/.wardend/config/gentx-sk1.json
# wardend gentx $K2 1000000000000000000000nward --keyring-backend $KEYCHAIN --chain-id $CHAINID --output-document $HOME/.wardend/config/gentx/gentx-sk2.json

# Collect genesis tx
wardend collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
wardend validate-genesis

if [[ $1 == "--alternateports" ]]; then
# Change ports to avoid conflicts with other chains running locally
  ssed -i 's/26656/27656/g' $HOME/.wardend/config/config.toml
  ssed -i 's/26657/27657/g' $HOME/.wardend/config/config.toml
  ssed -i 's/6060/6760/g' $HOME/.wardend/config/config.toml
  ssed -i 's/1317/1717/g' $HOME/.wardend/config/app.toml
  ssed -i 's/9090/9790/g' $HOME/.wardend/config/app.toml
  ssed -i 's/9091/9791/g' $HOME/.wardend/config/app.toml
fi

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
wardend start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001nward --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable  --api.enabled-unsafe-cors
