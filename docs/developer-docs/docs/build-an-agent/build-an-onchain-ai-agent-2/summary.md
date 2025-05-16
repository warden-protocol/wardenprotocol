---
sidebar_position: 6
---

# Summary

## Overview

In this section, you'll find a brief summary highlighting the differences between the Order types.

## Key features

| Feature | Automated Orders | Automated Orders with price prediction |
|---------|-------------|-----------------|
| Price sources | The oracle | The oracle and predictions |
| Price conditions | `>=`, `<=` | `>`, `<`, `>=`, `<=` |
| Execution window | None | 24-hour validity |
| State management | A simple execution flag | Prediction tracking |
| Mock precompiles | Slinky, Warden | Async, Slinky, Warden |

## Use cases

#### Automated Orders

- Simple limit orders
- Direct price thresholds
- Immediate execution needs
- Straightforward swaps

#### Automated Orders with price prediction

- Predictive trading
- Complex price conditions
- Time-sensitive operations
- Multi-source validation

## Development complexity

#### Automated Orders

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

#### Automated Orders with price prediction

```solidity
contract AdvancedOrder {
    // Complex state
    uint64 public taskId;
    uint256 private _validUntil;
    
    // Multiple integrations
    ISlinky private immutable SLINKY_PRECOMPILE;
    IAsync private immutable ASYNC_PRECOMPILE;
    
    // Advanced execution check
    function canExecute() public view returns (bool) {
        if (block.timestamp > _validUntil) return false;
        taskByIdResponse memory task = ASYNC_PRECOMPILE.taskById(taskId);
        return _checkPredictionAndPrice(task, getCurrentPrice());
    }
}
```

## Deployment and monitoring

#### Automated Orders

```bash
just create-basic-order $THRESHOLD $CONDITION $PRICE_PAIR
```
```
cast call $ORDER "canExecute()"
```

#### Automated Orders with price prediction

```bash
just create-advanced-order $CONDITION $ORACLE_PAIR $PREDICT_PAIR
```
```
cast call $ORDER "taskId()"
cast call $ASYNC_PRECOMPILE "taskById(uint64)" $TASK_ID
cast call $ORDER "validUntil()"
cast call $ORDER "canExecute()"
```

## What's next?

Please note that these Orders are just examples of what you can build with Agents. The sky is the limit! If you have an interesting idea, make a PR to the [example repo](https://github.com/warden-protocol/agent-kit-examples).

Alternatively, you can reach out to us for any questions or feedback: developers@wardenprotocol.org
