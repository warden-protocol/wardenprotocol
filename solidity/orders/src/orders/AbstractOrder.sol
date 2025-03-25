// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { BroadcastType, IWarden, IWARDEN_PRECOMPILE_ADDRESS, KeyResponse } from "precompile-warden/IWarden.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { RLPEncode } from "../lib/RLPEncode.sol";
import { Strings } from "../lib/Strings.sol";
import { Types } from "../types/Types.sol";
import { ExecutionData } from "../types/IExecutionV0.sol";

error InvalidScheduler();
error InvalidRegistry();
error InvalidExpectedApproveExpression();
error InvalidExpectedRejectExpression();
error InvalidTxTo();

abstract contract AbstractOrder {
    using Strings for *;

    IWarden private immutable WARDEN_PRECOMPILE;
    address private _keyAddress;
    int32 private constant ETHEREUM_ADDRESS_TYPE = 1;

    constructor(
        Types.SignRequestData memory signRequestData,
        Types.CreatorDefinedTxFields memory creatorDefinedTxFields,
        address scheduler,
        address registry
    ) {
        if (scheduler == address(0)) {
            revert InvalidScheduler();
        }

        if (registry == address(0)) {
            revert InvalidRegistry();
        }

        if (bytes(signRequestData.expectedApproveExpression).length == 0) {
            revert InvalidExpectedApproveExpression();
        }

        if (bytes(signRequestData.expectedRejectExpression).length == 0) {
            revert InvalidExpectedRejectExpression();
        }

        if (creatorDefinedTxFields.to == address(0)) {
            revert InvalidTxTo();
        }

        WARDEN_PRECOMPILE = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        int32[] memory addressTypes = new int32[](1);
        addressTypes[0] = ETHEREUM_ADDRESS_TYPE;
        KeyResponse memory keyResponse = WARDEN_PRECOMPILE.keyById(signRequestData.keyId, addressTypes);
        _keyAddress = keyResponse.addresses[0].addressValue.parseAddress();
    }

    function encodeUnsignedEIP1559(
        uint256 nonce,
        uint256 gas,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas,
        bytes[] calldata accessList,
        Types.CreatorDefinedTxFields calldata creatorDefinedTxFields
    )
        public
        pure
        returns (bytes memory unsignedTx, bytes32 txHash)
    {
        uint256 txType = 2; // eip1559 tx type
        bytes[] memory txArray = new bytes[](9);
        txArray[0] = RLPEncode.encodeUint(creatorDefinedTxFields.chainId);
        txArray[1] = RLPEncode.encodeUint(nonce);
        txArray[2] = RLPEncode.encodeUint(maxPriorityFeePerGas);
        txArray[3] = RLPEncode.encodeUint(maxFeePerGas);
        txArray[4] = RLPEncode.encodeUint(gas);
        txArray[5] = RLPEncode.encodeAddress(creatorDefinedTxFields.to);
        txArray[6] = RLPEncode.encodeUint(creatorDefinedTxFields.value);
        txArray[7] = RLPEncode.encodeBytes(creatorDefinedTxFields.data);
        txArray[8] = RLPEncode.encodeList(accessList);
        bytes memory unsignedTxEncoded = RLPEncode.encodeList(txArray);
        unsignedTx = RLPEncode.concat(RLPEncode.encodeUint(txType), unsignedTxEncoded);
        txHash = keccak256(unsignedTx);
    }

    function buildExecutionData(Types.CreatorDefinedTxFields calldata creatorDefinedTxFields)
        public
        view
        returns (ExecutionData memory data)
    {
        data = ExecutionData({
            caller: _keyAddress,
            to: creatorDefinedTxFields.to,
            chainId: creatorDefinedTxFields.chainId,
            value: creatorDefinedTxFields.value,
            data: creatorDefinedTxFields.data
        });
    }

    function createSignRequest(
        Types.SignRequestData calldata signRequestData,
        bytes calldata signRequestInput,
        CommonTypes.Coin[] calldata maxKeychainFees
    )
        public
        returns (bool)
    {
        return WARDEN_PRECOMPILE.newSignRequest(
            signRequestData.keyId,
            signRequestInput,
            signRequestData.analyzers,
            signRequestData.encryptionKey,
            maxKeychainFees,
            signRequestData.spaceNonce,
            signRequestData.actionTimeoutHeight,
            signRequestData.expectedApproveExpression,
            signRequestData.expectedRejectExpression,
            BroadcastType.Automatic
        );
    }
}
