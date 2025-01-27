---
sidebar_position: 6
---

# Summary

## Core features

| Feature | Automated Orders | Automated Orders with price predction |
|---------|-------------|-----------------|
| Price conditions | `>=`, `<=` | `>`, `<`, `>=`, `<=` |
| Price sources | Single oracle | Oracle + prediction |
| Time 2indow | None | 24-hour validity |
| Infrastructure | Slinky precompile | Slinky + Async precompiles |
| State management | Simple execution flag | Prediction tracking + expiry |

## Implementation complexity

Automated Orders: 

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

Automated Orders with price prediction:

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

## Use cases

Automated Orders:

- Simple limit orders
- Direct price thresholds
- Immediate execution needs
- Straightforward swaps

Automated Orders with price prediction:

- Predictive trading
- Complex price conditions
- Time-sensitive operations
- Multi-source validation

## Development path

1. Start with automated Orders to understand the following:
   - Order lifecycle
   - Price monitoring
   - Execution flow

2. To implement automated Orders with price prediction, add these features:
   - Prediction integration
   - Time windows
   - Complex conditions

## Key differences in practice

### Deployment

```bash
# An automated Order
just create-basic-order $THRESHOLD $CONDITION $PRICE_PAIR

# An automated Order with price prediction
just create-advanced-order $CONDITION $ORACLE_PAIR $PREDICT_PAIR
```

### Monitoring

```bash
# An automated Order
cast call $ORDER "canExecute()"

# An automated Order with price prediction
cast call $ORDER "futureId()"
cast call $ASYNC_PRECOMPILE "futureById(uint64)" $FUTURE_ID
cast call $ORDER "validUntil()"
cast call $ORDER "canExecute()"
```

## What's next?

Please note that these Orders are just examples of what you can build with Agents. Sky is the limit!

If you have an interesting idea, make a PR to the [repository with our example](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity).

Alternatively, you can reach out to us for any questions or feedback: developers@wardenprotocol.org