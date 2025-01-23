---
sidebar_position: 5
---

# Deploy an Order

## Environment Setup

```bash
# Network and Account (same as basic orders)
RPC_URL="https://evm.devnet.wardenprotocol.org"
CHAIN_ID="12345"
SCHEDULER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"

# Advanced Order Parameters
ORACLE_PRICE_PAIR='("ETH","USD")'
PREDICT_PRICE_PAIR='("ethereum","tether")'
PRICE_CONDITION="0"  # 0:LTE, 1:GTE, 2:LT, 3:GT

# Transaction Configuration
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

## Deploy Order

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

## Monitor Order Status

```bash
# Check prediction status
cast call $ORDER_ADDRESS "futureId()" 
cast call $ASYNC_PRECOMPILE "futureById(uint64)" $FUTURE_ID

# Check price conditions
cast call $ORDER_ADDRESS "canExecute()"

# View validity window
cast call $ORDER_ADDRESS "validUntil()"
```

## Monitor Events

```bash
# Watch for prediction updates
cast logs $ASYNC_PRECOMPILE "FutureUpdated(uint64)"

# Watch for executions
cast logs $ORDER_ADDRESS "Executed()"

# Watch for new transactions
cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
```

## Common Operations

### 1. Check Prediction Setup

```bash
# Get prediction configuration
ORDER_ADDRESS="0x..."
cast call $ORDER_ADDRESS "orderData()"

# Verify price pairs
cast call $ORDER_ADDRESS "orderData()" | \
    grep -A 2 "predictPricePair"
```

### 2. Monitor Oracle Prices

```bash
# Get current price
BASE="ETH"
QUOTE="USD"
cast call $SLINKY_PRECOMPILE "getPrice(string,string)" \
    "$BASE" "$QUOTE"
```

### 3. Track Prediction Results

```bash
# Get future ID
FUTURE_ID=$(cast call $ORDER_ADDRESS "futureId()")

# Check prediction status
cast call $ASYNC_PRECOMPILE "futureById(uint64)" "$FUTURE_ID"
```

## Troubleshooting

### 1. Invalid Price Pairs

```bash
# Verify oracle pair format
cast call $ORDER_ADDRESS "orderData()" | \
    grep -A 2 "oraclePricePair"

# Check supported pairs
cast call $SLINKY_PRECOMPILE "getPrice(string,string)" \
    "ETH" "USD"
```

### 2. Failed Predictions

```bash
# Check future status
FUTURE_ID=$(cast call $ORDER_ADDRESS "futureId()")
cast call $ASYNC_PRECOMPILE "futureById(uint64)" "$FUTURE_ID"

# Verify prediction format
cast call $ASYNC_PRECOMPILE "futureById(uint64)" "$FUTURE_ID" | \
    grep "output"
```

### 3. Execution Issues

```bash
# Check validity window
VALID_UNTIL=$(cast call $ORDER_ADDRESS "validUntil()")
echo "Current: $(date +%s)"
echo "Valid until: $VALID_UNTIL"

# Verify execution conditions
cast call $ORDER_ADDRESS "canExecute()"
```

## Security Checklist

1. **Price Pair Configuration**

   ```bash
   # Verify both pairs
   cast call $ORDER_ADDRESS "orderData()"
   ```

2. **Prediction Setup**

   ```bash
   # Check future ID and status
   cast call $ORDER_ADDRESS "futureId()"
   ```

3. **Time Window**

   ```bash
   # Verify not expired
   cast call $ORDER_ADDRESS "validUntil()"
   ```

## Next Steps

Congratulations! You have succesfully implemented both Order with Automation and Order with Prediction!
You can quickly glance through [summary page](/summary.md) to get a quick overview of the project.

For any questions, reach us on discord.
