---
sidebar_position: 4
---

# Trading Agent Implementation

Let's create our main trading agent that implements the automated Uniswap trading logic.

## BasicOrder Contract (`src/BasicOrder.sol`)

### Core Components

First, let's define our state variables and imports:

```solidity
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

### Constructor with Validations

```solidity
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

### Price Monitoring Logic

```solidity
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

### Trade Execution

```solidity
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

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrder.sol)

## Flow

1.Construction:

- Validates all inputs (scheduler, registry, price conditions)
- Sets up price feed and signing service connections
- Initializes order parameters

2.Price Monitoring (`canExecute`):

- Check if price meets conditions.

3.Trade Execution (`execute`):

a. Verify caller and conditions
b. Pack swap data for Uniswap
c. Create and encode transaction
d. Request signature through Warden
e. Register transaction in Registry
f. Return execution status

## Key Security Features

1.**ReentrancyGuard Protection**

- Prevents reentrancy attacks during execution
- Guards critical state changes

2.**Input Validation**

```solidity
// Example of comprehensive validation
if (_orderData.thresholdPrice == 0) revert InvalidThresholdPrice();
if (_orderData.creatorDefinedTxFields.to == address(0)) revert InvalidTxTo();
```

3.**Transaction Safety**

- EIP-1559 transaction support
- Secure RLP encoding
- Transaction hash verification

## Monitoring and Events

```solidity
event Executed();
event PriceConditionMet(uint256 currentPrice, uint256 thresholdPrice);
event TransactionRegistered(bytes32 indexed txHash);
```

## Testing Considerations

1.**Test price conditions**

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

2.**Test Execution Flow**

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
