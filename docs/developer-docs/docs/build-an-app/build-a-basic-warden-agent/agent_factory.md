---
sidebar_position: 6
---

# Create the OrderFactory contract

The `OrderFactory` contract manages agent creation and tracking with enhanced security features.

Create a contract `OrderFactory.sol`.

:::note GitHub
You can find the full code on GitHub: [`/src/OrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/OrderFactory.sol)
:::

```solidity title="/src/OrderFactory.sol"
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

**Key features:**

1. Factory pattern:
   
   - Creates new order instances
   - Tracks order creators
   - Supports multiple order types
   
2. Management:
   
   - Ownable for admin control
   - Scheduler management
   - Registry integration
   
3. Order creation:
   
   - Basic orders supported
   - Advanced orders placeholder
   - Order registration in Registry

After creating the Orderfactory contract, you can [implement the deployment scripts](deploy_script).
