---
sidebar_position: 4
---

# Implement the creation of Orders

## Core Components

```solidity
contract AdvancedOrderFactory is ReentrancyGuard {
    Registry public immutable REGISTRY;
    mapping(bytes32 salt => bool used) public usedSalts;

    event AdvancedOrderCreated(
        address indexed creator, 
        address orderAddress
    );
    event SaltUsed(
        bytes32 indexed salt, 
        address indexed creator
    );
}
```

## Enhanced Order Creation

```solidity
function createAdvancedOrder(
    Types.AdvancedOrderData calldata orderData,
    Types.CommonExecutionData calldata executionData,
    CommonTypes.Coin[] calldata maxKeychainFees,
    address scheduler,
    bytes32 salt
) external nonReentrant returns (address orderAddress) {
    // Front-running protection using tx.origin
    address origin = tx.origin;
    bytes32 guardedSalt = keccak256(
        abi.encodePacked(uint256(uint160(origin)), salt)
    );

    if (usedSalts[guardedSalt]) {
        revert SaltAlreadyUsed();
    }

    emit SaltUsed(guardedSalt, origin);

    // Encode contract creation with prediction setup
    bytes memory bytecode = abi.encodePacked(
        type(AdvancedOrder).creationCode,
        abi.encode(
            orderData,
            executionData,
            maxKeychainFees,
            scheduler,
            address(REGISTRY)
        )
    );

    // Deploy using Create3
    orderAddress = Create3.create3(guardedSalt, bytecode);

    address expectedAddress = Create3.addressOf(guardedSalt);
    if (orderAddress == address(0) || 
        orderAddress != expectedAddress) {
        revert OrderDeploymentFailed(guardedSalt);
    }

    // Register and track
    REGISTRY.register(orderAddress);
    usedSalts[guardedSalt] = true;

    emit AdvancedOrderCreated(msg.sender, orderAddress);
}
```

## Order Data Validation

```solidity
function _validateOraclePair(
    Types.PricePair calldata pair
) internal pure returns (bool) {
    return bytes(pair.base).length > 0 && 
           bytes(pair.quote).length > 0;
}

function _validatePredictionPair(
    Types.PricePair calldata pair
) internal pure returns (bool) {
    return bytes(pair.base).length > 0 && 
           bytes(pair.quote).length > 0;
}

function _validateAdvancedOrderData(
    Types.AdvancedOrderData calldata data
) internal pure {
    if (!_validateOraclePair(data.oraclePricePair)) {
        revert InvalidOraclePair();
    }
    if (!_validatePredictionPair(data.predictPricePair)) {
        revert InvalidPredictionPair();
    }
    if (data.priceCondition > Types.PriceCondition.GT) {
        revert InvalidPriceCondition();
    }
}
```

## Enhanced Address Computation

```solidity
function computeOrderAddress(
    address origin,
    bytes32 salt
) external view returns (address) {
    bytes32 guardedSalt = keccak256(
        abi.encodePacked(uint256(uint160(origin)), salt)
    );
    return Create3.addressOf(guardedSalt);
}
```

## Factory Testing

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
        assertTrue(order.futureId() > 0);
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

## Security Considerations

1. **Price Pair Validation**
   - Both oracle and prediction pairs must be properly formatted
   - Asset symbols must match expected formats

2. **Salt Management**
   - Salts are guarded by tx.origin to prevent front-running
   - Each salt can only be used once per creator

3. **Prediction Setup**
   - Future ID must be stored during order creation
   - Prediction pairs must match supported asset pairs

## Next Steps

After creating the `AdvanceOrderFactory` contract, you can [deploy an Order](/deploy-an-order).
