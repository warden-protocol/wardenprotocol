#!/bin/bash
set -e  # Exit on any error

SHULGIN_PRIVATE='0xba4ce04e9390b2011960bf2ac71977861145ff9bb90137a3f3c56bc722e972f5'

# Deploy the contract
echo "Deploying PricePredExample contract..."
CONTRACT=$(forge create --root . --rpc-url http://localhost:8545 --evm-version paris --private-key $SHULGIN_PRIVATE PricePredExample.sol:PricePredExample --json --broadcast | jq -r '.deployedTo')
echo "Contract deployed at: $CONTRACT"

# Schedule the task (make the HTTP request)
echo "Scheduling HTTP request..."
cast send --rpc-url http://127.0.0.1:8545 --private-key $SHULGIN_PRIVATE $CONTRACT "run()"

echo "Read task id:"
TASK_ID=$(cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'lastTaskId()(uint64)')

# Query the task result
echo "Querying task result..."
TASK_RESULT=$(wardend q async task-by-id --id $TASK_ID --output json | jq -r '.task')
echo "Task result: $TASK_RESULT"

# Wait for the task to be processed
echo "Waiting for the task to be processed..."
sleep 20

# Manually invoke the callback to process the result
echo "Processing the result..."
cast send --rpc-url http://127.0.0.1:8545 --private-key $SHULGIN_PRIVATE $CONTRACT "cb(uint64,bytes)" $TASK_ID 0x

# Print predicted price and metrics
echo "Predicted Price:"
cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'predictedPrice()(uint256)'
echo "Predicted Metric 0:"
cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'predictedMetric0()(uint256)'
echo "Predicted Metric 7:"
cast call --rpc-url http://127.0.0.1:8545 $CONTRACT 'predictedMetric7()(uint256)'