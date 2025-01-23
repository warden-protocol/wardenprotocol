---
sidebar_position: 3
---

# Implement Orders

**Advanced Orders** extend **Basic Orders** with price prediction capabilities and enhanced execution conditions. This guide focuses on implementing these additional features.

## Core Components

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

## 1. Initialize Prediction System

```solidity
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
    
    // Request price prediction
    futureId = ASYNC_PRECOMPILE.addFuture(
        "pricepred", 
        abi.encode(predictTokens)
    );
    
    // Set validity window
    _validUntil = block.timestamp + 24 hours;
    
    // Store configuration
    orderData = _orderData;
    commonExecutionData = _executionData;
}
```

## 2. Implement Enhanced Price Monitoring

```solidity
function canExecute() public view override returns (bool) {
    // Check time window
    if (block.timestamp > _validUntil) return false;

    // Get prediction result
    FutureByIdResponse memory future = 
        ASYNC_PRECOMPILE.futureById(futureId);
    if (future.futureResponse.result.id == 0) return false;

    // Decode predicted prices
    uint256[] memory predictedPrices = abi.decode(
        future.futureResponse.result.output, 
        (uint256[])
    );
    
    // Get oracle price
    GetPriceResponse memory priceResponse = SLINKY_PRECOMPILE.getPrice(
        orderData.oraclePricePair.base,
        orderData.oraclePricePair.quote
    );

    // Normalize prices for comparison
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

## 3. Price Normalization Utilities

```solidity
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

## 4. Enhanced Price Conditions

```solidity
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

## 5. Testing Advanced Features

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

## Key Security Considerations

1. **Time Window Management**
   - Orders automatically expire after 24 hours
   - Prevents stale predictions from being used

2. **Price Normalization**
   - Careful handling of different decimal places
   - Overflow protection in multiplication operations

3. **Prediction Validation**
   - Check for valid prediction results
   - Verify prediction data format

## Next Steps

After creating the `AdvanceOrder` contract, you can [implement the creation of Orders](/implement-the-creation-of-orders).
