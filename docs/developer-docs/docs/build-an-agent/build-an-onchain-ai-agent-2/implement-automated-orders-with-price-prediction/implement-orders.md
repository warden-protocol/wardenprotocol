---
sidebar_position: 3
---

# Implement Orders

## Overview

The `AdvancedOrder` contract implements the core of logic of this example—**automated Orders with price prediction**—smart contracts that execute token swaps on Uniswap based on **AI-driven price predictions**.

Orders with price prediction extend the [basic automated Orders](../implement-automated-orders/implement-orders). This article will guide you through creating the `AdvancedOrder` contract, focusing on the implementation of the advanced features. You'll implement the following core components:

```solidity
contract AdvancedOrder is AbstractOrder, IExecution {
    // Prediction tracking
    uint64 public futureId;
    uint256 public constant PRICE_PREDICTION_DECIMALS = 16;
    
    // Price feed components
    ISlinky private immutable SLINKY_PRECOMPILE;
    IAsync private immutable ASYNC_PRECOMPILE;
    
    // State variables
    Types.AdvancedOrderData public orderData;
    Types.CommonExecutionData public commonExecutionData;
    uint256 private _validUntil;
    bool private _executed;
    bytes private _unsignedTx;
}
```

:::note Directory
Store `AdvancedOrder` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/AdvancedOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/AdvancedOrder.sol)
:::

## 1. Initialize the prediction system

First, initialize the prediction system:

```solidity title="src/AdvancedOrder.sol"
constructor(
    Types.AdvancedOrderData memory _orderData,
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
    // Initialize prediction request
    string[] memory predictTokens = new string[](2);
    predictTokens[0] = _orderData.predictPricePair.base;
    predictTokens[1] = _orderData.predictPricePair.quote;
    
    // Request a price prediction
    futureId = ASYNC_PRECOMPILE.addFuture(
        "pricepred", 
        abi.encode(predictTokens)
    );
    
    // Set the validity window
    _validUntil = block.timestamp + 24 hours;
    
    // Store the configuration
    orderData = _orderData;
    commonExecutionData = _executionData;
}
```

## 2. Implement price monitoring

Now implement price monitoring:

```solidity title="src/AdvancedOrder.sol"
function canExecute() public view override returns (bool) {
    // Check the time window
    if (block.timestamp > _validUntil) return false;

    // Get the prediction result
    FutureByIdResponse memory future = 
        ASYNC_PRECOMPILE.futureById(futureId);
    if (future.futureResponse.result.id == 0) return false;

    // Decode the predicted prices
    uint256[] memory predictedPrices = abi.decode(
        future.futureResponse.result.output, 
        (uint256[])
    );
    
    // Get the oracle price
    GetPriceResponse memory priceResponse = SLINKY_PRECOMPILE.getPrice(
        orderData.oraclePricePair.base,
        orderData.oraclePricePair.quote
    );

    // Normalize the prices for comparison
    uint256 predictedPrice = _getPriceInQuote(
        predictedPrices[0],
        predictedPrices[1],
        PRICE_PREDICTION_DECIMALS
    );
    
    (uint256 oracleNormalized, uint256 predictedNormalized) = 
        _normalizePrices(
            priceResponse.price.price,
            predictedPrice,
            priceResponse.decimals,
            PRICE_PREDICTION_DECIMALS
        );

    return _checkPriceCondition(oracleNormalized, predictedNormalized);
}
```

## 3. Implement price normalization

Create utilities for price normalization:

```solidity title="src/AdvancedOrder.sol"
function _normalizePrices(
    uint256 price1,
    uint256 price2,
    uint256 decimals1,
    uint256 decimals2
) internal pure returns (
    uint256 normalizedPrice1,
    uint256 normalizedPrice2
) {
    // Align decimal places
    uint256 maxDecimals = decimals1 > decimals2 ? decimals1 : decimals2;
    normalizedPrice1 = price1 * (10**(maxDecimals - decimals1));
    normalizedPrice2 = price2 * (10**(maxDecimals - decimals2));
}

function _getPriceInQuote(
    uint256 priceA,
    uint256 priceB,
    uint256 decimals
) internal pure returns (uint256) {
    return (priceA * 10**decimals) / priceB;
}
```

## 4. Check the price condition

Create a function checking if the price meets a given condition: `>=`/`<=`/`>`/`<` than the threshold—see the `PriceCondtion` enum in [`Types.sol`](../build-the-infrastructure-for-orders/create-helpers-and-utils#1-define-data-structures).

```solidity title="src/AdvancedOrder.sol"
function _checkPriceCondition(
    uint256 oraclePrice,
    uint256 predictedPrice
) internal view returns (bool) {
    if (orderData.priceCondition == Types.PriceCondition.GT) {
        return oraclePrice > predictedPrice;
    } else if (orderData.priceCondition == Types.PriceCondition.LT) {
        return oraclePrice < predictedPrice;
    } else if (orderData.priceCondition == Types.PriceCondition.GTE) {
        return oraclePrice >= predictedPrice;
    } else if (orderData.priceCondition == Types.PriceCondition.LTE) {
        return oraclePrice <= predictedPrice;
    }
    return false;
}
```

## 5. Test the contract

To test the contract, use the following code:

```solidity
contract AdvancedOrderTest is Test {
    function test_PredictionIntegration() public {
        // Mock prediction response
        bytes memory predictionOutput = abi.encode([uint256(1000), uint256(1)]);
        vm.mockCall(
            IASYNC_PRECOMPILE_ADDRESS,
            abi.encodeWithSelector(
                IAsync.futureById.selector,
                1  // futureId
            ),
            abi.encode(
                FutureByIdResponse({
                    futureResponse: FutureResponse({
                        result: FutureResult({
                            id: 1,
                            output: predictionOutput,
                            submitter: ""
                        })
                    })
                })
            )
        );

        assertTrue(order.canExecute());
    }

    function test_TimeWindow() public {
        // Fast forward past validity
        vm.warp(block.timestamp + 25 hours);
        assertFalse(order.canExecute());
    }

    function test_PriceNormalization() public {
        uint256 price1 = 1000; // 3 decimals
        uint256 price2 = 1;    // 6 decimals
        
        (uint256 norm1, uint256 norm2) = order.exposed_normalizePrices(
            price1, price2, 3, 6
        );
        
        assertEq(norm1, 1000000);
        assertEq(norm2, 1);
    }
}
```

## Security measures

In the previous steps, you've implemented the following security measures:

- **Time window management**  
  Orders will automatically expire after 24 hours. This prevents stale predictions from being in use.
  ```
  _validUntil = block.timestamp + 24 hours;
  ```
- **Price normalization**  
  The contract will handle different decimal places, providing protection from overflow in multiplication operations.
  ```
  function _normalizePrices(...)
  ```
- **Prediction validation**  
  The contract will check for valid prediction results and verify the prediction data format.

## Next steps

After creating the `AdvanceOrder` contract, you can [implement the creation of Orders](implement-the-creation-of-orders).
