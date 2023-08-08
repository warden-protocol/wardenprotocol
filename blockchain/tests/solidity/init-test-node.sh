#!/bin/bash

CHAINID="fusion_420-1"
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
echo $VAL_MNEMONIC   | fusiond keys add $VAL_KEY   --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER1_MNEMONIC | fusiond keys add $USER1_KEY --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER2_MNEMONIC | fusiond keys add $USER2_KEY --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER3_MNEMONIC | fusiond keys add $USER3_KEY --recover --keyring-backend test --algo "eth_secp256k1"
echo $USER4_MNEMONIC | fusiond keys add $USER4_KEY --recover --keyring-backend test --algo "eth_secp256k1"

fusiond init $MONIKER --chain-id $CHAINID

# Set gas limit in genesis
cat $HOME/.fusiond/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.fusiond/config/tmp_genesis.json && mv $HOME/.fusiond/config/tmp_genesis.json $HOME/.fusiond/config/genesis.json

# modified default configs
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.fusiond/config/config.toml
    sed -i '' 's/prometheus-retention-time = 0/prometheus-retention-time  = 1000000000000/g' $HOME/.fusiond/config/app.toml
    sed -i '' 's/enabled = false/enabled = true/g' $HOME/.fusiond/config/app.toml
    sed -i '' 's/prometheus = false/prometheus = true/' $HOME/.fusiond/config/config.toml
    sed -i '' 's/timeout_commit = "5s"/timeout_commit = "1s"/g' $HOME/.fusiond/config/config.toml
else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.fusiond/config/config.toml
    sed -i 's/prometheus-retention-time  = "0"/prometheus-retention-time  = "1000000000000"/g' $HOME/.fusiond/config/app.toml
    sed -i 's/enabled = false/enabled = true/g' $HOME/.fusiond/config/app.toml
    sed -i 's/prometheus = false/prometheus = true/' $HOME/.fusiond/config/config.toml
    sed -i 's/timeout_commit = "5s"/timeout_commit = "1s"/g' $HOME/.fusiond/config/config.toml
fi

# Allocate genesis accounts (cosmos formatted addresses)
fusiond add-genesis-account "$(fusiond keys show $VAL_KEY   -a --keyring-backend test)" 1000000000000000000000nQRDO,1000000000000000000stake --keyring-backend test
fusiond add-genesis-account "$(fusiond keys show $USER1_KEY -a --keyring-backend test)" 1000000000000000000000nQRDO,1000000000000000000stake --keyring-backend test
fusiond add-genesis-account "$(fusiond keys show $USER2_KEY -a --keyring-backend test)" 1000000000000000000000nQRDO,1000000000000000000stake --keyring-backend test
fusiond add-genesis-account "$(fusiond keys show $USER3_KEY -a --keyring-backend test)" 1000000000000000000000nQRDO,1000000000000000000stake --keyring-backend test
fusiond add-genesis-account "$(fusiond keys show $USER4_KEY -a --keyring-backend test)" 1000000000000000000000nQRDO,1000000000000000000stake --keyring-backend test

# Sign genesis transaction
fusiond gentx $VAL_KEY 1000000000000000000stake --amount=1000000000000000000000nQRDO --chain-id $CHAINID --keyring-backend test

# Collect genesis tx
fusiond collect-gentxs

# Run this to ensure everything worked and that the genesis file is setup correctly
fusiond validate-genesis

# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
fusiond start --metrics --pruning=nothing --rpc.unsafe --keyring-backend test --log_level info --json-rpc.api eth,txpool,personal,net,debug,web3 --api.enable
