// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Types as CommonTypes } from "precompile-common/Types.sol";
import { IWarden, IWARDEN_PRECOMPILE_ADDRESS, KeyResponse } from "precompile-warden/IWarden.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { GetPriceResponse, ISlinky, ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { ExecutionData, IExecution } from "./IExecution.sol";
import { Types } from "./Types.sol";

error ConditionNotMet();
error ExecutedError();
error Unauthorized();
error InvalidPriceCondition();

contract BasicOrder is IExecution, ReentrancyGuard {
    Types.OrderData public orderData;
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = "swapExactETHForTokens(uint256,address[],address,uint256)";

    IWarden private wardenPrecompile;
    ISlinky private slinkyPrecompile;
    CommonTypes.Coin[] private coins;
    bool private executed;
    address private scheduler;
    address private keyAddress;

    event Executed();

    constructor(Types.OrderData memory _orderData, CommonTypes.Coin[] memory maxKeychainFees, address _scheduler) {
        for (uint256 i = 0; i < maxKeychainFees.length; i++) {
            coins.push(maxKeychainFees[i]);
        }

        wardenPrecompile = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        KeyResponse memory keyResponse = wardenPrecompile.keyById(_orderData.signRequestData.keyId, new int32[](0));
        keyAddress = address(bytes20(keccak256(keyResponse.key.publicKey)));

        slinkyPrecompile = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);

        orderData = _orderData;
        executed = false;
        scheduler = _scheduler;
    }

    function canExecute() external view returns (bool) {
        return _canExecute();
    }

    function _canExecute() internal view returns (bool value) {
        GetPriceResponse memory priceResponse =
            slinkyPrecompile.getPrice(orderData.pricePair.base, orderData.pricePair.quote);
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
        if (msg.sender != scheduler) {
            revert Unauthorized();
        }

        if (executed) {
            revert ExecutedError();
        }

        if (!_canExecute()) {
            revert ConditionNotMet();
        }

        bytes memory data = _packSwapData();

        bytes memory signRequestInput = abi.encode(
            Types.UnsignedEthTx({
                from: keyAddress,
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

        executed = wardenPrecompile.newSignRequest(
            orderData.signRequestData.keyId,
            signRequestInput,
            orderData.signRequestData.analyzers,
            orderData.signRequestData.encryptionKey,
            coins,
            orderData.signRequestData.spaceNonce,
            orderData.signRequestData.actionTimeoutHeight,
            orderData.signRequestData.expectedApproveExpression,
            orderData.signRequestData.expectedRejectExpression
        );

        if (executed) {
            emit Executed();
        }

        return executed;
    }

    function calledByScheduler() external pure returns (bool) {
        return true;
    }

    function calledByAIService() external pure returns (bool) {
        return false;
    }

    function isExecuted() external view returns (bool) {
        return executed;
    }

    function executionData() external view returns (ExecutionData memory data) {
        bytes memory d = _packSwapData();
        data = ExecutionData({
            caller: keyAddress,
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
