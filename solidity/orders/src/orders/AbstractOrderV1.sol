// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { BroadcastType, IWarden, IWARDEN_PRECOMPILE_ADDRESS, KeyResponse } from "precompile-warden/IWarden.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { Strings } from "../lib/Strings.sol";
import { Types } from "../types/Types.sol";
import { TypesV1 } from "../types/TypesV1.sol";

error InvalidScheduler();
error InvalidRegistry();
error InvalidExpectedApproveExpression();
error InvalidExpectedRejectExpression();
error InvalidTxTo();

abstract contract AbstractOrderV1 {
    using Strings for *;

    address public keyAddress;
    IWarden private immutable WARDEN_PRECOMPILE;
    int32 private constant ETHEREUM_ADDRESS_TYPE = 1;

    constructor(TypesV1.CommonExecutionData memory commonExecutionData, address scheduler, address registry) {
        if (scheduler == address(0)) {
            revert InvalidScheduler();
        }

        if (registry == address(0)) {
            revert InvalidRegistry();
        }

        if (bytes(commonExecutionData.signRequestData.expectedApproveExpression).length == 0) {
            revert InvalidExpectedApproveExpression();
        }

        if (bytes(commonExecutionData.signRequestData.expectedRejectExpression).length == 0) {
            revert InvalidExpectedRejectExpression();
        }

        for (uint256 i = 0; i < commonExecutionData.instructions.length; i++) {
            for (uint256 j = 0; j < commonExecutionData.instructions[i].calls.length; j++) {
                if (commonExecutionData.instructions[i].calls[j].to == address(0)) {
                    revert InvalidTxTo();
                }
            }
        }

        WARDEN_PRECOMPILE = IWarden(IWARDEN_PRECOMPILE_ADDRESS);
        int32[] memory addressTypes = new int32[](1);
        addressTypes[0] = ETHEREUM_ADDRESS_TYPE;
        KeyResponse memory keyResponse =
            WARDEN_PRECOMPILE.keyById(commonExecutionData.signRequestData.keyId, addressTypes);
        keyAddress = keyResponse.addresses[0].addressValue.parseAddress();
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

    function toEIP191Hash(bytes memory message) external pure returns (bytes32 eip191Message) {
        string memory len = Strings.toString(message.length);
        eip191Message = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", len, message));
    }
}
