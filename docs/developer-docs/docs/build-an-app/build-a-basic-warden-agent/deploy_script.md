---
sidebar_position: 6
---

# Deploy Script

Let's implement the deployment scripts. We'll need two scripts: one for deployment and one for creating orders.

## Create `script/Deploy.s.sol:`

```solidity
contract Deploy is Script {
    function run() external {
        vm.startBroadcast(broadcaster);
        
        // NEW: Optional registry reuse
        Registry registry = registryAddress != address(0) 
            ? Registry(registryAddress)
            : new Registry();
            
        new OrderFactory(
            address(registry),
            scheduler,
            factoryOwner
        );

        vm.stopBroadcast();
    }
}
```

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/Deploy.s.sol)

## Create `script/CreateOrder.s.sol:`

```solidity
contract CreateOrder is Script {
    function run(
        uint256 thresholdPrice,
        Types.PriceCondition priceCondition,
        // ... other parameters
    ) external {
        // NEW: Setup mock services
        MockSlinkyPrecompile mSlinkyPrecompile = new MockSlinkyPrecompile();
        MockWardenPrecompile wPrecompile = new MockWardenPrecompile();
        
        // Create order through factory
        FACTORY.createOrder(orderData, maxKeychainFees, OrderType.Basic);
    }
}
```

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/script/CreateOrder.s.sol)

### These scripts handle the following tasks

**Deploy.s.sol:**

1. Registry deployment
2. Factory deployment
3. Environment configuration

**CreateOrder.s.sol:**

1. Order creation through factory
2. Mock precompiles setup
3. Parameter configuration
