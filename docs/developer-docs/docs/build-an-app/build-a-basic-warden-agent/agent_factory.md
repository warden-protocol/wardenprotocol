---
sidebar_position: 6
---

# Create the OrderFactory contract

## Overview

The `OrderFactory` contract securely manages the creation and tracking of orders – instances of the [`BasicOrder`](main_contract) contract that monitor price feeds and perform swaps when price conditions are met.

When triggered by a user, `OrderFactory` deploys a new [`BasicOrder`](main_contract) contract and registers it in the [registry](structure#3-implement-the-registry).

## Create the `OrderFactory` contract

Implement order creation and tracking in a file `OrderFactory.sol`:

:::note GitHub
You can find the full code on GitHub: [`/src/OrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/OrderFactory.sol)
:::

```solidity title="/src/OrderFactory.sol"
contract OrderFactory is Ownable {
    // Track order creators
    mapping(address orderAddress => address orderCreator) public orders;
    Registry public immutable REGISTRY;
    address public scheduler;

    // An event emitted when an order is created
    event OrderCreated(
        address indexed orderCreator, 
        OrderType indexed orderType, 
        address indexed orderContact
    );

    // Create an order
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

After creating the `OrderFactory` contract, you can [implement the deployment scripts](deploy_script).
