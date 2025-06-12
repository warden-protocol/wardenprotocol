---
sidebar_position: 2.1
---

# Build the infrastructure for Orders

## Overview

To implement [automated Orders](implement-automated-orders) or [Orders with price prediction](implement-orders-with-price-prediction), you should first build the infrastructure shared by both Order types.

This guide explains how to add such components as data structures, utils, deployment scripts, and so on. You'll also implement a transaction signing service using the [`x/warden` module](/learn/warden-protocol-modules/x-warden).

## Prerequisites

Before you start, [meet the prerequisites](prerequisites).

## 1. Create data structures

First, you need to create contracts defining data structures and interfaces for Orders. Store these files in the `src/types` directory.

1. Create a library `Types` with the core data structures.

   :::note Code
   [`src/types/Types.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/types/Types.sol)
   :::

   Include data structures for [signature requests](/learn/glossary#signature-request), different Order types, and oracle/prediction price pairs. In the enum `PriceCondition`, implement the following price conditions:

   ```
    enum PriceCondition {
        LTE,    // Less than or equal to the threshold
        GTE,    // Greater than or equal to the threshold
        LT,     // Less than the threshold
        GT      // Greater than the threshold
   }
   ```

2. Create a library `TypesV0` with the common execution data.

   :::note Code
   [`src/types/TypesV0.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/types/TypesV0.sol)
   :::

3. Add the `IExecutionV0` file with the execution data structure and an interface for executing Orders.

   :::note Code
   [`src/types/IExecutionV0.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/types/IExecutionV0.sol)
   :::

   Include an `execute()` function for executing Orders, `isExecuted()` for checking the execution status, and others.

## 2. Create helpers and utils

In the `src/lib` directory, create helper and utility libraries for Orders:

1. To support EIP-1559 transactions, create a `Strings.sol` library implementing string operations.
   
   :::note Code
   [`src/lib/Strings.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/lib/Strings.sol)
   :::

2. Create an `RLPEncode.sol` library implementing RLP encoding for EIP-1559 transactions.
   
   :::note Code
   [`src/lib/RLPEncode.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/lib/RLPEncode.sol)
   :::

3. Create a helper contract `Create2.sol`.

   :::note Code
   [`src/lib/Create2.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/lib/Create2.sol)
   :::

   The [main deployment script](#7-create-deployment-scripts) will use this contract for deploying the Order infrastructure with the `CREATE2` opcode.

## 3. Implement the registry

In the `src` directory, add a file `Registry.sol` implementing a registry for tracking transactions.

:::note Code
[`src/Registry.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/Registry.sol)
:::

Include the `register()` and `addTransaction()` functions for registering Orders and storing transaction data.

## 4. Create mock precompiles

Mock precompiles are essential for end-to-end testing of the onchain Agent. In the `mocks` directory, build three contracts mocking Warden precompiles:

- Create a Slinky precompile mocking [`x/oracle`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/precompiles/slinky/ISlinky.sol). Its goal is providing [oracle price feeds](/learn/glossary#oracle-service).

  :::note Code
  [`mocks/MockSlinkyPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/mocks/MockSlinkyPrecompile.sol)
  :::

- Create a Warden precompile mocking [`x/warden`](/build-an-app/precompiles/x-warden). Its goal is managing [keys](/learn/glossary#key) and [signature requests](/learn/glossary#signature-request).

  :::note Code
  [`mocks/MockWardenPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/mocks/MockWardenPrecompile.sol)
  :::

- Create an Async precompile mocking [`x/async`](/build-an-app/precompiles/x-async). Its goal is executing [Tasks](/learn/warden-protocol-modules/x-async#task) using [AVR Plugins](/learn/warden-protocol-modules/x-async#avr-plugin). Note that this precompile is required only for [automated Orders with price prediction](implement-orders-with-price-prediction).

  :::note Code
  [`mocks/MockAsyncPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/mocks/MockAsyncPrecompile.sol)
  :::

You can test mock precompiles in the [`test` directory](https://github.com/warden-protocol/wardenprotocol/tree/v0.6.3/solidity/orders/test):

1. Create a helper contract for testing the precompiles:
   
   ```solidity
   contract PrecompileTestHelper {
       MockSlinkyPrecompile internal slinky;
       MockWardenPrecompile internal warden;
       
       function setUp() public {
           // Deploy and configure mocks
           slinky = new MockSlinkyPrecompile();
           warden = new MockWardenPrecompile();
           
           // Inject mock addresses
           vm.etch(ISLINKY_PRECOMPILE_ADDRESS, address(slinky).code);
           vm.etch(IWARDEN_PRECOMPILE_ADDRESS, address(warden).code);
       }
   
       // A price scenario helper
       function setupPriceScenario(
           string memory base,
           string memory quote,
           uint256 initialPrice,
           uint256 targetPrice
       ) internal {
           MockSlinkyPrecompile(ISLINKY_PRECOMPILE_ADDRESS)
               .setPrice(base, quote, initialPrice);
               
           // Simulate a price change
           skip(1 hours);
           MockSlinkyPrecompile(ISLINKY_PRECOMPILE_ADDRESS)
               .setPrice(base, quote, targetPrice);
       }
   }
   ```

2. Create a scenario for testing the price feed:

   ```solidity
   contract SlinkyTest is PrecompileTestHelper {
       function testPriceMovement() public {
           // Set up a price scenario
           setupPriceScenario("ETH", "USD", 3000e9, 3500e9);
           
           // Test the Order execution
           Types.OrderData memory orderData = createTestOrder(
               3200e9,  // The threshold
               Types.PriceCondition.GTE
           );
           
           BasicOrder order = new BasicOrder(
               orderData,
               new CommonTypes.Coin[](0),
               address(this),
               address(registry)
           );
           
           assertTrue(order.canExecute());
       }
   
       function testPriceFeedErrors() public {
           vm.expectRevert("Price not set");
           slinky.getPrice("UNKNOWN", "PAIR");
       }
   }
   ```

3. Test transaction signing:

   ```solidity
   contract WardenTest is PrecompileTestHelper {
       function testSigningFlow() public {
           // Set up keys
           warden.addKey(1, true);  // A valid key
           warden.addKey(2, false); // An invalid key
           
           // Test successful signing
           Types.SignRequestData memory goodRequest = createSignRequest(1);
           assertTrue(executeOrder(goodRequest));
           
           // Test failed signing
           Types.SignRequestData memory badRequest = createSignRequest(2);
           assertFalse(executeOrder(badRequest));
       }
   
       function testInvalidInputs() public {
           vm.expectRevert("Empty approve expression");
           Types.SignRequestData memory invalidRequest = createSignRequest(1);
           invalidRequest.expectedApproveExpression = "";
           executeOrder(invalidRequest);
       }
   }
   ```

4. Use precompiles in scripts:
   
   ```solidity
   contract CreateOrder is Script {
       function run(
           uint256 thresholdPrice,
           Types.PriceCondition priceCondition,
           Types.PricePair memory pricePair
       ) public {
           // Set up mock precompiles
           MockSlinkyPrecompile mSlinky = new MockSlinkyPrecompile();
           MockWardenPrecompile mWarden = new MockWardenPrecompile();
           
           // Configure the initial state
           vm.etch(ISLINKY_PRECOMPILE_ADDRESS, address(mSlinky).code);
           mSlinky.setPrice(pricePair.base, pricePair.quote, thresholdPrice);
           
           vm.etch(IWARDEN_PRECOMPILE_ADDRESS, address(mWarden).code);
           mWarden.addKey(1, true);
           
           // Create and verify an Order
           vm.broadcast();
           BasicOrder order = createOrder(/* params */);
           require(order.canExecute(), "Order cannot execute");
       }
   }
   ```

## 5. Implement transaction signing

In the `src/orders` directory, create an abstract contract `AbstractOrderV0.sol` for signing transactions. It'll be called by all types of Orders.

:::note Code
[`src/orders/AbstractOrderV0.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/orders/AbstractOrderV0.sol)
:::

Your code should include a function `createSignRequest()` that creates [signature requests](/learn/glossary#signature-request) for [Keychains](/learn/glossary#keychain). Use the [`newSignRequest()` function](/build-an-app/precompiles/x-warden#create-a-new-signature-request) of the [Warden precompile](#4-create-mock-precompiles).

## 6. Implement Order creation

In the `src/factories` directory, create an `OrderFactory` contract for managing the creation and tracking of Orders.

:::note Code
[`src/factories/OrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/factories/OrderFactory.sol)
:::

Include the `createOrder()` and `computeOrderAddress()` functions for triggering Order deployment and computing the deterministic address of an Order.

Depending on the Order type selected by a user, `OrderFactory` should invoke either [`BasicOrderFactory`](implement-automated-orders#2-implement-order-creation) or [`AdvancedOrderFactory`](implement-orders-with-price-prediction#2-implement-order-creation) and then emit an `OrderCreated` event. See the `_createBasicOrder()` and `_createAdvancedOrder()` functions.

## 7. Create deployment scripts

Finally, implement deployment scripts in the `script` directory:

1. Implement the main script for deploying the Order infrastructure.

   :::note Code
   [`script/Deploy.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/script/Deploy.s.sol)
   :::

   It should handle the following tasks:
   
   - Deploy [`OrderFactory`](#6-implement-order-creation)
   - Deploy [`Registry`](#3-implement-the-registry)
   - Configure the environment
   
2. Implement a script for creating Orders.

   :::note Code
   [`script/CreateOrder.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/script/CreateOrder.s.sol)
   :::

   It should handle the following tasks:

   - Trigger [`OrderFactory`](#6-implement-order-creation) to invoke [`BasicOrderFactory`](implement-automated-orders#2-implement-order-creation) / [`AdvancedOrderFactory`](implement-orders-with-price-prediction#2-implement-order-creation)
   - Set up [mock precompiles](#4-create-mock-precompiles)
   - Configure parameters

## Next steps

Now you can [implement automated Orders](implement-automated-orders).
