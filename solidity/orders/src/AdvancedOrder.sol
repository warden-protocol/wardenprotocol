// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

import { GetPriceResponse, ISlinky, ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { FutureByIdResponse, IAsync, IASYNC_PRECOMPILE_ADDRESS } from "precompile-async/IAsync.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { AbstractOrder } from "./AbstractOrder.sol";
import { ExecutionData, IExecution } from "./IExecution.sol";
import { Registry } from "./Registry.sol";
import { Types } from "./Types.sol";

error ConditionNotMet();
error ExecutedError();
error Unauthorized();

event Executed();

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
        string[] memory predictTokens = new string[](2);
        predictTokens[0] = _orderData.predictPricePair.base;
        predictTokens[1] = _orderData.predictPricePair.quote;

        futureId = ASYNC_PRECOMPILE.addFuture("pricepred", abi.encode(predictTokens));
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

        uint256[] memory predictedPrices = abi.decode(future.futureResponse.result.output, (uint256[]));
        GetPriceResponse memory priceResponse =
            SLINKY_PRECOMPILE.getPrice(orderData.oraclePricePair.base, orderData.oraclePricePair.quote);

        uint256 predictedPrice = _getPriceInQuote(predictedPrices[0], predictedPrices[1], PRICE_PREDICTION_DECIMALS);
        (uint256 oracleNormalized, uint256 predictedNormalized) =
            _normalizePrices(
                priceResponse.price.price,
                predictedPrice,
                priceResponse.decimals,
                PRICE_PREDICTION_DECIMALS
            );

        return _checkCondition(oracleNormalized, predictedNormalized);
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
        uint256 price1, uint256 price2, uint256 decimals1, uint256 decimals2
    ) internal pure returns (uint256 normalizedPrice1, uint256 normalizedPrice2) {
        uint256 maxDecimals = decimals1 > decimals2 ? decimals1 : decimals2;
        normalizedPrice1 = price1 * (10**(maxDecimals - decimals1));
        normalizedPrice2 = price2 * (10**(maxDecimals - decimals2));
    }

    function _getPriceInQuote(
        uint256 priceA, uint256 priceB, uint256 decimals
    ) internal pure returns (uint256) {
        return (priceA * 10**decimals) / priceB;
    }

    function _checkCondition(uint256 oraclePrice, uint256 predictedPrice) internal view returns (bool) {
        if (
            (orderData.priceCondition == Types.PriceCondition.GTE && oraclePrice >= predictedPrice) ||
            (orderData.priceCondition == Types.PriceCondition.LTE && oraclePrice <= predictedPrice) ||
            (orderData.priceCondition == Types.PriceCondition.GT && oraclePrice > predictedPrice) ||
            (orderData.priceCondition == Types.PriceCondition.LT && oraclePrice < predictedPrice)
        ) {
            return true;
        }
        return false;
    }
}