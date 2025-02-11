---
sidebar_position: 3
---

# Implement Orders

## Overview

The `BasicOrder` contract implements the core of logic of this example—**automated Orders** that monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met. Note that you can extend some parts to [implement Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-orders).

This article will guide you through creating the `BasicOrder` contract. You'll implement the following architecture:

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

:::note Directory
Store `BasicOrder` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/BasicOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrder.sol)
:::

## 1. Create core components

First, define the state variables and imports:

```solidity title="src/BasicOrder.sol"
contract BasicOrder is AbstractOrder, IExecution {
    // State variables (extensible)
    ISlinky private immutable SLINKY_PRECOMPILE;
    Registry private immutable REGISTRY;
    
    // Data structures (extensible)
    Types.BasicOrderData public orderData;
    Types.CommonExecutionData public commonExecutionData;
    
    // The state tracking (extensible)
    bool private _executed;
    bytes private _unsignedTx;
}
```

**Note:** You can extend and expand all these components to [implement Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-orders).


## 2. Create a constructor

Now create a `constructor` with validations. As shown in the code below, your constructor should handle the following tasks:

- Validate all inputs: the scheduler, the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry), price conditions
- Set up connections with the [price feed](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile) and the [signing service](../build-the-infrastructure-for-orders/create-helpers-and-utils#2-create-an-abstract-order)
- Initialize the Order parameters

```solidity title="src/BasicOrder.sol"
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
    // Validate the threshold price
    if (_orderData.thresholdPrice == 0) revert InvalidThresholdPrice();
    
    // Initialize the price feed (extensible: you can add prediction prices)
    SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
    REGISTRY = Registry(registry);
    
    // Store the order data (extensible)
    orderData = _orderData;
    commonExecutionData = _executionData;
}
```

## 3. Implement price monitoring

In the `canExecute()` function, implement the logic for monitoring prices. This function should check if the price meets a given condition: `>=` or `<=` than the threshold—see the `PriceCondtion` enum in [`Types.sol`](../build-the-infrastructure-for-orders/create-helpers-and-utils#1-define-data-structures).


```solidity title="src/BasicOrder.sol"
function canExecute() public view returns (bool value) {

    GetPriceResponse memory priceResponse =
        SLINKY_PRECOMPILE.getPrice(orderData.pricePair.base, orderData.pricePair.quote);

    // Check the price condition (extensible: you can implement more complex price conditions)
    Types.PriceCondition condition = orderData.priceCondition;
    if (condition == Types.PriceCondition.GTE) {
        value = priceResponse.price.price >= orderData.thresholdPrice;
    } else if (condition == Types.PriceCondition.LTE) {
        value = priceResponse.price.price <= orderData.thresholdPrice;
    } else {
        revert InvalidPriceCondition();
    }
}
```

## 4. Implement trade execution

In the `execute()` function, implement the logic for executing trades. This function should do the following:

- Verify the caller and conditions
- Pack the swap data for Uniswap
- Create and encode a transaction
- Request a signature through the [Warden precompile](../build-the-infrastructure-for-orders/create-helpers-and-utils#2-create-an-abstract-order)
- Emit the `Executed()` event
- Register the transaction in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry)
- Return the execution status

```solidity title="src/BasicOrder.sol"
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

    // Build a transaction
    (bytes memory unsignedTx, bytes32 txHash) = encodeUnsignedEIP1559(
        nonce,
        gas,
        maxPriorityFeePerGas,
        maxFeePerGas,
        new bytes[](0),  // An empty access list (you can change it in the advanced version)
        commonExecutionData.creatorDefinedTxFields
    );

    // Request a signature and track its execution
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

## Security measures

In the previous steps, you've implemented the following security measures:

- **Reentrancy protection**  
  ```solidity
  function execute(...) external nonReentrant { ... }
  ```
- **Access control**  
  ```solidity
  if (msg.sender != scheduler) revert Unauthorized();
  ```
- **State management**
  ```solidity
  if (_executed) revert ExecutedError();
  ```

## Extension points

To [implement Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-orders), you need to extend your basic contract with the following advanced features:

- **Complex price conditions**  
  The basic implementation shown in this guide supports the `<=` and `>=` price conditions:  
  ```solidity
  Types.PriceCondition condition = orderData.priceCondition;
  if (condition == Types.PriceCondition.GTE) {
     value = priceResponse.price.price >= orderData.thresholdPrice;
  } else if (condition == Types.PriceCondition.LTE) {
     value = priceResponse.price.price <= orderData.thresholdPrice;
  } else {
     revert InvalidPriceCondition();
  }
  ```
  In the advanced implementation, you can add strict inequality comparisons: `<` and `>`.  
  ```solidity
  function _checkPriceCondition(uint256 oraclePrice, uint256 predictedPrice) internal view returns (bool) {
      if (
          (orderData.priceCondition == Types.PriceCondition.GTE && oraclePrice >= predictedPrice) ||
          (orderData.priceCondition == Types.PriceCondition.LTE && oraclePrice <= predictedPrice) ||
          (orderData.priceCondition == Types.PriceCondition.GT && oraclePrice > predictedPrice) ||
          (orderData.priceCondition == Types.PriceCondition.LT && oraclePrice < predictedPrice)
      ) {
          return true;
      }
      return false;
  }
  ```
- **Multiple price sources**  
  The basic implementation uses prices from a single source—the oracle service:  
  ```solidity
  GetPriceResponse memory priceResponse = SLINKY_PRECOMPILE.getPrice(...);
  ```
  In the advanced implementation, you can use oracle and prediction prices:    
  ```solidity
  function _getPrices() internal virtual returns (uint256[] memory) {
      // ...
  }
  ```
- **A time-based execution window**  
   In the advanced implementation, you can limit the execution of Orders by a validity window:  
   ```solidity
   uint256 public validUntil;
   ```

## Next steps

After creating the `BasicOrder` contract, you can [implement the creation of Orders](implement-the-creation-of-orders).
