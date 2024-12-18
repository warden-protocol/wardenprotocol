---
sidebar_position: 5
---

# Order Factory Contract

## Implementing the Order Factory Contract

The OrderFactory contract manages agent creation and tracking with enhanced security features:

Create - `src/OrderFactory.sol`:

```solidity
contract OrderFactory is Ownable {
    // NEW: Enhanced tracking and security
    mapping(address orderAddress => address orderCreator) public orders;
    Registry public immutable REGISTRY;
    address public scheduler;

    // NEW: Event for better tracking
    event OrderCreated(
        address indexed orderCreator, 
        OrderType indexed orderType, 
        address indexed orderContact
    );

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

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/OrderFactory.sol)

**Key Features:**

1.Factory Pattern:

- Creates new order instances
- Tracks order creators
- Supports multiple order types

2.Management:

- Ownable for admin control
- Scheduler management
- Registry integration

3.Order Creation:

- Basic orders supported
- Advanced orders placeholder
- Order registration in Registry
