---
sidebar_position: 5
---

# Deploy an Order

## Overview

This article will guide you through deploying and monitoring automated Orders with price prediction.

You'll deploy the following:

- The core infrastructure including the [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) and [`Registry`](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) contracts
- The [`AdvancedOrder` contract](implement-orders)

## 1. Set up the deployment

To set up your deployment, create an `.env` file with your environment configuration:

```bash
# Network and account settings
RPC_URL="http://127.0.0.1:8545"
CHAIN_ID="12345"
SCHEDULER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"

# Order parameters
ORACLE_PRICE_PAIR='("ETH","USD")'
PREDICT_PRICE_PAIR='("ethereum","tether")'
PRICE_CONDITION="0"  # 0:LTE, 1:GTE, 2:LT, 3:GT

# Transaction data
TX_FIELDS="\
(100000000000000,\
11155111,\
0x467b9D1B03683C8177155Be990238bEeB1d5461f,\
0x7ff36ab500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000ee567fe1712faf6149d80da1e6934e354124cfe300000000000000000000000000000000000000000000000000000000676d2f8a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fff9976782d46cc05630d1f6ebab18b2324d6b14000000000000000000000000e5a71132ae99691ef35f68459adde842118a86a5\)"

# Identification
KEY_ID="7"
SPACE_NONCE="0"
ACTION_TIMEOUT_HEIGHT="1000000000"

# Authorization
EXPECTED_APPROVE_EXPRESSION="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
EXPECTED_REJECT_EXPRESSION="0x616e7928312c2077617264656e2e73706163652e6f776e65727329"
SALT="0x05416460deb76d57af601be17e777b93592d8d4d4a4096c57876a91c84f4a715"
```

## 2. Deploy an Order

To deploy your Order, run the following:

```bash
#!/bin/bash
# createAdvancedOrder.sh

just create-advanced-order \
    "$PRICE_CONDITION" \
    "$ORACLE_PRICE_PAIR" \
    "$PREDICT_PRICE_PAIR" \
    "$TX_FIELDS" \
    "$KEY_ID" \
    "$SPACE_NONCE" \
    "$ACTION_TIMEOUT_HEIGHT" \
    "$EXPECTED_APPROVE_EXPRESSION" \
    "$EXPECTED_REJECT_EXPRESSION" \
    "$SALT" \
    "$FACTORY_ADDRESS" \
    "$RPC_URL" \
    "$CHAIN_ID"
```

## Utility commands

To monitor your Order and get additional Order data, use the commands listed below.

### Monitor the Order

#### Monitor the Order state

- Check the Task (prediction) status: 
  ```bash
  TASK_ID=$(cast call $ORDER_ADDRESS "futureId()")
  cast call $ASYNC_PRECOMPILE "futureById(uint64)" $TASK_ID
  ```
- Check price conditions: 
   ```
   cast call $ORDER_ADDRESS "canExecute()"
   ```
- View the validity window
  ```
  cast call $ORDER_ADDRESS "validUntil()"
  ```

#### Monitor events
- Monitor the execution:  
  ```
  cast logs $ORDER_ADDRESS "Executed()"
  ```
- Monitor new transactions:
  ```bash
  cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
  ```
- Monitor the Task updates:  
  ```bash
  cast logs $ASYNC_PRECOMPILE "FutureUpdated(uint64)"
  ```

### Get the Order data

#### Get the prediction setup

- Get the prediction configuration:
  ```bash
  ORDER_ADDRESS="0x..."
  cast call $ORDER_ADDRESS "orderData()"
  ```
- Verify the price pairs: 
  ```bash
  cast call $ORDER_ADDRESS "orderData()" | \
  grep -A 2 "predictPricePair"
  ```

#### Get oracle prices

- Get the current oracle price:
  ```bash
  BASE="ETH"
  QUOTE="USD"
  cast call $SLINKY_PRECOMPILE "getPrice(string,string)" \
  "$BASE" "$QUOTE"
  ```
#### Get the prediction results

- Get the Task ID: 
  ```bash
  TASK_ID=$(cast call $ORDER_ADDRESS "futureId()")
  ```
- Check the Task status: 
  ```bash
  cast call $ASYNC_PRECOMPILE "futureById(uint64)" "$TASK_ID"
  ```

### The security checklist

- Verify the price pairs:  
  ```bash
  cast call $ORDER_ADDRESS "orderData()"
  ```
- Check the Task ID and status:  
  ```bash
  cast call $ORDER_ADDRESS "futureId()"
  ```
- Check the time window:
  ```bash
  cast call $ORDER_ADDRESS "validUntil()"
  ```    

### Troubleshooting

Here are some of the common deployment issues and solutions for them:

- **The price pair is invalid**  
  Solution: Verify the oracle pair format and check the supported pairs.
  ```bash
  cast call $ORDER_ADDRESS "orderData()" | \
    grep -A 2 "oraclePricePair"
  cast call $SLINKY_PRECOMPILE "getPrice(string,string)" \
    "ETH" "USD"
  ```
- **The prediction fails**  
  Solution: Check the Task status and verify its format.
  ```bash
  TASK_ID=$(cast call $ORDER_ADDRESS "futureId()")
  cast call $ASYNC_PRECOMPILE "futureById(uint64)" "$TASK_ID"
  cast call $ASYNC_PRECOMPILE "futureById(uint64)" "$TASK_ID" | \
      grep "output"
  ```
- **The Order execution fails**  
  Solution: Check the validity window and verify the execution conditions.
  ```bash
  VALID_UNTIL=$(cast call $ORDER_ADDRESS "validUntil()")
  echo "Current: $(date +%s)"
  echo "Valid until: $VALID_UNTIL"
  cast call $ORDER_ADDRESS "canExecute()"
  ```

## Next steps

Congratulations! You have successfully implemented both automated Orders and automated Orders with price prediction! You can quickly glance through the [summary](../summary) to get a quick overview of the project.

For any questions, reach us on [Discord](https://discord.com/invite/wardenprotocol).
