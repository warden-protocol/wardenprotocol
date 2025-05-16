---
sidebar_position: 2.3
---

# Implement automated Orders with price prediction

## Overview

This guide explains how to implement advanced **automated Orders with price prediction**—smart contracts that fetch **AI-driven predictions**, compare them to oracle prices, and perform token swaps based on user-defined comparison conditions.

Automated Orders with price prediction use the following Warden modules:

- [`x/async`](/learn/warden-protocol-modules/x-async) to fetch price predictions using an [AVR Plugin](/learn/warden-protocol-modules/x-async#avr-plugin)
- [`x/oracle`](learn/warden-protocol-modules/external-modules#xoracle) to fetch oracle prices
- [`x/warden`](/learn/warden-protocol-modules/x-warden) to sign transactions with [Keychains](/learn/warden-protocol-modules/x-warden#keychain)

You'll take the following steps:

1. Implement the core logic of Orders in the `AdvancedOrder` contract: set up prediction integration, handle multiple price sources, and implement an execution time window
2. Implement the creation of Orders in `AdvancedOrderFactory`: create the validation logic and enable prediction setup during deployment
3. Deploy an Order: specify the Order input, including tokens to monitor and the price condition, and monitor the prediction result

:::tip
The price prediction model is just an example of what you can build with [`x/async`](/learn/warden-protocol-modules/x-async) and [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin). With this module, you can implement any logic combining offchain computation with onchain verification—limited only by your imagination.
:::

:::note
This Order type extends the [basic automated Orders](implement-automated-orders): it supports two price sources (predicted and oracle), strict inequality comparisons (`<`, `>`), and a 24-hour execution time window.
:::

## 1. Implement Orders

In our example, the core logic of Orders resides in the `AdvancedOrder` contract.

:::note Code
[`src/orders/AdvancedOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/orders/AdvancedOrder.sol)
:::

This contract uses the [Async, Slinky, and Warden precompiles](build-the-infrastructure#2-create-mock-precompiles) to fetch predicted and oracle prices, compare them, and execute trades. Once the comparison condition is met, the Order will construct a swap transaction, send it for signing, and record the transaction the [registry](build-the-infrastructure#1-create-helpers-and-utils).

To create this logic, add `AdvancedOrder` to the `src/orders` directory and take these steps:

1. Declare the following state variables:

   - The Order and execution data structures from [`Types` and `TypesV0`](build-the-infrastructure#1-create-helpers-and-utils)
   - References to the Async and Slinky precompiles and the registry
   - State tracking (`_executed`, `_unsignedTx`, etc.)

2. Create a `constructor` handling the following tasks:

   - Validate all inputs
   - Set up a connection with [`AbstractOrder`](build-the-infrastructure#1-create-helpers-and-utils) (the transaction signing service)
   - Initialize a prediction request through Async: call [`AddTask()`](/build-an-app/precompiles/x-async#create-a-new-task) with the `pricepred` Plugin 
   - Store the Order and execution data
   - Set an execution time window: Orders should be valid only for 24 hours

3. In the `canExecute()` function, implement the logic for monitoring prices:

   - Check the execution window to avoid using stale predictions
   - Get the prediction result through Async: call [`taskById()`](/build-an-app/precompiles/x-async#query-a-task-by-id)
   - Decode the predicted prices
   - Get the oracle price using the Slinky precompile
   - Normalize decimals in the predicted and oracle prices to prevent multiplication overflow
   - Check the price condition

4. In the `execute()` function, implement the logic for executing trades. This function should do the following:

   - Verify the caller and conditions
   - Pack the swap data for Uniswap
   - Create and encode a transaction
   - Request a signature through the Warden precompile 
   - Emit the `Executed()` event
   - Register the transaction in the registry
   - Return the execution status

5. Implement price normalization in `_normalizePrices()`.

6. Create a `_checkPriceCondition` function checking if the price meets a given condition: `>=`/`<=`/`>`/`<` than the threshold. See the `PriceCondtion` enum in [`Types.sol`](build-the-infrastructure-for-orders#1-create-helpers-and-utils).

7. To test the contract, use the following code:
   
   ```solidity
   contract AdvancedOrderTest is Test {
       function test_PredictionIntegration() public {
           // Mock prediction response
           bytes memory predictionOutput = abi.encode([uint256(1000), uint256(1)]);
           vm.mockCall(
               IASYNC_PRECOMPILE_ADDRESS,
               abi.encodeWithSelector(
                   IAsync.taskById.selector,
                   1  // taskId
               ),
               abi.encode(
                   TaskByIdResponse({
                       taskResponse: TaskResponse({
                           result: TaskResult({
                               id: 1,
                               output: predictionOutput,
                               submitter: ""
                           })
                       })
                   })
               )
           );
   
           assertTrue(order.canExecute());
       }
   
       function test_TimeWindow() public {
           // Fast forward past validity
           vm.warp(block.timestamp + 25 hours);
           assertFalse(order.canExecute());
       }
   
       function test_PriceNormalization() public {
           uint256 price1 = 1000; // 3 decimals
           uint256 price2 = 1;    // 6 decimals
           
           (uint256 norm1, uint256 norm2) = order.exposed_normalizePrices(
               price1, price2, 3, 6
           );
           
           assertEq(norm1, 1000000);
           assertEq(norm2, 1);
       }
   }
   ```

:::note Security measures
- **Access control**: If the caller is unauthorized, the execution will be reverted.
  ```solidity
  if (msg.sender != scheduler) revert Unauthorized();
  ```
- **State management**: If the Order has already been executed, the execution will be reverted.
  ```solidity
  if (_executed) revert ExecutedError();
  ```
- **Execution window**: Orders will automatically expire in 24 hours to avoid using stale predictions.
  ```
  _validUntil = block.timestamp + 24 hours;
  ```
- **Price normalization**: The contract will normalize decimals, preventing multiplication overflow.
  ```
  function _normalizePrices(...)
  ```
- **Prediction validation**: The contract will check the prediction validity and data format.
:::

## 2. Implement Order creation

In our example, the creation of Orders is implemented in the `AdvancedOrderFactory` contract.

:::note Code
[`src/factories/AdvancedOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/factories/AdvancedOrderFactory.sol)
:::

`AdvancedOrderFactory`, when triggered by [`OrderFactory`](build-the-infrastructure#4-implement-order-creation), deploys Orders (instances of [`AdvancedOrder`](#1-implement-orders)) and registers them in the [registry](build-the-infrastructure#1-create-helpers-and-utils). Orders are deployed with the `CREATE3` opcode to provide front-running protection, salt-based deployment security, and deterministic address computation. The latter is crucial for Orders with price prediction since they may need to reference each other.

To create this logic, add `AdvancedOrderFactory` to the `src/factories` directory and take these steps:

1. Include a `createBasicOrder()` function implementing the deployment of Orders. It should do the following:

   - Create the deployment bytecode
   - Deploy an Order with a precomputed address using the `CREATE3` opcode
   - Verify the contract address
   - Register and track the Order
   - Emit the `AdvancedOrderCreated()` event

2. Include a `computeOrderAddress()` function for previewing the deterministic address of an Order without deploying it.

4. To test the contract, you can use the following code:

   ```solidity
   contract AdvancedOrderFactoryTest is Test {
       function test_CreateAdvancedOrder() public {
           Types.AdvancedOrderData memory orderData = Types.AdvancedOrderData({
               oraclePricePair: Types.PricePair({
                   base: "ETH",
                   quote: "USD"
               }),
               predictPricePair: Types.PricePair({
                   base: "ethereum",
                   quote: "tether"
               }),
               priceCondition: Types.PriceCondition.GT
           });
   
           bytes32 salt = bytes32("test");
           address expected = factory.computeOrderAddress(
               address(this),
               salt
           );
   
           vm.expectEmit(true, true, false, false);
           emit AdvancedOrderCreated(address(this), expected);
   
           address actual = factory.createAdvancedOrder(
               orderData,
               executionData,
               maxKeychainFees,
               scheduler,
               salt
           );
   
           assertEq(actual, expected);
           assertTrue(registry.isRegistered(actual));
           
           // Verify prediction setup
           AdvancedOrder order = AdvancedOrder(actual);
           assertTrue(order.taskId() > 0);
       }
   
       function test_InvalidPricePairs() public {
           Types.AdvancedOrderData memory orderData = Types.AdvancedOrderData({
               oraclePricePair: Types.PricePair({
                   base: "",
                   quote: "USD"
               }),
               predictPricePair: Types.PricePair({
                   base: "ethereum",
                   quote: "tether"
               }),
               priceCondition: Types.PriceCondition.GT
           });
   
           vm.expectRevert(InvalidOraclePair.selector);
           factory.createAdvancedOrder(
               orderData,
               executionData,
               maxKeychainFees,
               scheduler,
               bytes32("test")
           );
       }
   
       function test_SaltReuse() public {
           bytes32 salt = bytes32("test");
           
           factory.createAdvancedOrder(...);
           
           vm.expectRevert(SaltAlreadyUsed.selector);
           factory.createAdvancedOrder(...);
       }
   }
   ```

:::note Security measures
- **Salt management**: Salts are guarded by `tx.origin` to prevent front-running. Each salt can only be used once per creator.
  ```
  address origin = tx.origin;
  bytes32 guardedSalt = keccak256(
      abi.encodePacked(uint256(uint160(origin)), salt)

  if (usedSalts[guardedSalt]) {
        revert SaltAlreadyUsed();
  }
  ```
:::

## 3. Deploy an Order

:::tip
You can learn in detail about Order parameters in [Demo: Create an Order](demo-create-an-order).
:::

To deploy an Order, take these steps:

1. Create an `.env` file with your environment configuration:

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

2. To deploy your Order, run the following script:
   
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

#### Monitor the Order state

- Check the Task (prediction) status: 
  ```bash
  TASK_ID=$(cast call $ORDER_ADDRESS "taskId()")
  cast call $ASYNC_PRECOMPILE "taskById(uint64)" $TASK_ID
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
  cast logs $ASYNC_PRECOMPILE "TaskUpdated(uint64)"
  ```

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
  TASK_ID=$(cast call $ORDER_ADDRESS "taskId()")
  ```
- Check the Task status: 
  ```bash
  cast call $ASYNC_PRECOMPILE "taskById(uint64)" "$TASK_ID"
  ```

#### The security checklist

- Verify the price pairs:  
  ```bash
  cast call $ORDER_ADDRESS "orderData()"
  ```
- Check the Task ID and status:  
  ```bash
  cast call $ORDER_ADDRESS "taskId()"
  ```
- Check the time window:
  ```bash
  cast call $ORDER_ADDRESS "validUntil()"
  ```    

## Troubleshooting

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
  TASK_ID=$(cast call $ORDER_ADDRESS "taskId()")
  cast call $ASYNC_PRECOMPILE "taskById(uint64)" "$TASK_ID"
  cast call $ASYNC_PRECOMPILE "taskById(uint64)" "$TASK_ID" | \
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
