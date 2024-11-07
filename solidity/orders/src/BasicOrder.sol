// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {OrderData, UnsignedEthTx} from "./Types.sol";
import {Types} from "precompile-common/Types.sol";
import {IWarden, IWARDEN_PRECOMPILE_ADDRESS} from "precompile-warden/IWarden.sol";


contract BasicOrder {
    OrderData public orderData;
    Types.Coin[] internal coins;
    bool public executed;
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = "swapExactETHForTokens(uint256,address[],address,uint256)";

    error ConditionNotMet();
    error ExecutedError();
    event Executed();

    constructor(OrderData memory _orderData, Types.Coin[] memory maxKeychainFees) {
        for(uint256 i = 0; i < maxKeychainFees.length; i++) {
            coins.push(maxKeychainFees[i]);
        }

        orderData = _orderData;
        executed = false;
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
     * @return A boolean value indicating that the execution can be pushed.
     */
    function _canExecute() internal view returns (bool) {
        // TODO: check price
        return true;
    }

    /**
     * @dev Creates action for new sign request from stored oder data.
     * If action created successfully then emit Executed method.
     * @param nonce The key account nonce.
     * @param maxPriorityFeePerGas maxPriorityFeePerGas param in eth transaction.
     * @param maxFeePerGas maxFeePerGas param in eth transaction.
     * @param chainId chainId param in eth transaction.
     * @param value value param in eth transaction.
     * @return A boolean value indicating that action was created.
     */
    function execute(
        uint256 nonce,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas,
        uint256 chainId,
        uint256 value
    ) external returns (bool) {
        if(executed) {
            revert ExecutedError();
        }
        
        if (!_canExecute()) {
            revert ConditionNotMet();
        }

        IWarden warden = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        
        bytes memory data = abi.encodeWithSignature(
                SWAP_EXACT_ETH_FOR_TOKENS,
                orderData.swapData.amountIn,
                orderData.swapData.path,
                orderData.swapData.to,
                orderData.swapData.deadline);
        
        address to = orderData.to;

        bytes memory signRequestInput = abi.encode(UnsignedEthTx({
            nonce: nonce,
            maxFeePerGas: maxFeePerGas,
            maxPriorityFeePerGas: maxPriorityFeePerGas,
            to: to,
            value: value,
            data: data,
            chainId: chainId
        }));


        executed = warden.newSignRequest(
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
    function calledByScheduler() external view returns (bool) {
        return true;
    }

    /**
     * @dev Indicates if this contract intended to be called by AI service.
     */
    function calledByAIService() external view returns (bool) {
        return false;
    }

    function isExecuted() external view returns (bool) {
        return executed;
    }
}
