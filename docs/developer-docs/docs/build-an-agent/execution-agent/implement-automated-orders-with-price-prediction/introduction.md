---
sidebar_position: 1
---

# Introduction

## Overview

**Orders with automation and price prediction** are advanced Orders build upon basic automated Orders by introducing `price prediction` capabilities and more sophisticated execution conditions. While basic automated Orders operate on simple price thresholds, advanced Orders integrate with **Warden's** prediction system to enable trading based on predicted price movements.

## Key enhancements

1. **Price prediction integration**
   - Connection to Warden's `x/async` prediction system
   - Support for multiple price pairs (oracle and prediction)
   - Handling of predicted vs actual price comparisons

2. **Enhanced price conditions**
   - Strict inequality comparisons (`<`, `>`)
   - Complex condition evaluation between oracle and predicted prices
   - Price normalization across different decimals

3. **Time-windowed execution**
   - 24-hour validity window for predictions
   - Automatic order expiration
   - Time-based execution constraints

4. **Advanced infrastructure integration**
   - Async precompile for prediction results
   - Multiple price source handling
   - Enhanced transaction management

## Technical prerequisites

In addition to Basic Order requirements, you'll need to understand:

- Warden's `x/async` prediction system
- Price normalization between different sources
- Time-based contract constraints
- Complex state management

## Core components

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

## Implementation path

This tutorial will guide you through:

1. [Implementing Advanced Orders](implement-orders)
   - Setting up prediction integration
   - Handling multiple price sources
   - Implementing time windows

2. [Creating Advanced Order Factory](implement-the-creation-of-orders)
   - Enhanced validation logic
   - Prediction setup during deployment
   - Complex initialization

3. [Deploying Advanced Orders](deploy-an-order)
   - Prediction configuration
   - Multiple price pair setup
   - Monitoring prediction results

## Key differences from basic Orders

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
