// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {CreatorDefinedTxFields, OrderData, UnsignedEthTx} from "./Types.sol";
import {IExecution} from "./IExecution.sol";
import {Types} from "precompile-common/Types.sol";
import {IWarden, IWARDEN_PRECOMPILE_ADDRESS, KeyResponse} from "precompile-warden/IWarden.sol";


contract BasicOrder is IExecution {
    OrderData public orderData;
    string public constant SWAP_EXACT_ETH_FOR_TOKENS = "swapExactETHForTokens(uint256,address[],address,uint256)";

    Types.Coin[] private coins;
    bool private executed;
    CreatorDefinedTxFields private txFields;
    address private scheduler;
    address private keyAddress;

    error ConditionNotMet();
    error ExecutedError();
    error Unauthorized();

    event Executed();

    constructor(
        OrderData memory _orderData,
        Types.Coin[] memory maxKeychainFees,
        CreatorDefinedTxFields memory _txFields,
        address _scheduler
        ) {
        for(uint256 i = 0; i < maxKeychainFees.length; i++) {
            coins.push(maxKeychainFees[i]);
        }

        IWarden warden = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        KeyResponse memory keyResponse = warden.keyById(_orderData.signRequestData.keyId, new int32[](0));
        keyAddress = address(bytes20(keyResponse.key.publicKey));
        

        orderData = _orderData;
        executed = false;
        txFields = _txFields;
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
     * @return A boolean value indicating that action was created.
     */
    function execute(
        uint256 nonce,
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

        IWarden warden = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        
        bytes memory data = abi.encodeWithSignature(
                SWAP_EXACT_ETH_FOR_TOKENS,
                orderData.swapData.amountIn,
                orderData.swapData.path,
                orderData.swapData.to,
                orderData.swapData.deadline);
        
        address to = orderData.to;

        CreatorDefinedTxFields storage _txFields = txFields;

        bytes memory signRequestInput = abi.encode(UnsignedEthTx({
            nonce: nonce,
            maxFeePerGas: maxFeePerGas,
            maxPriorityFeePerGas: maxPriorityFeePerGas,
            to: to,
            value: _txFields.value,
            data: data,
            chainId: _txFields.chainId
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

    function executionData() external view returns (address caller, uint256 chainId) {
        CreatorDefinedTxFields storage _txFields = txFields;
        return (keyAddress, _txFields.chainId);
    }

    function setByAIService(bytes calldata data) external pure returns (bool) {
        return false;
    }

}
