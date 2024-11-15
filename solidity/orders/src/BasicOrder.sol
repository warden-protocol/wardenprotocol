// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { IWarden, IWARDEN_PRECOMPILE_ADDRESS, KeyResponse } from "precompile-warden/IWarden.sol";
import { GetPriceResponse, ISlinky, ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { Caller, ExecutionData, IExecution } from "./IExecution.sol";
import { Types } from "./Types.sol";

error ConditionNotMet();
error ExecutedError();
error Unauthorized();
error InvalidPriceCondition();
error InvalidScheduler();
error InvalidSwapDataAmountIn();
error InvalidSwapDataTo();
error InvalidExpectedApproveExpression();
error InvalidExpectedRejectExpression();
error InvalidThresholdPrice();
error InvalidTxTo();

event Executed();

contract BasicOrder is IExecution, ReentrancyGuard {
    Types.OrderData public orderData;
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = "swapExactETHForTokens(uint256,address[],address,uint256)";

    IWarden private immutable WARDEN_PRECOMPILE;
    ISlinky private immutable SLINKY_PRECOMPILE;
    Caller[] private _callers;
    CommonTypes.Coin[] private _coins;
    bool private _executed;
    address private _scheduler;
    address private _keyAddress;

    // solhint-disable-next-line
    constructor(Types.OrderData memory _orderData, CommonTypes.Coin[] memory maxKeychainFees, address scheduler) {
        for (uint256 i = 0; i < maxKeychainFees.length; i++) {
            _coins.push(maxKeychainFees[i]);
        }

        if (scheduler == address(0)) {
            revert InvalidScheduler();
        }

        if (_orderData.swapData.amountIn == 0) {
            revert InvalidSwapDataAmountIn();
        }

        if (_orderData.swapData.to == address(0)) {
            revert InvalidSwapDataTo();
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
        KeyResponse memory keyResponse = WARDEN_PRECOMPILE.keyById(_orderData.signRequestData.keyId, new int32[](0));
        _keyAddress = address(bytes20(keccak256(keyResponse.key.publicKey)));

        SLINKY_PRECOMPILE = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);
        SLINKY_PRECOMPILE.getPrice(_orderData.pricePair.base, _orderData.pricePair.quote);

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
        uint256 gasPrice,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    )
        external
        nonReentrant
        returns (bool)
    {
        if (msg.sender != _scheduler) {
            revert Unauthorized();
        }

        if (_executed) {
            revert ExecutedError();
        }

        if (!canExecute()) {
            revert ConditionNotMet();
        }

        bytes memory data = _packSwapData();

        bytes memory unsignedTx = abi.encode(
            Types.UnsignedEthTx({
                from: _keyAddress,
                gas: gas,
                gasPrice: gasPrice,
                nonce: nonce,
                maxFeePerGas: maxFeePerGas,
                maxPriorityFeePerGas: maxPriorityFeePerGas,
                to: orderData.creatorDefinedTxFields.to,
                value: orderData.creatorDefinedTxFields.value,
                data: data,
                chainId: orderData.creatorDefinedTxFields.chainId
            })
        );

        bytes memory signRequestInput = abi.encodePacked(keccak256(unsignedTx));

        _executed = WARDEN_PRECOMPILE.newSignRequest(
            orderData.signRequestData.keyId,
            signRequestInput,
            orderData.signRequestData.analyzers,
            orderData.signRequestData.encryptionKey,
            _coins,
            orderData.signRequestData.spaceNonce,
            orderData.signRequestData.actionTimeoutHeight,
            orderData.signRequestData.expectedApproveExpression,
            orderData.signRequestData.expectedRejectExpression
        );

        if (_executed) {
            emit Executed();
        }

        return _executed;
    }

    function callers() external view returns (Caller[] memory callersList) {
        return _callers;
    }

    function isExecuted() external view returns (bool) {
        return _executed;
    }

    function executionData() external view returns (ExecutionData memory data) {
        bytes memory d = _packSwapData();
        data = ExecutionData({
            caller: _keyAddress,
            to: orderData.creatorDefinedTxFields.to,
            chainId: orderData.creatorDefinedTxFields.chainId,
            value: orderData.creatorDefinedTxFields.value,
            data: d
        });
    }

    function setByAIService(bytes calldata) external pure returns (bool success) {
        success = false;
    }

    function _packSwapData() internal view returns (bytes memory data) {
        data = abi.encodeWithSignature(
            SWAP_EXACT_ETH_FOR_TOKENS,
            orderData.swapData.amountIn,
            orderData.swapData.path,
            orderData.swapData.to,
            orderData.swapData.deadline
        );
    }
}
