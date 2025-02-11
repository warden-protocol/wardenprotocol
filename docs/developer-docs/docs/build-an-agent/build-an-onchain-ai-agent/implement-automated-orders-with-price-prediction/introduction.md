---
sidebar_position: 1
---

# Introduction

## Orders with price prediction

This section explains how to implement advanced **automated Orders with price prediction**—smart contracts that execute token swaps on Uniswap based on **AI-driven price predictions**. Our example uses [Keychains](/learn/glossary#keychain) for signing transactions and the [`x/async` Warden module](/learn/warden-protocol-modules/x-async) for price predictions, extending the [basic automated Orders](../implement-automated-orders/introduction) that operate on simple price thresholds.

:::note
The price prediction model is just an example of what you can build with [`x/async`](/learn/warden-protocol-modules/x-async). With this module, you can implement any logic combining offchain computation with onchain verification—limited only by your imagination.
::: 

You'll take the following steps:

1. Implement the core logic of Orders in the [`AdvancedOrder` contract](implement-orders): set up prediction integration, handle multiple price sources, and implement time windows.
2. Implement the creation of Orders in [`AdvancedOrderFactory`](implement-the-creation-of-orders): create the validation logic and enable prediction setup during deployment.
3. [Deploy an Order](deploy-an-order): configure a prediction, set up price pairs, monitor the prediction result.

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example on GitHub: [/orders](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders)
:::

## Key features

The key features of automated Orders with price prediction include the following:

- **AI-driven price predictions**: Orders make price predictions with the [`x/async` module](/learn/warden-protocol-modules/x-async) and handle the comparison of predicted and actual prices. Two types of price pairs are available: oracle and prediction.
- **Complex price conditions**: This Order type supports strict inequality comparisons (`<`, `>`), complex condition evaluation between oracle and predicted prices, and price normalization across different decimals.
- **Time-windowed execution**: The execution of Orders is limited by a 24-hour validity window for predictions. Once this time frame ends, Orders expire automatically.

Here are the core components implementing these features:

```solidity
contract AdvancedOrder {
    // Prediction integration
    uint64 public futureId; // Track the prediction request
    uint256 public constant PRICE_PREDICTION_DECIMALS = 16;
    
    // Enhanced price data
    Types.AdvancedOrderData {
        PricePair oraclePricePair; // The oracle price pair
        PricePair predictPricePair; // The prediction price pair
        PriceCondition priceCondition;
    }
    
    // The execution window
    uint256 private _validUntil; // The 24-hour window
}
```

## Get started

To get started with automated Orders with price prediction, take the following steps:

1. [Build the infrastructure for Orders](/category/build-the-infrastructure-for-orders).
2. [Implement Orders](implement-orders).
