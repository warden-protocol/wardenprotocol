---
sidebar_position: 4
---

# Implement the creation of Orders

## Overview

This article will guide you through creating the `AdvancedOrderFactory` contract. `AdvancedOrderFactory`,  when triggered by [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders), deploys Orders (instances of [`AdvancedOrder`](implement-orders)) and registers them in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).

This factory pattern supports deterministic address computation, front-running protection, and salt-based deployment security. Note that it extends the [basic automated Orders creation](../implement-automated-orders/implement-orders).

You'll implement the following core components:

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

:::note Directory
Store `AdvancedOrderFactory` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/AdvancedOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/AdvancedOrderFactory.sol)
:::

## 1. Implement the Order creation logic

Implement the core function for deploying new Orders:

```solidity title="src/AdvancedOrderFactory.sol"
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

    // Deploy with the CREATE3 opcode
    orderAddress = Create3.create3(guardedSalt, bytecode);

    address expectedAddress = Create3.addressOf(guardedSalt);
    if (orderAddress == address(0) || 
        orderAddress != expectedAddress) {
        revert OrderDeploymentFailed(guardedSalt);
    }

    // Register and track the Order
    REGISTRY.register(orderAddress);
    usedSalts[guardedSalt] = true;

    emit AdvancedOrderCreated(msg.sender, orderAddress);
}
```

## 2. Implement data validation

Create functions for validating the Order data:

```solidity title="src/AdvancedOrderFactory.sol"
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

## 3. Add address computation

```solidity title="/src/AdvancedOrderFactory.sol"
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

## 4. Implement tests

Finally, implement tests:

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

## Security measures

In the previous steps, you've implemented the following security measures:

- **Price data validation**  
  The contract will check if oracle and predictions price pairs are properly formatted and asset symbols match the expected formats.
  ```
  function _validateOraclePair(...)  
  function _validatePredictionPair(...)
  function _validateAdvancedOrderData(...)
  ```
- **Salt management**  
  Salts are guarded by `tx.origin` to prevent front-running. Each salt can only be used once per creator.
  ```
  address origin = tx.origin;
  bytes32 guardedSalt = keccak256(
      abi.encodePacked(uint256(uint160(origin)), salt)
  ```
  ```
  if (usedSalts[guardedSalt]) {
        revert SaltAlreadyUsed();
  }
  ```

## Next steps

After creating the `AdvanceOrderFactory` contract, you can [deploy an Order](deploy-an-order).
