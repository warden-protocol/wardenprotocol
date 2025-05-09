---
sidebar_position: 2.1
---

# Build the infrastructure for Orders

## Overview

## 1. Create helpers and utils

This article will guide you through building a foundation for the Agent executing automated Orders. You'll create helper libraries and contracts defining the core data structures and interfaces for managing Orders.

:::note Directory
Store helper libraries and contracts in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src).
:::

1. First, create a library `Types.sol` with the core data structures:
   
   :::note Full code
   You can find the full code on GitHub: [`src/Types.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Types.sol)
   :::

2. Now, add an abstract contract with functions required to create Orders of both types. Your code should include a function for creating [signature requests](/learn/glossary#signature-request) by calling the [Warden precompile](create-mock-precompiles#12-create-a-warden-precompile).

   :::note Full code
   You can find the full code on GitHub: [`src/AbstractOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/AbstractOrder.sol)
   :::

3. In a file `Registry.sol`, implement a registry for tracking transactions:
   
   :::note Full code
   You can find the full code on GitHub: [`src/Registry.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Registry.sol)
   :::

4. To support EIP-1559 transactions, create a `Strings.sol` library implementing string operations:
   
   :::note Full code
   You can find the full code on GitHub: [`src/Strings.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Strings.sol)
   :::

5. To support EIP-1559 transactions, create an `RLPEncode.sol` library implementing RLP encoding:
   
   :::note Full code
   You can find the full code on GitHub: [`src/RLPEncode.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/RLPEncode.sol)
   :::

6. Now implement custom deployment. Create a helper contract used in the [main deployment script](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Create2.sol). This contract allows deploying the infrastructure for Orders with the `CREATE2` opcode.

   :::note Full code
   You can find the full code on GitHub: [`src/Create2.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Create2.sol)
   :::

## 2. Create mock precompiles

**Mock precompiles** are essential for end-to-end testing of the Basic Agent.

This article explains how to build and test three mock precompiles:

- **Slinky**, mocking the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/slinky/ISlinky.sol)
- **Warden**, mocking the [`x/warden` precompile](/build-an-app/precompiles/x-warden)
- **Async**, mocking the [`x/async` precompile](/build-an-app/precompiles/x-async)

:::note Directories

- Store mock precompiles in the [`mocks` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks).
- You can test the precompiles in the [`test` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/test).
:::

1. Create a Slinky precompile

   In a file `MockSlinkyPrecompile.sol`, implement a mock of the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/slinky/ISlinky.sol). Its goal is to provide [oracle](/learn/glossary#oracle-service) price feeds, set prices for testing, and ensure error handling for missing prices.

   :::note Full code
   You can find the full code on GitHub: [`mocks/MockSlinkyPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks/MockSlinkyPrecompile.sol)
   :::

2. Create a Warden precompile

   In a file `MockWardenPrecompile.sol`, implement a mock of the [`x/warden` precompile](/build-an-app/precompiles/x-warden). Its goal is to manage [keys](/learn/glossary#key) and [signature requests](/learn/glossary#signature-request) .

   :::note Full code
   You can find the full code on GitHub: [`mocks/MockWardenPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks/MockWardenPrecompile.sol)
   :::

3. Create an Async precompile

   In a file `MockAsyncPrecompile.sol`, implement a mock of the [`x/async` precompile](/build-an-app/precompiles/x-async) for creating and tracking [Tasks](/learn/glossary#task). Note that this precompile is required only for [automated Orders with price prediction](../implement-automated-orders-with-price-prediction/introduction).

   :::note Full code
   You can find the full code on GitHub: [`mocks/MockAsyncPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks/MockAsyncPrecompile.sol)
   :::

## 3. Test precompiles

1. Create a helper contract for testing mock precompiles:
   
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

2. To create a scenario for testing the price feed, use code below:

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

3. To test transaction signing, use the following:

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

3. This is how you can use precompiles in scripts:
   
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

## 4. Implement the execution interface

The `IExecution` contract allows executing an Order, getting a list of authorized callers, and checking the execution status. You can use this execution interface to create custom Orders.

:::note Directory
Store `IExecution` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/IExecution.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/IExecution.sol)
:::

Implement the execution interface in a file `IExecution.sol`.

## 5. Implement the creation of Orders

The `OrderFactory` contract securely manages the creation and tracking of **Orders**—instances of the [`BasicOrder`](../implement-automated-orders/implement-orders) and [`AdvancedOrder`](../implement-automated-orders-with-price-prediction/implement-orders) contracts.

The user specifies the desired order type and triggers `OrderFactory`. Depending on the order type, the following happens:
- `OrderFactory` calls the [`BasicOrderFactory` contract](../implement-automated-orders/implement-the-creation-of-orders), which deploys a new [`BasicOrder` contract](../implement-automated-orders/implement-orders) and registers it in the [registry](create-helpers-and-utils#3-implement-the-registry).
- `OrderFactory` calls the [`AdvancedOrderFactory` contract](../implement-automated-orders-with-price-prediction/implement-the-creation-of-orders), which deploys a new [`AdvancedOrder` contract](../implement-automated-orders-with-price-prediction/implement-orders) and registers it in the [registry](create-helpers-and-utils#3-implement-the-registry).

:::note Directory
Store `OrderFactory` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/OrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/OrderFactory.sol)
:::

Implement the creation and tracking of Orders in a file `OrderFactory.sol`.

## 6. Create deployment scripts

This tutorial explains how to implement the main deployment script and the script for creating Orders.

:::note Directory
Store your scripts in the [`script` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/script).
:::

1. The main deployment script handles the following tasks:
   
   - Deploys [`OrderFactory`](implement-the-creation-of-orders)
   - Deploys [`Registry`](create-helpers-and-utils#3-implement-the-registry)
   - Configures the environment
   
   To implement this script, use the following code:
   
   :::note Full code
   You can find the full code on GitHub: [`script/Deploy.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/Deploy.s.sol)
   :::

2. Implement the script for creating Orders

   This script for creating Orders handles the following tasks:
   
   - Deploys [`BasicOrder`](../implement-automated-orders/implement-orders) through [`OrderFactory`](implement-the-creation-of-orders)
   - Sets up [mock precompiles](create-mock-precompiles)
   - Configures parameters
   
   To implement this script, use the following code:
   
   :::note Full code
   You can find the full code on GitHub: [`script/CreateOrder.s.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/CreateOrder.s.sol)
   :::

## Next steps
