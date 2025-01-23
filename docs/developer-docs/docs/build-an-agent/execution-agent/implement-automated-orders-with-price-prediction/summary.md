---
sidebar_position: 6
---

# Summary

## Core Features

| Feature | Basic Orders | Advanced Orders |
|---------|-------------|-----------------|
| Price Conditions | `>=`, `<=` | `>`, `<`, `>=`, `<=` |
| Price Sources | Single oracle | Oracle + Prediction |
| Time Window | None | 24-hour validity |
| Infrastructure | Slinky precompile | Slinky + Async precompiles |
| State Management | Simple execution flag | Prediction tracking + expiry |

## Implementation Complexity

### Basic Orders Implementation

```solidity
contract BasicOrder {
    // Simple state
    bool private _executed;
    
    // Single price source
    ISlinky private immutable SLINKY_PRECOMPILE;
    
    // Simple execution check
    function canExecute() public view returns (bool) {
        return priceResponse.price >= threshold;
    }
}
```

### Advanced Orders Implementation

```solidity
contract AdvancedOrder {
    // Complex state
    uint64 public futureId;
    uint256 private _validUntil;
    
    // Multiple integrations
    ISlinky private immutable SLINKY_PRECOMPILE;
    IAsync private immutable ASYNC_PRECOMPILE;
    
    // Advanced execution check
    function canExecute() public view returns (bool) {
        if (block.timestamp > _validUntil) return false;
        FutureByIdResponse memory future = ASYNC_PRECOMPILE.futureById(futureId);
        return _checkPredictionAndPrice(future, getCurrentPrice());
    }
}
```

## Use Cases

### Basic Orders Use Cases

- Simple limit orders
- Direct price thresholds
- Immediate execution needs
- Straightforward swaps

### Advanced Orders Use Cases

- Predictive trading
- Complex price conditions
- Time-sensitive operations
- Multi-source validation

## Development Path

1. Start with Basic Orders to understand:
   - Order lifecycle
   - Price monitoring
   - Execution flow

2. Progress to Advanced Orders to add:
   - Prediction integration
   - Time windows
   - Complex conditions

## Key Differences in Practice

### Deployment

```bash
# Basic Order
just create-basic-order $THRESHOLD $CONDITION $PRICE_PAIR

# Advanced Order
just create-advanced-order $CONDITION $ORACLE_PAIR $PREDICT_PAIR
```

### Monitoring

```bash
# Basic Order
cast call $ORDER "canExecute()"

# Advanced Order
cast call $ORDER "futureId()"
cast call $ASYNC_PRECOMPILE "futureById(uint64)" $FUTURE_ID
cast call $ORDER "validUntil()"
cast call $ORDER "canExecute()"
```

## What next?

Please note `orders` are just examples of what can be built with Agents. Sky is the limit! If you have an interesting idea, make a PR to our examples repo. Alternatively you can reach out to us on - **developers@wardenprotocol.org** for any questions / feedback.
