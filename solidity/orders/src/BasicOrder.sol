// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {Types} from "./Types.sol";
import {ExecutionData, IExecution} from "./IExecution.sol";
import {Types as CommonTypes} from "precompile-common/Types.sol";
import {IWarden, IWARDEN_PRECOMPILE_ADDRESS, KeyResponse} from "precompile-warden/IWarden.sol";

error ConditionNotMet();
error ExecutedError();
error Unauthorized();

contract BasicOrder is IExecution {
    Types.OrderData public orderData;
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = "swapExactETHForTokens(uint256,address[],address,uint256)";

    IWarden private wardenPrecompile;
    CommonTypes.Coin[] private coins;
    bool private executed;
    address private scheduler;
    address private keyAddress;

    event Executed();

    constructor(
        Types.OrderData memory _orderData,
        CommonTypes.Coin[] memory maxKeychainFees,
        address _scheduler
        ) {
        for(uint256 i = 0; i < maxKeychainFees.length; i++) {
            coins.push(maxKeychainFees[i]);
        }

        wardenPrecompile = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        KeyResponse memory keyResponse = wardenPrecompile.keyById(_orderData.signRequestData.keyId, new int32[](0));
        keyAddress = address(bytes20(keccak256(keyResponse.key.publicKey)));
        

        orderData = _orderData;
        executed = false;
        scheduler = _scheduler;
    }

    /**
     * @dev Indicates if an order can be executed.
     * @return A boolean value indicating that the order can be executed.
     */
    function canExecute() external view returns (bool) {
        return _canExecute();
    }

    /**
     * @dev Internal canExecute implementation.
     * @return value A boolean value indicating that the execution can be executed.
     */
    function _canExecute() internal view returns (bool value) {
        // TODO: check price
        Types.PriceCondition condition = orderData.priceCondition;
        if(condition == Types.PriceCondition.MoreOrEqual) {
            value=false;
        } else if(condition == Types.PriceCondition.LessOrEqual) {
            value=false;
        }

        value = false;
    }

    /**
     * @dev Creates action for new sign request from stored order data.
     * If action created successfully then emit Executed method.
     * @param nonce The key account nonce.
     * @param maxPriorityFeePerGas maxPriorityFeePerGas param in eth transaction.
     * @param maxFeePerGas maxFeePerGas param in eth transaction.
     * @return A boolean value indicating that action was created.
     */
    function execute(
        uint256 nonce,
        uint256 gas,
        uint256 gasPrice,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    ) external returns (bool) {
        if(tx.origin != scheduler) {
            revert Unauthorized();
        }

        if(executed) {
            revert ExecutedError();
        }
        
        if (!_canExecute()) {
            revert ConditionNotMet();
        }

        bytes memory data = _packSwapData();
        
        bytes memory signRequestInput = abi.encode(Types.UnsignedEthTx({
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
        }));


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

    /**
     * @dev Indicates if this contract intended to be called by scheduler.
     */
    function calledByScheduler() external pure returns (bool) {
        return true;
    }

    /**
     * @dev Indicates if this contract intended to be called by AI service.
     */
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

    function setByAIService(bytes calldata data) external pure returns (bool) {
        return false;
    }


    function _packSwapData() internal view returns (bytes memory data) {
        data = abi.encodeWithSignature(
                SWAP_EXACT_ETH_FOR_TOKENS,
                orderData.swapData.amountIn,
                orderData.swapData.path,
                orderData.swapData.to,
                orderData.swapData.deadline);
    }
}
