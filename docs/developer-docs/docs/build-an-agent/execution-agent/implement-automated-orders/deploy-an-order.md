---
sidebar_position: 5
---

# Deploy an Order

## Overview

This article will guide you through deploying and managing automated Orders – instances of the [`BasicOrder`](implement-orders) contract.

You'll deploy the following: 

1. **Core infrastructure (Registry and Factory)**
2. **A Basic Order that:**
   - Monitors ETH/USD price
   - Executes when price crosses a threshold
   - Swaps tokens on Uniswap

## Setup

### 1. Enviorment configuration

Create `.env` with your deployment parameters:

```bash
# Network Configuration
RPC_URL="http://127.0.0.1:8545"
CHAIN_ID="12345"

# Account Configuration
MNEMONIC="your mnemonic phrase here"
SCHEDULER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
FACTORY_OWNER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
```

### 2. Build contracts

```bash
# Install dependencies
yarn install

# Compile contracts
forge build   
```

## Deployment steps

### 1. Deployment infrastructure

Deploy the Registry and Factory contracts:

```bash
# Load environment
source .env

# Deploy infrastructure
forge script script/Deploy.s.sol:Deploy \
    --rpc-url $RPC_URL \
    --broadcast \
    --chain-id $CHAIN_ID
```

### 2. Create an Order

Deploy a Basic Order with price monitoring:

```bash
# Create order parameters
THRESHOLD_PRICE="3324181371"  # Target price in oracle decimals
PRICE_CONDITION="0"           # 0 for LTE, 1 for GTE
PRICE_PAIR='("ETH","USD")'    # Oracle price pair

# Transaction parameters
TX_FIELDS="\
(100000000000000,\    # Value (in wei)
11155111,\            # Chain ID
0x467b...1f,\        # Target contract
0x7ff3...)`          # Encoded swap data"

# Deploy order
forge script script/CreateOrder.s.sol:CreateOrder \
    --rpc-url $RPC_URL \
    --broadcast \
    --sig "basic(uint256,uint8,(string,string),(uint256,uint256,address,bytes))" \
    $THRESHOLD_PRICE \
    $PRICE_CONDITION \
    $PRICE_PAIR \
    $TX_FIELDS
```

## Monitoring & management

### 1. Check the Order status

Monitor your order's state:

```bash
# Check if executable
cast call $ORDER_ADDRESS "canExecute()"

# Check if executed
cast call $ORDER_ADDRESS "isExecuted()"

# Get execution data
cast call $ORDER_ADDRESS "executionData()"
```

### 2. Monitor events

Watch for important events:

```bash
# Watch for execution
cast logs $ORDER_ADDRESS "Executed()"

# Watch for new transactions
cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
```

### 3. Query price data

Check current prices:

```bash
# Get oracle price
cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
```

## Debugging

### 1. Transaction details

Get raw transaction data:

```bash
# Get unsigned transaction
cast call $ORDER_ADDRESS "getTx()"
```

### 2. Registry information

Query the registry:

```bash
# Get order creator
cast call $REGISTRY_ADDRESS "executions(address)" $ORDER_ADDRESS

# Get transaction details
cast call $REGISTRY_ADDRESS "transactions(bytes32)" $TX_HASH
```

## Moving to advanced Orders

After successfully deploying a Basic Order, you can move to Advanced Orders which add:

### 1. Prediction integration

```bash
# Additional parameters for advanced orders
ORACLE_PAIR='("ETH","USD")'
PREDICT_PAIR='("ethereum","tether")'
```

### 2. Complex conditions

```bash
# Extended condition types
PRICE_CONDITION="2"  # 2 for LT, 3 for GT
```

### 3. Time windows

```bash
# Check validity window
cast call $ORDER_ADDRESS "validUntil()"
```

## Troubleshooting guide

Common issues and solutions:

### 1. Order creation fails

```bash
# Check salt usage
cast call $FACTORY_ADDRESS "usedSalts(bytes32)" $SALT

# Verify registry status
cast call $REGISTRY_ADDRESS "isRegistered(address)" $ORDER_ADDRESS
```

### 2. Execution issues

```bash
# Check price feeds
cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"

# Verify scheduler permissions
cast call $ORDER_ADDRESS "scheduler()"
```

:::tip
Basic Orders provide a foundation for understanding the deployment process. When you move to Advanced Orders, you'll use the same deployment pattern with additional parameters for predictions and complex conditions.
:::

## Next steps

Once you have successfully completed Basic order with `automation`, you can proceed to a more advanced order - i.e. `prediction`.
