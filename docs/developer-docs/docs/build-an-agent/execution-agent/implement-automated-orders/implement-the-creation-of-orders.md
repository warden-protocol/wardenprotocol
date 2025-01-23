---
sidebar_position: 4
---

# Implement the creation of Orders

## Overview

While `BasicOrder` handles trading logic, `BasicOrderFactory` handles the deployment and registration of orders. This factory pattern provides:

- Deterministic address computation
- Front-running protection
- Order tracking in Registry
- Salt-based deployment security

:::note Directory
Store `BasicOrderFactory` in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory, alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`/src/BasicOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrderFactory.sol)
:::

## Implementation

### 1. Core Factory Contract

Implement the creation of Orders in a file `BasicOrderFactory.sol`:

```solidity title="/src/BasicOrderFactory.sol"
contract BasicOrderFactory is ReentrancyGuard {
    // Registry for order tracking
    Registry public immutable REGISTRY;
    
    // Track used deployment salts
    mapping(bytes32 salt => bool used) public usedSalts;
    
    event BasicOrderCreated(address indexed creator, address orderAddress);
    
    constructor(address registry) {
        REGISTRY = Registry(registry);
    }
}
```

### 2. Order Creation Logic

Core function for deploying new orders:

```solidity
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

    // Create deployment bytecode
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
    
    // Verify deployment
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

### 3. Address Computation

Allow users to preview order addresses:

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

### 4. Testing Structure

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

## Extension Points

When moving to Advanced Orders, the factory pattern extends in these ways:

### 1. Complex validation

```solidity
function _validateAdvancedOrder(
    Types.AdvancedOrderData memory orderData
) internal pure returns (bool);
```

### 2. Prediction Setup

```solidity
function _setupPrediction(
    address order,
    Types.PredictionData memory predData
) internal returns (uint64 futureId);
```

:::tip
The factory's CREATE3 deployment ensures order addresses can be known in advance. This becomes crucial for advanced order types that may need to reference each other.
:::

## Next steps

After creating the `BasicOrderFactory` contract, you can [deploy an Order](deploy-an-order).
