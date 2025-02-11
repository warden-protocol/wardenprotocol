---
sidebar_position: 4
---

# Implement the creation of Orders

## Overview

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

## Create the `OrderFactory` contract

Implement the creation and tracking of Orders in a file `OrderFactory.sol`:

```solidity title="src/OrderFactory.sol"
contract OrderFactory is Ownable {
    // Track order creators
    mapping(address orderAddress => address orderCreator) public orders;
    Registry public immutable REGISTRY;
    BasicOrderFactory public immutable BASIC_ORDER_FACTORY;
    AdvancedOrderFactory public immutable ADVANCED_ORDER_FACTORY;
    address public scheduler;

    // An event emitted when an Order is created
    event OrderCreated(
        address indexed orderCreator, 
        OrderType indexed orderType, 
        address indexed orderContact
    );

    // Create an Order
    function createOrder(
        bytes calldata _orderData,
        Types.CommonExecutionData calldata _executionData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        OrderType orderType,
        bytes32 salt
    )
        external
        nonReentrant
        returns (address order)
    {
        if (orderType == OrderType.Basic) {
            Types.BasicOrderData memory basicOrderData = abi.decode(_orderData, (Types.BasicOrderData));
            order = _createBasicOrder(salt, basicOrderData, _executionData, maxKeychainFees, scheduler);
        } else if (orderType == OrderType.Advanced) {
            Types.AdvancedOrderData memory advancedOrderData = abi.decode(_orderData, (Types.AdvancedOrderData));
            order = _createAdvancedOrder(salt, advancedOrderData, _executionData, maxKeychainFees, scheduler);
        } else {
            revert UnsupportedOrder();
        }
    }
```

## Next steps

After creating the `OrderFactory` contract, you can [create deployment scripts](create-deployment-scripts).
