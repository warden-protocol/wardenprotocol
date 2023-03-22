#!/bin/bash

KEY="shulgin"
CHAINID="fusion_420-1"
MONIKER="qredofusionchain"
KEYRING="test"
#KEYALGO="eth_secp256k1"
LOGLEVEL="info"
# EVM trace, leave blank to disable
TRACE="--trace"

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# remove existing daemon and client
rm -rf ~/.ethermintd*

# used to exit on first error (any non-zero exit code)
set -e

make install

ethermintd config keyring-backend $KEYRING
ethermintd config chain-id $CHAINID

# if $KEY exists it should be deleted
#ethermintd keys add $KEY --keyring-backend $KEYRING --algo $KEYALGO
echo "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge" | ethermintd keys add $KEY --recover

# Set moniker and chain-id for Ethermint (Moniker can be anything, chain-id must be an integer)
ethermintd init $MONIKER --chain-id $CHAINID

# Change parameter token denominations to qrdo
cat $HOME/.ethermintd/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="qrdo"' > $HOME/.ethermintd/config/tmp_genesis.json && mv $HOME/.ethermintd/config/tmp_genesis.json $HOME/.ethermintd/config/genesis.json
cat $HOME/.ethermintd/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="qrdo"' > $HOME/.ethermintd/config/tmp_genesis.json && mv $HOME/.ethermintd/config/tmp_genesis.json $HOME/.ethermintd/config/genesis.json
cat $HOME/.ethermintd/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="qrdo"' > $HOME/.ethermintd/config/tmp_genesis.json && mv $HOME/.ethermintd/config/tmp_genesis.json $HOME/.ethermintd/config/genesis.json
cat $HOME/.ethermintd/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="qrdo"' > $HOME/.ethermintd/config/tmp_genesis.json && mv $HOME/.ethermintd/config/tmp_genesis.json $HOME/.ethermintd/config/genesis.json

# increase block time (?)
cat $HOME/.ethermintd/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="1000"' > $HOME/.ethermintd/config/tmp_genesis.json && mv $HOME/.ethermintd/config/tmp_genesis.json $HOME/.ethermintd/config/genesis.json

# Set gas limit in genesis
cat $HOME/.ethermintd/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.ethermintd/config/tmp_genesis.json && mv $HOME/.ethermintd/config/tmp_genesis.json $HOME/.ethermintd/config/genesis.json

# disable produce empty block
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ethermintd/config/config.toml
  else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ethermintd/config/config.toml
fi

if [[ $1 == "pending" ]]; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
      sed -i '' 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
  else
      sed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_prevote = "1s"/timeout_prevote = "10s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "5s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
      sed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $HOME/.ethermintd/config/config.toml
  fi
fi

# Allocate genesis accounts (cosmos formatted addresses)
ethermintd add-genesis-account $KEY 100000000000000000000000000qrdo --keyring-backend $KEYRING

# Sign genesis transaction
ethermintd gentx $KEY 1000000000000000000000qrdo --keyring-backend $KEYRING --chain-id $CHAINID

# Collect genesis tx
ethermintd collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
ethermintd validate-genesis

if [[ $1 == "pending" ]]; then
  echo "pending mode is on, please wait for the first block committed."
fi

sed -i '' 's/26656/27656/g' $HOME/.ethermintd/config/config.toml
sed -i '' 's/26657/27657/g' $HOME/.ethermintd/config/config.toml
sed -i '' 's/6060/6760/g' $HOME/.ethermintd/config/config.toml
sed -i '' 's/1317/1717/g' $HOME/.ethermintd/config/app.toml
sed -i '' 's/9090/9790/g' $HOME/.ethermintd/config/app.toml
sed -i '' 's/9091/9791/g' $HOME/.ethermintd/config/app.toml

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
ethermintd start --pruning=nothing --evm.tracer=json $TRACE --log_level $LOGLEVEL --minimum-gas-prices=0.0001qrdo --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable
