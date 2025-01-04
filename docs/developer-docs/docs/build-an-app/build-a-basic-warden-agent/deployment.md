---
sidebar_position: 7
---

# Deploy the Basic Agent

## Overview

This article will guide you through deploying the Basic Warden Agent and managing [orders](main_contract).

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

3. Load the environment and run the [main deployment script](deploy_script#1-implement-the-main-deployment-script):
   
   ```bash
   source .env
   forge script script/Deploy.s.sol:Deploy \
       --rpc-url $RPC_URL \
       --broadcast \
       --chain-id $CHAIN_ID
   ```

   This will deploy the [`Registry`](structure#3-implement-the-registry) and [`OrderFactory`](agent_factory) contracts.
   
4. Run the [script for creating an order](deploy_script#1-implement-the-main-deployment-script):
   
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
   
   - `thresholdPrice`: The price threshold to trigger the execution of an order
   - `priceCondition`: The price condition: 0 for LTE (`<=`), 1 for GTE (`>=`)
   - `pricePair`: The currency pair
   - `creatorDefinedTxFields`: The chain and transaction details
   - `swapData`: Swap parameters for Uniswap
   - `keyId`: The ID of the Warden key for signing transactions
   - `spaceNonce`: The nonce for the signing space
   - `actionTimeoutHeight`: The timeout for execution
   - `expectedApproveExpression`: Conditions for approval
   - `expectedRejectExpression`: Conditions for rejection

5. Verify the deployment by getting the order details:
   
   ```bash
   cast call $ORDER_ADDRESS "orderData()"
   ```

## 2. Monitor and manage orders

After deploying the Basic Agent, you can monitor and manage orders using the commands listed below.

### Monitor the order status

- Check if the order can be executed:

   ```bash
   cast call $ORDER_ADDRESS "canExecute()" --rpc-url $RPC_URL
   ```

- Check if the order is executed:

   ```
   cast call $ORDER_ADDRESS "isExecuted()" --rpc-url $RPC_URL
   ```

- Retrieve the execution data:

   ```
   cast call $ORDER_ADDRESS "executionData()" --rpc-url $RPC_URL
   ```

### Get data from the registry

- Retrieve the order creator from the [registry](structure#3-implement-the-registry):

   ```bash
   cast call $REGISTRY_ADDRESS "executions(address)" $ORDER_ADDRESS
   ```

- Retrieve the transaction details from the [registry](structure#3-implement-the-registry):

   ```bash
   cast call $REGISTRY_ADDRESS "transactions(bytes32)" $TX_HASH
   ```

### Monitor events

- Monitor the `Executed()` event emitted by the [`execute()`](main_contract#4-implement-trade-execution) function of the `BasicOrder` contract:
   
   ```bash
   cast logs $ORDER_ADDRESS "Executed()"
   ```

- Monitor the `NewTx()` event emitted by the [registry](structure#3-implement-the-registry):
   
   ```bash
   cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
   ```
   
### Get data from precompiles

- Get the current price from the [Slinky precompile](precompiles#11-create-a-slinky-precompile):

    ```bash
    cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
    ```

- Check the Warden key status from the [Warden precompile](precompiles#12-create-a-warden-precompile):

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
