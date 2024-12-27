// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

import { GetPriceResponse, ISlinky, ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { IAsync, IASYNC_PRECOMPILE_ADDRESS } from "precompile-async/IAsync.sol";
import { AbstractOrder } from "./AbstractOrder.sol";
import { Caller, ExecutionData, IExecution } from "./IExecution.sol";

contract AdvancedOrder is AbstractOrder, IExecution {
    Types.OrderData public orderData;

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
        Types.OrderData memory _orderData,
        CommonTypes.Coin[] memory maxKeychainFees,
        address scheduler,
        address registry
    )
        AbstractOrder(_orderData.signRequestData, _orderData.creatorDefinedTxFields, scheduler, registry)
    {
        SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
        SLINKY_PRECOMPILE.getPrice(_orderData.pricePair.base, _orderData.pricePair.quote);

        ASYNC_PRECOMPILE = IAsync(IASYNC_PRECOMPILE_ADDRESS);

        REGISTRY = Registry(registry);

        for (uint256 i = 0; i < maxKeychainFees.length; i++) {
            _coins.push(maxKeychainFees[i]);
        }

        orderData = _orderData;
        _scheduler = scheduler;
        _callers.push(Caller.Scheduler);
        _validUntil = block.timestamp + 24 hours;
    }

    function canExecute() external view override returns (bool) {
        if(block.timestamp > _validUntil) {
            return false;
        }
        // TODO:
        // 1) get price from async
        // ASYNC_PRECOMPILE.futureById(); - need to get future response by future id
        // store future id in orderData
        // decode future response
        // 2) get price from slinky
        GetPriceResponse memory priceResponse =
            SLINKY_PRECOMPILE.getPrice(orderData.pricePair.base, orderData.pricePair.quote);
        // 3) compare prices and decide if can execute:
        // 3.1) if price from slinky is higher than price from async and PriceCondition == GTE => true
        // 3.2) if price from slinky is less than price from async and PriceCondition == LTE => true
        // 3.3) else => false
        return false;
    }

    function execute(
        uint256 nonce,
        uint256 gas,
        uint256,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    ) external override returns (bool, bytes32) {
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
            nonce, gas, maxPriorityFeePerGas, maxFeePerGas, emptyAccessList, orderData.creatorDefinedTxFields
        );

        _unsignedTx = unsignedTx;

        bytes memory signRequestInput = abi.encodePacked(txHash);

        _executed = this.createSignRequest(orderData.signRequestData, signRequestInput, _coins);

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

    function isExecuted() external view override returns (bool) {
        return _executed;
    }


    function executionData() external view returns (ExecutionData memory data) {
        data = this.buildExecutionData(orderData.creatorDefinedTxFields);
    }

    function getTx() external view returns (bytes memory transaction) {
        if (!isExecuted()) {
            revert ExecutedError();
        }

        transaction = _unsignedTx;
    }
}