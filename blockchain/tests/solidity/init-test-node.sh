#!/bin/bash

CHAINID="ethermint_9000-1"
MONIKER="localtestnet"

# localKey address 0x7cb61d4117ae31a12e393a1cfa3bac666481d02e
VAL_KEY="localkey"
VAL_MNEMONIC="gesture inject test cycle original hollow east ridge hen combine junk child bacon zero hope comfort vacuum milk pitch cage oppose unhappy lunar seat"

# user1 address 0xc6fe5d33615a1c52c08018c47e8bc53646a0e101
USER1_KEY="user1"
USER1_MNEMONIC="copper push brief egg scan entry inform record adjust fossil boss egg comic alien upon aspect dry avoid interest fury window hint race symptom"

# user2 address 0x963ebdf2e1f8db8707d05fc75bfeffba1b5bac17
USER2_KEY="user2"
USER2_MNEMONIC="maximum display century economy unlock van census kite error heart snow filter midnight usage egg venture cash kick motor survey drastic edge muffin visual"

# user3 address 0x40a0cb1C63e026A81B55EE1308586E21eec1eFa9
USER3_KEY="user3"
USER3_MNEMONIC="will wear settle write dance topic tape sea glory hotel oppose rebel client problem era video gossip glide during yard balance cancel file rose"

# user4 address 0x498B5AeC5D439b733dC2F58AB489783A23FB26dA
USER4_KEY="user4"
USER4_MNEMONIC="doll midnight silk carpet brush boring pluck office gown inquiry duck chief aim exit gain never tennis crime fragile ship cloud surface exotic patch"

# remove existing daemon and client
rm -rf ~/.ethermint*

# Import keys from mnemonics
echo $VAL_MNEMONIC   | ethermintd keys add $VAL_KEY   --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER1_MNEMONIC | ethermintd keys add $USER1_KEY --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER2_MNEMONIC | ethermintd keys add $USER2_KEY --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER3_MNEMONIC | ethermintd keys add $USER3_KEY --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER4_MNEMONIC | ethermintd keys add $USER4_KEY --recover --keyring-backend test --algo "eth_secp256k1"

ethermintd init $MONIKER --chain-id $CHAINID

# Set gas limit in genesis
cat $HOME/.ethermintd/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.ethermintd/config/tmp_genesis.json && mv $HOME/.ethermintd/config/tmp_genesis.json $HOME/.ethermintd/config/genesis.json

# modified default configs
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ethermintd/config/config.toml
    sed -i '' 's/prometheus-retention-time = 0/prometheus-retention-time  = 1000000000000/g' $HOME/.ethermintd/config/app.toml
    sed -i '' 's/enabled = false/enabled = true/g' $HOME/.ethermintd/config/app.toml
    sed -i '' 's/prometheus = false/prometheus = true/' $HOME/.ethermintd/config/config.toml
    sed -i '' 's/timeout_commit = "5s"/timeout_commit = "1s"/g' $HOME/.ethermintd/config/config.toml
else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.ethermintd/config/config.toml
    sed -i 's/prometheus-retention-time  = "0"/prometheus-retention-time  = "1000000000000"/g' $HOME/.ethermintd/config/app.toml
    sed -i 's/enabled = false/enabled = true/g' $HOME/.ethermintd/config/app.toml
    sed -i 's/prometheus = false/prometheus = true/' $HOME/.ethermintd/config/config.toml
    sed -i 's/timeout_commit = "5s"/timeout_commit = "1s"/g' $HOME/.ethermintd/config/config.toml
fi

# Allocate genesis accounts (cosmos formatted addresses)
ethermintd add-genesis-account "$(ethermintd keys show $VAL_KEY   -a --keyring-backend test)" 1000000000000000000000aphoton,1000000000000000000stake --keyring-backend test
ethermintd add-genesis-account "$(ethermintd keys show $USER1_KEY -a --keyring-backend test)" 1000000000000000000000aphoton,1000000000000000000stake --keyring-backend test
ethermintd add-genesis-account "$(ethermintd keys show $USER2_KEY -a --keyring-backend test)" 1000000000000000000000aphoton,1000000000000000000stake --keyring-backend test
ethermintd add-genesis-account "$(ethermintd keys show $USER3_KEY -a --keyring-backend test)" 1000000000000000000000aphoton,1000000000000000000stake --keyring-backend test
ethermintd add-genesis-account "$(ethermintd keys show $USER4_KEY -a --keyring-backend test)" 1000000000000000000000aphoton,1000000000000000000stake --keyring-backend test

# Sign genesis transaction
ethermintd gentx $VAL_KEY 1000000000000000000stake --amount=1000000000000000000000aphoton --chain-id $CHAINID --keyring-backend test

# Collect genesis tx
ethermintd collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
ethermintd validate-genesis

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
ethermintd start --metrics --pruning=nothing --rpc.unsafe --keyring-backend test --log_level info --json-rpc.api eth,txpool,personal,net,debug,web3 --api.enable
