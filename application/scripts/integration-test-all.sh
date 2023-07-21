#!/bin/bash

# "stable" mode tests assume data is static
# "live" mode tests assume data dynamic

SCRIPT=$(basename ${BASH_SOURCE[0]})
TEST=""
QTD=1
SLEEP_TIMEOUT=5
TEST_QTD=1

## remove test data dir after
REMOVE_DATA_DIR=false

#PORT AND RPC_PORT 3 initial digits, to be concat with a suffix later when node is initialized
RPC_PORT="854"
IP_ADDR="0.0.0.0"

KEY="mykey"
CHAINID="ethermint_9000-1"
MONIKER="mymoniker"

## default port prefixes for fusiond
NODE_P2P_PORT="2660"
NODE_PORT="2663"
NODE_RPC_PORT="2666"

usage() {
    echo "Usage: $SCRIPT"
    echo "Optional command line arguments"
    echo "-t <string>  -- Test to run. eg: rpc"
    echo "-q <number>  -- Quantity of nodes to run. eg: 3"
    echo "-z <number>  -- Quantity of nodes to run tests against eg: 3"
    echo "-s <number>  -- Sleep between operations in secs. eg: 5"
    echo "-r <string>  -- Remove test dir after, eg: true, default is false"
    exit 1
}

while getopts "h?t:q:z:s:m:r:" args; do
    case $args in
        h|\?)
            usage;
        exit;;
        t ) TEST=${OPTARG};;
        q ) QTD=${OPTARG};;
        z ) TEST_QTD=${OPTARG};;
        s ) SLEEP_TIMEOUT=${OPTARG};;
        m ) MODE=${OPTARG};;
        r ) REMOVE_DATA_DIR=${OPTARG};;
    esac
done

set -euxo pipefail

DATA_DIR=$(mktemp -d -t ethermint-datadir.XXXXX)

if [[ ! "$DATA_DIR" ]]; then
    echo "Could not create $DATA_DIR"
    exit 1
fi

# Compile ethermint
echo "compiling ethermint"
make build

# PID array declaration
arr=()

init_func() {
    "$PWD"/build/fusiond keys add $KEY"$i" --keyring-backend test --home "$DATA_DIR$i" --no-backup --algo "eth_secp256k1"
    "$PWD"/build/fusiond init $MONIKER --chain-id $CHAINID --home "$DATA_DIR$i"
    "$PWD"/build/fusiond add-genesis-account \
    "$("$PWD"/build/fusiond keys show "$KEY$i" --keyring-backend test -a --home "$DATA_DIR$i")" 1000000000000000000qrdo,1000000000000000000stake \
    --keyring-backend test --home "$DATA_DIR$i"
    "$PWD"/build/fusiond gentx "$KEY$i" 1000000000000000000stake --chain-id $CHAINID --keyring-backend test --home "$DATA_DIR$i"
    "$PWD"/build/fusiond collect-gentxs --home "$DATA_DIR$i"
    "$PWD"/build/fusiond validate-genesis --home "$DATA_DIR$i"

    if [[ $MODE == "pending" ]]; then
      ls $DATA_DIR$i
      if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "2s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_prevote = "1s"/timeout_prevote = "120s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "2s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "2s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $DATA_DIR$i/config/config.toml
        sed -i '' 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $DATA_DIR$i/config/config.toml
      else
        sed -i 's/create_empty_blocks_interval = "0s"/create_empty_blocks_interval = "30s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_propose = "3s"/timeout_propose = "30s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_propose_delta = "500ms"/timeout_propose_delta = "2s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_prevote = "1s"/timeout_prevote = "120s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_prevote_delta = "500ms"/timeout_prevote_delta = "2s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_precommit = "1s"/timeout_precommit = "10s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_precommit_delta = "500ms"/timeout_precommit_delta = "2s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_commit = "5s"/timeout_commit = "150s"/g' $DATA_DIR$i/config/config.toml
        sed -i 's/timeout_broadcast_tx_commit = "10s"/timeout_broadcast_tx_commit = "150s"/g' $DATA_DIR$i/config/config.toml
      fi
    fi
}

start_func() {
    echo "starting ethermint node $i in background ..."
    "$PWD"/build/fusiond start --pruning=nothing --rpc.unsafe \
    --p2p.laddr tcp://$IP_ADDR:$NODE_P2P_PORT"$i" --address tcp://$IP_ADDR:$NODE_PORT"$i" --rpc.laddr tcp://$IP_ADDR:$NODE_RPC_PORT"$i" \
    --json-rpc.address=$IP_ADDR:$RPC_PORT"$i" \
    --json-rpc.api="eth,txpool,personal,net,debug,web3" \
    --keyring-backend test --home "$DATA_DIR$i" \
    >"$DATA_DIR"/node"$i".log 2>&1 & disown

    ETHERMINT_PID=$!
    echo "started ethermint node, pid=$ETHERMINT_PID"
    # add PID to array
    arr+=("$ETHERMINT_PID")

    if [[ $MODE == "pending" ]]; then
      echo "waiting for the first block..."
      sleep 300
    fi
}

# Run node with static blockchain database
# For loop N times
for i in $(seq 1 "$QTD"); do
    init_func "$i"
    start_func "$i"
    sleep 1
    echo "sleeping $SLEEP_TIMEOUT seconds for startup"
    sleep "$SLEEP_TIMEOUT"
    echo "done sleeping"
done

echo "sleeping $SLEEP_TIMEOUT seconds before running tests ... "
sleep "$SLEEP_TIMEOUT"
echo "done sleeping"

set +e

if [[ -z $TEST || $TEST == "integration" ]] ; then
    time_out=300s

    for i in $(seq 1 "$TEST_QTD"); do
        HOST_RPC=http://$IP_ADDR:$RPC_PORT"$i"
        echo "going to test ethermint node $HOST_RPC ..."
        MODE=$MODE HOST=$HOST_RPC go test ./tests/e2e/... -timeout=$time_out -v -short
        TEST_FAIL=$?
    done
fi

if [[ -z $TEST || $TEST == "rpc" ||  $TEST == "pending" ]]; then
    time_out=300s
    if [[ $TEST == "pending" ]]; then
      time_out=60m0s
    fi

    for i in $(seq 1 "$TEST_QTD"); do
        HOST_RPC=http://$IP_ADDR:$RPC_PORT"$i"
        echo "going to test ethermint node $HOST_RPC ..."
        MODE=$MODE HOST=$HOST_RPC go test ./tests/rpc/... -timeout=$time_out -v -short

        TEST_FAIL=$?
    done

fi

stop_func() {
    ETHERMINT_PID=$i
    echo "shutting down node, pid=$ETHERMINT_PID ..."

    # Shutdown ethermint node
    kill -9 "$ETHERMINT_PID"
    wait "$ETHERMINT_PID"

    if [ $REMOVE_DATA_DIR == "true" ]
    then
        rm -rf $DATA_DIR*
    fi
}

for i in "${arr[@]}"; do
    stop_func "$i"
done

if [[ (-z $TEST || $TEST == "rpc" || $TEST == "integration" ) && $TEST_FAIL -ne 0 ]]; then
    exit $TEST_FAIL
else
    exit 0
fi
