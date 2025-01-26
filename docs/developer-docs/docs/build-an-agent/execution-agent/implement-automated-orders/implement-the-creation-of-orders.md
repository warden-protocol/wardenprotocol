---
sidebar_position: 4
---

# Implement the creation of Orders

## Overview

While `BasicOrder` handles the trading logic, `BasicOrderFactory` handles the deployment and registration of orders. This factory pattern provides:

- Deterministic address computation
- Front-running protection
- Order tracking in the registry
- Salt-based deployment security

:::note Directory
Store `BasicOrderFactory` in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory, alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`/src/BasicOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrderFactory.sol)
:::

## 1. Create the `BasicOrderFactory` contract

To start implementing the deployment of orders, create a file `BasicOrderFactory.sol`:

```solidity title="/src/BasicOrderFactory.sol"
contract BasicOrderFactory is ReentrancyGuard {
    // The registry for order tracking
    Registry public immutable REGISTRY;
    
    // Track used deployment salts
    mapping(bytes32 salt => bool used) public usedSalts;
    
    event BasicOrderCreated(address indexed creator, address orderAddress);
    
    constructor(address registry) {
        REGISTRY = Registry(registry);
    }
}
```

## 2. Implement the Order creation logic

In the same contract, implement the core function for deploying new Orders:

```solidity title="/src/BasicOrderFactory.sol"
function createBasicOrder(
    Types.BasicOrderData calldata orderData,
    Types.CommonExecutionData calldata executionData,
    CommonTypes.Coin[] calldata maxKeychainFees,
    address scheduler,
    bytes32 salt
) external nonReentrant returns (address orderAddress) {
    // Protect against front-running
    address origin = tx.origin;
    bytes32 guardedSalt = keccak256(
        abi.encodePacked(uint256(uint160(origin)), salt)
    );
    
    if (usedSalts[guardedSalt]) {
        revert SaltAlreadyUsed();
    }

    // Create the deployment bytecode
    bytes memory bytecode = abi.encodePacked(
        type(BasicOrder).creationCode,
        abi.encode(
            orderData, 
            executionData, 
            maxKeychainFees, 
            scheduler, 
            address(REGISTRY)
        )
    );

    // Deploy with CREATE3
    orderAddress = Create3.create3(guardedSalt, bytecode);
    
    // Verify the deployment
    address expectedAddress = Create3.addressOf(guardedSalt);
    if (orderAddress == address(0) || 
        orderAddress != expectedAddress) {
        revert OrderDeploymentFailed(guardedSalt);
    }

    // Register and track
    REGISTRY.register(orderAddress);
    usedSalts[guardedSalt] = true;

    emit BasicOrderCreated(msg.sender, orderAddress);
}
```

## 3. Add address computation

Finally, allow users to preview the Order addresses:

```solidity title="/src/BasicOrderFactory.sol"
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

## 5. Implement tests

```solidity
contract BasicOrderFactoryTest is Test {
    function test_CreateOrder() public {
        // Test basic creation
        bytes32 salt = bytes32("test");
        address expected = factory.computeOrderAddress(
            address(this), 
            salt
        );
        
        address actual = factory.createBasicOrder(
            orderData,
            executionData,
            fees,
            scheduler,
            salt
        );
        
        assertEq(actual, expected);
        assertTrue(Registry(registry).isRegistered(actual));
    }

    function test_PreventSaltReuse() public {
        bytes32 salt = bytes32("test");
        factory.createBasicOrder(...);
        
        vm.expectRevert(SaltAlreadyUsed.selector);
        factory.createBasicOrder(...);
    }
}
```

## Extension points

When moving to Advanced Orders, the factory pattern extends in these ways:

### Complex validation

```solidity
function _validateAdvancedOrder(
    Types.AdvancedOrderData memory orderData
) internal pure returns (bool);
```

### Prediction setup

```solidity
function _setupPrediction(
    address order,
    Types.PredictionData memory predData
) internal returns (uint64 futureId);
```

:::tip
The factory's CREATE3 deployment ensures Order addresses can be known in advance. This becomes crucial for advanced Orders that may need to reference each other.
:::

## Next steps

After creating the `BasicOrderFactory` contract, you can [deploy an Order](deploy-an-order).
