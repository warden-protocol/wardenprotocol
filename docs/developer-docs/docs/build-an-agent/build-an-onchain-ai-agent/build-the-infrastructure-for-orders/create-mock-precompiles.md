---
sidebar_position: 2
---

# Create mock precompiles

## Overview

**Mock precompiles** are essential for end-to-end testing of the Basic Agent.

This article explains how to build and test three mock precompiles:

- **Slinky**, mocking the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/slinky/ISlinky.sol)
- **Warden**, mocking the [`x/warden` precompile](/build-an-app/precompiles/x-warden)
- **Async**, mocking the [`x/async` precompile](/build-an-app/precompiles/x-async)

:::note Directories

- Store mock precompiles in the [`mocks` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks).
- You can test the precompiles in the [`test` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/test).
:::

## 1. Create mock precompiles

### 1.1. Create a Slinky precompile

In a file `MockSlinkyPrecompile.sol`, implement a mock of the [`x/oracle` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/slinky/ISlinky.sol). Its goal is to provide [oracle](/learn/glossary#oracle-service) price feeds, set prices for testing, and ensure error handling for missing prices.

:::note Full code
You can find the full code on GitHub: [`mocks/MockSlinkyPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks/MockSlinkyPrecompile.sol)
:::

```solidity title="mocks/MockSlinkyPrecompile.sol"
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { GetPriceResponse, QuotePrice, ISlinky } from "ext-slinky/ISlinky.sol";

contract MockSlinkyPrecompile is ISlinky {
    mapping(string base => mapping(string quote => uint256 price)) private prices;

    function getPrice(
        string calldata base,
        string calldata quote
    ) external view returns (GetPriceResponse memory response) {
        uint256 price = prices[base][quote];
        require(price != 0, "Price not set");

        // Price data with additional metadata
        QuotePrice memory quotePrice = QuotePrice({
            blockHeight: block.number,    // The current block for testing
            blockTimestamp: block.timestamp,
            price: price
        });

        return GetPriceResponse({
            id: 0,
            nonce: 0,
            decimals: 9,
            price: quotePrice
        });
    }
}
```

### 1.2. Create a Warden precompile

In a file `MockWardenPrecompile.sol`, implement a mock of the [`x/warden` precompile](/build-an-app/precompiles/x-warden). Its goal is to manage [keys](/learn/glossary#key) and [signature requests](/learn/glossary#signature-request) .

:::note Full code
You can find the full code on GitHub: [`mocks/MockWardenPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks/MockWardenPrecompile.sol)
:::

```solidity title="mocks/MockWardenPrecompile.sol"
contract MockWardenPrecompile {
    mapping(uint64 => KeyResponse) private keys;
    mapping(uint64 => bool) private goodKeys;

    // A key response simulation
    function keyById(
        uint64 id, 
        int32[] calldata
    ) external view returns (KeyResponse memory key) {
        return KeyResponse({
            key: PublicKey({
                publicKey: abi.encodePacked(
                    bytes32(uint256(id)), 
                    bytes32(0)
                )
            }),
            metadata: new bytes(0)
        });
    }

    // Realistic signing behavior
    function newSignRequest(
        uint64 keyId,
        bytes calldata txHash,
        bytes[] calldata analyzers,
        bytes calldata encryptionKey,
        Types.Coin[] calldata fees,
        uint64 spaceNonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression,
        BroadcastType broadcastType
    ) external view returns (bool) {
        // Validate inputs
        require(txHash.length == 32, "Invalid transaction hash");
        require(bytes(expectedApproveExpression).length > 0, "Empty approve expression");
        
        return goodKeys[keyId];
    }
}
```

### 1.3. Create an Async precompile

In a file `MockAsyncPrecompile.sol`, implement a mock of the [`x/async` precompile](/build-an-app/precompiles/x-async) for creating and tracking [Futures](/learn/glossary#future). Note that this precompile is required only for [automated Orders with price prediction](../implement-automated-orders-with-price-prediction/introduction).

:::note Full code
You can find the full code on GitHub: [`mocks/MockAsyncPrecompile.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/mocks/MockAsyncPrecompile.sol)
:::

```solidity title="mocks/MockAsyncPrecompile.sol"
contract MockAsyncPrecompile is IAsync {
    uint64 public futuresCount = 0;
    mapping(uint64 id => FutureByIdResponse output) public _futures;
    mapping(address orderAddress => address orderCreator) public orders;

    function addFuture(
        string calldata handler,
        bytes calldata input
    ) external returns (uint64 futureId)
    {
        futureId = uint64(++futuresCount);
        Future memory future = Future({
            id: futureId,
            // solhint-disable-next-line
            creator: tx.origin,
            handler: handler,
            input: input
        });

        FutureVote[] memory emptyVotes = new FutureVote[](0);
        bytes memory emptySubmitter;
        FutureResult memory futureResult = FutureResult({ 
            id: futureId,
            output: input,
            submitter: emptySubmitter
        });
        FutureResponse memory futureResponse = FutureResponse({
            future: future,
            votes: emptyVotes,
            result: futureResult
        });
        _futures[futureId] = FutureByIdResponse({
            futureResponse: futureResponse
        });
    }

    function futureById(
        uint64 futureId
    ) external view returns (FutureByIdResponse memory response) {
        response = _futures[futureId];
    }

    function futures(
        Types.PageRequest calldata,
        address
    ) external pure returns (FuturesResponse memory) {
        // solhint-disable-next-line
        revert("Unimplemented");
    }

    function pendingFutures(
        Types.PageRequest calldata
    ) external pure returns (PendingFuturesResponse memory) {
        // solhint-disable-next-line
        revert("Unimplemented");
    }
}
```

## 2. Test precompiles

### 2.1. Create a helper contract

Create a helper contract for testing mock precompiles:

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

### 2.3. Create test scenarios

1. To create a scenario for testing the price feed, use code below:

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

2. To test transaction signing, use the following:

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

## 3. Use precompiles in scripts

This is how you can use precompiles in scripts:

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

## Next steps

After creating mock precompiles, you can [implement the execution interface](implement-the-execution-interface).