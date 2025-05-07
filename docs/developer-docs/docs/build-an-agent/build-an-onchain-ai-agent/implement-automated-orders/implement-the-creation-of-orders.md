---
sidebar_position: 4
---

# Implement the creation of Orders

## Overview

This article will guide you through creating the `BasicOrderFactory` contract. `BasicOrderFactory`,  when triggered by [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders), deploys Orders (instances of [`BasicOrder`](implement-orders)) and registers them in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).

This factory pattern supports deterministic address computation, front-running protection, and salt-based deployment security. Note that you can extend some parts to [implement the creation of Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-the-creation-of-orders).

:::note Directory
Store `BasicOrderFactory` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/BasicOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrderFactory.sol)
:::

## 1. Create the contract

To start implementing the deployment of Orders, create a file `BasicOrderFactory.sol`:

```solidity title="src/BasicOrderFactory.sol"
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

```solidity title="src/BasicOrderFactory.sol"
function createBasicOrder(
    Types.BasicOrderData calldata orderData,
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

    // Deploy with the CREATE3 opcode
    orderAddress = Create3.create3(guardedSalt, bytecode);
    
    // Verify the deployment
    address expectedAddress = Create3.addressOf(guardedSalt);
    if (orderAddress == address(0) || 
        orderAddress != expectedAddress) {
        revert OrderDeploymentFailed(guardedSalt);
    }

    // Register and track the Order
    REGISTRY.register(orderAddress);
    usedSalts[guardedSalt] = true;

    emit BasicOrderCreated(msg.sender, orderAddress);
}
```

## 3. Add address computation

Allow users to preview the Order addresses:

```solidity title="src/BasicOrderFactory.sol"
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

Finally, implement tests:

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

To [implement the creation Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-the-creation-of-orders), you need to extend the factory pattern with the following advanced features:

- **Complex validation**  
  ```solidity
  function _validateAdvancedOrder(
      Types.AdvancedOrderData memory orderData
  ) internal pure returns (bool);
  ```
- **Prediction setup**  
  ```solidity
  function _setupPrediction(
      address order,
      Types.PredictionData memory predData
  ) internal returns (uint64 futureId);
  ```

:::tip
When you were [implementing the Order creation logic](#2-implement-the-order-creation-logic), you enabled deployment with the `CREATE3` opcode. It ensures that Order addresses are known in advance, which becomes crucial for Orders with price prediction since they may need to reference each other.
:::

## Next steps

After creating the `BasicOrderFactory` contract, you can [deploy an Order](deploy-an-order).
