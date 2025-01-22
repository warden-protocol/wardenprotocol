---
sidebar_position: 5
---

# Deploy an Order

## Overview

This article will guide you through deploying the Basic Warden Agent and managing [Orders](implement-orders).

## 1. Deploy the Agent

To deploy the Agent, take the following steps:

1. Set up the environment file (`.env`):

   ```bash
   MNEMONIC="your mnemonic phrase here"
   RPC_URL="http://127.0.0.1:8545"
   CHAIN_ID="12345"
   SCHEDULER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
   FACTORY_OWNER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
   ```
   
2. Compile the contracts:

   ```bash
   forge build
   ```

3. Load the environment and run the [main deployment script](../build-the-infrastructure-for-orders/create-deployment-scripts#1-implement-the-main-deployment-script):
   
   ```bash
   source .env
   forge script script/Deploy.s.sol:Deploy \
       --rpc-url $RPC_URL \
       --broadcast \
       --chain-id $CHAIN_ID
   ```

   This will deploy the [`Registry`](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) and [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) contracts.
   
4. Run the [script for creating an Order](../build-the-infrastructure-for-orders/create-deployment-scripts#1-implement-the-main-deployment-script):
   
   ```bash
   forge script script/CreateOrder.s.sol:CreateOrder \
       --rpc-url $RPC_URL \
       --broadcast \
       --sig "run(uint256,uint8,(string,string),(uint256,uint256,address),(uint256,address[],address,uint256),uint64,uint64,   uint64,bytes,bytes)" \
       3324181371 \  # the threshold price
       0 \ # the LTE condition
       '("ETH","USD")' \  # the currency pair
       '(100000000000000,11155111,0x467b...)' \  # tx fields
       # ... other parameters
   ```
   
   The key parameters to specify include the following:
   
   - `thresholdPrice`: The price threshold to trigger the execution of an Order
   - `priceCondition`: The price condition: 0 for LTE (`<=`), 1 for GTE (`>=`)
   - `pricePair`: The currency pair
   - `creatorDefinedTxFields`: The chain and transaction details
   - `swapData`: Swap parameters for Uniswap
   - `keyId`: The ID of the Warden key for signing transactions
   - `spaceNonce`: The nonce for the signing space
   - `actionTimeoutHeight`: The timeout for execution
   - `expectedApproveExpression`: Conditions for approval
   - `expectedRejectExpression`: Conditions for rejection

5. Verify the deployment by getting the Order details:
   
   ```bash
   cast call $ORDER_ADDRESS "orderData()"
   ```

## 2. Monitor and manage Orders

After deploying the Basic Agent, you can monitor and manage Orders using the commands listed below.

### Monitor the Order status

- Check if the Order can be executed:

   ```bash
   cast call $ORDER_ADDRESS "canExecute()" --rpc-url $RPC_URL
   ```

- Check if the Order is executed:

   ```
   cast call $ORDER_ADDRESS "isExecuted()" --rpc-url $RPC_URL
   ```

- Retrieve the execution data:

   ```
   cast call $ORDER_ADDRESS "executionData()" --rpc-url $RPC_URL
   ```

### Get data from the registry

- Retrieve the Order creator from the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry):

   ```bash
   cast call $REGISTRY_ADDRESS "executions(address)" $ORDER_ADDRESS
   ```

- Retrieve the transaction details from the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry):

   ```bash
   cast call $REGISTRY_ADDRESS "transactions(bytes32)" $TX_HASH
   ```

### Monitor events

- Monitor the `Executed()` event emitted by the [`execute()`](implement-orders#4-implement-trade-execution) function of the `BasicOrder` contract:
   
   ```bash
   cast logs $ORDER_ADDRESS "Executed()"
   ```

- Monitor the `NewTx()` event emitted by the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry):
   
   ```bash
   cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
   ```
   
### Get data from precompiles

- Get the current price from the [Slinky precompile](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile):

    ```bash
    cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
    ```

- Check the Warden key status from the [Warden precompile](../build-the-infrastructure-for-orders/create-mock-precompiles#12-create-a-warden-precompile):

    ```
    cast call $WARDEN_PRECOMPILE "keyById(uint64,int32[])" $KEY_ID []
    ```

### Debug tools

- Get the raw transaction data:

   ```bash
   cast call $ORDER_ADDRESS "getTx()"
   ```

- Check the list of callers:

   ```
   cast call $ORDER_ADDRESS "callers()"
   ```
