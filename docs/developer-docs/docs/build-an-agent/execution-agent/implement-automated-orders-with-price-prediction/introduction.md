---
sidebar_position: 1
---

# Introduction to Orders with Automation and Price Prediction

## Overview

**Orders with Automation and Price Prediction** are Advanced Orders build upon Basic Orders by introducing `price prediction` capabilities and more sophisticated execution conditions. While Basic Orders operate on simple price thresholds, Advanced Orders integrate with **Warden's** prediction system to enable trading based on forecasted price movements.

### Key Enhancements

1. **Price Prediction Integration**
   - Connection to Warden's `x/async` prediction system
   - Support for multiple price pairs (oracle and prediction)
   - Handling of predicted vs actual price comparisons

2. **Enhanced Price Conditions**
   - Strict inequality comparisons (`<`, `>`)
   - Complex condition evaluation between oracle and predicted prices
   - Price normalization across different decimals

3. **Time-Windowed Execution**
   - 24-hour validity window for predictions
   - Automatic order expiration
   - Time-based execution constraints

4. **Advanced Infrastructure Integration**
   - Async precompile for prediction results
   - Multiple price source handling
   - Enhanced transaction management

## Technical Prerequisites

In addition to Basic Order requirements, you'll need to understand:

- Warden's `x/async` prediction system
- Price normalization between different sources
- Time-based contract constraints
- Complex state management

## Core Components

The Advanced Order implementation consists of these key components:

```solidity
contract AdvancedOrder {
    // Prediction Integration
    uint64 public futureId;  // Track prediction request
    uint256 public constant PRICE_PREDICTION_DECIMALS = 16;
    
    // Enhanced Price Data
    Types.AdvancedOrderData {
        PricePair oraclePricePair;   // Current price source
        PricePair predictPricePair;  // Prediction price source
        PriceCondition priceCondition;
    }
    
    // Execution Window
    uint256 private _validUntil;  // 24-hour window
}
```

## Implementation Path

This tutorial will guide you through:

1. [Implementing Advanced Orders](/implement-orders.md)
   - Setting up prediction integration
   - Handling multiple price sources
   - Implementing time windows

2. [Creating Advanced Order Factory](/implement-the-creation-of-orders.md)
   - Enhanced validation logic
   - Prediction setup during deployment
   - Complex initialization

3. [Deploying Advanced Orders](/deploy-an-order.md)
   - Prediction configuration
   - Multiple price pair setup
   - Monitoring prediction results

## Key Differences from Basic Orders

| Feature | Basic Orders | Advanced Orders |
|---------|-------------|-----------------|
| Price Conditions | `>=`, `<=` | `>`, `<`, `>=`, `<=` |
| Price Sources | Single oracle | Oracle + Prediction |
| Execution Window | None | 24-hour validity |
| State Management | Simple execution flag | Prediction tracking |
| Infrastructure | Slinky precompile | Slinky + Async precompiles |

## Get started

To get started with automated Orders, take the following steps:

1. [Build the infrastructure for Orders](/category/build-the-infrastructure-for-orders).
2. [Implement Orders](implement-orders).
