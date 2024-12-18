---
sidebar_position: 3
---

# Mock Precompiles

In this section we will create mock precompiles that are essential for testing our Agent end to end.

Before you proceed, please create a `mock` directory where these functions will reside.

## Setting up mock precompiles

### Create `mocks/MockSlinkyPrecompile.sol`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { GetPriceResponse, QuotePrice, ISlinky } from "precompile-slinky/ISlinky.sol";

contract MockSlinkyPrecompile is ISlinky {
    mapping(string base => mapping(string quote => uint256 price)) private prices;

    function getPrice(
        string calldata base,
        string calldata quote
    ) external view returns (GetPriceResponse memory response) {
        uint256 price = prices[base][quote];
        require(price != 0, "Price not set");

        // NEW: Enhanced price data with additional metadata
        QuotePrice memory quotePrice = QuotePrice({
            blockHeight: block.number,    // Current block for testing
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

### Create `mocks/MockWardenPrecompile.sol`

```solidity
contract MockWardenPrecompile {
    mapping(uint64 => KeyResponse) private keys;
    mapping(uint64 => bool) private goodKeys;

    // NEW: Enhanced key response simulation
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

    // NEW: Realistic signing behavior
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

These mock contracts simulate the behavior of:

**MockSlinkyPrecompile:**

- Price feed functionality
- Price setting for testing
- Error handling for missing prices

**MockWardenPrecompile:**

- Key management
- Transaction signing requests
- Key validation

## Integration Testing

### Test Setup Helper

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

    // NEW: Price scenario helper
    function setupPriceScenario(
        string memory base,
        string memory quote,
        uint256 initialPrice,
        uint256 targetPrice
    ) internal {
        MockSlinkyPrecompile(ISLINKY_PRECOMPILE_ADDRESS)
            .setPrice(base, quote, initialPrice);
            
        // Simulate price change
        skip(1 hours);
        MockSlinkyPrecompile(ISLINKY_PRECOMPILE_ADDRESS)
            .setPrice(base, quote, targetPrice);
    }
}
```

## Test Scenarios

### Price Feed Testing

```solidity
contract SlinkyTest is PrecompileTestHelper {
    function testPriceMovement() public {
        // Setup price scenario
        setupPriceScenario("ETH", "USD", 3000e9, 3500e9);
        
        // Test order execution
        Types.OrderData memory orderData = createTestOrder(
            3200e9,  // threshold
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


### Transaction Signing Testing

```solidity
contract WardenTest is PrecompileTestHelper {
    function testSigningFlow() public {
        // Setup keys
        warden.addKey(1, true);  // Valid key
        warden.addKey(2, false); // Invalid key
        
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

## Usage in Scripts

```solidity
contract CreateOrder is Script {
    function run(
        uint256 thresholdPrice,
        Types.PriceCondition priceCondition,
        Types.PricePair memory pricePair
    ) public {
        // Setup mock precompiles
        MockSlinkyPrecompile mSlinky = new MockSlinkyPrecompile();
        MockWardenPrecompile mWarden = new MockWardenPrecompile();
        
        // Configure initial state
        vm.etch(ISLINKY_PRECOMPILE_ADDRESS, address(mSlinky).code);
        mSlinky.setPrice(pricePair.base, pricePair.quote, thresholdPrice);
        
        vm.etch(IWARDEN_PRECOMPILE_ADDRESS, address(mWarden).code);
        mWarden.addKey(1, true);
        
        // Create and verify order
        vm.broadcast();
        BasicOrder order = createOrder(/* params */);
        require(order.canExecute(), "Order cannot execute");
    }
}
```

You can learn about mock precompiles in the [Mock Precompiles](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/mocks) section and test under [Test Scenarios](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders/test)
