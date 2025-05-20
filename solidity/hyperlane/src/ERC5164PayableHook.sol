// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.25 <0.9.0;

// ============ Internal Imports ============
import {TypeCasts} from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import {Message} from "@hyperlane-xyz/contracts/libs/Message.sol";
import {StandardHookMetadata} from "@hyperlane-xyz/contracts/hooks/libs/StandardHookMetadata.sol";
import {IMessageDispatcher} from "@hyperlane-xyz/contracts/interfaces/hooks/IMessageDispatcher.sol";
import {AbstractMessageIdAuthHook} from "@hyperlane-xyz/contracts/hooks/libs/AbstractMessageIdAuthHook.sol";
import {AbstractMessageIdAuthorizedIsm} from "@hyperlane-xyz/contracts/isms/hook/AbstractMessageIdAuthorizedIsm.sol";

// ============ External Imports ============
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title ERC5164PayableHook
 * @notice Modified version of Hyperlane's ERC5164Hook implementation.
 * Original implementation can be found at:
 * https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/solidity/contracts/hooks/aggregation/ERC5164Hook.sol
 * 
 * This contract is a message hook to inform the 5164 ISM of messages published through
 * any of the 5164 adapters.
 */
contract ERC5164PayableHook is AbstractMessageIdAuthHook {
    using StandardHookMetadata for bytes;
    using Message for bytes;

    IMessageDispatcher public immutable dispatcher;

    constructor(
        address _mailbox,
        uint32 _destinationDomain,
        bytes32 _ism,
        address _dispatcher
    ) AbstractMessageIdAuthHook(_mailbox, _destinationDomain, _ism) {
        require(
            Address.isContract(_dispatcher),
            "ERC5164PayableHook: invalid dispatcher"
        );
        dispatcher = IMessageDispatcher(_dispatcher);
    }

    // ============ Internal Functions ============

    function _quoteDispatch(
        bytes calldata,
        bytes calldata
    ) internal pure override returns (uint256) {
        // todo: use 1 as rate and current gas price to calculate
        return 0;
    }

    function _sendMessageId(
        bytes calldata metadata,
        bytes calldata message
    ) internal override {
        require(msg.value != 0, "ERC5164PayableHook: value required");
        // todo: metadata.value quoted as dest token == msg.value

        bytes memory payload = abi.encodeCall(
            AbstractMessageIdAuthorizedIsm.preVerifyMessage,
            (message.id(), metadata.msgValue(0))
        );
        dispatcher.dispatchMessage(
            destinationDomain,
            TypeCasts.bytes32ToAddress(ism),
            payload
        );
    }
}
