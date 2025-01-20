// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

import { GetPriceResponse, ISlinky, ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { FutureByIdResponse, IAsync, IASYNC_PRECOMPILE_ADDRESS } from "precompile-async/IAsync.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { AbstractOrder } from "./AbstractOrder.sol";
import { Caller, ExecutionData, IExecution } from "./IExecution.sol";
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
    string public constant HANDLER = "pricepred";
    uint256 public constant PRICE_PREDICTION_DECIMALS = 16;

    ISlinky private immutable SLINKY_PRECOMPILE;
    IAsync private immutable ASYNC_PRECOMPILE;
    Registry private immutable REGISTRY;
    Caller[] private _callers;
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
        SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
        SLINKY_PRECOMPILE.getPrice(_orderData.oraclePricePair.base, _orderData.oraclePricePair.quote);

        ASYNC_PRECOMPILE = IAsync(IASYNC_PRECOMPILE_ADDRESS);

        string[] memory predictTokens = new string[](2);
        predictTokens[0] = _orderData.predictPricePair.base;
        predictTokens[1] = _orderData.predictPricePair.quote;
        futureId = ASYNC_PRECOMPILE.addFuture(HANDLER, abi.encode(predictTokens));

        REGISTRY = Registry(registry);

        for (uint256 i = 0; i < maxKeychainFees.length; i++) {
            _coins.push(maxKeychainFees[i]);
        }

        orderData = _orderData;
        commonExecutionData = _executionData;
        _scheduler = scheduler;
        _callers.push(Caller.Scheduler);
        _validUntil = block.timestamp + 24 hours;
    }

    function canExecute() public view override returns (bool) {
        if (block.timestamp > _validUntil) {
            return false;
        }
        FutureByIdResponse memory future = ASYNC_PRECOMPILE.futureById(futureId);
        if (future.futureResponse.future.id == 0) {
            return false;
        }
        uint256[] memory predictedPrices = this.decodeFutureReponse(future.futureResponse.result.output);
        GetPriceResponse memory priceResponse =
            SLINKY_PRECOMPILE.getPrice(orderData.oraclePricePair.base, orderData.oraclePricePair.quote);
        
        uint256 predictedPrice = 
            getPriceInQuoteToken(predictedPrices[0], predictedPrices[1], PRICE_PREDICTION_DECIMALS);
        (
            uint256 oracleNormalized, 
            uint256 predictedNormalized
        ) = normalizePrices(
            priceResponse.price.price, 
            predictedPrice, 
            priceResponse.decimals, 
            PRICE_PREDICTION_DECIMALS
        );
        
        if ((orderData.priceCondition == Types.PriceCondition.GTE ||
            orderData.priceCondition == Types.PriceCondition.GT) && oracleNormalized > predictedNormalized) {
            return true;
        }

        if ((orderData.priceCondition == Types.PriceCondition.LTE ||
            orderData.priceCondition == Types.PriceCondition.LT) && oracleNormalized < predictedNormalized) {
            return true;
        }

        if ((orderData.priceCondition == Types.PriceCondition.LTE ||
            orderData.priceCondition == Types.PriceCondition.GTE) && oracleNormalized == predictedNormalized) {
            return true;
        }

        return false;
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
        if (msg.sender != _scheduler) {
            revert Unauthorized();
        }

        if (isExecuted()) {
            revert ExecutedError();
        }

        if (!canExecute()) {
            revert ConditionNotMet();
        }

        bytes[] memory emptyAccessList = new bytes[](0);
        (bytes memory unsignedTx, bytes32 txHash) = this.encodeUnsignedEIP1559(
            nonce, gas, maxPriorityFeePerGas, maxFeePerGas, emptyAccessList, commonExecutionData.creatorDefinedTxFields
        );

        _unsignedTx = unsignedTx;

        bytes memory signRequestInput = abi.encodePacked(txHash);

        _executed = this.createSignRequest(commonExecutionData.signRequestData, signRequestInput, _coins);

        if (_executed) {
            emit Executed();
        }

        // origin always creator of sign request
        // solhint-disable-next-line
        REGISTRY.addTransaction(tx.origin, txHash);

        return (_executed, txHash);
    }

    function callers() external view override returns (Caller[] memory callersList) {
        return _callers;
    }

    function isExecuted() public view override returns (bool) {
        return _executed;
    }

    function executionData() external view returns (ExecutionData memory data) {
        data = this.buildExecutionData(commonExecutionData.creatorDefinedTxFields);
    }

    function getTx() external view returns (bytes memory transaction) {
        if (!isExecuted()) {
            revert ExecutedError();
        }

        transaction = _unsignedTx;
    }

    function decodeFutureReponse(bytes calldata futureOutput) public pure returns (uint256[] memory res) {
        res = abi.decode(futureOutput, (uint256[]));
    }

    function normalizePrices(
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

        if (decimals1 == decimals2) {
            normalizedPrice1 = price1;
            normalizedPrice2 = price2;
        } else {
            if (maxDecimals > decimals1) {
                normalizedPrice1 = price1 * (10**(maxDecimals - decimals1));
            }

            if (maxDecimals > decimals2) {
                normalizedPrice2 = price2 * (10**(maxDecimals - decimals2));
            }
        }
    }

    function getPriceInQuoteToken(
        uint256 priceA,
        uint256 priceB,
        uint256 decimals
    )
        internal
        pure
        returns (uint256 priceAInB)
    {
        priceAInB = (priceA * 10 ** decimals) / priceB;
    }
}
