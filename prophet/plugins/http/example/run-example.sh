#!/bin/bash
set -e  # Exit on any error

SHULGIN_PRIVATE='0xba4ce04e9390b2011960bf2ac71977861145ff9bb90137a3f3c56bc722e972f5'

# Deploy the contract
echo "Deploying HttpExample contract..."
CONTRACT=$(forge create --root . --rpc-url http://localhost:8545 --evm-version paris --private-key $SHULGIN_PRIVATE HttpExample.sol:HttpExample --json --broadcast | jq -r '.deployedTo')
echo "Contract deployed at: $CONTRACT"

# Schedule the task (make the HTTP request)
echo "Scheduling HTTP request..."
cast send --rpc-url http://127.0.0.1:8545 --private-key $SHULGIN_PRIVATE $CONTRACT "run()"

echo "Read task id:"
TASK_ID=$(cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'lastTaskId()(uint64)')
# Query the task result
# echo "Querying task result..."
# TASK_RESULT=$(./wardend q async tasks --output json | jq -r '.tasks[0].task')
# echo "Task result: $FUTURE_RESULT"

# Wait for the task to be processed
echo "Waiting for the task to be processed..."
sleep 10

# Manually invoke the callback to process the result
echo "Processing the result..."
cast send --rpc-url http://127.0.0.1:8545 --private-key $SHULGIN_PRIVATE $CONTRACT "cb(uint64,bytes)" $TASK_ID 0x

echo "Response body:"
cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'responseBody()(bytes)'

# Check the retrieved prices
echo "Bitcoin price:"
cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'bitcoinPrice()(int256)'

echo "Tether price:"
cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'tetherPrice()(int256)'

echo "Uniswap price:"
cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'uniswapPrice()(int256)'