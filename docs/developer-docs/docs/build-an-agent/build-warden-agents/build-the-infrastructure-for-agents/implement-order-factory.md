---
sidebar_position: 5
---

# Implement the creation of Orders

## Overview

The `OrderFactory` contract securely manages the creation and tracking of Order – instances of the [`BasicOrder`](../build-a-basic-agent/implement-basic-orders) contract that monitor price feeds and perform swaps when price thresholds are met.

When triggered by a user, `OrderFactory` deploys a new [`BasicOrder`](../build-a-basic-agent/implement-basic-orders) contract and registers it in the [registry](create-helpers-and-utils#3-implement-the-registry).

:::note Directory
Store `OrderFactory` in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory, alongside with other contracts.
:::

## Create the contract

Implement the creation and tracking of Orders in a file `OrderFactory.sol`:

:::note Full code
You can find the full code on GitHub: [`/src/OrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/OrderFactory.sol)
:::

```solidity title="/src/OrderFactory.sol"
contract OrderFactory is Ownable {
    // Track order creators
    mapping(address orderAddress => address orderCreator) public orders;
    Registry public immutable REGISTRY;
    address public scheduler;

    // An event emitted when an Order is created
    event OrderCreated(
        address indexed orderCreator, 
        OrderType indexed orderType, 
        address indexed orderContact
    );

    // Create an Order
    function createOrder(
        Types.OrderData calldata _orderData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        OrderType orderType
    ) public returns (address order) {
        if (orderType == OrderType.Basic) {
            return _createBasicOrder(_orderData, maxKeychainFees, scheduler);
        }
        revert UnsupportedOrder();
    }
}
```

## Next steps

After creating the `OrderFactory` contract, you can [create deployment scripts](create-deployment-scripts).
