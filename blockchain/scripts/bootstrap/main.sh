#!/usr/bin/env bash

# Set DIR
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

# Global default variables
wardend_BIN="$DIR/../../cmd/wardend/wardend"
SCRIPT=$(basename "${BASH_SOURCE[0]}")
N_VALIDATORS=1
KEYRING_BACKEND="test"
CHAIN_ID="local_420-1"
BOND_COINS="1000000000000000000000nward"
ARTIFACTS_DIR="$DIR/artifacts"
GENESIS="$ARTIFACTS_DIR/config/genesis.json"

usage() {
    echo "Usage: $SCRIPT"
    echo ""
    echo "-n <number>  -- number of validators"
    echo "-c <string>  -- chain ID"
    echo "-b <string>  -- amount of coins to bond"
    exit 1
}

while getopts "h?n:c:" args; do
    case $args in
        h|\?) usage;;
        n ) N_VALIDATORS=${OPTARG};;
        c ) CHAIN_ID=${OPTARG};;
        b ) BOND_COINS=${OPTARG};;
    esac
done

set -eo pipefail

# Check wardend binary
if [ ! -f "$wardend_BIN" ]; then
    echo "Missing wardend binary"
    exit 1
fi

# Configure keychain backend
$wardend_BIN config keyring-backend "$KEYRING_BACKEND" --home "$ARTIFACTS_DIR"

# Configure chain id
$wardend_BIN config chain-id "$CHAIN_ID" --home "$ARTIFACTS_DIR"

# Run init to get default config files
$wardend_BIN init bootstrap --chain-id "$CHAIN_ID" --home "$ARTIFACTS_DIR" 1>/dev/null 2>&1

# Bootstrap validator/s
for i in $(seq "$N_VALIDATORS"); do
    echo "Bootstraping validator $i"
    $wardend_BIN keys add "validator_operator_$i" --home "$ARTIFACTS_DIR" 2>&1 | \
        tail -n2 | head -n1 > "$ARTIFACTS_DIR/mnemonic_$i"
    $wardend_BIN add-genesis-account "validator_operator_$i" 100000000000000000000000000nward \
        --keyring-backend "$KEYRING_BACKEND" --home "$ARTIFACTS_DIR"
    $wardend_BIN gentx "validator_operator_$i" "$BOND_COINS" \
        --keyring-backend "$KEYRING_BACKEND" --chain-id "$CHAIN_ID" --home "$ARTIFACTS_DIR" \
        --moniker "validator-$i" --note "validator-$i"
    mv "$ARTIFACTS_DIR/config/node_key.json" "$ARTIFACTS_DIR/validator_${i}_node_key.json"
    mv "$ARTIFACTS_DIR/config/priv_validator_key.json" "$ARTIFACTS_DIR/validator_${i}_priv_validator_key.json"
done

# Genesis params
tmpfile=$(mktemp)
jq '.app_state["staking"]["params"]["bond_denom"]="nward"' < "$GENESIS" > "$tmpfile" && mv "$tmpfile" "$GENESIS"
jq '.app_state["crisis"]["constant_fee"]["denom"]="nward"' < "$GENESIS" > "$tmpfile" && mv "$tmpfile" "$GENESIS"
jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="nward"' < "$GENESIS" > "$tmpfile" && mv "$tmpfile" "$GENESIS"
jq '.app_state["mint"]["params"]["mint_denom"]="nward"' < "$GENESIS" > "$tmpfile" && mv "$tmpfile" "$GENESIS"
jq '.consensus_params["block"]["max_gas"]="20000000"' < "$GENESIS" > "$tmpfile" && mv "$tmpfile" "$GENESIS"

# Collect generated txs
$wardend_BIN collect-gentxs --chain-id "$CHAIN_ID" --home "$ARTIFACTS_DIR" 1>/dev/null 2>&1

echo "Bootstrap finished"
