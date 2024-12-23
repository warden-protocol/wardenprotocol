// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { BroadcastType, IWarden, IWARDEN_PRECOMPILE_ADDRESS, KeyResponse } from "precompile-warden/IWarden.sol";
import { GetPriceResponse, ISlinky, ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { Caller, ExecutionData, IExecution } from "./IExecution.sol";
import { AbstractOrder } from "./AbstractOrder.sol";
import { Types } from "./Types.sol";
import { Registry } from "./Registry.sol";
import { Strings } from "./Strings.sol";

error ConditionNotMet();
error ExecutedError();
error Unauthorized();
error InvalidPriceCondition();
error InvalidScheduler();
error InvalidRegistry();
error InvalidExpectedApproveExpression();
error InvalidExpectedRejectExpression();
error InvalidThresholdPrice();
error InvalidTxTo();

event Executed();

contract BasicOrder is AbstractOrder, IExecution, ReentrancyGuard {
    using Strings for *;

    Types.OrderData public orderData;
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = "swapExactETHForTokens(uint256,address[],address,uint256)";

    IWarden private immutable WARDEN_PRECOMPILE;
    ISlinky private immutable SLINKY_PRECOMPILE;
    Registry private immutable REGISTRY;
    Caller[] private _callers;
    CommonTypes.Coin[] private _coins;
    bool private _executed;
    address private _scheduler;
    address private _keyAddress;
    bytes private _unsignedTx;
    int32 private constant ETHEREUM_ADDRESS_TYPE = 1;

    // solhint-disable-next-line
    constructor(
        Types.OrderData memory _orderData,
        CommonTypes.Coin[] memory maxKeychainFees,
        address scheduler,
        address registry
    ) {
        for (uint256 i = 0; i < maxKeychainFees.length; i++) {
            _coins.push(maxKeychainFees[i]);
        }

        if (scheduler == address(0)) {
            revert InvalidScheduler();
        }

        if (registry == address(0)) {
            revert InvalidRegistry();
        }

        if (bytes(_orderData.signRequestData.expectedApproveExpression).length == 0) {
            revert InvalidExpectedApproveExpression();
        }

        if (bytes(_orderData.signRequestData.expectedRejectExpression).length == 0) {
            revert InvalidExpectedRejectExpression();
        }

        if (_orderData.thresholdPrice == 0) {
            revert InvalidThresholdPrice();
        }

        if (_orderData.creatorDefinedTxFields.to == address(0)) {
            revert InvalidTxTo();
        }

        WARDEN_PRECOMPILE = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        int32[] memory addressTypes = new int32[](1);
        addressTypes[0] = ETHEREUM_ADDRESS_TYPE;
        KeyResponse memory keyResponse = WARDEN_PRECOMPILE.keyById(_orderData.signRequestData.keyId, addressTypes);
        _keyAddress = keyResponse.addresses[0].addressValue.parseAddress();

        SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
        SLINKY_PRECOMPILE.getPrice(_orderData.pricePair.base, _orderData.pricePair.quote);

        REGISTRY = Registry(registry);

        orderData = _orderData;
        _scheduler = scheduler;
        _callers.push(Caller.Scheduler);
    }

    function canExecute() public view returns (bool value) {
        GetPriceResponse memory priceResponse =
            SLINKY_PRECOMPILE.getPrice(orderData.pricePair.base, orderData.pricePair.quote);
        Types.PriceCondition condition = orderData.priceCondition;
        if (condition == Types.PriceCondition.GTE) {
            value = priceResponse.price.price >= orderData.thresholdPrice;
        } else if (condition == Types.PriceCondition.LTE) {
            value = priceResponse.price.price <= orderData.thresholdPrice;
        } else {
            revert InvalidPriceCondition();
        }
    }

    function execute(
        uint256 nonce,
        uint256 gas,
        uint256,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    )
        external
        nonReentrant
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
            nonce,
            gas,
            maxPriorityFeePerGas,
            maxFeePerGas,
            emptyAccessList,
            orderData.creatorDefinedTxFields
        );

        _unsignedTx = unsignedTx;

        bytes memory signRequestInput = abi.encodePacked(txHash);

        _executed = WARDEN_PRECOMPILE.newSignRequest(
            orderData.signRequestData.keyId,
            signRequestInput,
            orderData.signRequestData.analyzers,
            orderData.signRequestData.encryptionKey,
            _coins,
            orderData.signRequestData.spaceNonce,
            orderData.signRequestData.actionTimeoutHeight,
            orderData.signRequestData.expectedApproveExpression,
            orderData.signRequestData.expectedRejectExpression,
            BroadcastType.Automatic
        );

        if (_executed) {
            emit Executed();
        }

        // origin always creator of sign request
        // solhint-disable-next-line
        REGISTRY.addTransaction(tx.origin, txHash);

        return (_executed, txHash);
    }

    function callers() external view returns (Caller[] memory callersList) {
        return _callers;
    }

    function isExecuted() public view returns (bool) {
        return _executed;
    }

    function executionData() external view returns (ExecutionData memory data) {
        data = ExecutionData({
            caller: _keyAddress,
            to: orderData.creatorDefinedTxFields.to,
            chainId: orderData.creatorDefinedTxFields.chainId,
            value: orderData.creatorDefinedTxFields.value,
            data: orderData.creatorDefinedTxFields.data
        });
    }

    function getTx() external view returns (bytes memory transaction) {
        if (!isExecuted()) {
            revert ExecutedError();
        }

        transaction = _unsignedTx;
    }
}
