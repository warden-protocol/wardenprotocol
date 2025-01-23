---
sidebar_position: 3
---

# Implement Orders

## Overview

The `BasicOrder` contract implements the core of logic of this example – **automated Orders** that monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met.

To create an Order, a user triggers the [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) contract. Then it calls [`BasicOrderFactory`](implement-the-creation-of-orders), which deploys `BasicOrder`. Finally, the Warden Agent [executes and manages Orders](../build-the-infrastructure-for-orders/implement-the-execution-interface).

This article will guide you through creating the `BasicOrder` contract.

:::note Directory
Store `BasicOrder` in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory, alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`/src/BasicOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrder.sol)
:::

### Architecture

```solidity
contract BasicOrder is AbstractOrder, IExecution {
    // Core components
    ISlinky private immutable SLINKY_PRECOMPILE;
    Registry private immutable REGISTRY;
    
    // Order configuration
    Types.BasicOrderData public orderData;     // Price conditions
    Types.CommonExecutionData public commonExecutionData;  // Transaction details
    
    // State tracking
    bool private _executed;
    bytes private _unsignedTx;
}
```

## 1. Create core components

First, define the state variables and imports:

```solidity title="/src/BasicOrder.sol"
contract BasicOrder is AbstractOrder, IExecution {
    // State variables - designed for future extension
    ISlinky private immutable SLINKY_PRECOMPILE;
    Registry private immutable REGISTRY;
    
    // Extensible data structures
    Types.BasicOrderData public orderData;
    Types.CommonExecutionData public commonExecutionData;
    
    // Basic state tracking - can be enhanced in advanced versions
    bool private _executed;
    bytes private _unsignedTx;
}
```

## 2. Create a constructor

Now create a `constructor` with validations. As shown in the code below, your constructor should handle the following tasks:

- Validate all inputs (the scheduler, the registry, price conditions)
- Set up connections with the price feed and the signing service
- Initialize the Order parameters

```solidity title="/src/BasicOrder.sol"
constructor(
    Types.BasicOrderData memory _orderData,
    Types.CommonExecutionData memory _executionData,
    CommonTypes.Coin[] memory maxKeychainFees,
    address scheduler,
    address registry
) AbstractOrder(
    _executionData.signRequestData,
    _executionData.creatorDefinedTxFields,
    scheduler, 
    registry
) {
    // Validation
    if (_orderData.thresholdPrice == 0) revert InvalidThresholdPrice();
    
    // Initialize price feed - single source in basic version
    SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
    REGISTRY = Registry(registry);
    
    // Store order data - structure allows for extension
    orderData = _orderData;
    commonExecutionData = _executionData;
}
```

## 3. Implement price monitoring

In the `canExecute()` function, implement the logic for monitoring prices. This function should handle these tasks:

- Check if the price meets a given condition: `>=` or `<=` than the threshold  
  (see the `PriceCondtion` enum in [`Types.sol`](../build-the-infrastructure-for-orders/create-helpers-and-utils#1-define-data-structures))

```solidity title="/src/BasicOrder.sol"
function canExecute() public view virtual returns (bool) {
    // Get current price - single source in basic version
    GetPriceResponse memory priceResponse = 
        SLINKY_PRECOMPILE.getPrice(
            orderData.pricePair.base, 
            orderData.pricePair.quote
        );
    
    // Check price condition - simplified in basic version
    return _checkPriceCondition(priceResponse.price.price);
}

// Virtual function for price condition checking - can be overridden
function _checkPriceCondition(uint256 currentPrice) 
    internal 
    view 
    virtual 
    returns (bool) 
{
    if (orderData.priceCondition == Types.PriceCondition.GTE) {
        return currentPrice >= orderData.thresholdPrice;
    } else {
        return currentPrice <= orderData.thresholdPrice;
    }
}
```

## 4. Implement trade execution

In the `execute()` function, implement the logic for executing trades. This function should do the following:

- Verify the caller and conditions
- Pack swap data for Uniswap
- Create and encode a transaction
- Request a signature through Warden
- Emit the `Executed()` event
- Register the transaction in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry)
- Return the execution status

```solidity title="/src/BasicOrder.sol"
function execute(
    uint256 nonce,
    uint256 gas,
    uint256,
    uint256 maxPriorityFeePerGas,
    uint256 maxFeePerGas
) external nonReentrant returns (bool, bytes32) {
    // Security checks
    if (msg.sender != scheduler) revert Unauthorized();
    if (_executed) revert ExecutedError();
    if (!canExecute()) revert ConditionNotMet();

    // Build transaction
    (bytes memory unsignedTx, bytes32 txHash) = encodeUnsignedEIP1559(
        nonce,
        gas,
        maxPriorityFeePerGas,
        maxFeePerGas,
        new bytes[](0),  // Empty access list in basic version
        commonExecutionData.creatorDefinedTxFields
    );

    // Request signature and track execution
    _executed = createSignRequest(
        commonExecutionData.signRequestData,
        abi.encodePacked(txHash),
        maxKeychainFees
    );

    if (_executed) {
        _unsignedTx = unsignedTx;
        emit Executed();
        REGISTRY.addTransaction(txHash);
    }

    return (_executed, txHash);
}
```

## 5. Test the contract

To test price conditions, use the following code:

```solidity
function test_priceConditions() public {
    // Test the GTE condition
    vm.mockCall(
        address(SLINKY_PRECOMPILE),
        abi.encodeWithSelector(ISlinky.getPrice.selector),
        abi.encode(price)
    );
    assertTrue(order.canExecute());
}
```

To test the execution flow, use this:

```solidity
function test_execution() public {
    vm.startPrank(scheduler);
    (bool success, bytes32 txHash) = order.execute(
        1, // nonce
        200000, // gas
        0, // unused
        2 gwei, // maxPriorityFeePerGas
        100 gwei // maxFeePerGas
    );
    assertTrue(success);
}
```

## Extension Points

The `automated order` contract can be extended with advance features to adopt price prediction using `x/async` model from Warden.

### 1. Price Conditions

```solidity
// Current basic conditions
enum PriceCondition {
    LTE,
    GTE
}

// Can be extended to:
enum PriceCondition {
    LTE,
    GTE,
    LT,    // For advanced orders
    GT     // For advanced orders
}
```

### 2. Price Sources

```solidity
// Current single source
GetPriceResponse memory priceResponse = SLINKY_PRECOMPILE.getPrice(...);

// Can be extended to multiple sources
function _getPrices() internal virtual returns (uint256[] memory) {
    // Advanced implementation
}
```

### 3. Execution Window

```solidity
// Can add time-based execution
uint256 public validUntil;  // For advanced orders
```

## Security Considerations

### 1. Reentrancy Protection

```solidity
function execute(...) external nonReentrant { ... }
```

### 2. Access Control

```solidity
if (msg.sender != scheduler) revert Unauthorized();
```

### 3. State Management

```solidity
if (_executed) revert ExecutedError();
```

## Next steps

After creating the `BasicOrder` contract, you can [implement the creation of Orders](implement-the-creation-of-orders).
