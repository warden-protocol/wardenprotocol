---
sidebar_position: 5
---

# Create the trading Agent

## Overview

Let's create our main trading agent that implements the automated Uniswap trading logic.

Create the `BasicOrder` contract

:::note GitHub
You can find the full code on GitHub: [`/src/BasicOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrder.sol)
:::

## 1. Create the core components

First, let's define our state variables and imports:

```solidity title="/src/BasicOrder.sol"
contract BasicOrder is IExecution, ReentrancyGuard {
    // NEW: Constant for Uniswap interface
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = 
        "swapExactETHForTokens(uint256,address[],address,uint256)";

    // External service connections
    IWarden private immutable WARDEN_PRECOMPILE;
    ISlinky private immutable SLINKY_PRECOMPILE;
    Registry private immutable REGISTRY;

    // NEW: Enhanced state tracking
    Caller[] private _callers;
    bool private _executed;
    address private _keyAddress;
    bytes private _unsignedTx;
}
```

## 2. Create a constructor with validations

```solidity title="/src/BasicOrder.sol"
constructor(
    Types.OrderData memory _orderData,
    CommonTypes.Coin[] memory maxKeychainFees,
    address scheduler,
    address registry
) {
    // NEW: Enhanced input validation
    if (scheduler == address(0)) revert InvalidScheduler();
    if (registry == address(0)) revert InvalidRegistry();
    if (_orderData.swapData.amountIn == 0) revert InvalidSwapDataAmountIn();
    if (_orderData.swapData.to == address(0)) revert InvalidSwapDataTo();
    
    // Initialize services and state
    WARDEN_PRECOMPILE = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
    SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
    _callers.push(Caller.Scheduler);
}
```

## 3. Create the price monitoring logic

```solidity title="/src/BasicOrder.sol"
function canExecute() public view returns (bool value) {
    // NEW: Enhanced price condition checking
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

## 4. Implement the trade execution

```solidity title="/src/BasicOrder.sol"
function execute(
    uint256 nonce,
    uint256 gas,
    uint256,
    uint256 maxPriorityFeePerGas,
    uint256 maxFeePerGas
) external nonReentrant returns (bool, bytes32) {
    // NEW: Security checks
    if (msg.sender != _scheduler) revert Unauthorized();
    if (isExecuted()) revert ExecutedError();
    if (!canExecute()) revert ConditionNotMet();

    // Build and encode transaction
    bytes memory unsignedTx = _buildTransaction(
        nonce, gas, maxPriorityFeePerGas, maxFeePerGas
    );
    
    // Request signature and register transaction
    _executed = _requestSignature(unsignedTx);
    if (_executed) {
        emit Executed();
        REGISTRY.addTransaction(keccak256(unsignedTx));
    }

    return (_executed, keccak256(unsignedTx));
}
```

## Flow

1.Construction:

- Validates all inputs (scheduler, registry, price conditions)
- Sets up price feed and signing service connections
- Initializes order parameters

2.Price monitoring (`canExecute`):

- Check if price meets conditions.

3.Trade execution (`execute`):

a. Verify caller and conditions
b. Pack swap data for Uniswap
c. Create and encode transaction
d. Request signature through Warden
e. Register transaction in Registry
f. Return execution status

## Key security features

1.**ReentrancyGuard protection**

- Prevents reentrancy attacks during execution
- Guards critical state changes

2.**Input validation**

```solidity
// Example of comprehensive validation
if (_orderData.thresholdPrice == 0) revert InvalidThresholdPrice();
if (_orderData.creatorDefinedTxFields.to == address(0)) revert InvalidTxTo();
```

3.**Transaction safety**

- EIP-1559 transaction support
- Secure RLP encoding
- Transaction hash verification

## Monitoring and events

```solidity
event Executed();
event PriceConditionMet(uint256 currentPrice, uint256 thresholdPrice);
event TransactionRegistered(bytes32 indexed txHash);
```

## Testing considerations

1. **Test price conditions**
   
   ```solidity
   function test_priceConditions() public {
       // Test GTE condition
       vm.mockCall(
           address(SLINKY_PRECOMPILE),
           abi.encodeWithSelector(ISlinky.getPrice.selector),
           abi.encode(price)
       );
       assertTrue(order.canExecute());
   }
   ```

2. **Test the execution flow**
   
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

## Next steps

After creating the trading Agent, you can [create the OrderFactory contract](agent_factory).
