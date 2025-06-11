// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { IMessageDispatcher } from "@hyperlane-xyz/contracts/interfaces/hooks/IMessageDispatcher.sol";
import {MailboxClient} from "@hyperlane-xyz/contracts/client/MailboxClient.sol";

contract MessageDispatcher is
    IMessageDispatcher,
    MailboxClient
{
    address public authorized;

    constructor(address _mailbox) MailboxClient(_mailbox) {
        authorized = msg.sender;
    }

    function dispatchMessage(
        uint256 toChainId,
        address to,
        bytes calldata data
    ) external returns (bytes32 id) {
        require(isAuthorized(msg.sender), "MessageDispatcher: unauthorized");

        uint256 _value;
        (id, _value) = abi.decode(data[4:], (bytes32,uint256));

        require(_isLatestDispatched(id), "MessageDispatcher: message not dispatching");

        emit IMessageDispatcher.MessageDispatched(
            id, // messageId
            msg.sender, // from
            toChainId,
            to,
            data
        );

        return id;
    }

    function isAuthorized(address _authorized) public view returns (bool) {
        return _authorized == authorized;
    }
}
