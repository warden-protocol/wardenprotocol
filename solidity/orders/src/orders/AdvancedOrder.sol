// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

import { GetPriceResponse, ISlinky, ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { FutureByIdResponse, IAsync, IASYNC_PRECOMPILE_ADDRESS } from "precompile-async/IAsync.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { AbstractOrder } from "../orders/AbstractOrder.sol";
import { ExecutionData, IExecution } from "../types/IExecution.sol";
import { Types } from "../types/Types.sol";
import { Registry } from "../Registry.sol";

error ConditionNotMet();
error ExecutedError();
error Unauthorized();

event Executed();

enum PricePredictMetric {
    Count,
    Mape,
    Rmse,
    R2,
    MaxError,
    Dae,
    Mae,
    Confidence,
    Pct1,
    Pct5,
    Pct10,
    Pct15,
    Pct20,
    Pct25,
    Pct50,
    P0,
    P5,
    P10,
    P15,
    P20,
    P25,
    P50,
    P75,
    P95,
    P100
}

struct PricePredictInput {
    uint256 date;
    string[] tokens;
    PricePredictMetric[] metrics;
    uint64[2] falsePositiveRate;
}

struct SolverReceipt {
    bytes bloomFilter;
    uint256 countItems;
}

struct PricePredictOutput {
    uint256[] predictions;
    SolverReceipt solverReceipt;
    uint256[][] metrics;
}

contract AdvancedOrder is AbstractOrder, IExecution {
    Types.AdvancedOrderData public orderData;
    Types.CommonExecutionData public commonExecutionData;
    uint64 public futureId;

    uint256 public constant PRICE_PREDICTION_DECIMALS = 16;

    ISlinky private immutable SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
    IAsync private immutable ASYNC_PRECOMPILE = IAsync(IASYNC_PRECOMPILE_ADDRESS);
    Registry private immutable REGISTRY;

    CommonTypes.Coin[] private _coins;
    bool private _executed;
    address private _scheduler;
    bytes private _unsignedTx;
    uint256 private _validUntil;

    constructor(
        Types.AdvancedOrderData memory _orderData,
        Types.CommonExecutionData memory _executionData,
        CommonTypes.Coin[] memory maxKeychainFees,
        address scheduler,
        address registry
    )
        AbstractOrder(_executionData.signRequestData, _executionData.creatorDefinedTxFields, scheduler, registry)
    {
        string[] memory predictTokens = new string[](1);
        predictTokens[0] = _orderData.predictPriceToken;

        PricePredictMetric[] memory metrics = new PricePredictMetric[](1);
        metrics[0] = PricePredictMetric.Confidence;

        uint64[2] memory falsePositiveRate = [uint64(1), uint64(100)];
        PricePredictInput memory pricePredictInput = PricePredictInput({
            date: _orderData.pricePredictDate,
            tokens: predictTokens,
            falsePositiveRate: falsePositiveRate,
            metrics: metrics
        });
        futureId = ASYNC_PRECOMPILE.addFuture("pricepred", abi.encode(pricePredictInput), address(0));
        REGISTRY = Registry(registry);

        for (uint256 i = 0; i < maxKeychainFees.length; i++) {
            _coins.push(maxKeychainFees[i]);
        }

        orderData = _orderData;
        commonExecutionData = _executionData;
        _scheduler = scheduler;
        _validUntil = block.timestamp + 24 hours;
    }

    function canExecute() public view override returns (bool) {
        if (block.timestamp > _validUntil) return false;

        FutureByIdResponse memory future = ASYNC_PRECOMPILE.futureById(futureId);
        if (future.futureResponse.result.id == 0) return false;

        PricePredictOutput memory output = abi.decode(future.futureResponse.result.output, (PricePredictOutput));
        GetPriceResponse memory priceResponse =
            SLINKY_PRECOMPILE.getPrice(orderData.oraclePricePair.base, orderData.oraclePricePair.quote);

        if (output.metrics[0][0] < orderData.confidenceLimit) {
            return false;
        }

        (uint256 oracleNormalized, uint256 predictedNormalized) = _normalizePrices(
            priceResponse.price.price, output.predictions[0], priceResponse.decimals, PRICE_PREDICTION_DECIMALS
        );

        return _checkPriceCondition(oracleNormalized, predictedNormalized);
    }

    function execute(
        uint256 nonce,
        uint256 gas,
        uint256,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    )
        external
        override
        returns (bool, bytes32)
    {
        if (msg.sender != _scheduler) revert Unauthorized();
        if (_executed) revert ExecutedError();
        if (!canExecute()) revert ConditionNotMet();

        bytes[] memory emptyAccessList = new bytes[](0);
        (bytes memory unsignedTx, bytes32 txHash) = this.encodeUnsignedEIP1559(
            nonce, gas, maxPriorityFeePerGas, maxFeePerGas, emptyAccessList, commonExecutionData.creatorDefinedTxFields
        );

        _unsignedTx = unsignedTx;
        _executed = this.createSignRequest(commonExecutionData.signRequestData, abi.encodePacked(txHash), _coins);

        if (_executed) emit Executed();

        // origin always creator of sign request
        // solhint-disable-next-line
        REGISTRY.addTransaction(tx.origin, txHash);
        return (_executed, txHash);
    }

    function isExecuted() public view override returns (bool) {
        return _executed;
    }

    function getTx() external view returns (bytes memory) {
        if (!_executed) revert ExecutedError();
        return _unsignedTx;
    }

    function executionData() external view returns (ExecutionData memory data) {
        data = this.buildExecutionData(commonExecutionData.creatorDefinedTxFields);
    }

    function _normalizePrices(
        uint256 price1,
        uint256 price2,
        uint256 decimals1,
        uint256 decimals2
    )
        internal
        pure
        returns (uint256 normalizedPrice1, uint256 normalizedPrice2)
    {
        uint256 maxDecimals = decimals1 > decimals2 ? decimals1 : decimals2;
        normalizedPrice1 = price1 * (10 ** (maxDecimals - decimals1));
        normalizedPrice2 = price2 * (10 ** (maxDecimals - decimals2));
    }

    function _checkPriceCondition(uint256 oraclePrice, uint256 predictedPrice) internal view returns (bool) {
        if (
            (orderData.priceCondition == Types.PriceCondition.GTE && oraclePrice >= predictedPrice)
                || (orderData.priceCondition == Types.PriceCondition.LTE && oraclePrice <= predictedPrice)
                || (orderData.priceCondition == Types.PriceCondition.GT && oraclePrice > predictedPrice)
                || (orderData.priceCondition == Types.PriceCondition.LT && oraclePrice < predictedPrice)
        ) {
            return true;
        }
        return false;
    }
}
