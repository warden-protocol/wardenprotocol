---
sidebar_position: 5
---

# Deploy an Order

## Overview

This article will guide you through deploying and monitoring automated Orders.

You'll deploy the following:

- The core infrastructure including the [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) and [`Registry`](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) contracts
- The [`BasicOrder` contract](implement-orders)

When you implement more advanced Orders with price prediction, you'll [deploy them](../implement-automated-orders-with-price-prediction/deploy-an-order) in a similar way, adding extra parameters for the advanced features.

## 1. Set up the deployment

To set up your deployment, take the following steps:

1. Create an `.env` file with your environment configuration:

```bash
# Network settings
RPC_URL="http://127.0.0.1:8545"
CHAIN_ID="12345"

# Account settings
MNEMONIC="your mnemonic phrase here"
SCHEDULER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
FACTORY_OWNER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
```

2. Install dependencies and compile all contracts:

```bash
yarn install
forge build   
```

## 2. Deploy an Order

1. Load the environment:

   ```
   source .env
   ```

2. Deploy the infrastructure by using the [main deployment script](../build-the-infrastructure-for-orders/create-deployment-scripts#1-implement-the-main-deployment-script):
   
   ```bash
   forge script script/Deploy.s.sol:Deploy \
       --rpc-url $RPC_URL \
       --broadcast \
       --chain-id $CHAIN_ID
   ```
  
   This will deploy the [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) and [`Registry`](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) contracts.

3. Set the Order parameters:
   
   ```bash
   THRESHOLD_PRICE="3324181371"  # Target price in oracle decimals
   PRICE_CONDITION="0"           # 0 for LTE, 1 for GTE
   PRICE_PAIR='("ETH","USD")'    # Oracle price pair
   ```

4. Set the transaction parameters:

   ```
   TX_FIELDS="\
   (100000000000000,\    # The value (in wei)
   11155111,\            # The chain ID
   0x467b...1f,\         # The target contract
   0x7ff3...)`           # Encoded swap data
   ```

5. Deploy an Order by using the [script for creating Orders](../build-the-infrastructure-for-orders/create-deployment-scripts#2-implement-the-script-for-creating-orders):
   
   ```
   forge script script/CreateOrder.s.sol:CreateOrder \
       --rpc-url $RPC_URL \
       --broadcast \
       --sig "basic(uint256,uint8,(string,string),(uint256,uint256,address,bytes))" \
       $THRESHOLD_PRICE \
       $PRICE_CONDITION \
       $PRICE_PAIR \
       $TX_FIELDS
   ```

## Utility commands

To monitor your Order and get additional Order data, use the commands listed below.

### Monitor the Order

#### Monitor the Order state

- Check if the Order is executable:  
  ```bash
  cast call $ORDER_ADDRESS "canExecute()"
  ```
- Check if the Order is executed:  
  ```bash
  cast call $ORDER_ADDRESS "isExecuted()"
  ```
- Get the execution data:
  ```bash
  cast call $ORDER_ADDRESS "executionData()"
  ```

#### Monitor events

- Monitor the execution:  
  ```bash
  cast logs $ORDER_ADDRESS "Executed()"
  ```
- Monitor new transactions:  
  ```bash
  cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
  ```

#### Monitor prices

- Get prices from the [oracle](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile):
  ```bash
  cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
  ```

### Debug the Order

#### Check the transaction

- Get the unsigned transaction:  
  ```bash
  cast call $ORDER_ADDRESS "getTx()"
  ```
#### Get data from the registry 

- Get the order creator from the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry):
  ```bash
  cast call $REGISTRY_ADDRESS "executions(address)" $ORDER_ADDRESS
  ```
- Get the transaction details from the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry):
  ```bash
  cast call $REGISTRY_ADDRESS "transactions(bytes32)" $TX_HASH
  ```

### Troubleshooting

Here are some of the common deployment issues and solutions for them:

- **The Order creation fails**  
  Solution: Check the salt usage and verify the registry status.
  ```bash
  cast call $FACTORY_ADDRESS "usedSalts(bytes32)" $SALT
  cast call $REGISTRY_ADDRESS "isRegistered(address)" $ORDER_ADDRESS
  ```
- **The Order execution fails**  
  Solution: Check the price feeds and verify the scheduler permissions.
  ```bash
  cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
  cast call $ORDER_ADDRESS "scheduler()"
  ```

## Extension points

When you implement more advanced Orders with price prediction, you'll [deploy them](../implement-automated-orders-with-price-prediction/deploy-an-order) in a similar way, adding extra parameters for the advanced features:

- **Prediction integration**  
  ```bash
  ORACLE_PAIR='("ETH","USD")'
  PREDICT_PAIR='("ethereum","tether")'
  ```
- **Complex price conditions**
  ```bash
  PRICE_CONDITION="2"  # 2 for LT, 3 for GT
  ```
- **Time windows**
  ```bash
  cast call $ORDER_ADDRESS "validUntil()"
  ```

## Next steps

After deploying an automated Order, you can start implementing [automated Orders with price prediction](../implement-automated-orders-with-price-prediction/introduction).