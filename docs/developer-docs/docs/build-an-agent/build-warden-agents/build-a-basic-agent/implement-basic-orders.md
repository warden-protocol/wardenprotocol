---
sidebar_position: 3
---

# Implement Basic Orders

## Overview

The `BasicOrder` contract implements the core of the Basic Warden Agent – **Basic Orders**. Basic Orders act as trading Agents that monitor prices and automatically perform swaps.

To create an Order, a user triggers the [`OrderFactory`](../build-the-infrastructure-for-agents/implement-order-factory) contract, and it deploys an instance of the `BasicOrder` contract. Then the Basic Agent executes and manages Orders, as shown in [Create helper libraries and contracts](../build-the-infrastructure-for-agents/create-helpers-and-utils).

This article will guide you through creating the `BasicOrder` contract.

:::note Directory
Store `BasicOrder` in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory, alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`/src/BasicOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrder.sol)
:::

## 1. Create core components

First, define the state variables and imports:

```solidity title="/src/BasicOrder.sol"
contract BasicOrder is IExecution, ReentrancyGuard {
    // A constant for the Uniswap interface
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = 
        "swapExactETHForTokens(uint256,address[],address,uint256)";

    // External service connections
    IWarden private immutable WARDEN_PRECOMPILE;
    ISlinky private immutable SLINKY_PRECOMPILE;
    Registry private immutable REGISTRY;

    // State tracking
    Caller[] private _callers;
    bool private _executed;
    address private _keyAddress;
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
    Types.OrderData memory _orderData,
    CommonTypes.Coin[] memory maxKeychainFees,
    address scheduler,
    address registry
) {
    // Input validation
    if (scheduler == address(0)) revert InvalidScheduler();
    if (registry == address(0)) revert InvalidRegistry();
    if (_orderData.swapData.amountIn == 0) revert InvalidSwapDataAmountIn();
    if (_orderData.swapData.to == address(0)) revert InvalidSwapDataTo();
    
    // Initialize services and the state
    WARDEN_PRECOMPILE = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
    SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
    _callers.push(Caller.Scheduler);
}
```

## 3. Implement price monitoring

In the `canExecute()` function, implement the logic for monitoring prices. This function should handle these tasks:

- Check if the price meets a given condition: `>=` or `<=` than the threshold  
  (see the `PriceCondtion` enum in [`Types.sol`](../build-the-infrastructure-for-agents/create-helpers-and-utils#1-define-data-structures))

```solidity title="/src/BasicOrder.sol"
function canExecute() public view returns (bool value) {
    GetPriceResponse memory priceResponse = 
        SLINKY_PRECOMPILE.getPrice(orderData.pricePair.base, orderData.pricePair.quote);
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
- Pack swap data for Uniswap
- Create and encode a transaction
- Request a signature through Warden
- Emit the `Executed()` event
- Register the transaction in the [registry](../build-the-infrastructure-for-agents/create-helpers-and-utils#3-implement-the-registry)
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
    if (msg.sender != _scheduler) revert Unauthorized();
    if (isExecuted()) revert ExecutedError();
    if (!canExecute()) revert ConditionNotMet();

    // Build and encode a transaction
    bytes memory unsignedTx = _buildTransaction(
        nonce, gas, maxPriorityFeePerGas, maxFeePerGas
    );
    
    // Request a signature and register the transaction
    _executed = _requestSignature(unsignedTx);
    if (_executed) {
        emit Executed();
        REGISTRY.addTransaction(keccak256(unsignedTx));
    }

    return (_executed, keccak256(unsignedTx));
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

## Key security features

Key security features of the `BasicOrder` contract include the following:
- **ReentrancyGuard protection**
   - Preventing reentrancy attacks during execution
   - Guarding critical state changes
- **Input validation**
   ```solidity
   // An example of comprehensive validation
   if (_orderData.thresholdPrice == 0) revert InvalidThresholdPrice();
   if (_orderData.creatorDefinedTxFields.to == address(0)) revert InvalidTxTo();
   ```
- **Transaction safety**   
   - The support of EIP-1559 transactions
   - Secure RLP encoding
   - Transaction hash verification

## Next steps

After creating the `BasicOrder` contract, you can [implement the creation of Basic Orders](implement-basic-order-factory).
